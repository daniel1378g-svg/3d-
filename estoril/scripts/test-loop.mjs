// Frame-loop and API checks of the 3D journey in a real browser (Playwright, headless Chromium with
// SwiftShader), against a served build. Exit code 1 on any failure.
//
// node scripts/test-loop.mjs [--base http://127.0.0.1:8080/]
//
// Checks (capture mode, ?capture=1&3d=force&q=high, which exposes window.__journey and __cap):
//   viewport     the canvas covers the viewport exactly (CSS size = innerWidth × innerHeight) and its
//                drawing buffer is CSS size × device pixel ratio (1440×900 at 1×, 390×844 at 2×)
//   determinism  renderAt(t) twice gives the same pixels (hash of gl.readPixels), and again after
//                stills of other positions and a debug camera in between (t = 0.05, 0.375, 0.5,
//                0.95); a still advances no time, renderAt(t, { dt }) advances the scene clock by
//                exactly dt (clamped to 0.05 s), the progress is clamped to 0..1
//   warmup       warmup() leaves the journey state as it found it (progress, target, spring velocity,
//                intro, clock, car distance, wheel distance, speeds, environment step, red line),
//                ends with no blur history, and renderAt() draws the same pixels before and after it
//   rAF          start() adds exactly one requestAnimationFrame chain, a second start() none,
//                renderAt() neither adds nor cancels one (running or stopped), stop() removes it
//   cuts         jump(), setVisible(false → true) and start() clear the blur history
//   messages     no page errors, console errors or warnings
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');

const arg = (k, d) => {
  const i = process.argv.indexOf('--' + k);
  return i > -1 ? process.argv[i + 1] : d;
};
const base = arg('base', 'http://127.0.0.1:8080/');

