// Sections 1 and 2: HOY!'s split hero around an arch window, and the pinned river story. The window shows
// the Douro at dusk (WebGL, still image until it loads); the pointer ripples the water. As you scroll the
// arch grows until the river fills the screen, the presentation appears as three numbered captions, a rail
// fills in red, and the scene ends on the lead line and the two buttons. The classics then slide up over it.
import { Fragment, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { animate, useReducedMotion } from "motion/react";
import { copy } from "@/copy";
import { useSite } from "@/site";
import { gsap } from "@/lib/gsap";
import { gpuWebGL } from "@/lib/webgl";
import { asset, EASE_IN_OUT, EASE_OUT } from "@/lib/utils";
import { Roll } from "@/components/ui";
import type { Douro } from "@/three/douro";

const POSTER = { src: asset("media/douro-1600.webp"), srcSet: `${asset("media/douro-800.webp")} 800w, ${asset("media/douro-1600.webp")} 1600w` };

/** The longest word in the split headline, so both halves can share one font size that fits. */
const longestWord = (parts: string[]) => Math.max(...parts.join(" ").split(/\s+/).map((w) => w.length));

export function RiverStory() {
  const reduce = useReducedMotion();
  return reduce ? <RiverStatic /> : <RiverScene />;
}

function HeroButtons({ className }: { className?: string }) {
  const { lang, book, go, href } = useSite();
  const t = copy(lang);
  return (
    <div className={className}>
      <button type="button" className="btn" aria-haspopup="dialog" onClick={(e) => book(e.currentTarget)}>
        <Roll>{t.nav.book}</Roll>
      </button>
      <a
        href={href("carte")}
        className="btn btn--ghost"
        onClick={(e) => {
          e.preventDefault();
          go("carte");
        }}
      >
        <Roll>{t.menuBtn}</Roll>
      </a>
    </div>
  );
}

function RiverScene() {
  const { lang, intro } = useSite();
  const t = copy(lang);
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const win = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const douro = useRef<Douro | null>(null);
  const clip = useRef({ open: intro === "play" ? 0 : 1, grow: 0 });
  const opened = useRef(intro !== "play");

  /** Interpolates the window: a point → the arch → the whole screen. */
  const applyClip = () => {
    const s = stage.current, a = archRef.current, w = win.current;
    if (!s || !a || !w) return;
    const W = s.clientWidth, H = s.clientHeight;
    const r = a.getBoundingClientRect(), sr = s.getBoundingClientRect();
    const arch = { t: r.top - sr.top, l: r.left - sr.left, rt: sr.right - r.right, b: sr.bottom - r.bottom, rad: r.width / 2 };
    const point = { t: arch.t + (H - arch.t) * 0.45, l: W / 2, rt: W / 2, b: (H - arch.t) * 0.55, rad: 0 };
    const { open, grow } = clip.current;
    const lerp = (x: number, y: number, k: number) => x + (y - x) * k;
    const mix = (k: keyof typeof arch) => lerp(lerp(point[k], arch[k], open), 0, grow);
    w.style.clipPath = `inset(${mix("t")}px ${mix("rt")}px ${mix("b")}px ${mix("l")}px round ${mix("rad")}px ${mix("rad")}px 0px 0px)`;
  };

  // The intro lifts: the arch opens from a point, the headline rises word by word, the rest fades in.
  useEffect(() => {
    if (intro === "play" || !stage.current) return;
    const first = !opened.current;
    opened.current = true;
    const words = stage.current.querySelectorAll<HTMLElement>(".river-title .split-inner");
    const extras = stage.current.querySelectorAll<HTMLElement>("[data-hero-fade]");
    const controls = [
      animate(clip.current.open, 1, { duration: first ? 1.1 : 0, ease: EASE_IN_OUT, onUpdate: (v) => ((clip.current.open = v), applyClip()) }),
      ...Array.from(words).map((el, i) => animate(el, { y: ["110%", "0%"] }, { duration: 0.9, delay: (first ? 0.35 : 0.1) + i * 0.06, ease: EASE_OUT })),
      ...Array.from(extras).map((el, i) => animate(el, { opacity: [0, 1], y: [16, 0] }, { duration: 0.7, delay: (first ? 0.8 : 0.4) + i * 0.08, ease: EASE_OUT })),
    ];
    return () => controls.forEach((c) => c.stop());
  }, [intro]); // eslint-disable-line react-hooks/exhaustive-deps

  // The scroll story.
  useLayoutEffect(() => {
    const sec = section.current!;
    const st = stage.current!;
    const overlap = () => window.innerHeight * (window.innerWidth < 768 ? 0.7 : 0.8);
    const ctx = gsap.context(() => {
      const caps = gsap.utils.toArray<HTMLElement>(".river-cap");
      const marks = gsap.utils.toArray<HTMLElement>(".river-mark");
      const counter = st.querySelector<HTMLElement>(".river-count")!;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${sec.offsetHeight - window.innerHeight - overlap()}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onRefresh: applyClip,
          onUpdate: (self) => {
            const p = self.progress;
            douro.current?.setScroll(p);
            const chapter = p < 0.49 ? 0 : p < 0.67 ? 1 : 2;
            marks.forEach((m, i) => m.toggleAttribute("data-on", i <= chapter && p > 0.28));
            counter.textContent = `${String(chapter + 1).padStart(2, "0")} / 03`;
            end.inert = p < 0.84;
          },
        },
      });
      // Texts fade with opacity only (they stay readable to screen readers); the buttons use autoAlpha
      // so hidden ones cannot be focused, and the end block is inert until it shows.
      const end = st.querySelector<HTMLElement>(".river-end")!;
      tl.to(".river-title", { yPercent: -18, opacity: 0, duration: 0.12 }, 0)
        .to("[data-hero-fade]", { autoAlpha: 0, y: 24, duration: 0.08 }, 0)
        .to(clip.current, { grow: 1, duration: 0.28, onUpdate: applyClip }, 0.03)
        .to(".river-shade", { opacity: 1, duration: 0.1 }, 0.24)
        .to(".river-rail", { autoAlpha: 1, duration: 0.04 }, 0.28)
        .fromTo(".river-fill", { scaleY: 0 }, { scaleY: 1, duration: 0.56 }, 0.3);
      const slots = [0.3, 0.5, 0.68];
      caps.forEach((cap, i) => {
        tl.fromTo(cap, { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 0.06 }, slots[i]);
        tl.to(cap, { opacity: 0, y: -36, duration: 0.05 }, slots[i] + 0.14);
      });
      tl.fromTo(end, { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 0.08 }, 0.86).to({}, { duration: 0.06 }, 0.94);
      end.inert = true;
    }, sec);
    applyClip();
    const ro = new ResizeObserver(applyClip);
    ro.observe(st);
    return () => {
      ro.disconnect();
      ctx.revert();
    };
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const longest = longestWord(t.heroSplit);
  return (
    <section id="accueil" ref={section} className="river" aria-labelledby="hero-title">
      <div ref={stage} className="river-stage">
        <div ref={win} className="river-window" style={{ clipPath: "inset(50% 50% 50% 50%)" }}>
          <DouroLayer stage={stage} handle={douro} />
          <div className="river-shade" />
        </div>
        <div ref={archRef} className="river-arch-ref" aria-hidden="true" />

        <div className="river-hero">
          <h1 id="hero-title" className="river-title" style={{ ["--longest" as string]: longest }}>
            <span className="sr-only">Pica Pau – </span>
            {t.heroSplit.map((half, h) => (
              <span key={h} className={h === 0 ? "river-left" : "river-right"}>
                <span className="river-line">
                  {half.split(" ").map((w, i) => (
                    <Fragment key={i}>
                      <span className="split-word">
                        <span className="split-inner" style={intro === "play" ? undefined : { transform: "translateY(110%)" }}>
                          {w}
                        </span>
                      </span>{" "}
                    </Fragment>
                  ))}
                </span>
              </span>
            ))}
          </h1>
          <div className="river-actions" data-hero-fade>
            <HeroButtons className="flex flex-wrap gap-3" />
          </div>
          <p className="river-meta" data-hero-fade>
            {t.tagline} · Rue Hugo‑de‑Senger 3 · {t.city.replace(/^\d+\s/, "")}
          </p>
          <p className="river-hint" data-hero-fade aria-hidden="true">
            <i className="scroll-hint-line" />
            {t.menu.scrollHint}
          </p>
        </div>

        <ol className="river-caps">
          {t.story.map((line, i) => (
            <li key={i} className="river-cap" data-side={i === 1 ? "right" : "left"}>
              <span className="eyebrow text-dourado">{String(i + 1).padStart(2, "0")}</span>
              <p className="river-cap-text">{line}</p>
            </li>
          ))}
        </ol>
        <div className="river-end" inert>
          <p className="display fs-xl text-balance">{t.lead}</p>
          <HeroButtons className="flex flex-wrap justify-center gap-3" />
        </div>

        <div className="river-rail" aria-hidden="true">
          <span className="river-track">
            <span className="river-fill" />
          </span>
          <ul className="river-marks">
            {t.storyMarks.map((m, i) => (
              <li key={i} className="river-mark" style={{ top: `${i * 50}%` }}>
                {String(i + 1).padStart(2, "0")} · {m}
              </li>
            ))}
          </ul>
          <span className="river-count tnum">01 / 03</span>
        </div>
      </div>
    </section>
  );
}

