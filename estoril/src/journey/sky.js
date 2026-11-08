// Sky dome and the scene's image-based lighting.
//
// The sky is a back-faced sphere with a gradient + sun-glow shader. It is drawn in display space:
// its colours are the display colours of the time-of-day palette (time-of-day.js: the photo samples
// of docs/references.md 4.9), written to the screen as they are (no tone mapping), and the fog,
// which three.js mixes in after tone mapping, uses the same display colours, so distant hills fade
// exactly into the horizon. The motion-blur pass knows this (motion-blur.js).
//
// The environment map (scene.environment) comes from a separate probe: the same shader on a 100 m
// sphere with a ground disc, in its own scene, with its colours as scene-linear radiance (the
// display colours decoded to linear light), captured into a cube map and prefiltered with PMREM.
// The probe is a pure function of the solar hour, quantised to ENV_STEP_HOURS: it re-captures
// only when the quantised hour changes and always from that hour's own palette, so the reflections
// at a journey position do not depend on the scroll history, on warmup() or on the first frame
// (the first capture used to see a black sky).
import {
  BackSide,
  CircleGeometry,
  Color,
  CubeCamera,
  HalfFloatType,
  Mesh,
  MeshBasicMaterial,
  PMREMGenerator,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Vector3,
  WebGLCubeRenderTarget,
} from 'three';
import { createTimeOfDaySample, sampleTimeOfDay } from './time-of-day.js';

/** Sky dome radius (metres); the camera's far plane (depth-range.js) always contains it. */
const SKY_RADIUS = 8e3;

/** The environment probe follows the solar hour in steps of this many hours (12 minutes). */
const ENV_STEP_HOURS = 0.2;

/** Ground albedo seen by the probe below the horizon (dry grass and asphalt) relative to `gnd`. */
const PROBE_GROUND_GAIN = 0.75;

/**
 * Sky gradient from the horizon colour `hor` to the zenith colour `zen`, plus a sun disc and halo
 * in `sunCol` around `sunDir`; below the horizon it fades to a slightly darker horizon colour.
 * Writes its colours as they are: display colours for the dome, radiance for the probe. The dome
 * is dithered by ±0.5/255 (`dither` 1). No fog: the dome is the fog's backdrop.
 */
function createSkyMaterial() {
  return new ShaderMaterial({
    side: BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      zen: { value: new Color() },
      hor: { value: new Color() },
      sunDir: { value: new Vector3(0, 1, 0) },
      sunCol: { value: new Color() },
      dither: { value: 1 },
    },
    vertexShader:
      'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }',
    fragmentShader: `uniform vec3 zen, hor, sunCol; uniform vec3 sunDir; uniform float dither; varying vec3 vP;
      void main(){ vec3 p = normalize(vP); float h = clamp(p.y, -.2, 1.); float k = pow(clamp(h, 0., 1.), .55);
        vec3 c = mix(hor, zen, k);
        float s = max(dot(p, sunDir), 0.);
        c += sunCol * (pow(s, 380.) * 2.2 + pow(s, 12.) * .16 + pow(s, 3.) * .05 * (1. - k));
        c = mix(c, hor * .92, smoothstep(0., -.2, p.y));
        gl_FragColor = vec4(c + dither * (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - .5) / 255., 1.);
      }`,
  });
}

function createSkyDome(material) {
  return new Mesh(new SphereGeometry(SKY_RADIUS, 32, 16), material);
}

/**
 * The dome's uniforms for a sampleTimeOfDay() result: the display colours as they are, and the sun
 * colour (a linear light colour) encoded for display.
 */
function setSkyUniforms(material, light) {
  const uniforms = material.uniforms;
  uniforms.zen.value.copy(light.zen);
  uniforms.hor.value.copy(light.hor);
  uniforms.sunDir.value.copy(light.sunDir);
  uniforms.sunCol.value.copy(light.sun).convertLinearToSRGB();
}

/**
 * Environment map for scene.environment (see the header). update(hour) captures the probe for
 * hour's quantised step if it is not the one captured last; it returns true when it captured.
 * `quality` sets the cube size (256² on 'high', 128² otherwise).
 */
function createEnvironmentProbe({ renderer, scene, quality }) {
  const pmrem = new PMREMGenerator(renderer);
  const probeScene = new Scene();
  const skyMaterial = createSkyMaterial();
  skyMaterial.uniforms.dither.value = 0;
  probeScene.add(new Mesh(new SphereGeometry(100, 32, 16), skyMaterial));
  const groundMaterial = new MeshBasicMaterial({ color: 0x55604c });
  const ground = new Mesh(new CircleGeometry(90, 32), groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -8;
  probeScene.add(ground);
  const cubeTarget = new WebGLCubeRenderTarget(quality === 'high' ? 256 : 128, {
    type: HalfFloatType,
    generateMipmaps: false,
  });
  const cubeCamera = new CubeCamera(0.1, 200, cubeTarget);
  const light = createTimeOfDaySample();
  let pmremTarget = null;
  let capturedStep = NaN;

  /** Renders the probe for solar hour `hour` (exactly; update() quantises). */
  function capture(hour) {
    sampleTimeOfDay(hour, light);
    const uniforms = skyMaterial.uniforms;
    uniforms.zen.value.copy(light.zen).convertSRGBToLinear();
    uniforms.hor.value.copy(light.hor).convertSRGBToLinear();
    uniforms.sunDir.value.copy(light.sunDir);
    uniforms.sunCol.value.copy(light.sun);
    // the ground below the horizon: its albedo lit by the sun and the sky
    const lit = (light.sunI * Math.max(0, light.sunDir.y) + light.hemiI) / Math.PI;
    groundMaterial.color.copy(light.gnd).multiplyScalar(PROBE_GROUND_GAIN * lit);
    cubeCamera.update(renderer, probeScene);
    pmremTarget = pmrem.fromCubemap(cubeTarget.texture, pmremTarget);
    scene.environment = pmremTarget.texture;
  }

  function update(hour) {
    const step = Math.round(hour / ENV_STEP_HOURS);
    if (step === capturedStep) return false;
    capturedStep = step;
    capture(step * ENV_STEP_HOURS);
    return true;
  }

  return {
    update,
    /** The quantised step captured last (NaN before the first capture). */
    get step() {
      return capturedStep;
    },
  };
}

export {
  ENV_STEP_HOURS,
  SKY_RADIUS,
  createEnvironmentProbe,
  createSkyDome,
  createSkyMaterial,
  setSkyUniforms,
};
