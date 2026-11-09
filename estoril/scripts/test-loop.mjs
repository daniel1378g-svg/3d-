// Frame-loop and API checks of the 3D journey in a real browser (Playwright, headless Chromium with
// SwiftShader), against a served build. Exit code 1 on any failure.
//
// node scripts/test-loop.mjs [--base http://127.0.0.1:8080/] [--update-viewports [WxH,WxH,…]]
//
// --update-viewports measures the layouts instead of checking them: it writes
// scripts/camera-viewports.json (test-camera.mjs's layouts) from the page, for every layout already
// in it plus the sizes listed (e.g. 360x740,844x390), and still runs every other check. Every entry
// gets its maxFov derived by one rule, an existing one keeps its nav choice and allow, a new one gets
// its nav derived (layoutEntry below).
//
// Checks (capture mode, ?capture=1&3d=force&q=high, which exposes window.__journey and __cap):
//   viewport     the canvas covers the viewport exactly (CSS size = innerWidth × innerHeight) and its
//                drawing buffer is CSS size × device pixel ratio (1440×900 at 1×, 390×844 at 2×,
//                1024×768)
//   layouts      for every layout in scripts/camera-viewports.json (test-camera.mjs's), the panels,
//                the stage buttons and the framing areas home.js passes to the camera match the page
//                (within 2 px), measured on a page opened at that size
//   determinism  renderAt(t) twice gives the same pixels (hash of gl.readPixels), and again after
//                stills of other positions and a debug camera in between (t = 0.05, 0.375, 0.5,
//                0.95), and again after the real render loop has played frames elsewhere (the
//                clock, the camera bob, the crew and the drifting clouds); a still is drawn at the
//                still clock (0), renderAt(t, { dt }) advances the scene clock by
//                exactly dt (clamped to 0.05 s), the progress is clamped to 0..1
//   intro        scrolling during the intro fly-in hurries it along: camera, car and FOV speeds stay
//                bounded (no cut) and the intro still completes
//   warmup       warmup() leaves the journey state as it found it (progress, target, spring velocity,
//                intro, clock, car distance, wheel distance, speeds, cloud drift, environment step,
//                red line),
//                ends with no blur history, and renderAt() draws the same pixels before and after it
//   rAF          start() adds exactly one requestAnimationFrame chain, a second start() none,
//                renderAt() neither adds nor cancels one (running or stopped), stop() removes it
//   cuts         jump(), setVisible(false → true) and start() clear the blur history
//   fog          with the fog distances forced to ~0, a fogged pixel is the fog colour, which is the
//                sky's horizon colour, on the direct path and through the blur pass
//   blur path    a still drawn through the blur pass equals the same frame drawn directly, and the
//                frame does not jump where the pass switches on (0.4305 → 0.4306)
//   messages     no page errors, console errors or warnings (but Chrome's driver note about the stall
//                that this script's own gl.readPixels causes: READPIXELS_STALL)
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { CAMERA_SHOTS } from '../src/journey/camera-shots.js';
import { FIT_EXTRA_FOV, FIT_FALLBACK_FOV, viewportTan } from '../src/journey/camera-director.js';
const { chromium } = createRequire(import.meta.url)('playwright');
/** The layouts test-camera.mjs frames the car in (scripts/camera-viewports.json). */
const VIEWPORTS_FILE = new URL('camera-viewports.json', import.meta.url);
const VIEWPORTS = JSON.parse(readFileSync(VIEWPORTS_FILE, 'utf8'));

const arg = (k, d) => {
  const i = process.argv.indexOf('--' + k);
  return i > -1 ? process.argv[i + 1] : d;
};
const base = arg('base', 'http://127.0.0.1:8080/');
const updateViewports = process.argv.includes('--update-viewports');
const addedSizes = (arg('update-viewports', '') || '')
  .split(',')
  .filter((size) => /^\d+x\d+$/.test(size))
  .map((size) => size.split('x').map(Number));
