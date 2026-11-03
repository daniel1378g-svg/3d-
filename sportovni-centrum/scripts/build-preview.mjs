// Builds preview/atleticka-pripravka-nahled.html: ONE self-contained file (CSS, JS, fonts and the
// original photos inlined) for reviewing the proposal without a server. It carries a permanent
// banner stating that it is a design proposal and not the official website. Not for deployment –
// production uses dist/ (npm run build).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { pages } from "../src/routes.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");
let html = readFileSync(join(dist, pages[0].file), "utf8");

const mime = { ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon", ".woff2": "font/woff2" };
const dataUri = (file) => `data:${mime[extname(file)]};base64,${readFileSync(file).toString("base64")}`;
const resolve = (url) => join(dist, url.replace(/^\//, "")); // dist is built with BASE=/

// Responsive <source> sets are dropped in the preview (the <img> keeps the original JPEG).
html = html.replace(/\s*<source [^>]+>/g, "");
// Stylesheet → inline <style>, with fonts inlined.
html = html.replace(/<link rel="stylesheet" href="([^"]+)">/, (_, href) => {
  const file = resolve(href);
  const css = readFileSync(file, "utf8").replace(/url\("\.\.\/fonts\/([^"]+)"\)/g, (m, f) => `url("${dataUri(join(dist, "assets/fonts", f))}")`);
  return `<style>${css}</style>`;
});
html = html.replace(/<link rel="preload"[^>]+>\n?/g, "");
html = html.replace(/<script src="([^"]+)" defer><\/script>/, (_, src) => `<script>${readFileSync(resolve(src), "utf8").replace(/<\/script/gi, "<\\/script")}</script>`);
// Remaining relative asset references (img src, gallery href, favicon).
html = html.replace(/ data-(avif|webp)="[^"]*"/g, ""); // the lightbox uses the original JPEGs in the preview
html = html.replace(/(src|href)="(\/(?:assets|images|templates)\/[^"]+)"/g, (_, attr, url) => `${attr}="${dataUri(resolve(url))}"`);

// Permanent banner: fixed to the bottom edge (it never covers the sticky header or the mobile menu);
// the page gets matching bottom padding so the footer is never hidden behind it.
const banner = `<div role="note" id="nahled-banner" style="position:fixed;left:0;right:0;bottom:0;z-index:300;display:flex;flex-wrap:wrap;justify-content:center;gap:.15rem 1rem;padding:.55rem 1rem calc(.55rem + env(safe-area-inset-bottom));background:#f26801;color:#1b1206;font:650 14px/1.4 Archivo,system-ui,sans-serif;text-align:center;box-shadow:0 -6px 20px -10px rgb(0 0 0/.5)">
  <span lang="pt">Proposta de design · não é o site oficial</span><span>Návrh redesignu · nejde o oficiální web Sportovního centra Semily</span>
</div>
<script>(function(){var b=document.getElementById("nahled-banner");function f(){document.body.style.paddingBottom=b.offsetHeight+"px";document.documentElement.style.setProperty("--nb",b.offsetHeight+"px")}f();addEventListener("resize",f)})()</script>`;
html = html.replace("</body>", `${banner}\n</body>`);
html = html.replace("</head>", "<style>@media (max-width:67.49em){.site-nav{height:calc(100dvh - 100% - var(--nb,0px))}}</style>\n</head>");
html = html.replace("<title>", "<title>[Návrh] ");

mkdirSync(join(root, "preview"), { recursive: true });
const out = join(root, "preview/atleticka-pripravka-nahled.html");
writeFileSync(out, html);
console.log(`preview/atleticka-pripravka-nahled.html ${(html.length / 1e6).toFixed(2)} MB`);
