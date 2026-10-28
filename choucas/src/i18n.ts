// Languages, routes and the interface strings. German (Swiss spelling, "ss", never "ß") is the source.
// Every French, Italian and English text here is new and needs a native-speaker check.
export type Lang = "de" | "fr" | "it" | "en";
export type PageKey = "home" | "pizzeria" | "steakhouse" | "choucalino" | "menu" | "anreise" | "impressum";
export type Localized = Record<Lang, string>;

export const LANGS: Lang[] = ["de", "fr", "it", "en"];
export const NATIVE: Record<Lang, string> = { de: "Deutsch", fr: "Français", it: "Italiano", en: "English" };
export const HTML_LANG: Record<Lang, string> = { de: "de-CH", fr: "fr-CH", it: "it-CH", en: "en" };
export const PAGES: PageKey[] = ["home", "pizzeria", "steakhouse", "choucalino", "menu", "anreise", "impressum"];
export const SLUGS: Record<Lang, Record<PageKey, string>> = {
  de: { home: "", pizzeria: "pizzeria", steakhouse: "steakhouse", choucalino: "choucalino", menu: "speisekarte", anreise: "anreise", impressum: "impressum" },
  fr: { home: "", pizzeria: "pizzeria", steakhouse: "steakhouse", choucalino: "choucalino", menu: "carte", anreise: "acces", impressum: "mentions-legales" },
  it: { home: "", pizzeria: "pizzeria", steakhouse: "steakhouse", choucalino: "choucalino", menu: "menu", anreise: "come-arrivare", impressum: "note-legali" },
  en: { home: "", pizzeria: "pizzeria", steakhouse: "steakhouse", choucalino: "choucalino", menu: "menu", anreise: "getting-here", impressum: "imprint" },
};

export const isLang = (v: unknown): v is Lang => LANGS.includes(v as Lang);
export function pageFromSlug(lang: Lang, slug = ""): PageKey | null {
  const hit = PAGES.find((k) => SLUGS[lang][k] === slug.replace(/\/$/, ""));
  return hit ?? null;
}
export const pathFor = (lang: Lang, page: PageKey) => `/${lang}/${SLUGS[lang][page]}`;
export const fill = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));

/** One string per language, in the order of the language menu: de, fr, it, en. */
export const L = (de: string, fr: string, it: string, en: string): Localized => ({ de, fr, it, en });
/** The same text in every language (names, prices, addresses). */
export const same = (s: string): Localized => L(s, s, s, s);

export const WELCOME: Record<Lang, { word: string; line: string }> = {
  de: { word: "Willkommen", line: "in der Choucas Connection" },
  fr: { word: "Bienvenue", line: "à la Choucas Connection" },
  it: { word: "Benvenuti", line: "alla Choucas Connection" },
  en: { word: "Welcome", line: "to the Choucas Connection" },
};

