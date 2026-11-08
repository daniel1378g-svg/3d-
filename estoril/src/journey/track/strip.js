// Ribbon geometry that follows the track centre line at signed lateral offsets.
//
// Conventions
//   - Strips are built on the shared track model (world/track-analysis.js createTrackModel): a
//     closed centre line resampled every metre with unit tangents and RIGHT-hand normals
//     (-tangentZ, tangentX) in XZ. Positive offsets are right of the direction of travel
//     (increasing sample index), negative left.
//   - Every edge vertex is centre + normal * model.edge(i, offset): on the inside of a bend the
//     offset is clamped to a fraction of the local radius (see track-analysis.js), so edges never
//     fold. As a safety net an edge vertex that would not advance along the local tangent by at
//     least MIN_ADVANCE is held on the previous one, and a quad that is still inverted is
//     collapsed; geometry.userData.repairs counts both (0 on the current track).
//   - v (along the ribbon) is the CENTRE-LINE distance, for both edges, so textures stretch on the
//     outside of bends and compress on the inside.
//   - Offsets are numbers or functions (sampleIndex, step) => metres, where sampleIndex is wrapped
//     into the loop and step is the unwrapped sample number from the start of the range (for
//     tapers). Open strips end with a square cut along the normal of their first and last sample.
//
// Winding and normals
//   Every strip faces up (+y) whatever the order of its offsets: the triangle order is chosen from
//   the sign of offsetA - offsetB at the first sample (ribbonIndices). Normals are written
//   explicitly instead of being averaged from the faces: (0, 1, 0) on a flat strip; on a cambered
//   one (heightA != heightB) the normal of its cross-slope, tilted away from the higher edge.
//   Barrier walls are closed slabs (track-side face, back face, top, square end caps); the
//   track-side face looks at the centre line.
import { BufferGeometry, Float32BufferAttribute } from 'three';

/** An edge vertex must advance at least this far (metres) along the tangent, or it is held. */
const MIN_ADVANCE = 0.01;
/** Thickness of a barrier wall (metres), measured away from the track. */
const WALL_THICKNESS = 0.3;

/** Wraps an index (possibly negative or past the end) into [0, count). */
var wrapIndex = (index, count) => ((index % count) + count) % count;

/** Offset value: a number, or a function of (wrapped sample index, unwrapped step). */
var offsetAt = (offset, index, step) => (typeof offset == 'function' ? offset(index, step) : offset);

/**
 * Plan positions of one edge (x, z interleaved) for steps first..last, with the inside-of-bend
 * clamp and the forward-only guard. Returns { points, offsets, held }.
 */
function edgeLine(model, offset, first, last) {
  const { line } = model;
  const n = last - first + 1;
  const points = new Float64Array(n * 2);
  const offsets = new Float64Array(n);
  let held = 0;
  for (let k = 0; k < n; k++) {
    const i = wrapIndex(first + k, line.count);
    const o = model.edge(i, offsetAt(offset, i, first + k));
    offsets[k] = o;
    let x = line.x[i] + line.nx[i] * o;
    let z = line.z[i] + line.nz[i] * o;
    if (k > 0) {
      const advance = (x - points[2 * k - 2]) * line.tx[i] + (z - points[2 * k - 1]) * line.tz[i];
      if (advance < MIN_ADVANCE) {
        x = points[2 * k - 2];
        z = points[2 * k - 1];
        held++;
      }
    }
    points[2 * k] = x;
    points[2 * k + 1] = z;
  }
  return { points, offsets, held };
}

/**
 * Collapses every quad k (edges a, b between steps k and k + 1) whose triangles do not both have
 * the orientation `sign` in plan (signed XZ area): its far vertex pair is moved onto the near one.
 * Returns the number of collapsed quads.
 */
function collapseInverted(a, b, sign) {
  const area = (ax, az, bx, bz, cx, cz) => (bz - az) * (cx - ax) - (bx - ax) * (cz - az);
  let collapsed = 0;
  for (let k = 0; k + 1 < a.length / 2; k++) {
    const [a0x, a0z, a1x, a1z] = [a[2 * k], a[2 * k + 1], a[2 * k + 2], a[2 * k + 3]];
    const [b0x, b0z, b1x, b1z] = [b[2 * k], b[2 * k + 1], b[2 * k + 2], b[2 * k + 3]];
    // the two triangles (A_k, A_k+1, B_k) and (B_k, A_k+1, B_k+1); y of their normal is the area
    const t1 = area(a0x, a0z, a1x, a1z, b0x, b0z);
    const t2 = area(b0x, b0z, a1x, a1z, b1x, b1z);
    if (t1 * sign < -1e-9 || t2 * sign < -1e-9) {
      a[2 * k + 2] = a0x;
      a[2 * k + 3] = a0z;
      b[2 * k + 2] = b0x;
      b[2 * k + 3] = b0z;
      collapsed++;
    }
  }
  return collapsed;
}

