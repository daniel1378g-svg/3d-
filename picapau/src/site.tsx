import { createContext, useContext } from "react";
import type { Lang, PageKey } from "./i18n";

export type Site = {
  lang: Lang;
  page: PageKey;
  /** Plays the welcome slide, then switches the same page to `next`. */
  requestLanguage: (next: Lang) => void;
  switching: boolean;
  /** Goes to a page, optionally to one of its sections (a home anchor or a carte section). */
  go: (page: PageKey, section?: string) => void;
  href: (page: PageKey, section?: string) => string;
  /** Opens the booking drawer from the right. */
  book: (opener?: HTMLElement | null) => void;
  /** The first-visit intro: "play" while it runs, "open" while it lifts (the hero arch opens), then "done". */
  intro: "play" | "open" | "done";
};
export const SiteContext = createContext<Site | null>(null);
export function useSite() {
  const site = useContext(SiteContext);
  if (!site) throw new Error("useSite outside <Shell>");
  return site;
}
