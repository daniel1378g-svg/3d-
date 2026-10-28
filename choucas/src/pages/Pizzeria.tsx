import { UI } from "@/i18n";
import { PIZZERIA, TAKEAWAY } from "@/copy";
import { CONTACT } from "@/content";
import { useSite } from "@/site";
import { PageHero } from "@/components/PageHero";
import { LiveBadge } from "@/components/LiveBadge";
import { Heading, Reveal } from "@/components/Reveal";
import { MenuBoard } from "@/components/MenuBoard";
import { HoursList } from "@/components/Contact";
import { SiteLink } from "@/components/SiteLink";
import { ParallaxPhoto } from "@/components/Parallax";
import { SmartImage } from "@/components/SmartImage";
import { Reviews } from "@/components/Reviews";
import { ArrowRight, ExternalIcon, PhoneIcon } from "@/components/icons";

export function Pizzeria() {
  const { lang, book } = useSite();
  return (
    <>
      <PageHero eyebrow={`Pizzeria Choucas · ${UI.location[lang]}`} title={PIZZERIA.title[lang]} lead={PIZZERIA.text[lang]} photoId="a3x7690" dot="bg-oven" position="50% 70%">
        <button type="button" onClick={book} className="inline-flex min-h-12 items-center rounded-full bg-beak px-6 font-semibold text-ink hover:bg-[#f5c55d]">
          {UI.bookTable[lang]}
        </button>
        <LiveBadge place="pizzeria" />
      </PageHero>

      {/* Pizza Geissupür */}
      <section aria-labelledby="geissupuer" className="on-light gutter overflow-hidden bg-snow py-20 md:py-28">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ParallaxPhoto id="a3x7699" className="aspect-square rounded-full shadow-[0_40px_80px_-40px_rgba(22,20,20,0.7)]" />
          </Reveal>
          <div>
            <Heading id="geissupuer" eyebrow={PIZZERIA.specialEyebrow[lang]} title={PIZZERIA.special[lang]} dot="bg-oven" />
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[52ch] text-xl leading-relaxed">{PIZZERIA.specialText[lang]}</p>
              <p className="mt-5 inline-block -rotate-1 rounded-2xl bg-beak px-5 py-3 font-display text-2xl font-bold">{PIZZERIA.specialLine[lang]}</p>
              <SmartImage id="pizzageissupuer" sizes="160px" reveal="up" className="mt-8 h-44 w-auto rounded-2xl" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Kinder backen Pizza */}
      <section aria-labelledby="kinder-backen" className="on-light gutter bg-sky/15 py-20 md:py-24">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Heading id="kinder-backen" eyebrow={PIZZERIA.eventLabel[lang]} title={PIZZERIA.eventTitle[lang]} dot="bg-sky" />
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[56ch] text-lg leading-relaxed">{PIZZERIA.eventText[lang]}</p>
              <p className="mt-4 inline-flex rounded-full bg-ink px-4 py-2 font-bold text-snow">{PIZZERIA.onRequest[lang]}</p>
              <p className="mt-6">
                <a href={CONTACT.kidsPizza} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
                  {PIZZERIA.eventLink[lang]} (leukerbad.ch)
                  <ExternalIcon />
                  <span className="sr-only">({UI.newTab[lang]})</span>
                </a>
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.05}>
            <ParallaxPhoto id="pizzabacken5" className="aspect-[16/10] rounded-[28px]" />
          </Reveal>
        </div>
      </section>

      {/* menu */}
      <section id="speisekarte" aria-labelledby="pizzeria-menu" className="on-light gutter bg-snow py-20 md:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading id="pizzeria-menu" eyebrow={PIZZERIA.menuText[lang]} title={UI.pizzeriaPart[lang]} dot="bg-oven" />
            <SiteLink page="menu" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-bold text-snow hover:bg-ink-2">
              {PIZZERIA.menuLink[lang]}
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </SiteLink>
          </div>
          <MenuBoard only="pizzeria" compact />
        </div>
      </section>

      <Reviews id="bewertungen" tone="cream" />

      {/* hours and take-away */}
      <section aria-labelledby="pizzeria-hours" className="on-dark gutter bg-ink py-20 text-snow md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div>
            <Heading id="pizzeria-hours" title={UI.hours[lang]} tone="dark" dot="bg-beak" />
            <div className="mt-8">
              <HoursList tone="dark" only="pizzeria" />
            </div>
          </div>
          <div>
            <Heading id="takeaway" title={TAKEAWAY.title[lang]} tone="dark" dot="bg-oven" />
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[52ch] text-lg text-snow/90">{TAKEAWAY.text[lang]}</p>
              <a href={CONTACT.tel} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-beak px-6 font-bold text-ink hover:bg-white">
                <PhoneIcon />
                {CONTACT.phone}
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
