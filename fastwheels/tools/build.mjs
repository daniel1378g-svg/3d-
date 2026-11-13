// Builds the site.
//
//   node tools/build.mjs              → dist/            the deployable static site
//   node tools/build.mjs --artifact   → dist-artifact/   the claude.ai Artifact preview (page content without a
//                                       document skeleton, a permanent "design proposal" strip, files.json)
//   node tools/build.mjs --pages      → dist-pages/      the public preview on GitHub Pages (complete page, with the
//                                       "design proposal" strip and noindex until the garage adopts the site)
//   … --brand overlay                 → the same three for another business (src/brands/<key>.js); the folder
//                                       gets the key as a suffix, e.g. dist-artifact-overlay/
//
// Two script bundles: app.js (page behaviour, small, loads at once) and scene.js (three.js + the 3D scene,
// loaded only when the configurator or the interior sequence comes near).
import { build } from 'esbuild';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const artifact = process.argv.includes('--artifact');
const pages = process.argv.includes('--pages');      // public preview on GitHub Pages: full document, proposal strip, noindex
const proposal = artifact || pages;
const brand = process.argv.includes('--brand') ? process.argv[process.argv.indexOf('--brand') + 1] : 'fastwheels';
process.env.FW_BRAND = brand;                        // read by src/config.js when the page is rendered below
const outName = (artifact ? 'dist-artifact' : pages ? 'dist-pages' : 'dist') + (brand === 'fastwheels' ? '' : `-${brand}`);
const out = join(root, outName);
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

// Only the chosen business goes into the page script: the list of brands is replaced by that single entry.
const onlyBrand = { name: 'only-brand', setup(b) {
  b.onLoad({ filter: /[\\/]src[\\/]brands[\\/]index\.js$/ }, () => ({ contents: `import b from './${brand}.js'; export const BRANDS = { ${JSON.stringify(brand)}: b };`, resolveDir: join(root, 'src/brands'), loader: 'js' }));
} };
const common = { bundle: true, format: 'iife', target: 'es2020', minify: true, legalComments: 'none', logLevel: 'warning', define: { __BRAND__: JSON.stringify(brand) }, plugins: [onlyBrand] };
await build({ ...common, entryPoints: [join(root, 'src/app.js')], outfile: join(out, 'app.js') });
await build({ ...common, entryPoints: [join(root, 'src/three/index.js')], outfile: join(out, 'scene.js') });

const { renderPage } = await import(join(root, 'src/page.js') + `?t=${Date.now()}`);
const { CONFIG } = await import(join(root, 'src/config.js'));
const { translate } = await import(join(root, 'src/i18n.js'));
const { SEQUENCES } = await import(join(root, 'src/three/experience.js'));
const css = (readFileSync(join(root, 'src/styles.css'), 'utf8') + (CONFIG.css ? '\n' + readFileSync(join(root, 'src/brands', CONFIG.css), 'utf8') : '')).replace(/\/\*[\s\S]*?\*\//g, (c, at) => (at < 200 ? c : '')).replace(/\n\s*\n/g, '\n');
const lang = CONFIG.defaultLanguage;
const description = translate(lang, 'meta.description').replace(/"/g, '&quot;');
const fonts = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,400..800&family=IBM+Plex+Mono:wght@400;500&display=swap">';
// A business's own photographs and customer reviews are prepared outside the repository (they are not ours to
// publish there): content/<brand>/content.json and content/<brand>/img/.
let content = null;
if (CONFIG.content) {
  const file = join(root, 'content', brand, 'content.json');
  if (!existsSync(file)) {
    console.error(`\nThe "${brand}" site needs that business's photographs and reviews, and they are not in the repository.\nPrepare them first:  node tools/${brand}-content.mjs\n`);
    process.exit(1);
  }
  content = JSON.parse(readFileSync(file, 'utf8'));
}
const body = renderPage({ lang, artifact: proposal, content });

// Supporting files
const files = { 'app.js': 'app.js', 'scene.js': 'scene.js' };
const { SHOTS } = await import(join(root, 'src/story.js'));
const ownStory = !!CONFIG.story.shots;
const sequence = SEQUENCES[CONFIG.interior];
const stills = new Set([sequence.poster, ...Object.values(sequence.still)].map((name) => `still-${name}.webp`));
const copy = (from, dir) => {
  let names = [];
  try { names = readdirSync(from).sort(); } catch { return; }      // a business without pictures of its own
  for (const name of names) {
    if (!statSync(join(from, name)).isFile()) continue;
    if (name.startsWith('still-') && !stills.has(name)) continue;   // stills of a sequence this business does not show
    if (ownStory && SHOTS.some((shot) => name.startsWith(shot))) continue;   // the shared story pictures, when the business has its own
    mkdirSync(join(out, dir), { recursive: true });
    cpSync(join(from, name), join(out, dir, name));
    files[`${dir}/${name}`] = `${dir}/${name}`;
  }
};
copy(join(root, 'public/img'), 'img');
copy(join(root, 'public/brands', brand, 'img'), 'img');             // the business's own pictures replace the shared ones
if (content) copy(join(root, 'content', brand, 'img'), 'img');      // its photographs (story stills, gallery)
copy(join(root, 'public/models'), 'models');
const themeColor = (css.match(/--bg:\s*(#[0-9a-f]{6})/gi) || ['--bg: #0d0e11']).pop().replace(/.*(#[0-9a-f]{6})/i, '$1');

if (artifact) {
  // The Artifact viewer supplies <html>, <head> and <body>; the page starts with its own <title> and <style>.
  const page = [
    `<title>${CONFIG.brand.title}</title>`,
    '<meta name="claude:viewport-fit-sides" content="cover">',
    `<meta name="description" content="${description}">`,
    '<meta name="robots" content="noindex">',
    fonts,
    `<style>${css}</style>`,
    body,
    '<script src="app.js"></script>',
  ].join('\n');
  writeFileSync(join(out, 'index.html'), page);
  writeFileSync(join(out, 'files.json'), JSON.stringify(files, null, 1));
  // A local stand-in for the viewer's skeleton, to test exactly what will be published.
  writeFileSync(join(out, 'preview.html'), `<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}html{scroll-padding-top:env(safe-area-inset-top,0px)}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#fff;color:#000}img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}</style></head><body>\n${page}\n</body></html>`);
} else {
  writeFileSync(join(out, 'index.html'), `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${CONFIG.brand.title}</title>
<meta name="description" content="${description}">
<meta name="theme-color" content="${themeColor}">${pages ? '\n<meta name="robots" content="noindex">' : ''}
<meta property="og:title" content="${CONFIG.brand.title}">
<meta property="og:description" content="${description}">
<meta property="og:type" content="website">
${fonts}
<style>img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}
${css}</style>
</head>
<body>
${body}
<script src="app.js" defer></script>
</body>
</html>
`);
}
const size = (f) => `${(statSync(join(out, f)).size / 1024).toFixed(0)} KB`;
const total = Object.keys(files).reduce((n, f) => n + statSync(join(out, f)).size, 0);
console.log(`${outName}: index.html ${size('index.html')} · app.js ${size('app.js')} · scene.js ${size('scene.js')} · ${Object.keys(files).length} files, ${(total / 1e6).toFixed(1)} MB`);
