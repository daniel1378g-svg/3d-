// "Explore Giardino": the restaurant's own aerial photograph stays in place on the left with four numbered places
// – the kitchen, the terrace, the playground, the village – and a pin that springs between them (stiffness 120,
// damping 16). On the right, four numbered cards. Choosing a place scrolls to its card; scrolling the cards moves the
// pin and tints the active card. Arrow keys move between the places. It ends with the pizza to spin.
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { UI, type L } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/copy";
import { cn, prefersReducedMotion } from "@/lib/utils";
import { Photo } from "@/components/Photo";
import { FadeIn, SplitReveal } from "@/components/Reveal";
import { PizzaPlate } from "@/components/PizzaPlate";

type Place = { key: "kitchen" | "terrace" | "play" | "village"; title: L; text: L; x: number; y: number };
// positions in % of aerial-village (1440 × 1078): the restaurant behind the playground, its covered terrace to the
// left, the pirate ship in front, the village of Leukerbad behind
const PLACES: Place[] = [
  { key: "kitchen", title: TX.placeKitchen, text: TX.placeKitchenText, x: 43, y: 69 },
  { key: "terrace", title: TX.placeTerrace, text: TX.placeTerraceText, x: 32, y: 66.5 },
  { key: "play", title: TX.placePlay, text: TX.placePlayText, x: 49.5, y: 79 },
  { key: "village", title: TX.placeVillage, text: TX.placeVillageText, x: 72, y: 45 },
];

export function Experience() {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Place["key"]>("kitchen");
  const refs = useRef<Record<string, HTMLElement | null>>({});
  const pills = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive((vis.target as HTMLElement).dataset.place as Place["key"]);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    Object.values(refs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const jump = (key: Place["key"]) => {
    setActive(key);
    refs.current[key]?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
  };
  const pin = PLACES.find((p) => p.key === active)!;

  return (
    <section id="explore" data-anchor className="tex-contour relative overflow-x-clip bg-ink py-24 text-white md:py-36" aria-labelledby="explore-title">
      <div className="container-x">
        <p className="eyebrow text-gold">Giardino · Leukerbad</p>
        <SplitReveal as="h2" id="explore-title" text={TX.exploreTitle[lang]} className="mt-4 fs-xxl font-extrabold" />
        <FadeIn as="p" className="lede mt-5 max-w-[720px] text-cream/90">
          {TX.exploreLead[lang]}
        </FadeIn>
        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            {/* never taller than the screen, so the photo stays whole while it is pinned */}
            <div className="relative aspect-[1440/1078] w-full overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]" style={{ maxWidth: "min(100%, calc((100svh - 240px) * 1.336))" }}>
              <Photo id="aerial-village" sizes="(min-width: 1024px) 56vw, 92vw" className="absolute inset-0 block h-full w-full" focus="50% 50%" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,27,27,0)_55%,rgba(27,27,27,0.35)_100%)]" />
              {PLACES.map((p, i) => (
                <button
                  key={p.key}
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={() => jump(p.key)}
                  className={cn("absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full font-display text-[15px] font-extrabold shadow-[0_6px_18px_rgba(0,0,0,0.45)] transition-colors duration-300", active === p.key ? "bg-gold text-ink" : "bg-ink/80 text-white hover:bg-ink")}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  0{i + 1}
                </button>
              ))}
              {/* the travelling pin */}
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0"
                initial={false}
                animate={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 16 }}
              >
                <svg width="38" height="50" viewBox="-19 -50 38 50" className="-translate-x-1/2 -translate-y-[calc(100%+18px)] drop-shadow-[0_6px_10px_rgba(0,0,0,0.5)]">
                  <path d="M0 0 C-12 -14 -17 -24 -17 -32 A17 17 0 1 1 17 -32 C17 -24 12 -14 0 0 Z" fill="#FBFAF5" stroke="#1B1B1B" strokeWidth="2.5" />
                  <circle cx="0" cy="-32" r="7" fill="#6E6140" />
                </svg>
              </motion.span>
              <p className="absolute bottom-3 left-4 right-4 text-[13px] text-cream/90">{TX.exploreLead[lang].split(":")[0]}</p>
            </div>
            <div
              ref={pills}
              role="group"
              aria-label={UI.places[lang]}
              className="mt-5 flex flex-wrap gap-2"
              onKeyDown={(e) => {
                if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(e.key)) return;
                const items = [...e.currentTarget.querySelectorAll<HTMLButtonElement>("button")];
                const i = items.indexOf(document.activeElement as HTMLButtonElement);
                const next = items[(i + (e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1) + items.length) % items.length];
                next.focus();
                next.click();
                e.preventDefault();
              }}
            >
              {PLACES.map((p, i) => (
                <button
                  key={p.key}
                  type="button"
                  aria-pressed={active === p.key}
                  tabIndex={active === p.key ? 0 : -1}
                  onClick={() => jump(p.key)}
                  className={cn("min-h-11 rounded-full px-4 py-2 font-display text-[15px] font-semibold uppercase tracking-[0.1em] transition-colors", active === p.key ? "bg-gold text-ink" : "bg-white/10 text-white hover:bg-white/15")}
                >
                  0{i + 1} · {p.title[lang]}
                </button>
              ))}
            </div>
          </div>
          {/* tall enough that the photo stays pinned while the last card is read */}
          <div className="space-y-5 lg:pb-[22vh]">
            {PLACES.map((p, i) => (
              <article
                key={p.key}
                ref={(el) => {
                  refs.current[p.key] = el;
                }}
                id={`place-${p.key}`}
                data-place={p.key}
                aria-labelledby={`place-${p.key}-title`}
                className={cn("flex flex-col justify-center rounded-[26px] p-7 transition-colors duration-500 md:p-9 lg:min-h-[44vh]", active === p.key ? "bg-olive" : "bg-white/[0.05]")}
              >
                <p className="font-display text-[clamp(56px,5vw,88px)] font-extrabold leading-none text-gold">0{i + 1}</p>
                <h3 id={`place-${p.key}-title`} className="mt-3 font-display text-[clamp(32px,3vw,52px)] font-extrabold uppercase leading-[0.92]">
                  {p.title[lang]}
                </h3>
                <p className="mt-4 text-[clamp(17px,1.2vw,20px)] leading-relaxed text-white/90">{p.text[lang]}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-24 grid items-center gap-10 rounded-[34px] bg-white/[0.04] p-6 shadow-[inset_0_0_0_1px_rgba(243,242,225,0.12)] md:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <div>
            <p className="eyebrow text-gold">3D · {UI.illustration[lang]}</p>
            <SplitReveal as="h3" text={TX.pizzaTitle[lang]} className="mt-4 fs-xl font-extrabold" />
            <p className="lede mt-5 text-cream/90">{TX.pizzaText[lang]}</p>
          </div>
          <PizzaPlate />
        </div>
      </div>
    </section>
  );
}
