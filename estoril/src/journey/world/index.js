// Builds the circuit world: terrain, hills, track surfaces, pits, grandstand, paddock, vegetation
// and clouds. Each part lives in its own module; this file only fixes the build order.
//
// The order below is load-bearing and must not be changed casually:
//  - three.js sorts draws by material.id and object id, which follow creation order;
//  - the seeded rng (ctx.rng) is consumed by trees → grass tufts → clouds in that order;
//  - world.update() runs the per-frame updaters in registration order (pit flags, grass,
//    grandstand flags, clouds).
//
// Coordinates: metres, world XZ ground plane, +Y up. See layout.js for the fixed positions.
import { bindTrackModel } from '../env/shading.js';
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
import { buildGrassTufts, buildTrees } from './vegetation.js';

/**
 * @param {Array<[number, number]>} trackPoints  closed track centre line as [x, z] pairs (metres)
 * @param {{quality?: 'high'|'mid'|'low', renderer?: unknown}} [options]  `renderer` is accepted
 *   for API compatibility and not used.
 * @returns {{root: import('three').Group, materials: Object, layout: Object,
 *            track: import('three').Vector2[], update: (time: number, dt: number) => void}}
 *   root.userData also carries `openBox` ({x, z} of the open garage front) and `tower`
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
  buildPitLaneSurface(ctx);
  buildPitBuilding(ctx);
  buildOuterWallAndFence(ctx);
  buildGrandstand(ctx);
  buildStartGantry(ctx);
  buildPaddock(ctx);
  buildTrees(ctx, shape);
  buildGrassTufts(ctx, shape);
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
    update(time, dt) {
      for (const update of updaters) update(time, dt);
    },
  };
}

export { buildWorld };
