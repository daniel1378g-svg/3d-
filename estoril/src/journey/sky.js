// Sky dome and the scene's image-based lighting.
//
// The sky is a back-faced sphere with a gradient + sun-glow shader whose colours follow the time
// of day. The same material is rendered into a small cube map (with a dark ground disc below),
// prefiltered with PMREM and used as scene.environment, so reflections and IBL match the sky. The
// cube capture is expensive, so it is refreshed only when the time of day has moved far enough
// since the previous capture (createEnvironmentProbe).
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

/** Sky dome radius (metres); the camera's far plane (9000 m) must stay beyond it. */
const SKY_RADIUS = 8e3;

/**
 * Sky gradient from the horizon colour `hor` to the zenith colour `zen`, plus a sun disc and halo
 * in `sunCol` around `sunDir`; below the horizon it fades to a slightly darker horizon colour.
 * The output is display-referred (the blur pass relies on this) and dithered by ±0.5/255.
 * `skyGain` scales the whole sky (1 everywhere at present). No fog: the dome is the fog's backdrop.
 */
function createSkyMaterial() {
  return new ShaderMaterial({
    side: BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      zen: { value: new Color() },
      hor: { value: new Color() },
      sunDir: { value: new Vector3() },
      sunCol: { value: new Color() },
      skyGain: { value: 1 },
    },
    vertexShader:
      'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }',
    fragmentShader: `uniform vec3 zen, hor, sunCol; uniform vec3 sunDir; uniform float skyGain; varying vec3 vP;
      void main(){ float h = clamp(vP.y, -.2, 1.); float k = pow(clamp(h, 0., 1.), .55);
        vec3 c = mix(hor, zen, k);
        float s = max(dot(normalize(vP), normalize(sunDir)), 0.);
        c += sunCol * (pow(s, 380.) * 2.2 + pow(s, 12.) * .22 + pow(s, 3.) * .06 * (1. - k));
        c = mix(c, hor * .92, smoothstep(0., -.2, vP.y));
        gl_FragColor = vec4(c * skyGain + (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - .5) / 255., 1.);
      }`,
  });
}

function createSkyDome(material) {
  return new Mesh(new SphereGeometry(SKY_RADIUS, 32, 16), material);
}

/** Sky colours and sun direction for a sampleTimeOfDay() result (`sunDir`: unit vector to the sun). */
function setSkyUniforms(material, light, sunDir) {
  const uniforms = material.uniforms;
  uniforms.zen.value.set(light.zen);
  uniforms.hor.value.set(light.hor);
  uniforms.sunDir.value.copy(sunDir);
  uniforms.sunCol.value.set(light.sun);
}

/**
 * Environment map for scene.environment: the sky material on a 100 m sphere plus a dark ground
 * disc (r = 90 m) 8 m below the cube camera, captured into a cube map and prefiltered with PMREM.
 *
 * capture(timeOfDay) renders it now with the sky's current uniforms. refreshIfNeeded(timeOfDay)
 * re-captures only when timeOfDay differs from the last captured value by more than
 * `refreshStep`, so the environment seen at a given progress depends on which time of day was
 * captured last (i.e. on the scroll history), not only on the current progress.
 */
function createEnvironmentProbe({ renderer, scene, skyMaterial, quality }) {
  const pmrem = new PMREMGenerator(renderer);
  const probeScene = new Scene();
  const probeSky = new Mesh(new SphereGeometry(100, 32, 16), skyMaterial);
  probeScene.add(probeSky);
  const ground = new Mesh(new CircleGeometry(90, 32), new MeshBasicMaterial({ color: 5595212 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -8;
  probeScene.add(ground);
  const cubeTarget = new WebGLCubeRenderTarget(quality === 'high' ? 256 : 128, {
    type: HalfFloatType,
    generateMipmaps: false,
  });
  const cubeCamera = new CubeCamera(0.1, 200, cubeTarget);
  const refreshStep = quality === 'high' ? 0.025 : 0.04; // time-of-day units
  let pmremTarget = null;
  let capturedAt = -1;

  function capture(timeOfDay) {
    const gain = skyMaterial.uniforms.skyGain.value;
    skyMaterial.uniforms.skyGain.value = 1;
    cubeCamera.update(renderer, probeScene);
    pmremTarget = pmrem.fromCubemap(cubeTarget.texture, pmremTarget);
    scene.environment = pmremTarget.texture;
    capturedAt = timeOfDay;
    skyMaterial.uniforms.skyGain.value = gain;
  }
  function refreshIfNeeded(timeOfDay) {
    if (Math.abs(timeOfDay - capturedAt) > refreshStep) capture(timeOfDay);
  }
  return { capture, refreshIfNeeded };
}

export { createEnvironmentProbe, createSkyDome, createSkyMaterial, setSkyUniforms };
