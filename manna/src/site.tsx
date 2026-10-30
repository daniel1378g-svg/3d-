import { createContext, useContext } from "react";
import type { Anchor, Dict, Lang, PageKey } from "./i18n";

export type Site = {
  lang: Lang;
  t: Dict;
  page: PageKey;
  /** Plays the logo transition, then shows the same place in `next`. */
  requestLanguage: (next: Lang) => void;
  switching: boolean;
  /** Goes to a page, optionally to a home anchor. */
  go: (page: PageKey, opts?: { anchor?: Anchor }) => void;
  href: (page: PageKey, opts?: { anchor?: Anchor }) => string;
  /** True once the first-visit intro has finished (or was skipped / never played). */
  introDone: boolean;
  reduce: boolean;
};
export const SiteContext = createContext<Site | null>(null);
export function useSite() {
  const site = useContext(SiteContext);
  if (!site) throw new Error("useSite outside <Shell>");
  return site;
}
export const useT = () => useSite().t;

/** The proposal band (CLAUDE.md): permanent unless the owners approve the site (VITE_PROPOSAL=0). */
export const PROPOSAL = import.meta.env.VITE_PROPOSAL !== "0";
export const PROPOSAL_TEXT = "Proposta de design · não é o site oficial";

