// Small static icons (the animated ones are Lottie, in src/lottie).
type P = { className?: string; size?: number };
const svg = (size: number, className?: string) => ({ width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true as const, className, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const });

export const PhoneIcon = ({ className, size = 16 }: P) => (
  <svg {...svg(size, className)} stroke="none">
    <path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" />
  </svg>
);
export const ArrowRight = ({ className, size = 18 }: P) => (
  <svg {...svg(size, className)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const ArrowLeft = ({ className, size = 18 }: P) => (
  <svg {...svg(size, className)}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);
export const ExternalIcon = ({ className, size = 14 }: P) => (
  <svg {...svg(size, className)}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
);
export const CloseIcon = ({ className, size = 20 }: P) => (
  <svg {...svg(size, className)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const PauseIcon = ({ className, size = 16 }: P) => (
  <svg {...svg(size, className)} stroke="none">
    <path fill="currentColor" d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
  </svg>
);
export const PlayIcon = ({ className, size = 16 }: P) => (
  <svg {...svg(size, className)} stroke="none">
    <path fill="currentColor" d="M8 5.5v13a.6.6 0 0 0 .9.5l10.2-6.5a.6.6 0 0 0 0-1L8.9 5a.6.6 0 0 0-.9.5Z" />
  </svg>
);
export const SearchIcon = ({ className, size = 18 }: P) => (
  <svg {...svg(size, className)}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4 4" />
  </svg>
);
export const GridIcon = ({ className, size = 16 }: P) => (
  <svg {...svg(size, className)}>
    <rect x="4" y="4" width="6.5" height="6.5" rx="1" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" />
  </svg>
);
export const InstagramIcon = ({ className, size = 20 }: P) => (
  <svg {...svg(size, className)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </svg>
);
export const FacebookIcon = ({ className, size = 20 }: P) => (
  <svg {...svg(size, className)} stroke="none">
    <path fill="currentColor" d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />
  </svg>
);
export const ChiliIcon = ({ className, size = 14 }: P) => (
  <svg {...svg(size, className)} stroke="none">
    <path fill="currentColor" d="M15.6 3.2c.5-.4 1.2-.3 1.5.2.3.4.2 1-.2 1.3l-.6.5c1 .6 1.6 1.7 1.6 3 0 4.7-4.6 11.6-11.4 12.6-.8.1-1.2-.9-.6-1.4 3.1-2.5 5-6.5 5.7-10.2.3-1.9 1.9-3.3 3.8-3.4l.2-2.6Z" />
  </svg>
);
