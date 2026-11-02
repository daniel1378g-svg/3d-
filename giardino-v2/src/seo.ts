// Titles, descriptions, canonical and hreflang links, Open Graph and the Restaurant JSON-LD. Used at runtime
// (applyHead, after every page or language change) and by scripts/prerender.mjs, which writes one static HTML file per
// page and language so crawlers and link previews get the right head without running the app.
import { HTML_LANG, LANGS, OG_LOCALE, l, pathFor, type L, type Lang, type PageKey } from "./i18n";
import { BUSINESS, MENUS } from "./content/business";
import { CLOSURES, REST_DAYS, WEEK, zurichNow } from "./content/hours";

export const ORIGIN = (import.meta.env?.VITE_ORIGIN as string | undefined) ?? "https://pizzeriagiardino.ch";

const TITLES: Record<PageKey, L> = {
  home: l("Pizzeria Giardino Leukerbad – italienische Seele, alpines Herz", "Pizzeria Giardino Leukerbad – âme italienne, cœur alpin", "Pizzeria Giardino Leukerbad – Italian soul, alpine heart", "Pizzeria Giardino Leukerbad – anima italiana, cuore alpino"),
  menu: l("Speisekarte – Pizzeria Giardino Leukerbad", "La carte – Pizzeria Giardino Leukerbad", "Menu – Pizzeria Giardino Leukerbad", "Menù – Pizzeria Giardino Leukerbad"),
  families: l("Familien & Kinder – Pizzeria Giardino Leukerbad", "Familles & enfants – Pizzeria Giardino Leukerbad", "Families & kids – Pizzeria Giardino Leukerbad", "Famiglie & bambini – Pizzeria Giardino Leukerbad"),
  story: l("Unsere Geschichte – Pizzeria Giardino Leukerbad", "Notre histoire – Pizzeria Giardino Leukerbad", "Our story – Pizzeria Giardino Leukerbad", "La nostra storia – Pizzeria Giardino Leukerbad"),
  visit: l("Öffnungszeiten, Anreise & Kontakt – Pizzeria Giardino", "Horaires, accès & contact – Pizzeria Giardino", "Opening hours, arrival & contact – Pizzeria Giardino", "Orari, come arrivare & contatti – Pizzeria Giardino"),
  gallery: l("Galerie – Pizzeria Giardino Leukerbad", "Galerie – Pizzeria Giardino Leukerbad", "Gallery – Pizzeria Giardino Leukerbad", "Galleria – Pizzeria Giardino Leukerbad"),
  hotels: l("Partnerhotels in Leukerbad – Pizzeria Giardino", "Hôtels partenaires à Leukerbad – Pizzeria Giardino", "Partner hotels in Leukerbad – Pizzeria Giardino", "Hotel partner a Leukerbad – Pizzeria Giardino"),
  jobs: l("Jobs – Pizzeria Giardino Leukerbad", "Emplois – Pizzeria Giardino Leukerbad", "Jobs – Pizzeria Giardino Leukerbad", "Lavora con noi – Pizzeria Giardino Leukerbad"),
  press: l("Presse – Pizzeria Giardino Leukerbad", "Presse – Pizzeria Giardino Leukerbad", "Press – Pizzeria Giardino Leukerbad", "Stampa – Pizzeria Giardino Leukerbad"),
  imprint: l("Impressum – Pizzeria Giardino Leukerbad", "Mentions légales – Pizzeria Giardino Leukerbad", "Imprint – Pizzeria Giardino Leukerbad", "Note legali – Pizzeria Giardino Leukerbad"),
  privacy: l("Datenschutz – Pizzeria Giardino Leukerbad", "Protection des données – Pizzeria Giardino Leukerbad", "Privacy – Pizzeria Giardino Leukerbad", "Privacy – Pizzeria Giardino Leukerbad"),
};

