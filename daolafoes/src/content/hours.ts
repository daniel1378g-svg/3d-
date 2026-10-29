// The hours from the live site, in Europe/Zurich time: "Mo, Mi – So 9:30 Uhr bis 22:30 Uhr · Ruhetag Dienstag".
import { LOCALE, type Lang } from "@/i18n";

export type Slot = { from: string; to: string };
/** 0 = Sonntag … 6 = Samstag */
export const HOURS: Record<number, Slot[]> = {
  0: [{ from: "09:30", to: "22:30" }],
  1: [{ from: "09:30", to: "22:30" }],
  2: [], // Dienstag: Ruhetag
  3: [{ from: "09:30", to: "22:30" }],
  4: [{ from: "09:30", to: "22:30" }],
  5: [{ from: "09:30", to: "22:30" }],
  6: [{ from: "09:30", to: "22:30" }],
};

const TZ = "Europe/Zurich";
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
/** "09:30" → "9:30", as the site writes times ("9h30" in French). */
export function show(t: string, lang: Lang = "de") {
  const m = toMin(t) % 1440;
  const h = Math.floor(m / 60);
  const mm = String(m % 60).padStart(2, "0");
  return lang === "fr" ? `${h}h${mm}` : `${h}:${mm}`;
}
export const showSlot = (s: Slot, lang: Lang) => `${show(s.from, lang)} – ${show(s.to, lang)}`;
export const showSlots = (slots: Slot[], lang: Lang, closed: string) => (slots.length ? slots.map((s) => showSlot(s, lang)).join(", ") : closed);

/** Now in Schlieren: weekday and minutes since midnight. */
export function localNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = DAYS.indexOf(get("weekday"));
  const hour = Number(get("hour")) % 24;
  return { day, minutes: hour * 60 + Number(get("minute")) };
}

export type Status = { open: boolean; until: string; next: { day: number; from: string } | null };
export function status(now = localNow()): Status {
  for (const s of HOURS[now.day]) if (now.minutes >= toMin(s.from) && now.minutes < toMin(s.to)) return { open: true, until: s.to, next: null };
  for (let d = 0; d < 8; d++) {
    const day = (now.day + d) % 7;
    const first = HOURS[day].find((s) => d > 0 || toMin(s.from) > now.minutes);
    if (first) return { open: false, until: "", next: { day, from: first.from } };
  }
  return { open: false, until: "", next: null };
}

export function dayName(day: number, lang: Lang, form: "long" | "short" = "long") {
  const d = new Date(Date.UTC(2024, 0, 7 + day)); // 7 Jan 2024 was a Sunday
  const s = new Intl.DateTimeFormat(LOCALE[lang], { weekday: form, timeZone: "UTC" }).format(d);
  return s.charAt(0).toUpperCase() + s.slice(1);
}
/** The lines as the site writes them: Mo, Mi – So 9:30 – 22:30 · Dienstag Ruhetag */
export const HOUR_LINES: { days: Record<Lang, string>; slots: Slot[] }[] = [
  { days: { de: "Mo, Mi – So", pt: "Seg, Qua – Dom", fr: "Lun, mer – dim", it: "Lun, mer – dom", en: "Mon, Wed – Sun" }, slots: [{ from: "09:30", to: "22:30" }] },
  { days: { de: "Dienstag", pt: "Terça-feira", fr: "Mardi", it: "Martedì", en: "Tuesday" }, slots: [] },
];
