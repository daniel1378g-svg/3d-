import { HTML_LANG, LANGS, SEO, pathFor, type Lang, type PageKey } from "./i18n";
import { CONTACT } from "./contact";

export const ORIGIN = "https://choucas.ch";

export function restaurantJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "The Choucas Connection",
    alternateName: ["Pizzeria Choucas", "Oasis Steakhouse"],
    url: `${ORIGIN}${pathFor(lang, "home")}`,
    logo: `${ORIGIN}/brand/connectionlogoneu.png`,
    image: `${ORIGIN}/brand/og-image.jpg`,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    servesCuisine: ["Pizza", "Argentine steakhouse"],
    address: { "@type": "PostalAddress", streetAddress: CONTACT.street, postalCode: "3954", addressLocality: "Leukerbad", addressRegion: "VS", addressCountry: "CH" },
    // home page figures: hot food in the pizzeria 11.00–23.00 (the steakhouse kitchen closes at 22.00)
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "11:00", closes: "23:00" },
    ],
    hasMenu: `${ORIGIN}${pathFor(lang, "menu")}`,
    acceptsReservations: CONTACT.bookingPage,
    sameAs: [CONTACT.facebook, CONTACT.instagram],
  };
}

/** Everything that goes in <head> for one page in one language (also used by the static build). */
export function headTags(lang: Lang, page: PageKey) {
  const { title, description } = SEO[page];
  const url = `${ORIGIN}${pathFor(lang, page)}`;
  return {
    title: title[lang],
    description: description[lang],
    html: [
      `<link rel="canonical" href="${url}" />`,
      ...LANGS.map((l) => `<link rel="alternate" hreflang="${HTML_LANG[l]}" href="${ORIGIN}${pathFor(l, page)}" />`),
      `<link rel="alternate" hreflang="x-default" href="${ORIGIN}${pathFor("de", page)}" />`,
      `<meta property="og:type" content="restaurant" />`,
      `<meta property="og:locale" content="${HTML_LANG[lang].replace("-", "_")}" />`,
      `<meta property="og:title" content="${title[lang]}" />`,
      `<meta property="og:description" content="${description[lang]}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:image" content="${ORIGIN}/brand/og-image.jpg" />`,
      `<script type="application/ld+json">${JSON.stringify(restaurantJsonLd(lang))}</script>`,
    ].join("\n"),
  };
}

export function applyHead(lang: Lang, page: PageKey) {
  const head = headTags(lang, page);
  document.title = head.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", head.description);
  document.querySelectorAll('link[rel="canonical"], link[rel="alternate"], meta[property^="og:"], script[type="application/ld+json"]').forEach((n) => n.remove());
  const tpl = document.createElement("template");
  tpl.innerHTML = head.html;
  document.head.append(tpl.content);
}
