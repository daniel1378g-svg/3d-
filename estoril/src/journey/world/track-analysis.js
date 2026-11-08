// Measurements of the track centre line, and the one centre-line/offset model every track surface
// (asphalt, rubber line, edge lines, kerbs, run-off, gravel, barrier walls) and the aerial
// highlight are built on, so they stay aligned.
//
// Track points are Vector2(x, z) in driving order. Lateral offsets: positive = right of the
// direction of travel, along the normal (-dz, dx) (see track/strip.js).
//
// The model (createTrackModel)
//   1. Resampling. track.json has one point every 4.2 m; at its tightest bend (the chicane at
//      (228, -156), source point 584) a segment turns 31° and the radius is 7.6 m, smaller than the
//      inner kerb (8.1 m) and run-off (12 m) offsets, so offset edges folded over. The points are
//      interpolated with a centripetal Catmull-Rom spline (it passes through every source point)
//      and resampled every FINE_SPACING metres.
//   2. Minimum radius. Where a vertex turns more than spacing / MIN_RADIUS, the excess turn is
//      spread over the neighbouring vertices of the same bend (nearest first), the stretch is
//      re-integrated from its headings and its end drift is blended back over 60 m margins on
//      each side, so the line changes only around such bends and keeps their total turn. Only the
//      chicane is affected: it moves by at most ~3 m (track.json matches the OpenStreetMap centre
//      line within 13 m, docs/references.md).
//   3. The result is resampled every CENTRE_SPACING metres; normals, arc length and signed
//      curvature (+ = turning right) are computed once.
//   4. Robust offsets: on the inside of a bend an offset is clamped to INNER_FRACTION of the local
//      radius, and the clamp may change by at most LIMIT_SLOPE metres per metre of track, so no
//      offset edge can run backwards (fold). edge(i, offset) applies it; strips that share an edge
//      offset share its vertices exactly.
//   5. Half-width: 7 m on the main straight, 6.5 m elsewhere, blended over WIDTH_TRANSITION metres.
//   6. Corners: runs of high "cornerness" (as before, now measured in metres), split where the turn
//      changes direction; gravel goes on the outside of each sub-corner, never inside a bend.
//
// analyseTrack() also keeps the measurements the vegetation uses on the ORIGINAL points
// (distanceToTrack, count), so tree and grass placement (and the shared random stream) is unchanged.
import { LAYOUT } from '../layout.js';
import { clamp, smoothstep } from '../util/math.js';

/** Spacing (metres) of the centre line all track surfaces are built on. */
const CENTRE_SPACING = 1;
/** Spacing (metres) used while smoothing the centre line. */
const FINE_SPACING = 0.5;
/** Tightest bend radius (metres) of the centre line. */
const MIN_RADIUS = 15;
/** Inner-side offsets are clamped to this fraction of the local radius. */
const INNER_FRACTION = 0.8;
/** How fast a clamped offset may change, metres of offset per metre of track. */
const LIMIT_SLOPE = 0.5;
/** Track half-width on the main straight and elsewhere, and the blend between them (metres). */
const HALF_WIDTH_STRAIGHT = 7;
const HALF_WIDTH = 6.5;
const WIDTH_TRANSITION = 40;
/** Corner detection, in metres along the centre line (the old 1000-point values × 4.18 m). */
const TURN_CHORD = 12.5; // turn angle between the chords arriving at and leaving a point
const CORNER_WINDOW = 33.5; // cornerness: largest |turn| within ± this distance
const MIN_CORNER_LENGTH = 17; // shorter runs are ignored
const MIN_SUB_CORNER = 25; // direction changes shorter than this do not split a corner
const DIRECTION_TURN = 0.02; // radians: smaller turns do not decide a sub-corner's direction
/** Gravel traps start this far before a corner and end this far after it (metres). */
const GRAVEL_BEFORE = 25;
const GRAVEL_AFTER = 42;
/** Same-side gravel intervals separated by at most this much (metres, not inside a bend) are joined. */
const GRAVEL_BRIDGE = 35;