const DESCRIPTIONS: Record<PageKey, L> = {
  home: l(
    "Pizza, Pasta, Risotto und Walliser Weine im Zentrum von Leukerbad: Sonnenterrasse mit Sicht auf Gemmi und Torrent, Spielzimmer und Piratenschiff für Kinder. Reservation per Telefon.",
    "Pizzas, pâtes, risottos et vins du Valais au centre de Leukerbad : terrasse ensoleillée face à la Gemmi et au Torrent, salle de jeux et bateau de pirates pour les enfants. Réservation par téléphone.",
    "Pizza, pasta, risotto and Valais wines in the centre of Leukerbad: a sun terrace facing the Gemmi and Torrent, a playroom and a pirate ship for children. Bookings by phone.",
    "Pizza, pasta, risotto e vini vallesani nel centro di Leukerbad: terrazza soleggiata con vista sul Gemmi e sul Torrent, sala giochi e nave dei pirati per i bambini. Prenotazioni per telefono.",
  ),
  menu: l(
    "Pizza mit täglich frischem Teig, Pasta, Risotto, Desserts, Kinderkarte sowie Walliser und italienische Weine – die Karten der Pizzeria Giardino als PDF.",
    "Pizzas à la pâte fraîche du jour, pâtes, risottos, desserts, carte des enfants, vins du Valais et d’Italie – les cartes de la Pizzeria Giardino en PDF.",
    "Pizza with dough made fresh every day, pasta, risotto, desserts, a children’s menu and Valais and Italian wines – the menus of Pizzeria Giardino as PDFs.",
    "Pizza con impasto fresco ogni giorno, pasta, risotto, dessert, menù bambini e vini vallesani e italiani – i menù della Pizzeria Giardino in PDF.",
  ),
  families: l(
    "Kinderkarte, Spielzimmer, grosser Aussenspielplatz und Piratenschiff: Das Giardino in Leukerbad ist ein Paradies für Kinder.",
    "Carte des enfants, salle de jeux, grande aire de jeux et bateau de pirates : le Giardino à Leukerbad est un paradis pour les enfants.",
    "A children’s menu, a playroom, a big outdoor playground and a pirate ship: Giardino in Leukerbad is a paradise for children.",
    "Menù bambini, sala giochi, grande parco giochi e nave dei pirati: il Giardino di Leukerbad è un paradiso per i bambini.",
  ),
  story: l(
    "Seit 2012 führen Pascal und Anja Loretan die Gastgebertradition im Giardino in Leukerbad in zweiter Generation fort.",
    "Depuis 2012, Pascal et Anja Loretan perpétuent en deuxième génération la tradition d’hospitalité du Giardino à Leukerbad.",
    "Since 2012, Pascal and Anja Loretan have carried on the tradition of hospitality at Giardino in Leukerbad as the second generation.",
    "Dal 2012 Pascal e Anja Loretan portano avanti in seconda generazione la tradizione dell’ospitalità del Giardino di Leukerbad.",
  ),
  visit: l(
    "Thermenstrasse 9, 3954 Leukerbad. Geöffnet 11–23 Uhr, Mittwoch Ruhetag; warme Küche 11:30–15:00 und 17:00–21:30. Reservation: +41 27 530 05 84.",
    "Thermenstrasse 9, 3954 Leukerbad. Ouvert de 11 h à 23 h, fermé le mercredi ; cuisine chaude de 11 h 30 à 15 h et de 17 h à 21 h 30. Réservation : +41 27 530 05 84.",
    "Thermenstrasse 9, 3954 Leukerbad. Open 11:00–23:00, closed on Wednesdays; hot meals 11:30–15:00 and 17:00–21:30. Bookings: +41 27 530 05 84.",
    "Thermenstrasse 9, 3954 Leukerbad. Aperto 11–23, chiuso il mercoledì; cucina calda 11:30–15:00 e 17:00–21:30. Prenotazioni: +41 27 530 05 84.",
  ),
  gallery: l(
    "Fotos der Küche, der Gaststube und Terrasse, des Spielzimmers und des Piratenschiffs der Pizzeria Giardino in Leukerbad.",
    "Photos de la cuisine, de la salle et de la terrasse, de la salle de jeux et du bateau de pirates de la Pizzeria Giardino à Leukerbad.",
    "Photos of the food, the dining room and terrace, the playroom and the pirate ship at Pizzeria Giardino in Leukerbad.",
    "Foto della cucina, della sala e della terrazza, della sala giochi e della nave dei pirati della Pizzeria Giardino di Leukerbad.",
  ),
  hotels: l("Die Partnerhotels der Pizzeria Giardino: Hotel Heilquelle, Hotel Paradis und Hotel Viktoria in Leukerbad.", "Les hôtels partenaires de la Pizzeria Giardino : Hotel Heilquelle, Hotel Paradis et Hotel Viktoria à Leukerbad.", "The partner hotels of Pizzeria Giardino: Hotel Heilquelle, Hotel Paradis and Hotel Viktoria in Leukerbad.", "Gli hotel partner della Pizzeria Giardino: Hotel Heilquelle, Hotel Paradis e Hotel Viktoria a Leukerbad."),
  jobs: l("Arbeiten im Service oder in der Küche der Pizzeria Giardino in Leukerbad.", "Travailler au service ou en cuisine à la Pizzeria Giardino à Leukerbad.", "Work in service or in the kitchen at Pizzeria Giardino in Leukerbad.", "Lavorare in sala o in cucina alla Pizzeria Giardino di Leukerbad."),
  press: l("Die Pizzeria Giardino in den Medien: ein Besuch von rro.ch.", "La Pizzeria Giardino dans les médias : la visite de rro.ch.", "Pizzeria Giardino in the media: a visit from rro.ch.", "La Pizzeria Giardino nei media: la visita di rro.ch."),
  imprint: l("Impressum der Pizzeria Giardino, Pascal & Anja Loretan, Thermenstrasse 9, 3954 Leukerbad.", "Mentions légales de la Pizzeria Giardino, Pascal & Anja Loretan, Thermenstrasse 9, 3954 Leukerbad.", "Imprint of Pizzeria Giardino, Pascal & Anja Loretan, Thermenstrasse 9, 3954 Leukerbad.", "Note legali della Pizzeria Giardino, Pascal & Anja Loretan, Thermenstrasse 9, 3954 Leukerbad."),
  privacy: l("Wie diese Website mit Ihren Daten umgeht.", "Comment ce site traite vos données.", "How this website handles your data.", "Come questo sito tratta i vostri dati."),
};

