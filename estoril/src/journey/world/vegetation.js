// Mediterranean–Atlantic vegetation (docs/references.md §4.2): stone and maritime pines,
// eucalyptus, holm/cork oaks, a few cypresses, kermes-oak/mastic scrub, pampas grass on disturbed
// banks, and grass tufts along the verges.
//
// Placement (build time, seeded, its own random streams):
//   - occupancy (env/occupancy.js) is built from the finished world, so nothing grows on the
//     asphalt, kerbs, run-off, gravel, barrier walls, pit lane, paddock, roads or buildings: every
//     instance is checked exactly against its own clearance (crown radius for trees, footprint for
//     scrub and tufts) and, for trees and scrub, a minimum distance from the track asphalt;
//   - density is a world-space field: tree belts 30–110 m beyond the asphalt edge (outside the
//     loop, behind the barriers), woods and clearings farther out from the shared noise image
//     (env/noise.js, the same values the grass shader reads, so the woods stand on the greener
//     ground), denser on slopes, a sparse infield (oaks and scrub clumps only, ≥ 45 m from the
//     track), and a cut-off before the edge of the ground mesh. Candidates sit on a jittered grid
//     (a cheap Poisson-disc stand-in: no two trunks closer than ~2 m) and are kept with probability
//     density · k, k solved so the expected count meets the quality budget;
//   - species follow the reference shares, clustered by noise (eucalyptus stands, oaks in the
//     infield and on the belt's front edge, maritime pines on slopes, cypresses near buildings);
//     each instance gets its own yaw, lean, non-uniform scale and tint (drier ground, more olive).
// Rendering: env/instanced-lod.js (detailed near models with shadows, coarse far models, dithered
// cross-fade); the grass tufts are one static InstancedMesh that shrinks to nothing between the
// tuft fade distances (vertex shader) and uses alpha-to-coverage when MSAA is on; the ground under
// the canopies is darkened by a world-space canopy occlusion map read by the grass shader.
//
// The old vegetation drew from the shared ctx.rng before the clouds; buildVegetation() leaves the
// stream in the state it had reached then, so the clouds stay where they were.
import {
  Color,
  DataTexture,
  DoubleSide,
  InstancedMesh,
  LinearFilter,
  Matrix4,
  MeshStandardMaterial,
  PlaneGeometry,
  Quaternion,
  RedFormat,
  Euler,
  Vector3,
  Vector2,
} from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { createLodSpecies, createVegetationMaterials } from '../env/instanced-lod.js';
import { sampleNoise } from '../env/noise.js';
import { createOccupancy } from '../env/occupancy.js';
import { DRY_EDGES, patchMaterial } from '../env/shading.js';
import { buildSpeciesGeometry } from '../env/tree-models.js';
import { grassTuftTexture } from '../textures.js';
import { clamp, smoothstep as ease } from '../util/math.js';
import { createRng } from '../util/rng.js';
import { groundHeightAt, groundSlopeAt } from './terrain.js';

/** Instance budgets at density 1 ('high'); context.js scales them by 0.6 ('mid') and 0.35 ('low'). */
const BUDGET = { trees: 5200, scrub: 4200, pampas: 60, tufts: 9000 };
/** Near/far cross-fade (metres from the camera) per quality. */
const LOD_FADE = { high: [105, 140], mid: [80, 105], low: [48, 62] };
/** Grass tufts shrink away between these distances (metres) per quality. */
const TUFT_FADE = { high: [42, 66], mid: [32, 50], low: [20, 30] };
/** Least distance (metres) from the track asphalt edge: trees (references §4.2), scrub, tufts. */
const TRACK_CLEARANCE = { tree: 25, infieldTree: 45, scrub: 8, tuft: 1.2 };
/** Extra clearance (metres) beyond an instance's own radius from anything solid. */
const SOLID_MARGIN = { tree: 1.5, scrub: 0.6, tuft: 0.4 };
/** Tree species: reference share (§4.2), scale range. */
const TREE_SPECIES = [
  { name: 'stonePine', share: 0.33, scale: [0.8, 1.25], lean: 0.08 },
  { name: 'eucalyptus', share: 0.24, scale: [0.75, 1.2], lean: 0.03 },
  { name: 'holmOak', share: 0.25, scale: [0.75, 1.3], lean: 0.03 },
  { name: 'maritimePine', share: 0.15, scale: [0.8, 1.2], lean: 0.05 },
  { name: 'cypress', share: 0.03, scale: [0.85, 1.2], lean: 0.01 },
];
/** Shared-rng state reached by the pre-rework vegetation per quality (keeps the clouds in place). */
const CLOUD_RNG_STATE = { high: 464728694, mid: 2786073173, low: 799962821 };
/** Area the vegetation covers: inside this ground radius (terrain.js metric), metres. */
const MAX_GROUND_RADIUS = 1520;

