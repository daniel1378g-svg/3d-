import { useSite } from "@/site";
import { TX } from "@/content/copy";
import { PageHero } from "@/components/PageHero";
import { HotelCards } from "@/sections/GiftsStays";

export default function HotelsPage() {
  const { lang } = useSite();
  return (
    <>
      <PageHero eyebrow="Leukerbad · Partner" title={TX.hotelsTitle[lang]} lead={TX.hotelsLead[lang]} photo="garden-view" focus="62% 55%" />
      <section id="hotels" data-anchor className="tex-leaf bg-cream py-20 md:py-28" aria-label={TX.hotelsTitle[lang]}>
        <div className="container-x">
          <HotelCards />
        </div>
      </section>
    </>
  );
}
