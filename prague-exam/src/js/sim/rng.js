// Seeded random numbers. Everything in sim/ draws from one of these so a run can be replayed
// (the "retry the same route" button) and tested. Never use Math.random in sim/.
export function makeRng(seed) {
  let a = (seed >>> 0) || 0x9e3779b9;
  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    next,                                                        // [0, 1)
    range: (lo, hi) => lo + (hi - lo) * next(),
    int: (n) => Math.floor(next() * n),                          // 0 .. n-1
    pick: (arr) => arr[Math.floor(next() * arr.length)],
    chance: (p) => next() < p,
    fork: (salt) => makeRng(hash32(`${a}:${salt}`)),
  };
}

export function hash32(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
