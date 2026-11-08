// createJourney(): assembles the 3D scroll journey (renderer, scene, hero car, extras) and runs the
// frame loop that maps journey progress (0..1, driven by the page's scroll position) to the car,
// the camera, the time of day and the post-processing.
//
// Units and conventions: metres, world XZ ground plane, y up; angles in radians unless noted.
//
// Parts:
//   renderer.js         WebGLRenderer, quality tiers, drawing-buffer sizing, anisotropy/dithering
//   sky.js              sky dome shader, PMREM environment probe
//   lighting.js         sun + hemisphere lights, progress → time of day, shadow box follow
//   progress.js         scroll target → smoothed progress (spring), intro, STAGES
//   car-motion.js       progress → distance along the car path, car kinematics
//   camera-shots.js     camera keyframes; camera-director.js evaluates and applies them
//   crew-staging.js     pit crew, paddock cars and visitors
//   track-highlight.js  red line drawn around the circuit during the aerial shots
//   motion-blur.js      depth-reprojection camera blur on the lap (high quality)
//
// Construction order matters: three.js sorts opaque draws by material id, which is assigned at
// construction, so objects are created in exactly the order of the published build.
import { Fog, PerspectiveCamera, Scene } from 'three';
import { createCameraDirector } from './camera-director.js';
import { CAMERA_SHOTS } from './camera-shots.js';
import { buildCarPath } from './car-path.js';
import { buildHeroCar } from './car/hero-car.js';
import { createRoadHeight } from './car/road-height.js';
import {
  carScheduleKeys,
  computeLandmarks,
  createCarMotion,
  createCarSchedule,
  createPathSampler,
  introRunIn,
} from './car-motion.js';
import {
  createPitCrew,
  placePaddockCars,
  placePaddockVisitors,
  updatePaddockVisitors,
  updatePitCrew,
} from './crew-staging.js';
import {
  applyAtmosphere,
  applyTimeOfDay,
  createLights,
  followWithShadow,
  sunDirection,
  timeOfDayAt,
} from './lighting.js';
import { createMotionBlur, motionBlurAmount, renderWithMotionBlur, tagCarForMask } from './motion-blur.js';
import { STAGES, createProgress } from './progress.js';
import {
  applyAnisotropy,
  createRenderer,
  createViewport,
  enableDithering,
  maxPixelRatioFor,
} from './renderer.js';
import { createEnvironmentProbe, createSkyDome, createSkyMaterial, setSkyUniforms } from './sky.js';
import { sampleTimeOfDay } from './time-of-day.js';
import { createTrackHighlight } from './track-highlight.js';
import { clamp } from './util/math.js';
import { buildWorld } from './world/index.js';

/** Journey positions pre-rendered by warmup() so their shaders and textures are ready. */
const WARMUP_PROGRESS = [0.26, 0.37, 0.47, 0.7, 0.95];

