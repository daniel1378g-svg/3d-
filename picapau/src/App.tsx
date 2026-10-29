import { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { refreshScroll } from "./lib/scroll";
import { HTML_LANG, SLUGS, pageFromSlug, pathFor, type Lang, type PageKey } from "./i18n";
import { PROPOSAL_LABEL, copy } from "./copy";
import { SiteContext, type Site } from "./site";
import { prefersReducedMotion, storage } from "./lib/utils";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WelcomeSlide } from "./components/WelcomeSlide";
import { BookingDrawer } from "./components/BookingDrawer";

const PROPOSAL = import.meta.env.VITE_PROPOSAL !== "0";
const Home = lazy(() => import("./pages/Home").then((m) => ({ default: m.Home })));
const CartePage = lazy(() => import("./pages/CartePage").then((m) => ({ default: m.CartePage })));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage").then((m) => ({ default: m.PrivacyPage })));

/** Scrolls to a section once it exists: smoothly on the same page, at once after a page change. */
function scrollToSection(id: string, smooth = false) {
  let tries = 0;
  const attempt = () => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: smooth && !prefersReducedMotion() ? "smooth" : "auto", block: "start" });
    else if (tries++ < 60) setTimeout(attempt, 50);
  };
  attempt();
}

/** The element with an id nearest the top of the screen, and how far from the top it sits. */
function scrollAnchor() {
  const line = 160;
  let best: { id: string; offset: number } | null = null;
  for (const el of document.querySelectorAll<HTMLElement>("main [id]")) {
    const top = el.getBoundingClientRect().top;
    if (top <= line && (!best || top > best.offset)) best = { id: el.id, offset: top };
  }
  return best;
}

/** Shows its children from the second render on, so the first render matches the prerendered page React
 *  hydrates (the static intro panel covers the screen meanwhile). The state lives here rather than in Shell:
 *  an update in Shell before the lazy page has hydrated would make React drop the page's server markup. */
function AfterFirstRender({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useLayoutEffect(() => setReady(true), []);
  return ready ? children : null;
}

export function Shell({ lang }: { lang: Lang }) {
  const { slug = "" } = useParams();
  const page = pageFromSlug(lang, slug);
  const navigate = useNavigate();
  const location = useLocation();
  const reduce = useReducedMotion();
  const t = copy(lang);
  const [pending, setPending] = useState<Lang | null>(null);
  const [intro, setIntro] = useState<"play" | "open" | "done">(() =>
    typeof window === "undefined" || storage("session").get("pp-intro") === "1" || prefersReducedMotion() || pageFromSlug(lang, slug) !== "home" ? "done" : "play",
  );
  const [booking, setBooking] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  const lastPage = useRef<PageKey | null>(null);
  const anchor = useRef<{ id: string; offset: number } | null>(null);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
    storage("local").set("pp-lang", lang);
  }, [lang]);
  useEffect(() => {
    if (intro === "play") document.documentElement.dataset.intro = "play";
    else delete document.documentElement.dataset.intro;
  }, [intro]);
  // After a language switch the same block stays at the same height on screen, whatever the new text length.
  useLayoutEffect(() => {
    const a = anchor.current;
    anchor.current = null;
    const el = a && document.getElementById(a.id);
    if (a && el) window.scrollBy({ top: el.getBoundingClientRect().top - a.offset, behavior: "instant" as ScrollBehavior });
    refreshScroll();
  }, [lang]);
  // The static pages already carry their head; this keeps it right after in-app navigation.
  useEffect(() => {
    if (page && !__ARTIFACT__) import("./seo").then(({ applyHead }) => applyHead(lang, page));
  }, [lang, page]);

  // A new page starts at the top, or at the requested section; a language switch keeps the scroll.
  useEffect(() => {
    if (!page) return;
    const state = location.state as { section?: string; langSwitch?: boolean } | null;
    const section = state?.section ?? (__ARTIFACT__ ? "" : location.hash.replace(/^#/, ""));
    if (!state?.langSwitch) {
      if (section) scrollToSection(section);
      else if (lastPage.current !== null && lastPage.current !== page) window.scrollTo({ top: 0 });
    }
    lastPage.current = page;
  }, [page, location.key]); // eslint-disable-line react-hooks/exhaustive-deps

  const href = useCallback(
    (p: PageKey, section?: string) => {
      if (__ARTIFACT__) return "#" + [lang, SLUGS[lang][p]].filter(Boolean).join("-");
      return pathFor(lang, p) + (section ? `#${section}` : "");
    },
    [lang],
  );
  const go = useCallback(
    (p: PageKey, section?: string) => {
      if (p === page && section) {
        scrollToSection(section, true);
        return;
      }
      navigate(pathFor(lang, p) + (section && !__ARTIFACT__ ? `#${section}` : ""), { state: section ? { section } : null });
    },
    [lang, page, navigate],
  );
  const requestLanguage = useCallback(
    (next: Lang) => {
      if (pending || next === lang) return; // ignore clicks while the slide runs
      setPending(next);
    },
    [pending, lang],
  );
  const applyLanguage = (next: Lang) => {
    if (!page) return;
    anchor.current = scrollAnchor();
    navigate(pathFor(next, page) + (__ARTIFACT__ ? "" : window.location.hash), { state: { langSwitch: true } });
  };
  const book = useCallback((from?: HTMLElement | null) => {
    opener.current = from ?? (document.activeElement as HTMLElement | null);
    setBooking(true);
  }, []);
  const endIntro = useCallback(() => {
    storage("session").set("pp-intro", "1");
    setIntro("done");
  }, []);

  const site: Site = useMemo(
    () => ({ lang, page: page ?? "home", requestLanguage, switching: pending !== null, go, href, book, intro }),
    [lang, page, requestLanguage, pending, go, href, book, intro],
  );
  if (!page) return <Navigate to={pathFor(lang, "home")} replace />;

  return (
    <SiteContext.Provider value={site}>
      {PROPOSAL && (
        <p className="proposal-label" role="note" lang="pt-PT">
          {PROPOSAL_LABEL}
        </p>
      )}
      <a href="#main" className="skip-link">
        {t.ui.skip}
      </a>
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          tabIndex={-1}
          key={page}
          className="outline-none"
          initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(12px)" }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)", transitionEnd: { transform: "none" } }}
          onAnimationComplete={() => refreshScroll()}
          exit={{ opacity: 0, transition: { duration: 0.14 } }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <Suspense fallback={<div className="min-h-[100svh] bg-azulejo" />}>
            {page === "home" && <Home />}
            {page === "carte" && <CartePage />}
            {page === "privacy" && <PrivacyPage />}
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <BookingDrawer
        open={booking}
        onClose={() => {
          setBooking(false);
          setTimeout(() => opener.current?.focus?.(), 50);
        }}
      />
      {pending && <WelcomeSlide key={pending} lang={pending} onCovered={() => applyLanguage(pending)} onDone={() => setPending(null)} />}
      {intro !== "done" && !pending && (
        <AfterFirstRender>
          <WelcomeSlide intro lang={lang} onCovered={() => setIntro("open")} onDone={endIntro} />
        </AfterFirstRender>
      )}
    </SiteContext.Provider>
  );
}
