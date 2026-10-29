// Languages, page addresses and the interface words. Facts (dish names, phones, the address, the hours, the
// review quotes) never pass through here; they live in content/ and src/content and stay identical in every
// language. French is the live site's language; the other four are new and need a native-speaker check.
export const LANGS = ["fr", "en", "pt", "it", "de"] as const;
export type Lang = (typeof LANGS)[number];
export type L = Record<Lang, string>;
export const isLang = (v: unknown): v is Lang => typeof v === "string" && (LANGS as readonly string[]).includes(v);

export const HTML_LANG: Record<Lang, string> = { fr: "fr", en: "en", pt: "pt-PT", it: "it", de: "de-CH" };
export const LOCALE: Record<Lang, string> = { fr: "fr-CH", en: "en-GB", pt: "pt-PT", it: "it-CH", de: "de-CH" };
export const NATIVE: Record<Lang, string> = { fr: "Français", en: "English", pt: "Português", it: "Italiano", de: "Deutsch" };

export type PageKey = "home" | "menu" | "services" | "galerie" | "contact" | "privacy";
export const PAGES: PageKey[] = ["home", "menu", "services", "galerie", "contact", "privacy"];
export const SLUGS: Record<Lang, Record<PageKey, string>> = {
  fr: { home: "", menu: "menu", services: "services", galerie: "galerie", contact: "contact", privacy: "protection-des-donnees" },
  en: { home: "", menu: "menu", services: "services", galerie: "gallery", contact: "contact", privacy: "privacy" },
  pt: { home: "", menu: "ementa", services: "servicos", galerie: "galeria", contact: "contacto", privacy: "privacidade" },
  it: { home: "", menu: "menu", services: "servizi", galerie: "galleria", contact: "contatti", privacy: "privacy" },
  de: { home: "", menu: "speisekarte", services: "angebot", galerie: "galerie", contact: "kontakt", privacy: "datenschutz" },
};
export const pathFor = (lang: Lang, page: PageKey) => `/${lang}/${SLUGS[lang][page]}`;
export function pageFromSlug(lang: Lang, slug: string): PageKey | null {
  const s = slug.replace(/\/$/, "");
  return (Object.keys(SLUGS[lang]) as PageKey[]).find((p) => SLUGS[lang][p] === s) ?? null;
}

/** Home anchors, the same in every language. */
export const ANCHORS = ["accueil", "menu", "specialites", "horaires", "reservation", "galerie", "avis", "contact"] as const;

const l = (fr: string, en: string, pt: string, it: string, de: string): L => ({ fr, en, pt, it, de });

export const WELCOME: Record<Lang, { word: string; line: string }> = {
  fr: { word: "Bienvenue", line: "chez Luso Sabores" },
  en: { word: "Welcome", line: "to Luso Sabores" },
  pt: { word: "Bem-vindos", line: "ao Luso Sabores" },
  it: { word: "Benvenuti", line: "da Luso Sabores" },
  de: { word: "Willkommen", line: "bei Luso Sabores" },
};

/** Day initials for the "7/7" build, Monday first, in each language. */
export const DAY_INITIALS: Record<Lang, string[]> = {
  fr: ["L", "M", "M", "J", "V", "S", "D"],
  en: ["M", "T", "W", "T", "F", "S", "S"],
  pt: ["S", "T", "Q", "Q", "S", "S", "D"],
  it: ["L", "M", "M", "G", "V", "S", "D"],
  de: ["M", "D", "M", "D", "F", "S", "S"],
};

