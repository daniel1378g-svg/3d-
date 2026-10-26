// Loads the frames of the scroll film progressively (1 in 16 first, then 1 in 8, 4, 2, all),
// so scrubbing works early at a coarse step and sharpens as frames arrive. Frames near the
// current position jump the queue. Only a small window around the current frame is decoded
// ahead of time; the browser is free to drop the decoded data of the others.

export type SequenceSize = "desktop" | "mobile";

// Every frame is on a clean white backdrop (scripts/prepare_video.py), so it meets the white
// stage with no edge. "desktop" is the source resolution, for large or dense screens.
export const SEQUENCE = {
  desktop: { width: 1920, height: 1080 },
  mobile: { width: 1280, height: 720 },
};

const CONCURRENCY = 6;
const DECODE_WINDOW = 6;

export function frameUrl(size: SequenceSize, i: number) {
  return `/videos/sequence/${size}/f_${String(i).padStart(3, "0")}.webp`;
}

function progressiveOrder(count: number) {
  const order: number[] = [0, count - 1];
  const seen = new Set(order);
  for (const step of [16, 8, 4, 2, 1]) {
    for (let i = 0; i < count; i += step) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  return order;
}

export class FrameSequence {
  readonly frames: (HTMLImageElement | undefined)[];
  private order: number[];
  private cursor = 0;
  private inFlight = 0;
  private focusIndex = 0;
  private disposed = false;
  private pending = new Set<HTMLImageElement>();
  failed = 0;

  constructor(
    readonly size: SequenceSize,
    readonly count: number,
    private onLoad: (i: number) => void,
  ) {
    this.frames = new Array(count);
    this.order = progressiveOrder(count);
  }

  start() {
    for (let k = 0; k < CONCURRENCY; k++) this.next();
  }

  /** Tell the loader where the viewer is, so nearby frames are fetched and decoded first. */
  focus(i: number) {
    this.focusIndex = i;
    for (let d = 0; d <= DECODE_WINDOW; d++) {
      for (const j of [i + d, i - d]) {
        const img = this.frames[j];
        if (img && img.complete) img.decode?.().catch(() => {});
      }
    }
  }

  /** The drawable for a loaded frame. (Measured: keeping ImageBitmaps around the viewer cost
   *  more during fast scrolling than it saved, so the decoded <img> is drawn directly.) */
  source(i: number): CanvasImageSource | undefined {
    return this.frames[i];
  }

  /** Index of the loaded frame closest to `i` (prefers the earlier one on ties), or -1. */
  nearest(i: number) {
    if (this.frames[i]) return i;
    for (let d = 1; d < this.count; d++) {
      if (i - d >= 0 && this.frames[i - d]) return i - d;
      if (i + d < this.count && this.frames[i + d]) return i + d;
    }
    return -1;
  }

  get loadedCount() {
    return this.frames.reduce((n, f) => n + (f ? 1 : 0), 0);
  }

  dispose() {
    this.disposed = true;
    for (const img of this.pending) img.src = "";
    this.pending.clear();
  }

  private pickNext(): number | undefined {
    // Frames right around the viewer first, then the progressive order.
    for (let d = 0; d <= 3; d++) {
      for (const j of [this.focusIndex + d, this.focusIndex - d]) {
        if (j >= 0 && j < this.count && !this.frames[j] && !this.isQueued(j)) return j;
      }
    }
    while (this.cursor < this.order.length) {
      const j = this.order[this.cursor++];
      if (!this.frames[j] && !this.isQueued(j)) return j;
    }
    return undefined;
  }

  private queued = new Set<number>();
  private isQueued(i: number) {
    return this.queued.has(i);
  }

  private next() {
    if (this.disposed) return;
    const i = this.pickNext();
    if (i === undefined) return;
    this.queued.add(i);
    this.inFlight++;
    const img = new Image();
    img.decoding = "async";
    this.pending.add(img);
    const done = (ok: boolean) => {
      this.pending.delete(img);
      this.inFlight--;
      if (this.disposed) return;
      if (ok) {
        this.frames[i] = img;
        this.onLoad(i);
      } else {
        this.failed++;
      }
      this.next();
    };
    img.onload = () => done(true);
    img.onerror = () => done(false);
    img.src = frameUrl(this.size, i);
  }
}
