// Model test page. Renders one or more models in the garage (or a bright studio) from a chosen camera.
//
//   /dev/model.html?m=car                     m = car | bike   (default car)
//     &az=35&el=12&dist=7&ty=0.6              orbit camera: azimuth° (0 = from the front, 90 = from the car's RIGHT,
//                                             -90 = from the LEFT/driver's side, 180 = from behind), elevation°, distance, target height
//     &tx=0&tz=0                              orbit target x / z
//     &cam=x,y,z&look=x,y,z                   free camera instead of the orbit (interior shots)
//     &fov=35                                 vertical field of view
//     &door=0..1                              driver's door opening
//     &paint=1b2f8f&finish=gloss|satin|matte&effect=solid|metallic|pearl
//     &env=garage|studio                      studio = bright neutral light for checking geometry
//     &ambient=0..1&ambientColor=2f6bff&reveal=0..1     cabin ambient lighting
//     &stars=0..1                             starlight headliner (once implemented)
//     &lights=0|1                             exterior lights
//     &wire=1                                 wireframe overlay      &detail=0.5   low-detail build
//     &exposure=1                             tone-mapping exposure
import * as THREE from 'three';
import { createStage } from '/src/three/stage.js';
import { createPaint, applyPaint } from '/src/three/materials.js';
import { loadPack } from '/src/three/loader.js';
import { setupCar, setupBike } from '/src/three/vehicles.js';

const q = new URLSearchParams(location.search);
const num = (k, d) => (q.has(k) ? Number(q.get(k)) : d);
const vec = (k) => (q.has(k) ? q.get(k).split(',').map(Number) : null);
const which = (q.get('m') || 'car').split(/[+ ]/);
if (which.includes('cabin')) which.push('car');
const detail = num('detail', 1);

const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = num('exposure', 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const stage = createStage(THREE, renderer, { tier: 'high' });
const scene = stage.scene;
if (q.get('env') === 'studio') {
  scene.background = new THREE.Color(0x8d9299);
  scene.fog = null;
  stage.room.visible = false;
  scene.add(new THREE.HemisphereLight(0xffffff, 0x777777, 1.6));
  const d = new THREE.DirectionalLight(0xffffff, 1.4);
  d.position.set(-4, 6, -5);
  scene.add(d);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshStandardMaterial({ color: 0x7c8087, roughness: 0.9 }));
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);
  stage.contactShadow.material.opacity = 0.5;
}

const paintSpec = { hex: '#' + (q.get('paint') || '1b2f8f'), finish: q.get('finish') || 'gloss', effect: q.get('effect') || 'solid' };
const models = {};
const t0 = performance.now();
if (which.includes('car')) {
  const paint = createPaint(THREE); applyPaint(paint, paintSpec);
  const pack = await loadPack('/public/models/m4.json');
  models.car = setupCar(pack.scene, pack.meta, { paint, environment: scene.environment });
  scene.add(models.car.group);
  models.car.setDoorOpen(num('door', 0));
  models.car.setLights(num('lights', 1));
  stage.setFootprint(...models.car.footprint);
}
if (which.includes('bike')) {
  const paint = createPaint(THREE); applyPaint(paint, paintSpec);
  const pack = await loadPack('/public/models/s1000.json');
  models.bike = setupBike(pack.scene, pack.meta, { paint, environment: scene.environment });
  scene.add(models.bike.group);
  models.bike.setLights(num('lights', 1));
  if (!models.car) stage.setFootprint(...models.bike.footprint);
}
if (models.car && q.get('cabin') !== '0') {
  const { createCabin } = await import('/src/three/cabin.js');
  let data;
  if (q.get('cabin') === 'live') data = (await import('/dev/bake-cabin.js')).computeCabinData(models.car);
  else data = (await import('/src/three/cabin-data.js')).default;
  window.__cabinData = data;
  models.cabin = createCabin(models.car, data, { tier: 'high' });
  models.cabin.setAmbient({ color: '#' + (q.get('ambientColor') || '3d6bff'), level: num('ambient', 0), reveal: num('reveal', 1), brightness: num('bright', 1) });
  models.cabin.setStars(num('stars', 0));
  models.cabin.setFill(num('fill', 1));
  models.car.setDoorOpen(num('door', 0));
}
const buildMs = performance.now() - t0;

let tris = 0, meshes = 0;
scene.traverse((o) => {
  if (!o.isMesh) return;
  o.castShadow = o.castShadow || false;
  meshes++;
  const g = o.geometry;
  tris += (g.index ? g.index.count : g.attributes.position.count) / 3 * (o.isInstancedMesh ? o.count : 1);
});
for (const m of Object.values(models)) m.group?.traverse((o) => { if (o.isMesh && !o.material.transparent) { o.castShadow = true; } });