const wrapAngle = (a) => Math.atan2(Math.sin(a), Math.cos(a));

/** Closed centripetal Catmull-Rom through (xs, zs), `subdivisions` samples per span. */
function catmullRom(xs, zs, subdivisions) {
  const n = xs.length;
  const outX = new Float64Array(n * subdivisions);
  const outZ = new Float64Array(n * subdivisions);
  const knot = (i, j) => Math.max(1e-6, Math.sqrt(Math.hypot(xs[j] - xs[i], zs[j] - zs[i])));
  for (let i = 0; i < n; i++) {
    const i0 = (i - 1 + n) % n;
    const i2 = (i + 1) % n;
    const i3 = (i + 2) % n;
    const t1 = knot(i0, i);
    const t2 = t1 + knot(i, i2);
    const t3 = t2 + knot(i2, i3);
    for (let k = 0; k < subdivisions; k++) {
      const t = t1 + ((t2 - t1) * k) / subdivisions;
      // Barry-Goldman pyramid
      const lerp = (a, b, ta, tb) => ((tb - t) * a + (t - ta) * b) / (tb - ta);
      for (const [src, dst] of [
        [xs, outX],
        [zs, outZ],
      ]) {
        const a1 = lerp(src[i0], src[i], 0, t1);
        const a2 = lerp(src[i], src[i2], t1, t2);
        const a3 = lerp(src[i2], src[i3], t2, t3);
        const b1 = lerp(a1, a2, 0, t2);
        const b2 = lerp(a2, a3, t1, t3);
        dst[i * subdivisions + k] = lerp(b1, b2, t1, t2);
      }
    }
  }
  return { x: outX, z: outZ };
}

/** Resamples a closed polyline to equal steps of about `spacing` metres. */
function resampleClosed(xs, zs, spacing) {
  const n = xs.length;
  const cumulative = new Float64Array(n + 1);
  for (let i = 0; i < n; i++)
    cumulative[i + 1] = cumulative[i] + Math.hypot(xs[(i + 1) % n] - xs[i], zs[(i + 1) % n] - zs[i]);
  const length = cumulative[n];
  const count = Math.round(length / spacing);
  const x = new Float64Array(count);
  const z = new Float64Array(count);
  for (let k = 0, j = 0; k < count; k++) {
    const s = (k * length) / count;
    while (cumulative[j + 1] < s) j++;
    const f = (s - cumulative[j]) / (cumulative[j + 1] - cumulative[j] || 1);
    x[k] = xs[j] + (xs[(j + 1) % n] - xs[j]) * f;
    z[k] = zs[j] + (zs[(j + 1) % n] - zs[j]) * f;
  }
  return { x, z, spacing: length / count, length };
}

/**
 * Spreads every vertex turn above spacing / minRadius over the neighbouring vertices and
 * re-integrates the affected stretches (see the header). Returns the new line.
 */
