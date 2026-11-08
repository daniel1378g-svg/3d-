// Loads the hero car mesh and builds its materials, wheels and contact shadows.
//
// Car frame: metres, +x forward, y up with the ground at y = 0, +z to the right (the "units" of
// hero-car-mesh.json). Scene graph returned by buildHeroCar:
//
//   root 'hero-car'                 journey.js sets position (on the driving line) and rotation.y
//   ├─ chassis                      sprung mass: pose() rolls (x), pitches (z) and heaves (y) it
//   │   ├─ body                     Group > Mesh 'body' (the single-material scanned body)
//   │   └─ 4 × wheel-well liner + back plate (dark, hide the body interior behind the wheels)
//   ├─ 4 × wheel steer group        unsprung, at (x, r, ±0.86); front ones steer about y
//   ├─ contact shadow decal         5.5 × 2.75 m, userData.noMask
//   └─ 4 × blob shadow under tyres  userData.noMask
//
// userData.noMask keeps an object off layer 1, which journey.js uses for the motion-blur mask.
import {
  BufferAttribute,
  BufferGeometry,
  CircleGeometry,
  CylinderGeometry,
  Float32BufferAttribute,
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  RepeatWrapping,
  SRGBColorSpace,
  TextureLoader,
} from 'three';
import { buildWheel, wheelMaterials } from './wheel.js';
import { blobShadowTexture, roundedShadowTexture } from '../textures.js';

/** Smoothing threshold for the generated body normals (faces meeting at more than this stay sharp). */
var BODY_CREASE_ANGLE_DEG = 50,
  /** Tyre width passed to buildWheel, metres. */
  WHEEL_WIDTH = 0.34,
  /** Lateral distance of the wheel centres from the car's centre line, metres. */
  WHEEL_CENTRE_Z = 0.86;

/**
 * Loads the "ce-mesh/1" JSON (position / uv / index arrays plus texture file names) and its three
 * textures (base colour, normal, glTF-style metal-roughness), relative to the JSON's folder.
 * Reports progress as { loaded, total } after the JSON (1/2) and after the textures (2/2).
 *
 * @returns {Promise<Group>} a Group holding one Mesh named after the JSON's `name`, with a
 *   flat-shaded MeshStandardMaterial (the geometry has no normals yet)
 */
async function loadCarMesh(url, onProgress) {
  let baseUrl = url.slice(0, url.lastIndexOf('/') + 1),
    data = await (await fetch(url)).json();
  onProgress && onProgress({ loaded: 1, total: 2 });
  let geometry = new BufferGeometry();
  (geometry.setAttribute('position', new Float32BufferAttribute(data.position, 3)),
    geometry.setAttribute('uv', new Float32BufferAttribute(data.uv, 2)),
    geometry.setIndex(data.index));
  let loader = new TextureLoader(),
    // glTF-style UVs (flipY false); only the base colour map holds sRGB colour data.
    loadTexture = async (file, isColor) => {
      let texture = await loader.loadAsync(baseUrl + file);
      return (
        (texture.flipY = false),
        (texture.wrapS = texture.wrapT = RepeatWrapping),
        isColor && (texture.colorSpace = SRGBColorSpace),
        texture
      );
    },
    materialSpec = data.material,
    // The three Texture objects are created synchronously, in this order, before any await.
    [baseColorMap, normalMap, metalRoughMap] = await Promise.all([
      loadTexture(materialSpec.map, true),
      loadTexture(materialSpec.normalMap),
      loadTexture(materialSpec.metalRoughMap),
    ]);
  onProgress && onProgress({ loaded: 2, total: 2 });
  let material = new MeshStandardMaterial({
    map: baseColorMap,
    normalMap: normalMap,
    // glTF packing: roughness in G, metalness in B of the same texture.
    roughnessMap: metalRoughMap,
    metalnessMap: metalRoughMap,
    metalness: materialSpec.metalness,
    roughness: materialSpec.roughness,
    flatShading: true,
  });
  // Green channel flipped for a flipY = false (glTF-convention) normal map.
  material.normalScale.set(1, -1);
  let mesh = new Mesh(geometry, material);
  mesh.name = data.name;
  let group = new Group();
  return (group.add(mesh), group);
}

/**
 * Smooth normals that keep hard edges: returns a NON-indexed copy of `geometry` (or the geometry
 * itself if it is already non-indexed) with a `normal` attribute. Each corner's normal is the
 * area-weighted average of the normals of all faces that share that corner's position (welded at
 * 0.1 mm) AND whose unit normal is within `creaseAngle` (radians) of the corner's own face.
 */
