import type { ReactNode } from "react";
import { UI, type PageKey } from "@/i18n";
import { CHOUCALINO, GAUCHO, HOME, PIZZERIA, STEAKHOUSE, TAKEAWAY } from "@/copy";
import { CONTACT, brandImg } from "@/content";
import type { Place } from "@/hours";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { LiveBadge } from "@/components/LiveBadge";
import { Band, Heading, Reveal, WordRise } from "@/components/Reveal";
import { SiteLink } from "@/components/SiteLink";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { ContactSection } from "@/components/Contact";
import { Magnetic } from "@/components/Magnetic";
import { LightFollow, ParallaxPhoto } from "@/components/Parallax";
import { SmartImage } from "@/components/SmartImage";
import { ArrowRight, ExternalIcon, PhoneIcon } from "@/components/icons";

export function HomeBelow() {
  const { lang } = useSite();
  return (
    <>
      <div id="restaurants" className="scroll-mt-16">
        <div className="gutter bg-snow pt-20 md:pt-28">
          <div className="wrap">
            <Heading eyebrow={UI.venuesEyebrow[lang]} title={UI.placesTitle[lang]} />
          </div>
        </div>
        <PizzeriaVenue />
        <OasisVenue />
        <ChoucalinoVenue />
      </div>
      <Reviews />
      <Awards />
      <Gallery />
      <BookOrder />
      <ContactSection />
    </>
  );
}

/** The practical line under each place: its hours as on the live home page, and whether it is open now. */
function Facts({ place, hours, tone = "light", children }: { place: Place; hours: string; tone?: "light" | "dark"; children?: ReactNode }) {
  const { lang } = useSite();
  return (
    <div className={cn("mt-7 grid gap-3 border-t pt-5 text-[15px]", tone === "dark" ? "border-snow/15" : "border-line")}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <p className={cn("tabular-nums", tone === "dark" ? "text-snow/80" : "text-muted")}>
          <span className="sr-only">{UI.hours[lang]}: </span>
          {hours}
        </p>
        <LiveBadge place={place} tone={tone} />
      </div>
      {children}
    </div>
  );
}

function Actions({ page, menuSection, tone = "light" }: { page: PageKey; menuSection?: string; tone?: "light" | "dark" }) {
  const { lang, book } = useSite();
  const dark = tone === "dark";
  return (
    <div className="mt-7 flex flex-wrap items-center gap-3">
      <SiteLink page={page} className={cn("group inline-flex min-h-12 items-center gap-2 rounded-full px-6 font-semibold transition-colors", dark ? "bg-snow text-ink hover:bg-white" : "bg-ink text-snow hover:bg-ink-2")}>
        {UI.toVenue[page as "pizzeria" | "steakhouse" | "choucalino"][lang]}
        <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
      </SiteLink>
      {menuSection && (
        <SiteLink page={page} section={menuSection} className={cn("inline-flex min-h-12 items-center rounded-full border px-5 font-semibold transition-colors", dark ? "border-snow/30 hover:border-snow" : "border-ink/20 hover:border-ink")}>
          {UI.venueMenu[lang]}
        </SiteLink>
      )}
      <button type="button" onClick={book} className={cn("inline-flex min-h-12 items-center px-2 font-semibold underline decoration-2 underline-offset-[6px] transition-colors", dark ? "decoration-beak hover:text-beak" : "decoration-beak hover:decoration-ink")}>
        {UI.book[lang]}
      </button>
    </div>
  );
}

