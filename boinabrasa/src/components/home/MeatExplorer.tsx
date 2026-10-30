// Meat explorer: the ten skewers as a big list; choosing one brings its picture in through a window (or its
// illustrated card where the site has no photo), the description and its tags; the other names step back.
import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { fill } from "@/i18n";
import { useSite } from "@/site";
import { CUTS, type Cut } from "@/content/meats";
import { cn } from "@/lib/utils";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";
import { BULL_OUTLINE, BULL_VIEWBOX } from "@/brand/bull";
import { Img } from "../Img";
import { IconArrow, IconLeaf } from "../icons";

function KindIcon({ kind, className }: { kind: Cut["kind"]; className?: string }) {
  if (kind === "rind") return <svg viewBox={BULL_VIEWBOX} className={className} aria-hidden="true"><path d={BULL_OUTLINE} fill="currentColor" /></svg>;
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "schwein")
    return (
      <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
        <circle cx="60" cy="66" r="34" {...common} />
        <path d="M33 44 L27 20 L50 35" {...common} />
        <path d="M87 44 L93 20 L70 35" {...common} />
        <ellipse cx="60" cy="76" rx="16" ry="11" {...common} />
        <circle cx="54" cy="76" r="2.6" fill="currentColor" />
        <circle cx="66" cy="76" r="2.6" fill="currentColor" />
        <circle cx="46" cy="57" r="3" fill="currentColor" />
        <circle cx="74" cy="57" r="3" fill="currentColor" />
      </svg>
    );
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <circle cx="56" cy="68" r="30" {...common} />
      <path d="M40 42 q2-16 12-9 q5-14 13-2 q10-9 11 9" {...common} />
      <path d="M85 62 L102 69 L85 75" {...common} />
      <path d="M83 80 q8 10 1 17 q-7-6 -1-17z" {...common} />
      <circle cx="68" cy="60" r="3.2" fill="currentColor" />
    </svg>
  );
}

