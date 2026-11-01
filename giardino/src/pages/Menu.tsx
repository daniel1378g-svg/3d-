// The complete menus as HTML: food, drinks, desserts, kids. Search covers every menu (names and descriptions in the
// current language and in German), filters use only markers printed on the menus, prices are CHF from one source.
// Tab (?m=), search (?q=) and filters (?tag=) live in the address, so a language switch, reload or shared link keeps them;
// ?category=<section id> and #<item id> are locale-neutral deep links (BRIEF §5).
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useSite } from "@/site";
import { useQueryParam } from "@/lib/router";
import { MENUS, TAG_INFO, FILTER_TAGS, SCOOP_CHF, CREAM_CHF, type Item, type Menu as MenuT, type MenuId, type Section, type Tag, type Size } from "@/content/menu";
import { fmtAmount, fmtBytes, fmtChf, fmtDecimal, fmtSize, fold } from "@/lib/format";
import { Close, Download, Search, ArrowUp, ChevronLeft, Chevron } from "@/components/icons";
import { scrollToAnchor, NewTabMark } from "@/components/Link";
import { useReveals } from "@/lib/reveal";
import type { Lang } from "@/i18n";

const pre = __ARTIFACT__ ? "" : "/";
const IDS: MenuId[] = ["food", "drinks", "desserts", "kids"];
const asId = (v: string): MenuId => (IDS.includes(v as MenuId) ? (v as MenuId) : "food");

/** char-by-char folding keeps indices aligned with the original text (for highlighting) */
const foldChars = (s: string) => [...s].map((c) => (c === "ß" ? "s" : c.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().charAt(0) || c)).join("");

