// The home page texts. French is verbatim from https://zedopipo.ch/; the story's English and Portuguese
// are the owner's own, verbatim; the other versions are translations.
import { L, type Localized } from "./i18n";

export const HERO_TITLE = "ZÉ-DO-PIPO.";

export const SLIDES: { title: Localized; text: Localized; side: "terra" | "mar" }[] = [
  {
    side: "terra",
    title: L("Une cuisine généreuse et populaire", "Generous, popular cooking", "Uma cozinha generosa e popular", "Una cucina generosa e popolare", "Eine grosszügige, volksnahe Küche"),
    // English and Portuguese: the owner's own wording for the plat du jour on the menu page
    text: L(
      "Du lundi au vendredi, nous vous proposons un plat du jour soigné.",
      "From Monday to Friday, we serve a tasty daily special.",
      "De segunda a sexta-feira, propomos um prato do dia cuidadosamente confeccionado.",
      "Dal lunedì al venerdì vi proponiamo un piatto del giorno curato.",
      "Von Montag bis Freitag servieren wir Ihnen ein sorgfältig zubereitetes Tagesgericht.",
    ),
  },
  {
    side: "mar",
    title: L("Un voyage culinaire entre mer et terre", "A culinary journey between sea and land", "Uma viagem culinária entre o mar e a terra", "Un viaggio culinario tra mare e terra", "Eine kulinarische Reise zwischen Meer und Land"),
    text: L(
      "Découvrez la cuisine portugaise et les spécialités qui font la renommée du Zé-do-Pipo.",
      "Discover Portuguese cuisine and the specialities that made Zé-do-Pipo’s name.",
      "Descubra a cozinha portuguesa e as especialidades que fazem a fama do Zé-do-Pipo.",
      "Scoprite la cucina portoghese e le specialità che hanno reso famoso lo Zé-do-Pipo.",
      "Entdecken Sie die portugiesische Küche und die Spezialitäten, die das Zé-do-Pipo bekannt gemacht haben.",
    ),
  },
];
export const OUR_MENU = L("Notre menu", "Our menu", "A nossa ementa", "Il nostro menù", "Unsere Speisekarte");

export const GROUPS = {
  title: L("Réservation de groupe", "Group bookings", "Reservas de grupo", "Prenotazioni di gruppo", "Gruppenreservationen"),
  lead: L("Heureux de vous accueillir", "Happy to welcome you", "Felizes por o receber", "Felici di accogliervi", "Wir freuen uns auf Sie"),
  text: L(
    "Qu’il s’agisse d’un repas d’équipe, une sortie entre amis ou une excursion touristique, contactez-nous pour discuter d’un menu adapté à votre budget et à vos besoins.",
    "Whether it’s a team meal, an outing with friends or a sightseeing tour, contact us to discuss a menu that suits your budget and your needs.",
    "Seja uma refeição de equipa, um passeio entre amigos ou uma excursão turística, contacte-nos para falarmos de uma ementa adaptada ao seu orçamento e às suas necessidades.",
    "Che si tratti di un pranzo di squadra, di un’uscita tra amici o di un’escursione turistica, contattateci per definire un menù adatto al vostro budget e alle vostre esigenze.",
    "Ob Teamessen, Ausflug mit Freunden oder Reisegruppe: Kontaktieren Sie uns, um ein Menü zu besprechen, das zu Ihrem Budget und Ihren Wünschen passt.",
  ),
};

export const TEASER = {
  title: L("Notre menu", "Our menu", "A nossa ementa", "Il nostro menù", "Unsere Speisekarte"),
  line1: L("Quelle que soit votre occasion, nous la rendons inoubliable !", "Whatever the occasion, we make it unforgettable!", "Seja qual for a ocasião, tornamo-la inesquecível!", "Qualunque sia l’occasione, la rendiamo indimenticabile!", "Was auch immer der Anlass ist, wir machen ihn unvergesslich!"),
  line2: L("Nous ne faisons pas que cuisiner, nous vous régalons avec nos spécialités.", "We don’t just cook: we treat you to our specialities.", "Não nos limitamos a cozinhar: deliciamo-lo com as nossas especialidades.", "Non ci limitiamo a cucinare: vi deliziamo con le nostre specialità.", "Wir kochen nicht nur, wir verwöhnen Sie mit unseren Spezialitäten."),
  justEat: L(
    "Vous pouvez également passer commande en ligne via notre partenaire livraison JUST EAT",
    "You can also order online through our delivery partner JUST EAT",
    "Também pode encomendar online através do nosso parceiro de entregas JUST EAT",
    "Potete anche ordinare online tramite il nostro partner di consegna JUST EAT",
    "Sie können auch online über unseren Lieferpartner JUST EAT bestellen",
  ),
  full: L("Voir le menu complet", "See the full menu", "Ver a ementa completa", "Vedi il menù completo", "Ganze Speisekarte ansehen"),
  specialities: L("Nos spécialités portugaises", "Our Portuguese specialities", "As nossas especialidades portuguesas", "Le nostre specialità portoghesi", "Unsere portugiesischen Spezialitäten"),
};