function limitCurvature(line, minRadius) {
  let { x, z } = line;
  for (let pass = 0; pass < 10; pass++) {
    const n = x.length;
    const h = line.spacing;
    const heading = new Float64Array(n);
    for (let i = 0; i < n; i++) heading[i] = Math.atan2(z[(i + 1) % n] - z[i], x[(i + 1) % n] - x[i]);
    const turn = new Float64Array(n);
    for (let i = 0; i < n; i++) turn[i] = wrapAngle(heading[i] - heading[(i - 1 + n) % n]);
    const limit = h / minRadius;
    let worst = 0;
    for (let i = 0; i < n; i++) worst = Math.max(worst, Math.abs(turn[i]));
    if (worst <= limit * 1.001) break;
    // 1. redistribute the excess, nearest neighbours first, alternating sides
    const target = limit * 0.98;
    const spread = Float64Array.from(turn);
    for (let i = 0; i < n; i++) {
      if (Math.abs(spread[i]) <= target) continue;
      const sign = Math.sign(spread[i]);
      let excess = Math.abs(spread[i]) - target;
      spread[i] = sign * target;
      for (let d = 1; excess > 1e-12 && d < n / 2; d++)
        for (const j of [(i + d) % n, (i - d + n) % n]) {
          const capacity = target - sign * spread[j];
          if (capacity <= 0) continue;
          const take = Math.min(capacity, excess / 2 + 1e-15, excess);
          spread[j] += sign * take;
          excess -= take;
        }
    }
    // 2. windows around the changed vertices (gaps shorter than two margins are joined), unrolled
    //    from a vertex that did not change
    const margin = Math.round(60 / h);
    let start = 0;
    while (start < n && Math.abs(spread[start] - turn[start]) > 1e-12) start++;
    const windows = [];
    for (let k = start; k < start + n; k++) {
      if (Math.abs(spread[k % n] - turn[k % n]) <= 1e-12) continue;
      const last = windows[windows.length - 1];
      if (last && k - margin <= last[1] + margin) last[1] = k + margin;
      else windows.push([k - margin, k + margin]);
    }
    const nx = Float64Array.from(x);
    const nz = Float64Array.from(z);
    for (const [a, b] of windows) {
      const at = (k) => ((k % n) + n) % n;
      let theta = heading[at(a - 1)];
      let px = x[at(a)];
      let pz = z[at(a)];
      const length = b - a;
      const rx = new Float64Array(length + 1);
      const rz = new Float64Array(length + 1);
      for (let k = 0; k <= length; k++) {
        rx[k] = px;
        rz[k] = pz;
        theta += spread[at(a + k)];
        px += Math.cos(theta) * h;
        pz += Math.sin(theta) * h;
      }
      const driftX = x[at(b)] - rx[length];
      const driftZ = z[at(b)] - rz[length];
      for (let k = 0; k <= length; k++) {
        const w = smoothstep(k / length);
        nx[at(a + k)] = rx[k] + driftX * w;
        nz[at(a + k)] = rz[k] + driftZ * w;
      }
    }
    line = resampleClosed(nx, nz, FINE_SPACING);
    x = line.x;
    z = line.z;
  }
  return line;
}

/**
 * The resampled, curvature-limited centre line: arrays x, z (world), tx, tz (unit tangent),
 * nx, nz (unit right normal), s (arc length), curvature (signed, 1/m, + = turning right), plus
 * count, spacing and length. Closed loop: sample i + 1 of the last sample is sample 0.
 */
function buildCentreLine(points) {
  const xs = Float64Array.from(points, (p) => p.x);
  const zs = Float64Array.from(points, (p) => p.y);
  const dense = catmullRom(xs, zs, 32);
  const fine = resampleClosed(dense.x, dense.z, FINE_SPACING);
  const limited = limitCurvature(fine, MIN_RADIUS);
  const { x, z, spacing, length } = resampleClosed(limited.x, limited.z, CENTRE_SPACING);
  const count = x.length;
  const tx = new Float64Array(count);
  const tz = new Float64Array(count);
  const nx = new Float64Array(count);
  const nz = new Float64Array(count);
  const s = new Float64Array(count);
  const curvature = new Float64Array(count);
  for (let i = 0; i < count; i++) {
    const next = (i + 1) % count;
    const prev = (i - 1 + count) % count;
    const dx = x[next] - x[prev];
    const dz = z[next] - z[prev];
    const len = Math.hypot(dx, dz) || 1;
    tx[i] = dx / len;
    tz[i] = dz / len;
    nx[i] = -tz[i];
    nz[i] = tx[i];
    s[i] = i * spacing;
    const headingIn = Math.atan2(z[i] - z[prev], x[i] - x[prev]);
    const headingOut = Math.atan2(z[next] - z[i], x[next] - x[i]);
    curvature[i] = wrapAngle(headingOut - headingIn) / spacing;
  }
  return { x, z, tx, tz, nx, nz, s, curvature, count, spacing, length };
}

