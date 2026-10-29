// Flat illustrations in the palette, drawn for this site: the woodpecker and a small set of Portuguese
// things (azulejo tile, cork, glass of port, tram, steaming pot), plus the two classics that have no
// photo yet (Francesinha, Carne de Porco à Alentejana). All decorative: aria-hidden.
import type { SVGProps } from "react";

const C = {
  noite: "#0b0d10",
  nata: "#f4ecdf",
  branco: "#fffaf2",
  tinta: "#1c1712",
  azulejo: "#1f4e99",
  claro: "#c9daf2",
  dourado: "#f2b84b",
  francesinha: "#c23b26",
  vinho: "#5a1626",
  cortica: "#8a5a32",
  corkLight: "#c8955f",
  corkTop: "#ddb07c",
};
type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({ "aria-hidden": true as const, focusable: false as const, ...p });

/** The woodpecker on a trunk. The head group (class "wp-head") pivots at the neck for the knock. */
export function Woodpecker(p: P) {
  return (
    <svg viewBox="0 0 220 210" {...base(p)}>
      <rect x="160" y="0" width="52" height="210" rx="6" fill={C.cortica} />
      <path d="M172 10 V70 M186 30 V120 M198 4 V60 M176 110 V200 M196 140 V206" stroke="#6b4223" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="190" cy="92" rx="5" ry="7" fill={C.tinta} />
      <path d="M116 150 L152 200 L140 205 L106 160 Z" fill={C.tinta} />
      <g transform="rotate(-18 110 112)">
        <ellipse cx="110" cy="112" rx="34" ry="54" fill={C.tinta} />
        <ellipse cx="116" cy="124" rx="18" ry="38" fill={C.branco} opacity="0.95" />
        <path d="M84 96 h22 M82 110 h26 M84 124 h22 M88 138 h18" stroke={C.branco} strokeWidth="5" strokeLinecap="round" />
      </g>
      <path d="M150 134 l12 -4 M150 146 l12 -2" stroke={C.dourado} strokeWidth="5" strokeLinecap="round" />
      <g className="wp-head" style={{ transformOrigin: "118px 74px", transformBox: "view-box" }}>
        <circle cx="124" cy="54" r="26" fill={C.tinta} />
        <path d="M100 48 C102 24 140 20 150 40 C138 34 116 34 100 48 Z" fill={C.francesinha} />
        <ellipse cx="128" cy="62" rx="17" ry="7" fill={C.branco} />
        <circle cx="134" cy="47" r="5" fill={C.branco} />
        <circle cx="135" cy="47" r="2.4" fill={C.tinta} />
        <path d="M146 46 L178 54 L146 62 Z" fill={C.dourado} />
      </g>
    </svg>
  );
}

export function AzulejoTile(p: P) {
  return (
    <svg viewBox="0 0 120 120" {...base(p)}>
      <rect x="2" y="2" width="116" height="116" rx="8" fill={C.branco} />
      <rect x="9" y="9" width="102" height="102" rx="4" fill="none" stroke={C.azulejo} strokeWidth="5" />
      {[0, 90, 180, 270].map((r) => (
        <g key={r} transform={`rotate(${r} 60 60)`}>
          <path d="M60 22 C72 34 72 44 60 50 C48 44 48 34 60 22 Z" fill={C.azulejo} />
          <path d="M9 9 Q30 12 26 30 Q12 32 9 9 Z" fill={C.claro} />
          <circle cx="60" cy="16" r="3" fill={C.azulejo} />
        </g>
      ))}
      <circle cx="60" cy="60" r="11" fill={C.dourado} />
      <circle cx="60" cy="60" r="4.5" fill={C.azulejo} />
    </svg>
  );
}

export function Cork(p: P) {
  return (
    <svg viewBox="0 0 120 160" {...base(p)}>
      <g transform="rotate(-14 60 80)">
        <path d="M30 34 L90 34 L86 138 C86 148 34 148 34 138 Z" fill={C.corkLight} />
        <path d="M30 34 L42 34 L44 140 C40 142 36 141 34 138 Z" fill={C.cortica} opacity="0.35" />
        {[
          [52, 60, 3], [70, 52, 2.2], [62, 84, 2.6], [46, 104, 2], [74, 98, 3], [58, 122, 2.4], [76, 124, 1.8], [50, 76, 1.6],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={C.cortica} />
        ))}
        <ellipse cx="60" cy="34" rx="30" ry="9" fill={C.corkTop} />
        <ellipse cx="60" cy="34" rx="18" ry="5" fill="none" stroke={C.cortica} strokeWidth="2" />
      </g>
    </svg>
  );
}