if (q.get('wire') === '1') for (const m of Object.values(models)) m.group?.traverse((o) => {
  if (o.isMesh) o.add(new THREE.LineSegments(new THREE.WireframeGeometry(o.geometry), new THREE.LineBasicMaterial({ color: 0x00ffaa, transparent: true, opacity: 0.25 })));
});

const camera = new THREE.PerspectiveCamera(num('fov', 35), 1, 0.03, 80);
const cam = vec('cam'), look = vec('look');
if (cam) {
  camera.position.set(...cam);
  camera.lookAt(...(look || [0, 0.8, 0]));
} else {
  const az = THREE.MathUtils.degToRad(num('az', 35)), el = THREE.MathUtils.degToRad(num('el', 12));
  const dist = num('dist', which.includes('bike') && !which.includes('car') ? 3.6 : 7.2);
  const target = new THREE.Vector3(num('tx', 0), num('ty', which.includes('bike') && !which.includes('car') ? 0.55 : 0.62), num('tz', 0));
  camera.position.set(target.x + dist * Math.cos(el) * Math.cos(az), target.y + dist * Math.sin(el), target.z + dist * Math.cos(el) * Math.sin(az));
  camera.lookAt(target);
}

function resize() {
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize);
resize();

document.getElementById('hud').textContent = `${which.join('+')}  tris ${Math.round(tris)}  meshes ${meshes}  build ${buildMs.toFixed(0)} ms`;
window.__stats = { tris: Math.round(tris), meshes, buildMs };
window.__models = models; window.__scene = scene; window.__camera = camera; window.__renderer = renderer; window.THREE = THREE;

// Pick helper: window.__pick([[px, py], ...]) → hit points under those canvas pixels (CSS px).
const ray = new THREE.Raycaster();
window.__pick = (pts) => pts.map(([px, py]) => {
  ray.setFromCamera(new THREE.Vector2((px / innerWidth) * 2 - 1, -(py / innerHeight) * 2 + 1), camera);
  const hits = ray.intersectObjects(Object.values(models).filter((m) => m.group).map((m) => m.group), true).filter((h) => h.object.visible && !(h.object.material.transparent && h.object.material.opacity < 0.9));
  if (!hits.length) return null;
  const h = hits[0];
  const n = h.face ? h.face.normal.clone().transformDirection(h.object.matrixWorld) : new THREE.Vector3();
  if (n.dot(ray.ray.direction) > 0) n.negate();
  return { p: h.point.toArray().map((v) => +v.toFixed(3)), n: n.toArray().map((v) => +v.toFixed(2)), mat: h.object.material.name, d: +h.distance.toFixed(3) };
});
// Ray grid: window.__grid({ o: [x,y,z] base origin, d: [dx,dy,dz], u: axis index swept horizontally, ur: [from,to,step], v: axis index swept vertically, vr: [from,to,step] })
window.__cast = (o, d, far = 5) => {
  ray.set(new THREE.Vector3(...o), new THREE.Vector3(...d).normalize()); ray.far = far;
  const hits = ray.intersectObjects(Object.values(models).filter((m) => m.group).map((m) => m.group), true).filter((h) => h.object.visible && !(h.object.material.transparent && h.object.material.opacity < 0.9));
  ray.far = Infinity;
  if (!hits.length) return null;
  const h = hits[0];
  const n = h.face ? h.face.normal.clone().transformDirection(h.object.matrixWorld) : new THREE.Vector3();
  if (n.dot(ray.ray.direction) > 0) n.negate();
  return { p: h.point.toArray().map((v) => +v.toFixed(4)), n: n.toArray().map((v) => +v.toFixed(3)), mat: h.object.material.name.replace('Material_', ''), d: +h.distance.toFixed(3), node: h.object.parent?.name || '' };
};
window.__grid = ({ o, d, u, ur, v, vr, far }) => {
  const rows = [];
  for (let b = vr[0]; vr[2] > 0 ? b <= vr[1] + 1e-9 : b >= vr[1] - 1e-9; b += vr[2]) {
    const row = [];
    for (let a = ur[0]; a <= ur[1] + 1e-9; a += ur[2]) { const p = o.slice(); p[u] = a; p[v] = b; const h = window.__cast(p, d, far); row.push(h ? `${h.mat}@${h.d.toFixed(2)}` : '-'); }
    rows.push(b.toFixed(2) + ' | ' + row.join(' '));
  }
  return rows;
};
let frames = 0;
const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const t = clock.getElapsedTime();
  models.cabin?.update(t, renderer.domElement.height, camera.fov, renderer.getPixelRatio());
  renderer.render(scene, camera);
  if (++frames === 3) { window.__ready = true; window.__calls = renderer.info.render.calls; if (!q.has('live')) renderer.setAnimationLoop(null); }
});
