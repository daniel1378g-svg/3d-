// Track-side barriers beyond the corner furniture (docs/references.md 4.5): double Armco round the
// lap, and teal-painted tyre stacks (#067B7B) at the approach end of every tyre wall, where cars
// arrive first.
//
// Armco: two galvanised W-beam rails (0.31 m each, at 0.45-0.76 m and 0.79-1.10 m) on posts every
// 2 m. It follows the asphalt edge on both sides, ARMCO_OFFSET beyond it, and treats the corner
// furniture as a boundary to go round, not as a reason to stop:
//   - behind a gravel trap it runs GRAVEL_GAP beyond the trap's outer edge (read from the gravel
//     meshes that track-surfaces.js built), and where a tyre wall stands it ends at the wall, whose
//     line it has already reached; the offset is a running maximum over FLARE_LOOKAHEAD metres,
//     smoothed over FLARE_SMOOTHING metres, so the rail flares out gradually before a trap or a wall
//     instead of jumping;
//   - it stops where it would cross the inside-of-bend clamp (model.edge), come within
//     ARMCO_CLEARANCE of another part of the track, within GRAVEL_GAP of other gravel or WALL_GAP of
//     a wall, and in the keep-clear zones (pit straight, paddock, grandstand);
//   - runs shorter than MIN_RUN are dropped; a run that ends in the open (not at a wall) gets a
//     terminal: its last TERMINAL metres bend away from the track and dip towards the ground.
// Built on the shared centre-line model, before the vegetation, so the trees and scrub keep clear
// of it (env/occupancy.js).
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
import { createExactIndex } from '../env/occupancy.js';

/** Armco line: metres beyond the asphalt edge, least distance from other track parts, shortest run. */
const ARMCO_OFFSET = 9;
const ARMCO_CLEARANCE = 9;
const MIN_RUN = 40;
/** Least distance (metres) from the rail to gravel and to a barrier wall. */
const GRAVEL_GAP = 2.5;
const WALL_GAP = 1.2;
/**
 * The gravel traps start this far beyond the asphalt edge, the barrier walls stand this far
 * (track-surfaces.js RUNOFF_OUTER, BARRIER_OFFSET).
 */
const TRAP_START = 5.5;
const WALL_OFFSET = 31.4;
/** Flaring: running-maximum look-ahead and smoothing half-widths of the offset (metres). */
const FLARE_LOOKAHEAD = 22;
const FLARE_SMOOTHING = 16;
/** Terminal at an open run end: length (metres), sideways bend and the rail height kept at the tip. */
const TERMINAL = 6;
const TERMINAL_BEND = 1.4;
const TERMINAL_DIP = 0.45;
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
 * Exact plan-distance query (env/occupancy.js createExactIndex: bucketed, allocation-free) over the
 * plan triangles of every mesh with `material` under `root`: distance(x, z, reach). A mesh's
 * triangles that are degenerate in plan (vertical faces: wall sides and skirts) are left out when it
 * has others (the tops), which cover the same footprint: a query then visits a third as many.
 */
