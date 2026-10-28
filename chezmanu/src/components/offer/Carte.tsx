import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { HTML_LANG, TEXT, UI, fill, type Lang } from "@/i18n";
import { CARTE, CARTE_ITEMS, chf, type CarteItem } from "@/content";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { CUPS, CupDrawing, type CupKind } from "../Illustrations";

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const isCup = (k?: string): k is CupKind => !!k && k in CUPS;

function haystack(it: CarteItem, lang: Lang) {
  const teas = it.teas?.map((t) => `${t.name} ${t.kind[lang]} ${t.kind.fr}`).join(" ") ?? "";
  return fold([it.name[lang], it.liveName, it.desc?.[lang] ?? "", it.desc?.fr ?? "", it.gloss?.[lang] ?? "", teas].join(" "));
}

/** A cup that fills each time it is shown (instantly with reduced motion). */
function PouredCup({ kind, size }: { kind: CupKind; size: number }) {
  const reduce = useReducedMotion();
  const [level, setLevel] = useState(reduce ? 1 : 0);
  useEffect(() => {
    if (reduce) return;
    setLevel(0);
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setLevel(1)));
    return () => cancelAnimationFrame(id);
  }, [kind, reduce]);
  return <CupDrawing kind={kind} fill={level} size={size} />;
}

