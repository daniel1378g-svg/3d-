// Pure measurements of the track centre line used by the surface and vegetation builders:
// per-point turn angle, "cornerness", corner runs, track half-width and distance-to-track queries.
//
// Track points are Vector2(x, z) in driving order (index order). Lateral offsets follow
// track/strip.js: positive offsets lie along the normal (-dz, dx), i.e. to the right of the
// direction of travel when the XZ plane is seen from above (+Y).
import { LAYOUT } from '../layout.js';
import { clamp } from '../util/math.js';

/**
 * Signed heading change (radians) between the chord arriving at point i from 3 points back and the
 * chord leaving it 3 points ahead. Positive = turning towards the positive-offset (right) side.
 * Stored as float32 on purpose (the offsets derived from it depend on that rounding).
 */
function computeTurnAngles(track) {
  const count = track.length;
  const turn = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const prev = track[(i - 3 + count) % count];
    const here = track[i];
    const next = track[(i + 3) % count];
    const headingIn = Math.atan2(here.y - prev.y, here.x - prev.x);
    const headingOut = Math.atan2(next.y - here.y, next.x - here.x);
    turn[i] = Math.atan2(Math.sin(headingOut - headingIn), Math.cos(headingOut - headingIn));
  }
  return turn;
}

/**
 * How much point i sits in a corner, 0..1: the largest |turn| within ±8 points, ramped from
 * 0.025 rad (0) to 0.075 rad (1). Float32 like the turn angles.
 */
function computeCornerness(turn) {
  const count = turn.length;
  const cornerness = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    let maxTurn = 0;
    for (let k = -8; k <= 8; k++) maxTurn = Math.max(maxTurn, Math.abs(turn[(i + k + count) % count]));
    cornerness[i] = clamp((maxTurn - 0.025) / 0.05, 0, 1);
  }
  return cornerness;
}

/**
 * Corner runs: [start, end) point-index ranges where cornerness > 0.5 for more than 4 points.
 * A run that is still open at the last point is closed at `count` (it does not wrap to index 0).
 */
function findCornerRuns(cornerness) {
  const count = cornerness.length;
  const runs = [];
  let start = -1;
  for (let i = 0; i <= count; i++) {
    const inCorner = i < count && cornerness[i] > 0.5;
    if (inCorner && start < 0) start = i;
    if (!inCorner && start >= 0) {
      if (i - start > 4) runs.push([start, i]);
      start = -1;
    }
  }
  return runs;
}

/**
 * Track half-width (metres) at point i: 7 m on the main straight (within 1.5 m of its Z and
 * between x -540 and 470), 6.5 m everywhere else.
 */
function createHalfWidth(track) {
  const isMainStraight = (i) => {
    const point = track[i];
    return Math.abs(point.y - LAYOUT.straightZ) < 1.5 && point.x < 470 && point.x > -540;
  };
  return (i) => (isMainStraight(i) ? 7 : 6.5);
}

/** Bucket size (metres) of the spatial hash used for distance-to-track queries. */
const HASH_CELL = 60;

/**
 * Returns distanceToTrack(x, z): the distance (metres) to the nearest track centre-line POINT
 * (not segment), searching the 3×3 hash cells around (x, z). Farther than one cell from every
 * point it returns 90 (1.5 cells) instead of the true distance.
 */
function createTrackDistance(track) {
  const cells = new Map();
  for (let i = 0; i < track.length; i++) {
    const key = Math.floor(track[i].x / HASH_CELL) + ',' + Math.floor(track[i].y / HASH_CELL);
    if (!cells.has(key)) cells.set(key, []);
    cells.get(key).push(track[i]);
  }
  return (x, z) => {
    const cellX = Math.floor(x / HASH_CELL);
    const cellZ = Math.floor(z / HASH_CELL);
    let best = 1e12; // squared distance
    for (let dx = -1; dx <= 1; dx++)
      for (let dz = -1; dz <= 1; dz++) {
        const bucket = cells.get(cellX + dx + ',' + (cellZ + dz));
        if (bucket)
          for (const point of bucket) {
            const d2 = (point.x - x) ** 2 + (point.y - z) ** 2;
            if (d2 < best) best = d2;
          }
      }
    return best === 1e12 ? HASH_CELL * 1.5 : Math.sqrt(best);
  };
}

/**
 * True inside the areas kept free of trees and (partly) grass tufts: the paddock (plus margins, up
 * to 60 m beyond the main straight) and the grandstand block behind the main straight.
 */
function isKeepClearZone(x, z) {
  const L = LAYOUT;
  return (
    (x > L.paddock.x0 - 30 && x < L.paddock.x1 + 30 && z > L.paddock.z0 - 20 && z < L.straightZ + 60) ||
    (x > L.grandstandX0 - 40 && x < L.grandstandX1 + 40 && z > L.straightZ && z < L.grandstandZ + 40)
  );
}

/** Everything the builders need to know about the track shape. */
function analyseTrack(track) {
  const turn = computeTurnAngles(track);
  const cornerness = computeCornerness(turn);
  return {
    count: track.length,
    turn,
    cornerness,
    corners: findCornerRuns(cornerness),
    halfWidth: createHalfWidth(track),
    distanceToTrack: createTrackDistance(track),
    isKeepClearZone,
  };
}

export { analyseTrack };
