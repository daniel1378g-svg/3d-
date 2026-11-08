// Geometry checks of the track surfaces, built in Node with the real modules and three.js.
//
// node scripts/test-geometry.mjs        prints a summary, exits non-zero on any failure
//
// Checks
//   centre line  the resampled model line: spacing <= 1.5 m, radius >= MIN_RADIUS (within 2 %),
//                and no source point of track.json farther than MAX_DEVIATION from it
//   facing       every flat strip (asphalt, rubber, lines, kerbs, run-off, gravel) faces up (+y):
//                every normal attribute has y > 0, and no triangle is inverted (folded) or
//                degenerate
//   walls        every barrier wall's winding agrees with its normals, and its track-side face
//                looks at the centre-line sample it was built from (the back face looks away)
//   clearance    no kerb, run-off, gravel or wall vertex lies on the asphalt of another part of the
//                track (distance to every centre-line sample minus its half-width)
//   car path     on the lap, the hero car's driving line stays within halfWidth - 1 m of the
//                centre line
import { readFileSync } from 'node:fs';
import { Group, Vector2, Vector3 } from 'three';

// --- minimal DOM for the canvas textures built by the world modules ------------------------------
const context2d = new Proxy(
  {},
  { get: (target, key) => (key in target ? target[key] : () => ({ addColorStop() {} })), set: () => true },
);
globalThis.document ??= { createElement: () => ({ width: 0, height: 0, getContext: () => context2d }) };

const { MIN_RADIUS, analyseTrack } = await import('../src/journey/world/track-analysis.js');
const { buildTrackSurfaces } = await import('../src/journey/world/track-surfaces.js');
const { arcLengthNear, buildCarPath } = await import('../src/journey/car-path.js');

const root = new URL('..', import.meta.url).pathname;
const trackPoints = JSON.parse(readFileSync(root + 'site/assets/data/track.json', 'utf8')).pts;

/** Largest allowed distance (metres) of a source point from the model's centre line. */
const MAX_DEVIATION = 4;
/** Corner strips and walls must stay this far (metres) from the asphalt edge of other track parts. */
const CLEARANCE = { kerb: -0.01, runoff: 0.5, gravel: 0.5, barrier: 0.5 };

/** Fake material table: every key is a distinct plain object named after the key. */
function fakeMaterials() {
  const cache = {};
  return new Proxy(cache, {
    get: (target, key) => (target[key] ??= { name: String(key), isMaterial: true }),
  });
}

const track = trackPoints.map(([x, z]) => new Vector2(x, z));
const ctx = { track, materials: fakeMaterials(), root: new Group() };
const shape = analyseTrack(track);
buildTrackSurfaces(ctx, shape);
const meshes = ctx.root.children.filter((o) => o.isMesh);
const model = shape.model;
const line = model.line;

const failures = [];
const check = (ok, message) => {
  if (!ok) failures.push(message);
  return ok;
};

/** Per-triangle data of a mesh: vertices, geometric normal (unnormalised), mean attribute normal. */
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

/** Distance from (x, z) to the model's centre-line polyline, and the nearest sample. */
const segmentDistance = (px, pz, ax, az, bx, bz) => {
  const dx = bx - ax;
  const dz = bz - az;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (pz - az) * dz) / (dx * dx + dz * dz || 1)));
  return Math.hypot(px - ax - t * dx, pz - az - t * dz);
};
const CELL = 20;
const grid = new Map();
for (let i = 0; i < line.count; i++) {
  const key = Math.floor(line.x[i] / CELL) + ',' + Math.floor(line.z[i] / CELL);
  if (!grid.has(key)) grid.set(key, []);
  grid.get(key).push(i);
}
function nearestOnLine(x, z, reach = 3) {
  let best = Infinity;
  let sample = -1;
  const cx = Math.floor(x / CELL);
  const cz = Math.floor(z / CELL);
  for (let dx = -reach; dx <= reach; dx++)
    for (let dz = -reach; dz <= reach; dz++)
      for (const i of grid.get(cx + dx + ',' + (cz + dz)) || []) {
        const j = (i + 1) % line.count;
        const d = segmentDistance(x, z, line.x[i], line.z[i], line.x[j], line.z[j]);
        if (d < best) {
          best = d;
          sample = i;
        }
      }
  return { distance: best, sample };
}

