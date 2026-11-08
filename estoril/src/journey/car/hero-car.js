// Builds the hero car: the packed body (car/body-asset.js), its materials, wheels and ground contact.
//
// Car frame: metres, +x forward, y up with the tyre bottoms at y = 0, +z to the right (the "units"
// of the body asset). Scene graph returned by buildHeroCar:
//
//   root 'hero-car'                 journey.js sets position (on the driving line) and rotation.y
//   ├─ chassis                      sprung mass: pose() rolls (x), pitches (z) and heaves (y) it
//   │   ├─ body                     Group > Mesh 'body' (normals baked offline; 4 material groups)
//   │   └─ wheel-wells              one mesh: 4 arch liners + back plates hiding the body's inside
//   ├─ wheels                       9 instanced parts × 4 wheels (car/wheel.js), unsprung, at
//   │                               (x, r, ±0.86); the front pair steers
//   └─ ground-occlusion             baked car-shaped AO decal on the road (6.4 × 3.6 m), noMask
//
// The chassis and the wheels sit RIDE_HEIGHT above the root, so the tyres press 12 mm into the road
// surface at y = ROAD_SURFACE_Y: they visibly touch it on the track, in the pit lane and the paddock.
//
// userData.noMask keeps an object off layer 1, which journey.js uses for the motion-blur mask.
import { CircleGeometry, CylinderGeometry, Group, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { loadBodyAsset } from './body-asset.js';
import { bodyMaterials } from './body-materials.js';
import { createWheels } from './wheel.js';

/** Tyre width, metres. */
const WHEEL_WIDTH = 0.34;
/** Lateral distance of the wheel centres from the car's centre line, metres. */
const WHEEL_CENTRE_Z = 0.86;
/**
 * Top of the asphalt the car drives on (world track surfaces y 0.03; the pit lane is at 0.025 and the
 * paddock at 0.02). The car path itself is at y = 0.
 */
const ROAD_SURFACE_Y = 0.03;
/** Tyres sink this far below ROAD_SURFACE_Y: a loaded tyre's flattened contact patch (≈ 16 cm long). */
const TYRE_DEFLECTION = 0.012;
/** Height of the car frame (tyre bottoms, body) above the path: wheels and chassis are raised by it. */
const RIDE_HEIGHT = ROAD_SURFACE_Y - TYRE_DEFLECTION;
/** The occlusion decal floats this far above ROAD_SURFACE_Y (above the 0.034 rubber line too). */
const FOOTPRINT_LIFT = 0.006;
const FOOTPRINT_OPACITY = 0.9;
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
  group.userData.footprint = textures.footprint;
  group.userData.footprintSize = desc.footprint.size;
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
 * The car's ground contact: a decal of the baked ground occlusion (tools/car/bake_body.py: the body
 * and the four tyres occluding the sky above each road point within 1.6 m, so it is car-shaped, darkest
 * under the floor and at the tyre contact patches, and fades to nothing before its edges). It lies on
 * the root (it does not pitch or roll with the chassis), just above the road, is excluded from the
 * motion-blur mask and draws after the ground with polygonOffset instead of depth writes.
 */
function groundOcclusion(texture, [width, depth]) {
  const material = new MeshBasicMaterial({
    name: 'car-ground-occlusion',
    color: 0x000000,
    alphaMap: texture,
    transparent: true,
    opacity: FOOTPRINT_OPACITY,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -4,
  });
  const mesh = new Mesh(new PlaneGeometry(width, depth).rotateX(-Math.PI / 2), material);
  mesh.name = 'ground-occlusion';
  mesh.position.y = ROAD_SURFACE_Y + FOOTPRINT_LIFT;
  mesh.renderOrder = 1;
  mesh.userData.noMask = true;
  return mesh;
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
  const body = await loadBody(bodyUrl, quality, onProgress);
  const root = new Group();
  root.name = 'hero-car';
  const chassis = new Group();
  chassis.position.y = RIDE_HEIGHT;
  root.add(chassis);
  chassis.add(body);
  const wheels = createWheels({
    layout: wheelLayout,
    width: WHEEL_WIDTH,
    centreZ: WHEEL_CENTRE_Z,
    centreY: RIDE_HEIGHT,
  });
  const materials = wheels.materials;
  root.add(wheels.group);
  chassis.add(wheelWells(wheelLayout, materials.well));
  root.add(groundOcclusion(body.userData.footprint, body.userData.footprintSize));
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
      chassis.position.y = RIDE_HEIGHT + heave;
    },
  };
}

export { buildHeroCar };
