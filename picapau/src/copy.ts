// Every text on the site, in the five languages.
//   FR, PT, EN: the owner's own texts, verbatim from picapau.ch (content/raw/live-data.json, `T`).
//   IT, DE:     translated for this proposal (to be proofread by native speakers; Swiss German "ss").
//   Interface words that the live site does not have (button labels, "Combien êtes-vous ?", tab names…)
//   are marked `ui` and written in all five languages.
import type { L10n, Lang } from "./i18n";

type Copy = {
  tagline: string;
  kicker: string;
  /** The kicker, split for the split hero: left half (white), right half (gold). */
  heroSplit: [string, string];
  address: string;
  city: string;
  /** home.copy: the lead line, then the presentation split into its three sentences (river story). */
  lead: string;
  story: [string, string, string];
  /** ui: the first words of each story sentence, for the progress rail. */
  storyMarks: [string, string, string];
  menuBtn: string;
  bookBtn: string;
  hoursLine: [string, string];
  badges: [string, string, string];
  nav: { home: string; carte: string; gallery: string; info: string; book: string; daily: string };
  menu: { pageTitle: string; kicker: string; subtitle: string; scrollHint: string; alert: string };
  reservation: { kicker: string; subtitle: string; phone: string };
  gallery: { kicker: string; title: string; subtitle: string };
  info: {
    title: string;
    facebookTitle: string;
    addressTitle: string;
    phoneTitle: string;
    phoneText: string;
    contactTitle: string;
    mapCaption: string;
    callLabel: string;
    hoursTitle: string;
    closedDays: string;
    closed: string;
    days: string;
    openHours: string;
    kitchenTitle: string;
    kitchenText: string;
    last: string;
    spacesTitle: string;
    spacesText: string;
    bookingSpacesTitle: string;
    bookingTitle: string;
    bookingOnline: string;
    bookingOnlineAction: string;
    bookingPhone: string;
    bookingPhoneAction: string;
    bookingLarge: string;
    bookingLargeAction: string;
    bookingCall: string;
    bookingNote: string;
    parkingTitle: string;
    parkingText: string;
    parking: string;
    parkingBreak: string;
    transitTitle: string;
    trams: string;
    route: string;
    payTitle: string;
    pay: string;
    payEuro: string;
    note: string;
  };
  map: { close: string; title: string; heading: string };
  legal: { copyright: string; privacyTitle: string; privacyText: string };
  facebookFallback: string;
  ui: {
    skip: string;
    skipIntro: string;
    language: string;
    menuButton: string;
    mainNav: string;
    howMany: string;
    people: (n: number) => string;
    fewer: string;
    more: string;
    bookOnline: string;
    bookOnlineNew: string;
    call: string;
    orCall: string;
    seeFullCarte: string;
    gridView: string;
    trackView: string;
    pause: string;
    play: string;
    open: string;
    closedNow: string;
    kitchenUntil: (end: string, last: string) => string;
    kitchenClosed: (end: string) => string;
    opensAt: (time: string) => string;
    opensTomorrow: (time: string) => string;
    opensOn: (day: string, time: string) => string;
    terraceOpen: string;
    terraceClosed: string;
    tabs: { tram: string; car: string; parking: string };
    euroLabel: string;
    euroResult: (eur: string) => string;
    euroHint: string;
    search: string;
    searchPlaceholder: string;
    searchNone: (q: string) => string;
    clear: string;
    categories: string;
    itemCount: (n: number) => string;
    loadFacebook: string;
    facebookPrivacy: string;
    openFacebook: string;
    newWindow: string;
    photoOf: (dish: string) => string;
    spin: string;
    spinHint: string;
    prev: string;
    next: string;
    photoCount: (i: number, n: number) => string;
    backHome: string;
    scroll: string;
    surCommande: string;
    chapter: string;
    privacyLead: string;
    knock: string;
    directions: string;
    reserveDrawer: string;
  };
};

