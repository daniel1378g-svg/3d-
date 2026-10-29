// The menu: the 35 dishes of the live site (German and Portuguese names verbatim, typos included) with the
// prices of the restaurant's own PDF where the PDF has the dish, and the PDF's three columns in full.
import data from "@content/menu.json";
import type { L, Lang } from "@/i18n";
import { UI } from "@/i18n";
import { TX } from "./site";

export type Col = "takeaway" | "anfrage" | "restaurant";
export type PdfRow = { id: string; col: Col; de: string; deSource: string; deAlt: string; headPt: string | null; pt: string; price: string; unit: "FR" | "FR/KG" | "FR/P" };
export type SectionKey = "vorspeisen" | "haupt" | "suppen" | "salate" | "desserts" | "getraenke";
export type WebDish = { id: string; nr: number | null; de: string; pt: string; unit: string; thumb: string | null; pdf: string | null; note: string };

const D = data as unknown as { pdf: Record<Col, PdfRow[]> & { lunch: { pt: string; deAlt: string; price: string; includes: { pt: string; deAlt: string }[] }; footer: string }; web: { key: SectionKey; items: WebDish[] }[] };
export const PDF = D.pdf;
export const LUNCH = D.pdf.lunch;
export const PDF_ROWS: PdfRow[] = [...PDF.takeaway, ...PDF.anfrage, ...PDF.restaurant];
const BY_ID = new Map(PDF_ROWS.map((r) => [r.id, r]));
export const SECTIONS = D.web;
export const DISHES: WebDish[] = SECTIONS.flatMap((s) => s.items);
export const SECTION_TITLE: Record<SectionKey, L> = { vorspeisen: TX.secVorspeisen, haupt: TX.secHaupt, suppen: TX.secSuppen, salate: TX.secSalate, desserts: TX.secDesserts, getraenke: TX.secGetraenke };
export const COL_TITLE: Record<Col, L> = { takeaway: TX.n_filterTakeaway, anfrage: TX.n_filterAnfrage, restaurant: TX.n_filterRestaurant };

/** The dish name in the visitor's language: German and Portuguese are the live names; the others show the
 *  Portuguese name (the dish's own name) with the German in brackets where it helps. */
export function dishName(d: WebDish, lang: Lang) {
  if (lang === "de") return d.de;
  if (lang === "pt") return d.pt;
  return d.pt === d.de ? d.pt : d.pt;
}
export const dishSub = (d: WebDish, lang: Lang) => (lang === "de" ? d.pt : lang === "pt" ? null : d.de);
export const pdfRow = (d: WebDish) => (d.pdf ? BY_ID.get(d.pdf) ?? null : null);
/** "25.00 FR" / "40.00 FR/KG" / "25.00 FR/P", as the PDF prints it. */
export const priceText = (r: PdfRow) => `${r.price} ${r.unit}`;
export const unitText = (r: PdfRow, lang: Lang) => (r.unit === "FR/KG" ? TX.n_perKg[lang] : r.unit === "FR/P" ? TX.n_perPerson[lang] : "");
/** A number for the cart: only plain portion prices count; per-kg and per-person prices stay "on request". */
export const priceNumber = (r: PdfRow | null) => (r && r.unit === "FR" ? Number(r.price) : null);
export const money = (n: number) => `${n.toFixed(2)} FR`;
export const thumbId = (d: WebDish) => {
  if (!d.thumb) return null;
  const map: Record<string, string> = { "_thumb_Bacalhau Lafões.png": "t-bacalhau-lafoes", "_thumb_Bitoque Porco.png": "t-bitoque-porco", "_thumb_D2-Sandes de Leitão.png": "t-sandes-leitao", "_thumb_F2-Leitão Dão Lafões+.png": "t-leitao-inteiro", "_thumb_Frango Churrasco.png": "t-frango-churrasco", "_thumb_Frango Dose.png": "t-frango-dose", "_thumb_Grelhado Misto.png": "t-grelhado-misto", "_thumb_Leitão Dose.png": "t-leitao-dose", "_thumb_Nugguets Frango.png": "t-nuggets", "_thumb_Picanha.png": "t-picanha", "_thumb_Posta Mirandesa.png": "t-posta", "_thumb_Pudim.png": "t-pudim", "_thumb_Salada Mista.png": "t-salada-mista" };
  return map[d.thumb] ?? null;
};
export const dishById = (id: string) => DISHES.find((d) => d.id === id);
export const portionLabel = (lang: Lang) => UI.portion[lang];
