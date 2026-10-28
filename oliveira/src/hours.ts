// Opening hours in Winterthur time, from content/hours.json (provisional until the owner confirms them).
import { HOURS } from "./content";

export type DayKey = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, as in Date.getDay()
const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
export const SERVICES: Record<DayKey, { open: number; close: number }[]> = Object.fromEntries(
  Object.entries(HOURS.days).map(([d, list]) => [Number(d), list.map(([o, c]) => ({ open: toMin(o), close: toMin(c) }))]),
) as Record<DayKey, { open: number; close: number }[]>;

export const hhmm = (min: number) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

/** Weekday and minutes in Winterthur, whatever the visitor's own time zone. */
export function zurichNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Zurich", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday")) as DayKey;
  return { day, minutes: (Number(get("hour")) % 24) * 60 + Number(get("minute")) };
}

export type Status =
  | { open: true; until: number; minutesLeft: number }
  | { open: false; opensAt: number; inDays: number; day: DayKey };

export function status(date = new Date()): Status {
  const { day, minutes } = zurichNow(date);
  const now = SERVICES[day].find((s) => minutes >= s.open && minutes < s.close);
  if (now) return { open: true, until: now.close, minutesLeft: now.close - minutes };
  for (let k = 0; k < 8; k++) {
    const d = ((day + k) % 7) as DayKey;
    const next = SERVICES[d].find((s) => k > 0 || s.open > minutes);
    if (next) return { open: false, opensAt: next.open, inDays: k, day: d };
  }
  return { open: false, opensAt: 0, inDays: 0, day };
}

/** Rows for the hours table, Monday first, with consecutive equal days merged. */
export function rows() {
  const order: DayKey[] = [1, 2, 3, 4, 5, 6, 0];
  const out: { days: DayKey[]; text: string }[] = [];
  for (const d of order) {
    const text = SERVICES[d].map((s) => `${hhmm(s.open)}–${hhmm(s.close)}`).join(", ");
    const last = out[out.length - 1];
    if (last && last.text === text) last.days.push(d);
    else out.push({ days: [d], text });
  }
  return out;
}
