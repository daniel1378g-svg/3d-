import * as THREE from 'three';

// Fine dust drifting through the room, visible only where light catches it: warm around the
// chandelier, cool in the window light. Motion is computed in the vertex shader.
export function createDust(count) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  let s = 11;
  const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = -2.2 + rand() * 4.9;
    pos[i * 3 + 1] = 0.7 + rand() * 2.25;
    pos[i * 3 + 2] = -2.9 + rand() * 4.6;
    seed[i] = rand();
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uLight: { value: 1 },
      uScale: { value: 800 },
      uCenter: { value: new THREE.Vector3(0, 2.45, 0) },
      uWarm: { value: new THREE.Color(1.0, 0.72, 0.42) },
      uCool: { value: new THREE.Color(0.62, 0.62, 0.9) },
    },
    vertexShader: /* glsl */ `
      attribute float aSeed;
      uniform float uTime;
      uniform float uLight;
      uniform float uScale;
      uniform vec3 uCenter;
      varying float vAlpha;
      varying float vWarm;
      void main() {
        vec3 p = position;
        float t = uTime * (0.05 + aSeed * 0.05);
        p.x += sin(t + aSeed * 40.0) * 0.16 + sin(t * 0.37 + aSeed * 9.0) * 0.08;
        p.y += sin(t * 0.8 + aSeed * 17.0) * 0.1 - mod(uTime * 0.004 * (0.5 + aSeed), 0.3);
        p.z += cos(t * 0.9 + aSeed * 23.0) * 0.16;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        float near = smoothstep(2.0, 0.25, length(p - uCenter));
        float window = smoothstep(1.9, 0.3, length(p.xz - vec2(1.95, -2.7))) * smoothstep(0.3, 1.2, p.y);
        vWarm = near;
        float twinkle = 0.55 + 0.45 * sin(uTime * (0.6 + aSeed) + aSeed * 31.0);
        vAlpha = clamp(near * uLight * 0.9 + window * 0.35, 0.0, 1.0) * twinkle;
        float size = mix(0.0024, 0.0058, fract(aSeed * 7.13));
        gl_PointSize = clamp(size * uScale / -mv.z, 1.0, 7.0);
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uWarm;
      uniform vec3 uCool;
      varying float vAlpha;
      varying float vWarm;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.05, d) * vAlpha;
        if (a < 0.004) discard;
        gl_FragColor = vec4(mix(uCool, uWarm, vWarm) * a * 0.85, 1.0);
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geo, material);
  points.frustumCulled = false;
  points.renderOrder = 2;
  return points;
}
