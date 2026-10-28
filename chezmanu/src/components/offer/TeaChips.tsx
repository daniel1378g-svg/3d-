import { useState } from "react";
import { UI } from "@/i18n";
import { CARTE_ITEMS, TEAS, chf } from "@/content";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { Reveal } from "../Reveal";

const SIROCCO = CARTE_ITEMS.find((i) => i.id === "sirocco")!;

/** The 13 Sirocco teas as chips that let off a little steam on hover, focus or tap (none with reduced motion). */
export function TeaChips() {
  const { lang } = useSite();
  const [steaming, setSteaming] = useState<string | null>(null);
  return (
    <section id="thes" aria-labelledby="teas-title" className="tiles gutter bg-flour py-20 md:py-24">
      <div className="wrap">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">{SIROCCO.name[lang]} · <span className="price">{chf(SIROCCO.price)}</span></p>
            <h2 id="teas-title" className="display mt-3 text-[clamp(2rem,4vw,3.2rem)] leading-tight text-cocoa">
              {UI.teasTitle[lang]}
            </h2>
          </div>
          <p className="text-espresso/80">{UI.teasLead[lang]}</p>
        </Reveal>
        <ul className="mt-10 flex flex-wrap gap-3">
          {TEAS.map((t, i) => (
            <Reveal key={t.name} as="li" delay={Math.min(i * 0.025, 0.3)}>
              <button
                type="button"
                aria-pressed={steaming === t.name}
                onClick={() => setSteaming((s) => (s === t.name ? null : t.name))}
                className={cn(
                  "group relative flex min-h-12 items-center gap-3 rounded-full py-2 pl-3 pr-5 text-left ring-1 transition-colors",
                  steaming === t.name ? "bg-espresso text-flour ring-espresso" : "bg-flour ring-espresso/15 hover:ring-caramel",
                )}
              >
                <span aria-hidden="true" className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-custard/50">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={steaming === t.name ? "text-custard" : "text-caramel"}>
                    <path d="M4 10h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" />
                    <path d="M17 12h1.5a2.5 2.5 0 0 1 0 5H17" />
                  </svg>
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    className={cn(
                      "steam absolute -top-5 left-1 text-caramel opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100",
                      steaming === t.name && "opacity-100",
                    )}
                  >
                    <path d="M8 22c-2-3 2-5 0-8" />
                    <path d="M13 22c-2-3 2-5 0-8" />
                    <path d="M18 22c-2-3 2-5 0-8" />
                  </svg>
                </span>
                <span>
                  <span className="block font-semibold leading-tight">{t.name}</span>
                  {t.kind[lang] && <span className={cn("block text-[13px] leading-tight", steaming === t.name ? "text-flour/80" : "text-espresso/70")}>{t.kind[lang]}</span>}
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
