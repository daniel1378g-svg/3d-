// The 3D engine behind the page: one WebGL canvas that is moved between the configurator and the interior
// sequence, one garage, the two vehicles. Renders only when something changes, pauses when it is not shown.
import * as THREE from 'three';
import { createStage } from './stage.js';
import { createPaint, applyPaint } from './materials.js';
import { loadPack, canInflate } from './loader.js';
import { setupCar, setupBike } from './vehicles.js';
import { createCabin } from './cabin.js';
import cabinData from './cabin-data.js';
import { poseAt, PHASES, AMBIENT_READY, STILLS } from './experience.js';

export { PHASES, AMBIENT_READY, STILLS };

export function detectTier() {
  const ua = navigator.userAgent || '';
  const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua) || (navigator.maxTouchPoints > 1 && Math.min(screen.width, screen.height) < 900);
  const cores = navigator.hardwareConcurrency || 4, memory = navigator.deviceMemory || 4;
  if (mobile) return cores <= 4 || memory <= 3 ? 'low' : 'mid';
  return cores <= 2 ? 'mid' : 'high';
}

export function isSupported() {
  if (!canInflate) return false;
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2')); } catch { return false; }
}

const DPR_CAP = { low: 1.25, mid: 1.6, high: 2 };
const DEFAULT_AZ = -0.72;
const TAU = Math.PI * 2;

/**
 * @param {{ tier?: string, reducedMotion?: boolean, modelBase?: string, onState?: (e: object) => void, pixelRatio?: number }} options
 */
