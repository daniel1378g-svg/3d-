import { UI } from "@/i18n";
import { MENU_PAGE } from "@/copy";
import { CONTACT } from "@/content";
import { useSite } from "@/site";
import { PageHero } from "@/components/PageHero";
import { Heading } from "@/components/Reveal";
import { MenuBoard } from "@/components/MenuBoard";
import { Featured } from "@/components/Featured";
import { ExternalIcon } from "@/components/icons";

export function MenuPage() {
  const { lang, book } = useSite();
  return (
    <>
      <PageHero eyebrow="Pizzeria Choucas · Oasis Steakhouse" title={MENU_PAGE.title[lang]} lead={MENU_PAGE.intro[lang]} photoId="parilladaweb" dot="bg-beak">
        <button type="button" onClick={book} className="inline-flex min-h-12 items-center rounded-full bg-beak px-6 font-bold text-ink hover:bg-white">
          {UI.book[lang]}
        </button>
        <a href={CONTACT.menuPdf} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-snow/45 px-6 font-bold hover:border-snow">
          {UI.fullMenuPdf[lang]}
          <ExternalIcon />
          <span className="sr-only"> ({UI.newTab[lang]})</span>
        </a>
      </PageHero>
      <section aria-labelledby="karte" className="on-light gutter bg-snow py-16 md:py-24">
        <div className="wrap">
          <Heading id="karte" title={UI.nav.menu[lang]} dot="bg-brand" />
          {UI.translatedNote[lang] && <p className="mt-3 text-sm text-muted">{UI.translatedNote[lang]}</p>}
          <div className="mt-8">
            <MenuBoard />
          </div>
        </div>
      </section>
      <section aria-labelledby="featured" className="on-light gutter bg-sand/45 py-20 md:py-28">
        <div className="wrap">
          <Heading id="featured" eyebrow="choucas.ch" title={MENU_PAGE.pdfLine[lang]} dot="bg-ember" />
          <Featured />
        </div>
      </section>
    </>
  );
}
