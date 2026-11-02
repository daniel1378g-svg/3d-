// Languages, localized addresses and the interface words. Facts (names, phones, addresses, times) live in
// src/content and stay identical in every language. Swiss conventions: «» quotes in DE/FR/IT, "ss" for ß in German.
export const LANGS = ["de", "fr", "en", "it"] as const;
export type Lang = (typeof LANGS)[number];
export type L = Record<Lang, string>;
export const isLang = (v: unknown): v is Lang => typeof v === "string" && (LANGS as readonly string[]).includes(v);
export const l = (de: string, fr: string, en: string, it: string): L => ({ de, fr, en, it });

export const HTML_LANG: Record<Lang, string> = { de: "de-CH", fr: "fr-CH", en: "en", it: "it-CH" };
export const LOCALE: Record<Lang, string> = { de: "de-CH", fr: "fr-CH", en: "en-GB", it: "it-CH" };
export const NATIVE: Record<Lang, string> = { de: "Deutsch", fr: "Français", en: "English", it: "Italiano" };
export const OG_LOCALE: Record<Lang, string> = { de: "de_CH", fr: "fr_CH", en: "en_GB", it: "it_CH" };

export type PageKey = "home" | "menu" | "families" | "story" | "visit" | "gallery" | "hotels" | "jobs" | "press" | "imprint" | "privacy";
export const PAGES: PageKey[] = ["home", "menu", "families", "story", "visit", "gallery", "hotels", "jobs", "press", "imprint", "privacy"];
export const SLUGS: Record<Lang, Record<PageKey, string>> = {
  de: { home: "", menu: "speisekarte", families: "familien", story: "geschichte", visit: "besuch", gallery: "galerie", hotels: "partnerhotels", jobs: "jobs", press: "presse", imprint: "impressum", privacy: "datenschutz" },
  fr: { home: "", menu: "carte", families: "familles", story: "notre-histoire", visit: "visite", gallery: "galerie", hotels: "hotels-partenaires", jobs: "emplois", press: "presse", imprint: "mentions-legales", privacy: "confidentialite" },
  en: { home: "", menu: "menu", families: "families", story: "our-story", visit: "visit-us", gallery: "gallery", hotels: "partner-hotels", jobs: "jobs", press: "press", imprint: "imprint", privacy: "privacy" },
  it: { home: "", menu: "menu", families: "famiglie", story: "la-nostra-storia", visit: "visitarci", gallery: "galleria", hotels: "hotel-partner", jobs: "lavoro", press: "stampa", imprint: "note-legali", privacy: "privacy" },
};
export const pathFor = (lang: Lang, page: PageKey) => `/${lang}/${SLUGS[lang][page]}`;
export function pageFromSlug(lang: Lang, slug: string): PageKey | null {
  const s = slug.replace(/\/$/, "");
  return PAGES.find((p) => SLUGS[lang][p] === s) ?? null;
}

/** The language-switch welcome: the big word, then the smaller line under it. */
export const WELCOME: Record<Lang, { word: string; line: string }> = {
  de: { word: "Willkommen", line: "in der Pizzeria Giardino" },
  fr: { word: "Bienvenue", line: "à la Pizzeria Giardino" },
  en: { word: "Welcome", line: "to Pizzeria Giardino" },
  it: { word: "Benvenuti", line: "alla Pizzeria Giardino" },
};

