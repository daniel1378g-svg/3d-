// Per-frame near/far planes driven by the camera's clearance, so the close-ups (eye 0.5–3 m, car a
// few metres away) and the aerials (eye up to 620 m, ground 600–1100 m away) both get usable
// precision from a 24-bit depth buffer.
//
// Why: one depth step at view depth z is about z² / (near · 2²⁴), so precision is set almost
// entirely by the near plane. With the old fixed near of 0.3 m the 0.375 aerial resolved only 13 cm
// at 811 m, far coarser than the millimetre gaps between the stacked ground layers, which therefore
// z-fought (docs/diagnosis H1). The far plane only has to contain the sky dome.
//
//   clearance = distance from the eye to the nearest geometry, the minimum over
//     - the static scene, indexed once by build() in a grid of CELL-metre columns: each column keeps
//       its highest point (a cheap lower bound used to skip it) and the exact items inside it, i.e.
//       the world bounding box of every small mesh and of every instance of an InstancedMesh, and
//       the triangles of meshes wider than LARGE_MESH (terrain, hills, track strips, pit lane).
//       A bounding box counts as distance 0 when the eye is inside it, except for an axis-aligned
//       BoxGeometry mesh (buildings, the control tower), whose box IS the mesh: there the distance is
//       to its nearest face, so a camera path that clips a building keeps a usable near plane.
//       build() counts the items first and fills typed arrays directly (no intermediate arrays);
//     - "movers" (the hero car, the pit crew, the paddock visitors): a sphere around each, measured
//       at build time, at its current position;
//     - sprites (clouds) whose quad overlaps the view frustum: a sprite is a camera-facing quad that
//       lies entirely at the view depth of its centre, so that depth must stay beyond near.
//   near = clamp(NEAR_FRACTION · clearance, NEAR_MIN, NEAR_MAX)
//   far  = distance from the eye to the sky-dome centre + dome radius · (1 + FAR_MARGIN)
//
// The grid search walks rings of cells outwards from the eye and stops once a ring cannot hold
// anything nearer than the best distance found, so a low camera checks a handful of items and the
// 620 m aerial a few thousand cheap column bounds. Distances to boxes and triangles are exact
// lower bounds of the distance to the mesh, so near stays in front of everything.
//
// Motion blur rebuilds positions with the inverse of each frame's own view-projection and
// reprojects them with the previous frame's, so a near plane that changes between frames stays
// consistent. The depth clear value (1.0) and the sky's "no depth write" are unchanged.
//
// update() allocates nothing.
import { Box3, Matrix4, Vector3 } from 'three';

/** Near plane as a fraction of the clearance: a 2× safety margin. */
const NEAR_FRACTION = 0.5;
/** Near plane bounds, metres. */
const NEAR_MIN = 0.05;
const NEAR_MAX = 400;
/** Grid cell size and half extent (metres, centred on the origin; it covers the distant hills). */
const CELL = 20;
const HALF_EXTENT = 3200;
/** Meshes wider than this (metres) are indexed triangle by triangle instead of as one box… */
const LARGE_MESH = 3 * CELL;
/**
 * …unless they are flat ground layers no taller than this (metres: track strips, pit lane), which
 * are indexed as one box per grid cell (the union of their triangles' boxes inside the cell). Such a
 * box is a lower bound of the distance to the layer and at most FLAT_HEIGHT below its exact value
 * for an eye above it; the terrain under the eye bounds the clearance the same way anyway.
 */
const FLAT_HEIGHT = 0.25;
/** Padding (metres) around static items: flag cloth, swaying grass and shrubs move a little. */
const PAD = 0.3;
/** Movers' bounding radii are enlarged by this fraction plus MOVER_PAD metres (steering, limbs). */
const MOVER_MARGIN = 0.1;
const MOVER_PAD = 0.25;
/** Sprites are tested against a frustum widened by this factor (covers the framing view offset). */
const SPRITE_FRUSTUM_MARGIN = 1.35;
/** The far plane sits this fraction beyond the farthest point of the sky dome. */
const FAR_MARGIN = 0.02;

