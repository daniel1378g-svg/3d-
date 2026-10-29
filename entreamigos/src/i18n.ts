// Languages, page addresses and the interface words. Facts (names, prices, phone, address, bus lines, hours)
// never pass through here; they live in src/content and stay identical in every language.
export const LANGS = ["fr", "en", "pt", "it", "de"] as const;
export type Lang = (typeof LANGS)[number];
export type L = Record<Lang, string>;
export const isLang = (v: unknown): v is Lang => typeof v === "string" && (LANGS as readonly string[]).includes(v);

export const HTML_LANG: Record<Lang, string> = { fr: "fr", en: "en", pt: "pt-PT", it: "it", de: "de-CH" };
export const LOCALE: Record<Lang, string> = { fr: "fr-CH", en: "en-GB", pt: "pt-PT", it: "it-CH", de: "de-CH" };
export const NATIVE: Record<Lang, string> = { fr: "Français", en: "English", pt: "Português", it: "Italiano", de: "Deutsch" };

export type PageKey = "home" | "carte" | "commande" | "vins" | "galerie" | "acces";
export const PAGES: PageKey[] = ["home", "carte", "commande", "vins", "galerie", "acces"];
export const SLUGS: Record<Lang, Record<PageKey, string>> = {
  fr: { home: "", carte: "carte", commande: "sur-commande", vins: "vins", galerie: "galerie", acces: "plan-d-acces" },
  en: { home: "", carte: "menu", commande: "pre-order", vins: "wines", galerie: "gallery", acces: "getting-here" },
  pt: { home: "", carte: "ementa", commande: "por-encomenda", vins: "vinhos", galerie: "galeria", acces: "como-chegar" },
  it: { home: "", carte: "menu", commande: "su-ordinazione", vins: "vini", galerie: "galleria", acces: "come-arrivare" },
  de: { home: "", carte: "speisekarte", commande: "auf-bestellung", vins: "weine", galerie: "galerie", acces: "anfahrt" },
};
export const pathFor = (lang: Lang, page: PageKey) => `/${lang}/${SLUGS[lang][page]}`;
export function pageFromSlug(lang: Lang, slug: string): PageKey | null {
  const s = slug.replace(/\/$/, "");
  return (Object.keys(SLUGS[lang]) as PageKey[]).find((p) => SLUGS[lang][p] === s) ?? null;
}

/** Home anchors, the same in every language. */
export const ANCHORS = ["accueil", "carte", "sur-commande", "vins", "horaires", "reservation", "livraison", "galerie", "enfants", "contact"] as const;

const l = (fr: string, en: string, pt: string, it: string, de: string): L => ({ fr, en, pt, it, de });

export const WELCOME: Record<Lang, { word: string; line: string }> = {
  fr: { word: "Bienvenue", line: "chez Entre Amigos" },
  en: { word: "Welcome", line: "to Entre Amigos" },
  pt: { word: "Bem-vindos", line: "ao Entre Amigos" },
  it: { word: "Benvenuti", line: "da Entre Amigos" },
  de: { word: "Willkommen", line: "bei Entre Amigos" },
};

