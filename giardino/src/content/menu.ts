// The four menus of Pizzeria Giardino, transcribed from the PDFs linked on pizzeriagiardino.ch (read 01.11.2026):
//
//   Speisekarte-Menu.pdf   6 scanned pages (no text layer) – read visually, cross-checked with Tesseract OCR
//   Getraenkekarte.pdf     6 scanned pages (no text layer) – same; table columns assigned from measured positions
//   Speisekarte Kids.pdf   2 pages with a text layer (Frisco template, 2026 - FRH26242)
//   Dessertkarte.PDF       2 pages with a text layer (Frisco template, 2026 - FRH26243)
//
// German and French texts are the restaurant's own wording (the food and drinks PDFs are bilingual DE/FR).
// English and Italian are translations made for this site. Small spelling fixes are listed in MENU_CORRECTIONS,
// questions that only the restaurant can answer in MENU_REVIEW. Prices are CHF incl. VAT and exist once here, so
// every language shows the same amount. `src` points at the PDF page each entry comes from; `npm run check`
// compares every entry with the OCR / text layer of that page (scripts/check-menu.mjs).
import { same, t, type T } from "../i18n/langs";
import { MENU_PDF_LIVE } from "./restaurant";

export type MenuId = "food" | "drinks" | "desserts" | "kids";
export type Unit = "cl" | "dl" | "l";
/** A serving size. `orig` keeps the notation of the printed menu (e.g. "7/10" for a 7 dl bottle). */
/**
 * The «Karte als PDF» links: in proposal mode the live files on pizzeriagiardino.ch (the PDFs are not rehosted, BRIEF
 * §15); in launch mode the owners' own copies, which the build copies from content/raw/pdf/ to /menus/.
 */
const pdfHref = (file: string, live: string) => (__PROPOSAL__ ? live : `/menus/${file}`);

export type Size = { q: number; u: Unit; orig: string };
export type Price = { chf: number; size?: Size; label?: T };
/**
 * Markers printed on the menus. Only these are used for filters – nothing is inferred from ingredients except
 * `spicy`, which is set where the menu itself says "scharf"/"pikant" or lists chilli or spicy salami.
 */
export type Tag = "homemade" | "spicy" | "dyhrberg" | "swiss-meat" | "australian-meat" | "vegan" | "hazelnut";
export type Src = { pdf: MenuId; page: number };
export type Item = {
  id: string;
  name: T;
  desc?: T;
  prices: Price[];
  /** alcohol by volume as printed */
  abv?: number;
  tags?: Tag[];
  note?: T;
  src: Src;
  /** true when the printed menu leaves something open – see MENU_REVIEW */
  review?: boolean;
};
export type Group = { id: string; title?: T; items: Item[] };
export type Section = {
  id: string;
  title: T;
  intro?: T;
  /** column sizes for tables (water, soft drinks, wine) */
  columns?: Size[];
  groups: Group[];
  notes?: T[];
  /** a list of ice cream flavours sold by the scoop instead of priced items */
  flavours?: boolean;
};
export type Menu = {
  id: MenuId;
  title: T;
  kicker: T;
  pdf: { href: string; file: string; bytes: number; pages: number };
  sections: Section[];
  footnotes: T[];
};

// ---------------------------------------------------------------------------------------------------------------
// helpers
const chf = (n: number, size?: Size, label?: T): Price => ({ chf: n, ...(size ? { size } : {}), ...(label ? { label } : {}) });
const cl = (q: number): Size => ({ q, u: "cl", orig: `${q}cl` });
const dl = (q: number, orig = `${q}dl`): Size => ({ q, u: "dl", orig });
const litre: Size = { q: 1, u: "l", orig: "1lt" };
const B70 = dl(7, "7/10");
const B50 = dl(5, "5/10");
const B375 = dl(3.75, "3/8");
const G10 = dl(1, "1/10");
const C30 = dl(3, "3/10");
const C20 = dl(2, "2/10");
const it = (o: Omit<Item, "id"> & { id: string }): Item => o;

// shared ingredient wording (DE / EN / FR / IT) for the pizza list
const MTO = t("Mozzarella, Tomatensauce", "Mozzarella, tomato sauce", "Mozzarella, sauce tomate", "Mozzarella, salsa di pomodoro");
const pz = (de: string, en: string, fr: string, itl: string): T =>
  t(`${MTO.de}, ${de} und Oregano`, `${MTO.en}, ${en} and oregano`, `${MTO.fr}, ${fr} et origan`, `${MTO.it}, ${itl} e origano`);

