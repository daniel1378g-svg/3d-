"use client";

import { useEffect, useRef, useState } from "react";
import { useContent } from "@/content/i18n";
import { useReducedMotion } from "@/lib/motion";
import { ArrowRight } from "./Icons";
import { scrollToHash } from "./SiteHeader";

// The supplied caldo verde video (8 s: an empty clay bowl fills with soup, greens and chouriço),
// independent of the bread film. It is fetched only when the block comes near the screen, plays
// once, muted and inline, when at least half of it is visible, and stops on the full bowl.
// It pauses when it leaves the screen or the page goes to the background; a pause by the visitor
// is respected (no automatic restart). If the browser refuses autoplay, or with reduced motion,
// the full bowl is shown with a play button.
type State = "idle" | "playing" | "paused" | "ended" | "blocked";

const VIDEO = "/videos/caldo-verde";
const POSTER = "/videos/poster/caldo";

export function CaldoVerde() {
  const { soup, ui } = useContent();
  const reduced = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const inView = useRef(false);
  const [state, setState] = useState<State>("idle");
  const [width, setWidth] = useState(1280);

  const source = (el: HTMLElement) => (el.getBoundingClientRect().width * Math.min(window.devicePixelRatio || 1, 2) > 1300 ? 1920 : 1280);

  const load = () => {
    const v = video.current!;
    if (v.getAttribute("src")) return;
    v.src = `${VIDEO}-${source(box.current!)}.mp4`;
    v.load();
  };

  const play = () => {
    const v = video.current!;
    load();
    const p = v.play();
    if (p) p.catch((err: DOMException) => setState(err?.name === "AbortError" ? "paused" : "blocked"));
  };

  useEffect(() => {
    const el = box.current!;
    const v = video.current!;
    setWidth(source(el));

    // Read live: on the first render the React state does not know the preference yet.
    const reducedNow = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tryAutoplay = () => {
      if (reducedNow() || userPaused.current || v.ended || !inView.current || document.hidden) return;
      play();
    };

    // Fetch a little before the block arrives, so it does not compete with the bread frames.
    // With reduced motion nothing is fetched until the visitor presses play.
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !reducedNow()) load();
      },
      { rootMargin: "50% 0px" },
    );
    const seen = new IntersectionObserver(
      ([e]) => {
        inView.current = e.intersectionRatio >= 0.5;
        if (inView.current) tryAutoplay();
        else if (!v.paused) v.pause();
      },
      { threshold: [0, 0.5] },
    );
    near.observe(el);
    seen.observe(el);

    const onVisibility = () => {
      if (document.hidden) {
        if (!v.paused) v.pause();
      } else tryAutoplay();
    };
    const onPlay = () => setState("playing");
    const onPause = () => {
      if (!v.ended) setState((s) => (s === "blocked" ? s : "paused"));
    };
    const onEnded = () => setState("ended");
    document.addEventListener("visibilitychange", onVisibility);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);
    return () => {
      near.disconnect();
      seen.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const toggle = () => {
    const v = video.current!;
    if (state === "playing") {
      userPaused.current = true;
      v.pause();
      return;
    }
    userPaused.current = false;
    if (state === "ended") v.currentTime = 0;
    play();
  };

  const full = reduced || state === "blocked";
  const poster = `${POSTER}-${full ? "last" : "first"}-${width}.webp`;
  const label = state === "playing" ? ui.soupPause : state === "ended" ? ui.soupReplay : ui.soupPlay;
  const aria = state === "playing" ? ui.soupPauseAria : state === "ended" ? ui.soupReplayAria : ui.soupPlayAria;

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    scrollToHash(hash);
  };

  return (
    <article id="caldo-verde" className="soup" aria-labelledby="soup-title">
      <div className="soup__media" ref={box} data-state={state} data-reveal>
        <video
          ref={video}
          className="soup__video"
          muted
          playsInline
          preload="none"
          poster={poster}
          disablePictureInPicture
          aria-label={ui.soupVideoLabel}
        />
        {full && state !== "playing" && (
          <button type="button" className="soup__big-play" onClick={toggle} aria-label={ui.soupPlayAria}>
            <PlayIcon />
          </button>
        )}
        <button type="button" className="soup__control" onClick={toggle} aria-label={aria}>
          {state === "playing" ? <PauseIcon /> : state === "ended" ? <ReplayIcon /> : <PlayIcon />}
          <span aria-hidden="true">{label}</span>
        </button>
      </div>
      <div className="soup__text" data-reveal style={{ ["--d" as string]: "140ms" }}>
        <p className="kicker">{ui.soupEyebrow}</p>
        <h3 id="soup-title" className="h-lg">
          <span>{ui.soupTitle[0]}</span>
          <span className="h-soft">{ui.soupTitle[1]}</span>
        </h3>
        <p className="soup__copy">{soup.text}</p>
        <div className="soup__ctas">
          <a className="btn btn--primary" href="#menu-duo" onClick={(e) => goTo(e, "#menu-duo")}>
            {soup.ctaDuo} <ArrowRight />
          </a>
          <a className="btn btn--ghost" href="#menu-merendeira" onClick={(e) => goTo(e, "#menu-merendeira")}>
            {soup.ctaMerendeira} <ArrowRight />
          </a>
        </div>
      </div>
    </article>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M4.5 2.8v10.4L13 8z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M4 3h2.8v10H4zM9.2 3H12v10H9.2z" fill="currentColor" />
    </svg>
  );
}

function ReplayIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
      <path d="M3.2 8a4.8 4.8 0 1 0 1.5-3.5" strokeLinecap="round" />
      <path d="M3.4 2.2v2.9h2.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
