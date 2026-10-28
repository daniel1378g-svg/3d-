// After `vite build`: one static HTML file per page and language, each with its own <html lang>, title,
// description, canonical, hreflang alternates and Restaurant JSON-LD, so crawlers and link previews get
// the right head without running the app. The app itself still renders on the client.
import { build } from "esbuild";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const dist = join(root, "dist");
const tmp = join(root, ".cache/seo.cjs");
await build({
  stdin: { contents: 'export { headTags } from "./src/seo"; export { LANGS, SLUGS, HTML_LANG } from "./src/i18n";', resolveDir: root, loader: "ts" },
  bundle: true, platform: "node", format: "cjs", outfile: tmp, logLevel: "warning", alias: { "@": join(root, "src") },
});
const { headTags, LANGS, SLUGS, HTML_LANG } = createRequire(import.meta.url)(tmp);

const shell = readFileSync(join(dist, "index.html"), "utf8");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
let count = 0;
for (const lang of LANGS) {
  for (const page of Object.keys(SLUGS[lang])) {
    const head = headTags(lang, page);
    const html = shell
      .replace('<html lang="fr">', `<html lang="${HTML_LANG[lang]}">`)
      .replace(/<title>[^<]*<\/title>/, `<title>${esc(head.title)}</title>`)
      .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(head.description)}" />`)
      .replace("<!--head-seo-->", head.html);
    const file = join(dist, lang, SLUGS[lang][page], "index.html");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    count++;
  }
}
// `/` picks the visitor's language in the app; without JavaScript it goes to French.
writeFileSync(join(dist, "index.html"), shell.replace("<!--head-seo-->", '<link rel="alternate" hreflang="x-default" href="https://donduarte.ch/fr/" />\n    <noscript><meta http-equiv="refresh" content="0; url=/fr/" /></noscript>'));
writeFileSync(join(dist, "404.html"), readFileSync(join(dist, "fr", "index.html"), "utf8"));
// Sitemap with every language version listed as an alternate of each page.
const ORIGIN = "https://donduarte.ch";
const urls = [];
for (const lang of LANGS) for (const page of Object.keys(SLUGS[lang])) {
  const alts = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[l]}" href="${ORIGIN}/${l}/${SLUGS[l][page]}"/>`).join("\n");
  urls.push(`  <url>\n    <loc>${ORIGIN}/${lang}/${SLUGS[lang][page]}</loc>\n${alts}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}/fr/${SLUGS.fr[page]}"/>\n  </url>`);
}
writeFileSync(join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`);
console.log(`${count} pages written, sitemap with ${urls.length} URLs`);
