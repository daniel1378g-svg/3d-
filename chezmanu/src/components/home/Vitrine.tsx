import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionTemplate, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { TEXT, UI, fill, type Lang } from "@/i18n";
import { GROUPS, PRODUCTS, glossFor, type Product } from "@/content";
import { useSite } from "@/site";
import { asset, clamp, cn } from "@/lib/utils";
import { Photo } from "../Photo";
import { Reveal } from "../Reveal";
import { PRODUCT_ICONS } from "../Illustrations";
import { Sprinkle } from "./Sprinkle";

const PT = PRODUCTS.filter((p) => p.origin === "pt");
const CH = PRODUCTS.filter((p) => p.origin === "ch");
const BOTH = PRODUCTS.filter((p) => p.origin === "both");
const PRESETS = { pt: 0.9, ch: 0.1, all: 0.5 } as const;

/** One product on a glass shelf: its photo where the shop has one, otherwise a labelled photo slot. */
function Item({ p, lang, compact = false }: { p: Product; lang: Lang; compact?: boolean }) {
  const gloss = glossFor(p.gloss, lang);
  const note = p.note?.[lang];
  const Icon = PRODUCT_ICONS[p.icon] ?? PRODUCT_ICONS.cake;
  const body = (
    <div className="flex h-full flex-col items-center text-center">
      <div className={cn("relative grid shrink-0 place-items-center rounded-full", compact ? "h-12 w-12" : "h-[clamp(56px,8cqw,96px)] w-[clamp(56px,8cqw,96px)]")}>
        {p.photo ? (
          <Photo id={p.photo} sizes="120px" className="h-full w-full rounded-full shadow-set ring-4 ring-white/80" />
        ) : (
          <span className="grid h-full w-full place-items-center rounded-full border-2 border-dashed border-caramel/45 bg-white/50 text-caramel" title={fill(UI.photoSlot[lang], { name: p.name[lang] })}>
            <Icon size={compact ? 30 : 44} className="h-[56%] w-[56%]" />
            <span className="sr-only">{fill(UI.photoSlot[lang], { name: p.name[lang] })}</span>
            {!compact && (
              <span aria-hidden="true" className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-caramel px-2 py-px text-[12px] font-semibold leading-tight text-flour">
                {UI.photoSlotNote[lang]}
              </span>
            )}
          </span>
        )}
      </div>
      <span className={cn("display mt-3 leading-tight text-cocoa", compact ? "text-[13.5px]" : "text-[clamp(14px,1.7cqw,19px)]")}>
        {p.name[lang]}
      </span>
      {(gloss || note) && !compact && <span className="mt-0.5 text-[12px] leading-snug text-espresso/75">{[gloss, note].filter(Boolean).join(" · ")}</span>}
    </div>
  );
  if (p.id === "natas")
    return (
      <Sprinkle className="h-full">
        <button type="button" className="h-full w-full rounded-2xl p-1" aria-label={`${p.name[lang]} – ${UI.sprinkle[lang]}`}>
          {body}
        </button>
      </Sprinkle>
    );
  return <div className="h-full p-1">{body}</div>;
}

