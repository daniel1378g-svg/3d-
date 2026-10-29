// Section 7: the specialities, prepared only on request 48 hours ahead (the live menu page's sentence, set
// large), the "Especialidades" photo in an arch with a Caveat note, and the 48-hour planner.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TEXT } from "@/content/site";
import { photo, srcSet } from "@/content/photos";
import { MaskImage, SplitReveal } from "../Reveal";
import { Planner48 } from "../Planner48";
import { Alheira } from "../Illustrations";

export function Specialites() {
  const { lang } = useSite();
  const p = photo("especialidades");
  return (
    <section id="specialites" className="relative overflow-hidden bg-acento-escuro py-24 text-branco md:py-36" aria-labelledby="sp-title">
      <Alheira className="pointer-events-none absolute -left-8 bottom-10 w-36 rotate-[-14deg] opacity-80 md:w-52" />
      <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,580px)]">
        <div>
          <p className="eyebrow text-destaque">07 / 15 · {UI.onRequest48[lang]}</p>
          <SplitReveal as="h2" id="sp-title" text={["Especialidades", "48 H"]} lineClassName={(i) => (i ? "text-destaque" : undefined)} className="mt-4 fs-xxl font-extrabold" lang="pt-PT" />
          <p className="mt-8 max-w-[680px] font-display text-[clamp(26px,2.6vw,42px)] font-semibold uppercase leading-[1.04]">{TEXT.specialities48[lang]}</p>
          <div className="relative mt-12 max-w-[420px]">
            <MaskImage src={p.sm} srcSet={srcSet(p)} sizes="(min-width: 1024px) 420px, 80vw" alt={p.alt[lang]} w={p.w} h={p.h} className="arch-full aspect-[4/5] w-full" />
            <p className="absolute -right-4 bottom-10 max-w-[220px] rotate-[-6deg] rounded-2xl bg-destaque px-4 py-2 font-hand text-[clamp(26px,2.2vw,34px)] leading-[1] text-marca-escura shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)] sm:-right-16">
              {UI.handNote[lang]}
            </p>
          </div>
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Planner48 />
        </div>
      </div>
    </section>
  );
}
