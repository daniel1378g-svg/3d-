// The shell around every page: band, header, page (with transitions), footer, language switch, live announcements.
import { Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Router, useLocation, useNavigate, type Loc } from "@/lib/router";
import { cachedDict, isLang, loadDict, HTML_LANG, LANG_NAMES, type Lang } from "@/i18n";
import { matchPath, pathFor, type PageKey } from "@/routes";
import { cachedPage, loadPage, type PageId } from "@/pages/registry";
import { SiteContext, usePrefersReducedMotion, type GoOptions, type Site } from "@/site";
import { ReservationProvider } from "@/reservation/store";
import { Header, MobileNav, ReserveBar } from "@/components/Header";
import { Footer, ProposalBand } from "@/components/Chrome";
import { LangFx } from "@/components/LangFx";
import { storage, LANG_KEY } from "@/lib/storage";
import { loadGsap } from "@/lib/gsap";
import { scrollToAnchor } from "@/components/Link";
import { headFor } from "@/seo";

export function App({ url, memory = false, onNavigate }: { url?: string; memory?: boolean; onNavigate?: (l: Loc) => void }) {
  return (
    <Router memory={memory} initial={url ?? "/"} onNavigate={onNavigate}>
      <ReservationProvider>
        <Shell />
      </ReservationProvider>
    </Router>
  );
}

export function resolve(pathname: string): { lang: Lang; page: PageId } {
  const m = matchPath(pathname);
  if (m) return m;
  const first = pathname.split("/")[1];
  return { lang: isLang(first) ? first : "de", page: "notFound" };
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
type ViewTransitionDoc = Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };

