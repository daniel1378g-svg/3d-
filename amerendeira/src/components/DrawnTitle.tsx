import type { DrawnTitle as Data } from "@/lib/drawnTitles";

type Props = { data: Data; className?: string; as?: "h1" | "h2" | "p"; id?: string };

// Renders an original drawn title. The heading element carries the real text for assistive
// technology and search; the SVG is the visual.
export function DrawnTitle({ data, className, as: Tag = "h2", id }: Props) {
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