function PizzeriaVenue() {
  const { lang } = useSite();
  return (
    <section aria-labelledby="venue-pizzeria" className="on-light gutter bg-snow py-16 md:py-24">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal>
          <LightFollow className="rounded-[24px]">
            <ParallaxPhoto id="pizza-ansicht" eager={false} reveal="left" position="50% 60%" className="aspect-[4/3] rounded-[24px]" />
          </LightFollow>
        </Reveal>
        <div className="min-w-0">
          <Reveal>
            <p className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-oven">
              <span aria-hidden="true" className="size-2 rounded-full bg-oven" />
              {HOME.boxes.pizzeria.intro[lang]}
            </p>
          </Reveal>
          <WordRise id="venue-pizzeria" as="h3" text="Pizzeria Choucas" className="mt-3 font-display text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-none tracking-[-0.03em]" />
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink/80">{PIZZERIA.text[lang]}</p>
            <Facts place="pizzeria" hours={HOME.boxes.pizzeria.hours[lang]}>
              <p className="flex flex-wrap gap-2">
                <span className="rounded-full bg-snow-2 px-3 py-1.5 font-medium">
                  {PIZZERIA.eventTitle[lang]} · {PIZZERIA.onRequest[lang]}
                </span>
                <span className="rounded-full bg-snow-2 px-3 py-1.5 font-medium">{TAKEAWAY.title[lang]}</span>
              </p>
            </Facts>
            <Actions page="pizzeria" menuSection="speisekarte" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function OasisVenue() {
  const { lang } = useSite();
  return (
    <Band bg="bg-ink-2" labelledBy="venue-oasis" className="on-dark gutter py-16 text-snow md:py-24">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="order-2 min-w-0 lg:order-1">
          <Reveal delay={0.2}>
            <p className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-sand">
              <span aria-hidden="true" className="size-2 rounded-full bg-ember" />
              {UI.grillSide[lang]}
            </p>
          </Reveal>
          <WordRise id="venue-oasis" as="h3" text="Oasis Steakhouse" className="mt-3 font-display text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-none tracking-[-0.03em] text-snow" />
          <Reveal delay={0.25}>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-snow/85">{HOME.boxes.oasis.intro[lang]}</p>
            <p className="mt-3 max-w-[52ch] leading-relaxed text-snow/70">{STEAKHOUSE.text[lang].replace(/\s*[-–]\s*$/, ".")}</p>
            <Facts place="oasis" hours={HOME.boxes.oasis.hours[lang]} tone="dark">
              <p>
                <SiteLink page="steakhouse" section="gaucho" className="group inline-flex min-h-11 items-center gap-2 font-semibold text-sand hover:text-snow">
                  {GAUCHO.title[lang]}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </SiteLink>
              </p>
            </Facts>
            <Actions page="steakhouse" menuSection="speisekarte" tone="dark" />
          </Reveal>
        </div>
        <Reveal delay={0.15} className="order-1 lg:order-2">
          <LightFollow className="rounded-[24px]">
            <ParallaxPhoto id="tbone2" reveal="right" position="40% 50%" className="aspect-[4/3] rounded-[24px]" />
          </LightFollow>
        </Reveal>
      </div>
    </Band>
  );
}

/** The Kid's Club: playful (sky blue, round shapes, the Choucalino® logo) within the same system. */
function ChoucalinoVenue() {
  const { lang } = useSite();
  const highlights = [CHOUCALINO.familyList[0], CHOUCALINO.familyList[1], CHOUCALINO.familyList[10]];
  return (
    <Band bg="bg-[#e3f0f8]" labelledBy="venue-choucalino" className="on-light gutter py-16 md:py-24">
      <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-sky/20" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-16 left-[8%] size-40 rounded-full bg-beak/25" />
      <div className="wrap relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <Reveal delay={0.15} className="relative">
          <LightFollow className="rounded-[32px]">
            <ParallaxPhoto id="choucalino" reveal="up" position="60% 45%" className="aspect-[4/3] rounded-[32px]" />
          </LightFollow>
          <div className="absolute -bottom-6 right-4 w-[42%] rotate-3 overflow-hidden rounded-[20px] border-4 border-snow shadow-[0_20px_40px_-20px_rgba(28,24,20,0.6)] max-sm:hidden">
            <SmartImage id="choucalinogrillfb" sizes="20vw" reveal="up" delay={0.3} />
          </div>
        </Reveal>
        <div className="min-w-0">
          <Reveal delay={0.2}>
            <img src={brandImg("choucalinologo")} alt="Choucalino®" width={238} height={134} loading="lazy" className="h-16 w-auto" />
          </Reveal>
          <WordRise id="venue-choucalino" as="h3" text="Choucalino® Kid’s Club" className="mt-4 font-display text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-none tracking-[-0.03em]" />
          <Reveal delay={0.25}>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink/80">{HOME.boxes.choucalino.intro[lang]}</p>
            <ul className="mt-5 grid gap-2">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 rounded-2xl bg-white/80 px-4 py-3 text-[16px]">
                  <span aria-hidden="true" className="mt-[7px] size-2.5 shrink-0 rounded-full bg-sky" />
                  {h[lang]}
                </li>
              ))}
              <li className="flex items-start gap-3 rounded-2xl bg-white/80 px-4 py-3 text-[16px]">
                <span aria-hidden="true" className="mt-[7px] size-2.5 shrink-0 rounded-full bg-beak" />
                {HOME.kidsGrill[lang]}
              </li>
            </ul>
            <Facts place="choucalino" hours={HOME.boxes.choucalino.hours[lang]} />
            <Actions page="choucalino" />
          </Reveal>
        </div>
      </div>
    </Band>
  );
}

