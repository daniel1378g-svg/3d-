// Page titles, descriptions, canonical/hreflang links and the Restaurant JSON-LD. Used at runtime (applyHead)
// and by scripts/postbuild-routes.mjs, which writes one static HTML file per page and language.
// The French titles and descriptions are the live site's own; the other languages translate them.
import { HTML_LANG, LANGS, PAGES, SLUGS, type L, type Lang, type PageKey } from "./i18n";
import { BUSINESS } from "./content/site";

export const ORIGIN = "https://www.luso-sabores.ch";
const l = (fr: string, en: string, pt: string, it: string, de: string): L => ({ fr, en, pt, it, de });

const TITLES: Record<PageKey, L> = {
  home: l("Luso Sabores | Restaurant cuisine portugaise à Gland", "Luso Sabores | Portuguese restaurant in Gland", "Luso Sabores | Restaurante de cozinha portuguesa em Gland", "Luso Sabores | Ristorante di cucina portoghese a Gland", "Luso Sabores | Portugiesisches Restaurant in Gland"),
  menu: l("Luso Sabores Gland | Spécialités portugaises | Menu", "Luso Sabores Gland | Portuguese specialities | Menu", "Luso Sabores Gland | Especialidades portuguesas | Ementa", "Luso Sabores Gland | Specialità portoghesi | Menu", "Luso Sabores Gland | Portugiesische Spezialitäten | Speisekarte"),
  services: l("Luso Sabores : Restaurant Spécialités Portugaises à Gland", "Luso Sabores: Portuguese specialities restaurant in Gland", "Luso Sabores: Restaurante de especialidades portuguesas em Gland", "Luso Sabores: Ristorante di specialità portoghesi a Gland", "Luso Sabores: Restaurant mit portugiesischen Spezialitäten in Gland"),
  galerie: l("Galerie · Luso Sabores, Gland", "Gallery · Luso Sabores, Gland", "Galeria · Luso Sabores, Gland", "Galleria · Luso Sabores, Gland", "Galerie · Luso Sabores, Gland"),
  contact: l("Luso Sabores Gland | Spécialités portugaises | Contact", "Luso Sabores Gland | Portuguese specialities | Contact", "Luso Sabores Gland | Especialidades portuguesas | Contacto", "Luso Sabores Gland | Specialità portoghesi | Contatti", "Luso Sabores Gland | Portugiesische Spezialitäten | Kontakt"),
  privacy: l("Protection des données · Luso Sabores", "Privacy · Luso Sabores", "Privacidade · Luso Sabores", "Privacy · Luso Sabores", "Datenschutz · Luso Sabores"),
};
const DESCRIPTIONS: Record<PageKey, L> = {
  home: l(
    "Luso Sabores vous propose une carte de spécialités portugaises, cuisinées avec des produits frais, dans une atmosphère accueillante et conviviale. Ouvert 7 jours/7.",
    "Luso Sabores offers a menu of Portuguese specialities, cooked with fresh produce, in a welcoming and friendly atmosphere. Open 7 days a week.",
    "O Luso Sabores propõe-lhe uma carta de especialidades portuguesas, cozinhadas com produtos frescos, num ambiente acolhedor e convivial. Aberto 7 dias por semana.",
    "Luso Sabores vi propone un menu di specialità portoghesi, cucinate con prodotti freschi, in un’atmosfera accogliente e conviviale. Aperto 7 giorni su 7.",
    "Luso Sabores bietet Ihnen eine Karte mit portugiesischen Spezialitäten, mit frischen Produkten zubereitet, in einer einladenden und geselligen Atmosphäre. An 7 Tagen geöffnet.",
  ),
  menu: l(
    "Afin de garantir la fraîcheur de nos plats, nos 2 ou 3 assiettes du jour changent chaque jour et nos spécialités sont préparées uniquement sur demande 48h à l'avance.",
    "To keep our dishes fresh, our 2 or 3 plates of the day change every day, and our specialities are prepared only on request, 48 hours ahead.",
    "Para garantir a frescura dos nossos pratos, os nossos 2 ou 3 pratos do dia mudam todos os dias e as nossas especialidades são preparadas apenas por encomenda, com 48 horas de antecedência.",
    "Per garantire la freschezza dei nostri piatti, i nostri 2 o 3 piatti del giorno cambiano ogni giorno e le nostre specialità sono preparate solo su richiesta, 48 ore prima.",
    "Damit unsere Gerichte frisch sind, wechseln unsere 2 oder 3 Tagesteller jeden Tag, und unsere Spezialitäten werden nur auf Bestellung 48 Stunden im Voraus zubereitet.",
  ),
  services: l(
    "Découvrez nos spécialités portugaises, cuisinées avec des produits frais, dans une atmosphère accueillante et conviviale.",
    "Discover our Portuguese specialities, cooked with fresh produce, in a welcoming and friendly atmosphere.",
    "Descubra as nossas especialidades portuguesas, cozinhadas com produtos frescos, num ambiente acolhedor e convivial.",
    "Scoprite le nostre specialità portoghesi, cucinate con prodotti freschi, in un’atmosfera accogliente e conviviale.",
    "Entdecken Sie unsere portugiesischen Spezialitäten, mit frischen Produkten zubereitet, in einer einladenden und geselligen Atmosphäre.",
  ),
  galerie: l(
    "Les plats de Luso Sabores à Gland en 36 photos : grillades, bacalhau, petiscos et fruits de mer.",
    "Luso Sabores’s dishes in Gland in 36 photos: grills, bacalhau, petiscos and seafood.",
    "Os pratos do Luso Sabores em Gland em 36 fotografias: grelhados, bacalhau, petiscos e marisco.",
    "I piatti di Luso Sabores a Gland in 36 foto: grigliate, bacalhau, petiscos e frutti di mare.",
    "Die Gerichte von Luso Sabores in Gland in 36 Fotos: Grilladen, Bacalhau, Petiscos und Meeresfrüchte.",
  ),
  contact: l(
    "Luso Sabores Restaurant portugais à Gland : Pour réserver une table ou connaître notre plat du jour, merci de bien vouloir nous contacter par téléphone",
    "Luso Sabores, Portuguese restaurant in Gland: to book a table or find out our dish of the day, please contact us by phone",
    "Luso Sabores, restaurante português em Gland: para reservar uma mesa ou saber qual é o prato do dia, queira contactar-nos por telefone",
    "Luso Sabores, ristorante portoghese a Gland: per prenotare un tavolo o conoscere il nostro piatto del giorno, vi preghiamo di contattarci per telefono",
    "Luso Sabores, portugiesisches Restaurant in Gland: Um einen Tisch zu reservieren oder unser Tagesgericht zu erfahren, kontaktieren Sie uns bitte per Telefon",
  ),
  privacy: l(
    "Déclaration relative à la protection des données de Luso Sabores, Chemin du Lavasson 39, Gland.",
    "Luso Sabores’s privacy statement, Chemin du Lavasson 39, Gland.",
    "Declaração de proteção de dados do Luso Sabores, Chemin du Lavasson 39, Gland.",
    "Dichiarazione sulla protezione dei dati di Luso Sabores, Chemin du Lavasson 39, Gland.",
    "Datenschutzerklärung von Luso Sabores, Chemin du Lavasson 39, Gland.",
  ),
};

