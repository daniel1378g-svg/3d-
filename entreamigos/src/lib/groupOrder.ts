// "Sur commande pour minimum 10 personnes": prices per person from the live carte.
import { HOURS, hasService, type Service } from "@/content/hours";

export const MIN_PERSONS = 10;
/** How many days ahead an order must be placed. The site doesn't say: 0 until the owner answers. */
export const LEAD_DAYS = 0;

/** Indicative only: price per person × people, never fewer than 10. */
export const indicativeTotal = (perPerson: number, persons: number) => perPerson * Math.max(persons, MIN_PERSONS);

/** Calendar days in Europe/Zurich: the day must be at least LEAD_DAYS away and have the chosen service. */
export function canBook(visit: Date, service: Service, today: Date) {
  const earliest = new Date(today);
  earliest.setDate(earliest.getDate() + LEAD_DAYS);
  return visit >= earliest && hasService(visit.getDay(), service) && HOURS[visit.getDay()].length > 0;
}
