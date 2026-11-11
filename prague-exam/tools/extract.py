# Cuts the game area out of the Prague OpenStreetMap extract.
#
#   .cache/praha.osm.pbf  ->  .cache/raw.json
#
# Download the extract first (about 50 MB):
#   curl -o .cache/praha.osm.pbf \
#     https://download.openstreetmap.fr/extracts/europe/czech_republic/praha-latest.osm.pbf
# Needs: pip install osmium
#
# raw.json = { bbox: [W,S,E,N],
#              nodes: { "<id>": [lon, lat, tags|null] },
#              ways:  [ [id, [nodeId...], tags] ],
#              rels:  [ [id, [[type, ref, role]...], tags] ] }   type is "n" | "w" | "r"
import json
import os
import osmium

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, "..", ".cache")
W, S, E, N = 14.4440, 50.0705, 14.5450, 50.1352   # keep in sync with src/js/data/geo.js
PAD = 0.004                                       # extra margin so ways crossing the edge stay whole


class Handler(osmium.SimpleHandler):
    def __init__(self):
        super().__init__()
        self.nodes, self.ways, self.rels, self.inside = {}, [], [], set()

    def node(self, n):
        lon, lat = n.location.lon, n.location.lat
        if W - PAD <= lon <= E + PAD and S - PAD <= lat <= N + PAD:
            self.inside.add(n.id)
            self.nodes[n.id] = (round(lon, 7), round(lat, 7), dict(n.tags) if len(n.tags) else None)

    def way(self, w):
        refs = [n.ref for n in w.nodes]
        if any(r in self.inside for r in refs):
            self.ways.append((w.id, refs, dict(w.tags)))

    def relation(self, r):
        tags = dict(r.tags)
        if tags.get("type") in ("multipolygon", "restriction", "route"):
            self.rels.append((r.id, [(m.type, m.ref, m.role) for m in r.members], tags))


h = Handler()
h.apply_file(os.path.join(CACHE, "praha.osm.pbf"))
print("nodes", len(h.nodes), "ways", len(h.ways), "relations", len(h.rels))
with open(os.path.join(CACHE, "raw.json"), "w") as f:
    json.dump({"bbox": [W, S, E, N],
               "nodes": {str(k): v for k, v in h.nodes.items()},
               "ways": h.ways, "rels": h.rels}, f, ensure_ascii=False)
