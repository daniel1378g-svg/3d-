// Two-level instanced vegetation with a short, per-instance dithered transition (no popping, and no
// stippled band in still frames) and few draw calls.
//
// Per species:
//   far   one static InstancedMesh with EVERY instance (coarse model), no shadows; it is what the
//         depth range indexes (its geometry's bounding box is the union of both levels, see
//         tree-models.js), and what the aerial shots see;
//   near  one InstancedMesh holding only the instances within reach of the camera (detailed model,
//         casts shadows on 'high'/'mid'). Its instance buffer is refilled when the camera has moved
//         more than REFILL_STEP metres since the last fill, from a bucket grid, with every instance
//         within fadeEnd + 2 · REFILL_STEP: an instance therefore enters the near set while it is
//         still far, and leaves it only once it is far again.
//
// Level state: every instance has a level s in [0, 1] (0 near, 1 far), in a per-instance attribute
// (aLodFade) of both meshes. Both levels draw an instance with a screen-space dither split by s: a
// fragment of the near level is kept where the interleaved-gradient noise n >= s, a fragment of the
// far level where n < s, so the two together always cover the tree exactly once. s is NOT a function
// of distance (which made a static stippled band of half-faded trees between fadeStart and fadeEnd):
//   - each instance of the near set has a target level, switched with hysteresis around the middle
//     of the fade band (far beyond mid + HYSTERESIS · width, near below mid − HYSTERESIS · width);
//   - s moves towards the target over TRANSITION seconds, so a tree crossing the switch distance
//     dissolves from one model to the other in a fraction of a second, and only while the camera
//     moves; at rest every tree is fully near or fully far;
//   - s is held within distance bounds (fully near below fadeStart − 6 m, fully far from fadeEnd,
//     both easing in beyond the switch distances), so even a very fast camera never takes a
//     half-faded tree out of the near set, and a settled tree is never held half-faded;
//   - on a snap (renderAt, captures) or a camera jump, s goes straight to its target.
//
// update() allocates nothing (typed arrays, a fixed bucket walk, reused update ranges).
import { Color, InstancedBufferAttribute, InstancedMesh, MeshStandardMaterial } from 'three';
import { patchMaterial } from './shading.js';

const WHITE = new Color(1, 1, 1);

/** The camera must move this far (metres) before the near set is refilled. */
const REFILL_STEP = 6;
/** Bucket size (metres) of the instance grid used for the refill. */
const BUCKET = 64;
/** Seconds a tree takes to dissolve from one level to the other. */
const TRANSITION = 0.45;
/** Half the hysteresis gap around the switch distance, as a fraction of the fade band's width. */
const HYSTERESIS = 0.15;
/** A camera move longer than this (metres) in one frame is a cut: levels jump to their targets. */
const JUMP = 30;

/**
 * The two shared vegetation materials (near, far): vertex colours × instance colour, roughness 0.92,
 * a world-space leaf-cluster breakup on foliage (aLeaf = 1), faint vertical streaks on bark, and the
 * level dither driven by the per-instance aLodFade.
 */
function createVegetationMaterials(detail) {
  const make = (level) => {
    const material = new MeshStandardMaterial({ vertexColors: true, roughness: 0.92, metalness: 0 });
    return patchMaterial(material, 'vegetation-' + level, detail, {
      vertex: {
        head: 'attribute float aLeaf;\nattribute float aLodFade;\nvarying float vEnvLeaf;\nvarying float vEnvFade;\n',
        fog_vertex: /* glsl */ `
        #include <fog_vertex>
        vEnvFade = aLodFade;
        vEnvLeaf = aLeaf;`,
      },
      fragmentHead: 'varying float vEnvLeaf;\nvarying float vEnvFade;\n',
      fragment: {
        clipping_planes_fragment: /* glsl */ `
        #include <clipping_planes_fragment>
        {
          float n = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
          if (${level === 'near' ? 'n < vEnvFade' : 'n >= vEnvFade'}) discard;
        }`,
        map_fragment: /* glsl */ `
        {
          vec3 p = vEnvPos;
          if (vEnvLeaf > 0.5) {
            float a = texture(envNoise, vec2(p.x + p.y * 0.6, p.z - p.y * 0.6) / 2.4).r;
            float b = texture(envNoise, vec2(p.x - p.y * 0.4, p.z + p.y * 0.5) / 9.0).g;
            float c = texture(envNoise, vec2(p.x + p.y * 0.3, p.z + p.y * 0.7) / 5.3).g;
            diffuseColor.rgb *= (0.72 + 0.56 * a) * (0.88 + 0.24 * b) * (0.8 + 0.35 * c);
          } else {
            diffuseColor.rgb *= 0.86 + 0.28 * texture(envNoise, vec2((p.x + p.z) / 0.7, p.y / 6.0)).g;
          }
        }`,
      },
    });
  };
  return { near: make('near'), far: make('far') };
}

