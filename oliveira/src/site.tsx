import { createContext, useContext } from "react";
import type { Lang, PageKey } from "./i18n";

export type Site = {
  lang: Lang;
  page: PageKey;
  /** Plays the welcome slide, then switches to the same page in `next`. */
  requestLanguage: (next: Lang) => void;
  switching: boolean;
  /** Goes to a page, optionally to one of its sections (a home section id or a filter). */
  go: (page: PageKey, section?: string, state?: Record<string, unknown>) => void;
  href: (page: PageKey, section?: string) => string;
  openBooking: () => void;
  toast: (text: string) => void;
};
export const SiteContext = createContext<Site | null>(null);
export function useSite() {
  const site = useContext(SiteContext);
  if (!site) throw new Error("useSite outside <Shell>");
  return site;
}