const smooth = (a, b, x) => ease(clamp((x - a) / (b - a), 0, 1));
const groundRadius = (x, z) => Math.hypot(x / 1.15, z * 1.25);
/** The grass shader's dryness (env/shading.js shadeGrass), 0 green … 1 dry. */
const dryness = (x, z) =>
  smooth(
    DRY_EDGES[0],
    DRY_EDGES[1],
    sampleNoise(0, x / 1730 + 0.31, z / 1730 + 0.77) * 0.45 +
      sampleNoise(0, x / 523, z / 523) * 0.35 +
      sampleNoise(1, x / 151 + 0.5, z / 151 + 0.5) * 0.2,
  );

const slopeAt = groundSlopeAt;

/**
 * Keeps candidates with probability min(1, density · k), k chosen (bisection) so that the expected
 * number kept is `budget`. Returns the candidate indices kept, in order.
 */
function thin(density, budget, random) {
  let total = 0;
  for (let i = 0; i < density.length; i++) total += density[i];
  if (!(total > 0)) return [];
  let lo = 0;
  let hi = 1e6;
  for (let iteration = 0; iteration < 28; iteration++) {
    const k = (lo + hi) / 2;
    let expected = 0;
    for (let i = 0; i < density.length; i++) expected += Math.min(1, density[i] * k);
    if (expected > budget) hi = k;
    else lo = k;
  }
  const kept = [];
  for (let i = 0; i < density.length; i++) if (random() < Math.min(1, density[i] * lo)) kept.push(i);
  return kept;
}

/**
 * Woods with edges: 88 % of `budget` goes to the candidates whose score is above a threshold τ
 * (kept with probability smoothstep over τ ± 0.03, so woods are dense, continuous canopies with
 * soft edges), τ found by bisection; the other 12 % are lone trees spread evenly over the
 * remaining open candidates (`open` = 1). Returns the indices kept, in order.
 */
function thinWoods(scores, open, budget, random) {
  const n = scores.length;
  const keep = new Float32Array(n);
  const expectedAbove = (tau) => {
    let sum = 0;
    for (let i = 0; i < n; i++) sum += smooth(tau - 0.03, tau + 0.03, scores[i]);
    return sum;
  };
  let lo = -1;
  let hi = 2;
  for (let iteration = 0; iteration < 24; iteration++) {
    const tau = (lo + hi) / 2;
    if (expectedAbove(tau) > budget * 0.88) lo = tau;
    else hi = tau;
  }
  let openSum = 0;
  for (let i = 0; i < n; i++) {
    keep[i] = smooth(hi - 0.03, hi + 0.03, scores[i]);
    openSum += open[i] * (1 - keep[i]);
  }
  const lone = openSum > 0 ? Math.min(1, (budget * 0.12) / openSum) : 0;
  const kept = [];
  for (let i = 0; i < n; i++) if (random() < keep[i] + (1 - keep[i]) * open[i] * lone) kept.push(i);
  return kept;
}

/** Instance arrays for one species: matrices, colours, origins. */
function instanceArrays(capacity) {
  return {
    count: 0,
    matrices: new Float32Array(capacity * 16),
    colors: new Float32Array(capacity * 3),
    x: new Float32Array(capacity),
    y: new Float32Array(capacity),
    z: new Float32Array(capacity),
    scale: new Float32Array(capacity),
  };
}

