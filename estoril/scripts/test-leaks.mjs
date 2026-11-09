// Leak and stability checks of the home page with the 3D journey running (live, not capture mode), in
// headless Chromium (Playwright + CDP) against a served build. Exit code 1 on any failure.
//
//   node scripts/test-leaks.mjs [--base http://127.0.0.1:8080/] [--only visits,bfcache,session] [--draw]
//
// The page is index.html?3d=force&q=high (the tier with the most GPU resources: shadow map, blur
// targets) at 1280x800, with scripts/perf-probe.mjs installed: GPU objects are counted at the GL entry
// points (create*/delete* per kind, texture and renderbuffer bytes), so the checks see what the
// browser really holds, whatever three.js reports. The draw calls are skipped (perf-probe noDraw)
// unless --draw, which only makes SwiftShader slower: no check depends on pixels.
//
//   visits    home -> events -> home, 8 times, by navigation: the JS heap after a forced GC on each
//             home visit stays flat (least-squares slope over visits 2-9), and the WebGL contexts of
//             the pages left behind are released: 9 home visits create 18 contexts (the device check's
//             probe and the scene's), past Chrome's limit of 16 live contexts, yet no "too many
//             active WebGL contexts" warning appears and the current page's context is live
//   bfcache   home -> events -> back, 4 times, with the back/forward cache allowed: when the browser
//             restores the home page from it, the scene resumes (one render loop again, context live);
//             when it does not, the reasons are reported (information, not a failure: headless
//             Chromium under automation reports "masked" for every page here, the stills page too)
//   session   one long visit:
//             (b) 300 scripted scroll steps forward and back and 30 stage-button jumps, twice: GL
//                 objects of every kind, texture and renderbuffer bytes and shader programs equal
//                 after the second pass to after the first, and the JS heap after GC within 512 KB
//             (c) 20 resizes across desktop, tablet and phone sizes, back to the first size, at the
//                 top of the journey and again on the lap (progress 0.5, where the blur pass renders
//                 every frame and its targets follow the drawing buffer: checked at every size):
//                 render targets (shadow map, blur targets, environment) replaced, not added: the
//                 same GL objects and bytes as before the resizes
//             (d) 10 hidden/visible cycles (document.hidden emulated, visibilitychange dispatched) and
//                 10 scroll-away/back cycles (IntersectionObserver start/stop): exactly one render
//                 loop and the page's own frame loop pending afterwards (2 rAF callbacks; 1 while
//                 stopped), never more
//             (e) event listeners on window, document, the journey section and the canvas (CDP
//                 DOMDebugger.getEventListeners): the same counts at the end as after load
//   messages  no page errors, console errors or warnings anywhere
import { installProbe, launch } from './perf-probe.mjs';

const arg = (k, d) => {
  const i = process.argv.indexOf('--' + k);
  return i > -1 ? process.argv[i + 1] : d;
};
const BASE = arg('base', 'http://127.0.0.1:8080/');
const ONLY = arg('only', 'visits,bfcache,session').split(',');
const DRAW = process.argv.includes('--draw');
const HOME = 'index.html?3d=force&q=high';
const EVENTS = 'eventos/index.html';
const VISITS = 8;
const RESIZES = [
  [1440, 900],
  [390, 844],
  [1024, 768],
  [360, 740],
  [844, 390],
  [1920, 1080],
  [768, 1024],
  [1280, 800],
];