let failures = 0;
const check = (name, ok, detail = '') => {
  if (!ok) failures++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${detail ? `  (${detail})` : ''}`);
};

const browser = await chromium.launch({
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});

/** Opens the capture page at a viewport; counts rAF callbacks; collects page messages. */
async function open(width, height, scale = 1) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale });
  const messages = [];
  page.on('pageerror', (e) => messages.push(String(e)));
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') messages.push(m.type() + ': ' + m.text());
  });
  // every rAF callback the page runs is counted; __rafRaw is the browser's own (uncounted)
  await page.addInitScript(() => {
    const raw = window.requestAnimationFrame.bind(window);
    window.__rafRaw = raw;
    window.__rafCalls = 0;
    window.requestAnimationFrame = (callback) =>
      raw((time) => {
        window.__rafCalls++;
        callback(time);
      });
  });
  await page.goto(`${base}index.html?capture=1&3d=force&q=high`, { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.__cap === 'function' && window.__journey, null, {
    timeout: 300000,
  });
  await page.addStyleTag({
    content: '*,*::before,*::after{transition:none!important;animation:none!important}',
  });
  // in-page helpers: a pixel hash of the frame just rendered, and the rAF callback rate
  await page.evaluate(() => {
    const J = window.__journey;
    window.__hash = () => {
      const gl = J.renderer.getContext();
      const w = gl.drawingBufferWidth;
      const h = gl.drawingBufferHeight;
      const pixels = new Uint8Array(w * h * 4);
      gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
      let hash = 0x811c9dc5;
      for (let i = 0; i < pixels.length; i++) hash = Math.imul(hash ^ pixels[i], 16777619);
      return (hash >>> 0).toString(16) + ':' + w + 'x' + h;
    };
    window.__renderHash = (t, options) => {
      J.renderAt(t, options);
      return window.__hash();
    };
    // callbacks per frame over `frames` frames of the uncounted probe chain
    window.__rafRate = (frames) =>
      new Promise((resolve) => {
        let seen = 0;
        let start = -1;
        const probe = () => {
          if (start < 0) start = window.__rafCalls;
          if (++seen > frames) return resolve((window.__rafCalls - start) / frames);
          window.__rafRaw(probe);
        };
        window.__rafRaw(probe);
      });
  });
  return { page, messages };
}

// --- viewport -------------------------------------------------------------------------------------
for (const [width, height, scale] of [
  [1440, 900, 1],
  [390, 844, 2],
]) {
  const { page, messages } = await open(width, height, scale);
  const size = await page.evaluate(() => {
    window.__journey.renderAt(0.5);
    const canvas = document.querySelector('.jr__canvas');
    const rect = canvas.getBoundingClientRect();
    return {
      css: [rect.left, rect.top, rect.width, rect.height],
      viewport: [innerWidth, innerHeight],
      buffer: [canvas.width, canvas.height],
      dpr: devicePixelRatio,
      scale: window.__journey.resScale,
    };
  });
  check(
    `canvas covers the ${width}x${height} viewport`,
    size.css[0] === 0 && size.css[1] === 0 && size.css[2] === width && size.css[3] === height,
    `canvas ${size.css.join(',')}, viewport ${size.viewport.join('x')}`,
  );
  const expected = [Math.round(width * Math.min(scale, 2)), Math.round(height * Math.min(scale, 2))];
  check(
    `drawing buffer is CSS size × ${scale}`,
    size.buffer[0] === expected[0] && size.buffer[1] === expected[1],
    `buffer ${size.buffer.join('x')}, expected ${expected.join('x')}`,
  );
  check(`no page messages at ${width}x${height}`, !messages.length, messages.join(' | '));
  await page.close();
}

// --- determinism, warmup, rAF, cuts (small viewport: software rendering is slow) ----------------
const { page, messages } = await open(640, 400, 1);

for (const t of [0.05, 0.375, 0.5, 0.95]) {
  const result = await page.evaluate((t) => {
    const first = window.__renderHash(t);
    const second = window.__renderHash(t);
    window.__renderHash(0.2);
    window.__renderHash(0.72);
    window.__journey.debugCam = { pos: [0, 400, 400], tgt: [0, 0, 0], fov: 40 };
    window.__renderHash(0.4);
    window.__journey.debugCam = null;
    const after = window.__renderHash(t);
    return { first, second, after };
  }, t);
  check(`renderAt(${t}) is repeatable`, result.first === result.second, `${result.first} / ${result.second}`);
  check(
    `renderAt(${t}) does not depend on the stills rendered before`,
    result.first === result.after,
    `${result.first} / ${result.after}`,
  );
}

// a frame of a sequence advances the scene clock by exactly the dt it is given (clamped), stills
// by nothing; the progress is clamped to 0..1
const timing = await page.evaluate(() => {
  const J = window.__journey;
  const clock = () => J.debugState().clock;
  const r = {};
  let c = clock();
  J.renderAt(0.5);
  r.still = clock() - c;
  c = clock();
  J.renderAt(0.501, { dt: 1 / 60 });
  r.frame = clock() - c;
  c = clock();
  J.renderAt(0.502, { dt: 5 });
  r.long = clock() - c;
  J.renderAt(1.7);
  r.high = J.progress;
  J.renderAt(-1);
  r.low = J.progress;
  return r;
});
check('a still advances no time', timing.still === 0, JSON.stringify(timing));
check('renderAt(t, { dt }) advances the clock by dt', Math.abs(timing.frame - 1 / 60) < 1e-12);
check('renderAt clamps dt to the frame-time cap', Math.abs(timing.long - 0.05) < 1e-12);
check('renderAt clamps the progress to 0..1', timing.high === 1 && timing.low === 0);

const warm = await page.evaluate(async () => {
  const J = window.__journey;
  const before = window.__renderHash(0.6);
  const state0 = J.debugState();
  await J.warmup();
  const state1 = J.debugState();
  const after = window.__renderHash(0.6);
  return { before, after, state0, state1 };
});
const keys = ['progress', 'target', 'velocity', 'intro', 'introDone', 'clock', 'carDistance'];
keys.push('wheelDistance', 'speed', 'prevSpeed', 'envStep', 'highlight', 'running', 'pendingFrame');
const changed = keys.filter((k) => JSON.stringify(warm.state0[k]) !== JSON.stringify(warm.state1[k]));
check(
  'warmup() restores the journey state',
  !changed.length,
  changed
    .map((k) => `${k}: ${JSON.stringify(warm.state0[k])} → ${JSON.stringify(warm.state1[k])}`)
    .join(', '),
);
check(
  'warmup() leaves no blur history',
  warm.state1.blurHistory === false,
  `blurHistory ${warm.state1.blurHistory}`,
);
check(
  'renderAt draws the same frame before and after warmup()',
  warm.before === warm.after,
  `${warm.before} / ${warm.after}`,
);

const rates = await page.evaluate(async () => {
  const J = window.__journey;
  const r = {};
  r.idle = await window.__rafRate(12);
  J.start();
  r.started = await window.__rafRate(12);
  J.start();
  r.startedTwice = await window.__rafRate(12);
  J.renderAt(0.5);
  r.renderAtRunning = await window.__rafRate(12);
  J.stop();
  r.stopped = await window.__rafRate(12);
  J.renderAt(0.5);
  r.renderAtStopped = await window.__rafRate(12);
  J.stop();
  r.stoppedTwice = await window.__rafRate(12);
  r.pendingAfterStop = J.debugState().pendingFrame;
  return r;
});
const near = (a, b) => Math.abs(a - b) < 0.2;
check('start() adds one rAF chain', near(rates.started, rates.idle + 1), JSON.stringify(rates));
check('a second start() adds none', near(rates.startedTwice, rates.idle + 1));
check('renderAt() while running keeps exactly the one chain', near(rates.renderAtRunning, rates.idle + 1));
check('stop() removes the chain', near(rates.stopped, rates.idle) && !rates.pendingAfterStop);
check('renderAt() while stopped starts no chain', near(rates.renderAtStopped, rates.idle));
check('a second stop() changes nothing', near(rates.stoppedTwice, rates.idle));

const cuts = await page.evaluate(async () => {
  const J = window.__journey;
  const r = {};
  J.renderAt(0.48, { dt: 1 / 60 });
  r.afterFrame = J.debugState().blurHistory;
  J.jump(0.5);
  r.afterJump = J.debugState().blurHistory;
  J.renderAt(0.5);
  J.setVisible(false);
  J.setVisible(true);
  r.afterVisible = J.debugState().blurHistory;
  J.renderAt(0.5);
  J.start();
  r.afterStart = J.debugState().blurHistory;
  J.stop();
  return r;
});
check('a rendered frame keeps its view-projection for the next one', cuts.afterFrame === true);
check('jump() clears the blur history', cuts.afterJump === false);
check('becoming visible clears the blur history', cuts.afterVisible === false);
check('start() clears the blur history', cuts.afterStart === false);
check('no page messages', !messages.length, [...new Set(messages)].join(' | '));
await browser.close();

console.log(failures ? `FAIL: ${failures} loop checks failed` : 'OK: all loop checks passed');
process.exit(failures ? 1 : 0);
