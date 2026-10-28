import { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Lenis from "lenis";
import { HTML_LANG, SLUGS, UI, pageFromSlug, pathFor, type Lang, type PageKey } from "./i18n";
import { SiteContext, type Site } from "./site";
import { applyHead } from "./seo";
import { prefersReducedMotion, storage } from "./lib/utils";
import { scroller, setScroller } from "./lib/scroll";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WelcomeSlide } from "./components/WelcomeSlide";
import { BookingDrawer } from "./components/BookingDrawer";
import { CursorFollower } from "./components/CursorFollower";
import { Home } from "./pages/Home";
import { Kitchen } from "./pages/Kitchen";

const PROPOSAL = import.meta.env.VITE_PROPOSAL !== "0";
// The Küche page is small and has a prerendered hero; loading it with the app avoids a placeholder jump.
const Legal = lazy(() => import("./pages/Legal").then((m) => ({ default: m.Legal })));

/** Scrolls to a section once it exists: smoothly on the same page, at once after a page change. */
function scrollToSection(id: string, smooth = false) {
  let tries = 0;
  const attempt = () => {
    const el = document.getElementById(id);
    if (!el) {
      if (tries++ < 40) setTimeout(attempt, 50);
      return;
    }
    const offset = -(parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0);
    const lenis = scroller();
    if (lenis && smooth) lenis.scrollTo(el, { offset, duration: 1.1 });
    else if (lenis) lenis.scrollTo(el, { offset, immediate: true });
    else el.scrollIntoView({ behavior: smooth && !prefersReducedMotion() ? "smooth" : "auto", block: "start" });
  };
  attempt();
}

/** The element with an id nearest the top of the screen, and how far below the header it sits. */
function scrollAnchor() {
  const line = 180;
  let best: { id: string; offset: number } | null = null;
  for (const el of document.querySelectorAll<HTMLElement>("main [id]")) {
    const top = el.getBoundingClientRect().top;
    if (top <= line && (!best || top > best.offset)) best = { id: el.id, offset: top };
  }
  return best;
}

export function Shell({ lang }: { lang: Lang }) {
  const { slug = "" } = useParams();
  const page = pageFromSlug(lang, slug);
  const navigate = useNavigate();
  const location = useLocation();
  const reduce = useReducedMotion();
  const [pending, setPending] = useState<Lang | null>(null);
  const [intro, setIntro] = useState(() => storage("session").get("oliveira-welcomed") !== "1");
  const [booking, setBooking] = useState(false);
  const [toastText, setToastText] = useState<string | null>(null);
  const [wipe, setWipe] = useState(0);
  const lastPage = useRef<PageKey | null>(null);
  const anchor = useRef<{ id: string; offset: number } | null>(null);

  // Smooth scroll with weight (off for reduced motion).
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.11, wheelMultiplier: 0.95 });
    setScroller(lenis);
    return () => {
      lenis.destroy();
      setScroller(null);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
    storage("local").set("oliveira-lang", lang);
  }, [lang]);
  // After a language switch the same block stays at the same height on screen, whatever the new text length.
  useLayoutEffect(() => {
    const a = anchor.current;
    anchor.current = null;
    const el = a && document.getElementById(a.id);
    if (a && el) window.scrollBy({ top: el.getBoundingClientRect().top - a.offset, behavior: "instant" as ScrollBehavior });
  }, [lang]);
  useEffect(() => {
    if (page && !__ARTIFACT__) applyHead(lang, page);
  }, [lang, page]);

  // A new page starts at the top, or at the requested section; a language switch keeps the scroll.
  useEffect(() => {
    if (!page) return;
    const state = location.state as { section?: string; langSwitch?: boolean } | null;
    const section = state?.section ?? (__ARTIFACT__ ? "" : location.hash.replace(/^#/, ""));
    if (!state?.langSwitch) {
      if (lastPage.current !== null && lastPage.current !== page) {
        setWipe((n) => n + 1);
        const lenis = scroller();
        if (lenis) lenis.scrollTo(0, { immediate: true });
        else window.scrollTo({ top: 0 });
      }
      if (section) scrollToSection(section);
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
    (p: PageKey, section?: string, state?: Record<string, unknown>) => {
      if (p === page && section && !state) {
        scrollToSection(section, true);
        return;
      }
      navigate(pathFor(lang, p) + (section && !__ARTIFACT__ ? `#${section}` : ""), { state: { ...(section ? { section } : {}), ...state } });
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
    navigate(pathFor(next, page) + (__ARTIFACT__ ? "" : window.location.hash), { state: { ...(location.state as object), langSwitch: true } });
  };
  const toast = useCallback((text: string) => {
    setToastText(text);
    window.setTimeout(() => setToastText((t) => (t === text ? null : t)), 2600);
  }, []);
  const openBooking = useCallback(() => setBooking(true), []);

  const site: Site = useMemo(
    () => ({ lang, page: page ?? "home", requestLanguage, switching: pending !== null, go, href, openBooking, toast }),
    [lang, page, requestLanguage, pending, go, href, openBooking, toast],
  );
  if (!page) return <Navigate to={pathFor(lang, "home")} replace />;

  return (
    <SiteContext.Provider value={site}>
      {PROPOSAL && (
        <p className="proposal-label" role="note">
          <span lang="pt-PT">{UI.proposal}</span>
          {UI.proposalLocal[lang] && (
            <span className="local" lang={HTML_LANG[lang]}>
              · {UI.proposalLocal[lang]}
            </span>
          )}
        </p>
      )}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-12 focus:z-[500] focus:rounded-full focus:bg-charcoal focus:px-4 focus:py-2 focus:text-linen">
        {UI.skip[lang]}
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {page === "home" && <Home />}
        <Suspense fallback={<div className="min-h-[80svh]" />}>
          {page === "kueche" && <Kitchen />}
          {(page === "impressum" || page === "datenschutz") && <Legal page={page} />}
        </Suspense>
      </main>
      <Footer />
      <AnimatePresence>
        {wipe > 0 && !reduce && (
          <motion.div
            key={wipe}
            aria-hidden="true"
            className="linen pointer-events-none fixed inset-0 z-[350]"
            initial={{ transform: "translateX(-100%)" }}
            animate={{ transform: ["translateX(-100%)", "translateX(0%)", "translateX(100%)"] }}
            transition={{ duration: 0.4, times: [0, 0.45, 1], ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>
      <BookingDrawer open={booking} onClose={() => setBooking(false)} />
      <AnimatePresence>
        {toastText && (
          <motion.p
            role="status"
            initial={{ opacity: 0, transform: "translate(-50%, 12px)" }}
            animate={{ opacity: 1, transform: "translate(-50%, 0px)" }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 left-1/2 z-[420] rounded-full bg-charcoal px-5 py-3 text-sm font-semibold text-linen shadow-lift"
          >
            {toastText}
          </motion.p>
        )}
      </AnimatePresence>
      <CursorFollower />
      <div className="grain" aria-hidden="true" />
      {pending && (
        <WelcomeSlide key={pending} lang={pending} onCovered={() => applyLanguage(pending)} onDone={() => setPending(null)} />
      )}
      {intro && !pending && (
        <WelcomeSlide intro lang={lang} onCovered={() => storage("session").set("oliveira-welcomed", "1")} onDone={() => setIntro(false)} />
      )}
    </SiteContext.Provider>
  );
}
