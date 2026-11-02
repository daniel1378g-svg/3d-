import { useEffect, useRef } from "react";
import { iconData, type IconName } from "./icons";
import { prefersReducedMotion } from "@/lib/utils";

type Props = {
  name: IconName;
  color?: string;
  accent?: string;
  size?: number;
  /** "loop" plays while on screen; "hover" plays once when the parent `.group` is hovered or focused. */
  mode?: "loop" | "hover";
  className?: string;
};

export function LottieIcon({ name, color = "#FFCC00", accent = "#FFFFFF", size = 40, mode = "loop", className }: Props) {
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
    const load = () => import("lottie-web/build/player/lottie_light").then(({ default: lottie }) => {
      if (cancelled) return;
      const anim = lottie.loadAnimation({ container: el, renderer: "svg", loop: mode === "loop", autoplay: false, animationData: iconData(name, color, accent) });
      anim.setSubframe(false);
      if (prefersReducedMotion()) {
        anim.goToAndStop(0, true);
        cleanup = () => anim.destroy();
        return;
      }
      let observer: IntersectionObserver | undefined;
      const trigger = el.closest(".group") ?? el;
      const playOnce = () => anim.goToAndPlay(0, true);
      if (mode === "loop") {
        observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? anim.play() : anim.pause()), { rootMargin: "80px" });
        observer.observe(el);
      } else {
        anim.goToAndStop(0, true);
        trigger.addEventListener("pointerenter", playOnce);
        trigger.addEventListener("focusin", playOnce);
      }
      cleanup = () => {
        observer?.disconnect();
        trigger.removeEventListener("pointerenter", playOnce);
        trigger.removeEventListener("focusin", playOnce);
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
