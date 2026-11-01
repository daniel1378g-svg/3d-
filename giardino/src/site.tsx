// Site-wide context: language, dictionary, current page, navigation with transitions, the language switch and the
// visitor's clock in Zurich (null while rendering on the server, so the static HTML never depends on build time).
import { createContext, useContext, useEffect, useState } from "react";
import type { Dict, Lang } from "@/i18n";
import type { PageKey } from "@/routes";
import { zurichNow, type Now } from "@shared/schedule";

export type GoOptions = { anchor?: string; search?: string; replace?: boolean };
export type Site = {
  lang: Lang;
  t: Dict;
  page: PageKey | "notFound";
  /** link target for a page in the current (or another) language */
  href: (page: PageKey, opts?: { lang?: Lang; anchor?: string; search?: string }) => string;
  /** navigates with the page transition */
  go: (to: string, opts?: GoOptions) => void;
  /** plays the logo transition, then shows the same place in `next` */
  requestLanguage: (next: Lang) => void;
  switching: boolean;
  reduced: boolean;
  hydrated: boolean;
};
export const SiteContext = createContext<Site | null>(null);
export function useSite() {
  const s = useContext(SiteContext);
  if (!s) throw new Error("useSite outside <SiteContext>");
  return s;
}
export const useT = () => useSite().t;

/** The proposal band (CLAUDE.md): permanent unless the owners approve the site (VITE_PROPOSAL=0). */
export const PROPOSAL = __PROPOSAL__;
export const PROPOSAL_TEXT = "Proposta de design · não é o site oficial";
export const ARTIFACT = __ARTIFACT__;
/**
 * Where reservation requests and messages go. Proposal mode (default, and the claude.ai preview): nowhere – the forms
 * hand off to the visitor's e-mail program and the phone. Launch mode: the restaurant's own server (server/), or
 * VITE_API_BASE if the owners host the API elsewhere.
 */
export const API_BASE: string | null = PROPOSAL || ARTIFACT ? null : (import.meta.env.VITE_API_BASE as string | undefined) ?? "/api";

/** Zurich wall-clock time, refreshed every minute; null on the server and before hydration. */
export function useNow(): Now | null {
  const [now, setNow] = useState<Now | null>(null);
  useEffect(() => {
    const tick = () => setNow(zurichNow());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

export function useMediaQuery(q: string) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [q]);
  return m;
}
