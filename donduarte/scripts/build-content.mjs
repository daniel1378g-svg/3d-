// Builds content/plats.json, content/vins.json and content/desserts.json from the lines read off the
// live pages (content/raw/*.json, written by scripts/extract_live.py).
//
// The live pages have no headings, so each line is placed by its index into the groups of the owner's
// PDF menus. French texts and the owner's own Portuguese / English translations are copied verbatim;
// every other translation lives in this file and needs a native-speaker check before launch.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const raw = (page) => JSON.parse(readFileSync(join(root, "content/raw", `${page}.json`), "utf8"));
const L = (fr, en, pt, it, de) => ({ fr, en, pt, it, de });
const split = (s) => s.split("|").map((p) => p.trim()).filter(Boolean);

// ---------------------------------------------------------------- shared labels
const NOTE = {
  min2pp: L("Min. 2 personnes, prix par personne", "Min. 2 people, price per person", "Mín. 2 pessoas, preço por pessoa", "Min. 2 persone, prezzo a persona", "Min. 2 Personen, Preis pro Person"),
  min3: L("Minimum 3 pièces", "Minimum 3 pieces", "Mínimo 3 unidades", "Minimo 3 pezzi", "Mindestens 3 Stück"),
  perPiece: L("Prix à la pièce", "Price per piece", "Preço por unidade", "Prezzo al pezzo", "Preis pro Stück"),
  oven30: L("30 minutes au four", "30 minutes in the oven", "30 minutos no forno", "30 minuti in forno", "30 Minuten im Ofen"),
  pdfSoup: L("Ligne de la carte PDF", "Line from the PDF menu", "Linha da ementa em PDF", "Voce del menu PDF", "Zeile aus der PDF-Karte"),
};
const SIZE = {
  bottle: L("bt.", "btl.", "gf.", "bt.", "Fl."),
  half: L("demi", "half", "meio", "mezzo", "halb"),
  whole: L("entier", "whole", "inteiro", "intero", "ganz"),
  nature: L("nature", "plain", "simples", "al naturale", "nature"),
  flambe: L("flambé", "flambéed", "flamejado", "flambé", "flambiert"),
  maraschino: L("arrosée de Maraschino", "with Maraschino", "regada com Maraschino", "con Maraschino", "mit Maraschino"),
  boule1: L("1 boule", "1 scoop", "1 bola", "1 pallina", "1 Kugel"),
  boule2: L("2 boules", "2 scoops", "2 bolas", "2 palline", "2 Kugeln"),
};
const same = (s) => L(s, s, s, s, s);
const litre = L("1 litre", "1 litre", "1 litro", "1 litro", "1 Liter");

// "Premier prix pour 2 dl, second prix pour 3 dl, prix pour 5 dl : 6.50 Fr." → labels + extra price
function sizeNote(body, prices) {
  const m = body.match(/Premier prix pour ([\d.]+ ?[dc]l)(?:, second prix pour ([\d.]+ ?[dc]l))?(?:, prix pour (1 litre|[\d.]+ ?dl) : ([\d.]+) Fr\.?)?/);
  if (!m) return null;
  const labels = [same(m[1].replace(/(\d)(dl|cl)/, "$1 $2")), m[2] ? same(m[2].replace(/(\d)(dl|cl)/, "$1 $2")) : SIZE.bottle];
  const out = { prices: [...prices], priceLabels: labels.slice(0, prices.length) };
  if (m[3]) {
    out.prices.push(Number(m[4]).toFixed(2));
    out.priceLabels.push(m[3] === "1 litre" ? litre : same(m[3]));
  }
  return out;
}

