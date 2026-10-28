// Languages, routes and every string on the site. The live site exists only in French: TEXT copies it
// verbatim (typos included, see README); English, Portuguese (pt-PT), Italian and Swiss German ("ss", never
// "ß") are translations that need a native-speaker check before launch. Pastry, product and brand names,
// prices, the phone number, the e-mail and the address never change. Order of every L(...) call: fr, en, pt, it, de.
export type Lang = "fr" | "en" | "pt" | "it" | "de";
export type PageKey = "home" | "offer" | "contact" | "privacy" | "legal";
export type Localized = Record<Lang, string>;

export const LANGS: Lang[] = ["fr", "en", "pt", "it", "de"];
export const NATIVE: Record<Lang, string> = { fr: "Français", en: "English", pt: "Português", it: "Italiano", de: "Deutsch" };
export const HTML_LANG: Record<Lang, string> = { fr: "fr", en: "en", pt: "pt-PT", it: "it", de: "de-CH" };
export const LOCALE: Record<Lang, string> = { fr: "fr-CH", en: "en-GB", pt: "pt-PT", it: "it-CH", de: "de-CH" };

export const SLUGS: Record<Lang, Record<PageKey, string>> = {
  fr: { home: "", offer: "ce-que-nous-proposons", contact: "contact", privacy: "privacy", legal: "mentions-legales" },
  en: { home: "", offer: "what-we-offer", contact: "contact", privacy: "privacy", legal: "legal-notice" },
  pt: { home: "", offer: "o-que-oferecemos", contact: "contacto", privacy: "privacidade", legal: "aviso-legal" },
  it: { home: "", offer: "la-nostra-offerta", contact: "contatti", privacy: "privacy", legal: "note-legali" },
  de: { home: "", offer: "unser-angebot", contact: "kontakt", privacy: "datenschutz", legal: "impressum" },
};

export const isLang = (v: unknown): v is Lang => LANGS.includes(v as Lang);
export function pageFromSlug(lang: Lang, slug = ""): PageKey | null {
  const hit = (Object.keys(SLUGS[lang]) as PageKey[]).find((k) => SLUGS[lang][k] === slug.replace(/\/$/, ""));
  return hit ?? null;
}
export const pathFor = (lang: Lang, page: PageKey) => `/${lang}/${SLUGS[lang][page]}`;

export const L = (fr: string, en: string, pt: string, it: string, de: string): Localized => ({ fr, en, pt, it, de });
export const fill = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
/** A name that stays the same in every language. */
export const same = (s: string): Localized => L(s, s, s, s, s);
/** A localized record from a JSON entry that only spells out the languages that differ from French. */
export const loc = (r: Partial<Localized> & { fr: string }): Localized => L(r.fr, r.en ?? r.fr, r.pt ?? r.fr, r.it ?? r.fr, r.de ?? r.fr);

/** Big word and small line of the welcome slide. Chez Manu is the name of the place. */
export const WELCOME: Record<Lang, { word: string; line: string }> = {
  fr: { word: "Bienvenue", line: "chez Manu" },
  en: { word: "Welcome", line: "to Chez Manu" },
  pt: { word: "Bem-vindos", line: "ao Chez Manu" },
  it: { word: "Benvenuti", line: "al Chez Manu" },
  de: { word: "Willkommen", line: "im Chez Manu" },
};

