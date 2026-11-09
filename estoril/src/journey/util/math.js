// Scalar helpers and piecewise cubic Hermite interpolation.

/** Linear interpolation from a (amount 0) to b (amount 1); not clamped. */
var lerp = (a, b, amount) => a + (b - a) * amount,
  /** Clamps value to [min, max]. */
  clamp = (value, min, max) => Math.min(max, Math.max(min, value)),
  /** Cubic smoothstep for x already in [0, 1] (no clamping). */
  smoothstep = (x) => x * x * (3 - 2 * x),
  /** Cubic ease-in-out for x in [0, 1]. */
  easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

/**
 * Builds y = f(x) through a list of [x, y] knots (x strictly increasing) as a monotone piecewise
 * cubic Hermite curve (PCHIP: Fritsch-Carlson tangents from monotoneSlope()). Between two knots
 * the curve stays within their values, so monotone data gives a monotone curve and a key that is a
 * local extremum is never overshot; the curve is C1. Outside [x0, xN] it holds the end values.
 * Evaluation allocates nothing.
 *
 * @param {Array<[number, number]>} knots
 * @returns {(x: number) => number}
 */
function monotoneCurve(knots) {
  const xs = knots.map((knot) => knot[0]);
  const ys = knots.map((knot) => knot[1]);
  const count = knots.length;
  const tangents = ys.map((_y, k) => monotoneSlope(xs, ys, k));
  return (x) => {
    if (x <= xs[0]) return ys[0];
    if (x >= xs[count - 1]) return ys[count - 1];
    let k = 0;
    while (x > xs[k + 1]) k++;
    return hermite(xs[k], xs[k + 1], ys[k], ys[k + 1], tangents[k], tangents[k + 1], x);
  };
}

/**
 * Monotonicity-preserving PCHIP tangent (Fritsch-Carlson weighted harmonic mean of the adjacent
 * secant slopes, as in MATLAB's pchip) at knot `index` of the data (xs, ys). Returns 0 at local
 * extrema and plain one-sided secant slopes at the ends.
 *
 * @param {number[]} xs strictly increasing knot positions
 * @param {number[]} ys knot values
 * @param {number} index knot index
 */
function monotoneSlope(xs, ys, index) {
  let count = xs.length;
  if (index <= 0) return (ys[1] - ys[0]) / (xs[1] - xs[0]);
  if (index >= count - 1) return (ys[count - 1] - ys[count - 2]) / (xs[count - 1] - xs[count - 2]);
  let slopeBefore = (ys[index] - ys[index - 1]) / (xs[index] - xs[index - 1]),
    slopeAfter = (ys[index + 1] - ys[index]) / (xs[index + 1] - xs[index]);
  if (slopeBefore * slopeAfter <= 0) return 0;
  let spanBefore = xs[index] - xs[index - 1],
    spanAfter = xs[index + 1] - xs[index],
    weightBefore = 2 * spanAfter + spanBefore,
    weightAfter = spanAfter + 2 * spanBefore;
  return (weightBefore + weightAfter) / (weightBefore / slopeBefore + weightAfter / slopeAfter);
}

/**
 * Evaluates the cubic Hermite segment from (x0, y0, slope m0) to (x1, y1, slope m1) at x.
 * Slopes are dy/dx; x is not clamped to [x0, x1].
 */
function hermite(x0, x1, y0, y1, m0, m1, x) {
  let span = x1 - x0,
    s = (x - x0) / span,
    s2 = s * s,
    s3 = s2 * s;
  return (
    (2 * s3 - 3 * s2 + 1) * y0 +
    (s3 - 2 * s2 + s) * span * m0 +
    (3 * s2 - 2 * s3) * y1 +
    (s3 - s2) * span * m1
  );
}

export { clamp, easeInOutCubic, hermite, lerp, monotoneCurve, monotoneSlope, smoothstep };
