// Opening hours, closures and reservation rules – the single source for the website (calendar, time slots, opening
// status) and for the server (it re-checks every request). All times are wall-clock times in Europe/Zurich.
//
// Published by the restaurant (pizzeriagiardino.ch, 01.11.2026):
//   open 11:00–23:00, Wednesday closed («Mittwoch Ruhetag», also on the entrance door)
//   hot kitchen 11:30–15:00 and 17:00–21:30
//   reservations by phone 10:00–23:00
//   autumn closure 01.11.2026–17.12.2026, open again Friday 18.12.2026
// The food PDF prints different meat-course hours (11.30–14.00 / 17.00–21.00); the website is the master for hours,
// so they are not used here (content/menu-review.md, open question for the owners).
// The `BOOKING` values are not published by the restaurant: they only shape the online request form (no last-seating
// rule, party cap or lead time exists) and are listed under Decisions in HANDOFF.md for the owners to confirm.
//
// Erasable TypeScript only (no enums), so Node can import it with type stripping as well as through Vite.

export const TZ = "Europe/Zurich";

export type Lang4 = "de" | "en" | "fr" | "it";
export type Span = { from: string; to: string };
export type Closure = { id: string; from: string; to: string; reopen: string; title: Record<Lang4, string> };

export const HOURS = {
  /** 0 = Sunday … 6 = Saturday */
  closedWeekdays: [3] as number[],
  open: { from: "11:00", to: "23:00" } as Span,
  kitchen: [
    { from: "11:30", to: "15:00" },
    { from: "17:00", to: "21:30" },
  ] as Span[],
  phone: { from: "10:00", to: "23:00" } as Span,
};

export const CLOSURES: Closure[] = [
  {
    id: "herbst-2026",
    from: "2026-11-01",
    to: "2026-12-17",
    reopen: "2026-12-18",
    title: { de: "Betriebsferien Herbst", en: "Autumn break", fr: "Vacances d’automne", it: "Vacanze d’autunno" },
  },
];

export const BOOKING = {
  /** time slots every n minutes */
  slotMinutes: 15,
  /** the last start time offered is this many minutes before the warm kitchen closes (no rule is published) */
  lastSlotBeforeKitchenClose: 15,
  /** same-day requests closer than this get a hint to phone instead (a hint, not a block) */
  phoneHintMinutes: 120,
  /** larger parties → phone */
  maxPartyOnline: 12,
  minParty: 1,
  /** how far ahead the calendar goes */
  horizonDays: 365,
};

// ---------------------------------------------------------------------------------------------------------------
// civil dates ("YYYY-MM-DD") and minutes since midnight

export const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
export const fromMin = (min: number) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

const pad = (n: number) => String(n).padStart(2, "0");
export const ymd = (y: number, m: number, d: number) => `${y}-${pad(m)}-${pad(d)}`;
export const parseYmd = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return { y, m, d };
};
/** A real calendar date: "2027-02-30" is refused (Date.UTC would roll it over to March). */
export const isYmd = (s: unknown): s is string => {
  if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const [y, m, d] = s.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d));
  return t.getUTCFullYear() === y && t.getUTCMonth() === m - 1 && t.getUTCDate() === d;
};
export const isHhmm = (s: unknown): s is string => typeof s === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(s);

/** 0 = Sunday … 6 = Saturday, for a civil date (independent of time zones). */
export const weekday = (date: string) => {
  const { y, m, d } = parseYmd(date);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
};
export const addDays = (date: string, n: number) => {
  const { y, m, d } = parseYmd(date);
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return ymd(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate());
};
export const daysBetween = (a: string, b: string) => {
  const A = parseYmd(a);
  const B = parseYmd(b);
  return Math.round((Date.UTC(B.y, B.m - 1, B.d) - Date.UTC(A.y, A.m - 1, A.d)) / 86400000);
};

/** The current date and time in Zurich, whatever the visitor's or server's time zone. */
export function zurichNow(at: Date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(at);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const date = ymd(get("year"), get("month"), get("day"));
  return { date, minutes: get("hour") * 60 + get("minute") };
}
export type Now = ReturnType<typeof zurichNow>;

// ---------------------------------------------------------------------------------------------------------------
// days

export const closureOn = (date: string, closures: Closure[] = CLOSURES) => closures.find((c) => date >= c.from && date <= c.to) ?? null;

export type DayState = "open" | "past" | "weekly-closed" | "closure" | "beyond-horizon";
export function dayState(date: string, now: Now, closures: Closure[] = CLOSURES): DayState {
  if (date < now.date) return "past";
  if (daysBetween(now.date, date) > BOOKING.horizonDays) return "beyond-horizon";
  if (closureOn(date, closures)) return "closure";
  if (HOURS.closedWeekdays.includes(weekday(date))) return "weekly-closed";
  return "open";
}