const SIDE = Math.ceil((2 * HALF_EXTENT) / CELL);
// item kinds: a bounding box (a lower bound: 0 when the eye is inside), an exact axis-aligned box
// mesh (inside it, the distance to its nearest face), a triangle; INSTANCES only marks a source
const BOX = 0;
const TRIANGLE = 1;
const SOLID_BOX = 2;
const INSTANCES = 3;

/** Grid column (or row) of a world x (or z), clamped to the grid. */
const cellOf = (v) => Math.min(SIDE - 1, Math.max(0, Math.floor((v + HALF_EXTENT) / CELL)));

/** True for a BoxGeometry whose faces are axis-aligned (every normal along an axis). */
function isAxisAlignedBox(geometry) {
  const normal = geometry.attributes.normal;
  if (geometry.type !== 'BoxGeometry' || !normal) return false;
  for (let i = 0; i < normal.count; i++) {
    const x = Math.abs(normal.getX(i));
    const y = Math.abs(normal.getY(i));
    const z = Math.abs(normal.getZ(i));
    if (x + y + z > Math.max(x, y, z) + 1e-6) return false;
  }
  return true;
}

/**
 * A mesh's vertex positions in world space (x, y, z per vertex; its world matrix is affine), its
 * index array (or null) and the number of triangle corners to read.
 */
function worldVertices(node) {
  const geometry = node.geometry;
  const position = geometry.attributes.position;
  const e = node.matrixWorld.elements;
  const world = new Float64Array(position.count * 3);
  const plain = !position.isInterleavedBufferAttribute && !position.normalized;
  const array = position.array;
  const stride = position.itemSize;
  for (let v = 0, p = 0; v < position.count; v++, p += 3) {
    const x = plain ? array[v * stride] : position.getX(v);
    const y = plain ? array[v * stride + 1] : position.getY(v);
    const z = plain ? array[v * stride + 2] : position.getZ(v);
    world[p] = e[0] * x + e[4] * y + e[8] * z + e[12];
    world[p + 1] = e[1] * x + e[5] * y + e[9] * z + e[13];
    world[p + 2] = e[2] * x + e[6] * y + e[10] * z + e[14];
  }
  const indices = geometry.index ? geometry.index.array : null;
  const corners = indices ? geometry.index.count : position.count;
  return [world, indices, corners - (corners % 3)];
}

/**
 * Appends to `slabs` one box per grid cell that a flat mesh touches: the union of its triangles'
 * world boxes, clipped to the cell. Returns the number of boxes added.
 */
function addSlabs(node, slabs) {
  const [world, indices, end] = worldVertices(node);
  const slabOf = new Map(); // cell -> offset in slabs
  const before = slabs.length;
  for (let t = 0; t < end; t += 3) {
    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    for (let j = 0; j < 3; j++) {
      const p = 3 * (indices ? indices[t + j] : t + j);
      const wx = world[p];
      const wy = world[p + 1];
      const wz = world[p + 2];
      minX = Math.min(minX, wx);
      maxX = Math.max(maxX, wx);
      minY = Math.min(minY, wy);
      maxY = Math.max(maxY, wy);
      minZ = Math.min(minZ, wz);
      maxZ = Math.max(maxZ, wz);
    }
    for (let cz = cellOf(minZ); cz <= cellOf(maxZ); cz++)
      for (let cx = cellOf(minX); cx <= cellOf(maxX); cx++) {
        const x0 = cx * CELL - HALF_EXTENT;
        const z0 = cz * CELL - HALF_EXTENT;
        const k = cz * SIDE + cx;
        let o = slabOf.get(k);
        if (o === undefined) {
          o = slabs.length;
          slabOf.set(k, o);
          slabs.push(Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity);
        }
        // the edge cells of the grid also hold whatever lies beyond it
        slabs[o] = Math.min(slabs[o], cx > 0 ? Math.max(minX, x0) : minX);
        slabs[o + 1] = Math.min(slabs[o + 1], minY);
        slabs[o + 2] = Math.min(slabs[o + 2], cz > 0 ? Math.max(minZ, z0) : minZ);
        slabs[o + 3] = Math.max(slabs[o + 3], cx < SIDE - 1 ? Math.min(maxX, x0 + CELL) : maxX);
        slabs[o + 4] = Math.max(slabs[o + 4], maxY);
        slabs[o + 5] = Math.max(slabs[o + 5], cz < SIDE - 1 ? Math.min(maxZ, z0 + CELL) : maxZ);
      }
  }
  return (slabs.length - before) / 6;
}

