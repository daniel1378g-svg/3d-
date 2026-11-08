// Morning to golden-hour lighting keys.
import { Color } from 'three';
import { clamp, lerp, smoothstep } from './util/math.js';

var TIME_OF_DAY = [
    {
      t: 0,
      sunEl: 15,
      sunAz: 110,
      sun: 16769216,
      sunI: 3.6,
      sky: 13622502,
      gnd: 5792846,
      hemiI: 0.92,
      zen: 8368344,
      hor: 15199985,
      fog: 14674156,
      exp: 1.04,
    },
    {
      t: 0.45,
      sunEl: 52,
      sunAz: 175,
      sun: 16774632,
      sunI: 3.9,
      sky: 14082794,
      gnd: 6187602,
      hemiI: 0.98,
      zen: 6135510,
      hor: 14279913,
      fog: 14279913,
      exp: 1,
    },
    {
      t: 0.75,
      sunEl: 26,
      sunAz: 238,
      sun: 16769724,
      sunI: 3.7,
      sky: 14409954,
      gnd: 6055248,
      hemiI: 0.9,
      zen: 7184334,
      hor: 15131610,
      fog: 14869212,
      exp: 1,
    },
    {
      t: 1,
      sunEl: 7,
      sunAz: 262,
      sun: 16755036,
      sunI: 3.7,
      sky: 15780258,
      gnd: 5919300,
      hemiI: 0.72,
      zen: 7045291,
      hor: 15974283,
      fog: 15385500,
      exp: 1.08,
    },
  ],
  tmpColorA = new Color(),
  tmpColorB = new Color();
function sampleTimeOfDay(i) {
  let t = 0;
  for (; t < TIME_OF_DAY.length - 2 && i > TIME_OF_DAY[t + 1].t;) t++;
  let e = TIME_OF_DAY[t],
    n = TIME_OF_DAY[t + 1],
    s = smoothstep(clamp((i - e.t) / (n.t - e.t), 0, 1)),
    r = (a) => tmpColorA.set(e[a]).lerp(tmpColorB.set(n[a]), s).getHex(),
    o = {};
  for (let a of Object.keys(e))
    o[a] =
      typeof e[a] == 'number' && !['sun', 'sky', 'gnd', 'zen', 'hor', 'fog'].includes(a)
        ? lerp(e[a], n[a], s)
        : r(a);
  return o;
}

export { sampleTimeOfDay };