async function createJourney({
  canvas,
  trackUrl,
  carUrl,
  carMetaUrl,
  quality = 'high',
  onProgress = () => {},
}) {
  // --- renderer, scene, camera, sky, lights, environment probe, blur pass ---------------------
  const renderer = createRenderer(canvas, quality);
  const maxPixelRatio = maxPixelRatioFor(quality);
  const scene = new Scene();
  scene.fog = new Fog(14279913, 140, 3300); // metres; the colour follows the time of day
  // near 0.3 m / far 9 km (the sky dome is 8 km); the blur pass reconstructs positions from depth
  const camera = new PerspectiveCamera(36, 1, 0.3, 9e3);
  const skyMaterial = createSkyMaterial();
  scene.add(createSkyDome(skyMaterial));
  const { hemi, sun } = createLights(scene, renderer, quality);
  const environment = createEnvironmentProbe({ renderer, scene, skyMaterial, quality });
  const blur = createMotionBlur(quality);

  // --- data, world, hero car -------------------------------------------------------------------
  const [trackData, carMeta] = await Promise.all([
    fetch(trackUrl).then((res) => res.json()),
    fetch(carMetaUrl).then((res) => res.json()),
  ]);
  onProgress(0.15);
  const track = trackData.pts; // circuit centreline, [x, z] pairs
  const world = buildWorld(track, { quality, renderer });
  scene.add(world.root);
  onProgress(0.35);
  const car = await buildHeroCar(carUrl, carMeta, {
    quality,
    onProgress: (e) => e.total && onProgress(0.35 + (0.55 * e.loaded) / e.total),
  });
  scene.add(car.root);
  tagCarForMask(car.root);
  onProgress(0.92);

  // --- extras ----------------------------------------------------------------------------------
  const highlight = createTrackHighlight(track);
  scene.add(highlight.mesh);
  const openBox = world.root.userData.openBox; // the open pit garage, { x, z }
  const crew = createPitCrew();
  scene.add(...crew.members);
  placePaddockCars(scene);
  const visitors = placePaddockVisitors(scene);

  // --- choreography ----------------------------------------------------------------------------
  const carPath = buildCarPath(track);
  const sampler = createPathSampler(carPath);
  const landmarks = computeLandmarks(carPath, track);
  const distanceAt = createCarSchedule(carScheduleKeys(landmarks));
  // the road surface under the car at the choreography's stops and turning points (raycast once)
  const scheduleDistances = carScheduleKeys(landmarks).map((key) => key[1]);
  const road = createRoadHeight(world.root, sampler, scheduleDistances, car.contacts);
  const carMotion = createCarMotion(car, sampler, landmarks.arrival, { roadHeight: road.heightAt });
  const director = createCameraDirector(camera, CAMERA_SHOTS, carMotion.frame);
  const progress = createProgress();

  // --- frame loop ------------------------------------------------------------------------------
  let lastFrameTime = performance.now();
  let clock = 0; // seconds of frame time since creation (also advances while hidden)
  let running = false;
  let visible = true;
  let rafId = 0;
  let framingX = 0;
  let framingY = 0;
  const viewport = createViewport(canvas, renderer, camera, maxPixelRatio);

  function renderFrame(now) {
    rafId = requestAnimationFrame(renderFrame);
    const dt = Math.min(0.05, (now - lastFrameTime) / 1e3); // seconds, capped
    lastFrameTime = now;
    clock += dt;
    if (!visible) return;
    viewport.update();
    progress.advance(dt);
    const p = progress.value;
    const introEase = progress.introEase;

    // car and extras
    let distance = distanceAt(p);
    if (progress.intro < 1) distance = introRunIn(distance, progress.intro, landmarks);
    carMotion.update(distance, dt, clock);
    updatePitCrew(crew, p, clock, sampler, landmarks.pitBox, openBox);
    updatePaddockVisitors(visitors, p, clock);

    // light
    const timeOfDay = timeOfDayAt(p);
    const light = sampleTimeOfDay(timeOfDay);
    const sunDir = sunDirection(light);
    applyTimeOfDay(light, { sun, hemi });
    setSkyUniforms(skyMaterial, light, sunDir);
    applyAtmosphere(light, { scene, renderer });
    environment.refreshIfNeeded(timeOfDay);

    // camera, then the shadow box around what it looks at
    director.update({
      progress: p,
      introEase,
      clock,
      debugCam: api.debugCam,
      width: viewport.width,
      height: viewport.height,
      framingX,
      framingY,
    });
    followWithShadow(sun, sunDir, director.position, director.target, carMotion.frame.p);

    highlight.update(p);
    world.update(clock, dt);
    renderWithMotionBlur(renderer, scene, camera, blur, motionBlurAmount(blur, p));
  }

  // --- finish setup ----------------------------------------------------------------------------
  // first environment capture: no time of day has been applied yet, so the sky uniforms are
  // still black here
  environment.capture(0);
  applyAnisotropy(scene, renderer, quality);
  enableDithering(scene);
  onProgress(1);

  const api = {
    renderer,
    scene,
    camera,
    car,
    world,
    STAGES,
    /** Scroll target 0..1; the rendered progress follows it with a spring. */
    setProgress(value) {
      progress.target = clamp(value, 0, 1);
    },
    get progress() {
      return progress.value;
    },
    skipIntro() {
      progress.finishIntro();
    },
    /** Moves to `value` without smoothing (and ends the intro). */
    jump(value) {
      progress.target = progress.value = clamp(value, 0, 1);
      progress.velocity = 0;
      carMotion.lastDistance = distanceAt(progress.value);
      progress.finishIntro();
    },
    /** Compiles every shader (hidden objects included) and pre-renders a few positions. */
    async warmup() {
      const hidden = [];
      scene.traverse((node) => {
        if (!node.visible) {
          hidden.push(node);
          node.visible = true;
        }
      });
      try {
        if (renderer.compileAsync && renderer.extensions.has('KHR_parallel_shader_compile'))
          await renderer.compileAsync(scene, camera);
        else renderer.compile(scene, camera);
      } catch {}
      for (const node of hidden) node.visible = false;
      // pre-render a few positions, then restore progress, car distance and intro state; restoring
      // lastDistance is a teleport (car-motion.js), so the car is at rest there on the next frame;
      // the environment map and the blur history are NOT restored
      const saved = [
        progress.value,
        carMotion.lastDistance,
        carMotion.wheelDistance,
        progress.intro,
        progress.introDone,
      ];
      for (const at of WARMUP_PROGRESS) {
        api.renderAt(at);
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      [progress.value, carMotion.lastDistance, carMotion.wheelDistance, progress.intro, progress.introDone] =
        saved;
      progress.target = progress.value;
      progress.velocity = 0;
      carMotion.speed = carMotion.prevSpeed = 0;
      progress.snap = false;
    },
    /** View offset as fractions of the viewport (x shifts the image right, y shifts it up). */
    setFraming(x = 0, y = 0) {
      framingX = x;
      framingY = y;
    },
    start() {
      if (running) return;
      running = true;
      progress.snap = false;
      lastFrameTime = performance.now();
      rafId = requestAnimationFrame(renderFrame);
    },
    stop() {
      running = false;
      cancelAnimationFrame(rafId);
    },
    setVisible(value) {
      visible = value;
    },
    /**
     * Renders one frame at `value` right now, without smoothing. `intro` sets the intro timeline,
     * `speed` overrides the car speed (m/s), `dt` is the frame time in seconds (0 = car at rest).
     */
    renderAt(value, { intro = 1, speed = null, dt = 0 } = {}) {
      progress.target = progress.value = value;
      progress.velocity = 0;
      progress.intro = intro;
      progress.introDone = intro >= 1;
      progress.snap = true;
      if (!dt) carMotion.lastDistance = distanceAt(value); // no distance step → no speed from the jump
      if (speed != null) carMotion.speed = speed;
      lastFrameTime = performance.now() - dt * 1e3;
      renderFrame(performance.now());
      // renderFrame() scheduled a next frame; this is a one-off render
      cancelAnimationFrame(rafId);
    },
    /** Optional camera override for debugging: { pos: [x, y, z], tgt: [x, y, z], fov }. */
    debugCam: null,
    setResScale(value) {
      viewport.resScale = clamp(value, 0.2, 1);
    },
    get resScale() {
      return viewport.resScale;
    },
    get basePixelRatio() {
      return Math.min(window.devicePixelRatio || 1, maxPixelRatio);
    },
  };
  return api;
}

export { createJourney };
