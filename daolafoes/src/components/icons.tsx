// Small line icons (24 × 24, currentColor).
type P = { className?: string; size?: number };
const svg = (d: React.ReactNode, { className, size = 20 }: P, sw = 2) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" className={className}>
    {d}
  </svg>
);
export const IconPhone = (p: P) => svg(<path d="M6.5 3h3l1.6 4.2-2.1 1.5a12 12 0 0 0 6.3 6.3l1.5-2.1L21 14.5v3c0 1.4-1.1 2.5-2.5 2.5C10.5 19.5 4.5 13.5 4 5.5 4 4.1 5.1 3 6.5 3z" />, p);
export const IconMail = (p: P) => svg(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 7 8.5-7" /></>, p);
export const IconArrow = (p: P) => svg(<path d="M5 12h14M13 6l6 6-6 6" />, p);
export const IconArrowLeft = (p: P) => svg(<path d="M19 12H5M11 6l-6 6 6 6" />, p);
export const IconClose = (p: P) => svg(<path d="M6 6l12 12M18 6 6 18" />, p);
export const IconChevron = (p: P) => svg(<path d="m6 9 6 6 6-6" />, p);
export const IconPin = (p: P) => svg(<><path d="M12 21s-7-7.2-7-12a7 7 0 0 1 14 0c0 4.8-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></>, p);
export const IconPause = (p: P) => svg(<path d="M9 5v14M15 5v14" />, p, 2.6);
export const IconPlay = (p: P) => svg(<path d="M7 5v14l12-7z" />, p);
export const IconSearch = (p: P) => svg(<><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>, p);
export const IconGrid = (p: P) => svg(<><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></>, p);
export const IconRows = (p: P) => svg(<><rect x="3" y="6" width="5" height="12" rx="1.5" /><rect x="10" y="6" width="5" height="12" rx="1.5" /><rect x="17" y="6" width="4" height="12" rx="1.5" /></>, p);
export const IconExternal = (p: P) => svg(<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />, p);
export const IconFacebook = ({ className, size = 20 }: P) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3z" />
  </svg>
);
export const IconBag = (p: P) => svg(<><path d="M6 8h12l1 12H5L6 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>, p);
export const IconCheck = (p: P) => svg(<path d="m5 12 5 5L20 7" />, p);
export const IconPlus = (p: P) => svg(<path d="M12 5v14M5 12h14" />, p);
export const IconMinus = (p: P) => svg(<path d="M5 12h14" />, p);
export const IconStar = ({ className, size = 20, fill = "currentColor" }: P & { fill?: string }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" className={className} fill={fill}>
    <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" />
  </svg>
);
export const IconDoc = (p: P) => svg(<><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5M10 13h6M10 17h6" /></>, p);
export const IconTwitter = ({ className, size = 20 }: P) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.2 2h3.4l-7.4 8.5L23 22h-6.8l-5.3-7-6.1 7H1.4l7.9-9.1L1 2h7l4.8 6.4zm-1.2 18h1.9L7.1 3.9H5.1z" />
  </svg>
);
export const IconVimeo = ({ className, size = 20 }: P) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M22 7.4c-.1 2-1.5 4.7-4.2 8.1-2.8 3.6-5.2 5.4-7.1 5.4-1.2 0-2.2-1.1-3-3.3L6 11.5C5.4 9.3 4.8 8.2 4.1 8.2c-.2 0-.7.3-1.6.9L1.5 7.9c1-.9 2-1.8 3-2.7C5.8 4 6.8 3.4 7.5 3.3c1.6-.2 2.6.9 3 3.3.4 2.5.7 4.1.9 4.7.5 2.2 1 3.3 1.6 3.3.5 0 1.2-.7 2.1-2.2.9-1.5 1.4-2.6 1.5-3.4.1-1.3-.4-1.9-1.5-1.9-.5 0-1 .1-1.6.4 1.1-3.5 3.1-5.2 6.1-5.1 2.2.1 3.2 1.5 3.1 4.3z" />
  </svg>
);
