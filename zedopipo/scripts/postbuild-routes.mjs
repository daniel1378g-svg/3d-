// After `vite build`: one static HTML file per page and language, each with its own <html lang>, title,
// description, canonical, hreflang alternates and Restaurant JSON-LD, so crawlers and link previews get
// the right head without running the app. The app itself still renders on the client.
// Also writes the redirect map for the old WordPress addresses, robots.txt and the sitemap.
import { build } from "esbuild";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const dist = join(root, "dist");
const tmp = join(root, ".cache/seo.cjs");
await build({
  stdin: { contents: 'export { headTags, ORIGIN } from "./src/seo"; export { LANGS, SLUGS, HTML_LANG } from "./src/i18n";', resolveDir: root, loader: "ts" },
  bundle: true, platform: "node", format: "cjs", outfile: tmp, logLevel: "warning", alias: { "@": join(root, "src") },
  loader: { ".json": "json" },
  define: { "import.meta.env": JSON.stringify({ BASE_URL: "/" }) },
});
const { headTags, ORIGIN, LANGS, SLUGS, HTML_LANG } = createRequire(import.meta.url)(tmp);

const shell = readFileSync(join(dist, "index.html"), "utf8");
// Each page preloads its own lazy chunk, so it downloads alongside the main script instead of after it
// (the lower half of the home page is left to load after, so it does not compete with the first paint).
const manifest = JSON.parse(readFileSync(join(dist, ".vite/manifest.json"), "utf8"));
const chunkOf = (name) => {
  const entry = Object.values(manifest).find((e) => e.isDynamicEntry && e.file.startsWith(`assets/${name}-`));
  return entry ? `/${entry.file}` : null;
};
const PRELOAD = { home: [chunkOf("Home")], menu: [chunkOf("MenuPage")] };
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
      .replace("<!--head-seo-->", [head.html, ...PRELOAD[page].filter(Boolean).map((f) => `<link rel="modulepreload" crossorigin href="${f}" />`)].join("\n"));
    const file = join(dist, lang, SLUGS[lang][page], "index.html");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    count++;
  }
}
// `/` picks the visitor's language in the app; without JavaScript it goes to French.
writeFileSync(
  join(dist, "index.html"),
  shell.replace("<!--head-seo-->", `<link rel="alternate" hreflang="x-default" href="${ORIGIN}/fr/" />\n    <noscript><meta http-equiv="refresh" content="0; url=/fr/" /></noscript>`),
);
writeFileSync(join(dist, "404.html"), readFileSync(join(dist, "fr", "index.html"), "utf8"));

// Old WordPress addresses → new ones (Netlify / Cloudflare Pages `_redirects` format). The `#a-propos`
// anchor needs no rule: the story section keeps that id, so /#a-propos still lands on it.
const redirects = [
  ["/menu", "/fr/menu", 301],
  ["/menu/", "/fr/menu", 301],
];
writeFileSync(join(dist, "_redirects"), redirects.map((r) => r.join("  ")).join("\n") + "\n");
writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);

const urls = [];
for (const lang of LANGS)
  for (const page of Object.keys(SLUGS[lang])) {
    const alts = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[l]}" href="${ORIGIN}${path(l, page)}"/>`).join("\n");
    urls.push(`  <url>\n    <loc>${ORIGIN}${path(lang, page)}</loc>\n${alts}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}${path("fr", page)}"/>\n  </url>`);
  }
writeFileSync(join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`);
console.log(`${count} pages written, ${redirects.length} redirects, sitemap with ${urls.length} URLs`);
