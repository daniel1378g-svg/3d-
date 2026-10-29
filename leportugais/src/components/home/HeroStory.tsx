// Sections 1 and 2: HOY!'s split hero around the arch window, and the pinned 1973 story. As you scroll the
// arch grows until the Atlantic fills the screen, "1973" counts up from 1900 and moves aside, the live intro
// text appears as three numbered captions with a coral progress rail, and it ends on the gluten line.
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TEXT } from "@/content/site";
import { useGsap } from "@/lib/useGsap";
import { useIsDesktop, useReduced } from "@/lib/useMedia";
import { asset, cn, gpuWebGL } from "@/lib/utils";
import { IconPause, IconPlay } from "../icons";
import { PillButton, PillLink } from "../ui/Pill";
import { SplitReveal } from "../Reveal";
import { OceanCanvas } from "./OceanCanvas";

type Arch = { x: number; y: number; w: number; h: number; vw: number; vh: number };
function archFor(vw: number, vh: number, desktop: boolean): Arch {
  if (desktop) {
    const w = Math.min(560, Math.max(300, vw * 0.31));
    const y = Math.max(150, vh * 0.22);
    return { x: (vw - w) / 2, y, w, h: vh - y, vw, vh };
  }
  const w = Math.min(vw * 0.86, 520);
  const y = vh * 0.53;
  return { x: (vw - w) / 2, y, w, h: vh - y, vw, vh };
}
/** The arch at growth t (0 = hero window, 1 = full screen), as an inset() clip-path. */
function archClip(a: Arch, t: number) {
  const top = a.y * (1 - t);
  const left = a.x * (1 - t);
  const right = (a.vw - a.x - a.w) * (1 - t);
  const r = (a.w / 2) * Math.pow(1 - t, 1.4);
  return `inset(${top}px ${right}px 0px ${left}px round ${r}px ${r}px 0px 0px)`;
}
const firstWords = (s: string) => s.split(/\s+/).slice(0, 3).join(" ").replace(/[,.:;]$/, "") + "…";

