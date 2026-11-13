// End-to-end checks of the Overlay build: what differs from the FASTWHEELS site (tools/qa.mjs covers the shared
// behaviour: layout, configurator, rendering, fallbacks).
//
//   node tools/build.mjs --artifact --brand overlay && node tools/serve.mjs 5175 dist-artifact-overlay &
//   node tools/qa-overlay.mjs [http://127.0.0.1:5175/preview.html] [group …]      groups: brand lang nav form tint reduced layout
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let pw; try { pw = require('playwright'); } catch { pw = require('/opt/node-tools/node_modules/playwright'); }

const args = process.argv.slice(2);
const url = args.find((a) => a.startsWith('http')) || 'http://127.0.0.1:5175/preview.html';
const groups = args.filter((a) => !a.startsWith('http'));
const want = (g) => !groups.length || groups.includes(g);
const browser = await pw.chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
let failed = 0, passed = 0;
const check = (name, ok, detail = '') => { if (ok) passed++; else failed++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`); };

async function open({ width = 1440, height = 900, mobile = false, reduced = false, config = { tier: 'low', instant: true } } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile, reducedMotion: reduced ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  page.errors = [];
  page.on('pageerror', (e) => page.errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') page.errors.push(m.text()); });
  page.on('requestfailed', (r) => page.errors.push('failed: ' + r.url()));
  await page.addInitScript((c) => { window.FW_CONFIG = c; }, config);
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(500);
  return page;
}
const jump = (page, id) => page.evaluate((id) => window.FW.go(id), id);
const cineTo = (page, p) => page.evaluate((p) => { const c = document.querySelector('#cine'); window.scrollTo(0, c.getBoundingClientRect().top + scrollY + (c.offsetHeight - innerHeight) * p); }, p);
const sceneState = (page) => page.evaluate(() => window.FW?.scene?.getState() || null);
const LANGS = ['fr', 'en', 'pt', 'it', 'de'];

// ---------------------------------------------------------------------------------------------------- brand
if (want('brand')) {
  const page = await open();
  const b = await page.evaluate(() => ({
    title: document.title, lang: document.documentElement.lang, select: document.querySelector('#lang-select').value,
    logo: document.querySelector('.logo-svg').getAttribute('aria-label'), viewBox: document.querySelector('.logo-svg').getAttribute('viewBox'),
    strip: document.querySelector('.proposal')?.textContent, stripBg: getComputedStyle(document.querySelector('.proposal')).backgroundColor,
    primary: getComputedStyle(document.querySelector('.hero-copy .btn-primary')).backgroundColor,
    bookingBg: getComputedStyle(document.querySelector('#booking')).backgroundImage, finaleBg: getComputedStyle(document.querySelector('#finale')).backgroundImage,
    bodyBg: getComputedStyle(document.body).backgroundColor,
    address: document.querySelector('.addr').textContent.replace(/\s+/g, ' ').trim(),
    links: [...document.querySelectorAll('a[href^="http"]')].map((a) => a.href),
    phone: document.querySelector('.contact').textContent.includes('+351 914 681 157'), email: document.querySelector('.contact').textContent.includes('info@overlay.pt'),
    hours: !!document.querySelector('#hours'),
  }));
  check('title, default language and logo are Overlay\'s', b.title === 'Overlay · The Wrap Specialists' && b.lang === 'pt-PT' && b.select === 'pt' && b.logo === 'Overlay' && b.viewBox === '0 0 330 248', JSON.stringify([b.title, b.lang, b.logo, b.viewBox]));
  check('the "design proposal" strip is shown, in gold', /Proposta de design · não é o site oficial/.test(b.strip) && b.stripBg === 'rgb(225, 180, 91)', `${b.strip} ${b.stripBg}`);
  check('gold key colour, gold bands and a warm dark background', b.primary === 'rgb(225, 180, 91)' && /gradient/.test(b.bookingBg) && /gradient/.test(b.finaleBg) && b.bodyBg === 'rgb(15, 12, 6)', `${b.primary} ${b.bodyBg}`);
  check('address, phone and e-mail are Overlay\'s; no opening hours are shown', /Rua Luciano Cordeiro 4A\s*1150-215 Lisboa, Portugal/.test(b.address) && b.phone && b.email && !b.hours, b.address);
  const need = ['https://www.instagram.com/overlaypt/', 'https://www.facebook.com/overlaypt', 'https://www.youtube.com/overlay', 'https://wa.me/351914681157', 'https://overlay.pt/politica-de-privacidade-e-dados/', 'https://www.livroreclamacoes.pt/Pedido/Reclamacao'];
  check('social, WhatsApp, privacy and complaints links point to Overlay', need.every((h) => b.links.includes(h)), need.filter((h) => !b.links.includes(h)).join(' '));
  let leak = [];
  for (const l of LANGS) {
    await page.selectOption('#lang-select', l);
    const text = await page.evaluate(() => document.body.innerText + ' ' + [...document.querySelectorAll('[alt],[aria-label],[title]')].map((e) => `${e.getAttribute('alt') || ''} ${e.getAttribute('aria-label') || ''} ${e.getAttribute('title') || ''}`).join(' '));
    const m = text.match(/fastwheels|ardon|greneye|valais|starlight|ciel étoilé|céu estrelado|sternenhimmel|cielo stellato/i);
    if (m) leak.push(`${l}: ${m[0]}`);
  }
  check('no FASTWHEELS details and no services Overlay does not list, in any language', !leak.length, leak.join(' | '));
  check('no script errors and no missing files', !page.errors.length, page.errors.slice(0, 4).join(' | '));
  await page.context().close();
}

// ---------------------------------------------------------------------------------------------------- languages
if (want('lang')) {
  const page = await open({ width: 390, height: 844, mobile: true });
  const expected = { fr: ['fr-CH', 'Demandez un devis.'], en: ['en-GB', 'Request a quote.'], pt: ['pt-PT', 'Peça um orçamento.'], it: ['it-CH', 'Richiedi un preventivo.'], de: ['de-CH', 'Fragen Sie eine Offerte an.'] };
  await jump(page, 'booking');
  await page.fill('#f-make', 'BMW'); await page.fill('#f-name', 'Pessoa Teste'); await page.check('#f-service-ppf', { force: true });
  for (const l of ['en', 'fr', 'it', 'de', 'pt']) {
    await page.selectOption('#lang-select', l);
    await page.waitForTimeout(120);
    const s = await page.evaluate(() => ({
      lang: document.documentElement.lang, title: document.querySelector('#book-title').textContent, make: document.querySelector('#f-make').value, service: document.querySelector('#f-service-ppf').checked,
      empty: [...document.querySelectorAll('[data-i18n]')].filter((e) => !e.textContent.trim() || /^[a-z]+\.[a-z0-9.]+$/i.test(e.textContent.trim())).map((e) => e.dataset.i18n),
      attrs: [...document.querySelectorAll('[data-i18n-attr]')].flatMap((e) => e.dataset.i18nAttr.split(';').map((pair) => pair.split(':')).filter(([a, k]) => !e.getAttribute(a) || e.getAttribute(a) === k).map(([, k]) => k)),
      stored: localStorage.getItem('overlay.lang'), fw: localStorage.getItem('fw.lang'), docTitle: document.title,
    }));
    check(`language ${l}: everything translated, entries kept`, s.lang === expected[l][0] && s.title === expected[l][1] && !s.empty.length && !s.attrs.length && s.make === 'BMW' && s.service && s.stored === `"${l}"` && s.fw === null && s.docTitle === 'Overlay · The Wrap Specialists', `${s.lang} "${s.title}" untranslated: ${[...s.empty, ...s.attrs].join(',')}`);
  }
  await page.context().close();
}

// ---------------------------------------------------------------------------------------------------- navigation
if (want('nav')) {
  const page = await open();
  const ids = await page.evaluate(() => [...document.querySelectorAll('.nav-desktop .nav-link')].map((a) => a.dataset.nav));
  check('menu: wash and detail, PPF, car wrapping, window tint, services', ids.join(',') === 'detailing,ppf,wrap,tint,services', ids.join(','));
  const marks = [];
  for (const id of [...ids, 'booking', 'finale']) {
    await jump(page, id);
    await page.waitForTimeout(450);
    marks.push(`${id}:${await page.evaluate(() => document.querySelector('.nav-link.is-current')?.dataset.nav || '-')}`);
  }
  check('each menu item lands on its section and is marked as current; none is marked on the quote form or the closing band', marks.join(' ') === 'detailing:detailing ppf:ppf wrap:wrap tint:tint services:services booking:- finale:-', marks.join(' '));
  await jump(page, 'tint');
  await page.waitForTimeout(300);
  const skip = await page.evaluate(() => { const a = document.querySelector('.cine-skip'); const r = a.getBoundingClientRect(); return { to: a.dataset.nav, visible: r.top >= 0 && r.bottom <= innerHeight }; });
  await page.click('.cine-skip');
  await page.waitForTimeout(500);
  const landed = await page.evaluate(() => Math.round(document.querySelector('#services').getBoundingClientRect().top - document.querySelector('#header').getBoundingClientRect().bottom));
  check('the sequence can be skipped: the skip link goes to the services section', skip.to === 'services' && skip.visible && Math.abs(landed) <= 4, JSON.stringify({ skip, landed }));
  const svc = await page.evaluate(() => ({ cards: [...document.querySelectorAll('.svc h3')].map((h) => h.textContent), badges: [...document.querySelectorAll('.badge')].map((b) => b.textContent), tags: [...document.querySelectorAll('.tags li')].map((b) => b.textContent), films: document.querySelector('.films').textContent.replace(/\s+/g, ' '), about: document.querySelectorAll('.timeline li').length }));
  check('services section: five described services, warranties, other services, film brands and the company history', svc.cards.length === 5 && svc.badges.join('|') === 'Garantia de 3 anos|Garantia de 10 anos|Garantia de 3 anos' && svc.tags.length === 4 && /Inozetek/.test(svc.films) && /LLumar/.test(svc.films) && svc.about === 3, JSON.stringify(svc));
  await page.context().close();
}

// ---------------------------------------------------------------------------------------------------- quote form
if (want('form')) {
  const page = await open();
  const services = await page.evaluate(() => [...document.querySelectorAll('input[name="services"]')].map((i) => i.value));
  check('the form offers the services of Overlay\'s own quote form', services.join(',') === 'carwrap,ppf,tint,detail,parts,motowrap,buildingtint,boatwrap', services.join(','));
  await jump(page, 'wrap');
  const start = await page.evaluate(() => ({ color: document.querySelector('input[name="wrap-color"]:checked').value, name: document.querySelector('#readout-name').textContent }));
  check('the configurator starts in yellow', start.color === 'signal-yellow' && start.name === 'Amarelo sinal', JSON.stringify(start));
  await page.click('#config-request');
  await page.waitForTimeout(400);
  const car = await page.evaluate(() => ({ carwrap: document.querySelector('#f-service-carwrap').checked, moto: document.querySelector('#f-service-motowrap').checked, text: document.querySelector('#wrap-choice-text').textContent }));
  check('"request this configuration" for the car ticks Car Wrapping and carries the colour', car.carwrap && !car.moto && /BMW M4 Competition · Amarelo sinal/.test(car.text), JSON.stringify(car));
  await page.click('#f-submit');
  const errs = await page.evaluate(() => ({ shown: [...document.querySelectorAll('.error:not([hidden])')].map((e) => e.id), kind: document.querySelector('#form-status').dataset.kind }));
  check('empty fields are reported; nothing is sent', ['e-make', 'e-model', 'e-name', 'e-phone', 'e-email'].every((id) => errs.shown.includes(id)) && errs.kind === 'invalid', JSON.stringify(errs));
  await page.fill('#f-make', 'BMW'); await page.fill('#f-model', 'M4 Competition'); await page.fill('#f-year', '2023');
  await page.fill('#f-name', 'Marta Lopes'); await page.fill('#f-phone', '+351 912 345 678'); await page.fill('#f-message', 'Wrapping completo.');
  await page.click('#f-submit');
  const off = await page.evaluate(() => ({ kind: document.querySelector('#form-status').dataset.kind, title: document.querySelector('#form-status h3')?.textContent, done: !document.querySelector('#form-done').hidden, wa: document.querySelector('#wa-request')?.href || '', label: document.querySelector('#wa-request')?.textContent.trim() }));
  const waText = decodeURIComponent((off.wa.split('?text=')[1] || ''));
  check('no booking service connected: the form says so and offers WhatsApp with the request written out', off.kind === 'offline' && !off.done && off.wa.startsWith('https://wa.me/351914681157?text=') && /Pedido de orçamento · Overlay/.test(waText) && /Car Wrapping \(vinil\)/.test(waText) && /BMW · M4 Competition · 2023/.test(waText) && /Amarelo sinal/.test(waText) && /Marta Lopes/.test(waText), `${off.kind} ${off.label} ${waText.split('\n').slice(0, 3).join(' / ')}`);
  await page.fill('#f-message', 'Wrapping completo, cor amarela.');
  const waText2 = decodeURIComponent((await page.evaluate(() => document.querySelector('#wa-request').href)).split('?text=')[1]);
  check('the WhatsApp text follows later edits to the form', /cor amarela/.test(waText2));
  await page.context().close();

  const bike = await open();
  await jump(bike, 'wrap');
  await bike.check('#wrap-vehicle-bike', { force: true });
  await bike.click('#config-request');
  await bike.waitForTimeout(400);
  const b = await bike.evaluate(() => ({ carwrap: document.querySelector('#f-service-carwrap').checked, moto: document.querySelector('#f-service-motowrap').checked, type: document.querySelector('#f-type-bike').checked, text: document.querySelector('#wrap-choice-text').textContent }));
  check('for the motorcycle it ticks Motorcycle Wrapping', b.moto && !b.carwrap && b.type && /BMW S 1000 RR/.test(b.text), JSON.stringify(b));
  await bike.context().close();

  for (const [label, status] of [['success', 201], ['server error', 500]]) {
    const p2 = await open({ config: { tier: 'low', instant: true, bookingEndpoint: 'https://booking.test/api/appointments' } });
    let body = null;
    await p2.route('https://booking.test/**', async (route) => { body = route.request().postDataJSON(); await new Promise((r) => setTimeout(r, 500)); await route.fulfill({ status, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ ok: status < 300 }) }); });
    await jump(p2, 'booking');
    await p2.check('#f-service-tint', { force: true });
    await p2.fill('#f-make', 'BMW'); await p2.fill('#f-model', 'M4'); await p2.fill('#f-name', 'Marta Lopes'); await p2.fill('#f-email', 'marta@example.pt');
    await p2.click('#f-submit');
    await p2.waitForTimeout(1500);
    const end = await p2.evaluate(() => ({ done: !document.querySelector('#form-done').hidden, text: document.querySelector('#form-done p').textContent, kind: document.querySelector('#form-status').dataset.kind, name: document.querySelector('#f-name').value }));
    if (status < 300) check('with a booking service: the request is sent and the confirmation names Overlay', end.done && /Overlay entrará em contacto/.test(end.text) && body?.services[0] === 'tint' && body?.language === 'pt', JSON.stringify(end));
    else check('with a booking service that fails: an error is shown, entries kept, no success message', !end.done && end.kind === 'failed' && end.name === 'Marta Lopes', JSON.stringify(end));
    await p2.context().close();
  }
}

// ---------------------------------------------------------------------------------------------------- window tint sequence
if (want('tint')) {
  const page = await open();
  await jump(page, 'interior');
  await cineTo(page, 0.01);
  await page.waitForFunction(() => window.FW?.scene?.isShown('interior') && window.FW.stage === 'interior', null, { timeout: 240000 });
  const at = async (p) => {
    await cineTo(page, p);
    await page.waitForFunction((p) => Math.abs(window.FW.scene.getState().progress - p) < 0.01, p, { timeout: 60000 });
    return { ...(await sceneState(page)), caption: await page.evaluate(() => document.querySelector('#caption-title').dataset.i18n), rail: await page.evaluate(() => document.querySelector('#rail li.is-current')?.textContent), controls: await page.evaluate(() => !document.querySelector('#lights').hidden) };
  };
  const f = [];
  for (const p of [0.01, 0.26, 0.45, 0.6, 0.8, 1]) f.push(await at(p));
  check('sequence: tint film', f[0].sequence === 'tint', String(f[0].sequence));
  check('forward: clear glass → film on → door opens → view from inside', f[0].tint < 0.05 && f[1].tint > 0.95 && f[1].door < 0.05 && f[3].door > 0.9 && f[5].tint === 1, f.map((s) => `tint ${s.tint?.toFixed(2)} door ${s.door?.toFixed(2)}`).join(' | '));
  check('captions and step marks follow', f.map((s) => s.caption).join(',') === 'cap.tint.title,cap.tint.title,cap.door.title,cap.door.title,cap.inside.title,cap.inside.title' && f[0].rail === 'Película' && f[5].rail === 'Interior', f.map((s) => `${s.caption}/${s.rail}`).join(' '));
  check('the shade control is available from the start; ambient lighting and stars stay off', f.every((s) => s.controls) && f.every((s) => !s.ambient && !s.stars), f.map((s) => `${s.controls} ${s.ambient} ${s.stars}`).join(' | '));
  const opac = {};
  await cineTo(page, 0.26);
  for (const level of ['light', 'medium', 'dark']) { await page.check(`#tint-level-${level}`, { force: true }); await page.waitForTimeout(250); opac[level] = (await sceneState(page)).tintOpacity; }
  check('light, medium and dark films darken the glass in steps; the choice is remembered', opac.light < opac.medium && opac.medium < opac.dark && (await page.evaluate(() => localStorage.getItem('overlay.tint'))) === '"dark"', JSON.stringify(opac));
  const r = [];
  for (const p of [0.6, 0.26, 0.01]) r.push(await at(p));
  check('reversible: scrolling back closes the door and clears the glass', r[0].door > 0.9 && r[1].door < 0.05 && r[2].tint < 0.05, r.map((s) => `tint ${s.tint?.toFixed(2)} door ${s.door?.toFixed(2)}`).join(' | '));
  check('no script errors during the sequence', !page.errors.length, page.errors.slice(0, 3).join(' | '));
  await page.context().close();
}

