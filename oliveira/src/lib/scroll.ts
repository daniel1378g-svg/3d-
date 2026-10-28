import type Lenis from "lenis";

// The page's smooth scroller (absent with reduced motion); drawers stop it while they are open.
let current: Lenis | null = null;
export const setScroller = (l: Lenis | null) => (current = l);
export const scroller = () => current;
