import json, math, sys
osm_path, track_path, out_png = sys.argv[1], sys.argv[2], sys.argv[3]
d = json.load(open(osm_path))
by = {e.get('tags', {}).get('name', str(e['id'])): e for e in d['elements']}
order = ['Recta da Meta','Curva 1','1301627161','Curva 2','Descida para a Curva 3','Curva 3','Subida para a VIP','Curva VIP','Recta Interior','Parabólica Interior','Descida para o Triângulo','Orelha','Circuito Estoril','Subida para a Variante','Variante (Gancho)','Variante','Esses','Parabólica Ayrton Senna']
lat0 = 38.7508; lon0 = -9.3942
def xy(p):
    return ((p['lon']-lon0)*111320*math.cos(math.radians(lat0)), (p['lat']-lat0)*110574)
pts = []
seglen = {}
for nm in order:
    g = [xy(p) for p in by[nm]['geometry']]
    seglen[nm] = sum(math.dist(a,b) for a,b in zip(g,g[1:]))
    if pts: g = g[1:]
    pts += g
pts = pts[:-1] if math.dist(pts[0], pts[-1]) < 0.5 else pts
n = len(pts)
L = sum(math.dist(pts[i], pts[(i+1)%n]) for i in range(n))
A = sum(pts[i][0]*pts[(i+1)%n][1]-pts[(i+1)%n][0]*pts[i][1] for i in range(n))/2
print('OSM GP loop length m', round(L), 'signed area (x=east,y=north)', round(A), 'CCW' if A>0 else 'CW')
for nm in order: print(f'  {nm}: {seglen[nm]:.0f} m')
xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
print('bbox E-W', round(max(xs)-min(xs)), 'N-S', round(max(ys)-min(ys)))
g = [xy(p) for p in by['Recta da Meta']['geometry']]
hd = math.degrees(math.atan2(g[-1][0]-g[0][0], g[-1][1]-g[0][1]))%360
print('main straight start', [round(v) for v in g[0]], 'end', [round(v) for v in g[-1]], 'bearing deg (from N, clockwise)', round(hd))
# resample both to N points by arc length
def resample(P, N):
    m=len(P); cum=[0]
    for i in range(m): cum.append(cum[-1]+math.dist(P[i],P[(i+1)%m]))
    T=cum[-1]; out=[]; j=0
    for k in range(N):
        s=T*k/N
        while cum[j+1]<s: j+=1
        t=(s-cum[j])/(cum[j+1]-cum[j]+1e-12); a=P[j]; b=P[(j+1)%m]
        out.append((a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t))
    return out, T
tj = json.load(open(track_path))
T = [(p[0], -p[1]) for p in tj['pts']]  # x, z -> flip z so north-up-ish comparable; test both reflections anyway
N=400
R,_ = resample(pts,N)
best=None
for refl in (1,-1):
    Q0 = [(p[0], refl*p[1]) for p in T]
    for rev in (False, True):
        Q1 = Q0[::-1] if rev else Q0
        Qr,_ = resample(Q1,N)
        for shift in range(0,N,2):
            Qs = Qr[shift:]+Qr[:shift]
            # Procrustes similarity (rotation+scale+translation) of Qs onto R
            mx=sum(p[0] for p in R)/N; my=sum(p[1] for p in R)/N
            qx=sum(p[0] for p in Qs)/N; qy=sum(p[1] for p in Qs)/N
            a=b=c=0
            for (rx,ry),(sx,sy) in zip(R,Qs):
                rx-=mx; ry-=my; sx-=qx; sy-=qy
                a+=sx*rx+sy*ry; b+=sx*ry-sy*rx; c+=sx*sx+sy*sy
            th=math.atan2(b,a); s=math.hypot(a,b)/c
            err=[]
            for (rx,ry),(sx,sy) in zip(R,Qs):
                sx-=qx; sy-=qy
                X=s*(math.cos(th)*sx-math.sin(th)*sy)+mx; Y=s*(math.sin(th)*sx+math.cos(th)*sy)+my
                err.append(math.dist((X,Y),(rx,ry)))
            rms=math.sqrt(sum(e*e for e in err)/N)
            if best is None or rms<best[0]:
                best=(rms,max(err),refl,rev,shift,th,s,(mx,my,qx,qy),Qs)
rms,mx_e,refl,rev,shift,th,s,c,Qs=best
print(f'best similarity fit: RMS {rms:.0f} m, max {mx_e:.0f} m, reflect={refl}, reversed={rev}, rot={math.degrees(th):.1f} deg, scale={s:.3f}')
# direction of travel of track.json in its own frame (x,z)
Araw = sum(tj['pts'][i][0]*tj['pts'][(i+1)%len(T)][1]-tj['pts'][(i+1)%len(T)][0]*tj['pts'][i][1] for i in range(len(T)))/2
print('track.json signed area in (x,z) =', round(Araw))
# also polygon area comparison
def area(P): return abs(sum(P[i][0]*P[(i+1)%len(P)][1]-P[(i+1)%len(P)][0]*P[i][1] for i in range(len(P)))/2)
print('area OSM m2', round(area(pts)), 'area track.json m2', round(area(T)))
txs=[p[0] for p in T]; tys=[p[1] for p in T]
print('track.json bbox', round(max(txs)-min(txs)), round(max(tys)-min(tys)))
# render overlay
from PIL import Image, ImageDraw
W=1400; H=1000
allp = R + [(s*(math.cos(th)*(p[0]-c[2])-math.sin(th)*(p[1]-c[3]))+c[0], s*(math.sin(th)*(p[0]-c[2])+math.cos(th)*(p[1]-c[3]))+c[1]) for p in Qs]
minx=min(p[0] for p in allp); maxx=max(p[0] for p in allp); miny=min(p[1] for p in allp); maxy=max(p[1] for p in allp)
k=min((W-80)/(maxx-minx),(H-80)/(maxy-miny))
def S(p): return (40+(p[0]-minx)*k, H-40-(p[1]-miny)*k)
im=Image.new('RGB',(W,H),'white'); dr=ImageDraw.Draw(im)
dr.line([S(p) for p in pts]+[S(pts[0])], fill=(30,30,30), width=6)
dr.line([S(p) for p in allp[N:]]+[S(allp[N])], fill=(230,50,40), width=3)
dr.text((20,10),'black = OSM real GP loop (north up); red = track.json best similarity fit',fill=(0,0,0))
im.save(out_png)
# unfitted: track.json as-is drawn alone
im2=Image.new('RGB',(W,600),'white'); dr2=ImageDraw.Draw(im2)
mnx=min(txs); mny=min(p[1] for p in tj['pts']); k2=(W-80)/(max(txs)-mnx)
dr2.line([(40+(p[0]-mnx)*k2, 40+(p[1]-mny)*k2) for p in tj['pts']]+[(40+(tj['pts'][0][0]-mnx)*k2, 40+(tj['pts'][0][1]-mny)*k2)], fill=(230,50,40), width=4)
dr2.ellipse([40+(tj['pts'][0][0]-mnx)*k2-8, 40+(tj['pts'][0][1]-mny)*k2-8, 40+(tj['pts'][0][0]-mnx)*k2+8, 40+(tj['pts'][0][1]-mny)*k2+8], fill=(0,0,255))
im2.save(out_png.replace('.png','_trackjson.png'))
