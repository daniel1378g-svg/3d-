// Date-driven "next event" blocks of the home page (site/index.html, site/en/index.html).
//
// The journey panels list events in four places:
//   panel 1   .nextev                 the next event that has not ended yet
//   panel 2   .nextev.nextev--sm      the next TESTES (testing) event
//   panel 3   .mini-cal               the next four events
//   bottom    .jr__ticker .ticker     every upcoming event
//
// Every <li> of .mini-cal and .ticker carries its dates, and .mini-cal items also their categories:
//   data-start="YYYY-MM-DD" data-end="YYYY-MM-DD"   calendar dates in Europe/Lisbon (end = start for a
//                                                    one-day event)
//   data-cats="auto testes"                          category slugs, as on the home page event cards
// .mini-cal must list every upcoming event in date order; items past the first four stay `hidden`.
// The two .nextev cards are views of it: they are re-rendered from the chosen .mini-cal item (link,
// title, and the "date · organiser" line of its <small>), and carry that item's data-start/data-end.
//
// An event is upcoming (or ongoing) until the end of its end date in Lisbon. Dates are compared as
// YYYY-MM-DD strings, so the visitor's own time zone never matters. An item without dates never ends.
//
// The static HTML is rendered for the day it was published, so the page is right without JS; this
// script keeps it right on later days. ?today=YYYY-MM-DD overrides the date (for checking a layout).

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
    ? [...titleEl.childNodes].filter((n) => n.nodeType === 3).map((n) => n.nodeValue).join('').trim()
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
  if (!calendar && !ticker) return;

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
  }

  render();
  // a page left open past midnight (or restored from a background tab) catches up
  document.addEventListener('visibilitychange', () => document.hidden || render());
  setInterval(render, 30 * 60 * 1000);
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