// ---------------------------------------------------------------- dishes
const plats = raw("carte-plats");
const PIZZA = {
  52: ["Tomate e mozzarella", "Pomodoro e mozzarella", "Tomate und Mozzarella"],
  53: ["Tomate, mozzarella e fiambre", "Pomodoro, mozzarella e prosciutto cotto", "Tomate, Mozzarella und Vorderschinken"],
  54: ["Tomate, mozzarella, cogumelos frescos, fiambre e ovo", "Pomodoro, mozzarella, funghi freschi, prosciutto cotto e uovo", "Tomate, Mozzarella, frische Champignons, Vorderschinken und Ei"],
  55: ["Tomate, mozzarella, atum, cogumelos frescos e ovo", "Pomodoro, mozzarella, tonno, funghi freschi e uovo", "Tomate, Mozzarella, Thunfisch, frische Champignons und Ei"],
  56: ["Tomate, mozzarella, cogumelos frescos, fiambre, pimentos e alcaparras", "Pomodoro, mozzarella, funghi freschi, prosciutto cotto, peperoni e capperi", "Tomate, Mozzarella, frische Champignons, Vorderschinken, Peperoni und Kapern"],
  57: ["Tomate, mozzarella, pimentos, anchovas e azeitonas", "Pomodoro, mozzarella, peperoni, acciughe e olive", "Tomate, Mozzarella, Peperoni, Sardellen und Oliven"],
  58: ["Tomate, mozzarella, cogumelos frescos e presunto", "Pomodoro, mozzarella, funghi freschi e prosciutto crudo di campagna", "Tomate, Mozzarella, frische Champignons und Bauernrohschinken"],
  59: ["Tomate, mozzarella, bacalhau, pimentos, cebola e alcaparras", "Pomodoro, mozzarella, baccalà, peperoni, cipolle e capperi", "Tomate, Mozzarella, Bacalhau, Peperoni, Zwiebeln und Kapern"],
  60: ["Tomate, mozzarella, camarão", "Pomodoro, mozzarella, gamberi", "Tomate, Mozzarella, Crevetten"],
  61: ["Tomate, mozzarella, chouriço e cebola", "Pomodoro, mozzarella, chouriço e cipolle", "Tomate, Mozzarella, Chouriço und Zwiebeln"],
  62: ["Tomate, mozzarella, bacon e cebola", "Pomodoro, mozzarella, pancetta e cipolle", "Tomate, Mozzarella, Speck und Zwiebeln"],
  63: ["Tomate, mozzarella, cogumelos frescos e carne de vaca", "Pomodoro, mozzarella, funghi freschi e carne di manzo", "Tomate, Mozzarella, frische Champignons und Rindfleisch"],
  64: ["Tomate, mozzarella, curgete, pimentos, beringela e cebola", "Pomodoro, mozzarella, zucchine, peperoni, melanzane e cipolle", "Tomate, Mozzarella, Zucchetti, Peperoni, Auberginen und Zwiebeln"],
  65: ["Tomate, mozzarella, fiambre, cogumelos frescos e ovo", "Pomodoro, mozzarella, prosciutto cotto, funghi freschi e uovo", "Tomate, Mozzarella, Kochschinken, frische Champignons und Ei"],
  66: ["Tomate, mozzarella, camarão e ananás", "Pomodoro, mozzarella, gamberi e ananas", "Tomate, Mozzarella, Crevetten und Ananas"],
};
// [pt, it, de] for the French | English descriptions of the live page
const DESC = {
  6: ["Alface, tomate e cenoura", "Insalata verde, pomodoro e carote", "Grüner Salat, Tomate und Karotten"],
  7: ["Alface, cenoura, tomate, milho e endívias", "Insalata verde, carote, pomodoro, mais e indivia", "Grüner Salat, Karotten, Tomate, Mais und Chicorée"],
  8: ["Alface, polvo, tomate, cebola e salsa", "Insalata verde, polpo, pomodoro, cipolle e prezzemolo", "Grüner Salat, Oktopus, Tomate, Zwiebeln und Petersilie"],
  24: ["Alface, tomate, bacalhau cru desfiado, cebola e azeitonas", "Insalata verde, pomodoro, baccalà crudo sminuzzato, cipolle e olive", "Grüner Salat, Tomate, roher, fein geschnittener Bacalhau, Zwiebeln und Oliven"],
  35: ["Alface, tomate e cocktail de camarão", "Insalata verde, pomodoro e cocktail di gamberi", "Grüner Salat, Tomate und Crevettencocktail"],
  33: ["Salada mista – Vazia de vaca – Molho Don Duarte – Batatas na plancha – Legumes do dia – Sobremesa à escolha (exceto gelados)", "Insalata mista – Controfiletto di manzo – Salsa Don Duarte – Patate alla piastra – Verdure del giorno – Dessert a scelta (gelati esclusi)", "Gemischter Salat – Rindshuft (Faux-filet) – Sauce Don Duarte – Kartoffeln von der Plancha – Tagesgemüse – Dessert nach Wahl (ohne Glace)"],
  34: ["Salada mista – Duo de peixe – Batatas na plancha – Legumes do dia – Sobremesa à escolha (exceto gelados)", "Insalata mista – Duo di pesce – Patate alla piastra – Verdure del giorno – Dessert a scelta (gelati esclusi)", "Gemischter Salat – Fisch-Duo – Kartoffeln von der Plancha – Tagesgemüse – Dessert nach Wahl (ohne Glace)"],
};

