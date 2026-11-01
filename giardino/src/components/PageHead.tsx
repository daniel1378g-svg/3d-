// Head of an inner page: kicker, large serif title, lead, an arched photograph and the olive engraving.
import type { ReactNode } from "react";
import { Img } from "./Img";

export function PageHead({ kicker, title, lead, photo, children, focus }: { kicker: string; title: string; lead?: ReactNode; photo?: string; children?: ReactNode; focus?: string }) {
  return (
    <header className="page-head grain">
      <div className="engraving" aria-hidden="true" />
      <div className={`wrap ${photo ? "page-head__grid" : ""}`}>
        <div>
          <p className="kicker">{kicker}</p>
          <h1 className="display h-xl split">
            <span className="l"><span>{title}</span></span>
          </h1>
          {lead && <div className="lead">{lead}</div>}
          {children}
        </div>
        {photo && (
          <div className="page-head__media arch" style={{ overflow: "hidden" }}>
            <Img id={photo} sizes="(min-width: 900px) 34vw, 92vw" priority focus={focus} style={{ height: "100%" }} />
          </div>
        )}
      </div>
    </header>
  );
}