const fr: Copy = {
  tagline: "L'Âme du Portugal",
  kicker: "Votre Restaurant Portugais à Genève",
  heroSplit: ["Votre restaurant portugais", "à Genève"],
  address: "Rue Hugo-de-Senger 3 · 1205 Genève",
  city: "1205 Genève",
  lead: "Plongez au cœur des traditions avec une cuisine authentique et généreuse.",
  story: [
    "Véritable restaurant familial, notre table est un lieu où l’on vient partager un repas chaleureux.",
    "Originaire de Porto, notre cheffe prépare avec passion cette véritable nourriture de grand-mère qui réchauffe l’âme.",
    "De l’incontournable Francesinha à la Carne de Porco à Alentejana, en passant par le Bacalhau et notre Poulpe à Lagareiro, chaque recette raconte une histoire.",
  ],
  storyMarks: ["Véritable restaurant familial", "Originaire de Porto", "De l’incontournable Francesinha"],
  menuBtn: "Voir la carte",
  bookBtn: "Réserver une table",
  hoursLine: ["Mercredi à Dimanche", "12:00 – 15:00  |  19:00 – 23:00"],
  badges: ["Cuisine portugaise", "Esprit familial", "Saveurs de Porto"],
  nav: { home: "Accueil", carte: "La carte", gallery: "Galerie", info: "Infos", book: "Réserver", daily: "Les plats du jour" },
  menu: {
    pageTitle: "Carte",
    kicker: "La carte",
    subtitle: "Une carte généreuse autour des classiques portugais, des spécialités de Porto et des plats à partager.",
    scrollHint: "Faites défiler pour voir la suite",
    alert: "La carte peut évoluer selon les produits disponibles et la saison.",
  },
  reservation: {
    kicker: "Réservation",
    subtitle: "Pour les tables jusqu'à 4 personnes, la réservation en ligne est disponible ci-dessus.",
    phone: "Pour 5 à 8 personnes, merci de nous appeler directement. À partir de 9 personnes, nous n’acceptons généralement pas les réservations, sauf exception. Appelez-nous pour en discuter.",
  },
  gallery: { kicker: "Galerie", title: "Quelques images de la maison.", subtitle: "L'ambiance, les détails et les petits moments de Pica Pau." },
  info: {
    title: "Informations",
    facebookTitle: "Les plats du jour",
    addressTitle: "Adresse",
    phoneTitle: "Téléphone",
    phoneText: "Pour les réservations de 5 personnes ou plus, appelez-nous.",
    contactTitle: "Contact & accès",
    mapCaption: "Voir dans Google Maps",
    callLabel: "Appeler le 022 321 60 60",
    hoursTitle: "Horaires d’ouverture",
    closedDays: "Lundi et Mardi",
    closed: "Fermé",
    days: "Mercredi à Dimanche",
    openHours: "12h00–15h00\n19h00–23h00",
    kitchenTitle: "Horaires de la cuisine",
    kitchenText: "Service de 12h00 à 14h00 et de 19h00 à 22h00",
    last: "Dernière prise de commande à 13h30 et 21h30",
    spacesTitle: "Nos espaces",
    spacesText: "30 places assises réparties en plusieurs espaces, ainsi qu'une terrasse de 12 places ouverte de mars à octobre.",
    bookingSpacesTitle: "Réservations & espaces",
    bookingTitle: "Réservations",
    bookingOnline: "Jusqu'à 4 personnes",
    bookingOnlineAction: "En ligne ou par téléphone",
    bookingPhone: "De 5 à 8 personnes",
    bookingPhoneAction: "Par téléphone",
    bookingLarge: "À partir de 9 personnes",
    bookingLargeAction: "Exception · nous appeler",
    bookingCall: "APPELER",
    bookingNote: "À partir de 9 personnes, les réservations ne sont normalement pas acceptées, sauf exception. Appelez-nous pour voir ensemble ce qui est possible.",
    parkingTitle: "Stationnement",
    parkingText: "Des places de parking sont disponibles devant le restaurant, dans la rue et aux alentours, notamment rue Dancet. Le Parking Migros de la rue Dancet est à 3 min à pied, avec 1h gratuite et ouvert 24h/24.",
    parking: "Le Parking Migros de la rue Dancet",
    parkingBreak: "1h gratuite · à 3 min à pied · ouvert 24h/24.",
    transitTitle: "Transports publics (TPG)",
    trams: "Trams 15 et 17 (arrêt Uni-Mail)\nTrams 12 et 18 (arrêt Pont d'Arve)",
    route: "Y aller",
    payTitle: "Paiements acceptés",
    pay: "American Express · Mastercard · Visa · Carte de débit · Cash · Twint",
    payEuro: "Euros acceptés en espèces · taux de change : 1 € = 0.90 CHF.",
    note: "Les horaires affichés sont les horaires d'ouverture du restaurant.",
  },
  map: { close: "Fermer", title: "Y aller", heading: "Choisir votre application" },
  legal: {
    copyright: "© Pica Pau 2026 · Tous droits réservés",
    privacyTitle: "Confidentialité & cookies",
    privacyText: "Le site Pica Pau n'utilise pas directement de cookies publicitaires ni de mesure d'audience. Des services tiers intégrés, notamment TheFork et Google, peuvent utiliser leurs propres cookies ou technologies similaires et traiter certaines données techniques selon leurs propres politiques.",
  },
  facebookFallback: "Vous ne voyez pas le menu ? Désactivez votre bloqueur de publicités (AdBlock) pour autoriser l’affichage du contenu Facebook.",
  ui: {
    skip: "Aller au contenu",
    skipIntro: "Passer l'intro",
    language: "Langue",
    menuButton: "Menu",
    mainNav: "Navigation principale",
    howMany: "Combien êtes-vous ?",
    people: (n) => `${n} ${n > 1 ? "personnes" : "personne"}`,
    fewer: "Une personne de moins",
    more: "Une personne de plus",
    bookOnline: "Réserver en ligne",
    bookOnlineNew: "Ouvrir la réservation en ligne",
    call: "Appeler",
    orCall: "Ou appelez-nous",
    seeFullCarte: "Voir toute la carte",
    gridView: "Voir en grille",
    trackView: "Voir en défilé",
    pause: "Pause",
    play: "Lecture",
    open: "Ouvert",
    closedNow: "Fermé",
    kitchenUntil: (end, last) => `cuisine jusqu'à ${end}, dernière commande ${last}`,
    kitchenClosed: (end) => `jusqu'à ${end} · cuisine fermée`,
    opensAt: (t) => `ouvre à ${t}`,
    opensTomorrow: (t) => `ouvre demain à ${t}`,
    opensOn: (d, t) => `ouvre ${d} à ${t}`,
    terraceOpen: "Terrasse ouverte",
    terraceClosed: "Terrasse fermée jusqu'en mars",
    tabs: { tram: "Tram", car: "Voiture", parking: "Parking" },
    euroLabel: "Votre addition en CHF",
    euroResult: (e) => `≈ ${e} € en espèces`,
    euroHint: "Indicatif, au taux du restaurant.",
    search: "Rechercher",
    searchPlaceholder: "Un plat, un ingrédient… (ex. bacalhau)",
    searchNone: (q) => `Aucun plat ne correspond à « ${q} ».`,
    clear: "Effacer",
    categories: "Sections de la carte",
    itemCount: (n) => `${n} ${n > 1 ? "plats" : "plat"}`,
    loadFacebook: "Afficher les plats du jour",
    facebookPrivacy: "Le contenu de Facebook ne se charge qu'après votre clic.",
    openFacebook: "Ouvrir la page Facebook",
    newWindow: "(nouvelle fenêtre)",
    photoOf: (d) => `Photo : ${d}`,
    spin: "Faites tourner le sous-verre",
    spinHint: "Glissez pour le faire tourner · ← →",
    prev: "Précédente",
    next: "Suivante",
    photoCount: (i, n) => `Photo ${i} sur ${n}`,
    backHome: "Retour à l'accueil",
    scroll: "Défiler",
    surCommande: "Sur commande",
    chapter: "Chapitre",
    privacyLead: "Confidentialité",
    knock: "Toc toc",
    directions: "Itinéraire",
    reserveDrawer: "Réserver une table",
  },
};

