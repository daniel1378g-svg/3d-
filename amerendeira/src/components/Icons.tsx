// Stroke icons drawn to match the arrow of the original buttons (1.25 stroke, square caps).

type P = { className?: string };

export function ArrowRight({ className = "btn__icon" }: P) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true" focusable="false">
      <path d="M1.5 7H12" strokeLinecap="square" />
      <path d="M8.8 2.9 12.8 7l-4.1 4.1" strokeLinecap="square" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRight({ className = "btn__icon" }: P) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true" focusable="false">
      <path d="M3 11 11.5 2.5" strokeLinecap="square" />
      <path d="M4.5 2.5h7v7" strokeLinecap="square" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowDown({ className = "btn__icon" }: P) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true" focusable="false">
      <path d="M7 1.5V12" strokeLinecap="square" />
      <path d="M2.9 8.8 7 12.8l4.1-4.1" strokeLinecap="square" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUp({ className = "btn__icon" }: P) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true" focusable="false">
      <path d="M7 12.5V2" strokeLinecap="square" />
      <path d="M2.9 5.2 7 1.2l4.1 4.1" strokeLinecap="square" strokeLinejoin="round" />
    </svg>
  );
}

export function Instagram({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" focusable="false">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Facebook({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M13.4 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.7v3h2.6V21h3.1Z" />
    </svg>
  );
}

export function Close({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true" focusable="false">
      <path d="M2 2l10 10M12 2 2 12" strokeLinecap="square" />
    </svg>
  );
}

export function Chevron({ className, dir = "right" }: P & { dir?: "left" | "right" }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true" focusable="false" style={dir === "left" ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M5 2.5 9.5 7 5 11.5" strokeLinecap="square" strokeLinejoin="round" />
    </svg>
  );
}
