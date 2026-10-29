// The restaurant's own words and facts, copied from https://www.leportugais.ch (French, verbatim) with
// their translations. Facts (names, numbers, the address, the tram lines) are identical in every language.
import type { L } from "@/i18n";

export const BUSINESS = {
  name: "Le Portugais",
  fullName: "Restaurant Marisqueira Le Portugais",
  street: "Boulevard du Pont d’Arve 59",
  city: "1205 Genève",
  country: "Suisse",
  district: "Plainpalais",
  phones: [
    { label: "+41 (0)22 329 40 98", tel: "+41223294098" },
    { label: "+41 (0)79 200 59 23", tel: "+41792005923" },
  ],
  /** The home page gives only the 079 number, for availability and deliveries. */
  mobile: { label: "079 200 59 23", tel: "+41792005923" },
  email: "leportugais@bluewin.ch",
  founded: "1973-02-01",
  mapUrl: "https://www.google.com/maps/place/Le+Portugais+-+Marisqueira/@46.1937158,6.1382858,17z/data=!3m1!4b1!4m2!3m1!1s0x478c7ad5c30e704d:0xb44850c388aa60f2",
  appleUrl: "https://maps.apple.com/?address=Boulevard%20du%20Pont%20d%27Arve%2059,%201205%20Gen%C3%A8ve,%20Suisse&q=Le%20Portugais",
  wazeUrl: "https://waze.com/ul?q=Boulevard%20du%20Pont%20d%27Arve%2059%2C%201205%20Gen%C3%A8ve&navigate=yes",
  mapEmbed: "https://www.google.com/maps?q=Le+Portugais+Marisqueira,+Boulevard+du+Pont+d%27Arve+59,+1205+Gen%C3%A8ve&output=embed",
  facebook: "https://www.facebook.com/restaurantleportugais/",
  /** Closed on Sunday (0) and Monday (1), the only hours information the live site gives. */
  closedDays: [0, 1],
  copyright: "© 2026 - Le Portugais | Restaurant Portugais à Genève. All rights reserved.",
  oldSite: "https://www.leportugais.ch",
};

const l = (fr: string, en: string, pt: string, it: string, de: string): L => ({ fr, en, pt, it, de });

