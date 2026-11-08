// The red line that draws itself around the circuit during the aerial shots
// (visible over progress ≈ 0.336–0.404).
//
// A thin tube along the track model's centre line, 0.6 m above the ground: unlit, fog-free, transparent,
// no depth writes, drawn late (renderOrder 5). The reveal grows the index draw range from the
// start of the tube; the opacity fades in quickly and out over progress 0.386–0.404.
import { CatmullRomCurve3, Mesh, MeshBasicMaterial, TubeGeometry, Vector3 } from 'three';
import { clamp, smoothstep } from './util/math.js';

const HIGHLIGHT_Y = 0.6; // metres above the ground
const HIGHLIGHT_RADIUS = 1.9; // metres
const TUBULAR_SEGMENTS = 1200;
const RADIAL_SEGMENTS = 6;

/** Every SAMPLE_STRIDE-th sample of the track model's centre line is a curve point (≈ 4 m apart). */
const SAMPLE_STRIDE = 4;

/** `model`: the shared track model (world/track-analysis.js), so the line follows the surfaces. */
function createTrackHighlight(model) {
  const { line } = model;
  const points = [];
  for (let i = 0; i < line.count; i += SAMPLE_STRIDE)
    points.push(new Vector3(line.x[i], HIGHLIGHT_Y, line.z[i]));
  // the curve is closed AND repeats the first point at the end (a zero-length closing segment)
  points.push(points[0].clone());
  const geometry = new TubeGeometry(
    new CatmullRomCurve3(points, true),
    TUBULAR_SEGMENTS,
    HIGHLIGHT_RADIUS,
    RADIAL_SEGMENTS,
    true,
  );
  const material = new MeshBasicMaterial({
    color: 15282981,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    fog: false,
  });
  const mesh = new Mesh(geometry, material);
  mesh.renderOrder = 5;
  const indexCount = geometry.index.count;
  return {
    mesh,
    update(progress) {
      const reveal = clamp((progress - 0.336) / 0.05, 0, 1);
      const fadeOut = 1 - clamp((progress - 0.386) / 0.018, 0, 1);
      material.opacity = Math.min(1, reveal * 4) * fadeOut * 0.95;
      mesh.visible = material.opacity > 0.01;
      // reveal whole triangles (3 indices each)
      geometry.setDrawRange(0, Math.floor((indexCount * smoothstep(reveal)) / 3) * 3);
    },
  };
}

export { createTrackHighlight };
