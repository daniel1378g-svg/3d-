// Step 40: buildings  ->  data/buildings.pack
//
// Every building footprint in the area with a height, a facade style and a plaster colour,
// sorted by chunk. Heights come from the height or building:levels tags where mapped (about two
// thirds of the buildings) and from the building type otherwise.
import { readRaw, readSection, writeSection } from '../lib/packio.mjs';
import { forEachArea, ringArea, centroid, simplifyRing, chunkId, hash } from '../lib/osm.mjs';
import { HALF, CHUNKS } from '../../src/js/data/geo.js';

export const STYLES = ['tenement', 'panel', 'modern', 'office', 'industrial', 'house', 'garage', 'civic'];
const S = Object.fromEntries(STYLES.map((s, i) => [s, i]));
const PALETTE = {
  tenement: ['#e8dcc0', '#e3c9a0', '#d9b98c', '#cfd8c0', '#e6cfc0', '#d6c7b0', '#c9d3d8', '#e9e2d0', '#d8b0a0', '#c8c0a8', '#e0d0a8', '#d0c0b0'],
  panel: ['#d8d8d0', '#cfd6dc', '#e0d8c8', '#c8d0c8', '#d8cfc0', '#e4e0d4'],
  modern: ['#b8c4cc', '#a8b4bc', '#c8ccd0', '#9fb0b8'],
  office: ['#cfc8b8', '#c0c0b8', '#d0c8c0', '#bdb6aa'],
  industrial: ['#b8bcc0', '#a8a8a0', '#c0b8a8', '#9aa4a8', '#b4ac9c'],
  house: ['#ece4d0', '#e8d8b8', '#f0e8dc', '#e0c8a8', '#d8dcc8', '#ecd8c8', '#e4dcc0'],
  garage: ['#b0aca4', '#a8a8a8', '#beb6a8'],
  civic: ['#e0d4b8', '#d8c8a8', '#e4dccc', '#d4c4a4'],
};
const CSS = { white: '#f2f0ea', grey: '#a8a8a8', gray: '#a8a8a8', lightgrey: '#cfcfcf', lightgray: '#cfcfcf', tan: '#d2b48c', bisque: '#f0d8b8', sand: '#d8c8a0', beige: '#e8e0c8', yellow: '#e8d070', red: '#b85040', brown: '#8a6a50', orange: '#d89050', green: '#9ab088', blue: '#8aa4c0', pink: '#e8c0c0', black: '#404040', silver: '#c0c4c8', cream: '#f0e8d0', ivory: '#f0ecdc' };

function parseColour(str) {
  if (!str) return null;
  let s = str.trim().toLowerCase();
  if (CSS[s]) s = CSS[s];
  let m = /^#([0-9a-f]{6})$/.exec(s);
  if (m) return [parseInt(m[1].slice(0, 2), 16), parseInt(m[1].slice(2, 4), 16), parseInt(m[1].slice(4, 6), 16)];
  m = /^#([0-9a-f]{3})$/.exec(s);
  if (m) return [...m[1]].map((c) => parseInt(c + c, 16));
  return null;
}
const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];

function classify(t, area, elong) {
  const b = t.building;
  const levels = parseFloat(t['building:levels']) || 0;
  let style, def;
  if (['garage', 'garages', 'shed', 'carport', 'hut', 'kiosk', 'container', 'toilets'].includes(b)) { style = S.garage; def = 2.8; }
  else if (['house', 'detached', 'semidetached_house', 'bungalow', 'terrace', 'cabin', 'farm'].includes(b)) { style = S.house; def = 7.5; }
  else if (['industrial', 'warehouse', 'service', 'hangar', 'manufacture', 'transportation', 'train_station', 'barn', 'greenhouse'].includes(b)) { style = S.industrial; def = 8; }
  else if (['office', 'commercial'].includes(b)) { style = levels >= 6 ? S.modern : S.office; def = 16; }
  else if (['retail', 'supermarket'].includes(b)) { style = S.modern; def = 6; }
  else if (['school', 'kindergarten', 'university', 'college', 'hospital', 'civic', 'public', 'government', 'church', 'chapel', 'sports_hall', 'fire_station'].includes(b)) { style = S.civic; def = 12; }
  else {
    // apartments, residential, dormitory, hotel, yes, ...
    const L = levels || (b === 'apartments' ? 6 : b === 'residential' ? 4 : 0);
    if (L >= 8 || (L >= 4 && area > 700 && elong > 3.2)) { style = S.panel; def = 24; }
    else if (L >= 3) { style = S.tenement; def = 15; }
    else if (area < 55) { style = S.garage; def = 2.8; }
    else if (area < 240) { style = S.house; def = 7.5; }
    else { style = b === 'yes' ? S.office : S.tenement; def = 10; }
  }
  let h = parseFloat(t.height);
  if (!(h > 1.5 && h < 160)) h = levels ? levels * 3.05 + (style === S.tenement ? 1.6 : 0.6) : def;
  return { style, h: Math.max(2.4, Math.min(127, h)) };
}