/** The live site's own texts and their translations. */
export const TEXT = {
  // Accueil
  heroTitle: L(
    "Boulangerie-Pâtisserie et Tea room à Lausanne",
    "Bakery, pastry shop and tea room in Lausanne",
    "Padaria-Pastelaria e Salão de chá em Lausana",
    "Panetteria-Pasticceria e Tea room a Losanna",
    "Bäckerei-Konditorei und Tea-Room in Lausanne",
  ),
  heroLine1: L(
    "Pâtisseries portugaises et traditionnelles vous attendent Chez Manu.",
    "Portuguese and traditional pastries await you at Chez Manu.",
    "Pastelaria portuguesa e tradicional espera por si no Chez Manu.",
    "Pasticcini portoghesi e tradizionali vi aspettano da Chez Manu.",
    "Portugiesisches und traditionelles Gebäck erwartet Sie im Chez Manu.",
  ),
  heroLine2: L(
    "Venez déguster un instant de détente et de saveurs !",
    "Come and enjoy a moment of relaxation and flavour!",
    "Venha saborear um momento de descontração e sabor!",
    "Venite a gustare un momento di relax e di sapori!",
    "Geniessen Sie bei uns einen Moment der Entspannung und des Genusses!",
  ),
  learnMore: L("En savoir plus", "Learn more", "Saber mais", "Scopri di più", "Mehr erfahren"),
  introTitle: L(
    "Spécialités portugaises et traditionnelles suisses",
    "Portuguese and traditional Swiss specialities",
    "Especialidades portuguesas e tradicionais suíças",
    "Specialità portoghesi e tradizionali svizzere",
    "Portugiesische und traditionelle Schweizer Spezialitäten",
  ),
  intro1: L(
    "Ouverte depuis 12 ans, notre boulangerie et pâtisserie tea room portugaise propose des préparations de qualité, faites à base d'ingrédients frais. Si nous vous proposons principalement des spécialités portugaises, nous offrons également une large gamme de spécialités boulangères traditionnelles et suisses. Notre offre évolue également au fil des saisons et des périodes de fêtes.",
    "Open for 12 years, our Portuguese bakery, pastry shop and tea room offers quality products made from fresh ingredients. While we mainly offer Portuguese specialities, we also have a wide range of traditional and Swiss bakery specialities. Our selection also changes with the seasons and the holidays.",
    "Aberta há 12 anos, a nossa padaria e pastelaria portuguesa com salão de chá oferece preparações de qualidade, feitas com ingredientes frescos. Embora lhe proponhamos sobretudo especialidades portuguesas, oferecemos também uma vasta gama de especialidades de padaria tradicionais e suíças. A nossa oferta muda também ao longo das estações e das épocas festivas.",
    "Aperta da 12 anni, la nostra panetteria e pasticceria portoghese con tea room propone preparazioni di qualità, fatte con ingredienti freschi. Anche se vi proponiamo soprattutto specialità portoghesi, offriamo anche un'ampia gamma di specialità di panetteria tradizionali e svizzere. La nostra offerta cambia inoltre con le stagioni e i periodi di festa.",
    "Seit 12 Jahren bietet unsere portugiesische Bäckerei-Konditorei mit Tea-Room Qualitätsprodukte aus frischen Zutaten an. Im Mittelpunkt stehen portugiesische Spezialitäten, doch wir führen auch eine grosse Auswahl an traditionellen und Schweizer Backwaren. Unser Angebot ändert sich zudem mit den Jahreszeiten und den Festtagen.",
  ),
  intro2: L(
    "A consommer sur place dans notre tea room ou à l'emporter, venez découvrir, goûter et déguster nos spécialités, gâteaux, tartes, viennoiserie, pains, sandwich et autres encas chauds ou froids.",
    "To enjoy in our tea room or to take away: come and discover, taste and savour our specialities, cakes, tarts, viennoiserie, breads, sandwiches and other hot or cold snacks.",
    "Para consumir no nosso salão de chá ou para levar, venha descobrir, provar e saborear as nossas especialidades, bolos, tartes, viennoiserie, pães, sanduíches e outros petiscos quentes ou frios.",
    "Da gustare nel nostro tea room o da asporto: venite a scoprire, assaggiare e gustare le nostre specialità, torte, crostate, viennoiserie, pani, sandwich e altri spuntini caldi o freddi.",
    "Im Tea-Room oder zum Mitnehmen: Entdecken, probieren und geniessen Sie unsere Spezialitäten, Kuchen, Wähen, Viennoiserie, Brote, Sandwiches und weitere warme oder kalte Snacks.",
  ),
  hoursTitle: L("Horaires d'ouverture", "Opening hours", "Horário de abertura", "Orari di apertura", "Öffnungszeiten"),
  weekdays: L("Lun - Ven", "Mon – Fri", "Seg – Sex", "Lun – Ven", "Mo – Fr"),
  weekend: L("Sam - Dim", "Sat – Sun", "Sáb – Dom", "Sab – Dom", "Sa – So"),
  engKicker: L("notre engagement", "our commitment", "o nosso compromisso", "il nostro impegno", "unser Versprechen"),
  engTitle: L("Chez Manu vous propose...", "Chez Manu offers you…", "O Chez Manu propõe-lhe…", "Chez Manu vi propone…", "Chez Manu bietet Ihnen …"),
  eng1Title: L(
    "Un vaste choix de spécialités portugaises et traditionnelles",
    "A wide choice of Portuguese and traditional specialities",
    "Uma vasta escolha de especialidades portuguesas e tradicionais",
    "Un'ampia scelta di specialità portoghesi e tradizionali",
    "Eine grosse Auswahl an portugiesischen und traditionellen Spezialitäten",
  ),
  eng1: L(
    "Venez découvrir nos spécialités portugaises ainsi que nos gâteaux, pains et viennoiseries traditionnels.",
    "Come and discover our Portuguese specialities as well as our traditional cakes, breads and viennoiserie.",
    "Venha descobrir as nossas especialidades portuguesas e também os nossos bolos, pães e viennoiserie tradicionais.",
    "Venite a scoprire le nostre specialità portoghesi e anche le nostre torte, i pani e la viennoiserie tradizionali.",
    "Entdecken Sie unsere portugiesischen Spezialitäten sowie unsere traditionellen Kuchen, Brote und Viennoiserie.",
  ),
  eng2Title: L("Des produits frais et de qualité", "Fresh, quality products", "Produtos frescos e de qualidade", "Prodotti freschi e di qualità", "Frische Qualitätsprodukte"),
  eng2: L(
    "Nous préparons des spécialités et plats réalisés à base d'ingrédients frais de qualité et de saisons.",
    "We prepare specialities and dishes made from fresh, quality, seasonal ingredients.",
    "Preparamos especialidades e pratos feitos com ingredientes frescos, de qualidade e da época.",
    "Prepariamo specialità e piatti realizzati con ingredienti freschi, di qualità e di stagione.",
    "Wir bereiten Spezialitäten und Gerichte aus frischen, hochwertigen und saisonalen Zutaten zu.",
  ),
  eng3Title: L("Un accueil souriant et sympathique", "A warm, friendly welcome", "Um acolhimento sorridente e simpático", "Un'accoglienza sorridente e cordiale", "Ein herzlicher, freundlicher Empfang"),
  eng3: L(
    "Profitez d’une équipe aux petits soins qui vous accueille dans plusieurs langues : français, portugais, anglais et italien.",
    "Enjoy an attentive team that welcomes you in several languages: French, Portuguese, English and Italian.",
    "Conte com uma equipa atenciosa que o recebe em várias línguas: francês, português, inglês e italiano.",
    "Approfittate di un team premuroso che vi accoglie in più lingue: francese, portoghese, inglese e italiano.",
    "Ein aufmerksames Team empfängt Sie in mehreren Sprachen: Französisch, Portugiesisch, Englisch und Italienisch.",
  ),
  eng4Title: L("Des formules petits-déjeuners", "Breakfast set menus", "Menus de pequeno-almoço", "Formule colazione", "Frühstücksangebote"),
  eng4: L(
    "Pour bien commencer la journée, dégustez un bon petit-déjeuner et ne manquez pas notre jus d'orange pressé pour un boost de vitamine C.",
    "To start the day right, enjoy a good breakfast, and don't miss our freshly squeezed orange juice for a boost of vitamin C.",
    "Para começar bem o dia, saboreie um bom pequeno-almoço e não perca o nosso sumo de laranja natural para uma dose de vitamina C.",
    "Per iniziare bene la giornata, gustate una buona colazione e non perdetevi la nostra spremuta d'arancia per una carica di vitamina C.",
    "Für einen guten Start in den Tag: Geniessen Sie ein feines Frühstück und verpassen Sie nicht unseren frisch gepressten Orangensaft für eine Extraportion Vitamin C.",
  ),
  prodKicker: L("Nos services et produits", "Our services and products", "Os nossos serviços e produtos", "I nostri servizi e prodotti", "Unsere Leistungen und Produkte"),
  prodTitle: L(
    "Découvrez un large choix de spécialités boulangères et pâtissières",
    "Discover a wide choice of bakery and pastry specialities",
    "Descubra uma vasta escolha de especialidades de padaria e pastelaria",
    "Scoprite un'ampia scelta di specialità di panetteria e pasticceria",
    "Entdecken Sie eine grosse Auswahl an Bäckerei- und Konditoreispezialitäten",
  ),
  prodBakery: L(
    "Côté boulangerie, chez Manu vous propose un grand choix de pains portugais et de pains traditionnels suisses à base de farine blanche, foncée, mélangée, aux céréales, mais aussi des baguettes parisiennes, ainsi que des viennoiseries tels que croissants, pains au chocolat, brioches. Profitez aussi d’un large éventail de produits en matière de petite restauration comme des salades, sandwiches, soupes en hiver, hamburgers, pizzas et tartes, à l'emporter ou à consommer sur place dans notre tea-room.",
    "On the bakery side, Chez Manu offers a wide choice of Portuguese breads and traditional Swiss breads made with white, dark, mixed or multigrain flour, as well as baguettes parisiennes and viennoiserie such as croissants, pains au chocolat and brioches. Enjoy a wide range of light meals too, such as salads, sandwiches, soups in winter, hamburgers, pizzas and tarts, to take away or to eat in our tea room.",
    "Na padaria, o Chez Manu propõe-lhe uma grande variedade de pães portugueses e de pães tradicionais suíços feitos com farinha branca, escura, mista ou de cereais, mas também baguetes parisienses, bem como viennoiserie como croissants, pains au chocolat e brioches. Aproveite também uma vasta gama de refeições ligeiras, como saladas, sanduíches, sopas no inverno, hambúrgueres, pizas e tartes, para levar ou para consumir no nosso salão de chá.",
    "In panetteria, Chez Manu vi propone un'ampia scelta di pani portoghesi e di pani tradizionali svizzeri a base di farina bianca, scura, mista o ai cereali, ma anche baguette parigine, oltre a viennoiserie come croissants, pains au chocolat e brioches. Approfittate anche di un'ampia gamma di spuntini, come insalate, sandwich, zuppe in inverno, hamburger, pizze e torte, da asporto o da gustare nel nostro tea room.",
    "In der Bäckerei bietet Ihnen Chez Manu eine grosse Auswahl an portugiesischen Broten und traditionellen Schweizer Broten aus Weiss-, Ruch-, Misch- oder Körnermehl, dazu Pariser Baguettes sowie Viennoiserie wie Croissants, Pains au chocolat und Brioches. Geniessen Sie auch eine breite Auswahl an kleinen Gerichten wie Salate, Sandwiches, Suppen im Winter, Hamburger, Pizzas und Wähen – zum Mitnehmen oder vor Ort in unserem Tea-Room.",
  ),
  prodPastry: L(
    "Côté pâtisserie, découvrez aussi notre gamme de spécialités pâtissières portugaises : pastéis de nata, beignets à la crème pâtissière, toutes sortes de gâteaux portugais à la crème pâtissière faite maison, le Bolo Rei (gâteau des rois) ou encore le Pão de Ló (génoise) qui se déguste pour les fêtes de Noël et de fin d'année. Nous vous proposons également des gâteaux traditionnels tels que mille-feuille, baba au rhum, diverses tartes aux fruits, vermicelles, bûches de Noël (en saison), gâteau à la carotte et chocolat, aux noix, au chocolat, etc... disponible à la vente ou sur commande. Un anniversaire, faites-nous part de votre souhait, nous pouvons vous confectionner un gâteau personnalisé.",
    "On the pastry side, discover our range of Portuguese pastry specialities too: pastéis de nata, custard-cream doughnuts, all kinds of Portuguese cakes with homemade custard, Bolo Rei (king cake) and Pão de Ló (sponge cake), which is enjoyed at Christmas and New Year. We also offer traditional cakes such as mille-feuille, baba au rhum, various fruit tarts, vermicelles, bûches de Noël (in season), carrot and chocolate cake, walnut cake, chocolate cake and more, available in the shop or to order. A birthday? Tell us what you would like and we can make you a personalised cake.",
    "Na pastelaria, descubra também a nossa gama de especialidades portuguesas: pastéis de nata, bolas de Berlim com creme pasteleiro, todo o tipo de bolos portugueses com creme pasteleiro caseiro, o Bolo Rei ou ainda o Pão de Ló, que se saboreia nas festas de Natal e de fim de ano. Propomos-lhe também bolos tradicionais como mille-feuille, baba au rhum, várias tartes de fruta, vermicelles, bûches de Noël (na época), bolo de cenoura e chocolate, de nozes, de chocolate, etc., disponíveis para venda ou por encomenda. Um aniversário? Diga-nos o que deseja: podemos fazer-lhe um bolo personalizado.",
    "In pasticceria, scoprite anche la nostra gamma di specialità portoghesi: pastéis de nata, bomboloni alla crema pasticcera, ogni tipo di dolce portoghese alla crema pasticcera fatta in casa, il Bolo Rei (torta dei re) o il Pão de Ló (pan di Spagna), che si gusta per le feste di Natale e di fine anno. Vi proponiamo anche dolci tradizionali come mille-feuille, baba au rhum, varie crostate di frutta, vermicelles, bûches de Noël (in stagione), torta di carote e cioccolato, alle noci, al cioccolato, ecc., disponibili in negozio o su ordinazione. Un compleanno? Diteci cosa desiderate: possiamo prepararvi una torta personalizzata.",
    "In der Konditorei entdecken Sie auch unsere portugiesischen Spezialitäten: Pastéis de nata, Beignets mit Vanillecreme, portugiesische Kuchen aller Art mit hausgemachter Vanillecreme, den Bolo Rei (Dreikönigskuchen) oder den Pão de Ló (Biskuitkuchen), den man an Weihnachten und Neujahr geniesst. Wir bieten Ihnen auch traditionelle Kuchen wie Mille-feuille, Baba au rhum, verschiedene Fruchtwähen, Vermicelles, Bûches de Noël (in der Saison), Rüebli-Schokoladekuchen, Baumnuss- und Schokoladekuchen usw., im Laden oder auf Bestellung. Ein Geburtstag? Sagen Sie uns Ihren Wunsch – wir backen Ihnen gerne eine individuelle Torte.",
  ),
  prodBiscuits: L(
    "A offrir ou à s'offrir, vous trouverez aussi une gamme emballée de biscuits au beurre et à la cannelle, à la noix de coco, avec glaçage au sucre, de Noël, des macarons, etc.",
    "To give or to treat yourself, you will also find a packaged range of butter and cinnamon biscuits, coconut biscuits, sugar-glazed biscuits, Christmas biscuits, macarons and more.",
    "Para oferecer ou para se mimar, encontra também uma gama embalada de biscoitos de manteiga e canela, de coco, com cobertura de açúcar, de Natal, macarons, etc.",
    "Da regalare o da regalarsi, troverete anche una gamma confezionata di biscotti al burro e alla cannella, al cocco, glassati allo zucchero, di Natale, macarons, ecc.",
    "Zum Verschenken oder Selbstgeniessen finden Sie auch verpackte Guetzli: Butter- und Zimtguetzli, Kokosguetzli, Guetzli mit Zuckerglasur, Weihnachtsguetzli, Macarons und mehr.",
  ),
  teaRoom: L(
    "Côté tea room, Profitez d’une ambiance conviviale et familiale : des clients fidèles continuent de nous rendre visite, tout comme des personnes de passage. Tout le monde est le bienvenu ! Installez-vous en intérieur toute l'année ou en terrasse d'avril à octobre. Vous pourrez y dégustez notre fameux café portugais, plus fort en goût, ou vous laissez tenter parmi une gamme de boissons chaudes et de boissons froides.",
    "In the tea room, enjoy a friendly, family atmosphere: loyal customers keep coming back, as do people passing through. Everyone is welcome! Sit inside all year round or on the terrace from April to October. Enjoy our famous Portuguese coffee, stronger in taste, or let yourself be tempted by our range of hot and cold drinks.",
    "No salão de chá, aproveite um ambiente acolhedor e familiar: clientes fiéis continuam a visitar-nos, tal como quem está de passagem. Todos são bem-vindos! Sente-se no interior durante todo o ano ou na esplanada de abril a outubro. Poderá saborear o nosso famoso café português, de sabor mais forte, ou deixar-se tentar por uma gama de bebidas quentes e frias.",
    "Nel tea room godetevi un'atmosfera conviviale e familiare: clienti fedeli continuano a farci visita, così come persone di passaggio. Tutti sono i benvenuti! Accomodatevi all'interno tutto l'anno o in terrazza da aprile a ottobre. Potrete gustare il nostro famoso caffè portoghese, dal gusto più intenso, o lasciarvi tentare da una gamma di bevande calde e fredde.",
    "Im Tea-Room erwartet Sie eine gesellige, familiäre Atmosphäre: Treue Stammgäste besuchen uns ebenso wie Menschen auf der Durchreise. Alle sind willkommen! Sitzen Sie das ganze Jahr drinnen oder von April bis Oktober auf der Terrasse. Geniessen Sie unseren berühmten portugiesischen Kaffee mit kräftigerem Geschmack oder lassen Sie sich von unseren warmen und kalten Getränken verführen.",
  ),
  teaRoomSeats: L(
    "Installez-vous en intérieur toute l'année ou en terrasse d'avril à octobre.",
    "Sit inside all year round or on the terrace from April to October.",
    "Sente-se no interior durante todo o ano ou na esplanada de abril a outubro.",
    "Accomodatevi all'interno tutto l'anno o in terrazza da aprile a ottobre.",
    "Sitzen Sie das ganze Jahr drinnen oder von April bis Oktober auf der Terrasse.",
  ),
  universeKicker: L("notre univers", "our world", "o nosso universo", "il nostro mondo", "unsere Welt"),
  universeTitle: L(
    "Chez Manu, mélange de traditions gourmandes portugaises et suisses.",
    "Chez Manu, a blend of Portuguese and Swiss culinary traditions.",
    "Chez Manu, uma mistura de tradições gulosas portuguesas e suíças.",
    "Chez Manu, un incontro di tradizioni golose portoghesi e svizzere.",
    "Chez Manu – eine Mischung aus portugiesischen und Schweizer Genusstraditionen.",
  ),
  universeBakery: L("Boulangerie", "Bakery", "Padaria", "Panetteria", "Bäckerei"),
  universePastry: L("Pâtisserie", "Pastry", "Pastelaria", "Pasticceria", "Konditorei"),
  universeTea: L("Tea-room", "Tea room", "Salão de chá", "Tea room", "Tea-Room"),
  ctaTitle: L("Contactez-nous !", "Contact us!", "Contacte-nos!", "Contattateci!", "Kontaktieren Sie uns!"),
  ctaHomeLead: L("Plus d'informations ? Des questions ?", "More information? Questions?", "Mais informações? Dúvidas?", "Più informazioni? Domande?", "Mehr Informationen? Fragen?"),
  ctaOfferLead: L("Des questions ? Une commande spéciale ?", "Questions? A special order?", "Dúvidas? Uma encomenda especial?", "Domande? Un ordine speciale?", "Fragen? Eine Spezialbestellung?"),
  ctaText1: L(
    "Contactez notre équipe ou passez nous voir dès aujourd’hui.",
    "Contact our team or drop by today.",
    "Contacte a nossa equipa ou visite-nos hoje mesmo.",
    "Contattate il nostro team o passate a trovarci oggi stesso.",
    "Kontaktieren Sie unser Team oder besuchen Sie uns noch heute.",
  ),
  ctaText2: L("Nous serons ravis de vous renseigner !", "We will be happy to help!", "Teremos todo o gosto em ajudar!", "Saremo lieti di darvi informazioni!", "Wir beraten Sie gerne!"),
  contactUs: L("Contactez-nous", "Contact us", "Contacte-nos", "Contattateci", "Kontakt"),
  callUs: L("Appelez-nous", "Call us", "Ligue-nos", "Chiamateci", "Rufen Sie uns an"),

  // Ce que nous proposons
  offerTitle: L(
    "Chez Manu : authentiques saveurs portugaises et suisses",
    "Chez Manu: authentic Portuguese and Swiss flavours",
    "Chez Manu: autênticos sabores portugueses e suíços",
    "Chez Manu: autentici sapori portoghesi e svizzeri",
    "Chez Manu: authentische portugiesische und Schweizer Aromen",
  ),
  offerLead: L(
    "Notre établissement vous accueille au centre de Lausanne, vous y trouverez des pains et des pâtisseries typiques du Portugal, mais aussi des classiques suisses traditionnels. Laissez-vous aussi tenter par une pause gourmande dans notre salon de thé et déguster nos spécialités.",
    "Our shop welcomes you in the centre of Lausanne, where you will find breads and pastries typical of Portugal, as well as traditional Swiss classics. Treat yourself to a sweet break in our tea room and taste our specialities.",
    "A nossa casa recebe-o no centro de Lausana, onde encontrará pães e doces típicos de Portugal, mas também clássicos suíços tradicionais. Deixe-se tentar por uma pausa gulosa no nosso salão de chá e saboreie as nossas especialidades.",
    "Il nostro locale vi accoglie nel centro di Losanna, dove troverete pani e dolci tipici del Portogallo, ma anche classici svizzeri tradizionali. Lasciatevi tentare da una pausa golosa nella nostra sala da tè e gustate le nostre specialità.",
    "Unser Geschäft empfängt Sie im Zentrum von Lausanne: Hier finden Sie typisch portugiesische Brote und Gebäck, aber auch traditionelle Schweizer Klassiker. Gönnen Sie sich eine genussvolle Pause in unserem Tea-Room und kosten Sie unsere Spezialitäten.",
  ),
  carteKicker: L("notre carte", "our menu", "a nossa ementa", "il nostro menù", "unsere Karte"),
  carteTitle: L("Cafés, thés et formules petit-déjeuner", "Coffees, teas and breakfast menus", "Cafés, chás e menus de pequeno-almoço", "Caffè, tè e formule colazione", "Kaffees, Tees und Frühstücksangebote"),
  carteLead: L(
    "Venez déguster un délicieux croissant avec une de nos boissons chaudes",
    "Come and enjoy a delicious croissant with one of our hot drinks",
    "Venha saborear um delicioso croissant com uma das nossas bebidas quentes",
    "Venite a gustare un delizioso croissant con una delle nostre bevande calde",
    "Geniessen Sie ein feines Croissant zu einem unserer Heissgetränke",
  ),
  galleryKicker: L("Nos réalisations", "Our creations", "As nossas criações", "Le nostre creazioni", "Unsere Kreationen"),
  galleryTitle: L("Nos spécialités et gâteaux en images", "Our specialities and cakes in pictures", "As nossas especialidades e bolos em imagens", "Le nostre specialità e torte in immagini", "Unsere Spezialitäten und Torten in Bildern"),
  galleryLead: L(
    "Découvrez ici quelques-unes de nos réalisations, pour en voir plus, rendez-vous sur:",
    "Discover a few of our creations here; to see more, visit us on:",
    "Descubra aqui algumas das nossas criações; para ver mais, visite-nos em:",
    "Scoprite qui alcune delle nostre creazioni; per vederne altre, seguiteci su:",
    "Hier sehen Sie einige unserer Kreationen. Mehr davon finden Sie auf:",
  ),
  customKicker: L("gâteaux personnalisés et service traiteur", "personalised cakes and catering", "bolos personalizados e serviço de catering", "torte personalizzate e servizio catering", "individuelle Torten und Partyservice"),
  customTitle: L("Du sur mesure pour vos évènements!", "Made to measure for your events!", "Por medida para os seus eventos!", "Su misura per i vostri eventi!", "Massgeschneidert für Ihre Anlässe!"),
  custom1: L(
    "Nous confectionnons des gâteaux sur mesure pour les anniversaires et tout autre événement exceptionnel.",
    "We make custom cakes for birthdays and any other special occasion.",
    "Fazemos bolos por medida para aniversários e qualquer outro acontecimento especial.",
    "Realizziamo torte su misura per compleanni e ogni altro evento speciale.",
    "Wir backen massgeschneiderte Torten für Geburtstage und alle anderen besonderen Anlässe.",
  ),
  custom2: L(
    "Faites-nous part de votre demande, nous nous ferons un plaisir de vous faire une proposition. Vous avez déjà une idée précise? Venez nous la soumettre, nous ferons notre possible pour la réaliser!",
    "Tell us what you need and we will be happy to make you a proposal. Already have a precise idea? Come and share it with us, and we will do our best to make it happen!",
    "Diga-nos o que pretende e teremos todo o gosto em fazer-lhe uma proposta. Já tem uma ideia precisa? Venha apresentá-la e faremos o possível para a realizar!",
    "Comunicateci la vostra richiesta: saremo lieti di farvi una proposta. Avete già un'idea precisa? Venite a parlarcene, faremo il possibile per realizzarla!",
    "Teilen Sie uns Ihren Wunsch mit – wir machen Ihnen gerne einen Vorschlag. Sie haben schon eine genaue Vorstellung? Kommen Sie vorbei, wir tun unser Möglichstes, um sie umzusetzen!",
  ),
  custom3: L(
    "Chez Manu propose aussi un service traiteur déclinable selon vos envies et votre budget. Evénement entre amis, en famille ou avec vos collègues, nous pouvons réaliser un buffet composés de bouchées et petits fours sucrés et salées, de mini-sandwich, beignets et mignardises. Appelez-nous pour connaître nos possibilités.",
    "Chez Manu also offers a catering service tailored to your wishes and budget. For an event with friends, family or colleagues, we can prepare a buffet of sweet and savoury bites and petits fours, mini sandwiches, doughnuts and mignardises. Call us to find out what we can do.",
    "O Chez Manu propõe também um serviço de catering adaptado aos seus desejos e ao seu orçamento. Num evento entre amigos, em família ou com colegas, podemos preparar um bufete de salgadinhos e petits fours doces e salgados, mini-sanduíches, bolinhos fritos e doçaria fina. Ligue-nos para conhecer as nossas possibilidades.",
    "Chez Manu propone anche un servizio catering adattabile ai vostri desideri e al vostro budget. Per un evento tra amici, in famiglia o con i colleghi, possiamo preparare un buffet di stuzzichini e pasticcini dolci e salati, mini-sandwich, frittelle e mignardise. Chiamateci per conoscere le nostre possibilità.",
    "Chez Manu bietet auch einen Partyservice nach Ihren Wünschen und Ihrem Budget. Ob mit Freunden, Familie oder Arbeitskollegen: Wir stellen Ihnen ein Buffet aus süssen und salzigen Häppchen und Petits Fours, Mini-Sandwiches, Beignets und Mignardises zusammen. Rufen Sie uns an, um unsere Möglichkeiten kennenzulernen.",
  ),

  // Contact
  contactTitle: L(
    "Commandez ou rendez-nous visite à la boulangerie-pâtisserie, Tea room!",
    "Order or visit us at the bakery, pastry shop and tea room!",
    "Encomende ou visite-nos na padaria-pastelaria e salão de chá!",
    "Ordinate o venite a trovarci in panetteria-pasticceria e tea room!",
    "Bestellen Sie oder besuchen Sie uns in der Bäckerei-Konditorei mit Tea-Room!",
  ),
  contactText: L(
    "Spécialités portugaises et suisses vous attendent en vitrine ! Laissez-vous tenter par nos gâteaux, biscuits et autres délices, à déguster sur place, pour un moment plaisir et de calme, ou à l'emporter. Renseignez-vous auprès de notre service traiteur pour vos gâteaux d'anniversaire et tous autres évènements personnels ou professionnels.",
    "Portuguese and Swiss specialities await you in our display case! Let yourself be tempted by our cakes, biscuits and other treats, to enjoy on the spot for a moment of pleasure and calm, or to take away. Ask our catering service about birthday cakes and any other personal or professional events.",
    "Especialidades portuguesas e suíças esperam por si na vitrine! Deixe-se tentar pelos nossos bolos, biscoitos e outras delícias, para saborear no local, num momento de prazer e calma, ou para levar. Informe-se junto do nosso serviço de catering sobre bolos de aniversário e quaisquer outros eventos pessoais ou profissionais.",
    "Specialità portoghesi e svizzere vi aspettano in vetrina! Lasciatevi tentare dalle nostre torte, dai biscotti e da altre delizie, da gustare sul posto per un momento di piacere e di calma, o da asporto. Informatevi presso il nostro servizio catering per le torte di compleanno e per tutti gli altri eventi personali o professionali.",
    "Portugiesische und Schweizer Spezialitäten erwarten Sie in der Vitrine! Lassen Sie sich von unseren Kuchen, Guetzli und anderen Köstlichkeiten verführen – vor Ort für einen genussvollen, ruhigen Moment oder zum Mitnehmen. Fragen Sie unseren Partyservice nach Geburtstagstorten und allen anderen privaten oder geschäftlichen Anlässen.",
  ),
  formName: L("Nom:", "Name:", "Nome:", "Nome:", "Name:"),
  formEmail: L("E-mail:", "Email:", "E-mail:", "E-mail:", "E-Mail:"),
  formPhone: L("Téléphone:", "Phone:", "Telefone:", "Telefono:", "Telefon:"),
  formMessage: L("Message:", "Message:", "Mensagem:", "Messaggio:", "Nachricht:"),
  formSend: L("Envoyer", "Send", "Enviar", "Invia", "Senden"),
  formThanks: L(
    "Merci de nous contacter. Nous vous répondrons dans les plus brefs délais.",
    "Thank you for contacting us. We will reply as soon as possible.",
    "Obrigado pelo seu contacto. Responderemos com a maior brevidade possível.",
    "Grazie per averci contattato. Vi risponderemo il prima possibile.",
    "Vielen Dank für Ihre Nachricht. Wir antworten Ihnen so schnell wie möglich.",
  ),
  formError: L(
    "Oups, une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer plus tard.",
    "Oops, something went wrong while sending your message. Please try again later.",
    "Ups, ocorreu um erro ao enviar a sua mensagem. Tente novamente mais tarde.",
    "Ops, si è verificato un errore durante l'invio del messaggio. Riprovate più tardi.",
    "Hoppla, beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal.",
  ),
  privacy: L("Politique de confidentialité", "Privacy policy", "Política de privacidade", "Informativa sulla privacy", "Datenschutzerklärung"),
  legal: L("Mentions légales", "Legal notice", "Aviso legal", "Note legali", "Impressum"),
};

