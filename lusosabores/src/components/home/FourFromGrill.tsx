// Section 3: the four from the grill, pinned like HOY!'s burrito scene. Copy on the left (the dish name as a
// giant title and its group in the visitor's language, no price: the live site shows none); on the right an
// arch-topped frame where four dishes wipe in as you scroll, with a counter. Cut-outs drift behind at three
// depths, and on the Picanha an illustrated flame licks over the top of the frame on hover or tap.
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { UI, type Lang } from "@/i18n";
import { useSite } from "@/site";
import { GROUPS, tileById, type Tile } from "@/content/site";
import { cutout, photo, srcSet } from "@/content/photos";
import { useGsap } from "@/lib/useGsap";
import { useIsDesktop, useReduced } from "@/lib/useMedia";
import { cn } from "@/lib/utils";
import { Flame } from "../Illustrations";
import { PillLink } from "../ui/Pill";
import { IconArrow } from "../icons";

const FOUR = ["picanha", "grelhada-mista", "frango-de-churrasco", "secretos-de-porco-preto-c-arroz-feijao"];
const groupOf = (t: Tile, lang: Lang) => GROUPS.find((g) => g.id === t.group)!.local[lang];

function Visual({ tile, lang }: { tile: Tile; lang: Lang }) {
  const p = photo(tile.photo);
  return <img src={p.src} srcSet={srcSet(p)} sizes="(min-width: 1024px) 520px, 90vw" alt={p.alt[lang]} width={p.w} height={p.h} loading="lazy" className="h-full w-full object-cover" />;
}

function Copy({ tile, lang, i }: { tile: Tile; lang: Lang; i: number }) {
  return (
    <div>
      <p className="eyebrow text-destaque">
        {UI.grillEyebrow[lang]} <span className="text-suave">· 0{i + 1} / 04</span>
      </p>
      <h3 lang="pt-PT" className="dish-name mt-4 font-display text-[clamp(44px,5.8vw,108px)] font-extrabold uppercase leading-[0.88] [hyphens:manual]">
        {tile.name}
      </h3>
      <p className="mt-5 font-display text-[clamp(22px,1.8vw,30px)] font-semibold uppercase tracking-[0.08em] text-suave">{groupOf(tile, lang)}</p>
    </div>
  );
}

