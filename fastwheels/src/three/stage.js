// The garage: a dark workshop lit like a car studio. Soft-boxes overhead give the paint long, clean highlights;
// LED strips on the walls give the blue / violet accents; the polished floor mirrors everything; a blurred
// depth shadow grounds the vehicle. One stage is shared by the configurator and the interior sequence.
import * as THREE from 'three';

function softBox(w, h, color, strength, { edge = 0.22, vertical = false } = {}) {
  // An emissive panel that fades out towards its edges, so its reflection has no hard border.
  const c = document.createElement('canvas');
  c.width = 128; c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = '#000';
  g.fillRect(0, 0, 128, 128);
  const grad = g.createLinearGradient(0, 0, vertical ? 0 : 128, vertical ? 128 : 0);
  grad.addColorStop(0, 'rgba(255,255,255,0)'); grad.addColorStop(edge, 'rgba(255,255,255,1)');
  grad.addColorStop(1 - edge, 'rgba(255,255,255,1)'); grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const across = g.createLinearGradient(0, 0, vertical ? 128 : 0, vertical ? 0 : 128);
  across.addColorStop(0, 'rgba(0,0,0,1)'); across.addColorStop(0.3, 'rgba(0,0,0,0)'); across.addColorStop(0.7, 'rgba(0,0,0,0)'); across.addColorStop(1, 'rgba(0,0,0,1)');
  g.fillStyle = across;
  g.fillRect(0, 0, 128, 128);
  const map = new THREE.CanvasTexture(c);
  const mat = new THREE.MeshBasicMaterial({ map, side: THREE.DoubleSide });
  mat.color.set(color).multiplyScalar(strength);
  return new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
}

/** What the paint reflects. Only used to build the environment map. */
function buildEnvScene() {
  const env = new THREE.Scene();
  const room = new THREE.Mesh(new THREE.BoxGeometry(34, 14, 28), new THREE.MeshBasicMaterial({ color: 0x030304, side: THREE.BackSide }));
  room.position.y = 5;
  env.add(room);
  const add = (mesh, pos, rot) => { mesh.position.set(...pos); mesh.rotation.set(...rot); env.add(mesh); };
  const down = [Math.PI / 2, 0, 0];
  // A large ceiling soft-box over the vehicle, flanked by two long strip boxes: the classic studio set-up.
  add(softBox(8.5, 3.4, 0xffffff, 4.3), [0, 5.4, 0], down);
  add(softBox(10, 0.9, 0xf4f7ff, 7.5, { edge: 0.12 }), [0, 4.9, -3.3], [Math.PI / 2 + 0.5, 0, 0]);
  add(softBox(10, 0.9, 0xf4f7ff, 7.5, { edge: 0.12 }), [0, 4.9, 3.3], [Math.PI / 2 - 0.5, 0, 0]);
  // Side fill walls, low and dim, so the flanks are never a black hole.
  add(softBox(16, 3.2, 0xb4c2ff, 2.3, { vertical: true, edge: 0.3 }), [0, 1.7, -10.5], [0, 0, 0]);
  add(softBox(16, 3.2, 0xc4b4ff, 2.1, { vertical: true, edge: 0.3 }), [0, 1.7, 10.5], [0, Math.PI, 0]);
  add(softBox(10, 3, 0xe4eaff, 2.4, { vertical: true, edge: 0.3 }), [13, 1.9, 0], [0, -Math.PI / 2, 0]);
  add(softBox(10, 3, 0xd6dcff, 1.7, { vertical: true, edge: 0.3 }), [-13, 1.9, 0], [0, Math.PI / 2, 0]);
  // Low kickers at wheel height, front corners: they put a highlight in the rims and along the sills.
  add(softBox(5, 1.1, 0xffffff, 3.2, { vertical: true, edge: 0.3 }), [8, 0.7, -6.5], [0, -0.9, 0]);
  add(softBox(5, 1.1, 0xffffff, 3.2, { vertical: true, edge: 0.3 }), [8, 0.7, 6.5], [0, -2.25, 0]);
  add(softBox(5, 1.1, 0xf0f2ff, 2.2, { vertical: true, edge: 0.3 }), [-8, 0.7, -6.5], [0, 0.9, 0]);
  add(softBox(5, 1.1, 0xf0f2ff, 2.2, { vertical: true, edge: 0.3 }), [-8, 0.7, 6.5], [0, 2.25, 0]);
  // The LED strips, as thin accents.
  add(softBox(20, 0.2, 0x2f6bff, 16, { edge: 0.05 }), [0, 2.35, -10.4], [0, 0, 0]);
  add(softBox(20, 0.2, 0x8a5cff, 16, { edge: 0.05 }), [0, 2.35, 10.4], [0, Math.PI, 0]);
  return env;
}

