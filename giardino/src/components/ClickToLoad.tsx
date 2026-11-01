// Third-party content (YouTube, Matterport, OpenStreetMap) loads only after the visitor asks for it, so nothing is
// sent to those providers on page view. The claude.ai preview cannot embed other sites at all, so there only the
// direct link (passed as children) is offered.
import { useState, type ReactNode } from "react";
import { Img } from "./Img";
import { Play } from "./icons";

export function ClickToLoad({ src, title, button, note, poster, children }: { src: string; title: string; button: string; note: string; poster?: string; children?: ReactNode }) {
  const [on, setOn] = useState(false);
  return (
    <div className="embed">
      {on ? (
        <iframe src={src} title={title} allow="autoplay; fullscreen; picture-in-picture; xr-spatial-tracking" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
      ) : (
        <>
          {poster && <Img id={poster} sizes="(min-width: 900px) 60vw, 92vw" decorative />}
          <div className="embed__consent">
            {!__ARTIFACT__ && (
              <>
                <button type="button" className="btn btn--light" onClick={() => setOn(true)}>
                  <Play />
                  {button}
                </button>
                <p>{note}</p>
              </>
            )}
            {children}
          </div>
        </>
      )}
    </div>
  );
}
