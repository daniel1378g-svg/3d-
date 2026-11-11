// Full-screen sheets over the game: loading, menu, pause and the result record.
//
//   const screens = createScreens(document.getElementById('game'), handlers);
//   screens.showMenu(config) / showPause() / showResult(result, lawbook) / showLoading(f, label) / hide()
//   screens.current    'loading' | 'menu' | 'pause' | 'result' | null
//   screens.settings   the current settings (stored ones over the defaults)
//
// Settings that only change how the page looks (mirror glass, limit sign, minimap) are also set
// as data attributes on the root, so the stylesheet can follow them without the game loop.

const STORE_KEY = 'prague-exam.ui.v1';
const DEFAULT_SETTINGS = {
  steering: 'pad', sensitivity: 1, mirrors: true, showLimit: true, voice: true, sound: true, quality: 'medium', minimap: true,
};
const CHOICES = {
  steering: ['pad', 'wheel', 'buttons'],
  quality: ['low', 'medium', 'high'],
  traffic: ['light', 'normal', 'busy'],
  mode: ['exam', 'free'],
};
const KEYS = [
  ['A D / ← →', 'Steer'], ['W / ↑', 'Accelerate'], ['S / ↓', 'Brake'], ['Q  E', 'Indicators'],
  ['H', 'Hazard lights'], ['Space', 'Handbrake'], ['R N F / 1–4', 'Gears (1 = Park)'], ['L', 'Lights'],
  ['B', 'Seat belt'], ['I', 'Engine'], ['C  V', 'Look left, right'], ['K', 'Horn'], ['Esc / P', 'Pause'],
];

// h('div.class', { attr: value, onclick: fn }, child, 'text', ...)
function h(spec, attrs, ...children) {
  const [tag, ...classes] = spec.split('.');
  const el = document.createElement(tag || 'div');
  if (classes.length) el.className = classes.join(' ');
  for (const k in attrs || {}) {
    const v = attrs[k];
    if (v == null || v === false) continue;
    if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'text') el.textContent = v;
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return el;
}

const two = (n) => String(n).padStart(2, '0');
const clock = (s) => {
  const t = Math.max(0, Math.floor(s || 0));
  return `${two(Math.floor(t / 60))}:${two(t % 60)}`;
};
const title = (s) => String(s).toLowerCase().replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase());

function loadStore() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    return raw && typeof raw === 'object' ? raw : {};
  } catch {
    return {};
  }
}
function saveStore(data) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch { /* storage is optional */ }
}

// Keep only values of the right kind, so an old or damaged store cannot break the menu.
function cleanSettings(base, patch) {
  const out = { ...base };
  if (!patch || typeof patch !== 'object') return out;
  for (const k of Object.keys(DEFAULT_SETTINGS)) {
    const v = patch[k];
    if (typeof DEFAULT_SETTINGS[k] === 'boolean') { if (typeof v === 'boolean') out[k] = v; }
    else if (k === 'sensitivity') { if (Number.isFinite(v)) out[k] = Math.min(1.5, Math.max(0.5, v)); }
    else if (CHOICES[k].includes(v)) out[k] = v;
  }
  return out;
}