export function PortGlass(p: P) {
  return (
    <svg viewBox="0 0 120 180" {...base(p)}>
      <path d="M28 18 L92 18 C96 62 84 92 60 96 C36 92 24 62 28 18 Z" fill={C.branco} opacity="0.3" />
      <path d="M31 48 L89 48 C88 76 78 92 60 94 C42 92 32 76 31 48 Z" fill={C.vinho} />
      <path d="M31 48 L89 48 C80 54 40 54 31 48 Z" fill="#7d2238" />
      <path d="M28 18 L92 18 C96 62 84 92 60 96 C36 92 24 62 28 18 Z" fill="none" stroke={C.branco} strokeWidth="4" strokeLinejoin="round" />
      <path d="M40 26 C38 46 40 62 46 74" stroke={C.branco} strokeWidth="5" strokeLinecap="round" opacity="0.8" />
      <rect x="56" y="96" width="8" height="54" rx="3" fill={C.branco} />
      <ellipse cx="60" cy="156" rx="30" ry="8" fill={C.branco} />
    </svg>
  );
}

export function Tram(p: P) {
  return (
    <svg viewBox="0 0 230 150" {...base(p)}>
      <path d="M70 26 L116 6 M116 6 L150 26" stroke={C.tinta} strokeWidth="4" strokeLinecap="round" />
      <rect x="64" y="24" width="96" height="8" rx="3" fill={C.tinta} />
      <path d="M16 54 C16 40 26 32 40 32 L190 32 C204 32 214 40 214 54 L214 112 C214 118 210 122 204 122 L26 122 C20 122 16 118 16 112 Z" fill={C.dourado} />
      <rect x="16" y="98" width="198" height="10" fill={C.branco} />
      <rect x="16" y="108" width="198" height="14" fill={C.tinta} opacity="0.9" />
      {[30, 70, 110, 150].map((x) => (
        <rect key={x} x={x} y="44" width="32" height="40" rx="6" fill={C.claro} stroke={C.tinta} strokeWidth="3" />
      ))}
      <rect x="188" y="44" width="18" height="40" rx="5" fill={C.claro} stroke={C.tinta} strokeWidth="3" />
      <circle cx="206" cy="94" r="5" fill={C.branco} />
      {[52, 92, 142, 182].map((x) => (
        <circle key={x} cx={x} cy="126" r="12" fill={C.tinta} />
      ))}
      {[52, 92, 142, 182].map((x) => (
        <circle key={`h${x}`} cx={x} cy="126" r="4" fill={C.dourado} />
      ))}
    </svg>
  );
}

export function Pot(p: P) {
  return (
    <svg viewBox="0 0 160 160" {...base(p)}>
      <g stroke={C.branco} strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.9">
        <path d="M56 46 C46 34 66 26 56 12" />
        <path d="M80 42 C70 30 90 22 80 6" />
        <path d="M104 46 C94 34 114 26 104 12" />
      </g>
      <rect x="20" y="62" width="120" height="10" rx="5" fill={C.tinta} />
      <path d="M28 72 L132 72 L126 132 C125 142 118 146 108 146 L52 146 C42 146 35 142 34 132 Z" fill={C.francesinha} />
      <path d="M28 72 L132 72 L131 84 L29 84 Z" fill={C.vinho} opacity="0.6" />
      <path d="M28 88 C10 88 10 108 28 106 M132 88 C150 88 150 108 132 106" stroke={C.tinta} strokeWidth="7" fill="none" strokeLinecap="round" />
      <ellipse cx="80" cy="58" rx="40" ry="8" fill={C.tinta} />
      <rect x="72" y="44" width="16" height="10" rx="4" fill={C.tinta} />
    </svg>
  );
}

/** The small azulejo star used between marquee items. */
export function Star(p: P) {
  return (
    <svg viewBox="0 0 40 40" {...base(p)}>
      <path
        fill="currentColor"
        d="M20 0 C22 10 22 10 26 14 C30 18 30 18 40 20 C30 22 30 22 26 26 C22 30 22 30 20 40 C18 30 18 30 14 26 C10 22 10 22 0 20 C10 18 10 18 14 14 C18 10 18 10 20 0 Z"
      />
      <circle cx="20" cy="20" r="4" fill="currentColor" />
    </svg>
  );
}

