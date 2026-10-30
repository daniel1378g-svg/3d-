// Alternative texts for every photo, in the five languages. Cut-outs used as decoration get alt="" where used.
import type { Lang } from "@/i18n";

const ALTS: Record<string, Record<Lang, string>> = {
  "banner-brasilianisch": {
    de: "Brasilianische Gerichte von oben: schwarze Bohnen, Reis, Farofa, Bolinhos und Chilischoten auf einem Holztisch",
    en: "Brazilian dishes from above: black beans, rice, farofa, bolinhos and chillies on a wooden table",
    pt: "Pratos brasileiros vistos de cima: feijão preto, arroz, farofa, bolinhos e pimentas sobre uma mesa de madeira",
    fr: "Plats brésiliens vus du dessus : haricots noirs, riz, farofa, bolinhos et piments sur une table en bois",
    it: "Piatti brasiliani dall'alto: fagioli neri, riso, farofa, bolinhos e peperoncini su un tavolo di legno",
  },
  "cutout-picanha": { de: "Gegrilltes Stück Fleisch", en: "Grilled piece of meat", pt: "Pedaço de carne grelhada", fr: "Morceau de viande grillée", it: "Pezzo di carne alla griglia" },
  "cutout-coxinha": { de: "Zwei Coxinhas", en: "Two coxinhas", pt: "Duas coxinhas", fr: "Deux coxinhas", it: "Due coxinhas" },
  "cutout-pudim": { de: "Pudim mit Karamell", en: "Pudim with caramel", pt: "Pudim com calda", fr: "Pudim au caramel", it: "Pudim al caramello" },
  "cutout-bier": { de: "Bierflaschen auf Eis", en: "Beer bottles on ice", pt: "Garrafas de cerveja no gelo", fr: "Bouteilles de bière sur glace", it: "Bottiglie di birra nel ghiaccio" },
  "cutout-getraenke": { de: "Getränkedosen", en: "Soft drink cans", pt: "Latas de refrigerante", fr: "Canettes de boissons", it: "Lattine di bibite" },
};

export const alt = (id: string, lang: Lang) => ALTS[id]?.[lang] ?? "";
