import { useState } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TX } from "@/content/site";
import { PDF, LUNCH, type Col } from "@/content/menu";
import { PageHero } from "@/components/PageHero";
import { ColFilter, MenuList, PdfLink, SearchBox, useFilterState } from "@/components/MenuList";
import { Tagesgerichte } from "@/components/home/Tagesgerichte";
import { FadeIn } from "@/components/Reveal";
import { cn } from "@/lib/utils";

/** The PDF's three columns in full, for the record (German headline / Portuguese line / price). */
function PdfColumns() {
  const { lang } = useSite();
  const [col, setCol] = useState<Col>("takeaway");
  const cols: Col[] = ["takeaway", "anfrage", "restaurant"];
  const label: Record<Col, string> = { takeaway: TX.pdfTakeaway[lang], anfrage: TX.pdfAnfrage[lang], restaurant: TX.pdfRestaurant[lang] };
  return (
    <section className="bg-marca py-20 text-fundo md:py-28" aria-labelledby="pdf-title">
      <div className="container-x">
        <p className="eyebrow text-ember">{TX.pdfSpeisekarte[lang]} · PDF</p>
        <h2 id="pdf-title" className="mt-3 fs-l font-semibold">
          {TX.n_pdfPrice[lang]}
        </h2>
        <div role="group" aria-label="PDF" className="mt-6 inline-flex flex-wrap rounded-full bg-branco/10 p-1">
          {cols.map((c) => (
            <button key={c} type="button" aria-pressed={col === c} onClick={() => setCol(c)} className={cn("rounded-full px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.1em]", col === c ? "bg-fundo text-marca" : "text-fundo")}>
              {label[c]}
            </button>
          ))}
        </div>
        <ul className="mt-6 grid list-none gap-x-10 md:grid-cols-2">
          {PDF[col].map((r) => (
            <li key={r.id} className="flex items-baseline gap-3 border-b border-fundo/15 py-2.5">
              <span className="min-w-0 flex-1">
                <span className="dish-name block font-display text-[17px] font-semibold leading-tight">{lang === "pt" ? r.headPt ?? r.pt : r.de}</span>
                <span className="block text-[13px] text-fundo/70">{lang === "pt" ? (r.deAlt !== r.de ? r.deAlt : r.de) : r.pt}</span>
              </span>
              <span className="font-display text-[16px] font-semibold tabular-nums">{r.price} {r.unit}</span>
            </li>
          ))}
          {col === "restaurant" && (
            <li className="flex items-baseline gap-3 border-b border-fundo/15 py-2.5">
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[17px] font-semibold leading-tight">{lang === "pt" ? LUNCH.pt : LUNCH.deAlt}</span>
                <span className="block text-[13px] text-fundo/70">{LUNCH.includes.map((i) => i.pt).join(" + ")}</span>
              </span>
              <span className="font-display text-[16px] font-semibold tabular-nums">{LUNCH.price} FR</span>
            </li>
          )}
        </ul>
        <p className="mt-5 text-[13px] text-fundo/60">{PDF.footer}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={BUSINESS.pdf} target="_blank" rel="noopener noreferrer" className="btn btn--cream btn--sm">
            menu_de.pdf <span className="sr-only">{UI.externalNew[lang]}</span>
          </a>
          <a href={BUSINESS.pdfPt} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm text-fundo">
            menu_pt.pdf <span className="sr-only">{UI.externalNew[lang]}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function SpeisekartePage() {
  const { lang } = useSite();
  const { filter, setFilter, query, setQuery } = useFilterState();
  return (
    <>
      <PageHero eyebrow={TX.n_menuEyebrow[lang]} title={UI.speisekarte[lang]} lang={lang}>
        <p className="mt-6 max-w-[640px] text-[clamp(16px,1.2vw,19px)] leading-relaxed text-fundo/80">{TX.n_menuLine[lang]}</p>
      </PageHero>
      <section className="bg-fundo py-16 text-marca md:py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <ColFilter value={filter} onChange={setFilter} id="page-filter" />
            <div className="flex flex-wrap items-center gap-3">
              <SearchBox value={query} onChange={setQuery} />
              <PdfLink />
            </div>
          </div>
          <FadeIn className="mt-8 rounded-[28px] bg-branco p-5 shadow-[0_30px_60px_-40px_rgba(43,26,18,0.4)] md:p-8">
            <MenuList filter={filter} query={query} />
          </FadeIn>
        </div>
      </section>
      <Tagesgerichte />
      <PdfColumns />
    </>
  );
}
