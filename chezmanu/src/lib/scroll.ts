import type Lenis from "lenis";

// The page's smooth scroller (absent with reduced motion); overlays stop it while they are open.
let current: Lenis | null = null;
export const setScroller = (l: Lenis | null) => (current = l);
export const scroller = () => current;

/** Freezes the page behind an overlay; returns the function that releases it. */
export function lockScroll() {
  const lenis = current;
  lenis?.stop();
  const prev = document.documentElement.style.overflow;
  document.documentElement.style.overflow = "hidden";
  return () => {
    document.documentElement.style.overflow = prev;
    lenis?.start();
  };
}
