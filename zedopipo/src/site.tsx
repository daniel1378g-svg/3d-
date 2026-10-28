import { createContext, useContext } from "react";
import type { Lang, PageKey } from "./i18n";

export type Site = {
  lang: Lang;
  page: PageKey;
  /** Plays the welcome slide, then switches to the same page in `next`. */
  requestLanguage: (next: Lang) => void;
  switching: boolean;
  /** Goes to a page, optionally to one of its sections (a menu group or a home section id). */
  go: (page: PageKey, section?: string) => void;
  href: (page: PageKey, section?: string) => string;
  /** Opens the booking drawer; the MyLocalina widget loads only then. */
  book: () => void;
};
export const SiteContext = createContext<Site | null>(null);
export function useSite() {
  const site = useContext(SiteContext);
  if (!site) throw new Error("useSite outside <Shell>");
  return site;
}

/** The group request card fills the contact form through this event. */
export const PREFILL_EVENT = "zp:prefill";
export const prefillContact = (message: string) => window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: message }));
