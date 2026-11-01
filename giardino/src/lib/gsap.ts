// GSAP with ScrollTrigger, loaded after first paint (it is not needed to show anything: every animated element is
// visible in the pre-rendered HTML) – this keeps it out of the first-route JavaScript budget (BRIEF §13).
// `useGsap()` returns nothing until the chunk has arrived; effects list `gsap` as a dependency and run again then.
// The scroll choreography is for large screens with a fine pointer (BRIEF §8: no pinning or scrubbing on touch), so
// elsewhere `useGsap()` stays empty and the chunk is only loaded for the language switch.
// The language switch preloads it on hover/focus of the globe (`loadGsap`). Server code never calls these.
import { useEffect, useState } from "react";
import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

export type GsapModule = { gsap: typeof GsapType; ScrollTrigger: typeof ScrollTriggerType };
let mod: GsapModule | null = null;
let pending: Promise<GsapModule> | null = null;

export function loadGsap(): Promise<GsapModule> {
  if (mod) return Promise.resolve(mod);
  pending ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, s]) => {
    g.gsap.registerPlugin(s.ScrollTrigger);
    g.gsap.defaults({ ease: "power3.out" });
    mod = { gsap: g.gsap, ScrollTrigger: s.ScrollTrigger };
    return mod;
  });
  return pending;
}
/** the module if it is already there (synchronous) */
export const gsapNow = () => mod;

const MOTION_DEVICE = "(min-width: 901px) and (pointer: fine)";

export function useGsap(): Partial<GsapModule> {
  const [m, setM] = useState<GsapModule | null>(mod);
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(MOTION_DEVICE);
    const on = () => setAllowed(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  useEffect(() => {
    if (m || !allowed) return;
    let alive = true;
    const go = () => loadGsap().then((x) => alive && setM(x));
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const id = w.requestIdleCallback ? w.requestIdleCallback(go, { timeout: 1200 }) : window.setTimeout(go, 200);
    return () => {
      alive = false;
      if (w.cancelIdleCallback) w.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, [m, allowed]);
  return allowed && m ? m : {};
}
