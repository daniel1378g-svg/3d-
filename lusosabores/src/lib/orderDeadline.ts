// Specialities are "préparées uniquement sur demande 48h à l'avance" (live menu page). Calendar days in Gland
// time (see time.ts). The decision: order two days before the visit, by phone, during that day's hours.
import { HOURS } from "@content/hours";
import { addDays, zurichToday } from "./time";

export type Service = "midi" | "soir";

/** Lunch every day; dinner Tuesday to Saturday only. */
export function hasService(day: number, service: Service) {
  return service === "midi" || HOURS[day].length > 1;
}

/** Two days before the visit. The restaurant is open every day, so there is no stepping back over closed days. */
export function orderDeadline(visit: Date): Date {
  return addDays(visit, -2);
}

/** The visit must be at least two days away, and the chosen service must exist that day. */
export function canVisit(visit: Date, service: Service, today = zurichToday()) {
  return visit >= addDays(today, 2) && hasService(visit.getDay(), service);
}
