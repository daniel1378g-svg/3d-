// Word-split headings and gentle reveals. Content is readable without JS and at rest:
// elements only take their "before" state when they start below the fold.

export function splitWords(el) {
  const text = el.dataset.text ?? el.textContent.trim();
  el.dataset.text = text;
  const words = text.split(/\s+/);
  el.textContent = '';
  // the last word of the hero title carries the gold italic accent
  const accentLast = el.classList.contains('hero-title');
  words.forEach((w, i) => {
    const outer = document.createElement('span');
    outer.className = 'w';
    const inner = document.createElement(accentLast && i === words.length - 1 ? 'em' : 'span');
    inner.className = 'wi';
    inner.style.setProperty('--i', i);
    inner.textContent = w;
    outer.append(inner);
    el.append(outer);
    if (i < words.length - 1) el.append(' ');
  });
  el.setAttribute('aria-label', text);
  for (const w of el.querySelectorAll('.w')) w.setAttribute('aria-hidden', 'true');
}

export function initSplits() {
  for (const el of document.querySelectorAll('[data-split]')) {
    // [data-split] may hold the [data-i18n] itself or wrap it
    const holder = el.matches('[data-i18n]') ? el : el.querySelector('[data-i18n]');
    if (holder && holder !== el) {
      el.dataset.i18n = holder.dataset.i18n;
      el.dataset.text = holder.textContent.trim();
    }
    splitWords(el);
    el.addEventListener('i18n:split', () => splitWords(el));
  }
}

export function initReveals({ reduced }) {
  if (reduced || !('IntersectionObserver' in window)) return;
  const targets = [...document.querySelectorAll('[data-reveal], main h2[data-split]')];
  const vh = window.innerHeight;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target;
      el.classList.add('reveal-in');
      el.classList.remove('reveal-ready');
      io.unobserve(el);
    }
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.01 });
  // stagger siblings that enter together
  const groups = new Map();
  for (const el of targets) {
    if (el.getBoundingClientRect().top < vh * 0.9) continue; // already on screen: leave as is
    const parent = el.parentElement;
    const n = groups.get(parent) || 0;
    groups.set(parent, n + 1);
    el.style.setProperty('--d', `${n * 90}ms`);
    el.classList.add('reveal-ready');
    io.observe(el);
  }
}
