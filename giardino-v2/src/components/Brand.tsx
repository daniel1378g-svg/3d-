// The Giardino logo is never distorted: the original (tree, "Giardino" script, PIZZERIA) on light grounds, and its
// light version on dark ones. The circular medallion uses the logo's own dark green (#29381B).
import { useState, type CSSProperties } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { asset, cn } from "@/lib/utils";

/** Dark-green disc with the full light logo (`full`) or the tree alone. */
export function Medallion({ full = false, className, style, chip = false }: { full?: boolean; className?: string; style?: CSSProperties; chip?: boolean }) {
  return (
    <span data-logo-chip={chip || undefined} className={cn("relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-green", className)} style={style}>
      {full ? (
        <img src={asset("brand/logo-light.webp")} alt="" width={600} height={306} className="h-auto w-[74%]" />
      ) : (
        <img src={asset("brand/tree-light.webp")} alt="" width={220} height={220} className="wobble h-[74%] w-[74%] object-contain" />
      )}
    </span>
  );
}

/** The floating brand capsule at the top left: medallion with the tree, then the script lockup (from 480 px). */
export function BrandCapsule({ small = false, id }: { small?: boolean; id?: string }) {
  const { href, go, lang } = useSite();
  const [wobbling, setWobbling] = useState(false);
  return (
    <a
      id={id}
      href={href("home")}
      aria-label={UI.homeLink[lang]}
      onClick={(e) => {
        e.preventDefault();
        setWobbling(true);
        go("home");
      }}
      onAnimationEnd={() => setWobbling(false)}
      className={cn(
        "wobble-host pointer-events-auto flex items-center rounded-full bg-olive text-cream shadow-[0_12px_30px_-14px_rgba(27,27,27,0.65)] transition-[padding,gap] duration-500 ease-[var(--ease-out)]",
        small ? "gap-2.5 p-1.5 min-[480px]:pr-4" : "gap-3 p-2 min-[480px]:pr-5",
        wobbling && "is-wobbling",
      )}
    >
      <Medallion chip className={cn("transition-[width,height] duration-500 ease-[var(--ease-out)]", small ? "h-10 w-10" : "h-12 w-12")} />
      <img
        src={asset("brand/wordmark-light.webp")}
        alt=""
        width={600}
        height={159}
        className={cn("hidden w-auto transition-[height] duration-500 ease-[var(--ease-out)] min-[480px]:block", small ? "h-[26px]" : "h-[32px]")}
      />
    </a>
  );
}
