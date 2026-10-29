// Sections 1 and 2: HOY!'s split hero around the arch window, and the pinned "Qui sommes-nous ?" story. As you
// scroll the arch grows until the embers fill the screen, "7/7" builds in the centre (the seven day initials
// light up one by one while the first 7 rolls up from 1), then moves aside; the three live paragraphs appear as
// numbered captions with an acento progress rail, "João Ribeiro." writes itself beside caption 03, and it ends
// on the "Pour réserver…" line with two buttons.
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { DAY_INITIALS, UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TEXT } from "@/content/site";
import { useGsap } from "@/lib/useGsap";
import { useIsDesktop, useReduced } from "@/lib/useMedia";
import { asset, cn, gpuWebGL } from "@/lib/utils";
import { IconPause, IconPhone, IconPlay } from "../icons";
import { PillButton, PillLink } from "../ui/Pill";
import { SplitReveal } from "../Reveal";
import { BrasaCanvas } from "./BrasaCanvas";

type Arch = { x: number; y: number; w: number; h: number; vw: number; vh: number };
function archFor(vw: number, vh: number, desktop: boolean): Arch {
  if (desktop) {
    const w = Math.min(520, Math.max(300, vw * 0.29));
    const y = Math.max(170, vh * 0.24);
    return { x: (vw - w) / 2, y, w, h: vh - y, vw, vh };
  }
  const w = Math.min(vw * 0.86, 520);
  const y = vh * 0.5;
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
/** "dans vos assiettes !" → ["dans vos", "assiettes !"]: the last word on its own line, "!" kept with it. */
function lines(s: string, lastAlone = true) {
  const w = s.replace(/ ([!?:;])/g, " $1").split(" ");
  if (w.length < 2) return [s];
  return lastAlone ? [w.slice(0, -1).join(" "), w[w.length - 1]] : [w[0], w.slice(1).join(" ")];
}

/** "7/7" with the seven day initials; the parts are driven by the timeline (or shown whole). */
function SevenSeven({ lang, numRef, still = false }: { lang: keyof typeof DAY_INITIALS; numRef?: React.Ref<HTMLSpanElement>; still?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <p className="display flex items-baseline font-extrabold leading-none text-destaque [text-shadow:0_20px_60px_rgba(49,11,10,0.45)]" style={{ fontSize: "clamp(120px,22vw,380px)" }}>
        <span className="relative inline-block overflow-hidden">
          <span ref={numRef} className="hs-num inline-block tabular-nums">
            {still ? 7 : 1}
          </span>
        </span>
        <span className="text-branco">/7</span>
      </p>
      <ol className="mt-2 flex list-none gap-[clamp(8px,1.4vw,22px)]" aria-hidden="true">
        {DAY_INITIALS[lang].map((d, i) => (
          <li key={i} className={cn(`hs-day hs-day-${i} grid h-[clamp(34px,3.6vw,56px)] w-[clamp(34px,3.6vw,56px)] place-items-center rounded-full font-display text-[clamp(18px,1.8vw,28px)] font-bold`, still ? "bg-destaque text-marca-escura" : "bg-branco/10 text-branco/40")}>
            {d}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function HeroStory() {
  const { lang, book, go, href, introDone } = useSite();
  const desktop = useIsDesktop();
  const reduce = useReduced();
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLElement>(null);
  const archEl = useRef<HTMLDivElement>(null);
  const numEl = useRef<HTMLSpanElement>(null);
  const [arch, setArch] = useState<Arch>(() => archFor(typeof window === "undefined" ? 1440 : window.innerWidth, typeof window === "undefined" ? 900 : window.innerHeight, typeof window === "undefined" || window.innerWidth >= 1024));
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

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
      const length = (desktop ? 3.2 : 2.2) * vh;
      const proxy = { t: 0, n: 1 };
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
        .to(".hs-bottom, .hs-h1", { y: 40, autoAlpha: 0, duration: 0.07 }, 0)
        .to(proxy, { t: 1, duration: 0.3, ease: "power2.inOut", onUpdate: () => archEl.current && (archEl.current.style.clipPath = archClip(arch, proxy.t)) }, 0.02)
        .fromTo(".hs-count", { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 0.06 }, 0.07)
        .to(proxy, { n: 7, duration: 0.2, ease: "none", onUpdate: () => numEl.current && (numEl.current.textContent = String(Math.max(1, Math.round(proxy.n)))) }, 0.09);
      for (let i = 0; i < 7; i++) tl.to(`.hs-day-${i}`, { backgroundColor: "#FFCB8E", color: "#310B0A", scale: 1.08, duration: 0.015 }, 0.09 + i * 0.028).to(`.hs-day-${i}`, { scale: 1, duration: 0.015 }, 0.105 + i * 0.028);
      tl.to(".hs-count", { x: () => (desktop ? -window.innerWidth * 0.33 : 0), y: () => -window.innerHeight * (desktop ? 0.29 : 0.34), scale: desktop ? 0.32 : 0.38, duration: 0.08, ease: "power2.inOut" }, 0.31)
        .fromTo(".hs-veil", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, 0.28)
        .fromTo(".hs-rail", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.03 }, 0.33)
        .fromTo(".hs-rail-fill", { scaleY: 0 }, { scaleY: 1, duration: 0.54 }, 0.36);
      const cap = (sel: string, at: number, out: number) => {
        tl.fromTo(sel, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.06, ease: "power2.out" }, at);
        if (out) tl.to(sel, { autoAlpha: 0, y: -40, duration: 0.05, ease: "power2.in" }, out);
      };
      cap(".hs-cap1", 0.36, 0.5);
      cap(".hs-cap2", 0.54, 0.68);
      cap(".hs-cap3", 0.72, 0.86);
      tl.fromTo(".hs-sign", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.09 }, 0.75);
      tl.to(".hs-count", { autoAlpha: 0, duration: 0.04 }, 0.86).to(".hs-rail", { autoAlpha: 0, duration: 0.03 }, 0.9);
      tl.fromTo(".hs-end", { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.07, ease: "power2.out" }, 0.9).to({}, { duration: 0.03 });
    },
    stage,
    [reduce, desktop, arch],
    !reduce,
  );

  const left = lines(TEXT.heroLeft[lang], false);
  const right = lines(TEXT.heroRight[lang]);
  const caps = [TEXT.qui1[lang], TEXT.qui2[lang], TEXT.qui3[lang]];
  const archStyle: CSSProperties = { left: arch.x, top: arch.y, width: arch.w, height: arch.h };
  const meta = `${UI.specialities[lang]} · ${BUSINESS.street} · Gland · ${UI.open77[lang]}`;

  const buttons = (
    <>
      <PillButton onClick={book}>{UI.reserve[lang]}</PillButton>
      <PillLink
        variant="ghost"
        href={href("menu")}
        onClick={(e) => {
          e.preventDefault();
          go("menu");
        }}
      >
        {UI.discoverMenu[lang]}
      </PillLink>
    </>
  );
  const endButtons = (
    <>
      <PillButton onClick={book}>{UI.reserve[lang]}</PillButton>
      <a href={`tel:${BUSINESS.booking.tel}`} className="btn btn--cream">
        <IconPhone size={18} />
        <span className="btn-roll">
          <span>{BUSINESS.booking.label}</span>
          <span aria-hidden="true">{BUSINESS.booking.label}</span>
        </span>
      </a>
    </>
  );

  if (reduce) return <HeroStatic left={left} right={right} caps={caps} buttons={buttons} endButtons={endButtons} meta={meta} />;

  return (
    <section id="accueil" ref={track} className="relative bg-marca text-branco" style={{ height: desktop ? "520svh" : "400svh" }} aria-label={UI.home[lang]}>
      <div ref={stage} className="sticky top-0 h-[100svh] overflow-hidden">
        {/* the arch window and the embers inside it */}
        <div ref={archEl} className="absolute inset-0" style={{ clipPath: archClip(arch, 0) }}>
          <BrasaCanvas host={stage} bed={desktop ? 0.4 : 0.3} paused={paused} />
          <div className="hs-veil invisible absolute inset-0 bg-[linear-gradient(180deg,rgba(49,11,10,0.72)_0%,rgba(49,11,10,0.35)_45%,rgba(49,11,10,0.55)_100%)]" />
        </div>
        <div data-hero-arch aria-hidden="true" className="pointer-events-none absolute" style={archStyle} />
        {gpuWebGL() && (
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            aria-pressed={paused}
            aria-label={paused ? UI.play[lang] : UI.pause[lang]}
            className="absolute z-20 grid h-10 w-10 place-items-center rounded-full bg-branco/15 text-branco backdrop-blur hover:bg-branco/25"
            style={desktop ? { left: arch.x + arch.w - 56, bottom: 24 } : { right: 16, bottom: 16 }}
          >
            {paused ? <IconPlay size={16} /> : <IconPause size={16} />}
          </button>
        )}

        {/* the site's H1, letter-spaced above the split headline */}
        <h1 className={cn("hs-h1 meta absolute z-10 text-suave", desktop ? "inset-x-0 text-center" : "left-[var(--gutter)] right-[var(--gutter)]")} style={{ top: desktop ? "calc(var(--label-h) + 112px)" : "calc(var(--label-h) + 92px)" }} lang={lang === "fr" ? undefined : "fr"}>
          <span className="text-branco">LUSOSABORES</span> Restaurant spécialités Portugaises à Gland
        </h1>
        {desktop ? (
          <>
            <div aria-hidden="true" className="hs-left absolute text-right" style={{ right: arch.vw - arch.x + 40, top: arch.vh * 0.32 }}>
              <SplitReveal as="p" text={left} ready={introDone} className="display text-[clamp(56px,6.6vw,128px)] font-extrabold leading-[0.88]" />
            </div>
            <div aria-hidden="true" className="hs-right absolute" style={{ left: arch.x + arch.w + 40, top: arch.vh * 0.45, maxWidth: arch.vw - arch.x - arch.w - 40 - 24 }}>
              <SplitReveal as="p" text={right} ready={introDone} delay={0.15} className="display text-[clamp(48px,5.4vw,108px)] font-extrabold leading-[0.88] text-destaque" />
            </div>
            <p className="sr-only">{TEXT.heroLine[lang]}</p>
            <div className="hs-bottom absolute bottom-8 left-[var(--gutter)] flex gap-3">{buttons}</div>
            <div className="hs-bottom absolute bottom-8 right-[var(--gutter)] flex max-w-[40vw] flex-col items-end gap-3 text-right">
              <p className="meta text-suave">{meta}</p>
              <p className="meta flex items-center gap-3 text-[12px] text-suave/80">
                {UI.scroll[lang]}
                <span aria-hidden="true" className="relative block h-9 w-px overflow-hidden bg-suave/25">
                  <span className="absolute inset-0 bg-suave [animation:scroll-hint_2.2s_var(--ease-in-out)_3]" />
                </span>
              </p>
            </div>
          </>
        ) : (
          <div className="hs-left absolute inset-x-0 px-[var(--gutter)]" style={{ top: "calc(var(--label-h) + 132px)" }}>
            <div aria-hidden="true">
              <SplitReveal as="p" text={left} ready={introDone} className="display text-[clamp(46px,13vw,84px)] font-extrabold leading-[0.9]" />
              <SplitReveal as="p" text={right} ready={introDone} delay={0.12} className="display text-[clamp(40px,11.4vw,76px)] font-extrabold leading-[0.9] text-destaque" />
            </div>
            <p className="sr-only">{TEXT.heroLine[lang]}</p>
            <div className="hs-bottom mt-5 flex flex-wrap gap-2.5">{buttons}</div>
          </div>
        )}

        {/* the story */}
        <div className="hs-count invisible pointer-events-none absolute inset-0 grid place-items-center" aria-hidden="true">
          <SevenSeven lang={lang} numRef={numEl} />
        </div>
        <h2 className="sr-only">{UI.story[lang]}</h2>
        <div className={cn("hs-rail invisible absolute z-10", desktop ? "right-[var(--gutter)] top-1/2 flex -translate-y-1/2 gap-4" : "right-[var(--gutter)] top-[calc(var(--label-h)+92px)]")} aria-hidden="true">
          {desktop ? (
            <>
              <div className="relative h-[46vh] w-[3px] rounded-full bg-branco/20">
                <div className="hs-rail-fill absolute inset-0 origin-top rounded-full bg-acento" />
              </div>
              <ol className="flex h-[46vh] list-none flex-col justify-between py-1">
                {caps.map((c, i) => (
                  <li key={i} className={cn("max-w-[170px] font-display text-[13px] font-semibold uppercase leading-tight tracking-[0.14em] transition-colors", step === i + 1 ? "text-branco" : "text-branco/45")}>
                    <span className="mr-2 text-destaque">0{i + 1}</span>
                    {firstWords(c)}
                  </li>
                ))}
                <li className="font-display text-[13px] tracking-[0.18em] text-suave">0{Math.max(1, Math.min(3, step))} / 03</li>
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
              desktop ? (i === 1 ? "right-[calc(var(--gutter)+230px)] top-[34%] w-[min(460px,33vw)]" : "left-[var(--gutter)] top-[38%] w-[min(500px,36vw)]") : "inset-x-0 bottom-[9svh] px-[var(--gutter)]",
            )}
          >
            <p className="eyebrow text-destaque">
              0{i + 1} <span className="text-suave">/ 03 · {UI.story[lang]}</span>
            </p>
            <p className={cn("mt-4 leading-[1.4] [text-shadow:0_2px_18px_rgba(49,11,10,0.7)]", i === 0 ? "font-display text-[clamp(30px,3vw,52px)] font-bold uppercase leading-[0.98]" : "text-[clamp(19px,1.6vw,25px)]")}>{c}</p>
            {i === 2 && (
              <p className="hs-sign mt-5 font-hand text-[clamp(40px,3.6vw,60px)] leading-none text-destaque" style={{ clipPath: "inset(0 100% 0 0)" }}>
                {TEXT.signature}
              </p>
            )}
          </div>
        ))}
        <div className="hs-end invisible absolute inset-x-0 top-[34%] z-10 px-[var(--gutter)] text-center">
          <p className="mx-auto max-w-[min(1020px,92vw)] font-display text-[clamp(28px,3.4vw,56px)] font-bold uppercase leading-[0.98] text-balance [text-shadow:0_6px_40px_rgba(49,11,10,0.7)]">{TEXT.toBook[lang]}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">{endButtons}</div>
        </div>
      </div>
    </section>
  );
}

