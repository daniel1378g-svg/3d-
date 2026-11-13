// Page behaviour: languages, navigation, the wrap configurator, the appointment form and the hand-over to
// the 3D scene. The page is fully usable before (and without) the 3D bundle.
import { CONFIG } from './config.js';
import { LANGS, LOCALES, translate } from './i18n.js';
import { COLORS, DEFAULT_SELECTION, colorById } from './colors.js';
import { createStory, SHOTS } from './story.js';
import { SEQUENCES } from './three/experience.js';

const SEQ = SEQUENCES[CONFIG.interior];                       // what the interior sequence shows for this business
const NS = CONFIG.key === 'fastwheels' ? 'fw' : CONFIG.key;   // prefix for what is remembered in the browser

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const root = document.documentElement;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const store = {
  get(key) { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode: nothing to do */ } },
};
const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const reduced = () => reducedQuery.matches;

// ---------------------------------------------------------------------------------------------- language
let lang = (() => {
  const saved = store.get(`${NS}.lang`);
  return LANGS.includes(saved) ? saved : CONFIG.defaultLanguage;
})();
const t = (key, vars) => translate(lang, key, vars);
const colorName = (c) => c.name[LANGS.indexOf(lang)] ?? c.name[0];

function applyTexts(scope = document) {
  for (const el of $$('[data-i18n]', scope)) el.textContent = t(el.dataset.i18n, el.dataset.i18nVars ? JSON.parse(el.dataset.i18nVars) : undefined);
  for (const el of $$('[data-i18n-attr]', scope)) for (const pair of el.dataset.i18nAttr.split(';')) { const [attr, key] = pair.split(':'); el.setAttribute(attr, t(key)); }
  for (const el of $$('[data-color]', scope)) { const name = colorName(colorById(el.dataset.color)); el.textContent = name; el.closest('.sw')?.setAttribute('title', name); }
}

/** The first piece of content below the header and where it sits, so the same content stays put after a change. */
function scrollAnchor() {
  // Whatever sits in the middle of the screen is what the visitor is looking at: hold that still.
  const top = headerHeight(), middle = top + (window.innerHeight - top) / 2;
  let best = null, bestGap = Infinity;
  for (const el of $$('main h1, main h2, main h3, main p, main legend, main label, main li, main figure, main input, main textarea, .site-footer h3, .site-footer p, .site-footer li')) {
    if (!el.offsetParent) continue;
    const r = el.getBoundingClientRect();
    if (!r.height || r.bottom < top || r.top > window.innerHeight) continue;
    const gap = Math.abs((r.top + r.bottom) / 2 - middle);
    if (gap < bestGap) { bestGap = gap; best = { el, top: r.top }; }
  }
  return best;
}

function setLanguage(next, { silent = false } = {}) {
  if (!LANGS.includes(next)) return;
  const anchor = silent ? null : scrollAnchor();
  lang = next;
  root.lang = LOCALES[lang];
  document.title = CONFIG.brand.title;
  $('meta[name="description"]')?.setAttribute('content', t('meta.description'));
  applyTexts();
  renderReadout(); renderWrapChoice(); renderOfflineText(); renderHours(); updateViewerLabel();
  $('#lang-select').value = lang;
  store.set(`${NS}.lang`, lang);
  if (anchor) { const drift = anchor.el.getBoundingClientRect().top - anchor.top; if (Math.abs(drift) > 1) window.scrollBy(0, drift); }
  if (!silent) {
    for (const el of $$('.logo')) { el.classList.remove('is-sweeping'); void el.offsetWidth; el.classList.add('is-sweeping'); }
    window.setTimeout(() => $$('.logo').forEach((el) => el.classList.remove('is-sweeping')), 520);
    announce(t('lang.changed'));
  }
}
function announce(text) { const live = $('#live'); live.textContent = ''; window.setTimeout(() => { live.textContent = text; }, 40); }

// ---------------------------------------------------------------------------------------------- navigation
const headerHeight = () => $('#header').getBoundingClientRect().height;
let staticInterior = false;

