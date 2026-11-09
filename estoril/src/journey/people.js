// Low-poly pit crew, officials and paddock visitors (docs/references.md §4.8).
//
// Frame: a person is ~1.78 m tall, stands on y = 0 and faces +x; +z is their RIGHT-hand side and
// -z their left (the same frame as the cars: +x forward, y up, +z right). So armL hangs at -z,
// armR at +z, the visor and the cap brim point to +x.
//
// Each person is built from capsules, spheres and boxes posed on a small skeleton (hips, knees,
// shoulders, elbows), then BAKED: every part is transformed into its frame and merged, with its
// colour in a vertex attribute, into one geometry per moving piece:
//   body  everything that does not move on its own (torso, legs, the arms of most poses, props)
//   head  the head and what is on it (hair or cap with brim, helmet with visor, headset); it turns
//   armL / armR  only for the arms named in `moving` (e.g. a wheel gun that bounces)
// so a person costs 2–3 draws. All the people of a group share one material (vertex colours) whose
// `envFade` uniform fades the whole group in and out with a screen-space dither (shadows included,
// through a matching depth material), instead of popping. Contact shadow: one soft decal each
// (one shared plane), with the group's own decal material (its opacity follows the fade).
//
// Poses give the arm angles directly, or (`reach`) the points the hands must hold, solved by a
// two-bone arm IK (reachAngles): the front-jack man's hands are on the T-bar of a handle that runs
// down to the jack's socket, the tyre carrier holds a mounted tyre by its tread at waist height.
// userData.props lists, per held prop, the points that must touch (scripts/test-environment.mjs).
import {
  BoxGeometry,
  CapsuleGeometry,
  Color,
  CylinderGeometry,
  Float32BufferAttribute,
  Group,
  LatheGeometry,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshDepthMaterial,
  MeshStandardMaterial,
  Object3D,
  PlaneGeometry,
  RGBADepthPacking,
  SphereGeometry,
  TorusGeometry,
  Vector2,
  Vector3,
} from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { roundedShadowTexture } from './textures.js';

let sharedContactShadowMaterial = null;
/**
 * Shared soft rounded-rectangle shadow decal material for the paddock cars, created on first use.
 * Drawn without depth writes and pulled towards the camera with polygonOffset so it never z-fights
 * the ground.
 */
const contactShadowMaterial = () =>
  sharedContactShadowMaterial ||
  (sharedContactShadowMaterial = new MeshBasicMaterial({
    map: roundedShadowTexture(256, 128, { alpha: 0.75 }),
    transparent: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  }));

/** Interleaved-gradient noise on the pixel position, as used by the vegetation LOD dither. */
const DITHER = 'fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))))';

/** Adds the group fade (discard where the dither is above envFade) to a material's fragment shader. */
function addFade(material, fade, key) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.envFade = fade;
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform float envFade;')
      .replace(
        '#include <clipping_planes_fragment>',
        `#include <clipping_planes_fragment>\nif (${DITHER} >= envFade) discard;`,
      );
  };
  material.customProgramCacheKey = () => key;
  return material;
}

/**
 * The shared materials of a group of people: body (vertex colours), shadow depth (same fade) and
 * the contact-shadow decal; `fade` is the group's uniform { value: 0..1 }.
 */
