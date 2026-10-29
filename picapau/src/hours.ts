// Opening hours in Geneva time: closed Monday and Tuesday; Wednesday to Sunday 12:00–15:00 and 19:00–23:00.
// Kitchen 12:00–14:00 and 19:00–22:00, last orders 13:30 and 21:30. Terrace from March to October.
import { DAYS, copy } from "./copy";
import type { Lang } from "./i18n";

const OPEN_DAYS = [0, 3, 4, 5, 6]; // Sunday, Wednesday … Saturday
const SERVICES = [
  { open: 12 * 60, close: 15 * 60, kitchen: 14 * 60, last: 13 * 60 + 30 },
  { open: 19 * 60, close: 23 * 60, kitchen: 22 * 60, last: 21 * 60 + 30 },
];
const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/** Day of week, minutes since midnight and month (1–12), in Europe/Zurich. */
export function zurichNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Zurich", weekday: "short", hour: "2-digit", minute: "2-digit", month: "numeric", hourCycle: "h23" }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")), month: Number(get("month")) };
}

export type Status = { open: boolean; label: string; detail: string };

export function status(lang: Lang, date = new Date()): Status {
  const t = copy(lang).ui;
  const { day, minutes } = zurichNow(date);
  if (OPEN_DAYS.includes(day)) {
    const now = SERVICES.find((s) => minutes >= s.open && minutes < s.close);
    if (now) {
      const detail = minutes < now.kitchen ? t.kitchenUntil(hhmm(now.kitchen), hhmm(now.last)) : t.kitchenClosed(hhmm(now.close));
      return { open: true, label: t.open, detail };
    }
    const later = SERVICES.find((s) => minutes < s.open);
    if (later) return { open: false, label: t.closedNow, detail: t.opensAt(hhmm(later.open)) };
  }
  for (let ahead = 1; ahead <= 7; ahead++) {
    const next = (day + ahead) % 7;
    if (!OPEN_DAYS.includes(next)) continue;
    const time = hhmm(SERVICES[0].open);
    return { open: false, label: t.closedNow, detail: ahead === 1 ? t.opensTomorrow(time) : t.opensOn(DAYS[lang][next], time) };
  }
  return { open: false, label: t.closedNow, detail: "" };
}

export const terraceOpen = (date = new Date()) => {
  const { month } = zurichNow(date);
  return month >= 3 && month <= 10;
};
