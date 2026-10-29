// The restaurant's seven photos (the live gallery, 1.webp … 7.webp), with alt text in every language.
import sizes from "./image-sizes.json";
import { asset } from "@/lib/utils";
import type { L10n } from "@/i18n";

export type Photo = { name: string; w: number; h: number; tone: string; alt: L10n };
const S = sizes as unknown as Record<string, [number, number] | string>;

const ALT: Record<string, L10n> = {
  "gambas-ao-alho": {
    fr: "Gambas à l'ail nappées de leur sauce, sur une assiette blanche",
    en: "Garlic prawns in their sauce on a white plate",
    pt: "Gambas ao alho com o seu molho, num prato branco",
    it: "Gamberoni all'aglio con la loro salsa, su un piatto bianco",
    de: "Knoblauch-Crevetten in ihrer Sauce auf einem weissen Teller",
  },
  "polvo-a-lagareiro": {
    fr: "Polvo à Lagareiro : poulpe rôti, pommes de terre et légumes grillés, arrosés d'huile d'olive",
    en: "Polvo à Lagareiro: roast octopus, potatoes and grilled vegetables in olive oil",
    pt: "Polvo à Lagareiro com batatas e legumes grelhados, regado com azeite",
    it: "Polvo à Lagareiro: polpo arrosto, patate e verdure grigliate all'olio d'oliva",
    de: "Polvo à Lagareiro: gebratener Oktopus mit Kartoffeln und grilliertem Gemüse in Olivenöl",
  },
  "peixe-grelhado": {
    fr: "Filets de poisson grillés, gambas, frites et riz",
    en: "Grilled fish fillets, prawns, fries and rice",
    pt: "Filetes de peixe grelhados, gambas, batatas fritas e arroz",
    it: "Filetti di pesce alla griglia, gamberi, patatine e riso",
    de: "Grillierte Fischfilets, Crevetten, Pommes frites und Reis",
  },
  "pica-pau-companhia": {
    fr: "Pica Pau & Companhia : le plateau de dégustation servi sur une planche",
    en: "Pica Pau & Companhia: the tasting platter served on a board",
    pt: "Pica Pau & Companhia: a tábua de degustação",
    it: "Pica Pau & Companhia: il tagliere degustazione",
    de: "Pica Pau & Companhia: die Degustationsplatte auf einem Holzbrett",
  },
  "polvo-batatas": {
    fr: "Poulpe rôti avec pommes de terre, poivrons et brocoli",
    en: "Roast octopus with potatoes, peppers and broccoli",
    pt: "Polvo assado com batatas, pimentos e brócolos",
    it: "Polpo arrosto con patate, peperoni e broccoli",
    de: "Gebratener Oktopus mit Kartoffeln, Peperoni und Broccoli",
  },
  "bacalhau-a-braga": {
    fr: "Morue frite sur des chips maison, nappée d'oignons et de poivrons",
    en: "Fried cod on house-made crisps, topped with onions and peppers",
    pt: "Bacalhau frito sobre batatas às rodelas, com cebola e pimentos",
    it: "Baccalà fritto su chips della casa, con cipolle e peperoni",
    de: "Frittierter Stockfisch auf hausgemachten Chips mit Zwiebeln und Peperoni",
  },
  "salgados-presunto": {
    fr: "Planche de beignets traditionnels, jambon cru et fromage",
    en: "Board of traditional fritters, cured ham and cheese",
    pt: "Tábua de salgados tradicionais, presunto e queijo",
    it: "Tagliere di frittelle tradizionali, prosciutto crudo e formaggio",
    de: "Brett mit traditionellen Frittierspezialitäten, Rohschinken und Käse",
  },
};

/** In the order of the live gallery (1.webp … 7.webp). */
export const PHOTOS: Photo[] = ["gambas-ao-alho", "polvo-a-lagareiro", "peixe-grelhado", "pica-pau-companhia", "polvo-batatas", "bacalhau-a-braga", "salgados-presunto"].map((name) => {
  const [w, h] = S[`photos/${name}`] as [number, number];
  return { name, w, h, tone: S[`photos/${name}:tone`] as string, alt: ALT[name] };
});
export const photo = (name: string) => PHOTOS.find((p) => p.name === name)!;
export const photoSrc = (name: string, size: "640" | "960" | "lg" = "lg") => asset(`media/photos/${name}-${size}.webp`);
export const photoSrcSet = (p: Photo) =>
  p.w > 960 ? `${photoSrc(p.name, "640")} 640w, ${photoSrc(p.name, "960")} 960w, ${photoSrc(p.name, "lg")} ${p.w}w` : `${photoSrc(p.name, "640")} ${Math.min(640, p.w)}w, ${photoSrc(p.name, "lg")} ${p.w}w`;

export const CUTOUTS = ["polvo-a-lagareiro", "pica-pau-companhia", "bacalhau-a-braga", "salgados-presunto"] as const;
export type Cutout = (typeof CUTOUTS)[number];
export const cutoutSrc = (name: Cutout) => asset(`media/cutouts/${name}.webp`);
export const cutoutSize = (name: Cutout) => S[`cutouts/${name}`] as [number, number];
export const LOGO = { src: (w: 160 | 480 | 960 = 480) => asset(`brand/oiseau-${w}.webp`), size: S["brand/oiseau"] as [number, number] };
