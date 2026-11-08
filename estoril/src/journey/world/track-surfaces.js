// Track surface layers built as ribbons along the shared centre-line model (track-analysis.js
// createTrackModel, track/strip.js), plus the corner furniture: kerbs, painted run-off, gravel
// traps and the barrier walls behind them. Every layer takes its edges from the same model, so
// shared edges (asphalt/kerb, kerb/run-off, run-off/gravel) use identical vertices.
//
// Heights and polygon offsets follow the layer table in layers.js (gravel < run-off < asphalt <
// kerbs, rubber, lines). The kerbs are flush with the asphalt at the track edge and rise outwards,
// with a riser down to the run-off, so no gap opens between layers of different heights. The
// rubber line and the white lines are pulled towards the camera with polygonOffset.
//
// Offsets are signed lateral distances from the centre line: positive = right of the direction of
// travel (normal (-dz, dx)), negative = left. The model's half-width blends from 7 m on the main
// straight to 6.5 m elsewhere over 40 m.
import { CanvasTexture, Mesh } from 'three';
import { WALL_THICKNESS, buildBarrierWall, buildStrip } from '../track/strip.js';
import { clamp, smoothstep } from '../util/math.js';
import { LAYERS } from './layers.js';
import { createPlanIndex } from './plan-index.js';

/** Kerb and run-off widths, gravel start, widest gravel and barrier offset beyond the asphalt edge. */
const KERB_WIDTH = 1.6;
const RUNOFF_OUTER = 5.5;
const GRAVEL_WIDTH = 24;
const BARRIER_OFFSET = 31.4;
const BARRIER_HEIGHT = 0.95;
/**
 * Barrier walls: least distance (metres) from any asphalt edge (another leg's run-off plus 3 m of
 * verge), and from gravel or another wall.
 */
const WALL_TRACK_CLEARANCE = RUNOFF_OUTER + 3;
const WALL_GAP = 1.5;
/** Shortest barrier wall, metres. */
const MIN_WALL_LENGTH = 15;
/** Gravel width follows the cornerness smoothed by two box filters this long (metres). */
const GRAVEL_SMOOTHING = 25;
/** Gravel traps narrow towards their ends over this length (metres) to this width (metres). */
const GRAVEL_TAPER = 20;
const GRAVEL_END_WIDTH = 4;
/** A trap ends (square cut) where the inside-of-bend clamp leaves it less than this (metres). */
const GRAVEL_MIN_WIDTH = 3;

/** Asphalt from -halfWidth to +halfWidth; UVs in metres / 12, across 0..14/12. */
function buildAsphalt(ctx, model) {
  const halfWidth = (i) => model.halfWidth[i];
  const geometry = buildStrip(model, halfWidth, (i) => -halfWidth(i), {
    y: LAYERS.asphalt,
    vScale: 1 / 12,
    uvAcross: [0, 14 / 12],
  });
  const asphalt = new Mesh(geometry, ctx.materials.asphalt);
  asphalt.receiveShadow = true;
  asphalt.name = 'track';
  ctx.root.add(asphalt);
}

/** 64 × 4 canvas: transparent at both edges, opaque black across the middle 30 %. */
function rubberGradientTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 4;
  const g = canvas.getContext('2d');
  const gradient = g.createLinearGradient(0, 0, 64, 0);
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(0.35, 'rgba(0,0,0,1)');
  gradient.addColorStop(0.65, 'rgba(0,0,0,1)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gradient;
  g.fillRect(0, 0, 64, 4);
  return new CanvasTexture(canvas);
}

/**
 * Darker rubbered-in racing line: a 6 m band (from +2.6 to -3.4 around the centre) that drifts up
 * to 2.2 m towards the inside of each corner (12 m per radian of turn). Drawn as a decal over the
 * asphalt (renderOrder 1). Also finalises the shared `rubber` material (map, opacity 0.2).
 */
