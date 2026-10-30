// After `vite build`: one static HTML file per page and language (+ article pages), each with its own <html lang>,
// title, description, canonical, hreflang alternates, Open Graph and (home) the Restaurant JSON-LD, so crawlers and
// link previews get the right head without running the app. Also writes the sitemap, robots.txt and the 301 map for
// the old Joomla addresses (Netlify / Cloudflare Pages `_redirects` format).
import { build } from "esbuild";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const dist = join(root, "dist");
const tmp = join(root, ".cache/seo.cjs");
await build({
  stdin: {
    contents: `export { headTags, ORIGIN } from "./src/seo";
      export { LANGS, SLUGS, HTML_LANG, ARTICLES, pathFor } from "./src/i18n";
      export { de } from "./src/i18n/de"; export { en } from "./src/i18n/en"; export { pt } from "./src/i18n/pt"; export { fr } from "./src/i18n/fr"; export { it } from "./src/i18n/it";`,
    resolveDir: root,
    loader: "ts",
  },
  bundle: true, platform: "node", format: "cjs", outfile: tmp, logLevel: "warning",
  alias: { "@": join(root, "src"), "@content": join(root, "content") },
  loader: { ".json": "json" },
  define: { "import.meta.env": JSON.stringify({ BASE_URL: "/", DEV: false }), __ARTIFACT__: "false" },
});
const m = createRequire(import.meta.url)(tmp);
const { headTags, ORIGIN, LANGS, SLUGS, HTML_LANG, ARTICLES, pathFor } = m;
const dicts = { de: m.de, en: m.en, pt: m.pt, fr: m.fr, it: m.it };
const articles = Object.fromEntries(LANGS.map((l) => [l, JSON.parse(readFileSync(join(root, `content/articles.${l}.json`), "utf8"))]));

const shell = readFileSync(join(dist, "index.html"), "utf8");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const pages = [];
for (const lang of LANGS) {
  for (const page of Object.keys(SLUGS[lang])) {
    pages.push({ lang, page });
    if (page === "wissen") for (const a of ARTICLES) pages.push({ lang, page, article: a });
  }
}
for (const { lang, page, article } of pages) {
  const title = article ? articles[lang][article].title : undefined;
  const head = headTags(lang, dicts[lang], page, article, title);
  const preload = page === "home" ? '\n    <link rel="preload" as="image" href="/poster/hero-1600.webp" media="(min-aspect-ratio: 1/1)" />' : "";
  const html = shell
    .replace('<html lang="de-CH">', `<html lang="${HTML_LANG[lang]}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(head.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(head.description)}" />`)
    .replace("<!--head-seo-->", head.html + preload);
  const file = join(dist, pathFor(lang, page, article).replace(/^\//, ""), "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}
// `/` picks the saved or browser language in the app; without JavaScript it goes to German.
writeFileSync(join(dist, "index.html"), shell.replace("<!--head-seo-->", `<link rel="alternate" hreflang="x-default" href="${ORIGIN}/de/" />\n    <noscript><meta http-equiv="refresh" content="0; url=/de/" /></noscript>`));
writeFileSync(join(dist, "404.html"), readFileSync(join(dist, "de", "index.html"), "utf8"));
mkdirSync(join(dist, "zh"), { recursive: true });
writeFileSync(join(dist, "zh", "index.html"), shell.replace('<html lang="de-CH">', '<html lang="zh-Hant">').replace(/<title>[^<]*<\/title>/, "<title>歡迎光臨 Boinabrasa｜巴西烤肉吃到飽</title>").replace("<!--head-seo-->", ""));

// Old Joomla addresses → new ones (by what each old page contains).
const OLD = [
  ["/ch", "/de/"], ["/ch/churrasco", "/de/churrasco"], ["/ch/spiesse", "/de/spiesse"], ["/ch/preise", "/de/preise"],
  ["/ch/gruppen", "/de/gruppen"], ["/ch/gutscheine", "/de/gutscheine"], ["/ch/kontakt", "/de/kontakt"],
  ["/ch/impressum", "/de/impressum"], ["/ch/datenschutz", "/de/datenschutz"], ["/ch/agb", "/de/agb"],
  ["/ch/dolcebrigadeiro", "/de/dolcebrigadeiro"], ["/ch/steakhouse-der-besonderen-art", "/de/ueber-uns"],
  ["/ch/blog", "/de/wissen-und-genuss"], ["/ch/blog/picanha", "/de/wissen-und-genuss/picanha"],
  ["/ch/blog/maminha-churrasco", "/de/wissen-und-genuss/maminha"], ["/ch/blog/linguica-churrasco", "/de/wissen-und-genuss/linguica"],
  ["/ch/blog/original-caipirinha-brasilien", "/de/wissen-und-genuss/caipirinha"],
  ["/ch/blog/brasilianische-gerichte", "/de/wissen-und-genuss/brasilianische-gerichte"], ["/ch/blog/gaucho-grill", "/de/wissen-und-genuss/gaucho-grill"],
  ["/en/groups-2", "/en/groups"], ["/en/coupons-en", "/en/gift-vouchers"], ["/en/dolcebrigadeiro-en", "/en/dolcebrigadeiro"],
  ["/en/terms-and-conditions", "/en/terms"],
];
const lines = OLD.flatMap(([from, to]) => (from.endsWith("/") ? [`${from}  ${to}  301`] : [`${from}  ${to}  301`, `${from}/  ${to}  301`]));
// the Chinese page lives at ?view=article&id=57:chinese&catid=2 on the old site (Netlify query matching)
lines.push("/ch/ view=article id=57:chinese catid=2 /zh/ 301");
writeFileSync(join(dist, "_redirects"), lines.join("\n") + "\n");
writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);

const urls = pages.map(({ lang, page, article }) => {
  const alts = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[l]}" href="${ORIGIN}${pathFor(l, page, article)}"/>`).join("\n");
  return `  <url>\n    <loc>${ORIGIN}${pathFor(lang, page, article)}</loc>\n${alts}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}${pathFor("de", page, article)}"/>\n  </url>`;
});
writeFileSync(join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`);
console.log(`${pages.length} pages written, ${OLD.length + 1} old addresses redirected, sitemap with ${urls.length} URLs`);
