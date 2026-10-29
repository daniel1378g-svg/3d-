// The eight services of the live site (names verbatim), each with its live picture and a suggested line.
import type { Keys } from "./keys";

export type Service = { id: string; name: Keys; line: Keys; photo: string };
export const SERVICES: Service[] = [
  { id: "reservierung", name: "svcReservierung", line: "n_svcResLine", photo: "s-degustationen" },
  { id: "hauslieferung", name: "svc1", line: "n_svc1Line", photo: "s-hauslieferung" },
  { id: "degustationen", name: "svc2", line: "n_svc2Line", photo: "s-catering" },
  { id: "hochzeiten", name: "svc3", line: "n_svc3Line", photo: "s-hochzeiten" },
  { id: "taufen", name: "svc4", line: "n_svc4Line", photo: "s-taufen" },
  { id: "kommunionen", name: "svc5", line: "n_svc5Line", photo: "s-kommunionen" },
  { id: "catering", name: "svc6", line: "n_svc6Line", photo: "s-catering" },
  { id: "unterhaltung", name: "svc7", line: "n_svc7Line", photo: "s-unterhaltung" },
];
