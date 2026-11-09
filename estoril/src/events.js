// Date-driven event blocks: the home page (site/index.html, site/en/index.html, through src/home.js) and
// the events pages (site/eventos, site/categorias and their English twins, through src/events-page.js).
//
// The journey panels list events in four places:
//   panel 1   .nextev                 the next event that has not ended yet
//   panel 2   .nextev.nextev--sm      the next TESTES (testing) event
//   panel 3   .mini-cal               the next four events
//   bottom    .jr__ticker .ticker     every upcoming event
// Card grids of upcoming events (.evgrid[data-filter-list]: the home page's calendar section, the events
// index and the category pages, one grid per month) carry the per-category counts of the filter chips of
// their group ([data-filter] [data-f] .chip__n; the group is the parent of [data-filter], as in site.js).
// The chips filter these upcoming cards only, so a chip's count is what it shows.
// The events pages add (every hook is optional):
//   section[data-month]            a month of upcoming events: removed once its last card has ended
//   .evgrid[data-ev-past]          "past events", outside the filter (no data-filter-list): ended cards
//                                  move here, latest first, and are always shown; its section is shown
//                                  once it holds a card
//   [data-ev-none]                 shown when no upcoming card is left; the filter chips and the
//                                  per-category note ([data-filter-empty]) are hidden then
//   [data-ev-hero]                 the page hero: JSON [[end, src, width, height], ...], the page's own
//                                  upcoming events in date order (a category page lists only its
//                                  category's); it shows the first one not ended (a last entry with
//                                  end "" is the fallback photo of the circuit, for when none is left)
//   a.chip[data-ev-ends]           category links: the count is the number of these end dates not passed
//   .evgrid[data-ev-more="3"]      "other events" on an event page: ended cards go, the first three show,
//                                  and the enclosing section hides when none is left
//   article[data-start][data-end]  an event page: its [data-ev-ended] tag and note show once it has ended
//
// Every <li> of .mini-cal, .ticker and .evgrid carries its dates, and .mini-cal and grid items their categories:
//   data-start="YYYY-MM-DD" data-end="YYYY-MM-DD"   calendar dates in Europe/Lisbon (end = start for a
//                                                    one-day event)
//   data-cats="auto testes"                          category slugs, as on the event cards
// .mini-cal must list every upcoming event in date order; items past the first four stay `hidden`.
// The two .nextev cards are views of it: they are re-rendered from the chosen .mini-cal item (link,
// title, and the "date · organiser" line of its <small>), and carry that item's data-start/data-end.
//
// An event is upcoming (or ongoing) until the end of its end date in Lisbon. Dates are compared as
// YYYY-MM-DD strings, so the visitor's own time zone never matters. An item without dates never ends.
//
// The static HTML is rendered for the day it was published, so the page is right without JS; this
// script keeps it right on later days. ?today=YYYY-MM-DD overrides the date (for checking a layout).
// scripts/test-events.mjs checks the static render; scripts/test-site.mjs the runtime one.

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;
const LIST_SIZE = 4;

let lisbonFormat = null;

/** Today's calendar date in Lisbon ("YYYY-MM-DD") at the instant `now`. */
export function lisbonDate(now = new Date()) {
  try {
    lisbonFormat ||= new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Lisbon',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const part = {};
    for (const { type, value } of lisbonFormat.formatToParts(now)) part[type] = value;
    return `${part.year}-${part.month}-${part.day}`;
  } catch {
    // no time-zone data: the device's own calendar date is the best remaining guess
    const pad = (n) => String(n).padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  }
}

/** An event is { start, end, cats } with ISO dates; a missing end means a one-day event. */
export const lastDay = (event) => event.end || event.start || '';

/** True once the whole end date (Lisbon) is over. */
export const hasEnded = (event, today) => {
  const end = lastDay(event);
  return Boolean(end) && end < today;
};

/** True from the first to the last day of the event, inclusive. */
export const isOngoing = (event, today) =>
  Boolean(event.start) && event.start <= today && !hasEnded(event, today);

/**
 * Picks what the home page shows on `today`, keeping the order of `events`:
 * next (first event not ended), nextTest (first TESTES event not ended), list (next four) and
 * upcoming (every event not ended, for the ticker).
 */
export function selectEvents(events, today, listSize = LIST_SIZE) {
  const upcoming = events.filter((event) => !hasEnded(event, today));
  return {
    upcoming,
    next: upcoming[0] || null,
    nextTest: upcoming.find((event) => (event.cats || []).includes('testes')) || null,
    list: upcoming.slice(0, listSize),
  };
}

// ---------------------------------------------------------------------------------------------
// DOM

const readItem = (li) => ({
  el: li,
  start: li.dataset.start || '',
  end: li.dataset.end || '',
  cats: (li.dataset.cats || '').split(/\s+/).filter(Boolean),
});

