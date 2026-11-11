// Boot, game loop and the glue between the simulation, the 3D world and the interface.
import { loadSection } from './data/pack.js';
import { RoadNet } from './sim/roadnet.js';
import { createStatics } from './sim/statics.js';
import { createVehicle, stepVehicle, applyAction } from './sim/vehicle.js';
import { createLocator } from './sim/locate.js';
import { createTraffic } from './sim/traffic.js';
import { createExam } from './sim/exam.js';
import { LAWBOOK, PHRASES, CHECKLIST, MINOR_LIMIT } from './sim/lawbook.js';
import { createWorld } from './render/world.js';
import { createInput } from './ui/input.js';
import { createHud } from './ui/hud.js';
import { createScreens } from './ui/screens.js';
import { createAudio } from './ui/audio.js';

const STEP = 1 / 60;
const EYE = { left: 0.36, forward: 0.1, height: 1.2 };           // driver's eye relative to the car's centre
const BOOK = {
  ...LAWBOOK,
  TOO_MANY_MINOR: {
    severity: 'serious', title: 'Too many minor faults', cz: 'Opakované drobné chyby',
    what: `You collected ${MINOR_LIMIT} minor faults during the drive.`,
    rule: 'One small slip is forgiven. Repeated ones show the examiner that you are not yet driving safely on your own. The real exam has no fixed number, only pass or fail on the whole drive; this mock ends at four.',
    law: '§ 39 odst. 2 zákona č. 247/2000 Sb.; § 19 odst. 4 vyhlášky č. 167/2002 Sb.',
  },
};
const SEVERITY = Object.fromEntries(Object.entries(BOOK).map(([k, v]) => [k, v.severity]));
const LABEL = Object.fromEntries(CHECKLIST.map((c) => [c.id, c.en]));

const root = document.getElementById('game');
const canvas = document.getElementById('view');
const audio = createAudio();
const hud = createHud(root);
let input = null, world = null, net = null, statics = null, screens = null;
let settings = { steering: 'pad', sensitivity: 1, mirrors: true, showLimit: true, voice: true, sound: true, quality: 'medium', minimap: true };
let run = null;                                                  // the drive in progress
let state = 'loading';                                           // loading | menu | driving | paused | result
let lastOptions = null;

const frame = {
  t: 0, eye: { x: 0, y: EYE.height, z: 0, heading: 0, yaw: 0, pitch: 0 }, mirrors: [],
  cars: { n: 0, x: new Float32Array(64), z: new Float32Array(64), heading: new Float32Array(64), variant: new Uint8Array(64), colour: new Uint32Array(64), state: new Uint8Array(64) },
  trams: { n: 0, x: new Float32Array(12), z: new Float32Array(12), heading: new Float32Array(12) },
  peds: { n: 0, x: new Float32Array(48), z: new Float32Array(48), heading: new Float32Array(48), phase: new Float32Array(48) },
  player: { visible: false },
};

// ---- screens --------------------------------------------------------------------------------------
const handlers = {
  onStart(options) { audio.unlock(); applySettings(options.settings); startDrive(options, (Date.now() & 0xfffff) + 1); },
  onResume() { if (state === 'paused') { state = 'driving'; screens.hide(); input.setEnabled(true); } },
  onRetry() { if (lastOptions) startDrive(lastOptions, run ? run.seed : 1); },
  onNewRoute() { if (lastOptions) startDrive(lastOptions, (Date.now() & 0xfffff) + 1); },
  onMenu() { showMenu(); },
  onSettings(s) { applySettings(s); },
  drawResultMap,
};

function applySettings(s) {
  if (!s) return;
  const quality = s.quality !== settings.quality;
  settings = { ...settings, ...s };
  if (input) input.setSettings(settings);
  if (world && quality) world.setQuality(settings.quality);
  audio.setEnabled(settings.sound);
  if (audio.setVoice) audio.setVoice(settings.voice);
}