export const UI = {
  proposal: "Proposta de design · não é o site oficial",
  skip: L("Zum Inhalt", "Aller au contenu", "Vai al contenuto", "Skip to content"),
  home: L("Startseite", "Accueil", "Home", "Home"),
  mainNav: L("Hauptnavigation", "Navigation principale", "Navigazione principale", "Main navigation"),
  menuButton: L("Menü", "Menu", "Menu", "Menu"),
  closeMenu: L("Menü schliessen", "Fermer le menu", "Chiudi il menu", "Close the menu"),
  languagePill: "Sprache · Langue · Lingua · Language",
  language: L("Sprache", "Langue", "Lingua", "Language"),
  newTab: L("öffnet in neuem Tab", "s’ouvre dans un nouvel onglet", "si apre in una nuova scheda", "opens in a new tab"),
  welcomeSkip: L("Klicken oder Esc drücken zum Überspringen", "Cliquez ou appuyez sur Échap pour passer", "Clicca o premi Esc per saltare", "Click or press Esc to skip"),
  close: L("Schliessen", "Fermer", "Chiudi", "Close"),
  more: L("Mehr erfahren", "En savoir plus", "Scopri di più", "Find out more"),

  // pages and actions
  nav: {
    pizzeria: same("Pizzeria Choucas"),
    steakhouse: same("Oasis Steakhouse"),
    choucalino: same("Choucalino®"),
    menu: L("Speisekarte", "Carte", "Menu", "Menu"),
    anreise: L("Anreise", "Accès", "Come arrivare", "Getting here"),
    bilder: L("Bilder", "Photos", "Foto", "Photos"),
    impressum: L("Impressum", "Mentions légales", "Note legali", "Imprint"),
  },
  book: L("Reservieren", "Réserver", "Prenota", "Book a table"),
  bookTable: L("Tisch reservieren", "Réserver une table", "Prenota un tavolo", "Book a table"),
  explore: L("Restaurants entdecken", "Découvrir les restaurants", "Scoprite i ristoranti", "Explore the restaurants"),
  location: L("Leukerbad · Wallis · Schweiz", "Loèche-les-Bains · Valais · Suisse", "Leukerbad · Vallese · Svizzera", "Leukerbad · Valais · Switzerland"),
  navShort: {
    pizzeria: L("Pizzeria", "Pizzeria", "Pizzeria", "Pizzeria"),
    steakhouse: same("Steakhouse"),
    choucalino: same("Choucalino®"),
  },
  toVenue: {
    pizzeria: L("Zur Pizzeria", "Découvrir la pizzeria", "Scoprite la pizzeria", "Visit the pizzeria"),
    steakhouse: L("Zum Steakhouse", "Découvrir le steakhouse", "Scoprite lo steakhouse", "Visit the steakhouse"),
    choucalino: L("Zum Kid’s Club", "Découvrir le Kid’s Club", "Scoprite il Kid’s Club", "Visit the Kid’s Club"),
  },
  venueMenu: L("Speisekarte", "La carte", "Il menu", "The menu"),
  venuesEyebrow: L("Drei Orte, ein Haus", "Trois lieux, une maison", "Tre locali, una casa", "Three places, one house"),
  call: L("Anrufen", "Appeler", "Chiama", "Call"),
  takeaway: same("Take-Away"),
  writeUs: L("E-Mail schreiben", "Écrire un e-mail", "Scrivere un’e-mail", "Send an email"),

  // hero
  heroEyebrow: L("Leukerbad · Wallis", "Loèche-les-Bains · Valais", "Leukerbad · Vallese", "Leukerbad · Valais"),
  heroLead: L(
    "Pizzeria Choucas, Oasis Steakhouse und Choucalino® Kid’s Club: drei Orte unter einem Dach.",
    "Pizzeria Choucas, Oasis Steakhouse et Choucalino® Kid’s Club : trois lieux sous un même toit.",
    "Pizzeria Choucas, Oasis Steakhouse e Choucalino® Kid’s Club: tre locali sotto lo stesso tetto.",
    "Pizzeria Choucas, Oasis Steakhouse and Choucalino® Kid’s Club: three places under one roof.",
  ),
  pizzaSide: L("Pizza aus dem Ofen", "Pizza du four", "Pizza dal forno", "Pizza from the oven"),
  grillSide: L("Argentinischer Grill", "Grill argentin", "Griglia argentina", "Argentine grill"),
  dividerLabel: L("Aufteilung zwischen Pizzeria und Steakhouse", "Partage entre la pizzeria et le steakhouse", "Divisione tra pizzeria e steakhouse", "Split between the pizzeria and the steakhouse"),
  dividerValue: L("{a} % Pizzeria, {b} % Steakhouse", "{a} % pizzeria, {b} % steakhouse", "{a}% pizzeria, {b}% steakhouse", "{a}% pizzeria, {b}% steakhouse"),
  dragHint: L("Logo ziehen", "Glissez le logo", "Trascina il logo", "Drag the logo"),
  pause: L("Pausieren", "Mettre en pause", "Metti in pausa", "Pause"),
  play: L("Fortsetzen", "Reprendre", "Riprendi", "Play"),

  // strip
  marquee: L("Laufband", "Bandeau défilant", "Striscia scorrevole", "Scrolling strip"),
  stripLeukerbad: L("Leukerbad", "Loèche-les-Bains", "Leukerbad", "Leukerbad"),

  // places and hours
  placesTitle: L("Drei Orte unter einem Dach", "Trois lieux sous un même toit", "Tre locali sotto lo stesso tetto", "Three places under one roof"),
  placesEyebrow: same("The Choucas Connection"),
  kitchenUntil: L("warme Küche bis {t}", "cuisine chaude jusqu’à {t}", "cucina calda fino alle {t}", "hot food until {t}"),
  openUntil: L("offen bis {t}", "ouvert jusqu’à {t}", "aperto fino alle {t}", "open until {t}"),
  opensAt: L("öffnet um {t}", "ouvre à {t}", "apre alle {t}", "opens at {t}"),
  openNow: L("Offen", "Ouvert", "Aperto", "Open"),
  closedNow: L("Geschlossen", "Fermé", "Chiuso", "Closed"),
  zurichTime: L("Schweizer Zeit", "heure suisse", "ora svizzera", "Swiss time"),
  hours: L("Öffnungszeiten", "Horaires", "Orari", "Opening hours"),

  // menu
  filterLabel: L("Speisekarte filtern", "Filtrer la carte", "Filtra il menu", "Filter the menu"),
  all: L("Alle", "Tout", "Tutto", "All"),
  pizzaFilter: same("Pizza"),
  grillFilter: same("Grill"),
  sections: L("Rubriken", "Rubriques", "Sezioni", "Sections"),
  search: L("Gericht suchen", "Rechercher un plat", "Cerca un piatto", "Search the menu"),
  searchPlaceholder: L("Suchen, z. B. Risotto", "Rechercher, p. ex. risotto", "Cerca, per es. risotto", "Search, e.g. risotto"),
  results: L("{n} Gerichte", "{n} plats", "{n} piatti", "{n} dishes"),
  resultsOne: L("{n} Gericht", "{n} plat", "{n} piatto", "{n} dish"),
  noResults: L("Keine Gerichte für «{q}».", "Aucun plat pour « {q} ».", "Nessun piatto per «{q}».", "No dishes for “{q}”."),
  clear: L("Löschen", "Effacer", "Cancella", "Clear"),
  fullMenuPdf: L("Ganze Speisekarte (PDF)", "Carte complète (PDF)", "Menu completo (PDF)", "Full menu (PDF)"),
  yoordi: L("Digitale Speisekarte (Yoordi)", "Carte numérique (Yoordi)", "Menu digitale (Yoordi)", "Digital menu (Yoordi)"),
  newBadge: L("neu", "nouveau", "novità", "new"),
  tipBadge: L("Tipp", "Conseil", "Consiglio", "Tip"),
  hot: L("scharf", "épicé", "piccante", "spicy"),
  venuePizzeria: same("Pizzeria"),
  venueOasis: same("Oasis"),
  venueBoth: L("Pizzeria & Oasis", "Pizzeria & Oasis", "Pizzeria & Oasis", "Pizzeria & Oasis"),
  pricesChf: L("Preise in Schweizer Franken", "Prix en francs suisses", "Prezzi in franchi svizzeri", "Prices in Swiss francs"),
  translatedNote: L(
    "",
    "Les descriptions en français sont celles de la carte imprimée.",
    "Descrizioni tradotte dalla carta in tedesco e francese.",
    "Descriptions translated from the German and French menu.",
  ),
  pizzeriaPart: L("Aus der Pizzeria", "De la pizzeria", "Dalla pizzeria", "From the pizzeria"),
  grillPart: L("Vom Grill", "Du grill", "Dalla griglia", "From the grill"),
  wholeMenu: L("Zur ganzen Speisekarte", "Voir toute la carte", "Tutto il menu", "See the whole menu"),

  // reviews
  reviewsEyebrow: L("Google-Bewertungen", "Avis Google", "Recensioni Google", "Google reviews"),
  reviewsTitle: L("Was Gäste sagen", "Ce que disent nos hôtes", "Cosa dicono gli ospiti", "What guests say"),
  reviewsCount: L("{n} Bewertungen der Pizzeria Choucas auf Google", "{n} avis sur la Pizzeria Choucas sur Google", "{n} recensioni della Pizzeria Choucas su Google", "{n} reviews of Pizzeria Choucas on Google"),
  reviewsAsOf: L("Stand {d}", "Au {d}", "Aggiornato a {d}", "As of {d}"),
  stars: L("{n} von 5 Sternen", "{n} étoiles sur 5", "{n} stelle su 5", "{n} out of 5 stars"),
  originalIn: L("Originaltext auf {l}", "Texte original en {l}", "Testo originale in {l}", "Original text in {l}"),
  readMore: L("Weiterlesen", "Lire la suite", "Continua a leggere", "Read more"),
  readLess: L("Weniger", "Réduire", "Riduci", "Show less"),
  onGoogle: L("Alle Bewertungen auf Google", "Tous les avis sur Google", "Tutte le recensioni su Google", "All reviews on Google"),
  prevReview: L("Vorherige Bewertung", "Avis précédent", "Recensione precedente", "Previous review"),
  nextReview: L("Nächste Bewertung", "Avis suivant", "Recensione successiva", "Next review"),

  // gallery
  galleryTitle: L("Bilder", "Photos", "Foto", "Photos"),
  galleryLead: L(
    "Neun Galerien aus der Choucas Connection. Wischen, ziehen oder mit den Pfeiltasten blättern; Enter öffnet ein Bild.",
    "Neuf galeries de la Choucas Connection. Balayez, glissez ou utilisez les flèches ; Entrée ouvre une photo.",
    "Nove gallerie della Choucas Connection. Scorri, trascina o usa le frecce; Invio apre una foto.",
    "Nine galleries from the Choucas Connection. Swipe, drag or use the arrow keys; Enter opens a photo.",
  ),
  photoOf: L("Foto {n} von {total}", "Photo {n} sur {total}", "Foto {n} di {total}", "Photo {n} of {total}"),
  prevPhoto: L("Vorheriges Foto", "Photo précédente", "Foto precedente", "Previous photo"),
  nextPhoto: L("Nächstes Foto", "Photo suivante", "Foto successiva", "Next photo"),
  photos: L("{n} Fotos", "{n} photos", "{n} foto", "{n} photos"),
  galleryCategories: L("Galerien", "Galeries", "Gallerie", "Galleries"),
  showGrid: L("Als Raster zeigen", "Afficher en grille", "Mostra a griglia", "Show as grid"),
  showCarousel: L("Als Karussell zeigen", "Afficher en carrousel", "Mostra a carosello", "Show as carousel"),

  // booking
  drawerTitle: L("Online Reservation", "Réservation en ligne", "Prenotazione online", "Online reservation"),
  drawerNote: L(
    "Das Reservationssystem (resmio) lädt erst, wenn dieses Feld geöffnet wird.",
    "Le système de réservation (resmio) se charge seulement à l’ouverture de ce panneau.",
    "Il sistema di prenotazione (resmio) si carica solo all’apertura di questo pannello.",
    "The booking system (resmio) loads only when this panel opens.",
  ),
  drawerFallback: L("Reservation in neuem Tab öffnen", "Ouvrir la réservation dans un nouvel onglet", "Apri la prenotazione in una nuova scheda", "Open the booking page in a new tab"),
  previewNoEmbed: L(
    "In dieser Vorschau öffnet sich das Reservationssystem in einem neuen Tab; auf der Website erscheint es hier.",
    "Dans cet aperçu, le système de réservation s’ouvre dans un nouvel onglet ; sur le site, il s’affiche ici.",
    "In questa anteprima il sistema di prenotazione si apre in una nuova scheda; sul sito compare qui.",
    "In this preview the booking system opens in a new tab; on the website it shows here.",
  ),
  bookTitle: L("Reservieren und bestellen", "Réserver et commander", "Prenotare e ordinare", "Book and order"),

  // contact
  contactTitle: L("Kontakt und Öffnungszeiten", "Contact et horaires", "Contatti e orari", "Contact and opening hours"),
  address: L("Adresse", "Adresse", "Indirizzo", "Address"),
  phone: L("Telefon", "Téléphone", "Telefono", "Phone"),
  email: L("E-Mail", "E-mail", "E-mail", "Email"),
  reservations: L("Reservationen", "Réservations", "Prenotazioni", "Reservations"),
  showMap: L("Karte anzeigen", "Afficher la carte", "Mostra la mappa", "Show the map"),
  openMaps: L("In Google Maps öffnen", "Ouvrir dans Google Maps", "Apri in Google Maps", "Open in Google Maps"),
  mapPrivacy: L("Die Google-Karte lädt erst nach Ihrem Klick.", "La carte Google se charge seulement après votre clic.", "La mappa Google si carica solo dopo il vostro clic.", "The Google map loads only after you click."),
  mapTitle: L("Karte: The Choucas Connection, Dorfstrasse 9, Leukerbad", "Carte : The Choucas Connection, Dorfstrasse 9, Loèche-les-Bains", "Mappa: The Choucas Connection, Dorfstrasse 9, Leukerbad", "Map: The Choucas Connection, Dorfstrasse 9, Leukerbad"),
  mapPreviewNote: L(
    "In dieser Vorschau öffnet sich die Karte in einem neuen Tab.",
    "Dans cet aperçu, la carte s’ouvre dans un nouvel onglet.",
    "In questa anteprima la mappa si apre in una nuova scheda.",
    "In this preview the map opens in a new tab.",
  ),
  country: L("Schweiz", "Suisse", "Svizzera", "Switzerland"),
  formTitle: L("Schreiben Sie uns", "Écrivez-nous", "Scriveteci", "Write to us"),
  formName: L("Name", "Nom", "Nome", "Name"),
  formEmail: L("E-Mail", "E-mail", "E-mail", "Email"),
  formPhone: L("Telefon", "Téléphone", "Telefono", "Phone"),
  formMessage: L("Ihre Nachricht", "Votre message", "Il vostro messaggio", "Your message"),
  optional: L("freiwillig", "facultatif", "facoltativo", "optional"),
  send: L("Senden", "Envoyer", "Invia", "Send"),
  nameError: L("Geben Sie Ihren Namen ein.", "Indiquez votre nom.", "Inserite il vostro nome.", "Enter your name."),
  emailError: L("Geben Sie eine gültige E-Mail-Adresse ein, zum Beispiel name@beispiel.ch.", "Indiquez une adresse e-mail valide, par exemple nom@exemple.ch.", "Inserite un indirizzo e-mail valido, per esempio nome@esempio.ch.", "Enter a valid email address, for example name@example.ch."),
  messageError: L("Schreiben Sie Ihre Nachricht.", "Écrivez votre message.", "Scrivete il vostro messaggio.", "Write your message."),
  testMode: L(
    "Vorschau: Das Formular ist im Testmodus und sendet nichts, bis das Restaurant seine Empfangsadresse angibt.",
    "Aperçu : le formulaire est en mode test et n’envoie rien tant que le restaurant n’a pas donné son adresse de réception.",
    "Anteprima: il modulo è in modalità di prova e non invia nulla finché il ristorante non indica l’indirizzo di ricezione.",
    "Preview: the form is in test mode and sends nothing until the restaurant gives its receiving address.",
  ),
  testSent: L(
    "Nachricht geprüft, aber nicht gesendet: Das Formular ist noch im Testmodus. Rufen Sie uns an: +41 27 470 24 13.",
    "Message vérifié, mais pas envoyé : le formulaire est encore en mode test. Appelez-nous au +41 27 470 24 13.",
    "Messaggio verificato ma non inviato: il modulo è ancora in modalità di prova. Chiamateci al +41 27 470 24 13.",
    "Message checked but not sent: the form is still in test mode. Call us on +41 27 470 24 13.",
  ),
  sent: L("Danke, Ihre Nachricht wurde gesendet.", "Merci, votre message est envoyé.", "Grazie, il vostro messaggio è stato inviato.", "Thank you, your message has been sent."),
  sendError: L(
    "Das Senden ist fehlgeschlagen. Versuchen Sie es erneut oder rufen Sie +41 27 470 24 13 an.",
    "L’envoi n’a pas abouti. Réessayez ou appelez le +41 27 470 24 13.",
    "L’invio non è riuscito. Riprovate o chiamate il +41 27 470 24 13.",
    "Sending failed. Try again or call +41 27 470 24 13.",
  ),
  hoursConflict: L(
    "Die Öffnungszeiten folgen der Startseite der heutigen Website und werden noch mit dem Restaurant bestätigt.",
    "Les horaires suivent la page d’accueil du site actuel et doivent encore être confirmés par le restaurant.",
    "Gli orari seguono la home page del sito attuale e devono ancora essere confermati dal ristorante.",
    "The opening hours follow the home page of the current website and are still to be confirmed by the restaurant.",
  ),

  // footer
  follow: L("Folgen Sie uns", "Suivez-nous", "Seguiteci", "Follow us"),
  morePages: L("Mehr auf choucas.ch", "Plus sur choucas.ch", "Altro su choucas.ch", "More on choucas.ch"),
  livePageNote: L("Seiten der heutigen Website, auf Deutsch", "Pages du site actuel, en allemand", "Pagine del sito attuale, in tedesco", "Pages of the current website, in German"),
  jobs: same("Jobbörse"),
  recipe: same("Rezept des Monats"),
  colouring: same("Choucalino® Online-Malbuch"),
  press: same("Presse-Berichte"),
  friends: same("Freunde von Choucalino®"),
  familyService: same("Unser Service für Familien"),
  playground: same("Der geniale Indoor-Spielplatz"),
  copyright: "Copyright ©2010 Pizzeria Choucas & Steakhouse Oasis",
};

