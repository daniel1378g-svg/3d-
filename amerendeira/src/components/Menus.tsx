"use client";

import { useContent } from "@/content/i18n";
import type { ImageId } from "@/lib/images";
import { CaldoVerde } from "./CaldoVerde";
import { Photo } from "./Photo";

// Menus first, right after the bread: four cards in an asymmetric grid (large and small photos
// alternate), then the caldo verde video.
export function Menus() {
  const { menus, menusIntro } = useContent();
  return (
    <section id="menus" className="menus" aria-labelledby="menus-title">
      <div className="wrap">
        <header className="menus__head">
          <p className="kicker">{menusIntro.eyebrow}</p>
          <h2 id="menus-title" className="h-xl" data-lines>
            <span className="line">
              <span>{menusIntro.title}</span>
            </span>
          </h2>
          <p className="menus__note">
            <strong>1972</strong>
            <span>{menusIntro.note}</span>
          </p>
        </header>

        <ol className="menus__grid">
          {menus.map((m, i) => {
            const [first, ...rest] = m.name.split(" ");
            return (
              <li key={m.id} id={m.id} className={`menu-card menu-card--${i + 1}`}>
                <div className="menu-card__media" data-reveal>
                  <Photo id={m.image as ImageId} sizes="(max-width: 699px) 92vw, (max-width: 1099px) 46vw, 560px" />
                </div>
                <div className="menu-card__body" data-reveal style={{ ["--d" as string]: "120ms" }}>
                  <p className="menu-card__num">{m.number}</p>
                  <h3 className="menu-card__name">
                    <span className="menu-card__kind">{first}</span> {rest.join(" ")}
                  </h3>
                  <p className="menu-card__text">{m.text}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <CaldoVerde />
      </div>
    </section>
  );
}
