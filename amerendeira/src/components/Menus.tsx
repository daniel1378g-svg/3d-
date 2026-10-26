"use client";

import { useEffect, useRef, useState } from "react";
import { menus, menusIntro } from "@/content/site";
import { Photo } from "./Photo";
import { scrollToHash } from "./SiteHeader";

export function Menus() {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);

  // The menu whose block crosses the middle of the screen is the active one: its photograph
  // shows in the sticky frame (desktop) and its quick link is marked.
  useEffect(() => {
    const items = [...(list.current?.querySelectorAll<HTMLElement>(".menu-item") ?? [])];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(items.indexOf(e.target as HTMLElement));
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = menus[active];

  return (
    <section id="menus" className="menus section on-dark" aria-labelledby="menus-title">
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

        <nav className="menus__jump" aria-label="Ir para um menu">
          {menus.map((m, i) => (
            <a
              key={m.id}
              href={`#${m.id}`}
              aria-current={i === active ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                scrollToHash(`#${m.id}`);
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
                  id={m.image}
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
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <div className="menu-item__photo">
                  <Photo id={m.image} sizes="(max-width: 899px) 92vw, 1px" />
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