export default async function run() {
  const raw = readRaw();
  const list = [];
  forEachArea(raw, (t) => t.building && t.building !== 'no' && t.building !== 'roof' && t.location !== 'underground' && !t['building:part'], (ring, t, id) => {
    const c = centroid(ring);
    if (Math.abs(c[0]) > HALF + 20 || Math.abs(c[1]) > HALF + 20) return;
    let r = simplifyRing(ring);
    if (r.length < 3 || r.length > 400) return;
    let area = ringArea(r);
    if (area < 0) { r = r.slice().reverse(); area = -area; }     // store clockwise on screen (x right, z down)
    if (area < 6) return;
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (const p of r) { minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]); minZ = Math.min(minZ, p[1]); maxZ = Math.max(maxZ, p[1]); }
    const long = Math.max(maxX - minX, maxZ - minZ), short = Math.max(1, area / long);
    const { style, h } = classify(t, area, long / short);
    const name = STYLES[style];
    const col = parseColour(t['building:colour']) || hex(PALETTE[name][hash(id) % PALETTE[name].length]);
    const roofShape = t['roof:shape'];
    const pitched = roofShape ? !['flat', 'many', 'round', 'dome'].includes(roofShape) : (style === S.house || (style === S.tenement && area < 1200));
    list.push({ r, h, style, col, pitched: pitched && r.length <= 12 && area < 1500, chunk: chunkId(c[0], c[1]) });
  });
  // Buildings that a road runs through or under (passages, covered streets, bridges mapped as
  // buildings) must not block the road: flag them so the game neither collides with them nor
  // draws their lower floors.
  {
    const g = readSection('graph').buf, cell = 60, grid = new Map();
    const X = (i) => g.ptX[i] / 8, Z = (i) => g.ptZ[i] / 8;
    for (let e = 0; e < g.edgeA.length; e++) for (let p = g.edgePt[e]; p < g.edgePt[e + 1] - 1; p++) {
      const x0 = Math.floor(Math.min(X(p), X(p + 1)) / cell), x1 = Math.floor(Math.max(X(p), X(p + 1)) / cell);
      const z0 = Math.floor(Math.min(Z(p), Z(p + 1)) / cell), z1 = Math.floor(Math.max(Z(p), Z(p + 1)) / cell);
      for (let gz = z0; gz <= z1; gz++) for (let gx = x0; gx <= x1; gx++) { const k = `${gx},${gz}`; if (!grid.has(k)) grid.set(k, []); grid.get(k).push(p); }
    }
    const inside = (r, x, z) => { let hit = false; for (let i = 0, j = r.length - 1; i < r.length; j = i++) if ((r[i][1] > z) !== (r[j][1] > z) && x < r[i][0] + ((z - r[i][1]) / (r[j][1] - r[i][1])) * (r[j][0] - r[i][0])) hit = !hit; return hit; };
    const cross = (ax, az, bx, bz, cx, cz, dx, dz) => { const d = (bx - ax) * (dz - cz) - (bz - az) * (dx - cx); if (Math.abs(d) < 1e-9) return false; const t = ((cx - ax) * (dz - cz) - (cz - az) * (dx - cx)) / d, u = ((cx - ax) * (bz - az) - (cz - az) * (bx - ax)) / d; return t >= 0 && t <= 1 && u >= 0 && u <= 1; };
    let n = 0;
    for (const b of list) {
      let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
      for (const p of b.r) { minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]); minZ = Math.min(minZ, p[1]); maxZ = Math.max(maxZ, p[1]); }
      const seen = new Set();
      search: for (let gz = Math.floor(minZ / cell); gz <= Math.floor(maxZ / cell); gz++) for (let gx = Math.floor(minX / cell); gx <= Math.floor(maxX / cell); gx++) {
        for (const p of grid.get(`${gx},${gz}`) || []) {
          if (seen.has(p)) continue;
          seen.add(p);
          const ax = X(p), az = Z(p), bx = X(p + 1), bz = Z(p + 1);
          if (Math.max(ax, bx) < minX || Math.min(ax, bx) > maxX || Math.max(az, bz) < minZ || Math.min(az, bz) > maxZ) continue;
          let hit = inside(b.r, (ax + bx) / 2, (az + bz) / 2);
          for (let i = 0, j = b.r.length - 1; i < b.r.length && !hit; j = i++) hit = cross(ax, az, bx, bz, b.r[i][0], b.r[i][1], b.r[j][0], b.r[j][1]);
          if (hit) { b.overRoad = true; n++; break search; }
        }
      }
    }
    console.log(`  ${n} buildings stand over a road`);
  }
  list.sort((a, b) => a.chunk - b.chunk);

  const B = list.length;
  let nPts = 0;
  for (const b of list) nPts += b.r.length;
  const q = (v) => Math.max(-32767, Math.min(32767, Math.round(v * 8)));
  const buf = {
    chunkStart: new Uint32Array(CHUNKS * CHUNKS + 1), start: new Uint32Array(B + 1), x: new Int16Array(nPts), z: new Int16Array(nPts),
    height: new Uint8Array(B), style: new Uint8Array(B), flags: new Uint8Array(B), colour: new Uint8Array(B * 3),
  };
  let k = 0, c = 0;
  list.forEach((b, i) => {
    while (c <= b.chunk) buf.chunkStart[c++] = i;
    buf.start[i] = k;
    for (const p of b.r) { buf.x[k] = q(p[0]); buf.z[k] = q(p[1]); k++; }
    buf.height[i] = Math.round(b.h * 2);
    buf.style[i] = b.style;
    buf.flags[i] = (b.pitched ? 1 : 0) | (b.overRoad ? 2 : 0);
    buf.colour.set(b.col, i * 3);
  });
  while (c <= CHUNKS * CHUNKS) buf.chunkStart[c++] = B;
  buf.start[B] = k;
  const byStyle = STYLES.map((s, i) => `${s}:${list.filter((b) => b.style === i).length}`).join(' ');
  console.log(`  ${B} buildings, ${nPts} points; ${byStyle}`);
  writeSection('buildings', { styles: STYLES, doc: 'x/z = metres * 8, rings clockwise on screen; height = metres * 2; flags bit0 = pitched roof, bit1 = a road passes through or under it; chunkStart indexes buildings by chunk id (cz * 30 + cx).' }, buf);
}
