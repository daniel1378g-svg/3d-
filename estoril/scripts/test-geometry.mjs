// Geometry checks of the track surfaces, built in Node with the real modules and three.js.
//
// node scripts/test-geometry.mjs        prints a summary, exits non-zero on any failure
//
// Checks
//   facing   every flat strip (asphalt, rubber, lines, kerbs, run-off, gravel) faces up (+y): its
//            area-weighted face normal points up and every normal attribute has y > 0
//   walls    every barrier wall faces the track: the vertical faces that can be seen from the
//            track (not shielded by another face of the same wall) look at the centre line
//   folds    (reported) triangles whose winding disagrees with the strip's: folded geometry
import { readFileSync } from 'node:fs';
import { Group, Vector2, Vector3 } from 'three';

// --- minimal DOM for the canvas textures built by the world modules ------------------------------
const context2d = new Proxy(
  {},
  { get: (target, key) => (key in target ? target[key] : () => ({ addColorStop() {} })), set: () => true },
);
globalThis.document ??= { createElement: () => ({ width: 0, height: 0, getContext: () => context2d }) };

const { analyseTrack } = await import('../src/journey/world/track-analysis.js');
const { buildTrackSurfaces } = await import('../src/journey/world/track-surfaces.js');

const root = new URL('..', import.meta.url).pathname;
const trackPoints = JSON.parse(readFileSync(root + 'site/assets/data/track.json', 'utf8')).pts;

/** Fake material table: every key is a distinct plain object named after the key. */
function fakeMaterials() {
  const cache = {};
  return new Proxy(cache, {
    get: (target, key) => (target[key] ??= { name: String(key), isMaterial: true }),
  });
}

function buildSurfaces() {
  const track = trackPoints.map(([x, z]) => new Vector2(x, z));
  const ctx = { track, materials: fakeMaterials(), root: new Group() };
  buildTrackSurfaces(ctx, analyseTrack(track));
  return { ctx, meshes: ctx.root.children.filter((o) => o.isMesh) };
}

/** Per-triangle world data of a mesh: vertices, geometric normal (unnormalised), attribute normal. */
function triangles(mesh) {
  const position = mesh.geometry.attributes.position;
  const normal = mesh.geometry.attributes.normal;
  const index = mesh.geometry.index;
  const out = [];
  const v = (i) => new Vector3().fromBufferAttribute(position, i);
  const n = (i) => new Vector3().fromBufferAttribute(normal, i);
  for (let k = 0; k < index.count; k += 3) {
    const [i, j, l] = [index.getX(k), index.getX(k + 1), index.getX(k + 2)];
    const a = v(i);
    const b = v(j);
    const c = v(l);
    const geometric = new Vector3().subVectors(b, a).cross(new Vector3().subVectors(c, a));
    out.push({ a, b, c, geometric, attribute: n(i).add(n(j)).add(n(l)).normalize() });
  }
  return out;
}

const failures = [];
const check = (ok, message) => {
  if (!ok) failures.push(message);
  return ok;
};

const { ctx, meshes } = buildSurfaces();
const centre = ctx.track;
const nearestCentre = (x, z) => {
  let best = null;
  let bestD = Infinity;
  for (const p of centre) {
    const d = (p.x - x) ** 2 + (p.y - z) ** 2;
    if (d < bestD) {
      bestD = d;
      best = p;
    }
  }
  return best;
};

