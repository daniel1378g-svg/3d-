import { HTML_LANG, LANGS, SEO, pathFor, type Lang, type PageKey } from "./i18n";
import { CONTACT } from "./content";

export const ORIGIN = "https://donduarte.ch";

/** Restaurant JSON-LD. Opening hours close after midnight, so each service is written with its own day. */
export function restaurantJsonLd(lang: Lang) {
  const spec = (days: string[], opens: string, closes: string) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: days, opens, closes });
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Restaurant Don Duarte",
    url: `${ORIGIN}${pathFor(lang, "home")}`,
    logo: `${ORIGIN}/brand/logo.png`,
    image: `${ORIGIN}/brand/og-image.jpg`,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    foundingDate: "1988",
    servesCuisine: ["Portuguese", "Pizza"],
    hasMenu: `${ORIGIN}${pathFor(lang, "plats")}`,
    address: { "@type": "PostalAddress", streetAddress: "Rue du Môle 5", postalCode: "1201", addressLocality: "Genève", addressRegion: "GE", addressCountry: "CH" },
    openingHoursSpecification: [
      spec(["Monday", "Tuesday", "Wednesday", "Thursday"], "07:00", "01:00"),
      spec(["Friday", "Saturday"], "07:00", "02:00"),
      spec(["Sunday"], "09:00", "01:00"),
    ],
    sameAs: [CONTACT.facebook, CONTACT.instagram],
  };
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
      `<link rel="alternate" hreflang="x-default" href="${ORIGIN}${pathFor("fr", page)}" />`,
      `<meta property="og:type" content="website" />`,
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
  document.querySelectorAll("[data-seo]").forEach((n) => n.remove());
  document.querySelectorAll('link[rel="canonical"], link[rel="alternate"], meta[property^="og:"], script[type="application/ld+json"]').forEach((n) => n.remove());
  const tpl = document.createElement("template");
  tpl.innerHTML = head.html;
  tpl.content.querySelectorAll("*").forEach((n) => n.setAttribute("data-seo", ""));
  document.head.append(tpl.content);
}
