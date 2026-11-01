// After `vite build` and `vite build --ssr src/entry-server.tsx`: one static HTML file per page and language, each with
// its own <html lang>, title and description, the server-rendered page in #root (menus, hours, phone, the reservation
// request form and the legal pages work without JavaScript), plus robots.txt, the 404 page and the redirect map.
//
// Proposal mode (default, VITE_PROPOSAL≠0, BRIEF §0 and §13): noindex on every page, a disallow-all robots.txt, no
// sitemap, no canonical, no hreflang, no Open Graph URLs and no JSON-LD – nothing points at pizzeriagiardino.ch as if
// this were the official site. Launch mode (VITE_PROPOSAL=0): canonical, reciprocal hreflang + x-default, Open Graph,
// Restaurant JSON-LD with verified facts only, sitemap.xml, and the owners' menu PDFs and film copied into dist/.
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

const root = new URL("..", import.meta.url).pathname;
const dist = join(root, "dist");
const PROPOSAL = process.env.VITE_PROPOSAL !== "0";
const ssr = await import(pathToFileURL(join(root, ".cache/ssr/entry-server.mjs")).href);
const { render, preloadFor, LANGS, PAGE_KEYS, INDEXED, HTML_LANG, pathFor, LEGACY_REDIRECTS, LEGACY_FILES, ORIGIN } = ssr;

let shell = readFileSync(join(dist, "index.html"), "utf8");
// The app script starts after the first frame: the pre-rendered page (and its LCP image) never competes with it for
// bandwidth or the main thread. One identical inline loader on every page (server/ hashes it into the CSP).
shell = shell.replace(/<script type="module" crossorigin src="(\/assets\/index-[\w-]+\.js)"><\/script>/, (_, src) =>
  `<script>(function(){function go(){var s=document.createElement("script");s.type="module";s.crossOrigin="";s.src="${src}";document.head.appendChild(s)}if(document.visibilityState==="hidden")go();else requestAnimationFrame(function(){setTimeout(go,0)})})()</script>`,
);
if (!shell.includes('s.type="module"')) throw new Error("the app script tag was not found in dist/index.html");
for (const mark of ["<!--robots-->", "<!--preload-->", "<!--head-->", "<!--app-->", '<html lang="de-CH">']) {
  if (!shell.includes(mark)) throw new Error(`index.html lost its placeholder ${mark}`);
}
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// JSON-LD inside <script>: never let a value close the tag
const ldJson = (o) => JSON.stringify(o).replace(/</g, "\\u003c");

function page(url, { status = false } = {}) {
  const r = render(url, { structuredData: !PROPOSAL });
  const robots = PROPOSAL || status ? '<meta name="robots" content="noindex, nofollow" />' : "";
  const head = PROPOSAL ? "" : [r.head, ...r.ld.map((o) => `<script type="application/ld+json">${ldJson(o)}</script>`)].join("\n    ");
  return shell
    .replace('<html lang="de-CH">', `<html lang="${HTML_LANG[r.lang]}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(r.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(r.description)}" />`)
    .replace("<!--robots-->", robots)
    .replace("<!--preload-->", preloadFor(r.page))
    .replace("<!--head-->", head)
    .replace("<!--app-->", r.html);
}

