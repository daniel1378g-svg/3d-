// Where the ground is already taken, for placing vegetation (build time only, never per frame).
//
// Built from the world as it stands (after the track, pits, grandstand, paddock and props): every
// mesh is reduced to plan (XZ) triangles, either its own (large flat layers and long walls) or the
// two of its world bounding-box footprint (buildings, props, every instance of an InstancedMesh),
// in two classes:
//   track  the track asphalt (the material passed as trackMaterial)
//   solid  everything else that stands on or covers the ground: kerbs, run-off, gravel, barrier
//          walls, pit lane and paddock asphalt, roads, buildings, fences, props
// Skipped: the subtrees passed in `skip` (terrain, hills), decals (transparent without depth writes:
// AO strips, contact shadows, the rubber line, the fence veil), materials flagged
// userData.envSkipOccupancy (painted lines: they lie on asphalt).
//
// Queries come in two strengths:
//   - a CELL-metre grid per class, rasterised conservatively (a cell is marked when its centre is
//     within half a cell diagonal of a triangle) and turned into a chamfer distance field, gives a
//     lower and an upper bound of the true distance in O(1);
//   - exact distances from a bucket grid of the same triangles (typed arrays, a visit stamp per
//     triangle, so a query allocates nothing), used only when the bounds cannot decide.
// clear(x, z, trackClearance, solidClearance) is therefore exact, and cheap for the many points that
// are far from everything. infield(x, z) tells whether a point lies inside the circuit loop.
import { Box3, Matrix4, Vector3 } from 'three';

/** Distance-field cell and the margin (metres) of the grid around everything indexed. */
const CELL = 2;
const MARGIN = 120;
/** Bucket size (metres) of the exact index. */
const BUCKET = 8;
/** Meshes wider than this (metres) are indexed triangle by triangle instead of by their footprint. */
const LARGE = 60;
/** Chamfer (1, √2) overestimates Euclidean distance by at most this factor. */
const CHAMFER = 1.0824;
/**
 * Rasterisation: a cell is marked when its centre lies within R (half a cell) of the triangle in x
 * AND in z, i.e. every cell the triangle touches is marked, and every marked centre lies within half
 * a cell diagonal of the triangle.
 */
const R = CELL / 2;
const HALF_DIAGONAL = CELL * Math.SQRT1_2;

/** Distance from (px, pz) to the segment (ax, az)–(bx, bz). */
function segmentDistance(px, pz, ax, az, bx, bz) {
  const dx = bx - ax;
  const dz = bz - az;
  const l2 = dx * dx + dz * dz;
  const t = l2 > 0 ? Math.max(0, Math.min(1, ((px - ax) * dx + (pz - az) * dz) / l2)) : 0;
  const ex = px - ax - t * dx;
  const ez = pz - az - t * dz;
  return Math.sqrt(ex * ex + ez * ez);
}

/** Distance from (px, pz) to a plan triangle (0 inside); degenerate triangles act as segments. */
function triangleDistance(px, pz, ax, az, bx, bz, cx, cz) {
  const area = (bx - ax) * (cz - az) - (cx - ax) * (bz - az);
  if (Math.abs(area) > 1e-9) {
    const s = area > 0 ? 1 : -1;
    const e0 = ((bx - ax) * (pz - az) - (px - ax) * (bz - az)) * s;
    const e1 = ((cx - bx) * (pz - bz) - (px - bx) * (cz - bz)) * s;
    const e2 = ((ax - cx) * (pz - cz) - (px - cx) * (az - cz)) * s;
    if (e0 >= 0 && e1 >= 0 && e2 >= 0) return 0;
  }
  return Math.min(
    segmentDistance(px, pz, ax, az, bx, bz),
    segmentDistance(px, pz, bx, bz, cx, cz),
    segmentDistance(px, pz, cx, cz, ax, az),
  );
}

