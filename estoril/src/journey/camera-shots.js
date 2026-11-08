// Camera keyframes along the journey.
//
// Each shot key has the journey progress `u` it applies at, a camera position `pos`, a look-at
// target `tgt` and a vertical field of view `fov` (degrees, before aspect widening). A position is
//   abs(x, y, z)            world coordinates in metres (XZ ground plane, y up), or
//   rel(along, up, side)    relative to the hero car: `along` metres along its flat forward
//                           vector, `side` metres along its right vector, `up` metres above it.
// Between keys every channel (x, y, z of pos and tgt, fov) is interpolated with a monotone cubic
// Hermite curve (camera-director.js). Pairs of nearly identical keys make a slow push-in that holds
// the shot while the stage text is read.
const rel = (along, up, side) => ({ rel: [along, up, side] });
const abs = (x, y, z) => ({ abs: [x, y, z] });

const CAMERA_SHOTS = [
  // stage 1, arrival: low on the main straight, looking at the car
  { u: 0, pos: abs(321.2, 0.7, 211.4), tgt: abs(330, 0.95, 205.7), fov: 34 },
  { u: 0.085, pos: abs(320.2, 0.74, 211.6), tgt: abs(326.2, 0.92, 205.8), fov: 34 },
  // chase down the straight into the pit lane
  { u: 0.115, pos: rel(-1.5, 1.25, -5.5), tgt: rel(0.5, 0.85, 0), fov: 38 },
  { u: 0.15, pos: rel(-9, 2.4, -7), tgt: rel(3, 0.8, 0), fov: 38 },
  { u: 0.18, pos: rel(-5.5, 1.8, -7.2), tgt: rel(1, 0.9, 0), fov: 39 },
  // stage 2, pit lane: at the open pit box
  { u: 0.2, pos: abs(-65.3, 1.5, 197.5), tgt: abs(-58.3, 1, 187), fov: 40 },
  { u: 0.315, pos: abs(-64.6, 1.55, 197.3), tgt: abs(-58.4, 1, 187.1), fov: 40 },
  // aerial sweep over the circuit (the red track highlight draws itself here)
  { u: 0.345, pos: abs(-120, 60, 330), tgt: abs(-140, 0, 120), fov: 44 },
  { u: 0.375, pos: abs(40, 620, 560), tgt: abs(-10, 0, 40), fov: 46 },
  { u: 0.4, pos: abs(-380, 220, 420), tgt: abs(-520, 0, 120), fov: 42 },
  // stage 3, on track: chase camera behind/beside the car for the lap
  { u: 0.425, pos: rel(4, 1.6, -11), tgt: rel(0.3, 0.7, 0), fov: 38 },
  { u: 0.56, pos: rel(1, 1.7, -11.5), tgt: rel(0.6, 0.7, 0), fov: 38 },
  { u: 0.59, pos: rel(-12, 3.2, -4), tgt: rel(6, 1, 0), fov: 40 },
  { u: 0.635, pos: rel(-11, 3, 4), tgt: rel(5, 1, 0), fov: 40 },
  // stage 4, paddock
  { u: 0.665, pos: abs(-2.6, 1.3, 133.4), tgt: abs(-7.8, 0.75, 124.3), fov: 36 },
  { u: 0.79, pos: abs(-1.6, 1.32, 133), tgt: abs(-6.6, 0.75, 124.3), fov: 36 },
  // drive out of the paddock towards the straight
  { u: 0.815, pos: rel(-8, 2, 5), tgt: rel(3, 0.9, 0), fov: 38 },
  { u: 0.84, pos: rel(-4, 2.2, 7), tgt: rel(2, 0.9, 0), fov: 40 },
  { u: 0.865, pos: rel(6.5, 1.25, 4.5), tgt: rel(0, 0.8, 0), fov: 37 },
  // stage 5, golden hour on the straight
  { u: 0.885, pos: abs(10.6, 1.12, 188.4), tgt: abs(18, 0.8, 192.4), fov: 36 },
  { u: 1, pos: abs(9.2, 1.1, 188.9), tgt: abs(15.6, 0.8, 192.4), fov: 35 },
];

/** Where the camera starts the intro fly-in (blended into the shot with the eased intro amount). */
const INTRO_CAMERA_POSITION = [346, 0.5, 214.4];
const INTRO_CAMERA_FOV = 30;

export { CAMERA_SHOTS, INTRO_CAMERA_FOV, INTRO_CAMERA_POSITION };
