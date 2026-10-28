import { asset, cn } from "@/lib/utils";

/** The logo always sits on a tile-white plaque, so its red and gold read on every band. */
export function Logo({ className, imgClassName, alt = "Restaurant Don Duarte" }: { className?: string; imgClassName?: string; alt?: string }) {
  return (
    <span className={cn("inline-grid place-items-center rounded-2xl bg-tile", className)}>
      <img src={asset("brand/logo.webp")} alt={alt} width={671} height={295} className={cn("h-auto w-full", imgClassName)} />
    </span>
  );
}
