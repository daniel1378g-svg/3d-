// Pit lane and pit building: pit-lane asphalt, pit wall, the row of 30 garages (box 13 open, with
// its interior), the race-control tower, pit-lane props and the flags on the garage roof.
//
// Layout (LAYOUT, metres): the garages face +Z; their front is at garageFrontZ (185.5) and they are
// garageDepth (17) deep; the pit lane runs in front of them up to the pit wall at pitWallZ (198);
// the main straight is beyond it at straightZ (206). Boxes are boxW (6.7) wide from pitX0 to pitX1.
//
// The building follows docs/references.md §4.6: white render #E9E9E7 with white piers proud of the
// facade between the bays, grey surrounds #868993 around sky-blue roller doors (#2F86C0, a band of
// vision panels at 60 %), a glazed first floor behind a cantilevered slab, a roof terrace with a
// glass balustrade on steel posts, and a light open steel canopy at ~11.7 m. Its boxes are merged
// per material (world/batch.js): one draw per material instead of one per box. The control tower
// (4 storeys, slab bands, dark-grey cladding #52535A, blue-green glass, antennas and masts) keeps
// its main block as its own box mesh: the camera path passes close to it.
import {
  CylinderGeometry,
  Group,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PointLight,
  Shape,
  ShapeGeometry,
  Vector3,
} from 'three';
import { createBoxBatch } from './batch.js';
import { buildFlag } from './flags.js';
import { LAYERS } from './layers.js';

/** Index of the garage whose shutter is open and whose interior is modelled. */
const OPEN_BOX = 13;
/** Door opening: height and width margin inside a bay (metres). */
const DOOR_HEIGHT = 4.0;
const PIER_WIDTH = 0.6;

/**
 * Flat pit-lane asphalt from 140 m before the first box to 150 m after the last, between the
 * garage fronts and the pit wall (y 0.025), the painted pit-lane line 6 m in front of the garages,
 * the pit wall (1.1 m grey concrete with a steel cap) and the two wedge-shaped entry/exit lanes that
 * join the pit lane to the track (y LAYERS.pitMouth, under the asphalt they overlap).
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
  // Its top is at the lines layer (layers.js); it stands 1 mm above the pit-lane asphalt.
  const lineBase = LAYERS.pitLane + 0.001;
  const lineHeight = LAYERS.lines - lineBase;
  box(
    L.pitX1 - L.pitX0 + 260,
    lineHeight,
    0.25,
    materials.line,
    pitCentreX,
    lineBase,
    L.garageFrontZ + 6,
    root,
    false,
  );
  // pit wall: grey concrete #686665-ish (references §4.5), a galvanised cap with a matte finish
  box(L.pitX1 - L.pitX0 + 300, 1.1, 0.7, pitWallMaterial(), pitCentreX, 0, L.pitWallZ + 0.35);
  box(L.pitX1 - L.pitX0 + 300, 0.08, 0.9, capMaterial(), pitCentreX, 1.1, L.pitWallZ + 0.35);

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
    wedgeMesh.position.y = LAYERS.pitMouth; // 10 mm under the asphalt edge the mouth overlaps
    wedgeMesh.receiveShadow = true;
    root.add(wedgeMesh);
  }
}

let pitWall = null;
let cap = null;
/** Grey concrete of the pit wall (shared). */
const pitWallMaterial = () =>
  pitWall || (pitWall = new MeshStandardMaterial({ color: 0x8a8884, roughness: 0.92 }));
/**
 * Galvanised cap of the pit wall: rough and non-metallic enough that, seen edge-on at eye height,
 * it does not turn into a thin bright line against the low sun.
 */
const capMaterial = () =>
  cap || (cap = new MeshStandardMaterial({ color: 0x8d9296, roughness: 0.7, metalness: 0.2 }));

/** AO fades on both faces of the pit wall (kept inside the garage build for creation order). */
function addPitWallAo(ctx) {
  const L = ctx.layout;
  // Pit-lane face (-Z), then track face (+Z).
  ctx.addAoStrip(L.pitX0 - 150, L.pitWallZ, L.pitX1 + 150, L.pitWallZ, 1.4, -1, 0.05);
  ctx.addAoStrip(L.pitX0 - 150, L.pitWallZ + 0.7, L.pitX1 + 150, L.pitWallZ + 0.7, 1.2, 1, 0.06);
}

