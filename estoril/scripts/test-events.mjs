// Checks the date-driven event data: the "next event" selection (src/events.js), the home pages, and the
// events pages (event pages, events index, category pages) as rendered for the day they were updated.
// node scripts/test-events.mjs        (exit code 1 on any failure)
import { readFileSync, readdirSync } from 'node:fs';
import { lisbonDate, selectEvents, isOngoing, hasEnded } from '../src/events.js';

const root = new URL('..', import.meta.url).pathname;
let failures = 0;
const check = (name, ok, detail = '') => {
  if (!ok) failures++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${ok || !detail ? '' : '\n     ' + detail}`);
};
const same = (name, got, want) =>
  check(
    name,
    JSON.stringify(got) === JSON.stringify(want),
    `got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`,
  );

// ---------------------------------------------------------------------------------------------
// 1. Selection, with the published dates of the events the home page has listed since October
//    (PSC Iberica round 6 was the "next event" until it ended on 1 Nov 2026).
const EVENTS = [
  { id: 'psc', start: '2026-10-31', end: '2026-11-01', cats: ['auto'] },
  { id: 'caterham', start: '2026-11-13', end: '2026-11-14', cats: ['auto'] },
  { id: 'anpac', start: '2026-11-21', end: '2026-11-22', cats: ['auto', 'classicos'] },
  { id: 'endurance', start: '2026-12-04', end: '2026-12-06', cats: ['auto', 'classicos'] },
  { id: 'winter', start: '2027-01-21', end: '2027-01-24', cats: ['auto', 'testes'] },
  { id: 'fim', start: '2027-05-02', end: '2027-05-02', cats: ['motos'] },
  { id: 'classics', start: '2027-10-08', end: '2027-10-10', cats: ['auto', 'classicos'] },
  { id: 'wsbk', start: '2027-10-15', end: '2027-10-17', cats: ['motos'] },
];
const pick = (today) => {
  const s = selectEvents(EVENTS, today);
  return {
    next: s.next && s.next.id,
    ongoing: Boolean(s.next && isOngoing(s.next, today)),
    nextTest: s.nextTest && s.nextTest.id,
    list: s.list.map((e) => e.id),
    ticker: s.upcoming.map((e) => e.id),
  };
};
const ALL = EVENTS.map((e) => e.id);

same('2026-10-31: PSC on its first day', pick('2026-10-31'), {
  next: 'psc',
  ongoing: true,
  nextTest: 'winter',
  list: ['psc', 'caterham', 'anpac', 'endurance'],
  ticker: ALL,
});
same(
  '2026-11-01: PSC still on (last day)',
  pick('2026-11-01').next + '/' + pick('2026-11-01').ongoing,
  'psc/true',
);
same('2026-11-02: PSC over, Caterham next, then ANPAC', pick('2026-11-02'), {
  next: 'caterham',
  ongoing: false,
  nextTest: 'winter',
  list: ['caterham', 'anpac', 'endurance', 'winter'],
  ticker: ALL.slice(1),
});
same('2026-11-08: Caterham next', pick('2026-11-08').next, 'caterham');
same(
  '2026-11-14: Caterham on (last day)',
  [pick('2026-11-14').next, pick('2026-11-14').ongoing],
  ['caterham', true],
);
same('2026-11-15: ANPAC next, FIM joins the list', pick('2026-11-15'), {
  next: 'anpac',
  ongoing: false,
  nextTest: 'winter',
  list: ['anpac', 'endurance', 'winter', 'fim'],
  ticker: ALL.slice(2),
});
same(
  '2027-01-24: Winter Series on, still the next test',
  [pick('2027-01-24').next, pick('2027-01-24').ongoing, pick('2027-01-24').nextTest],
  ['winter', true, 'winter'],
);
same(
  '2027-01-25: no testing event left',
  [pick('2027-01-25').next, pick('2027-01-25').nextTest],
  ['fim', null],
);
same(
  '2027-05-02: one-day event is on that day',
  [pick('2027-05-02').next, pick('2027-05-02').ongoing],
  ['fim', true],
);
same('2027-10-18: everything over', pick('2027-10-18'), {
  next: null,
  ongoing: false,
  nextTest: null,
  list: [],
  ticker: [],
});
check(
  'missing end = one-day event',
  hasEnded({ start: '2027-05-02' }, '2027-05-03') && !hasEnded({ start: '2027-05-02' }, '2027-05-02'),
);
check('undated item never ends', !hasEnded({}, '2099-01-01') && !isOngoing({}, '2099-01-01'));

// ---------------------------------------------------------------------------------------------
// 2. Lisbon calendar date from an instant, whatever the time zone of this process (try TZ=...).
const at = (iso) => pick(lisbonDate(new Date(iso)));
// winter time (WET = UTC+0): PSC ends 1 Nov 2026
same(
  '2026-11-01T23:59:59Z is 1 Nov in Lisbon: PSC on',
  [lisbonDate(new Date('2026-11-01T23:59:59Z')), at('2026-11-01T23:59:59Z').next],
  ['2026-11-01', 'psc'],
);
same(
  '2026-11-02T00:00:00Z is 2 Nov in Lisbon: Caterham next',
  [lisbonDate(new Date('2026-11-02T00:00:00Z')), at('2026-11-02T00:00:00Z').next],
  ['2026-11-02', 'caterham'],
);
// summer time (WEST = UTC+1): Estoril Classics ends 10 Oct 2027; Lisbon midnight is 23:00 UTC
same(
  '2027-10-10T22:59:59Z is 10 Oct in Lisbon: Classics on',
  [
    lisbonDate(new Date('2027-10-10T22:59:59Z')),
    at('2027-10-10T22:59:59Z').next,
    at('2027-10-10T22:59:59Z').ongoing,
  ],
  ['2027-10-10', 'classics', true],
);
same(
  '2027-10-10T23:00:00Z is 11 Oct in Lisbon (UTC still 10 Oct): WSBK next',
  [lisbonDate(new Date('2027-10-10T23:00:00Z')), at('2027-10-10T23:00:00Z').next],
  ['2027-10-11', 'wsbk'],
);
check('lisbonDate() returns YYYY-MM-DD', /^\d{4}-\d{2}-\d{2}$/.test(lisbonDate()));

// ---------------------------------------------------------------------------------------------
// 3. The home pages: dates on every item, agreeing with the event pages and between languages, and
//    a static render that is right for the day the pages were updated.
const PUBLISHED = '2026-11-08';
const MONTHS = {
  jan: 1,
  fev: 2,
  feb: 2,
  mar: 3,
  abr: 4,
  apr: 4,
  mai: 5,
  may: 5,
  jun: 6,
  jul: 7,
  ago: 8,
  aug: 8,
  set: 9,
  sep: 9,
  out: 10,
  oct: 10,
  nov: 11,
  dez: 12,
  dec: 12,
};
const attrs = (tag) =>
  Object.fromEntries([...tag.matchAll(/([\w-]+)(?:="([^"]*)")?/g)].slice(1).map((m) => [m[1], m[2] ?? '']));
const isDay = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && new Date(s + 'T00:00:00Z').toISOString().startsWith(s);
const block = (html, open, close) => {
  const i = html.indexOf(open);
  return i < 0 ? '' : html.slice(i, html.indexOf(close, i));
};
const items = (html) =>
  [...html.matchAll(/<li\b([^>]*)>\s*<a href="([^"]+)"([^>]*)>([\s\S]*?)<\/a><\/li>/g)].map((m) => {
    const a = attrs('<li' + m[1]);
    const day = m[4].match(/class="dateblk"><b>(\d+)<\/b><i>(\w+)<\/i>/);
    return {
      href: m[2],
      start: a['data-start'],
      end: a['data-end'],
      cats: (a['data-cats'] || '').split(/\s+/).filter(Boolean),
      hidden: 'hidden' in a,
      dateblk: day && [+day[1], MONTHS[day[2].toLowerCase()]],
    };
  });
// the calendar section's cards: <li class="evcard" data-start.. data-end.. data-cats..><a class="evcard__a" href=..>
const gridItems = (html) =>
  [
    ...html.matchAll(
      /<li class="evcard[^"]*"([^>]*)>\s*<a class="evcard__a" href="([^"]+)">([\s\S]*?)<\/a>\s*<\/li>/g,
    ),
  ].map((m) => {
    const a = attrs('<li' + m[1]);
    const day = m[3].match(/class="evcard__date"><b>(\d+)<\/b><i>(\w+)<\/i><em>(\d{4})<\/em>/);
    return {
      href: m[2],
      start: a['data-start'],
      end: a['data-end'],
      cats: (a['data-cats'] || '').split(/\s+/).filter(Boolean),
      hidden: 'hidden' in a,
      date:
        day &&
        `${day[3]}-${String(MONTHS[day[2].toLowerCase()]).padStart(2, '0')}-${day[1].padStart(2, '0')}`,
    };
  });
const card = (html, cls) => {
  const m = html.match(new RegExp(`<a class="${cls}"([^>]*)>`));
  return m ? attrs('<a' + m[1]) : null;
};

const pages = {};
for (const [lang, dir] of [
  ['pt', 'site/'],
  ['en', 'site/en/'],
]) {
  const html = readFileSync(root + dir + 'index.html', 'utf8');
  const cal = items(block(html, '<ol class="mini-cal">', '</ol>'));
  const tick = items(block(html, '<ul class="ticker">', '</ul>'));
  const next = card(html, 'nextev');
  const nextTest = card(html, 'nextev nextev--sm');
  const grid = gridItems(block(html, '<ol class="evgrid" data-filter-list>', '</ol>'));
  const chips = Object.fromEntries(
    [
      ...block(html, 'data-filter>', '</div>').matchAll(
        /data-f="(\w+)"[^>]*>[^<]*<span class="chip__n">(\d+)<\/span>/g,
      ),
    ].map((m) => [m[1], +m[2]]),
  );
  pages[lang] = { cal, tick, grid };

  check(
    `${lang}: blocks found`,
    cal.length >= 4 && tick.length >= 4 && next && nextTest,
    `${cal.length} calendar, ${tick.length} ticker items`,
  );
  const problems = [];
  for (const it of [...cal, ...tick]) {
    if (!(isDay(it.start) && isDay(it.end) && it.end >= it.start))
      problems.push(`${it.href}: ${it.start} / ${it.end}`);
    // the start date is the one on the event page itself ("13 nov 2026")
    const page = readFileSync(root + dir + it.href, 'utf8').match(
      /dateblk dateblk--xl"><b>(\d+)<\/b><i>(\w+)<\/i><em>(\d{4})<\/em>/,
    );
    const fromPage =
      page &&
      `${page[3]}-${String(MONTHS[page[2].toLowerCase()]).padStart(2, '0')}-${page[1].padStart(2, '0')}`;
    if (fromPage !== it.start) problems.push(`${it.href}: data-start ${it.start}, event page ${fromPage}`);
  }
  for (const it of grid) {
    if (!(isDay(it.start) && isDay(it.end) && it.end >= it.start))
      problems.push(`grid ${it.href}: ${it.start} / ${it.end}`);
    if (it.date !== it.start) problems.push(`grid ${it.href}: card date ${it.date}, data-start ${it.start}`);
  }
  for (const it of cal) {
    if (!it.dateblk || it.dateblk[0] !== +it.start.slice(8) || it.dateblk[1] !== +it.start.slice(5, 7))
      problems.push(`${it.href}: date block ${it.dateblk}, data-start ${it.start}`);
  }
  check(
    `${lang}: every item has valid dates matching its event page and date block`,
    !problems.length,
    problems.join('\n     '),
  );
  check(
    `${lang}: calendar in date order`,
    cal.every((it, i) => !i || cal[i - 1].start <= it.start),
  );

  const sel = selectEvents(cal, PUBLISHED);
  same(
    `${lang}: static calendar shows the next four on ${PUBLISHED}`,
    cal.filter((it) => !it.hidden).map((it) => it.href),
    sel.list.map((it) => it.href),
  );
  check(
    `${lang}: nothing ended is left in the markup on ${PUBLISHED}`,
    ![...cal, ...tick, ...grid].some((it) => hasEnded(it, PUBLISHED)),
  );
  same(
    `${lang}: static next event`,
    [next.href, next['data-start'], next['data-end']],
    [sel.next.href, sel.next.start, sel.next.end],
  );
  same(
    `${lang}: static next testing event`,
    [nextTest.href, nextTest['data-start'], nextTest['data-end']],
    [sel.nextTest.href, sel.nextTest.start, sel.nextTest.end],
  );
  check(`${lang}: calendar grid found`, grid.length > 0);
  same(
    `${lang}: calendar grid lists the upcoming events on ${PUBLISHED}`,
    grid.map((it) => it.href),
    sel.upcoming.map((it) => it.href),
  );
  const counted = Object.fromEntries(
    Object.keys(chips).map((f) => [f, grid.filter((it) => f === 'all' || it.cats.includes(f)).length]),
  );
  same(`${lang}: filter chip counts match the grid`, chips, counted);
  same(
    `${lang}: ticker lists the same upcoming events`,
    tick.map((it) => it.href),
    sel.upcoming.map((it) => it.href),
  );
}
const dates = (list) => list.map((it) => [it.href, it.start, it.end, it.cats.join(' ')]);
same('pt and en calendars agree', dates(pages.en.cal), dates(pages.pt.cal));
same('pt and en tickers agree', dates(pages.en.tick), dates(pages.pt.tick));
same('pt and en calendar grids agree', dates(pages.en.grid), dates(pages.pt.grid));

// ---------------------------------------------------------------------------------------------
// 4. The events pages (site/eventos, site/categorias and their English twins): every event page carries
//    its dates and an "ended" note shown once it is over; the events index and the category pages list
//    the upcoming events by month (ended ones under "past events"), with counts, hero and "other events"
//    that are right for the day the pages were updated. src/events.js keeps them right later on
//    (scripts/test-site.mjs checks that in a browser).
const MONTH_NAMES = {
  pt: 'janeiro fevereiro março abril maio junho julho agosto setembro outubro novembro dezembro'.split(' '),
  en: 'january february march april may june july august september october november december'.split(' '),
};
const CATEGORY_DIRS = {
  pt: {
    auto: 'auto',
    classicos: 'classicos',
    motos: 'motos',
    outros: 'outros',
    testes: 'testes',
    'track-days': 'track',
  },
  en: {
    'auto-en-2': 'auto',
    'classicos-en': 'classicos',
    'motos-en': 'motos',
    'outros-en': 'outros',
    'testes-en': 'testes',
    'track-days-en': 'track',
  },
};
const slugOf = (href) => (href.match(/([\w-]+)\/index\.html$/) || [])[1];
const read = (path) => readFileSync(root + path, 'utf8');
const ymd = (d, mon, y) =>
  `${y}-${String(MONTHS[mon.toLowerCase()]).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
/** The month sections of a listing page: [{ past, hidden, month: 'YYYY-MM' | null, listAttrs, cards }]. */
const monthSections = (html) =>
  [
    ...html.matchAll(
      /<section class="month( month--past)?" data-month( hidden)?>\s*<h2 class="month__h reveal"><span>([^<]+)<\/span>(?:<em>(\d{4})<\/em>)?<\/h2>\s*<ol ([^>]*)>([\s\S]*?)<\/ol>/g,
    ),
  ].map((m) => ({
    past: Boolean(m[1]),
    hidden: Boolean(m[2]),
    name: m[3],
    year: m[4],
    listAttrs: attrs('<ol ' + m[5] + '>'),
    cards: gridItems(m[6]).map((it) => ({ ...it, slug: slugOf(it.href) })),
  }));
const heroOf = (html) => {
  const m = html.match(
    /<div class="phero__bg" aria-hidden="true" data-ev-hero='([^']+)'><img src="([^"]+)" alt="" width="(\d+)" height="(\d+)"/,
  );
  return m && { list: JSON.parse(m[1]), src: m[2], w: +m[3], h: +m[4] };
};

