// Both sets of hours from the live site, in Europe/Zurich time:
// Restaurant: "Mo - Do 11:00 - 22:00 · Freitag 11:00 - 1:00 · Samstag 9:00 - 1:00 · Sonntag 9:00 - 22:00"
// Laden: "Montag Geschlossen · Di - Fr 9:00 - 13:00, 14:00 - 18:00 · Samstag 9:00 - 18:00 · Sonntag 9:00 - 13:00"
import { LOCALE, type Lang } from "@/i18n";

export type Slot = { from: string; to: string }; // "to" past "24:00" runs into the next day: "25:00" = 1:00
export type Place = "restaurant" | "laden";

/** 0 = Sonntag … 6 = Samstag */
export const HOURS: Record<Place, Record<number, Slot[]>> = {
  restaurant: {
    0: [{ from: "09:00", to: "22:00" }],
    1: [{ from: "11:00", to: "22:00" }],
    2: [{ from: "11:00", to: "22:00" }],
    3: [{ from: "11:00", to: "22:00" }],
    4: [{ from: "11:00", to: "22:00" }],
    5: [{ from: "11:00", to: "25:00" }],
    6: [{ from: "09:00", to: "25:00" }],
  },
  laden: {
    0: [{ from: "09:00", to: "13:00" }],
    1: [], // Montag: Geschlossen
    2: [{ from: "09:00", to: "13:00" }, { from: "14:00", to: "18:00" }],
    3: [{ from: "09:00", to: "13:00" }, { from: "14:00", to: "18:00" }],
    4: [{ from: "09:00", to: "13:00" }, { from: "14:00", to: "18:00" }],
    5: [{ from: "09:00", to: "13:00" }, { from: "14:00", to: "18:00" }],
    6: [{ from: "09:00", to: "18:00" }],
  },
};

/** The lines as the site writes them (day names translated, times only change format). */
export const HOUR_LINES: Record<Place, { days: Record<Lang, string>; slots: Slot[] }[]> = {
  restaurant: [
    { days: { de: "Mo - Do", en: "Mon - Thu", pt: "Seg - Qui", fr: "Lun - Jeu", it: "Lun - Gio" }, slots: [{ from: "11:00", to: "22:00" }] },
    { days: { de: "Freitag", en: "Friday", pt: "Sexta-feira", fr: "Vendredi", it: "Venerdì" }, slots: [{ from: "11:00", to: "25:00" }] },
    { days: { de: "Samstag", en: "Saturday", pt: "Sábado", fr: "Samedi", it: "Sabato" }, slots: [{ from: "09:00", to: "25:00" }] },
    { days: { de: "Sonntag", en: "Sunday", pt: "Domingo", fr: "Dimanche", it: "Domenica" }, slots: [{ from: "09:00", to: "22:00" }] },
  ],
  laden: [
    { days: { de: "Montag", en: "Monday", pt: "Segunda-feira", fr: "Lundi", it: "Lunedì" }, slots: [] },
    { days: { de: "Di - Fr", en: "Tue - Fri", pt: "Ter - Sex", fr: "Mar - Ven", it: "Mar - Ven" }, slots: [{ from: "09:00", to: "13:00" }, { from: "14:00", to: "18:00" }] },
    { days: { de: "Samstag", en: "Saturday", pt: "Sábado", fr: "Samedi", it: "Sabato" }, slots: [{ from: "09:00", to: "18:00" }] },
    { days: { de: "Sonntag", en: "Sunday", pt: "Domingo", fr: "Dimanche", it: "Domenica" }, slots: [{ from: "09:00", to: "13:00" }] },
  ],
};

const TZ = "Europe/Zurich";
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
/** "25:00" → "1:00", "09:00" → "9:00", as the site writes times ("9h00" in French). */
export function show(t: string, lang: Lang = "de") {
  const m = toMin(t) % 1440;
  const h = Math.floor(m / 60);
  const mm = String(m % 60).padStart(2, "0");
  return lang === "fr" ? `${h}h${mm}` : `${h}:${mm}`;
}
export const showSlot = (s: Slot, lang: Lang) => `${show(s.from, lang)} - ${show(s.to, lang)}`;
export const showSlots = (slots: Slot[], lang: Lang, closed: string) => (slots.length ? slots.map((s) => showSlot(s, lang)).join(", ") : closed);

/** Day of week and minutes since midnight in Schlieren, wherever the visitor is. */
export function localNow(d = new Date()) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone: TZ, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(d).map((x) => [x.type, x.value]),
  );
  return { day: DAYS.indexOf(p.weekday), minutes: Number(p.hour) * 60 + Number(p.minute) };
}

export type Status = { open: true; until: string } | { open: false; next: { day: number; from: string } | null };
/** Open now, or the next opening; handles Friday and Saturday nights that end at 1:00. */
export function status(place: Place, d = new Date()): Status {
  const { day, minutes } = localNow(d);
  const week = HOURS[place];
  const yesterday = (day + 6) % 7;
  const spill = week[yesterday].find((s) => toMin(s.to) > 1440 && minutes < toMin(s.to) - 1440);
  if (spill) return { open: true, until: spill.to };
  const current = week[day].find((s) => minutes >= toMin(s.from) && minutes < toMin(s.to));
  if (current) return { open: true, until: current.to };
  const later = week[day].find((s) => minutes < toMin(s.from));
  if (later) return { open: false, next: { day, from: later.from } };
  for (let i = 1; i <= 7; i++) {
    const next = (day + i) % 7;
    if (week[next].length) return { open: false, next: { day: next, from: week[next][0].from } };
  }
  return { open: false, next: null };
}

/** Arcs for the 24-hour dial of one day, in minutes 0–1440: that day's slots (cut at midnight) plus the part
 *  of yesterday's slot that runs past midnight. */
export function arcs(place: Place, day: number) {
  const yesterday = (day + 6) % 7;
  const out: { start: number; end: number; spill?: boolean; over?: boolean }[] = [];
  for (const s of HOURS[place][yesterday]) if (toMin(s.to) > 1440) out.push({ start: 0, end: toMin(s.to) - 1440, spill: true });
  for (const s of HOURS[place][day]) out.push({ start: toMin(s.from), end: Math.min(toMin(s.to), 1440), over: toMin(s.to) > 1440 });
  return out;
}

/** Day names in the visitor's language, 0 = Sunday. */
export function dayName(day: number, lang: Lang, style: "long" | "short" | "narrow" = "long") {
  const base = new Date(Date.UTC(2024, 0, 7 + day)); // 7 January 2024 is a Sunday
  return new Intl.DateTimeFormat(LOCALE[lang], { weekday: style, timeZone: "UTC" }).format(base);
}
