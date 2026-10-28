import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import { HTML_LANG, TEXT, UI, fill } from "@/i18n";
import { CONTACT, chf } from "@/content";
import { HOURS_ROWS, hm } from "@/hours";
import { useSite } from "@/site";
import { asset, cn, lowPower, prefersReducedMotion, webglAvailable } from "@/lib/utils";
import { SHELL, adopt } from "@/lib/shell";
import { Photo } from "../Photo";
import { SplitLetters } from "../SplitLetters";
import { Magnetic } from "../Magnetic";
import { OpenBadge } from "../OpenBadge";
import { SiteLink } from "../SiteLink";
import { ArrowGlyph, PhoneGlyph, PlayPause } from "../Glyphs";
import { TRAY_ITEMS } from "../Illustrations";

const SLIDE_MS = 6000;
// The built home pages paint this hero (first slide) as static HTML before the app runs; the app then takes
// it over in its final state instead of replaying the entrance.
// Its photo plate is adopted as is (the very same <img>), so the browser doesn't paint the picture twice.

/** The custard surface: a still poster first, the live shader after first paint when the device can afford it. */
function Custard({ host }: { host: React.RefObject<HTMLElement | null> }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion() || lowPower() || !webglAvailable() || !host.current || !canvas.current) return;
    let stop: (() => void) | null = null;
    let cancelled = false;
    const start = () =>
      import("@/three/custard").then(({ mountCustard }) => {
        if (cancelled || !host.current || !canvas.current) return;
        stop = mountCustard(host.current, canvas.current, () => setLive(true)).stop;
      });
    // After the first paint and the intro: the hero text and poster are already on screen.
    const id = window.setTimeout(() => ("requestIdleCallback" in window ? requestIdleCallback(start, { timeout: 1500 }) : start()), 700);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
      stop?.();
    };
  }, [host]);
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-custard">
      <picture>
        {!__ARTIFACT__ && <source media="(max-aspect-ratio: 4/5)" type="image/avif" srcSet={asset("images/custard-poster-portrait.avif")} />}
        <source media="(max-aspect-ratio: 4/5)" type="image/webp" srcSet={asset("images/custard-poster-portrait.webp")} />
        {!__ARTIFACT__ && <source type="image/avif" srcSet={asset("images/custard-poster.avif")} />}
        <img src={asset("images/custard-poster.webp")} alt="" width={1600} height={1000} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
      </picture>
      <canvas ref={canvas} className="absolute inset-0 h-full w-full transition-opacity duration-1000" style={{ opacity: live ? 1 : 0 }} />
      {/* A soft custard veil behind the words keeps the caramel spots faint there. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_70%_at_24%_58%,rgb(247_214_138/0.82),rgb(247_214_138/0.35)_55%,transparent_80%)] max-md:bg-[radial-gradient(ellipse_120%_60%_at_50%_70%,rgb(247_214_138/0.85),rgb(247_214_138/0.4)_60%,transparent_85%)]" />
    </div>
  );
}

type Slide = { key: string; kicker: string; title: string; body: ReactNode; cta: ReactNode; visual: ReactNode };

function Plate({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("relative aspect-square w-full overflow-hidden rounded-full shadow-lift ring-[10px] ring-flour", className)}>{children}</div>;
}
function Arch({ children }: { children: ReactNode }) {
  return <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-full rounded-b-[28px] shadow-lift ring-[10px] ring-flour">{children}</div>;
}
function Sticker({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("absolute grid place-items-center rounded-full bg-espresso text-center text-flour shadow-set", className)}>{children}</div>;
}

export function Hero() {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const host = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(() => prefersReducedMotion()); // reduced motion: no auto-advance
  const [hold, setHold] = useState(false); // hover or focus inside
  const [onScreen, setOnScreen] = useState(true);
  const [still, setStill] = useState(SHELL.hero);
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) setStill(false);
    mounted.current = true;
  }, [index, lang]);

  const offerFirst = TEXT.offerLead[lang].split(/(?<=\.)\s/)[0];
  const slides: Slide[] = [
    {
      key: "home",
      kicker: "Chez Manu",
      title: TEXT.heroTitle[lang],
      body: (
        <>
          <p>{TEXT.heroLine1[lang]}</p>
          <p className="mt-1">{TEXT.heroLine2[lang]}</p>
        </>
      ),
      cta: (
        <SiteLink page="home" section="histoire" className="btn btn-dark">
          {TEXT.learnMore[lang]}<span className="sr-only"> – {TEXT.introTitle[lang]}</span> <ArrowGlyph />
        </SiteLink>
      ),
      visual: (
        <div className="relative">
          <Plate>
            <Photo id="natas" sizes="(min-width: 1024px) 440px, (min-width: 768px) 38vw, min(64vw, 300px)" priority className="h-full w-full" />
          </Plate>
          <div className="absolute -bottom-6 -left-6 w-[58%] rounded-[24px] bg-flour px-4 py-3 shadow-lift md:-left-10">
            <img src={asset("brand/logo-300.webp")} alt="" width={284} height={145} className="h-auto w-full" />
          </div>
        </div>
      ),
    },
    {
      key: "offer",
      kicker: UI.offer[lang],
      title: TEXT.offerTitle[lang],
      body: <p>{offerFirst}</p>,
      cta: (
        <SiteLink page="offer" className="btn btn-dark">
          {TEXT.learnMore[lang]}<span className="sr-only"> – {UI.offer[lang]}</span> <ArrowGlyph />
        </SiteLink>
      ),
      visual: (
        <Arch>
          <Photo id="shop" sizes="(min-width: 1024px) 420px, 70vw" className="h-full w-full" position="40% 50%" />
        </Arch>
      ),
    },
    {
      key: "breakfast",
      kicker: TEXT.engKicker[lang],
      title: TEXT.eng4Title[lang],
      body: <p>{TEXT.eng4[lang]}</p>,
      cta: (
        <SiteLink page="offer" section="petit-dejeuner" className="btn btn-dark">
          {UI.seeCarte[lang]} <ArrowGlyph />
        </SiteLink>
      ),
      visual: (
        <div className="relative">
          <Plate className="bg-flour">
            <div className="absolute inset-[9%] rounded-full bg-[radial-gradient(circle_at_40%_35%,#fff,#f3ead8)] ring-1 ring-espresso/10" />
            <div className="absolute inset-0 grid grid-cols-3 place-items-center gap-1 p-[18%] text-cocoa">
              {["ballon", "croissant", "juice", "butter", "jam", "slices"].map((k) => (
                <span key={k} className="grid place-items-center">{TRAY_ITEMS[k]({ size: 64, className: "h-auto w-[78%]" })}</span>
              ))}
            </div>
          </Plate>
          <Sticker className="-right-2 -top-2 h-28 w-28 rotate-6 md:h-32 md:w-32">
            <span>
              <span className="block text-[11px] font-bold uppercase tracking-widest text-custard">N°1 · N°2</span>
              <span className="display price block text-2xl md:text-[1.7rem]">{chf("12.00")}</span>
            </span>
          </Sticker>
        </div>
      ),
    },
    {
      key: "tea",
      kicker: TEXT.universeKicker[lang],
      title: TEXT.universeTea[lang],
      body: <p>{TEXT.teaRoomSeats[lang]}</p>,
      cta: (
        <SiteLink page="home" section="tea-room" className="btn btn-dark">
          {TEXT.learnMore[lang]}<span className="sr-only"> – {TEXT.universeTea[lang]}</span> <ArrowGlyph />
        </SiteLink>
      ),
      visual: (
        <div className="relative">
          <Arch>
            <Photo id="tearoom" sizes="(min-width: 1024px) 420px, 70vw" className="h-full w-full" position="50% 40%" />
          </Arch>
          <OpenBadge terrace open={false} className="absolute -bottom-5 left-1/2 w-max -translate-x-1/2 justify-center" />
        </div>
      ),
    },
    {
      key: "hours",
      kicker: UI.every[lang],
      title: TEXT.hoursTitle[lang],
      body: (
        <dl className="grid w-max grid-cols-[auto_auto] gap-x-6 gap-y-1">
          {HOURS_ROWS.map((r) => (
            <div key={r.key} className="contents">
              <dt className="font-semibold">{TEXT[r.key][lang]}</dt>
              <dd className="price">
                {hm(r.open)} – {hm(r.close)}
              </dd>
            </div>
          ))}
        </dl>
      ),
      cta: (
        <Magnetic>
          <a href={CONTACT.phoneHref} className="btn btn-dark" data-cursor="call">
            <PhoneGlyph /> {TEXT.callUs[lang]}
          </a>
        </Magnetic>
      ),
      visual: (
        <div className="relative">
          <Plate>
            <Photo id="counter" sizes="(min-width: 1024px) 440px, (min-width: 768px) 38vw, min(64vw, 300px)" className="h-full w-full" position="35% 50%" />
          </Plate>
          <Sticker className="-left-3 -top-3 h-32 w-32 -rotate-6 md:h-36 md:w-36">
            <span>
              <span className="block text-[11px] font-bold uppercase tracking-widest text-custard">7/7</span>
              <span className="display block text-4xl md:text-5xl">6:30</span>
            </span>
          </Sticker>
        </div>
      ),
    },
  ];

  const go = (next: number, d = next > index ? 1 : -1) => {
    setDir(d);
    setIndex((next + slides.length) % slides.length);
  };
  const running = !paused && !hold && onScreen;

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => go(index + 1, 1), SLIDE_MS);
    return () => window.clearTimeout(id);
  }); // re-armed after every render, so any change restarts the 6 s

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting && !document.hidden), { threshold: 0.2 });
    io.observe(host.current!);
    const vis = () => setOnScreen(!document.hidden);
    document.addEventListener("visibilitychange", vis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(index + 1, 1);
    else if (info.offset.x > 60 || info.velocity.x > 400) go(index - 1, -1);
  };

  const s = slides[index];
  return (
    <section
      ref={host}
      id="accueil"
      aria-roledescription="carousel"
      aria-label={UI.heroLabel[lang]}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden text-espresso [touch-action:pan-y]"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHold(true)}
      onPointerLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setHold(false)}
    >
      <Custard host={host} />
      <h1 className="sr-only">
        Chez Manu – {TEXT.heroTitle[lang]}
      </h1>

      <div className="gutter relative flex flex-1 items-center pb-28 pt-[calc(var(--header-h)+var(--label-h)+24px)] md:pb-32">
        <div className="wrap">
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.div
              key={s.key + lang}
              role="group"
              aria-roledescription="slide"
              aria-label={fill(UI.slide[lang], { n: index + 1, total: slides.length })}
              custom={dir}
              drag={reduce ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={onDragEnd}
              initial={reduce ? { opacity: 0 } : { opacity: 0, transform: `translateX(${dir * 60}px)` }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateX(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, transform: `translateX(${dir * -60}px)` }}
              transition={reduce ? { duration: 0.35 } : { type: "spring", bounce: 0.12, duration: 0.6 }}
              className="grid cursor-grab items-center gap-10 active:cursor-grabbing md:grid-cols-[1.15fr_0.85fr] md:gap-16"
            >
              <div className="order-2 max-w-[640px] md:order-1">
                <p className="kicker mb-4 inline-flex rounded-full bg-flour/80 px-3 py-1.5 !text-cocoa">{s.kicker}</p>
                <p className="display text-[clamp(2.4rem,6.4vw,5.4rem)] leading-[0.98] text-cocoa" aria-hidden={index === 0 ? "true" : undefined}>
                  <SplitLetters text={s.title} lang={HTML_LANG[lang]} still={still} />
                </p>
                <div className="mt-5 max-w-[46ch] text-[clamp(1.02rem,1.5vw,1.2rem)] font-medium leading-relaxed">{s.body}</div>
                <div className="mt-7 flex flex-wrap gap-3">{s.cta}</div>
              </div>
              <div className="order-1 mx-auto w-[min(64vw,300px)] md:order-2 md:w-full md:max-w-[440px]">
                <motion.div
                  initial={reduce || still ? false : { transform: "scale(0.9) rotate(-5deg)" }}
                  animate={{ transform: "scale(1) rotate(0deg)" }}
                  transition={{ type: "spring", bounce: 0.3, duration: 0.8, delay: 0.1 }}
                >
                  {still && index === 0 && SHELL.heroVisual ? (
                    <div ref={adopt(SHELL.heroVisual)} />
                  ) : (
                    s.visual
                  )}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="gutter absolute inset-x-0 bottom-5 md:bottom-8">
        <div className="wrap flex items-center gap-3">
          <button type="button" onClick={() => go(index - 1, -1)} className="grid h-11 w-11 place-items-center rounded-full bg-flour/85 text-espresso shadow-set hover:bg-flour">
            <ArrowGlyph className="rotate-180" />
            <span className="sr-only">{UI.prev[lang]}</span>
          </button>
          <ol className="flex items-center gap-1.5">
            {slides.map((sl, i) => (
              <li key={sl.key}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={i === index ? "true" : undefined}
                  className="group grid h-11 min-w-6 place-items-center px-1"
                >
                  <span className={cn("relative block h-2 overflow-hidden rounded-full bg-espresso/25 transition-[width] duration-300", i === index ? "w-12" : "w-2 group-hover:bg-espresso/45")}>
                    {i === index && (
                      <span
                        key={`${index}-${lang}`}
                        className="absolute inset-0 origin-left bg-espresso"
                        style={{ animation: running ? `hero-progress ${SLIDE_MS}ms linear forwards` : "none", transform: running ? undefined : "scaleX(1)" }}
                      />
                    )}
                  </span>
                  <span className="sr-only">{fill(UI.slide[lang], { n: i + 1, total: slides.length })}</span>
                </button>
              </li>
            ))}
          </ol>
          <button type="button" onClick={() => go(index + 1, 1)} className="grid h-11 w-11 place-items-center rounded-full bg-flour/85 text-espresso shadow-set hover:bg-flour">
            <ArrowGlyph />
            <span className="sr-only">{UI.next[lang]}</span>
          </button>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="ml-auto grid h-11 w-11 place-items-center rounded-full bg-espresso text-flour shadow-set"
          >
            <PlayPause paused={paused} />
            <span className="sr-only">{paused ? UI.play[lang] : UI.pause[lang]}</span>
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live={running ? "off" : "polite"}>
        {fill(UI.slide[lang], { n: index + 1, total: slides.length })}: {s.title}
      </p>
    </section>
  );
}
