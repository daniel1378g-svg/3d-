// The page markup, rendered at build time in the default language. Every translatable node carries data-i18n
// (text) or data-i18n-attr ("attribute:key;…"), which is how the app swaps languages without rebuilding the DOM.
import { CONFIG } from './config.js';
import { translate, hasString } from './i18n.js';
import { LANGS, LANG_NAMES } from './i18n.js';
import { COLORS, FAMILIES, FINISHES, EFFECTS, DEFAULT_SELECTION } from './colors.js';
import { SEQUENCES } from './three/experience.js';
import { LOGOS } from './brands/logos.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * @param {{ lang?: string, artifact?: boolean, content?: { gallery?: object[], reviews?: object } | null }} options
 *   content = a business's own photographs and customer reviews (see tools/overlay-content.mjs), when it has them
 */
export function renderPage({ lang = CONFIG.defaultLanguage, artifact = false, content = null } = {}) {
  const L = LANGS.indexOf(lang);
  const t = (key, vars) => esc(translate(lang, key, vars));
  /** <tag attrs data-i18n="key">text</tag> */
  const i = (tag, key, attrs = '') => `<${tag}${attrs ? ' ' + attrs : ''} data-i18n="${key}">${t(key)}</${tag}>`;
  /** attribute(s) that follow the language: at({ 'aria-label': 'nav.label' }) */
  const at = (map, vars) => `data-i18n-attr="${Object.entries(map).map(([a, k]) => `${a}:${k}`).join(';')}" ${Object.entries(map).map(([a, k]) => `${a}="${t(k, vars)}"`).join(' ')}${vars ? ` data-i18n-vars="${esc(JSON.stringify(vars))}"` : ''}`;
  /** Like i(), for a text with {placeholders}. */
  const iv = (tag, key, vars, attrs = '') => `<${tag}${attrs ? ' ' + attrs : ''} data-i18n="${key}" data-i18n-vars="${esc(JSON.stringify(vars))}">${t(key, vars)}</${tag}>`;
  const LOGO = LOGOS[CONFIG.key];
  const [lx, ly, lw, lh] = LOGO.viewBox.split(/\s+/).map(Number);
  const logoTransform = LOGO.transform ? ` transform="${LOGO.transform}"` : '';
  const logo = (cls = '') => `<svg class="logo-svg ${cls}" viewBox="${LOGO.viewBox}" style="aspect-ratio:${lw}/${lh};--sweep:${Math.round(lw * 1.8)}px" role="img" aria-label="${esc(CONFIG.brand.name)}" focusable="false"><use href="#fw-logo"/><g clip-path="url(#fw-logo-clip)"><rect class="logo-sweep" x="${Math.round(lx - lw * 0.4)}" y="${ly}" width="${Math.round(lw * 0.36)}" height="${lh}" fill="url(#fw-logo-shine)"/></g></svg>`;
  const selection = CONFIG.defaultSelection || DEFAULT_SELECTION;
  const SEQ = SEQUENCES[CONFIG.interior];
  const icon = {
    left: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6 4 11l5 5M4 11h9a6 6 0 0 1 6 6v1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    right: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 6 5 5-5 5m5-5h-9a6 6 0 0 0-6 6v1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    reset: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.6-5.9M4 4v4.5h4.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    full: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 6 4 12l6 6M4 12h16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    out: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 16 16 8M9 8h7v7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    fwd: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6 6 6-6 6M20 12H4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };
  const firstShot = CONFIG.story.shots ? CONFIG.story.shots[0].name : 'a_dirty';
  const navItems = CONFIG.nav;
  const navLinks = (cls) => navItems.map(([id, key]) => `<a class="${cls}" href="#${id}" data-nav="${id}" data-i18n="${key}">${t(key)}</a>`).join('');
  const newTab = `<span class="sr-only" data-i18n="contact.newtab">${t('contact.newtab')}</span>`;
  const step = (n, id, img) => `
    <article class="step" data-step="${n}"${id ? ` id="${id}"` : ''}>
      <figure class="step-still"><img src="img/${img}_m.webp" srcset="img/${img}_m.webp 1152w, img/${img}.webp 2048w" sizes="(min-width: 900px) 60vw, 100vw" width="1152" height="651" loading="lazy" decoding="async" ${at({ alt: `care.alt.${n}` })}></figure>
      <div class="card">
        ${i('p', hasString(`care.${n}.kicker`) ? `care.${n}.kicker` : 'care.kicker', 'class="kicker"')}
        ${i('h2', `care.${n}.title`)}
        ${i('p', `care.${n}.text`)}
      </div>
    </article>`;
  const still = (name, altKey) => `<img src="img/still-${name}.webp" width="1280" height="720" loading="lazy" decoding="async" ${at({ alt: altKey })}>`;
  const lightColors = [['ice', '#dfe9ff'], ['blue', '#3d6bff'], ['violet', '#8f4dff'], ['red', '#ff2a3c'], ['amber', '#ff9a2e'], ['green', '#2be38a']];
  const A = CONFIG.address;
  const social = [
    CONFIG.instagram ? `<a class="link" href="${esc(CONFIG.instagram.url)}" target="_blank" rel="noopener"><span translate="no">Instagram ${esc(CONFIG.instagram.handle)}</span>${icon.out}${newTab}</a>` : '',
    CONFIG.facebook ? `<a class="link" href="${esc(CONFIG.facebook)}" target="_blank" rel="noopener"><span translate="no">Facebook</span>${icon.out}${newTab}</a>` : '',
    CONFIG.youtube ? `<a class="link" href="${esc(CONFIG.youtube)}" target="_blank" rel="noopener"><span translate="no">YouTube</span>${icon.out}${newTab}</a>` : '',
  ].filter(Boolean);
  // Phone and e-mail are plain text in the design proposal (its preview frame cannot start a call or a message)
  // and links on the real site.
  const phone = !CONFIG.phone ? '' : artifact ? `<p class="copyable" translate="no">${esc(CONFIG.phone)}</p>` : `<p><a class="link" href="tel:${esc(CONFIG.phone.replace(/[^+\d]/g, ''))}" translate="no">${esc(CONFIG.phone)}</a></p>`;
  const email = !CONFIG.email ? '' : artifact ? `<p class="copyable" translate="no">${esc(CONFIG.email)}</p>` : `<p><a class="link" href="mailto:${esc(CONFIG.email)}" translate="no">${esc(CONFIG.email)}</a></p>`;
  const contactCards = [
    `<div class="info">
      ${i('h3', 'contact.address')}
      <p class="addr"><span translate="no">${esc(A.street)}</span><br><span translate="no">${esc(A.postalCode)} ${esc(A.city)}</span>, ${i('span', 'contact.country')}</p>
      <a class="link" href="${esc(A.directionsUrl)}" target="_blank" rel="noopener">${i('span', 'contact.directions')}${icon.out}${newTab}</a>
    </div>`,
    social.length ? `<div class="info">
      <h3 translate="no">${social.length > 1 ? 'Instagram · Facebook · YouTube' : 'Instagram'}</h3>
      ${social.join('')}
    </div>` : '',
    CONFIG.phone ? `<div class="info">${i('h3', 'contact.phone')}${phone}</div>` : '',
    CONFIG.whatsapp ? `<div class="info"><h3>WhatsApp</h3><a class="link" href="https://wa.me/${esc(CONFIG.whatsapp)}" target="_blank" rel="noopener"><span translate="no">${esc(CONFIG.phone || '+' + CONFIG.whatsapp)}</span>${icon.out}${newTab}</a></div>` : '',
    CONFIG.email ? `<div class="info">${i('h3', 'contact.email')}${email}</div>` : '',
    CONFIG.hours ? `<div class="info">${i('h3', 'contact.hours')}<ul class="hours" id="hours"></ul></div>` : '',
  ].join('');

  const lightsMode = CONFIG.interior === 'lights';
  const beforeAfter = `<div class="seg seg-2 seg-compact"><button type="button" class="seg-btn is-on" data-show="before" aria-pressed="true" data-i18n="still.before">${t('still.before')}</button><button type="button" class="seg-btn" data-show="after" aria-pressed="false" data-i18n="still.after">${t('still.after')}</button></div>`;
  // What the visitor can adjust during the interior sequence: lighting colour and brightness, or the film shade.
  const controls = lightsMode ? `        <div class="lights" id="lights" hidden>
          <fieldset class="field">
            ${i('legend', 'light.title')}
            <div class="light-swatches">
              ${lightColors.map(([k, hex], n) => `<label class="sw sw-light" style="--c:${hex}" ${at({ title: 'light.' + k })}><input type="radio" name="light-color" id="light-color-${k}" value="${hex}"${n === 1 ? ' checked' : ''}><span class="sw-dot">${icon.check}</span><span class="sr-only" data-i18n="light.${k}">${t('light.' + k)}</span></label>`).join('')}
            </div>
          </fieldset>
          <div class="control range"><label for="light-brightness" data-i18n="light.brightness">${t('light.brightness')}</label><input id="light-brightness" type="range" min="20" max="100" step="5" value="85"></div>
        </div>` : `        <div class="lights tint-controls" id="lights">
          <fieldset class="field">
            ${i('legend', 'tint.title')}
            <div class="seg seg-3">
              ${['light', 'medium', 'dark'].map((k) => `<label class="seg-item"><input type="radio" name="tint-level" id="tint-level-${k}" value="${k}"${k === 'medium' ? ' checked' : ''}><span data-i18n="tint.${k}">${t('tint.' + k)}</span></label>`).join('')}
            </div>
          </fieldset>
          ${i('p', 'tint.note', 'class="hint-line"')}
        </div>`;
  // The same content as still images, for reduced motion and for devices without 3D.
  const stillsBlock = lightsMode ? `    <figure class="still-single">${still('door', 'still.door')}</figure>
    <div class="compare" data-compare>
      <div class="compare-head">${i('h3', 'cap.ambient.title')}<div class="seg seg-2 seg-compact"><button type="button" class="seg-btn is-on" data-show="before" aria-pressed="true" data-i18n="still.before">${t('still.before')}</button><button type="button" class="seg-btn" data-show="after" aria-pressed="false" data-i18n="still.after">${t('still.after')}</button></div></div>
      <figure><span data-side="before">${still('cabin-off', 'still.cabinOff')}</span><span data-side="after" hidden>${still('cabin-on', 'still.cabinOn')}</span></figure>
      ${i('p', 'cap.ambient.text')}
    </div>
    <div class="compare" data-compare>
      <div class="compare-head">${i('h3', 'cap.stars.title')}<div class="seg seg-2 seg-compact"><button type="button" class="seg-btn is-on" data-show="before" aria-pressed="true" data-i18n="still.before">${t('still.before')}</button><button type="button" class="seg-btn" data-show="after" aria-pressed="false" data-i18n="still.after">${t('still.after')}</button></div></div>
      <figure><span data-side="before">${still('roof-off', 'still.roofOff')}</span><span data-side="after" hidden>${still('roof-on', 'still.roofOn')}</span></figure>
      ${i('p', 'cap.stars.text')}
    </div>` : `    <div class="compare" data-compare>
      <div class="compare-head">${i('h3', 'cap.tint.title')}${beforeAfter}</div>
      <figure><span data-side="before">${still('tint-off', 'still.tintOff')}</span><span data-side="after" hidden>${still('tint-on', 'still.tintOn')}</span></figure>
      ${i('p', 'cap.tint.text')}
    </div>
    <div class="compare">
      <div class="compare-head">${i('h3', 'cap.inside.title')}</div>
      <figure>${still('inside', 'still.inside')}</figure>
      ${i('p', 'cap.inside.text')}
    </div>
    <figure class="still-single">${still('door', 'still.door')}</figure>`;
  const X = CONFIG.extras;
  const extras = !X ? '' : `
<section class="extras band" id="services" aria-labelledby="svc-title">
  <div class="section-head">
    ${i('p', 'nav.services', 'class="kicker"')}
    ${i('h2', 'svc.title', 'id="svc-title" tabindex="-1"')}
  </div>
  <ul class="svc-grid">
    ${X.services.filter((sv) => hasString(`svc.${sv.id}.text`)).map((sv) => `<li class="svc">${i('h3', `svc.${sv.id}.name`)}${i('p', `svc.${sv.id}.text`)}${sv.warranty ? i('span', sv.warranty, 'class="badge"') : ''}</li>`).join('')}
  </ul>
  ${X.services.some((sv) => !hasString(`svc.${sv.id}.text`)) ? `<div class="svc-more">
    ${i('h3', 'svc.also')}
    <ul class="tags">${X.services.filter((sv) => !hasString(`svc.${sv.id}.text`)).map((sv) => i('li', `svc.${sv.id}.name`)).join('')}</ul>
  </div>` : ''}
  <div class="extras-row">
    <div class="films">
      ${i('h3', 'svc.films.title')}
      ${i('p', 'svc.films.vinyl')}
      ${i('p', 'svc.films.ppf')}
    </div>
    <div class="about" id="about">
      ${i('p', 'about.kicker', 'class="kicker"')}
      ${i('h3', 'about.title', 'class="about-title"')}
      <ol class="timeline">${X.about.map((k) => i('li', k)).join('')}</ol>
    </div>
  </div>
</section>
`;

  // The business's own photographs, by service. "All" mixes the services so the first rows show a bit of each.
  const G = content?.gallery && CONFIG.gallery ? content.gallery : null;
  let gallery = '';
  if (G) {
    const byGroup = CONFIG.gallery.map((id) => G.filter((p) => p.group === id));
    const mixed = [];
    for (let n = 0; byGroup.some((list) => list[n]); n++) for (const list of byGroup) if (list[n]) mixed.push({ ...list[n], n: n + 1 });
    gallery = `
<section class="work band" id="work" aria-labelledby="work-title">
  <div class="section-head">
    ${i('p', 'nav.work', 'class="kicker"')}
    ${i('h2', 'gal.title', 'id="work-title" tabindex="-1"')}
    ${i('p', 'gal.text', 'class="lead"')}
  </div>
  <fieldset class="gal-filter">
    ${i('legend', 'gal.filter', 'class="sr-only"')}
    <div class="families">
      <label class="family"><input type="radio" name="gal-group" id="gal-group-all" value="all" checked>${i('span', 'gal.all')}</label>
      ${CONFIG.gallery.map((id) => `<label class="family"><input type="radio" name="gal-group" id="gal-group-${id}" value="${id}">${i('span', `svc.${id}.name`)}</label>`).join('')}
    </div>
  </fieldset>
  <ul class="gal-grid" id="gal-grid">
    ${mixed.map((p) => `<li class="gal-item" data-group="${p.group}"><button type="button" class="gal-open" data-full="img/${p.file}.webp" data-w="${p.w}" data-h="${p.h}"><img src="img/${p.file}_t.webp" width="${p.tw}" height="${p.th}" loading="lazy" decoding="async" ${at({ alt: 'gal.alt' }, { service: `@svc.${p.group}.name`, n: p.n })}></button></li>`).join('\n    ')}
  </ul>
  <p class="gal-more-row"><button type="button" class="btn btn-ghost" id="gal-more" data-i18n="gal.more">${t('gal.more')}</button></p>
  <dialog class="lightbox" id="lightbox" ${at({ 'aria-label': 'gal.viewer' })}>
    ${artifact ? '<p class="proposal" role="note" lang="pt">Proposta de design · não é o site oficial</p>' : ''}
    <figure><img id="lightbox-img" alt=""><figcaption id="lightbox-caption"></figcaption></figure>
    <button type="button" class="tool lightbox-prev" id="lightbox-prev" ${at({ 'aria-label': 'gal.prev' })}>${icon.back}</button>
    <button type="button" class="tool lightbox-next" id="lightbox-next" ${at({ 'aria-label': 'gal.next' })}>${icon.fwd}</button>
    <button type="button" class="tool lightbox-close" id="lightbox-close" ${at({ 'aria-label': 'gal.close' })}>${icon.close}</button>
  </dialog>
</section>
`;
  }
  // Customer reviews, word for word and in the language they were written in.
  const R = content?.reviews?.items?.length ? content.reviews : null;
  const stars = (n, attrs) => `<span class="stars" style="--fill:${Math.round((n / 5) * 100)}%" ${attrs}>★★★★★</span>`;
  const reviews = !R ? '' : `
<section class="reviews band" id="reviews" aria-labelledby="rev-title">
  <div class="section-head">
    ${i('p', 'nav.reviews', 'class="kicker"')}
    ${i('h2', 'rev.title', 'id="rev-title" tabindex="-1"')}
    <p class="rev-score">${stars(R.rating, 'aria-hidden="true"')}${iv('strong', 'rev.score', { rating: String(R.rating), ratingComma: String(R.rating).replace('.', ',') })}${iv('span', 'rev.count', { count: R.count })}</p>
  </div>
  <div class="rev-row" id="rev-row" tabindex="0" role="region" ${at({ 'aria-label': 'rev.region' })}>
    ${R.items.map((r, n) => `<article class="rev">
      ${stars(r.rating, `role="img" ${at({ 'aria-label': 'rev.stars' }, { n: r.rating })}`)}
      <blockquote class="rev-text" id="rev-text-${n}" lang="${esc(r.lang)}" translate="no">${esc(r.text)}</blockquote>
      <button type="button" class="rev-more" aria-expanded="false" aria-controls="rev-text-${n}" data-i18n="rev.more" hidden>${t('rev.more')}</button>
      <p class="rev-by"><strong translate="no">${esc(r.name)}</strong> ${i('span', 'rev.on')}</p>
    </article>`).join('\n    ')}
  </div>
  <div class="rev-foot">
    <div class="tool-buttons">
      <button type="button" class="tool" id="rev-prev" ${at({ 'aria-label': 'rev.prev' })}>${icon.back}</button>
      <button type="button" class="tool" id="rev-next" ${at({ 'aria-label': 'rev.next' })}>${icon.fwd}</button>
    </div>
    ${R.placeId ? `<a class="link" href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(CONFIG.brand.name)}&amp;query_place_id=${esc(R.placeId)}" target="_blank" rel="noopener">${i('span', 'rev.all')}${icon.out}${newTab}</a>` : ''}
  </div>
  ${i('p', 'rev.note', 'class="note"')}
