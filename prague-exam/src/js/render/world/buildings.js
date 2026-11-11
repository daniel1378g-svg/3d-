// Buildings of one chunk as two merged meshes: walls (facade atlas × plaster colour) and roofs
// (plain vertex colours). Footprints come from data/buildings.pack (tools/steps/40-buildings.mjs):
// rings run clockwise seen from above, so the outside of a wall is on the left of its direction.
import { LIN, hash2, toByte, releaseAfterUpload } from './util.js';

const MIN_WALL = 0.4;                    // shorter ring segments are merged into their neighbour
const CORNER_COS = Math.cos(0.5);        // a turn sharper than this starts a new wall run
const GROUND_SHADE = 0.8;                // walls darken towards the pavement (cheap contact shadow)
const PASSAGE = 4.6;                     // buildings over a road (flags bit 1) start this high
const PASSAGE_MIN = 6.5;                 // ... and lower ones are left out altogether

const TILE = [0x9a4b33, 0x8a4330, 0xa55a3e, 0x7c4a3a, 0x6d5548, 0x8f3d2d, 0x74463a];   // pitched roofs
const GRAVEL = [0x5d5f61, 0x67635d, 0x525456, 0x6e6b66, 0x595651];                     // flat roofs

// Growable vertex soup with an index. Reused for every chunk; toGeometry() copies the used part.
class Soup {
  constructor(textured) {
    this.cap = 0; this.icap = 0; this.nv = 0; this.ni = 0; this.textured = textured;
    this.grow(8192, 16384);
    this.resetBounds();
  }
  resetBounds() { this.x0 = this.y0 = this.z0 = Infinity; this.x1 = this.y1 = this.z1 = -Infinity; }
  reset() { this.nv = 0; this.ni = 0; this.resetBounds(); }
  grow(cap, icap) {
    if (cap > this.cap) {
      const pos = new Float32Array(cap * 3), nrm = new Int8Array(cap * 3), col = new Uint8Array(cap * 3);
      if (this.pos) { pos.set(this.pos); nrm.set(this.nrm); col.set(this.col); }
      this.pos = pos; this.nrm = nrm; this.col = col;
      if (this.textured) { const uv = new Float32Array(cap * 2); if (this.uv) uv.set(this.uv); this.uv = uv; }
      this.cap = cap;
    }
    if (icap > this.icap) { const idx = new Uint32Array(icap); if (this.idx) idx.set(this.idx); this.idx = idx; this.icap = icap; }
  }
  reserve(verts, indices) {
    if (this.nv + verts > this.cap || this.ni + indices > this.icap) {
      this.grow(Math.max(this.cap * 2, this.nv + verts), Math.max(this.icap * 2, this.ni + indices));
    }
  }
  vert(x, y, z, nx, ny, nz, r, g, b, u, v) {
    const i = this.nv++, o = i * 3;
    this.pos[o] = x; this.pos[o + 1] = y; this.pos[o + 2] = z;
    this.nrm[o] = nx * 127; this.nrm[o + 1] = ny * 127; this.nrm[o + 2] = nz * 127;
    this.col[o] = r; this.col[o + 1] = g; this.col[o + 2] = b;
    if (this.textured) { this.uv[i * 2] = u; this.uv[i * 2 + 1] = v; }
    if (x < this.x0) this.x0 = x; if (x > this.x1) this.x1 = x;
    if (y < this.y0) this.y0 = y; if (y > this.y1) this.y1 = y;
    if (z < this.z0) this.z0 = z; if (z > this.z1) this.z1 = z;
    return i;
  }
  tri(a, b, c) { const o = this.ni; this.idx[o] = a; this.idx[o + 1] = b; this.idx[o + 2] = c; this.ni = o + 3; }
  toGeometry() {
    if (!this.ni) return null;
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos.slice(0, this.nv * 3), 3));
    g.setAttribute('normal', new THREE.BufferAttribute(this.nrm.slice(0, this.nv * 3), 3, true));
    g.setAttribute('color', new THREE.BufferAttribute(this.col.slice(0, this.nv * 3), 3, true));
    if (this.textured) g.setAttribute('uv', new THREE.BufferAttribute(this.uv.slice(0, this.nv * 2), 2));
    const idx = this.nv > 65535 ? this.idx.slice(0, this.ni) : Uint16Array.from(this.idx.subarray(0, this.ni));
    g.setIndex(new THREE.BufferAttribute(idx, 1));
    const cx = (this.x0 + this.x1) / 2, cy = (this.y0 + this.y1) / 2, cz = (this.z0 + this.z1) / 2;
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(cx, cy, cz), Math.hypot(this.x1 - cx, this.y1 - cy, this.z1 - cz));
    g.boundingBox = new THREE.Box3(new THREE.Vector3(this.x0, this.y0, this.z0), new THREE.Vector3(this.x1, this.y1, this.z1));
    return releaseAfterUpload(g);
  }
}