/** As on the live site: Swiss Gastro "2. Platz", TripAdvisor Excellence and the "Familien Willkommen" seal. */
function Awards() {
  const { lang } = useSite();
  return (
    <section aria-labelledby="awards-title" className="on-light gutter border-t border-line bg-snow py-16 md:py-20">
      <div className="wrap grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-start">
        <Heading id="awards-title" title={HOME.awardsTitle[lang]} dot="bg-beak" size="md" />
        <ul className="grid gap-6 sm:grid-cols-3">
          <Reveal as="li" className="grid content-start gap-3">
            <img src={brandImg("swissgastro")} alt="Best of Swiss Gastro" width={71} height={80} loading="lazy" className="h-16 w-auto" />
            <p className="font-display text-lg font-semibold leading-snug">{HOME.swissGastro[lang]}</p>
            <p className="text-[15px] leading-snug text-muted">{HOME.swissGastroText[lang]}</p>
          </Reveal>
          <Reveal as="li" delay={0.06} className="grid content-start gap-3">
            <img src={brandImg("tripadvisorexcellence")} alt="" width={150} height={126} loading="lazy" className="h-16 w-auto self-start justify-self-start" />
            <a href={CONTACT.tripadvisor} target="_blank" rel="noopener" className="group inline-flex items-start gap-1.5 font-display text-lg font-semibold leading-snug hover:underline">
              {HOME.tripadvisor[lang]}
              <ExternalIcon className="mt-1.5 shrink-0" />
              <span className="sr-only">({UI.newTab[lang]})</span>
            </a>
          </Reveal>
          <Reveal as="li" delay={0.12} className="grid content-start gap-3">
            <img src={brandImg("familywelcome")} alt="" width={84} height={90} loading="lazy" className="h-16 w-auto self-start justify-self-start" />
            <p className="font-display text-lg font-semibold leading-snug">{HOME.familyWelcome[lang]}</p>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}

/** Reservieren / Speisekarte / Take-Away, with the take-away line and its flyer. */
function BookOrder() {
  const { lang, book } = useSite();
  const btn = "inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-[17px] font-semibold transition-colors";
  return (
    <section aria-labelledby="book-title" className="on-light gutter bg-snow-2 py-16 md:py-24">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Heading id="book-title" title={UI.bookTitle[lang]} dot="bg-beak" />
          <Reveal delay={0.08} className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <button type="button" onClick={book} className={cn(btn, "bg-beak text-ink shadow-[0_10px_24px_-14px_rgba(160,100,0,0.7)] hover:bg-[#f5c55d]")}>
                {UI.bookTable[lang]}
              </button>
            </Magnetic>
            <Magnetic>
              <SiteLink page="menu" className={cn(btn, "bg-ink text-snow hover:bg-ink-2")}>
                {UI.nav.menu[lang]}
              </SiteLink>
            </Magnetic>
            <Magnetic>
              <a href={CONTACT.tel} className={cn(btn, "border border-ink/20 hover:border-ink")}>
                <PhoneIcon />
                {UI.takeaway[lang]} · {CONTACT.phone}
              </a>
            </Magnetic>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-[52ch] text-lg text-ink/80">{TAKEAWAY.text[lang]}</p>
          </Reveal>
        </div>
        <Reveal delay={0.05}>
          <SmartImage id="bestellenwebsitekleinkleinklein" sizes="(min-width: 1024px) 40vw, 100vw" reveal="right" className="rounded-[20px] shadow-[0_30px_60px_-36px_rgba(28,24,20,0.6)]" />
        </Reveal>
      </div>
    </section>
  );
}
