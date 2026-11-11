// Builds the site into dist/.
//
//   dist/site/                 static site for any web host (index.html is a full document)
//   dist/artifact/index.html   page content for the claude.ai Artifact viewer (no document skeleton)
//   dist/artifact/files.json   supporting files for the Artifact `files` parameter
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, cpSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
rmSync(dist, { recursive: true, force: true });
for (const d of ['site', 'artifact']) mkdirSync(join(dist, d, 'img'), { recursive: true });

await build({
  entryPoints: [join(root, 'src/main.tsx')], bundle: true, format: 'iife', platform: 'browser', target: 'es2020',
  jsx: 'automatic', minify: !process.argv.includes('--dev'), define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'warning', outfile: join(dist, 'app.js'),
});

const css = readFileSync(join(root, 'src/styles.css'), 'utf8');
const title = 'Pipinkautobazar';
const fonts = '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,400..800&display=swap">';
const head = `<title>${title}</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n${fonts}\n<style>${css}</style>`;
const body = '<div id="app"></div>\n<script src="app.js"></script>';

writeFileSync(join(dist, 'artifact/index.html'), `${head}\n${body}\n`);
writeFileSync(join(dist, 'site/index.html'), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#07080b">
<meta name="description" content="Detailing, ceramic coating and wraps for cars and motorcycles.">
${head}
</head>
<body>
${body}
</body>
</html>
`);

const files = { 'app.js': 'app.js' };
for (const d of ['site', 'artifact']) cpSync(join(dist, 'app.js'), join(dist, d, 'app.js'));
for (const f of readdirSync(join(root, 'public/img'))) {
  for (const d of ['site', 'artifact']) cpSync(join(root, 'public/img', f), join(dist, d, 'img', f));
  files[`img/${f}`] = `img/${f}`;
}
writeFileSync(join(dist, 'artifact/files.json'), JSON.stringify(Object.fromEntries(Object.keys(files).map((p) => [p, join(dist, 'artifact', p)])), null, 2));
console.log(`built: app.js ${(readFileSync(join(dist, 'app.js')).length / 1024).toFixed(0)} kB, ${Object.keys(files).length - 1} images`);
