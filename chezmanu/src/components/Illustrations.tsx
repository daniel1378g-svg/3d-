// Hand-drawn line illustrations (48 × 48, round caps) for the products that have no photo, the breakfast
// tray and the cake card. Stroke and accent colours come from the palette through currentColor and --accent.
import type { ReactNode, SVGProps } from "react";

const A = "var(--accent, #D4932B)";
type P = SVGProps<SVGSVGElement> & { size?: number };
const Svg = ({ size = 48, children, ...rest }: P & { children: ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    {children}
  </svg>
);

/** Product icons, by the `icon` key in content/products.json. */
export const PRODUCT_ICONS: Record<string, (p: P) => ReactNode> = {
  tart: (p) => (
    <Svg {...p}>
      <path d="M6 28h36l-3 9H9z" />
      <path d="M8 28c2-6 9-9 16-9s14 3 16 9" />
      <circle cx="18" cy="23" r="1.6" fill={A} stroke="none" />
      <circle cx="27" cy="21.5" r="1.8" fill={A} stroke="none" />
      <circle cx="33" cy="25" r="1.4" fill={A} stroke="none" />
    </Svg>
  ),
  beignet: (p) => (
    <Svg {...p}>
      <ellipse cx="24" cy="26" rx="16" ry="11" />
      <path d="M9 25c5 3 25 3 30 0" stroke={A} strokeWidth="3" />
      <path d="M15 18l1 1M24 17v1M32 19l-1 1" />
    </Svg>
  ),
  cake: (p) => (
    <Svg {...p}>
      <path d="M8 22h32v16H8z" />
      <path d="M8 29c3 2 5 2 8 0s5-2 8 0 5 2 8 0 5-2 8 0" stroke={A} />
      <path d="M6 41h36" />
      <path d="M24 22v-6" />
      <path d="M24 13c-1.5-1.5-1.5-3 0-5 1.5 2 1.5 3.5 0 5z" fill={A} stroke={A} strokeWidth="1" />
    </Svg>
  ),
  crown: (p) => (
    <Svg {...p}>
      <ellipse cx="24" cy="29" rx="17" ry="9" />
      <ellipse cx="24" cy="28" rx="6" ry="3" />
      <circle cx="13" cy="26" r="1.8" fill="#C0392B" stroke="none" />
      <circle cx="20" cy="22" r="1.8" fill="#3f8f3a" stroke="none" />
      <circle cx="31" cy="23" r="1.8" fill={A} stroke="none" />
      <circle cx="35" cy="29" r="1.8" fill="#C0392B" stroke="none" />
      <path d="M17 13l3 4 4-6 4 6 3-4 1 7H16z" stroke={A} />
    </Svg>
  ),
  sponge: (p) => (
    <Svg {...p}>
      <path d="M8 24c0-7 7-11 16-11s16 4 16 11v9c0 3-7 6-16 6S8 36 8 33z" />
      <path d="M8 24c0 3 7 6 16 6s16-3 16-6" stroke={A} />
      <path d="M22 13c0 3 4 3 4 0" />
    </Svg>
  ),
  slice: (p) => (
    <Svg {...p}>
      <path d="M7 20h34v18H7z" />
      <path d="M7 26h34M7 32h34" stroke={A} />
      <path d="M10 17c4-2 8 2 12 0s8 2 12 0 4 0 6 0" />
    </Svg>
  ),
  baba: (p) => (
    <Svg {...p}>
      <path d="M12 22c0-6 5-10 12-10s12 4 12 10v12c0 3-5 5-12 5s-12-2-12-5z" />
      <path d="M14 20c4 3 16 3 20 0" stroke={A} />
      <circle cx="24" cy="10" r="2" fill="#C0392B" stroke="none" />
    </Svg>
  ),
  vermicelles: (p) => (
    <Svg {...p}>
      <path d="M8 30h32l-4 9H12z" />
      <path d="M11 30c0-4 2-7 4-8M16 30c0-5 1-9 4-11M22 30c0-6 1-10 3-12M28 30c0-5 2-9 4-10M33 30c0-4 2-6 3-7" stroke={A} />
      <circle cx="24" cy="15" r="3" />
    </Svg>
  ),
  log: (p) => (
    <Svg {...p}>
      <path d="M8 22h30c3 0 5 4 5 8s-2 8-5 8H8z" />
      <ellipse cx="8" cy="30" rx="3" ry="8" />
      <path d="M8 27c1 1 1 5 0 6" stroke={A} />
      <path d="M16 22l3-5 2 5M28 22l2-4 2 4" stroke="#3f8f3a" />
    </Svg>
  ),
  croissant: (p) => (
    <Svg {...p}>
      <path d="M6 32C8 20 17 14 24 14s16 6 18 18c-4-2-8-3-10.5-1.5-2-5-13-5-15 0C14 29 10 30 6 32z" />
      <path d="M17 29l2.5-11.5M24 25.5V14M31 29l-2.5-11.5" stroke={A} />
    </Svg>
  ),
  "pain-choc": (p) => (
    <Svg {...p}>
      <rect x="8" y="17" width="32" height="16" rx="5" />
      <path d="M14 17v16M34 17v16" stroke="#5A1C0C" strokeWidth="3" />
      <path d="M12 23h24" stroke={A} />
    </Svg>
  ),
  brioche: (p) => (
    <Svg {...p}>
      <circle cx="24" cy="15" r="5" />
      <path d="M12 26c0-5 5-8 12-8s12 3 12 8l-3 12H15z" />
      <path d="M17 26l2 12M24 25v13M31 26l-2 12" stroke={A} />
    </Svg>
  ),
  bread: (p) => (
    <Svg {...p}>
      <path d="M7 31c0-10 8-16 17-16s17 6 17 16v3c0 2.5-2 4.5-4.5 4.5h-25C9 38.5 7 36.5 7 34z" />
      <path d="M16 25l4-6M22.5 25l4-6M29 25l4-6" stroke={A} />
    </Svg>
  ),
  baguette: (p) => (
    <Svg {...p}>
      <path d="M8 36c-3-3 0-8 6-12l14-10c6-4 11-5 13-3s1 7-5 11L22 32c-6 4-11 7-14 4z" />
      <path d="M15 28l4-2M21 24l4-2M27 20l4-2" stroke={A} />
    </Svg>
  ),
  biscuit: (p) => (
    <Svg {...p}>
      <circle cx="24" cy="24" r="15" />
      <circle cx="24" cy="24" r="10" stroke={A} strokeDasharray="2 3" />
      <circle cx="20" cy="21" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="28" cy="22" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="24" cy="28" r="1.2" fill="currentColor" stroke="none" />
    </Svg>
  ),
  star: (p) => (
    <Svg {...p}>
      <path d="M24 8l4.7 9.6 10.6 1.5-7.7 7.5 1.8 10.5L24 32l-9.4 5.1 1.8-10.5-7.7-7.5 10.6-1.5z" />
      <path d="M24 15l2.5 5 5.5.8-4 3.9 1 5.5L24 27.6l-5 2.6 1-5.5-4-3.9 5.5-.8z" stroke={A} strokeWidth="1.6" />
    </Svg>
  ),
  macaron: (p) => (
    <Svg {...p}>
      <path d="M9 21c0-5 7-8 15-8s15 3 15 8z" />
      <path d="M9 28c0 5 7 8 15 8s15-3 15-8z" />
      <path d="M8 24.5h32" stroke={A} strokeWidth="4" />
    </Svg>
  ),
  bowl: (p) => (
    <Svg {...p}>
      <path d="M6 24h36c0 9-8 15-18 15S6 33 6 24z" />
      <path d="M13 24c1-5 5-7 8-5M21 24c2-6 7-7 10-4M30 24c1-3 4-4 6-2" stroke="#3f8f3a" />
    </Svg>
  ),
  sandwich: (p) => (
    <Svg {...p}>
      <path d="M8 22l16-9 16 9z" />
      <path d="M8 26h32" stroke="#3f8f3a" strokeWidth="3" />
      <path d="M8 30h32" stroke={A} strokeWidth="3" />
      <path d="M8 34h32l-16 2z" />
    </Svg>
  ),
  soup: (p) => (
    <Svg {...p}>
      <path d="M7 24h34c0 8-7 14-17 14S7 32 7 24z" />
      <path d="M14 38h20" />
      <g className="steam" stroke={A} strokeWidth="1.8">
        <path d="M18 19c-2-3 2-5 0-8" />
        <path d="M24 19c-2-3 2-5 0-8" />
        <path d="M30 19c-2-3 2-5 0-8" />
      </g>
    </Svg>
  ),
  burger: (p) => (
    <Svg {...p}>
      <path d="M8 21c0-6 7-10 16-10s16 4 16 10z" />
      <path d="M7 25h34" stroke="#3f8f3a" strokeWidth="3" />
      <path d="M8 29h32" stroke="#5A1C0C" strokeWidth="3.5" />
      <path d="M9 33h30c0 3-2 5-5 5H14c-3 0-5-2-5-5z" />
      <path d="M18 16l1 1M24 15v1M30 16l-1 1" stroke={A} />
    </Svg>
  ),
  pizza: (p) => (
    <Svg {...p}>
      <path d="M24 40L8 13c10-5 22-5 32 0z" />
      <path d="M10 17c9-4 19-4 28 0" stroke={A} strokeWidth="3" />
      <circle cx="21" cy="22" r="2" fill="#C0392B" stroke="none" />
      <circle cx="28" cy="25" r="2" fill="#C0392B" stroke="none" />
      <circle cx="24" cy="31" r="1.8" fill="#C0392B" stroke="none" />
    </Svg>
  ),
  platter: (p) => (
    <Svg {...p}>
      <ellipse cx="24" cy="31" rx="19" ry="7" />
      <circle cx="16" cy="27" r="3" stroke={A} />
      <circle cx="24" cy="25" r="3" />
      <circle cx="32" cy="27" r="3" stroke={A} />
      <path d="M20 31h8" />
    </Svg>
  ),
};

/** The breakfast tray items, by the `tray` keys in content/carte.json (plus the chosen drink). */
export const TRAY_ITEMS: Record<string, (p: P) => ReactNode> = {
  ballon: (p) => (
    <Svg {...p}>
      <ellipse cx="24" cy="27" rx="15" ry="11" fill="#F6E3B8" />
      <path d="M15 24c5-4 13-4 18 0" stroke={A} />
    </Svg>
  ),
  croissant: PRODUCT_ICONS.croissant,
  slices: (p) => (
    <Svg {...p}>
      <path d="M10 38V20c0-5 3-8 7-8s7 3 7 8v18z" fill="#F6E3B8" />
      <path d="M17 38V20c0-5 3-8 7-8s7 3 7 8v18z" fill="#F6E3B8" />
      <path d="M24 38V20c0-5 3-8 7-8s7 3 7 8v18z" fill="#F6E3B8" />
    </Svg>
  ),
  juice: (p) => (
    <Svg {...p}>
      <path d="M15 12h18l-2 27H17z" />
      <path d="M16.3 20h15.4l-1.4 18H17.7z" fill="#F39C12" stroke="none" opacity="0.85" />
      <circle cx="31" cy="12" r="4" stroke={A} />
    </Svg>
  ),
  butter: (p) => (
    <Svg {...p}>
      <path d="M8 30l10-8h22l-10 8z" fill="#FBEFA8" />
      <path d="M8 30v5h22l10-8v-5" />
      <path d="M30 30v5" />
    </Svg>
  ),
  jam: (p) => (
    <Svg {...p}>
      <path d="M13 18h22v18c0 2-2 4-4 4H17c-2 0-4-2-4-4z" />
      <path d="M14 24h20v12c0 2-1.5 3-3 3H17c-1.5 0-3-1-3-3z" fill="#B0263A" stroke="none" opacity="0.85" />
      <path d="M12 12h24v6H12z" stroke={A} />
    </Svg>
  ),
};

/**
 * A drink in its cup or glass, drawn to look like that drink: an espresso short and dark, a galão tall and
 * milky, a cappuccino with foam. `fill` (0–1) is the level, animated by the caller through scaleY.
 */
export type CupKind = "espresso" | "double" | "chocolate" | "renverse" | "galao" | "cappuccino" | "viennois" | "latte" | "tea";
type Cup = { glass: boolean; body: string; top: number; layers: { color: string; from: number; to: number }[]; cap?: "foam" | "cream" };
export const CUPS: Record<CupKind, Cup> = {
  espresso: { glass: false, body: "M40 60 L80 60 L76 86 Q75 92 69 92 L51 92 Q45 92 44 86 Z", top: 60, layers: [{ color: "#2B140A", from: 72, to: 92 }, { color: "#C68A4A", from: 70, to: 73 }] },
  double: { glass: false, body: "M36 52 L84 52 L80 86 Q79 92 72 92 L48 92 Q41 92 40 86 Z", top: 52, layers: [{ color: "#2B140A", from: 62, to: 92 }, { color: "#C68A4A", from: 60, to: 63 }] },
  chocolate: { glass: false, body: "M34 44 L86 44 L82 86 Q81 92 74 92 L46 92 Q39 92 38 86 Z", top: 44, layers: [{ color: "#5C2E14", from: 52, to: 92 }] },
  renverse: { glass: true, body: "M40 30 L80 30 L77 92 L43 92 Z", top: 30, layers: [{ color: "#E8D2B0", from: 44, to: 92 }, { color: "#B07A45", from: 70, to: 92 }] },
  galao: { glass: true, body: "M44 14 L76 14 L74 92 L46 92 Z", top: 14, layers: [{ color: "#EFE0C6", from: 24, to: 92 }, { color: "#C8965E", from: 50, to: 92 }, { color: "#8E5A2C", from: 76, to: 92 }] },
  cappuccino: { glass: false, body: "M30 46 L90 46 L85 86 Q84 92 76 92 L44 92 Q36 92 35 86 Z", top: 46, layers: [{ color: "#8E5A2C", from: 58, to: 92 }], cap: "foam" },
  viennois: { glass: true, body: "M38 38 L82 38 L79 92 L41 92 Z", top: 38, layers: [{ color: "#3B1D0D", from: 52, to: 92 }], cap: "cream" },
  latte: { glass: true, body: "M44 10 L76 10 L74 92 L46 92 Z", top: 10, layers: [{ color: "#F4E7D2", from: 18, to: 92 }, { color: "#B07A45", from: 46, to: 62 }, { color: "#EFE0C6", from: 62, to: 92 }] },
  tea: { glass: false, body: "M32 48 L88 48 L84 86 Q83 92 75 92 L45 92 Q37 92 36 86 Z", top: 48, layers: [{ color: "#B5651D", from: 56, to: 92 }] },
};

export function CupDrawing({ kind, fill = 1, size = 120, className }: { kind: CupKind; fill?: number; size?: number; className?: string }) {
  const cup = CUPS[kind];
  const id = `cup-${kind}`;
  return (
    <svg width={size} height={size} viewBox="0 0 120 110" aria-hidden="true" className={className}>
      <defs>
        <clipPath id={id}>
          <path d={cup.body} />
        </clipPath>
      </defs>
      <ellipse cx="60" cy="98" rx="38" ry="5" fill="rgb(42 26 18 / 0.12)" />
      {!cup.glass && <path d="M22 96 L98 96" stroke="#2A1A12" strokeWidth="2.6" strokeLinecap="round" />}
      <g clipPath={`url(#${id})`}>
        <g className="cup-liquid" style={{ transform: `scaleY(${fill})`, transformOrigin: "60px 92px", transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
          {cup.layers.map((l, i) => (
            <rect key={i} x="0" y={l.from} width="120" height={l.to - l.from} fill={l.color} />
          ))}
          {cup.cap === "foam" && <ellipse cx="60" cy="58" rx="30" ry="7" fill="#F7EBD9" />}
          {cup.cap === "cream" && <path d="M40 52 Q46 30 60 34 Q74 30 80 52 Z" fill="#FFF8EC" />}
        </g>
      </g>
      {cup.cap === "foam" && (
        <g style={{ opacity: fill > 0.85 ? 1 : 0, transition: "opacity 0.4s" }}>
          <path d="M50 54 q10 6 20 0" stroke="#C68A4A" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      )}
      {cup.cap === "cream" && (
        <g style={{ opacity: fill > 0.85 ? 1 : 0, transition: "opacity 0.4s" }}>
          <path d="M44 38 Q52 18 60 24 Q70 14 76 38 Z" fill="#FFF8EC" stroke="#E7D7BC" strokeWidth="1.5" />
        </g>
      )}
      <path d={cup.body} fill={cup.glass ? "rgb(255 255 255 / 0.18)" : "none"} stroke="#2A1A12" strokeWidth="2.6" strokeLinejoin="round" />
      {!cup.glass && <path d={`M${kind === "cappuccino" ? 88 : 82} ${cup.top + 8} q14 2 10 16 q-3 8 -12 8`} fill="none" stroke="#2A1A12" strokeWidth="2.6" strokeLinecap="round" />}
      {cup.glass && <path d={`M${kind === "galao" || kind === "latte" ? 50 : 46} ${cup.top + 8} L${kind === "galao" || kind === "latte" ? 49 : 45} 84`} stroke="rgb(255 255 255 / 0.7)" strokeWidth="2.4" strokeLinecap="round" />}
    </svg>
  );
}

/** A coffee cup with steam strands, for the tea room and the story. */
export function SteamingCup({ size = 140, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 140 140" aria-hidden="true" className={className}>
      <g className="steam" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.7">
        <path d="M56 54 c-8 -10 8 -16 0 -28" />
        <path d="M70 52 c-8 -10 8 -16 0 -30" />
        <path d="M84 54 c-8 -10 8 -16 0 -28" />
      </g>
      <ellipse cx="70" cy="118" rx="50" ry="7" fill="rgb(42 26 18 / 0.12)" />
      <path d="M24 114 L116 114" stroke="#2A1A12" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M36 66 L104 66 L98 102 Q96 110 87 110 L53 110 Q44 110 42 102 Z" fill="#FBF6EC" stroke="#2A1A12" strokeWidth="3.5" strokeLinejoin="round" />
      <ellipse cx="70" cy="68" rx="31" ry="4" fill="#3B1D0D" />
      <path d="M104 72 q18 2 13 20 q-4 9 -17 9" fill="none" stroke="#2A1A12" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M48 84 q22 8 44 0" fill="none" stroke="#D4932B" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