function dish(i, extra = {}) {
  const r = plats[i];
  const names = split(r.title);
  const name = names.length === 3 ? { fr: names[0], pt: names[1], en: names[2] } : names.length === 2 ? { fr: names[0], en: names[1] } : { fr: names[0] };
  const item = { id: `p${i}`, raw: [i], name, prices: r.prices };
  if (r.body) {
    const parts = split(r.body);
    if (PIZZA[i]) item.desc = { fr: parts[0], en: parts[1], pt: PIZZA[i][0], it: PIZZA[i][1], de: PIZZA[i][2] };
    else if (DESC[i]) item.desc = { fr: parts[0], en: parts[1], pt: DESC[i][0], it: DESC[i][1], de: DESC[i][2] };
  }
  return Object.assign(item, extra);
}
const dup = (item, ...dupes) => ((item.raw = [...item.raw, ...dupes]), (item.duplicates = dupes), item);
const strip = (s) => s.replace(/\s*\(min\. 3 (pièces|pieces)\)/, "");

const platsGroups = [
  { id: "aperitifs", title: L("Apéritifs", "Aperitifs", "Aperitivos", "Aperitivi", "Aperitifs"), items: [dish(13), dish(14), dish(5)] },
  {
    id: "vins",
    title: L("Vins", "Wines", "Vinhos", "Vini", "Weine"),
    note: L("En accompagnement de nos mets, nous vous conseillons nos vins :", "To go with our dishes, we recommend our wines:", "Para acompanhar os nossos pratos, aconselhamos os nossos vinhos:", "Per accompagnare i nostri piatti, vi consigliamo i nostri vini:", "Zu unseren Gerichten empfehlen wir unsere Weine:"),
    // From the dishes PDF. The prices there differ from the wine list, which wins, so the group links to it.
    winesFromPdf: ["Rosé de Penalva", "Encosta de Penalva rouge", "Encosta de Penalva branco", "Reserva", "Milénio", "Baga", "Touriga Nacional"],
    items: [],
  },
  {
    id: "terra-e-mar",
    title: same("Terra e Mar"),
    note: L("Nos spécialités", "Our specialities", "As nossas especialidades", "Le nostre specialità", "Unsere Spezialitäten"),
    items: [
      (() => {
        const r = plats[11];
        const [fr, pt, enAndNote] = split(r.body);
        const en = enAndNote.replace(/\s*–\s*Min\. 2 personnes, prix par personne$/, "");
        return dish(11, {
          desc: { fr, pt, en, it: "Carni: manzo, maiale, agnello, chouriço, Pesce: salmone, rana pescatrice, gamberi, Cavolo saltato e patate", de: "Fleisch: Rind, Schwein, Lamm, Chouriço, Fisch: Lachs, Seeteufel, Crevetten, Gebratener Kohl und Kartoffeln" },
          notes: [NOTE.min2pp],
          photo: "terra-e-mar",
        });
      })(),
      dish(12, {
        desc: { fr: split(plats[12].body)[0], en: split(plats[12].body)[1], pt: "Primeiro preço para meio franguinho, sem opção de um franguinho para duas pessoas", it: "Primo prezzo per mezzo galletto, nessuna opzione di un galletto per due", de: "Erster Preis für ein halbes Hähnchen, keine Option eines ganzen Hähnchens für zwei" },
        priceLabels: [SIZE.half, SIZE.whole],
      }),
      (() => {
        const [fr, pt, en] = split(plats[51].title);
        return dish(51, { name: same("Francesinha"), desc: { fr, pt, en, it: "Prosciutto di spalla, salsiccia, fetta di manzo, formaggio e uovo", de: "Schulterschinken, Wurst, Rindfleischscheibe, Käse und Ei" }, photo: "francesinha" });
      })(),
    ],
  },
  {
    id: "entrees",
    title: L("Entrées", "Starters", "Entradas", "Antipasti", "Vorspeisen"),
    items: [
      dish(25, { name: { fr: strip(split(plats[25].title)[0]), en: strip(split(plats[25].title)[1]) }, notes: [NOTE.min3, NOTE.perPiece] }),
      dish(26, { name: { fr: strip(split(plats[26].title)[0]), en: strip(split(plats[26].title)[1]) }, notes: [NOTE.min3, NOTE.perPiece] }),
      dish(37), dish(27), dish(38), dish(39), dish(40),
    ],
  },
  {
    id: "pates",
    title: L("Pâtes", "Pasta", "Massas", "Pasta", "Teigwaren"),
    note: L("Spaghettis ou penne", "Spaghetti or penne", "Esparguete ou penne", "Spaghetti o penne", "Spaghetti oder Penne"),
    items: [dish(15), dish(48), dish(49), dish(50)],
  },
  { id: "omelettes", title: L("Omelettes", "Omelettes", "Omeletes", "Omelette", "Omeletten"), items: [41, 42, 43, 44, 45].map((i) => dish(i)) },
  {
    id: "juniors",
    title: L("Pour les juniors", "For juniors", "Para os mais novos", "Per i più piccoli", "Für die Kleinen"),
    items: [dish(46), dish(47), dish(70, { desc: { fr: plats[70].body, en: "Tomato, mozzarella, cooked ham", pt: "Tomate, mozzarella, fiambre", it: "Pomodoro, mozzarella, prosciutto cotto", de: "Tomate, Mozzarella, Vorderschinken" } })],
  },
  {
    id: "poissons",
    title: L("Poissons", "Fish", "Peixe", "Pesce", "Fisch"),
    items: [
      (() => {
        const [fr, pt, en] = split(plats[9].body);
        return dish(9, { desc: { fr, pt, en, it: "Salmone e rana pescatrice", de: "Lachs und Seeteufel" } });
      })(),
      dish(16), dish(17, { photo: "polvo" }), dish(18), dish(19),
    ],
  },
  {
    id: "morues",
    title: L("Morues", "Salt cod", "Bacalhau", "Baccalà", "Bacalhau"),
    items: [dish(20, { notes: [NOTE.oven30], photo: "bacalhau-grelhado" }), dish(21, { photo: "bacalhau-braz" }), dish(22), dish(23)],
  },
  { id: "pizzas", title: L("Pizzas", "Pizzas", "Pizas", "Pizze", "Pizzas"), items: [52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66].map((i) => dish(i)) },
  { id: "menus", title: L("Menus", "Set menus", "Menus", "Menù", "Menüs"), items: [dish(33), dish(34)] },
  {
    id: "viandes",
    title: L("Viandes", "Meat", "Carne", "Carne", "Fleisch"),
    items: [
      dish(10),
      dup(dish(29), 36),
      dish(28, { photo: "porco-alentejana" }),
      dish(30, { desc: { fr: "Tranche de jambon d’épaule et œuf", pt: "Fiambre e ovo", en: "Shoulder ham and egg slice", it: "Fetta di prosciutto di spalla e uovo", de: "Scheibe Schulterschinken und Ei" } }),
      dish(31), dish(32),
    ],
  },
  { id: "sauces", title: L("Sauces", "Sauces", "Molhos", "Salse", "Saucen"), items: [dish(69), dish(68), dish(67)] },
  {
    id: "salades",
    title: L("Salades & soupe", "Salads & soup", "Saladas e sopa", "Insalate e zuppa", "Salate & Suppe"),
    items: [
      dish(6), dish(7), dish(8), dish(24), dish(35),
      { id: "pdf-soupe-petite", raw: [], name: { fr: "Soupe, petite" }, prices: ["6.00"], pdfOnly: true },
      { id: "pdf-soupe-grande", raw: [], name: { fr: "Grande soupe" }, prices: ["8.00"], pdfOnly: true },
    ],
  },
];
// The five pizzas at the top of the live page repeat lines 62–66 with the same name and price.
const pizzas = platsGroups.find((g) => g.id === "pizzas").items;
for (const [first, again] of [[0, 66], [1, 65], [2, 64], [3, 63], [4, 62]]) dup(pizzas.find((p) => p.raw[0] === again), first);

