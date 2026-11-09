// Lists the vegetation instances nearest to a point (for choosing fixed camera views).
// node tools/env/near-trees.mjs --at 320,211 [--n 12] [--q high]
import { readFileSync } from 'node:fs';

const context2d = new Proxy(
  {},
  {
    get: (target, key) =>
      key in target ? target[key] : () => ({ addColorStop() {}, data: new Uint8ClampedArray(4) }),
    set: (target, key, value) => ((target[key] = value), true),
  },
);
globalThis.document ??= { createElement: () => ({ width: 0, height: 0, getContext: () => context2d }) };
const { buildWorld } = await import('../../src/journey/world/index.js');
const arg = (k, d) => {
  const i = process.argv.indexOf('--' + k);
  return i > -1 ? process.argv[i + 1] : d;
};
const [ax, az] = arg('at', '0,0').split(',').map(Number);
const n = +arg('n', '12');
const root = new URL('../..', import.meta.url).pathname;
const pts = JSON.parse(readFileSync(root + 'site/assets/data/track.json', 'utf8')).pts;
const world = buildWorld(pts, { quality: arg('q', 'high') });
const rows = [];
for (const { name, data } of world.vegetation.species)
  for (let i = 0; i < data.count; i++)
    rows.push({
      name,
      x: +data.x[i].toFixed(1),
      z: +data.z[i].toFixed(1),
      d: +Math.hypot(data.x[i] - ax, data.z[i] - az).toFixed(1),
    });
rows.sort((a, b) => a.d - b.d);
console.table(rows.slice(0, n));
