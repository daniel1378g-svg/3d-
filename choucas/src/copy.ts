// Page texts. German is copied verbatim from choucas.ch (only missing spaces after a comma or full stop
// were added). The reservation intro's English and French are the restaurant's own, verbatim. Every
// other French, Italian, English and Portuguese text is a new translation and needs a native-speaker check.
import { L, same, type Localized } from "./i18n";

export const HOME = {
  heroTitle: "Pizza | Parrilla",
  boxes: {
    pizzeria: {
      intro: L(
        "Die familienfreundliche Pizzeria mit dem Vogel",
        "La pizzeria familiale à l’oiseau",
        "La pizzeria per famiglie con l’uccello",
        "The family-friendly pizzeria with the bird",
        "A pizzaria familiar do pássaro",
      ),
      hours: L("Warme Küche von 11.00 Uhr - 23.00 Uhr", "Cuisine chaude de 11h00 à 23h00", "Cucina calda dalle 11.00 alle 23.00", "Hot food from 11.00 to 23.00", "Cozinha quente das 11h00 às 23h00"),
    },
    oasis: {
      intro: L(
        "Willkommen im Steakhouse Oasis - wo die argentinische Küche der Exotik begegnet.",
        "Bienvenue au Steakhouse Oasis, où la cuisine argentine rencontre l’exotisme.",
        "Benvenuti allo Steakhouse Oasis, dove la cucina argentina incontra l’esotico.",
        "Welcome to the Steakhouse Oasis, where Argentine cooking meets the exotic.",
        "Bem-vindos ao Steakhouse Oasis, onde a cozinha argentina encontra o exótico.",
      ),
      hours: L("Warme Küche von 11.00 Uhr bis 22.00 Uhr", "Cuisine chaude de 11h00 à 22h00", "Cucina calda dalle 11.00 alle 22.00", "Hot food from 11.00 to 22.00", "Cozinha quente das 11h00 às 22h00"),
    },
    choucalino: {
      intro: L(
        "Der Choucalino Club mit dem grössten Indoor-Spielplatz der Region",
        "Le Choucalino Club et la plus grande aire de jeux couverte de la région",
        "Il Choucalino Club con il più grande parco giochi coperto della regione",
        "The Choucalino Club with the region’s biggest indoor playground",
        "O Choucalino Club, com o maior parque infantil coberto da região",
      ),
      hours: L("Offen von 10.00 Uhr - 23.00 Uhr", "Ouvert de 10h00 à 23h00", "Aperto dalle 10.00 alle 23.00", "Open from 10.00 to 23.00", "Aberto das 10h00 às 23h00"),
    },
  },
  kidsGrill: L("Der neue Choucalino® Kinder-Grill.", "Le nouveau grill pour enfants Choucalino®.", "La nuova griglia per bambini Choucalino®.", "The new Choucalino® kids’ grill.", "O novo grelhador para crianças Choucalino®."),
  awardsTitle: L("Auszeichnungen", "Distinctions", "Riconoscimenti", "Awards", "Distinções"),
  swissGastro: L(
    "2. Platz in der Kategorie \"Activity\"",
    "2e place dans la catégorie « Activity »",
    "2° posto nella categoria «Activity»",
    "2nd place in the “Activity” category",
    "2.º lugar na categoria «Activity»",
  ),
  swissGastroText: L(
    "Im Best of Book, welches anlässlich der Award Night im November jedes Jahres erscheint, werden alle nominierten Betriebe und die Gewinner mittels einem Portrait vorgestellt. The Choucas Connection hat in der Kategorie \"Activity\" den 2. Platz erreicht.",
    "Le Best of Book, qui paraît chaque année en novembre à l’occasion de l’Award Night, présente tous les établissements nominés et les lauréats par un portrait. The Choucas Connection a obtenu la 2e place dans la catégorie « Activity ».",
    "Nel Best of Book, che esce ogni anno a novembre in occasione dell’Award Night, tutti i locali nominati e i vincitori vengono presentati con un ritratto. The Choucas Connection ha ottenuto il 2° posto nella categoria «Activity».",
    "The Best of Book, published every November for the Award Night, presents every nominated business and the winners with a portrait. The Choucas Connection took 2nd place in the “Activity” category.",
    "O Best of Book, publicado todos os anos em novembro por ocasião da Award Night, apresenta com um retrato todos os estabelecimentos nomeados e os vencedores. A Choucas Connection alcançou o 2.º lugar na categoria «Activity».",
  ),
  tripadvisor: same("TripAdvisor Certificate of Excellence"),
  familyWelcome: L("Gütesiegel «Familien Willkommen» (2009)", "Label « Familien Willkommen » (2009)", "Marchio «Familien Willkommen» (2009)", "“Familien Willkommen” seal (2009)", "Selo «Familien Willkommen» (2009)"),
  contactLine: L("Kontakt", "Contact", "Contatti", "Contact", "Contacto"),
};

