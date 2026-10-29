// La carte: names, prices and French descriptions come verbatim from content/carte.live.json (extracted from
// the live page by scripts/extract_content.py); this file adds the translations and the small notes.
import live from "@content/carte.live.json";
import type { L, Lang } from "@/i18n";

const l = (fr: string, en: string, pt: string, it: string, de: string): L => ({ fr, en, pt, it, de });

export type NoteKey = "pieces6" | "forTwo" | "g200" | "riceExtra" | "garnishExtra" | "arrivals" | "market" | "autumn";
export const NOTES: Record<NoteKey, L> = {
  pieces6: l("6 pièces", "6 pieces", "6 peças", "6 pezzi", "6 Stück"),
  forTwo: l("pour deux", "for two", "para dois", "per due", "für zwei"),
  g200: l("200 g", "200 g", "200 g", "200 g", "200 g"),
  riceExtra: l("supplément riz au four 5.-", "oven-baked rice 5.- extra", "suplemento arroz no forno 5.-", "supplemento riso al forno 5.-", "Zuschlag Ofenreis 5.-"),
  garnishExtra: l("supplément garnitures brésiliennes 6.-", "Brazilian garnishes 6.- extra", "suplemento guarnições brasileiras 6.-", "supplemento contorni brasiliani 6.-", "Zuschlag brasilianische Beilagen 6.-"),
  arrivals: l("selon arrivages ou marché", "depending on arrivals or the market", "segundo as chegadas ou o mercado", "secondo gli arrivi o il mercato", "je nach Fang oder Markt"),
  market: l("selon marché", "market price", "preço de mercado", "secondo il mercato", "je nach Markt"),
  autumn: l("automne", "autumn", "outono", "autunno", "Herbst"),
};
export const PRICE_UNIT: Record<string, L> = { scoop: l("la boule", "per scoop", "a bola", "la pallina", "pro Kugel") };
export const PRICE_PREFIX: Record<string, L> = { from: l("dès", "from", "desde", "da", "ab") };

