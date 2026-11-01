// Browser entry: loads the dictionary and page chunk for this address, then hydrates the prerendered HTML.
import { hydrateRoot, createRoot } from "react-dom/client";
import { App, resolve } from "./App";
import { loadDict, isLang, type Lang } from "./i18n";
import { loadPage } from "./pages/registry";
import { pathFor } from "./routes";
import { storage, LANG_KEY } from "./lib/storage";
import "./styles/index.css";

/** `/` → the saved language, else the browser's, else German. */
export function preferredLang(): Lang {
  const saved = storage("local").get(LANG_KEY);
  if (isLang(saved)) return saved;
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag.toLowerCase().slice(0, 2);
    if (isLang(base)) return base;
  }
  return "de";
}

async function boot() {
  if (location.pathname === "/" || location.pathname === "/index.html") {
    location.replace(pathFor(preferredLang(), "home") + location.search + location.hash);
    return;
  }
  // the URL prefix is the only source of truth for the language; the remembered choice is written only when the
  // visitor picks a language (App, commitLanguage) – BRIEF §9
  const { lang, page } = resolve(location.pathname);
  await Promise.all([loadDict(lang), loadPage(page)]);
  // let the browser paint the pre-rendered page first: hydration is CPU work that must never delay the first frame
  // (or the largest contentful paint)
  await new Promise<void>((r) => requestAnimationFrame(() => setTimeout(r, 0)));
  const root = document.getElementById("root")!;
  const url = location.pathname + location.search + location.hash;
  if (root.firstElementChild) hydrateRoot(root, <App url={url} />);
  else createRoot(root).render(<App url={url} />);
}
boot();
