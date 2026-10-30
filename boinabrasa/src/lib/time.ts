// Opening status in Dielsdorf time (Europe/Zurich), whatever the visitor's clock says.
import { HOURS } from "@/content/facts";

export function zurichNow(d = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Zurich", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { weekday, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export const fmtTime = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

export type Status = { open: true; until: number } | { open: false; next: { inDays: number; weekday: number; at: number } };

export function openStatus(d = new Date()): Status {
  const { weekday, minutes } = zurichNow(d);
  for (const [a, b] of HOURS[weekday]) if (minutes >= a && minutes < b) return { open: true, until: b };
  for (let i = 0; i < 8; i++) {
    const wd = (weekday + i) % 7;
    const slot = HOURS[wd].find(([a]) => i > 0 || a > minutes);
    if (slot) return { open: false, next: { inDays: i, weekday: wd, at: slot[0] } };
  }
  return { open: false, next: { inDays: 0, weekday, at: 0 } };
}
