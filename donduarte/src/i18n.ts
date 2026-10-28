// Languages, routes and every interface string. French is the source; the other four languages are
// translations that need a native-speaker check before launch.
export type Lang = "fr" | "en" | "pt" | "it" | "de";
export type PageKey = "home" | "plats" | "vins" | "desserts";
export type Localized = Record<Lang, string>;

export const LANGS: Lang[] = ["fr", "en", "pt", "it", "de"];
export const NATIVE: Record<Lang, string> = { fr: "Français", en: "English", pt: "Português", it: "Italiano", de: "Deutsch" };
export const HTML_LANG: Record<Lang, string> = { fr: "fr", en: "en", pt: "pt-PT", it: "it", de: "de-CH" };
export const LOCALE: Record<Lang, string> = { fr: "fr-CH", en: "en-GB", pt: "pt-PT", it: "it-CH", de: "de-CH" };

export const SLUGS: Record<Lang, Record<PageKey, string>> = {
  fr: { home: "", plats: "carte-plats", vins: "carte-vins", desserts: "carte-desserts" },
  en: { home: "", plats: "menu", vins: "wines-drinks", desserts: "desserts" },
  pt: { home: "", plats: "ementa", vins: "vinhos-bebidas", desserts: "sobremesas" },
  it: { home: "", plats: "menu", vins: "vini-bevande", desserts: "dolci" },
  de: { home: "", plats: "speisekarte", vins: "weine-getraenke", desserts: "desserts" },
};

export const isLang = (v: unknown): v is Lang => LANGS.includes(v as Lang);
export function pageFromSlug(lang: Lang, slug = ""): PageKey | null {
  const hit = (Object.keys(SLUGS[lang]) as PageKey[]).find((k) => SLUGS[lang][k] === slug.replace(/\/$/, ""));
  return hit ?? null;
}
export const pathFor = (lang: Lang, page: PageKey) => `/${lang}/${SLUGS[lang][page]}`;

const L = (fr: string, en: string, pt: string, it: string, de: string): Localized => ({ fr, en, pt, it, de });

