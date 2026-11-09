// Extras around the hero car: the pit crew at the open pit box (stage 2), the paddock cars and the
// paddock visitors (stage 4). Positions are metres in the world XZ plane, y up; yaw is rotation.y.
//
// The crew (docs/references.md §4.8: dark team polos with a red shoulder band, grey work trousers,
// caps and headsets; the engineer in a white polo) is placed once, around the car's pit-box stop in
// the car's frame (forward along the pit lane, right towards the garages): two wheel gunners kneeling
// at the left wheels with their guns on the hubs, the front-jack man ahead of the nose, the board
// man, a tyre carrier, the driver's helper with the helmet, the engineer with a tablet at the garage
// door and a mechanic inside the garage. Small motions (gun arms, heads turning) keep them alive; a
// head or an arm that moves is listed in its person's `moving` (people.js), the rest is one body mesh.
// The whole crew fades in and out with a dither (people.js) instead of popping; so do the visitors.
// Everyone stands ON the surface under them (layers.js): the crew in the pit lane at LAYERS.pitLane,
// the engineer and the mechanic on the garage floor (openBox.floorY, pits.js), the visitors and the
// paddock cars on the paddock asphalt (LAYERS.paddock).
//
// Construction order matters for pixel parity (three.js sorts opaque draws by material id, which
// is assigned at construction), so these builders run in exactly the original order.
// Per-frame updates allocate nothing.
import { Vector3 } from 'three';
import { buildPerson, createPeopleMaterials } from './people.js';
import { clamp, smoothstep } from './util/math.js';
import { freezeMatrices } from './util/static-merge.js';
import { buildPaddockCar } from './vehicles.js';
import { LAYERS } from './world/layers.js';

const UP = new Vector3(0, 1, 0);

/** Paddock cars as [kind, colour, x, z, yaw]; the first five line up beside the paddock stop. */
const PADDOCK_CARS = [
  ['classic', 11740702, -7.3, 121.3, 0.02],
  ['classic', 3038539, -7.5, 118.1, -0.03],
  ['classic', 15788760, -7.2, 114.9, 0.01],
  ['gt', 1842721, -7.4, 111.7, -0.02],
  ['classic', 9414584, -7.3, 108.5, 0.03],
  ['proto', 15282981, -41, 141.5, 0.02],
  ['gt', 10200234, -58, 141, 0],
  ['proto', 2833493, -64, 120, Math.PI],
  ['classic', 9071422, -74, 126, 1.5],
  ['gt', 16118766, 26, 108, Math.PI - 0.05],
];

/**
 * Pit crew: [name, buildPerson options, place]. place = { f, r, face } in the car's frame at the
 * stop (metres forward / right of the car's centre; face = 'car' turns them towards the car's
 * centre, 'right' / 'left' along ±right, plus an optional yaw offset), or { garage: [dx, dz], face }
 * relative to the open garage's front centre.
 */
const CREW = [
  [
    'gunnerFront',
    { pose: 'kneel', head: 'cap', moving: ['armR'], skin: 0xc79b7c },
    { f: 1.35, r: -1.5, face: 'right' },
  ],
  [
    'gunnerRear',
    { pose: 'kneel', head: 'hair', moving: ['armR'], skin: 0x8d5b3e },
    { f: -1.3, r: -1.5, face: 'right' },
  ],
  ['jack', { pose: 'jack', head: 'cap', skin: 0xd2a98a }, { f: 3.95, r: 0, face: 'car' }],
  [
    'board',
    { pose: 'board', head: 'headset', moving: ['head'], skin: 0xb58566 },
    { f: 3.4, r: 1.3, face: 'car', yaw: 0.3 },
  ],
  ['tyre', { pose: 'tyre', head: 'cap', skin: 0xe0b896 }, { f: -2.9, r: -2.5, face: 'car', yaw: -0.4 }],
  [
    'helmet',
    { pose: 'carryHelmet', head: 'hair', moving: ['head'], skin: 0xb98a6c, hair: 0x6b4a2e },
    { f: -3.6, r: 1.6, face: 'left', yaw: 0.4 },
  ],
  [
    'engineer',
    { kit: 'engineer', pose: 'tablet', head: 'headset', moving: ['head'], skin: 0xc99f80 },
    { garage: [1.9, -1.4], face: 'car' },
  ],
  [
    'mechanic',
    { pose: 'armsCrossed', head: 'cap', skin: 0xa8765a },
    { garage: [-1.6, -6.5], face: 'car', yaw: 0.25 },
  ],
];

/** The pit crew (not yet added to the scene): { members, byName, materials, placed }. */
function createPitCrew() {
  const materials = createPeopleMaterials();
  const byName = {};
  const members = CREW.map(([name, options]) => (byName[name] = buildPerson({ ...options, materials })));
  return { members, byName, materials, placed: false };
}

function placePaddockCars(scene) {
  for (const [kind, colour, x, z, yaw] of PADDOCK_CARS) {
    const car = buildPaddockCar(kind, colour);
    car.position.set(x, LAYERS.paddock, z);
    car.rotation.y = yaw;
    scene.add(car);
    freezeMatrices(car); // parked: three.js no longer recomposes its matrices every frame
  }
}

