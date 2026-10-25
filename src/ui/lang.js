import { LANGS, t } from '../i18n.js';
import { BUSINESS } from '../config.js';
import { getState, setLang } from '../state.js';

export const tr = (key, vars) => t(getState().lang, key, vars);
export const locale = () => (LANGS.find((l) => l.code === getState().lang) || LANGS[0]).locale;

export function formatCHF(n) {
  // Swiss convention: CHF 1’890.– ; the apostrophe grouping is used in every national language
  const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '’');
  return `CHF ${s}.–`;
}

// Apply every data-i18n / data-i18n-attr in the document
export function applyTranslations(root = document) {
  const { lang } = getState();
  document.documentElement.lang = lang;
  for (const el of root.querySelectorAll('[data-i18n]')) {
    const key = el.dataset.i18n;
    const text = tr(key, { weeks: BUSINESS.deliveryWeeks });
    if (el.hasAttribute('data-split')) {
      el.dataset.text = text;
      el.dispatchEvent(new CustomEvent('i18n:split'));
    } else {
      el.textContent = text;
    }
  }
  for (const el of root.querySelectorAll('[data-i18n-attr]')) {
    for (const pair of el.dataset.i18nAttr.split(';')) {
      const [attr, key] = pair.split(':');
      if (attr && key) el.setAttribute(attr.trim(), tr(key.trim()));
    }
  }
  for (const el of root.querySelectorAll('[data-business]')) {
    const v = BUSINESS[el.dataset.business];
    if (v !== undefined) el.textContent = v;
  }
  document.title = tr('meta.title');
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', tr('meta.description'));
}

// Visible "EN / FR / PT / DE / IT" button that opens a list of native language names
export function initLangSelector() {
  const btn = document.getElementById('lang-btn');
  const list = document.getElementById('lang-list');
  list.innerHTML = '';
  for (const l of LANGS) {
    const li = document.createElement('li');
    li.role = 'option';
    li.id = `lang-opt-${l.code}`;
    li.dataset.lang = l.code;
    li.lang = l.code;
    li.innerHTML = `<span>${l.name}</span><small>${l.code.toUpperCase()}</small>`;
    list.append(li);
  }
  let active = 0;
  const items = () => [...list.querySelectorAll('li')];
  const sync = () => {
    const { lang } = getState();
    for (const s of btn.querySelectorAll('[data-code]')) s.setAttribute('aria-current', s.dataset.code === lang ? 'true' : 'false');
    for (const li of items()) li.setAttribute('aria-selected', li.dataset.lang === lang ? 'true' : 'false');
  };
  const highlight = (i) => {
    active = (i + LANGS.length) % LANGS.length;
    items().forEach((li, j) => li.classList.toggle('is-active', j === active));
    list.setAttribute('aria-activedescendant', items()[active].id);
  };
  const open = () => {
    list.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    highlight(LANGS.findIndex((l) => l.code === getState().lang));
    list.focus();
  };
  const close = (focusBtn = true) => {
    list.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    if (focusBtn) btn.focus();
  };
  const choose = (code) => {
    setLang(code);
    close();
  };
  btn.addEventListener('click', () => (list.hidden ? open() : close()));
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); open(); }
  });
  list.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (li) choose(li.dataset.lang);
  });
  list.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); highlight(active + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); highlight(active - 1); }
    else if (e.key === 'Home') { e.preventDefault(); highlight(0); }
    else if (e.key === 'End') { e.preventDefault(); highlight(LANGS.length - 1); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(LANGS[active].code); }
    else if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'Tab') close(false);
  });
  document.addEventListener('pointerdown', (e) => {
    if (!list.hidden && !e.target.closest('#lang')) close(false);
  });
  sync();
  return { sync };
}
