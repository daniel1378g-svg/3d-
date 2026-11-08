// The height of the road surface under the hero car along its path, measured once at load.
//
// The car path (car-path.js) lies at y = 0, but the surfaces the car drives on do not: the track
// asphalt, its rubber line, the pit lane and the paddock sit a few millimetres apart (0.02–0.034 in
// the build of Nov 2026) and may move again. Rather than assume one height, rays are cast straight
// down onto the world at the four tyre contact points of a handful of distances along the path (the
// choreography's stops and turning points), and the car stands on the median of the four. Between
// those distances the height is interpolated linearly: the surface changes where the car is
// moving, and a few millimetres are invisible there.
//
// World XZ plane, y up, metres. heightAt() does not allocate.
import { Box3, Raycaster, Vector3 } from 'three';

/** Rays start this far above the path and reach this far down (metres): roofs and gantries are above. */
const RAY_START = 0.6;
const RAY_LENGTH = 1.2;
/** Road surfaces are flat: meshes taller than this (metres) are not looked at. */
const MAX_ROAD_THICKNESS = 0.3;

/**
 * @param {import('three').Object3D} world the world's root (the car is not part of it)
 * @param {{ sample: (distance: number) => { p: Vector3, t: Vector3 } }} sampler car-motion.js path sampler
 * @param {number[]} distances metres along the path to measure at
 * @param {Array<[number, number]>} contacts the tyre contact points in the car frame ([x, z], metres;
 *   buildHeroCar().contacts)
 * @returns {{ heightAt: (distance: number) => number, samples: Float64Array, heights: Float64Array }}
 */
function createRoadHeight(world, sampler, distances, contacts) {
  world.updateMatrixWorld(true);
  // the road is a flat, opaque, plain mesh in the ground band: not sprites, clouds, roofs, buildings or
  // walls, not the instanced vegetation and props, not the transparent contact-shadow decals
  const candidates = [];
  const solid = (material) => !material.transparent && material.depthWrite;
  world.traverse((node) => {
    if (!node.isMesh || node.isInstancedMesh) return;
    if (!(Array.isArray(node.material) ? node.material.every(solid) : solid(node.material))) return;
    const box = new Box3().setFromObject(node);
    const flat = box.max.y - box.min.y < MAX_ROAD_THICKNESS;
    if (flat && box.min.y < RAY_START && box.max.y > RAY_START - RAY_LENGTH) candidates.push({ node, box });
  });
  // highest first: once a hit is above a mesh's top, that mesh (and every later one) cannot be nearer
  candidates.sort((a, b) => b.box.max.y - a.box.max.y);
  const samples = Float64Array.from(new Set(distances)).sort();
  const heights = new Float64Array(samples.length);
  const raycaster = new Raycaster();
  raycaster.far = RAY_LENGTH;
  const down = new Vector3(0, -1, 0);
  const origin = new Vector3();
  const right = new Vector3();
  const hits = [];
  const under = new Float64Array(contacts.length);
  /** Height of the highest surface below `origin` (NaN if none). */
  function surfaceBelow() {
    let best = -Infinity;
    for (const { node, box } of candidates) {
      if (box.max.y < best) break;
      if (origin.x < box.min.x || origin.x > box.max.x || origin.z < box.min.z || origin.z > box.max.z)
        continue;
      hits.length = 0;
      raycaster.intersectObject(node, false, hits);
      if (hits.length) best = Math.max(best, hits[0].point.y);
    }
    return Number.isFinite(best) ? best : NaN;
  }
  for (let i = 0; i < samples.length; i++) {
    const { p, t } = sampler.sample(samples[i]);
    right.set(-t.z, 0, t.x).normalize(); // t rotated a quarter turn towards +z
    contacts.forEach(([x, z], k) => {
      origin.set(p.x, 0, p.z).addScaledVector(t, x).addScaledVector(right, z);
      origin.y = RAY_START;
      raycaster.set(origin, down);
      under[k] = surfaceBelow();
    });
    // the median contact: one tyre on a kerb or a raised strip does not lift the car off the others
    const found = Array.from(under)
      .filter(Number.isFinite)
      .sort((a, b) => a - b);
    const mid = found.length >> 1;
    heights[i] = !found.length ? NaN : found.length % 2 ? found[mid] : (found[mid - 1] + found[mid]) / 2;
  }
  // a distance without any surface under it borrows its neighbours' height
  const known = heights.findIndex(Number.isFinite);
  for (let i = 0; i < heights.length; i++)
    if (!Number.isFinite(heights[i])) heights[i] = known < 0 ? 0 : heights[i ? i - 1 : known];

  function heightAt(distance) {
    const n = samples.length;
    if (distance <= samples[0]) return heights[0];
    if (distance >= samples[n - 1]) return heights[n - 1];
    let lo = 0;
    let hi = n - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (samples[mid] <= distance) lo = mid;
      else hi = mid;
    }
    const f = (distance - samples[lo]) / (samples[hi] - samples[lo]);
    return heights[lo] + (heights[hi] - heights[lo]) * f;
  }
  return { heightAt, samples, heights };
}

export { createRoadHeight };
