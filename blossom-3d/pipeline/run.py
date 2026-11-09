"""Pipeline driver.   python3 -m pipeline.run <stage> [<stage> ...]

  build            assemble the scene (architecture, joinery, furniture, lights) in Blender
  preview[:names]  quick Cycles stills into build/preview/ (top, and a few eye-level views)
  save             write build/scene.blend
"""
import os, sys, time
from . import bl, plan, arch

ROOT = bl.ROOT
BUILD = os.path.join(ROOT, 'build')
os.makedirs(os.path.join(BUILD, 'preview'), exist_ok=True)


def stage_build(opts):
    import bpy
    bl.reset()
    t = time.time()
    parts, info = arch.build()
    for name, p in parts.items():
        if 'noceil' in opts:
            keep = [i for i, m in enumerate(p.mats) if not m.startswith('ceil')]
        else:
            keep = range(len(p.faces))
        if name == 'TOP' and 'noceil' not in opts: pass
        ob = bl.mesh_object('A_' + name, p.verts, [p.faces[i] for i in keep], [p.mats[i] for i in keep],
                            [p.uv0[i] for i in keep], [p.lm[i] for i in keep], coll='ARCH')
        ob['room'] = name; ob['kind'] = 'arch'
    print('arch', round(time.time() - t, 2), 's')
    try:
        from . import joinery
        joinery.build(info)
    except ImportError:
        pass
    try:
        from . import furnish
        furnish.build(info)
    except ImportError:
        pass
    return info


VIEWS = {
    # name: (eye plan x, y, z), (target plan x, y, z), lens
    'ref_ne':   ((25.2, 22.3, 1.65), (15.0, 33.0, 1.0), 16),
    'ref_sw':   ((14.4, 35.0, 1.65), (24.0, 23.0, 1.2), 16),
    'ref_serv': ((17.5, 24.0, 1.65), (13.0, 26.5, 1.0), 18),
    'circ':     ((23.8, 19.9, 1.65), (30.0, 19.5, 1.3), 16),
    'circ_s':   ((28.2, 29.0, 1.65), (28.4, 18.0, 1.3), 16),
    'balf':     ((43.6, 18.2, 1.65), (36.0, 11.5, 1.1), 15),
    'balf_in':  ((31.0, 18.0, 1.65), (40.0, 16.5, 1.2), 15),
    'balm':     ((43.6, 19.7, 1.65), (36.0, 26.5, 1.1), 15),
    'shower':   ((33.3, 14.5, 1.65), (31.0, 11.2, 1.2), 15),
    'trf':      ((47.4, 17.2, 1.65), (45.0, 11.5, 1.2), 15),
    'ante':     ((44.9, 19.0, 1.65), (48.0, 19.0, 1.3), 15),
    'limpos':   ((8.9, 28.3, 1.65), (12.6, 23.5, 1.0), 15),
    'sujos':    ((5.0, 31.3, 1.65), (11.0, 33.0, 0.9), 15),
    'vest':     ((7.9, 26.2, 1.65), (5.0, 23.3, 1.1), 15),
    'tray':     ((12.4, 35.2, 1.65), (12.9, 29.5, 1.0), 15),
    'tec':      ((23.5, 18.0, 1.65), (27.0, 16.6, 1.2), 15),
    'entry_out': ((18.5, 17.0, 1.65), (23.5, 20.0, 1.5), 20),
}


def stage_preview(opts, names):
    import bpy
    sc = bl.setup_cycles(samples=int(os.environ.get('SPP', '24')), res=(1280, 720))
    if not bpy.data.worlds:
        bl.world_sky(strength=0.6, sun_elev=40, sun_rot=0)
        bl.sun(elev=40, azim=60, strength=3.0)
    out = os.path.join(BUILD, 'preview')
    names = names or ['top']
    for n in names:
        t = time.time()
        if n == 'top':
            cam = bl.camera('cam_top', plan.W(26.3, 23.3, 60), plan.W(26.3, 23.3, 0), ortho=47)
            sc.render.resolution_x, sc.render.resolution_y = 1800, 1100
        elif n == 'iso':
            cam = bl.camera('cam_iso', plan.W(8, 52, 34), plan.W(27, 24, 0), lens=30)
            sc.render.resolution_x, sc.render.resolution_y = 1800, 1100
        else:
            e, tg, lens = VIEWS[n]
            cam = bl.camera('cam_' + n, plan.W(*e), plan.W(*tg), lens=lens)
            sc.render.resolution_x, sc.render.resolution_y = 1280, 720
        bl.render(os.path.join(out, n + '.png'), cam)
        print('rendered', n, round(time.time() - t, 1), 's')


def main(argv):
    info = None
    for a in argv:
        name, _, arg = a.partition(':')
        args = [s for s in arg.split(',') if s]
        if name == 'build': info = stage_build(args)
        elif name == 'preview': stage_preview([], args)
        elif name == 'save':
            import bpy
            bpy.ops.wm.save_as_mainfile(filepath=os.path.join(BUILD, 'scene.blend'))
        else: raise SystemExit('unknown stage ' + a)


if __name__ == '__main__':
    main(sys.argv[1:])