/** The river: the still image at once, then the WebGL scene after first paint on a real GPU. */
function DouroLayer({ stage, handle }: { stage: RefObject<HTMLDivElement | null>; handle: RefObject<Douro | null> }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!gpuWebGL()) return;
    let cancelled = false;
    let cleanup = () => {};
    const start = () =>
      import("@/three/douro").then(({ createDouro }) => {
        const c = canvas.current, s = stage.current;
        if (cancelled || !c || !s) return;
        let scene: Douro;
        try {
          scene = createDouro(c);
        } catch {
          return; // keep the still
        }
        handle.current = scene;
        const size = () => scene.resize(s.clientWidth, s.clientHeight);
        size();
        const ro = new ResizeObserver(size);
        ro.observe(s);
        let onScreen = true;
        const run = () => scene.setRunning(onScreen && document.visibilityState === "visible");
        const io = new IntersectionObserver(([e]) => ((onScreen = e.isIntersecting), run()));
        io.observe(s);
        document.addEventListener("visibilitychange", run);
        run();
        let last = { x: -1, y: -1, t: 0 };
        const toUv = (e: PointerEvent) => {
          const r = s.getBoundingClientRect();
          return { x: (e.clientX - r.left) / r.width, y: 1 - (e.clientY - r.top) / r.height };
        };
        const onMove = (e: PointerEvent) => {
          const p = toUv(e);
          const now = performance.now();
          if (Math.hypot(p.x - last.x, p.y - last.y) > 0.03 || now - last.t > 260) {
            scene.ripple(p.x, p.y, 0.55);
            last = { ...p, t: now };
          }
        };
        const onDown = (e: PointerEvent) => {
          const p = toUv(e);
          scene.ripple(p.x, p.y, 1.2);
        };
        s.addEventListener("pointermove", onMove, { passive: true });
        s.addEventListener("pointerdown", onDown, { passive: true });
        requestAnimationFrame(() => !cancelled && setLive(true));
        cleanup = () => {
          ro.disconnect();
          io.disconnect();
          document.removeEventListener("visibilitychange", run);
          s.removeEventListener("pointermove", onMove);
          s.removeEventListener("pointerdown", onDown);
          handle.current = null;
          scene.dispose();
        };
      });
    // after first paint, when the main thread has a moment
    const id = window.setTimeout(() => ("requestIdleCallback" in window ? requestIdleCallback(() => start(), { timeout: 1500 }) : start()), 400);
    return () => {
      cancelled = true;
      clearTimeout(id);
      cleanup();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <img className="river-poster" src={POSTER.src} srcSet={POSTER.srcSet} sizes="100vw" alt="" width="1600" height="1000" decoding="async" />
      <canvas ref={canvas} className="river-canvas" style={{ opacity: live ? 1 : 0 }} aria-hidden="true" />
    </>
  );
}

