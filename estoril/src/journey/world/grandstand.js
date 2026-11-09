// Main grandstand opposite the pits (group 'grandstand'), after docs/references.md §4.6 (Bancada A:
// raking concrete tiers, blue seats #1A66AA fading to #5583A1, a white tubular space-frame roof;
// closed since 2025, so it stands empty): 18 stepped terraces, seat rows broken by aisles every
// 20 m with pale step nosings, a front railing, stepped side walls, a plinth, the white back wall,
// columns with roof beams, a thin white roof and the space frame under it.
//
// It spans grandstandX0..grandstandX1 (-190..110) along X; the front edge is at grandstandZ (224)
// and the rows climb towards +Z (0.55 m up and 0.85 m back per row). Boxes are merged per material
// (world/batch.js), the space-frame tubes are one InstancedMesh.
import {
  CanvasTexture,
  CylinderGeometry,
  Group,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  BoxGeometry,
  Quaternion,
  RepeatWrapping,
  SRGBColorSpace,
  Vector3,
} from 'three';
import { createRng } from '../util/rng.js';
import { createBoxBatch } from './batch.js';

const ROWS = 18;
const ROOF_PITCH = -0.08; // radians about X: the roof rises towards the back (+Z)
/** Aisles: one every AISLE_SPACING metres, AISLE_WIDTH wide. */
const AISLE_SPACING = 20;
const AISLE_WIDTH = 1.3;
/** Seats per texture tile and seat pitch (metres). */
const SEATS_PER_TILE = 8;
const SEAT_PITCH = 0.5;

/**
 * Seat-row texture, 256 x 64, eight seats: blue #1A66AA backs and pans with a highlight along the
 * top of the back, dark gaps between seats, and a few sun-faded seats (#5583A1). A canvas, so Node
 * tests get an empty one.
 */
function seatTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const g = canvas.getContext('2d');
  const random = createRng(301);
  g.fillStyle = '#20262c';
  g.fillRect(0, 0, 256, 64);
  for (let s = 0; s < SEATS_PER_TILE; s++) {
    const faded = random() < 0.22;
    g.fillStyle = faded ? '#5583a1' : '#1a66aa';
    g.fillRect(s * 32 + 3, 4, 26, 56);
    g.fillStyle = 'rgba(255,255,255,.18)';
    g.fillRect(s * 32 + 3, 4, 26, 5);
    g.fillStyle = 'rgba(0,0,0,.22)';
    g.fillRect(s * 32 + 3, 40, 26, 4);
  }
  const texture = new CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function buildGrandstand(ctx) {
  const { root, materials } = ctx;
  const L = ctx.layout;
  const stand = new Group();
  stand.name = 'grandstand';
  root.add(stand);
  const length = L.grandstandX1 - L.grandstandX0;
  const centreX = (L.grandstandX0 + L.grandstandX1) / 2;
  const frontZ = L.grandstandZ;
  const batch = createBoxBatch();

  // seat sections between the aisles, all the same length (one texture repeat for all)
  const aisles = [];
  for (let x = L.grandstandX0 + AISLE_SPACING; x < L.grandstandX1 - 1; x += AISLE_SPACING) aisles.push(x);
  const edges = [L.grandstandX0 + 1, ...aisles, L.grandstandX1 - 1];
  const sectionLength = AISLE_SPACING - AISLE_WIDTH;
  const seats = new MeshStandardMaterial({ map: seatTexture(), roughness: 0.62 });
  seats.map.repeat.set(sectionLength / (SEATS_PER_TILE * SEAT_PITCH), 1);
  const nosing = new MeshStandardMaterial({ color: 0xd8d5cc, roughness: 0.85 });

  for (let row = 0; row < ROWS; row++) {
    const y = 1.2 + row * 0.55;
    const z = frontZ + row * 0.85;
    // terrace step (every third one casts a shadow), its seat sections, the aisle nosings
    batch.add(length, 0.45, 0.9, materials.concreteDark, centreX, y, z, { castShadow: row % 3 === 0 });
    for (let k = 0; k + 1 < edges.length; k++) {
      const x0 = edges[k] + (k > 0 ? AISLE_WIDTH / 2 : 0);
      const x1 = edges[k + 1] - (k + 2 < edges.length ? AISLE_WIDTH / 2 : 0);
      const segment = Math.min(sectionLength, x1 - x0);
      batch.add(segment, 0.34, 0.38, seats, (x0 + x1) / 2, y + 0.45, z - 0.1, { castShadow: false });
    }
    for (const x of aisles)
      batch.add(AISLE_WIDTH - 0.1, 0.03, 0.08, nosing, x, y + 0.45, z - 0.41, { castShadow: false });
  }
  batch.add(length, 1.2, 16, materials.concreteDark, centreX, 0, frontZ + 7.5); // plinth
  batch.add(length, 11, 1, materials.white, centreX, 0, frontZ + 16); // back wall
  // stepped side walls closing both ends, and the front railing
  for (const x of [L.grandstandX0 - 0.3, L.grandstandX1 + 0.3])
    for (let k = 0; k < 6; k++)
      batch.add(0.4, 2.4 + k * 1.65, 2.6, materials.white, x, 0, frontZ + 1.3 + k * 2.55);
  batch.add(length, 0.06, 0.06, materials.steel, centreX, 2.25, frontZ - 0.42, { castShadow: false });
  for (let x = L.grandstandX0 + 1; x <= L.grandstandX1 - 1; x += 2.5)
    batch.add(0.05, 1.0, 0.05, materials.steel, x, 1.25, frontZ - 0.42, { castShadow: false });

  // columns along the back wall, each carrying a roof beam (same pitch as the roof)
  for (let x = L.grandstandX0; x <= L.grandstandX1 + 0.1; x += 20) {
    batch.add(0.5, 16.5, 0.5, materials.steel, x, 0, frontZ + 16.2);
    batch.add(0.35, 1.4, 21, materials.steel, x, 16.6, frontZ + 7.5, { pitch: ROOF_PITCH });
  }
  batch.build(stand, 'grandstand');

  // thin white roof
  const roof = new Mesh(new BoxGeometry(length + 4, 0.2, 22), materials.roofW);
  roof.position.set(centreX, 16.5, frontZ + 7.5);
  roof.rotation.x = ROOF_PITCH;
  roof.castShadow = true;
  roof.receiveShadow = true;
  stand.add(roof);
  buildSpaceFrame(stand, roof, length + 4, 22);
}

