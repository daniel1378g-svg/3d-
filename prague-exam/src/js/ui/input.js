// Player input: touch controls, keyboard and gamepad feed one state object.
//
//   const input = createInput(document.getElementById('game'), { steering: 'pad', sensitivity: 1 });
//   input.state        -> { steer, throttle, brake, lookYaw, lookPitch, horn }
//   input.takeActions()-> one-shot action names since the last call
//
// The state is smoothed on an internal animation-frame loop, so the caller only reads it.

const KEY_ACTIONS = {
  KeyQ: 'indicatorLeft', KeyE: 'indicatorRight', KeyH: 'hazard', Space: 'handbrake',
  KeyR: 'gearR', KeyN: 'gearN', KeyF: 'gearD',
  Digit1: 'gearP', Digit2: 'gearR', Digit3: 'gearN', Digit4: 'gearD',
  KeyL: 'lights', KeyB: 'belt', KeyI: 'engine', KeyK: 'horn',
  Escape: 'pause', KeyP: 'pause',
};
const KEY_HOLDS = {
  KeyA: 'left', ArrowLeft: 'left', KeyD: 'right', ArrowRight: 'right',
  KeyW: 'throttle', ArrowUp: 'throttle', KeyS: 'brake', ArrowDown: 'brake',
  KeyC: 'lookLeft', KeyV: 'lookRight', KeyK: 'horn',
};

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
// Move v towards target by at most step.
const approach = (v, target, step) => (v < target ? Math.min(target, v + step) : Math.max(target, v - step));

