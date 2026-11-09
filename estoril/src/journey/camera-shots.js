// Camera keyframes along the journey.
//
// Each shot key has the journey progress `u` it applies at, a camera position `pos`, a look-at
// target `tgt`, a vertical field of view `fov` (degrees, for a 16:10 screen: narrower screens widen
// it, camera-director.js viewportTan), and `aerial: true` on the aerial keys (the subject is the
// circuit, not the car). Positions are
//   abs(x, y, z)            world coordinates in metres (XZ ground plane, y up),
//   rel(along, up, side)    relative to the hero car: `along` metres along its flat forward
//                           vector, `side` metres along its right vector, `up` metres above it,
//   FIT_CIRCUIT             (pos and tgt) the overhead shot that fits the whole circuit into the
//                           open framing area for the actual aspect (camera-director.js
//                           fitCircuitShot); `scale` > 1 pulls it back by that factor.
// Between keys every channel (eye, target, fov) follows a monotone cubic Hermite curve (C1, no
// overshoot between keys: camera-director.js). Pairs of nearly identical keys make a slow push-in
// that holds the shot while the stage text is read. In car shots the eye is pulled back at a key if
// the car would not fit beside the page's panels (camera-director.js), and where the subject is
// framed follows the panels' timing (PANEL_WINDOWS, PANEL_FADE: the page passes its own, these
// mirror home.js): beside the panel while one is shown, in the whole free screen otherwise.
//
// The aerial (0.315–0.425) is a drone flight: it lifts straight up off the pit lane above the
// straight (clear of the pit wall, the gantry and the grandstand roof), climbs over the grandstand
// while tilting towards the circuit, holds the overhead shot while the red line closes the lap
// (track-highlight.js, 0.334–0.388), then dives towards the first corner, where the car rejoins
// the track, and settles into the chase. scripts/test-camera.mjs checks clearance, continuity and
// framing along the whole journey.
const rel = (along, up, side) => ({ rel: [along, up, side] });
const abs = (x, y, z) => ({ abs: [x, y, z] });
const FIT_CIRCUIT = { fit: 'circuit' };

const CAMERA_SHOTS = [
  // stage 1, arrival: low on the main straight behind the car, which has just driven past (the
  // intro) and pulls away from the camera when the drive starts, so it never passes the lens
  { u: 0, pos: abs(341.5, 0.75, 212.3), tgt: rel(0.2, 0.9, 0.2), fov: 34 },
  { u: 0.085, pos: abs(339.5, 0.78, 211.2), tgt: rel(0.4, 0.88, 0.1), fov: 34 },
  // chase down the straight into the pit lane
  { u: 0.115, pos: rel(-9, 1.6, -4.5), tgt: rel(0.5, 0.85, 0), fov: 38 },
  { u: 0.15, pos: rel(-9, 2.4, -7), tgt: rel(1.5, 0.8, 0), fov: 38 },
  { u: 0.18, pos: rel(-3, 3.8, -15.5), tgt: rel(1, 0.9, 0), fov: 39 },
  // stage 2, pit lane: at the open pit box, 1.3 m in from the pit wall's face (z 197.9), 1.34 m from
  // the scenery: the chase eye comes over the wall from the straight, and where no dolly moves this
  // key (large screens) an eye 0.4 m from the face (0.51 m from the wall's cap) passed 0.39 m from it
  { u: 0.2, pos: abs(-65.3, 1.5, 196.6), tgt: abs(-58.3, 1, 187), fov: 40 },
  { u: 0.315, pos: abs(-64.6, 1.55, 197.3), tgt: abs(-58.4, 1, 187.1), fov: 40 },
  // aerial: lift off above the straight, climb over the grandstand, hold the overhead shot, dive
  { u: 0.332, pos: abs(-66, 13, 203), tgt: rel(0.5, 0.6, 0), fov: 42 },
  { u: 0.346, pos: abs(-96, 72, 262), tgt: abs(-110, 0, 130), fov: 44, aerial: true },
  { u: 0.368, pos: FIT_CIRCUIT, tgt: FIT_CIRCUIT, scale: 1.05, fov: 50, aerial: true },
  { u: 0.39, pos: FIT_CIRCUIT, tgt: FIT_CIRCUIT, scale: 1, fov: 50, aerial: true },
  { u: 0.407, pos: abs(-455, 120, 345), tgt: rel(40, 0, 0), fov: 42, aerial: true },
  // stage 3, on track: chase camera beside the car for the lap, 15–17 m to its left, which is about
  // where the Armco runs (world/barriers.js: at least 9 m beyond the asphalt); at 2.2–2.3 m the eye
  // clears the 1.13 m posts by the depth range's padding plus test-camera's WORLD_CLEARANCE
  { u: 0.425, pos: rel(5.3, 2.2, -14.85), tgt: rel(0.3, 0.7, 0), fov: 38 },
  { u: 0.56, pos: rel(1.2, 2.3, -16.7), tgt: rel(0.6, 0.7, 0), fov: 38 },
  { u: 0.59, pos: rel(-12, 3.2, -4), tgt: rel(2, 0.9, 0), fov: 40 },
  { u: 0.635, pos: rel(-11, 3, 6), tgt: rel(2, 0.9, 0), fov: 40 },
  { u: 0.652, pos: rel(-8.5, 2.4, 15.75), tgt: rel(2, 0.9, 0), fov: 38 },
  // stage 4, paddock: behind the stopped car on its right, so it drives away from the camera
  { u: 0.665, pos: abs(-16, 1.35, 134.5), tgt: rel(0.2, 0.75, 0), fov: 36 },
  { u: 0.79, pos: abs(-15.2, 1.37, 134.2), tgt: rel(0.2, 0.75, 0), fov: 36 },
  // drive out of the paddock towards the straight: from behind on its right, then on its left,
  // because the control tower stands on its right where it turns onto the pit lane
  { u: 0.815, pos: rel(-9, 2.2, 4), tgt: rel(1.5, 0.85, 0), fov: 38 },
  { u: 0.84, pos: rel(-6.4, 2.3, -9.8), tgt: rel(2, 0.9, 0), fov: 40 },
  { u: 0.865, pos: rel(9.75, 1.7, -4.2), tgt: rel(0, 0.8, 0), fov: 37 },
  // stage 5, golden hour: low on the pit lane ahead of the car, looking up past it at the grandstand,
  // which the low sun lights above the long shadow of the pit building (the car and the lane are in
  // that shadow, as references.md 4.9 describes)
  { u: 0.885, pos: abs(10.6, 0.75, 188.4), tgt: abs(18, 0.95, 192.4), fov: 36 },
  { u: 1, pos: abs(9.2, 0.72, 188.9), tgt: abs(15.6, 0.95, 192.4), fov: 35 },
];

/** Where the camera starts the intro fly-in (blended into the shot with the eased intro amount). */
const INTRO_CAMERA_POSITION = [346, 0.5, 214.4];
const INTRO_CAMERA_FOV = 30;

/**
 * Progress windows in which each stage panel is fully shown, and the progress over which a panel
 * fades in before its window and out after it (the last one never fades out): home.js PANEL_WINDOWS
 * and PANEL_FADE, which the page passes with setFraming(); these are the defaults (tests).
 */
const PANEL_WINDOWS = [
  [0, 0.085],
  [0.2, 0.315],
  [0.425, 0.56],
  [0.665, 0.79],
  [0.885, 1],
];
const PANEL_FADE = 0.03;

export { CAMERA_SHOTS, FIT_CIRCUIT, INTRO_CAMERA_FOV, INTRO_CAMERA_POSITION, PANEL_FADE, PANEL_WINDOWS };
