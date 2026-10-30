// Facts, identical in every language, taken from picanha-brasil.ch and the data its own reservation and ordering
// widgets load (data.bigbites.ch/restaurant/58JN5J, captured 30.10.2026; see content/raw). Change them here only.
export const NAME = "Picanha Brasil";
/** company name as listed in the Swiss directories (local.ch, search.ch) for this address */
export const LEGAL_NAME = "PICANHA BRASIL GmbH";
export const ADDRESS = { street: "Mattengasse 9", zip: "8005", city: "Zürich", district: "Kreis 5", country: "CH" } as const;
export const PHONE = { display: "+41 43 366 93 91", intl: "+41 43 366 93 91", href: "tel:+41433669391" } as const;
export const EMAIL = "info@picanha-brasil.ch";
/** the map marker of the site's own OpenStreetMap embed */
export const GEO = { lat: 47.38211770004518, lng: 8.530049350000013 } as const;
/** the Google Maps link on the site */
export const MAPS_URL = "https://goo.gl/maps/3oGRjirQ7wXEVAaP9";
export const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/search/?api=1&query=Picanha%20Brasil%2C%20Mattengasse%209%2C%208005%20Z%C3%BCrich";
export const OSM_URL = `https://www.openstreetmap.org/?mlat=${GEO.lat}&mlon=${GEO.lng}#map=18/${GEO.lat}/${GEO.lng}`;
export const APPLE_MAPS_URL = "https://maps.apple.com/?address=Mattengasse%209,8005%20Z%C3%BCrich,Switzerland&q=Picanha%20Brasil";
/** Google's public place card, read on 30.10.2026 (limited view: rating only, no review texts) */
export const GOOGLE_RATING = { value: 4.5, checked: "2026-10-30" } as const;

export const URLS = {
  liveSite: "https://picanha-brasil.ch/",
  /** the official reservation widget (bigbites) on the restaurant's site */
  reservation: "https://picanha-brasil.ch/#reservation",
  /** the official ordering widget: delivery or pick-up */
  order: "https://picanha-brasil.ch/#order",
  platform: "https://bigbites.ch/",
} as const;

/**
 * Opening hours = kitchen hours (both lists are identical in the widget data). Minutes from midnight per
 * weekday (0 = Sunday). Mo–Fr 11:00–14:30 and 17:30–22:00, Sa–Su 11:00–22:00.
 */
export const HOURS: Record<number, [number, number][]> = {
  0: [[11 * 60, 22 * 60]],
  1: [[11 * 60, 14 * 60 + 30], [17 * 60 + 30, 22 * 60]],
  2: [[11 * 60, 14 * 60 + 30], [17 * 60 + 30, 22 * 60]],
  3: [[11 * 60, 14 * 60 + 30], [17 * 60 + 30, 22 * 60]],
  4: [[11 * 60, 14 * 60 + 30], [17 * 60 + 30, 22 * 60]],
  5: [[11 * 60, 14 * 60 + 30], [17 * 60 + 30, 22 * 60]],
  6: [[11 * 60, 22 * 60]],
};
export const isOpenDay = (weekday: number) => HOURS[weekday].length > 0;

/**
 * Arrival times offered by this proposal: every 30 minutes inside the opening hours, the last one an hour before
 * closing. The official form takes any date and time; the restaurant confirms.
 */
export function arrivalSlots(weekday: number): { label: "lunch" | "dinner" | "allDay"; times: [number, number][] }[] {
  const steps = (from: number, to: number) => {
    const out: [number, number][] = [];
    for (let m = from; m <= to; m += 30) out.push([Math.floor(m / 60), m % 60]);
    return out;
  };
  const slots = HOURS[weekday];
  if (slots.length === 1) {
    const [a, b] = slots[0];
    return [{ label: "allDay", times: steps(a, b - 60) }];
  }
  return [{ label: "lunch", times: steps(slots[0][0], slots[0][1] - 60) }, { label: "dinner", times: steps(slots[1][0], slots[1][1] - 60) }];
}

/** From the reservation widget's note (customerSettings.reservationNote). */
export const RESERVATION = {
  holdMinutes: 30,
  feePerPerson: 5,
  feeSince: "2024-02-01",
} as const;
/** online reservations up to this many days ahead in this proposal's calendar (the official form sets no limit) */
export const BOOKING_DAYS_AHEAD = 90;

/** Delivery zones exactly as the ordering widget lists them (fee in CHF, minimum order CHF 50). */
export const DELIVERY_MIN = 50;
export const DELIVERY_ZONES: { fee: number; places: { zip: number; city: string }[] }[] = [
  { fee: 17, places: [{ zip: 8050, city: "Zürich" }] },
  { fee: 18, places: [{ zip: 8304, city: "Wallisellen" }] },
  { fee: 20, places: [{ zip: 8952, city: "Schlieren" }, { zip: 8048, city: "Zürich" }] },
  { fee: 21, places: [{ zip: 8152, city: "Glattbrugg" }, { zip: 8152, city: "Opfikon" }] },
  { fee: 22, places: [{ zip: 8600, city: "Dübendorf" }] },
  { fee: 25, places: [{ zip: 8302, city: "Kloten" }] },
  { fee: 28, places: [{ zip: 8953, city: "Dietikon" }] },
];
/** payment on delivery or pick-up, as the ordering widget lists it */
export const PAYMENT = ["card", "twint"] as const;

/** Dishes with a published photo of the restaurant's own (see HANDOFF.md for the sources). */
export const DISH_PHOTOS: Record<string, string> = {
  "picanha-porcao-pequena": "prato-picanha",
  feijoada: "feijoada",
};
