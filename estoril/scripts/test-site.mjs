// Site usability checks in Chromium (Playwright) against a served build.
//   npm run build && node scripts/serve.mjs site 8080 &
//   node scripts/test-site.mjs [--base http://127.0.0.1:8080/] [--only events,keyboard,motion,fallback,contrast,layout]
//                              [--viewports 1440x900,390x844] [--report]
// Exit code 1 on any failure. Every page visited must also be free of page errors and console errors/warnings.
//
//   events    the date-driven events pages and home page blocks at ?today=2026-11-23, 2027-01-25, 2027-10-18
//             (PT and EN): nothing ended listed as upcoming, months, past list, counts, hero, "ended" notes;
//             the category filter of the events index, by chip click and by ?cat= link, on every date: a chip
//             shows as many upcoming cards as its count, the past list stays whole, one note at most
//   keyboard  skip link, "Saltar a viagem", stage buttons (focusable, visible focus, Enter/Space jump, [ and ]),
//             tabbing into a panel shows it, focus order of the journey, focused ticker links on screen
//   motion    prefers-reduced-motion: no 3D (the scene chunk is never requested), still posters that follow
//             the stages, no panel slide, no ticker animation, no "no 3D" note
//   fallback  no WebGL, ?3d=off and no JavaScript: still posters, the "no 3D" note (PT and EN)
//   contrast  every text run over the journey (panels, header, ticker, stage buttons, skip button, note, hint)
//             at every stage and 8 viewports, worst case over ANY backdrop: its own background layers composited
//             over white and over black, WCAG AA (4.5:1, 3:1 for large text). Independent of the 3D frame.
//   layout    the same viewports (also 320x568 and 740x360): no horizontal overflow or clipped panel text, no
//             overlap between panels, ticker, stage buttons, skip button, disclaimer, the "no 3D" note and the
//             header; a panel that scrolls shows the fade at its bottom until scrolled to the end; on phones,
//             tablet and short landscape also tap targets >= 44x44 px and the 3D disclaimer hidden on phones
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');

const arg = (k, d) => {
  const i = process.argv.indexOf('--' + k);
  return i > -1 ? process.argv[i + 1] : d;
};
const BASE = arg('base', 'http://127.0.0.1:8080/');
const ONLY = arg('only', 'events,keyboard,motion,fallback,contrast,layout').split(',');
const DATES = ['2026-11-23', '2027-01-25', '2027-10-18'];
const STAGE_PROGRESS = [0.04, 0.26, 0.49, 0.73, 0.95]; // inside each panel window (src/home.js)

let failures = 0;
const check = (name, ok, detail = '') => {
  if (!ok) failures++;
  console.log(
    `${ok ? 'ok  ' : 'FAIL'} ${name}${ok || !detail ? '' : '\n     ' + String(detail).split('\n').join('\n     ')}`,
  );
  return ok;
};

const browser = await chromium.launch();
const messages = [];

/** A new page in its own context; records page errors and console errors/warnings. */
async function open(
  path,
  {
    width = 1280,
    height = 800,
    reducedMotion = 'no-preference',
    noWebGL = false,
    js = true,
    touch = false,
  } = {},
) {
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion,
    javaScriptEnabled: js,
    hasTouch: touch,
  });
  if (noWebGL)
    await context.addInitScript(() => {
      const get = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type, ...rest) {
        return /webgl/i.test(type) ? null : get.call(this, type, ...rest);
      };
    });
  const page = await context.newPage();
  const requests = [];
  page.on('request', (r) => requests.push(r.url()));
  page.on('pageerror', (e) => messages.push(`${path}: pageerror ${e}`));
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') messages.push(`${path}: ${m.type()} ${m.text()}`);
  });
  await page.goto(BASE + path, { waitUntil: 'load' });
  page.requests = requests;
  return page;
}
const close = (page) => page.context().close();
const settle = (page, ms = 120) => page.waitForTimeout(ms);

/** Scrolls the journey to progress p (instantly) and waits for the panels to follow. */
async function goToProgress(page, p) {
  await page.evaluate((p) => {
    const jr = document.querySelector('[data-journey]');
    const range = Math.max(1, jr.offsetHeight - innerHeight);
    window.scrollTo({ top: jr.getBoundingClientRect().top + scrollY + p * range, behavior: 'instant' });
  }, p);
  const stage = STAGE_PROGRESS.indexOf(p);
  if (stage > -1)
    await page
      .waitForFunction(
        (s) => getComputedStyle(document.querySelector(`[data-panel="${s}"]`)).opacity === '1',
        stage,
        { timeout: 5000 },
      )
      .catch(() => {});
  await settle(page, 80);
}

// ---------------------------------------------------------------------------------------------
// events