// ---------------------------------------------------------------------------------------------------------------
// SPEISEKARTE
const food: Menu = {
  id: "food",
  title: t("Speisekarte", "Food menu", "Carte des mets", "Menù"),
  kicker: t("Vorspeisen · Pizzen · Risotto · Pasta · Fleisch", "Starters · Pizzas · Risotto · Pasta · Meat", "Entrées · Pizzas · Risottos · Pâtes · Viandes", "Antipasti · Pizze · Risotti · Paste · Carni"),
  pdf: { href: pdfHref("Speisekarte-Menu.pdf", MENU_PDF_LIVE.food), file: "Speisekarte-Menu.pdf", bytes: 10284335, pages: 6 },
  sections: [
    {
      id: "vorspeisen",
      title: t("Vorspeisen", "Starters", "Entrées", "Antipasti"),
      groups: [
        {
          id: "vorspeisen",
          items: [
            it({ id: "minestrone", name: same("Minestrone"), desc: t("Italienische Gemüsesuppe", "Italian vegetable soup", "Soupe de légumes à l’italienne", "Zuppa di verdure all’italiana"), prices: [chf(11)], src: { pdf: "food", page: 1 } }),
            it({ id: "tomatenrahmsuppe", name: t("Tomatenrahmsuppe mit Gin", "Cream of tomato soup with gin", "Crème de tomates au gin", "Crema di pomodoro al gin"), prices: [chf(11)], src: { pdf: "food", page: 1 } }),
            it({ id: "rauchlachs", name: t("Rauchlachs", "Smoked salmon", "Saumon fumé", "Salmone affumicato"), desc: t("mit Dillsenfsauce, Toast und Butter", "with dill and mustard sauce, toast and butter", "sauce aneth et moutarde, toast et beurre", "con salsa all’aneto e senape, toast e burro"), prices: [chf(25)], tags: ["dyhrberg"], src: { pdf: "food", page: 1 } }),
            it({ id: "mediterraner-teller", name: t("Mediterraner Teller", "Mediterranean plate", "Assiette méditerranéenne", "Piatto mediterraneo"), desc: t("mit italienischem Rohschinken, Grana, getrocknete Tomaten, Oliven und Kapern", "with Italian cured ham, grana, sun-dried tomatoes, olives and capers", "avec jambon cru d’Italie, grana, tomates séchées, olives et câpres", "con prosciutto crudo italiano, grana, pomodori secchi, olive e capperi"), prices: [chf(23)], src: { pdf: "food", page: 1 } }),
            it({ id: "trockenfleisch-carpaccio", name: t("Trockenfleisch-Carpaccio", "Carpaccio of air-dried meat", "Carpaccio de viande séchée", "Carpaccio di carne secca"), desc: t("Rucola, Grana und Kirschtomaten", "rocket, grana and cherry tomatoes", "roquette, grana, tomates cerises", "rucola, grana e pomodorini"), prices: [chf(24)], src: { pdf: "food", page: 1 } }),
            it({ id: "salat-bueffet", name: t("Gemischter Salat vom Büffet", "Mixed salad from the buffet", "Salade mêlée de notre buffet", "Insalata mista dal buffet"), prices: [chf(12), chf(21.5)], review: true, src: { pdf: "food", page: 1 } }),
            it({ id: "caprese", name: t("Tomaten-Mozzarella Caprese", "Tomato and mozzarella caprese", "Caprese de tomate-mozzarella", "Caprese di pomodoro e mozzarella"), desc: t("mit Basilikum und Rucola", "with basil and rocket", "au basilic et roquette", "con basilico e rucola"), prices: [chf(18)], src: { pdf: "food", page: 1 } }),
          ],
        },
      ],
    },
    {
      id: "region",
      title: t("Aus der Region", "From the region", "De la région", "Dalla regione"),
      groups: [
        {
          id: "region",
          items: [
            it({ id: "walliserteller", name: t("Walliserteller", "Valais platter", "Assiette valaisanne", "Piatto vallesano"), desc: t("mit Roggenbrot", "with rye bread", "avec pain de seigle", "con pane di segale"), prices: [chf(30.5)], src: { pdf: "food", page: 1 } }),
            it({ id: "hobelkaese", name: t("Hobelkäseteller «Badner Alpen»", "Shaved cheese plate “Badner Alpen”", "Assiette de rebibes «Badner Alpen»", "Piatto di formaggio a scaglie «Badner Alpen»"), desc: t("mit Roggenbrot", "with rye bread", "avec pain de seigle", "con pane di segale"), prices: [chf(24)], src: { pdf: "food", page: 1 } }),
          ],
        },
      ],
    },
    {
      id: "pizzen",
      title: t("Pizzen", "Pizzas", "Pizzas", "Pizze"),
      groups: [
        {
          id: "pizzen",
          items: [
            it({ id: "margherita", name: same("Margherita"), desc: t("Mozzarella, Tomatensauce, Oregano", "Mozzarella, tomato sauce, oregano", "Mozzarella, sauce tomate, origan", "Mozzarella, salsa di pomodoro, origano"), prices: [chf(18)], src: { pdf: "food", page: 2 } }),
            it({ id: "piccante", name: same("Piccante"), desc: pz("scharfe Salami, Chilis", "spicy salami, chillies", "salami piquant, chilis", "salame piccante, peperoncino"), prices: [chf(24)], src: { pdf: "food", page: 2 } }),
            it({ id: "prosciutto", name: same("Prosciutto"), desc: pz("Hinterschinken", "cooked ham", "jambon cuit", "prosciutto cotto"), prices: [chf(22)], src: { pdf: "food", page: 2 } }),
            it({ id: "prosciutto-e-funghi", name: same("Prosciutto e Funghi"), desc: pz("Hinterschinken, frische Pilze", "cooked ham, fresh mushrooms", "jambon cuit, champignons frais", "prosciutto cotto, funghi freschi"), prices: [chf(23)], src: { pdf: "food", page: 2 } }),
            it({ id: "hawaii", name: same("Hawaii"), desc: pz("Hinterschinken, Ananas", "cooked ham, pineapple", "jambon cuit, ananas", "prosciutto cotto, ananas"), prices: [chf(23)], src: { pdf: "food", page: 2 } }),
            it({ id: "janis", name: same("Janis"), desc: pz("scharfe Salami, Ananas", "spicy salami, pineapple", "salami piquant, ananas", "salame piccante, ananas"), prices: [chf(23)], src: { pdf: "food", page: 2 } }),
            it({ id: "quattro-stagioni", name: same("Quattro Stagioni"), desc: pz("frische Pilze, Hinterschinken, Oliven, Artischocken", "fresh mushrooms, cooked ham, olives, artichokes", "champignons frais, jambon cuit, olives, artichauts", "funghi freschi, prosciutto cotto, olive, carciofi"), prices: [chf(24)], src: { pdf: "food", page: 2 } }),
            it({ id: "napoli", name: same("Napoli"), desc: pz("Sardellen, Kapern, Oliven", "anchovies, capers, olives", "anchois, câpres, olives", "acciughe, capperi, olive"), prices: [chf(22.5)], src: { pdf: "food", page: 2 } }),
            it({ id: "frutti-di-mare", name: same("Frutti di Mare"), desc: pz("Meeresfrüchte", "seafood", "fruits de mer", "frutti di mare"), prices: [chf(24)], tags: ["dyhrberg"], src: { pdf: "food", page: 2 } }),
            it({ id: "gamberoni", name: same("Gamberoni"), desc: pz("Riesencrevetten «Black Tiger», Knoblauch, Rucola", "“Black Tiger” king prawns, garlic, rocket", "crevettes «Black Tiger», ail, roquette", "gamberoni «Black Tiger», aglio, rucola"), prices: [chf(28)], tags: ["dyhrberg"], src: { pdf: "food", page: 2 } }),
            it({ id: "al-tonno", name: same("Al Tonno"), desc: pz("Oliven, Zwiebeln, Thunfisch", "olives, onions, tuna", "olives, oignons, thon", "olive, cipolle, tonno"), prices: [chf(23)], src: { pdf: "food", page: 3 } }),
            it({ id: "salmone", name: same("Salmone"), desc: pz("Rauchlachs, Zwiebeln, Kapern", "smoked salmon, onions, capers", "saumon fumé, oignons, câpres", "salmone affumicato, cipolle, capperi"), prices: [chf(25)], tags: ["dyhrberg"], src: { pdf: "food", page: 3 } }),
            it({ id: "fernanda", name: same("Fernanda"), desc: pz("frische Pilze, Hinterschinken, Peperoni, scharfe Salami, Oliven", "fresh mushrooms, cooked ham, bell peppers, spicy salami, olives", "champignons frais, jambon cuit, poivrons, salami piquant, olives", "funghi freschi, prosciutto cotto, peperoni, salame piccante, olive"), prices: [chf(25)], src: { pdf: "food", page: 3 } }),
            it({ id: "maria", name: same("Maria"), desc: pz("Gorgonzola, Hinterschinken, Zwiebeln", "gorgonzola, cooked ham, onions", "gorgonzola, jambon cuit, oignons", "gorgonzola, prosciutto cotto, cipolle"), prices: [chf(23.5)], src: { pdf: "food", page: 3 } }),
            it({ id: "giardino", name: same("Giardino"), desc: pz("Gorgonzola, Artischocken, Kapern, Sardellen, Hinterschinken, Peperoni, Ei", "gorgonzola, artichokes, capers, anchovies, cooked ham, bell peppers, egg", "gorgonzola, artichauts, câpres, anchois, jambon cuit, poivrons, œuf", "gorgonzola, carciofi, capperi, acciughe, prosciutto cotto, peperoni, uovo"), prices: [chf(25)], src: { pdf: "food", page: 3 } }),
            it({ id: "romana", name: same("Romana"), desc: pz("italienischer Rohschinken, Rucola, Grana", "Italian cured ham, rocket, grana", "jambon cru d’Italie, roquette, grana", "prosciutto crudo italiano, rucola, grana"), prices: [chf(26.5)], src: { pdf: "food", page: 3 } }),
            it({ id: "venezia", name: same("Venezia"), desc: pz("Hinterschinken, Speck, Zwiebeln, Knoblauch", "cooked ham, bacon, onions, garlic", "jambon cuit, lard, oignons, ail", "prosciutto cotto, pancetta, cipolle, aglio"), prices: [chf(24)], src: { pdf: "food", page: 3 } }),
            it({ id: "calzone", name: t("Calzone (zugedeckt)", "Calzone (folded)", "Calzone (fermée)", "Calzone (chiusa)"), desc: pz("frische Pilze, Hinterschinken", "fresh mushrooms, cooked ham", "champignons frais, jambon cuit", "funghi freschi, prosciutto cotto"), prices: [chf(23.5)], src: { pdf: "food", page: 3 } }),
            it({ id: "sofia-loren", name: same("Sofia Loren"), desc: pz("Rucola, Kirschtomaten, Büffelmozzarella", "rocket, cherry tomatoes, buffalo mozzarella", "roquette, tomates cerises, mozzarella di bufala", "rucola, pomodorini, mozzarella di bufala"), prices: [chf(28)], src: { pdf: "food", page: 3 } }),
            it({ id: "del-padrone", name: same("del Padrone"), desc: pz("Trockenfleischscheiben, Trüffelöl, Kirschtomaten", "slices of air-dried meat, truffle oil, cherry tomatoes", "tranches de viande séchée, huile de truffe, tomates cerises", "fettine di carne secca, olio al tartufo, pomodorini"), prices: [chf(27)], src: { pdf: "food", page: 4 } }),
            it({ id: "exotica", name: same("Exotica"), desc: pz("Ananas, Gorgonzola", "pineapple, gorgonzola", "ananas, gorgonzola", "ananas, gorgonzola"), prices: [chf(22)], src: { pdf: "food", page: 4 } }),
            it({ id: "mexicana", name: same("Mexicana"), desc: pz("Poulet (CH), Peperoni, Mais, Chilis", "chicken (CH), bell peppers, sweetcorn, chillies", "poulet (CH), poivrons, maïs, chilis", "pollo (CH), peperoni, mais, peperoncino"), prices: [chf(25)], tags: ["swiss-meat"], src: { pdf: "food", page: 4 } }),
            it({ id: "della-casa", name: same("Della Casa"), desc: pz("frische Pilze, Kalbfleisch (CH), Kräuterbutter", "fresh mushrooms, veal (CH), herb butter", "champignons frais, viande de veau (CH), beurre café de Paris", "funghi freschi, vitello (CH), burro alle erbe"), prices: [chf(26)], tags: ["swiss-meat"], src: { pdf: "food", page: 4 } }),
            it({ id: "niklas", name: same("Niklas"), desc: pz("Burrata, Kirschtomaten, Pesto", "burrata, cherry tomatoes, pesto", "burrata, tomates cerises, pesto", "burrata, pomodorini, pesto"), prices: [chf(29)], src: { pdf: "food", page: 4 } }),
          ],
        },
      ],
      notes: [
        t("Alle Pizzen und Teigwaren servieren wir Ihnen auch als kleine Portion: CHF 3.00 weniger.", "All pizzas and pasta dishes are also available as a small portion: CHF 3.00 less.", "Toutes nos pizzas et pâtes sont aussi servies en petite portion : CHF 3.00 de moins.", "Tutte le pizze e le paste sono disponibili anche in porzione piccola: CHF 3.00 in meno."),
        t("Alle Pizzen und Pasta servieren wir auch auf zwei Tellern: Zuschlag für Gedeck CHF 2.00.", "All pizzas and pasta dishes can be served on two plates: cover supplement CHF 2.00.", "Toutes nos pizzas et pâtes peuvent être servies sur deux assiettes : supplément de couvert CHF 2.00.", "Tutte le pizze e le paste possono essere servite su due piatti: supplemento coperto CHF 2.00."),
      ],
    },
    {
      id: "risotto",
      title: t("Risotto", "Risotto", "Risottos", "Risotti"),
      groups: [
        {
          id: "risotto",
          items: [
            it({ id: "risotto-romana", name: same("Risotto Romana"), desc: t("mit Rucola, Kirschtomaten und Grana", "with rocket, cherry tomatoes and grana", "avec roquette, tomates cerises et grana", "con rucola, pomodorini e grana"), prices: [chf(26)], src: { pdf: "food", page: 4 } }),
            it({ id: "risotto-funghi", name: same("Risotto funghi"), desc: t("mit Champignons, Steinpilzen und Grana", "with button mushrooms, porcini and grana", "avec champignons, bolets et grana", "con champignon, porcini e grana"), prices: [chf(26)], src: { pdf: "food", page: 4 } }),
          ],
        },
      ],
    },
    {
      id: "pasta",
      title: t("Unsere Teigwarengerichte", "Our pasta dishes", "Nos pâtes", "Le nostre paste"),
      groups: [
        {
          id: "pasta",
          items: [
            it({ id: "spaghetti-pesto", name: t("Spaghetti Pesto", "Spaghetti pesto", "Spaghettis pesto", "Spaghetti al pesto"), desc: t("Basilikum, Olivenöl und Pinienkerne", "basil, olive oil and pine nuts", "au basilic, huile d’olive et pignons", "basilico, olio d’oliva e pinoli"), prices: [chf(21.5)], src: { pdf: "food", page: 5 } }),
            it({ id: "spaghetti-napoli", name: t("Spaghetti Napoli", "Spaghetti Napoli", "Spaghettis Napoli", "Spaghetti Napoli"), desc: t("Tomatensauce mit Basilikum", "tomato sauce with basil", "à la sauce tomate et basilic", "salsa di pomodoro e basilico"), prices: [chf(20)], src: { pdf: "food", page: 5 } }),
            it({ id: "spaghetti-carbonara", name: t("Spaghetti Carbonara", "Spaghetti carbonara", "Spaghettis carbonara", "Spaghetti alla carbonara"), desc: t("mit Speck, Schinken und Eigelb an Rahmsauce", "with bacon, ham and egg yolk in a cream sauce", "avec lard, jambon, jaune d’œuf, à la crème", "con pancetta, prosciutto e tuorlo d’uovo in salsa alla panna"), prices: [chf(23.5)], src: { pdf: "food", page: 5 } }),
            it({ id: "spaghetti-black-tiger", name: t("Spaghetti mit Riesencrevetten «Black Tiger»", "Spaghetti with “Black Tiger” king prawns", "Spaghettis aux crevettes «Black Tiger»", "Spaghetti ai gamberoni «Black Tiger»"), desc: t("in Pastis flambiert an einer Rahmsauce mit Kräutern", "flambéed in pastis, in a cream sauce with herbs", "flambées au pastis, crème et herbes", "flambati al pastis, in salsa alla panna con erbe"), prices: [chf(28)], tags: ["dyhrberg"], src: { pdf: "food", page: 5 } }),
            it({ id: "penne-arrabbiata", name: same("Penne all’arrabbiata"), desc: t("an einer pikanten Tomatensauce (scharf)", "in a spicy tomato sauce (hot)", "à la sauce tomate pimentée", "in salsa di pomodoro piccante"), prices: [chf(23)], src: { pdf: "food", page: 5 } }),
            it({ id: "penne-bolognese", name: t("Penne Bolognese", "Penne Bolognese", "Penne bolognaise", "Penne alla bolognese"), desc: t("mit Rindfleischsauce", "with beef sauce", "viande de bœuf", "con ragù di manzo"), prices: [chf(23)], src: { pdf: "food", page: 5 } }),
            it({ id: "tagliolini-frutti-di-mare", name: same("Tagliolini Frutti di mare"), desc: t("hausgemacht, mit in Pastis flambierten Meeresfrüchten an einer Tomaten-Rahmsauce", "homemade, with seafood flambéed in pastis, in a creamy tomato sauce", "maison, aux fruits de mer flambés au pastis, sauce tomate à la crème", "fatti in casa, con frutti di mare flambati al pastis in salsa di pomodoro alla panna"), prices: [chf(27)], tags: ["homemade", "dyhrberg"], src: { pdf: "food", page: 5 } }),
            it({ id: "tagliolini-bella-italia", name: t("Tagliolini «Bella Italia»", "Tagliolini “Bella Italia”", "Tagliolini «Bella Italia»", "Tagliolini «Bella Italia»"), desc: t("hausgemacht, mit Zwiebeln, Tomaten, Rucola, Mozzarella und Olivenöl", "homemade, with onions, tomatoes, rocket, mozzarella and olive oil", "maison, avec oignons, tomates, roquette, mozzarella et huile d’olive", "fatti in casa, con cipolle, pomodori, rucola, mozzarella e olio d’oliva"), prices: [chf(26)], tags: ["homemade"], src: { pdf: "food", page: 5 } }),
            it({ id: "tagliolini-salmone", name: same("Tagliolini al salmone"), desc: t("hausgemacht, an Rauchlachs-Rahmsauce", "homemade, in a smoked salmon cream sauce", "maison, à la crème et au saumon fumé", "fatti in casa, in salsa alla panna con salmone affumicato"), prices: [chf(26.5)], tags: ["homemade"], src: { pdf: "food", page: 5 } }),
            it({ id: "gnocchi-pomodoro", name: same("Gnocchi al pomodoro"), desc: t("mit Tomatensauce und Mozzarella leicht gratiniert", "with tomato sauce and mozzarella, lightly gratinated", "sauce tomate, légèrement gratinés", "con salsa di pomodoro e mozzarella, leggermente gratinati"), prices: [chf(21)], src: { pdf: "food", page: 5 } }),
            it({ id: "lasagne", name: t("Lasagne", "Lasagne", "Lasagnes", "Lasagne"), desc: t("hausgemacht, aus dem Ofen", "homemade, from the oven", "maison, au four", "fatte in casa, al forno"), prices: [chf(24.5)], tags: ["homemade"], src: { pdf: "food", page: 5 } }),
            it({ id: "conchiglie-diavola", name: same("Conchiglie alla Diavola"), desc: t("mit Poulet (CH), Zwiebeln, Peperoni, Pilze, Chilli und Olivenöl", "with chicken (CH), onions, bell peppers, mushrooms, chilli and olive oil", "avec poulet (CH), oignons, poivrons, champignons, chilis et huile d’olive", "con pollo (CH), cipolle, peperoni, funghi, peperoncino e olio d’oliva"), prices: [chf(25)], tags: ["swiss-meat"], src: { pdf: "food", page: 5 } }),
            it({ id: "triangolo-grande", name: same("Triangolo Grande"), desc: t("mit Spinat und Büffel-Ricotta an Tomatenrahmsauce leicht gratiniert", "with spinach and buffalo ricotta in a creamy tomato sauce, lightly gratinated", "ricotta di bufala et épinards, sauce tomate à la crème, gratinés", "con spinaci e ricotta di bufala in salsa di pomodoro alla panna, leggermente gratinati"), prices: [chf(25)], src: { pdf: "food", page: 5 } }),
          ],
        },
      ],
      notes: [
        t("Kleine Portion und Servieren auf zwei Tellern: siehe Pizzen.", "Small portions and sharing on two plates: see pizzas.", "Petite portion et service sur deux assiettes : voir pizzas.", "Porzione piccola e servizio su due piatti: vedi pizze."),
      ],
    },
    {
      id: "fleisch",
      title: t("Unsere Fleischgerichte", "Our meat dishes", "Nos plats de viande", "I nostri piatti di carne"),
      groups: [
        {
          id: "fleisch",
          items: [
            it({ id: "pouletbrust-saltimbocca", name: t("Slow cooked Pouletbrust (CH) «Saltimbocca»", "Slow-cooked chicken breast (CH) “Saltimbocca”", "Poitrine de poulet (CH) sous vide «Saltimbocca»", "Petto di pollo (CH) cotto a bassa temperatura «Saltimbocca»"), desc: t("mit Rohschinken und Salbei an Marsalasauce, Risotto, kleiner Salat vom Büffet", "with cured ham and sage in a Marsala sauce, risotto, small salad from the buffet", "au jambon cru et à la sauge, sauce au marsala, risotto, petite salade du buffet", "con prosciutto crudo e salvia in salsa al marsala, risotto, piccola insalata dal buffet"), prices: [chf(39)], tags: ["swiss-meat"], src: { pdf: "food", page: 6 } }),
            it({ id: "schweineschnitzel", name: t("Schweineschnitzel paniert (CH)", "Breaded pork schnitzel (CH)", "Escalope de porc panée (CH)", "Scaloppina di maiale impanata (CH)"), desc: t("Pommes Frites, kleiner Salat vom Büffet", "French fries, small salad from the buffet", "pommes frites, petite salade du buffet", "patatine fritte, piccola insalata dal buffet"), prices: [chf(39)], tags: ["swiss-meat"], src: { pdf: "food", page: 6 } }),
            it({ id: "entrecote", name: t("Slow cooked Entrecote (AUS)", "Slow-cooked entrecôte (AUS)", "Entrecôte (AUS) sous vide", "Entrecôte (AUS) cotta a bassa temperatura"), desc: t("rosa gegart mit Kräuterbutter, Pommes Frites, kleiner Salat vom Büffet", "cooked pink, with herb butter, French fries, small salad from the buffet", "cuite rosée, sauce café de Paris, pommes frites, petite salade du buffet", "cotta rosa, con burro alle erbe, patatine fritte, piccola insalata dal buffet"), prices: [chf(46)], tags: ["australian-meat"], src: { pdf: "food", page: 6 } }),
          ],
        },
      ],
    },
  ],
  footnotes: [
    t("Wir beziehen unser Brot täglich von der Bäckerei la Bohème in Leukerbad (CH).", "We buy our bread fresh every day from the la Bohème bakery in Leukerbad (CH).", "Nous achetons notre pain chaque jour à la boulangerie la Bohème à Loèche-les-Bains (CH).", "Il nostro pane arriva ogni giorno dalla panetteria la Bohème di Leukerbad (CH)."),
    t("Den Pizzateig stellen wir täglich vor Ort frisch mit regionalen Zutaten her.", "We make our pizza dough fresh on site every day, with regional ingredients.", "Nous préparons chaque jour sur place la pâte à pizza fraîche, à partir d’ingrédients régionaux.", "Prepariamo ogni giorno sul posto l’impasto fresco della pizza, con ingredienti regionali."),
    t("Fleisch aus Australien (AUS) kann Spuren von Antibiotika und leistungsfördernden Mitteln aufweisen.", "Meat from Australia (AUS) may contain traces of antibiotics and performance enhancers.", "La viande d’Australie (AUS) peut contenir des traces d’antibiotiques et de stimulateurs de performance.", "La carne dall’Australia (AUS) può contenere tracce di antibiotici e di stimolatori di prestazione."),
    t("Unser Fisch ist von der Firma Dyhrberg mit zertifiziertem Anbau, Meeresfrüchte aus Vietnam oder Thailand und Rauchlachs aus Norwegen.", "Our fish comes from Dyhrberg, from certified farming; seafood from Vietnam or Thailand and smoked salmon from Norway.", "Notre poisson provient de l’entreprise Dyhrberg, d’élevage certifié; fruits de mer du Vietnam ou de Thaïlande et saumon fumé de Norvège.", "Il nostro pesce proviene dalla ditta Dyhrberg, da allevamento certificato; frutti di mare dal Vietnam o dalla Thailandia e salmone affumicato dalla Norvegia."),
    t("Bei Allergien wenden Sie sich bitte an die Servicemitarbeiter. Danke.", "If you have an allergy, please tell our service team. Thank you.", "En cas d’allergie, veuillez vous adresser à notre personnel de service. Merci.", "In caso di allergie, rivolgetevi al nostro personale di servizio. Grazie."),
    t("MwSt. inbegriffen.", "VAT included.", "TVA comprise.", "IVA inclusa."),
  ],
};

