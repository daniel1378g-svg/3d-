// Procedural paddock cars (classic, GT, prototype).
//
// Car frame: metres, +x forward (the front bumper is at the largest x), y up from the ground,
// z across the car (+z right). Bodies are lofted super-ellipse cross-sections along x, shaped by
// side-view profile curves; wheels, lamps, bumpers and wings are simple primitives. The parked cars
// never move, so once built a car's 25–27 parts are merged into one mesh per material and shadow
// flag (util/static-merge.js): 9–11 meshes per car (its contact decal included) instead of 25–27,
// the same pixels and clearance.
import {
  BoxGeometry,
  BufferGeometry,
  CapsuleGeometry,
  CylinderGeometry,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  SphereGeometry,
  TorusGeometry,
} from 'three';
import { contactShadowMaterial } from './people.js';
import { monotoneCurve } from './util/math.js';
import { mergeStaticMeshes } from './util/static-merge.js';

/**
 * Lofts a closed tube along x from xStart to xEnd. `sectionAt(x)` returns the cross-section:
 *   top, bottom      y of the section's top and bottom (metres)
 *   halfWidth        half width at mid height (metres)
 *   upperExponent    super-ellipse exponent of the upper half (2 = ellipse, larger = boxier)
 *   lowerExponent    super-ellipse exponent of the lower half
 *   tumblehome       how much the upper half narrows towards the top (0 = none)
 * Ring vertices start at the bottom centre (angle -90°) and go round through +z, the top and -z.
 *
 * @param {number} stations number of segments along x (stations + 1 rings)
 * @param {number} ringSegments segments around each ring (ringSegments + 1 vertices, seam at the bottom)
 */
function loftBody(xStart, xEnd, sectionAt, stations = 56, ringSegments = 36) {
  let positions = [],
    indices = [];
  for (let station = 0; station <= stations; station++) {
    let x = xStart + ((xEnd - xStart) * station) / stations,
      section = sectionAt(x),
      midY = (section.top + section.bottom) / 2,
      halfHeight = Math.max(0.001, (section.top - section.bottom) / 2);
    for (let segment = 0; segment <= ringSegments; segment++) {
      let angle = -Math.PI / 2 + (Math.PI * 2 * segment) / ringSegments,
        cos = Math.cos(angle),
        sin = Math.sin(angle),
        upper = sin >= 0,
        y = upper
          ? midY + halfHeight * Math.pow(Math.abs(sin), 2 / section.upperExponent)
          : midY - halfHeight * Math.pow(Math.abs(sin), 2 / section.lowerExponent),
        z =
          section.halfWidth *
          Math.sign(cos) *
          Math.pow(Math.abs(cos), 2 / (upper ? section.upperExponent : section.lowerExponent)) *
          (upper ? 1 - (section.tumblehome || 0) * sin * sin : 1);
      positions.push(x, y, z);
    }
  }
  for (let station = 0; station < stations; station++)
    for (let segment = 0; segment < ringSegments; segment++) {
      let here = station * (ringSegments + 1) + segment,
        nextRing = here + ringSegments + 1;
      indices.push(here, nextRing, here + 1, here + 1, nextRing, nextRing + 1);
    }
  let geometry = new BufferGeometry();
  return (
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3)),
    geometry.setIndex(indices),
    geometry.computeVertexNormals(),
    geometry
  );
}

/**
 * Per-model dimensions (metres) and side-view profiles. Profiles are [x, y] knots for
 * monotoneCurve, from the rear (smallest x) to the front:
 *   length        overall length (sizes the contact shadow only)
 *   wheelbase     distance between the axles (axles at ±wheelbase / 2)
 *   wheelRadius   tyre radius
 *   trackWidth    distance between left and right wheel centres
 *   tyreWidth     tyre width
 *   chrome        classic trim: chrome bumpers, round lamps, chrome rims; otherwise a modern
 *                 splitter, slim lamps and a rear wing
 *   rearWing      [x, y, span] of the rear wing (modern cars)
 *   sharkFin      engine-cover fin (prototype)
 *   top           y of the body's top edge (bonnet, deck, tail)
 *   sill          y of the body's bottom edge (wheel arches are cut out of it separately)
 *   halfWidth     half width of the body
 *   upperExponent, lowerExponent, tumblehome   cross-section shape, see loftBody
 *   cabin         glasshouse: from x0 to x1, roof profile, beltline y, half-width profile
 */
