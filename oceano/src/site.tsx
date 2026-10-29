import { createContext, useContext } from "react";
import type { Lang, PageKey } from "./i18n";

export type Site = {
  lang: Lang;
  page: PageKey;
  /** Plays the welcome slide, then switches to the same place in `next`. */
  requestLanguage: (next: Lang) => void;
  switching: boolean;
  /** Goes to a page, optionally to one of its sections (a home anchor or a carte section). */
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

/** The group planner listens for this to preselect a dish (and a party size), from the carte and the stepper. */
export const PLAN_EVENT = "ea:plan";
export type PlanRequest = { dish: string; persons?: number };
export function planDish(dish: string, persons?: number) {
  try {
    sessionStorage.setItem("ea-plan", JSON.stringify({ dish, persons }));
  } catch {
    /* private mode: the event still reaches a mounted planner */
  }
  window.dispatchEvent(new CustomEvent<PlanRequest>(PLAN_EVENT, { detail: { dish, persons } }));
}
