// Section 8: the founding sentence set huge in port wine on gold, lighting up word by word as you scroll.
// A bacalhau swims across once; a room photo uncovers inside an arch.
import { useRef } from "react";
import { useSite } from "@/site";
import { TEXT } from "@/content/site";
import { cutout, photo } from "@/content/photos";
import { useGsap } from "@/lib/useGsap";
import { useReduced } from "@/lib/useMedia";
import { MaskImage } from "../Reveal";
import { Bacalhau } from "../Illustrations";

export function Statement() {
  const { lang } = useSite();
  const root = useRef<HTMLElement>(null);
  const reduce = useReduced();
  const room = photo("gastronomie-portugaise-geneve");

  useGsap(
    (gsap) => {
      gsap.fromTo(".st-word", { color: "#975a3b" }, { color: "#5a1626", ease: "none", stagger: 0.1, scrollTrigger: { trigger: ".st-text", start: "top 80%", end: "bottom 45%", scrub: true } });
      gsap.fromTo(".st-cod", { x: () => -window.innerWidth * 0.5, y: 0, rotate: -4 }, { x: () => window.innerWidth * 1.1, y: -80, rotate: 6, ease: "none", scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 20%", scrub: 0.8 } });
      gsap.fromTo(".st-fly-a", { yPercent: 60, rotate: -8 }, { yPercent: -80, rotate: 8, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(".st-fly-b", { yPercent: 120, rotate: 6 }, { yPercent: -140, rotate: -6, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    },
    root,
    [reduce, lang],
    !reduce,
  );

  const words = TEXT.statement[lang].split(" ");
  return (
    <section ref={root} className="relative overflow-hidden bg-dourado py-24 text-vinho md:py-40" aria-label="1973">
      <Bacalhau className="st-cod pointer-events-none absolute left-0 top-4 w-[min(520px,52vw)] rm-hide md:top-[8%] md:w-[min(520px,70vw)]" />
      <img src={cutout("batatas").src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="st-fly-a pointer-events-none absolute right-[6%] top-[12%] w-[min(160px,22vw)] opacity-95 rm-hide max-sm:hidden" />
      <img src={cutout("tomates").src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="st-fly-b pointer-events-none absolute bottom-[8%] left-[4%] w-[min(140px,20vw)] blur-[1px] rm-hide" />
      {/* relative: the words and the photo stay in front of the fish and the cut-outs */}
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(260px,28vw)]">
        <p className="st-text display font-display text-[clamp(32px,5.2vw,96px)] font-extrabold uppercase leading-[0.95] tracking-[-0.01em] text-balance">
          {words.map((w, i) => (
            <span key={i} className="st-word">
              {w}{" "}
            </span>
          ))}
        </p>
        <MaskImage src={room.sm} srcSet={`${room.sm} 640w, ${room.src} 1200w`} sizes="(min-width: 1024px) 28vw, 90vw" alt={room.alt[lang]} w={room.w} h={room.h} className="arch-full aspect-[3/4] w-full max-w-[420px] justify-self-center" />
      </div>
    </section>
  );
}
