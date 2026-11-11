// Low-poly geometry builders for vehicles, people and street furniture. Everything is generated
// in code as non-indexed, flat-shaded triangles with vertex colours (linear, for materials with
// `vertexColors: true`).
//
// Model space: origin on the ground at the centre of the object, +Y up, front towards -Z, so
// `mesh.rotation.y = -heading` matches the game. The right-hand side of a vehicle is +X.
//
// Uses the global THREE only when a geometry is built.

const lin = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const col = (hex) => [lin(((hex >> 16) & 255) / 255), lin(((hex >> 8) & 255) / 255), lin((hex & 255) / 255)];
const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const hash = (n) => {
  let h = Math.imul(n | 0, 374761393) + 668265263;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};

// Triangle soup. Every face is given a rough outward direction and the builder fixes the winding
// to match, so a face can never end up inside out.
class Builder {
  constructor() {
    this.p = [];
    this.n = [];
    this.c = [];
  }

  // color: one [r, g, b] or one per corner. normals: optional per-corner normals (smooth parts).
  tri(a, b, c, color, out, normals) {
    const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    const l = Math.hypot(nx, ny, nz);
    if (l < 1e-9) return;
    nx /= l; ny /= l; nz /= l;
    let ca = color, cb = color, cc = color, na = normals && normals[0], nb = normals && normals[1], nc = normals && normals[2];
    if (Array.isArray(color[0])) [ca, cb, cc] = color;
    if (out && nx * out[0] + ny * out[1] + nz * out[2] < 0) {
      [b, c] = [c, b];
      [cb, cc] = [cc, cb];
      [nb, nc] = [nc, nb];
      nx = -nx; ny = -ny; nz = -nz;
    }
    this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    if (normals) this.n.push(na[0], na[1], na[2], nb[0], nb[1], nb[2], nc[0], nc[1], nc[2]);
    else this.n.push(nx, ny, nz, nx, ny, nz, nx, ny, nz);
    this.c.push(ca[0], ca[1], ca[2], cb[0], cb[1], cb[2], cc[0], cc[1], cc[2]);
  }

  // Corners in order round the edge.
  quad(a, b, c, d, color, out, normals) {
    const per = Array.isArray(color[0]);
    this.tri(a, b, c, per ? [color[0], color[1], color[2]] : color, out, normals && [normals[0], normals[1], normals[2]]);
    this.tri(a, c, d, per ? [color[0], color[2], color[3]] : color, out, normals && [normals[0], normals[2], normals[3]]);
  }

  // Axis-aligned box. faces: colours for 'x+', 'x-', 'y+', 'y-', 'z+', 'z-' (null drops the face).
  box(x0, y0, z0, x1, y1, z1, color, faces = {}) {
    const f = (key, a, b, c, d, out) => {
      const k = key in faces ? faces[key] : color;
      if (k) this.quad(a, b, c, d, k, out);
    };
    f('x+', [x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1], [1, 0, 0]);
    f('x-', [x0, y0, z0], [x0, y1, z0], [x0, y1, z1], [x0, y0, z1], [-1, 0, 0]);
    f('y+', [x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1], [0, 1, 0]);
    f('y-', [x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], [0, -1, 0]);
    f('z+', [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], [0, 0, 1]);
    f('z-', [x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [0, 0, -1]);
  }

  // Prism or cone frustum from a to b. o: { capA, capB: colour or true, smooth, phase }.
  tube(a, b, ra, rb, sides, color, o = {}) {
    let dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    const l = Math.hypot(dx, dy, dz);
    dx /= l; dy /= l; dz /= l;
    const ref = Math.abs(dy) > 0.9 ? [1, 0, 0] : [0, 1, 0];
    let ex = dy * ref[2] - dz * ref[1], ey = dz * ref[0] - dx * ref[2], ez = dx * ref[1] - dy * ref[0];
    const el = Math.hypot(ex, ey, ez);
    ex /= el; ey /= el; ez /= el;
    const fx = dy * ez - dz * ey, fy = dz * ex - dx * ez, fz = dx * ey - dy * ex;
    const dir = (t) => {
      const c = Math.cos(t), s = Math.sin(t);
      return [ex * c + fx * s, ey * c + fy * s, ez * c + fz * s];
    };
    const at = (p, r, d) => [p[0] + d[0] * r, p[1] + d[1] * r, p[2] + d[2] * r];
    const phase = o.phase || 0;
    for (let i = 0; i < sides; i++) {
      const t0 = phase + (i / sides) * Math.PI * 2, t1 = phase + ((i + 1) / sides) * Math.PI * 2;
      const d0 = dir(t0), d1 = dir(t1), dm = dir((t0 + t1) / 2);
      const a0 = at(a, ra, d0), a1 = at(a, ra, d1), b0 = at(b, rb, d0), b1 = at(b, rb, d1);
      this.quad(a0, a1, b1, b0, color, dm, o.smooth ? [d0, d1, d1, d0] : undefined);
      if (o.capA) this.tri(a, a0, a1, o.capA === true ? color : o.capA, [-dx, -dy, -dz]);
      if (o.capB) this.tri(b, b0, b1, o.capB === true ? color : o.capB, [dx, dy, dz]);
    }
  }

  // Lumpy 20-face ball for foliage: colour runs from `low` at the bottom to `high` at the top.
  blob(cx, cy, cz, rx, ry, rz, seed, low, high) {
    const v = [[0, 1, 0]];
    for (let k = 0; k < 5; k++) v.push([0.894 * Math.cos(k * 1.2566), 0.447, 0.894 * Math.sin(k * 1.2566)]);
    for (let k = 0; k < 5; k++) v.push([0.894 * Math.cos(k * 1.2566 + 0.6283), -0.447, 0.894 * Math.sin(k * 1.2566 + 0.6283)]);
    v.push([0, -1, 0]);
    const pts = v.map((q, i) => {
      const s = 0.84 + hash(seed * 31 + i) * 0.32;
      return [cx + q[0] * rx * s, cy + q[1] * ry * s, cz + q[2] * rz * s];
    });
    const cols = pts.map((q, i) => mix(low, high, Math.min(1, Math.max(0, (q[1] - cy) / ry * 0.5 + 0.5 + (hash(seed * 57 + i) - 0.5) * 0.3))));
    const face = (i, j, k) => {
      const out = [pts[i][0] + pts[j][0] + pts[k][0] - 3 * cx, pts[i][1] + pts[j][1] + pts[k][1] - 3 * cy, pts[i][2] + pts[j][2] + pts[k][2] - 3 * cz];
      this.tri(pts[i], pts[j], pts[k], [cols[i], cols[j], cols[k]], out);
    };
    for (let k = 0; k < 5; k++) {
      const u0 = 1 + k, u1 = 1 + (k + 1) % 5, l0 = 6 + k, l1 = 6 + (k + 1) % 5;
      face(0, u0, u1);
      face(u0, l0, u1);
      face(u1, l0, l1);
      face(11, l1, l0);
    }
  }

  build() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.c, 3));
    g.computeBoundingBox();
    g.computeBoundingSphere();
    return g;
  }
}