function Shell() {
  const loc = useLocation();
  const navigate = useNavigate();
  const reduced = usePrefersReducedMotion();

  // what the router wants vs. what can be shown (dictionary and page chunk loaded)
  const want = resolve(loc.pathname);
  const ready = !!cachedDict(want.lang) && !!cachedPage(want.page);
  const [, force] = useState(0);
  const shown = useRef(want);
  if (ready) shown.current = want;
  useEffect(() => {
    if (!ready) Promise.all([loadDict(want.lang), loadPage(want.page)]).then(() => force((n) => n + 1));
  }, [ready, want.lang, want.page]);
  const { lang, page } = shown.current;
  const t = cachedDict(lang)!;
  const Page = cachedPage(page)!;

  // ---- header state --------------------------------------------------------------------------------------------
  // `--hs` 0 → 1 over the first 80 px of scroll (88 → 64 px, transforms only); deep surface once the first block of
  // the page (hero, page head) has passed under the header
  const [deep, setDeep] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const header = document.getElementById("site-header");
        const first = document.querySelector<HTMLElement>("main > :first-child");
        const bottom = first ? first.getBoundingClientRect().bottom : Infinity;
        const headerBottom = header ? header.getBoundingClientRect().top + 64 : 90;
        header?.style.setProperty("--hs", Math.min(1, Math.max(0, y / 80)).toFixed(3));
        setDeep(y > 80 && bottom <= headerBottom);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.current?.style.setProperty("--p", (max > 0 ? Math.min(1, y / max) : 0).toFixed(4));
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [loc.key]);
  useEffect(() => setMenuOpen(false), [loc.key]);

  // ---- scroll memory for back/forward --------------------------------------------------------------------------
  const positions = useRef(new Map<string, number>());
  const lastKey = useRef(loc.key);
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const on = () => positions.current.set(lastKey.current, window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // ---- language switch -----------------------------------------------------------------------------------------
  const [fx, setFx] = useState<Lang | null>(null);
  const [fade, setFade] = useState<"" | "out" | "in">("");
  const anchor = useRef<{ id: string; offset: number } | { ratio: number } | null>(null);
  const [announce, setAnnounce] = useState("");

  const captureAnchor = () => {
    const candidates = [...document.querySelectorAll<HTMLElement>("main [id]")].filter((el) => el.offsetParent !== null);
    const line = window.innerHeight * 0.33;
    let best: HTMLElement | null = null;
    for (const el of candidates) {
      const r = el.getBoundingClientRect();
      if (r.top <= line && r.bottom > 0) best = el;
    }
    if (best && window.scrollY > 40) return { id: best.id, offset: best.getBoundingClientRect().top };
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return { ratio: max > 0 ? window.scrollY / max : 0 };
  };

  const commitLanguage = useCallback(
    (next: Lang) => {
      anchor.current = captureAnchor();
      storage("local").set(LANG_KEY, next);
      const target = page === "notFound" ? `/${next}` : pathFor(next, page as PageKey);
      navigate(target + loc.search + loc.hash, { state: { languageSwitch: true } });
      setAnnounce(cachedDict(next)!.a11y.languageChanged(LANG_NAMES[next]));
    },
    [page, loc.search, loc.hash, navigate],
  );

  const requestLanguage = useCallback(
    async (next: Lang) => {
      if (next === lang || fx) return;
      // prefetched on hover/focus of the globe; if the dictionary is still not there after 300 ms, switch without the
      // animation once it has arrived (BRIEF §9)
      const loading = Promise.all([loadDict(next), loadPage(page), loadGsap()]);
      const late = await Promise.race([loading.then(() => false), sleep(300).then(() => true)]);
      if (late || reduced) {
        await loading;
        if (reduced) {
          setFade("out");
          await sleep(75);
        }
        commitLanguage(next);
        return;
      }
      setFade("out");
      setFx(next);
    },
    [lang, fx, page, reduced, commitLanguage],
  );

  // after the new language is rendered: restore the section position, fade the page back in
  useLayoutEffect(() => {
    const a = anchor.current;
    if (!a || !(loc.state as { languageSwitch?: boolean } | null)?.languageSwitch) return;
    anchor.current = null;
    if ("id" in a) {
      const el = document.getElementById(a.id);
      if (el) window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top - a.offset);
    } else {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, a.ratio * max);
    }
    setFade("in");
    const id = window.setTimeout(() => setFade(""), 320);
    return () => window.clearTimeout(id);
  }, [lang, loc.state]);

  // ---- page navigation: a 250 ms crossfade (View Transitions API where supported; 150 ms with reduced motion) -----
  const pendingScroll = useRef<string | null>(null);
  const go = useCallback(
    async (to: string, opts?: GoOptions) => {
      const u = new URL(to, window.location.origin + loc.pathname);
      const target = resolve(u.pathname);
      await Promise.all([loadDict(target.lang), loadPage(target.page)]);
      const url = u.pathname + (opts?.search ?? u.search) + (opts?.anchor ? `#${opts.anchor}` : u.hash);
      pendingScroll.current = opts?.anchor ?? (u.hash ? u.hash.slice(1) : "");
      const doc = document as ViewTransitionDoc;
      if (doc.startViewTransition && u.pathname !== loc.pathname) {
        document.documentElement.dataset.vt = reduced ? "reduced" : "page";
        const vt = doc.startViewTransition(() => flushSync(() => navigate(url, { replace: opts?.replace })));
        vt.finished.finally(() => delete document.documentElement.dataset.vt);
        return;
      }
      navigate(url, { replace: opts?.replace });
    },
    [loc.pathname, reduced, navigate],
  );

  // after each navigation: scroll (anchor, remembered position or top) and move focus to the page heading
  useLayoutEffect(() => {
    const state = loc.state as { languageSwitch?: boolean; keepScroll?: boolean } | null;
    const prevKey = lastKey.current;
    lastKey.current = loc.key;
    if (prevKey === loc.key || state?.languageSwitch || state?.keepScroll) return;
    const target = pendingScroll.current;
    pendingScroll.current = null;
    if (target === null) {
      // back / forward
      window.scrollTo(0, positions.current.get(loc.key) ?? 0);
      return;
    }
    if (target && scrollToAnchor(target, true)) return;
    window.scrollTo(0, 0);
    const h1 = document.querySelector<HTMLElement>("main h1");
    if (h1) {
      h1.setAttribute("tabindex", "-1");
      h1.focus({ preventScroll: true });
    }
  }, [loc.key, loc.state]);

  // first load with a hash (e.g. /de/essen-geniessen#pizzen)
  useEffect(() => {
    if (loc.hash) setTimeout(() => scrollToAnchor(loc.hash.slice(1), true), 60);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- head ----------------------------------------------------------------------------------------------------
  useEffect(() => {
    const h = headFor(lang, page, t);
    document.title = h.title;
    document.documentElement.lang = HTML_LANG[lang];
    document.querySelector('meta[name="description"]')?.setAttribute("content", h.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", h.canonical);
  }, [lang, page, t]);

  // ---- motion flag on <html> -----------------------------------------------------------------------------------
  useEffect(() => {
    // html.motion-ok (scroll reveals) is added by useReveals once it knows what is already on screen
    document.documentElement.classList.toggle("no-motion", reduced);
    if (reduced) document.documentElement.classList.remove("motion-ok");
  }, [reduced]);

  const href = useCallback(
    (p: PageKey, opts?: { lang?: Lang; anchor?: string; search?: string }) => pathFor(opts?.lang ?? lang, p) + (opts?.search ?? "") + (opts?.anchor ? `#${opts.anchor}` : ""),
    [lang],
  );
  const site: Site = useMemo(
    () => ({ lang, t, page, href, go, requestLanguage, switching: !!fx, reduced }),
    [lang, t, page, href, go, requestLanguage, fx, reduced],
  );

  return (
    <SiteContext.Provider value={site}>
      <a className="skip-link" href="#main">{t.a11y.skip}</a>
      <ProposalBand />
      <Header deep={deep} menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((o) => !o)} progressRef={progress} />
      {/* separate hydration units (React yields between them), so the first hydration task stays short */}
      <Suspense fallback={null}>
        <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
      </Suspense>
      <div className="page" data-fade={fade || undefined}>
        <main id="main" tabIndex={-1} lang={HTML_LANG[lang]}>
          <Page key={`${lang}-${page}`} />
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
      <ReserveBar />
      {fx && (
        <LangFx
          to={fx}
          deep={deep}
          onCommit={() => commitLanguage(fx)}
          onDone={() => setFx(null)}
        />
      )}
      <p className="sr-only" aria-live="polite">{announce}</p>
    </SiteContext.Provider>
  );
}
