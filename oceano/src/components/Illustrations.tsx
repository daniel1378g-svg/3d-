// Flat, original illustrations in the palette: they play the part of HOY!'s chili and lime.
// All decorative (aria-hidden); the information always sits in the text next to them.
import type { CSSProperties } from "react";

const C = {
  oceano: "#1B1B1B", // marca-escura
  sal: "#FBFAF5", // fundo
  branco: "#FFFFFF",
  tinta: "#1B1B1B",
  azulejo: "#6E6140", // marca
  espuma: "#F3F2E1", // suave
  dourado: "#DFCE9B", // destaque
  coral: "#B2A47C", // the site's header khaki
  vinho: "#333333", // acento-escuro
  cortica: "#8C7F5C", // khaki, darker
};
type P = { className?: string; style?: CSSProperties };
const box = (vb: string, p: P, children: React.ReactNode) => (
  <svg aria-hidden="true" focusable="false" viewBox={vb} className={p.className} style={p.style}>
    {children}
  </svg>
);

export const Bacalhau = (p: P) =>
  box(
    "0 0 320 140",
    p,
    <>
      <path d="M110 36 C120 12 142 10 152 33 Z M160 34 C172 10 194 10 202 37 Z M212 41 C224 20 242 22 248 49 Z" fill={C.dourado} stroke={C.vinho} strokeWidth="3" strokeLinejoin="round" />
      <path d="M140 105 C150 124 168 126 177 106 Z M200 103 C210 120 228 120 233 99 Z" fill={C.dourado} stroke={C.vinho} strokeWidth="3" strokeLinejoin="round" />
      <path d="M20 70 C40 40 110 28 180 34 C230 38 262 52 280 66 L310 42 C305 62 305 80 312 100 L280 76 C262 92 230 104 180 106 C110 110 40 100 20 70 Z" fill={C.sal} stroke={C.vinho} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M24 66 C44 44 110 34 180 39 C226 43 258 55 278 68 C250 60 200 56 150 58 C90 60 50 66 24 66 Z" fill={C.dourado} opacity="0.85" />
      <path d="M70 50 C80 64 80 80 70 94" fill="none" stroke={C.vinho} strokeWidth="3" strokeLinecap="round" />
      <path d="M36 84 C34 92 32 97 27 102" fill="none" stroke={C.vinho} strokeWidth="3" strokeLinecap="round" />
      <path d="M60 78 C120 74 200 74 270 74" fill="none" stroke={C.cortica} strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx="50" cy="62" r="6" fill={C.tinta} />
      <circle cx="52" cy="60" r="1.8" fill={C.branco} />
      {[[110, 50], [140, 47], [170, 49], [200, 51], [128, 60], [186, 60], [225, 57]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.2" fill={C.cortica} opacity="0.7" />
      ))}
    </>,
  );

export const Sardine = (p: P) =>
  box(
    "0 0 240 80",
    p,
    <>
      <path d="M10 40 C40 16 120 12 180 26 L228 8 C221 30 221 50 228 72 L180 54 C120 68 40 64 10 40 Z" fill={C.espuma} stroke={C.oceano} strokeWidth="3" strokeLinejoin="round" />
      <path d="M14 38 C44 20 120 16 182 30 C130 30 70 32 14 38 Z" fill={C.azulejo} />
      <path d="M40 30 C46 38 46 46 40 52" fill="none" stroke={C.oceano} strokeWidth="2.5" strokeLinecap="round" />
      {[70, 90, 110, 130, 150].map((x) => (
        <circle key={x} cx={x} cy="42" r="2.4" fill={C.azulejo} opacity="0.55" />
      ))}
      <circle cx="26" cy="38" r="4.5" fill={C.oceano} />
      <circle cx="27.5" cy="36.5" r="1.4" fill={C.branco} />
    </>,
  );