function targetTop(id) {
  if (id === 'top') return 0;
  if (id in SEQ.anchors && !staticInterior) {                  // a point inside the pinned sequence
    const cine = $('#cine'), r = cine.getBoundingClientRect();
    return window.scrollY + r.top + (cine.offsetHeight - window.innerHeight) * SEQ.anchors[id];
  }
  let el = document.getElementById(id);
  if (id in SEQ.anchors && staticInterior) el = $$('#stills .compare')[Object.keys(SEQ.anchors).indexOf(id)] || $('#stills');
  if (!el) return null;
  const top = window.scrollY + el.getBoundingClientRect().top;
  return el.classList.contains('step') ? top : top - headerHeight() + 1;
}

function go(id, { focus = true } = {}) {
  closeMenu();
  setFull(false);
  const top = targetTop(id);
  if (top === null) return;
  const far = Math.abs(top - window.scrollY) > window.innerHeight * 1.2;
  const el = id === 'top' ? $('#top') : document.getElementById(id);
  if (far || reduced()) {
    window.scrollTo(0, top);                                   // long hops jump: no ride through the pinned sequences
    const band = el?.closest('section') || el;
    if (band && !reduced()) { band.classList.remove('jump-in'); void band.offsetWidth; band.classList.add('jump-in'); }
  } else window.scrollTo({ top, behavior: 'smooth' });
  if (focus) {
    const heading = el?.matches('h1,h2,[tabindex="-1"]') ? el : el?.querySelector('h1, h2[tabindex="-1"], h2');
    if (heading) { if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
  }
}

function openMenu() {
  $('#menu').hidden = false;
  root.classList.add('menu-open', 'is-locked');
  const toggle = $('#menu-toggle');
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', t('nav.close'));
  toggle.dataset.i18nAttr = 'aria-label:nav.close';
  $('.menu-link')?.focus();
  updateFab();
}
function closeMenu() {
  if ($('#menu').hidden) return;
  $('#menu').hidden = true;
  root.classList.remove('menu-open');
  if (!isFull()) root.classList.remove('is-locked');
  const toggle = $('#menu-toggle');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', t('nav.menu'));
  toggle.dataset.i18nAttr = 'aria-label:nav.menu';
  updateFab();
}

// ---------------------------------------------------------------------------------------------- hero story
let story = null;
function initStory() {
  const canvas = $('#story-canvas');
  if (reduced()) { root.classList.add('static-story'); return; }
  const small = Math.min(window.innerWidth, window.innerHeight) < 760 || (navigator.connection && navigator.connection.saveData);
  story = createStory(canvas, { small, grade: CONFIG.story.grade, onReady: () => $('.story').classList.add('story-live') });
  if (!story) { root.classList.add('static-story'); return; }
  new IntersectionObserver(([e]) => story.setVisible(e.isIntersecting), { rootMargin: '10% 0px' }).observe($('.story'));
}
function updateStory() {
  if (!story) return;
  const el = $('.story'), r = el.getBoundingClientRect();
  const stepHeight = el.offsetHeight / SHOTS.length;
  story.setProgress(clamp(-r.top / stepHeight, 0, SHOTS.length - 1));
}

// ---------------------------------------------------------------------------------------------- configurator
const selection = (() => {
  const saved = store.get(`${NS}.wrap`) || {};
  const s = { ...(CONFIG.defaultSelection || DEFAULT_SELECTION) };
  if (saved.vehicle === 'car' || saved.vehicle === 'bike') s.vehicle = saved.vehicle;
  if (COLORS.some((c) => c.id === saved.color)) s.color = saved.color;
  if (['gloss', 'satin', 'matte'].includes(saved.finish)) s.finish = saved.finish;
  if (['solid', 'metallic', 'pearl'].includes(saved.effect)) s.effect = saved.effect;
  if (!colorById(s.color).effects.includes(s.effect)) s.effect = colorById(s.color).effects[0];
  return s;
})();
let wrapChoice = null;                              // the configuration attached to the appointment request, if any
let viewAngle = 319;
const paintSpec = () => ({ hex: colorById(selection.color).hex, finish: selection.finish, effect: selection.effect });
const describe = (s) => { const c = colorById(s.color); return { vehicle: t('vehicle.' + s.vehicle), model: s.vehicle === 'car' ? 'BMW M4 Competition' : 'BMW S 1000 RR', color: colorName(c), finish: t('finish.' + s.finish), effect: t('effect.' + s.effect), hex: c.hex }; };

function renderReadout() {
  const d = describe(selection);
  $('#readout-chip').style.setProperty('--chip', d.hex);
  $('#readout-name').textContent = d.color;
  $('#readout-finish').textContent = `${d.finish} · ${d.effect}`;
}
function updateViewerLabel() {
  const d = describe(selection);
  $('#viewer-stage').setAttribute('aria-label', t('viewer.label', { vehicle: d.model, color: d.color, finish: `${d.finish}, ${d.effect}`, angle: viewAngle }));
}
function syncSelection({ fromUser = false } = {}) {
  const c = colorById(selection.color);
  if (!c.effects.includes(selection.effect)) selection.effect = c.effects[0];
  $(`#wrap-vehicle-${selection.vehicle}`).checked = true;
  $(`#wrap-color-${selection.color}`).checked = true;
  $(`#wrap-finish-${selection.finish}`).checked = true;
  let anyOff = false;
  for (const input of $$('input[name="wrap-effect"]')) { input.disabled = !c.effects.includes(input.value); anyOff ||= input.disabled; input.checked = input.value === selection.effect; }
  $('#effect-note').hidden = !anyOff;
  showFamily(c.family);
  renderReadout(); updateViewerLabel();
  store.set(`${NS}.wrap`, selection);
  scene?.setPaint(paintSpec());
  scene?.setVehicle(selection.vehicle);
  if (!$('#viewer-stage').classList.contains('is-live')) $('#viewer-poster').src = `img/poster-${selection.vehicle}.webp`;
  if (fromUser) { const d = describe(selection); announce(`${d.model}: ${d.color}, ${d.finish}, ${d.effect}`); }
}
function showFamily(family) {
  $(`#wrap-family-${family}`).checked = true;
  for (const sw of $$('#swatches .sw')) sw.hidden = sw.dataset.family !== family;
}
const isFull = () => $('#config').classList.contains('is-full');
function setFull(on) {
  if (on === isFull()) return;
  $('#config').classList.toggle('is-full', on);
  root.classList.toggle('is-locked', on);
  $('#viewer-back').hidden = !on;
  $('#viewer-full').hidden = on;
  if (on) $('#viewer-back').focus(); else $('#viewer-full').focus({ preventScroll: true });
  updateFab();
  pickStage();
}

function initConfigurator() {
  for (const input of $$('input[name="wrap-vehicle"]')) input.addEventListener('change', () => { selection.vehicle = input.value; syncSelection({ fromUser: true }); });
  for (const input of $$('input[name="wrap-family"]')) input.addEventListener('change', () => showFamily(input.value));
  for (const input of $$('input[name="wrap-color"]')) input.addEventListener('change', () => { selection.color = input.value; syncSelection({ fromUser: true }); });
  for (const input of $$('input[name="wrap-finish"]')) input.addEventListener('change', () => { selection.finish = input.value; syncSelection({ fromUser: true }); });
  for (const input of $$('input[name="wrap-effect"]')) input.addEventListener('change', () => { selection.effect = input.value; syncSelection({ fromUser: true }); });
  $('#rot-left').addEventListener('click', () => scene?.rotateBy(-30));
  $('#rot-right').addEventListener('click', () => scene?.rotateBy(30));
  $('#rot-reset').addEventListener('click', () => scene?.resetView());
  $('#viewer-full').addEventListener('click', () => setFull(true));
  $('#viewer-back').addEventListener('click', () => setFull(false));
  $('#viewer-stage').addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { scene?.rotateBy(-15); e.preventDefault(); }
    else if (e.key === 'ArrowRight') { scene?.rotateBy(15); e.preventDefault(); }
    else if (e.key === 'Home') { scene?.resetView(); e.preventDefault(); }
  });
  $('#config-request').addEventListener('click', (e) => {
    e.preventDefault();
    wrapChoice = { ...selection };
    $(`#f-service-${CONFIG.wrapService[selection.vehicle]}`).checked = true;
    $(`#f-type-${selection.vehicle}`).checked = true;
    renderWrapChoice();
    clearError('services');
    go('booking');
  });
  syncSelection();
}

