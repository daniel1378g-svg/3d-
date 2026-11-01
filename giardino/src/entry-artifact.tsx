// The claude.ai preview: one script, everything bundled, a memory router mirrored into a "#de-essen-geniessen" hash
// (the viewer owns the real address). Proposal mode: the reservation and contact forms hand off to e-mail and phone.
import { createRoot } from "react-dom/client";
import { App, resolve } from "./App";
import { registerDicts, LANGS, isLang, type Lang } from "./i18n";
import de from "./i18n/de";
import en from "./i18n/en";
import fr from "./i18n/fr";
import it from "./i18n/it";
import { registerPages } from "./pages/registry";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reserve, { StatusPage } from "./pages/Reserve";
import Kids from "./pages/Kids";
import Hosts from "./pages/Hosts";
import Gallery from "./pages/Gallery";
import Visit, { ContactPage } from "./pages/Visit";
import { Hotels, Jobs, Press, Tour, Imprint, Privacy, NotFound } from "./pages/Info";
import { PAGE_KEYS, pathFor } from "./routes";
import { storage, LANG_KEY } from "./lib/storage";
import { toArtifactHash } from "./components/Link";
import type { Loc } from "./lib/router";
import "./styles/index.css";

registerDicts({ de, en, fr, it });
registerPages({ home: Home, menu: Menu, reserve: Reserve, status: StatusPage, kids: Kids, hosts: Hosts, gallery: Gallery, visit: Visit, contact: ContactPage, hotels: Hotels, jobs: Jobs, press: Press, tour: Tour, imprint: Imprint, privacy: Privacy, notFound: NotFound });

const HASHES = new Map<string, string>();
for (const l of LANGS) for (const p of PAGE_KEYS) HASHES.set(toArtifactHash(pathFor(l, p)).slice(1), pathFor(l, p));
const fromHash = (h: string) => HASHES.get(h.replace(/^#/, "").replace(/[?&].*$/, "")) ?? null;

function preferred(): Lang {
  const saved = storage("local").get(LANG_KEY);
  if (isLang(saved)) return saved;
  for (const tag of navigator.languages ?? [navigator.language]) {
    const b = tag.toLowerCase().slice(0, 2);
    if (isLang(b)) return b;
  }
  return "de";
}

const initial = fromHash(location.hash) ?? pathFor(preferred(), "home");
const sync = (l: Loc) => {
  const h = toArtifactHash(l.pathname);
  if (location.hash !== h) {
    try {
      history.replaceState(null, "", h);
    } catch {
      /* the viewer may forbid it */
    }
  }
};
document.documentElement.lang = resolve(initial).lang;
// what the inline script of index.html does on the real site: JavaScript is on; motion unless the visitor reduces it
document.documentElement.classList.add("js");
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) document.documentElement.classList.add("motion-ok");
const root = document.getElementById("giardino-root")!;
createRoot(root).render(<App url={initial} memory onNavigate={sync} />);