const tmpMatrix = new Matrix4();
const tmpQuaternion = new Quaternion();
const tmpEuler = new Euler();
const tmpScale = new Vector3();
const tmpPosition = new Vector3();

/** Appends one instance (yaw, lean, non-uniform scale, tint) to `arrays`. */
function addInstance(arrays, x, y, z, { yaw, leanX, leanZ, sx, sy, sz, r, g, b, scale }) {
  const n = arrays.count++;
  tmpEuler.set(leanX, yaw, leanZ, 'YXZ');
  tmpQuaternion.setFromEuler(tmpEuler);
  tmpMatrix.compose(tmpPosition.set(x, y, z), tmpQuaternion, tmpScale.set(sx, sy, sz));
  tmpMatrix.toArray(arrays.matrices, n * 16);
  arrays.colors[n * 3] = r;
  arrays.colors[n * 3 + 1] = g;
  arrays.colors[n * 3 + 2] = b;
  arrays.x[n] = x;
  arrays.y[n] = y;
  arrays.z[n] = z;
  arrays.scale[n] = scale;
}

/** Trims instance arrays to their count. */
function trimmed(arrays) {
  const n = arrays.count;
  return {
    count: n,
    matrices: arrays.matrices.slice(0, n * 16),
    colors: arrays.colors.slice(0, n * 3),
    x: arrays.x.slice(0, n),
    y: arrays.y.slice(0, n),
    z: arrays.z.slice(0, n),
    scale: arrays.scale.slice(0, n),
  };
}

/** Picks an index from weights with one random draw. */
function pick(weights, u) {
  let total = 0;
  for (const w of weights) total += w;
  let t = u * total;
  for (let i = 0; i < weights.length; i++) {
    t -= weights[i];
    if (t <= 0) return i;
  }
  return weights.length - 1;
}

/**
 * Trees: candidates on a jittered 8 m grid (every other one, at double weight, beyond ground radius
 * 800 m, where trees are only seen from afar), density field, thinning, exact clearance, species.
 */
