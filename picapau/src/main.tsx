import { StrictMode, useEffect } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter, MemoryRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import { Shell } from "./App";
import { ANCHORS, LANGS, isLang, pageFromSlug, pathFor, type Lang } from "./i18n";
import { storage } from "./lib/utils";
import "./index.css";

/** `/` sends visitors to their saved language, else the browser's, else French. */
export function preferredLang(): Lang {
  const saved = storage("local").get("pp-lang");
  if (isLang(saved)) return saved;
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag.toLowerCase().slice(0, 2);
    if (isLang(base)) return base;
  }
  return "fr";
}

/** The old one-page addresses (/#carte, /#reservation …) keep their anchor on the new home page. */
function RootRedirect() {
  const { hash } = useLocation();
  const anchor = hash.replace(/^#/, "");
  const keep = (ANCHORS as readonly string[]).includes(anchor) ? hash : "";
  return <Navigate to={pathFor(preferredLang(), "home") + keep} replace />;
}

// The claude.ai preview can only carry a plain "#name" in its address, so there the router lives in
// memory and mirrors its path into the hash: /de/speisekarte ↔ #de-speisekarte.
const toHash = (path: string) => "#" + (path.split("/").filter(Boolean).join("-") || "fr");
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

const routes = (
  <Routes>
    <Route path="/" element={<RootRedirect />} />
    {LANGS.map((l) => (
      <Route key={l} path={`/${l}/:slug?`} element={<Shell lang={l} />} />
    ))}
    <Route path="*" element={<RootRedirect />} />
  </Routes>
);

// In the preview, an old anchor (#carte …) opens the home page at that section.
const startAnchor = window.location.hash.replace(/^#/, "");
const artifactStart = fromHash(window.location.hash) ?? pathFor(preferredLang(), "home");

const app = (
  <StrictMode>
    {__ARTIFACT__ ? (
      <MemoryRouter initialEntries={[{ pathname: artifactStart, state: (ANCHORS as readonly string[]).includes(startAnchor) ? { section: startAnchor } : null }]}>
        <HashSync />
        {routes}
      </MemoryRouter>
    ) : (
      <BrowserRouter>{routes}</BrowserRouter>
    )}
  </StrictMode>
);

// The static pages arrive prerendered: React takes over that markup instead of painting it a second time.
// Where the first render still differs (reduced motion, an old #anchor that mounts every section at once),
// React renders afresh, as createRoot would, so that case needs no report.
const root = document.getElementById("root")!;
if (root.firstElementChild) hydrateRoot(root, app, { onRecoverableError: () => {} });
else createRoot(root).render(app);
