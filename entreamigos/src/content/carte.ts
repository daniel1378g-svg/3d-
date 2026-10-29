// La carte: names, prices, units, French descriptions and notes come verbatim from content/menu.json (extracted
// from the live page by scripts/extract_menu.py); this file adds the translations, the filter tags and the photos.
import live from "@content/menu.json";
import type { L, Lang } from "@/i18n";

const l = (fr: string, en: string, pt: string, it: string, de: string): L => ({ fr, en, pt, it, de });
export type Side = "viande" | "poisson" | "tout";

/** Section titles: the live French title, the visitor's language below. */
export const SECTION_TITLES: Record<string, { local: L; short: L }> = {
  entrees: { local: l("Entrées", "Starters", "Entradas", "Antipasti", "Vorspeisen"), short: l("Entrées", "Starters", "Entradas", "Antipasti", "Vorspeisen") },
  specialites: { local: l("Spécialités de la maison", "House specialities", "Especialidades da casa", "Specialità della casa", "Spezialitäten des Hauses"), short: l("Spécialités", "Specialities", "Especialidades", "Specialità", "Spezialitäten") },
  viandes: { local: l("Viandes", "Meat", "Carnes", "Carni", "Fleisch"), short: l("Viandes", "Meat", "Carnes", "Carni", "Fleisch") },
  poissons: { local: l("Poissons - Fruits de mer - Crustacés", "Fish, seafood and shellfish", "Peixe, marisco e crustáceos", "Pesce, frutti di mare e crostacei", "Fisch, Meeresfrüchte und Krustentiere"), short: l("Poissons", "Fish", "Peixe", "Pesce", "Fisch") },
  pates: { local: l("Pâtes", "Pasta", "Massas", "Pasta", "Teigwaren"), short: l("Pâtes", "Pasta", "Massas", "Pasta", "Pasta") },
  fondues: { local: l("Fondues", "Fondues", "Fondues", "Fonduta", "Fondues"), short: l("Fondues", "Fondues", "Fondues", "Fondute", "Fondues") },
  enfants: { local: l("Menus enfants", "Kids’ menus", "Menus infantis", "Menu bambini", "Kindermenüs"), short: l("Enfants", "Kids", "Crianças", "Bambini", "Kinder") },
  commande: { local: l("Sur commande pour minimum 10 personnes", "To order, for at least 10 people", "Por encomenda, mínimo 10 pessoas", "Su ordinazione, minimo 10 persone", "Auf Bestellung, ab 10 Personen"), short: l("Sur commande", "Pre-order", "Encomenda", "Su ordinazione", "Bestellung") },
  desserts: { local: l("Desserts", "Desserts", "Sobremesas", "Dolci", "Desserts"), short: l("Desserts", "Desserts", "Sobremesas", "Dolci", "Desserts") },
  coupes: { local: l("Coupes de glaces", "Ice-cream sundaes", "Taças de gelado", "Coppe di gelato", "Glacecoupes"), short: l("Coupes", "Sundaes", "Taças", "Coppe", "Coupes") },
  boules: { local: l("Boules de glaces", "Ice-cream scoops", "Bolas de gelado", "Palline di gelato", "Glacekugeln"), short: l("Boules", "Scoops", "Bolas", "Palline", "Kugeln") },
};

/** The section notes as the live page writes them, translated. */
export const NOTE_L: Record<string, Omit<L, "fr">> = {
  "Accompagnements : Frites, Pommes de terre au four, Riz, Pâtes et Légumes du jour": { en: "Sides: fries, oven potatoes, rice, pasta and vegetables of the day", pt: "Acompanhamentos: batatas fritas, batatas no forno, arroz, massa e legumes do dia", it: "Contorni: patatine, patate al forno, riso, pasta e verdure del giorno", de: "Beilagen: Pommes frites, Ofenkartoffeln, Reis, Teigwaren und Tagesgemüse" },
  "Origine des viandes : Suisse, Portugal, Brésil, Argentine": { en: "Origin of the meat: Switzerland, Portugal, Brazil, Argentina", pt: "Origem das carnes: Suíça, Portugal, Brasil, Argentina", it: "Origine delle carni: Svizzera, Portogallo, Brasile, Argentina", de: "Herkunft des Fleisches: Schweiz, Portugal, Brasilien, Argentinien" },
  "Origine des poissons, fruits de mer et crustacés : Estonie, Sri Lanka, Norvège": { en: "Origin of the fish, seafood and shellfish: Estonia, Sri Lanka, Norway", pt: "Origem do peixe, marisco e crustáceos: Estónia, Sri Lanka, Noruega", it: "Origine di pesce, frutti di mare e crostacei: Estonia, Sri Lanka, Norvegia", de: "Herkunft von Fisch, Meeresfrüchten und Krustentieren: Estland, Sri Lanka, Norwegen" },
};
export const WAIT_L = l("Délai d'attente : 30 min.", "Waiting time: 30 min.", "Tempo de espera: 30 min.", "Tempo di attesa: 30 min.", "Wartezeit: 30 Min.");
export const UNIT_L: Record<string, L> = {
  pièce: l("pièce", "piece", "unidade", "pezzo", "Stück"),
  "par personne": l("par personne", "per person", "por pessoa", "a persona", "pro Person"),
  boule: l("boule", "scoop", "bola", "pallina", "Kugel"),
};

