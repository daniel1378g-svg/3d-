// Trees, shrubs and wind-swayed grass tufts, scattered with the shared seeded rng (ctx.rng).
//
// RNG ORDER IS LOAD-BEARING: pines, then oaks, then shrubs, then grass tufts draw from the same
// stream (clouds follow). Every rng() call below, including those inside short-circuited
// conditions, must stay exactly where it is.
import {
  Color,
  CylinderGeometry,
  DoubleSide,
  Euler,
  IcosahedronGeometry,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  PlaneGeometry,
  Quaternion,
  SphereGeometry,
  Vector3,
} from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { grassTuftTexture } from '../textures.js';
import { lerp } from '../util/math.js';
import { fbm2 } from '../util/noise.js';

/**
 * Merges unit primitives into one cluster geometry. Each blob is [x, y, z, scale, yStretch = 1]:
 * the primitive is scaled by (scale, scale·yStretch, scale) and moved to (x, y, z).
 */
function mergeBlobs(blobs, makePrimitive) {
  return mergeGeometries(
    blobs.map(([x, y, z, scale, yStretch = 1]) => {
      const geometry = makePrimitive();
      geometry.scale(scale, scale * yStretch, scale);
      geometry.translate(x, y, z);
      return geometry;
    }),
  );
}

/** Umbrella-pine canopy: five flattened spheres (about 2.4 units across before instance scaling). */
function pineCanopyGeometry() {
  return mergeBlobs(
    [
      [0, 0, 0, 1, 0.42],
      [0.62, -0.06, 0.18, 0.62, 0.42],
      [-0.58, -0.04, -0.22, 0.66, 0.42],
      [0.08, 0.04, -0.62, 0.58, 0.42],
      [-0.2, 0.03, 0.6, 0.6, 0.42],
    ],
    () => new SphereGeometry(1, 10, 7),
  );
}

/** Round broadleaf canopy: four icosahedra. */
function oakCanopyGeometry() {
  return mergeBlobs(
    [
      [0, 0, 0, 1],
      [0.55, -0.15, 0.25, 0.7],
      [-0.5, -0.1, -0.3, 0.72],
      [0.1, 0.38, -0.1, 0.6],
    ],
    () => new IcosahedronGeometry(1, 1),
  );
}

/**
 * Pines (with trunks), oaks and shrubs as four InstancedMeshes. Instance budgets are 2600 / 2200
 * / 1800 at density 1; a placement that finds no valid spot is skipped (count = placed).
 * Shadows are cast except at quality 'low'.
 */
function buildTrees(ctx, shape) {
  const { rng, materials, density, root } = ctx;
  const { distanceToTrack, isKeepClearZone } = shape;
  const pineBudget = Math.round(2600 * density);
  const oakBudget = Math.round(2200 * density);
  const shrubBudget = Math.round(1800 * density);
  const pineCanopy = pineCanopyGeometry();
  const oakCanopy = oakCanopyGeometry();
  const pines = new InstancedMesh(pineCanopy, materials.pine, pineBudget);
  const trunks = new InstancedMesh(new CylinderGeometry(0.16, 0.3, 1, 6), materials.trunk, pineBudget);
  const oaks = new InstancedMesh(oakCanopy, materials.oak, oakBudget);
  const shrubs = new InstancedMesh(new IcosahedronGeometry(1, 1), materials.shrub, shrubBudget);
  const matrix = new Matrix4();
  const rotation = new Quaternion();
  const scale = new Vector3();
  const position = new Vector3();
  const euler = new Euler();
  const colour = new Color();

  /**
   * Up to 60 tries for a spot in an ellipse (radius·1.3 along X, radius·0.9 along Z) at least
   * `minTrackDistance` metres from the track and outside the keep-clear zones; a spot is then kept
   * with a probability that follows a large-scale fbm (woods and clearings) scaled by `sparsity`.
   * Returns [x, z, distanceToTrack] or null.
   */
  const findSpot = (minTrackDistance, radius, sparsity) => {
    for (let attempt = 0; attempt < 60; attempt++) {
      const angle = rng() * Math.PI * 2;
      const r = Math.sqrt(rng()) * radius; // sqrt → uniform over the disc
      const x = Math.cos(angle) * r * 1.3;
      const z = Math.sin(angle) * r * 0.9;
      const trackDistance = distanceToTrack(x, z);
      // The density test (and its rng() call) only runs for spots that pass the distance test.
      if (
        !(trackDistance < minTrackDistance || isKeepClearZone(x, z)) &&
        !(fbm2(x / 160, z / 160, 3) * 0.9 + 0.2 < sparsity * rng())
      )
        return [x, z, trackDistance];
    }
    return null;
  };

  // Pines: trunk 9–17 m tall (unit cylinder scaled in Y), canopy cluster scaled 4–7.5 and centred on
  // the trunk top; random yaw and a lean of up to ±0.06 rad. Trunk and canopy share instance index.
  let placed = 0;
  for (let i = 0; i < pineBudget; i++) {
    const spot = findSpot(38, 1350, 0.9);
    if (!spot) continue;
    const [x, z] = spot;
    const height = 9 + rng() * 8;
    const canopySize = 4 + rng() * 3.5;
    euler.set((rng() - 0.5) * 0.12, rng() * 6, (rng() - 0.5) * 0.12);
    rotation.setFromEuler(euler);
    matrix.compose(position.set(x, height * 0.5, z), rotation, scale.set(1, height, 1));
    trunks.setMatrixAt(placed, matrix);
    matrix.compose(position.set(x, height, z), rotation, scale.set(canopySize, canopySize * 0.9, canopySize));
    pines.setMatrixAt(placed, matrix);
    pines.setColorAt(placed, colour.setHSL(0.25 + rng() * 0.04, 0.22 + rng() * 0.1, 0.24 + rng() * 0.08));
    placed++;
  }
  pines.count = trunks.count = placed;

  // Oaks: canopy cluster scaled 3–6.4, centred 0.8 × scale above the ground (no trunk mesh).
  placed = 0;
  for (let i = 0; i < oakBudget; i++) {
    const spot = findSpot(34, 1400, 0.7);
    if (!spot) continue;
    const [x, z] = spot;
    const size = 3 + rng() * 3.4;
    matrix.compose(position.set(x, size * 0.8, z), rotation.identity(), scale.set(size, size * 0.85, size));
    oaks.setMatrixAt(placed, matrix);
    oaks.setColorAt(placed, colour.setHSL(0.2 + rng() * 0.07, 0.2 + rng() * 0.12, 0.3 + rng() * 0.1));
    placed++;
  }
  oaks.count = placed;

  // Shrubs: an icosahedron scaled 0.8–2.4, squashed and half sunk into the ground.
  placed = 0;
  for (let i = 0; i < shrubBudget; i++) {
    const spot = findSpot(20, 1200, 0.4);
    if (!spot) continue;
    const [x, z] = spot;
    const size = 0.8 + rng() * 1.6;
    matrix.compose(position.set(x, size * 0.35, z), rotation.identity(), scale.set(size * 1.4, size * 0.7, size * 1.2));
    shrubs.setMatrixAt(placed, matrix);
    shrubs.setColorAt(placed, colour.setHSL(0.17 + rng() * 0.07, 0.16 + rng() * 0.12, 0.4 + rng() * 0.1));
    placed++;
  }
  shrubs.count = placed;

  for (const mesh of [pines, trunks, oaks, shrubs]) {
    mesh.castShadow = ctx.quality !== 'low';
    mesh.receiveShadow = true;
    root.add(mesh);
  }
}

