// After `vite build`: one static HTML file per page and language (dist/<lang>/<slug>/index.html), each with its own
// <html lang>, title, description, canonical, hreflang alternates, Open Graph tags and Restaurant JSON-LD, so crawlers
// and link previews get the right head without running the app, plus a <noscript> block with the essentials.
// Also writes robots.txt, sitemap.xml, 404.html and the 301 map (_redirects, Netlify / Cloudflare Pages format) for
// every address of the current site.
import { build } from "esbuild";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const dist = join(root, "dist");
const tmp = join(root, ".cache/seo.cjs");
await build({
  stdin: {
    contents: `export { headTags, ORIGIN } from "./src/seo"; export { LANGS, SLUGS, HTML_LANG, NATIVE, UI, PAGES, pathFor } from "./src/i18n"; export { BUSINESS, MENUS } from "./src/content/business"; export { noticeFor, zurichNow, WEEK, showSlots, dayName } from "./src/content/hours"; export { TX } from "./src/content/copy";`,
    resolveDir: root,
    loader: "ts",
  },
  bundle: true,
  platform: "node",
  format: "cjs",
  outfile: tmp,
  logLevel: "warning",
  alias: { "@": join(root, "src") },
  loader: { ".json": "json" },
  define: { "import.meta.env": JSON.stringify({ BASE_URL: "/", VITE_ORIGIN: process.env.VITE_ORIGIN }), __ARTIFACT__: "false" },
});
const m = createRequire(import.meta.url)(tmp);
const { headTags, ORIGIN, LANGS, SLUGS, HTML_LANG, NATIVE, UI, PAGES, pathFor, BUSINESS, MENUS, noticeFor, zurichNow, WEEK, showSlots, dayName, TX } = m;

const shell = readFileSync(join(dist, "index.html"), "utf8");
const manifest = JSON.parse(readFileSync(join(dist, ".vite/manifest.json"), "utf8"));
const PAGE_SRC = { home: "src/pages/Home.tsx", menu: "src/pages/MenuPage.tsx", families: "src/pages/FamiliesPage.tsx", story: "src/pages/StoryPage.tsx", visit: "src/pages/VisitPage.tsx", gallery: "src/pages/GalleryPage.tsx", hotels: "src/pages/HotelsPage.tsx", jobs: "src/pages/InfoPages.tsx", press: "src/pages/InfoPages.tsx", imprint: "src/pages/InfoPages.tsx", privacy: "src/pages/InfoPages.tsx" };
function chunksOf(key, seen = new Set()) {
  const e = manifest[key];
  if (!e || seen.has(key) || key === "index.html") return seen;
  seen.add(key);
  for (const i of e.imports ?? []) chunksOf(i, seen);
  return seen;
}
const modulepreload = (page) => [...chunksOf(PAGE_SRC[page])].map((k) => `\n    <link rel="modulepreload" crossorigin href="/${manifest[k].file}" />`).join("");
// the largest paint of each page: the hero pizza on the home page, the page photo elsewhere
const HERO = { home: ["pizza-ham-rocket", "100vw"], menu: ["pizza-rocket", "32vw"], families: ["ship-cliffs", "32vw"], story: ["hosts", "32vw"], visit: ["aerial-front", "32vw"], gallery: ["terrace-view", "32vw"], hotels: ["garden-view", "32vw"], jobs: ["interior-room", "32vw"], press: ["door-lettering", "32vw"] };
const photos = JSON.parse(readFileSync(join(root, "src/content/photos.json"), "utf8"));
const preload = (page) => {
  const h = HERO[page];
  if (!h) return "";
  const p = photos.find((x) => x.id === h[0]);
  const set = p.widths.map((w) => `/images/${p.id}-${w}.avif ${w}w`).join(", ");
  return `\n    <link rel="preload" as="image" type="image/avif" imagesrcset="${set}" imagesizes="${h[1]}" fetchpriority="high" />`;
};
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Without JavaScript: the essentials as plain HTML, in the page language. */
function noscript(lang, page) {
  const notice = noticeFor(zurichNow().date);
  const days = [1, 2, 3, 4, 5, 6, 0].map((d) => `<li>${esc(dayName(d, lang))}: ${esc(showSlots(WEEK.restaurant[d], lang, UI.restDay[lang]))}</li>`).join("");
  const langs = LANGS.map((l) => `<a href="${pathFor(l, page)}" hreflang="${HTML_LANG[l]}" lang="${HTML_LANG[l]}">${NATIVE[l]}</a>`).join(" · ");
  const menus = MENUS.map((x) => `<li><a href="${esc(x.href)}">${esc(x.title[lang])} (PDF)</a></li>`).join("");
  return `<noscript><div style="font:17px/1.6 system-ui,sans-serif;max-width:760px;margin:40px auto;padding:0 20px;color:#1b1b1b">
      <h1 style="font-size:40px;line-height:1">${esc(BUSINESS.name)}</h1>
      <p>${esc(TX.h1[lang])}</p>
      <p>${esc(BUSINESS.street)}, ${esc(BUSINESS.postcode)} ${esc(BUSINESS.town)} · <a href="tel:${BUSINESS.tel}">${esc(BUSINESS.phone)}</a> · <a href="mailto:${BUSINESS.email}">${esc(BUSINESS.email)}</a></p>
      ${notice ? `<p><strong>${esc(notice.title[lang])}</strong>: ${esc(notice.text[lang])}</p>` : ""}
      <h2>${esc(TX.hoursTitle[lang])}</h2><ul>${days}</ul><p>${esc(TX.kitchenLine[lang])}</p>
      <h2>${esc(TX.menusTitle[lang])}</h2><ul>${menus}</ul>
      <p>${langs}</p>
    </div></noscript>`;
}