/** Descriptions in the other languages (French is the live text). */
const DESC: Record<string, Omit<L, "fr">> = {
  "Grillades de poulet, travers de porc, poitrine de porc": { en: "Grilled chicken, pork ribs, pork belly", pt: "Frango, entrecosto e entremeada grelhados", it: "Grigliata di pollo, costine e pancetta di maiale", de: "Grilliertes Poulet, Schweinsrippchen, Schweinebauch" },
  "Steak de boeuf, oeuf, frites et riz": { en: "Beef steak, egg, fries and rice", pt: "Bife de vaca, ovo, batatas fritas e arroz", it: "Bistecca di manzo, uovo, patatine e riso", de: "Rindssteak, Ei, Pommes frites und Reis" },
  "Viande de porc coupée finement, mijotée en sauce": { en: "Thinly sliced pork, simmered in sauce", pt: "Carne de porco fatiada fina, estufada em molho", it: "Carne di maiale a fettine sottili, stufata in salsa", de: "Fein geschnittenes Schweinefleisch, in Sauce geschmort" },
  "Cochon ibérique grillé avec une sauce à l’ail": { en: "Grilled Iberian pork with a garlic sauce", pt: "Porco ibérico grelhado com molho de alho", it: "Maiale iberico alla griglia con salsa all’aglio", de: "Grilliertes Iberico-Schwein mit Knoblauchsauce" },
  "Toast, fromage, saucisson fin, saucisse, viande de boeuf, jambon, fromage, oeuf, frites": { en: "Toast, cheese, thin sausage, sausage, beef, ham, cheese, egg, fries", pt: "Tosta, queijo, linguiça fina, salsicha, carne de vaca, fiambre, queijo, ovo, batatas fritas", it: "Toast, formaggio, salamino, salsiccia, manzo, prosciutto, formaggio, uovo, patatine", de: "Toast, Käse, feine Wurst, Würstchen, Rindfleisch, Schinken, Käse, Ei, Pommes frites" },
  "Toast, fromage, saucisson fin, saucisse, viande de boeuf, jambon, fromage, oeuf": { en: "Toast, cheese, thin sausage, sausage, beef, ham, cheese, egg", pt: "Tosta, queijo, linguiça fina, salsicha, carne de vaca, fiambre, queijo, ovo", it: "Toast, formaggio, salamino, salsiccia, manzo, prosciutto, formaggio, uovo", de: "Toast, Käse, feine Wurst, Würstchen, Rindfleisch, Schinken, Käse, Ei" },
  "Aiguillette de boeuf grillée, haricots noirs, riz et frites": { en: "Grilled rump cap of beef, black beans, rice and fries", pt: "Picanha de vaca grelhada, feijão preto, arroz e batatas fritas", it: "Punta di manzo alla griglia, fagioli neri, riso e patatine", de: "Grillierter Tafelspitz vom Rind, schwarze Bohnen, Reis und Pommes frites" },
  "Pavé de boeuf 300 gr., frites, légumes": { en: "300 g beef steak, fries, vegetables", pt: "Naco de vaca de 300 g, batatas fritas, legumes", it: "Trancio di manzo da 300 g, patatine, verdure", de: "Rindssteak 300 g, Pommes frites, Gemüse" },
  "Gambas décortiquées, à l'ail et à la sauce tomate": { en: "Peeled prawns with garlic and tomato sauce", pt: "Gambas descascadas, com alho e molho de tomate", it: "Gamberi sgusciati all’aglio e salsa di pomodoro", de: "Geschälte Gambas mit Knoblauch und Tomatensauce" },
  "Calamares panés, sauce tartare et frites": { en: "Breaded squid, tartare sauce and fries", pt: "Lulas panadas, molho tártaro e batatas fritas", it: "Calamari impanati, salsa tartara e patatine", de: "Panierte Calamares, Tatarensauce und Pommes frites" },
  "Morue frite : huile d'olive, poivrons, oignons.": { en: "Fried salt cod: olive oil, peppers, onions.", pt: "Bacalhau frito: azeite, pimentos, cebola.", it: "Baccalà fritto: olio d’oliva, peperoni, cipolle.", de: "Gebratener Stockfisch: Olivenöl, Peperoni, Zwiebeln." },
  "Morue grillée au four : huile d'olive et ail.": { en: "Oven-grilled salt cod: olive oil and garlic.", pt: "Bacalhau assado no forno: azeite e alho.", it: "Baccalà grigliato al forno: olio d’oliva e aglio.", de: "Im Ofen grillierter Stockfisch: Olivenöl und Knoblauch." },
  "Poulpe grillé au four : huile d'olive, et ail.": { en: "Oven-grilled octopus: olive oil and garlic.", pt: "Polvo assado no forno: azeite e alho.", it: "Polpo grigliato al forno: olio d’oliva e aglio.", de: "Im Ofen grillierter Oktopus: Olivenöl und Knoblauch." },
  "Poulpe cuit à la vapeur : huile d'olive, vinaigre, oignons, persil et paprika doux": { en: "Steamed octopus: olive oil, vinegar, onions, parsley and sweet paprika", pt: "Polvo cozido a vapor: azeite, vinagre, cebola, salsa e colorau doce", it: "Polpo al vapore: olio d’oliva, aceto, cipolle, prezzemolo e paprika dolce", de: "Gedämpfter Oktopus: Olivenöl, Essig, Zwiebeln, Petersilie und süsser Paprika" },
  "Poulpe cuit à la vapeur : huile d'olive, gros sel et paprika doux": { en: "Steamed octopus: olive oil, coarse salt and sweet paprika", pt: "Polvo cozido a vapor: azeite, sal grosso e colorau doce", it: "Polpo al vapore: olio d’oliva, sale grosso e paprika dolce", de: "Gedämpfter Oktopus: Olivenöl, grobes Salz und süsser Paprika" },
  "Tagliatelle / Spaghetti / Penne": { en: "Tagliatelle / spaghetti / penne", pt: "Tagliatelle / esparguete / penne", it: "Tagliatelle / spaghetti / penne", de: "Tagliatelle / Spaghetti / Penne" },
  "Gnocchi au gorgonzola": { en: "Gnocchi with gorgonzola", pt: "Gnocchi com gorgonzola", it: "Gnocchi al gorgonzola", de: "Gnocchi mit Gorgonzola" },
  "Gnocchi à la sauce tomate": { en: "Gnocchi in tomato sauce", pt: "Gnocchi com molho de tomate", it: "Gnocchi al pomodoro", de: "Gnocchi mit Tomatensauce" },
  "Saucisse de veau grillée avec frites": { en: "Grilled veal sausage with fries", pt: "Salsicha de vitela grelhada com batatas fritas", it: "Salsiccia di vitello alla griglia con patatine", de: "Grillierte Kalbsbratwurst mit Pommes frites" },
  "Poulet grillé avec frites": { en: "Grilled chicken with fries", pt: "Frango grelhado com batatas fritas", it: "Pollo alla griglia con patatine", de: "Grilliertes Poulet mit Pommes frites" },
  "Nuggets et frites": { en: "Nuggets and fries", pt: "Nuggets e batatas fritas", it: "Nuggets e patatine", de: "Nuggets und Pommes frites" },
  "Spaghetti Carbonara / Bolognaise": { en: "Spaghetti carbonara / bolognese", pt: "Esparguete à carbonara / à bolonhesa", it: "Spaghetti alla carbonara / alla bolognese", de: "Spaghetti Carbonara / Bolognese" },
  "Cochon de lait": { en: "Suckling pig", pt: "Leitão", it: "Maialino da latte", de: "Spanferkel" },
  "Cabri au four": { en: "Oven-roasted kid", pt: "Cabrito no forno", it: "Capretto al forno", de: "Zicklein aus dem Ofen" },
  "Pot-au-feu": { en: "Boiled meats and vegetables", pt: "Cozido", it: "Bollito misto", de: "Siedfleisch mit Gemüse" },
  "Cassoulet Portugais": { en: "Portuguese bean stew", pt: "Feijoada portuguesa", it: "Stufato portoghese di fagioli", de: "Portugiesischer Bohneneintopf" },
  "Veau au four": { en: "Oven-roasted veal", pt: "Vitela no forno", it: "Vitello al forno", de: "Kalbsbraten aus dem Ofen" },
  "Avec boule de glace au choix": { en: "With a scoop of ice cream of your choice", pt: "Com bola de gelado à escolha", it: "Con pallina di gelato a scelta", de: "Mit einer Kugel Glace nach Wahl" },
  "Glaces Vanille, Pistache, Sorbet Mangue": { en: "Vanilla and pistachio ice cream, mango sorbet", pt: "Gelados de baunilha e pistácio, sorvete de manga", it: "Gelati vaniglia e pistacchio, sorbetto al mango", de: "Glace Vanille und Pistazie, Mangosorbet" },
  "Glaces Vanille, Fraise, Sorbet citron": { en: "Vanilla and strawberry ice cream, lemon sorbet", pt: "Gelados de baunilha e morango, sorvete de limão", it: "Gelati vaniglia e fragola, sorbetto al limone", de: "Glace Vanille und Erdbeere, Zitronensorbet" },
  "Glaces Stracciatella, Vanille, Mocca": { en: "Stracciatella, vanilla and mocha ice cream", pt: "Gelados de stracciatella, baunilha e moca", it: "Gelati stracciatella, vaniglia e moka", de: "Glace Stracciatella, Vanille, Mokka" },
  "Glaces Caramelissimo, Mocca, Chocolat": { en: "Caramelissimo, mocha and chocolate ice cream", pt: "Gelados de caramelissimo, moca e chocolate", it: "Gelati caramelissimo, moka e cioccolato", de: "Glace Caramelissimo, Mokka, Schokolade" },
  "Sorbet Citron arrosé de Vodka": { en: "Lemon sorbet laced with vodka", pt: "Sorvete de limão regado com vodka", it: "Sorbetto al limone con vodka", de: "Zitronensorbet mit Wodka" },
  "Sorbet Abricot arrosé d'Abricotine": { en: "Apricot sorbet laced with Abricotine", pt: "Sorvete de alperce regado com Abricotine", it: "Sorbetto all’albicocca con Abricotine", de: "Aprikosensorbet mit Abricotine" },
  "Sorbet Williams arrosé de Williamine": { en: "Williams pear sorbet laced with Williamine", pt: "Sorvete de pera Williams regado com Williamine", it: "Sorbetto alla pera Williams con Williamine", de: "Williamssorbet mit Williamine" },
  "Glace Vanille arrosée de Whisky": { en: "Vanilla ice cream laced with whisky", pt: "Gelado de baunilha regado com whisky", it: "Gelato alla vaniglia con whisky", de: "Vanilleglace mit Whisky" },
  "Mocca et Noisettes croquantes, Chocolat, Vanille, Stracciatella, Pistache, Caramellissimo, Fraise": { en: "Mocha and crunchy hazelnut, chocolate, vanilla, stracciatella, pistachio, caramellissimo, strawberry", pt: "Moca e avelã crocante, chocolate, baunilha, stracciatella, pistácio, caramellissimo, morango", it: "Moka e nocciole croccanti, cioccolato, vaniglia, stracciatella, pistacchio, caramellissimo, fragola", de: "Mokka mit knackigen Haselnüssen, Schokolade, Vanille, Stracciatella, Pistazie, Caramellissimo, Erdbeere" },
  "Poire Williams, Citron, Abricots, Mangue": { en: "Williams pear, lemon, apricot, mango", pt: "Pera Williams, limão, alperce, manga", it: "Pera Williams, limone, albicocca, mango", de: "Williamsbirne, Zitrone, Aprikose, Mango" },
};