// every event page: dates, the "ended" note, "other events"
const eventSlugs = {};
const eventDates = {}; // lang -> slug -> { start, end }
for (const [lang, dir] of [
  ['pt', 'site/'],
  ['en', 'site/en/'],
]) {
  const slugs = readdirSync(root + dir + 'eventos', { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
  eventSlugs[lang] = slugs;
  eventDates[lang] = {};
  const problems = [];
  for (const slug of slugs) {
    const html = read(`${dir}eventos/${slug}/index.html`);
    const art = html.match(/<article class="detail detail--event"([^>]*)>/);
    const a = art ? attrs('<article' + art[1] + '>') : {};
    const blk = html.match(/dateblk dateblk--xl"><b>(\d+)<\/b><i>(\w+)<\/i><em>(\d{4})<\/em>/);
    const start = blk && ymd(blk[1], blk[2], blk[3]);
    if (!(isDay(a['data-start']) && isDay(a['data-end']) && a['data-end'] >= a['data-start']))
      problems.push(`${slug}: article dates ${a['data-start']} / ${a['data-end']}`);
    if (a['data-start'] !== start)
      problems.push(`${slug}: data-start ${a['data-start']}, date block ${start}`);
    eventDates[lang][slug] = { start: a['data-start'], end: a['data-end'] };
    // the "ended" tag and note: shown exactly when the event is over
    const notes = [
      ...html.matchAll(/<(?:span|p) class="(?:tag tag--ended|evnote)"[^>]*?data-ev-ended( hidden)?>/g),
    ];
    const ended = hasEnded({ start: a['data-start'], end: a['data-end'] }, PUBLISHED);
    if (notes.length !== 2)
      problems.push(`${slug}: ${notes.length} "ended" elements, want the tag and the note`);
    if (notes.some((n) => Boolean(n[1]) === ended))
      problems.push(`${slug}: "ended" note ${ended ? 'hidden' : 'shown'} on ${PUBLISHED}`);
  }
  check(
    `${lang}: every event page carries its dates and the right "ended" note on ${PUBLISHED}`,
    slugs.length >= 9 && !problems.length,
    problems.join('\n     '),
  );
}
same('pt and en have the same event pages', eventSlugs.en, eventSlugs.pt);
same('pt and en event pages agree on the dates', eventDates.en, eventDates.pt);
{
  // the home page lists the upcoming ones with the same dates
  const fromHome = Object.fromEntries(
    pages.pt.grid.map((it) => [slugOf(it.href), { start: it.start, end: it.end }]),
  );
  const mismatch = Object.entries(fromHome).filter(
    ([slug, d]) => JSON.stringify(eventDates.pt[slug]) !== JSON.stringify(d),
  );
  check('event pages and home page agree on the dates', !mismatch.length, JSON.stringify(mismatch));
}
const ALL_EVENTS = Object.entries(eventDates.pt)
  .map(([slug, d]) => ({ slug, ...d }))
  .sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0));
const UPCOMING = ALL_EVENTS.filter((e) => !hasEnded(e, PUBLISHED));
const PAST = ALL_EVENTS.filter((e) => hasEnded(e, PUBLISHED)).sort((a, b) => (a.end < b.end ? 1 : -1));
const homeCats = Object.fromEntries(pages.pt.grid.map((it) => [slugOf(it.href), it.cats]));
check(
  `some events have ended by ${PUBLISHED} (the pages must handle them)`,
  PAST.length > 0 && UPCOMING.length > 0,
);

const listings = {};
for (const [lang, dir] of [
  ['pt', 'site/'],
  ['en', 'site/en/'],
]) {
  const problems = [];
  const cardDates = (cards, where) => {
    for (const c of cards) {
      const d = eventDates[lang][c.slug];
      if (!d) problems.push(`${where}: ${c.href} is not an event page`);
      else if (c.start !== d.start || c.end !== d.end || c.date !== c.start)
        problems.push(
          `${where}: ${c.slug} card ${c.date} ${c.start}/${c.end}, event page ${d.start}/${d.end}`,
        );
    }
  };

  // "other events" on every event page: every upcoming event but itself, the first three shown
  for (const slug of eventSlugs[lang]) {
    const html = read(`${dir}eventos/${slug}/index.html`);
    const more = gridItems(block(html, '<ol class="evgrid" data-ev-more="3">', '</ol>')).map((it) => ({
      ...it,
      slug: slugOf(it.href),
    }));
    cardDates(more, `${slug} other events`);
    const want = UPCOMING.filter((e) => e.slug !== slug).map((e) => e.slug);
    if (JSON.stringify(more.map((c) => c.slug)) !== JSON.stringify(want))
      problems.push(`${slug}: other events ${more.map((c) => c.slug)}, want ${want}`);
    if (more.some((c, i) => c.hidden !== i >= 3))
      problems.push(`${slug}: other events should show the first three`);
  }

  // the events index
  const html = read(`${dir}eventos/index.html`);
  const sections = monthSections(html);
  const up = sections.filter((s) => !s.past);
  const past = sections.filter((s) => s.past);
  const upCards = up.flatMap((s) => s.cards);
  for (const s of up) {
    if (!s.cards.length) problems.push(`index: empty month ${s.name} ${s.year}`);
    const month = `${s.year}-${String(MONTH_NAMES[lang].indexOf(s.name.toLowerCase()) + 1).padStart(2, '0')}`;
    for (const c of s.cards)
      if (c.start.slice(0, 7) !== month)
        problems.push(`index: ${c.slug} (${c.start}) under ${s.name} ${s.year}`);
    if (!('data-filter-list' in s.listAttrs) || 'data-ev-past' in s.listAttrs)
      problems.push(`index: month ${s.name} list attributes`);
  }
  cardDates([...upCards, ...past.flatMap((s) => s.cards)], 'index');
  same(
    `${lang}: events index lists the upcoming events on ${PUBLISHED}, by month`,
    upCards.map((c) => c.slug),
    UPCOMING.map((e) => e.slug),
  );
  same(
    `${lang}: events index keeps the ended ones under past events, latest first`,
    past.length === 1 && 'data-ev-past' in past[0].listAttrs ? past[0].cards.map((c) => c.slug) : null,
    PAST.map((e) => e.slug),
  );
  check(
    `${lang}: events index past list is outside the category filter (no data-filter-list)`,
    past.every((s) => !('data-filter-list' in s.listAttrs)),
  );
  check(
    `${lang}: nothing ended is listed as upcoming on the events index`,
    !upCards.some((c) => hasEnded(c, PUBLISHED)),
  );
  const chips = Object.fromEntries(
    [
      ...block(html, 'data-filter>', '</div>').matchAll(
        /data-f="(\w+)"[^>]*>[^<]*<span class="chip__n">(\d+)<\/span>/g,
      ),
    ].map((m) => [m[1], +m[2]]),
  );
  same(
    `${lang}: events index chip counts match the upcoming cards`,
    chips,
    Object.fromEntries(
      Object.keys(chips).map((f) => [f, upCards.filter((c) => f === 'all' || c.cats.includes(f)).length]),
    ),
  );
  check(
    `${lang}: events index has the "no upcoming events" note, hidden`,
    /<p class="filters__empty" data-ev-none hidden>[^<]+<\/p>/.test(html),
  );
  const h1 = html.match(/<h1 class="phero__h">([^<]*)<\/h1>/)[1];
  const years = new Set(upCards.map((c) => c.start.slice(0, 4)));
  check(
    `${lang}: events index heading "${h1}" names no year (the list spans ${[...years].join(', ')})`,
    years.size < 2 ? true : !/\d{4}/.test(h1),
  );
  const hero = heroOf(html);
  check(
    `${lang}: events index hero is the next upcoming event's photo`,
    hero &&
      hero.src === hero.list[0][1] &&
      hero.list[0][0] === UPCOMING[0].end &&
      upCards[0] &&
      hero.src.includes(
        read(`${dir}eventos/index.html`).match(
          new RegExp(
            `href="${UPCOMING[0].slug}/index.html">\\s*<span class="evcard__media"><img src="[^"]*media/([^"]+)-m\\.webp`,
          ),
        )[1],
      ),
    hero && hero.src,
  );
  check(
    `${lang}: events index hero candidates are the upcoming events in date order, then a photo of the circuit`,
    hero &&
      JSON.stringify(hero.list.slice(0, -1).map((c) => c[0])) ===
        JSON.stringify(UPCOMING.map((e) => e.end)) &&
      hero.list.at(-1)[0] === '',
  );
  const linked = new Set([...upCards, ...past.flatMap((s) => s.cards)].map((c) => c.slug));
  check(
    `${lang}: every event page is reachable from the events index`,
    eventSlugs[lang].every((s) => linked.has(s)),
    eventSlugs[lang].filter((s) => !linked.has(s)).join(', '),
  );
  listings[lang] = {
    index: [
      upCards.map((c) => [c.slug, c.start, c.end, c.cats.join(' ')]),
      past.flatMap((s) => s.cards).map((c) => c.slug),
      Object.fromEntries(Object.entries(chips).sort()),
    ],
  };

  // the category pages
  for (const [catDir, cat] of Object.entries(CATEGORY_DIRS[lang])) {
    const page = read(`${dir}categorias/${catDir}/index.html`);
    const secs = monthSections(page);
    const cUp = secs.filter((s) => !s.past).flatMap((s) => s.cards);
    const cPast = secs.filter((s) => s.past).flatMap((s) => s.cards);
    cardDates([...cUp, ...cPast], `${catDir}`);
    const inCat = (e) => (homeCats[e.slug] || eventCats(lang, e.slug)).includes(cat);
    const wantUp = UPCOMING.filter(inCat);
    if (JSON.stringify(cUp.map((c) => c.slug)) !== JSON.stringify(wantUp.map((e) => e.slug)))
      problems.push(`${catDir}: upcoming ${cUp.map((c) => c.slug)}, want ${wantUp.map((e) => e.slug)}`);
    const wantPast = PAST.filter(inCat).map((e) => e.slug);
    if (JSON.stringify(cPast.map((c) => c.slug)) !== JSON.stringify(wantPast))
      problems.push(`${catDir}: past ${cPast.map((c) => c.slug)}, want ${wantPast}`);
    for (const s of secs.filter((s) => !s.past))
      if (!s.cards.length) problems.push(`${catDir}: empty month ${s.name}`);
    for (const s of secs.filter((s) => s.past)) {
      if (s.hidden !== !s.cards.length)
        problems.push(`${catDir}: past section hidden=${s.hidden} with ${s.cards.length} cards`);
      if ('data-filter-list' in s.listAttrs) problems.push(`${catDir}: past list carries data-filter-list`);
    }
    // category links: count = the end dates they carry that have not passed = the upcoming events of that category
    for (const m of page.matchAll(
      /<a class="chip[^"]*" href="([^"]+)"[^>]*?data-ev-ends="([^"]*)">[^<]*<span class="chip__n">(\d+)<\/span>/g,
    )) {
      const target =
        m[1] === 'index.html'
          ? cat
          : m[1].includes('eventos/index.html')
            ? 'all'
            : CATEGORY_DIRS[lang][m[1].split('/')[1]];
      const want = UPCOMING.filter((e) => target === 'all' || (homeCats[e.slug] || []).includes(target));
      if (m[2] !== want.map((e) => e.end).join(' ') || +m[3] !== want.length)
        problems.push(`${catDir}: chip ${m[1]} ${m[3]} [${m[2]}], want ${want.length}`);
    }
    if ((page.match(/data-ev-ends=/g) || []).length !== 7)
      problems.push(
        `${catDir}: ${(page.match(/data-ev-ends=/g) || []).length} category links with dates, want 7`,
      );
    // the hero: the category's own upcoming events in date order (their card photos), then the circuit
    const hero = heroOf(page);
    const photo = (src) => src.replace(/^.*\/|-[lm]\.webp$/g, '');
    const cardPhotos = [...page.matchAll(/<section class="month" data-month>[\s\S]*?<\/section>/g)].flatMap(
      (m) => [...m[0].matchAll(/evcard__media"><img src="([^"]+)"/g)].map((p) => photo(p[1])),
    );
    if (
      !hero ||
      hero.src !== hero.list[0][1] ||
      hero.list.at(-1)[0] !== '' ||
      JSON.stringify(hero.list.slice(0, -1).map((c) => c[0])) !== JSON.stringify(wantUp.map((e) => e.end)) ||
      JSON.stringify(hero.list.slice(0, -1).map((c) => photo(c[1]))) !== JSON.stringify(cardPhotos)
    )
      problems.push(`${catDir}: hero ${hero && hero.src} [${hero && hero.list.map((c) => c[0])}]`);
    if (/phero__sub">[^<]*\d{4}/.test(page)) problems.push(`${catDir}: subtitle names a year`);
    if (cUp.length && !/<p class="empty" data-ev-none hidden>/.test(page))
      problems.push(`${catDir}: no hidden "nothing here" note`);
    if (!cUp.length && !/<p class="empty">/.test(page))
      problems.push(`${catDir}: empty category without its note`);
    listings[lang][catDir.replace(/-en(-2)?$/, '')] = [
      cUp.map((c) => c.slug),
      cPast.map((c) => c.slug),
      hero && hero.list.map((c) => c[0]),
    ];
  }
  check(
    `${lang}: category pages, "other events" and card dates are right on ${PUBLISHED}`,
    !problems.length,
    problems.join('\n     '),
  );
}
/** Category slugs of an event without a home page card (ended ones): from its events index card. */
function eventCats(lang, slug) {
  const html = read((lang === 'pt' ? 'site/' : 'site/en/') + 'eventos/index.html');
  const m = html.match(new RegExp(`data-cats="([^"]*)">\\s*<a class="evcard__a" href="${slug}/index.html"`));
  return m ? m[1].split(' ') : [];
}
same('pt and en events pages agree (lists, dates, counts, heroes)', listings.en, listings.pt);

console.log(failures ? `\n${failures} FAILED` : '\nall event checks passed');
process.exit(failures ? 1 : 0);
