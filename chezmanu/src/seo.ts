import { HTML_LANG, LANGS, SEO, pathFor, type Lang, type PageKey } from "./i18n";
import { CONTACT } from "./content";

export const ORIGIN = "https://www.chez-manu-lausanne.ch";

/** Bakery JSON-LD: the shop, its hours (every day from 6:30), the menu and its social profiles. */
export function bakeryJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: CONTACT.name,
    url: `${ORIGIN}${pathFor(lang, "home")}`,
    logo: `${ORIGIN}/brand/logo.png`,
    image: `${ORIGIN}/brand/og-image.jpg`,
    telephone: CONTACT.phoneIntl,
    email: CONTACT.email,
    address: { "@type": "PostalAddress", streetAddress: CONTACT.street, postalCode: CONTACT.zip, addressLocality: CONTACT.city, addressRegion: CONTACT.region, addressCountry: "CH" },
    geo: { "@type": "GeoCoordinates", latitude: CONTACT.lat, longitude: CONTACT.lng },
    openingHours: [`Mo-Fr ${CONTACT.hours.weekdays.join("-")}`, `Sa,Su ${CONTACT.hours.weekend.join("-")}`],
    servesCuisine: ["Portuguese", "Swiss"],
    hasMenu: `${ORIGIN}${pathFor(lang, "offer")}#carte`,
    priceRange: "CHF",
    currenciesAccepted: "CHF",
    sameAs: [CONTACT.facebook, CONTACT.instagram],
  };
}

/** Everything that goes in <head> for one page in one language (also used by the static build). */
export function headTags(lang: Lang, page: PageKey) {
  const { title, description } = SEO[page];
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const alt = LANGS.map((l) => `<link rel="alternate" hreflang="${HTML_LANG[l]}" href="${ORIGIN}${pathFor(l, page)}" />`).join("\n");
  return {
    title: title[lang],
    description: description[lang],
    html: [
      `<link rel="canonical" href="${ORIGIN}${pathFor(lang, page)}" />`,
      alt,
      `<link rel="alternate" hreflang="x-default" href="${ORIGIN}${pathFor("fr", page)}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="Chez Manu" />`,
      `<meta property="og:locale" content="${HTML_LANG[lang].replace("-", "_")}" />`,
      `<meta property="og:title" content="${esc(title[lang])}" />`,
      `<meta property="og:description" content="${esc(description[lang])}" />`,
      `<meta property="og:url" content="${ORIGIN}${pathFor(lang, page)}" />`,
      `<meta property="og:image" content="${ORIGIN}/brand/og-image.jpg" />`,
      `<script type="application/ld+json">${JSON.stringify(bakeryJsonLd(lang))}</script>`,
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
