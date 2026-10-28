// Opening hours in Lausanne time (Europe/Zurich), from content/facts.json: every day from 6:30.
import { CONTACT } from "./content";

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const WEEKDAY = { open: toMin(CONTACT.hours.weekdays[0]), close: toMin(CONTACT.hours.weekdays[1]) };
const WEEKEND = { open: toMin(CONTACT.hours.weekend[0]), close: toMin(CONTACT.hours.weekend[1]) };
const span = (day: number) => (day === 0 || day === 6 ? WEEKEND : WEEKDAY);

/** "6:30", "18:30": the way the live site writes times. */
export const hm = (min: number) => `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}`;

/** Weekday (0 = Sunday), minutes and month in Lausanne, whatever the visitor's own time zone. */
export function lausanneNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Zurich", weekday: "short", hour: "2-digit", minute: "2-digit", month: "numeric", hour12: false }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: (Number(get("hour")) % 24) * 60 + Number(get("minute")), month: Number(get("month")) };
}

export type Status = { open: true; closes: number } | { open: false; opens: number; tomorrow: boolean };

export function status(date = new Date()): Status {
  const { day, minutes } = lausanneNow(date);
  const today = span(day);
  if (minutes >= today.open && minutes < today.close) return { open: true, closes: today.close };
  if (minutes < today.open) return { open: false, opens: today.open, tomorrow: false };
  return { open: false, opens: span((day + 1) % 7).open, tomorrow: true };
}

/** The terrace season, April to October (as on the live site). */
export function terraceSeason(date = new Date()) {
  const { month } = lausanneNow(date);
  return month >= CONTACT.terraceMonths[0] && month <= CONTACT.terraceMonths[1];
}

export const HOURS_ROWS = [
  { key: "weekdays" as const, open: WEEKDAY.open, close: WEEKDAY.close, days: [1, 2, 3, 4, 5] },
  { key: "weekend" as const, open: WEEKEND.open, close: WEEKEND.close, days: [6, 0] },
];
