import { PRODUCTS, PALETTES, priceOf } from '../config.js';
import { tr, formatCHF } from './lang.js';

const base = import.meta.env.BASE_URL;

export function renderCollection({ onConfigure, reduced }) {
  const wrap = document.getElementById('cards');
  wrap.innerHTML = '';
  PRODUCTS.forEach((p, i) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.reveal = '';
    card.style.setProperty('--d', `${(i % 3) * 90}ms`);
    const pal = PALETTES[p.palette];
    card.innerHTML = `
      <div class="card-media">
        <img class="img-a" src="${base}photos/${p.id}-a.webp" alt="${tr('a11y.poster')}" loading="lazy" decoding="async" width="800" height="1000">
        <img class="img-b" src="${base}photos/${p.id}-b.webp" alt="" loading="lazy" decoding="async" width="800" height="1000">
        <span class="card-spot" aria-hidden="true"></span>
        <span class="card-tag">${tr('card.globes', { n: p.globes })}</span>
      </div>
      <div class="card-body">
        <div class="card-head"><h3 lang="tr">${p.name}</h3><span class="card-meaning">${tr(`product.${p.id}.m`)}</span></div>
        <p class="card-desc">${tr(`product.${p.id}.d`)}</p>
        <p class="card-meta">
          <span><i class="dot" style="background: conic-gradient(${pal.swatch.map((c, k) => `${c} ${k * 25}% ${(k + 1) * 25}%`).join(', ')})"></i>${tr(`palette.${p.palette}`)}</span>
          <span>${tr(`finish.${p.finish}`)}</span>
        </p>
        <div class="card-foot">
          <span class="price-tag">${formatCHF(priceOf(p))}</span>
          <button class="card-cta" type="button">${tr('card.configure')}</button>
        </div>
      </div>`;
    const img = card.querySelector('.img-a');
    img.alt = `${p.name}, ${tr(`palette.${p.palette}`)}, ${tr(`finish.${p.finish}`)}, ${tr('card.globes', { n: p.globes })}`;
    card.querySelector('.card-cta').setAttribute('aria-label', `${tr('card.configure')}: ${p.name}`);
    card.querySelector('.card-cta').addEventListener('click', () => onConfigure(p));
    if (!reduced) bindTilt(card);
    wrap.append(card);
  });
}

// Soft spotlight that follows the pointer and a small change of viewing angle
function bindTilt(card) {
  const media = card.querySelector('.card-media');
  let raf = 0;
  card.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = media.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      media.style.setProperty('--mx', `${x * 100}%`);
      media.style.setProperty('--my', `${y * 100}%`);
      media.style.setProperty('--ry', `${(x - 0.5) * 6}deg`);
      media.style.setProperty('--rx', `${(0.5 - y) * 5}deg`);
    });
  });
  card.addEventListener('pointerleave', () => {
    cancelAnimationFrame(raf);
    media.style.setProperty('--rx', '0deg');
    media.style.setProperty('--ry', '0deg');
  });
}
