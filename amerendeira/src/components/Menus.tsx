"use client";

import { useEffect, useRef, useState } from "react";
import { useContent } from "@/content/i18n";
import type { ImageId } from "@/lib/images";
import { Photo } from "./Photo";
import { scrollToHash } from "./SiteHeader";

const BOWL = "/images/bowls";

export function Menus() {
  const { menus, menusIntro, ui } = useContent();
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  // While a quick link scrolls the page, the clicked menu stays selected (the menus passed on
  // the way must not flash through the pill, photograph and counter).
  const lockUntil = useRef(0);

  // The selected menu is the one whose name and description are closest to the middle of the
  // screen: the same text the visitor is reading. Pill, photograph, caption, counter and the
  // full-strength description all follow it.
  useEffect(() => {
    const items = [...(list.current?.querySelectorAll<HTMLElement>(".menu-item") ?? [])];
    let raf = 0;
    const update = () => {
      raf = 0;
      if (performance.now() < lockUntil.current) return;
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDistance = Infinity;
      items.forEach((el, i) => {
        const name = el.querySelector(".menu-item__name")!.getBoundingClientRect();
        const text = el.querySelector(".menu-item__text")!.getBoundingClientRect();
        const d = Math.abs((name.top + text.bottom) / 2 - mid);
        if (d < bestDistance) {
          bestDistance = d;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onScrollEnd = () => {
      lockUntil.current = 0;
      onScroll();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("scrollend", onScrollEnd);
    update();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
    };
  }, []);

  const select = (i: number, id: string) => {
    setActive(i);
    lockUntil.current = performance.now() + 1400;
    scrollToHash(`#${id}`);
  };

  const current = menus[active];

  return (
    <section id="menus" className="menus section on-dark" aria-labelledby="menus-title">
      {/* Caldo verde and arroz doce, seen from above, slide in from either side as the section
          enters and settle around its title (src/components/ScrollEffects.tsx). */}
      <div className="menus__bowls" aria-hidden="true">
        <img
          className="bowl bowl--caldo"
          data-bowl="-1"
          src={`${BOWL}/taca-caldo-verde-720.webp`}
          srcSet={`${BOWL}/taca-caldo-verde-360.webp 360w, ${BOWL}/taca-caldo-verde-720.webp 720w`}
          sizes="(max-width: 699px) 36vw, 26vw"
          width={720}
          height={720}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <img
          className="bowl bowl--arroz"
          data-bowl="1"
          src={`${BOWL}/taca-arroz-doce-720.webp`}
          srcSet={`${BOWL}/taca-arroz-doce-360.webp 360w, ${BOWL}/taca-arroz-doce-720.webp 720w`}
          sizes="(max-width: 699px) 32vw, 22vw"
          width={720}
          height={720}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="wrap">
        <div className="menus__head" data-lines>
          <div style={{ gridColumn: "1 / span 7" }}>
            <p className="eyebrow">{menusIntro.eyebrow}</p>
            <h2 id="menus-title" className="display">
              <span className="line">
                <span>{menusIntro.title}</span>
              </span>
            </h2>
          </div>
          <p className="menus__note">
            <strong aria-hidden="true">1972</strong>
            {menusIntro.note}
          </p>
        </div>

        <nav className="menus__jump" aria-label={ui.jumpAria}>
          {menus.map((m, i) => (
            <a
              key={m.id}
              href={`#${m.id}`}
              aria-current={i === active ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                select(i, m.id);
              }}
            >
              <span>{m.number}</span>
              {m.name}
            </a>
          ))}
        </nav>

        <div className="menus__body">
          <div className="menus__visual" aria-hidden="true">
            <div className="menus__frame">
              {menus.map((m, i) => (
                <Photo
                  key={m.id}
                  id={m.image as ImageId}
                  sizes="(max-width: 899px) 100vw, 640px"
                  className={i === active ? "is-active" : undefined}
                  alt=""
                />
              ))}
            </div>
            <p className="menus__caption">
              <span>
                {current.number} — {current.name}
              </span>
              <span>
                {active + 1} / {menus.length}
              </span>
            </p>
          </div>

          <ol className="menus__list" ref={list}>
            {menus.map((m, i) => (
              <li
                key={m.id}
                id={m.id}
                className={`menu-item${i === active ? " is-active" : ""}`}
                onFocus={() => setActive(i)}
              >
                <div className="menu-item__photo">
                  <Photo id={m.image as ImageId} sizes="(max-width: 899px) 92vw, 1px" />
                </div>
                <p className="menu-item__num">{m.number}.</p>
                <h3 className="menu-item__name">{m.name}</h3>
                <p className="menu-item__text">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