// ---------------------------------------------------------------------------------------------- 3D scene
let scene = null, scenePromise = null, no3d = false, activeStage = null;
const stageRatio = { config: 0, interior: 0 };
const supports3d = () => {
  if (typeof DecompressionStream !== 'function') return false;
  try { return !!document.createElement('canvas').getContext('webgl2'); } catch { return false; }
};
function disable3d() {
  no3d = true;
  $('#viewer-loading').hidden = true;
  $('#viewer-msg').hidden = false;
  for (const el of $$('.tool-buttons .tool')) el.disabled = true;
  $('.viewer-tools').hidden = true;
  $('#viewer-stage').classList.remove('is-live');
  setStaticInterior(true);
}
function setStaticInterior(on) {
  staticInterior = on;
  root.classList.toggle('static-interior', on);
  $('#stills').hidden = !on;
}
function loadSceneBundle() {
  return new Promise((resolve, reject) => {
    if (window.FWScene) { resolve(); return; }
    const s = document.createElement('script');
    s.src = 'scene.js';
    s.async = true;
    s.onload = () => (window.FWScene ? resolve() : reject(new Error('3D bundle did not start')));
    s.onerror = () => reject(new Error('3D bundle did not load'));
    document.head.appendChild(s);
  });
}
function ensureScene() {
  if (no3d) return Promise.resolve(null);
  if (!scenePromise) {
    if (!supports3d()) { disable3d(); return Promise.resolve(null); }
    scenePromise = loadSceneBundle().then(() => {
      scene = window.FWScene.createScene({ reducedMotion: reduced(), modelBase: 'models/', onState: onSceneState, tier: window.FW_CONFIG?.tier, instant: !!window.FW_CONFIG?.instant, accent: CONFIG.scene.accent, sequence: CONFIG.interior });
      scene.setTintLevel(tintLevel);
      scene.setPaint(paintSpec(), true);
      scene.setVehicle(selection.vehicle);
      scene.setAmbientColor(light.color);
      scene.setAmbientBrightness(light.brightness);
      pickStage();
      return scene;
    }).catch(() => { disable3d(); return null; });
  }
  return scenePromise;
}
function onSceneState(e) {
  if (e.type === 'progress') {
    const wanted = activeStage === 'interior' ? 'car' : selection.vehicle;
    if (e.what === wanted) { $('#viewer-meter').style.transform = `scaleX(${Math.max(0.04, e.value)})`; }
  } else if (e.type === 'ready') {
    const host = e.mode === 'config' ? $('#viewer-stage') : $('#cine-pic');
    if (activeStage === e.mode) host.classList.add('is-live');
    if (e.mode === 'config') $('#viewer-loading').hidden = true;
  } else if (e.type === 'loaded') {
    if (e.what === 'car') (window.requestIdleCallback || ((f) => setTimeout(f, 1500)))(() => scene?.preload('bike'));
  } else if (e.type === 'error') {
    if (e.what === 'car' || e.what === selection.vehicle) disable3d();
  } else if (e.type === 'contextlost') {
    disable3d();
  } else if (e.type === 'angle') {
    viewAngle = e.degrees; updateViewerLabel();
  }
}
/** Give the single WebGL canvas to whichever stage is on screen, or park it. */
function pickStage() {
  if (!scene || no3d) return;
  let next = null;
  if (isFull()) next = 'config';
  else if (!staticInterior && stageRatio.interior > 0.5) next = 'interior';
  else if (stageRatio.config > 0.08) next = 'config';
  else if (!staticInterior && stageRatio.interior > 0.05) next = 'interior';
  if (next === activeStage) return;
  if (activeStage === 'config' && scene.isShown('config')) {
    // Leave a still of the current colour behind, so the viewer never shows the wrong car.
    try { scene.renderNow(); $('#viewer-poster').src = scene.canvas.toDataURL('image/jpeg', 0.82); } catch { /* keep the stock poster */ }
  }
  $('#viewer-stage').classList.remove('is-live');
  $('#cine-pic').classList.remove('is-live');
  activeStage = next;
  if (!next) { scene.detach(); return; }
  const host = next === 'config' ? $('#viewer-stage') : $('#cine-pic');
  scene.attach(host, next);
  if (next === 'config') { $('#viewer-loading').hidden = scene.isShown('config'); }
  if (scene.isShown(next)) requestAnimationFrame(() => { if (activeStage === next) host.classList.add('is-live'); });
  if (next === 'interior') updateInterior();
}
function initScene() {
  const near = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) { ensureScene(); } }, { rootMargin: '120% 0px' });
  near.observe($('#wrap'));
  near.observe($('#interior'));
  const watch = new IntersectionObserver((entries) => {
    for (const e of entries) stageRatio[e.target.id === 'viewer-stage' ? 'config' : 'interior'] = e.isIntersecting ? e.intersectionRatio : 0;
    pickStage();
  }, { threshold: [0, 0.05, 0.08, 0.2, 0.5, 0.51, 0.8, 1] });
  watch.observe($('#viewer-stage'));
  watch.observe($('#cine-stage'));
}

