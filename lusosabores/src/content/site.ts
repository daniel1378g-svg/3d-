// The restaurant's own words and facts, copied from https://www.luso-sabores.ch (French, verbatim, read on
// 29 October 2026) with their translations. Facts (names, numbers, the address, the hours) are identical in
// every language; the translations change the language, never the facts.
import type { L } from "@/i18n";
import menu from "@content/menu.json";
import reviews from "@content/reviews.json";

export const BUSINESS = {
  name: "Luso Sabores",
  /** The H1 of the live home page, and the name on the contact block. */
  h1: "LUSOSABORES Restaurant spécialités Portugaises à Gland",
  upper: "LUSOSABORES",
  street: "Chemin du Lavasson 39",
  city: "1196 Gland",
  country: "Suisse",
  /** As written on the site. */
  addressLine: "Chemin du Lavasson 39 1196 Gland",
  geo: { lat: 46.4232952, lng: 6.272197 },
  phones: [
    { label: "+41 22 364 47 40", tel: "+41223644740" },
    { label: "+41 79 903 81 31", tel: "+41799038131" },
  ],
  /** The 022 number: in the header and after every "Pour réserver…" line. */
  booking: { label: "+41 22 364 47 40", tel: "+41223644740" },
  /** "Plan": the address link of the live site (tested on 29 Oct 2026: still opens the restaurant on Google Maps). */
  planUrl: "https://goo.gl/maps/TU3Zg4jZsG5czYS59",
  mapsUrl:
    "https://www.google.com/maps/place/Restaurant+LUSOSabores/@46.4232952,6.272197,15z/data=!4m2!3m1!1s0x0:0xf15bbb931f51778c?sa=X&ved=2ahUKEwjdnr6mj7bsAhVKzKQKHaEADpQQ_BIwH3oECBwQBQ",
  mapsRoute: "https://www.google.com/maps/dir/?api=1&destination=46.4232952%2C6.272197",
  wazeUrl: "https://www.waze.com/ul?ll=46.42347%2C6.27236",
  appleUrl: "https://maps.apple.com/?address=Chemin%20du%20Lavasson%2039,%201196%20Gland,%20Suisse&ll=46.4232952,6.272197&q=Luso%20Sabores",
  mapEmbed: "https://www.google.com/maps?q=Restaurant+LUSOSabores,+Chemin+du+Lavasson+39,+1196+Gland&output=embed",
  facebook: "https://www.facebook.com/lusosabores.marquesribeiro",
  instagram: "https://www.instagram.com/lusosabores/",
  foursquare: "https://fr.foursquare.com/v/restaurant-portugais-luso-sabores/5f44fce7815dd91c30fd0fe8",
  /** The live link carries Yelp API tracking parameters; they are dropped here. */
  yelp: "https://de.yelp.ch/biz/restaurant-lusosabores-gland",
  googleReview: reviews.googleReviewUrl,
  copyright: "©2026 Luso Sabores | Tous droits réservés",
  oldSite: "https://www.luso-sabores.ch",
};

export const LISTINGS = [
  { label: "Google Maps", url: BUSINESS.mapsUrl },
  { label: "Foursquare", url: BUSINESS.foursquare },
  { label: "Yelp", url: BUSINESS.yelp },
  { label: "Waze", url: BUSINESS.wazeUrl },
];

const l = (fr: string, en: string, pt: string, it: string, de: string): L => ({ fr, en, pt, it, de });

