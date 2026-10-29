// Section 8: "Chez LusoSabores, découvrez des grillades comme vous n'en avez jamais mangé..." set huge in
// acento-escuro on destaque, lighting up word by word as you scroll (from #A26650, the palest tone that keeps 3:1, to
// full acento-escuro: 25 % opacity would fail contrast). A grill with its flames
// crosses once; a grill dish uncovers inside an arch; cut-outs drift.
import { useRef } from "react";
import { useSite } from "@/site";
import { TEXT } from "@/content/site";
import { cutout, photo, srcSet } from "@/content/photos";
import { useGsap } from "@/lib/useGsap";
import { useReduced } from "@/lib/useMedia";
import { MaskImage } from "../Reveal";
import { Grill } from "../Illustrations";

export function Statement() {
  const { lang } = useSite();
  const root = useRef<HTMLElement>(null);
  const reduce = useReduced();
  const dish = photo("grelhada-mista");

  useGsap(
    (gsap) => {
      gsap.fromTo(".st-word", { color: "#A26650" }, { color: "#6B2B2C", ease: "none", stagger: 0.1, scrollTrigger: { trigger: ".st-text", start: "top 80%", end: "bottom 45%", scrub: true } });
      gsap.fromTo(".st-grill", { x: () => -window.innerWidth * 0.5, y: 0, rotate: -4 }, { x: () => window.innerWidth * 1.1, y: -60, rotate: 5, ease: "none", scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 20%", scrub: 0.8 } });
      gsap.fromTo(".st-fly-a", { yPercent: 60, rotate: -8 }, { yPercent: -80, rotate: 8, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(".st-fly-b", { yPercent: 120, rotate: 6 }, { yPercent: -140, rotate: -6, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    },
    root,
    [reduce, lang],
    !reduce,
  );

  const words = TEXT.qui1[lang].split(" ");
  return (
    <section ref={root} className="relative overflow-hidden bg-destaque py-24 text-acento-escuro md:py-40" aria-label={TEXT.qui1[lang]}>
      <Grill className="st-grill pointer-events-none absolute left-0 top-2 w-[min(300px,40vw)] rm-hide md:top-[4%]" />
      <img src={cutout("frango-prato").src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="st-fly-a pointer-events-none absolute right-[5%] top-[10%] w-[min(200px,26vw)] opacity-95 rm-hide max-sm:hidden" />
      <img src={cutout("picanha").src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="st-fly-b pointer-events-none absolute bottom-[6%] left-[3%] w-[min(160px,22vw)] blur-[1px] rm-hide" />
      {/* relative: the words and the photo stay in front of the grill and the cut-outs */}
      <div className="container-x relative grid items-center gap-12 pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(260px,26vw)]">
        <p aria-hidden="true" className="st-text display font-display text-[clamp(34px,5.6vw,104px)] font-extrabold uppercase leading-[0.94] tracking-[-0.01em] text-balance">
          {words.map((w, i) => (
            <span key={i} className="st-word">
              {w}{" "}
            </span>
          ))}
        </p>
        <MaskImage src={dish.sm} srcSet={srcSet(dish)} sizes="(min-width: 1024px) 26vw, 90vw" alt={dish.alt[lang]} w={dish.w} h={dish.h} className="arch-full aspect-[3/4] w-full max-w-[400px] justify-self-center" />
      </div>
    </section>
  );
}