function showMenu() {
  state = 'menu';
  run = null;
  hud.setVisible(false);
  if (input) input.setEnabled(false);
  audio.engine(0, 0, false);
  screens.showMenu({
    places: net.places.map((p) => ({ id: p.id, name: p.name, note: p.note })),
    durations: [10, 20, 30],
    defaults: { mode: 'exam', placeId: net.places[0].id, duration: 20, traffic: 'normal', settings },
  });
}

async function startDrive(options, seed) {
  lastOptions = options;
  state = 'loading';
  screens.showLoading(0.1, 'Preparing the route');
  const traffic = createTraffic({ net, seed, density: options.traffic });
  const exam = createExam({ net, statics, traffic, seed, mode: options.mode, duration: options.duration * 60, placeId: options.placeId, minorLimit: MINOR_LIMIT, severities: SEVERITY });
  const car = createVehicle(exam.start);
  const locator = createLocator(net);
  locator.update(car);
  run = { seed, options, traffic, exam, car, locator, t: 0, acc: 0, said: '', mapTick: 0, slow: 0 };
  try {
    await world.prewarm(car.x, car.z);
  } catch (err) { console.error(err); }
  screens.hide();
  hud.setVisible(true);
  input.setEnabled(true);
  state = 'driving';
  try { if (navigator.wakeLock) navigator.wakeLock.request('screen').catch(() => {}); } catch { /* optional */ }
}

// ---- simulation -----------------------------------------------------------------------------------
function simulate(dt) {
  const { car, traffic, exam, locator } = run;
  for (const a of input.takeActions()) {
    if (a === 'pause') { pause(); return; }
    if (a === 'horn') { audio.horn(true); setTimeout(() => audio.horn(false), 350); continue; }
    applyAction(car, a);
  }
  stepVehicle(car, input.state, dt);
  locator.update(car);
  traffic.step(dt, run.t, car, locator.loc);
  exam.step(dt, run.t, car, locator.loc, input.state);
  run.t += dt;
  for (const f of exam.takeFaults()) {
    const entry = BOOK[f.code];
    hud.toast({ text: entry ? entry.title + (f.note ? `: ${f.note}` : '') : f.code, severity: f.severity });
    audio.chime(f.severity === 'serious' ? 'serious' : 'minor');
  }
  if (exam.result && state === 'driving') finishDrive();
}

function finishDrive() {
  const { exam } = run;
  state = 'result';
  input.setEnabled(false);
  audio.engine(0, 0, false);
  audio.chime(exam.result.passed ? 'pass' : 'serious');
  const line = PHRASES[exam.instruction ? exam.instruction.key : 'failed'];
  if (line && settings.voice) audio.speak(line.cz, 'cs-CZ');
  setTimeout(() => { if (state === 'result') { hud.setVisible(false); screens.showResult(exam.result, BOOK); } }, exam.result.passed ? 900 : 1600);
}

function pause() {
  if (state !== 'driving') return;
  state = 'paused';
  input.setEnabled(false);
  audio.engine(0, 0, false);
  screens.showPause();
}

// ---- drawing --------------------------------------------------------------------------------------
function mirrorRects() {
  frame.mirrors.length = 0;
  if (!settings.mirrors) return;
  const box = canvas.getBoundingClientRect();
  for (const [id, yaw, fov] of [['mirror-rear', Math.PI, 26], ['mirror-left', -2.72, 22]]) {
    const el = document.getElementById(id);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 8 || r.height < 8) continue;
    if (r.right < box.left || r.left > box.right || r.bottom < box.top || r.top > box.bottom) continue;
    frame.mirrors.push({ x: r.left - box.left, y: r.top - box.top, w: r.width, h: r.height, yaw, fov });
  }
}

