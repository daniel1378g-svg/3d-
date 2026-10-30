import { useSite } from "@/site";
import { PageHero } from "@/components/PageHero";
import { Catering as CateringBlock } from "@/components/home/Catering";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";

const PHOTOS = ["catering-impression", "catering-impressionen-3", "catering-impressionen-7", "catering-impressionen-5", "catering-impressionen-1", "catering-impressionen-11", "catering-impressionen-8", "catering-impressionen-4"];

export function Catering() {
  const { t } = useSite();
  return (
    <>
      <PageHero kicker={t.catering.kicker} title={t.catering.title} lead={t.catering.claim} image="catering" />
      <CateringBlock full />
      <section className="skin-carvao2 py-20" aria-label={t.gallery.title}>
        <div className="gutter"><div className="wrap grid grid-cols-2 gap-3 md:grid-cols-4">
          {PHOTOS.map((p, i) => <Reveal key={p} delay={(i % 4) * 60} className="aspect-[4/3] overflow-hidden rounded-[22px]"><Img id={p} sizes="(min-width: 768px) 25vw, 50vw" className="h-full w-full" /></Reveal>)}
        </div></div>
      </section>
    </>
  );
}
