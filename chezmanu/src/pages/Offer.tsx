import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { HTML_LANG, TEXT } from "@/i18n";
import { useSite } from "@/site";
import { SHELL, adopt } from "@/lib/shell";
import { Photo } from "@/components/Photo";
import { SiteLink } from "@/components/SiteLink";
import { SplitLetters } from "@/components/SplitLetters";
import { ArrowGlyph } from "@/components/Glyphs";
import { Carte } from "@/components/offer/Carte";

const OfferBelow = lazy(() => import("./OfferBelow"));

/** Ce que nous proposons: hero band and la carte first; the breakfast builder, teas, gallery, custom cakes and contact follow. */
export function Offer() {
  const { lang } = useSite();
  // Taking over the static first paint: the same photo node, the title already in place.
  const [still, setStill] = useState(SHELL.offer);
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) setStill(false);
    mounted.current = true;
  }, [lang]);
  return (
    <>
      <section className="espresso on-dark relative isolate flex min-h-[78svh] items-end overflow-hidden">
        {still && SHELL.offerPhoto ? (
          <div ref={adopt(SHELL.offerPhoto)} className="contents" />
        ) : (
          <Photo id="shop" sizes="100vw" priority className="absolute inset-0 -z-10 h-full w-full opacity-70" />
        )}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(42_26_18/0.95),rgb(42_26_18/0.35)_60%,rgb(42_26_18/0.55))]" />
        <div className="gutter w-full pb-16 pt-[calc(var(--header-h)+var(--label-h)+20vh)] md:pb-20">
          <div className="wrap">
            <h1 className="display max-w-[20ch] text-[clamp(2.5rem,6.5vw,5.6rem)] leading-[0.98] text-flour">
              <SplitLetters text={TEXT.offerTitle[lang]} lang={HTML_LANG[lang]} still={still} />
            </h1>
            <p className="mt-6 max-w-[60ch] text-[clamp(1.05rem,1.6vw,1.25rem)] text-flour/90">{TEXT.offerLead[lang]}</p>
            <SiteLink page="offer" section="carte" className="btn btn-custard mt-8">
              {TEXT.learnMore[lang]}<span className="sr-only"> – {TEXT.carteKicker[lang]}</span> <ArrowGlyph />
            </SiteLink>
          </div>
        </div>
      </section>
      <Carte />
      <Suspense fallback={<div className="min-h-[300svh]" />}>
        <OfferBelow />
      </Suspense>
    </>
  );
}