export const PIZZERIA = {
  title: L("Willkommen in der Pizzeria Choucas", "Bienvenue à la Pizzeria Choucas", "Benvenuti alla Pizzeria Choucas", "Welcome to Pizzeria Choucas", "Bem-vindos à Pizzaria Choucas"),
  text: L(
    "Die Pizzeria Choucas feiert dieses Jahr ihr 35 jähriges Bestehen. Geniessen Sie unsere Pizza- und Pastakreationen und lassen Sie sich von unserem mediterranen Ambiente verzaubern.",
    "La Pizzeria Choucas fête cette année ses 35 ans. Savourez nos créations de pizzas et de pâtes et laissez-vous charmer par notre ambiance méditerranéenne.",
    "Quest’anno la Pizzeria Choucas festeggia i suoi 35 anni. Gustate le nostre creazioni di pizza e pasta e lasciatevi incantare dalla nostra atmosfera mediterranea.",
    "This year Pizzeria Choucas celebrates 35 years. Enjoy our pizza and pasta creations and let our Mediterranean atmosphere enchant you.",
    "Este ano, a Pizzaria Choucas celebra 35 anos. Saboreie as nossas criações de pizza e massa e deixe-se encantar pelo nosso ambiente mediterrânico.",
  ),
  eventLabel: same("Event"),
  eventTitle: L("\"Kinder backen Pizza\"", "« Les enfants font la pizza »", "«I bambini fanno la pizza»", "“Kids bake pizza”", "«As crianças fazem pizza»"),
  eventText: L(
    "Für einmal können Kinder die Rolle eines Pizzaiolo's übernehmen! Im familienfreundlichen Restaurant Choucas werden Kinder spielerisch in die Kunst des Pizza-Backens eingeführt und haben sogar die Gelegenheit selber eine Pizza für Mama oder Papa zu kreieren.",
    "Pour une fois, les enfants peuvent jouer les pizzaiolos ! Au restaurant familial Choucas, ils découvrent en s’amusant l’art de faire une pizza et peuvent même en créer une pour maman ou papa.",
    "Per una volta i bambini possono fare i pizzaioli! Nel ristorante per famiglie Choucas vengono introdotti giocando all’arte della pizza e possono persino creare una pizza per mamma o papà.",
    "For once, children get to be the pizzaiolo! At the family-friendly Restaurant Choucas they learn the art of pizza-making through play, and can even create a pizza of their own for Mum or Dad.",
    "Por uma vez, as crianças podem ser pizzaiolos! No restaurante familiar Choucas aprendem a brincar a arte de fazer pizza e podem até criar uma pizza para a mãe ou para o pai.",
  ),
  onRequest: L("Auf Anfrage!", "Sur demande !", "Su richiesta!", "On request!", "Por pedido!"),
  eventLink: L("Familienprogramm von Leukerbad", "Programme familles de Loèche-les-Bains", "Programma per famiglie di Leukerbad", "Leukerbad family programme", "Programa para famílias de Leukerbad"),
  menuTitle: L("Speisekarte", "Carte", "Menu", "Menu", "Ementa"),
  menuText: L("Werfen Sie einen Blick auf unsere Speisekarte!", "Jetez un œil à notre carte !", "Date un’occhiata al nostro menu!", "Take a look at our menu!", "Dê uma vista de olhos à nossa ementa!"),
  menuLink: L("Unsere Speisekarte", "Notre carte", "Il nostro menu", "Our menu", "A nossa ementa"),
  specialEyebrow: L("Neue Spezialität in der Pizzeria Choucas", "Nouvelle spécialité de la Pizzeria Choucas", "Nuova specialità della Pizzeria Choucas", "New speciality at Pizzeria Choucas", "Nova especialidade da Pizzaria Choucas"),
  special: same("Pizza Geissupür"),
  specialText: L(
    "Traditionelle Pizza mit Cherry Tomaten, grilliertem Speck, grillierten Zuchetti, frischem Thymian und einem Spiegelei",
    "Pizza traditionnelle aux tomates cerises, lard grillé, courgettes grillées, thym frais et un œuf au plat",
    "Pizza tradizionale con pomodorini, speck grigliato, zucchine grigliate, timo fresco e un uovo all’occhio di bue",
    "Traditional pizza with cherry tomatoes, grilled bacon, grilled courgettes, fresh thyme and a fried egg",
    "Pizza tradicional com tomate cereja, bacon grelhado, curgete grelhada, tomilho fresco e um ovo estrelado",
  ),
  specialLine: L("Lecker – da freut sich die Heidi!", "Délicieux : Heidi en est ravie !", "Squisita: Heidi ne sarà felice!", "Delicious – Heidi would be delighted!", "Delicioso: a Heidi vai adorar!"),
};

export const STEAKHOUSE = {
  title: L("Willkommen im Steakhouse Oasis", "Bienvenue au Steakhouse Oasis", "Benvenuti allo Steakhouse Oasis", "Welcome to the Steakhouse Oasis", "Bem-vindos ao Steakhouse Oasis"),
  text: L(
    "Das im Jahre 2007 umgebaute Kino Rex strahlt heute in neuem Glanze. Geniessen Sie argentinische Grill-Spezialitäten in einem aussergewöhnlichen Ambiente -",
    "L’ancien Kino Rex, transformé en 2007, brille aujourd’hui d’un nouvel éclat. Savourez les spécialités du grill argentin dans un cadre hors du commun –",
    "L’ex Kino Rex, ristrutturato nel 2007, oggi risplende di nuova luce. Gustate le specialità della griglia argentina in un ambiente fuori dal comune –",
    "The Kino Rex, rebuilt in 2007, shines with new splendour today. Enjoy Argentine grill specialities in an extraordinary setting –",
    "O antigo Kino Rex, remodelado em 2007, brilha hoje com um novo esplendor. Saboreie as especialidades da grelha argentina num ambiente fora do comum –",
  ),
  photosLink: L("Bilder vom Oasis Steakhouse", "photos de l’Oasis Steakhouse", "foto dell’Oasis Steakhouse", "photos of the Oasis Steakhouse", "fotografias do Oasis Steakhouse"),
  laReunion: same("LaReunion"),
};

