// The five questions and answers from the live site, as an accordion (height + opacity, short).
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSite } from "@/site";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { IconPlus } from "../icons";

export function Faq({ skin = "skin-lilac" }: { skin?: string }) {
  const { t, reduce } = useSite();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" data-anchor="faq" className={cn(skin, "py-24 md:py-32")} aria-labelledby="faq-title">
      <div className="gutter">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="kicker text-berry" data-lang-stagger>{t.faq.kicker}</p>
            <h2 id="faq-title" className="display mt-3 text-[clamp(3rem,7vw,7rem)] text-plum">{t.faq.title}</h2>
          </div>
          <ul className="flex flex-col">
            {t.faq.items.map((f, i) => {
              const on = open === i;
              return (
                <li key={f.q} className="border-b border-ink/15">
                  <h3>
                    <button type="button" id={`faq-q-${i}`} aria-controls={`faq-a-${i}`} aria-expanded={on} onClick={() => setOpen(on ? null : i)} className="flex w-full items-start justify-between gap-6 py-6 text-left">
                      <span className="font-display text-[1.25rem] font-bold leading-snug text-ink" style={{ fontStretch: "90%" }}>{f.q}</span>
                      <span className={cn("mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-plum text-cream transition-transform duration-300", on && "rotate-45")} aria-hidden="true"><IconPlus size={18} /></span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }} animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }} exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }} transition={{ duration: 0.26, ease: EASE_OUT }} className="overflow-hidden">
                        {f.a.split("\n").map((p) => <p key={p} className="max-w-[46rem] pb-5 text-ink/80">{p}</p>)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
