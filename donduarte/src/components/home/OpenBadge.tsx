import { useEffect, useState } from "react";
import { UI, fill } from "@/i18n";
import { hhmm, status } from "@/hours";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";

/** "Open now / Closed" in Geneva time, refreshed every 30 s. */
export function OpenBadge({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { lang } = useSite();
  const [s, setS] = useState(() => status());
  useEffect(() => {
    const id = window.setInterval(() => setS(status()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  const detail = s.open ? fill(UI.until[lang], { t: hhmm(s.until!) }) : fill(UI.opensAt[lang], { t: hhmm(s.opensAt!) });
  return (
    <p className={cn("inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm font-bold", tone === "dark" ? "bg-tile/10 text-tile ring-1 ring-tile/20" : "bg-night/5 text-ink ring-1 ring-ink/10")}>
      <span aria-hidden="true" className={cn("relative h-2.5 w-2.5 rounded-full", s.open ? "pulse-dot bg-green" : "bg-red")} />
      <span>{s.open ? UI.openNow[lang] : UI.closedNow[lang]}</span>
      <span className="font-semibold opacity-75">· {detail}</span>
    </p>
  );
}