/** The kids' menus are French jokes: the names stay French, the joke is translated below. */
export const KIDS_JOKE: Record<string, L> = {
  "JE NE SAIS PAS": l("« Je ne sais pas »", "“I don’t know”", "«Não sei»", "«Non lo so»", "«Ich weiss nicht»"),
  "JE N'AI PAS FAIM": l("« Je n’ai pas faim »", "“I’m not hungry”", "«Não tenho fome»", "«Non ho fame»", "«Ich habe keinen Hunger»"),
  "JE M'EN FICHE": l("« Je m’en fiche »", "“I don’t care”", "«Tanto me faz»", "«Me ne frego»", "«Ist mir egal»"),
  "PEU IMPORTE": l("« Peu importe »", "“Whatever”", "«Tanto faz»", "«Fa lo stesso»", "«Egal»"),
};

/** Photos, only where the dish can be seen (listed in the hand-off for the owner to check). */
export const DISH_PHOTOS: Record<string, string> = {
  "Accras de morue": "rissoles-accras",
  "Rissoles 6 pièces": "rissoles-accras",
  "Poulet grillé": "poulet-grille",
  "Travers de porc grillé": "porc-grille",
  "Poitrine de porc grillée": "porc-grille",
  Bifanas: "bifanas",
  "Secretos de porco preto": "secretos",
  "Calamares à la romaine": "calamares",
  "Polvo com molho verde": "polvo",
  Bolognaise: "bolognaise",
  "Gâteau au chocolat": "gateau-chocolat",
  Leitao: "leitao",
};
/** Photos shown with each section (in the order of the live page). */
export const SECTION_PHOTOS: Record<string, string[]> = {
  entrees: ["rissoles-accras"],
  specialites: ["poulet-grille", "porc-grille", "plats-table"],
  viandes: ["secretos", "bifanas", "porc-grille"],
  poissons: ["polvo", "calamares"],
  pates: ["bolognaise"],
  fondues: [],
  enfants: ["bolognaise"],
  commande: ["leitao"],
  desserts: ["gateau-chocolat"],
  coupes: ["glaces-poster", "glaces-1"],
  boules: ["glaces-2"],
};

