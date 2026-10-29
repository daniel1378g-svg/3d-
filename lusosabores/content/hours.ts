// Opening hours from the live contact page (https://www.luso-sabores.ch/contact), in Europe/Zurich time:
// "Lundi & Dimanche 9h00 - 14h00 · Mardi à Samedi 9h00 - 14h00, 17h00 - 22h00".
// Lunch every day, dinner Tuesday to Saturday: "Ouverts 7/7".
export type Slot = { from: string; to: string };
export const MIDI: Slot = { from: "09:00", to: "14:00" };
export const SOIR: Slot = { from: "17:00", to: "22:00" };

/** 0 = dimanche … 6 = samedi */
export const HOURS: Record<number, Slot[]> = {
  0: [MIDI],
  1: [MIDI],
  2: [MIDI, SOIR],
  3: [MIDI, SOIR],
  4: [MIDI, SOIR],
  5: [MIDI, SOIR],
  6: [MIDI, SOIR],
};

/** The hours block of the live contact page, line by line, verbatim. */
export const HOURS_LIVE = [
  { days: "Lundi & Dimanche", slots: ["9h00 - 14h00"] },
  { days: "Mardi à Samedi", slots: ["9h00 - 14h00", "17h00 - 22h00"] },
];

const TZ = "Europe/Zurich";
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** Day of week and minutes since midnight in Gland, wherever the visitor is. */
export function glandNow(d = new Date()) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone: TZ, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(d)
      .map((x) => [x.type, x.value]),
  );
  return { day: DAYS.indexOf(p.weekday), minutes: Number(p.hour) * 60 + Number(p.minute) };
}

/** "Ouvert maintenant · jusqu'à 14h00" or "Fermé maintenant · réouverture …" */
export function status(d = new Date()) {
  const { day, minutes } = glandNow(d);
  const current = HOURS[day].find((s) => minutes >= toMin(s.from) && minutes < toMin(s.to));
  if (current) return { open: true as const, until: current.to };
  const later = HOURS[day].find((s) => minutes < toMin(s.from));
  const nextDay = (day + 1) % 7;
  return { open: false as const, next: later ? { day, from: later.from } : { day: nextDay, from: HOURS[nextDay][0].from } };
}
