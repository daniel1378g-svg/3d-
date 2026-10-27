"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

// Page-wide scroll choreography, declared in the markup with data attributes:
//   data-lines          lines (.line > span) rise through their mask when the block enters
//   data-words          words of a paragraph go from faint to full ink as it is read
//   data-parallax="n"   gentle vertical parallax of an image inside its frame
//   data-drift="n"      a row moves sideways while it crosses the screen (n = direction/strength)
//   data-reveal         a photograph or card slides up through a mask as it enters, with a very
//                       slight zoom out (CSS, 0.8 s; --d sets a small delay between neighbours)
// None of these pin the page: the only pinned scroll is the bread film. With reduced motion none
// of this runs and everything is shown in its final place.
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
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: { trigger: block, start: "top 88%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-words]").forEach((p) => {
        const words = p.querySelectorAll(".word");
        gsap.fromTo(
          words,
          { opacity: 0.2 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.05,
            scrollTrigger: { trigger: p, start: "top 82%", end: "bottom 52%", scrub: 0.4 },
          },
        );
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

      // Images and fonts change heights after load; recompute positions once they are in.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      document.fonts?.ready.then(refresh);
      return () => window.removeEventListener("load", refresh);
    });
    return () => mm.revert();
  });

  // Mask reveals: one class per element when it is a little inside the screen.
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
