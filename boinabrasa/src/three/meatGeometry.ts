// Procedural picanha pieces. A picanha steak is folded into a "C" with its fat cap on the outside of the curve
// and pushed onto the skewer through both arms of the C (see the restaurant's own clip: media/originals webclip).
//
// One piece = a rounded cross-section (r across the steak, z through its thickness) swept along an arc in the XY
// plane, the arc's ends rounded off by shrinking the section to a point. The fat cap is the outer shell of the arc.
// A smooth random deformation makes every piece irregular. Units: 1 = 10 cm.
//
// The carved piece is built twice from the same surface function so the two halves fit exactly:
//  • main  — the whole piece with every point in front of the cut plane pushed back onto the plane (the pink face
//            that is revealed when the slice leaves; hidden under the slice until then),
//  • slice — the part in front of the plane: its top is the original surface, its bottom is the plane. Outside the
//            real cut the two coincide (thickness 0) and the shader discards those fragments, so the slice ends in
//            a natural knife edge.
// Per-vertex attributes feed the meat shader: aFat (fat cap), aCut (cut surface), aDepth (distance to the outside,
// for the doneness gradient of a cut face), aEdge (how exposed a point is: edges brown first), aThick (slice).
import * as THREE from "three";

export type CutPlane = {
  /** depth of the plane at x = xRef, measured from the piece centre (piece-local z) */
  z0: number;
  /** x where the plane depth is z0 */
  xRef: number;
  /** tilt around the vertical axis: tan of the angle; positive = deeper (thicker slice) towards −x */
  slope: number;
};

export type PieceSpec = {
  /** the fold is pressed shut: the two ends overlap inside each other instead of being rounded off */
  closed?: boolean;
  seed: number;
  ro: number; // outer radius of the arc (fat surface)
  band: number; // width of the steak band, outer to inner
  depth: number; // steak thickness
  fat: number; // fat cap thickness
  theta0: number; // arc start (rad)
  theta1: number; // arc end (rad)
  cut?: CutPlane;
};

export type Quality = { stations: number; ring: number; sliceU: number; sliceV: number };
export const QUALITY_HIGH: Quality = { stations: 120, ring: 112, sliceU: 90, sliceV: 72 };
export const QUALITY_LOW: Quality = { stations: 72, ring: 64, sliceU: 56, sliceV: 44 };

// ---------------------------------------------------------------------------------------------- deterministic noise
function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}
type Wave = { k: THREE.Vector3; phase: number; amp: number; dir: THREE.Vector3 };
/** A smooth vector field: a sum of a few random plane waves (cheap, deterministic, no seams). */
export function makeField(seed: number, scale: number, amp: number, count = 7) {
  const r = rng(seed);
  const waves: Wave[] = [];
  for (let i = 0; i < count; i++) {
    const k = new THREE.Vector3(r() - 0.5, r() - 0.5, r() - 0.5).normalize().multiplyScalar(scale * (0.6 + r() * 1.2));
    const dir = new THREE.Vector3(r() - 0.5, r() - 0.5, (r() - 0.5) * 0.6).normalize();
    waves.push({ k, phase: r() * Math.PI * 2, amp: amp * (0.5 + r()) / Math.sqrt(count), dir });
  }
  const tmp = new THREE.Vector3();
  return (p: THREE.Vector3, out: THREE.Vector3) => {
    out.set(0, 0, 0);
    for (const w of waves) out.addScaledVector(w.dir, Math.sin(w.k.dot(p) + w.phase) * w.amp);
    return out.add(tmp.set(0, 0, 0));
  };
}

// ------------------------------------------------------------------------------------------------- cross-section
/** The steak's cross-section in (r, z): a superellipse, rounder on the fat side, faces slightly domed. */
function section(spec: PieceSpec, phi: number, out: { r: number; z: number }, bandMul = 1) {
  const ri = spec.ro - spec.band * bandMul;
  const rc = (spec.ro + ri) / 2;
  const a = (spec.ro - ri) / 2;
  const b = spec.depth / 2;
  const c = Math.cos(phi);
  const s = Math.sin(phi);
  const outer = THREE.MathUtils.smoothstep(c, -0.35, 0.35);
  const n = THREE.MathUtils.lerp(7.5, 3.0, outer); // inner side boxy (the fold closes flat), fat side round and puffy
  const e = 2 / n;
  const r = rc + a * Math.sign(c) * Math.pow(Math.abs(c), e);
  let z = b * Math.sign(s) * Math.pow(Math.abs(s), e);
  // seared faces are domed a little in the middle of the band
  const across = (r - rc) / a;
  z *= 1 + 0.07 * (1 - across * across);
  out.r = r;
  out.z = z;
  return out;
}

