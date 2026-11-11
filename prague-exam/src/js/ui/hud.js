// Head-up display and instrument cluster. Binds to the markup in src/page.html.
//
//   const hud = createHud(document.getElementById('game'));
//   hud.update(car, info)   every frame; the DOM is only touched when a shown value changes
//   hud.minimap             square canvas, device-pixel sized, for the caller to draw into
//   hud.onBlink = (on) => {}   optional: called when the indicator lamp flips (for the relay click)

const SVG = 'http://www.w3.org/2000/svg';
const BLINK_HZ = 1.5;
const MAX_KMH = 200;
const REDLINE = 6000;
const MAX_RPM = 7000;

// Dial geometry in the 200 x 156 viewBox: centre (100, 100), sweep 240 degrees, 100 km/h on top.
const CX = 100;
const CY = 100;
const dialAngle = (kmh) => -120 + (Math.min(MAX_KMH, Math.max(0, kmh)) / MAX_KMH) * 240;
const polar = (r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [CX + r * Math.sin(a), CY - r * Math.cos(a)];
};
const arcPath = (r, from, to) => {
  const [x0, y0] = polar(r, from);
  const [x1, y1] = polar(r, to);
  return `M${x0.toFixed(2)} ${y0.toFixed(2)}A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
};

function svgEl(name, attrs, parent) {
  const el = document.createElementNS(SVG, name);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(el);
  return el;
}

function buildDial(svg) {
  svg.textContent = '';
  svgEl('circle', { class: 'dial-face', cx: CX, cy: CY, r: 98.5 }, svg);
  for (let v = 0; v <= MAX_KMH; v += 10) {
    const major = v % 50 === 0;
    const a = dialAngle(v);
    const [x0, y0] = polar(major ? 83 : 89, a);
    const [x1, y1] = polar(96, a);
    svgEl('line', {
      class: `dial-tick${major ? ' dial-tick-major' : ''}${v === 50 ? ' dial-tick-50' : ''}`,
      x1: x0.toFixed(2), y1: y0.toFixed(2), x2: x1.toFixed(2), y2: y1.toFixed(2),
    }, svg);
    if (major) {
      const [x, y] = polar(68, a);
      const t = svgEl('text', { class: `dial-num${v === 50 ? ' dial-num-50' : ''}`, x: x.toFixed(1), y: (y + 7).toFixed(1) }, svg);
      t.textContent = String(v);
    }
  }
  // Rev counter: a thin arc inside the speed scale, red above the redline.
  svgEl('path', { class: 'dial-rev-track', d: arcPath(54, -120, 120) }, svg);
  svgEl('path', { class: 'dial-rev-red', d: arcPath(54, -120 + (REDLINE / MAX_RPM) * 240, 120) }, svg);
  const rev = svgEl('path', { class: 'dial-rev', d: arcPath(54, -120, 120), pathLength: 100, 'stroke-dasharray': '0 100' }, svg);

  const arrowL = svgEl('svg', { class: 'dial-arrow', x: 58, y: 49, width: 21, height: 21, viewBox: '0 0 24 24' }, svg);
  svgEl('use', { href: '#i-ind-l' }, arrowL);
  const arrowR = svgEl('svg', { class: 'dial-arrow', x: 121, y: 49, width: 21, height: 21, viewBox: '0 0 24 24' }, svg);
  svgEl('use', { href: '#i-ind-r' }, arrowR);
  svgEl('rect', { class: 'dial-gear-box', x: 88.5, y: 49, width: 23, height: 21, rx: 4 }, svg);
  const gear = svgEl('text', { class: 'dial-gear', x: 100, y: 66.5 }, svg);
  gear.textContent = 'P';
  const speed = svgEl('text', { class: 'dial-speed', x: 100, y: 110 }, svg);
  speed.textContent = '0';

  const needle = svgEl('g', { transform: `rotate(-120 ${CX} ${CY})` }, svg);
  svgEl('path', { class: 'dial-needle', d: 'M100 4.5 104 34 96 34z' }, needle);
  return { rev, arrowL, arrowR, gear, speed, needle };
}

// Examiner's direction arrows: white on the blue plate, in a 40 x 40 box.
const S = 'fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"';
const ICONS = {
  left: `<path ${S} d="M27 31V19a4 4 0 0 0-4-4H11M17 8.5 10.5 15l6.5 6.5"/>`,
  right: `<path ${S} d="M13 31V19a4 4 0 0 1 4-4h12M23 8.5 29.5 15 23 21.5"/>`,
  straight: `<path ${S} d="M20 32V9M12.5 16 20 8.5l7.5 7.5"/>`,
  uturn: `<path ${S} d="M27 32V17a7 7 0 0 0-14 0v10M7.5 21.5 13 27.5l5.5-6"/>`,
  roundabout: `<path ${S} d="M20 10a10 10 0 1 0 10 10M20 10l5-5M20 10l5 5"/>`,
  park: `<path ${S} d="M14.5 32V9h7.5a6.5 6.5 0 0 1 0 13h-7.5"/>`,
  start: `<path ${S} d="M27 32v-6c0-7-12-5-12-14V9M9 15l6-6.5 6 6.5"/>`,
  stop: `<path ${S} d="M13 32v-6c0-7 12-5 12-13M18 9h14"/>`,
};

const two = (n) => String(n).padStart(2, '0');
const clock = (s) => {
  const t = Math.max(0, Math.floor(s));
  return `${two(Math.floor(t / 60))}:${two(t % 60)}`;
};
const distanceText = (m) => {
  if (m == null || !Number.isFinite(m)) return '';
  if (m >= 950) return `${(m / 1000).toFixed(1)} km`;
  if (m >= 100) return `${Math.round(m / 50) * 50} m`;
  return `${Math.max(10, Math.round(m / 10) * 10)} m`;
};

export function createHud(root) {
  const $ = (sel) => root.querySelector(sel);
  const dial = buildDial($('#dial'));
  const wheel = $('#wheel');
  const el = {
    banner: $('#instruction'), icon: $('#instruction-icon'), cz: $('#instruction-cz'), en: $('#instruction-en'), dist: $('#instruction-dist'),
    street: $('#status-street'), time: $('#status-time'), faults: $('#status-faults'),
    toasts: $('#toasts'), limit: $('#limit'), limitValue: $('#limit-value'),
    checklist: $('#checklist'), checklistItems: $('#checklist-items'),
    indL: $('[data-ind="left"]'), indR: $('[data-ind="right"]'),
    lamps: Object.fromEntries([...root.querySelectorAll('[data-lamp-for]')].map((b) => [b.dataset.lampFor, b])),
    gears: [...root.querySelectorAll('.gear')],
  };
  const minimap = $('#minimap');
  const shown = {};                 // last value written for each DOM slot
  let blinkStart = 0;
  let blinkOn = null;
  let lastIndicator = 'off';

  const set = (key, value, write) => {
    if (shown[key] === value) return;
    shown[key] = value;
    write(value);
  };
  const lamp = (name, colour) => set(`lamp-${name}`, colour, (c) => {
    const b = el.lamps[name];
    if (!b) return;
    if (c) b.dataset.lamp = c; else delete b.dataset.lamp;
    b.setAttribute('aria-pressed', c ? 'true' : 'false');
  });

  // Keep the minimap bitmap at device pixels, capped like the main view.
  const sizeMinimap = () => {
    const css = minimap.clientWidth || 100;
    const px = Math.round(css * Math.min(window.devicePixelRatio || 1, 2));
    if (minimap.width !== px) { minimap.width = px; minimap.height = px; }
  };
  sizeMinimap();
  let ro = null;
  if (typeof ResizeObserver === 'function') {
    ro = new ResizeObserver(sizeMinimap);
    ro.observe(minimap);
  } else {
    window.addEventListener('resize', sizeMinimap);
  }

  const api = {
    minimap,
    onBlink: null,
    get blink() { return blinkOn; },

    update(car, info = {}) {
      const now = performance.now();
      const kmh = Math.abs(car.speed || 0) * 3.6;

      set('needle', dialAngle(kmh).toFixed(1), (a) => dial.needle.setAttribute('transform', `rotate(${a} ${CX} ${CY})`));
      set('speed', Math.round(kmh), (v) => { dial.speed.textContent = String(v); });
      set('gear', car.gear || 'P', (g) => {
        dial.gear.textContent = g;
        for (const b of el.gears) b.setAttribute('aria-checked', b.dataset.gear === g ? 'true' : 'false');
      });
      const rev = car.engineOn ? Math.min(1, Math.max(0, (car.rpm || 0) / MAX_RPM)) : 0;
      set('rev', Math.round(rev * 100), (v) => dial.rev.setAttribute('stroke-dasharray', `${v} 100`));

      // 0.6 rad at the front wheels is 450 degrees at the steering wheel.
      set('wheel', (((car.steer || 0) / 0.6) * 450).toFixed(1), (deg) => wheel.style.setProperty('--rot', `${deg}deg`));

      // Indicators blink at 1.5 Hz and start lit the moment they are switched on.
      const ind = car.indicator || 'off';
      if (ind !== lastIndicator) { lastIndicator = ind; blinkStart = now; }
      const phase = ind === 'off' ? null : (((now - blinkStart) / 1000) * BLINK_HZ) % 1 < 0.5;
      if (phase !== blinkOn) {
        blinkOn = phase;
        if (phase !== null && typeof api.onBlink === 'function') api.onBlink(phase);
      }
      const left = !!phase && (ind === 'left' || ind === 'hazard');
      const right = !!phase && (ind === 'right' || ind === 'hazard');
      set('ind-l', left, (v) => { dial.arrowL.classList.toggle('is-lit', v); el.indL.classList.toggle('is-lit', v); });
      set('ind-r', right, (v) => { dial.arrowR.classList.toggle('is-lit', v); el.indR.classList.toggle('is-lit', v); });
      set('arm-l', ind === 'left', (v) => { el.indL.classList.toggle('is-armed', v); el.indL.setAttribute('aria-pressed', String(v)); });
      set('arm-r', ind === 'right', (v) => { el.indR.classList.toggle('is-armed', v); el.indR.setAttribute('aria-pressed', String(v)); });

      // Tell-tales: lit means what it means on a real dashboard.
      lamp('belt', car.belt ? '' : 'red');
      lamp('lights', car.lights === 'dipped' ? 'green' : '');
      lamp('engine', car.engineOn ? '' : 'amber');
      lamp('handbrake', car.handbrake ? 'red' : '');
      lamp('hazard', ind === 'hazard' && phase ? 'red' : '');

      set('street', info.street || '', (v) => { el.street.textContent = v; });
      let time = '';
      if (info.elapsed != null) time = clock(info.elapsed);
      if (info.remaining != null) time = `${time ? `${time} · ` : ''}${clock(info.remaining)} left`;
      set('time', time, (v) => { el.time.textContent = v; });
      const exam = info.mode !== 'free' && info.minor != null;
      const faults = exam ? `Minor faults ${info.minor}${info.minorLimit ? `/${info.minorLimit}` : ''}` : '';
      set('faults', faults, (v) => { el.faults.textContent = v; });
      const level = !exam || !info.minor ? 'none' : info.minorLimit && info.minor >= info.minorLimit - 1 ? 'last' : 'some';
      set('fault-level', level, (v) => { el.faults.dataset.level = v; });

      const limit = info.limit == null ? '' : String(Math.round(info.limit));
      set('limit', limit, (v) => {
        el.limit.hidden = !v;
        el.limitValue.textContent = v;
        el.limit.setAttribute('aria-label', v ? `Speed limit ${v} km/h` : 'Speed limit');
      });
    },

    setInstruction(instr) {
      if (!instr || (!instr.cz && !instr.en)) {
        el.banner.hidden = true;
        shown.instr = '';
        return;
      }
      const key = `${instr.cz}|${instr.en}|${instr.icon}|${instr.quiet ? 1 : 0}`;
      if (shown.instr !== key) {
        shown.instr = key;
        el.cz.textContent = instr.cz || instr.en || '';
        el.en.textContent = instr.cz ? instr.en || '' : '';
        el.icon.innerHTML = ICONS[instr.icon] ? `<svg viewBox="0 0 40 40">${ICONS[instr.icon]}</svg>` : '';
        el.banner.classList.toggle('is-quiet', !!instr.quiet);
        el.banner.classList.toggle('is-long', (instr.cz || instr.en || '').length > 56);
        el.banner.hidden = false;
        // Restart the entrance so a new instruction catches the eye; quiet hints just appear.
        el.banner.classList.remove('is-new');
        if (!instr.quiet) { void el.banner.offsetWidth; el.banner.classList.add('is-new'); }
      }
      const dist = distanceText(instr.distance);
      if (shown.dist !== dist) { shown.dist = dist; el.dist.textContent = dist; }
    },

    toast({ text, severity = 'info' } = {}) {
      if (!text) return;
      const node = document.createElement('div');
      node.className = 'toast';
      node.dataset.severity = severity;
      const span = document.createElement('span');
      span.textContent = text;
      node.appendChild(span);
      el.toasts.appendChild(node);
      while (el.toasts.children.length > 3) el.toasts.firstElementChild.remove();
      const life = severity === 'serious' ? 7000 : severity === 'minor' ? 4500 : 3200;
      setTimeout(() => {
        node.classList.add('is-leaving');
        setTimeout(() => node.remove(), 320);
      }, life);
    },

    setChecklist(items) {
      if (!items || !items.length) {
        el.checklist.hidden = true;
        el.checklistItems.textContent = '';
        shown.checklist = '';
        return;
      }
      const key = items.map((i) => `${i.id}:${i.done ? 1 : 0}:${i.label}`).join('|');
      if (shown.checklist === key) return;
      shown.checklist = key;
      el.checklistItems.textContent = '';
      let next = true;
      for (const item of items) {
        const li = document.createElement('li');
        li.textContent = item.label;
        if (item.done) li.className = 'is-done';
        else if (next) { li.className = 'is-next'; next = false; }
        el.checklistItems.appendChild(li);
      }
      el.checklist.hidden = false;
    },

    setVisible(visible) {
      root.dataset.hud = visible ? 'on' : 'off';
      if (visible) sizeMinimap();
    },

    destroy() {
      if (ro) ro.disconnect(); else window.removeEventListener('resize', sizeMinimap);
    },
  };
  return api;
}
