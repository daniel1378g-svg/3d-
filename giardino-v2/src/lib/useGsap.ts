import { useLayoutEffect, type DependencyList, type RefObject } from "react";
import type { gsap as GSAP } from "gsap";
import type { ScrollTrigger as ST } from "gsap/ScrollTrigger";

// GSAP and ScrollTrigger load on their own, after the page's first render, so they never hold up the
// first paint. Effects that use them wait for the module, then run inside a gsap.context that is reverted
// on cleanup (or never created if the component is gone by then).
let loading: Promise<typeof import("./gsap")> | null = null;
export const loadGsap = () => (loading ??= import("./gsap"));

export function useGsap(effect: (gsap: typeof GSAP, ScrollTrigger: typeof ST) => void, scope: RefObject<Element | null>, deps: DependencyList, enabled = true) {
  useLayoutEffect(() => {
    if (!enabled) return;
    let ctx: gsap.Context | null = null;
    let alive = true;
    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (!alive || !scope.current) return;
      ctx = gsap.context(() => effect(gsap, ScrollTrigger), scope.current);
    });
    return () => {
      alive = false;
      ctx?.revert();
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