// ---------------------------------------------------------------------------------------------------- reduced motion
if (want('reduced')) {
  const page = await open({ reduced: true });
  await jump(page, 'tint');
  await page.waitForTimeout(400);
  const s = await page.evaluate(() => {
    const box = document.querySelector('#stills .compare'); const r = box.getBoundingClientRect();
    return { stills: !document.querySelector('#stills').hidden, cine: getComputedStyle(document.querySelector('#cine')).display, inView: r.top < innerHeight && r.bottom > 0, before: !box.querySelector('[data-side="before"]').hidden, after: !box.querySelector('[data-side="after"]').hidden, imgs: [...document.querySelectorAll('#stills img')].map((i) => i.getAttribute('src')) };
  });
  await page.click('#stills [data-show="after"]');
  const after = await page.evaluate(() => { const box = document.querySelector('#stills .compare'); return { before: !box.querySelector('[data-side="before"]').hidden, after: !box.querySelector('[data-side="after"]').hidden }; });
  const loaded = await page.evaluate(async () => { const imgs = [...document.querySelectorAll('#stills img')]; imgs.forEach((i) => { i.loading = 'eager'; }); await Promise.all(imgs.map((i) => (i.complete ? null : new Promise((res) => { i.onload = i.onerror = res; })))); return imgs.map((i) => i.naturalWidth > 0); });
  check('reduced motion: the tint sequence becomes a before/after pair of stills', s.stills && s.cine === 'none' && s.inView && s.before && !s.after && !after.before && after.after, JSON.stringify({ s, after }));
  check('reduced motion: the stills are Overlay\'s own renders and they load', s.imgs.join(',') === 'img/still-tint-off.webp,img/still-tint-on.webp,img/still-inside.webp,img/still-door.webp' && loaded.every(Boolean), `${s.imgs.join(',')} ${loaded.join(',')}`);
  await page.context().close();
}

