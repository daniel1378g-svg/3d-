// Raw GLB inspector.  /dev/glb.html?f=raw/m4.glb&az=35&el=12&dist=7
//   &cam=x,y,z&look=x,y,z&fov=  free camera (in the model's own units after normalisation: metres, see below)
//   &anim=0..1                  pose the first animation clip at this fraction
//   &hide=a,b  &only=a,b        hide / isolate nodes whose name contains one of these
//   &mat=Name:ff0000,Other:00ff00   recolour materials (drops their colour map)
//   &hl=Name                    highlight a material in magenta
//   &env=garage                 use the garage stage instead of the grey studio
//   &norm=0                     skip normalisation (default: centre on x/z, put on the ground)
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { createStage } from '/src/three/stage.js';

const q = new URLSearchParams(location.search);
const num = (k, d) => (q.has(k) ? Number(q.get(k)) : d);
const vec = (k) => (q.has(k) ? q.get(k).split(',').map(Number) : null);
const list = (k) => (q.get(k) || '').split(',').filter(Boolean);
const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(1);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = num('exposure', 1);
const stage = createStage(THREE, renderer, { tier: 'mid' });
const scene = stage.scene;
if (q.get('env') !== 'garage') {
  scene.background = new THREE.Color(0x8d9299); scene.fog = null; stage.room.visible = false; stage.contactShadow.visible = false;
  scene.add(new THREE.HemisphereLight(0xffffff, 0x777777, 1.5));
  const d = new THREE.DirectionalLight(0xffffff, 1.6); d.position.set(-4, 6, -5); scene.add(d);
  const g = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshStandardMaterial({ color: 0x7c8087, roughness: 0.9 })); g.rotation.x = -Math.PI / 2; scene.add(g);
}
const camera = new THREE.PerspectiveCamera(num('fov', 35), 1, 0.02, 100);
const gltf = await new GLTFLoader().loadAsync('/dev/' + (q.get('f') || 'raw/m4.glb'));
const root = gltf.scene;
scene.add(root);
if (gltf.animations.length && q.has('anim')) {
  const mixer = new THREE.AnimationMixer(root);
  const clip = gltf.animations[0];
  const action = mixer.clipAction(clip); action.play(); mixer.setTime(clip.duration * num('anim', 0) * 0.999);
}
root.updateMatrixWorld(true);
let box = new THREE.Box3().setFromObject(root);
let size = box.getSize(new THREE.Vector3());
if (q.has('len')) { root.scale.multiplyScalar(num('len', 1) / Math.max(size.x, size.z)); root.updateMatrixWorld(true); box = new THREE.Box3().setFromObject(root); size = box.getSize(new THREE.Vector3()); }
if (q.get('norm') !== '0') {
  const c = box.getCenter(new THREE.Vector3());
  root.position.x -= c.x; root.position.z -= c.z; root.position.y -= box.min.y;
  root.rotation.y = THREE.MathUtils.degToRad(num('ry', 0));
  root.updateMatrixWorld(true);
}
const hide = list('hide'), only = list('only');
const mats = new Map(); let tris = 0;
root.traverse((o) => {
  if (o.isMesh) {
    const chain = []; for (let p = o; p; p = p.parent) chain.push(p.name);
    const names = chain.join('/');
    if (hide.some((h) => names.includes(h))) o.visible = false;
    if (only.length && !only.some((h) => names.includes(h))) o.visible = false;
    (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => mats.set(m.name, m));
    tris += (o.geometry.index ? o.geometry.index.count : o.geometry.attributes.position.count) / 3;
  }
});
for (const pair of list('mat')) { const [n, hex] = pair.split(':'); const m = mats.get(n); if (m) { m.map = null; m.color.set('#' + hex); m.needsUpdate = true; } }
if (q.get('hl')) for (const n of list('hl')) { const m = mats.get(n); if (m) { m.map = null; m.color.set(0xff00ff); m.emissive?.set(0x660066); m.needsUpdate = true; } }
const cam = vec('cam'), look = vec('look');
if (cam) { camera.position.set(...cam); camera.lookAt(...(look || [0, 0.8, 0])); }
else {
  const az = THREE.MathUtils.degToRad(num('az', 35)), el = THREE.MathUtils.degToRad(num('el', 12));
  const dist = num('dist', Math.max(size.x, size.y, size.z) * 1.6);
  const t = new THREE.Vector3(num('tx', 0), num('ty', size.y * 0.45), num('tz', 0));
  camera.position.set(t.x + dist * Math.cos(el) * Math.cos(az), t.y + dist * Math.sin(el), t.z + dist * Math.cos(el) * Math.sin(az)); camera.lookAt(t);
}
function resize() { renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); }
addEventListener('resize', resize); resize();
document.getElementById('hud').textContent = `size ${size.x.toFixed(3)} × ${size.y.toFixed(3)} × ${size.z.toFixed(3)}  min ${box.min.toArray().map((v) => v.toFixed(2))}  tris ${Math.round(tris)}  clips ${gltf.animations.map((a) => a.name + ':' + a.duration.toFixed(2))}`;
window.__root = root; window.__gltf = gltf; window.THREE = THREE; window.__scene = scene; window.__camera = camera;
let frames = 0;
renderer.setAnimationLoop(() => { renderer.render(scene, camera); if (++frames === 3) { window.__ready = true; renderer.setAnimationLoop(null); } });
