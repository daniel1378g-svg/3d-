// The opening: olive ground, a small tracked eyebrow, a tall arch with the hero pizza, ITALIAN SOUL in white on the
// left and ALPINE HEART in pale gold on the right, the calls to action at the bottom left and the address with a
// scroll cue at the bottom right. Scrolling (desktop and phone) keeps the stage in place: the split headline moves
// out and fades, the arch grows into a full-screen photograph, and three numbered chapters follow with a large
// 01 / 02 / 03 marker and a progress rail – Italian cooking, an alpine setting, family hospitality – each with its own
// photograph. It ends on the hosts' own question and the call buttons. Scrub smoothing 0.6 s.
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/copy";
import { BUSINESS } from "@/content/business";
import { useGsap } from "@/lib/useGsap";
import { useIsDesktop, useReduced } from "@/lib/useMedia";
import { cn } from "@/lib/utils";
import { Photo } from "@/components/Photo";
import { PillButton, PillLink } from "@/components/ui/Pill";
import { SplitReveal } from "@/components/Reveal";
import { IconPhone } from "@/components/icons";

type Arch = { x: number; y: number; w: number; h: number; vw: number; vh: number };
function archFor(vw: number, vh: number, desktop: boolean): Arch {
  if (desktop) {
    const w = Math.min(560, Math.max(300, vw * 0.31));
    const y = Math.max(150, vh * 0.22);
    return { x: (vw - w) / 2, y, w, h: vh - y, vw, vh };
  }
  const w = Math.min(vw * 0.86, 520);
  const y = vh * 0.5;
  return { x: (vw - w) / 2, y, w, h: vh - y, vw, vh };
}
/** The arch at growth t (0 = the hero window, 1 = the whole screen), as an inset() clip-path. */
function archClip(a: Arch, t: number) {
  const top = a.y * (1 - t);
  const left = a.x * (1 - t);
  const right = (a.vw - a.x - a.w) * (1 - t);
  const r = (a.w / 2) * Math.pow(1 - t, 1.4);
  return `inset(${top}px ${right}px 0px ${left}px round ${r}px ${r}px 0px 0px)`;
}
/** Greedy lines of at most `max` characters. */
function lines(text: string, max: number) {
  const out: string[] = [];
  for (const w of text.split(" ")) {
    const last = out[out.length - 1];
    if (last && (last + " " + w).length <= max) out[out.length - 1] = last + " " + w;
    else out.push(w);
  }
  return out;
}
const PHOTOS = ["pizza-ham-rocket", "aerial-village", "hosts"];
const NUMS = ["01", "02", "03"];