export const pageTitle = (lang: Lang, page: PageKey) => TITLES[page][lang];
export const pageDescription = (lang: Lang, page: PageKey) => DESCRIPTIONS[page][lang];
const OG_IMAGE: Partial<Record<PageKey, string>> = { home: "pizza-ham-rocket", menu: "pizza-rocket", families: "ship-cliffs", story: "hosts", visit: "aerial-village", gallery: "terrace-view", hotels: "garden-view" };
const ogImage = (page: PageKey) => `${ORIGIN}/images/${OG_IMAGE[page] ?? "aerial-village"}-1440.webp`;

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** schema.org Restaurant from the verified facts. The Wednesday rest day is the day missing from dayOfWeek;
 *  closures not yet over are listed as closed (opens = closes = 00:00, with validFrom/validThrough). */
export function jsonLd(lang: Lang, today = zurichNow().date) {
  const open = [0, 1, 2, 3, 4, 5, 6].filter((d) => !REST_DAYS.includes(d));
  const weekly = { "@type": "OpeningHoursSpecification", dayOfWeek: open.map((d) => DAY_NAMES[d]), opens: WEEK.restaurant[open[0]][0].from, closes: WEEK.restaurant[open[0]][0].to };
  const closures = CLOSURES.filter((c) => c.to >= today).map((c) => ({ "@type": "OpeningHoursSpecification", validFrom: c.from, validThrough: c.to, opens: "00:00", closes: "00:00", description: c.title[lang] }));
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${ORIGIN}/#restaurant`,
    name: BUSINESS.name,
    alternateName: BUSINESS.listingName,
    url: `${ORIGIN}${pathFor(lang, "home")}`,
    image: [`${ORIGIN}/images/pizza-ham-rocket-1440.webp`, `${ORIGIN}/images/aerial-village-1440.webp`, `${ORIGIN}/images/terrace-view-1440.webp`],
    logo: `${ORIGIN}/brand/logo.png`,
    telephone: BUSINESS.tel,
    email: BUSINESS.email,
    address: { "@type": "PostalAddress", streetAddress: BUSINESS.street, postalCode: BUSINESS.postcode, addressLocality: BUSINESS.town, addressRegion: "VS", addressCountry: "CH" },
    geo: { "@type": "GeoCoordinates", latitude: BUSINESS.geo.lat, longitude: BUSINESS.geo.lng },
    servesCuisine: ["Italian", "Pizza"],
    acceptsReservations: true,
    menu: MENUS[0].href,
    openingHoursSpecification: [weekly, ...closures],
    hasMap: BUSINESS.googleListing,
    sameAs: [BUSINESS.facebook, BUSINESS.tripadvisor],
    inLanguage: HTML_LANG[lang],
  };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
/** The head tags for one page (static build). */
export function headTags(lang: Lang, page: PageKey) {
  const url = `${ORIGIN}${pathFor(lang, page)}`;
  const ld = jsonLd(lang);
  const tags = [
    `<link rel="canonical" href="${url}" />`,
    ...LANGS.map((x) => `<link rel="alternate" hreflang="${HTML_LANG[x]}" href="${ORIGIN}${pathFor(x, page)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${ORIGIN}${pathFor("de", page)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Pizzeria Giardino" />`,
    `<meta property="og:title" content="${esc(pageTitle(lang, page))}" />`,
    `<meta property="og:description" content="${esc(pageDescription(lang, page))}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${ogImage(page)}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[lang]}" />`,
    ...LANGS.filter((x) => x !== lang).map((x) => `<meta property="og:locale:alternate" content="${OG_LOCALE[x]}" />`),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>`,
  ];
  return { title: pageTitle(lang, page), description: pageDescription(lang, page), html: tags.join("\n    ") };
}

function setMeta(selector: string, attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

/** Keeps the live document's head in step with the page and language. */
export function applyHead(lang: Lang, page: PageKey) {
  document.documentElement.lang = HTML_LANG[lang];
  document.title = pageTitle(lang, page);
  setMeta('meta[name="description"]', "name", "description", pageDescription(lang, page));
  setMeta('meta[property="og:title"]', "property", "og:title", pageTitle(lang, page));
  setMeta('meta[property="og:description"]', "property", "og:description", pageDescription(lang, page));
  setMeta('meta[property="og:locale"]', "property", "og:locale", OG_LOCALE[lang]);
  if (__ARTIFACT__) return;
  const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonical) canonical.href = `${ORIGIN}${pathFor(lang, page)}`;
  for (const x of LANGS) {
    const alt = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${HTML_LANG[x]}"]`);
    if (alt) alt.href = `${ORIGIN}${pathFor(x, page)}`;
  }
  const ld = document.head.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
  if (ld) {
    ld.textContent = JSON.stringify(jsonLd(lang));
  }
}
