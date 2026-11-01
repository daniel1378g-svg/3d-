// Server renderer for the prerender script: every dictionary and page registered up front, rendered to a string.
import { renderToString } from "react-dom/server";
import { App, resolve } from "./App";
import { registerDicts } from "./i18n";
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
import { headHtml, ORIGIN } from "./seo";
import { menuLd, restaurantLd } from "./seo-ld";
import { preloadTag } from "./components/Img";
import { PHOTO, HERO_SIZES } from "./home/Hero";
import type { PageId } from "./pages/registry";

// re-exported for scripts/prerender.mjs
export { LANGS, HTML_LANG } from "./i18n";
export { PAGE_KEYS, INDEXED, pathFor, LEGACY_REDIRECTS, LEGACY_FILES } from "./routes";
export { ORIGIN };

/** The LCP image of a page, preloaded with high priority (home: the hero photograph). */
export function preloadFor(page: PageId) {
  return page === "home" ? preloadTag(PHOTO, HERO_SIZES, 1600) : "";
}

registerDicts({ de, en, fr, it });
registerPages({ home: Home, menu: Menu, reserve: Reserve, status: StatusPage, kids: Kids, hosts: Hosts, gallery: Gallery, visit: Visit, contact: ContactPage, hotels: Hotels, jobs: Jobs, press: Press, tour: Tour, imprint: Imprint, privacy: Privacy, notFound: NotFound });

const DICTS = { de, en, fr, it };
export function render(url: string, opts: { structuredData: boolean }) {
  const { lang, page } = resolve(new URL(url, "http://x").pathname);
  const t = DICTS[lang];
  const html = renderToString(<App url={url} memory />);
  const ld: object[] = [];
  if (opts.structuredData && page !== "notFound" && page !== "status") {
    ld.push(restaurantLd(lang));
    if (page === "menu") ld.push(menuLd(lang));
  }
  return { html, lang, page, head: headHtml(lang, page, t), title: page === "notFound" ? t.meta.titles.notFound : t.meta.titles[page], description: page === "notFound" ? t.meta.descriptions.notFound : t.meta.descriptions[page], ld };
}
