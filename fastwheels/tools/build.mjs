// Builds the site.
//
//   node tools/build.mjs              → dist/            the deployable static site
//   node tools/build.mjs --artifact   → dist-artifact/   the claude.ai Artifact preview (page content without a
//                                       document skeleton, a permanent "design proposal" strip, files.json)
//   node tools/build.mjs --pages      → dist-pages/      the public preview on GitHub Pages (complete page, with the
//                                       "design proposal" strip and noindex until the garage adopts the site)
//
// Two script bundles: app.js (page behaviour, small, loads at once) and scene.js (three.js + the 3D scene,
// loaded only when the configurator or the interior sequence comes near).
import { build } from 'esbuild';
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const artifact = process.argv.includes('--artifact');
const pages = process.argv.includes('--pages');      // public preview on GitHub Pages: full document, proposal strip, noindex
const proposal = artifact || pages;
const out = join(root, artifact ? 'dist-artifact' : pages ? 'dist-pages' : 'dist');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const common = { bundle: true, format: 'iife', target: 'es2020', minify: true, legalComments: 'none', logLevel: 'warning' };
await build({ ...common, entryPoints: [join(root, 'src/app.js')], outfile: join(out, 'app.js') });
await build({ ...common, entryPoints: [join(root, 'src/three/index.js')], outfile: join(out, 'scene.js') });

const { renderPage } = await import(join(root, 'src/page.js') + `?t=${Date.now()}`);
const { CONFIG } = await import(join(root, 'src/config.js'));
const { translate } = await import(join(root, 'src/i18n.js'));
const css = readFileSync(join(root, 'src/styles.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, (c, at) => (at < 200 ? c : '')).replace(/\n\s*\n/g, '\n');
const lang = CONFIG.defaultLanguage;
const description = translate(lang, 'meta.description').replace(/"/g, '&quot;');
const fonts = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,400..800&family=IBM+Plex+Mono:wght@400;500&display=swap">';
const body = renderPage({ lang, artifact: proposal });

// Supporting files
const files = { 'app.js': 'app.js', 'scene.js': 'scene.js' };
const copy = (dir) => {
  for (const name of readdirSync(join(root, 'public', dir)).sort()) {
    const from = join(root, 'public', dir, name);
    if (!statSync(from).isFile()) continue;
    mkdirSync(join(out, dir), { recursive: true });
    cpSync(from, join(out, dir, name));
    files[`${dir}/${name}`] = `${dir}/${name}`;
  }
};
copy('img');
copy('models');

if (artifact) {
  // The Artifact viewer supplies <html>, <head> and <body>; the page starts with its own <title> and <style>.
  const page = [
    `<title>${CONFIG.brand.name}</title>`,
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
<title>${CONFIG.brand.name}</title>
<meta name="description" content="${description}">
<meta name="theme-color" content="#0d0e11">${pages ? '\n<meta name="robots" content="noindex">' : ''}
<meta property="og:title" content="${CONFIG.brand.name}">
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
console.log(`${artifact ? 'dist-artifact' : pages ? 'dist-pages' : 'dist'}: index.html ${size('index.html')} · app.js ${size('app.js')} · scene.js ${size('scene.js')} · ${Object.keys(files).length} files, ${(total / 1e6).toFixed(1)} MB`);
