import { UI, type PageKey } from "@/i18n";
import { GAUCHO, HOME, TAKEAWAY } from "@/copy";
import { CONTACT, brandImg, photo, photoAlt } from "@/content";
import type { Place } from "@/hours";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { Hero } from "@/components/home/Hero";
import { LogoStrip } from "@/components/LogoStrip";
import { TiltCard } from "@/components/TiltCard";
import { LiveBadge } from "@/components/LiveBadge";
import { Heading, Reveal } from "@/components/Reveal";
import { SiteLink } from "@/components/SiteLink";
import { Gallery } from "@/components/Gallery";
import { ContactSection } from "@/components/Contact";
import { Magnetic } from "@/components/Magnetic";
import { ParallaxPhoto } from "@/components/Parallax";
import { ArrowRight, ExternalIcon, PhoneIcon } from "@/components/icons";
import { LottieIcon } from "@/lottie/LottieIcon";

export function Home() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <Places />
      <GauchoTeaser />
      <KidsGrill />
      <Awards />
      <Gallery />
      <BookOrder />
      <ContactSection />
    </>
  );
}

const PLACES: { page: PageKey; place: Place; name: string; photo: string; key: keyof typeof HOME.boxes; dot: string; ring: string }[] = [
  { page: "pizzeria", place: "pizzeria", name: "Pizzeria Choucas", photo: "bildboxpizzeria", key: "pizzeria", dot: "bg-oven", ring: "group-hover:ring-oven" },
  { page: "steakhouse", place: "oasis", name: "Oasis Steakhouse", photo: "bildboxoasis", key: "oasis", dot: "bg-ember", ring: "group-hover:ring-ember" },
  { page: "choucalino", place: "choucalino", name: "Choucalino® Kid’s Club", photo: "bildboxchoucalino", key: "choucalino", dot: "bg-sky", ring: "group-hover:ring-sky" },
];

