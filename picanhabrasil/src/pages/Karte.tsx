// The whole menu with every price: a sticky category bar that follows the scroll, a search across names and
// descriptions in the current language and Portuguese, the menu's own section notes, and the source of the prices.
import { useEffect, useMemo, useRef, useState } from "react";
import { fill } from "@/i18n";
import { useSite } from "@/site";
import { MENU, chf, dishName, type Dish } from "@/content/menu";
import { cn } from "@/lib/utils";
import { scrollTo } from "@/lib/scroll";
import { PageHero } from "@/components/PageHero";
import { Img } from "@/components/Img";
import { IconArrow } from "@/components/icons";

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function DishRow({ d }: { d: Dish }) {
  const { lang } = useSite();
  const name = dishName(d, lang);
  const desc = d.desc?.[lang];
  const single = d.variants.length === 1;
  return (
    <li className="border-b border-tinta/12 py-5">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-[1.3rem] font-bold leading-tight text-tinta" style={{ fontStretch: "86%" }} lang={d.nameI18n ? undefined : "pt-BR"}>
          {name}
          {d.nameI18n && name !== d.name && <span className="ml-2 text-[0.85rem] font-normal text-tinta/75" lang="pt-BR">{d.name}</span>}
        </h3>
        {single && <p className="shrink-0 font-display text-[1.25rem] font-bold tabular text-vinho">{chf(d.variants[0].cents)}</p>}
      </div>
      {desc && <p className="mt-1 text-[0.95rem] text-tinta/70">{desc}{single && d.variants[0].label ? ` · ${d.variants[0].label[lang]}` : ""}</p>}
      {!desc && single && d.variants[0].label && <p className="mt-1 text-[0.95rem] text-tinta/70">{d.variants[0].label[lang]}</p>}
      {!single && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {d.variants.map((v, i) => (
            <li key={i} className="inline-flex items-baseline gap-2 rounded-full bg-tinta/[0.06] px-3 py-1.5 text-[0.9rem] text-tinta">
              <span>{v.label?.[lang]}</span>
              <span className="font-display font-bold tabular text-vinho">{chf(v.cents)}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function Karte() {
  const { t, lang, openBooking } = useSite();
  const k = t.karte;
  const [q, setQ] = useState("");
  const [active, setActive] = useState(MENU[0].id);
  const bar = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const n = norm(q.trim());
    if (!n) return MENU;
    return MENU.map((s) => ({
      ...s,
      items: s.items.filter((d) => norm([d.name, d.nameI18n?.[lang], d.desc?.[lang], d.desc?.pt, ...d.variants.map((v) => v.label?.[lang] ?? "")].join(" ")).includes(n)),
    })).filter((s) => s.items.length);
  }, [q, lang]);
  const hits = filtered.reduce((a, s) => a + s.items.length, 0);

  // which category is on screen
  useEffect(() => {
    const els = MENU.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
    }, { rootMargin: "-30% 0px -60% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [filtered]);
  useEffect(() => {
    bar.current?.querySelector<HTMLElement>(`[data-cat="${active}"]`)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  return (
    <>
      <PageHero kicker={k.kicker} title={k.title} lead={k.lead} image="banner-brasilianisch" />
      <div className="skin-creme sticky z-[700] border-b border-tinta/10 py-3" style={{ top: "var(--label-h)" }}>
        <div className="gutter">
          <div className="wrap flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:pr-[min(420px,40vw)] lg:pr-0">
            <div ref={bar} className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pt-[calc(var(--header-h)-8px)] md:pt-0" role="navigation" aria-label={k.sectionLabel}>
              {MENU.map((s) => (
                <button key={s.id} type="button" data-cat={s.id} className="chip shrink-0 text-tinta" aria-current={active === s.id ? "true" : undefined} aria-pressed={active === s.id}
                  onClick={() => { const el = document.getElementById(s.id); if (el) scrollTo(el); }}>
                  {s.title[lang]}
                </button>
              ))}
            </div>
            <label className="relative block md:w-[300px]">
              <span className="sr-only">{k.search}</span>
              <input type="search" className="field min-h-[44px] py-2 text-tinta" placeholder={k.searchPlaceholder} value={q} onChange={(e) => setQ(e.target.value)} />
            </label>
          </div>
        </div>
      </div>
      <section className="skin-creme pb-24 pt-10" aria-label={k.title}>
        <div className="gutter">
          <div className="wrap">
            <p className="text-sm text-tinta/70" aria-live="polite">{q.trim() ? (hits ? fill(k.results, { n: hits }) : fill(k.noResults, { q: q.trim() })) : k.source}</p>
            {filtered.map((s) => (
              <section key={s.id} id={s.id} className="mt-16 grid gap-8 scroll-mt-40 lg:grid-cols-[0.8fr_1.2fr]" aria-labelledby={`h-${s.id}`}>
                <div className="lg:sticky lg:top-40 lg:self-start">
                  <p className="kicker text-vinho-2" lang="pt-BR">{s.titlePt}</p>
                  <h2 id={`h-${s.id}`} className="display mt-2 text-[clamp(2.8rem,6vw,5.6rem)] text-vinho">{s.title[lang]}</h2>
                  {s.note && <p className="mt-3 max-w-[30rem] text-tinta/75">{s.note[lang]}</p>}
                  <Img id={s.cutout} alt="" sizes="200px" fit="contain" className="mt-6 hidden w-[180px] drop-shadow-[0_18px_22px_rgba(0,0,0,0.25)] lg:block" />
                </div>
                <ul>{s.items.map((d) => <DishRow key={d.id} d={d} />)}</ul>
              </section>
            ))}
            <div className={cn("mt-20 flex flex-wrap items-center gap-4 rounded-[var(--radius-card)] bg-vinho p-8 text-creme")}>
              <p className="display flex-1 text-[clamp(2rem,4vw,3.4rem)]">{t.reservation.title}</p>
              <button type="button" className="pill pill-gold" onClick={() => openBooking()}>{t.cta.reserve}<IconArrow size={16} className="arrow" /></button>
            </div>
            <p className="mt-6 text-sm text-tinta/70">{k.source}</p>
          </div>
        </div>
      </section>
    </>
  );
}