function draw() {
  const { car, traffic, exam } = run;
  const fx = Math.sin(car.heading), fz = -Math.cos(car.heading);
  frame.t = run.t;
  frame.eye.x = car.x + fx * EYE.forward + fz * EYE.left;        // (fz, -fx) points to the car's left
  frame.eye.z = car.z + fz * EYE.forward - fx * EYE.left;
  frame.eye.y = EYE.height;
  frame.eye.heading = car.heading;
  frame.eye.yaw = input.state.lookYaw * 1.75;
  frame.eye.pitch = input.state.lookPitch * 0.45 + car.pitch;
  mirrorRects();
  traffic.fill(frame);
  world.render(frame);

  hud.update(car, exam.info);
  const ins = exam.instruction;
  const key = ins ? `${ins.key}:${ins.quiet ? 1 : 0}` : '';
  if (ins) {
    const line = PHRASES[ins.key] || { cz: '', en: '' };
    hud.setInstruction({ cz: line.cz, en: line.en, icon: ins.icon, distance: ins.distance, quiet: !!ins.quiet });
    if (key !== run.said && !ins.quiet) { audio.chime('instruction'); if (settings.voice) audio.speak(line.cz, 'cs-CZ'); }
  } else hud.setInstruction(null);
  run.said = key;
  hud.setChecklist(exam.state === 'predrive' ? exam.checklist.map((c) => ({ id: c.id, label: LABEL[c.id] || c.id, done: c.done })) : null);
  audio.engine(car.rpm, car.throttle, car.engineOn);
  if (settings.minimap && hud.minimap && run.mapTick++ % 5 === 0) drawMinimap(hud.minimap, car);
}

function drawMinimap(cv, car) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const size = Math.round((cv.clientWidth || 110) * dpr);
  if (cv.width !== size) { cv.width = size; cv.height = size; }
  const g = cv.getContext('2d');
  const R = 140, k = size / (2 * R);
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.clearRect(0, 0, size, size);
  g.translate(size / 2, size * 0.62);
  g.rotate(-car.heading);
  g.scale(k, k);
  g.translate(-car.x, -car.z);
  g.lineCap = 'round'; g.lineJoin = 'round';
  for (const c of net.candidates(car.x, car.z, 185)) {
    const e = c.e;
    g.beginPath();
    for (let p = net.edgePt[e]; p < net.edgePt[e + 1]; p++) { if (p === net.edgePt[e]) g.moveTo(net.ptX[p], net.ptZ[p]); else g.lineTo(net.ptX[p], net.ptZ[p]); }
    g.lineWidth = Math.max(4, net.width[e]);
    g.strokeStyle = net.rank[e] === 0 ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.78)';
    g.stroke();
  }
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.translate(size / 2, size * 0.62);
  g.fillStyle = '#f7c600';
  g.beginPath(); g.moveTo(0, -7 * dpr); g.lineTo(5 * dpr, 6 * dpr); g.lineTo(0, 3 * dpr); g.lineTo(-5 * dpr, 6 * dpr); g.closePath(); g.fill();
}

