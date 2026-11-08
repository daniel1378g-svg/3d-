// Paddock behind the pit building: asphalt areas and access roads, team transporters with awnings,
// hospitality units, three marquees, tyre stacks with tool carts, parking bays and floodlight masts.
// Repeated objects are InstancedMeshes built from plain instance descriptions (addInstances).
//
// LAYOUT.paddock spans x -170..120, z 96..166 (the garages' back wall is at z 168.5).
import {
  BoxGeometry,
  Color,
  ConeGeometry,
  CylinderGeometry,
  Euler,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  Quaternion,
  Vector3,
} from 'three';
import { LAYERS } from './layers.js';

/**
 * One instance: position (x, y = 0, z) in metres, Euler rotation (rx, ry, rz) in radians, scale
 * (sx, sy, sz) = 1 and an optional colour `c`. Zero rotations/scales are written as omitted
 * fields (a 0 scale would read as 1).
 * @typedef {{x:number, y?:number, z:number, rx?:number, ry?:number, rz?:number,
 *            sx?:number, sy?:number, sz?:number, c?:number}} InstanceSpec
 */

const tmpMatrix = new Matrix4();
const tmpQuaternion = new Quaternion();
const tmpEuler = new Euler();
const tmpScale = new Vector3();
const tmpPosition = new Vector3();
const tmpColor = new Color();

/** Adds one InstancedMesh with an instance per spec to the world root (receives shadows). */
function addInstances(ctx, geometry, material, specs, castShadow = true) {
  const mesh = new InstancedMesh(geometry, material, specs.length);
  specs.forEach((spec, i) => {
    tmpEuler.set(spec.rx || 0, spec.ry || 0, spec.rz || 0);
    tmpQuaternion.setFromEuler(tmpEuler);
    tmpMatrix.compose(
      tmpPosition.set(spec.x, spec.y || 0, spec.z),
      tmpQuaternion,
      tmpScale.set(spec.sx || 1, spec.sy || 1, spec.sz || 1),
    );
    mesh.setMatrixAt(i, tmpMatrix);
    if (spec.c != null) mesh.setColorAt(i, tmpColor.set(spec.c));
  });
  mesh.castShadow = castShadow;
  mesh.receiveShadow = true;
  ctx.root.add(mesh);
  return mesh;
}

/**
 * Paddock asphalt (y 0.02, UVs metres / 12), three connecting aprons (y 0.022), the access road
 * from the infield (y 0.021) and the AO fade along the back of the garages.
 */
function buildPaddockSurfaces(ctx) {
  const { root, materials } = ctx;
  const L = ctx.layout;
  const P = L.paddock;
  const geometry = new PlaneGeometry(P.x1 - P.x0, P.z1 - P.z0);
  geometry.rotateX(-Math.PI / 2);
  const uv = geometry.attributes.uv;
  for (let i = 0; i < uv.count; i++)
    uv.setXY(i, (uv.getX(i) * (P.x1 - P.x0)) / 12, (uv.getY(i) * (P.z1 - P.z0)) / 12);
  const paddock = new Mesh(geometry, materials.pitAsphalt);
  paddock.position.set((P.x0 + P.x1) / 2, LAYERS.paddock, (P.z0 + P.z1) / 2);
  paddock.receiveShadow = true;
  root.add(paddock);
  // [centre x, centre z, width, depth]: east apron, link to the pit-lane end, strip behind the garages.
  for (const [x, z, width, depth] of [
    [80, 160, 22, 28],
    [84, 180, 18, 16],
    [10, 167.5, 220, 3.5],
  ]) {
    const apron = new Mesh(new PlaneGeometry(width, depth), materials.pitAsphalt);
    apron.rotation.x = -Math.PI / 2;
    apron.position.set(x, 0.022, z);
    apron.receiveShadow = true;
    root.add(apron);
  }
  const accessRoad = new Mesh(new PlaneGeometry(9, 90), materials.pitAsphalt);
  accessRoad.rotation.x = -Math.PI / 2;
  accessRoad.position.set(-60, 0.021, 70);
  accessRoad.receiveShadow = true;
  root.add(accessRoad);
  const backZ = L.garageFrontZ - L.garageDepth;
  ctx.addAoStrip(L.pitX0, backZ, L.pitX1, backZ, 2.6, -1, 0.05); // paddock side of the garage back wall
}

/** Geometry and materials shared by several paddock object kinds (created in this order). */
function createPaddockKit() {
  return {
    unitBox: new BoxGeometry(1, 1, 1),
    paint: new MeshStandardMaterial({ color: 0xffffff, roughness: 0.42, metalness: 0.25 }), // tinted per instance
    darkGlass: new MeshStandardMaterial({ color: 0x1d262c, roughness: 0.08, metalness: 0.85 }),
    rubber: new MeshStandardMaterial({ color: 0x18191b, roughness: 0.92 }),
  };
}

