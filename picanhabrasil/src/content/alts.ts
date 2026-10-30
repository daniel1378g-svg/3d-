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
  "prato-picanha": {
    de: "Ein Teller mit gegrillter Picanha, Reis, Bohnen, Farofa, Vinaigrette und Petersilie",
    en: "A plate of grilled picanha with rice, beans, farofa, vinaigrette and parsley",
    pt: "Um prato de picanha grelhada com arroz, feijão, farofa, vinagrete e salsinha",
    fr: "Une assiette de picanha grillée avec riz, haricots, farofa, vinaigrette et persil",
    it: "Un piatto di picanha alla griglia con riso, fagioli, farofa, vinaigrette e prezzemolo",
  },
  feijoada: {
    de: "Feijoada im Tontopf, daneben Reis, Kohl und Vinaigrette, im Hintergrund der Gastraum",
    en: "Feijoada in a clay pot with rice, greens and vinaigrette, the dining room behind",
    pt: "Feijoada na panela de barro com arroz, couve e vinagrete, o salão ao fundo",
    fr: "Feijoada dans un pot en terre avec riz, chou et vinaigrette, la salle en arrière-plan",
    it: "Feijoada nella pentola di terracotta con riso, cavolo e vinaigrette, la sala sullo sfondo",
  },
  fachada: {
    de: "Das Restaurant Picanha Brasil von aussen: Eingang an der Mattengasse mit Logo und Tischen auf dem Trottoir",
    en: "Picanha Brasil from outside: the entrance on Mattengasse with the logo and tables on the pavement",
    pt: "O Picanha Brasil por fora: a entrada na Mattengasse com o logotipo e mesas na calçada",
    fr: "Picanha Brasil vu de l'extérieur : l'entrée sur la Mattengasse avec le logo et des tables sur le trottoir",
    it: "Picanha Brasil da fuori: l'ingresso sulla Mattengasse con il logo e i tavoli sul marciapiede",
  },
  grupo: {
    de: "Eine fröhliche Runde am langen Tisch im Restaurant, mit Ballons und Girlanden",
    en: "A cheerful group at a long table in the restaurant, with balloons and bunting",
    pt: "Um grupo animado numa mesa comprida no restaurante, com balões e bandeirinhas",
    fr: "Un groupe joyeux à une longue table du restaurant, avec ballons et guirlandes",
    it: "Un gruppo allegro a una lunga tavolata nel ristorante, con palloncini e festoni",
  },
  "cutout-picanha": { de: "Gegrilltes Stück Fleisch", en: "Grilled piece of meat", pt: "Pedaço de carne grelhada", fr: "Morceau de viande grillée", it: "Pezzo di carne alla griglia" },
  "cutout-coxinha": { de: "Zwei Coxinhas", en: "Two coxinhas", pt: "Duas coxinhas", fr: "Deux coxinhas", it: "Due coxinhas" },
  "cutout-pudim": { de: "Pudim mit Karamell", en: "Pudim with caramel", pt: "Pudim com calda", fr: "Pudim au caramel", it: "Pudim al caramello" },
  "cutout-bier": { de: "Bierflaschen auf Eis", en: "Beer bottles on ice", pt: "Garrafas de cerveja no gelo", fr: "Bouteilles de bière sur glace", it: "Bottiglie di birra nel ghiaccio" },
  "cutout-getraenke": { de: "Getränkedosen", en: "Soft drink cans", pt: "Latas de refrigerante", fr: "Canettes de boissons", it: "Lattine di bibite" },
};

export const alt = (id: string, lang: Lang) => ALTS[id]?.[lang] ?? "";
