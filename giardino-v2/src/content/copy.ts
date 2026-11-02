// The site's texts in German, French, English and Italian (argument order of l(): de, fr, en, it).
// Built from the restaurant's own pages and menus (pizzeriagiardino.ch, read 01.11.2026) and their official translations;
// headlines and connecting lines are new, but every fact restates a source. Nothing about awards, founding dates,
// wood-fired ovens, certifications, fermentation or prices is claimed.
import { l } from "@/i18n";

export const TX = {
  // ------------------------------------------------------------------ hero and story
  h1: l(
    "Pizzeria Giardino in Leukerbad – italienische Seele, alpines Herz",
    "Pizzeria Giardino à Leukerbad – âme italienne, cœur alpin",
    "Pizzeria Giardino in Leukerbad – Italian soul, alpine heart",
    "Pizzeria Giardino a Leukerbad – anima italiana, cuore alpino",
  ),
  eyebrow: l("Pizzeria Giardino · Leukerbad · Wallis", "Pizzeria Giardino · Leukerbad · Valais", "Pizzeria Giardino · Leukerbad · Valais", "Pizzeria Giardino · Leukerbad · Vallese"),
  heroLeft: l("Italienische Seele", "Âme italienne", "Italian soul", "Anima italiana"),
  heroRight: l("Alpines Herz", "Cœur alpin", "Alpine heart", "Cuore alpino"),
  introTag: l("Italienische Küche im Herzen von Leukerbad", "Cuisine italienne au cœur de Leukerbad", "Italian cooking in the heart of Leukerbad", "Cucina italiana nel cuore di Leukerbad"),
  storyLabel: l("Unsere Geschichte", "Notre histoire", "Our story", "La nostra storia"),
  ch1Title: l("Italienische Küche", "Cuisine italienne", "Italian cooking", "Cucina italiana"),
  ch1: l(
    "Bella Italia im Herzen des Bäderdorfs. Mit Leidenschaft und Kreativität zaubern wir italienische und traditionelle Köstlichkeiten auf den Tisch – den Pizzateig stellen wir täglich vor Ort frisch mit regionalen Zutaten her.",
    "La Bella Italia au cœur de la station thermale. Avec passion et créativité, nous servons des spécialités italiennes et traditionnelles – et nous préparons chaque jour sur place la pâte à pizza fraîche, avec des ingrédients régionaux.",
    "Bella Italia in the heart of the spa village. With passion and creativity we cook Italian and traditional dishes – and we make our pizza dough fresh on site every day, with regional ingredients.",
    "Un pezzo d’Italia nel cuore del villaggio termale. Con passione e creatività portiamo in tavola prelibatezze italiane e tradizionali – e ogni giorno prepariamo sul posto l’impasto fresco della pizza, con ingredienti regionali.",
  ),
  ch2Title: l("Mitten in den Alpen", "Au cœur des Alpes", "An alpine setting", "Nel cuore delle Alpi"),
  ch2: l(
    "Umrahmt von einer imposanten Bergkulisse: Von der sonnenverwöhnten Terrasse haben Sie freie Sicht auf die Gemmi und Torrent. Im Sommer ist sie der Treffpunkt für alle.",
    "Entourée de montagnes majestueuses : depuis la terrasse ensoleillée, la vue s’ouvre sur la Gemmi et le Torrent. En été, c’est le point de rencontre de tous.",
    "Framed by an imposing mountain backdrop: from the sun-drenched terrace you look straight at the Gemmi and the Torrent. In summer, it’s where everyone meets.",
    "Incorniciata da uno spettacolare scenario di montagna: dalla terrazza soleggiata la vista spazia sul Gemmi e sul Torrent. D’estate è il punto d’incontro di tutti.",
  ),
  ch3Title: l("Familiäre Gastfreundschaft", "Une hospitalité familiale", "Family hospitality", "Ospitalità di famiglia"),
  ch3: l(
    "Seit 2012 führen Pascal und Anja Loretan die gelebte und geliebte Gastgebertradition im Giardino in zweiter Generation fort – mit Spielzimmer, grossem Aussenspielplatz und Piratenschiff für die jüngsten Gäste.",
    "Depuis 2012, Pascal et Anja Loretan perpétuent en deuxième génération la tradition d’hospitalité du Giardino – avec une salle de jeux, une grande aire de jeux extérieure et un bateau de pirates pour les plus jeunes.",
    "Since 2012, Pascal and Anja Loretan have carried Giardino’s treasured tradition of hospitality into its second generation – with a playroom, a big outdoor playground and a pirate ship for the youngest guests.",
    "Dal 2012 Pascal e Anja Loretan portano avanti in seconda generazione la tradizione dell’ospitalità del Giardino – con una sala giochi, un grande parco giochi all’aperto e una nave dei pirati per i più piccoli.",
  ),
  storyEnd: l("Dürfen wir Sie davon überzeugen?", "Nous permettez-vous de vous le prouver ?", "Would you let us show you what we can do?", "Avremo modo di stupirvi?"),

  // ------------------------------------------------------------------ four chapters from the kitchen
  kitchenTitle: l("Aus unserer Küche", "De notre cuisine", "From our kitchen", "Dalla nostra cucina"),
  pizza: l("Pizza", "Pizza", "Pizza", "Pizza"),
  pasta: l("Pasta", "Pâtes", "Pasta", "Pasta"),
  risotto: l("Risotto", "Risotto", "Risotto", "Risotto"),
  desserts: l("Desserts", "Desserts", "Desserts", "Dessert"),
  pizzaLine: l(
    "Den Pizzateig stellen wir täglich vor Ort frisch mit regionalen Zutaten her.",
    "Nous préparons chaque jour sur place la pâte à pizza fraîche, avec des ingrédients régionaux.",
    "We make our pizza dough fresh on site every day, with regional ingredients.",
    "Prepariamo ogni giorno sul posto l’impasto fresco della pizza, con ingredienti regionali.",
  ),
  pastaLine: l(
    "Marktfrisch, authentisch, genussvoll – darauf achten wir nicht nur bei der Zubereitung, sondern bereits beim Einkauf.",
    "Frais du marché, authentique, savoureux – nous y veillons en cuisine, mais déjà lors des achats.",
    "Fresh from the market, authentic, enjoyable – we take care of that when we shop, not only when we cook.",
    "Freschezza, autenticità, gusto – ci badiamo in cucina, ma già quando scegliamo gli ingredienti.",
  ),
  risottoLine: l(
    "Das Risotto hat auf unserer Speisekarte ein eigenes Kapitel – gleich neben den Fleischgerichten und den Spezialitäten aus der Region.",
    "Le risotto a son propre chapitre sur notre carte – à côté des plats de viande et des spécialités de la région.",
    "Risotto has a chapter of its own on our menu – right next to the meat dishes and the specialities from the region.",
    "Il risotto ha un capitolo tutto suo nel nostro menù – accanto ai piatti di carne e alle specialità della regione.",
  ),
  dessertsLine: l(
    "Coupes, Panna Cotta, Sorbets mit Schuss und Glace nach Kugeln.",
    "Coupes, panna cotta, sorbets arrosés et glaces à la boule.",
    "Sundaes, panna cotta, sorbets with a little kick and ice cream by the scoop.",
    "Coppe, panna cotta, sorbetti corretti e gelato a palline.",
  ),
  onTheMenu: l("Auf der Karte", "Sur la carte", "On the menu", "Nel menù"),

  // ------------------------------------------------------------------ welcome cards
  distinctive: l("Die aparte Pizzeria", "La pizzeria insolite", "The distinctive pizzeria", "La pizzeria del buon gusto"),
  distinctiveLead: l(
    "Stylische Eleganz spielt raffiniert mit dem heimeligen Touch von Holz und gibt dem Giardino mit viel Liebe zum Detail seinen einzigartigen Charakter.",
    "Le cadre élégant se marie avec subtilité à l’ambiance chaleureuse du bois et donne au Giardino son caractère unique, soigné jusque dans les moindres détails.",
    "Stylish elegance plays cleverly with a cosy touch of wood and, with a great deal of attention to detail, gives Giardino its unique character.",
    "L’eleganza di classe gioca abilmente con il legno, dando al Giardino un tocco accogliente e un carattere unico, curato nei minimi dettagli.",
  ),
  cardEatTitle: l("Essen & Geniessen", "Manger & savourer", "Eat & Enjoy", "Mangiare & gustare"),
  cardEat: l(
    "Italienische und traditionelle Köstlichkeiten, Walliser Weine aus der Region und italienische Tropfen – auch glasweise.",
    "Spécialités italiennes et traditionnelles, vins de la région du Valais et crus italiens – aussi au verre.",
    "Italian and traditional delicacies, Valais wines from the region and Italian wines – by the glass, too.",
    "Prelibatezze italiane e tradizionali, vini del Vallese e vini italiani – anche al bicchiere.",
  ),
  cardFamilyTitle: l("Für die ganze Familie", "Pour toute la famille", "For the Whole Family", "Per tutta la famiglia"),
  cardFamily: l(
    "Ein Spielzimmer drinnen, im Sommer der grosse Aussenspielplatz mit Piratenschiff – und eine eigene Kinderkarte.",
    "Une salle de jeux à l’intérieur, en été la grande aire de jeux avec bateau de pirates – et une carte rien que pour les enfants.",
    "A playroom indoors, the big outdoor playground with its pirate ship in summer – and a menu just for children.",
    "Una sala giochi all’interno, d’estate il grande parco giochi con la nave dei pirati – e un menù tutto per i bambini.",
  ),
  cardHostsTitle: l("Ihre Gastgeber", "Vos hôtes", "Meet Your Hosts", "I vostri padroni di casa"),
  cardHostsHand: l("Pascal & Anja", "Pascal & Anja", "Pascal & Anja", "Pascal & Anja"),
  cardHosts: l(
    "Seit 2012 in zweiter Generation: «Wenn unsere Gäste glücklich und zufrieden sind, sind wir es auch!»",
    "Depuis 2012, en deuxième génération : «Si nos clients sont heureux et contents, nous le sommes aussi !»",
    "The second generation since 2012: “If our guests are happy and satisfied, then we are too.”",
    "Dal 2012, in seconda generazione: «Se i nostri ospiti sono felici e soddisfatti, lo siamo anche noi!»",
  ),

  // ------------------------------------------------------------------ kitchen editorial
  delightsTitle: l("Kulinarische Gaumenfreuden", "Plaisirs culinaires", "Culinary delights", "I piaceri del palato"),
  delights1: l(
    "Marktfrisch, authentisch, genussvoll. Darauf achten wir nicht nur bei der Zubereitung, sondern bereits beim Einkauf. Mit Leidenschaft und Kreativität zaubern wir italienische und traditionelle Köstlichkeiten auf den Tisch. Unsere vielfältige Auswahl sowie die spezielle Kinderspeisekarte lassen grosse und kleine Gourmetherzen höherschlagen.",
    "Des produits frais du marché, authentiques et délicieux. Nous y veillons lors de la préparation, mais aussi et surtout lors des achats. C’est avec passion et créativité que nous servons des mets italiens et traditionnels. Notre large choix et notre carte pensée pour les enfants font le bonheur des grands et des petits gourmets.",
    "Fresh from the market, authentic, enjoyable. We take care of that not only in the kitchen but from the moment we shop. With passion and creativity we conjure up Italian and traditional delicacies, and our varied selection and our special children’s menu win the hearts of gourmets big and small.",
    "Freschezza, autenticità, gusto. Prestiamo attenzione non solo alla preparazione, ma già alla scelta degli ingredienti. Con passione e creatività portiamo in tavola prelibatezze italiane e tradizionali; la nostra ricca scelta e il menù pensato per i più piccoli conquistano i buongustai, grandi e piccoli.",
  ),
  delights2: l(
    "Vorzügliche Walliser Weine aus der Region und auserlesene italienische Tropfen, die wir auch glasweise anbieten, runden das Genussbouquet ab.",
    "Les fameux vins de la région du Valais et les grands crus italiens, servis également au verre, viennent parfaire le bouquet.",
    "Excellent Valais wines from the region and fine Italian wines, which we also serve by the glass, round off the pleasure.",
    "Squisiti vini locali del Vallese e raffinati vini italiani, che serviamo anche al bicchiere, completano il piacere della tavola.",
  ),
  winesHand: l("Walliser Weine – auch im Glas", "Vins du Valais – aussi au verre", "Valais wines – by the glass, too", "Vini vallesani – anche al bicchiere"),
  factDough: l("Pizzateig, täglich frisch", "Pâte à pizza, fraîche chaque jour", "Pizza dough, fresh every day", "Impasto della pizza, fresco ogni giorno"),
  factBread: l("Brot aus dem Dorf", "Le pain du village", "Bread from the village", "Il pane del paese"),
  factBreadText: l(
    "Unser Brot beziehen wir täglich von der Bäckerei la Bohème in Leukerbad.",
    "Notre pain vient chaque jour de la boulangerie la Bohème à Leukerbad.",
    "Our bread comes from the la Bohème bakery in Leukerbad every day.",
    "Il nostro pane arriva ogni giorno dalla panetteria la Bohème di Leukerbad.",
  ),
  factWir: l("100 % WIR", "100 % WIR", "100% WIR", "100% WIR"),
  factWirText: l(
    "Als 100-Prozent-WIR-Betrieb akzeptieren wir auch gerne WIR-Geld.",
    "En tant qu’entreprise 100 % WIR, nous acceptons aussi le franc WIR.",
    "As a 100 percent WIR business, we are happy to accept WIR money too.",
    "In quanto esercizio 100% WIR, accettiamo volentieri anche il denaro WIR.",
  ),
  stampDough: l("Pizzateig · täglich frisch · ", "Pâte à pizza · fraîche chaque jour · ", "Pizza dough · fresh every day · ", "Impasto · fresco ogni giorno · "),
  stampFamily: l("Famiglia · Giardino · Leukerbad · ", "Famiglia · Giardino · Leukerbad · ", "Famiglia · Giardino · Leukerbad · ", "Famiglia · Giardino · Leukerbad · "),

  // ------------------------------------------------------------------ statement
  statement: l(
    "Bella Italia im Herzen des Bäderdorfs – mit freier Sicht auf die Gemmi und Torrent.",
    "La Bella Italia au cœur de la station thermale – avec vue sur la Gemmi et le Torrent.",
    "Bella Italia in the heart of the spa village – with a clear view of the Gemmi and the Torrent.",
    "Un pezzo d’Italia nel cuore del villaggio termale – con vista sul Gemmi e sul Torrent.",
  ),

  // ------------------------------------------------------------------ offerings (alternating editorial)
  offeringsTitle: l("Was Sie erwartet", "Ce qui vous attend", "What awaits you", "Cosa vi aspetta"),
  kidsLine: l("Ein Restaurant ohne Kinderlachen ist nur ein Lokal …", "Un restaurant sans rires d’enfants n’est qu’un simple local …", "A restaurant without children’s laughter is just a place to eat …", "Un ristorante senza le risate dei bambini è solo un locale …"),
  offKidsMenuTitle: l("Die Kinderkarte", "La carte des enfants", "The children’s menu", "Il menù bambini"),
  offKidsMenu: l(
    "Ihr seid bei uns die Grössten: Auf unserer extra kinderfreundlichen Speisekarte findet ihr verschiedene leckere Sachen.",
    "Chez nous, c’est vous les plus grands : notre carte pensée pour les enfants est pleine de bonnes choses.",
    "You are the most important people here: our extra child-friendly menu is full of yummy things to eat.",
    "Da noi siete voi i più grandi: nel nostro menù per i più piccoli troverete tantissimi piatti deliziosi.",
  ),
  offPlayroomTitle: l("Das Spielzimmer", "La salle de jeux", "The indoor playroom", "La sala giochi"),
  offPlayroom: l(
    "Damit niemand stundenlang am Tisch sitzen muss, gibt es ein Spielzimmer zum Austoben – mit Kletterturm, Rutsche und Tischfussball.",
    "Pour ne pas devoir rester à table pendant des heures : une salle de jeux pour se défouler – avec tour d’escalade, toboggan et baby-foot.",
    "So nobody has to sit at the table for hours, there is a playroom to let off steam – with a climbing tower, a slide and table football.",
    "Per non restare seduti per ore a tavola c’è una sala giochi per scatenarsi – con torre per arrampicarsi, scivolo e calcetto.",
  ),
  offShipTitle: l("Spielplatz & Piratenschiff", "Aire de jeux & bateau de pirates", "Playground & pirate ship", "Parco giochi & nave dei pirati"),
  offShip: l(
    "Im Sommer dürft ihr euch auf dem grossen Aussenspielplatz tummeln – und seit Sommer 2016 wartet dort ein riesiges Piratenschiff darauf, erobert zu werden.",
    "En été, place à la grande aire de jeux extérieure – et depuis l’été 2016, un immense bateau de pirates attend d’être conquis.",
    "In summer, the big outdoor playground is all yours – and since summer 2016 an enormous pirate ship has been waiting there to be conquered.",
    "D’estate potete scatenarvi nel grande parco giochi all’aperto – dove dall’estate 2016 un’enorme nave dei pirati aspetta di essere conquistata.",
  ),
  offShipHand: l("Pst! Ein Geheimnis …", "Chut ! Un secret …", "Shhh! A secret …", "Pss! Un segreto …"),
  offTerraceTitle: l("Terrasse mit Aussicht", "Une terrasse avec vue", "A terrace with a view", "Una terrazza con vista"),
  offTerrace: l(
    "Die sonnenverwöhnte Terrasse mit freier Sicht auf die Gemmi und Torrent macht den italienischen Traum perfekt.",
    "La terrasse ensoleillée, avec sa vue panoramique sur la Gemmi et le Torrent, incarne à la perfection le rêve italien.",
    "The sun-drenched terrace, with its clear view of the Gemmi and the Torrent, makes the Italian dream complete.",
    "La terrazza soleggiata con ampia vista sul Gemmi e sul Torrent rende il sogno italiano assolutamente perfetto.",
  ),
  offTerraceHand: l("Gemmi & Torrent", "Gemmi & Torrent", "Gemmi & Torrent", "Gemmi & Torrent"),
  offHostsTitle: l("Gast sein ist gut – sich zu Hause fühlen noch besser!", "Être reçu en hôte, c’est bien – se sentir comme à la maison, c’est encore mieux !", "It is nice being a guest – but feeling at home is even better!", "Sentirsi ospiti è bello – ma sentirsi a casa è ancora meglio!"),
  offHosts: l(
    "Pascal und Anja Loretan setzen die Gastgebertradition im Giardino seit 2012 in zweiter Generation fort. Die Freude am Verwöhnen geben sie auch an ihre Söhne Janis und Niklas weiter – und zwei Service-Feen und Küchen-Kobolde umsorgen die Gäste schon seit vielen Jahren.",
    "Pascal et Anja Loretan perpétuent depuis 2012, en deuxième génération, la tradition d’hospitalité du Giardino. Ils transmettent le plaisir de choyer leurs hôtes à leurs fils Janis et Niklas – et deux fées du service et lutins de la cuisine sont aux petits soins pour les clients depuis de nombreuses années.",
    "Since 2012, Pascal and Anja Loretan have continued Giardino’s tradition of hospitality as the second generation. They are passing the joy of looking after guests on to their sons, Janis and Niklas – and two of their service fairies and kitchen imps have been caring for guests for many years.",
    "Dal 2012 Pascal e Anja Loretan portano avanti in seconda generazione la tradizione dell’ospitalità del Giardino. La gioia di coccolare gli ospiti la trasmettono anche ai figli Janis e Niklas – e due fate del servizio e folletti della cucina si prendono cura degli ospiti da molti anni.",
  ),
  hostsQuote: l(
    "«Wenn unsere Gäste glücklich und zufrieden sind, sind wir es auch!»",
    "«Si nos clients sont heureux et contents, nous le sommes aussi !»",
    "“If our guests are happy and satisfied, then we are too.”",
    "«Se i nostri ospiti sono felici e soddisfatti, lo siamo anche noi!»",
  ),
  hostsSign: l("Pascal und Anja Loretan & Team", "Pascal et Anja Loretan & toute l’équipe", "Pascal and Anja Loretan & Team", "Pascal e Anja Loretan con il team"),

  // ------------------------------------------------------------------ experience: the aerial photo with places
  exploreTitle: l("Das Giardino entdecken", "Découvrir le Giardino", "Explore Giardino", "Scoprire il Giardino"),
  exploreLead: l(
    "Luftaufnahme von 2025: das Restaurant mit Terrasse und Spielplatz, dahinter Leukerbad und die Felswände. Wählen Sie einen Ort.",
    "Vue aérienne de 2025 : le restaurant avec sa terrasse et son aire de jeux, derrière, Leukerbad et les parois rocheuses. Choisissez un lieu.",
    "Aerial photo from 2025: the restaurant with its terrace and playground, Leukerbad and the cliffs behind. Choose a place.",
    "Foto aerea del 2025: il ristorante con terrazza e parco giochi, dietro Leukerbad e le pareti rocciose. Scegliete un luogo.",
  ),
  placeKitchen: l("Die Küche", "La cuisine", "The kitchen", "La cucina"),
  placeKitchenText: l(
    "Italienische und traditionelle Gerichte, täglich frischer Pizzateig, Brot von der Bäckerei la Bohème im Dorf, Walliser und italienische Weine – auch glasweise.",
    "Plats italiens et traditionnels, pâte à pizza fraîche chaque jour, pain de la boulangerie la Bohème du village, vins du Valais et d’Italie – aussi au verre.",
    "Italian and traditional dishes, pizza dough made fresh every day, bread from the la Bohème bakery in the village, Valais and Italian wines – by the glass, too.",
    "Piatti italiani e tradizionali, impasto della pizza fresco ogni giorno, pane della panetteria la Bohème del paese, vini vallesani e italiani – anche al bicchiere.",
  ),
  placeTerrace: l("Die Sonnenterrasse", "La terrasse ensoleillée", "The sun terrace", "La terrazza soleggiata"),
  placeTerraceText: l(
    "Sonnenverwöhnt und unter dem Glasdach, mit freier Sicht auf die Gemmi und Torrent. Im Sommer der Treffpunkt für alle.",
    "Ensoleillée, sous sa verrière, avec vue sur la Gemmi et le Torrent. En été, le point de rencontre de tous.",
    "Sun-drenched, under its glass roof, with a clear view of the Gemmi and the Torrent. In summer, it’s where everyone meets.",
    "Soleggiata, sotto il tetto di vetro, con vista sul Gemmi e sul Torrent. D’estate, il punto d’incontro di tutti.",
  ),
  placePlay: l("Spielen & Toben", "Jouer & se défouler", "Play & let off steam", "Giocare & scatenarsi"),
  placePlayText: l(
    "Drinnen das Spielzimmer, draussen im Sommer der grosse Spielplatz mit dem Piratenschiff – gleich neben der Terrasse.",
    "À l’intérieur la salle de jeux, dehors en été la grande aire de jeux et son bateau de pirates – juste à côté de la terrasse.",
    "The playroom indoors and, in summer, the big playground with the pirate ship outside – right next to the terrace.",
    "Dentro la sala giochi, fuori d’estate il grande parco giochi con la nave dei pirati – proprio accanto alla terrazza.",
  ),
  placeVillage: l("Mitten in Leukerbad", "Au centre de Leukerbad", "In the heart of Leukerbad", "Nel cuore di Leukerbad"),
  placeVillageText: l(
    "Sie finden uns an der Thermenstrasse 9, im Zentrum des Bäderdorfs. Unsere Partnerhotels Heilquelle, Paradis und Viktoria liegen ebenfalls in Leukerbad.",
    "Vous nous trouverez à la Thermenstrasse 9, au centre de la station thermale. Nos hôtels partenaires Heilquelle, Paradis et Viktoria sont eux aussi à Leukerbad.",
    "You will find us at Thermenstrasse 9, in the centre of the spa village. Our partner hotels, Heilquelle, Paradis and Viktoria, are in Leukerbad too.",
    "Ci trovate in Thermenstrasse 9, nel centro del villaggio termale. Anche i nostri hotel partner Heilquelle, Paradis e Viktoria si trovano a Leukerbad.",
  ),
  pizzaTitle: l("Einmal drehen, bitte", "Faites-la tourner", "Give it a spin", "Fatela girare"),
  pizzaText: l(
    "Eine Pizza mit Rucola, Cherrytomaten und Mozzarella – als 3D-Illustration. Die echte gibt es mit täglich frischem Teig im Giardino.",
    "Une pizza roquette, tomates cerises et mozzarella – en illustration 3D. La vraie, avec sa pâte fraîche du jour, vous attend au Giardino.",
    "A pizza with rocket, cherry tomatoes and mozzarella – as a 3D illustration. The real one, with dough made fresh that day, is waiting at Giardino.",
    "Una pizza con rucola, pomodorini e mozzarella – come illustrazione 3D. Quella vera, con l’impasto fresco del giorno, vi aspetta al Giardino.",
  ),

  // ------------------------------------------------------------------ hours
  hoursTitle: l("Öffnungszeiten", "Horaires", "Opening hours", "Orari"),
  hoursLine: l("Geöffnet 11:00–23:00 · Mittwoch Ruhetag", "Ouvert de 11 h à 23 h · fermé le mercredi", "Open 11:00–23:00 · closed on Wednesdays", "Aperto 11:00–23:00 · chiuso il mercoledì"),
  kitchenLine: l("Warme Küche 11:30–15:00 und 17:00–21:30", "Cuisine chaude de 11 h 30 à 15 h et de 17 h à 21 h 30", "Hot meals 11:30–15:00 and 17:00–21:30", "Cucina calda 11:30–15:00 e 17:00–21:30"),
  regularHours: l("Reguläre Öffnungszeiten", "Horaires habituels", "Regular opening hours", "Orari regolari"),
  regularFrom: l("Reguläre Zeiten wieder ab {date}", "Horaires habituels dès le {date}", "Regular hours again from {date}", "Orari regolari di nuovo dal {date}"),
  closureDays: l("Betriebsferien", "Vacances annuelles", "Company holidays", "Ferie aziendali"),
  hoursNote: l(
    "Alle Zeiten in Leukerbader Ortszeit. Zeitlich begrenzte Schliessungen gehen den regulären Zeiten vor.",
    "Toutes les heures sont celles de Leukerbad. Les fermetures temporaires priment sur les horaires habituels.",
    "All times are Leukerbad local time. Temporary closures take precedence over the regular hours.",
    "Tutti gli orari sono in ora locale di Leukerbad. Le chiusure temporanee hanno la precedenza sugli orari regolari.",
  ),

  // ------------------------------------------------------------------ menus, vouchers, hotels, tour
  menusTitle: l("Unsere Karten", "Nos cartes", "Our menus", "I nostri menù"),
  menusLead: l(
    "Die aktuellen Karten des Giardino als PDF, direkt von pizzeriagiardino.ch. Bei Allergien wenden Sie sich bitte an unser Serviceteam.",
    "Les cartes actuelles du Giardino en PDF, directement depuis pizzeriagiardino.ch. En cas d’allergie, adressez-vous à notre équipe de service.",
    "Giardino’s current menus as PDFs, straight from pizzeriagiardino.ch. If you have an allergy, please ask our service team.",
    "I menù attuali del Giardino in PDF, direttamente da pizzeriagiardino.ch. In caso di allergie rivolgetevi al nostro personale di servizio.",
  ),
  giftsTitle: l("Schenken & Übernachten", "Offrir & séjourner", "Gifts & stays", "Regalare & soggiornare"),
  vouchersTitle: l("Gutscheine verschenken", "Offrir un bon cadeau", "Give a voucher", "Regalare un buono"),
  vouchersText: l(
    "Wertgutscheine über CHF 50, 100 oder 150 oder einen frei wählbaren Betrag, gültig zwei Jahre ab Kauf – online bestellt bei felizzio.",
    "Bons de CHF 50, 100 ou 150 ou d’un montant libre, valables deux ans dès l’achat – à commander en ligne chez felizzio.",
    "Value vouchers for CHF 50, 100 or 150, or an amount of your choice, valid for two years from purchase – ordered online through felizzio.",
    "Buoni da CHF 50, 100 o 150 o di un importo a scelta, validi due anni dall’acquisto – da ordinare online su felizzio.",
  ),
  vouchersCta: l("Gutschein bestellen", "Commander un bon", "Order a voucher", "Ordina un buono"),
  vouchersLangNote: l("", "", "", "Il negozio di felizzio è in tedesco, inglese e francese."),
  hotelsTitle: l("Unsere Partnerhotels", "Nos hôtels partenaires", "Our partner hotels", "I nostri hotel partner"),
  hotelsLead: l("Übernachten in Leukerbad – bei den Partnerhotels des Giardino.", "Dormir à Leukerbad – chez les hôtels partenaires du Giardino.", "Staying in Leukerbad – with Giardino’s partner hotels.", "Dormire a Leukerbad – negli hotel partner del Giardino."),
  tourTitle: l("Virtueller Rundgang", "Visite virtuelle", "Virtual tour", "Tour virtuale"),
  tourText: l(
    "Schauen Sie sich vor dem Besuch in 3D im Giardino um – der Rundgang läuft bei Matterport.",
    "Faites le tour du Giardino en 3D avant votre visite – la visite est hébergée par Matterport.",
    "Take a look around Giardino in 3D before you visit – the tour is hosted by Matterport.",
    "Fate un giro del Giardino in 3D prima della visita – il tour è ospitato da Matterport.",
  ),
  tourCta: l("Rundgang starten", "Lancer la visite", "Start the tour", "Avvia il tour"),
  website: l("Website", "Site web", "Website", "Sito web"),

  // ------------------------------------------------------------------ gallery
  galleryTitle: l("Momente im Giardino", "Moments au Giardino", "Moments at Giardino", "Momenti al Giardino"),
  galleryLead: l(
    "Küche, Gaststube, Terrasse, Spielzimmer und Piratenschiff – die Fotos des Giardino.",
    "Cuisine, salle, terrasse, salle de jeux et bateau de pirates – les photos du Giardino.",
    "Kitchen, dining room, terrace, playroom and pirate ship – photos of Giardino.",
    "Cucina, sala, terrazza, sala giochi e nave dei pirati – le foto del Giardino.",
  ),

  // ------------------------------------------------------------------ reviews
  reviewsTitle: l("Worte unserer Gäste", "Les mots de nos hôtes", "Words from our guests", "Le parole dei nostri ospiti"),
  reviewsLead: l(
    "Bewertungen von Gästen auf Google, im Originalwortlaut.",
    "Avis de clients publiés sur Google, dans leur version originale.",
    "Reviews our guests left on Google, in their original words.",
    "Recensioni lasciate dagli ospiti su Google, con le loro parole originali.",
  ),
  reviewsNote: l(
    "Persönliche Eindrücke unserer Gäste. Angaben zu Preisen, Gerichten oder vegetarischen und veganen Optionen sind Meinungen und können sich ändern – fragen Sie uns gerne.",
    "Impressions personnelles de nos clients. Les remarques sur les prix, les plats ou les options végétariennes et véganes sont des opinions et peuvent changer – n’hésitez pas à nous demander.",
    "Personal impressions of our guests. Remarks about prices, dishes or vegetarian and vegan options are opinions and may change – just ask us.",
    "Impressioni personali dei nostri ospiti. Le osservazioni su prezzi, piatti od opzioni vegetariane e vegane sono opinioni e possono cambiare – chiedeteci pure.",
  ),

  // ------------------------------------------------------------------ contact
  contactTitle: l("Besuch & Kontakt", "Visite & contact", "Visit & contact", "Visita & contatti"),
  centre: l("Im Zentrum von Leukerbad", "Au centre de Leukerbad", "In the centre of Leukerbad", "Nel centro di Leukerbad"),
  directions: l("Route planen", "Itinéraire", "Get directions", "Indicazioni stradali"),
  appleMaps: l("Apple Karten", "Plans d’Apple", "Apple Maps", "Mappe di Apple"),
  formTitle: l("Schreiben Sie uns", "Écrivez-nous", "Write to us", "Scriveteci"),
  formLead: l(
    "Für Fragen, Gruppen oder Feedback. Für Tischreservationen rufen Sie uns bitte an.",
    "Pour vos questions, groupes ou remarques. Pour réserver une table, appelez-nous s’il vous plaît.",
    "For questions, groups or feedback. To reserve a table, please give us a call.",
    "Per domande, gruppi o commenti. Per prenotare un tavolo, chiamateci.",
  ),
  fMessage: l("Ihre Nachricht", "Votre message", "Your message", "Il vostro messaggio"),
  fName: l("Vorname / Name", "Prénom / nom", "Name / last name", "Nome / cognome"),
  fAddress: l("Adresse", "Adresse", "Address", "Indirizzo"),
  fCity: l("PLZ / Ort", "NPA / localité", "Postal code / city", "NPA / località"),
  fPhone: l("Telefon", "Téléphone", "Phone", "Telefono"),
  fEmail: l("E-Mail", "E-mail", "E-mail", "E-mail"),
  fConsent: l("Ich habe die {privacy} gelesen und akzeptiere sie.", "J’ai lu et j’accepte la {privacy}.", "I have read and accept the {privacy}.", "Ho letto e accetto l’{privacy}."),
  fConsentLink: l("Datenschutzerklärung", "déclaration de protection des données", "privacy statement", "informativa sulla privacy"),
  formNoBackend: l(
    "Dieses Formular sendet nichts selbst: Es öffnet Ihr E-Mail-Programm mit der fertigen Nachricht an info@pizzeriagiardino.ch. Sie entscheiden dort, ob Sie sie abschicken.",
    "Ce formulaire n’envoie rien lui-même : il ouvre votre messagerie avec le message prêt pour info@pizzeriagiardino.ch. C’est vous qui décidez de l’envoyer.",
    "This form doesn’t send anything by itself: it opens your e-mail app with the finished message to info@pizzeriagiardino.ch. You decide there whether to send it.",
    "Questo modulo non invia nulla da sé: apre il vostro programma di posta con il messaggio pronto per info@pizzeriagiardino.ch. Siete voi a decidere se inviarlo.",
  ),
  formHanded: l(
    "Ihr E-Mail-Programm sollte sich jetzt mit Ihrer Nachricht öffnen. Erst wenn Sie dort auf «Senden» klicken, erreicht sie uns. Hat sich nichts geöffnet? Kopieren Sie den Text und schreiben Sie an info@pizzeriagiardino.ch.",
    "Votre messagerie devrait maintenant s’ouvrir avec votre message. Il ne nous parviendra que lorsque vous cliquerez sur «Envoyer». Rien ne s’est ouvert ? Copiez le texte et écrivez à info@pizzeriagiardino.ch.",
    "Your e-mail app should now open with your message. It only reaches us once you press “Send” there. Nothing opened? Copy the text and write to info@pizzeriagiardino.ch.",
    "Il vostro programma di posta dovrebbe ora aprirsi con il messaggio. Ci arriverà solo quando premerete «Invia». Non si è aperto nulla? Copiate il testo e scrivete a info@pizzeriagiardino.ch.",
  ),
  copyText: l("Text kopieren", "Copier le texte", "Copy the text", "Copia il testo"),
  copied: l("Kopiert", "Copié", "Copied", "Copiato"),
  formSent: l("Danke! Ihre Nachricht ist bei uns angekommen.", "Merci ! Votre message nous est bien parvenu.", "Thank you! Your message has reached us.", "Grazie! Il vostro messaggio ci è arrivato."),
  formFailed: l("Das Senden hat nicht geklappt. Bitte schreiben Sie direkt an", "L’envoi n’a pas fonctionné. Écrivez-nous directement à", "Sending didn’t work. Please write directly to", "L’invio non è riuscito. Scriveteci direttamente a"),
  mailSubject: l("Nachricht über die Website", "Message depuis le site web", "Message from the website", "Messaggio dal sito web"),

  // ------------------------------------------------------------------ footer
  footerBook: l("Reservationen telefonisch, täglich 10–23 Uhr", "Réservations par téléphone, tous les jours de 10 h à 23 h", "Reservations by phone, daily 10:00–23:00", "Prenotazioni per telefono, ogni giorno 10–23"),
  follow: l("Das Giardino im Netz", "Le Giardino en ligne", "Giardino online", "Il Giardino online"),
};
