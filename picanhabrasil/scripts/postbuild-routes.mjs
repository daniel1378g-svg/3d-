// After `vite build`: one static HTML file per page and language, each with its own <html lang>, title,
// description, canonical, hreflang alternates and Open Graph, so link previews get the right head without running
// the app.
//
// The demo is an UNOFFICIAL proposal: by default every page is `noindex`, robots.txt disallows crawling, no sitemap
// is written and no Restaurant JSON-LD is emitted. Only an authorised launch (VITE_PROPOSAL=0) turns on indexing,
// the sitemap and the structured data, which are already prepared in src/seo.ts.
import { build } from "esbuild";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const dist = join(root, "dist");
const tmp = join(root, ".cache/seo.cjs");
const proposal = process.env.VITE_PROPOSAL !== "0";
await build({
  stdin: {
    contents: `export { headTags, jsonLd, ORIGIN } from "./src/seo";
      export { LANGS, SLUGS, HTML_LANG, pathFor } from "./src/i18n";
      export { de } from "./src/i18n/de"; export { en } from "./src/i18n/en"; export { pt } from "./src/i18n/pt"; export { fr } from "./src/i18n/fr"; export { it } from "./src/i18n/it";`,
    resolveDir: root,
    loader: "ts",
  },
  bundle: true, platform: "node", format: "cjs", outfile: tmp, logLevel: "warning",
  alias: { "@": join(root, "src"), "@content": join(root, "content") },
  loader: { ".json": "json" },
  define: { "import.meta.env": JSON.stringify({ BASE_URL: "/", DEV: false, VITE_PROPOSAL: proposal ? "1" : "0" }), __ARTIFACT__: "false" },
});
const m = createRequire(import.meta.url)(tmp);
const { headTags, jsonLd, ORIGIN, LANGS, SLUGS, HTML_LANG, pathFor } = m;
const dicts = { de: m.de, en: m.en, pt: m.pt, fr: m.fr, it: m.it };

const shell = readFileSync(join(dist, "index.html"), "utf8");
const robotsMeta = proposal ? '<meta name="robots" content="noindex, nofollow" />' : "";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const pages = LANGS.flatMap((lang) => Object.keys(SLUGS[lang]).map((page) => ({ lang, page })));
for (const { lang, page } of pages) {
  const head = headTags(lang, dicts[lang], page);
  const ld = !proposal && page === "home" ? `\n    <script type="application/ld+json">${JSON.stringify(jsonLd(lang))}</script>` : "";
  const html = shell
    .replace('<html lang="de-CH">', `<html lang="${HTML_LANG[lang]}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(head.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(head.description)}" />`)
    .replace("<!--robots-->", robotsMeta)
    .replace("<!--head-seo-->", head.html + ld);
  const file = join(dist, pathFor(lang, page).replace(/^\//, ""), "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}
// `/` picks the saved or browser language in the app; without JavaScript it goes to German.
writeFileSync(join(dist, "index.html"), shell.replace("<!--robots-->", robotsMeta).replace("<!--head-seo-->", `<link rel="alternate" hreflang="x-default" href="${ORIGIN}/de/" />\n    <noscript><meta http-equiv="refresh" content="0; url=/de/" /></noscript>`));
writeFileSync(join(dist, "404.html"), readFileSync(join(dist, "de", "index.html"), "utf8"));

if (proposal) {
  writeFileSync(join(dist, "robots.txt"), "User-agent: *\nDisallow: /\n");
  console.log(`${pages.length} pages written (noindex, no sitemap: unofficial proposal)`);
} else {
  writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);
  const urls = pages.map(({ lang, page }) => {
    const alts = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[l]}" href="${ORIGIN}${pathFor(l, page)}"/>`).join("\n");
    return `  <url>\n    <loc>${ORIGIN}${pathFor(lang, page)}</loc>\n${alts}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}${pathFor("de", page)}"/>\n  </url>`;
  });
  writeFileSync(join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`);
  console.log(`${pages.length} pages written, sitemap with ${urls.length} URLs, Restaurant JSON-LD on the home pages`);
}