// ---------------------------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------------------------

const PAINT = [1, 1, 1];                 // tinted per instance: must stay pure white
const GLASS = col(0x1b2632);
const TYRE = col(0x101011);
const HUB = col(0x9ea3a8);
const TRIM = col(0x1c1d1f);              // unpainted plastic
const GRILLE = col(0x121314);
const HEADLAMP = col(0xf3f0da);
const TAILLAMP = col(0xb31515);
const PLATE = col(0xe6e6de);
const STEEL = col(0x7d8388);
const DARK_STEEL = col(0x3b3f44);

// A wheel on the x axis: tyre with smooth sides, hub cap facing outwards (side = +1 or -1).
// `plain` wheels (bus) get a single shaded disc instead of a separate hub and tyre wall.
function wheel(m, x, y, z, r, width, side, plain = false, sides = 8) {
  const inner = [x - side * width, y, z], outer = [x, y, z];
  m.tube(inner, outer, r, r, sides, TYRE, { smooth: true });
  const ring = (rad) => {
    const pts = [];
    for (let i = 0; i < sides; i++) {
      const t = (i / sides) * Math.PI * 2;
      pts.push([x, y + Math.cos(t) * rad, z + Math.sin(t) * rad]);
    }
    return pts;
  };
  const tyre = ring(r), rim = ring(r * 0.62), out = [side, 0, 0];
  for (let i = 0; i < sides; i++) {
    const j = (i + 1) % sides;
    if (plain) {
      m.tri(outer, tyre[i], tyre[j], [HUB, TYRE, TYRE], out);
    } else {
      m.quad(tyre[i], tyre[j], rim[j], rim[i], TYRE, out);
      m.tri(outer, rim[i], rim[j], HUB, out);
    }
    // Inner face, seen under the car from the far side.
    m.tri(inner, [inner[0], tyre[i][1], tyre[i][2]], [inner[0], tyre[j][1], tyre[j][2]], TYRE, [-side, 0, 0]);
  }
}

// ---------------------------------------------------------------------------------------------
// Cars
// ---------------------------------------------------------------------------------------------

