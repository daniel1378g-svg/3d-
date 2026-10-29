// After `vite build`: one static HTML file per page and language, each with its own <html lang>, title,
// description, canonical, hreflang alternates (and the Restaurant JSON-LD on the home pages), so crawlers
// and link previews get the right head without running the app. The app itself renders on the client.
// Also writes the redirects for the old one-page site, robots.txt and the sitemap.
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

// The prerender bundle: the whole app for Node (CSS imports are left to the browser build).
const ssr = join(root, ".cache/prerender.cjs");
await build({
  entryPoints: [join(root, "src/prerender.tsx")],
  bundle: true, platform: "node", format: "cjs", outfile: ssr, logLevel: "warning", jsx: "automatic",
  alias: { "@": join(root, "src") },
  loader: { ".json": "json", ".css": "empty" },
  define: { __ARTIFACT__: "false", "import.meta.env.BASE_URL": '"/"', "import.meta.env.VITE_PROPOSAL": "undefined", "process.env.NODE_ENV": '"production"' },
});
const { render } = createRequire(import.meta.url)(ssr);
const path = (lang, page) => `/${lang}/${SLUGS[lang][page]}`;

const shell = readFileSync(join(dist, "index.html"), "utf8");
// Each page preloads its own lazy chunk and its first large image, so neither waits for the main script.
const manifest = JSON.parse(readFileSync(join(dist, ".vite/manifest.json"), "utf8"));
const chunkOf = (name) => {
  const entry = Object.values(manifest).find((e) => e.isDynamicEntry && e.file.startsWith(`assets/${name}-`));
  if (!entry) return "";
  // the page chunk and the shared chunks it imports (the entry script is already in the page), and their
  // CSS, so the prerendered first screen is styled before the scripts run
  const deps = [entry, ...(entry.imports ?? []).filter((k) => k !== "index.html").map((k) => manifest[k])];
  const css = [...new Set(deps.flatMap((d) => d.css ?? []))];
  return [...css.map((f) => `<link rel="stylesheet" href="/${f}" />`), ...deps.map((d) => `<link rel="modulepreload" crossorigin href="/${d.file}" />`)].join("\n    ");
};
const PRELOAD = {
  home: [chunkOf("Home"), '<link rel="preload" as="image" type="image/webp" href="/brand/oiseau-480.webp" fetchpriority="high" />'],
  carte: [
    chunkOf("CartePage"),
    '<link rel="preload" as="image" type="image/webp" imagesrcset="/media/photos/salgados-presunto-640.webp 640w, /media/photos/salgados-presunto-960.webp 960w, /media/photos/salgados-presunto-lg.webp 1200w" imagesizes="(max-width: 767px) 100vw, 92vw" fetchpriority="high" />',
  ],
  privacy: [chunkOf("PrivacyPage")],
};
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
let count = 0;
for (const lang of LANGS) {
  for (const page of Object.keys(SLUGS[lang])) {
    const head = headTags(lang, page);
    const markup = await render(path(lang, page));
    const html = shell
      .replace('<html lang="fr">', `<html lang="${HTML_LANG[lang]}">`)
      .replace(/<title>[^<]*<\/title>/, `<title>${esc(head.title)}</title>`)
      .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(head.description)}" />`)
      .replace("<!--head-seo-->", [head.html, ...PRELOAD[page]].filter(Boolean).join("\n    "))
      .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
      // only the home page plays the intro, so the other pages don't download its logo
      .replace(/<div class="intro-static"[^]*?<\/div>/, (panel) => (page === "home" ? panel : ""));
    const file = join(dist, lang, SLUGS[lang][page], "index.html");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    // hosts that map /fr/carte to /fr/carte.html rather than /fr/carte/index.html
    if (SLUGS[lang][page]) writeFileSync(join(dist, lang, `${SLUGS[lang][page]}.html`), html);
    count++;
  }
}
// `/` picks the visitor's language in the app (keeping an old #anchor); without JavaScript it goes to French.
writeFileSync(
  join(dist, "index.html"),
  shell.replace("<!--head-seo-->", `<link rel="alternate" hreflang="x-default" href="${ORIGIN}/fr/" />\n    <noscript><meta http-equiv="refresh" content="0; url=/fr/" /></noscript>`),
);
writeFileSync(join(dist, "404.html"), readFileSync(join(dist, "fr", "index.html"), "utf8"));

// The live site is one page: its sections are anchors on "/", which the new home pages keep in every
// language (#accueil, #carte, #reservation, #galerie, #infos, #facebook-latest). A server never sees the
// anchor, so "/" itself is not redirected: the app sends it to the visitor's language with the anchor kept.
const redirects = [
  ["/index.html", "/fr/", 301],
  ["/carte", "/fr/carte", 301],
  ["/menu", "/en/menu", 301],
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
