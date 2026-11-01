// Internal links keep their real href (works without JavaScript, open in new tab, crawlable) and run the page
// transition on a plain click. Same-page anchors scroll smoothly (instantly with reduced motion).
import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { useSite } from "@/site";
import { useLocation } from "@/lib/router";
import { External } from "./icons";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function scrollToAnchor(id: string, reduced: boolean) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
  return true;
}

export function Link({ href, onClick, children, ...rest }: Props) {
  const { go, reduced } = useSite();
  const loc = useLocation();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (rest.target && rest.target !== "_self") return;
    if (!href.startsWith("/") && !href.startsWith("#")) return;
    e.preventDefault();
    const u = new URL(href, "http://x" + loc.pathname);
    if (u.pathname === loc.pathname && u.hash && !u.search) {
      if (scrollToAnchor(u.hash.slice(1), reduced)) history.replaceState(history.state, "", u.pathname + loc.search + u.hash);
      return;
    }
    go(u.pathname + u.search + u.hash);
  };
  return (
    <a href={__ARTIFACT__ ? toArtifactHash(href) : href} onClick={handle} {...rest}>
      {children}
    </a>
  );
}

/** In the preview the address is "#de-essen-geniessen"; links show that form so a new tab still lands right. */
export function toArtifactHash(href: string) {
  if (!href.startsWith("/")) return href;
  const u = new URL(href, "http://x");
  return "#" + (u.pathname.replace(/^\/|\/$/g, "").split("/").filter(Boolean).join("-") || "de");
}

/** Anything that opens in a new tab says so: a visible mark (BRIEF §11) and a note for screen readers. */
export function NewTabMark() {
  const { t } = useSite();
  return (
    <>
      <External className="ext-mark" />
      <span className="sr-only"> ({t.a11y.newTab})</span>
    </>
  );
}

/** External links open in a new tab, marked as such. */
export function ExtLink({ href, children, className, label }: { href: string; children: React.ReactNode; className?: string; label?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>
      {children}
      <NewTabMark />
    </a>
  );
}