/** The Francesinha, with its sauce: the drip (class "fr-drip") runs over the frame on hover or tap. */
export function Francesinha(p: P) {
  return (
    <svg viewBox="0 0 240 220" {...base(p)}>
      <ellipse cx="120" cy="178" rx="108" ry="30" fill={C.branco} />
      <ellipse cx="120" cy="174" rx="92" ry="22" fill="#d9542e" />
      <ellipse cx="104" cy="170" rx="30" ry="6" fill="#ec7a4a" opacity="0.6" />
      <path d="M58 150 L182 150 L178 164 L62 164 Z" fill="#e8c48a" />
      <path d="M60 132 L180 132 L182 150 L58 150 Z" fill={C.vinho} />
      <path d="M62 126 C80 120 100 136 120 128 C140 120 160 136 178 126 L180 134 L60 134 Z" fill="#e2895a" />
      <path d="M58 108 L182 108 L180 126 L60 126 Z" fill="#efd3a0" />
      <path d="M52 94 C60 84 180 84 188 94 L190 108 C178 112 172 128 166 110 C156 116 150 132 142 110 C130 114 124 134 114 110 C104 116 98 126 92 110 C80 114 74 124 68 108 C62 112 56 112 50 106 Z" fill={C.dourado} />
      <path d="M84 84 C80 72 96 66 108 70 C118 62 140 64 146 74 C160 76 162 90 148 94 C130 100 96 98 84 84 Z" fill={C.branco} />
      <ellipse cx="124" cy="80" rx="13" ry="10" fill="#f6a623" />
      <path d="M70 96 C90 104 98 92 120 100 C140 108 156 94 176 100" stroke="#d9542e" strokeWidth="9" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function FrancesinhaDrip(p: P) {
  return (
    <svg viewBox="0 0 400 140" preserveAspectRatio="none" {...base(p)}>
      <path
        className="fr-drip"
        fill="#d9542e"
        d="M0 0 H400 V18 C388 18 384 54 372 54 C360 54 362 22 346 22 C330 22 334 92 316 92 C298 92 304 26 284 26 C268 26 270 44 256 44 C242 44 246 18 228 18 C212 18 214 120 196 120 C178 120 186 30 166 30 C150 30 154 60 140 60 C126 60 128 22 110 22 C94 22 98 76 80 76 C62 76 68 24 50 24 C36 24 38 40 24 40 C12 40 12 18 0 18 Z"
      />
    </svg>
  );
}

/** Carne de Porco à Alentejana: pork, clams and diced potatoes in the pan. */
export function Alentejana(p: P) {
  const cubes: [number, number, string][] = [
    [74, 88, "#b8743a"], [100, 78, C.dourado], [128, 86, "#b8743a"], [152, 76, C.dourado], [88, 104, C.dourado], [116, 102, "#a7652f"], [142, 100, C.dourado], [168, 94, "#b8743a"],
  ];
  return (
    <svg viewBox="0 0 260 180" {...base(p)}>
      <g stroke={C.branco} strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.85">
        <path d="M96 40 C86 28 106 20 96 6" />
        <path d="M130 36 C120 24 140 16 130 2" />
        <path d="M164 40 C154 28 174 20 164 6" />
      </g>
      <path d="M200 104 L252 92" stroke={C.tinta} strokeWidth="14" strokeLinecap="round" />
      <ellipse cx="120" cy="104" rx="98" ry="52" fill={C.tinta} />
      <ellipse cx="120" cy="98" rx="86" ry="40" fill="#6b4223" />
      {cubes.map(([x, y, f], i) => (
        <rect key={i} x={x - 11} y={y - 9} width="22" height="18" rx="4" fill={f} transform={`rotate(${(i % 3) * 12 - 10} ${x} ${y})`} />
      ))}
      {[
        [62, 98, -20], [110, 116, 10], [158, 116, -8], [182, 104, 22], [100, 90, 0],
      ].map(([x, y, r], i) => (
        <g key={`c${i}`} transform={`rotate(${r} ${x} ${y})`}>
          <path d={`M${x - 14} ${y} C${x - 14} ${y - 16} ${x + 14} ${y - 16} ${x + 14} ${y} Z`} fill={C.nata} />
          <path d={`M${x - 8} ${y - 1} L${x - 5} ${y - 9} M${x} ${y - 1} L${x} ${y - 11} M${x + 8} ${y - 1} L${x + 5} ${y - 9}`} stroke={C.cortica} strokeWidth="1.6" />
        </g>
      ))}
    </svg>
  );
}

/** The sun, for the terrace badge. */
export function Sun(p: P) {
  return (
    <svg viewBox="0 0 48 48" {...base(p)}>
      <circle cx="24" cy="24" r="9" fill="currentColor" />
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d="M24 4 V10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" transform={`rotate(${i * 45} 24 24)`} />
      ))}
    </svg>
  );
}
