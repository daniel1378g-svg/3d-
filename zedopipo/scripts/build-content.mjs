// Builds content/menu.json from the lines read off https://zedopipo.ch/menu/ (content/raw/menu.json).
//
// The live descriptions are written "a | b | c" in French, English and Portuguese, but not always in that
// order and sometimes with only two of the three. Each line below says which language every part is in;
// the owner's texts are copied verbatim. Italian and German, and the few French/English/Portuguese texts
// marked `added`, are new translations and need a native-speaker check.
import { readFileSync, writeFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const raw = JSON.parse(readFileSync(`${root}content/raw/menu.json`, "utf8"));
const L = (fr, en, pt, it, de) => ({ fr, en, pt, it, de });

const NOTES = {
  monFri: L("Du lundi au vendredi", "Monday to Friday", "De segunda a sexta-feira", "Dal lunedì al venerdì", "Montag bis Freitag"),
  weekly: L("Nouvelles suggestions chaque semaine", "New suggestions every week", "Novas sugestões todas as semanas", "Nuovi suggerimenti ogni settimana", "Jede Woche neue Vorschläge"),
  perPerson2: L("Prix par personne, minimum 2 personnes", "Price per person, minimum 2 people", "Preço por pessoa, mínimo 2 pessoas", "Prezzo a persona, minimo 2 persone", "Preis pro Person, mindestens 2 Personen"),
  halfChicken: L("1/2 poulet", "1/2 chicken", "1/2 frango", "1/2 pollo", "1/2 Hähnchen"),
  sixPieces: L("6 pièces", "6 pieces", "6 unidades", "6 pezzi", "6 Stück"),
  iberian: L("Porc noir ibérique", "Iberian black pork", "Porco preto ibérico", "Maiale nero iberico", "Iberisches Schwarzschwein"),
  starter: L("Entrée", "Starter", "Entrada", "Antipasto", "Vorspeise"),
  main: L("Plat", "Main course", "Prato principal", "Piatto principale", "Hauptgang"),
};

const SECTIONS = [
  { id: "bienvenue", title: L("Bienvenue chez Zé-do-Pipo", "Welcome to Zé-do-Pipo", "Bem-vindos ao Zé-do-Pipo", "Benvenuti da Zé-do-Pipo", "Willkommen bei Zé-do-Pipo"), photos: ["salle-ze-do-pipo-haut", "secretos-300-2500", "tableau-restaurant-molard"] },
  { id: "incontournables", title: L("Nos incontournables", "Our must-haves", "Os nossos imperdíveis", "I nostri imperdibili", "Unsere Klassiker"), photos: ["poulet", "bacalhau-a-lagareiro-carre", "entrecote"] },
  { id: "entrees", title: L("Nos entrées", "Our starters", "As nossas entradas", "I nostri antipasti", "Unsere Vorspeisen"), photos: ["ameijoas-500", "pasteis-de-bacalhau-500", "saladinha-de-polvo-500"] },
  { id: "salades", title: L("Nos salades", "Our salads", "As nossas saladas", "Le nostre insalate", "Unsere Salate"), photos: ["salle-arriere-500", "salle-avant-table-25-", "restaurant-salle-ze-do-pipo"] },
  { id: "viandes", title: L("Nos viandes", "Our meat dishes", "As nossas carnes", "Le nostre carni", "Unsere Fleischgerichte"), photos: ["entrecote", "bitoque-lado-500", "poulet"] },
  { id: "poissons", title: L("Nos poissons", "Our fish dishes", "Os nossos peixes", "I nostri piatti di pesce", "Unsere Fischgerichte"), photos: ["bacalhau-lagareiro-lado-500", "camarao-lado-500", "bacalhau-a-bras-500"] },
  { id: "desserts", title: L("Nos desserts", "Our desserts", "As nossas sobremesas", "I nostri dessert", "Unsere Desserts"), photos: ["flan-lado-500", "mousse-au-chocolat-500", "panacotta-lado-500"] },
];

// [order of the live parts, it, de, side, extra]
const LINES = [
  [
    ["fr,en,pt", "Dal lunedì al venerdì vi proponiamo un piatto del giorno curato.", "Von Montag bis Freitag servieren wir Ihnen ein sorgfältig zubereitetes Tagesgericht.", null, { notes: ["monFri"] }],
    ["fr,en,pt", "Secretos di maiale iberico, patatine fritte", "Secretos vom iberischen Schwein, Pommes frites", "terra", { notes: ["iberian"], photo: "secretos-500", highlight: "viandes" }],
    ["fr,en,pt", "Scoprite nuovi suggerimenti (pesce, pasta, carne) ogni settimana", "Entdecken Sie jede Woche neue Vorschläge (Fisch, Pasta, Fleisch)", null, { notes: ["weekly"], from: true }],
  ],
  [
    ["fr,en,pt", "Baccalà alla griglia, patate al forno e olio d'oliva", "Gegrillter Kabeljau, Ofenkartoffeln und Olivenöl", "mar", { photo: "bacalhau-a-lagareiro-carre", highlight: "poissons" }],
    ["fr,en,pt", "Entrecôte con salsa della casa, patatine fritte, insalata", "Entrecôte mit Haussauce, Pommes frites, Salat", "terra", { photo: "entrecote", highlight: "viandes" }],
    ["fr,pt,en", "1/2 pollo con salsa piri piri, patate al forno, insalata", "1/2 Hähnchen mit Piri-Piri-Sauce, Ofenkartoffeln, Salat", "terra", { notes: ["halfChicken"], photo: "poulet", highlight: "viandes" }],
  ],
  [
    ["pt,en", "Insalata verde", "Grüner Salat", null],
    ["pt,en", "Zuppa del giorno", "Tagessuppe", null],
    ["pt,en", "Piatto di prosciutto crudo", "Rohschinkenteller", "terra"],
    ["fr,en", "Chouriço alla griglia", "Gegrillte Chouriço-Wurst", "terra"],
    ["en,pt,fr", "Frittelle di baccalà (6 pz)", "Stockfisch-Küchlein (6 Stück)", "mar", { notes: ["sixPieces"], photo: "pasteis-de-bacalhau-500" }],
    ["fr,en", "Vongole, vino bianco, aglio, olio d'oliva e coriandolo", "Venusmuscheln, Weisswein, Knoblauch, Olivenöl und Koriander", "mar", { photo: "ameijoas-500", added: { pt: "Amêijoas, vinho branco, alho, azeite e coentros" } }],
    ["fr,en,pt", "Insalata di polpo", "Oktopussalat", "mar", { photo: "saladinha-de-polvo-500" }],
    ["fr,en,pt", "Antipasto di gamberi piri piri", "Piri-Piri-Crevetten als Vorspeise", "mar", { notes: ["starter"], photo: "camarao-piri-piri-500", piri: true }],
    ["en,pt", "Piatto di formaggi", "Käseteller", null],
  ],
  [
    ["en,pt", "Insalata mista", "Gemischter Salat", null],
    ["fr,en,pt", "Insalata, crostini di formaggio di capra caldo", "Salat, Toasts mit warmem Ziegenkäse", null],
    ["fr,en,pt", "Insalata, pancetta grigliata, crostini, uovo all'occhio di bue", "Salat, gebratene Speckwürfel, Croûtons, Spiegelei", "terra"],
    ["fr,en,pt", "Insalata di pollo saltato, crostini, parmigiano", "Salat mit gebratenem Poulet, Croûtons, Parmesan", "terra"],
    ["fr,en,pt", "Insalata, cetriolo, peperoni, pomodori, olive, feta", "Salat, Gurke, Peperoni, Tomaten, Oliven, Feta", null],
    ["fr,en,pt", "Insalata, tonno, sardine, acciughe, olive, cipolle", "Salat, Thunfisch, Sardinen, Sardellen, Oliven, Zwiebeln", "mar"],
  ],
  [
    ["fr,en,pt", "Entrecôte con salsa della casa, patatine fritte, insalata", "Entrecôte mit Haussauce, Pommes frites, Salat", "terra", { photo: "entrecote" }],
    ["fr,pt,en", "1/2 pollo con salsa piri piri, patate al forno, insalata", "1/2 Hähnchen mit Piri-Piri-Sauce, Ofenkartoffeln, Salat", "terra", { notes: ["halfChicken"], photo: "poulet", piri: true }],
    ["fr,en,pt", "Bistecca di manzo, aglio, uovo all'occhio di bue, patatine fritte, riso", "Rindssteak, Knoblauch, Spiegelei, Pommes frites, Reis", "terra", { photo: "bitoque-lado-500" }],
    ["fr,en,pt", "Entrecôte con salsa di spugnole, patatine fritte, verdure", "Entrecôte mit Morchelsauce, Pommes frites, Gemüse", "terra"],
    ["fr,en,pt", "Bistecca di manzo con salsa della casa, patatine fritte e verdure", "Rindssteak mit Haussauce, Pommes frites und Gemüse", "terra"],
    ["fr,en,pt", "Scaloppina di maiale, aglio, uovo all'occhio di bue, patatine fritte, riso", "Schweinsschnitzel, Knoblauch, Spiegelei, Pommes frites, Reis", "terra"],
    ["fr,en,pt", "Secretos di maiale iberico, patatine fritte", "Secretos vom iberischen Schwein, Pommes frites", "terra", { notes: ["iberian"], photo: "secretos-500" }],
    ["fr,en,pt", "Maiale saltato con vongole, patate rosolate (prezzo a persona, minimo 2 persone)", "Gebratenes Schweinefleisch mit Venusmuscheln, Bratkartoffeln (Preis pro Person, mindestens 2 Personen)", "both", { notes: ["perPerson2"] }],
    ["fr,en,pt", "Costolette d'agnello à moda da Beira, patatine fritte, verdure", "Lammkoteletts à moda da Beira, Pommes frites, Gemüse", "terra"],
  ],
  [
    ["fr,en,pt", "Baccalà alla griglia, patate al forno e olio d'oliva", "Gegrillter Kabeljau, Ofenkartoffeln und Olivenöl", "mar", { photo: "bacalhau-lagareiro-lado-500" }],
    ["pt,fr,en", "Baccalà sfilacciato, patatine fritte e uova strapazzate (prezzo a persona, minimo 2 persone)", "Zerzupfter Kabeljau, Pommes frites und Rührei (Preis pro Person, mindestens 2 Personen)", "mar", { notes: ["perPerson2"], photo: "bacalhau-a-bras-500" }],
    ["fr,en,pt", "Polpo alla griglia, patate al forno e olio d'oliva", "Gegrillter Oktopus, Ofenkartoffeln und Olivenöl", "mar", { photo: "pouple-grille-500w" }],
    ["pt,en,fr", "Riso ai frutti di mare e rana pescatrice (prezzo a persona, minimo 2 persone)", "Reis mit Meeresfrüchten und Seeteufel (Preis pro Person, mindestens 2 Personen)", "mar", { notes: ["perPerson2"] }],
    ["fr,en,pt", "Orata reale alla griglia, patate al forno e verdure", "Gegrillte Dorade royale, Ofenkartoffeln und Gemüse", "mar"],
    ["fr,pt,en", "Sogliola alle mandorle, patate al forno e verdure", "Seezunge mit Mandeln, Ofenkartoffeln und Gemüse", "mar"],
    ["fr,en,pt", "Gamberi piri piri, patatine fritte", "Piri-Piri-Crevetten, Pommes frites", "mar", { notes: ["main"], photo: "camarao-lado-500", piri: true }],
    ["en,pt", "Spaghetti ai frutti di mare, salsa di pomodoro", "Spaghetti mit Meeresfrüchten und Tomatensauce", "mar", { added: { fr: "Fruits de mer, sauce tomate, spaghettis" } }],
  ],
  [
    ["fr,en,pt", "Flan al caramello fatto in casa", "Hausgemachter Caramelflan", null, { photo: "flan-lado-500" }],
    ["fr,en,pt", "Mousse al cioccolato fatta in casa", "Hausgemachte Schokoladenmousse", null, { photo: "mousse-au-chocolat-500" }],
    ["fr,pt", "Crema bruciata", "Crème brûlée", null, { added: { en: "Crème brûlée" } }],
    ["fr,en,pt", "Selezione di gelati", "Glace-Auswahl", null],
    ["en,fr,pt", "Mousse al mango", "Mangomousse", null],
    ["fr,pt", "Panna cotta", "Panna cotta", null, { photo: "panacotta-lado-500" }],
  ],
];

// "CHF 36,50 .-" → "36.50"; "CHF dès 20 .-" → "20.00" with from = true
const amount = (p) => {
  const n = p.match(/(\d+)(?:,(\d+))?/);
  return `${n[1]}.${(n[2] ?? "00").padEnd(2, "0")}`;
};
const slug = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const sections = raw.map((sec, si) => {
  const def = SECTIONS[si];
  if (slug(sec.title) !== slug(def.title.fr)) throw new Error(`section ${si}: ${sec.title}`);
  if (sec.items.length !== LINES[si].length) throw new Error(`section ${si}: ${sec.items.length} lines on the live page`);
  const items = sec.items.map((line, ii) => {
    const [order, it, de, side, extra = {}] = LINES[si][ii];
    const parts = line.desc.split("|").map((p) => p.trim()).filter(Boolean);
    const langs = order.split(",");
    if (parts.length !== langs.length) throw new Error(`${line.name}: ${parts.length} parts for ${order}`);
    const desc = Object.fromEntries(langs.map((l, k) => [l, parts[k]]));
    Object.assign(desc, extra.added ?? {}, { it, de });
    const item = {
      id: `${def.id}-${slug(line.name)}${extra.notes?.includes("starter") ? "-entree" : extra.notes?.includes("main") ? "-plat" : ""}`,
      name: line.name,
      livePrice: line.price,
      price: amount(line.price),
      desc,
      side: side ?? "none",
    };
    if (extra.from) item.from = true;
    if (extra.notes) item.notes = extra.notes.map((n) => NOTES[n]);
    if (extra.photo) item.photo = extra.photo;
    if (extra.highlight) item.alsoIn = extra.highlight;
    if (extra.piri) item.piri = true;
    if (extra.added) item.added = Object.keys(extra.added);
    return item;
  });
  return { id: def.id, title: def.title, photos: def.photos, liveImages: sec.images, items };
});

const total = sections.reduce((n, s) => n + s.items.length, 0);
const doc = { source: "https://zedopipo.ch/menu/", liveListings: total, sections };
writeFileSync(`${root}content/menu.json`, JSON.stringify(doc, null, 1) + "\n");
console.log(sections.map((s) => `${s.title.fr}: ${s.items.length}`).join("\n"), `\ntotal ${total}`);
console.log("mar", sections.flatMap((s) => s.items).filter((i) => i.side === "mar").length, "terra", sections.flatMap((s) => s.items).filter((i) => i.side === "terra").length, "both", sections.flatMap((s) => s.items).filter((i) => i.side === "both").length);
