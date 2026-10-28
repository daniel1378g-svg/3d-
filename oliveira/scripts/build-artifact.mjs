// Builds the claude.ai Artifact preview into artifact/ after `vite build --mode artifact`.
//
// The Artifact viewer wraps the page in its own <html>/<head>/<body> and serves supporting files next
// to it, so the page is written without a document skeleton, the app is one classic script (app.js),
// every asset path is relative and the router keeps its path in a plain "#name". The viewer's CSP only
// admits Google Fonts for fonts, so the self-hosted fonts are swapped for the same families from there.
// Only WebP/SVG/PNG files are published (the app leaves out its AVIF sources in this mode). The permanent
// proposal band stays. Adapted from donduarte/scripts/build-artifact.mjs.
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

const css = readdirSync(out)
  .filter((f) => f.endsWith(".css"))
  .map((f) => readFileSync(join(out, f), "utf8"))
  .join("\n")
  .replace(/url\((["']?)\.?\/images\//g, "url($1images/");
const fonts =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..800,0..100,0..1;1,9..144,300..800,0..100,0..1&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Caveat+Brush&display=swap";
const page = [
  "<title>Oliveira Redesign</title>",
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
    const full = join(src, name);
    if (statSync(full).isDirectory()) {
      publish(`${dir}/${name}`, keep);
      continue;
    }
    if (!keep(name)) continue;
    mkdirSync(join(dest, dir), { recursive: true });
    cpSync(full, join(dest, dir, name));
    files[`${dir}/${name}`] = `${dir}/${name}`;
  }
};
// Photos at 480 and 960/800 px only (the preview never needs 1600), plus everything the app references.
publish("images", (n) => /\.(webp|svg|png)$/.test(n) && !/-1600\.webp$/.test(n));
publish("depth", (n) => n.endsWith(".webp"));
publish("masks", (n) => n.endsWith(".webp"));
publish("brand", (n) => n.endsWith(".webp"));
writeFileSync(join(dest, "files.json"), JSON.stringify(files, null, 1));
const bytes = Object.keys(files).reduce((n, f) => n + statSync(join(dest, f)).size, page.length);
console.log(`artifact/index.html ${Math.round(page.length / 1024)} KB · app.js ${Math.round(statSync(join(dest, "app.js")).size / 1024)} KB · ${Object.keys(files).length} files · ${(bytes / 1e6).toFixed(1)} MB`);
