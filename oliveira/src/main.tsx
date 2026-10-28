import { StrictMode, startTransition, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, MemoryRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import { Shell } from "./App";
import { LANGS, isLang, pageFromSlug, pathFor, type Lang } from "./i18n";
import { storage } from "./lib/utils";
import "@fonts";
import "./index.css";

/** `/` sends visitors to their saved language, else the browser's, else German. */
export function preferredLang(): Lang {
  const saved = storage("local").get("oliveira-lang");
  if (isLang(saved)) return saved;
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag.toLowerCase().slice(0, 2);
    if (isLang(base)) return base;
  }
  return "de";
}

function RootRedirect() {
  return <Navigate to={pathFor(preferredLang(), "home")} replace />;
}

// The claude.ai preview can only carry a plain "#name" in its address, so there the router lives in
// memory and mirrors its path into the hash: /pt/cozinha ↔ #pt-cozinha.
const toHash = (path: string) => "#" + path.split("/").filter(Boolean).join("-");
function fromHash(hash: string) {
  const name = hash.replace(/^#/, "");
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
    if (window.location.hash !== hash) history.replaceState(history.state, "", hash);
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

const routes = (
  <Routes>
    <Route path="/" element={<RootRedirect />} />
    {LANGS.map((l) => (
      <Route key={l} path={`/${l}/:slug?`} element={<Shell lang={l} />} />
    ))}
    <Route path="*" element={<RootRedirect />} />
  </Routes>
);

// Rendered in a transition: React yields to the browser while it builds the page, so the static first
// paint (the prerendered hero) stays responsive.
const root = createRoot(document.getElementById("root")!);
startTransition(() => root.render(
  <StrictMode>
    {__ARTIFACT__ ? (
      <MemoryRouter initialEntries={[fromHash(window.location.hash) ?? pathFor(preferredLang(), "home")]}>
        <HashSync />
        {routes}
      </MemoryRouter>
    ) : (
      <BrowserRouter>{routes}</BrowserRouter>
    )}
  </StrictMode>,
));
