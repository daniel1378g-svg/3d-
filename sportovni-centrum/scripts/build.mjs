// Builds dist/: the rebuilt athletics page at its original URL path plus shared assets.
//
//   dist/krouzky/atleticka-pripravka/index.html   (served as /krouzky/atleticka-pripravka)
//   dist/assets/{css,js,fonts}/…                  shared design system
//   dist/images/…, dist/templates/yoo_infinite/…  original image files at their original paths,
//                                                  plus responsive WebP/AVIF variants
//   dist/.htaccess                                 extensionless URL + trailing-slash redirect (Apache)
//
// Asset URLs in the page are relative, so dist/ also works from a sub-folder or file://.
import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createRenderer } from "../src/templates.mjs";

const root = new URL("..", import.meta.url).pathname;
const dist = join(root, "dist");
const read = (p) => readFileSync(join(root, p), "utf8");
const json = (p) => JSON.parse(read(p));

if (!existsSync(join(root, "content/news.json"))) {
  console.error("content/news.json is missing – run `npm run sync-news` first (the news list is taken live from the website).");
  process.exit(1);
}
const site = json("content/site.json");
const images = json("content/images.json");
const page = json("content/pages/atleticka-pripravka.json");
const news = json("content/news.json");
const ageDays = (Date.now() - Date.parse(news.fetchedAt)) / 864e5;
if (ageDays > 1) console.warn(`! content/news.json is ${ageDays.toFixed(1)} days old – run \`npm run sync-news\` before deploying.`);

rmSync(dist, { recursive: true, force: true });
mkdirSync(join(dist, "assets/css"), { recursive: true });
mkdirSync(join(dist, "assets/js"), { recursive: true });

// Assets with content hashes for cache busting.
const hashed = (src, destDir, ext) => {
  const body = read(src);
  const h = createHash("sha256").update(body).digest("hex").slice(0, 10);
  const name = `${destDir}/site.${h}.${ext}`;
  writeFileSync(join(dist, name), body);
  return name;
};
const css = hashed("src/styles/site.css", "assets/css", "css");
const js = hashed("src/js/site.js", "assets/js", "js");
cpSync(join(root, "public/fonts"), join(dist, "assets/fonts"), { recursive: true });
cpSync(join(root, "public/images"), join(dist, "images"), { recursive: true });
cpSync(join(root, "public/templates"), join(dist, "templates"), { recursive: true });

// Boot script: marks JS + motion support; if site.js has not run within 3 s (blocked, failed),
// it reverts to the no-JS presentation so no content or menu stays hidden.
const boot = `(function(d){var e=d.documentElement;e.className=e.className.replace('no-js','js');if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){e.classList.add('js-motion')}setTimeout(function(){if(!window.__scReady){e.classList.remove('js-motion','js');e.classList.add('no-js')}},3000)})(document)`;

const depth = page.path.split("/").filter(Boolean).length; // krouzky/atleticka-pripravka → 2
const render = createRenderer({ site, images, root: "../".repeat(depth) });
const out = join(dist, page.path, "index.html");
mkdirSync(join(out, ".."), { recursive: true });
writeFileSync(out, render.document({ page, news, css, js, boot }));

writeFileSync(join(dist, ".htaccess"), `# Serve /krouzky/atleticka-pripravka (original Joomla URL, no trailing slash) from its folder.
DirectorySlash Off
RewriteEngine On
RewriteRule ^krouzky/atleticka-pripravka/$ /krouzky/atleticka-pripravka [R=301,L]
RewriteCond %{REQUEST_FILENAME} -d
RewriteCond %{REQUEST_FILENAME}/index.html -f
RewriteRule ^(.+[^/])$ $1/index.html [L]
<IfModule mod_headers.c>
  # Only the content-hashed CSS/JS files are cached as immutable.
  <FilesMatch "^site\\.[0-9a-f]{10}\\.(css|js)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>
`);

console.log(`dist/${page.path.slice(1)}/index.html · ${css} · ${js} · news ${news.items.length} items fetched ${news.fetchedAt}`);
