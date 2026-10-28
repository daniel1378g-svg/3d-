// The six Google reviews of Pizzeria Choucas, transcribed from the owner's screenshots in October 2026.
// Each text stays in the reviewer's own language and wording (typos included); only Google's labels and
// option values (meal, noise level, seating…) are translated for the page.
import { L, type Lang, type Localized } from "./i18n";

export type Review = {
  name: string;
  lang: Lang;
  rating: number;
  /** "8 months ago" on Google, as of October 2026 */
  posted: { n: number; unit: "month" | "year" };
  dineIn?: boolean;
  meal?: "dinner" | "lunch";
  price?: string;
  text: string[];
  scores?: { food: number; service: number; atmosphere: number };
  /** Google's extra fields: an option value (translated) or the reviewer's own words (kept as written). */
  extras?: { label: keyof typeof LABELS; value: Localized | { own: string } }[];
};

export const LABELS = {
  food: L("Essen", "Cuisine", "Cibo", "Food"),
  service: L("Service", "Service", "Servizio", "Service"),
  atmosphere: L("Ambiente", "Ambiance", "Atmosfera", "Atmosphere"),
  groupSize: L("Gruppengrösse", "Taille du groupe", "Dimensioni del gruppo", "Group size"),
  kids: L("Kinderfreundlichkeit", "Pour les enfants", "Adatto ai bambini", "Kid-friendliness"),
  noise: L("Lautstärke", "Niveau sonore", "Livello di rumore", "Noise level"),
  wait: L("Wartezeit", "Temps d’attente", "Tempo di attesa", "Wait time"),
  seating: L("Sitzplätze", "Places", "Posti a sedere", "Seating"),
  dineIn: L("Vor Ort", "Sur place", "Al ristorante", "Dine-in"),
  dinner: L("Abendessen", "Dîner", "Cena", "Dinner"),
  lunch: L("Mittagessen", "Déjeuner", "Pranzo", "Lunch"),
};

export const REVIEWS: Review[] = [
  {
    name: "Marc „MS“ Schneider",
    lang: "de",
    rating: 5,
    posted: { n: 8, unit: "month" },
    dineIn: true,
    meal: "dinner",
    price: "40–50 CHF",
    text: [
      "Wir hatten einen rundum gelungenen Abend! Besonders hervorheben möchte ich David, unseren Kellner – er war wirklich top. Sehr freundlich, aufmerksam und absolut zuvorkommend. Man hat sich sofort willkommen und gut betreut gefühlt.",
      "Das Essen war super lecker, vor allem die Pizza – die ist hier einfach immer gut!",
      "Insgesamt ein toller Service und eine sehr angenehme Atmosphäre. Immer wieder gerne wenn wir in Leukerbad sind 😊",
    ],
    scores: { food: 5, service: 5, atmosphere: 5 },
    extras: [
      { label: "groupSize", value: L("5–8 Personen", "5 à 8 personnes", "5–8 persone", "5–8 people") },
      { label: "kids", value: { own: "Kinderspielplatz ist unserer Tochters Favorit" } },
    ],
  },
  {
    name: "Iveta Daníčková",
    lang: "en",
    rating: 5,
    posted: { n: 2, unit: "month" },
    meal: "dinner",
    price: "30–40 CHF",
    text: [
      "If you ever find yourself in Leukerbad, I highly recommend stopping by Pizzeria Choucas. The pizza and drinks are fantastic, and the atmosphere and staff are just lovely. They even gave us great recommendations on what to order and what to see around town. Definitely worth a visit! :) Greetings from Czechia!",
    ],
    scores: { food: 5, service: 5, atmosphere: 5 },
    extras: [
      { label: "noise", value: L("Ruhig, man kann sich gut unterhalten", "Calme, on peut discuter facilement", "Tranquillo, si parla facilmente", "Quiet, easy to talk") },
      { label: "wait", value: L("Bis zu 10 Minuten", "Jusqu’à 10 minutes", "Fino a 10 minuti", "Up to 10 minutes") },
    ],
  },
  {
    name: "Info Com",
    lang: "en",
    rating: 5,
    posted: { n: 2, unit: "month" },
    meal: "dinner",
    text: [
      "An absolutely wonderful experience! The food was delicious and the portions were generous. The meat was excellent, perfectly cooked, and the grilled vegetables served alongside it were simply outstanding fresh, flavorful, and cooked to perfection.",
      "A special mention goes to Kristina and David, who provided truly exceptional service. They were always attentive and available whenever we needed them, yet never intrusive.",
      "A fantastic place where great food is matched by excellent service. I truly hope to come back very soon!",
    ],
  },
  {
    name: "BECHS",
    lang: "it",
    rating: 5,
    posted: { n: 2, unit: "year" },
    dineIn: true,
    meal: "lunch",
    price: "50–60 CHF",
    text: [
      "La nostra fortuna che non c’era tanta gente. Il ristorante era tranquillo.",
      "Cameriere cordiale, molto bravo.",
      "Il cibo buono. Buona preparazione e presentazione.",
      "Penso che ci sia tanta preparazione con prodotti freschi, ma altri ingredienti non erano freschi, questi si sentono. Peccato.",
      "Salse interessanti, abbinamenti buoni.",
      "Tutto ok.",
      "Prezzo leggermente alto.",
    ],
    scores: { food: 4, service: 5, atmosphere: 5 },
  },
  {
    name: "Markéta Pernelle",
    lang: "fr",
    rating: 5,
    posted: { n: 1, unit: "month" },
    dineIn: true,
    meal: "lunch",
    text: [
      "Nous nous sommes sentis très bien dans ce restaurant, le service est exceptionnel et ils ont un choix très varié des spritz. Idéal pour les familles car ils ont un coin enfant.",
    ],
    scores: { food: 5, service: 5, atmosphere: 5 },
  },
  {
    name: "Florian S",
    lang: "de",
    rating: 5,
    posted: { n: 2, unit: "month" },
    dineIn: true,
    meal: "dinner",
    price: "20–30 CHF",
    text: [
      "Sehr leckere Pizzas auch Gluten frei und super aperol spritz und Hugo zu einem sehr fairen Preis. Personal ist freundlich und zuforkommend. Für die Kinder hat es einen Spielecken. Wir sind begeistert und kommen wider wenn wir in Leukerbad sind. Vielen Dank für den Schönen abend.",
    ],
    scores: { food: 4, service: 5, atmosphere: 4 },
    extras: [
      { label: "seating", value: L("Innen, Terrasse", "À l’intérieur, terrasse", "All’interno, terrazza", "Indoor seating, outdoor terrace") },
      { label: "kids", value: { own: "Spielecke für Kinder was das essen deutlich entspannter macht:)" } },
    ],
  },
];

export const REVIEWS_URL = "https://www.google.com/maps/search/?api=1&query=Pizzeria+Choucas+Leukerbad";
