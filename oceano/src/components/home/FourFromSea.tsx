// Section 3: "Mehr als nur Burger", pinned like HOY!'s burrito scene. Copy on the left (the chapter and the live
// sentence that belongs to it); on the right an arch-topped frame where four chapters take turns as you scroll,
// with a counter. On Pastéis de nata a counter runs from 70 down to 1 (the live story). Cut-outs drift behind.
import { useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "motion/react";
import { UI, type L, type Lang } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/site";
import { cutout, photo } from "@/content/photos";
import { useGsap } from "@/lib/useGsap";
import { useIsDesktop, useReduced } from "@/lib/useMedia";
import { cn } from "@/lib/utils";
import { PastelDeNata } from "../Illustrations";
import { PillLink } from "../ui/Pill";
import { IconArrow } from "../icons";

type Chapter = { key: string; name: L; line: L; note?: L; photo?: string; tone: string };
const CHAPTERS: Chapter[] = [
  { key: "burger", name: TX.chapterBurger, line: TX.kuecheBurger, photo: "burger-sauce", tone: "bg-acento" },
  { key: "fleisch-fisch", name: TX.chapterFleischFisch, line: TX.kuecheFleischFisch, photo: "bacalhau-lagareiro", tone: "bg-acento" },
  { key: "meer", name: TX.chapterMeer, line: TX.kuecheMeer, photo: "polvo", tone: "bg-acento" },
  { key: "nata", name: TX.chapterNata, line: TX.kuecheNata2, note: TX.kuecheNata1, tone: "bg-destaque" },
];
export { CHAPTERS };

export function Visual({ chapter, lang }: { chapter: Chapter; lang: Lang }) {
  if (chapter.photo) {
    const p = photo(chapter.photo);
    return <img src={p.src} alt={p.alt[lang]} width={p.w} height={p.h} loading="lazy" className="h-full w-full object-cover" />;
  }
  // no photo of the pastéis on the live site: an illustration and a labelled photo slot
  return (
    <div className={cn("relative grid h-full w-full place-items-center", chapter.tone)}>
      <PastelDeNata className="w-[62%]" />
      <p className="absolute inset-x-6 bottom-6 rounded-full bg-tinta/10 px-4 py-2 text-center font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-tinta">
        {UI.photo[lang]}: <span className="dish-name normal-case tracking-normal">{chapter.name[lang]}</span>
      </p>
    </div>
  );
}

/** 70 → 1: the 70 dishes of 2011 count down to the one national dish. */
export function NataCounter({ value, onRestart, lang }: { value: number; onRestart: () => void; lang: Lang }) {
  return (
    <button type="button" onClick={onRestart} aria-label={UI.restart[lang]} className="mt-6 flex items-baseline gap-3 rounded-[18px] bg-branco/10 px-5 py-3 text-left transition-transform active:scale-[0.98]">
      <span className="font-display text-[clamp(44px,4.6vw,80px)] font-extrabold leading-none text-destaque tabular-nums">{value}</span>
      <span className="font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-suave">{value === 1 ? UI.national[lang] : UI.dishes[lang]} · 2011</span>
    </button>
  );
}

function Copy({ chapter, lang, i, count, onRestart }: { chapter: Chapter; lang: Lang; i: number; count: number; onRestart: () => void }) {
  return (
    <div>
      <p className="eyebrow text-destaque">
        {UI.kueche[lang]} <span className="text-suave">· 0{i + 1} / 04</span>
      </p>
      <h3 className="dish-name mt-4 font-display text-[clamp(40px,5.2vw,96px)] font-extrabold uppercase leading-[0.88]">{chapter.name[lang]}</h3>
      {chapter.note && <p className="mt-6 max-w-[540px] text-[clamp(16px,1.1vw,18px)] text-branco/75">{chapter.note[lang]}</p>}
      <p className="mt-4 max-w-[540px] text-[clamp(17px,1.2vw,20px)] text-branco/90">{chapter.line[lang]}</p>
      {chapter.key === "nata" && <NataCounter value={count} onRestart={onRestart} lang={lang} />}
    </div>
  );
}

export function FourFromSea() {
  const { lang, href, go } = useSite();
  const desktop = useIsDesktop();
  const reduce = useReduced();
  const dishes = CHAPTERS;
  const [count, setCount] = useState(70);
  const restart = () => {
    const c = animate(70, 1, { duration: 1.2, ease: "easeOut", onUpdate: (v) => setCount(Math.round(v)) });
    return () => c.stop();
  };
  const track = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);


  useGsap(
    (gsap) => {
    if (!track.current) return;
    const vh = window.innerHeight;
    {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: track.current,
          start: "top top",
          end: `+=${(desktop ? 3 : 2.4) * vh}`,
          scrub: 0.5,
          onUpdate: (self) => {
            setActive(Math.min(3, Math.floor(self.progress * 4 + 0.05)));
            // the fourth quarter counts the 70 dishes of 2011 down to the one national dish
            const q = Math.min(1, Math.max(0, (self.progress - 0.76) / 0.2));
            setCount(Math.round(70 - 69 * q));
          },
        },
      });
      for (let i = 1; i < 4; i++) tl.fromTo(`.ffs-frame-${i}`, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.12, ease: "power2.inOut" }, i / 4 - 0.07);
      for (let i = 1; i < 4; i++) tl.fromTo(`.ffs-frame-${i} img, .ffs-frame-${i} svg`, { scale: 1.18 }, { scale: 1, duration: 0.2 }, i / 4 - 0.07);
      tl.fromTo(".ffs-depth-1", { yPercent: 40, rotate: -8 }, { yPercent: -60, rotate: 8, duration: 1 }, 0)
        .fromTo(".ffs-depth-2", { xPercent: -40, yPercent: 40, rotate: 6 }, { xPercent: 60, yPercent: -10, rotate: -6, duration: 1 }, 0)
        .fromTo(".ffs-depth-3", { yPercent: 120, rotate: -4 }, { yPercent: -180, rotate: 8, duration: 1 }, 0)
        .to({}, { duration: 0.04 });
    }
    },
    stage,
    [reduce, desktop],
    !reduce,
  );

  const more = (
    <PillLink
      variant="ghost"
      href={href("kueche")}
      onClick={(e) => {
        e.preventDefault();
        go("kueche");
      }}
      iconRight={<IconArrow size={18} />}
      className="text-branco"
    >
      {UI.kueche[lang]}
    </PillLink>
  );

  if (reduce) {
    return (
      <section className="sheet relative z-10 bg-marca-escura pb-24 text-branco" aria-label={TX.kuecheH2[lang]}>
        <h2 className="sr-only">{TX.kuecheH2[lang]}</h2>
        <div className="container-x grid gap-8 md:grid-cols-2">
          {dishes.map((d, i) => (
            <article key={d.key} className="overflow-hidden rounded-[24px] bg-branco/5">
              <div className="arch aspect-[4/3]">
                <Visual chapter={d} lang={lang} />
              </div>
              <div className="p-6">
                <Copy chapter={d} lang={lang} i={i} count={reduce ? 1 : count} onRestart={restart} />
              </div>
            </article>
          ))}
        </div>
        <div className="container-x mt-10">{more}</div>
      </section>
    );
  }

  const d = dishes[active];
  return (
    <section ref={track} className="relative z-10 -mt-[100svh] text-branco" style={{ height: desktop ? "400svh" : "340svh" }} aria-label={TX.kuecheH2[lang]}>
      <div className="absolute inset-0 overflow-hidden rounded-t-[50%_22vh] bg-marca-escura shadow-[0_-40px_80px_-40px_rgba(27,27,27,0.8)]" />
      <div ref={stage} className="tex-wave sticky top-0 h-[100svh] overflow-hidden">
        <h2 className="sr-only">{TX.kuecheH2[lang]}</h2>
        {/* cut-outs behind, at three depths; the near one drifts sideways below the copy, never behind the price */}
        <img src={cutout("steak").src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="ffs-depth-1 pointer-events-none absolute left-[38%] top-[55%] w-[min(380px,40vw)] opacity-50 blur-[3px]" />
        <img src={cutout("burger").src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="ffs-depth-2 pointer-events-none absolute -left-10 top-[78%] w-[min(300px,36vw)] opacity-80 blur-[1px]" />
        <img src={cutout("gebaeck").src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="ffs-depth-3 pointer-events-none absolute right-[4%] top-[80%] w-[min(200px,24vw)]" />

        <div className={cn("container-x relative grid h-full items-center gap-6", desktop ? "grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]" : "grid-rows-[auto_1fr] content-start pt-[calc(var(--label-h)+96px)]")}>
          <div aria-live="polite" className={desktop ? "" : "min-h-[38svh]"}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                <Copy chapter={d} lang={lang} i={active} count={count} onRestart={restart} />
              </motion.div>
            </AnimatePresence>
            {desktop && <div className="mt-10">{more}</div>}
          </div>
          <div className={cn("relative mx-auto w-full", desktop ? "max-w-[520px]" : "max-w-[360px] pb-6")}>
            <div
              className="group relative"
            >
              <div className={cn("arch relative w-full shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]", desktop ? "aspect-[4/5] max-h-[72svh]" : "aspect-[4/5] max-h-[42svh]")}>
                {dishes.map((x, i) => (
                  <div key={x.key} className={`ffs-frame-${i} absolute inset-0 overflow-hidden`} style={i ? { clipPath: "inset(100% 0% 0% 0%)" } : undefined}>
                    <Visual chapter={x} lang={lang} />
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center font-display text-sm font-semibold tracking-[0.2em] text-suave">
                0{active + 1} / 04
              </p>
            </div>
          </div>
        </div>
        {!desktop && <div className="absolute inset-x-0 bottom-4 hidden px-[var(--gutter)]">{more}</div>}
      </div>
    </section>
  );
}