/**
 * Appends the triangle indices of `segmentCount` quads over vertex pairs starting at `base`
 * (vertex 2k = edge A, 2k + 1 = edge B of step k). For travel direction T and the edge vector
 * E = B_k - A_k, the order (A_k, A_k+1, B_k), (B_k, A_k+1, B_k+1) gives the face normal T × E;
 * `forward` = false gives the mirrored order (normal -T × E). For a flat strip T × E points up
 * exactly when edge A lies right of edge B (offsetA > offsetB).
 */
function ribbonIndices(segmentCount, forward, base = 0, indices = []) {
  for (let segment = 0; segment < segmentCount; segment++) {
    let pair = base + segment * 2;
    if (forward) indices.push(pair, pair + 2, pair + 1, pair + 1, pair + 2, pair + 3);
    else indices.push(pair, pair + 1, pair + 2, pair + 1, pair + 3, pair + 2);
  }
  return indices;
}

/**
 * userData.range is the [first, last] sample range (vertex pair k of every face belongs to sample
 * first + k) and userData.repairs the guard counts; scripts/test-geometry.mjs reads both.
 */
function ribbonGeometry(positions, normals, uvs, indices, range, repairs) {
  let geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.userData.range = range;
  geometry.userData.repairs = repairs;
  return geometry;
}

/** First and last unwrapped step of a strip: the whole closed loop, or `range`. */
var stepRange = (model, range) => (range ? range : [0, model.line.count]);

/**
 * A flat (or slightly cambered) ribbon between two lateral offsets of the centre line. It faces
 * up whatever the order of the offsets.
 *
 * @param {object} model the track model (createTrackModel)
 * @param {number | ((sampleIndex: number, step: number) => number)} offsetA lateral offset of edge
 *   A, metres (positive = right of travel)
 * @param {number | ((sampleIndex: number, step: number) => number)} offsetB lateral offset of edge
 *   B; the order of the two offsets must not change along the strip
 * @param {object} [options]
 * @param {[number, number] | null} [options.range=null] first and last sample (inclusive,
 *   unwrapped: may run past the end of the loop); null = the closed loop
 * @param {number} [options.y=0] base height of the ribbon, metres
 * @param {number} [options.vScale=1] texture v per metre of centre line
 * @param {[number, number]} [options.uvAcross=[0, 1]] u at edge A and at edge B
 * @param {number} [options.heightA=0] extra height of edge A (camber), metres
 * @param {number} [options.heightB=0] extra height of edge B, metres
 * @param {number | null} [options.skirtB=null] if set, a vertical riser hangs from edge B down to
 *   this height (y, metres), facing away from edge A: it closes the step to a lower neighbour
 * @returns {BufferGeometry} indexed geometry with position, normal and uv
 */
function buildStrip(
  model,
  offsetA,
  offsetB,
  { range = null, y = 0, vScale = 1, uvAcross = [0, 1], heightA = 0, heightB = 0, skirtB = null } = {},
) {
  const { line } = model;
  const [first, last] = stepRange(model, range);
  const firstIndex = wrapIndex(first, line.count);
  const up = offsetAt(offsetA, firstIndex, first) > offsetAt(offsetB, firstIndex, first);
  const edgeA = edgeLine(model, offsetA, first, last);
  const edgeB = edgeLine(model, offsetB, first, last);
  const collapsed = collapseInverted(edgeA.points, edgeB.points, up ? 1 : -1);
  const positions = [];
  const normals = [];
  const uvs = [];
  for (let k = 0; k <= last - first; k++) {
    const i = wrapIndex(first + k, line.count);
    const oA = edgeA.offsets[k];
    const oB = edgeB.offsets[k];
    positions.push(
      edgeA.points[2 * k],
      y + heightA,
      edgeA.points[2 * k + 1],
      edgeB.points[2 * k],
      y + heightB,
      edgeB.points[2 * k + 1],
    );
    // cross-slope from edge A to edge B; the normal tilts away from the higher edge
    const slope = (heightB - heightA) / (Math.abs(oB - oA) || 1);
    const towardsB = oB > oA ? 1 : -1;
    const length = Math.hypot(slope, 1);
    const nx = (-slope * towardsB * line.nx[i]) / length;
    const nz = (-slope * towardsB * line.nz[i]) / length;
    normals.push(nx, 1 / length, nz, nx, 1 / length, nz);
    const v = k * line.spacing * vScale;
    uvs.push(uvAcross[0], v, uvAcross[1], v);
  }
  const indices = ribbonIndices(last - first, up);
  if (skirtB !== null) {
    // riser: vertex pairs (edge B at its height, edge B at skirtB), normal pointing from A to B
    const base = positions.length / 3;
    const towardsB = edgeB.offsets[0] > edgeA.offsets[0] ? 1 : -1;
    for (let k = 0; k <= last - first; k++) {
      const i = wrapIndex(first + k, line.count);
      const x = edgeB.points[2 * k];
      const z = edgeB.points[2 * k + 1];
      positions.push(x, y + heightB, z, x, skirtB, z);
      const nx = towardsB * line.nx[i];
      const nz = towardsB * line.nz[i];
      normals.push(nx, 0, nz, nx, 0, nz);
      const v = k * line.spacing * vScale;
      uvs.push(uvAcross[1], v, uvAcross[1], v);
    }
    // the face normal T × (bottom - top) = -N points the wanted way when edge B is left of A
    ribbonIndices(last - first, towardsB < 0, base, indices);
  }
  return ribbonGeometry(positions, normals, uvs, indices, [first, last], {
    held: edgeA.held + edgeB.held,
    collapsed,
  });
}

