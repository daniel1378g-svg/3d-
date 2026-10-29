// Section 9: "Blanc, Rosé ou Rouge ?". The wine journey through the home page's wine paragraph, the Sumol line
// with an orange and a pineapple, and the cork coaster with the logo (the live text tells how Alentejo cork
// becomes wine corks).
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TEXT } from "@/content/site";
import { WINES } from "@/content/vins";
import { SplitReveal } from "../Reveal";
import { WineJourney } from "../WineJourney";
import { CorkCoaster } from "../CorkCoaster";
import { PillLink } from "../ui/Pill";
import { IconArrow } from "../icons";
import { Orange, Pineapple, WineBottle } from "../Illustrations";
import { Counter } from "../Counter";

export function Cave() {
  const { lang, href, go } = useSite();
  return (
    <section id="vins" className="on-dark tex-wave sheet relative z-10 overflow-hidden bg-marca-escura py-24 text-branco md:py-36" aria-labelledby="cave-title">
      <WineBottle className="pointer-events-none absolute right-[5%] top-20 hidden w-16 rotate-12 md:block" />
      <div className="container-x">
        <p className="eyebrow text-destaque">
          09 / 16 · {UI.vins[lang]} · <Counter to={WINES.length} /> {UI.wines[lang]}
        </p>
        <SplitReveal as="h2" id="cave-title" text={[TEXT.wineTitle[lang]]} className="mt-4 fs-xxl font-extrabold" />
        <div className="mt-14">
          <WineJourney />
        </div>
        <div className="mt-20 grid items-center gap-10 rounded-[28px] bg-branco/[0.05] p-6 shadow-[inset_0_0_0_1px_rgba(242,217,221,0.15)] md:grid-cols-[minmax(0,1fr)_minmax(220px,340px)] md:p-10">
          <div>
            <div className="flex items-center gap-4">
              <Orange className="w-16 shrink-0" />
              <Pineapple className="w-12 shrink-0" />
            </div>
            <p className="mt-5 max-w-[680px] font-display text-[clamp(24px,2.2vw,36px)] font-semibold uppercase leading-[1.08]">{TEXT.sumol[lang]}</p>
            <PillLink
              className="mt-8"
              href={href("vins")}
              onClick={(e) => {
                e.preventDefault();
                go("vins");
              }}
              iconRight={<IconArrow size={18} />}
            >
              {UI.allWines[lang]}
            </PillLink>
          </div>
          <div>
            <CorkCoaster className="mx-auto w-full max-w-[320px]" />
            <p className="mt-3 text-center font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-suave">{UI.spinHint[lang]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