const pt: Copy = {
  tagline: "A Alma de Portugal",
  kicker: "O seu restaurante português em Genebra",
  heroSplit: ["O seu restaurante português", "em Genebra"],
  address: "Rue Hugo-de-Senger 3 · 1205 Genebra",
  city: "1205 Genebra",
  lead: "Mergulhe no coração das tradições com uma cozinha autêntica e generosa.",
  story: [
    "Verdadeiro restaurante familiar, a nossa mesa é um lugar onde se vem partilhar uma refeição acolhedora.",
    "Natural do Porto, a nossa chef prepara com paixão esta verdadeira comida de avó que aquece a alma.",
    "Da incontornável Francesinha à Carne de Porco à Alentejana, passando pelo Bacalhau e pelo nosso Polvo à Lagareiro, cada receita conta uma história.",
  ],
  storyMarks: ["Verdadeiro restaurante familiar", "Natural do Porto", "Da incontornável Francesinha"],
  menuBtn: "Ver a carta",
  bookBtn: "Reservar uma mesa",
  hoursLine: ["Quarta a Domingo", "12:00 – 15:00  |  19:00 – 23:00"],
  badges: ["Cozinha portuguesa", "Espírito familiar", "Sabores do Porto"],
  nav: { home: "Início", carte: "A carta", gallery: "Galeria", info: "Informações", book: "Reservar", daily: "Pratos do dia" },
  menu: {
    pageTitle: "A carta",
    kicker: "A carta",
    subtitle: "Uma carta generosa em torno dos clássicos portugueses, das especialidades do Porto e dos pratos para partilhar.",
    scrollHint: "Deslize para ver a continuação",
    alert: "A carta pode variar consoante os produtos disponíveis e a época.",
  },
  reservation: {
    kicker: "Reserva",
    subtitle: "Para mesas até 4 pessoas, a reserva online está disponível acima.",
    phone: "Para 5 a 8 pessoas, ligue-nos diretamente. A partir de 9 pessoas, normalmente não aceitamos reservas, salvo exceção. Contacte-nos para vermos o que é possível.",
  },
  gallery: { kicker: "Galeria", title: "Algumas imagens da casa.", subtitle: "O ambiente, os detalhes e os pequenos momentos do Pica Pau." },
  info: {
    title: "Informações",
    facebookTitle: "Pratos do dia",
    addressTitle: "Morada",
    phoneTitle: "Telefone",
    phoneText: "Para reservas de 5 ou mais pessoas, ligue-nos.",
    contactTitle: "Contacto e acesso",
    mapCaption: "Ver no Google Maps",
    callLabel: "Ligar para 022 321 60 60",
    hoursTitle: "Horário de abertura",
    closedDays: "Segunda e Terça",
    closed: "Fechado",
    days: "Quarta a Domingo",
    openHours: "12h00–15h00\n19h00–23h00",
    kitchenTitle: "Horário da cozinha",
    kitchenText: "Serviço das 12h00 às 14h00 e das 19h00 às 22h00",
    last: "Último pedido às 13h30 e 21h30",
    spacesTitle: "Os nossos espaços",
    spacesText: "30 lugares sentados distribuídos por vários espaços, assim como uma esplanada com 12 lugares aberta de março a outubro.",
    bookingSpacesTitle: "Reservas e espaços",
    bookingTitle: "Reservas",
    bookingOnline: "Até 4 pessoas",
    bookingOnlineAction: "Online ou por telefone",
    bookingPhone: "De 5 a 8 pessoas",
    bookingPhoneAction: "Por telefone",
    bookingLarge: "A partir de 9 pessoas",
    bookingLargeAction: "Exceção · ligar-nos",
    bookingCall: "LIGAR",
    bookingNote: "A partir de 9 pessoas, normalmente não aceitamos reservas, salvo exceção. Contacte-nos para vermos o que é possível.",
    parkingTitle: "Estacionamento",
    parkingText: "Há lugares de estacionamento em frente ao restaurante, na rua e nas proximidades, nomeadamente na Rue Dancet. O Parking Migros da Rue Dancet fica a 3 minutos a pé, com 1 hora gratuita e aberto 24h/24.",
    parking: "O Parking Migros da Rue Dancet",
    parkingBreak: "1 hora gratuita · a 3 min a pé · aberto 24h/24.",
    transitTitle: "Transportes públicos (TPG)",
    trams: "Trams 15 e 17 (paragem Uni-Mail)\nTrams 12 e 18 (paragem Pont d'Arve)",
    route: "Como chegar",
    payTitle: "Pagamentos aceites",
    pay: "American Express · Mastercard · Visa · Dinheiro · Twint",
    payEuro: "Euros aceites em numerário · taxa de câmbio: 1 € = 0,90 CHF.",
    note: "Os horários apresentados são os horários de abertura do restaurante.",
  },
  map: { close: "Fechar", title: "Como chegar", heading: "Escolha a sua aplicação" },
  legal: {
    copyright: "© Pica Pau 2026 · Todos os direitos reservados",
    privacyTitle: "Privacidade e cookies",
    privacyText: "O site Pica Pau não utiliza diretamente cookies publicitários nem cookies de medição de audiência. Serviços de terceiros integrados, nomeadamente TheFork e Google, podem utilizar os seus próprios cookies ou tecnologias semelhantes e tratar alguns dados técnicos de acordo com as respetivas políticas.",
  },
  facebookFallback: "Não vê o menu? Desative o seu bloqueador de anúncios (AdBlock) para permitir a apresentação do conteúdo do Facebook.",
  ui: {
    skip: "Ir para o conteúdo",
    skipIntro: "Saltar a intro",
    language: "Idioma",
    menuButton: "Menu",
    mainNav: "Navegação principal",
    howMany: "Quantas pessoas são?",
    people: (n) => `${n} ${n > 1 ? "pessoas" : "pessoa"}`,
    fewer: "Menos uma pessoa",
    more: "Mais uma pessoa",
    bookOnline: "Reservar online",
    bookOnlineNew: "Abrir a reserva online",
    call: "Ligar",
    orCall: "Ou ligue-nos",
    seeFullCarte: "Ver a carta completa",
    gridView: "Ver em grelha",
    trackView: "Ver em faixa",
    pause: "Pausa",
    play: "Reproduzir",
    open: "Aberto",
    closedNow: "Fechado",
    kitchenUntil: (end, last) => `cozinha até às ${end}, último pedido às ${last}`,
    kitchenClosed: (end) => `até às ${end} · cozinha fechada`,
    opensAt: (t) => `abre às ${t}`,
    opensTomorrow: (t) => `abre amanhã às ${t}`,
    opensOn: (d, t) => `abre ${d} às ${t}`,
    terraceOpen: "Esplanada aberta",
    terraceClosed: "Esplanada fechada até março",
    tabs: { tram: "Elétrico", car: "Carro", parking: "Parque" },
    euroLabel: "A sua conta em CHF",
    euroResult: (e) => `≈ ${e} € em numerário`,
    euroHint: "Valor indicativo, à taxa do restaurante.",
    search: "Procurar",
    searchPlaceholder: "Um prato, um ingrediente… (ex. bacalhau)",
    searchNone: (q) => `Nenhum prato corresponde a «${q}».`,
    clear: "Limpar",
    categories: "Secções da carta",
    itemCount: (n) => `${n} ${n > 1 ? "pratos" : "prato"}`,
    loadFacebook: "Mostrar os pratos do dia",
    facebookPrivacy: "O conteúdo do Facebook só carrega depois do seu clique.",
    openFacebook: "Abrir a página do Facebook",
    newWindow: "(nova janela)",
    photoOf: (d) => `Foto: ${d}`,
    spin: "Rode a base de copo",
    spinHint: "Arraste para rodar · ← →",
    prev: "Anterior",
    next: "Seguinte",
    photoCount: (i, n) => `Foto ${i} de ${n}`,
    backHome: "Voltar ao início",
    scroll: "Deslizar",
    surCommande: "Por encomenda",
    chapter: "Capítulo",
    privacyLead: "Privacidade",
    knock: "Toc toc",
    directions: "Itinerário",
    reserveDrawer: "Reservar uma mesa",
  },
};