</section>
`;

  return `
<svg class="sprite" width="0" height="0" aria-hidden="true" focusable="false">
  <defs>
    ${LOGO.gradient ? `<linearGradient id="fw-logo-fill" gradientUnits="userSpaceOnUse" x1="${LOGO.gradient.x1}" x2="${LOGO.gradient.x2}" y1="0" y2="0">${LOGO.gradient.stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>` : ''}
    <symbol id="fw-logo" viewBox="${LOGO.viewBox}"><path${logoTransform} fill="${LOGO.gradient ? 'url(#fw-logo-fill)' : 'currentColor'}" fill-rule="evenodd" d="${LOGO.d}"/></symbol>
    <clipPath id="fw-logo-clip"><path${logoTransform} fill-rule="evenodd" clip-rule="evenodd" d="${LOGO.d}"/></clipPath>
    <linearGradient id="fw-logo-shine" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#8f6bff" stop-opacity="0"/><stop offset="0.45" stop-color="#9db6ff" stop-opacity="0.95"/><stop offset="0.6" stop-color="#ffffff" stop-opacity="1"/><stop offset="1" stop-color="#4d7dff" stop-opacity="0"/></linearGradient>
  </defs>
</svg>
<a class="skip" href="#main" data-i18n="skip.content">${t('skip.content')}</a>
<header class="site-header" id="header">
  ${artifact ? '<p class="proposal" role="note" lang="pt">Proposta de design · não é o site oficial</p>' : ''}
  <div class="bar">
    <a class="logo" href="#top" data-nav="top" ${at({ 'aria-label': 'nav.home' })}>${logo()}</a>
    <nav class="nav-desktop" ${at({ 'aria-label': 'nav.label' })}>${navLinks('nav-link')}</nav>
    <div class="bar-end">
      <label class="lang">
        <span class="sr-only" data-i18n="lang.label">${t('lang.label')}</span>
        <select id="lang-select" autocomplete="off">${LANGS.map((l) => `<option value="${l}" lang="${l}"${l === lang ? ' selected' : ''}>${LANG_NAMES[l]}</option>`).join('')}</select>
      </label>
      <a class="btn btn-primary bar-cta" href="#booking" data-nav="booking" data-i18n="cta.request">${t('cta.request')}</a>
      <button class="burger" id="menu-toggle" type="button" aria-expanded="false" aria-controls="menu" ${at({ 'aria-label': 'nav.menu' })}><span></span><span></span><span></span></button>
    </div>
  </div>