export const GAUCHO = {
  title: L("Das Original - Das Gaucho Steak", "L’original : le Gaucho Steak", "L’originale: il Gaucho Steak", "The original: the Gaucho Steak", "O original: o Gaucho Steak"),
  paragraphs: [
    L(
      "Ein Gaucho ist ein argentinischer Cowboy der auf dem Rücken seines Pferdes durch die weiten Ebenen reitet und die riesigen Rinderherden überwacht und betreut. Gauchos sind stolze und in Argentinien angesehene Menschen. Der Gaucho wird von den Einheimischen auch liebevoll \"Feuermeister\" genannt., dies weil er sich sein Stück Fleisch auf offenem Feuer im Freien, oft über Stunden und bis zur Perfektion, grillt.",
      "Le gaucho est un cow-boy argentin qui parcourt à cheval les vastes plaines pour surveiller et soigner les immenses troupeaux de bœufs. Les gauchos sont des hommes fiers et respectés en Argentine. Les habitants l’appellent aussi affectueusement le « maître du feu », parce qu’il grille son morceau de viande en plein air sur un feu ouvert, souvent pendant des heures et jusqu’à la perfection.",
      "Il gaucho è un cowboy argentino che cavalca per le vaste pianure e sorveglia e accudisce le enormi mandrie di bovini. I gauchos sono uomini fieri e stimati in Argentina. La gente del posto lo chiama affettuosamente anche «maestro del fuoco», perché griglia il suo pezzo di carne all’aperto sul fuoco vivo, spesso per ore e fino alla perfezione.",
      "A gaucho is an Argentine cowboy who rides across the wide plains on horseback, watching over and caring for the huge herds of cattle. Gauchos are proud people, held in high regard in Argentina. The locals also fondly call the gaucho the “fire master”, because he grills his piece of meat outdoors over an open fire, often for hours and to perfection.",
      "O gaúcho é um vaqueiro argentino que percorre a cavalo as vastas planícies, vigiando e cuidando das enormes manadas de gado. Os gaúchos são homens orgulhosos e respeitados na Argentina. A população também lhe chama carinhosamente «mestre do fogo», porque grelha o seu pedaço de carne ao ar livre, em fogo aberto, muitas vezes durante horas e até à perfeição.",
    ),
    L(
      "Der Genuss dieses wirklich guten Stück Rindfleisch definiert sich im Gaumen beim Verzehr. Ist dieser besonders kräftig und intensiv kommen Feinschmecker sofort ins Schwärmen.",
      "Le plaisir d’une très bonne pièce de bœuf se révèle en bouche. Quand le goût est particulièrement puissant et intense, les gourmets s’enthousiasment aussitôt.",
      "Il piacere di un pezzo di manzo davvero buono si rivela al palato. Quando il gusto è particolarmente deciso e intenso, i buongustai si entusiasmano subito.",
      "The pleasure of a truly good piece of beef reveals itself on the palate. When the flavour is especially strong and intense, gourmets are instantly won over.",
      "O prazer de um pedaço de carne de vaca realmente bom revela-se no paladar. Quando o sabor é especialmente forte e intenso, os apreciadores rendem-se de imediato.",
    ),
    L(
      "Die Qualitätsstücke werden direkt über das importiert, welche nur Black Angus und Hereford Fleischrassen von ausgewählten argentinischen Züchtern und Fleischproduzenten selektiert. Dank strengster Selektion unterscheidet sich die Qualität eines Stück Gaucho Fleisch merklich von Konkurrenzprodukten aus Argentinien.",
      "Les pièces de qualité sont importées directement, uniquement des races Black Angus et Hereford sélectionnées chez des éleveurs et producteurs argentins choisis. Grâce à une sélection des plus strictes, la qualité d’une pièce de viande Gaucho se distingue nettement des autres produits argentins.",
      "I tagli di qualità vengono importati direttamente, solo di razze Black Angus e Hereford selezionate presso allevatori e produttori argentini scelti. Grazie a una selezione rigorosissima, la qualità di un pezzo di carne Gaucho si distingue nettamente dagli altri prodotti argentini.",
      "The quality cuts are imported directly, only Black Angus and Hereford breeds selected from chosen Argentine breeders and meat producers. Thanks to the strictest selection, the quality of a piece of Gaucho meat stands out clearly from competing products from Argentina.",
      "As peças de qualidade são importadas diretamente, apenas das raças Black Angus e Hereford selecionadas junto de criadores e produtores argentinos escolhidos. Graças a uma seleção rigorosíssima, a qualidade de uma peça de carne Gaucho distingue-se claramente de outros produtos da Argentina.",
    ),
    L(
      "Die Tiere legen täglich, auf der Suche nach Wasserstellen, weite Strecken zurück. Sie ernähren sich ausschliesslich auf den Weiden der argentinischen Pampas und sind, durch das stete Wandern, bekannt für ihre ausgeprägten Muskeln, was das Fleisch saftig macht und zum äusserst natürlichen Geschmack führt.",
      "Chaque jour, les bêtes parcourent de longues distances à la recherche de points d’eau. Elles se nourrissent exclusivement dans les pâturages de la pampa argentine et, à force de marcher, elles sont connues pour leurs muscles marqués, qui rendent la viande juteuse et lui donnent un goût des plus naturels.",
      "Ogni giorno gli animali percorrono lunghe distanze in cerca d’acqua. Si nutrono esclusivamente nei pascoli della pampa argentina e, camminando di continuo, sono noti per la muscolatura sviluppata, che rende la carne succosa e le dà un gusto estremamente naturale.",
      "Every day the animals cover long distances in search of water. They feed only on the pastures of the Argentine pampas and, from their constant roaming, are known for their well-developed muscles, which make the meat juicy and give it a remarkably natural flavour.",
      "Todos os dias, os animais percorrem longas distâncias à procura de água. Alimentam-se exclusivamente nas pastagens das pampas argentinas e, por andarem sempre, são conhecidos pela musculatura desenvolvida, que torna a carne suculenta e lhe dá um sabor extremamente natural.",
    ),
  ],
  menuText: L("Werfen Sie einen Blick auf unsere Speisekarte!", "Jetez un œil à notre carte !", "Date un’occhiata al nostro menu!", "Take a look at our menu!", "Dê uma vista de olhos à nossa ementa!"),
  keywords: [L("Feuermeister", "maître du feu", "maestro del fuoco", "fire master", "mestre do fogo"), same("Black Angus"), same("Hereford"), same("Pampas")],
};

