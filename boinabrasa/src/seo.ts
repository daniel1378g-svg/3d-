// Titles, descriptions, canonical, hreflang alternates and the Restaurant JSON-LD (verified facts only).
// German titles and descriptions are the live site's own (typos fixed: "Kontakt zu Ihrem Steakhouse"; the groups
// description follows the page, "ab 12 Personen"); the other languages are built from their dictionary.
import { ADDRESS, EMAIL, GEO, HOURS, NAME, PHONE, SOCIAL, BOOKING_BASE } from "./content/facts";
import { cachedDict, HTML_LANG, LANGS, pathFor, type ArticleKey, type Dict, type Lang, type PageKey } from "./i18n";

export const ORIGIN = "https://www.boinabrasa.ch";

const DE_META: Partial<Record<PageKey, { title: string; description: string }>> = {
  home: { title: "Ihre Churrascaria in Zürich-Dielsdorf | BOINABRASA", description: "Churrasco-Restaurant in Zürich-Dielsdorf » Köstlich gegrilltes Fleisch nach original brasilianischer Gaucho-Art in authentischer Churrascaria geniessen!" },
  churrasco: { title: "Was bedeutet Churrasco? | BOINABRASA", description: "Unsere Fleischspiesse bzw. Grillspiesse bringen das kulinarische Feuer Brasiliens direkt auf Ihre Zunge. Jetzt bei uns reservieren!" },
  spiesse: { title: "Unsere Fleischspiesse | Brasilianische Grillspiesse | BOINABRASA", description: "Unsere Fleischspiesse bzw. Grillspiesse bringen das kulinarische Feuer Brasiliens direkt auf Ihre Zunge. Jetzt bei uns Ihren Tisch reservieren!" },
  preise: { title: "Unsere Preise im Überblick | BOINABRASA", description: "Hier finden Sie eine Übersicht unserer Preise und weitere Infos zu unseren Speisen." },
  gruppen: { title: "Anfragen für Gruppen | BOINABRASA", description: "Reservations- oder Angebotsanfrage für Gruppen ab 12 Personen: Pakete mit Churrasco à discrétion, Platz für bis zu 150 Personen." },
  gutscheine: { title: "Gutscheine | BOINABRASA", description: "Mit unseren Gutscheinen verschenken Sie ein unvergessliches Erlebnis in unserem Steakhouse." },
  kontakt: { title: "Kontakt zu Ihrem Steakhouse | BOINABRASA", description: "Hier finden Sie alle Kontaktmöglichkeiten. Haben Sie Fragen? Rufen Sie uns gerne an oder schreiben eine E-Mail." },
  ueber: { title: "Churrasco-Steakhouse - Zürich | BOINABRASA", description: "Boinabrasa ist als Churrasco-Steakhouse in Zürich-Dielsdorf seit 2013 für köstliche brasilianische Grillspiesse, Beilagen & Desserts bekannt. Mehr erfahren »" },
  impressum: { title: "Impressum | BOINABRASA", description: "Unser Impressum und rechtliche Angaben finden Sie hier." },
  dolce: { title: "Unsere Dolcebrigadeiro | BOINABRASA", description: "Lassen Sie sich von einem neuen Schokoladenerlebnis verführen! Dolcebrigadeiro ist ideal als originelle Geschenkidee oder für Anlässe jeglicher Art." },
};

const firstSentence = (s: string) => {
  const m = s.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : s).trim();
};

