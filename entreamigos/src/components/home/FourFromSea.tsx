// Section 3: "Plutôt viande ou poisson ?", pinned like HOY!'s burrito scene. Copy on the left (the dish, its
// price from the carte and its own sentence from the home page); on the right an arch-topped frame where the
// four dishes the home page names wipe in as you scroll, with a counter. Cut-outs drift behind at three depths,
// and on the Francesinha a sauce drips over the top of the frame on hover or tap.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { UI, type L, type Lang } from "@/i18n";
import { useSite } from "@/site";
import { TEXT } from "@/content/site";
import { dishByName, priceText, WAIT_L } from "@/content/carte";
import { cutout, photo } from "@/content/photos";
import { useGsap } from "@/lib/useGsap";
import { useIsDesktop, useReduced } from "@/lib/useMedia";
import { cn, prefersReducedMotion } from "@/lib/utils";
import { Bacalhau, Francesinha, SauceDrip, Steak } from "../Illustrations";
import { PillLink } from "../ui/Pill";
import { IconArrow } from "../icons";
import { VP_EVENT } from "./HeroStory";

const FROM = { fr: "dès", en: "from", pt: "desde", it: "da", de: "ab" } as L;
type Four = { key: string; name: string; price: (lang: Lang) => string; line: L; note?: L; photo?: string; tone: string };
const FOUR: Four[] = [
  { key: "rissoles", name: "Rissoles", price: (lang) => `${FROM[lang]} ${priceText(dishByName("Rissoles de crevettes"), lang)}`, line: TEXT.vp.rissoles, photo: "rissoles-accras", tone: "bg-acento" },
  { key: "bacalhau", name: "Bacalhau à Braga", price: (lang) => priceText(dishByName("Bacalhau à Braga"), lang), line: TEXT.vp.bacalhau, note: WAIT_L, tone: "bg-acento" },
  { key: "picanha", name: "Picanha", price: (lang) => priceText(dishByName("Picanha"), lang), line: TEXT.vp.picanha, tone: "bg-destaque" },
  { key: "francesinha", name: "Francesinha", price: (lang) => priceText(dishByName("Francesinha"), lang), line: TEXT.vp.francesinha, note: TEXT.generous, tone: "bg-marca" },
];

function Visual({ dish, lang }: { dish: Four; lang: Lang }) {
  if (dish.photo) {
    const p = photo(dish.photo);
    return <img src={p.src} alt={p.alt[lang]} width={p.w} height={p.h} loading="lazy" className="h-full w-full object-cover" />;
  }
  // no photo of this dish on the live site: an illustration and a labelled photo slot
  const Art = dish.key === "bacalhau" ? Bacalhau : dish.key === "picanha" ? Steak : Francesinha;
  const light = dish.key === "picanha";
  return (
    <div className={cn("relative grid h-full w-full place-items-center", dish.tone)}>
      <Art className="w-[68%]" />
      <p className={cn("absolute inset-x-6 bottom-6 rounded-full px-4 py-2 text-center font-display text-[13px] font-semibold uppercase tracking-[0.14em]", light ? "bg-tinta/10 text-tinta" : "bg-branco/15 text-branco")}>
        {UI.photo[lang]} : <span className="dish-name normal-case tracking-normal">{dish.name}</span>
      </p>
    </div>
  );
}

function Copy({ dish, lang, i }: { dish: Four; lang: Lang; i: number }) {
  return (
    <div>
      <p className="eyebrow text-destaque">
        {UI.carte[lang]} <span className="text-suave">· 0{i + 1} / 04</span>
      </p>
      <h3 lang="pt-PT" className="dish-name mt-4 font-display text-[clamp(44px,5.6vw,104px)] font-extrabold uppercase leading-[0.88] [hyphens:manual]">
        {dish.name}
      </h3>
      <p className="mt-6 flex flex-wrap items-baseline gap-4">
        <span className="font-display text-[clamp(34px,3vw,52px)] font-extrabold leading-none text-destaque">{dish.price(lang)}</span>
        {dish.note && <span className="font-hand text-[clamp(24px,2vw,32px)] leading-none text-suave">{dish.note[lang]}</span>}
      </p>
      <p className="mt-6 max-w-[540px] text-[clamp(17px,1.2vw,20px)] text-branco/85">{dish.line[lang]}</p>
    </div>
  );
}

export function FourFromSea() {
  const { lang, href, go } = useSite();
  const desktop = useIsDesktop();
  const reduce = useReduced();
  const dishes = FOUR;
  const track = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [curl, setCurl] = useState(false);

  // "Viande" and "Poisson" at the end of the story jump to the right dish
  useEffect(() => {
    const on = (e: Event) => {
      const i = (e as CustomEvent<number>).detail;
      const el = track.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const span = el.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + (reduce ? 0 : span * ((i + 0.5) / 4)), behavior: prefersReducedMotion() ? "auto" : "smooth" });
    };
    window.addEventListener(VP_EVENT, on);
    return () => window.removeEventListener(VP_EVENT, on);
  }, [reduce]);

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
      <section className="sheet relative z-10 bg-marca-escura pb-24 text-branco" aria-label={TEXT.viandePoissonTitle[lang]}>
        <h2 className="sr-only">{TEXT.viandePoissonTitle[lang]}</h2>
        <div className="container-x grid gap-8 md:grid-cols-2">
          {dishes.map((d, i) => (
            <article key={d.key} className="overflow-hidden rounded-[24px] bg-branco/5">
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
    <section ref={track} className="relative z-10 -mt-[100svh] text-branco" style={{ height: desktop ? "400svh" : "340svh" }} aria-label={TEXT.viandePoissonTitle[lang]}>
      <div className="absolute inset-0 overflow-hidden rounded-t-[50%_22vh] bg-marca-escura shadow-[0_-40px_80px_-40px_rgba(61,6,18,0.8)]" />
      <div ref={stage} className="tex-wave sticky top-0 h-[100svh] overflow-hidden">
        <h2 className="sr-only">{TEXT.viandePoissonTitle[lang]}</h2>
        {/* cut-outs behind, at three depths; the near one drifts sideways below the copy, never behind the price */}
        <img src={cutout("poulet").src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="ffs-depth-1 pointer-events-none absolute left-[38%] top-[55%] w-[min(380px,40vw)] opacity-50 blur-[3px]" />
        <img src={cutout("calamares").src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="ffs-depth-2 pointer-events-none absolute -left-10 top-[78%] w-[min(300px,36vw)] opacity-80 blur-[1px]" />
        <img src={cutout("polvo").src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="ffs-depth-3 pointer-events-none absolute right-[4%] top-[80%] w-[min(200px,24vw)]" />

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
                  <div key={x.key} className={`ffs-frame-${i} absolute inset-0 overflow-hidden`} style={i ? { clipPath: "inset(100% 0% 0% 0%)" } : undefined}>
                    <Visual dish={x} lang={lang} />
                  </div>
                ))}
              </div>
              {/* the sauce drips over the top of the frame when the Francesinha is showing */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-[6%] top-[4%] overflow-hidden" style={{ height: "34%" }}>
                <SauceDrip
                  className={cn(
                    "w-full origin-top transition-[transform,opacity] duration-[900ms] ease-[var(--ease-out)]",
                    active === 3 ? "opacity-95" : "opacity-0",
                    active === 3 && curl ? "scale-y-[1.35]" : "scale-y-75",
                  )}
                />
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
