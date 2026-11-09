"""Material table shared by the Blender build (bake + GLB export) and, through the GLB, by the web viewer.

color: sRGB hex.  tex: base name of a texture set in textures/ (albedo `<tex>.jpg`, optional `<tex>_n.jpg`, `<tex>_r.jpg`);
the albedo is multiplied by `color`, so one neutral texture can serve several tints.  scale: metres per texture repeat.
"""

MATERIALS = {
    # ---- walls / ceilings
    'paint_white':  dict(color='#ECEAE4', rough=0.92, tex='plaster', scale=1.5),
    'paint_accent': dict(color='#8FA58B', rough=0.92, tex='plaster', scale=1.5),
    'paint_exist':  dict(color='#DDD9D0', rough=0.92, tex='plaster', scale=1.5),
    'paint_tech':   dict(color='#D7D7D3', rough=0.95, tex='plaster', scale=1.5),
    'tile_bal':     dict(color='#FFFFFF', rough=0.30, tex='tile_bal', scale=1.2),
    'tile_wet':     dict(color='#FFFFFF', rough=0.28, tex='tile_wet', scale=1.2),
    'tile_kit':     dict(color='#FFFFFF', rough=0.22, tex='tile_kit', scale=0.8),
    'panel_clean':  dict(color='#F2F3F1', rough=0.38, tex='panel', scale=2.4),
    'ceil_grid':    dict(color='#FFFFFF', rough=0.95, tex='ceil_grid', scale=1.2),
    'ceil_plain':   dict(color='#F4F3EF', rough=0.95),
    'ceil_clean':   dict(color='#FFFFFF', rough=0.60, tex='ceil_clean', scale=1.2),
    'ext_wall':     dict(color='#E3E0D8', rough=0.95, tex='plaster', scale=1.5),
    'wall_cut':     dict(color='#2E3033', rough=0.9),
    'sill':         dict(color='#D2CEC5', rough=0.4),
    # ---- floors
    'floor_main':    dict(color='#FFFFFF', rough=0.42, tex='floor_main', scale=1.2),
    'floor_bal':     dict(color='#FFFFFF', rough=0.72, tex='floor_bal', scale=1.2),
    'floor_wet':     dict(color='#FFFFFF', rough=0.70, tex='floor_wet', scale=1.2),
    'floor_kitchen': dict(color='#FFFFFF', rough=0.55, tex='floor_kitchen', scale=2.0),
    'floor_clean':   dict(color='#FFFFFF', rough=0.45, tex='floor_clean', scale=2.0),
    'floor_concrete': dict(color='#8E8C87', rough=0.85, tex='concrete', scale=3.0),
    'floor_exist':   dict(color='#B4B0A7', rough=0.6, tex='concrete', scale=3.0),
    # ---- joinery / metal / glass
    'door_int':     dict(color='#E9E7E1', rough=0.55),
    'door_oak':     dict(color='#FFFFFF', rough=0.5, tex='oak', scale=1.0),
    'door_wet':     dict(color='#DDE2E3', rough=0.5),
    'door_ext':     dict(color='#3C4146', rough=0.5),
    'frame_white':  dict(color='#E4E2DC', rough=0.5),
    'alu_dark':     dict(color='#35393D', rough=0.45, metal=0.6),
    'steel':        dict(color='#C9CCCE', rough=0.32, metal=1.0, tex='steel', scale=1.0),
    'steel_dark':   dict(color='#8B8F92', rough=0.4, metal=1.0),
    'chrome':       dict(color='#E6E8EA', rough=0.12, metal=1.0),
    'glass':        dict(color='#DCE8E6', rough=0.05, alpha=0.18),
    'mirror':       dict(color='#F2F5F5', rough=0.03, metal=1.0),
    'skirting':     dict(color='#4A4D50', rough=0.5),
    # ---- furniture
    'oak':          dict(color='#FFFFFF', rough=0.48, tex='oak', scale=1.0),
    'laminate_white': dict(color='#EDEBE6', rough=0.45),
    'hpl_grey':     dict(color='#B8BCBE', rough=0.5),
    'hpl_anthracite': dict(color='#3F4347', rough=0.5),
    'hpl_green':    dict(color='#7F9A80', rough=0.5),
    'hpl_blue':     dict(color='#7C95A6', rough=0.5),
    'plastic_white': dict(color='#EDEDEA', rough=0.4),
    'plastic_grey': dict(color='#8A8E91', rough=0.5),
    'plastic_dark': dict(color='#2B2D30', rough=0.5),
    'plastic_green': dict(color='#6F8F73', rough=0.45),
    'plastic_blue': dict(color='#4E7FA8', rough=0.45),
    'plastic_yellow': dict(color='#D9B23C', rough=0.45),
    'plastic_brown': dict(color='#8A6A4C', rough=0.45),
    'plastic_red':  dict(color='#B8322B', rough=0.4),
    'ceramic':      dict(color='#F6F6F3', rough=0.12),
    'rubber_black': dict(color='#1C1D1F', rough=0.8),
    'fabric_mat':   dict(color='#3A3C3F', rough=0.98),
    'plant_leaf':   dict(color='#4E6E44', rough=0.6),
    'plant_pot':    dict(color='#D8D5CE', rough=0.7),
    'soil':         dict(color='#3B2F26', rough=1.0),
    'paper':        dict(color='#F3F1EA', rough=0.9),
    'sign_green':   dict(color='#1F8F4E', rough=0.5, emit=0.6),
    'sign_blue':    dict(color='#2A5F9E', rough=0.5),
    'copper':       dict(color='#C98A5E', rough=0.35, metal=1.0),
    'insulation':   dict(color='#C9CBCD', rough=0.6, metal=0.7),
    'tank_white':   dict(color='#E9EAEA', rough=0.35),
    # ---- lights (emission strength is set by the lighting stage)
    'led_panel':    dict(color='#FFF6E8', rough=0.5, emit=1.0),
    'led_down':     dict(color='#FFF4E2', rough=0.5, emit=1.0),
    # ---- outside
    'ground_paving': dict(color='#B9B5AC', rough=0.85, tex='paving', scale=2.0),
    'ground_gravel': dict(color='#A7A296', rough=0.95, tex='concrete', scale=3.0),
    'ground_grass': dict(color='#6F8450', rough=1.0, tex='grass', scale=2.5),
    'roof':         dict(color='#8F9092', rough=0.9),
    'exist_wall':   dict(color='#D6D3CB', rough=0.95),
}


def srgb_to_linear(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def hex_linear(h):
    h = h.lstrip('#')
    return tuple(srgb_to_linear(int(h[i:i + 2], 16) / 255.0) for i in (0, 2, 4))
