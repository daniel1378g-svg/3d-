// Packs the built viewer (dist/) into ONE self-contained HTML file that can be sent as an attachment and
// opened by double-click: scripts, styles, scene data, the model (gzip + base64) and the lightmaps are all
// inside the file, and nothing is fetched (browsers block fetch() on file:// pages).
//   node scripts/build-standalone.mjs  →  standalone/Refeitorio-Balnearios-3D.html
import { gzipSync } from 'node:zlib';
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist'), outDir = join(root, 'standalone');
mkdirSync(outDir, { recursive: true });

const html = readFileSync(join(dist, 'index.html'), 'utf8');
const blocks = [...html.matchAll(/<!--page-->([\s\S]*?)<!--\/page-->/g)].map((m) => m[1].trim());
if (blocks.length !== 2) throw new Error('index.html must contain two <!--page--> blocks (head and body)');
const css = readFileSync(join(dist, 'app.css'), 'utf8');
// an inline script must not contain the end tag or an HTML comment opener
const inline = (js) => js.replace(/<\/script/gi, '<\\/script').replace(/<!--/g, '<\\!--');
const app = inline(readFileSync(join(dist, 'app.js'), 'utf8'));

const scene = JSON.parse(readFileSync(join(dist, 'assets', 'scene.json'), 'utf8'));
const embed = {
  scene,
  model: gzipSync(readFileSync(join(dist, 'assets', 'model.glb')), { level: 9 }).toString('base64'),
  lightmaps: scene.lightmaps.files.map((f) => 'data:image/webp;base64,' + readFileSync(join(dist, 'assets', f)).toString('base64')),
};
const data = JSON.stringify(embed).replace(/</g, '\\u003c');

const page = `<!doctype html>
<html lang="pt">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
${blocks[0]}
<style>${css}</style>
</head>
<body>
${blocks[1]}
<script>window.__RB3D_EMBED = ${data};</script>
<script>${app}</script>
</body>
</html>
`;
const out = join(outDir, 'Refeitorio-Balnearios-3D.html');
writeFileSync(out, page);
console.log(out, (statSync(out).size / 1e6).toFixed(1), 'MB');
