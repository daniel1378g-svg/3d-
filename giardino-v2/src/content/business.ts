// Every fact about the restaurant, taken from pizzeriagiardino.ch and the pages it links to (re-checked 01–02.11.2026).
// Nothing here is invented; anything the restaurant does not publish is not stated on the site.
import { l, type L, type Lang } from "@/i18n";

const ADDRESS = "Thermenstrasse 9, 3954 Leukerbad";
/** Google's own listing of the restaurant ("Restaurant Pizzeria Giardino", Thermenstrasse 9), place ID verified in Google
 *  Maps on 01.11.2026; its coordinates match the restaurant's localsearch listing within a few metres. */
const PLACE_ID = "ChIJA8Uhswkbj0cRjoi89632nEg";
const GEO = { lat: 46.3792172, lng: 7.6270534 };

export const BUSINESS = {
  name: "Pizzeria Giardino",
  /** as Google and localsearch list it */
  listingName: "Restaurant Pizzeria Giardino",
  hosts: "Pascal & Anja Loretan",
  street: "Thermenstrasse 9",
  postcode: "3954",
  town: "Leukerbad",
  country: "CH",
  phone: "+41 27 530 05 84",
  tel: "+41275300584",
  email: "info@pizzeriagiardino.ch",
  geo: GEO,
  since: 2012,
  /** the live site's own address */
  officialSite: "https://pizzeriagiardino.ch",
  maps: {
    google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Restaurant Pizzeria Giardino, " + ADDRESS)}&query_place_id=${PLACE_ID}`,
    googleDirections: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Restaurant Pizzeria Giardino, " + ADDRESS)}&destination_place_id=${PLACE_ID}`,
    apple: `https://maps.apple.com/?daddr=${encodeURIComponent(ADDRESS + ", Switzerland")}&ll=${GEO.lat},${GEO.lng}&q=${encodeURIComponent("Pizzeria Giardino")}`,
    waze: `https://waze.com/ul?ll=${GEO.lat}%2C${GEO.lng}&navigate=yes`,
  },
  /** "Read more on Google": the verified Google Maps listing (see PLACE_ID). */
  googleListing: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Restaurant Pizzeria Giardino, " + ADDRESS)}&query_place_id=${PLACE_ID}`,
  facebook: "https://www.facebook.com/pages/Pizzeria-Giardino/140821139297172/",
  tripadvisor: "https://www.tripadvisor.ch/Restaurant_Review-g198859-d3640075-Reviews-Pizzeria_Giardino-Leukerbad_Canton_of_Valais_Swiss_Alps.html",
  /** «Als 100-Prozent-WIR-Betrieb akzeptieren wir auch gerne WIR-Geld.» (Essen & Geniessen) */
  wir: "https://www.wir.ch/",
  /** felizzio sells the vouchers in German, English and French */
  vouchers: (lang: Lang) => `https://www.felizzio.com/${lang === "it" ? "en" : lang}/pizzeriagiardino/shop`,
  voucherOptions: [50, 100, 150],
  voucherYears: 2,
  tour: (lang: Lang) => `https://my.matterport.com/show/?m=W51AKaLxmne&lang=${lang}`,
  /** Jobs page: vacancies are posted on hoteljob-schweiz.de, applications by e-mail */
  jobsBoard: "https://hoteljob-schweiz.de/pizzeria-giardino-leukerbad-jobs-4037.htm",
  press: { rro: "https://www.youtube.com/watch?v=ml0f9Xh8waU" },
  /** the restaurant's current privacy statement (German only on the live site) */
  officialPrivacy: "https://pizzeriagiardino.ch/de/datenschutz",
  photographer: { name: "Christian Pfammatter", town: "3930 Visp" },
  copyright: "© 2026 Pizzeria Giardino",
};

/** The Kontakt page of the live site prints a different street. Directions use Thermenstrasse 9, which the home page,
 *  the footer of every page, the Impressum and the Anreise page all give. Listed in HANDOFF.md. */
