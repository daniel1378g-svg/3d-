// Section 8: the home page's wine line set huge on the buttons' gold, lighting up word by word as you scroll
// (25% to 100% opacity). Two glasses clink once, the wine photo uncovers inside an arch, and cut-outs drift.
import { useRef } from "react";
import { useSite } from "@/site";
import { TEXT } from "@/content/site";
import { cutout, photo } from "@/content/photos";
import { useGsap } from "@/lib/useGsap";
import { useReduced } from "@/lib/useMedia";
import { MaskImage } from "../Reveal";
import { Glasses } from "../Illustrations";

export function Statement() {
  const { lang } = useSite();
  const root = useRef<HTMLElement>(null);
  const reduce = useReduced();
  const wine = photo("vin-bouteille");

  useGsap(
    (gsap) => {
      gsap.fromTo(".st-word", { opacity: 0.25 }, { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: ".st-text", start: "top 80%", end: "bottom 45%", scrub: true } });
      // the glasses clink once as the band comes in
      gsap.fromTo(".st-glass", { rotate: -18, scale: 0.8, autoAlpha: 0 }, { rotate: 0, scale: 1, autoAlpha: 1, duration: 0.9, ease: "back.out(2.4)", scrollTrigger: { trigger: root.current, start: "top 65%", once: true } });
      gsap.fromTo(".st-fly-a", { yPercent: 60, rotate: -8 }, { yPercent: -80, rotate: 8, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(".st-fly-b", { yPercent: 120, rotate: 6 }, { yPercent: -140, rotate: -6, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    },
    root,
    [reduce, lang],
    !reduce,
  );

  const words = TEXT.statement[lang].split(" ");
  return (
    <section ref={root} className="relative overflow-hidden bg-destaque py-24 text-acento-escuro md:py-40" aria-label={TEXT.wineTitle[lang]}>
      <Glasses className="st-glass pointer-events-none absolute left-[3%] top-6 w-[min(150px,26vw)] rm-hide md:top-10" />
      <img src={cutout("calamares").src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="st-fly-a pointer-events-none absolute right-[4%] top-[8%] w-[min(200px,26vw)] opacity-95 rm-hide max-sm:hidden" />
      <img src={cutout("polvo").src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="st-fly-b pointer-events-none absolute bottom-[6%] left-[3%] w-[min(180px,24vw)] blur-[1px] rm-hide" />
      {/* relative: the words and the photo stay in front of the cut-outs */}
      <div className="container-x relative grid items-center gap-12 pt-16 md:pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,28vw)]">
        <p className="st-text display font-display text-[clamp(32px,5vw,92px)] font-extrabold uppercase leading-[0.95] tracking-[-0.01em] text-balance">
          {words.map((w, i) => (
            <span key={i} className="st-word">
              {w}{" "}
            </span>
          ))}
        </p>
        <MaskImage src={wine.sm} srcSet={`${wine.sm} 640w, ${wine.src} 1200w`} sizes="(min-width: 1024px) 28vw, 90vw" alt={wine.alt[lang]} w={wine.w} h={wine.h} className="arch-full aspect-[3/4] w-full max-w-[400px] justify-self-center" />
      </div>
    </section>
  );
}