/**
 * The garage block (merged per material): back wall and dividing walls, white piers proud of the
 * facade, grey door surrounds and fascia, the doors (a few partly raised), a cantilevered first-floor
 * slab with a soffit light, the glazed first floor with mullions, the roof with a glass balustrade
 * on steel posts, and a light steel canopy over the roof terrace (posts, front and back beams, a thin
 * white roof). AO strips along the fronts and the pit wall.
 */
function buildGarageRow(ctx, pits, batch) {
  const { materials, addAoStrip } = ctx;
  const L = ctx.layout;
  const add = (w, h, d, material, x, y, z, options) => batch.add(w, h, d, material, x, y, z, options);
  const rowLength = L.boxes * L.boxW;
  const rowCentreX = (L.pitX0 + L.pitX1) / 2;
  const frontZ = L.garageFrontZ;
  const backZ = frontZ - L.garageDepth;
  const midZ = frontZ - L.garageDepth / 2; // halfway between the garage front and back
  const surround = new MeshStandardMaterial({ color: 0x868993, roughness: 0.75 });

  // Back wall, first-floor slab (4.6 m, cantilevered 2 m over the pit lane) and the glazed first floor.
  add(rowLength, 4.6, 0.4, materials.white, rowCentreX, 0, backZ + 0.2);
  add(rowLength + 0.6, 0.5, L.garageDepth + 2.2, materials.white, rowCentreX, 4.6, midZ + 0.9);
  const glazing = ctx.glazingMaterial(rowLength / 8);
  glazing.color.set(0xb7d0d0); // blue-green tint (references §4.6)
  add(rowLength, 3.4, L.garageDepth - 2, glazing, rowCentreX, 5.1, midZ - 0.4);
  // First-floor mullions on every box boundary, alternating thick (even) and thin (odd).
  for (let i = 0; i <= L.boxes; i++)
    add(
      i % 2 ? 0.16 : 0.32,
      3.4,
      i % 2 ? 0.45 : 0.7,
      materials.white,
      L.pitX0 + i * L.boxW,
      5.1,
      frontZ - 1.2,
    );
  // Soffit light under the slab edge: a warm diffuser panel (lit, not a glowing line)
  const soffit = new MeshStandardMaterial({
    color: 0xf3eee4,
    emissive: 0xffe2b0,
    emissiveIntensity: 0.35,
    roughness: 0.6,
  });
  add(rowLength, 0.04, 0.5, soffit, rowCentreX, 4.56, frontZ + 1.2, { castShadow: false });
  // Grey fascia band along the slab edge
  add(rowLength + 0.6, 0.5, 0.08, surround, rowCentreX, 4.6, frontZ + 2.04, { castShadow: false });

  // Roof (8.5 m), a glass balustrade on steel posts, the handrail
  add(rowLength + 0.6, 0.55, L.garageDepth + 1.6, materials.white, rowCentreX, 8.5, midZ + 0.4);
  const balustradeGlass = new MeshStandardMaterial({
    color: 0xbfd0d8,
    transparent: true,
    opacity: 0.35,
    roughness: 0.1,
  });
  add(rowLength, 1, 0.06, balustradeGlass, rowCentreX, 9.05, frontZ + 0.1, { castShadow: false });
  add(rowLength, 0.07, 0.12, materials.steel, rowCentreX, 10.05, frontZ + 0.1);
  for (let x = L.pitX0; x <= L.pitX1 + 0.01; x += L.boxW / 2)
    add(0.06, 1.0, 0.06, materials.steel, x, 9.05, frontZ + 0.17, { castShadow: false });
  // Light open steel canopy over the terrace: posts every two bays, front and back beams, thin roof
  const canopyY = 11.6;
  for (let x = L.pitX0 + 0.5; x <= L.pitX1; x += 2 * L.boxW)
    for (const z of [frontZ - 1.2, frontZ - 9.2])
      add(0.16, canopyY - 9.05, 0.16, materials.steelDark, x, 9.05, z);
  for (const z of [frontZ - 1.2, frontZ - 9.2])
    add(rowLength, 0.35, 0.25, materials.steelDark, rowCentreX, canopyY, z);
  for (let x = L.pitX0 + 0.5; x <= L.pitX1; x += L.boxW)
    add(0.12, 0.22, 8.4, materials.steelDark, x, canopyY + 0.35, frontZ - 5.2, { castShadow: false });
  add(rowLength + 1, 0.12, 9.6, materials.roofW, rowCentreX, canopyY + 0.57, frontZ - 5.2);

  for (let i = 0; i < L.boxes; i++) {
    const leftX = L.pitX0 + i * L.boxW;
    const centreX = leftX + L.boxW / 2;
    // Dividing wall on the box's -X side, the white pier in front of it, its grey plinth
    add(0.35, 4.6, L.garageDepth, materials.white, leftX, 0, midZ);
    add(PIER_WIDTH, 4.6, 0.45, materials.white, leftX, 0, frontZ + 0.05);
    add(PIER_WIDTH + 0.04, 0.35, 0.49, surround, leftX, 0, frontZ + 0.05, { castShadow: false });
    // Grey surround: fascia above the door and jambs on both sides, set back from the piers
    const openWidth = L.boxW - PIER_WIDTH;
    add(openWidth, 4.6 - DOOR_HEIGHT, 0.3, surround, centreX, DOOR_HEIGHT, frontZ - 0.1);
    for (const side of [-1, 1])
      add(0.14, DOOR_HEIGHT, 0.32, surround, centreX + side * (openWidth / 2 - 0.07), 0, frontZ - 0.12, {
        castShadow: false,
      });
    if (i === OPEN_BOX) continue;
    // Roller door recessed 0.35 m; a few are partly raised, showing a strip of the interior
    const raised = i % 7 === 3 ? 1.2 : i % 5 === 1 ? 2.2 : 0;
    add(openWidth - 0.28, DOOR_HEIGHT - raised, 0.12, materials.shutter, centreX, raised, frontZ - 0.35);
    if (raised > 0)
      add(openWidth - 0.28, raised, 0.1, materials.interior, centreX, 0, frontZ - 6, { castShadow: false });
  }
  // Closing dividing wall and pier at the +X end of the row.
  add(0.35, 4.6, L.garageDepth, materials.white, L.pitX1, 0, midZ);
  add(PIER_WIDTH, 4.6, 0.45, materials.white, L.pitX1, 0, frontZ + 0.05);

  // AO on the pit lane along the garage fronts, then on both faces of the pit wall.
  addAoStrip(L.pitX0, frontZ + 0.28, L.pitX1, frontZ + 0.28, 3.2, 1, 0.05, pits);
  addPitWallAo(ctx);
}