const smooth = (a, b, x) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * @param {object} species { near, far } geometries (tree-models.js)
 * @param {{near: Material, far: Material}} materials createVegetationMaterials()
 * @param {object} data { count, matrices: Float32Array(16n), colors: Float32Array(3n),
 *   x, y, z: Float32Array(n) } instance transforms (world), tints (linear RGB) and origins
 * @param {object} options { name, fadeStart, fadeEnd (metres), castShadow }
 */
function createLodSpecies(species, materials, data, { name, fadeStart, fadeEnd, castShadow }) {
  const { count, matrices, colors, x, y, z } = data;
  const capacityFar = Math.max(1, count);
  const far = new InstancedMesh(species.far, materials.far, capacityFar);
  far.name = name + '-far';
  far.count = count;
  far.instanceMatrix.array.set(matrices);
  far.instanceMatrix.needsUpdate = true;
  far.setColorAt(0, WHITE); // creates instanceColor
  far.instanceColor.array.set(colors);
  far.instanceColor.needsUpdate = true;
  far.castShadow = false;
  far.receiveShadow = true;
  far.computeBoundingSphere();
  // the level attribute goes on the species' own geometries (each is drawn by one mesh only)
  const farFade = new InstancedBufferAttribute(new Float32Array(capacityFar).fill(1), 1);
  species.far.setAttribute('aLodFade', farFade);

  // bucket grid (CSR) over the instances' plan positions
  let minX = Infinity;
  let minZ = Infinity;
  let maxX = -Infinity;
  let maxZ = -Infinity;
  for (let i = 0; i < count; i++) {
    minX = Math.min(minX, x[i]);
    maxX = Math.max(maxX, x[i]);
    minZ = Math.min(minZ, z[i]);
    maxZ = Math.max(maxZ, z[i]);
  }
  if (!count) minX = minZ = maxX = maxZ = 0;
  const columns = Math.max(1, Math.ceil((maxX - minX) / BUCKET) + 1);
  const rows = Math.max(1, Math.ceil((maxZ - minZ) / BUCKET) + 1);
  const start = new Int32Array(columns * rows + 1);
  const order = new Int32Array(count);
  const bucketOf = (i) => Math.floor((z[i] - minZ) / BUCKET) * columns + Math.floor((x[i] - minX) / BUCKET);
  for (let i = 0; i < count; i++) start[bucketOf(i) + 1]++;
  for (let b = 0; b < columns * rows; b++) start[b + 1] += start[b];
  const fill = start.slice(0, columns * rows);
  for (let i = 0; i < count; i++) order[fill[bucketOf(i)]++] = i;

  // near capacity: the most instances any refill can collect, i.e. the fullest window of buckets a
  // refill walks (an upper bound, so a near instance is never missing)
  const reach = fadeEnd + 2 * REFILL_STEP;
  const span = Math.ceil((2 * reach) / BUCKET) + 1;
  let capacity = 1;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < columns; c++) {
      let sum = 0;
      for (let rr = r; rr < Math.min(rows, r + span); rr++)
        for (let cc = c; cc < Math.min(columns, c + span); cc++) {
          const b = rr * columns + cc;
          sum += start[b + 1] - start[b];
        }
      capacity = Math.max(capacity, sum);
    }

  const nearFade = new InstancedBufferAttribute(new Float32Array(capacity), 1);
  species.near.setAttribute('aLodFade', nearFade);
  const near = new InstancedMesh(species.near, materials.near, capacity);
  near.name = name + '-near';
  near.count = 0;
  near.setColorAt(0, WHITE);
  near.castShadow = castShadow;
  near.receiveShadow = true;
  const nearMatrices = near.instanceMatrix.array;
  const nearColors = near.instanceColor.array;
  const nearLevels = nearFade.array;
  const farLevels = farFade.array;
  // partial uploads: one reused { start, count } per attribute, put back after three.js clears the
  // attribute's range list on upload (addUpdateRange would allocate a new object every time)
  const ranges = new Map(
    [near.instanceMatrix, near.instanceColor, nearFade].map((a) => [a, { start: 0, count: 0 }]),
  );
  const upload = (attribute, count) => {
    const range = ranges.get(attribute);
    range.count = count;
    if (!attribute.updateRanges.includes(range)) attribute.updateRanges.push(range);
    attribute.needsUpdate = true;
  };

  // level state per instance (1 far, 0 near) and its target; the near set's instance indices
  const level = new Float32Array(count).fill(1);
  const target = new Uint8Array(count).fill(1);
  let nearIndex = new Int32Array(capacity);
  let previous = new Int32Array(capacity);
  let previousCount = 0;
  const member = new Uint8Array(count);

  const width = fadeEnd - fadeStart;
  const toFar = fadeStart + width * (0.5 + HYSTERESIS);
  const toNear = fadeStart + width * (0.5 - HYSTERESIS);
  const middle = fadeStart + width * 0.5;
  // the distance bounds start beyond the switch distances, so they never fight a settled level
  const farFrom = Math.min(fadeEnd - 1, Math.max(toFar + 0.5, fadeEnd - 6));
  const nearTo = Math.max(fadeStart - 6 + 1, Math.min(toNear - 0.5, fadeStart));

  let lastX = Infinity;
  let lastY = Infinity;
  let lastZ = Infinity;
  let camX = Infinity;
  let camY = Infinity;
  let camZ = Infinity;

  /** Refills the near set around (cx, cy, cz); instances that leave it go back to the far level. */
  function refill(cx, cy, cz) {
    lastX = cx;
    lastY = cy;
    lastZ = cz;
    const swap = previous; // (no destructuring swap: it would build a temporary array)
    previous = nearIndex;
    nearIndex = swap;
    previousCount = near.count;
    let n = 0;
    const reachSq = reach * reach;
    const c0 = Math.max(0, Math.floor((cx - reach - minX) / BUCKET));
    const c1 = Math.min(columns - 1, Math.floor((cx + reach - minX) / BUCKET));
    const r0 = Math.max(0, Math.floor((cz - reach - minZ) / BUCKET));
    const r1 = Math.min(rows - 1, Math.floor((cz + reach - minZ) / BUCKET));
    for (let k = 0; k < previousCount; k++) member[previous[k]] = 0;
    for (let r = r0; r <= r1 && n < capacity; r++)
      for (let c = c0; c <= c1 && n < capacity; c++) {
        const b = r * columns + c;
        for (let k = start[b]; k < start[b + 1] && n < capacity; k++) {
          const i = order[k];
          const ex = x[i] - cx;
          const ey = y[i] - cy;
          const ez = z[i] - cz;
          if (ex * ex + ey * ey + ez * ez > reachSq) continue;
          for (let e = 0; e < 16; e++) nearMatrices[n * 16 + e] = matrices[i * 16 + e];
          nearColors[n * 3] = colors[i * 3];
          nearColors[n * 3 + 1] = colors[i * 3 + 1];
          nearColors[n * 3 + 2] = colors[i * 3 + 2];
          nearIndex[n] = i;
          member[i] = 1;
          n++;
        }
      }
    let farDirty = false;
    for (let k = 0; k < previousCount; k++) {
      const i = previous[k];
      if (member[i] || level[i] === 1) continue;
      level[i] = farLevels[i] = 1; // left the set (beyond fadeEnd, so already far)
      target[i] = 1;
      farDirty = true;
    }
    if (farDirty) farFade.needsUpdate = true;
    near.count = n;
    upload(near.instanceMatrix, n * 16);
    upload(near.instanceColor, n * 3);
    near.computeBoundingSphere();
  }

  /**
   * Per frame: refills the near set after REFILL_STEP of camera travel, then moves every near-set
   * instance's level towards its target (`dt` seconds; `snap` jumps there).
   */
  function update(cx, cy, cz, dt = 0, snap = false) {
    const mx = cx - camX;
    const my = cy - camY;
    const mz = cz - camZ;
    const cut = snap || !(mx * mx + my * my + mz * mz < JUMP * JUMP);
    camX = cx;
    camY = cy;
    camZ = cz;
    const dx = cx - lastX;
    const dy = cy - lastY;
    const dz = cz - lastZ;
    if (dx * dx + dy * dy + dz * dz >= REFILL_STEP * REFILL_STEP) refill(cx, cy, cz);
    const step = dt > 0 ? dt / TRANSITION : 0;
    let nearDirty = false;
    let farDirty = false;
    const n = near.count;
    for (let k = 0; k < n; k++) {
      const i = nearIndex[k];
      const ex = x[i] - cx;
      const ey = y[i] - cy;
      const ez = z[i] - cz;
      const d = Math.sqrt(ex * ex + ey * ey + ez * ez);
      let s;
      if (cut) {
        target[i] = d < middle ? 0 : 1;
        s = target[i];
      } else {
        if (d > toFar) target[i] = 1;
        else if (d < toNear) target[i] = 0;
        s = level[i];
        s = target[i] ? Math.min(1, s + step) : Math.max(0, s - step);
        // distance bounds: fully near well inside the band, fully far at its end
        s = Math.min(Math.max(s, smooth(farFrom, fadeEnd, d)), smooth(fadeStart - 6, nearTo, d));
      }
      if (s !== level[i] || nearLevels[k] !== s) {
        level[i] = s;
        nearLevels[k] = s;
        nearDirty = true;
      }
      if (farLevels[i] !== s) {
        farLevels[i] = s;
        farDirty = true;
      }
    }
    if (nearDirty) upload(nearFade, n);
    if (farDirty) farFade.needsUpdate = true;
  }

  return {
    far,
    near,
    update,
    /** Level per instance (0 near … 1 far), for tests. */
    level,
    get nearCount() {
      return near.count;
    },
  };
}

export { createLodSpecies, createVegetationMaterials, REFILL_STEP, TRANSITION };
