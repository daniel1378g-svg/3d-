// "Schicht für Schicht": the build-your-own cup, in illustrated discovery mode. Manna's site says you choose the
// cup size, extra fruit and extras, but publishes no sizes, options or prices – so this explains the idea in four
// steps (açaí, fruit, extras, your cup) and never offers a combination, a price or an order. The steps advance
// while the section scrolls into view (no pinning), and can be stepped through at any time; the step list is the
// text equivalent. Beside it, Manna's own clip of a cup being layered at the counter.
import { useEffect, useRef, useState } from "react";
import { fill } from "@/i18n";
import { useSite } from "@/site";
import { ScrollTrigger } from "@/lib/gsap";
import { asset, cn } from "@/lib/utils";
import { IconChevronLeft, IconChevronRight, IconPause, IconPlay, IconReplay } from "../icons";
import { CupArt } from "./CupArt";

export function ShopClip({ id, title, caption, className }: { id: string; title: string; caption: string; className?: string }) {
  const { t, reduce } = useSite();
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // plays only while visible and only if motion is welcome; never with sound
  useEffect(() => {
    const v = video.current;
    if (!v || reduce) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().then(() => setPlaying(true)).catch(() => {});
      else { v.pause(); setPlaying(false); }
    }, { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);
  const toggle = () => {
    const v = video.current!;
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {});
    else { v.pause(); setPlaying(false); }
  };
  return (
    <figure className={cn("relative overflow-hidden rounded-[var(--radius-card)] bg-acai text-cream", className)}>
      <video ref={video} muted loop playsInline preload="none" poster={asset(`/video/${id}-poster.webp`)} className="aspect-[9/14] w-full object-cover" aria-label={title}>
        <source src={asset(`/video/${id}.webm`)} type="video/webm" />
        <source src={asset(`/video/${id}.mp4`)} type="video/mp4" />
      </video>
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-acai/90 to-transparent p-4 pt-16">
        <span>
          <span className="block font-display text-[1.05rem] font-extrabold">{title}</span>
          <span className="block text-xs text-cream/85">{caption}</span>
        </span>
        <button type="button" className="icon-btn h-11 w-11 shrink-0" onClick={toggle} aria-label={playing ? t.a11y.videoPause : t.a11y.videoPlay}>
          {playing ? <IconPause size={18} /> : <IconPlay size={18} />}
        </button>
      </figcaption>
    </figure>
  );
}

export function CupStory() {
  const { t, reduce } = useSite();
  const c = t.cup;
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(reduce ? 4 : 0);
  const touched = useRef(false);
  const total = c.steps.length;

  useEffect(() => {
    if (reduce) { setStep(4); return; }
    const st = ScrollTrigger.create({
      trigger: root.current, start: "top 65%", end: "center 40%",
      onUpdate: (s) => { if (!touched.current) setStep((n) => Math.max(n, Math.min(total, 1 + Math.floor(s.progress * total)))); },
      onLeave: () => { if (!touched.current) setStep(total); },
    });
    if (st.progress >= 1) setStep(total);
    return () => st.kill();
  }, [reduce, total]);

  const go = (n: number) => { touched.current = true; setStep(Math.max(1, Math.min(total, n))); };
  const shown = Math.max(step, 0);

  return (
    <section ref={root} id="becher" data-anchor="becher" className="skin-lilac relative overflow-hidden py-24 md:py-32" aria-labelledby="cup-title">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-10 h-[520px] w-[520px] rounded-full bg-lilac opacity-30 blur-[100px]" />
      <div className="gutter relative">
        <div className="wrap">
          <p className="kicker text-plum" data-lang-stagger>{c.kicker}</p>
          <h2 id="cup-title" className="display mt-3 text-[clamp(3.4rem,9vw,9rem)] text-plum">{c.title}</h2>
          <p className="lead mt-5 max-w-[40rem] text-ink/85">{c.lead}</p>

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,0.75fr)]">
            {/* the steps: controls and the text equivalent at once */}
            <div className="order-2 lg:order-1">
              <h3 className="sr-only">{c.textTitle}</h3>
              <ol className="flex flex-col gap-2">
                {c.steps.map((s, i) => (
                  <li key={s.title}>
                    <button type="button" onClick={() => go(i + 1)} aria-current={shown === i + 1 ? "step" : undefined}
                      className={cn("flex w-full gap-4 rounded-[22px] p-4 text-left transition-[background-color,color] duration-300",
                        shown >= i + 1 ? "bg-plum text-cream" : "bg-cream/70 text-ink hover:bg-cream")}>
                      <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full font-display font-extrabold", shown >= i + 1 ? "bg-lime text-ink" : "bg-lilac-3 text-plum")}>{i + 1}</span>
                      <span>
                        <span className="block font-display text-[1.2rem] font-extrabold leading-tight">{s.title}</span>
                        <span className={cn("mt-1 block text-[0.95rem]", shown >= i + 1 ? "text-cream/90" : "text-ink/80")}>{s.text}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
              <div className="mt-4 flex items-center gap-2">
                <button type="button" className="icon-btn bg-plum text-cream disabled:opacity-30" onClick={() => go(shown - 1)} disabled={shown <= 1} aria-label={c.prev}><IconChevronLeft /></button>
                <button type="button" className="icon-btn bg-plum text-cream disabled:opacity-30" onClick={() => go(shown + 1)} disabled={shown >= total} aria-label={c.next}><IconChevronRight /></button>
                <button type="button" className="chip text-ink" onClick={() => { touched.current = true; setStep(0); requestAnimationFrame(() => setStep(1)); }}><IconReplay size={16} />{c.restart}</button>
                <span className="ml-auto text-sm text-ink/75 tabular" aria-live="polite">{fill(c.stepLabel, { n: Math.max(1, shown), total })}</span>
              </div>
              <p className="mt-6 rounded-[20px] bg-cream/80 p-4 text-[0.95rem] text-ink/85">{c.inStore}</p>
            </div>

            <figure className="order-1 mx-auto w-full max-w-[420px] lg:order-2">
              <CupArt step={shown} reduce={reduce} label={`${c.title} ${c.steps.slice(0, Math.max(1, shown)).map((s) => s.title).join(", ")}`} />
              <figcaption className="mt-2 text-center text-xs text-ink/75">{c.illustration}</figcaption>
            </figure>

            <ShopClip id="clip-acai-becher" title={c.clipTitle} caption={c.clipCaption} className="order-3 mx-auto w-full max-w-[340px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
