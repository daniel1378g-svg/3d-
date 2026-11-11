// Runs the traffic for a while around a parked player and reports whether it behaves.
import { readSection } from '../tools/lib/packio.mjs';
import { RoadNet } from '../src/js/sim/roadnet.js';
import { createTraffic } from '../src/js/sim/traffic.js';
import { createVehicle } from '../src/js/sim/vehicle.js';
import { createLocator } from '../src/js/sim/locate.js';
const net = new RoadNet(readSection('graph'));
for (const place of net.places.slice(0, 6)) {
  const p = net.lanePos(place.edge, 1, 0, place.s);
  const car = createVehicle({ x: p.x + 60, z: p.z + 3, heading: p.h });   // parked off to the side
  const loc = createLocator(net); loc.update(car);
  const tr = createTraffic({ net, seed: 7, density: 'busy' });
  const why = {}; let t = 0, moving = 0, samples = 0, overlaps = 0, maxCars = 0, stuck = 0, jun = 0;
  const t0 = performance.now();
  for (let i = 0; i < 60 * 240; i++) {
    tr.step(1 / 60, t, car, loc.loc); t += 1 / 60;
    if (i % 60 === 0) {
      maxCars = Math.max(maxCars, tr.cars.length);
      for (const c of tr.cars) { samples++; if (c.v > 1) moving++; if (c.waitT > 25) { if (stuck % 150 === 0 && c.why === 'gap') console.log('  stuck', t.toFixed(0), `e${c.e} d${c.dir} s${c.s.toFixed(0)}/${net.len[c.e].toFixed(0)} rank${net.rank[c.e]} ${net.name(c.e)} x${c.x.toFixed(0)} z${c.z.toFixed(0)}`); stuck++; const k = c.why + (c.junc ? '@junction' : ''); why[k] = (why[k] || 0) + 1; } if (c.junc) jun++; if (!Number.isFinite(c.x)) throw new Error('NaN car'); }
      for (let a = 0; a < tr.cars.length; a++) for (let b = a + 1; b < tr.cars.length; b++) if (Math.hypot(tr.cars[a].x - tr.cars[b].x, tr.cars[a].z - tr.cars[b].z) < 1.6) { overlaps++; if (overlaps < 4) { const A = tr.cars[a], B = tr.cars[b]; console.log('  overlap', t.toFixed(0), [A, B].map((c) => `e${c.e} d${c.dir} s${c.s.toFixed(0)}/${net.len[c.e].toFixed(0)} lane${c.laneF.toFixed(1)} v${c.v.toFixed(1)} ${c.junc ? 'J' + c.junc.turn : ''} ${c.why} rank${net.rank[c.e]} lanes${net.lanes(c.e, c.dir)}`).join('  |  ')); } }
    }
  }
  console.log(`${place.name.padEnd(14)} cars ${tr.cars.length}/${maxCars} trams ${tr.trams.length} peds ${tr.peds.length}  moving ${(100 * moving / samples).toFixed(0)}%  inJunction ${(100 * jun / samples).toFixed(0)}%  stuck>25s ${stuck}  overlaps ${overlaps}  ${(performance.now() - t0).toFixed(0)} ms for 240 s`, JSON.stringify(why));
}
