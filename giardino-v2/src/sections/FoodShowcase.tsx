// "From our kitchen": a dark sheet with a broad curved top rises over the hero. On desktop it holds the screen for
// about four viewport heights while four chapters take turns – Pizza, Pasta, Risotto, Desserts: each next photograph
// wipes upward inside the arch and settles from 1.18 to 1, the copy fades and rises 40 px in (and 30 px up out)
// over .45 s, with a 01 / 04 counter. Drawn ingredients drift behind. Shorter on phones; four static cards with
// reduced motion.
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { UI, type L, type Lang } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/copy";
import { MENUS } from "@/content/business";
import { useGsap } from "@/lib/useGsap";
import { useIsDesktop, useReduced } from "@/lib/useMedia";
import { cn } from "@/lib/utils";
import { Photo } from "@/components/Photo";
import { PillLink } from "@/components/ui/Pill";
import { IconArrow, IconFile } from "@/components/icons";
import { Cutout } from "@/components/Illustrations";

type Chapter = { key: string; name: L; line: L; photo: string; menu: "food" | "desserts" };
export const CHAPTERS: Chapter[] = [
  { key: "pizza", name: TX.pizza, line: TX.pizzaLine, photo: "pizza-rocket", menu: "food" },
  { key: "pasta", name: TX.pasta, line: TX.pastaLine, photo: "dish-prawns", menu: "food" },
  { key: "risotto", name: TX.risotto, line: TX.risottoLine, photo: "dish-chicken-risotto", menu: "food" },
  { key: "desserts", name: TX.desserts, line: TX.dessertsLine, photo: "dessert-panna-cotta", menu: "desserts" },
];

