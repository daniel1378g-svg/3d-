// The first screen, «La finestra»: on ivory paper an arched window looks out onto the Giardino under the cliffs of
// Leukerbad; the olive branch hangs in front of it; the restaurant's own words as the headline. Scrolling opens the
// window to the full photograph (desktop, a short sticky stretch – the page keeps scrolling normally), and the next
// line of the story rises over it. Menu and reservation are clickable from the first frame.
import { useEffect, useRef } from "react";
import { useSite, useMediaQuery } from "@/site";
import { Img, srcSet } from "@/components/Img";
import { Link } from "@/components/Link";
import { OpeningStatus } from "@/components/Hours";
import { OliveBranch, type BranchHandle } from "@/components/OliveBranch";
import { Arrow } from "@/components/icons";
import { ANCHORS } from "@/routes";
import { useGsap } from "@/lib/gsap";

export const PHOTO = "aerial-village";
/** desktop: the full-bleed photo; mobile: the arch crops a portrait out of the landscape (≈ 1.3 × the screen width) */
export const HERO_SIZES = "(min-width: 1081px) 1600px, 130vw";
/** the Giardino (dark roof, terrace, pirate ship) in the photograph, as fractions of width and height */
const FOCUS = { x: 0.43, y: 0.77 };
const OBJECT_POS = { x: 0.6, y: 0.62 };

/**
 * Pan and zoom that put the restaurant into the arched window (desktop). The photo itself is laid out full-bleed and
 * only clipped to the arch, so opening the window is a clip + transform animation (no layout per frame).
 */
function windowPose(box: DOMRect, natural: { w: number; h: number }, arch: { left: number; right: number; top: number; bottom: number }) {
  const W = box.width;
  const H = box.height;
  const s = Math.max(W / natural.w, H / natural.h);
  const dw = natural.w * s;
  const dh = natural.h * s;
  const ox = (W - dw) * OBJECT_POS.x;
  const oy = (H - dh) * OBJECT_POS.y;
  const F = { x: ox + FOCUS.x * dw, y: oy + FOCUS.y * dh };
  const A = { x: (arch.left + arch.right) / 2, y: arch.top + (arch.bottom - arch.top) * 0.66 };
  const C = { x: W / 2, y: H / 2 };
  const zoom = 1.3;
  let tx = A.x - C.x - (F.x - C.x) * zoom;
  let ty = A.y - C.y - (F.y - C.y) * zoom;
  // keep the arch covered by the photo
  const left = C.x + (ox - C.x) * zoom + tx;
  const right = C.x + (ox + dw - C.x) * zoom + tx;
  const top = C.y + (oy - C.y) * zoom + ty;
  const bottom = C.y + (oy + dh - C.y) * zoom + ty;
  const m = 16; // safety margin
  if (left > arch.left - m) tx -= left - arch.left + m;
  if (right < arch.right + m) tx += arch.right + m - right;
  if (top > arch.top - m) ty -= top - arch.top + m;
  if (bottom < arch.bottom + m) ty += arch.bottom + m - bottom;
  return { tx, ty, zoom };
}

