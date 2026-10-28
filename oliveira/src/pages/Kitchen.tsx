import { useMemo, useState } from "react";
import { useLocation } from "react-router";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { UI, fill } from "@/i18n";
import { CONTACT, DISHES, TAGESMENUE, dishName, photo, type Dish } from "@/content";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { DishCard, DishDetail } from "@/components/Dishes";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";

type Filter = "pt" | "ch" | "all";
const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** The dishes (no menu or prices on the live site): Portugal / Schweiz / Alle, instant search, details. */
export function Kitchen() {
  const { lang, openBooking } = useSite();
  const reduce = useReducedMotion();
  const location = useLocation();
  const initial = (location.state as { cuisine?: Filter } | null)?.cuisine;
  const [filter, setFilter] = useState<Filter>(initial === "pt" || initial === "ch" ? initial : "all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Dish | null>(null);

  const shown = useMemo(() => {
    const q = fold(query.trim());
    return DISHES.filter((d) => (filter === "all" ? true : d.cuisine === filter)).filter(
      (d) => !q || fold(`${dishName(d, lang)} ${d.desc[lang]}`).includes(q),
    );
  }, [filter, query, lang]);

  const tabs: { key: Filter; label: string }[] = [
    { key: "pt", label: UI.portugal[lang] },
    { key: "ch", label: UI.schweiz[lang] },
    { key: "all", label: UI.all[lang] },
  ];

  return (
    <>
      <section className="charcoal on-dark relative isolate flex min-h-[72svh] items-end overflow-hidden">
        <Photo id="own-06" living priority className="absolute inset-0 -z-10 h-full w-full opacity-85" sizes="100vw" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(31_34_41/0.92),rgb(31_34_41/0.25)_60%,rgb(31_34_41/0.5))]" />
        <div className="gutter w-full pb-16 pt-[calc(var(--header-h)+var(--label-h)+18vh)] md:pb-20">
          <div className="wrap">
            <motion.h1
              className="display text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[0.9]"
              initial={reduce ? false : { opacity: 0, transform: "translateY(24px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
            >
              {UI.navKitchen[lang]}
            </motion.h1>
            <p className="display mt-4 max-w-[34ch] text-[clamp(1.2rem,2.4vw,1.8rem)] italic text-linen/90">{UI.kitchenHero[lang]}</p>
          </div>
        </div>
      </section>

      <div className="linen gutter overflow-x-clip pb-24">
        <div className="wrap">
          <div className="sticky z-30 -mx-4 flex flex-wrap items-center gap-3 bg-linen/92 px-4 py-4 backdrop-blur md:-mx-8 md:px-8" style={{ top: "calc(64px + var(--label-h))" }}>
            <div role="radiogroup" aria-label={UI.filterLabel[lang]} className="relative flex rounded-full bg-linen-deep p-1">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  role="radio"
                  aria-checked={filter === t.key}
                  onClick={() => setFilter(t.key)}
                  className={cn("relative z-10 rounded-full px-4 py-2 text-[15px] font-semibold transition-colors sm:px-5", filter === t.key ? "text-linen" : "text-charcoal/80 hover:text-charcoal")}
                >
                  {filter === t.key && (
                    <motion.span
                      layoutId="kitchen-filter"
                      className={cn("absolute inset-0 -z-10 rounded-full", t.key === "pt" ? "bg-cobalt" : t.key === "ch" ? "bg-[#8a5a12]" : "bg-charcoal")}
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {t.label}
                </button>
              ))}
            </div>
            <label className="relative ml-auto w-full sm:w-72">
              <span className="sr-only">{UI.search[lang]}</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={UI.search[lang]}
                className="h-11 w-full rounded-full border border-charcoal/15 bg-white/70 pl-11 pr-4 text-[16px] text-charcoal outline-none placeholder:text-charcoal/50 focus-visible:border-leaf focus-visible:ring-2 focus-visible:ring-leaf/40"
              />
              <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/50" width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </label>
            <p className="w-full text-sm text-charcoal/70 sm:w-auto" aria-live="polite">{fill(UI.dishCount[lang], { n: shown.length })}</p>
          </div>

          <h2 className="sr-only">{UI.allDishes[lang]}</h2>
          <LayoutGroup>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {shown.map((d, i) => (
                  <DishCard key={d.id} dish={d} index={i} onOpen={setOpen} />
                ))}
              </AnimatePresence>
            </ul>
            <DishDetail dish={open} onClose={() => setOpen(null)} />
          </LayoutGroup>
          {shown.length === 0 && <p className="mt-10 text-lg text-charcoal/70">{UI.noResults[lang]}</p>}

          <Reveal className="mt-24">
            <h2 className="display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold text-charcoal">{UI.tagesmenueTitle[lang]}</h2>
            <ul tabIndex={0} aria-label={UI.tagesmenueTitle[lang]} className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:-mx-8 md:px-8">
              {TAGESMENUE.map((id) => (
                <li key={id} className="w-[72vw] shrink-0 snap-start sm:w-[320px]">
                  <figure>
                    <Photo id={id} className="aspect-square w-full rounded-[20px] shadow-set" sizes="320px" decorative />
                    <figcaption className="mt-3 text-[15px] text-charcoal/85">{photo(id).alt[lang]}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-20 flex flex-col items-start gap-5 rounded-[28px] bg-charcoal p-8 text-linen md:flex-row md:items-center md:justify-between md:p-12">
            <p className="display max-w-[30ch] text-[clamp(1.4rem,2.6vw,2rem)] leading-snug">
              {UI.menuLine[lang]} <a href={CONTACT.phoneHref} className="whitespace-nowrap text-leaf-light underline underline-offset-4">{CONTACT.phone}</a>
            </p>
            <div className="flex flex-wrap gap-3">
              <Magnetic>
                <a href={CONTACT.phoneHref} className="btn btn-ghost on-dark" data-cursor="call">{UI.call[lang]}</a>
              </Magnetic>
              <Magnetic>
                <button type="button" onClick={openBooking} className="btn btn-olive" data-cursor="book">{UI.navReservation[lang]}</button>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
