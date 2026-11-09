// Headless benchmark of the 3D journey on the declared device profiles (docs/performance.md), against
// a served build. Prints one table per profile and the budget checks; exit code 1 if a budget fails.
//
//   node scripts/bench.mjs [--base http://127.0.0.1:8080/] [--profiles desktop-high,phone-mid]
//                          [--frames 600] [--json out.json] [--draw]
//
// Per profile (scripts/perf-probe.mjs PROFILES: viewport, device pixel ratio, quality tier, CPU
// slowdown with CDP Emulation.setCPUThrottlingRate), in a browser of its own (a cold shader cache: a
// browser keeps compiled programs across pages, which made every profile after the first load
// faster), one page load of index.html?capture=1&3d=force&q=… with the probe of perf-probe.mjs
// installed, then:
//   load       bytes transferred until the scene is ready (Playwright response bodies; gzip size
//              estimated with zlib level 9, as a static host would serve them), and the stills path
//              (?3d=off) the same way; the load phases from the performance marks (ce:* in
//              src/home.js and src/journey/journey.js), ms since navigation start: chunk, data,
//              world, car, created, warm (shaders compiled, positions pre-rendered), shown
//   GPU        draw calls and triangles per frame at each moment of MOMENTS (renderer.info with
//              autoReset off: shadow pass, scene and blur pass), the shadow pass's share, shader
//              programs, geometries, textures, GPU memory: texture + renderbuffer bytes (GL-level
//              tracking) plus the canvas's own buffers (estimated, perf-probe.mjs canvasBytes), the
//              shadow map size and the drawing buffer (pixels)
//   CPU        JS time per frame (performance.now around renderAt(t, { dt: 1/60 }) over a sweep of
//              --frames frames through the whole journey, after an untimed warm-up sweep), p50 / p95
//              / max per stage. With the draw calls skipped (perf-probe.mjs noDraw) unless --draw:
//              SwiftShader's raster time is not a GPU time and would swamp the CPU numbers.
//   programs   shader programs compiled after warmup() anywhere along the journey (each one is a
//              synchronous compile, a hitch, on a real GPU)
//   memory     allocation rate (CDP sampling heap profiler, collected objects included) over the
//              sweep, in KB per frame, and the JS heap after a forced GC before and after it (retained
//              growth must be ~0)
//   contexts   WebGL contexts created and live (the device check's probe context is created and lost)
//
// SwiftShader is a CPU rasteriser: none of these numbers is a GPU frame time. Draw calls, triangles,
// programs, bytes and allocation counts are exact; CPU times are this host's, slowed down per profile.
// For frame times on a real device use the page's own bench: index.html?bench=1 (src/bench.js).
import { writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { MOMENTS, PROFILES, STAGE_RANGES, installProbe, kb, launch, mb, percentile } from './perf-probe.mjs';

const arg = (k, d) => {
  const i = process.argv.indexOf('--' + k);
  return i > -1 ? process.argv[i + 1] : d;
};
const BASE = arg('base', 'http://127.0.0.1:8080/');
const NAMES = arg('profiles', Object.keys(PROFILES).join(',')).split(',');
const FRAMES = +arg('frames', 600);
const JSON_OUT = arg('json', '');
const DRAW = process.argv.includes('--draw');

/**
 * Budgets per declared profile (docs/performance.md gives the reason for each). Draw calls and
 * triangles count every pass of a frame (shadow map, scene, blur) at the heaviest moment; GPU memory
 * is everything the page holds on the GPU: textures, render targets (shadow map, blur targets,
 * environment) and the canvas's own buffers, budgeted at 1/16 of the class's memory (8 GB desktops
 * and MacBooks, 4 GB laptops and phones, 2 GB low phones: integrated GPUs and phones share it with
 * the system); CPU is the p95 of JS time per scripted frame under the profile's CPU slowdown;
 * allocation is the garbage per frame (three.js's own per-draw uniform bookkeeping is most of it),
 * retained is what a forced GC leaves after the sweep; ready is navigation start to the end of
 * warmup() (SwiftShader compiles the shaders on the CPU: an upper bound, not a device time).
 */
const COMMON = { allocKB: 256, retainedKB: 256, lateCompiles: 0, load3dKB: 2200, loadStillsKB: 1000 };
const BUDGETS = {
  'desktop-high': {
    ...COMMON,
    calls: 1000,
    triangles: 3e6,
    programs: 64,
    gpuMB: 512,
    bufferMP: 1.5,
    cpuP95: 8,
    readyMs: 8000,
  },
  'desktop-high-2x': {
    ...COMMON,
    calls: 1000,
    triangles: 3e6,
    programs: 64,
    gpuMB: 512,
    bufferMP: 5.2,
    cpuP95: 8,
    readyMs: 8000,
  },
  'laptop-mid': {
    ...COMMON,
    calls: 800,
    triangles: 2e6,
    programs: 56,
    gpuMB: 256,
    bufferMP: 3.2,
    cpuP95: 12,
    readyMs: 10000,
  },
  'phone-mid': {
    ...COMMON,
    calls: 600,
    triangles: 1.5e6,
    programs: 56,
    gpuMB: 256,
    bufferMP: 1.1,
    cpuP95: 16,
    readyMs: 12000,
  },
  'phone-low': {
    ...COMMON,
    calls: 450,
    triangles: 0.8e6,
    programs: 48,
    gpuMB: 128,
    bufferMP: 0.3,
    cpuP95: 16,
    readyMs: 12000,
  },
};

const results = {};
let failures = 0;
let browser = null;

for (const name of NAMES) {
  const profile = PROFILES[name];
  if (!profile) throw new Error('unknown profile ' + name);
  console.log(
    `\n=== ${name}: ${profile.width}x${profile.height} @${profile.dpr}x, q=${profile.q}, CPU ×${profile.cpu}`,
  );
  browser = await launch(); // a fresh browser: a cold shader cache for the load phases
  results[name] = await benchProfile(profile);
  await browser.close();
  failures += report(name, profile, results[name]);
}
if (JSON_OUT) writeFileSync(JSON_OUT, JSON.stringify(results, null, 1));
console.log(failures ? `\n${failures} budget check(s) failed` : '\nall budgets met');
process.exit(failures ? 1 : 0);

async function newPage(profile) {
  const context = await browser.newContext({
    viewport: { width: profile.width, height: profile.height },
    deviceScaleFactor: profile.dpr,
    isMobile: !!profile.mobile,
    hasTouch: !!profile.mobile,
  });
  await context.addInitScript(installProbe, { noDraw: !DRAW });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  if (profile.cpu > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: profile.cpu });
  const messages = [];
  page.on('pageerror', (e) => messages.push('pageerror ' + e));
  page.on('console', (m) => {
    if ((m.type() === 'error' || m.type() === 'warning') && !/READPIXELS|GPU stall/.test(m.text()))
      messages.push(m.type() + ' ' + m.text());
  });
  const responses = [];
  page.on('response', (response) => responses.push(response));
  return { context, page, cdp, messages, responses };
}