export const TEXT = {
  /** The hero headline: the menu page's own line, split in two. */
  heroLeft: l("Le Portugal", "Portugal", "Portugal", "Il Portogallo", "Portugal"),
  heroRight: l("dans vos assiettes !", "on your plates!", "no seu prato!", "nei vostri piatti!", "auf Ihrem Teller!"),
  heroLine: l("Le Portugal dans vos assiettes !", "Portugal on your plates!", "Portugal no seu prato!", "Il Portogallo nei vostri piatti!", "Portugal auf Ihrem Teller!"),
  h1: l(
    "LUSOSABORES Restaurant spécialités Portugaises à Gland",
    "LUSOSABORES Restaurant of Portuguese specialities in Gland",
    "LUSOSABORES Restaurante de especialidades portuguesas em Gland",
    "LUSOSABORES Ristorante di specialità portoghesi a Gland",
    "LUSOSABORES Restaurant mit portugiesischen Spezialitäten in Gland",
  ),
  /** "Plat du jour", home page. */
  platDuJour1: l(
    "LUSOSABORES vous propose chaque jour de la semaine un plat du jour différent, mais toujours une spécialité portugaise !",
    "Every day of the week, LUSOSABORES offers you a different dish of the day, but always a Portuguese speciality!",
    "Todos os dias da semana, o LUSOSABORES propõe-lhe um prato do dia diferente, mas sempre uma especialidade portuguesa!",
    "Ogni giorno della settimana LUSOSABORES vi propone un piatto del giorno diverso, ma sempre una specialità portoghese!",
    "LUSOSABORES bietet Ihnen an jedem Wochentag ein anderes Tagesgericht an, aber immer eine portugiesische Spezialität!",
  ),
  platDuJour2: l(
    "Contactez-nous par téléphone pour connaître le plat du jour.",
    "Call us to find out the dish of the day.",
    "Contacte-nos por telefone para saber qual é o prato do dia.",
    "Contattateci per telefono per conoscere il piatto del giorno.",
    "Rufen Sie uns an, um das Tagesgericht zu erfahren.",
  ),
  /** "Qui sommes-nous ?", home page, three paragraphs and the signature. */
  qui1: l(
    "Chez LusoSabores, découvrez des grillades comme vous n'en avez jamais mangé...",
    "At LusoSabores, discover grilled dishes like you have never eaten before...",
    "No LusoSabores, descubra grelhados como nunca comeu...",
    "Da LusoSabores scoprite grigliate come non ne avete mai mangiate...",
    "Bei LusoSabores entdecken Sie Grilladen, wie Sie sie noch nie gegessen haben...",
  ),
  qui2: l(
    "Notre restaurant propose une cuisine portugaise. Découvrez nos spécialités portugaises, cuisinées avec des produits frais, dans une atmosphère accueillante et conviviale.",
    "Our restaurant serves Portuguese cuisine. Discover our Portuguese specialities, cooked with fresh produce, in a welcoming and friendly atmosphere.",
    "O nosso restaurante propõe cozinha portuguesa. Descubra as nossas especialidades portuguesas, cozinhadas com produtos frescos, num ambiente acolhedor e convivial.",
    "Il nostro ristorante propone una cucina portoghese. Scoprite le nostre specialità portoghesi, cucinate con prodotti freschi, in un’atmosfera accogliente e conviviale.",
    "Unser Restaurant bietet portugiesische Küche. Entdecken Sie unsere portugiesischen Spezialitäten, mit frischen Produkten zubereitet, in einer einladenden und geselligen Atmosphäre.",
  ),
  qui3: l(
    "Nous nous réjouissons de votre visite à bientôt chez LusoSabores !",
    "We look forward to your visit. See you soon at LusoSabores!",
    "Aguardamos a sua visita. Até breve no LusoSabores!",
    "Saremo lieti della vostra visita, a presto da LusoSabores!",
    "Wir freuen uns auf Ihren Besuch, bis bald bei LusoSabores!",
  ),
  signature: "João Ribeiro.",
  /** Menu page. */
  menuTitle: l("Découvrez notre menu", "Discover our menu", "Descubra a nossa ementa", "Scoprite il nostro menu", "Entdecken Sie unsere Speisekarte"),
  freshness: l(
    "Afin de garantir la fraîcheur de nos plats, nos 2 ou 3 assiettes du jour changent chaque jour et nos spécialités sont préparées uniquement sur demande 48h à l'avance.",
    "To keep our dishes fresh, our 2 or 3 plates of the day change every day, and our specialities are prepared only on request, 48 hours ahead.",
    "Para garantir a frescura dos nossos pratos, os nossos 2 ou 3 pratos do dia mudam todos os dias e as nossas especialidades são preparadas apenas por encomenda, com 48 horas de antecedência.",
    "Per garantire la freschezza dei nostri piatti, i nostri 2 o 3 piatti del giorno cambiano ogni giorno e le nostre specialità sono preparate solo su richiesta, 48 ore prima.",
    "Damit unsere Gerichte frisch sind, wechseln unsere 2 oder 3 Tagesteller jeden Tag, und unsere Spezialitäten werden nur auf Bestellung 48 Stunden im Voraus zubereitet.",
  ),
  /** The end of the freshness line, set large in the 48-hour section. */
  specialities48: l(
    "…nos spécialités sont préparées uniquement sur demande 48h à l'avance.",
    "…our specialities are prepared only on request, 48 hours ahead.",
    "…as nossas especialidades são preparadas apenas por encomenda, com 48 horas de antecedência.",
    "…le nostre specialità sono preparate solo su richiesta, 48 ore prima.",
    "…unsere Spezialitäten werden nur auf Bestellung 48 Stunden im Voraus zubereitet.",
  ),
  /** Services page. */
  privTitle: l("Privatisation pour évènements", "Private hire for events", "Privatização para eventos", "Privatizzazione per eventi", "Exklusivmiete für Anlässe"),
  priv1: l(
    "Pour vos évènements tels que les anniversaires, diners d'entreprise etc., il est possible de privatiser le restaurant.",
    "For your events, such as birthdays, company dinners and so on, the restaurant can be booked for exclusive use.",
    "Para os seus eventos, como aniversários, jantares de empresa, etc., é possível privatizar o restaurante.",
    "Per i vostri eventi, come compleanni, cene aziendali ecc., è possibile privatizzare il ristorante.",
    "Für Ihre Anlässe wie Geburtstage, Firmenessen usw. kann das Restaurant exklusiv gemietet werden.",
  ),
  priv2: l(
    "Nous proposons plusieurs formules avec traiteur, prix sur demande.",
    "We offer several catering formulas, prices on request.",
    "Propomos várias fórmulas com catering, preço sob consulta.",
    "Proponiamo diverse formule con catering, prezzi su richiesta.",
    "Wir bieten mehrere Angebote mit Catering an, Preise auf Anfrage.",
  ),
  openTitle: l("Ouverts 7/7", "Open 7/7", "Abertos 7/7", "Aperti 7/7", "Offen 7/7"),
  open77: l(
    "Notre restaurant vous accueille 7 jours sur 7, du Lundi au Dimanche sans exception, pour le plus grand plaisir de vos papilles ! Il est possible de prendre votre repas sur place, ou à l'emporter.",
    "Our restaurant welcomes you 7 days a week, Monday to Sunday without exception, to the delight of your taste buds! You can have your meal on site, or take it away.",
    "O nosso restaurante recebe-o 7 dias por semana, de segunda a domingo sem exceção, para o maior prazer do seu paladar! Pode fazer a sua refeição no local, ou levá-la consigo.",
    "Il nostro ristorante vi accoglie 7 giorni su 7, dal lunedì alla domenica senza eccezioni, per il più grande piacere del vostro palato! Potete consumare il pasto sul posto o da asporto.",
    "Unser Restaurant empfängt Sie an 7 Tagen in der Woche, von Montag bis Sonntag ohne Ausnahme, zur grossen Freude Ihres Gaumens! Sie können Ihre Mahlzeit vor Ort essen oder mitnehmen.",
  ),
  /** The last sentence of the "Ouverts 7/7" paragraph. */
  takeaway: l(
    "Il est possible de prendre votre repas sur place, ou à l'emporter.",
    "You can have your meal on site, or take it away.",
    "Pode fazer a sua refeição no local, ou levá-la consigo.",
    "Potete consumare il pasto sul posto o da asporto.",
    "Sie können Ihre Mahlzeit vor Ort essen oder mitnehmen.",
  ),
  /** Menu, Services and Contact pages: followed by +41 22 364 47 40. */
  toBook: l(
    "Pour réserver une table ou connaître notre plat du jour, merci de bien vouloir nous contacter par téléphone",
    "To book a table or find out our dish of the day, please contact us by phone",
    "Para reservar uma mesa ou saber qual é o prato do dia, queira contactar-nos por telefone",
    "Per prenotare un tavolo o conoscere il nostro piatto del giorno, vi preghiamo di contattarci per telefono",
    "Um einen Tisch zu reservieren oder unser Tagesgericht zu erfahren, kontaktieren Sie uns bitte per Telefon",
  ),
  /** Contact page. */
  visit: l("Venez nous rendre visite", "Come and visit us", "Venha visitar-nos", "Venite a trovarci", "Besuchen Sie uns"),
  hoursTitle: l("Horaires d'ouverture", "Opening hours", "Horário de abertura", "Orari di apertura", "Öffnungszeiten"),
  onSite: l("REPAS SUR PLACE OU À L'EMPORTER", "EAT IN OR TAKE AWAY", "REFEIÇÕES NO LOCAL OU PARA LEVAR", "PASTI SUL POSTO O DA ASPORTO", "ESSEN VOR ORT ODER ZUM MITNEHMEN"),
  reviewCta: l("Laissez-nous un avis sur Google", "Leave us a review on Google", "Deixe-nos uma opinião no Google", "Lasciateci una recensione su Google", "Hinterlassen Sie uns eine Bewertung auf Google"),
  /** The hours days in each language (the times never change; only their format follows the language). */
  monSun: l("Lundi & Dimanche", "Monday & Sunday", "Segunda & Domingo", "Lunedì & Domenica", "Montag & Sonntag"),
  tueSat: l("Mardi à Samedi", "Tuesday to Saturday", "Terça a Sábado", "Da martedì a sabato", "Dienstag bis Samstag"),
  /** The logo strip. */
  strip: l(
    "LUSO SABORES · SPÉCIALITÉS PORTUGAISES · GRILLADES · BACALHAU · PICANHA · FRANCESINHA · OUVERT 7/7 · SUR PLACE OU À L'EMPORTER · GLAND",
    "LUSO SABORES · PORTUGUESE SPECIALITIES · GRILLS · BACALHAU · PICANHA · FRANCESINHA · OPEN 7/7 · EAT IN OR TAKE AWAY · GLAND",
    "LUSO SABORES · ESPECIALIDADES PORTUGUESAS · GRELHADOS · BACALHAU · PICANHA · FRANCESINHA · ABERTO 7/7 · NO LOCAL OU PARA LEVAR · GLAND",
    "LUSO SABORES · SPECIALITÀ PORTOGHESI · GRIGLIATE · BACALHAU · PICANHA · FRANCESINHA · APERTO 7/7 · SUL POSTO O DA ASPORTO · GLAND",
    "LUSO SABORES · PORTUGIESISCHE SPEZIALITÄTEN · GRILLADEN · BACALHAU · PICANHA · FRANCESINHA · OFFEN 7/7 · VOR ORT ODER ZUM MITNEHMEN · GLAND",
  ),
};

