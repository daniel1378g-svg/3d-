// Pure geometry for the street surfaces: no three.js, no DOM, runs in Node for tests.
//
//   createStreetBuilder(net, { ground, uvOf, metres }) -> { build(cx, cz), ... }
//   build(cx, cz) -> { ox, oz, surf, over, mark, decal }   four vertex buffers, one per material
//
// Everything is built from "stations": cross-sections of an edge at chosen distances s, each with
// a centre point, a mitred right-hand normal and the half width there. Ribbons, kerbs, pavements
// and lines are all strips between lateral offsets at consecutive stations, so they always meet.
// Flat pieces that share a material may overlap freely: they lie at the same height with
// world-space texture coordinates, so the overlap cannot be seen.
import { CTRL, FLAG } from '../../sim/roadnet.js';
import { HALF, CHUNK, CHUNKS, chunkOf, chunkBounds } from '../../data/geo.js';

export const LAYERS = ['asphalt', 'asphaltWorn', 'sett', 'paving', 'mosaic', 'concrete', 'ballast', 'grass', 'dirt', 'flat', 'sleepers'];
export const DEFAULT_METRES = [4, 4, 2, 2, 2, 4, 2, 3, 3, 1, 1.2];
const L_ASPHALT = 0, L_WORN = 1, L_SETT = 2, L_PAVING = 3, L_MOSAIC = 4, L_CONCRETE = 5, L_BALLAST = 6, L_GRASS = 7, L_FLAT = 9, L_SLEEPERS = 10;
// Carriageway height per layer: a couple of millimetres apart so that two different surfaces
// that do overlap (a rare, degenerate junction) settle one way instead of flickering.
const LY = [0, 0.002, 0.008, 0.006, 0, 0.004, 0, 0, 0, 0, 0];

const PW = 2.2, KW = 0.24, KH = 0.13;           // pavement width, kerb stone width, kerb height
const Y_FLUSH = 0.012, Y_BED = 0.01, Y_RAIL = 0.026, Y_MARK = 0.018, Y_DECAL = 0.022;
const GRID = 24;                                // metres, cell of the neighbour-search grids
const GN = Math.ceil((2 * (HALF + 120)) / GRID);

// Palette, sRGB bytes. Vertex colours are linear in three.js, so they are converted below.
const PAL_SRGB = [
  [255, 255, 255],   // 0 plain
  [228, 225, 218],   // 1 kerb stone
  [196, 194, 188],   // 2 flush edge strip
  [66, 58, 54],      // 3 rail, web
  [168, 172, 180],   // 4 rail, running edge
  [232, 232, 232],   // 5 track bed
  [176, 150, 140],   // 6 speed hump
  [236, 236, 228],   // 7 road paint
  [238, 190, 40],    // 8 yellow paint
  [205, 203, 198],   // 9 concrete edge of an open track
];
const PR = new Uint8Array(PAL_SRGB.length), PG = new Uint8Array(PAL_SRGB.length), PB = new Uint8Array(PAL_SRGB.length);
PAL_SRGB.forEach((c, i) => {
  const lin = (v) => { v /= 255; return Math.round(255 * (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4))); };
  PR[i] = lin(c[0]); PG[i] = lin(c[1]); PB[i] = lin(c[2]);
});
const C_WHITE = 0, C_KERB = 1, C_FLUSH = 2, C_RAIL = 3, C_RAILTOP = 4, C_BED = 5, C_HUMP = 6, C_PAINT = 7, C_YELLOW = 8, C_TEDGE = 9;

const ARROW_W = { M_ARROW_S: 0.75, M_ARROW_L: 1.25, M_ARROW_R: 1.25, M_ARROW_SL: 1.5, M_ARROW_SR: 1.5, M_ARROW_LR: 2 };
const ARROW_OF = [null, ['M_ARROW_L'], ['M_ARROW_S'], ['M_ARROW_SL'], ['M_ARROW_R'], ['M_ARROW_LR'], ['M_ARROW_SR'], ['M_ARROW_SL', 'M_ARROW_SR']];

class Buf {
  constructor(cap = 8192) {
    this.cap = cap; this.icap = cap * 2; this.nv = 0; this.ni = 0;
    this.pos = new Float32Array(cap * 3); this.nrm = new Int8Array(cap * 3); this.uv = new Float32Array(cap * 3);
    this.col = new Uint8Array(cap * 3); this.idx = new Uint32Array(this.icap);
  }
  need(v, i) {
    if (this.nv + v > this.cap) {
      while (this.nv + v > this.cap) this.cap *= 2;
      const g = (a, T) => { const b = new T(this.cap * 3); b.set(a); return b; };
      this.pos = g(this.pos, Float32Array); this.nrm = g(this.nrm, Int8Array); this.uv = g(this.uv, Float32Array); this.col = g(this.col, Uint8Array);
    }
    if (this.ni + i > this.icap) {
      while (this.ni + i > this.icap) this.icap *= 2;
      const b = new Uint32Array(this.icap); b.set(this.idx); this.idx = b;
    }
  }
}

function mkSlot() {
  const cap = 64;
  return { n: 0, cap, s: new Float64Array(cap), x: new Float64Array(cap), z: new Float64Array(cap), nx: new Float64Array(cap), nz: new Float64Array(cap), hw: new Float64Array(cap), kh: new Float64Array(cap) };
}
function growSlot(sl, n) {
  let cap = sl.cap;
  while (cap < n) cap *= 2;
  sl.cap = cap;
  for (const k of ['s', 'x', 'z', 'nx', 'nz', 'hw', 'kh']) sl[k] = new Float64Array(cap);
}

// Interval lists are flat arrays [a0, b0, a1, b1, ...].
function mergeIv(iv) {
  if (iv.length <= 2) return iv;
  const pairs = [];
  for (let i = 0; i < iv.length; i += 2) pairs.push([iv[i], iv[i + 1]]);
  pairs.sort((p, q) => p[0] - q[0]);
  const out = [pairs[0][0], pairs[0][1]];
  for (let i = 1; i < pairs.length; i++) {
    if (pairs[i][0] <= out[out.length - 1]) { if (pairs[i][1] > out[out.length - 1]) out[out.length - 1] = pairs[i][1]; }
    else out.push(pairs[i][0], pairs[i][1]);
  }
  return out;
}
// [a, b] minus a merged, sorted interval list.
function subIv(a, b, cuts, minLen) {
  const out = [];
  let p = a;
  for (let i = 0; i < cuts.length; i += 2) {
    if (cuts[i + 1] <= p) continue;
    if (cuts[i] >= b) break;
    if (cuts[i] - p >= minLen) out.push(p, cuts[i]);
    if (cuts[i + 1] > p) p = cuts[i + 1];
  }
  if (b - p >= minLen) out.push(p, b);
  return out;
}

