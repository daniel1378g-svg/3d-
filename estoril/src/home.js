// Home page controller: the five-stage scroll journey ([data-journey] in site/index.html and
// site/en/index.html) and the date-driven event blocks inside it.
//
// The journey section is a tall scroll track with a sticky stage. The scroll position inside the
// section maps to a journey progress from 0 to 1, which drives
//   - the five text panels ([data-panel]): each is fully visible inside its progress window and
//     fades and slides in before it / out after it,
//   - the stage buttons ([data-goto]), the progress bar ([data-bar]) and the .is-moving class,
//   - the 3D scene (src/journey, loaded on demand) or, without it, the still posters ([data-poster]).
// The upcoming-event blocks are handled by ./events.js, whether or not 3D runs.
//
// Query parameters: ?3d=force skips the device check (and ?q=low|mid|high then picks the quality),
// ?3d=off (or 0) shows the stills, ?capture=1 exposes window.__cap(t, dt) for deterministic stills,
// ?bench=1 loads src/bench.js (a separate chunk, never fetched otherwise) once the scene is ready: a
// scripted scroll through the five stages at the real frame rate, with frame-time statistics on screen.

import { initEvents } from './events.js';
import { framingAreas } from './framing.js';

const journey = document.querySelector('[data-journey]');
const html = document.documentElement;
/** prefers-reduced-motion (the inline script in <head> sets .rm). */
const reducedMotion = html.classList.contains('rm');

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

/** Progress windows [from, to] in which each panel is fully visible. */
const PANEL_WINDOWS = [
  [0, 0.085],
  [0.2, 0.315],
  [0.425, 0.56],
  [0.665, 0.79],
  [0.885, 1],
];
/** Progress over which a panel fades in before its window and out after it. */
const PANEL_FADE = 0.03;
/** The last stage: its panel never fades out (the section simply scrolls away). */
const LAST_STAGE = 4;
/** Progress a stage button scrolls to (the start of each panel window, or just inside it). */
const STAGE_TARGETS = [0, 0.205, 0.43, 0.67, 0.89];
/** Progress at which the current stage becomes the next one (midway between panel windows). */
const STAGE_BOUNDARIES = [0.1425, 0.37, 0.6125, 0.8375];

try {
  initEvents(document);
} catch (err) {
  console.warn('[events] could not update the event blocks', err);
}
if (journey) initJourney();

