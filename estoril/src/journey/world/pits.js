// Pit lane and pit building: pit-lane asphalt, pit wall, the row of 30 garages (box 13 open, with
// its interior), the race-control tower and the flags on the garage roof.
//
// Layout (LAYOUT, metres): the garages face +Z; their front is at garageFrontZ (185.5) and they are
// garageDepth (17) deep; the pit lane runs in front of them up to the pit wall at pitWallZ (198);
// the main straight is beyond it at straightZ (206). Boxes are boxW (6.7) wide from pitX0 to pitX1.
import {
  CylinderGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PointLight,
  Shape,
  ShapeGeometry,
  Vector3,
} from 'three';
import { buildFlag } from './flags.js';

/** Index of the garage whose shutter is open and whose interior is modelled. */
const OPEN_BOX = 13;

/**
 * Flat pit-lane asphalt from 140 m before the first box to 150 m after the last, between the
 * garage fronts and the pit wall (y 0.025), the painted pit-lane line 6 m in front of the garages,
 * the pit wall (1.1 m concrete with a steel cap) and the two wedge-shaped entry/exit lanes that
 * join the pit lane to the track (y 0.028).
 *
 * Shapes are drawn in (x, -z) because rotateX(-π/2) maps shape Y onto world -Z.
 */
function buildPitLaneSurface(ctx) {
  const { root, materials, addBox: box } = ctx;
  const L = ctx.layout;
  const outline = new Shape();
  const frontZ = L.garageFrontZ;
  const wallZ = L.pitWallZ;
  outline.moveTo(L.pitX0 - 140, -wallZ);
  outline.lineTo(L.pitX1 + 150, -wallZ);
  outline.lineTo(L.pitX1 + 150, -frontZ);
  outline.lineTo(L.pitX0 - 140, -frontZ);
  outline.closePath();
  const laneGeometry = new ShapeGeometry(outline);
  laneGeometry.rotateX(-Math.PI / 2);
  const lane = new Mesh(laneGeometry, materials.pitAsphalt);
  lane.position.y = 0.025;
  lane.receiveShadow = true;
  root.add(lane);
  // World-space UVs, metres / 12 (matches the track asphalt).
  const uv = laneGeometry.attributes.uv;
  const position = laneGeometry.attributes.position;
  for (let i = 0; i < position.count; i++) uv.setXY(i, position.getX(i) / 12, position.getZ(i) / 12);

  const pitCentreX = (L.pitX0 + L.pitX1) / 2;
  // Painted line along the pit lane (no shadow), then the pit wall and its steel cap.
  box(L.pitX1 - L.pitX0 + 260, 0.012, 0.25, materials.line, pitCentreX, 0.03, L.garageFrontZ + 6, root, false);
  box(L.pitX1 - L.pitX0 + 300, 1.1, 0.7, materials.concrete, pitCentreX, 0, L.pitWallZ + 0.35);
  box(L.pitX1 - L.pitX0 + 300, 0.08, 0.9, materials.steel, pitCentreX, 1.1, L.pitWallZ + 0.35);

  // Pit exit (east, +X) and pit entry (west): a quad from the pit-lane end to a 6 m wide mouth
  // at the track edge (straightZ - 6.8), 110 m further along.
  for (const [laneEndX, mouthX] of [
    [L.pitX1 + 150, L.pitX1 + 260],
    [L.pitX0 - 140, L.pitX0 - 250],
  ]) {
    const wedge = new Shape();
    wedge.moveTo(laneEndX, -(L.garageFrontZ + 0.5));
    wedge.lineTo(laneEndX, -L.pitWallZ);
    wedge.lineTo(mouthX, -(L.straightZ - 6.8));
    wedge.lineTo(mouthX, -(L.straightZ - 6.8 - 6));
    wedge.closePath();
    const wedgeGeometry = new ShapeGeometry(wedge);
    wedgeGeometry.rotateX(-Math.PI / 2);
    const wedgeMesh = new Mesh(wedgeGeometry, materials.pitAsphalt);
    wedgeMesh.position.y = 0.028;
    wedgeMesh.receiveShadow = true;
    root.add(wedgeMesh);
  }
}

/** AO fades on both faces of the pit wall (kept inside the garage build for creation order). */
function addPitWallAo(ctx) {
  const L = ctx.layout;
  // Pit-lane face (-Z), then track face (+Z).
  ctx.addAoStrip(L.pitX0 - 150, L.pitWallZ, L.pitX1 + 150, L.pitWallZ, 1.4, -1, 0.05);
  ctx.addAoStrip(L.pitX0 - 150, L.pitWallZ + 0.7, L.pitX1 + 150, L.pitWallZ + 0.7, 1.2, 1, 0.06);
}

/**
 * The garage block: ground-floor garages with shutters, a glazed first floor (hospitality suites)
 * with mullions, a roof terrace with a glass balustrade and a handrail.
 */