async function testEvents() {
  for (const lang of ['pt', 'en']) {
    const dir = lang === 'pt' ? '' : 'en/';
    const cats =
      lang === 'pt'
        ? ['categorias/auto/', 'categorias/testes/', 'categorias/track-days/']
        : ['categorias/auto-en-2/', 'categorias/testes-en/', 'categorias/track-days-en/'];
    for (const day of DATES) {
      // listings: the events index and category pages (one with events in the coming months, one whose only
      // event ends in January 2027, one without events)
      for (const path of [`${dir}eventos/index.html`, ...cats.map((c) => `${dir}${c}index.html`)]) {
        const page = await open(`${path}?today=${day}`);
        const r = await page.evaluate((day) => {
          const shown = (el) => !!el && el.getClientRects().length > 0;
          const card = (li) => ({
            href: li.querySelector('a').getAttribute('href'),
            start: li.dataset.start,
            end: li.dataset.end,
            cats: li.dataset.cats.split(' '),
            photo: (li.querySelector('img').getAttribute('src') || '').replace(/^.*\/|-[lm]\.webp$/g, ''),
          });
          const up = [...document.querySelectorAll('[data-filter-list]:not([data-ev-past]) > li')].map(card);
          const photo = (src) => (src || '').replace(/^.*\/|-[lm]\.webp$/g, '');
          const past = [...document.querySelectorAll('[data-ev-past] > li')].map(card);
          const months = [...document.querySelectorAll('section[data-month]:not(.month--past)')].map((m) => ({
            shown: shown(m),
            ym: [...m.querySelectorAll('li')].map((li) => li.dataset.start.slice(0, 7)),
            em: m.querySelector('em') && m.querySelector('em').textContent,
          }));
          const hero = document.querySelector('[data-ev-hero]');
          const heroList = hero ? JSON.parse(hero.dataset.evHero) : [];
          const counts = [...document.querySelectorAll('[data-filter] [data-f]')].map((c) => [
            c.dataset.f,
            +c.querySelector('.chip__n').textContent,
          ]);
          const links = [...document.querySelectorAll('a.chip[data-ev-ends]')].map((c) => [
            c.dataset.evEnds
              .split(' ')
              .filter(Boolean)
              .filter((e) => e >= day).length,
            +c.querySelector('.chip__n').textContent,
          ]);
          return {
            up,
            past,
            months,
            hero: hero && hero.querySelector('img').getAttribute('src'),
            wantHero: (heroList.find(([end]) => !end || end >= day) || [])[1],
            heroPhoto: hero && photo(hero.querySelector('img').getAttribute('src')),
            fallbackPhoto: photo((heroList.at(-1) || [])[1]),
            counts,
            links,
            // the note of a category without events is static: <p class="empty"> without the hook
            none: shown(document.querySelector('[data-ev-none]') || document.querySelector('main p.empty')),
            pastShown: shown(document.querySelector('.month--past')),
          };
        }, day);
        const problems = [];
        if (r.up.some((c) => c.end < day)) problems.push('ended event listed as upcoming');
        if (r.past.some((c) => c.end >= day)) problems.push('upcoming event under past events');
        if (r.up.some((c, i) => i && r.up[i - 1].start > c.start))
          problems.push('upcoming not in date order');
        if (r.past.some((c, i) => i && r.past[i - 1].end < c.end))
          problems.push('past list not latest first');
        if (r.months.some((m) => !m.ym.length)) problems.push('empty month left');
        if (r.months.some((m) => new Set(m.ym).size > 1 || (m.ym[0] && m.ym[0].slice(0, 4) !== m.em)))
          problems.push('card under the wrong month');
        if (r.hero !== r.wantHero) problems.push(`hero ${r.hero}, want ${r.wantHero}`);
        // the next event of the page (of its category on a category page), or the circuit
        if (r.heroPhoto !== (r.up.length ? r.up[0].photo : r.fallbackPhoto))
          problems.push(
            `hero ${r.heroPhoto} is not the photo of ${r.up.length ? r.up[0].href : 'the circuit'}`,
          );
        for (const [f, n] of r.counts)
          if (n !== r.up.filter((c) => f === 'all' || c.cats.includes(f)).length)
            problems.push(`chip ${f} ${n}`);
        for (const [want, n] of r.links)
          if (want !== n) problems.push(`category link count ${n}, want ${want}`);
        if (r.none !== !r.up.length)
          problems.push(`"no upcoming events" note shown=${r.none} with ${r.up.length} upcoming`);
        if (r.pastShown !== r.past.length > 0) problems.push('past section visibility');
        check(
          `events ${path} on ${day}: ${r.up.length} upcoming, ${r.past.length} past`,
          !problems.length,
          problems.join('\n'),
        );
        await close(page);
      }
      // event pages: one that ends on 14 Nov 2026 and the one that had ended when the pages were updated
      for (const slug of ['caterham-fest-2026', 'psc-iberica-round-2-2']) {
        const path = `${dir}eventos/${slug}/index.html`;
        const page = await open(`${path}?today=${day}`);
        const r = await page.evaluate((day) => {
          const shown = (el) => !!el && el.getClientRects().length > 0;
          const art = document.querySelector('article[data-end]');
          const more = [...document.querySelectorAll('[data-ev-more] > li')];
          return {
            ended: art.dataset.end < day,
            notes: [...art.querySelectorAll('[data-ev-ended]')].map(shown),
            more: more.map((li) => [li.dataset.start, li.dataset.end, shown(li)]),
            section: shown(document.querySelector('[data-ev-more]')),
          };
        }, day);
        const problems = [];
        if (r.notes.length !== 2 || r.notes.some((s) => s !== r.ended))
          problems.push(`"ended" notes ${r.notes}, ended=${r.ended}`);
        if (r.more.some(([, end]) => end < day)) problems.push('ended event among "other events"');
        if (r.more.some(([, , s], i) => s !== i < 3))
          problems.push('"other events" should show the first three');
        if (r.section !== r.more.length > 0) problems.push('"other events" section visibility');
        check(
          `events ${path} on ${day}: ${r.ended ? 'ended' : 'upcoming'}, ${Math.min(3, r.more.length)} other events`,
          !problems.length,
          problems.join('\n'),
        );
        await close(page);
      }
      // the home page blocks (static render checked by test-events.mjs)
      const page = await open(`${dir}index.html?3d=off&today=${day}`);
      const r = await page.evaluate((day) => {
        const items = (sel) => [...document.querySelectorAll(sel)].map((li) => li.dataset.end);
        const next = document.querySelector('.nextev:not(.nextev--sm)');
        const first = document.querySelector('.mini-cal > li:not([hidden]) a');
        return {
          ended: [
            ...items('.mini-cal > li'),
            ...items('.ticker > li'),
            ...items('.evgrid[data-filter-list] > li'),
          ].filter((e) => e < day).length,
          next: next.hidden ? null : next.getAttribute('href'),
          first: first && first.getAttribute('href'),
        };
      }, day);
      check(
        `events ${dir}index.html on ${day}: nothing ended, next event = first calendar item`,
        !r.ended && r.next === r.first,
        JSON.stringify(r),
      );
      await close(page);
    }
    await testFilter(lang, dir);
  }
}

