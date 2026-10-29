// Languages, page addresses and the interface words. Facts (names, prices, phones, address, tram lines)
// never pass through here; they live in src/content and stay identical in every language.
export const LANGS = ["fr", "en", "pt", "it", "de"] as const;
export type Lang = (typeof LANGS)[number];
export type L = Record<Lang, string>;
export const isLang = (v: unknown): v is Lang => typeof v === "string" && (LANGS as readonly string[]).includes(v);

export const HTML_LANG: Record<Lang, string> = { fr: "fr", en: "en", pt: "pt-PT", it: "it", de: "de-CH" };
export const LOCALE: Record<Lang, string> = { fr: "fr-CH", en: "en-GB", pt: "pt-PT", it: "it-CH", de: "de-CH" };
export const NATIVE: Record<Lang, string> = { fr: "Français", en: "English", pt: "Português", it: "Italiano", de: "Deutsch" };

export type PageKey = "home" | "carte" | "vins" | "galerie" | "presse" | "actualites" | "contact";
export const PAGES: PageKey[] = ["home", "carte", "vins", "galerie", "presse", "actualites", "contact"];
export const SLUGS: Record<Lang, Record<PageKey, string>> = {
  fr: { home: "", carte: "carte", vins: "vins", galerie: "galerie", presse: "presse", actualites: "actualites", contact: "contact" },
  en: { home: "", carte: "menu", vins: "wines", galerie: "gallery", presse: "press", actualites: "news", contact: "contact" },
  pt: { home: "", carte: "ementa", vins: "vinhos", galerie: "galeria", presse: "imprensa", actualites: "novidades", contact: "contacto" },
  it: { home: "", carte: "menu", vins: "vini", galerie: "galleria", presse: "stampa", actualites: "notizie", contact: "contatti" },
  de: { home: "", carte: "speisekarte", vins: "weine", galerie: "galerie", presse: "presse", actualites: "aktuelles", contact: "kontakt" },
};
export const pathFor = (lang: Lang, page: PageKey) => `/${lang}/${SLUGS[lang][page]}`;
export function pageFromSlug(lang: Lang, slug: string): PageKey | null {
  const s = slug.replace(/\/$/, "");
  return (Object.keys(SLUGS[lang]) as PageKey[]).find((p) => SLUGS[lang][p] === s) ?? null;
}

/** Home anchors, the same in every language. */
export const ANCHORS = ["accueil", "carte", "sur-commande", "vins", "reservation", "galerie", "presse", "contact"] as const;

const l = (fr: string, en: string, pt: string, it: string, de: string): L => ({ fr, en, pt, it, de });

export const WELCOME: Record<Lang, { word: string; line: string }> = {
  fr: { word: "Bienvenue", line: "au Portugais" },
  en: { word: "Welcome", line: "to Le Portugais" },
  pt: { word: "Bem-vindos", line: "ao Le Portugais" },
  it: { word: "Benvenuti", line: "a Le Portugais" },
  de: { word: "Willkommen", line: "im Le Portugais" },
};

