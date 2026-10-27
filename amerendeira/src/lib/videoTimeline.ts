// Maps the scroll progress of the film section (0–1) to a time in the supplied clip.
// The pieces give each phase a share of scroll proportional to its action (docs/video.md).

export const FPS = 24;
export const FRAME_COUNT = 193;
export const DURATION = FRAME_COUNT / FPS;

// Charcoal clip (media/original/pao-com-chourico-carvao.mov): pale dough until ~1.4 s, the crust
// browns and the loaf swells 1.4–2.9 s, the cuts open on the chouriço 2.9–3.6 s, the steam bursts
// at ~3.9 s and keeps rising to the end. The knots keep the scroll shares of the previous clip
// (entrance 14 %, development 50 %, steam 30 %, hold 6 %), so the rhythm on scroll is unchanged.
const PIECES: [progress: number, time: number][] = [
  [0, 0],
  [0.14, 1.4], // entrance: dough, hero text leaves
  [0.64, 3.9], // development: golden crust, cuts, chouriço
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

// Scroll windows (progress) in which each caption is shown, in the order of the clip: dough
// (to 1.7 s), oven (crust browning, 1.8–2.8 s), chouriço (cuts opening, 2.9–3.9 s), hot (steam).
export const CHAPTER_WINDOWS: [number, number][] = [
  [0.1, 0.2],
  [0.22, 0.42],
  [0.44, 0.62],
  [0.66, 1.01],
];