/** True when a matrix only scales and translates (no rotation, no shear). */
function isAxisAligned(matrix) {
  const e = matrix.elements;
  return (
    Math.abs(e[1]) + Math.abs(e[2]) + Math.abs(e[4]) + Math.abs(e[6]) + Math.abs(e[8]) + Math.abs(e[9]) < 1e-9
  );
}

/**
 * Math.hypot(x, y, z) without its allocation (V8's builtin copies its arguments into a new array):
 * V8's own algorithm (the largest magnitude scales the others, Kahan-compensated sum; NaN ignored for
 * the maximum, Infinity before NaN before 0), so the result is the same to the bit there (checked in
 * Chromium on 3 million random triples and every triple of 0, -0, ±Infinity, NaN and finite values; a
 * degenerate triangle still gives NaN, which the search ignores).
 */
function hypot3(x, y, z) {
  const ax = Math.abs(x);
  const ay = Math.abs(y);
  const az = Math.abs(z);
  let max = 0;
  if (ax > max) max = ax;
  if (ay > max) max = ay;
  if (az > max) max = az;
  if (max === Infinity) return Infinity;
  if (ax !== ax || ay !== ay || az !== az) return NaN;
  if (max === 0) return 0;
  let sum = 0;
  let compensation = 0;
  let n = ax / max;
  let summand = n * n - compensation;
  let preliminary = sum + summand;
  compensation = preliminary - sum - summand;
  sum = preliminary;
  n = ay / max;
  summand = n * n - compensation;
  preliminary = sum + summand;
  compensation = preliminary - sum - summand;
  sum = preliminary;
  n = az / max;
  summand = n * n - compensation;
  preliminary = sum + summand;
  return Math.sqrt(preliminary) * max;
}

/**
 * Distance from the eye (eye[0..2]) to the triangle at data[o..o+8] (a, b, c) (Ericson, Real-Time
 * Collision Detection 5.1.5), written to out[0]. Only arrays and an integer go in and nothing comes
 * out: this call is not inlined, and V8 passes and returns doubles between such calls as new heap
 * numbers (12 per triangle tested, ~26 KB per frame over the journey, ~40 KB near the pit building).
 */