function buildRubberLine(ctx, model) {
  const { materials } = ctx;
  materials.rubber.map = rubberGradientTexture();
  materials.rubber.opacity = 0.2;
  const drift = (i) => clamp(model.turn[i] * 12, -2.2, 2.2);
  const geometry = buildStrip(
    model,
    (i) => 2.6 + drift(i),
    (i) => -3.4 + drift(i),
    { y: LAYERS.rubber },
  );
  const rubber = new Mesh(geometry, materials.rubber);
  rubber.renderOrder = 1;
  ctx.root.add(rubber);
}

/** White edge lines, 0.30 m wide, 0.15 m inside each asphalt edge (right side first, then left). */
function buildEdgeLines(ctx, model) {
  // the shared line material also paints the pit-lane line, the start line and the grid slots
  Object.assign(ctx.materials.line, { polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
  for (const side of [1, -1]) {
    const geometry = buildStrip(
      model,
      (i) => side * (model.halfWidth[i] - 0.15),
      (i) => side * (model.halfWidth[i] - 0.45),
      { y: LAYERS.lines },
    );
    const line = new Mesh(geometry, ctx.materials.line);
    line.receiveShadow = true;
    ctx.root.add(line);
  }
}

/**
 * Corner furniture.
 *  - Every corner run gets, on both sides (right, then left), a 1.6 m kerb at the asphalt edge
 *    (flush with the asphalt there, 15 mm higher on the outside, with a riser down to the run-off;
 *    texture repeats every 6 m) and 3.9 m of painted run-off, square-cut at both ends.
 *  - Every gravel interval of the model (the outside of each sub-corner, 25 m before to 42 m after
 *    the corner, never inside a bend, same-side intervals merged or bridged) gets a gravel trap
 *    from 5.5 m beyond the edge (gravelTraps()), and a 0.95 m barrier wall 31.4 m beyond the edge
 *    where barrierRuns() allows one.
 */
function buildCorners(ctx, model) {
  const { materials, root } = ctx;
  const { halfWidth } = model;
  for (const corner of model.corners) {
    const range = [corner.first, corner.last];
    for (const side of [1, -1]) {
      const kerbGeometry = buildStrip(
        model,
        (i) => side * halfWidth[i],
        (i) => side * (halfWidth[i] + KERB_WIDTH),
        {
          range,
          y: LAYERS.kerbInner,
          vScale: 1 / 6,
          heightB: LAYERS.kerbOuter - LAYERS.kerbInner,
          skirtB: LAYERS.runoff,
        },
      );
      const kerb = new Mesh(kerbGeometry, materials.kerb);
      kerb.receiveShadow = true;
      root.add(kerb);
      const runoffGeometry = buildStrip(
        model,
        (i) => side * (halfWidth[i] + KERB_WIDTH),
        (i) => side * (halfWidth[i] + RUNOFF_OUTER),
        { range, y: LAYERS.runoff },
      );
      root.add(new Mesh(runoffGeometry, materials.runoff));
    }
  }

  const gravelIndex = createPlanIndex(); // every gravel triangle, for the wall layout
  for (const { side, first, last, width } of gravelTraps(model)) {
    const gravelGeometry = buildStrip(
      model,
      (i) => side * (halfWidth[i] + RUNOFF_OUTER),
      (i, step) => side * (halfWidth[i] + RUNOFF_OUTER + width[step - first]),
      { range: [first, last], y: LAYERS.gravel, vScale: 1 / 10 },
    );
    indexTriangles(gravelIndex, gravelGeometry);
    const gravel = new Mesh(gravelGeometry, materials.gravel);
    gravel.receiveShadow = true;
    root.add(gravel);
  }

  for (const { side, first, last } of barrierRuns(model, gravelIndex)) {
    const barrierGeometry = buildBarrierWall(
      model,
      (i) => side * (halfWidth[i] + BARRIER_OFFSET),
      [first, last],
      BARRIER_HEIGHT,
      1 / 7, // texture u per metre: one repeat every 7 m
    );
    const barrier = new Mesh(barrierGeometry, materials.barrier);
    barrier.castShadow = true;
    barrier.receiveShadow = true;
    root.add(barrier);
  }
}

/** Moving average over ±radius samples of a closed loop of values. */
function boxFilter(values, radius) {
  const count = values.length;
  const out = new Float64Array(count);
  let sum = 0;
  for (let d = -radius; d <= radius; d++) sum += values[(d + count) % count];
  for (let i = 0; i < count; i++) {
    out[i] = sum / (2 * radius + 1);
    sum += values[(i + radius + 1) % count] - values[(i - radius + count) % count];
  }
  return out;
}

/**
 * The gravel traps: [{ side, first, last, width }], width[k] in metres at step first + k.
 *   - Full width GRAVEL_WIDTH × cornerness (clamped to 0.3–1, so 7.2–24 m), smoothed along the
 *     track by two GRAVEL_SMOOTHING box filters: the cornerness is a running maximum whose plateaus
 *     change abruptly, which left notches and spikes in the outline.
 *   - Over GRAVEL_TAPER at both ends of the interval the width eases down to GRAVEL_END_WIDTH and
 *     the trap ends with a square cut (no thin tongue).
 *   - Where the inside-of-bend clamp (model.edge) leaves less room than that width, the trap takes
 *     the room left; where that is under GRAVEL_MIN_WIDTH the trap ends (its longest stretch is kept).
 */
function gravelTraps(model) {
  const { line, halfWidth } = model;
  const count = line.count;
  const radius = Math.round(GRAVEL_SMOOTHING / 2 / line.spacing);
  const clamped = Float64Array.from(model.cornerness, (c) => clamp(c, 0.3, 1));
  const scale = boxFilter(boxFilter(clamped, radius), radius);
  const traps = [];
  for (const { side, first, last } of model.gravel) {
    const steps = last - first + 1;
    const taper = Math.min(GRAVEL_TAPER, 0.3 * (steps - 1) * line.spacing);
    const width = new Float64Array(steps);
    const fits = new Uint8Array(steps);
    for (let k = 0; k < steps; k++) {
      const i = (first + k) % count;
      const full = GRAVEL_WIDTH * scale[i];
      const end = Math.min(GRAVEL_END_WIDTH, full);
      const fromEnd = Math.min(k, steps - 1 - k) * line.spacing;
      const wanted = end + (full - end) * smoothstep(clamp(fromEnd / taper, 0, 1));
      const inner = Math.abs(model.edge(i, side * (halfWidth[i] + RUNOFF_OUTER)));
      const room = Math.abs(model.edge(i, side * (halfWidth[i] + RUNOFF_OUTER + wanted))) - inner;
      width[k] = Math.min(wanted, room);
      fits[k] = width[k] >= GRAVEL_MIN_WIDTH ? 1 : 0;
    }
    const runs = flagRuns(fits, 2);
    if (!runs.length) continue;
    const [a, b] = runs.reduce((best, run) => (run[1] - run[0] > best[1] - best[0] ? run : best));
    traps.push({ side, first: first + a, last: first + b, width: width.subarray(a, b + 1) });
  }
  return traps;
}

/** Adds the plan triangles of an indexed geometry to a plan index. */
function indexTriangles(index, geometry) {
  const position = geometry.attributes.position;
  const indices = geometry.index;
  for (let k = 0; k < indices.count; k += 3) {
    const [a, b, c] = [indices.getX(k), indices.getX(k + 1), indices.getX(k + 2)];
    index.addTriangle(
      position.getX(a),
      position.getZ(a),
      position.getX(b),
      position.getZ(b),
      position.getX(c),
      position.getZ(c),
    );
  }
}

/** [first, last] of every run of set flags at least `minLength` long. */
function flagRuns(flags, minLength) {
  const runs = [];
  for (let k = 0; k < flags.length; k++) {
    if (!flags[k]) continue;
    let j = k;
    while (j + 1 < flags.length && flags[j + 1]) j++;
    if (j - k + 1 >= minLength) runs.push([k, j]);
    k = j;
  }
  return runs;
}

/**
 * Where the barrier walls stand: [{ side, first, last }] (sample ranges, unwrapped). Each gravel
 * interval's wall (BARRIER_OFFSET beyond the asphalt edge, WALL_THICKNESS thick) keeps the samples
 * where
 *   - model.edge leaves it in place: on the inside of a bend the offset clamp would pull the wall
 *     towards the track, across its own gravel, and squash its two faces together;
 *   - it stays WALL_TRACK_CLEARANCE from the asphalt edge of every part of the track (beyond the
 *     run-off, with room to spare: no wall across an infield next to another leg of the circuit);
 *   - it stays WALL_GAP from every gravel triangle (its own and the other traps').
 * Runs shorter than MIN_WALL_LENGTH are dropped. Then walls meet instead of crossing: the longest
 * wall is placed first, and every later one keeps only its longest stretch that stays WALL_GAP
 * from the walls already placed (it ends where it would meet one).
 */
function barrierRuns(model, gravelIndex) {
  const { line, halfWidth } = model;
  const count = line.count;
  const minSteps = Math.ceil(MIN_WALL_LENGTH / line.spacing) + 1;
  const trackIndex = createPlanIndex();
  for (let i = 0; i < count; i++) trackIndex.addDisc(line.x[i], line.z[i], halfWidth[i]);
  // plan points of the wall's two faces at a sample
  const faces = (side, i) => {
    const front = side * (halfWidth[i] + BARRIER_OFFSET);
    const back = front + side * WALL_THICKNESS;
    return [front, back].map((o) => [line.x[i] + line.nx[i] * o, line.z[i] + line.nz[i] * o, o]);
  };

  const candidates = [];
  for (const { side, first, last } of model.gravel) {
    const free = new Uint8Array(last - first + 1);
    for (let k = 0; k < free.length; k++) {
      const i = (first + k) % count;
      free[k] = faces(side, i).every(
        ([x, z, o]) =>
          model.edge(i, o) === o &&
          trackIndex.distance(x, z, WALL_TRACK_CLEARANCE) >= WALL_TRACK_CLEARANCE &&
          gravelIndex.distance(x, z, WALL_GAP) >= WALL_GAP,
      )
        ? 1
        : 0;
    }
    for (const [a, b] of flagRuns(free, minSteps))
      candidates.push({ side, first: first + a, last: first + b });
  }

  candidates.sort((p, q) => q.last - q.first - (p.last - p.first) || p.first - q.first);
  const wallIndex = createPlanIndex();
  const walls = [];
  for (const { side, first, last } of candidates) {
    const free = new Uint8Array(last - first + 1);
    for (let k = 0; k < free.length; k++)
      free[k] = faces(side, (first + k) % count).every(
        ([x, z]) => wallIndex.distance(x, z, WALL_GAP) >= WALL_GAP,
      )
        ? 1
        : 0;
    const runs = flagRuns(free, minSteps);
    if (!runs.length) continue;
    const [a, b] = runs.reduce((best, run) => (run[1] - run[0] > best[1] - best[0] ? run : best));
    const wall = { side, first: first + a, last: first + b };
    walls.push(wall);
    // its outline: both faces, and the end caps
    let previous = null;
    for (let step = wall.first; step <= wall.last; step++) {
      const points = faces(side, step % count);
      if (previous)
        for (let f = 0; f < 2; f++)
          wallIndex.addSegment(previous[f][0], previous[f][1], points[f][0], points[f][1]);
      if (step === wall.first || step === wall.last)
        wallIndex.addSegment(points[0][0], points[0][1], points[1][0], points[1][1]);
      previous = points;
    }
  }
  // build order: along the lap, right side first
  return walls.sort((p, q) => q.side - p.side || p.first - q.first);
}

/**
 * All ribbon layers, in draw/creation order. The model is also published as
 * ctx.root.userData.trackModel (the aerial highlight is built on it).
 */
function buildTrackSurfaces(ctx, shape) {
  const { model } = shape;
  ctx.root.userData.trackModel = model;
  buildAsphalt(ctx, model);
  buildRubberLine(ctx, model);
  buildEdgeLines(ctx, model);
  buildCorners(ctx, model);
}

export { GRAVEL_MIN_WIDTH, WALL_GAP, WALL_TRACK_CLEARANCE, buildTrackSurfaces };