export function HeroStory() {
  const { lang, book, go, href, introDone } = useSite();
  const desktop = useIsDesktop();
  const reduce = useReduced();
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLElement>(null);
  const archEl = useRef<HTMLDivElement>(null);
  const [arch, setArch] = useState<Arch>(() => archFor(typeof window === "undefined" ? 1440 : window.innerWidth, typeof window === "undefined" ? 900 : window.innerHeight, typeof window === "undefined" || window.innerWidth >= 1024));
  const [step, setStep] = useState(0);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    let w = window.innerWidth;
    const on = () => {
      // phones resize the viewport height when the address bar moves: only a width change rebuilds the arch
      if (window.innerWidth === w && arch.vw === w) return;
      w = window.innerWidth;
      setArch(archFor(window.innerWidth, window.innerHeight, window.innerWidth >= 1024));
    };
    setArch(archFor(window.innerWidth, window.innerHeight, window.innerWidth >= 1024));
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [desktop]); // eslint-disable-line react-hooks/exhaustive-deps

  // restrained cinematic motion: once the intro is over the photograph settles from 1.1 to 1 (once, no loop)
  useEffect(() => {
    if (!introDone) return;
    const id = requestAnimationFrame(() => setSettled(true));
    return () => cancelAnimationFrame(id);
  }, [introDone]);

  useGsap(
    (gsap) => {
      if (!track.current) return;
      const vh = window.innerHeight;
      const length = (desktop ? 3.2 : 2.4) * vh;
      const proxy = { t: 0 };
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
        .fromTo(".hs-marker", { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 0.06 }, 0.08)
        .to(".hs-marker", { x: () => (desktop ? -window.innerWidth * 0.34 : 0), y: () => -window.innerHeight * (desktop ? 0.3 : 0.33), scale: desktop ? 0.36 : 0.42, duration: 0.08, ease: "power2.inOut" }, 0.3)
        .to(".hs-roll", { yPercent: -100 / 3, duration: 0.05, ease: "power2.inOut" }, 0.51)
        .to(".hs-roll", { yPercent: -200 / 3, duration: 0.05, ease: "power2.inOut" }, 0.69)
        .fromTo(".hs-veil", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, 0.27)
        .fromTo(".hs-img-1", { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 0.07 }, 0.5)
        .fromTo(".hs-img-2", { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 0.07 }, 0.68)
        .fromTo(".hs-rail", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.03 }, 0.33)
        .fromTo(".hs-rail-fill", { scaleY: 0 }, { scaleY: 1, duration: 0.54 }, 0.36);
      const cap = (sel: string, at: number, out: number) => {
        tl.fromTo(sel, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.06, ease: "power2.out" }, at);
        tl.to(sel, { autoAlpha: 0, y: -40, duration: 0.05, ease: "power2.in" }, out);
      };
      cap(".hs-cap1", 0.36, 0.5);
      cap(".hs-cap2", 0.54, 0.68);
      cap(".hs-cap3", 0.72, 0.86);
      tl.to(".hs-marker", { autoAlpha: 0, duration: 0.04 }, 0.86).to(".hs-rail", { autoAlpha: 0, duration: 0.03 }, 0.9);
      tl.fromTo(".hs-end", { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.07, ease: "power2.out" }, 0.9).to({}, { duration: 0.03 });
    },
    stage,
    [reduce, desktop, arch],
    !reduce,
  );

  const heroLeft = TX.heroLeft[lang].toUpperCase();
  const heroRight = TX.heroRight[lang].toUpperCase();
  // the headline columns beside the arch: the size follows the longest word, so long German words still fit
  const longest = Math.max(...`${heroLeft} ${heroRight}`.split(" ").map((w) => w.length));
  const column = arch.x - 44 - Math.min(64, Math.max(16, arch.vw * 0.04));
  const headPx = Math.round(Math.max(40, Math.min(150, column / (Math.max(longest, 6) * 0.5))));
  const perLine = Math.max(longest, Math.floor(column / (headPx * 0.5)));
  const left = lines(heroLeft, perLine);
  const right = lines(heroRight, perLine);
  const chapters = [
    { title: TX.ch1Title[lang], text: TX.ch1[lang] },
    { title: TX.ch2Title[lang], text: TX.ch2[lang] },
    { title: TX.ch3Title[lang], text: TX.ch3[lang] },
  ];
  const archStyle: CSSProperties = { left: arch.x, top: arch.y, width: arch.w, height: arch.h };

  const ctas = (
    <>
      <PillButton onClick={book}>{UI.reserve[lang]}</PillButton>
      <PillLink
        variant="ghost"
        className="text-white"
        href={href("menu")}
        onClick={(e) => {
          e.preventDefault();
          go("menu");
        }}
      >
        {UI.exploreMenu[lang]}
      </PillLink>
    </>
  );
  const endCtas = (
    <>
      <PillButton onClick={book}>{UI.reserve[lang]}</PillButton>
      <PillLink variant="cream" href={`tel:${BUSINESS.tel}`} icon={<IconPhone size={18} />}>
        {BUSINESS.phone}
      </PillLink>
    </>
  );
  const srStory = (
    <ol className="sr-only">
      {chapters.map((c, i) => (
        <li key={i}>
          {NUMS[i]} – {c.title}: {c.text}
        </li>
      ))}
    </ol>
  );

  if (reduce) return <HeroStatic left={left} right={right} chapters={chapters} ctas={ctas} endCtas={endCtas} />;

  return (
    <section id="start" data-anchor ref={track} className="relative bg-olive text-white" style={{ height: desktop ? "560svh" : "480svh" }} aria-labelledby="hero-title">
      <div ref={stage} className="tex-leaf sticky top-0 h-[100svh] overflow-hidden">
        {/* the arch window: three photographs, one per chapter */}
        <div ref={archEl} className="absolute inset-0 overflow-hidden" style={{ clipPath: archClip(arch, 0) }}>
          {PHOTOS.map((id, i) => (
            <div key={id} className={cn(`hs-img-${i} absolute inset-0`, i > 0 && "invisible")}>
              <Photo
                id={id}
                eager={i === 0}
                decorative={i > 0}
                sizes="100vw"
                className="block h-full w-full"
                imgClassName={cn(i === 0 && "transition-transform duration-[2600ms] ease-[var(--ease-out)]")}
                style={i === 0 ? { transform: settled ? "scale(1)" : "scale(1.1)" } : undefined}
                focus={i === 0 ? "42% 55%" : i === 2 ? "62% 40%" : undefined}
              />
            </div>
          ))}
          <div className="hs-veil invisible absolute inset-0 bg-[linear-gradient(180deg,rgba(27,27,27,0.6)_0%,rgba(27,27,27,0.25)_42%,rgba(27,27,27,0.72)_100%)]" />
        </div>
        <div data-hero-arch aria-hidden="true" className="pointer-events-none absolute" style={archStyle} />

        <h1 id="hero-title" className="sr-only">
          {TX.h1[lang]}
        </h1>
        {srStory}
        {desktop ? (
          <>
            <p aria-hidden="true" className="hs-left meta absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center text-cream" style={{ top: Math.max(108, arch.y - 46) }}>
              {TX.eyebrow[lang]}
            </p>
            <div aria-hidden="true" className="hs-left absolute text-right" style={{ right: arch.vw - arch.x + 44, top: arch.vh * 0.3 }}>
              <SplitReveal as="p" text={left} ready={introDone} className="display font-extrabold leading-[0.88]" style={{ fontSize: headPx }} />
            </div>
            <div aria-hidden="true" className="hs-right absolute" style={{ left: arch.x + arch.w + 44, top: arch.vh * 0.44 }}>
              <SplitReveal as="p" text={right} ready={introDone} delay={0.15} className="display font-extrabold leading-[0.88] text-gold" style={{ fontSize: headPx }} />
            </div>
            <div className="hs-bottom absolute bottom-8 left-[var(--gutter)] flex gap-3">{ctas}</div>
            <div className="hs-bottom absolute bottom-8 right-[var(--gutter)] flex flex-col items-end gap-3 text-right">
              <p className="meta text-cream">
                {BUSINESS.street} · {BUSINESS.postcode} {BUSINESS.town}
              </p>
              <p className="meta flex items-center gap-3 text-[12px] text-cream/85">
                {UI.scroll[lang]}
                <span aria-hidden="true" className="relative block h-9 w-px overflow-hidden bg-cream/25">
                  <span className="absolute inset-0 bg-cream [animation:scroll-hint_2.2s_var(--ease-in-out)_3]" />
                </span>
              </p>
            </div>
          </>
        ) : (
          <div className="hs-left absolute inset-x-0 px-[var(--gutter)]" style={{ top: "calc(var(--band-h) + 92px)" }}>
            <div aria-hidden="true">
              <p className="meta mb-3 text-cream">{TX.eyebrow[lang]}</p>
              <SplitReveal as="p" text={heroLeft} ready={introDone} className="display text-[clamp(44px,13vw,84px)] font-extrabold leading-[0.9]" />
              <SplitReveal as="p" text={heroRight} ready={introDone} delay={0.12} className="display text-[clamp(44px,13vw,84px)] font-extrabold leading-[0.9] text-gold" />
            </div>
            <div className="hs-bottom mt-5 flex flex-wrap gap-2.5">{ctas}</div>
          </div>
        )}

        {/* the chapters */}
        <div className="hs-marker invisible pointer-events-none absolute inset-0 grid place-items-center" aria-hidden="true">
          <span className="block h-[1em] overflow-hidden font-display text-[clamp(140px,26vw,440px)] font-extrabold leading-none text-gold [text-shadow:0_20px_60px_rgba(27,27,27,0.35)]">
            <span className="hs-roll flex flex-col">
              {NUMS.map((n) => (
                <span key={n} className="block h-[1em]">
                  {n}
                </span>
              ))}
            </span>
          </span>
        </div>
        <div className={cn("hs-rail invisible absolute z-10", desktop ? "right-[var(--gutter)] top-1/2 flex -translate-y-1/2 gap-4" : "right-[var(--gutter)] top-[calc(var(--band-h)+96px)]")} aria-hidden="true">
          {desktop ? (
            <>
              <div className="relative h-[46vh] w-[3px] rounded-full bg-white/20">
                <div className="hs-rail-fill absolute inset-0 origin-top rounded-full bg-gold" />
              </div>
              <ol className="flex h-[46vh] list-none flex-col justify-between py-1">
                {chapters.map((c, i) => (
                  <li key={i} className={cn("max-w-[190px] font-display text-[14px] font-semibold uppercase leading-tight tracking-[0.14em] transition-colors duration-300", step === i + 1 ? "text-white" : "text-white/45")}>
                    <span className="mr-2 text-gold">{NUMS[i]}</span>
                    {c.title}
                  </li>
                ))}
                <li className="font-display text-[13px] tracking-[0.18em] text-cream">0{Math.max(1, Math.min(3, step))} / 03</li>
              </ol>
            </>
          ) : (
            <span className="glass rounded-full px-3 py-1.5 font-display text-sm font-semibold tracking-[0.16em] text-ink">0{Math.max(1, Math.min(3, step))} / 03</span>
          )}
        </div>
        {chapters.map((c, i) => (
          <div
            key={i}
            aria-hidden="true"
            className={cn(
              `hs-cap${i + 1} invisible absolute z-10`,
              desktop ? (i === 1 ? "right-[calc(var(--gutter)+250px)] top-[30%] w-[min(460px,32vw)]" : "left-[var(--gutter)] top-[34%] w-[min(480px,34vw)]") : "inset-x-0 bottom-[8svh] px-[var(--gutter)]",
            )}
          >
            <p className="eyebrow text-gold">
              {NUMS[i]} <span className="text-cream">· {TX.storyLabel[lang]}</span>
            </p>
            <h2 className="mt-3 font-display text-[clamp(36px,4.2vw,72px)] font-extrabold uppercase leading-[0.9] [text-shadow:0_4px_30px_rgba(27,27,27,0.5)]">{c.title}</h2>
            <p className="mt-4 text-[clamp(17px,1.35vw,22px)] leading-[1.5] [text-shadow:0_2px_18px_rgba(27,27,27,0.7)]">{c.text}</p>
          </div>
        ))}
        <div className="hs-end invisible absolute inset-x-0 top-[24%] z-10 px-[var(--gutter)] text-center md:top-[28%]">
          <p className="mx-auto max-w-[min(1100px,94vw)] font-display text-[clamp(36px,5.4vw,96px)] font-extrabold uppercase leading-[0.92] text-balance [text-shadow:0_6px_40px_rgba(27,27,27,0.6)]">{TX.storyEnd[lang]}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">{endCtas}</div>
        </div>
      </div>
    </section>
  );
}