function creasedNormals(geometry, creaseAngle) {
  let soup = geometry.index ? geometry.toNonIndexed() : geometry,
    positions = soup.attributes.position.array,
    faceCount = positions.length / 9,
    minCos = Math.cos(creaseAngle),
    // Unnormalised cross products: length = 2 × face area, so sums are area-weighted.
    weightedNormals = new Float32Array(faceCount * 3),
    unitNormals = new Float32Array(faceCount * 3),
    cornerKeys = new Array(faceCount * 3),
    facesByPosition = new Map(),
    // Position quantised to 1e-4 m, as a string key.
    positionKey = (offset) =>
      Math.round(positions[offset] * 1e4) +
      ',' +
      Math.round(positions[offset + 1] * 1e4) +
      ',' +
      Math.round(positions[offset + 2] * 1e4);
  for (let face = 0; face < faceCount; face++) {
    let base = face * 9,
      edge1X = positions[base + 3] - positions[base],
      edge1Y = positions[base + 4] - positions[base + 1],
      edge1Z = positions[base + 5] - positions[base + 2],
      edge2X = positions[base + 6] - positions[base],
      edge2Y = positions[base + 7] - positions[base + 1],
      edge2Z = positions[base + 8] - positions[base + 2],
      normalX = edge1Y * edge2Z - edge1Z * edge2Y,
      normalY = edge1Z * edge2X - edge1X * edge2Z,
      normalZ = edge1X * edge2Y - edge1Y * edge2X,
      length = Math.hypot(normalX, normalY, normalZ) || 1;
    ((weightedNormals[face * 3] = normalX),
      (weightedNormals[face * 3 + 1] = normalY),
      (weightedNormals[face * 3 + 2] = normalZ),
      (unitNormals[face * 3] = normalX / length),
      (unitNormals[face * 3 + 1] = normalY / length),
      (unitNormals[face * 3 + 2] = normalZ / length));
    for (let corner = 0; corner < 3; corner++) {
      let key = positionKey(base + corner * 3);
      cornerKeys[face * 3 + corner] = key;
      let faces = facesByPosition.get(key);
      (faces || facesByPosition.set(key, (faces = [])), faces.push(face));
    }
  }
  let normals = new Float32Array(positions.length);
  for (let face = 0; face < faceCount; face++)
    for (let corner = 0; corner < 3; corner++) {
      let sumX = 0,
        sumY = 0,
        sumZ = 0;
      for (let other of facesByPosition.get(cornerKeys[face * 3 + corner]))
        unitNormals[face * 3] * unitNormals[other * 3] +
          unitNormals[face * 3 + 1] * unitNormals[other * 3 + 1] +
          unitNormals[face * 3 + 2] * unitNormals[other * 3 + 2] >=
          minCos &&
          ((sumX += weightedNormals[other * 3]),
          (sumY += weightedNormals[other * 3 + 1]),
          (sumZ += weightedNormals[other * 3 + 2]));
      let length = Math.hypot(sumX, sumY, sumZ) || 1,
        offset = (face * 3 + corner) * 3;
      ((normals[offset] = sumX / length),
        (normals[offset + 1] = sumY / length),
        (normals[offset + 2] = sumZ / length));
    }
  return (soup.setAttribute('normal', new BufferAttribute(normals, 3)), soup);
}

/** Same maps and PBR values as `standard`, plus a light clearcoat (one coat over the whole body). */
function toClearcoatMaterial(standard) {
  return new MeshPhysicalMaterial({
    map: standard.map,
    normalMap: standard.normalMap,
    normalScale: standard.normalScale.clone(),
    roughnessMap: standard.roughnessMap,
    metalnessMap: standard.metalnessMap,
    metalness: standard.metalness,
    roughness: standard.roughness,
    color: standard.color,
    clearcoat: 0.32,
    clearcoatRoughness: 0.14,
  });
}

/**
 * Shadows, normals and material for one body mesh: generates creased normals if the geometry has
 * none (switching off flat shading), upgrades to the clearcoat material unless quality is 'low',
 * and softens the normal map to 0.6 (keeping the flipped green channel).
 */
function prepareBodyMesh(mesh, quality) {
  ((mesh.castShadow = true), (mesh.receiveShadow = true));
  let material = mesh.material;
  (mesh.geometry.attributes.normal ||
    ((mesh.geometry = creasedNormals(mesh.geometry, MathUtils.degToRad(BODY_CREASE_ANGLE_DEG))),
    (material.flatShading = false)),
    quality !== 'low' &&
      !material.isMeshPhysicalMaterial &&
      (material = mesh.material = toClearcoatMaterial(material)),
    (material.envMapIntensity = 1),
    material.normalScale && material.normalScale.set(0.6, material.normalScale.y < 0 ? -0.6 : 0.6),
    (material.needsUpdate = true));
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
 * @param {string} url hero-car-mesh.json URL (anything not ending in .json is unsupported)
 * @param {object} wheelLayout hero-car.json: { FL, FR, RL, RR: { x, y, r, side }, scale, bounds }
 * @param {object} [options]
 * @param {(progress: {loaded: number, total: number}) => void} [options.onProgress]
 * @param {'low'|'mid'|'high'} [options.quality='high'] 'low' keeps the cheaper standard material
 * @returns {Promise<{root: Group, chassis: Group, body: Group, wheels: object, pose: Function}>}
 */
async function buildHeroCar(url, wheelLayout, { onProgress, quality = 'high' } = {}) {
  let body = /\.json$/.test(url) ? await loadCarMesh(url, onProgress) : null,
    root = new Group();
  root.name = 'hero-car';
  let chassis = new Group();
  (root.add(chassis),
    body.traverse((node) => {
      node.isMesh && prepareBodyMesh(node, quality);
    }),
    chassis.add(body));
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
