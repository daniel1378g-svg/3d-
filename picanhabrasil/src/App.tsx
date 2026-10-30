import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { cachedDict, HTML_LANG, loadDict, pathFor, routeFromSlug, type Anchor, type Lang, type PageKey } from "./i18n";
import { useNavigate } from "./lib/router";
import { PROPOSAL, PROPOSAL_TEXT, SiteContext, type Site } from "./site";
import { useReducedMotion } from "./lib/motion";
import { scrollTo, startScroll } from "./lib/scroll";
import { ScrollTrigger } from "./lib/gsap";
import { storage } from "./lib/utils";
import { booking } from "./lib/store";
import { applySeo } from "./seo";
import { Header } from "./components/Header";
import { MenuOverlay } from "./components/MenuOverlay";
import { Footer } from "./components/Footer";
import { Intro } from "./components/Intro";
import { LanguageTransition, type LanguageTransitionHandle } from "./components/LanguageTransition";
import { BookingSheet } from "./components/BookingSheet";
import { Home } from "./pages/Home";

const lazyPage = <K extends string>(load: () => Promise<Record<K, ComponentType>>, name: K) =>
  lazy(() => load().then((m) => ({ default: m[name] })));

const PAGES: Record<PageKey, ComponentType> = {
  home: Home,
  karte: lazyPage(() => import("./pages/Karte"), "Karte"),
  reservieren: lazyPage(() => import("./pages/Reservieren"), "Reservieren"),
  bestellen: lazyPage(() => import("./pages/Bestellen"), "Bestellen"),
  impressum: lazyPage(() => import("./pages/Legal"), "Legal"),
};

/** Where the visitor is (the section in the upper third of the screen, or the page top) and how far into it, to
 * come back to the same place after a switch even when the translated text above it is longer or shorter. */
function captureAnchor() {
  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-anchor]"));
  const y = window.scrollY;
  let best: { id: string; offset: number } | null = null;
  for (const el of els) {
    const top = el.getBoundingClientRect().top + y;
    if (top <= y + window.innerHeight * 0.35) best = { id: el.dataset.anchor!, offset: y - top };
  }
  return best ?? { id: "", offset: y };
}
function restoreAnchor(a: { id: string; offset: number }) {
  const el = a.id ? document.querySelector<HTMLElement>(`[data-anchor="${a.id}"]`) : null;
  const top = el ? el.getBoundingClientRect().top + window.scrollY + a.offset : a.offset;
  scrollTo(top, { immediate: true });
  window.scrollTo(0, top);
}

export function Shell({ lang, slug }: { lang: Lang; slug: string }) {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const route = routeFromSlug(lang, slug);
  const page = route?.page ?? "home";
  const t = cachedDict(lang)!;
  const [switching, setSwitching] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const transition = useRef<LanguageTransitionHandle>(null);
  const [intro, setIntro] = useState(() => page === "home" && !storage("session").get("pb-intro"));

  // document language, title, description, alternates
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
    applySeo(lang, page);
    storage("local").set("pb-lang", lang);
  }, [lang, page]);

  useEffect(() => {
    document.documentElement.classList.add("js-motion");
    startScroll();
  }, []);

  // page changes: to the top (or to the hash), then let ScrollTrigger measure again
  const firstNav = useRef(true);
  const switchingRef = useRef(false);
  useLayoutEffect(() => {
    if (firstNav.current) { firstNav.current = false; return; }
    if (switchingRef.current) return;
    const hash = window.location.hash.replace(/^#/, "");
    const el = hash && !__ARTIFACT__ ? document.getElementById(hash) : null;
    if (el) scrollTo(el, { immediate: true });
    else scrollTo(0, { immediate: true });
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [page]);

  const href = useCallback(
    (p: PageKey, opts?: { anchor?: Anchor }) => pathFor(lang, p) + (opts?.anchor ? `#${opts.anchor}` : ""),
    [lang],
  );
  const go = useCallback(
    (p: PageKey, opts?: { anchor?: Anchor }) => {
      setMenuOpen(false);
      if (p === page && opts?.anchor) {
        const el = document.getElementById(opts.anchor);
        if (el) scrollTo(el);
        return;
      }
      navigate(href(p, opts));
      if (opts?.anchor) {
        const id = opts.anchor;
        requestAnimationFrame(() => requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el) scrollTo(el, { immediate: true });
        }));
      }
    },
    [navigate, href, page],
  );

  // a switch asked for while one is running replaces the target instead of stacking a second animation
  const pendingLang = useRef<Lang | null>(null);
  const latestRequest = useRef<(l: Lang) => void>(() => {});
  const requestLanguage = useCallback(
    async (next: Lang) => {
      if (switchingRef.current) { pendingLang.current = next; return; }
      if (next === lang) return;
      switchingRef.current = true;
      setSwitching(true);
      setMenuOpen(false);
      const anchor = captureAnchor();
      const dict = loadDict(next);
      await transition.current?.cover(next);
      await dict;
      navigate(pathFor(next, page));
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      restoreAnchor(anchor);
      ScrollTrigger.refresh();
      restoreAnchor(anchor);
      await transition.current?.reveal();
      switchingRef.current = false;
      setSwitching(false);
      const queued = pendingLang.current;
      pendingLang.current = null;
      if (queued && queued !== next) requestAnimationFrame(() => latestRequest.current(queued));
    },
    [lang, navigate, page],
  );

  latestRequest.current = requestLanguage;

  const openBooking = useCallback((guests?: number) => {
    if (guests) booking.set({ guests });
    setMenuOpen(false);
    setSheetOpen(true);
  }, []);

  const endIntro = useCallback(() => {
    storage("session").set("pb-intro", "1");
    setIntro(false);
  }, []);

  const site: Site = useMemo(
    () => ({ lang, t, page, requestLanguage, switching, go, href, openBooking, introDone: !intro, reduce }),
    [lang, t, page, requestLanguage, switching, go, href, openBooking, intro, reduce],
  );

  if (!route) return <NotFoundRedirect lang={lang} />;
  const Page = PAGES[page];

  return (
    <SiteContext.Provider value={site}>
      {PROPOSAL && (
        <p className="proposal-label" role="note" lang="pt-PT">
          {PROPOSAL_TEXT}
          {lang !== "pt" && <span lang={HTML_LANG[lang]} className="max-lg:hidden"> · {t.proposal.split(" – ")[0]}</span>}
        </p>
      )}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-12 focus:z-[960] focus:rounded-full focus:bg-ouro focus:px-5 focus:py-3 focus:text-carvao">
        {t.a11y.skip}
      </a>
      <Header onMenu={() => setMenuOpen(true)} menuOpen={menuOpen} />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main id="main" tabIndex={-1} className="outline-none" data-page={page}>
        <Suspense fallback={<div className="min-h-[100svh]" aria-busy="true" />}>
          <Page />
        </Suspense>
      </main>
      <Footer />
      <BookingSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
      <LanguageTransition ref={transition} />
      {intro && <Intro onDone={endIntro} />}
    </SiteContext.Provider>
  );
}

function NotFoundRedirect({ lang }: { lang: Lang }) {
  const navigate = useNavigate();
  useEffect(() => navigate(pathFor(lang, "home"), { replace: true }), [lang, navigate]);
  return null;
}
