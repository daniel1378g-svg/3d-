import type { AnchorHTMLAttributes, MouseEvent } from "react";
import type { PageKey } from "@/i18n";
import { useSite } from "@/site";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { page: PageKey; section?: string; state?: Record<string, unknown> };

/** An internal link: a real href for new tabs and crawlers, client-side navigation on a plain click. */
export function SiteLink({ page, section, state, onClick, ...rest }: Props) {
  const { go, href } = useSite();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    go(page, section, state);
  };
  return <a href={href(page, section)} onClick={handle} {...rest} />;
}