/** One side of the case. Its content box keeps its size and moves/grows with the divider (transform only). */
function Side({ side, split, lang, vertical }: { side: "pt" | "ch"; split: MotionValue<number>; lang: Lang; vertical: boolean }) {
  const compact = vertical;
  const share = useTransform(split, (s) => (side === "pt" ? s : 1 - s));
  const shift = useTransform(split, (s) => `${(s - 0.5) * 100}%`);
  const scale = useTransform(share, (v) => 0.84 + 0.32 * v);
  const opacity = useTransform(share, (v) => clamp(0.25 + v * 1.3, 0, 1));
  const clip = useTransform(split, (s) => `inset(${vertical ? (side === "pt" ? `0 0 ${(1 - s) * 100}% 0` : `${s * 100}% 0 0 0`) : side === "pt" ? `0 ${(1 - s) * 100}% 0 0` : `0 0 0 ${s * 100}%`})`);
  const groups = side === "pt" ? [{ key: "pastry-pt", items: PT }] : [{ key: "pastry-ch", items: CH.filter((p) => p.group === "pastry-ch") }, { key: "viennoiserie", items: CH.filter((p) => p.group === "viennoiserie") }];
  const pt = side === "pt";
  return (
    <motion.div className={cn("absolute inset-0", pt ? "tiles bg-[#e9eff9]" : "dust bg-[#fbf2e6]")} style={{ clipPath: clip }}>
      <motion.div
        className={cn("absolute flex flex-col justify-center gap-3 px-3 pb-4 pt-11 md:gap-4 md:p-6 md:pt-14", vertical ? (pt ? "inset-x-0 top-0 h-1/2" : "inset-x-0 bottom-0 h-1/2") : pt ? "inset-y-0 left-0 w-1/2" : "inset-y-0 right-0 w-1/2")}
        style={vertical ? { y: shift, scale, opacity } : { x: shift, scale, opacity }}
      >
        <span className={cn("absolute top-3 rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-[0.16em] text-flour md:top-5", pt ? "left-3 bg-azulejo md:left-5" : "right-3 bg-swiss-text md:right-5")}>
          {pt ? UI.portugal[lang] : UI.suisse[lang]}
        </span>
        {groups.map((g) => (
          <div key={g.key}>
            <p className={cn("mb-1 text-center text-[12px] font-bold uppercase tracking-[0.14em]", pt ? "text-azulejo" : "text-swiss-text")}>{GROUPS[g.key][lang]}</p>
            <ul className={cn("grid gap-x-1 gap-y-2 border-b-[3px] border-white/90 pb-2 shadow-[0_8px_10px_-8px_rgb(42_26_18/0.35)]", g.items.length > 5 ? "grid-cols-4" : "grid-cols-3")}>
              {g.items.map((p) => (
                <li key={p.id}>
                  <Item p={p} lang={lang} compact={compact} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/**
 * La vitrine Portugal | Suisse. The divider's handle is the logo: drag it (or use ← → / ↑ ↓, Home, End) and
 * the bigger side comes forward and grows; the Portugal / Suisse / Tout buttons do the same in one tap. Below
 * the glass, the counter carries what is on both sides, and a list names every product for everyone.
 */
export function Vitrine() {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const caseRef = useRef<HTMLDivElement>(null);
  const split = useMotionValue(0.5);
  const [value, setValue] = useState(50);
  const [vertical, setVertical] = useState(() => typeof window !== "undefined" && window.innerWidth < 700);
  const dragging = useRef(false);
  useMotionValueEvent(split, "change", (v) => setValue(Math.round(v * 100)));

  useEffect(() => {
    // Measured on the column, not on the case: the case's own width follows its aspect ratio and min-height.
    const el = caseRef.current?.parentElement;
    if (!el) return;
    const ro = new ResizeObserver(() => setVertical(el.clientWidth < 640));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const to = (v: number) => animate(split, clamp(v, 0, 1), reduce ? { duration: 0 } : { type: "spring", bounce: 0.18, duration: 0.7 });
  const fromPointer = (e: React.PointerEvent) => {
    const r = caseRef.current!.getBoundingClientRect();
    split.set(clamp(vertical ? (e.clientY - r.top) / r.height : (e.clientX - r.left) / r.width, 0, 1));
  };
  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 0.2 : 0.05;
    const map: Record<string, number> = { ArrowLeft: -step, ArrowDown: vertical ? step : -step, ArrowRight: step, ArrowUp: vertical ? -step : step };
    if (e.key in map) {
      e.preventDefault();
      to(split.get() + map[e.key]);
    } else if (e.key === "Home") {
      e.preventDefault();
      to(0);
    } else if (e.key === "End") {
      e.preventDefault();
      to(1);
    }
  };
  const handlePct = useTransform(split, (s) => s * 100);
  const handlePos = useMotionTemplate`${handlePct}%`;
  const sheen = useTransform(split, (s) => `${(s - 0.5) * 30}%`);
  const preset = value >= 80 ? "pt" : value <= 20 ? "ch" : value >= 40 && value <= 60 ? "all" : null;

  return (
    <section id="vitrine" aria-labelledby="vitrine-title" className="gutter bg-flour py-24 md:py-32">
      <div className="wrap">
        <Reveal>
          <p className="kicker">{TEXT.prodKicker[lang]}</p>
          <h2 id="vitrine-title" className="display mt-3 max-w-[22ch] text-[clamp(2.2rem,4.6vw,3.8rem)] leading-tight text-cocoa">
            {TEXT.prodTitle[lang]}
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 text-[16.5px] leading-relaxed md:grid-cols-3">
          <Reveal as="p">{TEXT.prodBakery[lang]}</Reveal>
          <Reveal as="p" delay={0.06}>{TEXT.prodPastry[lang]}</Reveal>
          <Reveal as="p" delay={0.12}>{TEXT.prodBiscuits[lang]}</Reveal>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <div role="group" aria-label={UI.vitrineLabel[lang]} className="inline-flex rounded-full bg-flour-deep p-1 ring-1 ring-espresso/10">
            {(["pt", "all", "ch"] as const).map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={preset === k}
                onClick={() => to(PRESETS[k])}
                className={cn(
                  "relative min-h-11 rounded-full px-5 text-[15px] font-semibold transition-colors",
                  preset === k ? "text-flour" : "text-espresso hover:bg-espresso/5",
                )}
              >
                {preset === k && <motion.span layoutId="vitrine-pill" className={cn("absolute inset-0 -z-0 rounded-full", k === "pt" ? "bg-azulejo" : k === "ch" ? "bg-swiss-text" : "bg-espresso")} transition={{ type: "spring", bounce: 0.2, duration: 0.45 }} />}
                <span className="relative">{k === "pt" ? UI.portugal[lang] : k === "ch" ? UI.suisse[lang] : UI.all[lang]}</span>
              </button>
            ))}
          </div>
          <p className="text-sm text-espresso/75" aria-hidden="true">{UI.vitrineHint[lang]} ↔</p>
        </div>

        {reduce ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {(["pt", "ch"] as const).map((side) => (
              <div key={side} className={cn("@container rounded-[28px] p-5 ring-1 ring-espresso/10", side === "pt" ? "tiles bg-[#e9eff9]" : "dust bg-[#fbf2e6]")}>
                <p className={cn("mb-3 inline-block rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-[0.16em] text-flour", side === "pt" ? "bg-azulejo" : "bg-swiss-text")}>{side === "pt" ? UI.portugal[lang] : UI.suisse[lang]}</p>
                <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {(side === "pt" ? PT : CH).map((p) => (
                    <li key={p.id}><Item p={p} lang={lang} compact /></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={caseRef}
            className={cn("@container relative mt-6 w-full select-none overflow-hidden rounded-[32px] shadow-lift ring-1 ring-espresso/10", vertical ? "h-[1000px]" : "aspect-[16/9.6] min-h-[560px]")}
          >
            <Side side="pt" split={split} lang={lang} vertical={vertical} />
            <Side side="ch" split={split} lang={lang} vertical={vertical} />
            {/* glass: a top light, a sheen that follows the divider, and the wooden base */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-white/80 to-transparent" />
            <motion.div aria-hidden="true" className="glass-sheen pointer-events-none absolute inset-0" style={vertical ? { y: sheen } : { x: sheen }} />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-b from-caramel to-caramel-dark" />
            {/* the divider and its logo handle */}
            <motion.div
              className={cn("absolute z-10", vertical ? "inset-x-0 h-0" : "inset-y-0 w-0")}
              style={vertical ? { top: handlePos } : { left: handlePos }}
            >
              <div aria-hidden="true" className={cn("absolute bg-flour shadow-[0_0_0_1px_rgb(42_26_18/0.15)]", vertical ? "inset-x-0 -top-[2px] h-1" : "inset-y-0 -left-[2px] w-1")} />
              <div
                role="slider"
                tabIndex={0}
                aria-label={UI.vitrineSlider[lang]}
                aria-orientation={vertical ? "vertical" : "horizontal"}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={value}
                aria-valuetext={fill(UI.vitrineValue[lang], { pt: value, ch: 100 - value })}
                data-cursor="drag"
                onKeyDown={onKey}
                onPointerDown={(e) => {
                  dragging.current = true;
                  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                }}
                onPointerMove={(e) => dragging.current && fromPointer(e)}
                onPointerUp={() => (dragging.current = false)}
                onPointerCancel={() => (dragging.current = false)}
                className="absolute left-0 top-1/2 grid h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none place-items-center rounded-full bg-flour shadow-lift ring-4 ring-white active:cursor-grabbing md:h-[118px] md:w-[118px]"
                style={vertical ? { left: "50%", top: 0 } : undefined}
              >
                <img src={asset("brand/logo-300.webp")} alt="" width={284} height={145} className="pointer-events-none w-[82%]" draggable={false} />
                <span aria-hidden="true" className={cn("absolute flex justify-between text-caramel", vertical ? "inset-x-0 -inset-y-1 flex-col items-center" : "inset-y-0 -inset-x-1 items-center")}>
                  <span>{vertical ? "▲" : "◀"}</span>
                  <span>{vertical ? "▼" : "▶"}</span>
                </span>
              </div>
            </motion.div>
          </div>
        )}

        {/* The counter: everything on both sides of the case. */}
        <div className="mt-10 rounded-[28px] bg-flour-deep p-6 ring-1 ring-espresso/10 md:p-9">
          <p className="kicker">{UI.both[lang]}</p>
          <p className="display mt-1 text-2xl text-cocoa">{UI.bothLead[lang]}</p>
          <div className="mt-6 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {(["bread", "biscuits", "savoury", "order"] as const).map((g) => {
              const groupPhoto = { bread: "bread-basket", biscuits: null, savoury: "salads", order: "first-birthday" }[g];
              return (
                <div key={g}>
                  {groupPhoto && <Photo id={groupPhoto} sizes="(min-width: 1280px) 280px, (min-width: 768px) 45vw, 90vw" className="mb-4 aspect-[16/10] rounded-2xl" />}
                  <h3 className="display text-xl text-cocoa">{GROUPS[g][lang]}</h3>
                  <ul className="mt-2 space-y-2">
                    {BOTH.filter((p) => p.group === g).map((p) => {
                      const Icon = PRODUCT_ICONS[p.icon] ?? PRODUCT_ICONS.cake;
                      const extra = [glossFor(p.gloss, lang), p.note?.[lang]].filter(Boolean).join(" · ");
                      return (
                        <li key={p.id} className="flex items-start gap-3">
                          <Icon size={30} className="mt-0.5 shrink-0 text-caramel" />
                          <span>
                            <span className="font-semibold">{p.name[lang]}</span>
                            {extra && <span className="block text-sm text-espresso/75">{extra}</span>}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <details className="group mt-6 rounded-2xl ring-1 ring-espresso/10">
          <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-4 px-5 font-semibold">
            {UI.vitrineList[lang]}
            <span aria-hidden="true" className="transition-transform group-open:rotate-180">⌄</span>
          </summary>
          <div className="grid gap-6 px-5 pb-6 sm:grid-cols-3">
            {([["pt", PT], ["ch", CH], ["both", BOTH]] as const).map(([k, list]) => (
              <div key={k}>
                <h3 className="kicker mb-2">{k === "pt" ? UI.portugal[lang] : k === "ch" ? UI.suisse[lang] : UI.both[lang]}</h3>
                <ul className="list-disc space-y-1 pl-5 text-[15px]">
                  {list.map((p) => (
                    <li key={p.id}>
                      {p.name[lang]}
                      {p.note && <span className="text-espresso/70"> ({p.note[lang]})</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