/** Builds and places the paddock visitors; returns them as [person, x, z, yaw]. */
function placePaddockVisitors(scene) {
  const materials = createPeopleMaterials();
  const casual = (top, legs, shoes = 0x2b2b2b) => ({ top, accent: top, legs, shoes, hat: 0x2b3440 });
  const visitors = [
    [
      buildPerson({ kit: casual(0x3a4f6b, 0x34404f), skin: 0xd1a383, moving: ['head'], materials }),
      -3.7,
      119.9,
      Math.PI + 0.25,
    ],
    [
      buildPerson({
        kit: casual(0xe6e1d6, 0xb3a58a, 0x6b5a48),
        skin: 0x9c6b4e,
        pose: 'point',
        head: 'cap',
        materials,
      }),
      -3.3,
      118.8,
      Math.PI - 0.5,
    ],
    [
      buildPerson({ kit: casual(0x6b5d4a, 0x2b2b2b), skin: 0xc79b7c, pose: 'armsCrossed', materials }),
      -11.8,
      113.6,
      0.3,
    ],
    [
      buildPerson({ kit: 'marshal', skin: 0xb98a6c, pose: 'idle', head: 'cap', moving: ['head'], materials }),
      -18.5,
      130.2,
      -0.6,
    ],
  ];
  for (const [person, x, z, yaw] of visitors) {
    person.position.set(x, LAYERS.paddock, z);
    person.rotation.y = yaw;
    person.userData.group = materials;
    scene.add(person);
  }
  return visitors;
}

// scratch vectors (no per-frame allocations)
const stop = new Vector3();
const forward = new Vector3();
const right = new Vector3();
const toCar = new Vector3();

/** Yaw that turns a person's local +x onto the world direction (dx, dz). */
const yawTowards = (dx, dz) => Math.atan2(-dz, dx);

/**
 * Places the crew once around the car's pit-box stop (`pitBoxDistance` along the car path, from the
 * path sampler) and the open garage (`openBox` { x, z }).
 */
function placeCrew(crew, sampler, pitBoxDistance, openBox) {
  const at = sampler.sample(pitBoxDistance);
  stop.copy(at.p);
  forward.set(at.t.x, 0, at.t.z).normalize();
  right.crossVectors(forward, UP);
  CREW.forEach(([name, , place]) => {
    const person = crew.byName[name];
    if (place.garage)
      person.position.set(openBox.x + place.garage[0], openBox.floorY ?? 0, openBox.z + place.garage[1]);
    else
      person.position
        .copy(stop)
        .addScaledVector(forward, place.f)
        .addScaledVector(right, place.r)
        .setY(LAYERS.pitLane);
    if (place.face === 'car') toCar.subVectors(stop, person.position).setY(0);
    else toCar.copy(right).multiplyScalar(place.face === 'left' ? -1 : 1);
    person.rotation.y = yawTowards(toCar.x, toCar.z) + (place.yaw || 0);
    person.userData.baseYaw = person.rotation.y;
  });
  crew.placed = true;
}

/**
 * Animates the pit crew; it fades in and out around progress 0.26 (fully shown within ±0.06,
 * gone beyond ±0.16). Overwrites the path sampler's shared point/tangent (first call only).
 */
function updatePitCrew(crew, progress, clock, sampler, pitBoxDistance, openBox) {
  const presence = 1 - smoothstep(clamp(Math.abs(progress - 0.26) / 0.1 - 0.6, 0, 1));
  const shown = presence > 0.002;
  for (let k = 0; k < crew.members.length; k++) crew.members[k].visible = shown;
  crew.materials.setFade(presence);
  if (!shown) return;
  if (!crew.placed) placeCrew(crew, sampler, pitBoxDistance, openBox);
  const { gunnerFront, gunnerRear, helmet, engineer, board } = crew.byName;
  // wheel guns bounce on the nuts; heads turn a little
  gunnerFront.userData.armR.rotation.z = Math.sin(clock * 2.4) * 0.08;
  gunnerRear.userData.armR.rotation.z = Math.sin(clock * 2.1 + 1.3) * 0.07;
  helmet.userData.head.rotation.y = Math.sin(clock * 0.7) * 0.25;
  engineer.userData.head.rotation.y = -0.15 + Math.sin(clock * 0.45) * 0.2;
  board.userData.head.rotation.y = Math.sin(clock * 0.9 + 0.5) * 0.12;
}

/**
 * Paddock visitors fade in over progress 0.6–0.64 and out over 0.84–0.87; the first one looks
 * around, the marshal turns slowly.
 */
function updatePaddockVisitors(visitors, progress, clock) {
  const presence =
    smoothstep(clamp((progress - 0.6) / 0.04, 0, 1)) *
    (1 - smoothstep(clamp((progress - 0.84) / 0.03, 0, 1)));
  const shown = presence > 0.002;
  for (let k = 0; k < visitors.length; k++) visitors[k][0].visible = shown;
  if (!visitors.length) return;
  visitors[0][0].userData.group.setFade(presence);
  if (!shown) return;
  visitors[0][0].userData.head.rotation.y = Math.sin(clock * 0.5) * 0.2;
  visitors[3][0].userData.head.rotation.y = Math.sin(clock * 0.3) * 0.5;
}

export {
  CREW,
  PADDOCK_CARS,
  createPitCrew,
  placePaddockCars,
  placePaddockVisitors,
  updatePaddockVisitors,
  updatePitCrew,
};
