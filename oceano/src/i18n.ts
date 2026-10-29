// Languages, page addresses and the interface words. Facts (names, phones, addresses, times) never pass
// through here; they live in src/content and stay identical in every language.
export const LANGS = ["de", "en", "pt", "fr", "it"] as const;
export type Lang = (typeof LANGS)[number];
export type L = Record<Lang, string>;
export const isLang = (v: unknown): v is Lang => typeof v === "string" && (LANGS as readonly string[]).includes(v);

export const HTML_LANG: Record<Lang, string> = { de: "de-CH", en: "en", pt: "pt-PT", fr: "fr-CH", it: "it-CH" };
export const LOCALE: Record<Lang, string> = { de: "de-CH", en: "en-GB", pt: "pt-PT", fr: "fr-CH", it: "it-CH" };
export const NATIVE: Record<Lang, string> = { de: "Deutsch", en: "English", pt: "Português", fr: "Français", it: "Italiano" };

export type PageKey = "home" | "kueche" | "laden" | "ueber" | "bewertungen" | "galerie" | "shop" | "kontakt" | "impressum";
export const PAGES: PageKey[] = ["home", "kueche", "laden", "ueber", "bewertungen", "galerie", "shop", "kontakt", "impressum"];
export const SLUGS: Record<Lang, Record<PageKey, string>> = {
  de: { home: "", kueche: "unsere-kueche", laden: "unser-laden", ueber: "ueber-uns", bewertungen: "kundenbewertungen", galerie: "galerie", shop: "web-shop", kontakt: "kontakt", impressum: "impressum" },
  en: { home: "", kueche: "our-kitchen", laden: "our-shop", ueber: "about-us", bewertungen: "reviews", galerie: "gallery", shop: "web-shop", kontakt: "contact", impressum: "imprint" },
  pt: { home: "", kueche: "a-nossa-cozinha", laden: "a-nossa-loja", ueber: "sobre-nos", bewertungen: "opinioes", galerie: "galeria", shop: "loja-online", kontakt: "contacto", impressum: "informacao-legal" },
  fr: { home: "", kueche: "notre-cuisine", laden: "notre-epicerie", ueber: "a-propos", bewertungen: "avis", galerie: "galerie", shop: "boutique-en-ligne", kontakt: "contact", impressum: "mentions-legales" },
  it: { home: "", kueche: "la-nostra-cucina", laden: "il-nostro-negozio", ueber: "chi-siamo", bewertungen: "recensioni", galerie: "galleria", shop: "negozio-online", kontakt: "contatti", impressum: "note-legali" },
};
export const pathFor = (lang: Lang, page: PageKey) => `/${lang}/${SLUGS[lang][page]}`;
export function pageFromSlug(lang: Lang, slug: string): PageKey | null {
  const s = slug.replace(/\/$/, "");
  return (Object.keys(SLUGS[lang]) as PageKey[]).find((p) => SLUGS[lang][p] === s) ?? null;
}

/** Home anchors, the same in every language. */
export const ANCHORS = ["start", "ueber-uns", "kueche", "neuigkeiten", "laden", "geschmacksreise", "oeffnungszeiten", "reservieren", "web-shop", "galerie", "bewertungen", "kontakt"] as const;

const l = (de: string, en: string, pt: string, fr: string, it: string): L => ({ de, en, pt, fr, it });

export const WELCOME: Record<Lang, { word: string; line: string }> = {
  de: { word: "Willkommen", line: "im Restaurant Oceano" },
  en: { word: "Welcome", line: "to Restaurant Oceano" },
  pt: { word: "Bem-vindos", line: "ao Restaurant Oceano" },
  fr: { word: "Bienvenue", line: "au Restaurant Oceano" },
  it: { word: "Benvenuti", line: "al Restaurant Oceano" },
};

