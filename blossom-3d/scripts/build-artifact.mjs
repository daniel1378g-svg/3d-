// Packs the built viewer (dist/) for the claude.ai Artifact preview into artifact/.
//
// The Artifact viewer wraps the page in its own document, serves supporting files next to it, and does not
// serve binary model files, so:
//   artifact/index.html        page content only (title, fonts, inlined CSS, markup, <script src="app.js">)
//   artifact/app.js            the viewer bundle
//   artifact/assets/*          scene.json, lightmaps, and the model as gzip + base64 in JSON parts (see manifest.json)
//   artifact/files.json        published path -> source path, for the Artifact `files` parameter
import { gzipSync } from 'node:zlib';
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist'), out = join(root, 'artifact');
rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'assets'), { recursive: true });

const html = readFileSync(join(dist, 'index.html'), 'utf8');
const blocks = [...html.matchAll(/<!--page-->([\s\S]*?)<!--\/page-->/g)].map((m) => m[1].trim());
if (blocks.length !== 2) throw new Error('index.html must contain two <!--page--> blocks (head and body)');
const css = readFileSync(join(dist, 'app.css'), 'utf8');
const page = [blocks[0], `<style>${css}</style>`, blocks[1], '<script src="app.js"></script>'].join('\n');
writeFileSync(join(out, 'index.html'), page);
cpSync(join(dist, 'app.js'), join(out, 'app.js'));

const files = { 'app.js': 'artifact/app.js' };
const PART = 9_000_000;        // characters of base64 per part (text files are limited to 16 MB)
for (const name of readdirSync(join(dist, 'assets')).sort()) {
  const src = join(dist, 'assets', name);
  if (name === 'manifest.json') continue;
  if (name.endsWith('.glb')) {
    const b64 = gzipSync(readFileSync(src), { level: 9 }).toString('base64');
    const parts = [];
    for (let i = 0, n = 0; i < b64.length; i += PART, n++) {
      const f = `model.${n}.json`;
      writeFileSync(join(out, 'assets', f), JSON.stringify({ d: b64.slice(i, i + PART) }));
      parts.push(f); files['assets/' + f] = 'artifact/assets/' + f;
    }
    writeFileSync(join(out, 'assets', 'manifest.json'), JSON.stringify({ model: { parts, gzip: true } }));
    files['assets/manifest.json'] = 'artifact/assets/manifest.json';
    continue;
  }
  cpSync(src, join(out, 'assets', name));
  files['assets/' + name] = 'artifact/assets/' + name;
}
writeFileSync(join(out, 'files.json'), JSON.stringify(files, null, 2));
let total = 0;
for (const [k, v] of Object.entries(files)) { const s = statSync(join(root, v)).size; total += s; console.log(k.padEnd(28), (s / 1e6).toFixed(2), 'MB'); }
console.log('page', (statSync(join(out, 'index.html')).size / 1e3).toFixed(1), 'kB · files', (total / 1e6).toFixed(1), 'MB');
