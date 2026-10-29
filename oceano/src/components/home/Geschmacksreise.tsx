// Section 9: "Stockfisch und mehr". The taste journey through the shop's own words, and the cork coaster with
// the logo (the shop sells the "berühmten Portwein").
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/site";
import { SplitReveal } from "../Reveal";
import { TasteJourney } from "../TasteJourney";
import { CorkCoaster } from "../CorkCoaster";

export function Geschmacksreise() {
  const { lang } = useSite();
  const title = TX.ladenH1[lang].split(" – ")[1] ?? TX.ladenH1[lang];
  return (
    <section id="geschmacksreise" className="on-dark tex-wave sheet relative z-10 overflow-hidden bg-marca-escura py-24 text-branco md:py-36" aria-labelledby="reise-title">
      <div className="container-x">
        <p className="eyebrow text-destaque">
          09 / 16 · {UI.journey[lang]} · {TX.ladenH1[lang].split(" – ")[0]}
        </p>
        <SplitReveal as="h2" id="reise-title" text={[title]} className="mt-4 fs-xxl font-extrabold" />
        <div className="mt-14">
          <TasteJourney />
        </div>
        <div className="mt-20 grid items-center gap-10 rounded-[28px] bg-branco/[0.05] p-6 shadow-[inset_0_0_0_1px_rgba(243,242,225,0.15)] md:grid-cols-[minmax(0,1fr)_minmax(220px,340px)] md:p-10">
          <p className="max-w-[680px] font-display text-[clamp(24px,2.2vw,36px)] font-semibold uppercase leading-[1.08]">{TX.reise2[lang]}</p>
          <div>
            <CorkCoaster className="mx-auto w-full max-w-[320px]" />
            <p className="mt-3 text-center font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-suave">{UI.spinHint[lang]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
