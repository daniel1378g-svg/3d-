import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { HTML_LANG, SIGNATURE, STORY_HEADING, TEXT, UI } from "@/i18n";
import { useSite } from "@/site";
import { asset } from "@/lib/utils";
import { Photo } from "../Photo";
import { SplitFlap } from "../SplitFlap";

const BOARD = ["OLD PULLMANN", "KAFI FROSCH", "OLIVEIRA"];

/** A paragraph whose words light up one by one as it crosses the screen. Fully readable without it. */
function LitText({ text, lang, className }: { text: string; lang?: string; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  useEffect(() => {
    if (reduce) return;
    const words = [...ref.current!.querySelectorAll<HTMLSpanElement>("[data-w]")];
    const paint = (p: number) => words.forEach((w, i) => (w.style.opacity = String(Math.min(1, Math.max(0.3, (p * words.length - i) * 0.6 + 0.3)))));
    paint(scrollYProgress.get());
    return scrollYProgress.on("change", paint);
  }, [reduce, scrollYProgress, text]);
  return (
    <p ref={ref} lang={lang} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} data-w className="transition-opacity duration-150">
          {w}{" "}
        </span>
      ))}
    </p>
  );
}

/**
 * #ueber-uns: a Swiss-railway split-flap board (a nod to the Stationsstrasse and the «Old Pullmann») flips
 * from OLD PULLMANN to KAFI FROSCH to OLIVEIRA as the story scrolls by; the words light up, the signature
 * writes itself and the logo's tree grows out of the "O". Only names and sentences from the live site.
 */
export function Story() {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start 60%", "end 80%"] });
  const [step, setStep] = useState(0);
  useEffect(() => scrollYProgress.on("change", (p) => setStep(p < 0.28 ? 0 : p < 0.62 ? 1 : 2)), [scrollYProgress]);
  const grow = useSpring(useTransform(scrollYProgress, [0.62, 0.9], [0, 1]), { stiffness: 90, damping: 20 });
  const treeClip = useTransform(grow, (g) => `inset(${(1 - g) * 100}% 0% 0% 0%)`);
  const treeScale = useTransform(grow, [0, 1], [0.6, 1]);
  const sig = useRef<HTMLDivElement>(null);
  const { scrollYProgress: sigP } = useScroll({ target: sig, offset: ["start 90%", "start 55%"] });
  const sigClip = useTransform(sigP, (p) => `inset(-20% ${(1 - p) * 100}% -20% 0%)`);
  const photoY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section id="ueber-uns" ref={section} aria-labelledby="story-title" className="linen gutter relative py-24 md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div className="max-lg:contents lg:sticky lg:top-[calc(var(--header-h)+var(--label-h)+24px)] lg:h-fit">
          <p className="kicker text-leaf">{UI.navAbout[lang]}</p>
          <h2 id="story-title" className="sr-only">{UI.storyLabel[lang]}</h2>
          <div className="sticky top-[calc(64px+var(--label-h)+8px)] z-10 -mx-2 mt-4 self-start rounded-xl bg-linen/90 px-2 py-2 backdrop-blur lg:static lg:bg-transparent lg:p-0 lg:backdrop-blur-0">
            <div className="flap-wrap">
              <SplitFlap word={reduce ? "OLIVEIRA" : BOARD[step]} label={UI.storyLabel[lang]} />
            </div>
          </div>
          {reduce && (
            <p className="mt-3 text-sm font-semibold text-charcoal/70" aria-hidden="true">
              OLD PULLMANN → KAFI FROSCH → OLIVEIRA
            </p>
          )}
          <div className="relative mt-10 hidden aspect-square w-[min(100%,360px)] lg:block" aria-hidden="true">
            <motion.img src={asset("brand/tree.webp")} alt="" width={420} height={358} className="absolute inset-x-0 bottom-[28%] mx-auto w-[86%] origin-bottom" style={reduce ? undefined : { clipPath: treeClip, scale: treeScale }} />
            <img src={asset("brand/ring.webp")} alt="" width={256} height={256} className="absolute bottom-0 left-1/2 w-[34%] -translate-x-1/2" />
          </div>
        </div>

        <div className="space-y-12">
          <LitText text={TEXT.name[lang]} lang={HTML_LANG[lang]} className="display text-[clamp(1.5rem,2.6vw,2.2rem)] leading-snug text-charcoal" />
          <motion.div className="relative overflow-hidden rounded-[24px] shadow-lift" style={reduce ? undefined : { y: photoY }}>
            <Photo id="own-01" living className="aspect-[3/2] w-full" sizes="(min-width: 1024px) 600px, 100vw" />
          </motion.div>
          <LitText text={TEXT.bacalhau[lang]} lang={HTML_LANG[lang]} className="text-[19px] leading-relaxed text-charcoal/90" />
          <div ref={sig} className="pt-2">
            <motion.p className="script text-[clamp(2.4rem,5vw,3.6rem)] leading-none text-leaf" style={reduce ? undefined : { clipPath: sigClip }}>
              {SIGNATURE}
            </motion.p>
          </div>
          <div className="grid items-start gap-8 sm:grid-cols-[1fr_0.8fr]">
            <div>
              <h3 lang="pt-PT" className="display text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold italic leading-tight text-charcoal">{STORY_HEADING}</h3>
              <LitText text={TEXT.opening[lang]} lang={HTML_LANG[lang]} className="mt-4 text-[19px] leading-relaxed text-charcoal/90" />
            </div>
            <TiltFrame>
              <Photo id="own-02" className="aspect-square w-full" sizes="(min-width: 640px) 300px, 80vw" />
            </TiltFrame>
          </div>
          <div className="overflow-hidden rounded-[24px] shadow-lift">
            <Photo id="own-03" living className="aspect-[4/3] w-full" sizes="(min-width: 1024px) 600px, 100vw" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** A framed print that leans slightly towards the pointer. */
function TiltFrame({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [t, setT] = useState({ x: 0, y: 0 });
  return (
    <div
      className="rotate-[2deg] rounded-[6px] bg-white p-3 pb-10 shadow-lift transition-transform duration-300 ease-out"
      style={reduce ? undefined : { transform: `perspective(800px) rotate(2deg) rotateX(${t.y}deg) rotateY(${t.x}deg)` }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        setT({ x: ((e.clientX - r.left) / r.width - 0.5) * 12, y: -((e.clientY - r.top) / r.height - 0.5) * 10 });
      }}
      onPointerLeave={() => setT({ x: 0, y: 0 })}
    >
      {children}
    </div>
  );
}
