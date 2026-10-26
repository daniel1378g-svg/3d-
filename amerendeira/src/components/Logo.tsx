// The original logotype (public/brand/logo-a-merendeira.svg), inlined so its glyphs can move
// independently. Shapes, proportions and viewBox are unchanged; only the paths are grouped
// per letter, in reading order.

type Props = { className?: string; title?: string; decorative?: boolean };

const GLYPHS = [
  // A
  "M0,4.5C0,2.1,1.7,0,4.4,0h.3C7.4,0,9.1,2.1,9.1,4.5v16.2h-2.7v-10h-3.8v10H0V4.5ZM6.4,8.1v-3.8c0-1-.7-1.8-1.8-1.8h-.2c-1.1,0-1.8.8-1.8,1.8v3.8h3.8Z",
  // M (two arches)
  "M17.6,4.5C17.6,2.1,19.3,0,22,0h.3C25,0,26.7,2.1,26.7,4.5v16.2h-2.7V4.4c0-1-.7-1.8-1.8-1.8h-.2c-1.1,0-1.8.8-1.8,1.8v16.3h-2.7V4.5Z M24.1,4.5C24.1,2.1,25.8,0,28.5,0h.3C31.5,0,33.2,2.1,33.2,4.5v16.2h-2.7V4.4c0-1-.7-1.8-1.8-1.8h-.2c-1.1,0-1.8.8-1.8,1.8v16.3h-2.7V4.5Z",
  // E
  "M36.6 .2H45.1V2.7H39.2V8.1H44V10.7H39.2V23.5H45.7V26H36.6Z",
  // R
  "M48.3.2h4.2c2.4,0,4.3,2,4.3,4.2v2.1c0,1,0,2.1-1.4,2.7,1.4.6,1.9,2,1.9,3.2v13.6h-2.7s0-13.6,0-13.6c0-.9-.6-1.7-1.7-1.7h-2.1v15.3h-2.7V.2ZM52.6,8.2c1,0,1.7-.8,1.7-1.7v-2.2c0-.9-.6-1.7-1.7-1.7h-1.6v5.5h1.6Z",
  // E
  "M60.5 .2H69.1V2.7H63.2V8.1H67.9V10.7H63.2V23.5H69.6V26H60.5Z",
  // N
  "M72.2,4.5C72.2,2.1,73.9,0,76.6,0h.3c2.7,0,4.4,2.1,4.4,4.5v21.5h-2.7V4.4c0-1-.7-1.8-1.8-1.8h-.2c-1.1,0-1.8.8-1.8,1.8v21.6h-2.7V4.5Z",
  // D
  "M84.7.2h4.7c2.7,0,4.4,2.1,4.4,4.5v16.8c0,2.5-1.7,4.5-4.4,4.5h-4.7V.2ZM89.4,23.5c1.1,0,1.8-.9,1.8-1.9V4.5c0-1-.7-1.8-1.8-1.8h-2v20.8h2Z",
  // E
  "M97.1 .2H105.7V2.7H99.8V8.1H104.5V10.7H99.8V23.5H106.2V26H97.1Z",
  // I
  "M108.9 .2H111.6V26H108.9Z",
  // R
  "M115,.2h4.2c2.4,0,4.3,2,4.3,4.2v2.1c0,1,0,2.1-1.4,2.7,1.4.6,1.9,2,1.9,3.2v13.6h-2.7s0-13.6,0-13.6c0-.9-.6-1.7-1.7-1.7h-2.1v15.3h-2.7V.2ZM119.3,8.2c1,0,1.7-.8,1.7-1.7v-2.2c0-.9-.6-1.7-1.7-1.7h-1.6v5.5h1.6Z",
  // A
  "M127.1,4.5c0-2.4,1.7-4.5,4.4-4.5h.3c2.7,0,4.4,2.1,4.4,4.5v21.5h-2.7v-15.3h-3.8v15.3h-2.7V4.5ZM133.6,8.1v-3.8c0-1-.7-1.8-1.8-1.8h-.2c-1.1,0-1.8.8-1.8,1.8v3.8h3.8Z",
];

export function Logo({ className, title = "A Merendeira", decorative = false }: Props) {
  return (
    <svg
      className={["logo", className].filter(Boolean).join(" ")}
      viewBox="0 0 136.2 26"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
      focusable="false"
    >
      {GLYPHS.map((d, i) => (
        <path key={i} className="logo__glyph" style={{ ["--i" as string]: i }} d={d} fillRule="nonzero" />
      ))}
      {/* the bar under the M */}
      <rect className="logo__bar" x="17.6" y="23.5" width="15.5" height="2.5" />
    </svg>
  );
}
