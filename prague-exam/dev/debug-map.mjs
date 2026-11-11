// Renders a debug picture of the rule map around a point:  node dev/debug-map.mjs <x> <z> <radius> <out.png>
import { readSection } from '../tools/lib/packio.mjs';
import { RoadNet, CTRL } from '../src/js/sim/roadnet.js';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const [cx, cz, R, out] = [Number(process.argv[2] || 0), Number(process.argv[3] || 0), Number(process.argv[4] || 400), process.argv[5] || '/tmp/map.png'];
const net = new RoadNet(readSection('graph'));
const W = 1400, k = W / (2 * R);
const X = (x) => ((x - cx + R) * k).toFixed(1), Z = (z) => ((z - cz + R) * k).toFixed(1);
const col = { [CTRL.NONE]: '#888', [CTRL.EQUAL]: '#e0a020', [CTRL.PRIORITY]: '#f2d000', [CTRL.GIVE_WAY]: '#e03030', [CTRL.STOP]: '#a000ff', [CTRL.SIGNAL]: '#20c040', [CTRL.ROUNDABOUT]: '#2080ff', [CTRL.EXIT]: '#ff80c0' };
let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${W}" style="background:#f4f4f0;font:10px sans-serif">`;
const near = (x, z) => Math.abs(x - cx) < R + 50 && Math.abs(z - cz) < R + 50;
for (let i = 0; i < net.rail.pt.length - 1; i++) { let d = ''; for (let p = net.rail.pt[i]; p < net.rail.pt[i + 1]; p++) d += `${p === net.rail.pt[i] ? 'M' : 'L'}${X(net.rail.x[p])},${Z(net.rail.z[p])}`; svg += `<path d="${d}" fill="none" stroke="#999" stroke-dasharray="4 3"/>`; }
for (let e = 0; e < net.E; e++) {
  const p0 = net.edgePt[e], p1 = net.edgePt[e + 1];
  if (!near(net.ptX[p0], net.ptZ[p0]) && !near(net.ptX[p1 - 1], net.ptZ[p1 - 1])) continue;
  let d = '';
  for (let p = p0; p < p1; p++) d += `${p === p0 ? 'M' : 'L'}${X(net.ptX[p])},${Z(net.ptZ[p])}`;
  svg += `<path d="${d}" fill="none" stroke="${net.rank[e] === 0 ? '#c8c8c8' : net.oneway(e) ? '#7a7a8a' : '#555'}" stroke-width="${Math.max(1.5, net.width[e] * k)}" stroke-linecap="butt" opacity="0.8"/>`;
  if (net.oneway(e) && net.len[e] > 25) { const m = net.pos(e, net.len[e] / 2); svg += `<path d="M${X(m.x - m.dx * 4)},${Z(m.z - m.dz * 4)}L${X(m.x + m.dx * 4)},${Z(m.z + m.dz * 4)}" stroke="#fff" stroke-width="1.5" marker-end="url(#a)"/>`; }
  if (net.len[e] > 60 && net.name(e)) { const m = net.pos(e, net.len[e] / 2); svg += `<text x="${X(m.x)}" y="${Z(m.z)}" fill="#124">${net.name(e)} ${net.speedKmh[e]}</text>`; }
}
svg += '<defs><marker id="a" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0L6,3L0,6z" fill="#fff"/></marker></defs>';
for (let i = 0; i < net.tram.pt.length - 1; i++) { let d = ''; for (let p = net.tram.pt[i]; p < net.tram.pt[i + 1]; p++) d += `${p === net.tram.pt[i] ? 'M' : 'L'}${X(net.tram.x[p])},${Z(net.tram.z[p])}`; svg += `<path d="${d}" fill="none" stroke="#c00060" stroke-width="1.2"/>`; }
for (const l of net.lines) { const p = net.lanePos(l.e, l.dir, 0, l.s); if (!near(p.x, p.z)) continue; svg += `<circle cx="${X(p.x)}" cy="${Z(p.z)}" r="4" fill="${col[l.kind]}" stroke="#000" stroke-width="0.6"/>`; if (l.kind === CTRL.SIGNAL) svg += `<text x="${X(p.x)}" y="${Z(p.z)}" dx="5" fill="#063">${l.ctrlId}/${l.phase}</text>`; }
for (let e = 0; e < net.E; e++) for (const end of [0, 1]) { if (net.ctrl[e * 2 + end] !== CTRL.PRIORITY) continue; const p = net.pos(e, end ? net.len[e] - net.lineD[e * 2 + end] : net.lineD[e * 2 + end]); if (near(p.x, p.z)) svg += `<rect x="${X(p.x) - 3}" y="${Z(p.z) - 3}" width="6" height="6" fill="${col[CTRL.PRIORITY]}" stroke="#000" stroke-width="0.6" transform="rotate(45 ${X(p.x)} ${Z(p.z)})"/>`; }
for (const c of net.crossings) if (near(c.x, c.z)) svg += `<rect x="${X(c.x) - 2}" y="${Z(c.z) - 2}" width="4" height="4" fill="${c.signal ? '#0a0' : '#fff'}" stroke="#000" stroke-width="0.5"/>`;
svg += `<text x="10" y="20" font-size="13">green=signal(ctrl/phase) red=give way purple=stop orange=right-hand yellow◆=main pink=exit blue=roundabout, squares=crossings</text></svg>`;
const { chromium } = require('playwright');
const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: W, height: W } });
await pg.setContent(svg); await pg.screenshot({ path: out }); await b.close(); console.log('wrote', out);
