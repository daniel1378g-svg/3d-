// Who they are, in the facts the restaurant publishes: the address, the menu's shape, the opening days, the
// delivery area – and Google's "women-led" attribute. The badge from the site's logo leans in as it scrolls.
import { useEffect, useRef } from "react";
import { useSite } from "@/site";
import { gsap } from "@/lib/gsap";
import { asset } from "@/lib/utils";
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
                <Reveal key={s.label} delay={i * 80} className="flex flex-col border-t border-creme/15 pt-4">
                  <dt className="text-sm text-creme/75 [order:2]">{s.label}</dt>
                  <dd className="display text-[3.6rem] text-brasa [order:1]">{s.n}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
          <figure className="mx-auto w-full max-w-[460px]">
          <div ref={photo} className="relative">
            <div className="relative grid aspect-square place-items-center">
              <div aria-hidden="true" className="absolute inset-[6%] rotate-45 rounded-[48px] bg-mato" />
              <div aria-hidden="true" className="absolute inset-[22%] rotate-45 rounded-[32px] bg-[#f2c94c]" />
              <img src={asset("/brand/logo.webp")} alt="Picanha Brasil · Restaurante" width={297} height={270} className="relative w-[62%] drop-shadow-[0_24px_30px_rgba(0,0,0,0.45)]" />
            </div>
          </div>
          <figcaption className="mt-8 text-center font-display text-sm font-bold uppercase tracking-[0.14em] text-creme/80">Mattengasse 9 · 8005 Zürich</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
