// UI harness: mounts the real page markup and UI modules over a fake animated view with mock data.
import { createInput } from '/src/js/ui/input.js';
import { createHud } from '/src/js/ui/hud.js';
import { createScreens } from '/src/js/ui/screens.js';
import { createAudio } from '/src/js/ui/audio.js';

const q = new URLSearchParams(location.search);
document.body.insertAdjacentHTML('afterbegin', await (await fetch('/src/page.html')).text());
const root = document.getElementById('game');

// Fake safe-area insets of a notched phone, since a desktop browser reports none.
function applySafe() {
  if (q.get('safe') !== 'iphone') return;
  const portrait = innerHeight > innerWidth;
  document.documentElement.style.setProperty('--sat', portrait ? '47px' : '0px');
  document.documentElement.style.setProperty('--sab', portrait ? '34px' : '21px');
  root.style.setProperty('--gut-l', portrait ? '16px' : '47px');
  root.style.setProperty('--gut-r', portrait ? '16px' : '47px');
}
applySafe();
addEventListener('resize', applySafe);

let law = { LAWBOOK: {}, PHRASES: {}, CHECKLIST: [], MINOR_LIMIT: 4 };
try { law = await import('/src/js/sim/lawbook.js'); } catch (e) { console.warn('lawbook not loaded, using fallbacks', e); }
const LAWBOOK = {
  ...law.LAWBOOK,
  TOO_MANY_MINOR: law.LAWBOOK.TOO_MANY_MINOR || { severity: 'serious', title: 'Too many minor faults', what: 'The minor faults added up to the limit.', rule: 'The exam is failed when the minor faults reach the limit.', law: '', cz: '' },
};

const settings0 = { steering: q.get('steering') || 'pad', sensitivity: 1 };
const input = createInput(root, settings0);
const hud = createHud(root);
const audio = createAudio();
addEventListener('pointerdown', () => audio.unlock(), { once: true });
hud.onBlink = (on) => audio.tick(on);

const car = { x: 0, y: 0, z: 0, heading: 0, pitch: 0, roll: 0, speed: 0, steer: 0, throttle: 0, brake: 0, gear: 'P',
  engineOn: false, handbrake: true, belt: false, indicator: 'off', lights: 'off', rpm: 0, length: 4.4, width: 1.8, wheelbase: 2.6 };
const info = { limit: 50, street: 'Sokolovská', minor: 1, minorLimit: law.MINOR_LIMIT || 4, elapsed: 252, remaining: 948, mode: 'exam' };
let state = 'menu';
let auto = q.get('auto') !== '0';
let travelled = 0;

const places = [
  { id: 'arena', name: 'Arena Libeň jih', note: 'Tram stop on Českomoravská, busy junctions' },
  { id: 'palmovka', name: 'Palmovka', note: 'Trams, bus lanes and tight turns' },
  { id: 'prosek', name: 'Prosek', note: 'Housing estate, 30 zones and priority to the right' },
  { id: 'vysocany', name: 'Vysočany', note: 'Wide roads, roundabouts, a level crossing' },
  { id: 'zizkov', name: 'Žižkov, Ohrada', note: 'Steep one-way streets and parked cars' },
];
const config = { places, durations: [10, 20, 30], defaults: { mode: 'exam', placeId: 'arena', duration: 20, traffic: 'normal', settings: { ...settings0 } } };