const TRANSPORTER_Z = 151; // the row of trucks along the back of the paddock
const TRANSPORTER_COLOURS = [0x2b2f35, 0xf5f3ee, 0x9ba4aa, 0x1c1e21, 0xe6e3dc, 0x3a4048, 0xf5f3ee, 0x65735a];

/**
 * Ten team transporters every 24 m from x -156: trailer (15.5 m), cab towards +X, windscreen,
 * five wheel sets, a red livery stripe on every third, an awning on the -Z side with three
 * poles, and two contact shadows.
 */
function buildTransporters(ctx, kit) {
  const { materials } = ctx;
  const Z = TRANSPORTER_Z;
  const trailers = [];
  const cabs = [];
  const windscreens = [];
  const wheels = [];
  const awnings = [];
  const awningPoles = [];
  const shadows = [];
  const stripes = [];
  let index = 0;
  const skirts = [];
  const trims = [];
  const rims = [];
  for (let x = -156; x <= 66; x += 24, index++) {
    const colour = TRANSPORTER_COLOURS[index % TRANSPORTER_COLOURS.length];
    trailers.push({ x, y: 0.95 + 1.95, z: Z, sx: 15.5, sy: 3.9, sz: 2.55, c: colour });
    if (index % 3 === 1)
      stripes.push({ x, y: 1.55, z: Z - 1.285, sx: 15.3, sy: 0.18, sz: 0.02, c: 0xe93325 });
    // livery band along both sides of every trailer (team colours), roof edge trim
    for (const side of [-1, 1])
      stripes.push({
        x,
        y: 3.6,
        z: Z + side * 1.285,
        sx: 15.3,
        sy: 0.32,
        sz: 0.02,
        c: index % 2 ? 0x1d2127 : 0xe93325,
      });
    trims.push({ x, y: 4.87, z: Z, sx: 15.6, sy: 0.06, sz: 2.62 });
    // side skirts between the axles, rear doors line, cab bumper and grille
    for (const side of [-1, 1])
      skirts.push({ x: x + 1.6, y: 0.62, z: Z + side * 1.2, sx: 8.6, sy: 0.55, sz: 0.06 });
    skirts.push({ x: x - 7.76, y: 2.9, z: Z, sx: 0.04, sy: 3.7, sz: 0.04 });
    cabs.push({
      x: x + 9.35,
      y: 0.9 + 1.45,
      z: Z,
      sx: 2.6,
      sy: 2.9,
      sz: 2.5,
      c: index % 2 ? 0xf5f3ee : 0x9ba4aa,
    });
    // roof fairing over the cab, sloping up to the trailer
    cabs.push({
      x: x + 9.1,
      y: 4.18,
      z: Z,
      sx: 2.2,
      sy: 0.75,
      sz: 2.4,
      rz: 0.28,
      c: index % 2 ? 0xf5f3ee : 0x9ba4aa,
    });
    skirts.push({ x: x + 10.68, y: 1.05, z: Z, sx: 0.12, sy: 0.35, sz: 2.5 });
    skirts.push({ x: x + 10.67, y: 1.75, z: Z, sx: 0.05, sy: 0.7, sz: 1.5 });
    windscreens.push({ x: x + 10.67, y: 3, z: Z, sx: 0.05, sy: 0.95, sz: 2.2 });
    for (const side of [-1, 1])
      windscreens.push({ x: x + 9.6, y: 3.05, z: Z + side * 1.255, sx: 1.3, sy: 0.75, sz: 0.02 });
    // Wheel sets: cylinders turned to lie across the truck (axle along Z, 2.6 m track), grey hubs.
    for (const dx of [-6.1, -4.8, -3.5, 7.7, 9.9]) {
      wheels.push({ x: x + dx, y: 0.5, z: Z, rx: Math.PI / 2, sy: 2.6 });
      rims.push({ x: x + dx, y: 0.5, z: Z, rx: Math.PI / 2, sx: 0.32, sy: 2.62, sz: 0.32 });
    }
    awnings.push({ x: x - 0.5, y: 3.7, z: Z - 1.28 - 2.35, sx: 13.6, sy: 0.1, sz: 4.7, rx: -0.05 });
    for (const dx of [-6.6, 0, 6.6])
      awningPoles.push({ x: x - 0.5 + dx, y: 1.8, z: Z - 1.28 - 4.55, sy: 3.6 });
    shadows.push({ x: x + 1.5, y: 0.05, z: Z, rx: -Math.PI / 2, sx: 20, sy: 4.4 });
    shadows.push({ x: x - 0.5, y: 0.052, z: Z - 3.6, rx: -Math.PI / 2, sx: 14, sy: 5.2 });
  }
  addInstances(ctx, kit.unitBox, kit.paint, trailers);
  addInstances(ctx, kit.unitBox, kit.paint, cabs);
  addInstances(ctx, kit.unitBox, kit.darkGlass, windscreens, false);
  addInstances(
    ctx,
    kit.unitBox,
    new MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 }),
    stripes,
    false,
  );
  addInstances(ctx, kit.unitBox, kit.rubber, skirts, false);
  addInstances(ctx, kit.unitBox, materials.steel, trims, false);
  addInstances(ctx, new CylinderGeometry(0.5, 0.5, 1, 16), kit.rubber, wheels);
  addInstances(ctx, new CylinderGeometry(1, 1, 1, 10), materials.steel, rims, false);
  addInstances(ctx, kit.unitBox, materials.roofW, awnings);
  addInstances(ctx, new CylinderGeometry(0.05, 0.05, 1, 6), materials.steel, awningPoles);
  addInstances(ctx, new PlaneGeometry(1, 1), materials.contact, shadows, false).renderOrder = 1;
}

