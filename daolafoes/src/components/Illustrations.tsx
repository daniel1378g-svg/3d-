// Flat illustrations in the brand's colours: the suckling pig (from the logo's drawing), the bacalhau, the kid,
// the azulejo tile and the wine jug. Decorative: aria-hidden everywhere.
type P = { className?: string; style?: React.CSSProperties };
const C = { marca: "#513528", escura: "#2B1A12", laranja: "#E04505", acento: "#C93C02", fundo: "#FDF9F6", suave: "#FEEDE5", branco: "#FFFFFF" };

export const Pig = (p: P) => (
  <svg viewBox="0 0 200 110" aria-hidden="true" {...p}>
    <path d="M30 70c-8-2-14-8-14-16 0-9 7-15 16-15h8c6-14 20-24 38-24h40c18 0 32 10 38 24h10c9 0 16 6 16 15 0 8-6 14-14 16l-4 1v8c0 4-3 7-7 7h-6c-4 0-7-3-7-7v-8H70v8c0 4-3 7-7 7h-6c-4 0-7-3-7-7v-9z" fill={C.laranja} />
    <path d="M22 54c-7 1-12 6-12 11 0 3 2 6 5 7" fill="none" stroke={C.escura} strokeWidth="3" strokeLinecap="round" />
    <path d="M176 44c6-3 14-2 18 4" fill="none" stroke={C.escura} strokeWidth="3" strokeLinecap="round" />
    <circle cx="160" cy="48" r="3" fill={C.escura} />
    <ellipse cx="186" cy="60" rx="7" ry="6" fill={C.acento} />
    <circle cx="184" cy="60" r="1.6" fill={C.escura} />
    <circle cx="189" cy="60" r="1.6" fill={C.escura} />
    <path d="M60 18c-2-8-8-12-14-12 4 6 6 10 6 16" fill={C.acento} />
    <path d="M140 18c2-8 8-12 14-12-4 6-6 10-6 16" fill={C.acento} />
  </svg>
);

export const Bacalhau = (p: P) => (
  <svg viewBox="0 0 220 90" aria-hidden="true" {...p}>
    <path d="M18 45c30-30 80-38 130-30l40-18-10 32 10 32-40-18c-50 8-100 0-130-30z" fill={C.fundo} stroke={C.marca} strokeWidth="3" strokeLinejoin="round" />
    <path d="M60 24l-6 16 6 14M90 18l-4 24 6 20M120 16l-2 28 4 24" fill="none" stroke={C.marca} strokeWidth="2" strokeLinecap="round" />
    <circle cx="36" cy="40" r="3.5" fill={C.marca} />
    <path d="M150 36c8 2 14 6 20 12" fill="none" stroke={C.marca} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const Kid = (p: P) => (
  <svg viewBox="0 0 160 120" aria-hidden="true" {...p}>
    <path d="M40 60c0-18 14-30 36-30h30c14 0 24 10 24 24v14l12 8-14 6v10h-12V82H68v10H56V80c-10-2-16-10-16-20z" fill={C.suave} stroke={C.marca} strokeWidth="3" strokeLinejoin="round" />
    <path d="M118 30c8-8 18-10 26-8-4 6-10 10-18 12M106 30c-4-10-2-18 4-22 2 6 2 12 0 18" fill="none" stroke={C.marca} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="112" cy="46" r="3" fill={C.marca} />
    <path d="M124 62c4 2 8 2 12 0" fill="none" stroke={C.marca} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const Tile = ({ tone = C.marca, bg = C.fundo, className, style }: P & { tone?: string; bg?: string }) => (
  <svg viewBox="0 0 64 64" aria-hidden="true" className={className} style={style}>
    <rect width="64" height="64" rx="4" fill={bg} />
    <path d="M32 6l6 20 20 6-20 6-6 20-6-20-20-6 20-6z" fill={tone} />
    <circle cx="32" cy="32" r="6" fill={bg} />
    <path d="M4 4l10 10M60 4 50 14M4 60l10-10M60 60 50 50" stroke={tone} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const Jug = (p: P) => (
  <svg viewBox="0 0 100 130" aria-hidden="true" {...p}>
    <path d="M36 14h28l4 14c14 10 22 24 22 44 0 28-18 46-40 46S10 100 10 72c0-20 8-34 22-44z" fill={C.marca} />
    <path d="M22 44c10-6 36-6 50 0" fill="none" stroke={C.fundo} strokeWidth="3" strokeLinecap="round" opacity=".7" />
    <path d="M70 60c10 2 16 10 16 22s-6 20-16 22" fill="none" stroke={C.marca} strokeWidth="6" strokeLinecap="round" />
    <rect x="30" y="4" width="40" height="12" rx="4" fill={C.laranja} />
    <path d="M36 84c6 8 22 8 28 0" fill="none" stroke={C.laranja} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const Orange = (p: P) => (
  <svg viewBox="0 0 64 64" aria-hidden="true" {...p}>
    <circle cx="32" cy="34" r="26" fill={C.laranja} />
    <circle cx="32" cy="34" r="20" fill={C.suave} />
    <path d="M32 14v40M12 34h40M18 20l28 28M46 20 18 48" stroke={C.laranja} strokeWidth="2" />
    <path d="M30 8c4-6 12-6 16-2-6 2-10 4-14 8z" fill={C.marca} />
  </svg>
);

export const Flame = (p: P) => (
  <svg viewBox="0 0 60 80" aria-hidden="true" {...p}>
    <path d="M30 4c6 14 22 22 22 44 0 16-10 28-22 28S8 64 8 48c0-10 4-16 10-22 0 8 4 12 8 12-2-10 0-24 4-34z" fill={C.laranja} />
    <path d="M30 40c4 8 10 12 10 22 0 8-4 12-10 12s-10-4-10-12c0-6 2-10 6-14 0 4 2 6 4 6-1-5 0-10 0-14z" fill="#FFB79A" />
  </svg>
);
