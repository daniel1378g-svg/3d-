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
if (!/^\/([A-Za-z0-9._~-]+\/)*$/.test(base)) {
  console.error(`Build failed: BASE must be a URL path such as / or /redesign/ (letters, digits, . _ ~ - only), got "${process.env.BASE}"`);
  process.exit(1);
}
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
  //  • until site.js reports a working navigation, a small delegated handler drives the menu
  //    (panel with label, scroll lock and inert page; dropdowns with Escape and outside click);
  //  • if site.js has not finished within 3 s, only the motion class is dropped (hidden reveals become
  //    visible) – the layout itself never switches, so there is no late layout shift.
  const boot = [
    "(function(d,w){var e=d.documentElement;e.className=e.className.replace('no-js','js');",
    "if('IntersectionObserver' in w&&!w.matchMedia('(prefers-reduced-motion: reduce)').matches)e.classList.add('js-motion');",
    "setTimeout(function(){if(!w.__scReady)e.classList.remove('js-motion')},3000);",
    // Fallback menu, active until site.js reports a working navigation (__scNavReady).
    "function q(s){return d.querySelector(s)}",
    "function panel(b,o){var n=d.getElementById(b.getAttribute('aria-controls'));if(!n)return;b.setAttribute('aria-expanded',String(o));n.classList.toggle('is-open',o);d.body.classList.toggle('nav-open',o);",
    "var l=b.querySelector('[data-nav-label]');if(l)l.textContent=o?l.getAttribute('data-close'):l.getAttribute('data-open');",
    "['main','footer','.skip-link','.brand'].forEach(function(s){var x=q(s);if(x)x.inert=o});if(o){var a=n.querySelector('a[href]');if(a)a.focus()}else b.focus()}",
    "function sub(i,o){var b=i.querySelector('.sub-toggle');b.setAttribute('aria-expanded',String(o));i.classList.toggle('is-open',o)}",
    "function shut(){[].forEach.call(d.querySelectorAll('.nav-item.is-open'),function(i){sub(i,false)})}",
    "d.addEventListener('click',function(v){if(w.__scNavReady||!v.target.closest)return;var b=v.target.closest('[data-nav-toggle]');",
    "if(b)return panel(b,b.getAttribute('aria-expanded')!=='true');var t=v.target.closest('.sub-toggle');",
    "if(t){var i=t.closest('.nav-item'),o=t.getAttribute('aria-expanded')!=='true';shut();return sub(i,o)}if(!v.target.closest('[data-nav]'))shut()});",
    "d.addEventListener('keydown',function(v){if(w.__scNavReady||v.key!=='Escape')return;var b=q('[data-nav-toggle][aria-expanded=\"true\"]');",
    "if(b&&b.offsetParent)return panel(b,false);var i=q('.nav-item.is-open');if(i){var f=i.querySelector('.subnav').contains(d.activeElement);sub(i,false);if(f)i.querySelector('.sub-toggle').focus()}})",
    "})(document,window)",
  ].join("");

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
