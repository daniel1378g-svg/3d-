import { CANTONS } from '../i18n.js';
import { tr } from './lang.js';
import { getState } from '../state.js';

export function initContact({ announce }) {
  const form = document.getElementById('contact-form');
  const canton = document.getElementById('f-canton');
  const done = document.getElementById('form-done');

  function fillCantons() {
    const { lang } = getState();
    const prev = canton.selectedIndex;
    canton.innerHTML = '';
    const ph = new Option(tr('form.cantonPick'), '');
    ph.disabled = true;
    canton.append(ph);
    // value stays the same across languages (index in the official list), label is localised
    CANTONS[lang].forEach((name, i) => canton.append(new Option(name, CANTONS.en[i])));
    canton.selectedIndex = prev > 0 ? prev : 0;
  }

  const fields = [
    { el: document.getElementById('f-name'), err: document.getElementById('f-name-err'), check: (v) => v.trim().length > 1 ? '' : tr('form.required') },
    { el: document.getElementById('f-email'), err: document.getElementById('f-email-err'), check: (v) => !v.trim() ? tr('form.required') : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : tr('form.emailInvalid') },
    { el: canton, err: document.getElementById('f-canton-err'), check: (v) => v ? '' : tr('form.required') },
    { el: document.getElementById('f-consent'), err: document.getElementById('f-consent-err'), check: (_, el) => el.checked ? '' : tr('form.required') },
  ];
  for (const f of fields) f.el.setAttribute('aria-describedby', f.err.id);

  function validate(f) {
    const msg = f.check(f.el.value, f.el);
    f.err.textContent = msg;
    f.err.hidden = !msg;
    f.el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }
  for (const f of fields) f.el.addEventListener(f.el.type === 'checkbox' || f.el.tagName === 'SELECT' ? 'change' : 'blur', () => { if (f.el.getAttribute('aria-invalid')) validate(f); });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const bad = fields.filter((f) => !validate(f));
    if (bad.length) { bad[0].el.focus(); return; }
    const name = document.getElementById('f-name').value.trim().split(/\s+/)[0];
    done.textContent = tr('form.done', { name });
    done.hidden = false;
    announce(done.textContent);
  });

  // copy buttons for phone and email (mailto/tel links are unreliable inside embedded viewers)
  for (const btn of document.querySelectorAll('.copy-btn')) {
    btn.addEventListener('click', async () => {
      const src = document.getElementById(btn.dataset.copy);
      const text = src.textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = tr('contact.copied');
      } catch {
        const range = document.createRange();
        range.selectNodeContents(src);
        const sel = getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
      setTimeout(() => { btn.textContent = tr('contact.copy'); }, 2000);
    });
  }

  fillCantons();
  return {
    refresh() {
      fillCantons();
      for (const f of fields) if (f.el.getAttribute('aria-invalid') === 'true') validate(f);
      if (!done.hidden) done.hidden = true;
    },
  };
}