var VEHICLE_SPECS = {
    classic: {
      length: 4.25,
      wheelbase: 2.4,
      wheelRadius: 0.31,
      trackWidth: 1.34,
      tyreWidth: 0.19,
      chrome: true,
      top: [
        [-2.13, 0.56],
        [-2.05, 0.7],
        [-1.7, 0.8],
        [-1, 0.84],
        [-0.3, 0.86],
        [0.2, 0.84],
        [0.9, 0.8],
        [1.6, 0.74],
        [2, 0.63],
        [2.13, 0.5],
      ],
      sill: [
        [-2.13, 0.44],
        [-2, 0.3],
        [-1.6, 0.22],
        [1.6, 0.22],
        [2, 0.3],
        [2.13, 0.42],
      ],
      halfWidth: [
        [-2.13, 0.5],
        [-2, 0.74],
        [-1.6, 0.81],
        [-1.2, 0.83],
        [0, 0.79],
        [1.2, 0.83],
        [1.7, 0.8],
        [2.05, 0.66],
        [2.13, 0.44],
      ],
      upperExponent: 2.4,
      lowerExponent: 5,
      tumblehome: 0.1,
      cabin: {
        x0: -1.05,
        x1: 0.6,
        roof: [
          [-1.05, 0.84],
          [-0.62, 1.1],
          [-0.15, 1.19],
          [0.2, 1.17],
          [0.6, 0.86],
        ],
        belt: 0.8,
        halfWidth: [
          [-1.05, 0.6],
          [-0.3, 0.67],
          [0.3, 0.67],
          [0.6, 0.62],
        ],
      },
    },
    gt: {
      length: 4.6,
      wheelbase: 2.7,
      wheelRadius: 0.34,
      trackWidth: 1.62,
      tyreWidth: 0.3,
      rearWing: [-2.02, 1.3, 1.8],
      top: [
        [-2.3, 0.78],
        [-2.1, 0.88],
        [-1.5, 0.93],
        [-0.8, 0.9],
        [0, 0.86],
        [0.8, 0.8],
        [1.5, 0.7],
        [2, 0.57],
        [2.3, 0.38],
      ],
      sill: [
        [-2.3, 0.5],
        [-2.15, 0.3],
        [-1.8, 0.13],
        [1.8, 0.13],
        [2.2, 0.15],
        [2.3, 0.2],
      ],
      halfWidth: [
        [-2.3, 0.8],
        [-2, 0.97],
        [-1.35, 1],
        [-0.5, 0.9],
        [0.5, 0.88],
        [1.35, 0.99],
        [2, 0.93],
        [2.3, 0.7],
      ],
      upperExponent: 3,
      lowerExponent: 6,
      tumblehome: 0.16,
      cabin: {
        x0: -1.25,
        x1: 0.78,
        roof: [
          [-1.25, 0.9],
          [-0.7, 1.19],
          [-0.1, 1.24],
          [0.28, 1.2],
          [0.78, 0.84],
        ],
        belt: 0.84,
        halfWidth: [
          [-1.25, 0.6],
          [-0.4, 0.68],
          [0.3, 0.66],
          [0.78, 0.58],
        ],
      },
    },
    proto: {
      length: 4.75,
      wheelbase: 2.9,
      wheelRadius: 0.35,
      trackWidth: 1.64,
      tyreWidth: 0.32,
      rearWing: [-2.2, 1.02, 1.9],
      sharkFin: true,
      top: [
        [-2.37, 0.8],
        [-2.2, 0.92],
        [-1.7, 0.95],
        [-1.2, 0.9],
        [-0.6, 0.82],
        [0, 0.74],
        [0.8, 0.7],
        [1.6, 0.64],
        [2.1, 0.5],
        [2.37, 0.3],
      ],
      sill: [
        [-2.37, 0.5],
        [-2.2, 0.25],
        [-1.8, 0.1],
        [1.9, 0.1],
        [2.37, 0.15],
      ],
      halfWidth: [
        [-2.37, 0.9],
        [-2.1, 1],
        [-1.45, 1],
        [-0.8, 0.9],
        [0, 0.93],
        [0.8, 0.93],
        [1.45, 1],
        [2.1, 0.95],
        [2.37, 0.74],
      ],
      upperExponent: 3.2,
      lowerExponent: 6,
      tumblehome: 0.2,
      cabin: {
        x0: -1.05,
        x1: 0.8,
        roof: [
          [-1.05, 0.8],
          [-0.5, 1.08],
          [0, 1.13],
          [0.4, 1.07],
          [0.8, 0.72],
        ],
        belt: 0.74,
        halfWidth: [
          [-1.05, 0.38],
          [-0.3, 0.5],
          [0.3, 0.5],
          [0.8, 0.36],
        ],
      },
    },
  },
  /** Materials shared by every paddock car (created on first use; the paint is per car). */
  materialCache = {},
  sharedMaterial = (key, create) => materialCache[key] || (materialCache[key] = create());

