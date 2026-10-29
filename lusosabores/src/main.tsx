import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Redirect, Router, useLocation, useNavigate } from "./lib/router";
import { Shell, preloadPage } from "./App";
import { isLang, pageFromSlug, pathFor, type Lang } from "./i18n";
import { storage } from "./lib/utils";
import "./index.css";

/** `/` sends visitors to their saved language, else the browser's, else French. */
export function preferredLang(): Lang {
  const saved = storage("local").get("ls-lang");
  if (isLang(saved)) return saved;
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag.toLowerCase().slice(0, 2);
    if (isLang(base)) return base;
  }
  return "fr";
}

/** /fr/menu → the shell for French; anything else goes to the preferred language's home. */
function Routes() {
  const { pathname } = useLocation();
  const [, lang, ...rest] = pathname.split("/");
  if (!isLang(lang)) return <Redirect to={pathFor(preferredLang(), "home")} />;
  return <Shell lang={lang} slug={rest.join("/")} />;
}

// The claude.ai preview can only carry a plain "#name" in its address, so there the router lives in
// memory and mirrors its path into the hash: /de/speisekarte ↔ #de-speisekarte.
const toHash = (path: string) => "#" + path.split("/").filter(Boolean).join("-");
function fromHash(hash: string) {
  const name = hash.replace(/^#/, "").replace(/[?&]gl=1/, "");
  const lang = name.slice(0, 2);
  if (!isLang(lang)) return null;
  const slug = name.slice(3);
  return pageFromSlug(lang, slug) ? `/${lang}/${slug}` : null;
}
function HashSync() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const hash = toHash(location.pathname);
    if (window.location.hash !== hash) history.replaceState(null, "", hash);
  }, [location.pathname]);
  useEffect(() => {
    const onHash = () => {
      const path = fromHash(window.location.hash);
      if (path) navigate(path);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [navigate]);
  return null;
}


/** The page the visitor lands on, so its chunk can load before the first render. */
function landingPage() {
  const path = __ARTIFACT__ ? fromHash(window.location.hash) ?? pathFor(preferredLang(), "home") : window.location.pathname;
  const [, lang, ...rest] = path.split("/");
  return (isLang(lang) && pageFromSlug(lang, rest.join("/"))) || "home";
}

const ready = preloadPage(landingPage()).catch(() => undefined);
ready.then(() => createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {__ARTIFACT__ ? (
      <Router memory initial={fromHash(window.location.hash) ?? pathFor(preferredLang(), "home")}>
        <HashSync />
        <Routes />
      </Router>
    ) : (
      <Router>
        <Routes />
      </Router>
    )}
  </StrictMode>,
));
