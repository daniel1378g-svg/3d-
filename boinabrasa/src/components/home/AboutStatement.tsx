// »Boi na brasa!« — what the name means, in letters that fill the screen, the words lighting up as you scroll.
// Then the family story and four numbers from the live site.
import { useEffect, useRef } from "react";
import { useSite } from "@/site";
import { gsap } from "@/lib/gsap";
import { BULL_OUTLINE, BULL_VIEWBOX } from "@/brand/bull";
import { Reveal } from "../Reveal";

export function AboutStatement() {
  const { t, reduce, go, href } = useSite();
  const words = useRef<HTMLParagraphElement>(null);
  const sec = useRef<HTMLElement>(null);
  useEffect(() => {
    if (reduce || !words.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-w]", { opacity: 0.16 }, {
        opacity: 1, stagger: 0.08, ease: "none",
        scrollTrigger: { trigger: words.current, start: "top 78%", end: "bottom 42%", scrub: 0.6 },
      });
      gsap.fromTo("[data-bull-bg]", { rotate: -8, scale: 0.9 }, { rotate: 6, scale: 1.08, ease: "none", scrollTrigger: { trigger: sec.current, start: "top bottom", end: "bottom top", scrub: true } });
    }, sec);
    return () => ctx.revert();
  }, [reduce, t]);
  return (
    <section ref={sec} id="ueber" data-anchor="ueber" className="skin-creme relative overflow-hidden py-24 md:py-36" aria-labelledby="about-title">
      <svg data-bull-bg viewBox={BULL_VIEWBOX} aria-hidden="true" className="pointer-events-none absolute -right-[12vw] top-10 h-[70vmin] w-auto text-vinho/[0.06]"><path d={BULL_OUTLINE} fill="currentColor" /></svg>
      <div className="gutter relative">
        <div className="wrap">
          <p className="kicker text-vinho-2" data-lang-stagger>{t.about.kicker}</p>
          <h2 id="about-title" className="display mt-4 text-[clamp(4.2rem,15vw,15rem)] text-vinho">
            <span className="serif-i normal-case text-[0.8em] text-brasa">»</span>{t.about.shout}<span className="serif-i normal-case text-[0.8em] text-brasa">«</span>
          </h2>
          <p ref={words} className="balance mt-8 max-w-[30ch] font-display text-[clamp(1.6rem,3.4vw,3.2rem)] font-bold leading-[1.12] text-tinta" style={{ fontStretch: "80%" }}>
            {t.about.shoutMeaning.split(" ").map((w, i) => <span key={i} data-w>{w} </span>)}
          </p>
          <div className="mt-16 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end">
            <Reveal className="flex flex-col gap-5 text-[1.12rem] leading-relaxed text-tinta/85">
              <p>{t.about.founded}</p>
              <p>{t.about.seats}</p>
              <a href={href("ueber")} onClick={(e) => { e.preventDefault(); go("ueber"); }} className="pill pill-dark self-start">{t.cta.learnMore}</a>
            </Reveal>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
              {t.about.stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 70} className="border-t-2 border-vinho/20 pt-3">
                  <dt className="kicker order-2 text-vinho-2">{s.label}</dt>
                  <dd className="display text-[clamp(3rem,6vw,5.2rem)] text-vinho tabular">{s.n}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
