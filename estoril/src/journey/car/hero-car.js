// Builds the hero car: the packed body (car/body-asset.js), its materials, wheels and contact shadows.
//
// Car frame: metres, +x forward, y up with the ground at y = 0, +z to the right (the "units" of
// the body asset). Scene graph returned by buildHeroCar:
//
//   root 'hero-car'                 journey.js sets position (on the driving line) and rotation.y
//   ├─ chassis                      sprung mass: pose() rolls (x), pitches (z) and heaves (y) it
//   │   ├─ body                     Group > Mesh 'body' (normals baked offline; 4 material groups)
//   │   └─ wheel-wells              one mesh: 4 arch liners + back plates hiding the body's inside
//   ├─ wheels                       9 instanced parts × 4 wheels (car/wheel.js), unsprung, at
//   │                               (x, r, ±0.86); the front pair steers
//   ├─ contact shadow decal         5.5 × 2.75 m, userData.noMask
//   └─ 4 × blob shadow under tyres  userData.noMask
//
// userData.noMask keeps an object off layer 1, which journey.js uses for the motion-blur mask.
import { CircleGeometry, CylinderGeometry, Group, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { loadBodyAsset } from './body-asset.js';
import { bodyMaterials } from './body-materials.js';
import { createWheels } from './wheel.js';
import { blobShadowTexture, roundedShadowTexture } from '../textures.js';

/** Tyre width, metres. */
const WHEEL_WIDTH = 0.34;
/** Lateral distance of the wheel centres from the car's centre line, metres. */
const WHEEL_CENTRE_Z = 0.86;
/** Inboard and outboard |z| of the wheel wells (the body's arch cut-outs span |z| 0.49 to 0.98–1.02). */
const WELL_INNER_Z = 0.49;
const WELL_OUTER_Z = 0.95;

/**
 * Loads the packed body and returns a Group holding its Mesh (shadows on), with one material per
 * group (paint, trim, glass, lights: car/body-materials.js).
 */
async function loadBody(url, quality, onProgress) {
  const { geometry, groups, textures, desc } = await loadBodyAsset(url, onProgress);
  const mesh = new Mesh(geometry, bodyMaterials(groups, textures, quality));
  mesh.name = desc.name;
  mesh.castShadow = mesh.receiveShadow = true;
  const group = new Group();
  group.add(mesh);
  return group;
}

/**
 * The four wheel wells as one mesh on the chassis: per wheel an open arch liner (a cylinder segment
 * 7 % larger than the tyre over the top 209°) and a back plate closing its inboard side, so the
 * open wheel cut-outs of the body never show its inside. The liner stops at |z| = WELL_OUTER_Z,
 * inside the body's arch rim (|z| 0.98–1.02), so it cannot poke through the fender skin.
 *
 * @param {Record<'FL'|'FR'|'RL'|'RR', {x: number, y: number, r: number}>} layout hero-car.json
 */
function wheelWells(layout, material) {
  const parts = [];
  for (const key of ['FL', 'FR', 'RL', 'RR']) {
    const { x, y, r } = layout[key];
    const side = key[1] === 'R' ? 1 : -1;
    const length = WELL_OUTER_Z - WELL_INNER_Z;
    parts.push(
      new CylinderGeometry(r * 1.07, r * 1.07, length, 40, 1, true, Math.PI * 0.42, Math.PI * 1.16)
        .rotateX(Math.PI / 2)
        .translate(x, y, side * (WELL_INNER_Z + length / 2)),
    );
    const plate = new CircleGeometry(r * 1.07, 40, -Math.PI * 0.08, Math.PI * 1.16);
    parts.push(plate.translate(x, y, side * WELL_INNER_Z));
  }
  const mesh = new Mesh(mergeGeometries(parts), material);
  mesh.name = 'wheel-wells';
  for (const part of parts) part.dispose();
  return mesh;
}

/**
 * Soft rounded-rectangle shadow under the whole car plus a darker blob under each tyre. Both are
 * ground decals on the root (they do not pitch/roll with the chassis), excluded from the motion
 * mask, drawn after the ground with polygonOffset instead of depth writes.
 */
function addContactShadows(root, layout) {
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
  for (const key of ['FL', 'FR', 'RL', 'RR']) {
    let tyreShadow = new Mesh(new PlaneGeometry(0.95, 0.62), tyreShadowMaterial);
    ((tyreShadow.rotation.x = -Math.PI / 2),
      tyreShadow.position.set(layout[key].x, 0.06, (key[1] === 'R' ? 1 : -1) * WHEEL_CENTRE_Z),
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
  const wheels = createWheels({ layout: wheelLayout, width: WHEEL_WIDTH, centreZ: WHEEL_CENTRE_Z });
  const materials = wheels.materials;
  root.add(wheels.group);
  chassis.add(wheelWells(wheelLayout, materials.well));
  addContactShadows(root, wheelLayout);
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
      materials.blur.opacity = Math.min(0.94, Math.max(0, (speed - 5) / 16));
      materials.blur.visible = materials.blur.opacity > 0.01;
      wheels.update(dist, steer);
      chassis.rotation.set(roll, 0, pitch);
      chassis.position.y = heave;
    },
  };
}

export { buildHeroCar };