/** Reduced motion: no scrubbing and no pinned stage – the hero composition, then the chapters as plain blocks. */
function HeroStatic({ left, right, chapters, ctas, endCtas }: { left: string[]; right: string[]; chapters: { title: string; text: string }[]; ctas: ReactNode; endCtas: ReactNode }) {
  const { lang } = useSite();
  return (
    <>
      <section id="start" data-anchor className="tex-leaf relative overflow-hidden bg-olive pb-16 text-white" style={{ paddingTop: "calc(var(--band-h) + 120px)" }} aria-labelledby="hero-title">
        <div className="container-x grid items-end gap-10 lg:grid-cols-[1fr_minmax(300px,31vw)_1fr]">
          <h1 id="hero-title" className="display text-[clamp(44px,6vw,120px)] font-extrabold leading-[0.88] lg:text-right">
            <span className="meta mb-4 block text-cream">{TX.eyebrow[lang]}</span>
            {left.map((x) => (
              <span key={x} className="block">
                {x}
              </span>
            ))}
            <span className="block text-gold lg:hidden">{right.join(" ")}</span>
            <span className="sr-only"> – {TX.h1[lang]}</span>
          </h1>
          <div className="arch-full relative aspect-[3/4] w-full">
            <Photo id="pizza-ham-rocket" eager sizes="(min-width: 1024px) 31vw, 92vw" className="absolute inset-0 block h-full w-full" focus="42% 55%" />
          </div>
          <p aria-hidden="true" className="display hidden text-[clamp(44px,6vw,120px)] font-extrabold leading-[0.88] text-gold lg:block">
            {right.map((x) => (
              <span key={x} className="block">
                {x}
              </span>
            ))}
          </p>
        </div>
        <div className="container-x mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">{ctas}</div>
          <p className="meta text-cream">
            {BUSINESS.street} · {BUSINESS.postcode} {BUSINESS.town}
          </p>
        </div>
      </section>
      <section className="bg-ink py-20 text-white" aria-label={TX.storyLabel[lang]}>
        <ol className="container-x grid list-none gap-10 md:grid-cols-3">
          {chapters.map((c, i) => (
            <li key={i} className="overflow-hidden rounded-[24px] bg-white/5">
              <div className="arch aspect-[4/3]">
                <Photo id={PHOTOS[i]} sizes="(min-width: 768px) 30vw, 92vw" decorative={i === 0} className="block h-full w-full" />
              </div>
              <div className="p-6">
                <p className="font-display text-[56px] font-extrabold leading-none text-gold">{NUMS[i]}</p>
                <h2 className="mt-2 font-display text-[32px] font-extrabold uppercase leading-none">{c.title}</h2>
                <p className="mt-3 text-[17px] leading-relaxed text-cream/90">{c.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="container-x mt-16 text-center">
          <p className="mx-auto max-w-[1100px] font-display text-[clamp(34px,5vw,88px)] font-extrabold uppercase leading-[0.92]">{TX.storyEnd[lang]}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">{endCtas}</div>
        </div>
      </section>
    </>
  );
}