// Distances `f` run from the nose backwards. nose/belt/beltR/tail are heights of the bonnet front,
// the windscreen base, the rear-glass base and the tail edge; ws/wt/re/rb are the positions of the
// windscreen base and top, the end of the roof and the rear-glass base.
const CARS = {
  hatch: { L: 4.0, W: 1.74, H: 1.46, wheelbase: 2.5, axle: 0.82, r: 0.31, clear: 0.17, nose: 0.7, belt: 0.95, beltR: 1.0, tail: 0.98, ws: 1.05, wt: 1.78, re: 3.4, rb: 3.84, cTop: 0.12, cBase: 0.34 },
  sedan: { L: 4.6, W: 1.8, H: 1.44, wheelbase: 2.68, axle: 0.9, r: 0.32, clear: 0.16, nose: 0.7, belt: 0.94, beltR: 1.0, tail: 0.97, ws: 1.22, wt: 1.98, re: 3.3, rb: 3.98, cTop: 0.22, cBase: 0.62 },
  estate: { L: 4.66, W: 1.8, H: 1.47, wheelbase: 2.68, axle: 0.9, r: 0.32, clear: 0.16, nose: 0.7, belt: 0.94, beltR: 1.0, tail: 0.98, ws: 1.22, wt: 1.98, re: 4.15, rb: 4.5, cTop: 0.12, cBase: 0.3, extra: 0.66, tailInset: 0.08 },
  suv: { L: 4.45, W: 1.86, H: 1.67, wheelbase: 2.64, axle: 0.88, r: 0.36, clear: 0.22, nose: 0.86, belt: 1.1, beltR: 1.15, tail: 1.12, ws: 1.15, wt: 1.82, re: 3.85, rb: 4.3, cTop: 0.14, cBase: 0.36, extra: 0.64, cladding: true, rails: true },
  van: { L: 5.0, W: 1.94, H: 1.98, wheelbase: 3.1, axle: 0.9, r: 0.34, clear: 0.2, nose: 0.98, belt: 1.18, beltR: 1.18, tail: 1.16, ws: 0.72, wt: 1.36, re: 4.9, rb: 4.98, cTop: 0.1, cBase: 0.1, panel: true, roofInset: 0.1, tailInset: 0.03 },
};

