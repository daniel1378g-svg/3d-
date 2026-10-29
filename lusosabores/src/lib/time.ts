// Dates in Gland time (Europe/Zurich), whatever the visitor's own time zone.
const parts = (d: Date) => {
  const f = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Zurich", year: "numeric", month: "2-digit", day: "2-digit" });
  const o = Object.fromEntries(f.formatToParts(d).map((p) => [p.type, p.value]));
  return { y: +o.year, m: +o.month, d: +o.day };
};
/** Today in Gland, as a local-midnight Date (used only for its calendar fields). */
export function zurichToday(now = new Date()) {
  const { y, m, d } = parts(now);
  return new Date(y, m - 1, d);
}
export const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
export const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