const fault = (code, t, street, extra = {}) => ({ code, severity: (LAWBOOK[code] || {}).severity || 'minor', t, x: 0, z: 0, street, ...extra });
const path = new Float32Array(240);
for (let i = 0; i < 120; i++) { path[i * 2] = Math.sin(i / 14) * 300 + i * 6; path[i * 2 + 1] = -i * 9 + Math.cos(i / 9) * 120; }
const failed = {
  passed: false, mode: 'exam', seed: 7, startId: 'arena', path,
  faults: [
    fault('SPEEDING_MINOR', 96, 'Sokolovská', { speed: 58, limit: 50, note: '58 km/h in a 50 zone' }),
    fault('LATE_SIGNAL', 201, 'Českomoravská'),
    fault('NO_OBSERVATION', 312, 'Freyova'),
    fault('STOP_LINE_OVERRUN', 398, 'Kolbenova'),
    fault('RED_LIGHT', 462, 'Vysočanská', { speed: 34, limit: 50, note: 'Signal had been red for 1.8 s' }),
  ],
  stats: { duration: 462, distance: 3180, avgSpeed: 6.9, maxSpeed: 16.1, junctions: 14, stopsAtSigns: 2, minor: 4, serious: 1 },
};
failed.reason = failed.faults[4];
const passed = { ...failed, passed: true, reason: null, faults: failed.faults.slice(0, 2), stats: { ...failed.stats, duration: 1200, distance: 8420, minor: 2, serious: 0 } };

const screens = createScreens(root, {
  onStart(choice) { console.log('onStart', choice); input.setSettings(choice.settings); setState('predrive'); },
  onResume() { setState('drive'); },
  onRetry() { setState('predrive'); },
  onNewRoute() { setState('predrive'); },
  onMenu() { setState('menu'); },
  onSettings(s) { input.setSettings(s); audio.setEnabled(s.sound); audio.setVoice(s.voice); },
  drawResultMap(canvas, result) {
    const c = canvas.getContext('2d');
    c.fillStyle = '#1a1917'; c.fillRect(0, 0, canvas.width, canvas.height);
    const p = result.path; let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
    for (let i = 0; i < p.length; i += 2) { x0 = Math.min(x0, p[i]); x1 = Math.max(x1, p[i]); z0 = Math.min(z0, p[i + 1]); z1 = Math.max(z1, p[i + 1]); }
    const k = Math.min(canvas.width / (x1 - x0), canvas.height / (z1 - z0)) * 0.86;
    const px = (i) => [(p[i] - (x0 + x1) / 2) * k + canvas.width / 2, (p[i + 1] - (z0 + z1) / 2) * k + canvas.height / 2];
    c.strokeStyle = '#f2ede3'; c.lineWidth = 4; c.lineJoin = 'round'; c.beginPath();
    for (let i = 0; i < p.length; i += 2) { const [x, y] = px(i); if (i) c.lineTo(x, y); else c.moveTo(x, y); }
    c.stroke();
    result.faults.forEach((f, n) => { const [x, y] = px(Math.floor((n + 1) * (p.length / 2 - 1) / result.faults.length) * 2); c.fillStyle = f.severity === 'serious' ? '#d2232a' : '#f6c21c'; c.beginPath(); c.arc(x, y, 9, 0, 7); c.fill(); });
  },
});

function checklist() {
  const done = { belt: car.belt, engine: car.engineOn, lights: car.lights === 'dipped', gear: car.gear === 'D', handbrake: !car.handbrake, signal: car.indicator === 'left', observe: Math.abs(input.state.lookYaw) > 0.8 };
  const ids = ['belt', 'engine', 'lights', 'gear', 'handbrake', 'signal', 'observe'];
  const src = ids.map((id) => law.CHECKLIST.find((c) => c.id === id) || { id, en: id });
  return src.map((c) => ({ id: c.id, label: c.en || c.id, done: !!done[c.id] }));
}
const phrase = (key, fallback) => (law.PHRASES[key] ? law.PHRASES[key] : fallback);