/** Stack-of-tyres material, shared. */
let tyreRubber = null;
const tyreMaterial = () =>
  tyreRubber || (tyreRubber = new MeshStandardMaterial({ color: 0x1b1c1e, roughness: 0.95 }));

/**
 * Interior of the open garage (box OPEN_BOX): floor, lined back wall with a dark team backdrop and a
 * red band, black tool chests with red stripes, tyre stacks, a red wheel stand, a warm point light
 * with two ceiling light panels, a screen, a tyre trolley and AO along the walls. Stores the box's
 * front-centre as root.userData.openBox = { x, z }.
 */
function buildOpenGarage(ctx, pits, batch) {
  const { materials, addBox: box, addAoStrip } = ctx;
  const L = ctx.layout;
  const frontZ = L.garageFrontZ;
  const backZ = frontZ - L.garageDepth;
  const boxX = L.pitX0 + OPEN_BOX * L.boxW + L.boxW / 2;

  // Floor and back-wall lining (own meshes: flat floor, the interior walls stay simple boxes)
  box(
    L.boxW - 0.4,
    0.02,
    L.garageDepth - 0.4,
    materials.floor,
    boxX,
    0.02,
    frontZ - L.garageDepth / 2,
    pits,
    false,
  );
  box(L.boxW - 0.4, 3.9, 0.1, materials.interior, boxX, 0, backZ + 0.45, pits, false);
  const backdrop = new MeshStandardMaterial({ color: 0x1b1f26, roughness: 0.6 });
  batch.add(L.boxW - 0.9, 2.4, 0.04, backdrop, boxX, 1.0, backZ + 0.52, { castShadow: false });
  batch.add(L.boxW - 0.9, 0.18, 0.05, materials.red, boxX, 1.55, backZ + 0.53, { castShadow: false });
  const chest = new MeshStandardMaterial({ color: 0x141518, roughness: 0.45, metalness: 0.3 });
  for (const side of [-1, 1]) {
    // tool chest against the side wall with a red stripe, a tyre stack on the other side
    batch.add(0.7, 1.05, 1.6, chest, boxX + side * 2.55, 0, backZ + 3.2);
    batch.add(0.72, 0.06, 1.62, materials.red, boxX + side * 2.55, 0.85, backZ + 3.2, { castShadow: false });
    for (let level = 0; level < 4; level++) {
      const tyre = new Mesh(new CylinderGeometry(0.33, 0.33, 0.3, 20), tyreMaterial());
      tyre.position.set(boxX - side * 2.3, 0.15 + level * 0.31, backZ + 5.6 + (side > 0 ? 0 : 1.2));
      tyre.castShadow = true;
      pits.add(tyre);
    }
  }
  // red cabinet and the screen on the back wall, a red wheel stand
  batch.add(1.6, 1, 0.6, materials.red, boxX + 1.6, 0, backZ + 1.3);
  batch.add(0.9, 0.55, 0.6, materials.red, boxX - 1.2, 0, frontZ - 7.5);

  const lamp = new PointLight(0xffd9a8, 60, 16, 1.6); // colour, intensity (cd), range (m), decay
  lamp.position.set(boxX, 3.6, frontZ - 6);
  pits.add(lamp);
  // Two ceiling light panels and a dark screen on the back wall.
  const panel = new MeshBasicMaterial({ color: 0xfff3dc });
  box(L.boxW - 1.2, 0.06, 0.5, panel, boxX, 4.2, frontZ - 5, pits, false);
  box(L.boxW - 1.2, 0.06, 0.5, panel, boxX, 4.2, frontZ - 11, pits, false);
  box(2.4, 1.0, 0.06, materials.steelDark, boxX, 2.4, backZ + 0.56, pits, false);
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
 * Race-control tower at towerX, 7 m behind the garage fronts: a 16 m white block (its own box mesh),
 * four storeys marked by white slab bands, glazed bands on the front and the two sides, dark-grey
 * cladding #52535A on the -X end of the front and the stair core, a glazed control room (16–20.2 m,
 * blue-green glass), roof and overhang slab, a plant room, two antenna masts and three flag poles.
 * Stores root.userData.tower = Vector3(x, 18, z) (a camera look-at target).
 */
