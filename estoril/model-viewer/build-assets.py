#!/usr/bin/env python3
"""Turns exports/estoril-circuit.glb into the files the model viewer page loads.

    python3 model-viewer/build-assets.py [--glb exports/estoril-circuit.glb] [--out model-viewer/dist]

The page is published where only text and standard image files can be served, so the binary glTF is
split into:
  model.json            the glTF JSON (scene, nodes, materials, accessors), no binary inside
  geometry-N.b64.txt    the vertex and index data, base64 text, at most CHUNK bytes of data each
                        (the page decodes them and hands them to three's GLTFLoader as blob: URLs)
  tex/*.webp            every texture as WebP (EXT_texture_webp), colour maps lossy at q 84,
                        normal and roughness/metalness maps at q 92
  track.json            the circuit's centre line (site/assets/data/track.json), for the lap drive
  index.html            the viewer page itself (model-viewer/index.html), so the folder is servable
On the way, texture coordinates that no texture reads are dropped. Needs Pillow with WebP support.
"""
import argparse
import base64
import io
import json
import shutil
import struct
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
CHUNK = 8 << 20  # raw bytes per geometry file (base64 makes it 4/3 larger, under the 16 MB file limit)

ap = argparse.ArgumentParser()
ap.add_argument('--glb', default=str(ROOT / 'exports/estoril-circuit.glb'))
ap.add_argument('--out', default=str(ROOT / 'model-viewer/dist'))
args = ap.parse_args()
out = Path(args.out)
shutil.rmtree(out, ignore_errors=True)
(out / 'tex').mkdir(parents=True)

data = Path(args.glb).read_bytes()
magic, version, length = struct.unpack_from('<4sII', data, 0)
assert magic == b'glTF' and version == 2, 'not a binary glTF 2.0 file'
json_len, json_type = struct.unpack_from('<I4s', data, 12)
assert json_type == b'JSON'
gltf = json.loads(data[20 : 20 + json_len])
bin_off = 20 + json_len
bin_len, bin_type = struct.unpack_from('<I4s', data, bin_off)
assert bin_type == b'BIN\0'
blob = data[bin_off + 8 : bin_off + 8 + bin_len]

views = gltf['bufferViews']
accessors = gltf['accessors']
materials = gltf.get('materials', [])
textures = gltf.get('textures', [])
images = gltf.get('images', [])


def view_bytes(i):
    v = views[i]
    return blob[v.get('byteOffset', 0) : v.get('byteOffset', 0) + v['byteLength']]


# --- which texture slots each image serves (for its name and its encoding) ---------------------
SLOTS = {
    'baseColorTexture': 'color',
    'emissiveTexture': 'color',
    'normalTexture': 'normal',
    'metallicRoughnessTexture': 'data',
    'occlusionTexture': 'data',
    'clearcoatTexture': 'data',
    'clearcoatRoughnessTexture': 'data',
    'clearcoatNormalTexture': 'normal',
    'bumpTexture': 'data',
}
image_use = {}  # image index -> (kind, name)
material_coords = []  # per material: the texCoord sets its textures read


def walk_textures(node, found):
    if isinstance(node, dict):
        for key, value in node.items():
            if isinstance(value, dict) and 'index' in value and key.endswith('Texture'):
                found.append((key, value))
            walk_textures(value, found)
    elif isinstance(node, list):
        for value in node:
            walk_textures(value, found)


for m in materials:
    found = []
    walk_textures(m, found)
    coords = set()
    for key, info in found:
        transform = info.get('extensions', {}).get('KHR_texture_transform', {})
        coords.add(transform.get('texCoord', info.get('texCoord', 0)))
        source = textures[info['index']]['source']
        kind = SLOTS.get(key, 'data')
        name = (m.get('name') or 'material').replace(' ', '-').lower() + '-' + key.replace('Texture', '').lower()
        if source not in image_use or kind == 'normal':
            image_use[source] = (kind, name)
    material_coords.append(coords)

# --- images to WebP files --------------------------------------------------------------------
image_bytes = 0
for i, img in enumerate(images):
    kind, name = image_use.get(i, ('color', f'image-{i}'))
    if img.get('name') in ('circuit-surfaces', 'ground'):
        name = img['name']
    raw = view_bytes(img['bufferView'])
    pic = Image.open(io.BytesIO(raw))
    pic.load()
    has_alpha = pic.mode in ('RGBA', 'LA') and pic.getchannel('A').getextrema()[0] < 255
    pic = pic.convert('RGBA' if has_alpha else 'RGB')
    quality = 84 if kind == 'color' else 92
    file = f'tex/{i:02d}-{name}.webp'
    buf = io.BytesIO()
    pic.save(buf, 'WEBP', quality=quality, method=6, exact=has_alpha)
    (out / file).write_bytes(buf.getvalue())
    image_bytes += len(buf.getvalue())
    images[i] = {'uri': file, 'mimeType': 'image/webp', **({'name': img['name']} if 'name' in img else {})}
