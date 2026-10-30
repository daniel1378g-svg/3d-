// Builds the claude.ai Artifact preview into artifact/ after `vite build --mode artifact`.
//
// The Artifact viewer wraps the page in its own <html>/<head>/<body> and serves supporting files next to it, so the
// page is written without a document skeleton, the app is one classic script (app.js), every asset path is relative
// and the router keeps its path in a plain "#name" (#de-preise). The viewer's CSP only admits Google Fonts for
// fonts. The permanent proposal band (CLAUDE.md, VITE_PROPOSAL on by default) stays.
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

const css = readdirSync(out).filter((f) => f.endsWith(".css")).map((f) => readFileSync(join(out, f), "utf8")).join("\n");
const fonts = "https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&family=Fraunces:ital,opsz,wght,SOFT,WONK@1,9..144,400..800,0..100,0..1&display=swap";
const page = [
  "<title>Proposta Boinabrasa</title>",
  '<meta name="robots" content="noindex">',
  '<meta name="theme-color" content="#120e0c">',
  '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  `<link rel="stylesheet" href="${fonts}">`,
  `<style>${css}</style>`,
  '<div id="root"></div>',
  '<script src="app.js"></script>',
].join("\n");
writeFileSync(join(dest, "index.html"), page);

const files = { "app.js": "app.js" };
cpSync(join(out, "app.js"), join(dest, "app.js"));
const walk = (dir, keep = () => true) => {
  for (const name of readdirSync(join(root, "public", dir)).sort()) {
    const rel = `${dir}/${name}`;
    if (statSync(join(root, "public", rel)).isDirectory()) walk(rel, keep);
    else if (/\.(webp|png|jpg|mp4|webm)$/.test(name) && keep(rel)) {
      mkdirSync(join(dest, dir), { recursive: true });
      cpSync(join(root, "public", rel), join(dest, rel));
      files[rel] = rel;
    }
  }
};
walk("images");
walk("poster");
walk("video");
walk("brand", (f) => f.endsWith(".webp"));
writeFileSync(join(dest, "files.json"), JSON.stringify(files, null, 1));
const bytes = Object.keys(files).reduce((n, f) => n + statSync(join(dest, f)).size, page.length);
console.log(`artifact/index.html ${Math.round(page.length / 1024)} KB · app.js ${Math.round(statSync(join(dest, "app.js")).size / 1024)} KB · ${Object.keys(files).length} files · ${(bytes / 1e6).toFixed(1)} MB`);