/**
 * In the page: what the category filter of the events index shows. The chips filter the upcoming cards
 * (their counts count them); the past list is outside the filter.
 */
function filterState() {
  const shown = (el) => !!el && el.getClientRects().length > 0;
  const on = document.querySelector('[data-filter] [data-f].is-on');
  const f = on ? on.dataset.f : 'all';
  const has = (li) => f === 'all' || li.dataset.cats.split(' ').includes(f);
  const up = [...document.querySelectorAll('[data-filter-list]:not([data-ev-past]) > li')];
  const past = [...document.querySelectorAll('[data-ev-past] > li')];
  return {
    f,
    n: on ? +on.querySelector('.chip__n').textContent : -1,
    chips: shown(document.querySelector('[data-filter]')),
    up: up.length,
    shownUp: up.filter(shown).length,
    wrongShown: up.filter((li) => shown(li) && !has(li)).length,
    rightHidden: up.filter((li) => !shown(li) && has(li)).length,
    past: past.length,
    shownPast: past.filter(shown).length,
    pastSection: shown(document.querySelector('.month--past')),
    notes: [...document.querySelectorAll('[data-filter-empty], [data-ev-none]')]
      .filter(shown)
      .map((el) => (el.hasAttribute('data-ev-none') ? 'none' : 'empty')),
  };
}

function filterProblems(s) {
  const problems = [];
  if (!s.up) {
    // nothing upcoming: no chips, only the "no upcoming events" note
    if (s.chips) problems.push('chips shown with no upcoming event');
    if (s.notes.join() !== 'none') problems.push(`notes [${s.notes}], want [none]`);
  } else {
    if (!s.chips) problems.push('chips hidden');
    if (s.shownUp !== s.n) problems.push(`chip ${s.f} reads ${s.n}, shows ${s.shownUp} upcoming`);
    if (s.wrongShown || s.rightHidden)
      problems.push(`chip ${s.f}: ${s.wrongShown} other cards shown, ${s.rightHidden} of its cards hidden`);
    if (s.notes.join() !== (s.n ? '' : 'empty')) problems.push(`chip ${s.f}: notes [${s.notes}]`);
  }
  if (s.shownPast !== s.past) problems.push(`past list shows ${s.shownPast} of ${s.past}`);
  if (s.pastSection !== s.past > 0) problems.push('past section visibility');
  return problems;
}

/** The events index filter, by chip click and by ?cat= link, on the publication date and later ones. */
async function testFilter(lang, dir) {
  const path = `${dir}eventos/index.html`;
  for (const day of ['', ...DATES]) {
    const query = day ? `today=${day}&` : '';
    const problems = [];
    const page = await open(`${path}?${query.slice(0, -1)}`);
    const chips = await page.$$eval('[data-filter] [data-f]', (cs) => cs.map((c) => c.dataset.f));
    const visible = await page.isVisible('[data-filter]');
    for (const f of visible ? [...chips.slice(1), chips[0]] : []) {
      await page.click(`[data-filter] [data-f="${f}"]`);
      await settle(page, 450); // the cards fade out (280 ms) before the grid is filtered
      for (const p of filterProblems(await page.evaluate(filterState))) problems.push(`click: ${p}`);
    }
    await close(page);
    for (const f of chips) {
      const linked = await open(`${path}?${query}cat=${f}`);
      for (const p of filterProblems(await linked.evaluate(filterState))) problems.push(`?cat=${f}: ${p}`);
      await close(linked);
    }
    check(
      `events ${path}${day ? ` on ${day}` : ''}: every chip, clicked or linked, shows its count; past list whole; one note at most`,
      !problems.length,
      [...new Set(problems)].join('\n'),
    );
  }
}

