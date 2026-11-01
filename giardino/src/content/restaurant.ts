// Facts about the restaurant, all taken from pizzeriagiardino.ch and the pages it links to (checked 01.11.2026).
// Anything not published there is not stated on the site. Sources are noted per block; HANDOFF.md has the full list.
import { same, t, type Lang, type T } from "../i18n/langs";

export const RESTAURANT = {
  /** as on the logo and the website; the listing service (myls.ch) uses «Restaurant Pizzeria Giardino» */
  name: "Pizzeria Giardino",
  legalName: "Restaurant Pizzeria Giardino",
  hosts: "Pascal & Anja Loretan",
  street: "Thermenstrasse 9",
  postcode: "3954",
  town: "Leukerbad",
  region: "Wallis",
  country: "CH",
  phone: "+41 27 530 05 84",
  phoneHref: "tel:+41275300584",
  phoneDisplay: "+41 (0)27 530 05 84",
  email: "info@pizzeriagiardino.ch",
  /** myls.ch listing (same as the map pin on the Anreise page within ~15 m) */
  geo: { lat: 46.379218212986665, lng: 7.627061464418041 },
  url: "https://pizzeriagiardino.ch",
  since: 2012,
  sons: ["Janis", "Niklas"],
  playgroundSince: 2016,
};

export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Pizzeria Giardino, Thermenstrasse 9, 3954 Leukerbad")}`;
export const appleMapsHref = `https://maps.apple.com/?q=${encodeURIComponent("Pizzeria Giardino")}&address=${encodeURIComponent("Thermenstrasse 9, 3954 Leukerbad, Switzerland")}&ll=${RESTAURANT.geo.lat},${RESTAURANT.geo.lng}`;
/** the restaurant's own Google profile link from the footer of the current site */
export const googleProfileHref = "https://g.co/kgs/BCibBDs";

/** Gift vouchers are sold through felizzio (live shop, 01.11.2026): CHF 50 / 100 / 150 or a free amount, valid 2 years. */
export const VOUCHERS = {
  href: (lang: Lang) => `https://www.felizzio.com/${lang}/pizzeriagiardino/shop`,
  options: [50, 100, 150] as number[],
  freeAmount: true,
  validityYears: 2,
};

/** «Als 100-Prozent-WIR-Betrieb akzeptieren wir auch gerne WIR-Geld.» */
export const WIR = { href: "https://www.wir.ch/" };

/** Virtual tour (Matterport), embedded on the Rundgang page of the current site. */
export const TOUR = { href: (lang: Lang) => `https://my.matterport.com/show/?m=W51AKaLxmne${lang === "de" ? "" : `&lang=${lang}`}` };

export const LEUKERBAD_THERME = {
  /** the current site's menu item redirects to www.leukerbad-therme.ch, which no longer answers; the spa now lives at leukerbad.ch/therme */
  href: "https://www.leukerbad.ch/therme",
};

export type Hotel = { name: string; street: string; town: string; phone: string; phoneHref: string; fax?: string; email: string; web: string };
/** Partnerhotels page (same three hotels in all four languages). */
export const HOTELS: Hotel[] = [
  { name: "Hotel Heilquelle", street: "Thermenstrasse 9", town: "3954 Leukerbad", phone: "+41 27 470 22 22", phoneHref: "tel:+41274702222", email: "info@heilquelle.ch", web: "https://www.heilquelle.ch" },
  { name: "Hotel Paradis", street: "Kunibergstrasse 14", town: "3954 Leukerbad", phone: "+41 27 470 12 33", phoneHref: "tel:+41274701233", email: "info@hotel-paradis.ch", web: "https://www.hotel-paradis.ch" },
  { name: "Hotel Viktoria", street: "Pfolongstutz 2", town: "3954 Leukerbad", phone: "+41 (0)27 470 16 12", phoneHref: "tel:+41274701612", fax: "+41 (0)27 470 36 12", email: "hotel@viktoria-leukerbad.ch", web: "https://viktoria-leukerbad.ch" },
];

/** Presse page: two entries. */
export const PRESS = [
  {
    id: "rro",
    title: t("Besuch von rro.ch in der Pizzeria Giardino", "Visit of rro.ch at Pizzeria Giardino", "Visite de rro.ch à la Pizzeria Giardino", "Visita di rro.ch alla Pizzeria Giardino"),
    source: "rro.ch · YouTube",
    href: "https://www.youtube.com/watch?v=ml0f9Xh8waU",
    youtubeId: "ml0f9Xh8waU",
    body: null as T | null,
  },
  {
    id: "cunda",
    title: t("Kinderfreundliche Restaurants", "Child-friendly restaurants", "Restaurants adaptés aux enfants", "Ristoranti a misura di bambino"),
    source: "C&A Schweiz",
    /** the article has been taken down; C&A redirects the old address to a general page, so no link is shown */
    href: null as string | null,
    youtubeId: null as string | null,
    body: t(
      "«Sonnenterrasse und Kinderparadies zugleich – eine bessere Kombination ist nur schwer vorstellbar. Das Restaurant bietet eine kinderfreundliche Speisekarte. Langweilig wird es den Kleinen nicht werden, denn Spielzimmer und ein grosser Aussenspielplatz mit Piratenschiff stehen zum Austoben bereit.»",
      "“A sun terrace and a children’s paradise at once – it is hard to imagine a better combination. The restaurant offers a child-friendly menu. The little ones won’t get bored: a playroom and a large outdoor playground with a pirate ship are ready for them to let off steam.”",
      "«Une terrasse ensoleillée et un paradis pour les enfants à la fois – difficile d’imaginer meilleure combinaison. Le restaurant propose une carte adaptée aux enfants. Les petits ne s’ennuieront pas : une salle de jeux et une grande aire de jeux extérieure avec bateau de pirates les attendent pour se défouler.»",
      "«Terrazza soleggiata e paradiso dei bambini insieme: difficile immaginare una combinazione migliore. Il ristorante offre un menù a misura di bambino. I piccoli non si annoieranno: una sala giochi e un grande parco giochi all’aperto con nave dei pirati li aspettano per scatenarsi.»",
    ),
  },
];

