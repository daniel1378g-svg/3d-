// Extras around the hero car: the pit crew at the open pit box (stage 2), the paddock cars and the
// paddock visitors (stage 4). Positions are metres in the world XZ plane, y up; yaw is rotation.y.
//
// Construction order matters for pixel parity (three.js sorts opaque draws by material id, which
// is assigned at construction), so these builders run in exactly the original order.
import { Vector3 } from 'three';
import { buildPerson } from './people.js';
import { clamp, smoothstep } from './util/math.js';
import { buildPaddockCar } from './vehicles.js';

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

/** The three pit-crew members (not yet added to the scene). */
function createPitCrew() {
  const kneeling = buildPerson({ suit: 2830390, trim: 15282981, pose: 'kneel' });
  const helmetCarrier = buildPerson({ suit: 16118766, trim: 15282981, skin: 12159595, pose: 'carryHelmet' });
  const engineer = buildPerson({ suit: 2830390, trim: 10200234, pose: 'stand' });
  return { kneeling, helmetCarrier, engineer, members: [kneeling, helmetCarrier, engineer] };
}

function placePaddockCars(scene) {
  for (const [kind, colour, x, z, yaw] of PADDOCK_CARS) {
    const car = buildPaddockCar(kind, colour);
    car.position.set(x, 0, z);
    car.rotation.y = yaw;
    scene.add(car);
  }
}

/** Builds and places the paddock visitors; returns them as [person, x, z, yaw]. */
function placePaddockVisitors(scene) {
  const visitors = [
    [buildPerson({ suit: 3817544, trim: 16118766, skin: 13738883 }), -3.7, 119.9, Math.PI + 0.25],
    [buildPerson({ suit: 15131612, trim: 6648666, skin: 10251086 }), -3.3, 118.8, Math.PI - 0.5],
    [buildPerson({ suit: 6648666, trim: 1842721, skin: 13081468 }), -11.8, 113.6, 0.3],
  ];
  for (const [person, x, z, yaw] of visitors) {
    person.position.set(x, 0, z);
    person.rotation.y = yaw;
    scene.add(person);
  }
  return visitors;
}

/**
 * Places the pit crew around the car's pit-box stop (`pitBoxDistance` along the car path) and
 * animates them; they are shown while progress is within ±0.16 of 0.26. `openBox` ({ x, z }) is
 * the open garage from the world builder. Overwrites the path sampler's shared point/tangent.
 */
function updatePitCrew(crew, progress, clock, sampler, pitBoxDistance, openBox) {
  const { kneeling, helmetCarrier, engineer } = crew;
  // only used as an on/off threshold: the crew pops in and out, it does not fade
  const presence = 1 - smoothstep(clamp(Math.abs(progress - 0.26) / 0.1 - 0.6, 0, 1));
  for (const member of crew.members) member.visible = presence > 0.01;
  if (!(presence > 0.01)) return;

  const at = sampler.sample(pitBoxDistance);
  const box = at.p.clone(); // where the car stops
  const tangent = at.t;
  const forward = new Vector3(tangent.x, 0, tangent.z).normalize(); // along the pit lane
  const right = new Vector3().crossVectors(forward, UP);

  // ahead of the car on its left, working the wheel gun
  kneeling.position.copy(box).addScaledVector(forward, 1.3).addScaledVector(right, -1.55);
  kneeling.rotation.y = Math.atan2(-right.z, right.x); // turns local +X onto `right`
  kneeling.userData.armR.rotation.z = 0.9 + Math.sin(clock * 2.4) * 0.12;

  // behind the car on its right, carrying the helmet; turns local +X onto -right, plus 0.4 rad
  helmetCarrier.position.copy(box).addScaledVector(forward, -3.6).addScaledVector(right, 1.6);
  helmetCarrier.rotation.y = Math.atan2(-(-right.z), -right.x) + 0.4;
  helmetCarrier.userData.head.rotation.y = Math.sin(clock * 0.7) * 0.15;

  // in front of the open garage, turned towards the car
  engineer.position.set(openBox.x + 1.85, 0, openBox.z - 7);
  engineer.rotation.y = Math.atan2(-(box.z - engineer.position.z), box.x - engineer.position.x);
}

/** Paddock visitors are shown only while progress is in (0.6, 0.87); the first one looks around. */
function updatePaddockVisitors(visitors, progress, clock) {
  const shown = progress > 0.6 && progress < 0.87;
  for (const [person] of visitors) person.visible = shown;
  if (shown) visitors[0][0].userData.head.rotation.y = Math.sin(clock * 0.5) * 0.2;
}

export {
  PADDOCK_CARS,
  createPitCrew,
  placePaddockCars,
  placePaddockVisitors,
  updatePaddockVisitors,
  updatePitCrew,
};