function triangleDistance(out, eye, data, o) {
  const px = eye[0];
  const py = eye[1];
  const pz = eye[2];
  const ax = data[o];
  const ay = data[o + 1];
  const az = data[o + 2];
  const bx = data[o + 3];
  const by = data[o + 4];
  const bz = data[o + 5];
  const cx = data[o + 6];
  const cy = data[o + 7];
  const cz = data[o + 8];
  const abx = bx - ax,
    aby = by - ay,
    abz = bz - az;
  const acx = cx - ax,
    acy = cy - ay,
    acz = cz - az;
  const apx = px - ax,
    apy = py - ay,
    apz = pz - az;
  const d1 = abx * apx + aby * apy + abz * apz;
  const d2 = acx * apx + acy * apy + acz * apz;
  let qx, qy, qz;
  if (d1 <= 0 && d2 <= 0) {
    qx = ax;
    qy = ay;
    qz = az;
  } else {
    const bpx = px - bx,
      bpy = py - by,
      bpz = pz - bz;
    const d3 = abx * bpx + aby * bpy + abz * bpz;
    const d4 = acx * bpx + acy * bpy + acz * bpz;
    const cpx = px - cx,
      cpy = py - cy,
      cpz = pz - cz;
    const d5 = abx * cpx + aby * cpy + abz * cpz;
    const d6 = acx * cpx + acy * cpy + acz * cpz;
    const va = d3 * d6 - d5 * d4;
    const vb = d5 * d2 - d1 * d6;
    const vc = d1 * d4 - d3 * d2;
    if (d3 >= 0 && d4 <= d3) {
      qx = bx;
      qy = by;
      qz = bz;
    } else if (d6 >= 0 && d5 <= d6) {
      qx = cx;
      qy = cy;
      qz = cz;
    } else if (vc <= 0 && d1 >= 0 && d3 <= 0) {
      const w = d1 / (d1 - d3);
      qx = ax + w * abx;
      qy = ay + w * aby;
      qz = az + w * abz;
    } else if (vb <= 0 && d2 >= 0 && d6 <= 0) {
      const w = d2 / (d2 - d6);
      qx = ax + w * acx;
      qy = ay + w * acy;
      qz = az + w * acz;
    } else if (va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0) {
      const w = (d4 - d3) / (d4 - d3 + (d5 - d6));
      qx = bx + w * (cx - bx);
      qy = by + w * (cy - by);
      qz = bz + w * (cz - bz);
    } else {
      const denom = 1 / (va + vb + vc);
      const v = vb * denom;
      const w = vc * denom;
      qx = ax + abx * v + acx * w;
      qy = ay + aby * v + acy * w;
      qz = az + abz * v + acz * w;
    }
  }
  out[0] = hypot3(px - qx, py - qy, pz - qz);
}

/**
 * @param {import('three').PerspectiveCamera} camera
 */