// ---------------------------------------------------------------------------------------------
// keyboard

async function testKeyboard() {
  for (const lang of ['pt', 'en']) {
    const dir = lang === 'pt' ? '' : 'en/';
    const page = await open(`${dir}index.html?3d=off`, { width: 1280, height: 800 });
    await settle(page, 300);
    // 1. the first Tab lands on the skip link, which is then on screen and leads to <main>
    await page.keyboard.press('Tab');
    await settle(page, 350); // the link slides in (top transition)
    const skip = await page.evaluate(() => {
      const a = document.activeElement;
      const r = a.getBoundingClientRect();
      return { cls: a.className, href: a.getAttribute('href'), top: r.top, bottom: r.bottom };
    });
    check(
      `${lang}: first Tab focuses the skip link, visible`,
      skip.cls === 'skip' && skip.top >= 0 && skip.bottom <= 800,
      JSON.stringify(skip),
    );
    await page.keyboard.press('Enter');
    await settle(page);
    check(
      `${lang}: skip link moves focus to <main>`,
      await page.evaluate(() => document.activeElement.id === 'conteudo'),
    );

    // 2. focus order: header, the five panels in order, stage buttons, "Saltar a viagem", ticker, then the calendar
    const order = await page.evaluate(() => {
      const jr = document.querySelector('[data-journey]');
      const focusable = [
        ...document.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])'),
      ].filter((el) => !el.closest('[hidden], .menu, .srch') && !el.disabled && el.tabIndex >= 0);
      const where = (el) =>
        el.closest('.hdr')
          ? 'header'
          : el.closest('[data-panel]')
            ? 'panel' + el.closest('[data-panel]').dataset.panel
            : el.closest('.jr__nav')
              ? 'stages'
              : el.closest('.jr__skip')
                ? 'skip'
                : el.closest('.jr__ticker')
                  ? 'ticker'
                  : jr.contains(el)
                    ? 'journey'
                    : el.closest('#explorar')
                      ? 'calendar'
                      : 'other';
      const seq = [];
      for (const el of focusable) {
        const w = where(el);
        if (seq[seq.length - 1] !== w) seq.push(w);
      }
      return seq;
    });
    const want = [
      'header',
      'panel0',
      'panel1',
      'panel2',
      'panel3',
      'panel4',
      'stages',
      'skip',
      'ticker',
      'calendar',
    ];
    const got = order.filter((w) => want.includes(w));
    check(
      `${lang}: focus order ${want.join(' > ')}`,
      JSON.stringify(got.slice(0, want.length)) === JSON.stringify(want),
      got.join(' > '),
    );

    // 3. tabbing into a panel that is not the current stage brings it on screen
    for (let stage = 0; stage < 5; stage++) {
      await goToProgress(page, STAGE_PROGRESS[(stage + 2) % 5]);
      const r = await page.evaluate((s) => {
        const el = document.querySelector(`[data-panel="${s}"] a[href], [data-panel="${s}"] button`);
        el.focus();
        return new Promise((res) =>
          setTimeout(() => {
            const b = el.getBoundingClientRect();
            const panel = el.closest('[data-panel]');
            res({
              opacity: getComputedStyle(panel).opacity,
              inView: b.top >= 0 && b.bottom <= innerHeight && b.left >= 0 && b.right <= innerWidth,
            });
          }, 400),
        );
      }, stage);
      check(
        `${lang}: focusing panel ${stage + 1} from another stage shows it`,
        r.opacity === '1' && r.inView,
        JSON.stringify(r),
      );
    }
    await page.evaluate(() => document.activeElement.blur());

    // 4. stage buttons: in the tab order, a visible focus ring, Enter and Space jump, [ and ] step
    await goToProgress(page, STAGE_PROGRESS[0]);
    const buttons = await page.$$('[data-goto]');
    check(`${lang}: five stage buttons`, buttons.length === 5);
    for (const [i, key] of [
      [2, 'Enter'],
      [4, ' '],
      [1, 'Enter'],
      [0, ' '],
    ]) {
      await buttons[i].focus();
      await page.keyboard.press('Shift+Tab'); // keyboard focus, so :focus-visible applies
      await page.keyboard.press('Tab');
      const ring = await page.evaluate(() => {
        const s = getComputedStyle(document.activeElement);
        return {
          focused: document.activeElement.dataset.goto,
          outline: s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2,
          visible: document.activeElement.matches(':focus-visible'),
        };
      });
      await page.keyboard.press(key);
      await page
        .waitForFunction(
          (i) => document.querySelector(`[data-goto="${i}"]`).getAttribute('aria-current') === 'step',
          i,
          { timeout: 6000 },
        )
        .catch(() => {});
      await settle(page, 900);
      const current = await page.evaluate(
        () => document.querySelector('[aria-current="step"]')?.dataset.goto,
      );
      const panelOn = await page.evaluate(
        (i) => getComputedStyle(document.querySelector(`[data-panel="${i}"]`)).opacity === '1',
        i,
      );
      check(
        `${lang}: stage button ${i + 1} has a visible focus ring and ${key === ' ' ? 'Space' : key} goes to stage ${i + 1}`,
        ring.focused === String(i) && ring.outline && ring.visible && current === String(i) && panelOn,
        JSON.stringify({ ring, current, panelOn }),
      );
    }
    await page.evaluate(() => document.activeElement.blur());
    await goToProgress(page, STAGE_PROGRESS[2]);
    await page.keyboard.press(']');
    await page
      .waitForFunction(() => document.querySelector('[aria-current="step"]')?.dataset.goto === '3', null, {
        timeout: 6000,
      })
      .catch(() => {});
    const afterNext = await page.evaluate(
      () => document.querySelector('[aria-current="step"]')?.dataset.goto,
    );
    await settle(page, 900);
    await page.keyboard.press('[');
    await page
      .waitForFunction(() => document.querySelector('[aria-current="step"]')?.dataset.goto === '2', null, {
        timeout: 6000,
      })
      .catch(() => {});
    const afterPrev = await page.evaluate(
      () => document.querySelector('[aria-current="step"]')?.dataset.goto,
    );
    check(
      `${lang}: ] and [ step forward and back`,
      afterNext === '3' && afterPrev === '2',
      `${afterNext} ${afterPrev}`,
    );

    // 5. the ticker: every link Tab reaches is on screen (the marquee stops while it holds focus)
    await settle(page, 900);
    await page.focus('.jr__skip');
    const offscreen = [];
    const tickerLinks = await page.$$eval('.jr__ticker a', (as) => as.length);
    for (let i = 0; i < tickerLinks; i++) {
      await page.keyboard.press('Tab');
      await settle(page, 60);
      const r = await page.evaluate(() => {
        const a = document.activeElement;
        const b = a.getBoundingClientRect();
        return {
          inTicker: !!a.closest('.jr__ticker'),
          text: a.textContent.trim().slice(0, 24),
          left: Math.round(b.left),
          right: Math.round(b.right),
        };
      });
      if (!r.inTicker || r.left < 0 || r.right > 1280) offscreen.push(JSON.stringify(r));
    }
    await page.evaluate(() => document.activeElement.blur());
    check(
      `${lang}: the ${tickerLinks} ticker links are on screen when Tab reaches them`,
      tickerLinks > 0 && !offscreen.length,
      offscreen.join('\n'),
    );

    // 6. "Saltar a viagem": on screen, focusable, and the next Tab continues in the calendar section
    await settle(page, 900);
    const jrSkip = await page.$('.jr__skip');
    await jrSkip.focus();
    const skipBox = await jrSkip.boundingBox();
    await page.keyboard.press('Enter');
    await settle(page, 1200);
    await page.keyboard.press('Tab');
    const after = await page.evaluate(() => ({
      inCalendar: !!document.activeElement.closest('#explorar'),
      top: Math.round(document.querySelector('#explorar').getBoundingClientRect().top),
    }));
    check(
      `${lang}: "Saltar a viagem" is on screen and leads past the journey`,
      skipBox &&
        skipBox.y >= 0 &&
        skipBox.y + skipBox.height <= 800 &&
        after.inCalendar &&
        after.top >= -2 &&
        after.top < 160,
      JSON.stringify({ skipBox, after }),
    );
    await close(page);
  }
}