// The driven line with every fault marked, over the streets around it.
function drawResultMap(cv, result) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.round((cv.clientWidth || 320) * dpr), h = Math.round((cv.clientHeight || 240) * dpr);
  cv.width = w; cv.height = h;
  const g = cv.getContext('2d');
  const path = result.path;
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  const grow = (x, z) => { if (x < minX) minX = x; if (x > maxX) maxX = x; if (z < minZ) minZ = z; if (z > maxZ) maxZ = z; };
  for (let i = 0; i < path.length; i += 2) grow(path[i], path[i + 1]);
  for (const f of result.faults) grow(f.x, f.z);
  if (!Number.isFinite(minX)) { minX = -200; maxX = 200; minZ = -200; maxZ = 200; }
  const pad = 80;
  minX -= pad; maxX += pad; minZ -= pad; maxZ += pad;
  const k = Math.min(w / (maxX - minX), h / (maxZ - minZ));
  const ox = (w - (maxX - minX) * k) / 2 - minX * k, oz = (h - (maxZ - minZ) * k) / 2 - minZ * k;
  const X = (x) => x * k + ox, Z = (z) => z * k + oz;
  g.fillStyle = '#14171a'; g.fillRect(0, 0, w, h);
  g.lineCap = 'round'; g.lineJoin = 'round';
  for (let e = 0; e < net.E; e++) {
    const p0 = net.edgePt[e], p1 = net.edgePt[e + 1];
    const x = net.ptX[p0], z = net.ptZ[p0];
    if (x < minX - 150 || x > maxX + 150 || z < minZ - 150 || z > maxZ + 150) continue;
    g.beginPath(); g.moveTo(X(x), Z(z));
    for (let p = p0 + 1; p < p1; p++) g.lineTo(X(net.ptX[p]), Z(net.ptZ[p]));
    g.lineWidth = Math.max(1, net.width[e] * k);
    g.strokeStyle = net.rank[e] === 0 ? '#2a2f34' : '#474e55';
    g.stroke();
  }
  if (path.length >= 4) {
    g.beginPath(); g.moveTo(X(path[0]), Z(path[1]));
    for (let i = 2; i < path.length; i += 2) g.lineTo(X(path[i]), Z(path[i + 1]));
    g.lineWidth = 3 * dpr; g.strokeStyle = '#3d8bff'; g.stroke();
    g.fillStyle = '#ffffff'; g.beginPath(); g.arc(X(path[0]), Z(path[1]), 5 * dpr, 0, 7); g.fill();
  }
  result.faults.forEach((f, i) => {
    g.fillStyle = f.severity === 'serious' ? '#e5352b' : '#f7c600';
    g.beginPath(); g.arc(X(f.x), Z(f.z), 8 * dpr, 0, 7); g.fill();
    g.fillStyle = '#14171a'; g.font = `700 ${10 * dpr}px sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(String(i + 1), X(f.x), Z(f.z) + dpr * 0.5);
  });
}

// ---- loop -----------------------------------------------------------------------------------------
let last = 0;
function tick(now) {
  requestAnimationFrame(tick);
  const dt = Math.min(0.1, (now - last) / 1000 || 0);
  last = now;
  if (!run || !world) return;
  if (state === 'driving') {
    run.acc += dt;
    let n = 0;
    while (run.acc >= STEP && n++ < 5 && state === 'driving') { simulate(STEP); run.acc -= STEP; }
    if (run.acc > STEP * 5) run.acc = 0;
    // Drop the quality once if the device cannot keep up.
    run.slow = dt > 0.045 ? run.slow + dt : Math.max(0, run.slow - dt * 0.5);
    if (run.slow > 4 && settings.quality !== 'low') { run.slow = 0; applySettings({ quality: settings.quality === 'high' ? 'medium' : 'low' }); }
  }
  if (state === 'driving' || state === 'paused' || state === 'result') draw();
}

async function boot() {
  screens = createScreens(root, handlers);
  if (screens.settings) settings = { ...settings, ...screens.settings };
  hud.onBlink = (on) => audio.tick(on);                           // indicator relay click, in step with the dashboard arrows
  screens.showLoading(0.02, 'Loading the map');
  hud.setVisible(false);
  const [graph, buildings, ground] = await Promise.all([loadSection('graph'), loadSection('buildings'), loadSection('ground')]);
  screens.showLoading(0.3, 'Building the road network');
  await new Promise((r) => setTimeout(r, 20));
  net = new RoadNet(graph);
  statics = createStatics(buildings);
  screens.showLoading(0.45, 'Preparing the streets');
  world = await createWorld({ canvas, net, packs: { buildings, ground }, quality: settings.quality, onProgress: (f, label) => screens.showLoading(0.45 + 0.5 * f, label || 'Preparing the streets') });
  input = createInput(root, settings);
  input.setEnabled(false);
  window.addEventListener('resize', () => world.resize());
  if (window.ResizeObserver) new ResizeObserver(() => world.resize()).observe(canvas);
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  world.resize();
  showMenu();
  requestAnimationFrame(tick);
}

boot().catch((err) => {
  console.error(err);
  try { screens.showLoading(0, `Could not start: ${err.message}`); } catch { /* nothing more to do */ }
});

// For tests and debugging from the console.
window.__game = { get run() { return run; }, get net() { return net; }, get world() { return world; }, get state() { return state; }, start: (o, seed = 1) => startDrive({ mode: 'exam', placeId: null, duration: 10, traffic: 'normal', settings, ...o }, seed) };