function indexMeshes(root, material) {
  root.updateMatrixWorld(true);
  const meshes = [];
  let corners = 0;
  root.traverse((node) => {
    if (!node.isMesh || node.material !== material) return;
    const { index, attributes } = node.geometry;
    const n = index ? index.count : attributes.position.count;
    meshes.push(node);
    corners += n - (n % 3);
  });
  if (!corners) return { distance: () => Infinity };
  const plan = new Float64Array(2 * corners); // every corner in plan, mesh after mesh
  const flat = new Uint8Array(corners / 3); // 1 for a triangle with a plan area
  let t = 0;
  for (const node of meshes) {
    const position = node.geometry.attributes.position;
    const ids = node.geometry.index ? node.geometry.index.array : null;
    const n = ids ? ids.length : position.count;
    const e = node.matrixWorld.elements;
    const start = t;
    let flats = 0;
    for (let k = 0; k < n - (n % 3); k++) {
      const i = ids ? ids[k] : k;
      const x = position.getX(i);
      const y = position.getY(i);
      const z = position.getZ(i);
      plan[t++] = e[0] * x + e[4] * y + e[8] * z + e[12];
      plan[t++] = e[2] * x + e[6] * y + e[10] * z + e[14];
      if (k % 3 === 2) {
        const o = t - 6;
        const area =
          (plan[o + 2] - plan[o]) * (plan[o + 5] - plan[o + 1]) -
          (plan[o + 4] - plan[o]) * (plan[o + 3] - plan[o + 1]);
        if (Math.abs(area) > 1e-6) {
          flat[o / 6] = 1;
          flats++;
        }
      }
    }
    if (!flats) for (let o = start; o < t; o += 6) flat[o / 6] = 1; // only vertical faces: keep them
  }
  let kept = 0;
  for (let k = 0; k < flat.length; k++) kept += flat[k];
  const tris = new Float64Array(6 * kept);
  let x0 = Infinity;
  let z0 = Infinity;
  let x1 = -Infinity;
  let z1 = -Infinity;
  for (let k = 0, o = 0; k < flat.length; k++) {
    if (!flat[k]) continue;
    for (let c = 0; c < 6; c += 2) {
      const x = (tris[o++] = plan[6 * k + c]);
      const z = (tris[o++] = plan[6 * k + c + 1]);
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (z < z0) z0 = z;
      if (z > z1) z1 = z;
    }
  }
  const query = createExactIndex(tris, x0 - 50, z0 - 50, x1 + 50, z1 + 50);
  return { distance: query, triangles: kept, of: flat.length };
}

/**
 * Running maximum of a closed-loop array over +-radius samples, in O(n) (van Herk / Gil-Werman:
 * block-wise prefix and suffix maxima over the loop unrolled by `radius` at both ends).
 */
function loopMax(values, radius) {
  const n = values.length;
  const block = 2 * radius + 1;
  const length = n + 2 * radius;
  const prefix = new Float64Array(length);
  const suffix = new Float64Array(length);
  const at = (j) => values[(((j - radius) % n) + n) % n];
  for (let j = 0; j < length; j++) prefix[j] = j % block ? Math.max(prefix[j - 1], at(j)) : at(j);
  for (let j = length - 1; j >= 0; j--)
    suffix[j] = j % block === block - 1 || j === length - 1 ? at(j) : Math.max(suffix[j + 1], at(j));
  const out = new Float64Array(n);
  // window [i, i + 2 radius] of the unrolled loop is centred on sample i
  for (let i = 0; i < n; i++) out[i] = Math.max(suffix[i], prefix[i + 2 * radius]);
  return out;
}

/** Box filter of a closed-loop array over +-radius samples. */
function loopBox(values, radius) {
  const n = values.length;
  const out = new Float64Array(n);
  let sum = 0;
  for (let d = -radius; d <= radius; d++) sum += values[(d + n) % n];
  for (let i = 0; i < n; i++) {
    out[i] = sum / (2 * radius + 1);
    sum += values[(i + radius + 1) % n] - values[(i - radius + n) % n];
  }
  return out;
}

/**
 * Armco runs along the model: [{ side, first, last, offset: Float64Array (per sample of the run,
 * metres beyond the asphalt edge), wallAtStart, wallAtEnd }] (sample indices, last may exceed
 * count). `keepClear(x, z)` is track-analysis.js isKeepClearZone; `gravel` and `walls` are plan
 * indices of the gravel traps and the barrier walls.
 */
