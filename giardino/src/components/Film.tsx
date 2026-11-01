// The restaurant's film (BRIEF §6): never autoplayed. The band shows the poster frame; «Film ansehen» opens a dialog
// with the native player. Proposal mode: the film is not rehosted – the player streams the original from
// pizzeriagiardino.ch, and only after a second, explicit click on play (it is 183 MB). Launch mode: the owners'
// re-encoded copy (scripts/prepare_video.py → /video/giardino-film-720.mp4), started by the click that opened it.
import { useEffect, useRef } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useSite, PROPOSAL } from "@/site";
import { Close, Film as FilmIcon } from "./icons";
import { useGsap } from "@/lib/gsap";

const pre = __ARTIFACT__ ? "" : "/";
export const FILM_LIVE = "https://pizzeriagiardino.ch/data/Ressources/1756717407-giardino_video_full_length.mp4";
export const FILM = { full: PROPOSAL ? FILM_LIVE : "/video/giardino-film-720.mp4", poster: `${pre}video/giardino-film-poster.webp` };

export function FilmBand({ id }: { id: string }) {
  const { t, reduced } = useSite();
  const section = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const { gsap } = useGsap();

  // the letterbox opens as the band scrolls in (clip-path only)
  useEffect(() => {
    if (reduced || !section.current || !gsap) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".film__mask", { "--film-inset": "7%" }, { "--film-inset": "0%", ease: "none", scrollTrigger: { trigger: section.current, start: "top bottom", end: "top 25%", scrub: 0.5 } });
    }, section);
    return () => ctx.revert();
  }, [reduced, gsap]);

  return (
    <section className="film on-dark" id={id} ref={section} aria-labelledby="film-title">
      <div className="film__mask">
        <img src={FILM.poster} width={1280} height={720} alt="" loading="lazy" decoding="async" />
        <div className="film__veil" aria-hidden="true" />
      </div>
      <div className="film__copy">
        <p className="kicker">{t.home.film.kicker}</p>
        <h2 id="film-title" className="display h-l" data-reveal>{t.home.film.title}</h2>
        <p className="lead" data-reveal data-delay="60">{t.home.film.body}</p>
        <div data-reveal data-delay="120" style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          {__ARTIFACT__ ? (
            // the claude.ai preview cannot play media from other sites: the film opens on pizzeriagiardino.ch
            <a className="btn btn--light" href={FILM_LIVE} target="_blank" rel="noopener noreferrer">
              <FilmIcon />
              {t.cta.film}
            </a>
          ) : (
            <button type="button" className="btn btn--light" onClick={() => setOpen(true)} aria-haspopup="dialog">
              <FilmIcon />
              {t.cta.film}
            </button>
          )}
          <span className="muted" style={{ color: "rgb(245 240 230 / .75)", fontSize: 14 }}>{t.home.film.duration}</span>
        </div>
      </div>
      {open && <FilmDialog onClose={() => setOpen(false)} />}
    </section>
  );
}

export function FilmDialog({ onClose }: { onClose: () => void }) {
  const { t } = useSite();
  const box = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(typeof document !== "undefined" ? document.activeElement : null);
  useEffect(() => {
    const el = box.current!;
    el.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const f = [...el.querySelectorAll<HTMLElement>("button,video")];
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault();
          f.at(-1)!.focus();
        } else if (!e.shiftKey && document.activeElement === f.at(-1)) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    const o = opener.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      (o as HTMLElement | null)?.focus?.();
    };
  }, [onClose]);
  return createPortal(
    <div className="modal" role="dialog" aria-modal="true" aria-label={t.home.film.title} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal__box" ref={box}>
        <button type="button" className="icon-btn modal__close" onClick={onClose}>
          <Close />
          <span className="sr-only">{t.a11y.close}</span>
        </button>
        <video controls autoPlay={!PROPOSAL} playsInline poster={FILM.poster} preload={PROPOSAL ? "none" : "auto"}>
          <source src={FILM.full} type="video/mp4" />
        </video>
        {PROPOSAL && <p className="modal__note">{t.home.film.liveNote}</p>}
      </div>
    </div>,
    document.body,
  );
}
