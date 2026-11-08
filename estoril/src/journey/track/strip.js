// Ribbon geometry that follows the track centre line at signed lateral offsets.
//
// Conventions
//   - The centre line is an array of THREE.Vector2 with .x = world x and .y = world z (metres).
//   - At every centre-line point the lateral direction is the unit RIGHT-hand normal of the local
//     tangent, (-tangentZ, tangentX) in XZ, where the tangent is the central difference of the two
//     neighbouring points. With y up this points to the right of the direction of travel
//     (increasing point index): positive offsets are right of the centre line, negative left.
//   - No mitre correction is applied: each edge vertex is simply point + normal * offset, so at
//     sharp bends the ribbon narrows slightly and, on the inside of a bend whose radius is smaller
//     than |offset|, the edge folds back over itself.
//   - v (along the ribbon) is the CENTRE-LINE distance, for both edges, so textures stretch on the
//     outside of bends and compress on the inside.
//
// Winding and normals
//   Every strip faces up (+y) whatever the order of its offsets: the triangle order is chosen from
//   the sign of offsetA - offsetB at the first point (ribbonIndices). Normals are written
//   explicitly instead of being averaged from the faces: (0, 1, 0) on a flat strip; on a cambered
//   one (heightA != heightB) the normal of its cross-slope, tilted away from the higher edge.
//   Barrier walls are closed slabs (track-side face, back face, top); the track-side face looks at
//   the centre line.
import { BufferGeometry, Float32BufferAttribute } from 'three';

/** Wraps an index (possibly negative or past the end) into [0, count). */
var wrapIndex = (index, count) => ((index % count) + count) % count;

/** Offset value: a number, or a function of the wrapped centre-line index. */
var offsetAt = (offset, index) => (typeof offset == 'function' ? offset(index) : offset);

/**
 * Walks centre-line points `first`..`last` (inclusive; indices wrap around the closed loop) and
 * calls visit(pointIndex, point, normalX, normalZ, distance), where (normalX, normalZ) is the unit
 * right-hand normal and `distance` the centre-line length travelled since `first` (metres).
 */
function walkCentreLine(centre, first, last, visit) {
  let count = centre.length,
    distance = 0;
  for (let step = first; step <= last; step++) {
    let index = wrapIndex(step, count),
      point = centre[index],
      next = centre[(index + 1) % count],
      previous = centre[(index - 1 + count) % count],
      tangentX = next.x - previous.x,
      tangentZ = next.y - previous.y,
      tangentLength = Math.hypot(tangentX, tangentZ) || 1;
    ((tangentX /= tangentLength), (tangentZ /= tangentLength));
    if (step > first) {
      let before = centre[wrapIndex(step - 1, count)];
      distance += Math.hypot(point.x - before.x, point.y - before.y);
    }
    visit(index, point, -tangentZ, tangentX, distance);
  }
}

/**
 * Appends the triangle indices of `segmentCount` quads over vertex pairs starting at `base`
 * (vertex 2k = edge A, 2k + 1 = edge B of point k). For travel direction T and the edge vector
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

function ribbonGeometry(positions, normals, uvs, indices) {
  let geometry = new BufferGeometry();
  return (
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3)),
    geometry.setAttribute('normal', new Float32BufferAttribute(normals, 3)),
    geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2)),
    geometry.setIndex(indices),
    geometry
  );
}

/**
 * A flat (or slightly cambered) ribbon between two lateral offsets of the centre line. It faces
 * up whatever the order of the offsets.
 *
 * @param {import('three').Vector2[]} centre centre line (x, z)
 * @param {number | ((pointIndex: number) => number)} offsetA lateral offset of edge A, metres
 *   (positive = right of travel); a function receives the wrapped centre-line index
 * @param {number | ((pointIndex: number) => number)} offsetB lateral offset of edge B; the order
 *   of the two offsets must not change along the strip
 * @param {object} [options]
 * @param {boolean} [options.closed=true] include the closing segment back to point 0 (ignored
 *   when segRange is given)
 * @param {number} [options.y=0] base height of the ribbon, metres
 * @param {number} [options.vScale=1] texture v per metre of centre line
 * @param {[number, number]} [options.uvAcross=[0, 1]] u at edge A and at edge B
 * @param {number} [options.heightA=0] extra height of edge A (camber), metres
 * @param {number} [options.heightB=0] extra height of edge B, metres
 * @param {[number, number] | null} [options.segRange=null] first and last centre-line point
 *   (inclusive; may run past the ends, indices wrap)
 * @returns {BufferGeometry} indexed geometry with position, normal and uv
 */
