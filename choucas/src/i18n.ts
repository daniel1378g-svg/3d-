// Languages, routes and the interface strings. German (Swiss spelling, "ss", never "ß") is the source.
// Every French, Italian, English and Portuguese text here is new and needs a native-speaker check.
export type Lang = "de" | "fr" | "it" | "en" | "pt";
export type PageKey = "home" | "pizzeria" | "steakhouse" | "choucalino" | "menu" | "anreise" | "impressum";
export type Localized = Record<Lang, string>;

export const LANGS: Lang[] = ["de", "fr", "it", "en", "pt"];
export const NATIVE: Record<Lang, string> = { de: "Deutsch", fr: "Français", it: "Italiano", en: "English", pt: "Português" };
export const HTML_LANG: Record<Lang, string> = { de: "de-CH", fr: "fr-CH", it: "it-CH", en: "en", pt: "pt-PT" };
export const PAGES: PageKey[] = ["home", "pizzeria", "steakhouse", "choucalino", "menu", "anreise", "impressum"];
export const SLUGS: Record<Lang, Record<PageKey, string>> = {
  de: { home: "", pizzeria: "pizzeria", steakhouse: "steakhouse", choucalino: "choucalino", menu: "speisekarte", anreise: "anreise", impressum: "impressum" },
  fr: { home: "", pizzeria: "pizzeria", steakhouse: "steakhouse", choucalino: "choucalino", menu: "carte", anreise: "acces", impressum: "mentions-legales" },
  it: { home: "", pizzeria: "pizzeria", steakhouse: "steakhouse", choucalino: "choucalino", menu: "menu", anreise: "come-arrivare", impressum: "note-legali" },
  en: { home: "", pizzeria: "pizzeria", steakhouse: "steakhouse", choucalino: "choucalino", menu: "menu", anreise: "getting-here", impressum: "imprint" },
  pt: { home: "", pizzeria: "pizzaria", steakhouse: "steakhouse", choucalino: "choucalino", menu: "ementa", anreise: "como-chegar", impressum: "ficha-tecnica" },
};

export const isLang = (v: unknown): v is Lang => LANGS.includes(v as Lang);
export function pageFromSlug(lang: Lang, slug = ""): PageKey | null {
  const hit = PAGES.find((k) => SLUGS[lang][k] === slug.replace(/\/$/, ""));
  return hit ?? null;
}
export const pathFor = (lang: Lang, page: PageKey) => `/${lang}/${SLUGS[lang][page]}`;
export const fill = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));

/** One string per language, in the order of the language menu: de, fr, it, en, pt. */
export const L = (de: string, fr: string, it: string, en: string, pt: string): Localized => ({ de, fr, it, en, pt });
/** The same text in every language (names, prices, addresses). */
export const same = (s: string): Localized => L(s, s, s, s, s);

export const WELCOME: Record<Lang, { word: string; line: string }> = {
  de: { word: "Willkommen", line: "in der Choucas Connection" },
  fr: { word: "Bienvenue", line: "à la Choucas Connection" },
  it: { word: "Benvenuti", line: "alla Choucas Connection" },
  en: { word: "Welcome", line: "to the Choucas Connection" },
  pt: { word: "Bem-vindos", line: "à Choucas Connection" },
};