export function buildCarGeometry(variant) {
  const s = CARS[variant] || CARS.hatch, m = new Builder();
  const { L, W, H } = s, hw = W / 2, cl = s.clear;
  const zf = (f) => -L / 2 + f;

  // --- Lower body: sections from nose to tail, widest at about knee height. ---
  const st = [[0, 0.17, cl + 0.06, s.nose - 0.04], [0.34, 0, cl, s.nose], [s.ws, 0, cl, s.belt], [s.rb, 0, cl, s.beltR]];
  if (L - s.rb > 0.4) st.push([L - 0.26, 0, cl, s.tail]);
  st.push([L, s.tailInset || 0.12, cl + 0.12, s.tail - 0.07]);
  const last = st.length - 1;
  const sec = st.map(([f, inset, yb, yt], i) => {
    const end = i === 0 || i === last, w = hw - inset, ym = Math.min(cl + (s.belt - cl) * 0.5, yt - 0.12);
    return { z: zf(f), yb, yt, pts: [[w - (end ? 0.03 : 0.06), yb], [end ? w - 0.03 : w, ym], [w - 0.03, yt]] };
  });
  for (let i = 0; i < last; i++) {
    const a = sec[i], b = sec[i + 1];
    for (const side of [1, -1]) {
      for (let j = 0; j < 2; j++) {
        m.quad([side * a.pts[j][0], a.pts[j][1], a.z], [side * b.pts[j][0], b.pts[j][1], b.z],
          [side * b.pts[j + 1][0], b.pts[j + 1][1], b.z], [side * a.pts[j + 1][0], a.pts[j + 1][1], a.z],
          j === 0 && s.cladding ? TRIM : PAINT, [side, j === 0 ? -0.3 : 0.3, 0]);
      }
    }
    // Bonnet and boot lid; the deck under the cabin is never seen.
    if (i < 2 || i >= 3) {
      m.quad([-a.pts[2][0], a.yt, a.z], [a.pts[2][0], a.yt, a.z], [b.pts[2][0], b.yt, b.z], [-b.pts[2][0], b.yt, b.z], PAINT, [0, 1, 0]);
    }
  }
  // Nose and tail: three rows by three columns so lamps, grille and plate are part of the mesh.
  const face = (e, out, rows) => {
    const w = e.pts[0][0], ys = [e.yb, e.yb + 0.1, e.yt - 0.17, e.yt], xs = [-w, -w * 0.5, w * 0.5, w];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        m.quad([xs[c], ys[r], e.z], [xs[c + 1], ys[r], e.z], [xs[c + 1], ys[r + 1], e.z], [xs[c], ys[r + 1], e.z], rows[r][c], out);
      }
    }
  };
  face(sec[0], [0, 0, -1], [[TRIM, GRILLE, TRIM], [PAINT, PLATE, PAINT], [HEADLAMP, GRILLE, HEADLAMP]]);
  face(sec[last], [0, 0, 1], [[TRIM, TRIM, TRIM], [PAINT, PLATE, PAINT], [TAILLAMP, PAINT, TAILLAMP]]);

  // --- Cabin ---
  const wB = hw - 0.03, wR = hw - (s.roofInset || 0.2), zWS = zf(s.ws), zWT = zf(s.wt), zRE = zf(s.re), zRB = zf(s.rb);
  const yR = H, pil = 0.07;
  const strip = (z0, y0, z1, y1, w0, w1, x0, x1, color, out) => {       // band across the car between two heights
    m.quad([x0 * w0, y0, z0], [x1 * w0, y0, z0], [x1 * w1, y1, z1], [x0 * w1, y1, z1], color, out);
  };
  const fw = 1 - pil / wB;
  strip(zWS, s.belt, zWT, yR, wB, wR, -fw, fw, GLASS, [0, 0.5, -1]);     // windscreen
  strip(zWS, s.belt, zWT, yR, wB, wR, -1, -fw, PAINT, [0, 0.5, -1]);     // A-pillars
  strip(zWS, s.belt, zWT, yR, wB, wR, fw, 1, PAINT, [0, 0.5, -1]);
  strip(zWT, yR, zRE, yR - 0.02, wR, wR, -1, 1, PAINT, [0, 1, 0]);       // roof
  const rw = s.panel ? 0.5 : 1 - 0.1 / wB;
  const yRE = yR - 0.02;
  if (s.panel) {
    // Van: two rear doors with small windows.
    const ym = s.beltR + (yRE - s.beltR) * 0.45, zm = zRB + (zRE - zRB) * 0.45, wm = wB + (wR - wB) * 0.45;
    strip(zRB, s.beltR, zm, ym, wB, wm, -1, 1, PAINT, [0, 0.2, 1]);
    strip(zm, ym, zRE, yRE, wm, wR, -0.86, 0.86, GLASS, [0, 0.2, 1]);
    strip(zm, ym, zRE, yRE, wm, wR, -1, -0.86, PAINT, [0, 0.2, 1]);
    strip(zm, ym, zRE, yRE, wm, wR, 0.86, 1, PAINT, [0, 0.2, 1]);
  } else {
    strip(zRB, s.beltR, zRE, yRE, wB, wR, -rw, rw, GLASS, [0, 0.5, 1]);  // rear window
    strip(zRB, s.beltR, zRE, yRE, wB, wR, -1, -rw, PAINT, [0, 0.5, 1]);
    strip(zRB, s.beltR, zRE, yRE, wB, wR, rw, 1, PAINT, [0, 0.5, 1]);
  }
  // Sides: A-pillar, front door glass, B-pillar, rear glass (split by an extra pillar on long
  // roofs), C-pillar. Points are either on the belt line or on the roof edge.
  const beltAt = (z) => s.belt + (s.beltR - s.belt) * (z - zWS) / (zRB - zWS);
  const roofAt = (z) => yR + (yRE - yR) * (z - zWT) / (zRE - zWT);
  const zB = zWT + (zRE - zWT) * (s.panel ? 0.2 : 0.4), bw = 0.09;
  for (const side of [1, -1]) {
    const lo = (z) => [side * wB, beltAt(z), z], hi = (z) => [side * wR, roofAt(z), z];
    const q = (zl0, zl1, zh1, zh0, color) => m.quad(lo(zl0), lo(zl1), hi(zh1), hi(zh0), color, [side, 0.3, 0]);
    q(zWS, zWS + 0.13, zWT + 0.13, zWT, PAINT);
    q(zWS + 0.13, zB, zB, zWT + 0.13, GLASS);
    q(zB, zB + bw, zB + bw, zB, TRIM);
    const zc0 = zRB - s.cBase, zc1 = zRE - s.cTop;
    if (s.panel) {
      q(zB + bw, zRB, zRE, zB + bw, PAINT);
    } else {
      if (s.extra) {
        const zx = zB + (zc1 - zB) * s.extra;
        q(zB + bw, zx, zx, zB + bw, GLASS);
        q(zx, zx + bw, zx + bw, zx, TRIM);
        q(zx + bw, zc0, zc1, zx + bw, GLASS);
      } else {
        q(zB + bw, zc0, zc1, zB + bw, GLASS);
      }
      q(zc0, zRB, zRE, zc1, PAINT);
    }
    // Door mirror.
    const zm = zWS + 0.1, ym = s.belt + 0.02;
    m.box(Math.min(side * wB, side * (wB + 0.17)), ym, zm, Math.max(side * wB, side * (wB + 0.17)), ym + 0.12, zm + 0.1, TRIM,
      { [side > 0 ? 'x-' : 'x+']: null, 'z+': GLASS });
    if (s.rails) m.box(side * (wR - 0.08) - 0.025, yR - 0.01, zWT + 0.25, side * (wR - 0.08) + 0.025, yR + 0.045, zRE - 0.2, TRIM, { 'y-': null });
  }

  // --- Wheels, with a dark arch behind each so the body reads as cut out round them. ---
  for (const f of [s.axle, s.axle + s.wheelbase]) {
    for (const side of [1, -1]) {
      const z = zf(f), xo = side * (hw + 0.03);
      wheel(m, xo, s.r, z, s.r, 0.22, side);
      const ar = s.r + 0.065, xa = side * (hw + 0.012), pts = [];
      for (let k = 0; k <= 8; k++) {
        const t = -0.35 + (k / 8) * (Math.PI + 0.7);
        pts.push([xa, Math.max(cl, s.r + Math.sin(t) * ar), z + Math.cos(t) * ar]);
      }
      for (let k = 0; k < 8; k++) m.tri([xa, s.r, z], pts[k], pts[k + 1], GRILLE, [side, 0, 0]);
    }
  }
  return m.build();
}

