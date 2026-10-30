// Line icons (24 px grid, 1.8 px stroke, round caps), decorative unless given a title.
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };
const base = (size = 22): SVGProps<SVGSVGElement> => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8,
  strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, focusable: false,
});
const I = (d: React.ReactNode) => ({ size, ...p }: P) => <svg {...base(size)} {...p}>{d}</svg>;

export const IconMenu = I(<><path d="M4 8h16" /><path d="M4 16h11" /></>);
export const IconClose = I(<><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>);
export const IconArrow = I(<><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></>);
export const IconArrowDown = I(<><path d="M12 5v14" /><path d="M6 13l6 6 6-6" /></>);
export const IconExternal = I(<><path d="M14 5h5v5" /><path d="M19 5l-8 8" /><path d="M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4" /></>);
export const IconPhone = I(<path d="M5 4h3l1.5 4-2 1.3a11 11 0 0 0 7.2 7.2L16 14.5l4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />);
export const IconMail = I(<><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="M4 7l8 6 8-6" /></>);
export const IconPin = I(<><path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></>);
export const IconClock = I(<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>);
export const IconGlobe = I(<><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17" /><path d="M12 3.5c2.5 2.6 3.6 5.4 3.6 8.5s-1.1 5.9-3.6 8.5c-2.5-2.6-3.6-5.4-3.6-8.5S9.5 6.1 12 3.5z" /></>);
export const IconPlus = I(<><path d="M12 5v14" /><path d="M5 12h14" /></>);
export const IconMinus = I(<path d="M5 12h14" />);
export const IconChevronLeft = I(<path d="M15 5l-7 7 7 7" />);
export const IconChevronRight = I(<path d="M9 5l7 7-7 7" />);
export const IconChevronDown = I(<path d="M6 9l6 6 6-6" />);
export const IconPlay = I(<path d="M8 5.5v13l10-6.5z" fill="currentColor" stroke="none" />);
export const IconPause = I(<><path d="M8.5 5.5v13" strokeWidth={2.6} /><path d="M15.5 5.5v13" strokeWidth={2.6} /></>);
export const IconReplay = I(<><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" /><path d="M4.5 4.5v3.2h3.2" /></>);
export const IconCalendar = I(<><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17" /><path d="M8 3v4" /><path d="M16 3v4" /></>);
export const IconUsers = I(<><circle cx="9" cy="8.5" r="3" /><path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" /><circle cx="17" cy="9.5" r="2.4" /><path d="M16 14.3c2.2.2 3.8 1.7 4.3 4.2" /></>);
export const IconCard = I(<><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" /><path d="M7 15h3" /></>);
export const IconCar = I(<><path d="M5 16V11l2-4.5h10L19 11v5" /><path d="M4 16h16v2.5H4z" /><circle cx="8" cy="13.5" r=".6" fill="currentColor" /><circle cx="16" cy="13.5" r=".6" fill="currentColor" /></>);
export const IconGift = I(<><rect x="4" y="9" width="16" height="11" rx="1.5" /><path d="M3.5 9h17v3.5h-17z" /><path d="M12 9v11" /><path d="M12 9c-1.8-3.8-6-3.4-5-1 .7 1.6 5 1 5 1zM12 9c1.8-3.8 6-3.4 5-1-.7 1.6-5 1-5 1z" /></>);
export const IconFlame = I(<path d="M12 21c-3.6 0-6-2.4-6-5.6 0-3.6 3.2-5.6 3.6-9.4 2.4 1.4 3.4 3.6 3.2 5.2 1-.6 1.8-1.8 2-3 1.8 1.6 3.2 4.2 3.2 6.9 0 3.4-2.4 5.9-6 5.9z" />);
export const IconLeaf = I(<><path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z" /><path d="M5 19c3-4 6-6.5 9.5-8.5" /></>);
export const IconStar = ({ size = 18, filled = true, ...p }: P & { filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable={false} {...p}>
    <path d="M12 2.8l2.85 5.95 6.55.85-4.8 4.55 1.2 6.5L12 17.5l-5.8 3.15 1.2-6.5L2.6 9.6l6.55-.85z" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" />
  </svg>
);
export const IconInstagram = I(<><rect x="4" y="4" width="16" height="16" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17" cy="7" r=".7" fill="currentColor" /></>);
export const IconFacebook = I(<path d="M14.5 8.5h2V5h-2.6c-2.7 0-4 1.6-4 4.1V11H7.5v3.4H10V21h3.5v-6.6h2.6l.5-3.4h-3.1V9.6c0-.7.3-1.1 1-1.1z" />);
export const IconGoogle = ({ size = 20, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable={false} {...p}>
    <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" />
    <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z" />
    <path fill="#FBBC05" d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2L6.4 14z" />
    <path fill="#EA4335" d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.4L6.4 10C7.2 7.7 9.4 5.9 12 5.9z" />
  </svg>
);