function Highlight({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const f = foldChars(text);
  const parts: React.ReactNode[] = [];
  let i = 0;
  let k = 0;
  for (;;) {
    const j = f.indexOf(q, i);
    if (j < 0) break;
    parts.push(text.slice(i, j), <mark key={k++}>{text.slice(j, j + q.length)}</mark>);
    i = j + q.length;
  }
  parts.push(text.slice(i));
  return <>{parts}</>;
}

const haystack = (item: Item, section: Section, lang: Lang) => fold([item.name[lang], item.desc?.[lang] ?? "", item.name.de, item.desc?.de ?? "", section.title[lang], item.note?.[lang] ?? ""].join(" "));

export default function MenuPage() {
  const { t, lang } = useSite();
  const [m, setM] = useQueryParam("m");
  const [q, setQ] = useQueryParam("q");
  const [tagParam, setTagParam] = useQueryParam("tag");
  const [category] = useQueryParam("category");
  const [draft, setDraft] = useState(q);
  useEffect(() => setDraft(q), [q]);
  // debounce typing into the address
  useEffect(() => {
    const id = window.setTimeout(() => draft !== q && setQ(draft), 220);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);
  useReveals(`menu-${lang}`);

  const active = asId(m);
  const tags = tagParam.split(",").filter((x): x is Tag => FILTER_TAGS.includes(x as Tag));
  const query = fold(q.trim());
  const qChars = foldChars(q.trim());
  const searching = query.length > 0 || tags.length > 0;

  const visible = useMemo(() => {
    const match = (item: Item, s: Section) => (!query || haystack(item, s, lang).includes(query)) && tags.every((tg) => item.tags?.includes(tg));
    const menus = searching ? MENUS : MENUS.filter((x) => x.id === active);
    return menus
      .map((menu) => ({
        menu,
        sections: menu.sections
          .map((s) => ({ ...s, groups: s.groups.map((g) => ({ ...g, items: g.items.filter((i) => match(i, s)) })).filter((g) => g.items.length) }))
          .filter((s) => s.groups.length),
      }))
      .filter((x) => x.sections.length)
      // in search mode, shared items (Frisco ice creams) are listed once: under desserts, not again under kids
      .map((x, _, all) => (searching && x.menu.id === "kids" && all.some((y) => y.menu.id === "desserts") ? { ...x, sections: x.sections.filter((s) => s.id === "kinder-essen") } : x))
      .filter((x) => x.sections.length);
  }, [active, query, tags, lang, searching]);
  const count = visible.reduce((n, v) => n + v.sections.reduce((a, s) => a + s.groups.reduce((b, g) => b + g.items.length, 0), 0), 0);

  // tabs with arrow keys
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const onTabKey = (e: KeyboardEvent) => {
    const i = IDS.indexOf(active);
    const n = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? IDS.length - 1 : null;
    if (n === null) return;
    e.preventDefault();
    const id = IDS[(n + IDS.length) % IDS.length];
    setM(id === "food" ? "" : id);
    tabs.current[(n + IDS.length) % IDS.length]?.focus();
  };

  // scrollspy for the category bar
  const [current, setCurrent] = useState<string>("");
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>(".msec")];
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) setCurrent(vis[0].target.id);
    }, { rootMargin: "-30% 0px -60% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [visible]);
  const cats = useRef<HTMLElement>(null);
  useEffect(() => {
    cats.current?.querySelector<HTMLElement>(`[href="#${current}"]`)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [current]);

  // ?category=pizzen opens the right menu and scrolls to that section
  useEffect(() => {
    if (!category) return;
    const owner = MENUS.find((x) => x.sections.some((sec) => sec.id === category));
    if (!owner) return;
    if (owner.id !== active) setM(owner.id === "food" ? "" : owner.id);
    const id = window.setTimeout(() => scrollToAnchor(category, true), 80);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
  const railBy = (dir: number) => cats.current?.scrollBy({ left: dir * cats.current.clientWidth * 0.7, behavior: "smooth" });

  const toggleTag = (tg: Tag) => {
    const next = tags.includes(tg) ? tags.filter((x) => x !== tg) : [...tags, tg];
    setTagParam(next.join(","));
  };
  const menu = MENUS.find((x) => x.id === active)!;

  return (
    <>
      <header className="menu-head grain">
        <div className="engraving" aria-hidden="true" />
        <div className="wrap">
          <p className="kicker">{t.menu.kicker}</p>
          <h1 className="display h-xl" style={{ margin: "20px 0 18px" }}>{t.menu.title}</h1>
          <p className="lead" style={{ maxWidth: "52ch" }}>{t.menu.lead}</p>
          <div className="menu-tabs" role="tablist" aria-label={t.menu.tabsLabel} style={{ marginTop: 36 }} onKeyDown={onTabKey}>
            {IDS.map((id, i) => {
              const mm = MENUS.find((x) => x.id === id)!;
              const selected = !searching && active === id;
              return (
                <button
                  key={id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${id}`}
                  aria-selected={selected}
                  aria-controls="menu-panel"
                  tabIndex={active === id ? 0 : -1}
                  className="menu-tab"
                  onClick={() => {
                    setM(id === "food" ? "" : id);
                    if (searching) {
                      setDraft("");
                      setQ("");
                      setTagParam("");
                    }
                  }}
                >
                  <b>{mm.title[lang]}</b>
                  <small>{mm.kicker[lang]}</small>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <div className="menu-tools">
        <div className="wrap">
          <div className="menu-tools__row">
            <div className="menu-search" role="search">
              <Search />
              <label htmlFor="menu-q" className="sr-only">{t.menu.searchLabel}</label>
              <input id="menu-q" className="input" type="search" value={draft} placeholder={t.menu.searchPlaceholder} onChange={(e) => setDraft(e.target.value)} autoComplete="off" enterKeyHint="search" />
              {draft && (
                <button type="button" className="menu-search__clear" onClick={() => { setDraft(""); setQ(""); }}>
                  <Close width={18} height={18} />
                  <span className="sr-only">{t.menu.clearSearch}</span>
                </button>
              )}
            </div>
            <p className="muted num" aria-live="polite" style={{ fontSize: 14, whiteSpace: "nowrap" }}>{searching ? t.menu.resultCount(count) : ""}</p>
          </div>
          <div className="menu-filters" role="group" aria-label={t.menu.filtersLabel} style={{ paddingBottom: 12 }}>
            <span className="menu-filters__label" aria-hidden="true">{t.menu.filtersLabel}</span>
            {FILTER_TAGS.map((tg) => (
              <button key={tg} type="button" className="chip" aria-pressed={tags.includes(tg)} onClick={() => toggleTag(tg)} title={TAG_INFO[tg].hint[lang]}>
                <span className="dot" aria-hidden="true" />
                {TAG_INFO[tg].label[lang]}
                <span className="sr-only"> – {TAG_INFO[tg].hint[lang]}</span>
              </button>
            ))}
            {tags.length > 0 && (
              <button type="button" className="link" style={{ background: "none", border: 0, fontSize: 14 }} onClick={() => setTagParam("")}>{t.menu.resetFilters}</button>
            )}
          </div>
        </div>
      </div>
      {!searching && (
        <div className="menu-rail">
          <div className="wrap menu-rail__inner">
            <button type="button" className="menu-rail__btn" onClick={() => railBy(-1)} tabIndex={-1} aria-hidden="true">
              <ChevronLeft />
            </button>
            <nav className="menu-cats" ref={cats} aria-label={t.menu.sectionsLabel}>
              {menu.sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} aria-current={current === s.id ? "true" : undefined}>{s.title[lang]}</a>
              ))}
            </nav>
            <button type="button" className="menu-rail__btn" onClick={() => railBy(1)} tabIndex={-1} aria-hidden="true">
              <Chevron />
            </button>
          </div>
        </div>
      )}

      <div className="wrap menu-body">
        <div id="menu-panel" role={searching ? "region" : "tabpanel"} aria-labelledby={searching ? undefined : `tab-${active}`} aria-label={searching ? t.menu.resultCount(count) : undefined} key={searching ? `s-${query}-${tags.join()}` : active} className="menu-panel">
          {visible.length === 0 && (
            <div className="menu-empty">
              <p>{t.menu.noResults(q)}</p>
              {tags.length > 0 && <button type="button" className="btn btn--ghost btn--small" style={{ marginTop: 18 }} onClick={() => setTagParam("")}>{t.menu.resetFilters}</button>}
            </div>
          )}
          {visible.map(({ menu: mm, sections }) => (
            <div key={mm.id}>
              {searching && <p className="kicker" style={{ margin: "8px 0 18px" }}>{mm.title[lang]}</p>}
              {sections.map((s) => (
                <MenuSection key={`${mm.id}-${s.id}`} section={s} lang={lang} q={qChars} />
              ))}
              {!searching && <Footnotes menu={mm} />}
            </div>
          ))}
        </div>
        <aside className="menu-aside" aria-label={t.menu.pdfTitle}>
          <div className="panel">
            <h2 style={{ fontSize: 22 }}>{t.menu.pricesNote}</h2>
            <p className="muted" style={{ fontSize: 14.5 }}>{t.menu.allergies}</p>
            <p className="muted" style={{ fontSize: 14.5, marginTop: 10 }}>{t.menu.glutenNote}</p>
          </div>
          <div className="panel">
            <h2 style={{ fontSize: 22 }}>{t.menu.pdfTitle}</h2>
            <p className="muted" style={{ fontSize: 14 }}>{t.menu.pdfNote}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 0", display: "grid", gap: 10 }}>
              {MENUS.map((x) => (
                <li key={x.id}>
                  <a className="textlink" href={x.pdf.href.replace(/^\//, pre)} target="_blank" rel="noopener" style={{ fontSize: 14.5 }}>
                    <Download />
                    <span>{x.title[lang]}<br /><small className="muted" style={{ fontWeight: 400 }}><span lang="de">{x.pdf.file}</span>{t.menu.pdfLink("", fmtBytes(x.pdf.bytes, lang), x.pdf.pages)}</small></span>
                    <NewTabMark />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <a href="#top" className="textlink" style={{ fontSize: 14 }} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            {t.menu.backToTop} <ArrowUp />
          </a>
        </aside>
      </div>
    </>
  );
}

function Footnotes({ menu }: { menu: MenuT }) {
  const { lang } = useSite();
  return (
    <div className="msec__notes" style={{ borderTop: "1px solid var(--line)", paddingTop: 18, marginTop: -40, marginBottom: 60 }}>
      {menu.footnotes.map((f, i) => <p key={i}>{f[lang]}</p>)}
    </div>
  );
}

function sizeKey(s?: Size) {
  return s ? `${s.q}${s.u}` : "";
}

export function MenuSection({ section, lang, q }: { section: Section; lang: Lang; q: string }) {
  const { t } = useSite();
  const cols = section.columns;
  return (
    <section className="msec" id={section.id} aria-labelledby={`h-${section.id}`}>
      <div className="msec__head">
        <h2 className="msec__title" id={`h-${section.id}`}>{section.title[lang]}</h2>
        {cols && (
          <div className="msec__cols" aria-hidden="true">
            {cols.map((c) => <span key={sizeKey(c)}>{fmtSize(c, lang)}</span>)}
          </div>
        )}
      </div>
      {section.intro && <p className="msec__intro">{section.intro[lang]}</p>}
      {section.flavours ? (
        <>
          <div className="flavours" role="list">
            {section.groups[0].items.map((f) => (
              <div className="flavour" role="listitem" key={f.id}>
                <b><Highlight text={f.name[lang]} q={q} /></b>
                {f.desc && <span>{f.desc[lang]}</span>}
                {(f.tags?.length || f.note) && (
                  <span className="mrow__meta" style={{ marginTop: 2 }}>
                    {f.tags?.map((tg) => <span key={tg} className={`tag tag--${tg}`} title={TAG_INFO[tg].hint[lang]}>{TAG_INFO[tg].label[lang]}</span>)}
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="msec__notes num" style={{ fontWeight: 560, color: "var(--ink)" }}>
            {t.menu.perScoop}: {fmtChf(SCOOP_CHF)} · + {fmtChf(CREAM_CHF)}
          </p>
        </>
      ) : (
        section.groups.map((g) => (
          <div key={g.id}>
            {g.title && <h3 className="mgroup__title">{g.title[lang]}</h3>}
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {g.items.map((item) => (
                <MenuRow key={item.id} item={item} lang={lang} q={q} cols={cols} nameLang={ITALIAN_NAMES.has(section.id) && invariant(item) ? "it" : undefined} />
              ))}
            </ul>
          </div>
        ))
      )}
      {section.notes && (
        <div className="msec__notes">
          {section.notes.map((n, i) => <p key={i}>{n[lang]}</p>)}
        </div>
      )}
    </section>
  );
}

/** «CHF 12.90» (fmtChf), with the currency set smaller so a column of prices stays calm. */
function Price({ chf }: { chf: number }) {
  return (
    <>
      <span className="price__cur">CHF</span>
      {"\u202F"}
      {fmtAmount(chf)}
    </>
  );
}

/** Dish names stay in their original language (BRIEF §4): Italian names in these sections carry lang="it". */
const ITALIAN_NAMES = new Set(["vorspeisen", "pizzen", "risotto", "pasta"]);
const invariant = (item: Item) => new Set(Object.values(item.name)).size === 1;

function MenuRow({ item, lang, q, cols, nameLang }: { item: Item; lang: Lang; q: string; cols?: Size[]; nameLang?: string }) {
  const { t } = useSite();
  const single = item.prices.length === 1 && item.prices[0].size && !cols;
  const meta: string[] = [];
  if (single) meta.push(fmtSize(item.prices[0].size!, lang));
  if (item.abv) meta.push(t.menu.abv(fmtDecimal(item.abv, lang)));
  if (!cols && item.prices.length > 1 && item.prices.every((p) => !p.size && !p.label)) meta.push(t.menu.twoPrices);
  const priceCells = cols
    ? cols.map((c) => item.prices.find((p) => p.size && sizeKey(p.size) === sizeKey(c)) ?? null)
    : item.prices;
  return (
    <li className="mrow" id={item.id}>
      <p className="mrow__name" lang={nameLang}><Highlight text={item.name[lang]} q={q} /></p>
      {item.desc && <p className="mrow__desc"><Highlight text={item.desc[lang]} q={q} /></p>}
      {(meta.length > 0 || item.tags?.length || item.note) && (
        <p className="mrow__meta">
          {meta.length > 0 && <span className="mrow__abv">{meta.join(" · ")}</span>}
          {item.tags?.filter((tg) => tg !== "australian-meat").map((tg) => (
            <span key={tg} className={`tag tag--${tg}`} title={TAG_INFO[tg].hint[lang]}>{TAG_INFO[tg].label[lang]}</span>
          ))}
          {item.note && <span className="mrow__abv">{item.note[lang]}</span>}
        </p>
      )}
      <div className="mrow__prices">
        {priceCells.map((p, i) =>
          p ? (
            <span className="price" key={i}>
              {(cols || (p.size && !single) || p.label) && <small>{p.label ? p.label[lang] : p.size ? fmtSize(p.size, lang) : ""}</small>}
              <Price chf={p.chf} />
            </span>
          ) : (
            <span className="price price--empty" key={i} aria-hidden="true">–</span>
          ),
        )}
      </div>
    </li>
  );
}
