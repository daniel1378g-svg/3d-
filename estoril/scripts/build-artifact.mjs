// Builds the claude.ai Artifact preview of the home page into artifact/ (run `npm run build` first).
//
// The Artifact viewer wraps the published page in its own <html>/<head>/<body>, so:
//   artifact/index.html     the PT home page without the document skeleton: the head tags, a boot
//                           script that puts lang and the <html>/<body> classes on the viewer's
//                           document, then the body content
//   artifact/en/index.html  the EN home page, a supporting file served as-is (full document)
//   artifact/files.json     every supporting file, for the Artifact `files` parameter
//
// The site uses the name and identity of a real organisation, so the fixed top band always reads
// "Proposta de design · não é o site oficial" (CLAUDE.md). Links to pages outside the home pages are
// not part of the preview.
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const site = join(root, 'site');
const dest = join(root, 'artifact');
const BAND_PT = 'Proposta de design · não é o site oficial';
const BAND_EN = `${BAND_PT} · Design proposal — not the official website`;

rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });

const files = {};
const add = (rel) => {
  const from = join(site, rel);
  if (!existsSync(from)) throw new Error(`missing asset ${rel}`);
  const to = join(dest, rel);
  mkdirSync(dirname(to), { recursive: true });
  cpSync(from, to);
  files[rel] = rel;
};
const addDir = (rel, keep = () => true) => {
  for (const name of readdirSync(join(site, rel)).sort()) {
    const sub = `${rel}/${name}`;
    if (statSync(join(site, sub)).isDirectory()) addDir(sub, keep);
    else if (keep(sub)) add(sub);
  }
};

const setBand = (html, text) => {
  const out = html.replace(/(<div class="preview-strip" role="note">)[^<]*(<\/div>)/, `$1${text}$2`);
  if (out === html) throw new Error('preview band not found');
  return out;
};

// --- PT home page: no document skeleton ---------------------------------------------------------
const pt = setBand(readFileSync(join(site, 'index.html'), 'utf8'), BAND_PT);
const head = pt.match(/<head>([\s\S]*?)<\/head>/)[1];
const body = pt.match(/<body([^>]*)>([\s\S]*?)<\/body>/);
const htmlTag = pt.match(/<html([^>]*)>/)[1];
const lang = htmlTag.match(/lang="([^"]+)"/)[1];
const dataLang = htmlTag.match(/data-lang="([^"]+)"/)[1];
const bodyClasses = (body[1].match(/class="([^"]+)"/) || [, ''])[1].split(/\s+/).filter(Boolean);
// the viewer's <html> has no "no-js" class to replace, so add "js" and the language explicitly
const pageHead = head
  .replace(/<meta charset="utf-8">\s*/, '')
  .replace(/<meta name="viewport"[^>]*>\s*/, '')
  .replace(
    "h.classList.replace('no-js','js');",
    `h.classList.remove('no-js');h.classList.add('js');h.lang='${lang}';h.setAttribute('data-lang','${dataLang}');`,
  );
if (pageHead === head || !pageHead.includes("h.classList.add('js')")) throw new Error('boot script not found');
const page = [
  pageHead.trim(),
  `<script>document.body.classList.add(${bodyClasses.map((c) => `'${c}'`).join(',')})</script>`,
  body[2].trim(),
].join('\n');
writeFileSync(join(dest, 'index.html'), page);

// --- EN home page: a separate document -----------------------------------------------------------
const en = setBand(readFileSync(join(site, 'en/index.html'), 'utf8'), BAND_EN);
mkdirSync(join(dest, 'en'), { recursive: true });
writeFileSync(join(dest, 'en/index.html'), en);
files['en/index.html'] = 'en/index.html';

// --- assets ---------------------------------------------------------------------------------------
addDir('assets/css');
addDir('assets/fonts');
addDir('assets/js');
// hero-car-mesh.json and hero-car-mr.webp are the bake source (tools/car/bake_body.py), kept for the
// published reference build (serve.mjs --reference); the page loads hero-car-body.* and hero-car-orm.webp
addDir('assets/models', (f) => !/hero-car-(mesh\.json|mr\.webp)$/.test(f));
addDir('assets/img', (f) => /\/stage-\d(-p)?\.webp$/.test(f));
add('assets/favicon.svg');
add('assets/data/track.json');
add('assets/data/index-pt.js');
add('assets/data/index-en.js');
for (const html of [pt, en])
  for (const m of html.matchAll(/(?:\.\.\/)?(media\/[\w.-]+\.(?:webp|jpe?g|png|svg))/g)) if (!files[m[1]]) add(m[1]);

writeFileSync(join(dest, 'files.json'), JSON.stringify(files, null, 1));
const sizes = Object.keys(files).map((f) => statSync(join(dest, f)).size);
const total = sizes.reduce((a, b) => a + b, 0) + page.length;
console.log(
  `artifact/index.html ${Math.round(page.length / 1024)} KB · ${Object.keys(files).length} files · ` +
    `${(total / 1e6).toFixed(1)} MB · largest ${(Math.max(...sizes) / 1e6).toFixed(1)} MB`,
);