// ---------------------------------------------------------------------------------------------
// Tram and bus: a straight body made of side panels, with tapered ends.
// ---------------------------------------------------------------------------------------------

// o.prof: half cross-section, [x as a fraction of the half width, y], from the skirt to the roof
// centre. o.bands[j]: colour between prof[j] and prof[j + 1]. o.glass: index of the window band.
// o.left / o.right: panels front to back, ['W' window | 'D' door | 'P' plain, width].
// o.nose: [[distance beyond the body, width scale, roof drop], ...] for both ends.
function coach(m, o) {
  const P = (j, side, scale, z, drop = 0) => [side * o.prof[j][0] * o.hw * scale, o.prof[j][1] - (j >= o.glass + 1 ? drop : 0), z];
  const nb = o.prof.length - 1;
  for (const side of [1, -1]) {
    let z = o.z0;
    for (const [type, w] of side > 0 ? o.right : o.left) {
      const za = z, zb = z + w;
      z = zb;
      for (let j = 0; j <= o.glass; j++) {
        const q = (z0, z1, color) => m.quad(P(j, side, 1, z0), P(j, side, 1, z1), P(j + 1, side, 1, z1), P(j + 1, side, 1, z0), color, [side, 0, 0]);
        if (j < o.glass) q(za, zb, type === 'D' ? o.door : o.bands[j]);
        else if (type === 'P') q(za, zb, o.pillar);
        else if (type === 'D') { q(za, za + 0.05, o.door); q(za + 0.05, zb - 0.05, GLASS); q(zb - 0.05, zb, o.door); }
        else { q(za, za + 0.07, o.pillar); q(za + 0.07, zb - 0.07, GLASS); q(zb - 0.07, zb, o.pillar); }
      }
    }
    for (let j = o.glass + 1; j < nb; j++) {
      m.quad(P(j, side, 1, o.z0), P(j, side, 1, o.z1), P(j + 1, side, 1, o.z1), P(j + 1, side, 1, o.z0), o.bands[j], [side * 0.5, 1, 0]);
    }
  }
  for (const end of [-1, 1]) {
    const zBody = end < 0 ? o.z0 : o.z1;
    let prev = [zBody, 1, 0];
    for (const [d, scale, drop] of o.nose) {
      const cur = [zBody + end * d, scale, drop || 0];
      for (const side of [1, -1]) {
        for (let j = 0; j < nb; j++) {
          m.quad(P(j, side, prev[1], prev[0], prev[2]), P(j, side, cur[1], cur[0], cur[2]), P(j + 1, side, cur[1], cur[0], cur[2]), P(j + 1, side, prev[1], prev[0], prev[2]),
            j === o.glass ? GLASS : o.bands[j], [side, j > o.glass ? 1 : 0, end * 0.6]);
        }
      }
      prev = cur;
    }
    const cap = end < 0 ? o.front : o.back;
    for (let j = 0; j < nb; j++) {
      m.quad(P(j, -1, prev[1], prev[0], prev[2]), P(j, 1, prev[1], prev[0], prev[2]), P(j + 1, 1, prev[1], prev[0], prev[2]), P(j + 1, -1, prev[1], prev[0], prev[2]),
        (cap && cap[j]) || (j === o.glass ? GLASS : o.bands[j]), [0, 0, end]);
    }
  }
}

export function buildTramGeometry() {
  const m = new Builder();
  const red = col(0xb3141c), cream = col(0xece3c8), roof = col(0x8a8d8f), door = col(0x8f1218), under = col(0x26282b);
  coach(m, {
    hw: 1.25, z0: -6.0, z1: 6.0,
    prof: [[1, 0.32], [1, 1.5], [1, 1.62], [0.97, 2.5], [0.93, 2.98], [0.55, 3.13], [0, 3.16]],
    bands: [red, cream, cream, cream, roof, roof], glass: 2, pillar: cream, door,
    left: Array.from({ length: 9 }, () => ['W', 12 / 9]),
    right: [['D', 1.3], ['W', 1.35], ['W', 1.35], ['W', 1.35], ['D', 1.3], ['W', 1.35], ['W', 1.35], ['W', 1.35], ['D', 1.3]],
    nose: [[0.75, 0.9, 0.02], [1.3, 0.66, 0.08]],
  });
  // Bogies, lamps, roof equipment and the pantograph.
  for (const z of [-4.4, 4.4]) m.box(-1.05, 0.02, z - 1.1, 1.05, 0.34, z + 1.1, under, { 'y+': null });
  for (const x of [-0.5, 0.5]) {
    m.box(x - 0.11, 0.95, -7.36, x + 0.11, 1.17, -7.28, HEADLAMP, { 'z+': null });
    m.box(x - 0.09, 0.95, 7.28, x + 0.09, 1.13, 7.34, TAILLAMP, { 'z-': null });
  }
  m.box(-0.45, 2.66, -7.34, 0.45, 2.92, -7.28, col(0x18191b), { 'z+': null });       // route number box
  m.box(-0.7, 3.12, -3.6, 0.7, 3.32, -1.2, roof, { 'y-': null });
  m.box(-0.6, 3.12, 2.2, 0.6, 3.28, 4.4, col(0x6f7376), { 'y-': null });
  m.box(-0.5, 3.12, 0.1, 0.5, 3.2, 1.3, DARK_STEEL, { 'y-': null });
  const top = 4.5;
  for (const x of [-0.35, 0.35]) {
    m.tube([x, 3.2, 0.2], [x * 0.8, 3.85, 1.25], 0.03, 0.03, 3, DARK_STEEL);
    m.tube([x * 0.8, 3.85, 1.25], [x * 0.6, top, 0.55], 0.03, 0.03, 3, DARK_STEEL);
  }
  m.box(-0.75, top - 0.02, 0.47, 0.75, top + 0.04, 0.63, DARK_STEEL);
  return m.build();
}

