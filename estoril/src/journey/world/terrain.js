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

/**
 * Ground: a 4.2 × 3 km grid. It stays flat (y = -0.05) inside an ellipse of ~720 m around the
 * origin and rises over the next 900 m into fbm hills 40–130 m high. Grass UVs are metres / 9;
 * vertex colours mix a base green with dry (yellow) and dark patches from two fbm scales.
 */
function buildGround(ctx) {
  const geometry = new PlaneGeometry(GROUND_WIDTH, GROUND_DEPTH, GROUND_SEGMENTS_X, GROUND_SEGMENTS_Z);
  geometry.rotateX(-Math.PI / 2);
  const position = geometry.attributes.position;
  const uv = geometry.attributes.uv;
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const z = position.getZ(i);
    // Elliptical distance (stretched along X), then a 0..1 ramp from 720 m to 1620 m.
    const radius = Math.hypot(x / 1.15, z * 1.25);
    const rise = clamp((radius - 720) / 900, 0, 1);
    position.setY(i, rise * rise * (40 + fbm2(x / 420, z / 420, 4) * 90) - 0.05);
    uv.setXY(i, x / 9, z / 9);
  }
  geometry.computeVertexNormals();

  const colors = [];
  const baseGreen = new Color(0x7c8a5e);
  const dryGrass = new Color(0xa7a473);
  const darkGrass = new Color(0x56664a);
  const mixed = new Color();
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const z = position.getZ(i);
    const broad = fbm2(x / 260, z / 260, 4);
    const fine = fbm2(x / 70 + 9, z / 70, 3);
    mixed
      .copy(baseGreen)
      .lerp(dryGrass, clamp(broad * 1.4 + 0.25, 0, 1) * 0.75)
      .lerp(darkGrass, clamp(-fine * 1.6, 0, 1) * 0.6);
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
  for (let ring = 0; ring < 3; ring++) {
    const radius = 2300 + ring * 350;
    const geometry = new CylinderGeometry(radius, radius, 1, 220, 1, true);
    const position = geometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const z = position.getZ(i);
      if (position.getY(i) > 0) {
        const angle = Math.atan2(z, x);
        let height = 70 + fbm2(angle * 3 + ring * 7, ring, 4) * 150 + Math.max(0, fbm2(angle * 9, 3 + ring, 2)) * 90;
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

export { buildGround, buildHills };