// ---------------------------------------------------------------- wines & drinks
const vins = raw("carte-vins");
const COLOR = {
  blanc: L("Blancs", "White", "Brancos", "Bianchi", "Weisse"),
  rose: L("Rosés", "Rosé", "Rosés", "Rosati", "Rosé"),
  rouge: L("Rouges", "Red", "Tintos", "Rossi", "Rote"),
};
const sparklingRose = L("Rosé pétillant", "Sparkling rosé", "Rosé frisante", "Rosato frizzante", "Perlender Rosé");
const ARROSES = L(
  "Café/thé avec petit verre (2cl), (pruneau, pomme, marc, rhum, maçieira)",
  "Coffee/tea with a small glass (2 cl): prune, apple, marc, rum or Maçieira",
  "Café/chá com um copinho (2 cl): ameixa, maçã, bagaço, rum ou Maçieira",
  "Caffè/tè con un bicchierino (2 cl): prugna, mela, grappa, rum o Maçieira",
  "Kaffee/Tee mit einem Gläschen (2 cl): Pflümli, Apfel, Marc, Rum oder Maçieira",
);

function wine(i, { kind = "wine" } = {}) {
  const r = vins[i];
  const item = { id: `v${i}`, raw: [i], name: same(r.title), prices: r.prices };
  const parts = split(r.body);
  const sized = sizeNote(r.body, r.prices);
  if (sized) Object.assign(item, sized);
  else if (kind === "wine" && r.prices.length === 2) item.priceLabels = [same("1 dl"), SIZE.bottle];
  for (const p of parts) {
    if (/^Premier prix/.test(p)) continue;
    if (p === "Rosé pétillant") item.desc = sparklingRose;
    else if (/^Café\/thé/.test(p)) item.desc = ARROSES;
    else if (/,| e /.test(p) && !/^(Verde|Douro|Dão|Palmela|Alentejo|Terras do Sado)$/.test(p)) item.grapes = p;
    else item.region = p === "Verde" ? "Vinho Verde" : p;
  }
  return item;
}
const W = (...idx) => idx.map((i) => wine(i));
const D = (...idx) => idx.map((i) => wine(i, { kind: "drink" }));
const sub = (id, title, items, extra = {}) => ({ id, title, items, ...extra });
const region = (color, name) => L(`${COLOR[color].fr} · ${name}`, `${COLOR[color].en} · ${name}`, `${COLOR[color].pt} · ${name}`, `${COLOR[color].it} · ${name}`, `${COLOR[color].de} · ${name}`);
const byGlass = L("Vins ouverts (1 dl)", "By the glass (1 dl)", "A copo (1 dl)", "Al bicchiere (1 dl)", "Offenweine (1 dl)");

