// The language switch, the site's signature interaction (620 ms, within the 560–640 ms of BRIEF §9):
//   1. the original logo glides from its place to the right edge of the header like a typewriter carriage; behind it a
//      horizontal reveal uncovers the header in the new language (a clone rendered with the new dictionary), and a brass
//      hairline draws along with it;
//   2. under cover of that, the page text fades out, the language changes (route, same page and section), and it fades in;
//   3. the logo re-enters from the left edge and settles exactly into its normal position; the clone is removed.
// The clip edge and the logo move together, so old and new text never overlap; the header keeps its height (no shift).
import { useLayoutEffect, useRef } from "react";
import { gsapNow } from "@/lib/gsap";
import { Header, LogoImg } from "./Header";
import { SiteContext, useSite } from "@/site";
import { cachedDict, type Lang } from "@/i18n";

export const FX_TOTAL_MS = 620;

export function LangFx({ to, deep, onCommit, onDone }: { to: Lang; deep: boolean; onCommit: () => void; onDone: () => void }) {
  const site = useSite();
  const root = useRef<HTMLDivElement>(null);
  const clone = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const t = cachedDict(to)!;

  useLayoutEffect(() => {
    const header = document.getElementById("site-header");
    const realLogo = header?.querySelector<HTMLElement>("[data-logo] img");
    const gsap = gsapNow()?.gsap;
    if (!gsap || !header || !realLogo || !root.current || !clone.current || !logo.current || !line.current) {
      onCommit();
      onDone();
      return;
    }
    const hr = header.getBoundingClientRect();
    const lr = realLogo.getBoundingClientRect();
    const W = hr.width;
    root.current.style.height = `${hr.height}px`;
    Object.assign(logo.current.style, { left: `${lr.left - hr.left}px`, top: `${lr.top - hr.top}px`, height: `${lr.height}px`, width: `${lr.width}px` });
    line.current.style.top = `${hr.height - 1}px`;
    realLogo.style.visibility = "hidden";
    const cloneLogo = clone.current.querySelector<HTMLElement>("[data-logo] img");
    if (cloneLogo) cloneLogo.style.visibility = "hidden";

    const start = lr.left - hr.left;
    const exitX = W - start + 24; // fully past the right edge
    const enterX = -(start + lr.width + 24); // just before the left edge
    const reveal = { edge: 0 }; // px from the left that already shows the new language
    const setClip = () => {
      clone.current!.style.clipPath = `inset(0 ${Math.max(0, W - reveal.edge)}px 0 0)`;
    };
    setClip();

    let committed = false;
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        realLogo.style.visibility = "";
        onDone();
      },
    });
    tl.to(logo.current, { x: exitX, duration: 0.3, ease: "power3.in" }, 0)
      .to(reveal, { edge: W + 40, duration: 0.3, ease: "power3.in", onUpdate: () => {
        // the reveal follows the logo's left edge
        const x = Number(gsap.getProperty(logo.current, "x"));
        reveal.edge = Math.min(W, start + x);
        setClip();
      } }, 0)
      .fromTo(line.current, { scaleX: 0, opacity: 1 }, { scaleX: 1, duration: 0.3, ease: "power3.in" }, 0)
      .add(() => {
        if (!committed) {
          committed = true;
          onCommit();
        }
      }, 0.24)
      .set(logo.current, { x: enterX }, 0.31)
      .add(() => {
        clone.current!.style.clipPath = "inset(0 0 0 0)";
      }, 0.31)
      .to(logo.current, { x: 0, duration: 0.31, ease: "expo.out" }, 0.31)
      .to(line.current, { opacity: 0, duration: 0.22 }, 0.38);
    return () => {
      tl.kill();
      realLogo.style.visibility = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="langfx" ref={root} aria-hidden="true">
      <div className="langfx__clone" ref={clone}>
        <SiteContext.Provider value={{ ...site, lang: to, t }}>
          <Header deep={deep} menuOpen={false} onToggleMenu={() => {}} clone />
        </SiteContext.Provider>
      </div>
      <div className="langfx__logo" ref={logo}>
        <LogoImg sizes="180px" alt="" />
      </div>
      <div className="langfx__line" ref={line} />
    </div>
  );
}