function buildControlTower(ctx, pits, batch) {
  const { materials, addBox: box, addAoStrip } = ctx;
  const L = ctx.layout;
  const towerX = L.towerX;
  const towerZ = L.garageFrontZ - 7;
  // Main block (kept as one box mesh for the depth range), glazed top floor, roof, overhang slab.
  box(18, 16, 15, materials.white, towerX, 0, towerZ, pits);
  const control = ctx.glazingMaterial(2.4);
  control.color.set(0x9fc4c4);
  box(18.6, 4.2, 15.6, control, towerX, 16, towerZ, pits);
  box(19.4, 0.6, 16.4, materials.white, towerX, 20.2, towerZ, pits);
  box(20.4, 0.25, 17.4, materials.white, towerX, 15.75, towerZ, pits);

  const cladding = new MeshStandardMaterial({ color: 0x52535a, roughness: 0.55, metalness: 0.15 });
  const bands = ctx.glazingMaterial(2.2);
  bands.color.set(0xa9cccc);
  for (let floor = 0; floor < 3; floor++) {
    const y = 3.4 + floor * 4.2;
    // glazed bands on the +Z face and both ends, slab bands between the storeys
    batch.add(13.0, 1.6, 0.1, bands, towerX + 2.4, y, towerZ + 7.55, { castShadow: false });
    for (const side of [-1, 1])
      batch.add(0.1, 1.6, 11.5, bands, towerX + side * 9.05, y, towerZ, { castShadow: false });
    batch.add(18.5, 0.35, 15.5, materials.white, towerX, y + 2.25, towerZ, { castShadow: false });
  }
  // dark cladding over the -X end of the front, flush with it (the camera path passes 1.4 m in
  // front of this face at t ≈ 0.8575), and the stair core rising above the roof at the back
  batch.add(4.2, 15.75, 0.1, cladding, towerX - 6.6, 0, towerZ + 7.55);
  batch.add(4.2, 4.6, 3.2, cladding, towerX - 6.4, 20.8, towerZ + 3.5);
  // plant room on the roof, two antenna masts, three flag poles
  batch.add(6, 2.2, 5, materials.concreteDark, towerX + 3, 20.8, towerZ - 2);
  for (const [dx, dz, h] of [
    [-4, -5, 9],
    [5.5, -5.5, 6.5],
  ])
    batch.add(0.12, h, 0.12, materials.steel, towerX + dx, 20.8, towerZ + dz);
  batch.add(1.6, 0.08, 0.08, materials.steel, towerX - 4, 28.2, towerZ - 5, { castShadow: false });
  for (let k = 0; k < 3; k++)
    batch.add(0.08, 7, 0.08, materials.steel, towerX + 6 + k * 1.5, 20.8, towerZ + 6.5);
  // AO on the ground along the +Z face and the +X face.
  addAoStrip(towerX - 9, towerZ + 7.5, towerX + 9, towerZ + 7.5, 2.4, 1, 0.05, pits);
  addAoStrip(towerX + 9, towerZ - 7.5, towerX + 9, towerZ + 7.5, 2.4, -1, 0.05, pits);
  ctx.root.userData.tower = new Vector3(towerX, 18, towerZ);
}