for t in textures:
    t['extensions'] = {**t.get('extensions', {}), 'EXT_texture_webp': {'source': t.pop('source')}}
for key in ('extensionsUsed', 'extensionsRequired'):
    gltf[key] = sorted(set(gltf.get(key, [])) | {'EXT_texture_webp'})

# --- drop texture coordinates no texture reads -----------------------------------------------
dropped = 0
for mesh in gltf['meshes']:
    for prim in mesh['primitives']:
        coords = material_coords[prim['material']] if 'material' in prim else set()
        for attr in list(prim['attributes']):
            if attr.startswith('TEXCOORD_') and int(attr.split('_')[1]) not in coords:
                del prim['attributes'][attr]
                dropped += 1

# --- keep only the accessors and buffer views still used, packed into CHUNK-sized buffers --------
used_acc = set()


def mark(i):
    used_acc.add(i)


for mesh in gltf['meshes']:
    for prim in mesh['primitives']:
        for i in prim['attributes'].values():
            mark(i)
        if 'indices' in prim:
            mark(prim['indices'])
        for target in prim.get('targets', []):
            for i in target.values():
                mark(i)
for node in gltf['nodes']:
    for i in node.get('extensions', {}).get('EXT_mesh_gpu_instancing', {}).get('attributes', {}).values():
        mark(i)
for skin in gltf.get('skins', []):
    if 'inverseBindMatrices' in skin:
        mark(skin['inverseBindMatrices'])
for anim in gltf.get('animations', []):
    for s in anim['samplers']:
        mark(s['input'])
        mark(s['output'])

acc_map = {}
new_accessors = []
for i, a in enumerate(accessors):
    if i in used_acc:
        acc_map[i] = len(new_accessors)
        new_accessors.append(a)


for mesh in gltf['meshes']:
    for prim in mesh['primitives']:
        prim['attributes'] = {k: acc_map[v] for k, v in prim['attributes'].items()}
        if 'indices' in prim:
            prim['indices'] = acc_map[prim['indices']]
        prim['targets'] = [{k: acc_map[v] for k, v in t.items()} for t in prim.get('targets', [])] or None
        if prim['targets'] is None:
            del prim['targets']
for node in gltf['nodes']:
    ext = node.get('extensions', {}).get('EXT_mesh_gpu_instancing')
    if ext:
        ext['attributes'] = {k: acc_map[v] for k, v in ext['attributes'].items()}
for skin in gltf.get('skins', []):
    if 'inverseBindMatrices' in skin:
        skin['inverseBindMatrices'] = acc_map[skin['inverseBindMatrices']]
for anim in gltf.get('animations', []):
    for s in anim['samplers']:
        s['input'], s['output'] = acc_map[s['input']], acc_map[s['output']]
gltf['accessors'] = new_accessors

used_views = sorted({a['bufferView'] for a in new_accessors if 'bufferView' in a})
view_map = {}
new_views = []
chunks = [bytearray()]
for vi in used_views:
    raw = view_bytes(vi)
    if len(chunks[-1]) and len(chunks[-1]) + len(raw) > CHUNK:
        chunks.append(bytearray())
    chunk = chunks[-1]
    while len(chunk) % 4:
        chunk.append(0)
    v = dict(views[vi])
    v['buffer'] = len(chunks) - 1
    v['byteOffset'] = len(chunk)
    chunk.extend(raw)
    view_map[vi] = len(new_views)
    new_views.append(v)
for a in new_accessors:
    if 'bufferView' in a:
        a['bufferView'] = view_map[a['bufferView']]
gltf['bufferViews'] = new_views
gltf['buffers'] = []
geometry_bytes = 0
for k, chunk in enumerate(chunks):
    file = f'geometry-{k}.b64.txt'
    (out / file).write_text(base64.b64encode(bytes(chunk)).decode('ascii'))
    geometry_bytes += len(chunk)
    gltf['buffers'].append({'byteLength': len(chunk), 'uri': file})

gltf.setdefault('asset', {})['extras'] = {
    'files': {
        'geometry': [b['uri'] for b in gltf['buffers']],
        'geometryBytes': geometry_bytes,
        'imageBytes': image_bytes,
    }
}
(out / 'model.json').write_text(json.dumps(gltf, separators=(',', ':')))
shutil.copy(ROOT / 'site/assets/data/track.json', out / 'track.json')
shutil.copy(ROOT / 'model-viewer/index.html', out / 'index.html')

total = sum(p.stat().st_size for p in out.rglob('*') if p.is_file())
print(f'{out}: {total / 1e6:.1f} MB in {sum(1 for p in out.rglob("*") if p.is_file())} files')
print(f'  geometry {geometry_bytes / 1e6:.1f} MB in {len(chunks)} file(s) (base64 {geometry_bytes * 4 / 3 / 1e6:.1f} MB)')
print(f'  textures {image_bytes / 1e6:.1f} MB in {len(images)} WebP files; {dropped} unused texture-coordinate sets dropped')
print(f'  model.json {(out / "model.json").stat().st_size / 1e6:.2f} MB')
