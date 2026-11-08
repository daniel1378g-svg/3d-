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
// Winding
//   Every segment k is two triangles (A_k, A_k+1, B_k) and (B_k, A_k+1, B_k+1), where A is the
//   offsetA edge and B the offsetB edge. The front face (and the normals computeVertexNormals
//   produces) points UP (+y) only when offsetB < offsetA, i.e. when the B edge lies to the left of
//   the A edge. A strip with offsetB > offsetA faces DOWN, so a FrontSide material culls it when
//   seen from above.
import { BufferGeometry, Float32BufferAttribute } from 'three';

/** Wraps an index (possibly negative or past the end) into [0, count). */
var wrapIndex = (index, count) => ((index % count) + count) % count;

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

/** Triangle indices for `segmentCount` quads over vertex pairs (2k = A/bottom, 2k + 1 = B/top). */
function ribbonIndices(segmentCount) {
  let indices = [];
  for (let segment = 0; segment < segmentCount; segment++) {
    let pair = segment * 2;
    indices.push(pair, pair + 2, pair + 1, pair + 1, pair + 2, pair + 3);
  }
  return indices;
}

function ribbonGeometry(positions, uvs, indices) {
  let geometry = new BufferGeometry();
  return (
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3)),
    geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2)),
    geometry.setIndex(indices),
    geometry.computeVertexNormals(),
    geometry
  );
}

/**
 * A flat (or slightly cambered) ribbon between two lateral offsets of the centre line.
 *
 * @param {import('three').Vector2[]} centre centre line (x, z)
 * @param {number | ((pointIndex: number) => number)} offsetA lateral offset of edge A, metres
 *   (positive = right of travel); a function receives the wrapped centre-line index
 * @param {number | ((pointIndex: number) => number)} offsetB lateral offset of edge B. The strip
 *   faces up only if offsetB < offsetA (see the header comment)
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
 * @returns {BufferGeometry} indexed geometry with position, uv and computed normals
 */
function buildStrip(
  centre,
  offsetA,
  offsetB,
  { closed = true, y = 0, vScale = 1, uvAcross = [0, 1], heightA = 0, heightB = 0, segRange = null } = {},
) {
  let count = centre.length,
    positions = [],
    uvs = [],
    first = segRange ? segRange[0] : 0,
    last = segRange ? segRange[1] : closed ? count : count - 1;
  walkCentreLine(centre, first, last, (index, point, normalX, normalZ, distance) => {
    let edgeA = typeof offsetA == 'function' ? offsetA(index) : offsetA,
      edgeB = typeof offsetB == 'function' ? offsetB(index) : offsetB;
    positions.push(
      point.x + normalX * edgeA,
      y + heightA,
      point.y + normalZ * edgeA,
      point.x + normalX * edgeB,
      y + heightB,
      point.y + normalZ * edgeB,
    );
    uvs.push(uvAcross[0], distance * vScale, uvAcross[1], distance * vScale);
  });
  return ribbonGeometry(positions, uvs, ribbonIndices(last - first));
}

/**
 * A vertical wall standing on the ground (y = 0) along one lateral offset of the centre line.
 * Its front face points to the RIGHT of the direction of travel (+normal) whatever the sign of
 * the offset, i.e. towards the track only for walls on the left (negative offsets).
 *
 * @param {import('three').Vector2[]} centre centre line (x, z)
 * @param {(pointIndex: number) => number} offset lateral offset, metres (positive = right)
 * @param {[number, number]} range first and last centre-line point (inclusive, indices wrap)
 * @param {number} height wall height, metres
 * @param {number} uScale texture u per metre of centre line (v runs 0 at the foot to 1 at the top)
 */
function buildBarrierWall(centre, offset, [first, last], height, uScale) {
  let positions = [],
    uvs = [];
  walkCentreLine(centre, first, last, (index, point, normalX, normalZ, distance) => {
    let lateral = offset(index);
    positions.push(
      point.x + normalX * lateral,
      0,
      point.y + normalZ * lateral,
      point.x + normalX * lateral,
      height,
      point.y + normalZ * lateral,
    );
    uvs.push(distance * uScale, 0, distance * uScale, 1);
  });
  return ribbonGeometry(positions, uvs, ribbonIndices(last - first));
}

export { buildBarrierWall, buildStrip };