export function metaFor(lang: Lang, t: Dict, page: PageKey, articleTitle?: string) {
  if (lang === "de" && DE_META[page] && !articleTitle) return DE_META[page]!;
  const label: Record<PageKey, string> = {
    home: t.hero.h1, spiesse: t.nav.spiesse, preise: t.nav.preise, reservieren: t.nav.reservieren, gruppen: t.nav.gruppen,
    catering: t.nav.catering, gutscheine: t.nav.gutscheine, ueber: t.nav.ueber, churrasco: t.nav.churrasco, wissen: t.nav.wissen,
    kontakt: t.nav.kontakt, impressum: t.nav.impressum, datenschutz: t.nav.datenschutz, agb: t.nav.agb, dolce: t.nav.dolce,
  };
  const desc: Record<PageKey, string> = {
    home: `${t.hero.kicker}. ${t.hero.lead}`,
    spiesse: t.meats.lead, preise: t.prices.lead, reservieren: t.reservation.lead, gruppen: `${t.groups.pageLead} ${t.groups.lead}`,
    catering: t.catering.claim, gutscheine: `${t.vouchers.title} ${t.vouchers.lead}`, ueber: t.about.founded, churrasco: t.knowledge.lead,
    wissen: t.knowledge.lead, kontakt: `${t.contact.title}. ${t.location.cards}`, impressum: `${t.nav.impressum} – ${NAME}`,
    datenschutz: `${t.nav.datenschutz} – ${NAME}`, agb: `${t.nav.agb} – ${NAME}`, dolce: t.dolce.claim,
  };
  const title = `${articleTitle ?? label[page]} | BOINABRASA`;
  const d = desc[page];
  return { title, description: d.length > 165 ? firstSentence(d) : d };
}

const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

export function jsonLd(lang: Lang) {
  const opening = Object.entries(HOURS).flatMap(([d, slots]) =>
    slots.map(([a, b]) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${DAY[Number(d)]}`, opens: hhmm(a), closes: hhmm(b) })),
  );
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${ORIGIN}/#restaurant`,
    name: NAME,
    url: `${ORIGIN}${pathFor(lang, "home")}`,
    logo: `${ORIGIN}/brand/logo.png`,
    image: [`${ORIGIN}/images/restaurant-1600.webp`, `${ORIGIN}/images/spiess-1600.webp`, `${ORIGIN}/images/buffet-1600.webp`],
    telephone: PHONE.intl,
    email: EMAIL,
    servesCuisine: ["Brazilian", "Churrasco", "Rodízio"],
    priceRange: "CHF 32–68",
    currenciesAccepted: "CHF",
    paymentAccepted: "Cash, Credit Card, Debit Card",
    address: { "@type": "PostalAddress", streetAddress: ADDRESS.street, postalCode: ADDRESS.zip, addressLocality: ADDRESS.city, addressCountry: ADDRESS.country },
    geo: { "@type": "GeoCoordinates", latitude: GEO.lat, longitude: GEO.lng },
    openingHoursSpecification: opening,
    acceptsReservations: BOOKING_BASE[lang],
    hasMenu: `${ORIGIN}${pathFor(lang, "preise")}`,
    sameAs: [SOCIAL.facebook, SOCIAL.instagram],
    inLanguage: HTML_LANG[lang],
  };
}

/** Head tags for the prerendered HTML of one page (postbuild), and the same values in the running app. */
export function headTags(lang: Lang, t: Dict, page: PageKey, article?: ArticleKey, articleTitle?: string) {
  const meta = metaFor(lang, t, page, articleTitle);
  const alt = LANGS.map((l) => `<link rel="alternate" hreflang="${HTML_LANG[l]}" href="${ORIGIN}${pathFor(l, page, article)}" />`).join("\n    ");
  const html = [
    `<link rel="canonical" href="${ORIGIN}${pathFor(lang, page, article)}" />`,
    alt,
    `<link rel="alternate" hreflang="x-default" href="${ORIGIN}${pathFor("de", page, article)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="BOINABRASA" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:image" content="${ORIGIN}/images/spiess-1600.webp" />`,
    `<meta property="og:locale" content="${HTML_LANG[lang].replace("-", "_")}" />`,
    page === "home" ? `<script type="application/ld+json">${JSON.stringify(jsonLd(lang))}</script>` : "",
  ].filter(Boolean).join("\n    ");
  return { ...meta, html };
}
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** In the app: title, description and the alternates follow the current page and language. */
export function applySeo(lang: Lang, page: PageKey, article?: ArticleKey, articleTitle?: string) {
  const t = cachedDict(lang);
  if (!t) return;
  const meta = metaFor(lang, t, page, articleTitle);
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
    link.href = `${ORIGIN}${pathFor(l, page, article)}`;
    document.head.appendChild(link);
  }
}
