import { useEffect, useRef } from "react";
import { iconData, type IconName } from "./icons";
import { prefersReducedMotion } from "@/lib/utils";

type Props = {
  name: IconName;
  color?: string;
  accent?: string;
  size?: number;
  /** "hover" plays once when the parent `.group` is hovered, focused or tapped; "loop" plays three times when it comes on screen (and again on hover). */
  mode?: "loop" | "hover";
  className?: string;
};

export function LottieIcon({ name, color = "#1B1B1B", accent = "#555555", size = 40, mode = "hover", className }: Props) {
  const box = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let cleanup = () => {};
    let cancelled = false;
    // lottie-web loads only once an icon comes near the screen
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        load();
      },
      { rootMargin: "200px" },
    );
    near.observe(el);
    const load = () =>
      import("lottie-web/build/player/lottie_light").then(({ default: lottie }) => {
        if (cancelled) return;
        const anim = lottie.loadAnimation({ container: el, renderer: "svg", loop: mode === "loop" ? 2 : false, autoplay: false, animationData: iconData(name, color, accent) });
        anim.setSubframe(false);
        // a still frame that shows the whole drawing
        const rest = () => anim.goToAndStop(Math.round(anim.totalFrames * 0.45), true);
        if (prefersReducedMotion()) {
          rest();
          cleanup = () => anim.destroy();
          return;
        }
        let observer: IntersectionObserver | undefined;
        const trigger = el.closest(".group") ?? el;
        const playOnce = () => anim.goToAndPlay(0, true);
        if (mode === "loop") {
          // plays three times when it first comes on screen, then rests on its full drawing
          let played = false;
          observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !played) {
              played = true;
              anim.goToAndPlay(0, true);
            }
          }, { rootMargin: "80px" });
          observer.observe(el);
          anim.addEventListener("complete", rest);
          trigger.addEventListener("pointerenter", playOnce);
        } else {
          rest();
          trigger.addEventListener("pointerenter", playOnce);
          trigger.addEventListener("focusin", playOnce);
          trigger.addEventListener("pointerdown", playOnce);
          anim.addEventListener("complete", rest);
        }
        cleanup = () => {
          observer?.disconnect();
          trigger.removeEventListener("pointerenter", playOnce);
          trigger.removeEventListener("focusin", playOnce);
          trigger.removeEventListener("pointerdown", playOnce);
          anim.destroy();
        };
      });
    return () => {
      cancelled = true;
      near.disconnect();
      cleanup();
    };
  }, [name, color, accent, mode]);

  return <span ref={box} aria-hidden="true" className={className} style={{ width: size, height: size, display: "inline-block", flex: "none" }} />;
}