const readList = (list) => (list ? [...list.children].filter((el) => el.tagName === 'LI').map(readItem) : []);

const setText = (el, text) => {
  if (el && el.textContent !== text) el.textContent = text;
};

const setAttr = (el, name, value) => {
  if (el.getAttribute(name) !== value) el.setAttribute(name, value);
};

const setHidden = (el, hidden) => {
  if (el.hidden !== hidden) el.hidden = hidden;
};

/** Link, title, date label and organiser of a .mini-cal item ("Title<small>date · organiser</small>"). */
function describe(li) {
  const link = li.querySelector('a');
  const titleEl = li.querySelector('.mini-cal__t');
  const small = titleEl && titleEl.querySelector('small');
  const title = titleEl
    ? [...titleEl.childNodes]
        .filter((n) => n.nodeType === 3)
        .map((n) => n.nodeValue)
        .join('')
        .trim()
    : '';
  const meta = small ? small.textContent : '';
  const cut = meta.indexOf('·');
  return {
    href: link ? link.getAttribute('href') : '',
    title,
    when: (cut < 0 ? meta : meta.slice(0, cut)).trim(),
    organiser: cut < 0 ? '' : meta.slice(cut + 1).trim(),
  };
}

/** Wires the event blocks inside `root` and keeps them current while the page stays open. */
export function initEvents(root = document) {
  const scope = root.querySelector('[data-journey]') || root;
  const calendar = scope.querySelector('.mini-cal');
  const ticker = scope.querySelector('.jr__ticker .ticker');
  const cards = [
    { el: scope.querySelector('.nextev:not(.nextev--sm)'), pick: 'next', nowKey: 'ev_now' },
    { el: scope.querySelector('.nextev--sm'), pick: 'nextTest', nowKey: 'ev_now_test' },
  ].filter((card) => card.el);
  const grids = [...root.querySelectorAll('.evgrid[data-filter-list]:not([data-ev-past])')];
  const pastList = root.querySelector('.evgrid[data-ev-past]');
  const more = [...root.querySelectorAll('.evgrid[data-ev-more]')];
  const hero = root.querySelector('[data-ev-hero]');
  const chipLinks = [...root.querySelectorAll('a.chip[data-ev-ends]')];
  const eventPage = root.querySelector('article[data-start][data-end]');
  if (!calendar && !ticker && !grids.length && !more.length && !hero && !chipLinks.length && !eventPage)
    return;

  const strings = (window.CE && window.CE.t) || {};
  // the published kicker ("Próximo evento"), restored when the event is no longer under way
  for (const card of cards) {
    const kicker = card.el.querySelector('.nextev__k');
    card.kicker = kicker;
    card.label = kicker ? kicker.textContent : '';
  }
  const forced = new URLSearchParams(location.search).get('today');
  const today = () => (forced && ISO_DAY.test(forced) ? forced : lisbonDate());

  let renderedFor = '';
  function render() {
    const day = today();
    if (day === renderedFor) return;
    renderedFor = day;

    if (calendar) {
      const items = readList(calendar);
      const picked = selectEvents(items, day);
      for (const item of items) {
        // ended items are removed rather than hidden so the phone layout's li:nth-child(n+4) rule
        // keeps counting from the first upcoming event
        if (hasEnded(item, day)) item.el.remove();
        else {
          setHidden(item.el, !picked.list.includes(item));
          markOngoing(item, day, strings.ev_now);
        }
      }
      for (const card of cards) fillCard(card, picked[card.pick], day, strings[card.nowKey]);
    }
    if (ticker) {
      for (const item of readList(ticker)) if (hasEnded(item, day)) item.el.remove();
      // nothing left to announce: drop the empty bar
      const bar = ticker.closest('.jr__ticker');
      if (bar) setHidden(bar, !ticker.children.length);
    }
    if (grids.length) renderGrids(root, grids, pastList, day);
    for (const list of more) {
      const left = [];
      for (const item of readList(list)) {
        if (hasEnded(item, day)) item.el.remove();
        else left.push(item);
      }
      left.forEach((item, i) => setHidden(item.el, i >= (+list.dataset.evMore || 3)));
      const section = list.closest('section');
      if (section) setHidden(section, !left.length);
    }
    if (hero) renderHero(hero, day);
    for (const chip of chipLinks) {
      const ends = chip.dataset.evEnds.split(/\s+/).filter(Boolean);
      setText(chip.querySelector('.chip__n'), String(ends.filter((end) => !hasEnded({ end }, day)).length));
    }
    if (eventPage) {
      const ended = hasEnded(readItem(eventPage), day);
      for (const el of eventPage.querySelectorAll('[data-ev-ended]')) setHidden(el, !ended);
    }
  }

  render();
  // a page left open past midnight (or restored from a background tab) catches up
  document.addEventListener('visibilitychange', () => document.hidden || render());
  setInterval(render, 30 * 60 * 1000);
}

