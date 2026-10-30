import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Router, useLocation, useNavigate } from "./lib/router";
import { Shell } from "./App";
import { cachedDict, isLang, LANGS, loadDict, pathFor, SLUGS, type Lang, type PageKey } from "./i18n";
import { storage } from "./lib/utils";
import "./index.css";

/** `/` sends visitors to their saved language, else the browser's, else German. */
export function preferredLang(): Lang {
  const saved = storage("local").get("pb-lang");
  if (isLang(saved)) return saved;
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag.toLowerCase().slice(0, 2);
    if (isLang(base)) return base;
  }
  return "de";
}

function Routes() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [, first, ...rest] = pathname.split("/");
  const lang = isLang(first) ? first : null;
  // arriving in another language without the switch (back button, edited address): load its dictionary first
  const [, loaded] = useState(0);
  const missing = !!lang && !cachedDict(lang);
  useEffect(() => {
    if (missing) loadDict(lang!).then(() => loaded((n) => n + 1));
  }, [missing, lang]);
  useEffect(() => {
    if (!lang) navigate(pathFor(preferredLang(), "home"), { replace: true });
  }, [lang, navigate]);
  if (!lang || missing) return null;
  return <Shell lang={lang} slug={rest.join("/")} />;
}

// The claude.ai preview can only carry a plain "#name" (letters, digits, hyphens), so there the router lives in
// memory and mirrors its path into the hash: /de/karte ↔ #de-karte, /en/book-a-table ↔ #en-book-a-table.
const toHash = (path: string) => "#" + (path.replace(/^\/|\/$/g, "").split("/").filter(Boolean).join("-") || "de");
const HASHES = new Map<string, string>();
for (const lang of LANGS) {
  for (const page of Object.keys(SLUGS[lang]) as PageKey[]) {
    HASHES.set(toHash(pathFor(lang, page)).slice(1), pathFor(lang, page));
  }
}
function fromHash(hash: string) {
  return HASHES.get(hash.replace(/^#/, "").replace(/[?&].*$/, "")) ?? null;
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

const initialPath = __ARTIFACT__ ? fromHash(window.location.hash) ?? pathFor(preferredLang(), "home") : window.location.pathname;
const initialLang = (() => {
  const l = initialPath.split("/")[1];
  return isLang(l) ? l : preferredLang();
})();

loadDict(initialLang).then(() =>
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      {__ARTIFACT__ ? (
        <Router memory initial={initialPath}>
          <HashSync />
          <Routes />
        </Router>
      ) : (
        <Router>
          <Routes />
        </Router>
      )}
    </StrictMode>,
  ),
);
