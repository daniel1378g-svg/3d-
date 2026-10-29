// Section 7: the 11 dishes ordered 72 hours ahead, in port wine, beside the 72-hour planner.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { NOTES, ON_ORDER, SECTION_TITLES } from "@/content/carte";
import { FadeIn, SplitReveal } from "../Reveal";
import { Planner72 } from "../Planner72";
import { Clam } from "../Illustrations";

export function SurCommande() {
  const { lang } = useSite();
  return (
    <section id="sur-commande" className="relative overflow-hidden bg-vinho py-24 text-branco md:py-36" aria-labelledby="sc-title">
      <Clam className="pointer-events-none absolute -left-8 bottom-10 w-36 rotate-[-14deg] opacity-80 md:w-48" />
      <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)]">
        <div>
          <p className="eyebrow text-dourado">07 / 15 · {SECTION_TITLES["sur-commande"].local[lang]}</p>
          <SplitReveal as="h2" id="sc-title" text={[UI.surCommande[lang], "72 H"]} lineClassName={(i) => (i ? "text-dourado" : undefined)} className="mt-4 fs-xxl font-extrabold" />
          <ul className="mt-10 list-none divide-y divide-branco/15 border-y border-branco/15">
            {ON_ORDER.map((d, i) => (
              <FadeIn as="li" key={d.id} delay={i * 0.03} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
                <span lang="pt-PT" className="dish-name font-display text-[clamp(24px,2.3vw,38px)] font-bold uppercase leading-[1]">
                  {d.name}
                </span>
                <span className="font-hand text-[clamp(22px,1.7vw,28px)] leading-none text-dourado">
                  {d.notes.map((n) => NOTES[n][lang]).join(" · ")}
                </span>
              </FadeIn>
            ))}
          </ul>
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Planner72 />
        </div>
      </div>
    </section>
  );
}
