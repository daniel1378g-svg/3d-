import SunCalc from "suncalc";
import { CONTACT } from "@/content";

export type Phase = "day" | "golden" | "night";

/** The sun over Stationsstrasse 3 at `date`, as a phase and a direction in three.js space (y up, +z south, +x east). */
export function sunAt(date = new Date()) {
  const { altitude, azimuth } = SunCalc.getPosition(date, CONTACT.lat, CONTACT.lng); // radians; azimuth from south, positive towards west
  const elevation = (altitude * 180) / Math.PI;
  const phase: Phase = elevation > 6 ? "day" : elevation > -6 ? "golden" : "night";
  // Light never comes from below the horizon: at dusk it skims the table from just above it.
  const alt = Math.max(altitude, (3 * Math.PI) / 180);
  const dir: [number, number, number] = [-Math.sin(azimuth) * Math.cos(alt), Math.sin(alt), Math.cos(azimuth) * Math.cos(alt)];
  return { elevation, phase, dir } as const;
}

/** `?sun=2026-06-21T20:45` previews another time of day, read as Winterthur wall-clock time. */
export function sunDate() {
  try {
    const q = new URLSearchParams(window.location.search).get("sun");
    if (q) {
      const hasZone = /([+-]\d\d:?\d\d|Z)$/.test(q);
      const d = new Date(hasZone ? q : `${q}Z`);
      if (Number.isNaN(d.getTime())) return new Date();
      if (hasZone) return d;
      // The same wall-clock time in Europe/Zurich: shift by the zone's offset at that moment.
      const zurich = new Date(d.toLocaleString("en-US", { timeZone: "Europe/Zurich" }));
      const utc = new Date(d.toLocaleString("en-US", { timeZone: "UTC" }));
      return new Date(d.getTime() - (zurich.getTime() - utc.getTime()));
    }
  } catch {
    /* ignore */
  }
  return new Date();
}