/** Bytes of the responses so far, by kind: { kind: [raw, gzip] } and the totals. */
async function bytesOf(responses) {
  const kinds = {};
  const top = [];
  let raw = 0;
  let gzip = 0;
  for (const response of responses) {
    let body;
    try {
      body = await response.body();
    } catch {
      continue;
    }
    const url = response.url();
    const kind = /\.js(\?|$)/.test(url)
      ? 'js'
      : /\.css(\?|$)|fonts\.googleapis/.test(url)
        ? 'css'
        : /\.woff2?(\?|$)|fonts\.gstatic/.test(url)
          ? 'fonts'
          : /\.(webp|png|jpe?g|svg|avif)(\?|$)/.test(url)
            ? 'images'
            : /models\//.test(url)
              ? 'models'
              : /\.json(\?|$)/.test(url)
                ? 'data'
                : /\.html?(\?|$)|\/$/.test(url)
                  ? 'html'
                  : 'other';
    const compressible = !/\.(webp|png|jpe?g|avif|woff2?)(\?|$)/.test(url);
    const zipped = compressible ? gzipSync(body, { level: 9 }).length : body.length;
    const entry = (kinds[kind] = kinds[kind] || [0, 0]);
    entry[0] += body.length;
    entry[1] += zipped;
    raw += body.length;
    gzip += zipped;
    top.push([zipped, url.replace(/^https?:\/\/[^/]+\//, '')]);
  }
  top.sort((x, y) => y[0] - x[0]);
  return { kinds, raw, gzip, requests: responses.length, top: top.slice(0, 8) };
}

async function benchProfile(profile) {
  const out = { profile };

  // --- stills path: bytes only ---------------------------------------------------------------
  {
    const { context, page, responses, messages } = await newPage(profile);
    await page.goto(BASE + 'index.html?3d=off', { waitUntil: 'networkidle' });
    out.stillsBytes = await bytesOf(responses);
    out.stillsMessages = messages;
    await context.close();
  }

  // --- 3D path ---------------------------------------------------------------------------------
  const { context, page, cdp, messages, responses } = await newPage(profile);
  const started = Date.now();
  await page.goto(`${BASE}index.html?capture=1&3d=force&q=${profile.q}`, { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.__cap === 'function', null, { timeout: 600000 });
  out.wallReadyMs = Date.now() - started;
  await page.waitForTimeout(300);
  out.bytes = await bytesOf(responses);
  out.load = await page.evaluate(() => {
    const phases = {};
    for (const entry of performance.getEntriesByType('mark'))
      if (entry.name.startsWith('ce:')) phases[entry.name.slice(3)] = Math.round(entry.startTime);
    return phases;
  });

  // CPU time per frame: an untimed warm-up sweep (JIT, LOD sets, lazily created state), which also
  // records where programs are compiled after warmup(), then the timed sweep
  const sweep = await page.evaluate(
    ({ frames }) => {
      const j = window.__journey;
      const r = j.renderer;
      const options = { dt: 1 / 60 };
      const late = [];
      let programs = r.info.programs.length;
      j.renderAt(0);
      for (let i = 0; i < frames; i++) {
        j.renderAt(i / (frames - 1), options);
        if (r.info.programs.length !== programs) {
          late.push([+(i / (frames - 1)).toFixed(3), r.info.programs.length - programs]);
          programs = r.info.programs.length;
        }
      }
      // back again, so every position has been seen from both directions before timing
      for (let i = frames - 1; i >= 0; i--) j.renderAt(i / (frames - 1), options);
      const times = new Float64Array(frames);
      j.renderAt(0);
      for (let i = 0; i < frames; i++) {
        const a = performance.now();
        j.renderAt(i / (frames - 1), options);
        times[i] = performance.now() - a;
      }
      return { late, programs, times: Array.from(times) };
    },
    { frames: FRAMES },
  );
  out.lateCompiles = sweep.late;
  out.programs = sweep.programs;
  out.cpu = STAGE_RANGES.map(([name, from, to]) => {
    const picked = sweep.times.filter((_, i) => {
      const t = i / (FRAMES - 1);
      return t >= from && t < to;
    });
    picked.sort((a, b) => a - b);
    return {
      name,
      frames: picked.length,
      p50: percentile(picked, 0.5),
      p95: percentile(picked, 0.95),
      max: picked.at(-1),
    };
  });
  const all = [...sweep.times].sort((a, b) => a - b);
  out.cpuAll = { p50: percentile(all, 0.5), p95: percentile(all, 0.95), max: all.at(-1) };

  // static facts, then draw calls and triangles per moment (after the sweeps: the late compiles are
  // counted on a journey that only warmup() has seen)
  out.gpu = await page.evaluate((moments) => {
    const j = window.__journey;
    const r = j.renderer;
    const gl = r.getContext();
    const sun = j.scene.children.find((node) => node.isDirectionalLight);
    const facts = {
      programsAfterWarmup: r.info.programs.length,
      geometries: r.info.memory.geometries,
      textures: r.info.memory.textures,
      shadowMap: r.shadowMap.enabled && sun && sun.castShadow ? sun.shadow.mapSize.x : 0,
      antialias: !!gl.getContextAttributes().antialias,
      canvasSamples: gl.getContextAttributes().antialias
        ? (window.__probe.contexts.find((entry) => entry.ctx === gl)?.samples ?? '?')
        : 0,
      pixelRatio: j.basePixelRatio,
      maxTextureSize: r.capabilities.maxTextureSize,
    };
    // count every pass of a frame: three.js resets renderer.info at the start of each render() call
    r.info.autoReset = false;
    const shadowMap = r.shadowMap;
    const renderShadows = shadowMap.render;
    let shadowCalls = 0;
    let shadowTriangles = 0;
    shadowMap.render = function (...args) {
      const calls = r.info.render.calls;
      const triangles = r.info.render.triangles;
      const result = renderShadows.apply(this, args);
      shadowCalls += r.info.render.calls - calls;
      shadowTriangles += r.info.render.triangles - triangles;
      return result;
    };
    facts.moments = moments.map(([name, t]) => {
      j.renderAt(t - 0.002);
      r.info.reset();
      shadowCalls = shadowTriangles = 0;
      j.renderAt(t, { dt: 1 / 60 });
      return {
        name,
        t,
        calls: r.info.render.calls,
        triangles: r.info.render.triangles,
        shadowCalls,
        shadowTriangles,
      };
    });
    shadowMap.render = renderShadows;
    r.info.autoReset = true;
    facts.drawingBuffer = [gl.drawingBufferWidth, gl.drawingBufferHeight];
    facts.probe = window.__probe.summary({ largest: 10 });
    return facts;
  }, MOMENTS);

  // allocations and retained heap over the same sweep
  await cdp.send('HeapProfiler.enable');
  const heap = async () => {
    await cdp.send('HeapProfiler.collectGarbage');
    await cdp.send('HeapProfiler.collectGarbage');
    return (await cdp.send('Runtime.getHeapUsage')).usedSize;
  };
  await page.evaluate(() => window.__journey.renderAt(0));
  const heapBefore = await heap();
  await cdp.send('HeapProfiler.startSampling', {
    samplingInterval: 512,
    includeObjectsCollectedByMajorGC: true,
    includeObjectsCollectedByMinorGC: true,
  });
  await page.evaluate(
    ({ frames }) => {
      const j = window.__journey;
      const options = { dt: 1 / 60 };
      for (let i = 0; i < frames; i++) j.renderAt(i / (frames - 1), options);
    },
    { frames: FRAMES },
  );
  const { profile: sampled } = await cdp.send('HeapProfiler.stopSampling');
  const heapAfter = await heap();
  let allocated = 0;
  const walk = (node) => {
    allocated += node.selfSize;
    node.children.forEach(walk);
  };
  walk(sampled.head);
  out.allocKBPerFrame = allocated / FRAMES / 1024;
  out.heap = { before: heapBefore, after: heapAfter, retained: heapAfter - heapBefore };
  out.contexts = await page.evaluate(() => window.__probe.summary());
  out.messages = messages;
  await context.close();
  return out;
}

function report(name, profile, r) {
  const budget = BUDGETS[name];
  let failed = 0;
  const check = (label, value, limit, unit = '', ok = value <= limit) => {
    if (!ok) failed++;
    console.log(
      `  ${ok ? 'ok  ' : 'FAIL'} ${label.padEnd(34)} ${String(value).padStart(10)}${unit}  (budget ≤ ${limit}${unit})`,
    );
  };
  const g = r.gpu;
  console.log(
    `  drawing buffer ${g.drawingBuffer.join('x')} (${((g.drawingBuffer[0] * g.drawingBuffer[1]) / 1e6).toFixed(2)} MP, ` +
      `ratio ${g.pixelRatio}, antialias ${g.antialias}), shadow map ${g.shadowMap || 'none'}${g.shadowMap ? '²' : ''}`,
  );
  console.log('  moment         calls  (shadow)  triangles  (shadow)');
  for (const m of g.moments)
    console.log(
      `  ${m.name.padEnd(12)} ${String(m.calls).padStart(7)} ${String(m.shadowCalls).padStart(9)} ` +
        `${String(m.triangles).padStart(10)} ${String(m.shadowTriangles).padStart(9)}`,
    );
  console.log('  CPU ms/frame   frames    p50    p95    max');
  for (const s of r.cpu)
    console.log(
      `  ${s.name.padEnd(12)} ${String(s.frames).padStart(8)} ${s.p50.toFixed(2).padStart(6)} ${s.p95.toFixed(2).padStart(6)} ${s.max.toFixed(2).padStart(6)}`,
    );
  const p = g.probe;
  const gpuBytes = p.textureBytes + p.renderbufferBytes + p.canvasBytes;
  console.log(
    `  programs ${r.programs} · geometries ${g.geometries} · textures ${g.textures} (${p.textures} GL) · ` +
      `GPU memory ${mb(gpuBytes)}: textures ${mb(p.textureBytes)} + render buffers ` +
      `${mb(p.renderbufferBytes)} + canvas ${mb(p.canvasBytes)} (estimate, ${g.canvasSamples}× MSAA)`,
  );
  const bytes = (b) =>
    Object.entries(b.kinds)
      .map(([k, [raw, gz]]) => `${k} ${kb(gz)}${raw !== gz ? ` (${kb(raw)} raw)` : ''}`)
      .join(' · ');
  console.log(
    `  load 3D: ${kb(r.bytes.gzip)} gzip / ${kb(r.bytes.raw)} raw, ${r.bytes.requests} requests: ${bytes(r.bytes)}`,
  );
  for (const [bytes, desc] of p.largest) console.log(`    ${mb(bytes).padStart(9)}  ${desc}`);
  console.log('  largest downloads (gzip): ' + r.bytes.top.map(([b, u]) => `${u} ${kb(b)}`).join(' · '));
  console.log(`  load stills: ${kb(r.stillsBytes.gzip)} gzip: ${bytes(r.stillsBytes)}`);
  console.log(
    '  load phases (ms): ' +
      Object.entries(r.load)
        .map(([k, v]) => `${k} ${v}`)
        .join(' · ') +
      ` (wall ${r.wallReadyMs})`,
  );
  console.log(
    `  heap ${mb(r.heap.before)} → ${mb(r.heap.after)} after ${FRAMES} frames; allocation ${r.allocKBPerFrame.toFixed(1)} KB/frame`,
  );
  console.log(`  WebGL contexts: created ${r.contexts.contextsCreated}, live ${r.contexts.contextsLive}`);
  const maxCalls = Math.max(...g.moments.map((m) => m.calls));
  const maxTris = Math.max(...g.moments.map((m) => m.triangles));
  check('draw calls per frame (max)', maxCalls, budget.calls);
  check('triangles per frame (max)', maxTris, budget.triangles);
  check('shader programs', r.programs, budget.programs);
  check(
    'programs compiled after warmup',
    r.lateCompiles.reduce((s, [, n]) => s + n, 0),
    budget.lateCompiles,
  );
  check('GPU memory, canvas included', +(gpuBytes / 1048576).toFixed(1), budget.gpuMB, ' MB');
  check(
    'drawing buffer',
    +((g.drawingBuffer[0] * g.drawingBuffer[1]) / 1e6).toFixed(2),
    budget.bufferMP,
    ' MP',
  );
  check('JS CPU per frame p95', +r.cpuAll.p95.toFixed(2), budget.cpuP95, ' ms');
  check('allocation per frame', +r.allocKBPerFrame.toFixed(1), budget.allocKB, ' KB');
  check('JS heap retained after sweep', +(r.heap.retained / 1024).toFixed(0), budget.retainedKB, ' KB');
  check('scene ready (warm) since navigation', r.load.warm ?? Infinity, budget.readyMs, ' ms');
  check('first load, 3D path (gzip)', +(r.bytes.gzip / 1024).toFixed(0), budget.load3dKB, ' KB');
  check(
    'first load, stills path (gzip)',
    +(r.stillsBytes.gzip / 1024).toFixed(0),
    budget.loadStillsKB,
    ' KB',
  );
  check('live WebGL contexts', r.contexts.contextsLive, 1);
  check(
    'page errors / console warnings',
    r.messages.length + r.stillsMessages.length,
    0,
    '',
    !(r.messages.length + r.stillsMessages.length),
  );
  if (r.lateCompiles.length) console.log('  late compiles at t =', JSON.stringify(r.lateCompiles));
  for (const m of [...r.messages, ...r.stillsMessages]) console.log('  message: ' + m);
  return failed;
}