export const CHOUCALINO = {
  title: L("Willkommen im Choucalino® Kid's Club", "Bienvenue au Choucalino® Kid’s Club", "Benvenuti al Choucalino® Kid’s Club", "Welcome to the Choucalino® Kid’s Club", "Bem-vindos ao Choucalino® Kid’s Club"),
  text: L(
    "Der Choucalino® Kid's Club wurde 2007 gegründet und wird ständig den neuen Bedürfnissen unserer Jüngsten angepasst. Im Jahre 2009 konnte die Pizzeria Choucas das Gütesiegel \"Familien Willkommen\" in Empfang nehmen und ist bis heute bestrebt neue Ideen in der \"Kinder-Gastronomie\" zu schmieden.",
    "Le Choucalino® Kid’s Club a été fondé en 2007 et s’adapte sans cesse aux nouveaux besoins de nos plus jeunes. En 2009, la Pizzeria Choucas a reçu le label « Familien Willkommen » et s’efforce depuis de forger de nouvelles idées pour la « gastronomie des enfants ».",
    "Il Choucalino® Kid’s Club è nato nel 2007 e si adatta continuamente alle nuove esigenze dei più piccoli. Nel 2009 la Pizzeria Choucas ha ricevuto il marchio «Familien Willkommen» e da allora cerca sempre nuove idee per la «gastronomia per bambini».",
    "The Choucalino® Kid’s Club was founded in 2007 and keeps adapting to the new needs of our youngest guests. In 2009 Pizzeria Choucas received the “Familien Willkommen” (families welcome) seal, and it still strives to come up with new ideas in “children’s gastronomy”.",
    "O Choucalino® Kid’s Club foi fundado em 2007 e adapta-se constantemente às novas necessidades dos mais pequenos. Em 2009, a Pizzaria Choucas recebeu o selo «Familien Willkommen» e continua a procurar novas ideias para a «gastronomia infantil».",
  ),
  pressLink: L("siehe Presseberichte", "voir les articles de presse", "vedi gli articoli di stampa", "see the press reports", "ver os artigos de imprensa"),
  playTitle: L("Geniesst unseren Indoor Spielplatz", "Profitez de notre aire de jeux couverte", "Godetevi il nostro parco giochi coperto", "Enjoy our indoor playground", "Aproveitem o nosso parque infantil coberto"),
  playText: L(
    "In unserem Indoor-Spielplatz gibt es praktisch alles - überzeugen Sie sich selbst...",
    "Notre aire de jeux couverte a pratiquement tout : voyez par vous-même…",
    "Nel nostro parco giochi coperto c’è praticamente di tutto: venite a vedere…",
    "Our indoor playground has practically everything – see for yourself…",
    "O nosso parque infantil coberto tem praticamente tudo: veja com os seus próprios olhos…",
  ),
  playList: [
    L("Grosse Spielinsel mit Ballgehege, drei Rutschen, Spielburg", "Grande île de jeux avec piscine à balles, trois toboggans et château", "Grande isola di gioco con piscina di palline, tre scivoli e castello", "Big play island with a ball pit, three slides and a play castle", "Grande ilha de brincar com piscina de bolas, três escorregas e castelo"),
    L("Kuschelecke mit Flatscreen wo Trickfilme geschaut werden können", "Coin douillet avec écran plat pour regarder des dessins animés", "Angolo morbido con schermo piatto per guardare i cartoni animati", "Cosy corner with a flat screen for watching cartoons", "Canto aconchegante com ecrã plano para ver desenhos animados"),
    L("IPad mit tollen Spielen", "iPad avec de super jeux", "iPad con giochi fantastici", "iPad with great games", "iPad com jogos fantásticos"),
  ],
  playOutro: L(
    "Währenddessen sich Ihre Schützlinge im Choucalino Club vergnügen, können Sie die feinen italienischen Spezialitäten geniessen",
    "Pendant que vos petits s’amusent au Choucalino Club, vous pouvez savourer nos délicieuses spécialités italiennes",
    "Mentre i vostri piccoli si divertono al Choucalino Club, potete gustare le nostre squisite specialità italiane",
    "While your little ones have fun in the Choucalino Club, you can enjoy the fine Italian specialities",
    "Enquanto os seus pequenos se divertem no Choucalino Club, pode saborear as nossas deliciosas especialidades italianas",
  ),
  playPhotos: L("Bilder zum Spielplatz", "Photos de l’aire de jeux", "Foto del parco giochi", "Photos of the playground", "Fotografias do parque infantil"),
  grillTitle: L("Der Choucalino® Kinder-Grill!!", "Le grill pour enfants Choucalino® !", "La griglia per bambini Choucalino®!", "The Choucalino® kids’ grill!", "O grelhador para crianças Choucalino®!"),
  grillText: L(
    "Choucalino präsentiert euch seinen neu erstellten Kinder-Grill. Unsere neue Kinder-Attraktion \"Cervelat grillieru\" ist ein absolutes Erlebnis.",
    "Choucalino vous présente son tout nouveau grill pour enfants. Notre nouvelle attraction, « Cervelat grillieru » (griller sa cervelas), est une vraie aventure.",
    "Choucalino vi presenta la sua nuova griglia per bambini. La nostra nuova attrazione, «Cervelat grillieru» (grigliare il cervelat), è un’esperienza unica.",
    "Choucalino presents his brand-new kids’ grill. Our new attraction for children, “Cervelat grillieru” (grilling your own cervelat sausage), is a real adventure.",
    "O Choucalino apresenta-vos o seu novo grelhador para crianças. A nossa nova atração, «Cervelat grillieru» (grelhar a própria salsicha cervelat), é uma verdadeira aventura.",
  ),
  familyTitle: same("Unser Service für Familien"),
  familyIntro: L(
    "Wir freuen uns folgende Dienstleistungen für Familien anbieten zu dürfen:",
    "Nous sommes heureux de proposer aux familles les services suivants :",
    "Siamo lieti di offrire alle famiglie i seguenti servizi:",
    "We are pleased to offer families the following services:",
    "Temos o prazer de oferecer às famílias os seguintes serviços:",
  ),
  familyList: [
    L("Riesen Indoor-Spielplatz - der Spielspass pur!", "Une immense aire de jeux couverte : le plaisir de jouer à l’état pur !", "Un enorme parco giochi coperto: puro divertimento!", "A huge indoor playground – pure fun!", "Um enorme parque infantil coberto: pura diversão!"),
    L("Kindergrill. Kinder können Ihre Cervelat selber grillieren", "Grill pour enfants : les enfants peuvent griller eux-mêmes leur cervelas", "Griglia per bambini: i bambini possono grigliare da soli il loro cervelat", "Kids’ grill: children can grill their own cervelat", "Grelhador para crianças: as crianças podem grelhar sozinhas a sua salsicha cervelat"),
    L("Kiddy Boxen", "Kiddy Boxes", "Kiddy Box", "Kiddy boxes", "Kiddy Boxes"),
    L("wöchentlicher Event \"Kinder backen Pizza\"", "Chaque semaine : « Les enfants font la pizza »", "Ogni settimana: «I bambini fanno la pizza»", "Weekly event: “Kids bake pizza”", "Evento semanal: «As crianças fazem pizza»"),
    L("ein liebervoller Rabe namens Choucalino, welcher am Wochenende die Kinder in Lebensgrösse begeistert", "Un adorable corbeau nommé Choucalino, qui enchante les enfants en taille réelle le week-end", "Un amorevole corvo di nome Choucalino, che nel fine settimana entusiasma i bambini a grandezza naturale", "A lovable raven called Choucalino, who delights the children life-size at weekends", "Um corvo adorável chamado Choucalino, que encanta as crianças em tamanho real ao fim de semana"),
    L("separater Wickelraum mit Kinderseife und Feuchttüchlein", "Une salle à langer séparée, avec savon pour enfants et lingettes", "Fasciatoio separato con sapone per bambini e salviette umidificate", "A separate baby-changing room with children’s soap and wet wipes", "Fraldário separado com sabonete para crianças e toalhitas"),
    L("Kinderstühle, Lätze, Malstifte zur Verfügung", "Chaises hautes, bavoirs et crayons à disposition", "Seggioloni, bavaglini e matite colorate a disposizione", "High chairs, bibs and colouring pencils available", "Cadeiras de bebé, babetes e lápis de cor à disposição"),
    L("BabyStation: Mikrowelle zum Aufwärmen der Baby-Nahrung", "Station bébé : micro-ondes pour réchauffer les repas de bébé", "Baby station: microonde per scaldare le pappe", "Baby station: a microwave to warm baby food", "Estação de bebé: micro-ondas para aquecer a comida do bebé"),
    L("kostenlose Milch für den Schoppen (auf Wunsch gibts auch Schoppen", "Du lait gratuit pour le biberon (et des biberons sur demande)", "Latte gratuito per il biberon (e su richiesta anche biberon)", "Free milk for the baby bottle (and bottles on request)", "Leite gratuito para o biberão (e biberões a pedido)"),
    L("Ipad-Spiele", "Jeux sur iPad", "Giochi su iPad", "iPad games", "Jogos no iPad"),
    L("50 Sitzplätze für Eltern mit direkter Sicht auf den Spielplatz", "50 places assises pour les parents, avec vue directe sur l’aire de jeux", "50 posti a sedere per i genitori con vista diretta sul parco giochi", "50 seats for parents with a direct view of the playground", "50 lugares sentados para os pais, com vista direta para o parque infantil"),
  ],
  linksTitle: L("Mehr über Choucalino®", "Plus sur Choucalino®", "Altro su Choucalino®", "More about Choucalino®", "Mais sobre o Choucalino®"),
};

