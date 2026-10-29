// Section 7: "Sur commande pour minimum 10 personnes": the five dishes with their French descriptions and their
// price per person, the leitão photo in an arch, and the group planner.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TEXT } from "@/content/site";
import { ON_ORDER, priceText } from "@/content/carte";
import { photo } from "@/content/photos";
import { FadeIn, MaskImage, SplitReveal } from "../Reveal";
import { GroupPlanner } from "../GroupPlanner";

export function SurCommande() {
  const { lang } = useSite();
  const leitao = photo("leitao");
  return (
    <section id="sur-commande" className="relative overflow-hidden bg-acento-escuro py-24 text-branco md:py-36" aria-labelledby="sc-title">
      <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,580px)]">
        <div>
          <p className="eyebrow text-destaque">07 / 16 · {UI.commande[lang]} · {TEXT.min10[lang]}</p>
          <SplitReveal as="h2" id="sc-title" text={[UI.commande[lang]]} className="mt-4 fs-xxl font-extrabold" />
          <ul className="mt-10 list-none divide-y divide-branco/15 border-y border-branco/15">
            {ON_ORDER.map((d, i) => (
              <FadeIn as="li" key={d.id} delay={i * 0.04} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                <span>
                  <span lang="pt-PT" className="dish-name block font-display text-[clamp(28px,2.8vw,46px)] font-bold uppercase leading-[1]">
                    {d.name}
                  </span>
                  <span lang="fr" className="font-hand text-[clamp(24px,1.9vw,30px)] leading-none text-destaque">
                    {d.desc}
                  </span>
                </span>
                <span className="font-display text-[clamp(20px,1.6vw,26px)] font-bold tracking-[0.04em]">{priceText(d, lang)}</span>
              </FadeIn>
            ))}
          </ul>
          <p className="mt-4 text-[15px] text-suave">{TEXT.prices[lang]}</p>
          <MaskImage src={leitao.src} alt={leitao.alt[lang]} w={leitao.w} h={leitao.h} className="arch mt-12 aspect-[4/3] w-full max-w-[520px]" />
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <GroupPlanner />
        </div>
      </div>
    </section>
  );
}
