// Shared harness of scripts/bench.mjs and scripts/test-leaks.mjs: the declared device profiles, the
// browser launch, and an init script that instruments a page before any of its scripts run.
//
// The init script (installProbe, run with context.addInitScript) adds window.__probe:
//   contexts      every WebGL context the page created (canvas.getContext), with live/lost state
//   textures      GPU bytes of every live texture and renderbuffer, tracked at the GL entry points
//                 (texImage2D/3D, texStorage2D/3D, generateMipmap, renderbufferStorage[Multisample],
//                 delete*): the size of each level/face as allocated, by internal format (a generated
//                 mip chain adds a third); the default framebuffer (the canvas) is estimated
//                 separately from its size, antialias and depth attributes and its sample count
//                 (canvasBytes: back and front colour buffers, multisampled colour and depth)
//   objects       live GL objects by kind (textures, buffers, programs, shaders, framebuffers,
//                 renderbuffers, vertex arrays): create* adds, delete* removes
//   raf           the pending requestAnimationFrame callbacks (ids), so a test can count the chains
//   noDraw        optional: the draw calls (drawArrays/Elements[Instanced], drawRangeElements) and
//                 blitFramebuffer return at once. Everything else (state, uniforms, buffer and texture
//                 uploads, shader compiles) still goes to the GPU process, and three.js counts its
//                 draws (renderer.info) before it issues them, so the CPU side of a frame is unchanged
//                 while SwiftShader, which needs 1-3 s per frame on this host for ~1.7 M triangles,
//                 has nothing to rasterise. CPU timings and allocation counts use it; pixels do not.
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');

/**
 * Declared device profiles (docs/performance.md): the viewport, device pixel ratio and quality tier
 * the site picks for that class of device (src/home.js detectQuality, renderer.js maxPixelRatioFor),
 * and the CPU slowdown applied with Emulation.setCPUThrottlingRate (this host's core = 1).
 */
const PROFILES = {
  'desktop-high': { width: 1440, height: 900, dpr: 1, q: 'high', cpu: 1 },
  'desktop-high-2x': { width: 1440, height: 900, dpr: 2, q: 'high', cpu: 1 },
  'laptop-mid': { width: 1280, height: 800, dpr: 2, q: 'mid', cpu: 2 },
  'phone-mid': { width: 390, height: 844, dpr: 3, q: 'mid', cpu: 4, mobile: true },
  'phone-low': { width: 360, height: 740, dpr: 2, q: 'low', cpu: 4, mobile: true },
};

/** Representative journey positions: the five panels (as test-site.mjs) and the aerial between 2 and 3. */
const MOMENTS = [
  ['arrival', 0.04],
  ['pit lane', 0.26],
  ['aerial', 0.375],
  ['on track', 0.49],
  ['paddock', 0.73],
  ['golden hour', 0.95],
];

/** Journey stages by progress (src/home.js PANEL_WINDOWS, with the aerial between pit lane and track). */
const STAGE_RANGES = [
  ['arrival', 0, 0.2],
  ['pit lane', 0.2, 0.33],
  ['aerial', 0.33, 0.425],
  ['on track', 0.425, 0.665],
  ['paddock', 0.665, 0.885],
  ['golden hour', 0.885, 1.0001],
];

function launch(extraArgs = [], options = {}) {
  return chromium.launch({
    args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', ...extraArgs],
    ...options,
  });
}