// ---------------------------------------------------------------------------------------------------------------
// GETRÄNKEKARTE
const drink = (id: string, name: T, page: number, prices: Price[], extra: Partial<Item> = {}): Item => ({ id, name, prices, src: { pdf: "drinks", page }, ...extra });
const brook = (id: string, de: string, en: string, fr: string, itl: string) =>
  drink(id, t(`Alkoholfreier Cocktail Brooklyn by Grapos ${de}`, `Alcohol-free cocktail Brooklyn by Grapos, ${en}`, `Cocktail sans alcool Brooklyn by Grapos, ${fr}`, `Cocktail analcolico Brooklyn by Grapos, ${itl}`), 1, [chf(7.5, dl(4))]);
const LS = same("Leukersonne, Jörg Seewer, Susten");
const VAR = same("C. Varonier & Söhne AG, Varen");
const GRAN = same("Gran Sasso, Ortona, Chieti");

const drinks: Menu = {
  id: "drinks",
  title: t("Getränkekarte", "Drinks menu", "Carte des boissons", "Carta delle bevande"),
  kicker: t("Aperitifs · Wasser & Softdrinks · Bier · Walliser & italienische Weine · Kaffee · Digestifs", "Aperitifs · Water & soft drinks · Beer · Valais & Italian wines · Coffee · Digestifs", "Apéritifs · Eaux & sodas · Bières · Vins du Valais et d’Italie · Cafés · Digestifs", "Aperitivi · Acque e bibite · Birre · Vini vallesani e italiani · Caffè · Digestivi"),
  pdf: { href: pdfHref("Getraenkekarte.pdf", MENU_PDF_LIVE.drinks), file: "Getraenkekarte.pdf", bytes: 10299780, pages: 6 },
  sections: [
    {
      id: "aperitifs",
      title: t("Aperitifs", "Aperitifs", "Apéritifs", "Aperitivi"),
      groups: [
        {
          id: "aperitifs",
          items: [
            drink("appenzeller", same("Appenzeller"), 1, [chf(8.5, cl(4))], { abv: 29 }),
            drink("campari", same("Campari"), 1, [chf(7.5, cl(4))], { abv: 25 }),
            drink("campari-orange", t("Campari mit Orangensaft", "Campari with orange juice", "Campari au jus d’orange", "Campari con succo d’arancia"), 1, [chf(9, cl(4))], { abv: 25 }),
            drink("cynar", same("Cynar"), 1, [chf(7.5, cl(4))], { abv: 16.5 }),
            drink("cynar-orange", t("Cynar mit Orangensaft", "Cynar with orange juice", "Cynar au jus d’orange", "Cynar con succo d’arancia"), 1, [chf(9, cl(4))], { abv: 16.5 }),
            drink("martini", t("Martini weiss", "Martini Bianco", "Martini blanc", "Martini Bianco"), 1, [chf(7.5, cl(4))], { abv: 15 }),
            drink("pastis", same("Pastis 51"), 1, [chf(8, cl(4))], { abv: 45 }),
            drink("vodka-orange", same("Vodka Orange"), 1, [chf(10.5, cl(4))], { abv: 37.5 }),
            drink("gin-tonic", t("Gin Tonic", "Gin and tonic", "Gin tonic", "Gin tonic"), 1, [chf(11.5, cl(2))], { abv: 37.5 }),
            drink("prosecco", same("Prosecco"), 1, [chf(9, dl(1))], { abv: 11 }),
            drink("fragola", t("Fragola mit Prosecco", "Fragola with Prosecco", "Fragola au prosecco", "Fragola con prosecco"), 1, [chf(10, dl(1))], { abv: 24 }),
          ],
        },
        {
          id: "sprizz",
          title: same("Sprizz Giardino Special"),
          items: [
            drink("hugo-grapefrizz", same("Hugo Sprizz, Grapefr’izz"), 1, [chf(11.5)], { abv: 17, review: true }),
            drink("aperol-spritz", same("Aperol Spritz"), 1, [chf(11.5)], { abv: 11 }),
            drink("sarti-spritz", same("Sarti Spritz"), 1, [chf(11.5)], { abv: 14 }),
            drink("campari-spritz", same("Campari Spritz"), 1, [chf(11.5)], { abv: 25 }),
          ],
        },
      ],
    },
    {
      id: "aperitifs-ohne-alkohol",
      title: t("Aperitifs ohne Alkohol", "Alcohol-free aperitifs", "Apéritifs sans alcool", "Aperitivi analcolici"),
      groups: [
        {
          id: "ohne-alkohol",
          items: [
            brook("brooklyn-holunder", "Holunderblüte", "elderflower", "fleur de sureau", "fiori di sambuco"),
            brook("brooklyn-lemon", "Lemon", "lemon", "citron", "limone"),
            brook("brooklyn-apfel", "Bio Apfel", "organic apple", "pomme bio", "mela bio"),
            brook("brooklyn-erdbeere", "Erdbeere", "strawberry", "fraise", "fragola"),
            drink("san-bitter", same("San Bitter"), 1, [chf(5, dl(1))]),
            drink("tomatensaft", t("Tomatensaft", "Tomato juice", "Jus de tomate", "Succo di pomodoro"), 1, [chf(5.1, dl(2))]),
            drink("orangensaft", t("Orangensaft frisch gepresst", "Freshly squeezed orange juice", "Orange pressée", "Spremuta d’arancia"), 1, [chf(5.8, dl(2))]),
            drink("schweppes-tonic", same("Schweppes Tonic"), 1, [chf(5, dl(2))]),
            drink("schweppes-bitter-lemon", same("Schweppes Bitter Lemon"), 1, [chf(5, dl(2))]),
          ],
        },
      ],
    },
    {
      id: "mineralwasser",
      title: t("Mineralwasser", "Mineral water", "Eaux minérales", "Acque minerali"),
      columns: [dl(2), dl(3), dl(5), litre],
      groups: [
        {
          id: "wasser",
          items: [
            drink("badnerwasser", t("Badnerwasser Offenausschank", "Badnerwasser, on draught", "Badnerwasser à la pression", "Badnerwasser alla spina"), 2, [chf(3.6, dl(2)), chf(4.6, dl(3)), chf(5.6, dl(5))]),
            drink("acqua-panna", same("Acqua Panna"), 2, [chf(5, dl(3)), chf(6, dl(5)), chf(9.3, litre)], { desc: t("San Pellegrino, ohne Kohlensäure", "San Pellegrino, still", "San Pellegrino, plate", "San Pellegrino, naturale") }),
            drink("san-pellegrino", same("San Pellegrino"), 2, [chf(6, dl(5)), chf(9.3, litre)]),
          ],
        },
      ],
      notes: [t("Für den Service von Hahnenwasser verrechnen wir CHF 2.– pro Person.", "For serving tap water we charge CHF 2.– per person.", "Pour le service de l’eau du robinet, nous facturons CHF 2.– par personne.", "Per il servizio dell’acqua del rubinetto addebitiamo CHF 2.– a persona.")],
    },
    {
      id: "softgetraenke",
      title: t("Softgetränke", "Soft drinks", "Boissons sans alcool", "Bibite"),
      columns: [dl(2), dl(3), dl(5), litre],
      groups: [
        {
          id: "soft",
          items: [
            drink("ice-tea", t("Hausgemachter Ice Tee", "Homemade iced tea", "Thé froid maison", "Tè freddo fatto in casa"), 2, [chf(5.8, dl(3)), chf(7.5, dl(5))], { tags: ["homemade"], review: true }),
            drink("coca-cola", t("Coca-Cola Offenausschank", "Coca-Cola, on draught", "Coca-Cola à la pression", "Coca-Cola alla spina"), 2, [chf(3.7, dl(2)), chf(4.7, dl(3)), chf(5.7, dl(5)), chf(9.7, litre)]),
            drink("sprite", t("Sprite Offenausschank", "Sprite, on draught", "Sprite à la pression", "Sprite alla spina"), 2, [chf(3.7, dl(2)), chf(4.7, dl(3)), chf(5.7, dl(5)), chf(9.7, litre)]),
            drink("fuze-tea", t("Fuze Tea Offenausschank", "Fuze Tea, on draught", "Fuze Tea à la pression", "Fuze Tea alla spina"), 2, [chf(3.7, dl(2)), chf(4.7, dl(3)), chf(5.7, dl(5)), chf(9.7, litre)]),
            drink("coca-zero", same("Coca Zero"), 2, [chf(5, dl(3))]),
            drink("fanta", same("Fanta"), 2, [chf(5, dl(3))]),
            drink("rivella-blau", t("Rivella blau", "Rivella Blue", "Rivella bleu", "Rivella blu"), 2, [chf(5, dl(3))], { review: true }),
            drink("rivella-rot", t("Rivella rot", "Rivella Red", "Rivella rouge", "Rivella rossa"), 2, [chf(5, dl(3)), chf(9.8, litre)], { review: true }),
            drink("apfelsaft", t("Apfelsaft", "Apple juice", "Jus de pomme", "Succo di mela"), 2, [chf(5, dl(3))]),
            drink("apfelschorle", t("Apfelschorle", "Apple juice spritzer", "Jus de pomme et eau gazeuse", "Succo di mela con acqua frizzante"), 2, [chf(5, dl(3))]),
            drink("sirup-kids", t("Sirup Kids", "Syrup for kids", "Sirop pour enfants", "Sciroppo per bambini"), 2, [chf(1, dl(2)), chf(3, dl(3))], { review: true }),
          ],
        },
      ],
    },
    {
      id: "bier",
      title: t("Bier", "Beer", "Bières", "Birre"),
      groups: [
        {
          id: "bier",
          items: [
            drink("moretti-mini", t("Mini Moretti", "Moretti, small", "Moretti, petite", "Moretti, piccola"), 2, [chf(4.2, dl(2))], { abv: 5.2 }),
            drink("moretti-stange", t("Stange Moretti", "Moretti, glass", "Moretti, verre", "Moretti, bicchiere"), 2, [chf(4.8, dl(3))], { abv: 5.2 }),
            drink("moretti-humpen", t("Humpen Moretti", "Moretti, tankard", "Moretti, chope", "Moretti, boccale"), 2, [chf(7.3, dl(5))], { abv: 5.2 }),
            drink("moretti-0", t("Moretti alkoholfrei", "Moretti alcohol-free", "Moretti sans alcool", "Moretti analcolica"), 2, [chf(5.6, dl(3))]),
            drink("erdinger", t("Erdinger Weissbier", "Erdinger wheat beer", "Erdinger bière blanche", "Erdinger birra bianca"), 2, [chf(7.6, dl(5))], { abv: 5.3 }),
            drink("quoellfrisch", t("Quöllfrisch naturtrüb Bügel", "Quöllfrisch naturtrüb (unfiltered), swing-top bottle", "Quöllfrisch naturtrüb (non filtrée), bouteille à bouchon mécanique", "Quöllfrisch naturtrüb (non filtrata), bottiglia con tappo meccanico"), 2, [chf(5.8, dl(3))], { abv: 4.8 }),
          ],
        },
      ],
    },
    {
      id: "walliser-weissweine",
      title: t("Walliser Weissweine", "White wines from Valais", "Vins blancs du Valais", "Vini bianchi vallesani"),
      columns: [B70, B50, B375, G10],
      groups: [
        {
          id: "weiss",
          items: [
            drink("fendant-fine-goutte", same("Fendant Fine Goutte"), 3, [chf(43, B70)], { desc: LS }),
            drink("johannisberg-siccus", same("Johannisberg Siccus"), 3, [chf(44, B70), chf(32, B50), chf(26, B375)], { desc: same("Domaine du Mont d’Or SA, Sion") }),
            drink("petite-arvine", same("Petite Arvine"), 3, [chf(33, B50)], { desc: same("Maître de Chais / Provins, Sion") }),
            drink("sherpa-blanc", same("Sherpa Assemblage «Blanc»"), 3, [chf(51, B70), chf(37.5, B50)], { desc: t("Heida, Blanc du Pinot Noir, Chasselas · Domaines Chevaliers, Salgesch", "Heida, Blanc du Pinot Noir, Chasselas · Domaines Chevaliers, Salgesch", "Heida, Blanc du Pinot Noir, Chasselas · Domaines Chevaliers, Salquenen", "Heida, Blanc du Pinot Noir, Chasselas · Domaines Chevaliers, Salgesch") }),
            drink("assemblage-apero", t("Assemblage Apéro (Muscat, Chardonnay, Sylvaner)", "Assemblage Apéro (Muscat, Chardonnay, Sylvaner)", "Assemblage Apéro (muscat, chardonnay, sylvaner)", "Assemblage Apéro (Moscato, Chardonnay, Sylvaner)"), 3, [chf(42, B70), chf(6, G10)], { desc: LS }),
          ],
        },
      ],
    },
    {
      id: "walliser-rose",
      title: t("Walliser Roséweine", "Rosé wines from Valais", "Vins rosés du Valais", "Vini rosati vallesani"),
      columns: [B70, B50, B375, G10],
      groups: [{ id: "rose", items: [drink("rose-ozenit", same("Rosé"), 3, [chf(43.5, B70)], { desc: same("Ozenit SA, Granges") })] }],
    },
    {
      id: "walliser-rotweine",
      title: t("Walliser Rotweine", "Red wines from Valais", "Vins rouges du Valais", "Vini rossi vallesani"),
      columns: [B70, B50, B375, G10],
      groups: [
        {
          id: "rot",
          items: [
            drink("courage", t("Courage (Syrah, Merlot und Gamaret)", "Courage (Syrah, Merlot and Gamaret)", "Courage (syrah, merlot et gamaret)", "Courage (Syrah, Merlot e Gamaret)"), 3, [chf(47.5, B70)], { desc: LS }),
            drink("dole", same("Dôle"), 3, [chf(43.5, B70)], { desc: LS }),
            drink("pinot-noir", same("Pinot Noir"), 3, [chf(45.5, B70), chf(32.5, B50), chf(25, B375), chf(6.5, G10)], { desc: LS }),
            drink("pinot-noir-barrique", same("Pinot Noir Barrique Non Filtré"), 3, [chf(51, B70)], { desc: VAR }),
            drink("humagne-rouge", same("Humagne Rouge «Les Tonneliers» AOC Valais"), 3, [chf(53, B70)], { desc: same("Gilliard, Sion") }),
            drink("diolinoir", same("Diolinoir"), 3, [chf(54.5, B70)], { desc: VAR }),
            drink("cornalin", same("Cornalin"), 3, [chf(54.5, B70)], { desc: LS }),
            drink("syrah", same("Syrah"), 3, [chf(53, B70)], { desc: LS }),
            drink("sherpa-rouge", same("Sherpa Assemblage «Rouge»"), 3, [chf(51, B70), chf(37.5, B50)], { desc: t("Humagne rouge, Pinot Noir · Domaines Chevaliers, Salgesch", "Humagne Rouge, Pinot Noir · Domaines Chevaliers, Salgesch", "humagne rouge, pinot noir · Domaines Chevaliers, Salquenen", "Humagne Rouge, Pinot Noir · Domaines Chevaliers, Salgesch") }),
            drink("merlot-valais", same("Merlot Valais du Rhône"), 4, [chf(53, B70), chf(38.5, B50)], { desc: same("Chai du Baron SA, Bramois-Sion") }),
            drink("solis", t("Solis (Syrah, Gamay, Merlot)", "Solis (Syrah, Gamay, Merlot)", "Solis (syrah, gamay, merlot)", "Solis (Syrah, Gamay, Merlot)"), 4, [chf(35, B50)], { desc: LS }),
            drink("le-reve-rouge", t("Le Rêve rouge (Pinot Noir, Humagne rouge)", "Le Rêve rouge (Pinot Noir, Humagne Rouge)", "Le Rêve rouge (pinot noir, humagne rouge)", "Le Rêve rouge (Pinot Noir, Humagne Rouge)"), 4, [chf(26.5, B50)], { desc: LS }),
            drink("salconio", t("Salconio (Syrah, Diolinoir, Cabernet franc)", "Salconio (Syrah, Diolinoir, Cabernet Franc)", "Salconio (syrah, diolinoir, cabernet franc)", "Salconio (Syrah, Diolinoir, Cabernet Franc)"), 4, [chf(49.5, B70), chf(36, B50)], { desc: t("Albert Mathier und Söhne, Salgesch", "Albert Mathier und Söhne, Salgesch", "Albert Mathier und Söhne, Salquenen", "Albert Mathier und Söhne, Salgesch") }),
            drink("optimo", t("Optimo (Diolinoir, Gamaret, Cabernet Sauvignon, Syrah)", "Optimo (Diolinoir, Gamaret, Cabernet Sauvignon, Syrah)", "Optimo (diolinoir, gamaret, cabernet sauvignon, syrah)", "Optimo (Diolinoir, Gamaret, Cabernet Sauvignon, Syrah)"), 4, [chf(50, B70), chf(7.1, G10)], { desc: same("Adrian & Diego Mathier Nouveau Salquenen AG") }),
          ],
        },
      ],
    },
    {
      id: "italienische-rotweine",
      title: t("Italienische Rotweine", "Italian red wines", "Vins rouges d’Italie", "Vini rossi italiani"),
      columns: [B70, G10],
      groups: [
        {
          id: "italia",
          items: [
            drink("sangiovese", same("Sangiovese"), 4, [chf(42, B70), chf(6, G10)], { desc: same("Gran Sasso, Terre di Chieti, Ortona, Chieti") }),
            drink("ripasso", same("Ripasso Albino Armani DOC"), 4, [chf(54, B70), chf(7.7, G10)], { desc: same("Albino Armani, Marano di Valpolicella, Veneto") }),
            drink("montepulciano", same("Montepulciano d’Abruzzo"), 4, [chf(41, B70), chf(5.9, G10)], { desc: GRAN }),
            drink("primitivo", same("Primitivo"), 4, [chf(43, B70), chf(6.2, G10)], { desc: same("Gran Sasso, Puglia") }),
          ],
        },
      ],
    },
    {
      id: "offenweine",
      title: t("Walliser Offenweine", "Valais wines by the carafe and glass", "Vins ouverts du Valais", "Vini vallesani sfusi"),
      columns: [B50, C30, C20, G10],
      groups: [
        {
          id: "offen-weiss",
          title: t("Weisswein", "White", "Vins blancs", "Bianchi"),
          items: [
            drink("fendant-offen", same("Fendant Leukersonne"), 4, [chf(21.5, B50), chf(12.9, C30), chf(8.6, C20), chf(4.3, G10)]),
            drink("johannisberg-offen", same("Johannisberg Leukersonne"), 4, [chf(23.5, B50), chf(14.1, C30), chf(9.4, C20), chf(4.7, G10)]),
          ],
        },
        {
          id: "offen-rot",
          title: t("Rot- und Roséweine", "Red and rosé", "Vins rouges et rosés", "Rossi e rosati"),
          items: [
            drink("dole-offen", same("Dôle Leukersonne"), 4, [chf(22.5, B50), chf(13.5, C30), chf(9, C20), chf(4.5, G10)]),
            drink("rose-offen", same("Rosé Leukersonne"), 4, [chf(22, B50), chf(13.2, C30), chf(8.8, C20), chf(4.4, G10)]),
          ],
        },
      ],
    },
    {
      id: "warme-getraenke",
      title: t("Warme Getränke", "Hot drinks", "Boissons chaudes", "Bevande calde"),
      groups: [
        {
          id: "kaffee",
          items: [
            drink("kaffee-creme", t("Kaffee Creme", "Café crème", "Café crème", "Caffè crema"), 5, [chf(4.4)]),
            drink("doppelter-espresso", t("Doppelter Espresso", "Double espresso", "Double espresso", "Espresso doppio"), 5, [chf(6.8)]),
            drink("latte-macchiato", same("Latte Macchiato"), 5, [chf(5.6)]),
            drink("cappuccino", same("Cappuccino"), 5, [chf(5.1)]),
            drink("kaffee-schlagrahm", t("Kaffee mit Schlagrahm", "Coffee with whipped cream", "Café crème fouettée", "Caffè con panna montata"), 5, [chf(5.9)]),
            drink("kaffee-giardino", t("Kaffee GIARDINO", "Coffee GIARDINO", "Café GIARDINO", "Caffè GIARDINO"), 5, [chf(9.6)], { review: true }),
            drink("kaffee-baileys", t("Kaffee Baileys", "Coffee with Baileys", "Café Baileys", "Caffè Baileys"), 5, [chf(10.8)]),
            drink("swissrock-williamine", t("Kaffee Swissrock mit Williamine", "Coffee Swissrock with Williamine", "Café Swissrock à la Williamine", "Caffè Swissrock con Williamine"), 5, [chf(6.5)]),
            drink("swissrock-abricotine", t("Kaffee Swissrock mit Abricotine", "Coffee Swissrock with Abricotine", "Café Swissrock à l’Abricotine", "Caffè Swissrock con Abricotine"), 5, [chf(6.5)]),
          ],
        },
        {
          id: "tee",
          items: [
            drink("sirocco", t("Sirocco Qualitätstee", "Sirocco quality tea", "Thé de qualité Sirocco", "Tè di qualità Sirocco"), 5, [chf(5)], {
              desc: t(
                "Purple Breeze, Verbena, Camomile Orange Blossoms, Moroccan Mint, Piz Palü, Ginger Lemon Dream, Green Tropic, Red Kiss, Hagebutten",
                "Purple Breeze, Verbena, Camomile Orange Blossoms, Moroccan Mint, Piz Palü, Ginger Lemon Dream, Green Tropic, Red Kiss, rosehip",
                "Purple Breeze, Verbena, Camomile Orange Blossoms, Moroccan Mint, Piz Palü, Ginger Lemon Dream, Green Tropic, Red Kiss, églantier",
                "Purple Breeze, Verbena, Camomile Orange Blossoms, Moroccan Mint, Piz Palü, Ginger Lemon Dream, Green Tropic, Red Kiss, rosa canina",
              ),
            }),
          ],
        },
        {
          id: "warm",
          items: [
            drink("ovomaltine", t("Ovomaltine / Schokolade", "Ovomaltine / hot chocolate", "Ovomaltine / chocolat chaud", "Ovomaltina / cioccolata calda"), 5, [chf(5)]),
            drink("ovomaltine-rahm", t("Ovomaltine / Schokolade mit Schlagrahm", "Ovomaltine / hot chocolate with whipped cream", "Ovomaltine / chocolat chaud et crème fouettée", "Ovomaltina / cioccolata calda con panna montata"), 5, [chf(6.5)]),
            drink("milch", t("Milch", "Milk", "Lait", "Latte"), 5, [chf(3.8)]),
            drink("alpen-glueh", same("Alpen Glüh"), 5, [chf(8)], { review: true }),
            drink("apfelpunsch", t("Apfelpunsch", "Apple punch", "Punch aux pommes", "Punch di mela"), 5, [chf(5)]),
          ],
        },
      ],
    },
    {
      id: "likoere",
      title: t("Liköre und Branntweine", "Liqueurs and spirits", "Liqueurs et eaux-de-vie", "Liquori e acquaviti"),
      groups: [
        {
          id: "likoere",
          items: [
            drink("limoncello", same("Limoncello"), 6, [chf(7, cl(2))], { abv: 30 }),
            drink("grand-marnier", same("Grand Marnier"), 6, [chf(7, cl(2))], { abv: 40 }),
            drink("amaretto", same("Amaretto"), 6, [chf(7, cl(2))], { abv: 28 }),
            drink("ramazzotti", same("Ramazzotti"), 6, [chf(6.5, cl(2))], { abv: 30 }),
            drink("abricotine", same("Abricotine Morand"), 6, [chf(9.5, cl(2))], { abv: 43 }),
            drink("williamine", same("Williamine Morand"), 6, [chf(9, cl(2))], { abv: 43 }),
            drink("vieille-prune", same("Vieille Prune Morin Père & Fils"), 6, [chf(9.5, cl(2))], { abv: 41 }),
            drink("vieille-poire", same("Vieille Poire Fassbind"), 6, [chf(9.5, cl(2))], { abv: 40 }),
            drink("grappa-prosecco", same("Grappa di Prosecco Fumé Bottega"), 6, [chf(7, cl(2))], { abv: 38 }),
            drink("grappa-merlot", same("Grappa Merlot"), 6, [chf(7.5, cl(2))], { abv: 40 }),
            drink("grappa-moscato", same("Grappa Moscato"), 6, [chf(7.5, cl(2))], { abv: 40 }),
            drink("grappa-rovere", same("Grappa Aquavite «Rovere»"), 6, [chf(9.5, cl(2))], { abv: 42, desc: t("Eichenholz", "oak", "chêne", "rovere") }),
            drink("grappa-miele", same("Grappa Miele"), 6, [chf(7, cl(2))], { abv: 24 }),
            drink("most-uve-miste", same("Most Uve Miste"), 6, [chf(8.5, cl(2))], { abv: 40 }),
            drink("baileys", same("Baileys"), 6, [chf(8.5, cl(4))], { abv: 17 }),
            drink("creme-brulee-fassbind", same("Crème Brûlée Fassbind"), 6, [chf(8.5, cl(4))], { abv: 17 }),
          ],
        },
      ],
    },
    {
      id: "cognac",
      title: t("Cognac & Brandy", "Cognac & brandy", "Cognacs & brandy", "Cognac e brandy"),
      groups: [
        {
          id: "cognac",
          items: [
            drink("remy-martin", same("Rémy Martin VSOP"), 6, [chf(10.5, cl(2))], { abv: 40 }),
            drink("vecchia-romagna", same("Brandy Vecchia Romagna"), 6, [chf(9, cl(2))], { abv: 38 }),
          ],
        },
      ],
    },
    {
      id: "whisky",
      title: same("Whisky"),
      groups: [{ id: "whisky", items: [drink("glenfiddich", t("Glenfiddich 12 Years", "Glenfiddich 12 Years", "Glenfiddich 12 ans", "Glenfiddich 12 anni"), 6, [chf(11, cl(4))], { abv: 40 })] }],
    },
  ],
  footnotes: [t("Alle Preise in CHF, MwSt. inbegriffen.", "All prices in CHF, VAT included.", "Tous les prix en CHF, TVA comprise.", "Tutti i prezzi in CHF, IVA inclusa.")],
};

