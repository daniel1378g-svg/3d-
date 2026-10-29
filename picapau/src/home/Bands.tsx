// Section 4, the logo strip (gold); section 6, the statement band (gold); section 8, L'Âme du Portugal
// (francesinha red) with its stickers and the cork coaster.
import { lazy, Suspense, useLayoutEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { CLASSIC_NAMES, copy } from "@/copy";
import { LOGO } from "@/content/photos";
import { useSite } from "@/site";
import { gsap } from "@/lib/gsap";
import { EASE_OUT } from "@/lib/utils";
import { Marquee } from "@/components/Marquee";
import { AzulejoTile, Cork, Francesinha, PortGlass, Star, Tram, Woodpecker } from "@/components/illustrations";
import { MaskPhoto, SplitText } from "@/components/ui";
import { Flyers } from "./Flyers";

const Coaster = lazy(() => import("./Coaster").then((m) => ({ default: m.Coaster })));

export function LogoStrip() {
  const { lang } = useSite();
  const t = copy(lang);
  const [fr, alentejana, bacalhau, polvo] = CLASSIC_NAMES[lang];
  const words = [t.tagline, fr, bacalhau, alentejana, polvo, t.city.replace(/^\d+\s/, "")];
  return (
    <section className="tone-dourado relative z-[2] overflow-hidden py-5" aria-label={words.join(" · ")}>
      <Marquee speed={55} className="py-1" pauseClassName="bg-noite text-branco">
        <span className="flex items-center gap-[clamp(18px,2.4vw,36px)] pr-[clamp(18px,2.4vw,36px)] font-display text-[clamp(40px,6.4vw,104px)] font-bold uppercase leading-none whitespace-nowrap text-noite">
          <img src={LOGO.src(160)} alt="" width="96" height="96" className="h-[1em] w-auto" />
          {words.map((w, i) => (
            <span key={i} className="flex items-center gap-[clamp(18px,2.4vw,36px)]">
              {w}
              <Star className="h-[0.42em] w-[0.42em] text-azulejo" />
            </span>
          ))}
        </span>
      </Marquee>
    </section>
  );
}

/** The presentation's strongest sentence, lighting up word by word as you scroll. */
export function Statement() {
  const { lang } = useSite();
  const t = copy(lang);
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const bird = useRef<HTMLDivElement>(null);
  const birdSeen = useInView(bird, { once: true, amount: 0.6 });

  useLayoutEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".st-word",
        { opacity: 0.25 },
        { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: ".st-text", start: "top 78%", end: "bottom 42%", scrub: true } },
      );
    }, section);
    return () => ctx.revert();
  }, [reduce, lang]);

  return (
    <section ref={section} className="tone-dourado relative z-[2] overflow-hidden py-[clamp(80px,12vw,180px)]" aria-label={t.badges[1]}>
      <Flyers
        items={[
          { cutout: "bacalhau-a-braga", left: "72%", top: "-6%", width: "clamp(140px, 15vw, 250px)", depth: 0.4, rotate: [10, -6], desktopOnly: true },
          { cutout: "salgados-presunto", left: "-5%", top: "78%", width: "clamp(120px, 13vw, 220px)", depth: 0.2, rotate: [-10, 6] },
        ]}
      />
      <div className="container relative grid items-center gap-[clamp(40px,6vw,96px)] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.8fr)]">
        <div className="grid gap-8">
          <p className="eyebrow text-vinho">{t.badges.join(" · ")}</p>
          <p className="st-text display text-vinho" style={{ fontSize: "clamp(40px, 6vw, 112px)", lineHeight: 0.92 }}>
            {t.story[0].split(" ").map((w, i) => (
              <span key={i} className="st-word inline-block" style={{ marginRight: "0.22em" }}>
                {w}
              </span>
            ))}
          </p>
        </div>
        <div className="relative mx-auto w-[min(80vw,420px)]">
          <MaskPhoto name="pica-pau-companhia" className="arch aspect-[3/4] w-full" from="bottom" sizes="(max-width: 1023px) 80vw, 30vw" />
          <motion.div
            ref={bird}
            className="absolute -left-[18%] bottom-[8%] w-[46%]"
            initial={false}
            animate={birdSeen && !reduce ? { y: [40, 0], opacity: [0, 1] } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            <WoodpeckerKnock play={birdSeen && !reduce} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** The woodpecker knocks: its head taps the trunk (once when it comes into view, and on hover or tap). */
export function WoodpeckerKnock({ play, className = "w-full" }: { play: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const knock = () => {
    if (reduce) return;
    const head = ref.current?.querySelector<SVGGElement>(".wp-head");
    head?.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(14deg)" }, { transform: "rotate(0deg)" }, { transform: "rotate(14deg)" }, { transform: "rotate(0deg)" }, { transform: "rotate(14deg)" }, { transform: "rotate(0deg)" }],
      { duration: 900, easing: "ease-in-out" },
    );
  };
  useLayoutEffect(() => {
    if (play) {
      const id = setTimeout(knock, 500);
      return () => clearTimeout(id);
    }
  }, [play]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div ref={ref} className={className} onPointerEnter={knock} onPointerDown={knock}>
      <Woodpecker className="h-auto w-full" />
    </div>
  );
}

const STICKERS = [
  { key: "bird", el: <WoodpeckerKnock play={false} />, pos: "left-[3%] top-[8%] w-[clamp(110px,14vw,220px)] max-md:-top-[150px] max-md:left-[2%]", r: -8 },
  { key: "tram", el: <Tram className="w-full" />, pos: "right-[4%] top-[6%] w-[clamp(130px,16vw,250px)] max-md:-top-[120px] max-md:right-[2%]", r: 6 },
  { key: "port", el: <PortGlass className="w-full" />, pos: "left-[8%] bottom-[10%] w-[clamp(60px,7vw,110px)]", r: 10 },
  { key: "cork", el: <Cork className="w-full" />, pos: "right-[22%] bottom-[6%] w-[clamp(60px,7vw,110px)]", r: -12 },
  { key: "tile", el: <AzulejoTile className="w-full" />, pos: "left-[24%] bottom-[4%] w-[clamp(70px,8vw,120px)] max-md:hidden", r: 8 },
  { key: "fr", el: <Francesinha className="w-full" />, pos: "right-[3%] top-[42%] w-[clamp(110px,13vw,200px)] max-md:hidden", r: -6 },
];

export function Soul() {
  const { lang } = useSite();
  const t = copy(lang);
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const seen = useInView(box, { once: true, amount: 0.25 });
  const title = t.tagline.toUpperCase().replace(/^(\S+\s\S+)\s/, "$1\n") + ".";
  return (
    <section className="tone-francesinha relative z-[2] overflow-hidden py-[clamp(90px,12vw,170px)] max-md:pt-[190px]" aria-labelledby="soul-title">
      <div ref={box} className="container relative grid justify-items-center gap-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {STICKERS.map((s, i) => (
            <motion.div
              key={s.key}
              className={`absolute ${s.pos}`}
              initial={reduce ? false : { scale: 0, rotate: s.r - 20 }}
              animate={seen || reduce ? { scale: 1, rotate: s.r } : undefined}
              transition={{ type: "spring", stiffness: 260, damping: 14, delay: reduce ? 0 : 0.2 + i * 0.09 }}
            >
              <div className="pointer-events-auto" style={reduce ? undefined : { animation: `wobble ${4 + (i % 3)}s ease-in-out ${i * 0.4}s infinite`, ["--r" as string]: "0deg" }}>
                {s.el}
              </div>
            </motion.div>
          ))}
        </div>
        <SplitText as="h2" id="soul-title" by="lines" text={title} stagger={0.12} className="display relative z-[1] text-center text-branco" style={{ fontSize: "var(--fs-mega)", lineHeight: 0.86 }} />
        <div className="relative z-[1] grid justify-items-center gap-3">
          <Suspense fallback={<div className="h-[min(70vw,340px)] w-[min(70vw,340px)]" />}>
            <Coaster />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
