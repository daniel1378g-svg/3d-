// Builds the claude.ai Artifact preview into artifact/ after `vite build --mode artifact` (BRIEF §13, CLAUDE.md).
//
// The viewer wraps the page in its own <html>/<head>/<body> and serves supporting files next to it, so the page has
// no document skeleton, the app is one classic script (app.js), every asset path is relative and the router keeps its
// path in a "#de-essen-geniessen" hash. The viewer only admits Google Fonts for fonts, so the self-hosted @font-face
// rules are replaced by the same two families from Google Fonts. The permanent band «Proposta de design · não é o site
// oficial» is part of the app in proposal mode (the default). The 3D scene is not loaded there: the poster stays.
//
//   artifact/index.html   page content (title, CSS, root element, script tag)
//   artifact/app.js       the whole app
//   artifact/files.json   every supporting file, for the Artifact `files` parameter
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const out = join(root, ".cache/artifact-build");
const dest = join(root, "artifact");
rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });

let css = readdirSync(out).filter((f) => f.endsWith(".css")).map((f) => readFileSync(join(out, f), "utf8")).join("\n");
// self-hosted faces → Google Fonts (the metric-matched fallbacks stay)
const before = css.length;
css = css.replace(/@font-face\s*\{[^}]*font-family:\s*"?(Cormorant Garamond|Manrope)"?;[^}]*\}/g, "");
if (css.length === before) throw new Error("no self-hosted @font-face found to replace");
// absolute public paths → relative
css = css.replace(/url\(\/(brand|images|video)\//g, "url($1/");
const fonts = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Manrope:wght@200..800&display=swap";
const page = [
  "<title>Proposta Pizzeria Giardino</title>",
  '<meta name="robots" content="noindex, nofollow">',
  '<meta name="theme-color" content="#f5f0e6">',
  '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  `<link rel="stylesheet" href="${fonts}">`,
  `<style>${css}</style>`,
  '<div id="giardino-root"></div>',
  '<script src="app.js"></script>',
].join("\n");
writeFileSync(join(dest, "index.html"), page);

const files = { "app.js": "app.js" };
cpSync(join(out, "app.js"), join(dest, "app.js"));
const add = (rel) => {
  mkdirSync(join(dest, rel, ".."), { recursive: true });
  cpSync(join(root, "public", rel), join(dest, rel));
  files[rel] = rel;
};
// photographs: WebP up to 1440 w (see src/components/Img.tsx, widthsOf)
for (const name of readdirSync(join(root, "public/images")).sort()) {
  const m = name.match(/-(\d+)\.webp$/);
  if (m && Number(m[1]) <= 1440) add(`images/${name}`);
}
const walk = (dir, keep) => {
  for (const name of readdirSync(join(root, "public", dir)).sort()) {
    const rel = `${dir}/${name}`;
    if (statSync(join(root, "public", rel)).isDirectory()) walk(rel, keep);
    else if (keep(rel)) add(rel);
  }
};
walk("brand", (f) => f.endsWith(".webp"));
walk("video", (f) => f.endsWith(".webp"));
writeFileSync(join(dest, "files.json"), JSON.stringify(files, null, 1));
const bytes = Object.keys(files).reduce((n, f) => n + statSync(join(dest, f)).size, page.length);
console.log(`artifact/index.html ${Math.round(page.length / 1024)} KB · app.js ${Math.round(statSync(join(dest, "app.js")).size / 1024)} KB · ${Object.keys(files).length} files · ${(bytes / 1e6).toFixed(1)} MB`);
if (Object.keys(files).length > 250) throw new Error("more than 250 files – the Artifact publish takes at most 255 per call");
