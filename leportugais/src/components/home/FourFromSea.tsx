// Section 3: the four from the sea, pinned like HOY!'s burrito scene. Copy on the left; on the right an
// arch-topped frame where four dishes wipe in as you scroll, with a counter. Cut-outs drift behind at three
// depths, and on the Polvo an illustrated tentacle curls over the frame on hover or tap.
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { UI, type Lang } from "@/i18n";
import { useSite } from "@/site";
import { TEXT } from "@/content/site";
import { dishById, NOTES, priceText, type Dish } from "@/content/carte";
import { cutout, photo } from "@/content/photos";
import { useGsap } from "@/lib/useGsap";
import { useIsDesktop, useReduced } from "@/lib/useMedia";
import { cn } from "@/lib/utils";
import { Octopus, Prawn, Tentacle } from "../Illustrations";
import { PillLink } from "../ui/Pill";
import { IconArrow } from "../icons";

const FOUR = ["peixes-grelhados-segundo-as-chegadas", "bacalhau-assado-na-grelha", "polvo-com-vinagrete-morno", "gambas-selvagens-salteadas"];

function Visual({ dish, lang }: { dish: Dish; lang: Lang }) {
  if (dish.id === "peixes-grelhados-segundo-as-chegadas" || dish.id === "bacalhau-assado-na-grelha") {
    const p = photo(dish.id === "bacalhau-assado-na-grelha" ? "plats-du-jour-plainpalais" : "restaurant-de-poisson-geneve");
    return <img src={p.src} alt={p.alt[lang]} width={p.w} height={p.h} loading="lazy" className="h-full w-full object-cover" />;
  }
  // no photo of these two dishes on the live site: illustration and a labelled photo slot
  const polvo = dish.id === "polvo-com-vinagrete-morno";
  return (
    <div className={cn("relative grid h-full w-full place-items-center", polvo ? "bg-coral" : "bg-dourado")}>
      {polvo ? <Octopus className="w-[62%]" /> : <Prawn className="w-[66%]" />}
      <p className={cn("absolute inset-x-6 bottom-6 rounded-full px-4 py-2 text-center font-display text-[13px] font-semibold uppercase tracking-[0.14em]", polvo ? "bg-branco/15 text-branco" : "bg-tinta/10 text-tinta")}>
        {UI.photo[lang]} : <span className="dish-name normal-case tracking-normal">{dish.name}</span>
      </p>
    </div>
  );
}

function Copy({ dish, lang, i }: { dish: Dish; lang: Lang; i: number }) {
  const price = priceText(dish, lang);
  return (
    <div>
      <p className="eyebrow text-dourado">
        {UI.fromTheSea[lang]} <span className="text-espuma">· 0{i + 1} / 04</span>
      </p>
      <h3 lang="pt-PT" className="dish-name mt-4 font-display text-[clamp(44px,5.6vw,104px)] font-extrabold uppercase leading-[0.88] [hyphens:manual]">
        {dish.name}
      </h3>
      <p className="mt-6 max-w-[520px] text-[clamp(17px,1.2vw,20px)] text-branco/85">{dish.desc[lang]}</p>
      {i === 0 && TEXT.englishLine[lang] && <p className="mt-3 max-w-[520px] font-hand text-[26px] leading-tight text-dourado">{TEXT.englishLine[lang]}</p>}
      <p className="mt-6 flex items-baseline gap-4">
        <span className="font-display text-[clamp(34px,3vw,52px)] font-extrabold leading-none text-dourado">{price === "---" ? UI.priceNone[lang] : price}</span>
        {dish.notes.map((n) => (
          <span key={n} className="eyebrow text-espuma">
            {NOTES[n][lang]}
          </span>
        ))}
      </p>
    </div>
  );
}

