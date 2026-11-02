// Inline icons, 24-unit grid, stroke = currentColor. Always decorative (aria-hidden): the label sits next to them.
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };
const base = (size = 20, props: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
  ...props,
});

export const IconPhone = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 7 7L16 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
  </svg>
);
export const IconMail = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
export const IconPin = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
export const IconArrow = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const IconArrowLeft = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);
export const IconExternal = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
);
export const IconClose = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const IconPause = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M9 5v14M15 5v14" />
  </svg>
);
export const IconPlay = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M7 5l12 7-12 7z" fill="currentColor" />
  </svg>
);
export const IconGrid = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <rect x="4" y="4" width="7" height="7" rx="1.5" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" />
  </svg>
);
export const IconRows = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <rect x="3" y="6" width="5" height="12" rx="1.5" />
    <rect x="10" y="4" width="5" height="16" rx="1.5" />
    <rect x="17" y="7" width="4" height="10" rx="1.5" />
  </svg>
);
export const IconChevron = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export const IconFile = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
);
export const IconGift = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M5 12v8h14v-8M12 8v12M12 8S10.5 3.5 8 4.5 9 8 12 8zM12 8s1.5-4.5 4-3.5S15 8 12 8z" />
  </svg>
);
export const IconBed = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" />
    <circle cx="7" cy="11" r="2" />
  </svg>
);
export const IconCube = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M12 3 4 7v10l8 4 8-4V7z" />
    <path d="m4 7 8 4 8-4M12 11v10" />
  </svg>
);
export const IconClock = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
export const IconMenu = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M4 8h16M8 16h12" />
  </svg>
);
export const IconPlus = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const IconMinus = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M5 12h14" />
  </svg>
);
export const IconRotate = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4" />
  </svg>
);
/** Five-point star; `fill` controls the inside. */
export const Star = ({ size = 18, filled = true, ...p }: P & { filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable={false} {...p}>
    <path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);
/** The marquee's separator: a small asterisk-star. */
export const Spark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden focusable={false}>
    <path d="M20 2c1.6 9.3 8.7 16.4 18 18-9.3 1.6-16.4 8.7-18 18-1.6-9.3-8.7-16.4-18-18C11.3 18.4 18.4 11.3 20 2z" fill="currentColor" />
  </svg>
);
