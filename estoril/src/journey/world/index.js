// Builds the circuit world: terrain, hills, track surfaces, pits, grandstand, paddock, barriers,
// vegetation and clouds. Each part lives in its own module; this file only fixes the build order.
//
// The order below is load-bearing and must not be changed casually:
//  - three.js sorts draws by material.id and object id, which follow creation order;
//  - the vegetation is placed around everything built before it (env/occupancy.js), so it comes
//    after the track, pits, grandstand and paddock; it has its own random streams and leaves the
//    shared ctx.rng where the old vegetation left it, for the clouds;
//  - world.update(time, dt, camera, snap) runs the per-frame updaters in registration order (pit flags,
//    vegetation LOD and grass sway, grandstand flags, clouds).
//
// Coordinates: metres, world XZ ground plane, +Y up. See layout.js for the fixed positions.
import { bindGravelMask, bindTrackModel } from '../env/shading.js';
import { buildArmco, buildTyreStacks } from './barriers.js';
import { buildClouds } from './clouds.js';
import { createWorldContext } from './context.js';
import { buildFlag } from './flags.js';
import { buildGrandstand } from './grandstand.js';
import { buildOuterWallAndFence, buildStartGantry } from './main-straight.js';
import { buildPaddock } from './paddock.js';
import { buildPitBuilding, buildPitLaneSurface } from './pits.js';
import { buildGround, buildHills } from './terrain.js';
import { analyseTrack } from './track-analysis.js';
import { buildTrackSurfaces } from './track-surfaces.js';
import { buildVegetation } from './vegetation.js';

/**
 * @param {Array<[number, number]>} trackPoints  closed track centre line as [x, z] pairs (metres)
 * @param {{quality?: 'high'|'mid'|'low', renderer?: unknown}} [options]  `renderer` is accepted
 *   for API compatibility and not used.
 * @returns {{root: import('three').Group, materials: Object, layout: Object, vegetation: Object,
 *            track: import('three').Vector2[],
 *            update: (time: number, dt: number, camera?, snap?: boolean) => void}}
 *   root.userData also carries `openBox` ({x, z} of the open garage front, floorY its floor) and `tower`
 *   (Vector3 look-at point on the control tower).
 */
function buildWorld(trackPoints, { quality = 'high' } = {}) {
  const ctx = createWorldContext(trackPoints, quality);
  const L = ctx.layout;
  const shape = analyseTrack(ctx.track);
  bindTrackModel(ctx.materials, ctx.textures.lap, shape.model);

  buildGround(ctx);
  buildHills(ctx);
  buildTrackSurfaces(ctx, shape);
  bindGravelMask(ctx.materials, ctx.root); // where the run-off shader spills gravel
  buildPitLaneSurface(ctx);
  buildPitBuilding(ctx);
  buildOuterWallAndFence(ctx);
  buildGrandstand(ctx);
  buildStartGantry(ctx);
  buildPaddock(ctx);
  buildArmco(ctx, shape);
  buildTyreStacks(ctx);
  const vegetation = buildVegetation(ctx, shape);
  // Flags on top of the grandstand back wall (17 m): red at the -X end, white at the +X end.
  buildFlag(ctx, L.grandstandX0 + 8, 17, L.grandstandZ + 16, 0xe93325, ctx.root);
  buildFlag(ctx, L.grandstandX1 - 8, 17, L.grandstandZ + 16, 0xf5f3ee, ctx.root);
  buildClouds(ctx);

  const { updaters } = ctx;
  return {
    root: ctx.root,
    materials: ctx.materials,
    layout: L,
    track: ctx.track,
    vegetation,
    /**
     * Per-frame updaters; `camera` (already placed for this frame) drives the vegetation LOD, `snap`
     * (renderAt) settles its level transitions at once so captures are deterministic.
     */
    update(time, dt, camera, snap = false) {
      for (let k = 0; k < updaters.length; k++) updaters[k](time, dt, camera, snap);
    },
  };
}

export { buildWorld };
