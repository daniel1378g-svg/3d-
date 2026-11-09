// In-page benchmark for real devices: ?bench=1 on the home page (with or without ?3d=force&q=…).
// src/home.js imports this module (its own chunk, never fetched otherwise) once the 3D scene is
// ready. It plays a fixed scripted scroll through the five stages (SCRIPT, about 33 s) at the
// device's real frame rate, through the live page path: the page scrolls, src/home.js reads the
// scroll position, the scene's spring follows it and the adaptive resolution reacts. It then shows:
//   frame time    p50 / p95 / p99 / worst of the rAF intervals, overall and per stage, and dropped
//                 frames (intervals longer than 1.5 refresh periods, counted in whole periods; the
//                 refresh period is the 10th percentile interval, i.e. what the display delivers)
//   quality       the tier src/home.js picked, devicePixelRatio, the pixel ratio used, the
//                 resolution scale (start, lowest, end and number of steps) and the drawing buffer
//   GPU work      draw calls and triangles per frame, shadow pass included, programs, textures
//   load          the load phases from the performance marks (ms since navigation start)
// The results also go to window.__benchResult and a text box (Copy) for reporting.
// The frame callback writes into preallocated typed arrays: the measurement allocates nothing.

/** Scripted progress: [seconds, progress] keys, eased between; holds where a key repeats. */
const SCRIPT = [
  [0, 0],
  [2, 0],
  [6, 0.205],
  [8, 0.205],
  [13, 0.43], // through the aerial
  [15, 0.43],
  [20, 0.67],
  [22, 0.67],
  [27, 0.89],
  [29, 0.89],
  [33, 1],
];
const STAGES = [
  ['arrival', 0, 0.2],
  ['pit lane', 0.2, 0.33],
  ['aerial', 0.33, 0.425],
  ['on track', 0.425, 0.665],
  ['paddock', 0.665, 0.885],
  ['golden hour', 0.885, 1.01],
];
const MAX_FRAMES = 33 * 240 + 600;

const ease = (x) => x * x * (3 - 2 * x);

function scriptProgress(seconds) {
  if (seconds <= SCRIPT[0][0]) return SCRIPT[0][1];
  for (let i = 1; i < SCRIPT.length; i++) {
    const [t1, p1] = SCRIPT[i];
    if (seconds <= t1) {
      const [t0, p0] = SCRIPT[i - 1];
      return p0 + (p1 - p0) * ease((seconds - t0) / (t1 - t0));
    }
  }
  return SCRIPT[SCRIPT.length - 1][1];
}

function stats(values, count) {
  const sorted = Float64Array.from(values.subarray(0, count)).sort();
  const at = (p) => (count ? sorted[Math.min(count - 1, Math.floor(p * count))] : NaN);
  let sum = 0;
  for (let i = 0; i < count; i++) sum += sorted[i];
  return { n: count, mean: sum / count, p50: at(0.5), p95: at(0.95), p99: at(0.99), max: sorted[count - 1] };
}

function loadPhases() {
  const phases = {};
  for (const entry of performance.getEntriesByType('mark'))
    if (entry.name.startsWith('ce:')) phases[entry.name.slice(3)] = Math.round(entry.startTime);
  return phases;
}

function gpuName(renderer) {
  try {
    const gl = renderer.getContext();
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    return String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
  } catch {
    return '?';
  }
}

function createOverlay() {
  const box = document.createElement('section');
  box.setAttribute('aria-label', 'Benchmark');
  box.style.cssText =
    'position:fixed;z-index:9999;left:8px;top:8px;max-width:min(94vw,460px);max-height:calc(100vh - 16px);' +
    'overflow:auto;padding:10px;border-radius:8px;background:rgba(16,18,21,.92);color:#fff;' +
    // the 50-column stage table fits a 360 px phone: 10 px type there, 12 px from 430 px up
    'font:clamp(10px,2.8vw,12px)/1.45 "IBM Plex Mono",ui-monospace,monospace;' +
    'box-shadow:0 4px 24px rgba(0,0,0,.4)';
  box.innerHTML =
    '<p data-b="status" aria-live="polite" style="margin:0 0 6px">Bench: preparing…</p>' +
    '<pre data-b="out" style="margin:0;white-space:pre-wrap"></pre>' +
    '<p style="margin:8px 0 0;display:flex;gap:8px">' +
    '<button type="button" data-b="run" disabled>Run again</button>' +
    '<button type="button" data-b="copy" disabled>Copy results</button>' +
    '<button type="button" data-b="close">Close</button></p>' +
    '<textarea data-b="json" readonly hidden rows="6" style="width:100%;margin-top:8px;font:inherit"></textarea>';
  document.body.appendChild(box);
  for (const button of box.querySelectorAll('button'))
    button.style.cssText =
      'font:inherit;color:#fff;background:#33373c;border:1px solid #5f676d;border-radius:6px;padding:6px 10px;cursor:pointer';
  const part = (name) => box.querySelector(`[data-b="${name}"]`);
  part('close').addEventListener('click', () => box.remove());
  return { box, part };
}

