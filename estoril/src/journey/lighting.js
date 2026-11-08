// Sun and sky light: creation, journey progress → time of day, and the sun's shadow box that
// follows the camera with texel snapping (so shadow edges do not shimmer while the camera moves).
// World XZ plane, y up; distances in metres, angles in radians unless noted.
import { DirectionalLight, HemisphereLight, MathUtils, Vector3 } from 'three';
import { clamp, lerp, smoothstep } from './util/math.js';

const UP = new Vector3(0, 1, 0);

/** Half-size of the sun's orthographic shadow box (metres): a 140 m square around the focus point. */
const SHADOW_HALF_EXTENT = 70;

/** The sun light sits this far from the shadow focus point, along the sun direction (metres). */
const SUN_DISTANCE = 400;

/** Above this camera height (aerial shots) the shadow box stays on the car instead of the camera target. */
const AERIAL_CAMERA_HEIGHT = 40;

/** Hemisphere sky/ground fill plus the shadow-casting sun, added to `scene` in this order. */
function createLights(scene, renderer, quality) {
  const hemi = new HemisphereLight(14279913, 6187602, 1);
  scene.add(hemi);
  const sun = new DirectionalLight(16777215, 3);
  sun.castShadow = renderer.shadowMap.enabled;
  sun.shadow.mapSize.setScalar(
    quality === 'high' && renderer.capabilities.maxTextureSize >= 8192 ? 4096 : 2048,
  );
  Object.assign(sun.shadow.camera, {
    left: -SHADOW_HALF_EXTENT,
    right: SHADOW_HALF_EXTENT,
    top: SHADOW_HALF_EXTENT,
    bottom: -SHADOW_HALF_EXTENT,
    near: 10,
    far: 900,
  });
  sun.shadow.bias = -4e-4;
  sun.shadow.normalBias = 0.04;
  sun.shadow.radius = 4;
  scene.add(sun, sun.target);
  return { hemi, sun };
}

/**
 * Journey progress → time of day (0 morning … 1 golden hour, the keys in time-of-day.js): a slow
 * morning over arrival and pit lane, midday on track, afternoon in the paddock, then an eased run
 * into the golden hour over progress 0.8–0.885.
 */
function timeOfDayAt(progress) {
  return progress < 0.2
    ? lerp(0, 0.12, progress / 0.2)
    : progress < 0.56
      ? lerp(0.12, 0.45, (progress - 0.2) / 0.36)
      : progress < 0.8
        ? lerp(0.45, 0.78, (progress - 0.56) / 0.24)
        : lerp(0.78, 1, smoothstep(clamp((progress - 0.8) / 0.085, 0, 1)));
}

/**
 * Unit vector towards the sun for a sampleTimeOfDay() result: `sunAz` (degrees) is measured from
 * -Z towards +X, `sunEl` (degrees) above the XZ plane. Allocates a new Vector3.
 */
function sunDirection(light) {
  const elevation = MathUtils.degToRad(light.sunEl);
  const azimuth = MathUtils.degToRad(light.sunAz);
  return new Vector3(
    Math.sin(azimuth) * Math.cos(elevation),
    Math.sin(elevation),
    -Math.cos(azimuth) * Math.cos(elevation),
  ).normalize();
}

/** Applies a sampleTimeOfDay() result to the sun and hemisphere lights (the sky dome: sky.js). */
function applyTimeOfDay(light, { sun, hemi }) {
  sun.color.set(light.sun);
  sun.intensity = light.sunI;
  hemi.color.set(light.sky);
  hemi.groundColor.set(light.gnd);
  hemi.intensity = light.hemiI;
}

/** Fog colour and tone-mapping exposure for a sampleTimeOfDay() result. */
function applyAtmosphere(light, { scene, renderer }) {
  scene.fog.color.set(light.fog);
  renderer.toneMappingExposure = light.exp;
}

// scratch: the shadow map's horizontal and vertical axes
const shadowRight = new Vector3();
const shadowUp = new Vector3();

/**
 * Snaps `point` (in place) to the shadow map's texel grid in the plane perpendicular to `sunDir`,
 * keeping its depth along `sunDir`, so the shadow box only ever moves by whole texels.
 */
function snapToShadowTexels(point, sunDir, sun) {
  const texel = (sun.shadow.camera.right - sun.shadow.camera.left) / sun.shadow.mapSize.x; // metres
  shadowRight.crossVectors(UP, sunDir);
  if (shadowRight.lengthSq() < 1e-8) shadowRight.set(1, 0, 0); // sun straight overhead
  shadowRight.normalize();
  shadowUp.crossVectors(sunDir, shadowRight).normalize();
  const across = Math.round(point.dot(shadowRight) / texel) * texel;
  const up = Math.round(point.dot(shadowUp) / texel) * texel;
  const depth = point.dot(sunDir);
  return point
    .set(0, 0, 0)
    .addScaledVector(shadowRight, across)
    .addScaledVector(shadowUp, up)
    .addScaledVector(sunDir, depth);
}

/**
 * Centres the sun's shadow box on what the camera looks at (on the car during aerial shots),
 * snapped to shadow texels, with the light SUN_DISTANCE metres up-sun of it.
 */
function followWithShadow(sun, sunDir, cameraPosition, cameraTarget, carPosition) {
  const focus = cameraTarget.clone();
  if (cameraPosition.y > AERIAL_CAMERA_HEIGHT) focus.copy(carPosition);
  snapToShadowTexels(focus, sunDir, sun);
  sun.position.copy(focus).addScaledVector(sunDir, SUN_DISTANCE);
  sun.target.position.copy(focus);
}

export {
  applyAtmosphere,
  applyTimeOfDay,
  createLights,
  followWithShadow,
  snapToShadowTexels,
  sunDirection,
  timeOfDayAt,
};
