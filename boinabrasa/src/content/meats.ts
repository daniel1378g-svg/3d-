// The skewers listed on www.boinabrasa.ch/ch/spiesse (October 2026), in the site's order. Photos only where the
// site has a picture of that cut; the others get an illustrated card (no dish photo is invented).
import type { ArticleKey } from "@/i18n";

export type CutId = "picanha" | "picanhaAlho" | "maminha" | "costela" | "alcatra" | "presunto" | "costelinha" | "linguica" | "coxa" | "coracao";
export type Cut = { id: CutId; name: string; kind: "rind" | "schwein" | "poulet"; garlic?: boolean; image?: string; fit?: "cover" | "contain"; article?: ArticleKey };

export const CUTS: Cut[] = [
  { id: "picanha", name: "Picanha", kind: "rind", image: "spiess", article: "picanha" },
  { id: "picanhaAlho", name: "Picanha com alho", kind: "rind", garlic: true },
  { id: "maminha", name: "Maminha", kind: "rind", image: "maminha_wissen", article: "maminha" },
  { id: "costela", name: "Costela de boi", kind: "rind", image: "cutout-costela_de_boi", fit: "contain" },
  { id: "alcatra", name: "Alcatra com alho", kind: "rind", garlic: true },
  { id: "presunto", name: "Presunto", kind: "schwein" },
  { id: "costelinha", name: "Costelinha de porco", kind: "schwein" },
  { id: "linguica", name: "Linguiça", kind: "schwein", image: "brasilianische_wurst", article: "linguica" },
  { id: "coxa", name: "Coxa de frango", kind: "poulet" },
  { id: "coracao", name: "Coração de frango", kind: "poulet" },
];