const en: Copy = {
  tagline: "The Soul of Portugal",
  kicker: "Your Portuguese Restaurant in Geneva",
  heroSplit: ["Your Portuguese restaurant", "in Geneva"],
  address: "Rue Hugo-de-Senger 3 · 1205 Geneva",
  city: "1205 Geneva",
  lead: "Step into Portuguese traditions with authentic, generous cooking.",
  story: [
    "A true family restaurant, our table is a place to share a warm meal.",
    "Originally from Porto, our chef prepares with passion this true grandmother’s cooking that warms the soul.",
    "From the iconic Francesinha to Carne de Porco à Alentejana, through Bacalhau and our Polvo à Lagareiro, every recipe tells a story.",
  ],
  storyMarks: ["A true family restaurant", "Originally from Porto", "From the iconic Francesinha"],
  menuBtn: "View the menu",
  bookBtn: "Book a table",
  hoursLine: ["Wednesday to Sunday", "12:00 – 15:00  |  19:00 – 23:00"],
  badges: ["Portuguese cuisine", "Family spirit", "Flavors of Porto"],
  nav: { home: "Home", carte: "Menu", gallery: "Gallery", info: "Info", book: "Book", daily: "Daily specials" },
  menu: {
    pageTitle: "Menu",
    kicker: "The menu",
    subtitle: "A generous menu built around Portuguese classics, Porto specialties and dishes made for sharing.",
    scrollHint: "Scroll to see the rest",
    alert: "The menu may change depending on available products and the season.",
  },
  reservation: {
    kicker: "Booking",
    subtitle: "For tables up to 4 people, online booking is available above.",
    phone: "For 5 to 8 people, please call us directly. From 9 people, reservations are normally not accepted except by special arrangement. Please call us so we can see what is possible.",
  },
  gallery: { kicker: "Gallery", title: "A few images of the house.", subtitle: "The atmosphere, the details and the little moments at Pica Pau." },
  info: {
    title: "Information",
    facebookTitle: "Daily specials",
    addressTitle: "Address",
    phoneTitle: "Phone",
    phoneText: "For reservations of 5 or more people, please call us.",
    contactTitle: "Contact & access",
    mapCaption: "View on Google Maps",
    callLabel: "Call 022 321 60 60",
    hoursTitle: "Opening hours",
    closedDays: "Monday and Tuesday",
    closed: "Closed",
    days: "Wednesday to Sunday",
    openHours: "12:00–15:00\n19:00–23:00",
    kitchenTitle: "Kitchen hours",
    kitchenText: "Service from 12:00 to 14:00 and from 19:00 to 22:00",
    last: "Last order at 13:30 and 21:30",
    spacesTitle: "Our spaces",
    spacesText: "30 seats across several spaces, plus a 12-seat terrace open from March to October.",
    bookingSpacesTitle: "Reservations & spaces",
    bookingTitle: "Reservations",
    bookingOnline: "Up to 4 people",
    bookingOnlineAction: "Online or by phone",
    bookingPhone: "5 to 8 people",
    bookingPhoneAction: "By phone",
    bookingLarge: "From 9 people",
    bookingLargeAction: "Exception · call us",
    bookingCall: "CALL",
    bookingNote: "From 9 people, reservations are normally not accepted, except by special arrangement. Call us so we can see what is possible.",
    parkingTitle: "Parking",
    parkingText: "Parking spaces are available in front of the restaurant, on the street and nearby, including Rue Dancet. Migros parking on Rue Dancet is a 3-minute walk away, with 1 hour free and open 24/7.",
    parking: "Migros parking on Rue Dancet",
    parkingBreak: "1 hour free · 3 min walk · open 24/7.",
    transitTitle: "Public transport (TPG)",
    trams: "Trams 15 and 17 (Uni-Mail stop)\nTrams 12 and 18 (Pont d'Arve stop)",
    route: "Get directions",
    payTitle: "Payment methods",
    pay: "American Express · Mastercard · Visa · Cash · Twint",
    payEuro: "Euros accepted in cash · exchange rate: €1 = CHF 0.90.",
    note: "The displayed hours are the restaurant’s opening hours.",
  },
  map: { close: "Close", title: "Get directions", heading: "Choose your app" },
  legal: {
    copyright: "© Pica Pau 2026 · All rights reserved",
    privacyTitle: "Privacy & cookies",
    privacyText: "The Pica Pau website does not directly use advertising cookies or audience-measurement cookies. Integrated third-party services, notably TheFork and Google, may use their own cookies or similar technologies and process certain technical data according to their own policies.",
  },
  facebookFallback: "Can't see the menu? Turn off your ad blocker (AdBlock) to allow the Facebook content to show.",
  ui: {
    skip: "Skip to content",
    skipIntro: "Skip intro",
    language: "Language",
    menuButton: "Menu",
    mainNav: "Main navigation",
    howMany: "How many of you?",
    people: (n) => `${n} ${n > 1 ? "people" : "person"}`,
    fewer: "One person fewer",
    more: "One person more",
    bookOnline: "Book online",
    bookOnlineNew: "Open online booking",
    call: "Call",
    orCall: "Or call us",
    seeFullCarte: "See the full menu",
    gridView: "View as grid",
    trackView: "View as strip",
    pause: "Pause",
    play: "Play",
    open: "Open",
    closedNow: "Closed",
    kitchenUntil: (end, last) => `kitchen until ${end}, last order ${last}`,
    kitchenClosed: (end) => `until ${end} · kitchen closed`,
    opensAt: (t) => `opens at ${t}`,
    opensTomorrow: (t) => `opens tomorrow at ${t}`,
    opensOn: (d, t) => `opens ${d} at ${t}`,
    terraceOpen: "Terrace open",
    terraceClosed: "Terrace closed until March",
    tabs: { tram: "Tram", car: "Car", parking: "Parking" },
    euroLabel: "Your bill in CHF",
    euroResult: (e) => `≈ €${e} in cash`,
    euroHint: "Indicative, at the restaurant's rate.",
    search: "Search",
    searchPlaceholder: "A dish, an ingredient… (e.g. bacalhau)",
    searchNone: (q) => `No dish matches “${q}”.`,
    clear: "Clear",
    categories: "Menu sections",
    itemCount: (n) => `${n} ${n > 1 ? "dishes" : "dish"}`,
    loadFacebook: "Show the daily specials",
    facebookPrivacy: "The Facebook content only loads after you click.",
    openFacebook: "Open the Facebook page",
    newWindow: "(new window)",
    photoOf: (d) => `Photo: ${d}`,
    spin: "Spin the coaster",
    spinHint: "Drag to spin · ← →",
    prev: "Previous",
    next: "Next",
    photoCount: (i, n) => `Photo ${i} of ${n}`,
    backHome: "Back to home",
    scroll: "Scroll",
    surCommande: "Pre-order",
    chapter: "Chapter",
    privacyLead: "Privacy",
    knock: "Knock knock",
    directions: "Directions",
    reserveDrawer: "Book a table",
  },
};