function initJourney() {
  html.classList.add('jr-live');
  const panels = [...journey.querySelectorAll('[data-panel]')];
  let posters = [...journey.querySelectorAll('[data-poster]')];
  const stageButtons = [...journey.querySelectorAll('[data-goto]')];
  const bar = journey.querySelector('[data-bar]');
  const loader = journey.querySelector('[data-loader]');
  const canvas = journey.querySelector('.jr__canvas');
  const narrow = matchMedia('(max-width: 960px)');
  const params = new URLSearchParams(location.search);

  let scene = null; // the 3D journey returned by createJourney()
  let sceneReady = false; // loaded and warmed up: the scene owns the progress, posters are retired
  let sceneRunning = false; // the scene's own render loop is started
  let inView = true; // the section is within 80px of the viewport
  let progress = 0; // displayed progress
  let laidOutAt = -1; // progress the panels were last laid out for
  let lastFrameTime = performance.now();
  let currentStage = -1;

  const scrollRange = () => Math.max(1, journey.offsetHeight - innerHeight);
  /** Progress from the scroll position alone. */
  const scrollProgress = () => clamp(-journey.getBoundingClientRect().top / scrollRange(), 0, 1);
  const stageAt = (p) => STAGE_BOUNDARIES.filter((boundary) => p >= boundary).length;

  // ---------------------------------------------------------------------------------------------
  // Stage navigation

  function goToStage(stage, smooth = !reducedMotion) {
    // 2px past the target (except stage 0) so rounding never lands just before the window
    const top =
      journey.getBoundingClientRect().top + scrollY + STAGE_TARGETS[stage] * scrollRange() + (stage ? 2 : 0);
    window.scrollTo({ top: Math.round(top), behavior: smooth ? 'smooth' : 'auto' });
  }

  stageButtons.forEach((button) => button.addEventListener('click', () => goToStage(+button.dataset.goto)));

  // Tabbing into a panel that is not the current stage jumps straight to it.
  panels.forEach((panel, stage) =>
    panel.addEventListener('focusin', () => {
      if (stageAt(scrollProgress()) !== stage) goToStage(stage, false);
    }),
  );

  // A panel that scrolls (bottom sheets, short screens) fades out at its bottom edge while more of it is
  // below (.is-more in site.css). Measured on scroll, resize and font load only, never per frame.
  const markMore = (panel) =>
    panel.classList.toggle('is-more', panel.scrollHeight - panel.clientHeight - panel.scrollTop > 2);
  const markAllMore = () => panels.forEach(markMore);
  panels.forEach((panel) => panel.addEventListener('scroll', () => markMore(panel), { passive: true }));
  addEventListener('resize', markAllMore);
  addEventListener('load', markAllMore);
  if (document.fonts) document.fonts.ready.then(markAllMore, () => {});
  markAllMore();

  // The ticker stops while a link in it has focus (site.css) and scrolls the focused link fully into view
  // (the browser leaves a partly visible one where it is); once focus leaves, it starts again from its
  // first item.
  const tickerBar = journey.querySelector('.jr__ticker');
  if (tickerBar) {
    tickerBar.addEventListener('focusin', (event) => {
      const bar = tickerBar.getBoundingClientRect(); // read after the focus: the ticker is stopped
      const link = event.target.getBoundingClientRect();
      if (link.left < bar.left) tickerBar.scrollLeft -= bar.left - link.left + 16;
      else if (link.right > bar.right) tickerBar.scrollLeft += link.right - bar.right + 16;
    });
    if (!reducedMotion)
      tickerBar.addEventListener('focusout', (event) => {
        if (!tickerBar.contains(event.relatedTarget)) tickerBar.scrollLeft = 0;
      });
  }

  // [ and ] step back and forward while the section covers the middle of the viewport.
  document.addEventListener('keydown', (event) => {
    if (event.target.closest && event.target.closest('input, textarea, select')) return;
    const rect = journey.getBoundingClientRect();
    if (rect.bottom < innerHeight * 0.5 || rect.top > innerHeight * 0.5) return;
    const stage = stageAt(scrollProgress());
    if (event.key === ']' && stage < LAST_STAGE) {
      event.preventDefault();
      goToStage(stage + 1);
    }
    if (event.key === '[' && stage > 0) {
      event.preventDefault();
      goToStage(stage - 1);
    }
  });

  // ---------------------------------------------------------------------------------------------
  // Panels, stage buttons, progress bar

  /** 1 inside the panel's window, falling to 0 over PANEL_FADE before and after it. */
  function panelOpacity(stage, p) {
    const [from, to] = PANEL_WINDOWS[stage];
    if (p < from) return clamp(1 - (from - p) / PANEL_FADE, 0, 1);
    if (p > to && stage < LAST_STAGE) return clamp(1 - (p - to) / PANEL_FADE, 0, 1);
    return 1;
  }

  /** 0 inside the window; up to 1 before it (still to come), down to -1 after it (left behind). */
  function panelOffset(stage, p) {
    const [from, to] = PANEL_WINDOWS[stage];
    if (p < from) return clamp((from - p) / PANEL_FADE, 0, 1);
    if (p > to && stage < LAST_STAGE) return -clamp((p - to) / PANEL_FADE, 0, 1);
    return 0;
  }

  function layout(p) {
    const isNarrow = narrow.matches;
    panels.forEach((panel, stage) => {
      const opacity = panelOpacity(stage, p);
      const offset = panelOffset(stage, p);
      const eased = offset * Math.abs(offset); // signed square: gentle near the window
      // narrow screens (≤960px) slide panels vertically (36px), wider ones sideways (6vw)
      const transform =
        reducedMotion || !offset
          ? 'none'
          : isNarrow
            ? `translate3d(0,${(eased * 36).toFixed(1)}px,0)`
            : `translate3d(${(eased * 6).toFixed(2)}vw,0,0)`;
      const key = opacity.toFixed(3) + transform;
      if (panel._layoutKey === key) return; // unchanged: skip the style writes
      panel._layoutKey = key;
      panel.style.opacity = opacity.toFixed(3);
      panel.style.transform = transform;
      panel.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
      panel.classList.toggle('is-on', opacity > 0.5);
      panel.classList.toggle('is-off', opacity < 0.002);
    });

    const stage = stageAt(p);
    if (stage !== currentStage) {
      currentStage = stage;
      stageButtons.forEach((button, i) => {
        button.classList.toggle('is-on', i === stage);
        if (i === stage) button.setAttribute('aria-current', 'step');
        else button.removeAttribute('aria-current');
      });
      if (!sceneReady) posters.forEach((poster, i) => poster.classList.toggle('is-on', i === stage));
    }
    if (bar) bar.style.transform = `scaleY(${p.toFixed(4)})`;
    journey.classList.toggle('is-moving', p > 0.012);
  }

  // ---------------------------------------------------------------------------------------------
  // Adaptive resolution, changed gradually: frame times are collected in batches of RES_BATCH
  // frames; a slow median (above RES_SLOW) lowers the render scale by one RES_STEP, a fast one
  // (below RES_FAST, two batches in a row) raises it by one step, and medians in between leave it
  // alone (hysteresis). After a change the next RES_HOLD ms are ignored. The scale never rises above
  // a ceiling that drops whenever a step up had to be undone within 3 s, so it does not oscillate.
  // The batch buffer is preallocated and sorted in place (no allocation per frame).

  const RES_BATCH = 30;
  const RES_STEP = 0.05;
  const RES_SLOW = 0.0215; // seconds
  const RES_FAST = 0.0165;
  const RES_HOLD = 700; // ms
  const frameTimes = new Float64Array(RES_BATCH);
  let frameCount = 0;
  let fastBatches = 0;
  let resScale = 1;
  let resCeiling = 1;
  let holdUntil = 0; // frames before this time are ignored (after a change, a resize or a start)
  let lastStepUp = -1e9;
  /** A scale on the grid of RES_STEP (k / 20), so steps never drift (1 − 0.05 − 0.05 is 0.8999…). */
  const STEPS_PER_UNIT = Math.round(1 / RES_STEP);
  const onStep = (scale) => Math.round(scale * STEPS_PER_UNIT) / STEPS_PER_UNIT;

  function governResolution(dt) {
    const now = performance.now();
    if (now < holdUntil) {
      frameCount = 0;
      return;
    }
    frameTimes[frameCount++] = dt;
    if (frameCount < RES_BATCH) return;
    frameCount = 0;
    frameTimes.sort();
    const median = frameTimes[RES_BATCH >> 1];
    const p25 = frameTimes[RES_BATCH >> 2];
    const p75 = frameTimes[(3 * RES_BATCH) >> 2];
    if (!scene || !scene.setResScale) return;
    // lowest scale: an effective pixel ratio of 0.75 (or no reduction when the base ratio is lower)
    const floor = Math.min(1, 0.75 / Math.max(0.75, scene.basePixelRatio || 1));
    // a steady cadence of 30–50 ms is a refresh rate capped at 20–33 Hz (a low-power mode), not an
    // overloaded GPU; slower than that is too slow whatever its rhythm
    if (median > 0.03 && median < 0.05 && p75 - p25 < 0.0015) return;
    fastBatches = median < RES_FAST ? fastBatches + 1 : 0;
    let next = resScale;
    if (median > RES_SLOW && resScale > floor) {
      next = Math.max(floor, onStep(resScale - RES_STEP));
      if (now - lastStepUp < 3e3) resCeiling = next;
    } else if (fastBatches >= 2 && resScale < resCeiling) {
      next = Math.min(resCeiling, onStep(resScale + RES_STEP));
      lastStepUp = now;
      fastBatches = 0;
    }
    if (next !== resScale) {
      resScale = next;
      scene.setResScale(resScale);
      holdUntil = now + RES_HOLD;
    }
  }

  // ---------------------------------------------------------------------------------------------
  // Frame loop: with the scene running, the scene eases its own progress towards the scroll
  // position; otherwise the progress eases here (instantly with reduced motion).

  let capturePaused = false; // ?capture=1: frames are rendered on demand by window.__cap

  function frame(time) {
    requestAnimationFrame(frame);
    if (capturePaused) return;
    const interval = (time - lastFrameTime) / 1e3;
    const dt = Math.min(0.1, interval);
    lastFrameTime = time;
    if (!inView) return;
    const target = scrollProgress();
    if (sceneReady && sceneRunning) {
      scene.setProgress(target);
      progress = scene.progress;
      // every frame counts, the slowest too (a device below 10 fps must still step down; one long
      // frame does not move a batch's median); a second or more is a pause, not a frame
      if (!document.hidden && interval < 1) governResolution(interval);
    } else {
      progress += (target - progress) * (reducedMotion ? 1 : 1 - Math.exp(-dt * 8));
    }
    if (Math.abs(progress - laidOutAt) > 1e-5) {
      laidOutAt = progress;
      layout(progress);
    }
  }

  progress = scrollProgress();
  layout(progress);
  laidOutAt = progress;
  requestAnimationFrame(frame);

  // ---------------------------------------------------------------------------------------------
  // Start the scene's render loop while the section is on screen and the tab is visible.

  function setRunning(run) {
    if (!sceneReady) return;
    if (run && !sceneRunning) {
      const target = scrollProgress();
      // scrolled far while stopped: cut to the position instead of flying there
      if (Math.abs(target - scene.progress) > 0.08) scene.jump(target);
      scene.start();
      sceneRunning = true;
      holdUntil = performance.now() + 1500;
    } else if (!run && sceneRunning) {
      scene.stop();
      sceneRunning = false;
    }
  }

  new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
      setRunning(inView && !document.hidden);
    },
    { rootMargin: '80px 0px' },
  ).observe(journey);
  document.addEventListener('visibilitychange', () => setRunning(inView && !document.hidden));

  /**
   * Tells the camera which part of the stage the page leaves free (camera-director.js), as
   * [left, top, right, bottom] fractions of the canvas: framing.js works the `open` and `panel`
   * areas out from the boxes the page actually lays out, measured here (the breakpoint only sets the
   * gaps). Car shots keep the car in `panel` while a panel is shown (the camera follows PANEL_WINDOWS
   * and PANEL_FADE, passed along) and in `open` otherwise; the aerial frames the circuit in `open`.
   * The stage controls and the panels are measured against the canvas (offset boxes are not moved by
   * the panels' slide transforms), the bars fixed at the top of the viewport (the preview strip, the
   * site header) by their layout boxes, which the header's hide transform does not move, against the
   * viewport, where the sticky stage stands whenever it is shown (also when the resize comes while
   * the page is scrolled past the journey). Runs on resize and once the web fonts have loaded.
   */
  function updateFraming() {
    if (!scene || !canvas) return;
    const box = canvas.getBoundingClientRect();
    const width = box.width;
    const height = box.height;
    if (!width || !height) return;
    const rectOf = (element) => {
      const rect = element && element.getBoundingClientRect();
      return rect && rect.width && rect.height
        ? [rect.left - box.left, rect.top - box.top, rect.right - box.left, rect.bottom - box.top]
        : null;
    };
    const barBottom = (element) =>
      element && element.offsetHeight && element.offsetTop < height * 0.4
        ? element.offsetTop + element.offsetHeight
        : 0;
    const ticker = journey.querySelector('.jr__ticker');
    // the page's gaps: 8 px up to 960 px wide, 24 px beside and 20 px above and below on desktop
    const compact = narrow.matches;
    const { panel, open } = framingAreas({
      width,
      height,
      gapX: compact ? 8 : 24,
      gapY: compact ? 8 : 20,
      strip: barBottom(document.querySelector('.preview-strip')),
      header: barBottom(document.querySelector('[data-hdr]')),
      bottom: ticker ? ticker.offsetTop : height,
      controls: [rectOf(journey.querySelector('.jr__nav')), rectOf(journey.querySelector('.jr__skip'))],
      panels: panels.map((el) => [
        el.offsetLeft,
        el.offsetTop,
        el.offsetLeft + el.offsetWidth,
        el.offsetTop + el.offsetHeight,
      ]),
    });
    const toFractions = (r) => [r[0] / width, r[1] / height, r[2] / width, r[3] / height];
    scene.setFraming(0, 0, {
      panel: toFractions(panel),
      open: toFractions(open),
      windows: PANEL_WINDOWS,
      fade: PANEL_FADE,
    });
  }

  addEventListener('resize', updateFraming);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => updateFraming());
  addEventListener('resize', () => {
    holdUntil = performance.now() + 800;
  });

  // ---------------------------------------------------------------------------------------------
  // Stills: without 3D the posters follow the stages. Only the first poster is in the HTML; the
  // other four come from data-posters. An optional note is shown in the loader for 6 s.

  function useStills(note) {
    journey.classList.add('no-3d');
    journey.classList.remove('is-3d');
    const holder = journey.querySelector('[data-posters]');
    if (holder && posters.length < 5) {
      let list = [];
      try {
        list = JSON.parse(holder.dataset.posters);
      } catch {
        list = [];
      }
      list.forEach(([landscape, portrait], i) => {
        const picture = document.createElement('picture');
        picture.innerHTML = `<source media="(max-aspect-ratio: 4/5)" srcset="${portrait}"><img class="jr__poster" data-poster="${i + 1}" src="${landscape}" alt="" width="1600" height="900" decoding="async">`;
        holder.appendChild(picture);
      });
      posters = [...journey.querySelectorAll('[data-poster]')];
    }
    currentStage = -1; // force the poster for the current stage on
    layout(progress);
    if (note && loader) {
      const text = loader.querySelector('.jr__load-t');
      if (text) text.textContent = note;
      loader.classList.add('is-note');
      setTimeout(() => loader.classList.remove('is-note'), 6e3);
    }
  }

  // ---------------------------------------------------------------------------------------------
  // Device check: 'low' | 'mid' | 'high', or null for stills.

  function detectQuality() {
    const mode = params.get('3d');
    if (
      mode === '0' ||
      mode === 'off' ||
      (mode !== 'force' && (reducedMotion || (navigator.connection && navigator.connection.saveData)))
    )
      return null;

    let gl = null;
    try {
      gl = document
        .createElement('canvas')
        .getContext('webgl2', { failIfMajorPerformanceCaveat: mode !== 'force' });
    } catch {
      gl = null;
    }
    if (!gl) return null;

    let software = false;
    try {
      const info = gl.getExtension('WEBGL_debug_renderer_info');
      if (info) {
        software = /swiftshader|llvmpipe|software|basic render/i.test(
          String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)),
        );
      }
      // release the probe context right away
      const lose = gl.getExtension('WEBGL_lose_context');
      if (lose) lose.loseContext();
    } catch {}

    if (mode === 'force') return params.get('q') || 'mid';
    if (software) return null;
    const coarsePointer = matchMedia('(pointer: coarse)').matches;
    const memory = navigator.deviceMemory || 8;
    const cores = navigator.hardwareConcurrency || 8;
    if (memory <= 2 || cores <= 2) return 'low';
    if (coarsePointer || memory <= 4 || cores <= 4 || Math.min(screen.width, screen.height) < 700)
      return 'mid';
    return 'high';
  }

  const no3dNote = () => (window.CE && window.CE.t && window.CE.t.no3d) || '';

  const quality = detectQuality();
  if (!quality) {
    // with reduced motion the stills are expected, so no note
    useStills(reducedMotion ? '' : no3dNote());
    return;
  }

  const onLoadProgress = (fraction) => {
    if (loader) loader.style.setProperty('--p', Math.round(fraction * 100) + '%');
  };

  canvas.addEventListener(
    'webglcontextlost',
    (event) => {
      event.preventDefault();
      setRunning(false);
      sceneReady = false;
      useStills();
    },
    { once: true },
  );

  // load phases as performance marks (src/journey/journey.js adds ce:data, ce:world, ce:car)
  const mark = (name) => performance.mark && performance.mark(name);

  (async () => {
    try {
      mark('ce:3d-start');
      // keep this specifier: esbuild names the chunk after it (chunks/journey-[hash].js)
      const { createJourney } = await import('./journey/journey.js');
      mark('ce:chunk');
      scene = await createJourney({
        canvas,
        quality,
        onProgress: onLoadProgress,
        trackUrl: journey.dataset.track,
        carUrl: journey.dataset.car,
        carMetaUrl: journey.dataset.carMeta,
      });
      mark('ce:created');
      try {
        await scene.warmup();
      } catch {}
      mark('ce:warm');
    } catch (err) {
      console.warn('[journey] 3D unavailable, using stills', err);
      useStills(no3dNote());
      return;
    }

    sceneReady = true;
    updateFraming();
    // the intro fly-in plays when the page opens at the arrival (jump keeps it there), not with
    // reduced motion
    scene.jump(scrollProgress());
    if (reducedMotion) scene.skipIntro();
    setRunning(inView && !document.hidden);

    if (params.get('capture') === '1') {
      // deterministic stills: stop the loops and render a given progress on request. Headless
      // browsers hide the scrollbar but html { scrollbar-gutter: stable } still reserved its 15 px,
      // so the canvas was 15 px narrower than the viewport and every capture had a light strip on the
      // right; captures drop the reserved gutter so the stage, and the canvas, span the viewport.
      setRunning(false);
      capturePaused = true;
      html.style.scrollbarGutter = 'auto';
      updateFraming();
      window.__journey = scene; // debugCam overrides for scripted captures (scripts/capture.mjs --cam)
      // renderAt: dt 0 renders a still; dt > 0 the next frame of a sequence (journey.js)
      window.__cap = (t, dt = 0) => {
        window.scrollTo(0, journey.getBoundingClientRect().top + scrollY + t * scrollRange());
        scene.renderAt(t, { dt });
        layout(t);
        return true;
      };
    }

    // fade the canvas in once a frame is on screen, then retire the posters behind it
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        mark('ce:shown');
        journey.classList.add('is-3d');
        setTimeout(() => posters.forEach((poster) => poster.classList.remove('is-on')), 1400);
      }),
    );

    if (params.get('bench') === '1' && params.get('capture') !== '1')
      import('./bench.js').then(
        ({ runBench }) => runBench({ scene, quality, journey, scrollRange }),
        (err) => console.warn('[bench] could not load', err),
      );
  })();
}
