// Flat, original illustrations in the palette: they play the part of HOY!'s chili and lime. A charcoal grill,
// a flame, a skewer of picanha, a grilled chicken, a bacalhau, an octopus, a prawn, a crab, a francesinha, an
// alheira, a plate, an azulejo tile and a take-away bag. All decorative (aria-hidden); the information always
// sits in the text next to them.
import type { CSSProperties } from "react";

const C = {
  marca: "#931A25",
  escura: "#310B0A",
  destaque: "#FFCB8E",
  acento: "#E36C6C",
  acentoEscuro: "#6B2B2C",
  fundo: "#F5EFEF",
  branco: "#FFFBE8",
  tinta: "#433C3C",
  suave: "#F6C2BF",
  linha: "#6E6767",
};
type P = { className?: string; style?: CSSProperties };
const box = (vb: string, p: P, children: React.ReactNode) => (
  <svg aria-hidden="true" focusable="false" viewBox={vb} className={p.className} style={p.style}>
    {children}
  </svg>
);

/** A flame: three tongues, apricot inside red. */
export const Flame = ({ outer = C.marca, inner = C.destaque, ...p }: P & { outer?: string; inner?: string }) =>
  box(
    "0 0 120 160",
    p,
    <>
      <path d="M60 156 C24 156 8 128 14 100 C20 72 40 62 38 30 C56 44 62 62 60 78 C70 66 72 44 66 8 C96 30 112 64 108 102 C104 134 88 156 60 156 Z" fill={outer} />
      <path d="M60 150 C40 150 30 134 34 116 C38 98 52 94 50 72 C64 84 68 100 66 112 C74 106 78 94 76 80 C92 96 96 116 92 130 C88 144 76 150 60 150 Z" fill={inner} />
    </>,
  );

/** The charcoal grill at night: a kettle on legs, glowing bars, coals and three flames. */
export const Grill = (p: P) =>
  box(
    "0 0 360 300",
    p,
    <>
      <g transform="translate(60 8) scale(.62)">
        <path d="M60 156 C24 156 8 128 14 100 C20 72 40 62 38 30 C56 44 62 62 60 78 C70 66 72 44 66 8 C96 30 112 64 108 102 C104 134 88 156 60 156 Z" fill={C.marca} />
        <path d="M60 150 C40 150 30 134 34 116 C38 98 52 94 50 72 C64 84 68 100 66 112 C74 106 78 94 76 80 C92 96 96 116 92 130 C88 144 76 150 60 150 Z" fill={C.destaque} />
      </g>
      <g transform="translate(140 -6) scale(.8)">
        <path d="M60 156 C24 156 8 128 14 100 C20 72 40 62 38 30 C56 44 62 62 60 78 C70 66 72 44 66 8 C96 30 112 64 108 102 C104 134 88 156 60 156 Z" fill={C.acento} />
        <path d="M60 150 C40 150 30 134 34 116 C38 98 52 94 50 72 C64 84 68 100 66 112 C74 106 78 94 76 80 C92 96 96 116 92 130 C88 144 76 150 60 150 Z" fill={C.destaque} />
      </g>
      <g transform="translate(232 14) scale(.55)">
        <path d="M60 156 C24 156 8 128 14 100 C20 72 40 62 38 30 C56 44 62 62 60 78 C70 66 72 44 66 8 C96 30 112 64 108 102 C104 134 88 156 60 156 Z" fill={C.marca} />
        <path d="M60 150 C40 150 30 134 34 116 C38 98 52 94 50 72 C64 84 68 100 66 112 C74 106 78 94 76 80 C92 96 96 116 92 130 C88 144 76 150 60 150 Z" fill={C.destaque} />
      </g>
      {/* coals */}
      {[[98, 118], [130, 112], [164, 118], [198, 110], [232, 116], [262, 120], [116, 126], [182, 126], [248, 128]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="20" ry="11" fill={i % 2 ? C.acento : C.marca} />
      ))}
      {/* the kettle */}
      <path d="M40 120 L320 120 C316 190 260 222 180 222 C100 222 44 190 40 120 Z" fill={C.escura} />
      <path d="M58 136 C70 182 116 204 180 204" fill="none" stroke={C.linha} strokeWidth="5" strokeLinecap="round" opacity="0.6" />
      {/* the bars */}
      {[60, 90, 120, 150, 180, 210, 240, 270, 300].map((x) => (
        <rect key={x} x={x - 3} y="110" width="6" height="14" rx="3" fill={C.destaque} />
      ))}
      <rect x="30" y="112" width="300" height="8" rx="4" fill={C.tinta} />
      {/* legs and wheel */}
      <path d="M110 214 L80 292 M250 214 L280 292 M180 222 L180 292" stroke={C.escura} strokeWidth="9" strokeLinecap="round" />
      <circle cx="80" cy="288" r="10" fill={C.tinta} stroke={C.escura} strokeWidth="4" />
      <path d="M96 262 L264 262" stroke={C.escura} strokeWidth="6" strokeLinecap="round" />
    </>,
  );

