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
//       the triangles of meshes wider than LARGE_MESH (terrain, hills, track strips, pit lane);
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
/** Meshes wider than this (metres) are indexed triangle by triangle instead of as one box. */
const LARGE_MESH = 3 * CELL;
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
const BOX = 0;
const TRIANGLE = 1;

/** Distance from (px, py, pz) to triangle (a, b, c) (Ericson, Real-Time Collision Detection 5.1.5). */
function triangleDistance(px, py, pz, ax, ay, az, bx, by, bz, cx, cy, cz) {
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
  return Math.hypot(px - qx, py - qy, pz - qz);
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
  let skyRadius = 8000;
  const forward = new Vector3();
  const right = new Vector3();
  const up = new Vector3();

  const cellOf = (v) => Math.min(SIDE - 1, Math.max(0, Math.floor((v + HALF_EXTENT) / CELL)));

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

    // collect items (plain arrays at build time only)
    const kinds = [];
    const offsets = [];
    const data = [];
    const bounds = []; // per item: minX, minZ, maxX, maxZ, maxY
    const addBox = (b) => {
      kinds.push(BOX);
      offsets.push(data.length);
      data.push(b.min.x - PAD, b.min.y - PAD, b.min.z - PAD, b.max.x + PAD, b.max.y + PAD, b.max.z + PAD);
      bounds.push(b.min.x - PAD, b.min.z - PAD, b.max.x + PAD, b.max.z + PAD, b.max.y + PAD);
    };
    const a = new Vector3();
    const b = new Vector3();
    const c = new Vector3();
    const matrix = new Matrix4();
    const skip = new Set([sky, ...moving]);
    const visit = (node) => {
      if (skip.has(node)) return;
      if (node.isSprite) sprites.push(node);
      else if (node.isMesh) {
        const geometry = node.geometry;
        if (!geometry.boundingBox) geometry.computeBoundingBox();
        if (node.isInstancedMesh) {
          for (let i = 0; i < node.count; i++) {
            node.getMatrixAt(i, matrix);
            matrix.premultiply(node.matrixWorld);
            addBox(box.copy(geometry.boundingBox).applyMatrix4(matrix));
          }
        } else {
          box.copy(geometry.boundingBox).applyMatrix4(node.matrixWorld);
          if (box.max.x - box.min.x <= LARGE_MESH && box.max.z - box.min.z <= LARGE_MESH) addBox(box);
          else {
            const position = geometry.attributes.position;
            const index = geometry.index;
            const count = index ? index.count : position.count;
            const at = (i, out) =>
              out.fromBufferAttribute(position, index ? index.getX(i) : i).applyMatrix4(node.matrixWorld);
            for (let i = 0; i + 2 < count; i += 3) {
              at(i, a);
              at(i + 1, b);
              at(i + 2, c);
              kinds.push(TRIANGLE);
              offsets.push(data.length);
              data.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
              bounds.push(
                Math.min(a.x, b.x, c.x),
                Math.min(a.z, b.z, c.z),
                Math.max(a.x, b.x, c.x),
                Math.max(a.z, b.z, c.z),
                Math.max(a.y, b.y, c.y),
              );
            }
          }
        }
      }
      for (const child of node.children) visit(child);
    };
    visit(scene);

    // bucket the items into cells (two passes: count, then fill)
    const itemCount = kinds.length;
    const counts = new Int32Array(SIDE * SIDE);
    const forEachCell = (i, fn) => {
      const x0 = cellOf(bounds[i * 5]);
      const z0 = cellOf(bounds[i * 5 + 1]);
      const x1 = cellOf(bounds[i * 5 + 2]);
      const z1 = cellOf(bounds[i * 5 + 3]);
      for (let cz = z0; cz <= z1; cz++) for (let cx = x0; cx <= x1; cx++) fn(cz * SIDE + cx);
    };
    for (let i = 0; i < itemCount; i++)
      forEachCell(i, (k) => {
        counts[k]++;
        ceiling[k] = Math.max(ceiling[k], bounds[i * 5 + 4]);
      });
    cellStart = new Int32Array(SIDE * SIDE + 1);
    for (let k = 0; k < SIDE * SIDE; k++) cellStart[k + 1] = cellStart[k] + counts[k];
    cellItems = new Int32Array(cellStart[SIDE * SIDE]);
    const fill = cellStart.slice(0, SIDE * SIDE);
    for (let i = 0; i < itemCount; i++) forEachCell(i, (k) => (cellItems[fill[k]++] = i));
    itemKind = Uint8Array.from(kinds);
    itemOffset = Int32Array.from(offsets);
    itemData = Float32Array.from(data);
  }

  /** Exact distance from the eye to every item of cell k, if any can beat `best`. */
  function cellDistance(k, ex, ey, ez, best) {
    for (let j = cellStart[k]; j < cellStart[k + 1]; j++) {
      const item = cellItems[j];
      const o = itemOffset[item];
      const d = itemData;
      let distance;
      if (itemKind[item] === BOX) {
        const dx = Math.max(d[o] - ex, 0, ex - d[o + 3]);
        const dy = Math.max(d[o + 1] - ey, 0, ey - d[o + 4]);
        const dz = Math.max(d[o + 2] - ez, 0, ez - d[o + 5]);
        distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
      } else
        distance = triangleDistance(
          ex,
          ey,
          ez,
          d[o],
          d[o + 1],
          d[o + 2],
          d[o + 3],
          d[o + 4],
          d[o + 5],
          d[o + 6],
          d[o + 7],
          d[o + 8],
        );
      if (distance < best) best = distance;
    }
    return best;
  }

  /** Clearance of the static scene: rings of cells outwards from the eye's cell. */
  function staticClearance(ex, ey, ez) {
    let best = Infinity;
    const cx0 = cellOf(ex);
    const cz0 = cellOf(ez);
    for (let ring = 0; ring < SIDE; ring++) {
      // every cell of this ring is at least (ring - 1) cells away horizontally
      if ((ring - 1) * CELL >= best) break;
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
          if (Math.sqrt(dx * dx + dy * dy + dz * dz) < best) best = cellDistance(k, ex, ey, ez, best);
        }
      }
    }
    return best;
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
