// Builds the claude.ai Artifact preview into artifact/ after `vite build --mode artifact`.
//
// The Artifact viewer wraps the page in its own <html>/<head>/<body> and serves supporting files next
// to it, so the page is written without a document skeleton, the app is one classic script (app.js),
// every asset path is relative and the router keeps its path in a plain "#name". The viewer's CSP only
// admits Google Fonts for fonts. The permanent proposal band (VITE_PROPOSAL, on by default) stays.
//
//   artifact/index.html   page content (title, CSS, root element, script tag)
//   artifact/app.js       the whole app, three.js and lottie-web included
//   artifact/files.json   every supporting file, for the Artifact `files` parameter
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const out = join(root, ".cache/artifact-build");
const dest = join(root, "artifact");
rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });

// Any image referenced from the CSS must resolve next to the page once the CSS is inline.
const css = readdirSync(out).filter((f) => f.endsWith(".css")).map((f) => readFileSync(join(out, f), "utf8")).join("\n").replace(/url\((["']?)\.?\/images\//g, "url($1images/");
const page = [
  "<title>Proposta de design Choucas</title>",
  '<meta name="claude:viewport-fit-sides" content="cover">',
  '<meta name="robots" content="noindex">',
  '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap">',
  `<style>${css}</style>`,
  '<div id="root"></div>',
  '<script src="app.js"></script>',
].join("\n");
writeFileSync(join(dest, "index.html"), page);

const files = { "app.js": "app.js" };
cpSync(join(out, "app.js"), join(dest, "app.js"));
for (const dir of ["images", "brand"]) {
  for (const name of readdirSync(join(root, "public", dir)).sort()) {
    if (!name.endsWith(".webp") && !name.endsWith(".svg")) continue;
    mkdirSync(join(dest, dir), { recursive: true });
    cpSync(join(root, "public", dir, name), join(dest, dir, name));
    files[`${dir}/${name}`] = `${dir}/${name}`;
  }
}
writeFileSync(join(dest, "files.json"), JSON.stringify(files, null, 1));
const bytes = Object.keys(files).reduce((n, f) => n + statSync(join(dest, f)).size, page.length);
console.log(`artifact/index.html ${Math.round(page.length / 1024)} KB · app.js ${Math.round(statSync(join(dest, "app.js")).size / 1024)} KB · ${Object.keys(files).length} files · ${(bytes / 1e6).toFixed(1)} MB`);
