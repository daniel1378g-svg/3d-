// The drinks, apéro and dessert card from the restaurant's PDF: sticky section tabs, names as on the card, the
// German subtitles translated, prices in CHF. The tab of the section in view follows the scroll.
import { useEffect, useState } from "react";
import menu from "@content/menu.json";
import { useSite } from "@/site";
import { useMenuTr } from "@/content/articles";
import { scrollTo } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { URLS } from "@/content/facts";
import { IconExternal } from "./icons";

type Item = { id: string; name: string; desc?: string; size?: string; price: string; unit?: string };
type Section = { id: string; title: string; note?: string; items: Item[] };
const SECTIONS = (menu as { sections: Section[] }).sections;

export function MenuCard() {
  const { t, lang } = useSite();
  const tr = useMenuTr(lang);
  const [active, setActive] = useState(SECTIONS[0].id);
  useEffect(() => {
    const io = new IntersectionObserver((es) => {
      for (const e of es) if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.sec!);
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll("[data-sec]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  const price = (p: string) => (p.includes(".") ? p : `${p}.–`);
  return (
    <section className="skin-creme py-20 md:py-28" aria-labelledby="menu-title">
      <div className="gutter">
        <div className="wrap">
          <h2 id="menu-title" className="display text-[clamp(3rem,7vw,7rem)] text-vinho">{t.prices.menuTitle}</h2>
          <p className="lead mt-4 max-w-[40rem] text-tinta/80">{t.prices.menuLead}</p>
          <a className="pill pill-dark mt-6" href={URLS.menuPdf} target="_blank" rel="noopener">{t.cta.menuPdf}<IconExternal size={16} /><span className="sr-only">{t.a11y.newTab}</span></a>
        </div>
      </div>
      <nav aria-label={t.prices.menuSections} className="sticky z-20 mt-10 border-y border-tinta/10 bg-creme/90 backdrop-blur" style={{ top: "calc(var(--label-h) + 84px)" }}>
        <ul className="gutter flex gap-2 overflow-x-auto py-3 no-scrollbar">
          {SECTIONS.map((s) => (
            <li key={s.id} className="shrink-0">
              <button type="button" className="chip text-tinta" aria-pressed={active === s.id} onClick={() => { const el = document.querySelector<HTMLElement>(`[data-sec="${s.id}"]`); if (el) scrollTo(el, { offset: -150 }); }}>
                {tr?.sections[s.id]?.title ?? s.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="gutter">
        <div className="wrap mt-10 columns-1 gap-14 lg:columns-2">
          {SECTIONS.map((s) => (
            <section key={s.id} data-sec={s.id} className="mb-14 break-inside-avoid" aria-labelledby={`m-${s.id}`}>
              <h3 id={`m-${s.id}`} className="display text-[2.4rem] text-vinho">{tr?.sections[s.id]?.title ?? s.title}</h3>
              {s.note && <p className="kicker mt-1 text-tinta/75">{tr?.sections[s.id]?.note ?? s.note}</p>}
              <ul className="mt-4 flex flex-col">
                {s.items.map((it) => {
                  const name = tr?.items[it.id]?.name ?? it.name;
                  const desc = it.desc ? tr?.items[it.id]?.desc ?? it.desc : undefined;
                  return (
                    <li key={it.id} className="border-b border-dashed border-tinta/15 py-3">
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-[1.12rem] font-bold text-tinta" style={{ fontStretch: "90%" }} lang={name === it.name && lang !== "de" ? "pt" : undefined}>{name}</span>
                        <span className="mb-1 flex-1 border-b border-dotted border-tinta/25" aria-hidden="true" />
                        <span className="font-display text-[1.12rem] font-bold text-vinho tabular">
                          <span className="sr-only">CHF </span>{price(it.price)}
                        </span>
                      </div>
                      {(desc || it.size || it.unit) && (
                        <p className="mt-0.5 text-sm text-tinta/65">
                          {[desc, it.size, it.unit === "piece" ? t.prices.perPiece : it.unit === "scoop" ? t.prices.perScoop : null].filter(Boolean).join(" · ")}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
        <p className={cn("wrap text-sm text-tinta/75")}>{t.prices.origin} {t.prices.vat}</p>
      </div>
    </section>
  );
}
