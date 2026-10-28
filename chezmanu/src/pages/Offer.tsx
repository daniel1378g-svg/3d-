import { TEXT } from "@/i18n";
import { useSite } from "@/site";
import { Photo } from "@/components/Photo";
import { SiteLink } from "@/components/SiteLink";
import { SplitLetters } from "@/components/SplitLetters";
import { ArrowGlyph } from "@/components/Glyphs";
import { Carte } from "@/components/offer/Carte";
import { BreakfastBuilder } from "@/components/offer/BreakfastBuilder";
import { TeaChips } from "@/components/offer/TeaChips";
import { GalleryWall } from "@/components/offer/GalleryWall";
import { CustomCake } from "@/components/offer/CustomCake";
import { ContactBlock } from "@/components/ContactBlock";
import { HTML_LANG } from "@/i18n";

/** Ce que nous proposons: hero band, la carte, the breakfast builder, the teas, the gallery wall, custom cakes, contact. */
export function Offer() {
  const { lang } = useSite();
  return (
    <>
      <section className="espresso on-dark relative isolate flex min-h-[78svh] items-end overflow-hidden">
        <Photo id="shop" sizes="100vw" priority className="absolute inset-0 -z-10 h-full w-full opacity-70" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(42_26_18/0.95),rgb(42_26_18/0.35)_60%,rgb(42_26_18/0.55))]" />
        <div className="gutter w-full pb-16 pt-[calc(var(--header-h)+var(--label-h)+20vh)] md:pb-20">
          <div className="wrap">
            <h1 className="display max-w-[20ch] text-[clamp(2.5rem,6.5vw,5.6rem)] leading-[0.98] text-flour">
              <SplitLetters text={TEXT.offerTitle[lang]} lang={HTML_LANG[lang]} />
            </h1>
            <p className="mt-6 max-w-[60ch] text-[clamp(1.05rem,1.6vw,1.25rem)] text-flour/90">{TEXT.offerLead[lang]}</p>
            <SiteLink page="offer" section="carte" className="btn btn-custard mt-8">
              {TEXT.learnMore[lang]} <ArrowGlyph />
            </SiteLink>
          </div>
        </div>
      </section>
      <Carte />
      <BreakfastBuilder />
      <TeaChips />
      <GalleryWall />
      <CustomCake />
      <ContactBlock lead="offer" />
    </>
  );
}