// ---------------------------------------------------------------------------------------------
// reduced motion, no WebGL, ?3d=off, no JavaScript

async function stillsState(page) {
  return page.evaluate(() => {
    const jr = document.querySelector('[data-journey]');
    const loader = jr.querySelector('[data-loader]');
    return {
      no3d: jr.classList.contains('no-3d'),
      is3d: jr.classList.contains('is-3d'),
      posters: jr.querySelectorAll('[data-poster]').length,
      on: [...jr.querySelectorAll('[data-poster].is-on')].map((p) => p.dataset.poster),
      note: loader.classList.contains('is-note') ? loader.querySelector('.jr__load-t').textContent : '',
      noteShown:
        loader.classList.contains('is-note') &&
        getComputedStyle(loader).opacity === '1' &&
        getComputedStyle(loader).display !== 'none',
      want: (window.CE && window.CE.t && window.CE.t.no3d) || '',
    };
  });
}

async function testMotion() {
  for (const lang of ['pt', 'en']) {
    const dir = lang === 'pt' ? '' : 'en/';
    const page = await open(`${dir}index.html`, { reducedMotion: 'reduce' });
    await settle(page, 600);
    const s = await stillsState(page);
    const rm = await page.evaluate(() => document.documentElement.classList.contains('rm'));
    check(
      `${lang}: reduced motion: still posters, no 3D, no note`,
      rm && s.no3d && !s.is3d && s.posters === 5 && s.on.join() === '0' && !s.note,
      JSON.stringify(s),
    );
    check(
      `${lang}: reduced motion: the 3D scene is never downloaded`,
      !page.requests.some((u) => /chunks\/journey-/.test(u)),
    );
    await goToProgress(page, 0.72); // inside the window of panel 4 (0.665-0.79)
    const mid = await page.evaluate(() => ({
      on: [...document.querySelectorAll('[data-poster].is-on')].map((p) => p.dataset.poster),
      transforms: [...document.querySelectorAll('[data-panel]')].map((p) => getComputedStyle(p).transform),
      ticker: getComputedStyle(document.querySelector('.ticker')).animationName,
    }));
    await goToProgress(page, 0.65); // panel 4 fading in (0.635-0.665): its opacity changes, it never slides
    const fade = await page.evaluate(() =>
      [...document.querySelectorAll('[data-panel]')].map((p) => getComputedStyle(p).transform),
    );
    check(
      `${lang}: reduced motion: posters follow the stage, panels never slide, ticker still`,
      mid.on.join() === '3' &&
        [...mid.transforms, ...fade].every((t) => t === 'none') &&
        mid.ticker === 'none',
      JSON.stringify({ mid, fade }),
    );
    await close(page);
  }
}

