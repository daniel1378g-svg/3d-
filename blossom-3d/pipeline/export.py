"""Export for the web viewer:  model.glb (geometry, materials, texture + lightmap UVs)  and  scene.json
(rooms, colliders, doors, lightmap settings).

Static one-off geometry is merged per room and per lightmap atlas; repeated props stay as glTF nodes sharing
one mesh (the viewer turns them into instanced meshes, each instance with its own lightmap rectangle);
door leaves stay individual nodes so the viewer can swing them.
"""
import json, math, os
from collections import Counter, defaultdict
import numpy as np
import bpy
from . import bl, plan, bake

INSTANCE_MIN = 4


def _bounds(ob):
    M = ob.matrix_world
    pts = [M @ __import__('mathutils').Vector(c) for c in ob.bound_box]
    xs = [p.x for p in pts]; ys = [p.y for p in pts]; zs = [p.z for p in pts]
    return min(xs), min(ys), min(zs), max(xs), max(ys), max(zs)


def run(groups, out_dir, glb_name='model.glb'):
    bpy.context.view_layer.update()
    objs = [o for g in groups.values() for o in g]
    use = Counter(o.data.name for o in objs if o.get('kind') in ('furn', 'light'))
    inst, doors, static = [], [], defaultdict(list)
    for o in objs:
        if o.get('door'): doors.append(o)
        elif o.get('kind') in ('furn', 'light') and use[o.data.name] >= INSTANCE_MIN: inst.append(o)
        else: static[(o.get('room', 'EXT'), int(o['lmi']))].append(o)
    exp = bl.collection('EXPORT')
    out_objs = []
    for (room, lmi), lst in sorted(static.items()):
        ob = bake.joined_mesh(lst, f'S_{room}_{lmi}')
        for c in list(ob.users_collection): c.objects.unlink(ob)
        exp.objects.link(ob)
        ob['room'] = room; ob['lmi'] = lmi
        out_objs.append(ob)
    for o in inst + doors:
        sx, sy, ox, oy = o['lm']
        o['lmst'] = [sx, sy, ox, 1.0 - oy - sy]        # glTF UV space (v down)
        out_objs.append(o)
    bpy.ops.object.select_all(action='DESELECT')
    for o in bpy.data.objects: o.select_set(False)
    for o in out_objs:
        o.hide_set(False); o.select_set(True)
    bpy.context.view_layer.objects.active = out_objs[0]
    for m in bpy.data.materials: m.use_backface_culling = m.name not in ('glass', 'plant_leaf', 'paper')
    path = os.path.join(out_dir, glb_name)
    bpy.ops.export_scene.gltf(filepath=path, export_format='GLB', use_selection=True, export_extras=True, export_yup=True,
                              export_apply=False, export_texcoords=True, export_normals=True, export_tangents=False,
                              export_materials='EXPORT', export_image_format='AUTO', export_cameras=False, export_lights=False,
                              export_animations=False, export_skins=False, export_morph=False)
    for o in out_objs:
        if o.name.startswith('S_'): o.hide_render = True      # merged copies must not shadow the bake
    tris = sum(sum(len(p.vertices) - 2 for p in o.data.polygons) for o in out_objs)
    print(f'  glb {os.path.getsize(path) / 1e6:.1f} MB, nodes {len(out_objs)} (static {len(static)}, instances {len(inst)}, doors {len(doors)}), triangles drawn {tris}')

    # ---------------------------------------------------------------- scene.json (three.js frame: x, y up, z = plan y)
    def XZ(x, y): return [round(x - plan.OX, 3), round(y - plan.OY, 3)]
    def rect(r): return [round(r[0] - plan.OX, 3), round(r[1] - plan.OY, 3), round(r[2] - plan.OX, 3), round(r[3] - plan.OY, 3)]
    rooms = []
    for r in plan.ROOMS:
        rooms.append(dict(id=r['id'], parent=r.get('parent'), name=r['name'], area=r.get('area'), note=r.get('note'),
                          rects=[rect(q) for q in r['rects']], ceil=r['ceil'], closed=bool(r.get('closed'))))
    walls = [dict(r=rect(w), h=plan.wall_height(w)) for w in plan.WALLS]
    blockers = []
    for o in plan.OPENINGS:
        if o['kind'] in ('window', 'hatch') or o.get('locked'): blockers.append(rect(o['rect']))
    props = []
    for o in objs:
        if o.get('kind') not in ('furn',) or o.get('nocollide'): continue
        x0, y0, z0, x1, y1, z1 = _bounds(o)
        if z1 < 0.3 or z0 > 1.3: continue
        if (x1 - x0) * (y1 - y0) < 0.004: continue
        props.append([round(x0, 3), round(-y1, 3), round(x1, 3), round(-y0, 3)])     # world y -> three z = -y
    from . import furnish
    for q in furnish.COLLIDERS: props.append(rect(q))
    dj = []
    for o in plan.OPENINGS:
        if o['kind'] not in ('door', 'double', 'slide') or o.get('locked'): continue
        x0, y0, x1, y1 = o['rect']
        dj.append(dict(id=o['id'], kind=o['kind'], c=XZ((x0 + x1) / 2, (y0 + y1) / 2), r=rect(o['rect']), label=o.get('label')))
    import math as _m
    views = {}
    for rid, (x, y, lx, ly) in plan.VIEWPOINTS.items():
        yaw = _m.degrees(_m.atan2(-(lx - x), -(ly - y)))
        views[rid] = [round(x - plan.OX, 3), round(y - plan.OY, 3), round(yaw, 1)]
    tour = []
    for st in plan.TOUR:
        d = dict(p=XZ(st[0], st[1]))
        if len(st) > 2:
            o = st[2]
            if 'room' in o: d['room'] = o['room']
            if 'pause' in o: d['pause'] = o['pause']
            if 'look' in o: d['look'] = XZ(*o['look'])
        tour.append(d)
    # sanity: the visit must not cut through walls, sills or furniture
    solid = [w['r'] for w in walls] + blockers + props
    bad = 0
    for a, b in zip(tour, tour[1:]):
        n = max(2, int(_m.hypot(b['p'][0] - a['p'][0], b['p'][1] - a['p'][1]) / 0.05))
        for i in range(n + 1):
            x = a['p'][0] + (b['p'][0] - a['p'][0]) * i / n; z = a['p'][1] + (b['p'][1] - a['p'][1]) * i / n
            hit = next((q for q in solid if q[0] - 0.12 < x < q[2] + 0.12 and q[1] - 0.12 < z < q[3] + 0.12), None)
            if hit:
                bad += 1; print('  ! tour segment', [round(a['p'][0] + plan.OX, 2), round(a['p'][1] + plan.OY, 2)], '->', [round(b['p'][0] + plan.OX, 2), round(b['p'][1] + plan.OY, 2)],
                                'hits', [round(hit[0] + plan.OX, 2), round(hit[1] + plan.OY, 2), round(hit[2] + plan.OX, 2), round(hit[3] + plan.OY, 2)]); break
    print('  tour:', len(tour), 'stops,', bad, 'blocked segments')
    scene = dict(
        version=1, origin=[plan.OX, plan.OY], north=plan.NORTH_DEG, views=views, tour=tour,
        stepovers=[rect((q[0] - 0.15, q[1], q[2] + 0.15, q[3])) for q in plan.STEPOVERS],
        lightmaps=dict(range=bake.M_RANGE, files=[f'lm{i}.webp' for i in sorted(groups)]),
        rooms=rooms, walls=walls, blockers=blockers, props=props, doors=dj,
        bounds=rect((4.284, 10.569, 48.304, 35.885)),
    )
    json.dump(scene, open(os.path.join(out_dir, 'scene.json'), 'w'), separators=(',', ':'), ensure_ascii=False)
    print('  scene.json', os.path.getsize(os.path.join(out_dir, 'scene.json')) // 1024, 'kB')
    return out_objs