function haloTexture() {
  const c = document.createElement('canvas');
  c.width = 8; c.height = 128;
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0, 'rgba(255,255,255,0)'); grad.addColorStop(0.5, 'rgba(255,255,255,1)'); grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 8, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const FLOOR_VERT = /* glsl */ `
uniform mat4 uTextureMatrix;
varying vec4 vProj;
varying vec3 vWorld;
#include <fog_pars_vertex>
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vProj = uTextureMatrix * world;
  vec4 mvPosition = viewMatrix * world;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`;
const FLOOR_FRAG = /* glsl */ `
uniform sampler2D tReflect;
uniform vec3 uBase;
uniform vec2 uTexel;
uniform float uMirror;
varying vec4 vProj;
varying vec3 vWorld;
#include <fog_pars_fragment>
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y); }
void main() {
  vec3 view = normalize(cameraPosition - vWorld);
  float facing = clamp(view.y, 0.0, 1.0);
  float fresnel = 0.05 + 0.95 * pow(max(1.0 - facing, 0.0), 3.2);
  // Polished concrete: mostly smooth, with slow variation in how glossy it is.
  float patchy = noise(vWorld.xz * 0.55) * 0.6 + noise(vWorld.xz * 2.3) * 0.4;
  vec3 col = uBase * (0.75 + 0.5 * patchy) * (1.0 + 2.4 * exp(-dot(vWorld.xz, vWorld.xz) * 0.03));   // a pool of light under the soft-boxes
  if (uMirror > 0.0) {
    vec2 uv = vProj.xy / vProj.w;
    vec2 wobble = (vec2(noise(vWorld.xz * 6.0), noise(vWorld.xz * 6.0 + 19.7)) - 0.5) * 0.004;
    float spread = (1.2 + 5.0 * (1.0 - patchy)) * (0.6 + 0.4 * facing);
    vec3 r = texture2D(tReflect, uv + wobble).rgb * 0.28;
    r += texture2D(tReflect, uv + wobble + vec2(uTexel.x, 0.0) * spread).rgb * 0.14;
    r += texture2D(tReflect, uv + wobble - vec2(uTexel.x, 0.0) * spread).rgb * 0.14;
    r += texture2D(tReflect, uv + wobble + vec2(0.0, uTexel.y) * spread * 1.6).rgb * 0.14;
    r += texture2D(tReflect, uv + wobble - vec2(0.0, uTexel.y) * spread * 1.6).rgb * 0.14;
    r += texture2D(tReflect, uv + wobble + uTexel * spread * 1.2).rgb * 0.08;
    r += texture2D(tReflect, uv + wobble - uTexel * spread * 1.2).rgb * 0.08;
    col += r * uMirror * fresnel * (0.55 + 0.45 * patchy);
  }
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
}`;

const BLUR_FRAG = /* glsl */ `
uniform sampler2D tDiffuse;
uniform vec2 uStep;
varying vec2 vUv;
void main() {
  vec4 sum = vec4(0.0);
  sum += texture2D(tDiffuse, vUv - 4.0 * uStep) * 0.051; sum += texture2D(tDiffuse, vUv - 3.0 * uStep) * 0.0918;
  sum += texture2D(tDiffuse, vUv - 2.0 * uStep) * 0.12245; sum += texture2D(tDiffuse, vUv - uStep) * 0.1531;
  sum += texture2D(tDiffuse, vUv) * 0.1633;
  sum += texture2D(tDiffuse, vUv + uStep) * 0.1531; sum += texture2D(tDiffuse, vUv + 2.0 * uStep) * 0.12245;
  sum += texture2D(tDiffuse, vUv + 3.0 * uStep) * 0.0918; sum += texture2D(tDiffuse, vUv + 4.0 * uStep) * 0.051;
  gl_FragColor = sum;
}`;