export function createScreens(root, handlers = {}) {
  let host = root.querySelector('#screens');
  if (!host) host = root.appendChild(h('div', { id: 'screens' }));

  const store = loadStore();
  let settings = cleanSettings(DEFAULT_SETTINGS, store.settings);
  let choice = { mode: 'exam', placeId: null, duration: 20, traffic: 'normal', ...(store.menu || {}) };
  let config = null;
  let current = null;
  let loadingEls = null;

  const call = (name, ...args) => { if (typeof handlers[name] === 'function') handlers[name](...args); };
  const persist = () => saveStore({ settings, menu: choice });
  const applyLook = () => {
    root.dataset.mirrors = settings.mirrors ? 'on' : 'off';
    root.dataset.limit = settings.showLimit ? 'on' : 'off';
    root.dataset.minimap = settings.minimap ? 'on' : 'off';
  };
  applyLook();

  const mount = (name, node) => {
    host.textContent = '';
    loadingEls = null;
    current = name;
    if (name) {
      host.dataset.screen = name;
      host.appendChild(node);
    } else {
      delete host.dataset.screen;
    }
  };

  // ---- Small controls ----
  const segmented = (label, options, value, onPick) => {
    const group = h('div.seg', { role: 'radiogroup', 'aria-label': label });
    const pick = (v) => {
      for (const b of group.children) b.setAttribute('aria-checked', b.dataset.value === String(v) ? 'true' : 'false');
      onPick(v);
    };
    for (const [v, text] of options) {
      group.appendChild(h('button', {
        type: 'button', role: 'radio', 'data-value': String(v), 'aria-checked': v === value ? 'true' : 'false', text,
        onclick: () => pick(v),
      }));
    }
    return group;
  };
  const toggle = (label, value, onFlip) => {
    const b = h('button.switch', { type: 'button', role: 'switch', 'aria-label': label, 'aria-checked': value ? 'true' : 'false' });
    b.addEventListener('click', () => {
      const v = b.getAttribute('aria-checked') !== 'true';
      b.setAttribute('aria-checked', v ? 'true' : 'false');
      onFlip(v);
    });
    return b;
  };
  const row = (label, control, cls = '') => h(`div.row${cls}`, null, h('span.eyebrow', { text: label }), control);

  const changeSetting = (key, value) => {
    settings = { ...settings, [key]: value };
    applyLook();
    persist();
    call('onSettings', { ...settings });
  };

  const settingsGroup = (open) => {
    const out = h('output', { for: 'set-sensitivity', text: `${settings.sensitivity.toFixed(2)}×` });
    const range = h('input', {
      type: 'range', id: 'set-sensitivity', min: '0.5', max: '1.5', step: '0.05', value: String(settings.sensitivity),
      'aria-label': 'Steering sensitivity',
      oninput: (e) => {
        const v = Number(e.target.value);
        out.textContent = `${v.toFixed(2)}×`;
        changeSetting('sensitivity', v);
      },
    });
    return h('details.settings', { open },
      h('summary', { text: 'Settings' }),
      h('div.rows', null,
        row('Steering', segmented('Steering control', [['pad', 'Slider'], ['wheel', 'Wheel'], ['buttons', 'Buttons']], settings.steering, (v) => changeSetting('steering', v))),
        row('Sensitivity', h('div.range', null, range, out)),
        row('Mirrors', toggle('Mirrors', settings.mirrors, (v) => changeSetting('mirrors', v))),
        row('Speed limit sign', toggle('Show the speed limit sign', settings.showLimit, (v) => changeSetting('showLimit', v))),
        row('Minimap', toggle('Minimap', settings.minimap, (v) => changeSetting('minimap', v))),
        row('Examiner voice', toggle('Examiner voice', settings.voice, (v) => changeSetting('voice', v))),
        row('Sound', toggle('Sound', settings.sound, (v) => changeSetting('sound', v))),
        row('Graphics', segmented('Graphics quality', [['low', 'Low'], ['medium', 'Medium'], ['high', 'High']], settings.quality, (v) => changeSetting('quality', v))),
      ));
  };

  const rotateHint = () => {
    const el = h('p.rotate-hint', null);
    el.innerHTML = '<svg aria-hidden="true"><use href="#i-rotate"/></svg><span>Turn the phone sideways for a wider view of the road.</span>';
    return el;
  };
  const sheet = (name, body, foot) => h(`section.screen.screen-${name}`, { 'aria-label': name },
    h('div.screen-body', null, h('div.screen-inner', null, body)),
    foot ? h('div.screen-foot', null, h('div.screen-foot-inner', null, foot)) : null);
  // With a keyboard, Enter should start or resume straight away. On a phone a focus ring on the
  // main button would only be noise, so focus moves only where a fine pointer is present.
  const focusFirst = (node) => {
    let fine = false;
    try { fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches; } catch { /* old browser */ }
    const target = fine && node.querySelector('[data-autofocus]');
    if (target) { try { target.focus({ preventScroll: true }); } catch { /* not focusable yet */ } }
  };

  // ---- Loading ----
  const showLoading = (fraction = 0, label = '') => {
    if (current !== 'loading' || !loadingEls) {
      const fill = h('div.loading-fill');
      const text = h('p.loading-label', { role: 'status' });
      const bar = h('div.loading-bar', { role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100' }, fill);
      mount('loading', h('section.screen.screen-loading', { 'aria-label': 'Loading' },
        h('div.loading', null,
          h('div.masthead', null, h('span.l-plate', { 'aria-hidden': 'true', text: 'L' }), h('h1.title', { text: 'Prague Exam Drive' })),
          bar, text)));
      loadingEls = { fill, text, bar };
    }
    const p = Math.min(1, Math.max(0, Number(fraction) || 0));
    loadingEls.fill.style.setProperty('--p', p.toFixed(3));
    loadingEls.bar.setAttribute('aria-valuenow', String(Math.round(p * 100)));
    loadingEls.text.textContent = label || '';
  };

  // ---- Menu ----
  const showMenu = (cfg) => {
    config = cfg || config || { places: [], durations: [10, 20, 30], defaults: {} };
    const defaults = config.defaults || {};
    const places = config.places || [];
    const durations = config.durations && config.durations.length ? config.durations : [10, 20, 30];
    // Stored choices win over the defaults, as long as they still exist.
    settings = cleanSettings(cleanSettings(DEFAULT_SETTINGS, defaults.settings), loadStore().settings || settings);
    applyLook();
    const saved = { ...choice };
    choice = {
      mode: CHOICES.mode.includes(saved.mode) ? saved.mode : defaults.mode || 'exam',
      placeId: places.some((p) => p.id === saved.placeId) ? saved.placeId : defaults.placeId ?? (places[0] && places[0].id),
      duration: durations.includes(saved.duration) ? saved.duration : defaults.duration || durations[0],
      traffic: CHOICES.traffic.includes(saved.traffic) ? saved.traffic : defaults.traffic || 'normal',
    };
    if (!places.some((p) => p.id === choice.placeId) && places[0]) choice.placeId = places[0].id;

    const lengthRow = row('Exam length', segmented('Exam length', durations.map((d) => [d, `${d} min`]), choice.duration, (v) => { choice.duration = v; persist(); }));
    const setMode = (v) => {
      choice.mode = v;
      lengthRow.classList.toggle('is-off', v !== 'exam');
      persist();
    };
    lengthRow.classList.toggle('is-off', choice.mode !== 'exam');

    const placeList = h('div.places', { role: 'radiogroup', 'aria-label': 'Start place' });
    for (const p of places) {
      placeList.appendChild(h('button.place', {
        type: 'button', role: 'radio', 'aria-checked': p.id === choice.placeId ? 'true' : 'false',
        onclick: (e) => {
          for (const b of placeList.children) b.setAttribute('aria-checked', b === e.currentTarget ? 'true' : 'false');
          choice.placeId = p.id;
          persist();
        },
      }, h('span.place-name', { text: p.name }), p.note ? h('span.place-note', { text: p.note }) : null));
    }

    const start = h('button.btn.btn-primary.btn-wide', {
      type: 'button', 'data-autofocus': true, text: 'Start',
      onclick: () => { persist(); call('onStart', { ...choice, settings: { ...settings } }); },
    });

    const node = sheet('menu',
      h('div.menu-grid', null,
        h('div.menu-intro', null,
          h('div.masthead', null, h('span.l-plate', { 'aria-hidden': 'true', text: 'L' }), h('h1.title', { text: 'Prague Exam Drive' })),
          h('p.lede', { text: 'The Czech practical driving exam on the real streets of north-east Prague. An examiner gives directions, and a result sheet tells you what went wrong and which rule applies.' }),
          h('p.note', { text: 'Buildings are simplified blocks in their real positions, and some signs are inferred from the map. This trains rules and observation, not the feel of the car.' }),
          rotateHint()),
        h('div.rows', null,
          row('Mode', segmented('Mode', [['exam', 'Exam'], ['free', 'Free drive']], choice.mode, setMode)),
          row('Start place', placeList, '.row-top'),
          lengthRow,
          row('Traffic', segmented('Traffic', [['light', 'Light'], ['normal', 'Normal'], ['busy', 'Busy']], choice.traffic, (v) => { choice.traffic = v; persist(); })),
          settingsGroup(false))),
      [h('p.credit', { text: 'Map data © OpenStreetMap contributors' }), start]);
    mount('menu', node);
    focusFirst(node);
  };

  // ---- Pause ----
  const showPause = () => {
    const legend = h('div.legend', null,
      h('p.eyebrow', { text: 'Keyboard' }),
      h('ul.keys', null, KEYS.map(([k, what]) => h('li', null, h('kbd', { text: k }), h('span', { text: what })))));
    const node = sheet('pause',
      h('div.pause-grid', null,
        h('div.pause-actions', null,
          h('h1.pause-title', { text: 'Paused' }),
          h('button.btn.btn-primary', { type: 'button', 'data-autofocus': true, text: 'Resume', onclick: () => call('onResume') }),
          h('button.btn', { type: 'button', text: 'Restart', onclick: () => call('onRetry') }),
          h('button.btn', { type: 'button', text: 'Menu', onclick: () => call('onMenu') }),
          rotateHint()),
        h('div', null, settingsGroup(true), legend)));
    mount('pause', node);
    focusFirst(node);
  };

  // ---- Result ----
  const lawFacts = (fault, entry, withWhere) => {
    const facts = h('dl.facts');
    const add = (label, value, cls) => { if (value) facts.appendChild(h('div', null, h('dt', { text: label }), cls ? h(`dd.${cls}`, null, value) : h('dd', null, value))); };
    if (withWhere) add('Where', `${fault.street || 'Unnamed road'}, ${clock(fault.t)} into the drive`);
    add('Detail', fault.note);
    add('Rule', entry.rule);
    if (entry.law || entry.cz) {
      add('Law', [entry.law || '', entry.cz ? h('span.cz', { lang: 'cs', text: entry.cz }) : null], 'law');
    }
    return facts;
  };

  const showResult = (result, lawbook = {}) => {
    const r = result || {};
    const faults = r.faults || [];
    const stats = r.stats || {};
    const entryFor = (f) => (f && lawbook[f.code]) || {};
    const titleFor = (f) => entryFor(f).title || title(f.code || 'Fault');
    const exam = r.mode !== 'free';
    const verdict = !exam ? 'none' : r.passed ? 'pass' : 'fail';
    const place = config && (config.places || []).find((p) => p.id === r.startId);
    const today = new Date();
    const meta = [`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}`, 'Skupina B', place && place.name].filter(Boolean).join(' · ');

    const minor = stats.minor ?? faults.filter((f) => f.severity === 'minor').length;
    const serious = stats.serious ?? faults.filter((f) => f.severity === 'serious').length;
    let line = 'Free drive: nothing was assessed.';
    if (verdict === 'pass') line = minor ? `Passed with ${minor} minor fault${minor === 1 ? '' : 's'}.` : 'Passed with a clean sheet.';
    if (verdict === 'fail') line = r.reason && r.reason.severity === 'serious' ? 'The examiner had to step in. The exam ended at once.' : 'Too many minor faults.';

    const head = h('div.verdict', { 'data-verdict': verdict },
      h('p.verdict-cz', { lang: 'cs', text: verdict === 'pass' ? 'Prospěl' : verdict === 'fail' ? 'Neprospěl' : 'Volná jízda' }),
      verdict === 'none' ? null : h('p.verdict-en', { text: verdict === 'pass' ? 'Passed' : 'Failed' }),
      h('p.verdict-line', { text: line }));

    let reason = null;
    if (verdict === 'fail') {
      const f = r.reason || faults[faults.length - 1] || { code: 'TOO_MANY_MINOR', t: stats.duration };
      const e = entryFor(f);
      reason = h('div.reason', null,
        h('p.eyebrow', { text: 'Reason for failing' }),
        h('h2.reason-title', { text: titleFor(f) }),
        e.what ? h('p.reason-what', { text: e.what }) : null,
        lawFacts(f, e, true));
    }

    const list = h('div.faults');
    faults.forEach((f) => {
      const e = entryFor(f);
      list.appendChild(h('details.fault', null,
        h('summary', null,
          h('span.fault-time', { text: clock(f.t) }),
          h('span.fault-main', null, h('span.fault-title', { text: titleFor(f) }), h('span.fault-street', { text: f.street || 'Unnamed road' })),
          h('span.chip', { 'data-severity': f.severity === 'serious' ? 'serious' : 'minor', text: f.severity === 'serious' ? 'Serious' : 'Minor' })),
        h('div.fault-body', null, e.what ? h('p.reason-what', { text: e.what }) : null, lawFacts(f, e, false))));
    });
    if (!faults.length) list.appendChild(h('p.faults-none', { text: 'No faults recorded.' }));

    const stat = (label, value, unit) => h('div', null, h('dt', { text: label }), h('dd', null, value, unit ? h('small', { text: unit }) : null));
    const num = (v, digits = 0) => (Number.isFinite(v) ? v.toFixed(digits) : '–');
    // Speeds arrive in m/s like everything else in the simulation; the sheet shows km/h.
    const statsEl = h('dl.stats', null,
      stat('Time', clock(stats.duration)),
      stat('Distance', num((stats.distance || 0) / 1000, 1), 'km'),
      stat('Average', num(stats.avgSpeed * 3.6), 'km/h'),
      stat('Top speed', num(stats.maxSpeed * 3.6), 'km/h'),
      stat('Junctions', num(stats.junctions)),
      stat('Stops at signs', num(stats.stopsAtSigns)),
      stat('Minor faults', String(minor)),
      stat('Serious faults', String(serious)));

    const map = h('canvas.result-map', { 'aria-label': 'Map of the driven route' });
    const section = (name, count, body) => h('div', null, h('div.section-title', null, h('h3.eyebrow', { text: name }), count ? h('span.count', { text: count }) : null), body);

    const node = sheet('result',
      [h('div.record-head', null,
        h('p.eyebrow', { lang: 'cs', text: 'Záznam o zkoušce z praktické jízdy' }),
        h('p.record-meta', { text: meta })),
      h('div.record-grid', null,
        h('div.record-col', null, head, reason, section('Drive', '', h('div', { style: 'padding-top:10px' }, statsEl))),
        h('div.record-col', null,
          section('Faults', faults.length ? `${faults.length} recorded · tap for the rule` : '', list),
          section('Route', '', h('div', { style: 'padding-top:10px' }, map))))],
      [h('p.credit', { text: 'Map data © OpenStreetMap contributors' }),
        h('div.result-actions', null,
          h('button.btn.btn-primary', { type: 'button', 'data-autofocus': true, text: 'Retry the same route', onclick: () => call('onRetry') }),
          h('button.btn', { type: 'button', text: 'New route', onclick: () => call('onNewRoute') }),
          h('button.btn', { type: 'button', text: 'Menu', onclick: () => call('onMenu') }))]);
    mount('result', node);

    // The canvas is in the page now, so it has a size: match the bitmap to it, then hand it over.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    map.width = Math.max(2, Math.round(map.clientWidth * dpr));
    map.height = Math.max(2, Math.round(map.clientHeight * dpr));
    call('drawResultMap', map, r);
    focusFirst(node);
  };

  // Esc resumes from the pause sheet. Capture phase, so the game's own key handler never
  // sees this press and cannot pause again in the same breath.
  const onKey = (e) => {
    if (current === 'pause' && (e.code === 'Escape' || e.code === 'KeyP') && !e.repeat) {
      e.preventDefault();
      e.stopImmediatePropagation();
      call('onResume');
    }
  };
  window.addEventListener('keydown', onKey, true);

  return {
    showLoading,
    showMenu,
    showPause,
    showResult,
    hide() { mount(null); },
    get current() { return current; },
    get settings() { return { ...settings }; },
    destroy() {
      window.removeEventListener('keydown', onKey, true);
      mount(null);
    },
  };
}