function createDepthRange(camera) {
  // grid: per cell the highest point of its items, and its items (CSR: start offsets + refs)
  const ceiling = new Float32Array(SIDE * SIDE).fill(-Infinity);
  let cellStart = new Int32Array(SIDE * SIDE + 1);
  let cellItems = new Int32Array(0);
  // items: kind, then 6 floats (box min/max) or 9 floats (triangle), at itemOffset[i]
  let itemKind = new Uint8Array(0);
  let itemOffset = new Int32Array(0);
  let itemData = new Float32Array(0);
  const movers = []; // { object, radius }
  const sprites = [];
  const skyCentre = new Vector3();
  // the eye, the search's running minimum and one triangle's distance (typed arrays, so the search
  // passes no doubles between calls: see triangleDistance)
  const eye = new Float64Array(3);
  const nearest = new Float64Array(1);
  const triangle = new Float64Array(1);
  let skyRadius = 8000;
  const forward = new Vector3();
  const right = new Vector3();
  const up = new Vector3();

  /**
   * Indexes the scene (call once after it is assembled). `sky` is the sky dome (it sets the far
   * plane), `movers` are objects that move after the build (their subtrees are left out of the grid
   * and tracked as spheres every frame). Everything else is treated as static; sprites are
   * collected for the per-frame frustum test.
   */
  function build(scene, { sky, movers: moving = [] }) {
    scene.updateMatrixWorld(true);
    if (!sky.geometry.boundingSphere) sky.geometry.computeBoundingSphere();
    skyRadius = sky.geometry.boundingSphere.radius;
    sky.getWorldPosition(skyCentre);

    const box = new Box3();
    const corner = new Vector3();
    const centre = new Vector3();
    for (const object of moving) {
      box.setFromObject(object, true);
      object.getWorldPosition(centre);
      let radius = 0;
      for (let i = 0; i < 8; i++) {
        corner.set(
          i & 1 ? box.max.x : box.min.x,
          i & 2 ? box.max.y : box.min.y,
          i & 4 ? box.max.z : box.min.z,
        );
        radius = Math.max(radius, corner.distanceTo(centre));
      }
      movers.push({ object, radius: radius * (1 + MOVER_MARGIN) + MOVER_PAD });
    }

    // 1. what to index (each mesh once: as boxes, as instance boxes, or triangle by triangle), and
    //    how many items and floats that makes, so the typed arrays are filled directly
    const sources = []; // mesh, way (BOX | INSTANCES | TRIANGLE)
    const slabs = []; // flat layers: minX, minY, minZ, maxX, maxY, maxZ per slab
    let itemCount = 0;
    let floatCount = 0;
    const skip = new Set([sky, ...moving]);
    const visit = (node) => {
      if (skip.has(node)) return;
      if (node.isSprite) sprites.push(node);
      else if (node.isMesh) {
        const geometry = node.geometry;
        if (!geometry.boundingBox) geometry.computeBoundingBox();
        box.copy(geometry.boundingBox).applyMatrix4(node.matrixWorld);
        if (node.isInstancedMesh) {
          sources.push(node, INSTANCES);
          itemCount += node.count;
          floatCount += 6 * node.count;
        } else if (box.max.x - box.min.x <= LARGE_MESH && box.max.z - box.min.z <= LARGE_MESH) {
          sources.push(node, BOX);
          itemCount++;
          floatCount += 6;
        } else if (box.max.y - box.min.y <= FLAT_HEIGHT) {
          const added = addSlabs(node, slabs);
          itemCount += added;
          floatCount += 6 * added;
        } else {
          const triangles = Math.floor(
            (geometry.index ? geometry.index.count : geometry.attributes.position.count) / 3,
          );
          sources.push(node, TRIANGLE);
          itemCount += triangles;
          floatCount += 9 * triangles;
        }
      }
      for (const child of node.children) visit(child);
    };
    visit(scene);

    // 2. fill the items, and per item its plan bounds and top: minX, minZ, maxX, maxZ, maxY
    itemKind = new Uint8Array(itemCount);
    itemOffset = new Int32Array(itemCount);
    itemData = new Float32Array(floatCount);
    const bounds = new Float32Array(itemCount * 5);
    let item = 0;
    let offset = 0;
    const addBox = (minX, minY, minZ, maxX, maxY, maxZ, kind, pad) => {
      itemKind[item] = kind;
      itemOffset[item] = offset;
      itemData[offset++] = minX - pad;
      itemData[offset++] = minY - pad;
      itemData[offset++] = minZ - pad;
      itemData[offset++] = maxX + pad;
      itemData[offset++] = maxY + pad;
      itemData[offset++] = maxZ + pad;
      const b = item * 5;
      bounds[b] = minX - pad;
      bounds[b + 1] = minZ - pad;
      bounds[b + 2] = maxX + pad;
      bounds[b + 3] = maxZ + pad;
      bounds[b + 4] = maxY + pad;
      item++;
    };
    // a mesh's bounding box under matrix elements e: centre transformed, half extents through |e|
    const addTransformedBox = (bb, e, solid) => {
      const cx = (bb.min.x + bb.max.x) / 2;
      const cy = (bb.min.y + bb.max.y) / 2;
      const cz = (bb.min.z + bb.max.z) / 2;
      const hx = (bb.max.x - bb.min.x) / 2;
      const hy = (bb.max.y - bb.min.y) / 2;
      const hz = (bb.max.z - bb.min.z) / 2;
      const x = e[0] * cx + e[4] * cy + e[8] * cz + e[12];
      const y = e[1] * cx + e[5] * cy + e[9] * cz + e[13];
      const z = e[2] * cx + e[6] * cy + e[10] * cz + e[14];
      const ex = Math.abs(e[0]) * hx + Math.abs(e[4]) * hy + Math.abs(e[8]) * hz;
      const ey = Math.abs(e[1]) * hx + Math.abs(e[5]) * hy + Math.abs(e[9]) * hz;
      const ez = Math.abs(e[2]) * hx + Math.abs(e[6]) * hy + Math.abs(e[10]) * hz;
      addBox(x - ex, y - ey, z - ez, x + ex, y + ey, z + ez, solid ? SOLID_BOX : BOX, solid ? 0 : PAD);
    };
    for (let s = 0; s < slabs.length; s += 6)
      addBox(slabs[s], slabs[s + 1], slabs[s + 2], slabs[s + 3], slabs[s + 4], slabs[s + 5], BOX, 0);
    const matrix = new Matrix4();
    for (let s = 0; s < sources.length; s += 2) {
      const node = sources[s];
      const way = sources[s + 1];
      const geometry = node.geometry;
      const boxShape = isAxisAlignedBox(geometry);
      if (way === BOX) {
        addTransformedBox(
          geometry.boundingBox,
          node.matrixWorld.elements,
          boxShape && isAxisAligned(node.matrixWorld),
        );
      } else if (way === INSTANCES) {
        for (let i = 0; i < node.count; i++) {
          node.getMatrixAt(i, matrix);
          matrix.premultiply(node.matrixWorld);
          addTransformedBox(geometry.boundingBox, matrix.elements, boxShape && isAxisAligned(matrix));
        }
      } else {
        const [world, indices, end] = worldVertices(node);
        for (let t = 0; t < end; t += 3) {
          itemKind[item] = TRIANGLE;
          itemOffset[item] = offset;
          let minX = Infinity;
          let minZ = Infinity;
          let maxX = -Infinity;
          let maxY = -Infinity;
          let maxZ = -Infinity;
          for (let j = 0; j < 3; j++) {
            const p = 3 * (indices ? indices[t + j] : t + j);
            const wx = world[p];
            const wy = world[p + 1];
            const wz = world[p + 2];
            itemData[offset++] = wx;
            itemData[offset++] = wy;
            itemData[offset++] = wz;
            if (wx < minX) minX = wx;
            if (wx > maxX) maxX = wx;
            if (wy > maxY) maxY = wy;
            if (wz < minZ) minZ = wz;
            if (wz > maxZ) maxZ = wz;
          }
          const b = item * 5;
          bounds[b] = minX;
          bounds[b + 1] = minZ;
          bounds[b + 2] = maxX;
          bounds[b + 3] = maxZ;
          bounds[b + 4] = maxY;
          item++;
        }
      }
    }

    // 3. bucket the items into cells (two passes: count, then fill)
    const counts = new Int32Array(SIDE * SIDE);
    for (let pass = 0; pass < 2; pass++) {
      if (pass === 1) {
        cellStart = new Int32Array(SIDE * SIDE + 1);
        for (let k = 0; k < SIDE * SIDE; k++) cellStart[k + 1] = cellStart[k] + counts[k];
        cellItems = new Int32Array(cellStart[SIDE * SIDE]);
        counts.set(cellStart.subarray(0, SIDE * SIDE)); // next free slot per cell
      }
      for (let i = 0; i < itemCount; i++) {
        const b = i * 5;
        const x0 = cellOf(bounds[b]);
        const z0 = cellOf(bounds[b + 1]);
        const x1 = cellOf(bounds[b + 2]);
        const z1 = cellOf(bounds[b + 3]);
        for (let cz = z0; cz <= z1; cz++)
          for (let cx = x0; cx <= x1; cx++) {
            const k = cz * SIDE + cx;
            if (pass === 0) {
              counts[k]++;
              if (bounds[b + 4] > ceiling[k]) ceiling[k] = bounds[b + 4];
            } else cellItems[counts[k]++] = i;
          }
      }
    }
  }

  /** Lowers nearest[0] to the exact distance from the eye to any item of cell k that beats it. */
  function cellDistance(k) {
    const ex = eye[0];
    const ey = eye[1];
    const ez = eye[2];
    let best = nearest[0];
    for (let j = cellStart[k]; j < cellStart[k + 1]; j++) {
      const item = cellItems[j];
      const o = itemOffset[item];
      const d = itemData;
      let distance;
      if (itemKind[item] !== TRIANGLE) {
        const dx = Math.max(d[o] - ex, 0, ex - d[o + 3]);
        const dy = Math.max(d[o + 1] - ey, 0, ey - d[o + 4]);
        const dz = Math.max(d[o + 2] - ez, 0, ez - d[o + 5]);
        distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        // inside an exact box mesh: its nearest face (the camera path should not go there)
        if (distance === 0 && itemKind[item] === SOLID_BOX)
          distance = Math.min(
            ex - d[o],
            d[o + 3] - ex,
            ey - d[o + 1],
            d[o + 4] - ey,
            ez - d[o + 2],
            d[o + 5] - ez,
          );
      } else {
        triangleDistance(triangle, eye, d, o);
        distance = triangle[0];
      }
      if (distance < best) best = distance;
    }
    nearest[0] = best;
  }

  /** Clearance of the static scene: rings of cells outwards from the eye's cell. */
  function staticClearance(ex, ey, ez) {
    eye[0] = ex;
    eye[1] = ey;
    eye[2] = ez;
    nearest[0] = Infinity;
    const cx0 = cellOf(ex);
    const cz0 = cellOf(ez);
    for (let ring = 0; ring < SIDE; ring++) {
      // every cell of this ring is at least (ring - 1) cells away horizontally
      if ((ring - 1) * CELL >= nearest[0]) break;
      for (let cz = cz0 - ring; cz <= cz0 + ring; cz++) {
        if (cz < 0 || cz >= SIDE) continue;
        const edgeRow = cz === cz0 - ring || cz === cz0 + ring;
        const stride = edgeRow || ring === 0 ? 1 : 2 * ring;
        for (let cx = cx0 - ring; cx <= cx0 + ring; cx += stride) {
          if (cx < 0 || cx >= SIDE) continue;
          const k = cz * SIDE + cx;
          if (cellStart[k] === cellStart[k + 1]) continue;
          const x0 = cx * CELL - HALF_EXTENT;
          const z0 = cz * CELL - HALF_EXTENT;
          const dx = Math.max(x0 - ex, 0, ex - x0 - CELL);
          const dz = Math.max(z0 - ez, 0, ez - z0 - CELL);
          const dy = Math.max(0, ey - ceiling[k]);
          if (Math.sqrt(dx * dx + dy * dy + dz * dz) < nearest[0]) cellDistance(k);
        }
      }
    }
    return nearest[0];
  }

  const state = {
    build,
    /** Clearance (metres) measured by the last update(). */
    clearance: 0,
    /**
     * Sets camera.near/far for an eye at `eye` looking at `target` (call after the camera's fov and
     * aspect are set) and updates the projection matrix when they change.
     */
    update(eye, target) {
      let best = staticClearance(eye.x, eye.y, eye.z);
      for (let i = 0; i < movers.length; i++) {
        const { object, radius } = movers[i];
        if (object.visible) best = Math.min(best, Math.max(0, eye.distanceTo(object.position) - radius));
      }
      // sprites whose quad overlaps the (widened) view frustum
      forward.subVectors(target, eye).normalize();
      right.set(-forward.z, 0, forward.x).normalize();
      up.crossVectors(right, forward);
      const tanY = Math.tan((camera.fov * Math.PI) / 360) * SPRITE_FRUSTUM_MARGIN;
      const tanX = tanY * camera.aspect;
      for (let i = 0; i < sprites.length; i++) {
        const sprite = sprites[i];
        if (!sprite.visible) continue;
        const m = sprite.matrixWorld.elements;
        const x = m[12] - eye.x;
        const y = m[13] - eye.y;
        const z = m[14] - eye.z;
        const depth = x * forward.x + y * forward.y + z * forward.z;
        if (!(depth > 0) || depth >= best) continue;
        const halfSize = 0.5 * Math.hypot(Math.hypot(m[0], m[1], m[2]), Math.hypot(m[4], m[5], m[6]));
        const across = Math.abs(x * right.x + z * right.z) - halfSize;
        const vertical = Math.abs(x * up.x + y * up.y + z * up.z) - halfSize;
        if (across < depth * tanX && vertical < depth * tanY) best = depth;
      }
      state.clearance = best;
      const near = Math.min(NEAR_MAX, Math.max(NEAR_MIN, NEAR_FRACTION * best));
      const far = eye.distanceTo(skyCentre) + skyRadius * (1 + FAR_MARGIN);
      if (near !== camera.near || far !== camera.far) {
        camera.near = near;
        camera.far = far;
        camera.updateProjectionMatrix();
      }
    },
  };
  return state;
}

export { NEAR_FRACTION, NEAR_MAX, NEAR_MIN, createDepthRange };