/** Lazily creates the shared trim materials. Call order fixes their creation order. */
function sharedTrimMaterials(chrome) {
  let glass = sharedMaterial(
      'glass',
      () =>
        new MeshStandardMaterial({ color: 0x2a3640, roughness: 0.05, metalness: 0.85, envMapIntensity: 1.6 }),
    ),
    dark = sharedMaterial(
      'dark',
      () => new MeshStandardMaterial({ color: 0x0c0d0f, roughness: 0.8, side: DoubleSide }),
    ),
    carbon = sharedMaterial(
      'carbon',
      () => new MeshStandardMaterial({ color: 0x1a1c1f, roughness: 0.45, metalness: 0.4 }),
    ),
    chromeMaterial = sharedMaterial(
      'chrome',
      () => new MeshStandardMaterial({ color: 0xe1e5e8, roughness: 0.14, metalness: 1 }),
    ),
    lamp = sharedMaterial(
      'lamp',
      () =>
        new MeshStandardMaterial({
          color: 0xf6f2e6,
          roughness: 0.15,
          metalness: 0.2,
          emissive: 0x6a6455,
          emissiveIntensity: 0.3,
        }),
    ),
    tyre = sharedMaterial('tyre', () => new MeshStandardMaterial({ color: 0x17181a, roughness: 0.92 })),
    rim = chrome
      ? chromeMaterial
      : sharedMaterial(
          'rim',
          () => new MeshStandardMaterial({ color: 0x2a2d31, roughness: 0.32, metalness: 0.85 }),
        );
  return { glass, dark, carbon, chrome: chromeMaterial, lamp, tyre, rim };
}

