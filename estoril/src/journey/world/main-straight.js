// Main-straight furniture: the outer wall with its debris fence, and the start/finish gantry with
// the start lights, the start/finish line and the painted grid slots.
//
// The straight runs along X at z = straightZ (206), from straightX1 (-534) to straightX0 (420);
// the pit wall is on its -Z side, the grandstand on its +Z side.
import {
  BoxGeometry,
  CylinderGeometry,
  DoubleSide,
  Group,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
} from 'three';

/**
 * Outer (grandstand-side) wall 10.5 m from the centre line: 1.15 m of concrete, then a debris
 * fence on top: instanced posts every 6 m and a faint transparent mesh panel (3.6 m high).
 */
function buildOuterWallAndFence(ctx) {
  const { root, materials, addBox: box } = ctx;
  const L = ctx.layout;
  const straightLength = L.straightX0 - L.straightX1;
  const straightCentreX = (L.straightX0 + L.straightX1) / 2;
  box(straightLength, 1.15, 0.6, materials.concrete, straightCentreX, 0, L.straightZ + 10.5);

  const posts = new InstancedMesh(
    new CylinderGeometry(0.07, 0.07, 4.2, 6),
    materials.steelDark,
    Math.ceil(straightLength / 6),
  );
  const matrix = new Matrix4();
  let postCount = 0;
  for (let x = L.straightX1; x < L.straightX0; x += 6) {
    matrix.makeTranslation(x, 1.15 + 2.1, L.straightZ + 10.6); // centre of a 4.2 m post on the wall
    posts.setMatrixAt(postCount++, matrix);
  }
  posts.count = postCount;
  posts.castShadow = true;
  root.add(posts);

  const fence = new Mesh(
    new PlaneGeometry(straightLength, 3.6),
    new MeshStandardMaterial({
      color: 0x8c949a,
      transparent: true,
      opacity: 0.18,
      side: DoubleSide,
      depthWrite: false,
    }),
  );
  fence.position.set(straightCentreX, 3.1, L.straightZ + 10.6);
  root.add(fence);
}

/**
 * Start gantry (group 'gantry') at gantryX spanning from the pit wall to beyond the outer wall: two
 * 9 m legs, two chords (8.2 m and 9.2 m), lattice diagonals every 1.2 m and four start-light
 * boxes over the track. Then, on the root, the start/finish line under it and ten staggered grid
 * slots (every 8 m, alternating ±3.2 m from the centre line) towards +X.
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
  for (const z of [pitSideZ, outerSideZ]) box(0.6, 9, 0.6, materials.steel, x, 0, z, gantry); // legs
  box(0.5, 0.5, outerSideZ - pitSideZ + 1, materials.steel, x, 8.2, (pitSideZ + outerSideZ) / 2, gantry); // lower chord
  box(0.5, 0.5, outerSideZ - pitSideZ + 1, materials.steel, x, 9.2, (pitSideZ + outerSideZ) / 2, gantry); // upper chord
  // Lattice diagonals (tilted 0.7 rad about X) between the chords.
  for (let z = pitSideZ; z < outerSideZ; z += 1.2) {
    const diagonal = new Mesh(new BoxGeometry(0.12, 1.3, 0.12), materials.steel);
    diagonal.position.set(x, 8.7, z);
    diagonal.rotation.x = 0.7;
    gantry.add(diagonal);
  }
  // Start lights (each its own material).
  for (let i = 0; i < 4; i++)
    box(
      0.3,
      0.9,
      1.6,
      new MeshStandardMaterial({ color: 0x1c1e21, roughness: 0.4 }),
      x - 0.2,
      7.2,
      L.straightZ - 3 + i * 2,
      gantry,
    );

  box(0.8, 0.01, 14, materials.line, x, 0.04, L.straightZ, root, false); // start/finish line
  // Grid slots: a bar across the front and two 2.2 m side lines, like a bracket opening to +X.
  for (let i = 0; i < 10; i++) {
    const slotX = x + 12 + i * 8;
    const slotZ = L.straightZ + (i % 2 ? 3.2 : -3.2);
    box(0.18, 0.01, 2.6, materials.line, slotX, 0.04, slotZ, root, false);
    box(2.2, 0.01, 0.18, materials.line, slotX + 1.1, 0.04, slotZ + 1.3, root, false);
    box(2.2, 0.01, 0.18, materials.line, slotX + 1.1, 0.04, slotZ - 1.3, root, false);
  }
}

export { buildOuterWallAndFence, buildStartGantry };