export function createScene({ tier = detectTier(), reducedMotion = false, instant = false, modelBase = 'models/', onState = () => {}, pixelRatio } = {}) {
  const canvas = document.createElement('canvas');
  canvas.className = 'gl';
  canvas.setAttribute('aria-hidden', 'true');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', alpha: false, stencil: false });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = tier === 'high';
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;

  const stage = createStage(THREE, renderer, { tier });
  const scene = stage.scene;
  const camera = new THREE.PerspectiveCamera(32, 1, 0.05, 70);
  const look = new THREE.Vector3();

  const paints = { car: createPaint(THREE), bike: createPaint(THREE) };
  const paintSpec = { hex: '#1b2f8f', finish: 'gloss', effect: 'solid' };
  const paintGoal = new THREE.Color(paintSpec.hex);
  for (const p of Object.values(paints)) applyPaint(p, paintSpec);

  const vehicles = { car: null, bike: null };
  const pending = {};
  let cabin = null;
  let mode = null, host = null, vehicle = 'car';
  let running = false, raf = 0, dirty = true, lastTime = 0, shown = { config: false, interior: false };
  let width = 1, height = 1, scale = 1, slowFrames = 0, fastFrames = 0;
  const clock = { time: 0 };

  // Configurator orbit
  const orbit = { az: DEFAULT_AZ, goal: null, vel: 0, auto: !reducedMotion && !instant, dragging: false, lastX: 0, lastT: 0, dist: 7, distGoal: 7, targetY: 0.62, targetYGoal: 0.62 };
  // Interior sequence
  const seq = { p: 0, goal: 0, color: '#3d6bff', brightness: 0.85 };
  const pose = { pos: [0, 0, 0], look: [0, 0, 0] };

  const invalidate = () => { dirty = true; if (running && !raf) raf = requestAnimationFrame(frame); };
  const shadowsDirty = () => { if (renderer.shadowMap.enabled) renderer.shadowMap.needsUpdate = true; };

  function load(kind) {
    if (pending[kind]) return pending[kind];
    const file = kind === 'car' ? 'm4.json' : 's1000.json';
    pending[kind] = loadPack(modelBase + file, (f) => onState({ type: 'progress', what: kind, value: f })).then(({ scene: model, meta }) => {
      const v = kind === 'car' ? setupCar(model, meta, { paint: paints.car, environment: scene.environment }) : setupBike(model, meta, { paint: paints.bike, environment: scene.environment });
      v.group.traverse((o) => { if (o.isMesh) { o.castShadow = !o.material.transparent; o.frustumCulled = true; } });
      v.group.visible = false;
      scene.add(v.group);
      vehicles[kind] = v;
      if (kind === 'car') { cabin = createCabin(v, cabinData, { tier, reducedMotion }); cabin.setAmbient({ color: seq.color, level: 0, reveal: 0, brightness: seq.brightness }); }
      renderer.compile(scene, camera);
      syncVisibility();
      onState({ type: 'loaded', what: kind, meta });
      invalidate();
      return v;
    }).catch((error) => { pending[kind] = null; onState({ type: 'error', what: kind, error }); throw error; });
    return pending[kind];
  }

  function syncVisibility() {
    const showCar = mode === 'interior' || vehicle === 'car';
    if (vehicles.car) vehicles.car.group.visible = showCar;
    if (vehicles.bike) vehicles.bike.group.visible = !showCar && mode === 'config';
    const active = showCar ? vehicles.car : vehicles.bike;
    stage.contactShadow.visible = !!active;
    if (active) stage.setFootprint(...active.footprint);
    if (mode === 'config') {
      vehicles.car?.setDoorOpen(0);
      cabin?.setAmbient({ level: 0, reveal: 0 });
      cabin?.setStars(0);
      cabin?.setFill(0);
    }
    shadowsDirty();
    fitOrbit(true);
  }

  function fitOrbit(snap) {
    const aspect = width / height;
    const fov = THREE.MathUtils.clamp(30 + (1.6 - aspect) * 16, 30, 44);
    const half = vehicle === 'car' ? 2.56 : 1.18, tall = vehicle === 'car' ? 0.9 : 0.78;
    const tv = Math.tan(THREE.MathUtils.degToRad(fov) / 2);
    orbit.fov = fov;
    orbit.distGoal = Math.min(8.1, Math.max(half / (tv * aspect), tall / tv) * 1.1);
    orbit.targetYGoal = vehicle === 'car' ? 0.6 : 0.56;
    if (snap) { orbit.dist = orbit.distGoal; orbit.targetY = orbit.targetYGoal; }
  }

  function resize() {
    if (!host) return;
    const r = host.getBoundingClientRect();
    width = Math.max(1, Math.round(r.width)); height = Math.max(1, Math.round(r.height));
    const dpr = pixelRatio || Math.min(window.devicePixelRatio || 1, DPR_CAP[tier]) * scale;
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    fitOrbit(false);
    invalidate();
  }
  const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(resize) : null;

  function frame(now) {
    raf = 0;
    if (!running) return;
    const dt = Math.min(0.05, lastTime ? (now - lastTime) / 1000 : 0.016);
    lastTime = now;
    clock.time += dt;
    let animating = false;

    // Wrap colour eases to its target.
    for (const p of Object.values(paints)) {
      if (!p.color.equals(paintGoal)) {
        p.color.lerp(paintGoal, 1 - Math.exp(-dt * 14));
        if (Math.abs(p.color.r - paintGoal.r) + Math.abs(p.color.g - paintGoal.g) + Math.abs(p.color.b - paintGoal.b) < 0.004) p.color.copy(paintGoal);
        animating = true;
      }
    }

    if (mode === 'config') {
      if (orbit.goal !== null) {
        orbit.az += (orbit.goal - orbit.az) * (reducedMotion || instant ? 1 : 1 - Math.exp(-dt * 7));
        if (Math.abs(orbit.goal - orbit.az) < 0.002) { orbit.az = orbit.goal; orbit.goal = null; }
        animating = true;
      } else if (!orbit.dragging) {
        if (Math.abs(orbit.vel) > 0.01) { orbit.az += orbit.vel * dt; orbit.vel *= Math.exp(-dt * 3.2); animating = true; }
        else if (orbit.auto && vehicles[vehicle]) { orbit.az += dt * 0.14; animating = true; }
      }
      if (Math.abs(orbit.dist - orbit.distGoal) > 0.002 || Math.abs(orbit.targetY - orbit.targetYGoal) > 0.002) {
        const k = reducedMotion ? 1 : 1 - Math.exp(-dt * 6);
        orbit.dist += (orbit.distGoal - orbit.dist) * k; orbit.targetY += (orbit.targetYGoal - orbit.targetY) * k;
        animating = true;
      }
      const el = 0.15;
      camera.fov = orbit.fov;
      camera.position.set(orbit.dist * Math.cos(el) * Math.cos(orbit.az), orbit.targetY + orbit.dist * Math.sin(el), orbit.dist * Math.cos(el) * Math.sin(orbit.az));
      camera.lookAt(look.set(0, orbit.targetY, 0));
    } else if (mode === 'interior') {
      if (Math.abs(seq.goal - seq.p) > 0.00015) {
        seq.p += (seq.goal - seq.p) * (reducedMotion || instant ? 1 : 1 - Math.exp(-dt * 6.5));
        animating = true;
      } else seq.p = seq.goal;
      poseAt(seq.p, camera.aspect, pose);
      camera.fov = pose.fov;
      camera.position.fromArray(pose.pos);
      camera.lookAt(look.fromArray(pose.look));
      if (vehicles.car) {
        const before = vehicles.car.doorLeft.rotation.y;
        vehicles.car.setDoorOpen(pose.door);
        if (before !== vehicles.car.doorLeft.rotation.y) shadowsDirty();
        cabin.setFill(pose.fill);
        cabin.setAmbient({ level: pose.ambient > 0 ? 1 : 0, reveal: pose.ambient });
        cabin.setStars(pose.stars);
        cabin.update(clock.time, renderer.domElement.height, camera.fov, renderer.getPixelRatio());
        if (cabin.animating) animating = true;
      }
    }
    camera.near = mode === 'interior' && pose.inside ? 0.04 : 0.2;
    camera.updateProjectionMatrix();

    if (dirty || animating) {
      const t0 = performance.now();
      renderer.render(scene, camera);
      dirty = false;
      const ready = mode && !shown[mode] && (mode === 'interior' ? vehicles.car : vehicles[vehicle]);
      if (ready) { shown[mode] = true; onState({ type: 'ready', mode }); }
      // Keep the frame rate up on slow GPUs by shedding resolution.
      if (animating && !pixelRatio) {
        const cost = performance.now() - t0 + dt * 1000;
        if (dt > 0.034) { slowFrames++; fastFrames = 0; } else { fastFrames++; slowFrames = Math.max(0, slowFrames - 1); }
        if (slowFrames > 24 && scale > 0.6) { scale = Math.max(0.6, scale - 0.15); slowFrames = 0; resize(); void cost; }
      }
    }
    if (animating || dirty) raf = requestAnimationFrame(frame);
  }

  function setRunning(on) {
    if (on === running) return;
    running = on;
    lastTime = 0;
    if (on) invalidate(); else if (raf) { cancelAnimationFrame(raf); raf = 0; }
  }
  const onVisibility = () => setRunning(!!mode && !document.hidden);
  document.addEventListener('visibilitychange', onVisibility);

  // Pointer rotation (configurator only). touch-action: pan-y on the canvas leaves vertical scrolling to the page.
  const onDown = (e) => {
    if (mode !== 'config' || (e.pointerType === 'mouse' && e.button !== 0)) return;
    orbit.dragging = true; orbit.auto = false; orbit.goal = null; orbit.vel = 0; orbit.lastX = e.clientX; orbit.lastT = performance.now();
    try { canvas.setPointerCapture(e.pointerId); } catch { /* not capturable */ }
    canvas.classList.add('dragging');
    onState({ type: 'interact' });
  };
  const onMove = (e) => {
    if (!orbit.dragging) return;
    const now = performance.now(), dx = e.clientX - orbit.lastX, dtm = Math.max(1, now - orbit.lastT);
    const d = (dx / Math.max(240, width)) * Math.PI * 1.25;
    orbit.az += d;
    orbit.vel = orbit.vel * 0.6 + (d / dtm) * 1000 * 0.4;
    orbit.lastX = e.clientX; orbit.lastT = now;
    invalidate();
  };
  const onUp = () => {
    if (!orbit.dragging) return;
    orbit.dragging = false;
    if (performance.now() - orbit.lastT > 120 || reducedMotion) orbit.vel = 0;
    orbit.vel = THREE.MathUtils.clamp(orbit.vel, -5, 5);
    canvas.classList.remove('dragging');
    onState({ type: 'angle', degrees: api.getAngle() });
    invalidate();
  };
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', onUp);
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); setRunning(false); onState({ type: 'contextlost' }); });

  const api = {
    canvas, tier, renderer,
    /** Show the scene inside `element` as the configurator ('config') or the interior sequence ('interior'). */
    attach(element, nextMode) {
      if (host === element && mode === nextMode) return;
      if (observer && host) observer.unobserve(host);
      host = element; mode = nextMode;
      canvas.style.touchAction = mode === 'config' ? 'pan-y' : 'auto';
      canvas.style.pointerEvents = mode === 'config' ? 'auto' : 'none';
      host.prepend(canvas);
      observer?.observe(host);
      resize();
      syncVisibility();
      load(mode === 'interior' ? 'car' : vehicle).catch(() => {});
      setRunning(!document.hidden);
      invalidate();
    },
    detach() {
      if (observer && host) observer.unobserve(host);
      setRunning(false);
      mode = null; host = null;
      canvas.remove();
    },
    preload(kind) { return load(kind).catch(() => null); },
    isShown(m) { return shown[m]; },

    setVehicle(kind) {
      if (kind === vehicle) return;
      vehicle = kind; shown.config = false;
      syncVisibility();
      load(kind).catch(() => {});
      invalidate();
    },
    /** { hex, finish, effect } — applies to both vehicles, so the choice survives switching. */
    setPaint(spec, immediate) {
      Object.assign(paintSpec, spec);
      paintGoal.set(paintSpec.hex);
      for (const p of Object.values(paints)) { applyPaint(p, { finish: paintSpec.finish, effect: paintSpec.effect }); if (immediate || reducedMotion) p.color.copy(paintGoal); }
      invalidate();
    },
    rotateBy(degrees) { orbit.auto = false; orbit.vel = 0; orbit.goal = (orbit.goal ?? orbit.az) + THREE.MathUtils.degToRad(degrees); invalidate(); onState({ type: 'angle', degrees: api.getAngle(orbit.goal) }); },
    resetView() {
      orbit.auto = false; orbit.vel = 0;
      const turns = Math.round((orbit.az - DEFAULT_AZ) / TAU);
      orbit.goal = DEFAULT_AZ + turns * TAU;
      invalidate(); onState({ type: 'angle', degrees: api.getAngle(orbit.goal) });
    },
    setAngle(degrees) { orbit.auto = false; orbit.vel = 0; orbit.goal = null; orbit.az = THREE.MathUtils.degToRad(degrees); invalidate(); },
    /** Viewing angle in degrees, 0…359, 0 = from the front. */
    getAngle(az = orbit.az) { return Math.round((((THREE.MathUtils.radToDeg(az) % 360) + 360) % 360)); },
    setAutoRotate(on) { orbit.auto = on && !reducedMotion; invalidate(); },

    setProgress(p, immediate) { seq.goal = THREE.MathUtils.clamp(p, 0, 1); if (immediate) seq.p = seq.goal; invalidate(); },
    getProgress() { return seq.p; },
    /** For tests: door opening 0..1 and lighting levels as currently drawn. */
    getState() { return { mode, vehicle, progress: seq.p, door: vehicles.car ? -vehicles.car.doorLeft.rotation.y / THREE.MathUtils.degToRad(62) : 0, ambient: pose.ambient || 0, stars: pose.stars || 0, angle: api.getAngle(), paint: '#' + paints.car.color.getHexString(), finish: paintSpec.finish, effect: paintSpec.effect, tier }; },
    setAmbientColor(hex) { seq.color = hex; cabin?.setAmbient({ color: hex }); invalidate(); },
    setAmbientBrightness(b) { seq.brightness = b; cabin?.setAmbient({ brightness: b }); invalidate(); },

    renderNow() { dirty = true; frame(performance.now()); },
    dispose() {
      setRunning(false);
      document.removeEventListener('visibilitychange', onVisibility);
      observer?.disconnect();
      stage.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
  return api;
}