export function buildBusGeometry() {
  const m = new Builder();
  const red = col(0xc01820), white = col(0xf1efe8), roof = col(0xd8d8d4), door = col(0x2a2d31), under = col(0x1d1e20);
  coach(m, {
    hw: 1.275, z0: -5.7, z1: 5.7,
    prof: [[1, 0.34], [1, 1.02], [1, 1.14], [0.985, 2.44], [0.96, 2.94], [0.7, 3.04], [0, 3.06]],
    bands: [red, red, white, white, roof, roof], glass: 2, pillar: col(0x1d2227), door,
    left: Array.from({ length: 8 }, () => ['W', 11.4 / 8]),
    right: [['D', 1.25], ['W', 1.5], ['W', 1.5], ['D', 1.4], ['W', 1.45], ['W', 1.45], ['D', 1.3], ['W', 1.55]],
    nose: [[0.3, 0.96, 0.02]],
    back: [red, red, red, white, roof, roof],
  });
  m.box(-0.9, 2.5, -6.06, 0.9, 2.86, -5.99, col(0x15161a), { 'z+': null, 'z-': col(0xc77f1c) });   // destination display
  m.box(-0.8, 3.04, -1.5, 0.8, 3.24, 1.3, roof, { 'y-': null });                      // air conditioning
  for (const x of [-0.85, 0.85]) {
    m.box(x - 0.17, 0.62, -6.05, x + 0.17, 0.82, -5.98, HEADLAMP, { 'z+': null });
    m.box(x - 0.13, 0.8, 5.98, x + 0.13, 1.25, 6.04, TAILLAMP, { 'z-': null });
  }
  for (const side of [1, -1]) {
    m.box(side > 0 ? 1.24 : -1.5, 2.0, -5.95, side > 0 ? 1.5 : -1.24, 2.42, -5.85, under);   // mirrors
    for (const z of [-3.55, 3.2]) {
      wheel(m, side * 1.3, 0.48, z, 0.48, 0.3, side, true);
    }
  }
  return m.build();
}

// ---------------------------------------------------------------------------------------------
// Pedestrian: 1.75 m, two mirrored walking poses (pose 0: left leg and right arm forward).
// The jacket is white so an instance colour can dress each person differently.
// ---------------------------------------------------------------------------------------------

export function buildPedestrianGeometry(pose) {
  const m = new Builder(), s = pose ? -1 : 1;
  const skin = col(0xd9a47e), hair = col(0x3a2a20), jacket = [1, 1, 1], trousers = col(0x2c3440), shoe = col(0x18181a);
  const sq = { phase: Math.PI / 4 };
  for (const side of [-1, 1]) {
    const fwd = side === -s;                    // this leg swings forward
    const x = side * 0.09, hip = [x, 0.93, 0];
    const knee = fwd ? [x, 0.52, -0.17] : [x, 0.5, 0.1], ankle = fwd ? [x, 0.09, -0.27] : [x, 0.12, 0.34];
    m.tube(hip, knee, 0.095, 0.08, 4, trousers, sq);
    m.tube(knee, ankle, 0.08, 0.06, 4, trousers, sq);
    m.box(x - 0.05, ankle[1] - 0.09, ankle[2] - 0.17, x + 0.05, ankle[1], ankle[2] + 0.07, shoe);
    // Arms swing against the legs.
    const sh = [side * 0.235, 1.4, 0], elbow = fwd ? [side * 0.25, 1.12, 0.1] : [side * 0.25, 1.13, -0.1];
    const wrist = fwd ? [side * 0.25, 0.9, 0.17] : [side * 0.25, 0.92, -0.24];
    const dx = wrist[0] - elbow[0], dy = wrist[1] - elbow[1], dz = wrist[2] - elbow[2];
    m.tube(sh, elbow, 0.062, 0.052, 4, jacket, sq);
    m.tube(elbow, wrist, 0.052, 0.045, 4, jacket, sq);
    m.tube(wrist, [wrist[0] + dx * 0.4, wrist[1] + dy * 0.4, wrist[2] + dz * 0.4], 0.045, 0.035, 4, skin, { ...sq, capB: true });
  }
  // Torso: wider at the shoulders.
  const b = [[-0.16, 0.9, -0.1], [0.16, 0.9, -0.1], [0.16, 0.9, 0.1], [-0.16, 0.9, 0.1]];
  const t = [[-0.21, 1.46, -0.11], [0.21, 1.46, -0.11], [0.21, 1.46, 0.12], [-0.21, 1.46, 0.12]];
  for (let i = 0; i < 4; i++) {
    const j = (i + 1) % 4;
    m.quad(b[i], b[j], t[j], t[i], jacket, [b[i][0] + b[j][0], 0, b[i][2] + b[j][2]]);
  }
  m.quad(t[0], t[1], t[2], t[3], jacket, [0, 1, 0]);
  m.quad(b[0], b[1], b[2], b[3], trousers, [0, -1, 0]);
  m.tube([0, 1.44, 0], [0, 1.54, -0.01], 0.055, 0.05, 4, skin, sq);
  m.box(-0.085, 1.52, -0.11, 0.085, 1.75, 0.09, skin, { 'y+': hair, 'z+': hair });
  return m.build();
}

