// Low-poly pit crew and visitors.
//
// A person is ~1.8 m tall, stands on y = 0 and faces +x (toes, kneeling leg and raised arms point
// to +x), with +z on their right-hand side — the same frame as the cars (+x forward, y up,
// +z right). Built from capsules and spheres; every part casts shadows and a soft contact-shadow
// decal sits under the feet.
import {
  BoxGeometry,
  CapsuleGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  SphereGeometry,
  TorusGeometry,
} from 'three';
import { roundedShadowTexture } from './textures.js';

var sharedContactShadowMaterial = null,
  /**
   * Shared soft rounded-rectangle shadow decal material for people and paddock cars, created on
   * first use. Drawn without depth writes and pulled towards the camera with polygonOffset so it
   * never z-fights the ground.
   */
  contactShadowMaterial = () =>
    sharedContactShadowMaterial ||
    (sharedContactShadowMaterial = new MeshBasicMaterial({
      map: roundedShadowTexture(256, 128, { alpha: 0.75 }),
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    })),
  /** Shadow-casting capsule along y, centred on its origin (total height = length + 2 * radius). */
  capsule = (radius, length, material) => {
    let mesh = new Mesh(new CapsuleGeometry(radius, length, 6, 12), material);
    return ((mesh.castShadow = true), mesh);
  };

/** Helmet colours: white shell, dark visor, red stripe. */
var HELMET_SHELL = 0xf5f3ee,
  HELMET_VISOR = 0x1c1e21,
  HELMET_STRIPE = 0xe93325;

/**
 * Adds a racing helmet (shell, visor band, stripe over the top) to `parent`, centred on its
 * origin. Three new materials per call (helmets are rare).
 * NOTE: the visor band is centred on -x (SphereGeometry's phi = 0), i.e. at the back of a person
 * facing +x.
 */
function addHelmet(parent, visorRadius) {
  let shell = new Mesh(
    new SphereGeometry(0.15, 20, 16),
    new MeshStandardMaterial({ color: HELMET_SHELL, roughness: 0.25, metalness: 0.1 }),
  );
  ((shell.castShadow = true), parent.add(shell));
  // Partial sphere: phi -0.9..0.9 around y, theta 1.25..1.75 (a band just below the equator).
  let visor = new Mesh(
    new SphereGeometry(visorRadius, 20, 10, -0.9, 1.8, 1.25, 0.5),
    new MeshStandardMaterial({ color: HELMET_VISOR, roughness: 0.1, metalness: 0.6 }),
  );
  parent.add(visor);
  // Half torus in the XY plane, turned to run ear to ear over the crown.
  let stripe = new Mesh(
    new TorusGeometry(0.12, 0.012, 6, 24, Math.PI),
    new MeshStandardMaterial({ color: HELMET_STRIPE, roughness: 0.5 }),
  );
  ((stripe.rotation.y = Math.PI / 2), (stripe.position.y = 0.03), parent.add(stripe));
}

/**
 * Bare head with short hair and a cap brim.
 * NOTE: the brim wedge (CylinderGeometry theta -1.2..1.2) is centred on +z, i.e. it points to the
 * person's right rather than forward.
 */
function addBareHead(head, skinMaterial, trimMaterial) {
  let face = new Mesh(new SphereGeometry(0.12, 18, 14), skinMaterial);
  ((face.castShadow = true), head.add(face));
  // Hair: top cap of a sphere (theta 0..1.3).
  let hair = new Mesh(new SphereGeometry(0.125, 18, 8, 0, Math.PI * 2, 0, 1.3), trimMaterial);
  ((hair.position.y = 0.02), head.add(hair));
  let brim = new Mesh(new CylinderGeometry(0.08, 0.08, 0.015, 16, 1, false, -1.2, 2.4), trimMaterial);
  (brim.position.set(0.08, 0.02, 0), head.add(brim));
}

/**
 * A limb that pivots at its group origin (shoulder / hip joint) with the capsule hanging below,
 * so rotating the returned group swings the whole limb.
 */
function pivotedLimb(radius, length, material) {
  let pivot = new Group(),
    mesh = capsule(radius, length, material);
  return ((mesh.position.y = -length / 2 - radius), pivot.add(mesh), pivot);
}

