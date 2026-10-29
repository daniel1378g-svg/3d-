// Section 9: la cave. The wine map with its cards, the services line about wine and port sales, and the
// cork coaster with the logo to spin.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TEXT } from "@/content/site";
import { WINES } from "@/content/vins";
import { SplitReveal } from "../Reveal";
import { WineExplorer } from "../WineExplorer";
import { CorkCoaster } from "../CorkCoaster";
import { PillLink } from "../ui/Pill";
import { IconArrow } from "../icons";
import { LottieIcon } from "../lottie/LottieIcon";
import { PortGlass } from "../Illustrations";

export function Cave() {
  const { lang, href, go } = useSite();
  return (
    <section id="vins" className="on-dark tex-wave relative overflow-hidden bg-oceano py-24 text-branco md:py-36" aria-labelledby="cave-title">
      <PortGlass className="pointer-events-none absolute right-[6%] top-20 hidden w-20 rotate-12 md:block" />
      <div className="container-x">
        <p className="eyebrow text-dourado">
          09 / 15 · {UI.cave[lang]} · {WINES.length} {UI.wines[lang]}
        </p>
        <SplitReveal as="h2" id="cave-title" text={["Vinhos", "& Portos"]} lang="pt-PT" lineClassName={(i) => (i ? "text-dourado" : undefined)} className="mt-4 fs-mega font-extrabold" />
        <div className="mt-14">
          <WineExplorer />
        </div>
        <div className="mt-20 grid items-center gap-10 rounded-[28px] bg-branco/[0.05] p-6 shadow-[inset_0_0_0_1px_rgba(207,224,234,0.15)] md:grid-cols-[minmax(0,1fr)_minmax(220px,340px)] md:p-10">
          <div>
            <p className="flex items-center gap-3 eyebrow text-dourado">
              <LottieIcon name="glass" size={36} color="#FFFAF2" accent="#A22E1E" mode="loop" />
              {UI.wineSales[lang]}
            </p>
            <p className="mt-4 max-w-[640px] font-display text-[clamp(26px,2.4vw,40px)] font-semibold uppercase leading-[1.05]">{TEXT.services[lang]}</p>
            <p className="mt-4 text-[15px] text-espuma">{UI.noPrices[lang]}</p>
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
            <p className="mt-3 text-center font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-espuma">{UI.spinHint[lang]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
