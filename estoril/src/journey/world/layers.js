// Heights of the flat layers around the track, lowest first (metres above y = 0).
//
// Layers that overlap in plan are at least MIN_LAYER_GAP apart, enough for the 24-bit depth buffer
// with the near plane of depth-range.js (one depth step is 0.24 mm at 1100 m in the 0.375 aerial,
// a few mm at 200 m in the close-ups, and a gap seen at elevation e is gap / sin e deep). Decals that
// lie on the asphalt are also pulled towards the camera with polygonOffset (rubber -1/-1, lines and
// paint -1/-2, highlight -2/-4). scripts/test-geometry.mjs checks every overlapping pair.
//
//   layer                          y (m)            where
//   ground (terrain)               -0.050           terrain.js (flat part around the circuit)
//   gravel                          0.010           track-surfaces.js
//   run-off (painted)               0.016           track-surfaces.js
//   pit entry/exit mouths           0.020           pits.js (overlap the asphalt edge by 0.2 m)
//   pit lane asphalt                0.025           pits.js
//   asphalt                         0.030           track-surfaces.js
//   kerbs                           0.030 → 0.045   flush with the asphalt at the track edge, rising
//                                                   outwards, with a riser down to the run-off
//   rubber line (decal)             0.036           track-surfaces.js, renderOrder 1
//   edge lines, pit-lane line top,  0.042           track-surfaces.js, pits.js, main-straight.js
//     grid-slot side lines (top)
//   start line, grid-slot bars      0.048           main-straight.js
//   aerial highlight                0.060           track-highlight.js
//
// The paddock, away from the track, has its own stack (paddock.js):
//   paddock asphalt, its link       0.020           side by side, never overlapping
//     pieces and access road
//   paddock bay lines (decal)       0.025           blended, no depth writes, renderOrder 0: drawn
//                                                   before the hero car's contact decal (6 mm above
//                                                   whatever the car stands on: 0.026, renderOrder
//                                                   1), which therefore darkens the lines it covers
//
// The asphalt keeps its old height (0.030), so the car's tyres sit on it as before.
const LAYERS = {
  ground: -0.05,
  gravel: 0.01,
  runoff: 0.016,
  pitMouth: 0.02,
  pitLane: 0.025,
  asphalt: 0.03,
  kerbInner: 0.03,
  kerbOuter: 0.045,
  rubber: 0.036,
  lines: 0.042,
  paint: 0.048,
  highlight: 0.06,
  paddock: 0.02,
  paddockLines: 0.025,
};

/** Smallest height difference (metres) between two layers that overlap in plan. */
const MIN_LAYER_GAP = 0.005;

export { LAYERS, MIN_LAYER_GAP };
