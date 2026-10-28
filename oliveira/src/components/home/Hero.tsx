import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MOTTO, TEXT, UI } from "@/i18n";
import { CONTACT } from "@/content";
import { useSite } from "@/site";
import { asset, cn, lowPower, webglAvailable } from "@/lib/utils";
import { rustle } from "@/lib/sound";
import { sunAt, sunDate, type Phase } from "@/three/sun";
import type { HeroScene } from "@/three/oliveTree";
import { autoTilt, enableTilt, tilt, tiltNeedsPermission } from "@/lib/tilt";
import { OpenBadge } from "../OpenBadge";
import { Magnetic } from "../Magnetic";
import { SiteLink } from "../SiteLink";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The motto, letter by letter on a spring, while Fraunces' SOFT axis warms up. */
function Motto() {
  const reduce = useReducedMotion();
  const parts = [
    { text: MOTTO.pt, lang: "pt-PT", cls: "text-current" },
    { text: `– ${MOTTO.gsw}`, lang: "gsw", cls: "text-apetite-text" },
  ];
  let n = 0;
  return (
    <motion.h1
      className="display text-[clamp(2.9rem,8.4vw,7.6rem)] font-semibold leading-[0.92]"
      initial={reduce ? false : { "--soft": 0 } as never}
      animate={{ "--soft": 100 } as never}
      transition={{ duration: 1.6, ease: "easeOut", delay: 0.3 }}
    >
      {parts.map((p, pi) => (
        <span key={pi} lang={p.lang} className={cn("block", p.cls, pi === 1 && "mt-1 pl-[0.6em]")}>
          <span className="sr-only">{p.text}</span>
          {p.text.split(" ").map((w, wi, all) => (
            <span key={wi} aria-hidden="true" className="inline-block overflow-hidden pb-[0.1em] align-bottom">
              {[...w].map((ch, ci) => (
                <motion.span
                  key={ci}
                  className="inline-block"
                  initial={reduce ? false : { transform: "translateY(110%) rotate(6deg)" }}
                  animate={{ transform: "translateY(0%) rotate(0deg)" }}
                  transition={{ type: "spring", stiffness: 170, damping: 18, mass: 0.9, delay: 0.15 + Math.min(n++ * 0.035, 0.7) }}
                >
                  {ch}
                </motion.span>
              ))}
              {wi < all.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}

// The prerendered home page paints the hero poster outside #root (scripts/postbuild-routes.mjs). The first
// hero keeps that very element on screen (no second paint of the largest image); later heroes draw their own.
let shellPoster: HTMLElement | null = typeof document !== "undefined" ? document.getElementById("shell-poster") : null;

export function Hero() {
  const { lang, openBooking } = useSite();
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const scene = useRef<HeroScene | null>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [phase, setPhase] = useState<Phase>(() => sunAt(sunDate()).phase);
  const [needsTilt, setNeedsTilt] = useState(false);
  const live = useRef({ visible: true, paused: false });
  const [adopted] = useState(() => shellPoster !== null);
  useEffect(() => {
    if (!adopted || !shellPoster) return;
    const poster = shellPoster;
    const fit = () => (poster.style.height = `${section.current?.offsetHeight ?? window.innerHeight}px`);
    fit();
    const ro = new ResizeObserver(fit);
    if (section.current) ro.observe(section.current);
    return () => {
      ro.disconnect();
      poster.remove();
      shellPoster = null;
    };
  }, [adopted]);

  // The 3D loads after first paint, when the browser is idle; the poster is what paints first.
  useEffect(() => {
    if (reduce || lowPower() || !webglAvailable()) return;
    let cancelled = false;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: object) => number };
    const idle = (cb: () => void) => (w.requestIdleCallback ? w.requestIdleCallback(cb, { timeout: 1800 }) : window.setTimeout(cb, 600));
    idle(() => {
      import("@/three/oliveTree").then(({ createHero }) => {
        if (cancelled || !canvas.current) return;
        const mobile = window.innerWidth < 768;
        try {
          const s = createHero(canvas.current, {
            mobile,
            date: sunDate(),
            onReady: () => !cancelled && setReady(true),
            onGust: (k) => k > 0.5 && rustle(k),
          });
          scene.current = s;
          setPhase(s.phase);
          if (live.current.visible && !live.current.paused) s.start();
        } catch {
          /* WebGL failed: the poster stays */
        }
      });
    });
    return () => {
      cancelled = true;
      scene.current?.dispose();
      scene.current = null;
    };
  }, [reduce]);

  // Pause off-screen and in hidden tabs; keep the canvas sized.
  useEffect(() => {
    const el = section.current!;
    const sync = () => {
      const s = scene.current;
      if (!s) return;
      if (live.current.visible && !live.current.paused && !document.hidden) s.start();
      else s.stop();
    };
    const io = new IntersectionObserver(([e]) => {
      live.current.visible = e.isIntersecting;
      sync();
    });
    io.observe(el);
    const onResize = () => scene.current?.resize();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", sync);
    setNeedsTilt(tiltNeedsPermission() && matchMedia("(pointer: coarse)").matches);
    // Android and others: the phone's tilt moves the camera without asking; iOS after "Bewegung aktivieren".
    autoTilt();
    const onTilt = () => tilt.has && scene.current?.look(tilt.x * 0.8, tilt.y * 0.8);
    window.addEventListener("deviceorientation", onTilt);
    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("deviceorientation", onTilt);
    };
  }, []);
  useEffect(() => {
    live.current.paused = paused;
    const s = scene.current;
    if (!s) return;
    if (paused) s.stop();
    else if (live.current.visible) s.start();
  }, [paused]);

  // The pointer is a gust: its speed sets the strength. It also tilts the camera a little.
  const last = useRef({ x: 0, y: 0, t: 0, gust: 0 });
  const onMove = (e: React.PointerEvent) => {
    const s = scene.current;
    if (!s) return;
    const r = section.current!.getBoundingClientRect();
    if (e.pointerType === "mouse") s.look(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
    if (paused) return;
    const now = performance.now();
    const l = last.current;
    const speed = Math.hypot(e.clientX - l.x, e.clientY - l.y) / Math.max(1, now - l.t);
    l.x = e.clientX;
    l.y = e.clientY;
    l.t = now;
    if (speed > 0.25 && now - l.gust > 150) {
      l.gust = now;
      s.gustAt(e.clientX, e.clientY, Math.min(1, speed / 2.2));
    }
  };
  const onDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    scene.current?.tap(e.clientX, e.clientY);
  };
  const wind = () => {
    scene.current?.windButton();
    rustle(1);
  };

  const night = phase === "night" && ready;
  return (
    <section
      ref={section}
      className={cn("relative isolate flex min-h-[100svh] flex-col overflow-hidden transition-colors duration-700", night ? "on-dark text-linen" : "text-charcoal")}
      onPointerMove={onMove}
      onPointerDown={onDown}
      aria-label={UI.home[lang]}
    >
      {!adopted && <picture className="absolute inset-0 -z-20">
        {!__ARTIFACT__ && <source media="(max-aspect-ratio: 4/5)" type="image/avif" srcSet={asset("images/hero-poster-portrait.avif")} />}
        <source media="(max-aspect-ratio: 4/5)" type="image/webp" srcSet={asset("images/hero-poster-portrait.webp")} />
        {!__ARTIFACT__ && <source type="image/avif" srcSet={`${asset("images/hero-poster-960.avif")} 960w, ${asset("images/hero-poster.avif")} 1600w`} sizes="100vw" />}
        <source type="image/webp" srcSet={`${asset("images/hero-poster-960.webp")} 960w, ${asset("images/hero-poster.webp")} 1600w`} sizes="100vw" />
        <img src={asset("images/hero-poster.webp")} alt="" width={1600} height={1000} fetchPriority="high" decoding="async" className="h-full w-full object-cover" />
      </picture>}
      {/* Without WebGL (and with reduced motion) the poster keeps a slow drift of leaf light. */}
      {!ready && !reduce && <div aria-hidden="true" className="leaf-light absolute inset-0 -z-10" />}
      <div
        tabIndex={0}
        role="img"
        aria-label={UI.heroScene[lang]}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            wind();
          }
        }}
        className="absolute inset-0 -z-10 focus-visible:outline-offset-[-6px]"
      >
        <canvas ref={canvas} aria-hidden="true" className="h-full w-full transition-opacity duration-1000" style={{ opacity: ready ? 1 : 0 }} />
      </div>
      <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 transition-opacity duration-700", night ? "bg-[radial-gradient(ellipse_70%_55%_at_30%_62%,rgb(10_14_24/0.55),transparent_70%)]" : "bg-[radial-gradient(ellipse_70%_55%_at_30%_62%,rgb(246_241_231/0.7),transparent_72%)] max-md:bg-[radial-gradient(ellipse_100%_50%_at_50%_70%,rgb(246_241_231/0.78),transparent_75%)]")} />

      <div className="gutter relative mt-auto pb-24 pt-[calc(var(--header-h)+var(--label-h)+36vh)] md:pb-28 md:pt-[calc(var(--header-h)+var(--label-h)+18vh)]">
        <div className="wrap">
          <motion.p
            className="kicker mb-5 inline-block rounded-full bg-linen/75 px-3 py-1.5 text-charcoal backdrop-blur-sm"
            initial={reduce ? false : { opacity: 0, transform: "translateY(8px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            Restaurante Oliveira · {CONTACT.district}
          </motion.p>
          <Motto />
          <motion.p
            className="display mt-6 max-w-[30ch] text-[clamp(1.25rem,2.4vw,2rem)] italic leading-snug"
            initial={reduce ? false : { opacity: 0, transform: "translateY(12px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
          >
            {TEXT.heroLine[lang]}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, transform: "translateY(16px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ type: "spring", bounce: 0.35, duration: 0.8, delay: 1.0 }}
          >
            <Magnetic>
              <button type="button" onClick={openBooking} className="btn btn-olive" data-cursor="book">
                {UI.navReservation[lang]}
              </button>
            </Magnetic>
            <Magnetic>
              <a href={CONTACT.phoneHref} className={cn("btn", night ? "btn-ghost" : "btn-dark")} data-cursor="call">
                {UI.call[lang]} · {CONTACT.phone}
              </a>
            </Magnetic>
            <Magnetic>
              <SiteLink page="home" section="kontakt" className="btn btn-ghost">
                {UI.lageplan[lang]}
              </SiteLink>
            </Magnetic>
          </motion.div>
          <motion.div className="mt-6" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.6 }}>
            <OpenBadge tone={night ? "dark" : "light"} />
          </motion.div>
        </div>
      </div>

      {ready && (
        <div className="absolute bottom-5 right-4 z-10 flex items-center gap-2 md:right-8">
          {needsTilt && (
            <button type="button" className="btn btn-ghost min-h-10 bg-linen/70 px-4 text-sm text-charcoal backdrop-blur" onClick={() => enableTilt().then((ok) => ok && setNeedsTilt(false))}>
              {UI.motion[lang]}
            </button>
          )}
          <button type="button" onClick={wind} aria-label={`${UI.wind[lang]}: ${UI.windLabel[lang]}`} className="btn min-h-10 bg-charcoal/80 px-4 text-sm text-linen backdrop-blur hover:bg-charcoal">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            {UI.wind[lang]}
          </button>
          <button type="button" onClick={() => setPaused((p) => !p)} aria-pressed={paused} className="grid h-10 w-10 place-items-center rounded-full bg-charcoal/80 text-linen backdrop-blur hover:bg-charcoal">
            <span className="sr-only">{paused ? UI.playTree[lang] : UI.pauseTree[lang]}</span>
            {paused ? (
              <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4l13 8-13 8z" fill="currentColor" /></svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor" /></svg>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
