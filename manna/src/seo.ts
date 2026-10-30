// Titles, descriptions, canonical and hreflang alternates for the demo's own routes. The demo is noindex (see
// scripts/postbuild-routes.mjs). A LocalBusiness JSON-LD with verified facts only is prepared for an authorised
// launch (VITE_PROPOSAL=0) and never emitted for the demo. ORIGIN is a placeholder for the real domain.
import { EMAIL, NAME, PHONE, SHOP, SOCIAL } from "./content/facts";
import { cachedDict, HTML_LANG, LANGS, pathFor, type Dict, type Lang, type PageKey } from "./i18n";

export const ORIGIN = "https://manna-acai.ch";

export function metaFor(t: Dict, page: PageKey) {
  const s = t.seo;
  const map: Record<PageKey, { title: string; description: string }> = {
    home: { title: s.homeTitle, description: s.homeDescription },
    angebot: { title: `${t.range.title} | ${NAME}`, description: s.rangeDescription },
    impressum: { title: `${t.nav.imprint} | ${NAME}`, description: s.imprintDescription },
  };
  return map[page];
}

/** Prepared for an authorised launch only: verified facts, no hours (none are published), no prices, no rating. */
export function jsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "@id": `${ORIGIN}/#shop`,
    name: SHOP.name,
    alternateName: NAME,
    url: `${ORIGIN}${pathFor(lang, "home")}`,
    logo: `${ORIGIN}/brand/logo.png`,
    telephone: PHONE.intl,
    email: EMAIL,
    servesCuisine: ["Açaí", "Brazilian"],
    address: { "@type": "PostalAddress", streetAddress: SHOP.street, postalCode: SHOP.zip, addressLocality: SHOP.city, addressCountry: SHOP.country },
    containedInPlace: { "@type": "ShoppingCenter", name: SHOP.mall, address: `${SHOP.street}, ${SHOP.zip} ${SHOP.city}` },
    sameAs: [SOCIAL.instagram.url, SOCIAL.facebook.url],
    inLanguage: HTML_LANG[lang],
  };
}

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
    `<meta property="og:image" content="${ORIGIN}/images/acai-becher-layers-960.webp" />`,
    `<meta property="og:locale" content="${HTML_LANG[lang].replace("-", "_")}" />`,
  ].join("\n    ");
  return { ...meta, html };
}
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

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
