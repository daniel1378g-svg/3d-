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
