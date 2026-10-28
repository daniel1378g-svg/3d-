// Builds the claude.ai Artifact preview into artifact/ after `vite build --mode artifact`.
//
// The Artifact viewer wraps the page in its own <html>/<head>/<body> and serves supporting files next to it,
// so the page is written without a document skeleton, the app is one classic script (app.js), every asset
// path is relative and the router keeps its path in a plain "#name" (#fr, #pt-contacto, …). The viewer's CSP
// only admits Google Fonts for fonts, so the self-hosted faces are swapped for the same families from there.
// Only WebP/SVG/PNG files are published (the app leaves out its AVIF sources in this mode) and no 1600 px
// photos. The permanent proposal band stays, the form stays in test mode and the map links out.
// Adapted from ../oliveira/scripts/build-artifact.mjs.
//
//   artifact/index.html   page content (title, CSS, root element, script tag)
//   artifact/app.js       the whole app, three.js, GSAP and lottie-web included
//   artifact/files.json   every supporting file, for the Artifact `files` parameter
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const out = join(root, ".cache/artifact-build");
const dest = join(root, "artifact");
rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });

const css = readdirSync(out)
  .filter((f) => f.endsWith(".css"))
  .map((f) => readFileSync(join(out, f), "utf8"))
  .join("\n")
  .replace(/url\((["']?)\.?\/images\//g, "url($1images/")
  .replace(/@font-face\{[^}]*\}/g, ""); // the self-hosted faces (not published); Google Fonts serves the same families
const fonts = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Figtree:wght@300..900&family=Caveat:wght@600&display=swap";
const page = [
  "<title>Chez Manu Redesign</title>",
  '<meta name="claude:viewport-fit-sides" content="cover">',
  '<meta name="robots" content="noindex">',
  '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  `<link rel="stylesheet" href="${fonts}">`,
  `<style>${css}</style>`,
  '<div id="root"></div>',
  '<script src="app.js"></script>',
].join("\n");
writeFileSync(join(dest, "index.html"), page);

const files = { "app.js": "app.js" };
cpSync(join(out, "app.js"), join(dest, "app.js"));
const publish = (dir, keep) => {
  const src = join(root, "public", dir);
  for (const name of readdirSync(src).sort()) {
    if (!keep(name)) continue;
    mkdirSync(join(dest, dir), { recursive: true });
    cpSync(join(src, name), join(dest, dir, name));
    files[`${dir}/${name}`] = `${dir}/${name}`;
  }
};
publish("images", (n) => (/\.webp$/.test(n) && !/-1600\.webp$/.test(n)) || n === "azulejos.svg" || n === "flour.png");
publish("brand", (n) => /\.(webp|png)$/.test(n) && !/heart-(180|512)/.test(n));
writeFileSync(join(dest, "files.json"), JSON.stringify(files, null, 1));
const bytes = Object.keys(files).reduce((n, f) => n + statSync(join(dest, f)).size, page.length);
console.log(`artifact/index.html ${Math.round(page.length / 1024)} KB · app.js ${Math.round(statSync(join(dest, "app.js")).size / 1024)} KB · ${Object.keys(files).length} files · ${(bytes / 1e6).toFixed(1)} MB`);
