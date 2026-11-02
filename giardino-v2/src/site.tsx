import { createContext, useContext } from "react";
import type { Lang, PageKey } from "./i18n";

export type Site = {
  lang: Lang;
  page: PageKey;
  /** Plays the welcome wipe, then switches to the same place in `next`. */
  requestLanguage: (next: Lang) => void;
  switching: boolean;
  /** Goes to a page, optionally to one of its sections. */
  go: (page: PageKey, section?: string) => void;
  href: (page: PageKey, section?: string) => string;
  /** Opens the reservation drawer (phone-first: the restaurant books by telephone). */
  book: () => void;
  /** True once the first-visit intro has finished (or was skipped / never played). */
  introDone: boolean;
};
export const SiteContext = createContext<Site | null>(null);
export function useSite() {
  const site = useContext(SiteContext);
  if (!site) throw new Error("useSite outside <Shell>");
  return site;
}