/**
 * @param {THREE.WebGLRenderer} renderer
 * @param {{ tier?: 'low'|'mid'|'high' }} options
 */
export function createStage(renderer, { tier = 'high' } = {}) {
  const scene = new THREE.Scene();
  const bg = new THREE.Color(0x050608);
  scene.background = bg;
  scene.fog = new THREE.FogExp2(bg.getHex(), 0.028);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = buildEnvScene();
  const envTarget = pmrem.fromScene(envScene, 0.035);
  scene.environment = envTarget.texture;
  scene.environmentIntensity = 1;
  envScene.traverse((o) => { if (o.isMesh) { o.geometry.dispose(); o.material.map?.dispose(); o.material.dispose(); } });
  pmrem.dispose();

  const room = new THREE.Group();
  room.name = 'garage';
  scene.add(room);
  const W = 11, D = 8.5, H = 4.4;                      // half length (x), half depth (z), height

  // Floor: polished concrete with a real mirror image of the scene (mid and high tiers).
  const mirror = tier !== 'low';
  const reflectTarget = mirror ? new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, depthBuffer: true }) : null;
  const floorUniforms = THREE.UniformsUtils.merge([THREE.UniformsLib.fog, {
    tReflect: { value: null }, uTextureMatrix: { value: new THREE.Matrix4() }, uBase: { value: new THREE.Color(0x0b0c10) }, uTexel: { value: new THREE.Vector2(1 / 512, 1 / 512) }, uMirror: { value: mirror ? 1 : 0 },
  }]);
  if (mirror) floorUniforms.tReflect.value = reflectTarget.texture;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.ShaderMaterial({ vertexShader: FLOOR_VERT, fragmentShader: FLOOR_FRAG, uniforms: floorUniforms, fog: true }));
  floor.rotation.x = -Math.PI / 2;
  floor.name = 'floor';
  room.add(floor);

  // Walls, ceiling, ribs.
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x0c0d11, roughness: 0.8, metalness: 0.15, envMapIntensity: 0.35 });
  const wall = (w, h, pos, ry) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallMat); m.position.set(...pos); m.rotation.y = ry; room.add(m); };
  wall(W * 2, H, [0, H / 2, -D], 0);
  wall(W * 2, H, [0, H / 2, D], Math.PI);
  wall(D * 2, H, [W, H / 2, 0], -Math.PI / 2);
  wall(D * 2, H, [-W, H / 2, 0], Math.PI / 2);
  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(W * 2, D * 2), new THREE.MeshStandardMaterial({ color: 0x07080a, roughness: 1 }));
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = H;
  room.add(ceiling);
  const ribs = new THREE.InstancedMesh(new THREE.BoxGeometry(0.14, H, 0.12), new THREE.MeshStandardMaterial({ color: 0x0f1014, roughness: 0.85, metalness: 0.1, envMapIntensity: 0.25 }), 44);
  const mtx = new THREE.Matrix4();
  let n = 0;
  for (let i = 0; i < 11; i++) {
    const x = -W + 1 + i * ((W * 2 - 2) / 10);
    ribs.setMatrixAt(n++, mtx.makeTranslation(x, H / 2, -D + 0.06));
    ribs.setMatrixAt(n++, mtx.makeTranslation(x, H / 2, D - 0.06));
  }
  for (let i = 0; i < 11; i++) {
    const z = -D + 0.8 + i * ((D * 2 - 1.6) / 10);
    ribs.setMatrixAt(n++, mtx.makeTranslation(W - 0.06, H / 2, z));
    ribs.setMatrixAt(n++, mtx.makeTranslation(-W + 0.06, H / 2, z));
  }
  room.add(ribs);
  // Ceiling light panels above the vehicle (what the soft-box reflections come from).
  const panelMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0xf2f5ff).multiplyScalar(1.5), fog: false });
  for (const z of [-2.4, 0, 2.4]) {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(7.5, 0.5), panelMat);
    p.rotation.x = Math.PI / 2; p.position.set(0, H - 0.02, z);
    room.add(p);
  }

  // LED strips: blue on the left wall (z < 0), violet on the right, a cooler pair on the end walls.
  const BLUE = 0x2f6bff, VIOLET = 0x8a5cff;
  const halo = haloTexture();
  const led = (len, pos, ry, hex, k = 2.4, thick = 0.04) => {
    const g = new THREE.Group();
    g.position.set(...pos); g.rotation.y = ry;
    const core = new THREE.MeshBasicMaterial({ fog: false });
    core.color.set(hex).multiplyScalar(k);
    g.add(new THREE.Mesh(new THREE.BoxGeometry(len, thick, 0.02), core));
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(len, 1.1), new THREE.MeshBasicMaterial({ map: halo, color: hex, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
    glow.position.z = 0.02;
    g.add(glow);
    room.add(g);
  };
  led(W * 2 - 1.2, [0, 2.35, -D + 0.13], 0, BLUE);
  led(W * 2 - 1.2, [0, 0.42, -D + 0.13], 0, BLUE, 1.8, 0.022);
  led(W * 2 - 1.2, [0, 2.35, D - 0.13], Math.PI, VIOLET);
  led(W * 2 - 1.2, [0, 0.42, D - 0.13], Math.PI, VIOLET, 1.8, 0.022);
  led(D * 2 - 1.2, [W - 0.13, 2.35, 0], -Math.PI / 2, 0x6f8cff, 2.2);
  led(D * 2 - 1.2, [-W + 0.13, 2.35, 0], Math.PI / 2, 0x7a6cff, 2.2);

  // Direct light: a soft key from above, gentle coloured rims. Most of the lighting is image-based.
  const hemi = new THREE.HemisphereLight(0x93a2c4, 0x08080b, 0.28);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffffff, 0.9);
  key.position.set(2.5, 8, 1.5);
  if (tier === 'high') {
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    const s = 3.4;
    Object.assign(key.shadow.camera, { left: -s, right: s, top: s, bottom: -s, near: 1, far: 16 });
    key.shadow.bias = -0.0004; key.shadow.normalBias = 0.02; key.shadow.radius = 5;
  }
  scene.add(key);
  const rimBlue = new THREE.DirectionalLight(BLUE, 0.55);
  rimBlue.position.set(-2, 3.5, -8);
  const rimViolet = new THREE.DirectionalLight(VIOLET, 0.5);
  rimViolet.position.set(-1, 3.5, 8);
  scene.add(rimBlue, rimViolet);

  // Contact shadow: the vehicle's depth seen from below, blurred. Redrawn only when the vehicle changes.
  const SH = { w: 6.2, h: 3.4, res: tier === 'low' ? 256 : 512, reach: 1.1 };
  const shadowA = new THREE.WebGLRenderTarget(SH.res * 2, SH.res), shadowB = new THREE.WebGLRenderTarget(SH.res * 2, SH.res);
  shadowA.texture.generateMipmaps = shadowB.texture.generateMipmaps = false;
  const shadowCam = new THREE.OrthographicCamera(-SH.w / 2, SH.w / 2, SH.h / 2, -SH.h / 2, 0, SH.reach);
  shadowCam.position.set(0, 0, 0);
  shadowCam.up.set(0, 0, 1);                          // image x = world +X (vehicle length), image y = world +Z
  shadowCam.lookAt(0, 1, 0);
  const depthMat = new THREE.MeshDepthMaterial({ side: THREE.DoubleSide });
  depthMat.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace('gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );', 'gl_FragColor = vec4( vec3( 0.0 ), pow( clamp( 1.0 - fragCoordZ, 0.0, 1.0 ), 1.6 ) );');
  };
  const blurMat = new THREE.ShaderMaterial({ uniforms: { tDiffuse: { value: null }, uStep: { value: new THREE.Vector2() } }, vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }', fragmentShader: BLUR_FRAG, depthTest: false, depthWrite: false });
  const blurQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), blurMat);
  const blurCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(SH.w, SH.h), new THREE.MeshBasicMaterial({ map: shadowA.texture, transparent: true, opacity: 0.92, depthWrite: false, fog: false, side: THREE.DoubleSide }));
  shadow.rotation.x = Math.PI / 2;                    // plane x → world X, plane y → world +Z, matching the shadow camera
  shadow.position.y = 0.004;
  shadow.renderOrder = 1;
  shadow.name = 'contact-shadow';
  scene.add(shadow);

  function updateContactShadow() {
    const saved = { bg: scene.background, fog: scene.fog, target: renderer.getRenderTarget(), auto: renderer.shadowMap.autoUpdate };
    room.visible = false; shadow.visible = false;
    scene.background = null; scene.fog = null; scene.overrideMaterial = depthMat;
    const clear = renderer.getClearColor(new THREE.Color()), alpha = renderer.getClearAlpha();
    renderer.setClearColor(0x000000, 0);
    renderer.setRenderTarget(shadowA); renderer.clear(); renderer.render(scene, shadowCam);
    scene.overrideMaterial = null;
    for (const [from, to, step] of [[shadowA, shadowB, [2.2 / (SH.res * 2), 0]], [shadowB, shadowA, [0, 2.2 / SH.res]], [shadowA, shadowB, [0.9 / (SH.res * 2), 0]], [shadowB, shadowA, [0, 0.9 / SH.res]]]) {
      blurMat.uniforms.tDiffuse.value = from.texture; blurMat.uniforms.uStep.value.set(...step);
      renderer.setRenderTarget(to); renderer.clear(); renderer.render(blurQuad, blurCam);
    }
    renderer.setRenderTarget(saved.target); renderer.setClearColor(clear, alpha);
    scene.background = saved.bg; scene.fog = saved.fog; room.visible = true; shadow.visible = true;
  }

  // Mirror image for the floor.
  const mirrorCam = new THREE.PerspectiveCamera();
  const bias = new THREE.Matrix4().set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
  const tmp = { pos: new THREE.Vector3(), target: new THREE.Vector3(), dir: new THREE.Vector3() };
  function updateReflection(camera, width, height, scale) {
    if (!mirror) return;
    const w = Math.max(64, Math.round(width * scale)), h = Math.max(64, Math.round(height * scale));
    if (reflectTarget.width !== w || reflectTarget.height !== h) { reflectTarget.setSize(w, h); floorUniforms.uTexel.value.set(1 / w, 1 / h); }
    camera.getWorldPosition(tmp.pos);
    camera.getWorldDirection(tmp.dir);
    tmp.target.copy(tmp.pos).add(tmp.dir);
    mirrorCam.position.set(tmp.pos.x, -tmp.pos.y, tmp.pos.z);
    mirrorCam.up.set(0, -1, 0);
    mirrorCam.lookAt(tmp.target.x, -tmp.target.y, tmp.target.z);
    mirrorCam.fov = camera.fov; mirrorCam.aspect = camera.aspect; mirrorCam.near = 0.05; mirrorCam.far = camera.far;
    mirrorCam.updateProjectionMatrix(); mirrorCam.updateMatrixWorld();
    floorUniforms.uTextureMatrix.value.copy(bias).multiply(mirrorCam.projectionMatrix).multiply(mirrorCam.matrixWorldInverse);
    const target = renderer.getRenderTarget();
    floor.visible = false; shadow.visible = false;
    renderer.setRenderTarget(reflectTarget); renderer.clear(); renderer.render(scene, mirrorCam);
    renderer.setRenderTarget(target);
    floor.visible = true; shadow.visible = true;
  }

  return {
    scene, room, floor, lights: { hemi, key, rimBlue, rimViolet }, contactShadow: shadow, mirror,
    updateContactShadow, updateReflection,
    setMirror(strength) { floorUniforms.uMirror.value = mirror ? strength : 0; },
    dispose() {
      envTarget.dispose(); reflectTarget?.dispose(); shadowA.dispose(); shadowB.dispose();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { m.map?.dispose(); m.dispose(); });
      });
    },
  };
}