/**
 * A barrier wall standing on the ground (y = 0) along one lateral offset of the centre line: a
 * closed slab WALL_THICKNESS thick whose track-side face lies on the offset and looks at the
 * centre line, plus a back face looking away, a top and a square cap at each end (along the
 * normal of the first and last sample). Normals are horizontal on the faces and caps and +y on the
 * top.
 *
 * @param {object} model the track model (createTrackModel)
 * @param {number | ((sampleIndex: number, step: number) => number)} offset lateral offset of the
 *   track-side face, metres (positive = right); its sign must not change along the range
 * @param {[number, number]} range first and last sample (inclusive, unwrapped)
 * @param {number} height wall height, metres
 * @param {number} uScale texture u per metre of centre line (v runs 0 at the foot to 1 at the top)
 */
function buildBarrierWall(model, offset, [first, last], height, uScale) {
  const { line } = model;
  const side = Math.sign(offsetAt(offset, wrapIndex(first, line.count), first)) || 1;
  const front = edgeLine(model, offset, first, last);
  const back = edgeLine(model, (i, step) => offsetAt(offset, i, step) + side * WALL_THICKNESS, first, last);
  const collapsed = collapseInverted(front.points, back.points, -side);
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];
  // [edge A plan line, edge B plan line, y of A, y of B, v of A, v of B,
  //  outward normal: -1 towards the centre line, +1 away from it, 0 up]
  const faces = [
    [front, front, 0, height, 0, 1, -1], // track side
    [back, back, height, 0, 1, 0, 1], // back
    [front, back, height, height, 0.96, 1, 0], // top
  ];
  for (const [a, b, yA, yB, vA, vB, facing] of faces) {
    const base = positions.length / 3;
    for (let k = 0; k <= last - first; k++) {
      const i = wrapIndex(first + k, line.count);
      positions.push(a.points[2 * k], yA, a.points[2 * k + 1], b.points[2 * k], yB, b.points[2 * k + 1]);
      const nx = facing * side * line.nx[i];
      const nz = facing * side * line.nz[i];
      const ny = facing ? 0 : 1;
      normals.push(nx, ny, nz, nx, ny, nz);
      const u = k * line.spacing * uScale;
      uvs.push(u, vA, u, vB);
    }
    // for all three faces (A->B up the track side, down the back, outwards on top) the face normal
    // T × (B - A) points the wanted way exactly when the wall is on the left (side < 0)
    ribbonIndices(last - first, side < 0, base, indices);
  }
  // end caps: square cuts along the normal of the first and last sample, facing back / forward
  for (const [k, facing] of [
    [0, -1],
    [last - first, 1],
  ]) {
    const i = wrapIndex(first + k, line.count);
    const base = positions.length / 3;
    const [fx, fz, bx, bz] = [
      front.points[2 * k],
      front.points[2 * k + 1],
      back.points[2 * k],
      back.points[2 * k + 1],
    ];
    positions.push(fx, 0, fz, fx, height, fz, bx, height, bz, bx, 0, bz);
    const nx = facing * line.tx[i];
    const nz = facing * line.tz[i];
    normals.push(nx, 0, nz, nx, 0, nz, nx, 0, nz, nx, 0, nz);
    const u = WALL_THICKNESS * uScale;
    uvs.push(0, 0, 0, 1, u, 1, u, 0);
    // (front foot, front top, back top) has the face normal up × (back - front) = side × tangent
    if (side * facing > 0) indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
    else indices.push(base, base + 2, base + 1, base, base + 3, base + 2);
  }
  return ribbonGeometry(positions, normals, uvs, indices, [first, last], {
    held: front.held + back.held,
    collapsed,
  });
}

export { WALL_THICKNESS, buildBarrierWall, buildStrip };
