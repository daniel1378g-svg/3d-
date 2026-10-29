// Opening hours from the live site ("Nos Horaires :"), in Europe/Zurich time:
// "Lundi : 10h30 – 14h30 · Mardi à samedi : 10h30 – 14h30 + 18h00 – 23h00 · Dimanche : 10h30 – 16h00"
import { LOCALE, type Lang } from "@/i18n";

export type Slot = { from: string; to: string };
const MIDI: Slot = { from: "10:30", to: "14:30" };
const SOIR: Slot = { from: "18:00", to: "23:00" };
const DIMANCHE: Slot = { from: "10:30", to: "16:00" };

/** 0 = dimanche … 6 = samedi */
export const HOURS: Record<number, Slot[]> = { 0: [DIMANCHE], 1: [MIDI], 2: [MIDI, SOIR], 3: [MIDI, SOIR], 4: [MIDI, SOIR], 5: [MIDI, SOIR], 6: [MIDI, SOIR] };

/** The three lines as the site writes them (the day names are translated, the times only change format). */
export const HOUR_LINES: { days: Record<Lang, string>; slots: Slot[] }[] = [
  { days: { fr: "Lundi", en: "Monday", pt: "Segunda-feira", it: "Lunedì", de: "Montag" }, slots: [MIDI] },
  { days: { fr: "Mardi à samedi", en: "Tuesday to Saturday", pt: "Terça a sábado", it: "Da martedì a sabato", de: "Dienstag bis Samstag" }, slots: [MIDI, SOIR] },
  { days: { fr: "Dimanche", en: "Sunday", pt: "Domingo", it: "Domenica", de: "Sonntag" }, slots: [DIMANCHE] },
];

const TZ = "Europe/Zurich";
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** "10h30" in French, "10:30" elsewhere. */
export const fmtTime = (t: string, lang: Lang) => (lang === "fr" ? t.replace(":", "h") : lang === "de" ? t.replace(":", ".") : t);
export const fmtSlot = (s: Slot, lang: Lang) => `${fmtTime(s.from, lang)} – ${fmtTime(s.to, lang)}`;
export const fmtSlots = (slots: Slot[], lang: Lang) => slots.map((s) => fmtSlot(s, lang)).join(" + ");

/** Day of week and minutes since midnight in Chêne-Bougeries, wherever the visitor is. */
export function localNow(d = new Date()) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone: TZ, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(d).map((x) => [x.type, x.value]),
  );
  return { day: DAYS.indexOf(p.weekday), minutes: Number(p.hour) * 60 + Number(p.minute) };
}

export type Status = { open: true; until: string } | { open: false; next: { day: number; from: string } };
/** "Ouvert maintenant · jusqu'à 14h30" or "Fermé maintenant · réouverture …" */
export function status(d = new Date()): Status {
  const { day, minutes } = localNow(d);
  const current = HOURS[day].find((s) => minutes >= toMin(s.from) && minutes < toMin(s.to));
  if (current) return { open: true, until: current.to };
  const later = HOURS[day].find((s) => minutes < toMin(s.from));
  const nextDay = (day + 1) % 7;
  return { open: false, next: later ? { day, from: later.from } : { day: nextDay, from: HOURS[nextDay][0].from } };
}

/** Day names in the visitor's language, 0 = Sunday. */
export function dayName(day: number, lang: Lang, style: "long" | "short" | "narrow" = "long") {
  const base = new Date(Date.UTC(2024, 0, 7 + day)); // 7 January 2024 is a Sunday
  return new Intl.DateTimeFormat(LOCALE[lang], { weekday: style, timeZone: "UTC" }).format(base);
}

export type Service = "midi" | "soir";
/** Lunch every day; dinner Tuesday to Saturday only. */
export const hasService = (day: number, service: Service) => service === "midi" || HOURS[day].length > 1;
