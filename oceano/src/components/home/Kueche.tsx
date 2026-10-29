// Section 6: Unsere Küche. The live heading and paragraph, a collage of the restaurant's photos uncovering in
// their masks, the "Authentische Rezepte" sticker (the live words) turning with the scroll, and the booking buttons.
import { useEffect, useRef } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TX } from "@/content/site";
import { cutout, photo } from "@/content/photos";
import { useGsap } from "@/lib/useGsap";
import { useReduced } from "@/lib/useMedia";
import { MaskImage, SplitReveal } from "../Reveal";
import { LottieIcon } from "../lottie/LottieIcon";
import { IconArrow, IconPhone } from "../icons";
import { PillButton, PillLink } from "../ui/Pill";

export function RecipeSticker({ className }: { className?: string }) {
  const { lang } = useSite();
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
  const label = `${TX.sticker[lang]} ✱ `.repeat(3).toUpperCase();
  return (
    <div className={`relative grid aspect-square place-items-center rounded-full bg-destaque text-marca-escura ${className ?? ""}`}>
      <svg ref={ring} aria-hidden="true" viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <defs>
          <path id={`ring-${lang}`} d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
        </defs>
        <text fontFamily="Barlow Condensed" fontWeight="800" fontSize="18" letterSpacing="2.5" fill="currentColor">
          <textPath href={`#ring-${lang}`} textLength="486" lengthAdjust="spacing">
            {label}
          </textPath>
        </text>
      </svg>
      <LottieIcon name="pot" size={64} color="#1B1B1B" accent="#555555" />
      <span className="sr-only">{TX.sticker[lang]}</span>
    </div>
  );
}

const COLLAGE = ["schweinebauch", "steak-chips", "bacalhau-chips", "polvo", "steak-sauce"];
const LAYOUT = ["md:col-span-4 md:row-span-2 md:mt-0", "md:col-span-3 md:mt-24", "md:col-span-5 md:mt-8", "md:col-span-3 md:col-start-2 md:-mt-10", "md:col-span-4 md:mt-6"];

export function Kueche() {
  const { lang, book, href, go } = useSite();
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
    <section id="kueche" ref={root} className="relative overflow-hidden bg-acento py-24 text-branco md:py-36" aria-labelledby="ku-title">
      <img src={cutout("burger").src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="ct-fly pointer-events-none absolute left-0 top-[46%] z-10 w-[min(380px,44vw)] drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)]" />
      <div className="container-x relative">
        <p className="eyebrow text-fundo">06 / 16</p>
        <SplitReveal as="h2" id="ku-title" text={[UI.kueche[lang]]} className="mt-4 fs-mega font-extrabold" />
        <p className="mt-6 max-w-[860px] font-display text-[clamp(24px,2.4vw,38px)] font-semibold uppercase leading-[1.05]">{TX.kuecheH1[lang]}</p>
        <p className="mt-4 max-w-[760px] text-[clamp(17px,1.2vw,20px)] text-branco/90">
          {TX.kuecheP3[lang]} {TX.kuecheMeer[lang]} {TX.kuecheRezepte[lang]}
        </p>
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-5">
          {COLLAGE.map((id, i) => {
            const p = photo(id);
            return (
              <figure key={id} className={`ct-par ${LAYOUT[i]} ${i === 0 ? "col-span-2" : ""}`}>
                <MaskImage src={p.sm} srcSet={`${p.sm} 800w, ${p.src} 1600w`} sizes="(min-width: 768px) 33vw, 50vw" alt={p.alt[lang]} w={p.w} h={p.h} delay={i * 0.08} from={i % 2 ? "bottom" : "left"} className={`${i === 0 ? "arch aspect-[4/5]" : "aspect-[4/3] rounded-[20px]"} w-full`} />
              </figure>
            );
          })}
          <div className="col-span-2 flex flex-col justify-center gap-6 md:col-span-4 md:col-start-8 md:-mt-10">
            <div className="flex items-center gap-5">
              <RecipeSticker className="w-32 shrink-0 md:w-40" />
              <p className="text-lg leading-snug">{TX.kuecheVorbei[lang]}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <PillButton onClick={book}>{UI.reserve[lang]}</PillButton>
              <PillLink variant="cream" href={`tel:${BUSINESS.restaurant.tel}`} icon={<IconPhone size={18} />}>
                {BUSINESS.restaurant.phone}
              </PillLink>
            </div>
            <PillLink
              variant="ghost"
              href={href("kueche")}
              onClick={(e) => {
                e.preventDefault();
                go("kueche");
              }}
              iconRight={<IconArrow size={18} />}
              className="self-start text-branco"
            >
              {UI.kueche[lang]}
            </PillLink>
          </div>
        </div>
      </div>
    </section>
  );
}