function placeTrees(occ, shape, models, budget) {
  const random = createRng(4201);
  const SPACING = 8;
  const xs = [];
  const zs = [];
  const scores = [];
  const open = [];
  for (let iz = 0, gz = -1300; gz <= 1300; gz += SPACING, iz++)
    for (let ix = 0, gx = -1850; gx <= 1850; gx += SPACING, ix++) {
      const coarse = groundRadius(gx, gz) > 800;
      if ((coarse && (ix + iz) % 2) || groundRadius(gx, gz) > MAX_GROUND_RADIUS + 10) continue;
      const x = gx + (random() - 0.5) * SPACING * 0.75;
      const z = gz + (random() - 0.5) * SPACING * 0.75;
      const radius = groundRadius(x, z);
      if (radius > MAX_GROUND_RADIUS) continue;
      const track = occ.trackDistance(x, z);
      if (track < TRACK_CLEARANCE.tree - 3 || shape.isKeepClearZone(x, z)) continue;
      const infield = occ.infield(x, z);
      // woodland score: broad woods and clearings, broken up at ~60 m, plus the belt behind the
      // barriers (outside the loop), slopes, and fewer trees towards the edge of the ground
      let score =
        sampleNoise(0, x / 1400 + 0.13, z / 1400 + 0.71) * 0.55 +
        sampleNoise(1, x / 600, z / 600) * 0.25 +
        sampleNoise(2, x / 260, z / 260) * 0.2;
      if (infield) score -= 0.3 * (1 - smooth(60, 160, track));
      else score += 0.3 * smooth(28, 38, track) * (1 - smooth(70, 110, track));
      if (radius > 700) score += 0.6 * Math.min(0.3, slopeAt(x, z));
      score -= 0.2 * smooth(950, MAX_GROUND_RADIUS, radius);
      xs.push(x);
      zs.push(z);
      scores.push(score);
      open.push(radius < 800 && (!infield || track > TRACK_CLEARANCE.infieldTree) ? 1 : 0);
    }
  const kept = thinWoods(Float32Array.from(scores), Uint8Array.from(open), budget * 1.06, random);
  const arrays = TREE_SPECIES.map(() => instanceArrays(kept.length));
  let placed = 0;
  for (const i of kept) {
    if (placed >= budget) break; // the budget is a hard cap
    const x = xs[i];
    const z = zs[i];
    const infield = occ.infield(x, z);
    const track = occ.trackDistance(x, z);
    const near = occ.solidDistance(x, z);
    const stand = smooth(0.55, 0.75, sampleNoise(1, x / 2200 + 0.4, z / 2200 + 0.1));
    const slope = groundRadius(x, z) > 700 ? Math.min(0.3, slopeAt(x, z)) : 0;
    const belt = infield ? 0 : 1 - smooth(45, 90, track);
    const weights = [
      0.33 * (1 + 0.6 * belt),
      0.24 * (0.3 + 2.6 * stand) * (infield ? 0.2 : 1),
      0.25 * (infield ? 4 : 1 + 0.8 * belt),
      0.15 * (1 + 6 * slope),
      0.03 * (near < 45 && track > 40 ? 4 : 0.5),
    ];
    const s = pick(weights, random());
    const species = TREE_SPECIES[s];
    const model = models[species.name];
    const scale = species.scale[0] + random() * (species.scale[1] - species.scale[0]);
    const sx = scale * (0.9 + random() * 0.2);
    const sz = scale * (0.9 + random() * 0.2);
    const sy = scale * (0.88 + random() * 0.24);
    const radius = model.radius * Math.max(sx, sz);
    const trackClearance = infield ? TRACK_CLEARANCE.infieldTree : TRACK_CLEARANCE.tree;
    const yaw = random() * Math.PI * 2;
    const leanX = (random() - 0.5) * 2 * species.lean;
    const leanZ = (random() - 0.5) * 2 * species.lean;
    const tone = 0.86 + random() * 0.26;
    const dry = dryness(x, z);
    if (!occ.clear(x, z, Math.max(trackClearance, radius * 0.6), radius + SOLID_MARGIN.tree)) continue;
    const y = groundHeightAt(x, z) - 0.12 - 0.5 * slope; // sunk a little, more on slopes
    placed++;
    addInstance(arrays[s], x, y, z, {
      yaw,
      leanX,
      leanZ,
      sx,
      sy,
      sz,
      r: tone * (1 + 0.1 * dry),
      g: tone * (1 + 0.02 * dry),
      b: tone * (1 - 0.12 * dry),
      scale,
    });
  }
  return Object.fromEntries(TREE_SPECIES.map((species, s) => [species.name, trimmed(arrays[s])]));
}