// ------------------------------------------------------------------ the menu (content/menu.json)
export type GroupId = "grelhados" | "bacalhau" | "pratos" | "marisco" | "petiscos" | "especialidades";
export type Tile = { n: number; id: string; name: string; group: GroupId; photo: string; alt: L };
export const TILES = menu.tiles as Tile[];
export const tileById = (id: string) => {
  const t = TILES.find((x) => x.id === id);
  if (!t) throw new Error(`unknown tile ${id}`);
  return t;
};

/** A decision for the owner: the live menu has no sections. Portuguese label, the visitor's language below. */
export const GROUPS: { id: GroupId; pt: string; local: L }[] = [
  { id: "grelhados", pt: "Grelhados", local: l("Grillades", "Grills", "Grelhados", "Grigliate", "Grilladen") },
  { id: "bacalhau", pt: "Bacalhau", local: l("Morue", "Salt cod", "Bacalhau", "Baccalà", "Stockfisch") },
  { id: "pratos", pt: "Pratos", local: l("Plats", "Dishes", "Pratos", "Piatti", "Gerichte") },
  { id: "marisco", pt: "Marisco", local: l("Fruits de mer", "Seafood", "Marisco", "Frutti di mare", "Meeresfrüchte") },
  { id: "petiscos", pt: "Petiscos", local: l("Petites assiettes", "Small plates", "Petiscos", "Stuzzichini", "Kleine Teller") },
  { id: "especialidades", pt: "Especialidades", local: l("Spécialités · sur demande 48 h", "Specialities · on request 48 h", "Especialidades · por encomenda 48 h", "Specialità · su richiesta 48 h", "Spezialitäten · auf Bestellung 48 h") },
];
export const tilesOf = (g: GroupId) => TILES.filter((t) => t.group === g);
/** The five groups with pills on the home page (Especialidades opens the 48-hour section instead). */
export const MAIN_GROUPS = GROUPS.filter((g) => g.id !== "especialidades");

/** One listing per name for search and the planner: the two "Costoletas" tiles share one entry. */
export const DISHES = TILES.filter((t, i) => TILES.findIndex((x) => x.name === t.name) === i);

// ------------------------------------------------------------------ the three reviews (content/reviews.json)
export type Review = { stars: number; quote: string; name: string; translation: Record<"en" | "pt" | "it" | "de", string> };
export const REVIEWS = reviews.reviews as Review[];
