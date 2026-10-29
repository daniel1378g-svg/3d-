import { createContext, useContext } from "react";
import type { Lang, PageKey } from "./i18n";

export type Site = {
  lang: Lang;
  page: PageKey;
  /** Plays the sliding-logo transition, then switches to the same place in `next`. */
  requestLanguage: (next: Lang) => void;
  switching: boolean;
  /** Goes to a page, optionally to one of its sections. */
  go: (page: PageKey, section?: string) => void;
  href: (page: PageKey, section?: string) => string;
  /** Opens the booking drawer (the table widget, the phones, the e-mail, the form link). */
  book: () => void;
  /** Opens the cart drawer. */
  openCart: () => void;
  /** True once the first-visit intro has finished (or was skipped / never played). */
  introDone: boolean;
};
export const SiteContext = createContext<Site | null>(null);
export function useSite() {
  const site = useContext(SiteContext);
  if (!site) throw new Error("useSite outside <Shell>");
  return site;
}

/** The table widget stores the party size here; the reservation form reads it into "Zusatzinformationen". */
export const PARTY_KEY = "dl-party";
export const PARTY_EVENT = "dl:party";
export function setParty(n: number) {
  try {
    sessionStorage.setItem(PARTY_KEY, String(n));
  } catch {
    /* private mode */
  }
  window.dispatchEvent(new CustomEvent<number>(PARTY_EVENT, { detail: n }));
}
export function getParty() {
  try {
    const v = Number(sessionStorage.getItem(PARTY_KEY));
    return v >= 1 ? v : 2;
  } catch {
    return 2;
  }
}