function MenuPdf({ id, lang }: { id: "food" | "desserts"; lang: Lang }) {
  const m = MENUS.find((x) => x.id === id)!;
  return (
    <a href={m.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 font-display text-[15px] font-semibold uppercase tracking-[0.12em] text-gold">
      <IconFile size={18} />
      <span className="link">
        {TX.onTheMenu[lang]}: {m.title[lang]}
      </span>
      <span className="text-[13px] tracking-[0.1em] text-cream/75">· PDF · {m.mb.toLocaleString(lang)} MB</span>
      <span className="sr-only"> ({UI.newTab[lang]})</span>
    </a>
  );
}

function Copy({ chapter, lang, i, withMenu = true }: { chapter: Chapter; lang: Lang; i: number; withMenu?: boolean }) {
  return (
    <div>
      <p className="eyebrow text-gold">
        {TX.kitchenTitle[lang]} <span className="text-cream">· 0{i + 1} / 04</span>
      </p>
      <h3 className="mt-4 font-display text-[clamp(56px,7vw,132px)] font-extrabold uppercase leading-[0.86]">{chapter.name[lang]}</h3>
      <p className="mt-6 max-w-[540px] text-[clamp(17px,1.25vw,21px)] leading-relaxed text-cream/90">{chapter.line[lang]}</p>
      {withMenu && <MenuPdf id={chapter.menu} lang={lang} />}
    </div>
  );
}

export function FoodShowcase({ standalone = false }: { standalone?: boolean }) {
  const { lang, href, go } = useSite();
  const desktop = useIsDesktop();
  const reduce = useReduced();
  const track = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGsap(
    (gsap) => {
      if (!track.current) return;
      const vh = window.innerHeight;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: track.current,
          start: "top top",
          end: `+=${(desktop ? 3 : 2.2) * vh}`,
          scrub: 0.5,
          onUpdate: (self) => setActive(Math.min(3, Math.floor(self.progress * 4 + 0.05))),
        },
      });
      for (let i = 1; i < 4; i++) tl.fromTo(`.fs-frame-${i}`, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.12, ease: "power2.inOut" }, i / 4 - 0.07);
      for (let i = 1; i < 4; i++) tl.fromTo(`.fs-frame-${i} img`, { scale: 1.18 }, { scale: 1, duration: 0.2 }, i / 4 - 0.07);
      tl.fromTo(".fs-depth-1", { yPercent: 40, rotate: -8 }, { yPercent: -70, rotate: 10, duration: 1 }, 0)
        .to({}, { duration: 0.04 });
    },
    stage,
    [reduce, desktop],
    !reduce,
  );

  const more = (
    <PillLink
      variant="ghost"
      href={href("menu")}
      onClick={(e) => {
        e.preventDefault();
        go("menu");
      }}
      iconRight={<IconArrow size={18} />}
      className="text-white"
    >
      {UI.exploreMenu[lang]}
    </PillLink>
  );

  if (reduce) {
    return (
      <section id="kitchen" data-anchor data-nav="kitchen" className={cn("relative z-10 bg-ink pb-24 text-white", standalone ? "pt-32" : "sheet")} aria-labelledby="kitchen-title">
        <div className="container-x">
          <h2 id="kitchen-title" className="fs-xxl text-cream">
            {TX.kitchenTitle[lang]}
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {CHAPTERS.map((d, i) => (
              <article key={d.key} className="overflow-hidden rounded-[24px] bg-white/5">
                <div className="arch aspect-[4/3]">
                  <Photo id={d.photo} sizes="(min-width: 768px) 45vw, 92vw" className="block h-full w-full" />
                </div>
                <div className="p-6">
                  <Copy chapter={d} lang={lang} i={i} />
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10">{!standalone && more}</div>
        </div>
      </section>
    );
  }

  const d = CHAPTERS[active];
  return (
    <section
      id="kitchen"
      data-anchor
      data-nav="kitchen"
      ref={track}
      className={cn("relative z-10 text-white", !standalone && "-mt-[100svh]")}
      style={{ height: desktop ? "400svh" : "320svh" }}
      aria-labelledby="kitchen-title"
    >
      <div className={cn("absolute inset-0 overflow-hidden bg-ink", !standalone && "rounded-t-[50%_22vh] shadow-[0_-40px_80px_-40px_rgba(27,27,27,0.8)]")} />
      <div ref={stage} className="tex-contour sticky top-0 h-[100svh] overflow-hidden">
        <h2 id="kitchen-title" className="sr-only">
          {TX.kitchenTitle[lang]}
        </h2>
        <ol className="sr-only">
          {CHAPTERS.map((c) => (
            <li key={c.key}>
              {c.name[lang]}: {c.line[lang]}
            </li>
          ))}
        </ol>
        {/* ingredients and a dish cut out of the restaurant's photographs, at three depths */}
        <Cutout name="pesto" className="fs-depth-1 pointer-events-none absolute left-[34%] top-[60%] w-[min(360px,30vw)] opacity-25 blur-[4px]" />

        <div className={cn("container-x relative grid h-full items-center gap-6", desktop ? "grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]" : "grid-rows-[auto_1fr] content-start pt-[calc(var(--band-h)+96px)]")}>
          <div className={desktop ? "" : "min-h-[40svh]"}>
            <div aria-hidden="true">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={active} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                  <Copy chapter={d} lang={lang} i={active} withMenu={false} />
                </motion.div>
              </AnimatePresence>
            </div>
            <MenuPdf id={d.menu} lang={lang} />
            <div className={desktop ? "mt-8" : "mt-3"}>{more}</div>
          </div>
          <div className={cn("relative mx-auto w-full", desktop ? "max-w-[520px]" : "max-w-[340px] pb-6")}>
            <div className={cn("arch relative w-full shadow-[0_40px_80px_-40px_rgba(0,0,0,0.75)]", desktop ? "aspect-[4/5] max-h-[72svh]" : "aspect-[4/5] max-h-[40svh]")}>
              {CHAPTERS.map((x, i) => (
                <div key={x.key} className={`fs-frame-${i} absolute inset-0 overflow-hidden`} style={i ? { clipPath: "inset(100% 0% 0% 0%)" } : undefined}>
                  <Photo id={x.photo} sizes="(min-width: 1024px) 520px, 340px" className="block h-full w-full" />
                </div>
              ))}
            </div>
            <p aria-hidden="true" className="mt-4 text-center font-display text-sm font-semibold tracking-[0.2em] text-cream">
              0{active + 1} / 04 · {d.name[lang].toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