async function testFallback() {
  for (const lang of ['pt', 'en']) {
    const dir = lang === 'pt' ? '' : 'en/';
    for (const [label, path, opts] of [
      ['no WebGL', `${dir}index.html`, { noWebGL: true }],
      ['no WebGL, ?3d=force', `${dir}index.html?3d=force`, { noWebGL: true }],
      ['?3d=off', `${dir}index.html?3d=off`, {}],
      ['no WebGL on a phone', `${dir}index.html`, { noWebGL: true, width: 390, height: 844, touch: true }],
    ]) {
      const page = await open(path, opts);
      await settle(page, 600);
      const s = await stillsState(page);
      check(
        `${lang}: ${label}: still posters and the "no 3D" note`,
        s.no3d &&
          !s.is3d &&
          s.posters === 5 &&
          s.on.length === 1 &&
          s.note === s.want &&
          s.want &&
          s.noteShown,
        JSON.stringify(s),
      );
      check(
        `${lang}: ${label}: the 3D scene is never downloaded`,
        !page.requests.some((u) => /chunks\/journey-/.test(u)),
      );
      await close(page);
    }
    const page = await open(`${dir}index.html`, { js: false });
    const r = await page.evaluate(() => ({
      poster: getComputedStyle(document.querySelector('[data-poster="0"]')).opacity,
      panel1: getComputedStyle(document.querySelector('[data-panel="0"]')).display,
      cards: document.querySelectorAll('#explorar .evcard').length,
    }));
    check(
      `${lang}: without JavaScript: first poster and panel, calendar cards`,
      r.poster === '1' && r.panel1 !== 'none' && r.cards > 0,
      JSON.stringify(r),
    );
    await close(page);
  }
}

// ---------------------------------------------------------------------------------------------
// contrast and layout

// --viewports 961x900,1100x700 checks other sizes
const VIEWPORTS = arg('viewports', '1440x900,1280x720,820x1180,390x844,360x740,844x390,320x568,740x360')
  .split(',')
  .map((size) => size.split('x').map(Number));

/** In the page: every visible text run over the journey with its worst-case contrast over any backdrop. */
function textRuns() {
  const parse = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return [0, 0, 0, 0];
    const p = m[1]
      .split(/[ ,/]+/)
      .filter(Boolean)
      .map(Number);
    return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
  };
  const lin = (v) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const over = (top, under) => [0, 1, 2].map((i) => top[i] * top[3] + under[i] * (1 - top[3])).concat(1);
  const ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
    return (x + 0.05) / (y + 0.05);
  };
  const runs = [];
  for (const scope of document.querySelectorAll('.jr__panels, .jr__ui, .jr__ticker, .hdr')) {
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    for (let node; (node = walker.nextNode());) {
      if (!node.nodeValue.trim()) continue;
      const el = node.parentElement;
      if (el.closest('svg, .sr, [hidden]')) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility !== 'visible') continue;
      let opacity = 1;
      for (let e = el; e && e !== document.body; e = e.parentElement) opacity *= +getComputedStyle(e).opacity;
      if (opacity < 0.5) continue;
      // the visible part of the text: clipped by scrolling/clipping ancestors and the viewport
      let clip = { l: 0, t: 0, r: innerWidth, b: innerHeight };
      for (let e = el; e && e !== document.body; e = e.parentElement) {
        const s = getComputedStyle(e);
        if (/(auto|scroll|hidden|clip)/.test(s.overflowX + s.overflowY)) {
          const r = e.getBoundingClientRect();
          clip = {
            l: Math.max(clip.l, r.left),
            t: Math.max(clip.t, r.top),
            r: Math.min(clip.r, r.right),
            b: Math.min(clip.b, r.bottom),
          };
        }
      }
      const range = document.createRange();
      range.selectNodeContents(node);
      const rects = [...range.getClientRects()]
        .map((r) => ({
          l: Math.max(r.left, clip.l),
          t: Math.max(r.top, clip.t),
          r: Math.min(r.right, clip.r),
          b: Math.min(r.bottom, clip.b),
        }))
        .filter((r) => r.r - r.l > 2 && r.b - r.t > 4);
      // covered by something else (e.g. the header slid under the preview strip)
      const visible = rects.filter((r) => {
        const top = document.elementFromPoint((r.l + r.r) / 2, (r.t + r.b) / 2);
        return top && (top === el || el.contains(top) || top.contains(el));
      });
      if (!visible.length) continue;
      // text colour: its alpha times the opacity of the elements between it and its nearest background
      const color = parse(cs.color);
      const layers = [];
      let ownOpacity = 1;
      let reachedBg = false;
      for (
        let e = el;
        e && !(e.classList && e.classList.contains('jr__stage')) && e !== document.documentElement;
        e = e.parentElement
      ) {
        const s = getComputedStyle(e);
        const bg = parse(s.backgroundColor);
        if (bg[3] > 0) {
          reachedBg = true;
          layers.unshift(bg);
        }
        if (!reachedBg) ownOpacity *= +s.opacity;
      }
      color[3] *= ownOpacity;
      const worst = Math.min(
        ...[
          [255, 255, 255, 1],
          [0, 0, 0, 1],
        ].map((back) => {
          let bg = back;
          for (const l of layers) bg = over(l, bg);
          return ratio(over(color, bg), bg);
        }),
      );
      const size = parseFloat(cs.fontSize);
      const large = size >= 24 || (size >= 18.66 && parseInt(cs.fontWeight, 10) >= 700);
      const panel = el.closest('[data-panel]');
      runs.push({
        where: panel
          ? 'panel ' + (+panel.dataset.panel + 1)
          : el.closest('.hdr')
            ? 'header'
            : el.closest('.jr__ticker')
              ? 'ticker'
              : el.closest('.jr__nav')
                ? 'stage buttons'
                : el.closest('.jr__skip')
                  ? 'skip button'
                  : el.closest('.jr__note')
                    ? 'disclaimer'
                    : el.closest('.jr__hint')
                      ? 'hint'
                      : el.closest('.jr__load')
                        ? 'note'
                        : 'journey',
        text: node.nodeValue.trim().slice(0, 32),
        worst: Math.round(worst * 100) / 100,
        need: large ? 3 : 4.5,
      });
    }
  }
  return runs;
}

