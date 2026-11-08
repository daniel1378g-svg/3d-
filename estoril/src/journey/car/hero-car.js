// Builds the hero car: the packed body (car/body-asset.js), its materials, wheels and contact shadows.
//
// Car frame: metres, +x forward, y up with the ground at y = 0, +z to the right (the "units" of
// the body asset). Scene graph returned by buildHeroCar:
//
//   root 'hero-car'                 journey.js sets position (on the driving line) and rotation.y
//   ├─ chassis                      sprung mass: pose() rolls (x), pitches (z) and heaves (y) it
//   │   ├─ body                     Group > Mesh 'body' (the scanned body, normals baked offline)
//   │   └─ 4 × wheel-well liner + back plate (dark, hide the body interior behind the wheels)
//   ├─ 4 × wheel steer group        unsprung, at (x, r, ±0.86); front ones steer about y
//   ├─ contact shadow decal         5.5 × 2.75 m, userData.noMask
//   └─ 4 × blob shadow under tyres  userData.noMask
//
// userData.noMask keeps an object off layer 1, which journey.js uses for the motion-blur mask.
import {
  CircleGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
} from 'three';
import { loadBodyAsset } from './body-asset.js';
import { buildWheel, wheelMaterials } from './wheel.js';
import { blobShadowTexture, roundedShadowTexture } from '../textures.js';

/** Tyre width passed to buildWheel, metres. */
var WHEEL_WIDTH = 0.34,
  /** Lateral distance of the wheel centres from the car's centre line, metres. */
  WHEEL_CENTRE_Z = 0.86;

/**
 * The body material: base colour, normal and glTF metal-roughness maps (roughness in G, metalness
 * in B); a light clearcoat unless quality is 'low'. The normal map is a glTF (OpenGL, +Y up)
 * tangent-space map read with flipY = false and no vertex tangents, so its green channel is
 * negated (as three's GLTFLoader does) and softened to 0.6.
 */
function bodyMaterial(textures, quality) {
  const params = {
    map: textures.map,
    normalMap: textures.normalMap,
    roughnessMap: textures.metalRoughMap,
    metalnessMap: textures.metalRoughMap,
    metalness: 1,
    roughness: 1,
    envMapIntensity: 1,
  };
  const material =
    quality === 'low'
      ? new MeshStandardMaterial(params)
      : new MeshPhysicalMaterial({ ...params, clearcoat: 0.32, clearcoatRoughness: 0.14 });
  material.normalScale.set(0.6, -0.6);
  return material;
}

/** Loads the packed body and returns a Group holding its Mesh (shadows on). */
async function loadBody(url, quality, onProgress) {
  const { geometry, textures, desc } = await loadBodyAsset(url, onProgress);
  const mesh = new Mesh(geometry, bodyMaterial(textures, quality));
  mesh.name = desc.name;
  mesh.castShadow = mesh.receiveShadow = true;
  const group = new Group();
  group.add(mesh);
  return group;
}

/**
 * Four wheels on the root (unsprung) and their dark wheel-well liners on the chassis.
 *
 * @param {Record<'FL'|'FR'|'RL'|'RR', {x: number, y: number, r: number}>} wheelLayout from
 *   hero-car.json: axle x, wheel-centre height y and tyre radius r (metres). Its `side` field is
 *   not read; the side comes from the key (…R = right = +z).
 */
function addWheels(root, chassis, wheelLayout, materials) {
  let wheels = {};
  for (let key of ['FL', 'FR', 'RL', 'RR']) {
    let layout = wheelLayout[key],
      front = key[0] === 'F',
      side = key[1] === 'R' ? 1 : -1,
      wheel = buildWheel({ r: layout.r, w: WHEEL_WIDTH, front, side, mats: materials }),
      centreZ = side * WHEEL_CENTRE_Z;
    // Wheel centre at y = r so the tyre touches the ground (layout.y is only used for the wells).
    (wheel.steer.position.set(layout.x, layout.r, centreZ), root.add(wheel.steer));
    // Liner: open cylinder segment (0.42π .. 1.58π, i.e. the top of the arch once rotated)
    // around the wheel, 7 % larger than the tyre.
    let liner = new Mesh(
      new CylinderGeometry(
        layout.r * 1.07,
        layout.r * 1.07,
        0.5,
        40,
        1,
        true,
        Math.PI * 0.42,
        Math.PI * 1.16,
      ),
      materials.well,
    );
    ((liner.rotation.x = Math.PI / 2),
      (liner.rotation.y = 0),
      liner.position.set(layout.x, layout.y, side * 0.78),
      chassis.add(liner));
    // Back plate: a disc sector closing the inboard side of the well.
    let backPlate = new Mesh(
      new CircleGeometry(layout.r * 1.07, 40, -Math.PI * 0.08, Math.PI * 1.16),
      materials.well,
    );
    (backPlate.position.set(layout.x, layout.y, side * 0.53), chassis.add(backPlate), (wheels[key] = wheel));
  }
  return wheels;
}

