import { createContext, useContext } from "react";
import type { Lang, PageKey } from "./i18n";

export type Site = {
  lang: Lang;
  page: PageKey;
  /** Plays the welcome slide, then switches to the same page in `next`. */
  requestLanguage: (next: Lang) => void;
  switching: boolean;
  /** Goes to a page, optionally to one of its sections, with optional state (the cake request's message). */
  go: (page: PageKey, section?: string, state?: Record<string, unknown>) => void;
  href: (page: PageKey, section?: string) => string;
};
export const SiteContext = createContext<Site | null>(null);
export function useSite() {
  const site = useContext(SiteContext);
  if (!site) throw new Error("useSite outside <Shell>");
  return site;
}