</header>
<div class="menu" id="menu" hidden>
  <nav class="menu-inner" ${at({ 'aria-label': 'nav.label' })}>
    ${i('p', 'nav.services', 'class="kicker"')}
    ${navLinks('menu-link')}
    <a class="btn btn-primary menu-cta" href="#booking" data-nav="booking" data-i18n="cta.request">${t('cta.request')}</a>
  </nav>
</div>

<main id="main">
<section class="story" id="top">
  <div class="story-stage" aria-hidden="true">
    <div class="story-pic">
      <img class="story-poster" src="img/${firstShot}_m.webp" srcset="img/${firstShot}_m.webp 1152w, img/${firstShot}.webp 2048w" sizes="100vw" width="1152" height="651" alt="" fetchpriority="high" decoding="async">
      <canvas id="story-canvas"></canvas>
    </div>
  </div>
  <div class="story-steps">
    <div class="step step-hero" data-step="0">
      <div class="hero-copy">
        ${i('p', 'hero.eyebrow', 'class="kicker"')}
        ${i('h1', 'hero.title')}
        ${i('p', 'hero.text', 'class="lead"')}
        <div class="actions">
          <a class="btn btn-primary" href="#booking" data-nav="booking" data-i18n="cta.request">${t('cta.request')}</a>
          <a class="btn btn-ghost" href="#wrap" data-nav="wrap" data-i18n="hero.cta2">${t('hero.cta2')}</a>
        </div>
      </div>
    </div>
    ${CONFIG.story.steps.map(([n, id, img]) => step(n, id, img)).join('')}
  </div>