export const UI = {
  proposal: "Proposta de design · não é o site oficial",
  skip: L("Zum Inhalt", "Aller au contenu", "Vai al contenuto", "Skip to content", "Saltar para o conteúdo"),
  home: L("Startseite", "Accueil", "Home", "Home", "Início"),
  mainNav: L("Hauptnavigation", "Navigation principale", "Navigazione principale", "Main navigation", "Navegação principal"),
  menuButton: L("Menü", "Menu", "Menu", "Menu", "Menu"),
  closeMenu: L("Menü schliessen", "Fermer le menu", "Chiudi il menu", "Close the menu", "Fechar o menu"),
  languagePill: "Sprache · Langue · Lingua · Language · Idioma",
  language: L("Sprache", "Langue", "Lingua", "Language", "Idioma"),
  newTab: L("öffnet in neuem Tab", "s’ouvre dans un nouvel onglet", "si apre in una nuova scheda", "opens in a new tab", "abre num novo separador"),
  welcomeSkip: L("Klicken oder Esc drücken zum Überspringen", "Cliquez ou appuyez sur Échap pour passer", "Clicca o premi Esc per saltare", "Click or press Esc to skip", "Clique ou prima Esc para saltar"),
  close: L("Schliessen", "Fermer", "Chiudi", "Close", "Fechar"),
  more: L("Mehr erfahren", "En savoir plus", "Scopri di più", "Find out more", "Saber mais"),

  // pages and actions
  nav: {
    pizzeria: same("Pizzeria Choucas"),
    steakhouse: same("Oasis Steakhouse"),
    choucalino: same("Choucalino®"),
    menu: L("Speisekarte", "Carte", "Menu", "Menu", "Ementa"),
    anreise: L("Anreise", "Accès", "Come arrivare", "Getting here", "Como chegar"),
    bilder: L("Bilder", "Photos", "Foto", "Photos", "Fotografias"),
    impressum: L("Impressum", "Mentions légales", "Note legali", "Imprint", "Ficha técnica"),
  },
  book: L("Reservieren", "Réserver", "Prenota", "Book a table", "Reservar"),
  call: L("Anrufen", "Appeler", "Chiama", "Call", "Ligar"),
  takeaway: same("Take-Away"),
  writeUs: L("E-Mail schreiben", "Écrire un e-mail", "Scrivere un’e-mail", "Send an email", "Enviar um email"),

  // hero
  heroEyebrow: L("Leukerbad · Wallis", "Loèche-les-Bains · Valais", "Leukerbad · Vallese", "Leukerbad · Valais", "Leukerbad · Valais"),
  heroLead: L(
    "Pizzeria Choucas, Oasis Steakhouse und Choucalino® Kid’s Club: drei Orte unter einem Dach.",
    "Pizzeria Choucas, Oasis Steakhouse et Choucalino® Kid’s Club : trois lieux sous un même toit.",
    "Pizzeria Choucas, Oasis Steakhouse e Choucalino® Kid’s Club: tre locali sotto lo stesso tetto.",
    "Pizzeria Choucas, Oasis Steakhouse and Choucalino® Kid’s Club: three places under one roof.",
    "Pizzeria Choucas, Oasis Steakhouse e Choucalino® Kid’s Club: três espaços debaixo do mesmo teto.",
  ),
  pizzaSide: L("Pizza aus dem Ofen", "Pizza du four", "Pizza dal forno", "Pizza from the oven", "Pizza do forno"),
  grillSide: L("Argentinischer Grill", "Grill argentin", "Griglia argentina", "Argentine grill", "Grelha argentina"),
  dividerLabel: L("Aufteilung zwischen Pizzeria und Steakhouse", "Partage entre la pizzeria et le steakhouse", "Divisione tra pizzeria e steakhouse", "Split between the pizzeria and the steakhouse", "Divisão entre a pizzaria e o steakhouse"),
  dividerValue: L("{a} % Pizzeria, {b} % Steakhouse", "{a} % pizzeria, {b} % steakhouse", "{a}% pizzeria, {b}% steakhouse", "{a}% pizzeria, {b}% steakhouse", "{a}% pizzaria, {b}% steakhouse"),
  dragHint: L("Logo ziehen", "Glissez le logo", "Trascina il logo", "Drag the logo", "Arraste o logótipo"),
  pause: L("Pausieren", "Mettre en pause", "Metti in pausa", "Pause", "Pausar"),
  play: L("Fortsetzen", "Reprendre", "Riprendi", "Play", "Retomar"),

  // strip
  marquee: L("Laufband", "Bandeau défilant", "Striscia scorrevole", "Scrolling strip", "Faixa em movimento"),
  stripLeukerbad: L("Leukerbad", "Loèche-les-Bains", "Leukerbad", "Leukerbad", "Leukerbad"),

  // places and hours
  placesTitle: L("Drei Orte unter einem Dach", "Trois lieux sous un même toit", "Tre locali sotto lo stesso tetto", "Three places under one roof", "Três espaços debaixo do mesmo teto"),
  placesEyebrow: same("The Choucas Connection"),
  kitchenUntil: L("warme Küche bis {t}", "cuisine chaude jusqu’à {t}", "cucina calda fino alle {t}", "hot food until {t}", "cozinha quente até às {t}"),
  openUntil: L("offen bis {t}", "ouvert jusqu’à {t}", "aperto fino alle {t}", "open until {t}", "aberto até às {t}"),
  opensAt: L("öffnet um {t}", "ouvre à {t}", "apre alle {t}", "opens at {t}", "abre às {t}"),
  openNow: L("Offen", "Ouvert", "Aperto", "Open", "Aberto"),
  closedNow: L("Geschlossen", "Fermé", "Chiuso", "Closed", "Fechado"),
  zurichTime: L("Schweizer Zeit", "heure suisse", "ora svizzera", "Swiss time", "hora suíça"),
  hours: L("Öffnungszeiten", "Horaires", "Orari", "Opening hours", "Horário"),

  // menu
  filterLabel: L("Speisekarte filtern", "Filtrer la carte", "Filtra il menu", "Filter the menu", "Filtrar a ementa"),
  all: L("Alle", "Tout", "Tutto", "All", "Tudo"),
  pizzaFilter: same("Pizza"),
  grillFilter: same("Grill"),
  sections: L("Rubriken", "Rubriques", "Sezioni", "Sections", "Secções"),
  search: L("Gericht suchen", "Rechercher un plat", "Cerca un piatto", "Search the menu", "Pesquisar na ementa"),
  searchPlaceholder: L("Suchen, z. B. Risotto", "Rechercher, p. ex. risotto", "Cerca, per es. risotto", "Search, e.g. risotto", "Pesquisar, p. ex. risotto"),
  results: L("{n} Gerichte", "{n} plats", "{n} piatti", "{n} dishes", "{n} pratos"),
  resultsOne: L("{n} Gericht", "{n} plat", "{n} piatto", "{n} dish", "{n} prato"),
  noResults: L("Keine Gerichte für «{q}».", "Aucun plat pour « {q} ».", "Nessun piatto per «{q}».", "No dishes for “{q}”.", "Nenhum prato para «{q}»."),
  clear: L("Löschen", "Effacer", "Cancella", "Clear", "Limpar"),
  fullMenuPdf: L("Ganze Speisekarte (PDF)", "Carte complète (PDF)", "Menu completo (PDF)", "Full menu (PDF)", "Ementa completa (PDF)"),
  yoordi: L("Digitale Speisekarte (Yoordi)", "Carte numérique (Yoordi)", "Menu digitale (Yoordi)", "Digital menu (Yoordi)", "Ementa digital (Yoordi)"),
  newBadge: L("neu", "nouveau", "novità", "new", "novo"),
  tipBadge: L("Tipp", "Conseil", "Consiglio", "Tip", "Sugestão"),
  hot: L("scharf", "épicé", "piccante", "spicy", "picante"),
  venuePizzeria: same("Pizzeria"),
  venueOasis: same("Oasis"),
  venueBoth: L("Pizzeria & Oasis", "Pizzeria & Oasis", "Pizzeria & Oasis", "Pizzeria & Oasis", "Pizzaria & Oasis"),
  pricesChf: L("Preise in Schweizer Franken", "Prix en francs suisses", "Prezzi in franchi svizzeri", "Prices in Swiss francs", "Preços em francos suíços"),
  translatedNote: L(
    "",
    "Les descriptions en français sont celles de la carte imprimée.",
    "Descrizioni tradotte dalla carta in tedesco e francese.",
    "Descriptions translated from the German and French menu.",
    "Descrições traduzidas da ementa em alemão e francês.",
  ),
  pizzeriaPart: L("Aus der Pizzeria", "De la pizzeria", "Dalla pizzeria", "From the pizzeria", "Da pizzaria"),
  grillPart: L("Vom Grill", "Du grill", "Dalla griglia", "From the grill", "Da grelha"),
  wholeMenu: L("Zur ganzen Speisekarte", "Voir toute la carte", "Tutto il menu", "See the whole menu", "Ver a ementa completa"),

  // gallery
  galleryTitle: L("Bilder", "Photos", "Foto", "Photos", "Fotografias"),
  galleryLead: L(
    "Neun Galerien aus der Choucas Connection. Wischen, ziehen oder mit den Pfeiltasten blättern; Enter öffnet ein Bild.",
    "Neuf galeries de la Choucas Connection. Balayez, glissez ou utilisez les flèches ; Entrée ouvre une photo.",
    "Nove gallerie della Choucas Connection. Scorri, trascina o usa le frecce; Invio apre una foto.",
    "Nine galleries from the Choucas Connection. Swipe, drag or use the arrow keys; Enter opens a photo.",
    "Nove galerias da Choucas Connection. Deslize, arraste ou use as setas; Enter abre uma fotografia.",
  ),
  photoOf: L("Foto {n} von {total}", "Photo {n} sur {total}", "Foto {n} di {total}", "Photo {n} of {total}", "Fotografia {n} de {total}"),
  prevPhoto: L("Vorheriges Foto", "Photo précédente", "Foto precedente", "Previous photo", "Fotografia anterior"),
  nextPhoto: L("Nächstes Foto", "Photo suivante", "Foto successiva", "Next photo", "Fotografia seguinte"),
  photos: L("{n} Fotos", "{n} photos", "{n} foto", "{n} photos", "{n} fotografias"),
  galleryCategories: L("Galerien", "Galeries", "Gallerie", "Galleries", "Galerias"),
  showGrid: L("Als Raster zeigen", "Afficher en grille", "Mostra a griglia", "Show as grid", "Mostrar em grelha"),
  showCarousel: L("Als Karussell zeigen", "Afficher en carrousel", "Mostra a carosello", "Show as carousel", "Mostrar em carrossel"),

  // booking
  drawerTitle: L("Online Reservation", "Réservation en ligne", "Prenotazione online", "Online reservation", "Reserva online"),
  drawerNote: L(
    "Das Reservationssystem (resmio) lädt erst, wenn dieses Feld geöffnet wird.",
    "Le système de réservation (resmio) se charge seulement à l’ouverture de ce panneau.",
    "Il sistema di prenotazione (resmio) si carica solo all’apertura di questo pannello.",
    "The booking system (resmio) loads only when this panel opens.",
    "O sistema de reservas (resmio) só carrega quando este painel abre.",
  ),
  drawerFallback: L("Reservation in neuem Tab öffnen", "Ouvrir la réservation dans un nouvel onglet", "Apri la prenotazione in una nuova scheda", "Open the booking page in a new tab", "Abrir as reservas num novo separador"),
  previewNoEmbed: L(
    "In dieser Vorschau öffnet sich das Reservationssystem in einem neuen Tab; auf der Website erscheint es hier.",
    "Dans cet aperçu, le système de réservation s’ouvre dans un nouvel onglet ; sur le site, il s’affiche ici.",
    "In questa anteprima il sistema di prenotazione si apre in una nuova scheda; sul sito compare qui.",
    "In this preview the booking system opens in a new tab; on the website it shows here.",
    "Nesta pré-visualização, o sistema de reservas abre num novo separador; no site, aparece aqui.",
  ),
  bookTitle: L("Reservieren und bestellen", "Réserver et commander", "Prenotare e ordinare", "Book and order", "Reservar e encomendar"),

  // contact
  contactTitle: L("Kontakt und Öffnungszeiten", "Contact et horaires", "Contatti e orari", "Contact and opening hours", "Contacto e horário"),
  address: L("Adresse", "Adresse", "Indirizzo", "Address", "Morada"),
  phone: L("Telefon", "Téléphone", "Telefono", "Phone", "Telefone"),
  email: L("E-Mail", "E-mail", "E-mail", "Email", "Email"),
  reservations: L("Reservationen", "Réservations", "Prenotazioni", "Reservations", "Reservas"),
  showMap: L("Karte anzeigen", "Afficher la carte", "Mostra la mappa", "Show the map", "Mostrar o mapa"),
  openMaps: L("In Google Maps öffnen", "Ouvrir dans Google Maps", "Apri in Google Maps", "Open in Google Maps", "Abrir no Google Maps"),
  mapPrivacy: L("Die Google-Karte lädt erst nach Ihrem Klick.", "La carte Google se charge seulement après votre clic.", "La mappa Google si carica solo dopo il vostro clic.", "The Google map loads only after you click.", "O mapa Google só carrega depois do seu clique."),
  mapTitle: L("Karte: The Choucas Connection, Dorfstrasse 9, Leukerbad", "Carte : The Choucas Connection, Dorfstrasse 9, Loèche-les-Bains", "Mappa: The Choucas Connection, Dorfstrasse 9, Leukerbad", "Map: The Choucas Connection, Dorfstrasse 9, Leukerbad", "Mapa: The Choucas Connection, Dorfstrasse 9, Leukerbad"),
  mapPreviewNote: L(
    "In dieser Vorschau öffnet sich die Karte in einem neuen Tab.",
    "Dans cet aperçu, la carte s’ouvre dans un nouvel onglet.",
    "In questa anteprima la mappa si apre in una nuova scheda.",
    "In this preview the map opens in a new tab.",
    "Nesta pré-visualização, o mapa abre num novo separador.",
  ),
  country: L("Schweiz", "Suisse", "Svizzera", "Switzerland", "Suíça"),
  formTitle: L("Schreiben Sie uns", "Écrivez-nous", "Scriveteci", "Write to us", "Escreva-nos"),
  formName: L("Name", "Nom", "Nome", "Name", "Nome"),
  formEmail: L("E-Mail", "E-mail", "E-mail", "Email", "Email"),
  formPhone: L("Telefon", "Téléphone", "Telefono", "Phone", "Telefone"),
  formMessage: L("Ihre Nachricht", "Votre message", "Il vostro messaggio", "Your message", "A sua mensagem"),
  optional: L("freiwillig", "facultatif", "facoltativo", "optional", "opcional"),
  send: L("Senden", "Envoyer", "Invia", "Send", "Enviar"),
  nameError: L("Geben Sie Ihren Namen ein.", "Indiquez votre nom.", "Inserite il vostro nome.", "Enter your name.", "Indique o seu nome."),
  emailError: L("Geben Sie eine gültige E-Mail-Adresse ein, zum Beispiel name@beispiel.ch.", "Indiquez une adresse e-mail valide, par exemple nom@exemple.ch.", "Inserite un indirizzo e-mail valido, per esempio nome@esempio.ch.", "Enter a valid email address, for example name@example.ch.", "Indique um email válido, por exemplo nome@exemplo.ch."),
  messageError: L("Schreiben Sie Ihre Nachricht.", "Écrivez votre message.", "Scrivete il vostro messaggio.", "Write your message.", "Escreva a sua mensagem."),
  testMode: L(
    "Vorschau: Das Formular ist im Testmodus und sendet nichts, bis das Restaurant seine Empfangsadresse angibt.",
    "Aperçu : le formulaire est en mode test et n’envoie rien tant que le restaurant n’a pas donné son adresse de réception.",
    "Anteprima: il modulo è in modalità di prova e non invia nulla finché il ristorante non indica l’indirizzo di ricezione.",
    "Preview: the form is in test mode and sends nothing until the restaurant gives its receiving address.",
    "Pré-visualização: o formulário está em modo de teste e não envia nada até o restaurante indicar o endereço de receção.",
  ),
  testSent: L(
    "Nachricht geprüft, aber nicht gesendet: Das Formular ist noch im Testmodus. Rufen Sie uns an: +41 27 470 24 13.",
    "Message vérifié, mais pas envoyé : le formulaire est encore en mode test. Appelez-nous au +41 27 470 24 13.",
    "Messaggio verificato ma non inviato: il modulo è ancora in modalità di prova. Chiamateci al +41 27 470 24 13.",
    "Message checked but not sent: the form is still in test mode. Call us on +41 27 470 24 13.",
    "Mensagem verificada, mas não enviada: o formulário ainda está em modo de teste. Ligue-nos para +41 27 470 24 13.",
  ),
  sent: L("Danke, Ihre Nachricht wurde gesendet.", "Merci, votre message est envoyé.", "Grazie, il vostro messaggio è stato inviato.", "Thank you, your message has been sent.", "Obrigado, a sua mensagem foi enviada."),
  sendError: L(
    "Das Senden ist fehlgeschlagen. Versuchen Sie es erneut oder rufen Sie +41 27 470 24 13 an.",
    "L’envoi n’a pas abouti. Réessayez ou appelez le +41 27 470 24 13.",
    "L’invio non è riuscito. Riprovate o chiamate il +41 27 470 24 13.",
    "Sending failed. Try again or call +41 27 470 24 13.",
    "O envio falhou. Tente novamente ou ligue para +41 27 470 24 13.",
  ),
  hoursConflict: L(
    "Die Öffnungszeiten folgen der Startseite der heutigen Website und werden noch mit dem Restaurant bestätigt.",
    "Les horaires suivent la page d’accueil du site actuel et doivent encore être confirmés par le restaurant.",
    "Gli orari seguono la home page del sito attuale e devono ancora essere confermati dal ristorante.",
    "The opening hours follow the home page of the current website and are still to be confirmed by the restaurant.",
    "O horário segue a página inicial do site atual e ainda tem de ser confirmado pelo restaurante.",
  ),

  // footer
  follow: L("Folgen Sie uns", "Suivez-nous", "Seguiteci", "Follow us", "Siga-nos"),
  morePages: L("Mehr auf choucas.ch", "Plus sur choucas.ch", "Altro su choucas.ch", "More on choucas.ch", "Mais em choucas.ch"),
  livePageNote: L("Seiten der heutigen Website, auf Deutsch", "Pages du site actuel, en allemand", "Pagine del sito attuale, in tedesco", "Pages of the current website, in German", "Páginas do site atual, em alemão"),
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
      "The Choucas Connection · Pizzaria, steakhouse e Kid’s Club em Leukerbad",
    ),
    description: L(
      "Pizzeria Choucas, Oasis Steakhouse mit argentinischem Grill und der Choucalino® Kid’s Club mit dem grössten Indoor-Spielplatz der Region, an der Dorfstrasse 9 in Leukerbad.",
      "La Pizzeria Choucas, l’Oasis Steakhouse et son grill argentin, et le Choucalino® Kid’s Club avec la plus grande aire de jeux couverte de la région, Dorfstrasse 9 à Loèche-les-Bains.",
      "La Pizzeria Choucas, l’Oasis Steakhouse con la griglia argentina e il Choucalino® Kid’s Club con il più grande parco giochi coperto della regione, in Dorfstrasse 9 a Leukerbad.",
      "Pizzeria Choucas, the Oasis Steakhouse with its Argentine grill and the Choucalino® Kid’s Club with the region’s biggest indoor playground, at Dorfstrasse 9 in Leukerbad.",
      "A Pizzaria Choucas, o Oasis Steakhouse com a sua grelha argentina e o Choucalino® Kid’s Club com o maior parque infantil coberto da região, na Dorfstrasse 9, em Leukerbad.",
    ),
  },
  pizzeria: {
    title: L("Pizzeria Choucas · Leukerbad", "Pizzeria Choucas · Loèche-les-Bains", "Pizzeria Choucas · Leukerbad", "Pizzeria Choucas · Leukerbad", "Pizzaria Choucas · Leukerbad"),
    description: L(
      "Die familienfreundliche Pizzeria mit dem Vogel: Pizza- und Pastakreationen im mediterranen Ambiente, die neue Pizza Geissupür und «Kinder backen Pizza».",
      "La pizzeria familiale à l’oiseau : pizzas et pâtes dans une ambiance méditerranéenne, la nouvelle Pizza Geissupür et « Les enfants font la pizza ».",
      "La pizzeria per famiglie con l’uccello: pizze e paste in un ambiente mediterraneo, la nuova Pizza Geissupür e «I bambini fanno la pizza».",
      "The family-friendly pizzeria with the bird: pizza and pasta in a Mediterranean setting, the new Pizza Geissupür and “Kids bake pizza”.",
      "A pizzaria familiar do pássaro: pizzas e massas num ambiente mediterrânico, a nova Pizza Geissupür e «As crianças fazem pizza».",
    ),
  },
  steakhouse: {
    title: L("Oasis Steakhouse · Argentinischer Grill in Leukerbad", "Oasis Steakhouse · Grill argentin à Loèche-les-Bains", "Oasis Steakhouse · Griglia argentina a Leukerbad", "Oasis Steakhouse · Argentine grill in Leukerbad", "Oasis Steakhouse · Grelha argentina em Leukerbad"),
    description: L(
      "Argentinische Grill-Spezialitäten im 2007 umgebauten Kino Rex: das Original Gaucho Steak, Chef Parillada Argentina und Mexican BBQ Ribs.",
      "Spécialités du grill argentin dans l’ancien Kino Rex transformé en 2007 : l’original Gaucho Steak, la Chef Parillada Argentina et les Mexican BBQ Ribs.",
      "Specialità della griglia argentina nell’ex Kino Rex ristrutturato nel 2007: l’originale Gaucho Steak, la Chef Parillada Argentina e le Mexican BBQ Ribs.",
      "Argentine grill specialities in the former Kino Rex, rebuilt in 2007: the original Gaucho Steak, Chef Parillada Argentina and Mexican BBQ Ribs.",
      "Especialidades da grelha argentina no antigo Kino Rex, remodelado em 2007: o original Gaucho Steak, a Chef Parillada Argentina e as Mexican BBQ Ribs.",
    ),
  },
  choucalino: {
    title: L("Choucalino® Kid’s Club · Indoor-Spielplatz in Leukerbad", "Choucalino® Kid’s Club · Aire de jeux couverte à Loèche-les-Bains", "Choucalino® Kid’s Club · Parco giochi coperto a Leukerbad", "Choucalino® Kid’s Club · Indoor playground in Leukerbad", "Choucalino® Kid’s Club · Parque infantil coberto em Leukerbad"),
    description: L(
      "Der Choucalino® Kid’s Club seit 2007: Indoor-Spielplatz, Kinder-Grill zum «Cervelat grillieru» und Gütesiegel «Familien Willkommen».",
      "Le Choucalino® Kid’s Club depuis 2007 : aire de jeux couverte, grill pour enfants (« Cervelat grillieru ») et label « Familien Willkommen ».",
      "Il Choucalino® Kid’s Club dal 2007: parco giochi coperto, griglia per bambini («Cervelat grillieru») e marchio «Familien Willkommen».",
      "The Choucalino® Kid’s Club since 2007: an indoor playground, a kids’ grill for “Cervelat grillieru” and the “Familien Willkommen” seal.",
      "O Choucalino® Kid’s Club desde 2007: parque infantil coberto, grelhador para crianças («Cervelat grillieru») e o selo «Familien Willkommen».",
    ),
  },
  menu: {
    title: L("Speisekarte · Pizzeria Choucas und Oasis Steakhouse", "Carte · Pizzeria Choucas et Oasis Steakhouse", "Menu · Pizzeria Choucas e Oasis Steakhouse", "Menu · Pizzeria Choucas and Oasis Steakhouse", "Ementa · Pizzaria Choucas e Oasis Steakhouse"),
    description: L(
      "Starters, Pizze classiche, Pasta, Risotto, Chef Parillada Argentina und Oasis Signature, mit allen Preisen in CHF.",
      "Starters, pizze classiche, pâtes, risotto, Chef Parillada Argentina et Oasis Signature, avec tous les prix en CHF.",
      "Starters, pizze classiche, pasta, risotto, Chef Parillada Argentina e Oasis Signature, con tutti i prezzi in CHF.",
      "Starters, classic pizzas, pasta, risotto, Chef Parillada Argentina and Oasis signature dishes, with every price in CHF.",
      "Entradas, pizzas clássicas, massas, risotto, Chef Parillada Argentina e Oasis Signature, com todos os preços em CHF.",
    ),
  },
  anreise: {
    title: L("Anreise und Kontakt · The Choucas Connection", "Accès et contact · The Choucas Connection", "Come arrivare e contatti · The Choucas Connection", "Getting here and contact · The Choucas Connection", "Como chegar e contacto · The Choucas Connection"),
    description: L(
      "Dorfstrasse 9, 3954 Leukerbad · Telefon +41 27 470 24 13 · info@choucas.ch · Online-Reservation und Öffnungszeiten.",
      "Dorfstrasse 9, 3954 Loèche-les-Bains · Téléphone +41 27 470 24 13 · info@choucas.ch · Réservation en ligne et horaires.",
      "Dorfstrasse 9, 3954 Leukerbad · Telefono +41 27 470 24 13 · info@choucas.ch · Prenotazione online e orari.",
      "Dorfstrasse 9, 3954 Leukerbad · Phone +41 27 470 24 13 · info@choucas.ch · Online booking and opening hours.",
      "Dorfstrasse 9, 3954 Leukerbad · Telefone +41 27 470 24 13 · info@choucas.ch · Reserva online e horário.",
    ),
  },
  impressum: {
    title: L("Impressum · The Choucas Connection", "Mentions légales · The Choucas Connection", "Note legali · The Choucas Connection", "Imprint · The Choucas Connection", "Ficha técnica · The Choucas Connection"),
    description: L(
      "Verantwortlich für Inhalt, Konzeption und Realisierung: The Choucas Connection, Dorfstrasse 9, 3954 Leukerbad.",
      "Responsable du contenu, de la conception et de la réalisation : The Choucas Connection, Dorfstrasse 9, 3954 Loèche-les-Bains.",
      "Responsabile di contenuti, ideazione e realizzazione: The Choucas Connection, Dorfstrasse 9, 3954 Leukerbad.",
      "Responsible for content, concept and production: The Choucas Connection, Dorfstrasse 9, 3954 Leukerbad.",
      "Responsável pelo conteúdo, conceção e realização: The Choucas Connection, Dorfstrasse 9, 3954 Leukerbad.",
    ),
  },
};
