// The latest day to order a "sur commande" dish. Closed days from the live site: Sunday (0) and Monday (1).
// Dates are calendar days in Geneva time (see time.ts).
import { addDays, genevaToday, isClosedDay } from "./time";

/** 72 hours (three days) before the visit; if that day is closed, step back to the last open day. */
export function orderDeadline(visit: Date): Date {
  let d = addDays(visit, -3);
  while (isClosedDay(d)) d = addDays(d, -1);
  return d;
}

/** A visit can't be on a closed day, and its order deadline can't already have passed. */
export function canVisit(visit: Date, today = genevaToday()) {
  return !isClosedDay(visit) && orderDeadline(visit).getTime() >= today.getTime();
}
