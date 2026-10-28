import { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HTML_LANG, SLUGS, UI, pageFromSlug, pathFor, type Lang, type PageKey } from "./i18n";
import { SiteContext, type Site } from "./site";
import { applyHead } from "./seo";
import { storage } from "./lib/utils";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WelcomeSlide } from "./components/WelcomeSlide";
import { Home } from "./pages/Home";
import { DESSERTS, PLATS, VINS } from "./content";

const PROPOSAL = import.meta.env.VITE_PROPOSAL !== "0";
const MenuPage = lazy(() => import("./pages/MenuPage").then((m) => ({ default: m.MenuPage })));

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
  const candidates = [...document.querySelectorAll<HTMLElement>("main [id], main [data-group]")];
  let best: { id: string; offset: number } | null = null;
  for (const el of candidates) {
    if (!el.id) continue;
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
  const [intro, setIntro] = useState(() => storage("session").get("dd-welcomed") !== "1");
  const lastPage = useRef<PageKey | null>(null);
  const anchor = useRef<{ id: string; offset: number } | null>(null);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
    storage("local").set("dd-lang", lang);
  }, [lang]);
  // After a language switch the same block stays at the same height on screen, whatever the new text length.
  useLayoutEffect(() => {
    const a = anchor.current;
    anchor.current = null;
    const el = a && document.getElementById(a.id);
    if (a && el) window.scrollBy({ top: el.getBoundingClientRect().top - a.offset, behavior: "instant" as ScrollBehavior });
    ScrollTrigger.refresh();
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

  const site: Site = useMemo(() => ({ lang, page: page ?? "home", requestLanguage, switching: pending !== null, go, href }), [lang, page, requestLanguage, pending, go, href]);
  if (!page) return <Navigate to={pathFor(lang, "home")} replace />;

  return (
    <SiteContext.Provider value={site}>
      {PROPOSAL && (
        <p className="proposal-label" role="note" lang="pt-PT">
          {UI.proposal}
        </p>
      )}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-12 focus:z-[500] focus:rounded-full focus:bg-green focus:px-4 focus:py-2 focus:text-white">
        {UI.skip[lang]}
      </a>
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          key={page}
          initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(10px)" }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)", transitionEnd: { transform: "none" } }}
          onAnimationComplete={() => ScrollTrigger.refresh()}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          {page === "home" && <Home />}
          <Suspense fallback={<div className="min-h-[80svh]" />}>
            {page === "plats" && <MenuPage page="plats" menu={PLATS} />}
            {page === "vins" && <MenuPage page="vins" menu={VINS} />}
            {page === "desserts" && <MenuPage page="desserts" menu={DESSERTS} />}
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      {pending && (
        <WelcomeSlide
          key={pending}
          lang={pending}
          onCovered={() => applyLanguage(pending)}
          onDone={() => setPending(null)}
        />
      )}
      {intro && !pending && (
        <WelcomeSlide
          intro
          lang={lang}
          onCovered={() => storage("session").set("dd-welcomed", "1")}
          onDone={() => setIntro(false)}
        />
      )}
    </SiteContext.Provider>
  );
}