export const STORY: Record<"fr" | "en" | "pt" | "it" | "de", string[]> = {
  fr: [
    "Depuis 1989 le Zé-do-pipo vous accueille du lundi au samedi, dans un cadre chaleureux et élégant, situé au cœur de Genève à 5 min de la gare Cornavin.",
    "Venez découvrir des plats inspirés de la gastronomie portugaise et les spécialités qui ont contribué à la réputation du restaurant: entrecôte sauce maison, bacalhau à lagareiro, poulet piri piri ou le riz au fruits de mer. De plus, le Zé-do-pipo propose divers plats du jour et suggestions de la semaine.",
    "La cave du Zé-do-pipo ne manquera pas de vous surprendre avec sa sélection de vins portugais qui vous emmènera dans un voyage du nord au sud du Portugal.",
    "Au plaisir de vous rencontrer et de partager un moment convivial avec vous.",
  ],
  en: [
    "Since 1989, Zé-do-pipo welcomes you from Monday to Saturday, in a warm and elegant setting, located in the heart of Geneva, 5 minutes from the Cornavin train station.",
    "Come and discover dishes inspired by Portuguese gastronomy and the specialities that have contributed to the restaurant’s reputation: entrecote with homemade sauce, bacalhau à lagareiro, piri piri chicken or seafood rice. In addition, Zé-do-pipo offers various daily specials and weekly suggestions.",
    "The Zé-do-pipo cellar will not fail to surprise you with its selection of Portuguese wines that will take you on a journey from the north to the south of Portugal.",
    "We look forward to meeting you and sharing a convivial moment with you.",
  ],
  pt: [
    "Desde 1989, Zé-do-pipo recebe-o de segunda a sábado, num ambiente requintado e elegante, situado no centro de Genebra, a 5 minutos da estação de comboios de Cornavin.",
    "Venha descobrir pratos inspirados na gastronomia portuguesa e as especialidades que contribuíram para a reputação do restaurante: entrecote com molho caseiro, bacalhau à lagareiro, frango piri piri ou arroz de marisco. Além disso, Zé-do-pipo oferece várias promoções diárias e sugestões semanais.",
    "A adega do Zé-do-pipo não deixará de o surpreender com a sua selecção de vinhos portugueses que o levarão numa viagem de norte a sul de Portugal.",
    "Aguardamos com expectativa o seu encontro e a partilha de um momento de convívio consigo.",
  ],
  it: [
    "Dal 1989 lo Zé-do-pipo vi accoglie dal lunedì al sabato in un ambiente caldo ed elegante, nel cuore di Ginevra, a 5 minuti dalla stazione di Cornavin.",
    "Venite a scoprire piatti ispirati alla gastronomia portoghese e le specialità che hanno costruito la reputazione del ristorante: entrecôte con salsa della casa, bacalhau à lagareiro, pollo piri piri o riso ai frutti di mare. Inoltre, lo Zé-do-pipo propone diversi piatti del giorno e suggerimenti della settimana.",
    "La cantina dello Zé-do-pipo non mancherà di sorprendervi con la sua selezione di vini portoghesi, che vi porterà in viaggio dal nord al sud del Portogallo.",
    "Saremo lieti di conoscervi e di condividere con voi un momento conviviale.",
  ],
  de: [
    "Seit 1989 empfängt Sie das Zé-do-pipo von Montag bis Samstag in einem warmen, eleganten Rahmen im Herzen von Genf, 5 Minuten vom Bahnhof Cornavin.",
    "Entdecken Sie Gerichte, die von der portugiesischen Gastronomie inspiriert sind, und die Spezialitäten, die den Ruf des Restaurants begründet haben: Entrecôte mit Haussauce, Bacalhau à lagareiro, Piri-Piri-Hähnchen oder Reis mit Meeresfrüchten. Ausserdem bietet das Zé-do-pipo verschiedene Tagesgerichte und Wochenvorschläge an.",
    "Der Keller des Zé-do-pipo wird Sie mit seiner Auswahl an portugiesischen Weinen überraschen, die Sie auf eine Reise vom Norden bis in den Süden Portugals mitnehmen.",
    "Wir freuen uns darauf, Sie kennenzulernen und einen geselligen Moment mit Ihnen zu teilen.",
  ],
};
export const SIGNATURE = "Maria & José";

