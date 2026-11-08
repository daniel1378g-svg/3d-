// Track-side barriers beyond the corner furniture (docs/references.md §4.5): double Armco along the
// straights and the gentle bends, and teal-painted tyre stacks (#067B7B) at the approach end of every
// tyre wall, where cars arrive first.
//
// Armco: two galvanised W-beam rails (0.31 m each, at 0.45–0.76 m and 0.79–1.10 m) on posts every
// 2 m, ARMCO_OFFSET beyond the asphalt edge. It runs only where nothing else is: outside corners and
// gravel intervals (with margins), away from the pit straight, the paddock and the grandstand
// (track-analysis.js keep-clear zones), and ARMCO_CLEARANCE from the asphalt of every other part of
// the track. Runs shorter than MIN_RUN are dropped. Built on the shared centre-line model, before the
// vegetation, so the trees and scrub keep clear of it (env/occupancy.js).
import {
  BufferGeometry,
  CanvasTexture,
  CylinderGeometry,
  DoubleSide,
  Float32BufferAttribute,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  RepeatWrapping,
  SRGBColorSpace,
} from 'three';

/** Armco line: metres beyond the asphalt edge, least distance from other track parts, shortest run. */
const ARMCO_OFFSET = 9;
const ARMCO_CLEARANCE = 9;
const MIN_RUN = 40;
/** Samples kept free around corners and gravel intervals (metres at 1 m spacing). */
const CORNER_MARGIN = 35;
const GRAVEL_MARGIN = 30;
const RAILS = [
  [0.45, 0.76],
  [0.79, 1.1],
];

/** W-beam profile, 4 x 64 (v across the rail): light crowns, a dark groove, a dark lower lip. */
function wBeamTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 4;
  canvas.height = 64;
  const g = canvas.getContext('2d');
  const stops = [
    [0, '#6f746f'],
    [0.12, '#c9ccc2'],
    [0.32, '#a6a99e'],
    [0.5, '#5b605c'],
    [0.68, '#a6a99e'],
    [0.88, '#c9ccc2'],
    [1, '#6f746f'],
  ];
  const gradient = g.createLinearGradient(0, 0, 0, 64);
  for (const [at, colour] of stops) gradient.addColorStop(at, colour);
  g.fillStyle = gradient;
  g.fillRect(0, 0, 4, 64);
  const texture = new CanvasTexture(canvas);
  texture.wrapS = RepeatWrapping;
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

/** [first, last] runs of set flags in a closed loop (last may exceed count when the run wraps). */
function loopRuns(flags) {
  const n = flags.length;
  let start = 0;
  while (start < n && flags[start]) start++;
  if (start === n) return [[0, n - 1]];
  const runs = [];
  for (let k = start; k < start + n; k++) {
    if (!flags[k % n]) continue;
    let j = k;
    while (j + 1 < start + n && flags[(j + 1) % n]) j++;
    runs.push([k, j]);
    k = j;
  }
  return runs;
}

/**
 * Armco runs along the model: [{ side, first, last }] (sample indices, last may exceed count).
 * `keepClear(x, z)` is track-analysis.js isKeepClearZone.
 */
function armcoRuns(model, keepClear) {
  const { line, halfWidth } = model;
  const count = line.count;
  // samples near corners or (per side) gravel are off limits
  const blocked = { 1: new Uint8Array(count), [-1]: new Uint8Array(count) };
  for (const corner of model.corners)
    for (let i = corner.first - CORNER_MARGIN; i <= corner.last + CORNER_MARGIN; i++) {
      blocked[1][((i % count) + count) % count] = 1;
      blocked[-1][((i % count) + count) % count] = 1;
    }
  for (const { side, first, last } of model.gravel)
    for (let i = first - GRAVEL_MARGIN; i <= last + GRAVEL_MARGIN; i++)
      blocked[side][((i % count) + count) % count] = 1;
  // spatial hash of the centre line, for the distance to other parts of the track
  const CELL = 25;
  const cells = new Map();
  for (let i = 0; i < count; i++) {
    const key = Math.floor(line.x[i] / CELL) + ',' + Math.floor(line.z[i] / CELL);
    if (!cells.has(key)) cells.set(key, []);
    cells.get(key).push(i);
  }
  const clearOfOtherParts = (x, z, i) => {
    const cx = Math.floor(x / CELL);
    const cz = Math.floor(z / CELL);
    for (let dx = -1; dx <= 1; dx++)
      for (let dz = -1; dz <= 1; dz++)
        for (const j of cells.get(cx + dx + ',' + (cz + dz)) || []) {
          const along = Math.min(Math.abs(j - i), count - Math.abs(j - i));
          if (along < 60) continue;
          if (Math.hypot(line.x[j] - x, line.z[j] - z) - halfWidth[j] < ARMCO_CLEARANCE) return false;
        }
    return true;
  };
  const runs = [];
  for (const side of [1, -1]) {
    const flags = new Uint8Array(count);
    for (let i = 0; i < count; i++) {
      if (blocked[side][i]) continue;
      const o = side * (halfWidth[i] + ARMCO_OFFSET);
      const x = line.x[i] + line.nx[i] * o;
      const z = line.z[i] + line.nz[i] * o;
      const pitStraight = z > 150 && z < 260 && x > -600 && x < 480;
      flags[i] =
        !pitStraight && !keepClear(x, z) && model.edge(i, o) === o && clearOfOtherParts(x, z, i) ? 1 : 0;
    }
    for (const [first, last] of loopRuns(flags))
      if (last - first + 1 >= MIN_RUN) runs.push({ side, first, last });
  }
  return runs;
}

