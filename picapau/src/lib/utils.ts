import { clsx, type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export function storage(kind: "local" | "session") {
  return {
    get(key: string) {
      try {
        return (kind === "local" ? localStorage : sessionStorage).getItem(key);
      } catch {
        return null;
      }
    },
    set(key: string, value: string) {
      try {
        (kind === "local" ? localStorage : sessionStorage).setItem(key, value);
      } catch {
        /* private mode or blocked storage: the choice just isn't remembered */
      }
    },
  };
}

export const prefersReducedMotion = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
/** Accent- and case-insensitive text for search ("bacalhau" finds "Bacalhau", "amêijoas" finds "ameijoas"). */
export const fold = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
export const pad2 = (n: number) => String(n).padStart(2, "0");
/** The two easings every animation on the site uses. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;