</section>

<section class="config band" id="wrap" aria-labelledby="config-title">
  <div class="section-head">
    ${i('p', 'config.kicker', 'class="kicker"')}
    ${i('h2', 'config.title', 'id="config-title" tabindex="-1"')}
    ${i('p', 'config.text', 'class="lead"')}
  </div>
  <div class="config-grid" id="config">
    <div class="viewer" id="viewer">
      <div class="viewer-bar">
        <button class="btn btn-solid viewer-back" id="viewer-back" type="button" hidden>${icon.back}${i('span', 'viewer.back')}</button>
        <p class="readout" id="readout" aria-live="polite"><span class="chip" id="readout-chip"></span><span class="readout-text"><strong id="readout-name"></strong><span id="readout-finish"></span></span></p>
      </div>
      <div class="viewer-stage" id="viewer-stage" tabindex="0" role="group" aria-describedby="viewer-keys">
        <img class="poster" id="viewer-poster" src="img/poster-car.webp" width="1280" height="800" alt="" decoding="async">
        <div class="viewer-loading" id="viewer-loading" hidden><span data-i18n="viewer.loading">${t('viewer.loading')}</span><span class="meter"><i id="viewer-meter"></i></span></div>
        <p class="viewer-msg" id="viewer-msg" hidden data-i18n="viewer.unavailable">${t('viewer.unavailable')}</p>
      </div>
      <div class="viewer-tools">
        <p class="hint"><span data-i18n="viewer.hint">${t('viewer.hint')}</span><span class="sr-only" id="viewer-keys" data-i18n="viewer.keys">${t('viewer.keys')}</span></p>
        <div class="tool-buttons">
          <button class="tool" id="rot-left" type="button" ${at({ 'aria-label': 'viewer.left', title: 'viewer.left' })}>${icon.left}</button>
          <button class="tool" id="rot-reset" type="button" ${at({ 'aria-label': 'viewer.reset', title: 'viewer.reset' })}>${icon.reset}</button>
          <button class="tool" id="rot-right" type="button" ${at({ 'aria-label': 'viewer.right', title: 'viewer.right' })}>${icon.right}</button>
          <button class="tool" id="viewer-full" type="button" ${at({ 'aria-label': 'viewer.full', title: 'viewer.full' })}>${icon.full}</button>
        </div>
      </div>
    </div>
    <div class="panel" id="config-panel">
      <fieldset class="field seg-field">
        ${i('legend', 'config.vehicle')}
        <div class="seg seg-2">
          ${['car', 'bike'].map((v) => `<label class="seg-item"><input type="radio" name="wrap-vehicle" id="wrap-vehicle-${v}" value="${v}"${v === selection.vehicle ? ' checked' : ''}><span><b data-i18n="vehicle.${v}">${t('vehicle.' + v)}</b><small translate="no">${v === 'car' ? 'BMW M4 Competition' : 'BMW S 1000 RR'}</small></span></label>`).join('')}
        </div>
      </fieldset>
      <fieldset class="field">
        ${i('legend', 'config.color')}
        <div class="families" role="radiogroup" ${at({ 'aria-label': 'config.family' })}>
          ${FAMILIES.map((f) => `<label class="family"><input type="radio" name="wrap-family" id="wrap-family-${f}" value="${f}"><span data-i18n="family.${f}">${t('family.' + f)}</span></label>`).join('')}
        </div>
        <div class="swatches" id="swatches">
          ${COLORS.map((c) => `<label class="sw" data-family="${c.family}" style="--c:${c.hex}" title="${esc(c.name[L])}"><input type="radio" name="wrap-color" id="wrap-color-${c.id}" value="${c.id}"${c.id === selection.color ? ' checked' : ''}><span class="sw-dot">${icon.check}</span><span class="sr-only" data-color="${c.id}">${esc(c.name[L])}</span></label>`).join('')}
        </div>
      </fieldset>
      <div class="field-row">
        <fieldset class="field seg-field">
          ${i('legend', 'config.finish')}
          <div class="seg seg-3">
            ${FINISHES.map((f) => `<label class="seg-item"><input type="radio" name="wrap-finish" id="wrap-finish-${f}" value="${f}"${f === selection.finish ? ' checked' : ''}><span data-i18n="finish.${f}">${t('finish.' + f)}</span></label>`).join('')}
          </div>
        </fieldset>
        <fieldset class="field seg-field">
          ${i('legend', 'config.effect')}
          <div class="seg seg-3">
            ${EFFECTS.map((f) => `<label class="seg-item"><input type="radio" name="wrap-effect" id="wrap-effect-${f}" value="${f}"${f === selection.effect ? ' checked' : ''}><span data-i18n="effect.${f}">${t('effect.' + f)}</span></label>`).join('')}
          </div>
          ${i('p', 'config.effect.note', 'class="hint-line" id="effect-note" hidden')}
        </fieldset>
      </div>
      <a class="btn btn-primary btn-wide" id="config-request" href="#booking" data-i18n="config.request">${t('config.request')}</a>
      ${i('p', 'config.note', 'class="note"')}
    </div>
  </div>
