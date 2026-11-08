// Camera keyframes along the journey.
//
// Each shot key has the journey progress `u` it applies at, a camera position `pos`, a look-at
// target `tgt`, a vertical field of view `fov` (degrees), a framing `frame`, and `aerial: true` on
// the aerial keys (the subject is the circuit, not the car):
//   'panel'   a stage panel is shown: the subject is kept inside the part of the screen the panel
//             leaves free (right of the panel column on desktop, above the bottom sheet on phones);
//             in car shots the view widens if the car would not fit there (camera-director.js);
//   'open'    no panel is shown (the aerial, and the drives between stages): the subject is
//             framed in the screen minus the fixed page UI (the circuit in the overhead shot).
// Positions are
//   abs(x, y, z)            world coordinates in metres (XZ ground plane, y up),
//   rel(along, up, side)    relative to the hero car: `along` metres along its flat forward
//                           vector, `side` metres along its right vector, `up` metres above it,
//   FIT_CIRCUIT             (pos and tgt) the overhead shot that fits the whole circuit into the
//                           open framing area for the actual aspect (camera-director.js
//                           fitCircuitShot); `scale` > 1 pulls it back by that factor.
// Between keys every channel (x, y, z of pos and tgt, fov, framing) follows a monotone cubic
// Hermite curve (C1, no overshoot between keys: camera-director.js). Pairs of nearly identical keys
// make a slow push-in that holds the shot while the stage text is read.
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
  // stage 1, arrival: low on the main straight, looking at the car
  { u: 0, pos: abs(321.2, 0.7, 211.4), tgt: rel(0, 0.95, 0.3), fov: 34, frame: 'panel' },
  { u: 0.085, pos: abs(320.2, 0.74, 211.6), tgt: rel(0.6, 0.92, 0.2), fov: 34, frame: 'panel' },
  // chase down the straight into the pit lane
  { u: 0.115, pos: rel(-1.5, 1.25, -5.5), tgt: rel(0.5, 0.85, 0), fov: 38, frame: 'open' },
  { u: 0.15, pos: rel(-9, 2.4, -7), tgt: rel(3, 0.8, 0), fov: 38, frame: 'open' },
  { u: 0.18, pos: rel(-13, 3.6, -8.5), tgt: rel(1, 0.9, 0), fov: 39, frame: 'open' },
  // stage 2, pit lane: at the open pit box
  { u: 0.2, pos: abs(-65.3, 1.5, 197.5), tgt: abs(-58.3, 1, 187), fov: 40, frame: 'panel' },
  { u: 0.315, pos: abs(-64.6, 1.55, 197.3), tgt: abs(-58.4, 1, 187.1), fov: 40, frame: 'panel' },
  // aerial: lift off above the straight, climb over the grandstand, hold the overhead shot, dive
  { u: 0.332, pos: abs(-66, 13, 203), tgt: rel(4, 0.5, 0), fov: 42, frame: 'panel' },
  { u: 0.346, pos: abs(-96, 72, 262), tgt: abs(-110, 0, 130), fov: 44, frame: 'open', aerial: true },
  { u: 0.368, pos: FIT_CIRCUIT, tgt: FIT_CIRCUIT, scale: 1.05, fov: 40, frame: 'open', aerial: true },
  { u: 0.39, pos: FIT_CIRCUIT, tgt: FIT_CIRCUIT, scale: 1, fov: 40, frame: 'open', aerial: true },
  { u: 0.407, pos: abs(-455, 120, 345), tgt: abs(-545, 0, 205), fov: 42, frame: 'open', aerial: true },
  // stage 3, on track: chase camera behind/beside the car for the lap
  { u: 0.425, pos: rel(4, 1.6, -11), tgt: rel(0.3, 0.7, 0), fov: 38, frame: 'panel' },
  { u: 0.56, pos: rel(1, 1.7, -11.5), tgt: rel(0.6, 0.7, 0), fov: 38, frame: 'panel' },
  { u: 0.59, pos: rel(-12, 3.2, -4), tgt: rel(6, 1, 0), fov: 40, frame: 'open' },
  { u: 0.635, pos: rel(-11, 3, 6), tgt: rel(5, 1, 0), fov: 40, frame: 'open' },
  { u: 0.652, pos: rel(-3, 2.2, 7.5), tgt: rel(2, 0.9, 0), fov: 38, frame: 'open' },
  // stage 4, paddock
  { u: 0.665, pos: abs(-2.6, 1.3, 133.4), tgt: rel(0.2, 0.75, 0), fov: 36, frame: 'panel' },
  { u: 0.79, pos: abs(-1.6, 1.32, 133), tgt: rel(0.2, 0.75, 0), fov: 36, frame: 'panel' },
  // drive out of the paddock towards the straight: from behind on its right, then on its left,
  // because the control tower stands on its right where it turns onto the pit lane
  { u: 0.815, pos: rel(-9, 2.2, 4), tgt: rel(3, 0.9, 0), fov: 38, frame: 'open' },
  { u: 0.84, pos: rel(-4, 2.2, -7), tgt: rel(2, 0.9, 0), fov: 40, frame: 'open' },
  { u: 0.865, pos: rel(6.5, 1.6, -2.8), tgt: rel(0, 0.8, 0), fov: 37, frame: 'open' },
  // stage 5, golden hour on the straight
  { u: 0.885, pos: abs(10.6, 1.12, 188.4), tgt: abs(18, 0.8, 192.4), fov: 36, frame: 'panel' },
  { u: 1, pos: abs(9.2, 1.1, 188.9), tgt: abs(15.6, 0.8, 192.4), fov: 35, frame: 'panel' },
];

/** Where the camera starts the intro fly-in (blended into the shot with the eased intro amount). */
const INTRO_CAMERA_POSITION = [346, 0.5, 214.4];
const INTRO_CAMERA_FOV = 30;

export { CAMERA_SHOTS, FIT_CIRCUIT, INTRO_CAMERA_FOV, INTRO_CAMERA_POSITION };
