// Maps the scroll progress of the film section (0–1) to a time in the supplied clip.
// The pieces give each phase a share of scroll proportional to its action (docs/video.md).

export const FPS = 24;
export const FRAME_COUNT = 193;
export const DURATION = FRAME_COUNT / FPS;

// The clip opens and closes on a held second (raw dough, finished loaf); both are kept, and the
// first and last frames also hold briefly so the film starts and ends at rest.
const PIECES: [progress: number, time: number][] = [
  [0, 0],
  [0.04, 0], // rest on the first frame while the hero copy leaves
  [0.13, 1], // the clip's opening second
  [0.6, 4.3], // development: rise, cuts, chouriço, golden crust
  [0.88, DURATION - 1], // steam
  [0.96, DURATION], // the clip's closing second
  [1, DURATION], // rest on the finished loaf before the next section
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

// Scroll windows (progress) in which each caption is shown. Chosen from the clip: the dough rests
// until 2 s, the cuts open on the chouriço at 2.6–3.3 s, the crust browns at 3.3–4.2 s and the
// steam rises from 4.3 s.
export const CHAPTER_WINDOWS: [number, number][] = [
  [0.07, 0.31],
  [0.35, 0.47],
  [0.5, 0.61],
  [0.64, 1.01],
];