/** Reduced motion: no pinning, no scrubbing; the still river in its arch and the captions as text. */
function RiverStatic() {
  const { lang } = useSite();
  const t = copy(lang);
  return (
    <section id="accueil" className="tone-azulejo pb-24" aria-labelledby="hero-title">
      <div className="container grid gap-8 pt-[calc(var(--header-h)+var(--label-h)+48px)]">
        <h1 id="hero-title" className="display fs-xxl">
          <span className="sr-only">Pica Pau – </span>
          <span className="block">{t.heroSplit[0]}</span>
          <span className="block text-dourado">{t.heroSplit[1]}</span>
        </h1>
        <HeroButtons className="flex flex-wrap gap-3" />
        <div className="arch-tall relative aspect-[16/10] max-h-[70svh] w-full overflow-hidden" style={{ borderRadius: "50% 50% 18px 18px / 30% 30% 18px 18px" }}>
          <img src={POSTER.src} srcSet={POSTER.srcSet} sizes="100vw" alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <p className="meta text-azulejo-claro">
          {t.tagline} · Rue Hugo-de-Senger 3 · {t.city.replace(/^\d+\s/, "")}
        </p>
        <ol className="m-0 grid list-none gap-8 p-0 md:grid-cols-3">
          {t.story.map((line, i) => (
            <li key={i} className="grid gap-2">
              <span className="eyebrow text-dourado">{String(i + 1).padStart(2, "0")} / 03</span>
              <p className="lede">{line}</p>
            </li>
          ))}
        </ol>
        <p className="display fs-xl">{t.lead}</p>
      </div>
    </section>
  );
}
