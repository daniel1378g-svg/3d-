// Titles, descriptions, canonical, hreflang alternates and the Restaurant JSON-LD (verified facts only: address,
// geo from the site's own map, phone, e-mail, hours, menu, reservations, payment as the ordering widget lists it).
// ORIGIN is a placeholder for the restaurant's domain; the live site is picanha-brasil.ch.
import { ADDRESS, EMAIL, GEO, HOURS, NAME, PHONE, URLS } from "./content/facts";
import { MENU } from "./content/menu";
import { cachedDict, HTML_LANG, LANGS, pathFor, type Dict, type Lang, type PageKey } from "./i18n";

export const ORIGIN = "https://picanha-brasil.ch";

export function metaFor(t: Dict, page: PageKey) {
  const s = t.seo;
  const map: Record<PageKey, { title: string; description: string }> = {
    home: { title: s.homeTitle, description: s.homeDescription },
    karte: { title: `${t.karte.title} | ${NAME}`, description: s.karteDescription },
    reservieren: { title: `${t.nav.reservieren} | ${NAME}`, description: s.reservierenDescription },
    bestellen: { title: `${t.nav.bestellen} | ${NAME}`, description: s.bestellenDescription },
    impressum: { title: `${t.nav.impressum} | ${NAME}`, description: s.impressumDescription },
  };
  return map[page];
}

const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

export function jsonLd(lang: Lang) {
  const opening = Object.entries(HOURS).flatMap(([d, slots]) =>
    slots.map(([a, b]) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${DAY[Number(d)]}`, opens: hhmm(a), closes: hhmm(b) })),
  );
  const prices = MENU.flatMap((s) => s.items.flatMap((i) => i.variants.map((v) => v.cents / 100)));
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${ORIGIN}/#restaurant`,
    name: NAME,
    url: `${ORIGIN}${pathFor(lang, "home")}`,
    logo: `${ORIGIN}/brand/logo.png`,
    image: [`${ORIGIN}/images/banner-brasilianisch-1500.webp`],
    telephone: PHONE.intl,
    email: EMAIL,
    servesCuisine: ["Brazilian"],
    priceRange: `CHF ${Math.min(...prices)}–${Math.max(...prices)}`,
    currenciesAccepted: "CHF",
    address: { "@type": "PostalAddress", streetAddress: ADDRESS.street, postalCode: ADDRESS.zip, addressLocality: ADDRESS.city, addressCountry: ADDRESS.country },
    geo: { "@type": "GeoCoordinates", latitude: GEO.lat, longitude: GEO.lng },
    openingHoursSpecification: opening,
    acceptsReservations: URLS.reservation,
    hasMenu: `${ORIGIN}${pathFor(lang, "karte")}`,
    inLanguage: HTML_LANG[lang],
  };
}

/** Head tags for the prerendered HTML of one page (postbuild), and the same values in the running app. */
export function headTags(lang: Lang, t: Dict, page: PageKey) {
  const meta = metaFor(t, page);
  const alt = LANGS.map((l) => `<link rel="alternate" hreflang="${HTML_LANG[l]}" href="${ORIGIN}${pathFor(l, page)}" />`).join("\n    ");
  const html = [
    `<link rel="canonical" href="${ORIGIN}${pathFor(lang, page)}" />`,
    alt,
    `<link rel="alternate" hreflang="x-default" href="${ORIGIN}${pathFor("de", page)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${NAME}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:image" content="${ORIGIN}/images/banner-brasilianisch-1500.webp" />`,
    `<meta property="og:locale" content="${HTML_LANG[lang].replace("-", "_")}" />`,
    page === "home" ? `<script type="application/ld+json">${JSON.stringify(jsonLd(lang))}</script>` : "",
  ].filter(Boolean).join("\n    ");
  return { ...meta, html };
}
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** In the app: title, description and the alternates follow the current page and language. */
export function applySeo(lang: Lang, page: PageKey) {
  const t = cachedDict(lang);
  if (!t) return;
  const meta = metaFor(t, page);
  document.title = meta.title;
  let d = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!d) { d = document.createElement("meta"); d.name = "description"; document.head.appendChild(d); }
  d.content = meta.description;
  if (__ARTIFACT__) return;
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((n) => n.remove());
  for (const l of LANGS) {
    const link = document.createElement("link");
    link.rel = "alternate";
    link.hreflang = HTML_LANG[l];
    link.href = `${ORIGIN}${pathFor(l, page)}`;
    document.head.appendChild(link);
  }
}