/** Reduced motion: no pin and no scrub; the hero, then the captions as text beside the still. */
function HeroStatic({ left, right, caps, buttons, endButtons, meta }: { left: string[]; right: string[]; caps: string[]; buttons: React.ReactNode; endButtons: React.ReactNode; meta: string }) {
  const { lang } = useSite();
  return (
    <>
      <section id="accueil" className="relative overflow-hidden bg-marca pb-16 text-branco" style={{ paddingTop: "calc(var(--label-h) + 110px)" }}>
        <div className="container-x">
          <h1 className="meta mb-8 text-suave lg:text-center" lang={lang === "fr" ? undefined : "fr"}>
            <span className="text-branco">LUSOSABORES</span> Restaurant spécialités Portugaises à Gland
          </h1>
        </div>
        <div className="container-x grid items-end gap-10 lg:grid-cols-[1fr_minmax(300px,29vw)_1fr]">
          <p className="display text-[clamp(46px,6.3vw,124px)] font-extrabold leading-[0.88] lg:text-right">
            {left.map((x) => (
              <span key={x} className="block">
                {x}
              </span>
            ))}
            <span className="block text-destaque lg:hidden">{right.join(" ")}</span>
          </p>
          <div className="arch-full relative aspect-[3/4] w-full bg-marca-escura">
            <picture>
              <source media="(max-width: 700px)" srcSet={asset("hero/brasa-800.webp")} />
              <img src={asset("hero/brasa-1600.webp")} alt="" className="absolute inset-0 h-full w-full object-cover object-bottom" />
            </picture>
          </div>
          <p aria-hidden="true" className="display hidden text-[clamp(42px,5.4vw,108px)] font-extrabold leading-[0.88] text-destaque lg:block">
            {right.map((x) => (
              <span key={x} className="block">
                {x}
              </span>
            ))}
          </p>
        </div>
        <div className="container-x mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">{buttons}</div>
          <p className="meta text-suave">{meta}</p>
        </div>
      </section>
      <section className="bg-marca-escura py-20 text-branco" aria-labelledby="story-title">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <h2 id="story-title" className="eyebrow mb-6 text-destaque">
              {UI.story[lang]}
            </h2>
            <SevenSeven lang={lang} still />
          </div>
          <ol className="list-none space-y-10">
            {caps.map((c, i) => (
              <li key={i}>
                <p className="eyebrow text-destaque">0{i + 1} / 03</p>
                <p className="mt-3 text-[clamp(18px,1.45vw,23px)] leading-relaxed">{c}</p>
                {i === 2 && <p className="mt-3 font-hand text-5xl text-destaque">{TEXT.signature}</p>}
              </li>
            ))}
          </ol>
        </div>
        <div className="container-x mt-16 text-center">
          <p className="mx-auto max-w-[980px] font-display text-[clamp(28px,3.4vw,56px)] font-bold uppercase leading-[0.98]">{TEXT.toBook[lang]}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">{endButtons}</div>
        </div>
      </section>
    </>
  );
}