/**
 * Per-side inner limits: limit[side][i] is the largest offset magnitude allowed on that side at
 * sample i, INNER_FRACTION / |curvature| on the inside of a bend (side = sign of the curvature),
 * smoothed so it changes by at most LIMIT_SLOPE per metre (a distance transform, run twice around
 * the loop).
 */
function innerLimits(line) {
  const { count, curvature, spacing } = line;
  const limits = {};
  for (const side of [1, -1]) {
    const limit = new Float64Array(count);
    for (let i = 0; i < count; i++) {
      // the largest curvature at this sample or its neighbours (each vertex rotates two segments)
      const k = Math.max(
        side * curvature[i],
        side * curvature[(i + 1) % count],
        side * curvature[(i - 1 + count) % count],
      );
      limit[i] = k > 0 ? INNER_FRACTION / k : Infinity;
    }
    const step = LIMIT_SLOPE * spacing;
    for (let pass = 0; pass < 2; pass++) {
      for (let i = 1; i <= count; i++)
        limit[i % count] = Math.min(limit[i % count], limit[(i - 1) % count] + step);
      for (let i = count - 1; i >= -1; i--)
        limit[(i + count) % count] = Math.min(limit[(i + count) % count], limit[(i + 1) % count] + step);
    }
    limits[side] = limit;
  }
  return limits;
}

/** Signed heading change (radians) between the chords from s - TURN_CHORD to s and on to s + TURN_CHORD. */
function computeTurn(line) {
  const { count, x, z, spacing } = line;
  const k = Math.round(TURN_CHORD / spacing);
  const turn = new Float64Array(count);
  for (let i = 0; i < count; i++) {
    const a = (i - k + count) % count;
    const b = (i + k) % count;
    const headingIn = Math.atan2(z[i] - z[a], x[i] - x[a]);
    const headingOut = Math.atan2(z[b] - z[i], x[b] - x[i]);
    turn[i] = wrapAngle(headingOut - headingIn);
  }
  return turn;
}

/** 0..1: the largest |turn| within ±CORNER_WINDOW, ramped from 0.025 rad (0) to 0.075 rad (1). */
function computeCornerness(turn, spacing) {
  const count = turn.length;
  const k = Math.round(CORNER_WINDOW / spacing);
  const cornerness = new Float64Array(count);
  for (let i = 0; i < count; i++) {
    let maxTurn = 0;
    for (let d = -k; d <= k; d++) maxTurn = Math.max(maxTurn, Math.abs(turn[(i + d + count) % count]));
    cornerness[i] = clamp((maxTurn - 0.025) / 0.05, 0, 1);
  }
  return cornerness;
}

/**
 * Corner runs [first, last] (sample indices, last may exceed count: the run wraps) where
 * cornerness > 0.5, longer than MIN_CORNER_LENGTH; each split into sub-corners where the
 * (smoothed) turn changes sign for more than MIN_SUB_CORNER metres. Sub-corner: { first, last,
 * direction } with direction +1 = turning right.
 */
