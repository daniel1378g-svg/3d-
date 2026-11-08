// AgX tone mapping on the CPU, the same curve as three r170's AgXToneMapping (GLSL), and its
// inverse. The lighting keys are authored as display colours (the sampled photo colours of
// docs/references.md); agxInverse turns them into the scene-linear radiance that, through the
// renderer's AgX at a given exposure, displays as that colour.
//
// Colours are linear sRGB triples (THREE.Color r, g, b in the working colour space). Nothing here
// allocates: results are written into the `out` argument.

// GLSL mat3(c0, c1, c2) takes columns; these arrays hold the same numbers column by column
const SRGB_TO_REC2020 = [0.6274, 0.0691, 0.0164, 0.3293, 0.9195, 0.088, 0.0433, 0.0113, 0.8956];
const REC2020_TO_SRGB = [1.6605, -0.1246, -0.0182, -0.5876, 1.1329, -0.1006, -0.0728, -0.0083, 1.1187];
const INSET = [
  0.856627153315983, 0.137318972929847, 0.11189821299995, 0.0951212405381588, 0.761241990602591,
  0.0767994186031903, 0.0482516061458583, 0.101439036467562, 0.811302368396859,
];
const OUTSET = [
  1.1271005818144368, -0.1413297634984383, -0.14132976349843826, -0.11060664309660323, 1.157823702216272,
  -0.11060664309660294, -0.016493938717834573, -0.016493938717834257, 1.2519364065950405,
];
const MIN_EV = -12.47393;
const MAX_EV = 4.026069;

const v = [0, 0, 0];
const w = [0, 0, 0];

/** w = M v for a column-major 3×3 matrix. */
function mul(m, a, out) {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  out[0] = m[0] * x + m[3] * y + m[6] * z;
  out[1] = m[1] * x + m[4] * y + m[7] * z;
  out[2] = m[2] * x + m[5] * y + m[8] * z;
  return out;
}

function contrast(x) {
  const x2 = x * x;
  const x4 = x2 * x2;
  return 15.5 * x4 * x2 - 40.14 * x4 * x + 31.96 * x4 - 6.868 * x2 * x + 0.4298 * x2 + 0.1191 * x - 0.00232;
}

/** Display-linear sRGB (0..1) of the scene-linear colour `color` at `exposure`, into `out`. */
function agx(color, exposure, out) {
  v[0] = color.r * exposure;
  v[1] = color.g * exposure;
  v[2] = color.b * exposure;
  mul(INSET, mul(SRGB_TO_REC2020, v, w), v);
  for (let i = 0; i < 3; i++) {
    const encoded = (Math.log2(Math.max(v[i], 1e-10)) - MIN_EV) / (MAX_EV - MIN_EV);
    v[i] = contrast(Math.min(1, Math.max(0, encoded)));
  }
  mul(OUTSET, v, w);
  for (let i = 0; i < 3; i++) w[i] = Math.pow(Math.max(0, w[i]), 2.2);
  mul(REC2020_TO_SRGB, w, v);
  out.r = Math.min(1, Math.max(0, v[0]));
  out.g = Math.min(1, Math.max(0, v[1]));
  out.b = Math.min(1, Math.max(0, v[2]));
  return out;
}

const probe = { r: 0, g: 0, b: 0 };

/**
 * Scene-linear colour that agx() at `exposure` maps to the display-linear colour `target`, into
 * `out` (a fixed-point iteration per channel, 24 steps; colours AgX cannot reach, such as fully
 * saturated ones, end at the nearest it can). Use it at setup, not per frame.
 */
function agxInverse(target, exposure, out) {
  out.r = Math.max(1e-4, target.r) / exposure;
  out.g = Math.max(1e-4, target.g) / exposure;
  out.b = Math.max(1e-4, target.b) / exposure;
  for (let k = 0; k < 24; k++) {
    agx(out, exposure, probe);
    out.r = Math.min(64, out.r * Math.pow(Math.max(1e-4, target.r) / Math.max(1e-4, probe.r), 0.8));
    out.g = Math.min(64, out.g * Math.pow(Math.max(1e-4, target.g) / Math.max(1e-4, probe.g), 0.8));
    out.b = Math.min(64, out.b * Math.pow(Math.max(1e-4, target.b) / Math.max(1e-4, probe.b), 0.8));
  }
  return out;
}

export { agx, agxInverse };
