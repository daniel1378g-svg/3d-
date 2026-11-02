import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/copy";
import { PX } from "@/content/pages";
import { PageHero } from "@/components/PageHero";
import { FadeIn, MaskPhoto, SplitReveal } from "@/components/Reveal";
import { PillButton } from "@/components/ui/Pill";
import { Hosts } from "@/sections/Offerings";
import { Statement } from "@/sections/Statement";
import { Reviews } from "@/sections/Reviews";

const CHAPTERS = [
  { n: "01", t: TX.ch1Title, x: TX.ch1, photo: "pizza-ham-rocket" },
  { n: "02", t: TX.ch2Title, x: TX.ch2, photo: "aerial-village" },
  { n: "03", t: TX.ch3Title, x: TX.ch3, photo: "entrance-terrace" },
];

export default function StoryPage() {
  const { lang, book } = useSite();
  return (
    <>
      <PageHero eyebrow="La storia · 2012" title={TX.storyLabel[lang]} lead={PX.storyLead[lang]} photo="hosts" focus="62% 40%">
        <PillButton onClick={book}>{UI.reserve[lang]}</PillButton>
      </PageHero>
      <section id="chapters" data-anchor className="tex-contour bg-ink py-24 text-white md:py-32" aria-labelledby="chapters-title">
        <div className="container-x">
          <SplitReveal as="h2" id="chapters-title" text={PX.storyChaptersTitle[lang]} className="fs-xxl font-extrabold text-cream" />
          <ol className="mt-14 grid list-none gap-14">
            {CHAPTERS.map((c, i) => (
              <li key={c.n} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                <MaskPhoto id={c.photo} sizes="(min-width: 768px) 45vw, 92vw" from={i % 2 ? "right" : "left"} className={`${i === 1 ? "arch-full" : "rounded-[26px]"} aspect-[4/3] w-full ${i % 2 ? "md:order-2" : ""}`} />
                <div>
                  <p className="font-display text-[clamp(80px,9vw,160px)] font-extrabold leading-none text-gold">{c.n}</p>
                  <h3 className="mt-2 fs-l font-extrabold">{c.t[lang]}</h3>
                  <FadeIn as="p" className="lede mt-5 text-cream/90">
                    {c.x[lang]}
                  </FadeIn>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="bg-cream pb-24 md:pb-32" aria-label={UI.story[lang]}>
        <Hosts />
      </section>
      <Statement />
      <Reviews />
    </>
  );
}
