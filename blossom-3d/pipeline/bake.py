"""Bake global illumination into lightmap atlases with Cycles.

All objects of an atlas are merged (numpy) into one bake mesh whose 'LM' UVs are already in atlas space.
The result is the diffuse lighting without surface colour (direct + indirect), i.e. radiance / albedo.
"""
import math, os, time
import numpy as np
import bpy
from . import bl, lightmap, lights

M_RANGE = 3.0          # lightmap stores D / M_RANGE, sRGB encoded 8 bit (viewer: lightMapIntensity = M_RANGE * pi)


def joined_mesh(objs, name):
    V = []; LV = []; LS = []; MI = []; UV0 = []; UV1 = []; SM = []
    mats = []; voff = 0; loff = 0
    for ob in objs:
        me = ob.data
        nv, nl, npo = len(me.vertices), len(me.loops), len(me.polygons)
        if npo == 0: continue
        co = np.empty(nv * 3, np.float32); me.vertices.foreach_get('co', co); co = co.reshape(-1, 3)
        Mw = np.array(ob.matrix_world, np.float32)
        co = co @ Mw[:3, :3].T + Mw[:3, 3]
        lv = np.empty(nl, np.int32); me.loops.foreach_get('vertex_index', lv)
        ls = np.empty(npo, np.int32); me.polygons.foreach_get('loop_start', ls)
        mi = np.empty(npo, np.int32); me.polygons.foreach_get('material_index', mi)
        sm = np.empty(npo, bool); me.polygons.foreach_get('use_smooth', sm)
        remap = np.zeros(max(1, len(me.materials)), np.int32)
        for i, m in enumerate(me.materials):
            if m.name not in mats: mats.append(m.name)
            remap[i] = mats.index(m.name)
        uv0 = np.zeros(nl * 2, np.float32)
        if me.uv_layers.get('UVMap'): me.uv_layers['UVMap'].data.foreach_get('uv', uv0)
        uv1 = np.zeros(nl * 2, np.float32); me.uv_layers['LM'].data.foreach_get('uv', uv1)
        uv1 = uv1.reshape(-1, 2); sx, sy, ox, oy = ob['lm']
        uv1 = uv1 * (sx, sy) + (ox, oy)
        V.append(co); LV.append(lv + voff); LS.append(ls + loff); MI.append(remap[mi]); SM.append(sm)
        UV0.append(uv0.reshape(-1, 2)); UV1.append(uv1.astype(np.float32))
        voff += nv; loff += nl
    me = bpy.data.meshes.new(name)
    V = np.concatenate(V); LV = np.concatenate(LV); LS = np.concatenate(LS)
    me.vertices.add(len(V)); me.vertices.foreach_set('co', V.ravel())
    me.loops.add(len(LV)); me.loops.foreach_set('vertex_index', LV)
    me.polygons.add(len(LS)); me.polygons.foreach_set('loop_start', LS)
    me.polygons.foreach_set('material_index', np.concatenate(MI))
    for m in mats: me.materials.append(bpy.data.materials[m])
    me.update(calc_edges=True)
    me.polygons.foreach_set('use_smooth', np.concatenate(SM))
    me.uv_layers.new(name='UVMap').data.foreach_set('uv', np.concatenate(UV0).ravel())
    me.uv_layers.new(name='LM').data.foreach_set('uv', np.concatenate(UV1).ravel())
    try: me.set_sharp_from_angle(angle=math.radians(42))
    except Exception: pass
    me.validate()
    ob = bpy.data.objects.new(name, me)
    bl.collection('BAKE').objects.link(ob)
    return ob