function armcoRuns(model, keepClear, gravel, walls) {
  const { line, halfWidth } = model;
  const count = line.count;
  const lookahead = Math.round(FLARE_LOOKAHEAD / line.spacing);
  const smoothing = Math.round(FLARE_SMOOTHING / line.spacing);
  // grid (CSR) of the centre line, for the distance to other parts of the track
  const CELL = 25;
  let gx0 = Infinity;
  let gz0 = Infinity;
  let gx1 = -Infinity;
  let gz1 = -Infinity;
  for (let i = 0; i < count; i++) {
    gx0 = Math.min(gx0, line.x[i]);
    gz0 = Math.min(gz0, line.z[i]);
    gx1 = Math.max(gx1, line.x[i]);
    gz1 = Math.max(gz1, line.z[i]);
  }
  const columns = Math.floor((gx1 - gx0) / CELL) + 1;
  const rows = Math.floor((gz1 - gz0) / CELL) + 1;
  const cellOf = (i) => Math.floor((line.z[i] - gz0) / CELL) * columns + Math.floor((line.x[i] - gx0) / CELL);
  const start = new Int32Array(columns * rows + 1);
  for (let i = 0; i < count; i++) start[cellOf(i) + 1]++;
  for (let c = 0; c < columns * rows; c++) start[c + 1] += start[c];
  const points = new Int32Array(count);
  const fill = start.slice(0, columns * rows);
  for (let i = 0; i < count; i++) points[fill[cellOf(i)]++] = i;
  const clearOfOtherParts = (x, z, i) => {
    const cx = Math.floor((x - gx0) / CELL);
    const cz = Math.floor((z - gz0) / CELL);
    for (let r = Math.max(0, cz - 1); r <= Math.min(rows - 1, cz + 1); r++)
      for (let c = Math.max(0, cx - 1); c <= Math.min(columns - 1, cx + 1); c++)
        for (let k = start[r * columns + c]; k < start[r * columns + c + 1]; k++) {
          const j = points[k];
          const along = Math.min(Math.abs(j - i), count - Math.abs(j - i));
          if (along < 60) continue;
          const dx = line.x[j] - x;
          const dz = line.z[j] - z;
          const reach = ARMCO_CLEARANCE + halfWidth[j];
          if (dx * dx + dz * dz < reach * reach) return false;
        }
    return true;
  };
  const at = (i, o) => [line.x[i] + line.nx[i] * o, line.z[i] + line.nz[i] * o];
  const runs = [];
  for (const side of [1, -1]) {
    // wanted offset per sample: the default line, beyond the gravel, or the wall's line
    const wanted = new Float64Array(count).fill(ARMCO_OFFSET);
    const wall = new Uint8Array(count);
    // traps and walls only exist on this side's gravel intervals (track-surfaces.js)
    const furniture = new Uint8Array(count);
    for (const { side: s, first, last } of model.gravel)
      if (s === side) for (let i = first; i <= last; i++) furniture[i % count] = 1;
    const inGravel = (i, o) => {
      const [x, z] = at(i, side * (halfWidth[i] + o));
      return gravel.distance(x, z, 0.05) <= 0;
    };
    for (let i = 0; i < count; i++) {
      if (!furniture[i]) continue;
      const [wx, wz] = at(i, side * (halfWidth[i] + WALL_OFFSET));
      if (walls.distance(wx, wz, 2) < 0.6) {
        wall[i] = 1;
        wanted[i] = WALL_OFFSET;
        continue;
      }
      // the trap is a band along the normal from TRAP_START outwards: bisect for its outer edge
      if (!inGravel(i, TRAP_START + 0.4)) continue;
      let lo = TRAP_START + 0.4;
      let hi = WALL_OFFSET;
      for (let step = 0; step < 7; step++) {
        const mid = (lo + hi) / 2;
        if (inGravel(i, mid)) lo = mid;
        else hi = mid;
      }
      wanted[i] = Math.max(ARMCO_OFFSET, hi + GRAVEL_GAP);
    }
    // running maximum (flare out before), then smoothing (gradual taper)
    const offset = loopBox(loopMax(wanted, lookahead), smoothing);
    const flags = new Uint8Array(count);
    for (let i = 0; i < count; i++) {
      if (wall[i]) continue;
      const o = side * (halfWidth[i] + offset[i]);
      const [x, z] = at(i, o);
      const pitStraight = z > 150 && z < 260 && x > -600 && x < 480;
      flags[i] =
        !pitStraight &&
        !keepClear(x, z) &&
        model.edge(i, o) === o &&
        clearOfOtherParts(x, z, i) &&
        gravel.distance(x, z, GRAVEL_GAP + 1) >= GRAVEL_GAP - 0.3 &&
        walls.distance(x, z, WALL_GAP + 1) >= WALL_GAP
          ? 1
          : 0;
    }
    for (const [first, last] of loopRuns(flags)) {
      if ((last - first + 1) * line.spacing < MIN_RUN) continue;
      // an end meets a wall when the wall flags reach it or a wall stands within a few metres of
      // it (a wall that crosses the rail's line); only open ends get a terminal
      const near = (k) => {
        for (let d = 1; d <= 3; d++) if (wall[(k + d) % count] || wall[(k - d + count) % count]) return true;
        const [x, z] = at(k, side * (halfWidth[k] + offset[k]));
        return walls.distance(x, z, WALL_GAP + TERMINAL_BEND + 3) < WALL_GAP + TERMINAL_BEND + 3;
      };
      const length = last - first + 1;
      const runOffset = new Float64Array(length);
      for (let k = 0; k < length; k++) runOffset[k] = offset[(first + k) % count];
      runs.push({
        side,
        first,
        last,
        offset: runOffset,
        wallAtStart: near(first),
        wallAtEnd: near(last % count),
      });
    }
  }
  return runs;
}

