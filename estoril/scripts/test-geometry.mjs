// Geometry checks of the track surfaces, built in Node with the real modules and three.js.
//
// node scripts/test-geometry.mjs        prints a summary, exits non-zero on any failure
//
// Checks
//   centre line  the resampled model line: spacing <= 1.5 m, radius >= MIN_RADIUS (within 2 %),
//                and no source point of track.json farther than MAX_DEVIATION from it
//   facing       every flat strip (asphalt, rubber, lines, kerbs, run-off, gravel) faces up (+y):
//                every normal attribute has y > 0, and no triangle is inverted (folded) or
//                degenerate; the kerbs' risers face away from the centre line
//   walls        every barrier wall's winding agrees with its normals, it has no zero-area triangle,
//                and its track-side face looks at the centre-line sample it was built from (the
//                back face looks away); no wall vertex lies inside or within WALL_GAP of a gravel
//                trap (its own or another) or of another wall (walls never cross)
//   clearance    no kerb, run-off, gravel or wall vertex lies on the asphalt of another part of the
//                track (distance to every centre-line sample minus its half-width); walls stay
//                WALL_TRACK_CLEARANCE from every asphalt edge
//   layers       every pair of up-facing ground-level triangles that overlap in plan (track strips,
//                pit lane, pit entry/exit, painted lines, start line, grid slots) is at least
//                MIN_LAYER_GAP apart in height where they overlap, and above the terrain
//   highlight    the aerial highlight ribbon lies on the model's centre line, faces up, closes the
//                lap without a zero-length segment, and is above every layer it overlaps (it takes
//                part in the layer check)
//   car path     on the lap, the hero car's driving line stays within halfWidth - 1 m of the
//                centre line
import { readFileSync } from 'node:fs';
import { Vector2, Vector3 } from 'three';

// --- minimal DOM for the canvas textures built by the world modules ------------------------------
const context2d = new Proxy(
  {},
  {
    get: (target, key) =>
      key in target ? target[key] : () => ({ addColorStop() {}, data: new Uint8ClampedArray(4) }),
    set: (target, key, value) => ((target[key] = value), true),
  },
);
globalThis.document ??= { createElement: () => ({ width: 0, height: 0, getContext: () => context2d }) };

const { MIN_RADIUS, analyseTrack } = await import('../src/journey/world/track-analysis.js');
const { GRAVEL_MIN_WIDTH, WALL_GAP, WALL_TRACK_CLEARANCE, buildTrackSurfaces } =
  await import('../src/journey/world/track-surfaces.js');
const { createWorldContext } = await import('../src/journey/world/context.js');
const { buildPitLaneSurface } = await import('../src/journey/world/pits.js');
const { buildStartGantry } = await import('../src/journey/world/main-straight.js');
const { LAYERS, MIN_LAYER_GAP } = await import('../src/journey/world/layers.js');
const { arcLengthNear, buildCarPath } = await import('../src/journey/car-path.js');
const { createTrackHighlight } = await import('../src/journey/track-highlight.js');

const root = new URL('..', import.meta.url).pathname;
const trackPoints = JSON.parse(readFileSync(root + 'site/assets/data/track.json', 'utf8')).pts;

/** Largest allowed distance (metres) of a source point from the model's centre line. */
const MAX_DEVIATION = 4;
/** Corner strips and walls must stay this far (metres) from the asphalt edge of other track parts. */
const CLEARANCE = { kerb: -0.01, runoff: 0.5, gravel: 0.5, barrier: WALL_TRACK_CLEARANCE - 1e-3 };

