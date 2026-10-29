// After `vite build`: one static HTML file per page and language, each with its own <html lang>, title,
// description, canonical, hreflang alternates and Restaurant JSON-LD, so crawlers and link previews get the
// right head without running the app. Also writes the 301 map for the old WordPress addresses
// (Netlify / Cloudflare Pages `_redirects` format), robots.txt and the sitemap.
import { build } from "esbuild";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const dist = join(root, "dist");
const tmp = join(root, ".cache/seo.cjs");
await build({
  stdin: { contents: 'export { headTags, ORIGIN } from "./src/seo"; export { LANGS, SLUGS, HTML_LANG } from "./src/i18n";', resolveDir: root, loader: "ts" },
  bundle: true, platform: "node", format: "cjs", outfile: tmp, logLevel: "warning",
  alias: { "@": join(root, "src"), "@content": join(root, "content") },
  loader: { ".json": "json" },
  define: { "import.meta.env": JSON.stringify({ BASE_URL: "/" }), __ARTIFACT__: "false" },
});
const { headTags, ORIGIN, LANGS, SLUGS, HTML_LANG } = createRequire(import.meta.url)(tmp);

const shell = readFileSync(join(dist, "index.html"), "utf8");
// the hero's still sea is the largest paint on the home page: fetch it alongside the script
// the inner pages' hero photos
const HERO_IMG = { carte: "plats-table", galerie: "plats-table", commande: "leitao" };
const PRELOAD_HERO = '\n    <link rel="preload" as="image" href="/hero/ocean-800.webp" media="(max-width: 700px)" fetchpriority="high" />\n    <link rel="preload" as="image" href="/hero/ocean-1600.webp" media="(min-width: 701px)" fetchpriority="high" />';
// Each page preloads its own lazy chunk and the chunks it imports, so they download alongside the main
// script instead of after it (the lower half of the home page and three.js are left to load later).
const manifest = JSON.parse(readFileSync(join(dist, ".vite/manifest.json"), "utf8"));
const PAGE_SRC = { home: "src/pages/Home.tsx", carte: "src/pages/CartePage.tsx", commande: "src/pages/SurCommandePage.tsx", vins: "src/pages/VinsPage.tsx", galerie: "src/pages/GaleriePage.tsx", acces: "src/pages/AccesPage.tsx" };
function chunksOf(key, seen = new Set()) {
  const e = manifest[key];
  if (!e || seen.has(key) || key === "index.html") return seen;
  seen.add(key);
  for (const i of e.imports ?? []) chunksOf(i, seen);
  return seen;
}
const modulepreload = (page) =>
  [...chunksOf(PAGE_SRC[page])].map((k) => `\n    <link rel="modulepreload" crossorigin href="/${manifest[k].file}" />`).join("");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const path = (lang, page) => `/${lang}/${SLUGS[lang][page]}`;
let count = 0;
for (const lang of LANGS) {
  for (const page of Object.keys(SLUGS[lang])) {
    const head = headTags(lang, page);
    const html = shell
      .replace('<html lang="fr">', `<html lang="${HTML_LANG[lang]}">`)
      .replace(/<title>[^<]*<\/title>/, `<title>${esc(head.title)}</title>`)
      .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(head.description)}" />`)
      .replace("<!--head-seo-->", head.html + (page === "home" ? PRELOAD_HERO : "") + modulepreload(page) + (HERO_IMG[page] ? `\n    <link rel="preload" as="image" href="/images/${HERO_IMG[page]}.webp" imagesrcset="/images/${HERO_IMG[page]}-sm.webp 640w, /images/${HERO_IMG[page]}.webp 1200w" imagesizes="(min-width: 1520px) 1400px, 92vw" fetchpriority="high" />` : ""));
    const file = join(dist, lang, SLUGS[lang][page], "index.html");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    count++;
  }
}
// `/` picks the visitor's saved or browser language in the app; without JavaScript it goes to French.
writeFileSync(join(dist, "index.html"), shell.replace("<!--head-seo-->", `<link rel="alternate" hreflang="x-default" href="${ORIGIN}/fr/" />\n    <noscript><meta http-equiv="refresh" content="0; url=/fr/" /></noscript>`));
writeFileSync(join(dist, "404.html"), readFileSync(join(dist, "fr", "index.html"), "utf8"));

// Old WordPress addresses → new ones, by what each old page contains. "/" is handled by the root index.html
// (saved or browser language, else /fr/). The carte PDF keeps being served until the owner retires it.
const OLD = [
  ["/la-carte", "/fr/carte"],
  ["/sur-commande", "/fr/sur-commande"],
  ["/nos-vins", "/fr/vins"],
  ["/plan-dacces", "/fr/plan-d-acces"],
  // found in wp-sitemap.xml: a test copy of a contact page with a form (not in the menu)
  ["/contact-version-test-elementor-sans-wp-form", "/fr/plan-d-acces"],
];
const lines = OLD.flatMap(([from, to]) => [`${from}  ${to}  301`, `${from}/  ${to}  301`]);
writeFileSync(join(dist, "_redirects"), lines.join("\n") + "\n");
writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);

const urls = [];
for (const lang of LANGS)
  for (const page of Object.keys(SLUGS[lang])) {
    const alts = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[l]}" href="${ORIGIN}${path(l, page)}"/>`).join("\n");
    urls.push(`  <url>\n    <loc>${ORIGIN}${path(lang, page)}</loc>\n${alts}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}${path("fr", page)}"/>\n  </url>`);
  }
writeFileSync(join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`);
console.log(`${count} pages written, ${OLD.length} old addresses redirected (${lines.length} rules), sitemap with ${urls.length} URLs`);