</section>

<section class="booking band" id="booking" aria-labelledby="book-title">
  <div class="section-head">
    ${i('p', 'book.kicker', 'class="kicker"')}
    ${i('h2', 'book.title', 'id="book-title" tabindex="-1"')}
    ${i('p', 'book.text', 'class="lead"')}
  </div>
  <div class="booking-grid">
    <div class="form-wrap">
      <form class="form" id="booking-form" novalidate>
        <div class="status" id="form-status" role="alert" tabindex="-1" hidden></div>
        <fieldset class="field" id="f-services-group" aria-describedby="e-services">
          <legend><span data-i18n="form.services">${t('form.services')}</span> <small data-i18n="form.services.hint">${t('form.services.hint')}</small></legend>
          <div class="checks">
            ${CONFIG.services.map((s) => `<label class="check"><input type="checkbox" name="services" id="f-service-${s}" value="${s}"><span>${icon.check}<span data-i18n="service.${s}">${t('service.' + s)}</span></span></label>`).join('')}
          </div>
          <p class="error" id="e-services" hidden></p>
        </fieldset>
        <fieldset class="field">
          ${i('legend', 'form.vehicle')}
          <div class="seg seg-2 seg-compact" role="radiogroup" ${at({ 'aria-label': 'form.vehicleType' })}>
            ${['car', 'bike'].map((v) => `<label class="seg-item"><input type="radio" name="vehicleType" id="f-type-${v}" value="${v}"${v === 'car' ? ' checked' : ''}><span data-i18n="vehicle.${v}">${t('vehicle.' + v)}</span></label>`).join('')}
          </div>
          <div class="grid-3">
            <div class="control"><label for="f-make" data-i18n="form.make">${t('form.make')}</label><input id="f-make" name="make" type="text" autocomplete="off" maxlength="60" aria-describedby="e-make" required><p class="error" id="e-make" hidden></p></div>
            <div class="control"><label for="f-model" data-i18n="form.model">${t('form.model')}</label><input id="f-model" name="model" type="text" autocomplete="off" maxlength="60" aria-describedby="e-model" required><p class="error" id="e-model" hidden></p></div>
            <div class="control"><label for="f-year"><span data-i18n="form.year">${t('form.year')}</span> <small data-i18n="form.optional">${t('form.optional')}</small></label><input id="f-year" name="year" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="4" autocomplete="off" aria-describedby="e-year"><p class="error" id="e-year" hidden></p></div>
          </div>
          <div class="wrap-choice" id="wrap-choice" hidden>
            <span class="chip" id="wrap-choice-chip"></span>
            <p><span class="label" data-i18n="form.wrap">${t('form.wrap')}</span><strong id="wrap-choice-text"></strong></p>
            <button class="tool" id="wrap-choice-remove" type="button" ${at({ 'aria-label': 'form.wrap.remove', title: 'form.wrap.remove' })}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
          </div>
        </fieldset>
        <div class="control">
          <label for="f-date"><span data-i18n="form.date">${t('form.date')}</span> <small data-i18n="form.optional">${t('form.optional')}</small></label>
          <input id="f-date" name="date" type="date" aria-describedby="h-date e-date">
          ${i('p', 'form.date.hint', 'class="hint-line" id="h-date"')}
          <p class="error" id="e-date" hidden></p>
        </div>
        <fieldset class="field">
          ${i('legend', 'form.you')}
          <div class="control"><label for="f-name" data-i18n="form.name">${t('form.name')}</label><input id="f-name" name="name" type="text" autocomplete="name" maxlength="80" aria-describedby="e-name" required><p class="error" id="e-name" hidden></p></div>
          <div class="grid-2">
            <div class="control"><label for="f-phone" data-i18n="form.phone">${t('form.phone')}</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" maxlength="30" aria-describedby="h-contact e-phone"><p class="error" id="e-phone" hidden></p></div>
            <div class="control"><label for="f-email" data-i18n="form.email">${t('form.email')}</label><input id="f-email" name="email" type="email" autocomplete="email" maxlength="120" aria-describedby="h-contact e-email"><p class="error" id="e-email" hidden></p></div>
          </div>
          ${i('p', 'form.contact.hint', 'class="hint-line" id="h-contact"')}
        </fieldset>
        <div class="control">
          <label for="f-message"><span data-i18n="form.message">${t('form.message')}</span> <small data-i18n="form.optional">${t('form.optional')}</small></label>
          <textarea id="f-message" name="message" rows="4" maxlength="1500" ${at({ placeholder: 'form.message.ph' })}></textarea>
        </div>
        <div class="submit-row">
          <button class="btn btn-primary btn-wide" id="f-submit" type="submit"><span class="spinner" aria-hidden="true"></span><span id="f-submit-label" data-i18n="cta.request">${t('cta.request')}</span></button>
          ${i('p', 'form.after', 'class="note"')}
        </div>
      </form>
      <div class="done" id="form-done" tabindex="-1" hidden>
        <span class="done-mark">${icon.check}</span>
        ${i('h3', 'sent.title')}
        ${i('p', 'sent.text')}
        <button class="btn btn-ghost" id="form-again" type="button" data-i18n="sent.again">${t('sent.again')}</button>
      </div>
    </div>
    <aside class="contact" aria-labelledby="contact-title">
      ${i('h3', 'contact.title', 'id="contact-title" class="aside-title"')}
      <div class="infos">${contactCards}</div>
      <div class="how">
        ${i('h3', 'how.title')}
        <ol>
          ${i('li', 'how.1')}
          ${i('li', 'how.2')}
          ${i('li', 'how.3')}
        </ol>
      </div>
    </aside>
  </div>
