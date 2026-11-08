// Hero-car wheels: tyre, rim, brake disc and caliper.
//
// Wheel frame: metres, the axle along z (the car's lateral axis), the wheel centre at the origin.
// `side` = +1 for a right-hand wheel (outer face towards +z), -1 for a left-hand wheel.
import {
  BoxGeometry,
  CanvasTexture,
  CircleGeometry,
  CylinderGeometry,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  LatheGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Path,
  SRGBColorSpace,
  Shape,
  SplineCurve,
  Vector2,
} from 'three';

var ACCENT_RED = 0xe93325;

/**
 * Tyre carcass: a smooth sidewall/tread profile in (radius, axial) coordinates revolved around the
 * axle. The profile runs from the inner bead on one side (just outside the rim) over the rounded
 * shoulders and slightly crowned tread to the bead on the other side.
 *
 * @param {number} outerRadius tread radius (metres)
 * @param {number} width section width (metres)
 * @param {number} rimRadius rim radius, where the beads sit
 */
function tyreGeometry(outerRadius, width, rimRadius) {
  let halfWidth = width / 2,
    profileKnots = [
      [rimRadius + 0.01, -halfWidth + 0.018],
      [rimRadius + 0.05, -halfWidth - 0.004],
      [outerRadius - 0.09, -halfWidth - 0.012],
      [outerRadius - 0.035, -halfWidth - 0.006],
      [outerRadius - 0.008, -halfWidth + 0.02],
      [outerRadius, -halfWidth + 0.055],
      [outerRadius + 0.002, 0],
      [outerRadius, halfWidth - 0.055],
      [outerRadius - 0.008, halfWidth - 0.02],
      [outerRadius - 0.035, halfWidth + 0.006],
      [outerRadius - 0.09, halfWidth + 0.012],
      [rimRadius + 0.05, halfWidth + 0.004],
      [rimRadius + 0.01, halfWidth - 0.018],
    ],
    profile = new SplineCurve(profileKnots.map(([radius, axial]) => new Vector2(radius, axial))).getPoints(
      60,
    ),
    geometry = new LatheGeometry(profile, 64);
  // LatheGeometry revolves around y; turn the axle onto z.
  return (geometry.rotateX(Math.PI / 2), geometry);
}

/**
 * Rim face: a disc of `radius` with `spokeCount` window cut-outs between 0.4 r and 0.86 r (the
 * material left between the windows forms the spokes), extruded 35 mm with a small bevel. The
 * extrusion is shifted so its outer face sits at z = 0 and it extends towards -z.
 */
function rimShape(radius, spokeCount = 10) {
  let disc = new Shape();
  disc.absarc(0, 0, radius, 0, Math.PI * 2, false);
  let windowOuter = radius * 0.86,
    hubRadius = radius * 0.32,
    pitch = (Math.PI * 2) / spokeCount;
  for (let spoke = 0; spoke < spokeCount; spoke++) {
    // Each window spans its pitch minus 17 % on either side (spoke width).
    let startAngle = spoke * pitch + pitch * 0.17,
      endAngle = (spoke + 1) * pitch - pitch * 0.17,
      cutout = new Path();
    (cutout.moveTo(Math.cos(startAngle) * hubRadius * 1.25, Math.sin(startAngle) * hubRadius * 1.25),
      cutout.absarc(0, 0, windowOuter, startAngle + 0.04, endAngle - 0.04, false),
      cutout.lineTo(Math.cos(endAngle) * hubRadius * 1.25, Math.sin(endAngle) * hubRadius * 1.25),
      cutout.closePath(),
      disc.holes.push(cutout));
  }
  let geometry = new ExtrudeGeometry(disc, {
    depth: 0.035,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.006,
    bevelSegments: 2,
    curveSegments: 40,
  });
  return (geometry.translate(0, 0, -0.035), geometry);
}

/**
 * Builds one wheel.
 *
 * @param {object} options
 * @param {number} [options.r=0.41] tyre radius (metres)
 * @param {number} [options.w=0.33] tyre width (metres)
 * @param {boolean} [options.front=false] front wheel (caliper ahead of the axle instead of behind)
 * @param {number} [options.side=1] +1 right-hand wheel (outer face +z), -1 left-hand wheel
 * @param {ReturnType<typeof wheelMaterials>} options.mats shared materials
 * @returns {{ steer: Group, spin: Group, r: number, blur: Mesh }}
 *   steer: outer group, rotate about y to steer; holds the caliper and the blur disc, which do not
 *   spin. spin: inner group, rotate about z to roll (tyre, rim, barrel, nut, disc, backing).
 *   blur: the motion-blur disc in front of the rim (its material is shared by all wheels).
 */