export const UI = {
  proposal: "Proposta de design · não é o site oficial",
  skip: l("Aller au contenu", "Skip to content", "Saltar para o conteúdo", "Vai al contenuto", "Zum Inhalt springen"),
  skipIntro: l("Passer l’intro", "Skip intro", "Saltar a introdução", "Salta l’intro", "Intro überspringen"),
  home: l("Bienvenue", "Welcome", "Início", "Benvenuti", "Willkommen"),
  carte: l("La carte", "Menu", "Ementa", "Menu", "Speisekarte"),
  commande: l("Sur commande", "Pre-order", "Por encomenda", "Su ordinazione", "Auf Bestellung"),
  vins: l("Nos vins", "Our wines", "Os nossos vinhos", "I nostri vini", "Unsere Weine"),
  galerie: l("Galerie", "Gallery", "Galeria", "Galleria", "Galerie"),
  acces: l("Plan d’accès", "Getting here", "Como chegar", "Come arrivare", "Anfahrt"),
  horaires: l("Horaires", "Opening hours", "Horário", "Orari", "Öffnungszeiten"),
  livraison: l("Livraison", "Delivery", "Entregas", "Consegna", "Lieferung"),
  enfants: l("Menus enfants", "Kids’ menus", "Menus infantis", "Menu bambini", "Kindermenüs"),
  reserve: l("Réserver", "Book a table", "Reservar", "Prenotare", "Reservieren"),
  menu: l("Menu", "Menu", "Menu", "Menu", "Menü"),
  close: l("Fermer", "Close", "Fechar", "Chiudi", "Schliessen"),
  call: l("Appeler", "Call", "Ligar", "Chiama", "Anrufen"),
  email: l("E-mail", "E-mail", "E-mail", "E-mail", "E-Mail"),
  copy: l("Copier", "Copy", "Copiar", "Copia", "Kopieren"),
  copied: l("Copié", "Copied", "Copiado", "Copiato", "Kopiert"),
  language: l("Langue", "Language", "Idioma", "Lingua", "Sprache"),
  languages: l("Langues", "Languages", "Idiomas", "Lingue", "Sprachen"),
  mainNav: l("Navigation principale", "Main navigation", "Navegação principal", "Navigazione principale", "Hauptnavigation"),
  homeLink: l("Entre Amigos, accueil", "Entre Amigos, home", "Entre Amigos, início", "Entre Amigos, home", "Entre Amigos, Startseite"),
  scroll: l("Faites défiler", "Scroll", "Deslize", "Scorri", "Scrollen"),
  pause: l("Pause", "Pause", "Pausa", "Pausa", "Pause"),
  play: l("Reprendre", "Play", "Retomar", "Riprendi", "Weiter"),
  prev: l("Précédent", "Previous", "Anterior", "Precedente", "Zurück"),
  next: l("Suivant", "Next", "Seguinte", "Successivo", "Weiter"),
  seeCarte: l("Voir toute la carte", "See the whole menu", "Ver toda a ementa", "Vedi tutto il menu", "Ganze Karte ansehen"),
  seeMenu: l("Voir la carte", "See the menu", "Ver a ementa", "Vedi il menu", "Karte ansehen"),
  allWines: l("Notre carte des vins", "Our wine list", "A nossa carta de vinhos", "La nostra carta dei vini", "Unsere Weinkarte"),
  hoursAccess: l("Plan d’accès", "Getting here", "Como chegar", "Come arrivare", "Anfahrt"),
  externalNew: l("(nouvel onglet)", "(new tab)", "(novo separador)", "(nuova scheda)", "(neuer Tab)"),
  photo: l("Photo", "Photo", "Foto", "Foto", "Foto"),
  photoSlot: l("Photo à venir", "Photo to come", "Foto em breve", "Foto in arrivo", "Foto folgt"),
  translation: l("Traduction", "Translation", "Tradução", "Traduzione", "Übersetzung"),
  // reservations
  bookingTitle: l("Réserver une table", "Book a table", "Reservar mesa", "Prenotare un tavolo", "Tisch reservieren"),
  bookingLine: l("Réservations par téléphone ou par e-mail.", "Bookings by phone or e-mail.", "Reservas por telefone ou e-mail.", "Prenotazioni per telefono o e-mail.", "Reservation per Telefon oder E-Mail."),
  howMany: l("Combien êtes-vous ?", "How many are you?", "Quantos são?", "Quanti siete?", "Wie viele sind Sie?"),
  whichDay: l("Quel jour ?", "Which day?", "Que dia?", "Che giorno?", "Welcher Tag?"),
  people: l("personnes", "people", "pessoas", "persone", "Personen"),
  person: l("personne", "person", "pessoa", "persona", "Person"),
  fewer: l("Une personne de moins", "One person fewer", "Menos uma pessoa", "Una persona in meno", "Eine Person weniger"),
  more: l("Une personne de plus", "One person more", "Mais uma pessoa", "Una persona in più", "Eine Person mehr"),
  smallParty: l("Appelez-nous ou écrivez-nous, nous vous gardons une table.", "Call or e-mail us and we will keep you a table.", "Ligue-nos ou escreva-nos e guardamos-lhe uma mesa.", "Chiamateci o scriveteci e vi teniamo un tavolo.", "Rufen Sie an oder schreiben Sie uns, wir halten Ihnen einen Tisch frei."),
  bigParty: l("À partir de 10 personnes, ces plats se font sur commande :", "From 10 people, these dishes can be pre-ordered:", "A partir de 10 pessoas, estes pratos fazem-se por encomenda:", "Da 10 persone, questi piatti si preparano su ordinazione:", "Ab 10 Personen gibt es diese Gerichte auf Bestellung:"),
  planLink: l("Un plat sur commande ? Préparez votre groupe", "A dish to pre-order? Plan your group", "Um prato por encomenda? Planeie o seu grupo", "Un piatto su ordinazione? Organizzate il gruppo", "Ein Gericht auf Bestellung? Gruppe planen"),
  // group planner
  plannerTitle: l("Planifier un repas de groupe", "Plan a group meal", "Planear uma refeição de grupo", "Pianificare un pasto di gruppo", "Gruppenessen planen"),
  pickDish: l("Quel plat ?", "Which dish?", "Que prato?", "Quale piatto?", "Welches Gericht?"),
  service: l("Service", "Service", "Serviço", "Servizio", "Service"),
  midi: l("Midi", "Lunch", "Almoço", "Pranzo", "Mittag"),
  soir: l("Soir", "Dinner", "Jantar", "Cena", "Abend"),
  noDinner: l("pas de service le soir", "no dinner service", "sem serviço ao jantar", "niente cena", "kein Abendservice"),
  indicative: l("indicatif", "indicative", "indicativo", "indicativo", "unverbindlich"),
  totalFor: l("pour", "for", "para", "per", "für"),
  pickADay: l("Choisissez un jour dans le calendrier.", "Pick a day in the calendar.", "Escolha um dia no calendário.", "Scegliete un giorno nel calendario.", "Wählen Sie einen Tag im Kalender."),
  noLead: l("Le site ne précise pas le délai de commande : appelez-nous pour le confirmer.", "The site gives no ordering lead time: call us to confirm.", "O site não indica o prazo de encomenda: ligue-nos para confirmar.", "Il sito non indica il preavviso: chiamateci per confermare.", "Die Website nennt keine Vorlaufzeit: Rufen Sie uns zur Bestätigung an."),
  prevMonth: l("Mois précédent", "Previous month", "Mês anterior", "Mese precedente", "Vorheriger Monat"),
  nextMonth: l("Mois suivant", "Next month", "Mês seguinte", "Mese successivo", "Nächster Monat"),
  mailSubject: l("Commande de groupe", "Group order", "Encomenda de grupo", "Ordine di gruppo", "Gruppenbestellung"),
  // open now and hours
  openNow: l("Ouvert maintenant", "Open now", "Aberto agora", "Aperto ora", "Jetzt geöffnet"),
  closedNow: l("Fermé maintenant", "Closed now", "Fechado agora", "Chiuso ora", "Jetzt geschlossen"),
  until: l("jusqu’à", "until", "até às", "fino alle", "bis"),
  reopens: l("réouverture", "reopens", "reabre", "riapre", "öffnet wieder"),
  tomorrow: l("demain", "tomorrow", "amanhã", "domani", "morgen"),
  todayLunchDinner: l("Aujourd’hui : midi et soir", "Today: lunch and dinner", "Hoje: almoço e jantar", "Oggi: pranzo e cena", "Heute: mittags und abends"),
  todayLunch: l("Aujourd’hui : midi", "Today: lunch", "Hoje: almoço", "Oggi: pranzo", "Heute: mittags"),
  todayUntil16: l("Aujourd’hui : jusqu’à", "Today: until", "Hoje: até às", "Oggi: fino alle", "Heute: bis"),
  today: l("Aujourd’hui", "Today", "Hoje", "Oggi", "Heute"),
  genevaTime: l("Heure de Genève", "Geneva time", "Hora de Genebra", "Ora di Ginevra", "Genfer Zeit"),
  days: l("Jours de la semaine", "Days of the week", "Dias da semana", "Giorni della settimana", "Wochentage"),
  // plats du jour
  platsTitle: l("Plats du jour", "Dishes of the day", "Pratos do dia", "Piatti del giorno", "Tagesgerichte"),
  fbLoad: l("Afficher les publications Facebook", "Show the Facebook posts", "Mostrar as publicações do Facebook", "Mostra i post di Facebook", "Facebook-Beiträge anzeigen"),
  fbNote: l("Le contenu de Facebook se charge seulement après votre clic.", "Facebook content loads only after you click.", "O conteúdo do Facebook só é carregado depois do seu clique.", "I contenuti di Facebook si caricano solo dopo il vostro clic.", "Facebook-Inhalte werden erst nach Ihrem Klick geladen."),
  fbSee: l("Voir sur Facebook", "See on Facebook", "Ver no Facebook", "Vedi su Facebook", "Auf Facebook ansehen"),
  // carte
  search: l("Rechercher un plat", "Search for a dish", "Procurar um prato", "Cerca un piatto", "Gericht suchen"),
  noResult: l("Aucun résultat", "No results", "Nenhum resultado", "Nessun risultato", "Keine Treffer"),
  results: l("résultats", "results", "resultados", "risultati", "Treffer"),
  sections: l("Sections de la carte", "Menu sections", "Secções da ementa", "Sezioni del menu", "Abschnitte der Karte"),
  sideAll: l("Tout", "All", "Tudo", "Tutto", "Alles"),
  meat: l("Viande", "Meat", "Carne", "Carne", "Fleisch"),
  fish: l("Poisson", "Fish", "Peixe", "Pesce", "Fisch"),
  sideFilter: l("Viande, poisson ou tout", "Meat, fish or all", "Carne, peixe ou tudo", "Carne, pesce o tutto", "Fleisch, Fisch oder alles"),
  lines: l("lignes", "items", "linhas", "voci", "Positionen"),
  pdf: l("Télécharger la carte (PDF)", "Download the menu (PDF)", "Descarregar a ementa (PDF)", "Scarica il menu (PDF)", "Karte herunterladen (PDF)"),
  planGroup: l("Planifier", "Plan", "Planear", "Pianifica", "Planen"),
  flipHint: l("Touchez une carte pour la retourner", "Tap a card to flip it", "Toque num cartão para o virar", "Toccate una carta per girarla", "Tippen Sie auf eine Karte, um sie umzudrehen"),
  // wines
  red: l("Rouge", "Red", "Tinto", "Rosso", "Rot"),
  rose: l("Rosé", "Rosé", "Rosé", "Rosato", "Rosé"),
  white: l("Blanc", "White", "Branco", "Bianco", "Weiss"),
  wines: l("vins", "wines", "vinhos", "vini", "Weine"),
  wine: l("vin", "wine", "vinho", "vino", "Wein"),
  regions: l("Régions", "Regions", "Regiões", "Regioni", "Regionen"),
  allRegions: l("Toutes les régions", "All regions", "Todas as regiões", "Tutte le regioni", "Alle Regionen"),
  noWineColour: l("Pas de vin de cette couleur dans cette région.", "No wine of this colour from this region.", "Nenhum vinho desta cor nesta região.", "Nessun vino di questo colore in questa regione.", "Kein Wein dieser Farbe aus dieser Region."),
  spinCork: l("Faites tourner le sous-verre", "Spin the coaster", "Rode a base de cortiça", "Fate girare il sottobicchiere", "Untersetzer drehen"),
  spinHint: l("Glissez pour le faire tourner, ou utilisez ← →", "Drag to spin it, or use ← →", "Arraste para rodar, ou use ← →", "Trascinate per farlo girare, o usate ← →", "Ziehen zum Drehen, oder ← → benutzen"),
  bottles: l("Images des bouteilles : à confirmer par le restaurant", "Bottle images: to be confirmed by the restaurant", "Imagens das garrafas: a confirmar pelo restaurante", "Immagini delle bottiglie: da confermare dal ristorante", "Flaschenbilder: vom Restaurant zu bestätigen"),
  // gallery
  gridView: l("Voir en grille", "Show as grid", "Ver em grelha", "Vedi a griglia", "Als Raster"),
  trackView: l("Voir en défilé", "Show as track", "Ver em faixa", "Vedi a scorrimento", "Als Band"),
  plates: l("Les plats", "The dishes", "Os pratos", "I piatti", "Die Gerichte"),
  terrace: l("La terrasse", "The terrace", "A esplanada", "La terrazza", "Die Terrasse"),
  sweet: l("Desserts et glaces", "Desserts and ice cream", "Sobremesas e gelados", "Dolci e gelati", "Desserts und Glace"),
  winesPhotos: l("Les vins", "The wines", "Os vinhos", "I vini", "Die Weine"),
  photos: l("photos", "photos", "fotografias", "foto", "Fotos"),
  openPhoto: l("Agrandir la photo", "Enlarge photo", "Ampliar fotografia", "Ingrandisci la foto", "Foto vergrössern"),
  // access and contact
  address: l("Adresse", "Address", "Morada", "Indirizzo", "Adresse"),
  route: l("Itinéraire", "Directions", "Itinerário", "Itinerario", "Route"),
  accessTabs: l("Accès", "Access", "Acesso", "Accesso", "Zugang"),
  appleMaps: l("Apple Plans", "Apple Maps", "Apple Mapas", "Apple Mappe", "Apple Karten"),
  phone: l("Téléphone", "Phone", "Telefone", "Telefono", "Telefon"),
  showMap: l("Afficher la carte (Google Maps)", "Show the map (Google Maps)", "Mostrar o mapa (Google Maps)", "Mostra la mappa (Google Maps)", "Karte anzeigen (Google Maps)"),
  mapNote: l("La carte se charge chez Google seulement après votre clic.", "The map loads from Google only after you click.", "O mapa só é carregado da Google depois do seu clique.", "La mappa si carica da Google solo dopo il vostro clic.", "Die Karte wird erst nach Ihrem Klick von Google geladen."),
  openRoute: l("Ouvrir l’itinéraire", "Open the route", "Abrir o itinerário", "Apri l’itinerario", "Route öffnen"),
  facebook: l("Facebook", "Facebook", "Facebook", "Facebook", "Facebook"),
  delivery: l("Livraison", "Delivery", "Entrega", "Consegna", "Lieferung"),
  // sections
  story: l("Envie d’évasion ?", "Fancy a getaway?", "Vontade de evasão?", "Voglia di evasione?", "Lust auf Urlaub?"),
  dragHint: l("Faites défiler ou glissez", "Scroll or drag", "Deslize ou arraste", "Scorrete o trascinate", "Scrollen oder ziehen"),
  of: l("sur", "of", "de", "di", "von"),
  perPerson: l("par personne", "per person", "por pessoa", "a persona", "pro Person"),
  min10: l("Pour minimum 10 personnes", "For at least 10 people", "Para um mínimo de 10 pessoas", "Per almeno 10 persone", "Für mindestens 10 Personen"),
} satisfies Record<string, L | string>;

export type UIKey = keyof typeof UI;