// ---------------------------------------------------------------------------------------------------------------
// GLACE (shared by the dessert and kids menus, which print the same Frisco range at the same prices)
const fl = (id: string, name: T, extra: Partial<Item> = {}): Item => ({ id, name, prices: [], src: { pdf: "desserts", page: 2 }, ...extra });
export const FLAVOURS: Item[] = [
  fl("vanille", t("Vanille", "Vanilla", "Vanille", "Vaniglia")),
  fl("chocolat", t("Chocolat", "Chocolate", "Chocolat", "Cioccolato")),
  fl("pistache", t("Pistache", "Pistachio", "Pistache", "Pistacchio")),
  fl("mocca", t("Mocca", "Mocha", "Moka", "Moka"), { tags: ["hazelnut"], note: t("enthält Haselnuss", "contains hazelnut", "contient de la noisette", "contiene nocciola") }),
  fl("stracciatella", same("Stracciatella")),
  fl("caramel", t("Caramel", "Caramel", "Caramel", "Caramello")),
  fl("baumnuss", t("Baumnuss", "Walnut", "Noix", "Noce")),
  fl("oreo", same("Oreo"), { desc: t("Cremige Glace mit echten Oreo-Stücken", "Creamy ice cream with real Oreo pieces", "Glace crémeuse aux vrais morceaux d’Oreo", "Gelato cremoso con veri pezzi di Oreo") }),
  fl("erdbeer", t("Erdbeer", "Strawberry", "Fraise", "Fragola")),
  fl("banane", t("Banane", "Banana", "Banane", "Banana")),
  fl("aprikose", t("Aprikose", "Apricot", "Abricot", "Albicocca"), { tags: ["vegan"] }),
  fl("citron", t("Citron", "Lemon", "Citron", "Limone"), { tags: ["vegan"] }),
  fl("himbeer", t("Himbeer", "Raspberry", "Framboise", "Lampone"), { tags: ["vegan"] }),
];
export const SCOOP_CHF = 4;
export const CREAM_CHF = 1.5;