/** Two-pass (1, √2) chamfer distance transform of a mask, in cells (Infinity where nothing). */
function chamfer(mask, width, height) {
  const d = new Float32Array(width * height);
  for (let i = 0; i < d.length; i++) d[i] = mask[i] ? 0 : Infinity;
  const D = Math.SQRT2;
  for (let z = 0; z < height; z++)
    for (let x = 0; x < width; x++) {
      const i = z * width + x;
      let v = d[i];
      if (x > 0) v = Math.min(v, d[i - 1] + 1);
      if (z > 0) {
        v = Math.min(v, d[i - width] + 1);
        if (x > 0) v = Math.min(v, d[i - width - 1] + D);
        if (x < width - 1) v = Math.min(v, d[i - width + 1] + D);
      }
      d[i] = v;
    }
  for (let z = height - 1; z >= 0; z--)
    for (let x = width - 1; x >= 0; x--) {
      const i = z * width + x;
      let v = d[i];
      if (x < width - 1) v = Math.min(v, d[i + 1] + 1);
      if (z < height - 1) {
        v = Math.min(v, d[i + width] + 1);
        if (x < width - 1) v = Math.min(v, d[i + width + 1] + D);
        if (x > 0) v = Math.min(v, d[i + width - 1] + D);
      }
      d[i] = v;
    }
  return d;
}

/** Exact plan-distance index over triangles (6 numbers each) in BUCKET-metre buckets. */
function createExactIndex(tris, x0, z0, x1, z1) {
  const count = tris.length / 6;
  const columns = Math.ceil((x1 - x0) / BUCKET);
  const rows = Math.ceil((z1 - z0) / BUCKET);
  // bucket range of every triangle: c0, c1, r0, r1
  const ranges = new Int32Array(count * 4);
  for (let k = 0, o = 0; k < count; k++, o += 6) {
    ranges[4 * k] = Math.max(0, Math.floor((Math.min(tris[o], tris[o + 2], tris[o + 4]) - x0) / BUCKET));
    ranges[4 * k + 1] = Math.min(
      columns - 1,
      Math.floor((Math.max(tris[o], tris[o + 2], tris[o + 4]) - x0) / BUCKET),
    );
    ranges[4 * k + 2] = Math.max(
      0,
      Math.floor((Math.min(tris[o + 1], tris[o + 3], tris[o + 5]) - z0) / BUCKET),
    );
    ranges[4 * k + 3] = Math.min(
      rows - 1,
      Math.floor((Math.max(tris[o + 1], tris[o + 3], tris[o + 5]) - z0) / BUCKET),
    );
  }
  const start = new Int32Array(columns * rows + 1);
  for (let k = 0; k < count; k++)
    for (let r = ranges[4 * k + 2]; r <= ranges[4 * k + 3]; r++)
      for (let c = ranges[4 * k]; c <= ranges[4 * k + 1]; c++) start[r * columns + c + 1]++;
  for (let b = 0; b < columns * rows; b++) start[b + 1] += start[b];
  const items = new Int32Array(start[columns * rows]);
  const fill = start.slice(0, columns * rows);
  for (let k = 0; k < count; k++)
    for (let r = ranges[4 * k + 2]; r <= ranges[4 * k + 3]; r++)
      for (let c = ranges[4 * k]; c <= ranges[4 * k + 1]; c++) items[fill[r * columns + c]++] = k;
  const stamp = new Uint32Array(count);
  let query = 0;
  /** Smallest distance to a triangle within `reach` of (px, pz) (Infinity if none is that near). */
  return (px, pz, reach) => {
    query++;
    let best = Infinity;
    const c0 = Math.max(0, Math.floor((px - reach - x0) / BUCKET));
    const c1 = Math.min(columns - 1, Math.floor((px + reach - x0) / BUCKET));
    const r0 = Math.max(0, Math.floor((pz - reach - z0) / BUCKET));
    const r1 = Math.min(rows - 1, Math.floor((pz + reach - z0) / BUCKET));
    for (let r = r0; r <= r1; r++)
      for (let c = c0; c <= c1; c++) {
        const b = r * columns + c;
        for (let j = start[b]; j < start[b + 1]; j++) {
          const k = items[j];
          if (stamp[k] === query) continue;
          stamp[k] = query;
          const o = 6 * k;
          const d = triangleDistance(
            px,
            pz,
            tris[o],
            tris[o + 1],
            tris[o + 2],
            tris[o + 3],
            tris[o + 4],
            tris[o + 5],
          );
          if (d < best) best = d;
        }
      }
    return best;
  };
}