export const UI = {
  skip: L("Aller au contenu", "Skip to content", "Saltar para o conteúdo", "Vai al contenuto", "Zum Inhalt"),
  proposal: "Proposta de design · não é o site oficial",
  home: L("Accueil", "Home", "Início", "Home", "Startseite"),
  navPlats: L("Carte", "Menu", "Ementa", "Menù", "Speisekarte"),
  navVins: L("Vins & boissons", "Wines & drinks", "Vinhos e bebidas", "Vini e bevande", "Weine & Getränke"),
  navDesserts: L("Desserts", "Desserts", "Sobremesas", "Dolci", "Desserts"),
  navHours: L("Horaires", "Opening hours", "Horário", "Orari", "Öffnungszeiten"),
  navContact: L("Contact", "Contact", "Contacto", "Contatti", "Kontakt"),
  call: L("Appeler", "Call", "Ligar", "Chiama", "Anrufen"),
  openMenu: L("Ouvrir le menu", "Open the menu", "Abrir o menu", "Apri il menu", "Menü öffnen"),
  closeMenu: L("Fermer le menu", "Close the menu", "Fechar o menu", "Chiudi il menu", "Menü schliessen"),
  language: L("Langue", "Language", "Idioma", "Lingua", "Sprache"),
  mainNav: L("Navigation principale", "Main navigation", "Navegação principal", "Navigazione principale", "Hauptnavigation"),

  tagline: L("Le meilleur de la cuisine portugaise à Genève", "The best of Portuguese cuisine in Geneva", "O melhor da cozinha portuguesa em Genebra", "Il meglio della cucina portoghese a Ginevra", "Das Beste der portugiesischen Küche in Genf"),
  terreEtMerButton: L("Nos spécialités portugaises: Terre et mer", "Our Portuguese specialities: Earth & Sea", "As nossas especialidades portuguesas: Terra e Mar", "Le nostre specialità portoghesi: Terra e Mar", "Unsere portugiesischen Spezialitäten: Terra e Mar"),
  since: L("Depuis 1988 au cœur des Pâquis, à Genève", "Since 1988 in the heart of the Pâquis, Geneva", "Desde 1988 no coração do Pâquis, em Genebra", "Dal 1988 nel cuore dei Pâquis, a Ginevra", "Seit 1988 im Herzen des Pâquis in Genf"),
  sinceShort: L("Depuis 1988", "Since 1988", "Desde 1988", "Dal 1988", "Seit 1988"),
  geneva: L("Genève", "Geneva", "Genebra", "Ginevra", "Genf"),
  terreEtMer: L("Terre et Mer", "Earth & Sea", "Terra e Mar", "Terra e Mar", "Terra e Mar"),
  winesLine: L("Variété de vins portugais, suisses, italiens, espagnols et français", "A variety of Portuguese, Swiss, Italian, Spanish and French wines", "Variedade de vinhos portugueses, suíços, italianos, espanhóis e franceses", "Varietà di vini portoghesi, svizzeri, italiani, spagnoli e francesi", "Auswahl an portugiesischen, Schweizer, italienischen, spanischen und französischen Weinen"),
  openEveryDay: L("Ouvert tous les jours", "Open every day", "Aberto todos os dias", "Aperto tutti i giorni", "Täglich geöffnet"),
  today: L("Aujourd’hui", "Today", "Hoje", "Oggi", "Heute"),
  perPerson: L("par personne, minimum 2 personnes", "per person, minimum 2 people", "por pessoa, mínimo 2 pessoas", "a persona, minimo 2 persone", "pro Person, mindestens 2 Personen"),
  slideshow: L("Diaporama", "Slideshow", "Apresentação", "Presentazione", "Diashow"),
  prevSlide: L("Diapositive précédente", "Previous slide", "Diapositivo anterior", "Diapositiva precedente", "Vorherige Folie"),
  nextSlide: L("Diapositive suivante", "Next slide", "Diapositivo seguinte", "Diapositiva successiva", "Nächste Folie"),
  goToSlide: L("Aller à la diapositive {n}", "Go to slide {n}", "Ir para o diapositivo {n}", "Vai alla diapositiva {n}", "Zu Folie {n}"),
  slideOf: L("Diapositive {n} sur {total}", "Slide {n} of {total}", "Diapositivo {n} de {total}", "Diapositiva {n} di {total}", "Folie {n} von {total}"),
  pause: L("Mettre en pause", "Pause", "Pausar", "Metti in pausa", "Pausieren"),
  play: L("Reprendre", "Play", "Retomar", "Riprendi", "Fortsetzen"),
  stripLabel: L("Bandeau Don Duarte", "Don Duarte strip", "Faixa Don Duarte", "Striscia Don Duarte", "Don-Duarte-Laufband"),

  specialities: L("Nos spécialités", "Our specialities", "As nossas especialidades", "Le nostre specialità", "Unsere Spezialitäten"),
  specialitiesHint: L("Huit raisons de passer à table, de la Francesinha aux desserts faits maison.", "Eight reasons to sit down, from the Francesinha to the homemade desserts.", "Oito razões para se sentar à mesa, da Francesinha às sobremesas caseiras.", "Otto motivi per sedersi a tavola, dalla Francesinha ai dolci fatti in casa.", "Acht Gründe, Platz zu nehmen, von der Francesinha bis zu den hausgemachten Desserts."),
  seeMenu: L("Voir la carte", "See the menu", "Ver a ementa", "Vedi il menù", "Zur Karte"),
  seeVins: L("Voir la carte des vins & boissons", "See the wine & drinks list", "Ver a carta de vinhos e bebidas", "Vedi la carta dei vini e bevande", "Zur Wein- & Getränkekarte"),
  seeDesserts: L("Voir la carte des desserts", "See the dessert menu", "Ver a ementa de sobremesas", "Vedi la carta dei dolci", "Zur Dessertkarte"),
  seePlats: L("Voir la carte des plats", "See the food menu", "Ver a ementa", "Vedi il menù", "Zur Speisekarte"),
  terreEtMerLead: L("Le plat de partage de la maison : viandes et poissons grillés, chou sauté et pommes de terre.", "The house sharing platter: grilled meats and fish, sautéed cabbage and potatoes.", "O prato da casa para partilhar: carnes e peixes grelhados, couve salteada e batata.", "Il piatto da condividere della casa: carni e pesci alla griglia, cavolo saltato e patate.", "Die Platte zum Teilen: Fleisch und Fisch vom Grill, gebratener Kohl und Kartoffeln."),
  wineMapTitle: L("Carte des régions viticoles du Portugal", "Map of Portugal’s wine regions", "Mapa das regiões vinícolas de Portugal", "Mappa delle regioni vinicole del Portogallo", "Karte der Weinregionen Portugals"),
  wineMapHint: L("Choisissez une région pour voir ses vins sur la carte.", "Choose a region to see its wines on the list.", "Escolha uma região para ver os seus vinhos na carta.", "Scegli una regione per vederne i vini nella carta.", "Wählen Sie eine Region, um ihre Weine auf der Karte zu sehen."),
  wineMapNote: L("Carte schématique", "Schematic map", "Mapa esquemático", "Mappa schematica", "Schematische Karte"),
  wineCount: L("{n} vins", "{n} wines", "{n} vinhos", "{n} vini", "{n} Weine"),
  wineCountOne: L("{n} vin", "{n} wine", "{n} vinho", "{n} vino", "{n} Wein"),
  dessertsTitle: L("Desserts faits maison", "Homemade desserts", "Sobremesas caseiras", "Dolci fatti in casa", "Hausgemachte Desserts"),
  dessertsSource: L("Photos de la carte des desserts", "Photos from the dessert menu", "Fotografias da ementa de sobremesas", "Foto dalla carta dei dolci", "Fotos aus der Dessertkarte"),
  prevPhoto: L("Photo précédente", "Previous photo", "Fotografia anterior", "Foto precedente", "Vorheriges Foto"),
  nextPhoto: L("Photo suivante", "Next photo", "Fotografia seguinte", "Foto successiva", "Nächstes Foto"),

  hours: L("Horaires", "Opening hours", "Horário", "Orari", "Öffnungszeiten"),
  monThu: L("Lundi – Jeudi", "Monday – Thursday", "Segunda – Quinta", "Lunedì – Giovedì", "Montag – Donnerstag"),
  friSat: L("Vendredi – Samedi", "Friday – Saturday", "Sexta – Sábado", "Venerdì – Sabato", "Freitag – Samstag"),
  sun: L("Dimanche", "Sunday", "Domingo", "Domenica", "Sonntag"),
  openNow: L("Ouvert maintenant", "Open now", "Aberto agora", "Aperto ora", "Jetzt geöffnet"),
  closedNow: L("Fermé", "Closed", "Fechado", "Chiuso", "Geschlossen"),
  until: L("jusqu’à {t}", "until {t}", "até às {t}", "fino alle {t}", "bis {t}"),
  opensAt: L("ouvre à {t}", "opens at {t}", "abre às {t}", "apre alle {t}", "öffnet um {t}"),
  genevaTime: L("Heure de Genève", "Geneva time", "Hora de Genebra", "Ora di Ginevra", "Genfer Zeit"),
  afterMidnight: L("Fermeture après minuit", "Closing after midnight", "Fecho depois da meia-noite", "Chiusura dopo mezzanotte", "Schliessung nach Mitternacht"),
  contact: L("Contact", "Contact", "Contacto", "Contatti", "Kontakt"),
  openMaps: L("Ouvrir sur Google Maps", "Open in Google Maps", "Abrir no Google Maps", "Apri in Google Maps", "In Google Maps öffnen"),
  showMap: L("Afficher la carte", "Show the map", "Mostrar o mapa", "Mostra la mappa", "Karte anzeigen"),
  mapPrivacy: L("La carte Google se charge seulement après votre clic.", "The Google map loads only after you click.", "O mapa Google só carrega depois do seu clique.", "La mappa Google si carica solo dopo il tuo clic.", "Die Google-Karte lädt erst nach Ihrem Klick."),
  copy: L("Copier", "Copy", "Copiar", "Copia", "Kopieren"),
  copied: L("Copié", "Copied", "Copiado", "Copiato", "Kopiert"),
  follow: L("Suivez-nous", "Follow us", "Siga-nos", "Seguici", "Folgen Sie uns"),
  phone: L("Téléphone", "Phone", "Telefone", "Telefono", "Telefon"),
  email: L("E-mail", "Email", "E-mail", "E-mail", "E-Mail"),
  address: L("Adresse", "Address", "Morada", "Indirizzo", "Adresse"),
  roomPhoto: L("La salle et la terrasse", "The dining room and terrace", "A sala e a esplanada", "La sala e la terrazza", "Der Saal und die Terrasse"),

  dlPlats: L("Télécharger la carte des plats", "Download the food menu", "Descarregar a ementa", "Scarica il menù", "Speisekarte herunterladen"),
  dlVins: L("Télécharger la carte des vins & boissons", "Download the wine & drinks list", "Descarregar a carta de vinhos e bebidas", "Scarica la carta dei vini e bevande", "Wein- & Getränkekarte herunterladen"),
  dlDesserts: L("Télécharger la carte des desserts", "Download the dessert menu", "Descarregar a ementa de sobremesas", "Scarica la carta dei dolci", "Dessertkarte herunterladen"),
  pdfNewTab: L("PDF, s’ouvre dans un nouvel onglet", "PDF, opens in a new tab", "PDF, abre num novo separador", "PDF, si apre in una nuova scheda", "PDF, öffnet in neuem Tab"),

  titlePlats: L("Carte des plats", "Food menu", "Ementa", "Menù", "Speisekarte"),
  titleVins: L("Carte des vins & boissons", "Wines & drinks", "Vinhos e bebidas", "Vini e bevande", "Weine & Getränke"),
  titleDesserts: L("Carte des desserts", "Desserts", "Sobremesas", "Dolci", "Desserts"),
  categories: L("Catégories", "Categories", "Categorias", "Categorie", "Kategorien"),
  search: L("Rechercher dans la carte", "Search the menu", "Pesquisar na ementa", "Cerca nel menù", "Karte durchsuchen"),
  searchPlaceholder: L("Rechercher…", "Search…", "Pesquisar…", "Cerca…", "Suchen…"),
  results: L("{n} résultats", "{n} results", "{n} resultados", "{n} risultati", "{n} Treffer"),
  resultsOne: L("{n} résultat", "{n} result", "{n} resultado", "{n} risultato", "{n} Treffer"),
  noResults: L("Aucun résultat pour « {q} ».", "No results for “{q}”.", "Sem resultados para «{q}».", "Nessun risultato per «{q}».", "Keine Treffer für «{q}»."),
  clear: L("Effacer", "Clear", "Limpar", "Cancella", "Löschen"),
  pdfOnly: L("PDF", "PDF", "PDF", "PDF", "PDF"),
  pdfOnlyTitle: L("Ligne présente seulement dans la carte PDF", "Only in the PDF menu", "Só na ementa em PDF", "Solo nel menù PDF", "Nur in der PDF-Karte"),
  frenchName: L("", "In French:", "Em francês:", "In francese:", "Auf Französisch:"),
  pricesNote: L("Prix en francs suisses (CHF)", "Prices in Swiss francs (CHF)", "Preços em francos suíços (CHF)", "Prezzi in franchi svizzeri (CHF)", "Preise in Schweizer Franken (CHF)"),
  winesInList: L("Prix sur la carte des vins", "Prices on the wine list", "Preços na carta de vinhos", "Prezzi nella carta dei vini", "Preise auf der Weinkarte"),
  otherMenus: L("Les autres cartes", "The other menus", "As outras cartas", "Gli altri menù", "Die anderen Karten"),
  photoSlot: L("Photo : {x}", "Photo: {x}", "Fotografia: {x}", "Foto: {x}", "Foto: {x}"),
  copyright: "Copyrights Don Duarte / Tous droits réservés - Created by Axel Ducraux & Claudia Duarte",
  reviewsTitle: L("Ce que disent nos clients", "What our customers say", "O que dizem os nossos clientes", "Cosa dicono i nostri clienti", "Was unsere Gäste sagen"),
  googleReview: L("Avis Google", "Google review", "Avaliação Google", "Recensione Google", "Google-Bewertung"),
  fiveStars: L("5 étoiles sur 5", "5 out of 5 stars", "5 de 5 estrelas", "5 stelle su 5", "5 von 5 Sternen"),
  welcomeSkip: L("Cliquez ou appuyez sur Échap pour passer", "Click or press Esc to skip", "Clique ou prima Esc para saltar", "Clicca o premi Esc per saltare", "Klicken oder Esc drücken zum Überspringen"),
};