type Seo = { title: Localized; description: Localized };
export const SEO: Record<PageKey, Seo> = {
  home: {
    title: L(
      "The Choucas Connection · Pizzeria, Steakhouse und Kid’s Club in Leukerbad",
      "The Choucas Connection · Pizzeria, steakhouse et Kid’s Club à Loèche-les-Bains",
      "The Choucas Connection · Pizzeria, steakhouse e Kid’s Club a Leukerbad",
      "The Choucas Connection · Pizzeria, steakhouse and kids’ club in Leukerbad",
    ),
    description: L(
      "Pizzeria Choucas, Oasis Steakhouse mit argentinischem Grill und der Choucalino® Kid’s Club mit dem grössten Indoor-Spielplatz der Region, an der Dorfstrasse 9 in Leukerbad.",
      "La Pizzeria Choucas, l’Oasis Steakhouse et son grill argentin, et le Choucalino® Kid’s Club avec la plus grande aire de jeux couverte de la région, Dorfstrasse 9 à Loèche-les-Bains.",
      "La Pizzeria Choucas, l’Oasis Steakhouse con la griglia argentina e il Choucalino® Kid’s Club con il più grande parco giochi coperto della regione, in Dorfstrasse 9 a Leukerbad.",
      "Pizzeria Choucas, the Oasis Steakhouse with its Argentine grill and the Choucalino® Kid’s Club with the region’s biggest indoor playground, at Dorfstrasse 9 in Leukerbad.",
    ),
  },
  pizzeria: {
    title: L("Pizzeria Choucas · Leukerbad", "Pizzeria Choucas · Loèche-les-Bains", "Pizzeria Choucas · Leukerbad", "Pizzeria Choucas · Leukerbad"),
    description: L(
      "Die familienfreundliche Pizzeria mit dem Vogel: Pizza- und Pastakreationen im mediterranen Ambiente, die neue Pizza Geissupür und «Kinder backen Pizza».",
      "La pizzeria familiale à l’oiseau : pizzas et pâtes dans une ambiance méditerranéenne, la nouvelle Pizza Geissupür et « Les enfants font la pizza ».",
      "La pizzeria per famiglie con l’uccello: pizze e paste in un ambiente mediterraneo, la nuova Pizza Geissupür e «I bambini fanno la pizza».",
      "The family-friendly pizzeria with the bird: pizza and pasta in a Mediterranean setting, the new Pizza Geissupür and “Kids bake pizza”.",
    ),
  },
  steakhouse: {
    title: L("Oasis Steakhouse · Argentinischer Grill in Leukerbad", "Oasis Steakhouse · Grill argentin à Loèche-les-Bains", "Oasis Steakhouse · Griglia argentina a Leukerbad", "Oasis Steakhouse · Argentine grill in Leukerbad"),
    description: L(
      "Argentinische Grill-Spezialitäten im 2007 umgebauten Kino Rex: das Original Gaucho Steak, Chef Parillada Argentina und Mexican BBQ Ribs.",
      "Spécialités du grill argentin dans l’ancien Kino Rex transformé en 2007 : l’original Gaucho Steak, la Chef Parillada Argentina et les Mexican BBQ Ribs.",
      "Specialità della griglia argentina nell’ex Kino Rex ristrutturato nel 2007: l’originale Gaucho Steak, la Chef Parillada Argentina e le Mexican BBQ Ribs.",
      "Argentine grill specialities in the former Kino Rex, rebuilt in 2007: the original Gaucho Steak, Chef Parillada Argentina and Mexican BBQ Ribs.",
    ),
  },
  choucalino: {
    title: L("Choucalino® Kid’s Club · Indoor-Spielplatz in Leukerbad", "Choucalino® Kid’s Club · Aire de jeux couverte à Loèche-les-Bains", "Choucalino® Kid’s Club · Parco giochi coperto a Leukerbad", "Choucalino® Kid’s Club · Indoor playground in Leukerbad"),
    description: L(
      "Der Choucalino® Kid’s Club seit 2007: Indoor-Spielplatz, Kinder-Grill zum «Cervelat grillieru» und Gütesiegel «Familien Willkommen».",
      "Le Choucalino® Kid’s Club depuis 2007 : aire de jeux couverte, grill pour enfants (« Cervelat grillieru ») et label « Familien Willkommen ».",
      "Il Choucalino® Kid’s Club dal 2007: parco giochi coperto, griglia per bambini («Cervelat grillieru») e marchio «Familien Willkommen».",
      "The Choucalino® Kid’s Club since 2007: an indoor playground, a kids’ grill for “Cervelat grillieru” and the “Familien Willkommen” seal.",
    ),
  },
  menu: {
    title: L("Speisekarte · Pizzeria Choucas und Oasis Steakhouse", "Carte · Pizzeria Choucas et Oasis Steakhouse", "Menu · Pizzeria Choucas e Oasis Steakhouse", "Menu · Pizzeria Choucas and Oasis Steakhouse"),
    description: L(
      "Starters, Pizze classiche, Pasta, Risotto, Chef Parillada Argentina und Oasis Signature, mit allen Preisen in CHF.",
      "Starters, pizze classiche, pâtes, risotto, Chef Parillada Argentina et Oasis Signature, avec tous les prix en CHF.",
      "Starters, pizze classiche, pasta, risotto, Chef Parillada Argentina e Oasis Signature, con tutti i prezzi in CHF.",
      "Starters, classic pizzas, pasta, risotto, Chef Parillada Argentina and Oasis signature dishes, with every price in CHF.",
    ),
  },
  anreise: {
    title: L("Anreise und Kontakt · The Choucas Connection", "Accès et contact · The Choucas Connection", "Come arrivare e contatti · The Choucas Connection", "Getting here and contact · The Choucas Connection"),
    description: L(
      "Dorfstrasse 9, 3954 Leukerbad · Telefon +41 27 470 24 13 · info@choucas.ch · Online-Reservation und Öffnungszeiten.",
      "Dorfstrasse 9, 3954 Loèche-les-Bains · Téléphone +41 27 470 24 13 · info@choucas.ch · Réservation en ligne et horaires.",
      "Dorfstrasse 9, 3954 Leukerbad · Telefono +41 27 470 24 13 · info@choucas.ch · Prenotazione online e orari.",
      "Dorfstrasse 9, 3954 Leukerbad · Phone +41 27 470 24 13 · info@choucas.ch · Online booking and opening hours.",
    ),
  },
  impressum: {
    title: L("Impressum · The Choucas Connection", "Mentions légales · The Choucas Connection", "Note legali · The Choucas Connection", "Imprint · The Choucas Connection"),
    description: L(
      "Verantwortlich für Inhalt, Konzeption und Realisierung: The Choucas Connection, Dorfstrasse 9, 3954 Leukerbad.",
      "Responsable du contenu, de la conception et de la réalisation : The Choucas Connection, Dorfstrasse 9, 3954 Loèche-les-Bains.",
      "Responsabile di contenuti, ideazione e realizzazione: The Choucas Connection, Dorfstrasse 9, 3954 Leukerbad.",
      "Responsible for content, concept and production: The Choucas Connection, Dorfstrasse 9, 3954 Leukerbad.",
    ),
  },
};