function setState(next) {
  state = next;
  const driving = next === 'drive' || next === 'predrive';
  hud.setVisible(driving || next === 'pause');
  input.setEnabled(driving);
  hud.setChecklist(null);
  if (next === 'loading') screens.showLoading(0.62, 'Laying out the streets of Libeň');
  else if (next === 'menu') screens.showMenu(config);
  else if (next === 'pause') screens.showPause();
  else if (next === 'result') screens.showResult(failed, LAWBOOK);
  else if (next === 'pass') screens.showResult(passed, LAWBOOK);
  else screens.hide();
  if (next === 'predrive') {
    Object.assign(car, { speed: 0, gear: 'P', engineOn: false, handbrake: true, belt: false, indicator: 'off', lights: 'off' });
    hud.setInstruction({ ...phrase('intro', { cz: 'Připravte se k jízdě a vyjeďte od okraje vozovky.', en: 'Get ready and pull away from the kerb.' }), icon: 'start', distance: null });
  }
  if (next === 'drive') {
    Object.assign(car, { gear: 'D', engineOn: true, handbrake: false, belt: true, lights: 'dipped', indicator: 'left' });
    hud.setInstruction({ ...phrase('turnLeft', { cz: 'Na příští křižovatce odbočte vlevo.', en: 'At the next junction, turn left.' }), icon: 'left', distance: 150 });
    if (q.get('toasts') !== '0') {
      hud.toast({ text: 'Signal earlier: at least 3 seconds before the turn', severity: 'minor' });
      hud.toast({ text: 'Red light. The examiner has stopped the drive.', severity: 'serious' });
    }
  }
}

// ---- Fake world on the view canvas (the real game renders WebGL here) ----
const view = document.getElementById('view');
const g = view.getContext('2d');
function drawView(t) {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const w = Math.round(view.clientWidth * dpr), h = Math.round(view.clientHeight * dpr);
  if (view.width !== w || view.height !== h) { view.width = w; view.height = h; }
  const hz = h * 0.5 - input.state.lookPitch * h * 0.2;
  const shift = -input.state.lookYaw * w * 0.9 - car.steer * w * 0.25;
  g.fillStyle = '#9fc3e6'; g.fillRect(0, 0, w, hz);
  g.fillStyle = '#6f7d5c'; g.fillRect(0, hz, w, h - hz);
  for (let i = -6; i < 8; i++) { g.fillStyle = i % 2 ? '#c9b99b' : '#b7a48a'; const bw = w * 0.16, bx = w / 2 + shift + i * bw * 1.12 + (i >= 0 ? w * 0.1 : -w * 0.1); const bh = h * (0.14 + ((i * 37) % 5 + 5) % 5 * 0.03); g.fillRect(bx, hz - bh, bw, bh); }
  const cx = w * 0.56 + shift;
  g.fillStyle = '#4a4b4d'; g.beginPath(); g.moveTo(cx - w * 0.03, hz); g.lineTo(cx + w * 0.03, hz); g.lineTo(cx + w * 0.7, h); g.lineTo(cx - w * 0.7, h); g.fill();
  g.fillStyle = '#f2f2ee';
  for (let i = 0; i < 9; i++) { const d = ((i + (travelled / 9) % 1) / 9) ** 2; const y = hz + d * (h - hz); const s = 0.004 + d * 0.02; g.fillRect(cx - w * s / 2, y, w * s, (h - hz) * 0.05 * (0.3 + d)); }
  // Mirror images: the game draws them into the canvas behind the transparent mirror glass.
  const vr = view.getBoundingClientRect();
  for (const id of ['mirror-rear', 'mirror-left']) {
    const r = document.getElementById(id).getBoundingClientRect();
    const x = (r.left - vr.left) * dpr, y = (r.top - vr.top) * dpr, mw = r.width * dpr, mh = r.height * dpr;
    g.fillStyle = '#86a9c9'; g.fillRect(x, y, mw, mh * 0.5);
    g.fillStyle = '#55575a'; g.fillRect(x, y + mh * 0.5, mw, mh * 0.5);
    g.fillStyle = '#c0392b'; g.fillRect(x + mw * 0.55, y + mh * 0.42, mw * 0.16, mh * 0.3);
  }
}
function drawMinimap() {
  const m = hud.minimap, c = m.getContext('2d'), s = m.width;
  c.fillStyle = '#23211e'; c.fillRect(0, 0, s, s);
  c.strokeStyle = '#5b564d'; c.lineWidth = s * 0.05;
  for (let i = 1; i < 4; i++) { c.beginPath(); c.moveTo(i * s / 4, 0); c.lineTo(i * s / 4 + s * 0.08, s); c.moveTo(0, i * s / 4); c.lineTo(s, i * s / 4 - s * 0.06); c.stroke(); }
  c.strokeStyle = '#0d57a6'; c.lineWidth = s * 0.06; c.beginPath(); c.moveTo(s / 2, s / 2); c.lineTo(s / 2, s * 0.26); c.lineTo(s * 0.12, s * 0.28); c.stroke();
  c.fillStyle = '#f2ede3'; c.beginPath(); c.moveTo(s / 2, s * 0.42); c.lineTo(s * 0.57, s * 0.58); c.lineTo(s * 0.43, s * 0.58); c.fill();
}