</section>

<section class="interior" id="interior" aria-labelledby="int-title">
  <div class="section-head band">
    ${i('p', 'int.kicker', 'class="kicker"')}
    ${i('h2', 'int.title', 'id="int-title" tabindex="-1"')}
    ${i('p', 'int.text', 'class="lead"')}
    <a class="btn btn-ghost" id="int-skip-top" href="#${CONFIG.extras ? 'services' : 'finale'}" data-nav="${CONFIG.extras ? 'services' : 'finale'}" data-i18n="int.skip">${t('int.skip')}</a>
  </div>
  <div class="cine" id="cine" data-sequence="${CONFIG.interior}">
    ${Object.keys(SEQ.anchors).map((id) => `<span class="anchor" id="${id}"></span>`).join('')}
    <div class="cine-stage" id="cine-stage">
      <div class="cine-pic" id="cine-pic"><img class="poster" id="cine-poster" src="img/still-${SEQ.poster}.webp" width="1280" height="720" alt="" loading="lazy" decoding="async"></div>
      <div class="cine-ui">
        <a class="btn btn-solid cine-skip" href="#${CONFIG.extras ? 'services' : 'finale'}" data-nav="${CONFIG.extras ? 'services' : 'finale'}" data-i18n="int.skip">${t('int.skip')}</a>
        <ol class="rail" id="rail" ${at({ 'aria-label': 'int.progress' })}>
          ${SEQ.rail.map((p) => `<li data-phase="${p}"><span data-i18n="rail.${p}">${t('rail.' + p)}</span></li>`).join('')}
        </ol>
        <div class="caption" id="caption" aria-live="polite">
          <h3 id="caption-title" data-i18n="cap.${SEQ.rail[0]}.title">${t(`cap.${SEQ.rail[0]}.title`)}</h3>
          <p id="caption-text" data-i18n="cap.${SEQ.rail[0]}.text">${t(`cap.${SEQ.rail[0]}.text`)}</p>
        </div>
