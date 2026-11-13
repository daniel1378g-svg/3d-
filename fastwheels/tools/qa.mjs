// End-to-end checks of the built page (headless Chromium, software WebGL; desktop and phone emulation).
//
//   node tools/build.mjs --artifact && node tools/serve.mjs 5174 dist-artifact &
//   node tools/qa.mjs [http://127.0.0.1:5174/preview.html] [group …]      groups: layout lang nav config form interior render reduced fallback
//
// Not covered here: real Mobile Safari (no WebKit build in this environment) and real GPUs.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let pw; try { pw = require('playwright'); } catch { pw = require('/opt/node-tools/node_modules/playwright'); }

const args = process.argv.slice(2);
const url = args.find((a) => a.startsWith('http')) || 'http://127.0.0.1:5174/preview.html';
const groups = args.filter((a) => !a.startsWith('http'));
const want = (g) => !groups.length || groups.includes(g);
const browser = await pw.chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
let failed = 0, passed = 0;
const check = (name, ok, detail = '') => { if (ok) passed++; else failed++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`); };

async function open({ width = 1440, height = 900, mobile = false, reduced = false, init = null, config = { tier: 'low', instant: true } } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile, reducedMotion: reduced ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  page.errors = [];
  page.on('pageerror', (e) => page.errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') page.errors.push(m.text()); });
  await page.addInitScript((c) => { window.FW_CONFIG = c; }, config);
  if (init) await page.addInitScript(init);
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(500);
  return page;
}
const jump = (page, id) => page.evaluate((id) => window.FW.go(id), id);
const cineTo = (page, p) => page.evaluate((p) => { const c = document.querySelector('#cine'); window.scrollTo(0, c.getBoundingClientRect().top + scrollY + (c.offsetHeight - innerHeight) * p); }, p);
const sceneState = (page) => page.evaluate(() => window.FW?.scene?.getState() || null);
const waitScene = (page, mode) => page.waitForFunction((m) => window.FW?.scene?.isShown(m) && window.FW.stage === m, mode, { timeout: 180000 });

// ---------------------------------------------------------------------------------------------------- layout
if (want('layout')) for (const [w, h] of [[360, 740], [390, 844], [430, 932], [768, 1024], [1440, 900]]) {
  const page = await open({ width: w, height: h, mobile: w < 800 });
  const report = [];
  for (const id of ['top', 'detailing', 'wrap', 'booking', 'interior', 'finale']) {
    await jump(page, id);
    await page.waitForTimeout(350);
    const r = await page.evaluate((id) => {
      const d = document.documentElement;
      const header = document.querySelector('#header').getBoundingClientRect().bottom;
      const heading = { wrap: '#config-title', booking: '#book-title', interior: '#int-title', finale: '#fin-title' }[id];
      const hTop = heading ? document.querySelector(heading).getBoundingClientRect().top : null;
      const small = [];
      for (const el of document.querySelectorAll('a.btn, button, select, input[type=text], input[type=tel], input[type=email], input[type=date], textarea, .seg-item, .sw:not([hidden]), .check, .family, .link, .nav-link, .logo, .fab')) {
        const b = el.getBoundingClientRect();
        if (!b.width || !b.height || b.bottom < 0 || b.top > innerHeight) continue;
        if (getComputedStyle(el).visibility === 'hidden' || el.closest('[hidden]')) continue;
        if (b.width < 43.5 || b.height < 43.5) small.push(`${el.id || el.className.toString().split(' ')[0] || el.tagName} ${Math.round(b.width)}×${Math.round(b.height)}`);
      }
      return { over: d.scrollWidth - d.clientWidth, header, hTop, small: [...new Set(small)] };
    }, id);
    if (r.over > 0) report.push(`${id}: overflows by ${r.over}px`);
    if (r.hTop !== null && r.hTop < r.header - 1) report.push(`${id}: heading under the header (${Math.round(r.hTop)} < ${Math.round(r.header)})`);
    if (r.small.length) report.push(`${id}: small targets ${r.small.slice(0, 6).join(', ')}`);
  }
  check(`layout ${w}px: no horizontal overflow, headings clear of the header, targets ≥ 44px`, !report.length, report.join(' | '));
  check(`layout ${w}px: no script errors`, !page.errors.length, page.errors.slice(0, 3).join(' | '));
  await page.context().close();
}

// ---------------------------------------------------------------------------------------------------- languages
if (want('lang')) {
  const page = await open({ width: 390, height: 844, mobile: true });
  const expected = { fr: ['fr-CH', 'Demandez un rendez-vous.'], en: ['en-GB', 'Request an appointment.'], pt: ['pt-PT', 'Peça uma marcação.'], it: ['it-CH', 'Richiedi un appuntamento.'], de: ['de-CH', 'Fragen Sie einen Termin an.'] };
  check('default language is French', (await page.evaluate(() => document.documentElement.lang)) === 'fr-CH' && (await page.inputValue('#lang-select')) === 'fr');
  await jump(page, 'booking');
  await page.fill('#f-make', 'BMW'); await page.fill('#f-model', 'M4'); await page.fill('#f-name', 'Test Person'); await page.check('#f-service-ceramic', { force: true });
  await page.evaluate(() => window.scrollBy(0, 260));
  for (const l of ['en', 'pt', 'it', 'de', 'fr']) {
    const before = await page.evaluate(() => { document.querySelector('[data-qa]')?.removeAttribute('data-qa'); const el = document.elementFromPoint(innerWidth / 2, innerHeight / 2 + 40); el.setAttribute('data-qa', '1'); return { top: el.getBoundingClientRect().top }; });
    await page.selectOption('#lang-select', l);
    const sweeping = await page.evaluate(() => document.querySelector('.logo').classList.contains('is-sweeping'));
    await page.waitForTimeout(120);
    const s = await page.evaluate(() => ({
      lang: document.documentElement.lang, title: document.querySelector('#book-title').textContent, top: document.querySelector('[data-qa]').getBoundingClientRect().top,
      make: document.querySelector('#f-make').value, name: document.querySelector('#f-name').value, service: document.querySelector('#f-service-ceramic').checked,
      empty: [...document.querySelectorAll('[data-i18n]')].filter((e) => !e.textContent.trim() || e.textContent.includes('.') && /^[a-z]+\.[a-z0-9.]+$/i.test(e.textContent.trim())).map((e) => e.dataset.i18n),
      color: document.querySelector('[data-color="racing-red"]').textContent, stored: localStorage.getItem('fw.lang'), docTitle: document.title,
    }));
    check(`language ${l}: page translated, brand kept`, s.lang === expected[l][0] && s.title === expected[l][1] && s.docTitle === 'FASTWHEELS GARAGE' && !s.empty.length, `${s.lang} "${s.title}" untranslated: ${s.empty.join(',')}`);
    check(`language ${l}: form entries and scroll position kept, logo sweep runs`, s.make === 'BMW' && s.name === 'Test Person' && s.service && Math.abs(s.top - before.top) <= 12 && sweeping && s.stored === `"${l}"`, `Δ${Math.round(s.top - before.top)}px sweep=${sweeping}`);
  }
  await page.selectOption('#lang-select', 'de');
  await page.reload({ waitUntil: 'load' });
  check('chosen language is remembered after a reload', (await page.inputValue('#lang-select')) === 'de' && (await page.textContent('#book-title')) === expected.de[1]);
  check('colour names are translated', (await page.textContent('[data-color="racing-red"]')) === 'Rennrot');
  await page.context().close();
}

// ---------------------------------------------------------------------------------------------------- navigation
if (want('nav')) {
  const page = await open({ width: 390, height: 844, mobile: true });
  const top = await page.evaluate(() => { const r = (s) => document.querySelector(s).getBoundingClientRect(); return { lang: r('#lang-select'), burger: r('#menu-toggle'), cta: getComputedStyle(document.querySelector('.bar-cta')).display }; });
  check('phone header: language selector and menu button visible at the top', top.lang.top >= 0 && top.lang.bottom < 100 && top.lang.width >= 44 && top.burger.width >= 44);
  await page.click('#menu-toggle');
  const menu = await page.evaluate(() => ({ open: !document.querySelector('#menu').hidden, links: [...document.querySelectorAll('#menu a')].map((a) => a.dataset.nav), expanded: document.querySelector('#menu-toggle').getAttribute('aria-expanded'), locked: document.documentElement.classList.contains('is-locked') }));
  check('phone menu lists every service and the appointment link', menu.open && ['detailing', 'ceramic', 'wrap', 'ambient', 'starlight', 'booking'].every((id) => menu.links.includes(id)) && menu.expanded === 'true' && menu.locked, JSON.stringify(menu));
  await page.keyboard.press('Escape');
  check('Escape closes the menu', await page.evaluate(() => document.querySelector('#menu').hidden && !document.documentElement.classList.contains('is-locked')));
  await page.click('#menu-toggle');
  await page.click('#menu a[data-nav="booking"]');
  await page.waitForTimeout(400);
  const at = await page.evaluate(() => ({ closed: document.querySelector('#menu').hidden, top: document.querySelector('#book-title').getBoundingClientRect().top, header: document.querySelector('#header').getBoundingClientRect().bottom, focus: document.activeElement?.id }));
  check('menu link goes straight to the appointment section', at.closed && at.top > at.header && at.top < 500 && at.focus === 'book-title', JSON.stringify(at));
  await jump(page, 'top'); await page.waitForTimeout(200);
  const t0 = Date.now();
  await page.click('.hero-copy a[data-nav="booking"]');
  await page.waitForFunction(() => { const r = document.querySelector('#book-title').getBoundingClientRect(); return r.top > 0 && r.top < 500; }, null, { timeout: 3000 });
  check('hero appointment button reaches the form without scrolling through the story', Date.now() - t0 < 900, `${Date.now() - t0} ms`);
  await page.context().close();

  const desk = await open({ width: 1440, height: 900 });
  await desk.keyboard.press('Tab');
  check('keyboard: the first Tab stop is the skip link', (await desk.evaluate(() => document.activeElement?.className)) === 'skip');
  const order = [];
  for (let i = 0; i < 9; i++) { await desk.keyboard.press('Tab'); order.push(await desk.evaluate(() => document.activeElement?.dataset?.nav || document.activeElement?.id || document.activeElement?.tagName)); }
  check('keyboard: header links, language and appointment button are reachable in order', order.join(',').startsWith('top,detailing,ceramic,wrap,ambient,starlight,lang-select,booking'), order.join(','));
  await desk.context().close();
}

// ---------------------------------------------------------------------------------------------------- configurator
if (want('config')) {
  const page = await open({ width: 1440, height: 900 });
  await jump(page, 'wrap');
  await waitScene(page, 'config');
  check('configurator: 3D car is shown after the poster', (await sceneState(page)).vehicle === 'car' && await page.evaluate(() => document.querySelector('#viewer-stage').classList.contains('is-live')));
  check('configurator: at least 30 named colours in 5 families', await page.evaluate(() => document.querySelectorAll('input[name="wrap-color"]').length >= 30 && document.querySelectorAll('input[name="wrap-family"]').length === 5));
  await page.check('#wrap-family-warm', { force: true });
  await page.check('#wrap-color-racing-red', { force: true });
  await page.check('#wrap-finish-satin', { force: true });
  await page.check('#wrap-effect-metallic', { force: true });
  await page.waitForFunction(() => window.FW.scene.getState().paint === '#c1121c', null, { timeout: 60000 });
  let s = await sceneState(page);
  const readout = await page.evaluate(() => document.querySelector('#readout-name').textContent + ' | ' + document.querySelector('#readout-finish').textContent);
  check('colour, finish and effect apply to the car and show in the read-out', s.paint === '#c1121c' && s.finish === 'satin' && s.effect === 'metallic' && readout === 'Rouge course | Satiné · Métallisé', readout);
  await page.check('#wrap-vehicle-bike', { force: true });
  await page.waitForFunction(() => window.FW.scene.isShown('config') && window.FW.scene.getState().vehicle === 'bike', null, { timeout: 180000 });
  s = await sceneState(page);
  check('switching to the motorcycle keeps colour and finish', s.vehicle === 'bike' && s.finish === 'satin' && s.effect === 'metallic' && await page.evaluate(() => document.querySelector('#wrap-color-racing-red').checked && document.querySelector('#readout-name').textContent === 'Rouge course'));
  const a0 = (await sceneState(page)).angle;
  const seen = new Set([a0]);
  for (let i = 0; i < 12; i++) { await page.click('#rot-right'); await page.waitForTimeout(260); seen.add((await sceneState(page)).angle); }
  const a1 = (await sceneState(page)).angle;
  check('motorcycle: rotate buttons go through a full 360° turn', seen.size >= 8 && Math.abs(a1 - a0) <= 1, `${a0}° → ${[...seen].length} angles → ${a1}°`);
  await page.check('#wrap-vehicle-car', { force: true });
  await page.waitForFunction(() => window.FW.scene.getState().vehicle === 'car');
  const box = await page.locator('#viewer-stage').boundingBox();
  const b0 = (await sceneState(page)).angle;
  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2);
  await page.mouse.down();
  for (let i = 1; i <= 12; i++) { await page.mouse.move(box.x + box.width * (0.2 + 0.05 * i), box.y + box.height / 2); await page.waitForTimeout(30); }
  await page.mouse.up();
  await page.waitForTimeout(700);
  const b1 = (await sceneState(page)).angle;
  check('car: dragging rotates the vehicle', b1 !== b0, `${b0}° → ${b1}°`);
  await page.focus('#viewer-stage');
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction((a) => window.FW.scene.getState().angle !== a, b1, { timeout: 15000 }).catch(() => {});
  const b2 = (await sceneState(page)).angle;
  await page.keyboard.press('Home');
  await page.waitForFunction(() => window.FW.scene.getState().angle === 319, null, { timeout: 15000 }).catch(() => {});
  const b3 = (await sceneState(page)).angle;
  check('keyboard: arrow keys rotate, Home resets the view', b2 !== b1 && b3 === 319, `${b1}° → ${b2}° → ${b3}°`);
  await page.check('#wrap-family-neutral', { force: true });
  await page.check('#wrap-color-cement-grey', { force: true });
  const eff = await page.evaluate(() => ({ solid: document.querySelector('#wrap-effect-solid').checked, metallicOff: document.querySelector('#wrap-effect-metallic').disabled, note: !document.querySelector('#effect-note').hidden }));
  check('effects a colour does not come in are disabled and the selection falls back', eff.solid && eff.metallicOff && eff.note, JSON.stringify(eff));
  await page.click('#viewer-full');
  const full = await page.evaluate(() => { const b = document.querySelector('#viewer-back'); const r = b.getBoundingClientRect(); return { on: document.querySelector('#config').classList.contains('is-full'), back: !b.hidden && r.top >= 0 && r.height >= 44, focus: document.activeElement.id }; });
  check('full-screen configurator shows a Back control and focuses it', full.on && full.back && full.focus === 'viewer-back', JSON.stringify(full));
  await page.keyboard.press('Escape');
  check('Escape leaves the full-screen configurator', await page.evaluate(() => !document.querySelector('#config').classList.contains('is-full')));
  await page.click('#config-request');
  await page.waitForTimeout(400);
  const carried = await page.evaluate(() => ({ visible: !document.querySelector('#wrap-choice').hidden, text: document.querySelector('#wrap-choice-text').textContent, wrap: document.querySelector('#f-service-wrap').checked, car: document.querySelector('#f-type-car').checked, top: document.querySelector('#book-title').getBoundingClientRect().top }));
  check('"Request this configuration" carries vehicle, colour and finish into the form', carried.visible && carried.text === 'BMW M4 Competition · Gris ciment · Satiné · Uni' && carried.wrap && carried.car && carried.top < 600, carried.text);
  await page.reload({ waitUntil: 'load' });
  check('the configuration is remembered after a reload', await page.evaluate(() => document.querySelector('#wrap-color-cement-grey').checked && document.querySelector('#wrap-finish-satin').checked));
  check('configurator: no script errors', !page.errors.length, page.errors.slice(0, 3).join(' | '));
  await page.context().close();

  const phone = await open({ width: 390, height: 844, mobile: true });
  await jump(phone, 'wrap');
  await waitScene(phone, 'config');
  const fit = await phone.evaluate(() => { const v = document.querySelector('#viewer-stage').getBoundingClientRect(); const c = document.querySelector('#viewer-stage canvas'); return { w: v.width, h: v.height, inside: v.left >= 0 && v.right <= innerWidth, touch: getComputedStyle(c).touchAction }; });
  check('phone: viewer fits the screen and leaves vertical scrolling to the page', fit.inside && fit.h <= 844 * 0.42 && fit.touch === 'pan-y', JSON.stringify(fit));
  const y0 = await phone.evaluate(() => scrollY);
  await phone.evaluate(() => window.scrollBy(0, 500));
  const sticky = await phone.evaluate(() => { const v = document.querySelector('#viewer').getBoundingClientRect(); return { top: v.top, header: document.querySelector('#header').getBoundingClientRect().bottom, moved: scrollY }; });
  check('phone: the vehicle stays in view while the palette scrolls', sticky.moved > y0 + 300 && Math.abs(sticky.top - sticky.header) <= 2, JSON.stringify(sticky));
  await phone.context().close();
}

// ---------------------------------------------------------------------------------------------------- appointment form
if (want('form')) {
  const fill = async (page) => {
    await page.check('#f-service-detailing', { force: true });
    await page.fill('#f-make', 'BMW'); await page.fill('#f-model', 'M4 Competition'); await page.fill('#f-year', '2023');
    await page.fill('#f-name', 'Camille Rochat'); await page.fill('#f-email', 'camille@example.ch'); await page.fill('#f-message', 'Polissage avant céramique.');
  };
  const page = await open({ width: 1440, height: 900 });
  await jump(page, 'booking');
  check('submit button says "Request an appointment"', (await page.textContent('#f-submit-label')) === 'Demander un rendez-vous');
  await page.click('#f-submit');
  const errs = await page.evaluate(() => ({ shown: [...document.querySelectorAll('.error:not([hidden])')].map((e) => e.id), invalid: document.querySelectorAll('[aria-invalid="true"]').length, status: document.querySelector('#form-status').dataset.kind, focus: document.activeElement.id, done: !document.querySelector('#form-done').hidden }));
  check('empty submit: errors on services, make, model, name and contact; focus moves to the first', ['e-services', 'e-make', 'e-model', 'e-name', 'e-phone', 'e-email'].every((id) => errs.shown.includes(id)) && errs.status === 'invalid' && errs.focus === 'f-service-detailing' && !errs.done, JSON.stringify(errs));
  await fill(page);
  await page.fill('#f-year', '1890'); await page.fill('#f-email', 'camille@');
  await page.click('#f-submit');
  const e2 = await page.evaluate(() => [...document.querySelectorAll('.error:not([hidden])')].map((e) => e.id + ':' + e.textContent));
  check('year and e-mail are validated', e2.length === 2 && e2[0].startsWith('e-year') && e2[1].startsWith('e-email'), e2.join(' | '));
  await page.fill('#f-year', '2023'); await page.fill('#f-email', 'camille@example.ch');
  await page.click('#f-submit');
  const off = await page.evaluate(() => ({ kind: document.querySelector('#form-status').dataset.kind, title: document.querySelector('#form-status h3')?.textContent, done: !document.querySelector('#form-done').hidden, formVisible: !document.querySelector('#booking-form').hidden, make: document.querySelector('#f-make').value }));
  check('no endpoint configured: the form says "not sent" and never shows a success message', off.kind === 'offline' && /Non envoyée/.test(off.title) && !off.done && off.formVisible && off.make === 'BMW', JSON.stringify(off));
  await page.context().grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
  await page.click('#copy-request');
  await page.waitForTimeout(200);
  const copied = await page.evaluate(async () => { try { return await navigator.clipboard.readText(); } catch { return document.querySelector('#copy-text').value; } });
  check('"Copy my request" yields the full request text', /Demande de rendez-vous · FASTWHEELS GARAGE/.test(copied) && /BMW · M4 Competition · 2023/.test(copied) && /camille@example\.ch/.test(copied), copied.split('\n').slice(0, 3).join(' / '));
  await page.selectOption('#lang-select', 'en');
  check('language change keeps the form and translates the status', await page.evaluate(() => /Not sent/.test(document.querySelector('#form-status h3').textContent) && document.querySelector('#f-name').value === 'Camille Rochat'));
  await page.context().close();

  for (const [label, status] of [['success', 201], ['server error', 500]]) {
    const p2 = await open({ width: 1440, height: 900, config: { tier: 'low', instant: true, bookingEndpoint: 'https://booking.test/api/appointments' } });
    let body = null;
    await p2.route('https://booking.test/**', async (route) => { body = route.request().postDataJSON(); await new Promise((r) => setTimeout(r, 700)); await route.fulfill({ status, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ ok: status < 300 }) }); });
    await jump(p2, 'booking');
    await fill(p2);
    await p2.click('#f-submit');
    await p2.waitForTimeout(250);
    const busy = await p2.evaluate(() => ({ busy: document.querySelector('#f-submit').getAttribute('aria-busy'), disabled: document.querySelector('#f-submit').disabled, label: document.querySelector('#f-submit-label').textContent }));
    await p2.waitForTimeout(1200);
    const end = await p2.evaluate(() => ({ done: !document.querySelector('#form-done').hidden, doneText: document.querySelector('#form-done p').textContent, kind: document.querySelector('#form-status').dataset.kind, name: document.querySelector('#f-name').value, busy: document.querySelector('#f-submit').getAttribute('aria-busy'), focus: document.activeElement.id }));
    check(`configured endpoint (${label}): loading state while sending`, busy.busy === 'true' && busy.disabled && /Envoi/.test(busy.label) && body && body.make === 'BMW' && body.services[0] === 'detailing', JSON.stringify(busy));
    if (status < 300) check('configured endpoint (success): confirmation says the garage will confirm, date not reserved', end.done && /confirmer les disponibilités/.test(end.doneText) && /pas réservée/.test(end.doneText) && end.focus === 'form-done', JSON.stringify(end));
    else check('configured endpoint (server error): error shown, entries kept, no success', !end.done && end.kind === 'failed' && end.name === 'Camille Rochat' && end.busy === 'false', JSON.stringify(end));
    await p2.context().close();
  }
}

// ---------------------------------------------------------------------------------------------------- interior sequence
if (want('interior')) {
  const page = await open({ width: 1440, height: 900 });
  await cineTo(page, 0.02);
  await waitScene(page, 'interior');
  const at = async (p) => { await cineTo(page, p); await page.waitForFunction((p) => Math.abs(window.FW.scene.getState().progress - p) < 0.01, p, { timeout: 60000 }); return { ...(await sceneState(page)), lights: await page.evaluate(() => !document.querySelector('#lights').hidden), caption: await page.evaluate(() => document.querySelector('#caption-title').dataset.i18n), rail: await page.evaluate(() => document.querySelector('#rail .is-current')?.dataset.phase) }; };
  const f = [await at(0.05), await at(0.3), await at(0.5), await at(0.6), await at(0.72), await at(0.9), await at(1)];
  check('forward: door shut → open → cabin unlit → lines light up → stars come on', f[0].door < 0.01 && f[1].door > 0.99 && f[2].ambient === 0 && f[2].stars === 0 && f[3].ambient > 0.2 && f[3].ambient < 0.8 && f[4].ambient === 1 && f[4].stars === 0 && f[5].stars > 0.1 && f[5].stars < 0.9 && f[6].stars === 1, f.map((s) => `p${s.progress.toFixed(2)} door ${s.door.toFixed(2)} amb ${s.ambient.toFixed(2)} stars ${s.stars.toFixed(2)}`).join(' | '));
  check('captions and step marks follow the sequence', f.map((s) => s.caption).join(',') === 'cap.door.title,cap.door.title,cap.cabin.title,cap.ambient.title,cap.ambient.title,cap.stars.title,cap.stars.title' && f[6].rail === 'stars' && f[2].rail === 'cabin', f.map((s) => s.caption).join(','));
  check('lighting controls appear only after the reveal', !f[2].lights && !f[3].lights && f[4].lights && f[6].lights);
  const r = [await at(0.8), await at(0.5), await at(0.2), await at(0)];
  check('reverse: stars off, lines off, door closes again', r[0].stars === 0 && r[0].ambient === 1 && r[1].ambient === 0 && r[2].door > 0.1 && r[2].door < 0.9 && r[3].door === 0 && !r[1].lights, r.map((s) => `p${s.progress.toFixed(2)} door ${s.door.toFixed(2)} amb ${s.ambient.toFixed(2)} stars ${s.stars.toFixed(2)}`).join(' | '));
  await at(0.72);
  await page.check('#light-color-red', { force: true });
  await page.fill('#light-brightness', '40');
  check('lighting colour and brightness controls respond', await page.evaluate(() => JSON.parse(localStorage.getItem('fw.light')).color === '#ff2a3c' && JSON.parse(localStorage.getItem('fw.light')).brightness === 0.4));
  await page.click('.cine-skip');
  await page.waitForTimeout(400);
  check('"Skip the sequence" jumps to the final call to action', await page.evaluate(() => { const r = document.querySelector('#fin-title').getBoundingClientRect(); return r.top > 0 && r.top < innerHeight; }));
  await jump(page, 'starlight');
  await page.waitForTimeout(600);
  check('header link "Starlight" lands on the lit headliner', (await sceneState(page)).stars > 0.95 || (await page.evaluate(() => { const c = document.querySelector('#cine'); return -c.getBoundingClientRect().top / (c.offsetHeight - innerHeight); })) > 0.98);
  check('interior: no script errors', !page.errors.length, page.errors.slice(0, 3).join(' | '));
  await page.context().close();
}

// ---------------------------------------------------------------------------------------------------- render stability
if (want('render')) {
  // With bloom on, one invalid pixel (infinite or NaN) used to ruin the whole viewer on phone GPUs.
  const page = await open({ width: 900, height: 700, config: { tier: 'mid', instant: true } });
  await jump(page, 'wrap');
  await waitScene(page, 'config');
  const look = async () => {
    const png = await page.locator('#viewer-stage').screenshot({ timeout: 120000 });
    return page.evaluate(async (b64) => {
      const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
      const g = c.getContext('2d'); g.drawImage(img, 0, 0);
      const d = g.getImageData(0, 0, c.width, c.height).data; let dark = 0, sum = 0;
      for (let i = 0; i < d.length; i += 4) { const v = d[i] + d[i + 1] + d[i + 2]; sum += v; if (v < 12) dark++; }
      return { dark: +(dark / (d.length / 4)).toFixed(3), mean: +(sum / (d.length / 4) / 3).toFixed(1) };
    }, png.toString('base64'));
  };
  const state = await sceneState(page);
  const frames = [];
  for (let i = 0; i < 12; i++) {
    const before = (await sceneState(page)).angle;
    await page.click('#rot-right');
    await page.waitForFunction((a) => window.FW.scene.getState().angle !== a, before, { timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(250);
    frames.push(await look());
  }
  check('effects on: the car is drawn at every angle of a full turn (no black or blown-out frames)', state.post && state.mirror && frames.every((f) => f.dark < 0.6 && f.mean > 6 && f.mean < 120), frames.map((f) => f.mean).join(' '));
  const clean = await look();
  const inject = (expr) => page.evaluate((expr) => {
    // A 6 cm quad with an invalid colour, built from classes already in the scene.
    const { scene } = window.FW.scene.debug;
    scene.getObjectByName('bad-pixel')?.removeFromParent();
    const floor = scene.getObjectByName('floor');
    const probe = floor.clone();
    probe.material = new floor.material.constructor({ uniforms: { z: { value: 0 } }, side: 2, vertexShader: 'void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }', fragmentShader: `uniform float z; void main() { gl_FragColor = vec4(vec3(${expr}), 1.0); }` });
    probe.name = 'bad-pixel'; probe.scale.setScalar(0.001); probe.rotation.set(0, Math.PI / 4, 0); probe.position.set(1.2, 1.6, -1.2); probe.frustumCulled = false;
    scene.add(probe);
    window.FW.scene.renderNow();
  }, expr);
  const results = [];
  for (const [name, expr] of [['infinite', '1.0 / z'], ['NaN', 'sqrt(z - 1.0)']]) {
    await inject(expr);
    await page.waitForTimeout(400);
    const f = await look();
    results.push(`${name}: mean ${f.mean} (clean ${clean.mean})`);
    check(`effects on: an ${name} pixel in the scene does not spread over the frame`, Math.abs(f.mean - clean.mean) < 6 && f.dark < 0.6, results[results.length - 1]);
  }
  check('render: no script errors', !page.errors.length, page.errors.slice(0, 3).join(' | '));
  await page.context().close();
}

// ---------------------------------------------------------------------------------------------------- reduced motion
if (want('reduced')) {
  const page = await open({ width: 390, height: 844, mobile: true, reduced: true });
  const s = await page.evaluate(() => ({ story: document.documentElement.classList.contains('static-story'), interior: document.documentElement.classList.contains('static-interior'), stills: !document.querySelector('#stills').hidden, cine: getComputedStyle(document.querySelector('#cine')).display, stepImgs: [...document.querySelectorAll('.step-still')].every((f) => getComputedStyle(f).display !== 'none') }));
  check('reduced motion: story and interior are shown as still images, nothing is pinned', s.story && s.interior && s.stills && s.cine === 'none' && s.stepImgs, JSON.stringify(s));
  await jump(page, 'ambient');
  await page.waitForTimeout(300);
  const before = await page.evaluate(() => { const box = document.querySelectorAll('[data-compare]')[0]; return { before: !box.querySelector('[data-side="before"]').hidden, after: !box.querySelector('[data-side="after"]').hidden, inView: box.getBoundingClientRect().top < innerHeight }; });
  await page.evaluate(() => document.querySelectorAll('[data-compare]')[0].querySelector('[data-show="after"]').click());
  const after = await page.evaluate(() => { const box = document.querySelectorAll('[data-compare]')[0]; return { before: !box.querySelector('[data-side="before"]').hidden, after: !box.querySelector('[data-side="after"]').hidden, pressed: box.querySelector('[data-show="after"]').getAttribute('aria-pressed') }; });
  check('reduced motion: before/after switch for the ambient lighting works', before.before && !before.after && before.inView && !after.before && after.after && after.pressed === 'true', JSON.stringify({ before, after }));
  const imgs = await page.evaluate(async () => { const list = [...document.querySelectorAll('#stills img')]; for (const i of list) { i.loading = 'eager'; } await Promise.all(list.map((i) => i.decode().catch(() => {}))); return list.map((i) => i.naturalWidth > 0 && !!i.alt); });
  check('reduced motion: all still images load and have descriptions', imgs.length === 5 && imgs.every(Boolean), JSON.stringify(imgs));
  check('reduced motion: no script errors', !page.errors.length, page.errors.slice(0, 3).join(' | '));
  await page.context().close();
}

// ---------------------------------------------------------------------------------------------------- no 3D
if (want('fallback')) {
  const page = await open({ width: 1440, height: 900, init: () => { delete window.DecompressionStream; } });
  await jump(page, 'wrap');
  await page.waitForTimeout(1500);
  const s = await page.evaluate(() => ({ msg: !document.querySelector('#viewer-msg').hidden, poster: document.querySelector('#viewer-poster').naturalWidth > 0, stills: !document.querySelector('#stills').hidden, sceneScript: !!document.querySelector('script[src="scene.js"]') }));
  await page.check('#wrap-family-green', { force: true });
  await page.check('#wrap-color-emerald', { force: true });
  await page.click('#config-request');
  await page.waitForTimeout(300);
  const carried = await page.textContent('#wrap-choice-text');
  check('without 3D support: poster, message and stills are shown and the heavy bundle is not downloaded', s.msg && s.poster && s.stills && !s.sceneScript, JSON.stringify(s));
  check('without 3D support: choosing a colour and requesting it still works', /Émeraude/.test(carried), carried);
  await page.context().close();
}

console.log(`\n${passed} passed, ${failed} failed`);
await browser.close();
process.exit(failed ? 1 : 0);
