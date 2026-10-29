// Section 5: the plats du jour. They are posted on Facebook, so a card loads the page's posts only when tapped
// (privacy), beside the terrace photo; a badge says today's service from the hours.
import { useState } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TEXT } from "@/content/site";
import { photo } from "@/content/photos";
import { cn } from "@/lib/utils";
import { SplitReveal, MaskImage } from "../Reveal";
import { LottieIcon } from "../lottie/LottieIcon";
import { IconExternal, IconFacebook } from "../icons";
import { Tile } from "../Illustrations";
import { todayLine } from "../Contact";

const FB_PLUGIN = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(BUSINESS.facebook)}&tabs=timeline&width=500&height=560&small_header=true&adapt_container_width=true&hide_cover=false`;

export function PlatsDuJour() {
  const { lang } = useSite();
  const [fb, setFb] = useState(false);
  const terrasse = photo("terrasse");
  return (
    <section className="tex-marca relative overflow-hidden bg-fundo py-24 md:py-36" aria-labelledby="pdj-title">
      <Tile className="pointer-events-none absolute -right-10 top-16 w-28 rotate-12 opacity-90 md:w-56" />
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-linha">05 / 16 · {UI.today[lang]}</p>
            <SplitReveal as="h2" id="pdj-title" text={UI.platsTitle[lang]} className="mt-4 fs-mega font-extrabold text-marca" />
          </div>
          <p className="flex items-center gap-3 rounded-full bg-marca px-5 py-3 font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-branco">
            <span className="relative h-2.5 w-2.5 rounded-full bg-destaque">
              <span className="absolute inset-0 rounded-full bg-destaque [animation:pulse-dot_1.8s_ease-out_3]" />
            </span>
            {todayLine(lang)}
          </p>
        </div>
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          <div>
            <p className="max-w-[760px] font-display text-[clamp(28px,3vw,48px)] font-bold uppercase leading-[1.0] text-tinta">{TEXT.platsQ[lang]}</p>
            <p className="mt-3 font-hand text-[clamp(30px,2.6vw,42px)] leading-none text-acento">{TEXT.platsA[lang]}</p>
            <div className="mt-8 overflow-hidden rounded-[24px] bg-branco shadow-[0_30px_60px_-34px_rgba(61,6,18,0.45)]">
              {fb && !__ARTIFACT__ ? (
                <iframe title="Facebook · Entre Amigos" src={FB_PLUGIN} className="h-[560px] w-full border-0" loading="lazy" allow="encrypted-media" />
              ) : (
                <div className="flex flex-col items-start gap-5 p-7 sm:flex-row sm:items-center">
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-marca text-branco">
                    <IconFacebook size={30} />
                  </span>
                  <div className="flex-1">
                    <p className="font-display text-[22px] font-bold uppercase leading-tight text-marca">{UI.fbSee[lang]}</p>
                    <p className="mt-1 text-[15px] text-linha">{UI.fbNote[lang]}</p>
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-2 border-t border-tinta/10 p-5">
                {!fb && !__ARTIFACT__ && (
                  <button type="button" onClick={() => setFb(true)} className="btn btn--sm">
                    <span className="btn-roll">
                      <span>{UI.fbLoad[lang]}</span>
                      <span aria-hidden="true">{UI.fbLoad[lang]}</span>
                    </span>
                  </button>
                )}
                <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className={cn("btn btn--sm", (!__ARTIFACT__ && !fb) ? "btn--dark" : "")}>
                  <span className="btn-roll">
                    <span>{UI.fbSee[lang]}</span>
                    <span aria-hidden="true">{UI.fbSee[lang]}</span>
                  </span>
                  <IconExternal size={16} />
                  <span className="sr-only">{UI.externalNew[lang]}</span>
                </a>
                <a href={`tel:${BUSINESS.phoneTel}`} className="btn btn--sm btn--dark group">
                  <LottieIcon name="phone" size={22} color="#FFFFFF" accent="#DD9933" />
                  <span className="btn-roll">
                    <span>{BUSINESS.phone}</span>
                    <span aria-hidden="true">{BUSINESS.phone}</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <MaskImage src={terrasse.sm} srcSet={`${terrasse.sm} 640w, ${terrasse.src} 1200w`} sizes="(min-width: 1024px) 40vw, 92vw" alt={terrasse.alt[lang]} w={terrasse.w} h={terrasse.h} className="arch-full aspect-[4/5] w-full max-w-[520px] justify-self-center" />
        </div>
      </div>
    </section>
  );
}