${controls}
      </div>
    </div>
  </div>
  <div class="stills band" id="stills" hidden>
${stillsBlock}
    ${i('p', 'still.note', 'class="note"')}
  </div>
</section>
${extras}${gallery}${reviews}
<section class="finale band" id="finale" aria-labelledby="fin-title">
  ${i('h2', 'fin.title', 'id="fin-title" tabindex="-1"')}
  ${i('p', 'fin.text', 'class="lead"')}
  <div class="actions">
    <a class="btn btn-primary" href="#booking" data-nav="booking" data-i18n="cta.request">${t('cta.request')}</a>
    <a class="btn btn-ghost" href="#wrap" data-nav="wrap" data-i18n="hero.cta2">${t('hero.cta2')}</a>
  </div>
</section>
</main>

<footer class="site-footer band">
  <div class="foot-brand">
    <a class="logo logo-lg" href="#top" data-nav="top" ${at({ 'aria-label': 'nav.home' })}>${logo()}</a>
    <p class="tagline" translate="no">${esc(CONFIG.brand.tagline)}</p>
  </div>
  <div class="foot-cols">
    <div>
      ${i('h3', 'contact.address')}
      <p><span translate="no">${esc(A.street)}<br>${esc(A.postalCode)} ${esc(A.city)}</span>, ${i('span', 'contact.country')}</p>
      <p><a class="link" href="${esc(A.directionsUrl)}" target="_blank" rel="noopener">${i('span', 'contact.directions')}${icon.out}${newTab}</a></p>
      ${social.map((link) => `<p>${link}</p>`).join('')}
      ${phone}
      ${email}
    </div>
    <nav ${at({ 'aria-label': 'nav.services' })}>
      ${i('h3', 'nav.services')}
      <ul>${navItems.map(([id, key]) => `<li><a href="#${id}" data-nav="${id}" data-i18n="${key}">${t(key)}</a></li>`).join('')}<li><a href="#booking" data-nav="booking" data-i18n="cta.request">${t('cta.request')}</a></li></ul>
    </nav>
    <div>
      ${i('h3', 'foot.credits')}
      <ul class="credits">${CONFIG.credits.map((c) => `<li><a href="${esc(c.url)}" target="_blank" rel="noopener"><span translate="no">${esc(c.title)}</span></a> <span data-i18n="foot.by">${t('foot.by')}</span> <span translate="no">${esc(c.author)}</span>, <span translate="no">${esc(c.license)}</span></li>`).join('')}</ul>
    </div>
  </div>
  <div class="foot-base">
    <p translate="no">© <span id="year">2026</span> ${esc(CONFIG.brand.name)}</p>
    ${i('p', 'foot.note', 'class="foot-note"')}
    ${CONFIG.links.privacy ? `<a class="link" href="${esc(CONFIG.links.privacy)}" target="_blank" rel="noopener">${i('span', 'foot.privacy')}${newTab}</a>` : ''}
    ${CONFIG.links.complaints ? `<a class="link" href="${esc(CONFIG.links.complaints)}" target="_blank" rel="noopener">${i('span', 'foot.complaints')}${newTab}</a>` : ''}
    <a class="link" href="#top" data-nav="top" data-i18n="foot.top">${t('foot.top')}</a>
  </div>
</footer>

<a class="fab" id="fab" href="#booking" data-nav="booking" hidden><span data-i18n="cta.short">${t('cta.short')}</span></a>
<div class="sr-only" id="live" aria-live="polite"></div>
`;
}
