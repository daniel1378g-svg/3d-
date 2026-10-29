// Section 12: "Web-Shop". The live line, the products (none could be captured: the live store page renders
// none, so the line and the pill alone, with a note), and "Zum Web-Shop".
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TX } from "@/content/site";
import { SplitReveal } from "../Reveal";
import { LottieIcon } from "../lottie/LottieIcon";
import { IconExternal } from "../icons";
import { Basket, WineBottle } from "../Illustrations";

export function WebShop({ full = false }: { full?: boolean }) {
  const { lang } = useSite();
  return (
    <section id="web-shop" className="relative overflow-hidden bg-destaque py-24 text-marca-escura md:py-32" aria-labelledby="shop-title">
      <WineBottle className="pointer-events-none absolute right-[6%] top-14 hidden w-14 rotate-12 md:block" />
      <div className="container-x">
        <p className="eyebrow">{full ? TX.shopH1[lang] : `12 / 16 · ${UI.shop[lang]}`}</p>
        <SplitReveal as={full ? "h1" : "h2"} id="shop-title" text={[UI.shop[lang]]} className="mt-4 fs-xxl font-extrabold" />
        <p className="mt-6 max-w-[860px] font-display text-[clamp(22px,2.2vw,36px)] font-semibold uppercase leading-[1.08]">{full ? TX.shopP[lang] : TX.shopLine[lang]}</p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a href={BUSINESS.webShop} target="_blank" rel="noopener noreferrer" className="btn btn--lg btn--dark group">
            <LottieIcon name="bag" size={26} color="#FFFFFF" accent="#DFCE9B" />
            <span className="btn-roll">
              <span>{UI.toShop[lang]}</span>
              <span aria-hidden="true">{UI.toShop[lang]}</span>
            </span>
            <IconExternal size={20} />
            <span className="sr-only">{UI.externalNew[lang]}</span>
          </a>
          <Basket className="w-24" />
        </div>
        <p className="mt-8 max-w-[720px] rounded-[16px] bg-marca-escura/10 px-4 py-3 text-[14px]">{UI.noProducts[lang]}</p>
      </div>
    </section>
  );
}