function buildVehicle(kind, paintColor) {
  let spec = VEHICLE_SPECS[kind],
    car = new Group(),
    paint = new MeshPhysicalMaterial({
      color: paintColor,
      roughness: 0.32,
      metalness: spec.chrome ? 0.2 : 0.35,
      clearcoat: 0.8,
      clearcoatRoughness: 0.14,
    }),
    materials = sharedTrimMaterials(spec.chrome),
    axleXs = [spec.wheelbase / 2, -spec.wheelbase / 2],
    archRadius = spec.wheelRadius + 0.07,
    topAt = monotoneCurve(spec.top),
    sillAt = monotoneCurve(spec.sill),
    halfWidthAt = monotoneCurve(spec.halfWidth),
    // Lowest allowed body bottom over the wheels: the top of the wheel-arch circle (slightly
    // flattened), or -1 away from the axles.
    archTopAt = (x) => {
      let archTop = -1;
      for (let axleX of axleXs) {
        let dx = Math.abs(x - axleX);
        dx < archRadius &&
          (archTop = Math.max(
            archTop,
            spec.wheelRadius + Math.sqrt(archRadius * archRadius - dx * dx) * 0.97,
          ));
      }
      return archTop;
    };

  // Main body shell, painted.
  let bodyGeometry = loftBody(
      spec.top[0][0],
      spec.top[spec.top.length - 1][0],
      (x) => ({
        top: topAt(x),
        bottom: Math.min(topAt(x) - 0.08, Math.max(sillAt(x), archTopAt(x))),
        halfWidth: halfWidthAt(x),
        upperExponent: spec.upperExponent,
        lowerExponent: spec.lowerExponent,
        tumblehome: spec.tumblehome,
      }),
      90,
      40,
    ),
    body = new Mesh(bodyGeometry, paint);
  ((body.castShadow = true), (body.receiveShadow = true), car.add(body));

  // Glasshouse from the beltline up.
  let cabin = spec.cabin,
    roofAt = monotoneCurve(cabin.roof),
    cabinHalfWidthAt = monotoneCurve(cabin.halfWidth),
    glassGeometry = loftBody(
      cabin.x0,
      cabin.x1,
      (x) => ({
        top: roofAt(x),
        bottom: cabin.belt - 0.03,
        halfWidth: cabinHalfWidthAt(x),
        upperExponent: 2.3,
        lowerExponent: 8,
        tumblehome: 0.1,
      }),
      40,
      32,
    ),
    glass = new Mesh(glassGeometry, materials.glass);
  ((glass.castShadow = true), car.add(glass));

  // Painted roof skin over the middle of the glasshouse (17 %..76 % of its length), tapering
  // over 0.12 m at both ends so the windscreen and rear window stay glass.
  let roofStart = cabin.x0 + (cabin.x1 - cabin.x0) * 0.17,
    roofEnd = cabin.x0 + (cabin.x1 - cabin.x0) * 0.76,
    roofGeometry = loftBody(
      roofStart,
      roofEnd,
      (x) => {
        let taper = Math.min(1, Math.min(x - roofStart, roofEnd - x) / 0.12);
        return {
          top: roofAt(x) + 0.012,
          bottom: roofAt(x) - 0.03 - 0.05 * taper,
          halfWidth: cabinHalfWidthAt(x) * (0.84 + 0.14 * taper),
          upperExponent: 2.6,
          lowerExponent: 3,
          tumblehome: 0.1,
        };
      },
      24,
      24,
    ),
    roof = new Mesh(roofGeometry, paint);
  ((roof.castShadow = true), car.add(roof));

  addWheels(car, spec, materials, axleXs, archRadius);
  let frontX = spec.top[spec.top.length - 1][0],
    rearX = spec.top[0][0];
  if (spec.chrome) addClassicTrim(car, materials, frontX, rearX);
  else addModernAero(car, spec, paint, materials, frontX, topAt);
  mergeStaticMeshes(car);

  // Contact shadow decal under the whole car.
  let contactShadow = new Mesh(
    new PlaneGeometry(spec.length * 1.2, (spec.trackWidth + 0.7) * 1.25),
    contactShadowMaterial(),
  );
  return (
    (contactShadow.rotation.x = -Math.PI / 2),
    (contactShadow.position.y = 0.055),
    (contactShadow.renderOrder = 1),
    car.add(contactShadow),
    car
  );
}

/** Per axle: a dark half-cylinder arch liner, then left and right wheels (tyre, rim, hub). */
function addWheels(car, spec, materials, axleXs, archRadius) {
  for (let axleX of axleXs) {
    // Open half cylinder (theta 90°..270°, the upper half once rotated) spanning both wheels.
    let archLiner = new Mesh(
      new CylinderGeometry(
        archRadius * 0.98,
        archRadius * 0.98,
        spec.trackWidth + spec.tyreWidth - 0.05,
        24,
        1,
        true,
        Math.PI * 0.5,
        Math.PI,
      ),
      materials.dark,
    );
    ((archLiner.rotation.x = Math.PI / 2),
      archLiner.position.set(axleX, spec.wheelRadius, 0),
      car.add(archLiner));
    for (let side of [-1, 1]) {
      let wheel = new Group();
      (wheel.position.set(axleX, spec.wheelRadius, (side * spec.trackWidth) / 2), car.add(wheel));
      // Cylinders are built along y; rotation.x = 90° turns the axle across the car (z).
      let tyre = new Mesh(
        new CylinderGeometry(spec.wheelRadius, spec.wheelRadius, spec.tyreWidth, 28),
        materials.tyre,
      );
      ((tyre.rotation.x = Math.PI / 2), (tyre.castShadow = true), wheel.add(tyre));
      let rim = new Mesh(
        new CylinderGeometry(spec.wheelRadius * 0.68, spec.wheelRadius * 0.68, spec.tyreWidth + 0.012, 24),
        materials.rim,
      );
      ((rim.rotation.x = Math.PI / 2), wheel.add(rim));
      let hub = new Mesh(
        new CylinderGeometry(spec.wheelRadius * 0.22, spec.wheelRadius * 0.26, spec.tyreWidth + 0.03, 16),
        spec.chrome ? materials.chrome : materials.dark, // chrome hub caps on the classics, dark centre locks on the racers
      );
      ((hub.rotation.x = Math.PI / 2), wheel.add(hub));
    }
  }
}

