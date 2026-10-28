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
import { CursorFollower } from "./components/CursorFollower";
import { Home } from "./pages/Home";
import { Offer } from "./pages/Offer";
import { Contact } from "./pages/Contact";

const PROPOSAL = import.meta.env.VITE_PROPOSAL !== "0";
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
    if (lenis) lenis.scrollTo(el, { offset, ...(smooth ? { duration: 1.1 } : { immediate: true }) });
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
  const [intro, setIntro] = useState(() => storage("session").get("chezmanu-welcomed") !== "1");
  const [wipe, setWipe] = useState(0);
  const lastPage = useRef<PageKey | null>(null);
  const anchor = useRef<{ id: string; offset: number } | null>(null);

  // Smooth scroll with a little weight, kept in step with GSAP's ScrollTrigger (off for reduced motion).
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.12, wheelMultiplier: 0.95 });
    setScroller(lenis);
    let off = () => {};
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      const update = () => ScrollTrigger.update();
      lenis.on("scroll", update);
      off = () => lenis.off("scroll", update);
    });
    return () => {
      off();
      lenis.destroy();
      setScroller(null);
    };
  }, []);

  // The static first paint's proposal band gives way to the app's own copy (same place, same text).
  useEffect(() => document.getElementById("shell-label")?.remove(), []);
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
    storage("local").set("chezmanu-lang", lang);
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

  const site: Site = useMemo(
    () => ({ lang, page: page ?? "home", requestLanguage, switching: pending !== null, go, href }),
    [lang, page, requestLanguage, pending, go, href],
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
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-12 focus:z-[600] focus:rounded-full focus:bg-espresso focus:px-4 focus:py-2 focus:text-flour">
        {UI.skip[lang]}
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {page === "home" && <Home />}
        {page === "offer" && <Offer />}
        {page === "contact" && <Contact />}
        <Suspense fallback={<div className="min-h-[100svh]" />}>
          {(page === "privacy" || page === "legal") && <Legal page={page} />}
        </Suspense>
      </main>
      <Footer />
      <AnimatePresence>
        {wipe > 0 && !reduce && (
          <motion.div
            key={wipe}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[450] bg-custard"
            initial={{ transform: "translateY(100%)" }}
            animate={{ transform: ["translateY(100%)", "translateY(0%)", "translateY(-100%)"] }}
            transition={{ duration: 0.4, times: [0, 0.45, 1], ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>
      <CursorFollower />
      {pending && <WelcomeSlide key={pending} lang={pending} onCovered={() => applyLanguage(pending)} onDone={() => setPending(null)} />}
      {intro && !pending && (
        <WelcomeSlide intro lang={lang} onCovered={() => storage("session").set("chezmanu-welcomed", "1")} onDone={() => setIntro(false)} />
      )}
    </SiteContext.Provider>
  );
}
