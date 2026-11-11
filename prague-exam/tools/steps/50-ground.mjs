// Step 50: ground cover and street furniture  ->  data/ground.pack
//
//   cover   a 3 m raster of what the ground is (grass, woodland, water, yards, paved areas ...),
//           painted from OSM landuse, leisure and natural areas. The game colours the ground from it.
//   trees   mapped single trees plus trees sampled along mapped tree rows, sorted by chunk
//   lamps   mapped street lamps, sorted by chunk
import { readRaw, writeSection } from '../lib/packio.mjs';
import { forEachArea, makeProjector, chunkId } from '../lib/osm.mjs';
import { HALF, CHUNKS } from '../../src/js/data/geo.js';

export const COVER = ['urban', 'grass', 'wood', 'water', 'industrial', 'yard', 'paved', 'sport', 'plaza', 'field', 'garden', 'dirt'];
const C = Object.fromEntries(COVER.map((s, i) => [s, i]));
const RES = 3, N = (2 * HALF) / RES;

// Later entries paint over earlier ones.
function coverOf(t) {
  const lu = t.landuse, le = t.leisure, na = t.natural;
  if (lu === 'residential') return [C.yard, 0];
  if (lu === 'industrial' || lu === 'railway' || lu === 'garages' || lu === 'depot') return [C.industrial, 0];
  if (lu === 'commercial' || lu === 'retail') return [C.paved, 0];
  if (lu === 'construction' || lu === 'brownfield' || lu === 'landfill') return [C.dirt, 1];
  if (lu === 'farmland' || lu === 'meadow' || lu === 'vineyard' || lu === 'plant_nursery' || lu === 'orchard') return [C.field, 1];
  if (lu === 'allotments' || le === 'garden') return [C.garden, 2];
  if (lu === 'grass' || lu === 'village_green' || lu === 'flowerbed' || lu === 'greenery' || lu === 'recreation_ground' || lu === 'cemetery') return [C.grass, 2];
  if (le === 'park' || le === 'playground' || le === 'dog_park' || na === 'grassland') return [C.grass, 2];
  if (lu === 'forest' || na === 'wood' || na === 'scrub') return [C.wood, 3];
  if (le === 'pitch' || le === 'track' || na === 'sand') return [C.sport, 4];
  if (t.amenity === 'parking') return [C.paved, 4];
  if ((t.highway === 'pedestrian' || t.highway === 'footway') && t.area === 'yes') return [C.plaza, 4];
  if (t.place === 'square') return [C.plaza, 4];
  if (na === 'water' || t.waterway === 'riverbank' || t.waterway === 'dock' || lu === 'basin' || lu === 'reservoir') return [C.water, 5];
  return null;
}

function fill(grid, ring, value) {
  let minZ = Infinity, maxZ = -Infinity;
  for (const p of ring) { minZ = Math.min(minZ, p[1]); maxZ = Math.max(maxZ, p[1]); }
  const r0 = Math.max(0, Math.floor((minZ + HALF) / RES)), r1 = Math.min(N - 1, Math.ceil((maxZ + HALF) / RES));
  const xs = [];
  for (let row = r0; row <= r1; row++) {
    const z = -HALF + (row + 0.5) * RES;
    xs.length = 0;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const a = ring[i], b = ring[j];
      if ((a[1] > z) !== (b[1] > z)) xs.push(a[0] + ((z - a[1]) / (b[1] - a[1])) * (b[0] - a[0]));
    }
    xs.sort((p, q) => p - q);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      const c0 = Math.max(0, Math.ceil((xs[k] + HALF) / RES - 0.5)), c1 = Math.min(N - 1, Math.floor((xs[k + 1] + HALF) / RES - 0.5));
      for (let col = c0; col <= c1; col++) grid[row * N + col] = value;
    }
  }
}

export default async function run() {
  const raw = readRaw();
  const xz = makeProjector(raw);
  const layers = [[], [], [], [], [], []];
  forEachArea(raw, (t) => coverOf(t) !== null, (ring, t) => { const [v, order] = coverOf(t); layers[order].push([ring, v]); });
  const cover = new Uint8Array(N * N);
  for (const layer of layers) for (const [ring, v] of layer) fill(cover, ring, v);
  const share = COVER.map((name, i) => `${name}:${((cover.reduce((s, v) => s + (v === i ? 1 : 0), 0) / cover.length) * 100).toFixed(0)}%`).join(' ');
  console.log(`  cover ${N}x${N}: ${share}`);

  const inside = (p) => p && Math.abs(p[0]) < HALF && Math.abs(p[1]) < HALF;
  const trees = [], lamps = [];
  for (const id in raw.nodes) {
    const t = raw.nodes[id][2];
    if (!t) continue;
    if (t.natural === 'tree') { const p = xz(id); if (inside(p)) trees.push(p); }
    else if (t.highway === 'street_lamp') { const p = xz(id); if (inside(p)) lamps.push(p); }
  }
  for (const [, refs, t] of raw.ways) {
    if (t.natural !== 'tree_row') continue;
    let carry = 0;
    for (let i = 1; i < refs.length; i++) {
      const a = xz(refs[i - 1]), b = xz(refs[i]);
      if (!a || !b) continue;
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      for (let d = carry; d < L; d += 9) { const p = [a[0] + ((b[0] - a[0]) * d) / L, a[1] + ((b[1] - a[1]) * d) / L]; if (inside(p)) trees.push(p); }
      carry = (carry - L) % 9; if (carry < 0) carry += 9;
    }
  }
  const pack = (pts) => {
    const list = pts.map((p) => ({ p, c: chunkId(p[0], p[1]) })).sort((a, b) => a.c - b.c);
    const start = new Uint32Array(CHUNKS * CHUNKS + 1), X = new Int16Array(list.length), Z = new Int16Array(list.length);
    let c = 0;
    list.forEach((it, i) => { while (c <= it.c) start[c++] = i; X[i] = Math.round(it.p[0] * 8); Z[i] = Math.round(it.p[1] * 8); });
    while (c <= CHUNKS * CHUNKS) start[c++] = list.length;
    return { start, X, Z };
  };
  const T = pack(trees), L = pack(lamps);
  console.log(`  ${trees.length} trees, ${lamps.length} lamps`);
  writeSection('ground', { cover: COVER, res: RES, size: N, doc: 'cover[row * size + col], row along +z from -HALF; tree*/lamp* x/z = metres * 8, indexed by chunk id via *Start.' },
    { cover, treeStart: T.start, treeX: T.X, treeZ: T.Z, lampStart: L.start, lampX: L.X, lampZ: L.Z });
}
