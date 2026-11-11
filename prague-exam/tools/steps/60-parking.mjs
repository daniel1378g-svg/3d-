// Step 60: parked cars  ->  data/parking.pack
//
// Prague's residential streets are lined with cars parked half on the kerb. OSM does not map
// individual parked cars, so they are generated: along both kerbs of ordinary streets, in
// clusters of varying density, keeping clear of junctions, crossings, stop lines, tram tracks
// and the other carriageway of a dual road. The placement is deterministic (hashes, no random
// numbers), so rebuilding gives the same streets.
import { readSection, writeSection } from '../lib/packio.mjs';
import { RoadNet, FLAG } from '../../src/js/sim/roadnet.js';
import { chunkId, hash } from '../lib/osm.mjs';
import { headingOf, HALF, CHUNKS } from '../../src/js/data/geo.js';

const SLOT = 5.7;                       // metres per parallel parking space
const INTO_ROAD = 0;                    // parked cars stand on the pavement side of the kerb line, clear of the lanes
const COLOURS = [[232, 232, 228], [244, 244, 240], [190, 194, 198], [150, 154, 160], [96, 100, 106], [34, 36, 40], [28, 30, 34], [44, 62, 92], [30, 78, 140], [120, 30, 30], [176, 48, 36], [70, 88, 62], [184, 176, 160], [210, 190, 80]];
const KIND_WEIGHT = [35, 20, 20, 18, 7];                         // hatch, sedan, estate, suv, van
const unit = (str) => (hash(str) % 10000) / 10000;

export default async function run() {
  const net = new RoadNet(readSection('graph'));
  // Tram rails, sampled into a grid, so no car is parked on a track.
  const tramCell = 20, tram = new Set();
  for (let i = 0; i < net.tram.pt.length - 1; i++) {
    for (let p = net.tram.pt[i]; p < net.tram.pt[i + 1] - 1; p++) {
      const ax = net.tram.x[p], az = net.tram.z[p], bx = net.tram.x[p + 1], bz = net.tram.z[p + 1];
      const n = Math.max(1, Math.ceil(Math.hypot(bx - ax, bz - az) / 3));
      for (let k = 0; k <= n; k++) tram.add(`${Math.round((ax + ((bx - ax) * k) / n) / 3)},${Math.round((az + ((bz - az) * k) / n) / 3)}`);
    }
  }
  const nearTram = (x, z) => { for (let dx = -1; dx <= 1; dx++) for (let dz = -1; dz <= 1; dz++) if (tram.has(`${Math.round(x / 3) + dx},${Math.round(z / 3) + dz}`)) return true; return false; };
  void tramCell;

  const cars = [];
  for (let e = 0; e < net.E; e++) {
    const rank = net.rank[e];
    if (rank < 2 || rank > 3 || net.speedKmh[e] > 50 || net.len[e] < 45) continue;
    if (net.flags[e] & (FLAG.ROUNDABOUT | FLAG.LINK | FLAG.BRIDGE | FLAG.TUNNEL | FLAG.NARROW)) continue;
    const W = net.width[e], L = net.len[e];
    const keepClear = [
      [0, (net.isJunction(net.edgeA[e]) ? net.trim[e * 2] : 0) + 12],
      [L - (net.isJunction(net.edgeB[e]) ? net.trim[e * 2 + 1] : 0) - 12, L],
    ];
    for (const x of net.crossingsOn(e)) keepClear.push([x.s - 7.5, x.s + 7.5]);
    for (const dir of [1, -1]) for (const l of net.linesOn(e, dir)) keepClear.push(dir > 0 ? [l.s - 18, l.s + 3] : [l.s - 3, l.s + 18]);
    for (const r of net.railsOn(e)) keepClear.push([r.s - 15, r.s + 15]);
    for (const side of [1, -1]) {
      // Another carriageway close on this side (a dual road's median): no kerb to park at.
      let median = false;
      for (const f of [0.2, 0.5, 0.8]) {
        const p = net.pos(e, L * f);
        const hit = net.nearest(p.x - p.dz * side * (W / 2 + 3.5), p.z + p.dx * side * (W / 2 + 3.5), 8, (c) => c !== e && net.rank[c] >= 1 && net.edgeA[c] !== net.edgeA[e] && net.edgeB[c] !== net.edgeB[e]);
        if (hit && hit.dist < net.width[hit.e] / 2 + 3) median = true;
      }
      if (median) continue;
      const facing = side > 0 || net.oneway(e) ? 1 : -1;
      const street = 0.2 + 0.55 * unit(`s${e}:${side}`) * (rank === 2 ? 1 : 0.7);     // how full this kerb is overall
      for (let k = 0, s = 3; s < L - 3; k++, s += SLOT) {
        if (keepClear.some(([a, b]) => s + 2.5 > a && s - 2.5 < b)) continue;
        if (unit(`c${e}:${side}:${k}`) > street * (0.45 + 1.1 * unit(`g${e}:${side}:${Math.floor(k / 5)}`))) continue;
        const p = net.pos(e, s + (unit(`j${e}:${side}:${k}`) - 0.5) * 0.6);
        const off = side * (W / 2 + 0.9 - INTO_ROAD);
        const x = p.x - p.dz * off, z = p.z + p.dx * off;
        if (Math.abs(x) > HALF - 5 || Math.abs(z) > HALF - 5 || nearTram(x, z)) continue;
        let kind = 0, pick = unit(`k${e}:${side}:${k}`) * 100;
        while (kind < 4 && (pick -= KIND_WEIGHT[kind]) > 0) kind++;
        cars.push({ x, z, h: headingOf(p.dx * facing, p.dz * facing) + (unit(`a${e}:${side}:${k}`) - 0.5) * 0.04, kind, colour: COLOURS[hash(`o${e}:${side}:${k}`) % COLOURS.length], chunk: chunkId(x, z) });
      }
    }
  }
  cars.sort((a, b) => a.chunk - b.chunk);
  const n = cars.length;
  const buf = { start: new Uint32Array(CHUNKS * CHUNKS + 1), x: new Int16Array(n), z: new Int16Array(n), h: new Int16Array(n), kind: new Uint8Array(n), colour: new Uint8Array(n * 3) };
  let c = 0, worst = 0;
  const perChunk = new Uint16Array(CHUNKS * CHUNKS);
  cars.forEach((car, i) => {
    while (c <= car.chunk) buf.start[c++] = i;
    buf.x[i] = Math.round(car.x * 8); buf.z[i] = Math.round(car.z * 8);
    let h = car.h; if (h > Math.PI) h -= 2 * Math.PI; else if (h < -Math.PI) h += 2 * Math.PI;
    buf.h[i] = Math.round(h * 10000); buf.kind[i] = car.kind; buf.colour.set(car.colour, i * 3);
    worst = Math.max(worst, ++perChunk[car.chunk]);
  });
  while (c <= CHUNKS * CHUNKS) buf.start[c++] = n;
  console.log(`  ${n} parked cars, at most ${worst} in one chunk`);
  writeSection('parking', { length: 4.3, width: 1.8, intoRoad: INTO_ROAD, doc: 'x/z = metres * 8, h = heading in radians * 10000, kind 0 hatch 1 sedan 2 estate 3 suv 4 van (255 = removed at run time), colour r,g,b; start indexes cars by chunk id.' }, buf);
}