/** The "Viande / Poisson / Tout" filter (a decision, listed in the hand-off). */
function sideOf(section: string, name: string): Side {
  if (section === "specialites" || section === "viandes") return "viande";
  if (section === "poissons") return "poisson";
  if (section === "entrees") {
    if (/Accras|crevettes|thon/.test(name)) return "poisson";
    if (/Rissoles de (boeuf|poulet|cochon)/.test(name)) return "viande";
  }
  return "tout";
}

const slug = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export type Dish = {
  id: string;
  section: string;
  name: string;
  price: string;
  unit: string;
  desc: string;
  wait?: string;
  group?: string;
  side: Side;
  photo?: string;
};
export type Section = { id: string; live: string; notes: string[]; dishes: Dish[] };

export const CARTE: Section[] = live.sections.map((s) => ({
  id: s.id,
  live: s.title,
  notes: s.notes,
  dishes: s.items.map((it) => ({
    id: `${s.id}-${slug(it.name)}`,
    section: s.id,
    name: it.name,
    price: it.price,
    unit: it.unit,
    desc: it.desc,
    wait: (it as { wait?: string }).wait,
    group: (it as { group?: string }).group,
    side: sideOf(s.id, it.name),
    photo: DISH_PHOTOS[it.name],
  })),
}));

export const ALL_DISHES = CARTE.flatMap((s) => s.dishes);
export const ON_ORDER = CARTE.find((s) => s.id === "commande")!.dishes;
export const KIDS = CARTE.find((s) => s.id === "enfants")!.dishes;
export const dishByName = (name: string) => ALL_DISHES.find((d) => d.name === name)!;

export const descText = (d: Dish, lang: Lang) => (!d.desc ? "" : lang === "fr" ? d.desc : DESC[d.desc]?.[lang] ?? d.desc);
export const noteText = (note: string, lang: Lang) => (lang === "fr" ? note : NOTE_L[note]?.[lang] ?? note);
/** "2.00 / pièce", the price as the live site writes it, with the unit in the visitor's language. */
export const priceText = (d: Dish, lang: Lang) => (d.unit ? `${d.price} / ${UNIT_L[d.unit]?.[lang] ?? d.unit}` : d.price);