/**
 * Chrome's GL driver reports a "GPU stall due to ReadPixels" performance note (as a console warning)
 * when a gl.readPixels waits for the GPU. The page never reads pixels; this script does (the hashes,
 * the fog pixel and the blur comparisons below), and whether the note comes depends on timing, so
 * exactly that note (and its last repetition, which says it will no longer repeat) is set aside.
 * Every other message still fails the check.
 */
const READPIXELS_STALL =
  /^\[\.WebGL-0x[0-9a-f]+\]\s*GL Driver Message \(OpenGL, Performance, GL_CLOSE_PATH_NV, High\): GPU stall due to ReadPixels( \(this message will no longer repeat\))?$/i;
let readPixelsStalls = 0;

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
    if (m.type() === 'warning' && READPIXELS_STALL.test(m.text())) readPixelsStalls++;
    else if (m.type() === 'error' || m.type() === 'warning') messages.push(m.type() + ': ' + m.text());
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

// --- viewport and layouts ---------------------------------------------------------------------------
/**
 * The page layout test-camera.mjs frames the car in, in CSS px (in the page): the panels' and the
 * stage buttons' boxes and the framing areas home.js passed to the camera.
 */
function pageLayout() {
  const box = (r) => [r.left, r.top, r.right, r.bottom].map(Math.round);
  const framing = window.__journey.debugState().framing;
  const px = (f) =>
    [f[0] * innerWidth, f[1] * innerHeight, f[2] * innerWidth, f[3] * innerHeight].map(Math.round);
  return {
    panels: [...document.querySelectorAll('[data-journey] [data-panel]')].map((el) => [
      el.offsetLeft,
      el.offsetTop,
      el.offsetLeft + el.offsetWidth,
      el.offsetTop + el.offsetHeight,
    ]),
    buttons: box(document.querySelector('.jr__nav').getBoundingClientRect()),
    panel: px(framing.panel),
    open: px(framing.open),
  };
}

/** The key solve's allowance in maxFov (degrees; see layoutEntry). */
const KEY_SOLVE_FOV = 2;
/**
 * The fixture entry for a layout measured at width × height (test-camera.mjs explains the fields):
 *   maxFov  for every entry, the widest the director may go: the widest key FOV for its aspect, or
 *           the widest car-shot key's widened by the whole between-keys fit (FIT_EXTRA_FOV +
 *           FIT_FALLBACK_FOV) if that is wider, rounded up, plus KEY_SOLVE_FOV for the key solve,
 *           which widens a key's lens only where the scenery stops its dolly (on none of the
 *           fixture's layouts today): 54° on desktop, 58° at 4:3, 72° on portrait phones,
 *   nav     kept from an existing entry (then the stage buttons' box as measured); for a new one the
 *           stage buttons' box if they stand beside the panel-shown framing area (right of it, at
 *           its height: home.js then keeps that area clear of them), else null,
 *   allow   kept from an existing entry.
 */
function layoutEntry(width, height, layout, old) {
  const aspect = width / height;
  const fovAt = (shot) => (2 * Math.atan(viewportTan(shot.fov, aspect)) * 180) / Math.PI;
  const widest = Math.max(...CAMERA_SHOTS.map(fovAt));
  const widestCar = Math.max(...CAMERA_SHOTS.filter((shot) => !shot.aerial).map(fovAt));
  const maxFov = Math.ceil(Math.max(widest, widestCar + FIT_EXTRA_FOV + FIT_FALLBACK_FOV)) + KEY_SOLVE_FOV;
  const { panel, buttons } = layout;
  const beside = panel[2] <= buttons[0] && buttons[1] < panel[3] && buttons[3] > panel[1];
  const entry = {
    name: `${width}x${height}`,
    width,
    height,
    maxFov,
    panels: layout.panels,
    nav: (old ? old.nav : beside) ? buttons : null,
    panel,
    open: layout.open,
    buttons,
  };
  if (old && old.allow) entry.allow = old.allow;
  if (old && old.maxFov !== maxFov) console.log(`note ${entry.name}: maxFov ${old.maxFov}° → ${maxFov}°`);
  return entry;
}

