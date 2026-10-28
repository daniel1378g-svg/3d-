import { useEffect, useState } from "react";
import { UI, fill } from "@/i18n";
import { hhmm, status, type Status } from "@/hours";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";

/** "Ouvert · ferme dans 35 min" / "Fermé · ouvre à 19:00", in Geneva time, refreshed every 30 s. */
export function LiveBadge({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const { lang } = useSite();
  const [s, setS] = useState<Status | null>(null);
  useEffect(() => {
    const tick = () => setS(status());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  if (!s) return <span className={cn("inline-block h-9", className)} />;
  const detail = s.open
    ? s.minutesLeft <= 60
      ? fill(UI.closesIn[lang], { m: s.minutesLeft })
      : fill(UI.closesAt[lang], { t: hhmm(s.closesAt) })
    : fill(s.when === "today" ? UI.opensAt[lang] : s.when === "tomorrow" ? UI.opensTomorrow[lang] : UI.opensMonday[lang], { t: hhmm(s.opensAt) });
  return (
    <p
      className={cn(
        "inline-flex min-h-9 items-center gap-2.5 rounded-full border px-3.5 text-sm font-semibold",
        tone === "dark" ? "border-linen/25 bg-charcoal/50 text-linen" : "border-charcoal/15 bg-white/70 text-charcoal",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("relative h-2.5 w-2.5 rounded-full", s.open ? "pulse-dot bg-ember" : tone === "dark" ? "bg-linen/45" : "bg-charcoal/35")} />
      <span>
        <strong className="font-bold">{s.open ? UI.openNow[lang] : UI.closed[lang]}</strong> · {detail}
        <span className="sr-only"> ({UI.genevaTime[lang]})</span>
      </span>
    </p>
  );
}
