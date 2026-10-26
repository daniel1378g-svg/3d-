import type { DrawnTitle as Data } from "@/lib/drawnTitles";

type Props = { data: Data; className?: string; as?: "h1" | "h2" | "p"; id?: string; text?: string };

// Renders an original drawn title. The heading element carries the real text for assistive
// technology and search; the SVG is the visual.
export function DrawnTitle({ data, className, as: Tag = "h2", id, text }: Props) {
  // In English the Portuguese drawing is replaced by the same line set in the display serif.
  if (text) {
    return (
      <Tag className={["drawn-title", "drawn-title--text", className].filter(Boolean).join(" ")} id={id}>
        <span className="drawn-title__text">{text}</span>
      </Tag>
    );
  }
  return (
    <Tag className={["drawn-title", className].filter(Boolean).join(" ")} id={id}>
      <span className="sr-only">{data.label}</span>
      <svg viewBox={data.viewBox} aria-hidden="true" focusable="false" className="drawn-title__svg">
        {data.paths.map((d, i) => (
          <path key={i} d={d} className="drawn-title__glyph" style={{ ["--i" as string]: i }} />
        ))}
      </svg>
    </Tag>
  );
}