function runBench({ scene, quality, journey, scrollRange }) {
  const renderer = scene.renderer;
  const info = renderer.info;
  const { part } = createOverlay();
  const intervals = new Float32Array(MAX_FRAMES);
  const progressAt = new Float32Array(MAX_FRAMES);
  const calls = new Float32Array(MAX_FRAMES);
  const triangles = new Float32Array(MAX_FRAMES);
  let frames = 0;
  let running = false;

  function run() {
    if (running) return;
    running = true;
    frames = 0;
    part('run').disabled = true;
    part('copy').disabled = true;
    part('status').textContent = 'Bench: running the scripted scroll (33 s)… keep the tab in front.';
    const top = journey.getBoundingClientRect().top + scrollY;
    const autoReset = info.autoReset;
    info.autoReset = false; // count every pass of a frame (shadow map, scene, blur) between callbacks
    info.reset();
    const startScale = scene.resScale;
    let minScale = startScale;
    let scaleSteps = 0;
    let lastScale = startScale;
    let start = -1;
    let last = 0;
    const scrollOptions = { top: 0, behavior: 'instant' };

    function tick(now) {
      if (start < 0) {
        start = last = now;
        info.reset();
      } else if (frames < MAX_FRAMES) {
        intervals[frames] = now - last;
        progressAt[frames] = scene.progress;
        calls[frames] = info.render.calls;
        triangles[frames] = info.render.triangles;
        frames++;
        last = now;
        info.reset();
      }
      const scale = scene.resScale;
      if (scale !== lastScale) {
        scaleSteps++;
        lastScale = scale;
        if (scale < minScale) minScale = scale;
      }
      const seconds = (now - start) / 1e3;
      scrollOptions.top = Math.round(top + scriptProgress(seconds) * scrollRange());
      window.scrollTo(scrollOptions);
      if (seconds < SCRIPT[SCRIPT.length - 1][0] + 0.5) requestAnimationFrame(tick);
      else finish();
    }

    function finish() {
      info.autoReset = autoReset;
      running = false;
      const all = stats(intervals, frames);
      // refresh period: what the display delivers when the page keeps up (10th percentile)
      const period =
        Float64Array.from(intervals.subarray(0, frames)).sort()[Math.floor(frames * 0.1)] || 16.7;
      let dropped = 0;
      for (let i = 0; i < frames; i++)
        if (intervals[i] > period * 1.5) dropped += Math.round(intervals[i] / period) - 1;
      const perStage = STAGES.map(([name, from, to]) => {
        const picked = new Float32Array(frames);
        let n = 0;
        let sumCalls = 0;
        let sumTris = 0;
        for (let i = 0; i < frames; i++)
          if (progressAt[i] >= from && progressAt[i] < to) {
            picked[n++] = intervals[i];
            sumCalls += calls[i];
            sumTris += triangles[i];
          }
        const s = stats(picked, n);
        return {
          stage: name,
          frames: n,
          p50: s.p50,
          p95: s.p95,
          p99: s.p99,
          calls: sumCalls / n,
          triangles: sumTris / n,
        };
      });
      const result = {
        when: new Date().toISOString(),
        userAgent: navigator.userAgent,
        gpu: gpuName(renderer),
        cores: navigator.hardwareConcurrency || null,
        memoryGB: navigator.deviceMemory || null,
        screen: `${screen.width}x${screen.height}`,
        viewport: `${innerWidth}x${innerHeight}`,
        quality,
        devicePixelRatio: window.devicePixelRatio,
        pixelRatio: scene.basePixelRatio,
        resScale: { start: startScale, min: minScale, end: scene.resScale, steps: scaleSteps },
        drawingBuffer: `${renderer.domElement.width}x${renderer.domElement.height}`,
        refreshMs: period,
        frames,
        frameMs: { p50: all.p50, p95: all.p95, p99: all.p99, max: all.max, mean: all.mean },
        fps: 1000 / all.mean,
        droppedFrames: dropped,
        perStage,
        programs: info.programs ? info.programs.length : null,
        memory: { geometries: info.memory.geometries, textures: info.memory.textures },
        load: loadPhases(),
      };
      window.__benchResult = result;
      const f = (v) => (Number.isFinite(v) ? v.toFixed(1) : '–');
      const lines = [
        `${result.gpu}`,
        `tier ${quality} · dpr ${result.devicePixelRatio} → ratio ${f(result.pixelRatio)} · buffer ${result.drawingBuffer}`,
        `res scale ${startScale.toFixed(2)} → min ${minScale.toFixed(2)} → end ${scene.resScale.toFixed(2)} (${scaleSteps} steps)`,
        `${frames} frames · ${f(result.fps)} fps · refresh ${f(period)} ms · dropped ${dropped}`,
        `frame ms p50 ${f(all.p50)} p95 ${f(all.p95)} p99 ${f(all.p99)} max ${f(all.max)}`,
        '',
        'stage         n    p50   p95   p99  calls  tris(k)',
        ...perStage.map(
          (s) =>
            `${s.stage.padEnd(12)} ${String(s.frames).padStart(4)} ${f(s.p50).padStart(5)} ${f(s.p95).padStart(5)} ` +
            `${f(s.p99).padStart(5)} ${String(Math.round(s.calls) || 0).padStart(6)} ${String(Math.round(s.triangles / 1e3) || 0).padStart(7)}`,
        ),
        '',
        `programs ${result.programs} · geometries ${result.memory.geometries} · textures ${result.memory.textures}`,
        'load (ms) ' +
          Object.entries(result.load)
            .map(([k, v]) => `${k} ${v}`)
            .join(' · '),
      ];
      part('out').textContent = lines.join('\n');
      part('status').textContent = 'Bench: done.';
      const json = part('json');
      json.value = JSON.stringify(result, null, 1);
      json.hidden = false;
      part('run').disabled = false;
      part('copy').disabled = false;
    }

    requestAnimationFrame(tick);
  }

  part('run').addEventListener('click', run);
  part('copy').addEventListener('click', () => {
    const json = part('json');
    json.select();
    if (navigator.clipboard) navigator.clipboard.writeText(json.value).catch(() => {});
  });
  // let the first frames and the canvas fade-in settle, then start
  setTimeout(run, 1500);
}

export { runBench };
