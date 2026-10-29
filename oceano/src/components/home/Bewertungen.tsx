// Section 14: "Kundenbewertungen". The live intro; the review wall stays out, because the live page shows no
// reviews (its widget renders none), and nothing is invented.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/site";
import { FadeIn, SplitReveal } from "../Reveal";
import { LottieIcon } from "../lottie/LottieIcon";

export function Bewertungen({ full = false }: { full?: boolean }) {
  const { lang } = useSite();
  return (
    <section id="bewertungen" className="tex-marca relative overflow-hidden bg-fundo py-24 text-marca-escura md:py-36" aria-labelledby="rev-title">
      <div className="container-x">
        <p className="eyebrow text-linha">{full ? TX.bewertungenH1[lang] : `14 / 16 · ${UI.bewertungen[lang]}`}</p>
        <SplitReveal as={full ? "h1" : "h2"} id="rev-title" text={[UI.bewertungen[lang]]} className="mt-4 fs-xxl font-extrabold" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="space-y-4 text-[clamp(17px,1.25vw,21px)] leading-relaxed">
            <FadeIn as="p">{TX.bewertungenP1[lang]}</FadeIn>
            <FadeIn as="p" delay={0.08}>
              {TX.bewertungenP2[lang]}
            </FadeIn>
            <FadeIn as="p" delay={0.16} className="font-hand text-[clamp(28px,2.4vw,40px)] leading-tight text-marca">
              {TX.bewertungenDanke[lang]}
            </FadeIn>
          </div>
          <div className="flex flex-col items-start gap-4 rounded-[24px] bg-branco p-6 shadow-[0_30px_60px_-34px_rgba(27,27,27,0.4)]">
            <LottieIcon name="glass" size={44} color="#1B1B1B" accent="#6E6140" mode="loop" />
            <p className="text-[15px] text-linha">{UI.noReviews[lang]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