export const TEXT = {
  /** The live home page's line under "Actualités". */
  heroLine: l(
    "Le restaurant Le Portugais vous propose une cuisine gastronomique portugaise, de nombreuses spécialités à base de poisson et de fruits de mer notamment le meilleur bacalhau de Genève mais il vous invite également à découvrir chaque semaine des plats du jour .",
    "Le Portugais offers Portuguese gastronomic cuisine and many fish and seafood specialities, including the best bacalhau in Geneva, and also invites you to discover new dishes of the day every week.",
    "O restaurante Le Portugais propõe-lhe uma cozinha gastronómica portuguesa e numerosas especialidades de peixe e marisco, nomeadamente o melhor bacalhau de Genebra, e convida-o também a descobrir todas as semanas os pratos do dia.",
    "Il ristorante Le Portugais vi propone una cucina gastronomica portoghese e numerose specialità a base di pesce e frutti di mare, tra cui il miglior bacalhau di Ginevra, e vi invita anche a scoprire ogni settimana i piatti del giorno.",
    "Das Restaurant Le Portugais bietet Ihnen portugiesische Gourmetküche und zahlreiche Fisch- und Meeresfrüchtespezialitäten, darunter den besten Bacalhau von Genf, und lädt Sie ausserdem ein, jede Woche die Tagesgerichte zu entdecken.",
  ),
  /** Hero headline, from the same line: left half white, right half gold. */
  heroLeft: l("Le meilleur bacalhau", "The best bacalhau", "O melhor bacalhau", "Il miglior bacalhau", "Der beste Bacalhau"),
  heroRight: l("de Genève", "in Geneva", "de Genebra", "di Ginevra", "von Genf"),
  founding: l(
    "Créé le 1er février 1973 par José et Sotera Martins, Le Portugais est le premier Restaurant de gastronomie Lusitanienne hors du Portugal et CPLP, il est un des plus anciens Restaurant en Suisse à être exploité par la même famille depuis deux générations.",
    "Founded on 1 February 1973 by José and Sotera Martins, Le Portugais is the first restaurant of Lusitanian gastronomy outside Portugal and the CPLP, and one of the oldest restaurants in Switzerland to have been run by the same family for two generations.",
    "Fundado a 1 de fevereiro de 1973 por José e Sotera Martins, Le Portugais é o primeiro restaurante de gastronomia lusitana fora de Portugal e da CPLP, e um dos mais antigos restaurantes da Suíça a ser explorado pela mesma família há duas gerações.",
    "Fondato il 1° febbraio 1973 da José e Sotera Martins, Le Portugais è il primo ristorante di gastronomia lusitana fuori dal Portogallo e dalla CPLP, ed è uno dei ristoranti più antichi della Svizzera gestiti dalla stessa famiglia da due generazioni.",
    "Am 1. Februar 1973 von José und Sotera Martins gegründet, ist Le Portugais das erste Restaurant lusitanischer Gastronomie ausserhalb Portugals und der CPLP und eines der ältesten Restaurants der Schweiz, das seit zwei Generationen von derselben Familie geführt wird.",
  ),
  /** The statement band: the founding sentence up to "…hors du Portugal et de la CPLP". */
  statement: l(
    "Créé le 1er février 1973 par José et Sotera Martins, Le Portugais est le premier Restaurant de gastronomie Lusitanienne hors du Portugal et CPLP",
    "Founded on 1 February 1973 by José and Sotera Martins, Le Portugais is the first restaurant of Lusitanian gastronomy outside Portugal and the CPLP",
    "Fundado a 1 de fevereiro de 1973 por José e Sotera Martins, Le Portugais é o primeiro restaurante de gastronomia lusitana fora de Portugal e da CPLP",
    "Fondato il 1° febbraio 1973 da José e Sotera Martins, Le Portugais è il primo ristorante di gastronomia lusitana fuori dal Portogallo e dalla CPLP",
    "Am 1. Februar 1973 von José und Sotera Martins gegründet, ist Le Portugais das erste Restaurant lusitanischer Gastronomie ausserhalb Portugals und der CPLP",
  ),
  cuisine: l(
    "L’incontournable lieu pour découvrir la cuisine traditionnelle, les saveurs océanes aux cuissons courtes, mais aussi divers plats de viandes, plats végans, pour une petite faim, quelques tapas entre amis ou un repas festif.",
    "The essential place to discover traditional cooking and ocean flavours cooked briefly, but also a range of meat dishes and vegan dishes, for a light bite, a few tapas with friends or a festive meal.",
    "O lugar incontornável para descobrir a cozinha tradicional, os sabores do oceano em cozeduras curtas, mas também vários pratos de carne e pratos vegan, para uma pequena fome, umas tapas entre amigos ou uma refeição festiva.",
    "Il luogo imperdibile per scoprire la cucina tradizionale, i sapori dell’oceano dalle cotture brevi, ma anche diversi piatti di carne e piatti vegani, per un piccolo appetito, qualche tapas tra amici o un pasto di festa.",
    "Der Ort, um die traditionelle Küche zu entdecken, die Aromen des Ozeans mit kurzen Garzeiten, aber auch verschiedene Fleischgerichte und vegane Gerichte, für den kleinen Hunger, ein paar Tapas unter Freunden oder ein festliches Essen.",
  ),
  gluten: l(
    "Toute notre cuisine est sans gluten, à l’exception du pain (possibilité sur demande)",
    "All our cooking is gluten-free, except the bread (gluten-free bread possible on request)",
    "Toda a nossa cozinha é sem glúten, à exceção do pão (possível a pedido)",
    "Tutta la nostra cucina è senza glutine, ad eccezione del pane (possibile su richiesta)",
    "Unsere ganze Küche ist glutenfrei, ausser dem Brot (auf Anfrage möglich)",
  ),
  room: l(
    "Le Portugais vous attend dans son écrin fleuri et climatisé. Des poissons sauvages, des viandes genevoises (GRTA) et, en saison, des produits de notre potager.",
    "Le Portugais awaits you in its air-conditioned setting full of flowers. Wild fish, Geneva meat (GRTA) and, in season, produce from our own vegetable garden.",
    "Le Portugais espera-o no seu espaço florido e climatizado. Peixes selvagens, carnes de Genebra (GRTA) e, na época, produtos da nossa horta.",
    "Le Portugais vi aspetta nel suo scrigno fiorito e climatizzato. Pesci selvaggi, carni ginevrine (GRTA) e, in stagione, prodotti del nostro orto.",
    "Le Portugais erwartet Sie in seinem blumengeschmückten, klimatisierten Rahmen. Wildfisch, Genfer Fleisch (GRTA) und, in der Saison, Produkte aus unserem Gemüsegarten.",
  ),
  services: l(
    "Plats à l’emporter, service traiteur, vente et livraison de vins et portos (choix de productions intégrée, bio et biodynamique)",
    "Take-away dishes, catering, sale and delivery of wines and ports (a choice of integrated, organic and biodynamic production)",
    "Pratos para levar, serviço de catering, venda e entrega de vinhos e portos (seleção de produção integrada, biológica e biodinâmica)",
    "Piatti da asporto, servizio catering, vendita e consegna di vini e porti (scelta di produzioni integrate, biologiche e biodinamiche)",
    "Gerichte zum Mitnehmen, Catering, Verkauf und Lieferung von Weinen und Portweinen (Auswahl aus integrierter, biologischer und biodynamischer Produktion)",
  ),
  availability: l(
    "Tous les plats présentés sur la carte online ne sont pas forcément disponibles pour des raisons de saisons ou d’arrivages. Informations sur les plats disponible ou les arrivages au 079 200 59 23 ou leportugais@bluewin.ch",
    "Not every dish on the online menu is necessarily available, depending on the season and on deliveries. For the dishes available or today’s arrivals, call 079 200 59 23 or write to leportugais@bluewin.ch",
    "Nem todos os pratos apresentados na ementa online estão necessariamente disponíveis, por razões de época ou de chegadas. Informações sobre os pratos disponíveis ou as chegadas pelo 079 200 59 23 ou leportugais@bluewin.ch",
    "Non tutti i piatti presentati nel menu online sono necessariamente disponibili, per ragioni di stagione o di arrivi. Informazioni sui piatti disponibili o sugli arrivi al 079 200 59 23 o a leportugais@bluewin.ch",
    "Nicht alle Gerichte der Online-Karte sind immer verfügbar, je nach Saison und Lieferungen. Auskunft über die verfügbaren Gerichte oder die Lieferungen unter 079 200 59 23 oder leportugais@bluewin.ch",
  ),
  platsDuJour: l(
    "Chaque jour à midi, 3 Plats du Jour, viande ou poisson ou Vegan à 25.-",
    "Every day at lunchtime, 3 dishes of the day, meat or fish or vegan, at 25.-",
    "Todos os dias ao almoço, 3 pratos do dia, carne ou peixe ou vegan, a 25.-",
    "Ogni giorno a pranzo, 3 piatti del giorno, carne o pesce o vegano, a 25.-",
    "Jeden Tag am Mittag 3 Tagesgerichte, Fleisch oder Fisch oder vegan, zu 25.-",
  ),
  platsTitle: l("3 plats du jour", "3 dishes of the day", "3 pratos do dia", "3 piatti del giorno", "3 Tagesgerichte"),
  closed: l("Fermé le Dimanche et le Lundi.", "Closed on Sundays and Mondays.", "Encerrado ao domingo e à segunda-feira.", "Chiuso la domenica e il lunedì.", "Sonntag und Montag geschlossen."),
  booking: l("Réservation par téléphone", "Bookings by phone", "Reservas por telefone", "Prenotazione per telefono", "Reservation per Telefon"),
  groups: l(
    "Ouverture possible pour les groupes dès 20 adultes.",
    "Opening possible for groups of 20 adults or more.",
    "Abertura possível para grupos a partir de 20 adultos.",
    "Apertura possibile per gruppi a partire da 20 adulti.",
    "Öffnung für Gruppen ab 20 Erwachsenen möglich.",
  ),
  package: l(
    "Possibilité de forfait pour la totalité du restaurant sans limite de base de clients.",
    "A package for the whole restaurant is possible, with no minimum number of guests.",
    "Possibilidade de pacote para a totalidade do restaurante, sem número mínimo de clientes.",
    "Possibilità di forfait per l’intero ristorante, senza numero minimo di ospiti.",
    "Pauschale für das ganze Restaurant möglich, ohne Mindestzahl an Gästen.",
  ),
  parking: l(
    "PARKING: Uni Mail, entrée Bd Carl-Vogt ou Quai Ernest-Ansermet",
    "Parking: Uni Mail, entrance Bd Carl-Vogt or Quai Ernest-Ansermet",
    "Estacionamento: Uni Mail, entrada pelo Bd Carl-Vogt ou pelo Quai Ernest-Ansermet",
    "Parcheggio: Uni Mail, ingresso Bd Carl-Vogt o Quai Ernest-Ansermet",
    "Parking: Uni Mail, Einfahrt Bd Carl-Vogt oder Quai Ernest-Ansermet",
  ),
  tpg: l("Transports publics (TPG)", "Public transport (TPG)", "Transportes públicos (TPG)", "Trasporti pubblici (TPG)", "Öffentlicher Verkehr (TPG)"),
  tramA: l(
    "tram 15 et 17 arrêt Unimail (presque face au Restaurant)",
    "trams 15 and 17, stop Unimail (almost opposite the restaurant)",
    "elétricos 15 e 17, paragem Unimail (quase em frente ao restaurante)",
    "tram 15 e 17, fermata Unimail (quasi di fronte al ristorante)",
    "Tram 15 und 17, Haltestelle Unimail (fast gegenüber dem Restaurant)",
  ),
  tramB: l(
    "12 et 18 arrêt Pont d’Arve (marche 6 minutes en direction des Acacias)",
    "trams 12 and 18, stop Pont d’Arve (a 6-minute walk towards Acacias)",
    "elétricos 12 e 18, paragem Pont d’Arve (6 minutos a pé em direção a Acacias)",
    "tram 12 e 18, fermata Pont d’Arve (6 minuti a piedi in direzione Acacias)",
    "Tram 12 und 18, Haltestelle Pont d’Arve (6 Minuten zu Fuss Richtung Acacias)",
  ),
  leman: l(
    "Léman Express arrêt Pont Rouge- Lancy puis direction Plainpalais",
    "Léman Express, stop Pont Rouge-Lancy, then towards Plainpalais",
    "Léman Express, paragem Pont Rouge-Lancy, depois em direção a Plainpalais",
    "Léman Express, fermata Pont Rouge-Lancy, poi in direzione Plainpalais",
    "Léman Express, Haltestelle Pont Rouge-Lancy, dann Richtung Plainpalais",
  ),
  emailLabel: l("Adresse mail", "E-mail", "E-mail", "E-mail", "E-Mail"),
  englishLine: l(
    "",
    "Welcome! Ask us which fresh fish we have this week.",
    "",
    "",
    "",
  ),
  signature: "José & Sotera Martins",
  strip: ["LE PORTUGAIS", "MARISQUEIRA", "DEPUIS 1973", "BACALHAU", "POLVO", "GAMBAS", "VINHOS & PORTOS", "PLAINPALAIS"],
  stripSince: l("DEPUIS 1973", "SINCE 1973", "DESDE 1973", "DAL 1973", "SEIT 1973"),
};