const DESC: Record<string, Omit<L, "fr">> = {
  "caldo-verde": { en: "Portugal’s national soup: potatoes, Portuguese kale, chouriço", pt: "Sopa nacional de Portugal: batata, couve portuguesa, chouriço", it: "Zuppa nazionale del Portogallo: patate, cavolo portoghese, chouriço", de: "Portugals Nationalsuppe: Kartoffeln, portugiesischer Kohl, Chouriço" },
  "sopa-de-peixe": { en: "Fish soup to our family recipe", pt: "Sopa de peixe segundo a receita da nossa família", it: "Zuppa di pesce secondo la ricetta della nostra famiglia", de: "Fischsuppe nach dem Rezept unserer Familie" },
  "salada-mista": { en: "Seasonal salad from the market or the garden, raw vegetables and onions", pt: "Salada da época, do mercado ou da horta, legumes crus e cebola", it: "Insalata di stagione dal mercato o dall’orto, verdure crude e cipolle", de: "Saisonsalat vom Markt oder aus dem Garten, Rohkost und Zwiebeln" },
  "salada-de-estacao": { en: "Seasonal green salad, from the market or the garden, and onions", pt: "Salada verde da época, do mercado ou da horta, e cebola", it: "Insalata verde di stagione, dal mercato o dall’orto, e cipolle", de: "Grüner Saisonsalat, vom Markt oder aus dem Garten, und Zwiebeln" },
  "salada-de-feijao-frade": { en: "Warm black-eyed bean salad with onions, hard-boiled egg and vinaigrette", pt: "Salada morna de feijão-frade com cebola, ovo cozido e vinagrete", it: "Insalata tiepida di fagioli dall’occhio con cipolle, uovo sodo e vinaigrette", de: "Lauwarmer Augenbohnensalat mit Zwiebeln, hartem Ei und Vinaigrette" },
  "travessa-de-degustacao-para-dois": { en: "Tasting platter for two (made up according to arrivals)", pt: "Travessa de degustação para dois (composta segundo as chegadas)", it: "Piatto di degustazione per due (composto secondo gli arrivi)", de: "Degustationsplatte für zwei (je nach Fang zusammengestellt)" },
  "bolinhos-de-bacalhau-6-pecas": { en: "Salt cod croquettes, 6 pieces", pt: "Bolinhos de bacalhau, 6 peças", it: "Crocchette di baccalà, 6 pezzi", de: "Stockfischkroketten, 6 Stück" },
  "peixes-grelhados-segundo-as-chegadas": { en: "Grilled fish depending on arrivals (see the “seasonal proposal” insert)", pt: "Peixe grelhado segundo as chegadas (ver o anexo «proposta da época»)", it: "Pesce alla griglia secondo gli arrivi (vedi l’allegato «proposta di stagione»)", de: "Grillierter Fisch je nach Fang (siehe Beilage «Saisonvorschlag»)" },
  "bacalhau-assado-na-grelha": { en: "Grilled salt cod, potatoes roasted in coarse salt, garlic, raw onions, Portuguese virgin olive oil", pt: "Bacalhau grelhado, batatas assadas com sal grosso, alho, cebola crua, azeite virgem de Portugal", it: "Baccalà alla griglia, patate arrosto al sale grosso, aglio, cipolle crude, olio vergine portoghese", de: "Grillierter Stockfisch, in grobem Salz geröstete Kartoffeln, Knoblauch, rohe Zwiebeln, natives Olivenöl aus Portugal" },
  "polvo-com-vinagrete-morno": { en: "Poached octopus, warm vinaigrette, onions, potatoes in coarse salt", pt: "Polvo cozido, vinagrete morno, cebola, batatas com sal grosso", it: "Polpo in camicia, vinaigrette tiepida, cipolle, patate al sale grosso", de: "Pochierter Oktopus, lauwarme Vinaigrette, Zwiebeln, Kartoffeln in grobem Salz" },
  "filetes-de-polvo-grelhados": { en: "Grilled octopus, virgin olive oil, jacket potatoes in coarse salt, vegetables", pt: "Polvo grelhado, azeite virgem, batatas a murro com sal grosso, legumes", it: "Polpo alla griglia, olio vergine, patate con la buccia al sale grosso, verdure", de: "Grillierter Oktopus, natives Olivenöl, Schalenkartoffeln in grobem Salz, Gemüse" },
  "gambas-selvagens-salteadas": { en: "Prawns pan-fried with piripiri. Parsley rice.", pt: "Gambas salteadas com piripiri. Arroz salsado.", it: "Gamberi saltati al piripiri. Riso al prezzemolo.", de: "Gambas mit Piripiri gebraten. Petersilienreis." },
  "conchas-a-bulhao-pato": { en: "Shellfish with garlic, coriander and olive oil (oven-baked rice 5.- extra)", pt: "Mariscos com alho, coentros e azeite (suplemento arroz no forno 5.-)", it: "Frutti di mare all’aglio, coriandolo e olio d’oliva (supplemento riso al forno 5.-)", de: "Muscheln mit Knoblauch, Koriander und Olivenöl (Zuschlag Ofenreis 5.-)" },
  "feijoada-brasileira": { en: "Pork shoulder, beef shank, pork cuts and sausages, black beans. Oven-baked rice. (6.- extra for the Brazilian garnishes)", pt: "Pá, chambão de vaca, carnes e enchidos de porco, feijão preto. Arroz no forno. (Suplemento 6.- para as guarnições brasileiras)", it: "Spalla, stinco di manzo, carni e salumi di maiale, fagioli neri. Riso al forno. (Supplemento 6.- per i contorni brasiliani)", de: "Schulter, Rindshaxe, Schweinefleisch und Würste, schwarze Bohnen. Ofenreis. (Zuschlag 6.- für die brasilianischen Beilagen)" },
  "bife-do-vazio-com-manteiga": { en: "Sirloin steak (200 g) pan-fried in butter with fresh coriander. Side of your choice.", pt: "Bife do vazio (200 g) frito em manteiga com coentros frescos. Acompanhamento à escolha.", it: "Entrecôte (200 g) in padella al burro e coriandolo fresco. Contorno a scelta.", de: "Entrecôte (200 g) in Butter mit frischem Koriander gebraten. Beilage nach Wahl." },
  "bacalhau-a-braz-a-gomes-de-sa-com-natas-no-forno-ou-outros-pratos": { en: "Various traditional salt cod dishes", pt: "Diversas preparações tradicionais de bacalhau", it: "Diverse preparazioni tradizionali di baccalà", de: "Verschiedene traditionelle Stockfischzubereitungen" },
  "acordas-de-marisco-ou-camarao-ou-bacalhau": { en: "Traditional dish of seafood or salt cod thickened with bread and scented with fresh coriander", pt: "Prato tradicional de marisco ou bacalhau ligado com pão e perfumado com coentros frescos", it: "Piatto tradizionale a base di frutti di mare o baccalà legato con il pane e profumato al coriandolo fresco", de: "Traditionelles Gericht mit Meeresfrüchten oder Stockfisch, mit Brot gebunden und mit frischem Koriander parfümiert" },
  "parrilhada-de-pescador": { en: "Fisherman’s platter (mixed grilled fish and seafood)", pt: "Parrilhada do pescador (variedade de peixes e mariscos grelhados)", it: "Grigliata del pescatore (misto di pesci e frutti di mare alla griglia)", de: "Fischerplatte (gemischte grillierte Fische und Meeresfrüchte)" },
  "arroz-de-marisco": { en: "Seafood rice", pt: "Arroz de marisco", it: "Riso ai frutti di mare", de: "Meeresfrüchtereis" },
  "caldeirada-de-peixe": { en: "Fish stew (our bouillabaisse)", pt: "Caldeirada de peixe (a nossa bouillabaisse)", it: "Zuppa di pesce in umido (la nostra bouillabaisse)", de: "Fischeintopf (unsere Bouillabaisse)" },
  "cabrito-assado-no-forno": { en: "Roast suckling kid with its garnish", pt: "Cabrito de leite assado com a sua guarnição", it: "Capretto da latte arrosto con contorno", de: "Gebratenes Milchzicklein mit Beilage" },
  "leitao-assado-no-forno": { en: "Suckling pig roasted and glazed in the oven", pt: "Leitão assado e lacado no forno", it: "Maialino da latte arrosto e laccato al forno", de: "Im Ofen gebratenes und glasiertes Spanferkel" },
  "cozido-a-portuguesa": { en: "Portuguese-style boiled meats and vegetables", pt: "Cozido à portuguesa", it: "Bollito alla portoghese", de: "Siedfleisch nach portugiesischer Art" },
  "arroz-de-pato-no-forno": { en: "Oven-baked duck rice", pt: "Arroz de pato no forno", it: "Riso all’anatra al forno", de: "Entenreis aus dem Ofen" },
  "carnes-de-caca-a-portuguesa": { en: "Portuguese-style game (autumn)", pt: "Caça à portuguesa (outono)", it: "Selvaggina alla portoghese (autunno)", de: "Wild nach portugiesischer Art (Herbst)" },
  "carne-de-porco-a-alentejana": { en: "Pork fillet with clams, Alentejo style", pt: "Lombo de porco com amêijoas à alentejana", it: "Filetto di maiale con vongole all’alentejana", de: "Schweinsfilet mit Venusmuscheln nach Alentejo-Art" },
  "pera-cozida-no-vinho-do-porto-e-especiarias": { en: "Pear poached in port and spices", pt: "Pera cozida em vinho do Porto e especiarias", it: "Pera cotta nel porto e spezie", de: "In Portwein und Gewürzen pochierte Birne" },
  "ovos-moles": { en: "Egg yolks cooked in syrup and drizzled with white port", pt: "Gemas de ovo cozidas em calda e regadas com Porto branco", it: "Tuorli d’uovo cotti nello sciroppo e bagnati con Porto bianco", de: "In Sirup gegarte Eigelb, mit weissem Portwein beträufelt" },
  "pudim-de-ovos-perfumado-de-laranja": { en: "Caramel egg custard scented with orange", pt: "Pudim de ovos com caramelo, perfumado com laranja", it: "Budino al caramello alle uova profumato all’arancia", de: "Karamellflan mit Eiern, mit Orange parfümiert" },
  "molotofe-com-creme-de-baunilha": { en: "Beaten egg whites cooked in a bain-marie, coated with vanilla cream", pt: "Claras em castelo cozidas em banho-maria, cobertas com creme de baunilha", it: "Albumi montati a neve cotti a bagnomaria, ricoperti di crema alla vaniglia", de: "Im Wasserbad gegarter Eischnee, mit Vanillecreme überzogen" },
  "molotofe-com-creme-de-ovos-moles": { en: "Beaten egg whites cooked in a bain-marie, coated with ovos moles", pt: "Claras em castelo cozidas em banho-maria, cobertas com ovos moles", it: "Albumi montati a neve cotti a bagnomaria, ricoperti di ovos moles", de: "Im Wasserbad gegarter Eischnee, mit Ovos moles überzogen" },
  "sortido-de-sobremesas-caseiras": { en: "Assortment of homemade desserts", pt: "Sortido de sobremesas caseiras", it: "Assortimento di dolci fatti in casa", de: "Auswahl hausgemachter Desserts" },
  "queijo-da-serra-com-marmelada-caseira": { en: "Sheep’s cheese from the “Serra da Estrela”, served with homemade quince paste", pt: "Queijo de ovelha da «Serra da Estrela», acompanhado de marmelada caseira", it: "Formaggio di pecora della «Serra da Estrela», accompagnato da cotognata fatta in casa", de: "Schafskäse aus der «Serra da Estrela», mit hausgemachter Quittenpaste" },
  "bola-de-gelado-artesanal": { en: "Scoop of artisan ice cream", pt: "Bola de gelado artesanal", it: "Pallina di gelato artigianale", de: "Kugel handwerklich hergestellte Glace" },
  "gelados-regados": { en: "Ice cream laced with liqueur", pt: "Gelados regados", it: "Gelati bagnati con liquore", de: "Glace mit Likör" },
};

