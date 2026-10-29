import { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Redirect, useLocation, useNavigate } from "./lib/router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { refreshScroll } from "./lib/scroll";
import { HTML_LANG, SLUGS, UI, pageFromSlug, pathFor, type Lang, type PageKey } from "./i18n";
import { SiteContext, type Site } from "./site";
import { applyHead } from "./seo";
import { prefersReducedMotion, storage } from "./lib/utils";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WelcomeSlide } from "./components/WelcomeSlide";

const PROPOSAL = import.meta.env.VITE_PROPOSAL !== "0";
const BookingDrawer = lazy(() => import("./components/BookingDrawer").then((m) => ({ default: m.BookingDrawer })));

/**
 * Like React.lazy, but a page whose chunk is already loaded renders at once. main.tsx loads the landing
 * page's chunk before the first render, so the first paint already holds the page (and its hero image).
 */
function lazyPage(load: () => Promise<{ default: React.ComponentType }>) {
  let Loaded: React.ComponentType | null = null;
  let promise: Promise<unknown> | null = null;
  const preload = () =>
    (promise ??= load().then(
      (m) => (Loaded = m.default),
      (error) => {
        promise = null; // a failed download is tried again on the next render
        throw error;
      },
    ));
  const Page = () => {
    if (!Loaded) throw preload();
    return <Loaded />;
  };
  Page.preload = preload;
  return Page;
}
const PAGE_COMPONENTS: Record<PageKey, ReturnType<typeof lazyPage>> = {
  home: lazyPage(() => import("./pages/Home")),
  carte: lazyPage(() => import("./pages/CartePage")),
  vins: lazyPage(() => import("./pages/VinsPage")),
  galerie: lazyPage(() => import("./pages/GaleriePage")),
  presse: lazyPage(() => import("./pages/PressePage")),
  actualites: lazyPage(() => import("./pages/ActualitesPage")),
  contact: lazyPage(() => import("./pages/ContactPage")),
};
export const preloadPage = (page: PageKey) => PAGE_COMPONENTS[page].preload();

/**
 * Scrolls to a section once it exists in the given page: smoothly on the same page, at once after a page
 * change (the page that is leaving may have an element with the same id, e.g. #sur-commande).
 */
function scrollToSection(id: string, page: PageKey, smooth = false) {
  let tries = 0;
  const attempt = () => {
    const el = document.querySelector<HTMLElement>(`main[data-page="${page}"] [id="${id}"]`);
    if (el) el.scrollIntoView({ behavior: smooth && !prefersReducedMotion() ? "smooth" : "auto", block: "start" });
    else if (tries++ < 60) setTimeout(attempt, 50);
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

export function Shell({ lang, slug }: { lang: Lang; slug: string }) {
  const page = pageFromSlug(lang, slug);
  const navigate = useNavigate();
  const location = useLocation();
  const reduce = useReducedMotion();
  const [pending, setPending] = useState<Lang | null>(null);
  // The first-visit intro: on the home page, once per session, never with reduced motion.
  const [intro, setIntro] = useState(() => page === "home" && storage("session").get("lp-intro") !== "1" && !prefersReducedMotion());
  const [booking, setBooking] = useState(false);
  const [bookingLoaded, setBookingLoaded] = useState(false);
  const lastPage = useRef<PageKey | null>(null);
  const anchor = useRef<{ id: string; offset: number } | null>(null);
  const scrollY = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
    storage("local").set("lp-lang", lang);
  }, [lang]);
  // After a language switch the same block stays at the same height on screen, whatever the new text length.
  useLayoutEffect(() => {
    const a = anchor.current;
    anchor.current = null;
    const el = a && document.getElementById(a.id);
    if (a && el) window.scrollBy({ top: el.getBoundingClientRect().top - a.offset, behavior: "instant" as ScrollBehavior });
    else if (scrollY.current !== null) window.scrollTo({ top: scrollY.current, behavior: "instant" as ScrollBehavior });
    scrollY.current = null;
    refreshScroll();
  }, [lang]);
  useEffect(() => {
    if (page) applyHead(lang, page);
  }, [lang, page]);

  // A new page starts at the top, or at the requested section; a language switch keeps the scroll.
  useEffect(() => {
    if (!page) return;
    const state = location.state as { section?: string; langSwitch?: boolean } | null;
    const section = state?.section ?? (__ARTIFACT__ ? "" : location.hash.replace(/^#/, ""));
    if (!state?.langSwitch) {
      if (section) scrollToSection(section, page);
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
      if (p === page) {
        if (section) scrollToSection(section, p, true);
        else window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
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
    scrollY.current = window.scrollY;
    navigate(pathFor(next, page) + (__ARTIFACT__ ? "" : window.location.hash), { state: { langSwitch: true } });
  };
  const book = useCallback(() => {
    setBookingLoaded(true);
    setBooking(true);
  }, []);
  const endIntro = useCallback(() => setIntro(false), []);

  const site: Site = useMemo(
    () => ({ lang, page: page ?? "home", requestLanguage, switching: pending !== null, go, href, book, introDone: !intro }),
    [lang, page, requestLanguage, pending, go, href, book, intro],
  );
  if (!page) return <Redirect to={pathFor(lang, "home")} />;
  const Page = PAGE_COMPONENTS[page];

  return (
    <SiteContext.Provider value={site}>
      {PROPOSAL && (
        <p className="proposal-label" role="note" lang="pt-PT">
          {UI.proposal}
        </p>
      )}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-10 focus:z-[800] focus:rounded-full focus:bg-dourado focus:px-5 focus:py-3 focus:font-display focus:font-semibold focus:uppercase focus:tracking-[0.12em] focus:text-tinta"
      >
        {UI.skip[lang]}
      </a>
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          tabIndex={-1}
          key={page}
          data-page={page}
          className="outline-none"
          initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(12px)" }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)", transitionEnd: { transform: "none" } }}
          onAnimationComplete={() => refreshScroll()}
          exit={{ opacity: 0, transition: { duration: 0.14 } }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <Suspense fallback={<div className="min-h-[100svh] bg-azulejo" />}>
            <Page />
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      {bookingLoaded && (
        <Suspense fallback={null}>
          <BookingDrawer open={booking} onClose={() => setBooking(false)} />
        </Suspense>
      )}
      {pending && <WelcomeSlide key={pending} lang={pending} onCovered={() => applyLanguage(pending)} onDone={() => setPending(null)} />}
      {intro && !pending && <WelcomeSlide intro lang={lang} onCovered={() => storage("session").set("lp-intro", "1")} onDone={endIntro} />}
    </SiteContext.Provider>
  );
}
