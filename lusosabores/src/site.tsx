import { createContext, useContext } from "react";
import type { Lang, PageKey } from "./i18n";

export type Site = {
  lang: Lang;
  page: PageKey;
  /** Plays the welcome slide, then switches to the same place in `next`. */
  requestLanguage: (next: Lang) => void;
  switching: boolean;
  /** Goes to a page, optionally to one of its sections (a home anchor or a menu group). */
  go: (page: PageKey, section?: string) => void;
  href: (page: PageKey, section?: string) => string;
  /** Opens the booking drawer (no booking form: the restaurant books by phone). */
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

/** The planner listens for this to preselect a dish ("Planifier (48 h)" links on the menu page). */
export const PLAN_EVENT = "ls:plan";
export const planDish = (dishId: string) => window.dispatchEvent(new CustomEvent(PLAN_EVENT, { detail: dishId }));
