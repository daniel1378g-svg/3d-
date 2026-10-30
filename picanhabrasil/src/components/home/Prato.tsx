// "Ein Prato. Ein ganzer Teller." The menu's own rule – every main comes with rice, beans and fries or cassava –
// told as a plate that fills while you scroll (main, rice, beans, side, one after the other), then becomes a picker:
// choose the dish, the portion and the side, and the plate, the price and the photo (where the restaurant has one)
// follow. Prices come from content/menu.json.
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { fill } from "@/i18n";
import { useSite } from "@/site";
import { ScrollTrigger } from "@/lib/gsap";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { chf, findDish } from "@/content/menu";
import { URLS } from "@/content/facts";
import { Img } from "../Img";
import { IconArrow, IconExternal } from "../icons";
import { PlateArt, type MainKey, type SideKey } from "./PlateArt";

const MAINS: MainKey[] = ["picanha", "carne-seca", "bisteca", "frango", "figado", "peixe", "camarao", "bacalhau", "feijoada"];
/** menu ids per main (small / large where the menu has two portions) */
const MENU_ID: Record<MainKey, [string, string?]> = {
  picanha: ["picanha-porcao-pequena", "picanha-porcao-grande"],
  "carne-seca": ["carne-seca-porcao-pequena", "carne-seca-porcao-grande"],
  bisteca: ["bisteca"],
  frango: ["peito-de-frango"],
  figado: ["figado-acebolado"],
  peixe: ["file-de-peixe"],
  camarao: ["camarao"],
  bacalhau: ["bacalhau"],
  feijoada: ["feijoada"],
};
const FEIJOADA_SIDES: SideKey[] = ["rice", "banana", "kale", "vinaigrette"];
const PHOTO: Partial<Record<MainKey, string>> = { picanha: "prato-picanha", feijoada: "feijoada" };