export const UI = {
  proposal: "Proposta de design · não é o site oficial",
  proposalFr: "Proposition de design · ce n’est pas le site officiel",
  skip: l("Aller au contenu", "Skip to content", "Saltar para o conteúdo", "Vai al contenuto", "Zum Inhalt springen"),
  skipIntro: l("Passer l’intro", "Skip intro", "Saltar a introdução", "Salta l’intro", "Intro überspringen"),
  home: l("Accueil", "Home", "Início", "Home", "Start"),
  menu: l("Menu", "Menu", "Ementa", "Menu", "Speisekarte"),
  leMenu: l("Le menu", "The menu", "A ementa", "Il menu", "Die Speisekarte"),
  services: l("Services", "Services", "Serviços", "Servizi", "Angebot"),
  galerie: l("Galerie", "Gallery", "Galeria", "Galleria", "Galerie"),
  contact: l("Contact", "Contact", "Contacto", "Contatti", "Kontakt"),
  privacy: l("Protection des données", "Privacy", "Privacidade", "Privacy", "Datenschutz"),
  specialites48: l("Spécialités 48 h", "Specialities 48 h", "Especialidades 48 h", "Specialità 48 h", "Spezialitäten 48 h"),
  ouverts77: l("Ouverts 7/7", "Open 7/7", "Abertos 7/7", "Aperti 7/7", "Offen 7/7"),
  avis: l("Avis", "Reviews", "Opiniões", "Recensioni", "Bewertungen"),
  reserve: l("Réserver", "Book a table", "Reservar", "Prenotare", "Reservieren"),
  burger: l("Menu du site", "Site menu", "Menu do site", "Menu del sito", "Website-Menü"),
  close: l("Fermer", "Close", "Fechar", "Chiudi", "Schliessen"),
  call: l("Appeler", "Call", "Ligar", "Chiama", "Anrufen"),
  copy: l("Copier", "Copy", "Copiar", "Copia", "Kopieren"),
  copied: l("Copié", "Copied", "Copiado", "Copiato", "Kopiert"),
  languages: l("Langues", "Languages", "Idiomas", "Lingue", "Sprachen"),
  mainNav: l("Navigation principale", "Main navigation", "Navegação principal", "Navigazione principale", "Hauptnavigation"),
  homeLink: l("Luso Sabores, accueil", "Luso Sabores, home", "Luso Sabores, início", "Luso Sabores, home", "Luso Sabores, Startseite"),
  scroll: l("Faites défiler", "Scroll", "Deslize", "Scorri", "Scrollen"),
  pause: l("Pause", "Pause", "Pausa", "Pausa", "Pause"),
  play: l("Reprendre", "Play", "Retomar", "Riprendi", "Weiter"),
  prev: l("Précédent", "Previous", "Anterior", "Precedente", "Zurück"),
  next: l("Suivant", "Next", "Seguinte", "Successivo", "Weiter"),
  open77: l("Ouvert 7/7", "Open 7/7", "Aberto 7/7", "Aperto 7/7", "Offen 7/7"),
  specialities: l("Spécialités portugaises", "Portuguese specialities", "Especialidades portuguesas", "Specialità portoghesi", "Portugiesische Spezialitäten"),
  photo: l("Photo", "Photo", "Foto", "Foto", "Foto"),
  photos: l("photos", "photos", "fotografias", "foto", "Fotos"),
  dishes: l("plats", "dishes", "pratos", "piatti", "Gerichte"),
  of: l("sur", "of", "de", "di", "von"),
  externalNew: l("(nouvel onglet)", "(new tab)", "(novo separador)", "(nuova scheda)", "(neuer Tab)"),
  translation: l("Traduction", "Translation", "Tradução", "Traduzione", "Übersetzung"),
  original: l("Original", "Original", "Original", "Originale", "Original"),
  // story
  story: l("Qui sommes-nous ?", "Who we are", "Quem somos", "Chi siamo", "Wer wir sind"),
  // the four from the grill
  grillEyebrow: l("Le menu · Grelhados", "The menu · Grelhados", "A ementa · Grelhados", "Il menu · Grelhados", "Die Speisekarte · Grelhados"),
  fromGrill: l("Les grillades", "From the grill", "Os grelhados", "Le grigliate", "Vom Grill"),
  // plat du jour
  platDuJour: l("Plat du jour", "Dish of the day", "Prato do dia", "Piatto del giorno", "Tagesgericht"),
  plate: l("Assiette du jour", "Plate of the day", "Prato do dia", "Piatto del giorno", "Teller des Tages"),
  dependsDay: l("selon le jour", "depending on the day", "conforme o dia", "secondo il giorno", "je nach Tag"),
  askDish: l("Demandez le plat du jour", "Ask for the dish of the day", "Pergunte pelo prato do dia", "Chiedete il piatto del giorno", "Fragen Sie nach dem Tagesgericht"),
  todayLunchDinner: l("Aujourd’hui : midi et soir", "Today: lunch and dinner", "Hoje: almoço e jantar", "Oggi: pranzo e cena", "Heute: mittags und abends"),
  todayLunch: l("Aujourd’hui : midi", "Today: lunch", "Hoje: almoço", "Oggi: pranzo", "Heute: mittags"),
  // menu
  discoverMenu: l("Découvrir notre menu", "Discover our menu", "Descobrir a nossa ementa", "Scoprite il nostro menu", "Unsere Speisekarte entdecken"),
  search: l("Rechercher un plat", "Search for a dish", "Procurar um prato", "Cerca un piatto", "Gericht suchen"),
  noResult: l("Aucun plat ne correspond.", "No dish matches.", "Nenhum prato corresponde.", "Nessun piatto corrisponde.", "Kein Gericht passt."),
  results: l("résultats", "results", "resultados", "risultati", "Treffer"),
  groups: l("Groupes du menu", "Menu groups", "Grupos da ementa", "Gruppi del menu", "Gruppen der Speisekarte"),
  plan48: l("Planifier (48 h)", "Plan (48 h)", "Planear (48 h)", "Pianifica (48 h)", "Planen (48 h)"),
  photoLink: l("Photo", "Photo", "Foto", "Foto", "Foto"),
  takeawaySticker: l("Sur place ou à l’emporter", "Eat in or take away", "No local ou para levar", "Sul posto o da asporto", "Vor Ort oder zum Mitnehmen"),
  allDishes: l("Tous les plats", "All dishes", "Todos os pratos", "Tutti i piatti", "Alle Gerichte"),
  // specialities and planner
  onRequest48: l("Sur demande · 48 h", "On request · 48 h", "Por encomenda · 48 h", "Su richiesta · 48 h", "Auf Bestellung · 48 h"),
  handNote: l("sur demande 48h à l’avance", "on request, 48 h ahead", "por encomenda, 48 h antes", "su richiesta, 48 h prima", "auf Bestellung, 48 h im Voraus"),
  plannerTitle: l("Planifier une spécialité", "Plan a speciality", "Planear uma especialidade", "Pianificare una specialità", "Eine Spezialität planen"),
  pickDish: l("Quel plat ?", "Which dish?", "Que prato?", "Quale piatto?", "Welches Gericht?"),
  whichDay: l("Quel jour venez-vous ?", "Which day are you coming?", "Que dia vem?", "Che giorno venite?", "An welchem Tag kommen Sie?"),
  whichService: l("Midi ou soir ?", "Lunch or dinner?", "Almoço ou jantar?", "Pranzo o cena?", "Mittag oder Abend?"),
  midi: l("Midi", "Lunch", "Almoço", "Pranzo", "Mittag"),
  soir: l("Soir", "Dinner", "Jantar", "Cena", "Abend"),
  orderBy: l("Commandez au plus tard le", "Order no later than", "Encomende até", "Ordinate entro il", "Bestellen Sie spätestens am"),
  orderHint: l("Deux jours avant votre visite, par téléphone, pendant les heures d’ouverture de ce jour-là :", "Two days before your visit, by phone, during that day’s opening hours:", "Dois dias antes da sua visita, por telefone, durante o horário desse dia:", "Due giorni prima della vostra visita, per telefono, durante l’orario di quel giorno:", "Zwei Tage vor Ihrem Besuch, per Telefon, während der Öffnungszeiten an diesem Tag:"),
  pickADay: l("Choisissez un jour dans le calendrier.", "Pick a day in the calendar.", "Escolha um dia no calendário.", "Scegliete un giorno nel calendario.", "Wählen Sie einen Tag im Kalender."),
  tooSoon: l("moins de 48 h", "under 48 h", "menos de 48 h", "meno di 48 h", "unter 48 h"),
  noDinner: l("pas de service le soir", "no dinner service", "sem jantar", "niente cena", "kein Abendservice"),
  prevMonth: l("Mois précédent", "Previous month", "Mês anterior", "Mese precedente", "Vorheriger Monat"),
  nextMonth: l("Mois suivant", "Next month", "Mês seguinte", "Mese successivo", "Nächster Monat"),
  searchDish: l("Chercher parmi les plats", "Search the dishes", "Procurar nos pratos", "Cerca tra i piatti", "In den Gerichten suchen"),
  // hours
  openNow: l("Ouvert maintenant", "Open now", "Aberto agora", "Aperto ora", "Jetzt geöffnet"),
  closedNow: l("Fermé maintenant", "Closed now", "Fechado agora", "Chiuso ora", "Jetzt geschlossen"),
  until: l("jusqu’à", "until", "até às", "fino alle", "bis"),
  reopens: l("réouverture", "reopens", "reabre", "riapre", "wieder offen"),
  reopensAt: l("à", "at", "às", "alle", "um"),
  today: l("Aujourd’hui", "Today", "Hoje", "Oggi", "Heute"),
  tomorrow: l("demain", "tomorrow", "amanhã", "domani", "morgen"),
  glandTime: l("Heure de Gland (Suisse)", "Gland time (Switzerland)", "Hora de Gland (Suíça)", "Ora di Gland (Svizzera)", "Uhrzeit in Gland (Schweiz)"),
  weekWheel: l("Les sept jours de la semaine", "The seven days of the week", "Os sete dias da semana", "I sette giorni della settimana", "Die sieben Wochentage"),
  both: l("Tout", "All", "Tudo", "Tutto", "Alle"),
  closedService: l("pas de service", "no service", "sem serviço", "nessun servizio", "kein Service"),
  hoursAccess: l("Horaires et accès", "Hours and directions", "Horário e acesso", "Orari e accesso", "Öffnungszeiten und Anfahrt"),
  spinPlate: l("Faites tourner l’assiette", "Spin the plate", "Rode o prato", "Fate girare il piatto", "Teller drehen"),
  spinHint: l("Glissez pour la faire tourner, ou utilisez ← →", "Drag to spin it, or use ← →", "Arraste para rodar, ou use ← →", "Trascinate per farlo girare, o usate ← →", "Ziehen zum Drehen, oder ← →"),
  // reservations
  bookingTitle: l("Réserver une table", "Book a table", "Reservar mesa", "Prenotare un tavolo", "Tisch reservieren"),
  howMany: l("Combien êtes-vous ?", "How many are you?", "Quantos são?", "Quanti siete?", "Wie viele sind Sie?"),
  people: l("personnes", "people", "pessoas", "persone", "Personen"),
  person: l("personne", "person", "pessoa", "persona", "Person"),
  fewer: l("Une personne de moins", "One person fewer", "Menos uma pessoa", "Una persona in meno", "Eine Person weniger"),
  more: l("Une personne de plus", "One person more", "Mais uma pessoa", "Una persona in più", "Eine Person mehr"),
  byPhone: l("Par téléphone", "By phone", "Por telefone", "Per telefono", "Per Telefon"),
  planLink: l("Une spécialité ? Planifiez 48 h à l’avance", "A speciality? Plan 48 h ahead", "Uma especialidade? Planeie com 48 h", "Una specialità? Pianificate 48 h prima", "Eine Spezialität? 48 h im Voraus planen"),
  todayHours: l("Horaires d’aujourd’hui", "Today’s hours", "Horário de hoje", "Orario di oggi", "Heutige Öffnungszeiten"),
  // services
  formulas: l("Formules avec traiteur", "Catering formulas", "Fórmulas com catering", "Formule con catering", "Angebote mit Catering"),
  onSiteTakeaway: l("Repas sur place ou à l’emporter", "Eat in or take away", "Refeições no local ou para levar", "Pasti sul posto o da asporto", "Essen vor Ort oder zum Mitnehmen"),
  // gallery
  gridView: l("Voir en grille", "Show as grid", "Ver em grelha", "Vedi a griglia", "Als Raster"),
  trackView: l("Voir en défilé", "Show as track", "Ver em faixa", "Vedi a scorrimento", "Als Band"),
  dishesGroup: l("Les plats", "The dishes", "Os pratos", "I piatti", "Die Gerichte"),
  eventGroup: l("Les évènements", "Events", "Os eventos", "Gli eventi", "Anlässe"),
  openPhoto: l("Agrandir la photo", "Enlarge photo", "Ampliar fotografia", "Ingrandisci la foto", "Foto vergrössern"),
  dragHint: l("Faites défiler ou glissez", "Scroll or drag", "Deslize ou arraste", "Scorrete o trascinate", "Scrollen oder ziehen"),
  seeAll: l("Tout voir", "See all", "Ver tudo", "Vedi tutto", "Alle ansehen"),
  // reviews
  flipHint: l("Touchez une carte pour la traduction", "Tap a card for the translation", "Toque num cartão para ver a tradução", "Toccate una scheda per la traduzione", "Tippen Sie auf eine Karte für die Übersetzung"),
  showTranslation: l("Voir la traduction", "Show the translation", "Ver a tradução", "Vedi la traduzione", "Übersetzung zeigen"),
  showOriginal: l("Voir l’original", "Show the original", "Ver o original", "Vedi l’originale", "Original zeigen"),
  stars5: l("5 étoiles sur 5", "5 stars out of 5", "5 estrelas em 5", "5 stelle su 5", "5 von 5 Sternen"),
  // contact
  address: l("Adresse", "Address", "Morada", "Indirizzo", "Adresse"),
  plan: l("Plan", "Map", "Mapa", "Mappa", "Karte"),
  appleMaps: l("Apple Plans", "Apple Maps", "Apple Mapas", "Apple Mappe", "Apple Karten"),
  route: l("Itinéraire", "Directions", "Itinerário", "Itinerario", "Route"),
  openRoute: l("Ouvrir l’itinéraire", "Open the route", "Abrir o itinerário", "Apri l’itinerario", "Route öffnen"),
  routeNote: l("L’itinéraire s’ouvre dans l’application choisie seulement quand vous touchez le bouton.", "The route opens in the chosen app only when you tap the button.", "O itinerário só abre na aplicação escolhida quando tocar no botão.", "L’itinerario si apre nell’app scelta solo quando toccate il pulsante.", "Die Route öffnet sich in der gewählten App erst, wenn Sie auf den Knopf tippen."),
  phones: l("Téléphones", "Phones", "Telefones", "Telefoni", "Telefon"),
  social: l("Réseaux sociaux", "Social media", "Redes sociais", "Social", "Soziale Medien"),
  listings: l("Nous trouver", "Find us", "Encontrar-nos", "Trovateci", "Uns finden"),
  showMap: l("Afficher la carte (Google Maps)", "Show the map (Google Maps)", "Mostrar o mapa (Google Maps)", "Mostra la mappa (Google Maps)", "Karte anzeigen (Google Maps)"),
  mapNote: l("La carte se charge chez Google seulement après votre clic.", "The map loads from Google only after you click.", "O mapa só é carregado da Google depois do seu clique.", "La mappa si carica da Google solo dopo il vostro clic.", "Die Karte wird erst nach Ihrem Klick von Google geladen."),
  mapPreview: l("La pré-visualisation ne peut pas afficher Google Maps ici : ouvrez la carte dans un nouvel onglet.", "The preview can’t show Google Maps here: open the map in a new tab.", "A pré-visualização não pode mostrar o Google Maps aqui: abra o mapa num novo separador.", "L’anteprima non può mostrare Google Maps qui: aprite la mappa in una nuova scheda.", "Die Vorschau kann Google Maps hier nicht anzeigen: Öffnen Sie die Karte in einem neuen Tab."),
  hours: l("Horaires d’ouverture", "Opening hours", "Horário de abertura", "Orari di apertura", "Öffnungszeiten"),
  // privacy
  privacyRef: l("", "Translation for information. The French version is the reference.", "Tradução para informação. A versão francesa é a de referência.", "Traduzione a titolo informativo. Fa fede la versione francese.", "Übersetzung zur Information. Massgebend ist die französische Fassung."),
  privacyOld: l("Le tableau des cookies ci-dessous reprend celui de l’ancien site.", "The cookie table below is the one from the old site.", "A tabela de cookies abaixo é a do site antigo.", "La tabella dei cookie qui sotto è quella del vecchio sito.", "Die Cookie-Tabelle unten stammt von der alten Website."),
  footerBook: l("Réservation par téléphone", "Bookings by phone", "Reservas por telefone", "Prenotazione per telefono", "Reservation per Telefon"),
} satisfies Record<string, L | string>;

export type UIKey = keyof typeof UI;