function buildGarageRow(ctx, pits) {
  const { materials, addBox: box, addAoStrip } = ctx;
  const L = ctx.layout;
  const rowLength = L.boxes * L.boxW;
  const rowCentreX = (L.pitX0 + L.pitX1) / 2;
  const frontZ = L.garageFrontZ;
  const backZ = frontZ - L.garageDepth;
  const midZ = frontZ - L.garageDepth / 2; // halfway between the garage front and back

  // Back wall, first-floor slab (4.6 m) and the glazed first floor on top of it.
  box(rowLength, 4.6, 0.4, materials.white, rowCentreX, 0, backZ + 0.2, pits);
  box(rowLength + 0.6, 0.5, L.garageDepth + 2.2, materials.white, rowCentreX, 4.6, midZ + 0.9, pits);
  const glazing = ctx.glazingMaterial(rowLength / 8);
  box(rowLength, 3.4, L.garageDepth - 2, glazing, rowCentreX, 5.1, midZ - 0.4, pits);
  // First-floor mullions on every box boundary, alternating thick (even) and thin (odd).
  for (let i = 0; i <= L.boxes; i++)
    box(i % 2 ? 0.16 : 0.32, 3.4, i % 2 ? 0.45 : 0.7, materials.white, L.pitX0 + i * L.boxW, 5.1, frontZ - 1.2, pits);
  // Emissive-looking light strip under the slab edge.
  box(rowLength, 0.05, 0.14, new MeshBasicMaterial({ color: 0xfff1d6 }), rowCentreX, 4.56, frontZ + 1.4, pits, false);
  // AO on the pit lane along the garage fronts, then on both faces of the pit wall.
  addAoStrip(L.pitX0, frontZ, L.pitX1, frontZ, 3.2, 1, 0.05, pits);
  addPitWallAo(ctx);
  // Roof (8.5 m) with a glass balustrade and a steel handrail along its front edge.
  box(rowLength + 0.6, 0.55, L.garageDepth + 1.6, materials.white, rowCentreX, 8.5, midZ + 0.4, pits);
  const balustradeGlass = new MeshStandardMaterial({
    color: 0xbfd0d8,
    transparent: true,
    opacity: 0.35,
    roughness: 0.1,
  });
  box(rowLength, 1, 0.06, balustradeGlass, rowCentreX, 9.05, frontZ + 0.1, pits, false);
  box(rowLength, 0.07, 0.12, materials.steel, rowCentreX, 10.05, frontZ + 0.1, pits);

  for (let i = 0; i < L.boxes; i++) {
    const leftX = L.pitX0 + i * L.boxW;
    const centreX = leftX + L.boxW / 2;
    // Dividing wall on the box's -X side and the lintel above its door.
    box(0.35, 4.6, L.garageDepth, materials.white, leftX, 0, midZ, pits);
    box(L.boxW - 0.35, 0.7, 0.3, materials.white, centreX, 3.9, frontZ - 0.15, pits);
    if (i === OPEN_BOX) continue;
    // A few shutters are partly raised, showing a strip of interior wall behind them.
    const raised = i % 7 === 3 ? 1.2 : i % 5 === 1 ? 2.2 : 0;
    box(L.boxW - 0.4, 3.9 - raised, 0.12, materials.shutter, centreX, raised, frontZ - 0.3, pits);
    if (raised > 0) box(L.boxW - 0.4, raised, 0.1, materials.interior, centreX, 0, frontZ - 6, pits, false);
  }
  // Closing dividing wall at the +X end of the row.
  box(0.35, 4.6, L.garageDepth, materials.white, L.pitX1, 0, midZ, pits);
}

/** Stack-of-tyres material: a new one per tyre (as in the original). */
const tyreMaterial = () => new MeshStandardMaterial({ color: 0x1b1c1e, roughness: 0.95 });

/**
 * Interior of the open garage (box OPEN_BOX): floor, back wall, red tool cabinets, tyre stacks, a
 * warm point light with two ceiling light panels, a screen on the back wall, a tyre trolley and AO
 * along the walls. Stores the box's front-centre as root.userData.openBox = { x, z }.
 */
