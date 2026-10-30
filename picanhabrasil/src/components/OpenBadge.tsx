// "Jetzt geöffnet · bis 22:00 Uhr" / "Jetzt geschlossen · öffnet heute um 17:30 Uhr", in Zürich time, from the
// published regular hours (no live status, no holidays): the title and a hidden note say so.
import { useEffect, useState } from "react";
import { fill } from "@/i18n";
import { useSite } from "@/site";
import { fmtTime, openStatus, type Status } from "@/lib/time";
import { cn } from "@/lib/utils";

export function useOpenStatus() {
  const [s, setS] = useState<Status>(() => openStatus());
  useEffect(() => {
    const id = window.setInterval(() => setS(openStatus()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return s;
}

export function statusText(t: ReturnType<typeof useSite>["t"], s: Status) {
  if (s.open) return { head: t.hours.openNow, tail: fill(t.hours.until, { time: fmtTime(s.until) }) };
  const time = fmtTime(s.next.at);
  const tail =
    s.next.inDays === 0 ? fill(t.hours.opensToday, { time })
    : s.next.inDays === 1 ? fill(t.hours.opensTomorrow, { time })
    : fill(t.hours.opensAt, { day: t.hours.weekdays[s.next.weekday], time });
  return { head: t.hours.closedNow, tail };
}

export function OpenBadge({ className }: { className?: string }) {
  const { t } = useSite();
  const s = useOpenStatus();
  const { head, tail } = statusText(t, s);
  return (
    <p className={cn("inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full bg-creme/[0.07] px-4 py-2 text-sm", className)} title={t.hours.basis}>
      <span className={cn("relative inline-block h-2.5 w-2.5 rounded-full", s.open ? "bg-[#4cc38a]" : "bg-brasa")} aria-hidden="true">
        {s.open && <span className="absolute inset-0 animate-ping rounded-full bg-[#4cc38a] opacity-60 motion-reduce:hidden" />}
      </span>
      <strong className="font-semibold">{head}</strong>
      <span className="opacity-80">· {tail}</span>
      <span className="sr-only"> ({t.hours.basis})</span>
    </p>
  );
}
