// Page titles, descriptions, canonical/hreflang links and the Restaurant JSON-LD. Used at runtime (applyHead)
// and by scripts/postbuild-routes.mjs, which writes one static HTML file per page and language.
import { HTML_LANG, LANGS, PAGES, SLUGS, type L, type Lang, type PageKey } from "./i18n";
import { BUSINESS, TX } from "./content/site";

export const ORIGIN = "https://www.daolafoes.ch";

/** The live pages have the title "Dão Lafões" ("Dão Lafões - Menu", "- Kasse") and no description: the titles
 *  and descriptions are new (a decision, listed). */
const TITLES: Record<PageKey, L> = {
  home: TX.n_home_title, speisekarte: TX.n_speisekarte_title, takeaway: TX.n_takeaway_title, services: TX.n_services_title, galerie: TX.n_galerie_title,
  ueber: TX.n_ueber_title, bewertungen: TX.n_bewertungen_title, kontakt: TX.n_kontakt_title, konto: TX.n_konto_title, warenkorb: TX.n_warenkorb_title,
};
const DESCRIPTIONS: Record<PageKey, L> = {
  home: TX.n_home_desc, speisekarte: TX.n_speisekarte_desc, takeaway: TX.n_takeaway_desc, services: TX.n_services_desc, galerie: TX.n_galerie_desc,
  ueber: TX.n_ueber_desc, bewertungen: TX.n_bewertungen_desc, kontakt: TX.n_kontakt_desc, konto: TX.n_konto_desc, warenkorb: TX.n_warenkorb_desc,
};
export const pagePath = (lang: Lang, page: PageKey) => `/${lang}/${SLUGS[lang][page]}`;

export function jsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${ORIGIN}/#restaurant`,
    name: BUSINESS.name,
    url: `${ORIGIN}${pagePath(lang, "home")}`,
    image: `${ORIGIN}/brand/og-image.jpg`,
    logo: `${ORIGIN}/brand/logo.png`,
    address: { "@type": "PostalAddress", streetAddress: BUSINESS.street, postalCode: BUSINESS.plz, addressLocality: BUSINESS.town, addressRegion: "ZH", addressCountry: "CH" },
    geo: { "@type": "GeoCoordinates", latitude: BUSINESS.gps.lat, longitude: BUSINESS.gps.lng },
    telephone: BUSINESS.phones.map((p) => p.tel),
    email: BUSINESS.email,
    servesCuisine: "Portuguese",
    foundingDate: BUSINESS.founded,
    founder: { "@type": "Person", name: BUSINESS.founder },
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "09:30", closes: "22:30" }],
    hasMenu: BUSINESS.pdf,
    acceptsReservations: "True",
    sameAs: [BUSINESS.social.facebook, BUSINESS.social.twitter, BUSINESS.social.vimeo],
  };
}

export function headTags(lang: Lang, page: PageKey) {
  const title = TITLES[page][lang];
  const description = DESCRIPTIONS[page][lang];
  const url = `${ORIGIN}${pagePath(lang, page)}`;
  const alt = LANGS.map((l2) => `<link rel="alternate" hreflang="${HTML_LANG[l2]}" href="${ORIGIN}${pagePath(l2, page)}" />`);
  const html = [
    `<link rel="canonical" href="${url}" />`,
    ...alt,
    `<link rel="alternate" hreflang="x-default" href="${ORIGIN}${pagePath("de", page)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${BUSINESS.name}" />`,
    `<meta property="og:title" content="${title.replace(/"/g, "&quot;")}" />`,
    `<meta property="og:description" content="${description.replace(/"/g, "&quot;")}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${ORIGIN}/brand/og-image.jpg" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd(lang))}</script>`,
  ].join("\n    ");
  return { title, description, html };
}

/** Keeps the document head in step with the page and language in the browser. */
export function applyHead(lang: Lang, page: PageKey) {
  const { title, description } = headTags(lang, page);
  document.title = title;
  let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);
  }
  meta.content = description;
  if (__ARTIFACT__) return;
  document.querySelectorAll('link[rel="alternate"][hreflang], link[rel="canonical"]').forEach((n) => n.remove());
  const add = (rel: string, href: string, hreflang?: string) => {
    const link = document.createElement("link");
    link.rel = rel;
    link.href = href;
    if (hreflang) link.hreflang = hreflang;
    document.head.appendChild(link);
  };
  add("canonical", `${ORIGIN}${pagePath(lang, page)}`);
  for (const l2 of LANGS) add("alternate", `${ORIGIN}${pagePath(l2, page)}`, HTML_LANG[l2]);
  add("alternate", `${ORIGIN}${pagePath("de", page)}`, "x-default");
}
export { PAGES };