export const pagePath = (lang: Lang, page: PageKey) => `/${lang}/${SLUGS[lang][page]}`;

const day = (d: string) => `https://schema.org/${d}`;
export function jsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: BUSINESS.name,
    url: `${ORIGIN}${pagePath(lang, "home")}`,
    image: `${ORIGIN}/brand/og-image.jpg`,
    logo: `${ORIGIN}/brand/logo.png`,
    address: { "@type": "PostalAddress", streetAddress: BUSINESS.street, postalCode: "1196", addressLocality: "Gland", addressCountry: "CH" },
    geo: { "@type": "GeoCoordinates", latitude: BUSINESS.geo.lat, longitude: BUSINESS.geo.lng },
    telephone: BUSINESS.phones.map((p) => p.tel),
    servesCuisine: "Portuguese",
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: [day("Monday"), day("Sunday")], opens: "09:00", closes: "14:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day), opens: "09:00", closes: "14:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day), opens: "17:00", closes: "22:00" },
    ],
    hasMenu: `${ORIGIN}${pagePath(lang, "menu")}`,
    acceptsReservations: true,
    sameAs: [BUSINESS.facebook, BUSINESS.instagram, BUSINESS.foursquare, BUSINESS.yelp],
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
    `<link rel="alternate" hreflang="x-default" href="${ORIGIN}${pagePath("fr", page)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Luso Sabores" />`,
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
  add("alternate", `${ORIGIN}${pagePath("fr", page)}`, "x-default");
}
export { PAGES };