export const ADDRESS_CONFLICT = { contactPage: "Rathausstrasse 7", used: "Thermenstrasse 9" };

export type MenuDoc = { id: "food" | "kids" | "desserts" | "drinks"; href: string; pages: number; mb: number; title: L; kicker: L };
/** The four PDFs as the live site links them; pages and sizes as served on 01.11.2026 (German, partly French). */
export const MENUS: MenuDoc[] = [
  {
    id: "food",
    href: "https://pizzeriagiardino.ch/?action=get_file&id=13&resource_link_id=124",
    pages: 6,
    mb: 10.3,
    title: l("Speisekarte", "Carte des mets", "Main menu", "Menù"),
    kicker: l("Vorspeisen · Aus der Region · Pizzen · Risotto · Teigwaren · Fleisch", "Entrées · De la région · Pizzas · Risottos · Pâtes · Viandes", "Starters · From the region · Pizzas · Risotto · Pasta · Meat", "Antipasti · Dalla regione · Pizze · Risotti · Paste · Carni"),
  },
  {
    id: "kids",
    href: "https://pizzeriagiardino.ch/?action=get_file&id=13&resource_link_id=158",
    pages: 2,
    mb: 2.4,
    title: l("Kinderkarte", "Carte des enfants", "Children’s menu", "Menù bambini"),
    kicker: l("Kids World · für unsere kleinen Gäste", "Kids World · pour nos petits hôtes", "Kids World · for our youngest guests", "Kids World · per i nostri piccoli ospiti"),
  },
  {
    id: "desserts",
    href: "https://pizzeriagiardino.ch/?action=get_file&id=13&resource_link_id=159",
    pages: 2,
    mb: 2.8,
    title: l("Dessertkarte", "Carte des desserts", "Desserts", "Dessert"),
    kicker: l("Coupes · Sorbets mit Schuss · Panna Cotta · Glace", "Coupes · Sorbets arrosés · Panna cotta · Glaces", "Sundaes · Spiked sorbets · Panna cotta · Ice cream", "Coppe · Sorbetti corretti · Panna cotta · Gelati"),
  },
  {
    id: "drinks",
    href: "https://pizzeriagiardino.ch/?action=get_file&id=13&resource_link_id=15a",
    pages: 6,
    mb: 10.3,
    title: l("Getränkekarte", "Carte des boissons", "Drinks", "Bevande"),
    kicker: l("Aperitifs · Bier · Walliser & italienische Weine · Kaffee · Digestifs", "Apéritifs · Bières · Vins du Valais et d’Italie · Cafés · Digestifs", "Aperitifs · Beer · Valais & Italian wines · Coffee · Digestifs", "Aperitivi · Birre · Vini vallesani e italiani · Caffè · Digestivi"),
  },
];

export type Hotel = { name: string; street: string; town: string; phone: string; tel: string; email: string; web: string; host: string };
/** Partnerhotels page (the same three hotels in all four languages). */
export const HOTELS: Hotel[] = [
  { name: "Hotel Heilquelle", street: "Thermenstrasse 9", town: "3954 Leukerbad", phone: "+41 27 470 22 22", tel: "+41274702222", email: "info@heilquelle.ch", web: "https://www.heilquelle.ch", host: "www.heilquelle.ch" },
  { name: "Hotel Paradis", street: "Kunibergstrasse 14", town: "3954 Leukerbad", phone: "+41 27 470 12 33", tel: "+41274701233", email: "info@hotel-paradis.ch", web: "https://www.hotel-paradis.ch", host: "www.hotel-paradis.ch" },
  { name: "Hotel Viktoria", street: "Pfolongstutz 2", town: "3954 Leukerbad", phone: "+41 27 470 16 12", tel: "+41274701612", email: "hotel@viktoria-leukerbad.ch", web: "https://viktoria-leukerbad.ch", host: "viktoria-leukerbad.ch" },
];