const ITEM_NOTES: Record<string, NoteKey[]> = {
  "bolinhos-de-bacalhau-6-pecas": ["pieces6"],
  "travessa-de-degustacao-para-dois": ["forTwo"],
  "bife-do-vazio-com-manteiga": ["g200"],
  "conchas-a-bulhao-pato": ["riceExtra"],
  "feijoada-brasileira": ["garnishExtra"],
  "carnes-de-caca-a-portuguesa": ["autumn"],
};

/** Dish ↔ photo pairings, only where the dish can be seen in the photo (listed in the hand-off). */
export const DISH_PHOTOS: Record<string, string[]> = {
  "bacalhau-assado-na-grelha": ["plats-du-jour-plainpalais"],
  "filetes-de-polvo-grelhados": ["fruits-de-mer-plainpalais-geneve", "restaurant-specialites-de-la-mer-geneve"],
  "peixes-grelhados-segundo-as-chegadas": ["restaurant-de-poisson-geneve"],
  "travessa-de-degustacao-para-dois": ["specialites-fruits-de-mer-plainpalais"],
  "sortido-de-sobremesas-caseiras": ["restaurant-plainpalais"],
};

export const SECTION_TITLES: Record<string, { pt?: string; local: L; short: L }> = {
  entradas: { pt: "ENTRADAS", local: l("ENTRÉES", "Starters", "Entradas", "Antipasti", "Vorspeisen"), short: l("Entrées", "Starters", "Entradas", "Antipasti", "Vorspeisen") },
  pratos: { pt: "PRATOS PRINCIPAIS", local: l("PLATS PRINCIPAUX", "Main courses", "Pratos principais", "Piatti principali", "Hauptgerichte"), short: l("Plats principaux", "Mains", "Pratos", "Principali", "Hauptgerichte") },
  "sur-commande": {
    local: l("Plats sur commande dès 72 heures à l’avance ou plus", "Dishes to order at least 72 hours ahead", "Pratos por encomenda com 72 horas de antecedência ou mais", "Piatti su ordinazione da 72 ore prima o più", "Gerichte auf Bestellung, mindestens 72 Stunden im Voraus"),
    short: l("Sur commande", "To order", "Por encomenda", "Su ordinazione", "Auf Bestellung"),
  },
  sobremesas: { pt: "SOBREMESAS CASEIRAS", local: l("DESSERTS FAITS MAISON", "Homemade desserts", "Sobremesas caseiras", "Dolci fatti in casa", "Hausgemachte Desserts"), short: l("Desserts", "Desserts", "Sobremesas", "Dolci", "Desserts") },
};
export const SUB_ON_ORDER = l("Prix selon arrivages ou marché", "Prices depending on arrivals or the market", "Preços segundo as chegadas ou o mercado", "Prezzi secondo gli arrivi o il mercato", "Preise je nach Fang oder Markt");

