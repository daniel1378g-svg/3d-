// Builds the game into dist/.
//
//   dist/site/                 static site for any web host (index.html is a full document)
//   dist/artifact/index.html   page content for the claude.ai Artifact viewer (no document skeleton)
//   dist/artifact/files.json   supporting files for the Artifact `files` parameter
//
// Both builds share app.js (the bundled game) and data/<section>.js (each map section as the
// base64 of its gzipped pack, assigned to globalThis.__PACK__[section]). three.js comes from
// cdnjs as a classic script and is used through the global THREE.
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, existsSync, cpSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, DATA_DIR } from './lib/packio.mjs';

const THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.159.0/three.min.js';
const dist = join(ROOT, 'dist');
const site = join(dist, 'site');
const artifact = join(dist, 'artifact');
rmSync(dist, { recursive: true, force: true });
for (const d of [site, artifact]) mkdirSync(join(d, 'data'), { recursive: true });

// 1. Game bundle.
await build({
  entryPoints: [join(ROOT, 'src/js/main.js')],
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  minify: !process.argv.includes('--dev'),
  sourcemap: process.argv.includes('--dev') ? 'inline' : false,
  logLevel: 'warning',
  outfile: join(dist, 'app.js'),
});

// 2. Map sections.
const sections = existsSync(DATA_DIR) ? readdirSync(DATA_DIR).filter((f) => f.endsWith('.pack')).map((f) => f.slice(0, -5)) : [];
const files = { 'app.js': 'app.js' };
for (const name of sections) {
  const b64 = readFileSync(join(DATA_DIR, `${name}.pack`)).toString('base64');
  writeFileSync(join(dist, `data-${name}.js`), `(globalThis.__PACK__=globalThis.__PACK__||{})[${JSON.stringify(name)}]="${b64}";`);
  files[`data/${name}.js`] = `data-${name}.js`;
}

// 3. Pages.
const css = readFileSync(join(ROOT, 'src/css/game.css'), 'utf8');
const body = readFileSync(join(ROOT, 'src/page.html'), 'utf8');
const title = 'Prague Exam Drive';
const scripts = [
  `<script src="${THREE_URL}"></script>`,
  ...sections.map((n) => `<script src="data/${n}.js"></script>`),
  '<script src="app.js"></script>',
].join('\n');
const head = [
  `<title>${title}</title>`,
  '<meta name="claude:viewport-fit-sides" content="cover">',
  `<style>${css}</style>`,
].join('\n');

writeFileSync(join(artifact, 'index.html'), `${head}\n${body}\n${scripts}\n`);
writeFileSync(join(site, 'index.html'), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no">
${head}
</head>
<body>
${body}
${scripts}
</body>
</html>
`);

for (const [published, source] of Object.entries(files)) {
  for (const d of [site, artifact]) cpSync(join(dist, source), join(d, published));
}
writeFileSync(join(artifact, 'files.json'), JSON.stringify(
  Object.fromEntries(Object.keys(files).map((p) => [p, `prague-exam/dist/artifact/${p}`])), null, 2));

const size = (p) => `${(readFileSync(p).length / 1024).toFixed(0)} kB`;
console.log(`built dist/site and dist/artifact: app.js ${size(join(dist, 'app.js'))}, sections: ${sections.join(', ') || 'none'}`);
