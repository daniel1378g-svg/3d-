// Sun and sky light: creation, applying a time-of-day sample (time-of-day.js), the fog, and the
// sun's shadow box, fitted every frame to the ground the camera sees.
// World XZ plane, y up; distances in metres, angles in radians unless noted.
//
// Fog. three.js mixes the fog in after tone mapping and the output encoding, so the fog colour is a
// display colour: the time of day's horizon colour (time-of-day.js). A THREE.Color holds working
// (linear) values and three.js encodes the fog uniform for the output, so applyLighting() decodes
// the display colour first; a fully fogged object then shows exactly the horizon's display colour,
// on the canvas and in the motion-blur target alike (motion-blur.js renders it as an output). The
// haze sits in the lowest air: fitFog() lengthens the fog distances with the eye's height by the
// mean haze density along a ray from the eye down to the ground (an exponential haze of scale
// height HAZE_SCALE_HEIGHT), so the overhead shots, which see the ground from up to 1.5 km, are not
// washed out by fog meant for the horizontal views.
//
// Shadow box (createShadowFollow). The orthographic shadow camera looks down the sun direction. Its
// square cross-section is fitted to the camera's ground footprint: the ground points under the eye
// and the target and where the four frustum corner rays meet the ground, each clipped to a reach
// that grows with the eye's height (rays above the horizon end there), measured in the shadow
// map's own axes. So the close-ups keep the sharp, car-tuned 140 m box (BASE_HALF_EXTENT, ≈ 3.4 cm
// texels on the 4096² map) and the aerial gets a box of up to 2.2 km that covers the whole frame
// (O2 in docs/diagnosis: the old box stayed on the car). The size follows the camera continuously
// (quantised to 1/16 octave so a still camera keeps a still box), the centre is snapped to whole
// shadow texels (no shimmer while the camera moves), the depth range follows the footprint, and
// the depth and normal biases keep their car-tuned values in metres (3.6 cm and 4 cm at the base
// box) scaled with the texel size. Shadow map: 4096² on 'high' (if the GPU allows 8192² textures,
// else 2048²), 2048² on 'mid', none on 'low'; PCF soft filtering (renderer.js).
// update() allocates nothing.
import { DirectionalLight, HemisphereLight, Vector3 } from 'three';
import { clamp } from './util/math.js';

const UP = new Vector3(0, 1, 0);

/** Linear fog from FOG_NEAR to FOG_FAR (metres) for an eye at ground level (see fitFog). */
const FOG_NEAR = 140;
const FOG_FAR = 3300;
/** Scale height (metres) of the haze density, exp(−y / H). */
const HAZE_SCALE_HEIGHT = 900;

/** Half-size (metres) of the shadow box for ground-level shots, and its upper limit (aerial). */
const BASE_HALF_EXTENT = 70;
const MAX_HALF_EXTENT = 1100;
/**
 * Depth bias (metres along the sun) and normal offset (metres) at the base box: the values tuned
 * with the car's tyre contact (-4e-5 of the old 890 m depth range is 3.6 cm; 4 cm ≈ 1.2 texels).
 */
const BASE_BIAS_METRES = 0.0356;
const BASE_NORMAL_BIAS = 0.04;
/** Frustum corner rays are followed to at most this horizontal reach: metres + × eye height. */
const REACH_BASE = 60;
const REACH_PER_HEIGHT = 2.5;
const MAX_REACH = 1600;
/** Casters this far up-sun of the footprint (and this far below it) stay inside the depth range. */
const CASTER_MARGIN = 160;
const RECEIVER_MARGIN = 40;
/** The box size moves in steps of 1/16 octave (4.4 %). */
const SIZE_STEPS_PER_OCTAVE = 16;

function shadowMapSizeFor(renderer, quality) {
  return quality === 'high' && renderer.capabilities.maxTextureSize >= 8192 ? 4096 : 2048;
}

/**
 * Exposure. A camera adapts to the light: groundIlluminance() estimates the light on level ground
 * (the sun's, plus the sky's from the environment probe and the hemisphere fill), and exposureFor()
 * puts a sunlit 18 % grey card at REFERENCE_EXPOSURE under REFERENCE_ILLUMINANCE (midday),
 * compensating ADAPTATION of each stop the light falls (so the morning and the golden hour keep
 * comparable mid-tones and still read as darker, warmer moments), times the palette's trim (`exp`).
 */