async function testContrast() {
  const report = process.argv.includes('--report'); // also print the lowest ratio per stage and element group
  for (const [width, height] of VIEWPORTS) {
    const page = await open('index.html?3d=off', { width, height, touch: width < 961 });
    // the stage labels show on hover/focus: check them all shown
    await page.addStyleTag({
      content: '.jr__lbl{opacity:1!important;transform:none!important}.hdr{transition:none!important}',
    });
    const fails = [];
    const table = {};
    let total = 0;
    let min = Infinity;
    for (const p of STAGE_PROGRESS) {
      await goToProgress(page, p);
      // the header slides away while scrolling down and comes back on the way up: check it shown
      await page.evaluate(() => document.querySelector('[data-hdr]').classList.remove('is-hidden'));
      await settle(page, 60);
      const runs = await page.evaluate(textRuns);
      total += runs.length;
      for (const r of runs) {
        min = Math.min(min, r.worst / r.need);
        if (r.worst < r.need) fails.push(`t=${p} ${r.where}: "${r.text}" ${r.worst}:1 < ${r.need}:1`);
        const key = `stage ${STAGE_PROGRESS.indexOf(p) + 1} ${r.where}`;
        if (!table[key] || r.worst / r.need < table[key][0] / table[key][1])
          table[key] = [r.worst, r.need, r.text];
      }
    }
    check(
      `contrast ${width}x${height}: ${total} text runs at AA over any backdrop (lowest ${(min * 100).toFixed(0)}% of its threshold)`,
      !fails.length,
      [...new Set(fails)].slice(0, 30).join('\n'),
    );
    if (report)
      for (const [key, [worst, need, text]] of Object.entries(table))
        console.log(
          `     ${width}x${height} ${key.padEnd(24)} ${worst.toFixed(2).padStart(6)}:1 (need ${need}) "${text}"`,
        );
    await close(page);
  }
}

