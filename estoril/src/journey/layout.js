// Fixed layout of the main straight, pit lane, grandstand and paddock.
//
// Units are metres in the world XZ plane (y up). The main straight runs along the x axis at
// z = straightZ; the race direction on it is -x (from straightX0 towards straightX1, where the
// track polyline in track.json starts). Smaller z is the pit / paddock side, larger z the
// grandstand side:
//
//   z  96..166   paddock
//   z  185.5     garage fronts (garages extend garageDepth further towards -z)
//   z  191.5     pit lane (the hero car drives it at z ≈ 194)
//   z  198       pit wall
//   z  206 ± 7   main straight (track centre ± trackHalf)
//   z  224       grandstand

var LAYOUT = {
  /** z of the main straight's centre line. */
  straightZ: 206,
  /** x where the straight starts (race direction is -x). */
  straightX0: 420,
  /** x where the straight ends (turn 1 side). */
  straightX1: -534,
  /** Half width of the asphalt on the straight (not read anywhere: world.js hard-codes 7 / 6.5). */
  trackHalf: 7,
  /** z of the pit wall between the pit lane and the straight. */
  pitWallZ: 198,
  /** z of the pit lane centre line (not read anywhere; the car's pit-lane line runs at z ≈ 194). */
  pitLaneZ: 191.5,
  /** z of the garage fronts (doors facing +z, towards the pit lane). */
  garageFrontZ: 185.5,
  /** Garage depth, measured from garageFrontZ towards -z. */
  garageDepth: 17,
  /** Width (along x) of one pit box / garage. */
  boxW: 6.7,
  /** Number of pit boxes in the row. */
  boxes: 30,
  /** x of the first pit box edge; the row extends towards +x. */
  pitX0: -150.5,
  /** x of the far end of the pit box row (pitX0 + boxes * boxW). */
  get pitX1() {
    return this.pitX0 + this.boxes * this.boxW;
  },
  /** x of the control tower. */
  towerX: 64,
  /** x of the gantry (light/timing bridge) spanning the pit wall and the straight. */
  gantryX: -96,
  /** z of the grandstand front, across the straight from the pits. */
  grandstandZ: 224,
  /** x extent of the grandstand. */
  grandstandX0: -190,
  grandstandX1: 110,
  /** Paddock rectangle behind the garages. */
  paddock: { x0: -170, x1: 120, z0: 96, z1: 166 },
};

export { LAYOUT };
