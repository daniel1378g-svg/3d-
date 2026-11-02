// Builds the claude.ai Artifact preview into artifact/ after `vite build --mode artifact`.
//
// The viewer wraps the page in its own <html>/<head>/<body> and serves supporting files next to it, so the page has
// no document skeleton, the app is one classic script (app.js), every asset path is relative and the router keeps its
// path in a "#de-speisekarte" hash. Its content policy admits fonts only from Google Fonts, so the self-hosted
// @font-face rules are replaced by the same three families from there. The preview shows the restaurant's real name,
// logo and photographs, so it always carries the permanent band «Proposta de design · não é o site oficial»
// (CLAUDE.md; App.tsx renders it whenever __ARTIFACT__ is true) and is noindex.
//
//   artifact/index.html   page content (title, CSS, root element, script tag)
//   artifact/app.js       the whole app, three.js included
//   artifact/files.json   every supporting file, for the Artifact `files` parameter
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const out = join(root, ".cache/artifact-build");
const dest = join(root, "artifact");
rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });

let css = readdirSync(out).filter((f) => f.endsWith(".css")).map((f) => readFileSync(join(out, f), "utf8")).join("\n");
const before = css.length;
css = css.replace(/@font-face\s*\{[^}]*\}/g, "");
if (css.length === before) throw new Error("no self-hosted @font-face found to replace");
css = css.replace(/url\(\/(brand|images|cutouts)\//g, "url($1/");
const fonts = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Caveat:wght@500;700&family=Lato:ital,wght@0,400;0,700;1,400&display=swap";
const page = [
  "<title>Giardino Redesign Proposal</title>",
  '<meta name="claude:viewport-fit-sides" content="cover">',
  '<meta name="robots" content="noindex, nofollow">',
  '<meta name="theme-color" content="#6E6140">',
  '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  `<link rel="stylesheet" href="${fonts}">`,
  `<style>${css}</style>`,
  '<div id="root"></div>',
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
// photographs: WebP up to 1440 px (src/content/photos.ts, widthsOf)
for (const name of readdirSync(join(root, "public/images")).sort()) {
  const m = name.match(/-(\d+)\.webp$/);
  if (m && Number(m[1]) <= 1440) add(`images/${name}`);
}
for (const name of ["logo.png", "logo-light.webp", "tree-light.webp", "wordmark-light.webp", "pizza-top.webp", "favicon-32.png"]) add(`brand/${name}`);
for (const name of readdirSync(join(root, "public/cutouts")).sort()) add(`cutouts/${name}`);
writeFileSync(join(dest, "files.json"), JSON.stringify(files, null, 1));
const bytes = Object.keys(files).reduce((n, f) => n + statSync(join(dest, f)).size, page.length);
console.log(`artifact/index.html ${Math.round(page.length / 1024)} KB · app.js ${Math.round(statSync(join(dest, "app.js")).size / 1024)} KB · ${Object.keys(files).length} files · ${(bytes / 1e6).toFixed(1)} MB`);
if (Object.keys(files).length > 250) throw new Error("more than 250 files – one Artifact publish takes at most 255");
if (!readFileSync(join(dest, "app.js"), "utf8").includes("Proposta de design")) throw new Error("the proposal band is missing from the preview build");
