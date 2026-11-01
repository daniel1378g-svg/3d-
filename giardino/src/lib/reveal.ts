// Entrance reveals: elements marked data-reveal get .is-in when they enter the viewport. The hidden start state
// exists only under html.motion-ok, which the app sets after it has started – and everything already on screen (or
// above it) is marked .is-in first, in the same task – so pre-rendered content is never hidden while JavaScript
// loads, and never without JavaScript or with reduced motion.
import { useEffect } from "react";

export function useReveals(scopeKey: string) {
  useEffect(() => {
    const all = [...document.querySelectorAll<HTMLElement>("main [data-reveal]:not(.is-in)")];
    // on screen or above it: shown as it is, no entrance
    const fold = window.innerHeight;
    const els = all.filter((el) => {
      if (el.getBoundingClientRect().top < fold) {
        el.classList.add("is-in");
        return false;
      }
      return true;
    });
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          const delay = Number(el.dataset.delay ?? 0);
          if (delay) window.setTimeout(() => el.classList.add("is-in"), delay);
          else el.classList.add("is-in");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [scopeKey]);
}

/** Splits a headline into masked lines for the line-by-line entrance (lines given explicitly, never measured). */
export function lines(text: string[]) {
  return text;
}