function buildStrip(
  centre,
  offsetA,
  offsetB,
  { closed = true, y = 0, vScale = 1, uvAcross = [0, 1], heightA = 0, heightB = 0, segRange = null } = {},
) {
  let count = centre.length,
    positions = [],
    normals = [],
    uvs = [],
    first = segRange ? segRange[0] : 0,
    last = segRange ? segRange[1] : closed ? count : count - 1,
    firstIndex = wrapIndex(first, count),
    up = offsetAt(offsetA, firstIndex) > offsetAt(offsetB, firstIndex);
  walkCentreLine(centre, first, last, (index, point, normalX, normalZ, distance) => {
    let edgeA = offsetAt(offsetA, index),
      edgeB = offsetAt(offsetB, index);
    positions.push(
      point.x + normalX * edgeA,
      y + heightA,
      point.y + normalZ * edgeA,
      point.x + normalX * edgeB,
      y + heightB,
      point.y + normalZ * edgeB,
    );
    // cross-slope from edge A to edge B; the normal tilts away from the higher edge
    let slope = (heightB - heightA) / (Math.abs(edgeB - edgeA) || 1),
      towardsB = edgeB > edgeA ? 1 : -1,
      length = Math.hypot(slope, 1),
      nx = (-slope * towardsB * normalX) / length,
      nz = (-slope * towardsB * normalZ) / length;
    normals.push(nx, 1 / length, nz, nx, 1 / length, nz);
    uvs.push(uvAcross[0], distance * vScale, uvAcross[1], distance * vScale);
  });
  return ribbonGeometry(positions, normals, uvs, ribbonIndices(last - first, up));
}

/** Thickness of a barrier wall (metres), measured away from the track. */
var WALL_THICKNESS = 0.3;

/**
 * A barrier wall standing on the ground (y = 0) along one lateral offset of the centre line: a
 * closed slab WALL_THICKNESS thick whose track-side face lies on the offset and looks at the
 * centre line, plus a back face looking away and a top. Normals are horizontal on the faces and
 * +y on the top; the ends are open.
 *
 * @param {import('three').Vector2[]} centre centre line (x, z)
 * @param {(pointIndex: number) => number} offset lateral offset of the track-side face, metres
 *   (positive = right); its sign must not change along the range
 * @param {[number, number]} range first and last centre-line point (inclusive, indices wrap)
 * @param {number} height wall height, metres
 * @param {number} uScale texture u per metre of centre line (v runs 0 at the foot to 1 at the top)
 */
function buildBarrierWall(centre, offset, [first, last], height, uScale) {
  let positions = [],
    normals = [],
    uvs = [],
    indices = [],
    side = Math.sign(offset(wrapIndex(first, centre.length))) || 1,
    // [extra offset of edge A, of edge B (away from the track), y of A, y of B, v of A, v of B,
    //  outward normal: -1 towards the centre line, +1 away from it, 0 up]
    faces = [
      [0, 0, 0, height, 0, 1, -1], // track side
      [WALL_THICKNESS, WALL_THICKNESS, height, 0, 1, 0, 1], // back
      [0, WALL_THICKNESS, height, height, 0.96, 1, 0], // top
    ];
  for (let [extraA, extraB, yA, yB, vA, vB, facing] of faces) {
    let base = positions.length / 3;
    walkCentreLine(centre, first, last, (index, point, normalX, normalZ, distance) => {
      let lateralA = offset(index) + side * extraA,
        lateralB = offset(index) + side * extraB;
      positions.push(
        point.x + normalX * lateralA,
        yA,
        point.y + normalZ * lateralA,
        point.x + normalX * lateralB,
        yB,
        point.y + normalZ * lateralB,
      );
      let nx = facing * side * normalX,
        nz = facing * side * normalZ,
        ny = facing ? 0 : 1;
      normals.push(nx, ny, nz, nx, ny, nz);
      uvs.push(distance * uScale, vA, distance * uScale, vB);
    });
    // for all three faces (A->B up the track side, down the back, outwards on top) the face normal
    // T × (B - A) points the wanted way exactly when the wall is on the left (side < 0)
    ribbonIndices(last - first, side < 0, base, indices);
  }
  return ribbonGeometry(positions, normals, uvs, indices);
}

export { buildBarrierWall, buildStrip };
