"""Blender helpers (bpy 5.x as a Python module)."""
import math, os, warnings
import bpy, bmesh
from mathutils import Vector, Matrix
from .materials import MATERIALS, hex_linear

warnings.filterwarnings('ignore', category=DeprecationWarning)
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
TEX_DIR = os.path.join(ROOT, 'textures')
_mats = {}


def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    _mats.clear()


def collection(name):
    c = bpy.data.collections.get(name)
    if c is None:
        c = bpy.data.collections.new(name)
        bpy.context.scene.collection.children.link(c)
    return c


def material(name):
    """Principled material from the table. Image textures are wired through an explicit 'UVMap' node so the
    lightmap UV layer can be the active one while baking."""
    if name in _mats: return _mats[name]
    spec = MATERIALS[name]
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    bsdf = next(n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED')
    col = hex_linear(spec['color'])
    bsdf.inputs['Base Color'].default_value = (*col, 1)
    bsdf.inputs['Roughness'].default_value = spec.get('rough', 0.5)
    bsdf.inputs['Metallic'].default_value = spec.get('metal', 0.0)
    tex = spec.get('tex')
    if tex and os.path.exists(os.path.join(TEX_DIR, tex + '.jpg')):
        uv = nt.nodes.new('ShaderNodeUVMap'); uv.uv_map = 'UVMap'
        mp = nt.nodes.new('ShaderNodeMapping'); s = 1.0 / spec.get('scale', 1.0)
        mp.inputs['Scale'].default_value = (s, s, 1)
        nt.links.new(uv.outputs['UV'], mp.inputs['Vector'])
        img = nt.nodes.new('ShaderNodeTexImage'); img.name = 'albedo'
        img.image = bpy.data.images.load(os.path.join(TEX_DIR, tex + '.jpg'), check_existing=True)
        nt.links.new(mp.outputs['Vector'], img.inputs['Vector'])
        if spec['color'].upper() in ('#FFFFFF', '#FFF'):
            nt.links.new(img.outputs['Color'], bsdf.inputs['Base Color'])
        else:
            mix = nt.nodes.new('ShaderNodeMix'); mix.data_type = 'RGBA'; mix.blend_type = 'MULTIPLY'
            mix.inputs['Factor'].default_value = 1.0
            mix.inputs['A'].default_value = (*col, 1)
            nt.links.new(img.outputs['Color'], mix.inputs['B'])
            nt.links.new(mix.outputs['Result'], bsdf.inputs['Base Color'])
    if tex and os.path.exists(os.path.join(TEX_DIR, tex + '_n.jpg')):
        nimg = nt.nodes.new('ShaderNodeTexImage'); nimg.name = 'normal'
        nimg.image = bpy.data.images.load(os.path.join(TEX_DIR, tex + '_n.jpg'), check_existing=True)
        nimg.image.colorspace_settings.name = 'Non-Color'
        nt.links.new(mp.outputs['Vector'], nimg.inputs['Vector'])
        nm = nt.nodes.new('ShaderNodeNormalMap'); nm.uv_map = 'UVMap'; nm.inputs['Strength'].default_value = spec.get('nstrength', 1.0)
        nt.links.new(nimg.outputs['Color'], nm.inputs['Color'])
        nt.links.new(nm.outputs['Normal'], bsdf.inputs['Normal'])
    if spec.get('alpha', 1.0) < 1.0:
        bsdf.inputs['Alpha'].default_value = spec['alpha']
        try: m.surface_render_method = 'BLENDED'
        except Exception: pass
    if spec.get('emit'):
        bsdf.inputs['Emission Color'].default_value = (*col, 1)
        bsdf.inputs['Emission Strength'].default_value = spec['emit']
    m['spec'] = name
    _mats[name] = m
    return m


def mesh_object(name, verts, faces, mats, uv0=None, lm=None, coll='ARCH', smooth=False, dens=None):
    """verts [(x,y,z)], faces [tuple of indices], mats [material name per face], uv0/lm per face per corner."""
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], faces)
    names = []
    for m in mats:
        if m not in names: names.append(m)
    for n in names: me.materials.append(material(n))
    idx = {n: i for i, n in enumerate(names)}
    me.polygons.foreach_set('material_index', [idx[m] for m in mats])
    if uv0 is not None:
        l = me.uv_layers.new(name='UVMap')
        l.data.foreach_set('uv', [c for f in uv0 for uv in f for c in uv])
    if lm is not None:
        l = me.uv_layers.new(name='LM')
        l.data.foreach_set('uv', [c for f in lm for uv in f for c in uv])
    if smooth: me.polygons.foreach_set('use_smooth', [True] * len(me.polygons))
    if dens is not None:
        a = me.attributes.new('dens', 'FLOAT', 'FACE')
        a.data.foreach_set('value', dens)
    me.update()
    ob = bpy.data.objects.new(name, me)
    collection(coll).objects.link(ob)
    return ob


