/// <reference types="node" />
// Build-time prerender (scripts/postbuild-routes.mjs): renders a page to HTML so the static file already
// shows its first screen (and its text, for crawlers). In the browser the app renders over it on load.
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { Route, Routes, StaticRouter } from "react-router";
import { Shell } from "./App";
import { LANGS } from "./i18n";

/** Renders twice: the first pass loads the lazy pages, so the second writes them inline (no Suspense swap). */
export async function render(url: string): Promise<string> {
  await once(url);
  return once(url);
}

function once(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = "";
    const { pipe } = renderToPipeableStream(
      <StaticRouter location={url}>
        <Routes>
          {LANGS.map((l) => (
            <Route key={l} path={`/${l}/:slug?`} element={<Shell lang={l} />} />
          ))}
        </Routes>
      </StaticRouter>,
      {
        // never outline a large Suspense boundary: the static file must show its content without scripts
        progressiveChunkSize: Number.POSITIVE_INFINITY,
        onAllReady() {
          const out = new PassThrough();
          out.on("data", (c: Buffer) => (html += c.toString()));
          out.on("end", () => resolve(html));
          pipe(out);
        },
        onShellError: reject,
        onError: reject,
      },
    );
  });
}