export function Prato() {
  const { t, lang, reduce, openBooking, go, href } = useSite();
  const p = t.prato;
  const root = useRef<HTMLElement>(null);
  const [main, setMain] = useState<MainKey>("picanha");
  const [large, setLarge] = useState(false);
  const [side, setSide] = useState<SideKey>("fries");
  const [shown, setShown] = useState(reduce ? 4 : 0);

  // scroll: the plate fills step by step, once
  useEffect(() => {
    if (reduce) { setShown(4); return; }
    const st = ScrollTrigger.create({
      trigger: root.current, start: "top 70%", end: "top 5%",
      onUpdate: (s) => setShown((n) => Math.max(n, Math.min(4, 1 + Math.floor(s.progress * 4)))),
      onLeave: () => setShown(4),
    });
    if (st.progress >= 1) setShown(4);
    return () => st.kill();
  }, [reduce]);

  const feijoada = main === "feijoada";
  const pick = (m: MainKey) => {
    setMain(m);
    setShown(4);
    if (m === "feijoada" && !FEIJOADA_SIDES.includes(side)) setSide("rice");
    if (m !== "feijoada" && FEIJOADA_SIDES.includes(side)) setSide("fries");
  };
  const hasPortions = !!MENU_ID[main][1];
  const dish = findDish(MENU_ID[main][hasPortions && large ? 1 : 0]!)!;
  const variantIdx = feijoada ? FEIJOADA_SIDES.indexOf(side) : side === "cassava" ? 1 : 0;
  const price = dish.variants[variantIdx]?.price ?? dish.variants[0].price;
  const variantLabel = dish.variants[variantIdx]?.label?.[lang] ?? "";
  const dishName = p.dishes[main].name;
  const sidesText = feijoada ? variantLabel : `${p.parts.rice}, ${p.parts.beans}, ${side === "cassava" ? p.parts.cassava : p.parts.fries}`;
  const label = fill(p.plateLabel, { dish: dishName, sides: sidesText });
  const photo = PHOTO[main];
  const feijoadaSideLabels = useMemo(() => findDish("feijoada")!.variants.map((v) => v.label?.[lang] ?? ""), [lang]);

  const seg = <T extends string>(name: string, options: { v: T; label: string }[], value: T, set: (v: T) => void) => (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o.v} type="button" role="radio" aria-checked={value === o.v} className="chip text-tinta" onClick={() => set(o.v)}>{o.label}</button>
      ))}
    </div>
  );

  return (
    <section ref={root} id="prato" data-anchor="prato" className="skin-creme relative overflow-hidden py-24 md:py-32" aria-labelledby="prato-title">
      <div className="gutter">
        <div className="wrap">
          <p className="kicker text-vinho-2" data-lang-stagger>{p.kicker}</p>
          <h2 id="prato-title" className="display mt-3 max-w-[14ch] text-[clamp(3.2rem,9vw,9rem)] text-vinho">{p.title}</h2>
          <p className="lead mt-5 max-w-[40rem] text-tinta/80">{p.lead}</p>

          <ol className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label={p.kicker}>
            {p.steps.map((s, i) => (
              <li key={s} className={cn("flex items-center gap-3 rounded-full px-4 py-3 transition-colors duration-500", shown > i ? "bg-vinho text-creme" : "bg-tinta/[0.06] text-tinta/60")}>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-creme/15 font-display text-sm font-bold" aria-hidden="true">{i + 1}</span>
                <span className="text-sm font-semibold leading-tight">{s}</span>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
            <div className="order-2 flex flex-col gap-7 lg:order-1">
              <div>
                <p className="label text-tinta/70">{p.chooseMain}</p>
                <div role="radiogroup" aria-label={p.chooseMain} className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {MAINS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      role="radio"
                      aria-checked={main === m}
                      onClick={() => pick(m)}
                      className={cn(
                        "group flex items-center justify-between gap-3 rounded-[18px] px-4 py-3 text-left transition-[background-color,color,transform] duration-200 active:scale-[0.98]",
                        main === m ? "bg-tinta text-creme" : "bg-creme-2 text-tinta hover:bg-creme-3",
                      )}
                    >
                      <span>
                        <span className="block font-display text-[1.1rem] font-bold leading-tight" style={{ fontStretch: "88%" }}>{p.dishes[m].name}</span>
                        <span className={cn("block text-[0.82rem]", main === m ? "text-creme/70" : "text-tinta/65")}>{p.dishes[m].note}</span>
                      </span>
                      {m === "feijoada" && <span className={cn("kicker shrink-0 rounded-full px-2 py-1 text-[0.6rem]", main === m ? "bg-ouro text-tinta" : "bg-mato text-creme")}>Sa·So</span>}
                    </button>
                  ))}
                </div>
              </div>
              {hasPortions && (
                <div>
                  <p className="label text-tinta/70">{p.choosePortion}</p>
                  {seg(p.choosePortion, [{ v: "s", label: `${p.small} · ${main === "picanha" || main === "carne-seca" ? "150 g" : ""}` }, { v: "l", label: `${p.large} · 200 g` }], large ? "l" : "s", (v) => setLarge(v === "l"))}
                </div>
              )}
              <div>
                <p className="label text-tinta/70">{feijoada ? p.chooseFeijoada : p.chooseSide}</p>
                {feijoada
                  ? seg(p.chooseFeijoada, FEIJOADA_SIDES.map((v, i) => ({ v, label: feijoadaSideLabels[i] })), side, setSide)
                  : seg(p.chooseSide, [{ v: "fries" as SideKey, label: p.fries }, { v: "cassava" as SideKey, label: p.cassava }], side, setSide)}
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:sticky lg:top-28">
              <div className="relative mx-auto max-w-[560px]">
                <PlateArt main={main} side={side} large={large} shown={shown} reduce={reduce} label={label} />
                <AnimatePresence>
                  {photo && shown >= 4 && (
                    <motion.figure
                      key={photo}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: 8, y: 30 }}
                      animate={{ opacity: 1, rotate: 4, y: 0 }}
                      exit={{ opacity: 0, rotate: 10, y: 20 }}
                      transition={{ duration: 0.5, ease: EASE_OUT }}
                      className="absolute -bottom-6 -right-2 w-[38%] rounded-[18px] bg-creme p-2 shadow-[0_20px_40px_-18px_rgba(0,0,0,0.5)] sm:-right-6"
                    >
                      <Img id={photo} sizes="220px" className="aspect-[4/5] w-full rounded-[12px]" />
                      <figcaption className="px-1 pt-1.5 text-[0.7rem] text-tinta/70">{p.photo}</figcaption>
                    </motion.figure>
                  )}
                </AnimatePresence>
              </div>
              <div className="mt-10 flex flex-wrap items-end justify-between gap-4 rounded-[24px] bg-tinta p-5 text-creme" aria-live="polite">
                <div>
                  <p className="font-display text-[1.3rem] font-bold leading-tight" style={{ fontStretch: "88%" }}>{dishName}{hasPortions ? ` · ${large ? p.large : p.small}` : ""}</p>
                  <p className="text-sm text-creme/75">{p.with} {sidesText}</p>
                  {feijoada && <p className="mt-1 text-sm text-ouro">{p.weekendOnly}</p>}
                </div>
                <p className="display text-[2.6rem] text-ouro tabular"><span className="sr-only">{p.price}: </span>CHF {chf(price)}</p>
              </div>
              <p className="mt-2 text-xs text-tinta/60">{p.illustration}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <button type="button" className="pill pill-dark" onClick={() => openBooking()}>{p.reserveThis}<IconArrow size={16} className="arrow" /></button>
                <a className="pill pill-ghost text-tinta" href={URLS.order} target="_blank" rel="noopener">{p.orderThis}<IconExternal size={15} /><span className="sr-only">{t.a11y.newTab}</span></a>
                <a className="pill pill-ghost text-tinta" href={href("karte")} onClick={(e) => { e.preventDefault(); go("karte"); }}>{p.toMenu}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