// ---------------------------------------------------------------------------------------------
// Trees
// ---------------------------------------------------------------------------------------------

export function buildTreeGeometry(variant) {
  const m = new Builder(), bark = col(0x4a3d31), barkTop = col(0x5a4c3d);
  const trunk = (h, r0, r1) => m.tube([0, 0, 0], [0.04, h, -0.03], r0, r1, 5, [bark, bark, barkTop, barkTop]);
  if (variant === 1) {
    // Tall, narrow poplar: a six-sided spindle.
    const low = col(0x2c4a22), high = col(0x5c8438);
    trunk(3, 0.24, 0.18);
    const rings = [[2.2, 0.55], [4.6, 1.5], [8.2, 1.75], [12, 1.3], [15, 0.65], [16.6, 0]];
    const pt = (i, k) => {
      const a = (k % 6) * Math.PI / 3 + i * 0.5, r = rings[i][1] * (0.86 + hash(i * 13 + (k % 6)) * 0.28);
      return [Math.cos(a) * r, rings[i][0] + (hash(i * 7 + (k % 6) + 90) - 0.5) * 0.7 * (i > 0 && i < 5 ? 1 : 0), Math.sin(a) * r];
    };
    const tone = (i, k) => mix(low, high, Math.min(1, i / 5 + (hash(i * 5 + (k % 6) + 40) - 0.5) * 0.35 + 0.1));
    for (let k = 0; k < 6; k++) {
      m.tri([0, 2.0, 0], pt(0, k), pt(0, k + 1), low, [0, -1, 0]);
      for (let i = 0; i < 5; i++) {
        const a = pt(i, k), b = pt(i, k + 1), c = pt(i + 1, k + 1), d = pt(i + 1, k);
        m.quad(a, b, c, d, [tone(i, k), tone(i, k + 1), tone(i + 1, k + 1), tone(i + 1, k)], [a[0] + b[0], 0.3, a[2] + b[2]]);
      }
    }
  } else if (variant === 2) {
    // Small ornamental tree with a tight round crown.
    const low = col(0x3d6a2a), high = col(0x86ad4c);
    trunk(2.0, 0.09, 0.07);
    m.blob(0, 3.1, 0, 1.35, 1.2, 1.35, 21, low, high);
    m.blob(0.55, 2.7, 0.35, 0.85, 0.75, 0.85, 22, low, high);
    m.blob(-0.5, 2.75, -0.4, 0.8, 0.7, 0.8, 23, low, high);
  } else {
    // Round street tree (lime or maple).
    const low = col(0x2f5424), high = col(0x6f9a3e);
    trunk(3.6, 0.23, 0.15);
    m.blob(0, 6.3, 0, 3.0, 2.7, 3.0, 11, low, high);
    m.blob(1.3, 5.0, 0.8, 2.0, 1.7, 2.0, 12, low, high);
    m.blob(-1.2, 5.2, -0.9, 2.1, 1.8, 2.1, 13, low, high);
  }
  return m.build();
}

// ---------------------------------------------------------------------------------------------
// Street furniture
// ---------------------------------------------------------------------------------------------

// Street lamp, 9 m: the arm reaches 2 m towards -Z (over the road).
export function buildLampGeometry() {
  const m = new Builder();
  m.tube([0, 0, 0], [0, 1.1, 0], 0.11, 0.1, 6, DARK_STEEL);
  m.tube([0, 1.1, 0], [0, 8.7, 0], 0.085, 0.055, 6, STEEL);
  m.tube([0, 8.7, 0], [0, 9.0, -1.5], 0.05, 0.045, 4, STEEL);
  m.box(-0.16, 8.93, -2.15, 0.16, 9.05, -1.45, DARK_STEEL, { 'y-': col(0xfff3c4) });
  return m.build();
}

