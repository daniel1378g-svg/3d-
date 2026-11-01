// Line icons drawn for the site (1.5 px strokes, round caps), decorative unless labelled by the caller.
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({ viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, focusable: false, ...p });

export const Arrow = (p: P) => (<svg {...base(p)}><path d="M4 12h15M13 6l6 6-6 6" /></svg>);
export const ArrowLeft = (p: P) => (<svg {...base(p)}><path d="M20 12H5M11 6l-6 6 6 6" /></svg>);
export const ArrowUp = (p: P) => (<svg {...base(p)}><path d="M12 20V5M6 11l6-6 6 6" /></svg>);
export const Chevron = (p: P) => (<svg {...base(p)}><path d="M9 6l6 6-6 6" /></svg>);
export const ChevronLeft = (p: P) => (<svg {...base(p)}><path d="M15 6l-6 6 6 6" /></svg>);
export const Globe = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
  </svg>
);
export const Menu = (p: P) => (<svg {...base(p)}><path d="M4 8h16M4 16h16" /></svg>);
export const Close = (p: P) => (<svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const Phone = (p: P) => (<svg {...base(p)}><path d="M6.6 3.5h2.6l1.4 4.2-2 1.4a12 12 0 006.3 6.3l1.4-2 4.2 1.4v2.6a2 2 0 01-2.2 2A17 17 0 014.6 5.7a2 2 0 012-2.2z" /></svg>);
export const Mail = (p: P) => (<svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="M3.5 6l8.5 7 8.5-7" /></svg>);
export const Pin = (p: P) => (<svg {...base(p)}><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0113 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></svg>);
export const Calendar = (p: P) => (<svg {...base(p)}><rect x="3.5" y="5" width="17" height="15.5" rx="1.5" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /></svg>);
export const Clock = (p: P) => (<svg {...base(p)}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>);
export const Users = (p: P) => (<svg {...base(p)}><circle cx="9" cy="8.5" r="3.2" /><path d="M3 19.5a6 6 0 0112 0M15.5 5.6a3.2 3.2 0 010 5.8M17.5 14a5.8 5.8 0 013.5 5.5" /></svg>);
export const Search = (p: P) => (<svg {...base(p)}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></svg>);
export const Plus = (p: P) => (<svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>);
export const Minus = (p: P) => (<svg {...base(p)}><path d="M5 12h14" /></svg>);
export const Play = (p: P) => (<svg {...base(p)}><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="none" /></svg>);
export const Pause = (p: P) => (<svg {...base(p)}><path d="M8.5 5.5v13M15.5 5.5v13" strokeWidth={2.2} /></svg>);
export const Download = (p: P) => (<svg {...base(p)}><path d="M12 4v11M7 10.5l5 5 5-5M5 19.5h14" /></svg>);
export const External = (p: P) => (<svg {...base(p)}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" /></svg>);
export const Check = (p: P) => (<svg {...base(p)}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);
export const Gift = (p: P) => (<svg {...base(p)}><rect x="3.5" y="9" width="17" height="11.5" rx="1" /><path d="M3 9h18M12 9v11.5M12 9c-1.5-3.5-5.5-4.5-6-2s3 2 6 2zm0 0c1.5-3.5 5.5-4.5 6-2s-3 2-6 2z" /></svg>);
export const Bed = (p: P) => (<svg {...base(p)}><path d="M3 18.5v-11M3 14.5h18v4M21 14.5v-3a3 3 0 00-3-3h-7v6" /><circle cx="7" cy="11.5" r="1.8" /></svg>);
export const Briefcase = (p: P) => (<svg {...base(p)}><rect x="3.5" y="7.5" width="17" height="12" rx="1.5" /><path d="M9 7.5V5.5a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0115 5.5v2M3.5 12.5h17" /></svg>);
export const Paper = (p: P) => (<svg {...base(p)}><path d="M5 4.5h11l3 3v12H5z" /><path d="M8.5 10h7M8.5 13.5h7M8.5 17h4" /></svg>);
export const Cube = (p: P) => (<svg {...base(p)}><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M4 7.5l8 4.5 8-4.5M12 12v9" /></svg>);
export const Coins = (p: P) => (<svg {...base(p)}><ellipse cx="9" cy="7.5" rx="5.5" ry="2.5" /><path d="M3.5 7.5v4c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4" /><path d="M9.5 16.2c.8 1.2 3 2.1 5.5 2.1 3 0 5.5-1.1 5.5-2.5v-4c0-1.3-2.1-2.3-4.8-2.5" /></svg>);
export const Film = (p: P) => (<svg {...base(p)}><rect x="3.5" y="5" width="17" height="14" rx="1.5" /><path d="M7.5 5v14M16.5 5v14M3.5 9.5h4M3.5 14.5h4M16.5 9.5h4M16.5 14.5h4" /></svg>);
export const Leaf = (p: P) => (<svg {...base(p)}><path d="M4.5 19.5c9.5 1 15-5.5 15-15-9.5 0-15 5.5-15 15zm0 0l8-8" /></svg>);