export const UI = {
  proposal: "Proposta de design · não é o site oficial",
  skip: l("Aller au contenu", "Skip to content", "Saltar para o conteúdo", "Vai al contenuto", "Zum Inhalt springen"),
  skipIntro: l("Passer l’intro", "Skip intro", "Saltar a introdução", "Salta l’intro", "Intro überspringen"),
  home: l("Accueil", "Home", "Início", "Home", "Start"),
  carte: l("La carte", "Menu", "Ementa", "Menu", "Speisekarte"),
  vins: l("Les vins", "Wines", "Vinhos", "Vini", "Weine"),
  galerie: l("Galerie", "Gallery", "Galeria", "Galleria", "Galerie"),
  presse: l("Presse", "Press", "Imprensa", "Stampa", "Presse"),
  actualites: l("Actualités", "News", "Novidades", "Notizie", "Aktuelles"),
  contact: l("Contact", "Contact", "Contacto", "Contatti", "Kontakt"),
  surCommande: l("Sur commande", "To order", "Por encomenda", "Su ordinazione", "Auf Bestellung"),
  reserve: l("Réserver", "Book a table", "Reservar", "Prenotare", "Reservieren"),
  menu: l("Menu", "Menu", "Menu", "Menu", "Menü"),
  close: l("Fermer", "Close", "Fechar", "Chiudi", "Schliessen"),
  call: l("Appeler", "Call", "Ligar", "Chiama", "Anrufen"),
  email: l("E-mail", "E-mail", "E-mail", "E-mail", "E-Mail"),
  write: l("Écrire", "Write", "Escrever", "Scrivi", "Schreiben"),
  language: l("Langue", "Language", "Idioma", "Lingua", "Sprache"),
  languages: l("Langues", "Languages", "Idiomas", "Lingue", "Sprachen"),
  mainNav: l("Navigation principale", "Main navigation", "Navegação principal", "Navigazione principale", "Hauptnavigation"),
  homeLink: l("Le Portugais, accueil", "Le Portugais, home", "Le Portugais, início", "Le Portugais, home", "Le Portugais, Startseite"),
  scroll: l("Faites défiler", "Scroll", "Deslize", "Scorri", "Scrollen"),
  pause: l("Pause", "Pause", "Pausa", "Pausa", "Pause"),
  play: l("Reprendre", "Play", "Retomar", "Riprendi", "Weiter"),
  prev: l("Précédent", "Previous", "Anterior", "Precedente", "Zurück"),
  next: l("Suivant", "Next", "Seguinte", "Successivo", "Weiter"),
  since: l("Depuis le 1er février 1973", "Since 1 February 1973", "Desde 1 de fevereiro de 1973", "Dal 1° febbraio 1973", "Seit dem 1. Februar 1973"),
  seeCarte: l("Voir toute la carte", "See the whole menu", "Ver toda a ementa", "Vedi tutto il menu", "Ganze Karte ansehen"),
  allWines: l("Toute la carte des vins", "The whole wine list", "Toda a carta de vinhos", "Tutta la carta dei vini", "Ganze Weinkarte"),
  seeAll: l("Tout voir", "See all", "Ver tudo", "Vedi tutto", "Alle ansehen"),
  archive: l("Toutes les actualités", "All news", "Todas as novidades", "Tutte le notizie", "Alle Neuigkeiten"),
  pressAll: l("Toute la presse", "All press", "Toda a imprensa", "Tutta la stampa", "Alle Presseartikel"),
  readPost: l("Lire l’article", "Read the article", "Ler o artigo", "Leggi l’articolo", "Artikel lesen"),
  openPost: l("Voir sur l’ancien site", "View on the old site", "Ver no site antigo", "Vedi sul vecchio sito", "Auf der alten Website ansehen"),
  externalNew: l("(nouvel onglet)", "(new tab)", "(novo separador)", "(nuova scheda)", "(neuer Tab)"),
  photo: l("Photo", "Photo", "Foto", "Foto", "Foto"),
  photoSlot: l("Photo à venir", "Photo to come", "Foto em breve", "Foto in arrivo", "Foto folgt"),
  // reservations
  bookingTitle: l("Réserver une table", "Book a table", "Reservar mesa", "Prenotare un tavolo", "Tisch reservieren"),
  howMany: l("Combien êtes-vous ?", "How many are you?", "Quantos são?", "Quanti siete?", "Wie viele sind Sie?"),
  whichDay: l("Quel jour venez-vous ?", "Which day are you coming?", "Que dia vem?", "Che giorno venite?", "An welchem Tag kommen Sie?"),
  people: l("personnes", "people", "pessoas", "persone", "Personen"),
  person: l("personne", "person", "pessoa", "persona", "Person"),
  fewer: l("Une personne de moins", "One person fewer", "Menos uma pessoa", "Una persona in meno", "Eine Person weniger"),
  more: l("Une personne de plus", "One person more", "Mais uma pessoa", "Una persona in più", "Eine Person mehr"),
  smallParty: l("Appelez-nous, nous vous gardons une table.", "Call us and we will keep you a table.", "Ligue-nos e guardamos-lhe uma mesa.", "Chiamateci e vi teniamo un tavolo.", "Rufen Sie uns an, wir halten Ihnen einen Tisch frei."),
  planLink: l("Un plat sur commande ? Planifiez 72 h à l’avance", "A dish to order? Plan 72 h ahead", "Um prato por encomenda? Planeie com 72 h", "Un piatto su ordinazione? Pianificate 72 h prima", "Ein Gericht auf Bestellung? 72 h im Voraus planen"),
  // planner
  plannerTitle: l("Planifier un plat sur commande", "Plan a dish to order", "Planear um prato por encomenda", "Pianificare un piatto su ordinazione", "Ein Gericht auf Bestellung planen"),
  pickDish: l("Quel plat ?", "Which dish?", "Que prato?", "Quale piatto?", "Welches Gericht?"),
  orderBy: l("Commandez au plus tard le", "Order no later than", "Encomende até", "Ordinate entro il", "Bestellen Sie spätestens am"),
  orderHint: l("72 heures avant votre visite ; si ce jour-là le restaurant est fermé, la veille ouverte.", "72 hours before your visit; if the restaurant is closed that day, the last open day before.", "72 horas antes da sua visita; se nesse dia o restaurante estiver fechado, o último dia aberto antes.", "72 ore prima della vostra visita; se quel giorno il ristorante è chiuso, l’ultimo giorno di apertura precedente.", "72 Stunden vor Ihrem Besuch; ist das Restaurant an diesem Tag geschlossen, am letzten Öffnungstag davor."),
  pickADay: l("Choisissez un jour dans le calendrier.", "Pick a day in the calendar.", "Escolha um dia no calendário.", "Scegliete un giorno nel calendario.", "Wählen Sie einen Tag im Kalender."),
  closedDay: l("fermé", "closed", "fechado", "chiuso", "geschlossen"),
  tooSoon: l("moins de 72 h", "under 72 h", "menos de 72 h", "meno di 72 h", "unter 72 h"),
  prevMonth: l("Mois précédent", "Previous month", "Mês anterior", "Mese precedente", "Vorheriger Monat"),
  nextMonth: l("Mois suivant", "Next month", "Mês seguinte", "Mese successivo", "Nächster Monat"),
  mailSubject: l("Commande", "Order", "Encomenda", "Ordinazione", "Bestellung"),
  for: l("pour le", "for", "para", "per il", "für den"),
  // open today
  openToday: l("Ouvert aujourd’hui", "Open today", "Aberto hoje", "Aperto oggi", "Heute geöffnet"),
  closedToday: l("Fermé aujourd’hui · ouvert dès mardi", "Closed today · open from Tuesday", "Fechado hoje · aberto a partir de terça", "Chiuso oggi · aperto da martedì", "Heute geschlossen · ab Dienstag geöffnet"),
  closedTodayShort: l("Fermé aujourd’hui", "Closed today", "Fechado hoje", "Chiuso oggi", "Heute geschlossen"),
  today: l("Aujourd’hui", "Today", "Hoje", "Oggi", "Heute"),
  genevaTime: l("Heure de Genève", "Geneva time", "Hora de Genebra", "Ora di Ginevra", "Genfer Zeit"),
  // plats du jour
  askDish: l("Demandez le plat du jour", "Ask for the dish of the day", "Pergunte pelo prato do dia", "Chiedete il piatto del giorno", "Fragen Sie nach dem Tagesgericht"),
  meat: l("Viande", "Meat", "Carne", "Carne", "Fleisch"),
  fish: l("Poisson", "Fish", "Peixe", "Pesce", "Fisch"),
  vegan: l("Vegan", "Vegan", "Vegan", "Vegano", "Vegan"),
  // carte
  search: l("Rechercher un plat", "Search for a dish", "Procurar um prato", "Cerca un piatto", "Gericht suchen"),
  searchWine: l("Rechercher un vin", "Search for a wine", "Procurar um vinho", "Cerca un vino", "Wein suchen"),
  noResult: l("Aucun résultat", "No results", "Nenhum resultado", "Nessun risultato", "Keine Treffer"),
  results: l("résultats", "results", "resultados", "risultati", "Treffer"),
  sections: l("Sections de la carte", "Menu sections", "Secções da ementa", "Sezioni del menu", "Abschnitte der Karte"),
  plan72: l("Planifier (72 h)", "Plan (72 h)", "Planear (72 h)", "Pianifica (72 h)", "Planen (72 h)"),
  glutenSticker: l("Sans gluten", "Gluten-free", "Sem glúten", "Senza glutine", "Glutenfrei"),
  dishes: l("plats", "dishes", "pratos", "piatti", "Gerichte"),
  // wines
  red: l("Rouge", "Red", "Tinto", "Rosso", "Rot"),
  rose: l("Rosé", "Rosé", "Rosado", "Rosato", "Rosé"),
  white: l("Blanc", "White", "Branco", "Bianco", "Weiss"),
  wines: l("vins", "wines", "vinhos", "vini", "Weine"),
  wine: l("vin", "wine", "vinho", "vino", "Wein"),
  regions: l("Régions", "Regions", "Regiões", "Regioni", "Regionen"),
  allRegions: l("Toutes les régions", "All regions", "Todas as regiões", "Tutte le regioni", "Alle Regionen"),
  noWineColour: l("Pas de vin de cette couleur dans cette région.", "No wine of this colour from this region.", "Nenhum vinho desta cor nesta região.", "Nessun vino di questo colore in questa regione.", "Kein Wein dieser Farbe aus dieser Region."),
  outsidePortugal: l("Hors du Portugal", "Outside Portugal", "Fora de Portugal", "Fuori dal Portogallo", "Ausserhalb Portugals"),
  spinCork: l("Faites tourner le sous-verre", "Spin the coaster", "Rode a base de cortiça", "Fate girare il sottobicchiere", "Untersetzer drehen"),
  spinHint: l("Glissez pour le faire tourner, ou utilisez ← →", "Drag to spin it, or use ← →", "Arraste para rodar, ou use ← →", "Trascinate per farlo girare, o usate ← →", "Ziehen zum Drehen, oder ← →"),
  noPrices: l("La carte des vins en ligne n’affiche pas de prix.", "The online wine list shows no prices.", "A carta de vinhos online não mostra preços.", "La carta dei vini online non mostra prezzi.", "Die Online-Weinkarte zeigt keine Preise."),
  // gallery
  gridView: l("Voir en grille", "Show as grid", "Ver em grelha", "Vedi a griglia", "Als Raster"),
  trackView: l("Voir en défilé", "Show as track", "Ver em faixa", "Vedi a scorrimento", "Als Band"),
  room: l("La salle", "The room", "A sala", "La sala", "Der Saal"),
  plates: l("Les plats", "The dishes", "Os pratos", "I piatti", "Die Gerichte"),
  banquets: l("Les banquets", "Banquets", "Os banquetes", "I banchetti", "Bankette"),
  photos: l("photos", "photos", "fotografias", "foto", "Fotos"),
  openPhoto: l("Agrandir la photo", "Enlarge photo", "Ampliar fotografia", "Ingrandisci la foto", "Foto vergrössern"),
  // press & news
  scanMissing: l("Le document de cet article n’est plus disponible sur l’ancien site.", "The scan of this article is no longer available on the old site.", "A digitalização deste artigo já não está disponível no site antigo.", "La scansione di questo articolo non è più disponibile sul vecchio sito.", "Der Scan dieses Artikels ist auf der alten Website nicht mehr verfügbar."),
  latestNews: l("Dernière actualité", "Latest news", "Última novidade", "Ultima notizia", "Neueste Nachricht"),
  translatedNote: l("", "Translated from the French original.", "Traduzido do original francês.", "Tradotto dall’originale francese.", "Aus dem französischen Original übersetzt."),
  // contact
  address: l("Adresse", "Address", "Morada", "Indirizzo", "Adresse"),
  planAcces: l("Plan d’accès", "Directions", "Como chegar", "Come arrivare", "Anfahrt"),
  appleMaps: l("Apple Plans", "Apple Maps", "Apple Mapas", "Apple Mappe", "Apple Karten"),
  gettingThere: l("Venir au Portugais", "Getting here", "Como chegar", "Come arrivare", "Anreise"),
  tram: l("Tram", "Tram", "Elétrico", "Tram", "Tram"),
  parking: l("Parking", "Parking", "Estacionamento", "Parcheggio", "Parking"),
  phones: l("Téléphones", "Phones", "Telefones", "Telefoni", "Telefon"),
  showMap: l("Afficher la carte (Google Maps)", "Show the map (Google Maps)", "Mostrar o mapa (Google Maps)", "Mostra la mappa (Google Maps)", "Karte anzeigen (Google Maps)"),
  mapNote: l("La carte se charge chez Google seulement après votre clic.", "The map loads from Google only after you click.", "O mapa só é carregado da Google depois do seu clique.", "La mappa si carica da Google solo dopo il vostro clic.", "Die Karte wird erst nach Ihrem Klick von Google geladen."),
  form: l("Écrivez-nous", "Write to us", "Escreva-nos", "Scriveteci", "Schreiben Sie uns"),
  name: l("Votre nom", "Your name", "O seu nome", "Il vostro nome", "Ihr Name"),
  yourEmail: l("Votre e-mail", "Your e-mail", "O seu e-mail", "La vostra e-mail", "Ihre E-Mail"),
  subject: l("Sujet", "Subject", "Assunto", "Oggetto", "Betreff"),
  message: l("Votre message", "Your message", "A sua mensagem", "Il vostro messaggio", "Ihre Nachricht"),
  required: l("obligatoire", "required", "obrigatório", "obbligatorio", "Pflichtfeld"),
  send: l("Envoyer", "Send", "Enviar", "Invia", "Senden"),
  sending: l("Envoi…", "Sending…", "A enviar…", "Invio…", "Wird gesendet…"),
  sent: l("Merci, votre message est parti.", "Thank you, your message has been sent.", "Obrigado, a sua mensagem foi enviada.", "Grazie, il vostro messaggio è stato inviato.", "Danke, Ihre Nachricht wurde gesendet."),
  testMode: l("Pré-visualisation : le formulaire est en mode test et n’envoie rien encore.", "Preview: the form is in test mode and sends nothing yet.", "Pré-visualização: o formulário está em modo de teste e ainda não envia nada.", "Anteprima: il modulo è in modalità test e non invia ancora nulla.", "Vorschau: Das Formular ist im Testmodus und sendet noch nichts."),
  testSent: l("Mode test : le message a été vérifié mais pas envoyé.", "Test mode: the message was checked but not sent.", "Modo de teste: a mensagem foi verificada mas não enviada.", "Modalità test: il messaggio è stato verificato ma non inviato.", "Testmodus: Die Nachricht wurde geprüft, aber nicht gesendet."),
  formError: l("L’envoi a échoué. Appelez-nous ou écrivez directement à", "Sending failed. Call us or write directly to", "O envio falhou. Ligue-nos ou escreva diretamente para", "L’invio non è riuscito. Chiamateci o scrivete direttamente a", "Das Senden ist fehlgeschlagen. Rufen Sie uns an oder schreiben Sie direkt an"),
  fieldMissing: l("Merci de remplir ce champ.", "Please fill in this field.", "Preencha este campo.", "Compilate questo campo.", "Bitte füllen Sie dieses Feld aus."),
  emailInvalid: l("Cette adresse e-mail ne semble pas valide.", "This e-mail address does not look valid.", "Este endereço de e-mail não parece válido.", "Questo indirizzo e-mail non sembra valido.", "Diese E-Mail-Adresse scheint ungültig."),
  facebook: l("Facebook", "Facebook", "Facebook", "Facebook", "Facebook"),
  liens: l("Liens", "Links", "Ligações", "Link", "Links"),
  services: l("Services", "Services", "Serviços", "Servizi", "Dienstleistungen"),
  takeaway: l("Plats à l’emporter", "Take-away dishes", "Pratos para levar", "Piatti da asporto", "Gerichte zum Mitnehmen"),
  catering: l("Service traiteur", "Catering", "Serviço de catering", "Servizio catering", "Catering"),
  wineSales: l("Vente et livraison de vins et portos", "Sale and delivery of wines and ports", "Venda e entrega de vinhos e portos", "Vendita e consegna di vini e porti", "Verkauf und Lieferung von Weinen und Portweinen"),
  story: l("L’histoire", "The story", "A história", "La storia", "Die Geschichte"),
  fromTheSea: l("La carte", "The menu", "A ementa", "Il menu", "Die Karte"),
  cave: l("La cave", "The cellar", "A garrafeira", "La cantina", "Der Weinkeller"),
  groups: l("Groupes", "Groups", "Grupos", "Gruppi", "Gruppen"),
  dragHint: l("Faites défiler ou glissez", "Scroll or drag", "Deslize ou arraste", "Scorrete o trascinate", "Scrollen oder ziehen"),
  of: l("sur", "of", "de", "di", "von"),
  priceNone: l("selon les arrivages", "depending on arrivals", "segundo as chegadas", "secondo gli arrivi", "je nach Fang"),
  footerBook: l("Réservation par téléphone", "Bookings by phone", "Reservas por telefone", "Prenotazione per telefono", "Reservation per Telefon"),
} satisfies Record<string, L | string>;

export type UIKey = keyof typeof UI;
