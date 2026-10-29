// The wine journey: an original map of Portugal stays in place while the home page's wine paragraph scrolls
// beside it. A pin travels Minho → Douro → Dão → Alentejo with the text, and each stop shows that region's wines
// from the list with their prices. A "Blanc / Rosé / Rouge" toggle filters them; a region without that colour
// dims. The regions are also a list of buttons beside the map (arrow keys move between them).
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { UI, type L, type Lang } from "@/i18n";
import { useSite } from "@/site";
import { TEXT } from "@/content/site";
import { COLOURS, MAP_REGIONS, PORTUGAL_PATH, SECTION_L, WINES, type ColourId, type Wine } from "@/content/vins";
import { cn, prefersReducedMotion } from "@/lib/utils";

const COLOUR_LABEL: Record<ColourId, "white" | "rose" | "red"> = { blanc: "white", rose: "rose", rouge: "red" };
type Stop = { key: string; label: string; text: L[]; source?: "lesVins" };
const DAO = TEXT.lesVinsRegions.find((r) => r.name === "Dão")!;
const STOPS: Stop[] = [
  { key: "minho", label: "Minho", text: TEXT.wineJourney.minho },
  { key: "douro", label: "Douro", text: TEXT.wineJourney.douro },
  { key: "dao", label: "Dão", text: [DAO.text], source: "lesVins" },
  { key: "alentejo", label: "Alentejo", text: TEXT.wineJourney.alentejo },
];

export function WineLine({ w, lang }: { w: Wine; lang: Lang }) {
  const tone = COLOURS.find((c) => c.id === w.colour)!.tone;
  return (
    <li className="flex items-baseline gap-3 py-2">
      <span aria-hidden="true" className="h-3 w-3 shrink-0 translate-y-[-1px] rounded-full shadow-[0_0_0_2px_rgba(255,255,255,0.25)]" style={{ background: tone }} />
      <span lang="pt-PT" className="dish-name font-display text-[20px] font-bold uppercase leading-tight">
        {w.name}
      </span>
      <span aria-hidden="true" className="leader min-w-6 flex-1 translate-y-[-4px] border-b-2 border-dotted border-current/35" />
      <span className="whitespace-nowrap font-display text-[19px] font-semibold">
        {w.price}
        {w.size && <span className="ml-1.5 text-[13px] font-medium tracking-[0.08em] opacity-75">{w.size}</span>}
      </span>
      <span className="sr-only">· {UI[COLOUR_LABEL[w.colour]][lang]}</span>
    </li>
  );
}

