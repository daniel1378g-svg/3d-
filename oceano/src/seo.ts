// Page titles, descriptions, canonical/hreflang links and the Restaurant JSON-LD. Used at runtime (applyHead)
// and by scripts/postbuild-routes.mjs, which writes one static HTML file per page and language.
import { HTML_LANG, LANGS, PAGES, SLUGS, type L, type Lang, type PageKey } from "./i18n";
import { BUSINESS, TX } from "./content/site";

export const ORIGIN = "https://www.burguesa.ch";
const l = (de: string, en: string, pt: string, fr: string, it: string): L => ({ de, en, pt, fr, it });

/** The live page titles and meta descriptions (German), translated; written from the page's own sentences where
 *  the live page has none (galerie, web-shop, kontakt, impressum: a decision, listed). */
const TITLES: Record<PageKey, L> = {
  home: TX.home_title,
  kueche: TX.kueche_title,
  laden: TX.laden_title,
  ueber: TX.ueber_title,
  bewertungen: TX.bewertungen_title,
  galerie: l("Galerie | Schlieren | Restaurant Oceano", "Gallery | Schlieren | Restaurant Oceano", "Galeria | Schlieren | Restaurant Oceano", "Galerie | Schlieren | Restaurant Oceano", "Galleria | Schlieren | Restaurant Oceano"),
  shop: l("Web-Shop | Schlieren | Restaurant Oceano", "Web shop | Schlieren | Restaurant Oceano", "Loja online | Schlieren | Restaurant Oceano", "Boutique en ligne | Schlieren | Restaurant Oceano", "Negozio online | Schlieren | Restaurant Oceano"),
  kontakt: l("Kontakt | Schlieren | Restaurant Oceano", "Contact | Schlieren | Restaurant Oceano", "Contacto | Schlieren | Restaurant Oceano", "Contact | Schlieren | Restaurant Oceano", "Contatti | Schlieren | Restaurant Oceano"),
  impressum: l("Impressum | Schlieren | Restaurant Oceano", "Imprint | Schlieren | Restaurant Oceano", "Informação legal | Schlieren | Restaurant Oceano", "Mentions légales | Schlieren | Restaurant Oceano", "Note legali | Schlieren | Restaurant Oceano"),
};
const DESCRIPTIONS: Record<PageKey, L> = {
  home: TX.home_desc,
  kueche: TX.kueche_desc,
  laden: TX.laden_desc,
  ueber: TX.ueber_desc,
  bewertungen: TX.bewertungen_desc,
  galerie: TX.augeText,
  shop: TX.shopLine,
  kontakt: TX.kontaktP,
  impressum: TX.impressumFirma,
};

export const pagePath = (lang: Lang, page: PageKey) => `/${lang}/${SLUGS[lang][page]}`;

export function jsonLd(lang: Lang) {
  const spec = (days: string[], opens: string, closes: string) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: days, opens, closes });
  const shop = {
    "@type": "Store",
    "@id": `${ORIGIN}/#laden`,
    name: BUSINESS.shop,
    address: { "@type": "PostalAddress", streetAddress: "Lilienweg 2", postalCode: "8952", addressLocality: "Schlieren", addressCountry: "CH" },
    telephone: BUSINESS.laden.tel,
    email: BUSINESS.email,
    openingHoursSpecification: [spec(["Tuesday", "Wednesday", "Thursday", "Friday"], "09:00", "13:00"), spec(["Tuesday", "Wednesday", "Thursday", "Friday"], "14:00", "18:00"), spec(["Saturday"], "09:00", "18:00"), spec(["Sunday"], "09:00", "13:00")],
    url: `${ORIGIN}${pagePath(lang, "laden")}`,
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Restaurant",
        "@id": `${ORIGIN}/#restaurant`,
        name: BUSINESS.name,
        url: `${ORIGIN}${pagePath(lang, "home")}`,
        image: `${ORIGIN}/brand/og-image.jpg`,
        logo: `${ORIGIN}/brand/logo.png`,
        address: { "@type": "PostalAddress", streetAddress: "Zürcherstrasse 16", postalCode: "8952", addressLocality: "Schlieren", addressCountry: "CH" },
        telephone: BUSINESS.restaurant.tel,
        email: BUSINESS.email,
        servesCuisine: ["Portuguese", "Burgers"],
        foundingDate: BUSINESS.founded,
        // a closing time earlier than the opening time means the next day (Friday and Saturday to 01:00)
        openingHoursSpecification: [spec(["Monday", "Tuesday", "Wednesday", "Thursday"], "11:00", "22:00"), spec(["Friday"], "11:00", "01:00"), spec(["Saturday"], "09:00", "01:00"), spec(["Sunday"], "09:00", "22:00")],
        acceptsReservations: BUSINESS.booking,
        subOrganization: { "@id": `${ORIGIN}/#laden` },
      },
      { ...shop, parentOrganization: { "@id": `${ORIGIN}/#restaurant` } },
    ],
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
    `<meta property="og:site_name" content="Restaurant Oceano" />`,
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
