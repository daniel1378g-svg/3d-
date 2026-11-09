// Main-straight furniture: the outer wall with its debris fence, and the start/finish gantry with
// the start lights, the start/finish line and the painted grid slots.
//
// The straight runs along X at z = straightZ (206), from straightX1 (-534) to straightX0 (420);
// the pit wall is on its -Z side, the grandstand on its +Z side.
//
// Debris fence (docs/references.md §4.5): galvanised posts every 3 m standing on the wall, the top
// metre cranked towards the track, a chain-link mesh (a mipmapped alpha texture, so it averages to an
// even veil at a distance instead of shimmering) and top and middle rails. Start gantry: a grey steel
// (#4D5467) triangular truss — two lower chords and a top chord with diagonals — on two legs, with
// four black light boxes; its members are merged into one mesh.
import {
  CylinderGeometry,
  DoubleSide,
  Group,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  Quaternion,
  Vector3,
} from 'three';
import { fenceMeshTexture } from '../textures.js';
import { createBoxBatch } from './batch.js';
import { LAYERS } from './layers.js';

/** Fence: post spacing, height of the upright part above the wall, length and tilt of the cranked top. */
const POST_SPACING = 3;
const FENCE_HEIGHT = 3.4;
const CRANK_LENGTH = 1.0;
const CRANK_ANGLE = 0.6; // radians from vertical, towards the track (-Z)

/**
 * Outer (grandstand-side) wall 10.5 m from the centre line: 1.15 m of concrete, then the debris
 * fence on top of it.
 */
function buildOuterWallAndFence(ctx) {
  const { root, materials, addBox: box } = ctx;
  const L = ctx.layout;
  const straightLength = L.straightX0 - L.straightX1;
  const straightCentreX = (L.straightX0 + L.straightX1) / 2;
  const wallTop = 1.15;
  const fenceZ = L.straightZ + 10.6;
  box(straightLength, wallTop, 0.6, materials.concrete, straightCentreX, 0, L.straightZ + 10.5);

  // posts: an upright and its cranked top, instanced
  const count = Math.floor(straightLength / POST_SPACING) + 1;
  const posts = new InstancedMesh(new CylinderGeometry(0.05, 0.05, 1, 6), materials.steelDark, count * 2);
  const matrix = new Matrix4();
  const tilt = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), -CRANK_ANGLE);
  const crankDz = -Math.sin(CRANK_ANGLE) * CRANK_LENGTH;
  const crankDy = Math.cos(CRANK_ANGLE) * CRANK_LENGTH;
  for (let k = 0; k < count; k++) {
    const x = L.straightX1 + k * POST_SPACING;
    matrix.makeScale(1, FENCE_HEIGHT, 1).setPosition(x, wallTop + FENCE_HEIGHT / 2, fenceZ);
    posts.setMatrixAt(2 * k, matrix);
    matrix.compose(
      new Vector3(x, wallTop + FENCE_HEIGHT + crankDy / 2, fenceZ + crankDz / 2),
      tilt,
      new Vector3(1, CRANK_LENGTH, 1),
    );
    posts.setMatrixAt(2 * k + 1, matrix);
  }
  posts.castShadow = true;
  posts.receiveShadow = true;
  root.add(posts);

  // chain-link mesh: the upright panel and the cranked panel, the same veil material
  const texture = fenceMeshTexture();
  texture.repeat.set(straightLength / 0.12, FENCE_HEIGHT / 0.12);
  const mesh = new MeshStandardMaterial({
    map: texture,
    color: 0xc4c9cc,
    transparent: true,
    depthWrite: false,
    side: DoubleSide,
    // each panel is one flat quad, so three.js's two-pass drawing of transparent double-sided
    // materials (back faces, then front faces, each with a program lookup) draws nothing more
    forceSinglePass: true,
    roughness: 0.6,
    metalness: 0.3,
  });
  const upright = new Mesh(new PlaneGeometry(straightLength, FENCE_HEIGHT), mesh);
  upright.position.set(straightCentreX, wallTop + FENCE_HEIGHT / 2, fenceZ);
  root.add(upright);
  const crankTexture = texture.clone();
  crankTexture.repeat.set(straightLength / 0.12, CRANK_LENGTH / 0.12);
  const crank = new Mesh(new PlaneGeometry(straightLength, CRANK_LENGTH), mesh.clone());
  crank.material.map = crankTexture;
  crank.position.set(straightCentreX, wallTop + FENCE_HEIGHT + crankDy / 2, fenceZ + crankDz / 2);
  crank.rotation.x = -CRANK_ANGLE;
  root.add(crank);

  // rails: along the top of the upright part and halfway up, and along the cranked edge
  const batch = createBoxBatch();
  for (const [y, z] of [
    [wallTop + FENCE_HEIGHT - 0.03, fenceZ],
    [wallTop + FENCE_HEIGHT / 2, fenceZ],
    [wallTop + FENCE_HEIGHT + crankDy - 0.03, fenceZ + crankDz],
  ])
    batch.add(straightLength, 0.05, 0.05, materials.steelDark, straightCentreX, y, z, { castShadow: false });
  batch.build(root, 'fence-rails');
}