/** Scrub mounds (and pampas clumps on banks behind the barriers). */
function placeScrub(occ, shape, models, budget, pampasBudget) {
  const random = createRng(4307);
  const SPACING = 4.5;
  const { x0, z0, x1, z1 } = occ.bounds;
  const xs = [];
  const zs = [];
  const density = [];
  const banks = [];
  for (let gz = z0; gz <= z1; gz += SPACING)
    for (let gx = x0; gx <= x1; gx += SPACING) {
      const x = gx + (random() - 0.5) * SPACING * 0.8;
      const z = gz + (random() - 0.5) * SPACING * 0.8;
      const track = occ.trackDistance(x, z);
      if (track < TRACK_CLEARANCE.scrub - 3 || groundRadius(x, z) > 1100) continue;
      const clumps = smooth(0.5, 0.85, sampleNoise(2, x / 160, z / 160));
      const woods = smooth(0.4, 0.62, sampleNoise(0, x / 1400 + 0.13, z / 1400 + 0.71));
      let d;
      if (occ.infield(x, z)) d = 0.45 * clumps * smooth(14, 24, track);
      else {
        const fringe = smooth(12, 22, track) * (1 - smooth(45, 80, track));
        d = Math.max(fringe * (0.35 + 0.65 * clumps), 0.3 * clumps * (0.4 + 0.6 * woods));
      }
      if (shape.isKeepClearZone(x, z)) d *= 0.15;
      if (d > 0.001) {
        xs.push(x);
        zs.push(z);
        density.push(d);
      }
      const solid = occ.solidDistance(x, z);
      if (solid > 2 && solid < 9 && track > 30 && sampleNoise(1, x / 300, z / 300) > 0.6) banks.push([x, z]);
    }
  const scrub = instanceArrays(budget * 2);
  for (const i of thin(Float32Array.from(density), budget * 1.05, random)) {
    if (scrub.count >= budget) break; // hard cap
    const x = xs[i];
    const z = zs[i];
    const scale = 0.5 + random() * random() * 0.9;
    const sx = scale * (0.8 + random() * 0.5);
    const sz = scale * (0.8 + random() * 0.5);
    const sy = scale * (0.7 + random() * 0.6);
    const yaw = random() * Math.PI * 2;
    const tone = 0.85 + random() * 0.3;
    const dry = dryness(x, z);
    const radius = models.scrub.radius * Math.max(sx, sz);
    if (!occ.clear(x, z, TRACK_CLEARANCE.scrub, radius + SOLID_MARGIN.scrub)) continue;
    addInstance(scrub, x, groundHeightAt(x, z) - 0.08, z, {
      yaw,
      leanX: 0,
      leanZ: 0,
      sx,
      sy,
      sz,
      r: tone * (1 + 0.12 * dry),
      g: tone,
      b: tone * (1 - 0.1 * dry),
      scale,
    });
  }
  const pampas = instanceArrays(pampasBudget);
  for (let k = 0; k < banks.length && pampas.count < pampasBudget; k++) {
    const pickAt = k + Math.floor(random() * (banks.length - k)); // without replacement
    [banks[k], banks[pickAt]] = [banks[pickAt], banks[k]];
    const [x, z] = banks[k];
    const scale = 0.85 + random() * 0.35;
    const yaw = random() * Math.PI * 2;
    if (!occ.clear(x, z, TRACK_CLEARANCE.scrub, models.pampas.radius * scale + SOLID_MARGIN.scrub)) continue;
    addInstance(pampas, x, groundHeightAt(x, z) - 0.05, z, {
      yaw,
      leanX: 0,
      leanZ: 0,
      sx: scale,
      sy: scale,
      sz: scale,
      r: 1,
      g: 1,
      b: 1,
      scale,
    });
  }
  return { scrub: trimmed(scrub), pampas: trimmed(pampas) };
}

/**
 * Grass tufts: three crossed 1 × 0.62 m cards (normals up, so they light like the ground), standing
 * on the verges: 75 % within 2–48 m of the asphalt edge all round the lap (more near the edge, in
 * noise clumps), 25 % anywhere around the straight, the pits and the paddock edges.
 */
function placeTufts(occ, model, budget) {
  const random = createRng(4409);
  const tufts = instanceArrays(budget);
  const { line, halfWidth } = model;
  const tryAt = (x, z) => {
    if (tufts.count >= budget) return;
    const clump = sampleNoise(2, x / 35, z / 35);
    if (clump < 0.42 + random() * 0.2) return;
    const scale = 0.6 + random() * 0.65;
    const yaw = random() * Math.PI;
    if (!occ.clear(x, z, TRACK_CLEARANCE.tuft, 0.5 * scale + SOLID_MARGIN.tuft)) return;
    const dry = dryness(x, z);
    // tinted towards the grass under it (the texture is a mid green; × GRASS_GAIN like the ground)
    const tone = (0.72 + random() * 0.3) * 1.5;
    addInstance(tufts, x, groundHeightAt(x, z), z, {
      yaw,
      leanX: 0,
      leanZ: 0,
      sx: scale,
      sy: scale * (0.8 + random() * 0.4),
      sz: scale,
      r: tone * (0.78 + 0.5 * dry),
      g: tone * (0.92 + 0.05 * dry),
      b: tone * (0.6 + 0.1 * dry),
      scale,
    });
  };
  const alongTrack = Math.round(budget * 0.75);
  for (let attempt = 0; attempt < alongTrack * 4 && tufts.count < alongTrack; attempt++) {
    const i = Math.floor(random() * line.count);
    const side = random() < 0.5 ? -1 : 1;
    const offset = side * (halfWidth[i] + 2 + Math.pow(random(), 1.7) * 46);
    tryAt(line.x[i] + line.nx[i] * offset, line.z[i] + line.nz[i] * offset);
  }
  for (let attempt = 0; attempt < budget * 6 && tufts.count < budget; attempt++)
    tryAt(-620 + random() * 1100, 60 + random() * 230);
  return trimmed(tufts);
}