// ---------------------------------------------------------------------------------------------- interior sequence
const light = (() => { const saved = store.get(`${NS}.light`) || {}; return { color: /^#[0-9a-f]{6}$/i.test(saved.color) ? saved.color : '#3d6bff', brightness: clamp(Number(saved.brightness) || 0.85, 0.2, 1) }; })();
let tintLevel = ['light', 'medium', 'dark'].includes(store.get(`${NS}.tint`)) ? store.get(`${NS}.tint`) : 'medium';
let caption = SEQ.rail[0], sequencePhase = '';

function updateInterior() {
  if (staticInterior) return;
  const cine = $('#cine'), r = cine.getBoundingClientRect();
  const span = cine.offsetHeight - window.innerHeight;
  const p = clamp(-r.top / span, 0, 1);
  if (activeStage === 'interior') scene?.setProgress(p);
  const phase = (SEQ.phases.find((ph) => p >= ph.from && p < ph.to) || SEQ.phases[SEQ.phases.length - 1]).id;
  if (phase !== sequencePhase) {
    sequencePhase = phase;
    if (!$('#cine-pic').classList.contains('is-live')) $('#cine-poster').src = `img/still-${SEQ.still[phase]}.webp`;
    const next = SEQ.caption[phase];
    const at = SEQ.rail.indexOf(next);
    $$('#rail li').forEach((li, n) => { li.classList.toggle('is-current', n === at); li.classList.toggle('is-done', n < at); if (n === at) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current'); });
    if (next !== caption) {
      caption = next;
      const title = $('#caption-title'), text = $('#caption-text');
      title.dataset.i18n = `cap.${next}.title`; text.dataset.i18n = `cap.${next}.text`;
      title.textContent = t(title.dataset.i18n); text.textContent = t(text.dataset.i18n);
      const box = $('#caption'); box.classList.remove('is-swapping'); void box.offsetWidth; box.classList.add('is-swapping');
    }
  }
  $('#lights').hidden = p < SEQ.controlsFrom;
}
function initInterior() {
  if ($('#light-brightness')) {                                // ambient lighting: colour and brightness
    const current = $$('input[name="light-color"]').find((i) => i.value.toLowerCase() === light.color.toLowerCase());
    if (current) current.checked = true;
    $('#light-brightness').value = String(Math.round(light.brightness * 100));
    for (const input of $$('input[name="light-color"]')) input.addEventListener('change', () => { light.color = input.value; scene?.setAmbientColor(light.color); store.set(`${NS}.light`, light); });
    $('#light-brightness').addEventListener('input', (e) => { light.brightness = clamp(Number(e.target.value) / 100, 0.2, 1); scene?.setAmbientBrightness(light.brightness); store.set(`${NS}.light`, light); });
  }
  for (const input of $$('input[name="tint-level"]')) {         // window film: how dark
    input.checked = input.value === tintLevel;
    input.addEventListener('change', () => { tintLevel = input.value; scene?.setTintLevel(tintLevel); store.set(`${NS}.tint`, tintLevel); });
  }
  for (const box of $$('[data-compare]')) for (const button of $$('[data-show]', box)) button.addEventListener('click', () => {
    for (const b of $$('[data-show]', box)) { const on = b === button; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on)); }
    for (const side of $$('[data-side]', box)) side.hidden = side.dataset.side !== button.dataset.show;
  });
  if (reduced()) setStaticInterior(true);
}

// ---------------------------------------------------------------------------------------------- appointment form
const FIELDS = { services: '#f-services-group', make: '#f-make', model: '#f-model', year: '#f-year', date: '#f-date', name: '#f-name', phone: '#f-phone', email: '#f-email' };
const todayISO = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
let sending = false, lastRequestText = '';

function readForm() {
  const form = $('#booking-form');
  const value = (name) => (form.elements[name]?.value || '').trim();
  return {
    services: $$('input[name="services"]:checked', form).map((i) => i.value),
    vehicleType: form.elements.vehicleType.value,
    make: value('make'), model: value('model'), year: value('year'), date: value('date'),
    name: value('name'), phone: value('phone'), email: value('email'), message: value('message'),
    wrap: wrapChoice ? { ...wrapChoice } : null,
  };
}
function validate(d) {
  const errors = {};
  const maxYear = new Date().getFullYear() + 1;
  if (!d.services.length) errors.services = ['err.services'];
  if (!d.make) errors.make = ['err.make'];
  if (!d.model) errors.model = ['err.model'];
  if (d.year && !(/^\d{4}$/.test(d.year) && +d.year >= 1950 && +d.year <= maxYear)) errors.year = ['err.year', { max: maxYear }];
  if (d.date && d.date < todayISO()) errors.date = ['err.date'];
  if (!d.name) errors.name = ['err.name'];
  if (!d.phone && !d.email) { errors.phone = ['err.contact']; errors.email = ['err.contact']; }
  else {
    if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) errors.email = ['err.email'];
    if (d.phone && d.phone.replace(/\D/g, '').length < 7) errors.phone = ['err.phone'];
  }
  return errors;
}
function setError(field, error) {
  const target = $(FIELDS[field]), box = $(`#e-${field}`);
  if (!target || !box) return;
  if (error) {
    box.dataset.i18n = error[0];
    if (error[1]) box.dataset.i18nVars = JSON.stringify(error[1]); else delete box.dataset.i18nVars;
    box.textContent = t(error[0], error[1]);
    box.hidden = false;
    target.setAttribute('aria-invalid', 'true');
  } else {
    box.hidden = true; box.textContent = ''; delete box.dataset.i18n;
    target.removeAttribute('aria-invalid');
  }
}
const clearError = (field) => setError(field, null);
function showStatus(kind) {
  const box = $('#form-status');
  box.className = 'status' + (kind === 'offline' ? ' is-info' : '');
  box.dataset.kind = kind || '';
  if (!kind) { box.hidden = true; box.innerHTML = ''; return; }
  const h = (key) => `<h3 data-i18n="${key}"></h3>`, p = (key) => `<p data-i18n="${key}"></p>`;
  if (kind === 'invalid') box.innerHTML = p('err.summary');
  if (kind === 'failed') box.innerHTML = h('fail.title') + p('fail.text');
  if (kind === 'offline') {
    const newTab = '<span class="sr-only" data-i18n="contact.newtab"></span>';
    const copy = (kind) => `<button class="btn ${kind}" type="button" id="copy-request" data-i18n="off.copy"></button>`;
    const direct = CONFIG.whatsapp                              // with a WhatsApp number the request can be sent straight away
      ? `<a class="btn btn-primary" id="wa-request" href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener"><span data-i18n="off.whatsapp"></span>${newTab}</a>${copy('btn-ghost')}`
      : `${copy('btn-primary')}${CONFIG.instagram ? `<a class="btn btn-ghost" href="${CONFIG.instagram.url}" target="_blank" rel="noopener"><span data-i18n="off.instagram"></span>${newTab}</a>` : ''}`;
    box.innerHTML = `${h('off.title')}${p('off.text')}<div class="actions">${direct}</div><div id="copy-fallback" hidden><p class="hint-line" data-i18n="off.select"></p><textarea id="copy-text" readonly rows="8"></textarea></div>`;
    $('#copy-request').addEventListener('click', copyRequest);
  }
  applyTexts(box);
  box.hidden = false;
}
function requestText(d) {
  const lines = [`${t('req.title')} · ${CONFIG.brand.name}`, ''];
  lines.push(`${t('form.services')}: ${d.services.map((s) => t('service.' + s)).join(', ')}`);
  lines.push(`${t('config.vehicle')}: ${[t('vehicle.' + d.vehicleType), d.make, d.model, d.year].filter(Boolean).join(' · ')}`);
  if (d.wrap) { const w = describe(d.wrap); lines.push(`${t('form.wrap')}: ${w.model} · ${w.color} · ${w.finish} · ${w.effect}`); }
  if (d.date) { const [y, m, day] = d.date.split('-').map(Number); lines.push(`${t('form.date')}: ${new Date(y, m - 1, day).toLocaleDateString(LOCALES[lang], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`); }
  lines.push(`${t('form.name')}: ${d.name}`);
  if (d.phone) lines.push(`${t('form.phone')}: ${d.phone}`);
  if (d.email) lines.push(`${t('form.email')}: ${d.email}`);
  if (d.message) lines.push('', `${t('form.message')}: ${d.message}`);
  return lines.join('\n');
}
function renderOfflineText() {
  if ($('#form-status').dataset.kind !== 'offline') return;
  lastRequestText = requestText(readForm());
  const area = $('#copy-text'); if (area) area.value = lastRequestText;
  const wa = $('#wa-request'); if (wa) wa.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(lastRequestText)}`;   // WhatsApp opens with the request written out
}
async function copyRequest() {
  lastRequestText = requestText(readForm());
  const button = $('#copy-request');
  try {
    await navigator.clipboard.writeText(lastRequestText);
    button.dataset.i18n = 'off.copied'; button.textContent = t('off.copied');
    announce(t('off.copied'));
    window.setTimeout(() => { if (button.isConnected) { button.dataset.i18n = 'off.copy'; button.textContent = t('off.copy'); } }, 2400);
  } catch {
    $('#copy-fallback').hidden = false;                        // clipboard refused: let the visitor copy by hand
    const area = $('#copy-text'); area.value = lastRequestText; area.focus(); area.select();
  }
}
function renderWrapChoice() {
  const box = $('#wrap-choice');
  box.hidden = !wrapChoice;
  if (!wrapChoice) return;
  const w = describe(wrapChoice);
  $('#wrap-choice-chip').style.setProperty('--chip', w.hex);
  $('#wrap-choice-text').textContent = `${w.model} · ${w.color} · ${w.finish} · ${w.effect}`;
}
function setSending(on) {
  sending = on;
  const button = $('#f-submit'), label = $('#f-submit-label');
  button.classList.toggle('is-sending', on);
  button.disabled = on;
  button.setAttribute('aria-busy', String(on));
  label.dataset.i18n = on ? 'form.sending' : 'cta.request';
  label.textContent = t(label.dataset.i18n);
}
async function submitForm(e) {
  e.preventDefault();
  if (sending) return;
  const data = readForm();
  const errors = validate(data);
  for (const field of Object.keys(FIELDS)) setError(field, errors[field] || null);
  if (Object.keys(errors).length) {
    showStatus('invalid');
    const first = Object.keys(FIELDS).find((f) => errors[f]);
    const target = first === 'services' ? $(`#f-service-${CONFIG.services[0]}`) : $(FIELDS[first]);
    target.focus();
    return;
  }
  const endpoint = window.FW_CONFIG?.bookingEndpoint ?? CONFIG.booking.endpoint;   // deploy-time override, see README
  if (!endpoint) {                                             // no booking service connected: say so, never pretend
    showStatus('offline'); renderOfflineText();
    $('#form-status').focus();
    return;
  }
  showStatus(null);
  setSending(true);
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), CONFIG.booking.timeoutMs);
  try {
    const res = await fetch(endpoint, {
      method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' }, signal: controller.signal,
      body: JSON.stringify({ ...data, wrap: data.wrap ? { ...data.wrap, description: requestText({ ...data, services: [], message: '' }).split('\n').find((l) => l.startsWith(t('form.wrap'))) || '' } : null, language: lang, summary: requestText(data), submittedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    $('#booking-form').hidden = true;
    const done = $('#form-done'); done.hidden = false; done.focus();
  } catch {
    showStatus('failed');
    $('#form-status').focus();
  } finally {
    window.clearTimeout(timer);
    setSending(false);
  }
}
function initForm() {
  const form = $('#booking-form');
  $('#f-date').min = todayISO();
  form.addEventListener('submit', submitForm);
  const recheck = (field) => { if ($(FIELDS[field])?.getAttribute('aria-invalid')) { const errors = validate(readForm()); setError(field, errors[field] || null); if (field === 'phone' || field === 'email') { setError('phone', errors.phone || null); setError('email', errors.email || null); } if (!Object.keys(errors).length && $('#form-status').dataset.kind === 'invalid') showStatus(null); } };
  for (const field of ['make', 'model', 'year', 'date', 'name', 'phone', 'email']) $(FIELDS[field]).addEventListener('input', () => recheck(field));
  for (const input of $$('input[name="services"]')) input.addEventListener('change', () => recheck('services'));
  form.addEventListener('input', () => { if ($('#form-status').dataset.kind === 'offline') renderOfflineText(); });
  $('#wrap-choice-remove').addEventListener('click', () => { wrapChoice = null; renderWrapChoice(); $(`#f-service-${CONFIG.services[0]}`).focus(); });
  $('#form-again').addEventListener('click', () => { form.reset(); wrapChoice = null; renderWrapChoice(); showStatus(null); $('#form-done').hidden = true; form.hidden = false; $('#f-date').min = todayISO(); $('#book-title').focus(); });
}
function renderHours() {
  const list = $('#hours');
  if (!list || !CONFIG.hours) return;
  const dayName = (d) => new Date(2024, 0, ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].indexOf(d) + 1).toLocaleDateString(LOCALES[lang], { weekday: 'short' });
  list.innerHTML = '';
  for (const row of CONFIG.hours) { const li = document.createElement('li'); li.textContent = `${row.days.split('-').map(dayName).join(' – ')}: ${row.open} – ${row.close}`; list.appendChild(li); }
}

// ---------------------------------------------------------------------------------------------- scroll bookkeeping
function updateFab() {
  // The compact button only rides along the detailing story, where every step keeps a free band for it.
  const fab = $('#fab');
  const r = $('.story').getBoundingClientRect();
  const hide = window.scrollY < window.innerHeight * 0.6 || r.bottom < window.innerHeight * 0.92 || !$('#menu').hidden || isFull();
  fab.classList.toggle('is-away', hide);
  fab.tabIndex = hide ? -1 : 0;
  fab.setAttribute('aria-hidden', String(hide));
}
function updateNav() {
  // The current item is the one whose part of the page started last, measured 40% down the screen. The booking
  // section and the closing band are marks too, so that nothing stays highlighted while they are on screen.
  const line = window.scrollY + window.innerHeight * 0.4;
  const inside = Object.keys(SEQ.anchors);                     // menu items that point into the interior sequence
  const sectionTop = (id) => window.scrollY + document.getElementById(id).getBoundingClientRect().top;
  let current = '', at = -Infinity;
  for (const id of [...CONFIG.nav.map(([id]) => id), 'booking', 'finale']) {
    const top = id === inside[0] ? sectionTop('interior') : id === 'finale' ? sectionTop('finale') : targetTop(id);
    if (top !== null && top <= line && top >= at) { current = id; at = top; }
  }
  if (inside.includes(current) && $('#interior').getBoundingClientRect().bottom < window.innerHeight * 0.4) current = '';
  for (const link of $$('.nav-link')) { const on = link.dataset.nav === current; link.classList.toggle('is-current', on); if (on) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current'); }
}
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    root.classList.toggle('is-scrolled', window.scrollY > 8);
    updateStory(); updateInterior(); updateFab(); updateNav();
  });
}