export function HeroStory() {
  const { lang, book, go, href, introDone } = useSite();
  const desktop = useIsDesktop();
  const reduce = useReduced();
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLElement>(null);
  const archEl = useRef<HTMLDivElement>(null);
  const yearEl = useRef<HTMLSpanElement>(null);
  const [arch, setArch] = useState<Arch>(() => archFor(typeof window === "undefined" ? 1440 : window.innerWidth, typeof window === "undefined" ? 900 : window.innerHeight, typeof window === "undefined" || window.innerWidth >= 1024));
  const [step, setStep] = useState(0);
  const [seaPaused, setSeaPaused] = useState(false);

  useEffect(() => {
    const on = () => setArch(archFor(window.innerWidth, window.innerHeight, window.innerWidth >= 1024));
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [desktop]);

  // the scrubbed story
  useGsap(
    (gsap) => {
    if (!track.current) return;
    const vh = window.innerHeight;
    const length = (desktop ? 3.2 : 2.3) * vh;
    {
      const proxy = { t: 0, year: 1900 };
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: track.current,
          start: "top top",
          end: `+=${length}`,
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            setStep(p < 0.34 ? 0 : p < 0.53 ? 1 : p < 0.71 ? 2 : 3);
          },
        },
      });
      tl.to(".hs-left", { x: () => -window.innerWidth * 0.35, autoAlpha: 0, duration: 0.1 }, 0)
        .to(".hs-right", { x: () => window.innerWidth * 0.35, autoAlpha: 0, duration: 0.1 }, 0)
        .to(".hs-bottom", { y: 40, autoAlpha: 0, duration: 0.07 }, 0)
        .to(proxy, { t: 1, duration: 0.3, ease: "power2.inOut", onUpdate: () => archEl.current && (archEl.current.style.clipPath = archClip(arch, proxy.t)) }, 0.02)
        .fromTo(".hs-count", { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 0.06 }, 0.07)
        .to(proxy, { year: 1973, duration: 0.22, ease: "power1.out", onUpdate: () => yearEl.current && (yearEl.current.textContent = String(Math.round(proxy.year))) }, 0.08)
        .to(".hs-count", { x: () => (desktop ? -window.innerWidth * 0.34 : 0), y: () => -window.innerHeight * (desktop ? 0.3 : 0.36), scale: desktop ? 0.34 : 0.4, duration: 0.08, ease: "power2.inOut" }, 0.3)
        .fromTo(".hs-veil", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, 0.28)
        .fromTo(".hs-rail", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.03 }, 0.33)
        .fromTo(".hs-rail-fill", { scaleY: 0 }, { scaleY: 1, duration: 0.54 }, 0.36);
      const cap = (sel: string, at: number, out: number) => {
        tl.fromTo(sel, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.06, ease: "power2.out" }, at);
        if (out) tl.to(sel, { autoAlpha: 0, y: -40, duration: 0.05, ease: "power2.in" }, out);
      };
      cap(".hs-cap1", 0.36, 0.5);
      tl.fromTo(".hs-sign", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.09 }, 0.39);
      cap(".hs-cap2", 0.54, 0.68);
      cap(".hs-cap3", 0.72, 0.86);
      tl.to(".hs-count", { autoAlpha: 0, duration: 0.04 }, 0.86).to(".hs-rail", { autoAlpha: 0, duration: 0.03 }, 0.9);
      tl.fromTo(".hs-end", { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.07, ease: "power2.out" }, 0.9).to({}, { duration: 0.03 });
    }
    },
    stage,
    [reduce, desktop, arch],
    !reduce,
  );

  const leftWords = TEXT.heroLeft[lang].split(" ");
  const rightWords = TEXT.heroRight[lang].split(" ");
  const left = [leftWords.slice(0, -1).join(" "), leftWords[leftWords.length - 1]].filter(Boolean);
  const right = [rightWords[0], rightWords.slice(1).join(" ")].filter(Boolean);
  const caps = [TEXT.founding[lang], TEXT.cuisine[lang], TEXT.room[lang]];
  const archStyle: CSSProperties = { left: arch.x, top: arch.y, width: arch.w, height: arch.h };

  const buttons = (
    <>
      <PillButton onClick={book}>{UI.reserve[lang]}</PillButton>
      <PillLink
        variant="ghost"
        href={href("carte")}
        onClick={(e) => {
          e.preventDefault();
          go("carte");
        }}
      >
        {UI.carte[lang]}
      </PillLink>
    </>
  );

  if (reduce) return <HeroStatic left={left} right={right} caps={caps} buttons={buttons} />;

  return (
    <section id="accueil" ref={track} className="relative bg-azulejo text-branco" style={{ height: desktop ? "560svh" : "470svh" }} aria-label={UI.home[lang]}>
      <div ref={stage} className="sticky top-0 h-[100svh] overflow-hidden">
        {/* the arch window and the ocean inside it */}
        <div ref={archEl} className="absolute inset-0" style={{ clipPath: archClip(arch, 0) }}>
          <OceanCanvas host={stage} horizon={desktop ? 0.58 : 0.34} paused={seaPaused} />
          <div className="hs-veil invisible absolute inset-0 bg-[linear-gradient(180deg,rgba(12,27,42,0.55)_0%,rgba(12,27,42,0.25)_40%,rgba(12,27,42,0.7)_100%)]" />
        </div>
        <div data-hero-arch aria-hidden="true" className="pointer-events-none absolute" style={archStyle} />
        {gpuWebGL() && (
          <button
            type="button"
            onClick={() => setSeaPaused((v) => !v)}
            aria-pressed={seaPaused}
            aria-label={seaPaused ? UI.play[lang] : UI.pause[lang]}
            className="absolute z-20 grid h-10 w-10 place-items-center rounded-full bg-branco/15 text-branco backdrop-blur hover:bg-branco/25"
            style={desktop ? { left: arch.x + arch.w - 56, bottom: 24 } : { right: 16, bottom: 16 }}
          >
            {seaPaused ? <IconPlay size={16} /> : <IconPause size={16} />}
          </button>
        )}

        {/* the split headline */}
        <h1 className="sr-only">
          {TEXT.heroLeft[lang]} {TEXT.heroRight[lang]} · Le Portugais
        </h1>
        {desktop ? (
          <>
            <div aria-hidden="true" className="hs-left absolute text-right" style={{ right: arch.vw - arch.x + 44, top: arch.vh * 0.3 }}>
              <SplitReveal as="p" text={left} ready={introDone} className="display text-[clamp(56px,6.8vw,132px)] font-extrabold leading-[0.88]" />
            </div>
            <div aria-hidden="true" className="hs-right absolute" style={{ left: arch.x + arch.w + 44, top: arch.vh * 0.42 }}>
              <SplitReveal as="p" text={right} ready={introDone} delay={0.15} className="display text-[clamp(56px,6.8vw,132px)] font-extrabold leading-[0.88] text-dourado" />
            </div>
            <div className="hs-bottom absolute bottom-8 left-[var(--gutter)] flex gap-3">{buttons}</div>
            <div className="hs-bottom absolute bottom-8 right-[var(--gutter)] flex flex-col items-end gap-3 text-right">
              <p className="meta text-espuma">
                {UI.since[lang]} · Bd du Pont d’Arve 59 · Plainpalais
              </p>
              <p className="meta flex items-center gap-3 text-[12px] text-espuma/80">
                {UI.scroll[lang]}
                <span aria-hidden="true" className="relative block h-9 w-px overflow-hidden bg-espuma/25">
                  <span className="absolute inset-0 bg-espuma [animation:scroll-hint_2.2s_var(--ease-in-out)_3]" />
                </span>
              </p>
            </div>
          </>
        ) : (
          <div className="hs-left absolute inset-x-0 px-[var(--gutter)]" style={{ top: "calc(var(--label-h) + 96px)" }}>
            <div aria-hidden="true">
            <SplitReveal as="p" text={left} ready={introDone} className="display text-[clamp(46px,13.5vw,84px)] font-extrabold leading-[0.9]" />
            <SplitReveal as="p" text={right} ready={introDone} delay={0.12} className="display text-[clamp(46px,13.5vw,84px)] font-extrabold leading-[0.9] text-dourado" />
            </div>
            <div className="hs-bottom mt-5 flex flex-wrap gap-2.5">{buttons}</div>
          </div>
        )}

        {/* the story */}
        <div className="hs-count invisible pointer-events-none absolute inset-0 grid place-items-center" aria-hidden="true">
          <span ref={yearEl} className="display text-[clamp(120px,24vw,420px)] font-extrabold leading-none text-dourado [text-shadow:0_20px_60px_rgba(12,27,42,0.35)]">
            1900
          </span>
        </div>
        <p className="sr-only">1973</p>
        <div className={cn("hs-rail invisible absolute z-10", desktop ? "right-[var(--gutter)] top-1/2 flex -translate-y-1/2 gap-4" : "right-[var(--gutter)] top-[calc(var(--label-h)+92px)]")} aria-hidden="true">
          {desktop ? (
            <>
              <div className="relative h-[46vh] w-[3px] rounded-full bg-branco/20">
                <div className="hs-rail-fill absolute inset-0 origin-top rounded-full bg-coral" />
              </div>
              <ol className="flex h-[46vh] list-none flex-col justify-between py-1">
                {caps.map((c, i) => (
                  <li key={i} className={cn("max-w-[170px] font-display text-[13px] font-semibold uppercase leading-tight tracking-[0.14em] transition-colors", step === i + 1 ? "text-branco" : "text-branco/45")}>
                    <span className="mr-2 text-dourado">0{i + 1}</span>
                    {firstWords(c)}
                  </li>
                ))}
                <li className="font-display text-[13px] tracking-[0.18em] text-espuma">
                  0{Math.max(1, Math.min(3, step))} / 03
                </li>
              </ol>
            </>
          ) : (
            <span className="glass rounded-full px-3 py-1.5 font-display text-sm font-semibold tracking-[0.16em] text-tinta">0{Math.max(1, Math.min(3, step))} / 03</span>
          )}
        </div>
        {caps.map((c, i) => (
          <div
            key={i}
            className={cn(
              `hs-cap${i + 1} invisible absolute z-10`,
              desktop ? (i === 1 ? "right-[calc(var(--gutter)+230px)] top-[32%] w-[min(440px,32vw)]" : "left-[var(--gutter)] top-[34%] w-[min(460px,34vw)]") : "inset-x-0 bottom-[9svh] px-[var(--gutter)]",
            )}
          >
            <p className="eyebrow text-dourado">
              0{i + 1} <span className="text-espuma">/ 03 · {UI.story[lang]}</span>
            </p>
            <p className="mt-4 text-[clamp(18px,1.45vw,23px)] leading-[1.5] [text-shadow:0_2px_18px_rgba(12,27,42,0.6)]">{c}</p>
            {i === 0 && (
              <p className="hs-sign mt-4 font-hand text-[clamp(34px,3vw,48px)] leading-none text-dourado" style={{ clipPath: "inset(0 100% 0 0)" }}>
                {TEXT.signature}
              </p>
            )}
          </div>
        ))}
        <div className="hs-end invisible absolute inset-x-0 top-[38%] z-10 px-[var(--gutter)] text-center">
          <p className="mx-auto max-w-[min(980px,92vw)] font-display text-[clamp(30px,3.6vw,60px)] font-bold uppercase leading-[0.98] text-balance [text-shadow:0_6px_40px_rgba(12,27,42,0.6)]">{TEXT.gluten[lang]}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">{buttons}</div>
        </div>
      </div>
    </section>
  );
}