/** A skewer of picanha: folded slices on a long skewer. */
export const Skewer = (p: P) =>
  box(
    "0 0 320 110",
    p,
    <>
      <path d="M6 56 L314 56" stroke={C.linha} strokeWidth="5" strokeLinecap="round" />
      <circle cx="312" cy="56" r="7" fill={C.tinta} />
      {[50, 104, 158, 212].map((x, i) => (
        <g key={x} transform={`translate(${x} 56) rotate(${i % 2 ? 6 : -6})`}>
          <path d="M-26 -38 C-6 -46 18 -44 28 -34 C34 -12 34 12 28 34 C18 44 -6 46 -26 38 C-34 14 -34 -14 -26 -38 Z" fill={C.marca} />
          <path d="M18 -36 C26 -14 26 14 18 36" fill="none" stroke={C.branco} strokeWidth="9" strokeLinecap="round" />
          {[-20, -4, 12].map((y) => (
            <path key={y} d={`M-22 ${y} L10 ${y + 12}`} stroke={C.escura} strokeWidth="4" strokeLinecap="round" opacity="0.7" />
          ))}
        </g>
      ))}
    </>,
  );

/** A grilled chicken leg. */
export const ChickenLeg = (p: P) =>
  box(
    "0 0 200 160",
    p,
    <>
      <path d="M140 40 C170 18 196 30 190 56 C186 74 166 78 154 70 L120 102 C128 132 104 156 74 150 C38 144 18 112 32 82 C46 52 86 46 112 66 Z" fill={C.acento} />
      <path d="M150 52 L184 30 M156 64 L192 52" stroke={C.branco} strokeWidth="10" strokeLinecap="round" />
      <circle cx="186" cy="28" r="8" fill={C.branco} />
      <circle cx="194" cy="50" r="8" fill={C.branco} />
      {[[60, 90], [78, 110], [96, 88], [56, 120]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} l22 -10`} stroke={C.marca} strokeWidth="6" strokeLinecap="round" />
      ))}
    </>,
  );

/** A salt cod (bacalhau), split and dried. */
export const Bacalhau = (p: P) =>
  box(
    "0 0 320 140",
    p,
    <>
      <path d="M20 70 C40 40 110 28 180 34 C230 38 262 52 280 66 L310 42 C305 62 305 80 312 100 L280 76 C262 92 230 104 180 106 C110 110 40 100 20 70 Z" fill={C.branco} stroke={C.acentoEscuro} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M24 66 C44 44 110 34 180 39 C226 43 258 55 278 68 C250 60 200 56 150 58 C90 60 50 66 24 66 Z" fill={C.destaque} opacity="0.85" />
      <path d="M70 50 C80 64 80 80 70 94" fill="none" stroke={C.acentoEscuro} strokeWidth="3" strokeLinecap="round" />
      <path d="M60 78 C120 74 200 74 270 74" fill="none" stroke={C.linha} strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx="50" cy="62" r="6" fill={C.escura} />
      <circle cx="52" cy="60" r="1.8" fill={C.branco} />
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
        <path key={i} d={d} fill="none" stroke={C.acento} strokeWidth="14" strokeLinecap="round" />
      ))}
      <path d="M52 108 C40 60 66 22 102 22 C138 22 160 60 148 108 C130 122 70 122 52 108 Z" fill={C.acento} />
      <circle cx="84" cy="82" r="9" fill={C.branco} />
      <circle cx="120" cy="82" r="9" fill={C.branco} />
      <circle cx="86" cy="84" r="4.5" fill={C.escura} />
      <circle cx="118" cy="84" r="4.5" fill={C.escura} />
    </>,
  );

export const Prawn = (p: P) =>
  box(
    "0 0 200 160",
    p,
    <>
      <path d="M150 40 C170 20 186 14 196 6 M150 46 C172 34 186 34 198 28" fill="none" stroke={C.acento} strokeWidth="3" strokeLinecap="round" />
      <path d="M150 44 C110 26 54 40 40 84 C30 116 54 142 86 140 L80 156 L104 150 L100 132 C80 130 66 116 70 96 C76 70 110 60 146 70 Z" fill={C.acento} />
      {["M120 44 C112 60 112 70 118 80", "M98 46 C88 64 88 78 96 88", "M76 56 C66 74 68 90 76 100", "M60 74 C52 92 56 106 66 114"].map((d, i) => (
        <path key={i} d={d} fill="none" stroke={C.branco} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      ))}
      <circle cx="146" cy="52" r="4" fill={C.escura} />
    </>,
  );

export const Crab = (p: P) =>
  box(
    "0 0 220 160",
    p,
    <>
      {[-1, 1].map((s) => (
        <g key={s}>
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${110 + s * 50} ${96 + i * 12} C${110 + s * 80} ${100 + i * 16} ${110 + s * 92} ${118 + i * 14} ${110 + s * 96} ${138 + i * 6}`} fill="none" stroke={C.marca} strokeWidth="8" strokeLinecap="round" />
          ))}
          <path d={`M${110 + s * 46} 76 C${110 + s * 70} 60 ${110 + s * 78} 40 ${110 + s * 74} 26`} fill="none" stroke={C.marca} strokeWidth="10" strokeLinecap="round" />
          <path d={`M${110 + s * 74} 30 C${110 + s * 96} 22 ${110 + s * 100} 2 ${110 + s * 84} 2 C${110 + s * 80} 12 ${110 + s * 74} 14 ${110 + s * 66} 10 C${110 + s * 60} 22 ${110 + s * 64} 30 ${110 + s * 74} 30 Z`} fill={C.marca} />
        </g>
      ))}
      <ellipse cx="110" cy="98" rx="62" ry="40" fill={C.acento} />
      <path d="M62 92 C80 80 140 80 158 92" fill="none" stroke={C.branco} strokeWidth="5" strokeLinecap="round" opacity="0.5" />
      <circle cx="96" cy="66" r="6" fill={C.escura} />
      <circle cx="124" cy="66" r="6" fill={C.escura} />
    </>,
  );

