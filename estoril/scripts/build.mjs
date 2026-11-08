// Builds the page scripts into site/assets/js:
//   home.js                    journey controller (scroll, panels, quality, fallback)
//   chunks/journey-[hash].js   the 3D scene (three.js + src/journey), loaded on demand
import { build } from 'esbuild';
import { readdirSync, rmSync } from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const out = root + 'site/assets/js';
for (const f of readdirSync(out + '/chunks')) rmSync(out + '/chunks/' + f);
const res = await build({
  entryPoints: { home: root + 'src/home.js' },
  bundle: true,
  splitting: true,
  format: 'esm',
  target: 'es2020',
  minify: process.env.MINIFY !== '0',
  sourcemap: process.env.SOURCEMAP === '1' ? 'linked' : false,
  outdir: out,
  chunkNames: 'chunks/[name]-[hash]',
  legalComments: 'none',
  metafile: true,
  logLevel: 'warning',
});
for (const [f, o] of Object.entries(res.metafile.outputs)) console.log(f.replace(root, ''), (o.bytes / 1024).toFixed(1) + ' KB');
