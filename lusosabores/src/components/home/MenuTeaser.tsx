// Section 6: Le menu, in acento. The five groups as numbered pills with their tile counts (each opening its
// group on the menu page), a collage of the restaurant's dish photos uncovering in their masks, and the "Sur
// place ou à l'emporter" sticker, which turns only while the page scrolls.
import { useEffect, useRef } from "react";
import { UI, type Lang } from "@/i18n";
import { useSite } from "@/site";
import { MAIN_GROUPS, TEXT, TILES, tilesOf } from "@/content/site";
import { cutout, photo, srcSet } from "@/content/photos";
import { useGsap } from "@/lib/useGsap";
import { useReduced } from "@/lib/useMedia";
import { MaskImage, SplitReveal } from "../Reveal";
import { Counter } from "../Counter";
import { LottieIcon } from "../lottie/LottieIcon";
import { IconArrow } from "../icons";
import { PillLink } from "../ui/Pill";

export function TakeawaySticker({ lang, className }: { lang: Lang; className?: string }) {
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
  const label = `${UI.takeawaySticker[lang]} ✱ `.repeat(2).toUpperCase();
  return (
    <div className={`group relative grid aspect-square place-items-center rounded-full bg-destaque text-marca-escura ${className ?? ""}`}>
      <svg ref={ring} aria-hidden="true" viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <defs>
          <path id={`ring-${lang}`} d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
        </defs>
        <text fontFamily="Barlow Condensed" fontWeight="800" fontSize="17" letterSpacing="2" fill="currentColor">
          <textPath href={`#ring-${lang}`} textLength="486" lengthAdjust="spacing">
            {label}
          </textPath>
        </text>
      </svg>
      <LottieIcon name="bag" size={64} color="#310B0A" accent="#931A25" />
      <span className="sr-only">{UI.takeawaySticker[lang]}</span>
    </div>
  );
}

const COLLAGE = ["picanha", "bacalhau-lagareiro", "francesinha", "salada-polvo", "frango-churrasco"];

export function MenuTeaser() {
  const { lang, href, go } = useSite();
  const root = useRef<HTMLElement>(null);
  const reduce = useReduced();

  useGsap(
    (gsap) => {
      gsap.fromTo(".mt-fly", { xPercent: -30, yPercent: 20, rotate: -10 }, { xPercent: 260, yPercent: -40, rotate: 12, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".mt-par").forEach((el, i) => {
        gsap.fromTo(el, { yPercent: 6 + i * 3 }, { yPercent: -6 - i * 3, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
    },
    root,
    [reduce],
    !reduce,
  );

  return (
    <section id="menu" ref={root} className="relative overflow-hidden bg-acento py-24 text-marca-escura md:py-36" aria-labelledby="mt-title">
      <img src={cutout("picanha").src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="mt-fly pointer-events-none absolute left-0 top-[44%] z-10 w-[min(360px,44vw)] drop-shadow-[0_30px_40px_rgba(49,11,10,0.4)] rm-hide" />
      <div className="container-x">
        <p className="eyebrow">
          06 / 15 · {TILES.length} {UI.photos[lang]}
        </p>
        <SplitReveal as="h2" id="mt-title" text={[UI.leMenu[lang]]} className="mt-4 fs-mega font-extrabold text-branco [text-shadow:0_2px_0_rgba(49,11,10,0.08)]" />
        <ul className="mt-10 flex list-none flex-wrap gap-2.5">
          {MAIN_GROUPS.map((g, i) => (
            <li key={g.id}>
              <a
                href={href("menu", g.id)}
                onClick={(e) => {
                  e.preventDefault();
                  go("menu", g.id);
                }}
                className="roll-host group flex items-center gap-3 rounded-full bg-branco/25 py-2 pl-2 pr-5 font-display text-[16px] font-semibold uppercase tracking-[0.12em] shadow-[inset_0_0_0_1.5px_rgba(49,11,10,0.25)] transition-colors hover:bg-marca-escura hover:text-branco"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-marca-escura text-[14px] text-destaque">0{i + 1}</span>
                <span className="btn-roll">
                  <span lang="pt-PT">{g.pt}</span>
                  <span aria-hidden="true">{g.local[lang]}</span>
                </span>
                <Counter to={tilesOf(g.id).length} className="rounded-full bg-marca-escura/15 px-2 py-0.5 text-[13px]" />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-5">
          {COLLAGE.map((id, i) => {
            const p = photo(id);
            const layout = ["md:col-span-4 md:row-span-2 md:mt-0", "md:col-span-3 md:mt-24", "md:col-span-5 md:mt-8", "md:col-span-3 md:col-start-2 md:-mt-10", "md:col-span-4 md:mt-6"][i];
            return (
              <figure key={id} className={`mt-par ${layout} ${i === 0 ? "col-span-2" : ""}`}>
                <MaskImage src={p.sm} srcSet={srcSet(p)} sizes="(min-width: 768px) 33vw, 50vw" alt={p.alt[lang]} w={p.w} h={p.h} delay={i * 0.08} from={i % 2 ? "bottom" : "left"} className={`${i === 0 ? "arch aspect-[4/5]" : "aspect-[4/3] rounded-[20px]"} w-full`} />
                <figcaption lang="pt-PT" className="dish-name mt-2 font-display text-[15px] font-semibold uppercase tracking-[0.1em]">
                  {p.dish}
                </figcaption>
              </figure>
            );
          })}
          <div className="col-span-2 flex flex-col justify-center gap-6 md:col-span-4 md:col-start-8 md:-mt-10">
            <div className="flex items-center gap-5">
              <TakeawaySticker lang={lang} className="w-32 shrink-0 md:w-40" />
              <p className="text-lg font-bold leading-snug">{TEXT.takeaway[lang]}</p>
            </div>
            <PillLink
              variant="dark"
              href={href("menu")}
              onClick={(e) => {
                e.preventDefault();
                go("menu");
              }}
              iconRight={<IconArrow size={18} />}
              className="self-start"
            >
              {UI.discoverMenu[lang]}
            </PillLink>
          </div>
        </div>
      </div>
    </section>
  );
}