/**
 * Start gantry (group 'gantry') at gantryX spanning from the pit wall to beyond the outer wall: two
 * 9 m legs, a triangular truss (lower chords at 8.2 m, top chord at 9.3 m) with diagonals every
 * 1.2 m and four start-light boxes over the track, merged into one mesh. Then, on the root, the
 * start/finish line under it and ten staggered grid slots (every 8 m, alternating ±3.2 m from the
 * centre line) towards +X.
 */
function buildStartGantry(ctx) {
  const { root, materials, addBox: box } = ctx;
  const L = ctx.layout;
  const gantry = new Group();
  gantry.name = 'gantry';
  root.add(gantry);
  const x = L.gantryX;
  const pitSideZ = L.pitWallZ - 0.5;
  const outerSideZ = L.straightZ + 11;
  const span = outerSideZ - pitSideZ + 1;
  const midZ = (pitSideZ + outerSideZ) / 2;
  const steel = new MeshStandardMaterial({ color: 0x4d5467, roughness: 0.55, metalness: 0.5 });
  const batch = createBoxBatch();
  for (const z of [pitSideZ, outerSideZ]) batch.add(0.6, 9, 0.6, steel, x, 0, z); // legs
  for (const dx of [-0.55, 0.55]) batch.add(0.3, 0.3, span, steel, x + dx, 8.2, midZ); // lower chords
  batch.add(0.3, 0.3, span, steel, x, 9.3, midZ); // top chord
  // diagonals between the chords (both faces of the truss), and the bottom ties
  for (let z = pitSideZ; z < outerSideZ; z += 1.2)
    for (const side of [-1, 1]) {
      batch.add(0.1, 1.45, 0.1, steel, x + side * 0.28, 8.15, z + 0.3, { pitch: 0.55 * side });
      batch.add(1.1, 0.08, 0.08, steel, x, 8.3, z, { castShadow: false });
    }
  // start lights
  const lights = new MeshStandardMaterial({ color: 0x1c1e21, roughness: 0.4 });
  for (let i = 0; i < 4; i++) batch.add(0.3, 0.9, 1.6, lights, x - 0.2, 7.2, L.straightZ - 3 + i * 2);
  batch.build(gantry, 'gantry');

  // Painted marks (layers.js): boxes standing 1 mm above the asphalt, the start line and the slots'
  // front bars with their tops at the paint layer, the slots' side lines (which touch the bars) one
  // layer lower, at the lines layer.
  const paintBase = LAYERS.asphalt + 0.001;
  const bar = LAYERS.paint - paintBase;
  const side = LAYERS.lines - paintBase;
  box(0.8, bar, 14, materials.line, x, paintBase, L.straightZ, root, false); // start/finish line
  // Grid slots: a bar across the front and two 2.2 m side lines, like a bracket opening to +X.
  for (let i = 0; i < 10; i++) {
    const slotX = x + 12 + i * 8;
    const slotZ = L.straightZ + (i % 2 ? 3.2 : -3.2);
    box(0.18, bar, 2.6, materials.line, slotX, paintBase, slotZ, root, false);
    box(2.2, side, 0.18, materials.line, slotX + 1.1, paintBase, slotZ + 1.3, root, false);
    box(2.2, side, 0.18, materials.line, slotX + 1.1, paintBase, slotZ - 1.3, root, false);
  }
}

export { buildOuterWallAndFence, buildStartGantry };
