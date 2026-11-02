// Opening hours per place, from the home page of the live site (the venue pages and the Anreise page
// say otherwise; listed as an open question). Every day of the week; no seasonal closing is known.
export type Place = "pizzeria" | "oasis" | "choucalino";
const m = (h: number, min = 0) => h * 60 + min;
export const HOURS: Record<Place, { open: number; close: number; kitchen: boolean }> = {
  pizzeria: { open: m(11), close: m(23), kitchen: true }, // warme Küche 11.00–23.00
  oasis: { open: m(11), close: m(22), kitchen: true }, // warme Küche 11.00–22.00
  choucalino: { open: m(10), close: m(23), kitchen: false }, // offen 10.00–23.00
};
/** "23.00", the Swiss way. */
export const hhmm = (min: number) => `${String(Math.floor(min / 60)).padStart(2, "0")}.${String(min % 60).padStart(2, "0")}`;

/** Minutes since midnight in Leukerbad, whatever the visitor's own time zone. */
export function zurichMinutes(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Zurich", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return (get("hour") % 24) * 60 + get("minute");
}

export function status(place: Place, date = new Date()) {
  const { open, close } = HOURS[place];
  const now = zurichMinutes(date);
  return now >= open && now < close ? { open: true as const, until: close } : { open: false as const, opensAt: open };
}
