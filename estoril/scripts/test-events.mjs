// Checks the "next event" selection (src/events.js) and the event data in the home pages.
// node scripts/test-events.mjs        (exit code 1 on any failure)
import { readFileSync } from 'node:fs';
import { lisbonDate, selectEvents, isOngoing, hasEnded } from '../src/events.js';

const root = new URL('..', import.meta.url).pathname;
let failures = 0;
const check = (name, ok, detail = '') => {
  if (!ok) failures++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${ok || !detail ? '' : '\n     ' + detail}`);
};
const same = (name, got, want) => check(name, JSON.stringify(got) === JSON.stringify(want), `got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`);

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
  next: 'psc', ongoing: true, nextTest: 'winter', list: ['psc', 'caterham', 'anpac', 'endurance'], ticker: ALL,
});
same('2026-11-01: PSC still on (last day)', pick('2026-11-01').next + '/' + pick('2026-11-01').ongoing, 'psc/true');
same('2026-11-02: PSC over, Caterham next, then ANPAC', pick('2026-11-02'), {
  next: 'caterham', ongoing: false, nextTest: 'winter', list: ['caterham', 'anpac', 'endurance', 'winter'], ticker: ALL.slice(1),
});
same('2026-11-08: Caterham next', pick('2026-11-08').next, 'caterham');
same('2026-11-14: Caterham on (last day)', [pick('2026-11-14').next, pick('2026-11-14').ongoing], ['caterham', true]);
same('2026-11-15: ANPAC next, FIM joins the list', pick('2026-11-15'), {
  next: 'anpac', ongoing: false, nextTest: 'winter', list: ['anpac', 'endurance', 'winter', 'fim'], ticker: ALL.slice(2),
});
same('2027-01-24: Winter Series on, still the next test', [pick('2027-01-24').next, pick('2027-01-24').ongoing, pick('2027-01-24').nextTest], ['winter', true, 'winter']);
same('2027-01-25: no testing event left', [pick('2027-01-25').next, pick('2027-01-25').nextTest], ['fim', null]);
same('2027-05-02: one-day event is on that day', [pick('2027-05-02').next, pick('2027-05-02').ongoing], ['fim', true]);
same('2027-10-18: everything over', pick('2027-10-18'), { next: null, ongoing: false, nextTest: null, list: [], ticker: [] });
check('missing end = one-day event', hasEnded({ start: '2027-05-02' }, '2027-05-03') && !hasEnded({ start: '2027-05-02' }, '2027-05-02'));
check('undated item never ends', !hasEnded({}, '2099-01-01') && !isOngoing({}, '2099-01-01'));

// ---------------------------------------------------------------------------------------------
// 2. Lisbon calendar date from an instant, whatever the time zone of this process (try TZ=...).
const at = (iso) => pick(lisbonDate(new Date(iso)));
// winter time (WET = UTC+0): PSC ends 1 Nov 2026
same('2026-11-01T23:59:59Z is 1 Nov in Lisbon: PSC on', [lisbonDate(new Date('2026-11-01T23:59:59Z')), at('2026-11-01T23:59:59Z').next], ['2026-11-01', 'psc']);
same('2026-11-02T00:00:00Z is 2 Nov in Lisbon: Caterham next', [lisbonDate(new Date('2026-11-02T00:00:00Z')), at('2026-11-02T00:00:00Z').next], ['2026-11-02', 'caterham']);
// summer time (WEST = UTC+1): Estoril Classics ends 10 Oct 2027; Lisbon midnight is 23:00 UTC
same('2027-10-10T22:59:59Z is 10 Oct in Lisbon: Classics on', [lisbonDate(new Date('2027-10-10T22:59:59Z')), at('2027-10-10T22:59:59Z').next, at('2027-10-10T22:59:59Z').ongoing], ['2027-10-10', 'classics', true]);
same('2027-10-10T23:00:00Z is 11 Oct in Lisbon (UTC still 10 Oct): WSBK next', [lisbonDate(new Date('2027-10-10T23:00:00Z')), at('2027-10-10T23:00:00Z').next], ['2027-10-11', 'wsbk']);
check('lisbonDate() returns YYYY-MM-DD', /^\d{4}-\d{2}-\d{2}$/.test(lisbonDate()));

// ---------------------------------------------------------------------------------------------
// 3. The home pages: dates on every item, agreeing with the event pages and between languages, and
//    a static render that is right for the day the pages were updated.
const PUBLISHED = '2026-11-08';
const MONTHS = { jan: 1, fev: 2, feb: 2, mar: 3, abr: 4, apr: 4, mai: 5, may: 5, jun: 6, jul: 7, ago: 8, aug: 8, set: 9, sep: 9, out: 10, oct: 10, nov: 11, dez: 12, dec: 12 };
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)(?:="([^"]*)")?/g)].slice(1).map((m) => [m[1], m[2] ?? '']));
const isDay = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && new Date(s + 'T00:00:00Z').toISOString().startsWith(s);
const block = (html, open, close) => {
  const i = html.indexOf(open);
  return i < 0 ? '' : html.slice(i, html.indexOf(close, i));
};
const items = (html) =>
  [...html.matchAll(/<li\b([^>]*)>\s*<a href="([^"]+)"([^>]*)>([\s\S]*?)<\/a><\/li>/g)].map((m) => {
    const a = attrs('<li' + m[1]);
    const day = m[4].match(/class="dateblk"><b>(\d+)<\/b><i>(\w+)<\/i>/);
    return { href: m[2], start: a['data-start'], end: a['data-end'], cats: (a['data-cats'] || '').split(/\s+/).filter(Boolean), hidden: 'hidden' in a, dateblk: day && [+day[1], MONTHS[day[2].toLowerCase()]] };
  });
const card = (html, cls) => {
  const m = html.match(new RegExp(`<a class="${cls}"([^>]*)>`));
  return m ? attrs('<a' + m[1]) : null;
};

const pages = {};
for (const [lang, dir] of [['pt', 'site/'], ['en', 'site/en/']]) {
  const html = readFileSync(root + dir + 'index.html', 'utf8');
  const cal = items(block(html, '<ol class="mini-cal">', '</ol>'));
  const tick = items(block(html, '<ul class="ticker">', '</ul>'));
  const next = card(html, 'nextev');
  const nextTest = card(html, 'nextev nextev--sm');
  pages[lang] = { cal, tick };

  check(`${lang}: blocks found`, cal.length >= 4 && tick.length >= 4 && next && nextTest, `${cal.length} calendar, ${tick.length} ticker items`);
  const problems = [];
  for (const it of [...cal, ...tick]) {
    if (!(isDay(it.start) && isDay(it.end) && it.end >= it.start)) problems.push(`${it.href}: ${it.start} / ${it.end}`);
    // the start date is the one on the event page itself ("13 nov 2026")
    const page = readFileSync(root + dir + it.href, 'utf8').match(/dateblk dateblk--xl"><b>(\d+)<\/b><i>(\w+)<\/i><em>(\d{4})<\/em>/);
    const fromPage = page && `${page[3]}-${String(MONTHS[page[2].toLowerCase()]).padStart(2, '0')}-${page[1].padStart(2, '0')}`;
    if (fromPage !== it.start) problems.push(`${it.href}: data-start ${it.start}, event page ${fromPage}`);
  }
  for (const it of cal) {
    if (!it.dateblk || it.dateblk[0] !== +it.start.slice(8) || it.dateblk[1] !== +it.start.slice(5, 7)) problems.push(`${it.href}: date block ${it.dateblk}, data-start ${it.start}`);
  }
  check(`${lang}: every item has valid dates matching its event page and date block`, !problems.length, problems.join('\n     '));
  check(`${lang}: calendar in date order`, cal.every((it, i) => !i || cal[i - 1].start <= it.start));

  const sel = selectEvents(cal, PUBLISHED);
  same(`${lang}: static calendar shows the next four on ${PUBLISHED}`, cal.filter((it) => !it.hidden).map((it) => it.href), sel.list.map((it) => it.href));
  check(`${lang}: nothing ended is left in the markup on ${PUBLISHED}`, ![...cal, ...tick].some((it) => hasEnded(it, PUBLISHED)));
  same(`${lang}: static next event`, [next.href, next['data-start'], next['data-end']], [sel.next.href, sel.next.start, sel.next.end]);
  same(`${lang}: static next testing event`, [nextTest.href, nextTest['data-start'], nextTest['data-end']], [sel.nextTest.href, sel.nextTest.start, sel.nextTest.end]);
  same(`${lang}: ticker lists the same upcoming events`, tick.map((it) => it.href), sel.upcoming.map((it) => it.href));
}
const dates = (list) => list.map((it) => [it.href, it.start, it.end, it.cats.join(' ')]);
same('pt and en calendars agree', dates(pages.en.cal), dates(pages.pt.cal));
same('pt and en tickers agree', dates(pages.en.tick), dates(pages.pt.tick));

console.log(failures ? `\n${failures} FAILED` : '\nall event checks passed');
process.exit(failures ? 1 : 0);
