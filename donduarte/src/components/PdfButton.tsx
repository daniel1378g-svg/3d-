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
        tone === "light" ? "border-azulejo text-azulejo hover:bg-azulejo hover:text-tile" : "border-gold/70 text-tile hover:border-gold hover:bg-gold hover:text-night",
        className,
      )}
    >
      <span className={cn("grid h-9 w-9 place-items-center rounded-full", tone === "light" ? "bg-azulejo-soft" : "bg-tile/10")}>
        <LottieIcon name="download" mode="hover" size={28} color={tone === "light" ? "#1d4e9e" : "#f7f2e8"} accent="#b80601" />
      </span>
      <span>{label}</span>
      <span className="sr-only"> ({UI.pdfNewTab[lang]})</span>
    </a>
  );
}
