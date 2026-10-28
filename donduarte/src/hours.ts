// Opening hours. Every service closes after midnight, so 00:30 on a Monday still belongs to Sunday.
export type DayKey = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, as in Date.getDay()
type Service = { open: number; close: number }; // minutes; close is on the next calendar day

const m = (h: number, min = 0) => h * 60 + min;
const MON_THU = { open: m(7), close: m(1) };
const FRI_SAT = { open: m(7), close: m(2) };
const SUN = { open: m(9), close: m(1) };
export const SERVICE: Record<DayKey, Service> = { 0: SUN, 1: MON_THU, 2: MON_THU, 3: MON_THU, 4: MON_THU, 5: FRI_SAT, 6: FRI_SAT };
export const ROWS = [
  { key: "monThu", days: [1, 2, 3, 4], open: "07:00", close: "01:00" },
  { key: "friSat", days: [5, 6], open: "07:00", close: "02:00" },
  { key: "sun", days: [0], open: "09:00", close: "01:00" },
] as const;

export const hhmm = (min: number) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

/** Weekday and minutes in Geneva, whatever the visitor's own time zone. */
export function genevaNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Zurich", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = (["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday")) as DayKey);
  return { day, minutes: (Number(get("hour")) % 24) * 60 + Number(get("minute")) };
}

export function status(date = new Date()) {
  const { day, minutes } = genevaNow(date);
  const prev = ((day + 6) % 7) as DayKey;
  if (minutes < SERVICE[prev].close) return { open: true, serviceDay: prev, until: SERVICE[prev].close };
  if (minutes >= SERVICE[day].open) return { open: true, serviceDay: day, until: SERVICE[day].close };
  return { open: false, serviceDay: day, opensAt: SERVICE[day].open };
}