const REFERENCE_ILLUMINANCE = 3.84;
const REFERENCE_EXPOSURE = 0.9;
const ADAPTATION = 0.8;
/** Irradiance on level ground per unit of environmentIntensity / hemisphere intensity (measured). */
const SKY_IRRADIANCE = 1.1;
const HEMI_IRRADIANCE = 0.6;
/**
 * Light bounced up by the ground (asphalt and grass, albedo ≈ 0.1), as the hemisphere light's
 * ground colour: the palette's `gnd` tint (luminance ≈ 0.13) times this times the illuminance.
 */
const GROUND_BOUNCE = 0.75;

function groundIlluminance(light) {
  return (
    light.sunI * Math.max(0.03, light.sunDir.y) + SKY_IRRADIANCE * light.env + HEMI_IRRADIANCE * light.hemiI
  );
}

/** Tone-mapping exposure for a sampleTimeOfDay() result (see above). */
function exposureFor(light) {
  return (
    light.exp * REFERENCE_EXPOSURE * Math.pow(REFERENCE_ILLUMINANCE / groundIlluminance(light), ADAPTATION)
  );
}

/** Hemisphere sky/ground fill plus the shadow-casting sun, added to `scene` in this order. */
function createLights(scene, renderer, quality) {
  const hemi = new HemisphereLight(0xffffff, 0x404040, 0.5);
  scene.add(hemi);
  const sun = new DirectionalLight(0xffffff, 3);
  sun.castShadow = renderer.shadowMap.enabled;
  sun.shadow.mapSize.setScalar(shadowMapSizeFor(renderer, quality));
  Object.assign(sun.shadow.camera, {
    left: -BASE_HALF_EXTENT,
    right: BASE_HALF_EXTENT,
    top: BASE_HALF_EXTENT,
    bottom: -BASE_HALF_EXTENT,
    near: 1,
    far: 400,
  });
  sun.shadow.camera.updateProjectionMatrix();
  sun.shadow.bias = -BASE_BIAS_METRES / 399;
  sun.shadow.normalBias = BASE_NORMAL_BIAS;
  scene.add(sun, sun.target);
  return { hemi, sun };
}

/**
 * Applies a sampleTimeOfDay() result: sun and hemisphere lights (sky fill and ground bounce), the
 * fog colour (the display colour `fog` decoded, see the header), the tone-mapping exposure and the
 * strength of the sky's image-based light.
 */
function applyLighting(light, { sun, hemi, scene, renderer }) {
  sun.color.copy(light.sun);
  sun.intensity = light.sunI;
  // the hemisphere light carries the sky fill (`sky` × hemiI) and the ground bounce
  hemi.intensity = 1;
  hemi.color.copy(light.sky).multiplyScalar(light.hemiI);
  hemi.groundColor.copy(light.gnd).multiplyScalar(GROUND_BOUNCE * groundIlluminance(light));
  scene.fog.color.copy(light.fog).convertSRGBToLinear();
  scene.environmentIntensity = light.env;
  renderer.toneMappingExposure = exposureFor(light);
}

/**
 * Fog distances for an eye `eyeHeight` metres above the ground: FOG_NEAR..FOG_FAR stretched by the
 * inverse of the mean haze density along a ray from the eye to the ground, h / (H (1 − e^(−h/H))):
 * 1 at ground level, 1.4 at 600 m, 2.0 at 1.5 km.
 */
function fitFog(fog, eyeHeight) {
  const h = Math.max(0, eyeHeight) / HAZE_SCALE_HEIGHT;
  const stretch = h > 1e-4 ? h / -Math.expm1(-h) : 1 + h / 2;
  fog.near = FOG_NEAR * stretch;
  fog.far = FOG_FAR * stretch;
}

/**
 * The sun's shadow box, fitted to the camera's view each frame (see the header). Returns
 * { update(sunDir, camera, target), halfExtent }.
 */
