// Sur commande: the hero with the leitão photo, the five dishes as big rows (name, French description, price per
// person) and the group planner at full size.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TEXT } from "@/content/site";
import { ON_ORDER, descText, priceText } from "@/content/carte";
import { photo } from "@/content/photos";
import { FadeIn } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { GroupPlanner } from "@/components/GroupPlanner";

export default function SurCommandePage() {
  const { lang } = useSite();
  return (
    <>
      <PageHero lang={lang} tone="bg-acento-escuro text-branco" eyebrow={TEXT.min10[lang]} title={[UI.commande[lang]]} photo={photo("leitao")} />
      <section className="bg-acento-escuro pb-24 text-branco" aria-labelledby="sc-list">
        <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,580px)]">
          <div>
            <h2 id="sc-list" className="sr-only">
              {UI.commande[lang]}
            </h2>
            <ul className="list-none divide-y divide-branco/15 border-y border-branco/15">
              {ON_ORDER.map((d, i) => (
                <FadeIn as="li" key={d.id} delay={i * 0.04} className="grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <p lang="pt-PT" className="dish-name font-display text-[clamp(34px,3.6vw,60px)] font-extrabold uppercase leading-[0.92]">
                      {d.name}
                    </p>
                    <p lang="fr" className="mt-1 font-hand text-[clamp(26px,2vw,34px)] leading-none text-destaque">
                      {d.desc}
                    </p>
                    {lang !== "fr" && <p className="mt-1 text-[15px] text-suave">{descText(d, lang)}</p>}
                  </div>
                  <p className="font-display text-[clamp(24px,2vw,32px)] font-bold">{priceText(d, lang)}</p>
                </FadeIn>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-suave">{TEXT.prices[lang]}</p>
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <GroupPlanner />
          </div>
        </div>
      </section>
    </>
  );
}