const vinsGroups = [
  {
    id: "portugal",
    title: L("Portugal", "Portugal", "Portugal", "Portogallo", "Portugal"),
    sections: [
      sub("blanc-verde", region("blanc", "Vinho Verde"), W(9, 11, 12, 10), { map: "verde" }),
      sub("blanc-douro", region("blanc", "Douro"), W(13, 14), { map: "douro" }),
      sub("blanc-dao", region("blanc", "Dão"), W(15, 16), { map: "dao" }),
      sub("blanc-sado", region("blanc", "Terras do Sado"), W(17), { map: "setubal" }),
      sub("blanc-alentejo", region("blanc", "Alentejo"), W(18), { map: "alentejo" }),
      sub("rose-dao", region("rose", "Dão"), W(54), { map: "dao" }),
      sub("rose-petillant", L("Rosés pétillants", "Sparkling rosés", "Rosés frisantes", "Rosati frizzanti", "Perlende Rosés"), W(55, 56)),
      sub("rouge-douro", region("rouge", "Douro"), W(34, 35, 36), { map: "douro" }),
      sub("rouge-dao", region("rouge", "Dão"), W(37, 38, 39, 40, 41, 42, 43), { map: "dao" }),
      sub("rouge-palmela", region("rouge", "Palmela"), W(44, 45), { map: "setubal" }),
      sub("rouge-alentejo", region("rouge", "Alentejo"), W(46, 47, 48, 49, 50, 51, 52, 53), { map: "alentejo" }),
    ],
  },
  {
    id: "suisse",
    title: L("Suisse", "Switzerland", "Suíça", "Svizzera", "Schweiz"),
    sections: [
      sub("geneve", L("Genève", "Geneva", "Genebra", "Ginevra", "Genf"), W(3, 19, 20)),
      sub("vaud", L("Vaud", "Vaud", "Vaud", "Vaud", "Waadt"), W(21, 0)),
      sub("valais", L("Valais", "Valais", "Valais", "Vallese", "Wallis"), W(4, 22, 118)),
      sub("suisse-ouverts", byGlass, W(27, 26, 25, 24)),
    ],
  },
  { id: "france", title: L("France", "France", "França", "Francia", "Frankreich"), sections: [sub("france-ouverts", byGlass, W(1, 2))] },
  { id: "italie", title: L("Italie", "Italy", "Itália", "Italia", "Italien"), sections: [sub("italie-vins", L("Rouges", "Red", "Tintos", "Rossi", "Rote"), W(8, 23))] },
  { id: "espagne", title: L("Espagne", "Spain", "Espanha", "Spagna", "Spanien"), sections: [sub("espagne-vins", L("Rouges", "Red", "Tintos", "Rossi", "Rote"), W(6, 5, 7))] },
  { id: "mousseux", title: L("Champagne & mousseux", "Champagne & sparkling", "Champanhe e espumantes", "Champagne e spumanti", "Champagner & Schaumweine"), sections: [sub("mousseux-vins", null, W(28, 29, 30))] },
  { id: "aperitifs", title: L("Apéritifs & cocktails", "Aperitifs & cocktails", "Aperitivos e cocktails", "Aperitivi e cocktail", "Aperitifs & Cocktails"), sections: [sub("aperitifs-liste", null, D(58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69))] },
  {
    id: "spiritueux",
    title: L("Eaux-de-vie & liqueurs", "Spirits & liqueurs", "Aguardentes e licores", "Distillati e liquori", "Spirituosen & Liköre"),
    sections: [sub("spiritueux-liste", null, D(...Array.from({ length: 34 }, (_, k) => 70 + k)))],
  },
  { id: "bieres", title: L("Bières", "Beers", "Cervejas", "Birre", "Biere"), sections: [sub("bieres-liste", null, D(113, 114, 115, 116, 117, 126, 127, 128))] },
  {
    id: "sans-alcool",
    title: L("Sans alcool", "Soft drinks", "Sem álcool", "Analcolici", "Alkoholfrei"),
    sections: [sub("sans-alcool-liste", null, D(31, 32, 33, 104, 105, 106, 107, 108, 109, 110, 111, 112, 124, 129))],
  },
  { id: "chaud", title: L("Boissons chaudes & lait", "Hot drinks & milk", "Bebidas quentes e leite", "Bevande calde e latte", "Heissgetränke & Milch"), sections: [sub("chaud-liste", null, D(120, 121, 122, 123, 125, 119, 57, 130))] },
];