/** One entry per line, as the file is kept. */
function formatViewports(entries) {
  const fmt = (v) =>
    Array.isArray(v)
      ? `[${v.map(fmt).join(', ')}]`
      : v && typeof v === 'object'
        ? `{${Object.entries(v)
            .map(([k, x]) => `${JSON.stringify(k)}: ${fmt(x)}`)
            .join(', ')}}`
        : JSON.stringify(v);
  return `[\n${entries.map((entry) => '  ' + fmt(entry)).join(',\n')}\n]\n`;
}

// the page checks at three sizes (canvas, drawing buffer at the device pixel ratio, messages), the
// layout of every fixture entry (and of the sizes --update-viewports adds) on a page of that size
const measured = new Map();
const PAGE_CHECKS = [
  [1440, 900, 1],
  [390, 844, 2],
  [1024, 768, 1],
];
const layoutSizes = [...VIEWPORTS.map((v) => [v.width, v.height]), ...addedSizes].filter(
  ([w, h], i, all) => all.findIndex(([w2, h2]) => w2 === w && h2 === h) === i,
);
for (const [width, height, scale] of PAGE_CHECKS) {
  const { page, messages } = await open(width, height, scale);
  const size = await page.evaluate(() => {
    window.__journey.renderAt(0.5);
    const canvas = document.querySelector('.jr__canvas');
    const rect = canvas.getBoundingClientRect();
    return {
      css: [rect.left, rect.top, rect.width, rect.height],
      viewport: [innerWidth, innerHeight],
      buffer: [canvas.width, canvas.height],
    };
  });
  measured.set(`${width}x${height}`, await page.evaluate(pageLayout));
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
for (const [width, height] of layoutSizes) {
  if (measured.has(`${width}x${height}`)) continue;
  const { page, messages } = await open(width, height, 1);
  measured.set(`${width}x${height}`, await page.evaluate(pageLayout));
  check(`no page messages at ${width}x${height}`, !messages.length, messages.join(' | '));
  await page.close();
}
if (updateViewports) {
  const entries = layoutSizes.map(([width, height]) =>
    layoutEntry(
      width,
      height,
      measured.get(`${width}x${height}`),
      VIEWPORTS.find((v) => v.width === width && v.height === height),
    ),
  );
  writeFileSync(VIEWPORTS_FILE, formatViewports(entries));
  console.log(
    `wrote ${entries.length} layouts to scripts/camera-viewports.json: ${entries.map((e) => e.name).join(', ')}`,
  );
} else {
  // the layouts test-camera.mjs frames the car in are the page's (within 2 px)
  for (const table of VIEWPORTS) {
    const layout = measured.get(`${table.width}x${table.height}`);
    const off = (a, b) => Math.max(...a.flat().map((v, i) => Math.abs(v - b.flat()[i])));
    const layoutError = Math.max(
      off(layout.panels, table.panels),
      off(layout.buttons, table.buttons),
      off(layout.panel, table.panel),
      off(layout.open, table.open),
    );
    check(
      `test-camera's ${table.name} layout matches the page`,
      layoutError <= 2,
      `largest difference ${layoutError} px; page ${JSON.stringify(layout)}`,
    );
  }
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
  J.renderAt(0.5, { dt: 1 / 60 });
  J.renderAt(0.5);
  r.still = clock();
  let c = clock();
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
check('a still is drawn at the still clock (0)', timing.still === 0, JSON.stringify(timing));
check('renderAt(t, { dt }) advances the clock by dt', Math.abs(timing.frame - 1 / 60) < 1e-12);
check('renderAt clamps dt to the frame-time cap', Math.abs(timing.long - 0.05) < 1e-12);
check('renderAt clamps the progress to 0..1', timing.high === 1 && timing.low === 0);

// stills do not depend on how long the real loop has run: play 40 frames at another position
for (const t of [0.5, 0.95]) {
  const result = await page.evaluate(async (t) => {
    const J = window.__journey;
    const first = window.__renderHash(t);
    J.setProgress(0.62);
    J.start();
    await new Promise((resolve) => {
      let n = 0;
      const tick = () => (++n >= 40 ? resolve() : window.__rafRaw(tick));
      window.__rafRaw(tick);
    });
    J.stop();
    const played = J.debugState().clock;
    return { first, after: window.__renderHash(t), played };
  }, t);
  check(
    `renderAt(${t}) does not depend on the frames the loop played before`,
    result.first === result.after,
    `${result.first} / ${result.after}, the loop played ${result.played.toFixed(2)} s`,
  );
}

// scrolling during the intro fly-in hurries it along without a cut: from the start of the intro, the
// real loop plays 8 frames, the page scrolls to 0.03, the loop plays on; the speed of the camera,
// of the car and of the FOV change stays bounded (the intro's own peaks × the skip speed 2.5:
// car ≤ 400 m/s, eye ≤ 90 m/s, FOV ≤ 60°/s; a cut moved the car 87 m and the eye 25 m in one frame)
const intro = await page.evaluate(async () => {
  const J = window.__journey;
  J.renderAt(0, { intro: 0 });
  J.setProgress(0);
  const samples = [];
  const sample = () => {
    const s = J.debugState();
    samples.push({
      clock: s.clock,
      intro: s.intro,
      eye: J.camera.position.toArray(),
      car: J.car.root.position.toArray(),
      fov: J.camera.fov,
    });
  };
  J.start();
  await new Promise((resolve) => {
    let n = 0;
    const tick = () => {
      sample();
      n++;
      if (n === 8) J.setProgress(0.03);
      if (n >= 160 || samples[samples.length - 1].intro >= 1) return resolve();
      window.__rafRaw(tick);
    };
    window.__rafRaw(tick);
  });
  J.stop();
  const rates = { eye: 0, car: 0, fov: 0 };
  let jump = { eye: 0, car: 0, fov: 0 };
  for (let i = 1; i < samples.length; i++) {
    const a = samples[i - 1];
    const b = samples[i];
    const dt = b.clock - a.clock;
    const eye = Math.hypot(...b.eye.map((v, k) => v - a.eye[k]));
    const car = Math.hypot(...b.car.map((v, k) => v - a.car[k]));
    const fov = Math.abs(b.fov - a.fov);
    jump = { eye: Math.max(jump.eye, eye), car: Math.max(jump.car, car), fov: Math.max(jump.fov, fov) };
    if (dt > 0) {
      rates.eye = Math.max(rates.eye, eye / dt);
      rates.car = Math.max(rates.car, car / dt);
      rates.fov = Math.max(rates.fov, fov / dt);
    }
  }
  const last = samples[samples.length - 1];
  return { rates, jump, frames: samples.length, intro: last.intro, introAt8: samples[7].intro };
});
check(
  'scrolling during the intro hurries it without a cut',
  intro.rates.car <= 400 && intro.rates.eye <= 90 && intro.rates.fov <= 60 && intro.intro >= 1,
  `peak speeds car ${intro.rates.car.toFixed(0)} m/s, eye ${intro.rates.eye.toFixed(1)} m/s, ` +
    `FOV ${intro.rates.fov.toFixed(1)}°/s; largest frame steps car ${intro.jump.car.toFixed(2)} m, eye ` +
    `${intro.jump.eye.toFixed(2)} m, FOV ${intro.jump.fov.toFixed(2)}°; intro ${intro.introAt8.toFixed(3)} at ` +
    `the scroll, ${intro.intro} after ${intro.frames} frames`,
);

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
keys.push('wheelDistance', 'speed', 'prevSpeed', 'drift', 'envStep', 'highlight', 'running', 'pendingFrame');
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
// fog: with the fog distances forced to ~0 every fogged pixel shows the fog colour, which is the sky's
// horizon colour (display sRGB), on the direct path (0.102) and through the blur pass (0.5, a still
// and a frame of a sequence)
const fog = await page.evaluate(() => {
  const J = window.__journey;
  const fog = J.scene.fog;
  let sky = null;
  J.scene.traverse((node) => {
    if (node.material && node.material.uniforms && node.material.uniforms.hor) sky = node.material;
  });
  const pixel = () => {
    const gl = J.renderer.getContext();
    const px = new Uint8Array(4);
    gl.readPixels(gl.drawingBufferWidth >> 1, 4, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
    return [px[0], px[1], px[2]];
  };
  Object.defineProperty(fog, 'near', { get: () => 0, set() {}, configurable: true });
  Object.defineProperty(fog, 'far', { get: () => 1e-3, set() {}, configurable: true });
  const r = [];
  for (const [t, dt] of [
    [0.102, 0],
    [0.5, 0],
    [0.501, 1 / 60],
  ]) {
    J.renderAt(t, { dt });
    const hex = fog.color.getHexString('srgb');
    const expected = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
    r.push({
      t,
      dt,
      pixel: pixel(),
      fog: hex,
      horizon: sky.uniforms.hor.value.getHexString('srgb-linear'),
      expected,
    });
  }
  delete fog.near;
  delete fog.far;
  J.renderAt(0.5);
  return r;
});
for (const f of fog) {
  const error = Math.max(...f.pixel.map((v, i) => Math.abs(v - f.expected[i])));
  check(
    `a fully fogged pixel is the horizon colour (t=${f.t}${f.dt ? ', sequence frame' : ''})`,
    error <= 3 && f.fog === f.horizon,
    `pixel ${f.pixel.join(',')}, fog #${f.fog}, horizon #${f.horizon}`,
  );
}

// the blur pass draws a still (zero velocity) exactly like the direct path, so the blur fades in and
// out without a jump: the same frame through the pass and drawn directly, and two stills on either
// side of the point where the pass switches on (0.4305 direct, 0.4306 through the pass)
const paths = await page.evaluate(() => {
  const J = window.__journey;
  const grab = () => {
    const gl = J.renderer.getContext();
    const px = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
    gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, px);
    return px;
  };
  const compare = (a, b) => {
    let sum = 0;
    let signed = 0;
    let max = 0;
    for (let i = 0; i < a.length; i += 4)
      for (let c = 0; c < 3; c++) {
        const d = a[i + c] - b[i + c];
        sum += Math.abs(d);
        signed += d;
        max = Math.max(max, Math.abs(d));
      }
    const n = (a.length / 4) * 3;
    return { mad: sum / n, mean: signed / n, max };
  };
  J.renderAt(0.5);
  const pass = grab();
  J.renderer.setRenderTarget(null);
  J.renderer.render(J.scene, J.camera);
  const same = compare(pass, grab());
  J.renderAt(0.4305);
  const before = grab();
  J.renderAt(0.4306);
  const switched = compare(grab(), before);
  return { same, switched };
});
check(
  'the blur pass returns the direct frame at zero velocity',
  paths.same.mad < 0.5 && paths.same.max <= 3,
  `mean abs ${paths.same.mad.toFixed(3)}, max ${paths.same.max}`,
);
check(
  'switching the blur pass on does not change the frame',
  Math.abs(paths.switched.mean) < 0.5,
  `mean change ${paths.switched.mean.toFixed(3)}/255, mean abs ${paths.switched.mad.toFixed(3)}`,
);

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
check(
  'no page messages',
  !messages.length,
  [
    ...new Set(messages),
    ...(readPixelsStalls
      ? [`set aside: ${readPixelsStalls} "GPU stall due to ReadPixels" driver notes`]
      : []),
  ].join(' | '),
);
await browser.close();

console.log(failures ? `FAIL: ${failures} loop checks failed` : 'OK: all loop checks passed');
process.exit(failures ? 1 : 0);
