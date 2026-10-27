// The caldo verde pour (scripts/prepare_soup.py): 124 frames, empty bowl → full bowl, four frames
// per sheet. Independent of the bread film's loader and timeline (frameSequence.ts,
// videoTimeline.ts): nothing here is shared with it.

export const SOUP = {
  frames: 124,
  width: 1000,
  height: 704,
  cols: 2,
  rows: 2,
  empty: "/videos/poster/caldo-empty",
  full: "/videos/poster/caldo-full",
};

const PER_SHEET = SOUP.cols * SOUP.rows;
export const SOUP_SHEETS = Math.ceil(SOUP.frames / PER_SHEET);
const CONCURRENCY = 3;

export function sheetUrl(i: number) {
  return `/videos/caldo/sheet_${String(i).padStart(2, "0")}.webp`;
}

// Scroll progress of the bowl's own track (0–1) → frame. A short hold on the empty bowl when the
// block settles, the pour spread evenly over the path, and a short hold on the full bowl.
const PIECES: [progress: number, frame: number][] = [
  [0, 0],
  [0.05, 0],
  [0.93, SOUP.frames - 1],
  [1, SOUP.frames - 1],
];

export function soupFrame(p: number) {
  const x = Math.min(1, Math.max(0, p));
  for (let i = 1; i < PIECES.length; i++) {
    const [p1, f1] = PIECES[i];
    const [p0, f0] = PIECES[i - 1];
    if (x <= p1) return Math.round(f0 + ((x - p0) / (p1 - p0 || 1)) * (f1 - f0));
  }
  return SOUP.frames - 1;
}

/** Where a frame sits: its sheet and the source rectangle inside it. */
export function frameRect(f: number) {
  const k = f % PER_SHEET;
  return {
    sheet: Math.floor(f / PER_SHEET),
    sx: (k % SOUP.cols) * SOUP.width,
    sy: Math.floor(k / SOUP.cols) * SOUP.height,
  };
}

// First and last sheet, then every 8th, 4th, 2nd, then the rest: the pour can be scrubbed early
// at a coarse step and sharpens as sheets arrive. Sheets near the bowl's position jump the queue.
function progressiveOrder(count: number) {
  const order: number[] = [0, count - 1];
  const seen = new Set(order);
  for (const step of [8, 4, 2, 1]) {
    for (let i = 0; i < count; i += step) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  return order;
}

export class SheetSequence {
  readonly sheets: (HTMLImageElement | undefined)[] = new Array(SOUP_SHEETS);
  private order = progressiveOrder(SOUP_SHEETS);
  private cursor = 0;
  private inFlight = 0;
  private focusSheet = 0;
  private started = false;
  private disposed = false;
  private pending = new Set<HTMLImageElement>();
  failed = 0;

  constructor(private onLoad: (sheet: number) => void) {}

  start() {
    if (this.started) return;
    this.started = true;
    for (let k = 0; k < CONCURRENCY; k++) this.next();
  }

  /** Tell the loader which frame is on screen: its sheet and the next ones are wanted first and
   *  kept decoded, so crossing into a new sheet does not wait for a decode. */
  focus(frame: number) {
    this.focusSheet = frameRect(frame).sheet;
    for (const j of [this.focusSheet, this.focusSheet + 1, this.focusSheet - 1]) {
      const img = this.sheets[j];
      if (img && img.complete) img.decode?.().catch(() => {});
    }
  }

  /** The loaded frame closest to the wanted one (a sheet away at most while loading). */
  nearest(frame: number) {
    const want = frameRect(frame).sheet;
    if (this.sheets[want]) return frame;
    for (let d = 1; d < SOUP_SHEETS; d++) {
      for (const j of [want - d, want + d]) {
        if (this.sheets[j]) return Math.min(SOUP.frames - 1, j < want ? (j + 1) * PER_SHEET - 1 : j * PER_SHEET);
      }
    }
    return -1;
  }

  private pick() {
    for (const j of [this.focusSheet, this.focusSheet + 1, this.focusSheet - 1, this.focusSheet + 2]) {
      const idx = this.order.indexOf(j, this.cursor);
      if (j >= 0 && j < SOUP_SHEETS && idx >= 0) {
        this.order.splice(idx, 1);
        return j;
      }
    }
    return this.cursor < this.order.length ? this.order[this.cursor++] : -1;
  }

  private next() {
    if (this.disposed) return;
    const i = this.pick();
    if (i < 0) return;
    this.inFlight++;
    const img = new Image();
    img.decoding = "async";
    this.pending.add(img);
    const done = (ok: boolean) => {
      this.pending.delete(img);
      this.inFlight--;
      if (this.disposed) return;
      if (ok) {
        this.sheets[i] = img;
        this.onLoad(i);
      } else this.failed++;
      this.next();
    };
    img.onload = () => {
      const d = img.decode ? img.decode() : Promise.resolve();
      d.then(() => done(true), () => done(true));
    };
    img.onerror = () => done(false);
    img.src = sheetUrl(i);
  }

  dispose() {
    this.disposed = true;
    for (const img of this.pending) {
      img.onload = img.onerror = null;
      img.src = "";
    }
    this.pending.clear();
  }
}