export function createInput(root, settings = {}) {
  const state = { steer: 0, throttle: 0, brake: 0, lookYaw: 0, lookPitch: 0, horn: false };
  const actions = [];
  const held = new Set();          // keyboard holds by name
  const codes = new Set();         // keys that are down; two keys can drive one hold
  const cleanups = [];
  let enabled = true;
  let mode = 'pad';
  let sensitivity = 1;
  let raf = 0;
  let last = 0;

  const $ = (sel) => root.querySelector(sel);
  const stage = $('#stage');
  const view = $('#view');
  const pad = $('#steer-pad');
  const wheelCtl = $('#steer-wheel');
  const pedals = $('#pedals');
  const pedalEls = pedals ? [...pedals.querySelectorAll('.pedal')] : [];

  // Touch targets, each owning its pointer.
  const steerPtr = { id: null, x0: 0, a0: 0, turn: 0, target: 0 };
  const steerBtns = new Map();     // pointerId -> -1 | 1
  const pedalPtrs = new Map();     // pointerId -> { pedal, value }
  const lookPtr = { id: null, x0: 0, y0: 0, yaw: 0, pitch: 0 };
  const lookBtns = new Map();      // pointerId -> -1 | 1
  const hornPtrs = new Set();
  let padGamepad = { steer: 0, throttle: 0, brake: 0, look: 0, buttons: [] };

  const on = (el, type, fn, opts) => {
    if (!el) return;
    el.addEventListener(type, fn, opts);
    cleanups.push(() => el.removeEventListener(type, fn, opts));
  };
  const capture = (el, e) => { try { el.setPointerCapture(e.pointerId); } catch { /* pointer already gone */ } };
  const queue = (name) => { if (enabled) actions.push(name); };
  // A finger brings the touch controls back after the keyboard hid them.
  const noteTouch = (e) => { if (e.pointerType !== 'mouse') root.classList.remove('kbd'); };

  // ---- Steering: pad (relative slider) ----
  const padRange = () => (pad.clientWidth * 0.36) / sensitivity;
  on(pad, 'pointerdown', (e) => {
    if (!enabled || steerPtr.id !== null) return;
    e.preventDefault();
    noteTouch(e);
    capture(pad, e);
    const r = pad.getBoundingClientRect();
    steerPtr.id = e.pointerId;
    steerPtr.x0 = e.clientX;
    steerPtr.target = 0;
    pad.classList.add('is-down');
    pad.style.setProperty('--zx', `${e.clientX - (r.left + r.width / 2)}px`);
    pad.style.setProperty('--kx', `${e.clientX - (r.left + r.width / 2)}px`);
  });
  on(pad, 'pointermove', (e) => {
    if (e.pointerId !== steerPtr.id) return;
    const r = pad.getBoundingClientRect();
    const range = padRange();
    const d = clamp((e.clientX - steerPtr.x0) / range, -1, 1);
    // Slightly progressive: fine corrections near the centre, full lock at the end of the travel.
    steerPtr.target = Math.sign(d) * Math.abs(d) ** 1.35;
    pad.style.setProperty('--kx', `${steerPtr.x0 + d * range - (r.left + r.width / 2)}px`);
  });
  const padUp = (e) => {
    if (e.pointerId !== steerPtr.id) return;
    steerPtr.id = null;
    steerPtr.target = 0;
    pad.classList.remove('is-down');
    pad.style.setProperty('--kx', '0px');
    pad.style.setProperty('--zx', '0px');
  };
  on(pad, 'pointerup', padUp);
  on(pad, 'pointercancel', padUp);
  on(pad, 'lostpointercapture', padUp);

  // ---- Steering: wheel (drag around the wheel graphic) ----
  const wheelAngle = (e) => {
    const art = wheelCtl.querySelector('.wheelctl-art').getBoundingClientRect();
    return Math.atan2(e.clientX - (art.left + art.width / 2), (art.top + art.height / 2) - e.clientY);
  };
  on(wheelCtl, 'pointerdown', (e) => {
    if (!enabled || steerPtr.id !== null) return;
    e.preventDefault();
    noteTouch(e);
    capture(wheelCtl, e);
    steerPtr.id = e.pointerId;
    steerPtr.a0 = wheelAngle(e);
    steerPtr.turn = 0;
    steerPtr.target = 0;
  });
  on(wheelCtl, 'pointermove', (e) => {
    if (e.pointerId !== steerPtr.id) return;
    const a = wheelAngle(e);
    let d = a - steerPtr.a0;
    if (d > Math.PI) d -= 2 * Math.PI;
    if (d < -Math.PI) d += 2 * Math.PI;
    steerPtr.a0 = a;
    const full = 1.15 / sensitivity;   // radians of drag for full lock
    steerPtr.turn = clamp(steerPtr.turn + d, -full, full);
    steerPtr.target = steerPtr.turn / full;
  });
  const wheelUp = (e) => {
    if (e.pointerId !== steerPtr.id) return;
    steerPtr.id = null;
    steerPtr.target = 0;
  };
  on(wheelCtl, 'pointerup', wheelUp);
  on(wheelCtl, 'pointercancel', wheelUp);
  on(wheelCtl, 'lostpointercapture', wheelUp);

  // ---- Steering: two hold buttons ----
  for (const btn of root.querySelectorAll('.steer-btn')) {
    const dir = Number(btn.dataset.steer);
    const up = (e) => { steerBtns.delete(e.pointerId); btn.classList.remove('is-down'); };
    on(btn, 'pointerdown', (e) => {
      if (!enabled) return;
      e.preventDefault();
      noteTouch(e);
      capture(btn, e);
      steerBtns.set(e.pointerId, dir);
      btn.classList.add('is-down');
    });
    on(btn, 'pointerup', up);
    on(btn, 'pointercancel', up);
    on(btn, 'lostpointercapture', up);
  }

  // ---- Pedals: one surface, so a finger can slide from one pedal to the other ----
  const readPedal = (e) => {
    let best = null;
    let bestDist = Infinity;
    for (const el of pedalEls) {
      const r = el.getBoundingClientRect();
      const dist = e.clientX < r.left ? r.left - e.clientX : e.clientX > r.right ? e.clientX - r.right : 0;
      if (dist < bestDist) { bestDist = dist; best = { el, r }; }
    }
    if (!best) return null;
    // The lowest part of the pedal is 0.3, the top fifth is already full.
    const up = clamp((best.r.bottom - e.clientY) / (best.r.height * 0.8), 0, 1);
    return { pedal: best.el.dataset.pedal, value: 0.3 + 0.7 * up };
  };
  on(pedals, 'pointerdown', (e) => {
    if (!enabled) return;
    e.preventDefault();
    noteTouch(e);
    capture(pedals, e);
    const p = readPedal(e);
    if (p) pedalPtrs.set(e.pointerId, p);
  });
  on(pedals, 'pointermove', (e) => {
    if (!pedalPtrs.has(e.pointerId)) return;
    const p = readPedal(e);
    if (p) pedalPtrs.set(e.pointerId, p);
  });
  const pedalUp = (e) => { pedalPtrs.delete(e.pointerId); };
  on(pedals, 'pointerup', pedalUp);
  on(pedals, 'pointercancel', pedalUp);
  on(pedals, 'lostpointercapture', pedalUp);

  // ---- Look: drag on the view, or hold an edge button for a shoulder check ----
  on(stage, 'pointerdown', (e) => {
    if (!enabled || lookPtr.id !== null || e.target !== view) return;
    noteTouch(e);
    capture(stage, e);
    lookPtr.id = e.pointerId;
    lookPtr.x0 = e.clientX;
    lookPtr.y0 = e.clientY;
    lookPtr.yaw = 0;
    lookPtr.pitch = 0;
  });
  on(stage, 'pointermove', (e) => {
    if (e.pointerId !== lookPtr.id) return;
    const w = Math.max(160, stage.clientWidth * 0.3) / sensitivity;
    const h = Math.max(120, stage.clientHeight * 0.45) / sensitivity;
    lookPtr.yaw = clamp((e.clientX - lookPtr.x0) / w, -1, 1);
    lookPtr.pitch = clamp((lookPtr.y0 - e.clientY) / h, -1, 1);
  });
  const lookUp = (e) => {
    if (e.pointerId !== lookPtr.id) return;
    lookPtr.id = null;
    lookPtr.yaw = 0;
    lookPtr.pitch = 0;
  };
  on(stage, 'pointerup', lookUp);
  on(stage, 'pointercancel', lookUp);
  on(stage, 'lostpointercapture', lookUp);

  for (const btn of root.querySelectorAll('[data-look]')) {
    const dir = Number(btn.dataset.look);
    const up = (e) => { lookBtns.delete(e.pointerId); btn.classList.remove('is-down'); };
    on(btn, 'pointerdown', (e) => {
      if (!enabled) return;
      e.preventDefault();
      noteTouch(e);
      capture(btn, e);
      lookBtns.set(e.pointerId, dir);
      btn.classList.add('is-down');
    });
    on(btn, 'pointerup', up);
    on(btn, 'pointercancel', up);
    on(btn, 'lostpointercapture', up);
  }

  // ---- One-shot buttons: act on press, not on release ----
  for (const btn of root.querySelectorAll('#stage [data-action], #deck [data-action]')) {
    const name = btn.dataset.action;
    const up = (e) => { btn.classList.remove('is-down'); hornPtrs.delete(e.pointerId); };
    on(btn, 'pointerdown', (e) => {
      if (!enabled) return;
      e.preventDefault();
      noteTouch(e);
      capture(btn, e);
      btn.classList.add('is-down');
      if (btn.dataset.hold === 'horn') hornPtrs.add(e.pointerId);
      queue(name);
    });
    on(btn, 'pointerup', up);
    on(btn, 'pointercancel', up);
    on(btn, 'lostpointercapture', up);
    // Keyboard activation of a focused button arrives as a click with no pointer behind it.
    on(btn, 'click', (e) => { if (e.detail === 0) queue(name); });
  }
  // Mouse clicks must not leave focus on a control, or Space would press it again.
  on(root, 'mousedown', (e) => {
    if (e.target.closest && e.target.closest('#stage, #deck')) e.preventDefault();
  });
  on(root, 'contextmenu', (e) => {
    if (e.target.closest && e.target.closest('#stage, #deck')) e.preventDefault();
  });
  on(root, 'gesturestart', (e) => e.preventDefault());

  // ---- Keyboard ----
  const typing = (t) => t && t.closest && t.closest('input, select, textarea, [contenteditable]');
  on(window, 'keydown', (e) => {
    if (!enabled || e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || typing(e.target)) return;
    const onButton = e.target && e.target.closest && e.target.closest('button, summary, a');
    if (onButton && (e.code === 'Space' || e.code === 'Enter')) return;
    const hold = KEY_HOLDS[e.code];
    const action = KEY_ACTIONS[e.code];
    if (!hold && !action) return;
    e.preventDefault();
    root.classList.add('kbd');
    if (hold) { codes.add(e.code); held.add(hold); }
    if (action && !e.repeat) queue(action);
  });
  on(window, 'keyup', (e) => {
    if (!codes.delete(e.code)) return;
    // A and the left arrow both steer left: the hold ends only when every key for it is up.
    held.clear();
    for (const c of codes) held.add(KEY_HOLDS[c]);
  });
  on(window, 'blur', () => { codes.clear(); held.clear(); });

  // ---- Gamepad (optional) ----
  const readGamepad = () => {
    let gp = null;
    try {
      const pads = navigator.getGamepads ? navigator.getGamepads() : [];
      for (const p of pads) if (p && p.connected) { gp = p; break; }
    } catch { /* blocked in this frame */ }
    if (!gp) { padGamepad.steer = 0; padGamepad.throttle = 0; padGamepad.brake = 0; padGamepad.look = 0; return; }
    const dead = (v) => (Math.abs(v) < 0.1 ? 0 : (v - Math.sign(v) * 0.1) / 0.9);
    const b = (i) => (gp.buttons[i] ? gp.buttons[i].value || (gp.buttons[i].pressed ? 1 : 0) : 0);
    padGamepad.steer = dead(gp.axes[0] || 0);
    padGamepad.look = dead(gp.axes[2] || 0);
    padGamepad.throttle = b(7);
    padGamepad.brake = b(6);
    const map = { 0: 'handbrake', 2: 'horn', 3: 'hazard', 4: 'indicatorLeft', 5: 'indicatorRight', 9: 'pause', 12: 'gearD', 13: 'gearR', 14: 'gearN', 15: 'gearP' };
    for (const [i, name] of Object.entries(map)) {
      const down = b(Number(i)) > 0.5;
      if (down && !padGamepad.buttons[i]) queue(name);
      padGamepad.buttons[i] = down;
    }
  };

  // ---- Per-frame smoothing ----
  const showPedal = (el, v) => {
    const shown = Math.round(v * 100);
    if (el._shown === shown) return;
    el._shown = shown;
    el.style.setProperty('--v', (shown / 100).toFixed(2));
    el.setAttribute('aria-valuenow', String(shown));
  };

  const tick = (now) => {
    raf = requestAnimationFrame(tick);
    const dt = clamp((now - last) / 1000, 0, 0.05);
    last = now;
    if (!enabled) return;
    readGamepad();

    // Steering. A finger gives a position to follow; buttons and keys ramp towards full lock.
    let target = 0;
    let rate = 3.2;                               // return to centre
    if (steerPtr.id !== null) { target = steerPtr.target; rate = 2.2; }
    else if (steerBtns.size) { for (const d of steerBtns.values()) target += d; rate = 1.7; }
    else if (held.has('left') || held.has('right')) { target = (held.has('right') ? 1 : 0) - (held.has('left') ? 1 : 0); rate = 1.7; }
    else if (padGamepad.steer) { target = padGamepad.steer; rate = 2.6; }
    target = clamp(target, -1, 1);
    // Unwinding is quicker than winding on, as the wheel does when it is let slip.
    if (Math.abs(target) < Math.abs(state.steer) && Math.sign(target || state.steer) === Math.sign(state.steer)) rate = Math.max(rate, 2.8);
    state.steer = approach(state.steer, target, rate * dt);

    let throttle = 0;
    let brake = 0;
    for (const p of pedalPtrs.values()) {
      if (p.pedal === 'throttle') throttle = Math.max(throttle, p.value);
      else brake = Math.max(brake, p.value);
    }
    if (held.has('throttle')) throttle = 1;
    if (held.has('brake')) brake = 1;
    throttle = Math.max(throttle, padGamepad.throttle);
    brake = Math.max(brake, padGamepad.brake);
    state.throttle = approach(state.throttle, throttle, (throttle > state.throttle ? 3.5 : 7) * dt);
    state.brake = approach(state.brake, brake, (brake > state.brake ? 6 : 9) * dt);

    // Head. A held button wins over a drag; everything eases so the view never snaps.
    let yaw = 0;
    let pitch = 0;
    let k = 7;
    let btn = 0;
    for (const d of lookBtns.values()) btn += d;
    if (held.has('lookLeft')) btn -= 1;
    if (held.has('lookRight')) btn += 1;
    if (btn) { yaw = clamp(btn, -1, 1); k = 12; }
    else if (lookPtr.id !== null) { yaw = lookPtr.yaw; pitch = lookPtr.pitch; k = 26; }
    else if (padGamepad.look) { yaw = padGamepad.look; k = 12; }
    const ease = 1 - Math.exp(-k * dt);
    state.lookYaw += (yaw - state.lookYaw) * ease;
    state.lookPitch += (pitch - state.lookPitch) * ease;
    if (Math.abs(state.lookYaw) < 0.001 && !yaw) state.lookYaw = 0;
    if (Math.abs(state.lookPitch) < 0.001 && !pitch) state.lookPitch = 0;

    state.horn = hornPtrs.size > 0 || held.has('horn') || !!padGamepad.buttons[2];

    for (const el of pedalEls) showPedal(el, el.dataset.pedal === 'throttle' ? state.throttle : state.brake);
    if (mode === 'wheel' && wheelCtl) wheelCtl.style.setProperty('--rot', `${(state.steer * 110).toFixed(1)}deg`);
  };

  const release = () => {
    steerPtr.id = null; steerPtr.target = 0;
    lookPtr.id = null; lookPtr.yaw = 0; lookPtr.pitch = 0;
    steerBtns.clear(); pedalPtrs.clear(); lookBtns.clear(); hornPtrs.clear(); held.clear(); codes.clear();
    state.steer = 0; state.throttle = 0; state.brake = 0; state.lookYaw = 0; state.lookPitch = 0; state.horn = false;
    for (const el of root.querySelectorAll('.is-down')) el.classList.remove('is-down');
    if (pad) { pad.style.setProperty('--kx', '0px'); pad.style.setProperty('--zx', '0px'); }
    for (const el of pedalEls) showPedal(el, 0);
  };

  const api = {
    state,
    takeActions() { return actions.splice(0, actions.length); },
    setEnabled(v) {
      enabled = !!v;
      if (!enabled) { release(); actions.length = 0; }
    },
    setSettings(s = {}) {
      if (s.steering === 'pad' || s.steering === 'buttons' || s.steering === 'wheel') {
        if (s.steering !== mode) { steerPtr.id = null; steerPtr.target = 0; steerBtns.clear(); }
        mode = s.steering;
        root.dataset.steering = mode;
      }
      if (Number.isFinite(s.sensitivity)) sensitivity = clamp(s.sensitivity, 0.5, 1.5);
    },
    destroy() {
      cancelAnimationFrame(raf);
      for (const off of cleanups.splice(0)) off();
      release();
    },
  };

  api.setSettings(settings);
  last = performance.now();
  raf = requestAnimationFrame(tick);
  return api;
}