/** The six links of the live "Liens" page: labels as written there, descriptions translated from its English. */
export const LINKS: { label: string; url: string; desc: L; wine?: boolean }[] = [
  { label: "Revistas de Vinhos", url: "http://www.revistadevinhos.pt/", wine: true, desc: l("Revistas de Vinhos", "Revistas de Vinhos", "Revistas de Vinhos", "Revistas de Vinhos", "Revistas de Vinhos") },
  { label: "Essência do vinho", url: "http://www.essenciadovinho.com/", wine: true, desc: l("L’autre magazine des vins portugais", "The other magazine about Portuguese wines", "A outra revista sobre vinhos portugueses", "L’altra rivista sui vini portoghesi", "Das andere Magazin über portugiesische Weine") },
  { label: "Instituto dos Vinhos do Douro e Porto", url: "http://www.ivdp.pt/", wine: true, desc: l("Le fameux institut du vin de Porto", "The much-vaunted Institute of Port wine", "O afamado Instituto do Vinho do Porto", "Il celebre Istituto del vino di Porto", "Das vielgerühmte Portwein-Institut") },
  { label: "Portal do Fado", url: "http://www.portaldofado.net/", desc: l("Tout sur le fado", "All about fado", "Tudo sobre o fado", "Tutto sul fado", "Alles über Fado") },
  { label: "Visit portugal", url: "https://www.visitportugal.com/fr", desc: l("Office du tourisme du Portugal", "Tourism office of Portugal", "Turismo de Portugal", "Ufficio del turismo del Portogallo", "Tourismusbüro Portugals") },
  { label: "Pique Assiette, Cod fish by Fernando Martins", url: "http://www.pique-assiette.ch/recettes_archives.php?id=431#.VzCYVPmLTIV", desc: l("Émissions Pique Assiette", "Pique Assiette programmes", "Programas Pique Assiette", "Trasmissioni Pique Assiette", "Pique-Assiette-Sendungen") },
];
