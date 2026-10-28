import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { UI, fill } from "@/i18n";
import { CARTE, COFFEES, chf } from "@/content";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { CUPS, CupDrawing, TRAY_ITEMS, type CupKind } from "../Illustrations";
import { Reveal } from "../Reveal";

const FORMULAS = CARTE.find((s) => s.id === "petit-dejeuner")!.items;
const LABEL = { ballon: "trayBallon", croissant: "trayCroissant", slices: "traySlices", juice: "trayJuice", butter: "trayButter", jam: "trayJam" } as const;

/**
 * Petit-déjeuner Maison: pick N°1 or N°2 and its items slide onto the tray; pick the hot drink from the
 * coffee list and its cup takes its place. The price stays CHF 12.00. A display of the menu, not an order.
 */
export function BreakfastBuilder() {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [formula, setFormula] = useState(FORMULAS[0].id);
  const [drink, setDrink] = useState(COFFEES[0].id);
  const id = useId();
  const f = FORMULAS.find((x) => x.id === formula)!;
  const d = COFFEES.find((x) => x.id === drink)!;
  const items = (f.tray ?? []).filter((k) => k !== "drink");

  return (
    <section id="petit-dejeuner" aria-labelledby={`${id}-title`} className="dust gutter bg-flour-deep py-20 md:py-28">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="kicker">{CARTE.find((s) => s.id === "petit-dejeuner")!.title[lang]}</p>
          <h2 id={`${id}-title`} className="display mt-3 text-[clamp(2.1rem,4.4vw,3.6rem)] leading-tight text-cocoa">
            {UI.breakfastTitle[lang]}
          </h2>
          <p className="mt-4 max-w-[48ch]">{UI.breakfastLead[lang]}</p>

          <fieldset className="mt-8">
            <legend className="kicker mb-3">{UI.formula[lang]}</legend>
            <div className="grid grid-cols-2 gap-3">
              {FORMULAS.map((x) => (
                <label
                  key={x.id}
                  className={cn(
                    "relative cursor-pointer rounded-2xl p-4 ring-1 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-azulejo",
                    formula === x.id ? "bg-espresso text-flour ring-espresso" : "bg-flour ring-espresso/15 hover:ring-espresso/40",
                  )}
                >
                  <input type="radio" name={`${id}-formula`} value={x.id} checked={formula === x.id} onChange={() => setFormula(x.id)} className="sr-only" />
                  <span className="display block text-3xl">{x.name[lang]}</span>
                  <span className={cn("price mt-1 block text-sm font-semibold", formula === x.id ? "text-custard" : "text-caramel")}>{chf(x.price)}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="kicker mb-3">{UI.hotDrink[lang]}</legend>
            <div className="flex flex-wrap gap-2">
              {COFFEES.map((c) => (
                <label
                  key={c.id}
                  className={cn(
                    "cursor-pointer rounded-full px-4 py-2.5 text-[15px] font-semibold ring-1 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-azulejo",
                    drink === c.id ? "bg-custard text-espresso ring-custard-deep" : "bg-flour ring-espresso/15 hover:ring-espresso/40",
                  )}
                >
                  <input type="radio" name={`${id}-drink`} value={c.id} checked={drink === c.id} onChange={() => setDrink(c.id)} className="sr-only" />
                  {c.name[lang]}
                </label>
              ))}
            </div>
            <p className="mt-3 text-sm text-espresso/75">{UI.drinkQuestion[lang]}</p>
          </fieldset>
        </Reveal>

        <Reveal delay={0.1}>
          <figure aria-label={fill(UI.tray[lang], { n: f.name[lang] })} className="relative mx-auto max-w-[620px]">
            <div className="relative aspect-[16/11] rounded-[44px] bg-[linear-gradient(160deg,#b87634,#8a4e1c)] p-[4.5%] shadow-lift">
              <div className="relative h-full w-full rounded-[32px] bg-[radial-gradient(ellipse_at_40%_30%,#fffaf1,#f3e6cf)] shadow-[inset_0_6px_18px_rgb(90_40_10/0.25)]">
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 place-items-center gap-2 p-[6%] pr-[30%] text-cocoa">
                  <AnimatePresence mode="popLayout">
                    {items.map((k, i) => (
                      <motion.div
                        key={`${formula}-${k}`}
                        layout={!reduce}
                        initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateX(120px) rotate(12deg)" }}
                        animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateX(0px) rotate(0deg)" }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateX(-60px) rotate(-8deg)" }}
                        transition={reduce ? { duration: 0.2 } : { type: "spring", bounce: 0.3, duration: 0.6, delay: i * 0.06 }}
                        className="grid w-full place-items-center"
                      >
                        {TRAY_ITEMS[k]({ size: 120, className: "h-auto w-[86%] max-w-[110px]" })}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <div className="absolute bottom-[8%] right-[5%] top-[8%] grid w-[27%] place-items-center">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={drink}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-40px)" }}
                      animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
                      exit={{ opacity: 0 }}
                      transition={reduce ? { duration: 0.2 } : { type: "spring", bounce: 0.35, duration: 0.6 }}
                    >
                      <CupDrawing kind={(d.cup as CupKind) in CUPS ? (d.cup as CupKind) : "espresso"} size={150} className="h-auto w-full" />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <div className="absolute -right-2 -top-5 grid h-28 w-28 rotate-6 place-items-center rounded-full bg-espresso text-center text-flour shadow-set md:-right-6">
              <span>
                <span className="block text-[11px] font-bold uppercase tracking-widest text-custard">{f.name[lang]}</span>
                <span className="display price block text-2xl">{chf(f.price)}</span>
              </span>
            </div>
            <figcaption className="mt-6 rounded-2xl bg-flour p-5 ring-1 ring-espresso/10">
              <span className="display text-xl text-cocoa">
                {f.name[lang]} · <span className="price text-caramel">{chf(f.price)}</span>
              </span>
              <span className="mt-1 block">{f.desc?.[lang]}</span>
              <span className="mt-2 block text-sm text-espresso/75">
                {UI.hotDrink[lang]}{lang === "fr" ? " : " : ": "}<span className="font-semibold">{d.name[lang]}</span>
              </span>
              <span className="sr-only">
                {items.map((k) => UI[LABEL[k as keyof typeof LABEL]][lang]).join(", ")}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
