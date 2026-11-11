// Section packs: one binary container per data section (graph, rules, terrain, ...).
//
//   file  = gzip( u32le headerLength | header JSON (utf-8) | zero padding to 8 bytes | buffers )
//   header = { meta: {...any JSON...},
//              buffers: { <name>: { type: "Float32Array", offset, length } } }   offset in bytes
//                                                                               from the data start
// decodePack returns { meta, buf: { <name>: TypedArray } }.
// Runs unchanged in the browser and in Node 22+ (both have DecompressionStream).

const TYPES = {
  Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array,
};

export function encodePack(meta, buffers = {}) {
  const dir = {};
  let offset = 0;
  const parts = [];
  for (const [name, arr] of Object.entries(buffers)) {
    const type = arr.constructor.name;
    if (!TYPES[type]) throw new Error(`pack: buffer "${name}" must be a typed array, got ${type}`);
    dir[name] = { type, offset, length: arr.length };
    const bytes = new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
    parts.push([offset, bytes]);
    offset += Math.ceil(arr.byteLength / 8) * 8;
  }
  const header = new TextEncoder().encode(JSON.stringify({ meta, buffers: dir }));
  const dataStart = Math.ceil((4 + header.length) / 8) * 8;
  const out = new Uint8Array(dataStart + offset);
  new DataView(out.buffer).setUint32(0, header.length, true);
  out.set(header, 4);
  for (const [off, bytes] of parts) out.set(bytes, dataStart + off);
  return out;
}

export function decodePack(bytes) {
  // Own, aligned copy so typed-array views are always valid.
  const own = bytes.byteOffset === 0 && bytes.byteLength === bytes.buffer.byteLength ? bytes : bytes.slice();
  const headerLength = new DataView(own.buffer).getUint32(0, true);
  const { meta, buffers } = JSON.parse(new TextDecoder().decode(own.subarray(4, 4 + headerLength)));
  const dataStart = Math.ceil((4 + headerLength) / 8) * 8;
  const buf = {};
  for (const [name, d] of Object.entries(buffers)) {
    buf[name] = new TYPES[d.type](own.buffer, dataStart + d.offset, d.length);
  }
  return { meta, buf };
}

export async function gunzip(bytes) {
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

export function base64ToBytes(b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

// Browser loader. The published build ships each section as data/<name>.js, which sets
// globalThis.__PACK__[name] to the base64 of the gzipped pack. The dev server serves the raw
// data/<name>.pack file instead.
export async function loadSection(name, { base = 'data/' } = {}) {
  const inline = globalThis.__PACK__ && globalThis.__PACK__[name];
  let gz;
  if (inline) {
    gz = base64ToBytes(inline);
    globalThis.__PACK__[name] = null;                             // free the string
  } else {
    const res = await fetch(`${base}${name}.pack`);
    if (!res.ok) throw new Error(`Could not load map section "${name}" (${res.status})`);
    gz = new Uint8Array(await res.arrayBuffer());
  }
  return decodePack(await gunzip(gz));
}
