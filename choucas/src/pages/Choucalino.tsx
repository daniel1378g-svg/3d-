import { UI } from "@/i18n";
import { CHOUCALINO, HOME } from "@/copy";
import { CONTACT, brandImg } from "@/content";
import { useSite } from "@/site";
import { PageHero } from "@/components/PageHero";
import { LiveBadge } from "@/components/LiveBadge";
import { Heading, Reveal } from "@/components/Reveal";
import { HoursList } from "@/components/Contact";
import { ParallaxPhoto } from "@/components/Parallax";
import { ExternalIcon } from "@/components/icons";
import { LottieIcon } from "@/lottie/LottieIcon";

export function Choucalino() {
  const { lang } = useSite();
  const live = (href: string, label: string) => (
    <a href={href} target="_blank" rel="noopener" className="group flex min-h-14 items-center justify-between gap-3 rounded-2xl bg-white px-5 font-semibold ring-1 ring-ink/10 transition-colors hover:ring-sky" lang="de-CH">
      {label}
      <ExternalIcon />
      <span className="sr-only">({UI.newTab[lang]})</span>
    </a>
  );
  return (
    <>
      <PageHero
        eyebrow={HOME.boxes.choucalino.intro[lang]}
        title={CHOUCALINO.title[lang]}
        lead={
          <>
            {CHOUCALINO.text[lang]}{" "}
            <a href={CONTACT.live.press} target="_blank" rel="noopener" className="font-semibold text-sky-ink underline underline-offset-4 hover:text-ink">
              {CHOUCALINO.pressLink[lang]}
              <span className="sr-only"> ({UI.newTab[lang]})</span>
            </a>
          </>
        }
        photoId="choucalino"
        dot="bg-sky"
        tint="bg-[#eef6fb]"
      >
        <LiveBadge place="choucalino" />
        <span className="flex items-center gap-2 rounded-2xl bg-white p-2 ring-1 ring-line">
          <img src={brandImg("choucalinologo")} alt="Choucalino®" width={238} height={134} className="h-14 w-auto" />
          <img src={brandImg("familywelcome")} alt={HOME.familyWelcome[lang]} width={84} height={90} className="h-14 w-auto" />
        </span>
      </PageHero>

      <section aria-labelledby="spielplatz" className="on-light gutter overflow-hidden bg-snow py-20 md:py-28">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <Heading id="spielplatz" title={CHOUCALINO.playTitle[lang]} dot="bg-sky" />
            <Reveal delay={0.06}>
              <p className="mt-6 text-lg">{CHOUCALINO.playText[lang]}</p>
              <ul className="mt-6 grid gap-3">
                {CHOUCALINO.playList.map((it, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-2xl bg-sky/12 px-4 py-3 text-[17px]">
                    <span aria-hidden="true" className="mt-2 size-2.5 shrink-0 rounded-full bg-sky" />
                    {it[lang]}
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-[56ch] text-lg">{CHOUCALINO.playOutro[lang]}</p>
            </Reveal>
          </div>
          <Reveal delay={0.05}>
            <ParallaxPhoto id="mg-1996-verkleinert" className="aspect-[4/3] rounded-[28px]" />
          </Reveal>
        </div>
      </section>

      <section id="kinder-grill" aria-labelledby="kinder-grill-title" className="on-dark gutter overflow-hidden bg-sky-ink py-20 text-snow md:py-28">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <ParallaxPhoto id="choucalinogrillfb" className="aspect-[3/2] -rotate-1 rounded-[28px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]" />
          </Reveal>
          <div className="group">
            <LottieIcon name="grill" color="#F7F4EE" accent="#F2C230" size={56} mode="hover" />
            <Heading id="kinder-grill-title" title={CHOUCALINO.grillTitle[lang]} tone="dark" dot="bg-beak" className="mt-4" />
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-snow/95">{CHOUCALINO.grillText[lang]}</p>
              <a href={CONTACT.live.kidsGrillNews} target="_blank" rel="noopener" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-snow px-6 font-bold text-ink hover:bg-beak">
                {UI.more[lang]}
                <ExternalIcon />
                <span className="sr-only">({UI.newTab[lang]})</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="familien" className="on-light gutter bg-sky/12 py-20 md:py-28">
        <div className="wrap">
          <Heading id="familien" title={CHOUCALINO.familyTitle[lang]} dot="bg-sky" />
          <Reveal delay={0.05}>
            <p className="mt-6 text-lg">{CHOUCALINO.familyIntro[lang]}</p>
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CHOUCALINO.familyList.map((it, i) => (
              <Reveal as="li" key={i} delay={Math.min(i * 0.03, 0.3)} className="flex items-start gap-3 rounded-2xl bg-white px-5 py-4 text-[17px] ring-1 ring-ink/8">
                <span aria-hidden="true" className="mt-2 size-2.5 shrink-0 rounded-full bg-sky" />
                {it[lang]}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="choucalino-more" className="on-light gutter bg-snow py-20 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div>
            <Heading id="choucalino-more" title={CHOUCALINO.linksTitle[lang]} eyebrow={UI.livePageNote[lang]} dot="bg-sky" />
            <div className="mt-8 grid gap-3">
              {live(CONTACT.live.family, UI.familyService[lang])}
              {live(CONTACT.live.playground, UI.playground[lang])}
              {live(CONTACT.live.press, UI.press[lang])}
              {live(CONTACT.live.friends, UI.friends[lang])}
              {live(CONTACT.live.colouring, UI.colouring[lang])}
            </div>
          </div>
          <div>
            <Heading id="choucalino-hours" title={UI.hours[lang]} dot="bg-beak" />
            <div className="mt-8">
              <HoursList only="choucalino" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
