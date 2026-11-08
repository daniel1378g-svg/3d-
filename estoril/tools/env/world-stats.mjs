// Builds the world in Node (real modules, three.js, a stub 2D canvas) per quality and prints the
// vegetation instance counts, triangle counts per level, build time, and depthRange.build() time.
// node tools/env/world-stats.mjs [--q high,mid,low]
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
const { createDepthRange } = await import('../../src/journey/depth-range.js');
const { triangles } = await import('../../src/journey/env/tree-models.js');
const { Mesh, PerspectiveCamera, Scene, SphereGeometry, MeshBasicMaterial } = await import('three');

const arg = (k, d) => {
  const i = process.argv.indexOf('--' + k);
  return i > -1 ? process.argv[i + 1] : d;
};
const root = new URL('../..', import.meta.url).pathname;
const pts = JSON.parse(readFileSync(root + 'site/assets/data/track.json', 'utf8')).pts;
for (const quality of arg('q', 'high,mid,low').split(',')) {
  const t0 = performance.now();
  const world = buildWorld(pts, { quality });
  const t1 = performance.now();
  const { species, tufts } = world.vegetation;
  const rows = species.map(({ name, lod, data }) => ({
    name,
    count: data.count,
    nearTris: triangles(lod.near.geometry),
    farTris: triangles(lod.far.geometry),
    nearCapacity: lod.near.instanceMatrix.count,
  }));
  const scene = new Scene();
  scene.add(world.root);
  const sky = new Mesh(new SphereGeometry(8000, 8, 6), new MeshBasicMaterial());
  scene.add(sky);
  const depth = createDepthRange(new PerspectiveCamera());
  const t2 = performance.now();
  depth.build(scene, { sky, movers: [] });
  const t3 = performance.now();
  const farTris = rows.reduce((s, r) => s + r.count * r.farTris, 0);
  console.log(
    quality,
    `world ${(t1 - t0).toFixed(0)} ms, depthRange.build ${(t3 - t2).toFixed(0)} ms, tufts ${tufts.data.count},`,
    `far triangles ${farTris}`,
    JSON.stringify(world.vegetation.timings),
  );
  console.table(rows);
}
