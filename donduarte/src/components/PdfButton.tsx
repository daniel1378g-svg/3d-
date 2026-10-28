import { UI, type Lang } from "@/i18n";
import { LottieIcon } from "@/lottie/LottieIcon";
import { cn } from "@/lib/utils";

/** Links to the restaurant's own PDF files on donduarte.ch. The arrow plays once on hover or focus. */
export function PdfButton({ href, label, lang, tone = "light", className }: { href: string; label: string; lang: Lang; tone?: "light" | "dark"; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={cn(
        "group inline-flex items-center gap-3 rounded-full border-2 py-2 pl-2.5 pr-5 text-sm font-bold transition-colors",
        tone === "light" ? "border-green text-green hover:border-red hover:bg-red hover:text-white" : "border-gold/70 text-white hover:border-red hover:bg-red hover:text-white",
        className,
      )}
    >
      <span className={cn("grid h-9 w-9 place-items-center rounded-full", tone === "light" ? "bg-green" : "bg-white/10")}>
        <LottieIcon name="download" mode="hover" size={28} color="#ffcc00" accent="#ffffff" />
      </span>
      <span>{label}</span>
      <span className="sr-only"> ({UI.pdfNewTab[lang]})</span>
    </a>
  );
}