/** The three home-page boxes as 3D tilt cards with glare, each with its own live hours. */
function Places() {
  const { lang } = useSite();
  return (
    <section aria-labelledby="places-title" className="on-light gutter bg-snow py-20 md:py-28">
      <div className="wrap">
        <Heading id="places-title" eyebrow={UI.placesEyebrow[lang]} title={UI.placesTitle[lang]} />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {PLACES.map((p, i) => (
            <Reveal as="li" key={p.page} delay={i * 0.08}>
              <TiltCard className="h-full">
                <SiteLink page={p.page} className={cn("group flex h-full flex-col overflow-hidden rounded-[28px] bg-white ring-2 ring-transparent transition-shadow", p.ring)}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-ink-2">
                    <img src={photo(p.photo)} alt={photoAlt(p.photo, lang)} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105" />
                    <div className="absolute inset-x-3 top-3">
                      <LiveBadge place={p.place} tone="dark" />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <h3 className="flex items-center gap-2.5 font-display text-2xl font-bold">
                      <span aria-hidden="true" className={cn("size-3 rounded-full", p.dot)} />
                      {p.name}
                    </h3>
                    <p className="text-[17px] leading-snug">{HOME.boxes[p.key].intro[lang]}</p>
                    <p className="text-[15px] text-muted">{HOME.boxes[p.key].hours[lang]}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-3 font-bold text-brand-ink">
                      {UI.more[lang]}
                      <ArrowRight className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </SiteLink>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function GauchoTeaser() {
  const { lang } = useSite();
  return (
    <section aria-labelledby="gaucho-teaser" className="on-dark tex-hex gutter overflow-hidden bg-ink py-20 text-snow md:py-28">
      <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <ParallaxPhoto id="tbone2" className="aspect-[16/11] rounded-[28px]" />
        </Reveal>
        <div>
          <Heading id="gaucho-teaser" eyebrow="Oasis Steakhouse" title={GAUCHO.title[lang]} tone="dark" dot="bg-ember" />
          <Reveal delay={0.1}>
            <p className="mt-6 line-clamp-5 max-w-[56ch] text-lg leading-relaxed text-snow/85">{GAUCHO.paragraphs[0][lang]}</p>
            <SiteLink page="steakhouse" section="gaucho" className="group mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-snow px-6 font-bold text-ink hover:bg-beak">
              {UI.more[lang]}
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </SiteLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function KidsGrill() {
  const { lang } = useSite();
  return (
    <section aria-labelledby="kids-grill" className="on-light gutter overflow-hidden bg-sky/15 py-20 md:py-24">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <Reveal>
            <img src={brandImg("choucalinologo")} alt="Choucalino®" width={238} height={134} loading="lazy" className="h-20 w-auto" />
          </Reveal>
          <Heading id="kids-grill" title={HOME.kidsGrill[lang]} dot="bg-sky" className="mt-6" />
          <Reveal delay={0.1}>
            <SiteLink page="choucalino" section="kinder-grill" className="group mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-bold text-snow hover:bg-sky-ink">
              {UI.more[lang]}
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </SiteLink>
          </Reveal>
        </div>
        <Reveal delay={0.05}>
          <ParallaxPhoto id="choucalinogrillfb" className="aspect-[3/2] rotate-1 rounded-[28px] shadow-[0_30px_60px_-30px_rgba(22,20,20,0.6)]" />
        </Reveal>
      </div>
    </section>
  );
}

/** As on the live site: Swiss Gastro "2. Platz", TripAdvisor Excellence and the "Familien Willkommen" seal. */
function Awards() {
  const { lang } = useSite();
  return (
    <section aria-labelledby="awards-title" className="on-light gutter bg-snow py-20 md:py-24">
      <div className="wrap">
        <Heading id="awards-title" title={HOME.awardsTitle[lang]} dot="bg-beak" />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          <Reveal as="li" className="flex gap-5 rounded-[24px] bg-white p-6 ring-1 ring-ink/8">
            <img src={brandImg("swissgastro")} alt="Best of Swiss Gastro" width={71} height={80} loading="lazy" className="h-20 w-auto shrink-0" />
            <div>
              <p className="font-display text-xl font-bold">{HOME.swissGastro[lang]}</p>
              <p className="mt-2 text-[15px] leading-snug text-muted">{HOME.swissGastroText[lang]}</p>
            </div>
          </Reveal>
          <Reveal as="li" delay={0.06} className="rounded-[24px] bg-white p-6 ring-1 ring-ink/8">
            <a href={CONTACT.tripadvisor} target="_blank" rel="noopener" className="group flex gap-5">
              <img src={brandImg("tripadvisorexcellence")} alt="" width={150} height={126} loading="lazy" className="h-20 w-auto shrink-0" />
              <span>
                <span className="block font-display text-xl font-bold group-hover:underline">{HOME.tripadvisor[lang]}</span>
                <span className="mt-2 inline-flex items-center gap-1.5 text-[15px] text-muted">
                  TripAdvisor <ExternalIcon />
                  <span className="sr-only">({UI.newTab[lang]})</span>
                </span>
              </span>
            </a>
          </Reveal>
          <Reveal as="li" delay={0.12} className="flex gap-5 rounded-[24px] bg-white p-6 ring-1 ring-ink/8">
            <img src={brandImg("familywelcome")} alt="" width={84} height={90} loading="lazy" className="h-20 w-auto shrink-0" />
            <p className="font-display text-xl font-bold">{HOME.familyWelcome[lang]}</p>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}

/** Reservieren / Speisekarte / Take-Away, as magnetic buttons, with the take-away line and its image. */
function BookOrder() {
  const { lang, book } = useSite();
  const btn = "group inline-flex min-h-14 items-center gap-3 rounded-full px-7 text-lg font-bold transition-colors";
  return (
    <section aria-labelledby="book-title" className="on-dark gutter overflow-hidden bg-oven py-20 text-snow md:py-24">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Heading id="book-title" title={UI.bookTitle[lang]} tone="dark" dot="bg-beak" />
          <Reveal delay={0.08} className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <button type="button" onClick={book} className={cn(btn, "bg-beak text-ink hover:bg-white")}>
                <LottieIcon name="calendar" color="#161414" accent="#C8372D" size={28} mode="hover" />
                {UI.book[lang]}
              </button>
            </Magnetic>
            <Magnetic>
              <SiteLink page="menu" className={cn(btn, "bg-snow text-ink hover:bg-white")}>
                <LottieIcon name="flame" color="#C8372D" accent="#F2C230" size={28} mode="hover" />
                {UI.nav.menu[lang]}
              </SiteLink>
            </Magnetic>
            <Magnetic>
              <a href={CONTACT.tel} className={cn(btn, "border-2 border-snow/60 hover:border-snow hover:bg-snow/10")}>
                <PhoneIcon size={20} />
                {UI.takeaway[lang]} · {CONTACT.phone}
              </a>
            </Magnetic>
          </Reveal>
          <Reveal delay={0.12}>
            <h3 className="mt-10 font-display text-2xl font-bold">{TAKEAWAY.title[lang]}</h3>
            <p className="mt-2 max-w-[52ch] text-lg text-snow/90">{TAKEAWAY.text[lang]}</p>
          </Reveal>
        </div>
        <Reveal delay={0.05}>
          <img src={photo("bestellenwebsitekleinkleinklein")} alt={photoAlt("bestellenwebsitekleinkleinklein", lang)} width={737} height={524} loading="lazy" className="w-full -rotate-1 rounded-[24px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]" />
        </Reveal>
      </div>
    </section>
  );
}
