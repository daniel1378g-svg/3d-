// Flat, original illustrations in the palette: they play the part of HOY!'s chili and lime.
// All decorative (aria-hidden); the information always sits in the text next to them.
import type { CSSProperties } from "react";

const C = {
  oceano: "#0C1B2A",
  sal: "#F3EDE2",
  branco: "#FFFAF2",
  tinta: "#1A1614",
  azulejo: "#1F4E99",
  espuma: "#CFE0EA",
  dourado: "#F2C05A",
  coral: "#A22E1E",
  vinho: "#5A1626",
  cortica: "#8A5A32",
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
