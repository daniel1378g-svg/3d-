import { useEffect, useState } from "react";
import { UI, fill } from "@/i18n";
import { HOURS, hhmm, status, type Place } from "@/hours";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";

/** "Offen · warme Küche bis 23.00" / "Geschlossen · öffnet um 11.00", in Leukerbad time, refreshed every 30 s. */
export function LiveBadge({ place, tone = "light", className }: { place: Place; tone?: "dark" | "light"; className?: string }) {
  const { lang } = useSite();
  const [s, setS] = useState<ReturnType<typeof status> | null>(null);
  useEffect(() => {
    const tick = () => setS(status(place));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [place]);
  if (!s) return <span className={cn("inline-block h-9", className)} />;
  const detail = s.open
    ? fill(HOURS[place].kitchen ? UI.kitchenUntil[lang] : UI.openUntil[lang], { t: hhmm(s.until) })
    : fill(UI.opensAt[lang], { t: hhmm(s.opensAt) });
  return (
    <p
      className={cn(
        "inline-flex min-h-9 items-center gap-2.5 rounded-full border px-3.5 text-sm font-semibold",
        tone === "dark" ? "border-snow/25 bg-ink/55 text-snow backdrop-blur-sm" : "border-ink/15 bg-white/80 text-ink",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("relative size-2.5 rounded-full", s.open ? "pulse-dot bg-[#2f9e5b]" : tone === "dark" ? "bg-snow/45" : "bg-ink/35")} />
      <span>
        <strong className="font-bold">{s.open ? UI.openNow[lang] : UI.closedNow[lang]}</strong> · {detail}
        <span className="sr-only"> ({UI.zurichTime[lang]})</span>
      </span>
    </p>
  );
}
