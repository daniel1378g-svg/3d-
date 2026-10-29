import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// shadcn-style button: one component, variants through cva, the label rolls up on hover.
const pill = cva("btn", {
  variants: {
    variant: { gold: "", ghost: "btn--ghost", dark: "btn--dark", cream: "btn--cream", blue: "btn--blue", coral: "btn--coral" },
    size: { md: "", sm: "btn--sm", lg: "btn--lg" },
  },
  defaultVariants: { variant: "gold", size: "md" },
});

type Common = VariantProps<typeof pill> & { children: ReactNode; icon?: ReactNode; iconRight?: ReactNode; className?: string; label?: string };

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

export const PillLink = forwardRef<HTMLAnchorElement, Common & AnchorHTMLAttributes<HTMLAnchorElement>>(function PillLink(
  { variant, size, icon, iconRight, children, className, ...rest },
  ref,
) {
  return (
    <a ref={ref} className={cn(pill({ variant, size }), className)} {...rest}>
      {icon}
      <Roll>{children}</Roll>
      {iconRight}
    </a>
  );
});