const frisco = (id: string, name: T, price: number, desc?: T): Item => ({ id, name, prices: [chf(price)], src: { pdf: "desserts", page: 2 }, ...(desc ? { desc } : {}) });
const NOVELTIES: Item[] = [
  frisco("maxibon-pops", same("Maxibon Pops"), 4.5),
  frisco("hello-kitty", same("Hello Kitty Sandwich"), 4),
  frisco("smarties-cornet", same("Smarties Cornet"), 3, same("Smarties")),
  frisco("cool-lemon", same("Cool Lemon"), 3, same("Cool Lemon")),
  frisco("teddy-boy", same("Teddy Boy"), 5.5, t("Erdbeer", "Strawberry", "Fraise", "Fragola")),
  frisco("smiley-oreo", same("Coupe Smiley Oreo"), 5.5, t("Cremige Glace mit echten Oreo-Stücken", "Creamy ice cream with real Oreo pieces", "Glace crémeuse aux vrais morceaux d’Oreo", "Gelato cremoso con veri pezzi di Oreo")),
  frisco("dinos", same("Dino’s"), 8, t("Vanille mit Schokoladensauce, Tässchen zum Sammeln", "Vanilla with chocolate sauce, in a collectable cup", "Vanille et sauce chocolat, petite tasse à collectionner", "Vaniglia con salsa al cioccolato, tazzina da collezione")),
  frisco("wonder-bibi", same("Wonder-Bibi"), 7, t("Stracciatella, Wonder-Bibi zum Mitnehmen", "Stracciatella, Wonder-Bibi to take home", "Stracciatella, Wonder-Bibi à emporter", "Stracciatella, Wonder-Bibi da portare a casa")),
];
const FRAPPE: Item = { id: "frappe", name: same("Frappé"), desc: t("Aroma nach Wahl", "flavour of your choice", "arôme au choix", "gusto a scelta"), prices: [chf(9)], src: { pdf: "desserts", page: 1 } };
const flavourNotes = [
  t(`Preis pro Kugel CHF 4.00 · Zuschlag frischer Rahm CHF 1.50`, `Per scoop CHF 4.00 · fresh whipped cream CHF 1.50 extra`, `Prix par boule CHF 4.00 · supplément crème fraîche CHF 1.50`, `Prezzo per pallina CHF 4.00 · supplemento panna fresca CHF 1.50`),
];