function Row({ it, lang, open, onToggle, onShow }: { it: CarteItem; lang: Lang; open: boolean; onToggle: () => void; onShow: () => void }) {
  const translated = it.name[lang] !== it.liveName;
  const gloss = it.gloss?.[lang];
  const cup = isCup(it.cup) ? it.cup : null;
  const head = (
    <span className="flex w-full items-baseline gap-3">
      <span className="min-w-0">
        <span className="text-[17px] font-semibold text-chalk md:text-lg">{it.name[lang]}</span>
        {gloss && <span className="ml-2 text-[15px] italic text-chalk/75">{gloss}</span>}
        {translated && (
          <span className="block text-[13px] text-chalk/70" lang="fr">
            {fill(UI.onLiveMenu[lang], { name: it.liveName })}
          </span>
        )}
      </span>
      <span aria-hidden="true" className="leader" />
      <span className="price text-[17px] font-bold text-chalk-gold">{chf(it.price)}</span>
    </span>
  );
  return (
    <>
      {cup ? (
        <button
          type="button"
          aria-expanded={open}
          onClick={onToggle}
          onPointerEnter={onShow}
          onFocus={onShow}
          className="block w-full rounded-lg py-3 text-left transition-colors hover:bg-chalk/[0.04] focus-visible:bg-chalk/[0.06]"
        >
          {head}
          {it.desc && <span className="mt-1 block text-[15px] text-chalk/80">{it.desc[lang]}</span>}
        </button>
      ) : (
        <div className="py-3">
          {head}
          {it.desc && <p className="mt-1 whitespace-pre-line text-[15px] text-chalk/80">{it.desc[lang]}</p>}
          {it.teas && (
            <p className="mt-2 text-[15px] leading-relaxed text-chalk/80">
              {it.teas.map((t, i) => (
                <span key={t.name}>
                  <span className="font-semibold text-chalk">{t.name}</span>
                  {t.kind[lang] && ` (${t.kind[lang]})`}
                  {i < it.teas!.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
          )}
        </div>
      )}
      <AnimatePresence initial={false}>
        {cup && open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-4 pb-4 lg:hidden">
            <span className="rounded-2xl bg-flour p-2">
              <PouredCup kind={cup} size={96} />
            </span>
            <span className="text-sm text-chalk/80">{fill(UI.cupLabel[lang], { name: it.name[lang] })} · {UI.cupIllustration[lang]}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * La carte as a café chalkboard: five tabs with a sliding underline, an instant search across everything
 * (accents ignored), and a little cup that fills to look like the drink you hover, focus or tap.
 */
export function Carte() {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [tab, setTab] = useState(CARTE[0].id);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [shown, setShown] = useState<CarteItem>(CARTE[0].items[0]);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  const results = useMemo(() => {
    const t = fold(q.trim());
    if (!t) return null;
    return CARTE_ITEMS.filter((it) => t.split(/\s+/).every((w) => haystack(it, lang).includes(w)));
  }, [q, lang]);

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const n = CARTE.length;
    const next = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    setTab(CARTE[next].id);
    tabs.current[next]?.focus();
  };

  const list = (items: CarteItem[]) => (
    <ul>
      {items.map((it, i) => (
        <motion.li
          key={it.id}
          className="border-b border-dashed border-chalk/15 last:border-0"
          initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(10px)" }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.3, delay: Math.min(i * 0.035, 0.4) }}
        >
          <Row it={it} lang={lang} open={open === it.id} onToggle={() => setOpen((o) => (o === it.id ? null : it.id))} onShow={() => setShown(it)} />
        </motion.li>
      ))}
    </ul>
  );
  const section = CARTE.find((s) => s.id === tab)!;
  const shownCup = isCup(shown.cup) ? shown.cup : "espresso";

  return (
    <section id="carte" aria-labelledby="carte-title" className="gutter bg-flour py-20 md:py-28">
      <div className="wrap">
        <div className="rounded-[34px] bg-[linear-gradient(135deg,#a8682e,#7a4416)] p-3 shadow-lift md:p-4">
          <div className="board on-dark rounded-[24px] px-5 py-10 md:px-12 md:py-14">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="chalk text-3xl text-chalk-gold md:text-4xl">{TEXT.carteKicker[lang]}</p>
                <h2 id="carte-title" className="display mt-1 text-[clamp(2rem,4.4vw,3.6rem)] leading-tight text-chalk">
                  {TEXT.carteTitle[lang]}
                </h2>
                <p className="mt-3 max-w-[52ch] text-chalk/85">{TEXT.carteLead[lang]}</p>
              </div>
              <div className="w-full max-w-xs">
                <label htmlFor={`${id}-q`} className="chalk block text-2xl text-chalk-gold">
                  {UI.carteSearch[lang]}
                </label>
                <div className="relative mt-1">
                  <input
                    id={`${id}-q`}
                    type="search"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder={UI.carteSearchPh[lang]}
                    lang={HTML_LANG[lang]}
                    className="h-12 w-full rounded-full border-0 bg-chalk/10 px-5 pr-12 text-chalk ring-1 ring-chalk/30 placeholder:text-chalk/55 focus:outline-none focus:ring-2 focus:ring-chalk-gold"
                  />
                  {q && (
                    <button type="button" onClick={() => setQ("")} className="absolute right-1 top-1 grid h-10 w-10 place-items-center rounded-full text-chalk hover:bg-chalk/10">
                      <span aria-hidden="true">×</span>
                      <span className="sr-only">{UI.carteClear[lang]}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_260px]">
              <div>
                {results ? (
                  <div>
                    <p role="status" className="chalk mb-4 text-2xl text-chalk-gold">
                      {results.length === 0 ? UI.carteNone[lang] : results.length === 1 ? UI.carteResult[lang] : fill(UI.carteResults[lang], { n: results.length })}
                    </p>
                    {list(results)}
                  </div>
                ) : (
                  <>
                    <div role="tablist" aria-label={UI.carteTabs[lang]} className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto border-b border-chalk/20 px-1">
                      {CARTE.map((s, i) => (
                        <button
                          key={s.id}
                          ref={(el) => {
                            tabs.current[i] = el;
                          }}
                          role="tab"
                          id={`${id}-tab-${s.id}`}
                          aria-selected={tab === s.id}
                          aria-controls={`${id}-panel`}
                          tabIndex={tab === s.id ? 0 : -1}
                          onClick={() => setTab(s.id)}
                          onKeyDown={(e) => onTabKey(e, i)}
                          className={cn("chalk relative shrink-0 whitespace-nowrap px-4 pb-3 pt-2 text-[26px] transition-colors md:text-3xl", tab === s.id ? "text-chalk" : "text-chalk/60 hover:text-chalk/85")}
                        >
                          {s.title[lang]}
                          {tab === s.id && <motion.span layoutId="carte-underline" className="absolute inset-x-3 -bottom-px h-[3px] rounded-full bg-chalk-gold" transition={{ type: "spring", bounce: 0.2, duration: 0.45 }} />}
                        </button>
                      ))}
                    </div>
                    <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${tab}`} tabIndex={0} className="mt-4 focus-visible:outline-offset-8" key={tab}>
                      {list(section.items)}
                      {tab === "petit-dejeuner" && <p className="chalk mt-3 text-2xl text-chalk-gold">{UI.sameBreakfastPrice[lang]}</p>}
                    </div>
                  </>
                )}
              </div>
              <aside aria-hidden="true" className="hidden lg:block">
                <div className="sticky top-32 rounded-[24px] bg-flour p-5 text-espresso shadow-lift">
                  <PouredCup kind={shownCup} size={220} />
                  <p className="display mt-2 text-center text-xl text-cocoa">{shown.name[lang]}</p>
                  <p className="mt-1 text-center text-xs uppercase tracking-widest text-caramel">{UI.cupIllustration[lang]}</p>
                  <p className="chalk mt-3 text-center text-xl text-caramel">{UI.cupHint[lang]}</p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