/** Classic trim: chrome bumpers, round headlamps with chrome bezels and a dark grille. */
function addClassicTrim(car, materials, frontX, rearX) {
  // Bumpers: [x, y, length across the car].
  for (let [x, y, span] of [
    [frontX - 0.02, 0.4, 1.36],
    [rearX + 0.02, 0.44, 1.3],
  ]) {
    let bumper = new Mesh(new CapsuleGeometry(0.045, span, 4, 10), materials.chrome);
    ((bumper.rotation.x = Math.PI / 2),
      bumper.position.set(x, y, 0),
      (bumper.castShadow = true),
      car.add(bumper));
  }
  for (let side of [-1, 1]) {
    // Half sphere (phi 0..180°) turned to face forward.
    let lamp = new Mesh(new SphereGeometry(0.085, 18, 12, 0, Math.PI), materials.lamp);
    ((lamp.rotation.y = Math.PI / 2), lamp.position.set(frontX - 0.14, 0.6, side * 0.52), car.add(lamp));
    let bezel = new Mesh(new TorusGeometry(0.088, 0.012, 6, 22), materials.chrome);
    ((bezel.rotation.y = Math.PI / 2), bezel.position.set(frontX - 0.13, 0.6, side * 0.52), car.add(bezel));
  }
  let grille = new Mesh(new CapsuleGeometry(0.07, 0.36, 4, 10), materials.dark);
  ((grille.rotation.x = Math.PI / 2), grille.position.set(frontX - 0.03, 0.5, 0), car.add(grille));
}

/** Modern aero: carbon splitter, slim headlamps, rear wing on two pylons, optional shark fin. */
function addModernAero(car, spec, paint, materials, frontX, topAt) {
  let splitter = new Mesh(new BoxGeometry(0.5, 0.025, 1.9), materials.carbon);
  (splitter.position.set(frontX - 0.22, 0.1, 0), car.add(splitter));
  for (let side of [-1, 1]) {
    let lamp = new Mesh(new BoxGeometry(0.18, 0.035, 0.36), materials.lamp);
    (lamp.position.set(frontX - 0.32, topAt(frontX - 0.32) - 0.04, side * 0.62),
      (lamp.rotation.z = -0.35),
      car.add(lamp));
  }
  let [wingX, wingY, wingSpan] = spec.rearWing,
    wing = new Mesh(new BoxGeometry(0.36, 0.03, wingSpan), materials.carbon);
  (wing.position.set(wingX, wingY, 0), (wing.rotation.z = 0.08), (wing.castShadow = true), car.add(wing));
  for (let side of [-1, 1]) {
    let endplate = new Mesh(new BoxGeometry(0.44, 0.22, 0.015), materials.carbon);
    (endplate.position.set(wingX, wingY - 0.05, (side * wingSpan) / 2), car.add(endplate));
    // Pylon from the deck (topAt(wingX)) up to the wing.
    let pylon = new Mesh(new BoxGeometry(0.05, wingY - topAt(wingX) + 0.05, 0.02), materials.carbon);
    (pylon.position.set(wingX + 0.06, (wingY + topAt(wingX)) / 2, side * 0.38), car.add(pylon));
  }
  if (spec.sharkFin) {
    let fin = new Mesh(new BoxGeometry(1.1, 0.26, 0.018), paint);
    (fin.position.set(-1.55, topAt(-1.55) + 0.11, 0), car.add(fin));
  }
}

/**
 * @param {'classic'|'gt'|'proto'} [kind='gt'] model; unknown kinds fall back to 'gt'
 * @param {number} [paintColor=0xf5f3ee] body colour (sRGB hex)
 * @returns {Group} car standing on y = 0, facing +x
 */
function buildPaddockCar(kind = 'gt', paintColor = 0xf5f3ee) {
  return buildVehicle(VEHICLE_SPECS[kind] ? kind : 'gt', paintColor);
}

export { buildPaddockCar };
