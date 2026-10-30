// Smooth scrolling (Lenis) on pointer devices only, kept in step with GSAP ScrollTrigger. Touch keeps the
// platform's own scrolling; reduced motion keeps native scrolling everywhere.
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";
import { isCoarse, prefersReducedMotion } from "./motion";

let lenis: Lenis | null = null;

export function startScroll() {
  if (lenis || prefersReducedMotion() || isCoarse()) return;
  lenis = new Lenis({ duration: 1.05, easing: (t) => 1 - Math.pow(1 - t, 4), wheelMultiplier: 1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis?.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

/** Scrolls to an element or y, smoothly unless reduced motion; `immediate` jumps. */
export function scrollTo(target: HTMLElement | number, opts: { offset?: number; immediate?: boolean } = {}) {
  const offset = opts.offset ?? 0;
  if (lenis) {
    lenis.scrollTo(target, { offset, immediate: opts.immediate, duration: 1.1 });
    return;
  }
  const y = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top: y, behavior: opts.immediate || prefersReducedMotion() ? "auto" : "smooth" });
}
export const stopScroll = () => lenis?.stop();
export const resumeScroll = () => lenis?.start();
export const scrollY = () => (lenis ? lenis.scroll : window.scrollY);
