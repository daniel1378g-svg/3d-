// The gold statement: one sentence of the restaurant's in huge letters, each word lighting up from 25 % to full opacity
// as you scroll. A terrace photograph uncovers inside an arch, drawn ingredients drift.
import { useRef } from "react";
import { useSite } from "@/site";
import { TX } from "@/content/copy";
import { useGsap } from "@/lib/useGsap";
import { useReduced } from "@/lib/useMedia";
import { MaskPhoto } from "@/components/Reveal";

export function Statement() {
  const { lang } = useSite();
  const root = useRef<HTMLElement>(null);
  const reduce = useReduced();
  useGsap(
    (gsap) => {
      gsap.fromTo(".st-word", { opacity: 0.25 }, { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: ".st-text", start: "top 80%", end: "bottom 45%", scrub: true } });
    },
    root,
    [reduce, lang],
    !reduce,
  );
  const words = TX.statement[lang].split(" ");
  return (
    <section ref={root} id="statement" data-anchor className="relative overflow-hidden bg-gold py-24 text-ink md:py-40" aria-label={TX.statement[lang]}>
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(260px,28vw)]">
        <p aria-hidden="true" className="st-text display font-display text-[clamp(36px,5.4vw,100px)] font-extrabold uppercase leading-[0.95] tracking-[-0.01em] text-balance">
          {words.map((w, i) => (
            <span key={i} className="st-word">
              {w}{" "}
            </span>
          ))}
        </p>
        <MaskPhoto id="terrace-view" sizes="(min-width: 1024px) 28vw, 90vw" className="arch-full aspect-[3/4] w-full max-w-[420px] justify-self-center" focus="48% 60%" />
      </div>
    </section>
  );
}