// --- centre line ----------------------------------------------------------------------------------
{
  let minRadius = Infinity;
  let maxSpacing = 0;
  for (let i = 0; i < line.count; i++) {
    minRadius = Math.min(minRadius, 1 / Math.abs(line.curvature[i]));
    const j = (i + 1) % line.count;
    maxSpacing = Math.max(maxSpacing, Math.hypot(line.x[j] - line.x[i], line.z[j] - line.z[i]));
  }
  let deviation = 0;
  let worst = -1;
  trackPoints.forEach(([x, z], k) => {
    const d = nearestOnLine(x, z).distance;
    if (d > deviation) {
      deviation = d;
      worst = k;
    }
  });
  console.log(
    `centre line: ${line.count} samples, spacing <= ${maxSpacing.toFixed(3)} m, length ${line.length.toFixed(1)} m,` +
      ` min radius ${minRadius.toFixed(2)} m, max source-point deviation ${deviation.toFixed(2)} m (point ${worst})`,
  );
  check(maxSpacing <= 1.5, `centre line spacing ${maxSpacing} m > 1.5 m`);
  check(minRadius >= MIN_RADIUS * 0.98, `centre line radius ${minRadius} m < ${MIN_RADIUS} m`);
  check(deviation <= MAX_DEVIATION, `source point ${worst} is ${deviation} m from the centre line`);
  const sub = model.corners.flatMap((c) => c.subCorners);
  console.log(
    `corners: ${model.corners.length} runs, ${sub.length} sub-corners;` +
      ` gravel intervals: ${model.gravel.length} (${model.gravel.filter((g) => g.side > 0).length} right, ` +
      `${model.gravel.filter((g) => g.side < 0).length} left)`,
  );
}

// --- facing and folds: flat strips ----------------------------------------------------------------
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
    degenerate: 0,
    repaired: 0,
    minNormalY: 1,
  });
  s.strips++;
  const repairs = mesh.geometry.userData.repairs;
  s.repaired += repairs.held + repairs.collapsed;
  const normal = mesh.geometry.attributes.normal;
  for (let i = 0; i < normal.count; i++) {
    const y = normal.getY(i);
    s.minNormalY = Math.min(s.minNormalY, y);
    if (!(y > 0)) s.normalDown++;
  }
  let facing = 0;
  for (const t of triangles(mesh)) {
    s.triangles++;
    if (t.geometric.length() / 2 < 1e-6) {
      s.degenerate++;
      continue;
    }
    facing += t.geometric.y;
    if (!(t.geometric.y > 0)) s.inverted++;
  }
  if (!(facing > 0)) s.stripsDown++;
}
console.log('flat strips:');
for (const [kind, s] of Object.entries(summary)) {
  console.log(
    `  ${kind.padEnd(7)} ${String(s.strips).padStart(3)} strips ${String(s.triangles).padStart(6)} triangles` +
      `  facing down ${s.stripsDown}  normals down ${s.normalDown}  min normal.y ${s.minNormalY.toFixed(4)}` +
      `  inverted ${s.inverted}  degenerate ${s.degenerate}  guard repairs ${s.repaired}`,
  );
  check(s.stripsDown === 0, `${kind}: ${s.stripsDown} strips face down`);
  check(s.normalDown === 0, `${kind}: ${s.normalDown} normals point down`);
  check(s.inverted === 0, `${kind}: ${s.inverted} inverted (folded) triangles`);
  check(s.degenerate === 0, `${kind}: ${s.degenerate} degenerate triangles`);
}
check(Object.keys(summary).length === FLAT.length, 'some flat strip kinds are missing');