/**
 * @param {object} [options]
 * @param {number} [options.suit=0xe93325] overall / torso, arm and leg colour
 * @param {number} [options.trim=0x1c1e21] belt, boots and hair colour
 * @param {number} [options.skin=0xc79b7c] skin colour (head, hands)
 * @param {boolean} [options.helmet=false] wear a racing helmet instead of the bare head
 * @param {'stand'|'kneel'|'helmet'|'carryHelmet'} [options.pose='stand'] static pose:
 *   'kneel' one knee down, 'helmet' both hands raised to the head, 'carryHelmet' a helmet held
 *   in the right-side arm (armR); anything else is a relaxed stand
 * @returns {Group} root on the ground; userData { hip, armL, armR, head } are the animatable
 *   groups. NOTE: armL sits at +z, which is the person's right-hand side in this frame.
 */
function buildPerson({
  suit = 0xe93325,
  trim = 0x1c1e21,
  skin = 0xc79b7c,
  helmet = false,
  pose = 'stand',
} = {}) {
  let root = new Group(),
    suitMaterial = new MeshStandardMaterial({ color: suit, roughness: 0.7 }),
    trimMaterial = new MeshStandardMaterial({ color: trim, roughness: 0.8 }),
    skinMaterial = new MeshStandardMaterial({ color: skin, roughness: 0.8 }),
    // Everything above the ground hangs off the hip group (y = 0.97 standing).
    hip = new Group();
  root.add(hip);
  let torso = capsule(0.17, 0.42, suitMaterial);
  ((torso.position.y = 0.32), hip.add(torso));
  let belt = new Mesh(new CylinderGeometry(0.175, 0.175, 0.07, 16), trimMaterial);
  ((belt.position.y = 0.06), hip.add(belt));
  let head = new Group();
  if (((head.position.y = 0.78), hip.add(head), helmet)) addHelmet(head, 0.151);
  else addBareHead(head, skinMaterial, trimMaterial);

  // Arms: shoulders 0.58 m above the hip, ±0.22 m to the sides; a hand at the end of each.
  let armL = pivotedLimb(0.055, 0.5, suitMaterial),
    armR = pivotedLimb(0.055, 0.5, suitMaterial);
  (armL.position.set(0, 0.58, 0.22), armR.position.set(0, 0.58, -0.22), hip.add(armL, armR));
  for (let arm of [armL, armR]) {
    let hand = new Mesh(new SphereGeometry(0.05, 10, 8), skinMaterial);
    ((hand.position.y = -0.68), arm.add(hand));
  }

  // Legs: hip joints ±0.1 m apart; boots point to +x.
  let legL = pivotedLimb(0.075, 0.7, suitMaterial),
    legR = pivotedLimb(0.075, 0.7, suitMaterial);
  (legL.position.set(0, 0, 0.1), legR.position.set(0, 0, -0.1), hip.add(legL, legR));
  for (let leg of [legL, legR]) {
    let boot = new Mesh(new BoxGeometry(0.24, 0.08, 0.1), trimMaterial);
    (boot.position.set(0.05, -0.9, 0), leg.add(boot));
  }

  // Pose (radians; rotation.z swings a limb forward/back in the XY plane).
  if (((hip.position.y = 0.97), pose === 'kneel'))
    ((hip.position.y = 0.55),
      (hip.rotation.z = -0.25),
      (legL.rotation.z = 1.45),
      (legR.rotation.z = 0.2),
      (legR.position.x = -0.05),
      (armL.rotation.z = 1.1),
      (armR.rotation.z = 0.9),
      (armR.rotation.x = 0.2));
  else if (pose === 'helmet')
    ((armL.rotation.z = 2.3), (armR.rotation.z = 2.3), (armL.rotation.x = -0.35), (armR.rotation.x = 0.35));
  else if (pose === 'carryHelmet') {
    ((armR.rotation.z = 0.55), (armR.rotation.x = 0.12), (armL.rotation.x = -0.08));
    let carriedHelmet = new Group();
    addHelmet(carriedHelmet, 0.152);
    (carriedHelmet.position.set(0.1, -0.78, 0), (carriedHelmet.rotation.z = -0.5), armR.add(carriedHelmet));
  } else ((armL.rotation.x = -0.1), (armR.rotation.x = 0.1));

  // Contact shadow decal, 1.1 m square, just above the ground.
  let contactShadow = new Mesh(new PlaneGeometry(1.1, 1.1), contactShadowMaterial());
  return (
    (contactShadow.rotation.x = -Math.PI / 2),
    (contactShadow.position.y = 0.055),
    (contactShadow.renderOrder = 1),
    root.add(contactShadow),
    (root.userData = { hip, armL, armR, head }),
    root
  );
}

export { buildPerson, contactShadowMaterial };
