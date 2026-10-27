// Builds the claude.ai Artifact preview of the site into artifact/.
//
// The Artifact viewer wraps the page in its own <html>/<head>/<body>, while the Next.js App
// Router must own the whole document, so the preview does not use the Next runtime: the same
// <Site> component is pre-rendered in Node (react-dom/server) and hydrated inside #mrd-app by a
// small esbuild bundle. The viewer's CSP only admits Google Fonts for fonts, and supporting files
// are served next to the page, so every asset path is relative.
//
//   artifact/index.html   page content (title, CSS, markup, scripts), no document skeleton
//   artifact/app.js       client bundle (React + GSAP + Motion + the site's components)
//   artifact/files.json   every supporting file, for the Artifact `files` parameter
import { build } from "esbuild";
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const pub = join(root, "public");
const dest = join(root, "artifact");
const tmp = join(root, ".cache/artifact");
rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
mkdirSync(tmp, { recursive: true });

const shared = {
  bundle: true,
  jsx: "automatic",
  tsconfig: join(root, "tsconfig.json"),
  loader: { ".json": "json" },
  logLevel: "warning",
  define: { "process.env.NEXT_PUBLIC_ARTIFACT": '"1"', "process.env.NODE_ENV": '"production"' },
  alias: { "next/dynamic": join(root, "src/artifact/next-dynamic.tsx"), "server-only": join(root, "src/artifact/empty.ts") },
};

// 1. Pre-render in Node.
await build({ ...shared, entryPoints: [join(root, "src/artifact/server.tsx")], platform: "node", format: "cjs", outfile: join(tmp, "server.cjs") });
const require = createRequire(import.meta.url);
const { render } = require(join(tmp, "server.cjs"));
const { markup, introScript } = render();

// 2. Client bundle.
await build({ ...shared, entryPoints: [join(root, "src/artifact/client.tsx")], platform: "browser", format: "iife", target: "es2020", minify: true, outfile: join(tmp, "app.js") });

// Absolute site paths → relative ("/videos/x" → "videos/x").
const relativise = (text) => text.replace(/(["'`(\s,=]|&quot;)\/(videos|images|brand|og)\//g, "$1$2/");

const css = readFileSync(join(root, "src/styles/globals.css"), "utf8");
const bootScript = readFileSync(join(root, "src/app/layout.tsx"), "utf8").match(/const bootScript = `([\s\S]*?)`;/)[1];

const page = [
  "<title>Proposta de design A Merendeira</title>",
  '<meta name="robots" content="noindex" />',
  '<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />',
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@300..800&family=Space+Grotesk:wght@300..700&display=swap" />',
  `<style>${css}</style>`,
  `<script>${bootScript}</script>`,
  `<div id="mrd-app">${relativise(markup)}</div>`,
  `<script>${introScript}</script>`,
  '<script src="app.js"></script>',
].join("\n");
writeFileSync(join(dest, "index.html"), page);

// 3. Supporting files.
const files = {};
writeFileSync(join(dest, "app.js"), relativise(readFileSync(join(tmp, "app.js"), "utf8")));
files["app.js"] = "app.js";
const add = (rel) => {
  const to = join(dest, rel);
  mkdirSync(join(to, ".."), { recursive: true });
  cpSync(join(pub, rel), to);
  files[rel] = rel;
};
const walk = (dir, keep) => {
  for (const name of readdirSync(join(pub, dir)).sort()) {
    const rel = join(dir, name);
    if (statSync(join(pub, rel)).isDirectory()) walk(rel, keep);
    else if (keep(rel)) add(rel);
  }
};
walk("videos/poster", (f) => f.endsWith(".webp") || f.endsWith("cover-1280.jpg"));
walk("images/optimized", (f) => f.endsWith(".webp"));
walk("videos/sequence", (f) => f.endsWith(".webp"));
walk("videos/caldo", (f) => f.endsWith(".webp"));

writeFileSync(join(dest, "files.json"), JSON.stringify(files, null, 1));
const bytes = Object.keys(files).reduce((n, f) => n + statSync(join(dest, f)).size, 0);
console.log(`artifact/index.html ${Math.round(page.length / 1024)} KB · app.js ${Math.round(statSync(join(dest, "app.js")).size / 1024)} KB · ${Object.keys(files).length} files · ${(bytes / 1e6).toFixed(1)} MB`);
