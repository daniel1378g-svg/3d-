// Who they are, in the facts the restaurant publishes: the address, the menu's shape, the opening days, the
// delivery area – and Google's "women-led" attribute. The facade photo leans in as it scrolls.
import { useEffect, useRef } from "react";
import { useSite } from "@/site";
import { gsap } from "@/lib/gsap";
import { Img } from "../Img";
import { Reveal } from "../Reveal";

export function About() {
  const { t, reduce } = useSite();
  const photo = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduce || !photo.current) return;
    const tw = gsap.fromTo(photo.current, { rotate: -6, yPercent: 12 }, { rotate: 2, yPercent: -8, ease: "none", scrollTrigger: { trigger: photo.current, start: "top bottom", end: "bottom top", scrub: true } });
    return () => { tw.scrollTrigger?.kill(); tw.kill(); };
  }, [reduce]);
  return (
    <section className="skin-carvao relative overflow-hidden py-24 md:py-32" aria-labelledby="about-title">
      <div className="gutter">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="kicker text-ouro" data-lang-stagger>{t.about.kicker}</p>
            <h2 id="about-title" className="display mt-3 text-[clamp(3rem,7.4vw,7.4rem)]">{t.about.title}</h2>
            <p className="lead mt-6 max-w-[44rem] text-creme/85">{t.about.body}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-mato-2 px-4 py-2 text-sm text-creme/90">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ouro" />{t.about.womenLed}
            </p>
            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {t.about.stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 80} className="border-t border-creme/15 pt-4">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="display block text-[3.6rem] text-brasa" aria-hidden="true">{s.n}</span>
                    <span className="text-sm text-creme/75">{s.n} {s.label}</span>
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
          <div ref={photo} className="relative mx-auto w-full max-w-[460px]">
            <div className="rounded-[30px] bg-creme p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
              <Img id="fachada" sizes="(min-width: 1024px) 460px, 90vw" className="aspect-[680/516] w-full rounded-[22px]" />
              <p className="px-2 pb-1 pt-3 font-display text-sm font-bold uppercase tracking-[0.14em] text-tinta">Mattengasse 9 · 8005 Zürich</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