/**
 * Grass tufts: alpha-tested single upright planes (1 × 0.62 m, standing on the ground, random
 * yaw, scale 0.55–1.15) swaying in a vertex shader. Budget 3000 at density 1, with up to
 * 3× as many tries. Half go on the verge behind the main straight's outer wall, half 12–34 m to
 * either side of the first 160 track points. Tufts closer than 9.5 m to the track, or inside a
 * keep-clear zone short of the outer wall, are rejected.
 */
function buildGrassTufts(ctx, shape) {
  const { rng, track, root, updaters } = ctx;
  const L = ctx.layout;
  const { distanceToTrack, isKeepClearZone, count: trackCount } = shape;
  const material = new MeshStandardMaterial({
    map: grassTuftTexture(),
    alphaTest: 0.45,
    side: DoubleSide,
    roughness: 1,
    color: 0xe2e8c8,
  });
  // Sway grows with height (uv.y) and is phase-shifted by the instance's world position.
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = { value: 0 };
    material.userData.sh = shader;
    shader.vertexShader =
      `uniform float uTime;
` +
      shader.vertexShader.replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        float sway = sin(uTime * 1.7 + instanceMatrix[3].x * .37 + instanceMatrix[3].z * .23) * .12 * uv.y;
        transformed.x += sway; transformed.z += sway * .6;`,
      );
  };
  const geometry = new PlaneGeometry(1, 0.62);
  geometry.translate(0, 0.31, 0); // base on the ground
  const budget = Math.round(3e3 * ctx.density);
  const tufts = new InstancedMesh(geometry, material, budget);
  const matrix = new Matrix4();
  const rotation = new Quaternion();
  const euler = new Euler();
  let placed = 0;
  for (let attempt = 0; attempt < budget * 3 && placed < budget; attempt++) {
    const where = rng();
    let x, z;
    if (where < 0.5) {
      // Verge behind the outer wall of the main straight.
      x = lerp(-560, 460, rng());
      z = L.straightZ + 12 + rng() * 14;
    } else {
      // Beside a random segment among the first 160 track points.
      const index = Math.floor(rng() * 160);
      const a = track[index];
      const b = track[(index + 1) % trackCount];
      const normalX = -(b.y - a.y);
      const normalZ = b.x - a.x;
      const length = Math.hypot(normalX, normalZ) || 1;
      const offset = (rng() > 0.5 ? 1 : -1) * (12 + rng() * 22);
      x = a.x + (normalX / length) * offset;
      z = a.y + (normalZ / length) * offset;
    }
    if ((isKeepClearZone(x, z) && z < L.straightZ + 11) || distanceToTrack(x, z) < 9.5) continue;
    euler.set(0, rng() * Math.PI, 0);
    rotation.setFromEuler(euler);
    const size = 0.55 + rng() * 0.6;
    matrix.compose(new Vector3(x, 0, z), rotation, new Vector3(size, size, size));
    tufts.setMatrixAt(placed++, matrix);
  }
  tufts.count = placed;
  root.add(tufts);
  updaters.push((time) => {
    if (material.userData.sh) material.userData.sh.uniforms.uTime.value = time;
  });
}

export { buildGrassTufts, buildTrees };