def bake_materials():
    """temporary look for the bake: no metals (their lightmap then holds the incoming light), invisible glass."""
    for m in bpy.data.materials:
        if not m.node_tree: continue
        nt = m.node_tree
        bsdf = next((n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED'), None)
        if bsdf is None: continue
        if bsdf.inputs['Metallic'].default_value > 0:
            bsdf.inputs['Metallic'].default_value = 0.0
        bsdf.inputs['Roughness'].default_value = 1.0
        if m.name in ('glass',):
            out = next(n for n in nt.nodes if n.type == 'OUTPUT_MATERIAL')
            tr = nt.nodes.new('ShaderNodeBsdfTransparent')
            nt.links.new(tr.outputs['BSDF'], out.inputs['Surface'])
        if m.name == 'mirror':
            bsdf.inputs['Base Color'].default_value = (0.7, 0.7, 0.7, 1)


def dilate(img, mask, iters=8):
    img = img.copy(); mask = mask.copy()
    for _ in range(iters):
        acc = np.zeros_like(img); cnt = np.zeros(mask.shape, np.float32)
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                if dx == 0 and dy == 0: continue
                sm = np.roll(np.roll(mask, dy, 0), dx, 1); si = np.roll(np.roll(img, dy, 0), dx, 1)
                acc += si * sm[..., None]; cnt += sm
        fill = (~mask) & (cnt > 0)
        img[fill] = acc[fill] / cnt[fill][:, None]
        mask = mask | fill
    return img


def finish(D, mask):
    """denoise (OIDN lightmap filter) with the gutters filled first so islands do not bleed into black, then re-dilate."""
    from . import oidn
    t = time.time()
    filled = dilate(D, mask, iters=6)
    try:
        den = oidn.denoise(filled)
    except Exception as e:
        print('  denoise skipped:', e); den = filled
    den = np.where(mask[..., None], den, 0)
    out = dilate(den, mask, iters=8)
    print(f'  denoise + dilate {time.time() - t:.1f}s')
    return out


def encode(D):
    x = np.clip(D / M_RANGE, 0, 1)
    s = np.where(x <= 0.0031308, x * 12.92, 1.055 * np.power(x, 1 / 2.4) - 0.055)
    rng = np.random.default_rng(7)
    s = s * 255.0 + (rng.random(s.shape, dtype=np.float32) - 0.5)       # dither
    return np.clip(np.round(s), 0, 255).astype(np.uint8)


def setup_light(sun_elev=36.0, sun_azim=75.0, sun_strength=11.0, sky_strength=0.9):
    if not bpy.data.worlds:
        bl.world_sky(strength=sky_strength, sun_elev=sun_elev, sun_rot=0)
        bl.sun(elev=sun_elev, azim=sun_azim, strength=sun_strength, angle=1.2)
    lights.set_bake_emission()


def run(groups, sizes, out_dir, samples=64, tag='lm'):
    from PIL import Image
    sc = bl.setup_cycles(samples=samples, denoise=True)
    sc.cycles.use_adaptive_sampling = True
    sc.cycles.adaptive_threshold = 0.03
    sc.cycles.diffuse_bounces = 5; sc.cycles.max_bounces = 6
    sc.render.bake.use_pass_direct = True; sc.render.bake.use_pass_indirect = True; sc.render.bake.use_pass_color = False
    sc.render.bake.margin = 0; sc.render.bake.use_clear = True
    bpy.context.view_layer.update()
    bake_materials()
    setup_light()
    bobs = {}
    for gi, objs in groups.items():
        bobs[gi] = joined_mesh(objs, f'BAKE_{gi}')
        for ob in objs: ob.hide_render = True
    # objects that are in no lightmap group (none expected) keep rendering as they are
    images = {}
    for gi, bob in bobs.items():
        size = sizes[gi]
        img = bpy.data.images.new(f'{tag}{gi}', size, size, alpha=True, float_buffer=True)
        img.colorspace_settings.name = 'Non-Color'
        for m in bob.data.materials:
            nt = m.node_tree
            node = nt.nodes.get('LM_TARGET') or nt.nodes.new('ShaderNodeTexImage')
            node.name = 'LM_TARGET'; node.image = img
            for n in nt.nodes: n.select = False
            node.select = True; nt.nodes.active = node
        bpy.ops.object.select_all(action='DESELECT')
        bob.select_set(True); bpy.context.view_layer.objects.active = bob
        bob.data.uv_layers.active = bob.data.uv_layers['LM']
        t = time.time()
        bpy.ops.object.bake(type='DIFFUSE', pass_filter={'DIRECT', 'INDIRECT'}, margin=0, uv_layer='LM', use_clear=True)
        px = np.empty(size * size * 4, np.float32); img.pixels.foreach_get(px)
        px = px.reshape(size, size, 4)[::-1]          # top row first
        mask = px[..., 3] > 0.5
        D = np.nan_to_num(px[..., :3], nan=0.0, posinf=0.0, neginf=0.0)
        print(f'  baked atlas {gi} ({size}px) in {time.time() - t:.0f}s  coverage {mask.mean() * 100:.0f}%  mean {D[mask].mean():.3f}  p50 {np.median(D[mask]):.3f}  p99 {np.percentile(D[mask], 99):.2f}')
        np.save(os.path.join(out_dir, f'{tag}{gi}.npy'), np.concatenate([D, mask[..., None].astype(np.float32)], -1).astype(np.float16))
        D = finish(D, mask)
        Image.fromarray(encode(D)).save(os.path.join(out_dir, f'{tag}{gi}.png'))
        images[gi] = img
    return bobs
