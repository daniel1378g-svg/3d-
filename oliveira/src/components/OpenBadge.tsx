import { useEffect, useState } from "react";
import { LOCALE, UI, fill } from "@/i18n";
import { HOURS } from "@/content";
import { hhmm, status } from "@/hours";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";

/** "Geöffnet · schliesst in 35 Min." / "Geschlossen · öffnet Dienstag um 10:00", in Winterthur time. */
export function OpenBadge({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const { lang } = useSite();
  const [s, setS] = useState(() => status());
  useEffect(() => {
    const id = window.setInterval(() => setS(status()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  let detail: string;
  if (s.open) detail = s.minutesLeft <= 60 ? fill(UI.closesIn[lang], { n: s.minutesLeft }) : fill(UI.closesAt[lang], { t: hhmm(s.until) });
  else if (s.inDays === 0) detail = fill(UI.opensAt[lang], { t: hhmm(s.opensAt) });
  else {
    const day = s.inDays === 1 ? UI.tomorrow[lang] : new Intl.DateTimeFormat(LOCALE[lang], { weekday: "long" }).format(new Date(Date.UTC(2024, 0, 7 + s.day, 12)));
    detail = fill(UI.opensDayAt[lang], { day, t: hhmm(s.opensAt) });
  }

  return (
    <div className={cn("inline-flex flex-col gap-1", className)}>
      <p className={cn("inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm font-semibold", tone === "dark" ? "bg-linen/10 text-linen ring-1 ring-linen/25" : "bg-linen/90 text-charcoal shadow-set ring-1 ring-charcoal/10")}>
        <span aria-hidden="true" className={cn("relative h-2.5 w-2.5 rounded-full", s.open ? "pulse-dot bg-olive" : "bg-apetite")} />
        <span>{s.open ? UI.openNow[lang] : UI.closedNow[lang]}</span>
        <span className="opacity-75">· {detail}</span>
      </p>
      {!HOURS.confirmed && <span className={cn("pl-4 text-xs", tone === "dark" ? "text-linen/70" : "text-charcoal/70")}>{UI.provisional[lang]}</span>}
    </div>
  );
}
