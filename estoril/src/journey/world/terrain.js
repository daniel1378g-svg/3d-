// Ground plane (flat around the circuit, rising into fbm hills further out) and three rings of
// distant hills that close the horizon.
import {
  Color,
  CylinderGeometry,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
} from 'three';
import { clamp } from '../util/math.js';
import { fbm2 } from '../util/noise.js';

const GROUND_WIDTH = 4200; // metres along X
const GROUND_DEPTH = 3e3; // metres along Z
const GROUND_SEGMENTS_X = 120;
const GROUND_SEGMENTS_Z = 90;
/** Height of the flat ground around the circuit (layers.js `ground`). */
const GROUND_Y = -0.05;

/** Elliptical distance from the origin (stretched along X) used by the ground's rise. */
const groundRadius = (x, z) => Math.hypot(x / 1.15, z * 1.25);

/** The ground's analytic height at (x, z): flat inside ~720 m, then rising into fbm hills. */
function groundFormula(x, z) {
  const rise = clamp((groundRadius(x, z) - 720) / 900, 0, 1);
  return rise * rise * (40 + fbm2(x / 420, z / 420, 4) * 90) + GROUND_Y;
}

const CELL_X = GROUND_WIDTH / GROUND_SEGMENTS_X;
const CELL_Z = GROUND_DEPTH / GROUND_SEGMENTS_Z;
let vertexHeights = null;

/** The formula at every grid vertex, row by row from z = -GROUND_DEPTH / 2 (computed once). */
function gridHeights() {
  if (!vertexHeights) {
    vertexHeights = new Float64Array((GROUND_SEGMENTS_X + 1) * (GROUND_SEGMENTS_Z + 1));
    for (let iz = 0; iz <= GROUND_SEGMENTS_Z; iz++)
      for (let ix = 0; ix <= GROUND_SEGMENTS_X; ix++)
        vertexHeights[iz * (GROUND_SEGMENTS_X + 1) + ix] = groundFormula(
          -GROUND_WIDTH / 2 + ix * CELL_X,
          -GROUND_DEPTH / 2 + iz * CELL_Z,
        );
  }
  return vertexHeights;
}

/**
 * The ground MESH's triangle under (x, z): PlaneGeometry splits each cell along the diagonal from
 * (ix, iz + 1) to (ix + 1, iz). Returns [height, dh/dx, dh/dz] (outside the grid: the edge cell).
 */
function groundPlaneAt(x, z) {
  const h = gridHeights();
  const gx = clamp((x + GROUND_WIDTH / 2) / CELL_X, 0, GROUND_SEGMENTS_X - 1e-9);
  const gz = clamp((z + GROUND_DEPTH / 2) / CELL_Z, 0, GROUND_SEGMENTS_Z - 1e-9);
  const ix = Math.floor(gx);
  const iz = Math.floor(gz);
  const fx = gx - ix;
  const fz = gz - iz;
  const row = GROUND_SEGMENTS_X + 1;
  const ha = h[iz * row + ix];
  const hb = h[(iz + 1) * row + ix];
  const hd = h[iz * row + ix + 1];
  if (fx + fz <= 1) return [ha + (hd - ha) * fx + (hb - ha) * fz, (hd - ha) / CELL_X, (hb - ha) / CELL_Z];
  const hc = h[(iz + 1) * row + ix + 1];
  return [hc + (hb - hc) * (1 - fx) + (hd - hc) * (1 - fz), (hc - hb) / CELL_X, (hc - hd) / CELL_Z];
}

/** Height (metres) of the ground mesh at (x, z), so objects stand exactly on what is drawn. */
const groundHeightAt = (x, z) => groundPlaneAt(x, z)[0];

/** Slope (rise over run) of the ground mesh at (x, z). */
function groundSlopeAt(x, z) {
  const [, dx, dz] = groundPlaneAt(x, z);
  return Math.hypot(dx, dz);
}

/**
 * Ground: a 4.2 × 3 km grid. It stays flat (y = -0.05) inside an ellipse of ~720 m around the
 * origin and rises over the next 900 m into fbm hills 40–130 m high. The grass palette and detail
 * come from the world-space shader (env/shading.js); the vertex colours only add what that cannot
 * know: a ±7 % broad tone change and darker, more olive slopes on the rising ground.
 */
function buildGround(ctx) {
  const geometry = new PlaneGeometry(GROUND_WIDTH, GROUND_DEPTH, GROUND_SEGMENTS_X, GROUND_SEGMENTS_Z);
  geometry.rotateX(-Math.PI / 2);
  const position = geometry.attributes.position;
  const heights = gridHeights();
  // PlaneGeometry vertex (ix, iy) lies at z = -GROUND_DEPTH / 2 + iy · CELL_Z after rotateX(-π/2)
  for (let i = 0; i < position.count; i++) position.setY(i, heights[i]);
  geometry.computeVertexNormals();

  const colors = [];
  const slope = new Color(0x8f9478); // multiplier: darker, olive hillsides under the woods
  const mixed = new Color();
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const z = position.getZ(i);
    const tone = 1 + fbm2(x / 260, z / 260, 3) * 0.14;
    const rise = clamp((groundRadius(x, z) - 720) / 500, 0, 1);
    mixed.setRGB(tone, tone, tone).lerp(slope, rise);
    colors.push(mixed.r, mixed.g, mixed.b);
  }
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

  const ground = new Mesh(geometry, ctx.materials.ground);
  ground.receiveShadow = true;
  ground.name = 'ground';
  ctx.root.add(ground);
}

/** Direction (radians, atan2(z, x)) of the tall peak in the hill rings: towards -X/-Z. */
const PEAK_ANGLE = -2.35;
const PEAK_HALF_WIDTH = 0.22; // radians

/**
 * Distant hills: three open cylinders (radius 2300, 2650, 3000 m, 220 sides) whose top rim is
 * displaced by fbm in angle, with a tall peak around PEAK_ANGLE. The bottom rim sits at y = -20.
 * Each ring gets its own, lighter (hazier) material, from near to far.
 */
function buildHills(ctx) {
  const hills = new Group();
  hills.name = 'hills';
  for (let ring = 0; ring < 3; ring++) {
    const radius = 2300 + ring * 350;
    const geometry = new CylinderGeometry(radius, radius, 1, 220, 1, true);
    const position = geometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const z = position.getZ(i);
      if (position.getY(i) > 0) {
        const angle = Math.atan2(z, x);
        let height =
          70 + fbm2(angle * 3 + ring * 7, ring, 4) * 150 + Math.max(0, fbm2(angle * 9, 3 + ring, 2)) * 90;
        const fromPeak = Math.abs(Math.atan2(Math.sin(angle - PEAK_ANGLE), Math.cos(angle - PEAK_ANGLE)));
        height += Math.max(0, 1 - fromPeak / PEAK_HALF_WIDTH) * (ring === 1 ? 260 : 150);
        position.setY(i, height);
      } else position.setY(i, -20);
    }
    geometry.computeVertexNormals();
    const material = new MeshStandardMaterial({
      color: [0x5f6f57, 0x7d8b7c, 0x9fadb0][ring],
      roughness: 1,
      side: DoubleSide,
      fog: true,
    });
    hills.add(new Mesh(geometry, material));
  }
  ctx.root.add(hills);
}

export { GROUND_Y, buildGround, buildHills, groundHeightAt, groundSlopeAt };