// ---------------------------------------------------------------------------------------------------------------
// DESSERTKARTE
const coupe = (id: string, name: string, price: number | Price[], desc?: T, extra: Partial<Item> = {}): Item => ({
  id,
  name: same(name),
  prices: typeof price === "number" ? [chf(price)] : price,
  src: { pdf: "desserts", page: 1 },
  ...(desc ? { desc } : {}),
  ...extra,
});
const VS = t("Vanille mit Schokoladensauce", "vanilla with chocolate sauce", "vanille et sauce chocolat", "vaniglia con salsa al cioccolato");
const desserts: Menu = {
  id: "desserts",
  title: t("Dessertkarte", "Desserts", "Carte des desserts", "Dessert"),
  kicker: t("Coupes · Sorbets mit Schuss · Panna Cotta · Glace", "Sundaes · Spiked sorbets · Panna cotta · Ice cream", "Coupes · Sorbets arrosés · Panna cotta · Glaces", "Coppe · Sorbetti corretti · Panna cotta · Gelati"),
  pdf: { href: pdfHref("Dessertkarte.pdf", MENU_PDF_LIVE.desserts), file: "Dessertkarte.PDF", bytes: 2805601, pages: 2 },
  sections: [
    {
      id: "coupes",
      title: t("Coupes & Desserts", "Sundaes & desserts", "Coupes & desserts", "Coppe e dessert"),
      groups: [
        {
          id: "coupes",
          items: [
            coupe("banana-split", "Banana Split", 12.9, VS),
            coupe("danemark", "Danemark", 12.9, VS),
            coupe("caramelo", "Caramelo", 12.5, t("Vanille, Caramel", "vanilla, caramel", "vanille, caramel", "vaniglia, caramello")),
            coupe("ballerina", "Ballerina", 9.5, t("Caramel, Stracciatella", "caramel, stracciatella", "caramel, stracciatella", "caramello, stracciatella")),
            coupe("suisse", "Suisse", 12.5, t("Vanille, Baumnuss, Chocolat", "vanilla, walnut, chocolate", "vanille, noix, chocolat", "vaniglia, noce, cioccolato")),
            coupe("jazz-dance", "Jazz Dance", 12.5, t("Stracciatella, Mocca", "stracciatella, mocha", "stracciatella, moka", "stracciatella, moka")),
            coupe("cassandra", "Cassandra", 9.5, t("Himbeer, Baumnuss", "raspberry, walnut", "framboise, noix", "lampone, noce")),
            coupe("murano", "Murano", 9.5, t("Vanille, Pistache", "vanilla, pistachio", "vanille, pistache", "vaniglia, pistacchio")),
            FRAPPE,
            coupe("petit-dessert", "Petit Dessert", 6, same("Stracciatella")),
            coupe("chocamo", "Chocamo", 9.8, t("Chocolat, Caramelissimo, Mocca", "chocolate, Caramelissimo, mocha", "chocolat, Caramelissimo, moka", "cioccolato, Caramelissimo, moka")),
            coupe("cassata", "Cassata Sicilienne", [chf(11, undefined, t("mit Maraschino", "with Maraschino", "au marasquin", "con maraschino")), chf(8, undefined, t("ohne Maraschino", "without Maraschino", "sans marasquin", "senza maraschino"))]),
            coupe("framboise", "Framboise", 13.9, t("Vanille mit Himbeeren", "vanilla with raspberries", "vanille et framboises", "vaniglia con lamponi")),
            coupe("love-tango", "Love Tango", 9.5, t("Chocolat, Erdbeer", "chocolate, strawberry", "chocolat, fraise", "cioccolato, fragola")),
            coupe("dulcinea", "Dulcinea", 10.5, t("Vanille mit Caramelsauce", "vanilla with caramel sauce", "vanille et sauce caramel", "vaniglia con salsa al caramello")),
            coupe("cafe-glace", "Café Glace", 10.5, t("Mocca", "mocha", "moka", "moka")),
            coupe("bahia", "Bahia", 12.5, t("Banane, Chocolat", "banana, chocolate", "banane, chocolat", "banana, cioccolato")),
            coupe("chocobello", "Chocobello", 10.5, t("Chocolat, Stracciatella", "chocolate, stracciatella", "chocolat, stracciatella", "cioccolato, stracciatella")),
            coupe("tartufo", "Tartufo Cioccolato", 9, t("Chocolat-Sabayon-Rahmglace, mit Kakao gepudert", "chocolate and sabayon cream ice, dusted with cocoa", "glace à la crème chocolat-sabayon, saupoudrée de cacao", "gelato alla panna cioccolato e zabaione, spolverato di cacao")),
            coupe("mini-latte", "Mini Dessert Latte Macchiato", 6.5),
            coupe("fondant", "Fondant au Chocolat", 12, t("Bananen-Glace", "with banana ice cream", "glace banane", "con gelato alla banana")),
          ],
        },
        {
          id: "mit-schuss",
          title: t("Mit Schuss", "With a dash of spirit", "Arrosés", "Corretti"),
          items: [
            coupe("le-valaisan", "Le Valaisan", 14, t("Sorbet Aprikose mit Abricotine", "apricot sorbet with Abricotine", "sorbet abricot à l’Abricotine", "sorbetto all’albicocca con Abricotine")),
            coupe("slop", "Slop", 13, t("Sorbet Himbeer mit Himbeerlikör", "raspberry sorbet with raspberry liqueur", "sorbet framboise à la liqueur de framboise", "sorbetto al lampone con liquore al lampone")),
            coupe("le-colonel", "Le Colonel", 13, t("Sorbet Citron mit Wodka", "lemon sorbet with vodka", "sorbet citron à la vodka", "sorbetto al limone con vodka")),
            coupe("general", "General", 13, t("Vanille mit Whisky", "vanilla with whisky", "vanille au whisky", "vaniglia con whisky")),
            coupe("baileys-coupe", "Baileys", 14, t("Mocca, Vanille mit Baileys", "mocha, vanilla with Baileys", "moka, vanille au Baileys", "moka, vaniglia con Baileys")),
          ],
        },
        {
          id: "hausgemacht",
          title: t("Hausgemacht", "Homemade", "Fait maison", "Fatto in casa"),
          items: [coupe("panna-cotta", "Panna Cotta", 9.5, t("hausgemacht", "homemade", "maison", "fatta in casa"), { tags: ["homemade"] })],
        },
      ],
      notes: [t("Mocca enthält Haselnuss.", "Mocha contains hazelnut.", "Le moka contient de la noisette.", "Il moka contiene nocciola.")],
    },
    {
      id: "glace-kugeln",
      title: t("Glace nach Kugeln", "Ice cream by the scoop", "Glace à la boule", "Gelato a palline"),
      flavours: true,
      groups: [{ id: "sorten", items: FLAVOURS }],
      notes: flavourNotes,
    },
    {
      id: "frisco",
      title: t("Glace am Stiel & im Becher", "Ice lollies & tubs", "Glaces bâtonnets & pots", "Gelati su stecco e in coppetta"),
      groups: [{ id: "frisco", items: NOVELTIES }],
    },
  ],
  footnotes: [
    t("Alle Preise in CHF, inkl. MwSt.", "All prices in CHF, VAT included.", "Tous les prix en CHF, TVA comprise.", "Tutti i prezzi in CHF, IVA inclusa."),
    t("Vegan laut Dessertkarte: Sorbets Aprikose, Citron und Himbeer.", "Vegan according to the dessert menu: apricot, lemon and raspberry sorbets.", "Végane selon la carte des desserts : sorbets abricot, citron et framboise.", "Vegano secondo la carta dei dessert: sorbetti all’albicocca, al limone e al lampone."),
  ],
};