// ---------------------------------------------------------------------------------------------- start
function start() {
  window.FW = { go, get scene() { return scene; }, get stage() { return activeStage; } };   // small handle for tests and debugging
  if ($('.proposal')) root.classList.add('has-banner');
  $('#year').textContent = String(new Date().getFullYear());
  $('#fab').hidden = false;
  setLanguage(lang, { silent: true });
  $('#lang-select').addEventListener('change', (e) => setLanguage(e.target.value));
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-nav]');
    if (!link || link.id === 'config-request') return;
    e.preventDefault();
    go(link.dataset.nav);
  });
  $('#menu-toggle').addEventListener('click', () => ($('#menu').hidden ? openMenu() : closeMenu()));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { if (!$('#menu').hidden) { closeMenu(); $('#menu-toggle').focus(); } else if (isFull()) setFull(false); }
    if (e.key === 'Tab' && !$('#menu').hidden) {             // keep focus inside the open menu
      const items = [$('#lang-select'), $('#menu-toggle'), ...$$('#menu a')];
      const at = items.indexOf(document.activeElement);
      if (e.shiftKey && at <= 0) { items[items.length - 1].focus(); e.preventDefault(); }
      else if (!e.shiftKey && at === items.length - 1) { items[0].focus(); e.preventDefault(); }
    }
  });
  initStory(); initInterior(); initConfigurator(); initForm(); initScene();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { story?.resize(); if (window.innerWidth >= 1100) closeMenu(); onScroll(); });
  reducedQuery.addEventListener?.('change', () => window.location.reload());
  onScroll();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