// ---------------------------------------------------------------- desserts
const des = raw("carte-desserts");
const DD = {
  16: ["Vanilla ice cream topped with chocolate sauce", "Gelado de baunilha regado com molho de chocolate", "Gelato alla vaniglia con salsa al cioccolato", "Vanilleglace mit Schokoladensauce"],
  17: ["Stracciatella and mocha ice cream", "Gelado de stracciatella e moca", "Gelato stracciatella e moka", "Stracciatella- und Moccaglace"],
  18: ["Mocha ice cream topped with coffee sauce", "Moca regado com molho de café", "Moka con salsa al caffè", "Mocca mit Kaffeesauce"],
  19: ["Three sorbets", "Três sorvetes", "Tre sorbetti", "Drei Sorbets"],
  20: ["Chocolate and pistachio ice cream", "Gelado de chocolate e pistácio", "Gelato al cioccolato e pistacchio", "Schokoladen- und Pistazienglace"],
  21: ["Vanilla ice cream topped with chocolate sauce", "Gelado de baunilha regado com molho de chocolate", "Gelato alla vaniglia con salsa al cioccolato", "Vanilleglace mit Schokoladensauce"],
  23: ["Prune sorbet with Vieille Prune", "Sorvete de ameixa com Vieille Prune", "Sorbetto alla prugna con Vieille Prune", "Zwetschgensorbet mit Vieille Prune"],
  24: ["Vanilla ice cream with whisky", "Gelado de baunilha regado com whisky", "Gelato alla vaniglia con whisky", "Vanilleglace mit Whisky"],
  25: ["Williams pear sorbet with Williamine", "Sorvete de pera Williams regado com Williamine", "Sorbetto alla pera Williams con Williamine", "Williamsbirnensorbet mit Williamine"],
  26: ["Apricot sorbet with Abricotine", "Sorvete de alperce regado com Abricotine", "Sorbetto all’albicocca con Abricotine", "Aprikosensorbet mit Abricotine"],
  27: ["Lemon sorbet with vodka", "Sorvete de limão regado com vodka", "Sorbetto al limone con vodka", "Zitronensorbet mit Wodka"],
  29: ["Flavours of your choice", "Sabores à escolha", "Gusti a scelta", "Aroma nach Wahl"],
  30: ["Vanilla cone with Smarties", "Cone de baunilha com Smarties", "Cono alla vaniglia con Smarties", "Vanillecornet mit Smarties"],
  31: ["Stracciatella ice cream with its surprise", "Gelado de stracciatella com surpresa", "Gelato stracciatella con sorpresa", "Stracciatellaglace mit Überraschung"],
};
function dessert(i, extra = {}) {
  const r = des[i];
  const item = { id: `d${i}`, raw: [i], name: same(r.title), prices: r.prices };
  const first = split(r.body.replace(/∣/g, "|"))[0];
  if (DD[i]) item.desc = { fr: first, en: DD[i][0], pt: DD[i][1], it: DD[i][2], de: DD[i][3] };
  if (/nature, second prix: flambé/.test(r.body)) item.priceLabels = [SIZE.nature, SIZE.flambe];
  if (/arrosée de Maraschino/.test(r.body)) item.priceLabels = [SIZE.nature, SIZE.maraschino];
  if (/1 boule, second prix pour 2 boules/.test(r.body)) item.priceLabels = [SIZE.boule1, SIZE.boule2];
  return Object.assign(item, extra);
}
const dessertsGroups = [
  {
    id: "desserts",
    title: L("Desserts maison", "Homemade desserts", "Sobremesas caseiras", "Dolci fatti in casa", "Hausgemachte Desserts"),
    items: [
      dessert(9, { photo: "molotof" }), dessert(8, { photo: "bolo-de-bolacha" }), dessert(11, { photo: "flan" }), dessert(7, { photo: "creme-brulee" }),
      dessert(10, { photo: "tiramisu" }), dessert(12, { photo: "mousse-chocolat" }), dessert(3, { photo: "parfait-mocca" }), dup(dessert(0, { photo: "cheesecake" }), 13),
      dessert(6), dessert(5), dessert(14), dessert(4), dessert(15), dessert(1),
    ],
  },
  {
    id: "coupes",
    title: L("Coupes glacées", "Ice-cream sundaes", "Taças de gelado", "Coppe gelato", "Glacecoupes"),
    items: [dup(dessert(16, { photo: "banana-split" }), 2), ...[17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27].map((i) => dessert(i))],
  },
  {
    id: "boules",
    title: L("Boules de glace", "Ice-cream scoops", "Bolas de gelado", "Palline di gelato", "Glacekugeln"),
    items: [
      dessert(28, {
        desc: L(
          "Vanille, Chocolat, Caramel, Mocca (avec noisettes croquantes), Stracciatella, Tarte au noix, Pistache, Fraise, Abricot, Poire Williams, Pruneaux, Citron",
          "Vanilla, Chocolate, Caramel, Mocha (with crunchy hazelnuts), Stracciatella, Walnut tart, Pistachio, Strawberry, Apricot, Williams pear, Prune, Lemon",
          "Baunilha, Chocolate, Caramelo, Moca (com avelãs crocantes), Stracciatella, Tarte de noz, Pistácio, Morango, Alperce, Pera Williams, Ameixa, Limão",
          "Vaniglia, Cioccolato, Caramello, Moka (con nocciole croccanti), Stracciatella, Torta di noci, Pistacchio, Fragola, Albicocca, Pera Williams, Prugna, Limone",
          "Vanille, Schokolade, Caramel, Mocca (mit knusprigen Haselnüssen), Stracciatella, Baumnusstorte, Pistazie, Erdbeere, Aprikose, Williamsbirne, Zwetschge, Zitrone",
        ),
        notes: [L("Garniture à la crème : CHF 1.00", "Cream topping: CHF 1.00", "Cobertura de natas: CHF 1.00", "Guarnizione di panna: CHF 1.00", "Rahmgarnitur: CHF 1.00")],
        flavours: 12,
      }),
    ],
  },
  {
    id: "enfants",
    title: L("Frappé & glaces enfants", "Frappé & kids’ ice creams", "Batido e gelados para crianças", "Frappé e gelati per bambini", "Frappé & Kinderglace"),
    items: [
      dessert(29), dessert(30), dessert(31),
      dessert(32, {
        desc: L(
          "Vanille – Fraise. Nouveaux stickers pour jouer et collectionner dans le bâton",
          "Vanilla – Strawberry. New stickers to play with and collect inside the stick",
          "Baunilha – Morango. Novos autocolantes para brincar e colecionar no pauzinho",
          "Vaniglia – Fragola. Nuovi adesivi da giocare e collezionare nello stecco",
          "Vanille – Erdbeere. Neue Sticker zum Spielen und Sammeln im Stiel",
        ),
      }),
    ],
  },
];

