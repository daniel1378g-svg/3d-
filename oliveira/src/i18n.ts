// Languages, routes and every interface string. The live site exists only in German: its texts are copied
// from it (five typos fixed, see README); Portuguese, English, Italian and French are translations that need
// a native-speaker check before launch. Order of every L(...) call: de, pt, en, it, fr.
export type Lang = "de" | "pt" | "en" | "it" | "fr";
export type PageKey = "home" | "kueche" | "impressum" | "datenschutz";
export type Localized = Record<Lang, string>;

export const LANGS: Lang[] = ["de", "pt", "en", "it", "fr"];
export const NATIVE: Record<Lang, string> = { de: "Deutsch", pt: "Português", en: "English", it: "Italiano", fr: "Français" };
export const HTML_LANG: Record<Lang, string> = { de: "de-CH", pt: "pt-PT", en: "en", it: "it", fr: "fr" };
export const LOCALE: Record<Lang, string> = { de: "de-CH", pt: "pt-PT", en: "en-GB", it: "it-CH", fr: "fr-CH" };

export const SLUGS: Record<Lang, Record<PageKey, string>> = {
  de: { home: "", kueche: "kueche", impressum: "impressum", datenschutz: "datenschutz" },
  pt: { home: "", kueche: "cozinha", impressum: "aviso-legal", datenschutz: "privacidade" },
  en: { home: "", kueche: "kitchen", impressum: "legal-notice", datenschutz: "privacy" },
  it: { home: "", kueche: "cucina", impressum: "note-legali", datenschutz: "privacy" },
  fr: { home: "", kueche: "cuisine", impressum: "mentions-legales", datenschutz: "confidentialite" },
};

export const isLang = (v: unknown): v is Lang => LANGS.includes(v as Lang);
export function pageFromSlug(lang: Lang, slug = ""): PageKey | null {
  const hit = (Object.keys(SLUGS[lang]) as PageKey[]).find((k) => SLUGS[lang][k] === slug.replace(/\/$/, ""));
  return hit ?? null;
}
export const pathFor = (lang: Lang, page: PageKey) => `/${lang}/${SLUGS[lang][page]}`;

const L = (de: string, pt: string, en: string, it: string, fr: string): Localized => ({ de, pt, en, it, fr });
export const fill = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));