/** Reduced motion: no pin and no scrub; the hero, then the captions as text beside the still. */
function HeroStatic({ left, right, caps, buttons }: { left: string[]; right: string[]; caps: string[]; buttons: React.ReactNode }) {
  const { lang } = useSite();
  return (
    <>
      <section id="accueil" className="relative overflow-hidden bg-azulejo pb-16 text-branco" style={{ paddingTop: "calc(var(--label-h) + 110px)" }}>
        <div className="container-x grid items-end gap-10 lg:grid-cols-[1fr_minmax(300px,31vw)_1fr]">
          <h1 className="display text-[clamp(46px,6.3vw,124px)] font-extrabold leading-[0.88] lg:text-right">
            {left.map((x) => (
              <span key={x} className="block">
                {x}
              </span>
            ))}
            <span className="block text-dourado lg:hidden">{right.join(" ")}</span>
          </h1>
          <div className="arch-full relative aspect-[3/4] w-full">
            <picture>
              <source media="(max-width: 700px)" srcSet={asset("hero/ocean-800.webp")} />
              <img src={asset("hero/ocean-1600.webp")} alt="" className="absolute inset-0 h-full w-full object-cover" />
            </picture>
          </div>
          <p aria-hidden="true" className="display hidden text-[clamp(46px,6.3vw,124px)] font-extrabold leading-[0.88] text-dourado lg:block">
            {right.map((x) => (
              <span key={x} className="block">
                {x}
              </span>
            ))}
          </p>
        </div>
        <div className="container-x mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">{buttons}</div>
          <p className="meta text-espuma">{UI.since[lang]} · Bd du Pont d’Arve 59 · Plainpalais</p>
        </div>
      </section>
      <section className="bg-oceano py-20 text-branco" aria-label={UI.story[lang]}>
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <p className="display text-[clamp(120px,20vw,320px)] font-extrabold leading-none text-dourado">1973</p>
          <ol className="list-none space-y-10">
            {caps.map((c, i) => (
              <li key={i}>
                <p className="eyebrow text-dourado">0{i + 1} / 03</p>
                <p className="mt-3 text-[clamp(18px,1.45vw,23px)] leading-relaxed">{c}</p>
                {i === 0 && <p className="mt-3 font-hand text-4xl text-dourado">{TEXT.signature}</p>}
              </li>
            ))}
          </ol>
        </div>
        <div className="container-x mt-16 text-center">
          <p className="mx-auto max-w-[980px] font-display text-[clamp(30px,3.6vw,60px)] font-bold uppercase leading-[0.98]">{TEXT.gluten[lang]}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">{buttons}</div>
        </div>
      </section>
    </>
  );
}