/**
 * Soft rounded-rectangle shadow under the whole car plus a darker blob under each tyre. Both are
 * ground decals on the root (they do not pitch/roll with the chassis), excluded from the motion
 * mask, drawn after the ground with polygonOffset instead of depth writes.
 */
function addContactShadows(root, wheels) {
  let carShadowMaterial = new MeshBasicMaterial({
      map: roundedShadowTexture(256, 128, { alpha: 0.8 }),
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    }),
    carShadow = new Mesh(new PlaneGeometry(5.5, 2.75), carShadowMaterial);
  ((carShadow.rotation.x = -Math.PI / 2),
    carShadow.position.set(0, 0.055, 0),
    (carShadow.renderOrder = 1),
    (carShadow.userData.noMask = true),
    root.add(carShadow));
  let tyreShadowMaterial = new MeshBasicMaterial({
    map: blobShadowTexture(),
    transparent: true,
    depthWrite: false,
    opacity: 0.9,
    polygonOffset: true,
    polygonOffsetFactor: -3,
    polygonOffsetUnits: -3,
  });
  for (let key in wheels) {
    let tyreShadow = new Mesh(new PlaneGeometry(0.95, 0.62), tyreShadowMaterial);
    ((tyreShadow.rotation.x = -Math.PI / 2),
      tyreShadow.position.set(wheels[key].steer.position.x, 0.06, wheels[key].steer.position.z),
      (tyreShadow.renderOrder = 2),
      (tyreShadow.userData.noMask = true),
      root.add(tyreShadow));
  }
}

/**
 * @param {string} url the car's mesh URL (hero-car-mesh.json); its folder also holds the packed
 *   body named by `wheelLayout.body`, which is what is loaded when present. The ce-mesh/1 JSON
 *   itself stays for the published reference build and is not read by this code.
 * @param {object} wheelLayout hero-car.json: { FL, FR, RL, RR: { x, y, r, side }, scale, bounds, body }
 * @param {object} [options]
 * @param {(progress: {loaded: number, total: number}) => void} [options.onProgress]
 * @param {'low'|'mid'|'high'} [options.quality='high'] 'low' keeps the cheaper standard material
 * @returns {Promise<{root: Group, chassis: Group, body: Group, wheels: object, pose: Function}>}
 */
async function buildHeroCar(url, wheelLayout, { onProgress, quality = 'high' } = {}) {
  const bodyUrl = wheelLayout.body ? url.slice(0, url.lastIndexOf('/') + 1) + wheelLayout.body : url;
  let body = await loadBody(bodyUrl, quality, onProgress),
    root = new Group();
  root.name = 'hero-car';
  let chassis = new Group();
  (root.add(chassis), chassis.add(body));
  let materials = wheelMaterials(),
    wheels = addWheels(root, chassis, wheelLayout, materials);
  addContactShadows(root, wheels);
  return {
    root,
    chassis,
    body,
    wheels,
    /**
     * Per-frame car state.
     * @param {object} [state]
     * @param {number} [state.dist=0] distance driven, metres (wheels roll by dist / r radians)
     * @param {number} [state.steer=0] front-wheel steer angle about y, radians
     * @param {number} [state.pitch=0] chassis rotation about z, radians
     * @param {number} [state.roll=0] chassis rotation about x, radians
     * @param {number} [state.heave=0] chassis vertical offset, metres
     * @param {number} [state.speed=0] speed, m/s; fades the wheel blur discs in from 5 to ~20 m/s
     */
    pose({ dist = 0, steer = 0, pitch = 0, roll = 0, heave = 0, speed = 0 } = {}) {
      ((materials.blur.opacity = Math.min(0.94, Math.max(0, (speed - 5) / 16))),
        (materials.blur.visible = materials.blur.opacity > 0.01));
      for (let key in wheels) {
        let wheel = wheels[key];
        // Negative about z = forward roll for a car moving towards +x.
        ((wheel.spin.rotation.z = -dist / wheel.r), key[0] === 'F' && (wheel.steer.rotation.y = steer));
      }
      (chassis.rotation.set(roll, 0, pitch), (chassis.position.y = heave));
    },
  };
}

export { buildHeroCar };