export const MENU_PAGE = {
  title: L("Speisekarte Steakhouse Oasis und Pizzeria Choucas", "Carte du Steakhouse Oasis et de la Pizzeria Choucas", "Menu dello Steakhouse Oasis e della Pizzeria Choucas", "Menu of the Steakhouse Oasis and Pizzeria Choucas", "Ementa do Steakhouse Oasis e da Pizzaria Choucas"),
  intro: L(
    "Sehnen Sie sich nach einem herzhaften, zarten und saftigen Stück Fleisch oder einer leckere italienische Spezialität?",
    "Envie d’un morceau de viande savoureux, tendre et juteux, ou d’une délicieuse spécialité italienne ?",
    "Avete voglia di un pezzo di carne saporito, tenero e succoso o di una gustosa specialità italiana?",
    "Craving a hearty, tender and juicy piece of meat, or a tasty Italian speciality?",
    "Apetece-lhe um pedaço de carne saboroso, tenro e suculento, ou uma deliciosa especialidade italiana?",
  ),
  featured: [
    {
      name: "Chef Parillada Argentina",
      photo: "parilladaweb",
      text: L(
        "Eine exquisite Auswahl an verschiedensten Fleischsorten, perfekt gegrillt nach argentinischer Tradition. Serviert mit zwei Beilagen nach Wahl für ein authentisches Erlebnis",
        "Un assortiment exquis de différentes viandes, grillées à la perfection selon la tradition argentine. Servi avec deux accompagnements au choix pour une expérience authentique",
        "Una squisita selezione di carni diverse, grigliate alla perfezione secondo la tradizione argentina. Servita con due contorni a scelta per un’esperienza autentica",
        "An exquisite selection of different meats, grilled to perfection in the Argentine tradition. Served with two sides of your choice for an authentic experience",
        "Uma seleção requintada de carnes variadas, grelhadas na perfeição segundo a tradição argentina. Servida com dois acompanhamentos à escolha, para uma experiência autêntica",
      ),
      extra: L(
        "Beilagenoptionen: Pommes Frites, Country Potatoes, Gemüse oder Risotto",
        "Accompagnements au choix : frites, Country Potatoes, légumes ou risotto",
        "Contorni a scelta: patatine fritte, Country Potatoes, verdure o risotto",
        "Choice of sides: French fries, country potatoes, vegetables or risotto",
        "Acompanhamentos à escolha: batatas fritas, Country Potatoes, legumes ou risotto",
      ),
    },
    {
      name: "Mexican BBQ Ribs",
      photo: "ribsweb",
      text: L(
        "Spare Ribs mariniert mit der Oasis-Honig-Chili-Sauce, dann mit frischen Kräutern knusprig gebraten. Da gibts eigentlich weiter nichts zu sagen.",
        "Des spare ribs marinés à la sauce miel-chili de l’Oasis, puis rôtis bien croustillants aux herbes fraîches. Il n’y a vraiment rien à ajouter.",
        "Spare ribs marinate con la salsa miele e peperoncino dell’Oasis, poi arrostite croccanti con erbe fresche. Non c’è altro da dire.",
        "Spare ribs marinated in the Oasis honey-chilli sauce, then roasted until crisp with fresh herbs. There’s really nothing more to say.",
        "Spare ribs marinadas no molho de mel e malagueta do Oasis e depois assadas, estaladiças, com ervas frescas. Não há mais nada a dizer.",
      ),
    },
  ],
  pdfLine: L("Menukarte der Choucas Connection", "Carte de la Choucas Connection", "Menu della Choucas Connection", "The Choucas Connection menu", "Ementa da Choucas Connection"),
  featuredNote: L(
    "Auf der Website vorgestellt; Preis gemäss Speisekarte im Restaurant.",
    "Présenté sur le site ; prix selon la carte au restaurant.",
    "Presentato sul sito; prezzo secondo il menu al ristorante.",
    "Featured on the website; price as on the menu in the restaurant.",
    "Apresentado no site; preço conforme a ementa no restaurante.",
  ),
};

export const TAKEAWAY = {
  title: same("Take-Away"),
  text: L(
    "Unsere knusprigen Pizzen und leckeren Pasta-Kreationen können selbstverständlich auch mitgenommen werden.",
    "Nos pizzas croustillantes et nos délicieuses créations de pâtes sont bien sûr aussi à emporter.",
    "Le nostre pizze croccanti e le gustose creazioni di pasta si possono naturalmente anche portare via.",
    "Our crispy pizzas and tasty pasta creations are of course also available to take away.",
    "As nossas pizzas estaladiças e as deliciosas criações de massa também podem, claro, ser levadas para casa.",
  ),
};

/** The reservation intro: German, English and French are the restaurant's own, verbatim. */
export const RESERVATION = {
  title: L("Online Reservation Pizzeria Choucas", "Réservation en ligne Pizzeria Choucas", "Prenotazione online Pizzeria Choucas", "Online reservation Pizzeria Choucas", "Reserva online Pizzaria Choucas"),
  text: L(
    "Willkommen zur Online Reservation der Choucas Connection! Sollten Sie zum gewünschten Zeitpunkt keinen verfügbaren Tisch im System finden, rufen Sie uns an Tel. 027 470 24 13! An gewissen sehr stark frequentierten Tagen müssen wir die Online Reservation beschränken um Doppelbuchungen zu verhindern.",
    "Bienvenue sur la réservation en ligne Choucas Connection ! Si vous ne trouvez pas de table disponible dans le système à l'heure souhaitée, appelez-nous au Tél. 027 470 24 13 ! Certains jours très chargés, nous devons limiter les réservations en ligne pour éviter les doubles réservations.",
    "Benvenuti nella prenotazione online della Choucas Connection! Se all’ora desiderata non trovate un tavolo libero nel sistema, chiamateci al Tel. 027 470 24 13! In alcuni giorni molto affollati dobbiamo limitare le prenotazioni online per evitare doppie prenotazioni.",
    "Welcome to the Choucas Connection online reservation! If you cannot find an available table in the system at the desired time, call us on Tel. 027 470 24 13! On certain very busy days we have to limit online reservations to prevent double bookings.",
    "Bem-vindos à reserva online da Choucas Connection! Se não encontrar uma mesa disponível no sistema à hora pretendida, ligue-nos para o Tel. 027 470 24 13! Em certos dias muito movimentados temos de limitar as reservas online para evitar reservas duplicadas.",
  ),
};

export const IMPRESSUM = {
  responsible: L(
    "Verantwortlich für Inhalt, Konzeption & Realisierung der Website:",
    "Responsable du contenu, de la conception et de la réalisation du site :",
    "Responsabile di contenuti, ideazione e realizzazione del sito:",
    "Responsible for the content, concept and production of the website:",
    "Responsável pelo conteúdo, conceção e realização do site:",
  ),
  warrantyTitle: L("Gewährleistung", "Garantie", "Garanzia", "Disclaimer", "Garantia"),
  warranty: L(
    "Wir bemühen uns um möglichst korrekte und aktuelle Information. Trotzdem können Fehler auftreten. Die Inhalte wurden sorgfältig erarbeitet. Dennoch übernehmen Autoren und Herausgeber keine Gewähr und Haftung für die Richtigkeit, Zuverlässigkeit, Vollständigkeit und Aktualität der Information. Die Verwendung der Website und der darin enthaltenen Informationen erfolgt auf eigene Gefahr. änderungen können jederzeit vorgenommen werden.",
    "Nous nous efforçons de fournir des informations aussi exactes et actuelles que possible. Des erreurs peuvent néanmoins se produire. Les contenus ont été élaborés avec soin. Les auteurs et l’éditeur n’assument toutefois aucune garantie ni responsabilité quant à l’exactitude, la fiabilité, l’exhaustivité et l’actualité des informations. L’utilisation du site et des informations qu’il contient se fait à vos propres risques. Des modifications peuvent être apportées à tout moment.",
    "Ci impegniamo a fornire informazioni il più possibile corrette e aggiornate. Possono tuttavia verificarsi errori. I contenuti sono stati elaborati con cura. Autori ed editore non si assumono comunque alcuna garanzia né responsabilità per la correttezza, l’affidabilità, la completezza e l’attualità delle informazioni. L’uso del sito e delle informazioni in esso contenute avviene a proprio rischio. Le modifiche possono essere apportate in qualsiasi momento.",
    "We strive to provide information that is as accurate and up to date as possible. Errors may nevertheless occur. The content has been prepared with care. Nevertheless, the authors and publisher accept no warranty or liability for the accuracy, reliability, completeness or currency of the information. Use of the website and the information it contains is at your own risk. Changes may be made at any time.",
    "Esforçamo-nos por fornecer informação tão correta e atual quanto possível. Ainda assim, podem ocorrer erros. Os conteúdos foram elaborados com cuidado. No entanto, os autores e o editor não assumem qualquer garantia nem responsabilidade pela exatidão, fiabilidade, integridade e atualidade da informação. A utilização do site e da informação nele contida é feita por sua conta e risco. Podem ser feitas alterações a qualquer momento.",
  ),
};