def look_at(ob, target):
    d = Vector(target) - ob.location
    ob.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()


def camera(name, loc, target, lens=18, ortho=None):
    cam = bpy.data.cameras.new(name)
    ob = bpy.data.objects.new(name, cam)
    bpy.context.scene.collection.objects.link(ob)
    ob.location = loc
    look_at(ob, target)
    if ortho:
        cam.type = 'ORTHO'; cam.ortho_scale = ortho
    else:
        cam.lens = lens
    cam.clip_start = 0.05; cam.clip_end = 500
    return ob


def setup_cycles(samples=24, res=(1280, 720), denoise=True):
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'
    sc.cycles.device = 'CPU'
    sc.cycles.samples = samples
    sc.cycles.use_denoising = denoise
    try: sc.cycles.denoiser = 'OPENIMAGEDENOISE'
    except Exception: pass
    sc.cycles.max_bounces = 6; sc.cycles.diffuse_bounces = 4; sc.cycles.glossy_bounces = 2
    sc.cycles.transmission_bounces = 4; sc.cycles.transparent_max_bounces = 8
    sc.cycles.caustics_reflective = False; sc.cycles.caustics_refractive = False
    sc.cycles.sample_clamp_indirect = 8.0
    sc.render.resolution_x, sc.render.resolution_y = res
    sc.render.resolution_percentage = 100
    sc.render.image_settings.file_format = 'PNG'
    sc.view_settings.view_transform = 'AgX'
    try: sc.view_settings.look = 'AgX - Base Contrast'
    except Exception: pass
    return sc


def world_sky(strength=1.0, sun_elev=38.0, sun_rot=0.0):
    w = bpy.data.worlds.new('World'); bpy.context.scene.world = w
    w.use_nodes = True
    nt = w.node_tree
    bg = next(n for n in nt.nodes if n.type == 'BACKGROUND')
    sky = nt.nodes.new('ShaderNodeTexSky')
    kinds = [e.identifier for e in sky.bl_rna.properties['sky_type'].enum_items]
    for k in ('MULTIPLE_SCATTERING', 'NISHITA', 'SINGLE_SCATTERING', 'HOSEK_WILKIE'):
        if k in kinds:
            sky.sky_type = k; break
    for attr, val in (('sun_elevation', math.radians(sun_elev)), ('sun_rotation', math.radians(sun_rot)), ('sun_disc', False), ('sun_intensity', 1.0)):
        try: setattr(sky, attr, val)
        except Exception: pass
    nt.links.new(sky.outputs['Color'], bg.inputs['Color'])
    bg.inputs['Strength'].default_value = strength
    return w, sky


def sun(elev=38.0, azim=0.0, strength=4.0, angle=1.0):
    """azim: direction the light travels *towards*, degrees CCW from +X in the Blender XY plane."""
    l = bpy.data.lights.new('Sun', 'SUN'); l.energy = strength; l.angle = math.radians(angle)
    ob = bpy.data.objects.new('Sun', l); bpy.context.scene.collection.objects.link(ob)
    e, a = math.radians(elev), math.radians(azim)
    d = Vector((math.cos(a) * math.cos(e), math.sin(a) * math.cos(e), -math.sin(e)))     # travel direction
    ob.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()
    return ob


def render(path, cam):
    sc = bpy.context.scene
    sc.camera = cam
    sc.render.filepath = path
    bpy.ops.render.render(write_still=True)