/** Builds the Armco rails (one merged ribbon mesh) and posts (instanced). Returns the runs. */
function buildArmco(ctx, shape) {
  const { model, isKeepClearZone } = shape;
  const { line, halfWidth } = model;
  const count = line.count;
  const runs = armcoRuns(
    model,
    isKeepClearZone,
    indexMeshes(ctx.root, ctx.materials.gravel),
    indexMeshes(ctx.root, ctx.materials.barrier),
  );
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];
  const posts = [];
  const terminal = Math.round(TERMINAL / line.spacing);
  for (const { side, first, last, offset, wallAtStart, wallAtEnd } of runs) {
    const length = last - first + 1;
    // plan points of the rail (with the terminals bent away) and the height scale at each
    const px = new Float64Array(length);
    const pz = new Float64Array(length);
    const lift = new Float64Array(length).fill(1);
    for (let k = 0; k < length; k++) {
      const i = (first + k) % count;
      let o = halfWidth[i] + offset[k];
      const fromStart = wallAtStart ? Infinity : k;
      const fromEnd = wallAtEnd ? Infinity : length - 1 - k;
      const t = 1 - Math.min(fromStart, fromEnd) / terminal; // 0 before the terminal, 1 at the tip
      if (t > 0) {
        o += TERMINAL_BEND * t * t;
        lift[k] = 1 - (1 - TERMINAL_DIP) * t * t;
      }
      px[k] = line.x[i] + line.nx[i] * side * o;
      pz[k] = line.z[i] + line.nz[i] * side * o;
    }
    for (const [y0, y1] of RAILS) {
      const base = positions.length / 3;
      let u = 0;
      for (let k = 0; k < length; k++) {
        const a = Math.max(0, k - 1);
        const b = Math.min(length - 1, k + 1);
        const tx = px[b] - px[a];
        const tz = pz[b] - pz[a];
        const tl = Math.hypot(tx, tz) || 1;
        // the rail faces the track: the normal of its direction pointing to the track's side
        const nx = (side * tz) / tl;
        const nz = (-side * tx) / tl;
        if (k > 0) u += Math.hypot(px[k] - px[k - 1], pz[k] - pz[k - 1]);
        positions.push(px[k], y0 * lift[k], pz[k], px[k], y1 * lift[k], pz[k]);
        normals.push(nx, 0, nz, nx, 0, nz);
        uvs.push(u, 0, u, 1);
        if (y0 === RAILS[0][0] && k % 2 === 0) posts.push([px[k] - nx * 0.12, pz[k] - nz * 0.12, lift[k]]);
      }
      for (let k = 0; k < length - 1; k++) {
        const v = base + 2 * k;
        indices.push(v, v + 2, v + 1, v + 1, v + 2, v + 3);
      }
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
  postMesh.name = 'armco-posts';
  const matrix = new Matrix4();
  posts.forEach(([x, z, h], k) =>
    postMesh.setMatrixAt(k, matrix.makeScale(1, 1.15 * h, 1).setPosition(x, 0.55 * h, z)),
  );
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
