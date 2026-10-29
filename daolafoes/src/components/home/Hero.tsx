// Section 1: the hero. An animated azulejo field (scene A, three.js, loaded after first paint, a still frame
// first) fills the background; ceramic pieces frame the food photo; the logo sits on cream; three buttons.
import { useRef } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TX } from "@/content/site";
import { photo } from "@/content/photos";
import { asset } from "@/lib/utils";
import { PillButton, PillLink } from "../ui/Pill";
import { SplitReveal } from "../Reveal";
import { AzulejoCanvas } from "./AzulejoCanvas";
import { OpenNow } from "../Contact";

export function Hero() {
  const { lang, book, go, href, introDone } = useSite();
  const host = useRef<HTMLElement>(null);
  const pic = photo("hero-leitao");
  return (
    <section ref={host} id="start" className="relative isolate overflow-hidden bg-marca text-fundo" style={{ minHeight: "100svh", paddingTop: "calc(var(--label-h) + 110px)" }} aria-labelledby="hero-title">
      <AzulejoCanvas host={host} className="-z-10" />
      <div className="container-x relative grid items-center gap-10 pb-16 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-14 lg:pb-24">
        <div className="max-w-[640px]">
          <img src={asset("brand/logo-white.png")} alt={`${BUSINESS.name} · ${BUSINESS.claim}`} width={352} height={181} fetchPriority="high" className="w-[min(60vw,280px)] drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]" />
          <p className="eyebrow mt-8 text-ember">{TX.n_heroEyebrow[lang]}</p>
          <SplitReveal as="h1" id="hero-title" text={TX.n_heroClaim[lang]} ready={introDone} className="mt-4 fs-xxl font-semibold text-fundo" stagger={0.05} />
          <p className="mt-6 max-w-[520px] text-[clamp(17px,1.3vw,21px)] leading-relaxed text-fundo/85">{TX.n_heroLine[lang]}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PillLink
              href={href("speisekarte")}
              variant="cream"
              onClick={(e) => {
                e.preventDefault();
                go("speisekarte");
              }}
            >
              {TX.n_btnSpeisekarte[lang]}
            </PillLink>
            <PillButton onClick={book} variant="orange">
              {TX.n_btnReservieren[lang]}
            </PillButton>
            <PillLink
              href={href("takeaway")}
              variant="ghost"
              className="text-fundo"
              onClick={(e) => {
                e.preventDefault();
                go("takeaway");
              }}
            >
              {TX.n_btnTakeaway[lang]}
            </PillLink>
          </div>
          <OpenNow className="mt-8" />
        </div>
        <div className="relative mx-auto w-full max-w-[640px]">
          {/* the ceramic frame: glazed tiles around the photo */}
          <div className="ceramic relative overflow-hidden rounded-[28px] bg-fundo" data-hero-frame>
            <picture>
              <source media="(max-width: 700px)" srcSet={pic.sm} />
              <img src={pic.src} alt={pic.alt[lang]} width={pic.w} height={pic.h} fetchPriority="high" decoding="async" className="aspect-[16/11] w-full object-cover" />
            </picture>
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute -left-6 -top-6 hidden h-16 w-16 rotate-[-8deg] rounded-[10px] bg-fundo p-1 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] sm:block" data-hero-tile>
            <TileFace />
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-7 -right-5 hidden h-20 w-20 rotate-[10deg] rounded-[10px] bg-fundo p-1 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] sm:block" data-hero-tile>
            <TileFace />
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute -right-8 top-1/3 hidden h-12 w-12 rotate-[22deg] rounded-[8px] bg-fundo p-1 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] md:block" data-hero-tile>
            <TileFace />
          </div>
        </div>
      </div>
      <p className="container-x relative pb-6 text-[12px] uppercase tracking-[0.2em] text-fundo/60">{UI.scroll[lang]} ↓</p>
    </section>
  );
}

function TileFace() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      <rect width="64" height="64" rx="4" fill="#FDF9F6" />
      <path d="M32 6l6 20 20 6-20 6-6 20-6-20-20-6 20-6z" fill="#513528" />
      <circle cx="32" cy="32" r="6" fill="#FDF9F6" />
      <path d="M4 4l10 10M60 4 50 14M4 60l10-10M60 60 50 50" stroke="#E04505" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
