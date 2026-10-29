// The ten press items of the live Presse page, titles and dates as written there. Each post holds only a
// scan; the scans still on the server are shown, the others (2016/03 uploads, now missing) say so.
import sizes from "@/data/image-sizes.json";
import { asset } from "@/lib/utils";

export type PressItem = { id: string; title: string; date: string; url: string; scan: { src: string; sm: string; w: number; h: number } | null };
const SZ = sizes as unknown as Record<string, [number, number]>;
const scan = (id: string) => ({ src: asset(`press/${id}.webp`), sm: asset(`press/${id}-sm.webp`), w: SZ[`press/${id}`][0], h: SZ[`press/${id}`][1] });
const OLD = "https://www.leportugais.ch/";

export const PRESS: PressItem[] = [
  { id: "tribune-de-geneve-plainpalais", title: "Tribune de Genève – Plainpalais", date: "2016-05-09", url: OLD + "tribune-de-geneve-plainpalais-2/", scan: scan("tribune-de-geneve") },
  { id: "tribune-de-geneve-plainpalais-2", title: "Tribune de Genève – Plainpalais", date: "2016-05-09", url: OLD + "tribune-de-geneve-plainpalais-2-2/", scan: scan("tribune-de-geneve") },
  { id: "article-portugais", title: "Article Portugais", date: "2016-04-26", url: OLD + "article-portugais/", scan: scan("article-portugais") },
  { id: "fines-gueules", title: "Fines Gueules", date: "2016-04-26", url: OLD + "fines-gueules/", scan: scan("fines-gueules") },
  { id: "gault-millau-suisse", title: "Gault & Millau Suisse", date: "2016-04-26", url: OLD + "gault-millau-suisse/", scan: scan("gault-millau") },
  { id: "guide-des-100-bistrots", title: "Guide des 100 Bistrots 2", date: "2016-04-26", url: OLD + "guide-des-100-bistrots-2/", scan: null },
  { id: "hebdo-manger-chi", title: "Hebdo – Manger chi pour moins de CHF100.- à Genève", date: "2016-04-26", url: OLD + "hebdo-manger-chi-pour-moins-de-chf100-a-geneve/", scan: null },
  { id: "hebdo", title: "HEBDO", date: "2016-04-26", url: OLD + "hebdo/", scan: null },
  { id: "leau-a-la-bouche", title: "L’eau à la bouche…", date: "2016-04-26", url: OLD + "leau-a-la-bouche/", scan: null },
  { id: "les-meilleures-adresses-exotiques", title: "Les meilleures adresses exotiques de Genève", date: "2016-04-26", url: OLD + "les-meilleures-adresses-exotiques-de-geneve/", scan: scan("adresses-exotiques") },
];
