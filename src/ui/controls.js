import { tr } from './lang.js';
import { getState } from '../state.js';

// Pointer, touch and keyboard control of the chandelier, plus the dock and globe card.
export function initControls(stage, { isInteractive, announce, onFirstUse }) {
  const canvas = stage.canvas;
  const stageEl = document.getElementById('stage');
  const dock = document.getElementById('dock');
  const lightBtn = document.getElementById('light-switch');
  const lightState = document.getElementById('light-state');
  const dimmer = document.getElementById('dimmer');
  const globeBtns = document.getElementById('globe-btns');
  const card = document.getElementById('globe-card');
  const cardTitle = document.getElementById('globe-card-title');
  const cardPalette = document.getElementById('globe-card-palette');
  const hint = document.getElementById('drag-hint');
  let used = false;

  const markUsed = () => {
    if (used) return;
    used = true;
    hint.classList.add('is-gone');
    setTimeout(() => { hint.hidden = true; }, 700);
    onFirstUse?.();
  };

  // ── pointer: drag to rotate, pinch to zoom, tap a globe to inspect it
  const pointers = new Map();
  let down = null;
  let pinchDist = 0;
  canvas.addEventListener('pointerdown', (e) => {
    if (!isInteractive()) return;
    stage.markInput();
    canvas.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY, t: e.timeStamp });
    if (pointers.size === 1) {
      down = { x: e.clientX, y: e.clientY, t: e.timeStamp, moved: 0 };
    } else if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinchDist = Math.hypot(a.x - b.x, a.y - b.y);
      down = null;
    }
  });
  canvas.addEventListener('pointermove', (e) => {
    const p = pointers.get(e.pointerId);
    if (!p) {
      if (e.pointerType === 'mouse' && isInteractive()) queueHover(e.clientX, e.clientY);
      return;
    }
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    const dt = Math.max(1, e.timeStamp - p.t);
    p.x = e.clientX; p.y = e.clientY; p.t = e.timeStamp;
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinchDist > 0) stage.zoomBy(pinchDist / d);
      pinchDist = d;
      markUsed();
      return;
    }
    if (!down) return;
    down.moved += Math.abs(dx) + Math.abs(dy);
    if (down.moved > 4) {
      stage.dragging = true;
      stageEl.classList.add('is-dragging');
      stage.dragBy(dx, e.pointerType === 'touch' ? 0 : dy, dt);
      markUsed();
    }
  });
  const end = (e) => {
    if (!pointers.has(e.pointerId)) return;
    pointers.delete(e.pointerId);
    if (pointers.size === 0) {
      const wasClick = down && down.moved <= 6 && e.timeStamp - down.t < 600 && e.type === 'pointerup';
      stage.dragging = false;
      stageEl.classList.remove('is-dragging');
      if (wasClick) {
        const hit = stage.pick(e.clientX, e.clientY);
        const i = hit ? stage.chandelier.globes.findIndex((g) => g.glass === hit) : -1;
        if (i >= 0) { focusGlobe(i); markUsed(); }
        else if (stage.focus.target > 0.5) blurGlobe();
      }
      down = null;
    }
    pinchDist = 0;
  };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);
  canvas.addEventListener('pointerleave', () => { stage.hover = null; stageEl.classList.remove('is-hovering'); });

  let hoverQueued = null;
  function queueHover(x, y) {
    if (hoverQueued) { hoverQueued.x = x; hoverQueued.y = y; return; }
    hoverQueued = { x, y };
    requestAnimationFrame(() => {
      const hit = stage.pick(hoverQueued.x, hoverQueued.y);
      stage.hover = hit;
      stageEl.classList.toggle('is-hovering', !!hit);
      hoverQueued = null;
    });
  }

  // trackpad pinch arrives as ctrl + wheel; plain wheel keeps scrolling the page
  canvas.addEventListener('wheel', (e) => {
    if (!e.ctrlKey || !isInteractive()) return;
    e.preventDefault();
    stage.zoomBy(Math.exp(e.deltaY * 0.01));
    markUsed();
  }, { passive: false });

  // ── keyboard on the focused canvas
  canvas.addEventListener('keydown', (e) => {
    if (!isInteractive()) return;
    const k = e.key;
    let handled = true;
    if (k === 'ArrowLeft') stage.nudge(-0.35);
    else if (k === 'ArrowRight') stage.nudge(0.35);
    else if (k === 'ArrowUp') stage.nudge(0, 0.08);
    else if (k === 'ArrowDown') stage.nudge(0, -0.08);
    else if (k === '+' || k === '=') stage.zoomBy(0.88);
    else if (k === '-' || k === '_') stage.zoomBy(1.14);
    else if (k === 'l' || k === 'L') setLight(!stage.light.on);
    else if (k === '0') { stage.resetView(); blurGlobe(); }
    else if (k === 'Escape') blurGlobe();
    else if (/^[1-7]$/.test(k)) focusGlobe(Number(k) - 1);
    else handled = false;
    if (handled) { e.preventDefault(); markUsed(); }
  });

  // ── dock
  function setLight(on) {
    stage.setLight(on);
    lightBtn.setAttribute('aria-checked', on ? 'true' : 'false');
    lightState.dataset.i18n = on ? 'ctrl.on' : 'ctrl.off';
    lightState.textContent = tr(lightState.dataset.i18n);
    announce(`${tr('ctrl.light')}: ${tr(on ? 'ctrl.on' : 'ctrl.off')}`);
  }
  lightBtn.addEventListener('click', () => setLight(!stage.light.on));
  const syncFill = () => dimmer.style.setProperty('--fill', `${((dimmer.value - dimmer.min) / (dimmer.max - dimmer.min)) * 100}%`);
  dimmer.addEventListener('input', () => {
    stage.setDimmer(dimmer.value / 100);
    if (!stage.light.on) setLight(true);
    syncFill();
  });
  syncFill();
  document.getElementById('zoom-in').addEventListener('click', () => stage.zoomBy(0.85));
  document.getElementById('zoom-out').addEventListener('click', () => stage.zoomBy(1.18));
  document.getElementById('reset-view').addEventListener('click', () => { stage.resetView(); blurGlobe(); });
  const motionBtn = document.getElementById('motion-btn');
  motionBtn.addEventListener('click', () => {
    stage.motionPaused = !stage.motionPaused;
    motionBtn.setAttribute('aria-pressed', String(stage.motionPaused));
    document.body.classList.toggle('motion-paused', stage.motionPaused);
  });

  function renderGlobeButtons(n) {
    globeBtns.innerHTML = '';
    for (let i = 0; i < n; i++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = String(i + 1);
      b.setAttribute('aria-pressed', 'false');
      b.setAttribute('aria-label', tr('ctrl.globe', { n: i + 1 }));
      b.addEventListener('click', () => (stage.focus.index === i && stage.focus.target > 0.5 ? blurGlobe() : focusGlobe(i)));
      globeBtns.append(b);
    }
    if (stage.focus.target > 0.5) blurGlobe();
  }
  stage.onGlobesChanged = renderGlobeButtons;
  renderGlobeButtons(stage.chandelier.globes.length || 0);

  function syncCard() {
    const n = stage.focus.index + 1;
    const total = stage.chandelier.globes.length;
    cardTitle.textContent = tr('globe.title', { n, total });
    cardPalette.textContent = tr(`palette.${getState().config.palette}`);
  }

  function focusGlobe(i) {
    if (i < 0 || i >= stage.chandelier.globes.length) return;
    stage.markInput();
    stage.focusGlobe(i);
    card.hidden = false;
    document.body.classList.add('is-focus');
    syncCard();
    for (const [j, b] of [...globeBtns.children].entries()) b.setAttribute('aria-pressed', j === i ? 'true' : 'false');
    announce(tr('a11y.focused', { n: i + 1, total: stage.chandelier.globes.length }));
  }

  function blurGlobe() {
    if (card.hidden && stage.focus.target === 0) return;
    stage.exitFocus();
    card.hidden = true;
    document.body.classList.remove('is-focus');
    for (const b of globeBtns.children) b.setAttribute('aria-pressed', 'false');
  }
  document.getElementById('globe-back').addEventListener('click', () => { blurGlobe(); canvas.focus({ preventScroll: true }); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !card.hidden) blurGlobe();
  });

  return {
    showDock(show) {
      if (show) {
        dock.hidden = false;
        requestAnimationFrame(() => dock.classList.remove('is-away'));
      } else {
        dock.classList.add('is-away');
      }
    },
    showHint() {
      if (used) return;
      hint.hidden = false;
      hint.classList.remove('is-gone');
    },
    hideHint() { hint.classList.add('is-gone'); },
    blurGlobe,
    refresh() {
      renderGlobeButtons(stage.chandelier.globes.length);
      lightState.textContent = tr(lightState.dataset.i18n || 'ctrl.on');
      if (!card.hidden) syncCard();
    },
    setLight,
  };
}