let last = performance.now();
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  const s = input.state;
  for (const a of input.takeActions()) {
    if (a === 'pause') { setState('pause'); return; }
    if (a === 'indicatorLeft') car.indicator = car.indicator === 'left' ? 'off' : 'left';
    if (a === 'indicatorRight') car.indicator = car.indicator === 'right' ? 'off' : 'right';
    if (a === 'hazard') car.indicator = car.indicator === 'hazard' ? 'off' : 'hazard';
    if (a.startsWith('gear')) car.gear = a.slice(4);
    if (a === 'handbrake') car.handbrake = !car.handbrake;
    if (a === 'engine') car.engineOn = !car.engineOn;
    if (a === 'lights') car.lights = car.lights === 'dipped' ? 'off' : 'dipped';
    if (a === 'belt') car.belt = !car.belt;
    if (a === 'horn') hud.toast({ text: 'Horn', severity: 'info' });
  }
  const touching = s.throttle > 0 || s.brake > 0 || s.steer !== 0;
  if (state === 'drive' && auto && !touching) {
    // Demo drive for screenshots: about 47 km/h with a gentle weave.
    car.speed = 13 + Math.sin(now / 2600) * 1.2; car.steer = Math.sin(now / 1700) * 0.07; car.throttle = 0.3;
  } else {
    car.steer = s.steer * 0.6; car.throttle = s.throttle; car.brake = s.brake;
    const drive = car.engineOn && !car.handbrake && (car.gear === 'D' || car.gear === 'R') ? s.throttle * 3.2 * (car.gear === 'R' ? -1 : 1) : 0;
    car.speed += (drive - Math.sign(car.speed) * (s.brake * 8 + 0.25 + (car.handbrake ? 6 : 0))) * dt;
    if (Math.abs(car.speed) < 0.05 && !drive) car.speed = 0;
  }
  car.rpm = car.engineOn ? 820 + Math.abs(car.speed) * 150 + car.throttle * 1400 : 0;
  travelled += car.speed * dt;
  if (state === 'predrive') hud.setChecklist(checklist());
  if (state === 'drive' || state === 'predrive') { info.elapsed += dt; info.remaining = Math.max(0, info.remaining - dt); }
  audio.engine(car.rpm, car.throttle, car.engineOn);
  audio.horn(s.horn);
  hud.update(car, info);
  drawView(now);
  drawMinimap();
}

if (q.get('bar') !== '0') {
  const bar = document.createElement('div');
  bar.id = 'devbar';
  for (const name of ['loading', 'menu', 'predrive', 'drive', 'pause', 'result', 'pass']) {
    const b = document.createElement('button');
    b.textContent = name;
    b.onclick = () => setState(name);
    bar.appendChild(b);
  }
  document.body.appendChild(bar);
}

window.__dev = { input, hud, screens, audio, car, info, setState };
setState(q.get('state') || 'menu');
requestAnimationFrame(frame);