const write = (rel, html) => {
  const file = join(dist, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
};

let count = 0;
for (const lang of LANGS) {
  for (const key of PAGE_KEYS) {
    const path = pathFor(lang, key);
    write(join(path.replace(/^\//, ""), "index.html"), page(path, { status: key === "status" }));
    count++;
  }
}
// 404: the German not-found page (the server sends it with status 404; static hosts use 404.html)
write("404.html", page("/de/__404", { status: true }));

// `/`: the app picks the remembered language (only ever set by an explicit choice), then the browser's, then German;
// without JavaScript the meta refresh goes to German
const rootHead = [
  PROPOSAL ? '<meta name="robots" content="noindex, nofollow" />' : `<link rel="alternate" hreflang="x-default" href="${ORIGIN}/de" />`,
  '<noscript><meta http-equiv="refresh" content="0; url=/de" /></noscript>',
].join("\n    ");
write("index.html", shell.replace("<!--robots-->", "").replace("<!--preload-->", "").replace("<!--head-->", rootHead).replace("<!--app-->", ""));

// robots.txt, sitemap
if (PROPOSAL) {
  write("robots.txt", "# Design proposal – not the official website of Pizzeria Giardino. Please do not index.\nUser-agent: *\nDisallow: /\n");
  rmSync(join(dist, "sitemap.xml"), { force: true });
} else {
  write("robots.txt", `User-agent: *\nAllow: /\nDisallow: /staff\nDisallow: /api/\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);
  const urls = LANGS.flatMap((lang) =>
    INDEXED.map((key) => {
      const alts = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${ORIGIN}${pathFor(l, key)}"/>`).join("\n");
      return `  <url>\n    <loc>${ORIGIN}${pathFor(lang, key)}</loc>\n${alts}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}${pathFor("de", key)}"/>\n  </url>`;
    }),
  );
  write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`);
}

// the web manifest names the proposal as such
if (PROPOSAL) {
  const manifest = JSON.parse(readFileSync(join(dist, "site.webmanifest"), "utf8"));
  manifest.name = "Pizzeria Giardino – Designvorschlag (nicht die offizielle Website)";
  manifest.short_name = "Giardino Vorschlag";
  write("site.webmanifest", JSON.stringify(manifest, null, 2) + "\n");
}

// Redirects (Netlify / Cloudflare Pages `_redirects`; server/static.ts reads the same file): every changed live slug,
// and in launch mode the PDF query links of the current site (`/?action=get_file&id=13&resource_link_id=…`), with
// `301!` so a page at the same path does not win. content/redirects.md documents them.
const lines = [];
for (const [from, to] of Object.entries(LEGACY_REDIRECTS)) {
  lines.push(`${from}  ${to}  301`);
  lines.push(`${from}/  ${to}  301`);
}
if (!PROPOSAL) {
  for (const [id, file] of Object.entries(LEGACY_FILES)) lines.push(`/  action=get_file  id=13  resource_link_id=${id}  ${file}  301!`);
}
write("_redirects", lines.join("\n") + "\n");

// Launch mode: the owners' own files. The proposal never rehosts the PDFs or the film (BRIEF §15).
if (!PROPOSAL) {
  mkdirSync(join(dist, "menus"), { recursive: true });
  for (const f of readdirSync(join(root, "content/raw/pdf")).filter((f) => f.endsWith(".pdf"))) copyFileSync(join(root, "content/raw/pdf", f), join(dist, "menus", f));
  const film = join(root, "media/video/giardino-film-720.mp4");
  if (existsSync(film)) {
    mkdirSync(join(dist, "video"), { recursive: true });
    copyFileSync(film, join(dist, "video/giardino-film-720.mp4"));
  } else console.warn("! media/video/giardino-film-720.mp4 missing (npm run video) – the film player will have no source");
}

// guards: the proposal must never look like the official site to a crawler
const htmlFiles = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith(".html")) htmlFiles.push(p);
  }
};
walk(dist);
const problems = [];
for (const f of htmlFiles) {
  const html = readFileSync(f, "utf8");
  if (PROPOSAL) {
    if (!html.includes('name="robots" content="noindex')) problems.push(`${f}: no noindex`);
    if (/rel="canonical"|application\/ld\+json|hreflang="x-default"/.test(html)) problems.push(`${f}: SEO tags in proposal mode`);
  }
  if (/\.pdf"/.test(html) && PROPOSAL && /href="\/menus\//.test(html)) problems.push(`${f}: links a rehosted PDF`);
}
if (PROPOSAL && (existsSync(join(dist, "menus")) || existsSync(join(dist, "video/giardino-film-720.mp4")))) problems.push("dist/ contains rehosted PDFs or film");
if (problems.length) {
  console.error(problems.slice(0, 20).join("\n"));
  process.exit(1);
}
console.log(`${count} pages × languages + 404 + / written (${PROPOSAL ? "proposal mode: noindex, no SEO tags" : "launch mode: SEO, sitemap, PDFs"}), ${lines.length} redirect lines`);
