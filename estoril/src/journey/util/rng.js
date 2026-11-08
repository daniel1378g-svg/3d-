// Deterministic seeded random numbers (LCG).

function createRng(i = 1) {
  let t = i >>> 0;
  return () => ((t = (t * 1664525 + 1013904223) >>> 0), t / 4294967296);
}

export { createRng };