const it: Copy = {
  tagline: "L'Anima del Portogallo",
  kicker: "Il vostro ristorante portoghese a Ginevra",
  heroSplit: ["Il vostro ristorante portoghese", "a Ginevra"],
  address: "Rue Hugo-de-Senger 3 · 1205 Ginevra",
  city: "1205 Ginevra",
  lead: "Immergetevi nel cuore delle tradizioni con una cucina autentica e generosa.",
  story: [
    "Vero ristorante di famiglia, la nostra tavola è un luogo dove si viene a condividere un pasto caloroso.",
    "Originaria di Porto, la nostra cuoca prepara con passione questa vera cucina della nonna che scalda l’anima.",
    "Dall’immancabile Francesinha alla Carne de Porco à Alentejana, passando per il Bacalhau e il nostro Polvo à Lagareiro, ogni ricetta racconta una storia.",
  ],
  storyMarks: ["Vero ristorante di famiglia", "Originaria di Porto", "Dall’immancabile Francesinha"],
  menuBtn: "Vedi il menu",
  bookBtn: "Prenota un tavolo",
  hoursLine: ["Da mercoledì a domenica", "12:00 – 15:00  |  19:00 – 23:00"],
  badges: ["Cucina portoghese", "Spirito di famiglia", "Sapori di Porto"],
  nav: { home: "Home", carte: "Il menu", gallery: "Galleria", info: "Info", book: "Prenota", daily: "Piatti del giorno" },
  menu: {
    pageTitle: "Il menu",
    kicker: "Il menu",
    subtitle: "Un menu generoso attorno ai classici portoghesi, alle specialità di Porto e ai piatti da condividere.",
    scrollHint: "Scorrete per vedere il seguito",
    alert: "Il menu può cambiare secondo i prodotti disponibili e la stagione.",
  },
  reservation: {
    kicker: "Prenotazione",
    subtitle: "Per tavoli fino a 4 persone, la prenotazione online è disponibile qui sopra.",
    phone: "Per 5-8 persone, chiamateci direttamente. Da 9 persone in su, di norma non accettiamo prenotazioni, salvo eccezioni. Chiamateci per parlarne.",
  },
  gallery: { kicker: "Galleria", title: "Qualche immagine della casa.", subtitle: "L'atmosfera, i dettagli e i piccoli momenti del Pica Pau." },
  info: {
    title: "Informazioni",
    facebookTitle: "Piatti del giorno",
    addressTitle: "Indirizzo",
    phoneTitle: "Telefono",
    phoneText: "Per prenotazioni da 5 persone in su, chiamateci.",
    contactTitle: "Contatti e accesso",
    mapCaption: "Vedi su Google Maps",
    callLabel: "Chiama lo 022 321 60 60",
    hoursTitle: "Orari di apertura",
    closedDays: "Lunedì e martedì",
    closed: "Chiuso",
    days: "Da mercoledì a domenica",
    openHours: "12:00–15:00\n19:00–23:00",
    kitchenTitle: "Orari della cucina",
    kitchenText: "Servizio dalle 12:00 alle 14:00 e dalle 19:00 alle 22:00",
    last: "Ultimo ordine alle 13:30 e alle 21:30",
    spacesTitle: "I nostri spazi",
    spacesText: "30 posti a sedere distribuiti in più sale, e una terrazza da 12 posti aperta da marzo a ottobre.",
    bookingSpacesTitle: "Prenotazioni e spazi",
    bookingTitle: "Prenotazioni",
    bookingOnline: "Fino a 4 persone",
    bookingOnlineAction: "Online o per telefono",
    bookingPhone: "Da 5 a 8 persone",
    bookingPhoneAction: "Per telefono",
    bookingLarge: "Da 9 persone",
    bookingLargeAction: "Eccezione · chiamateci",
    bookingCall: "CHIAMARE",
    bookingNote: "Da 9 persone in su, di norma le prenotazioni non sono accettate, salvo eccezioni. Chiamateci per vedere insieme cosa è possibile.",
    parkingTitle: "Parcheggio",
    parkingText: "Ci sono posti auto davanti al ristorante, nella via e nei dintorni, in particolare in rue Dancet. Il Parking Migros di rue Dancet è a 3 minuti a piedi, con la prima ora gratuita e aperto 24 ore su 24.",
    parking: "Il Parking Migros di rue Dancet",
    parkingBreak: "1 ora gratuita · a 3 min a piedi · aperto 24 ore su 24.",
    transitTitle: "Trasporti pubblici (TPG)",
    trams: "Tram 15 e 17 (fermata Uni-Mail)\nTram 12 e 18 (fermata Pont d'Arve)",
    route: "Come arrivare",
    payTitle: "Pagamenti accettati",
    pay: "American Express · Mastercard · Visa · Carta di debito · Contanti · Twint",
    payEuro: "Euro accettati in contanti · tasso di cambio: 1 € = 0.90 CHF.",
    note: "Gli orari indicati sono gli orari di apertura del ristorante.",
  },
  map: { close: "Chiudi", title: "Come arrivare", heading: "Scegliete la vostra app" },
  legal: {
    copyright: "© Pica Pau 2026 · Tutti i diritti riservati",
    privacyTitle: "Privacy e cookie",
    privacyText: "Il sito Pica Pau non utilizza direttamente cookie pubblicitari né di misurazione dell'audience. I servizi di terzi integrati, in particolare TheFork e Google, possono utilizzare i propri cookie o tecnologie simili e trattare alcuni dati tecnici secondo le proprie politiche.",
  },
  facebookFallback: "Non vedete il menu? Disattivate il blocco degli annunci (AdBlock) per consentire la visualizzazione dei contenuti di Facebook.",
  ui: {
    skip: "Vai al contenuto",
    skipIntro: "Salta l'intro",
    language: "Lingua",
    menuButton: "Menu",
    mainNav: "Navigazione principale",
    howMany: "Quanti siete?",
    people: (n) => `${n} ${n > 1 ? "persone" : "persona"}`,
    fewer: "Una persona in meno",
    more: "Una persona in più",
    bookOnline: "Prenota online",
    bookOnlineNew: "Apri la prenotazione online",
    call: "Chiama",
    orCall: "Oppure chiamateci",
    seeFullCarte: "Vedi tutto il menu",
    gridView: "Vedi in griglia",
    trackView: "Vedi in fila",
    pause: "Pausa",
    play: "Riproduci",
    open: "Aperto",
    closedNow: "Chiuso",
    kitchenUntil: (end, last) => `cucina fino alle ${end}, ultimo ordine alle ${last}`,
    kitchenClosed: (end) => `fino alle ${end} · cucina chiusa`,
    opensAt: (t) => `apre alle ${t}`,
    opensTomorrow: (t) => `apre domani alle ${t}`,
    opensOn: (d, t) => `apre ${d} alle ${t}`,
    terraceOpen: "Terrazza aperta",
    terraceClosed: "Terrazza chiusa fino a marzo",
    tabs: { tram: "Tram", car: "Auto", parking: "Parcheggio" },
    euroLabel: "Il vostro conto in CHF",
    euroResult: (e) => `≈ ${e} € in contanti`,
    euroHint: "Indicativo, al tasso del ristorante.",
    search: "Cerca",
    searchPlaceholder: "Un piatto, un ingrediente… (es. bacalhau)",
    searchNone: (q) => `Nessun piatto corrisponde a «${q}».`,
    clear: "Cancella",
    categories: "Sezioni del menu",
    itemCount: (n) => `${n} ${n > 1 ? "piatti" : "piatto"}`,
    loadFacebook: "Mostra i piatti del giorno",
    facebookPrivacy: "I contenuti di Facebook si caricano solo dopo il vostro clic.",
    openFacebook: "Apri la pagina Facebook",
    newWindow: "(nuova finestra)",
    photoOf: (d) => `Foto: ${d}`,
    spin: "Fate girare il sottobicchiere",
    spinHint: "Trascinate per farlo girare · ← →",
    prev: "Precedente",
    next: "Successiva",
    photoCount: (i, n) => `Foto ${i} di ${n}`,
    backHome: "Torna alla home",
    scroll: "Scorri",
    surCommande: "Su ordinazione",
    chapter: "Capitolo",
    privacyLead: "Privacy",
    knock: "Toc toc",
    directions: "Indicazioni",
    reserveDrawer: "Prenota un tavolo",
  },
};

