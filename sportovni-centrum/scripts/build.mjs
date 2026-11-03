// Builds dist/ – the rebuilt page(s) plus shared assets, laid out to merge into the website root:
//
//   dist/pages/krouzky-atleticka-pripravka.html   served at /krouzky/atleticka-pripravka (see src/routes.mjs)
//   dist/assets/{css,js,fonts}/…                  design system (CSS/JS content-hashed, assets/.htaccess caches them)
//   dist/images/…, dist/templates/yoo_infinite/…  original image files at their original paths + WebP/AVIF variants
//
// No root .htaccess is written: Joomla's must stay. deploy/apache-rewrite.conf (regenerated here) holds
// the rules to paste ABOVE Joomla's SEF section. Asset URLs are root-absolute; set BASE=/sub/folder/
// to deploy under a sub-folder. The build renders into a temporary folder and replaces dist/ only on success.
import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRenderer } from "../src/templates.mjs";
import { pages } from "../src/routes.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");
const tmp = join(root, ".dist-tmp");
const base = (process.env.BASE ?? "/").replace(/\/?$/, "/");
const read = (p) => readFileSync(join(root, p), "utf8");
const json = (p) => {
  const file = join(root, p);
  if (!existsSync(file)) throw new Error(`${file} is missing${p.endsWith("news.json") ? " – run `npm run sync-news` first (the news list is taken live from the website)" : ""}`);
  try { return JSON.parse(readFileSync(file, "utf8")); } catch (e) { throw new Error(`${file}: invalid JSON – ${e.message}`); }
};

try {
  const site = json("content/site.json");
  const images = json("content/images.json");
  const news = json("content/news.json");
  const ageDays = (Date.now() - Date.parse(news.fetchedAt)) / 864e5;
  if (!(ageDays <= 1)) console.warn(`! content/news.json was fetched ${news.fetchedAt} – run \`npm run sync-news\` before deploying.`);

  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(join(tmp, "assets/css"), { recursive: true });
  mkdirSync(join(tmp, "assets/js"), { recursive: true });

  const hashed = (src, destDir, ext) => {
    const body = read(src);
    const h = createHash("sha256").update(body).digest("hex").slice(0, 10);
    const name = `${destDir}/site.${h}.${ext}`;
    writeFileSync(join(tmp, name), body);
    return name;
  };
  const css = hashed("src/styles/site.css", "assets/css", "css");
  const js = hashed("src/js/site.js", "assets/js", "js");
  cpSync(join(root, "public/fonts"), join(tmp, "assets/fonts"), { recursive: true });
  cpSync(join(root, "public/images"), join(tmp, "images"), { recursive: true });
  cpSync(join(root, "public/templates"), join(tmp, "templates"), { recursive: true });
  writeFileSync(join(tmp, "assets/.htaccess"), `# Content-hashed CSS/JS never change under the same name; fonts are versioned by folder.
<IfModule mod_headers.c>
  <FilesMatch "^site\\.[0-9a-f]{10}\\.(css|js)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>
`);

  // Boot script (inline, runs before paint):
  //  • marks JS + motion support;
  //  • until site.js is ready, a tiny delegated handler makes the menu buttons work;
  //  • if site.js has not finished within 3 s, only the motion class is dropped (hidden reveals become
  //    visible) – the layout itself never switches, so there is no late layout shift.
  const boot = `(function(d,w){var e=d.documentElement;e.className=e.className.replace('no-js','js');if('IntersectionObserver' in w&&!w.matchMedia('(prefers-reduced-motion: reduce)').matches){e.classList.add('js-motion')}setTimeout(function(){if(!w.__scReady)e.classList.remove('js-motion')},3000);d.addEventListener('click',function(v){if(w.__scReady||!v.target.closest)return;var b=v.target.closest('[data-nav-toggle],.sub-toggle');if(!b)return;var o=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(o));if(b.hasAttribute('data-nav-toggle')){var n=d.getElementById(b.getAttribute('aria-controls'));if(n)n.classList.toggle('is-open',o)}else{var i=b.closest('.nav-item');if(i)i.classList.toggle('is-open',o)}});d.addEventListener('keydown',function(v){if(w.__scReady||v.key!=='Escape')return;var b=d.querySelector('[data-nav-toggle][aria-expanded="true"]');if(b){b.click();b.focus()}})})(document,window)`;

  const render = createRenderer({ site, images, base });
  const rules = [];
  for (const route of pages) {
    const page = json(route.content);
    if (page.path !== route.path) throw new Error(`${route.content}: "path" (${page.path}) does not match src/routes.mjs (${route.path})`);
    const out = join(tmp, route.file);
    mkdirSync(join(out, ".."), { recursive: true });
    writeFileSync(out, render.document({ page, news, css, js, boot }));
    const p = route.path.slice(1).replace(/[.]/g, "\\.");
    rules.push(`RewriteRule ^${p}/$ ${base}${route.path.slice(1)} [R=301,L]`, `RewriteRule ^${p}$ ${base}${route.file} [L]`);
  }

  rmSync(dist, { recursive: true, force: true });
  renameSync(tmp, dist);

  mkdirSync(join(root, "deploy"), { recursive: true });
  writeFileSync(join(root, "deploy/apache-rewrite.conf"), `# Generated by scripts/build.mjs – paste into the website's existing .htaccess (Joomla), directly
# after "RewriteEngine On" and ABOVE Joomla's "## Begin - Joomla! core SEF Section". Do not replace
# Joomla's .htaccess: every other page of the site depends on it.
<IfModule mod_rewrite.c>
${rules.map((r) => `  ${r}`).join("\n")}
</IfModule>
`);
  console.log(`dist/ · ${pages.map((r) => r.file).join(", ")} · ${css} · ${js} · news ${news.items.length} items fetched ${news.fetchedAt} · base ${base}`);
} catch (err) {
  rmSync(tmp, { recursive: true, force: true });
  console.error(`Build failed: ${err.message}`);
  process.exit(1);
}
