// Generates the tessera structure of a seamless Ottoman-style mosaic.
// Every pixel belongs to a Voronoi cell (one hand-cut glass piece); each cell takes the
// motif colour slot sampled at its centre, so pieces are uniformly coloured like real glass.
// Output: slot per pixel, grout mask, per-cell random, and a tangent-space normal map.

function hash(x, y, s = 0) {
  let h = (x * 374761393 + y * 668265263 + s * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

// Motif slots: 0 white glass, 1 rosette core / alternate petals, 2 petals, 3 cobalt accents, 4 star
// One tile = a rosette in the centre and quarter stars in the corners, as in Ottoman tilework.
function motif(u, v, tileX, tileY) {
  const alt = (tileX + tileY) & 1;
  const x = u - 0.5, y = v - 0.5;
  const r = Math.hypot(x, y);
  const a = Math.atan2(y, x);
  const seg = Math.PI / 4;
  let af = ((a % seg) + seg) % seg;
  af = Math.abs(af - seg / 2); // 0 on a petal axis, seg/2 between petals
  if (r < 0.06) return alt ? 2 : 1;
  if (r < 0.078) return 3;
  if (r < 0.275) {
    const t = (r - 0.078) / 0.197;
    const half = Math.pow(Math.sin(Math.PI * Math.min(1, t * 1.05)), 0.75) * (seg / 2) * 0.9;
    if (af < half) return alt ? 1 : 2;
    return 0;
  }
  if (r < 0.292) return 0;
  if (r < 0.36) {
    const s16 = Math.PI / 8;
    let at = ((a % s16) + s16) % s16;
    at = Math.abs(at - s16 / 2) / (s16 / 2);
    if (at < 1 - (r - 0.292) / 0.068) return 3;
    return 0;
  }
  // corner eight-pointed stars with a cobalt outline and centre
  const cx = Math.min(u, 1 - u), cy = Math.min(v, 1 - v);
  const rc = Math.hypot(cx, cy);
  if (rc < 0.23) {
    const ac = Math.atan2(cy, cx);
    let k = ((ac % seg) + seg) % seg;
    k = Math.abs(k - seg / 2) / (seg / 2); // 0 at a point, 1 between points
    const starR = 0.2 - 0.075 * k;
    if (rc < 0.045) return 3;
    if (rc < starR) return 4;
    if (rc < starR + 0.022) return 3;
    return 0;
  }
  // small diamonds at the middle of each edge
  const ex = Math.min(Math.abs(u - 0.5) + Math.min(v, 1 - v), Math.abs(v - 0.5) + Math.min(u, 1 - u));
  if (ex < 0.06) return alt ? 1 : 2;
  return 0;
}

// Runs on the main thread in time slices so the intro animation stays smooth.
export async function generateMosaic({ size, tilesU, tilesV, cellsPerTile }) {
  const nextFrame = () => new Promise((r) => setTimeout(r, 0));
  let sliceStart = performance.now();
  const W = size, H = size;
  const gu = tilesU * cellsPerTile, gv = tilesV * cellsPerTile; // jittered grid of sites
  const sites = new Float32Array(gu * gv * 2);
  const cellSlot = new Uint8Array(gu * gv);
  const cellRand = new Float32Array(gu * gv * 4);
  for (let j = 0; j < gv; j++) for (let i = 0; i < gu; i++) {
    const k = j * gu + i;
    const sx = (i + 0.15 + 0.7 * hash(i, j, 1)) / gu;
    const sy = (j + 0.15 + 0.7 * hash(i, j, 2)) / gv;
    sites[k * 2] = sx; sites[k * 2 + 1] = sy;
    const tx = Math.floor(sx * tilesU), ty = Math.floor(sy * tilesV);
    cellSlot[k] = motif(sx * tilesU - tx, sy * tilesV - ty, tx, ty);
    cellRand[k * 4] = hash(i, j, 3);
    cellRand[k * 4 + 1] = hash(i, j, 4) * 2 - 1;
    cellRand[k * 4 + 2] = hash(i, j, 5) * 2 - 1;
    cellRand[k * 4 + 3] = hash(i, j, 6);
  }
  const slot = new Uint8Array(W * H);
  const grout = new Uint8Array(W * H);
  const rnd = new Uint8Array(W * H);
  const shade = new Uint8Array(W * H);
  const normal = new Uint8Array(W * H * 4);
  const cw = 1 / gu, ch = 1 / gv;
  const groutW = 0.034; // fraction of cell size
  for (let py = 0; py < H; py++) {
    if (performance.now() - sliceStart > 10) { await nextFrame(); sliceStart = performance.now(); }
    const v = (py + 0.5) / H;
    const gj = Math.floor(v * gv);
    for (let px = 0; px < W; px++) {
      const u = (px + 0.5) / W;
      const gi = Math.floor(u * gu);
      let d1 = 1e9, d2 = 1e9, best = 0, bdx = 0, bdy = 0, s2x = 0, s2y = 0;
      for (let oj = -1; oj <= 1; oj++) for (let oi = -1; oi <= 1; oi++) {
        let ii = gi + oi, jj = gj + oj, wu = 0, wv = 0;
        if (ii < 0) { ii += gu; wu = -1; } else if (ii >= gu) { ii -= gu; wu = 1; }
        if (jj < 0) { jj += gv; wv = -1; } else if (jj >= gv) { jj -= gv; wv = 1; }
        const k = jj * gu + ii;
        const dx = (sites[k * 2] + wu - u) / cw, dy = (sites[k * 2 + 1] + wv - v) / ch;
        const d = dx * dx + dy * dy;
        if (d < d1) { d2 = d1; s2x = bdx; s2y = bdy; d1 = d; best = k; bdx = dx; bdy = dy; }
        else if (d < d2) { d2 = d; s2x = dx; s2y = dy; }
      }
      // distance to the bisector between nearest two sites
      const mx = (bdx + s2x) / 2, my = (bdy + s2y) / 2;
      let nx = s2x - bdx, ny = s2y - bdy;
      const nl = Math.hypot(nx, ny) || 1; nx /= nl; ny /= nl;
      const edge = Math.abs(-mx * nx + -my * ny);
      const p = py * W + px;
      const jitter = groutW * (0.8 + 0.5 * cellRand[best * 4 + 3]);
      const g = edge < jitter ? 1 : edge < jitter * 1.7 ? 1 - (edge - jitter) / (jitter * 0.7) : 0;
      grout[p] = Math.round(g * 255);
      slot[p] = cellSlot[best];
      rnd[p] = Math.round(cellRand[best * 4] * 255);
      shade[p] = Math.round(128 + cellRand[best * 4 + 1] * 40);
      // normal: per-piece tilt plus a bevel toward the grout
      let tx = cellRand[best * 4 + 1] * 0.12, ty = cellRand[best * 4 + 2] * 0.12;
      const bevel = Math.max(0, 1 - edge / (jitter * 3.2));
      if (bevel > 0) { tx -= nx * bevel * 0.55; ty -= ny * bevel * 0.55; }
      const nz = 1;
      const L = Math.hypot(tx, ty, nz);
      normal[p * 4] = Math.round((tx / L * 0.5 + 0.5) * 255);
      normal[p * 4 + 1] = Math.round((-ty / L * 0.5 + 0.5) * 255);
      normal[p * 4 + 2] = Math.round((nz / L * 0.5 + 0.5) * 255);
      normal[p * 4 + 3] = 255;
    }
  }
  return { size, slot, grout, rnd, shade, normal };
}
