// The taste journey: an original map of Portugal with the Azores in an inset, pinned while the shop's second
// paragraph scrolls beside it. A pin travels with the text: Lissabon → Algarve → the coasts light up for "das
// Mittelmeer und den Atlantik" → the Azores. It ends on two cards, Portwein and Licor Beirão, with their live
// sentences. The stops are also a list of buttons beside the map (arrow keys move between them).
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { UI, type L } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TX } from "@/content/site";
import { PORTUGAL_PATH } from "@/content/map";
import { cn, prefersReducedMotion } from "@/lib/utils";
import { PortGlassBottle, WineBottle } from "./Illustrations";
import { IconExternal } from "./icons";

type Stop = { key: "lisbon" | "algarve" | "coasts" | "azores"; text: L; x: number; y: number };
// the map's projection: x = (lon + 9.6) × 100, y = (42.2 − lat) × 128 (the Azores sit in an inset)
const STOPS: Stop[] = [
  { key: "lisbon", text: TX.reise2, x: 48, y: 405 },
  { key: "algarve", text: TX.reise2, x: 150, y: 640 },
  { key: "coasts", text: TX.reise3, x: 30, y: 300 },
  { key: "azores", text: TX.reise4, x: 70, y: 110 },
];

export function TasteJourney({ withEnd = true }: { withEnd?: boolean }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Stop["key"]>("lisbon");
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive((vis.target as HTMLElement).dataset.stop as Stop["key"]);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    Object.values(refs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const jump = (key: Stop["key"]) => {
    setActive(key);
    refs.current[key]?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
  };
  const pin = STOPS.find((s) => s.key === active)!;
  const inset = active === "azores";
  const coasts = active === "coasts";
  const label = (k: Stop["key"]) => UI[k === "lisbon" ? "lisbon" : k === "algarve" ? "algarve" : k === "coasts" ? "coasts" : "azores"][lang];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <svg viewBox="0 0 360 690" className="max-h-[60svh] w-full overflow-visible" aria-hidden="true">
            {/* the coasts: the Atlantic west and south, lit when the text names the sea */}
            <path d={PORTUGAL_PATH} fill="rgba(255,255,255,0.06)" stroke={coasts ? "#DFCE9B" : "rgba(243,242,225,0.5)"} strokeWidth={coasts ? 5 : 2} strokeLinejoin="round" style={{ transition: "stroke .4s, stroke-width .4s" }} />
            <text x="12" y="560" fontFamily="Barlow Condensed" fontWeight="700" fontSize="16" letterSpacing="2" fill={coasts ? "#DFCE9B" : "#F3F2E1"} opacity={coasts ? 1 : 0.5} style={{ textTransform: "uppercase" }} transform="rotate(-78 12 560)">
              {UI.coasts[lang].split(/ (und|and|e|et) /)[0]}
            </text>
            {/* the Azores inset */}
            <g>
              <rect x="10" y="40" width="120" height="110" rx="12" fill={inset ? "rgba(223,206,155,0.18)" : "rgba(255,255,255,0.04)"} stroke={inset ? "#DFCE9B" : "rgba(243,242,225,0.35)"} strokeWidth="1.5" style={{ transition: "fill .4s, stroke .4s" }} />
              {[[32, 112], [48, 104], [66, 96], [84, 92], [100, 84], [58, 76], [44, 70]].map(([cx, cy], i) => (
                <ellipse key={i} cx={cx} cy={cy} rx={6 - (i % 3)} ry={3.5} fill={inset ? "#DFCE9B" : "#F3F2E1"} opacity={inset ? 1 : 0.55} />
              ))}
              <text x="70" y="60" textAnchor="middle" fontFamily="Barlow Condensed" fontWeight="700" fontSize="15" letterSpacing="2" fill={inset ? "#DFCE9B" : "#F3F2E1"} style={{ textTransform: "uppercase" }}>
                {UI.azores[lang]}
              </text>
            </g>
            {/* the stops on the mainland */}
            {STOPS.filter((s) => s.key === "lisbon" || s.key === "algarve").map((s) => (
              <g key={s.key} onClick={() => jump(s.key)} className="cursor-pointer">
                <circle cx={s.x} cy={s.y} r={active === s.key ? 14 : 9} fill={active === s.key ? "#DFCE9B" : "rgba(243,242,225,0.25)"} stroke="#F3F2E1" strokeWidth="2" style={{ transition: "r .3s, fill .3s" }} />
                <text x={s.x + 22} y={s.y + 6} fontFamily="Barlow Condensed" fontWeight="700" fontSize="18" letterSpacing="1.5" fill={active === s.key ? "#DFCE9B" : "#F3F2E1"} style={{ textTransform: "uppercase" }}>
                  {label(s.key)}
                </text>
              </g>
            ))}
            {/* the travelling pin */}
            <motion.g animate={{ x: pin.x, y: pin.y - 14 }} initial={false} transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 16 }}>
              <path d="M0 0 C-14 -16 -18 -26 -18 -34 A18 18 0 1 1 18 -34 C18 -26 14 -16 0 0 Z" fill="#FFFFFF" stroke="#1B1B1B" strokeWidth="2.5" />
              <circle cx="0" cy="-34" r="7" fill="#6E6140" />
            </motion.g>
          </svg>
          <div
            role="group"
            aria-label={UI.stops[lang]}
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
              <button key={s.key} type="button" aria-pressed={active === s.key} tabIndex={active === s.key ? 0 : -1} onClick={() => jump(s.key)} className={cn("rounded-full px-3 py-1.5 text-left font-display text-[15px] font-semibold uppercase tracking-[0.1em] transition-[background-color,color]", active === s.key ? "bg-destaque text-marca-escura" : "text-branco hover:bg-branco/10")}>
                {label(s.key)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-[clamp(18px,1.4vw,24px)] leading-relaxed text-branco/85">{TX.reise1[lang]}</p>
        {STOPS.map((s, i) => (
          <section
            key={s.key}
            ref={(el) => {
              refs.current[s.key] = el;
            }}
            data-stop={s.key}
            aria-labelledby={`stop-${s.key}`}
            className={cn("rounded-[24px] p-6 transition-[background-color] duration-500 md:p-8", active === s.key ? "bg-branco/[0.09]" : "bg-branco/[0.03]")}
          >
            <p className="eyebrow text-destaque">0{i + 1} / 04</p>
            <h3 id={`stop-${s.key}`} className="mt-2 font-display text-[clamp(40px,4vw,68px)] font-extrabold uppercase leading-[0.9]">
              {label(s.key)}
            </h3>
            <p className="mt-4 text-[clamp(17px,1.2vw,20px)] leading-relaxed text-branco/85">{s.text[lang]}</p>
          </section>
        ))}
        <p className="font-display text-[clamp(22px,2vw,32px)] font-semibold uppercase leading-[1.08]">{TX.reise5[lang]}</p>
        {withEnd && (
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { name: UI.port[lang], text: TX.reise2, art: <PortGlassBottle className="w-20" /> },
              { name: "Licor Beirão", text: TX.reise4, art: <WineBottle className="w-10" /> },
            ].map((c) => (
              <article key={c.name} className="flex gap-5 rounded-[24px] bg-destaque p-6 text-marca-escura">
                <div className="shrink-0">{c.art}</div>
                <div>
                  <h3 className="font-display text-[28px] font-extrabold uppercase leading-none">{c.name}</h3>
                  <p className="mt-2 text-[15px] leading-snug">{c.text[lang]}</p>
                </div>
              </article>
            ))}
            <a href={BUSINESS.webShop} target="_blank" rel="noopener noreferrer" className="btn sm:col-span-2 sm:justify-self-start">
              <span className="btn-roll">
                <span>{TX.btnBestellen[lang]}</span>
                <span aria-hidden="true">{TX.btnBestellen[lang]}</span>
              </span>
              <IconExternal size={16} />
              <span className="sr-only">{UI.externalNew[lang]}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
