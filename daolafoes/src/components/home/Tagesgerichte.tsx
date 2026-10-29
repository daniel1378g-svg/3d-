// Section 2: Mittags. The lunch formula from the PDF (20.00 FR: Sopa + Salada + Prato Principal + Bebida +
// Sobremesa + Café), the live heading "TAGESGERICHTE ZUM MITTAGESSEN", no invented dish.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/site";
import { LUNCH } from "@/content/menu";
import { FadeIn, SplitReveal } from "../Reveal";
import { Orange, Jug } from "../Illustrations";

const INCLUDES: Record<string, Record<string, string>> = {
  "1 Sopa": { de: "1 Suppe", fr: "1 soupe", it: "1 zuppa", en: "1 soup" },
  "1 Salada": { de: "1 Salat", fr: "1 salade", it: "1 insalata", en: "1 salad" },
  "1 Prato Principal": { de: "1 Hauptgericht", fr: "1 plat principal", it: "1 piatto principale", en: "1 main course" },
  "1 Bebida": { de: "1 Getränk", fr: "1 boisson", it: "1 bevanda", en: "1 drink" },
  "1 Sobremesa da Casa": { de: "1 Dessert des Hauses", fr: "1 dessert maison", it: "1 dolce della casa", en: "1 dessert of the house" },
  "1 Café": { de: "1 Kaffee", fr: "1 café", it: "1 caffè", en: "1 coffee" },
};

export function Tagesgerichte({ full = false }: { full?: boolean }) {
  const { lang } = useSite();
  return (
    <section id="tagesgerichte" className="tex-paper relative overflow-hidden bg-fundo py-20 text-marca md:py-28" aria-labelledby="lunch-title">
      <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center">
        <div>
          <p className="eyebrow text-acento">{TX.n_lunchEyebrow[lang]} · {TX.tagesgerichte[lang]}</p>
          <SplitReveal as={full ? "h1" : "h2"} id="lunch-title" text={TX.n_lunchTitle[lang]} className="mt-4 fs-xl font-semibold" />
          <FadeIn as="p" className="mt-5 max-w-[480px] text-[17px] leading-relaxed text-linha">
            {TX.n_lunchLine[lang]}
          </FadeIn>
          <FadeIn className="mt-6 flex items-baseline gap-3" delay={0.1}>
            <span className="font-display text-[clamp(48px,6vw,88px)] font-semibold leading-none">{LUNCH.price}</span>
            <span className="font-display text-[24px]">FR</span>
          </FadeIn>
          <p className="mt-2 text-[13px] text-linha">{TX.n_lunchSource[lang]} · {LUNCH.pt}</p>
        </div>
        <FadeIn className="paper relative p-6 md:p-10" delay={0.1}>
          <Orange className="absolute -right-4 -top-6 w-16 rotate-12 md:w-20" />
          <Jug className="absolute -bottom-4 -left-3 w-12 -rotate-6 md:w-16" />
          <p className="eyebrow text-linha">{TX.n_lunchIncludes[lang]}</p>
          <ol className="mt-4 grid list-none gap-3 sm:grid-cols-2">
            {LUNCH.includes.map((it, i) => (
              <li key={it.pt} className="flex items-center gap-4 rounded-[16px] bg-fundo px-4 py-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-destaque font-display text-[17px] font-semibold text-branco">{i + 1}</span>
                <span>
                  <span className="block font-display text-[20px] font-semibold leading-tight">{lang === "pt" ? it.pt : INCLUDES[it.pt]?.[lang] ?? it.pt}</span>
                  {lang !== "pt" && <span className="text-[13px] text-linha">{it.pt}</span>}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-[13px] text-linha">{UI.lunch[lang]} · {LUNCH.pt}</p>
        </FadeIn>
      </div>
    </section>
  );
}
