import { TEXT, UI } from "@/i18n";
import { chf } from "@/content";
import { useSite } from "@/site";
import { LottieIcon } from "@/lottie/LottieIcon";
import { Photo } from "../Photo";
import { OpenBadge } from "../OpenBadge";
import { Reveal } from "../Reveal";
import { SiteLink } from "../SiteLink";
import { SteamingCup } from "../Illustrations";
import { ArrowGlyph } from "../Glyphs";

/** Le tea room: the live text, the live hours and terrace badges, the Portuguese coffee steaming, and a teaser of the breakfast builder. */
export function TeaRoom() {
  const { lang } = useSite();
  return (
    <section id="tea-room" aria-labelledby="tea-title" className="espresso on-dark gutter relative overflow-hidden py-24 md:py-32">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Reveal>
            <p className="kicker">{TEXT.universeKicker[lang]}</p>
            <h2 id="tea-title" className="display mt-3 text-[clamp(2.6rem,6vw,5rem)] leading-none text-custard">
              {TEXT.universeTea[lang]}
            </h2>
            <p className="mt-7 max-w-[58ch] text-[18px] leading-relaxed text-flour/90">{TEXT.teaRoom[lang]}</p>
          </Reveal>
          <Reveal delay={0.08} className="mt-8 flex flex-wrap gap-2">
            <OpenBadge tone="dark" terrace />
            <p className="inline-flex min-h-10 items-center rounded-full bg-flour/10 px-4 py-2 text-sm font-semibold text-flour ring-1 ring-flour/25">{UI.terraceIndoor[lang]}</p>
          </Reveal>
          <Reveal delay={0.14}>
            <SiteLink page="offer" section="petit-dejeuner" className="group mt-10 flex max-w-xl items-center gap-5 rounded-[24px] bg-flour p-5 text-espresso shadow-lift transition-transform hover:-translate-y-0.5">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-custard/40">
                <LottieIcon name="croissant" size={46} mode="hover" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="kicker block">{TEXT.eng4Title[lang]}</span>
                <span className="display mt-1 block text-xl leading-tight text-cocoa">{UI.breakfastTeaser[lang]}</span>
                <span className="mt-1 block text-sm">N°1 · N°2 · <span className="price font-semibold text-caramel">{chf("12.00")}</span></span>
              </span>
              <ArrowGlyph size={22} className="shrink-0 transition-transform group-hover:translate-x-1" />
            </SiteLink>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="relative">
          <div className="overflow-hidden rounded-[32px] shadow-lift">
            <Photo id="shop" sizes="(min-width: 1024px) 640px, 92vw" className="aspect-[4/3] w-full" />
          </div>
          <div className="absolute -bottom-6 right-3 rounded-full bg-flour p-3 text-wheat shadow-lift md:-left-8 md:right-auto">
            <SteamingCup size={150} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
