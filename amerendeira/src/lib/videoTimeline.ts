// Maps the scroll progress of the film section (0–1) to a time in the supplied clip.
// The pieces give each phase a share of scroll proportional to its action (docs/video.md).

export const FPS = 24;
export const FRAME_COUNT = 193;
export const DURATION = FRAME_COUNT / FPS;

const PIECES: [progress: number, time: number][] = [
  [0, 0],
  [0.14, 1.6], // entrance: dough, hero text leaves
  [0.64, 4.3], // development: rise, cuts, chouriço, golden crust
  [0.94, DURATION], // conclusion: steam
  [1, DURATION], // short hold on the finished bread
];

export function progressToTime(p: number) {
  const x = Math.min(1, Math.max(0, p));
  for (let i = 1; i < PIECES.length; i++) {
    const [p1, t1] = PIECES[i];
    const [p0, t0] = PIECES[i - 1];
    if (x <= p1) return t0 + ((x - p0) / (p1 - p0 || 1)) * (t1 - t0);
  }
  return DURATION;
}

export function timeToFrame(t: number) {
  return Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(t * FPS)));
}

// Scroll windows (progress) in which each caption is shown. Chosen from the clip: the cuts open
// at 2.4–3.2 s, the crust browns at 3.3–4.2 s and the steam rises from 4 s.
export const CHAPTER_WINDOWS: [number, number][] = [
  [0.1, 0.26],
  [0.28, 0.44],
  [0.46, 0.62],
  [0.66, 1.01],
];
