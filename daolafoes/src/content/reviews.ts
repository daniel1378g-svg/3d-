// The five Google reviews the client supplied (content/reviews.json), verbatim and in order, with a marked
// translation into the four other languages (content/translations/reviews.json).
import data from "@content/reviews.json";
import tr from "@content/translations/reviews.json";
import type { Lang } from "@/i18n";

export type Review = { id: string; author: string; stars: number; when: string; lang: "en"; text: string; meta?: Record<string, string> };
export const REVIEWS: Review[] = (data as { reviews: Review[] }).reviews;
const TR = tr as unknown as Record<string, Record<Lang, { when: string; text: string; meta?: Record<string, string> }>>;
export const translated = (r: Review, lang: Lang) => (lang === "en" ? null : TR[r.id]?.[lang] ?? null);