export const UI = {
  proposal: "Proposta de design · não é o site oficial",
  skip: l("Zum Inhalt springen", "Skip to content", "Saltar para o conteúdo", "Aller au contenu", "Vai al contenuto"),
  skipIntro: l("Intro überspringen", "Skip intro", "Saltar a introdução", "Passer l’intro", "Salta l’intro"),
  home: l("Home", "Home", "Início", "Accueil", "Home"),
  kueche: l("Unsere Küche", "Our kitchen", "A nossa cozinha", "Notre cuisine", "La nostra cucina"),
  laden: l("Unser Laden", "Our shop", "A nossa loja", "Notre épicerie", "Il nostro negozio"),
  ueber: l("Über uns", "About us", "Sobre nós", "À propos", "Chi siamo"),
  bewertungen: l("Kundenbewertungen", "Reviews", "Opiniões", "Avis", "Recensioni"),
  galerie: l("Galerie", "Gallery", "Galeria", "Galerie", "Galleria"),
  shop: l("Web-Shop", "Web shop", "Loja online", "Boutique en ligne", "Negozio online"),
  kontakt: l("Kontakt", "Contact", "Contacto", "Contact", "Contatti"),
  impressum: l("Impressum", "Imprint", "Informação legal", "Mentions légales", "Note legali"),
  hours: l("Öffnungszeiten", "Opening hours", "Horário", "Horaires", "Orari"),
  reserve: l("Tisch reservieren", "Book a table", "Reservar mesa", "Réserver une table", "Prenotare un tavolo"),
  reserveShort: l("Reservieren", "Book", "Reservar", "Réserver", "Prenotare"),
  online: l("Online Reservierung", "Online booking", "Reserva online", "Réservation en ligne", "Prenotazione online"),
  menu: l("Menü", "Menu", "Menu", "Menu", "Menu"),
  close: l("Schliessen", "Close", "Fechar", "Fermer", "Chiudi"),
  call: l("Anrufen", "Call", "Ligar", "Appeler", "Chiama"),
  email: l("E-Mail", "E-mail", "E-mail", "E-mail", "E-mail"),
  language: l("Sprache", "Language", "Idioma", "Langue", "Lingua"),
  languages: l("Sprachen", "Languages", "Idiomas", "Langues", "Lingue"),
  mainNav: l("Hauptnavigation", "Main navigation", "Navegação principal", "Navigation principale", "Navigazione principale"),
  homeLink: l("Restaurant Oceano, Startseite", "Restaurant Oceano, home", "Restaurant Oceano, início", "Restaurant Oceano, accueil", "Restaurant Oceano, home"),
  scroll: l("Scrollen", "Scroll", "Deslize", "Faites défiler", "Scorri"),
  pause: l("Pause", "Pause", "Pausa", "Pause", "Pausa"),
  play: l("Weiter", "Play", "Retomar", "Reprendre", "Riprendi"),
  prev: l("Zurück", "Previous", "Anterior", "Précédent", "Precedente"),
  next: l("Weiter", "Next", "Seguinte", "Suivant", "Successivo"),
  externalNew: l("(neuer Tab)", "(new tab)", "(novo separador)", "(nouvel onglet)", "(nuova scheda)"),
  photo: l("Foto", "Photo", "Foto", "Photo", "Foto"),
  photoSlot: l("Foto folgt", "Photo to come", "Foto em breve", "Photo à venir", "Foto in arrivo"),
  translation: l("Übersetzung", "Translation", "Tradução", "Traduction", "Traduzione"),
  reference: l("Die deutsche Fassung ist massgebend.", "The German version is the reference.", "A versão alemã é a de referência.", "La version allemande fait foi.", "Fa fede la versione tedesca."),
  // places and hours
  restaurant: l("Restaurant", "Restaurant", "Restaurante", "Restaurant", "Ristorante"),
  shopPlace: l("Laden", "Shop", "Loja", "Épicerie", "Negozio"),
  both: l("Beide", "Both", "Ambos", "Les deux", "Entrambi"),
  openNow: l("Jetzt geöffnet", "Open now", "Aberto agora", "Ouvert maintenant", "Aperto ora"),
  closedNow: l("Geschlossen", "Closed", "Fechado", "Fermé", "Chiuso"),
  until: l("bis", "until", "até às", "jusqu’à", "fino alle"),
  opens: l("öffnet", "opens", "abre", "ouvre", "apre"),
  at: l("um", "at", "às", "à", "alle"),
  tomorrow: l("morgen", "tomorrow", "amanhã", "demain", "domani"),
  today: l("Heute", "Today", "Hoje", "Aujourd’hui", "Oggi"),
  localTime: l("Zeit in Schlieren", "Schlieren time", "Hora de Schlieren", "Heure de Schlieren", "Ora di Schlieren"),
  days: l("Tage der Woche", "Days of the week", "Dias da semana", "Jours de la semaine", "Giorni della settimana"),
  pastMidnight: l("bis 1:00", "until 1:00", "até à 1:00", "jusqu’à 1:00", "fino all’1:00"),
  closedDay: l("Geschlossen", "Closed", "Fechado", "Fermé", "Chiuso"),
  // booking
  howMany: l("Wie viele sind Sie?", "How many are you?", "Quantos são?", "Combien êtes-vous ?", "Quanti siete?"),
  people: l("Personen", "people", "pessoas", "personnes", "persone"),
  person: l("Person", "person", "pessoa", "personne", "persona"),
  fewer: l("Eine Person weniger", "One person fewer", "Menos uma pessoa", "Une personne de moins", "Una persona in meno"),
  more: l("Eine Person mehr", "One person more", "Mais uma pessoa", "Une personne de plus", "Una persona in più"),
  bookingLine: l("Online über MyLocalina oder telefonisch.", "Online through MyLocalina or by phone.", "Online pela MyLocalina ou por telefone.", "En ligne via MyLocalina ou par téléphone.", "Online tramite MyLocalina o per telefono."),
  widgetLoad: l("Reservierung laden (MyLocalina)", "Load the booking widget (MyLocalina)", "Carregar a reserva (MyLocalina)", "Charger la réservation (MyLocalina)", "Carica la prenotazione (MyLocalina)"),
  widgetNote: l("Das Reservierungs-Widget von MyLocalina wird erst nach Ihrem Klick geladen.", "The MyLocalina booking widget loads only after you click.", "O widget de reservas da MyLocalina só é carregado depois do seu clique.", "Le widget de réservation MyLocalina ne se charge qu’après votre clic.", "Il widget di prenotazione MyLocalina si carica solo dopo il vostro clic."),
  widgetNew: l("In neuem Tab öffnen", "Open in a new tab", "Abrir num novo separador", "Ouvrir dans un nouvel onglet", "Apri in una nuova scheda"),
  partyNote: l("Die Personenzahl wird nicht an MyLocalina übergeben: wählen Sie sie dort noch einmal.", "The party size is not passed to MyLocalina: choose it there again.", "O número de pessoas não é enviado à MyLocalina: escolha-o lá novamente.", "Le nombre de personnes n’est pas transmis à MyLocalina : choisissez-le à nouveau.", "Il numero di persone non viene trasmesso a MyLocalina: sceglietelo di nuovo lì."),
  // kitchen
  chapters: l("Kapitel", "Chapters", "Capítulos", "Chapitres", "Capitoli"),
  dishes: l("Speisen", "dishes", "pratos", "plats", "piatti"),
  national: l("Nationalgericht", "national dish", "prato nacional", "plat national", "piatto nazionale"),
  restart: l("Neu zählen", "Count again", "Contar de novo", "Recompter", "Conta di nuovo"),
  menuSlot: l("Platz für die Speisekarte des Restaurants (noch nicht online). Nur in der Vorschau sichtbar.", "Space for the restaurant’s menu (not online yet). Visible in the preview only.", "Espaço para a ementa do restaurante (ainda não está online). Visível só na pré-visualização.", "Emplacement pour la carte du restaurant (pas encore en ligne). Visible dans l’aperçu seulement.", "Spazio per il menu del ristorante (non ancora online). Visibile solo nell’anteprima."),
  since: l("seit 2004", "since 2004", "desde 2004", "depuis 2004", "dal 2004"),
  nata2011: l("Nationalgericht 2011", "national dish 2011", "prato nacional 2011", "plat national 2011", "piatto nazionale 2011"),
  // shop and journey
  journey: l("Geschmacksreise", "Taste journey", "Viagem de sabores", "Voyage des saveurs", "Viaggio dei sapori"),
  stops: l("Stationen", "Stops", "Paragens", "Étapes", "Tappe"),
  lisbon: l("Lissabon", "Lisbon", "Lisboa", "Lisbonne", "Lisbona"),
  algarve: l("Algarve", "Algarve", "Algarve", "Algarve", "Algarve"),
  coasts: l("Mittelmeer und Atlantik", "Mediterranean and Atlantic", "Mediterrâneo e Atlântico", "Méditerranée et Atlantique", "Mediterraneo e Atlantico"),
  azores: l("Azoren", "Azores", "Açores", "Açores", "Azzorre"),
  port: l("Portwein", "Port wine", "Vinho do Porto", "Porto", "Porto"),
  spinCork: l("Untersetzer drehen", "Spin the coaster", "Rode a base de cortiça", "Faites tourner le sous-verre", "Fate girare il sottobicchiere"),
  spinHint: l("Ziehen zum Drehen, oder ← → benutzen", "Drag to spin it, or use ← →", "Arraste para rodar, ou use ← →", "Glissez pour le faire tourner, ou utilisez ← →", "Trascinate per farlo girare, o usate ← →"),
  toShop: l("Zum Web-Shop", "To the web shop", "Ir para a loja online", "Vers la boutique en ligne", "Al negozio online"),
  order: l("Jetzt bestellen", "Order now", "Encomendar agora", "Commander", "Ordina ora"),
  noProducts: l("Die Produkte des Web-Shops konnten nicht übernommen werden: die Seite zeigt zurzeit keine an.", "The web shop’s products could not be carried over: the page currently shows none.", "Os produtos da loja online não puderam ser recuperados: a página não mostra nenhum de momento.", "Les produits de la boutique n’ont pas pu être repris : la page n’en affiche aucun pour l’instant.", "I prodotti del negozio online non sono stati ripresi: la pagina al momento non ne mostra."),
  noReviews: l("Die Kundenbewertungen der alten Website konnten nicht übernommen werden: die Seite zeigt zurzeit keine an.", "The old website’s reviews could not be carried over: the page currently shows none.", "As opiniões do site antigo não puderam ser recuperadas: a página não mostra nenhuma de momento.", "Les avis de l’ancien site n’ont pas pu être repris : la page n’en affiche aucun pour l’instant.", "Le recensioni del vecchio sito non sono state riprese: la pagina al momento non ne mostra."),
  // gallery
  gridView: l("Als Raster anzeigen", "Show as grid", "Ver em grelha", "Voir en grille", "Vedi a griglia"),
  trackView: l("Als Band anzeigen", "Show as track", "Ver em faixa", "Voir en défilé", "Vedi a scorrimento"),
  photos: l("Fotos", "photos", "fotografias", "photos", "foto"),
  openPhoto: l("Foto vergrössern", "Enlarge photo", "Ampliar fotografia", "Agrandir la photo", "Ingrandisci la foto"),
  // contact
  address: l("Adresse", "Address", "Morada", "Adresse", "Indirizzo"),
  route: l("Route", "Directions", "Itinerário", "Itinéraire", "Itinerario"),
  destination: l("Ziel", "Destination", "Destino", "Destination", "Destinazione"),
  appleMaps: l("Apple Karten", "Apple Maps", "Apple Mapas", "Apple Plans", "Apple Mappe"),
  openRoute: l("Route öffnen", "Open the route", "Abrir o itinerário", "Ouvrir l’itinéraire", "Apri l’itinerario"),
  phone: l("Telefon", "Phone", "Telefone", "Téléphone", "Telefono"),
  showMap: l("Karte anzeigen (Google Maps)", "Show the map (Google Maps)", "Mostrar o mapa (Google Maps)", "Afficher la carte (Google Maps)", "Mostra la mappa (Google Maps)"),
  mapNote: l("Die Karte wird erst nach Ihrem Klick von Google geladen.", "The map loads from Google only after you click.", "O mapa só é carregado da Google depois do seu clique.", "La carte se charge chez Google seulement après votre clic.", "La mappa si carica da Google solo dopo il vostro clic."),
  required: l("Pflichtfeld", "required", "obrigatório", "obligatoire", "obbligatorio"),
  send: l("Senden", "Send", "Enviar", "Envoyer", "Invia"),
  sending: l("Wird gesendet…", "Sending…", "A enviar…", "Envoi…", "Invio…"),
  testMode: l("Vorschau: Das Formular ist im Testmodus und sendet noch nichts.", "Preview: the form is in test mode and sends nothing yet.", "Pré-visualização: o formulário está em modo de teste e ainda não envia nada.", "Pré-visualisation : le formulaire est en mode test et n’envoie rien encore.", "Anteprima: il modulo è in modalità test e non invia ancora nulla."),
  testSent: l("Testmodus: Die Nachricht wurde geprüft, aber nicht gesendet.", "Test mode: the message was checked but not sent.", "Modo de teste: a mensagem foi verificada mas não enviada.", "Mode test : le message a été vérifié mais pas envoyé.", "Modalità test: il messaggio è stato verificato ma non inviato."),
  fieldMissing: l("Bitte füllen Sie dieses Feld aus.", "Please fill in this field.", "Preencha este campo.", "Merci de remplir ce champ.", "Compilate questo campo."),
  emailInvalid: l("Diese E-Mail-Adresse scheint nicht gültig zu sein.", "This e-mail address does not look valid.", "Este endereço de e-mail não parece válido.", "Cette adresse e-mail ne semble pas valide.", "Questo indirizzo e-mail non sembra valido."),
  privacy: l("Datenschutzerklärung", "Privacy policy", "Política de privacidade", "Déclaration de protection des données", "Informativa sulla privacy"),
  legal: l("Rechtliches", "Legal", "Legal", "Informations légales", "Note legali"),
  entries: l("Zu unseren Einträgen auf", "Our listings on", "As nossas entradas em", "Nos fiches sur", "Le nostre schede su"),
  of: l("von", "of", "de", "sur", "di"),
  dragHint: l("Scrollen oder ziehen", "Scroll or drag", "Deslize ou arraste", "Faites défiler ou glissez", "Scorrete o trascinate"),
  story: l("Unsere Geschichte", "Our story", "A nossa história", "Notre histoire", "La nostra storia"),
} satisfies Record<string, L | string>;

export type UIKey = keyof typeof UI;
