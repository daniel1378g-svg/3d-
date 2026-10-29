// The restaurant's own photos, each looked at and described (the WhatsApp file names say nothing). The two
// stock pictures of the live site (the "Envie d'évasion?" beach and the fondue) are left out.
import sizes from "@/data/image-sizes.json";
import type { L } from "@/i18n";
import { asset } from "@/lib/utils";

const l = (fr: string, en: string, pt: string, it: string, de: string): L => ({ fr, en, pt, it, de });
export type PhotoCat = "plats" | "terrasse" | "sweet" | "wines";
export type Photo = { id: string; cat: PhotoCat; alt: L; w: number; h: number; src: string; sm: string };

const RAW: [string, PhotoCat, L][] = [
  ["terrasse", "terrasse", l("La terrasse du Café-Restaurant Entre Amigos sous sa toile, tables blanches et chaises rouges entre les oliviers", "The terrace of the Café-Restaurant Entre Amigos under its awning, white tables and red chairs among olive trees", "A esplanada do Café-Restaurant Entre Amigos sob o toldo, mesas brancas e cadeiras vermelhas entre oliveiras", "La terrazza del Café-Restaurant Entre Amigos sotto la tenda, tavoli bianchi e sedie rosse tra gli ulivi", "Die Terrasse des Café-Restaurant Entre Amigos unter dem Sonnendach, weisse Tische und rote Stühle zwischen Olivenbäumen")],
  ["plats-table", "plats", l("Une table vue d’en haut : poulpe, rissoles, viandes grillées, frites et desserts", "A table seen from above: octopus, rissoles, grilled meats, fries and desserts", "Uma mesa vista de cima: polvo, rissóis, carnes grelhadas, batatas fritas e sobremesas", "Una tavola vista dall’alto: polpo, rissoles, carni alla griglia, patatine e dolci", "Ein Tisch von oben: Oktopus, Rissoles, Grilliertes, Pommes frites und Desserts")],
  ["poulet-grille", "plats", l("Poulet grillé avec frites, riz et une tranche d’orange", "Grilled chicken with fries, rice and a slice of orange", "Frango grelhado com batatas fritas, arroz e uma rodela de laranja", "Pollo alla griglia con patatine, riso e una fetta d’arancia", "Grilliertes Poulet mit Pommes frites, Reis und einer Orangenscheibe")],
  ["porc-grille", "plats", l("Travers et poitrine de porc grillés avec frites, riz et sauce piquante", "Grilled pork ribs and belly with fries, rice and a hot sauce", "Entrecosto e entremeada grelhados com batatas fritas, arroz e molho picante", "Costine e pancetta di maiale alla griglia con patatine, riso e salsa piccante", "Grillierte Schweinsrippchen und Schweinebauch mit Pommes frites, Reis und scharfer Sauce")],
  ["secretos", "plats", l("Secretos de porco preto grillés avec des chips maison et un quartier de citron", "Grilled secretos de porco preto with home-made crisps and a lemon wedge", "Secretos de porco preto grelhados com batatas fritas caseiras e uma fatia de limão", "Secretos de porco preto alla griglia con patatine fatte in casa e uno spicchio di limone", "Grillierte Secretos de porco preto mit hausgemachten Chips und einem Zitronenschnitz")],
  ["bifanas", "plats", l("Bifanas : porc en sauce aux poivrons, riz et frites dans un plat en terre cuite", "Bifanas: pork in sauce with peppers, rice and fries in an earthenware dish", "Bifanas: porco em molho com pimentos, arroz e batatas fritas num prato de barro", "Bifanas: maiale in salsa con peperoni, riso e patatine in un piatto di terracotta", "Bifanas: Schweinefleisch in Sauce mit Peperoni, Reis und Pommes frites in einer Tonschale")],
  ["polvo", "plats", l("Poulpe en morceaux avec pommes de terre et persil dans un plat en terre cuite", "Octopus pieces with potatoes and parsley in an earthenware dish", "Polvo aos pedaços com batatas e salsa num prato de barro", "Polpo a pezzi con patate e prezzemolo in un piatto di terracotta", "Oktopusstücke mit Kartoffeln und Petersilie in einer Tonschale")],
  ["rissoles-accras", "plats", l("Rissoles et accras de morue sur un lit de salade", "Rissoles and salt cod fritters on a bed of lettuce", "Rissóis e pastéis de bacalhau sobre alface", "Rissoles e frittelle di baccalà su un letto d’insalata", "Rissoles und Stockfischküchlein auf Salat")],
  ["calamares", "plats", l("Calamares à la romaine, frites, citron et sauce tartare", "Squid rings in batter, fries, lemon and tartare sauce", "Lulas à romana, batatas fritas, limão e molho tártaro", "Calamari alla romana, patatine, limone e salsa tartara", "Calamares nach römischer Art, Pommes frites, Zitrone und Tatarensauce")],
  ["bolognaise", "plats", l("Spaghetti bolognaise et parmesan râpé", "Spaghetti bolognese with grated parmesan", "Esparguete à bolonhesa com parmesão ralado", "Spaghetti alla bolognese con parmigiano grattugiato", "Spaghetti Bolognese mit geriebenem Parmesan")],
  ["gateau-chocolat", "sweet", l("Gâteau au chocolat nappé de sauce, avec chantilly", "Chocolate cake with sauce and whipped cream", "Bolo de chocolate com calda e chantilly", "Torta al cioccolato con salsa e panna montata", "Schokoladenkuchen mit Sauce und Schlagrahm")],
  ["glaces-poster", "sweet", l("Affiche des glaces du Restaurant Entre Amigos : trois boules empilées", "The Restaurant Entre Amigos ice-cream poster: three stacked scoops", "Cartaz dos gelados do Restaurant Entre Amigos: três bolas empilhadas", "Il manifesto dei gelati del Restaurant Entre Amigos: tre palline impilate", "Das Glace-Plakat des Restaurant Entre Amigos: drei gestapelte Kugeln")],
  ["glaces-1", "sweet", l("Coupes de glaces de plusieurs parfums et cornets", "Ice-cream cups in several flavours, with cones", "Taças de gelado de vários sabores e cones", "Coppette di gelato di vari gusti e coni", "Glacebecher in mehreren Sorten, mit Waffeln")],
  ["glaces-2", "sweet", l("Boules de glace et de sorbet entourées de fruits", "Scoops of ice cream and sorbet surrounded by fruit", "Bolas de gelado e sorvete rodeadas de fruta", "Palline di gelato e sorbetto circondate di frutta", "Glace- und Sorbetkugeln mit Früchten")],
  ["leitao", "plats", l("Leitão, cochon de lait rôti à la peau dorée, avec de l’orange", "Leitão, roast suckling pig with golden crackling, with orange", "Leitão assado com a pele estaladiça e laranja", "Leitão, maialino da latte arrosto dalla pelle dorata, con arancia", "Leitão, gebratenes Spanferkel mit goldener Kruste und Orange")],
  ["vin-bouteille", "wines", l("Une bouteille de vin rouge du Douro présentée à table", "A bottle of Douro red wine shown at the table", "Uma garrafa de vinho tinto do Douro apresentada à mesa", "Una bottiglia di vino rosso del Douro presentata a tavola", "Eine Flasche Douro-Rotwein am Tisch")],
];

const SZ = sizes as unknown as Record<string, [number, number]>;
export const PHOTOS: Photo[] = RAW.map(([id, cat, alt]) => {
  const [w, h] = SZ[id];
  return { id, cat, alt, w, h, src: asset(`images/${id}.webp`), sm: asset(`images/${id}-sm.webp`) };
});
export const photo = (id: string) => {
  const p = PHOTOS.find((x) => x.id === id);
  if (!p) throw new Error(`unknown photo ${id}`);
  return p;
};
export const CUTOUTS = ["poulet", "rissoles", "polvo", "bifanas", "calamares", "bolognaise"] as const;
export type Cutout = (typeof CUTOUTS)[number];
export const cutout = (id: Cutout) => ({ src: asset(`cutouts/${id}.webp`), w: SZ[`cutouts/${id}`][0], h: SZ[`cutouts/${id}`][1] });
export const wineImage = (id: "casal-gazela" | "douro-planalto" | "carte-vins") => ({ src: asset(`wine/${id}.webp`), w: SZ[`wine/${id}`][0], h: SZ[`wine/${id}`][1] });