const de: Copy = {
  tagline: "Die Seele Portugals",
  kicker: "Ihr portugiesisches Restaurant in Genf",
  heroSplit: ["Ihr portugiesisches Restaurant", "in Genf"],
  address: "Rue Hugo-de-Senger 3 · 1205 Genf",
  city: "1205 Genf",
  lead: "Tauchen Sie ein in die Traditionen – mit einer authentischen und grosszügigen Küche.",
  story: [
    "Als echtes Familienrestaurant ist unser Tisch ein Ort, an dem man eine herzliche Mahlzeit teilt.",
    "Unsere Köchin stammt aus Porto und kocht mit Leidenschaft diese echte Grossmutterküche, die die Seele wärmt.",
    "Von der unverzichtbaren Francesinha über die Carne de Porco à Alentejana bis zum Bacalhau und unserem Polvo à Lagareiro – jedes Rezept erzählt eine Geschichte.",
  ],
  storyMarks: ["Echtes Familienrestaurant", "Aus Porto", "Von der Francesinha"],
  menuBtn: "Speisekarte ansehen",
  bookBtn: "Tisch reservieren",
  hoursLine: ["Mittwoch bis Sonntag", "12:00 – 15:00  |  19:00 – 23:00"],
  badges: ["Portugiesische Küche", "Familiengeist", "Aromen aus Porto"],
  nav: { home: "Startseite", carte: "Speisekarte", gallery: "Galerie", info: "Infos", book: "Reservieren", daily: "Tagesgerichte" },
  menu: {
    pageTitle: "Speisekarte",
    kicker: "Die Speisekarte",
    subtitle: "Eine grosszügige Karte rund um portugiesische Klassiker, Spezialitäten aus Porto und Gerichte zum Teilen.",
    scrollHint: "Scrollen Sie weiter",
    alert: "Die Karte kann sich je nach verfügbaren Produkten und Saison ändern.",
  },
  reservation: {
    kicker: "Reservation",
    subtitle: "Für Tische bis 4 Personen ist die Online-Reservation oben verfügbar.",
    phone: "Für 5 bis 8 Personen rufen Sie uns bitte direkt an. Ab 9 Personen nehmen wir in der Regel keine Reservationen an, ausser in Ausnahmefällen. Rufen Sie uns an, um darüber zu sprechen.",
  },
  gallery: { kicker: "Galerie", title: "Ein paar Bilder aus dem Haus.", subtitle: "Die Stimmung, die Details und die kleinen Momente im Pica Pau." },
  info: {
    title: "Informationen",
    facebookTitle: "Tagesgerichte",
    addressTitle: "Adresse",
    phoneTitle: "Telefon",
    phoneText: "Für Reservationen ab 5 Personen rufen Sie uns bitte an.",
    contactTitle: "Kontakt & Anreise",
    mapCaption: "Auf Google Maps ansehen",
    callLabel: "022 321 60 60 anrufen",
    hoursTitle: "Öffnungszeiten",
    closedDays: "Montag und Dienstag",
    closed: "Geschlossen",
    days: "Mittwoch bis Sonntag",
    openHours: "12:00–15:00\n19:00–23:00",
    kitchenTitle: "Küchenzeiten",
    kitchenText: "Service von 12:00 bis 14:00 und von 19:00 bis 22:00",
    last: "Letzte Bestellung um 13:30 und 21:30",
    spacesTitle: "Unsere Räume",
    spacesText: "30 Sitzplätze in mehreren Räumen sowie eine Terrasse mit 12 Plätzen, geöffnet von März bis Oktober.",
    bookingSpacesTitle: "Reservationen & Räume",
    bookingTitle: "Reservationen",
    bookingOnline: "Bis 4 Personen",
    bookingOnlineAction: "Online oder per Telefon",
    bookingPhone: "5 bis 8 Personen",
    bookingPhoneAction: "Per Telefon",
    bookingLarge: "Ab 9 Personen",
    bookingLargeAction: "Ausnahme · rufen Sie uns an",
    bookingCall: "ANRUFEN",
    bookingNote: "Ab 9 Personen nehmen wir normalerweise keine Reservationen an, ausser in Ausnahmefällen. Rufen Sie uns an, damit wir gemeinsam schauen können, was möglich ist.",
    parkingTitle: "Parkieren",
    parkingText: "Parkplätze gibt es vor dem Restaurant, in der Strasse und in der Umgebung, insbesondere an der Rue Dancet. Das Parking Migros an der Rue Dancet ist 3 Minuten zu Fuss entfernt, mit 1 Stunde gratis und rund um die Uhr geöffnet.",
    parking: "Das Parking Migros an der Rue Dancet",
    parkingBreak: "1 Stunde gratis · 3 Min. zu Fuss · rund um die Uhr geöffnet.",
    transitTitle: "Öffentlicher Verkehr (TPG)",
    trams: "Tram 15 und 17 (Haltestelle Uni-Mail)\nTram 12 und 18 (Haltestelle Pont d'Arve)",
    route: "Anfahrt",
    payTitle: "Zahlungsmittel",
    pay: "American Express · Mastercard · Visa · Debitkarte · Bargeld · Twint",
    payEuro: "Euro in bar akzeptiert · Wechselkurs: 1 € = 0.90 CHF.",
    note: "Die angezeigten Zeiten sind die Öffnungszeiten des Restaurants.",
  },
  map: { close: "Schliessen", title: "Anfahrt", heading: "Wählen Sie Ihre App" },
  legal: {
    copyright: "© Pica Pau 2026 · Alle Rechte vorbehalten",
    privacyTitle: "Datenschutz & Cookies",
    privacyText: "Die Website von Pica Pau verwendet selbst keine Werbe- oder Reichweiten-Cookies. Eingebundene Dienste von Dritten, insbesondere TheFork und Google, können eigene Cookies oder ähnliche Technologien verwenden und gewisse technische Daten nach ihren eigenen Richtlinien bearbeiten.",
  },
  facebookFallback: "Sie sehen das Menü nicht? Deaktivieren Sie Ihren Werbeblocker (AdBlock), damit die Facebook-Inhalte angezeigt werden.",
  ui: {
    skip: "Zum Inhalt springen",
    skipIntro: "Intro überspringen",
    language: "Sprache",
    menuButton: "Menü",
    mainNav: "Hauptnavigation",
    howMany: "Wie viele sind Sie?",
    people: (n) => `${n} ${n > 1 ? "Personen" : "Person"}`,
    fewer: "Eine Person weniger",
    more: "Eine Person mehr",
    bookOnline: "Online reservieren",
    bookOnlineNew: "Online-Reservation öffnen",
    call: "Anrufen",
    orCall: "Oder rufen Sie uns an",
    seeFullCarte: "Ganze Speisekarte ansehen",
    gridView: "Als Raster anzeigen",
    trackView: "Als Band anzeigen",
    pause: "Pause",
    play: "Abspielen",
    open: "Geöffnet",
    closedNow: "Geschlossen",
    kitchenUntil: (end, last) => `Küche bis ${end}, letzte Bestellung ${last}`,
    kitchenClosed: (end) => `bis ${end} · Küche geschlossen`,
    opensAt: (t) => `öffnet um ${t}`,
    opensTomorrow: (t) => `öffnet morgen um ${t}`,
    opensOn: (d, t) => `öffnet ${d} um ${t}`,
    terraceOpen: "Terrasse geöffnet",
    terraceClosed: "Terrasse bis März geschlossen",
    tabs: { tram: "Tram", car: "Auto", parking: "Parking" },
    euroLabel: "Ihre Rechnung in CHF",
    euroResult: (e) => `≈ ${e} € in bar`,
    euroHint: "Richtwert, zum Kurs des Restaurants.",
    search: "Suchen",
    searchPlaceholder: "Ein Gericht, eine Zutat … (z. B. bacalhau)",
    searchNone: (q) => `Kein Gericht passt zu «${q}».`,
    clear: "Löschen",
    categories: "Bereiche der Speisekarte",
    itemCount: (n) => `${n} ${n > 1 ? "Gerichte" : "Gericht"}`,
    loadFacebook: "Tagesgerichte anzeigen",
    facebookPrivacy: "Die Facebook-Inhalte laden erst nach Ihrem Klick.",
    openFacebook: "Facebook-Seite öffnen",
    newWindow: "(neues Fenster)",
    photoOf: (d) => `Foto: ${d}`,
    spin: "Untersetzer drehen",
    spinHint: "Ziehen zum Drehen · ← →",
    prev: "Zurück",
    next: "Weiter",
    photoCount: (i, n) => `Foto ${i} von ${n}`,
    backHome: "Zur Startseite",
    scroll: "Scrollen",
    surCommande: "Auf Bestellung",
    chapter: "Kapitel",
    privacyLead: "Datenschutz",
    knock: "Klopf klopf",
    directions: "Route",
    reserveDrawer: "Tisch reservieren",
  },
};