// ---------------------------------------------------------------- write + check
const allItems = (groups) => groups.flatMap((g) => g.items ?? g.sections.flatMap((s) => s.items));
function write(file, groups, rawLines, extra) {
  const seen = allItems(groups).flatMap((it) => it.raw);
  const missing = rawLines.map((r) => r.i).filter((i) => !seen.includes(i));
  const twice = seen.filter((i, k) => seen.indexOf(i) !== k);
  if (missing.length || twice.length) throw new Error(`${file}: missing ${missing} / twice ${twice}`);
  const doc = { ...extra, liveLines: rawLines.length, shownLines: allItems(groups).length, groups };
  writeFileSync(join(root, "content", file), JSON.stringify(doc, null, 1) + "\n");
  console.log(`${file}: ${rawLines.length} live lines → ${doc.shownLines} shown (${allItems(groups).filter((i) => i.pdfOnly).length} from the PDF only)`);
}
write("plats.json", platsGroups, plats, {
  source: "https://donduarte.ch/carte-plats/ · groups from https://donduarte.ch/menu-restaurant-pdf/",
  pdf: "https://donduarte.ch/menu-restaurant-pdf/",
});
write("vins.json", vinsGroups, vins, {
  source: "https://donduarte.ch/carte-vins/ · groups from the wine list PDFs",
  pdf: "https://donduarte.ch/carte-vins-et-boissons_don-duarte/",
  pdfHome: "https://donduarte.ch/carta_des_vins_et_boissons_don_duarte/",
  note: L(
    "*Lorsque deux prix sont indiqués et sans autre spécification, le premier correspond à 1 dl et le second à la bouteille.",
    "*When two prices are shown with no other detail, the first is for 1 dl and the second for the bottle.",
    "*Quando são indicados dois preços sem outra especificação, o primeiro corresponde a 1 dl e o segundo à garrafa.",
    "*Quando sono indicati due prezzi senza altra specifica, il primo corrisponde a 1 dl e il secondo alla bottiglia.",
    "*Sind zwei Preise ohne weitere Angabe aufgeführt, gilt der erste für 1 dl und der zweite für die Flasche.",
  ),
});
write("desserts.json", dessertsGroups, des, {
  source: "https://donduarte.ch/carte-desserts/ · photos from the 2024 dessert PDF",
  pdf: "https://donduarte.ch/carte-des-desserts_2024_don-duarte/",
  pdfHome: "https://donduarte.ch/carte_des_desserts_don_duarte/",
});