function createShadowFollow(sun) {
  const shadowCamera = sun.shadow.camera;
  const mapSize = sun.shadow.mapSize.x;
  // scratch
  const right = new Vector3();
  const upAxis = new Vector3();
  const ray = new Vector3();
  const centre = new Vector3();
  const corners = [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ];
  const state = { halfExtent: BASE_HALF_EXTENT, update };
  let minA, maxA, minB, maxB, minD, maxD;

  function include(x, y, z) {
    const a = x * right.x + y * right.y + z * right.z;
    const b = x * upAxis.x + y * upAxis.y + z * upAxis.z;
    const d = x * sunDirRef.x + y * sunDirRef.y + z * sunDirRef.z;
    if (a < minA) minA = a;
    if (a > maxA) maxA = a;
    if (b < minB) minB = b;
    if (b > maxB) maxB = b;
    if (d < minD) minD = d;
    if (d > maxD) maxD = d;
  }
  let sunDirRef = UP;

  /**
   * `sunDir` unit vector to the sun, `camera` the posed scene camera (projection and matrixWorld up
   * to date), `target` the point it looks at.
   */
  function update(sunDir, camera, target) {
    sunDirRef = sunDir;
    right.crossVectors(UP, sunDir);
    if (right.lengthSq() < 1e-8) right.set(1, 0, 0); // sun straight overhead
    right.normalize();
    upAxis.crossVectors(sunDir, right).normalize();
    minA = minB = minD = Infinity;
    maxA = maxB = maxD = -Infinity;

    const eye = camera.position;
    const height = Math.max(0, eye.y);
    const reach = Math.min(MAX_REACH, REACH_BASE + REACH_PER_HEIGHT * height);
    include(eye.x, 0, eye.z);
    include(target.x, Math.min(target.y, 0), target.z);
    // the frame's corners at unit view depth from the projection matrix (view offset included):
    // x_ndc = P[0]·x + P[8]·(−z) at z = −1
    const p = camera.projectionMatrix.elements;
    const e = camera.matrixWorld.elements; // columns: right, up, back
    for (let i = 0; i < 4; i++) {
      const sx = (corners[i][0] + p[8]) / p[0];
      const sy = (corners[i][1] + p[9]) / p[5];
      ray.set(e[0] * sx + e[4] * sy - e[8], e[1] * sx + e[5] * sy - e[9], e[2] * sx + e[6] * sy - e[10]);
      // where the corner ray meets the ground, or its point at the reach if that is nearer
      const horizontal = Math.hypot(ray.x, ray.z) || 1e-6;
      let t = reach / horizontal;
      if (ray.y < 0) t = Math.min(t, height / -ray.y);
      include(eye.x + ray.x * t, Math.max(0, eye.y + ray.y * t), eye.z + ray.z * t);
    }

    // square box in the shadow map's axes, its size quantised, its centre snapped to texels
    const rawHalf = 0.5 * Math.max(maxA - minA, maxB - minB) * 1.04;
    const steps = Math.ceil(Math.log2(Math.max(1, rawHalf / BASE_HALF_EXTENT)) * SIZE_STEPS_PER_OCTAVE);
    const half = Math.min(MAX_HALF_EXTENT, BASE_HALF_EXTENT * Math.pow(2, steps / SIZE_STEPS_PER_OCTAVE));
    const texel = (2 * half) / mapSize;
    const a = Math.round((minA + maxA) / 2 / texel) * texel;
    const b = Math.round((minB + maxB) / 2 / texel) * texel;
    const depthCentre = (minD + maxD) / 2;
    centre
      .set(0, 0, 0)
      .addScaledVector(right, a)
      .addScaledVector(upAxis, b)
      .addScaledVector(sunDir, depthCentre);
    const depthHalf = (maxD - minD) / 2;
    const sunDistance = depthHalf + CASTER_MARGIN;
    sun.position.copy(centre).addScaledVector(sunDir, sunDistance);
    sun.target.position.copy(centre);
    const far = sunDistance + depthHalf + RECEIVER_MARGIN;
    if (half !== shadowCamera.right || far !== shadowCamera.far) {
      shadowCamera.left = shadowCamera.bottom = -half;
      shadowCamera.right = shadowCamera.top = half;
      shadowCamera.near = 1;
      shadowCamera.far = far;
      shadowCamera.updateProjectionMatrix();
    }
    const scale = half / BASE_HALF_EXTENT;
    sun.shadow.bias = -(BASE_BIAS_METRES * scale) / (far - 1);
    sun.shadow.normalBias = BASE_NORMAL_BIAS * scale;
    state.halfExtent = half;
  }

  return state;
}

export {
  FOG_FAR,
  FOG_NEAR,
  BASE_HALF_EXTENT,
  MAX_HALF_EXTENT,
  applyLighting,
  exposureFor,
  createLights,
  createShadowFollow,
  fitFog,
  shadowMapSizeFor,
};
