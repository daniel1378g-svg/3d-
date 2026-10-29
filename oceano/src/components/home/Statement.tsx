// Section 8: "Dabei haben wir so viel mehr als nur Burger zu bieten." set huge on the sand, lighting up word by
// word as you scroll (25% to 100% opacity). A burger illustration turns once into a pastel de nata, a restaurant
// photo uncovers inside an arch, and cut-outs drift.
import { useRef } from "react";
import { useSite } from "@/site";
import { TX } from "@/content/site";
import { cutout, photo } from "@/content/photos";
import { useGsap } from "@/lib/useGsap";
import { useReduced } from "@/lib/useMedia";
import { MaskImage } from "../Reveal";
import { Burger, PastelDeNata } from "../Illustrations";

export function Statement() {
  const { lang } = useSite();
  const root = useRef<HTMLElement>(null);
  const reduce = useReduced();
  const pic = photo("platte-wein");

  useGsap(
    (gsap) => {
      gsap.fromTo(".st-word", { opacity: 0.25 }, { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: ".st-text", start: "top 80%", end: "bottom 45%", scrub: true } });
      // the burger turns once into a pastel de nata as the band comes in
      const flip = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 60%", once: true } });
      flip.fromTo(".st-burger", { rotateY: 0, autoAlpha: 1 }, { rotateY: 90, autoAlpha: 0, duration: 0.6, ease: "power2.in", delay: 0.6 }).fromTo(".st-nata", { rotateY: -90, autoAlpha: 0 }, { rotateY: 0, autoAlpha: 1, duration: 0.7, ease: "back.out(1.6)" });
      gsap.fromTo(".st-fly-a", { yPercent: 60, rotate: -8 }, { yPercent: -80, rotate: 8, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(".st-fly-b", { yPercent: 120, rotate: 6 }, { yPercent: -140, rotate: -6, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    },
    root,
    [reduce, lang],
    !reduce,
  );

  const words = TX.statement[lang].split(" ");
  return (
    <section ref={root} className="relative overflow-hidden bg-destaque py-24 text-acento-escuro md:py-40" aria-label={TX.statement[lang]}>
      <div aria-hidden="true" className="pointer-events-none absolute left-[3%] top-6 w-[min(170px,28vw)] [perspective:800px] md:top-10">
        <Burger className="st-burger w-full" />
        <PastelDeNata className="st-nata invisible absolute inset-0 w-full" />
      </div>
      <img src={cutout("bacalhau").src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="st-fly-a pointer-events-none absolute right-[4%] top-[8%] w-[min(200px,26vw)] opacity-95 rm-hide max-sm:hidden" />
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
        <MaskImage src={pic.sm} srcSet={`${pic.sm} 800w, ${pic.src} 1600w`} sizes="(min-width: 1024px) 28vw, 90vw" alt={pic.alt[lang]} w={pic.w} h={pic.h} className="arch-full aspect-[3/4] w-full max-w-[400px] justify-self-center" />
      </div>
    </section>
  );
}