// --- facing: flat strips ------------------------------------------------------------------------
const FLAT = ['asphalt', 'rubber', 'line', 'kerb', 'runoff', 'gravel'];
const summary = {};
for (const mesh of meshes) {
  const kind = mesh.material.name;
  if (!FLAT.includes(kind)) continue;
  const s = (summary[kind] ??= {
    strips: 0,
    triangles: 0,
    stripsDown: 0,
    normalDown: 0,
    inverted: 0,
    minNormalY: 1,
  });
  s.strips++;
  const normal = mesh.geometry.attributes.normal;
  for (let i = 0; i < normal.count; i++) {
    const y = normal.getY(i);
    s.minNormalY = Math.min(s.minNormalY, y);
    if (!(y > 0)) s.normalDown++;
  }
  let facing = 0;
  for (const t of triangles(mesh)) {
    const area = t.geometric.length() / 2;
    if (area < 1e-6) continue; // degenerate (collapsed) triangles cover nothing
    s.triangles++;
    facing += t.geometric.y;
    if (!(t.geometric.y > 0)) s.inverted++;
  }
  if (!(facing > 0)) s.stripsDown++;
}
console.log('facing (flat strips):');
for (const [kind, s] of Object.entries(summary)) {
  console.log(
    `  ${kind.padEnd(7)} ${String(s.strips).padStart(3)} strips ${String(s.triangles).padStart(6)} triangles` +
      `  strips facing down ${s.stripsDown}  normals down ${s.normalDown}` +
      `  min normal.y ${s.minNormalY.toFixed(4)}  folded (inverted) triangles ${s.inverted}`,
  );
  check(s.stripsDown === 0, `${kind}: ${s.stripsDown} strips face down`);
  check(s.normalDown === 0, `${kind}: ${s.normalDown} normals point down`);
}
check(Object.keys(summary).length === FLAT.length, 'some flat strip kinds are missing');

// --- walls ----------------------------------------------------------------------------------------
const walls = meshes.filter((m) => m.material.name === 'barrier');
let wallTriangles = 0;
let wallInverted = 0;
let wallsAway = 0;
let seen = 0;
let seenAway = 0;
for (const wall of walls) {
  const tris = triangles(wall).filter((t) => t.geometric.length() > 1e-6);
  wallTriangles += tris.length;
  const vertical = [];
  for (const t of tris) {
    if (t.geometric.clone().normalize().dot(t.attribute) < 0) wallInverted++;
    if (Math.abs(t.attribute.y) < 0.5) vertical.push(t);
  }
  let towards = 0;
  let away = 0;
  // plan-view segments of the vertical faces
  const segs = vertical.map((t) => {
    const xs = [t.a, t.b, t.c];
    // the two distinct plan positions of a vertical triangle
    let p = xs[0];
    let q = xs.find((v) => Math.hypot(v.x - p.x, v.z - p.z) > 1e-4) || xs[1];
    return { t, p, q, cx: (t.a.x + t.b.x + t.c.x) / 3, cz: (t.a.z + t.b.z + t.c.z) / 3 };
  });
  const hits = (ox, oz, dx, dz, maxT, self) => {
    for (const s of segs) {
      if (s === self) continue;
      const ex = s.q.x - s.p.x;
      const ez = s.q.z - s.p.z;
      const den = dx * ez - dz * ex;
      if (Math.abs(den) < 1e-12) continue;
      const wx = s.p.x - ox;
      const wz = s.p.z - oz;
      const t = (wx * ez - wz * ex) / den;
      const u = (wx * dz - wz * dx) / den;
      if (t > 1e-4 && t < maxT && u >= 0 && u <= 1) return true;
    }
    return false;
  };
  for (const s of segs) {
    const p = nearestCentre(s.cx, s.cz);
    let dx = p.x - s.cx;
    let dz = p.y - s.cz;
    const len = Math.hypot(dx, dz);
    dx /= len;
    dz /= len;
    if (hits(s.cx, s.cz, dx, dz, 0.6, s)) continue; // shielded by the track-side face
    seen++;
    const area = s.t.geometric.length();
    if (s.t.attribute.x * dx + s.t.attribute.z * dz <= 0) {
      seenAway++;
      away += area;
    } else towards += area;
  }
  if (!(towards > away)) wallsAway++;
}
console.log(
  `walls: ${walls.length} walls, ${wallTriangles} triangles, walls facing away from the track ${wallsAway},` +
    ` track-visible vertical triangles ${seen} (facing away ${seenAway}), folded (inverted) triangles ${wallInverted}`,
);
check(walls.length > 0, 'no barrier walls built');
check(wallsAway === 0, `walls: ${wallsAway} walls face away from the track`);

if (failures.length) {
  console.log(`FAIL (${failures.length}):\n  ` + failures.join('\n  '));
  process.exit(1);
}
console.log('OK: all geometry checks passed');
