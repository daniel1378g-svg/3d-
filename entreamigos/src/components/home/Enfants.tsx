// Section 14: the kids' menus as four paper cards with their French joke names. They tilt toward the pointer;
// tapping flips one to show what it holds and its price, with the joke translated in small type.
import { useState } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { KIDS, KIDS_JOKE, descText, priceText } from "@/content/carte";
import { cn } from "@/lib/utils";
import { SplitReveal } from "../Reveal";
import { IceCream } from "../Illustrations";

const TILT = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

export function Enfants({ eyebrow }: { eyebrow?: string }) {
  const { lang } = useSite();
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  return (
    <section id="enfants" className="tex-marca relative overflow-hidden bg-fundo py-24 md:py-36" aria-labelledby="kids-title">
      <IceCream className="pointer-events-none absolute -right-6 top-16 w-24 rotate-12 md:w-44" />
      <div className="container-x relative">
        <p className="eyebrow text-linha">{eyebrow ?? `14 / 16 · ${UI.enfants[lang]}`}</p>
        <SplitReveal as="h2" id="kids-title" text={[UI.enfants[lang]]} className="mt-4 fs-xxl font-extrabold text-marca" />
        <p className="mt-4 text-linha">{UI.flipHint[lang]}</p>
        <ul className="mt-12 grid list-none gap-5 [perspective:1400px] sm:grid-cols-2 lg:grid-cols-4">
          {KIDS.map((k, i) => {
            const on = !!flipped[k.id];
            return (
              <li key={k.id} className={cn("transition-transform duration-500 hover:rotate-0 motion-reduce:rotate-0", TILT[i])}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFlipped((f) => ({ ...f, [k.id]: !f[k.id] }))}
                  onPointerMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -8}deg`);
                    e.currentTarget.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 8}deg`);
                  }}
                  onPointerLeave={(e) => {
                    e.currentTarget.style.setProperty("--rx", "0deg");
                    e.currentTarget.style.setProperty("--ry", "0deg");
                  }}
                  className="group relative block aspect-[3/4] w-full text-left [transform-style:preserve-3d] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] motion-reduce:[transform:none]"
                >
                  <span className={cn("absolute inset-0 grid content-between rounded-[22px] bg-branco p-6 shadow-[0_30px_50px_-30px_rgba(61,6,18,0.5)] [backface-visibility:hidden] transition-transform duration-700 ease-[var(--ease-out)] motion-reduce:transition-none", on && "[transform:rotateY(180deg)]")}>
                    <span aria-hidden="true" className="h-4 w-4 justify-self-center rounded-full bg-marca shadow-[0_2px_0_rgba(0,0,0,0.25)]" />
                    <span lang="fr" className="dish-name font-display text-[clamp(36px,3.4vw,54px)] font-extrabold uppercase leading-[0.9] text-marca">
                      {k.name}
                    </span>
                    {lang !== "fr" && <span className="text-[15px] text-linha">{KIDS_JOKE[k.name][lang]}</span>}
                    <span className="font-display text-[14px] font-semibold uppercase tracking-[0.16em] text-linha">↻ {UI.menu[lang]}</span>
                  </span>
                  <span className={cn("absolute inset-0 grid content-center gap-4 rounded-[22px] bg-marca p-6 text-branco [backface-visibility:hidden] [transform:rotateY(-180deg)] transition-transform duration-700 ease-[var(--ease-out)] motion-reduce:transition-none", on && "[transform:rotateY(0deg)]")}>
                    <span className="text-[19px] leading-snug">{descText(k, lang)}</span>
                    <span className="font-display text-[44px] font-extrabold leading-none text-destaque">{priceText(k, lang)}</span>
                    <span lang="fr" className="eyebrow text-suave">
                      {k.name}
                    </span>
                  </span>
                  {/* reduced motion and screen readers: the contents are also plain text */}
                  <span className="sr-only">
                    {descText(k, lang)} · {priceText(k, lang)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