export function createStreetBuilder(net, { ground = null, uvOf = null, metres = DEFAULT_METRES } = {}) {
  const E = net.E, N = net.N;
  const { ptX, ptZ, ptS, edgePt, edgeA, edgeB, width, len, rank, flags } = net;
  const P = ptX.length;
  const IM = new Float64Array(LAYERS.length);
  for (let i = 0; i < LAYERS.length; i++) IM[i] = 1 / (metres[i] || 2);
  const UO = new Float64Array(LAYERS.length), VO = new Float64Array(LAYERS.length);
  const armsN = (n) => net.arms[n].length;

  // ---- per-edge constants -----------------------------------------------------------------------
  const HW = new Float32Array(E), layerOf = new Uint8Array(E), segEdge = new Int32Array(P);
  for (let e = 0; e < E; e++) {
    HW[e] = width[e] / 2;
    const sf = net.surface[e];
    layerOf[e] = sf === 1 ? L_SETT : sf === 2 ? L_PAVING : sf === 3 ? L_CONCRETE : rank[e] >= 3 ? L_ASPHALT : L_WORN;
    for (let p = edgePt[e]; p < edgePt[e + 1]; p++) segEdge[p] = e;
  }
  // Half width at each end (two-arm nodes take the narrower of the two roads) and the length
  // over which the wider road tapers down to it.
  const hwNode = new Float32Array(E * 2), taper = new Float32Array(E * 2);
  const otherArm = (n, e, end) => { const a = net.arms[n]; return a[0].e === e && a[0].end === end ? a[1] : a[0]; };
  for (let e = 0; e < E; e++) for (let end = 0; end < 2; end++) {
    const n = end ? edgeB[e] : edgeA[e];
    let h = HW[e];
    if (armsN(n) === 2) h = Math.min(h, HW[otherArm(n, e, end).e]);
    hwNode[e * 2 + end] = h;
    taper[e * 2 + end] = HW[e] > h + 0.05 ? Math.min(len[e] * 0.45, Math.max(4, (HW[e] - h) * 6)) : 0;
  }

  // ---- mitred normals at every polyline point -----------------------------------------------------
  const PNX = new Float32Array(P), PNZ = new Float32Array(P);
  // Unit direction of the first (end 0) or last (end 1) segment of an edge, in a -> b order.
  const endDir = (e, end, out) => {
    const p0 = edgePt[e], p1 = edgePt[e + 1] - 1;
    let a = end ? p1 - 1 : p0, b = a + 1;
    let dx = ptX[b] - ptX[a], dz = ptZ[b] - ptZ[a], l = Math.hypot(dx, dz);
    while (l < 1e-4 && (end ? a > p0 : b < p1)) { if (end) a--; else b++; dx = ptX[b] - ptX[a]; dz = ptZ[b] - ptZ[a]; l = Math.hypot(dx, dz); }
    if (l < 1e-4) { dx = 1; dz = 0; l = 1; }
    out[0] = dx / l; out[1] = dz / l;
  };
  {
    const d1 = [0, 0], d2 = [0, 0];
    const mitre = (p, ax, az, bx, bz) => {                       // directions before and after the point
      let nx = -az - bz, nz = ax + bx;
      const l = Math.hypot(nx, nz);
      if (l < 0.2) { PNX[p] = -bz; PNZ[p] = bx; return; }        // hairpin: keep the outgoing normal
      nx /= l; nz /= l;
      const c = Math.max(0.45, nx * -bz + nz * bx);              // cos of half the bend, mitre capped at ~2.2
      PNX[p] = nx / c; PNZ[p] = nz / c;
    };
    for (let e = 0; e < E; e++) {
      const p0 = edgePt[e], p1 = edgePt[e + 1] - 1;
      let lx = 0, lz = 0, have = false;
      for (let p = p0; p <= p1; p++) {
        let nxt = false, bx = 0, bz = 0;
        if (p < p1) {
          const dx = ptX[p + 1] - ptX[p], dz = ptZ[p + 1] - ptZ[p], l = Math.hypot(dx, dz);
          if (l > 1e-4) { bx = dx / l; bz = dz / l; nxt = true; }
        }
        if (p === p0 || p === p1) {
          const end = p === p0 ? 0 : 1, n = end ? edgeB[e] : edgeA[e];
          endDir(e, end, d2);
          let ax = d2[0], az = d2[1];
          if (armsN(n) === 2) {
            const o = otherArm(n, e, end);
            endDir(o.e, o.end, d1);
            // Direction of travel through the node, in this edge's a -> b sense.
            const sgn = (o.end === end) ? -1 : 1;
            if (end === 0) mitre(p, d1[0] * sgn, d1[1] * sgn, ax, az);
            else mitre(p, ax, az, d1[0] * sgn, d1[1] * sgn);
          } else { PNX[p] = -az; PNZ[p] = ax; }
        } else if (nxt && have) mitre(p, lx, lz, bx, bz);
        else if (nxt) { PNX[p] = -bz; PNZ[p] = bx; }
        else { PNX[p] = -lz; PNZ[p] = lx; }
        if (nxt) { lx = bx; lz = bz; have = true; }
      }
    }
  }

  // ---- cross-section at any s ---------------------------------------------------------------------
  let _x = 0, _z = 0, _nx = 0, _nz = 0, _hw = 0;
  function calc(e, s) {
    const p0 = edgePt[e], p1 = edgePt[e + 1] - 1;
    let lo = p0, hi = p1;
    while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (ptS[mid] <= s) lo = mid; else hi = mid; }
    if (s <= ptS[lo]) { _x = ptX[lo]; _z = ptZ[lo]; _nx = PNX[lo]; _nz = PNZ[lo]; }
    else if (s >= ptS[hi]) { _x = ptX[hi]; _z = ptZ[hi]; _nx = PNX[hi]; _nz = PNZ[hi]; }
    else {
      const L = ptS[hi] - ptS[lo], f = (s - ptS[lo]) / L;
      const dx = ptX[hi] - ptX[lo], dz = ptZ[hi] - ptZ[lo], dl = Math.hypot(dx, dz) || 1;
      _x = ptX[lo] + dx * f; _z = ptZ[lo] + dz * f; _nx = -dz / dl; _nz = dx / dl;
    }
    const k = e * 2, L = len[e];
    let h = HW[e];
    if (taper[k] > 0 && s < taper[k]) h -= (HW[e] - hwNode[k]) * (1 - s / taper[k]);
    if (taper[k + 1] > 0 && L - s < taper[k + 1]) h -= (HW[e] - hwNode[k + 1]) * (1 - (L - s) / taper[k + 1]);
    _hw = h;
  }
  // Move s onto a polyline vertex when it is within 3 cm of one, so stations never nearly coincide.
  function snap(e, s) {
    const p0 = edgePt[e], p1 = edgePt[e + 1] - 1, L = len[e];
    if (s <= 0.03) return 0;
    if (s >= L - 0.03) return L;
    let lo = p0, hi = p1;
    while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (ptS[mid] <= s) lo = mid; else hi = mid; }
    if (s - ptS[lo] < 0.03) return ptS[lo];
    if (ptS[hi] - s < 0.03) return ptS[hi];
    return s;
  }

  // ---- junction corners ---------------------------------------------------------------------------
  // For every corner between two neighbouring arms of a junction: where the kerb leaves each arm
  // (as s on that edge) and the control point of the curve that joins the two.
  const pavS = new Float64Array(E * 4);          // [e*4 + end*2 + side]  side 0 = left of a -> b, 1 = right
  const JS = new Float64Array(E * 2);            // end of the junction zone on the edge
  const trS = new Float64Array(E * 2);           // trim, as s
  const blockedSide = new Uint8Array(E * 4);
  const nodeCorner = new Int32Array(N + 1);
  for (let e = 0; e < E; e++) { pavS[e * 4 + 2] = pavS[e * 4 + 3] = JS[e * 2 + 1] = trS[e * 2 + 1] = len[e]; }
  let nCorners = 0;
  for (let n = 0; n < N; n++) { nodeCorner[n] = nCorners; if (armsN(n) >= 3) nCorners += armsN(n); }
  nodeCorner[N] = nCorners;
  const cornX = new Float64Array(nCorners), cornZ = new Float64Array(nCorners), cornBlocked = new Uint8Array(nCorners);
  const capU = (e, end) => {
    const o = end ? edgeA[e] : edgeB[e], L = len[e];
    return armsN(o) >= 3 ? L * 0.5 - 0.02 : Math.max(L * 0.5, L - 0.5);
  };
  let q_x = 0, q_z = 0, q_tx = 0, q_tz = 0, q_s = 0;
  // Point on one side of an arm at distance u from its node. sgOut +1 = right when looking away
  // from the node. Also the unit tangent pointing away from the node.
  function sideAt(e, end, u, sgOut) {
    const s = snap(e, end ? len[e] - u : u);
    calc(e, s);
    const sg = end === 0 ? sgOut : -sgOut, nl = Math.hypot(_nx, _nz) || 1;
    q_x = _x + _nx * _hw * sg; q_z = _z + _nz * _hw * sg; q_s = s;
    q_tx = _nz / nl; q_tz = -_nx / nl;
    if (end) { q_tx = -q_tx; q_tz = -q_tz; }
  }
  const RAD = [3, 3, 3.5, 4.5, 6, 7, 8];
  for (let n = 0; n < N; n++) {
    const arms = net.arms[n], k = arms.length;
    if (k < 3) continue;
    for (const a of arms) {
      const tr = Math.min(net.trim[a.e * 2 + a.end], capU(a.e, a.end));
      trS[a.e * 2 + a.end] = snap(a.e, a.end ? len[a.e] - tr : tr);
    }
    for (let i = 0; i < k; i++) {
      const ai = arms[i], aj = arms[(i + 1) % k], ei = ai.e, ej = aj.e, ci = nodeCorner[n] + i;
      const ti = ai.end ? len[ei] - trS[ei * 2 + 1] : trS[ei * 2], tj = aj.end ? len[ej] - trS[ej * 2 + 1] : trS[ej * 2];
      const capI = capU(ei, ai.end), capJ = capU(ej, aj.end);
      let phi = aj.h - ai.h;
      if (i === k - 1) phi += 2 * Math.PI;
      sideAt(ei, ai.end, ti, 1);
      const ax = q_x, az = q_z, tax = q_tx, taz = q_tz;
      sideAt(ej, aj.end, tj, -1);
      const bx = q_x, bz = q_z, tbx = q_tx, tbz = q_tz;
      let ui = ti, uj = tj, blocked = false, convex = false;
      const det = -tax * tbz + tbx * taz;
      if (phi < 0.2) { blocked = true; ui = Math.min(capI, Math.max(ti, 25)); uj = Math.min(capJ, Math.max(tj, 25)); }
      else if (phi < Math.PI - 0.12) {
        const tl = Math.min(10, RAD[Math.max(rank[ei], rank[ej])] / Math.tan(phi / 2));
        if (Math.abs(det) < 0.05) { blocked = true; }
        else {
          const dx = bx - ax, dz = bz - az;
          const di = ti + (-dx * tbz + tbx * dz) / det, dj = tj + (tax * dz - taz * dx) / det;
          if (di > capI - 0.5 || dj > capJ - 0.5) blocked = true;
          else { convex = true; ui = Math.min(Math.max(di + tl, 0.4), capI); uj = Math.min(Math.max(dj + tl, 0.4), capJ); }
          if (blocked) { ui = di > capI - 0.5 ? capI : Math.min(capI, Math.max(ti, di + tl)); uj = dj > capJ - 0.5 ? capJ : Math.min(capJ, Math.max(tj, dj + tl)); }
        }
      }
      sideAt(ei, ai.end, ui, 1);
      const p0x = q_x, p0z = q_z, t0x = q_tx, t0z = q_tz, si = q_s;
      sideAt(ej, aj.end, uj, -1);
      const p2x = q_x, p2z = q_z, t2x = q_tx, t2z = q_tz, sj = q_s;
      cornX[ci] = NaN; cornZ[ci] = NaN;
      if (!blocked) {
        const d2 = -t0x * t2z + t2x * t0z;
        if (Math.abs(d2) > 0.05) {
          const dx = p2x - p0x, dz = p2z - p0z;
          const al = (-dx * t2z + t2x * dz) / d2, be = (t0x * dz - t0z * dx) / d2;
          const lim = convex ? 40 : 4 * Math.hypot(dx, dz) + 2;
          if (al < -0.05 && be < -0.05 && al > -lim && be > -lim) { cornX[ci] = p0x + t0x * al; cornZ[ci] = p0z + t0z * al; }
        }
      }
      cornBlocked[ci] = blocked ? 1 : 0;
      const ki = ei * 4 + ai.end * 2 + (ai.end === 0 ? 1 : 0), kj = ej * 4 + aj.end * 2 + (aj.end === 0 ? 0 : 1);
      pavS[ki] = si; pavS[kj] = sj;
      blockedSide[ki] = blockedSide[kj] = blocked ? 1 : 0;
    }
  }
  for (let e = 0; e < E; e++) {
    if (armsN(edgeA[e]) >= 3) JS[e * 2] = Math.max(trS[e * 2], pavS[e * 4], pavS[e * 4 + 1]);
    if (armsN(edgeB[e]) >= 3) JS[e * 2 + 1] = Math.min(trS[e * 2 + 1], pavS[e * 4 + 2], pavS[e * 4 + 3]);
  }

  // ---- search grids ---------------------------------------------------------------------------------
  const gi = (v) => { const i = Math.floor((v + HALF + 120) / GRID); return i < 0 ? 0 : i >= GN ? GN - 1 : i; };
  function makeGrid(count, bounds) {                              // bounds(i, out) -> false to skip
    const start = new Int32Array(GN * GN + 1), bb = [0, 0, 0, 0];
    for (let pass = 0; pass < 2; pass++) {
      for (let i = 0; i < count; i++) {
        if (!bounds(i, bb)) continue;
        const x0 = gi(bb[0]), x1 = gi(bb[2]), z0 = gi(bb[1]), z1 = gi(bb[3]);
        for (let gz = z0; gz <= z1; gz++) for (let gx = x0; gx <= x1; gx++) {
          if (pass === 0) start[gz * GN + gx + 1]++; else items[fill[gz * GN + gx]++] = i;
        }
      }
      if (pass === 0) { for (let c = 0; c < GN * GN; c++) start[c + 1] += start[c]; var items = new Int32Array(start[GN * GN]), fill = start.slice(0, GN * GN); }
    }
    return { start, items };
  }
  const roadGrid = makeGrid(P, (p, bb) => {
    if (p + 1 >= P || segEdge[p + 1] !== segEdge[p]) return false;
    bb[0] = Math.min(ptX[p], ptX[p + 1]); bb[2] = Math.max(ptX[p], ptX[p + 1]);
    bb[1] = Math.min(ptZ[p], ptZ[p + 1]); bb[3] = Math.max(ptZ[p], ptZ[p + 1]);
    return true;
  });

  // ---- tracks -----------------------------------------------------------------------------------
  // Tram and railway polylines resampled to short pieces, each piece classed as embedded in a
  // carriageway or open. Flags: 1 embedded, 2 railway, 4 grass bed, 8 sett bed, 16 last point.
  const tk = (() => {
    const X = [], Z = [], S = [], F = [];
    const add = (src, kind) => {
      for (let i = 0; i + 1 < src.pt.length; i++) {
        let s = 0, first = true;
        for (let p = src.pt[i]; p < src.pt[i + 1]; p++) {
          const x = src.x[p], z = src.z[p];
          if (!first) {
            const lx = X[X.length - 1], lz = Z[Z.length - 1], d = Math.hypot(x - lx, z - lz);
            if (d < 0.1) continue;
            const m = Math.ceil(d / 8);
            for (let j = 1; j <= m; j++) { X.push(lx + ((x - lx) * j) / m); Z.push(lz + ((z - lz) * j) / m); S.push(s + (d * j) / m); F.push(kind); }
            s += d;
          } else { X.push(x); Z.push(z); S.push(0); F.push(kind); first = false; }
        }
        if (!first) F[F.length - 1] |= 16;
      }
    };
    if (net.tram) add(net.tram, 0);
    if (net.rail) add(net.rail, 2);
    const n = X.length;
    const t = { n, x: Float32Array.from(X), z: Float32Array.from(Z), s: Float32Array.from(S), f: Uint8Array.from(F), nx: new Float32Array(n), nz: new Float32Array(n), wl: new Float32Array(n), wr: new Float32Array(n) };
    for (let i = 0; i < n; i++) {
      const hasPrev = i > 0 && !(t.f[i - 1] & 16), hasNext = !(t.f[i] & 16);
      let ax = 0, az = 0, bx = 0, bz = 0;
      if (hasPrev) { const l = Math.hypot(t.x[i] - t.x[i - 1], t.z[i] - t.z[i - 1]) || 1; ax = (t.x[i] - t.x[i - 1]) / l; az = (t.z[i] - t.z[i - 1]) / l; }
      if (hasNext) { const l = Math.hypot(t.x[i + 1] - t.x[i], t.z[i + 1] - t.z[i]) || 1; bx = (t.x[i + 1] - t.x[i]) / l; bz = (t.z[i + 1] - t.z[i]) / l; }
      if (!hasPrev) { ax = bx; az = bz; }
      if (!hasNext) { bx = ax; bz = az; }
      let nx = -az - bz, nz = ax + bx;
      const l = Math.hypot(nx, nz);
      if (l < 0.2) { nx = -bz; nz = bx; } else { nx /= l; nz /= l; const c = Math.max(0.5, nx * -bz + nz * bx); nx /= c; nz /= c; }
      t.nx[i] = nx; t.nz[i] = nz;
    }
    return t;
  })();
  const cover = ground && ground.buf && ground.buf.cover, cRes = ground ? ground.meta.res : 3, cSize = ground ? ground.meta.size : 0;
  const greenClass = new Uint8Array(32);
  if (ground) ground.meta.cover.forEach((name, i) => { if (['grass', 'wood', 'garden', 'field', 'yard'].includes(name)) greenClass[i] = 1; });
  const coverAt = (x, z) => {
    if (!cover) return 0;
    const c = Math.floor((x + HALF) / cRes), r = Math.floor((z + HALF) / cRes);
    return c < 0 || r < 0 || c >= cSize || r >= cSize ? 0 : cover[r * cSize + c];
  };
  for (let i = 0; i < tk.n; i++) {
    if (tk.f[i] & 16) continue;
    const mx = (tk.x[i] + tk.x[i + 1]) / 2, mz = (tk.z[i] + tk.z[i + 1]) / 2, rail = tk.f[i] & 2;
    const m = rail ? 0.3 : 1.5;
    const hm = net.onRoad(mx, mz, m);
    const hit = hm || (net.onRoad(tk.x[i], tk.z[i], m) && net.onRoad(tk.x[i + 1], tk.z[i + 1], m));
    if (hit) { tk.f[i] |= 1; if (!rail && hm && rank[hm.e] <= 3) tk.f[i] |= 8; }
    else if (!rail && greenClass[coverAt(mx, mz)]) tk.f[i] |= 4;
  }
  const trackGrid = makeGrid(tk.n, (i, bb) => {
    if (tk.f[i] & 16) return false;
    bb[0] = Math.min(tk.x[i], tk.x[i + 1]); bb[2] = Math.max(tk.x[i], tk.x[i + 1]);
    bb[1] = Math.min(tk.z[i], tk.z[i + 1]); bb[3] = Math.max(tk.z[i], tk.z[i + 1]);
    return true;
  });
  // Open tram tracks: how far the bed reaches on each side. Next to a parallel track it stops
  // half way, so two tracks share one bed instead of leaving a strip of bare ground between them.
  for (let i = 0; i < tk.n; i++) {
    if (tk.f[i] & 19) continue;                                   // embedded, railway or last point
    const mx = (tk.x[i] + tk.x[i + 1]) / 2, mz = (tk.z[i] + tk.z[i + 1]) / 2;
    const l = Math.hypot(tk.x[i + 1] - tk.x[i], tk.z[i + 1] - tk.z[i]) || 1, tx = (tk.x[i + 1] - tk.x[i]) / l, tz = (tk.z[i + 1] - tk.z[i]) / l;
    let nl = 0, nr = 0;
    const x0 = gi(mx - 5), x1 = gi(mx + 5), z0 = gi(mz - 5), z1 = gi(mz + 5);
    for (let gz = z0; gz <= z1; gz++) for (let gx = x0; gx <= x1; gx++) {
      const c = gz * GN + gx;
      for (let q = trackGrid.start[c]; q < trackGrid.start[c + 1]; q++) {
        const j = trackGrid.items[q];
        if (j === i || (tk.f[j] & 3)) continue;
        const vx = tk.x[j + 1] - tk.x[j], vz = tk.z[j + 1] - tk.z[j], L2 = vx * vx + vz * vz || 1;
        if (Math.abs(vx * tx + vz * tz) / Math.sqrt(L2) < 0.85) continue;
        let f = ((mx - tk.x[j]) * vx + (mz - tk.z[j]) * vz) / L2;
        f = f < 0 ? 0 : f > 1 ? 1 : f;
        const dx = tk.x[j] + vx * f - mx, dz = tk.z[j] + vz * f - mz;
        const lat = dx * -tz + dz * tx, alo = dx * tx + dz * tz;
        if (Math.abs(alo) > 1.5 || Math.abs(lat) < 1.5 || Math.abs(lat) > 4.6) continue;
        if (lat > 0) { if (!nr || lat < nr) nr = lat; } else if (!nl || -lat < nl) nl = -lat;
      }
    }
    tk.wl[i] = nl; tk.wr[i] = nr;
  }

  // ---- which pavement goes where -------------------------------------------------------------------
  const junctionsIn = new Float32Array(CHUNKS * CHUNKS);
  for (let n = 0; n < N; n++) {
    const arms = net.arms[n];
    if (arms.length < 3) continue;
    let real = 0;
    for (const a of arms) if (rank[a.e] >= 2) real++;
    if (real >= 3) junctionsIn[chunkOf(net.nodeX[n], net.nodeZ[n]).id]++;
  }
  // "Dense city" = many real street corners around: there the pavements are the Prague mosaic.
  const dense = new Uint8Array(CHUNKS * CHUNKS);
  for (let cz = 0; cz < CHUNKS; cz++) for (let cx = 0; cx < CHUNKS; cx++) {
    let sum = 0, cnt = 0;
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
      const x = cx + dx, z = cz + dz;
      if (x < 0 || z < 0 || x >= CHUNKS || z >= CHUNKS) continue;
      sum += junctionsIn[z * CHUNKS + x]; cnt++;
    }
    dense[cz * CHUNKS + cx] = sum / cnt >= 4.5 ? 1 : 0;
  }
  const NOPAV = FLAG.BRIDGE | FLAG.TUNNEL | FLAG.LINK;
  const edgeChunk = new Int32Array(E), pavLayer = new Uint8Array(E);
  for (let e = 0; e < E; e++) {
    const m = net.pos(e, len[e] / 2);
    edgeChunk[e] = chunkOf(m.x, m.z).id;
    pavLayer[e] = rank[e] >= 2 && rank[e] <= 3 && dense[edgeChunk[e]] ? L_MOSAIC : L_PAVING;
  }
  // 1 = raised pavement, 0 = flush edge strip.
  const pavKind = (e, side) => {
    if (rank[e] < 1 || rank[e] >= 6 || (flags[e] & NOPAV) || net.speedKmh[e] >= 70) return 0;
    if ((flags[e] & FLAG.ROUNDABOUT) && side === 0) return 0;     // the island is on the left
    return 1;
  };

  // Stretches of each side of an edge where the pavement must give way: another carriageway runs
  // alongside too closely, a road crosses without a junction (bridges in a flat world), or a
  // track runs through. Soft cuts still get the flush edge strip, hard cuts get nothing.
  function cutsOf(e) {
    const soft = [[], []], hard = [[], []];
    const L = len[e], hw = HW[e], p0 = edgePt[e], p1 = edgePt[e + 1] - 1;
    const n = Math.max(2, Math.ceil(L / 8)), half = L / n / 2;
    for (let i = 0; i < n; i++) {
      const s = (i + 0.5) * (L / n);
      calc(e, s);
      const x = _x, z = _z, nl = Math.hypot(_nx, _nz) || 1, nx = _nx / nl, nz = _nz / nl, tx = nz, tz = -nx, R = hw + 14;
      const x0 = gi(x - R), x1 = gi(x + R), z0 = gi(z - R), z1 = gi(z + R);
      for (let gz = z0; gz <= z1; gz++) for (let gx = x0; gx <= x1; gx++) {
        const c = gz * GN + gx;
        for (let q = roadGrid.start[c]; q < roadGrid.start[c + 1]; q++) {
          const p = roadGrid.items[q], f = segEdge[p];
          if (f === e) continue;
          const vx = ptX[p + 1] - ptX[p], vz = ptZ[p + 1] - ptZ[p], L2 = vx * vx + vz * vz;
          if (L2 < 1e-6 || Math.abs(vx * tx + vz * tz) < 0.7 * Math.sqrt(L2)) continue;
          let t = ((x - ptX[p]) * vx + (z - ptZ[p]) * vz) / L2;
          t = t < 0 ? 0 : t > 1 ? 1 : t;
          const dx = ptX[p] + vx * t - x, dz = ptZ[p] + vz * t - z;
          const lat = dx * nx + dz * nz, alo = dx * tx + dz * tz, al = Math.abs(lat);
          if (al < 1 || Math.abs(alo) > 0.5 * al + 0.5) continue;
          const gap = al - hw - HW[f];
          if (gap >= (rank[e] >= 3 && rank[f] >= 3 ? 5 : PW + 0.3)) continue;
          (gap < 0.3 ? hard : soft)[lat > 0 ? 1 : 0].push(s - half - 0.5, s + half + 0.5);
        }
      }
    }
    for (let p = p0; p < p1; p++) {
      const ax = ptX[p], az = ptZ[p], ux = ptX[p + 1] - ax, uz = ptZ[p + 1] - az, ul = Math.hypot(ux, uz);
      if (ul < 1e-3) continue;
      const pad = hw + PW + 3;
      const x0 = gi(Math.min(ax, ax + ux) - pad), x1 = gi(Math.max(ax, ax + ux) + pad), z0 = gi(Math.min(az, az + uz) - pad), z1 = gi(Math.max(az, az + uz) + pad);
      for (let gz = z0; gz <= z1; gz++) for (let gx = x0; gx <= x1; gx++) {
        const c = gz * GN + gx;
        // Roads that cross this segment without sharing a node with the edge.
        for (let q = roadGrid.start[c]; q < roadGrid.start[c + 1]; q++) {
          const r = roadGrid.items[q], f = segEdge[r];
          if (f === e || edgeA[f] === edgeA[e] || edgeA[f] === edgeB[e] || edgeB[f] === edgeA[e] || edgeB[f] === edgeB[e]) continue;
          const vx = ptX[r + 1] - ptX[r], vz = ptZ[r + 1] - ptZ[r], den = ux * vz - uz * vx;
          if (Math.abs(den) < 1e-6) continue;
          const wx = ptX[r] - ax, wz = ptZ[r] - az, t = (wx * vz - wz * vx) / den, u = (wx * uz - wz * ux) / den;
          if (t < 0 || t > 1 || u < 0 || u > 1) continue;
          const vl = Math.hypot(vx, vz) || 1, sin = Math.abs(den) / (ul * vl), cos = Math.abs(ux * vx + uz * vz) / (ul * vl);
          const g = Math.min(40, (HW[f] + (hw + PW) * cos) / Math.max(0.25, sin) + 0.6), s = ptS[p] + t * ul;
          hard[0].push(s - g, s + g); hard[1].push(s - g, s + g);
        }
        for (let q = trackGrid.start[c]; q < trackGrid.start[c + 1]; q++) {
          const j = trackGrid.items[q], fl = tk.f[j], bh = fl & 1 ? 0.85 : fl & 2 ? 1.75 : 1.3;
          for (let m = 0; m < 3; m++) {
            const px = tk.x[j] + (tk.x[j + 1] - tk.x[j]) * m * 0.5 - ax, pz = tk.z[j] + (tk.z[j + 1] - tk.z[j]) * m * 0.5 - az;
            const al = (px * ux + pz * uz) / ul;
            if (al < -1 || al > ul + 1) continue;
            const d = (px * -uz + pz * ux) / ul, s = ptS[p] + al;
            if (d + bh > hw - 0.1 && d - bh < hw + PW) hard[1].push(s - 2.5, s + 2.5);
            if (-d + bh > hw - 0.1 && -d - bh < hw + PW) hard[0].push(s - 2.5, s + 2.5);
          }
        }
      }
    }
    return { soft, hard };
  }
  const runsCache = new Array(E);
  // -> { r: [runs left, runs right], f: [flush left, flush right] } as interval lists in s.
  function runsOf(e) {
    let R = runsCache[e];
    if (R) return R;
    const cuts = cutsOf(e);
    R = { r: [[], []], f: [[], []] };
    for (let side = 0; side < 2; side++) {
      const a = pavS[e * 4 + side], b = pavS[e * 4 + 2 + side];
      if (b - a < 0.3) continue;
      const hard = mergeIv(cuts.hard[side]);
      if (pavKind(e, side)) {
        const all = mergeIv(cuts.hard[side].concat(cuts.soft[side]));
        const runs = subIv(a, b, all, 1.5);
        for (let i = 0; i < runs.length; i++) runs[i] = snap(e, runs[i]);
        R.r[side] = runs;
        const softOnly = mergeIv(cuts.soft[side]);
        for (let i = 0; i < softOnly.length; i += 2) {
          const part = subIv(Math.max(a, softOnly[i]), Math.min(b, softOnly[i + 1]), hard, 1);
          for (const v of part) R.f[side].push(snap(e, v));
        }
      } else {
        const fl = subIv(a, b, hard, 1);
        for (let i = 0; i < fl.length; i++) fl[i] = snap(e, fl[i]);
        R.f[side] = fl;
      }
    }
    runsCache[e] = R;
    return R;
  }
  // Does the pavement on this side run right up to this end of the edge?
  function touches(e, end, side) {
    const r = runsOf(e).r[side];
    if (!r.length) return false;
    return end ? Math.abs(r[r.length - 1] - pavS[e * 4 + 2 + side]) < 1e-6 : Math.abs(r[0] - pavS[e * 4 + side]) < 1e-6;
  }

  // ---- chunk index ----------------------------------------------------------------------------------
  const NC = CHUNKS * CHUNKS;
  function csr(count, chunkOfItem) {
    const start = new Int32Array(NC + 1);
    for (let i = 0; i < count; i++) { const c = chunkOfItem(i); if (c >= 0) start[c + 1]++; }
    for (let c = 0; c < NC; c++) start[c + 1] += start[c];
    const items = new Int32Array(start[NC]), fill = start.slice(0, NC);
    for (let i = 0; i < count; i++) { const c = chunkOfItem(i); if (c >= 0) items[fill[c]++] = i; }
    return { start, items };
  }
  const idxEdges = csr(E, (e) => edgeChunk[e]);
  const idxNodes = csr(N, (n) => (armsN(n) >= 3 ? chunkOf(net.nodeX[n], net.nodeZ[n]).id : -1));
  const idxTracks = csr(tk.n, (i) => (tk.f[i] & 16 ? -1 : chunkOf((tk.x[i] + tk.x[i + 1]) / 2, (tk.z[i] + tk.z[i + 1]) / 2).id));
  const bumpsOn = new Map();
  for (const b of net.bumps || []) { if (!bumpsOn.has(b.e)) bumpsOn.set(b.e, []); bumpsOn.get(b.e).push(b.s); }

  // ---- output buffers and the low-level emitters ----------------------------------------------------
  const B0 = new Buf(16384), B1 = new Buf(4096), B2 = new Buf(8192), B3 = new Buf(512);
  let ox = 0, oz = 0;
  function vx(B, x, y, z, nx, ny, nz, u, v, w, ci) {
    const i = B.nv++, j = i * 3;
    B.pos[j] = x - ox; B.pos[j + 1] = y; B.pos[j + 2] = z - oz;
    B.nrm[j] = nx * 127; B.nrm[j + 1] = ny * 127; B.nrm[j + 2] = nz * 127;
    B.uv[j] = u; B.uv[j + 1] = v; B.uv[j + 2] = w;
    B.col[j] = PR[ci]; B.col[j + 1] = PG[ci]; B.col[j + 2] = PB[ci];
    return i;
  }
  const sv = (B, x, y, z, L, ci) => vx(B, x, y, z, 0, 1, 0, x * IM[L] - UO[L], z * IM[L] - VO[L], L, ci);
  // Triangle of already emitted flat vertices, wound to face up whatever order it comes in.
  function up(B, a, b, c) {
    const P3 = B.pos, i = a * 3, j = b * 3, k = c * 3;
    const cr = (P3[j + 2] - P3[i + 2]) * (P3[k] - P3[i]) - (P3[j] - P3[i]) * (P3[k + 2] - P3[i + 2]);
    const o = B.ni;
    B.idx[o] = a;
    if (cr >= 0) { B.idx[o + 1] = b; B.idx[o + 2] = c; } else { B.idx[o + 1] = c; B.idx[o + 2] = b; }
    B.ni = o + 3;
  }
  // Flat quad, corners in ring order.
  function fq(B, x0, z0, y0, x1, z1, y1, x2, z2, y2, x3, z3, y3, L, ci) {
    B.need(4, 6);
    const a = sv(B, x0, y0, z0, L, ci), b = sv(B, x1, y1, z1, L, ci), c = sv(B, x2, y2, z2, L, ci), d = sv(B, x3, y3, z3, L, ci);
    up(B, a, b, c); up(B, a, c, d);
  }
  function ft(B, x0, z0, x1, z1, x2, z2, y, L, ci) {
    B.need(3, 3);
    up(B, sv(B, x0, y, z0, L, ci), sv(B, x1, y, z1, L, ci), sv(B, x2, y, z2, L, ci));
  }
  // Upright quad between two ground points, facing (fx, fz).
  function wq(B, x0, z0, b0, t0, x1, z1, b1, t1, fx, fz, L, ci) {
    if (t0 - b0 < 0.004 && t1 - b1 < 0.004) return;
    B.need(4, 6);
    const fl = Math.hypot(fx, fz) || 1;
    fx /= fl; fz /= fl;
    const u0 = ((x0 - ox) * -fz + (z0 - oz) * fx) * IM[L], u1 = ((x1 - ox) * -fz + (z1 - oz) * fx) * IM[L];
    const a = vx(B, x0, b0, z0, fx, 0, fz, u0, b0 * IM[L], L, ci), b = vx(B, x1, b1, z1, fx, 0, fz, u1, b1 * IM[L], L, ci);
    const c = vx(B, x1, t1, z1, fx, 0, fz, u1, t1 * IM[L], L, ci), d = vx(B, x0, t0, z0, fx, 0, fz, u0, t0 * IM[L], L, ci);
    const o = B.ni, I = B.idx;
    if (-(z1 - z0) * fx + (x1 - x0) * fz >= 0) { I[o] = a; I[o + 1] = b; I[o + 2] = c; I[o + 3] = a; I[o + 4] = c; I[o + 5] = d; }
    else { I[o] = a; I[o + 1] = c; I[o + 2] = b; I[o + 3] = a; I[o + 4] = d; I[o + 5] = c; }
    B.ni = o + 6;
  }
  // Paint: flat quad in the markings buffer, with texture coordinates for the wear pattern.
  function mq(x0, z0, y0, x1, z1, y1, x2, z2, y2, x3, z3, y3, ci) {
    const B = B2;
    B.need(4, 6);
    const k = 1 / 1.7;
    const a = vx(B, x0, y0, z0, 0, 1, 0, (x0 - ox) * k, (z0 - oz) * k, 0, ci), b = vx(B, x1, y1, z1, 0, 1, 0, (x1 - ox) * k, (z1 - oz) * k, 0, ci);
    const c = vx(B, x2, y2, z2, 0, 1, 0, (x2 - ox) * k, (z2 - oz) * k, 0, ci), d = vx(B, x3, y3, z3, 0, 1, 0, (x3 - ox) * k, (z3 - oz) * k, 0, ci);
    up(B, a, b, c); up(B, a, c, d);
  }

  // ---- stations -------------------------------------------------------------------------------------
  let tmpS = new Float64Array(512);
  function stations(e, sl, ex, nex) {
    const p0 = edgePt[e], p1 = edgePt[e + 1], L = len[e], k = e * 2;
    if (p1 - p0 + nex + 16 > tmpS.length) tmpS = new Float64Array((p1 - p0 + nex + 16) * 2);
    let n = 0;
    for (let p = p0; p < p1; p++) tmpS[n++] = ptS[p];
    const add = (s) => { if (s > 0 && s < L) tmpS[n++] = s; };
    add(JS[k]); add(JS[k + 1]); add(trS[k]); add(trS[k + 1]);
    add(pavS[e * 4]); add(pavS[e * 4 + 1]); add(pavS[e * 4 + 2]); add(pavS[e * 4 + 3]);
    if (taper[k] > 0) add(snap(e, taper[k]));
    if (taper[k + 1] > 0) add(snap(e, L - taper[k + 1]));
    for (let i = 0; i < nex; i++) add(snap(e, ex[i]));
    const arr = tmpS.subarray(0, n).sort();
    if (n > sl.cap) growSlot(sl, n);
    let m = 0;
    for (let i = 0; i < n; i++) {
      const s = arr[i];
      if (m && s - sl.s[m - 1] < 1e-9) continue;
      calc(e, s);
      sl.s[m] = s; sl.x[m] = _x; sl.z[m] = _z; sl.nx[m] = _nx; sl.nz[m] = _nz; sl.hw[m] = _hw; sl.kh[m] = KH;
      m++;
    }
    sl.n = m;
  }
  // Index of the station at exactly s (stations always include the values asked for).
  function at(sl, s) {
    let lo = 0, hi = sl.n - 1;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (sl.s[mid] < s - 1e-9) lo = mid + 1; else hi = mid; }
    return lo;
  }
  // Point at any s and offset o to the right of the centre line, between stations.
  let _px = 0, _pz = 0, _tx = 0, _tz = 0;
  function ptAt(sl, s, o) {
    let lo = 0, hi = sl.n - 1;
    while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (sl.s[mid] <= s) lo = mid; else hi = mid; }
    const d = sl.s[hi] - sl.s[lo], f = d > 1e-9 ? Math.min(1, Math.max(0, (s - sl.s[lo]) / d)) : 0;
    const ax = sl.x[lo] + sl.nx[lo] * o, az = sl.z[lo] + sl.nz[lo] * o, bx = sl.x[hi] + sl.nx[hi] * o, bz = sl.z[hi] + sl.nz[hi] * o;
    _px = ax + (bx - ax) * f; _pz = az + (bz - az) * f;
    const dx = sl.x[hi] - sl.x[lo], dz = sl.z[hi] - sl.z[lo], dl = Math.hypot(dx, dz) || 1;
    _tx = dx / dl; _tz = dz / dl;
  }
  // Carriageway between two stations' s values.
  function ribbon(sl, s0, s1, L) {
    const y = LY[L];
    for (let k = at(sl, s0); k + 1 < sl.n && sl.s[k + 1] <= s1 + 1e-9; k++) {
      const a = sl.hw[k], b = sl.hw[k + 1];
      fq(B0, sl.x[k] - sl.nx[k] * a, sl.z[k] - sl.nz[k] * a, y, sl.x[k] + sl.nx[k] * a, sl.z[k] + sl.nz[k] * a, y,
        sl.x[k + 1] + sl.nx[k + 1] * b, sl.z[k + 1] + sl.nz[k + 1] * b, y, sl.x[k + 1] - sl.nx[k + 1] * b, sl.z[k + 1] - sl.nz[k + 1] * b, y, L, C_WHITE);
    }
  }
  // One cross-section step of kerb face, kerb stone and pavement. (x, z) on the kerb line,
  // (nx, nz) pointing away from the road, h = kerb height at each end.
  function pavStep(x0, z0, nx0, nz0, h0, x1, z1, nx1, nz1, h1, PL) {
    wq(B0, x0, z0, 0, h0, x1, z1, 0, h1, -(nx0 + nx1), -(nz0 + nz1), L_CONCRETE, C_KERB);
    fq(B0, x0, z0, h0, x1, z1, h1, x1 + nx1 * KW, z1 + nz1 * KW, h1, x0 + nx0 * KW, z0 + nz0 * KW, h0, L_CONCRETE, C_KERB);
    fq(B0, x0 + nx0 * KW, z0 + nz0 * KW, h0, x1 + nx1 * KW, z1 + nz1 * KW, h1, x1 + nx1 * PW, z1 + nz1 * PW, KH, x0 + nx0 * PW, z0 + nz0 * PW, KH, PL, C_WHITE);
  }
  // Closes the open end of a pavement: (fx, fz) points out of the end.
  function pavCap(x, z, nx, nz, h, fx, fz) {
    wq(B0, x, z, 0, h, x + nx * PW, z + nz * PW, 0, KH, fx, fz, L_CONCRETE, C_KERB);
  }

  // ---- edges ----------------------------------------------------------------------------------------
  const slotE = mkSlot(), slots = [mkSlot(), mkSlot(), mkSlot(), mkSlot(), mkSlot(), mkSlot(), mkSlot(), mkSlot()];
  const exS = new Float64Array(1024);
  const marked = (kind) => kind === CTRL.SIGNAL || kind === CTRL.STOP || kind === CTRL.GIVE_WAY;

  function buildEdge(e) {
    const L = len[e], k = e * 2, nA = edgeA[e], nB = edgeB[e], kA = armsN(nA), kB = armsN(nB);
    const R = runsOf(e), cross = net.crossingsOn(e), bumps = bumpsOn.get(e);
    const lay = layerOf[e], sl = slotE;
    let nex = 0;
    for (let side = 0; side < 2; side++) { for (const v of R.r[side]) exS[nex++] = v; for (const v of R.f[side]) exS[nex++] = v; }
    const hasPav = R.r[0].length || R.r[1].length;
    if (hasPav) for (const c of cross) { if (nex > 1000) break; exS[nex++] = c.s - 3.2; exS[nex++] = c.s - 2.4; exS[nex++] = c.s + 2.4; exS[nex++] = c.s + 3.2; }
    stations(e, sl, exS, nex);
    if (hasPav && cross.length) {
      for (let i = 0; i < sl.n; i++) for (const c of cross) {
        const d = Math.abs(sl.s[i] - c.s);
        if (d < 3.2) sl.kh[i] = Math.min(sl.kh[i], d <= 2.4 ? 0.025 : 0.025 + ((KH - 0.025) * (d - 2.4)) / 0.8);
      }
    }
    ribbon(sl, JS[k], JS[k + 1], lay);

    // Dead ends: a rounded cap, with the pavement or edge strip carried round it.
    for (let end = 0; end < 2; end++) {
      if ((end ? kB : kA) !== 1) continue;
      const i = end ? sl.n - 1 : 0, cx = sl.x[i], cz = sl.z[i], nx = sl.nx[i], nz = sl.nz[i], hw = sl.hw[i];
      const bx = end ? -nz : nz, bz = end ? nx : -nx;             // straight on past the end
      const ring = touches(e, end, 0) && touches(e, end, 1), fl = !pavKind(e, 0) && !pavKind(e, 1);
      let px = cx - nx * hw, pz = cz - nz * hw, pnx = -nx, pnz = -nz;
      for (let j = 1; j <= 8; j++) {
        const a = (j / 8) * Math.PI, dx = -Math.cos(a) * nx + Math.sin(a) * bx, dz = -Math.cos(a) * nz + Math.sin(a) * bz;
        const qx = cx + dx * hw, qz = cz + dz * hw;
        ft(B0, cx, cz, px, pz, qx, qz, LY[lay], lay, C_WHITE);
        if (ring) pavStep(px, pz, pnx, pnz, KH, qx, qz, dx, dz, KH, pavLayer[e]);
        else if (fl) fq(B1, px - pnx * 0.05, pz - pnz * 0.05, Y_FLUSH, qx - dx * 0.05, qz - dz * 0.05, Y_FLUSH, qx + dx * 0.25, qz + dz * 0.25, Y_FLUSH, px + pnx * 0.25, pz + pnz * 0.25, Y_FLUSH, L_CONCRETE, C_FLUSH);
        px = qx; pz = qz; pnx = dx; pnz = dz;
      }
    }

    // Pavements and flush edges.
    for (let side = 0; side < 2; side++) {
      const sg = side ? 1 : -1, runs = R.r[side], PL = pavLayer[e];
      for (let r = 0; r < runs.length; r += 2) {
        const i0 = at(sl, runs[r]), i1 = at(sl, runs[r + 1]);
        for (let i = i0; i < i1; i++) {
          const a = sl.hw[i] * sg, b = sl.hw[i + 1] * sg;
          pavStep(sl.x[i] + sl.nx[i] * a, sl.z[i] + sl.nz[i] * a, sl.nx[i] * sg, sl.nz[i] * sg, sl.kh[i],
            sl.x[i + 1] + sl.nx[i + 1] * b, sl.z[i + 1] + sl.nz[i + 1] * b, sl.nx[i + 1] * sg, sl.nz[i + 1] * sg, sl.kh[i + 1], PL);
        }
        for (let end = 0; end < 2; end++) {
          const i = end ? i1 : i0, s = sl.s[i];
          let joined = false;
          if (Math.abs(s - pavS[e * 4 + end * 2 + side]) < 1e-6) {
            const kn = end ? kB : kA, n = end ? nB : nA;
            if (kn >= 3) joined = !blockedSide[e * 4 + end * 2 + side];
            else if (kn === 2) { const o = otherArm(n, e, end); joined = touches(o.e, o.end, o.end !== end ? side : 1 - side); }
            else joined = touches(e, end, 1 - side);
          }
          if (joined) continue;
          const a = sl.hw[i] * sg, nl = Math.hypot(sl.nx[i], sl.nz[i]) || 1, d = end ? 1 : -1;
          pavCap(sl.x[i] + sl.nx[i] * a, sl.z[i] + sl.nz[i] * a, sl.nx[i] * sg, sl.nz[i] * sg, sl.kh[i], (sl.nz[i] / nl) * d, (-sl.nx[i] / nl) * d);
        }
      }
      const fls = R.f[side];
      for (let r = 0; r < fls.length; r += 2) {
        const i0 = at(sl, fls[r]), i1 = at(sl, fls[r + 1]);
        for (let i = i0; i < i1; i++) {
          const a = (sl.hw[i] - 0.05) * sg, b = (sl.hw[i + 1] - 0.05) * sg, a2 = (sl.hw[i] + 0.25) * sg, b2 = (sl.hw[i + 1] + 0.25) * sg;
          fq(B1, sl.x[i] + sl.nx[i] * a, sl.z[i] + sl.nz[i] * a, Y_FLUSH, sl.x[i + 1] + sl.nx[i + 1] * b, sl.z[i + 1] + sl.nz[i + 1] * b, Y_FLUSH,
            sl.x[i + 1] + sl.nx[i + 1] * b2, sl.z[i + 1] + sl.nz[i + 1] * b2, Y_FLUSH, sl.x[i] + sl.nx[i] * a2, sl.z[i] + sl.nz[i] * a2, Y_FLUSH, L_CONCRETE, C_FLUSH);
        }
      }
    }
    edgeMarks(e, sl, cross, bumps);
  }

  // ---- markings -------------------------------------------------------------------------------------
  const exM = [];                                                // stretches without lane lines (crossings, humps)
  const zones = [];
  function solid(sl, sa, sb, o, w) {
    if (sb - sa < 0.05) return;
    let lo = 0, hi = sl.n - 1;
    while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (sl.s[mid] <= sa) lo = mid; else hi = mid; }
    ptAt(sl, sa, o - w / 2); let lx = _px, lz = _pz;
    ptAt(sl, sa, o + w / 2); let rx = _px, rz = _pz;
    let k = hi;
    for (;;) {
      const s = k < sl.n && sl.s[k] < sb ? sl.s[k] : sb;
      if (s > sa + 1e-6) {
        ptAt(sl, s, o - w / 2); const ax = _px, az = _pz;
        ptAt(sl, s, o + w / 2);
        mq(lx, lz, Y_MARK, rx, rz, Y_MARK, _px, _pz, Y_MARK, ax, az, Y_MARK, C_PAINT);
        lx = ax; lz = az; rx = _px; rz = _pz;
      }
      if (s >= sb) break;
      k++;
    }
  }
  // A lane line from a to b: dashed 3 m / 6 m, continuous inside `zones`, absent inside exM.
  function line(sl, a, b, o, w, dashed, nz) {
    if (b - a < 1.5) return;
    let p = a;
    for (let i = 0; i <= exM.length; i += 2) {
      const q = i < exM.length ? Math.min(b, exM[i]) : b;
      if (q - p > 0.3) {
        if (!dashed) solid(sl, p, q, o, w);
        else {
          for (let d = a + 3; d < q; d += 9) {
            const d0 = Math.max(d, p), d1 = Math.min(d + 3, q), mid = (d0 + d1) / 2;
            if (d1 - d0 < 0.6) continue;
            let inZone = false;
            for (let z = 0; z < nz; z += 2) if (mid > zones[z] - 1.5 && mid < zones[z + 1] + 1.5) inZone = true;
            if (!inZone) solid(sl, d0, d1, o, w);
          }
          for (let z = 0; z < nz; z += 2) solid(sl, Math.max(zones[z], p), Math.min(zones[z + 1], q), o, w);
        }
      }
      if (i < exM.length) p = Math.max(p, exM[i + 1]);
      if (p >= b) break;
    }
  }
  function decal(cx, cz, dx, dz, w, l, code) {
    const uv = uvOf && uvOf(code);
    if (!uv) return;
    const B = B3;
    B.need(4, 6);
    const rx = -dz * w / 2, rz = dx * w / 2, fx = dx * l / 2, fz = dz * l / 2;
    const a = vx(B, cx - fx - rx, Y_DECAL, cz - fz - rz, 0, 1, 0, uv[0], uv[1], 0, C_PAINT), b = vx(B, cx - fx + rx, Y_DECAL, cz - fz + rz, 0, 1, 0, uv[2], uv[1], 0, C_PAINT);
    const c = vx(B, cx + fx + rx, Y_DECAL, cz + fz + rz, 0, 1, 0, uv[2], uv[3], 0, C_PAINT), d = vx(B, cx + fx - rx, Y_DECAL, cz + fz - rz, 0, 1, 0, uv[0], uv[3], 0, C_PAINT);
    up(B, a, b, c); up(B, a, c, d);
  }

  function edgeMarks(e, sl, cross, bumps) {
    const L = len[e], k = e * 2, hw = HW[e], lf = net.lanesF[e], lb = net.lanesB[e], lw = width[e] / Math.max(1, lf + lb), div = -hw + lb * lw;
    const kA = armsN(edgeA[e]), kB = armsN(edgeB[e]), rk = rank[e];
    const mA = kA >= 3 ? trS[k] + 0.3 : taper[k] > 0 ? taper[k] : kA === 1 ? 1.5 : 0;
    const mB = kB >= 3 ? trS[k + 1] - 0.3 : taper[k + 1] > 0 ? L - taper[k + 1] : kB === 1 ? L - 1.5 : L;
    exM.length = 0;
    for (const c of cross) exM.push(c.s - 2.4, c.s + 2.4);
    if (bumps) for (const s of bumps) exM.push(s - 2, s + 2);
    if (exM.length > 2) { const m = mergeIv(exM); exM.length = 0; for (const v of m) exM.push(v); }
    const fw = net.linesOn(e, 1), bw = net.linesOn(e, -1);
    let lastF = null, lastB = null;
    for (const l of fw) if (marked(l.kind)) lastF = l;
    for (const l of bw) if (marked(l.kind)) lastB = l;
    const endF = lastF && mB - lastF.s < 30 ? lastF.s - 0.25 : mB, startB = lastB && lastB.s - mA < 30 ? lastB.s + 0.25 : mA;

    if (rk >= 2 && !net.living[e] && mB - mA > 2) {
      if (lf > 0 && lb > 0 && !(flags[e] & FLAG.NARROW)) {
        let nz = 0;
        if (rk >= 3) {
          for (const l of fw) if (marked(l.kind)) { zones[nz++] = l.s - 20; zones[nz++] = l.s - 0.25; }
          for (const l of bw) if (marked(l.kind)) { zones[nz++] = l.s + 0.25; zones[nz++] = l.s + 20; }
        }
        if (lf >= 2 && lb >= 2) { line(sl, startB, endF, div - 0.14, 0.13, false, 0); line(sl, startB, endF, div + 0.14, 0.13, false, 0); }
        else line(sl, startB, endF, div, 0.14, true, nz);
      }
      let nz = 0;
      for (const l of fw) if (l.kind === CTRL.SIGNAL) { zones[nz++] = l.s - 20; zones[nz++] = l.s - 0.25; }
      for (let i = 1; i < lf; i++) line(sl, mA, endF, div + i * lw, 0.14, true, nz);
      nz = 0;
      for (const l of bw) if (l.kind === CTRL.SIGNAL) { zones[nz++] = l.s + 0.25; zones[nz++] = l.s + 20; }
      for (let i = 1; i < lb; i++) line(sl, startB, mB, div - i * lw, 0.14, true, nz);
      if (rk >= 4) { line(sl, mA, mB, -hw + 0.25, 0.14, false, 0); line(sl, mA, mB, hw - 0.25, 0.14, false, 0); }
    }

    // Stop lines and give-way lines, across the lanes of the arriving direction only.
    for (let d = 0; d < 2; d++) {
      const dir = d ? -1 : 1, ls = d ? bw : fw;
      const oL = dir > 0 ? (lb > 0 ? div + 0.1 : -hw + 0.15) : -hw + 0.15, oR = dir > 0 ? hw - 0.15 : (lf > 0 ? div - 0.1 : hw - 0.15);
      if (oR - oL < 1) continue;
      for (const l of ls) {
        if (!marked(l.kind) || l.s < 0.3 || l.s > L - 0.3) continue;
        let inZebra = false;
        for (const c of cross) if (Math.abs(c.s - l.s) < 2.3) inZebra = true;
        if (inZebra) continue;
        const s0 = Math.max(0, l.s - 0.25), s1 = Math.min(L, l.s + 0.25);
        if (l.kind === CTRL.GIVE_WAY) {
          for (let o = oL + 0.1; o + 0.5 <= oR + 0.01; o += 1) {
            ptAt(sl, s0, o); const ax = _px, az = _pz; ptAt(sl, s0, o + 0.5); const bx = _px, bz = _pz;
            ptAt(sl, s1, o + 0.5); const cx = _px, cz = _pz; ptAt(sl, s1, o);
            mq(ax, az, Y_MARK, bx, bz, Y_MARK, cx, cz, Y_MARK, _px, _pz, Y_MARK, C_PAINT);
          }
        } else {
          ptAt(sl, s0, oL); const ax = _px, az = _pz; ptAt(sl, s0, oR); const bx = _px, bz = _pz;
          ptAt(sl, s1, oR); const cx = _px, cz = _pz; ptAt(sl, s1, oL);
          mq(ax, az, Y_MARK, bx, bz, Y_MARK, cx, cz, Y_MARK, _px, _pz, Y_MARK, C_PAINT);
        }
      }
      // Lane arrows before the last line of this direction.
      const masks = net.turnLanes && net.turnLanes[e] && net.turnLanes[e][d];
      if (masks && uvOf) {
        const last = d ? lastB : lastF, ref = last ? last.s : dir > 0 ? mB : mA, room = dir > 0 ? ref - mA : mB - ref;
        for (const back of [12, 38]) {
          if (room < back + 4) break;
          const s = ref - dir * back;
          for (let i = 0; i < masks.length; i++) {
            const codes = ARROW_OF[masks[i] & 7];
            if (!codes) continue;
            ptAt(sl, s, net.laneOffset(e, dir, i));
            for (const code of codes) decal(_px, _pz, _tx * dir, _tz * dir, Math.min(ARROW_W[code], lw - 0.5), 5, code);
          }
        }
      }
    }

    // Zebra crossings: stripes along the direction of travel, across the whole carriageway.
    for (const c of cross) {
      const a = Math.max(0.2, c.s - 2), b = Math.min(L - 0.2, c.s + 2);
      if (b - a < 1) continue;
      ptAt(sl, c.s, 0);
      const cx = _px - _tx * (c.s - a), cz = _pz - _tz * (c.s - a), tx = _tx * (b - a), tz = _tz * (b - a), nx = -_tz, nz = _tx;
      const W = width[e], cnt = Math.max(1, Math.floor(W - 0.1 + 0.5)), o0 = -(cnt - 0.5) / 2;
      for (let i = 0; i < cnt; i++) {
        const o = o0 + i, x0 = cx + nx * o, z0 = cz + nz * o, x1 = cx + nx * (o + 0.5), z1 = cz + nz * (o + 0.5);
        mq(x0, z0, Y_MARK, x1, z1, Y_MARK, x1 + tx, z1 + tz, Y_MARK, x0 + tx, z0 + tz, Y_MARK, C_PAINT);
      }
    }

    // Speed humps: a low hump across the road with white and yellow teeth on both ramps.
    if (bumps) for (const s of bumps) {
      if (s < 2.2 || s > L - 2.2) continue;
      ptAt(sl, s, 0);
      const cx = _px, cz = _pz, tx = _tx, tz = _tz, nx = -_tz, nz = _tx, h = 0.07, w = hw - 0.05;
      const prof = [-1.8, 0, -0.8, h, 0.8, h, 1.8, 0];
      for (let i = 0; i < 3; i++) {
        const a = prof[i * 2], ya = prof[i * 2 + 1], b = prof[i * 2 + 2], yb = prof[i * 2 + 3];
        fq(B1, cx + tx * a - nx * w, cz + tz * a - nz * w, ya, cx + tx * a + nx * w, cz + tz * a + nz * w, ya,
          cx + tx * b + nx * w, cz + tz * b + nz * w, yb, cx + tx * b - nx * w, cz + tz * b - nz * w, yb, L_ASPHALT, C_HUMP);
      }
      for (const sg of [-1, 1]) {
        let i = 0;
        for (let o = -w + 0.2; o + 0.6 <= w; o += 0.9, i++) {
          const bx = cx + tx * 1.75 * sg, bz = cz + tz * 1.75 * sg, ax = cx + tx * 0.85 * sg, az = cz + tz * 0.85 * sg;
          B2.need(3, 3);
          const kk = 1 / 1.7, ci = i & 1 ? C_YELLOW : C_PAINT;
          const v0 = vx(B2, bx + nx * o, 0.02, bz + nz * o, 0, 1, 0, (bx + nx * o - ox) * kk, (bz + nz * o - oz) * kk, 0, ci);
          const v1 = vx(B2, bx + nx * (o + 0.6), 0.02, bz + nz * (o + 0.6), 0, 1, 0, (bx + nx * (o + 0.6) - ox) * kk, (bz + nz * (o + 0.6) - oz) * kk, 0, ci);
          const v2 = vx(B2, ax + nx * (o + 0.3), h + 0.015, az + nz * (o + 0.3), 0, 1, 0, (ax + nx * (o + 0.3) - ox) * kk, (az + nz * (o + 0.3) - oz) * kk, 0, ci);
          up(B2, v0, v1, v2);
        }
      }
    }
  }

  // ---- junctions --------------------------------------------------------------------------------
  const bX = new Float64Array(512), bZ = new Float64Array(512);
  const rX = new Float64Array(12), rZ = new Float64Array(12), rNX = new Float64Array(12), rNZ = new Float64Array(12);
  function buildNode(n) {
    const arms = net.arms[n], k = arms.length, c0 = nodeCorner[n], x0 = net.nodeX[n], z0 = net.nodeZ[n];
    let jl = 0, best = -1;
    for (const a of arms) if (rank[a.e] > best) { best = rank[a.e]; jl = layerOf[a.e]; }
    const y = LY[jl];
    for (let i = 0; i < k; i++) {
      const a = arms[i], sl = slots[i];
      stations(a.e, sl, null, 0);
      if (a.end === 0) ribbon(sl, 0, JS[a.e * 2], jl); else ribbon(sl, JS[a.e * 2 + 1], len[a.e], jl);
    }
    for (let i = 0; i < k; i++) {
      const j = (i + 1) % k, ai = arms[i], aj = arms[j], ei = ai.e, ej = aj.e, si = slots[i], sj = slots[j];
      const sgi = ai.end === 0 ? 1 : -1, sgj = aj.end === 0 ? -1 : 1, sdi = sgi > 0 ? 1 : 0, sdj = sgj > 0 ? 1 : 0;
      const ps = pavS[ei * 4 + ai.end * 2 + sdi], qs = pavS[ej * 4 + aj.end * 2 + sdj];
      // Outline of the wedge between the two arms: out along the right edge of arm i, round the
      // corner curve, back in along the left edge of arm j. Fanned from the node.
      let nb = 0, m0 = 0;
      const pi = at(si, ps);
      if (ai.end === 0) for (let q = 0; q <= pi; q++) { bX[nb] = si.x[q] + si.nx[q] * si.hw[q] * sgi; bZ[nb++] = si.z[q] + si.nz[q] * si.hw[q] * sgi; }
      else for (let q = si.n - 1; q >= pi; q--) { bX[nb] = si.x[q] + si.nx[q] * si.hw[q] * sgi; bZ[nb++] = si.z[q] + si.nz[q] * si.hw[q] * sgi; }
      const p0x = bX[nb - 1], p0z = bZ[nb - 1];
      const pj = at(sj, qs), p2x = sj.x[pj] + sj.nx[pj] * sj.hw[pj] * sgj, p2z = sj.z[pj] + sj.nz[pj] * sj.hw[pj] * sgj;
      const cx = cornX[c0 + i], cz = cornZ[c0 + i], curved = cx === cx;
      const m = curved ? Math.max(2, Math.min(8, Math.ceil((Math.hypot(cx - p0x, cz - p0z) + Math.hypot(p2x - cx, p2z - cz)) / 1.3))) : 1;
      rX[0] = p0x; rZ[0] = p0z; rNX[0] = si.nx[pi] * sgi; rNZ[0] = si.nz[pi] * sgi;
      rX[m] = p2x; rZ[m] = p2z; rNX[m] = sj.nx[pj] * sgj; rNZ[m] = sj.nz[pj] * sgj;
      for (let q = 1; q < m; q++) {
        const t = q / m, u = 1 - t;
        rX[q] = u * u * p0x + 2 * u * t * cx + t * t * p2x; rZ[q] = u * u * p0z + 2 * u * t * cz + t * t * p2z;
        const dx = u * (cx - p0x) + t * (p2x - cx), dz = u * (cz - p0z) + t * (p2z - cz), dl = Math.hypot(dx, dz) || 1;
        rNX[q] = dz / dl; rNZ[q] = -dx / dl;
        bX[nb] = rX[q]; bZ[nb++] = rZ[q];
      }
      m0 = nb;
      if (aj.end === 0) for (let q = pj; q >= 0; q--) { bX[nb] = sj.x[q] + sj.nx[q] * sj.hw[q] * sgj; bZ[nb++] = sj.z[q] + sj.nz[q] * sj.hw[q] * sgj; }
      else for (let q = pj; q < sj.n; q++) { bX[nb] = sj.x[q] + sj.nx[q] * sj.hw[q] * sgj; bZ[nb++] = sj.z[q] + sj.nz[q] * sj.hw[q] * sgj; }
      for (let q = 0; q + 1 < nb; q++) ft(B0, x0, z0, bX[q], bZ[q], bX[q + 1], bZ[q + 1], y, jl, C_WHITE);

      // The pavement round the corner.
      if (cornBlocked[c0 + i]) continue;
      const ji = touches(ei, ai.end, sdi), jj = touches(ej, aj.end, sdj);
      if (!ji && !jj) continue;
      const PL = ji ? pavLayer[ei] : pavLayer[ej];
      for (let q = 0; q < m; q++) pavStep(rX[q], rZ[q], rNX[q], rNZ[q], KH, rX[q + 1], rZ[q + 1], rNX[q + 1], rNZ[q + 1], KH, PL);
      if (!ji) pavCap(rX[0], rZ[0], rNX[0], rNZ[0], KH, rX[0] - rX[1], rZ[0] - rZ[1]);
      if (!jj) pavCap(rX[m], rZ[m], rNX[m], rNZ[m], KH, rX[m] - rX[m - 1], rZ[m] - rZ[m - 1]);
    }
  }

  // ---- tracks ---------------------------------------------------------------------------------------
  const GAUGE = 1.435 / 2;
  function buildTrack(i) {
    const f = tk.f[i], j = i + 1, emb = f & 1, rail = f & 2;
    const ax = tk.x[i], az = tk.z[i], bx = tk.x[j], bz = tk.z[j], anx = tk.nx[i], anz = tk.nz[i], bnx = tk.nx[j], bnz = tk.nz[j];
    const strip = (B, o0, o1, y, L, ci) => fq(B, ax + anx * o0, az + anz * o0, y, ax + anx * o1, az + anz * o1, y, bx + bnx * o1, bz + bnz * o1, y, bx + bnx * o0, bz + bnz * o0, y, L, ci);
    let yr = Y_RAIL;
    if (emb) strip(B1, -1.2, 1.2, Y_BED, rail || !(f & 8) ? L_CONCRETE : L_SETT, C_BED);
    else if (rail) {
      // Sleepers are in the texture, so this strip is mapped along the track instead of by world position.
      const B = B0, y = 0.03;
      B.need(4, 6);
      const va = tk.s[i] * IM[L_SLEEPERS], vb = tk.s[j] * IM[L_SLEEPERS];
      const a = vx(B, ax - anx * 1.7, y, az - anz * 1.7, 0, 1, 0, 0, va, L_SLEEPERS, C_WHITE), b = vx(B, ax + anx * 1.7, y, az + anz * 1.7, 0, 1, 0, 1, va, L_SLEEPERS, C_WHITE);
      const c = vx(B, bx + bnx * 1.7, y, bz + bnz * 1.7, 0, 1, 0, 1, vb, L_SLEEPERS, C_WHITE), d = vx(B, bx - bnx * 1.7, y, bz - bnz * 1.7, 0, 1, 0, 0, vb, L_SLEEPERS, C_WHITE);
      up(B, a, b, c); up(B, a, c, d);
      yr = 0.06;
    } else {
      const wl = tk.wl[i] ? tk.wl[i] / 2 + 0.03 : 1.3, wr = tk.wr[i] ? tk.wr[i] / 2 + 0.03 : 1.3;
      strip(B0, -wl, wr, 0.02, f & 4 ? L_GRASS : L_BALLAST, C_WHITE);
      if (!tk.wl[i]) strip(B1, -wl - 0.22, -wl, 0.035, L_CONCRETE, C_TEDGE);
      if (!tk.wr[i]) strip(B1, wr, wr + 0.22, 0.035, L_CONCRETE, C_TEDGE);
      yr = 0.05;
    }
    for (const sg of [-1, 1]) {
      strip(B1, sg * GAUGE - 0.065, sg * GAUGE + 0.065, yr, L_FLAT, C_RAIL);
      strip(B1, sg * (GAUGE - 0.035) - 0.022, sg * (GAUGE - 0.035) + 0.022, yr + 0.004, L_FLAT, C_RAILTOP);
    }
  }

  // ---- public ---------------------------------------------------------------------------------------
  function build(cx, cz) {
    const b = chunkBounds(cx, cz), id = cz * CHUNKS + cx;
    ox = (b.x0 + b.x1) / 2; oz = (b.z0 + b.z1) / 2;
    for (let i = 0; i < LAYERS.length; i++) { UO[i] = Math.floor(ox * IM[i]); VO[i] = Math.floor(oz * IM[i]); }
    for (const B of [B0, B1, B2, B3]) { B.nv = 0; B.ni = 0; }
    if (cx < 0 || cz < 0 || cx >= CHUNKS || cz >= CHUNKS) return { ox, oz, surf: B0, over: B1, mark: B2, decal: B3 };
    for (let q = idxEdges.start[id]; q < idxEdges.start[id + 1]; q++) buildEdge(idxEdges.items[q]);
    for (let q = idxNodes.start[id]; q < idxNodes.start[id + 1]; q++) buildNode(idxNodes.items[q]);
    for (let q = idxTracks.start[id]; q < idxTracks.start[id + 1]; q++) buildTrack(idxTracks.items[q]);
    return { ox, oz, surf: B0, over: B1, mark: B2, decal: B3 };
  }
  return { build, dense, counts: (id) => ({ edges: idxEdges.start[id + 1] - idxEdges.start[id], nodes: idxNodes.start[id + 1] - idxNodes.start[id], tracks: idxTracks.start[id + 1] - idxTracks.start[id] }) };
}
