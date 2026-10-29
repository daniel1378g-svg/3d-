// Section 3: the four classics the presentation names, pinned like HOY!'s burrito scene. Left: "La carte",
// the dish name as a giant title, its description and price from the live carte. Right: an arch-topped frame
// where the dishes take turns, each wiping in, with a counter. Cut-outs drift behind at three depths. The
// Francesinha and the Carne de Porco have no photo yet: a drawing and a labelled photo slot stand in, and on
// the Francesinha a drawn sauce drips over the frame on hover or tap.
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CLASSIC_NAMES, copy } from "@/copy";
import { findItem, type Item } from "@/content/carte";
import { photo, photoSrc, photoSrcSet } from "@/content/photos";
import { useSite } from "@/site";
import { gsap } from "@/lib/gsap";
import { cn, EASE_OUT } from "@/lib/utils";
import { Alentejana, Francesinha, FrancesinhaDrip } from "@/components/illustrations";
import { Flyers } from "./Flyers";
import { useNear } from "@/lib/useNear";

type Classic = { items: Item[]; photo?: string; draw?: "francesinha" | "alentejana" };
const CLASSICS: Classic[] = [
  { items: [findItem("Francesinha", "viandes")], draw: "francesinha" },
  { items: [findItem("Carne de Porco à Alentejana", "viandes")], draw: "alentejana" },
  { items: [findItem("Bacalhau à Braga", "poissons"), findItem("Bacalhau à Lagareiro", "poissons")], photo: "bacalhau-a-braga" },
  { items: [findItem("Polvo à Lagareiro", "poissons")], photo: "polvo-a-lagareiro" },
];

function DishCopy({ c, name, small = false }: { c: Classic; name: string; small?: boolean }) {
  const { lang } = useSite();
  return (
    <>
      <h3 className={cn("display text-branco", small ? "fs-xl" : "fs-xxl")}>
        {name}
      </h3>
      <ul className="m-0 grid list-none gap-5 p-0">
        {c.items.map((item) => (
          <li key={item.id} className="grid gap-2">
            {c.items.length > 1 && <p className="font-display text-2xl font-semibold uppercase tracking-[0.04em] text-dourado">{item.name}</p>}
            <p className="max-w-[46ch] text-branco/85">{item.desc![lang]}</p>
            <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-display text-4xl font-bold text-dourado tnum">{item.price}</span>
              {item.note && <span className="meta text-[13px] text-azulejo-claro">{item.note[lang]}</span>}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

function FrameLayer({ c, name, index, load = true }: { c: Classic; name: string; index: number; load?: boolean }) {
  const { lang } = useSite();
  const t = copy(lang);
  const [drip, setDrip] = useState(false);
  if (c.photo) {
    const p = photo(c.photo);
    return (
      <div className="classic-layer" data-i={index} style={{ backgroundColor: p.tone }}>
        {load && <img src={photoSrc(p.name)} srcSet={photoSrcSet(p)} sizes="(max-width: 1023px) 80vw, 36vw" width={p.w} height={p.h} alt={p.alt[lang]} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />}
        <span className="tag absolute bottom-5 left-5">{c.items[0].name}</span>
      </div>
    );
  }
  const isFr = c.draw === "francesinha";
  return (
    <div
      className={cn("classic-layer grid place-items-center", isFr ? "bg-dourado" : "bg-nata")}
      data-i={index}
      onPointerEnter={() => isFr && setDrip(true)}
      onPointerLeave={() => isFr && setDrip(false)}
      onClick={() => isFr && setDrip((d) => !d)}
    >
      {isFr && (
        <motion.span className="pointer-events-none absolute inset-x-0 top-0 z-10 block h-[34%] origin-top" initial={false} animate={{ scaleY: drip ? 1 : 0.16 }} transition={{ duration: drip ? 1.1 : 0.6, ease: EASE_OUT }}>
          <FrancesinhaDrip className="h-full w-full" />
        </motion.span>
      )}
      {isFr ? <Francesinha className="w-[78%] drop-shadow-[0_24px_30px_rgba(90,22,38,0.35)]" /> : <Alentejana className="w-[82%]" />}
      <span className="photo-slot">{t.ui.photoOf(name)}</span>
    </div>
  );
}

export function Classics() {
  const { lang } = useSite();
  const t = copy(lang);
  const names = CLASSIC_NAMES[lang];
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const near = useNear(section);

  useLayoutEffect(() => {
    if (reduce) return;
    const sec = section.current!;
    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>(".classic-copy");
      const layers = gsap.utils.toArray<HTMLElement>(".classic-layer");
      gsap.set(blocks.slice(1), { opacity: 0, y: 50 }); // opacity only: every dish stays readable to screen readers
      gsap.set(layers.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            const i = Math.min(3, Math.floor(self.progress * 4 + 0.06));
            if (counter.current) counter.current.textContent = `0${i + 1} / 04`;
          },
        },
      });
      for (let i = 1; i < 4; i++) {
        const at = i * 0.25 - 0.06;
        tl.to(blocks[i - 1], { opacity: 0, y: -40, duration: 0.06 }, at)
          .to(blocks[i], { opacity: 1, y: 0, duration: 0.08 }, at + 0.05)
          .to(layers[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.12 }, at)
          .to(layers[i - 1], { scale: 0.94, duration: 0.12 }, at);
      }
      tl.to({}, { duration: 0.05 }, 0.95);
    }, sec);
    return () => ctx.revert();
  }, [reduce, lang]);

  if (reduce) {
    return (
      <section className="tone-noite sheet tex-cork relative py-24" aria-labelledby="classics-title">
        <div className="container grid gap-10">
          <h2 id="classics-title" className="eyebrow text-dourado">
            {t.menu.kicker}
          </h2>
          <ul className="m-0 grid list-none gap-8 p-0 md:grid-cols-2">
            {CLASSICS.map((c, i) => (
              <li key={i} className="grid gap-5 rounded-3xl bg-white/[0.05] p-6">
                <div className="arch relative aspect-[4/5]">
                  <FrameLayer c={c} name={names[i]} index={i} />
                </div>
                <DishCopy c={c} name={names[i]} small />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section ref={section} className="classics tone-noite sheet sheet-over tex-cork" aria-labelledby="classics-title">
      <div className="classics-stage">
        <Flyers
          className="z-0"
          items={[
            { cutout: "salgados-presunto", left: "47%", top: "84%", width: "clamp(110px, 12vw, 200px)", depth: 0.2, rotate: [-8, 6], desktopOnly: true },
            { cutout: "polvo-a-lagareiro", left: "-4%", top: "8%", width: "clamp(150px, 16vw, 260px)", depth: 0.4, rotate: [6, -8] },
            { cutout: "pica-pau-companhia", left: "86%", top: "70%", width: "clamp(180px, 20vw, 330px)", depth: 0.6, rotate: [-6, 8] },
          ]}
        />
        <div className="container classics-grid">
          <div className="classics-copy">
            <h2 id="classics-title" className="eyebrow text-dourado">
              {t.menu.kicker}
            </h2>
            <div className="grid">
              {CLASSICS.map((c, i) => (
                <div key={i} className="classic-copy">
                  <DishCopy c={c} name={names[i]} />
                </div>
              ))}
            </div>
            <span ref={counter} className="eyebrow tnum text-azulejo-claro" aria-hidden="true">
              01 / 04
            </span>
          </div>
          <div className="classics-frame">
            {CLASSICS.map((c, i) => (
              <FrameLayer key={i} c={c} name={names[i]} index={i} load={near} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
