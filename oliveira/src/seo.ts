import { HTML_LANG, LANGS, SEO, pathFor, type Lang, type PageKey } from "./i18n";
import { CONTACT, HOURS } from "./content";

export const ORIGIN = "https://www.oliveira-winterthur.ch";
const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Restaurant JSON-LD. Opening hours are added only once the owner has confirmed them. */
export function restaurantJsonLd(lang: Lang) {
  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: CONTACT.name,
    url: `${ORIGIN}${pathFor(lang, "home")}`,
    logo: `${ORIGIN}/brand/logo.png`,
    image: `${ORIGIN}/brand/og-image.jpg`,
    telephone: CONTACT.phoneIntl,
    email: CONTACT.email,
    servesCuisine: ["Portuguese", "Swiss"],
    acceptsReservations: CONTACT.localinaUrl,
    address: { "@type": "PostalAddress", streetAddress: CONTACT.street, postalCode: CONTACT.zip, addressLocality: CONTACT.city, addressRegion: "ZH", addressCountry: "CH" },
    geo: { "@type": "GeoCoordinates", latitude: CONTACT.lat, longitude: CONTACT.lng },
    sameAs: [CONTACT.facebook],
  };
  if (HOURS.confirmed) {
    ld.openingHoursSpecification = Object.entries(HOURS.days).flatMap(([d, list]) =>
      list.map(([opens, closes]) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: DAY[Number(d)], opens, closes })),
    );
  }
  return ld;
}

/** Everything that goes in <head> for one page in one language (also used by the static build). */
export function headTags(lang: Lang, page: PageKey) {
  const { title, description } = SEO[page];
  const alt = LANGS.map((l) => `<link rel="alternate" hreflang="${HTML_LANG[l]}" href="${ORIGIN}${pathFor(l, page)}" />`).join("\n");
  return {
    title: title[lang],
    description: description[lang],
    html: [
      `<link rel="canonical" href="${ORIGIN}${pathFor(lang, page)}" />`,
      alt,
      `<link rel="alternate" hreflang="x-default" href="${ORIGIN}${pathFor("de", page)}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="Restaurante Oliveira Winterthur" />`,
      `<meta property="og:locale" content="${HTML_LANG[lang].replace("-", "_")}" />`,
      `<meta property="og:title" content="${title[lang]}" />`,
      `<meta property="og:description" content="${description[lang]}" />`,
      `<meta property="og:url" content="${ORIGIN}${pathFor(lang, page)}" />`,
      `<meta property="og:image" content="${ORIGIN}/brand/og-image.jpg" />`,
      `<script type="application/ld+json">${JSON.stringify(restaurantJsonLd(lang))}</script>`,
    ].join("\n"),
  };
}

/** Keeps <title>, the description and the alternates in step with client-side navigation. */
export function applyHead(lang: Lang, page: PageKey) {
  const head = headTags(lang, page);
  document.title = head.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", head.description);
  document.querySelectorAll('link[rel="canonical"], link[rel="alternate"], meta[property^="og:"], script[type="application/ld+json"]').forEach((n) => n.remove());
  const tpl = document.createElement("template");
  tpl.innerHTML = head.html;
  document.head.append(tpl.content);
}