async function testLayout() {
  for (const [width, height] of VIEWPORTS) {
    const touch = width < 961; // tap targets matter on the touch layouts (the panels become bottom sheets)
    const phone = touch && Math.min(width, height) < 700;
    const problems = [];
    for (const lang of ['pt', 'en']) {
      const page = await open(`${lang === 'pt' ? '' : 'en/'}index.html?3d=off`, { width, height, touch });
      await page.addStyleTag({ content: '.hdr,.jr__hint{transition:none!important}' });
      for (const p of [0, ...STAGE_PROGRESS]) {
        await goToProgress(page, p);
        await page.evaluate(() => {
          document.querySelector('[data-hdr]').classList.remove('is-hidden');
          // the "no 3D" note shows for 6 s after loading, whatever the stage: keep it on
          document.querySelector('[data-loader]').classList.add('is-note');
        });
        await settle(page, 60);
        const r = await page.evaluate(
          (stage) => {
            const box = (el) => {
              if (!el || !el.getClientRects().length || getComputedStyle(el).visibility === 'hidden')
                return null;
              for (let e = el; e && e !== document.body; e = e.parentElement)
                if (+getComputedStyle(e).opacity < 0.05) return null;
              const b = el.getBoundingClientRect();
              return b.width && b.height ? { l: b.left, t: b.top, r: b.right, b: b.bottom } : null;
            };
            const panel = document.querySelector(`[data-panel="${stage}"]`);
            const parts = {
              panel: box(panel),
              header: box(document.querySelector('.hdr__bar')),
              stages: box(document.querySelector('.jr__nav')),
              skip: box(document.querySelector('.jr__skip')),
              ticker: box(document.querySelector('.jr__ticker')),
              disclaimer: box(document.querySelector('.jr__note')),
              hint: box(document.querySelector('.jr__hint')),
              note: box(document.querySelector('.jr.no-3d .jr__load.is-note')),
            };
            const overlaps = [];
            const names = Object.keys(parts).filter((k) => parts[k]);
            for (let i = 0; i < names.length; i++)
              for (let j = i + 1; j < names.length; j++) {
                const a = parts[names[i]];
                const b = parts[names[j]];
                const x = Math.min(a.r, b.r) - Math.max(a.l, b.l);
                const y = Math.min(a.b, b.b) - Math.max(a.t, b.t);
                if (x > 1 && y > 1)
                  overlaps.push(`${names[i]}/${names[j]} ${Math.round(x)}x${Math.round(y)}`);
              }
            // clipped or overflowing text inside the panel: horizontally never; vertically only by scrolling
            const clipped = [];
            for (const el of panel.querySelectorAll('*')) {
              if (!el.getClientRects().length) continue;
              const s = getComputedStyle(el);
              if (
                el.scrollWidth > el.clientWidth + 1 &&
                /hidden|clip/.test(s.overflowX) &&
                !/ellipsis/.test(s.textOverflow) &&
                !el.matches('.mini-news__t, .qcard, .sr')
              )
                clipped.push(el.className || el.tagName);
              const b = el.getBoundingClientRect();
              if (b.width && (b.left < -1 || b.right > innerWidth + 1))
                clipped.push('off-screen ' + (el.className || el.tagName));
            }
            // a panel that scrolls fades out at its bottom (.is-more, a mask) while more of it is below
            const scrolls = panel.scrollHeight - panel.clientHeight > 2;
            const fade = (el) =>
              el.classList.contains('is-more') && getComputedStyle(el).maskImage !== 'none';
            const cue = { scrolls, atTop: fade(panel) };
            if (scrolls) {
              panel.scrollTop = panel.scrollHeight;
              panel.dispatchEvent(new Event('scroll'));
              cue.atEnd = fade(panel);
              panel.scrollTop = 0;
              panel.dispatchEvent(new Event('scroll'));
            }
            // tap targets (inline links inside running text are exempt)
            const small = [];
            const targets = [
              ...panel.querySelectorAll('a[href], button'),
              ...document.querySelectorAll(
                '.jr__nav button, .jr__skip, .jr__ticker a, .hdr a[href], .hdr button',
              ),
            ];
            for (const el of targets) {
              const b = box(el);
              if (!b || b.b < 0 || b.t > innerHeight || b.r < 0 || b.l > innerWidth) continue;
              if (el.closest('p') && getComputedStyle(el).display === 'inline') continue;
              const w = b.r - b.l;
              const h = b.b - b.t;
              if (w < 44 - 0.5 || h < 44 - 0.5)
                small.push(
                  `${(el.getAttribute('aria-label') || el.textContent).trim().slice(0, 24)} ${Math.round(w)}x${Math.round(h)}`,
                );
            }
            return {
              overlaps,
              clipped,
              small,
              pageOverflow: document.documentElement.scrollWidth > innerWidth,
              cue,
              disclaimer: !!parts.disclaimer,
            };
          },
          Math.max(0, STAGE_PROGRESS.indexOf(p)),
        );
        const at = `${lang} ${p ? `stage ${STAGE_PROGRESS.indexOf(p) + 1}` : 'start'}`;
        for (const o of r.overlaps) problems.push(`${at}: overlap ${o}`);
        for (const c of new Set(r.clipped)) problems.push(`${at}: clipped ${c}`);
        if (touch) for (const s of new Set(r.small)) problems.push(`${at}: tap target ${s}`);
        if (r.pageOverflow) problems.push(`${at}: horizontal page overflow`);
        if (r.cue.scrolls !== r.cue.atTop || r.cue.atEnd)
          problems.push(`${at}: scroll fade ${JSON.stringify(r.cue)} (want it exactly while more is below)`);
        if (phone && r.disclaimer) problems.push(`${at}: 3D disclaimer shown on a phone`);
      }
      await close(page);
    }
    check(
      `layout ${width}x${height} (pt, en): no overlap, clipping or overflow${touch ? '; tap targets >= 44 px' : ''}${phone ? '; no disclaimer' : ''}`,
      !problems.length,
      [...new Set(problems)].join('\n'),
    );
  }
}

// ---------------------------------------------------------------------------------------------

const tests = {
  events: testEvents,
  keyboard: testKeyboard,
  motion: testMotion,
  fallback: testFallback,
  contrast: testContrast,
  layout: testLayout,
};
for (const name of ONLY) {
  console.log(`\n# ${name}`);
  try {
    await tests[name]();
  } catch (err) {
    check(`${name}: ran to the end`, false, err.stack || err);
  }
}
console.log('');
check('no page errors, console errors or warnings', !messages.length, [...new Set(messages)].join('\n'));
await browser.close();
console.log(failures ? `\n${failures} FAILED` : '\nall site checks passed');
process.exit(failures ? 1 : 0);
