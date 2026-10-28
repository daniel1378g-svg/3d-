import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { UI, fill } from "@/i18n";
import { CONTACT, TERRE_ET_MER, chf } from "@/content";
import { ROWS, status } from "@/hours";
import { useSite } from "@/site";
import { cn, img } from "@/lib/utils";
import { TileWall } from "../tilewall/TileWall";
import { Logo } from "../Logo";
import { SiteLink } from "../SiteLink";
import { OpenBadge } from "./OpenBadge";

const DURATION = 6000;
const EASE = [0.16, 1, 0.3, 1] as const;

/** Big heading whose letters rise one after another inside a clipped line. */
function Letters({ text, className, as: Tag = "p" }: { text: string; className?: string; as?: "p" | "h2" }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  let n = 0;
  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      {words.map((w, wi) => (
        <span key={wi} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          {[...w].map((ch, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              initial={reduce ? false : { transform: "translateY(105%)" }}
              animate={{ transform: "translateY(0%)" }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.08 + Math.min(n++ * 0.018, 0.5) }}
            >
              {ch}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}

/** A line of text that wipes in from the left. */
function Wipe({ children, delay = 0.25, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
      animate={{ clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const button = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-bold transition-colors";

export function Hero() {
  const { lang } = useSite();
  const host = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(() => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [hold, setHold] = useState(false); // focus inside or pointer over the controls
  const now = status();
  const todayRow = ROWS.find((r) => (r.days as readonly number[]).includes(now.serviceDay))!;

  const slides: { key: string; label: string; body: ReactNode; aside?: ReactNode }[] = [
    {
      key: "welcome",
      label: "Restaurant Don Duarte",
      body: (
        <>
          <Wipe delay={0.05}>
            <Logo alt="" className="mb-7 w-[min(72vw,300px)] px-5 py-3 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.5)] ring-1 ring-ink/10" />
          </Wipe>
          <Letters text="Restaurant Don Duarte" className="font-display text-[clamp(2.6rem,7.4vw,6.4rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-green" />
          <Wipe className="mt-5 max-w-xl text-lg text-ink-soft md:text-xl">{UI.tagline[lang]}</Wipe>
          <Wipe delay={0.45} className="mt-8 flex flex-wrap gap-3">
            <SiteLink page="plats" className={cn(button, "bg-red text-white hover:bg-red-deep")}>{UI.seePlats[lang]}</SiteLink>
            <SiteLink page="home" section="horaires" className={cn(button, "border-2 border-green text-green hover:border-red hover:text-red")}>{UI.navHours[lang]}</SiteLink>
          </Wipe>
        </>
      ),
    },
    {
      key: "terre-et-mer",
      label: UI.terreEtMerButton[lang],
      body: (
        <>
          <Wipe delay={0.05} className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-red">Terra e Mar</Wipe>
          <Letters text={UI.terreEtMerButton[lang]} className="font-display text-[clamp(2.2rem,5.6vw,4.8rem)] font-semibold leading-[1] tracking-[-0.015em] text-green" />
          <Wipe className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-display text-4xl font-semibold text-red tabular-nums md:text-5xl">{chf(TERRE_ET_MER.prices[0])}</span>
            <span className="text-ink-soft">{UI.perPerson[lang]}</span>
          </Wipe>
          <Wipe delay={0.45} className="mt-8">
            <SiteLink page="plats" section="terra-e-mar" className={cn(button, "bg-red text-white hover:bg-red-deep")}>{UI.seeMenu[lang]}</SiteLink>
          </Wipe>
        </>
      ),
      aside: <img src={img("plat-terra-e-mar")} alt={TERRE_ET_MER.name.fr} className="aspect-[3/4] w-full rounded-[28px] object-cover shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]" />,
    },
    {
      key: "1988",
      label: UI.since[lang],
      body: (
        <>
          <Letters text="1988" className="font-display text-[clamp(5rem,17vw,12rem)] font-bold leading-[0.85] tracking-[-0.04em] text-green tabular-nums" />
          <Wipe className="mt-6 max-w-lg font-display text-2xl italic leading-snug text-ink md:text-4xl">{UI.since[lang]}</Wipe>
          <Wipe delay={0.45} className="mt-6 text-ink-soft">
            {CONTACT.street}, {CONTACT.city}
          </Wipe>
        </>
      ),
      aside: <img src={img("terrasse")} alt={UI.roomPhoto[lang]} className="aspect-[4/3] w-full rounded-[28px] object-cover shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]" />,
    },
    {
      key: "vins",
      label: UI.winesLine[lang],
      body: (
        <>
          <Wipe delay={0.05} className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-red">{UI.navVins[lang]}</Wipe>
          <Letters text={UI.winesLine[lang]} className="max-w-3xl font-display text-[clamp(2rem,4.8vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.015em] text-green" />
          <Wipe className="mt-6 flex flex-wrap gap-2">
            {["Vinho Verde", "Douro", "Dão", "Palmela", "Alentejo"].map((r) => (
              <span key={r} className="rounded-full border border-green/30 px-3 py-1 text-sm font-semibold text-green">{r}</span>
            ))}
          </Wipe>
          <Wipe delay={0.45} className="mt-8">
            <SiteLink page="vins" className={cn(button, "bg-red text-white hover:bg-red-deep")}>{UI.seeVins[lang]}</SiteLink>
          </Wipe>
        </>
      ),
    },
    {
      key: "horaires",
      label: UI.openEveryDay[lang],
      body: (
        <>
          <Wipe delay={0.05}>
            <OpenBadge />
          </Wipe>
          <Letters text={UI.openEveryDay[lang]} className="mt-5 font-display text-[clamp(2.4rem,6vw,5.2rem)] font-semibold leading-[1] tracking-[-0.015em] text-green" />
          <Wipe className="mt-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink-soft">{UI.today[lang]} · {UI[todayRow.key][lang]}</p>
            <p className="font-display text-5xl font-semibold text-green tabular-nums md:text-6xl">
              {todayRow.open}–{todayRow.close}
            </p>
          </Wipe>
          <Wipe delay={0.45} className="mt-8 flex flex-wrap items-center gap-4">
            <a href={CONTACT.tel} className={cn(button, "bg-red text-white hover:bg-red-deep")}>
              {UI.call[lang]} · <span className="tabular-nums">{CONTACT.phone}</span>
            </a>
          </Wipe>
        </>
      ),
    },
  ];
  const total = slides.length;
  const goTo = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);

  useEffect(() => {
    if (paused || hold) return;
    const id = window.setTimeout(() => goTo(index + 1), DURATION);
    return () => window.clearTimeout(id);
  }, [index, paused, hold, goTo]);

  // Swipe on touch screens.
  const start = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") start.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = start.current;
    start.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - s.y)) goTo(index + (dx < 0 ? 1 : -1));
  };
  const slide = slides[index];

  return (
    <section
      ref={host}
      aria-roledescription="carousel"
      aria-label={UI.slideshow[lang]}
      className="relative isolate overflow-hidden text-ink"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") goTo(index + 1);
        if (e.key === "ArrowLeft") goTo(index - 1);
      }}
    >
      <TileWall host={host} />
      <h1 className="sr-only">Restaurant Don Duarte · {UI.tagline[lang]}</h1>

      {/* The slides sit on a white panel; the animated tiles show around it. */}
      <div className="gutter relative py-4 md:py-8">
        <div className="wrap panel grid min-h-[clamp(560px,80svh,800px)] grid-rows-[1fr_auto] px-6 pb-8 pt-10 md:px-12 md:pt-14">
          <div aria-live={paused || hold ? "polite" : "off"} className="grid items-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.key}
                role="group"
                aria-roledescription="slide"
                aria-label={fill(UI.slideOf[lang], { n: index + 1, total })}
                initial={{ opacity: reduce ? 0 : 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: reduce ? 0.3 : 0.22 } }}
                transition={{ duration: 0.3 }}
                className={cn("grid items-center gap-10", slide.aside && "md:grid-cols-[1.25fr_0.75fr]")}
              >
                <div className="min-w-0">{slide.body}</div>
                {slide.aside && (
                  <motion.div
                    className="hidden md:block"
                    initial={reduce ? false : { opacity: 0, transform: "translateX(40px) rotate(2deg)" }}
                    animate={{ opacity: 1, transform: "translateX(0px) rotate(0deg)" }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
                  >
                    <div className="mx-auto max-w-[380px] rounded-[34px] bg-ink/5 p-3 ring-1 ring-ink/10">{slide.aside}</div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3" onFocus={() => setHold(true)} onBlur={() => setHold(false)}>
            <button type="button" onClick={() => goTo(index - 1)} className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 text-ink hover:border-red hover:text-red">
              <span className="sr-only">{UI.prevSlide[lang]}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
            </button>
            <button type="button" onClick={() => goTo(index + 1)} className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 text-ink hover:border-red hover:text-red">
              <span className="sr-only">{UI.nextSlide[lang]}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
            </button>
            <button type="button" onClick={() => setPaused((p) => !p)} aria-pressed={paused} className="inline-flex h-11 items-center gap-2 rounded-full border border-white/30 px-4 text-sm font-bold hover:border-gold hover:text-gold">
              {paused ? (
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4l13 8-13 8z" fill="currentColor" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor" /></svg>
              )}
              {paused ? UI.play[lang] : UI.pause[lang]}
            </button>
            <ol className="ml-auto flex items-center gap-2">
              {slides.map((s, i) => (
                <li key={s.key}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === index ? "true" : undefined}
                    className="group relative block h-11 w-9 md:w-14"
                  >
                    <span className="sr-only">{fill(UI.goToSlide[lang], { n: i + 1 })}: {s.label}</span>
                    <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-ink/15">
                      {i === index && (
                        <span
                          key={`${index}-${paused || hold}`}
                          className="absolute inset-0 origin-left rounded-full bg-green"
                          style={paused || hold ? { transform: "scaleX(1)" } : { animation: `slide-progress ${DURATION}ms linear forwards` }}
                        />
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