/** A francesinha: the sandwich under melted cheese with an egg, in its sauce. */
export const Francesinha = (p: P) =>
  box(
    "0 0 220 170",
    p,
    <>
      <ellipse cx="110" cy="132" rx="104" ry="34" fill={C.branco} />
      <ellipse cx="110" cy="130" rx="86" ry="24" fill={C.acento} />
      <path d="M46 120 L52 66 L168 66 L174 120 Z" fill={C.marca} />
      <path d="M40 72 C40 52 60 46 110 46 C160 46 180 52 180 72 C176 84 168 80 160 92 C150 82 140 94 128 86 C118 98 102 86 92 96 C82 86 70 96 60 86 C54 90 44 86 40 72 Z" fill={C.destaque} />
      <ellipse cx="112" cy="40" rx="40" ry="20" fill={C.branco} />
      <circle cx="116" cy="38" r="12" fill={C.destaque} stroke={C.acento} strokeWidth="3" />
    </>,
  );

/** An alheira: the horseshoe sausage. */
export const Alheira = (p: P) =>
  box(
    "0 0 200 160",
    p,
    <>
      <path d="M40 130 C10 90 30 30 90 22 C150 14 190 60 170 110" fill="none" stroke={C.acentoEscuro} strokeWidth="34" strokeLinecap="round" />
      <path d="M40 130 C10 90 30 30 90 22 C150 14 190 60 170 110" fill="none" stroke={C.marca} strokeWidth="26" strokeLinecap="round" />
      <path d="M48 104 C36 80 46 50 78 40" fill="none" stroke={C.destaque} strokeWidth="5" strokeLinecap="round" opacity="0.7" />
      {[[70, 40], [110, 32], [148, 52], [44, 76]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} l10 16`} stroke={C.escura} strokeWidth="4" strokeLinecap="round" />
      ))}
    </>,
  );

/** A plate seen from above. */
export const Plate = ({ rim = C.branco, well = C.fundo, ...p }: P & { rim?: string; well?: string }) =>
  box(
    "0 0 200 200",
    p,
    <>
      <circle cx="100" cy="100" r="96" fill={rim} />
      <circle cx="100" cy="100" r="66" fill={well} />
      <circle cx="100" cy="100" r="82" fill="none" stroke={C.marca} strokeWidth="2.5" strokeDasharray="2 9" strokeLinecap="round" />
    </>,
  );

/** An azulejo tile; `tone` sets the pattern colour. */
export const Tile = ({ tone = C.marca, bg = C.branco, ...p }: P & { tone?: string; bg?: string }) =>
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

/** A take-away bag with the logo's colours. */
export const Bag = (p: P) =>
  box(
    "0 0 160 200",
    p,
    <>
      <path d="M52 62 C52 22 108 22 108 62" fill="none" stroke={C.escura} strokeWidth="8" strokeLinecap="round" />
      <path d="M20 60 L140 60 L128 190 L32 190 Z" fill={C.destaque} />
      <path d="M20 60 L140 60 L138 82 L22 82 Z" fill={C.marca} />
      <circle cx="80" cy="132" r="26" fill={C.branco} />
      <path d="M70 122 C74 112 86 112 90 122 C96 136 80 150 80 150 C80 150 64 136 70 122 Z" fill={C.marca} />
    </>,
  );

/** A pot with three wisps of steam. */
export const Pot = (p: P) =>
  box(
    "0 0 200 170",
    p,
    <>
      {[70, 100, 130].map((x) => (
        <path key={x} d={`M${x} 52 C${x - 12} 40 ${x + 12} 28 ${x} 10`} fill="none" stroke={C.suave} strokeWidth="6" strokeLinecap="round" />
      ))}
      <rect x="36" y="64" width="128" height="14" rx="7" fill={C.escura} />
      <path d="M44 78 L156 78 L150 150 C150 158 144 164 136 164 L64 164 C56 164 50 158 50 150 Z" fill={C.marca} />
      <path d="M44 96 L20 96 M156 96 L180 96" stroke={C.escura} strokeWidth="10" strokeLinecap="round" />
      <rect x="88" y="54" width="24" height="10" rx="5" fill={C.escura} />
    </>,
  );
