// createJourney(): assembles the 3D scroll journey (renderer, scene, hero car, extras) and runs the
// frame loop that maps journey progress (0..1, driven by the page's scroll position) to the car,
// the camera, the time of day and the post-processing.
//
// Units and conventions: metres, world XZ ground plane, y up; angles in radians unless noted.
//
// Parts:
//   renderer.js         WebGLRenderer, quality tiers, drawing-buffer sizing, anisotropy/dithering
//   time-of-day.js      progress → solar hour → sun position and lighting palette
//   sky.js              sky dome shader, PMREM environment probe (per solar-hour step)
//   lighting.js         sun + hemisphere lights, exposure, shadow box fitted to the view
//   progress.js         scroll target → smoothed progress (spring), intro, STAGES
//   car-motion.js       progress → distance along the car path, car kinematics
//   camera-shots.js     camera keyframes; camera-director.js evaluates them, frames the subject
//                       in the area the page leaves free and fits the overhead shot
//   depth-range.js      near/far planes from the camera's clearance, every frame
//   crew-staging.js     pit crew, paddock cars and visitors
//   track-highlight.js  red line drawn around the circuit during the aerial shots
//   motion-blur.js      depth-reprojection camera blur on the lap (high quality)
//
// Construction order matters: three.js sorts opaque draws by material id, which is assigned at
// construction, so objects are created in exactly the order of the published build.
import { Fog, PerspectiveCamera, Scene } from 'three';
import { createCameraDirector, createCameraFrame } from './camera-director.js';
import { createDepthRange } from './depth-range.js';
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
import { FOG_FAR, FOG_NEAR, applyLighting, createLights, createShadowFollow, fitFog } from './lighting.js';
import {
  createMotionBlur,
  motionBlurAmount,
  renderWithMotionBlur,
  resetMotionBlur,
  tagCarForMask,
} from './motion-blur.js';
import { STAGES, createProgress } from './progress.js';
import {
  applyAnisotropy,
  createRenderer,
  createViewport,
  enableDithering,
  maxPixelRatioFor,
} from './renderer.js';
import { createEnvironmentProbe, createSkyDome, createSkyMaterial, setSkyUniforms } from './sky.js';
import { createTimeOfDaySample, sampleTimeOfDay, solarHourAt } from './time-of-day.js';
import { createTrackHighlight } from './track-highlight.js';
import { clamp } from './util/math.js';
import { buildWorld } from './world/index.js';

/** renderAt(t, { dt > 0 }) continues the previous frame (blur) only within this progress step. */
const MAX_SEQUENCE_STEP = 0.02;
/** Frame times are capped at this (seconds): a stalled tab does not jump the springs. */
const MAX_FRAME_TIME = 0.05;
/** jump() past this progress ends the intro fly-in (progress.js INTRO_SKIP_PROGRESS). */
const INTRO_END_PROGRESS = 0.01;
/**
 * A still (renderAt with dt 0) is drawn at this scene clock, whatever ran before it: the clock
 * drives the camera's slow bob, the crew's and visitors' idle moves, the flags and the grass.
 */
const STILL_CLOCK = 0;

/** Journey positions pre-rendered by warmup() so their shaders and textures are ready. */
const WARMUP_PROGRESS = [0.26, 0.37, 0.47, 0.7, 0.95];

/**
 * Distance from `eye` to the static scenery (the depth range's index, without the `movers`, which
 * are hidden for the query), for the camera layout: it must not depend on where the car or the crew
 * happen to be when the layout is solved. The depth range sets the camera's near/far as a side
 * effect; the frame's own update follows.
 */
