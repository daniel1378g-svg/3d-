// Motion tokens (the `animate` skill's curves) and the reduced-motion switch.
import { useSyncExternalStore } from "react";

export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;
export const GSAP_EASE_OUT = "expo.out";

const query = () => (typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)") : null);
export const prefersReducedMotion = () => query()?.matches ?? false;
export function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const q = query();
      q?.addEventListener("change", cb);
      return () => q?.removeEventListener("change", cb);
    },
    () => prefersReducedMotion(),
    () => false,
  );
}
const coarse = () => (typeof window !== "undefined" ? window.matchMedia("(pointer: coarse)").matches : false);
export const isCoarse = coarse;