export function Hero() {
  const { t, href, reduced } = useSite();
  const section = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const branch = useRef<BranchHandle>(null);
  const desktop = useMediaQuery("(min-width: 1081px)");
  const { gsap, ScrollTrigger } = useGsap();

  // first paint uses at most 1600 w (the LCP image stays ≤ 180 KB); on large screens the opened window then gets the
  // 2400 w candidate of the same <picture> (AVIF or WebP) once the page is idle
  useEffect(() => {
    if (!desktop || window.innerWidth * (window.devicePixelRatio || 1) < 1900) return;
    const pic = media.current?.querySelector("picture");
    if (!pic) return;
    const id = window.setTimeout(() => {
      const source = pic.querySelector("source");
      if (source) source.srcset = srcSet(PHOTO, "avif");
      const img = pic.querySelector("img")!;
      img.srcset = srcSet(PHOTO, "webp");
      pic.querySelectorAll("source, img").forEach((el) => el.setAttribute("sizes", "2400px"));
    }, 2500);
    return () => window.clearTimeout(id);
  }, [desktop]);

  // entrance: CSS keyframes (index.css, «hero entrance»), started here; resolves within 1.2 s and plays once per
  // session – afterwards the inline script no longer sets html.intro (also for later visits in this session)
  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        sessionStorage.setItem("giardino-intro", "1");
      } catch {
        /* private mode: the intro may play again, nothing else */
      }
      document.documentElement.classList.remove("intro");
    }, 1300);
    return () => window.clearTimeout(id);
  }, []);

  // the window's start geometry, in pixels (CSS calc() values cannot be interpolated), recomputed on resize
  const setPose = () => {
    const m = media.current;
    if (!m || !window.matchMedia("(min-width: 1081px)").matches) {
      ["--ay0", "--ab0", "--rad0", "--tx0", "--ty0", "--zoom0"].forEach((v) => m?.style.removeProperty(v));
      return;
    }
    const W = window.innerWidth;
    const H = window.innerHeight;
    const header = document.getElementById("site-header")?.getBoundingClientRect().bottom ?? 100;
    const arch = { left: W * 0.54, right: W * 0.95, top: header + H * 0.03, bottom: H * 0.93 };
    const meta = { w: 5272, h: 3948 };
    const p = windowPose(m.getBoundingClientRect(), meta, arch);
    // the closed window and the camera pose; GSAP only animates the unitless progress values on the section
    m.style.setProperty("--ay0", `${Math.round(arch.top)}px`);
    m.style.setProperty("--ab0", `${Math.round(H * 0.07)}px`);
    m.style.setProperty("--rad0", `${Math.round(W * 0.205)}px`);
    m.style.setProperty("--tx0", `${p.tx.toFixed(1)}px`);
    m.style.setProperty("--ty0", `${p.ty.toFixed(1)}px`);
    m.style.setProperty("--zoom0", p.zoom.toFixed(3));
  };
  useEffect(() => {
    setPose();
    const on = () => setPose();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [desktop]);

  // scroll: the window opens (desktop only)
  useEffect(() => {
    if (reduced || !desktop || !section.current || !media.current || !gsap || !ScrollTrigger) return;
    const sec = section.current;
    const ctx = gsap.context(() => {
      gsap.set(sec, { "--open": 0, "--pan": 0, "--shade": 0, "--outro": 0 });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => branch.current?.setScroll(self.progress, self.getVelocity()),
        },
      });
      tl.to(sec, { "--open": 1, duration: 0.62, ease: "power1.inOut" }, 0)
        .to(sec, { "--pan": 1, duration: 0.72, ease: "power1.inOut" }, 0)
        .to(".hero__frame", { opacity: 0, duration: 0.18 }, 0)
        .to(copy.current, { opacity: 0, y: -70, duration: 0.3 }, 0)
        .to(".hero__branch", { opacity: 0, y: -90, duration: 0.42 }, 0.12)
        .to(".hero__caption, .hero__scroll", { opacity: 0, duration: 0.15 }, 0)
        .to(sec, { "--shade": 1, duration: 0.3 }, 0.45)
        .to(sec, { "--outro": 1, duration: 0.3 }, 0.6)
        .to({}, { duration: 0.1 });
    }, section);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reduced, desktop, gsap, ScrollTrigger]);

  return (
    <section className="hero" id={ANCHORS.welcome} ref={section} aria-labelledby="hero-title">
      <div className="hero__stage">
        <div className="hero__media" ref={media}>
          <Img id={PHOTO} priority sizes={HERO_SIZES} maxWidth={1600} focus={desktop ? "60% 62%" : "43% 77%"} />
          <div className="hero__shade" aria-hidden="true" />
        </div>
        <div className="hero__frame" aria-hidden="true" />
        <OliveBranch ref={branch} />
        <div className="hero__copy" ref={copy}>
          <p className="kicker hero__fade">{t.home.hero.kicker}</p>
          <h1 id="hero-title" className="display hero__title split" style={{ fontSize: "clamp(48px, 6.3vw, 112px)" }}>
            <span className="l l--italic"><span>{t.home.hero.title1}</span></span>
            <span className="l"><span>{t.home.hero.title2}</span></span>
            <span className="l"><span>{t.home.hero.title3}</span></span>
          </h1>
          <p className="lead hero__lead hero__fade">{t.home.hero.lead}</p>
          <div className="hero__actions hero__fade">
            <Link href={href("menu")} className="btn">
              {t.cta.menu}
              <Arrow />
            </Link>
            <Link href={href("reserve")} className="btn btn--accent">
              {t.cta.reserve}
            </Link>
          </div>
          <div className="hero__fade">
            <OpeningStatus />
          </div>
        </div>
        <p className="hero__caption">{t.home.hero.photoCaption}</p>
        <a className="hero__scroll" href={`#${ANCHORS.story}`}>
          <i aria-hidden="true" />
          {t.a11y.scrollHint}
        </a>
        <div className="hero__outro" aria-hidden="true">
          <p>{t.home.hero.outro}</p>
        </div>
      </div>
    </section>
  );
}
