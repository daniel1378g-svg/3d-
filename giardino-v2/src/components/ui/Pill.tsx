import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { IconExternal } from "../icons";

// One pill button: variants through cva; the label rolls up on hover while a copy rises from below (0.42 s).
const pill = cva("btn", {
  variants: {
    variant: { gold: "", ghost: "btn--ghost", dark: "btn--dark", cream: "btn--cream", olive: "btn--olive", green: "btn--green" },
    size: { md: "", sm: "btn--sm", lg: "btn--lg" },
  },
  defaultVariants: { variant: "gold", size: "md" },
});

type Common = VariantProps<typeof pill> & { children: ReactNode; icon?: ReactNode; iconRight?: ReactNode; className?: string };

/** The rolling label: the visible copy and a duplicate hidden from assistive technology. */
export function Roll({ children }: { children: ReactNode }) {
  return (
    <span className="btn-roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

export const PillButton = forwardRef<HTMLButtonElement, Common & ButtonHTMLAttributes<HTMLButtonElement>>(function PillButton(
  { variant, size, icon, iconRight, children, className, type = "button", ...rest },
  ref,
) {
  return (
    <button ref={ref} type={type} className={cn(pill({ variant, size }), className)} {...rest}>
      {icon}
      <Roll>{children}</Roll>
      {iconRight}
    </button>
  );
});

export const PillLink = forwardRef<HTMLAnchorElement, Common & AnchorHTMLAttributes<HTMLAnchorElement> & { external?: boolean }>(function PillLink(
  { variant, size, icon, iconRight, children, className, external, ...rest },
  ref,
) {
  const { lang } = useSite();
  return (
    <a ref={ref} className={cn(pill({ variant, size }), className)} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      {icon}
      <Roll>{children}</Roll>
      {external ? <IconExternal size={16} /> : iconRight}
      {external && <span className="sr-only"> ({UI.newTab[lang]})</span>}
    </a>
  );
});

/** A text link to another site: opens in a new tab, says so to screen readers and shows a small mark. */
export function ExtLink({ href, children, className, mark = true }: { href: string; children: ReactNode; className?: string; mark?: boolean }) {
  const { lang } = useSite();
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="link">{children}</span>
      {mark && <IconExternal size={14} className="shrink-0 opacity-70" />}
      <span className="sr-only"> ({UI.newTab[lang]})</span>
    </a>
  );
}
