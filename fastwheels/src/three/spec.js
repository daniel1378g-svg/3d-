// Shared dimensions for the procedural vehicles. Every model is authored against these numbers so the
// exterior, the cabin and the camera paths stay consistent.
//
// Coordinates (metres), the same for car and motorcycle:
//   +X = front of the vehicle      +Y = up      +Z = the vehicle's RIGHT side
//   origin = on the ground (y = 0), on the centreline (z = 0), halfway between the axles (x = 0)
// The car is left-hand drive (Switzerland): the driver sits at z < 0 and the animated door is the LEFT one.

export const CAR = {
  // Overall: a two-door sports coupé with frameless doors (no badges, no manufacturer's grille shape).
  length: 4.8, width: 1.89, height: 1.39, wheelbase: 2.86,
  noseX: 2.29, tailX: -2.51,
  axleFrontX: 1.43, axleRearX: -1.43,
  wheelZ: 0.79,               // wheel centre plane, left = -wheelZ, right = +wheelZ
  tireRadius: 0.345, tireWidth: 0.275, rimRadius: 0.245,
  groundClearance: 0.125, sillTopY: 0.215,
  archRadius: 0.395,          // wheel-arch opening radius in the side view, centred on the axle at y = tireRadius

  // Side view, centreline profile (x, y). Straight segments here; the model rounds them.
  profile: {
    splitter: [2.29, 0.2], noseTip: [2.24, 0.66], hoodMid: [1.6, 0.87], cowl: [0.82, 0.98],   // windscreen base
    header: [0.06, 1.34], roofPeak: [-0.35, 1.39], rearHeader: [-1.1, 1.31],                  // roof
    deck: [-1.92, 1.03], tailEdge: [-2.44, 0.99], bumperBottom: [-2.5, 0.35],
  },

  // Beltline = lower edge of the side glass. Rises gently towards the rear.
  beltY: (x) => 0.93 - 0.021 * x,

  // Side glass opening (DLO), side view. The door glass is frameless and moves with the door.
  dlo: {
    aBase: [0.74, 0.915],     // front lower corner, at the mirror
    aTop: [0.02, 1.285],      // front upper corner (top of the A-pillar)
    railMid: [-0.45, 1.325],  // highest point of the roof rail above the door
    cTop: [-1.0, 1.26],       // where the rail turns down into the C-pillar
    cTip: [-1.42, 0.96],      // rear tip of the quarter glass, on the beltline
  },

  // Half-width of the body at shoulder height (plan view): x -> z. Linear between entries; the model smooths it.
  halfWidth: [[2.29, 0.42], [2.1, 0.74], [1.75, 0.9], [1.43, 0.935], [0.6, 0.915], [-0.6, 0.92], [-1.43, 0.945], [-2.1, 0.9], [-2.4, 0.8], [-2.51, 0.66]],
  roofRailZ: 0.585,           // half-width of the roof at the rail (tumblehome: glass leans in from the belt to here)

  // Driver's door (LEFT side, z < 0). Hinged at its front edge, opens outwards.
  door: {
    frontX: 0.66, rearX: -0.6,          // cut lines below the belt; above the belt the door carries the frameless glass
    bottomY: 0.215,
    hinge: [0.66, 0.0, -0.9],           // vertical hinge axis passes through this point (x, _, z)
    maxAngle: 1.15,                     // radians (≈ 66°)
    thickness: 0.13,                    // outer skin to inner trim face
  },

  // Interior envelope (inner trim surfaces). The cabin model stays inside these, the exterior shell outside.
  cabin: {
    floorY: 0.17,
    footwellFrontX: 0.98, rearBulkheadX: -1.72,
    halfWidthFloor: 0.66, halfWidthArmrest: 0.74, halfWidthBelt: 0.79,   // inner face of the door trim
    headlinerY: 1.3,                   // inner roof height at the roof peak; follows the roof line 0.055 m below it
    headlinerFrontX: 0.02, headlinerRearX: -1.14, headlinerHalfWidth: 0.56,
    seatZ: 0.37,                       // seat centres at -seatZ (driver) and +seatZ (passenger)
    hPoint: [-0.25, 0.4],              // (x, y) of the front seats' hip point
    seatbackRecline: 0.38,             // radians from vertical
    steeringCenter: [0.2, 0.87, -0.37], steeringRadius: 0.187, steeringTilt: 0.35,   // tilt: top of the rim leans towards +X
    dashTopY: 0.955, dashFaceX: 0.46,  // dashboard face towards the occupants at about this x
    displayCenter: [0.4, 0.925, -0.2], // curved display: from behind the wheel (z ≈ -0.6) to the centre stack (z ≈ +0.22)
    consoleHalfWidth: 0.14, consoleTopY: 0.52, armrestTopY: 0.57,
    eye: [-0.32, 1.1, -0.37],          // driver's eye point
  },
};

export const BIKE = {
  // A fully faired supersport on a rear paddock stand, standing upright.
  length: 2.06, wheelbase: 1.44,
  axleFrontX: 0.72, axleRearX: -0.72,
  frontWheelRadius: 0.3, rearWheelRadius: 0.325, frontTireWidth: 0.12, rearTireWidth: 0.19,
  seatY: 0.83, tankTopY: 1.02, screenTopY: 1.14, tailTipX: -1.03, tailTipY: 0.93, noseX: 0.98,
  halfWidthFairing: 0.27, handlebarHalfWidth: 0.34,
};