// ---------------------------------------------------------------------------------------------------------------
// KIDS
const kid = (id: string, name: string, price: number, desc?: T): Item => ({ id, name: same(name), prices: [chf(price)], src: { pdf: "kids", page: 1 }, ...(desc ? { desc } : {}) });
const kids: Menu = {
  id: "kids",
  title: t("Kids World", "Kids World", "Kids World", "Kids World"),
  kicker: t("Für unsere kleinen Gäste", "For our youngest guests", "Pour nos petits hôtes", "Per i nostri piccoli ospiti"),
  pdf: { href: pdfHref("Speisekarte-Kids.pdf", MENU_PDF_LIVE.kids), file: "Speisekarte_Kids.pdf", bytes: 2418796, pages: 2 },
  sections: [
    {
      id: "kinder-essen",
      title: t("Für kleine Gäste", "For young guests", "Pour les petits", "Per i più piccoli"),
      groups: [
        {
          id: "kinder",
          items: [
            { id: "kindersalat", name: t("Kindersalat", "Kids’ salad", "Salade pour enfants", "Insalata per bambini"), prices: [chf(6)], src: { pdf: "kids", page: 1 } },
            kid("mini-pizza", "Mini Pizza", 15, same("Pizza Margherita")),
            kid("junior", "Junior", 14, t("Spaghetti mit Tomatensauce", "Spaghetti with tomato sauce", "Spaghettis à la sauce tomate", "Spaghetti al pomodoro")),
            kid("meister-manny", "Meister Manny", 16, t("Paniertes Schnitzel mit Pommes Frites", "Breaded schnitzel with French fries", "Escalope panée et pommes frites", "Cotoletta impanata con patatine fritte")),
            { id: "pommes", name: t("Pommes Frites", "French fries", "Pommes frites", "Patatine fritte"), desc: t("Pommes Frites mit Ketchup", "French fries with ketchup", "Pommes frites avec ketchup", "Patatine fritte con ketchup"), prices: [chf(9.5)], src: { pdf: "kids", page: 1 } },
            kid("sponge-bob", "Sponge-Bob", 15, t("Fisch-Sticks mit Pommes Frites", "Fish fingers with French fries", "Bâtonnets de poisson et pommes frites", "Bastoncini di pesce con patatine fritte")),
            kid("simpsons", "Simpsons", 15, t("Wienerli mit Pommes Frites", "Wienerli sausages with French fries", "Saucisses de Vienne et pommes frites", "Würstel con patatine fritte")),
            kid("crazy-chicken", "Crazy Chicken", 16, t("Chicken Nuggets mit Pommes Frites", "Chicken nuggets with French fries", "Nuggets de poulet et pommes frites", "Nuggets di pollo con patatine fritte")),
          ],
        },
      ],
    },
    {
      id: "kinder-glace",
      title: t("Glace", "Ice cream", "Glaces", "Gelati"),
      groups: [{ id: "kinder-glace", items: [...NOVELTIES.slice(0, 2), NOVELTIES[3], FRAPPE, NOVELTIES[2], NOVELTIES[4], NOVELTIES[6], NOVELTIES[5], NOVELTIES[7]] }],
    },
    {
      id: "kinder-kugeln",
      title: t("Glace nach Kugeln", "Ice cream by the scoop", "Glace à la boule", "Gelato a palline"),
      flavours: true,
      // the kids leaflet prints the same flavours without the VEGAN marker of the dessert menu
      groups: [{ id: "kinder-sorten", items: FLAVOURS.map((f) => ({ ...f, tags: f.tags?.filter((tg) => tg !== "vegan") })) }],
      notes: flavourNotes,
    },
  ],
  footnotes: [t("Alle Preise in CHF, inkl. MwSt.", "All prices in CHF, VAT included.", "Tous les prix en CHF, TVA comprise.", "Tutti i prezzi in CHF, IVA inclusa.")],
};

