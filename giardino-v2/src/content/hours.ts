// Opening hours of Pizzeria Giardino, as the live site states them (re-checked 01.11.2026):
//   «Geöffnet von 11:00 bis 23:00 Uhr · Mittwoch Ruhetag · Warme Küche von 11:30 bis 15:00 und von 17:00 bis 21:30 Uhr»
//   «Betriebsferien Herbst: vom 1. November 2026 bis am 17. Dezember 2026 … Freitag, 18. Dezember 2026»
// All times are wall-clock times in Leukerbad (Europe/Zurich). Calendar dates are "YYYY-MM-DD" strings, so daylight
// saving changes never shift a day: the visitor's own time zone is irrelevant, Intl gives the Zurich clock.
import { LOCALE, l, type L, type Lang } from "@/i18n";

export type Slot = { from: string; to: string };
export type Place = "restaurant" | "kitchen";
export const TZ = "Europe/Zurich";

/** Regular week, 0 = Sunday … 6 = Saturday. Wednesday is the rest day. */
const RESTAURANT: Slot[] = [{ from: "11:00", to: "23:00" }];
const KITCHEN: Slot[] = [
  { from: "11:30", to: "15:00" },
  { from: "17:00", to: "21:30" },
];
export const REST_DAYS = [3];
export const WEEK: Record<Place, Record<number, Slot[]>> = {
  restaurant: Object.fromEntries([0, 1, 2, 3, 4, 5, 6].map((d) => [d, REST_DAYS.includes(d) ? [] : RESTAURANT])),
  kitchen: Object.fromEntries([0, 1, 2, 3, 4, 5, 6].map((d) => [d, REST_DAYS.includes(d) ? [] : KITCHEN])),
};
/** Telephone reservations (Tischreservation page): every day 10:00–23:00. */
export const PHONE_HOURS: Slot = { from: "10:00", to: "23:00" };

export type Closure = {
  id: string;
  /** first and last closed day, inclusive */
  from: string;
  to: string;
  /** first day open again, as announced */
  reopens?: string;
  /** the notice appears this many days before `from` (and disappears by itself after `to`) */
  announceDays?: number;
  title: L;
  /** the restaurant's own announcement */
  text: L;
};

/**
 * Date-specific closures. Edit here: they override the weekly hours on every listed day, in the status line, the dial,
 * the drawer and the footer, and their notice expires automatically after the last day.
 */
export const CLOSURES: Closure[] = [
  {
    id: "autumn-2026",
    from: "2026-11-01",
    to: "2026-12-17",
    reopens: "2026-12-18",
    announceDays: 45,
    title: l("Betriebsferien Herbst", "Vacances d’automne", "Autumn company holidays", "Ferie aziendali d’autunno"),
    text: l(
      "Wir haben vom 1. November 2026 bis am 17. Dezember 2026 Betriebsferien und freuen uns, Sie am Freitag, 18. Dezember 2026, wieder zu begrüssen.",
      "Nous sommes en vacances du 1er novembre 2026 au 17 décembre 2026 et nous réjouissons de vous accueillir à nouveau le vendredi 18 décembre 2026.",
      "We are closed from 1 November 2026 to 17 December 2026 and look forward to welcoming you again on Friday, 18 December 2026.",
      "Siamo in ferie dal 1° novembre 2026 al 17 dicembre 2026 e saremo lieti di accogliervi di nuovo venerdì 18 dicembre 2026.",
    ),
  },
];

// ------------------------------------------------------------------ calendar helpers (pure, time-zone free)
export const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const pad = (n: number) => String(n).padStart(2, "0");
/** Day of week of a calendar date, 0 = Sunday. */
export const weekday = (iso: string) => new Date(`${iso}T12:00:00Z`).getUTCDay();
export function addDays(iso: string, n: number) {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

/** The Zurich wall clock for an instant: calendar date, weekday and minutes since midnight. */
export function zurichNow(at: Date = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(at)
      .map((p) => [p.type, p.value]),
  );
  const date = `${parts.year}-${parts.month}-${parts.day}`;
  const minutes = Number(parts.hour) * 60 + Number(parts.minute);
  return { date, day: weekday(date), minutes };
}