// ---------------------------------------------------------------------------------------------------------------
// time slots

export type SlotState = "available" | "past" | "short-notice";
export type Slot = { time: string; service: "lunch" | "dinner"; state: SlotState };

/** Start times for a day: every 15 min while the warm kitchen is open (11:30–14:45, 17:00–21:15). */
export function slotsFor(date: string, now: Now, closures: Closure[] = CLOSURES): Slot[] {
  if (dayState(date, now, closures) !== "open") return [];
  const slots: Slot[] = [];
  HOURS.kitchen.forEach((span, i) => {
    const last = toMin(span.to) - BOOKING.lastSlotBeforeKitchenClose;
    for (let t = toMin(span.from); t <= last; t += BOOKING.slotMinutes) {
      let state: SlotState = "available";
      if (date === now.date) {
        if (t <= now.minutes) state = "past";
        else if (t - now.minutes < BOOKING.phoneHintMinutes) state = "short-notice";
      }
      slots.push({ time: fromMin(t), service: i === 0 ? "lunch" : "dinner", state });
    }
  });
  return slots;
}

// ---------------------------------------------------------------------------------------------------------------
// validation shared by the form and the server

export type RequestCheck = { date?: unknown; time?: unknown; party?: unknown };
export type ScheduleError =
  | "date-invalid"
  | "date-past"
  | "date-weekly-closed"
  | "date-closure"
  | "date-beyond-horizon"
  | "time-invalid"
  | "time-outside-hours"
  | "time-past"
  | "party-invalid"
  | "party-too-large";

export function checkSchedule(req: RequestCheck, now: Now, closures: Closure[] = CLOSURES): ScheduleError[] {
  const errors: ScheduleError[] = [];
  const party = Number(req.party);
  if (!Number.isInteger(party) || party < BOOKING.minParty) errors.push("party-invalid");
  else if (party > BOOKING.maxPartyOnline) errors.push("party-too-large");
  if (!isYmd(req.date)) {
    errors.push("date-invalid");
    return errors;
  }
  const state = dayState(req.date, now, closures);
  if (state === "past") errors.push("date-past");
  else if (state === "weekly-closed") errors.push("date-weekly-closed");
  else if (state === "closure") errors.push("date-closure");
  else if (state === "beyond-horizon") errors.push("date-beyond-horizon");
  if (!isHhmm(req.time)) {
    errors.push("time-invalid");
    return errors;
  }
  if (state === "open") {
    const slot = slotsFor(req.date, now, closures).find((s) => s.time === req.time);
    if (!slot) errors.push("time-outside-hours");
    else if (slot.state === "past") errors.push("time-past");
  }
  return errors;
}

// ---------------------------------------------------------------------------------------------------------------
// status line ("open now", "closed today", "autumn break until …")

export type OpenStatus =
  | { kind: "open"; until: string; kitchen: Span | null }
  | { kind: "later-today"; from: string }
  | { kind: "closed-now"; next: string; nextFrom: string }
  | { kind: "weekly-closed"; next: string; nextFrom: string }
  | { kind: "closure"; closure: Closure; next: string; nextFrom: string };

export function openStatus(now: Now, closures: Closure[] = CLOSURES): OpenStatus {
  const nextOpenDay = (from: string) => {
    let d = from;
    for (let i = 0; i < 400; i++) {
      if (!closureOn(d, closures) && !HOURS.closedWeekdays.includes(weekday(d))) return d;
      d = addDays(d, 1);
    }
    return from;
  };
  const closure = closureOn(now.date, closures);
  if (closure) return { kind: "closure", closure, next: nextOpenDay(now.date), nextFrom: HOURS.open.from };
  if (HOURS.closedWeekdays.includes(weekday(now.date))) return { kind: "weekly-closed", next: nextOpenDay(now.date), nextFrom: HOURS.open.from };
  const o = toMin(HOURS.open.from);
  const c = toMin(HOURS.open.to);
  if (now.minutes < o) return { kind: "later-today", from: HOURS.open.from };
  if (now.minutes < c) {
    const kitchen = HOURS.kitchen.find((k) => now.minutes >= toMin(k.from) && now.minutes < toMin(k.to)) ?? null;
    return { kind: "open", until: HOURS.open.to, kitchen };
  }
  return { kind: "closed-now", next: nextOpenDay(addDays(now.date, 1)), nextFrom: HOURS.open.from };
}

/** The closures a visitor should hear about: running or starting within `days`. */
export const upcomingClosures = (now: Now, days = 120, closures: Closure[] = CLOSURES) =>
  closures.filter((c) => c.to >= now.date && daysBetween(now.date, c.from) <= days);
