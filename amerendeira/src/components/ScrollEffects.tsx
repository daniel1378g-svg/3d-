"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

// Page-wide scroll choreography, declared in the markup with data attributes:
//   data-lines          lines (.line > span) rise through their mask when the block enters
//   data-words          words of a paragraph go from faint to full ink as it is read
//   data-bloom          an arch-shaped window opens to the full frame (oven mouth → room)
//   data-parallax="n"   gentle vertical parallax of an image inside its frame
//   data-drift="n"      a row moves sideways while it crosses the screen (n = direction/strength)
//   data-loaf           the cut-out loaf slides in over the fire and settles on the oven floor
//   data-bowl="±1"      a bowl slides in from the left (-1) or right (1) and settles in place
// With reduced motion none of this runs and everything stays in its final place.
export function ScrollEffects() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((block) => {
        const spans = block.querySelectorAll(".line > span");
        gsap.fromTo(
          spans,
          { yPercent: 108 },
          {
            yPercent: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.075,
            scrollTrigger: { trigger: block, start: "top 88%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-words]").forEach((p) => {
        const words = p.querySelectorAll(".word");
        gsap.fromTo(
          words,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.05,
            scrollTrigger: { trigger: p, start: "top 82%", end: "bottom 52%", scrub: 0.4 },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-bloom]").forEach((el) => {
        const narrow = Number(el.dataset.bloom || 0.36);
        const archClip = () => {
          const w = el.offsetWidth;
          const h = el.offsetHeight;
          const aw = Math.min(w * narrow, h * 0.78);
          const side = (w - aw) / 2;
          const r = aw / 2;
          return `inset(${h * 0.1}px ${side}px 0px ${side}px round ${r}px ${r}px 0px 0px)`;
        };
        gsap.fromTo(
          el,
          { clipPath: archClip },
          {
            clipPath: "inset(0px 0px 0px 0px round 0px 0px 0px 0px)",
            ease: "power2.inOut",
            scrollTrigger: { trigger: el, start: "top 92%", end: "top 12%", scrub: 0.6, invalidateOnRefresh: true },
          },
        );
        const img = el.querySelector(".photo");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.1 },
            { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
          );
        }
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax || 6);
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el) => {
        const dir = Number(el.dataset.drift || -1);
        const distance = () => {
          const overflow = el.scrollWidth - window.innerWidth;
          return Math.max(overflow, window.innerWidth * 0.12) * Math.abs(dir);
        };
        gsap.fromTo(
          el,
          { x: () => (dir < 0 ? 0 : -distance()) },
          {
            x: () => (dir < 0 ? -distance() : 0),
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-loaf]").forEach((loaf) => {
        const stage = loaf.parentElement!;
        gsap.fromTo(
          loaf,
          { x: () => -(stage.offsetWidth + loaf.offsetWidth) / 2, y: 24, rotation: -6, scale: 0.9, opacity: 0 },
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: stage, start: "top 55%", end: "top 5%", scrub: 0.8, invalidateOnRefresh: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-bowl]").forEach((bowl) => {
        const dir = Number(bowl.dataset.bowl || 1);
        const section = bowl.closest("section")!;
        // Shorter travel on phones, where the bowls are smaller too.
        const travel = () => window.innerWidth * (window.innerWidth < 700 ? 0.3 : 0.42);
        gsap.fromTo(
          bowl,
          { x: () => dir * travel(), rotation: dir * 28 },
          {
            x: 0,
            rotation: 0,
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top bottom", end: "top 30%", scrub: 0.8, invalidateOnRefresh: true },
          },
        );
      });

      // Images and fonts change heights after load; recompute positions once they are in.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      document.fonts?.ready.then(refresh);
      return () => window.removeEventListener("load", refresh);
    });
    return () => mm.revert();
  });

  return null;
}