/**
 * @param {import('three').Object3D} root the world root, fully built
 * @param {object} options
 * @param {import('three').Material} options.trackMaterial the track asphalt material
 * @param {Set<import('three').Object3D>} [options.skip] subtrees to leave out (terrain, hills…)
 * @param {{x: ArrayLike<number>, z: ArrayLike<number>, count: number}} [options.loop] closed centre
 *   line for infield()
 */
function createOccupancy(root, { trackMaterial, skip = new Set(), loop = null }) {
  root.updateMatrixWorld(true);
  const shapes = { track: [], solid: [] }; // plan triangles, 6 numbers each
  const box = new Box3();
  const matrix = new Matrix4();
  const v = new Vector3();
  const pushRect = (list, b) =>
    list.push(
      b.min.x,
      b.min.z,
      b.max.x,
      b.min.z,
      b.max.x,
      b.max.z,
      b.min.x,
      b.min.z,
      b.max.x,
      b.max.z,
      b.min.x,
      b.max.z,
    );

  const decal = (material) =>
    (material.transparent && !material.depthWrite) || material.userData.envSkipOccupancy;
  const visit = (node) => {
    if (skip.has(node)) return;
    if (node.isMesh && ![].concat(node.material).every(decal)) {
      const list = [].concat(node.material).includes(trackMaterial) ? shapes.track : shapes.solid;
      const geometry = node.geometry;
      if (!geometry.boundingBox) geometry.computeBoundingBox();
      if (node.isInstancedMesh) {
        for (let i = 0; i < node.count; i++) {
          node.getMatrixAt(i, matrix);
          matrix.premultiply(node.matrixWorld);
          pushRect(list, box.copy(geometry.boundingBox).applyMatrix4(matrix));
        }
      } else {
        box.copy(geometry.boundingBox).applyMatrix4(node.matrixWorld);
        if (box.max.x - box.min.x > LARGE || box.max.z - box.min.z > LARGE) {
          const position = geometry.attributes.position;
          const index = geometry.index;
          const corners = index ? index.count : position.count;
          const e = node.matrixWorld.elements;
          for (let k = 0; k < corners - (corners % 3); k++) {
            v.fromBufferAttribute(position, index ? index.getX(k) : k);
            list.push(
              e[0] * v.x + e[4] * v.y + e[8] * v.z + e[12],
              e[2] * v.x + e[6] * v.y + e[10] * v.z + e[14],
            );
          }
        } else pushRect(list, box);
      }
    }
    for (const child of node.children) visit(child);
  };
  visit(root);

  // grid bounds: everything indexed, plus a margin
  let minX = Infinity;
  let minZ = Infinity;
  let maxX = -Infinity;
  let maxZ = -Infinity;
  for (const list of [shapes.track, shapes.solid])
    for (let k = 0; k < list.length; k += 2) {
      minX = Math.min(minX, list[k]);
      maxX = Math.max(maxX, list[k]);
      minZ = Math.min(minZ, list[k + 1]);
      maxZ = Math.max(maxZ, list[k + 1]);
    }
  const x0 = Math.floor((minX - MARGIN) / CELL) * CELL;
  const z0 = Math.floor((minZ - MARGIN) / CELL) * CELL;
  const width = Math.ceil((maxX + MARGIN - x0) / CELL);
  const height = Math.ceil((maxZ + MARGIN - z0) / CELL);
  const x1 = x0 + width * CELL;
  const z1 = z0 + height * CELL;

  const fields = {};
  const exact = {};
  const counts = {};
  for (const kind of ['track', 'solid']) {
    const tris = Float64Array.from(shapes[kind]);
    counts[kind] = tris.length / 6;
    const mask = new Uint8Array(width * height);
    // scanline: per row of cell centres pz, the triangle's x extent within the slab |z - pz| <= R,
    // widened by R; every cell the triangle touches is marked (its centre is within R in x and z)
    for (let o = 0; o < tris.length; o += 6) {
      const gz0 = Math.max(0, Math.floor((Math.min(tris[o + 1], tris[o + 3], tris[o + 5]) - R - z0) / CELL));
      const gz1 = Math.min(
        height - 1,
        Math.floor((Math.max(tris[o + 1], tris[o + 3], tris[o + 5]) + R - z0) / CELL),
      );
      for (let gz = gz0; gz <= gz1; gz++) {
        const pz = z0 + (gz + 0.5) * CELL;
        const zLo = pz - R;
        const zHi = pz + R;
        let lo = Infinity;
        let hi = -Infinity;
        for (let e = 0; e < 3; e++) {
          const ax = tris[o + 2 * e];
          const az = tris[o + 2 * e + 1];
          const bx = tris[o + ((2 * e + 2) % 6)];
          const bz = tris[o + ((2 * e + 3) % 6)];
          if (az >= zLo && az <= zHi) {
            if (ax < lo) lo = ax;
            if (ax > hi) hi = ax;
          }
          if ((az - zLo) * (bz - zLo) < 0) {
            const x = ax + ((zLo - az) / (bz - az)) * (bx - ax);
            if (x < lo) lo = x;
            if (x > hi) hi = x;
          }
          if ((az - zHi) * (bz - zHi) < 0) {
            const x = ax + ((zHi - az) / (bz - az)) * (bx - ax);
            if (x < lo) lo = x;
            if (x > hi) hi = x;
          }
        }
        if (lo > hi) continue;
        const gx0 = Math.max(0, Math.ceil((lo - R - x0) / CELL - 0.5));
        const gx1 = Math.min(width - 1, Math.floor((hi + R - x0) / CELL - 0.5));
        mask.fill(1, gz * width + gx0, gz * width + gx1 + 1);
      }
    }
    fields[kind] = chamfer(mask, width, height);
    exact[kind] = createExactIndex(tris, x0, z0, x1, z1);
  }

  // infield: crossing-number fill of the closed centre line, row by row (cell centres)
  const inside = new Uint8Array(width * height);
  if (loop) {
    const crossings = [];
    for (let gz = 0; gz < height; gz++) {
      const pz = z0 + (gz + 0.5) * CELL;
      crossings.length = 0;
      for (let i = 0; i < loop.count; i++) {
        const j = (i + 1) % loop.count;
        const za = loop.z[i];
        const zb = loop.z[j];
        if (za > pz !== zb > pz)
          crossings.push(loop.x[i] + ((pz - za) / (zb - za)) * (loop.x[j] - loop.x[i]));
      }
      crossings.sort((a, b) => a - b);
      for (let c = 0; c + 1 < crossings.length; c += 2) {
        const gx0 = Math.max(0, Math.ceil((crossings[c] - x0) / CELL - 0.5));
        const gx1 = Math.min(width - 1, Math.floor((crossings[c + 1] - x0) / CELL - 0.5));
        for (let gx = gx0; gx <= gx1; gx++) inside[gz * width + gx] = 1;
      }
    }
  }

  const cellOf = (x, z) => {
    const gx = Math.floor((x - x0) / CELL);
    const gz = Math.floor((z - z0) / CELL);
    return gx < 0 || gz < 0 || gx >= width || gz >= height ? -1 : gz * width + gx;
  };
  const lower = (kind, x, z) => {
    const i = cellOf(x, z);
    return i < 0 ? MARGIN : Math.max(0, (fields[kind][i] * CELL) / CHAMFER - 2 * HALF_DIAGONAL);
  };
  const upper = (kind, x, z) => {
    const i = cellOf(x, z);
    return i < 0 ? Infinity : fields[kind][i] * CELL + 2 * HALF_DIAGONAL;
  };
  /** True when (x, z) is at least `clearance` metres from every triangle of the class. */
  const clearOfKind = (kind, x, z, clearance) => {
    if (!(clearance > 0)) return true;
    if (lower(kind, x, z) >= clearance) return true;
    if (upper(kind, x, z) < clearance) return false;
    return exact[kind](x, z, clearance) >= clearance;
  };

  return {
    bounds: { x0, z0, x1, z1 },
    counts,
    /** Lower bound of the distance (metres) to the track asphalt / to anything solid. */
    trackDistance: (x, z) => lower('track', x, z),
    solidDistance: (x, z) => lower('solid', x, z),
    /** Exact distance (metres) to a class, searched up to `reach` (Infinity if nothing that near). */
    exact: (kind, x, z, reach) => exact[kind](x, z, reach),
    clear: (x, z, trackClearance, solidClearance) =>
      clearOfKind('track', x, z, trackClearance) && clearOfKind('solid', x, z, solidClearance),
    infield: (x, z) => {
      const i = cellOf(x, z);
      return i >= 0 && inside[i] === 1;
    },
  };
}

export { createExactIndex, createOccupancy };
