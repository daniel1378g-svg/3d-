import { TEXT, UI } from "@/i18n";
import { chf } from "@/content";
import { useSite } from "@/site";
import { LottieIcon } from "@/lottie/LottieIcon";
import type { IconName } from "@/lottie/icons";
import { Photo } from "../Photo";
import { Reveal } from "../Reveal";
import { SiteLink } from "../SiteLink";
import { Tilt } from "../Tilt";
import { ArrowGlyph } from "../Glyphs";
import { TRAY_ITEMS } from "../Illustrations";

function Card({ icon, title, body, className, children, delay = 0 }: { icon: IconName; title: string; body: string; className?: string; children?: React.ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay} className={className}>
      <Tilt className="group h-full rounded-[28px] bg-flour p-7 shadow-set ring-1 ring-espresso/5 md:p-9">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-custard/35">
          <LottieIcon name={icon} size={46} mode="hover" />
        </span>
        <h3 className="display mt-6 text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight text-cocoa">{title}</h3>
        <p className="mt-3 max-w-[52ch] text-[17px] leading-relaxed">{body}</p>
        {children}
      </Tilt>
    </Reveal>
  );
}

/** «notre engagement»: the four commitments of the live site as a bento grid with animated icons. */
export function Commitments() {
  const { lang } = useSite();
  return (
    <section id="engagement" aria-labelledby="eng-title" className="tiles gutter bg-flour-deep py-24 md:py-32">
      <div className="wrap">
        <Reveal>
          <p className="kicker">{TEXT.engKicker[lang]}</p>
          <h2 id="eng-title" className="display mt-3 text-[clamp(2.2rem,4.6vw,3.8rem)] leading-tight text-cocoa">
            {TEXT.engTitle[lang]}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-6">
          <Card icon="croissant" title={TEXT.eng1Title[lang]} body={TEXT.eng1[lang]} className="md:col-span-4">
            <div className="mt-7 grid grid-cols-2 gap-3">
              <Photo id="natas" sizes="(min-width: 768px) 320px, 45vw" className="aspect-[4/3] rounded-2xl" />
              <Photo id="bread-basket" sizes="(min-width: 768px) 320px, 45vw" className="aspect-[4/3] rounded-2xl" />
            </div>
          </Card>
          <Card icon="bread" title={TEXT.eng2Title[lang]} body={TEXT.eng2[lang]} className="md:col-span-2" delay={0.08} />
          <Card icon="cup" title={TEXT.eng3Title[lang]} body={TEXT.eng3[lang]} className="md:col-span-2" delay={0.08}>
            <ul className="mt-6 flex flex-wrap gap-2" aria-hidden="true">
              {[["fr", "Français"], ["pt-PT", "Português"], ["en", "English"], ["it", "Italiano"]].map(([l, n]) => (
                <li key={l} lang={l} className="rounded-full bg-espresso px-3 py-1 text-sm font-semibold text-flour">{n}</li>
              ))}
            </ul>
          </Card>
          <Card icon="sun" title={TEXT.eng4Title[lang]} body={TEXT.eng4[lang]} className="md:col-span-4" delay={0.16}>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <span className="flex items-center gap-1 text-cocoa">
                {["croissant", "juice", "jam"].map((k) => (
                  <span key={k}>{TRAY_ITEMS[k]({ size: 48 })}</span>
                ))}
              </span>
              <span className="display price text-3xl text-caramel">{chf("12.00")}</span>
              <SiteLink page="offer" section="petit-dejeuner" className="btn btn-custard ml-auto">
                {UI.breakfastTeaser[lang]} <ArrowGlyph />
              </SiteLink>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