let failures = 0;
const check = (name, ok, detail = '') => {
  if (!ok) failures++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${detail ? '  ' + detail : ''}`);
  return ok;
};
const kb = (bytes) => (bytes / 1024).toFixed(0) + ' KB';

const browser = await launch();
const messages = [];

async function newPage(width = 1280, height = 800, inBrowser = browser) {
  const context = await inBrowser.newContext({ viewport: { width, height } });
  await context.addInitScript(installProbe, { noDraw: !DRAW });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send('HeapProfiler.enable');
  page.on('pageerror', (e) => messages.push(`pageerror ${e}`));
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') messages.push(`${m.type()} ${m.text()}`);
  });
  return { context, page, cdp };
}

/** Waits until the scene is ready and shown (.jr.is-3d), then a few frames. */
async function sceneReady(page) {
  await page.waitForFunction(
    () => document.querySelector('[data-journey]')?.classList.contains('is-3d'),
    null,
    {
      timeout: 300000,
    },
  );
  await frames(page, 10);
}

const frames = (page, n = 2) =>
  page.evaluate(
    (n) =>
      new Promise((resolve) => {
        let left = n;
        const tick = () => (--left <= 0 ? resolve() : requestAnimationFrame(tick));
        requestAnimationFrame(tick);
      }),
    n,
  );

async function heap(cdp) {
  await cdp.send('HeapProfiler.collectGarbage');
  await cdp.send('HeapProfiler.collectGarbage');
  return (await cdp.send('Runtime.getHeapUsage')).usedSize;
}

const probe = (page) => page.evaluate(() => window.__probe.summary());

async function listeners(cdp) {
  const out = {};
  const targets = {
    window: 'window',
    document: 'document',
    journey: 'document.querySelector("[data-journey]")',
    canvas: 'document.querySelector(".jr__canvas")',
  };
  for (const [name, expression] of Object.entries(targets)) {
    const { result } = await cdp.send('Runtime.evaluate', { expression });
    if (!result.objectId) continue;
    const { listeners: list } = await cdp.send('DOMDebugger.getEventListeners', {
      objectId: result.objectId,
    });
    out[name] = list.length;
    await cdp.send('Runtime.releaseObject', { objectId: result.objectId });
  }
  return out;
}

/** Least-squares slope of ys over 0..n-1. */
function slope(ys) {
  const n = ys.length;
  const mx = (n - 1) / 2;
  const my = ys.reduce((s, y) => s + y, 0) / n;
  let num = 0;
  let den = 0;
  ys.forEach((y, x) => {
    num += (x - mx) * (y - my);
    den += (x - mx) * (x - mx);
  });
  return num / den;
}

const sameObjects = (a, b) => JSON.stringify(a.objects) === JSON.stringify(b.objects);
const describe = (s) =>
  `${Object.entries(s.objects)
    .map(([k, v]) => `${k} ${v}`)
    .join(', ')}; textures ${kb(s.textureBytes)}, renderbuffers ${kb(s.renderbufferBytes)}`;

// --- (a) repeat visits -----------------------------------------------------------------------------
if (ONLY.includes('visits')) {
  console.log('\nvisits: home -> events -> home ×' + VISITS);
  const { context, page, cdp } = await newPage();
  const heaps = [];
  const contexts = [];
  for (let visit = 0; visit <= VISITS; visit++) {
    await page.goto(BASE + HOME, { waitUntil: 'load' });
    await sceneReady(page);
    heaps.push(await heap(cdp));
    contexts.push(await probe(page));
    if (visit < VISITS) {
      await page.goto(BASE + EVENTS, { waitUntil: 'load' });
      await frames(page, 5);
    }
  }
  const perVisit = slope(heaps.slice(1));
  console.log('     heap after GC per home visit: ' + heaps.map(kb).join(' · '));
  check('JS heap flat over repeat visits', Math.abs(perVisit) < 256 * 1024, `slope ${kb(perVisit)}/visit`);
  const last = contexts.at(-1);
  const tooMany = messages.some((m) => /too many active webgl contexts/i.test(m));
  check(
    'WebGL contexts of the pages left are released',
    !tooMany && last.contextsLive === 1 && last.contextsCreated === 2,
    `${(VISITS + 1) * 2} contexts created over ${VISITS + 1} visits; this page: created ${last.contextsCreated}, live ${last.contextsLive}`,
  );
  check(
    'every home visit holds the same GL objects',
    contexts.every((c) => sameObjects(c, contexts[0])),
    describe(contexts[0]),
  );
  await context.close();
}

// --- back/forward cache ------------------------------------------------------------------------------
if (ONLY.includes('bfcache')) {
  console.log('\nbfcache: home -> events -> back -> forward -> back …');
  // Playwright starts Chromium with the cache off (--disable-back-forward-cache), and scripts/serve.mjs
  // sends Cache-Control: no-store, which keeps pages out of it too: a static host does neither
  const cacheBrowser = await launch([], { ignoreDefaultArgs: ['--disable-back-forward-cache'] });
  const { context, page } = await newPage(1280, 800, cacheBrowser);
  await context.route(/\.html(\?|$)/, async (route) => {
    const response = await route.fetch();
    const headers = { ...response.headers() };
    delete headers['cache-control'];
    await route.fulfill({ response, headers });
  });
  await page.goto(BASE + HOME, { waitUntil: 'load' });
  await sceneReady(page);
  await page.evaluate(() => (window.__visit = 1));
  let restored = 0;
  let reasons = '';
  for (let i = 0; i < 4; i++) {
    await page.goto(BASE + EVENTS, { waitUntil: 'load' });
    await frames(page, 3);
    await page.goBack({ waitUntil: 'load' });
    await frames(page, 10);
    const state = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      return {
        same: window.__visit === 1,
        reasons: nav && nav.notRestoredReasons ? JSON.stringify(nav.notRestoredReasons.reasons || []) : '',
        summary: window.__probe.summary(),
      };
    });
    if (state.same) {
      restored++;
      check(
        `restored from the cache (${i + 1}): one render loop, context live`,
        state.summary.rafPending === 2 && state.summary.contextsLive === 1,
        `rAF pending ${state.summary.rafPending}, live contexts ${state.summary.contextsLive}`,
      );
    } else {
      reasons = state.reasons;
      await sceneReady(page);
      await page.evaluate(() => (window.__visit = 1));
    }
  }
  console.log(
    `     ${restored} of 4 back navigations restored the page from the cache` +
      (restored < 4 ? ` (not restored: ${reasons || 'no reason reported'})` : ''),
  );
  await context.close();
  await cacheBrowser.close();
}

// --- one long session: scroll, jumps, resizes, visibility, listeners ---------------------------------
if (ONLY.includes('session')) {
  console.log('\nsession: scroll, stage jumps, resizes, visibility and start/stop cycles');
  const { context, page, cdp } = await newPage();
  await page.goto(BASE + HOME, { waitUntil: 'load' });
  await sceneReady(page);
  const listenersAtStart = await listeners(cdp);

  // 300 scroll steps forward and back, then 30 stage-button jumps
  const pass = () =>
    page.evaluate(async () => {
      const journey = document.querySelector('[data-journey]');
      const top = journey.getBoundingClientRect().top + scrollY;
      const range = journey.offsetHeight - innerHeight;
      const frame = () =>
        new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      for (let i = 0; i < 300; i++) {
        const k = i < 150 ? i / 149 : (299 - i) / 149;
        window.scrollTo({ top: top + k * range, behavior: 'instant' });
        await frame();
      }
      const buttons = [...journey.querySelectorAll('[data-goto]')];
      for (let i = 0; i < 30; i++) {
        buttons[(i * 3) % buttons.length].click();
        // wait for the smooth scroll to settle
        let last = -1;
        let still = 0;
        for (let f = 0; f < 240 && still < 4; f++) {
          await frame();
          still = scrollY === last ? still + 1 : 0;
          last = scrollY;
        }
      }
      window.scrollTo({ top, behavior: 'instant' });
      await frame();
    });
  await pass();
  await frames(page, 10);
  const first = await probe(page);
  const heapFirst = await heap(cdp);
  await pass();
  await frames(page, 10);
  const second = await probe(page);
  const heapSecond = await heap(cdp);
  check(
    'scroll and jumps: GL objects unchanged after the first pass',
    sameObjects(first, second) &&
      first.textureBytes === second.textureBytes &&
      first.renderbufferBytes === second.renderbufferBytes,
    describe(second),
  );
  check(
    'scroll and jumps: JS heap after GC',
    heapSecond - heapFirst < 512 * 1024,
    `${kb(heapFirst)} → ${kb(heapSecond)}`,
  );

  // 20 resizes, ending at the size the page started with
  const sizes = [];
  for (let i = 0; i < 20; i++) sizes.push(RESIZES[(i + 1) % RESIZES.length]);
  sizes[sizes.length - 1] = [1280, 800];
  const before = second;
  let peakRenderbuffers = 0;
  for (const [width, height] of sizes) {
    await page.setViewportSize({ width, height });
    await frames(page, 4);
    peakRenderbuffers = Math.max(peakRenderbuffers, (await probe(page)).renderbuffers);
  }
  await frames(page, 10);
  const afterResize = await probe(page);
  check(
    'resizes: render targets replaced, not added (same GL objects and bytes at the same size)',
    sameObjects(before, afterResize) &&
      before.textureBytes === afterResize.textureBytes &&
      before.renderbufferBytes === afterResize.renderbufferBytes,
    `${describe(afterResize)}; at most ${peakRenderbuffers} renderbuffers on the way`,
  );

  // the same 20 resizes on the lap (progress 0.5), where the blur pass renders every frame and its
  // targets follow the drawing buffer (at the top of the journey no target depends on the viewport):
  // at every size the blur's multisampled colour buffer has the drawing buffer's size, and afterwards
  // the GL objects and bytes are those from before
  const toLap = () =>
    page.evaluate(() => {
      const journey = document.querySelector('[data-journey]');
      const top = journey.getBoundingClientRect().top + scrollY;
      window.scrollTo({ top: top + 0.5 * (journey.offsetHeight - innerHeight), behavior: 'instant' });
    });
  const lapState = () =>
    page.evaluate(() => {
      const summary = window.__probe.summary({ largest: 16 });
      const canvas = document.querySelector('.jr__canvas');
      const size = `renderbuffer ${canvas.width}x${canvas.height} `;
      return {
        renderbuffers: summary.renderbuffers,
        blurAtSize: summary.largest.some(([, what]) => what.startsWith(size) && /samples/.test(what)),
      };
    });
  await toLap();
  await frames(page, 180);
  const beforeLap = await probe(page);
  let followed = 0;
  let peakLap = 0;
  for (const [width, height] of sizes) {
    await page.setViewportSize({ width, height });
    await toLap(); // the journey's height follows the viewport: scroll back to the same progress
    await frames(page, 40);
    const state = await lapState();
    peakLap = Math.max(peakLap, state.renderbuffers);
    if (state.blurAtSize) followed++;
  }
  await frames(page, 10);
  const afterLap = await probe(page);
  check(
    'resizes on the lap: the blur targets follow the drawing buffer at every size',
    followed === sizes.length,
    `${followed} of ${sizes.length} sizes`,
  );
  check(
    'resizes on the lap: blur targets replaced, not added (same GL objects and bytes at the same size)',
    sameObjects(beforeLap, afterLap) &&
      beforeLap.textureBytes === afterLap.textureBytes &&
      beforeLap.renderbufferBytes === afterLap.renderbufferBytes,
    `${describe(afterLap)}; at most ${peakLap} renderbuffers on the way`,
  );
  await page.evaluate(() => {
    const journey = document.querySelector('[data-journey]');
    window.scrollTo({ top: journey.getBoundingClientRect().top + scrollY, behavior: 'instant' });
  });
  await frames(page, 60);

  // hidden/visible and scroll-away/back cycles: one render loop
  const pending = () => page.evaluate(() => window.__probe.raf.size);
  const running = await pending();
  check('one render loop and the page loop while running', running === 2, `${running} rAF callbacks pending`);
  let hiddenPending = -1;
  for (let i = 0; i < 10; i++) {
    await page.evaluate((hidden) => {
      Object.defineProperty(document, 'hidden', { configurable: true, get: () => hidden });
      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        get: () => (hidden ? 'hidden' : 'visible'),
      });
      document.dispatchEvent(new Event('visibilitychange'));
    }, true);
    await frames(page, 3);
    hiddenPending = Math.max(hiddenPending, await pending());
    await page.evaluate(() => {
      delete document.hidden;
      delete document.visibilityState;
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await frames(page, 3);
  }
  let awayPending = -1;
  for (let i = 0; i < 10; i++) {
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
    await frames(page, 4);
    awayPending = Math.max(awayPending, await pending());
    await page.evaluate(() => {
      const journey = document.querySelector('[data-journey]');
      window.scrollTo({ top: journey.getBoundingClientRect().top + scrollY, behavior: 'instant' });
    });
    await frames(page, 4);
  }
  const after = await pending();
  check('hidden: the render loop stops (page loop only)', hiddenPending === 1, `${hiddenPending} pending`);
  check('scrolled away: the render loop stops (page loop only)', awayPending === 1, `${awayPending} pending`);
  check('after 20 stop/start cycles: one render loop again', after === 2, `${after} pending`);

  const listenersAtEnd = await listeners(cdp);
  check(
    'event listeners on window, document, journey and canvas unchanged',
    JSON.stringify(listenersAtStart) === JSON.stringify(listenersAtEnd),
    JSON.stringify(listenersAtEnd),
  );
  const heapEnd = await heap(cdp);
  check(
    'JS heap after GC over the whole session',
    heapEnd - heapFirst < 1024 * 1024,
    `${kb(heapFirst)} → ${kb(heapEnd)}`,
  );
  await context.close();
}

await browser.close();
const filtered = messages.filter((m) => !/GPU stall due to ReadPixels/.test(m));
check('no page errors, console errors or warnings', !filtered.length, filtered.slice(0, 5).join(' | '));
console.log(failures ? `\n${failures} check(s) failed` : '\nall leak checks passed');
process.exit(failures ? 1 : 0);
