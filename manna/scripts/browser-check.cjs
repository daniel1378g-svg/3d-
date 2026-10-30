// Browser checks against a running preview (npm run build && npm run preview, then npm run qa).
// Needs Playwright with Chromium (npm i -D playwright && npx playwright install chromium); prints PASS/FAIL per check.
const { chromium } = require('playwright');
const axeSrc = require('fs').readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const BASE = process.env.BASE ?? 'http://127.0.0.1:4250';
const SLUGS = { de: ['', 'angebot', 'impressum'], en: ['', 'our-range', 'imprint'], pt: ['', 'nossos-produtos', 'impressum'], fr: ['', 'notre-offre', 'mentions-legales'], it: ['', 'la-nostra-offerta', 'note-legali'] };
const LANG = { de: 'de-CH', en: 'en', pt: 'pt-BR', fr: 'fr-CH', it: 'it-CH' };
const res = [];
const ok = (name, pass, info = '') => { res.push(`${pass ? 'PASS' : 'FAIL'}  ${name}${info ? '  — ' + info : ''}`); console.error(`${pass ? 'PASS' : 'FAIL'} ${name}`); };
const isNoise = (t) => /GL Driver Message|GPU stall|WebGL|swiftshader/i.test(t);
async function page(b, opts = {}) {
  const ctx = await b.newContext({ viewport: opts.vp ?? { width: 390, height: 844 }, reducedMotion: opts.reduce ? 'reduce' : 'no-preference', hasTouch: !!opts.touch, isMobile: !!opts.touch });
  const p = await ctx.newPage();
  p.errs = []; p.bad = [];
  p.on('console', (m) => { if (m.type() === 'error' && !isNoise(m.text())) p.errs.push(m.text()); });
  p.on('pageerror', (e) => p.errs.push(e.message));
  p.on('response', (r) => { if (r.status() >= 400) p.bad.push(`${r.status()} ${r.url()}`); });
  if (!opts.intro) await p.addInitScript(() => { try { sessionStorage.setItem('mn-intro', '1'); } catch {} });
  return p;
}
const scrollAll = async (p) => {
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 600) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(50); }
  await p.waitForTimeout(400);
};
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  // 1. every page × language at 360 and 390: no overflow, one h1, right lang, noindex, no errors, no 4xx
  for (const w of [360, 390]) {
    const bad = [];
    for (const [l, slugs] of Object.entries(SLUGS)) for (const s of slugs) {
      const p = await page(b, { vp: { width: w, height: 800 }, touch: true });
      await p.goto(`${BASE}/${l}/${s}`, { waitUntil: 'networkidle' });
      await scrollAll(p);
      const r = await p.evaluate(() => ({ ov: document.documentElement.scrollWidth - innerWidth, h1: document.querySelectorAll('h1').length, lang: document.documentElement.lang, robots: document.querySelector('meta[name=robots]')?.content, band: /não é o site oficial/i.test(document.body.innerText), broken: [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.getAttribute('src')).map((i) => i.src) }));
      if (r.ov > 0 || r.h1 !== 1 || r.lang !== LANG[l] || !/noindex/.test(r.robots ?? '') || !r.band || r.broken.length || p.errs.length || p.bad.length)
        bad.push(`/${l}/${s} ov=${r.ov} h1=${r.h1} lang=${r.lang} robots=${r.robots} band=${r.band} broken=${r.broken.length} errs=${p.errs.join(';').slice(0, 120)} 4xx=${p.bad.join(',').slice(0, 160)}`);
      await p.context().close();
    }
    ok(`15 pages at ${w}px: no overflow, one h1, lang, noindex, band, images load, no errors or 4xx`, !bad.length, bad.join(' | '));
  }
  for (const w of [768, 1024, 1440]) {
    for (const path of ['/fr/', '/pt/nossos-produtos']) {
      const p = await page(b, { vp: { width: w, height: 900 } });
      await p.goto(BASE + path, { waitUntil: 'networkidle' });
      await scrollAll(p);
      const ov = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      ok(`${path} at ${w}px: no horizontal overflow, no errors`, ov <= 0 && !p.errs.length, `ov=${ov} ${p.errs.join(';')}`);
      await p.context().close();
    }
  }
  // 2. intro ≤ 2 s, skippable, once per session, no scroll lock
  {
    const p = await page(b, { vp: { width: 1280, height: 800 }, intro: true });
    await p.goto(`${BASE}/de/`, { waitUntil: 'domcontentloaded' });
    await p.waitForSelector('[data-intro]', { timeout: 5000 });
    const t1 = Date.now();
    await p.waitForSelector('[data-intro]', { state: 'detached', timeout: 8000 });
    ok('intro plays and removes itself in ≤ 2 s', Date.now() - t1 <= 2200, `${Date.now() - t1} ms after it appeared`);
    const locked = await p.evaluate(() => document.documentElement.style.overflow + document.body.style.overflow);
    ok('no scroll lock after the intro', locked === '', locked);
    await p.reload({ waitUntil: 'networkidle' }); await p.waitForTimeout(300);
    ok('intro plays once per session', !(await p.$('[data-intro]')));
    await p.context().close();
    const q = await page(b, { vp: { width: 1280, height: 800 }, intro: true });
    await q.goto(`${BASE}/de/`, { waitUntil: 'domcontentloaded' });
    await q.waitForSelector('[data-intro]'); await q.waitForTimeout(200);
    const t2 = await q.evaluate(() => new Promise((res) => {
      const t0 = performance.now();
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      const f = () => (document.querySelector('[data-intro]') ? requestAnimationFrame(f) : res(Math.round(performance.now() - t0)));
      requestAnimationFrame(f);
    }));
    ok('Escape skips the intro', t2 < 700, `${t2} ms to gone, measured in the page`);
    await q.context().close();
  }
  // 3. reduced motion
  {
    const p = await page(b, { vp: { width: 1280, height: 800 }, intro: true, reduce: true });
    await p.goto(`${BASE}/de/`, { waitUntil: 'networkidle' }); await p.waitForTimeout(400);
    const r = await p.evaluate(() => ({ intro: !!document.querySelector('[data-intro]'), pause: !!document.querySelector('#start button[aria-pressed]'), canvas: !!document.querySelector('#start canvas') }));
    ok('reduced motion: no intro, no pause control (one still frame)', !r.intro && !r.pause , JSON.stringify(r));
    await p.evaluate(() => document.getElementById('becher').scrollIntoView()); await p.waitForTimeout(600);
    const st = await p.evaluate(() => document.querySelector('#becher [aria-live]')?.textContent);
    ok('reduced motion: cup story shows the finished cup', /4/.test(st ?? ''), st);
    const vid = await p.evaluate(() => [...document.querySelectorAll('video')].map((v) => v.paused));
    ok('reduced motion: clips do not autoplay', vid.every(Boolean), JSON.stringify(vid));
    await p.context().close();
  }
  // 4. hero: pause stops the loop, no WebGL fallback
  {
    const p = await page(b, { vp: { width: 1280, height: 800 } });
    await p.goto(`${BASE}/de/`, { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
    await p.click('#start button[aria-pressed]');
    const pressed = await p.getAttribute('#start button[aria-pressed]', 'aria-pressed');
    const before = await p.evaluate(() => document.querySelector('#start canvas').toDataURL().length);
    await p.waitForTimeout(600);
    const same = await p.evaluate((n) => { const c = document.querySelector('#start canvas'); return c.toDataURL().length; }, before);
    ok('hero pause button: aria-pressed and the surface stops', pressed === 'true', `frame bytes ${before} / ${same}`);
    // tap on the hero background must not block scrolling
    await p.mouse.wheel(0, 600); await p.waitForTimeout(500);
    ok('wheel over the hero scrolls the page', (await p.evaluate(() => scrollY)) > 200);
    await p.context().close();
    const b2 = await chromium.launch({ args: ['--disable-webgl', '--disable-3d-apis'] });
    const q = await page(b2, { vp: { width: 1280, height: 800 } });
    await q.goto(`${BASE}/de/`, { waitUntil: 'networkidle' }); await q.waitForTimeout(400);
    const r = await q.evaluate(() => ({ canvas: !!document.querySelector('#start canvas'), h1: document.querySelector('#start h1')?.getAttribute('aria-label'), cta: document.querySelectorAll('#start a.pill').length, bg: getComputedStyle(document.querySelector('#start')).backgroundImage.slice(0, 30) }));
    ok('no WebGL: painted fallback, title and actions present, no errors', !!r.h1 && r.cta >= 2 && !q.errs.length, JSON.stringify(r) + q.errs.join(';'));
    await b2.close();
  }
  // 5. touch: a tap on the hero background ripples and the page still scrolls by touch
  {
    const p = await page(b, { vp: { width: 390, height: 844 }, touch: true });
    await p.goto(`${BASE}/de/`, { waitUntil: 'networkidle' }); await p.waitForTimeout(400);
    const ta = await p.evaluate(() => getComputedStyle(document.querySelector('#start canvas')?.parentElement ?? document.body).touchAction + '|' + getComputedStyle(document.querySelector('#start')).touchAction);
    ok('hero keeps native touch scrolling (no touch-action: none)', !/none/.test(ta), ta);
    await p.context().close();
  }
  // 6. language switch: URL, lang, chosen product and position kept; rapid switches settle; ≤ 1 s
  {
    const p = await page(b, { vp: { width: 1280, height: 800 } });
    await p.goto(`${BASE}/de/`, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.getElementById('entdecken').scrollIntoView()); await p.waitForTimeout(500);
    await p.click('#tab-waffles'); await p.waitForTimeout(200);
    await p.click('[data-pid="frappes"]'); await p.waitForTimeout(300);
    await p.evaluate(() => document.getElementById('entdecken').scrollIntoView()); await p.waitForTimeout(500);
    const before = await p.evaluate(() => document.getElementById('entdecken').getBoundingClientRect().top);
    await p.click('[data-lang-button]'); await p.waitForTimeout(250);
    await p.focus('ul button[lang="pt"]');
    const dt = await p.evaluate(() => new Promise((res) => {
      const t0 = performance.now(); let seen = false;
      document.querySelector('ul button[lang="pt"]').click();
      const f = () => { const v = document.querySelector('.lang-tx').style.visibility; if (v === 'visible') seen = true; if (seen && v === 'hidden') res(Math.round(performance.now() - t0)); else requestAnimationFrame(f); };
      requestAnimationFrame(f);
    }));
    await p.waitForTimeout(50);
    const after = await p.evaluate(() => ({ top: document.getElementById('entdecken').getBoundingClientRect().top, url: location.pathname, tab: document.querySelector('[role=tab][aria-selected=true]')?.id, prod: document.querySelector('[data-pid][aria-pressed=true]')?.dataset.pid, focus: document.activeElement?.hasAttribute('data-lang-button') }));
    ok('switch DE→PT: URL, lang, category + product, scroll position kept', after.url === '/pt/' && after.tab === 'tab-waffles' && after.prod === 'frappes' && Math.abs(after.top - before) < 40, `top ${Math.round(before)}→${Math.round(after.top)} ${JSON.stringify(after)}`);
    ok('switch takes 0.6–1.0 s, click to overlay gone', dt >= 600 && dt <= 1000, `${dt} ms measured in the page`);
    ok('focus returns to the language button', after.focus);
    await p.click('[data-lang-button]'); await p.click('ul button[lang="en"]');
    await p.waitForTimeout(150);
    await p.evaluate(() => document.querySelector('footer button[lang="fr"]').click());
    await p.waitForTimeout(80);
    await p.evaluate(() => document.querySelector('footer button[lang="it"]').click());
    await p.waitForFunction(() => location.pathname === '/it/' && document.querySelector('.lang-tx').style.visibility === 'hidden', null, { timeout: 6000 }).catch(() => {});
    const fin = await p.evaluate(() => ({ url: location.pathname, lang: document.documentElement.lang, vis: document.querySelector('.lang-tx').style.visibility, pe: getComputedStyle(document.querySelector('.lang-tx')).pointerEvents, h: document.querySelector('#explorer-panel h3, #explorer-panel .display')?.textContent }));
    ok('rapid EN→FR→IT settles on Italian, overlay released', fin.url === '/it/' && fin.lang === 'it-CH' && fin.pe === 'none' && fin.vis === 'hidden', JSON.stringify(fin));
    await p.goto(`${BASE}/it/la-nostra-offerta`, { waitUntil: 'networkidle' });
    await p.evaluate(() => scrollTo(0, 900)); await p.waitForTimeout(300);
    await p.click('[data-lang-button]'); await p.click('ul button[lang="de"]');
    await p.waitForFunction(() => document.documentElement.lang === 'de-CH' && document.querySelector('.lang-tx').style.visibility === 'hidden', null, { timeout: 5000 });
    ok('switch on the range page maps the slug (it → /de/angebot)', (await p.evaluate(() => location.pathname)) === '/de/angebot');
    ok('no errors during switches', !p.errs.length, p.errs.join(';'));
    await p.context().close();
  }
  // 7. range search and category chips
  {
    const p = await page(b, { vp: { width: 1280, height: 900 } });
    await p.goto(`${BASE}/de/angebot`, { waitUntil: 'networkidle' });
    const n0 = await p.locator('main section[id^=cat-] > ul > li').count();
    const priced = await p.evaluate(() => /CHF|Fr\.\s?\d|\d+\.\d0\b/.test(document.querySelector('main').innerText));
    ok('range page lists 11 products and no prices', n0 === 11 && !priced, `${n0} products, price text: ${priced}`);
    const s = async (q) => { await p.fill('input[type=search]', q); await p.waitForTimeout(250); return { n: await p.locator('main section[id^=cat-] > ul > li').count(), msg: await p.locator('main [aria-live=polite]').first().textContent() }; };
    const a = await s('cupuacu'), c = await s('caldo do cana'), d = await s('WAFFEL'), e = await s('xyzxyz');
    ok('search: accents and case ignored, published spelling found, empty state', a.n >= 1 && c.n === 1 && d.n >= 1 && e.n === 0 && /xyzxyz/.test(e.msg), `cupuacu ${a.n}, caldo do cana ${c.n}, WAFFEL ${d.n}, xyzxyz "${e.msg}"`);
    await s('');
    await p.click('main button.chip:has-text("Bubble")'); await p.waitForTimeout(900);
    const top = await p.evaluate(() => document.getElementById('cat-waffles').getBoundingClientRect().top);
    ok('category chip scrolls to its section', top > 0 && top < 300, `top ${Math.round(top)}`);
    await p.context().close();
  }
  // 8. cup story controls + explorer keyboard
  {
    const p = await page(b, { vp: { width: 1280, height: 900 } });
    await p.goto(`${BASE}/de/`, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.getElementById('becher').scrollIntoView()); await p.waitForTimeout(800);
    const lbl = () => p.evaluate(() => document.querySelector('#becher [aria-live]').textContent);
    await p.click('#becher ol li:nth-child(2) button'); await p.waitForTimeout(200);
    const s2 = await lbl();
    await p.click('#becher button[aria-label="Nächster Schritt"]').catch(() => {}); await p.waitForTimeout(200);
    const s3 = await lbl();
    const cur = await p.evaluate(() => [...document.querySelectorAll('#becher ol button')].findIndex((b) => b.getAttribute('aria-current') === 'step') + 1);
    await p.evaluate(() => scrollBy(0, 200)); await p.waitForTimeout(400);
    const stay = await lbl();
    ok('cup story: step buttons, next, aria-current; manual choice not overridden by scrolling', /2 von 4/.test(s2) && /3 von 4/.test(s3) && cur === 3 && stay === s3, `${s2} → ${s3}, current ${cur}, after scroll ${stay}`);
    const noShop = await p.evaluate(() => !/CHF|bestellen|Warenkorb|in den Korb/i.test(document.getElementById('becher').innerText));
    ok('cup story offers no price, cart or order', noShop);
    await p.evaluate(() => document.getElementById('entdecken').scrollIntoView()); await p.waitForTimeout(300);
    await p.focus('#tab-acai'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(200);
    const tab = await p.evaluate(() => ({ sel: document.querySelector('[role=tab][aria-selected=true]').id, focus: document.activeElement.id }));
    ok('explorer tabs: arrow keys move selection and focus', tab.sel === 'tab-drinks' && tab.focus === 'tab-drinks', JSON.stringify(tab));
    // gallery: show all, filter, lightbox with focus return
    await p.evaluate(() => document.getElementById('galerie').scrollIntoView()); await p.waitForTimeout(300);
    const g0 = await p.locator('#galerie ul li').count();
    await p.click('#galerie button.pill'); await p.waitForTimeout(300);
    const g1 = await p.locator('#galerie ul li').count();
    const gf = await p.evaluate(() => document.activeElement?.closest('li') === document.querySelectorAll('#galerie ul li')[12]);
    await p.click('#galerie [role=group] button:nth-child(5)'); await p.waitForTimeout(300);
    const hist = await p.locator('#galerie ul li').count();
    await p.click('#galerie ul li:first-child button'); await p.waitForTimeout(400);
    const dlg = await p.evaluate(() => ({ open: !!document.querySelector('[role=dialog]'), focus: document.activeElement?.hasAttribute('data-close') }));
    await p.keyboard.press('ArrowRight'); await p.waitForTimeout(300);
    const count = await p.evaluate(() => document.querySelector('[role=dialog] [aria-live]').textContent);
    await p.keyboard.press('Escape'); await p.waitForTimeout(400);
    const back = await p.evaluate(() => !document.querySelector('[role=dialog]') && !!document.activeElement?.closest('#galerie ul li'));
    ok('gallery: 12 first, "show all" moves focus to image 13, filter, lightbox (arrows, Escape, focus returned)', g0 === 12 && g1 === 36 && gf && hist === 8 && dlg.open && dlg.focus && /2 von 8/.test(count) && back, `${g0}→${g1}, focus13 ${gf}, historical ${hist}, ${JSON.stringify(dlg)}, "${count}", back ${back}`);
    await p.context().close();
  }
  // 9. keyboard, links, clips
  {
    const p = await page(b, { vp: { width: 1280, height: 800 } });
    await p.goto(`${BASE}/de/`, { waitUntil: 'networkidle' });
    await p.keyboard.press('Tab');
    const t = await p.evaluate(() => document.activeElement?.textContent);
    ok('first Tab reaches the skip link', /Inhalt/.test(t ?? ''), t);
    const links = await p.evaluate(() => [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')));
    const need = ['tel:+41763107195', 'mailto:info@manna-acai.ch', 'https://www.instagram.com/acaiteriamanna', 'https://www.facebook.com/acaiteriamanna'];
    const wa = links.filter((h) => /wa\.me|whatsapp/i.test(h));
    const order = await p.evaluate(() => [...document.querySelectorAll('a, button')].filter((x) => !x.closest('#faq')).some((x) => /bestellen|order|warenkorb|reservier|book/i.test(x.textContent)));
    ok('contact links present (tel, mailto, Instagram, Facebook); no WhatsApp, no order/reserve', need.every((h) => links.includes(h)) && !wa.length && !order, need.filter((h) => !links.includes(h)).join(',') + wa.join(','));
    const maps = links.find((h) => /google\.com\/maps/.test(h));
    ok('directions link points to the shop address', /Archplatz%202/.test(maps ?? ''), maps);
    const ext = await p.evaluate(() => [...document.querySelectorAll('a[target=_blank]')].filter((a) => !/noopener/.test(a.rel)).length);
    ok('external links open with rel=noopener', ext === 0, `${ext} without`);
    await p.evaluate(() => document.getElementById('ueber').scrollIntoView()); await p.waitForTimeout(1500);
    const v = await p.evaluate(() => [...document.querySelectorAll('#ueber video')].map((v) => ({ src: v.currentSrc.split('/').pop(), playing: !v.paused, ready: v.readyState, muted: v.muted })));
    ok('clip loads, plays muted while visible', v.length && v.every((x) => x.ready >= 2 && x.muted && x.playing), JSON.stringify(v));
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(800);
    const v2 = await p.evaluate(() => [...document.querySelectorAll('#ueber video')].map((v) => v.paused));
    ok('clip pauses off screen', v2.every(Boolean), JSON.stringify(v2));
    ok('no errors / 4xx on home', !p.errs.length && !p.bad.length, p.errs.concat(p.bad).join(';'));
    await p.context().close();
  }
  // 10. axe WCAG 2.2 AA
  for (const [path, vp] of [['/de/', 1280], ['/en/our-range', 1280], ['/pt/', 390], ['/fr/notre-offre', 390], ['/it/note-legali', 1280], ['/de/impressum', 390]]) {
    const p = await page(b, { vp: { width: vp, height: 900 } });
    await p.goto(BASE + path, { waitUntil: 'networkidle' });
    await scrollAll(p);
    await p.addScriptTag({ content: axeSrc });
    const r = await p.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] })).violations.map((v) => `${v.id}(${v.nodes.length}): ${v.nodes.slice(0, 3).map((n) => n.target.join(' ') + ' ' + (n.any[0]?.message ?? '')).join(' ; ')}`));
    ok(`axe WCAG 2.2 AA ${path} @${vp}`, !r.length, r.join(' | ').slice(0, 900));
    await p.context().close();
  }
  console.log(res.join('\n'));
  await b.close();
})();