export const SPECIALITIES: { id: string; title: Localized; photo: string; page: PageKey; group?: string; icon: string }[] = [
  { id: "specialites", title: L("Spécialités portugaises", "Portuguese specialities", "Especialidades portuguesas", "Specialità portoghesi", "Portugiesische Spezialitäten"), photo: "cat-specialites", page: "plats", group: "terra-e-mar", icon: "flame" },
  { id: "francesinha", title: L("Francesinha", "Francesinha", "Francesinha", "Francesinha", "Francesinha"), photo: "cat-francesinha", page: "plats", group: "terra-e-mar", icon: "stack" },
  { id: "pizzas", title: L("Pizzas", "Pizzas", "Pizas", "Pizze", "Pizzas"), photo: "cat-pizzas", page: "plats", group: "pizzas", icon: "pizza" },
  { id: "pates", title: L("Pâtes", "Pasta", "Massas", "Pasta", "Teigwaren"), photo: "cat-pates", page: "plats", group: "pates", icon: "fork" },
  { id: "poissons", title: L("Plats à base de poissons et crustacés", "Fish and seafood dishes", "Pratos de peixe e marisco", "Piatti di pesce e crostacei", "Fisch- und Krustentiergerichte"), photo: "cat-poissons", page: "plats", group: "poissons", icon: "fish" },
  { id: "viandes", title: L("Plats à base de viande", "Meat dishes", "Pratos de carne", "Piatti di carne", "Fleischgerichte"), photo: "cat-viandes", page: "plats", group: "viandes", icon: "grill" },
  { id: "vins", title: UI.winesLine, photo: "cat-vins", page: "vins", icon: "wine" },
  { id: "desserts", title: L("Desserts faits maison", "Homemade desserts", "Sobremesas caseiras", "Dolci fatti in casa", "Hausgemachte Desserts"), photo: "cat-desserts", page: "desserts", icon: "icecream" },
];

