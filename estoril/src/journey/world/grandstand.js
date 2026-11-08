// Main grandstand opposite the pits (group 'grandstand'): 18 stepped terraces with seat rows, a
// plinth, a back wall and a cantilevered roof on columns every 20 m.
//
// It spans grandstandX0..grandstandX1 (-190..110) along X; the front edge is at grandstandZ (224)
// and the rows climb towards +Z (0.55 m up and 0.85 m back per row).
import { BoxGeometry, Group, Mesh } from 'three';

const ROWS = 18;
const ROOF_PITCH = -0.08; // radians about X: the roof rises towards the back (+Z)

function buildGrandstand(ctx) {
  const { root, materials, addBox: box } = ctx;
  const L = ctx.layout;
  const stand = new Group();
  stand.name = 'grandstand';
  root.add(stand);
  const length = L.grandstandX1 - L.grandstandX0;
  const centreX = (L.grandstandX0 + L.grandstandX1) / 2;
  const frontZ = L.grandstandZ;

  for (let row = 0; row < ROWS; row++) {
    // Terrace step (only every third one casts a shadow) and its seat row.
    box(
      length,
      0.45,
      0.9,
      materials.concreteDark,
      centreX,
      1.2 + row * 0.55,
      frontZ + row * 0.85,
      stand,
      row % 3 === 0,
    );
    box(length - 2, 0.32, 0.35, materials.seat, centreX, 1.65 + row * 0.55, frontZ + row * 0.85 - 0.1, stand, false);
  }
  box(length, 1.2, 16, materials.concreteDark, centreX, 0, frontZ + 7.5, stand); // plinth
  box(length, 11, 1, materials.white, centreX, 0, frontZ + 16, stand); // back wall

  const roof = new Mesh(new BoxGeometry(length + 4, 0.45, 22), materials.roofW);
  roof.position.set(centreX, 16.5, frontZ + 7.5);
  roof.rotation.x = ROOF_PITCH;
  roof.castShadow = true;
  roof.receiveShadow = true;
  stand.add(roof);
  // Columns along the back wall, each carrying a roof beam (same pitch as the roof).
  for (let x = L.grandstandX0; x <= L.grandstandX1 + 0.1; x += 20) {
    box(0.5, 16.5, 0.5, materials.steel, x, 0, frontZ + 16.2, stand);
    const beam = new Mesh(new BoxGeometry(0.35, 1.4, 21), materials.steel);
    beam.position.set(x, 17.3, frontZ + 7.5);
    beam.rotation.x = ROOF_PITCH;
    beam.castShadow = true;
    stand.add(beam);
  }
}

export { buildGrandstand };
