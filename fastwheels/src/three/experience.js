// The interior sequence as a pure function of scroll progress (0..1): camera, door, cabin lighting, stars.
// Because nothing here keeps state, scrolling backwards replays the same frames in reverse.
// Car coordinates: +X front, +Y up, +Z right. The driver's door is on the left (z < 0).

/** Phase boundaries. The page uses the same numbers for its captions and progress marks. */
export const PHASES = [
  { id: 'approach', from: 0.0, to: 0.13 },
  { id: 'door', from: 0.13, to: 0.3 },
  { id: 'enter', from: 0.3, to: 0.47 },
  { id: 'cabin', from: 0.47, to: 0.53 },
  { id: 'ambient', from: 0.53, to: 0.73 },
  { id: 'tilt', from: 0.73, to: 0.86 },
  { id: 'stars', from: 0.86, to: 1.0 },
];
export const AMBIENT_READY = 0.69;      // from here on the lighting controls are offered

/**
 * What the interior sequence shows. 'lights': ambient lighting, then the starlight headliner (the full path).
 * 'tint': window tint films — the glass darkens during the approach, the door opens, the camera gets in and stops
 * at the cabin view (the first half of the path, stretched over the whole scroll).
 */
export const SEQUENCES = {
  lights: {
    phases: PHASES, rail: ['door', 'cabin', 'ambient', 'tilt', 'stars'], controlsFrom: AMBIENT_READY,
    caption: { approach: 'door', door: 'door', enter: 'door', cabin: 'cabin', ambient: 'ambient', tilt: 'tilt', stars: 'stars' },
    still: { approach: 'exterior', door: 'door', enter: 'door', cabin: 'cabin-off', ambient: 'cabin-on', tilt: 'roof-off', stars: 'roof-on' },
    anchors: { ambient: AMBIENT_READY + 0.02, starlight: 0.995 }, poster: 'exterior',
  },
  tint: {
    phases: [{ id: 'tint', from: 0, to: 0.27 }, { id: 'door', from: 0.27, to: 0.62 }, { id: 'inside', from: 0.62, to: 1.01 }],
    rail: ['tint', 'door', 'inside'], controlsFrom: 0,
    caption: { tint: 'tint', door: 'door', inside: 'inside' },
    still: { tint: 'tint-on', door: 'door', inside: 'inside' },
    anchors: { tint: 0.2 }, poster: 'tint-off',
  },
};
export const STILLS = { exterior: 0.02, doorOpen: 0.3, cabinUnlit: 0.5, cabinLit: 0.72, ceilingOff: 0.865, ceilingLit: 1 };

const KEYS = [
  { t: 0.0, pos: [3.3, 1.25, -4.7], look: [0.05, 0.68, -0.15], fov: 35 },        // front three-quarter, driver's side
  { t: 0.13, pos: [0.7, 1.3, -4.7], look: [0.05, 0.74, -0.45], fov: 36 },      // abeam of the door
  { t: 0.27, pos: [-1.2, 1.28, -2.85], look: [0.22, 0.8, -0.4], fov: 40 },     // behind the opening door
  { t: 0.38, pos: [-0.55, 1.14, -1.7], look: [0.6, 0.77, 0.08], fov: 48 },     // leaning into the aperture
  { t: 0.47, pos: [-0.1, 1.04, -1.1], look: [0.75, 0.72, 0.3], fov: 55 },      // settled: wheel, dashboard, door trim
  { t: 0.72, pos: [-0.04, 1.03, -1.03], look: [0.77, 0.72, 0.32], fov: 55 },   // a slow push while the lines light up
  { t: 0.79, pos: [-0.05, 0.92, -0.6], look: [-0.18, 1.12, 0.74], fov: 61 },    // panning up across the passenger side
  { t: 0.86, pos: [0.02, 0.74, -0.06], look: [-0.62, 1.36, 0.0], fov: 68 },    // under the headliner
  { t: 1.0, pos: [0.03, 0.73, -0.04], look: [-0.64, 1.37, 0.0], fov: 68 },
];

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const smooth = (a, b, v) => { const t = clamp01((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const cr = (a, b, c, d, u) => 0.5 * ((2 * b) + (-a + c) * u + (2 * a - 5 * b + 4 * c - d) * u * u + (-a + 3 * b - 3 * c + d) * u * u * u);

function sample(p, out) {
  let i = 0;
  while (i < KEYS.length - 2 && p > KEYS[i + 1].t) i++;
  const k0 = KEYS[Math.max(0, i - 1)], k1 = KEYS[i], k2 = KEYS[i + 1], k3 = KEYS[Math.min(KEYS.length - 1, i + 2)];
  const u = clamp01((p - k1.t) / (k2.t - k1.t));
  for (let a = 0; a < 3; a++) {
    out.pos[a] = cr(k0.pos[a], k1.pos[a], k2.pos[a], k3.pos[a], u);
    out.look[a] = cr(k0.look[a], k1.look[a], k2.look[a], k3.look[a], u);
  }
  const e = u * u * (3 - 2 * u);
  out.fov = k1.fov + (k2.fov - k1.fov) * e;
}

/**
 * @param {number} p       progress 0..1
 * @param {number} aspect  canvas width / height
 */
export function poseAt(p, aspect, out = { pos: [0, 0, 0], look: [0, 0, 0] }, sequence = 'lights') {
  p = clamp01(p);
  const q = p;                              // scroll progress as the page sees it
  if (sequence === 'tint') p = q * 0.5;     // the camera stops at the settled cabin view
  sample(p, out);
  // Narrow canvases: widen the lens so the composition keeps its width.
  const widen = Math.max(1, Math.min(1.6, 1.25 / aspect));
  out.fov = Math.min(84, (2 * Math.atan(Math.tan((out.fov * Math.PI) / 360) * widen) * 180) / Math.PI);
  out.door = smooth(0.13, 0.3, p);
  out.fill = smooth(0.3, 0.46, p);
  out.ambient = clamp01((p - 0.53) / (0.68 - 0.53));
  out.stars = clamp01((p - 0.865) / (0.975 - 0.865));
  out.inside = p > 0.4;
  if (sequence === 'tint') {
    out.ambient = 0; out.stars = 0;
    out.tint = smooth(0.05, 0.24, q);       // the film goes on before the door starts to open
    const phases = SEQUENCES.tint.phases;
    out.phase = (phases.find((ph) => q >= ph.from && q < ph.to) || phases[phases.length - 1]).id;
    return out;
  }
  out.tint = 1;
  out.phase = (PHASES.find((ph) => p >= ph.from && p < ph.to) || PHASES[PHASES.length - 1]).id;
  return out;
}