export function FourFromSea() {
  const { lang, href, go } = useSite();
  const desktop = useIsDesktop();
  const reduce = useReduced();
  const dishes = FOUR.map(dishById);
  const track = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [curl, setCurl] = useState(false);

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
          onUpdate: (self) => setActive(Math.min(3, Math.floor(self.progress * 4 + 0.05))),
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
      href={href("carte")}
      onClick={(e) => {
        e.preventDefault();
        go("carte");
      }}
      iconRight={<IconArrow size={18} />}
      className="text-branco"
    >
      {UI.seeCarte[lang]}
    </PillLink>
  );

  if (reduce) {
    return (
      <section className="sheet relative z-10 bg-oceano pb-24 text-branco" aria-label={UI.fromTheSea[lang]}>
        <h2 className="sr-only">{UI.fromTheSea[lang]}</h2>
        <div className="container-x grid gap-8 md:grid-cols-2">
          {dishes.map((d, i) => (
            <article key={d.id} className="overflow-hidden rounded-[24px] bg-branco/5">
              <div className="arch aspect-[4/3]">
                <Visual dish={d} lang={lang} />
              </div>
              <div className="p-6">
                <Copy dish={d} lang={lang} i={i} />
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
    <section ref={track} className="relative z-10 -mt-[100svh] text-branco" style={{ height: desktop ? "400svh" : "340svh" }} aria-label={UI.fromTheSea[lang]}>
      <div className="absolute inset-0 overflow-hidden rounded-t-[50%_22vh] bg-oceano shadow-[0_-40px_80px_-40px_rgba(12,27,42,0.8)]" />
      <div ref={stage} className="tex-wave sticky top-0 h-[100svh] overflow-hidden">
        <h2 className="sr-only">{UI.fromTheSea[lang]}</h2>
        {/* cut-outs behind, at three depths; the near one drifts sideways below the copy, never behind the price */}
        <img src={cutout("peixes").src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="ffs-depth-1 pointer-events-none absolute left-[38%] top-[55%] w-[min(380px,40vw)] opacity-50 blur-[3px]" />
        <img src={cutout("mariscos").src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="ffs-depth-2 pointer-events-none absolute -left-10 top-[78%] w-[min(300px,36vw)] opacity-80 blur-[1px]" />
        <img src={cutout("tomates").src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="ffs-depth-3 pointer-events-none absolute right-[4%] top-[80%] w-[min(200px,24vw)]" />

        <div className={cn("container-x relative grid h-full items-center gap-6", desktop ? "grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]" : "grid-rows-[auto_1fr] content-start pt-[calc(var(--label-h)+96px)]")}>
          <div aria-live="polite" className={desktop ? "" : "min-h-[38svh]"}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                <Copy dish={d} lang={lang} i={active} />
              </motion.div>
            </AnimatePresence>
            {desktop && <div className="mt-10">{more}</div>}
          </div>
          <div className={cn("relative mx-auto w-full", desktop ? "max-w-[520px]" : "max-w-[360px] pb-6")}>
            <div
              className="group relative"
              onPointerEnter={() => setCurl(true)}
              onPointerLeave={() => setCurl(false)}
              onClick={() => setCurl((c) => !c)}
            >
              <div className={cn("arch relative w-full shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]", desktop ? "aspect-[4/5] max-h-[72svh]" : "aspect-[4/5] max-h-[42svh]")}>
                {dishes.map((x, i) => (
                  <div key={x.id} className={`ffs-frame-${i} absolute inset-0 overflow-hidden`} style={i ? { clipPath: "inset(100% 0% 0% 0%)" } : undefined}>
                    <Visual dish={x} lang={lang} />
                  </div>
                ))}
              </div>
              {/* the tentacle curls over the frame when the Polvo is showing */}
              <Tentacle
                className={cn(
                  "pointer-events-none absolute -right-[10%] -top-[10%] w-[46%] origin-bottom-left transition-[transform,opacity] duration-700 ease-[var(--ease-out)] lg:-right-[12%] lg:-top-[14%] lg:w-[62%]",
                  active === 2 ? "opacity-100" : "opacity-0",
                  active === 2 && curl ? "rotate-[-14deg] scale-110" : "rotate-[6deg] scale-90",
                )}
              />
              <p className="mt-4 text-center font-display text-sm font-semibold tracking-[0.2em] text-espuma">
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