// the real world context (materials, helpers), then the track surfaces, pit lane and start area
const ctx = createWorldContext(trackPoints, 'high');
const shape = analyseTrack(ctx.track);
buildTrackSurfaces(ctx, shape);
const trackMeshes = ctx.root.children.filter((o) => o.isMesh);
buildPitLaneSurface(ctx);
buildStartGantry(ctx);
const highlight = createTrackHighlight(ctx.root.userData.trackModel);
ctx.root.add(highlight.mesh);
ctx.root.updateMatrixWorld(true);
const model = shape.model;
const line = model.line;
const materialName = new Map(Object.entries(ctx.materials).map(([key, material]) => [material, key]));
for (const mesh of trackMeshes) mesh.kind = materialName.get(mesh.material);
const meshes = trackMeshes;

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
const risers = { count: 0, wrong: 0 };
for (const mesh of meshes) {
  const kind = mesh.kind;
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
    if (Math.abs(y) < 0.1 && Math.hypot(normal.getX(i), normal.getZ(i)) > 0.99) continue; // riser
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
    if (Math.abs(t.attribute.y) < 0.1) {
      // a riser (kerbs): vertical, facing away from the centre line, winding matching its normal
      risers.count++;
      const { sample } = nearestOnLine(t.a.x, t.a.z);
      const outward = t.attribute.x * (t.a.x - line.x[sample]) + t.attribute.z * (t.a.z - line.z[sample]);
      if (!(outward > 0) || t.geometric.clone().normalize().dot(t.attribute) <= 0) risers.wrong++;
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
console.log(`  kerb risers: ${risers.count} triangles, facing the track or mis-wound ${risers.wrong}`);
check(
  risers.wrong === 0,
  `kerb risers: ${risers.wrong} triangles face the track or disagree with their winding`,
);

// --- walls ----------------------------------------------------------------------------------------
{
  const walls = meshes.filter((m) => m.kind === 'barrier');
  let count = 0;
  let inverted = 0;
  let trackSide = 0;
  let trackSideAway = 0;
  let backTowards = 0;
  let repaired = 0;
  let degenerate = 0;
  for (const wall of walls) {
    const all = triangles(wall);
    const tris = all.filter((t) => t.geometric.length() / 2 >= 1e-6);
    degenerate += all.length - tris.length;
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
    `walls: ${walls.length} walls, ${count} triangles, inverted ${inverted}, degenerate ${degenerate},` +
      ` track-side vertices facing away from their centre-line sample ${trackSideAway} of ${trackSide},` +
      ` back-face vertices facing the track ${backTowards}, guard repairs ${repaired}`,
  );
  check(walls.length > 0, 'no barrier walls built');
  check(degenerate === 0, `walls: ${degenerate} degenerate (zero-area) triangles`);
  check(inverted === 0, `walls: ${inverted} triangles whose winding disagrees with their normals`);
  check(trackSideAway === 0, `walls: ${trackSideAway} track-side vertices face away from the centre line`);
  check(backTowards === 0, `walls: ${backTowards} back-face vertices face the centre line`);
}

// --- gravel outlines ----------------------------------------------------------------------------------
{
  // width of every trap at each of its samples (vertex pair k = inner edge, outer edge), the
  // narrowest end and the largest width change per metre
  const traps = meshes.filter((m) => m.kind === 'gravel');
  let narrowest = Infinity;
  let narrowestEnd = Infinity;
  let steepest = 0;
  for (const trap of traps) {
    const position = trap.geometry.attributes.position;
    const pairs = position.count / 2;
    const widths = [];
    for (let k = 0; k < pairs; k++)
      widths.push(
        Math.hypot(
          position.getX(2 * k + 1) - position.getX(2 * k),
          position.getZ(2 * k + 1) - position.getZ(2 * k),
        ),
      );
    narrowest = Math.min(narrowest, ...widths);
    narrowestEnd = Math.min(narrowestEnd, widths[0], widths[pairs - 1]);
    for (let k = 1; k < pairs; k++)
      steepest = Math.max(steepest, Math.abs(widths[k] - widths[k - 1]) / line.spacing);
  }
  console.log(
    `gravel: ${traps.length} traps, narrowest ${narrowest.toFixed(2)} m, narrowest end ${narrowestEnd.toFixed(2)} m` +
      ` (minimum ${GRAVEL_MIN_WIDTH} m), largest width change ${steepest.toFixed(2)} m per metre`,
  );
  check(narrowest >= GRAVEL_MIN_WIDTH - 1e-3, `gravel: a trap narrows to ${narrowest} m (sliver)`);
}

// --- walls against gravel and against each other -----------------------------------------------------
{
  // plan distance from a point to a triangle (0 inside) or a segment (c = b)
  const toSegment = (px, pz, ax, az, bx, bz) => segmentDistance(px, pz, ax, az, bx, bz);
  const toTriangle = (px, pz, t) => {
    const [ax, az, bx, bz, cx, cz] = t;
    const s = (x0, z0, x1, z1) => (x1 - x0) * (pz - z0) - (z1 - z0) * (px - x0);
    const d1 = s(ax, az, bx, bz);
    const d2 = s(bx, bz, cx, cz);
    const d3 = s(cx, cz, ax, az);
    if ((d1 >= 0 && d2 >= 0 && d3 >= 0) || (d1 <= 0 && d2 <= 0 && d3 <= 0)) return 0;
    return Math.min(
      toSegment(px, pz, ax, az, bx, bz),
      toSegment(px, pz, bx, bz, cx, cz),
      toSegment(px, pz, cx, cz, ax, az),
    );
  };
  // plan triangles of a mesh, in 10 m cells
  const SIZE = 10;
  const bucket = (meshes) => {
    const cells = new Map();
    meshes.forEach((mesh, id) => {
      for (const t of triangles(mesh)) {
        const tri = [t.a.x, t.a.z, t.b.x, t.b.z, t.c.x, t.c.z];
        const x0 = Math.floor(Math.min(t.a.x, t.b.x, t.c.x) / SIZE);
        const x1 = Math.floor(Math.max(t.a.x, t.b.x, t.c.x) / SIZE);
        const z0 = Math.floor(Math.min(t.a.z, t.b.z, t.c.z) / SIZE);
        const z1 = Math.floor(Math.max(t.a.z, t.b.z, t.c.z) / SIZE);
        for (let cx = x0; cx <= x1; cx++)
          for (let cz = z0; cz <= z1; cz++) {
            const key = cx + ',' + cz;
            if (!cells.has(key)) cells.set(key, []);
            cells.get(key).push({ id, tri });
          }
      }
    });
    return (x, z, skip = -1) => {
      let best = Infinity;
      for (let dx = -1; dx <= 1; dx++)
        for (let dz = -1; dz <= 1; dz++)
          for (const { id, tri } of cells.get(
            Math.floor(x / SIZE) + dx + ',' + (Math.floor(z / SIZE) + dz),
          ) || [])
            if (id !== skip) best = Math.min(best, toTriangle(x, z, tri));
      return best;
    };
  };
  const walls = meshes.filter((m) => m.kind === 'barrier');
  const gravelDistance = bucket(meshes.filter((m) => m.kind === 'gravel'));
  const wallDistance = bucket(walls);
  let inGravel = 0;
  let nearGravel = Infinity;
  let nearWall = Infinity;
  walls.forEach((wall, id) => {
    const position = wall.geometry.attributes.position;
    for (let v = 0; v < position.count; v++) {
      const x = position.getX(v);
      const z = position.getZ(v);
      const g = gravelDistance(x, z);
      if (g === 0) inGravel++;
      nearGravel = Math.min(nearGravel, g);
      nearWall = Math.min(nearWall, wallDistance(x, z, id));
    }
  });
  console.log(
    `walls vs gravel: ${inGravel} wall vertices inside a gravel trap, nearest ${nearGravel.toFixed(2)} m;` +
      ` nearest other wall ${nearWall.toFixed(2)} m (minimum ${WALL_GAP} m)`,
  );
  check(inGravel === 0, `walls: ${inGravel} vertices inside gravel`);
  check(nearGravel >= WALL_GAP - 1e-3, `walls: a wall stands ${nearGravel} m from gravel`);
  check(nearWall >= WALL_GAP - 1e-3, `walls: two walls come within ${nearWall} m (cross or touch)`);
}

// --- clearance from other parts of the track -------------------------------------------------------
{
  const worst = {};
  for (const mesh of meshes) {
    const kind = mesh.kind;
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

// --- layers ---------------------------------------------------------------------------------------
{
  // up-facing triangles at ground level (y < 0.2 m) of everything built so far, with a layer name
  const layerName = (mesh, y) => {
    if (mesh === highlight.mesh) return 'highlight';
    const key = materialName.get(mesh.material) ?? mesh.material.type;
    if (key === 'line' && !trackMeshes.includes(mesh))
      return y > LAYERS.lines + 0.002
        ? 'paint'
        : y > LAYERS.pitLane + 0.01 && mesh.position.z < 195
          ? 'pit-line'
          : 'grid-side';
    if (key === 'pitAsphalt') return y < LAYERS.pitLane - 0.002 ? 'pit-mouth' : 'pit-lane';
    return key;
  };
  const flat = []; // [ax, az, bx, bz, cx, cz, ay, by, cy, layer]
  const names = [];
  const a = new Vector3();
  const b = new Vector3();
  const c = new Vector3();
  const n = new Vector3();
  ctx.root.traverse((mesh) => {
    if (!mesh.isMesh) return;
    const position = mesh.geometry.attributes.position;
    const index = mesh.geometry.index;
    const count = index ? index.count : position.count;
    for (let k = 0; k < count; k += 3) {
      const at = (j, out) =>
        out.fromBufferAttribute(position, index ? index.getX(k + j) : k + j).applyMatrix4(mesh.matrixWorld);
      at(0, a);
      at(1, b);
      at(2, c);
      n.subVectors(b, a).cross(c.clone().sub(a));
      if (n.length() < 1e-9 || n.y / n.length() < 0.95 || Math.max(a.y, b.y, c.y) > 0.2) continue;
      const name = layerName(mesh, (a.y + b.y + c.y) / 3);
      if (!names.includes(name)) names.push(name);
      flat.push([a.x, a.z, b.x, b.z, c.x, c.z, a.y, b.y, c.y, names.indexOf(name)]);
    }
  });
  // spatial hash of triangle bounding boxes (2 m cells)
  const SIZE = 2;
  const cells = new Map();
  const boxes = flat.map((t) => [
    Math.min(t[0], t[2], t[4]),
    Math.min(t[1], t[3], t[5]),
    Math.max(t[0], t[2], t[4]),
    Math.max(t[1], t[3], t[5]),
  ]);
  boxes.forEach(([x0, z0, x1, z1], id) => {
    for (let cx = Math.floor(x0 / SIZE); cx <= Math.floor(x1 / SIZE); cx++)
      for (let cz = Math.floor(z0 / SIZE); cz <= Math.floor(z1 / SIZE); cz++) {
        const key = cx * 100003 + cz;
        if (!cells.has(key)) cells.set(key, []);
        cells.get(key).push(id);
      }
  });
  // plan intersection of two triangles (Sutherland-Hodgman), counter-clockwise copies
  const ccw = (t) => {
    const p = [
      [t[0], t[1], t[6]],
      [t[2], t[3], t[7]],
      [t[4], t[5], t[8]],
    ];
    const area = (p[1][0] - p[0][0]) * (p[2][1] - p[0][1]) - (p[2][0] - p[0][0]) * (p[1][1] - p[0][1]);
    return area < 0 ? [p[0], p[2], p[1]] : p;
  };
  const clip = (subject, clipper) => {
    let out = subject;
    for (let e = 0; e < 3 && out.length; e++) {
      const [px, pz] = clipper[e];
      const [qx, qz] = clipper[(e + 1) % 3];
      const inside = (v) => (qx - px) * (v[1] - pz) - (qz - pz) * (v[0] - px) >= 0;
      const input = out;
      out = [];
      for (let i = 0; i < input.length; i++) {
        const cur = input[i];
        const prev = input[(i + input.length - 1) % input.length];
        const cross = () => {
          const dx = cur[0] - prev[0];
          const dz = cur[1] - prev[1];
          const den = (qx - px) * dz - (qz - pz) * dx;
          const u = ((qx - px) * (pz - prev[1]) - (qz - pz) * (px - prev[0])) / (den || 1e-30);
          return [prev[0] + u * dx, prev[1] + u * dz];
        };
        if (inside(cur)) {
          if (!inside(prev)) out.push(cross());
          out.push(cur);
        } else if (inside(prev)) out.push(cross());
      }
    }
    return out;
  };
  const heightAt = (tri, x, z) => {
    // barycentric interpolation of y over the plan triangle
    const [p0, p1, p2] = tri;
    const det = (p1[1] - p2[1]) * (p0[0] - p2[0]) + (p2[0] - p1[0]) * (p0[1] - p2[1]);
    const l0 = ((p1[1] - p2[1]) * (x - p2[0]) + (p2[0] - p1[0]) * (z - p2[1])) / det;
    const l1 = ((p2[1] - p0[1]) * (x - p2[0]) + (p0[0] - p2[0]) * (z - p2[1])) / det;
    return l0 * p0[2] + l1 * p1[2] + (1 - l0 - l1) * p2[2];
  };
  const pairs = new Map(); // "layerA|layerB" -> { overlaps, minGap, below }
  let tested = 0;
  for (const [key, ids] of cells) {
    for (let i = 0; i < ids.length; i++)
      for (let j = i + 1; j < ids.length; j++) {
        const p = ids[i];
        const q = ids[j];
        const bp = boxes[p];
        const bq = boxes[q];
        const ix0 = Math.max(bp[0], bq[0]);
        const iz0 = Math.max(bp[1], bq[1]);
        if (ix0 > Math.min(bp[2], bq[2]) || iz0 > Math.min(bp[3], bq[3])) continue;
        // test each pair once: in the cell holding the low corner of the boxes' intersection
        if (Math.floor(ix0 / SIZE) * 100003 + Math.floor(iz0 / SIZE) !== key) continue;
        tested++;
        const tp = ccw(flat[p]);
        const tq = ccw(flat[q]);
        const poly = clip(tp, tq);
        if (poly.length < 3) continue;
        let area = 0;
        let mx = 0;
        let mz = 0;
        for (let k = 0; k < poly.length; k++) {
          const [x0, z0] = poly[k];
          const [x1, z1] = poly[(k + 1) % poly.length];
          const w = x0 * z1 - x1 * z0;
          area += w;
          mx += (x0 + x1) * w;
          mz += (z0 + z1) * w;
        }
        area /= 2;
        if (area < 1e-4) continue; // shared edges and corners
        mx /= 6 * area;
        mz /= 6 * area;
        const gap = Math.abs(heightAt(tp, mx, mz) - heightAt(tq, mx, mz));
        const la = names[flat[p][9]];
        const lb = names[flat[q][9]];
        const pairKey = [la, lb].sort().join(' / ');
        const entry = pairs.get(pairKey) ?? { overlaps: 0, minGap: Infinity, below: 0 };
        entry.overlaps++;
        entry.minGap = Math.min(entry.minGap, gap);
        if (gap < MIN_LAYER_GAP - 1e-6) entry.below++;
        pairs.set(pairKey, entry);
      }
  }
  const lowest = Math.min(...flat.map((t) => Math.min(t[6], t[7], t[8])));
  console.log(
    `layers: ${flat.length} up-facing ground-level triangles in ${names.length} layers, ${tested} candidate` +
      ` pairs; minimum gap ${MIN_LAYER_GAP * 1000} mm; terrain ${LAYERS.ground} m, lowest layer ${lowest.toFixed(3)} m`,
  );
  for (const [pairKey, e] of [...pairs].sort())
    console.log(
      `  ${pairKey.padEnd(26)} ${String(e.overlaps).padStart(6)} overlapping triangle pairs,` +
        ` min gap ${(e.minGap * 1000).toFixed(1)} mm${e.below ? `, ${e.below} below the minimum` : ''}`,
    );
  check(lowest - LAYERS.ground >= MIN_LAYER_GAP, `a layer lies within ${MIN_LAYER_GAP} m of the terrain`);
  for (const [pairKey, e] of pairs)
    check(e.below === 0, `layers ${pairKey}: ${e.below} overlaps closer than ${MIN_LAYER_GAP} m`);
  const material = (key) => ctx.materials[key];
  for (const key of ['rubber', 'line'])
    console.log(
      `  polygonOffset ${key}: ${material(key).polygonOffset ? `${material(key).polygonOffsetFactor}/${material(key).polygonOffsetUnits}` : 'off'}`,
    );
  check(
    material('rubber').polygonOffset && material('line').polygonOffset,
    'decal materials lack polygonOffset',
  );
}

// --- highlight --------------------------------------------------------------------------------------
{
  const geometry = highlight.mesh.geometry;
  const position = geometry.attributes.position;
  const arc = geometry.attributes.aArc;
  const pairs = position.count / 2;
  let offLine = 0;
  let shortest = Infinity;
  let arcBackwards = 0;
  let minY = Infinity;
  for (let k = 0; k < pairs; k++) {
    const i = k % line.count;
    const mx = (position.getX(2 * k) + position.getX(2 * k + 1)) / 2;
    const mz = (position.getZ(2 * k) + position.getZ(2 * k + 1)) / 2;
    offLine = Math.max(offLine, Math.hypot(mx - line.x[i], mz - line.z[i]));
    minY = Math.min(minY, position.getY(2 * k), position.getY(2 * k + 1));
    if (k > 0) {
      const px = (position.getX(2 * k - 2) + position.getX(2 * k - 1)) / 2;
      const pz = (position.getZ(2 * k - 2) + position.getZ(2 * k - 1)) / 2;
      shortest = Math.min(shortest, Math.hypot(mx - px, mz - pz));
      if (!(arc.getX(2 * k) > arc.getX(2 * k - 2))) arcBackwards++;
    }
  }
  const tris = triangles(highlight.mesh);
  const down = tris.filter((t) => !(t.geometric.y > 0)).length;
  console.log(
    `highlight: ${pairs} vertex pairs, ${tris.length} triangles facing down ${down}, centre off the model line` +
      ` ${offLine.toFixed(4)} m, shortest segment ${shortest.toFixed(3)} m, arc ${arc.getX(0)}..${arc.getX(position.count - 1)}` +
      ` (backwards ${arcBackwards}), lowest point ${minY.toFixed(3)} m vs asphalt ${LAYERS.asphalt} m`,
  );
  check(down === 0, `highlight: ${down} triangles face down`);
  check(offLine < 1e-3, `highlight: off the model centre line by ${offLine} m`);
  check(shortest > 0.5, `highlight: a ${shortest} m segment (duplicated seam point?)`);
  check(
    arcBackwards === 0 && arc.getX(0) === 0 && arc.getX(position.count - 1) === 1,
    'highlight: arc parameter',
  );
  check(minY >= LAYERS.asphalt + MIN_LAYER_GAP, 'highlight: not above the asphalt');
  check(
    highlight.mesh.material.depthTest && highlight.mesh.material.polygonOffset,
    'highlight: depth test/offset',
  );

  // reveal head: a scroll step from 0.34 to 0.37 played at 30, 60, 120 and 240 fps; the head positions
  // after the same elapsed times must agree (frame-rate independent), its speed stays bounded, and
  // a snap (renderAt) lands on the target
  const play = (fps) => {
    const h = createTrackHighlight(ctx.root.userData.trackModel);
    const uniforms = {};
    h.mesh.material.onBeforeCompile({ uniforms, vertexShader: '', fragmentShader: '' });
    h.update(0.34, 0, true);
    const samples = [];
    let speed = 0;
    let previous = uniforms.uHead.value;
    for (let frame = 1; frame <= Math.round(fps * 1.2); frame++) {
      h.update(0.37, 1 / fps);
      speed = Math.max(speed, ((uniforms.uHead.value - previous) * fps) / (1 + uniforms.uFeather.value));
      previous = uniforms.uHead.value;
      if (frame % Math.round(fps / 10) === 0) samples.push(uniforms.uHead.value);
    }
    h.update(0.37, 0, true);
    return { samples, speed, snapped: uniforms.uHead.value };
  };
  const runs = [30, 60, 120, 240].map(play);
  let spread = 0;
  for (let k = 0; k < runs[0].samples.length; k++)
    spread = Math.max(spread, ...runs.map((r) => Math.abs(r.samples[k] - runs[1].samples[k])));
  const maxSpeed = Math.max(...runs.map((r) => r.speed));
  console.log(
    `highlight reveal: 0.34 -> 0.37 step, head after 0.1..1.2 s differs by <= ${(spread * line.length).toFixed(1)} m` +
      ` between 30/60/120/240 fps; top speed ${maxSpeed.toFixed(2)} laps/s (${(maxSpeed * line.length).toFixed(0)} m/s);` +
      ` head at 0.1 s ${(runs[1].samples[0] * line.length).toFixed(0)} m, snapped ${(runs[1].snapped * line.length).toFixed(0)} m`,
  );
  check(spread * line.length < 15, `highlight reveal depends on the frame rate (${spread * line.length} m)`);
  check(maxSpeed <= 0.95, `highlight head too fast (${maxSpeed} laps/s)`);
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