let count = 0;
for (const lang of LANGS) {
  for (const page of PAGES) {
    const head = headTags(lang, page);
    const html = shell
      .replace('<html lang="de-CH">', `<html lang="${HTML_LANG[lang]}">`)
      .replace(/<title>[^<]*<\/title>/, `<title>${esc(head.title)}</title>`)
      .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(head.description)}" />`)
      .replace("<!--head-seo-->", head.html + preload(page) + modulepreload(page))
      .replace("<!--noscript-->", noscript(lang, page));
    const slug = SLUGS[lang][page];
    const file = join(dist, lang, slug, "index.html");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    count++;
  }
}
// `/` sends visitors to their saved or browser language in the app; without JavaScript to German.
writeFileSync(join(dist, "index.html"), shell.replace("<!--head-seo-->", `<link rel="alternate" hreflang="x-default" href="${ORIGIN}/de/" />\n    <noscript><meta http-equiv="refresh" content="0; url=/de/" /></noscript>`).replace("<!--noscript-->", ""));
writeFileSync(join(dist, "404.html"), readFileSync(join(dist, "de", "index.html"), "utf8"));

// every address of the current site → the page with the same content (301)
const OLD = {
  "/de/essen-geniessen": "/de/speisekarte", "/de/kids": "/de/familien", "/de/gastgeber": "/de/geschichte", "/de/reservation": "/de/besuch",
  "/de/allgemein/jobs": "/de/jobs", "/de/allgemein/anreise": "/de/besuch#arrival", "/de/allgemein/rundgang": "/de/besuch", "/de/allgemein/impressionen": "/de/galerie",
  "/de/allgemein/presse": "/de/presse", "/de/allgemein/kontakt": "/de/besuch#contact", "/de/allgemein": "/de/", "/de/allgemein/leukerbad-therme": "/de/besuch",
  "/en/eat-enjoy": "/en/menu", "/en/kids": "/en/families", "/en/host": "/en/our-story", "/en/bookings": "/en/visit-us",
  "/en/meta/jobs": "/en/jobs", "/en/meta/arrival": "/en/visit-us#arrival", "/en/meta/virtual-tour": "/en/visit-us", "/en/meta/press": "/en/press",
  "/en/meta/contact": "/en/visit-us#contact", "/en/meta": "/en/", "/en/meta/leukerbad-therme": "/en/visit-us",
  "/fr/manger-et-savourer": "/fr/carte", "/fr/enfants": "/fr/familles", "/fr/hotes": "/fr/notre-histoire", "/fr/reservation": "/fr/visite",
  "/fr/hotel-partner": "/fr/hotels-partenaires", "/fr/empreinte": "/fr/mentions-legales", "/fr/meta/emplois": "/fr/emplois", "/fr/meta/arrivee": "/fr/visite#arrival",
  "/fr/meta/tour-virtuel": "/fr/visite", "/fr/meta/presse": "/fr/presse", "/fr/meta/contact": "/fr/visite#contact", "/fr/meta": "/fr/", "/fr/meta/leukerbad-therme": "/fr/visite",
  "/it/mangia-e-divertiti": "/it/menu", "/it/kids": "/it/famiglie", "/it/la-casa": "/it/la-nostra-storia", "/it/prenotazione": "/it/visitarci",
  "/it/partner-albergos": "/it/hotel-partner", "/it/impronta": "/it/note-legali", "/it/meta/lavoro": "/it/lavoro", "/it/meta/come-arrivare": "/it/visitarci#arrival",
  "/it/meta/tour-virtuale": "/it/visitarci", "/it/meta/stampa": "/it/stampa", "/it/meta/contatto": "/it/visitarci#contact", "/it/meta": "/it/", "/it/meta/leukerbad-therme": "/it/visitarci",
};
writeFileSync(join(dist, "_redirects"), Object.entries(OLD).flatMap(([from, to]) => [`${from}  ${to}  301`, `${from}/  ${to}  301`]).join("\n") + "\n");
writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);
const urls = [];
for (const lang of LANGS)
  for (const page of PAGES) {
    const alts = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[l]}" href="${ORIGIN}${pathFor(l, page)}"/>`).join("\n");
    urls.push(`  <url>\n    <loc>${ORIGIN}${pathFor(lang, page)}</loc>\n${alts}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}${pathFor("de", page)}"/>\n  </url>`);
  }
writeFileSync(join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`);
console.log(`${count} pages written, ${Object.keys(OLD).length} old addresses redirected, sitemap with ${urls.length} URLs`);
