// Facts, identical in every language and checked against the live site (www.boinabrasa.ch, October 2026), the
// booking site (dielsdorf.boinabrasa.ch), the voucher shop (coupons.boinabrasa.ch) and the catering site
// (churrascocatering.ch). Change them here only.
import type { Lang } from "@/i18n";

export const NAME = "Boinabrasa";
export const LEGAL_NAME = "Boinabrasa GmbH";
export const ADDRESS = { street: "Honeywell-Platz 1", zip: "8157", city: "Dielsdorf", country: "CH" } as const;
export const PHONE = { display: "043 810 12 12", intl: "+41 43 810 12 12", href: "tel:+41438101212" } as const;
export const EMAIL = "info@boinabrasa.ch";
/** from the Google Maps link on the site's contact page */
export const GEO = { lat: 47.4826314, lng: 8.4661731 } as const;
export const MAPS_URL =
  "https://www.google.com/maps/place/Boinabrasa/@47.4826314,8.4639844,17z/data=!3m1!4b1!4m13!1m7!3m6!1s0x4790737a82f5a613:0x19cc7a1be2564e89!2sHoneywell-Platz+1,+8157+Dielsdorf,+Schweiz!3b1!8m2!3d47.4828252!4d8.4657982!3m4!1s0x4790737a82f5a613:0x5cac892704e452e7!8m2!3d47.4826314!4d8.4661731";
export const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/search/?api=1&query=Boinabrasa%20Dielsdorf%2C%20Honeywell-Platz%201%2C%208157%20Dielsdorf";
export const APPLE_MAPS_URL = "https://maps.apple.com/?address=Honeywell-Platz%201,8157%20Dielsdorf,Switzerland&q=Boinabrasa";
export const WAZE_URL = `https://waze.com/ul?ll=${GEO.lat},${GEO.lng}&navigate=yes`;
export const SOCIAL = {
  facebook: "https://de-de.facebook.com/boinabrasadielsdorf/",
  instagram: "https://www.instagram.com/boinabrasadielsdorf/",
} as const;

export const URLS = {
  menuPdf: "https://www.boinabrasa.ch/images/menukarte/boinabrasa_menu_karte.pdf",
  allergensPdf: "https://www.boinabrasa.ch/images/allergene.pdf",
  vouchers: "https://coupons.boinabrasa.ch/de/",
  catering: "https://www.churrascocatering.ch/",
  dolce: "https://dolcebrigadeiro.ch/",
  silvesterFlyer: "https://www.boinabrasa.ch/images/Sylvester_2026_weiss_final.png",
  liveSite: "https://www.boinabrasa.ch/ch/",
} as const;

/** The booking system (VikRestaurants on dielsdorf.boinabrasa.ch) is in German and English only. */
export const BOOKING_BASE: Record<Lang, string> = {
  de: "https://www.dielsdorf.boinabrasa.ch/de/",
  en: "https://www.dielsdorf.boinabrasa.ch/en/",
  pt: "https://www.dielsdorf.boinabrasa.ch/en/",
  fr: "https://www.dielsdorf.boinabrasa.ch/en/",
  it: "https://www.dielsdorf.boinabrasa.ch/en/",
};
/** The booking form accepts 2–12 people; larger parties go through the group request (from 12 people). */
export const BOOKING_MIN = 2;
export const BOOKING_MAX = 12;
export const GROUP_MIN = 12;
/** online bookings up to 120 days ahead (the widget's own limit) */
export const BOOKING_DAYS_AHEAD = 120;

/**
 * Opens the official search step with people, date and time filled in. The system answers with the free rooms
 * (Hauptsaal / Nebensaal) or says that nothing is free: availability is never decided on this site.
 * Checked on 30.10.2026: `?option=com_vikrestaurants&view=search&date=12.11.2026&hourmin=19:0&people=4`
 * → "Ein Tisch für 4 Person(en) wurde gefunden! Wählen Sie einen Raum aus der Liste aus".
 */
export function bookingUrl(lang: Lang, opts?: { date?: Date; hour?: number; minute?: number; people?: number }) {
  const base = BOOKING_BASE[lang];
  if (!opts?.date || opts.hour === undefined) return base;
  const d = opts.date;
  const date = `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
  const q = new URLSearchParams({ option: "com_vikrestaurants", view: "search", date, hourmin: `${opts.hour}:${opts.minute ?? 0}` });
  if (opts.people && opts.people >= BOOKING_MIN && opts.people <= BOOKING_MAX) q.set("people", String(opts.people));
  return `${base}?${q.toString()}`;
}
export const SILVESTER_URL = (lang: Lang) => `${BOOKING_BASE[lang]}?date=31.12.2026`;

export const PRICES = {
  adult: 68,
  kids0to5: 0,
  kids6to12: 32,
  buffetOnly: 45,
  vat: "8,1",
  silvester: 190,
  corkage: 25,
  corkageMagnum: 50,
  cakeFee: 3,
  groupPackages: [null, 85, 90, 110] as (number | null)[],
} as const;
export const VOUCHER_AMOUNTS = [68, 100, 150, 200, 300, 400, 500];
export const VOUCHER_MOTIFS = ["gaucho", "rindschild", "rio-grande", "caipirinha", "geschenk", "orchideen", "rose", "wunderkerze", "birthday", "danke"] as const;
export type VoucherMotif = (typeof VOUCHER_MOTIFS)[number];

export const CAPACITY = { guests: 150, indoor: 140, terrace: 40, parking: 82, sideRoom: 60, sideRoomExclusiveFrom: 50, restaurantExclusiveFrom: 100, cateringMin: 30, cateringMax: 500 } as const;
export const CATERING_HOTLINE = { display: "044 508 01 65", href: "tel:+41445080165" } as const;
export const FOUNDED = 2013;

/**
 * Opening hours (the site: Mo–Mi geschlossen, Do–Sa 18:00–23:00, So 12:30–16:00 und 18:00–22:00).
 * Minutes from midnight per weekday (0 = Sunday).
 */
export const HOURS: Record<number, [number, number][]> = {
  0: [[12 * 60 + 30, 16 * 60], [18 * 60, 22 * 60]],
  1: [],
  2: [],
  3: [],
  4: [[18 * 60, 23 * 60]],
  5: [[18 * 60, 23 * 60]],
  6: [[18 * 60, 23 * 60]],
};
/**
 * Bookable arrival times offered here, from the site's own rule ("Letzte reservierbare Ankunft: Abends 20:30 Uhr,
 * sonntags mittags 15:00 Uhr") in the booking form's 15-minute steps. The booking system has the final word.
 */
export function arrivalSlots(weekday: number): { label: "lunch" | "dinner"; times: [number, number][] }[] {
  const steps = (from: number, to: number) => {
    const out: [number, number][] = [];
    for (let m = from; m <= to; m += 15) out.push([Math.floor(m / 60), m % 60]);
    return out;
  };
  if (weekday === 0) return [{ label: "lunch", times: steps(12 * 60 + 30, 15 * 60) }, { label: "dinner", times: steps(18 * 60, 20 * 60 + 30) }];
  if (weekday >= 4) return [{ label: "dinner", times: steps(18 * 60, 20 * 60 + 30) }];
  return [];
}
export const isOpenDay = (weekday: number) => HOURS[weekday].length > 0;
/** Fixed closing days announced by the booking system (31.12.2026 is the Silvester event, booked separately). */
export const CLOSED_DATES = ["2027-01-01", "2027-01-02", "2027-01-03"];

export const MEAT_ORIGIN_ORDER = ["rind", "lamm", "schwein", "gefluegel", "fisch"] as const;