// ---------------------------------------------------------------------------------------------------- layout
if (want('layout')) for (const [w, h] of [[360, 740], [390, 844], [430, 932], [768, 1024], [1440, 900]]) {
  const page = await open({ width: w, height: h, mobile: w < 800 });
  const bad = [];
  for (const id of ['top', 'detailing', 'ppf', 'wrap', 'booking', 'interior', 'services', 'finale']) {
    await jump(page, id);
    await page.waitForTimeout(300);
    const r = await page.evaluate(() => {
      const d = document.documentElement, small = [], out = [];
      for (const el of document.querySelectorAll('a.btn, button, select, .seg-item, .check, .link, .nav-link, .logo, .fab, .tags li')) {
        const b = el.getBoundingClientRect();
        if (!b.width || b.bottom < 0 || b.top > innerHeight || el.closest('[hidden]')) continue;
        if (el.matches('.tags li')) { if (b.right > innerWidth + 1) out.push(el.textContent); continue; }
        if (b.height < 43.5 && !el.matches('.nav-link')) small.push(`${el.className || el.tagName}:${Math.round(b.height)}`);
        if (b.right > innerWidth + 1 || b.left < -1) out.push(el.className || el.tagName);
      }
      return { sw: d.scrollWidth, cw: d.clientWidth, small, out };
    });
    if (r.sw > r.cw || r.small.length || r.out.length) bad.push(`${id}: ${r.sw}/${r.cw} small[${r.small.join(',')}] out[${r.out.join(',')}]`);
  }
  const logo = await page.evaluate(() => { const b = document.querySelector('.logo').getBoundingClientRect(), bar = document.querySelector('.bar').getBoundingClientRect(); return { h: Math.round(b.height), inside: b.top >= bar.top && b.bottom <= bar.bottom }; });
  check(`${w}×${h}: no sideways scrolling, 44px targets, logo fits the header`, !bad.length && logo.inside && logo.h >= 44, `${bad.join(' ; ')} logo ${JSON.stringify(logo)}`);
  await page.context().close();
}

console.log(`\n${passed} passed, ${failed} failed`);
await browser.close();
process.exit(failed ? 1 : 0);
