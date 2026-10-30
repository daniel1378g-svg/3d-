// How the rodízio works, told while the page is pinned (wide screens): 1 the buffet, 2 the skewers arrive (the
// restaurant's own clip), 3 carved at the table, 4 the green/red signal on the table. Each step brings its picture
// in through a growing window. Phones and reduced motion: the four steps stacked, each revealed on its own.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { fill } from "@/i18n";
import { useSite } from "@/site";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { asset, cn } from "@/lib/utils";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";
import { Img } from "../Img";
import { Reveal } from "../Reveal";

const MEDIA = ["buffet", "video", "spiess", "restaurant"] as const;

function Signal() {
  const { t } = useSite();
  const [green, setGreen] = useState(true);
  return (
    <div className="flex items-center gap-4 rounded-full bg-carvao/70 p-2 pr-5 backdrop-blur">
      <button
        type="button"
        role="switch"
        aria-checked={green}
        aria-label={t.rodizio.signalTitle}
        onClick={() => setGreen((g) => !g)}
        className="relative h-12 w-[5.5rem] shrink-0 rounded-full bg-carvao-3 transition-colors"
      >
        <motion.span
          className="absolute top-1 grid h-10 w-10 place-items-center rounded-full shadow-[0_0_24px] "
          animate={{ left: green ? "calc(100% - 2.75rem)" : "0.25rem", backgroundColor: green ? "#3fb27f" : "#d64032", color: green ? "rgba(63,178,127,0.6)" : "rgba(214,64,50,0.6)" }}
          transition={{ type: "spring", duration: 0.45, bounce: 0.2 }}
        />
      </button>
      <div aria-live="polite">
        <p className="kicker text-[0.66rem] text-creme/60">{t.rodizio.signalTitle}</p>
        <p className="font-display text-[1.05rem] font-bold text-creme">{green ? t.rodizio.signalGreen : t.rodizio.signalRed}</p>
      </div>
    </div>
  );
}

function Media({ kind, active }: { kind: (typeof MEDIA)[number]; active: boolean }) {
  const { t } = useSite();
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (active && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) v.play().catch(() => {});
    else v.pause();
  }, [active]);
  if (kind === "video") {
    return (
      <video
        ref={video}
        className="h-full w-full object-cover"
        poster={asset("/video/rodizio-poster.webp")}
        muted
        loop
        playsInline
        preload="none"
        aria-label={t.rodizio.videoLabel}
      >
        <source src={asset("/video/rodizio-960.webm")} type="video/webm" />
        <source src={asset("/video/rodizio-960.mp4")} type="video/mp4" />
      </video>
    );
  }
  return <Img id={kind} sizes="(min-width: 1024px) 55vw, 100vw" className="h-full w-full" />;
}

export function RodizioStory() {
  const { t, reduce } = useSite();
  const steps = t.rodizio.steps;
  const sec = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setPinned(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  useEffect(() => {
    if (!pinned) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pin.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 3}`,
        pin: true,
        scrub: true,
        onUpdate: (s) => setActive(Math.min(3, Math.floor(s.progress * 4 * 0.999))),
      });
    }, sec);
    return () => ctx.revert();
  }, [pinned]);

  return (
    <section ref={sec} id="rodizio" data-anchor="rodizio" className="skin-carvao relative" aria-labelledby="rodizio-title">
      {pinned ? (
        <div ref={pin} className="gutter flex h-[100svh] items-center pt-[calc(var(--label-h)+76px)]">
          <div className="wrap grid h-[min(78svh,820px)] grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-14">
            <div className="flex flex-col">
              <p className="kicker text-ouro">{t.rodizio.kicker}</p>
              <h2 id="rodizio-title" className="display mt-3 text-[clamp(3.2rem,5.4vw,6rem)] text-creme">{t.rodizio.title}</h2>
              <div className="relative mt-auto min-h-[300px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, transform: "translateY(24px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    exit={{ opacity: 0, transform: "translateY(-16px)" }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                  >
                    <p className="kicker text-creme/50">{fill(t.rodizio.stepLabel, { n: active + 1, total: 4 })}</p>
                    <h3 className="display mt-2 text-[clamp(2.4rem,3.6vw,3.8rem)] text-brasa">{steps[active].title}</h3>
                    <p className="lead mt-4 max-w-[34rem] text-creme/90">{steps[active].text}</p>
                    <p className="mt-4 max-w-[34rem] text-creme/65">{steps[active].detail}</p>
                    {active === 3 && <div className="mt-6"><Signal /></div>}
                  </motion.div>
                </AnimatePresence>
              </div>
              <ol className="mt-8 flex gap-2" aria-hidden="true">
                {steps.map((s, i) => (
                  <li key={s.title} className="h-1 flex-1 overflow-hidden rounded bg-creme/15">
                    <motion.span className="block h-full origin-left bg-ouro" animate={{ transform: `scaleX(${i <= active ? 1 : 0})` }} transition={{ duration: 0.5, ease: EASE_OUT }} />
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm text-creme/55">{t.rodizio.note} {t.rodizio.rodizioMeaning}</p>
            </div>
            <div className="relative overflow-hidden rounded-[var(--radius-xl2)]">
              {MEDIA.map((m, i) => (
                <motion.div
                  key={m}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ clipPath: i <= active ? "inset(0% 0% 0% 0% round 36px)" : "inset(100% 0% 0% 0% round 36px)" }}
                  transition={{ duration: 0.9, ease: EASE_IN_OUT }}
                  style={{ zIndex: i }}
                >
                  <motion.div className="h-full w-full" animate={{ transform: i === active ? "scale(1)" : "scale(1.08)" }} transition={{ duration: 1.4, ease: EASE_OUT }}>
                    <Media kind={m} active={i === active} />
                  </motion.div>
                </motion.div>
              ))}
              <p className="absolute bottom-4 left-4 z-10 rounded-full bg-carvao/70 px-3 py-1.5 text-xs text-creme/80 backdrop-blur">{steps[active].image}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="gutter py-24">
          <div className="wrap">
            <p className="kicker text-ouro">{t.rodizio.kicker}</p>
            <h2 id="rodizio-title" className="display mt-3 text-[clamp(3rem,11vw,5rem)] text-creme">{t.rodizio.title}</h2>
            <ol className="mt-12 flex flex-col gap-16">
              {steps.map((s, i) => (
                <Reveal as="li" key={s.title} className="flex flex-col gap-5">
                  <div className="aspect-[4/3] overflow-hidden rounded-[28px]">
                    <Media kind={MEDIA[i]} active />
                  </div>
                  <p className="kicker text-creme/50">{fill(t.rodizio.stepLabel, { n: i + 1, total: 4 })}</p>
                  <h3 className="display text-[2.6rem] text-brasa">{s.title}</h3>
                  <p className="lead text-creme/90">{s.text}</p>
                  <p className="text-creme/65">{s.detail}</p>
                  {i === 3 && <Signal />}
                </Reveal>
              ))}
            </ol>
            <p className={cn("mt-12 text-sm text-creme/55")}>{t.rodizio.note} {t.rodizio.rodizioMeaning}</p>
          </div>
        </div>
      )}
    </section>
  );
}
