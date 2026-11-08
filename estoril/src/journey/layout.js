// Fixed layout of the main straight, pit lane, grandstand and paddock (metres, world XZ).

var LAYOUT = {
  straightZ: 206,
  straightX0: 420,
  straightX1: -534,
  trackHalf: 7,
  pitWallZ: 198,
  pitLaneZ: 191.5,
  garageFrontZ: 185.5,
  garageDepth: 17,
  boxW: 6.7,
  boxes: 30,
  pitX0: -150.5,
  get pitX1() {
    return this.pitX0 + this.boxes * this.boxW;
  },
  towerX: 64,
  gantryX: -96,
  grandstandZ: 224,
  grandstandX0: -190,
  grandstandX1: 110,
  paddock: { x0: -170, x1: 120, z0: 96, z1: 166 },
};

export { LAYOUT };