const TRIPADVISOR = "https://www.tripadvisor.ch/Restaurant_Review-g198859-d3640075-Reviews-Pizzeria_Giardino-Leukerbad_Canton_of_Valais_Swiss_Alps.html";

export type Label = { id: string; alt: T; href: string };
/**
 * «Labels & Partner»: the badges of the current site's header and footer, shown as image + link only, without any
 * prose about awards (BRIEF §4). Dropped: Google+ (service closed) and food4family.ch (domain gone); the Family
 * Destination badge is commented out on the current site. Images: public/brand/labels/<id>.webp, from the site's
 * template folder. Link checks: content/raw/links.csv.
 */
export const LABELS: Label[] = [
  { id: "tripadvisor-ruhmeshalle", alt: t("Tripadvisor Ruhmeshalle – Zertifikat für Exzellenz 2014–2018", "Tripadvisor Hall of Fame – Certificate of Excellence 2014–2018", "Tripadvisor Temple de la renommée – Certificat d’excellence 2014–2018", "Tripadvisor Hall of Fame – Certificato di eccellenza 2014–2018"), href: TRIPADVISOR },
  { id: "best-of-swiss-gastro", alt: t("Best of Swiss Gastro – Best of 2014, Activity", "Best of Swiss Gastro – Best of 2014, Activity", "Best of Swiss Gastro – Best of 2014, Activity", "Best of Swiss Gastro – Best of 2014, Activity"), href: "http://www.bestofswissgastro.ch/guide/pizzeria-giardino/" },
  { id: "wellness-destination", alt: same("Wellness Destination"), href: "https://www.myswitzerland.com/de-ch/wellness-destinaton-quality.html" },
  { id: "wir", alt: same("WIR"), href: "https://www.wir.ch/" },
  { id: "zoeliakie", alt: t("IG Zöliakie – «ohne Gluten» 2014", "IG Zöliakie – “ohne Gluten” (without gluten) 2014", "IG Zöliakie – «ohne Gluten» (sans gluten) 2014", "IG Zöliakie – «ohne Gluten» (senza glutine) 2014"), href: "https://www.zoeliakie.ch/" },
  { id: "babyfreundlich", alt: t("BABYfreundlich", "BABYfreundlich (baby-friendly)", "BABYfreundlich (adapté aux bébés)", "BABYfreundlich (a misura di bebè)"), href: "https://social.babyfreundlich.ch/ort/leukerbad/pizzeria-giardino/" },
  { id: "tripadvisor", alt: same("Tripadvisor"), href: TRIPADVISOR },
  { id: "google", alt: same("Google"), href: "https://g.co/kgs/BCibBDs" },
  { id: "facebook", alt: same("Facebook"), href: "https://www.facebook.com/pages/Pizzeria-Giardino/140821139297172/" },
  { id: "foursquare", alt: same("Foursquare"), href: "https://foursquare.com/v/pizzeria-giardino/4e457acfd4c065cb6b922e71/" },
];

/** The restaurant's official pages, linked from the proposal's Impressum and Datenschutz (BRIEF §12). */
export const OFFICIAL = {
  imprint: (lang: Lang) => `https://pizzeriagiardino.ch/${({ de: "de/impressum", en: "en/imprint", fr: "fr/empreinte", it: "it/impronta" } as const)[lang]}`,
  /** the Datenschutz page exists in German only */
  privacy: "https://pizzeriagiardino.ch/de/datenschutz",
};

/** The four menu PDFs as the current site links them (query URLs on the home page). */
export const MENU_PDF_LIVE = {
  food: "https://pizzeriagiardino.ch?action=get_file&id=13&resource_link_id=124",
  drinks: "https://pizzeriagiardino.ch?action=get_file&id=13&resource_link_id=15a",
  kids: "https://pizzeriagiardino.ch?action=get_file&id=13&resource_link_id=158",
  desserts: "https://pizzeriagiardino.ch?action=get_file&id=13&resource_link_id=159",
};

/** Jobs page: the vacancies are published on hoteljob-schweiz.de; applications by e-mail. */
export const JOBS = {
  href: "https://hoteljob-schweiz.de/pizzeria-giardino-leukerbad-jobs-4037.htm",
  roles: t(
    "Zur Unterstützung unseres Teams suchen wir eine kompetente und belastbare Servicemitarbeiterin sowie eine Küchenhilfe oder einen Hilfskoch.",
    "To support our team we are looking for a competent service employee who can work under pressure, and a kitchen assistant or assistant cook.",
    "Pour compléter notre équipe, nous recherchons une serveuse compétente et motivée ainsi qu’un·e aide de cuisine ou aide-cuisinier·ère.",
    "Per rinforzare il nostro team cerchiamo una cameriera competente e capace di lavorare sotto pressione, e un aiuto di cucina o un aiuto cuoco.",
  ),
};

/** Impressum. */
export const CREDITS = {
  photography: { name: "Christian Pfammatter", town: "3930 Visp", href: "http://www.christianpfammatter.ch" },
};
