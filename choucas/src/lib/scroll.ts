// ScrollTrigger lives in the lazily loaded part of the home page; the shell asks it to re-measure
// through this hook, which does nothing until GSAP has loaded.
let refresher: (() => void) | null = null;
export const setScrollRefresher = (f: () => void) => (refresher = f);
export const refreshScroll = () => refresher?.();