/**
 * Pit-lane props (references §4.7): a wheeled extinguisher in front of every closed box (red bottle
 * on a black trolley) and orange cones at the pit-lane ends; instanced, contact-shadowed by the AO
 * strip along the fronts.
 */
function buildPitLaneProps(ctx, pits) {
  const L = ctx.layout;
  const frontZ = L.garageFrontZ;
  const bottles = [];
  const trolleys = [];
  for (let i = 0; i < L.boxes; i++) {
    if (i === OPEN_BOX) continue;
    const x = L.pitX0 + i * L.boxW + L.boxW - 0.95;
    bottles.push([x, 0.42, frontZ + 0.75, 0.13, 0.62, 0.13]);
    trolleys.push([x, 0.12, frontZ + 0.75, 0.5, 0.06, 0.34]);
  }
  const cones = [];
  for (const x0 of [L.pitX0 - 30, L.pitX1 + 30])
    for (let k = 0; k < 6; k++) cones.push([x0 + (x0 < 0 ? -k : k) * 6, 0.25, frontZ + 6.4, 0.18, 0.5, 0.18]);
  const matrix = new Matrix4();
  const make = (geometry, material, list) => {
    const mesh = new InstancedMesh(geometry, material, list.length);
    list.forEach(([x, y, z, sx, sy, sz], i) =>
      mesh.setMatrixAt(i, matrix.makeScale(sx, sy, sz).setPosition(x, y, z)),
    );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    pits.add(mesh);
  };
  make(new CylinderGeometry(1, 1, 1, 10), ctx.materials.red, bottles);
  make(
    new CylinderGeometry(1, 1, 1, 8),
    new MeshStandardMaterial({ color: 0x18191b, roughness: 0.6 }),
    trolleys,
  );
  make(
    new CylinderGeometry(0.15, 1, 1, 10),
    new MeshStandardMaterial({ color: 0xe86a1f, roughness: 0.6 }),
    cones,
  );
}

/** Six flags on the garage roof (9 m), every 34 m, alternating red and white. */
function buildPitRoofFlags(ctx, pits) {
  const L = ctx.layout;
  for (let i = 0; i < 6; i++)
    buildFlag(ctx, L.pitX0 + 18 + i * 34, 9, L.garageFrontZ + 0.2, i % 2 ? 0xf5f3ee : 0xe93325, pits);
}

/** The pit building, in its own group named 'pits' (garages, open box, tower, props, roof flags). */
function buildPitBuilding(ctx) {
  const pits = new Group();
  pits.name = 'pits';
  ctx.root.add(pits);
  const batch = createBoxBatch();
  buildGarageRow(ctx, pits, batch);
  buildOpenGarage(ctx, pits, batch);
  buildControlTower(ctx, pits, batch);
  // one batch for the whole building: wider than 60 m, so the depth range indexes its triangles
  batch.build(pits, 'pit-building');
  buildPitLaneProps(ctx, pits);
  buildPitRoofFlags(ctx, pits);
}

export { buildPitBuilding, buildPitLaneSurface };
