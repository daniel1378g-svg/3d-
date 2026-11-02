import { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Redirect, useLocation, useNavigate } from "./lib/router";
import { refreshScroll } from "./lib/scroll";
import { HTML_LANG, SLUGS, UI, pageFromSlug, pathFor, type Lang, type PageKey } from "./i18n";
import { SiteContext, type Site } from "./site";
import { applyHead } from "./seo";
import { prefersReducedMotion, storage } from "./lib/utils";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WelcomeSlide } from "./components/WelcomeSlide";
import { ErrorBoundary } from "./components/ErrorBoundary";

/** The permanent proposal band: always in the claude.ai preview build (CLAUDE.md), optional elsewhere. */
const BAND = __ARTIFACT__ || import.meta.env.VITE_PROPOSAL === "1";
const BookingDrawer = lazy(() => import("./components/BookingDrawer").then((m) => ({ default: m.BookingDrawer })));

/** Like React.lazy, but a page whose chunk is already loaded renders at once (main.tsx preloads the landing page). */
function lazyPage(load: () => Promise<{ default: React.ComponentType }>) {
  let Loaded: React.ComponentType | null = null;
  let promise: Promise<unknown> | null = null;
  const preload = () =>
    (promise ??= load().then(
      (m) => (Loaded = m.default),
      (error) => {
        promise = null;
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
  menu: lazyPage(() => import("./pages/MenuPage")),
  families: lazyPage(() => import("./pages/FamiliesPage")),
  story: lazyPage(() => import("./pages/StoryPage")),
  visit: lazyPage(() => import("./pages/VisitPage")),
  gallery: lazyPage(() => import("./pages/GalleryPage")),
  hotels: lazyPage(() => import("./pages/HotelsPage")),
  jobs: lazyPage(() => import("./pages/InfoPages").then((m) => ({ default: m.JobsPage }))),
  press: lazyPage(() => import("./pages/InfoPages").then((m) => ({ default: m.PressPage }))),
  imprint: lazyPage(() => import("./pages/InfoPages").then((m) => ({ default: m.ImprintPage }))),
  privacy: lazyPage(() => import("./pages/InfoPages").then((m) => ({ default: m.PrivacyPage }))),
};
export const preloadPage = (page: PageKey) => PAGE_COMPONENTS[page].preload();

/** Scrolls to a section once it exists: smoothly on the same page, at once after a page change. */
function scrollToSection(id: string, page: PageKey, smooth = false) {
  let tries = 0;
  const attempt = () => {
    const el = document.querySelector<HTMLElement>(`main[data-page="${page}"] [id="${id}"]`);
    if (el) el.scrollIntoView({ behavior: smooth && !prefersReducedMotion() ? "smooth" : "auto", block: "start" });
    else if (tries++ < 80) setTimeout(attempt, 50);
  };
  attempt();
}

/** The anchored block nearest the top of the screen and how far it sits from the top. Sections that are scrolled
 *  partly past (a pinned scene, say) count too: their offset is negative and is kept exactly. */
function scrollAnchor() {
  const line = Math.min(220, window.innerHeight * 0.3);
  let best: { id: string; offset: number } | null = null;
  for (const el of document.querySelectorAll<HTMLElement>("main [data-anchor][id]")) {
    const r = el.getBoundingClientRect();
    if (r.height === 0) continue;
    if (r.top <= line && r.bottom > 0 && (!best || r.top > best.offset)) best = { id: el.id, offset: r.top };
  }
  return best;
}

export function Shell({ lang, slug }: { lang: Lang; slug: string }) {
  const page = pageFromSlug(lang, slug);
  const navigate = useNavigate();
  const location = useLocation();
  const reduce = useReducedMotion();
  const [pending, setPending] = useState<Lang | null>(null);
  const [intro, setIntro] = useState(() => page === "home" && storage("session").get("gd-intro") !== "1" && !prefersReducedMotion());
  const [booking, setBooking] = useState(false);
  const [bookingLoaded, setBookingLoaded] = useState(false);
  const lastPage = useRef<PageKey | null>(null);
  const anchor = useRef<{ id: string; offset: number } | null>(null);
  const scrollY = useRef<number | null>(null);

  useEffect(() => {
    storage("local").set("gd-lang", lang);
  }, [lang]);

  // After a language switch the same block stays at the same height on screen, however long the new texts are.
  useLayoutEffect(() => {
    const a = anchor.current;
    const y = scrollY.current;
    anchor.current = null;
    scrollY.current = null;
    if (!a && y === null) return;
    const place = () => {
      const el = a && document.getElementById(a.id);
      if (a && el) window.scrollBy({ top: el.getBoundingClientRect().top - a.offset, behavior: "instant" as ScrollBehavior });
      else if (y !== null) window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
    };
    refreshScroll();
    place();
    // once more after the next frame: scroll scenes re-measure after the new texts have settled
    requestAnimationFrame(() => {
      refreshScroll();
      place();
    });
  }, [lang]);

  useEffect(() => {
    if (page) applyHead(lang, page);
  }, [lang, page]);

  // A new page starts at the top (or at the requested section) and takes the focus; a language switch keeps both.
  useEffect(() => {
    if (!page) return;
    const state = location.state as { section?: string; langSwitch?: boolean } | null;
    const section = state?.section ?? (__ARTIFACT__ ? "" : location.hash.replace(/^#/, ""));
    if (!state?.langSwitch) {
      const changed = lastPage.current !== null && lastPage.current !== page;
      if (section) scrollToSection(section, page);
      else if (changed) window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      if (changed) requestAnimationFrame(() => document.getElementById("main")?.focus({ preventScroll: true }));
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
      if (pending || next === lang) return; // the current language does nothing; repeated clicks are ignored
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
      {BAND && (
        <p className="proposal-band" role="note">
          <span lang="pt-PT">{UI.proposal}</span>
          <span className="proposal-local" lang={HTML_LANG[lang]}>
            {UI.proposalLocal[lang]}
          </span>
        </p>
      )}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-12 focus:z-[800] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:font-display focus:font-semibold focus:uppercase focus:tracking-[0.12em] focus:text-ink">
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
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        >
          <ErrorBoundary key={page}>
            <Suspense fallback={<div className="min-h-[100svh] bg-olive" />}>
              <Page />
            </Suspense>
          </ErrorBoundary>
        </motion.main>
      </AnimatePresence>
      <Footer />
      {bookingLoaded && (
        <Suspense fallback={null}>
          <BookingDrawer open={booking} onClose={() => setBooking(false)} />
        </Suspense>
      )}
      {pending && <WelcomeSlide key={pending} lang={pending} onCovered={() => applyLanguage(pending)} onDone={() => setPending(null)} />}
      {intro && !pending && <WelcomeSlide intro lang={lang} onCovered={() => storage("session").set("gd-intro", "1")} onDone={endIntro} />}
    </SiteContext.Provider>
  );
}