/**
 * White tubular space frame under the roof (references: `dpng`, `estoril11`): a top and a bottom
 * layer of longitudinal chords 2.75 m apart, offset half a module, joined by transverse chords and
 * diagonals every 5 m; one InstancedMesh of 6-sided tubes in the roof's frame.
 */
function buildSpaceFrame(stand, roof, length, depth) {
  const tubes = [];
  const top = -0.2;
  const bottom = -1.1;
  const across = Math.floor(depth / 2.75);
  for (let k = 0; k <= across; k++) {
    const z = -depth / 2 + 0.6 + k * ((depth - 1.2) / across);
    tubes.push([[-length / 2, top, z], [length / 2, top, z], 0.06]);
    if (k < across) {
      const zb = z + (depth - 1.2) / across / 2;
      tubes.push([[-length / 2, bottom, zb], [length / 2, bottom, zb], 0.06]);
    }
  }
  for (let x = -length / 2 + 1; x <= length / 2 - 1; x += 5) {
    tubes.push([[x, top, -depth / 2 + 0.6], [x, top, depth / 2 - 0.6], 0.05]);
    for (let k = 0; k < across; k++) {
      const z0 = -depth / 2 + 0.6 + k * ((depth - 1.2) / across);
      const z1 = z0 + (depth - 1.2) / across;
      const zb = (z0 + z1) / 2;
      tubes.push([[x, top, z0], [x + 2.5, bottom, zb], 0.04]);
      tubes.push([[x, top, z1], [x + 2.5, bottom, zb], 0.04]);
    }
  }
  const mesh = new InstancedMesh(new CylinderGeometry(1, 1, 1, 6, 1, true), roof.material, tubes.length);
  const matrix = new Matrix4();
  const a = new Vector3();
  const b = new Vector3();
  const dir = new Vector3();
  const q = new Quaternion();
  const up = new Vector3(0, 1, 0);
  tubes.forEach(([p0, p1, radius], i) => {
    a.fromArray(p0);
    b.fromArray(p1);
    dir.subVectors(b, a);
    const len = dir.length();
    q.setFromUnitVectors(up, dir.normalize());
    matrix.compose(a.add(b).multiplyScalar(0.5), q, new Vector3(radius, len, radius));
    mesh.setMatrixAt(i, matrix);
  });
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.name = 'space-frame';
  roof.add(mesh);
}

export { buildGrandstand };
