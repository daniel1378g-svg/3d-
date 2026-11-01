// Entrance reveals: elements marked data-reveal get .is-in when they enter the viewport. The hidden start state
// exists only under html.motion-ok, which is set here only after everything already on screen (or above it) has been
// marked .is-in – so pre-rendered content is never hidden while JavaScript loads, and never without JavaScript or
// with reduced motion.
import { useEffect } from "react";

export function useReveals(scopeKey: string) {
  useEffect(() => {
    const root = document.documentElement;
    const els = [...document.querySelectorAll<HTMLElement>("main [data-reveal]:not(.is-in)")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    // No layout is read here: the observer's first report (computed by the browser with its next frame) says what is
    // already on screen or above it – that stays as it is – and only then html.motion-ok hides what is still below.
    let first = true;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          const seen = first && e.boundingClientRect.top < (e.rootBounds?.height ?? window.innerHeight);
          if (!seen && !e.isIntersecting) continue;
          const delay = seen ? 0 : Number(el.dataset.delay ?? 0);
          if (delay) window.setTimeout(() => el.classList.add("is-in"), delay);
          else el.classList.add("is-in");
          io.unobserve(el);
        }
        if (first) {
          first = false;
          root.classList.add("motion-ok");
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    if (!els.length) root.classList.add("motion-ok");
    return () => io.disconnect();
  }, [scopeKey]);
}

/** Splits a headline into masked lines for the line-by-line entrance (lines given explicitly, never measured). */
export function lines(text: string[]) {
  return text;
}