export function WineJourney({ withText = true }: { withText?: boolean }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [colour, setColour] = useState<ColourId | "all">("all");
  const [active, setActive] = useState("minho");
  const refs = useRef<Record<string, HTMLElement | null>>({});

  // the stop nearest the middle of the screen moves the pin
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive((vis.target as HTMLElement).dataset.stop!);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    Object.values(refs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const has = (key: string) => WINES.some((w) => w.region === key && (colour === "all" || w.colour === colour));
  const jump = (key: string) => {
    setActive(key);
    refs.current[key]?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
  };
  const pin = MAP_REGIONS.find((r) => r.key === active) ?? MAP_REGIONS[0];
  const rosés = WINES.filter((w) => w.region === null);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      {/* the map stays while the journey scrolls */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div role="group" aria-label={`${UI.white[lang]} / ${UI.rose[lang]} / ${UI.red[lang]}`} className="inline-flex flex-wrap rounded-full bg-branco/10 p-1">
          {(["all", "blanc", "rose", "rouge"] as const).map((c) => (
            <button key={c} type="button" aria-pressed={colour === c} onClick={() => setColour(c)} className={cn("relative rounded-full px-4 py-2.5 font-display text-[15px] font-semibold uppercase tracking-[0.1em]", colour === c ? "text-marca-escura" : "text-branco")}>
              {colour === c && <motion.span layoutId={withText ? "wj-colour" : "wj-colour-page"} className="absolute inset-0 rounded-full bg-destaque" transition={{ type: "spring", stiffness: 480, damping: 38 }} />}
              <span className="relative">{c === "all" ? UI.sideAll[lang] : UI[COLOUR_LABEL[c]][lang]}</span>
            </button>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <svg viewBox="0 0 360 690" className="max-h-[60svh] w-full overflow-visible" aria-hidden="true">
            <path d={PORTUGAL_PATH} fill="rgba(255,255,255,0.06)" stroke="rgba(242,217,221,0.5)" strokeWidth="2" strokeLinejoin="round" />
            {MAP_REGIONS.map((r) => {
              const on = active === r.key;
              const dim = !has(r.key);
              return (
                <g key={r.key} onClick={() => jump(r.key)} className="cursor-pointer" style={{ opacity: dim ? 0.3 : 1, transition: "opacity .3s" }}>
                  <ellipse cx={r.x} cy={r.y} rx={r.rx} ry={r.ry} fill={on ? "#DD9933" : "rgba(242,217,221,0.18)"} stroke={on ? "#FFFFFF" : "rgba(242,217,221,0.5)"} strokeWidth={on ? 2.5 : 1.5} style={{ transition: "fill .3s, stroke .3s" }} />
                  <text x={r.lx ?? r.x} y={(r.ly ?? r.y) + 5} textAnchor={r.anchor ?? "middle"} fontFamily="Barlow Condensed" fontWeight="700" fontSize="18" letterSpacing="1.5" fill={on ? "#DD9933" : "#F2D9DD"} style={{ textTransform: "uppercase", pointerEvents: "none" }}>
                    {r.label.toUpperCase()}
                  </text>
                </g>
              );
            })}
            {/* the travelling pin */}
            <motion.g animate={{ x: pin.x, y: pin.y - 14 }} initial={false} transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 16 }}>
              <path d="M0 0 C-14 -16 -18 -26 -18 -34 A18 18 0 1 1 18 -34 C18 -26 14 -16 0 0 Z" fill="#FFFFFF" stroke="#3D0612" strokeWidth="2.5" />
              <circle cx="0" cy="-34" r="7" fill="#6A0719" />
            </motion.g>
          </svg>
          <div
            role="group"
            aria-label={UI.regions[lang]}
            className="flex flex-col gap-1.5"
            onKeyDown={(e) => {
              if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(e.key)) return;
              const items = [...e.currentTarget.querySelectorAll<HTMLButtonElement>("button")];
              const i = items.indexOf(document.activeElement as HTMLButtonElement);
              items[(i + (e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1) + items.length) % items.length].focus();
              e.preventDefault();
            }}
          >
            {STOPS.map((s) => (
              <button key={s.key} type="button" aria-pressed={active === s.key} tabIndex={active === s.key ? 0 : -1} onClick={() => jump(s.key)} className={cn("rounded-full px-3 py-1.5 text-left font-display text-[15px] font-semibold uppercase tracking-[0.1em] transition-[background-color,color,opacity]", active === s.key ? "bg-destaque text-marca-escura" : "text-branco hover:bg-branco/10", !has(s.key) && active !== s.key && "opacity-50")}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* the stops */}
      <div className="space-y-6">
        {STOPS.map((s, i) => {
          const wines = WINES.filter((w) => w.region === s.key && (colour === "all" || w.colour === colour));
          return (
            <section
              key={s.key}
              ref={(el) => {
                refs.current[s.key] = el;
              }}
              data-stop={s.key}
              aria-labelledby={`stop-${s.key}`}
              className={cn("rounded-[24px] p-6 transition-[background-color,opacity] duration-500 md:p-8", active === s.key ? "bg-branco/[0.09]" : "bg-branco/[0.03]", !wines.length && "opacity-70")}
            >
              <p className="eyebrow text-destaque">
                0{i + 1} / 0{STOPS.length}
              </p>
              <h3 id={`stop-${s.key}`} className="mt-2 font-display text-[clamp(40px,4vw,68px)] font-extrabold uppercase leading-[0.9]">
                {s.label}
              </h3>
              {withText && (
                <div className="mt-4 space-y-3 text-[clamp(16px,1.1vw,18px)] leading-relaxed text-branco/85">
                  {s.text.map((t, k) => (
                    <p key={k}>{t[lang]}</p>
                  ))}
                  {s.source && <p className="text-[13px] text-suave">— {TEXT.lesVinsTitle[lang]}</p>}
                </div>
              )}
              {wines.length ? <ul className="mt-5 list-none border-t border-branco/15 pt-2">{wines.map((w) => <WineLine key={w.id} w={w} lang={lang} />)}</ul> : <p className="mt-5 text-[15px] text-suave">{UI.noWineColour[lang]}</p>}
            </section>
          );
        })}
        <section aria-labelledby="stop-roses" className={cn("rounded-[24px] bg-branco/[0.03] p-6 md:p-8", colour !== "all" && colour !== "rose" && "opacity-50")}>
          <h3 id="stop-roses" className="font-display text-[clamp(32px,3vw,52px)] font-extrabold uppercase leading-[0.9]">
            {SECTION_L.rose[lang]}
          </h3>
          <ul className="mt-4 list-none border-t border-branco/15 pt-2">
            {rosés.map((w) => (
              <WineLine key={w.id} w={w} lang={lang} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