// --- walls ----------------------------------------------------------------------------------------
{
  const walls = meshes.filter((m) => m.material.name === 'barrier');
  let count = 0;
  let inverted = 0;
  let trackSide = 0;
  let trackSideAway = 0;
  let backTowards = 0;
  let repaired = 0;
  for (const wall of walls) {
    const tris = triangles(wall).filter((t) => t.geometric.length() > 1e-6);
    count += tris.length;
    for (const t of tris) if (t.geometric.clone().normalize().dot(t.attribute) <= 0) inverted++;
    const repairs = wall.geometry.userData.repairs;
    repaired += repairs.held + repairs.collapsed;
    // vertex pair k of face f belongs to sample first + k; faces: track side, back, top
    const [first, last] = wall.geometry.userData.range;
    const pairs = last - first + 1;
    const position = wall.geometry.attributes.position;
    const normal = wall.geometry.attributes.normal;
    for (let k = 0; k < pairs; k++) {
      const i = (((first + k) % line.count) + line.count) % line.count;
      for (const [face, wanted] of [
        [0, 1],
        [1, -1],
      ]) {
        const v = 2 * (face * pairs + k);
        const toCentreX = line.x[i] - position.getX(v);
        const toCentreZ = line.z[i] - position.getZ(v);
        const dot = normal.getX(v) * toCentreX + normal.getZ(v) * toCentreZ;
        if (face === 0) {
          trackSide++;
          if (!(dot > 0)) trackSideAway++;
        } else if (!(dot * wanted > 0)) backTowards++;
      }
    }
  }
  console.log(
    `walls: ${walls.length} walls, ${count} triangles, inverted ${inverted}, track-side vertices facing away from` +
      ` their centre-line sample ${trackSideAway} of ${trackSide}, back-face vertices facing the track ${backTowards},` +
      ` guard repairs ${repaired}`,
  );
  check(walls.length > 0, 'no barrier walls built');
  check(inverted === 0, `walls: ${inverted} triangles whose winding disagrees with their normals`);
  check(trackSideAway === 0, `walls: ${trackSideAway} track-side vertices face away from the centre line`);
  check(backTowards === 0, `walls: ${backTowards} back-face vertices face the centre line`);
}

// --- clearance from other parts of the track -------------------------------------------------------
{
  const worst = {};
  for (const mesh of meshes) {
    const kind = mesh.material.name;
    if (!(kind in CLEARANCE)) continue;
    const position = mesh.geometry.attributes.position;
    for (let v = 0; v < position.count; v++) {
      const x = position.getX(v);
      const z = position.getZ(v);
      // distance to the asphalt edge of every nearby sample
      let edge = Infinity;
      const cx = Math.floor(x / CELL);
      const cz = Math.floor(z / CELL);
      for (let dx = -3; dx <= 3; dx++)
        for (let dz = -3; dz <= 3; dz++)
          for (const i of grid.get(cx + dx + ',' + (cz + dz)) || [])
            edge = Math.min(edge, Math.hypot(line.x[i] - x, line.z[i] - z) - model.halfWidth[i]);
      worst[kind] = Math.min(worst[kind] ?? Infinity, edge);
    }
  }
  console.log(
    'clearance from the asphalt (min, metres): ' +
      Object.entries(worst)
        .map(([k, d]) => `${k} ${d.toFixed(2)}`)
        .join(', '),
  );
  for (const [kind, d] of Object.entries(worst))
    check(d >= CLEARANCE[kind], `${kind}: a vertex lies ${d.toFixed(2)} m from an asphalt edge`);
}

// --- car path ---------------------------------------------------------------------------------------
{
  const path = buildCarPath(trackPoints);
  const length = path.getLength();
  const lapStart = arcLengthNear(path, trackPoints[3][0], trackPoints[3][1]);
  const lapEnd = arcLengthNear(path, trackPoints[285][0], trackPoints[285][1]);
  const point = new Vector3();
  let worst = -Infinity;
  let worstAt = null;
  for (let s = lapStart; s <= lapEnd; s += 0.5) {
    path.getPointAt(s / length, point);
    const { distance, sample } = nearestOnLine(point.x, point.z);
    const margin = distance - (model.halfWidth[sample] - 1);
    if (margin > worst) {
      worst = margin;
      worstAt = [point.x.toFixed(1), point.z.toFixed(1), distance.toFixed(2)];
    }
  }
  console.log(
    `car path on the lap (${lapStart.toFixed(0)}-${lapEnd.toFixed(0)} m): largest distance from the centre line` +
      ` minus (halfWidth - 1 m) = ${worst.toFixed(2)} m at (${worstAt[0]}, ${worstAt[1]}), distance ${worstAt[2]} m`,
  );
  check(worst <= 0, `car path leaves the asphalt margin by ${worst.toFixed(2)} m`);
}

if (failures.length) {
  console.log(`FAIL (${failures.length}):\n  ` + failures.join('\n  '));
  process.exit(1);
}
console.log('OK: all geometry checks passed');