/** The live site's own texts (German) and their translations. */
export const TEXT = {
  heroLine: L(
    "Von BACALHAU bis Käseschnitte «Walliser Art»",
    "Do BACALHAU à Käseschnitte «Walliser Art»",
    "From BACALHAU to Käseschnitte “Walliser Art”",
    "Dal BACALHAU alla Käseschnitte «Walliser Art»",
    "Du BACALHAU à la Käseschnitte «Walliser Art»",
  ),
  name: L(
    "Der Name «Oliveira» bedeutet Olivenbaum auf Portugiesisch und ist auch unser Familienname. Wir freuen uns, Sie in unserem Restaurant in Winterthur-Töss mit portugiesischen und Schweizer Speisen und Getränken verwöhnen zu dürfen.",
    "O nome «Oliveira» é a palavra portuguesa para a árvore da azeitona e é também o nosso apelido. Teremos todo o gosto em recebê-lo no nosso restaurante em Winterthur-Töss com pratos e bebidas portugueses e suíços.",
    "The name “Oliveira” means olive tree in Portuguese, and it is also our family name. We look forward to treating you to Portuguese and Swiss food and drink at our restaurant in Winterthur-Töss.",
    "Il nome «Oliveira» significa ulivo in portoghese ed è anche il nostro cognome. Saremo lieti di viziarvi nel nostro ristorante di Winterthur-Töss con piatti e bevande portoghesi e svizzeri.",
    "Le nom «Oliveira» signifie olivier en portugais, et c’est aussi notre nom de famille. Nous nous réjouissons de vous régaler dans notre restaurant de Winterthur-Töss avec des mets et des boissons portugais et suisses.",
  ),
  bacalhau: L(
    "Bacalhau (Kabeljau) ist das Nationalgericht der Portugiesen und hat eine grosse historische, wirtschaftliche und kulturelle Bedeutung. Der Kabeljau ist der Hauptbestandteil unzähliger Rezepte, so wie eines unserer wechselnden Sonntagsmenüs mit Kichererbsen und Eiern.",
    "O bacalhau é o prato nacional dos portugueses e tem uma grande importância histórica, económica e cultural. É o ingrediente principal de inúmeras receitas, como um dos nossos menus de domingo, sempre diferentes, com grão-de-bico e ovos.",
    "Bacalhau (cod) is Portugal’s national dish and has great historical, economic and cultural importance. Cod is the main ingredient of countless recipes, such as one of our changing Sunday menus, with chickpeas and eggs.",
    "Il bacalhau (merluzzo) è il piatto nazionale dei portoghesi e ha una grande importanza storica, economica e culturale. Il merluzzo è l’ingrediente principale di innumerevoli ricette, come uno dei nostri menù della domenica, che cambiano di volta in volta, con ceci e uova.",
    "Le bacalhau (cabillaud) est le plat national des Portugais et revêt une grande importance historique, économique et culturelle. Le cabillaud est l’ingrédient principal d’innombrables recettes, comme l’un de nos menus du dimanche, qui changent régulièrement, avec pois chiches et œufs.",
  ),
  opening: L(
    "Der letzte Wirt des «Old Pullmann», Arlindo Oliveira, eröffnet zusammen mit seiner Frau Ekaterina im ehemaligen «Kafi Frosch» ihr neues Restaurant OLIVEIRA mit portugiesischer und Schweizer Küche.",
    "O último dono do «Old Pullmann», Arlindo Oliveira, abre com a mulher, Ekaterina, no antigo «Kafi Frosch», o seu novo restaurante OLIVEIRA, de cozinha portuguesa e suíça.",
    "Arlindo Oliveira, the last landlord of the “Old Pullmann”, is opening his new restaurant OLIVEIRA, with Portuguese and Swiss cooking, together with his wife Ekaterina in the former “Kafi Frosch”.",
    "L’ultimo oste dell’«Old Pullmann», Arlindo Oliveira, apre insieme alla moglie Ekaterina, nell’ex «Kafi Frosch», il suo nuovo ristorante OLIVEIRA, con cucina portoghese e svizzera.",
    "Le dernier patron de l’«Old Pullmann», Arlindo Oliveira, ouvre avec sa femme Ekaterina, dans l’ancien «Kafi Frosch», son nouveau restaurant OLIVEIRA, avec une cuisine portugaise et suisse.",
  ),
};

/** Untranslated in every language. */
export const MOTTO = { pt: "Bom apetite", gsw: "en guete!" };
export const STORY_HEADING = "Portugal vai para Winterthur-Töss";
export const SIGNATURE = "Arlindo Ribeiro Oliveira";