export function createBuildings({ pack, atlas, anisotropy = 1 }) {
  const { buf, meta } = pack;
  const names = Object.keys(atlas.styles);
  // One entry per style index of the pack. `groundH` lets an atlas give the ground floor its own
  // height; without it both strips are one `floor` high.
  const styles = meta.styles.map((name) => {
    const s = atlas.styles[name] || atlas.styles[names[0]];
    const floor = s.floor > 0.5 ? s.floor : 3;
    return { g0: s.ground[0], g1: s.ground[1], u0: s.upper[0], u1: s.upper[1], bay: s.bay > 0.5 ? s.bay : 3, floor, groundH: s.groundH > 0.5 ? s.groundH : floor };
  });
  if (anisotropy > 1 && atlas.texture.anisotropy < anisotropy) atlas.texture.anisotropy = anisotropy;

  const wallMat = new THREE.MeshLambertMaterial({ map: atlas.texture, vertexColors: true });
  const roofMat = new THREE.MeshLambertMaterial({ vertexColors: true });
  const walls = new Soup(true), roofs = new Soup(false);

  // Scratch for one footprint.
  let px = new Float32Array(512), pz = new Float32Array(512), seg = new Float32Array(512);
  let ix = new Float32Array(512), iz = new Float32Array(512);
  const corner = new Uint8Array(512);
  const v2 = [];
  const contour = (xs, zs, n) => {
    while (v2.length < n) v2.push(new THREE.Vector2());
    const out = new Array(n);
    for (let i = 0; i < n; i++) out[i] = v2[i].set(xs[i], zs[i]);
    return out;
  };

  // ---- walls ------------------------------------------------------------------------------------
  // One quad per floor between ring points i and j. ua, ub = texture u at each end.
  function wallQuads(i, j, ua, ub, st, wallH, cr, cg, cb, base) {
    const ax = px[i], az = pz[i], bx = px[j], bz = pz[j], L = seg[i];
    const nx = (bz - az) / L, nz = -(bx - ax) / L;               // outward: left of a -> b
    const r1 = toByte(cr), g1 = toByte(cg), b1 = toByte(cb);
    const quad = (y0, y1, v0, v1, shade0) => {
      const r0 = shade0 === 1 ? r1 : toByte(cr * shade0), g0 = shade0 === 1 ? g1 : toByte(cg * shade0), b0 = shade0 === 1 ? b1 : toByte(cb * shade0);
      const A = walls.vert(ax, y0, az, nx, 0, nz, r0, g0, b0, ua, v0);
      const B = walls.vert(bx, y0, bz, nx, 0, nz, r0, g0, b0, ub, v0);
      const C = walls.vert(bx, y1, bz, nx, 0, nz, r1, g1, b1, ub, v1);
      const D = walls.vert(ax, y1, az, nx, 0, nz, r1, g1, b1, ua, v1);
      walls.tri(A, D, C); walls.tri(A, C, B);
    };
    let gh = base, rest = wallH - base;
    if (!base) {
      gh = Math.min(st.groundH, wallH);
      rest = wallH - gh;
      if (rest < 0.12 * st.floor) { gh = wallH; rest = 0; }      // no sliver above the ground floor
      quad(0, gh, st.g0, st.g0 + (st.g1 - st.g0) * Math.min(1, gh / st.groundH), GROUND_SHADE);
    }
    if (rest <= 0) return;
    let full = Math.floor(rest / st.floor), cut = rest - full * st.floor, fh = st.floor;
    const frac = cut / st.floor;
    if (full > 0 && frac < 0.12) { fh = rest / full; cut = 0; }           // stretch a little instead of a sliver
    else if (frac > 0.88) { full += 1; fh = rest / full; cut = 0; }      // squeeze a little instead of a cut
    let y = gh;
    for (let f = 0; f < full; f++) { quad(y, y + fh, st.u0, st.u1, 1); y += fh; }
    if (cut > 0) quad(y, wallH, st.u0, st.u0 + (st.u1 - st.u0) * frac, 1);
  }

  function buildWalls(n, st, wallH, cr, cg, cb, base) {
    // Split the ring into runs at real corners so that window bays are laid out per facade and
    // flow round gentle bends. Each run gets a whole number of bays where that fits.
    let first = -1;
    for (let i = 0; i < n; i++) {
      const p = (i + n - 1) % n, j = (i + 1) % n;
      const d = ((px[i] - px[p]) * (px[j] - px[i]) + (pz[i] - pz[p]) * (pz[j] - pz[i])) / (seg[p] * seg[i]);
      corner[i] = d < CORNER_COS ? 1 : 0;
      if (corner[i] && first < 0) first = i;
    }
    if (first < 0) { first = 0; corner[0] = 1; }
    walls.reserve(n * 4 * (3 + Math.ceil(wallH / st.floor)), n * 6 * (3 + Math.ceil(wallH / st.floor)));
    let k = 0;
    while (k < n) {
      // run = segments starting at ring points (first + k) ... until the next corner
      let len = 0, m = 0;
      do { len += seg[(first + k + m) % n]; m++; } while (k + m < n && !corner[(first + k + m) % n]);
      let bays = Math.round(len / st.bay), perMetre = 1 / (4 * st.bay), u = 0;
      if (bays >= 1 && (bays * st.bay) / len > 1.42) bays -= 1;
      if (bays >= 1 && (bays * st.bay) / len < 0.7) bays += 1;
      if (bays >= 1 && (bays * st.bay) / len <= 1.42) { perMetre = bays / (4 * len); u = bays / 4; }
      else u = (len / 2) * perMetre;                             // too short for a bay: centre a pier on it
      // u falls along the ring: seen from outside the ring runs right to left.
      for (let q = 0; q < m; q++) {
        const i = (first + k + q) % n, j = (i + 1) % n;
        const ub = u - seg[i] * perMetre;
        wallQuads(i, j, u, ub, st, wallH, cr, cg, cb, base);
        u = ub;
      }
      k += m;
    }
  }

  // ---- roofs ------------------------------------------------------------------------------------
  let fnx = 0, fny = 1, fnz = 0;
  function faceNormal(ax, ay, az, bx, by, bz, cx, cy, cz) {
    const ux = bx - ax, uy = by - ay, uz = bz - az, vx = cx - ax, vy = cy - ay, vz = cz - az;
    let x = uy * vz - uz * vy, y = uz * vx - ux * vz, z = ux * vy - uy * vx;
    const l = Math.hypot(x, y, z);
    if (l < 1e-6) { fnx = 0; fny = 1; fnz = 0; return false; }
    fnx = x / l; fny = y / l; fnz = z / l;
    return true;
  }
  function roofTri(ax, ay, az, bx, by, bz, cx, cy, cz, r, g, b) {
    if (!faceNormal(ax, ay, az, bx, by, bz, cx, cy, cz)) return;
    const A = roofs.vert(ax, ay, az, fnx, fny, fnz, r, g, b), B = roofs.vert(bx, by, bz, fnx, fny, fnz, r, g, b), C = roofs.vert(cx, cy, cz, fnx, fny, fnz, r, g, b);
    roofs.tri(A, B, C);
  }
  // Sloped or vertical face over the ring edge a -> b, rising to ta (above a) and tb (above b).
  function roofQuad(ax, ay, az, bx, by, bz, tax, tay, taz, tbx, tby, tbz, r, g, b) {
    if (!faceNormal(bx, by, bz, ax, ay, az, tax, tay, taz) && !faceNormal(bx, by, bz, tax, tay, taz, tbx, tby, tbz)) return;
    const B = roofs.vert(bx, by, bz, fnx, fny, fnz, r, g, b), A = roofs.vert(ax, ay, az, fnx, fny, fnz, r, g, b);
    const TA = roofs.vert(tax, tay, taz, fnx, fny, fnz, r, g, b), TB = roofs.vert(tbx, tby, tbz, fnx, fny, fnz, r, g, b);
    roofs.tri(B, A, TA); roofs.tri(B, TA, TB);
  }
  function cap(xs, zs, n, y, r, g, b, down = false) {
    if (n < 3) return;
    const faces = n === 3 ? [[0, 1, 2]] : THREE.ShapeUtils.triangulateShape(contour(xs, zs, n), []);
    const base = roofs.nv;
    for (let i = 0; i < n; i++) roofs.vert(xs[i], y, zs[i], 0, down ? -1 : 1, 0, r, g, b);
    for (const f of faces) {
      const a = f[0], b2 = f[1], c = f[2];
      // Face up whatever winding the triangulation chose.
      const up = (zs[b2] - zs[a]) * (xs[c] - xs[a]) - (xs[b2] - xs[a]) * (zs[c] - zs[a]);
      if (up >= 0 !== down) roofs.tri(base + a, base + b2, base + c); else roofs.tri(base + a, base + c, base + b2);
    }
  }
  const ringArea = (xs, zs, n) => { let a = 0; for (let i = 0, j = n - 1; i < n; j = i++) a += xs[j] * zs[i] - xs[i] * zs[j]; return a / 2; };

  // Ring moved inwards by d (mitred, with a limit at sharp corners). False when it folds over.
  function inset(n, d, area) {
    for (let i = 0; i < n; i++) {
      const p = (i + n - 1) % n, j = (i + 1) % n;
      const e0x = (px[i] - px[p]) / seg[p], e0z = (pz[i] - pz[p]) / seg[p], e1x = (px[j] - px[i]) / seg[i], e1z = (pz[j] - pz[i]) / seg[i];
      const mx = -e0z - e1z, mz = e0x + e1x;                     // sum of the two inward normals
      const k = Math.max(0.35, 1 + e0x * e1x + e0z * e1z);
      ix[i] = px[i] + (mx * d) / k; iz[i] = pz[i] + (mz * d) / k;
    }
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      if ((ix[j] - ix[i]) * (px[j] - px[i]) + (iz[j] - iz[i]) * (pz[j] - pz[i]) <= 0) return false;
    }
    return ringArea(ix, iz, n) > area * 0.08;
  }

  function flatRoof(n, h, cr, cg, cb, seed) {
    // A low parapet band in a darker tone of the plaster, closed by the roof deck.
    const lip = h > 9 ? 0.45 : 0.3, top = h + lip;
    const r = toByte(cr * 0.74), g = toByte(cg * 0.74), b = toByte(cb * 0.74);
    roofs.reserve(n * 5 + 4, n * 9 + 6);
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      roofQuad(px[i], h, pz[i], px[j], h, pz[j], px[i], top, pz[i], px[j], top, pz[j], r, g, b);
    }
    const c = GRAVEL[seed % GRAVEL.length], k = 0.9 + ((seed >>> 8) % 100) / 500;
    cap(px, pz, n, top, toByte(LIN[(c >> 16) & 255] * k), toByte(LIN[(c >> 8) & 255] * k), toByte(LIN[c & 255] * k));
  }

  // Returns the height of the eaves (walls end there) or 0 when the footprint needs a flat roof.
  function pitchedRoof(n, h, area, perimeter, seed, dryRun) {
    const c = TILE[seed % TILE.length], k = 0.88 + ((seed >>> 8) % 100) / 400;
    const r = toByte(LIN[(c >> 16) & 255] * k), g = toByte(LIN[(c >> 8) & 255] * k), b = toByte(LIN[c & 255] * k);
    if (n === 4) {
      // Hipped roof with a ridge along the long axis.
      const long0 = seg[0] + seg[2] >= seg[1] + seg[3];
      const o = long0 ? 0 : 1;                                   // ring index where a long side starts
      const P = (q) => (o + q) % 4;
      const longLen = (seg[P(0)] + seg[P(2)]) / 2, shortLen = (seg[P(1)] + seg[P(3)]) / 2;
      const rise = Math.max(2, Math.min(3.5, shortLen * 0.36));
      const eaves = Math.max(2.5, h - rise * 0.55);
      if (dryRun) return eaves;
      const y = eaves + rise;
      const m1x = (px[P(1)] + px[P(2)]) / 2, m1z = (pz[P(1)] + pz[P(2)]) / 2, m3x = (px[P(3)] + px[P(0)]) / 2, m3z = (pz[P(3)] + pz[P(0)]) / 2;
      const t = Math.min(0.5, (shortLen * 0.5) / longLen);
      const rax = m3x + (m1x - m3x) * t, raz = m3z + (m1z - m3z) * t, rbx = m1x - (m1x - m3x) * t, rbz = m1z - (m1z - m3z) * t;
      roofs.reserve(16, 24);
      roofQuad(px[P(0)], eaves, pz[P(0)], px[P(1)], eaves, pz[P(1)], rax, y, raz, rbx, y, rbz, r, g, b);
      roofTri(px[P(2)], eaves, pz[P(2)], px[P(1)], eaves, pz[P(1)], rbx, y, rbz, r, g, b);
      roofQuad(px[P(2)], eaves, pz[P(2)], px[P(3)], eaves, pz[P(3)], rbx, y, rbz, rax, y, raz, r, g, b);
      roofTri(px[P(0)], eaves, pz[P(0)], px[P(3)], eaves, pz[P(3)], rax, y, raz, r, g, b);
      return eaves;
    }
    // Any other outline: sloped sides up to an inset ring, closed by a flat top.
    let d = Math.min(3.6, 0.42 * ((2 * area) / perimeter));
    if (!inset(n, d, area)) { d *= 0.5; if (d < 0.5 || !inset(n, d, area)) return 0; }
    const rise = Math.max(2, Math.min(3.5, d * 1.05));
    const eaves = Math.max(2.5, h - rise * 0.55);
    if (dryRun) return eaves;
    const y = eaves + rise;
    roofs.reserve(n * 5, n * 9);
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      roofQuad(px[i], eaves, pz[i], px[j], eaves, pz[j], ix[i], y, iz[i], ix[j], y, iz[j], r, g, b);
    }
    cap(ix, iz, n, y, toByte(LIN[(c >> 16) & 255] * k * 0.8), toByte(LIN[(c >> 8) & 255] * k * 0.8), toByte(LIN[c & 255] * k * 0.8));
    return eaves;
  }

  // ---- one chunk --------------------------------------------------------------------------------
  function build(id) {
    walls.reset(); roofs.reset();
    const b0 = buf.chunkStart[id], b1 = buf.chunkStart[id + 1];
    for (let bi = b0; bi < b1; bi++) {
      const p0 = buf.start[bi], p1 = buf.start[bi + 1];
      if (p1 - p0 + 1 > px.length) {
        const cap2 = (p1 - p0 + 1) * 2;
        px = new Float32Array(cap2); pz = new Float32Array(cap2); seg = new Float32Array(cap2); ix = new Float32Array(cap2); iz = new Float32Array(cap2);
      }
      // Ring without the stubs that are too short to be a wall.
      let n = 0;
      for (let p = p0; p < p1; p++) {
        const x = buf.x[p] / 8, z = buf.z[p] / 8;
        if (n && Math.hypot(x - px[n - 1], z - pz[n - 1]) < MIN_WALL) continue;
        px[n] = x; pz[n] = z; n++;
      }
      while (n > 3 && Math.hypot(px[0] - px[n - 1], pz[0] - pz[n - 1]) < MIN_WALL) n--;
      if (n < 3) continue;
      let perimeter = 0;
      for (let i = 0; i < n; i++) { const j = (i + 1) % n; seg[i] = Math.hypot(px[j] - px[i], pz[j] - pz[i]) || 1e-3; perimeter += seg[i]; }
      const area = ringArea(px, pz, n);
      if (area < 2) continue;

      const st = styles[buf.style[bi]] || styles[0];
      const h = Math.max(2.4, buf.height[bi] / 2);
      // A road runs through or under this one: only the part above the passage is drawn.
      const base = buf.flags[bi] & 2 ? PASSAGE : 0;
      if (base && h < PASSAGE_MIN) continue;
      const cr = LIN[buf.colour[bi * 3]], cg = LIN[buf.colour[bi * 3 + 1]], cb = LIN[buf.colour[bi * 3 + 2]];
      const seed = hash2(bi, 977);
      let wallH = h;
      let pitched = (buf.flags[bi] & 1) !== 0 && n <= 16;
      if (pitched) {
        const eaves = pitchedRoof(n, h, area, perimeter, seed, true);
        if (!eaves || (base && eaves < base + 1.2)) pitched = false; else wallH = eaves;
      }
      buildWalls(n, st, wallH, cr, cg, cb, base);
      if (base) { roofs.reserve(n, n * 3); cap(px, pz, n, base, toByte(cr * 0.5), toByte(cg * 0.5), toByte(cb * 0.5), true); }
      if (!pitched || !pitchedRoof(n, h, area, perimeter, seed, false)) flatRoof(n, wallH, cr, cg, cb, seed);
    }
    const out = { walls: null, roofs: null };
    const wg = walls.toGeometry(), rg = roofs.toGeometry();
    if (wg) { out.walls = new THREE.Mesh(wg, wallMat); out.walls.matrixAutoUpdate = false; }
    if (rg) { out.roofs = new THREE.Mesh(rg, roofMat); out.roofs.matrixAutoUpdate = false; }
    return out;
  }

  function dispose() { wallMat.dispose(); roofMat.dispose(); }
  return { build, dispose, materials: [wallMat, roofMat] };
}