export const UI = {
  proposal: "Proposta de design · não é o site oficial",
  proposalLocal: l("Designvorschlag · nicht die offizielle Website", "Proposition de design · pas le site officiel", "Design proposal · not the official website", "Proposta di design · non è il sito ufficiale"),
  skip: l("Zum Inhalt springen", "Aller au contenu", "Skip to content", "Vai al contenuto"),
  skipIntro: l("Intro überspringen", "Passer l’intro", "Skip intro", "Salta l’intro"),
  // navigation
  home: l("Start", "Accueil", "Home", "Home"),
  menu: l("Speisekarte", "La carte", "Menu", "Il menù"),
  families: l("Familien", "Familles", "Families", "Famiglie"),
  story: l("Geschichte", "Notre histoire", "Our Story", "La storia"),
  visit: l("Ihr Besuch", "Votre visite", "Visit Us", "Visitarci"),
  gallery: l("Galerie", "Galerie", "Gallery", "Galleria"),
  vouchers: l("Gutscheine", "Bons cadeaux", "Vouchers", "Buoni regalo"),
  hotels: l("Partnerhotels", "Hôtels partenaires", "Partner Hotels", "Hotel partner"),
  tour: l("Virtueller Rundgang", "Visite virtuelle", "Virtual Tour", "Tour virtuale"),
  contact: l("Kontakt", "Contact", "Contact", "Contatti"),
  jobs: l("Jobs", "Emplois", "Jobs", "Lavora con noi"),
  press: l("Presse", "Presse", "Press", "Stampa"),
  arrival: l("Anreise", "Accès", "Arrival", "Come arrivare"),
  imprint: l("Impressum", "Mentions légales", "Imprint", "Note legali"),
  privacy: l("Datenschutz", "Protection des données", "Privacy", "Privacy"),
  more: l("Mehr", "Plus", "More", "Altro"),
  mainNav: l("Hauptnavigation", "Navigation principale", "Main navigation", "Navigazione principale"),
  moreNav: l("Weitere Seiten", "Autres pages", "More pages", "Altre pagine"),
  footerNav: l("Fusszeile", "Pied de page", "Footer", "Piè di pagina"),
  homeLink: l("Pizzeria Giardino, Startseite", "Pizzeria Giardino, accueil", "Pizzeria Giardino, home", "Pizzeria Giardino, home"),
  language: l("Sprache", "Langue", "Language", "Lingua"),
  languages: l("Sprachen", "Langues", "Languages", "Lingue"),
  openMenu: l("Menü öffnen", "Ouvrir le menu", "Open menu", "Apri il menu"),
  close: l("Schliessen", "Fermer", "Close", "Chiudi"),
  // actions
  reserve: l("Tisch reservieren", "Réserver une table", "Reserve a Table", "Prenota un tavolo"),
  reserveShort: l("Reservieren", "Réserver", "Reserve", "Prenota"),
  exploreMenu: l("Zur Speisekarte", "Découvrir la carte", "Explore the Menu", "Scopri il menù"),
  call: l("Anrufen", "Appeler", "Call", "Chiama"),
  writeEmail: l("E-Mail schreiben", "Écrire un e-mail", "Send an e-mail", "Scrivi un’e-mail"),
  scroll: l("Scrollen", "Défiler", "Scroll", "Scorri"),
  pause: l("Anhalten", "Pause", "Pause", "Pausa"),
  play: l("Abspielen", "Lecture", "Play", "Riproduci"),
  prev: l("Zurück", "Précédent", "Previous", "Precedente"),
  next: l("Weiter", "Suivant", "Next", "Successivo"),
  newTab: l("öffnet in neuem Tab", "s’ouvre dans un nouvel onglet", "opens in a new tab", "si apre in una nuova scheda"),
  externalSite: l("Externe Website", "Site externe", "External site", "Sito esterno"),
  pdf: l("PDF", "PDF", "PDF", "PDF"),
  pages: l("Seiten", "pages", "pages", "pagine"),
  pdfLang: l("Deutsch / Französisch", "allemand / français", "German / French", "tedesco / francese"),
  illustration: l("Illustration", "Illustration", "Illustration", "Illustrazione"),
  backToTop: l("Nach oben", "Haut de page", "Back to top", "Torna su"),
  learnMore: l("Mehr erfahren", "En savoir plus", "Learn more", "Scopri di più"),
  // hours
  restaurant: l("Restaurant", "Restaurant", "Restaurant", "Ristorante"),
  kitchen: l("Küche", "Cuisine", "Kitchen", "Cucina"),
  both: l("Beide", "Les deux", "Both", "Entrambi"),
  hotMeals: l("Warme Küche", "Cuisine chaude", "Hot meals", "Cucina calda"),
  openNow: l("Jetzt geöffnet", "Ouvert maintenant", "Open now", "Aperto ora"),
  closedNow: l("Jetzt geschlossen", "Fermé maintenant", "Closed now", "Chiuso ora"),
  kitchenOpen: l("Küche offen", "Cuisine ouverte", "Kitchen open", "Cucina aperta"),
  kitchenClosed: l("Küche geschlossen", "Cuisine fermée", "Kitchen closed", "Cucina chiusa"),
  until: l("bis", "jusqu’à", "until", "fino alle"),
  opens: l("Öffnet", "Ouvre", "Opens", "Apre"),
  reopens: l("Wieder geöffnet ab", "Réouverture le", "Reopening on", "Riapertura il"),
  at: l("um", "à", "at", "alle"),
  today: l("Heute", "Aujourd’hui", "Today", "Oggi"),
  tomorrow: l("morgen", "demain", "tomorrow", "domani"),
  closedDay: l("Geschlossen", "Fermé", "Closed", "Chiuso"),
  restDay: l("Ruhetag", "Jour de fermeture", "Rest day", "Giorno di riposo"),
  localTime: l("Ortszeit Leukerbad", "Heure de Leukerbad", "Leukerbad time", "Ora di Leukerbad"),
  days: l("Wochentage", "Jours de la semaine", "Days of the week", "Giorni della settimana"),
  chooseView: l("Anzeige wählen", "Choisir l’affichage", "Choose what to show", "Scegli cosa mostrare"),
  weekHours: l("Öffnungszeiten der Woche", "Horaires de la semaine", "Weekly opening hours", "Orari della settimana"),
  dayCol: l("Tag", "Jour", "Day", "Giorno"),
  // booking drawer
  bookingTitle: l("Tisch reservieren", "Réserver une table", "Reserve a Table", "Prenota un tavolo"),
  bookingLead: l(
    "Reservationen nehmen wir telefonisch entgegen – jeden Tag von 10 bis 23 Uhr.",
    "Nous prenons les réservations par téléphone – tous les jours de 10 h à 23 h.",
    "We take table reservations by telephone – every day from 10:00 to 23:00.",
    "Accettiamo le prenotazioni per telefono – ogni giorno dalle 10 alle 23.",
  ),
  phoneLabel: l("Telefonische Reservation", "Réservations par téléphone", "Telephone bookings", "Prenotazioni telefoniche"),
  phoneHours: l("Telefonische Reservation 10–23 Uhr", "Réservation par téléphone de 10 h à 23 h", "Telephone bookings 10:00–23:00", "Prenotazioni telefoniche 10–23"),
  planTitle: l("Ihr Anruf, vorbereitet", "Préparer votre appel", "Plan your call", "Prepara la telefonata"),
  planNote: l(
    "Nur eine Gedankenstütze: Hier wird nichts gebucht oder gesendet. Ihr Tisch ist reserviert, sobald wir ihn am Telefon bestätigen.",
    "Simple aide-mémoire : rien n’est réservé ni envoyé ici. Votre table est réservée dès que nous la confirmons au téléphone.",
    "A planning aid only: nothing is booked or sent from here. Your table is reserved once we confirm it on the phone.",
    "Solo un promemoria: qui non si prenota e non si invia nulla. Il tavolo è riservato quando lo confermiamo al telefono.",
  ),
  howMany: l("Wie viele Personen?", "Combien de personnes ?", "How many guests?", "Quante persone?"),
  person: l("Person", "personne", "guest", "persona"),
  people: l("Personen", "personnes", "guests", "persone"),
  fewer: l("Eine Person weniger", "Une personne de moins", "One guest fewer", "Una persona in meno"),
  moreGuests: l("Eine Person mehr", "Une personne de plus", "One guest more", "Una persona in più"),
  sayOnPhone: l("Am Telefon zum Beispiel:", "Au téléphone, par exemple :", "On the phone, for example:", "Al telefono, per esempio:"),
  phrase: l(
    "«Guten Tag, ich möchte einen Tisch für {n} reservieren.»",
    "«Bonjour, j’aimerais réserver une table pour {n}.»",
    "“Hello, I’d like to reserve a table for {n}.”",
    "«Buongiorno, vorrei prenotare un tavolo per {n}.»",
  ),
  haveReady: l("Halten Sie bereit: Datum, Uhrzeit, Anzahl Personen – und ob Kinder mitkommen.", "À préparer : date, heure, nombre de personnes – et si des enfants vous accompagnent.", "Have ready: date, time, number of guests – and whether children are coming along.", "Tenete a portata di mano: data, ora, numero di persone – e se ci sono bambini."),
  bookingBand: l("Tisch reservieren", "Réserver", "Book a table", "Prenotare"),
  // gallery and lightbox
  gridView: l("Als Raster", "En grille", "Grid", "Griglia"),
  trackView: l("Als Band", "En bande", "Track", "Nastro"),
  openPhoto: l("Foto vergrössern", "Agrandir la photo", "Enlarge photo", "Ingrandisci la foto"),
  photos: l("Fotos", "photos", "photos", "foto"),
  dragHint: l("Ziehen oder Pfeiltasten", "Glisser ou flèches", "Drag or use the arrow keys", "Trascina o usa le frecce"),
  all: l("Alle", "Toutes", "All", "Tutte"),
  food: l("Küche", "Cuisine", "Food", "Cucina"),
  restaurantTerrace: l("Restaurant & Terrasse", "Restaurant & terrasse", "Restaurant & Terrace", "Ristorante & terrazza"),
  familiesCat: l("Familien", "Familles", "Families", "Famiglie"),
  galleryFilter: l("Fotos filtern", "Filtrer les photos", "Filter photos", "Filtra le foto"),
  photoOf: l("Foto {i} von {n}", "Photo {i} sur {n}", "Photo {i} of {n}", "Foto {i} di {n}"),
  // reviews
  googleReview: l("Google-Bewertung", "Avis Google", "Google review", "Recensione Google"),
  readMoreGoogle: l("Mehr auf Google lesen", "Lire plus sur Google", "Read more on Google", "Leggi di più su Google"),
  showTranslation: l("Übersetzung anzeigen", "Afficher la traduction", "Show translation", "Mostra traduzione"),
  hideTranslation: l("Übersetzung ausblenden", "Masquer la traduction", "Hide translation", "Nascondi traduzione"),
  translationLabel: l("Übersetzung aus dem Englischen · nicht der Originaltext", "Traduit de l’anglais · pas le texte original", "Translation", "Tradotto dall’inglese · non è il testo originale"),
  originalLabel: l("Original (Englisch)", "Original (anglais)", "Original", "Originale (inglese)"),
  stars: l("{n} von 5 Sternen", "{n} étoiles sur 5", "{n} out of 5 stars", "{n} stelle su 5"),
  nameHidden: l("Name nicht lesbar", "Nom illisible", "Name not legible", "Nome non leggibile"),
  reviewOf: l("Bewertung {i} von {n}", "Avis {i} sur {n}", "Review {i} of {n}", "Recensione {i} di {n}"),
  reviewsCarousel: l("Gästestimmen", "Avis de clients", "Guest reviews", "Recensioni degli ospiti"),
  // form
  required: l("Pflichtfeld", "obligatoire", "required", "obbligatorio"),
  optional: l("freiwillig", "facultatif", "optional", "facoltativo"),
  fieldMissing: l("Bitte ausfüllen.", "Veuillez remplir ce champ.", "Please fill this in.", "Compila questo campo."),
  emailInvalid: l("Diese E-Mail-Adresse scheint unvollständig.", "Cette adresse e-mail semble incomplète.", "This e-mail address looks incomplete.", "Questo indirizzo e-mail sembra incompleto."),
  consentMissing: l("Bitte bestätigen Sie die Datenschutzerklärung.", "Veuillez accepter la déclaration de protection des données.", "Please accept the privacy statement.", "Accetta l’informativa sulla privacy."),
  formErrors: l("Bitte prüfen Sie die markierten Felder.", "Veuillez vérifier les champs signalés.", "Please check the highlighted fields.", "Controlla i campi evidenziati."),
  send: l("Nachricht senden", "Envoyer le message", "Send message", "Invia il messaggio"),
  openInMail: l("Im E-Mail-Programm öffnen", "Ouvrir dans la messagerie", "Open in your e-mail app", "Apri nel programma di posta"),
  sending: l("Wird gesendet …", "Envoi …", "Sending…", "Invio…"),
  // pizza and map
  spinPizza: l("Pizza drehen", "Faire tourner la pizza", "Spin the pizza", "Fai girare la pizza"),
  spinHint: l("Ziehen zum Drehen · Pfeiltasten links und rechts", "Glissez pour tourner · flèches gauche et droite", "Drag to turn it · left and right arrow keys", "Trascina per girarla · frecce sinistra e destra"),
  spinLeft: l("Nach links drehen", "Tourner à gauche", "Turn left", "Gira a sinistra"),
  spinRight: l("Nach rechts drehen", "Tourner à droite", "Turn right", "Gira a destra"),
  places: l("Orte im Bild", "Lieux sur la photo", "Places in the photo", "Luoghi nella foto"),
  notFound: l("Diese Seite gibt es nicht.", "Cette page n’existe pas.", "This page doesn’t exist.", "Questa pagina non esiste."),
} satisfies Record<string, L | string>;