export const UI = {
  skip: L("Zum Inhalt", "Saltar para o conteúdo", "Skip to content", "Vai al contenuto", "Aller au contenu"),
  proposal: "Proposta de design · não é o site oficial",
  proposalLocal: L("Designvorschlag · nicht die offizielle Website", "", "Design proposal · not the official website", "Proposta di design · non è il sito ufficiale", "Proposition de design · pas le site officiel"),
  home: L("Startseite", "Início", "Home", "Home", "Accueil"),
  mainNav: L("Hauptnavigation", "Navegação principal", "Main navigation", "Navigazione principale", "Navigation principale"),
  navAbout: L("Über uns", "Sobre nós", "About us", "Chi siamo", "À propos"),
  navKitchen: L("Küche", "Cozinha", "Kitchen", "Cucina", "Cuisine"),
  navReservation: L("Online Reservation", "Reserva online", "Book online", "Prenotazione online", "Réservation en ligne"),
  navContact: L("Kontakt", "Contacto", "Contact", "Contatti", "Contact"),
  menu: L("Menü", "Menu", "Menu", "Menu", "Menu"),
  closeMenu: L("Menü schliessen", "Fechar o menu", "Close the menu", "Chiudi il menu", "Fermer le menu"),
  call: L("Anrufen", "Ligar", "Call", "Chiama", "Appeler"),
  email: L("E-Mail", "E-mail", "Email", "E-mail", "E-mail"),
  language: L("Sprache", "Língua", "Language", "Lingua", "Langue"),
  chooserLabel: "Sprache · Língua · Language · Lingua · Langue",
  lageplan: L("Lageplan", "Mapa", "Map", "Mappa", "Plan d’accès"),
  welcomeSkip: L("Klicken zum Überspringen", "Clique para saltar", "Click to skip", "Clicca per saltare", "Cliquer pour passer"),

  wind: L("Wind", "Vento", "Wind", "Vento", "Vent"),
  windLabel: L("Einen Windstoss durch den Olivenbaum schicken", "Mandar uma rajada de vento pela oliveira", "Send a gust of wind through the olive tree", "Manda una folata di vento tra l’ulivo", "Envoyer un coup de vent dans l’olivier"),
  motion: L("Bewegung aktivieren", "Ativar movimento", "Enable motion", "Attiva movimento", "Activer le mouvement"),
  heroScene: L("Ein Olivenbaum über einem gedeckten Tisch, im Licht der aktuellen Tageszeit in Winterthur", "Uma oliveira sobre uma mesa posta, com a luz da hora atual em Winterthur", "An olive tree over a laid table, in the light of the current time of day in Winterthur", "Un ulivo sopra una tavola apparecchiata, nella luce dell’ora attuale a Winterthur", "Un olivier au-dessus d’une table dressée, dans la lumière de l’heure actuelle à Winterthur"),
  pause: L("Anhalten", "Pausar", "Pause", "Metti in pausa", "Mettre en pause"),
  play: L("Weiter", "Retomar", "Play", "Riprendi", "Reprendre"),
  pauseTree: L("Baum anhalten", "Parar a árvore", "Pause the tree", "Ferma l’albero", "Arrêter l’arbre"),
  playTree: L("Baum bewegen", "Mover a árvore", "Play the tree", "Muovi l’albero", "Animer l’arbre"),

  openNow: L("Geöffnet", "Aberto", "Open", "Aperto", "Ouvert"),
  closedNow: L("Geschlossen", "Fechado", "Closed", "Chiuso", "Fermé"),
  closesIn: L("schliesst in {n} Min.", "fecha dentro de {n} min", "closes in {n} min", "chiude tra {n} min", "ferme dans {n} min"),
  closesAt: L("schliesst um {t}", "fecha às {t}", "closes at {t}", "chiude alle {t}", "ferme à {t}"),
  opensAt: L("öffnet um {t}", "abre às {t}", "opens at {t}", "apre alle {t}", "ouvre à {t}"),
  opensDayAt: L("öffnet {day} um {t}", "abre {day} às {t}", "opens {day} at {t}", "apre {day} alle {t}", "ouvre {day} à {t}"),
  tomorrow: L("morgen", "amanhã", "tomorrow", "domani", "demain"),
  provisional: L("Zeiten provisorisch – bitte telefonisch bestätigen", "Horário provisório – confirme por telefone", "Provisional hours – please confirm by phone", "Orari provvisori – confermate per telefono", "Horaires provisoires – merci de confirmer par téléphone"),
  hours: L("Öffnungszeiten", "Horário", "Opening hours", "Orari", "Horaires"),
  dayOff: L("Ruhetag", "Encerrado", "Closed", "Chiuso", "Fermé"),
  today: L("Heute", "Hoje", "Today", "Oggi", "Aujourd’hui"),

  stripLabel: L("Laufband Restaurante Oliveira", "Faixa Restaurante Oliveira", "Restaurante Oliveira strip", "Striscia Restaurante Oliveira", "Bandeau Restaurante Oliveira"),
  portugal: L("Portugal", "Portugal", "Portugal", "Portogallo", "Portugal"),
  schweiz: L("Schweiz", "Suíça", "Switzerland", "Svizzera", "Suisse"),
  all: L("Alle", "Todos", "All", "Tutti", "Tous"),

  kitchenTitle: L("Aus der Küche", "Da cozinha", "From the kitchen", "Dalla cucina", "De la cuisine"),
  kitchenLead: L("Portugiesisch und schweizerisch, so wie es auf den Tisch kommt.", "Português e suíço, tal como chega à mesa.", "Portuguese and Swiss, just as it comes to the table.", "Portoghese e svizzero, così come arriva in tavola.", "Portugais et suisse, tel que ça arrive à table."),
  allDishes: L("Alle Gerichte", "Todos os pratos", "All dishes", "Tutti i piatti", "Tous les plats"),
  menuLine: L("Aktuelle Karte, Tagesmenü und Preise:", "Ementa atual, prato do dia e preços:", "Current menu, daily menu and prices:", "Menù attuale, menù del giorno e prezzi:", "Carte actuelle, menu du jour et prix:"),
  symbolbild: L("Symbolbild", "Imagem ilustrativa", "Illustrative photo", "Immagine illustrativa", "Photo d’illustration"),
  filterLabel: L("Küche filtern", "Filtrar a cozinha", "Filter the dishes", "Filtra i piatti", "Filtrer les plats"),
  search: L("Gericht suchen", "Procurar um prato", "Search a dish", "Cerca un piatto", "Chercher un plat"),
  noResults: L("Kein Gericht gefunden.", "Nenhum prato encontrado.", "No dish found.", "Nessun piatto trovato.", "Aucun plat trouvé."),
  dishCount: L("{n} Gerichte", "{n} pratos", "{n} dishes", "{n} piatti", "{n} plats"),
  tagesmenueTitle: L("Aus dem Tagesmenü", "Do prato do dia", "From the daily menu", "Dal menù del giorno", "Du menu du jour"),
  close: L("Schliessen", "Fechar", "Close", "Chiudi", "Fermer"),
  open: L("Öffnen", "Abrir", "Open", "Apri", "Ouvrir"),
  kitchenHero: L("Gerichte aus der Küche des Restaurante Oliveira", "Pratos da cozinha do Restaurante Oliveira", "Dishes from the kitchen of Restaurante Oliveira", "Piatti dalla cucina del Restaurante Oliveira", "Les plats de la cuisine du Restaurante Oliveira"),
  noPrices: L("Ohne Preise: Die aktuelle Karte erhalten Sie im Restaurant oder am Telefon.", "Sem preços: a ementa atual está disponível no restaurante ou por telefone.", "No prices here: the current menu is available at the restaurant or by phone.", "Senza prezzi: il menù attuale è disponibile al ristorante o per telefono.", "Sans prix: la carte actuelle est disponible au restaurant ou par téléphone."),

  storyLabel: L("Vom «Old Pullmann» über das «Kafi Frosch» zum OLIVEIRA", "Do «Old Pullmann», pelo «Kafi Frosch», até ao OLIVEIRA", "From the “Old Pullmann” via the “Kafi Frosch” to OLIVEIRA", "Dall’«Old Pullmann», passando per il «Kafi Frosch», all’OLIVEIRA", "De l’«Old Pullmann» au OLIVEIRA, en passant par le «Kafi Frosch»"),
  gallery: L("Galerie", "Galeria", "Gallery", "Galleria", "Galerie"),
  galleryLabel: L("Fotos aus dem Restaurante Oliveira", "Fotografias do Restaurante Oliveira", "Photos from Restaurante Oliveira", "Foto dal Restaurante Oliveira", "Photos du Restaurante Oliveira"),
  galleryOpen: L("Gross anzeigen", "Ver em ecrã inteiro", "View full screen", "Mostra a schermo intero", "Voir en plein écran"),

  routeLabel: L("Von Portugal nach Winterthur", "De Portugal a Winterthur", "From Portugal to Winterthur", "Dal Portogallo a Winterthur", "Du Portugal à Winterthur"),
  routeLine: L("Von Portugal bis an Ihren Tisch in Winterthur.", "De Portugal até à sua mesa, em Winterthur.", "From Portugal to your table, in Winterthur.", "Dal Portogallo alla vostra tavola, a Winterthur.", "Du Portugal jusqu’à votre table, à Winterthur."),

  reviewsTitle: L("Was unsere Gäste sagen", "O que dizem os nossos clientes", "What our guests say", "Cosa dicono i nostri ospiti", "Ce que disent nos clients"),
  reviewsSource: L("Google-Bewertungen", "Avaliações no Google", "Google reviews", "Recensioni su Google", "Avis Google"),
  reviewsNote: L("Zitiert im Originalwortlaut (Englisch).", "Citadas tal como foram escritas (em inglês).", "Quoted exactly as written.", "Citate esattamente come sono state scritte (in inglese).", "Cités tels qu’ils ont été écrits (en anglais)."),
  reviewsCount: L("{n} Rezensionen", "{n} avaliações", "{n} reviews", "{n} recensioni", "{n} avis"),
  reviewsCountIn: L("{n} Rezensionen in {place}", "{n} avaliações em {place}", "{n} reviews in {place}", "{n} recensioni a {place}", "{n} avis à {place}"),
  reviewStars: L("{n} von 5 Sternen", "{n} de 5 estrelas", "{n} out of 5 stars", "{n} stelle su 5", "{n} étoiles sur 5"),
  reviewFood: L("Essen", "Comida", "Food", "Cibo", "Cuisine"),
  reviewService: L("Service", "Serviço", "Service", "Servizio", "Service"),
  reviewAtmosphere: L("Ambiente", "Ambiente", "Atmosphere", "Atmosfera", "Ambiance"),
  reviewDineInLunch: L("Vor Ort · Mittagessen", "No local · Almoço", "Dine in · Lunch", "Al ristorante · Pranzo", "Sur place · Déjeuner"),
  reviewTranslatedRu: L("Von Google aus dem Russischen übersetzt", "Traduzido do russo pelo Google", "Translated by Google from Russian", "Tradotto dal russo da Google", "Traduit du russe par Google"),
  reviewReactions: L("{n} Reaktionen", "{n} reações", "{n} reactions", "{n} reazioni", "{n} réactions"),
  reviewReaction: L("1 Reaktion", "1 reação", "1 reaction", "1 reazione", "1 réaction"),
  reviewsMore: L("Alle Bewertungen auf Google", "Todas as avaliações no Google", "All reviews on Google", "Tutte le recensioni su Google", "Tous les avis sur Google"),
  prevPhoto: L("Vorheriges Foto", "Fotografia anterior", "Previous photo", "Foto precedente", "Photo précédente"),
  nextPhoto: L("Nächstes Foto", "Fotografia seguinte", "Next photo", "Foto successiva", "Photo suivante"),
  photoOf: L("Foto {n} von {total}", "Fotografia {n} de {total}", "Photo {n} of {total}", "Foto {n} di {total}", "Photo {n} sur {total}"),

  reservations: L("Reservationen", "Reservas", "Reservations", "Prenotazioni", "Réservations"),
  reserveLead: L("Reservieren Sie online oder rufen Sie uns an.", "Reserve online ou ligue-nos.", "Book online or give us a call.", "Prenotate online o chiamateci.", "Réservez en ligne ou appelez-nous."),
  drawerLoading: L("Das Reservationsformular wird geladen …", "A carregar o formulário de reserva …", "Loading the booking form …", "Caricamento del modulo di prenotazione …", "Chargement du formulaire de réservation …"),
  drawerNote: L("Das Formular stammt von MyLocalina und wird erst nach Ihrem Klick geladen.", "O formulário é da MyLocalina e só é carregado depois do seu clique.", "The form comes from MyLocalina and loads only after your click.", "Il modulo è di MyLocalina e si carica solo dopo il vostro clic.", "Le formulaire provient de MyLocalina et ne se charge qu’après votre clic."),
  newTab: L("In neuem Tab öffnen", "Abrir num novo separador", "Open in a new tab", "Apri in una nuova scheda", "Ouvrir dans un nouvel onglet"),
  copyEmail: L("Adresse kopieren", "Copiar endereço", "Copy address", "Copia indirizzo", "Copier l’adresse"),
  copied: L("E-Mail-Adresse kopiert", "Endereço de e-mail copiado", "Email address copied", "Indirizzo e-mail copiato", "Adresse e-mail copiée"),

  phone: L("Telefon", "Telefone", "Phone", "Telefono", "Téléphone"),
  address: L("Adresse", "Morada", "Address", "Indirizzo", "Adresse"),
  loadMap: L("Karte laden (OpenStreetMap)", "Carregar mapa (OpenStreetMap)", "Load the map (OpenStreetMap)", "Carica la mappa (OpenStreetMap)", "Charger la carte (OpenStreetMap)"),
  mapNote: L("Die Karte wird erst nach Ihrem Klick von OpenStreetMap geladen.", "O mapa só é carregado do OpenStreetMap depois do seu clique.", "The map loads from OpenStreetMap only after your click.", "La mappa si carica da OpenStreetMap solo dopo il vostro clic.", "La carte ne se charge depuis OpenStreetMap qu’après votre clic."),
  route: L("Route planen", "Planear o percurso", "Get directions", "Indicazioni stradali", "Itinéraire"),
  mapTitle: L("Karte: Restaurante Oliveira, Stationsstrasse 3, Winterthur", "Mapa: Restaurante Oliveira, Stationsstrasse 3, Winterthur", "Map: Restaurante Oliveira, Stationsstrasse 3, Winterthur", "Mappa: Restaurante Oliveira, Stationsstrasse 3, Winterthur", "Carte: Restaurante Oliveira, Stationsstrasse 3, Winterthur"),

  quickLinks: L("Quick links", "Ligações rápidas", "Quick links", "Link rapidi", "Liens rapides"),
  impressum: L("Impressum & Haftungsausschluss", "Aviso legal", "Legal notice", "Note legali", "Mentions légales"),
  datenschutz: L("Datenschutz", "Privacidade", "Privacy", "Privacy", "Confidentialité"),
  copyright: L("Copyright © {year} Restaurante Oliveira Winterthur", "Copyright © {year} Restaurante Oliveira Winterthur", "Copyright © {year} Restaurante Oliveira Winterthur", "Copyright © {year} Restaurante Oliveira Winterthur", "Copyright © {year} Restaurante Oliveira Winterthur"),
  soundOn: L("Ton einschalten", "Ligar o som", "Turn sound on", "Attiva l’audio", "Activer le son"),
  soundOff: L("Ton ausschalten", "Desligar o som", "Turn sound off", "Disattiva l’audio", "Couper le son"),
  country: L("Schweiz", "Suíça", "Switzerland", "Svizzera", "Suisse"),
  cuisineLine: L("Portugiesische & Schweizer Küche", "Cozinha portuguesa e suíça", "Portuguese & Swiss cooking", "Cucina portoghese e svizzera", "Cuisine portugaise et suisse"),

  cursorDrag: L("Ziehen", "Arrastar", "Drag", "Trascina", "Glisser"),
  cursorView: L("Ansehen", "Ver", "View", "Guarda", "Voir"),
  cursorBook: L("Reservieren", "Reservar", "Book", "Prenota", "Réserver"),
  cursorCall: L("Anrufen", "Ligar", "Call", "Chiama", "Appeler"),
};

