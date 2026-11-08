// Prints the track model's corners and gravel intervals with world positions and outward normals
// (for choosing kerb / gravel camera views). node tools/env/corners.mjs
import { readFileSync } from 'node:fs';
const { createTrackModel } = await import('../../src/journey/world/track-analysis.js');
const root = new URL('../..', import.meta.url).pathname;
const pts = JSON.parse(readFileSync(root + 'site/assets/data/track.json', 'utf8')).pts;
const { Vector2 } = await import('three');
const model = createTrackModel(pts.map(([x, z]) => new Vector2(x, z)));
const { line } = model;
const at = (i) => {
  i = ((i % line.count) + line.count) % line.count;
  return {
    i,
    x: +line.x[i].toFixed(1),
    z: +line.z[i].toFixed(1),
    nx: +line.nx[i].toFixed(3),
    nz: +line.nz[i].toFixed(3),
  };
};
console.log('corners');
for (const c of model.corners)
  console.log(
    c.first,
    c.last,
    JSON.stringify(at(Math.round((c.first + c.last) / 2))),
    c.subCorners.map((s) => s.direction).join(''),
  );
console.log('gravel');
for (const g of model.gravel)
  console.log(g.side, g.first, g.last, JSON.stringify(at(Math.round((g.first + g.last) / 2))));