export function FourFromGrill() {
  const { lang, href, go } = useSite();
  const desktop = useIsDesktop();
  const reduce = useReduced();
  const tiles = FOUR.map(tileById);
  const track = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [lick, setLick] = useState(false);

  useGsap(
    (gsap) => {
      if (!track.current) return;
      const vh = window.innerHeight;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: track.current,
          start: "top top",
          end: `+=${(desktop ? 3 : 2.4) * vh}`,
          scrub: 0.5,
          onUpdate: (self) => setActive(Math.min(3, Math.floor(self.progress * 4 + 0.05))),
        },
      });
      for (let i = 1; i < 4; i++) tl.fromTo(`.ffg-frame-${i}`, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.12, ease: "power2.inOut" }, i / 4 - 0.07);
      for (let i = 1; i < 4; i++) tl.fromTo(`.ffg-frame-${i} img`, { scale: 1.18 }, { scale: 1, duration: 0.2 }, i / 4 - 0.07);
      tl.fromTo(".ffg-depth-1", { yPercent: 40, rotate: -8 }, { yPercent: -60, rotate: 8, duration: 1 }, 0)
        .fromTo(".ffg-depth-2", { xPercent: -40, yPercent: 40, rotate: 6 }, { xPercent: 60, yPercent: -10, rotate: -6, duration: 1 }, 0)
        .fromTo(".ffg-depth-3", { yPercent: 120, rotate: -4 }, { yPercent: -180, rotate: 8, duration: 1 }, 0)
        .to({}, { duration: 0.04 });
    },
    stage,
    [reduce, desktop],
    !reduce,
  );

  const more = (
    <PillLink
      variant="ghost"
      href={href("menu")}
      onClick={(e) => {
        e.preventDefault();
        go("menu");
      }}
      iconRight={<IconArrow size={18} />}
      className="text-branco"
    >
      {UI.discoverMenu[lang]}
    </PillLink>
  );

  if (reduce) {
    return (
      <section className="sheet relative z-10 bg-marca-escura pb-24 text-branco" aria-labelledby="ffg-title">
        <h2 id="ffg-title" className="sr-only">
          {UI.fromGrill[lang]}
        </h2>
        <div className="container-x grid gap-8 md:grid-cols-2">
          {tiles.map((t, i) => (
            <article key={t.id} className="overflow-hidden rounded-[24px] bg-branco/5">
              <div className="arch aspect-[4/3]">
                <Visual tile={t} lang={lang} />
              </div>
              <div className="p-6">
                <Copy tile={t} lang={lang} i={i} />
              </div>
            </article>
          ))}
        </div>
        <div className="container-x mt-10">{more}</div>
      </section>
    );
  }

  const t = tiles[active];
  return (
    <section ref={track} className="relative z-10 -mt-[100svh] text-branco" style={{ height: desktop ? "400svh" : "340svh" }} aria-labelledby="ffg-title">
      <div className="absolute inset-0 overflow-hidden rounded-t-[50%_22vh] bg-marca-escura shadow-[0_-40px_80px_-40px_rgba(49,11,10,0.8)]" />
      <div ref={stage} className="tex-grill sticky top-0 h-[100svh] overflow-hidden">
        <h2 id="ffg-title" className="sr-only">
          {UI.fromGrill[lang]}
        </h2>
        {/* cut-outs behind, at three depths */}
        <img src={cutout("frango").src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="ffg-depth-1 pointer-events-none absolute left-[36%] top-[58%] w-[min(360px,38vw)] opacity-40 blur-[3px]" />
        <img src={cutout("bacalhau").src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="ffg-depth-2 pointer-events-none absolute -left-10 top-[76%] w-[min(300px,36vw)] opacity-75 blur-[1px]" />
        <img src={cutout("salmao").src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="ffg-depth-3 pointer-events-none absolute right-[3%] top-[82%] w-[min(220px,26vw)]" />

        <div className={cn("container-x relative grid h-full items-center gap-6", desktop ? "grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]" : "grid-rows-[auto_1fr] content-start pt-[calc(var(--label-h)+96px)]")}>
          <div aria-live="polite" className={desktop ? "" : "min-h-[30svh]"}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                <Copy tile={t} lang={lang} i={active} />
              </motion.div>
            </AnimatePresence>
            {desktop && <div className="mt-10">{more}</div>}
          </div>
          <div className={cn("relative mx-auto w-full", desktop ? "max-w-[500px]" : "max-w-[340px] pb-6")}>
            <div className="relative" onPointerEnter={() => setLick(true)} onPointerLeave={() => setLick(false)} onClick={() => setLick((c) => !c)}>
              {/* the flame licks over the top of the frame when the Picanha is showing */}
              <div aria-hidden="true" className={cn("pointer-events-none absolute -top-[16%] left-1/2 z-10 flex w-[70%] -translate-x-1/2 items-end justify-center gap-[2%] transition-[opacity,transform] duration-500 ease-[var(--ease-out)]", active === 0 ? "opacity-100" : "opacity-0")}>
                {[0.7, 1, 0.8].map((s, i) => (
                  <Flame
                    key={i}
                    className="origin-bottom transition-transform duration-700 ease-[var(--ease-out)]"
                    style={{ width: `${s * 30}%`, transform: `scaleY(${lick && active === 0 ? 1 : 0.18}) rotate(${(i - 1) * 8}deg)`, transitionDelay: `${i * 70}ms` }}
                  />
                ))}
              </div>
              <div className={cn("arch relative w-full shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]", desktop ? "aspect-[4/5] max-h-[70svh]" : "aspect-[4/5] max-h-[40svh]")}>
                {tiles.map((x, i) => (
                  <div key={x.id} className={`ffg-frame-${i} absolute inset-0 overflow-hidden`} style={i ? { clipPath: "inset(100% 0% 0% 0%)" } : undefined}>
                    <Visual tile={x} lang={lang} />
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center font-display text-sm font-semibold tracking-[0.2em] text-suave">0{active + 1} / 04</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