// Lens centres of the signal head in model space; the renderer draws the lit lamp on top.
export const SIGNAL_LAMPS = { red: [0, 3.06, -0.32], amber: [0, 2.76, -0.32], green: [0, 2.46, -0.32], radius: 0.1 };

// Traffic-light pole, 3.2 m, with one three-lamp head facing -Z. Lenses are dark (unlit).
export function buildSignalGeometry() {
  const m = new Builder(), body = col(0x141516);
  m.tube([0, 0, 0], [0, 3.2, 0], 0.06, 0.06, 6, STEEL, { capB: true });
  m.box(-0.25, 2.2, -0.085, 0.25, 3.32, -0.065, body);                    // backboard
  m.box(-0.15, 2.3, -0.3, 0.15, 3.22, -0.085, body, { 'z+': null });      // housing
  const dark = { red: col(0x4a0f0c), amber: col(0x4d3608), green: col(0x0b3a1c) };
  for (const key of ['red', 'amber', 'green']) {
    const [x, y, z] = SIGNAL_LAMPS[key], r = SIGNAL_LAMPS.radius;
    const ring = [];
    for (let i = 0; i < 8; i++) ring.push([x + Math.cos(i * Math.PI / 4) * r, y + Math.sin(i * Math.PI / 4) * r, z]);
    for (let i = 0; i < 8; i++) {
      const a = ring[i], b = ring[(i + 1) % 8];
      m.tri([x, y, z], a, b, dark[key], [0, 0, -1]);
      m.quad(a, b, [b[0], b[1], -0.3], [a[0], a[1], -0.3], body, [a[0] + b[0] - 2 * x, a[1] + b[1] - 2 * y, 0]);
    }
    // Visor over the top half of the lens, visible from both sides.
    for (let i = 0; i < 3; i++) {
      const a0 = (i / 3) * Math.PI, a1 = ((i + 1) / 3) * Math.PI, rv = r + 0.02;
      const p0 = [x + Math.cos(a0) * rv, y + Math.sin(a0) * rv, -0.3], p1 = [x + Math.cos(a1) * rv, y + Math.sin(a1) * rv, -0.3];
      const q0 = [p0[0], p0[1] - 0.02, -0.46], q1 = [p1[0], p1[1] - 0.02, -0.46];
      const up = [Math.cos((a0 + a1) / 2), Math.sin((a0 + a1) / 2), 0];
      m.quad(p0, p1, q1, q0, body, up);
      m.quad(p0, p1, q1, q0, body, [-up[0], -up[1], 0]);
    }
  }
  return m.build();
}

// Sign post: grey tube, 6 cm across.
export function buildPoleGeometry(height) {
  const m = new Builder(), h = height > 0 ? height : 2.5;
  m.tube([0, 0, 0], [0, h, 0], 0.03, 0.03, 5, STEEL, { capB: true });
  return m.build();
}

// Anti-parking post: white with red bands, 0.9 m.
export function buildBollardGeometry() {
  const m = new Builder(), white = col(0xe9e9e4), red = col(0xb81d1d);
  m.tube([0, 0, 0], [0, 0.5, 0], 0.05, 0.05, 6, white);
  m.tube([0, 0.5, 0], [0, 0.66, 0], 0.05, 0.05, 6, red);
  m.tube([0, 0.66, 0], [0, 0.78, 0], 0.05, 0.05, 6, white);
  m.tube([0, 0.78, 0], [0, 0.9, 0], 0.05, 0.045, 6, red, { capB: true });
  return m.build();
}

// Tram or bus stop shelter, 4.2 m long, open towards -Z (the kerb side).
export function buildShelterGeometry() {
  const m = new Builder(), frame = col(0x2e3236), glass = col(0x6f8794), poster = col(0xe4e2da), wood = col(0x7a5a3c);
  m.box(-2.2, 2.4, -0.9, 2.2, 2.5, 0.8, frame, { 'y-': col(0xb9bcbf) });           // roof
  m.box(-2.05, 0.18, 0.68, 2.05, 2.3, 0.71, glass);                                // back wall
  m.box(-2.1, 0.18, -0.55, -2.07, 2.3, 0.68, glass);                               // glazed end
  m.box(1.98, 0.25, -0.6, 2.12, 2.3, 0.7, frame, { 'x+': poster, 'x-': poster });  // poster case
  for (const x of [-2.1, 0, 2.05]) m.tube([x, 0, 0.72], [x, 2.4, 0.72], 0.045, 0.045, 4, frame, { phase: Math.PI / 4 });
  m.tube([-2.1, 0, -0.56], [-2.1, 2.4, -0.56], 0.04, 0.04, 4, frame, { phase: Math.PI / 4 });
  m.box(-1.3, 0.43, 0.22, 1.1, 0.49, 0.6, wood);                                   // bench
  for (const x of [-1.1, 0.9]) m.box(x - 0.03, 0, 0.3, x + 0.03, 0.43, 0.52, frame, { 'y+': null, 'y-': null });
  return m.build();
}