export function MeatExplorer({ compact = false }: { compact?: boolean }) {
  const { t, go, href, reduce } = useSite();
  const [sel, setSel] = useState(0);
  const list = useRef<HTMLUListElement>(null);
  const cut = CUTS[sel];
  const text = t.meats.cuts[cut.id];
  const kindLabel = t.meats.kinds[cut.kind];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!d) return;
    e.preventDefault();
    const n = (i + d + CUTS.length) % CUTS.length;
    setSel(n);
    list.current?.querySelectorAll<HTMLButtonElement>("button[data-cut]")[n]?.focus();
  };

  return (
    <section id="fleisch" data-anchor="fleisch" className="skin-creme relative overflow-hidden py-24 md:py-32" aria-labelledby="meats-title">
      <div className="gutter">
        <div className="wrap">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="kicker text-vinho-2" data-lang-stagger>{t.meats.kicker}</p>
              <h2 id="meats-title" className="display mt-3 max-w-[16ch] text-[clamp(3rem,7vw,7rem)] text-vinho">{t.meats.title}</h2>
            </div>
            {!compact && (
              <a href={href("spiesse")} onClick={(e) => { e.preventDefault(); go("spiesse"); }} className="pill pill-dark self-start md:self-end">
                {t.cta.allSkewers} <IconArrow size={17} className="arrow" />
              </a>
            )}
          </div>
          <p className="lead measure mt-6 text-tinta/80">{t.meats.lead}</p>

          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
            <ul ref={list} className="flex snap-x gap-2 overflow-x-auto pb-2 no-scrollbar lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0" aria-label={t.meats.listLabel}>
              {CUTS.map((c, i) => {
                const on = i === sel;
                return (
                  <li key={c.id} className="shrink-0 snap-start lg:border-b lg:border-tinta/12">
                    <button
                      type="button"
                      data-cut
                      aria-pressed={on}
                      tabIndex={on ? 0 : -1}
                      onKeyDown={(e) => onKey(e, i)}
                      onClick={() => setSel(i)}
                      className={cn(
                        "group flex w-full items-baseline gap-4 rounded-full px-4 py-2.5 text-left transition-[opacity,filter,background-color,color] duration-300 lg:rounded-none lg:px-0 lg:py-3",
                        on ? "bg-vinho text-creme lg:bg-transparent lg:text-vinho" : "bg-tinta/5 text-tinta lg:bg-transparent lg:text-tinta/[0.62] lg:hover:text-tinta",
                      )}
                    >
                      <span className="kicker hidden w-8 text-[0.68rem] text-tinta/75 lg:inline">{String(i + 1).padStart(2, "0")}</span>
                      <span className="display whitespace-nowrap text-[1.15rem] lg:text-[clamp(2rem,3.4vw,3.4rem)]">{c.name}</span>
                      <span className="ml-auto hidden text-sm text-tinta/75 xl:inline">{t.meats.cuts[c.id].sub}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="lg:sticky lg:top-28 lg:self-start" aria-live="polite">
              <div className="relative aspect-[4/3.1] overflow-hidden rounded-[var(--radius-xl2)] bg-carvao">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div
                    key={cut.id}
                    className="absolute inset-0"
                    initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" }}
                    animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
                    exit={reduce ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: reduce ? 0.2 : 0.75, ease: EASE_IN_OUT }}
                  >
                    {cut.image ? (
                      <motion.div className={cn("h-full w-full", cut.fit === "contain" && "bg-[radial-gradient(circle_at_50%_55%,#4a2a18,#120e0c_70%)] p-8")} initial={reduce ? false : { transform: "scale(1.08)" }} animate={{ transform: "scale(1)" }} transition={{ duration: 1.2, ease: EASE_OUT }}>
                        <Img id={cut.image} fit={cut.fit ?? "cover"} sizes="(min-width: 1024px) 50vw, 100vw" className="h-full w-full" />
                      </motion.div>
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-[radial-gradient(120%_90%_at_50%_30%,#4d0f1b_0%,#1c1613_70%)] p-8 text-center">
                        <div className="relative">
                          <KindIcon kind={cut.kind} className="h-[clamp(90px,16vw,170px)] w-auto text-brasa drop-shadow-[0_0_24px_rgba(242,106,46,0.45)]" />
                          {cut.garlic && <span className="absolute -right-4 -top-2 rounded-full bg-creme px-2.5 py-1 font-display text-[0.7rem] font-bold uppercase tracking-wider text-vinho">{t.meats.garlic}</span>}
                        </div>
                        <p className="display text-[clamp(2.2rem,5vw,4.2rem)] text-creme">{cut.name}</p>
                        <p className="max-w-[28ch] text-xs text-creme/70">{t.meats.noPhoto}</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
                <div className="pointer-events-none absolute left-4 top-4 flex gap-2">
                  <span className="rounded-full bg-carvao/75 px-3 py-1.5 font-display text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ouro backdrop-blur">{kindLabel}</span>
                  {cut.garlic && cut.image && <span className="rounded-full bg-creme px-3 py-1.5 font-display text-[0.72rem] font-bold uppercase tracking-[0.14em] text-vinho">{t.meats.garlic}</span>}
                </div>
                <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-carvao/75 px-3 py-1.5 font-display text-[0.72rem] font-bold text-creme/80 backdrop-blur tabular">
                  {fill(t.meats.of, { n: sel + 1, total: CUTS.length })}
                </span>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={cut.id}
                  className="mt-6"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(12px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)" }}
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                >
                  <h3 className="display text-[clamp(2.4rem,4vw,3.6rem)] text-vinho">{cut.name}</h3>
                  <p className="kicker mt-1 text-tinta/75">{text.sub}</p>
                  <p className="lead mt-4 max-w-[38rem] text-tinta/85">{text.text}</p>
                  {cut.article && (
                    <a href={href("wissen", { article: cut.article })} onClick={(e) => { e.preventDefault(); go("wissen", { article: cut.article }); }} className="pill pill-ghost mt-5 text-vinho">
                      {t.cta.learnMore} <IconArrow size={17} className="arrow" />
                    </a>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-[1.3fr_1fr]">
            <div className="rounded-[var(--radius-card)] bg-creme-2 p-7">
              <p className="kicker text-vinho-2">{t.meats.wishTitle}</p>
              {t.meats.wishText.map((p) => <p key={p} className="mt-3 text-tinta/80">{p}</p>)}
            </div>
            <div className="rounded-[var(--radius-card)] bg-mato-2 p-7 text-creme">
              <p className="kicker flex items-center gap-2 text-[#9fd8b6]"><IconLeaf size={16} />{t.meats.vegiTitle}</p>
              <p className="mt-3 text-creme/85">{t.meats.vegiText}</p>
              <ul className="mt-4 flex flex-wrap gap-2">{t.meats.vegiItems.map((v) => <li key={v} className="rounded-full bg-creme/10 px-3 py-1.5 text-sm">{v}</li>)}</ul>
            </div>
          </div>
          <p className="mt-6 text-sm text-tinta/75">{t.meats.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