function createPeopleMaterials() {
  const fade = { value: 1 };
  const body = addFade(
    new MeshStandardMaterial({ vertexColors: true, roughness: 0.78 }),
    fade,
    'people-body',
  );
  const depth = addFade(new MeshDepthMaterial({ depthPacking: RGBADepthPacking }), fade, 'people-depth');
  const contact = new MeshBasicMaterial({
    map: contactShadowMaterial().map,
    transparent: true,
    depthWrite: false,
    opacity: 1,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
  return {
    body,
    depth,
    contact,
    fade,
    /** Sets the group's visibility 0..1 (dithered bodies, fading decals). */
    setFade(value) {
      fade.value = value;
      contact.opacity = value;
    },
  };
}

/** Team kits and casual clothes (sRGB hex). */
const KITS = {
  // team mechanics: dark polo with a red shoulder band, grey work trousers, black shoes, dark cap
  crew: { top: 0x1d2127, accent: 0xe93325, legs: 0x50555c, shoes: 0x141518, hat: 0x1d2127 },
  // engineer / team manager: the same kit, a white polo
  engineer: { top: 0xeceae4, accent: 0xe93325, legs: 0x2e3238, shoes: 0x141518, hat: 0x1d2127 },
  // marshal: orange overalls with silver reflective bands
  marshal: { top: 0xe86a1f, accent: 0xc8ccd0, legs: 0xe86a1f, shoes: 0x2a2a2a, hat: 0xe86a1f },
};

const UP_AXIS_ROTATION = Math.PI / 2;

/** Collects posed parts (geometry + colour) and merges them, relative to a frame object. */
function createBaker() {
  const parts = new Map(); // frame Object3D → [{ geometry, matrixWorld, colour }]
  const color = new Color();
  return {
    add(frame, geometry, node, colour) {
      if (!parts.has(frame)) parts.set(frame, []);
      parts.get(frame).push({ geometry, node, colour });
    },
    /** Merges every frame's parts into one mesh, child of that frame. */
    bake(root, material, depthMaterial) {
      root.updateMatrixWorld(true);
      const inverse = new Matrix4();
      for (const [frame, list] of parts) {
        inverse.copy(frame.matrixWorld).invert();
        const geometries = list.map(({ geometry, node, colour }) => {
          const g = geometry.clone();
          g.deleteAttribute('uv');
          g.applyMatrix4(new Matrix4().multiplyMatrices(inverse, node.matrixWorld));
          color.set(colour);
          const colors = new Float32Array(g.attributes.position.count * 3);
          for (let i = 0; i < colors.length; i += 3) {
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
          }
          g.setAttribute('color', new Float32BufferAttribute(colors, 3));
          return g;
        });
        const merged = mergeGeometries(geometries); // every primitive here is indexed
        const mesh = new Mesh(merged, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.customDepthMaterial = depthMaterial;
        frame.add(mesh);
      }
    },
  };
}

// shared primitive geometries (scaled per part through the node's transform)
const SPHERE = new SphereGeometry(1, 14, 10);
const SPHERE_LOW = new SphereGeometry(1, 10, 7);
const BOX = new BoxGeometry(1, 1, 1);
const CYLINDER = new CylinderGeometry(1, 1, 1, 12);
const capsules = new Map();
/** Capsule of radius r and straight length l along y, centred on its origin (cached). */
const capsule = (r, l) => {
  const key = r.toFixed(3) + '/' + l.toFixed(3);
  if (!capsules.has(key)) capsules.set(key, new CapsuleGeometry(r, l, 4, 10));
  return capsules.get(key);
};

/** An Object3D at (x, y, z) with optional Euler angles and scale, child of `parent`. */
function node(parent, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) {
  const o = new Object3D();
  o.position.set(x, y, z);
  o.rotation.set(rx, ry, rz);
  o.scale.set(sx, sy, sz);
  parent.add(o);
  return o;
}

/**
 * Pose table (radians). Arms: [swing, spread, elbow] per side — swing forward about the lateral
 * axis (0 hangs down, π/2 points forward), spread outwards from the body, elbow bend forward.
 * Legs: [hip swing forward, knee bend backwards] per side; hipY is the hip height; lean tilts the
 * upper body forward; prop names a held object.
 */
const POSES = {
  stand: {
    hipY: 0.95,
    lean: 0.02,
    armL: [0.08, 0.1, 0.18],
    armR: [-0.05, 0.1, 0.12],
    legL: [0.04, 0.02],
    legR: [-0.06, 0.04],
  },
  idle: {
    hipY: 0.95,
    lean: 0.03,
    armL: [0.25, 0.12, 0.6],
    armR: [-0.1, 0.08, 0.1],
    legL: [0.1, 0.05],
    legR: [-0.05, 0.02],
  },
  armsCrossed: {
    hipY: 0.95,
    lean: -0.02,
    armL: [0.35, 0.05, 1.9],
    armR: [0.4, 0.05, 1.85],
    legL: [0.06, 0.02],
    legR: [-0.04, 0.02],
  },
  // wheel gunner: right knee down, left foot planted, torso forward, both hands on the gun at hub height
  kneel: {
    hipY: 0.55,
    lean: 0.45,
    armL: [1.15, 0.0, 0.5],
    armR: [1.05, 0.05, 0.6],
    legL: [1.5, 1.55],
    legR: [-0.2, 1.9],
    prop: 'gun',
  },
  // front jack: bent over the T-bar of the jack handle (JACK below), both hands on the bar
  jack: {
    hipY: 0.93,
    lean: 0.55,
    armL: [1.0, 0.05, 0.25],
    armR: [1.0, 0.05, 0.25],
    reach: { L: [0.55, 0.9, -0.17], R: [0.55, 0.9, 0.17] },
    legL: [0.35, 0.45],
    legR: [-0.1, 0.3],
    prop: 'jack',
  },
  // lollipop / pit board held up towards the driver
  board: {
    hipY: 0.95,
    lean: 0.0,
    armL: [0.1, 0.1, 0.2],
    armR: [1.9, 0.1, 0.3],
    legL: [0.08, 0.03],
    legR: [-0.06, 0.03],
    prop: 'board',
  },
  // engineer reading a tablet at chest height
  tablet: {
    hipY: 0.95,
    lean: 0.06,
    armL: [0.3, 0.05, 1.45],
    armR: [0.3, 0.05, 1.45],
    legL: [0.05, 0.02],
    legR: [-0.05, 0.02],
    prop: 'tablet',
  },
  // carrying a mounted tyre upright in front of the hips (TYRE_HELD below), leaning back a little,
  // both hands on the tread at its "10 and 2 o'clock"
  tyre: {
    hipY: 0.95,
    lean: -0.05,
    armL: [0.55, 0.05, 0.9],
    armR: [0.55, 0.05, 0.9],
    reach: { L: [0.36, 1.135, -0.315], R: [0.36, 1.135, 0.315] },
    legL: [0.12, 0.05],
    legR: [-0.12, 0.05],
    prop: 'tyre',
  },
  // helmet held at the hip in the right hand
  carryHelmet: {
    hipY: 0.95,
    lean: 0.02,
    armL: [0.05, 0.1, 0.15],
    armR: [0.25, 0.12, 0.35],
    legL: [0.06, 0.02],
    legR: [-0.06, 0.02],
    prop: 'helmet',
  },
  // both hands raised to the head (putting on a helmet)
  helmet: {
    hipY: 0.95,
    lean: 0.0,
    armL: [2.3, 0.35, 1.2],
    armR: [2.3, 0.35, 1.2],
    legL: [0.04, 0.02],
    legR: [-0.04, 0.02],
  },
  // pointing at something ahead with the right arm
  point: {
    hipY: 0.95,
    lean: 0.04,
    armL: [0.05, 0.1, 0.2],
    armR: [1.35, 0.15, 0.1],
    legL: [0.12, 0.05],
    legR: [-0.08, 0.03],
  },
};

/**
 * @param {object} [options]
 * @param {string|object} [options.kit='crew'] a KITS name or { top, accent, legs, shoes, hat }
 * @param {number} [options.skin=0xc79b7c] skin colour
 * @param {'hair'|'cap'|'helmet'|'headset'} [options.head='hair'] what is on the head ('headset' is a
 *   cap with a headset); `helmet: true` is the same as head 'helmet'
 * @param {number} [options.hair=0x2b2119] hair colour
 * @param {keyof POSES} [options.pose='stand']
 * @param {string[]} [options.moving=[]] arms kept as their own moving pieces ('armL', 'armR')
 * @param {object} [options.materials] createPeopleMaterials() of the person's group (one is made otherwise)
 * @returns {Group} on the ground, facing +x; userData { hip, head, armL, armR, visor?, brim?,
 *   materials } — head/armL/armR are pivots (shoulders at ±0.2 m z), visor/brim are markers at the
 *   centre of those parts (for checks)
 */
function buildPerson({
  kit = 'crew',
  skin = 0xc79b7c,
  head: headwear = 'hair',
  helmet = false,
  hair = 0x2b2119,
  pose = 'stand',
  moving = [],
  materials = createPeopleMaterials(),
} = {}) {
  if (helmet) headwear = 'helmet';
  const colours = typeof kit === 'string' ? KITS[kit] || KITS.crew : kit;
  const P = POSES[pose] || POSES.stand;
  const root = new Group();
  const baker = createBaker();

  // skeleton: the pelvis carries the legs, `hip` the (leaning) upper body
  const pelvis = node(root, 0, P.hipY, 0);
  const hip = node(pelvis, 0, 0, 0, 0, 0, -P.lean);
  const chest = node(hip, 0, 0.32, 0);
  const headPivot = new Group();
  headPivot.position.set(0, 0.76, 0);
  hip.add(headPivot);
  const shoulder = (side) => {
    const s = new Group();
    s.position.set(0, 0.56, side * 0.2);
    hip.add(s);
    return s;
  };
  const armL = shoulder(-1);
  const armR = shoulder(1);

  // torso: a flattened capsule, belt, the kit's accent band over the shoulders, neck
  baker.add(root, capsule(0.16, 0.34), node(chest, 0, 0, 0, 0, 0, 0, 0.82, 1, 1.12), colours.top);
  baker.add(root, CYLINDER, node(pelvis, 0, 0.04, 0, 0, 0, 0, 0.15, 0.12, 0.19), colours.legs);
  baker.add(
    root,
    capsule(0.035, 0.36),
    node(chest, 0, 0.21, 0, UP_AXIS_ROTATION, 0, 0, 1, 1, 1),
    colours.accent,
  );
  baker.add(root, CYLINDER, node(hip, 0.01, 0.66, 0, 0, 0, 0, 0.05, 0.08, 0.05), skin);

  // legs: thigh, knee, shin, shoe (hip joints ±0.1 m); the shoe stays level with the ground
  for (const [side, [swing, knee]] of [
    [-1, P.legL],
    [1, P.legR],
  ]) {
    const thigh = node(pelvis, 0, 0, side * 0.1, 0, 0, swing);
    baker.add(root, capsule(0.075, 0.3), node(thigh, 0, -0.225, 0), colours.legs);
    const shin = node(thigh, 0, -0.45, 0, 0, 0, -knee);
    baker.add(root, capsule(0.06, 0.34), node(shin, 0, -0.23, 0), colours.legs);
    const foot = node(shin, 0, -0.46, 0, 0, 0, knee - swing);
    baker.add(root, BOX, node(foot, 0.06, -0.01, 0, 0, 0, 0, 0.26, 0.08, 0.1), colours.shoes);
  }

  // arms: upper arm, elbow, forearm, hand; baked into the body unless named in `moving`
  const hands = {};
  let propFrame = root;
  if (P.reach) root.updateMatrixWorld(true);
  for (const [side, pivot, angles, name, key] of [
    [-1, armL, P.armL, 'armL', 'L'],
    [1, armR, P.armR, 'armR', 'R'],
  ]) {
    const frame = moving.includes(name) ? pivot : root;
    const [swing, spread, elbow] = P.reach
      ? reachAngles(side, pivot.worldToLocal(new Vector3(...P.reach[key])))
      : angles;
    // spread about x: positive angles open the left arm towards -z, so the right arm takes -spread
    const upper = node(pivot, 0, 0, 0, -side * spread, 0, swing);
    baker.add(frame, capsule(0.052, 0.22), node(upper, 0, -0.15, 0), colours.top);
    const fore = node(upper, 0, -UPPER_ARM, 0, 0, 0, elbow);
    baker.add(frame, capsule(0.045, 0.2), node(fore, 0, -0.14, 0), skin);
    const hand = node(fore, 0, -FOREARM, 0);
    baker.add(frame, SPHERE_LOW, node(hand, 0, 0, 0, 0, 0, 0, 0.05, 0.06, 0.04), skin);
    hands[key] = hand;
    if (side === 1) propFrame = frame;
  }
  const props = addProp(baker, propFrame, P.prop, hands, root);

  // head: face, then hair / cap with a brim pointing forward (+x) / helmet with a visor at the front
  baker.add(headPivot, SPHERE, node(headPivot, 0, 0, 0, 0, 0, 0, 0.105, 0.12, 0.1), skin);
  let visor = null;
  let brim = null;
  if (headwear === 'helmet') {
    baker.add(headPivot, SPHERE, node(headPivot, -0.01, 0.01, 0, 0, 0, 0, 0.15, 0.15, 0.145), 0xf5f3ee);
    visor = node(headPivot, 0.105, 0.0, 0, 0, 0, 0, 0.06, 0.05, 0.1);
    baker.add(headPivot, SPHERE_LOW, visor, 0x1c1e21);
    baker.add(headPivot, TORUS_STRIPE, node(headPivot, -0.01, 0.03, 0, 0, Math.PI / 2, 0, 1, 1, 1), 0xe93325);
  } else {
    baker.add(headPivot, SPHERE, node(headPivot, -0.012, 0.03, 0, 0, 0, 0, 0.11, 0.105, 0.105), hair);
    if (headwear === 'cap' || headwear === 'headset') {
      baker.add(
        headPivot,
        SPHERE,
        node(headPivot, -0.01, 0.045, 0, 0, 0, 0, 0.115, 0.08, 0.112),
        colours.hat,
      );
      // the brim: the front (+x) half of a thin disc, tipped down a little
      brim = node(headPivot, 0.06, 0.05, 0, 0, 0, -0.12, 0.1, 0.012, 0.09);
      baker.add(headPivot, CYLINDER_HALF, brim, colours.hat);
    }
    if (headwear === 'headset') {
      baker.add(headPivot, TORUS_BAND, node(headPivot, 0, 0.02, 0, 0, Math.PI / 2, 0, 1, 1, 1), 0x101114);
      for (const side of [-1, 1])
        baker.add(
          headPivot,
          CYLINDER,
          node(headPivot, 0, -0.01, side * 0.11, Math.PI / 2, 0, 0, 0.045, 0.03, 0.045),
          0x101114,
        );
    }
  }

  baker.bake(root, materials.body, materials.depth);

  // contact shadow, just above the surface the person stands on (root y)
  const contact = new Mesh(CONTACT_DECAL, materials.contact);
  contact.position.set(pose === 'kneel' ? -0.1 : 0, CONTACT_LIFT, 0);
  contact.renderOrder = 1;
  root.add(contact);

  root.userData = { hip, head: headPivot, armL, armR, visor, brim, hands, props, materials };
  return root;
}

const TORUS_STRIPE = new TorusGeometry(0.135, 0.012, 5, 18, Math.PI);
const TORUS_BAND = new TorusGeometry(0.115, 0.008, 4, 16, Math.PI);
/** A cap brim: the front half of a thin disc (theta 0..π spans x >= 0 in CylinderGeometry). */
const CYLINDER_HALF = new CylinderGeometry(1, 1, 1, 12, 1, false, 0, Math.PI);
/** One contact-shadow plane (1.1 m square, facing up) shared by every person. */
const CONTACT_DECAL = new PlaneGeometry(1.1, 1.1).rotateX(-Math.PI / 2);
/** Height of the contact decal above the person's feet (the surface): above the asphalt by > 5 mm. */
const CONTACT_LIFT = 0.008;

/** Arm segment lengths (metres): shoulder → elbow, elbow → hand centre. */
const UPPER_ARM = 0.3;
const FOREARM = 0.29;

/**
 * Two-bone arm IK: the [swing, spread, elbow] angles (POSES convention) that put the hand of the arm
 * on `side` (-1 left, +1 right) at `target`, given in the shoulder pivot's frame. The arm lies in a
 * plane through the shoulder turned about x by the spread; the elbow bends forward (positive angle).
 * A target out of reach gets a straight arm pointing at it.
 */
function reachAngles(side, target) {
  const across = Math.hypot(target.y, target.z);
  const alpha = Math.atan2(-target.z, -target.y); // the arm plane's turn about x (= -side · spread)
  const span = Math.min(UPPER_ARM + FOREARM - 1e-4, Math.hypot(target.x, across));
  const cosElbow = (span * span - UPPER_ARM * UPPER_ARM - FOREARM * FOREARM) / (2 * UPPER_ARM * FOREARM);
  const elbow = Math.acos(Math.max(-1, Math.min(1, cosElbow)));
  // in the arm plane: the unswung arm points at phi0, the target lies at phi
  const phi = Math.atan2(-across, target.x);
  const phi0 = Math.atan2(-(UPPER_ARM + FOREARM * Math.cos(elbow)), FOREARM * Math.sin(elbow));
  return [phi - phi0, -alpha / side, elbow];
}

/**
 * The front jack, in the jack man's frame (crew-staging.js puts him 3.95 m ahead of the car's
 * centre, facing it, so his +x runs back along the car; the hero car's nose is at 2.34 m, i.e.
 * x = 1.61 here): a low trolley from x 1.03 to 1.51 on four castors, its lifting saddle at the car
 * end, and a handle from the socket at the trolley's back up to a T-bar under the hands.
 */
const JACK = { x0: 1.03, x1: 1.51, top: 0.13, width: 0.3, socket: [1.08, 0.14, 0], bar: [0.55, 0.9, 0] };
/** The carried tyre: centre (person frame), outer and rim radii, width; its axis runs along x. */
const TYRE_HELD = { centre: [0.36, 0.95, 0], radius: 0.33, rim: 0.215, width: 0.3 };

/** A tyre around the x axis (lathe of its section: rounded shoulders, open towards the rim). */
const TYRE = (() => {
  const { radius: R, rim: r, width: w } = TYRE_HELD;
  const h = w / 2;
  // from the -y bead over the tread to the +y bead, so LatheGeometry's normals point outwards
  const profile = [
    [r, -h + 0.02],
    [r + 0.035, -h],
    [R - 0.025, -h],
    [R - 0.004, -h + 0.03],
    [R, 0],
    [R - 0.004, h - 0.03],
    [R - 0.025, h],
    [r + 0.035, h],
    [r, h - 0.02],
  ].map(([x, y]) => new Vector2(x, y));
  return new LatheGeometry(profile, 18).rotateZ(-Math.PI / 2); // lathe axis y → x
})();
const RIM = new CylinderGeometry(TYRE_HELD.rim + 0.005, TYRE_HELD.rim + 0.005, 0.22, 18).rotateZ(
  -Math.PI / 2,
);
const HUB = new CylinderGeometry(0.07, 0.07, 0.24, 10).rotateZ(-Math.PI / 2);

/** A rod of radius r between points a and b (arrays), as a CYLINDER part of `frame`. */
function rod(baker, frame, parent, a, b, r, colour) {
  const from = new Vector3(...a);
  const axis = new Vector3(...b).sub(from);
  const length = axis.length();
  const o = node(
    parent,
    from.x + axis.x / 2,
    from.y + axis.y / 2,
    from.z + axis.z / 2,
    0,
    0,
    0,
    r,
    length,
    r,
  );
  o.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), axis.normalize());
  baker.add(frame, CYLINDER, o, colour);
}

/**
 * The held prop. The wheel gun is built in the right hand's frame (it moves with a moving arm, along
 * the forearm towards the wheel); the others are kept level in the root frame: a board on an upright
 * pole and a helmet at the right hand, a tablet between the hands, the jack (JACK) and the tyre
 * (TYRE_HELD) at fixed places that the pose's `reach` puts the hands on. Returns the contact points
 * to check: [{ name, a, b, gap }] (a and b in the person's frame should be within `gap` metres).
 */
function addProp(baker, frame, prop, hands, root) {
  if (!prop) return [];
  if (prop === 'gun') {
    const gun = node(hands.R, 0, -0.12, 0);
    baker.add(frame, BOX, node(gun, 0, 0, 0, 0, 0, 0, 0.11, 0.26, 0.11), 0x2b2e33);
    baker.add(frame, CYLINDER, node(gun, 0, -0.17, 0, 0, 0, 0, 0.04, 0.09, 0.04), 0x9aa0a6);
    baker.add(frame, BOX, node(gun, 0.07, 0.06, 0, 0, 0, 0, 0.05, 0.1, 0.05), 0xe93325);
    return [];
  }
  root.updateMatrixWorld(true);
  const handL = hands.L.getWorldPosition(new Vector3());
  const handR = hands.R.getWorldPosition(new Vector3());
  const held = node(root, handR.x, handR.y, handR.z);
  if (prop === 'board') {
    baker.add(frame, CYLINDER, node(held, 0, 0.3, 0, 0, 0, 0, 0.015, 0.7, 0.015), 0x9aa0a6);
    baker.add(frame, CYLINDER, node(held, 0.01, 0.75, 0, 0, 0, Math.PI / 2, 0.24, 0.02, 0.24), 0xe93325);
    baker.add(frame, CYLINDER, node(held, 0.022, 0.75, 0, 0, 0, Math.PI / 2, 0.16, 0.02, 0.16), 0xf5f3ee);
  } else if (prop === 'tablet') {
    baker.add(frame, BOX, node(held, 0.02, 0.05, -0.2, 0, 0, 0.9, 0.012, 0.26, 0.19), 0x15171a);
  } else if (prop === 'helmet') {
    baker.add(frame, SPHERE, node(held, 0.02, -0.12, 0.05, 0, 0, 0, 0.15, 0.15, 0.145), 0xf5f3ee);
    baker.add(frame, SPHERE_LOW, node(held, 0.12, -0.13, 0.05, 0, 0, 0, 0.06, 0.05, 0.1), 0x1c1e21);
  } else if (prop === 'tyre') {
    const [cx, cy, cz] = TYRE_HELD.centre;
    baker.add(frame, TYRE, node(root, cx, cy, cz), 0x18191b);
    baker.add(frame, RIM, node(root, cx, cy, cz), 0x8d9299);
    baker.add(frame, HUB, node(root, cx, cy, cz), 0x2b2e33);
    // each hand rests on the tread: its centre ~4 cm (the hand's half thickness) outside the tyre
    const rimGap = (hand) => {
      const radial = Math.hypot(hand.y - cy, hand.z - cz);
      return [
        hand.toArray(),
        [
          cx,
          cy + ((hand.y - cy) * TYRE_HELD.radius) / radial,
          cz + ((hand.z - cz) * TYRE_HELD.radius) / radial,
        ],
      ];
    };
    return [
      { name: 'tyre/handL', points: rimGap(handL), gap: 0.07 },
      { name: 'tyre/handR', points: rimGap(handR), gap: 0.07 },
    ];
  } else if (prop === 'jack') {
    const { x0, x1, top, width, socket, bar } = JACK;
    const red = 0xe93325;
    const steel = 0x9aa0a6;
    // trolley frame, lifting saddle at the car end, four castors
    baker.add(root, BOX, node(root, (x0 + x1) / 2, top - 0.035, 0, 0, 0, 0, x1 - x0, 0.07, width), red);
    baker.add(root, BOX, node(root, x1 - 0.06, top + 0.005, 0, 0, 0, 0, 0.1, 0.02, width * 0.7), 0x2b2e33);
    for (const cx of [x0 + 0.05, x1 - 0.05])
      for (const s of [-1, 1])
        baker.add(
          root,
          CYLINDER,
          node(root, cx, 0.03, s * (width / 2 - 0.03), Math.PI / 2, 0, 0, 0.03, 0.03, 0.03),
          0x15171a,
        );
    // handle: socket → T-bar, the bar between the hands
    rod(baker, root, root, socket, bar, 0.02, steel);
    rod(baker, root, root, [bar[0], bar[1], -0.24], [bar[0], bar[1], 0.24], 0.018, steel);
    const onBar = (hand) => [hand.toArray(), [bar[0], bar[1], Math.max(-0.24, Math.min(0.24, hand.z))]];
    return [
      { name: 'jack/handL', points: onBar(handL), gap: 0.05 },
      { name: 'jack/handR', points: onBar(handR), gap: 0.05 },
      { name: 'jack/socket', points: [socket, [socket[0], top, socket[2]]], gap: 0.05 },
    ];
  }
  return [];
}

export { JACK, KITS, POSES, TYRE_HELD, buildPerson, contactShadowMaterial, createPeopleMaterials };
