import { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { refreshScroll } from "./lib/scroll";
import { HTML_LANG, SLUGS, UI, pageFromSlug, pathFor, type Lang, type PageKey } from "./i18n";
import { SiteContext, type Site } from "./site";
import { applyHead } from "./seo";
import { storage } from "./lib/utils";
import { logo } from "./contact";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WelcomeSlide } from "./components/WelcomeSlide";
import { BookingDrawer } from "./components/BookingDrawer";

const PROPOSAL = import.meta.env.VITE_PROPOSAL !== "0";
const Home = lazy(() => import("./pages/Home").then((m) => ({ default: m.Home })));
const Pizzeria = lazy(() => import("./pages/Pizzeria").then((m) => ({ default: m.Pizzeria })));
const Steakhouse = lazy(() => import("./pages/Steakhouse").then((m) => ({ default: m.Steakhouse })));
const Choucalino = lazy(() => import("./pages/Choucalino").then((m) => ({ default: m.Choucalino })));
const MenuPage = lazy(() => import("./pages/MenuPage").then((m) => ({ default: m.MenuPage })));
const Anreise = lazy(() => import("./pages/Anreise").then((m) => ({ default: m.Anreise })));
const Impressum = lazy(() => import("./pages/Impressum").then((m) => ({ default: m.Impressum })));

/** Scrolls to a section once it exists: smoothly on the same page, at once after a page change. */
function scrollToSection(id: string, smooth = false) {
  let tries = 0;
  const attempt = () => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: smooth && !matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "auto", block: "start" });
    else if (tries++ < 40) setTimeout(attempt, 50);
  };
  attempt();
}

/** The element with an id nearest the top of the screen, and how far below the header it sits. */
function scrollAnchor() {
  const line = 160;
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
  const [intro, setIntro] = useState(() => storage("session").get("cc-welcomed") !== "1");
  const [booking, setBooking] = useState(false);
  const lastPage = useRef<PageKey | null>(null);
  const anchor = useRef<{ id: string; offset: number } | null>(null);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
    storage("local").set("cc-lang", lang);
  }, [lang]);
  // After a language switch the same block stays at the same height on screen, whatever the new text length.
  useLayoutEffect(() => {
    const a = anchor.current;
    anchor.current = null;
    const el = a && document.getElementById(a.id);
    if (a && el) window.scrollBy({ top: el.getBoundingClientRect().top - a.offset, behavior: "instant" as ScrollBehavior });
    refreshScroll();
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
  const book = useCallback(() => setBooking(true), []);

  const site: Site = useMemo(
    () => ({ lang, page: page ?? "home", requestLanguage, switching: pending !== null, go, href, book }),
    [lang, page, requestLanguage, pending, go, href, book],
  );
  if (!page) return <Navigate to={pathFor(lang, "home")} replace />;

  return (
    <SiteContext.Provider value={site}>
      {PROPOSAL && (
        <p className="proposal-label" role="note" lang="pt-PT">
          {UI.proposal}
        </p>
      )}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-12 focus:z-[500] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-snow">
        {UI.skip[lang]}
      </a>
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onAnimationComplete={() => refreshScroll()}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          transition={{ duration: 0.16, ease: "easeOut" }}
        >
          <Suspense fallback={<div className="min-h-[100svh]" />}>
            {page === "home" && <Home />}
            {page === "pizzeria" && <Pizzeria />}
            {page === "steakhouse" && <Steakhouse />}
            {page === "choucalino" && <Choucalino />}
            {page === "menu" && <MenuPage />}
            {page === "anreise" && <Anreise />}
            {page === "impressum" && <Impressum />}
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <PageWipe page={page} reduce={!!reduce} />
      <Footer />
      <BookingDrawer open={booking} onClose={() => setBooking(false)} />
      {pending && <WelcomeSlide key={pending} lang={pending} logoSrc={logo()} onCovered={() => applyLanguage(pending)} onDone={() => setPending(null)} />}
      {intro && !pending && (
        <WelcomeSlide short lang={lang} logoSrc={logo()} onCovered={() => storage("session").set("cc-welcomed", "1")} onDone={() => setIntro(false)} />
      )}
    </SiteContext.Provider>
  );
}

const WIPE: Record<PageKey, string> = {
  home: "#2b211b",
  pizzeria: "#c8372d",
  steakhouse: "#b5541e",
  choucalino: "#4fa3d9",
  menu: "#f0b43a",
  anreise: "#1c1814",
  impressum: "#1c1814",
};

/** On a page change a 0.4 s wipe crosses the screen in the colour of the page you are going to; nothing with reduced motion. */
function PageWipe({ page, reduce }: { page: PageKey; reduce: boolean }) {
  const first = useRef(true);
  const [run, setRun] = useState(0);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!reduce) setRun((n) => n + 1);
  }, [page, reduce]);
  if (!run) return null;
  return (
    <motion.div
      key={run}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[350]"
      style={{ background: WIPE[page] }}
      initial={{ transform: "translateX(-100%)" }}
      animate={{ transform: ["translateX(-100%)", "translateX(0%)", "translateX(100%)"] }}
      transition={{ duration: 0.4, times: [0, 0.45, 1], ease: [0.76, 0, 0.24, 1] }}
    />
  );
}