function buildOpenGarage(ctx, pits) {
  const { materials, addBox: box, addAoStrip } = ctx;
  const L = ctx.layout;
  const frontZ = L.garageFrontZ;
  const backZ = frontZ - L.garageDepth;
  const boxX = L.pitX0 + OPEN_BOX * L.boxW + L.boxW / 2;

  // Floor and back-wall lining.
  box(L.boxW - 0.4, 0.02, L.garageDepth - 0.4, materials.floor, boxX, 0.02, frontZ - L.garageDepth / 2, pits, false);
  box(L.boxW - 0.4, 3.9, 0.1, materials.interior, boxX, 0, backZ + 0.45, pits, false);
  for (const side of [-1, 1]) {
    // Red tool cabinet against the back wall, and a stack of four tyres on the opposite side.
    box(1.6, 1, 0.6, materials.red, boxX + side * 2.2, 0, backZ + 1.3, pits);
    for (let level = 0; level < 4; level++) {
      const tyre = new Mesh(new CylinderGeometry(0.33, 0.33, 0.3, 20), tyreMaterial());
      tyre.position.set(boxX - side * 2.3, 0.15 + level * 0.31, backZ + 3.2);
      tyre.castShadow = true;
      pits.add(tyre);
    }
  }
  const lamp = new PointLight(0xffd9a8, 60, 16, 1.6); // colour, intensity (cd), range (m), decay
  lamp.position.set(boxX, 3.6, frontZ - 6);
  pits.add(lamp);
  // Two ceiling light panels (each its own material) and a dark screen on the back wall.
  box(L.boxW - 1.2, 0.06, 0.5, new MeshBasicMaterial({ color: 0xfff3dc }), boxX, 4.2, frontZ - 5, pits, false);
  box(L.boxW - 1.2, 0.06, 0.5, new MeshBasicMaterial({ color: 0xfff3dc }), boxX, 4.2, frontZ - 11, pits, false);
  box(3.2, 1.4, 0.06, materials.steelDark, boxX, 1.5, backZ + 0.52, pits, false);
  // Two tyres lying on their side on a trolley.
  for (let i = 0; i < 2; i++) {
    const tyre = new Mesh(new CylinderGeometry(0.34, 0.34, 0.32, 22), tyreMaterial());
    tyre.rotation.z = Math.PI / 2;
    tyre.position.set(boxX + 1.6 + i * 0.36, 0.36, frontZ - 4.2);
    tyre.castShadow = true;
    pits.add(tyre);
  }
  box(1.1, 0.08, 0.7, materials.steel, boxX + 1.78, 0.1, frontZ - 4.2, pits, false);
  // AO along the back wall and both side walls, inside the box.
  addAoStrip(boxX - L.boxW / 2 + 0.2, backZ + 0.5, boxX + L.boxW / 2 - 0.2, backZ + 0.5, 2.4, 1, 0.045, pits);
  addAoStrip(boxX - L.boxW / 2 + 0.2, backZ + 0.5, boxX - L.boxW / 2 + 0.2, frontZ, 1.4, -1, 0.045, pits);
  addAoStrip(boxX + L.boxW / 2 - 0.2, backZ + 0.5, boxX + L.boxW / 2 - 0.2, frontZ, 1.4, 1, 0.045, pits);
  ctx.root.userData.openBox = { x: boxX, z: frontZ };
}

/**
 * Race-control tower at towerX, 7 m behind the garage fronts: a 16 m white block with three
 * glazed bands on its front, a glazed top floor (16–20.2 m), roof and overhang slab, AO on two
 * sides. Stores root.userData.tower = Vector3(x, 18, z) (a camera look-at target).
 */
function buildControlTower(ctx, pits) {
  const { materials, addBox: box, addAoStrip } = ctx;
  const L = ctx.layout;
  const towerX = L.towerX;
  const towerZ = L.garageFrontZ - 7;
  // Main block, glazed top floor, roof and the overhang slab under the top floor.
  box(18, 16, 15, materials.white, towerX, 0, towerZ, pits);
  box(18.6, 4.2, 15.6, ctx.glazingMaterial(2.4), towerX, 16, towerZ, pits);
  box(19.4, 0.6, 16.4, materials.white, towerX, 20.2, towerZ, pits);
  box(20.4, 0.25, 17.4, materials.white, towerX, 15.75, towerZ, pits);
  // Three window bands on the +Z face (each with its own glazing material).
  for (let i = 0; i < 3; i++)
    box(18.2, 1.3, 0.1, ctx.glazingMaterial(2.2), towerX, 3.4 + i * 4.2, towerZ + 7.55, pits, false);
  // AO on the ground along the +Z face and the +X face.
  addAoStrip(towerX - 9, towerZ + 7.5, towerX + 9, towerZ + 7.5, 2.4, 1, 0.05, pits);
  addAoStrip(towerX + 9, towerZ - 7.5, towerX + 9, towerZ + 7.5, 2.4, -1, 0.05, pits);
  ctx.root.userData.tower = new Vector3(towerX, 18, towerZ);
}

/** Six flags on the garage roof (9 m), every 34 m, alternating red and white. */
function buildPitRoofFlags(ctx, pits) {
  const L = ctx.layout;
  for (let i = 0; i < 6; i++)
    buildFlag(ctx, L.pitX0 + 18 + i * 34, 9, L.garageFrontZ + 0.2, i % 2 ? 0xf5f3ee : 0xe93325, pits);
}

/** The pit building, in its own group named 'pits' (garages, open box, tower, roof flags). */
function buildPitBuilding(ctx) {
  const pits = new Group();
  pits.name = 'pits';
  ctx.root.add(pits);
  buildGarageRow(ctx, pits);
  buildOpenGarage(ctx, pits);
  buildControlTower(ctx, pits);
  buildPitRoofFlags(ctx, pits);
}

export { buildPitBuilding, buildPitLaneSurface };