// Every photo of the live site (31 files: the 27 of the brief plus the 2 hero backgrounds and 2 room
// banners the live pages use). Alt texts are new, in every language.
export const PHOTOS: Record<string, Localized> = {
  "ze-do-pipo-fotos-y-video0032": L("Bacalhau à lagareiro sur une assiette bleue", "Bacalhau à lagareiro on a blue plate", "Bacalhau à lagareiro num prato azul", "Bacalhau à lagareiro su un piatto blu", "Bacalhau à lagareiro auf einem blauen Teller"),
  "bitoque-500": L("Bitoque de vaca : steak, œuf au plat, frites et riz", "Bitoque de vaca: steak, fried egg, fries and rice", "Bitoque de vaca: bife, ovo estrelado, batatas fritas e arroz", "Bitoque de vaca: bistecca, uovo all’occhio di bue, patatine e riso", "Bitoque de vaca: Steak, Spiegelei, Pommes frites und Reis"),
  "ze-do-pipo-fotos-y-video0044": L("Saladinha de polvo dans une assiette blanche", "Saladinha de polvo in a white bowl", "Saladinha de polvo num prato branco", "Saladinha de polvo in un piatto bianco", "Saladinha de polvo in einem weissen Teller"),
  "salle-restaurant": L("La salle, ses tables en bois et ses plantes", "The dining room with its wooden tables and plants", "A sala, com mesas de madeira e plantas", "La sala con tavoli in legno e piante", "Der Saal mit Holztischen und Pflanzen"),
  "camarao-piri-piri-500": L("Crevettes piri piri et poivrons sur une assiette bleue", "Piri piri prawns and peppers on a blue plate", "Camarão piri piri e pimentos num prato azul", "Gamberi piri piri e peperoni su un piatto blu", "Piri-Piri-Crevetten mit Peperoni auf einem blauen Teller"),
  "bacalhau-lagareiro-500": L("Bacalhau à lagareiro vu de dessus", "Bacalhau à lagareiro from above", "Bacalhau à lagareiro visto de cima", "Bacalhau à lagareiro visto dall’alto", "Bacalhau à lagareiro von oben"),
  "secretos-500": L("Secretos de porco et salade sur une assiette bleue", "Secretos de porco with salad on a blue plate", "Secretos de porco com salada num prato azul", "Secretos de porco con insalata su un piatto blu", "Secretos de porco mit Salat auf einem blauen Teller"),
  "pouple-grille-500w": L("Polvo à lagareiro, le poulpe grillé", "Polvo à lagareiro, grilled octopus", "Polvo à lagareiro", "Polvo à lagareiro, polpo alla griglia", "Polvo à lagareiro, gegrillter Oktopus"),
  "salle-ze-do-pipo-haut": L("Tables dressées avec leurs verres", "Laid tables with their glasses", "Mesas postas com os copos", "Tavoli apparecchiati con i bicchieri", "Gedeckte Tische mit Gläsern"),
  "secretos-300-2500": L("Secretos de porco sur une assiette bleue", "Secretos de porco on a blue plate", "Secretos de porco num prato azul", "Secretos de porco su un piatto blu", "Secretos de porco auf einem blauen Teller"),
  "tableau-restaurant-molard": L("Un tableau de rue genevoise au-dessus d’une table dressée", "A painting of a Geneva street above a laid table", "Um quadro de uma rua de Genebra por cima de uma mesa posta", "Un quadro di una via di Ginevra sopra un tavolo apparecchiato", "Ein Bild einer Genfer Strasse über einem gedeckten Tisch"),
  poulet: L("Poulet piri piri découpé à table", "Piri piri chicken being carved at the table", "Frango piri piri a ser cortado à mesa", "Pollo piri piri tagliato al tavolo", "Piri-Piri-Hähnchen, am Tisch tranchiert"),
  "bacalhau-a-lagareiro-carre": L("Bacalhau à lagareiro, l’assiette en gros plan", "Bacalhau à lagareiro, close up", "Bacalhau à lagareiro em grande plano", "Bacalhau à lagareiro in primo piano", "Bacalhau à lagareiro in Nahaufnahme"),
  entrecote: L("Entrecôte tranchée sur un réchaud", "Sliced entrecôte on a warmer", "Entrecote fatiada num réchaud", "Entrecôte a fette su uno scaldavivande", "Tranchiertes Entrecôte auf einem Rechaud"),
  "ameijoas-500": L("Amêijoas à bulhão pato dans une assiette creuse", "Amêijoas à bulhão pato, clams in a deep plate", "Amêijoas à bulhão pato num prato fundo", "Amêijoas à bulhão pato, vongole in un piatto fondo", "Amêijoas à bulhão pato, Venusmuscheln im tiefen Teller"),
  "pasteis-de-bacalhau-500": L("Accras de morue et salade", "Codfish cakes with salad", "Pastéis de bacalhau com salada", "Frittelle di baccalà con insalata", "Stockfisch-Küchlein mit Salat"),
  "saladinha-de-polvo-500": L("Saladinha de polvo, salade de poulpe", "Saladinha de polvo, octopus salad", "Saladinha de polvo", "Saladinha de polvo, insalata di polpo", "Saladinha de polvo, Oktopussalat"),
  "salle-arriere-500": L("La salle du fond, tables dressées", "The back room with laid tables", "A sala do fundo, com as mesas postas", "La sala sul retro, tavoli apparecchiati", "Der hintere Saal mit gedeckten Tischen"),
  "salle-avant-table-25-": L("Une table devant le miroir doré", "A table in front of the gilded mirror", "Uma mesa em frente ao espelho dourado", "Un tavolo davanti allo specchio dorato", "Ein Tisch vor dem vergoldeten Spiegel"),
  "restaurant-salle-ze-do-pipo": L("La salle vue depuis l’entrée", "The dining room seen from the entrance", "A sala vista da entrada", "La sala vista dall’ingresso", "Der Saal vom Eingang aus"),
  "bitoque-lado-500": L("Bitoque vu de côté", "Bitoque seen from the side", "Bitoque visto de lado", "Bitoque visto di lato", "Bitoque von der Seite"),
  "bacalhau-lagareiro-lado-500": L("Bacalhau à lagareiro vu de côté", "Bacalhau à lagareiro from the side", "Bacalhau à lagareiro visto de lado", "Bacalhau à lagareiro visto di lato", "Bacalhau à lagareiro von der Seite"),
  "camarao-lado-500": L("Crevettes piri piri vues de côté", "Piri piri prawns from the side", "Camarão piri piri visto de lado", "Gamberi piri piri visti di lato", "Piri-Piri-Crevetten von der Seite"),
  "bacalhau-a-bras-500": L("Bacalhau à brás sur une assiette bleue", "Bacalhau à brás on a blue plate", "Bacalhau à brás num prato azul", "Bacalhau à brás su un piatto blu", "Bacalhau à brás auf einem blauen Teller"),
  "flan-lado-500": L("Flan caramel maison", "Homemade caramel flan", "Pudim caseiro", "Flan al caramello fatto in casa", "Hausgemachter Caramelflan"),
  "mousse-au-chocolat-500": L("Mousse au chocolat dans un verre", "Chocolate mousse in a glass", "Mousse de chocolate num copo", "Mousse al cioccolato in un bicchiere", "Schokoladenmousse im Glas"),
  "panacotta-lado-500": L("Panna cotta au coulis de fruits rouges", "Panna cotta with red berry coulis", "Panna cotta com coulis de frutos vermelhos", "Panna cotta con coulis di frutti rossi", "Panna cotta mit Beerencoulis"),
  "ze-do-pipo-fotos-y-video0106": L("Bitoque, œuf au plat, frites et riz sur une table en bois", "Bitoque with fried egg, fries and rice on a wooden table", "Bitoque com ovo estrelado, batatas fritas e arroz numa mesa de madeira", "Bitoque con uovo, patatine e riso su un tavolo di legno", "Bitoque mit Spiegelei, Pommes frites und Reis auf einem Holztisch"),
  "ze-do-pipo-fotos-y-video0109": L("Viande grillée et salade sur une assiette bleue", "Grilled meat and salad on a blue plate", "Carne grelhada e salada num prato azul", "Carne alla griglia e insalata su un piatto blu", "Gegrilltes Fleisch mit Salat auf einem blauen Teller"),
  "salle-miroir-chandelier-1900": L("Banquette, miroir doré et chandelier dans la salle", "Banquette, gilded mirror and candelabra in the dining room", "Banco corrido, espelho dourado e candelabro na sala", "Panca, specchio dorato e candelabro nella sala", "Sitzbank, vergoldeter Spiegel und Kerzenleuchter im Saal"),
  "salle-vue-ze-do-pipo-1900": L("Tables dressées, la salle à l’arrière-plan", "Laid tables, the room behind", "Mesas postas, a sala ao fundo", "Tavoli apparecchiati, la sala sullo sfondo", "Gedeckte Tische, der Saal im Hintergrund"),
};
export const PHOTO_IDS = Object.keys(PHOTOS);