/**
 * Team equipment under the awnings and between the trucks (references §4.7): pop-up tents (a white
 * pyramid canopy on four legs), black tool chests with a red stripe, folding tables, with soft contact
 * shadows; instanced.
 */
function buildPaddockEquipment(ctx, kit) {
  const { materials } = ctx;
  const Z = TRANSPORTER_Z;
  const canopies = [];
  const legs = [];
  const chests = [];
  const stripes = [];
  const tables = [];
  const shadows = [];
  let index = 0;
  for (let x = -156; x <= 66; x += 24, index++) {
    // under the awning: two tool chests and a folding table
    for (const dx of [-4.5, -3.2]) {
      chests.push({ x: x + dx, y: 0.5, z: Z - 2.2, sx: 1.1, sy: 1.0, sz: 0.6 });
      stripes.push({ x: x + dx, y: 0.82, z: Z - 2.505, sx: 1.12, sy: 0.07, sz: 0.02 });
    }
    tables.push({ x: x + 2, y: 0.74, z: Z - 3.2, sx: 1.8, sy: 0.04, sz: 0.75 });
    shadows.push({ x: x - 3.85, y: 0.054, z: Z - 2.2, rx: -Math.PI / 2, sx: 3.4, sy: 1.6 });
    // a pop-up tent in front of every other truck
    if (index % 2 === 0) {
      const tx = x + 5.5;
      const tz = Z - 9.5;
      canopies.push({ x: tx, y: 2.75, z: tz, ry: Math.PI / 4, sx: 2.12, sy: 0.7, sz: 2.12 });
      for (const [cx, cz] of [
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ])
        legs.push({ x: tx + cx * 1.45, y: 1.2, z: tz + cz * 1.45, sy: 2.4 });
      shadows.push({ x: tx, y: 0.054, z: tz, rx: -Math.PI / 2, sx: 3.6, sy: 3.6 });
    }
  }
  addInstances(ctx, new ConeGeometry(1, 1, 4, 1, true), materials.roofW, canopies);
  addInstances(ctx, new CylinderGeometry(0.03, 0.03, 1, 5), materials.steel, legs, false);
  addInstances(
    ctx,
    kit.unitBox,
    new MeshStandardMaterial({ color: 0x141518, roughness: 0.45, metalness: 0.3 }),
    chests,
  );
  addInstances(ctx, kit.unitBox, materials.red, stripes, false);
  addInstances(ctx, kit.unitBox, materials.white, tables);
  addInstances(ctx, new PlaneGeometry(1, 1), materials.contact, shadows, false).renderOrder = 1;
}

/**
 * Six two-storey hospitality units every 16.5 m from x -28 at z 100.5: ground and upper volumes
 * with roof slabs, glazed fronts facing +Z, and a contact shadow in front.
 */