/** Runs in the page before its scripts (context.addInitScript(installProbe, options)). */
function installProbe({ noDraw = false } = {}) {
  const probe = {
    contexts: [],
    textures: new Map(), // WebGLTexture -> Map(face:level -> bytes)
    renderbuffers: new Map(), // WebGLRenderbuffer -> bytes
    raf: new Map(), // pending rAF id -> 1
    objects: {}, // GL object kind -> Set of live objects
    rafRequests: 0,
  };
  window.__probe = probe;

  const getContext = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (type, ...rest) {
    const ctx = getContext.call(this, type, ...rest);
    if (ctx && /webgl/i.test(type) && !probe.contexts.some((entry) => entry.ctx === ctx)) {
      // the canvas's sample count, read while the default framebuffer is still bound
      let samples = 0;
      try {
        samples = ctx.getParameter(ctx.SAMPLES) || 0;
      } catch {}
      probe.contexts.push({ ctx, type, samples, onPage: () => this.isConnected });
    }
    return ctx;
  };

  // bytes per texel of the sized internal formats three.js uses, and of unsized format/type pairs
  const SIZED = {
    0x8058: 4, // RGBA8
    0x8c43: 4, // SRGB8_ALPHA8
    0x8051: 4, // RGB8 (padded)
    0x881a: 8, // RGBA16F
    0x881b: 8, // RGB16F (padded)
    0x8814: 16, // RGBA32F
    0x8815: 16, // RGB32F
    0x8229: 1, // R8
    0x822b: 2, // RG8
    0x822d: 2, // R16F
    0x822e: 4, // R32F
    0x822f: 4, // RG16F
    0x8230: 8, // RG32F
    0x8c3a: 4, // R11F_G11F_B10F
    0x81a5: 2, // DEPTH_COMPONENT16
    0x81a6: 4, // DEPTH_COMPONENT24
    0x8cac: 4, // DEPTH_COMPONENT32F
    0x88f0: 4, // DEPTH24_STENCIL8
    0x8cad: 8, // DEPTH32F_STENCIL8
    0x8d48: 1, // STENCIL_INDEX8
  };
  const CHANNELS = { 0x1908: 4, 0x1907: 3, 0x1906: 1, 0x1909: 1, 0x190a: 2, 0x1902: 1, 0x84f9: 1 };
  const TYPE_BYTES = { 0x1401: 1, 0x1403: 2, 0x1405: 4, 0x140b: 2, 0x8d61: 2, 0x1406: 4, 0x84fa: 4 };
  const texelBytes = (internalFormat, type) =>
    SIZED[internalFormat] || (CHANNELS[internalFormat] || 4) * (TYPE_BYTES[type] || 1);
  const CUBE_FACE0 = 0x8515;
  const bound = (gl, target) =>
    gl.getParameter(
      target >= CUBE_FACE0 && target < CUBE_FACE0 + 6
        ? 0x8514 // TEXTURE_BINDING_CUBE_MAP
        : target === 0x8513
          ? 0x8514
          : target === 0x806f // TEXTURE_3D
            ? 0x806a
            : target === 0x8c1a // TEXTURE_2D_ARRAY
              ? 0x8c1d
              : 0x8069, // TEXTURE_BINDING_2D
    );
  const hex = (v) => '0x' + Number(v).toString(16);
  const record = (texture, key, bytes, describe) => {
    if (!texture) return;
    let entry = probe.textures.get(texture);
    if (!entry) probe.textures.set(texture, (entry = { levels: new Map(), mipmapped: false, desc: '' }));
    entry.levels.set(key, bytes);
    if (describe) entry.desc = describe;
  };
  const sourceSize = (source) => [
    source.naturalWidth || source.videoWidth || source.displayWidth || source.width || 0,
    source.naturalHeight || source.videoHeight || source.displayHeight || source.height || 0,
  ];
  const isFace = (target) => target >= CUBE_FACE0 && target < CUBE_FACE0 + 6;

  for (const Ctx of [window.WebGL2RenderingContext, window.WebGLRenderingContext]) {
    if (!Ctx) continue;
    const proto = Ctx.prototype;
    const wrap = (name, after) => {
      const original = proto[name];
      if (!original) return;
      proto[name] = function (...args) {
        const result = original.apply(this, args);
        try {
          after.call(this, args, result);
        } catch {}
        return result;
      };
    };
    wrap('texImage2D', function (args) {
      const [target, level, internalFormat] = args;
      let width, height, type;
      if (args.length >= 9) [, , , width, height, , , type] = args;
      else {
        type = args[4];
        [width, height] = sourceSize(args[5]);
      }
      const describe = level ? '' : `${width}x${height}${isFace(target) ? 'x6' : ''} ${hex(internalFormat)}`;
      record(
        bound(this, target),
        `${target}:${level}`,
        width * height * texelBytes(internalFormat, type),
        describe,
      );
    });
    wrap('texImage3D', function (args) {
      const [target, level, internalFormat, width, height, depth, , , type] = args;
      const bytes = width * height * depth * texelBytes(internalFormat, type);
      record(bound(this, target), `${target}:${level}`, bytes, level ? '' : `${width}x${height}x${depth}`);
    });
    wrap('texStorage2D', function (args) {
      const [target, levels, internalFormat, width, height] = args;
      const faces = target === 0x8513 ? 6 : 1;
      let bytes = 0;
      for (let l = 0; l < levels; l++)
        bytes += Math.max(1, width >> l) * Math.max(1, height >> l) * texelBytes(internalFormat) * faces;
      const describe = `${width}x${height}${faces > 1 ? 'x6' : ''} ${hex(internalFormat)} ${levels} level(s)`;
      record(bound(this, target), 'storage', bytes, describe);
    });
    wrap('texStorage3D', function (args) {
      const [target, levels, internalFormat, width, height, depth] = args;
      let bytes = 0;
      for (let l = 0; l < levels; l++)
        bytes += Math.max(1, width >> l) * Math.max(1, height >> l) * depth * texelBytes(internalFormat);
      record(bound(this, target), 'storage', bytes, `${width}x${height}x${depth} ${hex(internalFormat)}`);
    });
    wrap('generateMipmap', function ([target]) {
      const entry = probe.textures.get(bound(this, target));
      if (entry) entry.mipmapped = true;
    });
    wrap('deleteTexture', function ([texture]) {
      probe.textures.delete(texture);
    });
    wrap('renderbufferStorage', function ([, internalFormat, width, height]) {
      const rb = this.getParameter(0x8ca7); // RENDERBUFFER_BINDING
      const bytes = width * height * texelBytes(internalFormat);
      if (rb) probe.renderbuffers.set(rb, [bytes, `${width}x${height} ${hex(internalFormat)}`]);
    });
    wrap('renderbufferStorageMultisample', function ([, samples, internalFormat, width, height]) {
      const rb = this.getParameter(0x8ca7);
      const bytes = Math.max(1, samples) * width * height * texelBytes(internalFormat);
      if (rb)
        probe.renderbuffers.set(rb, [bytes, `${width}x${height} ${hex(internalFormat)} x${samples} samples`]);
    });
    wrap('deleteRenderbuffer', function ([rb]) {
      probe.renderbuffers.delete(rb);
    });
    // live GL objects by kind (create* / delete*)
    for (const kind of [
      'Texture',
      'Buffer',
      'Program',
      'Shader',
      'Framebuffer',
      'Renderbuffer',
      'VertexArray',
    ]) {
      const live = (probe.objects[kind] = probe.objects[kind] || new Set());
      wrap('create' + kind, function (args, object) {
        if (object) live.add(object);
      });
      wrap('delete' + kind, function ([object]) {
        live.delete(object);
      });
    }
    if (noDraw)
      for (const name of [
        'drawArrays',
        'drawElements',
        'drawArraysInstanced',
        'drawElementsInstanced',
        'drawRangeElements',
        'blitFramebuffer',
      ])
        if (proto[name]) proto[name] = function () {};
  }

  const request = window.requestAnimationFrame.bind(window);
  const cancel = window.cancelAnimationFrame.bind(window);
  window.requestAnimationFrame = (callback) => {
    probe.rafRequests++;
    const id = request((time) => {
      probe.raf.delete(id);
      callback(time);
    });
    probe.raf.set(id, 1);
    return id;
  };
  window.cancelAnimationFrame = (id) => {
    probe.raf.delete(id);
    cancel(id);
  };

  /** GPU bytes of a texture: its levels as uploaded, plus a third for a generated mip chain. */
  const textureSize = (entry) => {
    let bytes = 0;
    for (const value of entry.levels.values()) bytes += value;
    return entry.mipmapped && !entry.levels.has('storage') ? (bytes * 4) / 3 : bytes;
  };
  probe.summary = ({ largest = 0 } = {}) => {
    let textureBytes = 0;
    for (const entry of probe.textures.values()) textureBytes += textureSize(entry);
    let renderbufferBytes = 0;
    for (const [bytes] of probe.renderbuffers.values()) renderbufferBytes += bytes;
    const live = probe.contexts.filter((entry) => !entry.ctx.isContextLost());
    // The canvas's own buffers (the default framebuffer), estimated as a desktop GPU holds them: the
    // browser's back and front colour buffers (RGBA8), plus with antialias a multisampled colour and
    // depth(-stencil) buffer of `samples` samples each, else one single-sample depth buffer.
    // Tile-based GPUs (phones, Apple silicon) may keep multisample storage on chip: an upper bound.
    let canvasBytes = 0;
    for (const entry of live) {
      if (!entry.onPage()) continue;
      const gl = entry.ctx;
      const attributes = gl.getContextAttributes() || {};
      const samples = attributes.antialias ? entry.samples || 4 : 0;
      const depth = attributes.depth || attributes.stencil ? Math.max(1, samples) : 0;
      canvasBytes += gl.drawingBufferWidth * gl.drawingBufferHeight * 4 * (2 + samples + depth);
    }
    const list = () =>
      [
        ...[...probe.textures.values()].map((e) => [
          textureSize(e),
          `texture ${e.desc}${e.mipmapped ? ' +mips' : ''}`,
        ]),
        ...[...probe.renderbuffers.values()].map(([bytes, desc]) => [bytes, 'renderbuffer ' + desc]),
      ]
        .sort((a, b) => b[0] - a[0])
        .slice(0, largest);
    return {
      contextsCreated: probe.contexts.length,
      contextsLive: live.length,
      contextsLiveOnPage: live.filter((entry) => entry.onPage()).length,
      textures: probe.textures.size,
      textureBytes,
      renderbuffers: probe.renderbuffers.size,
      renderbufferBytes,
      canvasBytes,
      rafPending: probe.raf.size,
      objects: Object.fromEntries(Object.entries(probe.objects).map(([kind, set]) => [kind, set.size])),
      largest: largest ? list() : undefined,
    };
  };
}

/** Percentile of a sorted numeric array. */
const percentile = (sorted, p) =>
  sorted.length ? sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))] : NaN;

const mb = (bytes) => (bytes / 1048576).toFixed(1) + ' MB';
const kb = (bytes) => (bytes / 1024).toFixed(1) + ' KB';

export { MOMENTS, PROFILES, STAGE_RANGES, installProbe, kb, launch, mb, percentile };