export const closureOn = (date: string, list: Closure[] = CLOSURES) => list.find((c) => c.from <= date && date <= c.to) ?? null;

/** The closure to announce today: running, or starting within its announcement window. Null once it has ended. */
export function noticeFor(date: string, list: Closure[] = CLOSURES) {
  return list.filter((c) => date <= c.to && addDays(c.from, -(c.announceDays ?? 30)) <= date).sort((a, b) => a.from.localeCompare(b.from))[0] ?? null;
}

/** The hours that apply on a calendar date (closures first, then the weekly rest day). */
export function slotsOn(place: Place, date: string, list: Closure[] = CLOSURES): Slot[] {
  if (closureOn(date, list)) return [];
  return WEEK[place][weekday(date)];
}

export type Status =
  | { open: true; until: string; closesSoon: boolean }
  | { open: false; next: { date: string; from: string } | null; closure: Closure | null };

/** Open now, or when it next opens (searching up to a year ahead, closures included). */
export function status(place: Place, at: Date = new Date(), list: Closure[] = CLOSURES): Status {
  const now = zurichNow(at);
  const today = slotsOn(place, now.date, list);
  const current = today.find((s) => now.minutes >= toMin(s.from) && now.minutes < toMin(s.to));
  if (current) return { open: true, until: current.to, closesSoon: toMin(current.to) - now.minutes <= 45 };
  const closure = closureOn(now.date, list);
  const later = today.find((s) => now.minutes < toMin(s.from));
  if (later) return { open: false, next: { date: now.date, from: later.from }, closure };
  for (let i = 1; i <= 366; i++) {
    const date = addDays(now.date, i);
    const slots = slotsOn(place, date, list);
    if (slots.length) return { open: false, next: { date, from: slots[0].from }, closure };
  }
  return { open: false, next: null, closure };
}

/** The seven days from today, each with its date and the hours that really apply. */
export function rollingWeek(at: Date = new Date(), list: Closure[] = CLOSURES) {
  const now = zurichNow(at);
  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(now.date, i);
    return { date, day: weekday(date), closure: closureOn(date, list), restaurant: slotsOn("restaurant", date, list), kitchen: slotsOn("kitchen", date, list) };
  });
}

// ------------------------------------------------------------------ formatting
/** "11:00" in every language except French, which writes "11 h" / "11 h 30". */
export function showTime(t: string, lang: Lang) {
  const m = toMin(t);
  const h = Math.floor(m / 60);
  const mm = m % 60;
  if (lang === "fr") return mm ? `${h} h ${pad(mm)}` : `${h} h`;
  return `${pad(h)}:${pad(mm)}`;
}
export const showSlot = (s: Slot, lang: Lang) => `${showTime(s.from, lang)}–${showTime(s.to, lang)}`;
export const showSlots = (slots: Slot[], lang: Lang, closed: string) => (slots.length ? slots.map((s) => showSlot(s, lang)).join(", ") : closed);

/** Day names in the page language, 0 = Sunday. */
export function dayName(day: number, lang: Lang, style: "long" | "short" = "long") {
  const base = new Date(Date.UTC(2024, 0, 7 + day)); // 7 January 2024 was a Sunday
  const s = new Intl.DateTimeFormat(LOCALE[lang], { weekday: style, timeZone: "UTC" }).format(base);
  return s.replace(/\.$/, "");
}
/** "Friday, 18 December 2026" in the page language. */
export function longDate(iso: string, lang: Lang, withWeekday = true) {
  const d = new Date(`${iso}T12:00:00Z`);
  return new Intl.DateTimeFormat(LOCALE[lang], { weekday: withWeekday ? "long" : undefined, day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(d);
}
export function shortDate(iso: string, lang: Lang) {
  const d = new Date(`${iso}T12:00:00Z`);
  return new Intl.DateTimeFormat(LOCALE[lang], { day: "numeric", month: "long", timeZone: "UTC" }).format(d);
}

/** Arcs for the 24-hour dial, in minutes 0–1440. */
export const arcs = (slots: Slot[]) => slots.map((s) => ({ start: toMin(s.from), end: toMin(s.to) }));
