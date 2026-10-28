import { useEffect, useState } from "react";
import { UI, fill } from "@/i18n";
import { hm, status, terraceSeason } from "@/hours";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";

/** «Ouvert · ferme à 18:30» / «Fermé · ouvre à 6:30», in Lausanne time, refreshed every 30 s. */
export function OpenBadge({ tone = "light", className, terrace = false, open = true }: { tone?: "light" | "dark"; className?: string; terrace?: boolean; open?: boolean }) {
  const { lang } = useSite();
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  const s = status(now);
  const detail = s.open ? fill(UI.closesAt[lang], { t: hm(s.closes) }) : fill(s.tomorrow ? UI.opensTomorrow[lang] : UI.opensAt[lang], { t: hm(s.opens) });
  const season = terraceSeason(now);
  const chip = tone === "dark" ? "bg-flour/10 text-flour ring-1 ring-flour/25" : "bg-flour text-espresso shadow-set ring-1 ring-espresso/10";

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {open && (
      <p className={cn("inline-flex min-h-10 items-center gap-3 rounded-full px-4 py-2 text-sm font-semibold", chip)}>
        <span aria-hidden="true" className={cn("relative h-2.5 w-2.5 shrink-0 rounded-full", s.open ? "pulse-dot bg-[#3f8f3a]" : "bg-swiss")} />
        <span>
          {s.open ? UI.openNow[lang] : UI.closedNow[lang]} <span className="font-normal opacity-80">· {detail}</span>
        </span>
      </p>
      )}
      {terrace && (
        <p className={cn("inline-flex min-h-10 items-center gap-2.5 rounded-full px-4 py-2 text-sm font-semibold", chip)}>
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0 text-wheat">
            <circle cx="12" cy="12" r="4.5" fill="currentColor" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {season && s.open ? UI.terraceOpen[lang] : UI.terraceSeason[lang]}
        </p>
      )}
    </div>
  );
}