/** The static tuft mesh: alpha-tested (alpha-to-coverage with MSAA), swaying, shrinking with distance. */
function buildTuftMesh(ctx, data, fade) {
  const cards = [];
  for (let k = 0; k < 3; k++) {
    const card = new PlaneGeometry(1, 0.62);
    card.translate(0, 0.31, 0);
    card.rotateY((k * Math.PI) / 3);
    cards.push(card);
  }
  const geometry = mergeGeometries(cards);
  const normal = geometry.attributes.normal;
  for (let i = 0; i < normal.count; i++) normal.setXYZ(i, 0, 1, 0);
  const material = new MeshStandardMaterial({
    map: grassTuftTexture(),
    alphaTest: 0.5,
    alphaToCoverage: ctx.quality !== 'low',
    side: DoubleSide,
    roughness: 1,
  });
  const time = { value: 0 };
  patchMaterial(material, 'tufts', ctx.textures.detail, {
    uniforms: { envTime: time, envTuftFade: { value: new Vector2(fade[0], fade[1]) } },
    vertex: {
      head: 'uniform float envTime;\nuniform vec2 envTuftFade;\n',
      begin_vertex: /* glsl */ `
      #include <begin_vertex>
      {
        vec3 origin = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
        float keep = 1.0 - smoothstep(envTuftFade.x, envTuftFade.y, distance(origin, cameraPosition));
        float sway = sin(envTime * 1.7 + origin.x * 0.37 + origin.z * 0.23) * 0.12 * uv.y * keep;
        transformed.y *= keep;
        transformed.xz *= keep > 0.001 ? mix(0.35, 1.0, keep) : 0.0;
        transformed.x += sway;
        transformed.z += sway * 0.6;
      }`,
    },
  });
  const mesh = new InstancedMesh(geometry, material, Math.max(1, data.count));
  mesh.name = 'grass-tufts';
  mesh.count = data.count;
  mesh.instanceMatrix.array.set(data.matrices);
  mesh.setColorAt(0, new Color(1, 1, 1));
  mesh.instanceColor.array.set(data.colors);
  mesh.receiveShadow = true;
  mesh.castShadow = false;
  mesh.computeBoundingSphere();
  ctx.root.add(mesh);
  return { mesh, time };
}

/**
 * Canopy occlusion: a world-space R8 map (CANOPY_TEXELS², 1.5 texels per crown radius at least) of
 * soft discs under every tree and scrub instance, read by the grass shader (shading.js) to darken
 * the ground under the woods (the far trees cast no shadow-map shadows).
 */
const CANOPY_SIZE = [1024, 720];
const CANOPY_BOUNDS = [-1850, -1300, 1850, 1300];
function canopyTexture(sets) {
  const [w, h] = CANOPY_SIZE;
  const [bx0, bz0, bx1, bz1] = CANOPY_BOUNDS;
  const sx = w / (bx1 - bx0);
  const sz = h / (bz1 - bz0);
  const acc = new Float32Array(w * h);
  for (const { data, radius, strength } of sets)
    for (let i = 0; i < data.count; i++) {
      const r = radius * data.scale[i] * 1.15;
      const cx = (data.x[i] - bx0) * sx;
      const cz = (data.z[i] - bz0) * sz;
      const rx = Math.max(1.5, r * sx);
      const rz = Math.max(1.5, r * sz);
      // a disc widened to 1.5 texels keeps the occlusion it would have had (same integral)
      const weight = strength * Math.min(1, (r * sx) / rx) * Math.min(1, (r * sz) / rz) || 0;
      for (let z = Math.floor(cz - rz); z <= Math.ceil(cz + rz); z++)
        for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
          if (x < 0 || z < 0 || x >= w || z >= h) continue;
          const d2 = ((x + 0.5 - cx) / rx) ** 2 + ((z + 0.5 - cz) / rz) ** 2;
          if (d2 < 1) acc[z * w + x] += weight * (1 - d2) * (1 - d2);
        }
    }
  const bytes = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) bytes[i] = Math.round(255 * Math.min(1, acc[i]));
  const texture = new DataTexture(bytes, w, h, RedFormat);
  texture.magFilter = texture.minFilter = LinearFilter;
  texture.generateMipmaps = false;
  texture.unpackAlignment = 1;
  texture.name = 'env-canopy';
  texture.needsUpdate = true;
  return texture;
}

