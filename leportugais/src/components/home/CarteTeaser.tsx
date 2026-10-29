// Section 6: La carte, in coral. The four sections as numbered pills with their counts, a collage of the
// restaurant's dish photos uncovering in their masks, and the "Sans gluten" sticker, which turns with the scroll.
import { useEffect, useRef } from "react";
import { UI, type Lang } from "@/i18n";
import { useSite } from "@/site";
import { TEXT } from "@/content/site";
import { CARTE, SECTION_TITLES } from "@/content/carte";
import { cutout, photo } from "@/content/photos";
import { useGsap } from "@/lib/useGsap";
import { useReduced } from "@/lib/useMedia";
import { MaskImage, SplitReveal } from "../Reveal";
import { Counter } from "../Counter";
import { LottieIcon } from "../lottie/LottieIcon";
import { IconArrow } from "../icons";
import { PillLink } from "../ui/Pill";

export function GlutenSticker({ lang, className }: { lang: Lang; className?: string }) {
  const ring = useRef<SVGSVGElement>(null);
  const reduce = useReduced();
  // the sticker turns only while the page scrolls, so it never moves on its own
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => ring.current && (ring.current.style.transform = `rotate(${window.scrollY * 0.12}deg)`));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [reduce]);
  const label = `${UI.glutenSticker[lang]} ✱ `.repeat(3).toUpperCase();
  return (
    <div className={`group relative grid aspect-square place-items-center rounded-full bg-dourado text-vinho ${className ?? ""}`}>
      <svg ref={ring} aria-hidden="true" viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <defs>
          <path id={`ring-${lang}`} d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
        </defs>
        <text fontFamily="Barlow Condensed" fontWeight="800" fontSize="19" letterSpacing="2.5" fill="currentColor">
          <textPath href={`#ring-${lang}`} textLength="486" lengthAdjust="spacing">
            {label}
          </textPath>
        </text>
      </svg>
      <LottieIcon name="nowheat" size={64} color="#5A1626" accent="#A22E1E" />
      <span className="sr-only">{UI.glutenSticker[lang]}</span>
    </div>
  );
}

const COLLAGE = ["plats-du-jour-plainpalais", "fruits-de-mer-plainpalais-geneve", "specialites-fruits-de-mer-plainpalais", "restaurant-plats-du-jour-plainpalais-1", "restaurant-plainpalais"];

export function CarteTeaser() {
  const { lang, href, go } = useSite();
  const root = useRef<HTMLElement>(null);
  const reduce = useReduced();

  useGsap(
    (gsap) => {
      gsap.fromTo(".ct-fly", { xPercent: -30, yPercent: 20, rotate: -10 }, { xPercent: 260, yPercent: -40, rotate: 12, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".ct-par").forEach((el, i) => {
        gsap.fromTo(el, { yPercent: 6 + i * 3 }, { yPercent: -6 - i * 3, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
    },
    root,
    [reduce],
    !reduce,
  );

  return (
    <section id="carte" ref={root} className="relative overflow-hidden bg-coral py-24 text-branco md:py-36" aria-labelledby="ct-title">
      <img src={cutout("travessa").src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="ct-fly pointer-events-none absolute left-0 top-[46%] z-10 w-[min(420px,48vw)] drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)]" />
      <div className="container-x">
        <p className="eyebrow text-sal">06 / 15 · {CARTE.reduce((n, s) => n + s.dishes.length, 0)} {UI.dishes[lang]}</p>
        <SplitReveal as="h2" id="ct-title" text={[UI.carte[lang]]} className="mt-4 fs-mega font-extrabold" />
        <ul className="mt-10 flex list-none flex-wrap gap-2.5">
          {CARTE.map((s, i) => (
            <li key={s.id}>
              <a
                href={href("carte", s.id)}
                onClick={(e) => {
                  e.preventDefault();
                  go("carte", s.id);
                }}
                className="roll-host group flex items-center gap-3 rounded-full bg-branco/10 py-2 pl-2 pr-5 font-display text-[16px] font-semibold uppercase tracking-[0.12em] shadow-[inset_0_0_0_1.5px_rgba(255,250,242,0.4)] transition-colors hover:bg-branco hover:text-coral"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-dourado text-[14px] text-tinta">0{i + 1}</span>
                <span className="btn-roll">
                  <span>{SECTION_TITLES[s.id].short[lang]}</span>
                  <span aria-hidden="true">{SECTION_TITLES[s.id].short[lang]}</span>
                </span>
                <Counter to={s.dishes.length} className="rounded-full bg-tinta/25 px-2 py-0.5 text-[13px]" />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-5">
          {COLLAGE.map((id, i) => {
            const p = photo(id);
            const layout = ["md:col-span-4 md:row-span-2 md:mt-0", "md:col-span-3 md:mt-24", "md:col-span-5 md:mt-8", "md:col-span-3 md:col-start-2 md:-mt-10", "md:col-span-4 md:mt-6"][i];
            return (
              <figure key={id} className={`ct-par ${layout} ${i === 0 ? "col-span-2" : ""}`}>
                <MaskImage src={p.sm} srcSet={`${p.sm} 640w, ${p.src} 1200w`} sizes="(min-width: 768px) 33vw, 50vw" alt={p.alt[lang]} w={p.w} h={p.h} delay={i * 0.08} from={i % 2 ? "bottom" : "left"} className={`${i === 0 ? "arch aspect-[4/5]" : "aspect-[4/3] rounded-[20px]"} w-full`} />
              </figure>
            );
          })}
          <div className="col-span-2 flex flex-col justify-center gap-6 md:col-span-4 md:col-start-8 md:-mt-10">
            <div className="flex items-center gap-5">
              <GlutenSticker lang={lang} className="w-32 shrink-0 md:w-40" />
              <p className="text-lg leading-snug">{TEXT.gluten[lang]}</p>
            </div>
            <PillLink
              variant="cream"
              href={href("carte")}
              onClick={(e) => {
                e.preventDefault();
                go("carte");
              }}
              iconRight={<IconArrow size={18} />}
              className="self-start"
            >
              {UI.seeCarte[lang]}
            </PillLink>
          </div>
        </div>
      </div>
    </section>
  );
}