export const Octopus = (p: P) =>
  box(
    "0 0 200 200",
    p,
    <>
      {[
        "M62 112 C40 130 28 156 44 170 C56 180 70 168 62 156",
        "M80 118 C70 146 72 176 92 182 C104 185 108 170 98 164",
        "M100 120 C100 150 112 178 132 176 C144 174 142 160 132 158",
        "M120 116 C132 140 152 160 168 150 C178 142 170 130 160 134",
        "M136 106 C156 112 180 108 184 92 C186 82 174 80 170 90",
        "M60 104 C40 104 18 96 16 80 C15 70 28 70 30 80",
      ].map((d, i) => (
        <path key={i} d={d} fill="none" stroke={C.coral} strokeWidth="14" strokeLinecap="round" />
      ))}
      <path d="M52 108 C40 60 66 22 102 22 C138 22 160 60 148 108 C130 122 70 122 52 108 Z" fill={C.coral} />
      <path d="M72 56 C76 44 86 36 96 34" fill="none" stroke={C.branco} strokeWidth="5" strokeLinecap="round" opacity="0.45" />
      <circle cx="84" cy="82" r="9" fill={C.branco} />
      <circle cx="120" cy="82" r="9" fill={C.branco} />
      <circle cx="86" cy="84" r="4.5" fill={C.tinta} />
      <circle cx="118" cy="84" r="4.5" fill={C.tinta} />
      {[[46, 160], [88, 172], [126, 166], [160, 142], [176, 96], [24, 82]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={C.sal} />
      ))}
    </>,
  );