function findCorners(cornerness, turn, spacing) {
  const count = cornerness.length;
  const inCorner = (i) => cornerness[((i % count) + count) % count] > 0.5;
  let start = 0;
  while (start < count && inCorner(start)) start++;
  const corners = [];
  for (let i = start; i < start + count; i++) {
    if (!inCorner(i)) continue;
    let j = i;
    while (j + 1 < start + count && inCorner(j + 1)) j++;
    if ((j - i + 1) * spacing > MIN_CORNER_LENGTH) corners.push({ first: i, last: j, subCorners: [] });
    i = j;
  }
  const minSub = Math.round(MIN_SUB_CORNER / spacing);
  for (const corner of corners) {
    // direction per sample where the turn is clear (|turn| > DIRECTION_TURN), the nearest clear
    // direction elsewhere; then short opposite stretches are absorbed into their neighbours
    const dirs = [];
    for (let i = corner.first; i <= corner.last; i++)
      dirs.push(Math.abs(turn[i % count]) > DIRECTION_TURN ? Math.sign(turn[i % count]) : 0);
    for (let pass = 0; pass < 2; pass++)
      for (let k = 0; k < dirs.length; k++) {
        const j = pass ? dirs.length - 1 - k : k;
        const from = pass ? j + 1 : j - 1;
        if (!dirs[j] && from >= 0 && from < dirs.length && dirs[from]) dirs[j] = dirs[from];
      }
    for (let k = 0; k < dirs.length; k++) dirs[k] ||= 1;
    const runs = [];
    for (let k = 0; k < dirs.length; k++) {
      if (runs.length && runs[runs.length - 1].direction === dirs[k]) runs[runs.length - 1].length++;
      else runs.push({ direction: dirs[k], length: 1 });
    }
    let merged = true;
    while (merged && runs.length > 1) {
      merged = false;
      let shortest = -1;
      for (let r = 0; r < runs.length; r++)
        if (runs[r].length < minSub && (shortest < 0 || runs[r].length < runs[shortest].length)) shortest = r;
      if (shortest < 0) break;
      const neighbour =
        shortest === 0
          ? 1
          : shortest === runs.length - 1
            ? shortest - 1
            : runs[shortest - 1].length >= runs[shortest + 1].length
              ? shortest - 1
              : shortest + 1;
      runs[neighbour].length += runs[shortest].length;
      runs.splice(shortest, 1);
      // re-join neighbours that now have the same direction
      for (let r = runs.length - 1; r > 0; r--)
        if (runs[r].direction === runs[r - 1].direction) {
          runs[r - 1].length += runs[r].length;
          runs.splice(r, 1);
        }
      merged = true;
    }
    let first = corner.first;
    for (const run of runs) {
      corner.subCorners.push({ first, last: first + run.length - 1, direction: run.direction });
      first += run.length;
    }
  }
  return corners;
}

/**
 * Gravel intervals, per side: the outside of every sub-corner, extended GRAVEL_BEFORE before the
 * corner and GRAVEL_AFTER after it, never into a sub-corner that turns towards that side; same-side
 * intervals that touch or overlap are merged, so gravel never lies on gravel, and gaps of up to
 * GRAVEL_BRIDGE between them are filled (no notch between two traps), unless the gap holds the
 * inside of a bend on that side.
 * Returns [{ side, first, last }] (sample indices; last may exceed count).
 */
function gravelIntervals(corners, count, spacing) {
  const before = Math.round(GRAVEL_BEFORE / spacing);
  const after = Math.round(GRAVEL_AFTER / spacing);
  const bridge = Math.round(GRAVEL_BRIDGE / spacing);
  // per-sample "inside of a bend" flags: no gravel on the inside of any sub-corner
  const inside = { 1: new Uint8Array(count), [-1]: new Uint8Array(count) };
  for (const corner of corners)
    for (const sub of corner.subCorners)
      for (let i = sub.first; i <= sub.last; i++) inside[sub.direction][i % count] = 1;
  const wanted = { 1: new Uint8Array(count), [-1]: new Uint8Array(count) };
  for (const corner of corners)
    corner.subCorners.forEach((sub, k) => {
      const side = -sub.direction;
      const first = sub.first - (k === 0 ? before : 0);
      const last = sub.last + (k === corner.subCorners.length - 1 ? after : 0);
      // grow from the sub-corner outwards and stop at the inside of another bend
      for (let i = sub.first; i <= sub.last; i++) wanted[side][i % count] = 1;
      for (let i = sub.first - 1; i >= first && !inside[side][((i % count) + count) % count]; i--)
        wanted[side][((i % count) + count) % count] = 1;
      for (let i = sub.last + 1; i <= last && !inside[side][i % count]; i++) wanted[side][i % count] = 1;
    });
  for (const side of [1, -1]) {
    // fill short gaps between wanted samples that hold no inside-of-bend sample
    const flags = wanted[side];
    let start = 0;
    while (start < count && !flags[start]) start++;
    if (start === count) continue;
    for (let i = start; i < start + count; i++) {
      if (flags[i % count]) continue;
      let j = i;
      while (j + 1 < start + count && !flags[(j + 1) % count]) j++;
      let clear = j - i + 1 <= bridge;
      for (let k = i; clear && k <= j; k++) if (inside[side][k % count]) clear = false;
      if (clear) for (let k = i; k <= j; k++) flags[k % count] = 1;
      i = j;
    }
  }
  const intervals = [];
  for (const side of [1, -1]) {
    const flags = wanted[side];
    let start = 0;
    while (start < count && flags[start]) start++;
    if (start === count) {
      intervals.push({ side, first: 0, last: count });
      continue;
    }
    for (let i = start; i < start + count; i++) {
      if (!flags[i % count]) continue;
      let j = i;
      while (j + 1 < start + count && flags[(j + 1) % count]) j++;
      intervals.push({ side, first: i, last: j });
      i = j;
    }
  }
  return intervals;
}