// The nine live galleries, in the live order. Photo ids are the file names on choucas.ch.
export const GALLERIES: { id: string; title: Localized; photos: string[]; note?: Localized }[] = [
  { id: "pizzeria", title: same("Pizzeria Choucas"), photos: ["a3x7690", "a3x7699", "pizza-ansicht", "dessert-ansicht", "terasse-pizzeria-choucas"] },
  { id: "oasis", title: same("Oasis Steakhouse"), photos: ["steakhouse", "tbone2", "tbone3", "weinoasis", "a3x1806", "steakhouse2", "a3x1812", "a3x1817", "a3x1835", "a3x1837"] },
  { id: "umbau", title: L("Umbau 2007", "Transformation 2007", "Ristrutturazione 2007", "Rebuild 2007", "Remodelação 2007"), photos: ["pict0006", "pict0008", "pict0009", "pict0014", "pict0030", "pict0033", "pict0034"] },
  { id: "choucalino", title: same("Choucalino Club"), photos: ["choucalino", "mg-1996-verkleinert", "choucalinogrillfb", "pizzabacken5", "img-1173", "nicole"] },
  { id: "events", title: same("Events"), photos: ["magier", "zaubershow-maerz2011", "dsc06772-800x6001"] },
  {
    id: "vor30",
    title: L("vor 30 Jahren", "Il y a 30 ans", "30 anni fa", "30 years ago", "Há 30 anos"),
    photos: [],
    note: L(
      "Wie sah es vor 30 Jahren bei uns aus. In Bearbeitung",
      "À quoi ressemblait notre maison il y a 30 ans. En préparation",
      "Com’era da noi 30 anni fa. In preparazione",
      "What our place looked like 30 years ago. In preparation",
      "Como era a nossa casa há 30 anos. Em preparação",
    ),
  },
  { id: "ausfluege", title: L("Mitarbeiterausflüge", "Sorties du personnel", "Gite del personale", "Staff outings", "Passeios da equipa"), photos: ["zauber"] },
  { id: "spezialitaeten", title: L("Spezialitäten", "Spécialités", "Specialità", "Specialities", "Especialidades"), photos: ["ribsweb", "tapasweb", "pinchitosfacebook"] },
  { id: "bestof", title: same("Best of Swiss Gastro 2012"), photos: ["bosg2", "bestofgroupfoto", "dsc01710", "bob", "dsc01731"] },
];