export const Prawn = (p: P) =>
  box(
    "0 0 200 160",
    p,
    <>
      <path d="M150 40 C170 20 186 14 196 6 M150 46 C172 34 186 34 198 28" fill="none" stroke={C.coral} strokeWidth="3" strokeLinecap="round" />
      <path d="M150 44 C110 26 54 40 40 84 C30 116 54 142 86 140 L80 156 L104 150 L100 132 C80 130 66 116 70 96 C76 70 110 60 146 70 Z" fill={C.coral} />
      {["M120 44 C112 60 112 70 118 80", "M98 46 C88 64 88 78 96 88", "M76 56 C66 74 68 90 76 100", "M60 74 C52 92 56 106 66 114"].map((d, i) => (
        <path key={i} d={d} fill="none" stroke={C.sal} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      ))}
      <path d="M150 44 C156 52 156 62 146 70" fill={C.coral} stroke={C.vinho} strokeWidth="2" />
      <circle cx="146" cy="52" r="4" fill={C.tinta} />
      {[[110, 84], [96, 92], [82, 100], [72, 110]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} l-6 14`} stroke={C.coral} strokeWidth="3" strokeLinecap="round" />
      ))}
    </>,
  );

export const Clam = (p: P) =>
  box(
    "0 0 160 140",
    p,
    <>
      <path d="M80 130 C34 128 8 96 12 64 C16 30 44 10 80 10 C116 10 144 30 148 64 C152 96 126 128 80 130 Z" fill={C.sal} stroke={C.cortica} strokeWidth="4" />
      {[-60, -36, -12, 12, 36, 60].map((x) => (
        <path key={x} d={`M80 126 C${80 + x * 0.4} 90 ${80 + x * 0.9} 50 ${80 + x} 16`} fill="none" stroke={C.cortica} strokeWidth="3" opacity="0.7" strokeLinecap="round" />
      ))}
      <path d="M60 128 L64 138 L96 138 L100 128 Z" fill={C.cortica} />
    </>,
  );

export const PortGlass = (p: P) =>
  box(
    "0 0 120 200",
    p,
    <>
      <path d="M26 20 L94 20 C96 70 86 104 60 108 C34 104 24 70 26 20 Z" fill={C.branco} opacity="0.25" stroke={C.branco} strokeWidth="4" />
      <path d="M30 52 L90 52 C88 84 78 100 60 102 C42 100 32 84 30 52 Z" fill={C.vinho} />
      <path d="M38 58 C40 76 46 88 54 94" fill="none" stroke={C.coral} strokeWidth="4" strokeLinecap="round" opacity="0.6" />
      <path d="M60 108 L60 170" stroke={C.branco} strokeWidth="5" />
      <path d="M30 176 C40 168 80 168 90 176 Z" fill={C.branco} />
    </>,
  );

export const Cork = (p: P) =>
  box(
    "0 0 120 170",
    p,
    <>
      <path d="M22 26 L98 26 L92 150 C80 158 40 158 28 150 Z" fill={C.cortica} />
      <ellipse cx="60" cy="26" rx="38" ry="12" fill="#a77446" />
      <ellipse cx="60" cy="26" rx="24" ry="6" fill="none" stroke={C.vinho} strokeWidth="2" opacity="0.5" />
      {[[40, 60], [70, 74], [52, 96], [80, 112], [44, 128], [66, 138], [78, 50], [36, 104]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 4 : 2.6} fill="#5e3b1f" opacity="0.65" />
      ))}
    </>,
  );

/** An azulejo tile; `tone` sets the pattern colour. */
export const Tile = ({ tone = C.azulejo, bg = C.branco, ...p }: P & { tone?: string; bg?: string }) =>
  box(
    "0 0 120 120",
    p,
    <>
      <rect x="2" y="2" width="116" height="116" rx="6" fill={bg} />
      <g fill="none" stroke={tone} strokeWidth="5" strokeLinecap="round">
        <circle cx="60" cy="60" r="22" />
        <path d="M60 4 v20 M60 96 v20 M4 60 h20 M96 60 h20" />
        <path d="M6 6 q26 0 30 30 M114 6 q-26 0 -30 30 M6 114 q26 0 30 -30 M114 114 q-26 0 -30 -30" />
      </g>
      <path d="M60 42 l6 12 l12 6 l-12 6 l-6 12 l-6 -12 l-12 -6 l12 -6 z" fill={tone} />
    </>,
  );

/** The small eight-point azulejo star used between marquee items. */
export const Star = ({ fill = "currentColor", ...p }: P & { fill?: string }) =>
  box("0 0 40 40", p, <path d="M20 2 l4.6 8.9 9.8-2.3-2.3 9.8L41 20l-8.9 4.6 2.3 9.8-9.8-2.3L20 38l-4.6-8.9-9.8 2.3 2.3-9.8L-1 20l8.9-4.6-2.3-9.8 9.8 2.3z" fill={fill} transform="scale(.95) translate(1 1)" />);

export const Tram = (p: P) =>
  box(
    "0 0 280 150",
    p,
    <>
      <path d="M110 20 L140 6 L170 20" fill="none" stroke={C.tinta} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="130" y="20" width="22" height="8" rx="2" fill={C.tinta} />
      <path d="M16 46 C16 34 26 28 40 28 L240 28 C254 28 266 34 270 48 L274 112 C274 118 270 122 264 122 L22 122 C16 122 12 118 12 112 Z" fill={C.coral} />
      <rect x="12" y="92" width="262" height="12" fill={C.branco} />
      {[34, 82, 130, 178, 226].map((x) => (
        <rect key={x} x={x} y="42" width="38" height="36" rx="5" fill={C.espuma} />
      ))}
      <rect x="252" y="42" width="16" height="40" rx="5" fill={C.espuma} />
      <text x="40" y="117" fontFamily="Barlow Condensed, sans-serif" fontWeight="800" fontSize="15" fill={C.branco}>
        15 · UNIMAIL
      </text>
      {[56, 92, 194, 230].map((x) => (
        <circle key={x} cx={x} cy="128" r="11" fill={C.tinta} stroke={C.sal} strokeWidth="4" />
      ))}
      <path d="M0 142 L280 142" stroke={C.tinta} strokeWidth="4" />
    </>,
  );

export const Sprig = ({ leaf = C.dourado, stem = C.cortica, ...p }: P & { leaf?: string; stem?: string }) =>
  box(
    "0 0 120 200",
    p,
    <>
      <path d="M60 196 C58 150 62 90 72 20" fill="none" stroke={stem} strokeWidth="5" strokeLinecap="round" />
      {[
        [62, 160, -1],
        [63, 128, 1],
        [65, 98, -1],
        [68, 70, 1],
        [70, 44, -1],
      ].map(([x, y, s], i) => (
        <path key={i} d={`M${x} ${y} C${x + s * 22} ${y - 30} ${x + s * 46} ${y - 20} ${x + s * 48} ${y - 6} C${x + s * 34} ${y + 4} ${x + s * 14} ${y + 2} ${x} ${y} Z`} fill={leaf} />
      ))}
      <path d="M72 20 C68 8 76 2 84 4 C86 12 80 20 72 20 Z" fill={leaf} />
    </>,
  );

/** One long octopus arm that curls over the frame of the Polvo. */
export const Tentacle = (p: P) =>
  box(
    "0 0 260 220",
    p,
    <>
      <path d="M10 210 C30 140 80 70 150 52 C210 38 250 70 236 112 C226 140 192 140 186 118 C181 100 198 92 208 100" fill="none" stroke={C.coral} strokeWidth="30" strokeLinecap="round" />
      <path d="M22 196 C44 136 88 82 150 66 C200 54 232 80 222 108" fill="none" stroke={C.sal} strokeWidth="7" strokeLinecap="round" strokeDasharray="0.1 22" />
    </>,
  );

/** Two glasses clinking: "entre amigos", among friends. */
export const Glasses = (p: P) =>
  box(
    "0 0 220 200",
    p,
    <>
      <g transform="rotate(-14 70 110)">
        <path d="M40 30 H100 C102 70 92 96 70 100 C48 96 38 70 40 30 Z" fill={C.branco} stroke={C.oceano} strokeWidth="4" strokeLinejoin="round" />
        <path d="M43 58 H97 C95 82 86 94 70 96 C54 94 45 82 43 58 Z" fill={C.coral} />
        <path d="M70 100 V160 M48 164 H92" stroke={C.oceano} strokeWidth="5" strokeLinecap="round" />
      </g>
      <g transform="rotate(14 150 110)">
        <path d="M120 30 H180 C182 70 172 96 150 100 C128 96 118 70 120 30 Z" fill={C.branco} stroke={C.oceano} strokeWidth="4" strokeLinejoin="round" />
        <path d="M123 62 H177 C175 84 166 94 150 96 C134 94 125 84 123 62 Z" fill={C.dourado} />
        <path d="M150 100 V160 M128 164 H172" stroke={C.oceano} strokeWidth="5" strokeLinecap="round" />
      </g>
      <path d="M110 14 V0 M96 20 L88 8 M124 20 L132 8" stroke={C.dourado} strokeWidth="4" strokeLinecap="round" />
    </>,
  );

/** A low sun over a wave: the "évasion". */
export const SunWave = (p: P) =>
  box(
    "0 0 240 160",
    p,
    <>
      <circle cx="120" cy="88" r="52" fill={C.dourado} />
      <path d="M0 96 C30 80 60 80 90 96 C120 112 150 112 180 96 C200 86 220 84 240 92 V160 H0 Z" fill={C.azulejo} />
      <path d="M0 122 C30 108 60 108 90 122 C120 136 150 136 180 122 C200 112 220 112 240 118" fill="none" stroke={C.espuma} strokeWidth="5" strokeLinecap="round" />
    </>,
  );

/** A beach umbrella. */
export const Umbrella = (p: P) =>
  box(
    "0 0 200 200",
    p,
    <>
      <path d="M100 40 L104 190" stroke={C.oceano} strokeWidth="6" strokeLinecap="round" />
      <path d="M14 96 C24 46 62 22 100 22 C138 22 176 46 186 96 C164 84 144 84 122 96 C108 84 92 84 78 96 C56 84 36 84 14 96 Z" fill={C.coral} />
      <path d="M78 96 C80 60 88 34 100 22 C112 34 120 60 122 96 C108 84 92 84 78 96 Z" fill={C.branco} />
    </>,
  );

/** A grilled chicken leg. */
export const Chicken = (p: P) =>
  box(
    "0 0 200 160",
    p,
    <>
      <path d="M40 92 C30 50 70 18 112 26 C152 34 170 74 150 104 C134 128 96 132 74 118 Z" fill={C.cortica} stroke={C.oceano} strokeWidth="4" strokeLinejoin="round" />
      <path d="M70 60 L120 52 M66 80 L128 72 M80 100 L132 92" stroke={C.oceano} strokeWidth="5" strokeLinecap="round" opacity="0.55" />
      <path d="M74 118 L40 146" stroke={C.branco} strokeWidth="14" strokeLinecap="round" />
      <circle cx="34" cy="146" r="10" fill={C.branco} />
      <circle cx="44" cy="154" r="9" fill={C.branco} />
    </>,
  );

/** A francesinha: layers of bread, meats and melted cheese, an egg on top, sauce around. */
export const Francesinha = (p: P) =>
  box(
    "0 0 240 180",
    p,
    <>
      <ellipse cx="120" cy="150" rx="110" ry="24" fill={C.coral} />
      <rect x="44" y="92" width="152" height="40" rx="10" fill={C.dourado} stroke={C.oceano} strokeWidth="4" />
      <rect x="50" y="76" width="140" height="18" rx="6" fill={C.coral} />
      <path d="M40 76 C60 52 180 52 200 76 C190 84 50 84 40 76 Z" fill={C.dourado} stroke={C.oceano} strokeWidth="4" strokeLinejoin="round" />
      <path d="M40 76 C46 94 54 98 60 86 C66 100 76 102 82 88 C90 104 100 104 106 88 C114 104 126 104 132 88 C140 102 150 102 156 86 C164 98 174 98 180 86 C188 96 196 92 200 76" fill={C.branco} opacity="0.95" />
      <ellipse cx="120" cy="52" rx="38" ry="18" fill={C.branco} stroke={C.oceano} strokeWidth="3" />
      <circle cx="120" cy="50" r="11" fill={C.dourado} />
    </>,
  );

/** The sauce that drips over the frame on the Francesinha. */
export const SauceDrip = (p: P) =>
  box(
    "0 0 300 120",
    p,
    <path d="M0 0 H300 V26 C292 26 290 56 282 56 C274 56 274 30 262 30 C250 30 252 88 238 88 C224 88 228 34 212 34 C198 34 202 62 188 62 C176 62 178 28 164 28 C150 28 154 100 138 100 C122 100 128 32 112 32 C98 32 100 58 88 58 C76 58 80 28 66 28 C52 28 56 74 42 74 C28 74 32 26 18 26 C8 26 6 40 0 40 Z" fill={C.coral} />,
  );

/** A fondue pot on its burner (the live fondue photo is stock). */
export const FonduePot = (p: P) =>
  box(
    "0 0 220 200",
    p,
    <>
      <path d="M150 40 L196 8" stroke={C.oceano} strokeWidth="5" strokeLinecap="round" />
      <path d="M130 36 L172 2" stroke={C.oceano} strokeWidth="5" strokeLinecap="round" />
      <circle cx="194" cy="10" r="8" fill={C.dourado} />
      <ellipse cx="110" cy="64" rx="84" ry="18" fill={C.dourado} />
      <path d="M26 64 C26 120 60 140 110 140 C160 140 194 120 194 64" fill={C.coral} stroke={C.oceano} strokeWidth="4" />
      <path d="M194 74 H214" stroke={C.oceano} strokeWidth="8" strokeLinecap="round" />
      <path d="M60 140 L44 186 M160 140 L176 186 M40 186 H180" stroke={C.oceano} strokeWidth="5" strokeLinecap="round" />
      <path d="M96 160 C90 150 104 146 98 136 C112 146 108 156 110 164 C104 166 98 164 96 160 Z" fill={C.dourado} />
    </>,
  );

/** An ice-cream coupe. */
export const IceCream = (p: P) =>
  box(
    "0 0 200 220",
    p,
    <>
      <circle cx="74" cy="70" r="34" fill={C.espuma} stroke={C.oceano} strokeWidth="4" />
      <circle cx="126" cy="70" r="34" fill={C.dourado} stroke={C.oceano} strokeWidth="4" />
      <circle cx="100" cy="42" r="32" fill={C.cortica} stroke={C.oceano} strokeWidth="4" />
      <path d="M30 96 H170 C166 140 140 156 100 156 C60 156 34 140 30 96 Z" fill={C.branco} stroke={C.oceano} strokeWidth="4" strokeLinejoin="round" />
      <path d="M100 156 V196 M70 202 H130" stroke={C.oceano} strokeWidth="6" strokeLinecap="round" />
      <path d="M118 14 L136 0" stroke={C.coral} strokeWidth="6" strokeLinecap="round" />
    </>,
  );

/** A wine bottle. */
export const WineBottle = (p: P) =>
  box(
    "0 0 100 260",
    p,
    <>
      <path d="M40 10 H60 V70 C60 84 84 96 84 124 V244 C84 252 78 256 70 256 H30 C22 256 16 252 16 244 V124 C16 96 40 84 40 70 Z" fill={C.oceano} />
      <rect x="38" y="4" width="24" height="18" rx="3" fill={C.cortica} />
      <rect x="22" y="146" width="56" height="64" rx="6" fill={C.sal} />
      <path d="M32 168 H68 M32 182 H60" stroke={C.coral} strokeWidth="4" strokeLinecap="round" />
    </>,
  );

/** An orange and a pineapple: Sumol's two flavours (the brand itself is not drawn). */
export const Orange = (p: P) =>
  box(
    "0 0 120 120",
    p,
    <>
      <circle cx="60" cy="66" r="48" fill={C.dourado} />
      <circle cx="44" cy="52" r="8" fill={C.branco} opacity="0.5" />
      <path d="M60 18 C62 8 72 2 84 4 C80 16 70 20 60 18 Z" fill={C.azulejo} />
    </>,
  );
export const Pineapple = (p: P) =>
  box(
    "0 0 120 180",
    p,
    <>
      <path d="M60 60 L44 8 L58 38 L62 0 L66 38 L80 8 Z" fill={C.azulejo} />
      <ellipse cx="60" cy="116" rx="40" ry="58" fill={C.dourado} stroke={C.cortica} strokeWidth="4" />
      <path d="M30 86 L90 146 M24 116 L80 172 M40 66 L96 122 M90 86 L30 146 M96 116 L40 172 M80 66 L24 122" stroke={C.cortica} strokeWidth="3" opacity="0.7" />
    </>,
  );

/** A Geneva bus (lines A, 1 and 9 stop nearby). */
export const Bus = (p: P) =>
  box(
    "0 0 260 130",
    p,
    <>
      <rect x="8" y="14" width="244" height="86" rx="14" fill={C.coral} />
      <rect x="20" y="26" width="40" height="34" rx="5" fill={C.espuma} />
      <rect x="68" y="26" width="40" height="34" rx="5" fill={C.espuma} />
      <rect x="116" y="26" width="40" height="34" rx="5" fill={C.espuma} />
      <rect x="164" y="26" width="40" height="34" rx="5" fill={C.espuma} />
      <rect x="212" y="26" width="30" height="58" rx="5" fill={C.espuma} />
      <rect x="20" y="70" width="84" height="18" rx="4" fill={C.dourado} />
      <text x="62" y="84" textAnchor="middle" fontFamily="Barlow Condensed" fontWeight="800" fontSize="15" fill={C.oceano}>A · 1 · 9</text>
      <circle cx="58" cy="104" r="16" fill={C.oceano} />
      <circle cx="58" cy="104" r="6" fill={C.espuma} />
      <circle cx="200" cy="104" r="16" fill={C.oceano} />
      <circle cx="200" cy="104" r="6" fill={C.espuma} />
    </>,
  );

/** A grilled steak with its grill marks (the Picanha has no photo on the live site). */
export const Steak = (p: P) =>
  box(
    "0 0 240 170",
    p,
    <>
      <ellipse cx="120" cy="140" rx="110" ry="22" fill={C.branco} opacity="0.9" />
      <path d="M30 92 C24 54 64 26 120 28 C182 30 220 58 212 96 C206 126 166 136 120 134 C70 132 36 120 30 92 Z" fill={C.coral} stroke={C.oceano} strokeWidth="4" strokeLinejoin="round" />
      <path d="M36 74 C60 44 110 36 150 40" fill="none" stroke={C.branco} strokeWidth="10" strokeLinecap="round" opacity="0.9" />
      <path d="M70 70 L96 112 M108 62 L134 110 M146 62 L170 104" stroke={C.oceano} strokeWidth="7" strokeLinecap="round" opacity="0.7" />
    </>,
  );

/** A pastel de nata: the custard tart with its scorched top in a pleated pastry case. */
export const PastelDeNata = (p: P) =>
  box(
    "0 0 220 170",
    p,
    <>
      <ellipse cx="110" cy="140" rx="100" ry="20" fill={C.branco} opacity="0.9" />
      <path d="M30 100 C26 70 50 52 110 52 C170 52 194 70 190 100 C186 126 160 138 110 138 C60 138 34 126 30 100 Z" fill={C.cortica} stroke={C.oceano} strokeWidth="4" strokeLinejoin="round" />
      <path d="M40 96 L52 60 M60 92 L66 56 M80 90 L84 54 M110 90 V54 M140 90 L136 54 M160 92 L154 56 M180 96 L168 60" stroke={C.oceano} strokeWidth="3" opacity="0.5" strokeLinecap="round" />
      <ellipse cx="110" cy="76" rx="68" ry="22" fill={C.dourado} stroke={C.oceano} strokeWidth="3" />
      <path d="M70 72 C84 64 100 66 112 72 C124 78 140 80 152 74" fill="none" stroke={C.vinho} strokeWidth="7" strokeLinecap="round" opacity="0.75" />
      <circle cx="90" cy="80" r="5" fill={C.vinho} opacity="0.7" />
      <circle cx="136" cy="68" r="4" fill={C.vinho} opacity="0.7" />
    </>,
  );

/** A pair of waves and a low island chain: the Azores. */
export const Azores = (p: P) =>
  box(
    "0 0 260 120",
    p,
    <>
      <path d="M0 80 C30 64 60 64 90 80 C120 96 150 96 180 80 C205 68 230 68 260 78 V120 H0 Z" fill={C.azulejo} />
      <path d="M0 100 C30 88 60 88 90 100 C120 112 150 112 180 100 C205 90 230 90 260 98" fill="none" stroke={C.espuma} strokeWidth="4" strokeLinecap="round" />
      <path d="M40 76 C50 56 74 56 84 76 Z M110 78 C118 62 134 62 142 78 Z M170 74 C182 50 210 50 222 74 Z" fill={C.cortica} stroke={C.oceano} strokeWidth="3" strokeLinejoin="round" />
    </>,
  );

/** A port wine bottle and glass. */
export const PortGlassBottle = (p: P) =>
  box(
    "0 0 200 220",
    p,
    <>
      <path d="M60 10 H84 V56 C84 68 104 78 104 100 V204 C104 212 98 216 90 216 H54 C46 216 40 212 40 204 V100 C40 78 60 68 60 56 Z" fill={C.oceano} />
      <rect x="58" y="4" width="28" height="16" rx="3" fill={C.cortica} />
      <rect x="48" y="124" width="48" height="54" rx="5" fill={C.sal} />
      <path d="M56 142 H88 M56 156 H80" stroke={C.coral} strokeWidth="4" strokeLinecap="round" />
      <path d="M124 110 H180 C178 150 166 168 152 172 C138 168 126 150 124 110 Z" fill={C.branco} stroke={C.oceano} strokeWidth="4" strokeLinejoin="round" />
      <path d="M127 132 H177 C174 156 164 166 152 168 C140 166 130 156 127 132 Z" fill={C.coral} />
      <path d="M152 172 V206 M132 210 H172" stroke={C.oceano} strokeWidth="5" strokeLinecap="round" />
    </>,
  );

/** A moon: open late on Friday and Saturday. */
export const Moon = (p: P) =>
  box(
    "0 0 100 100",
    p,
    <>
      <path d="M62 8 C36 12 18 34 18 56 C18 80 38 96 60 96 C72 96 82 92 90 84 C58 86 36 62 48 24 C52 16 56 11 62 8 Z" fill={C.dourado} stroke={C.oceano} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="80" cy="24" r="3" fill={C.dourado} />
      <circle cx="90" cy="46" r="2" fill={C.dourado} />
    </>,
  );

/** A shopping basket. */
export const Basket = (p: P) =>
  box(
    "0 0 220 170",
    p,
    <>
      <path d="M60 60 L90 14 M160 60 L130 14" stroke={C.oceano} strokeWidth="6" strokeLinecap="round" />
      <path d="M20 60 H200 L180 150 H40 Z" fill={C.cortica} stroke={C.oceano} strokeWidth="4" strokeLinejoin="round" />
      <path d="M50 60 L62 150 M80 60 L86 150 M110 60 V150 M140 60 L134 150 M170 60 L158 150 M28 92 H192 M36 122 H184" stroke={C.oceano} strokeWidth="3" opacity="0.55" />
      <rect x="14" y="54" width="192" height="14" rx="7" fill={C.dourado} stroke={C.oceano} strokeWidth="3" />
    </>,
  );

/** A burger. */
export const Burger = (p: P) =>
  box(
    "0 0 220 190",
    p,
    <>
      <path d="M24 70 C24 30 60 12 110 12 C160 12 196 30 196 70 Z" fill={C.cortica} stroke={C.oceano} strokeWidth="4" strokeLinejoin="round" />
      <circle cx="70" cy="40" r="3" fill={C.sal} /><circle cx="110" cy="30" r="3" fill={C.sal} /><circle cx="150" cy="42" r="3" fill={C.sal} />
      <path d="M20 78 C50 70 80 90 110 78 C140 66 170 86 200 78 L196 94 H24 Z" fill={C.azulejo} />
      <rect x="22" y="92" width="176" height="18" rx="6" fill={C.dourado} stroke={C.oceano} strokeWidth="3" />
      <path d="M28 110 H192 L186 132 H34 Z" fill={C.vinho} stroke={C.oceano} strokeWidth="3" strokeLinejoin="round" />
      <path d="M26 140 C26 132 32 130 40 130 H180 C188 130 194 132 194 140 C194 164 160 176 110 176 C60 176 26 164 26 140 Z" fill={C.cortica} stroke={C.oceano} strokeWidth="4" strokeLinejoin="round" />
    </>,
  );