function buildHospitalityUnits(ctx, kit) {
  const { materials } = ctx;
  const volumes = [];
  const glazing = [];
  const roofs = [];
  const shadows = [];
  for (let i = 0; i < 6; i++) {
    const x = -28 + i * 16.5;
    const z = 100.5;
    volumes.push({ x, y: 1.6, z, sx: 14.6, sy: 3.2, sz: 5 });
    roofs.push({ x, y: 3.3, z: z + 0.35, sx: 15.4, sy: 0.18, sz: 6.2 });
    volumes.push({ x: x - 2.2, y: 4.85, z: z - 0.6, sx: 8.6, sy: 2.9, sz: 3.6 });
    roofs.push({ x: x - 2.2, y: 6.4, z: z - 0.45, sx: 9.6, sy: 0.16, sz: 4.4 });
    glazing.push({ x, y: 1.75, z: z + 2.53, sx: 12.8, sy: 1.9, sz: 0.04 });
    glazing.push({ x: x - 2.2, y: 4.9, z: z + 1.23, sx: 8, sy: 2.1, sz: 0.04 });
    shadows.push({ x, y: 0.05, z: z + 2.6, rx: -Math.PI / 2, sx: 16, sy: 4 });
  }
  addInstances(ctx, kit.unitBox, materials.white, volumes);
  addInstances(ctx, kit.unitBox, materials.white, roofs);
  addInstances(ctx, kit.unitBox, ctx.glazingMaterial(1.5), glazing, false);
  addInstances(ctx, new PlaneGeometry(1, 1), materials.contact, shadows, false).renderOrder = 1;
}

/** Three pyramid marquees (an open 4-sided cone turned 45°, ~18 m square) on four poles each. */
function buildMarquees(ctx) {
  const { root, materials, addBox: box } = ctx;
  for (const [x, z] of [
    [-140, 116],
    [-100, 116],
    [72, 117],
  ]) {
    const canopy = new Mesh(new ConeGeometry(13, 3.2, 4, 1, true), materials.roofW);
    canopy.rotation.y = Math.PI / 4;
    canopy.position.set(x, 5.6, z);
    canopy.castShadow = true;
    root.add(canopy);
    for (const [cornerX, cornerZ] of [
      [-1, -1],
      [1, -1],
      [-1, 1],
      [1, 1],
    ])
      box(0.25, 4.2, 0.25, materials.steel, x + cornerX * 8.5, 0, z + cornerZ * 8.5, root);
  }
}

/** Eighteen stacks of 2–4 tyres along z ≈ 145 in front of the transporters, each with a tool cart. */
function buildTyreStacks(ctx, kit) {
  const tyres = [];
  const carts = [];
  for (let i = 0; i < 18; i++) {
    const x = -158 + i * 13.1 + (i % 3) * 1.7;
    const z = 145.4 - (i % 2) * 0.8;
    const stackHeight = 2 + (i % 3);
    for (let level = 0; level < stackHeight; level++)
      tyres.push({ x, y: 0.16 + level * 0.31, z, sx: 0.66, sy: 0.3, sz: 0.66 });
    carts.push({
      x: x + 2.4,
      y: 0.45,
      z: z + 0.3,
      sx: 1.2,
      sy: 0.9,
      sz: 0.8,
      c: i % 2 ? 0x1c1e21 : 0x9ba4aa,
    });
  }
  addInstances(ctx, new CylinderGeometry(0.5, 0.5, 1, 18), kit.rubber, tyres);
  addInstances(ctx, kit.unitBox, kit.paint, carts);
}

/**
 * Painted parking bays for the classic cars: seven 5.8 m lines 3.2 m apart and a spine line. They
 * stand 1 mm above the paddock asphalt with their tops at LAYERS.paddockLines (layers.js), under the
 * hero car's contact decal, which therefore darkens them.
 */
function buildParkingBays(ctx, kit) {
  const base = LAYERS.paddock + 0.001;
  const height = LAYERS.paddockLines - base;
  const y = base + height / 2;
  const lines = [];
  for (let i = 0; i < 7; i++) lines.push({ x: -7.4, y, z: 126.1 - i * 3.2, sx: 5.8, sy: height, sz: 0.12 });
  lines.push({ x: -10.3, y, z: 126.1 - 3 * 3.2, sx: 0.12, sy: height, sz: 6 * 3.2 + 0.12 });
  addInstances(ctx, kit.unitBox, ctx.materials.line, lines, false);
}

/** Four 22 m floodlight masts every 90 m along the paddock's -Z edge, each with a lamp head. */
function buildFloodlightMasts(ctx) {
  const { root, materials, addBox: box } = ctx;
  const P = ctx.layout.paddock;
  for (let i = 0; i < 4; i++) {
    box(0.4, 22, 0.4, materials.steel, P.x0 + 10 + i * 90, 0, P.z0 - 5, root);
    box(3, 0.6, 1.2, materials.steelDark, P.x0 + 10 + i * 90, 22, P.z0 - 5, root);
  }
}

function buildPaddock(ctx) {
  buildPaddockSurfaces(ctx);
  const kit = createPaddockKit();
  buildTransporters(ctx, kit);
  buildHospitalityUnits(ctx, kit);
  buildMarquees(ctx);
  buildTyreStacks(ctx, kit);
  buildPaddockEquipment(ctx, kit);
  buildParkingBays(ctx, kit);
  buildFloodlightMasts(ctx);
}

export { buildPaddock };