// Short descriptions for every photo (the live images have none).
export const PHOTOS: Record<string, Localized> = {
  a3x7690: L("Pizza auf einem Tisch der hellen Pizzeria mit Holzbalken und grünen Fenstern", "Pizza sur une table de la pizzeria lumineuse, poutres en bois et fenêtres vertes", "Pizza su un tavolo della luminosa pizzeria con travi in legno e finestre verdi", "Pizza on a table in the bright pizzeria with wooden beams and green windows", "Pizza numa mesa da pizzaria luminosa, com vigas de madeira e janelas verdes"),
  a3x7699: L("Pizza mit grilliertem Gemüse, Cherry-Tomaten, Thymian und Spiegelei, von oben", "Pizza aux légumes grillés, tomates cerises, thym et œuf au plat, vue de dessus", "Pizza con verdure grigliate, pomodorini, timo e uovo, vista dall’alto", "Pizza with grilled vegetables, cherry tomatoes, thyme and a fried egg, from above", "Pizza com legumes grelhados, tomate cereja, tomilho e ovo estrelado, vista de cima"),
  "pizza-ansicht": L("Eine Schinkenpizza wird am Tisch angeschnitten", "Une pizza au jambon coupée à table", "Una pizza al prosciutto tagliata al tavolo", "A ham pizza being cut at the table", "Uma pizza de fiambre a ser cortada à mesa"),
  "dessert-ansicht": L("Dessert in einer Tonschale mit Rahm und Hohlhippe", "Dessert dans une coupelle en terre cuite, crème et cigarette russe", "Dessert in una ciotola di terracotta con panna e cialda arrotolata", "Dessert in a terracotta dish with cream and a wafer roll", "Sobremesa numa taça de barro com natas e um canudo de bolacha"),
  "terasse-pizzeria-choucas": L("Der verglaste Wintergarten der Pizzeria mit weissen Bistrostühlen", "La véranda vitrée de la pizzeria et ses chaises bistrot blanches", "La veranda vetrata della pizzeria con sedie bistrot bianche", "The pizzeria’s glazed conservatory with white bistro chairs", "A marquise envidraçada da pizzaria, com cadeiras de bistrô brancas"),
  steakhouse: L("Steak auf dem Teller vor dem Speisesaal des Oasis mit Bögen und Palmen", "Steak à l’assiette devant la salle de l’Oasis, arcades et palmiers", "Bistecca nel piatto davanti alla sala dell’Oasis con archi e palme", "A plated steak in front of the Oasis dining room with arches and palms", "Bife no prato diante da sala do Oasis, com arcos e palmeiras"),
  steakhouse2: L("Speisesaal des Oasis mit Palme und Kerzenlicht, vorne ein angerichteter Teller", "Salle de l’Oasis avec palmier et bougies, une assiette dressée au premier plan", "Sala dell’Oasis con palma e candele, in primo piano un piatto servito", "The Oasis dining room with a palm and candlelight, a plated dish in front", "Sala do Oasis com palmeira e velas, um prato servido em primeiro plano"),
  tbone2: L("T-Bone-Steak in den Flammen des Grills, daneben Pilzspiesse", "T-bone dans les flammes du grill, à côté de brochettes de champignons", "Bistecca T-bone tra le fiamme della griglia, accanto spiedini di funghi", "A T-bone steak in the grill’s flames beside mushroom skewers", "Bife T-bone nas chamas da grelha, ao lado de espetadas de cogumelos"),
  tbone3: L("Der Koch richtet ein Steak mit Gemüse an", "Le cuisinier dresse un steak avec des légumes", "Il cuoco impiatta una bistecca con verdure", "The chef plating a steak with vegetables", "O cozinheiro emprata um bife com legumes"),
  weinoasis: L("Ein Kellner präsentiert einem Gast den Wein im Oasis", "Un serveur présente le vin à une cliente de l’Oasis", "Un cameriere presenta il vino a un’ospite dell’Oasis", "A waiter presenting the wine to a guest in the Oasis", "Um empregado apresenta o vinho a uma cliente no Oasis"),
  a3x1806: L("Die beleuchtete Bar des Oasis unter maurischen Bögen", "Le bar éclairé de l’Oasis sous des arcades mauresques", "Il bar illuminato dell’Oasis sotto archi moreschi", "The lit bar of the Oasis under Moorish arches", "O bar iluminado do Oasis sob arcos mouriscos"),
  a3x1812: L("Maurische Tür mit Palmblättern und Kerze im Oasis", "Porte mauresque avec feuilles de palmier et bougie à l’Oasis", "Porta moresca con foglie di palma e candela all’Oasis", "A Moorish door with palm leaves and a candle in the Oasis", "Porta mourisca com folhas de palmeira e vela no Oasis"),
  a3x1817: L("Hängende Eisenlaterne mit Flamme", "Lanterne en fer suspendue avec sa flamme", "Lanterna in ferro sospesa con fiamma", "A hanging iron lantern with a flame", "Lanterna de ferro suspensa com chama"),
  a3x1835: L("Tischlampe mit Stoffschirm und Ornament", "Lampe de table en tissu ornée", "Lampada da tavolo in tessuto decorata", "A fabric table lamp with an ornament", "Candeeiro de mesa em tecido com ornamento"),
  a3x1837: L("Schmiedeeiserne Wandkerzenhalter an der Steinwand", "Bougeoirs muraux en fer forgé sur le mur de pierre", "Portacandele da parete in ferro battuto sul muro di pietra", "Wrought-iron wall candle holders on the stone wall", "Castiçais de parede em ferro forjado na parede de pedra"),
  pict0006: L("Baustelle im alten Kino Rex: rohe Wände und Leitern", "Chantier dans l’ancien Kino Rex : murs bruts et échelles", "Cantiere nell’ex Kino Rex: muri grezzi e scale", "Building site in the old Kino Rex: bare walls and ladders", "Obras no antigo Kino Rex: paredes em bruto e escadas"),
  pict0008: L("Mit Folie abgedeckte Theke während des Umbaus", "Comptoir protégé par une bâche pendant les travaux", "Bancone coperto di teli durante la ristrutturazione", "The counter under plastic sheeting during the rebuild", "Balcão coberto de plástico durante a remodelação"),
  pict0009: L("Eine Frau streicht die Decke mit dem Roller", "Une femme peint le plafond au rouleau", "Una donna dipinge il soffitto con il rullo", "A woman painting the ceiling with a roller", "Uma mulher pinta o teto com um rolo"),
  pict0014: L("Gestapelte Möbel im Saal während des Umbaus", "Meubles empilés dans la salle pendant les travaux", "Mobili accatastati in sala durante i lavori", "Furniture stacked in the room during the rebuild", "Móveis empilhados na sala durante as obras"),
  pict0030: L("Ein Handwerker arbeitet in der neuen Ofennische", "Un artisan travaille dans la nouvelle niche du four", "Un artigiano lavora nella nuova nicchia del forno", "A craftsman working in the new oven niche", "Um artesão trabalha no novo nicho do forno"),
  pict0033: L("Die neue offene Küche mit roten Wänden und Spots", "La nouvelle cuisine ouverte aux murs rouges et spots", "La nuova cucina a vista con pareti rosse e faretti", "The new open kitchen with red walls and spotlights", "A nova cozinha aberta com paredes vermelhas e focos"),
  pict0034: L("Fertige Ecke mit Kerze, Trockenblumen und Eisengeländer", "Coin terminé avec bougie, fleurs séchées et rampe en fer", "Angolo finito con candela, fiori secchi e ringhiera in ferro", "A finished corner with a candle, dried flowers and an iron railing", "Canto terminado com vela, flores secas e corrimão de ferro"),
  choucalino: L("Das Choucalino-Maskottchen winkt im Saal vor dem Spielplatz", "La mascotte Choucalino salue dans la salle devant l’aire de jeux", "La mascotte Choucalino saluta in sala davanti al parco giochi", "The Choucalino mascot waving in the dining room by the playground", "A mascote Choucalino acena na sala junto ao parque infantil"),
  "mg-1996-verkleinert": L("Familie beim Essen vor dem bunten Spielplatz", "Une famille à table devant l’aire de jeux colorée", "Una famiglia a tavola davanti al parco giochi colorato", "A family eating in front of the colourful playground", "Uma família a comer em frente ao parque infantil colorido"),
  choucalinogrillfb: L("Zwei Kinder grillieren Cervelat am Choucalino® Kinder-Grill", "Deux enfants grillent des cervelas au grill Choucalino®", "Due bambini grigliano cervelat alla griglia Choucalino®", "Two children grilling cervelat at the Choucalino® kids’ grill", "Duas crianças grelham salsichas cervelat no grelhador Choucalino®"),
  pizzabacken5: L("Ein Kind trägt seine Pizza die Holztreppe hinunter", "Un enfant descend l’escalier en bois avec sa pizza", "Un bambino scende la scala di legno con la sua pizza", "A child carrying a pizza down the wooden stairs", "Uma criança desce a escada de madeira com a sua pizza"),
  "img-1173": L("Choucalino auf der Bühne mit einer Band", "Choucalino sur scène avec un groupe", "Choucalino sul palco con una band", "Choucalino on stage with a band", "O Choucalino em palco com uma banda"),
  nicole: L("Kinderzeichnung von Choucalino: «Liebes Choucalino Team, Dankeviel mals für das feine Essen. Von Nicole»", "Dessin d’enfant de Choucalino : « Chère équipe Choucalino, merci beaucoup pour le bon repas. Nicole »", "Disegno di una bambina con Choucalino: «Cara squadra Choucalino, grazie mille per il buon cibo. Nicole»", "A child’s drawing of Choucalino: “Dear Choucalino team, thank you very much for the lovely food. From Nicole”", "Desenho de uma criança com o Choucalino: «Querida equipa Choucalino, muito obrigada pela comida deliciosa. Da Nicole»"),
  magier: L("Ein Zauberer mit Bart und rauchendem Kessel", "Un magicien barbu et son chaudron fumant", "Un mago con la barba e un calderone fumante", "A bearded magician with a smoking cauldron", "Um mágico de barba com um caldeirão a fumegar"),
  "zaubershow-maerz2011": L("Plakat der Choucalino-Zaubershow vom März 2011", "Affiche du spectacle de magie Choucalino de mars 2011", "Locandina dello spettacolo di magia Choucalino di marzo 2011", "Poster for the Choucalino magic show in March 2011", "Cartaz do espetáculo de magia Choucalino de março de 2011"),
  "dsc06772-800x6001": L("Ein geschnitzter Kürbis leuchtet im Dunkeln", "Une citrouille sculptée brille dans le noir", "Una zucca intagliata brilla nel buio", "A carved pumpkin glowing in the dark", "Uma abóbora esculpida a brilhar no escuro"),
  zauber: L("Das Team verkleidet als Zauberer mit Hüten und Besen", "L’équipe déguisée en sorciers, chapeaux et balai", "La squadra travestita da maghi con cappelli e scopa", "The team dressed as wizards with hats and a broom", "A equipa mascarada de feiticeiros, com chapéus e vassoura"),
  ribsweb: L("Mexican Ribs: 480 g, mariniert mit Honig-Chili-Salsa", "Mexican Ribs : 480 g, marinés à la salsa miel-chili", "Mexican Ribs: 480 g, marinate con salsa miele e peperoncino", "Mexican Ribs: 480 g, marinated with honey-chilli salsa", "Mexican Ribs: 480 g, marinadas com salsa de mel e malagueta"),
  tapasweb: L("Tapas Deluxe: Gambas, Ribs, Mozzarella Sticks, Calamari, Chili Poppers, Chicken Wings & Chips", "Tapas Deluxe : gambas, ribs, mozzarella sticks, calamars, chili poppers, chicken wings et chips", "Tapas Deluxe: gamberi, ribs, mozzarella sticks, calamari, chili poppers, chicken wings e chips", "Tapas Deluxe: prawns, ribs, mozzarella sticks, calamari, chilli poppers, chicken wings and crisps", "Tapas Deluxe: gambas, ribs, mozzarella sticks, lulas, chili poppers, asas de frango e batatas fritas"),
  pinchitosfacebook: L("Pinchitos: rassige maurische Fleischspiesse mit gegrillten mazedonischen Paprikas", "Pinchitos : brochettes mauresques relevées et poivrons macédoniens grillés", "Pinchitos: spiedini moreschi piccanti con peperoni macedoni grigliati", "Pinchitos: spicy Moorish meat skewers with grilled Macedonian peppers", "Pinchitos: espetadas mouriscas picantes com pimentos macedónios grelhados"),
  bosg2: L("Das Choucas-Team mit der Trophäe von Best of Swiss Gastro", "L’équipe Choucas avec le trophée Best of Swiss Gastro", "La squadra Choucas con il trofeo Best of Swiss Gastro", "The Choucas team with the Best of Swiss Gastro trophy", "A equipa Choucas com o troféu Best of Swiss Gastro"),
  bestofgroupfoto: L("Gruppenfoto der Gewinner mit ihren Holztrophäen", "Photo de groupe des lauréats avec leurs trophées en bois", "Foto di gruppo dei vincitori con i trofei in legno", "Group photo of the winners with their wooden trophies", "Fotografia de grupo dos vencedores com os troféus de madeira"),
  dsc01710: L("Zwei Teammitglieder mit der Holztrophäe", "Deux membres de l’équipe avec le trophée en bois", "Due membri della squadra con il trofeo in legno", "Two team members holding the wooden trophy", "Dois membros da equipa com o troféu de madeira"),
  bob: L("Im Bob vor einer Alpenkulisse an der Award Night", "Dans un bob devant un décor alpin, à l’Award Night", "Su un bob davanti a uno scenario alpino all’Award Night", "In a bobsleigh in front of an Alpine backdrop at the Award Night", "Num bobsleigh diante de um cenário alpino na Award Night"),
  dsc01731: L("Programm der Award Night Best of Swiss Gastro, 21. November 2011", "Programme de l’Award Night Best of Swiss Gastro, 21 novembre 2011", "Programma dell’Award Night Best of Swiss Gastro, 21 novembre 2011", "Programme of the Best of Swiss Gastro Award Night, 21 November 2011", "Programa da Award Night Best of Swiss Gastro, 21 de novembro de 2011"),
  // page photos
  bildboxpizzeria: L("Pizza auf einem Tisch der Pizzeria Choucas", "Pizza sur une table de la Pizzeria Choucas", "Pizza su un tavolo della Pizzeria Choucas", "Pizza on a table at Pizzeria Choucas", "Pizza numa mesa da Pizzaria Choucas"),
  bildboxoasis: L("Lounge des Oasis Steakhouse mit Steinwand und Lichterkette", "Le salon de l’Oasis Steakhouse, mur de pierre et guirlande lumineuse", "Lounge dell’Oasis Steakhouse con muro di pietra e luci", "The Oasis Steakhouse lounge with a stone wall and string lights", "Lounge do Oasis Steakhouse com parede de pedra e luzes"),
  bildboxchoucalino: L("Das Choucalino-Maskottchen vor dem Indoor-Spielplatz", "La mascotte Choucalino devant l’aire de jeux couverte", "La mascotte Choucalino davanti al parco giochi coperto", "The Choucalino mascot in front of the indoor playground", "A mascote Choucalino diante do parque infantil coberto"),
  parilladaweb: L("Chef Parillada Argentina: Grillfleisch auf einer langen Platte mit Orangen und Guacamole", "Chef Parillada Argentina : viandes grillées sur un long plat avec oranges et guacamole", "Chef Parillada Argentina: carni grigliate su un piatto lungo con arance e guacamole", "Chef Parillada Argentina: grilled meats on a long platter with orange slices and guacamole", "Chef Parillada Argentina: carnes grelhadas numa travessa comprida com laranja e guacamole"),
  pizzageissupuer: L("Pizza Geissupür auf einem Tisch der Pizzeria", "La Pizza Geissupür sur une table de la pizzeria", "La Pizza Geissupür su un tavolo della pizzeria", "Pizza Geissupür on a table in the pizzeria", "A Pizza Geissupür numa mesa da pizzaria"),
  bestellenwebsitekleinkleinklein: L(
    "Flyer: «Wir bauen für Sie den Gilji's Take-Away um! Aber ihr könnt weiterhin bestellen! Einfach den QR Code scannen!» Bestellen und den Abholungstermin angeben, mit Kreditkarte, Twint, Bar, Apple Pay / VIPPS bezahlen, die Bestellung im Steakhouse Oasis oder Choucas abholen.",
    "Affiche : « Nous transformons pour vous le Gilji’s Take-Away ! Mais vous pouvez continuer à commander : scannez simplement le code QR ! » Commander en indiquant l’heure de retrait, payer par carte, Twint, en espèces, Apple Pay ou VIPPS, et retirer la commande au Steakhouse Oasis ou au Choucas.",
    "Volantino: «Stiamo rinnovando per voi il Gilji’s Take-Away! Ma potete continuare a ordinare: basta scansionare il codice QR!» Ordinare indicando l’ora di ritiro, pagare con carta, Twint, contanti, Apple Pay o VIPPS e ritirare l’ordine allo Steakhouse Oasis o al Choucas.",
    "Flyer: “We’re rebuilding Gilji’s Take-Away for you! But you can still order: just scan the QR code!” Order and choose a pick-up time, pay by card, Twint, cash, Apple Pay or VIPPS, and collect your order at the Steakhouse Oasis or at Choucas.",
    "Folheto: «Estamos a remodelar o Gilji’s Take-Away para si! Mas pode continuar a encomendar: basta digitalizar o código QR!» Encomendar indicando a hora de levantamento, pagar com cartão, Twint, numerário, Apple Pay ou VIPPS e levantar a encomenda no Steakhouse Oasis ou no Choucas.",
  ),
};
