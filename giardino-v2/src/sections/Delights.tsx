// "Culinary delights": the restaurant's own text, a collage of its photographs uncovering in their masks with a
// gentle parallax, the turning stamp "pizza dough · fresh every day", three facts and a handwritten note.
import { useRef } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/copy";
import { BUSINESS } from "@/content/business";
import { useGsap } from "@/lib/useGsap";
import { useFinePointer, useReduced } from "@/lib/useMedia";
import { MaskPhoto, SplitReveal, FadeIn } from "@/components/Reveal";
import { PillButton, PillLink } from "@/components/ui/Pill";
import { IconArrow } from "@/components/icons";
import { Stamp, Cutout } from "@/components/Illustrations";
import { Medallion } from "@/components/Brand";

const COLLAGE = [
  { id: "starter-salmon", cls: "col-span-2 md:col-span-5 md:row-span-2", shape: "arch aspect-[4/5]", from: "bottom" as const },
  { id: "detail-bottle-light", cls: "md:col-span-3 md:mt-24", shape: "aspect-[3/4] rounded-[20px]", from: "left" as const },
  { id: "dish-pesto", cls: "md:col-span-4 md:mt-8", shape: "aspect-[4/3] rounded-[20px]", from: "bottom" as const },
  { id: "interior-bar", cls: "md:col-span-4 md:col-start-6 md:-mt-8", shape: "aspect-[4/3] rounded-[20px]", from: "right" as const },
  { id: "dish-lasagne", cls: "md:col-span-3 md:mt-10", shape: "aspect-square rounded-[20px]", from: "bottom" as const },
];

export function Delights({ compact = false }: { compact?: boolean }) {
  const { lang, book, href, go } = useSite();
  const root = useRef<HTMLElement>(null);
  const reduce = useReduced();
  const fine = useFinePointer();
  useGsap(
    (gsap) => {
      gsap.utils.toArray<HTMLElement>(".dl-par").forEach((el, i) => {
        gsap.fromTo(el, { yPercent: 5 + (i % 3) * 3 }, { yPercent: -5 - (i % 3) * 3, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
      gsap.fromTo(".dl-fly", { xPercent: -20, yPercent: 30, rotate: -12 }, { xPercent: 180, yPercent: -40, rotate: 14, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    },
    root,
    [reduce, fine],
    !reduce,
  );
  const facts = [
    { t: TX.factDough[lang], d: TX.pizzaLine[lang] },
    { t: TX.factBread[lang], d: TX.factBreadText[lang] },
    { t: TX.factWir[lang], d: TX.factWirText[lang], href: BUSINESS.wir },
  ];
  return (
    <section id="delights" data-anchor data-nav="delights" ref={root} className="tex-leaf relative overflow-hidden bg-olive py-24 text-white md:py-36" aria-labelledby="delights-title">
      <Cutout name="tomato" className="dl-fly pointer-events-none absolute left-0 top-[44%] z-10 w-[min(150px,22vw)] drop-shadow-[0_24px_30px_rgba(0,0,0,0.35)]" />
      <div className="container-x relative">
        <p className="eyebrow text-gold">Cucina</p>
        <SplitReveal as="h2" id="delights-title" text={TX.delightsTitle[lang]} className="mt-4 fs-xxl font-extrabold" />
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
          <FadeIn as="p" className="lede text-white/92">
            {TX.delights1[lang]}
          </FadeIn>
          <FadeIn as="p" delay={0.1} className="lede text-white/92">
            {TX.delights2[lang]}
          </FadeIn>
        </div>
        {!compact && (
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-5">
            {COLLAGE.map((c, i) => (
              <figure key={c.id} className={`dl-par ${c.cls} m-0`}>
                <MaskPhoto id={c.id} sizes="(min-width: 768px) 40vw, 50vw" delay={i * 0.08} from={c.from} className={`${c.shape} w-full`} />
              </figure>
            ))}
          </div>
        )}
        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[auto_minmax(0,1fr)]">
          <div className="flex items-center gap-6">
            <Stamp text={TX.stampDough[lang]} className="w-36 shrink-0 md:w-44">
              <Medallion className="h-[50%] w-[50%]" />
            </Stamp>
            <p className="max-w-[260px] font-hand text-[30px] leading-[1.05] text-gold">{TX.winesHand[lang]}</p>
          </div>
          <ul className="grid list-none gap-4 sm:grid-cols-3">
            {facts.map((f, i) => (
              <FadeIn as="li" key={f.t} delay={i * 0.08} className="rounded-[22px] bg-white/[0.08] p-5">
                <p className="font-display text-[22px] font-extrabold uppercase leading-none text-gold">{f.t}</p>
                <p className="mt-2 text-[15px] leading-snug text-white/90">{f.d}</p>
                {f.href && (
                  <a href={f.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center text-[14px] text-cream">
                    <span className="link">wir.ch</span>
                    <span className="sr-only"> ({UI.newTab[lang]})</span>
                  </a>
                )}
              </FadeIn>
            ))}
          </ul>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <PillLink
            href={href("menu")}
            onClick={(e) => {
              e.preventDefault();
              go("menu");
            }}
            iconRight={<IconArrow size={18} />}
          >
            {UI.exploreMenu[lang]}
          </PillLink>
          <PillButton variant="ghost" className="text-white" onClick={book}>
            {UI.reserve[lang]}
          </PillButton>
        </div>
      </div>
    </section>
  );
}