function staticClearance(depthRange, movers, eye, look) {
  const shown = movers.map((mover) => mover.visible);
  for (const mover of movers) mover.visible = false;
  depthRange.update(eye, look);
  movers.forEach((mover, i) => (mover.visible = shown[i]));
  return depthRange.clearance;
}

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
  // metres; the colour follows the time of day, the distances the eye's height (lighting.js)
  scene.fog = new Fog(14279913, FOG_NEAR, FOG_FAR);
  // the blur pass reconstructs positions from depth with each frame's own matrices
  // near/far start at 0.3 m / 9 km and then follow the camera's clearance every frame
  const camera = new PerspectiveCamera(36, 1, 0.3, 9e3);
  const depthRange = createDepthRange(camera);
  const skyMaterial = createSkyMaterial();
  const skyDome = createSkyDome(skyMaterial);
  scene.add(skyDome);
  const { hemi, sun } = createLights(scene, renderer, quality);
  const shadowFollow = createShadowFollow(sun);
  const light = createTimeOfDaySample(); // this frame's time of day (sampleTimeOfDay fills it)
  const environment = createEnvironmentProbe({ renderer, scene, quality });
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
  // world parts that move by integrating the frame time instead of reading the clock: the drifting
  // cloud sprites (world/clouds.js). A still puts them back where they started, as it sets the
  // clock, so it shows the same sky however long the page has been running.
  const drifting = world.root.getObjectByName('clouds')?.children ?? [];
  const driftStart = Float64Array.from(drifting, (cloud) => cloud.position.x);
  const driftSaved = new Float64Array(drifting.length);
  onProgress(0.35);
  const car = await buildHeroCar(carUrl, carMeta, {
    quality,
    onProgress: (e) => e.total && onProgress(0.35 + (0.55 * e.loaded) / e.total),
  });
  scene.add(car.root);
  tagCarForMask(car.root);
  onProgress(0.92);

  // --- extras ----------------------------------------------------------------------------------
  const highlight = createTrackHighlight(world.root.userData.trackModel);
  scene.add(highlight.mesh);
  const openBox = world.root.userData.openBox; // the open pit garage, { x, z }
  const crew = createPitCrew();
  scene.add(...crew.members);
  placePaddockCars(scene);
  const visitors = placePaddockVisitors(scene);
  const movers = [car.root, ...crew.members, ...visitors.map(([person]) => person)];
  depthRange.build(scene, { sky: skyDome, movers });

  // --- choreography ----------------------------------------------------------------------------
  const carPath = buildCarPath(track);
  const sampler = createPathSampler(carPath);
  const landmarks = computeLandmarks(carPath, track);
  const distanceAt = createCarSchedule(carScheduleKeys(landmarks));
  // the road surface under the car at the choreography's stops and turning points (raycast once)
  const scheduleDistances = carScheduleKeys(landmarks).map((key) => key[1]);
  const road = createRoadHeight(world.root, sampler, scheduleDistances, car.contacts);
  const carMotion = createCarMotion(car, sampler, landmarks.arrival, { roadHeight: road.heightAt });
  const cameraFrame = createCameraFrame(sampler); // the car's frame with a smoothed heading
  const keyFrame = createCameraFrame(sampler); // the same where the car is at a shot key (layout only)
  const director = createCameraDirector(camera, CAMERA_SHOTS, cameraFrame, {
    circuit: track,
    carBox: carMeta.bounds,
    frameAt: (at) => keyFrame.update(distanceAt(at)),
    clearanceAt: (eye, look) => staticClearance(depthRange, movers, eye, look),
  });
  const progress = createProgress();

  // --- frame loop ------------------------------------------------------------------------------
  // step(dt, snap) advances and renders one frame; the rAF loop (start/stop) calls it with the
  // measured frame time, renderAt() with the dt it is given, so a still is a function of its
  // arguments and the journey state, not of the wall clock. There is at most one pending rAF (rafId)
  // and only while running.
  let lastFrameTime = 0;
  let clock = 0; // seconds of frame time since creation (also advances while hidden)
  let running = false;
  let visible = true;
  let rafId = 0;
  // the camera's per-frame input (reused): framing areas from setFraming(), see camera-director.js
  const cameraInput = {
    progress: 0,
    introEase: 1,
    clock: 0,
    debugCam: null,
    width: 1,
    height: 1,
    framing: { panel: null, open: null, windows: null, fade: 0 },
  };
  const viewport = createViewport(canvas, renderer, camera, maxPixelRatio);

  function step(dt, snap) {
    clock += dt;
    if (viewport.update()) resetMotionBlur(blur); // a resize is a cut for the blur
    progress.advance(dt, snap);
    const p = progress.value;
    const introEase = progress.introEase;

    // car and extras
    let distance = distanceAt(p);
    if (progress.intro < 1) distance = introRunIn(distance, progress.intro, landmarks);
    carMotion.update(distance, dt, clock);
    cameraFrame.update(distance);
    updatePitCrew(crew, p, clock, sampler, landmarks.pitBox, openBox);
    updatePaddockVisitors(visitors, p, clock);

    // light: the solar hour at this progress sets the sun, sky, fog, exposure and environment map
    const hour = solarHourAt(p);
    sampleTimeOfDay(hour, light);
    applyLighting(light, { sun, hemi, scene, renderer });
    setSkyUniforms(skyMaterial, light);
    environment.update(hour);

    // camera, then the shadow box around what it looks at
    cameraInput.progress = p;
    cameraInput.introEase = introEase;
    cameraInput.clock = clock;
    cameraInput.debugCam = api.debugCam;
    cameraInput.width = viewport.width;
    cameraInput.height = viewport.height;
    director.update(cameraInput);
    depthRange.update(director.position, director.target);
    fitFog(scene.fog, director.position.y);
    camera.updateMatrixWorld();
    shadowFollow.update(light.sunDir, camera, director.target);

    highlight.update(p, dt, snap, api.basePixelRatio * viewport.resScale);
    world.update(clock, dt);
    const blurAmount = motionBlurAmount(blur, p, director.position.y - cameraFrame.p.y);
    renderWithMotionBlur(renderer, scene, camera, blur, blurAmount);
  }

  function loop(now) {
    rafId = 0;
    if (!running) return;
    rafId = requestAnimationFrame(loop);
    const dt = Math.min(MAX_FRAME_TIME, Math.max(0, (now - lastFrameTime) / 1e3));
    lastFrameTime = now;
    if (visible) step(dt, false);
    else clock += dt;
  }

  /** The state warmup() changes and restores, and debugState() reports. */
  function saveState() {
    return {
      progress: progress.value,
      target: progress.target,
      velocity: progress.velocity,
      intro: progress.intro,
      introDone: progress.introDone,
      clock,
      carDistance: carMotion.lastDistance,
      wheelDistance: carMotion.wheelDistance,
      speed: carMotion.speed,
      prevSpeed: carMotion.prevSpeed,
      drift: drifting.reduce((sum, cloud) => sum + cloud.position.x, 0),
    };
  }

  // --- finish setup ----------------------------------------------------------------------------
  // the environment map of the first position, before the shaders compile against it
  environment.update(solarHourAt(0));
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
    /**
     * Cuts to `value` without smoothing (the car is placed there at rest, the blur forgets the last
     * frame). A cut past the arrival (value > INTRO_END_PROGRESS: a stage reached by scrolling while
     * the scene was stopped, a deep link) ends the intro at once, since a cut has no motion to
     * continue; a cut to the top of the journey keeps it, so the fly-in plays when the page opens at
     * the arrival (home.js skips it with reduced motion). Scrolling during the fly-in (the stage
     * buttons included) does not cut it: it plays out faster (progress.js).
     */
    jump(value) {
      progress.target = progress.value = clamp(value, 0, 1);
      progress.velocity = 0;
      carMotion.lastDistance = distanceAt(progress.value);
      if (progress.value > INTRO_END_PROGRESS) progress.finishIntro();
      resetMotionBlur(blur);
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
      // pre-render a few positions (stills: no time passes), then put back everything they changed,
      // so the next frame is the one a journey that never warmed up would draw: the progress, intro
      // and clock; the car (restoring lastDistance is a teleport, car-motion.js: at rest there on the
      // next update); the environment map and the red line of this position; no blur history
      const saved = saveState();
      for (let i = 0; i < drifting.length; i++) driftSaved[i] = drifting[i].position.x;
      for (const at of WARMUP_PROGRESS) {
        api.renderAt(at);
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      progress.value = saved.progress;
      progress.target = saved.target;
      progress.velocity = saved.velocity;
      progress.intro = saved.intro;
      progress.introDone = saved.introDone;
      clock = saved.clock;
      carMotion.lastDistance = saved.carDistance;
      carMotion.wheelDistance = saved.wheelDistance;
      carMotion.speed = saved.speed;
      carMotion.prevSpeed = saved.prevSpeed;
      for (let i = 0; i < drifting.length; i++) drifting[i].position.x = driftSaved[i];
      environment.update(solarHourAt(progress.value));
      highlight.update(progress.value, 0, true, api.basePixelRatio * viewport.resScale);
      resetMotionBlur(blur);
    },
    /**
     * Where the subject goes on screen. `areas` = { panel, open, windows, fade }: [left, top, right,
     * bottom] fractions of the viewport left free while a stage panel is shown (car shots) and with
     * no panel (aerial), and optionally the panels' progress windows ([[from, to], …]) and fade
     * length, which time the move between the two (camera-director.js; defaults:
     * camera-shots.js PANEL_WINDOWS, PANEL_FADE). Without `areas`, (x, y) shift the subject from the
     * centre as fractions of the viewport (x right, y up), as before.
     */
    setFraming(x = 0, y = 0, areas = null) {
      const framing = cameraInput.framing;
      if (areas) {
        framing.panel = areas.panel;
        framing.open = areas.open || areas.panel;
        if (areas.windows) framing.windows = areas.windows;
        if (areas.fade) framing.fade = areas.fade;
        return;
      }
      const cx = 0.5 + clamp(x, -0.4, 0.4);
      const cy = 0.5 - clamp(y, -0.4, 0.4);
      const hx = Math.min(cx, 1 - cx) - 0.02;
      const hy = Math.min(cy, 1 - cy) - 0.02;
      framing.panel = [cx - hx, cy - hy, cx + hx, cy + hy];
      framing.open = null;
    },
    /** Starts the render loop (one rAF chain; a second start() does nothing). */
    start() {
      if (running) return;
      running = true;
      resetMotionBlur(blur); // the first frame after a pause is a cut
      lastFrameTime = performance.now();
      if (!rafId) rafId = requestAnimationFrame(loop);
    },
    /** Stops the render loop: the pending frame is cancelled. */
    stop() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    },
    setVisible(value) {
      if (value && !visible) resetMotionBlur(blur);
      visible = value;
    },
    /**
     * Renders one frame at `value` (clamped to 0..1) right now, without smoothing, and leaves the
     * render loop as it is (running or not). `intro` sets the intro timeline, `speed` overrides the
     * car speed (m/s), `dt` is the frame time in seconds (clamped to 0..MAX_FRAME_TIME): with dt 0 the
     * frame is a still (car at rest, the clock at STILL_CLOCK, the clouds where they started, no
     * blur), so the same call gives the same pixels whatever was rendered or played before; with
     * dt > 0 it is the next frame of a sequence (the clock advances by dt, the car moves from the last
     * frame's position, the blur reprojects the last frame) unless the step is longer than
     * MAX_SEQUENCE_STEP, which counts as a cut for the blur.
     */
    renderAt(value, { intro = 1, speed = null, dt = 0 } = {}) {
      const at = clamp(Number(value) || 0, 0, 1);
      const frameTime = clamp(Number(dt) || 0, 0, MAX_FRAME_TIME);
      if (!frameTime || Math.abs(at - progress.value) > MAX_SEQUENCE_STEP) resetMotionBlur(blur);
      progress.target = progress.value = at;
      progress.velocity = 0;
      progress.intro = clamp(intro, 0, 1);
      progress.introDone = progress.intro >= 1;
      if (!frameTime) {
        carMotion.lastDistance = distanceAt(at); // a teleport: no speed from the jump
        clock = STILL_CLOCK;
        for (let i = 0; i < drifting.length; i++) drifting[i].position.x = driftStart[i];
      }
      if (speed != null) carMotion.speed = speed;
      step(frameTime, true);
    },
    /** The journey state warmup() restores, plus the environment step and the blur history (tests). */
    debugState() {
      return {
        ...saveState(),
        envStep: environment.step,
        blurHistory: blur ? blur.hasPrev : null,
        highlight: [highlight.mesh.visible, highlight.mesh.material.opacity],
        running,
        pendingFrame: rafId !== 0,
        framing: { panel: cameraInput.framing.panel, open: cameraInput.framing.open },
      };
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