/**
 * Builds the vegetation into ctx.root and registers its per-frame updater (time, dt, camera):
 * near-set refills and the tufts' sway time. Returns { species, tufts, stats } for tests.
 */
function buildVegetation(ctx, shape) {
  const { materials, quality, density } = ctx;
  const model = ctx.root.userData.trackModel;
  const timings = {};
  let clock = performance.now();
  const lap = (name) => {
    const now = performance.now();
    timings[name] = Math.round(now - clock);
    clock = now;
  };
  // occupancy of the finished world (painted lines lie on asphalt and are left out)
  materials.line.userData.envSkipOccupancy = true;
  const skip = new Set(
    ctx.root.children.filter((o) => o.name === 'ground' || o.name === 'hills' || o.name === 'clouds'),
  );
  const occ = createOccupancy(ctx.root, { trackMaterial: materials.asphalt, skip, loop: model.line });
  lap('occupancy');

  const models = {};
  for (const name of [...TREE_SPECIES.map((s) => s.name), 'scrub', 'pampas'])
    models[name] = buildSpeciesGeometry(name);
  lap('models');
  const trees = placeTrees(occ, shape, models, Math.round(BUDGET.trees * density));
  lap('trees');
  const { scrub, pampas } = placeScrub(
    occ,
    shape,
    models,
    Math.round(BUDGET.scrub * density),
    Math.round(BUDGET.pampas * density),
  );
  lap('scrub');
  const tuftData = placeTufts(occ, model, Math.round(BUDGET.tufts * density));
  lap('tufts');

  const [fadeStart, fadeEnd] = LOD_FADE[quality] || LOD_FADE.mid;
  const vegetationMaterials = createVegetationMaterials(ctx.textures.detail, {
    value: new Vector2(fadeStart, fadeEnd),
  });
  const castShadow = quality !== 'low';
  const species = [];
  for (const [name, data] of [...Object.entries(trees), ['scrub', scrub], ['pampas', pampas]]) {
    if (!data.count) continue;
    const lod = createLodSpecies(models[name], vegetationMaterials, data, {
      name,
      fadeEnd,
      castShadow: castShadow && name !== 'scrub' && name !== 'pampas',
    });
    ctx.root.add(lod.far, lod.near);
    species.push({ name, lod, data, radius: models[name].radius });
  }
  const tufts = buildTuftMesh(ctx, tuftData, TUFT_FADE[quality] || TUFT_FADE.mid);

  const canopy = canopyTexture([
    ...Object.entries(trees).map(([name, data]) => ({ data, radius: models[name].radius, strength: 0.42 })),
    { data: scrub, radius: models.scrub.radius, strength: 0.3 },
  ]);
  const grassUniforms = materials.ground.userData.uniforms;
  grassUniforms.envCanopy.value = canopy;
  grassUniforms.envCanopyBounds.value.set(...CANOPY_BOUNDS);
  lap('meshes');

  ctx.updaters.push((time, dt, camera) => {
    tufts.time.value = time;
    if (!camera) return;
    const p = camera.position;
    for (const { lod } of species) lod.update(p.x, p.y, p.z);
  });
  // the shared stream continues where the old vegetation left it (clouds come next)
  ctx.rng = createRng(CLOUD_RNG_STATE[quality] ?? CLOUD_RNG_STATE.high);
  return { species, tufts: { mesh: tufts.mesh, data: tuftData }, occupancy: occ, models, timings };
}

export { BUDGET, LOD_FADE, TRACK_CLEARANCE, TUFT_FADE, buildVegetation };