export const WELCOME: Record<Lang, { word: string; line: string }> = {
  de: { word: "Willkommen", line: "im Restaurante Oliveira" },
  pt: { word: "Bem-vindos", line: "ao Restaurante Oliveira" },
  en: { word: "Welcome", line: "to Restaurante Oliveira" },
  it: { word: "Benvenuti", line: "al Restaurante Oliveira" },
  fr: { word: "Bienvenue", line: "au Restaurante Oliveira" },
};

export const SEO: Record<PageKey, { title: Localized; description: Localized }> = {
  home: {
    title: L(
      "Restaurante Oliveira Winterthur · Portugiesische & Schweizer Küche",
      "Restaurante Oliveira Winterthur · Cozinha portuguesa e suíça",
      "Restaurante Oliveira Winterthur · Portuguese & Swiss cooking",
      "Restaurante Oliveira Winterthur · Cucina portoghese e svizzera",
      "Restaurante Oliveira Winterthur · Cuisine portugaise et suisse",
    ),
    description: L(
      "Bom apetite – en guete! Portugiesische und Schweizer Küche in Winterthur-Töss, von Bacalhau bis Käseschnitte «Walliser Art». Stationsstrasse 3, 044 730 71 71.",
      "Bom apetite – en guete! Cozinha portuguesa e suíça em Winterthur-Töss, do bacalhau à Käseschnitte «Walliser Art». Stationsstrasse 3, 044 730 71 71.",
      "Bom apetite – en guete! Portuguese and Swiss cooking in Winterthur-Töss, from bacalhau to Käseschnitte “Walliser Art”. Stationsstrasse 3, 044 730 71 71.",
      "Bom apetite – en guete! Cucina portoghese e svizzera a Winterthur-Töss, dal bacalhau alla Käseschnitte «Walliser Art». Stationsstrasse 3, 044 730 71 71.",
      "Bom apetite – en guete! Cuisine portugaise et suisse à Winterthur-Töss, du bacalhau à la Käseschnitte «Walliser Art». Stationsstrasse 3, 044 730 71 71.",
    ),
  },
  kueche: {
    title: L("Küche · Restaurante Oliveira Winterthur", "Cozinha · Restaurante Oliveira Winterthur", "Kitchen · Restaurante Oliveira Winterthur", "Cucina · Restaurante Oliveira Winterthur", "Cuisine · Restaurante Oliveira Winterthur"),
    description: L(
      "Bacalhau, Caldo verde, Francesinha, Käseschnitte «Walliser Art» und mehr: Gerichte aus der Küche des Restaurante Oliveira in Winterthur-Töss.",
      "Bacalhau, caldo verde, francesinha, Käseschnitte «Walliser Art» e mais: pratos da cozinha do Restaurante Oliveira em Winterthur-Töss.",
      "Bacalhau, caldo verde, francesinha, Käseschnitte “Walliser Art” and more: dishes from the kitchen of Restaurante Oliveira in Winterthur-Töss.",
      "Bacalhau, caldo verde, francesinha, Käseschnitte «Walliser Art» e altro: piatti dalla cucina del Restaurante Oliveira a Winterthur-Töss.",
      "Bacalhau, caldo verde, francesinha, Käseschnitte «Walliser Art» et plus: les plats de la cuisine du Restaurante Oliveira à Winterthur-Töss.",
    ),
  },
  impressum: {
    title: L("Impressum & Haftungsausschluss · Restaurante Oliveira", "Aviso legal · Restaurante Oliveira", "Legal notice · Restaurante Oliveira", "Note legali · Restaurante Oliveira", "Mentions légales · Restaurante Oliveira"),
    description: L(
      "Impressum des Restaurante Oliveira, Stationsstrasse 3, 8406 Winterthur.",
      "Aviso legal do Restaurante Oliveira, Stationsstrasse 3, 8406 Winterthur.",
      "Legal notice of Restaurante Oliveira, Stationsstrasse 3, 8406 Winterthur.",
      "Note legali del Restaurante Oliveira, Stationsstrasse 3, 8406 Winterthur.",
      "Mentions légales du Restaurante Oliveira, Stationsstrasse 3, 8406 Winterthur.",
    ),
  },
  datenschutz: {
    title: L("Datenschutz · Restaurante Oliveira", "Privacidade · Restaurante Oliveira", "Privacy · Restaurante Oliveira", "Privacy · Restaurante Oliveira", "Confidentialité · Restaurante Oliveira"),
    description: L(
      "Datenschutzerklärung (Entwurf) des Restaurante Oliveira in Winterthur.",
      "Política de privacidade (rascunho) do Restaurante Oliveira em Winterthur.",
      "Privacy notice (draft) of Restaurante Oliveira in Winterthur.",
      "Informativa sulla privacy (bozza) del Restaurante Oliveira a Winterthur.",
      "Déclaration de confidentialité (projet) du Restaurante Oliveira à Winterthur.",
    ),
  },
};