/** End cap: the section shrinks to a point over the last part of the arc (u in 0..1). */
function capScale(u: number, cap = 0.035) {
  const d = Math.min(u, 1 - u);
  if (d >= cap) return 1;
  const t = 1 - d / cap;
  // nearly square ends: a steak's cut end, only the corners rounded
  return Math.cbrt(Math.max(0, 1 - t * t * t));
}

/** How exposed a point is to the fire: the outer (fat-side) corners of the section brown first; the inside of the
 *  fold is pressed shut and stays paler (negative). */
function exposure(phi: number, k: number) {
  const c = Math.cos(phi);
  const corner = Math.pow(Math.abs(c * Math.sin(phi)) * 2, 1.4) * THREE.MathUtils.smoothstep(c, -0.1, 0.45);
  const inner = THREE.MathUtils.smoothstep(-c, 0.35, 0.9);
  return Math.max(-0.7, Math.min(1, corner * 0.85 + (1 - k) * 0.9 - inner * 0.7));
}

/** Stations crowd towards the ends so the rounded caps stay smooth. */
const stationU = (i: number, n: number) => {
  const s = i / (n - 1);
  return THREE.MathUtils.lerp(s, 0.5 - 0.5 * Math.cos(Math.PI * s), 0.55);
};

type Builder = {
  pos: number[]; nor: number[]; fat: number[]; cut: number[]; depth: number[]; edge: number[]; thick: number[];
  idx: number[];
};
const newBuilder = (): Builder => ({ pos: [], nor: [], fat: [], cut: [], depth: [], edge: [], thick: [], idx: [] });

function finish(b: Builder, withThick: boolean) {
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(b.pos, 3));
  g.setAttribute("aFat", new THREE.Float32BufferAttribute(b.fat, 1));
  g.setAttribute("aCut", new THREE.Float32BufferAttribute(b.cut, 1));
  g.setAttribute("aDepth", new THREE.Float32BufferAttribute(b.depth, 1));
  g.setAttribute("aEdge", new THREE.Float32BufferAttribute(b.edge, 1));
  if (withThick) g.setAttribute("aThick", new THREE.Float32BufferAttribute(b.thick, 1));
  g.setIndex(b.idx);
  g.computeVertexNormals();
  // the collapsed end points get no area-weighted normal: point them along the arc
  const n = g.getAttribute("normal") as THREE.BufferAttribute;
  for (let i = 0; i < n.count; i++) {
    if (Math.hypot(n.getX(i), n.getY(i), n.getZ(i)) < 1e-6) n.setXYZ(i, 0, 0, 1);
  }
  g.computeBoundingSphere();
  return g;
}

export type PieceInfo = {
  /** piece-local x of the skewer axis (the piece is centred on its arc, the skewer passes through both arms) */
  skewerX: number;
  /** vertical extent of the cut (for the knife) and the depth of the plane at a given x */
  cutTop: number;
  cutBottom: number;
  cutLeft: number;
  cutRight: number;
  planeZ: (x: number) => number;
};

/**
 * Builds one piece. `deform` is applied identically to main and slice so their shared surfaces stay together.
 */