/** Builds the Armco rails (one merged ribbon mesh) and posts (instanced). Returns the runs. */
function buildArmco(ctx, shape) {
  const { model, isKeepClearZone } = shape;
  const { line, halfWidth } = model;
  const count = line.count;
  const runs = armcoRuns(model, isKeepClearZone);
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];
  const posts = [];
  for (const { side, first, last } of runs)
    for (const [y0, y1] of RAILS) {
      const base = positions.length / 3;
      for (let k = first; k <= last; k++) {
        const i = k % count;
        const o = side * (halfWidth[i] + ARMCO_OFFSET);
        const x = line.x[i] + line.nx[i] * o;
        const z = line.z[i] + line.nz[i] * o;
        positions.push(x, y0, z, x, y1, z);
        // the rail faces the track
        normals.push(-side * line.nx[i], 0, -side * line.nz[i], -side * line.nx[i], 0, -side * line.nz[i]);
        const u = (k - first) * line.spacing;
        uvs.push(u, 0, u, 1);
        if (y0 === RAILS[0][0] && (k - first) % 2 === 0)
          posts.push([x - side * line.nx[i] * 0.12, z - side * line.nz[i] * 0.12]);
      }
      for (let k = 0; k < last - first; k++) {
        const a = base + 2 * k;
        indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
      }
    }
  if (!runs.length) return runs;
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  const steel = new MeshStandardMaterial({
    map: wBeamTexture(),
    color: 0xd8dad0,
    roughness: 0.5,
    metalness: 0.45,
    side: DoubleSide,
  });
  const rails = new Mesh(geometry, steel);
  rails.name = 'armco';
  rails.castShadow = true;
  rails.receiveShadow = true;
  ctx.root.add(rails);
  const postMesh = new InstancedMesh(
    new CylinderGeometry(0.06, 0.06, 1, 6),
    ctx.materials.steelDark,
    posts.length,
  );
  const matrix = new Matrix4();
  posts.forEach(([x, z], k) => postMesh.setMatrixAt(k, matrix.makeScale(1, 1.15, 1).setPosition(x, 0.55, z)));
  postMesh.castShadow = true;
  postMesh.receiveShadow = true;
  ctx.root.add(postMesh);
  return runs;
}

/**
 * Teal tyre stacks at the approach end of every tyre wall (the barrier-material walls built by
 * track-surfaces.js): three stacks of five tyres in front of the wall's first metres, offset towards
 * the track, read from the wall geometry's first face.
 */
function buildTyreStacks(ctx) {
  const stacks = [];
  ctx.root.traverse((node) => {
    if (!node.isMesh || node.material !== ctx.materials.barrier) return;
    const position = node.geometry.attributes.position;
    const normal = node.geometry.attributes.normal;
    // strip.js buildBarrierWall: the track-side face comes first, two vertices (foot, top) per sample,
    // its normal pointing at the centre line
    const x0 = position.getX(0);
    const z0 = position.getZ(0);
    const x1 = position.getX(2);
    const z1 = position.getZ(2);
    const len = Math.hypot(x1 - x0, z1 - z0) || 1;
    const tx = (x1 - x0) / len;
    const tz = (z1 - z0) / len;
    const nx = normal.getX(0);
    const nz = normal.getZ(0);
    for (let k = 0; k < 3; k++)
      stacks.push([x0 + tx * (0.4 + k * 0.72) + nx * 0.45, z0 + tz * (0.4 + k * 0.72) + nz * 0.45]);
  });
  if (!stacks.length) return;
  const tyres = new InstancedMesh(
    new CylinderGeometry(0.33, 0.33, 0.24, 14),
    new MeshStandardMaterial({ color: 0x067b7b, roughness: 0.8 }),
    stacks.length * 5,
  );
  const matrix = new Matrix4();
  stacks.forEach(([x, z], s) => {
    for (let level = 0; level < 5; level++)
      tyres.setMatrixAt(s * 5 + level, matrix.makeTranslation(x, 0.12 + level * 0.245, z));
  });
  tyres.castShadow = true;
  tyres.receiveShadow = true;
  tyres.name = 'tyre-stacks';
  ctx.root.add(tyres);
}

export { ARMCO_OFFSET, armcoRuns, buildArmco, buildTyreStacks };
