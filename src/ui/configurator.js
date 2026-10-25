import { PALETTES, FINISHES, BASE_PRICE, priceOf } from '../config.js';
import { tr, formatCHF } from './lang.js';
import { getState, setConfig, configToHash } from '../state.js';

const FINISH_GRADIENT = {
  antique: 'radial-gradient(circle at 32% 28%, #f1d9a4, #a9844f 45%, #5b4320 100%)',
  polished: 'radial-gradient(circle at 32% 28%, #fff4cf, #e0b860 42%, #7d5a17 100%)',
  copper: 'radial-gradient(circle at 32% 28%, #f6c3a0, #b8683f 45%, #5a2c14 100%)',
  noir: 'radial-gradient(circle at 32% 28%, #8d7b6c, #3b3029 48%, #120e0b 100%)',
};

export function initConfigurator({ onRequest, announce }) {
  const pal = document.getElementById('opt-palette');
  const fin = document.getElementById('opt-finish');
  const glo = document.getElementById('opt-globes');
  const priceEl = document.getElementById('price');
  const nameEl = document.getElementById('summary-name');
  const share = document.getElementById('share-btn');
  let shown = priceOf(getState().config);

  function build() {
    const { config } = getState();
    pal.innerHTML = '';
    for (const [key, p] of Object.entries(PALETTES)) {
      const id = `pal-${key}`;
      const chip = `conic-gradient(${p.swatch.map((c, k) => `${c} ${k * 25}% ${(k + 1) * 25}%`).join(', ')})`;
      pal.insertAdjacentHTML('beforeend', `
        <input type="radio" name="palette" id="${id}" value="${key}" ${config.palette === key ? 'checked' : ''}>
        <label class="swatch" for="${id}"><span class="swatch-chip" style="background:${chip}"></span>${tr(`palette.${key}`)}</label>`);
    }
    fin.innerHTML = '';
    for (const key of Object.keys(FINISHES)) {
      const id = `fin-${key}`;
      fin.insertAdjacentHTML('beforeend', `
        <input type="radio" name="finish" id="${id}" value="${key}" ${config.finish === key ? 'checked' : ''}>
        <label class="swatch" for="${id}"><span class="swatch-chip" style="background:${FINISH_GRADIENT[key]}"></span>${tr(`finish.${key}`)}</label>`);
    }
    glo.innerHTML = '<span class="seg-pill" aria-hidden="true"></span>';
    for (const n of Object.keys(BASE_PRICE)) {
      const id = `glo-${n}`;
      glo.insertAdjacentHTML('beforeend', `
        <input type="radio" name="globes" id="${id}" value="${n}" ${String(config.globes) === n ? 'checked' : ''}>
        <label class="seg-item" for="${id}"><span class="seg-dots" aria-hidden="true">${'<i></i>'.repeat(Number(n))}</span>${tr('config.globesN', { n })}</label>`);
    }
    sync(false);
  }

  function summary(c) {
    return `${tr(`palette.${c.palette}`)} · ${tr(`finish.${c.finish}`)} · ${tr('config.globesN', { n: c.globes })}`;
  }

  function sync(animatePrice = true) {
    const { config } = getState();
    for (const input of document.querySelectorAll('#config-form input[type="radio"]')) {
      input.checked = String(config[input.name]) === input.value;
    }
    const idx = Object.keys(BASE_PRICE).indexOf(String(config.globes));
    glo.style.setProperty('--seg-i', idx);
    nameEl.textContent = summary(config);
    const target = priceOf(config);
    if (animatePrice && target !== shown && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const from = shown, start = performance.now();
      const step = (now) => {
        const k = Math.min(1, (now - start) / 600);
        const e = 1 - Math.pow(1 - k, 3);
        priceEl.textContent = formatCHF(Math.round((from + (target - from) * e) / 10) * 10);
        if (k < 1) requestAnimationFrame(step); else priceEl.textContent = formatCHF(target);
      };
      requestAnimationFrame(step);
    } else {
      priceEl.textContent = formatCHF(target);
    }
    shown = target;
    const design = document.getElementById('f-design');
    if (design) design.value = `${summary(config)} · ${formatCHF(target)}`;
  }

  document.getElementById('config-form').addEventListener('change', (e) => {
    const t = e.target;
    if (t.name === 'palette' || t.name === 'finish') setConfig({ [t.name]: t.value });
    if (t.name === 'globes') setConfig({ globes: Number(t.value) });
  });
  document.getElementById('config-form').addEventListener('submit', (e) => e.preventDefault());

  document.getElementById('request-btn').addEventListener('click', () => onRequest?.());

  share.addEventListener('click', async () => {
    const link = shareLink(getState().config);
    const label = share.querySelector('span');
    try {
      await navigator.clipboard.writeText(link);
      label.textContent = tr('config.copied');
    } catch {
      label.textContent = link;
      const range = document.createRange();
      range.selectNodeContents(label);
      const sel = getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
    announce(label.textContent);
    setTimeout(() => { label.textContent = tr('config.share'); }, 2600);
  });

  build();
  return { build, sync, summary };
}

// Inside an embedded viewer the frame's own URL isn't shareable; prefer the parent page.
function shareLink(config) {
  let baseUrl = location.href.split('#')[0];
  try {
    if (window.top !== window.self && document.referrer) baseUrl = document.referrer.split('#')[0];
  } catch { /* cross-origin parent */ }
  return baseUrl + configToHash(config);
}
