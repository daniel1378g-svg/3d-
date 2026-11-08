// Two-level instanced vegetation with a dithered cross-fade (no popping) and few draw calls.
//
// Per species:
//   far   one static InstancedMesh with EVERY instance (coarse model), no shadows; it is what the
//         depth range indexes (its geometry's bounding box is the union of both levels, see
//         tree-models.js), and what the aerial shots see;
//   near  one InstancedMesh holding only the instances within reach of the camera (detailed model,
//         casts shadows on 'high'/'mid'). Its instance buffer is refilled when the camera has moved
//         more than REFILL_STEP metres since the last fill, from a bucket grid, with every instance
//         within fadeEnd + 2 · REFILL_STEP: an instance therefore enters the near set while it is
//         still fully far-faded and leaves it only once it is fully faded out (hysteresis, no pop).
// Both levels draw an instance with a screen-space dither split by its distance d from the camera:
// fade = smoothstep(fadeStart, fadeEnd, d); a fragment of the near level is kept where the
// interleaved-gradient noise n >= fade, a fragment of the far level where n < fade, so the two
// levels together always cover the tree exactly once.
//
// update() allocates nothing (typed arrays and a fixed bucket walk).
import { Color, InstancedMesh, MeshStandardMaterial } from 'three';
import { patchMaterial } from './shading.js';

const WHITE = new Color(1, 1, 1);

/** The camera must move this far (metres) before the near set is refilled. */
const REFILL_STEP = 6;
/** Bucket size (metres) of the instance grid used for the refill. */
const BUCKET = 64;

/**
 * The two shared vegetation materials (near, far): vertex colours × instance colour, roughness 0.92,
 * a world-space leaf-cluster breakup on foliage (aLeaf = 1), faint vertical streaks on bark, and the
 * LOD dither. `range` is a shared uniform { value: Vector2(fadeStart, fadeEnd) }.
 */
function createVegetationMaterials(detail, range) {
  const make = (level) => {
    const material = new MeshStandardMaterial({ vertexColors: true, roughness: 0.92, metalness: 0 });
    return patchMaterial(material, 'vegetation-' + level, detail, {
      uniforms: { envLodRange: range },
      vertex: {
        head: 'attribute float aLeaf;\nvarying float vEnvLeaf;\nvarying float vEnvFade;\nuniform vec2 envLodRange;\n',
        fog_vertex: /* glsl */ `
        #include <fog_vertex>
        {
          vec3 origin = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
          vEnvFade = smoothstep(envLodRange.x, envLodRange.y, distance(origin, cameraPosition));
          vEnvLeaf = aLeaf;
        }`,
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

/**
 * @param {object} species { near, far } geometries (tree-models.js)
 * @param {{near: Material, far: Material}} materials createVegetationMaterials()
 * @param {object} data { count, matrices: Float32Array(16n), colors: Float32Array(3n),
 *   x, y, z: Float32Array(n) } instance transforms (world), tints (linear RGB) and origins
 * @param {object} options { name, fadeEnd (metres), castShadow }
 */
function createLodSpecies(species, materials, data, { name, fadeEnd, castShadow }) {
  const { count, matrices, colors, x, y, z } = data;
  const far = new InstancedMesh(species.far, materials.far, Math.max(1, count));
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

  const near = new InstancedMesh(species.near, materials.near, capacity);
  near.name = name + '-near';
  near.count = 0;
  near.setColorAt(0, WHITE);
  near.castShadow = castShadow;
  near.receiveShadow = true;
  const nearMatrices = near.instanceMatrix.array;
  const nearColors = near.instanceColor.array;

  let lastX = Infinity;
  let lastY = Infinity;
  let lastZ = Infinity;

  /** Refills the near set around (cx, cy, cz) when the camera has moved REFILL_STEP since the last fill. */
  function update(cx, cy, cz) {
    const dx = cx - lastX;
    const dy = cy - lastY;
    const dz = cz - lastZ;
    if (dx * dx + dy * dy + dz * dz < REFILL_STEP * REFILL_STEP) return;
    lastX = cx;
    lastY = cy;
    lastZ = cz;
    let n = 0;
    const reachSq = reach * reach;
    const c0 = Math.max(0, Math.floor((cx - reach - minX) / BUCKET));
    const c1 = Math.min(columns - 1, Math.floor((cx + reach - minX) / BUCKET));
    const r0 = Math.max(0, Math.floor((cz - reach - minZ) / BUCKET));
    const r1 = Math.min(rows - 1, Math.floor((cz + reach - minZ) / BUCKET));
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
          n++;
        }
      }
    near.count = n;
    near.instanceMatrix.clearUpdateRanges();
    near.instanceMatrix.addUpdateRange(0, n * 16);
    near.instanceMatrix.needsUpdate = true;
    near.instanceColor.clearUpdateRanges();
    near.instanceColor.addUpdateRange(0, n * 3);
    near.instanceColor.needsUpdate = true;
    near.computeBoundingSphere();
  }

  return {
    far,
    near,
    update,
    get nearCount() {
      return near.count;
    },
  };
}

export { createLodSpecies, createVegetationMaterials, REFILL_STEP };
