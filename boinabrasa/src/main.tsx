import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Router, useLocation, useNavigate } from "./lib/router";
import { Shell } from "./App";
import { ZhPage } from "./pages/ZhPage";
import { ARTICLES, isLang, LANGS, loadDict, pathFor, SLUGS, type Lang, type PageKey } from "./i18n";
import { storage } from "./lib/utils";
import "./index.css";

/** `/` sends visitors to their saved language, else the browser's, else German. */
export function preferredLang(): Lang {
  const saved = storage("local").get("bb-lang");
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
  useEffect(() => {
    if (!lang && first !== "zh") navigate(pathFor(preferredLang(), "home"), { replace: true });
  }, [lang, first, navigate]);
  if (first === "zh") return <ZhPage />;
  if (!lang) return null;
  return <Shell lang={lang} slug={rest.join("/")} />;
}

// The claude.ai preview can only carry a plain "#name" (letters, digits, hyphens), so there the router lives in
// memory and mirrors its path into the hash: /de/preise ↔ #de-preise, /en/stories/picanha ↔ #en-stories-picanha.
const toHash = (path: string) => "#" + (path.replace(/^\/|\/$/g, "").split("/").filter(Boolean).join("-") || "de");
const HASHES = new Map<string, string>();
for (const lang of LANGS) {
  for (const page of Object.keys(SLUGS[lang]) as PageKey[]) {
    HASHES.set(toHash(pathFor(lang, page)).slice(1), pathFor(lang, page));
    if (page === "wissen") for (const a of ARTICLES) HASHES.set(toHash(pathFor(lang, page, a)).slice(1), pathFor(lang, page, a));
  }
}
HASHES.set("zh", "/zh/");
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
