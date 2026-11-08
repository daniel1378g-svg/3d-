// Deterministic seeded pseudo-random numbers.
//
// A 32-bit linear congruential generator (Numerical Recipes constants). Each call advances the
// state exactly once, so the ORDER in which a caller draws values is part of the scene's look:
// reordering, adding or removing a draw changes everything generated after it.

/**
 * @param {number} [seed=1] integer seed (coerced to an unsigned 32-bit value)
 * @returns {() => number} generator returning floats in [0, 1)
 */
function createRng(seed = 1) {
  let state = seed >>> 0;
  // state * 1664525 stays below 2^53, so the multiply is exact in double precision.
  return () => ((state = (state * 1664525 + 1013904223) >>> 0), state / 4294967296);
}

export { createRng };
