// Structured data for the launch build (scripts/prerender.mjs via entry-server), built only from verified facts:
// name, address, phone, e-mail, URL, geo, the warm-kitchen hours as openingHoursSpecification (BRIEF §13), the
// seasonal closure, cuisine, and the menu. No ratings, reviews, awards or payment claims.
import { HTML_LANG, type Lang } from "@/i18n";
import { pathFor } from "@/routes";
import { RESTAURANT, LABELS } from "@/content/restaurant";
import { CLOSURES, HOURS } from "@shared/schedule";
import { MENUS } from "@/content/menu";
import { ORIGIN } from "@/seo";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Restaurant – only facts published by the restaurant. */
export function restaurantLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${ORIGIN}/#restaurant`,
    name: RESTAURANT.name,
    alternateName: RESTAURANT.legalName,
    url: `${ORIGIN}${pathFor(lang, "home")}`,
    telephone: "+41275300584",
    email: RESTAURANT.email,
    logo: `${ORIGIN}/brand/logo-700.png`,
    image: [`${ORIGIN}/images/garden-view-1600.webp`, `${ORIGIN}/images/pizza-rocket-1600.webp`, `${ORIGIN}/images/terrace-view-1600.webp`],
    address: { "@type": "PostalAddress", streetAddress: RESTAURANT.street, postalCode: RESTAURANT.postcode, addressLocality: RESTAURANT.town, addressRegion: "VS", addressCountry: "CH" },
    geo: { "@type": "GeoCoordinates", latitude: Number(RESTAURANT.geo.lat.toFixed(6)), longitude: Number(RESTAURANT.geo.lng.toFixed(6)) },
    servesCuisine: "Italian",
    acceptsReservations: true,
    hasMenu: `${ORIGIN}${pathFor(lang, "menu")}`,
    // the warm-kitchen hours (BRIEF §13); open 11:00–23:00, Wednesday closed
    openingHoursSpecification: HOURS.kitchen.map((k) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAYS.filter((_, i) => !HOURS.closedWeekdays.includes(i)).map((d) => `https://schema.org/${d}`),
      opens: k.from,
      closes: k.to,
    })),
    specialOpeningHoursSpecification: CLOSURES.map((c) => ({ "@type": "OpeningHoursSpecification", validFrom: c.from, validThrough: c.to, opens: "00:00", closes: "00:00" })),
    sameAs: LABELS.filter((l) => ["tripadvisor", "facebook", "foursquare"].includes(l.id)).map((l) => l.href),
  };
}

/** The whole menu as schema.org Menu (menu page only). */
export function menuLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${ORIGIN}${pathFor(lang, "menu")}#menu`,
    inLanguage: HTML_LANG[lang],
    hasMenuSection: MENUS.map((m) => ({
      "@type": "MenuSection",
      name: m.title[lang],
      hasMenuSection: m.sections
        .filter((s) => !s.flavours)
        .map((s) => ({
          "@type": "MenuSection",
          name: s.title[lang],
          hasMenuItem: s.groups.flatMap((g) =>
            g.items.map((i) => ({
              "@type": "MenuItem",
              name: i.name[lang],
              ...(i.desc ? { description: i.desc[lang] } : {}),
              offers: i.prices.map((p) => ({ "@type": "Offer", price: p.chf.toFixed(2), priceCurrency: "CHF" })),
              ...(i.tags?.includes("vegan") ? { suitableForDiet: "https://schema.org/VeganDiet" } : {}),
            })),
          ),
        })),
    })),
  };
}
