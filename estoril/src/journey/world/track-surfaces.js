// Track surface layers built as ribbons along the shared centre-line model (track-analysis.js
// createTrackModel, track/strip.js), plus the corner furniture: kerbs, painted run-off, gravel
// traps and the barrier walls behind them. Every layer takes its edges from the same model, so
// shared edges (asphalt/kerb, kerb/run-off, run-off/gravel) use identical vertices.
//
// Layer heights (metres above y = 0; ground is at -0.05 near the track):
//   asphalt 0.030 · gravel 0.035 · rubber line 0.034 (decal, renderOrder 1) · run-off 0.040 ·
//   edge lines 0.045 · kerbs 0.070 at the track edge sloping to 0.040 outside · barriers 0..0.95
// Of these layers only the rubber line uses polygonOffset (factor/units -1, set in materials.js).
//
// Offsets are signed lateral distances from the centre line: positive = right of the direction of
// travel (normal (-dz, dx)), negative = left. The model's half-width blends from 7 m on the main
// straight to 6.5 m elsewhere over 40 m.
import { CanvasTexture, Mesh } from 'three';
import { buildBarrierWall, buildStrip } from '../track/strip.js';
import { clamp, smoothstep } from '../util/math.js';

/** Kerb and run-off widths, gravel start, widest gravel and barrier offset beyond the asphalt edge. */
const KERB_WIDTH = 1.6;
const RUNOFF_OUTER = 5.5;
const GRAVEL_WIDTH = 24;
const BARRIER_OFFSET = 31.4;
/** Gravel traps narrow towards their ends over this length (metres) to this fraction of their width. */
const GRAVEL_TAPER = 20;
const GRAVEL_END_WIDTH = 0.15;

/** Asphalt from -halfWidth to +halfWidth; UVs in metres / 12, across 0..14/12. */
function buildAsphalt(ctx, model) {
  const halfWidth = (i) => model.halfWidth[i];
  const geometry = buildStrip(model, halfWidth, (i) => -halfWidth(i), {
    y: 0.03,
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
    { y: 0.034 },
  );
  const rubber = new Mesh(geometry, materials.rubber);
  rubber.renderOrder = 1;
  ctx.root.add(rubber);
}

/** White edge lines, 0.30 m wide, 0.15 m inside each asphalt edge (right side first, then left). */
function buildEdgeLines(ctx, model) {
  for (const side of [1, -1]) {
    const geometry = buildStrip(
      model,
      (i) => side * (model.halfWidth[i] - 0.15),
      (i) => side * (model.halfWidth[i] - 0.45),
      { y: 0.045 },
    );
    const line = new Mesh(geometry, ctx.materials.line);
    line.receiveShadow = true;
    ctx.root.add(line);
  }
}

/**
 * Corner furniture.
 *  - Every corner run gets, on both sides (right, then left), a 1.6 m kerb at the asphalt edge
 *    (raised 0.07 m on the track side, 0.04 m on the outside; texture repeats every 6 m) and 3.9 m
 *    of painted run-off, square-cut at both ends.
 *  - Every gravel interval of the model (the outside of each sub-corner, 25 m before to 42 m after
 *    the corner, never inside a bend, same-side intervals merged) gets a gravel trap from 5.5 m
 *    beyond the edge, 7.2–24 m wide depending on cornerness and narrowing to 15 % over 20 m at
 *    both ends, and a 0.95 m barrier wall 31.4 m beyond the edge.
 */
function buildCorners(ctx, model) {
  const { materials, root } = ctx;
  const { halfWidth, cornerness } = model;
  for (const corner of model.corners) {
    const range = [corner.first, corner.last];
    for (const side of [1, -1]) {
      const kerbGeometry = buildStrip(
        model,
        (i) => side * halfWidth[i],
        (i) => side * (halfWidth[i] + KERB_WIDTH),
        { range, y: 0.07, vScale: 1 / 6, heightA: 0, heightB: -0.03 },
      );
      const kerb = new Mesh(kerbGeometry, materials.kerb);
      kerb.receiveShadow = true;
      root.add(kerb);
      const runoffGeometry = buildStrip(
        model,
        (i) => side * (halfWidth[i] + KERB_WIDTH),
        (i) => side * (halfWidth[i] + RUNOFF_OUTER),
        { range, y: 0.04 },
      );
      root.add(new Mesh(runoffGeometry, materials.runoff));
    }
  }

  for (const { side, first, last } of model.gravel) {
    const spacing = model.line.spacing;
    const taper = Math.min(GRAVEL_TAPER, 0.3 * (last - first) * spacing);
    const width = (i, step) => {
      const fromEnd = Math.min(step - first, last - step) * spacing;
      const narrowing = GRAVEL_END_WIDTH + (1 - GRAVEL_END_WIDTH) * smoothstep(clamp(fromEnd / taper, 0, 1));
      return GRAVEL_WIDTH * clamp(cornerness[i], 0.3, 1) * narrowing;
    };
    const gravelGeometry = buildStrip(
      model,
      (i) => side * (halfWidth[i] + RUNOFF_OUTER),
      (i, step) => side * (halfWidth[i] + RUNOFF_OUTER + width(i, step)),
      { range: [first, last], y: 0.035, vScale: 1 / 10 },
    );
    const gravel = new Mesh(gravelGeometry, materials.gravel);
    gravel.receiveShadow = true;
    root.add(gravel);

    const barrierGeometry = buildBarrierWall(
      model,
      (i) => side * (halfWidth[i] + BARRIER_OFFSET),
      [first, last],
      0.95, // wall height, metres
      1 / 7, // texture u per metre: one repeat every 7 m
    );
    const barrier = new Mesh(barrierGeometry, materials.barrier);
    barrier.castShadow = true;
    barrier.receiveShadow = true;
    root.add(barrier);
  }
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

export { buildTrackSurfaces };
