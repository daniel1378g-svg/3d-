// Über uns: the live heading set giant with its photo in an arch, the story as a vertical timeline (2004 · 2010 ·
// 2020) with the live paragraph split at its dates, and the closing question with the booking and phone buttons.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TX } from "@/content/site";
import { photo } from "@/content/photos";
import { FadeIn } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { PillButton, PillLink } from "@/components/ui/Pill";
import { IconPhone } from "@/components/icons";

export default function UeberPage() {
  const { lang, book } = useSite();
  const steps = [
    { year: "2004", text: TX.story1 },
    { year: "2010", text: TX.story2 },
    { year: "2020", text: TX.story3 },
  ];
  return (
    <>
      <PageHero lang={lang} eyebrow={TX.ueberLine[lang]} title={[TX.ueberH1[lang]]} photo={photo("restaurant-saal")}>
        <p className="mt-6 font-display text-[clamp(22px,2.2vw,36px)] font-semibold uppercase leading-[1.05] text-suave">{TX.ueberH2[lang]}</p>
      </PageHero>
      <section className="bg-marca-escura py-20 text-branco md:py-28" aria-label={UI.story[lang]}>
        <div className="container-x">
          <ol className="relative list-none space-y-12 border-l-2 border-destaque/40 pl-8 md:pl-14">
            {steps.map((s, i) => (
              <FadeIn as="li" key={s.year} delay={i * 0.08} className="relative">
                <span aria-hidden="true" className="absolute -left-[41px] top-3 h-4 w-4 rounded-full bg-destaque md:-left-[65px]" />
                <p className="font-hand text-[clamp(34px,3vw,52px)] leading-none text-destaque">{s.year}</p>
                <p className="mt-3 max-w-[760px] text-[clamp(18px,1.4vw,24px)] leading-relaxed">{s.text[lang]}</p>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>
      <section className="bg-marca py-20 text-branco md:py-28">
        <div className="container-x">
          <p className="max-w-[1000px] font-display text-[clamp(32px,4.4vw,80px)] font-extrabold uppercase leading-[0.92]">{TX.ueberEnd[lang]}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PillButton onClick={book}>{UI.online[lang]}</PillButton>
            <PillLink variant="cream" href={`tel:${BUSINESS.restaurant.tel}`} icon={<IconPhone size={18} />}>
              {BUSINESS.restaurant.phone}
            </PillLink>
          </div>
        </div>
      </section>
    </>
  );
}
