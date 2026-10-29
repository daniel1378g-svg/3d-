// Section 4: the Speisekarte teaser with the Take Away / Auf Anfrage / Restaurant filter and the PDF link.
import { useSite } from "@/site";
import { TX } from "@/content/site";
import { ColFilter, MenuList, PdfLink, useFilterState } from "../MenuList";
import { FadeIn, SplitReveal } from "../Reveal";
import { PillLink } from "../ui/Pill";
import { Bacalhau } from "../Illustrations";

export function MenuTeaser() {
  const { lang, href, go } = useSite();
  const { filter, setFilter } = useFilterState();
  return (
    <section id="speisekarte" className="relative overflow-hidden bg-fundo py-20 text-marca md:py-28" aria-labelledby="menu-title">
      <Bacalhau className="pointer-events-none absolute -right-10 top-10 w-[min(40vw,320px)] opacity-60 rm-hide max-sm:hidden" />
      <div className="container-x">
        <p className="eyebrow text-acento">{TX.n_menuEyebrow[lang]}</p>
        <SplitReveal as="h2" id="menu-title" text={TX.n_menuTitle[lang]} className="mt-4 fs-xl font-semibold" />
        <FadeIn as="p" className="mt-5 max-w-[640px] text-[16px] leading-relaxed text-linha">
          {TX.n_menuLine[lang]}
        </FadeIn>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <ColFilter value={filter} onChange={setFilter} id="teaser-filter" />
          <PdfLink />
        </div>
        <div className="mt-6 rounded-[28px] bg-branco p-5 shadow-[0_30px_60px_-40px_rgba(43,26,18,0.4)] md:p-8">
          <MenuList filter={filter} limit={8} />
        </div>
        <PillLink
          href={href("speisekarte")}
          className="mt-8"
          onClick={(e) => {
            e.preventDefault();
            go("speisekarte");
          }}
        >
          {TX.n_wholeMenu[lang]}
        </PillLink>
      </div>
    </section>
  );
}