function buildWheel({ r: radius = 0.41, w: width = 0.33, front = false, side = 1, mats: materials }) {
  let rimRadius = radius * 0.69,
    steer = new Group(),
    spin = new Group();
  steer.add(spin);
  let tyre = new Mesh(tyreGeometry(radius, width, rimRadius), materials.rubber);
  ((tyre.castShadow = true), spin.add(tyre));
  // Rim face just inside the outer sidewall; left-hand rims are turned to face -z.
  let rim = new Mesh(rimShape(rimRadius * 0.985), materials.rim);
  ((rim.castShadow = true),
    (rim.position.z = side * (width / 2 - 0.045)),
    side < 0 && (rim.rotation.y = Math.PI),
    spin.add(rim));
  // Rim barrel: open cylinder behind the face (double-sided material).
  let barrel = new Mesh(
    new CylinderGeometry(rimRadius * 0.99, rimRadius * 0.99, width * 0.9, 40, 1, true),
    materials.barrel,
  );
  ((barrel.rotation.x = Math.PI / 2), spin.add(barrel));
  // Hexagonal centre-lock nut.
  let nut = new Mesh(new CylinderGeometry(0.05, 0.058, 0.06, 6), materials.nut);
  ((nut.rotation.x = Math.PI / 2), (nut.position.z = side * (width / 2 - 0.02)), spin.add(nut));
  let brakeDisc = new Mesh(
    new CylinderGeometry(rimRadius * 0.82, rimRadius * 0.82, 0.032, 48),
    materials.disc,
  );
  ((brakeDisc.rotation.x = Math.PI / 2),
    (brakeDisc.position.z = side * (width / 2 - 0.13)),
    spin.add(brakeDisc));
  // Motion-blur disc over the rim face; faded in with speed by the car's pose(). Does not spin.
  let blur = new Mesh(new CircleGeometry(rimRadius * 0.985, 48), materials.blur);
  ((blur.position.z = side * (width / 2 - 0.028)),
    side < 0 && (blur.rotation.y = Math.PI),
    (blur.renderOrder = 3),
    steer.add(blur));
  // Dark backing disc that hides the car body seen through the spokes.
  let backing = new Mesh(new CircleGeometry(rimRadius * 0.99, 40), materials.dark);
  ((backing.position.z = side * (width / 2 - 0.2)),
    side < 0 && (backing.rotation.y = Math.PI),
    spin.add(backing));
  // Brake caliper 0.55 rad above the horizontal: ahead of the axle on front wheels, behind it on
  // rear wheels.
  let caliper = new Mesh(new BoxGeometry(0.2, 0.11, 0.07, 2, 2, 2), materials.caliper),
    caliperAngle = front ? 0.55 : Math.PI - 0.55;
  return (
    caliper.position.set(
      Math.cos(caliperAngle) * rimRadius * 0.66,
      Math.sin(caliperAngle) * rimRadius * 0.66,
      side * (width / 2 - 0.105),
    ),
    (caliper.rotation.z = caliperAngle - Math.PI / 2),
    steer.add(caliper),
    { steer, spin, r: radius, blur }
  );
}

/** Radial grey gradient that reads as a spinning rim when faded in over the wheel. */
function discTexture() {
  let canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  let context = canvas.getContext('2d'),
    centre = 128,
    gradient = context.createRadialGradient(centre, centre, 0, centre, centre, centre);
  (gradient.addColorStop(0, 'rgba(150,156,162,1)'),
    gradient.addColorStop(0.18, 'rgba(70,74,79,.95)'),
    gradient.addColorStop(0.32, 'rgba(48,51,55,.75)'),
    gradient.addColorStop(0.7, 'rgba(58,61,66,.62)'),
    gradient.addColorStop(0.86, 'rgba(92,96,101,.8)'),
    gradient.addColorStop(0.95, 'rgba(36,38,41,.95)'),
    gradient.addColorStop(1, 'rgba(20,21,23,1)'),
    (context.fillStyle = gradient),
    context.beginPath(),
    context.arc(centre, centre, centre, 0, Math.PI * 2),
    context.fill());
  let texture = new CanvasTexture(canvas);
  return ((texture.colorSpace = SRGBColorSpace), texture);
}

/**
 * Materials shared by all four hero-car wheels (and the wheel wells). `blur` starts fully
 * transparent; the car's pose() drives its opacity from speed.
 */
function wheelMaterials() {
  return {
    rubber: new MeshStandardMaterial({ color: 0x17181a, roughness: 0.93, metalness: 0 }),
    rim: new MeshStandardMaterial({ color: 0x24262a, roughness: 0.32, metalness: 0.85 }),
    barrel: new MeshStandardMaterial({ color: 0x101113, roughness: 0.6, metalness: 0.5, side: DoubleSide }),
    nut: new MeshStandardMaterial({ color: 0x9ba4aa, roughness: 0.3, metalness: 1 }),
    disc: new MeshStandardMaterial({ color: 0x5c6066, roughness: 0.45, metalness: 0.9 }),
    caliper: new MeshStandardMaterial({ color: ACCENT_RED, roughness: 0.45, metalness: 0.15 }),
    dark: new MeshBasicMaterial({ color: 0x050506 }),
    well: new MeshBasicMaterial({ color: 0x060607, side: DoubleSide }),
    blur: new MeshStandardMaterial({
      map: discTexture(),
      transparent: true,
      opacity: 0,
      roughness: 0.35,
      metalness: 0.75,
      depthWrite: false,
    }),
  };
}

export { buildWheel, wheelMaterials };
