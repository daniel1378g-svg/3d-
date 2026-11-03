// Inline SVG icons and decorative graphics. Every icon is aria-hidden; meaning is always carried
// by visible or screen-reader text next to it.
const svg = (body, { vb = "0 0 24 24", cls = "", sw = 2 } = {}) =>
  `<svg class="${cls}" viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;

export const icon = {
  arrow: (cls = "") => svg('<path d="M5 12h14M13 6l6 6-6 6"/>', { cls: `icon-arrow ${cls}` }),
  arrowDown: () => svg('<path d="M12 5v14M6 13l6 6 6-6"/>', { cls: "icon-arrow icon-arrow--down" }),
  arrowUp: () => svg('<path d="M12 19V5M6 11l6-6 6 6"/>', { cls: "icon-arrow" }),
  external: () => svg('<path d="M7 17 17 7M9 7h8v8"/>', { cls: "icon-arrow icon-arrow--external" }),
  chevron: () => svg('<path d="m6 9 6 6 6-6"/>', { sw: 2.4 }),
  users: () => svg('<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19.5c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5"/><circle cx="17" cy="9.5" r="2.4"/><path d="M15.8 14.6c2.3.2 4 1.8 4.6 4.4"/>'),
  activity: () => svg('<path d="M3 12h4l2.5-6 5 12 2.5-6h4"/>'),
  calendar: () => svg('<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4M8 14h2M12 14h2M8 17h2"/>'),
  shield: () => svg('<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6L12 3Z"/><path d="m8.8 12.2 2.2 2.2 4.4-4.6"/>'),
  pin: () => svg('<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.4"/>'),
  stadium: () => svg('<rect x="3" y="6" width="18" height="12" rx="6"/><rect x="7.5" y="9.5" width="9" height="5" rx="2.5"/>'),
  snow: () => svg('<path d="M12 2.5v19M4 7l16 10M20 7 4 17M9.5 4 12 6.5 14.5 4M9.5 20l2.5-2.5 2.5 2.5"/>'),
  camera: () => svg('<path d="M4 8h3l1.6-2.4h6.8L17 8h3v11H4z"/><circle cx="12" cy="13.2" r="3.4"/>'),
  info: () => svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.6v.2"/>'),
  zoom: () => svg('<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.4-4.4M11 8v6M8 11h6"/>'),
  close: () => svg('<path d="M6 6l12 12M18 6 6 18"/>', { sw: 2.2 }),
  prev: () => svg('<path d="m15 5-7 7 7 7"/>', { sw: 2.2 }),
  next: () => svg('<path d="m9 5 7 7-7 7"/>', { sw: 2.2 }),
};

// Pictograms for the three disciplines (decorative; the discipline name is the text).
export const pictogram = {
  run: () => svg(
    '<circle cx="41" cy="9.5" r="5"/><path d="M38 17 30 33.5"/><path d="M36 20.5l8 6 6.5-5M36 20.5l-9 3-6-4.5"/><path d="M30 33.5l10 8.5-2 12M30 33.5l-8 9.5H11"/><path d="M4 58h56" stroke-dasharray="2 6" opacity=".55"/>',
    { vb: "0 0 64 64", cls: "pictogram", sw: 3.4 }),
  jump: () => svg(
    '<path d="M4 46C14 22 32 12 50 16" stroke-dasharray="2 6" opacity=".55"/><circle cx="45" cy="10.5" r="5"/><path d="M42 18 31 29"/><path d="M40 20.5l9-1 7-7M40 20.5l-6-6.5"/><path d="M31 29l11 6.5h10M31 29l7 11.5 10 2.5"/><path d="M28 58h32" opacity=".55"/>',
    { vb: "0 0 64 64", cls: "pictogram", sw: 3.4 }),
  throw: () => svg(
    '<circle cx="47" cy="7" r="3.6" fill="currentColor" stroke="none"/><circle cx="25" cy="12.5" r="5"/><path d="M27 19.5l5 16.5"/><path d="M27.5 22.5l9.5-5.5 6.5-7M27.5 22.5l-10 6"/><path d="M32 36l8 10 4 10M32 36l-8 10-6 10"/><path d="M4 58h56" stroke-dasharray="2 6" opacity=".55"/>',
    { vb: "0 0 64 64", cls: "pictogram", sw: 3.4 }),
};

// Running-track lanes: a straight that turns into a bend. pathLength=1 lets CSS draw them once.
export function lanes({ cls = "", count = 6, green = 2, width = 1200, height = 640, cx = 860, cy = 700, r0 = 250, step = 44, extra = "" } = {}) {
  const paths = [];
  for (let i = 0; i < count; i++) {
    const r = r0 + i * step;
    paths.push(`<path pathLength="1" class="${i === green ? "lane-green" : ""}" d="M-40 ${cy - r} H${cx} A${r} ${r} 0 0 1 ${cx} ${cy + r}"/>`);
  }
  return `<svg class="${cls}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" ${extra}>${paths.join("")}</svg>`;
}

// Indoor court / gym floor graphic for the winter panel (no photo of the gymnasiums exists).
export function gymGraphic() {
  return `<svg viewBox="0 0 930 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" fill="none" stroke="currentColor">
    <g opacity=".22" stroke-width="2"><path d="M0 420h930M0 360h930M0 300h930M0 240h930" stroke-dasharray="4 14"/></g>
    <g stroke-width="2.5" opacity=".9"><rect x="135" y="110" width="660" height="290" rx="6"/><path d="M465 110v290"/><circle cx="465" cy="255" r="62"/><path d="M135 185h90a70 70 0 0 1 0 140h-90M795 185h-90a70 70 0 0 0 0 140h90"/></g>
    <g stroke-width="3" stroke="#2faa43"><path d="M370 64l18 16M388 64l-18 16M379 60v24M367 72h24" opacity=".9"/><path d="M540 52l12 11M552 52l-12 11M546 49v17M538 57h16" opacity=".7"/></g>
  </svg>`;
}