/**
 * Half-width per sample: HALF_WIDTH_STRAIGHT on the main straight (within 1.5 m of its z, between
 * x -540 and 470, as before), HALF_WIDTH elsewhere, blended with a smoothstep over
 * WIDTH_TRANSITION metres centred on each change.
 */
function computeHalfWidth(line) {
  const { count, x, z, spacing } = line;
  const onStraight = new Float64Array(count);
  for (let i = 0; i < count; i++)
    onStraight[i] = Math.abs(z[i] - LAYOUT.straightZ) < 1.5 && x[i] < 470 && x[i] > -540 ? 1 : 0;
  // box filter over the transition length, then smoothstep: a C1 blend centred on each change
  const k = Math.round(WIDTH_TRANSITION / spacing / 2);
  const halfWidth = new Float64Array(count);
  for (let i = 0; i < count; i++) {
    let sum = 0;
    for (let d = -k; d <= k; d++) sum += onStraight[(i + d + count) % count];
    halfWidth[i] = HALF_WIDTH + (HALF_WIDTH_STRAIGHT - HALF_WIDTH) * smoothstep(sum / (2 * k + 1));
  }
  return halfWidth;
}

/**
 * The shared centre-line/offset model.
 *   line            the resampled centre line (buildCentreLine)
 *   halfWidth[i]    asphalt half-width, metres
 *   turn[i], cornerness[i], corners (with subCorners), gravel (intervals)
 *   edge(i, offset) the offset actually used at sample i: clamped on the inside of bends
 */
function createTrackModel(points) {
  const line = buildCentreLine(points);
  const limits = innerLimits(line);
  const turn = computeTurn(line);
  const cornerness = computeCornerness(turn, line.spacing);
  const corners = findCorners(cornerness, turn, line.spacing);
  return {
    line,
    count: line.count,
    halfWidth: computeHalfWidth(line),
    turn,
    cornerness,
    corners,
    gravel: gravelIntervals(corners, line.count, line.spacing),
    edge(i, offset) {
      const limit = limits[offset > 0 ? 1 : -1][i];
      return offset > limit ? limit : offset < -limit ? -limit : offset;
    },
  };
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

/**
 * Everything the builders need to know about the track shape: `model` for the track surfaces;
 * `count` (source points), `distanceToTrack` and `isKeepClearZone` for the vegetation, measured on
 * the original track.json points exactly as before.
 */
function analyseTrack(track) {
  return {
    model: createTrackModel(track),
    count: track.length,
    distanceToTrack: createTrackDistance(track),
    isKeepClearZone,
  };
}

export { CENTRE_SPACING, MIN_RADIUS, analyseTrack, createTrackModel };