export const WELCOME: Record<Lang, { word: string; line: string }> = {
  fr: { word: "Bienvenue", line: "chez Don Duarte" },
  en: { word: "Welcome", line: "to Don Duarte" },
  pt: { word: "Bem-vindos", line: "ao Don Duarte" },
  it: { word: "Benvenuti", line: "da Don Duarte" },
  de: { word: "Willkommen", line: "bei Don Duarte" },
};

export const SEO: Record<PageKey, { title: Localized; description: Localized }> = {
  home: {
    title: L("Don Duarte - Genève | Restaurant Don Duarte", "Don Duarte – Geneva | Portuguese restaurant in the Pâquis", "Don Duarte – Genebra | Restaurante português no Pâquis", "Don Duarte – Ginevra | Ristorante portoghese ai Pâquis", "Don Duarte – Genf | Portugiesisches Restaurant im Pâquis"),
    description: L(
      "Restaurant Don Duarte, spécialités portugaises depuis 1988 au cœur des Pâquis à Genève. Le meilleur du Portugal près de chez vous.",
      "Restaurant Don Duarte: Portuguese specialities since 1988 in the heart of the Pâquis, Geneva. The best of Portugal close to home.",
      "Restaurant Don Duarte: especialidades portuguesas desde 1988 no coração do Pâquis, em Genebra. O melhor de Portugal perto de si.",
      "Restaurant Don Duarte: specialità portoghesi dal 1988 nel cuore dei Pâquis a Ginevra. Il meglio del Portogallo vicino a te.",
      "Restaurant Don Duarte: portugiesische Spezialitäten seit 1988 im Herzen des Pâquis in Genf. Das Beste aus Portugal ganz in Ihrer Nähe.",
    ),
  },
  plats: {
    title: L("Carte des plats | Restaurant Don Duarte", "Food menu | Restaurant Don Duarte", "Ementa | Restaurant Don Duarte", "Menù | Restaurant Don Duarte", "Speisekarte | Restaurant Don Duarte"),
    description: L(
      "Consultez la carte de nos plats et desserts. Restaurant de spécialités portugaises Don Duarte à Genève",
      "See our food and dessert menu. Don Duarte, a Portuguese specialities restaurant in Geneva.",
      "Consulte a ementa dos nossos pratos e sobremesas. Restaurante de especialidades portuguesas Don Duarte em Genebra.",
      "Consultate il menù dei nostri piatti e dolci. Ristorante di specialità portoghesi Don Duarte a Ginevra.",
      "Unsere Speise- und Dessertkarte. Don Duarte, Restaurant mit portugiesischen Spezialitäten in Genf.",
    ),
  },
  vins: {
    title: L("Carte des vins & boissons | Restaurant Don Duarte", "Wines & drinks | Restaurant Don Duarte", "Vinhos e bebidas | Restaurant Don Duarte", "Vini e bevande | Restaurant Don Duarte", "Weine & Getränke | Restaurant Don Duarte"),
    description: L(
      "Consultez la carte de nos vins suisses, portugais, français et italiens. Restaurant Don Duarte, spécialités portugaises à Genève.",
      "Our list of Swiss, Portuguese, French and Italian wines. Restaurant Don Duarte, Portuguese specialities in Geneva.",
      "Consulte a nossa carta de vinhos suíços, portugueses, franceses e italianos. Restaurant Don Duarte, especialidades portuguesas em Genebra.",
      "La nostra carta di vini svizzeri, portoghesi, francesi e italiani. Restaurant Don Duarte, specialità portoghesi a Ginevra.",
      "Unsere Karte mit Schweizer, portugiesischen, französischen und italienischen Weinen. Restaurant Don Duarte, portugiesische Spezialitäten in Genf.",
    ),
  },
  desserts: {
    title: L("Carte des desserts | Restaurant Don Duarte", "Desserts | Restaurant Don Duarte", "Sobremesas | Restaurant Don Duarte", "Dolci | Restaurant Don Duarte", "Desserts | Restaurant Don Duarte"),
    description: L(
      "Desserts faits maison, coupes glacées et glaces du Restaurant Don Duarte, spécialités portugaises à Genève.",
      "Homemade desserts, sundaes and ice creams at Restaurant Don Duarte, Portuguese specialities in Geneva.",
      "Sobremesas caseiras, taças de gelado e gelados do Restaurant Don Duarte, especialidades portuguesas em Genebra.",
      "Dolci fatti in casa, coppe gelato e gelati del Restaurant Don Duarte, specialità portoghesi a Ginevra.",
      "Hausgemachte Desserts, Glacecoupes und Glace im Restaurant Don Duarte, portugiesische Spezialitäten in Genf.",
    ),
  },
};

export const fill = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