export const COPY: L10n<Copy> = { fr, en, pt, it, de };
export const copy = (lang: Lang) => COPY[lang];

/** The booking-drawer marquee is the same in every language. */
export const BOOK_MARQUEE = "RÉSERVER ✱ RESERVAR ✱ BOOK A TABLE ✱ PRENOTARE ✱ RESERVIEREN ✱";
/** Pinned, never translated: the band every page of this proposal carries (see CLAUDE.md). */
export const PROPOSAL_LABEL = "Proposta de design · não é o site oficial";

/** Weekday names for "opens Wednesday at 12:00" (index 0 = Sunday). */
export const DAYS: L10n<string[]> = {
  fr: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  pt: ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"],
  it: ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"],
  de: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
};

/** Names of the four classics as each language's own presentation text writes them. */
export const CLASSIC_NAMES: L10n<[string, string, string, string]> = {
  fr: ["Francesinha", "Carne de Porco à Alentejana", "Bacalhau", "Poulpe à Lagareiro"],
  en: ["Francesinha", "Carne de Porco à Alentejana", "Bacalhau", "Polvo à Lagareiro"],
  pt: ["Francesinha", "Carne de Porco à Alentejana", "Bacalhau", "Polvo à Lagareiro"],
  it: ["Francesinha", "Carne de Porco à Alentejana", "Bacalhau", "Polvo à Lagareiro"],
  de: ["Francesinha", "Carne de Porco à Alentejana", "Bacalhau", "Polvo à Lagareiro"],
};