/** Interface strings written for this site (not on the live site). */
export const UI = {
  skip: L("Aller au contenu", "Skip to content", "Saltar para o conteúdo", "Vai al contenuto", "Zum Inhalt"),
  proposal: "Proposta de design · não é o site oficial",
  proposalLocal: L("Proposition de design · pas le site officiel", "Design proposal · not the official website", "", "Proposta di design · non è il sito ufficiale", "Designvorschlag · nicht die offizielle Website"),
  home: L("Accueil", "Home", "Início", "Home", "Startseite"),
  offer: L("Ce que nous proposons", "What we offer", "O que oferecemos", "La nostra offerta", "Unser Angebot"),
  contact: L("Contact", "Contact", "Contacto", "Contatti", "Kontakt"),
  mainNav: L("Navigation principale", "Main navigation", "Navegação principal", "Navigazione principale", "Hauptnavigation"),
  menu: L("Menu", "Menu", "Menu", "Menu", "Menü"),
  closeMenu: L("Fermer le menu", "Close the menu", "Fechar o menu", "Chiudi il menu", "Menü schliessen"),
  language: L("Langue", "Language", "Língua", "Lingua", "Sprache"),
  chooserLabel: "Langue · Language · Idioma · Lingua · Sprache",
  chooserTitle: L("Choisissez votre langue", "Choose your language", "Escolha a sua língua", "Scegliete la vostra lingua", "Wählen Sie Ihre Sprache"),
  welcomeSkip: L("Cliquer pour passer", "Click to skip", "Clique para saltar", "Clicca per saltare", "Klicken zum Überspringen"),
  pause: L("Mettre en pause", "Pause", "Pausar", "Metti in pausa", "Anhalten"),
  play: L("Reprendre", "Play", "Retomar", "Riprendi", "Weiter"),
  prev: L("Précédent", "Previous", "Anterior", "Precedente", "Zurück"),
  next: L("Suivant", "Next", "Seguinte", "Successivo", "Weiter"),
  slide: L("Diapositive {n} sur {total}", "Slide {n} of {total}", "Diapositivo {n} de {total}", "Diapositiva {n} di {total}", "Folie {n} von {total}"),
  heroLabel: L("Diaporama Chez Manu", "Chez Manu slideshow", "Apresentação Chez Manu", "Presentazione Chez Manu", "Diashow Chez Manu"),
  custardLabel: L(
    "Une crème pâtissière dorée qui caramélise sous le doigt ou la souris",
    "A golden custard that caramelises under your finger or mouse",
    "Um creme dourado que carameliza sob o dedo ou o rato",
    "Una crema dorata che caramella sotto il dito o il mouse",
    "Eine goldene Creme, die unter Finger oder Maus karamellisiert",
  ),
  stripLabel: L("Bandeau Chez Manu", "Chez Manu strip", "Faixa Chez Manu", "Striscia Chez Manu", "Laufband Chez Manu"),
  stripDaily: L("7/7 dès 6:30", "7/7 from 6:30", "7/7 desde as 6:30", "7/7 dalle 6:30", "7/7 ab 6:30"),
  every: L("Tous les jours dès 6:30", "Every day from 6:30", "Todos os dias desde as 6:30", "Tutti i giorni dalle 6:30", "Täglich ab 6:30"),

  openNow: L("Ouvert", "Open", "Aberto", "Aperto", "Geöffnet"),
  closedNow: L("Fermé", "Closed", "Fechado", "Chiuso", "Geschlossen"),
  closesAt: L("ferme à {t}", "closes at {t}", "fecha às {t}", "chiude alle {t}", "schliesst um {t}"),
  opensAt: L("ouvre à {t}", "opens at {t}", "abre às {t}", "apre alle {t}", "öffnet um {t}"),
  opensTomorrow: L("ouvre demain à {t}", "opens tomorrow at {t}", "abre amanhã às {t}", "apre domani alle {t}", "öffnet morgen um {t}"),
  terraceOpen: L("Terrasse ouverte", "Terrace open", "Esplanada aberta", "Terrazza aperta", "Terrasse offen"),
  terraceSeason: L("Terrasse d'avril à octobre", "Terrace from April to October", "Esplanada de abril a outubro", "Terrazza da aprile a ottobre", "Terrasse von April bis Oktober"),
  terraceIndoor: L("Intérieur toute l'année", "Inside all year round", "Interior todo o ano", "All'interno tutto l'anno", "Drinnen das ganze Jahr"),
  inZurichTime: L("heure de Lausanne", "Lausanne time", "hora de Lausana", "ora di Losanna", "Ortszeit Lausanne"),

  storyLabel: L("Notre histoire", "Our story", "A nossa história", "La nostra storia", "Unsere Geschichte"),
  years: L("ans", "years", "anos", "anni", "Jahre"),
  biscuitLabel: L(
    "Un biscuit au beurre imprimé du logo Chez Manu. Glissez pour le faire tourner, ou utilisez les flèches.",
    "A butter biscuit printed with the Chez Manu logo. Drag to spin it, or use the arrow keys.",
    "Um biscoito de manteiga com o logótipo Chez Manu. Arraste para o fazer girar, ou use as setas.",
    "Un biscotto al burro con il logo Chez Manu. Trascinate per farlo girare, o usate le frecce.",
    "Ein Butterguetzli mit dem Chez-Manu-Logo. Ziehen, um es zu drehen, oder die Pfeiltasten verwenden.",
  ),
  biscuitHint: L("Glissez pour faire tourner", "Drag to spin", "Arraste para girar", "Trascinate per girare", "Ziehen zum Drehen"),
  spin: L("Faire tourner", "Spin", "Girar", "Gira", "Drehen"),

  vitrineLabel: L("Vitrine Portugal | Suisse", "Portugal | Switzerland display case", "Vitrine Portugal | Suíça", "Vetrina Portogallo | Svizzera", "Vitrine Portugal | Schweiz"),
  vitrineSlider: L("Séparation de la vitrine entre Portugal et Suisse", "Divider between the Portuguese and Swiss shelves", "Divisória da vitrine entre Portugal e Suíça", "Divisorio della vetrina tra Portogallo e Svizzera", "Trennung der Vitrine zwischen Portugal und Schweiz"),
  vitrineValue: L("{pt} % Portugal, {ch} % Suisse", "{pt}% Portugal, {ch}% Switzerland", "{pt}% Portugal, {ch}% Suíça", "{pt}% Portogallo, {ch}% Svizzera", "{pt} % Portugal, {ch} % Schweiz"),
  vitrineHint: L("Glissez le logo", "Drag the logo", "Arraste o logótipo", "Trascinate il logo", "Logo ziehen"),
  portugal: L("Portugal", "Portugal", "Portugal", "Portogallo", "Portugal"),
  suisse: L("Suisse", "Switzerland", "Suíça", "Svizzera", "Schweiz"),
  all: L("Tout", "All", "Tudo", "Tutto", "Alle"),
  both: L("Des deux côtés", "On both sides", "Dos dois lados", "Da entrambe le parti", "Auf beiden Seiten"),
  bothLead: L("Portugal et Suisse", "Portugal and Switzerland", "Portugal e Suíça", "Portogallo e Svizzera", "Portugal und Schweiz"),
  onOrder: L("disponible à la vente ou sur commande", "available in the shop or to order", "disponível para venda ou por encomenda", "disponibile in negozio o su ordinazione", "im Laden oder auf Bestellung"),
  photoSlot: L("Photo : {name}", "Photo: {name}", "Fotografia: {name}", "Foto: {name}", "Foto: {name}"),
  photoSlotNote: L("photo à venir", "photo to come", "fotografia em breve", "foto in arrivo", "Foto folgt"),
  vitrineList: L("Toute la vitrine en liste", "The whole display as a list", "Toda a vitrine em lista", "Tutta la vetrina in elenco", "Die ganze Vitrine als Liste"),
  sprinkle: L("Saupoudrer de cannelle", "Sprinkle with cinnamon", "Polvilhar com canela", "Spolverare di cannella", "Mit Zimt bestäuben"),

  teaRoomTitle: L("Le tea room", "The tea room", "O salão de chá", "Il tea room", "Der Tea-Room"),
  breakfastTeaser: L("Composer une formule petit-déjeuner", "Build a breakfast menu", "Compor um pequeno-almoço", "Componi una colazione", "Frühstück zusammenstellen"),
  seeCarte: L("Voir la carte", "See the menu", "Ver a ementa", "Vedi il menù", "Zur Karte"),
  photosTitle: L("En images", "In pictures", "Em imagens", "In immagini", "In Bildern"),
  seeGallery: L("Voir toutes les photos", "See all photos", "Ver todas as fotografias", "Vedi tutte le foto", "Alle Fotos ansehen"),

  address: L("Adresse", "Address", "Morada", "Indirizzo", "Adresse"),
  phone: L("Téléphone", "Phone", "Telefone", "Telefono", "Telefon"),
  email: L("E-mail", "Email", "E-mail", "E-mail", "E-Mail"),
  directions: L("Itinéraire", "Get directions", "Como chegar", "Indicazioni", "Route"),
  showMap: L("Afficher la carte", "Show the map", "Mostrar o mapa", "Mostra la mappa", "Karte anzeigen"),
  mapNote: L(
    "La carte est chargée depuis OpenStreetMap seulement après votre clic.",
    "The map loads from OpenStreetMap only after you click.",
    "O mapa só é carregado do OpenStreetMap depois do seu clique.",
    "La mappa viene caricata da OpenStreetMap solo dopo il vostro clic.",
    "Die Karte wird erst nach Ihrem Klick von OpenStreetMap geladen.",
  ),
  mapTitle: L("Plan : Rue du Maupas 30, Lausanne", "Map: Rue du Maupas 30, Lausanne", "Mapa: Rue du Maupas 30, Lausana", "Mappa: Rue du Maupas 30, Losanna", "Karte: Rue du Maupas 30, Lausanne"),
  mapOpen: L("Ouvrir dans OpenStreetMap", "Open in OpenStreetMap", "Abrir no OpenStreetMap", "Apri in OpenStreetMap", "In OpenStreetMap öffnen"),
  follow: L("Suivez-nous", "Follow us", "Siga-nos", "Seguiteci", "Folgen Sie uns"),
  newTab: L("(nouvel onglet)", "(new tab)", "(novo separador)", "(nuova scheda)", "(neuer Tab)"),

  carteSearch: L("Chercher dans la carte", "Search the menu", "Procurar na ementa", "Cerca nel menù", "Karte durchsuchen"),
  carteSearchPh: L("galão, bifana, thé…", "galão, bifana, tea…", "galão, bifana, chá…", "galão, bifana, tè…", "Galão, Bifana, Tee …"),
  carteTabs: L("Sections de la carte", "Menu sections", "Secções da ementa", "Sezioni del menù", "Bereiche der Karte"),
  carteResults: L("{n} résultats", "{n} results", "{n} resultados", "{n} risultati", "{n} Treffer"),
  carteResult: L("1 résultat", "1 result", "1 resultado", "1 risultato", "1 Treffer"),
  carteNone: L("Rien trouvé sur la carte.", "Nothing found on the menu.", "Nada encontrado na ementa.", "Niente trovato nel menù.", "Nichts auf der Karte gefunden."),
  carteClear: L("Effacer", "Clear", "Limpar", "Cancella", "Löschen"),
  onLiveMenu: L("Sur la carte : {name}", "On the menu: {name}", "Na ementa: {name}", "Nel menù: {name}", "Auf der Karte: {name}"),
  cupLabel: L("À quoi ressemble : {name}", "What it looks like: {name}", "Como é: {name}", "Come si presenta: {name}", "So sieht es aus: {name}"),
  cupHint: L("Survolez un café pour le servir", "Hover over a coffee to pour it", "Passe sobre um café para o servir", "Passate su un caffè per servirlo", "Fahren Sie über einen Kaffee, um ihn einzuschenken"),
  cupIllustration: L("illustration", "illustration", "ilustração", "illustrazione", "Illustration"),
  varieties: L("{n} variétés", "{n} varieties", "{n} variedades", "{n} varietà", "{n} Sorten"),
  sameBreakfastPrice: L("une formule, un prix", "one menu, one price", "um menu, um preço", "una formula, un prezzo", "ein Angebot, ein Preis"),

  breakfastTitle: L("Votre petit-déjeuner Maison", "Your homemade breakfast", "O seu pequeno-almoço da casa", "La vostra colazione della casa", "Ihr hausgemachtes Frühstück"),
  breakfastLead: L(
    "Choisissez la formule et la boisson chaude : le plateau se remplit. Une présentation de la carte, pas une commande en ligne.",
    "Pick the menu and the hot drink and watch the tray fill. A look at the menu, not an online order.",
    "Escolha o menu e a bebida quente e veja o tabuleiro encher-se. Uma apresentação da ementa, não uma encomenda online.",
    "Scegliete la formula e la bevanda calda: il vassoio si riempie. Una presentazione del menù, non un ordine online.",
    "Wählen Sie Angebot und Heissgetränk – das Tablett füllt sich. Eine Vorschau auf die Karte, keine Online-Bestellung.",
  ),
  formula: L("Formule", "Menu", "Menu", "Formula", "Angebot"),
  hotDrink: L("Boisson chaude", "Hot drink", "Bebida quente", "Bevanda calda", "Heissgetränk"),
  tray: L("Plateau de la formule {n}", "Tray for menu {n}", "Tabuleiro do menu {n}", "Vassoio della formula {n}", "Tablett für Angebot {n}"),
  trayBallon: L("1 ballon blanc", "1 white roll (ballon blanc)", "1 pãozinho branco", "1 panino bianco", "1 weisses Brötchen"),
  trayCroissant: L("1 croissant", "1 croissant", "1 croissant", "1 croissant", "1 Croissant"),
  traySlices: L("3 tranches pain maison", "3 slices of homemade bread", "3 fatias de pão caseiro", "3 fette di pane fatto in casa", "3 Scheiben hausgemachtes Brot"),
  trayJuice: L("jus d’orange frais 1dl", "fresh orange juice 1 dl", "sumo de laranja natural 1 dl", "succo d’arancia fresco 1 dl", "frischer Orangensaft 1 dl"),
  trayButter: L("beurre", "butter", "manteiga", "burro", "Butter"),
  trayJam: L("confiture", "jam", "compota", "marmellata", "Konfitüre"),
  drinkQuestion: L(
    "Toutes les boissons chaudes de la carte sont-elles comprises ? À confirmer en boutique.",
    "Are all hot drinks on the menu included? Please ask in the shop.",
    "Todas as bebidas quentes da ementa estão incluídas? Pergunte na loja.",
    "Tutte le bevande calde del menù sono incluse? Chiedete in negozio.",
    "Sind alle Heissgetränke der Karte inbegriffen? Bitte im Laden nachfragen.",
  ),

  teasTitle: L("Les 13 thés bio Sirocco", "The 13 organic Sirocco teas", "Os 13 chás biológicos Sirocco", "I 13 tè biologici Sirocco", "Die 13 Bio-Tees von Sirocco"),
  teasLead: L("Touchez une infusion pour la voir fumer.", "Tap a tea to see it steam.", "Toque num chá para o ver fumegar.", "Toccate un tè per vederlo fumare.", "Tippen Sie auf einen Tee, damit er dampft."),

  galleryWall: L("Mur de photos", "Photo wall", "Mural de fotografias", "Parete di foto", "Fotowand"),
  galleryHint: L(
    "Glissez dans tous les sens, flèches du clavier pour parcourir, Entrée pour agrandir.",
    "Drag in any direction, arrow keys to browse, Enter to enlarge.",
    "Arraste em qualquer direção, setas do teclado para percorrer, Enter para ampliar.",
    "Trascinate in ogni direzione, frecce per scorrere, Invio per ingrandire.",
    "In alle Richtungen ziehen, Pfeiltasten zum Blättern, Enter zum Vergrössern.",
  ),
  asGrid: L("Afficher en grille", "Show as grid", "Mostrar em grelha", "Mostra a griglia", "Als Raster anzeigen"),
  asWall: L("Afficher en mur", "Show as wall", "Mostrar em mural", "Mostra a parete", "Als Wand anzeigen"),
  enlarge: L("Agrandir : {alt}", "Enlarge: {alt}", "Ampliar: {alt}", "Ingrandisci: {alt}", "Vergrössern: {alt}"),
  close: L("Fermer", "Close", "Fechar", "Chiudi", "Schliessen"),
  photoOf: L("Photo {n} sur {total}", "Photo {n} of {total}", "Fotografia {n} de {total}", "Foto {n} di {total}", "Foto {n} von {total}"),
  prevPhoto: L("Photo précédente", "Previous photo", "Fotografia anterior", "Foto precedente", "Vorheriges Foto"),
  nextPhoto: L("Photo suivante", "Next photo", "Fotografia seguinte", "Foto successiva", "Nächstes Foto"),
  lightbox: L("Galerie en plein écran", "Full-screen gallery", "Galeria em ecrã inteiro", "Galleria a schermo intero", "Galerie im Vollbild"),

  cakeTitle: L("Votre demande de gâteau", "Your cake request", "O seu pedido de bolo", "La vostra richiesta di torta", "Ihre Tortenanfrage"),
  cakeLead: L(
    "Préparez votre demande ici, elle sera envoyée avec le formulaire de contact.",
    "Prepare your request here; it is sent with the contact form.",
    "Prepare o seu pedido aqui; será enviado com o formulário de contacto.",
    "Preparate qui la vostra richiesta: sarà inviata con il modulo di contatto.",
    "Bereiten Sie Ihre Anfrage hier vor; sie wird mit dem Kontaktformular gesendet.",
  ),
  occasion: L("Occasion", "Occasion", "Ocasião", "Occasione", "Anlass"),
  birthday: L("Anniversaire", "Birthday", "Aniversário", "Compleanno", "Geburtstag"),
  otherEvent: L("Autre événement", "Another event", "Outro evento", "Altro evento", "Anderer Anlass"),
  catering: L("Service traiteur", "Catering", "Catering", "Catering", "Partyservice"),
  people: L("Nombre de personnes", "Number of people", "Número de pessoas", "Numero di persone", "Anzahl Personen"),
  fewer: L("Une personne de moins", "One person fewer", "Menos uma pessoa", "Una persona in meno", "Eine Person weniger"),
  more: L("Une personne de plus", "One person more", "Mais uma pessoa", "Una persona in più", "Eine Person mehr"),
  date: L("Date souhaitée", "Preferred date", "Data pretendida", "Data desiderata", "Gewünschtes Datum"),
  yourIdea: L("Votre idée", "Your idea", "A sua ideia", "La vostra idea", "Ihre Idee"),
  continueToForm: L("Continuer vers le formulaire", "Continue to the form", "Continuar para o formulário", "Continua al modulo", "Weiter zum Formular"),
  candles: L("{n} bougies allumées", "{n} candles lit", "{n} velas acesas", "{n} candeline accese", "{n} Kerzen brennen"),
  cakeMessage: L(
    "Demande de gâteau sur mesure\nOccasion : {occasion}\nNombre de personnes : {people}\nDate souhaitée : {date}\n\n{idea}",
    "Custom cake request\nOccasion: {occasion}\nNumber of people: {people}\nPreferred date: {date}\n\n{idea}",
    "Pedido de bolo por medida\nOcasião: {occasion}\nNúmero de pessoas: {people}\nData pretendida: {date}\n\n{idea}",
    "Richiesta di torta su misura\nOccasione: {occasion}\nNumero di persone: {people}\nData desiderata: {date}\n\n{idea}",
    "Anfrage für eine individuelle Torte\nAnlass: {occasion}\nAnzahl Personen: {people}\nGewünschtes Datum: {date}\n\n{idea}",
  ),
  noDate: L("à convenir", "to be agreed", "a combinar", "da concordare", "nach Absprache"),

  required: L("obligatoire", "required", "obrigatório", "obbligatorio", "Pflichtfeld"),
  errRequired: L("Merci de remplir ce champ.", "Please fill in this field.", "Preencha este campo.", "Compilate questo campo.", "Bitte füllen Sie dieses Feld aus."),
  errEmail: L("Merci d'indiquer une adresse e-mail valable.", "Please enter a valid email address.", "Indique um endereço de e-mail válido.", "Inserite un indirizzo e-mail valido.", "Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  errPhone: L("Merci d'indiquer un numéro de téléphone.", "Please enter a phone number.", "Indique um número de telefone.", "Inserite un numero di telefono.", "Bitte geben Sie eine Telefonnummer ein."),
  errSummary: L("Le formulaire contient {n} erreur(s).", "The form has {n} error(s).", "O formulário tem {n} erro(s).", "Il modulo contiene {n} errore/i.", "Das Formular enthält {n} Fehler."),
  sending: L("Envoi…", "Sending…", "A enviar…", "Invio…", "Wird gesendet …"),
  testMode: L(
    "Aperçu : le formulaire est en mode test, aucun message n'est réellement envoyé.",
    "Preview: the form is in test mode; no message is actually sent.",
    "Pré-visualização: o formulário está em modo de teste; nenhuma mensagem é realmente enviada.",
    "Anteprima: il modulo è in modalità di prova, nessun messaggio viene davvero inviato.",
    "Vorschau: Das Formular ist im Testmodus, es wird keine Nachricht verschickt.",
  ),
  prefilled: L("Votre demande de gâteau est dans le message ci-dessous.", "Your cake request is in the message below.", "O seu pedido de bolo está na mensagem abaixo.", "La vostra richiesta di torta è nel messaggio qui sotto.", "Ihre Tortenanfrage steht in der Nachricht unten."),

  legalCheck: L(
    "",
    "Courtesy translation, to be checked by the owner. The French text is the only one that applies.",
    "Tradução de cortesia, a verificar pelo proprietário. Apenas o texto francês faz fé.",
    "Traduzione di cortesia, da verificare da parte del titolare. Fa fede solo il testo francese.",
    "Unverbindliche Übersetzung, vom Inhaber zu prüfen. Massgebend ist allein der französische Text.",
  ),
  showFrench: L("", "Show the French original", "Mostrar o original francês", "Mostra l'originale francese", "Französisches Original anzeigen"),
  showTranslation: L("", "Show the translation", "Mostrar a tradução", "Mostra la traduzione", "Übersetzung anzeigen"),

  cursorDrag: L("Glisser", "Drag", "Arrastar", "Trascina", "Ziehen"),
  cursorView: L("Voir", "View", "Ver", "Vedi", "Ansehen"),
  cursorCall: L("Appeler", "Call", "Ligar", "Chiama", "Anrufen"),
  cursorSpin: L("Tourner", "Spin", "Girar", "Gira", "Drehen"),

  footerTagline: L("Boulangerie • Pâtisserie • Tea-Room", "Bakery • Pastry • Tea room", "Padaria • Pastelaria • Salão de chá", "Panetteria • Pasticceria • Tea room", "Bäckerei • Konditorei • Tea-Room"),
};

/** Titles and descriptions per page (French from the live site; the legal page's title and description, which name another business left over from the template, now name Chez Manu). */
export const SEO: Record<PageKey, { title: Localized; description: Localized }> = {
  home: {
    title: L("Pâtissier portugais | Lausanne | Chez Manu", "Portuguese pastry shop | Lausanne | Chez Manu", "Pastelaria portuguesa | Lausana | Chez Manu", "Pasticceria portoghese | Losanna | Chez Manu", "Portugiesische Konditorei | Lausanne | Chez Manu"),
    description: L(
      "Venez déguster un instant de détente et de saveurs ! Des spécialités portugaises et traditionnelles de pâtisserie suisse vous attendent Chez Manu.",
      "Come and enjoy a moment of relaxation and flavour! Portuguese specialities and traditional Swiss pastries await you at Chez Manu.",
      "Venha saborear um momento de descontração e sabor! Especialidades portuguesas e pastelaria tradicional suíça esperam por si no Chez Manu.",
      "Venite a gustare un momento di relax e di sapori! Specialità portoghesi e pasticceria tradizionale svizzera vi aspettano da Chez Manu.",
      "Geniessen Sie einen Moment der Entspannung und des Genusses! Portugiesische Spezialitäten und traditionelle Schweizer Konditoreiwaren erwarten Sie im Chez Manu.",
    ),
  },
  offer: {
    title: L("Boulangerie-Pâtisserie-Tea room | Lausanne | Chez Manu", "Bakery, pastry shop and tea room | Lausanne | Chez Manu", "Padaria-Pastelaria-Salão de chá | Lausana | Chez Manu", "Panetteria-Pasticceria-Tea room | Losanna | Chez Manu", "Bäckerei-Konditorei-Tea-Room | Lausanne | Chez Manu"),
    description: L(
      "Notre établissement vous accueille dans le cœur de Lausanne pour vous faire déguster des pains et des pâtisseries typiques du Portugal et de Suisse.",
      "Our shop welcomes you in the heart of Lausanne to taste breads and pastries typical of Portugal and Switzerland.",
      "A nossa casa recebe-o no coração de Lausana para provar pães e doces típicos de Portugal e da Suíça.",
      "Il nostro locale vi accoglie nel cuore di Losanna per farvi gustare pani e dolci tipici del Portogallo e della Svizzera.",
      "Unser Geschäft im Herzen von Lausanne lädt Sie ein, typische Brote und Gebäck aus Portugal und der Schweiz zu kosten.",
    ),
  },
  contact: {
    title: L("Contact | Lausanne | Chez Manu", "Contact | Lausanne | Chez Manu", "Contacto | Lausana | Chez Manu", "Contatti | Losanna | Chez Manu", "Kontakt | Lausanne | Chez Manu"),
    description: L(
      "Spécialités suisses et portugaises vous attendent Chez Manu ! Profitez de gâteaux, pains, biscuits et autres délices, à manger sur place ou à emporter.",
      "Swiss and Portuguese specialities await you at Chez Manu! Enjoy cakes, breads, biscuits and other treats, to eat in or take away.",
      "Especialidades suíças e portuguesas esperam por si no Chez Manu! Aproveite bolos, pães, biscoitos e outras delícias, para comer no local ou levar.",
      "Specialità svizzere e portoghesi vi aspettano da Chez Manu! Torte, pani, biscotti e altre delizie, da gustare sul posto o da asporto.",
      "Schweizer und portugiesische Spezialitäten erwarten Sie im Chez Manu! Kuchen, Brote, Guetzli und andere Köstlichkeiten – vor Ort oder zum Mitnehmen.",
    ),
  },
  privacy: {
    title: L("Politique de confidentialité", "Privacy policy | Chez Manu", "Política de privacidade | Chez Manu", "Informativa sulla privacy | Chez Manu", "Datenschutzerklärung | Chez Manu"),
    description: L(
      "Lisez notre politique de confidentialité complète pour comprendre comment nous recueillons, utilisons et protégeons vos données personnelles. Votre vie privée est importante pour nous.",
      "Read our full privacy policy to understand how we collect, use and protect your personal data. Your privacy matters to us.",
      "Leia a nossa política de privacidade completa para saber como recolhemos, utilizamos e protegemos os seus dados pessoais. A sua privacidade é importante para nós.",
      "Leggete la nostra informativa sulla privacy completa per capire come raccogliamo, utilizziamo e proteggiamo i vostri dati personali. La vostra privacy è importante per noi.",
      "Lesen Sie unsere vollständige Datenschutzerklärung, um zu erfahren, wie wir Ihre Personendaten erheben, verwenden und schützen. Ihre Privatsphäre ist uns wichtig.",
    ),
  },
  legal: {
    title: L("Mentions légales | Chez Manu", "Legal notice | Chez Manu", "Aviso legal | Chez Manu", "Note legali | Chez Manu", "Impressum | Chez Manu"),
    description: L(
      "Informations juridiques sur l'utilisation des cookies sur le site de Chez Manu. Découvrez comment les cookies sont utilisés pour analyser le site et les améliorations continues.",
      "Legal information on the use of cookies on the Chez Manu website: how cookies are used to analyse the site and improve it continuously.",
      "Informações jurídicas sobre a utilização de cookies no site do Chez Manu: como os cookies são utilizados para analisar o site e melhorá-lo continuamente.",
      "Informazioni legali sull'uso dei cookie sul sito di Chez Manu: come vengono utilizzati per analizzare il sito e migliorarlo continuamente.",
      "Rechtliche Informationen zur Verwendung von Cookies auf der Website von Chez Manu: wie Cookies zur Analyse und laufenden Verbesserung der Website eingesetzt werden.",
    ),
  },
};