export function buildPiece(spec: PieceSpec, q: Quality) {
  const ri = spec.ro - spec.band;
  const rc = (spec.ro + ri) / 2;
  const field = makeField(spec.seed, 2.4, 0.1);
  const lumps = makeField(spec.seed * 3 + 1, 7.0, 0.028, 8);
  const fine = makeField(spec.seed * 7 + 3, 19, 0.0045, 6);
  const r0 = rng(spec.seed * 13 + 5);
  const bandPhase = r0() * 6.28;
  const sx = 0.92 + r0() * 0.2;
  const sy = 0.9 + r0() * 0.16;
  const shear = (r0() - 0.5) * 0.16;
  /** the band is widest at the back of the C and thins towards the arm ends, a little uneven */
  const bandMul = (u: number) => 0.84 + 0.22 * Math.sin(Math.PI * u) + 0.05 * Math.sin(u * 9.0 + bandPhase);
  const tmpP = new THREE.Vector3();
  const tmpD = new THREE.Vector3();
  const tmpF = new THREE.Vector3();
  const sec = { r: 0, z: 0 };

  const arc = spec.theta1 - spec.theta0;
  // skewer passes vertically through both arms: put it where the arms are thickest
  const armTheta = spec.theta0 + arc * 0.11;
  const skewerX = rc * Math.cos(armTheta) * 0.92;

  const deform = (p: THREE.Vector3) => {
    // the centre of the fold stays put (no self-intersection where the two halves meet)
    const centre = THREE.MathUtils.smoothstep(Math.hypot(p.x, p.y), 0.01, 0.26);
    p.set(p.x * sx + p.y * shear, p.y * sy, p.z);
    field(p, tmpD);
    p.addScaledVector(tmpD, 0.06 + 0.94 * centre);
    lumps(p, tmpD);
    fine(p, tmpF);
    return p.addScaledVector(tmpD, 0.2 + 0.8 * centre).add(tmpF);
  };

  const planeZ = spec.cut
    ? (x: number) => spec.cut!.z0 + (x - spec.cut!.xRef) * spec.cut!.slope
    : () => Infinity;

  // fat weight from the radius (fat cap = outer shell)
  const fatAt = (r: number, k: number) => {
    const roK = rc + (spec.ro - rc) * k;
    const inner = roK - spec.fat * Math.max(k, 0.35);
    return THREE.MathUtils.smoothstep(r, inner - 0.006, inner + 0.004);
  };

  // ------------------------------------------------------------------------------------------- main piece (sweep)
  const main = newBuilder();
  const S = q.stations;
  const R = q.ring;
  // polygon of the full section for distance queries (cut faces)
  const poly: { r: number; z: number }[] = [];
  for (let j = 0; j < 256; j++) {
    const s = section(spec, (j / 256) * Math.PI * 2, { r: 0, z: 0 });
    poly.push(s);
  }
  const distToSection = (r: number, z: number, k: number) => {
    let d = Infinity;
    for (let j = 0; j < poly.length; j++) {
      const a = poly[j];
      const b = poly[(j + 1) % poly.length];
      const ar = rc + (a.r - rc) * k, az = a.z * k, br = rc + (b.r - rc) * k, bz = b.z * k;
      const vx = br - ar, vz = bz - az;
      const t = Math.max(0, Math.min(1, ((r - ar) * vx + (z - az) * vz) / (vx * vx + vz * vz)));
      d = Math.min(d, Math.hypot(r - ar - vx * t, z - az - vz * t));
    }
    return d;
  };

  let cutTop = -Infinity, cutBottom = Infinity, cutLeft = Infinity, cutRight = -Infinity;
  for (let i = 0; i < S; i++) {
    const u = stationU(i, S);
    const th = spec.theta0 + arc * u;
    const k = spec.closed ? 1 : capScale(u);
    const ct = Math.cos(th), st = Math.sin(th);
    const arcLenToEnd = spec.closed ? 1 : Math.min(u, 1 - u) * arc * rc;
    const bm = bandMul(u);
    for (let j = 0; j < R; j++) {
      const phi = (j / R) * Math.PI * 2;
      section(spec, phi, sec, bm);
      const r = rc + (sec.r - rc) * k;
      let z = sec.z * k;
      const x = r * ct;
      const y = r * st;
      let isCut = 0;
      let depth = 0;
      if (spec.cut) {
        const pz = planeZ(x);
        if (z > pz) {
          // inside the slice: this point now lies on the cut plane
          const t = z - pz;
          z = pz;
          isCut = THREE.MathUtils.smoothstep(t, 0.0, 0.004);
          depth = Math.min(distToSection(r, z, k), arcLenToEnd + 0.004);
          cutTop = Math.max(cutTop, y);
          cutBottom = Math.min(cutBottom, y);
          cutLeft = Math.min(cutLeft, x);
          cutRight = Math.max(cutRight, x);
        }
      }
      tmpP.set(x, y, z);
      deform(tmpP);
      main.pos.push(tmpP.x, tmpP.y, tmpP.z);
      main.fat.push(fatAt(r, k));
      main.cut.push(isCut);
      main.depth.push(depth);
      main.edge.push(exposure(phi, k));
      main.thick.push(0);
    }
  }
  for (let i = 0; i < S - 1; i++) {
    for (let j = 0; j < R; j++) {
      const a = i * R + j;
      const b = i * R + ((j + 1) % R);
      const c = (i + 1) * R + j;
      const d = (i + 1) * R + ((j + 1) % R);
      main.idx.push(a, c, b, b, c, d);
    }
  }
  const mainGeo = finish(main, false);

  // ------------------------------------------------------------------------------------------------------- slice
  let sliceGeo: THREE.BufferGeometry | null = null;
  if (spec.cut) {
    const sl = newBuilder();
    const U = q.sliceU;
    const V = q.sliceV;
    // the slice lives on the front half of the section (phi 0 → π: outer side, front face, inner side) and on the
    // part of the arc where the plane cuts; find that u-range first
    let u0 = 1, u1 = 0;
    for (let i = 0; i <= 400; i++) {
      const u = i / 400;
      const th = spec.theta0 + arc * u;
      const k = spec.closed ? 1 : capScale(u);
      for (let j = 0; j <= 40; j++) {
        section(spec, (j / 40) * Math.PI, sec, bandMul(u));
        const r = rc + (sec.r - rc) * k;
        if (sec.z * k > planeZ(r * Math.cos(th))) { u0 = Math.min(u0, u); u1 = Math.max(u1, u); }
      }
    }
    u0 = Math.max(0, u0 - 0.01);
    u1 = Math.min(1, u1 + 0.01);
    const layer = (bottom: boolean) => {
      const base = sl.pos.length / 3;
      for (let i = 0; i < U; i++) {
        const u = u0 + ((u1 - u0) * i) / (U - 1);
        const th = spec.theta0 + arc * u;
        const k = spec.closed ? 1 : capScale(u);
        const ct = Math.cos(th), st = Math.sin(th);
        const arcLenToEnd = spec.closed ? 1 : Math.min(u, 1 - u) * arc * rc;
        const bm = bandMul(u);
        for (let j = 0; j < V; j++) {
          const phi = -0.05 + ((Math.PI + 0.1) * j) / (V - 1);
          section(spec, phi, sec, bm);
          const r = rc + (sec.r - rc) * k;
          const z = sec.z * k;
          const x = r * ct;
          const y = r * st;
          const pz = planeZ(x);
          const thick = Math.max(0, z - pz);
          const zz = bottom ? Math.min(z, pz) : z;
          tmpP.set(x, y, zz);
          deform(tmpP);
          sl.pos.push(tmpP.x, tmpP.y, tmpP.z);
          sl.fat.push(fatAt(r, k));
          sl.cut.push(bottom ? THREE.MathUtils.smoothstep(thick, 0.0, 0.004) : 0);
          sl.depth.push(bottom ? Math.min(distToSection(r, Math.min(z, pz), k), arcLenToEnd + 0.004) : 0);
          sl.edge.push(exposure(phi, k));
          sl.thick.push(thick);
        }
      }
      for (let i = 0; i < U - 1; i++) {
        for (let j = 0; j < V - 1; j++) {
          const a = base + i * V + j, b = base + i * V + j + 1, c = base + (i + 1) * V + j, d = base + (i + 1) * V + j + 1;
          if (bottom) sl.idx.push(a, b, c, b, d, c);
          else sl.idx.push(a, c, b, b, c, d);
        }
      }
    };
    layer(false);
    layer(true);
    sliceGeo = finish(sl, true);
  }

  const info: PieceInfo = { skewerX, cutTop, cutBottom, cutLeft, cutRight, planeZ };
  return { main: mainGeo, slice: sliceGeo, info };
}
