// Track surface layers built as ribbons along the centre line (track/strip.js), plus the corner
// furniture: kerbs, painted run-off, gravel traps and the barrier walls behind them.
//
// Layer heights (metres above y = 0; ground is at -0.05 near the track):
//   asphalt 0.030 · gravel 0.035 · rubber line 0.034 (decal, renderOrder 1) · run-off 0.040 ·
//   edge lines 0.045 · kerbs 0.070 at the track edge sloping to 0.040 outside · barriers 0..0.95
// Of these layers only the rubber line uses polygonOffset (factor/units -1, set in materials.js).
//
// Offsets are signed lateral distances from the centre line: positive = right of the direction of
// travel (normal (-dz, dx)), negative = left. See track-analysis.js.
import { CanvasTexture, Mesh } from 'three';
import { buildBarrierWall, buildStrip } from '../track/strip.js';
import { clamp } from '../util/math.js';

/** Asphalt from -halfWidth to +halfWidth; UVs in metres / 12, across 0..14/12. */
function buildAsphalt(ctx, shape) {
  const { halfWidth } = shape;
  const geometry = buildStrip(
    ctx.track,
    (i) => halfWidth(i),
    (i) => -halfWidth(i),
    { y: 0.03, vScale: 1 / 12, uvAcross: [0, 14 / 12] },
  );
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
function buildRubberLine(ctx, shape) {
  const { materials } = ctx;
  materials.rubber.map = rubberGradientTexture();
  materials.rubber.opacity = 0.2;
  const drift = (i) => clamp(shape.turn[i] * 12, -2.2, 2.2);
  const geometry = buildStrip(
    ctx.track,
    (i) => 2.6 + drift(i),
    (i) => -3.4 + drift(i),
    { y: 0.034 },
  );
  const rubber = new Mesh(geometry, materials.rubber);
  rubber.renderOrder = 1;
  ctx.root.add(rubber);
}

/** White edge lines, 0.30 m wide, 0.15 m inside each asphalt edge (right side first, then left). */
function buildEdgeLines(ctx, shape) {
  const { halfWidth } = shape;
  for (const side of [1, -1]) {
    const geometry = buildStrip(
      ctx.track,
      (i) => side * (halfWidth(i) - 0.15),
      (i) => side * (halfWidth(i) - 0.45),
      { y: 0.045 },
    );
    const line = new Mesh(geometry, ctx.materials.line);
    line.receiveShadow = true;
    ctx.root.add(line);
  }
}

/**
 * For every corner run [start, end):
 *  - on both sides (right, then left): a 1.6 m kerb at the asphalt edge (raised 0.07 m on the
 *    track side, 0.04 m on the outside; texture repeats every 6 m) and 3.9 m of painted run-off;
 *  - on the outside of the corner only: a gravel trap from 5.5 m beyond the edge, 7.2–24 m wide
 *    depending on cornerness, and a 0.95 m barrier wall 31.4 m beyond the edge. Both extend 6
 *    points before and 10 points after the run (clamped to the first/last point, no wrap).
 */
function buildCorners(ctx, shape) {
  const { track, materials, root } = ctx;
  const { halfWidth, turn, cornerness, corners, count } = shape;
  for (const [start, end] of corners) {
    for (const side of [1, -1]) {
      const kerbGeometry = buildStrip(
        track,
        (i) => side * halfWidth(i),
        (i) => side * (halfWidth(i) + 1.6),
        { closed: false, segRange: [start, end], y: 0.07, vScale: 1 / 6, heightA: 0, heightB: -0.03 },
      );
      const kerb = new Mesh(kerbGeometry, materials.kerb);
      kerb.receiveShadow = true;
      root.add(kerb);
      const runoffGeometry = buildStrip(
        track,
        (i) => side * (halfWidth(i) + 1.6),
        (i) => side * (halfWidth(i) + 5.5),
        { closed: false, segRange: [start, end], y: 0.04 },
      );
      root.add(new Mesh(runoffGeometry, materials.runoff));
    }

    // The outside of the corner is opposite to the turn direction (straight-ish runs default left).
    const middle = Math.floor((start + end) / 2);
    const outside = -(Math.sign(turn[middle]) || 1);
    // Gravel and barrier run from 6 points before to 10 points after the corner run.
    const trapRange = [Math.max(0, start - 6), Math.min(count - 1, end + 10)];
    const gravelGeometry = buildStrip(
      track,
      (i) => outside * (halfWidth(i) + 5.5),
      (i) => outside * (halfWidth(i) + 5.5 + 24 * clamp(cornerness[i], 0.3, 1)),
      { closed: false, segRange: trapRange, y: 0.035, vScale: 1 / 10 },
    );
    const gravel = new Mesh(gravelGeometry, materials.gravel);
    gravel.receiveShadow = true;
    root.add(gravel);

    const barrierGeometry = buildBarrierWall(
      track,
      (i) => outside * (halfWidth(i) + 31.4),
      trapRange,
      0.95, // wall height, metres
      1 / 7, // texture u per metre: one repeat every 7 m
    );
    const barrier = new Mesh(barrierGeometry, materials.barrier);
    barrier.castShadow = true;
    barrier.receiveShadow = true;
    root.add(barrier);
  }
}

/** All ribbon layers, in draw/creation order. */
function buildTrackSurfaces(ctx, shape) {
  buildAsphalt(ctx, shape);
  buildRubberLine(ctx, shape);
  buildEdgeLines(ctx, shape);
  buildCorners(ctx, shape);
}

export { buildTrackSurfaces };