/**
 * Ended cards leave the upcoming grids: into the past list when the page has one (latest end first), else
 * out of the page. Then empty months go, and the chip counts, the filter and its notes follow.
 */
function renderGrids(root, grids, pastList, day) {
  let changed = false;
  for (const grid of grids)
    for (const item of readList(grid)) {
      if (!hasEnded(item, day)) continue;
      changed = true;
      if (pastList) {
        const end = lastDay(item);
        const after = [...pastList.children].find((li) => lastDay(readItem(li)) < end);
        pastList.insertBefore(item.el, after || null);
        // the past list is outside the filter: always shown, whatever the chip was
        setHidden(item.el, false);
        item.el.classList.remove('is-out');
        item.el.style.transform = item.el.style.transition = '';
      } else item.el.remove();
    }
  if (!changed) return;
  for (const grid of grids) {
    const month = grid.closest('[data-month]');
    if (month && !grid.children.length) month.remove();
  }
  if (pastList) {
    const section = pastList.closest('[data-month]') || pastList;
    setHidden(section, !pastList.children.length);
  }
  const items = grids.filter((grid) => grid.isConnected).flatMap(readList);
  const none = root.querySelector('[data-ev-none]');
  if (none && !items.length) setHidden(none, false);
  for (const filter of root.querySelectorAll('[data-filter]')) applyFilter(filter, items, !items.length);
}

/**
 * Brings a chip group up to date with its cards (site.js wires the chips; the group is the parent of
 * [data-filter]): the counts, and the state of the chip that is on, which site.js may have applied
 * (a ?cat= link) before ended cards moved. With no upcoming card left the chips and the per-category
 * note give way to the [data-ev-none] note.
 */
function applyFilter(filter, allItems, nothingLeft) {
  const group = filter.parentElement;
  const items = allItems.filter((item) => group.contains(item.el));
  const chips = [...filter.querySelectorAll('[data-f]')];
  const on = chips.find((chip) => chip.classList.contains('is-on')) || chips[0];
  const f = on ? on.dataset.f : 'all';
  const shows = (item, cat) => cat === 'all' || item.cats.includes(cat);
  for (const chip of chips)
    setText(chip.querySelector('.chip__n'), String(items.filter((it) => shows(it, chip.dataset.f)).length));
  for (const item of items) setHidden(item.el, !shows(item, f));
  for (const month of group.querySelectorAll('[data-month]'))
    month.classList.toggle('is-empty', ![...month.querySelectorAll('[data-cats]')].some((el) => !el.hidden));
  const empty = group.querySelector('[data-filter-empty]');
  const none = group.querySelector('[data-ev-none]');
  if (nothingLeft && none) setHidden(filter, true);
  if (empty) setHidden(empty, (nothingLeft && Boolean(none)) || items.some((item) => !item.el.hidden));
}

/**
 * Shows the first hero candidate that has not ended ([[end, src, width, height], ...]). Once the published
 * hero's event has ended the browser has usually started on the static image already, so the page
 * downloads both and swaps; this lasts until the pages are rendered again for a later day.
 */
function renderHero(hero, day) {
  let list = [];
  try {
    list = JSON.parse(hero.dataset.evHero);
  } catch {
    return;
  }
  const pick = list.find(([end]) => !hasEnded({ end }, day));
  const img = hero.querySelector('img');
  if (!pick || !img || img.getAttribute('src') === pick[1]) return;
  img.setAttribute('width', String(pick[2]));
  img.setAttribute('height', String(pick[3]));
  img.setAttribute('src', pick[1]);
}

/** Adds (or removes) a "happening now" tag next to the category tags of a .mini-cal item. */
function markOngoing(item, day, label) {
  const tags = item.el.querySelector('.mini-cal__c');
  if (!tags) return;
  let tag = tags.querySelector('[data-ev-now]');
  const on = Boolean(label) && isOngoing(item, day);
  if (on && !tag) {
    tag = document.createElement('span');
    tag.className = 'tag';
    tag.dataset.evNow = '';
    tag.textContent = label;
    tags.prepend(tag);
  } else if (!on && tag) tag.remove();
}

/** Re-renders a .nextev card from the chosen .mini-cal item, or hides it when there is none. */
function fillCard(card, item, day, nowLabel) {
  const el = card.el;
  setHidden(el, !item);
  if (!item) return;
  const event = describe(item.el);
  if (event.href) setAttr(el, 'href', event.href);
  setAttr(el, 'data-start', item.start);
  setAttr(el, 'data-end', lastDay(item));
  setText(el.querySelector('.nextev__d'), event.when);
  setText(el.querySelector('.nextev__t'), event.title);
  setText(el.querySelector('.nextev__o'), event.organiser);
  setText(card.kicker, nowLabel && isOngoing(item, day) ? nowLabel : card.label);
}