export const MENUS: Menu[] = [food, drinks, desserts, kids];
export const menuById = (id: MenuId) => MENUS.find((m) => m.id === id)!;

/** Markers that can be used as filters, with the wording that explains where they come from. */
export const TAG_INFO: Record<Tag, { label: T; hint: T }> = {
  homemade: { label: t("Hausgemacht", "Homemade", "Fait maison", "Fatto in casa"), hint: t("laut Karte hausgemacht", "homemade according to the menu", "fait maison selon la carte", "fatto in casa secondo il menù") },
  spicy: { label: t("Pikant", "Spicy", "Relevé", "Piccante"), hint: t("scharf, mit Chili oder scharfer Salami", "hot, with chilli or spicy salami", "piquant, avec piment ou salami piquant", "piccante, con peperoncino o salame piccante") },
  "swiss-meat": { label: t("Fleisch aus der Schweiz", "Swiss meat", "Viande suisse", "Carne svizzera"), hint: t("Herkunft CH laut Karte", "origin CH according to the menu", "origine CH selon la carte", "origine CH secondo il menù") },
  "australian-meat": { label: t("Fleisch aus Australien", "Australian meat", "Viande d’Australie", "Carne australiana"), hint: t("Herkunft AUS laut Karte", "origin AUS according to the menu", "origine AUS selon la carte", "origine AUS secondo il menù") },
  dyhrberg: { label: t("Fisch von Dyhrberg", "Fish from Dyhrberg", "Poisson Dyhrberg", "Pesce Dyhrberg"), hint: t("mit Dyhrberg-Logo auf der Karte", "marked with the Dyhrberg logo", "marqué du logo Dyhrberg", "segnato con il logo Dyhrberg") },
  vegan: { label: t("Vegan", "Vegan", "Végane", "Vegano"), hint: t("laut Dessertkarte", "according to the dessert menu", "selon la carte des desserts", "secondo la carta dei dessert") },
  hazelnut: { label: t("Enthält Haselnuss", "Contains hazelnut", "Contient de la noisette", "Contiene nocciola"), hint: t("Mocca enthält Haselnuss", "mocha contains hazelnut", "le moka contient de la noisette", "il moka contiene nocciola") },
};
/** Filters over printed markers only; no dietary filter (vegan, gluten-free …), since no verified data supports one (BRIEF §4). */
export const FILTER_TAGS: Tag[] = ["homemade", "swiss-meat", "dyhrberg"];

/** Spelling fixes made while transcribing (printed → shown). */
export const MENU_CORRECTIONS: { menu: MenuId; page: number; printed: string; shown: string; why: string }[] = [
  { menu: "food", page: 1, printed: "Assiette Méditerranée", shown: "Assiette méditerranéenne", why: "French adjective" },
  { menu: "food", page: 1, printed: "Assiette de Fromage Rebibe", shown: "Assiette de rebibes «Badner Alpen»", why: "French plural; the German name «Badner Alpen» was missing in French" },
  { menu: "food", page: 2, printed: "peperonis (FR)", shown: "poivrons", why: "French word for Peperoni (bell peppers)" },
  { menu: "food", page: 3, printed: "Calzone (zugedeckt/ fermé)", shown: "Calzone (zugedeckt) / (fermée)", why: "one language per line" },
  { menu: "food", page: 4, printed: "huile de truffes, tranche de viande séchée", shown: "huile de truffe, tranches de viande séchée", why: "French grammar" },
  { menu: "food", page: 4, printed: "mais (FR)", shown: "maïs", why: "French spelling" },
  { menu: "food", page: 4, printed: "demie portion (FR)", shown: "petite portion", why: "the German says «kleine Portion» (small portion)" },
  { menu: "food", page: 4, printed: "tomates cerise", shown: "tomates cerises", why: "French plural" },
  { menu: "food", page: 5, printed: "a la sauce tomates", shown: "à la sauce tomate", why: "French spelling" },
  { menu: "food", page: 5, printed: "flambés (crevettes)", shown: "flambées", why: "French agreement" },
  { menu: "food", page: 5, printed: "Ruccola", shown: "Rucola", why: "same spelling as everywhere else on the menu" },
  { menu: "food", page: 5, printed: "à la bolognese (viande de boeuf)", shown: "Penne bolognaise, viande de bœuf", why: "French spelling" },
  { menu: "food", page: 6, printed: "„Saltim Bocca“", shown: "«Saltimbocca»", why: "usual spelling, as on the French line" },
  { menu: "food", page: 6, printed: "Poitrine de poulet … (FR line without ham and sage)", shown: "au jambon cru et à la sauge", why: "completed from the German line" },
  { menu: "food", page: 6, printed: "amplificateurs de performance", shown: "stimulateurs de performance", why: "French term" },
  { menu: "drinks", page: 1, printed: "Hollunderblüte", shown: "Holunderblüte", why: "German spelling" },
  { menu: "drinks", page: 2, printed: "Coca Cola", shown: "Coca-Cola", why: "brand spelling" },
  { menu: "drinks", page: 2, printed: "Aqua Panna San Pellegrino", shown: "Acqua Panna", why: "brand spelling" },
  { menu: "drinks", page: 2, printed: "Fusetea", shown: "Fuze Tea", why: "brand spelling" },
  { menu: "drinks", page: 3, printed: "Vins blanc / rosé / rouge du Valais", shown: "Vins blancs / rosés / rouges du Valais", why: "French plural" },
  { menu: "drinks", page: 3, printed: "Maitre de Chais", shown: "Maître de Chais", why: "French spelling" },
  { menu: "drinks", page: 3, printed: "Pinot-Noir", shown: "Pinot Noir", why: "usual spelling" },
  { menu: "drinks", page: 4, printed: "Gran Sasso, Pulia", shown: "Gran Sasso, Puglia", why: "Italian region name" },
  { menu: "drinks", page: 5, printed: "Maroccan Mint", shown: "Moroccan Mint", why: "tea name" },
  { menu: "drinks", page: 6, printed: "Ramazotti", shown: "Ramazzotti", why: "brand spelling" },
  { menu: "drinks", page: 6, printed: "Grand-Marnier", shown: "Grand Marnier", why: "brand spelling" },
  { menu: "drinks", page: 6, printed: "Crème Brulée Fassbind", shown: "Crème Brûlée Fassbind", why: "French spelling" },
  { menu: "drinks", page: 6, printed: "Brandy Vecchina Romagna", shown: "Brandy Vecchia Romagna", why: "brand spelling" },
];

/** Open points for the restaurant – shown nowhere on the site, listed in HANDOFF.md. */
export const MENU_REVIEW: { id: string; question: string }[] = [
  { id: "salat-bueffet", question: "«Gemischter Salat vom Büffet» shows two prices (CHF 12.00 and CHF 21.50) without labels. Are these a small and a large plate? The site shows both prices as printed." },
  { id: "hugo-grapefrizz", question: "«Hugo Sprizz, Grapefr’izz» is one line with one price (CHF 11.50, 17 % vol). Is that the price of each of the two drinks?" },
  { id: "sirup-kids", question: "«Sirup Kids»: CHF 1.00 for 2 dl and CHF 3.00 for 3 dl, as printed. Please confirm." },
  { id: "kaffee-giardino", question: "«Kaffee GIARDINO» and «Alpen Glüh» have no description on the menu. A short description could be added." },
  { id: "fleisch", question: "The food menu prints «Servieren wir von 11.30 bis 14.00 und von 17.00 bis 21.00 Uhr» for the meat dishes; the website says «Warme Küche von 11:30 bis 15:00 Uhr und 17:00 bis 21:30 Uhr». The website is the source for hours, so the menu line is not shown. Are the meat-course hours still valid, and should they be shown?" },
  { id: "kids-vegan", question: "The dessert menu marks the apricot, lemon and raspberry sorbets VEGAN; the kids leaflet lists the same flavours without the mark. The site shows the mark on the dessert menu only. Are the sorbets vegan in both cases?" },
  { id: "ice-tee-rivella", question: "«Hausgemachter Ice Tee» (3 dl, 5 dl), «Rivella rot» (3 dl, 1 l) and «Rivella blau» (3 dl) fill only part of the size matrix of their page. The site shows the printed prices; are other sizes available?" },
  { id: "markers", question: "Only printed markers are shown: «Hausgemacht», origin (CH / AUS), Dyhrberg fish, VEGAN on three sorbets and «Mocca – enthält Haselnuss». Coupes that contain Mocca ice cream are not marked; no spicy or dietary markers are derived from descriptions." },
  { id: "gluten", question: "The website title calls Giardino a «Glutenfreie Pizzeria» and shows the IG Zöliakie «ohne Gluten» logo (2014), but no menu marks gluten-free dishes. Which dishes can be served gluten-free, and is the 2014 certification still valid?" },
  { id: "allergens", question: "No menu lists allergens per dish (besides «Mocca enthält Haselnuss»). Guests are asked to tell the service team, as on the printed menu." },
];
