import data from "../../content/carte.json";
import type { L10n } from "@/i18n";

export type Item = {
  id: string;
  name: string;
  /** Exactly as the live carte writes it ("25.-", "3.50"); null for dishes ordered in advance. */
  price: string | null;
  desc?: L10n;
  extra?: L10n;
  note?: L10n;
  photo?: string;
  surCommande: boolean;
};
export type Section = { id: string; title: L10n; photos: string[]; items: Item[]; note?: L10n; kicker?: L10n; text?: L10n };

export const CARTE = data.sections as Section[];
export const findItem = (name: string, section?: string) =>
  CARTE.filter((s) => !section || s.id === section).flatMap((s) => s.items).find((i) => i.name === name)!;
