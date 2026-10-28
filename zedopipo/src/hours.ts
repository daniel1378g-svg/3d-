// Opening hours: Monday to Saturday, 12:00–14:00 and 19:00–22:30. Sunday is not listed on the live
// site and the story says "Monday to Saturday", so Sunday shows as closed (an open question).
export type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, as Date.getDay()
const m = (h: number, min = 0) => h * 60 + min;
export const SERVICES: [number, number][] = [[m(12), m(14)], [m(19), m(22, 30)]];
export const isOpenDay = (d: Day) => d !== 0;
export const hhmm = (min: number) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

/** Weekday and minutes in Geneva, whatever the visitor's own time zone. */
export function genevaNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Zurich", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday")) as Day;
  return { day, minutes: (Number(get("hour")) % 24) * 60 + Number(get("minute")) };
}

export type Status =
  | { open: true; closesAt: number; minutesLeft: number }
  | { open: false; opensAt: number; when: "today" | "tomorrow" | "monday" };

export function status(date = new Date()): Status {
  const { day, minutes } = genevaNow(date);
  if (isOpenDay(day)) {
    for (const [a, b] of SERVICES) if (minutes >= a && minutes < b) return { open: true, closesAt: b, minutesLeft: b - minutes };
    const next = SERVICES.find(([a]) => minutes < a);
    if (next) return { open: false, opensAt: next[0], when: "today" };
  }
  // after the evening service, or on Sunday: the next lunch
  const tomorrow = ((day + 1) % 7) as Day;
  return { open: false, opensAt: SERVICES[0][0], when: isOpenDay(tomorrow) ? "tomorrow" : "monday" };
}
