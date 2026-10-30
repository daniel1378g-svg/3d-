// Bubble Waffeln & Frappés: the homepage's newest offer, on warm waffle tones against plum. Manna's own promo image
// (with its own text, left untouched) leans into view; the three points restate the homepage's wording. The examples
// (fruit, ice cream, chocolate toppings) are quoted as examples, never as a list of options.
import { useEffect, useRef } from "react";
import { useSite } from "@/site";
import { gsap } from "@/lib/gsap";
import { Img } from "../Img";
import { Reveal } from "../Reveal";
import { IconArrow, IconPin } from "../icons";

export function Waffles() {
  const { t, reduce, go, href } = useSite();
  const w = t.waffles;
  const promo = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduce || !promo.current) return;
    const tw = gsap.fromTo(promo.current, { rotate: 8, yPercent: 10 }, { rotate: -3, yPercent: -6, ease: "none", scrollTrigger: { trigger: promo.current, start: "top bottom", end: "bottom top", scrub: true } });
    return () => { tw.scrollTrigger?.kill(); tw.kill(); };
  }, [reduce]);
  return (
    <section id="waffeln" data-anchor="waffeln" className="relative overflow-hidden bg-waffle py-24 text-ink md:py-32" aria-labelledby="waffles-title">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 bottom-0 h-[420px] w-[420px] rounded-full bg-plum opacity-15" />
      <div className="gutter relative">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="kicker text-plum-2" data-lang-stagger>{w.kicker}</p>
            <h2 id="waffles-title" className="display mt-3 text-[clamp(3.2rem,8vw,8rem)] text-plum-2">{w.title}</h2>
            <p className="lead mt-5 max-w-[40rem] text-ink/90">{w.lead}</p>
            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {w.points.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 70} className="rounded-[var(--radius-card)] bg-cream p-5 shadow-[0_18px_40px_-26px_rgba(36,16,40,0.6)]">
                  <h3 className="font-display text-[1.25rem] font-extrabold leading-tight text-plum">{p.title}</h3>
                  <p className="mt-2 text-[0.95rem] text-ink/85">{p.text}</p>
                </Reveal>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink/80">{w.examplesNote}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="pill" href={href("angebot")} onClick={(e) => { e.preventDefault(); go("angebot"); }}>{t.cta.explore}<IconArrow size={17} className="arrow" /></a>
              <a className="pill pill-cream" href={`${href("home")}#besuch`} onClick={(e) => { e.preventDefault(); go("home", { anchor: "besuch" }); }}><IconPin size={17} />{t.cta.findUs}</a>
            </div>
          </div>
          <figure ref={promo} className="mx-auto w-full max-w-[380px]">
            <div className="overflow-hidden rounded-[var(--radius-xl2)] bg-cream p-3 shadow-[0_40px_80px_-30px_rgba(36,16,40,0.7)]">
              <Img id="promo-bubble-waffle" alt={w.promoAlt} sizes="380px" fit="contain" className="aspect-[576/1056] w-full rounded-[30px]" />
            </div>
            <figcaption className="mt-3 text-center text-xs text-ink/80">{w.promoCaption}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