export type Dish = {
  id: string;
  name: string;
  live: string;
  price: string | null;
  priceUnit?: string;
  pricePrefix?: string;
  desc: L;
  notes: NoteKey[];
  onOrder: boolean;
  photos: string[];
};
export type Section = { id: string; live: string; sub?: string; dishes: Dish[] };

export const CARTE: Section[] = live.sections.map((s) => ({
  id: s.id,
  live: s.live,
  sub: (s as { sub?: string }).sub,
  dishes: s.items.map((it) => {
    const tr = DESC[it.id];
    if (!tr) throw new Error(`missing translation for ${it.id}`);
    const x = it as typeof it & { priceUnit?: string; pricePrefix?: string; onOrder?: boolean };
    return {
      id: it.id,
      name: it.name,
      live: it.live,
      price: it.price,
      priceUnit: x.priceUnit,
      pricePrefix: x.pricePrefix,
      desc: { fr: it.desc.fr, ...tr },
      notes: [...(ITEM_NOTES[it.id] ?? []), ...(x.onOrder ? (["arrivals"] as NoteKey[]) : [])],
      onOrder: !!x.onOrder,
      photos: DISH_PHOTOS[it.id] ?? [],
    };
  }),
}));
export const ALL_DISHES = CARTE.flatMap((s) => s.dishes);
export const ON_ORDER = CARTE.find((s) => s.id === "sur-commande")!.dishes;
export const dishById = (id: string) => ALL_DISHES.find((d) => d.id === id)!;

/** The price exactly as the live carte writes it; "selon marché" is French words, so it is translated. */
export function priceText(d: Dish, lang: Lang) {
  if (!d.price) return null;
  if (d.price === "selon marché") return NOTES.market[lang];
  const pre = d.pricePrefix ? PRICE_PREFIX[d.pricePrefix][lang] + " " : "";
  return pre + d.price;
}
export const priceUnitText = (d: Dish, lang: Lang) => (d.priceUnit ? PRICE_UNIT[d.priceUnit][lang] : null);
