var wl="170";var Ad=0,Ql=1,Cd=2;var hh=1,Tl=2,wn=3,Yn=0,Le=1,ge=2,Hn=0,Yi=1,jl=2,tc=3,ec=4,Rd=5,oi=100,Id=101,Pd=102,Ld=103,Dd=104,Ud=200,Nd=201,Fd=202,Od=203,ia=204,sa=205,Bd=206,zd=207,kd=208,Vd=209,Gd=210,Hd=211,Wd=212,Xd=213,Yd=214,ra=0,oa=1,aa=2,$i=3,la=4,ca=5,ha=6,ua=7,uh=0,qd=1,Zd=2,Wn=0,Jd=1,$d=2,Kd=3,Qd=4,jd=5,El=6,tf=7;var dh=300,Ki=301,Qi=302,da=303,fa=304,ho=306,hi=1e3,li=1001,pa=1002,Xe=1003,ef=1004;var ir=1005;var fn=1006,bo=1007;var ci=1008;var Cn=1009,fh=1010,ph=1011,Ls=1012,Al=1013,ui=1014,pn=1015,Ln=1016,Cl=1017,Rl=1018,ji=1020,mh=35902,gh=1021,_h=1022,an=1023,xh=1024,vh=1025,qi=1026,ts=1027,Il=1028,Pl=1029,yh=1030,Ll=1031;var Dl=1033,Lr=33776,Dr=33777,Ur=33778,Nr=33779,ma=35840,ga=35841,_a=35842,xa=35843,va=36196,ya=37492,Ma=37496,Sa=37808,ba=37809,wa=37810,Ta=37811,Ea=37812,Aa=37813,Ca=37814,Ra=37815,Ia=37816,Pa=37817,La=37818,Da=37819,Ua=37820,Na=37821,Fr=36492,Fa=36494,Oa=36495,Mh=36283,Ba=36284,za=36285,ka=36286;var Or=2300,Va=2301,wo=2302,nc=2400,ic=2401,sc=2402;var nf=3200,sf=3201;var Sh=0,rf=1,Vn="",Me="srgb",cs="srgb-linear",uo="linear",oe="srgb";var Ti=7680;var rc=519,of=512,af=513,lf=514,bh=515,cf=516,hf=517,uf=518,df=519,Ga=35044;var oc="300 es",En=2e3,Br=2001,qn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Re=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ac=1234567,As=Math.PI/180,Ds=180/Math.PI;function mn(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Re[i&255]+Re[i>>8&255]+Re[i>>16&255]+Re[i>>24&255]+"-"+Re[t&255]+Re[t>>8&255]+"-"+Re[t>>16&15|64]+Re[t>>24&255]+"-"+Re[e&63|128]+Re[e>>8&255]+"-"+Re[e>>16&255]+Re[e>>24&255]+Re[n&255]+Re[n>>8&255]+Re[n>>16&255]+Re[n>>24&255]).toLowerCase()}function be(i,t,e){return Math.max(t,Math.min(e,i))}function Ul(i,t){return(i%t+t)%t}function ff(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function pf(i,t,e){return i!==t?(e-i)/(t-i):0}function Cs(i,t,e){return(1-e)*i+e*t}function mf(i,t,e,n){return Cs(i,t,1-Math.exp(-e*n))}function gf(i,t=1){return t-Math.abs(Ul(i,t*2)-t)}function _f(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function xf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function vf(i,t){return i+Math.floor(Math.random()*(t-i+1))}function yf(i,t){return i+Math.random()*(t-i)}function Mf(i){return i*(.5-Math.random())}function Sf(i){i!==void 0&&(ac=i);let t=ac+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function bf(i){return i*As}function wf(i){return i*Ds}function Tf(i){return(i&i-1)===0&&i!==0}function Ef(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Af(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Cf(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),f=o((t-n)/2),d=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*f,a*c);break;case"YZY":i.set(l*f,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*f,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*d,a*c);break;case"YXY":i.set(l*d,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*d,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function on(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function re(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var $s={DEG2RAD:As,RAD2DEG:Ds,generateUUID:mn,clamp:be,euclideanModulo:Ul,mapLinear:ff,inverseLerp:pf,lerp:Cs,damp:mf,pingpong:gf,smoothstep:_f,smootherstep:xf,randInt:vf,randFloat:yf,randFloatSpread:Mf,seededRandom:Sf,degToRad:bf,radToDeg:wf,isPowerOfTwo:Tf,ceilPowerOfTwo:Ef,floorPowerOfTwo:Af,setQuaternionFromProperEuler:Cf,normalize:re,denormalize:on},et=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(be(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Gt=class i{constructor(t,e,n,s,r,o,a,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],_=s[0],m=s[3],p=s[6],y=s[1],v=s[4],x=s[7],L=s[2],E=s[5],C=s[8];return r[0]=o*_+a*y+l*L,r[3]=o*m+a*v+l*E,r[6]=o*p+a*x+l*C,r[1]=c*_+h*y+u*L,r[4]=c*m+h*v+u*E,r[7]=c*p+h*x+u*C,r[2]=f*_+d*y+g*L,r[5]=f*m+d*v+g*E,r[8]=f*p+d*x+g*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,f=a*l-h*r,d=c*r-o*l,g=e*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=u*_,t[1]=(s*c-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=f*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=d*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(To.makeScale(t,e)),this}rotate(t){return this.premultiply(To.makeRotation(-t)),this}translate(t,e){return this.premultiply(To.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},To=new Gt;function wh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Us(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Rf(){let i=Us("canvas");return i.style.display="block",i}var lc={};function Ts(i){i in lc||(lc[i]=!0,console.warn(i))}function If(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Pf(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Lf(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var Qt={enabled:!0,workingColorSpace:cs,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===oe&&(i.r=An(i.r),i.g=An(i.g),i.b=An(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===oe&&(i.r=Zi(i.r),i.g=Zi(i.g),i.b=Zi(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Vn?uo:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function An(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Zi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var cc=[.64,.33,.3,.6,.15,.06],hc=[.2126,.7152,.0722],uc=[.3127,.329],dc=new Gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),fc=new Gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Qt.define({[cs]:{primaries:cc,whitePoint:uc,transfer:uo,toXYZ:dc,fromXYZ:fc,luminanceCoefficients:hc,workingColorSpaceConfig:{unpackColorSpace:Me},outputColorSpaceConfig:{drawingBufferColorSpace:Me}},[Me]:{primaries:cc,whitePoint:uc,transfer:oe,toXYZ:dc,fromXYZ:fc,luminanceCoefficients:hc,outputColorSpaceConfig:{drawingBufferColorSpace:Me}}});var Ei,Ha=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ei===void 0&&(Ei=Us("canvas")),Ei.width=t.width,Ei.height=t.height;let n=Ei.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ei}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Us("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=An(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(An(e[n]/255)*255):e[n]=An(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Df=0,zr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Df++}),this.uuid=mn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Eo(s[o].image)):r.push(Eo(s[o]))}else r=Eo(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Eo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ha.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Uf=0,Fe=class i extends qn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=li,s=li,r=fn,o=ci,a=an,l=Cn,c=i.DEFAULT_ANISOTROPY,h=Vn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Uf++}),this.uuid=mn(),this.name="",this.source=new zr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new et(0,0),this.repeat=new et(1,1),this.center=new et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==dh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case hi:t.x=t.x-Math.floor(t.x);break;case li:t.x=t.x<0?0:1;break;case pa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case hi:t.y=t.y-Math.floor(t.y);break;case li:t.y=t.y<0?0:1;break;case pa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Fe.DEFAULT_IMAGE=null;Fe.DEFAULT_MAPPING=dh;Fe.DEFAULT_ANISOTROPY=1;var ae=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(c+1)/2,x=(d+1)/2,L=(p+1)/2,E=(h+f)/4,C=(u+_)/4,R=(g+m)/4;return v>x&&v>L?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=E/n,r=C/n):x>L?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=E/s,r=R/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=C/r,s=R/r),this.set(n,s,r,e),this}let y=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(u-_)/y,this.z=(f-h)/y,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Wa=class extends qn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ae(0,0,t,e),this.scissorTest=!1,this.viewport=new ae(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new Fe(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new zr(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},$e=class extends Wa{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},kr=class extends Fe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Xa=class extends Fe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ye=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],d=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==f||c!==d||h!==g){let m=1-a,p=l*f+c*d+h*g+u*_,y=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){let L=Math.sqrt(v),E=Math.atan2(L,p*y);m=Math.sin(m*E)/L,a=Math.sin(a*E)/L}let x=a*y;if(l=l*m+f*x,c=c*m+d*x,h=h*m+g*x,u=u*m+_*x,m===1-a){let L=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=L,c*=L,h*=L,u*=L}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*d-c*f,t[e+1]=l*g+h*f+c*u-a*d,t[e+2]=c*g+h*d+a*f-l*u,t[e+3]=h*g-a*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),f=l(n/2),d=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"YZX":this._x=f*h*u+c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u-f*d*g;break;case"XZY":this._x=f*h*u-c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(n>a&&n>u){let d=2*Math.sqrt(1+n-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>u){let d=2*Math.sqrt(1+a-n-u);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(be(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},A=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(pc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(pc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ao.copy(this).projectOnVector(t),this.sub(Ao)}reflect(t){return this.sub(Ao.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(be(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ao=new A,pc=new Ye,Rn=class{constructor(t=new A(1/0,1/0,1/0),e=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(nn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(nn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=nn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,nn):nn.fromBufferAttribute(r,o),nn.applyMatrix4(t.matrixWorld),this.expandByPoint(nn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),sr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),sr.copy(n.boundingBox)),sr.applyMatrix4(t.matrixWorld),this.union(sr)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,nn),nn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ms),rr.subVectors(this.max,ms),Ai.subVectors(t.a,ms),Ci.subVectors(t.b,ms),Ri.subVectors(t.c,ms),Nn.subVectors(Ci,Ai),Fn.subVectors(Ri,Ci),jn.subVectors(Ai,Ri);let e=[0,-Nn.z,Nn.y,0,-Fn.z,Fn.y,0,-jn.z,jn.y,Nn.z,0,-Nn.x,Fn.z,0,-Fn.x,jn.z,0,-jn.x,-Nn.y,Nn.x,0,-Fn.y,Fn.x,0,-jn.y,jn.x,0];return!Co(e,Ai,Ci,Ri,rr)||(e=[1,0,0,0,1,0,0,0,1],!Co(e,Ai,Ci,Ri,rr))?!1:(or.crossVectors(Nn,Fn),e=[or.x,or.y,or.z],Co(e,Ai,Ci,Ri,rr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,nn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(nn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(vn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},vn=[new A,new A,new A,new A,new A,new A,new A,new A],nn=new A,sr=new Rn,Ai=new A,Ci=new A,Ri=new A,Nn=new A,Fn=new A,jn=new A,ms=new A,rr=new A,or=new A,ti=new A;function Co(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ti.fromArray(i,r);let a=s.x*Math.abs(ti.x)+s.y*Math.abs(ti.y)+s.z*Math.abs(ti.z),l=t.dot(ti),c=e.dot(ti),h=n.dot(ti);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Nf=new Rn,gs=new A,Ro=new A,di=class{constructor(t=new A,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Nf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;gs.subVectors(t,this.center);let e=gs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(gs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ro.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(gs.copy(t.center).add(Ro)),this.expandByPoint(gs.copy(t.center).sub(Ro))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},yn=new A,Io=new A,ar=new A,On=new A,Po=new A,lr=new A,Lo=new A,Ya=class{constructor(t=new A,e=new A(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,yn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=yn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(yn.copy(this.origin).addScaledVector(this.direction,e),yn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Io.copy(t).add(e).multiplyScalar(.5),ar.copy(e).sub(t).normalize(),On.copy(this.origin).sub(Io);let r=t.distanceTo(e)*.5,o=-this.direction.dot(ar),a=On.dot(this.direction),l=-On.dot(ar),c=On.lengthSq(),h=Math.abs(1-o*o),u,f,d,g;if(h>0)if(u=o*l-a,f=o*a-l,g=r*h,u>=0)if(f>=-g)if(f<=g){let _=1/h;u*=_,f*=_,d=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Io).addScaledVector(ar,f),d}intersectSphere(t,e){yn.subVectors(t.center,this.origin);let n=yn.dot(this.direction),s=yn.dot(yn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,yn)!==null}intersectTriangle(t,e,n,s,r){Po.subVectors(e,t),lr.subVectors(n,t),Lo.crossVectors(Po,lr);let o=this.direction.dot(Lo),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;On.subVectors(this.origin,t);let l=a*this.direction.dot(lr.crossVectors(On,lr));if(l<0)return null;let c=a*this.direction.dot(Po.cross(On));if(c<0||l+c>o)return null;let h=-a*On.dot(Lo);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Xt=class i{constructor(t,e,n,s,r,o,a,l,c,h,u,f,d,g,_,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,f,d,g,_,m)}set(t,e,n,s,r,o,a,l,c,h,u,f,d,g,_,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Ii.setFromMatrixColumn(t,0).length(),r=1/Ii.setFromMatrixColumn(t,1).length(),o=1/Ii.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=o*h,d=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+g*c,e[5]=f-_*c,e[9]=-a*l,e[2]=_-f*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){let f=l*h,d=l*u,g=c*h,_=c*u;e[0]=f+_*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=_+f*a,e[10]=o*l}else if(t.order==="ZXY"){let f=l*h,d=l*u,g=c*h,_=c*u;e[0]=f-_*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=_-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let f=o*h,d=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=g*c-d,e[8]=f*c+_,e[1]=l*u,e[5]=_*c+f,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let f=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-f*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*u+g,e[10]=f-_*u}else if(t.order==="XZY"){let f=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+_,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ff,t,Of)}lookAt(t,e,n){let s=this.elements;return He.subVectors(t,e),He.lengthSq()===0&&(He.z=1),He.normalize(),Bn.crossVectors(n,He),Bn.lengthSq()===0&&(Math.abs(n.z)===1?He.x+=1e-4:He.z+=1e-4,He.normalize(),Bn.crossVectors(n,He)),Bn.normalize(),cr.crossVectors(He,Bn),s[0]=Bn.x,s[4]=cr.x,s[8]=He.x,s[1]=Bn.y,s[5]=cr.y,s[9]=He.y,s[2]=Bn.z,s[6]=cr.z,s[10]=He.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],y=n[3],v=n[7],x=n[11],L=n[15],E=s[0],C=s[4],R=s[8],b=s[12],M=s[1],P=s[5],B=s[9],F=s[13],O=s[2],Y=s[6],k=s[10],nt=s[14],H=s[3],at=s[7],pt=s[11],yt=s[15];return r[0]=o*E+a*M+l*O+c*H,r[4]=o*C+a*P+l*Y+c*at,r[8]=o*R+a*B+l*k+c*pt,r[12]=o*b+a*F+l*nt+c*yt,r[1]=h*E+u*M+f*O+d*H,r[5]=h*C+u*P+f*Y+d*at,r[9]=h*R+u*B+f*k+d*pt,r[13]=h*b+u*F+f*nt+d*yt,r[2]=g*E+_*M+m*O+p*H,r[6]=g*C+_*P+m*Y+p*at,r[10]=g*R+_*B+m*k+p*pt,r[14]=g*b+_*F+m*nt+p*yt,r[3]=y*E+v*M+x*O+L*H,r[7]=y*C+v*P+x*Y+L*at,r[11]=y*R+v*B+x*k+L*pt,r[15]=y*b+v*F+x*nt+L*yt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*l*u-s*c*u-r*a*f+n*c*f+s*a*d-n*l*d)+_*(+e*l*d-e*c*f+r*o*f-s*o*d+s*c*h-r*l*h)+m*(+e*c*u-e*a*d-r*o*u+n*o*d+r*a*h-n*c*h)+p*(-s*a*h-e*l*u+e*a*f+s*o*u-n*o*f+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],y=u*m*c-_*f*c+_*l*d-a*m*d-u*l*p+a*f*p,v=g*f*c-h*m*c-g*l*d+o*m*d+h*l*p-o*f*p,x=h*_*c-g*u*c+g*a*d-o*_*d-h*a*p+o*u*p,L=g*u*l-h*_*l-g*a*f+o*_*f+h*a*m-o*u*m,E=e*y+n*v+s*x+r*L;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/E;return t[0]=y*C,t[1]=(_*f*r-u*m*r-_*s*d+n*m*d+u*s*p-n*f*p)*C,t[2]=(a*m*r-_*l*r+_*s*c-n*m*c-a*s*p+n*l*p)*C,t[3]=(u*l*r-a*f*r-u*s*c+n*f*c+a*s*d-n*l*d)*C,t[4]=v*C,t[5]=(h*m*r-g*f*r+g*s*d-e*m*d-h*s*p+e*f*p)*C,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*p-e*l*p)*C,t[7]=(o*f*r-h*l*r+h*s*c-e*f*c-o*s*d+e*l*d)*C,t[8]=x*C,t[9]=(g*u*r-h*_*r-g*n*d+e*_*d+h*n*p-e*u*p)*C,t[10]=(o*_*r-g*a*r+g*n*c-e*_*c-o*n*p+e*a*p)*C,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*d-e*a*d)*C,t[12]=L*C,t[13]=(h*_*s-g*u*s+g*n*f-e*_*f-h*n*m+e*u*m)*C,t[14]=(g*a*s-o*_*s-g*n*l+e*_*l+o*n*m-e*a*m)*C,t[15]=(o*u*s-h*a*s+h*n*l-e*u*l-o*n*f+e*a*f)*C,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,f=r*c,d=r*h,g=r*u,_=o*h,m=o*u,p=a*u,y=l*c,v=l*h,x=l*u,L=n.x,E=n.y,C=n.z;return s[0]=(1-(_+p))*L,s[1]=(d+x)*L,s[2]=(g-v)*L,s[3]=0,s[4]=(d-x)*E,s[5]=(1-(f+p))*E,s[6]=(m+y)*E,s[7]=0,s[8]=(g+v)*C,s[9]=(m-y)*C,s[10]=(1-(f+_))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Ii.set(s[0],s[1],s[2]).length(),o=Ii.set(s[4],s[5],s[6]).length(),a=Ii.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],sn.copy(this);let c=1/r,h=1/o,u=1/a;return sn.elements[0]*=c,sn.elements[1]*=c,sn.elements[2]*=c,sn.elements[4]*=h,sn.elements[5]*=h,sn.elements[6]*=h,sn.elements[8]*=u,sn.elements[9]*=u,sn.elements[10]*=u,e.setFromRotationMatrix(sn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=En){let l=this.elements,c=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s),d,g;if(a===En)d=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Br)d=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=En){let l=this.elements,c=1/(e-t),h=1/(n-s),u=1/(o-r),f=(e+t)*c,d=(n+s)*h,g,_;if(a===En)g=(o+r)*u,_=-2*u;else if(a===Br)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Ii=new A,sn=new Xt,Ff=new A(0,0,0),Of=new A(1,1,1),Bn=new A,cr=new A,He=new A,mc=new Xt,gc=new Ye,Oe=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(be(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-be(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(be(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-be(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(be(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-be(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return mc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(mc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return gc.setFromEuler(this),this.setFromQuaternion(gc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Oe.DEFAULT_ORDER="XYZ";var Vr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Bf=0,_c=new A,Pi=new Ye,Mn=new Xt,hr=new A,_s=new A,zf=new A,kf=new Ye,xc=new A(1,0,0),vc=new A(0,1,0),yc=new A(0,0,1),Mc={type:"added"},Vf={type:"removed"},Li={type:"childadded",child:null},Do={type:"childremoved",child:null},De=class i extends qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Bf++}),this.uuid=mn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new A,e=new Oe,n=new Ye,s=new A(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Xt},normalMatrix:{value:new Gt}}),this.matrix=new Xt,this.matrixWorld=new Xt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Pi.setFromAxisAngle(t,e),this.quaternion.multiply(Pi),this}rotateOnWorldAxis(t,e){return Pi.setFromAxisAngle(t,e),this.quaternion.premultiply(Pi),this}rotateX(t){return this.rotateOnAxis(xc,t)}rotateY(t){return this.rotateOnAxis(vc,t)}rotateZ(t){return this.rotateOnAxis(yc,t)}translateOnAxis(t,e){return _c.copy(t).applyQuaternion(this.quaternion),this.position.add(_c.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(xc,t)}translateY(t){return this.translateOnAxis(vc,t)}translateZ(t){return this.translateOnAxis(yc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Mn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?hr.copy(t):hr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),_s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Mn.lookAt(_s,hr,this.up):Mn.lookAt(hr,_s,this.up),this.quaternion.setFromRotationMatrix(Mn),s&&(Mn.extractRotation(s.matrixWorld),Pi.setFromRotationMatrix(Mn),this.quaternion.premultiply(Pi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Mc),Li.child=t,this.dispatchEvent(Li),Li.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Vf),Do.child=t,this.dispatchEvent(Do),Do.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Mn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Mn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Mn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Mc),Li.child=t,this.dispatchEvent(Li),Li.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,t,zf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,kf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};De.DEFAULT_UP=new A(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var rn=new A,Sn=new A,Uo=new A,bn=new A,Di=new A,Ui=new A,Sc=new A,No=new A,Fo=new A,Oo=new A,Bo=new ae,zo=new ae,ko=new ae,Gn=class i{constructor(t=new A,e=new A,n=new A){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),rn.subVectors(t,e),s.cross(rn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){rn.subVectors(s,e),Sn.subVectors(n,e),Uo.subVectors(t,e);let o=rn.dot(rn),a=rn.dot(Sn),l=rn.dot(Uo),c=Sn.dot(Sn),h=Sn.dot(Uo),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(c*l-a*h)*f,g=(o*h-a*l)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,bn)===null?!1:bn.x>=0&&bn.y>=0&&bn.x+bn.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,bn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,bn.x),l.addScaledVector(o,bn.y),l.addScaledVector(a,bn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return Bo.setScalar(0),zo.setScalar(0),ko.setScalar(0),Bo.fromBufferAttribute(t,e),zo.fromBufferAttribute(t,n),ko.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Bo,r.x),o.addScaledVector(zo,r.y),o.addScaledVector(ko,r.z),o}static isFrontFacing(t,e,n,s){return rn.subVectors(n,e),Sn.subVectors(t,e),rn.cross(Sn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return rn.subVectors(this.c,this.b),Sn.subVectors(this.a,this.b),rn.cross(Sn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;Di.subVectors(s,n),Ui.subVectors(r,n),No.subVectors(t,n);let l=Di.dot(No),c=Ui.dot(No);if(l<=0&&c<=0)return e.copy(n);Fo.subVectors(t,s);let h=Di.dot(Fo),u=Ui.dot(Fo);if(h>=0&&u<=h)return e.copy(s);let f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Di,o);Oo.subVectors(t,r);let d=Di.dot(Oo),g=Ui.dot(Oo);if(g>=0&&d<=g)return e.copy(r);let _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Ui,a);let m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return Sc.subVectors(r,s),a=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(Sc,a);let p=1/(m+_+f);return o=_*p,a=f*p,e.copy(n).addScaledVector(Di,o).addScaledVector(Ui,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Th={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},ur={h:0,s:0,l:0};function Vo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Pt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Me){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Qt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Qt.workingColorSpace){if(t=Ul(t,1),e=be(e,0,1),n=be(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Vo(o,r,t+1/3),this.g=Vo(o,r,t),this.b=Vo(o,r,t-1/3)}return Qt.toWorkingColorSpace(this,s),this}setStyle(t,e=Me){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Me){let n=Th[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=An(t.r),this.g=An(t.g),this.b=An(t.b),this}copyLinearToSRGB(t){return this.r=Zi(t.r),this.g=Zi(t.g),this.b=Zi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Me){return Qt.fromWorkingColorSpace(Ie.copy(this),t),Math.round(be(Ie.r*255,0,255))*65536+Math.round(be(Ie.g*255,0,255))*256+Math.round(be(Ie.b*255,0,255))}getHexString(t=Me){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.fromWorkingColorSpace(Ie.copy(this),e);let n=Ie.r,s=Ie.g,r=Ie.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Qt.workingColorSpace){return Qt.fromWorkingColorSpace(Ie.copy(this),e),t.r=Ie.r,t.g=Ie.g,t.b=Ie.b,t}getStyle(t=Me){Qt.fromWorkingColorSpace(Ie.copy(this),t);let e=Ie.r,n=Ie.g,s=Ie.b;return t!==Me?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(zn),this.setHSL(zn.h+t,zn.s+e,zn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(zn),t.getHSL(ur);let n=Cs(zn.h,ur.h,e),s=Cs(zn.s,ur.s,e),r=Cs(zn.l,ur.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ie=new Pt;Pt.NAMES=Th;var Gf=0,Zn=class extends qn{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Gf++}),this.uuid=mn(),this.name="",this.blending=Yi,this.side=Yn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ia,this.blendDst=sa,this.blendEquation=oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pt(0,0,0),this.blendAlpha=0,this.depthFunc=$i,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ti,this.stencilZFail=Ti,this.stencilZPass=Ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Yi&&(n.blending=this.blending),this.side!==Yn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ia&&(n.blendSrc=this.blendSrc),this.blendDst!==sa&&(n.blendDst=this.blendDst),this.blendEquation!==oi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==$i&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==rc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ti&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ti&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ti&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},le=class extends Zn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Oe,this.combine=uh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var ye=new A,dr=new et,Ae=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ga,this.updateRanges=[],this.gpuType=pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)dr.fromBufferAttribute(this,e),dr.applyMatrix3(t),this.setXY(e,dr.x,dr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix3(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=on(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=on(e,this.array)),e}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=on(e,this.array)),e}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=on(e,this.array)),e}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=on(e,this.array)),e}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array),r=re(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ga&&(t.usage=this.usage),t}};var Gr=class extends Ae{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Hr=class extends Ae{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Ot=class extends Ae{constructor(t,e,n){super(new Float32Array(t),e,n)}},Hf=0,Je=new Xt,Go=new De,Ni=new A,We=new Rn,xs=new Rn,Ee=new A,fe=class i extends qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Hf++}),this.uuid=mn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(wh(t)?Hr:Gr)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Gt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Je.makeRotationFromQuaternion(t),this.applyMatrix4(Je),this}rotateX(t){return Je.makeRotationX(t),this.applyMatrix4(Je),this}rotateY(t){return Je.makeRotationY(t),this.applyMatrix4(Je),this}rotateZ(t){return Je.makeRotationZ(t),this.applyMatrix4(Je),this}translate(t,e,n){return Je.makeTranslation(t,e,n),this.applyMatrix4(Je),this}scale(t,e,n){return Je.makeScale(t,e,n),this.applyMatrix4(Je),this}lookAt(t){return Go.lookAt(t),Go.updateMatrix(),this.applyMatrix4(Go.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ni).negate(),this.translate(Ni.x,Ni.y,Ni.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ot(n,3))}else{for(let n=0,s=e.count;n<s;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];We.setFromBufferAttribute(r),this.morphTargetsRelative?(Ee.addVectors(this.boundingBox.min,We.min),this.boundingBox.expandByPoint(Ee),Ee.addVectors(this.boundingBox.max,We.max),this.boundingBox.expandByPoint(Ee)):(this.boundingBox.expandByPoint(We.min),this.boundingBox.expandByPoint(We.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new di);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(t){let n=this.boundingSphere.center;if(We.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];xs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ee.addVectors(We.min,xs.min),We.expandByPoint(Ee),Ee.addVectors(We.max,xs.max),We.expandByPoint(Ee)):(We.expandByPoint(xs.min),We.expandByPoint(xs.max))}We.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ee.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ee));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ee.fromBufferAttribute(a,c),l&&(Ni.fromBufferAttribute(t,c),Ee.add(Ni)),s=Math.max(s,n.distanceToSquared(Ee))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ae(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new A,l[R]=new A;let c=new A,h=new A,u=new A,f=new et,d=new et,g=new et,_=new A,m=new A;function p(R,b,M){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,M),f.fromBufferAttribute(r,R),d.fromBufferAttribute(r,b),g.fromBufferAttribute(r,M),h.sub(c),u.sub(c),d.sub(f),g.sub(f);let P=1/(d.x*g.y-g.x*d.y);isFinite(P)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(P),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(P),a[R].add(_),a[b].add(_),a[M].add(_),l[R].add(m),l[b].add(m),l[M].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let R=0,b=y.length;R<b;++R){let M=y[R],P=M.start,B=M.count;for(let F=P,O=P+B;F<O;F+=3)p(t.getX(F+0),t.getX(F+1),t.getX(F+2))}let v=new A,x=new A,L=new A,E=new A;function C(R){L.fromBufferAttribute(s,R),E.copy(L);let b=a[R];v.copy(b),v.sub(L.multiplyScalar(L.dot(b))).normalize(),x.crossVectors(E,b);let P=x.dot(l[R])<0?-1:1;o.setXYZW(R,v.x,v.y,v.z,P)}for(let R=0,b=y.length;R<b;++R){let M=y[R],P=M.start,B=M.count;for(let F=P,O=P+B;F<O;F+=3)C(t.getX(F+0)),C(t.getX(F+1)),C(t.getX(F+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ae(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new A,r=new A,o=new A,a=new A,l=new A,c=new A,h=new A,u=new A;if(t)for(let f=0,d=t.count;f<d;f+=3){let g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ee.fromBufferAttribute(t,e),Ee.normalize(),t.setXYZ(e,Ee.x,Ee.y,Ee.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h),d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*h;for(let p=0;p<h;p++)f[g++]=c[d++]}return new Ae(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){let d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},bc=new Xt,ei=new Ya,fr=new di,wc=new A,pr=new A,mr=new A,gr=new A,Ho=new A,_r=new A,Tc=new A,xr=new A,j=class extends De{constructor(t=new fe,e=new le){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){_r.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(Ho.fromBufferAttribute(u,t),o?_r.addScaledVector(Ho,h):_r.addScaledVector(Ho.sub(e),h))}e.add(_r)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),fr.copy(n.boundingSphere),fr.applyMatrix4(r),ei.copy(t.ray).recast(t.near),!(fr.containsPoint(ei.origin)===!1&&(ei.intersectSphere(fr,wc)===null||ei.origin.distanceToSquared(wc)>(t.far-t.near)**2))&&(bc.copy(r).invert(),ei.copy(t.ray).applyMatrix4(bc),!(n.boundingBox!==null&&ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ei)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){let m=f[g],p=o[m.materialIndex],y=Math.max(m.start,d.start),v=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let x=y,L=v;x<L;x+=3){let E=a.getX(x),C=a.getX(x+1),R=a.getX(x+2);s=vr(this,p,t,n,c,h,u,E,C,R),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let y=a.getX(m),v=a.getX(m+1),x=a.getX(m+2);s=vr(this,o,t,n,c,h,u,y,v,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){let m=f[g],p=o[m.materialIndex],y=Math.max(m.start,d.start),v=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let x=y,L=v;x<L;x+=3){let E=x,C=x+1,R=x+2;s=vr(this,p,t,n,c,h,u,E,C,R),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let y=m,v=m+1,x=m+2;s=vr(this,o,t,n,c,h,u,y,v,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Wf(i,t,e,n,s,r,o,a){let l;if(t.side===Le?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Yn,a),l===null)return null;xr.copy(a),xr.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(xr);return c<e.near||c>e.far?null:{distance:c,point:xr.clone(),object:i}}function vr(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,pr),i.getVertexPosition(l,mr),i.getVertexPosition(c,gr);let h=Wf(i,t,e,n,pr,mr,gr,Tc);if(h){let u=new A;Gn.getBarycoord(Tc,pr,mr,gr,u),s&&(h.uv=Gn.getInterpolatedAttribute(s,a,l,c,u,new et)),r&&(h.uv1=Gn.getInterpolatedAttribute(r,a,l,c,u,new et)),o&&(h.normal=Gn.getInterpolatedAttribute(o,a,l,c,u,new A),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:l,c,normal:new A,materialIndex:0};Gn.getNormal(pr,mr,gr,f.normal),h.face=f,h.barycoord=u}return h}var pe=class i extends fe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Ot(c,3)),this.setAttribute("normal",new Ot(h,3)),this.setAttribute("uv",new Ot(u,2));function g(_,m,p,y,v,x,L,E,C,R,b){let M=x/C,P=L/R,B=x/2,F=L/2,O=E/2,Y=C+1,k=R+1,nt=0,H=0,at=new A;for(let pt=0;pt<k;pt++){let yt=pt*P-F;for(let Dt=0;Dt<Y;Dt++){let Jt=Dt*M-B;at[_]=Jt*y,at[m]=yt*v,at[p]=O,c.push(at.x,at.y,at.z),at[_]=0,at[m]=0,at[p]=E>0?1:-1,h.push(at.x,at.y,at.z),u.push(Dt/C),u.push(1-pt/R),nt+=1}}for(let pt=0;pt<R;pt++)for(let yt=0;yt<C;yt++){let Dt=f+yt+Y*pt,Jt=f+yt+Y*(pt+1),X=f+(yt+1)+Y*(pt+1),J=f+(yt+1)+Y*pt;l.push(Dt,Jt,J),l.push(Jt,X,J),H+=6}a.addGroup(d,H,b),d+=H,f+=nt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function es(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ne(i){let t={};for(let e=0;e<i.length;e++){let n=es(i[e]);for(let s in n)t[s]=n[s]}return t}function Xf(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Eh(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}var Yf={clone:es,merge:Ne},qf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ve=class extends Zn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qf,this.fragmentShader=Zf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=es(t.uniforms),this.uniformsGroups=Xf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Wr=class extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Xt,this.projectionMatrix=new Xt,this.projectionMatrixInverse=new Xt,this.coordinateSystem=En}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},kn=new A,Ec=new et,Ac=new et,Pe=class extends Wr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ds*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(As*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ds*2*Math.atan(Math.tan(As*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(kn.x,kn.y).multiplyScalar(-t/kn.z),kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(kn.x,kn.y).multiplyScalar(-t/kn.z)}getViewSize(t,e){return this.getViewBounds(t,Ec,Ac),e.subVectors(Ac,Ec)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(As*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Fi=-90,Oi=1,Ns=class extends De{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Pe(Fi,Oi,t,e);s.layers=this.layers,this.add(s);let r=new Pe(Fi,Oi,t,e);r.layers=this.layers,this.add(r);let o=new Pe(Fi,Oi,t,e);o.layers=this.layers,this.add(o);let a=new Pe(Fi,Oi,t,e);a.layers=this.layers,this.add(a);let l=new Pe(Fi,Oi,t,e);l.layers=this.layers,this.add(l);let c=new Pe(Fi,Oi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===En)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Br)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Xr=class extends Fe{constructor(t,e,n,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Ki,super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Fs=class extends $e{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Xr(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:fn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new pe(5,5,5),r=new Ve({name:"CubemapFromEquirect",uniforms:es(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Le,blending:Hn});r.uniforms.tEquirect.value=e;let o=new j(s,r),a=e.minFilter;return e.minFilter===ci&&(e.minFilter=fn),new Ns(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Wo=new A,Jf=new A,$f=new Gt,Tn=class{constructor(t=new A(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Wo.subVectors(n,e).cross(Jf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Wo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||$f.getNormalMatrix(t),s=this.coplanarPoint(Wo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},ni=new di,yr=new A,Os=class{constructor(t=new Tn,e=new Tn,n=new Tn,s=new Tn,r=new Tn,o=new Tn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=En){let n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],f=s[7],d=s[8],g=s[9],_=s[10],m=s[11],p=s[12],y=s[13],v=s[14],x=s[15];if(n[0].setComponents(l-r,f-c,m-d,x-p).normalize(),n[1].setComponents(l+r,f+c,m+d,x+p).normalize(),n[2].setComponents(l+o,f+h,m+g,x+y).normalize(),n[3].setComponents(l-o,f-h,m-g,x-y).normalize(),n[4].setComponents(l-a,f-u,m-_,x-v).normalize(),e===En)n[5].setComponents(l+a,f+u,m+_,x+v).normalize();else if(e===Br)n[5].setComponents(a,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ni.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ni.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ni)}intersectsSprite(t){return ni.center.set(0,0,0),ni.radius=.7071067811865476,ni.applyMatrix4(t.matrixWorld),this.intersectsSphere(ni)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(yr.x=s.normal.x>0?t.max.x:t.min.x,yr.y=s.normal.y>0?t.max.y:t.min.y,yr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(yr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Ah(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Kf(i){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){let g=u[f],_=u[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){let _=u[d];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var ie=class i extends fe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,f=e/l,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){let y=p*f-o;for(let v=0;v<c;v++){let x=v*u-r;g.push(x,-y,0),_.push(0,0,1),m.push(v/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){let v=y+c*p,x=y+c*(p+1),L=y+1+c*(p+1),E=y+1+c*p;d.push(v,x,E),d.push(x,L,E)}this.setIndex(d),this.setAttribute("position",new Ot(g,3)),this.setAttribute("normal",new Ot(_,3)),this.setAttribute("uv",new Ot(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},Qf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,jf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,tp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ep=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,np=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ip=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,rp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,op=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ap=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,lp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,cp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,up=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,dp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,fp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,pp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,mp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_p=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,xp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,vp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,yp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Mp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Sp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,bp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,wp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Tp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ep=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ap=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Cp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Rp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ip=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Pp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Lp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Dp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Up=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Np=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Fp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Op=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Bp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,zp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,kp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Hp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Wp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Xp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Yp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,qp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Zp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Jp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,$p=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Kp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Qp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,jp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,em=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,im=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,sm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,rm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,om=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,am=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,hm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,um=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,dm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,pm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,gm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,_m=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ym=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Mm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Sm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Tm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Em=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Am=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Cm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Rm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Im=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Pm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Lm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Dm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Um=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Nm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Fm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Om=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Bm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,zm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,km=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Vm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Gm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Hm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Wm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Xm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ym=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,qm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Zm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Jm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,$m=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Km=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Qm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,t0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,e0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,n0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,i0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,s0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,r0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,o0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,a0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,l0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,c0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,h0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,u0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,d0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,f0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,p0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,m0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,g0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,x0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,v0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,y0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,M0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,S0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,b0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,w0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,T0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,E0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,A0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,C0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,R0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,I0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Wt={alphahash_fragment:Qf,alphahash_pars_fragment:jf,alphamap_fragment:tp,alphamap_pars_fragment:ep,alphatest_fragment:np,alphatest_pars_fragment:ip,aomap_fragment:sp,aomap_pars_fragment:rp,batching_pars_vertex:op,batching_vertex:ap,begin_vertex:lp,beginnormal_vertex:cp,bsdfs:hp,iridescence_fragment:up,bumpmap_pars_fragment:dp,clipping_planes_fragment:fp,clipping_planes_pars_fragment:pp,clipping_planes_pars_vertex:mp,clipping_planes_vertex:gp,color_fragment:_p,color_pars_fragment:xp,color_pars_vertex:vp,color_vertex:yp,common:Mp,cube_uv_reflection_fragment:Sp,defaultnormal_vertex:bp,displacementmap_pars_vertex:wp,displacementmap_vertex:Tp,emissivemap_fragment:Ep,emissivemap_pars_fragment:Ap,colorspace_fragment:Cp,colorspace_pars_fragment:Rp,envmap_fragment:Ip,envmap_common_pars_fragment:Pp,envmap_pars_fragment:Lp,envmap_pars_vertex:Dp,envmap_physical_pars_fragment:Wp,envmap_vertex:Up,fog_vertex:Np,fog_pars_vertex:Fp,fog_fragment:Op,fog_pars_fragment:Bp,gradientmap_pars_fragment:zp,lightmap_pars_fragment:kp,lights_lambert_fragment:Vp,lights_lambert_pars_fragment:Gp,lights_pars_begin:Hp,lights_toon_fragment:Xp,lights_toon_pars_fragment:Yp,lights_phong_fragment:qp,lights_phong_pars_fragment:Zp,lights_physical_fragment:Jp,lights_physical_pars_fragment:$p,lights_fragment_begin:Kp,lights_fragment_maps:Qp,lights_fragment_end:jp,logdepthbuf_fragment:tm,logdepthbuf_pars_fragment:em,logdepthbuf_pars_vertex:nm,logdepthbuf_vertex:im,map_fragment:sm,map_pars_fragment:rm,map_particle_fragment:om,map_particle_pars_fragment:am,metalnessmap_fragment:lm,metalnessmap_pars_fragment:cm,morphinstance_vertex:hm,morphcolor_vertex:um,morphnormal_vertex:dm,morphtarget_pars_vertex:fm,morphtarget_vertex:pm,normal_fragment_begin:mm,normal_fragment_maps:gm,normal_pars_fragment:_m,normal_pars_vertex:xm,normal_vertex:vm,normalmap_pars_fragment:ym,clearcoat_normal_fragment_begin:Mm,clearcoat_normal_fragment_maps:Sm,clearcoat_pars_fragment:bm,iridescence_pars_fragment:wm,opaque_fragment:Tm,packing:Em,premultiplied_alpha_fragment:Am,project_vertex:Cm,dithering_fragment:Rm,dithering_pars_fragment:Im,roughnessmap_fragment:Pm,roughnessmap_pars_fragment:Lm,shadowmap_pars_fragment:Dm,shadowmap_pars_vertex:Um,shadowmap_vertex:Nm,shadowmask_pars_fragment:Fm,skinbase_vertex:Om,skinning_pars_vertex:Bm,skinning_vertex:zm,skinnormal_vertex:km,specularmap_fragment:Vm,specularmap_pars_fragment:Gm,tonemapping_fragment:Hm,tonemapping_pars_fragment:Wm,transmission_fragment:Xm,transmission_pars_fragment:Ym,uv_pars_fragment:qm,uv_pars_vertex:Zm,uv_vertex:Jm,worldpos_vertex:$m,background_vert:Km,background_frag:Qm,backgroundCube_vert:jm,backgroundCube_frag:t0,cube_vert:e0,cube_frag:n0,depth_vert:i0,depth_frag:s0,distanceRGBA_vert:r0,distanceRGBA_frag:o0,equirect_vert:a0,equirect_frag:l0,linedashed_vert:c0,linedashed_frag:h0,meshbasic_vert:u0,meshbasic_frag:d0,meshlambert_vert:f0,meshlambert_frag:p0,meshmatcap_vert:m0,meshmatcap_frag:g0,meshnormal_vert:_0,meshnormal_frag:x0,meshphong_vert:v0,meshphong_frag:y0,meshphysical_vert:M0,meshphysical_frag:S0,meshtoon_vert:b0,meshtoon_frag:w0,points_vert:T0,points_frag:E0,shadow_vert:A0,shadow_frag:C0,sprite_vert:R0,sprite_frag:I0},ct={common:{diffuse:{value:new Pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new Pt(16777215)},opacity:{value:1},center:{value:new et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},dn={basic:{uniforms:Ne([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:Ne([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Pt(0)}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:Ne([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Pt(0)},specular:{value:new Pt(1118481)},shininess:{value:30}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:Ne([ct.common,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new Pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:Ne([ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new Pt(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:Ne([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:Ne([ct.points,ct.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:Ne([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:Ne([ct.common,ct.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:Ne([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:Ne([ct.sprite,ct.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distanceRGBA:{uniforms:Ne([ct.common,ct.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distanceRGBA_vert,fragmentShader:Wt.distanceRGBA_frag},shadow:{uniforms:Ne([ct.lights,ct.fog,{color:{value:new Pt(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};dn.physical={uniforms:Ne([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new Pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new Pt(0)},specularColor:{value:new Pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};var Mr={r:0,b:0,g:0},ii=new Oe,P0=new Xt;function L0(i,t,e,n,s,r,o){let a=new Pt(0),l=r===!0?0:1,c,h,u=null,f=0,d=null;function g(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?e:t).get(v)),v}function _(y){let v=!1,x=g(y);x===null?p(a,l):x&&x.isColor&&(p(x,1),v=!0);let L=i.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(y,v){let x=g(v);x&&(x.isCubeTexture||x.mapping===ho)?(h===void 0&&(h=new j(new pe(1,1,1),new Ve({name:"BackgroundCubeMaterial",uniforms:es(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:Le,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ii.copy(v.backgroundRotation),ii.x*=-1,ii.y*=-1,ii.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(P0.makeRotationFromEuler(ii)),h.material.toneMapped=Qt.getTransfer(x.colorSpace)!==oe,(u!==x||f!==x.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=x,f=x.version,d=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new j(new ie(2,2),new Ve({name:"BackgroundMaterial",uniforms:es(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Qt.getTransfer(x.colorSpace)!==oe,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=x,f=x.version,d=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,v){y.getRGB(Mr,Eh(i)),n.buffers.color.setClear(Mr.r,Mr.g,Mr.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(y,v=1){a.set(y),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:_,addToRenderList:m}}function D0(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(M,P,B,F,O){let Y=!1,k=u(F,B,P);r!==k&&(r=k,c(r.object)),Y=d(M,F,B,O),Y&&g(M,F,B,O),O!==null&&t.update(O,i.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,x(M,P,B,F),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,P,B){let F=B.wireframe===!0,O=n[M.id];O===void 0&&(O={},n[M.id]=O);let Y=O[P.id];Y===void 0&&(Y={},O[P.id]=Y);let k=Y[F];return k===void 0&&(k=f(l()),Y[F]=k),k}function f(M){let P=[],B=[],F=[];for(let O=0;O<e;O++)P[O]=0,B[O]=0,F[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:B,attributeDivisors:F,object:M,attributes:{},index:null}}function d(M,P,B,F){let O=r.attributes,Y=P.attributes,k=0,nt=B.getAttributes();for(let H in nt)if(nt[H].location>=0){let pt=O[H],yt=Y[H];if(yt===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(yt=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(yt=M.instanceColor)),pt===void 0||pt.attribute!==yt||yt&&pt.data!==yt.data)return!0;k++}return r.attributesNum!==k||r.index!==F}function g(M,P,B,F){let O={},Y=P.attributes,k=0,nt=B.getAttributes();for(let H in nt)if(nt[H].location>=0){let pt=Y[H];pt===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(pt=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(pt=M.instanceColor));let yt={};yt.attribute=pt,pt&&pt.data&&(yt.data=pt.data),O[H]=yt,k++}r.attributes=O,r.attributesNum=k,r.index=F}function _(){let M=r.newAttributes;for(let P=0,B=M.length;P<B;P++)M[P]=0}function m(M){p(M,0)}function p(M,P){let B=r.newAttributes,F=r.enabledAttributes,O=r.attributeDivisors;B[M]=1,F[M]===0&&(i.enableVertexAttribArray(M),F[M]=1),O[M]!==P&&(i.vertexAttribDivisor(M,P),O[M]=P)}function y(){let M=r.newAttributes,P=r.enabledAttributes;for(let B=0,F=P.length;B<F;B++)P[B]!==M[B]&&(i.disableVertexAttribArray(B),P[B]=0)}function v(M,P,B,F,O,Y,k){k===!0?i.vertexAttribIPointer(M,P,B,O,Y):i.vertexAttribPointer(M,P,B,F,O,Y)}function x(M,P,B,F){_();let O=F.attributes,Y=B.getAttributes(),k=P.defaultAttributeValues;for(let nt in Y){let H=Y[nt];if(H.location>=0){let at=O[nt];if(at===void 0&&(nt==="instanceMatrix"&&M.instanceMatrix&&(at=M.instanceMatrix),nt==="instanceColor"&&M.instanceColor&&(at=M.instanceColor)),at!==void 0){let pt=at.normalized,yt=at.itemSize,Dt=t.get(at);if(Dt===void 0)continue;let Jt=Dt.buffer,X=Dt.type,J=Dt.bytesPerElement,ut=X===i.INT||X===i.UNSIGNED_INT||at.gpuType===Al;if(at.isInterleavedBufferAttribute){let tt=at.data,wt=tt.stride,Ut=at.offset;if(tt.isInstancedInterleavedBuffer){for(let Lt=0;Lt<H.locationSize;Lt++)p(H.location+Lt,tt.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let Lt=0;Lt<H.locationSize;Lt++)m(H.location+Lt);i.bindBuffer(i.ARRAY_BUFFER,Jt);for(let Lt=0;Lt<H.locationSize;Lt++)v(H.location+Lt,yt/H.locationSize,X,pt,wt*J,(Ut+yt/H.locationSize*Lt)*J,ut)}else{if(at.isInstancedBufferAttribute){for(let tt=0;tt<H.locationSize;tt++)p(H.location+tt,at.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let tt=0;tt<H.locationSize;tt++)m(H.location+tt);i.bindBuffer(i.ARRAY_BUFFER,Jt);for(let tt=0;tt<H.locationSize;tt++)v(H.location+tt,yt/H.locationSize,X,pt,yt*J,yt/H.locationSize*tt*J,ut)}}else if(k!==void 0){let pt=k[nt];if(pt!==void 0)switch(pt.length){case 2:i.vertexAttrib2fv(H.location,pt);break;case 3:i.vertexAttrib3fv(H.location,pt);break;case 4:i.vertexAttrib4fv(H.location,pt);break;default:i.vertexAttrib1fv(H.location,pt)}}}}y()}function L(){R();for(let M in n){let P=n[M];for(let B in P){let F=P[B];for(let O in F)h(F[O].object),delete F[O];delete P[B]}delete n[M]}}function E(M){if(n[M.id]===void 0)return;let P=n[M.id];for(let B in P){let F=P[B];for(let O in F)h(F[O].object),delete F[O];delete P[B]}delete n[M.id]}function C(M){for(let P in n){let B=n[P];if(B[M.id]===void 0)continue;let F=B[M.id];for(let O in F)h(F[O].object),delete F[O];delete B[M.id]}}function R(){b(),o=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:b,dispose:L,releaseStatesOfGeometry:E,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:y}}function U0(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function l(c,h,u,f){if(u===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*f[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function N0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==an&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let R=C===Ln&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Cn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==pn&&!R)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:L,maxSamples:E}}function F0(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Tn,a=new Gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){let g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let y=r?0:n,v=y*4,x=p.clippingState||null;l.value=x,x=h(g,f,v,d);for(let L=0;L!==v;++L)x[L]=e[L];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){let _=u!==null?u.length:0,m=null;if(_!==0){if(m=l.value,g!==!0||m===null){let p=d+_*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,x=d;v!==_;++v,x+=4)o.copy(u[v]).applyMatrix4(y,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function O0(i){let t=new WeakMap;function e(o,a){return a===da?o.mapping=Ki:a===fa&&(o.mapping=Qi),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===da||a===fa)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new Fs(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var ns=class extends Wr{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Wi=4,Cc=[.125,.215,.35,.446,.526,.582],ai=20,Xo=new ns,Rc=new Pt,Yo=null,qo=0,Zo=0,Jo=!1,ri=(1+Math.sqrt(5))/2,Bi=1/ri,Ic=[new A(-ri,Bi,0),new A(ri,Bi,0),new A(-Bi,0,ri),new A(Bi,0,ri),new A(0,ri,-Bi),new A(0,ri,Bi),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)],is=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Yo=this._renderer.getRenderTarget(),qo=this._renderer.getActiveCubeFace(),Zo=this._renderer.getActiveMipmapLevel(),Jo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Dc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Yo,qo,Zo),this._renderer.xr.enabled=Jo,t.scissorTest=!1,Sr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ki||t.mapping===Qi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Yo=this._renderer.getRenderTarget(),qo=this._renderer.getActiveCubeFace(),Zo=this._renderer.getActiveMipmapLevel(),Jo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:fn,minFilter:fn,generateMipmaps:!1,type:Ln,format:an,colorSpace:cs,depthBuffer:!1},s=Pc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pc(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=B0(r)),this._blurMaterial=z0(r,t,e)}return s}_compileMaterial(t){let e=new j(this._lodPlanes[0],t);this._renderer.compile(e,Xo)}_sceneToCubeUV(t,e,n,s){let a=new Pe(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Rc),h.toneMapping=Wn,h.autoClear=!1;let d=new le({name:"PMREM.Background",side:Le,depthWrite:!1,depthTest:!1}),g=new j(new pe,d),_=!1,m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,_=!0):(d.color.copy(Rc),_=!0);for(let p=0;p<6;p++){let y=p%3;y===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):y===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));let v=this._cubeSize;Sr(s,y*v,p>2?v:0,v,v),h.setRenderTarget(s),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Ki||t.mapping===Qi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Dc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lc());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new j(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Sr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Xo)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Ic[(s-r-1)%Ic.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new j(this._lodPlanes[s],c),f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*ai-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):ai;m>ai&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ai}`);let p=[],y=0;for(let C=0;C<ai;++C){let R=C/_,b=Math.exp(-R*R/2);p.push(b),C===0?y+=b:C<m&&(y+=2*b)}for(let C=0;C<p.length;C++)p[C]=p[C]/y;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-n;let x=this._sizeLods[s],L=3*x*(s>v-Wi?s-v+Wi:0),E=4*(this._cubeSize-x);Sr(e,L,E,3*x,2*x),l.setRenderTarget(e),l.render(u,Xo)}};function B0(i){let t=[],e=[],n=[],s=i,r=i-Wi+1+Cc.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>i-Wi?l=Cc[o-i+Wi-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,m=2,p=1,y=new Float32Array(_*g*d),v=new Float32Array(m*g*d),x=new Float32Array(p*g*d);for(let E=0;E<d;E++){let C=E%3*2/3-1,R=E>2?0:-1,b=[C,R,0,C+2/3,R,0,C+2/3,R+1,0,C,R,0,C+2/3,R+1,0,C,R+1,0];y.set(b,_*g*E),v.set(f,m*g*E);let M=[E,E,E,E,E,E];x.set(M,p*g*E)}let L=new fe;L.setAttribute("position",new Ae(y,_)),L.setAttribute("uv",new Ae(v,m)),L.setAttribute("faceIndex",new Ae(x,p)),t.push(L),s>Wi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Pc(i,t,e){let n=new $e(i,t,e);return n.texture.mapping=ho,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Sr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function z0(i,t,e){let n=new Float32Array(ai),s=new A(0,1,0);return new Ve({name:"SphericalGaussianBlur",defines:{n:ai,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Lc(){return new Ve({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Dc(){return new Ve({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Nl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function k0(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===da||l===fa,h=l===Ki||l===Qi;if(c||h){let u=t.get(a),f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new is(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let d=a.image;return c&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new is(i)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function V0(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Ts("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function G0(i,t,e,n){let s={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let g in f.attributes)t.remove(f.attributes[g]);for(let g in f.morphAttributes){let _=f.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}f.removeEventListener("dispose",o),delete s[f.id];let d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function l(u){let f=u.attributes;for(let g in f)t.update(f[g],i.ARRAY_BUFFER);let d=u.morphAttributes;for(let g in d){let _=d[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],i.ARRAY_BUFFER)}}function c(u){let f=[],d=u.index,g=u.attributes.position,_=0;if(d!==null){let y=d.array;_=d.version;for(let v=0,x=y.length;v<x;v+=3){let L=y[v+0],E=y[v+1],C=y[v+2];f.push(L,E,E,C,C,L)}}else if(g!==void 0){let y=g.array;_=g.version;for(let v=0,x=y.length/3-1;v<x;v+=3){let L=v+0,E=v+1,C=v+2;f.push(L,E,E,C,C,L)}}else return;let m=new(wh(f)?Hr:Gr)(f,1);m.version=_;let p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function H0(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,d){i.drawElements(n,d,r,f*o),e.update(d,n,1)}function c(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*o,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,_){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,_,0,g);let p=0;for(let y=0;y<g;y++)p+=d[y]*_[y];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function W0(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function X0(i,t,e){let n=new WeakMap,s=new ae;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(a);if(f===void 0||f.count!==u){let b=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",b)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],y=a.morphAttributes.color||[],v=0;d===!0&&(v=1),g===!0&&(v=2),_===!0&&(v=3);let x=a.attributes.position.count*v,L=1;x>t.maxTextureSize&&(L=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);let E=new Float32Array(x*L*4*u),C=new kr(E,x,L,u);C.type=pn,C.needsUpdate=!0;let R=v*4;for(let M=0;M<u;M++){let P=m[M],B=p[M],F=y[M],O=x*L*4*M;for(let Y=0;Y<P.count;Y++){let k=Y*R;d===!0&&(s.fromBufferAttribute(P,Y),E[O+k+0]=s.x,E[O+k+1]=s.y,E[O+k+2]=s.z,E[O+k+3]=0),g===!0&&(s.fromBufferAttribute(B,Y),E[O+k+4]=s.x,E[O+k+5]=s.y,E[O+k+6]=s.z,E[O+k+7]=0),_===!0&&(s.fromBufferAttribute(F,Y),E[O+k+8]=s.x,E[O+k+9]=s.y,E[O+k+10]=s.z,E[O+k+11]=F.itemSize===4?s.w:1)}}f={count:u,texture:C,size:new et(x,L)},n.set(a,f),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let _=0;_<c.length;_++)d+=c[_];let g=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Y0(i,t,e,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var ss=class extends Fe{constructor(t,e,n,s,r,o,a,l,c,h=qi){if(h!==qi&&h!==ts)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===qi&&(n=ui),n===void 0&&h===ts&&(n=ji),super(null,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Xe,this.minFilter=l!==void 0?l:Xe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Ch=new Fe,Uc=new ss(1,1),Rh=new kr,Ih=new Xa,Ph=new Xr,Nc=[],Fc=[],Oc=new Float32Array(16),Bc=new Float32Array(9),zc=new Float32Array(4);function hs(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Nc[s];if(r===void 0&&(r=new Float32Array(s),Nc[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function we(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Te(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function fo(i,t){let e=Fc[t];e===void 0&&(e=new Int32Array(t),Fc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function q0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Z0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2fv(this.addr,t),Te(e,t)}}function J0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(we(e,t))return;i.uniform3fv(this.addr,t),Te(e,t)}}function $0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4fv(this.addr,t),Te(e,t)}}function K0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(we(e,n))return;zc.set(n),i.uniformMatrix2fv(this.addr,!1,zc),Te(e,n)}}function Q0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(we(e,n))return;Bc.set(n),i.uniformMatrix3fv(this.addr,!1,Bc),Te(e,n)}}function j0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(we(e,n))return;Oc.set(n),i.uniformMatrix4fv(this.addr,!1,Oc),Te(e,n)}}function tg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function eg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2iv(this.addr,t),Te(e,t)}}function ng(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;i.uniform3iv(this.addr,t),Te(e,t)}}function ig(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4iv(this.addr,t),Te(e,t)}}function sg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function rg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2uiv(this.addr,t),Te(e,t)}}function og(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;i.uniform3uiv(this.addr,t),Te(e,t)}}function ag(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4uiv(this.addr,t),Te(e,t)}}function lg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Uc.compareFunction=bh,r=Uc):r=Ch,e.setTexture2D(t||r,s)}function cg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Ih,s)}function hg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Ph,s)}function ug(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Rh,s)}function dg(i){switch(i){case 5126:return q0;case 35664:return Z0;case 35665:return J0;case 35666:return $0;case 35674:return K0;case 35675:return Q0;case 35676:return j0;case 5124:case 35670:return tg;case 35667:case 35671:return eg;case 35668:case 35672:return ng;case 35669:case 35673:return ig;case 5125:return sg;case 36294:return rg;case 36295:return og;case 36296:return ag;case 35678:case 36198:case 36298:case 36306:case 35682:return lg;case 35679:case 36299:case 36307:return cg;case 35680:case 36300:case 36308:case 36293:return hg;case 36289:case 36303:case 36311:case 36292:return ug}}function fg(i,t){i.uniform1fv(this.addr,t)}function pg(i,t){let e=hs(t,this.size,2);i.uniform2fv(this.addr,e)}function mg(i,t){let e=hs(t,this.size,3);i.uniform3fv(this.addr,e)}function gg(i,t){let e=hs(t,this.size,4);i.uniform4fv(this.addr,e)}function _g(i,t){let e=hs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function xg(i,t){let e=hs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function vg(i,t){let e=hs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function yg(i,t){i.uniform1iv(this.addr,t)}function Mg(i,t){i.uniform2iv(this.addr,t)}function Sg(i,t){i.uniform3iv(this.addr,t)}function bg(i,t){i.uniform4iv(this.addr,t)}function wg(i,t){i.uniform1uiv(this.addr,t)}function Tg(i,t){i.uniform2uiv(this.addr,t)}function Eg(i,t){i.uniform3uiv(this.addr,t)}function Ag(i,t){i.uniform4uiv(this.addr,t)}function Cg(i,t,e){let n=this.cache,s=t.length,r=fo(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Ch,r[o])}function Rg(i,t,e){let n=this.cache,s=t.length,r=fo(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Ih,r[o])}function Ig(i,t,e){let n=this.cache,s=t.length,r=fo(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Ph,r[o])}function Pg(i,t,e){let n=this.cache,s=t.length,r=fo(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Rh,r[o])}function Lg(i){switch(i){case 5126:return fg;case 35664:return pg;case 35665:return mg;case 35666:return gg;case 35674:return _g;case 35675:return xg;case 35676:return vg;case 5124:case 35670:return yg;case 35667:case 35671:return Mg;case 35668:case 35672:return Sg;case 35669:case 35673:return bg;case 5125:return wg;case 36294:return Tg;case 36295:return Eg;case 36296:return Ag;case 35678:case 36198:case 36298:case 36306:case 35682:return Cg;case 35679:case 36299:case 36307:return Rg;case 35680:case 36300:case 36308:case 36293:return Ig;case 36289:case 36303:case 36311:case 36292:return Pg}}var qa=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=dg(e.type)}},Za=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Lg(e.type)}},Ja=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},$o=/(\w+)(\])?(\[|\.)?/g;function kc(i,t){i.seq.push(t),i.map[t.id]=t}function Dg(i,t,e){let n=i.name,s=n.length;for($o.lastIndex=0;;){let r=$o.exec(n),o=$o.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){kc(e,c===void 0?new qa(a,i,t):new Za(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Ja(a),kc(e,u)),e=u}}}var Ji=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Dg(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function Vc(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Ug=37297,Ng=0;function Fg(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Gc=new Gt;function Og(i){Qt._getMatrix(Gc,Qt.workingColorSpace,i);let t=`mat3( ${Gc.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(i)){case uo:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Hc(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Fg(i.getShaderSource(t),o)}else return s}function Bg(i,t){let e=Og(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function zg(i,t){let e;switch(t){case Jd:e="Linear";break;case $d:e="Reinhard";break;case Kd:e="Cineon";break;case Qd:e="ACESFilmic";break;case El:e="AgX";break;case tf:e="Neutral";break;case jd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var br=new A;function kg(){Qt.getLuminanceCoefficients(br);let i=br.x.toFixed(4),t=br.y.toFixed(4),e=br.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Vg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Es).join(`
`)}function Gg(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Hg(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Es(i){return i!==""}function Wc(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Xc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Wg=/^[ \t]*#include +<([\w\d./]+)>/gm;function $a(i){return i.replace(Wg,Yg)}var Xg=new Map;function Yg(i,t){let e=Wt[t];if(e===void 0){let n=Xg.get(t);if(n!==void 0)e=Wt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return $a(e)}var qg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yc(i){return i.replace(qg,Zg)}function Zg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function qc(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Jg(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===hh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Tl?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===wn&&(t="SHADOWMAP_TYPE_VSM"),t}function $g(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ki:case Qi:t="ENVMAP_TYPE_CUBE";break;case ho:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Kg(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Qi:t="ENVMAP_MODE_REFRACTION";break}return t}function Qg(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case uh:t="ENVMAP_BLENDING_MULTIPLY";break;case qd:t="ENVMAP_BLENDING_MIX";break;case Zd:t="ENVMAP_BLENDING_ADD";break}return t}function jg(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function t_(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=Jg(e),c=$g(e),h=Kg(e),u=Qg(e),f=jg(e),d=Vg(e),g=Gg(r),_=s.createProgram(),m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Es).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Es).join(`
`),p.length>0&&(p+=`
`)):(m=[qc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Es).join(`
`),p=[qc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Wn?"#define TONE_MAPPING":"",e.toneMapping!==Wn?Wt.tonemapping_pars_fragment:"",e.toneMapping!==Wn?zg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,Bg("linearToOutputTexel",e.outputColorSpace),kg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Es).join(`
`)),o=$a(o),o=Wc(o,e),o=Xc(o,e),a=$a(a),a=Wc(a,e),a=Xc(a,e),o=Yc(o),a=Yc(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===oc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===oc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let v=y+m+o,x=y+p+a,L=Vc(s,s.VERTEX_SHADER,v),E=Vc(s,s.FRAGMENT_SHADER,x);s.attachShader(_,L),s.attachShader(_,E),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(P){if(i.debug.checkShaderErrors){let B=s.getProgramInfoLog(_).trim(),F=s.getShaderInfoLog(L).trim(),O=s.getShaderInfoLog(E).trim(),Y=!0,k=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,L,E);else{let nt=Hc(s,L,"vertex"),H=Hc(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+B+`
`+nt+`
`+H)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(F===""||O==="")&&(k=!1);k&&(P.diagnostics={runnable:Y,programLog:B,vertexShader:{log:F,prefix:m},fragmentShader:{log:O,prefix:p}})}s.deleteShader(L),s.deleteShader(E),R=new Ji(s,_),b=Hg(s,_)}let R;this.getUniforms=function(){return R===void 0&&C(this),R};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(_,Ug)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ng++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=L,this.fragmentShader=E,this}var e_=0,Ka=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Qa(t),e.set(t,n)),n}},Qa=class{constructor(t){this.id=e_++,this.code=t,this.usedTimes=0}};function n_(i,t,e,n,s,r,o){let a=new Vr,l=new Ka,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures,d=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,M,P,B,F){let O=B.fog,Y=F.geometry,k=b.isMeshStandardMaterial?B.environment:null,nt=(b.isMeshStandardMaterial?e:t).get(b.envMap||k),H=nt&&nt.mapping===ho?nt.image.height:null,at=g[b.type];b.precision!==null&&(d=s.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));let pt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,yt=pt!==void 0?pt.length:0,Dt=0;Y.morphAttributes.position!==void 0&&(Dt=1),Y.morphAttributes.normal!==void 0&&(Dt=2),Y.morphAttributes.color!==void 0&&(Dt=3);let Jt,X,J,ut;if(at){let se=dn[at];Jt=se.vertexShader,X=se.fragmentShader}else Jt=b.vertexShader,X=b.fragmentShader,l.update(b),J=l.getVertexShaderID(b),ut=l.getFragmentShaderID(b);let tt=i.getRenderTarget(),wt=i.state.buffers.depth.getReversed(),Ut=F.isInstancedMesh===!0,Lt=F.isBatchedMesh===!0,Yt=!!b.map,$=!!b.matcap,rt=!!nt,I=!!b.aoMap,Rt=!!b.lightMap,it=!!b.bumpMap,Mt=!!b.normalMap,lt=!!b.displacementMap,Nt=!!b.emissiveMap,xt=!!b.metalnessMap,T=!!b.roughnessMap,S=b.anisotropy>0,z=b.clearcoat>0,q=b.dispersion>0,Q=b.iridescence>0,Z=b.sheen>0,Tt=b.transmission>0,ht=S&&!!b.anisotropyMap,vt=z&&!!b.clearcoatMap,Zt=z&&!!b.clearcoatNormalMap,st=z&&!!b.clearcoatRoughnessMap,St=Q&&!!b.iridescenceMap,Ft=Q&&!!b.iridescenceThicknessMap,Bt=Z&&!!b.sheenColorMap,bt=Z&&!!b.sheenRoughnessMap,$t=!!b.specularMap,Ht=!!b.specularColorMap,ce=!!b.specularIntensityMap,D=Tt&&!!b.transmissionMap,dt=Tt&&!!b.thicknessMap,W=!!b.gradientMap,K=!!b.alphaMap,_t=b.alphaTest>0,mt=!!b.alphaHash,kt=!!b.extensions,xe=Wn;b.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(xe=i.toneMapping);let Ce={shaderID:at,shaderType:b.type,shaderName:b.name,vertexShader:Jt,fragmentShader:X,defines:b.defines,customVertexShaderID:J,customFragmentShaderID:ut,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:Lt,batchingColor:Lt&&F._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&F.instanceColor!==null,instancingMorph:Ut&&F.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:tt===null?i.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:cs,alphaToCoverage:!!b.alphaToCoverage,map:Yt,matcap:$,envMap:rt,envMapMode:rt&&nt.mapping,envMapCubeUVHeight:H,aoMap:I,lightMap:Rt,bumpMap:it,normalMap:Mt,displacementMap:f&&lt,emissiveMap:Nt,normalMapObjectSpace:Mt&&b.normalMapType===rf,normalMapTangentSpace:Mt&&b.normalMapType===Sh,metalnessMap:xt,roughnessMap:T,anisotropy:S,anisotropyMap:ht,clearcoat:z,clearcoatMap:vt,clearcoatNormalMap:Zt,clearcoatRoughnessMap:st,dispersion:q,iridescence:Q,iridescenceMap:St,iridescenceThicknessMap:Ft,sheen:Z,sheenColorMap:Bt,sheenRoughnessMap:bt,specularMap:$t,specularColorMap:Ht,specularIntensityMap:ce,transmission:Tt,transmissionMap:D,thicknessMap:dt,gradientMap:W,opaque:b.transparent===!1&&b.blending===Yi&&b.alphaToCoverage===!1,alphaMap:K,alphaTest:_t,alphaHash:mt,combine:b.combine,mapUv:Yt&&_(b.map.channel),aoMapUv:I&&_(b.aoMap.channel),lightMapUv:Rt&&_(b.lightMap.channel),bumpMapUv:it&&_(b.bumpMap.channel),normalMapUv:Mt&&_(b.normalMap.channel),displacementMapUv:lt&&_(b.displacementMap.channel),emissiveMapUv:Nt&&_(b.emissiveMap.channel),metalnessMapUv:xt&&_(b.metalnessMap.channel),roughnessMapUv:T&&_(b.roughnessMap.channel),anisotropyMapUv:ht&&_(b.anisotropyMap.channel),clearcoatMapUv:vt&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:Zt&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:st&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Ft&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Bt&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:bt&&_(b.sheenRoughnessMap.channel),specularMapUv:$t&&_(b.specularMap.channel),specularColorMapUv:Ht&&_(b.specularColorMap.channel),specularIntensityMapUv:ce&&_(b.specularIntensityMap.channel),transmissionMapUv:D&&_(b.transmissionMap.channel),thicknessMapUv:dt&&_(b.thicknessMap.channel),alphaMapUv:K&&_(b.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Mt||S),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!Y.attributes.uv&&(Yt||K),fog:!!O,useFog:b.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:wt,skinning:F.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:yt,morphTextureStride:Dt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:xe,decodeVideoTexture:Yt&&b.map.isVideoTexture===!0&&Qt.getTransfer(b.map.colorSpace)===oe,decodeVideoTextureEmissive:Nt&&b.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(b.emissiveMap.colorSpace)===oe,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===ge,flipSided:b.side===Le,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:kt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(kt&&b.extensions.multiDraw===!0||Lt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Ce.vertexUv1s=c.has(1),Ce.vertexUv2s=c.has(2),Ce.vertexUv3s=c.has(3),c.clear(),Ce}function p(b){let M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(let P in b.defines)M.push(P),M.push(b.defines[P]);return b.isRawShaderMaterial===!1&&(y(M,b),v(M,b),M.push(i.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function y(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function v(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function x(b){let M=g[b.type],P;if(M){let B=dn[M];P=Yf.clone(B.uniforms)}else P=b.uniforms;return P}function L(b,M){let P;for(let B=0,F=h.length;B<F;B++){let O=h[B];if(O.cacheKey===M){P=O,++P.usedTimes;break}}return P===void 0&&(P=new t_(i,M,b,r),h.push(P)),P}function E(b){if(--b.usedTimes===0){let M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function C(b){l.remove(b)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:L,releaseProgram:E,releaseShaderCache:C,programs:h,dispose:R}}function i_(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function s_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Zc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Jc(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,f,d,g,_,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function a(u,f,d,g,_,m){let p=o(u,f,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function l(u,f,d,g,_,m){let p=o(u,f,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,f){e.length>1&&e.sort(u||s_),n.length>1&&n.sort(f||Zc),s.length>1&&s.sort(f||Zc)}function h(){for(let u=t,f=i.length;u<f;u++){let d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function r_(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Jc,i.set(n,[o])):s>=r.length?(o=new Jc,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function o_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new A,color:new Pt};break;case"SpotLight":e={position:new A,direction:new A,color:new Pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new A,color:new Pt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new A,skyColor:new Pt,groundColor:new Pt};break;case"RectAreaLight":e={color:new Pt,position:new A,halfWidth:new A,halfHeight:new A};break}return i[t.id]=e,e}}}function a_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var l_=0;function c_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function h_(i){let t=new o_,e=a_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new A);let s=new A,r=new Xt,o=new Xt;function a(c){let h=0,u=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,y=0,v=0,x=0,L=0,E=0,C=0;c.sort(c_);for(let b=0,M=c.length;b<M;b++){let P=c[b],B=P.color,F=P.intensity,O=P.distance,Y=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=B.r*F,u+=B.g*F,f+=B.b*F;else if(P.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(P.sh.coefficients[k],F);C++}else if(P.isDirectionalLight){let k=t.get(P);if(k.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let nt=P.shadow,H=e.get(P);H.shadowIntensity=nt.intensity,H.shadowBias=nt.bias,H.shadowNormalBias=nt.normalBias,H.shadowRadius=nt.radius,H.shadowMapSize=nt.mapSize,n.directionalShadow[d]=H,n.directionalShadowMap[d]=Y,n.directionalShadowMatrix[d]=P.shadow.matrix,y++}n.directional[d]=k,d++}else if(P.isSpotLight){let k=t.get(P);k.position.setFromMatrixPosition(P.matrixWorld),k.color.copy(B).multiplyScalar(F),k.distance=O,k.coneCos=Math.cos(P.angle),k.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),k.decay=P.decay,n.spot[_]=k;let nt=P.shadow;if(P.map&&(n.spotLightMap[L]=P.map,L++,nt.updateMatrices(P),P.castShadow&&E++),n.spotLightMatrix[_]=nt.matrix,P.castShadow){let H=e.get(P);H.shadowIntensity=nt.intensity,H.shadowBias=nt.bias,H.shadowNormalBias=nt.normalBias,H.shadowRadius=nt.radius,H.shadowMapSize=nt.mapSize,n.spotShadow[_]=H,n.spotShadowMap[_]=Y,x++}_++}else if(P.isRectAreaLight){let k=t.get(P);k.color.copy(B).multiplyScalar(F),k.halfWidth.set(P.width*.5,0,0),k.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=k,m++}else if(P.isPointLight){let k=t.get(P);if(k.color.copy(P.color).multiplyScalar(P.intensity),k.distance=P.distance,k.decay=P.decay,P.castShadow){let nt=P.shadow,H=e.get(P);H.shadowIntensity=nt.intensity,H.shadowBias=nt.bias,H.shadowNormalBias=nt.normalBias,H.shadowRadius=nt.radius,H.shadowMapSize=nt.mapSize,H.shadowCameraNear=nt.camera.near,H.shadowCameraFar=nt.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=P.shadow.matrix,v++}n.point[g]=k,g++}else if(P.isHemisphereLight){let k=t.get(P);k.skyColor.copy(P.color).multiplyScalar(F),k.groundColor.copy(P.groundColor).multiplyScalar(F),n.hemi[p]=k,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ct.LTC_FLOAT_1,n.rectAreaLTC2=ct.LTC_FLOAT_2):(n.rectAreaLTC1=ct.LTC_HALF_1,n.rectAreaLTC2=ct.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let R=n.hash;(R.directionalLength!==d||R.pointLength!==g||R.spotLength!==_||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==y||R.numPointShadows!==v||R.numSpotShadows!==x||R.numSpotMaps!==L||R.numLightProbes!==C)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=x+L-E,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,R.directionalLength=d,R.pointLength=g,R.spotLength=_,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=y,R.numPointShadows=v,R.numSpotShadows=x,R.numSpotMaps=L,R.numLightProbes=C,n.version=l_++)}function l(c,h){let u=0,f=0,d=0,g=0,_=0,m=h.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){let v=c[p];if(v.isDirectionalLight){let x=n.directional[u];x.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(v.isSpotLight){let x=n.spot[d];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),d++}else if(v.isRectAreaLight){let x=n.rectArea[g];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){let x=n.point[f];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),f++}else if(v.isHemisphereLight){let x=n.hemi[_];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function $c(i){let t=new h_(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function u_(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new $c(i),t.set(s,[a])):r>=o.length?(a=new $c(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var ja=class extends Zn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=nf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},tl=class extends Zn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},d_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,f_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function p_(i,t,e){let n=new Os,s=new et,r=new et,o=new ae,a=new ja({depthPacking:sf}),l=new tl,c={},h=e.maxTextureSize,u={[Yn]:Le,[Le]:Yn,[ge]:ge},f=new Ve({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new et},radius:{value:4}},vertexShader:d_,fragmentShader:f_}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let g=new fe;g.setAttribute("position",new Ae(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new j(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hh;let p=this.type;this.render=function(E,C,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;let b=i.getRenderTarget(),M=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),B=i.state;B.setBlending(Hn),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let F=p!==wn&&this.type===wn,O=p===wn&&this.type!==wn;for(let Y=0,k=E.length;Y<k;Y++){let nt=E[Y],H=nt.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",nt,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);let at=H.getFrameExtents();if(s.multiply(at),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/at.x),s.x=r.x*at.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/at.y),s.y=r.y*at.y,H.mapSize.y=r.y)),H.map===null||F===!0||O===!0){let yt=this.type!==wn?{minFilter:Xe,magFilter:Xe}:{};H.map!==null&&H.map.dispose(),H.map=new $e(s.x,s.y,yt),H.map.texture.name=nt.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();let pt=H.getViewportCount();for(let yt=0;yt<pt;yt++){let Dt=H.getViewport(yt);o.set(r.x*Dt.x,r.y*Dt.y,r.x*Dt.z,r.y*Dt.w),B.viewport(o),H.updateMatrices(nt,yt),n=H.getFrustum(),x(C,R,H.camera,nt,this.type)}H.isPointLightShadow!==!0&&this.type===wn&&y(H,R),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,M,P)};function y(E,C){let R=t.update(_);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new $e(s.x,s.y)),f.uniforms.shadow_pass.value=E.map.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(C,null,R,f,_,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(C,null,R,d,_,null)}function v(E,C,R,b){let M=null,P=R.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(P!==void 0)M=P;else if(M=R.isPointLight===!0?l:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){let B=M.uuid,F=C.uuid,O=c[B];O===void 0&&(O={},c[B]=O);let Y=O[F];Y===void 0&&(Y=M.clone(),O[F]=Y,C.addEventListener("dispose",L)),M=Y}if(M.visible=C.visible,M.wireframe=C.wireframe,b===wn?M.side=C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:u[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,R.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let B=i.properties.get(M);B.light=R}return M}function x(E,C,R,b,M){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&M===wn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,E.matrixWorld);let F=t.update(E),O=E.material;if(Array.isArray(O)){let Y=F.groups;for(let k=0,nt=Y.length;k<nt;k++){let H=Y[k],at=O[H.materialIndex];if(at&&at.visible){let pt=v(E,at,b,M);E.onBeforeShadow(i,E,C,R,F,pt,H),i.renderBufferDirect(R,null,F,pt,E,H),E.onAfterShadow(i,E,C,R,F,pt,H)}}}else if(O.visible){let Y=v(E,O,b,M);E.onBeforeShadow(i,E,C,R,F,Y,null),i.renderBufferDirect(R,null,F,Y,E,null),E.onAfterShadow(i,E,C,R,F,Y,null)}}let B=E.children;for(let F=0,O=B.length;F<O;F++)x(B[F],C,R,b,M)}function L(E){E.target.removeEventListener("dispose",L);for(let R in c){let b=c[R],M=E.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}var m_={[ra]:oa,[aa]:ha,[la]:ua,[$i]:ca,[oa]:ra,[ha]:aa,[ua]:la,[ca]:$i};function g_(i,t){function e(){let D=!1,dt=new ae,W=null,K=new ae(0,0,0,0);return{setMask:function(_t){W!==_t&&!D&&(i.colorMask(_t,_t,_t,_t),W=_t)},setLocked:function(_t){D=_t},setClear:function(_t,mt,kt,xe,Ce){Ce===!0&&(_t*=xe,mt*=xe,kt*=xe),dt.set(_t,mt,kt,xe),K.equals(dt)===!1&&(i.clearColor(_t,mt,kt,xe),K.copy(dt))},reset:function(){D=!1,W=null,K.set(-1,0,0,0)}}}function n(){let D=!1,dt=!1,W=null,K=null,_t=null;return{setReversed:function(mt){if(dt!==mt){let kt=t.get("EXT_clip_control");dt?kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.ZERO_TO_ONE_EXT):kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.NEGATIVE_ONE_TO_ONE_EXT);let xe=_t;_t=null,this.setClear(xe)}dt=mt},getReversed:function(){return dt},setTest:function(mt){mt?tt(i.DEPTH_TEST):wt(i.DEPTH_TEST)},setMask:function(mt){W!==mt&&!D&&(i.depthMask(mt),W=mt)},setFunc:function(mt){if(dt&&(mt=m_[mt]),K!==mt){switch(mt){case ra:i.depthFunc(i.NEVER);break;case oa:i.depthFunc(i.ALWAYS);break;case aa:i.depthFunc(i.LESS);break;case $i:i.depthFunc(i.LEQUAL);break;case la:i.depthFunc(i.EQUAL);break;case ca:i.depthFunc(i.GEQUAL);break;case ha:i.depthFunc(i.GREATER);break;case ua:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}K=mt}},setLocked:function(mt){D=mt},setClear:function(mt){_t!==mt&&(dt&&(mt=1-mt),i.clearDepth(mt),_t=mt)},reset:function(){D=!1,W=null,K=null,_t=null,dt=!1}}}function s(){let D=!1,dt=null,W=null,K=null,_t=null,mt=null,kt=null,xe=null,Ce=null;return{setTest:function(se){D||(se?tt(i.STENCIL_TEST):wt(i.STENCIL_TEST))},setMask:function(se){dt!==se&&!D&&(i.stencilMask(se),dt=se)},setFunc:function(se,tn,_n){(W!==se||K!==tn||_t!==_n)&&(i.stencilFunc(se,tn,_n),W=se,K=tn,_t=_n)},setOp:function(se,tn,_n){(mt!==se||kt!==tn||xe!==_n)&&(i.stencilOp(se,tn,_n),mt=se,kt=tn,xe=_n)},setLocked:function(se){D=se},setClear:function(se){Ce!==se&&(i.clearStencil(se),Ce=se)},reset:function(){D=!1,dt=null,W=null,K=null,_t=null,mt=null,kt=null,xe=null,Ce=null}}}let r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap,h={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,y=null,v=null,x=null,L=null,E=null,C=new Pt(0,0,0),R=0,b=!1,M=null,P=null,B=null,F=null,O=null,Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),k=!1,nt=0,H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(H)[1]),k=nt>=1):H.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),k=nt>=2);let at=null,pt={},yt=i.getParameter(i.SCISSOR_BOX),Dt=i.getParameter(i.VIEWPORT),Jt=new ae().fromArray(yt),X=new ae().fromArray(Dt);function J(D,dt,W,K){let _t=new Uint8Array(4),mt=i.createTexture();i.bindTexture(D,mt),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let kt=0;kt<W;kt++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(dt,0,i.RGBA,1,1,K,0,i.RGBA,i.UNSIGNED_BYTE,_t):i.texImage2D(dt+kt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,_t);return mt}let ut={};ut[i.TEXTURE_2D]=J(i.TEXTURE_2D,i.TEXTURE_2D,1),ut[i.TEXTURE_CUBE_MAP]=J(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ut[i.TEXTURE_2D_ARRAY]=J(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ut[i.TEXTURE_3D]=J(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),tt(i.DEPTH_TEST),o.setFunc($i),it(!1),Mt(Ql),tt(i.CULL_FACE),I(Hn);function tt(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function wt(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function Ut(D,dt){return u[D]!==dt?(i.bindFramebuffer(D,dt),u[D]=dt,D===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=dt),D===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=dt),!0):!1}function Lt(D,dt){let W=d,K=!1;if(D){W=f.get(dt),W===void 0&&(W=[],f.set(dt,W));let _t=D.textures;if(W.length!==_t.length||W[0]!==i.COLOR_ATTACHMENT0){for(let mt=0,kt=_t.length;mt<kt;mt++)W[mt]=i.COLOR_ATTACHMENT0+mt;W.length=_t.length,K=!0}}else W[0]!==i.BACK&&(W[0]=i.BACK,K=!0);K&&i.drawBuffers(W)}function Yt(D){return g!==D?(i.useProgram(D),g=D,!0):!1}let $={[oi]:i.FUNC_ADD,[Id]:i.FUNC_SUBTRACT,[Pd]:i.FUNC_REVERSE_SUBTRACT};$[Ld]=i.MIN,$[Dd]=i.MAX;let rt={[Ud]:i.ZERO,[Nd]:i.ONE,[Fd]:i.SRC_COLOR,[ia]:i.SRC_ALPHA,[Gd]:i.SRC_ALPHA_SATURATE,[kd]:i.DST_COLOR,[Bd]:i.DST_ALPHA,[Od]:i.ONE_MINUS_SRC_COLOR,[sa]:i.ONE_MINUS_SRC_ALPHA,[Vd]:i.ONE_MINUS_DST_COLOR,[zd]:i.ONE_MINUS_DST_ALPHA,[Hd]:i.CONSTANT_COLOR,[Wd]:i.ONE_MINUS_CONSTANT_COLOR,[Xd]:i.CONSTANT_ALPHA,[Yd]:i.ONE_MINUS_CONSTANT_ALPHA};function I(D,dt,W,K,_t,mt,kt,xe,Ce,se){if(D===Hn){_===!0&&(wt(i.BLEND),_=!1);return}if(_===!1&&(tt(i.BLEND),_=!0),D!==Rd){if(D!==m||se!==b){if((p!==oi||x!==oi)&&(i.blendEquation(i.FUNC_ADD),p=oi,x=oi),se)switch(D){case Yi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case jl:i.blendFunc(i.ONE,i.ONE);break;case tc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ec:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Yi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case jl:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case tc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ec:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}y=null,v=null,L=null,E=null,C.set(0,0,0),R=0,m=D,b=se}return}_t=_t||dt,mt=mt||W,kt=kt||K,(dt!==p||_t!==x)&&(i.blendEquationSeparate($[dt],$[_t]),p=dt,x=_t),(W!==y||K!==v||mt!==L||kt!==E)&&(i.blendFuncSeparate(rt[W],rt[K],rt[mt],rt[kt]),y=W,v=K,L=mt,E=kt),(xe.equals(C)===!1||Ce!==R)&&(i.blendColor(xe.r,xe.g,xe.b,Ce),C.copy(xe),R=Ce),m=D,b=!1}function Rt(D,dt){D.side===ge?wt(i.CULL_FACE):tt(i.CULL_FACE);let W=D.side===Le;dt&&(W=!W),it(W),D.blending===Yi&&D.transparent===!1?I(Hn):I(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);let K=D.stencilWrite;a.setTest(K),K&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Nt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?tt(i.SAMPLE_ALPHA_TO_COVERAGE):wt(i.SAMPLE_ALPHA_TO_COVERAGE)}function it(D){M!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),M=D)}function Mt(D){D!==Ad?(tt(i.CULL_FACE),D!==P&&(D===Ql?i.cullFace(i.BACK):D===Cd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):wt(i.CULL_FACE),P=D}function lt(D){D!==B&&(k&&i.lineWidth(D),B=D)}function Nt(D,dt,W){D?(tt(i.POLYGON_OFFSET_FILL),(F!==dt||O!==W)&&(i.polygonOffset(dt,W),F=dt,O=W)):wt(i.POLYGON_OFFSET_FILL)}function xt(D){D?tt(i.SCISSOR_TEST):wt(i.SCISSOR_TEST)}function T(D){D===void 0&&(D=i.TEXTURE0+Y-1),at!==D&&(i.activeTexture(D),at=D)}function S(D,dt,W){W===void 0&&(at===null?W=i.TEXTURE0+Y-1:W=at);let K=pt[W];K===void 0&&(K={type:void 0,texture:void 0},pt[W]=K),(K.type!==D||K.texture!==dt)&&(at!==W&&(i.activeTexture(W),at=W),i.bindTexture(D,dt||ut[D]),K.type=D,K.texture=dt)}function z(){let D=pt[at];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function q(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Z(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Tt(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ht(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function vt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Zt(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function st(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function St(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ft(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Bt(D){Jt.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),Jt.copy(D))}function bt(D){X.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),X.copy(D))}function $t(D,dt){let W=c.get(dt);W===void 0&&(W=new WeakMap,c.set(dt,W));let K=W.get(D);K===void 0&&(K=i.getUniformBlockIndex(dt,D.name),W.set(D,K))}function Ht(D,dt){let K=c.get(dt).get(D);l.get(dt)!==K&&(i.uniformBlockBinding(dt,K,D.__bindingPointIndex),l.set(dt,K))}function ce(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},at=null,pt={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,y=null,v=null,x=null,L=null,E=null,C=new Pt(0,0,0),R=0,b=!1,M=null,P=null,B=null,F=null,O=null,Jt.set(0,0,i.canvas.width,i.canvas.height),X.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:tt,disable:wt,bindFramebuffer:Ut,drawBuffers:Lt,useProgram:Yt,setBlending:I,setMaterial:Rt,setFlipSided:it,setCullFace:Mt,setLineWidth:lt,setPolygonOffset:Nt,setScissorTest:xt,activeTexture:T,bindTexture:S,unbindTexture:z,compressedTexImage2D:q,compressedTexImage3D:Q,texImage2D:St,texImage3D:Ft,updateUBOMapping:$t,uniformBlockBinding:Ht,texStorage2D:Zt,texStorage3D:st,texSubImage2D:Z,texSubImage3D:Tt,compressedTexSubImage2D:ht,compressedTexSubImage3D:vt,scissor:Bt,viewport:bt,reset:ce}}function Kc(i,t,e,n){let s=__(n);switch(e){case gh:return i*t;case xh:return i*t;case vh:return i*t*2;case Il:return i*t/s.components*s.byteLength;case Pl:return i*t/s.components*s.byteLength;case yh:return i*t*2/s.components*s.byteLength;case Ll:return i*t*2/s.components*s.byteLength;case _h:return i*t*3/s.components*s.byteLength;case an:return i*t*4/s.components*s.byteLength;case Dl:return i*t*4/s.components*s.byteLength;case Lr:case Dr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ur:case Nr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ga:case xa:return Math.max(i,16)*Math.max(t,8)/4;case ma:case _a:return Math.max(i,8)*Math.max(t,8)/2;case va:case ya:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ma:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Sa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ba:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case wa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ta:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ea:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Aa:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ca:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ra:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ia:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Pa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case La:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Da:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Ua:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Na:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Fr:case Fa:case Oa:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Mh:case Ba:return Math.ceil(i/4)*Math.ceil(t/4)*8;case za:case ka:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function __(i){switch(i){case Cn:case fh:return{byteLength:1,components:1};case Ls:case ph:case Ln:return{byteLength:2,components:1};case Cl:case Rl:return{byteLength:2,components:4};case ui:case Al:case pn:return{byteLength:4,components:1};case mh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function x_(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new et,h=new WeakMap,u,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,S){return d?new OffscreenCanvas(T,S):Us("canvas")}function _(T,S,z){let q=1,Q=xt(T);if((Q.width>z||Q.height>z)&&(q=z/Math.max(Q.width,Q.height)),q<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let Z=Math.floor(q*Q.width),Tt=Math.floor(q*Q.height);u===void 0&&(u=g(Z,Tt));let ht=S?g(Z,Tt):u;return ht.width=Z,ht.height=Tt,ht.getContext("2d").drawImage(T,0,0,Z,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+Z+"x"+Tt+")."),ht}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){i.generateMipmap(T)}function y(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(T,S,z,q,Q=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let Z=S;if(S===i.RED&&(z===i.FLOAT&&(Z=i.R32F),z===i.HALF_FLOAT&&(Z=i.R16F),z===i.UNSIGNED_BYTE&&(Z=i.R8)),S===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.R8UI),z===i.UNSIGNED_SHORT&&(Z=i.R16UI),z===i.UNSIGNED_INT&&(Z=i.R32UI),z===i.BYTE&&(Z=i.R8I),z===i.SHORT&&(Z=i.R16I),z===i.INT&&(Z=i.R32I)),S===i.RG&&(z===i.FLOAT&&(Z=i.RG32F),z===i.HALF_FLOAT&&(Z=i.RG16F),z===i.UNSIGNED_BYTE&&(Z=i.RG8)),S===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.RG8UI),z===i.UNSIGNED_SHORT&&(Z=i.RG16UI),z===i.UNSIGNED_INT&&(Z=i.RG32UI),z===i.BYTE&&(Z=i.RG8I),z===i.SHORT&&(Z=i.RG16I),z===i.INT&&(Z=i.RG32I)),S===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),z===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),z===i.UNSIGNED_INT&&(Z=i.RGB32UI),z===i.BYTE&&(Z=i.RGB8I),z===i.SHORT&&(Z=i.RGB16I),z===i.INT&&(Z=i.RGB32I)),S===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),z===i.UNSIGNED_INT&&(Z=i.RGBA32UI),z===i.BYTE&&(Z=i.RGBA8I),z===i.SHORT&&(Z=i.RGBA16I),z===i.INT&&(Z=i.RGBA32I)),S===i.RGB&&z===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),S===i.RGBA){let Tt=Q?uo:Qt.getTransfer(q);z===i.FLOAT&&(Z=i.RGBA32F),z===i.HALF_FLOAT&&(Z=i.RGBA16F),z===i.UNSIGNED_BYTE&&(Z=Tt===oe?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function x(T,S){let z;return T?S===null||S===ui||S===ji?z=i.DEPTH24_STENCIL8:S===pn?z=i.DEPTH32F_STENCIL8:S===Ls&&(z=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===ui||S===ji?z=i.DEPTH_COMPONENT24:S===pn?z=i.DEPTH_COMPONENT32F:S===Ls&&(z=i.DEPTH_COMPONENT16),z}function L(T,S){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Xe&&T.minFilter!==fn?Math.log2(Math.max(S.width,S.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?S.mipmaps.length:1}function E(T){let S=T.target;S.removeEventListener("dispose",E),R(S),S.isVideoTexture&&h.delete(S)}function C(T){let S=T.target;S.removeEventListener("dispose",C),M(S)}function R(T){let S=n.get(T);if(S.__webglInit===void 0)return;let z=T.source,q=f.get(z);if(q){let Q=q[S.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&b(T),Object.keys(q).length===0&&f.delete(z)}n.remove(T)}function b(T){let S=n.get(T);i.deleteTexture(S.__webglTexture);let z=T.source,q=f.get(z);delete q[S.__cacheKey],o.memory.textures--}function M(T){let S=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(S.__webglFramebuffer[q]))for(let Q=0;Q<S.__webglFramebuffer[q].length;Q++)i.deleteFramebuffer(S.__webglFramebuffer[q][Q]);else i.deleteFramebuffer(S.__webglFramebuffer[q]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[q])}else{if(Array.isArray(S.__webglFramebuffer))for(let q=0;q<S.__webglFramebuffer.length;q++)i.deleteFramebuffer(S.__webglFramebuffer[q]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let q=0;q<S.__webglColorRenderbuffer.length;q++)S.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[q]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let z=T.textures;for(let q=0,Q=z.length;q<Q;q++){let Z=n.get(z[q]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(z[q])}n.remove(T)}let P=0;function B(){P=0}function F(){let T=P;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),P+=1,T}function O(T){let S=[];return S.push(T.wrapS),S.push(T.wrapT),S.push(T.wrapR||0),S.push(T.magFilter),S.push(T.minFilter),S.push(T.anisotropy),S.push(T.internalFormat),S.push(T.format),S.push(T.type),S.push(T.generateMipmaps),S.push(T.premultiplyAlpha),S.push(T.flipY),S.push(T.unpackAlignment),S.push(T.colorSpace),S.join()}function Y(T,S){let z=n.get(T);if(T.isVideoTexture&&lt(T),T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version){let q=T.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(z,T,S);return}}e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+S)}function k(T,S){let z=n.get(T);if(T.version>0&&z.__version!==T.version){X(z,T,S);return}e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+S)}function nt(T,S){let z=n.get(T);if(T.version>0&&z.__version!==T.version){X(z,T,S);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+S)}function H(T,S){let z=n.get(T);if(T.version>0&&z.__version!==T.version){J(z,T,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+S)}let at={[hi]:i.REPEAT,[li]:i.CLAMP_TO_EDGE,[pa]:i.MIRRORED_REPEAT},pt={[Xe]:i.NEAREST,[ef]:i.NEAREST_MIPMAP_NEAREST,[ir]:i.NEAREST_MIPMAP_LINEAR,[fn]:i.LINEAR,[bo]:i.LINEAR_MIPMAP_NEAREST,[ci]:i.LINEAR_MIPMAP_LINEAR},yt={[of]:i.NEVER,[df]:i.ALWAYS,[af]:i.LESS,[bh]:i.LEQUAL,[lf]:i.EQUAL,[uf]:i.GEQUAL,[cf]:i.GREATER,[hf]:i.NOTEQUAL};function Dt(T,S){if(S.type===pn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===fn||S.magFilter===bo||S.magFilter===ir||S.magFilter===ci||S.minFilter===fn||S.minFilter===bo||S.minFilter===ir||S.minFilter===ci)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,at[S.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,at[S.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,at[S.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,pt[S.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,pt[S.minFilter]),S.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,yt[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Xe||S.minFilter!==ir&&S.minFilter!==ci||S.type===pn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Jt(T,S){let z=!1;T.__webglInit===void 0&&(T.__webglInit=!0,S.addEventListener("dispose",E));let q=S.source,Q=f.get(q);Q===void 0&&(Q={},f.set(q,Q));let Z=O(S);if(Z!==T.__cacheKey){Q[Z]===void 0&&(Q[Z]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,z=!0),Q[Z].usedTimes++;let Tt=Q[T.__cacheKey];Tt!==void 0&&(Q[T.__cacheKey].usedTimes--,Tt.usedTimes===0&&b(S)),T.__cacheKey=Z,T.__webglTexture=Q[Z].texture}return z}function X(T,S,z){let q=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(q=i.TEXTURE_3D);let Q=Jt(T,S),Z=S.source;e.bindTexture(q,T.__webglTexture,i.TEXTURE0+z);let Tt=n.get(Z);if(Z.version!==Tt.__version||Q===!0){e.activeTexture(i.TEXTURE0+z);let ht=Qt.getPrimaries(Qt.workingColorSpace),vt=S.colorSpace===Vn?null:Qt.getPrimaries(S.colorSpace),Zt=S.colorSpace===Vn||ht===vt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Zt);let st=_(S.image,!1,s.maxTextureSize);st=Nt(S,st);let St=r.convert(S.format,S.colorSpace),Ft=r.convert(S.type),Bt=v(S.internalFormat,St,Ft,S.colorSpace,S.isVideoTexture);Dt(q,S);let bt,$t=S.mipmaps,Ht=S.isVideoTexture!==!0,ce=Tt.__version===void 0||Q===!0,D=Z.dataReady,dt=L(S,st);if(S.isDepthTexture)Bt=x(S.format===ts,S.type),ce&&(Ht?e.texStorage2D(i.TEXTURE_2D,1,Bt,st.width,st.height):e.texImage2D(i.TEXTURE_2D,0,Bt,st.width,st.height,0,St,Ft,null));else if(S.isDataTexture)if($t.length>0){Ht&&ce&&e.texStorage2D(i.TEXTURE_2D,dt,Bt,$t[0].width,$t[0].height);for(let W=0,K=$t.length;W<K;W++)bt=$t[W],Ht?D&&e.texSubImage2D(i.TEXTURE_2D,W,0,0,bt.width,bt.height,St,Ft,bt.data):e.texImage2D(i.TEXTURE_2D,W,Bt,bt.width,bt.height,0,St,Ft,bt.data);S.generateMipmaps=!1}else Ht?(ce&&e.texStorage2D(i.TEXTURE_2D,dt,Bt,st.width,st.height),D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,st.width,st.height,St,Ft,st.data)):e.texImage2D(i.TEXTURE_2D,0,Bt,st.width,st.height,0,St,Ft,st.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ht&&ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,dt,Bt,$t[0].width,$t[0].height,st.depth);for(let W=0,K=$t.length;W<K;W++)if(bt=$t[W],S.format!==an)if(St!==null)if(Ht){if(D)if(S.layerUpdates.size>0){let _t=Kc(bt.width,bt.height,S.format,S.type);for(let mt of S.layerUpdates){let kt=bt.data.subarray(mt*_t/bt.data.BYTES_PER_ELEMENT,(mt+1)*_t/bt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,mt,bt.width,bt.height,1,St,kt)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,0,bt.width,bt.height,st.depth,St,bt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,W,Bt,bt.width,bt.height,st.depth,0,bt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ht?D&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,0,bt.width,bt.height,st.depth,St,Ft,bt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,W,Bt,bt.width,bt.height,st.depth,0,St,Ft,bt.data)}else{Ht&&ce&&e.texStorage2D(i.TEXTURE_2D,dt,Bt,$t[0].width,$t[0].height);for(let W=0,K=$t.length;W<K;W++)bt=$t[W],S.format!==an?St!==null?Ht?D&&e.compressedTexSubImage2D(i.TEXTURE_2D,W,0,0,bt.width,bt.height,St,bt.data):e.compressedTexImage2D(i.TEXTURE_2D,W,Bt,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ht?D&&e.texSubImage2D(i.TEXTURE_2D,W,0,0,bt.width,bt.height,St,Ft,bt.data):e.texImage2D(i.TEXTURE_2D,W,Bt,bt.width,bt.height,0,St,Ft,bt.data)}else if(S.isDataArrayTexture)if(Ht){if(ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,dt,Bt,st.width,st.height,st.depth),D)if(S.layerUpdates.size>0){let W=Kc(st.width,st.height,S.format,S.type);for(let K of S.layerUpdates){let _t=st.data.subarray(K*W/st.data.BYTES_PER_ELEMENT,(K+1)*W/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,st.width,st.height,1,St,Ft,_t)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,St,Ft,st.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Bt,st.width,st.height,st.depth,0,St,Ft,st.data);else if(S.isData3DTexture)Ht?(ce&&e.texStorage3D(i.TEXTURE_3D,dt,Bt,st.width,st.height,st.depth),D&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,St,Ft,st.data)):e.texImage3D(i.TEXTURE_3D,0,Bt,st.width,st.height,st.depth,0,St,Ft,st.data);else if(S.isFramebufferTexture){if(ce)if(Ht)e.texStorage2D(i.TEXTURE_2D,dt,Bt,st.width,st.height);else{let W=st.width,K=st.height;for(let _t=0;_t<dt;_t++)e.texImage2D(i.TEXTURE_2D,_t,Bt,W,K,0,St,Ft,null),W>>=1,K>>=1}}else if($t.length>0){if(Ht&&ce){let W=xt($t[0]);e.texStorage2D(i.TEXTURE_2D,dt,Bt,W.width,W.height)}for(let W=0,K=$t.length;W<K;W++)bt=$t[W],Ht?D&&e.texSubImage2D(i.TEXTURE_2D,W,0,0,St,Ft,bt):e.texImage2D(i.TEXTURE_2D,W,Bt,St,Ft,bt);S.generateMipmaps=!1}else if(Ht){if(ce){let W=xt(st);e.texStorage2D(i.TEXTURE_2D,dt,Bt,W.width,W.height)}D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,St,Ft,st)}else e.texImage2D(i.TEXTURE_2D,0,Bt,St,Ft,st);m(S)&&p(q),Tt.__version=Z.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function J(T,S,z){if(S.image.length!==6)return;let q=Jt(T,S),Q=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+z);let Z=n.get(Q);if(Q.version!==Z.__version||q===!0){e.activeTexture(i.TEXTURE0+z);let Tt=Qt.getPrimaries(Qt.workingColorSpace),ht=S.colorSpace===Vn?null:Qt.getPrimaries(S.colorSpace),vt=S.colorSpace===Vn||Tt===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);let Zt=S.isCompressedTexture||S.image[0].isCompressedTexture,st=S.image[0]&&S.image[0].isDataTexture,St=[];for(let K=0;K<6;K++)!Zt&&!st?St[K]=_(S.image[K],!0,s.maxCubemapSize):St[K]=st?S.image[K].image:S.image[K],St[K]=Nt(S,St[K]);let Ft=St[0],Bt=r.convert(S.format,S.colorSpace),bt=r.convert(S.type),$t=v(S.internalFormat,Bt,bt,S.colorSpace),Ht=S.isVideoTexture!==!0,ce=Z.__version===void 0||q===!0,D=Q.dataReady,dt=L(S,Ft);Dt(i.TEXTURE_CUBE_MAP,S);let W;if(Zt){Ht&&ce&&e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,$t,Ft.width,Ft.height);for(let K=0;K<6;K++){W=St[K].mipmaps;for(let _t=0;_t<W.length;_t++){let mt=W[_t];S.format!==an?Bt!==null?Ht?D&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,0,0,mt.width,mt.height,Bt,mt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,$t,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,0,0,mt.width,mt.height,Bt,bt,mt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,$t,mt.width,mt.height,0,Bt,bt,mt.data)}}}else{if(W=S.mipmaps,Ht&&ce){W.length>0&&dt++;let K=xt(St[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,$t,K.width,K.height)}for(let K=0;K<6;K++)if(st){Ht?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,St[K].width,St[K].height,Bt,bt,St[K].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,$t,St[K].width,St[K].height,0,Bt,bt,St[K].data);for(let _t=0;_t<W.length;_t++){let kt=W[_t].image[K].image;Ht?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,0,0,kt.width,kt.height,Bt,bt,kt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,$t,kt.width,kt.height,0,Bt,bt,kt.data)}}else{Ht?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Bt,bt,St[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,$t,Bt,bt,St[K]);for(let _t=0;_t<W.length;_t++){let mt=W[_t];Ht?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,0,0,Bt,bt,mt.image[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,$t,Bt,bt,mt.image[K])}}}m(S)&&p(i.TEXTURE_CUBE_MAP),Z.__version=Q.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function ut(T,S,z,q,Q,Z){let Tt=r.convert(z.format,z.colorSpace),ht=r.convert(z.type),vt=v(z.internalFormat,Tt,ht,z.colorSpace),Zt=n.get(S),st=n.get(z);if(st.__renderTarget=S,!Zt.__hasExternalTextures){let St=Math.max(1,S.width>>Z),Ft=Math.max(1,S.height>>Z);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,Z,vt,St,Ft,S.depth,0,Tt,ht,null):e.texImage2D(Q,Z,vt,St,Ft,0,Tt,ht,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),Mt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,Q,st.__webglTexture,0,it(S)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,Q,st.__webglTexture,Z),e.bindFramebuffer(i.FRAMEBUFFER,null)}function tt(T,S,z){if(i.bindRenderbuffer(i.RENDERBUFFER,T),S.depthBuffer){let q=S.depthTexture,Q=q&&q.isDepthTexture?q.type:null,Z=x(S.stencilBuffer,Q),Tt=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=it(S);Mt(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht,Z,S.width,S.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht,Z,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Z,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Tt,i.RENDERBUFFER,T)}else{let q=S.textures;for(let Q=0;Q<q.length;Q++){let Z=q[Q],Tt=r.convert(Z.format,Z.colorSpace),ht=r.convert(Z.type),vt=v(Z.internalFormat,Tt,ht,Z.colorSpace),Zt=it(S);z&&Mt(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Zt,vt,S.width,S.height):Mt(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Zt,vt,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,vt,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function wt(T,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let q=n.get(S.depthTexture);q.__renderTarget=S,(!q.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),Y(S.depthTexture,0);let Q=q.__webglTexture,Z=it(S);if(S.depthTexture.format===qi)Mt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(S.depthTexture.format===ts)Mt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Ut(T){let S=n.get(T),z=T.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==T.depthTexture){let q=T.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),q){let Q=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,q.removeEventListener("dispose",Q)};q.addEventListener("dispose",Q),S.__depthDisposeCallback=Q}S.__boundDepthTexture=q}if(T.depthTexture&&!S.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");wt(S.__webglFramebuffer,T)}else if(z){S.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[q]),S.__webglDepthbuffer[q]===void 0)S.__webglDepthbuffer[q]=i.createRenderbuffer(),tt(S.__webglDepthbuffer[q],T,!1);else{let Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=S.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,Z)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),tt(S.__webglDepthbuffer,T,!1);else{let q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,Q)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Lt(T,S,z){let q=n.get(T);S!==void 0&&ut(q.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&Ut(T)}function Yt(T){let S=T.texture,z=n.get(T),q=n.get(S);T.addEventListener("dispose",C);let Q=T.textures,Z=T.isWebGLCubeRenderTarget===!0,Tt=Q.length>1;if(Tt||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=S.version,o.memory.textures++),Z){z.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer[ht]=[];for(let vt=0;vt<S.mipmaps.length;vt++)z.__webglFramebuffer[ht][vt]=i.createFramebuffer()}else z.__webglFramebuffer[ht]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer=[];for(let ht=0;ht<S.mipmaps.length;ht++)z.__webglFramebuffer[ht]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(Tt)for(let ht=0,vt=Q.length;ht<vt;ht++){let Zt=n.get(Q[ht]);Zt.__webglTexture===void 0&&(Zt.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&Mt(T)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ht=0;ht<Q.length;ht++){let vt=Q[ht];z.__webglColorRenderbuffer[ht]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[ht]);let Zt=r.convert(vt.format,vt.colorSpace),st=r.convert(vt.type),St=v(vt.internalFormat,Zt,st,vt.colorSpace,T.isXRRenderTarget===!0),Ft=it(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ft,St,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,z.__webglColorRenderbuffer[ht])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),tt(z.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Dt(i.TEXTURE_CUBE_MAP,S);for(let ht=0;ht<6;ht++)if(S.mipmaps&&S.mipmaps.length>0)for(let vt=0;vt<S.mipmaps.length;vt++)ut(z.__webglFramebuffer[ht][vt],T,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,vt);else ut(z.__webglFramebuffer[ht],T,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);m(S)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Tt){for(let ht=0,vt=Q.length;ht<vt;ht++){let Zt=Q[ht],st=n.get(Zt);e.bindTexture(i.TEXTURE_2D,st.__webglTexture),Dt(i.TEXTURE_2D,Zt),ut(z.__webglFramebuffer,T,Zt,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,0),m(Zt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let ht=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ht=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ht,q.__webglTexture),Dt(ht,S),S.mipmaps&&S.mipmaps.length>0)for(let vt=0;vt<S.mipmaps.length;vt++)ut(z.__webglFramebuffer[vt],T,S,i.COLOR_ATTACHMENT0,ht,vt);else ut(z.__webglFramebuffer,T,S,i.COLOR_ATTACHMENT0,ht,0);m(S)&&p(ht),e.unbindTexture()}T.depthBuffer&&Ut(T)}function $(T){let S=T.textures;for(let z=0,q=S.length;z<q;z++){let Q=S[z];if(m(Q)){let Z=y(T),Tt=n.get(Q).__webglTexture;e.bindTexture(Z,Tt),p(Z),e.unbindTexture()}}}let rt=[],I=[];function Rt(T){if(T.samples>0){if(Mt(T)===!1){let S=T.textures,z=T.width,q=T.height,Q=i.COLOR_BUFFER_BIT,Z=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Tt=n.get(T),ht=S.length>1;if(ht)for(let vt=0;vt<S.length;vt++)e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let vt=0;vt<S.length;vt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),ht){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[vt]);let Zt=n.get(S[vt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Zt,0)}i.blitFramebuffer(0,0,z,q,0,0,z,q,Q,i.NEAREST),l===!0&&(rt.length=0,I.length=0,rt.push(i.COLOR_ATTACHMENT0+vt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(rt.push(Z),I.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,I)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,rt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ht)for(let vt=0;vt<S.length;vt++){e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[vt]);let Zt=n.get(S[vt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.TEXTURE_2D,Zt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){let S=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function it(T){return Math.min(s.maxSamples,T.samples)}function Mt(T){let S=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function lt(T){let S=o.render.frame;h.get(T)!==S&&(h.set(T,S),T.update())}function Nt(T,S){let z=T.colorSpace,q=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||z!==cs&&z!==Vn&&(Qt.getTransfer(z)===oe?(q!==an||Q!==Cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),S}function xt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=B,this.setTexture2D=Y,this.setTexture2DArray=k,this.setTexture3D=nt,this.setTextureCube=H,this.rebindTextures=Lt,this.setupRenderTarget=Yt,this.updateRenderTargetMipmap=$,this.updateMultisampleRenderTarget=Rt,this.setupDepthRenderbuffer=Ut,this.setupFrameBufferTexture=ut,this.useMultisampledRTT=Mt}function v_(i,t){function e(n,s=Vn){let r,o=Qt.getTransfer(s);if(n===Cn)return i.UNSIGNED_BYTE;if(n===Cl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Rl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===mh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===fh)return i.BYTE;if(n===ph)return i.SHORT;if(n===Ls)return i.UNSIGNED_SHORT;if(n===Al)return i.INT;if(n===ui)return i.UNSIGNED_INT;if(n===pn)return i.FLOAT;if(n===Ln)return i.HALF_FLOAT;if(n===gh)return i.ALPHA;if(n===_h)return i.RGB;if(n===an)return i.RGBA;if(n===xh)return i.LUMINANCE;if(n===vh)return i.LUMINANCE_ALPHA;if(n===qi)return i.DEPTH_COMPONENT;if(n===ts)return i.DEPTH_STENCIL;if(n===Il)return i.RED;if(n===Pl)return i.RED_INTEGER;if(n===yh)return i.RG;if(n===Ll)return i.RG_INTEGER;if(n===Dl)return i.RGBA_INTEGER;if(n===Lr||n===Dr||n===Ur||n===Nr)if(o===oe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Lr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Lr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ur)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Nr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ma||n===ga||n===_a||n===xa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ma)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ga)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===_a)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===xa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===va||n===ya||n===Ma)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===va||n===ya)return o===oe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ma)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Sa||n===ba||n===wa||n===Ta||n===Ea||n===Aa||n===Ca||n===Ra||n===Ia||n===Pa||n===La||n===Da||n===Ua||n===Na)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Sa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ba)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ta)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ea)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Aa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ca)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ra)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ia)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Pa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===La)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Da)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ua)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Na)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Fr||n===Fa||n===Oa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Fr)return o===oe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Fa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Oa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Mh||n===Ba||n===za||n===ka)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Fr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ba)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===za)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ka)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ji?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var el=class extends Pe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Kt=class extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}},y_={type:"move"},Rs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Kt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Kt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Kt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(y_)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Kt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},M_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,S_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,nl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new Fe,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Ve({vertexShader:M_,fragmentShader:S_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new j(new ie(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},il=class extends qn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,g=null,_=new nl,m=e.getContextAttributes(),p=null,y=null,v=[],x=[],L=new et,E=null,C=new Pe;C.viewport=new ae;let R=new Pe;R.viewport=new ae;let b=[C,R],M=new el,P=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let J=v[X];return J===void 0&&(J=new Rs,v[X]=J),J.getTargetRaySpace()},this.getControllerGrip=function(X){let J=v[X];return J===void 0&&(J=new Rs,v[X]=J),J.getGripSpace()},this.getHand=function(X){let J=v[X];return J===void 0&&(J=new Rs,v[X]=J),J.getHandSpace()};function F(X){let J=x.indexOf(X.inputSource);if(J===-1)return;let ut=v[J];ut!==void 0&&(ut.update(X.inputSource,X.frame,c||o),ut.dispatchEvent({type:X.type,data:X.inputSource}))}function O(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",O),s.removeEventListener("inputsourceschange",Y);for(let X=0;X<v.length;X++){let J=x[X];J!==null&&(x[X]=null,v[X].disconnect(J))}P=null,B=null,_.reset(),t.setRenderTarget(p),d=null,f=null,u=null,s=null,y=null,Jt.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",O),s.addEventListener("inputsourceschange",Y),m.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(L),s.renderState.layers===void 0){let J={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,J),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new $e(d.framebufferWidth,d.framebufferHeight,{format:an,type:Cn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let J=null,ut=null,tt=null;m.depth&&(tt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,J=m.stencil?ts:qi,ut=m.stencil?ji:ui);let wt={colorFormat:e.RGBA8,depthFormat:tt,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(wt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),y=new $e(f.textureWidth,f.textureHeight,{format:an,type:Cn,depthTexture:new ss(f.textureWidth,f.textureHeight,ut,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Jt.setContext(s),Jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Y(X){for(let J=0;J<X.removed.length;J++){let ut=X.removed[J],tt=x.indexOf(ut);tt>=0&&(x[tt]=null,v[tt].disconnect(ut))}for(let J=0;J<X.added.length;J++){let ut=X.added[J],tt=x.indexOf(ut);if(tt===-1){for(let Ut=0;Ut<v.length;Ut++)if(Ut>=x.length){x.push(ut),tt=Ut;break}else if(x[Ut]===null){x[Ut]=ut,tt=Ut;break}if(tt===-1)break}let wt=v[tt];wt&&wt.connect(ut)}}let k=new A,nt=new A;function H(X,J,ut){k.setFromMatrixPosition(J.matrixWorld),nt.setFromMatrixPosition(ut.matrixWorld);let tt=k.distanceTo(nt),wt=J.projectionMatrix.elements,Ut=ut.projectionMatrix.elements,Lt=wt[14]/(wt[10]-1),Yt=wt[14]/(wt[10]+1),$=(wt[9]+1)/wt[5],rt=(wt[9]-1)/wt[5],I=(wt[8]-1)/wt[0],Rt=(Ut[8]+1)/Ut[0],it=Lt*I,Mt=Lt*Rt,lt=tt/(-I+Rt),Nt=lt*-I;if(J.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Nt),X.translateZ(lt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),wt[10]===-1)X.projectionMatrix.copy(J.projectionMatrix),X.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{let xt=Lt+lt,T=Yt+lt,S=it-Nt,z=Mt+(tt-Nt),q=$*Yt/T*xt,Q=rt*Yt/T*xt;X.projectionMatrix.makePerspective(S,z,q,Q,xt,T),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function at(X,J){J===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(J.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let J=X.near,ut=X.far;_.texture!==null&&(_.depthNear>0&&(J=_.depthNear),_.depthFar>0&&(ut=_.depthFar)),M.near=R.near=C.near=J,M.far=R.far=C.far=ut,(P!==M.near||B!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),P=M.near,B=M.far),C.layers.mask=X.layers.mask|2,R.layers.mask=X.layers.mask|4,M.layers.mask=C.layers.mask|R.layers.mask;let tt=X.parent,wt=M.cameras;at(M,tt);for(let Ut=0;Ut<wt.length;Ut++)at(wt[Ut],tt);wt.length===2?H(M,C,R):M.projectionMatrix.copy(C.projectionMatrix),pt(X,M,tt)};function pt(X,J,ut){ut===null?X.matrix.copy(J.matrixWorld):(X.matrix.copy(ut.matrixWorld),X.matrix.invert(),X.matrix.multiply(J.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(J.projectionMatrix),X.projectionMatrixInverse.copy(J.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Ds*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(X){l=X,f!==null&&(f.fixedFoveation=X),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=X)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let yt=null;function Dt(X,J){if(h=J.getViewerPose(c||o),g=J,h!==null){let ut=h.views;d!==null&&(t.setRenderTargetFramebuffer(y,d.framebuffer),t.setRenderTarget(y));let tt=!1;ut.length!==M.cameras.length&&(M.cameras.length=0,tt=!0);for(let Ut=0;Ut<ut.length;Ut++){let Lt=ut[Ut],Yt=null;if(d!==null)Yt=d.getViewport(Lt);else{let rt=u.getViewSubImage(f,Lt);Yt=rt.viewport,Ut===0&&(t.setRenderTargetTextures(y,rt.colorTexture,f.ignoreDepthValues?void 0:rt.depthStencilTexture),t.setRenderTarget(y))}let $=b[Ut];$===void 0&&($=new Pe,$.layers.enable(Ut),$.viewport=new ae,b[Ut]=$),$.matrix.fromArray(Lt.transform.matrix),$.matrix.decompose($.position,$.quaternion,$.scale),$.projectionMatrix.fromArray(Lt.projectionMatrix),$.projectionMatrixInverse.copy($.projectionMatrix).invert(),$.viewport.set(Yt.x,Yt.y,Yt.width,Yt.height),Ut===0&&(M.matrix.copy($.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),tt===!0&&M.cameras.push($)}let wt=s.enabledFeatures;if(wt&&wt.includes("depth-sensing")){let Ut=u.getDepthInformation(ut[0]);Ut&&Ut.isValid&&Ut.texture&&_.init(t,Ut,s.renderState)}}for(let ut=0;ut<v.length;ut++){let tt=x[ut],wt=v[ut];tt!==null&&wt!==void 0&&wt.update(tt,J,c||o)}yt&&yt(X,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}let Jt=new Ah;Jt.setAnimationLoop(Dt),this.setAnimationLoop=function(X){yt=X},this.dispose=function(){}}},si=new Oe,b_=new Xt;function w_(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Eh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,v,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,y,v):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Le&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Le&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let y=t.get(p),v=y.envMap,x=y.envMapRotation;v&&(m.envMap.value=v,si.copy(x),si.x*=-1,si.y*=-1,si.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(si.y*=-1,si.z*=-1),m.envMapRotation.value.setFromMatrix4(b_.makeRotationFromEuler(si)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=v*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Le&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function T_(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,v){let x=v.program;n.uniformBlockBinding(y,x)}function c(y,v){let x=s[y.id];x===void 0&&(g(y),x=h(y),s[y.id]=x,y.addEventListener("dispose",m));let L=v.program;n.updateUBOMapping(y,L);let E=t.render.frame;r[y.id]!==E&&(f(y),r[y.id]=E)}function h(y){let v=u();y.__bindingPointIndex=v;let x=i.createBuffer(),L=y.__size,E=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,L,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,x),x}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){let v=s[y.id],x=y.uniforms,L=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let E=0,C=x.length;E<C;E++){let R=Array.isArray(x[E])?x[E]:[x[E]];for(let b=0,M=R.length;b<M;b++){let P=R[b];if(d(P,E,b,L)===!0){let B=P.__offset,F=Array.isArray(P.value)?P.value:[P.value],O=0;for(let Y=0;Y<F.length;Y++){let k=F[Y],nt=_(k);typeof k=="number"||typeof k=="boolean"?(P.__data[0]=k,i.bufferSubData(i.UNIFORM_BUFFER,B+O,P.__data)):k.isMatrix3?(P.__data[0]=k.elements[0],P.__data[1]=k.elements[1],P.__data[2]=k.elements[2],P.__data[3]=0,P.__data[4]=k.elements[3],P.__data[5]=k.elements[4],P.__data[6]=k.elements[5],P.__data[7]=0,P.__data[8]=k.elements[6],P.__data[9]=k.elements[7],P.__data[10]=k.elements[8],P.__data[11]=0):(k.toArray(P.__data,O),O+=nt.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(y,v,x,L){let E=y.value,C=v+"_"+x;if(L[C]===void 0)return typeof E=="number"||typeof E=="boolean"?L[C]=E:L[C]=E.clone(),!0;{let R=L[C];if(typeof E=="number"||typeof E=="boolean"){if(R!==E)return L[C]=E,!0}else if(R.equals(E)===!1)return R.copy(E),!0}return!1}function g(y){let v=y.uniforms,x=0,L=16;for(let C=0,R=v.length;C<R;C++){let b=Array.isArray(v[C])?v[C]:[v[C]];for(let M=0,P=b.length;M<P;M++){let B=b[M],F=Array.isArray(B.value)?B.value:[B.value];for(let O=0,Y=F.length;O<Y;O++){let k=F[O],nt=_(k),H=x%L,at=H%nt.boundary,pt=H+at;x+=at,pt!==0&&L-pt<nt.storage&&(x+=L-pt),B.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=x,x+=nt.storage}}}let E=x%L;return E>0&&(x+=L-E),y.__size=x,y.__cache={},this}function _(y){let v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function m(y){let v=y.target;v.removeEventListener("dispose",m);let x=o.indexOf(v.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function p(){for(let y in s)i.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}var Yr=class{constructor(t={}){let{canvas:e=Rf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,p=null,y=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Me,this.toneMapping=Wn,this.toneMappingExposure=1;let x=this,L=!1,E=0,C=0,R=null,b=-1,M=null,P=new ae,B=new ae,F=null,O=new Pt(0),Y=0,k=e.width,nt=e.height,H=1,at=null,pt=null,yt=new ae(0,0,k,nt),Dt=new ae(0,0,k,nt),Jt=!1,X=new Os,J=!1,ut=!1,tt=new Xt,wt=new Xt,Ut=new A,Lt=new ae,Yt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},$=!1;function rt(){return R===null?H:1}let I=n;function Rt(w,U){return e.getContext(w,U)}try{let w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${wl}`),e.addEventListener("webglcontextlost",K,!1),e.addEventListener("webglcontextrestored",_t,!1),e.addEventListener("webglcontextcreationerror",mt,!1),I===null){let U="webgl2";if(I=Rt(U,w),I===null)throw Rt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let it,Mt,lt,Nt,xt,T,S,z,q,Q,Z,Tt,ht,vt,Zt,st,St,Ft,Bt,bt,$t,Ht,ce,D;function dt(){it=new V0(I),it.init(),Ht=new v_(I,it),Mt=new N0(I,it,t,Ht),lt=new g_(I,it),Mt.reverseDepthBuffer&&f&&lt.buffers.depth.setReversed(!0),Nt=new W0(I),xt=new i_,T=new x_(I,it,lt,xt,Mt,Ht,Nt),S=new O0(x),z=new k0(x),q=new Kf(I),ce=new D0(I,q),Q=new G0(I,q,Nt,ce),Z=new Y0(I,Q,q,Nt),Bt=new X0(I,Mt,T),st=new F0(xt),Tt=new n_(x,S,z,it,Mt,ce,st),ht=new w_(x,xt),vt=new r_,Zt=new u_(it),Ft=new L0(x,S,z,lt,Z,d,l),St=new p_(x,Z,Mt),D=new T_(I,Nt,Mt,lt),bt=new U0(I,it,Nt),$t=new H0(I,it,Nt),Nt.programs=Tt.programs,x.capabilities=Mt,x.extensions=it,x.properties=xt,x.renderLists=vt,x.shadowMap=St,x.state=lt,x.info=Nt}dt();let W=new il(x,I);this.xr=W,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let w=it.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=it.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(w){w!==void 0&&(H=w,this.setSize(k,nt,!1))},this.getSize=function(w){return w.set(k,nt)},this.setSize=function(w,U,V=!0){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=w,nt=U,e.width=Math.floor(w*H),e.height=Math.floor(U*H),V===!0&&(e.style.width=w+"px",e.style.height=U+"px"),this.setViewport(0,0,w,U)},this.getDrawingBufferSize=function(w){return w.set(k*H,nt*H).floor()},this.setDrawingBufferSize=function(w,U,V){k=w,nt=U,H=V,e.width=Math.floor(w*V),e.height=Math.floor(U*V),this.setViewport(0,0,w,U)},this.getCurrentViewport=function(w){return w.copy(P)},this.getViewport=function(w){return w.copy(yt)},this.setViewport=function(w,U,V,G){w.isVector4?yt.set(w.x,w.y,w.z,w.w):yt.set(w,U,V,G),lt.viewport(P.copy(yt).multiplyScalar(H).round())},this.getScissor=function(w){return w.copy(Dt)},this.setScissor=function(w,U,V,G){w.isVector4?Dt.set(w.x,w.y,w.z,w.w):Dt.set(w,U,V,G),lt.scissor(B.copy(Dt).multiplyScalar(H).round())},this.getScissorTest=function(){return Jt},this.setScissorTest=function(w){lt.setScissorTest(Jt=w)},this.setOpaqueSort=function(w){at=w},this.setTransparentSort=function(w){pt=w},this.getClearColor=function(w){return w.copy(Ft.getClearColor())},this.setClearColor=function(){Ft.setClearColor.apply(Ft,arguments)},this.getClearAlpha=function(){return Ft.getClearAlpha()},this.setClearAlpha=function(){Ft.setClearAlpha.apply(Ft,arguments)},this.clear=function(w=!0,U=!0,V=!0){let G=0;if(w){let N=!1;if(R!==null){let ot=R.texture.format;N=ot===Dl||ot===Ll||ot===Pl}if(N){let ot=R.texture.type,gt=ot===Cn||ot===ui||ot===Ls||ot===ji||ot===Cl||ot===Rl,Et=Ft.getClearColor(),At=Ft.getClearAlpha(),zt=Et.r,Vt=Et.g,Ct=Et.b;gt?(g[0]=zt,g[1]=Vt,g[2]=Ct,g[3]=At,I.clearBufferuiv(I.COLOR,0,g)):(_[0]=zt,_[1]=Vt,_[2]=Ct,_[3]=At,I.clearBufferiv(I.COLOR,0,_))}else G|=I.COLOR_BUFFER_BIT}U&&(G|=I.DEPTH_BUFFER_BIT),V&&(G|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",K,!1),e.removeEventListener("webglcontextrestored",_t,!1),e.removeEventListener("webglcontextcreationerror",mt,!1),vt.dispose(),Zt.dispose(),xt.dispose(),S.dispose(),z.dispose(),Z.dispose(),ce.dispose(),D.dispose(),Tt.dispose(),W.dispose(),W.removeEventListener("sessionstart",Wl),W.removeEventListener("sessionend",Xl),Qn.stop()};function K(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function _t(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;let w=Nt.autoReset,U=St.enabled,V=St.autoUpdate,G=St.needsUpdate,N=St.type;dt(),Nt.autoReset=w,St.enabled=U,St.autoUpdate=V,St.needsUpdate=G,St.type=N}function mt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function kt(w){let U=w.target;U.removeEventListener("dispose",kt),xe(U)}function xe(w){Ce(w),xt.remove(w)}function Ce(w){let U=xt.get(w).programs;U!==void 0&&(U.forEach(function(V){Tt.releaseProgram(V)}),w.isShaderMaterial&&Tt.releaseShaderCache(w))}this.renderBufferDirect=function(w,U,V,G,N,ot){U===null&&(U=Yt);let gt=N.isMesh&&N.matrixWorld.determinant()<0,Et=wd(w,U,V,G,N);lt.setMaterial(G,gt);let At=V.index,zt=1;if(G.wireframe===!0){if(At=Q.getWireframeAttribute(V),At===void 0)return;zt=2}let Vt=V.drawRange,Ct=V.attributes.position,jt=Vt.start*zt,he=(Vt.start+Vt.count)*zt;ot!==null&&(jt=Math.max(jt,ot.start*zt),he=Math.min(he,(ot.start+ot.count)*zt)),At!==null?(jt=Math.max(jt,0),he=Math.min(he,At.count)):Ct!=null&&(jt=Math.max(jt,0),he=Math.min(he,Ct.count));let ue=he-jt;if(ue<0||ue===1/0)return;ce.setup(N,G,Et,V,At);let ke,ee=bt;if(At!==null&&(ke=q.get(At),ee=$t,ee.setIndex(ke)),N.isMesh)G.wireframe===!0?(lt.setLineWidth(G.wireframeLinewidth*rt()),ee.setMode(I.LINES)):ee.setMode(I.TRIANGLES);else if(N.isLine){let It=G.linewidth;It===void 0&&(It=1),lt.setLineWidth(It*rt()),N.isLineSegments?ee.setMode(I.LINES):N.isLineLoop?ee.setMode(I.LINE_LOOP):ee.setMode(I.LINE_STRIP)}else N.isPoints?ee.setMode(I.POINTS):N.isSprite&&ee.setMode(I.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)ee.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(it.get("WEBGL_multi_draw"))ee.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{let It=N._multiDrawStarts,xn=N._multiDrawCounts,ne=N._multiDrawCount,en=At?q.get(At).bytesPerElement:1,wi=xt.get(G).currentProgram.getUniforms();for(let Ge=0;Ge<ne;Ge++)wi.setValue(I,"_gl_DrawID",Ge),ee.render(It[Ge]/en,xn[Ge])}else if(N.isInstancedMesh)ee.renderInstances(jt,ue,N.count);else if(V.isInstancedBufferGeometry){let It=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,xn=Math.min(V.instanceCount,It);ee.renderInstances(jt,ue,xn)}else ee.render(jt,ue)};function se(w,U,V){w.transparent===!0&&w.side===ge&&w.forceSinglePass===!1?(w.side=Le,w.needsUpdate=!0,nr(w,U,V),w.side=Yn,w.needsUpdate=!0,nr(w,U,V),w.side=ge):nr(w,U,V)}this.compile=function(w,U,V=null){V===null&&(V=w),p=Zt.get(V),p.init(U),v.push(p),V.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),w!==V&&w.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();let G=new Set;return w.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;let ot=N.material;if(ot)if(Array.isArray(ot))for(let gt=0;gt<ot.length;gt++){let Et=ot[gt];se(Et,V,N),G.add(Et)}else se(ot,V,N),G.add(ot)}),v.pop(),p=null,G},this.compileAsync=function(w,U,V=null){let G=this.compile(w,U,V);return new Promise(N=>{function ot(){if(G.forEach(function(gt){xt.get(gt).currentProgram.isReady()&&G.delete(gt)}),G.size===0){N(w);return}setTimeout(ot,10)}it.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let tn=null;function _n(w){tn&&tn(w)}function Wl(){Qn.stop()}function Xl(){Qn.start()}let Qn=new Ah;Qn.setAnimationLoop(_n),typeof self<"u"&&Qn.setContext(self),this.setAnimationLoop=function(w){tn=w,W.setAnimationLoop(w),w===null?Qn.stop():Qn.start()},W.addEventListener("sessionstart",Wl),W.addEventListener("sessionend",Xl),this.render=function(w,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(U),U=W.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,U,R),p=Zt.get(w,v.length),p.init(U),v.push(p),wt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),X.setFromProjectionMatrix(wt),ut=this.localClippingEnabled,J=st.init(this.clippingPlanes,ut),m=vt.get(w,y.length),m.init(),y.push(m),W.enabled===!0&&W.isPresenting===!0){let ot=x.xr.getDepthSensingMesh();ot!==null&&So(ot,U,-1/0,x.sortObjects)}So(w,U,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(at,pt),$=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,$&&Ft.addToRenderList(m,w),this.info.render.frame++,J===!0&&st.beginShadows();let V=p.state.shadowsArray;St.render(V,w,U),J===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();let G=m.opaque,N=m.transmissive;if(p.setupLights(),U.isArrayCamera){let ot=U.cameras;if(N.length>0)for(let gt=0,Et=ot.length;gt<Et;gt++){let At=ot[gt];ql(G,N,w,At)}$&&Ft.render(w);for(let gt=0,Et=ot.length;gt<Et;gt++){let At=ot[gt];Yl(m,w,At,At.viewport)}}else N.length>0&&ql(G,N,w,U),$&&Ft.render(w),Yl(m,w,U);R!==null&&(T.updateMultisampleRenderTarget(R),T.updateRenderTargetMipmap(R)),w.isScene===!0&&w.onAfterRender(x,w,U),ce.resetDefaultState(),b=-1,M=null,v.pop(),v.length>0?(p=v[v.length-1],J===!0&&st.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function So(w,U,V,G){if(w.visible===!1)return;if(w.layers.test(U.layers)){if(w.isGroup)V=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(U);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||X.intersectsSprite(w)){G&&Lt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(wt);let gt=Z.update(w),Et=w.material;Et.visible&&m.push(w,gt,Et,V,Lt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||X.intersectsObject(w))){let gt=Z.update(w),Et=w.material;if(G&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Lt.copy(w.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),Lt.copy(gt.boundingSphere.center)),Lt.applyMatrix4(w.matrixWorld).applyMatrix4(wt)),Array.isArray(Et)){let At=gt.groups;for(let zt=0,Vt=At.length;zt<Vt;zt++){let Ct=At[zt],jt=Et[Ct.materialIndex];jt&&jt.visible&&m.push(w,gt,jt,V,Lt.z,Ct)}}else Et.visible&&m.push(w,gt,Et,V,Lt.z,null)}}let ot=w.children;for(let gt=0,Et=ot.length;gt<Et;gt++)So(ot[gt],U,V,G)}function Yl(w,U,V,G){let N=w.opaque,ot=w.transmissive,gt=w.transparent;p.setupLightsView(V),J===!0&&st.setGlobalState(x.clippingPlanes,V),G&&lt.viewport(P.copy(G)),N.length>0&&er(N,U,V),ot.length>0&&er(ot,U,V),gt.length>0&&er(gt,U,V),lt.buffers.depth.setTest(!0),lt.buffers.depth.setMask(!0),lt.buffers.color.setMask(!0),lt.setPolygonOffset(!1)}function ql(w,U,V,G){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new $e(1,1,{generateMipmaps:!0,type:it.has("EXT_color_buffer_half_float")||it.has("EXT_color_buffer_float")?Ln:Cn,minFilter:ci,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace}));let ot=p.state.transmissionRenderTarget[G.id],gt=G.viewport||P;ot.setSize(gt.z,gt.w);let Et=x.getRenderTarget();x.setRenderTarget(ot),x.getClearColor(O),Y=x.getClearAlpha(),Y<1&&x.setClearColor(16777215,.5),x.clear(),$&&Ft.render(V);let At=x.toneMapping;x.toneMapping=Wn;let zt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),J===!0&&st.setGlobalState(x.clippingPlanes,G),er(w,V,G),T.updateMultisampleRenderTarget(ot),T.updateRenderTargetMipmap(ot),it.has("WEBGL_multisampled_render_to_texture")===!1){let Vt=!1;for(let Ct=0,jt=U.length;Ct<jt;Ct++){let he=U[Ct],ue=he.object,ke=he.geometry,ee=he.material,It=he.group;if(ee.side===ge&&ue.layers.test(G.layers)){let xn=ee.side;ee.side=Le,ee.needsUpdate=!0,Zl(ue,V,G,ke,ee,It),ee.side=xn,ee.needsUpdate=!0,Vt=!0}}Vt===!0&&(T.updateMultisampleRenderTarget(ot),T.updateRenderTargetMipmap(ot))}x.setRenderTarget(Et),x.setClearColor(O,Y),zt!==void 0&&(G.viewport=zt),x.toneMapping=At}function er(w,U,V){let G=U.isScene===!0?U.overrideMaterial:null;for(let N=0,ot=w.length;N<ot;N++){let gt=w[N],Et=gt.object,At=gt.geometry,zt=G===null?gt.material:G,Vt=gt.group;Et.layers.test(V.layers)&&Zl(Et,U,V,At,zt,Vt)}}function Zl(w,U,V,G,N,ot){w.onBeforeRender(x,U,V,G,N,ot),w.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),N.onBeforeRender(x,U,V,G,w,ot),N.transparent===!0&&N.side===ge&&N.forceSinglePass===!1?(N.side=Le,N.needsUpdate=!0,x.renderBufferDirect(V,U,G,N,w,ot),N.side=Yn,N.needsUpdate=!0,x.renderBufferDirect(V,U,G,N,w,ot),N.side=ge):x.renderBufferDirect(V,U,G,N,w,ot),w.onAfterRender(x,U,V,G,N,ot)}function nr(w,U,V){U.isScene!==!0&&(U=Yt);let G=xt.get(w),N=p.state.lights,ot=p.state.shadowsArray,gt=N.state.version,Et=Tt.getParameters(w,N.state,ot,U,V),At=Tt.getProgramCacheKey(Et),zt=G.programs;G.environment=w.isMeshStandardMaterial?U.environment:null,G.fog=U.fog,G.envMap=(w.isMeshStandardMaterial?z:S).get(w.envMap||G.environment),G.envMapRotation=G.environment!==null&&w.envMap===null?U.environmentRotation:w.envMapRotation,zt===void 0&&(w.addEventListener("dispose",kt),zt=new Map,G.programs=zt);let Vt=zt.get(At);if(Vt!==void 0){if(G.currentProgram===Vt&&G.lightsStateVersion===gt)return $l(w,Et),Vt}else Et.uniforms=Tt.getUniforms(w),w.onBeforeCompile(Et,x),Vt=Tt.acquireProgram(Et,At),zt.set(At,Vt),G.uniforms=Et.uniforms;let Ct=G.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ct.clippingPlanes=st.uniform),$l(w,Et),G.needsLights=Ed(w),G.lightsStateVersion=gt,G.needsLights&&(Ct.ambientLightColor.value=N.state.ambient,Ct.lightProbe.value=N.state.probe,Ct.directionalLights.value=N.state.directional,Ct.directionalLightShadows.value=N.state.directionalShadow,Ct.spotLights.value=N.state.spot,Ct.spotLightShadows.value=N.state.spotShadow,Ct.rectAreaLights.value=N.state.rectArea,Ct.ltc_1.value=N.state.rectAreaLTC1,Ct.ltc_2.value=N.state.rectAreaLTC2,Ct.pointLights.value=N.state.point,Ct.pointLightShadows.value=N.state.pointShadow,Ct.hemisphereLights.value=N.state.hemi,Ct.directionalShadowMap.value=N.state.directionalShadowMap,Ct.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Ct.spotShadowMap.value=N.state.spotShadowMap,Ct.spotLightMatrix.value=N.state.spotLightMatrix,Ct.spotLightMap.value=N.state.spotLightMap,Ct.pointShadowMap.value=N.state.pointShadowMap,Ct.pointShadowMatrix.value=N.state.pointShadowMatrix),G.currentProgram=Vt,G.uniformsList=null,Vt}function Jl(w){if(w.uniformsList===null){let U=w.currentProgram.getUniforms();w.uniformsList=Ji.seqWithValue(U.seq,w.uniforms)}return w.uniformsList}function $l(w,U){let V=xt.get(w);V.outputColorSpace=U.outputColorSpace,V.batching=U.batching,V.batchingColor=U.batchingColor,V.instancing=U.instancing,V.instancingColor=U.instancingColor,V.instancingMorph=U.instancingMorph,V.skinning=U.skinning,V.morphTargets=U.morphTargets,V.morphNormals=U.morphNormals,V.morphColors=U.morphColors,V.morphTargetsCount=U.morphTargetsCount,V.numClippingPlanes=U.numClippingPlanes,V.numIntersection=U.numClipIntersection,V.vertexAlphas=U.vertexAlphas,V.vertexTangents=U.vertexTangents,V.toneMapping=U.toneMapping}function wd(w,U,V,G,N){U.isScene!==!0&&(U=Yt),T.resetTextureUnits();let ot=U.fog,gt=G.isMeshStandardMaterial?U.environment:null,Et=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:cs,At=(G.isMeshStandardMaterial?z:S).get(G.envMap||gt),zt=G.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Vt=!!V.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ct=!!V.morphAttributes.position,jt=!!V.morphAttributes.normal,he=!!V.morphAttributes.color,ue=Wn;G.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(ue=x.toneMapping);let ke=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ee=ke!==void 0?ke.length:0,It=xt.get(G),xn=p.state.lights;if(J===!0&&(ut===!0||w!==M)){let Ze=w===M&&G.id===b;st.setState(G,w,Ze)}let ne=!1;G.version===It.__version?(It.needsLights&&It.lightsStateVersion!==xn.state.version||It.outputColorSpace!==Et||N.isBatchedMesh&&It.batching===!1||!N.isBatchedMesh&&It.batching===!0||N.isBatchedMesh&&It.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&It.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&It.instancing===!1||!N.isInstancedMesh&&It.instancing===!0||N.isSkinnedMesh&&It.skinning===!1||!N.isSkinnedMesh&&It.skinning===!0||N.isInstancedMesh&&It.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&It.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&It.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&It.instancingMorph===!1&&N.morphTexture!==null||It.envMap!==At||G.fog===!0&&It.fog!==ot||It.numClippingPlanes!==void 0&&(It.numClippingPlanes!==st.numPlanes||It.numIntersection!==st.numIntersection)||It.vertexAlphas!==zt||It.vertexTangents!==Vt||It.morphTargets!==Ct||It.morphNormals!==jt||It.morphColors!==he||It.toneMapping!==ue||It.morphTargetsCount!==ee)&&(ne=!0):(ne=!0,It.__version=G.version);let en=It.currentProgram;ne===!0&&(en=nr(G,U,N));let wi=!1,Ge=!1,fs=!1,de=en.getUniforms(),un=It.uniforms;if(lt.useProgram(en.program)&&(wi=!0,Ge=!0,fs=!0),G.id!==b&&(b=G.id,Ge=!0),wi||M!==w){lt.buffers.depth.getReversed()?(tt.copy(w.projectionMatrix),Pf(tt),Lf(tt),de.setValue(I,"projectionMatrix",tt)):de.setValue(I,"projectionMatrix",w.projectionMatrix),de.setValue(I,"viewMatrix",w.matrixWorldInverse);let Dn=de.map.cameraPosition;Dn!==void 0&&Dn.setValue(I,Ut.setFromMatrixPosition(w.matrixWorld)),Mt.logarithmicDepthBuffer&&de.setValue(I,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&de.setValue(I,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,Ge=!0,fs=!0)}if(N.isSkinnedMesh){de.setOptional(I,N,"bindMatrix"),de.setOptional(I,N,"bindMatrixInverse");let Ze=N.skeleton;Ze&&(Ze.boneTexture===null&&Ze.computeBoneTexture(),de.setValue(I,"boneTexture",Ze.boneTexture,T))}N.isBatchedMesh&&(de.setOptional(I,N,"batchingTexture"),de.setValue(I,"batchingTexture",N._matricesTexture,T),de.setOptional(I,N,"batchingIdTexture"),de.setValue(I,"batchingIdTexture",N._indirectTexture,T),de.setOptional(I,N,"batchingColorTexture"),N._colorsTexture!==null&&de.setValue(I,"batchingColorTexture",N._colorsTexture,T));let ps=V.morphAttributes;if((ps.position!==void 0||ps.normal!==void 0||ps.color!==void 0)&&Bt.update(N,V,en),(Ge||It.receiveShadow!==N.receiveShadow)&&(It.receiveShadow=N.receiveShadow,de.setValue(I,"receiveShadow",N.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(un.envMap.value=At,un.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&U.environment!==null&&(un.envMapIntensity.value=U.environmentIntensity),Ge&&(de.setValue(I,"toneMappingExposure",x.toneMappingExposure),It.needsLights&&Td(un,fs),ot&&G.fog===!0&&ht.refreshFogUniforms(un,ot),ht.refreshMaterialUniforms(un,G,H,nt,p.state.transmissionRenderTarget[w.id]),Ji.upload(I,Jl(It),un,T)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Ji.upload(I,Jl(It),un,T),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&de.setValue(I,"center",N.center),de.setValue(I,"modelViewMatrix",N.modelViewMatrix),de.setValue(I,"normalMatrix",N.normalMatrix),de.setValue(I,"modelMatrix",N.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){let Ze=G.uniformsGroups;for(let Dn=0,Un=Ze.length;Dn<Un;Dn++){let Kl=Ze[Dn];D.update(Kl,en),D.bind(Kl,en)}}return en}function Td(w,U){w.ambientLightColor.needsUpdate=U,w.lightProbe.needsUpdate=U,w.directionalLights.needsUpdate=U,w.directionalLightShadows.needsUpdate=U,w.pointLights.needsUpdate=U,w.pointLightShadows.needsUpdate=U,w.spotLights.needsUpdate=U,w.spotLightShadows.needsUpdate=U,w.rectAreaLights.needsUpdate=U,w.hemisphereLights.needsUpdate=U}function Ed(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(w,U,V){xt.get(w.texture).__webglTexture=U,xt.get(w.depthTexture).__webglTexture=V;let G=xt.get(w);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=V===void 0,G.__autoAllocateDepthBuffer||it.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,U){let V=xt.get(w);V.__webglFramebuffer=U,V.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(w,U=0,V=0){R=w,E=U,C=V;let G=!0,N=null,ot=!1,gt=!1;if(w){let At=xt.get(w);if(At.__useDefaultFramebuffer!==void 0)lt.bindFramebuffer(I.FRAMEBUFFER,null),G=!1;else if(At.__webglFramebuffer===void 0)T.setupRenderTarget(w);else if(At.__hasExternalTextures)T.rebindTextures(w,xt.get(w.texture).__webglTexture,xt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let Ct=w.depthTexture;if(At.__boundDepthTexture!==Ct){if(Ct!==null&&xt.has(Ct)&&(w.width!==Ct.image.width||w.height!==Ct.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(w)}}let zt=w.texture;(zt.isData3DTexture||zt.isDataArrayTexture||zt.isCompressedArrayTexture)&&(gt=!0);let Vt=xt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Vt[U])?N=Vt[U][V]:N=Vt[U],ot=!0):w.samples>0&&T.useMultisampledRTT(w)===!1?N=xt.get(w).__webglMultisampledFramebuffer:Array.isArray(Vt)?N=Vt[V]:N=Vt,P.copy(w.viewport),B.copy(w.scissor),F=w.scissorTest}else P.copy(yt).multiplyScalar(H).floor(),B.copy(Dt).multiplyScalar(H).floor(),F=Jt;if(lt.bindFramebuffer(I.FRAMEBUFFER,N)&&G&&lt.drawBuffers(w,N),lt.viewport(P),lt.scissor(B),lt.setScissorTest(F),ot){let At=xt.get(w.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+U,At.__webglTexture,V)}else if(gt){let At=xt.get(w.texture),zt=U||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,At.__webglTexture,V||0,zt)}b=-1},this.readRenderTargetPixels=function(w,U,V,G,N,ot,gt){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=xt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&gt!==void 0&&(Et=Et[gt]),Et){lt.bindFramebuffer(I.FRAMEBUFFER,Et);try{let At=w.texture,zt=At.format,Vt=At.type;if(!Mt.textureFormatReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Mt.textureTypeReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=w.width-G&&V>=0&&V<=w.height-N&&I.readPixels(U,V,G,N,Ht.convert(zt),Ht.convert(Vt),ot)}finally{let At=R!==null?xt.get(R).__webglFramebuffer:null;lt.bindFramebuffer(I.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(w,U,V,G,N,ot,gt){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=xt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&gt!==void 0&&(Et=Et[gt]),Et){let At=w.texture,zt=At.format,Vt=At.type;if(!Mt.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Mt.textureTypeReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=w.width-G&&V>=0&&V<=w.height-N){lt.bindFramebuffer(I.FRAMEBUFFER,Et);let Ct=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Ct),I.bufferData(I.PIXEL_PACK_BUFFER,ot.byteLength,I.STREAM_READ),I.readPixels(U,V,G,N,Ht.convert(zt),Ht.convert(Vt),0);let jt=R!==null?xt.get(R).__webglFramebuffer:null;lt.bindFramebuffer(I.FRAMEBUFFER,jt);let he=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await If(I,he,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Ct),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ot),I.deleteBuffer(Ct),I.deleteSync(he),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,U=null,V=0){w.isTexture!==!0&&(Ts("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,w=arguments[1]);let G=Math.pow(2,-V),N=Math.floor(w.image.width*G),ot=Math.floor(w.image.height*G),gt=U!==null?U.x:0,Et=U!==null?U.y:0;T.setTexture2D(w,0),I.copyTexSubImage2D(I.TEXTURE_2D,V,0,0,gt,Et,N,ot),lt.unbindTexture()},this.copyTextureToTexture=function(w,U,V=null,G=null,N=0){w.isTexture!==!0&&(Ts("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,w=arguments[1],U=arguments[2],N=arguments[3]||0,V=null);let ot,gt,Et,At,zt,Vt,Ct,jt,he,ue=w.isCompressedTexture?w.mipmaps[N]:w.image;V!==null?(ot=V.max.x-V.min.x,gt=V.max.y-V.min.y,Et=V.isBox3?V.max.z-V.min.z:1,At=V.min.x,zt=V.min.y,Vt=V.isBox3?V.min.z:0):(ot=ue.width,gt=ue.height,Et=ue.depth||1,At=0,zt=0,Vt=0),G!==null?(Ct=G.x,jt=G.y,he=G.z):(Ct=0,jt=0,he=0);let ke=Ht.convert(U.format),ee=Ht.convert(U.type),It;U.isData3DTexture?(T.setTexture3D(U,0),It=I.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(T.setTexture2DArray(U,0),It=I.TEXTURE_2D_ARRAY):(T.setTexture2D(U,0),It=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,U.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,U.unpackAlignment);let xn=I.getParameter(I.UNPACK_ROW_LENGTH),ne=I.getParameter(I.UNPACK_IMAGE_HEIGHT),en=I.getParameter(I.UNPACK_SKIP_PIXELS),wi=I.getParameter(I.UNPACK_SKIP_ROWS),Ge=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,ue.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ue.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,At),I.pixelStorei(I.UNPACK_SKIP_ROWS,zt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Vt);let fs=w.isDataArrayTexture||w.isData3DTexture,de=U.isDataArrayTexture||U.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){let un=xt.get(w),ps=xt.get(U),Ze=xt.get(un.__renderTarget),Dn=xt.get(ps.__renderTarget);lt.bindFramebuffer(I.READ_FRAMEBUFFER,Ze.__webglFramebuffer),lt.bindFramebuffer(I.DRAW_FRAMEBUFFER,Dn.__webglFramebuffer);for(let Un=0;Un<Et;Un++)fs&&I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,xt.get(w).__webglTexture,N,Vt+Un),w.isDepthTexture?(de&&I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,xt.get(U).__webglTexture,N,he+Un),I.blitFramebuffer(At,zt,ot,gt,Ct,jt,ot,gt,I.DEPTH_BUFFER_BIT,I.NEAREST)):de?I.copyTexSubImage3D(It,N,Ct,jt,he+Un,At,zt,ot,gt):I.copyTexSubImage2D(It,N,Ct,jt,he+Un,At,zt,ot,gt);lt.bindFramebuffer(I.READ_FRAMEBUFFER,null),lt.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else de?w.isDataTexture||w.isData3DTexture?I.texSubImage3D(It,N,Ct,jt,he,ot,gt,Et,ke,ee,ue.data):U.isCompressedArrayTexture?I.compressedTexSubImage3D(It,N,Ct,jt,he,ot,gt,Et,ke,ue.data):I.texSubImage3D(It,N,Ct,jt,he,ot,gt,Et,ke,ee,ue):w.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,N,Ct,jt,ot,gt,ke,ee,ue.data):w.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,N,Ct,jt,ue.width,ue.height,ke,ue.data):I.texSubImage2D(I.TEXTURE_2D,N,Ct,jt,ot,gt,ke,ee,ue);I.pixelStorei(I.UNPACK_ROW_LENGTH,xn),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ne),I.pixelStorei(I.UNPACK_SKIP_PIXELS,en),I.pixelStorei(I.UNPACK_SKIP_ROWS,wi),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ge),N===0&&U.generateMipmaps&&I.generateMipmap(It),lt.unbindTexture()},this.copyTextureToTexture3D=function(w,U,V=null,G=null,N=0){return w.isTexture!==!0&&(Ts("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,G=arguments[1]||null,w=arguments[2],U=arguments[3],N=arguments[4]||0),Ts('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,U,V,G,N)},this.initRenderTarget=function(w){xt.get(w).__webglFramebuffer===void 0&&T.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?T.setTextureCube(w,0):w.isData3DTexture?T.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?T.setTexture2DArray(w,0):T.setTexture2D(w,0),lt.unbindTexture()},this.resetState=function(){E=0,C=0,R=null,lt.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}};var qr=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Pt(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Jn=class extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Oe,this.environmentIntensity=1,this.environmentRotation=new Oe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},Zr=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ga,this.updateRanges=[],this.version=0,this.uuid=mn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Ue=new A,Bs=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix4(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyNormalMatrix(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.transformDirection(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=on(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=on(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=on(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=on(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=on(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array),r=re(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ae(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},zs=class extends Zn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Pt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},zi,vs=new A,ki=new A,Vi=new A,Gi=new et,ys=new et,Lh=new Xt,wr=new A,Ms=new A,Tr=new A,Qc=new et,Ko=new et,jc=new et,Jr=class extends De{constructor(t=new zs){if(super(),this.isSprite=!0,this.type="Sprite",zi===void 0){zi=new fe;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Zr(e,5);zi.setIndex([0,1,2,0,2,3]),zi.setAttribute("position",new Bs(n,3,0,!1)),zi.setAttribute("uv",new Bs(n,2,3,!1))}this.geometry=zi,this.material=t,this.center=new et(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ki.setFromMatrixScale(this.matrixWorld),Lh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Vi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ki.multiplyScalar(-Vi.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;Er(wr.set(-.5,-.5,0),Vi,o,ki,s,r),Er(Ms.set(.5,-.5,0),Vi,o,ki,s,r),Er(Tr.set(.5,.5,0),Vi,o,ki,s,r),Qc.set(0,0),Ko.set(1,0),jc.set(1,1);let a=t.ray.intersectTriangle(wr,Ms,Tr,!1,vs);if(a===null&&(Er(Ms.set(-.5,.5,0),Vi,o,ki,s,r),Ko.set(0,1),a=t.ray.intersectTriangle(wr,Tr,Ms,!1,vs),a===null))return;let l=t.ray.origin.distanceTo(vs);l<t.near||l>t.far||e.push({distance:l,point:vs.clone(),uv:Gn.getInterpolation(vs,wr,Ms,Tr,Qc,Ko,jc,new et),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Er(i,t,e,n,s,r){Gi.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(ys.x=r*Gi.x-s*Gi.y,ys.y=s*Gi.x+r*Gi.y):ys.copy(Gi),i.copy(t),i.x+=ys.x,i.y+=ys.y,i.applyMatrix4(Lh)}var sl=class extends Fe{constructor(t=null,e=1,n=1,s,r,o,a,l,c=Xe,h=Xe,u,f){super(null,o,a,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ks=class extends Ae{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Hi=new Xt,th=new Xt,Ar=[],eh=new Rn,E_=new Xt,Ss=new j,bs=new di,Ke=class extends j{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ks(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,E_)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Rn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Hi),eh.copy(t.boundingBox).applyMatrix4(Hi),this.boundingBox.union(eh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new di),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Hi),bs.copy(t.boundingSphere).applyMatrix4(Hi),this.boundingSphere.union(bs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Ss.geometry=this.geometry,Ss.material=this.material,Ss.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),bs.copy(this.boundingSphere),bs.applyMatrix4(n),t.ray.intersectsSphere(bs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Hi),th.multiplyMatrices(n,Hi),Ss.matrixWorld=th,Ss.raycast(t,Ar);for(let o=0,a=Ar.length;o<a;o++){let l=Ar[o];l.instanceId=r,l.object=this,e.push(l)}Ar.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ks(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new sl(new Float32Array(s*this.count),s,this.count,Il,pn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var $n=class extends Fe{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Qe=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let h=n[s],f=n[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new et:new A);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new A,s=[],r=[],o=[],a=new A,l=new Xt;for(let d=0;d<=t;d++){let g=d/t;s[d]=this.getTangentAt(g,new A)}r[0]=new A,o[0]=new A;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(be(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(be(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Vs=class extends Qe{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new et){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},rl=class extends Vs{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Fl(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let f=(o-r)/c-(a-r)/(c+h)+(a-o)/h,d=(a-o)/h-(l-o)/(h+u)+(l-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var Cr=new A,Qo=new Fl,jo=new Fl,ta=new Fl,fi=class extends Qe{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new A){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(Cr.subVectors(s[0],s[1]).add(s[0]),c=Cr);let u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Cr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Cr),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Qo.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,g,_,m),jo.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,g,_,m),ta.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Qo.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),jo.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),ta.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(Qo.calc(l),jo.calc(l),ta.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new A().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function nh(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function A_(i,t){let e=1-i;return e*e*t}function C_(i,t){return 2*(1-i)*i*t}function R_(i,t){return i*i*t}function Is(i,t,e,n){return A_(i,t)+C_(i,e)+R_(i,n)}function I_(i,t){let e=1-i;return e*e*e*t}function P_(i,t){let e=1-i;return 3*e*e*i*t}function L_(i,t){return 3*(1-i)*i*i*t}function D_(i,t){return i*i*i*t}function Ps(i,t,e,n,s){return I_(i,t)+P_(i,e)+L_(i,n)+D_(i,s)}var $r=class extends Qe{constructor(t=new et,e=new et,n=new et,s=new et){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new et){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ps(t,s.x,r.x,o.x,a.x),Ps(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ol=class extends Qe{constructor(t=new A,e=new A,n=new A,s=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new A){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ps(t,s.x,r.x,o.x,a.x),Ps(t,s.y,r.y,o.y,a.y),Ps(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Kr=class extends Qe{constructor(t=new et,e=new et){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new et){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new et){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},al=class extends Qe{constructor(t=new A,e=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new A){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new A){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Qr=class extends Qe{constructor(t=new et,e=new et,n=new et){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new et){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Is(t,s.x,r.x,o.x),Is(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},jr=class extends Qe{constructor(t=new A,e=new A,n=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new A){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Is(t,s.x,r.x,o.x),Is(t,s.y,r.y,o.y),Is(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},rs=class extends Qe{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new et){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(nh(a,l.x,c.x,h.x,u.x),nh(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new et().fromArray(s))}return this}},to=Object.freeze({__proto__:null,ArcCurve:rl,CatmullRomCurve3:fi,CubicBezierCurve:$r,CubicBezierCurve3:ol,EllipseCurve:Vs,LineCurve:Kr,LineCurve3:al,QuadraticBezierCurve:Qr,QuadraticBezierCurve3:jr,SplineCurve:rs}),ll=class extends Qe{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new to[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new to[s.type]().fromJSON(s))}return this}},pi=class extends ll{constructor(t){super(),this.type="Path",this.currentPoint=new et,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Kr(this.currentPoint.clone(),new et(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Qr(this.currentPoint.clone(),new et(t,e),new et(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new $r(this.currentPoint.clone(),new et(t,e),new et(n,s),new et(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new rs(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){let c=new Vs(t,e,n,s,r,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Gs=class i extends fe{constructor(t=[new et(0,-.5),new et(.5,0),new et(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=be(s,0,Math.PI*2);let r=[],o=[],a=[],l=[],c=[],h=1/e,u=new A,f=new et,d=new A,g=new A,_=new A,m=0,p=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:m=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,d.x=p*1,d.y=-m,d.z=p*0,_.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case t.length-1:l.push(_.x,_.y,_.z);break;default:m=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),l.push(d.x,d.y,d.z),_.copy(g)}for(let y=0;y<=e;y++){let v=n+y*h*s,x=Math.sin(v),L=Math.cos(v);for(let E=0;E<=t.length-1;E++){u.x=t[E].x*x,u.y=t[E].y,u.z=t[E].x*L,o.push(u.x,u.y,u.z),f.x=y/e,f.y=E/(t.length-1),a.push(f.x,f.y);let C=l[3*E+0]*x,R=l[3*E+1],b=l[3*E+0]*L;c.push(C,R,b)}}for(let y=0;y<e;y++)for(let v=0;v<t.length-1;v++){let x=v+y*t.length,L=x,E=x+t.length,C=x+t.length+1,R=x+1;r.push(L,E,R),r.push(C,R,E)}this.setIndex(r),this.setAttribute("position",new Ot(o,3)),this.setAttribute("uv",new Ot(a,2)),this.setAttribute("normal",new Ot(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}},mi=class i extends Gs{constructor(t=1,e=1,n=4,s=8){let r=new pi;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new i(t.radius,t.length,t.capSegments,t.radialSegments)}},In=class i extends fe{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],l=[],c=new A,h=new et;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){let d=n+u/e*s;c.x=t*Math.cos(d),c.y=t*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Ot(o,3)),this.setAttribute("normal",new Ot(a,3)),this.setAttribute("uv",new Ot(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},te=class i extends fe{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],d=[],g=0,_=[],m=n/2,p=0;y(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Ot(u,3)),this.setAttribute("normal",new Ot(f,3)),this.setAttribute("uv",new Ot(d,2));function y(){let x=new A,L=new A,E=0,C=(e-t)/n;for(let R=0;R<=r;R++){let b=[],M=R/r,P=M*(e-t)+t;for(let B=0;B<=s;B++){let F=B/s,O=F*l+a,Y=Math.sin(O),k=Math.cos(O);L.x=P*Y,L.y=-M*n+m,L.z=P*k,u.push(L.x,L.y,L.z),x.set(Y,C,k).normalize(),f.push(x.x,x.y,x.z),d.push(F,1-M),b.push(g++)}_.push(b)}for(let R=0;R<s;R++)for(let b=0;b<r;b++){let M=_[b][R],P=_[b+1][R],B=_[b+1][R+1],F=_[b][R+1];(t>0||b!==0)&&(h.push(M,P,F),E+=3),(e>0||b!==r-1)&&(h.push(P,B,F),E+=3)}c.addGroup(p,E,0),p+=E}function v(x){let L=g,E=new et,C=new A,R=0,b=x===!0?t:e,M=x===!0?1:-1;for(let B=1;B<=s;B++)u.push(0,m*M,0),f.push(0,M,0),d.push(.5,.5),g++;let P=g;for(let B=0;B<=s;B++){let O=B/s*l+a,Y=Math.cos(O),k=Math.sin(O);C.x=b*k,C.y=m*M,C.z=b*Y,u.push(C.x,C.y,C.z),f.push(0,M,0),E.x=Y*.5+.5,E.y=k*.5*M+.5,d.push(E.x,E.y),g++}for(let B=0;B<s;B++){let F=L+B,O=P+B;x===!0?h.push(O,O+1,F):h.push(O+1,O,F),R+=3}c.addGroup(p,R,x===!0?1:2),p+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},eo=class i extends te{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},cl=class i extends fe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new Ot(r,3)),this.setAttribute("normal",new Ot(r.slice(),3)),this.setAttribute("uv",new Ot(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(y){let v=new A,x=new A,L=new A;for(let E=0;E<e.length;E+=3)d(e[E+0],v),d(e[E+1],x),d(e[E+2],L),l(v,x,L,y)}function l(y,v,x,L){let E=L+1,C=[];for(let R=0;R<=E;R++){C[R]=[];let b=y.clone().lerp(x,R/E),M=v.clone().lerp(x,R/E),P=E-R;for(let B=0;B<=P;B++)B===0&&R===E?C[R][B]=b:C[R][B]=b.clone().lerp(M,B/P)}for(let R=0;R<E;R++)for(let b=0;b<2*(E-R)-1;b++){let M=Math.floor(b/2);b%2===0?(f(C[R][M+1]),f(C[R+1][M]),f(C[R][M])):(f(C[R][M+1]),f(C[R+1][M+1]),f(C[R+1][M]))}}function c(y){let v=new A;for(let x=0;x<r.length;x+=3)v.x=r[x+0],v.y=r[x+1],v.z=r[x+2],v.normalize().multiplyScalar(y),r[x+0]=v.x,r[x+1]=v.y,r[x+2]=v.z}function h(){let y=new A;for(let v=0;v<r.length;v+=3){y.x=r[v+0],y.y=r[v+1],y.z=r[v+2];let x=m(y)/2/Math.PI+.5,L=p(y)/Math.PI+.5;o.push(x,1-L)}g(),u()}function u(){for(let y=0;y<o.length;y+=6){let v=o[y+0],x=o[y+2],L=o[y+4],E=Math.max(v,x,L),C=Math.min(v,x,L);E>.9&&C<.1&&(v<.2&&(o[y+0]+=1),x<.2&&(o[y+2]+=1),L<.2&&(o[y+4]+=1))}}function f(y){r.push(y.x,y.y,y.z)}function d(y,v){let x=y*3;v.x=t[x+0],v.y=t[x+1],v.z=t[x+2]}function g(){let y=new A,v=new A,x=new A,L=new A,E=new et,C=new et,R=new et;for(let b=0,M=0;b<r.length;b+=9,M+=6){y.set(r[b+0],r[b+1],r[b+2]),v.set(r[b+3],r[b+4],r[b+5]),x.set(r[b+6],r[b+7],r[b+8]),E.set(o[M+0],o[M+1]),C.set(o[M+2],o[M+3]),R.set(o[M+4],o[M+5]),L.copy(y).add(v).add(x).divideScalar(3);let P=m(L);_(E,M+0,y,P),_(C,M+2,v,P),_(R,M+4,x,P)}}function _(y,v,x,L){L<0&&y.x===1&&(o[v]=y.x-1),x.x===0&&x.z===0&&(o[v]=L/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.details)}};var Pn=class extends pi{constructor(t){super(t),this.uuid=mn(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new pi().fromJSON(s))}return this}},U_={triangulate:function(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=Dh(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,u,f,d;if(n&&(r=z_(i,t,r,e)),i.length>80*e){a=c=i[0],l=h=i[1];for(let g=e;g<s;g+=e)u=i[g],f=i[g+1],u<a&&(a=u),f<l&&(l=f),u>c&&(c=u),f>h&&(h=f);d=Math.max(c-a,h-l),d=d!==0?32767/d:0}return Hs(r,o,e,a,l,d,0),o}};function Dh(i,t,e,n,s){let r,o;if(s===$_(i,t,e,n)>0)for(r=t;r<e;r+=n)o=ih(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=ih(r,i[r],i[r+1],o);return o&&po(o,o.next)&&(Xs(o),o=o.next),o}function gi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(po(e,e.next)||_e(e.prev,e,e.next)===0)){if(Xs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Hs(i,t,e,n,s,r,o){if(!i)return;!o&&r&&W_(i,n,s,r);let a=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?F_(i,n,s,r):N_(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(c.i/e|0),Xs(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=O_(gi(i),t,e),Hs(i,t,e,n,s,r,2)):o===2&&B_(i,t,e,n,s,r):Hs(gi(i),t,e,n,s,r,1);break}}}function N_(i){let t=i.prev,e=i,n=i.next;if(_e(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<l?a<c?a:c:l<c?l:c,f=s>r?s>o?s:o:r>o?r:o,d=a>l?a>c?a:c:l>c?l:c,g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&Xi(s,a,r,l,o,c,g.x,g.y)&&_e(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function F_(i,t,e,n){let s=i.prev,r=i,o=i.next;if(_e(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,h=s.y,u=r.y,f=o.y,d=a<l?a<c?a:c:l<c?l:c,g=h<u?h<f?h:f:u<f?u:f,_=a>l?a>c?a:c:l>c?l:c,m=h>u?h>f?h:f:u>f?u:f,p=hl(d,g,t,e,n),y=hl(_,m,t,e,n),v=i.prevZ,x=i.nextZ;for(;v&&v.z>=p&&x&&x.z<=y;){if(v.x>=d&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Xi(a,h,l,u,c,f,v.x,v.y)&&_e(v.prev,v,v.next)>=0||(v=v.prevZ,x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&Xi(a,h,l,u,c,f,x.x,x.y)&&_e(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;v&&v.z>=p;){if(v.x>=d&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Xi(a,h,l,u,c,f,v.x,v.y)&&_e(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;x&&x.z<=y;){if(x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&Xi(a,h,l,u,c,f,x.x,x.y)&&_e(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function O_(i,t,e){let n=i;do{let s=n.prev,r=n.next.next;!po(s,r)&&Uh(s,n,n.next,r)&&Ws(s,r)&&Ws(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Xs(n),Xs(n.next),n=i=r),n=n.next}while(n!==i);return gi(n)}function B_(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&q_(o,a)){let l=Nh(o,a);o=gi(o,o.next),l=gi(l,l.next),Hs(o,t,e,n,s,r,0),Hs(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function z_(i,t,e,n){let s=[],r,o,a,l,c;for(r=0,o=t.length;r<o;r++)a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,c=Dh(i,a,l,n,!1),c===c.next&&(c.steiner=!0),s.push(Y_(c));for(s.sort(k_),r=0;r<s.length;r++)e=V_(s[r],e);return e}function k_(i,t){return i.x-t.x}function V_(i,t){let e=G_(i,t);if(!e)return t;let n=Nh(e,i);return gi(n,n.next),gi(e,e.next)}function G_(i,t){let e=t,n=-1/0,s,r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){let f=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>n&&(n=f,s=e.x<e.next.x?e:e.next,f===r))return s}e=e.next}while(e!==t);if(!s)return null;let a=s,l=s.x,c=s.y,h=1/0,u;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&Xi(o<c?r:n,o,l,c,o<c?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),Ws(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&H_(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function H_(i,t){return _e(i.prev,i,t.prev)<0&&_e(t.next,i,i.next)<0}function W_(i,t,e,n){let s=i;do s.z===0&&(s.z=hl(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,X_(s)}function X_(i){let t,e,n,s,r,o,a,l,c=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,c*=2}while(o>1);return i}function hl(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Y_(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Xi(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function q_(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Z_(i,t)&&(Ws(i,t)&&Ws(t,i)&&J_(i,t)&&(_e(i.prev,i,t.prev)||_e(i,t.prev,t))||po(i,t)&&_e(i.prev,i,i.next)>0&&_e(t.prev,t,t.next)>0)}function _e(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function po(i,t){return i.x===t.x&&i.y===t.y}function Uh(i,t,e,n){let s=Ir(_e(i,t,e)),r=Ir(_e(i,t,n)),o=Ir(_e(e,n,i)),a=Ir(_e(e,n,t));return!!(s!==r&&o!==a||s===0&&Rr(i,e,t)||r===0&&Rr(i,n,t)||o===0&&Rr(e,i,n)||a===0&&Rr(e,t,n))}function Rr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Ir(i){return i>0?1:i<0?-1:0}function Z_(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Uh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Ws(i,t){return _e(i.prev,i,i.next)<0?_e(i,t,i.next)>=0&&_e(i,i.prev,t)>=0:_e(i,t,i.prev)<0||_e(i,i.next,t)<0}function J_(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Nh(i,t){let e=new ul(i.i,i.x,i.y),n=new ul(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function ih(i,t,e,n){let s=new ul(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Xs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function ul(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function $_(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Xn=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];sh(t),rh(n,t);let o=t.length;e.forEach(sh);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,rh(n,e[l]);let a=U_.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function sh(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function rh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var no=class i extends fe{constructor(t=new Pn([new et(.5,.5),new et(-.5,.5),new et(-.5,-.5),new et(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){let c=t[a];o(c)}this.setAttribute("position",new Ot(s,3)),this.setAttribute("uv",new Ot(r,2)),this.computeVertexNormals();function o(a){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,y=e.UVGenerator!==void 0?e.UVGenerator:K_,v,x=!1,L,E,C,R;p&&(v=p.getSpacedPoints(h),x=!0,f=!1,L=p.computeFrenetFrames(h,!1),E=new A,C=new A,R=new A),f||(m=0,d=0,g=0,_=0);let b=a.extractPoints(c),M=b.shape,P=b.holes;if(!Xn.isClockWise(M)){M=M.reverse();for(let $=0,rt=P.length;$<rt;$++){let I=P[$];Xn.isClockWise(I)&&(P[$]=I.reverse())}}let F=Xn.triangulateShape(M,P),O=M;for(let $=0,rt=P.length;$<rt;$++){let I=P[$];M=M.concat(I)}function Y($,rt,I){return rt||console.error("THREE.ExtrudeGeometry: vec does not exist"),$.clone().addScaledVector(rt,I)}let k=M.length,nt=F.length;function H($,rt,I){let Rt,it,Mt,lt=$.x-rt.x,Nt=$.y-rt.y,xt=I.x-$.x,T=I.y-$.y,S=lt*lt+Nt*Nt,z=lt*T-Nt*xt;if(Math.abs(z)>Number.EPSILON){let q=Math.sqrt(S),Q=Math.sqrt(xt*xt+T*T),Z=rt.x-Nt/q,Tt=rt.y+lt/q,ht=I.x-T/Q,vt=I.y+xt/Q,Zt=((ht-Z)*T-(vt-Tt)*xt)/(lt*T-Nt*xt);Rt=Z+lt*Zt-$.x,it=Tt+Nt*Zt-$.y;let st=Rt*Rt+it*it;if(st<=2)return new et(Rt,it);Mt=Math.sqrt(st/2)}else{let q=!1;lt>Number.EPSILON?xt>Number.EPSILON&&(q=!0):lt<-Number.EPSILON?xt<-Number.EPSILON&&(q=!0):Math.sign(Nt)===Math.sign(T)&&(q=!0),q?(Rt=-Nt,it=lt,Mt=Math.sqrt(S)):(Rt=lt,it=Nt,Mt=Math.sqrt(S/2))}return new et(Rt/Mt,it/Mt)}let at=[];for(let $=0,rt=O.length,I=rt-1,Rt=$+1;$<rt;$++,I++,Rt++)I===rt&&(I=0),Rt===rt&&(Rt=0),at[$]=H(O[$],O[I],O[Rt]);let pt=[],yt,Dt=at.concat();for(let $=0,rt=P.length;$<rt;$++){let I=P[$];yt=[];for(let Rt=0,it=I.length,Mt=it-1,lt=Rt+1;Rt<it;Rt++,Mt++,lt++)Mt===it&&(Mt=0),lt===it&&(lt=0),yt[Rt]=H(I[Rt],I[Mt],I[lt]);pt.push(yt),Dt=Dt.concat(yt)}for(let $=0;$<m;$++){let rt=$/m,I=d*Math.cos(rt*Math.PI/2),Rt=g*Math.sin(rt*Math.PI/2)+_;for(let it=0,Mt=O.length;it<Mt;it++){let lt=Y(O[it],at[it],Rt);tt(lt.x,lt.y,-I)}for(let it=0,Mt=P.length;it<Mt;it++){let lt=P[it];yt=pt[it];for(let Nt=0,xt=lt.length;Nt<xt;Nt++){let T=Y(lt[Nt],yt[Nt],Rt);tt(T.x,T.y,-I)}}}let Jt=g+_;for(let $=0;$<k;$++){let rt=f?Y(M[$],Dt[$],Jt):M[$];x?(C.copy(L.normals[0]).multiplyScalar(rt.x),E.copy(L.binormals[0]).multiplyScalar(rt.y),R.copy(v[0]).add(C).add(E),tt(R.x,R.y,R.z)):tt(rt.x,rt.y,0)}for(let $=1;$<=h;$++)for(let rt=0;rt<k;rt++){let I=f?Y(M[rt],Dt[rt],Jt):M[rt];x?(C.copy(L.normals[$]).multiplyScalar(I.x),E.copy(L.binormals[$]).multiplyScalar(I.y),R.copy(v[$]).add(C).add(E),tt(R.x,R.y,R.z)):tt(I.x,I.y,u/h*$)}for(let $=m-1;$>=0;$--){let rt=$/m,I=d*Math.cos(rt*Math.PI/2),Rt=g*Math.sin(rt*Math.PI/2)+_;for(let it=0,Mt=O.length;it<Mt;it++){let lt=Y(O[it],at[it],Rt);tt(lt.x,lt.y,u+I)}for(let it=0,Mt=P.length;it<Mt;it++){let lt=P[it];yt=pt[it];for(let Nt=0,xt=lt.length;Nt<xt;Nt++){let T=Y(lt[Nt],yt[Nt],Rt);x?tt(T.x,T.y+v[h-1].y,v[h-1].x+I):tt(T.x,T.y,u+I)}}}X(),J();function X(){let $=s.length/3;if(f){let rt=0,I=k*rt;for(let Rt=0;Rt<nt;Rt++){let it=F[Rt];wt(it[2]+I,it[1]+I,it[0]+I)}rt=h+m*2,I=k*rt;for(let Rt=0;Rt<nt;Rt++){let it=F[Rt];wt(it[0]+I,it[1]+I,it[2]+I)}}else{for(let rt=0;rt<nt;rt++){let I=F[rt];wt(I[2],I[1],I[0])}for(let rt=0;rt<nt;rt++){let I=F[rt];wt(I[0]+k*h,I[1]+k*h,I[2]+k*h)}}n.addGroup($,s.length/3-$,0)}function J(){let $=s.length/3,rt=0;ut(O,rt),rt+=O.length;for(let I=0,Rt=P.length;I<Rt;I++){let it=P[I];ut(it,rt),rt+=it.length}n.addGroup($,s.length/3-$,1)}function ut($,rt){let I=$.length;for(;--I>=0;){let Rt=I,it=I-1;it<0&&(it=$.length-1);for(let Mt=0,lt=h+m*2;Mt<lt;Mt++){let Nt=k*Mt,xt=k*(Mt+1),T=rt+Rt+Nt,S=rt+it+Nt,z=rt+it+xt,q=rt+Rt+xt;Ut(T,S,z,q)}}}function tt($,rt,I){l.push($),l.push(rt),l.push(I)}function wt($,rt,I){Lt($),Lt(rt),Lt(I);let Rt=s.length/3,it=y.generateTopUV(n,s,Rt-3,Rt-2,Rt-1);Yt(it[0]),Yt(it[1]),Yt(it[2])}function Ut($,rt,I,Rt){Lt($),Lt(rt),Lt(Rt),Lt(rt),Lt(I),Lt(Rt);let it=s.length/3,Mt=y.generateSideWallUV(n,s,it-6,it-3,it-2,it-1);Yt(Mt[0]),Yt(Mt[1]),Yt(Mt[3]),Yt(Mt[1]),Yt(Mt[2]),Yt(Mt[3])}function Lt($){s.push(l[$*3+0]),s.push(l[$*3+1]),s.push(l[$*3+2])}function Yt($){r.push($.x),r.push($.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Q_(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new to[s.type]().fromJSON(s)),new i(n,t.options)}},K_={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new et(r,o),new et(a,l),new et(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[s*3],d=t[s*3+1],g=t[s*3+2],_=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new et(o,1-l),new et(c,1-u),new et(f,1-g),new et(_,1-p)]:[new et(a,1-l),new et(h,1-u),new et(d,1-g),new et(m,1-p)]}};function Q_(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Ys=class i extends cl{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var qs=class i extends fe{constructor(t=new Pn([new et(0,.5),new et(-.5,-.5),new et(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],o=[],a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Ot(s,3)),this.setAttribute("normal",new Ot(r,3)),this.setAttribute("uv",new Ot(o,2));function c(h){let u=s.length/3,f=h.extractPoints(e),d=f.shape,g=f.holes;Xn.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=g.length;m<p;m++){let y=g[m];Xn.isClockWise(y)===!0&&(g[m]=y.reverse())}let _=Xn.triangulateShape(d,g);for(let m=0,p=g.length;m<p;m++){let y=g[m];d=d.concat(y)}for(let m=0,p=d.length;m<p;m++){let y=d[m];s.push(y.x,y.y,0),r.push(0,0,1),o.push(y.x,y.y)}for(let m=0,p=_.length;m<p;m++){let y=_[m],v=y[0]+u,x=y[1]+u,L=y[2]+u;n.push(v,x,L),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return j_(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let o=e[t.shapes[s]];n.push(o)}return new i(n,t.curveSegments)}};function j_(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}var Be=class i extends fe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new A,f=new A,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){let y=[],v=p/n,x=0;p===0&&o===0?x=.5/e:p===n&&l===Math.PI&&(x=-.5/e);for(let L=0;L<=e;L++){let E=L/e;u.x=-t*Math.cos(s+E*r)*Math.sin(o+v*a),u.y=t*Math.cos(o+v*a),u.z=t*Math.sin(s+E*r)*Math.sin(o+v*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),m.push(E+x,1-v),y.push(c++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){let v=h[p][y+1],x=h[p][y],L=h[p+1][y],E=h[p+1][y+1];(p!==0||o>0)&&d.push(v,x,E),(p!==n-1||l<Math.PI)&&d.push(x,L,E)}this.setIndex(d),this.setAttribute("position",new Ot(g,3)),this.setAttribute("normal",new Ot(_,3)),this.setAttribute("uv",new Ot(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var os=class i extends fe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],l=[],c=[],h=new A,u=new A,f=new A;for(let d=0;d<=n;d++)for(let g=0;g<=s;g++){let _=g/s*r,m=d/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(_),u.y=(t+e*Math.cos(m))*Math.sin(_),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(g/s),c.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=s;g++){let _=(s+1)*d+g-1,m=(s+1)*(d-1)+g-1,p=(s+1)*(d-1)+g,y=(s+1)*d+g;o.push(_,m,y),o.push(m,p,y)}this.setIndex(o),this.setAttribute("position",new Ot(a,3)),this.setAttribute("normal",new Ot(l,3)),this.setAttribute("uv",new Ot(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var io=class i extends fe{constructor(t=new jr(new A(-1,-1,0),new A(-1,1,0),new A(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new A,l=new A,c=new et,h=new A,u=[],f=[],d=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new Ot(u,3)),this.setAttribute("normal",new Ot(f,3)),this.setAttribute("uv",new Ot(d,2));function _(){for(let v=0;v<e;v++)m(v);m(r===!1?e:0),y(),p()}function m(v){h=t.getPointAt(v/e,h);let x=o.normals[v],L=o.binormals[v];for(let E=0;E<=s;E++){let C=E/s*Math.PI*2,R=Math.sin(C),b=-Math.cos(C);l.x=b*x.x+R*L.x,l.y=b*x.y+R*L.y,l.z=b*x.z+R*L.z,l.normalize(),f.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function p(){for(let v=1;v<=e;v++)for(let x=1;x<=s;x++){let L=(s+1)*(v-1)+(x-1),E=(s+1)*v+(x-1),C=(s+1)*v+x,R=(s+1)*(v-1)+x;g.push(L,E,R),g.push(E,C,R)}}function y(){for(let v=0;v<=e;v++)for(let x=0;x<=s;x++)c.x=v/e,c.y=x/s,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new to[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var ft=class extends Zn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Pt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sh,this.normalScale=new et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Oe,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},as=class extends ft{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new et(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return be(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Pt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Pt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Pt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};function Pr(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function tx(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var ls=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},dl=class extends ls{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:nc,endingEnd:nc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case ic:r=t,a=2*e-n;break;case sc:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ic:o=t,l=2*n-e;break;case sc:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-e)/(s-e),_=g*g,m=_*g,p=-f*m+2*f*_-f*g,y=(1+f)*m+(-1.5-2*f)*_+(-.5+f)*g+1,v=(-1-d)*m+(1.5+d)*_+.5*g,x=d*m-d*_;for(let L=0;L!==a;++L)r[L]=p*o[h+L]+y*o[c+L]+v*o[l+L]+x*o[u+L];return r}},fl=class extends ls{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(s-e),u=1-h;for(let f=0;f!==a;++f)r[f]=o[c+f]*u+o[l+f]*h;return r}},pl=class extends ls{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},ln=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Pr(e,this.TimeBufferType),this.values=Pr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Pr(t.times,Array),values:Pr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new pl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new fl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new dl(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Or:e=this.InterpolantFactoryMethodDiscrete;break;case Va:e=this.InterpolantFactoryMethodLinear;break;case wo:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Or;case this.InterpolantFactoryMethodLinear:return Va;case this.InterpolantFactoryMethodSmooth:return wo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&tx(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===wo,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let u=a*n,f=u-n,d=u+n;for(let g=0;g!==n;++g){let _=e[u+g];if(_!==e[f+g]||_!==e[d+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*n,f=o*n;for(let d=0;d!==n;++d)e[f+d]=e[u+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};ln.prototype.TimeBufferType=Float32Array;ln.prototype.ValueBufferType=Float32Array;ln.prototype.DefaultInterpolation=Va;var _i=class extends ln{constructor(t,e,n){super(t,e,n)}};_i.prototype.ValueTypeName="bool";_i.prototype.ValueBufferType=Array;_i.prototype.DefaultInterpolation=Or;_i.prototype.InterpolantFactoryMethodLinear=void 0;_i.prototype.InterpolantFactoryMethodSmooth=void 0;var ml=class extends ln{};ml.prototype.ValueTypeName="color";var gl=class extends ln{};gl.prototype.ValueTypeName="number";var _l=class extends ls{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)Ye.slerpFlat(r,0,o,c-a,o,c,l);return r}},so=class extends ln{InterpolantFactoryMethodLinear(t){return new _l(this.times,this.values,this.getValueSize(),t)}};so.prototype.ValueTypeName="quaternion";so.prototype.InterpolantFactoryMethodSmooth=void 0;var xi=class extends ln{constructor(t,e,n){super(t,e,n)}};xi.prototype.ValueTypeName="string";xi.prototype.ValueBufferType=Array;xi.prototype.DefaultInterpolation=Or;xi.prototype.InterpolantFactoryMethodLinear=void 0;xi.prototype.InterpolantFactoryMethodSmooth=void 0;var xl=class extends ln{};xl.prototype.ValueTypeName="vector";var oh={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},vl=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){let d=c[u],g=c[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null}}},ex=new vl,Zs=class{constructor(t){this.manager=t!==void 0?t:ex,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Zs.DEFAULT_MATERIAL_NAME="__DEFAULT";var yl=class extends Zs{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=oh.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;let a=Us("img");function l(){h(),oh.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(u){h(),s&&s(u),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}};var ro=class extends Zs{constructor(t){super(t)}load(t,e,n,s){let r=new Fe,o=new yl(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},Js=class extends De{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Pt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},oo=class extends Js{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Pt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},ea=new Xt,ah=new A,lh=new A,ao=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new et(512,512),this.map=null,this.mapPass=null,this.matrix=new Xt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Os,this._frameExtents=new et(1,1),this._viewportCount=1,this._viewports=[new ae(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;ah.setFromMatrixPosition(t.matrixWorld),e.position.copy(ah),lh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(lh),e.updateMatrixWorld(),ea.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ea),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ea)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var ch=new Xt,ws=new A,na=new A,Ml=class extends ao{constructor(){super(new Pe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new et(4,2),this._viewportCount=6,this._viewports=[new ae(2,1,1,1),new ae(0,1,1,1),new ae(3,1,1,1),new ae(1,1,1,1),new ae(3,0,1,1),new ae(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ws.setFromMatrixPosition(t.matrixWorld),n.position.copy(ws),na.copy(n.position),na.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(na),n.updateMatrixWorld(),s.makeTranslation(-ws.x,-ws.y,-ws.z),ch.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ch)}},lo=class extends Js{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Ml}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Sl=class extends ao{constructor(){super(new ns(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},co=class extends Js{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.shadow=new Sl}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var Ol="\\[\\]\\.:\\/",nx=new RegExp("["+Ol+"]","g"),Bl="[^"+Ol+"]",ix="[^"+Ol.replace("\\.","")+"]",sx=/((?:WC+[\/:])*)/.source.replace("WC",Bl),rx=/(WCOD+)?/.source.replace("WCOD",ix),ox=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Bl),ax=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Bl),lx=new RegExp("^"+sx+rx+ox+ax+"$"),cx=["material","materials","bones","map"],bl=class{constructor(t,e,n){let s=n||me.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},me=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(nx,"")}static parseTrackName(t){let e=lx.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);cx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};me.Composite=bl;me.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};me.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};me.prototype.GetterByBindingType=[me.prototype._getValue_direct,me.prototype._getValue_array,me.prototype._getValue_arrayElement,me.prototype._getValue_toArray];me.prototype.SetterByBindingTypeAndVersioning=[[me.prototype._setValue_direct,me.prototype._setValue_direct_setNeedsUpdate,me.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[me.prototype._setValue_array,me.prototype._setValue_array_setNeedsUpdate,me.prototype._setValue_array_setMatrixWorldNeedsUpdate],[me.prototype._setValue_arrayElement,me.prototype._setValue_arrayElement_setNeedsUpdate,me.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[me.prototype._setValue_fromArray,me.prototype._setValue_fromArray_setNeedsUpdate,me.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Kv=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wl);var Se=(i,t,e)=>({rel:[i,t,e]}),ve=(i,t,e)=>({abs:[i,t,e]}),Fh=[{u:0,pos:ve(321.2,.7,211.4),tgt:ve(330,.95,205.7),fov:34},{u:.085,pos:ve(320.2,.74,211.6),tgt:ve(326.2,.92,205.8),fov:34},{u:.115,pos:Se(-1.5,1.25,-5.5),tgt:Se(.5,.85,0),fov:38},{u:.15,pos:Se(-9,2.4,-7),tgt:Se(3,.8,0),fov:38},{u:.18,pos:Se(-5.5,1.8,-7.2),tgt:Se(1,.9,0),fov:39},{u:.2,pos:ve(-65.3,1.5,197.5),tgt:ve(-58.3,1,187),fov:40},{u:.315,pos:ve(-64.6,1.55,197.3),tgt:ve(-58.4,1,187.1),fov:40},{u:.345,pos:ve(-120,60,330),tgt:ve(-140,0,120),fov:44},{u:.375,pos:ve(40,620,560),tgt:ve(-10,0,40),fov:46},{u:.4,pos:ve(-380,220,420),tgt:ve(-520,0,120),fov:42},{u:.425,pos:Se(4,1.6,-11),tgt:Se(.3,.7,0),fov:38},{u:.56,pos:Se(1,1.7,-11.5),tgt:Se(.6,.7,0),fov:38},{u:.59,pos:Se(-12,3.2,-4),tgt:Se(6,1,0),fov:40},{u:.635,pos:Se(-11,3,4),tgt:Se(5,1,0),fov:40},{u:.665,pos:ve(-2.6,1.3,133.4),tgt:ve(-7.8,.75,124.3),fov:36},{u:.79,pos:ve(-1.6,1.32,133),tgt:ve(-6.6,.75,124.3),fov:36},{u:.815,pos:Se(-8,2,5),tgt:Se(3,.9,0),fov:38},{u:.84,pos:Se(-4,2.2,7),tgt:Se(2,.9,0),fov:40},{u:.865,pos:Se(6.5,1.25,4.5),tgt:Se(0,.8,0),fov:37},{u:.885,pos:ve(10.6,1.12,188.4),tgt:ve(18,.8,192.4),fov:36},{u:1,pos:ve(9.2,1.1,188.9),tgt:ve(15.6,.8,192.4),fov:35}],Oh=[346,.5,214.4],Bh=30;var qe=(i,t,e)=>i+(t-i)*e,qt=(i,t,e)=>Math.min(e,Math.max(t,i)),cn=i=>i*i*(3-2*i),zh=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2;function us(i){let t=i.map(r=>r[0]),e=i.map(r=>r[1]),n=i.length,s=e.map((r,o)=>o===0?(e[1]-e[0])/(t[1]-t[0]):o===n-1?(e[n-1]-e[n-2])/(t[n-1]-t[n-2]):(e[o+1]-e[o-1])/(t[o+1]-t[o-1]));return r=>{if(r<=t[0])return e[0];if(r>=t[n-1])return e[n-1];let o=0;for(;r>t[o+1];)o++;let a=t[o+1]-t[o],l=(r-t[o])/a,c=l*l,h=c*l;return(2*h-3*c+1)*e[o]+(h-2*c+l)*a*s[o]+(-2*h+3*c)*e[o+1]+(h-c)*a*s[o+1]}}function Ks(i,t,e){let n=i.length;if(e<=0)return(t[1]-t[0])/(i[1]-i[0]);if(e>=n-1)return(t[n-1]-t[n-2])/(i[n-1]-i[n-2]);let s=(t[e]-t[e-1])/(i[e]-i[e-1]),r=(t[e+1]-t[e])/(i[e+1]-i[e]);if(s*r<=0)return 0;let o=i[e]-i[e-1],a=i[e+1]-i[e],l=2*a+o,c=a+2*o;return(l+c)/(l/s+c/r)}function mo(i,t,e,n,s,r,o){let a=t-i,l=(o-i)/a,c=l*l,h=c*l;return(2*h-3*c+1)*e+(h-2*c+l)*a*s+(3*c-2*h)*n+(h-c)*a*r}var hx=1.6,ux=2.2;function dx(i,t){let e=Math.max(1,Math.sqrt(hx/t));return e>1?2*Math.atan(Math.tan(i*Math.PI/360)*Math.min(ux,e))*180/Math.PI:i}function kh(i,t,e){let n=t.map(u=>u.u),s=[[],[],[],[],[],[],[]],r=new A,o=new A,a=new A;function l(u,f){let d=u[f];if(d.abs)return r.set(...d.abs).clone();let[g,_,m]=d.rel;return e.p.clone().addScaledVector(e.f,g).addScaledVector(e.r,m).setY(_+e.p.y)}function c(u,f,d){let g=qt(u,0,1),_=0;for(;_<t.length-2&&g>n[_+1];)_++;for(let p=Math.max(0,_-1);p<=Math.min(t.length-1,_+2);p++){let y=l(t[p],"pos"),v=l(t[p],"tgt");s[0][p]=y.x,s[1][p]=y.y,s[2][p]=y.z,s[3][p]=v.x,s[4][p]=v.y,s[5][p]=v.z,s[6][p]=t[p].fov}let m=p=>mo(n[_],n[_+1],s[p][_],s[p][_+1],Ks(n,s[p],_),Ks(n,s[p],_+1),g);return f.set(m(0),m(1),m(2)),d.set(m(3),m(4),m(5)),m(6)}function h({progress:u,introEase:f,clock:d,debugCam:g,width:_,height:m,framingX:p,framingY:y}){let v=new A,x=new A,L=c(u,v,x);if(g&&(v.set(...g.pos),x.set(...g.tgt),L=g.fov||L),f<1){let C=new A(...Oh);v.lerpVectors(C,v,f),L=qe(Bh,L,f)}let E=Math.sin(d*.23)*.12;v.y+=E*.3,o.copy(v),a.copy(x),L=dx(L,i.aspect),i.position.copy(o),i.lookAt(a),i.fov=L,p||y?i.setViewOffset(_,m,-p*_,y*m,_,m):i.clearViewOffset(),i.updateProjectionMatrix()}return{position:o,target:a,evaluateShots:c,update:h}}var fx=[[560,206],[470,206],[400,206],[330,206],[290,205],[250,201],[215,196.5],[170,194.4],[80,194.2],[10,194.2],[-28,193.2],[-48,190.4],[-60,189.2],[-74,189.4],[-98,191.6],[-140,194.2],[-220,194.4],[-292,194.6],[-340,197.4],[-392,201.2],[-440,204.6],[-490,205.8]],px=3,mx=286,gx=3,_x=[[-64,61],[-61,78],[-56,96],[-44,112],[-26,121],[-8,124.5],[14,126],[48,132],[76,146],[86,166],[84,182],[74,189.8],[56,192.4],[34,192.6],[18,192.6],[4,192.6]];function Vh(i){let t=[],e=(r,o)=>t.push(new A(r,0,o));for(let[r,o]of fx)e(r,o);let n=i.length;for(let r=px;r<=mx;r+=gx){let o=i[r%n];e(o[0],o[1])}for(let[r,o]of _x)e(r,o);let s=new fi(t,!1,"centripetal",.5);return s.arcLengthDivisions=16e3,s}function Kn(i,t,e){let n=i.getLength(),s=0,r=1e9,o=new A;for(let a=0;a<=4e3;a++){i.getPointAt(a/4e3,o);let l=(o.x-t)**2+(o.z-e)**2;l<r&&(r=l,s=a/4e3)}return s*n}var xx=15282981;function vx(i,t,e){let n=t/2,s=[[e+.01,-n+.018],[e+.05,-n-.004],[i-.09,-n-.012],[i-.035,-n-.006],[i-.008,-n+.02],[i,-n+.055],[i+.002,0],[i,n-.055],[i-.008,n-.02],[i-.035,n+.006],[i-.09,n+.012],[e+.05,n+.004],[e+.01,n-.018]],r=new rs(s.map(([a,l])=>new et(a,l))).getPoints(60),o=new Gs(r,64);return o.rotateX(Math.PI/2),o}function yx(i,t=10){let e=new Pn;e.absarc(0,0,i,0,Math.PI*2,!1);let n=i*.86,s=i*.32,r=Math.PI*2/t;for(let a=0;a<t;a++){let l=a*r+r*.17,c=(a+1)*r-r*.17,h=new pi;h.moveTo(Math.cos(l)*s*1.25,Math.sin(l)*s*1.25),h.absarc(0,0,n,l+.04,c-.04,!1),h.lineTo(Math.cos(c)*s*1.25,Math.sin(c)*s*1.25),h.closePath(),e.holes.push(h)}let o=new no(e,{depth:.035,bevelEnabled:!0,bevelThickness:.008,bevelSize:.006,bevelSegments:2,curveSegments:40});return o.translate(0,0,-.035),o}function Gh({r:i=.41,w:t=.33,front:e=!1,side:n=1,mats:s}){let r=i*.69,o=new Kt,a=new Kt;o.add(a);let l=new j(vx(i,t,r),s.rubber);l.castShadow=!0,a.add(l);let c=new j(yx(r*.985),s.rim);c.castShadow=!0,c.position.z=n*(t/2-.045),n<0&&(c.rotation.y=Math.PI),a.add(c);let h=new j(new te(r*.99,r*.99,t*.9,40,1,!0),s.barrel);h.rotation.x=Math.PI/2,a.add(h);let u=new j(new te(.05,.058,.06,6),s.nut);u.rotation.x=Math.PI/2,u.position.z=n*(t/2-.02),a.add(u);let f=new j(new te(r*.82,r*.82,.032,48),s.disc);f.rotation.x=Math.PI/2,f.position.z=n*(t/2-.13),a.add(f);let d=new j(new In(r*.985,48),s.blur);d.position.z=n*(t/2-.028),n<0&&(d.rotation.y=Math.PI),d.renderOrder=3,o.add(d);let g=new j(new In(r*.99,40),s.dark);g.position.z=n*(t/2-.2),n<0&&(g.rotation.y=Math.PI),a.add(g);let _=new j(new pe(.2,.11,.07,2,2,2),s.caliper),m=e?.55:Math.PI-.55;return _.position.set(Math.cos(m)*r*.66,Math.sin(m)*r*.66,n*(t/2-.105)),_.rotation.z=m-Math.PI/2,o.add(_),{steer:o,spin:a,r:i,blur:d}}function Mx(){let i=document.createElement("canvas");i.width=i.height=256;let t=i.getContext("2d"),e=128,n=t.createRadialGradient(e,e,0,e,e,e);n.addColorStop(0,"rgba(150,156,162,1)"),n.addColorStop(.18,"rgba(70,74,79,.95)"),n.addColorStop(.32,"rgba(48,51,55,.75)"),n.addColorStop(.7,"rgba(58,61,66,.62)"),n.addColorStop(.86,"rgba(92,96,101,.8)"),n.addColorStop(.95,"rgba(36,38,41,.95)"),n.addColorStop(1,"rgba(20,21,23,1)"),t.fillStyle=n,t.beginPath(),t.arc(e,e,e,0,Math.PI*2),t.fill();let s=new $n(i);return s.colorSpace=Me,s}function Hh(){return{rubber:new ft({color:1513498,roughness:.93,metalness:0}),rim:new ft({color:2369066,roughness:.32,metalness:.85}),barrel:new ft({color:1052947,roughness:.6,metalness:.5,side:ge}),nut:new ft({color:10200234,roughness:.3,metalness:1}),disc:new ft({color:6053990,roughness:.45,metalness:.9}),caliper:new ft({color:xx,roughness:.45,metalness:.15}),dark:new le({color:328966}),well:new le({color:394759,side:ge}),blur:new ft({map:Mx(),transparent:!0,opacity:0,roughness:.35,metalness:.75,depthWrite:!1})}}function gn(i=1){let t=i>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}var vi=new Uint8Array(512);{let i=gn(7),t=[...Array(256).keys()];for(let e=255;e>0;e--){let n=Math.floor(i()*(e+1));[t[e],t[n]]=[t[n],t[e]]}for(let e=0;e<512;e++)vi[e]=t[e&255]}var Wh=i=>i*i*i*(i*(i*6-15)+10),go=(i,t,e)=>(i&1?-t:t)+(i&2?-e:e);function Sx(i,t){let e=Math.floor(i)&255,n=Math.floor(t)&255;i-=Math.floor(i),t-=Math.floor(t);let s=Wh(i),r=Wh(t),o=vi[e]+n,a=vi[e+1]+n,l=(c,h,u)=>c+(h-c)*u;return l(l(go(vi[o],i,t),go(vi[a],i-1,t),s),l(go(vi[o+1],i,t-1),go(vi[a+1],i-1,t-1),s),r)}function hn(i,t,e=4){let n=.5,s=1,r=0;for(let o=0;o<e;o++)r+=n*Sx(i*s,t*s),n*=.5,s*=2.03;return r}function je(i,t,e,{repeat:n=!0,srgb:s=!0,aniso:r=8}={}){let o=document.createElement("canvas");o.width=i,o.height=t;let a=o.getContext("2d");e(a,i,t);let l=new $n(o);return n&&(l.wrapS=l.wrapT=hi),s&&(l.colorSpace=Me),l.anisotropy=r,l}function Xh(){return je(512,512,(i,t,e)=>{i.fillStyle="#55585e",i.fillRect(0,0,t,e);let n=i.getImageData(0,0,t,e),s=n.data,r=gn(3);for(let o=0;o<s.length;o+=4){let a=o/4%t,l=Math.floor(o/4/t),c=hn(a/60,l/60,3)*14+(r()-.5)*30;s[o]+=c,s[o+1]+=c,s[o+2]+=c+1}i.putImageData(n,0,0)})}function Yh(){return je(512,512,(i,t,e)=>{let n=i.createImageData(t,e),s=n.data,r=gn(11);for(let o=0;o<e;o++)for(let a=0;a<t;a++){let l=(o*t+a)*4,c=hn(a/90,o/90,4),h=(r()-.5)*14;s[l]=196+c*40+h,s[l+1]=210+c*40+h,s[l+2]=186+c*30+h*.6,s[l+3]=255}i.putImageData(n,0,0)})}function qh(){return je(256,256,(i,t,e)=>{i.fillStyle="#d6c6a2",i.fillRect(0,0,t,e);let n=gn(5);for(let s=0;s<2600;s++){let r=n()*2.4+.6,o=160+n()*80;i.fillStyle=`rgb(${o},${o*.93},${o*.8})`,i.beginPath(),i.arc(n()*t,n()*e,r,0,Math.PI*2),i.fill()}})}function Zh(){return je(128,512,(i,t,e)=>{for(let n=0;n<4;n++)i.fillStyle=n%2?"#f2f2ee":"#2a63c9",i.fillRect(0,n*e/4,t,e/4);i.fillStyle="rgba(0,0,0,.08)",i.fillRect(0,0,12,e)})}function Jh(){return je(512,128,(i,t,e)=>{for(let n=0;n<8;n++)i.fillStyle=n%2?"#f3efe8":"#e8742a",i.fillRect(n*t/8,0,t/8,e);i.fillStyle="rgba(0,0,0,.18)",i.fillRect(0,e-16,t,16)})}function $h(i=1){return je(256,128,(t,e,n)=>{let s=gn(i);for(let r=0;r<26;r++){let o=e*(.18+s()*.64),a=n*(.45+(s()-.5)*.35),l=18+s()*34,c=t.createRadialGradient(o,a,0,o,a,l);c.addColorStop(0,"rgba(255,255,255,.55)"),c.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=c,t.beginPath(),t.arc(o,a,l,0,Math.PI*2),t.fill()}},{repeat:!1})}function _o(){return je(128,128,(i,t,e)=>{let n=i.createRadialGradient(t/2,e/2,4,t/2,e/2,t/2);n.addColorStop(0,"rgba(0,0,0,.55)"),n.addColorStop(.6,"rgba(0,0,0,.22)"),n.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=n,i.fillRect(0,0,t,e)},{repeat:!1,srgb:!1})}function ds(i=256,t=128,{hx:e=.36,hy:n=.27,rr:s=.12,fade:r=.13,core:o=.45,alpha:a=.8}={}){return je(i,t,l=>{let c=l.createImageData(i,t),h=c.data;for(let u=0;u<t;u++)for(let f=0;f<i;f++){let d=Math.abs(f/(i-1)-.5),g=Math.abs(u/(t-1)-.5),_=d-(e-s),m=g-(n-s),p=Math.hypot(Math.max(_,0),Math.max(m,0))+Math.min(Math.max(_,m),0)-s,y=Math.min(1,Math.max(0,1-(p+r*.3)/r));y=y*y*(3-2*y);let v=1-o*Math.min(1,Math.hypot(d/(e+r),g/(n+r))),x=(u*i+f)*4;h[x]=h[x+1]=h[x+2]=0,h[x+3]=Math.round(255*a*y*v)}l.putImageData(c,0,0)},{repeat:!1,srgb:!1})}function Kh(){return je(4,128,(i,t,e)=>{let n=i.createLinearGradient(0,0,0,e);n.addColorStop(0,"rgba(0,0,0,.5)"),n.addColorStop(.35,"rgba(0,0,0,.2)"),n.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=n,i.fillRect(0,0,t,e)},{repeat:!1,srgb:!1,aniso:1})}function Qh(){return je(64,256,(i,t,e)=>{i.fillStyle="#cfd3d6",i.fillRect(0,0,t,e);for(let n=0;n<e;n+=8){let s=i.createLinearGradient(0,n,0,n+8);s.addColorStop(0,"rgba(255,255,255,.55)"),s.addColorStop(.45,"rgba(255,255,255,0)"),s.addColorStop(.8,"rgba(0,0,0,.10)"),s.addColorStop(1,"rgba(0,0,0,.28)"),i.fillStyle=s,i.fillRect(0,n,t,8)}})}function jh(){return je(256,128,(i,t,e)=>{let n=i.createLinearGradient(0,0,0,e);n.addColorStop(0,"#9fb3bf"),n.addColorStop(.55,"#6e8592"),n.addColorStop(1,"#4b5d68"),i.fillStyle=n,i.fillRect(0,0,t,e),i.fillStyle="rgba(245,243,238,.85)";for(let s=0;s<t;s+=32)i.fillRect(s,0,3,e);i.fillRect(0,e*.62,t,2),i.fillStyle="rgba(255,255,255,.08)";for(let s=0;s<t;s+=32)i.beginPath(),i.moveTo(s+6,e),i.lineTo(s+18,0),i.lineTo(s+26,0),i.lineTo(s+14,e),i.fill()})}function tu(){return je(128,128,(i,t,e)=>{let n=gn(21);for(let s=0;s<70;s++){let r=t*(.1+n()*.8),o=e*(.35+n()*.6),a=(n()-.5)*26,l=70+n()*60;i.strokeStyle=`rgba(${l*.8},${l},${l*.55},1)`,i.lineWidth=1.4+n()*1.6,i.beginPath(),i.moveTo(r,e),i.quadraticCurveTo(r+a*.3,e-o*.6,r+a,e-o),i.stroke()}},{repeat:!1})}var bx=50,wx=.34,Tx=.86;async function Ex(i,t){let e=i.slice(0,i.lastIndexOf("/")+1),n=await(await fetch(i)).json();t&&t({loaded:1,total:2});let s=new fe;s.setAttribute("position",new Ot(n.position,3)),s.setAttribute("uv",new Ot(n.uv,2)),s.setIndex(n.index);let r=new ro,o=async(g,_)=>{let m=await r.loadAsync(e+g);return m.flipY=!1,m.wrapS=m.wrapT=hi,_&&(m.colorSpace=Me),m},a=n.material,[l,c,h]=await Promise.all([o(a.map,!0),o(a.normalMap),o(a.metalRoughMap)]);t&&t({loaded:2,total:2});let u=new ft({map:l,normalMap:c,roughnessMap:h,metalnessMap:h,metalness:a.metalness,roughness:a.roughness,flatShading:!0});u.normalScale.set(1,-1);let f=new j(s,u);f.name=n.name;let d=new Kt;return d.add(f),d}function Ax(i,t){let e=i.index?i.toNonIndexed():i,n=e.attributes.position.array,s=n.length/9,r=Math.cos(t),o=new Float32Array(s*3),a=new Float32Array(s*3),l=new Array(s*3),c=new Map,h=f=>Math.round(n[f]*1e4)+","+Math.round(n[f+1]*1e4)+","+Math.round(n[f+2]*1e4);for(let f=0;f<s;f++){let d=f*9,g=n[d+3]-n[d],_=n[d+4]-n[d+1],m=n[d+5]-n[d+2],p=n[d+6]-n[d],y=n[d+7]-n[d+1],v=n[d+8]-n[d+2],x=_*v-m*y,L=m*p-g*v,E=g*y-_*p,C=Math.hypot(x,L,E)||1;o[f*3]=x,o[f*3+1]=L,o[f*3+2]=E,a[f*3]=x/C,a[f*3+1]=L/C,a[f*3+2]=E/C;for(let R=0;R<3;R++){let b=h(d+R*3);l[f*3+R]=b;let M=c.get(b);M||c.set(b,M=[]),M.push(f)}}let u=new Float32Array(n.length);for(let f=0;f<s;f++)for(let d=0;d<3;d++){let g=0,_=0,m=0;for(let v of c.get(l[f*3+d]))a[f*3]*a[v*3]+a[f*3+1]*a[v*3+1]+a[f*3+2]*a[v*3+2]>=r&&(g+=o[v*3],_+=o[v*3+1],m+=o[v*3+2]);let p=Math.hypot(g,_,m)||1,y=(f*3+d)*3;u[y]=g/p,u[y+1]=_/p,u[y+2]=m/p}return e.setAttribute("normal",new Ae(u,3)),e}function Cx(i){return new as({map:i.map,normalMap:i.normalMap,normalScale:i.normalScale.clone(),roughnessMap:i.roughnessMap,metalnessMap:i.metalnessMap,metalness:i.metalness,roughness:i.roughness,color:i.color,clearcoat:.32,clearcoatRoughness:.14})}function Rx(i,t){i.castShadow=!0,i.receiveShadow=!0;let e=i.material;i.geometry.attributes.normal||(i.geometry=Ax(i.geometry,$s.degToRad(bx)),e.flatShading=!1),t!=="low"&&!e.isMeshPhysicalMaterial&&(e=i.material=Cx(e)),e.envMapIntensity=1,e.normalScale&&e.normalScale.set(.6,e.normalScale.y<0?-.6:.6),e.needsUpdate=!0}function Ix(i,t,e,n){let s={};for(let r of["FL","FR","RL","RR"]){let o=e[r],a=r[0]==="F",l=r[1]==="R"?1:-1,c=Gh({r:o.r,w:wx,front:a,side:l,mats:n}),h=l*Tx;c.steer.position.set(o.x,o.r,h),i.add(c.steer);let u=new j(new te(o.r*1.07,o.r*1.07,.5,40,1,!0,Math.PI*.42,Math.PI*1.16),n.well);u.rotation.x=Math.PI/2,u.rotation.y=0,u.position.set(o.x,o.y,l*.78),t.add(u);let f=new j(new In(o.r*1.07,40,-Math.PI*.08,Math.PI*1.16),n.well);f.position.set(o.x,o.y,l*.53),t.add(f),s[r]=c}return s}function Px(i,t){let e=new le({map:ds(256,128,{alpha:.8}),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),n=new j(new ie(5.5,2.75),e);n.rotation.x=-Math.PI/2,n.position.set(0,.055,0),n.renderOrder=1,n.userData.noMask=!0,i.add(n);let s=new le({map:_o(),transparent:!0,depthWrite:!1,opacity:.9,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3});for(let r in t){let o=new j(new ie(.95,.62),s);o.rotation.x=-Math.PI/2,o.position.set(t[r].steer.position.x,.06,t[r].steer.position.z),o.renderOrder=2,o.userData.noMask=!0,i.add(o)}}async function eu(i,t,{onProgress:e,quality:n="high"}={}){let s=/\.json$/.test(i)?await Ex(i,e):null,r=new Kt;r.name="hero-car";let o=new Kt;r.add(o),s.traverse(c=>{c.isMesh&&Rx(c,n)}),o.add(s);let a=Hh(),l=Ix(r,o,t,a);return Px(r,l),{root:r,chassis:o,body:s,wheels:l,pose({dist:c=0,steer:h=0,pitch:u=0,roll:f=0,heave:d=0,speed:g=0}={}){a.blur.opacity=Math.min(.94,Math.max(0,(g-5)/16)),a.blur.visible=a.blur.opacity>.01;for(let _ in l){let m=l[_];m.spin.rotation.z=-c/m.r,_[0]==="F"&&(m.steer.rotation.y=h)}o.rotation.set(f,0,u),o.position.y=d}}}var Lx=new A(0,1,0),Dx=120,zl=2.5,Ux=2.56,Nx=1.6,nu=.5;function iu(i,t){return{intro:0,arrival:Kn(i,330,206),pitBox:Kn(i,-60,189.2),pitExit:Kn(i,-392,201.2),lapStart:Kn(i,t[6][0],t[6][1]),lapEnd:Kn(i,t[96][0],t[96][1]),paddock:Kn(i,-8,124.5),goldenHour:Kn(i,18,192.6)}}function su(i){return[[0,i.arrival],[.085,i.arrival+4],[.2,i.pitBox],[.315,i.pitBox+.3],[.34,i.pitBox+40],[.425,i.lapStart],[.56,i.lapEnd],[.665,i.paddock],[.79,i.paddock+1.5],[.885,i.goldenHour],[1,i.goldenHour+3]]}function ru(i){let t=i.map(s=>s[0]),e=i.map(s=>s[1]),n=i.map((s,r)=>Ks(t,e,r));return s=>{let r=qt(s,0,1),o=0;for(;o<i.length-2&&r>t[o+1];)o++;return mo(t[o],t[o+1],e[o],e[o+1],n[o],n[o+1],r)}}function ou(i,t,e){return qe(e.arrival-Dx,i,1-Math.pow(1-qt(t,0,1),3))}function au(i){let t=i.getLength(),e={p:new A,t:new A};function n(r){let o=qt(r/t,0,1);return i.getPointAt(o,e.p),i.getTangentAt(o,e.t),e}function s(r){let o=n(Math.max(0,r-zl)).t.clone(),a=n(Math.min(t,r+zl)).t.clone(),l=Math.atan2(o.z,o.x),c=Math.atan2(a.z,a.x);return Math.atan2(Math.sin(c-l),Math.cos(c-l))/(2*zl)}return{length:t,sample:n,curvatureAt:s}}var xo=(i,t,e,n)=>i+(t-i)*(1-Math.exp(-n*e));function lu(i,t,e){let n={lastDistance:e,wheelDistance:0,speed:0,prevSpeed:0,steer:0,roll:0,pitch:0,heave:0,frame:{p:new A,f:new A,r:new A},update(s,r,o){let a=s-n.lastDistance;n.lastDistance=s,n.wheelDistance+=a;let l=a/Math.max(r,.001);n.speed=xo(n.speed,l,5,r);let c=(n.speed-n.prevSpeed)/Math.max(r,.001);n.prevSpeed=n.speed;let h=t.sample(s),u=h.p.clone(),f=h.t.clone(),d=Math.atan2(-f.z,f.x),g=t.curvatureAt(s),_=qt(Math.atan(Ux*g)*Math.sign(n.speed||1)*Nx,-nu,nu);n.steer=xo(n.steer,_,8,r);let m=qt(n.speed*n.speed*g,-14,14);n.roll=xo(n.roll,qt(-m*.0045,-.045,.045),6,r),n.pitch=xo(n.pitch,qt(-c*.0016,-.03,.03),5,r),n.heave=Math.sin(o*13)*.0025*qt(Math.abs(n.speed)/30,0,1)+Math.sin(o*2.1)*.0015,i.root.position.copy(u),i.root.rotation.y=d,i.pose({dist:n.wheelDistance,steer:n.steer,roll:n.roll,pitch:n.pitch,heave:n.heave,speed:Math.abs(n.speed)});let p=n.frame;p.p.copy(u),p.f.copy(f).setY(0).normalize(),p.r.crossVectors(p.f,Lx).normalize()}};return n}var cu=null,kl=()=>cu||(cu=new le({map:ds(256,128,{alpha:.75}),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})),uu=(i,t,e)=>{let n=new j(new mi(i,t,6,12),e);return n.castShadow=!0,n},Fx=16118766,Ox=1842721,Bx=15282981;function hu(i,t){let e=new j(new Be(.15,20,16),new ft({color:Fx,roughness:.25,metalness:.1}));e.castShadow=!0,i.add(e);let n=new j(new Be(t,20,10,-.9,1.8,1.25,.5),new ft({color:Ox,roughness:.1,metalness:.6}));i.add(n);let s=new j(new os(.12,.012,6,24,Math.PI),new ft({color:Bx,roughness:.5}));s.rotation.y=Math.PI/2,s.position.y=.03,i.add(s)}function zx(i,t,e){let n=new j(new Be(.12,18,14),t);n.castShadow=!0,i.add(n);let s=new j(new Be(.125,18,8,0,Math.PI*2,0,1.3),e);s.position.y=.02,i.add(s);let r=new j(new te(.08,.08,.015,16,1,!1,-1.2,2.4),e);r.position.set(.08,.02,0),i.add(r)}function vo(i,t,e){let n=new Kt,s=uu(i,t,e);return s.position.y=-t/2-i,n.add(s),n}function yi({suit:i=15282981,trim:t=1842721,skin:e=13081468,helmet:n=!1,pose:s="stand"}={}){let r=new Kt,o=new ft({color:i,roughness:.7}),a=new ft({color:t,roughness:.8}),l=new ft({color:e,roughness:.8}),c=new Kt;r.add(c);let h=uu(.17,.42,o);h.position.y=.32,c.add(h);let u=new j(new te(.175,.175,.07,16),a);u.position.y=.06,c.add(u);let f=new Kt;f.position.y=.78,c.add(f),n?hu(f,.151):zx(f,l,a);let d=vo(.055,.5,o),g=vo(.055,.5,o);d.position.set(0,.58,.22),g.position.set(0,.58,-.22),c.add(d,g);for(let y of[d,g]){let v=new j(new Be(.05,10,8),l);v.position.y=-.68,y.add(v)}let _=vo(.075,.7,o),m=vo(.075,.7,o);_.position.set(0,0,.1),m.position.set(0,0,-.1),c.add(_,m);for(let y of[_,m]){let v=new j(new pe(.24,.08,.1),a);v.position.set(.05,-.9,0),y.add(v)}if(c.position.y=.97,s==="kneel")c.position.y=.55,c.rotation.z=-.25,_.rotation.z=1.45,m.rotation.z=.2,m.position.x=-.05,d.rotation.z=1.1,g.rotation.z=.9,g.rotation.x=.2;else if(s==="helmet")d.rotation.z=2.3,g.rotation.z=2.3,d.rotation.x=-.35,g.rotation.x=.35;else if(s==="carryHelmet"){g.rotation.z=.55,g.rotation.x=.12,d.rotation.x=-.08;let y=new Kt;hu(y,.152),y.position.set(.1,-.78,0),y.rotation.z=-.5,g.add(y)}else d.rotation.x=-.1,g.rotation.x=.1;let p=new j(new ie(1.1,1.1),kl());return p.rotation.x=-Math.PI/2,p.position.y=.055,p.renderOrder=1,r.add(p),r.userData={hip:c,armL:d,armR:g,head:f},r}function Vl(i,t,e,n=56,s=36){let r=[],o=[];for(let l=0;l<=n;l++){let c=i+(t-i)*l/n,h=e(c),u=(h.top+h.bottom)/2,f=Math.max(.001,(h.top-h.bottom)/2);for(let d=0;d<=s;d++){let g=-Math.PI/2+Math.PI*2*d/s,_=Math.cos(g),m=Math.sin(g),p=m>=0,y=p?u+f*Math.pow(Math.abs(m),2/h.upperExponent):u-f*Math.pow(Math.abs(m),2/h.lowerExponent),v=h.halfWidth*Math.sign(_)*Math.pow(Math.abs(_),2/(p?h.upperExponent:h.lowerExponent))*(p?1-(h.tumblehome||0)*m*m:1);r.push(c,y,v)}}for(let l=0;l<n;l++)for(let c=0;c<s;c++){let h=l*(s+1)+c,u=h+s+1;o.push(h,u,h+1,h+1,u,u+1)}let a=new fe;return a.setAttribute("position",new Ot(r,3)),a.setIndex(o),a.computeVertexNormals(),a}var fu={classic:{length:4.25,wheelbase:2.4,wheelRadius:.31,trackWidth:1.34,tyreWidth:.19,chrome:!0,top:[[-2.13,.56],[-2.05,.7],[-1.7,.8],[-1,.84],[-.3,.86],[.2,.84],[.9,.8],[1.6,.74],[2,.63],[2.13,.5]],sill:[[-2.13,.44],[-2,.3],[-1.6,.22],[1.6,.22],[2,.3],[2.13,.42]],halfWidth:[[-2.13,.5],[-2,.74],[-1.6,.81],[-1.2,.83],[0,.79],[1.2,.83],[1.7,.8],[2.05,.66],[2.13,.44]],upperExponent:2.4,lowerExponent:5,tumblehome:.1,cabin:{x0:-1.05,x1:.6,roof:[[-1.05,.84],[-.62,1.1],[-.15,1.19],[.2,1.17],[.6,.86]],belt:.8,halfWidth:[[-1.05,.6],[-.3,.67],[.3,.67],[.6,.62]]}},gt:{length:4.6,wheelbase:2.7,wheelRadius:.34,trackWidth:1.62,tyreWidth:.3,rearWing:[-2.02,1.3,1.8],top:[[-2.3,.78],[-2.1,.88],[-1.5,.93],[-.8,.9],[0,.86],[.8,.8],[1.5,.7],[2,.57],[2.3,.38]],sill:[[-2.3,.5],[-2.15,.3],[-1.8,.13],[1.8,.13],[2.2,.15],[2.3,.2]],halfWidth:[[-2.3,.8],[-2,.97],[-1.35,1],[-.5,.9],[.5,.88],[1.35,.99],[2,.93],[2.3,.7]],upperExponent:3,lowerExponent:6,tumblehome:.16,cabin:{x0:-1.25,x1:.78,roof:[[-1.25,.9],[-.7,1.19],[-.1,1.24],[.28,1.2],[.78,.84]],belt:.84,halfWidth:[[-1.25,.6],[-.4,.68],[.3,.66],[.78,.58]]}},proto:{length:4.75,wheelbase:2.9,wheelRadius:.35,trackWidth:1.64,tyreWidth:.32,rearWing:[-2.2,1.02,1.9],sharkFin:!0,top:[[-2.37,.8],[-2.2,.92],[-1.7,.95],[-1.2,.9],[-.6,.82],[0,.74],[.8,.7],[1.6,.64],[2.1,.5],[2.37,.3]],sill:[[-2.37,.5],[-2.2,.25],[-1.8,.1],[1.9,.1],[2.37,.15]],halfWidth:[[-2.37,.9],[-2.1,1],[-1.45,1],[-.8,.9],[0,.93],[.8,.93],[1.45,1],[2.1,.95],[2.37,.74]],upperExponent:3.2,lowerExponent:6,tumblehome:.2,cabin:{x0:-1.05,x1:.8,roof:[[-1.05,.8],[-.5,1.08],[0,1.13],[.4,1.07],[.8,.72]],belt:.74,halfWidth:[[-1.05,.38],[-.3,.5],[.3,.5],[.8,.36]]}}},du={},Mi=(i,t)=>du[i]||(du[i]=t());function kx(i){let t=Mi("glass",()=>new ft({color:2766400,roughness:.05,metalness:.85,envMapIntensity:1.6})),e=Mi("dark",()=>new ft({color:789775,roughness:.8,side:ge})),n=Mi("carbon",()=>new ft({color:1711135,roughness:.45,metalness:.4})),s=Mi("chrome",()=>new ft({color:14804456,roughness:.14,metalness:1})),r=Mi("lamp",()=>new ft({color:16184038,roughness:.15,metalness:.2,emissive:6972501,emissiveIntensity:.3})),o=Mi("tyre",()=>new ft({color:1513498,roughness:.92})),a=i?s:Mi("rim",()=>new ft({color:2764081,roughness:.32,metalness:.85}));return{glass:t,dark:e,carbon:n,chrome:s,lamp:r,tyre:o,rim:a}}function Vx(i,t){let e=fu[i],n=new Kt,s=new as({color:t,roughness:.32,metalness:e.chrome?.2:.35,clearcoat:.8,clearcoatRoughness:.14}),r=kx(e.chrome),o=[e.wheelbase/2,-e.wheelbase/2],a=e.wheelRadius+.07,l=us(e.top),c=us(e.sill),h=us(e.halfWidth),u=M=>{let P=-1;for(let B of o){let F=Math.abs(M-B);F<a&&(P=Math.max(P,e.wheelRadius+Math.sqrt(a*a-F*F)*.97))}return P},f=Vl(e.top[0][0],e.top[e.top.length-1][0],M=>({top:l(M),bottom:Math.min(l(M)-.08,Math.max(c(M),u(M))),halfWidth:h(M),upperExponent:e.upperExponent,lowerExponent:e.lowerExponent,tumblehome:e.tumblehome}),90,40),d=new j(f,s);d.castShadow=!0,d.receiveShadow=!0,n.add(d);let g=e.cabin,_=us(g.roof),m=us(g.halfWidth),p=Vl(g.x0,g.x1,M=>({top:_(M),bottom:g.belt-.03,halfWidth:m(M),upperExponent:2.3,lowerExponent:8,tumblehome:.1}),40,32),y=new j(p,r.glass);y.castShadow=!0,n.add(y);let v=g.x0+(g.x1-g.x0)*.17,x=g.x0+(g.x1-g.x0)*.76,L=Vl(v,x,M=>{let P=Math.min(1,Math.min(M-v,x-M)/.12);return{top:_(M)+.012,bottom:_(M)-.03-.05*P,halfWidth:m(M)*(.84+.14*P),upperExponent:2.6,lowerExponent:3,tumblehome:.1}},24,24),E=new j(L,s);E.castShadow=!0,n.add(E),Gx(n,e,r,o,a);let C=e.top[e.top.length-1][0],R=e.top[0][0];e.chrome?Hx(n,r,C,R):Wx(n,e,s,r,C,l);let b=new j(new ie(e.length*1.2,(e.trackWidth+.7)*1.25),kl());return b.rotation.x=-Math.PI/2,b.position.y=.055,b.renderOrder=1,n.add(b),n}function Gx(i,t,e,n,s){for(let r of n){let o=new j(new te(s*.98,s*.98,t.trackWidth+t.tyreWidth-.05,24,1,!0,Math.PI*.5,Math.PI),e.dark);o.rotation.x=Math.PI/2,o.position.set(r,t.wheelRadius,0),i.add(o);for(let a of[-1,1]){let l=new Kt;l.position.set(r,t.wheelRadius,a*t.trackWidth/2),i.add(l);let c=new j(new te(t.wheelRadius,t.wheelRadius,t.tyreWidth,28),e.tyre);c.rotation.x=Math.PI/2,c.castShadow=!0,l.add(c);let h=new j(new te(t.wheelRadius*.68,t.wheelRadius*.68,t.tyreWidth+.012,24),e.rim);h.rotation.x=Math.PI/2,l.add(h);let u=new j(new te(t.wheelRadius*.22,t.wheelRadius*.26,t.tyreWidth+.03,16),t.chrome?e.dark:e.chrome);u.rotation.x=Math.PI/2,l.add(u)}}}function Hx(i,t,e,n){for(let[r,o,a]of[[e-.02,.4,1.36],[n+.02,.44,1.3]]){let l=new j(new mi(.045,a,4,10),t.chrome);l.rotation.x=Math.PI/2,l.position.set(r,o,0),l.castShadow=!0,i.add(l)}for(let r of[-1,1]){let o=new j(new Be(.085,18,12,0,Math.PI),t.lamp);o.rotation.y=Math.PI/2,o.position.set(e-.14,.6,r*.52),i.add(o);let a=new j(new os(.088,.012,6,22),t.chrome);a.rotation.y=Math.PI/2,a.position.set(e-.13,.6,r*.52),i.add(a)}let s=new j(new mi(.07,.36,4,10),t.dark);s.rotation.x=Math.PI/2,s.position.set(e-.03,.5,0),i.add(s)}function Wx(i,t,e,n,s,r){let o=new j(new pe(.5,.025,1.9),n.carbon);o.position.set(s-.22,.1,0),i.add(o);for(let u of[-1,1]){let f=new j(new pe(.18,.035,.36),n.lamp);f.position.set(s-.32,r(s-.32)-.04,u*.62),f.rotation.z=-.35,i.add(f)}let[a,l,c]=t.rearWing,h=new j(new pe(.36,.03,c),n.carbon);h.position.set(a,l,0),h.rotation.z=.08,h.castShadow=!0,i.add(h);for(let u of[-1,1]){let f=new j(new pe(.44,.22,.015),n.carbon);f.position.set(a,l-.05,u*c/2),i.add(f);let d=new j(new pe(.05,l-r(a)+.05,.02),n.carbon);d.position.set(a+.06,(l+r(a))/2,u*.38),i.add(d)}if(t.sharkFin){let u=new j(new pe(1.1,.26,.018),e);u.position.set(-1.55,r(-1.55)+.11,0),i.add(u)}}function pu(i="gt",t=16118766){return Vx(fu[i]?i:"gt",t)}var Xx=new A(0,1,0),Yx=[["classic",11740702,-7.3,121.3,.02],["classic",3038539,-7.5,118.1,-.03],["classic",15788760,-7.2,114.9,.01],["gt",1842721,-7.4,111.7,-.02],["classic",9414584,-7.3,108.5,.03],["proto",15282981,-41,141.5,.02],["gt",10200234,-58,141,0],["proto",2833493,-64,120,Math.PI],["classic",9071422,-74,126,1.5],["gt",16118766,26,108,Math.PI-.05]];function mu(){let i=yi({suit:2830390,trim:15282981,pose:"kneel"}),t=yi({suit:16118766,trim:15282981,skin:12159595,pose:"carryHelmet"}),e=yi({suit:2830390,trim:10200234,pose:"stand"});return{kneeling:i,helmetCarrier:t,engineer:e,members:[i,t,e]}}function gu(i){for(let[t,e,n,s,r]of Yx){let o=pu(t,e);o.position.set(n,0,s),o.rotation.y=r,i.add(o)}}function _u(i){let t=[[yi({suit:3817544,trim:16118766,skin:13738883}),-3.7,119.9,Math.PI+.25],[yi({suit:15131612,trim:6648666,skin:10251086}),-3.3,118.8,Math.PI-.5],[yi({suit:6648666,trim:1842721,skin:13081468}),-11.8,113.6,.3]];for(let[e,n,s,r]of t)e.position.set(n,0,s),e.rotation.y=r,i.add(e);return t}function xu(i,t,e,n,s,r){let{kneeling:o,helmetCarrier:a,engineer:l}=i,c=1-cn(qt(Math.abs(t-.26)/.1-.6,0,1));for(let _ of i.members)_.visible=c>.01;if(!(c>.01))return;let h=n.sample(s),u=h.p.clone(),f=h.t,d=new A(f.x,0,f.z).normalize(),g=new A().crossVectors(d,Xx);o.position.copy(u).addScaledVector(d,1.3).addScaledVector(g,-1.55),o.rotation.y=Math.atan2(-g.z,g.x),o.userData.armR.rotation.z=.9+Math.sin(e*2.4)*.12,a.position.copy(u).addScaledVector(d,-3.6).addScaledVector(g,1.6),a.rotation.y=Math.atan2(- -g.z,-g.x)+.4,a.userData.head.rotation.y=Math.sin(e*.7)*.15,l.position.set(r.x+1.85,0,r.z-7),l.rotation.y=Math.atan2(-(u.z-l.position.z),u.x-l.position.x)}function vu(i,t,e){let n=t>.6&&t<.87;for(let[s]of i)s.visible=n;n&&(i[0][0].userData.head.rotation.y=Math.sin(e*.5)*.2)}var qx=new A(0,1,0),yo=70,Zx=400,Jx=40;function yu(i,t,e){let n=new oo(14279913,6187602,1);i.add(n);let s=new co(16777215,3);return s.castShadow=t.shadowMap.enabled,s.shadow.mapSize.setScalar(e==="high"&&t.capabilities.maxTextureSize>=8192?4096:2048),Object.assign(s.shadow.camera,{left:-yo,right:yo,top:yo,bottom:-yo,near:10,far:900}),s.shadow.bias=-4e-4,s.shadow.normalBias=.04,s.shadow.radius=4,i.add(s,s.target),{hemi:n,sun:s}}function Mu(i){return i<.2?qe(0,.12,i/.2):i<.56?qe(.12,.45,(i-.2)/.36):i<.8?qe(.45,.78,(i-.56)/.24):qe(.78,1,cn(qt((i-.8)/.085,0,1)))}function Su(i){let t=$s.degToRad(i.sunEl),e=$s.degToRad(i.sunAz);return new A(Math.sin(e)*Math.cos(t),Math.sin(t),-Math.cos(e)*Math.cos(t)).normalize()}function bu(i,{sun:t,hemi:e}){t.color.set(i.sun),t.intensity=i.sunI,e.color.set(i.sky),e.groundColor.set(i.gnd),e.intensity=i.hemiI}function wu(i,{scene:t,renderer:e}){t.fog.color.set(i.fog),e.toneMappingExposure=i.exp}var Si=new A,Gl=new A;function $x(i,t,e){let n=(e.shadow.camera.right-e.shadow.camera.left)/e.shadow.mapSize.x;Si.crossVectors(qx,t),Si.lengthSq()<1e-8&&Si.set(1,0,0),Si.normalize(),Gl.crossVectors(t,Si).normalize();let s=Math.round(i.dot(Si)/n)*n,r=Math.round(i.dot(Gl)/n)*n,o=i.dot(t);return i.set(0,0,0).addScaledVector(Si,s).addScaledVector(Gl,r).addScaledVector(t,o)}function Tu(i,t,e,n,s){let r=n.clone();e.y>Jx&&r.copy(s),$x(r,t,i),i.position.copy(r).addScaledVector(t,Zx),i.target.position.copy(r)}var Eu=1;function Au(i){i.traverse(t=>{t.isMesh&&!t.userData.noMask&&t.layers.enable(Eu)})}function Cu(i){if(i!=="high")return null;try{let t=new $e(4,4,{type:Ln,samples:4});t.depthTexture=new ss(4,4);let e=new $e(4,4),n=new Ve({depthTest:!1,depthWrite:!1,uniforms:{tColor:{value:t.texture},tDepth:{value:t.depthTexture},tMask:{value:e.texture},uInvVP:{value:new Xt},uPrevVP:{value:new Xt},uAmt:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }",fragmentShader:`uniform sampler2D tColor, tDepth, tMask; uniform mat4 uInvVP, uPrevVP; uniform float uAmt; varying vec2 vUv;
          vec3 toDisplay(vec3 c, float d) {
            if (d > .99999) return c;                       // the sky is authored for display already
            #ifdef TONE_MAPPING
            c = toneMapping(c);
            #endif
            return linearToOutputTexel(vec4(c, 1.)).rgb;
          }
          void main() {
            float d = texture2D(tDepth, vUv).x;
            vec4 wp = uInvVP * vec4(vUv * 2. - 1., d * 2. - 1., 1.); wp /= wp.w;
            vec4 pp = uPrevVP * wp; vec2 prevUv = pp.xy / pp.w * .5 + .5;
            vec2 vel = (vUv - prevUv) * uAmt * (1. - texture2D(tMask, vUv).r);
            float len = length(vel), maxLen = .016;
            if (len > maxLen) vel *= maxLen / len;
            vec3 acc = toDisplay(texture2D(tColor, vUv).rgb, d); float wsum = 1.;
            for (int i = 0; i < 8; i++) {
              vec2 uv = vUv + vel * (float(i) / 7. - .5);
              float w = 1. - texture2D(tMask, uv).r;           // never smear the car into the background
              acc += toDisplay(texture2D(tColor, uv).rgb, texture2D(tDepth, uv).x) * w; wsum += w;
            }
            gl_FragColor = vec4(acc / wsum + (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - .5) / 255., 1.);
          }`}),s=new j(new ie(2,2),n);s.frustumCulled=!1;let r=new Jn;return r.add(s),{rt:t,maskRT:e,mat:n,pScene:r,pCam:new ns(-1,1,1,-1,0,1),maskMat:new le({color:16777215,fog:!1}),vp:new Xt,prev:new Xt,size:new et,ok:!0}}catch{return null}}function Ru(i,t){return i?cn(qt((t-.39)/.035,0,1))*(1-cn(qt((t-.565)/.035,0,1))):0}function Iu(i,t,e,n,s){if(e.updateMatrixWorld(),n&&n.vp.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),s>.002&&n&&n.ok)try{i.getDrawingBufferSize(n.size);let r=n.size.x,o=n.size.y;(n.rt.width!==r||n.rt.height!==o)&&(n.rt.setSize(r,o),n.maskRT.setSize(r,o)),i.setRenderTarget(n.rt),i.render(t,e);let a=i.shadowMap.autoUpdate;i.shadowMap.autoUpdate=!1;let l=t.overrideMaterial,c=t.background;t.overrideMaterial=n.maskMat,e.layers.set(Eu),i.setRenderTarget(n.maskRT),i.setClearColor(0,1),i.clear(),i.render(t,e),e.layers.set(0),t.overrideMaterial=l,t.background=c,i.shadowMap.autoUpdate=a,n.mat.uniforms.uInvVP.value.copy(n.vp).invert(),n.mat.uniforms.uPrevVP.value.copy(n.prev),n.mat.uniforms.uAmt.value=s*.35,i.setRenderTarget(null),i.render(n.pScene,n.pCam)}catch{n.ok=!1,i.setRenderTarget(null),i.render(t,e)}else i.render(t,e);n&&n.prev.copy(n.vp)}var Pu=[0,.2,.425,.665,.885],Kx=.26,Qx=2.6,jx=.01;function tv(i,t,e,n){let s=2/Kx,r=s*n,o=1/(1+r+.48*r*r+.235*r*r*r),a=t-e,l=(i.velocity+s*a)*n;i.velocity=(i.velocity-s*l)*o;let c=e+(a+l)*o;return e-t>0==c>e&&(c=e,i.velocity=0),c}function Lu(){let i={target:0,value:0,velocity:0,intro:0,introDone:!1,snap:!1,advance(t){i.introDone||(i.intro+=t/Qx,(i.intro>=1||i.target>jx)&&i.finishIntro()),i.value=tv(i,i.value,i.target,t),i.snap&&(i.value=i.target,i.velocity=0)},finishIntro(){i.intro=1,i.introDone=!0},get introEase(){return zh(qt(i.intro,0,1))}};return i}function Du(i){return i==="high"?2:i==="mid"?1.75:1}function Uu(i,t){let e=new Yr({canvas:i,antialias:t!=="low",powerPreference:"high-performance",alpha:!1});return e.setPixelRatio(1),e.toneMapping=El,e.outputColorSpace=Me,e.shadowMap.enabled=t!=="low",e.shadowMap.type=Tl,e}function Nu(i,t,e,n){let s=0,r=0,o=0,a=0,l=0,c=0,h=1,u=typeof ResizeObserver=="function"?new ResizeObserver(d=>{for(let g of d){s=g.contentRect.width,r=g.contentRect.height;let _=g.devicePixelContentBoxSize&&g.devicePixelContentBoxSize[0];o=_?_.inlineSize:0,a=_?_.blockSize:0}}):null;if(u)try{u.observe(i,{box:"device-pixel-content-box"})}catch{u.observe(i)}function f(){if(!u||!s){let p=i.getBoundingClientRect();s=p.width,r=p.height}let d=window.devicePixelRatio||1,g=Math.min(d,n)*h,_,m;o&&g>=d-.001&&Math.abs(o-s*d)<=2&&Math.abs(a-r*d)<=2?(_=o,m=a):(_=Math.max(1,Math.round(s*g)),m=Math.max(1,Math.round(r*g))),(_!==l||m!==c)&&(l=_,c=m,t.setSize(l,c,!1),e.aspect=l/c,e.updateProjectionMatrix())}return{update:f,get width(){return l},get height(){return c},get resScale(){return h},set resScale(d){h=d}}}var ev=["map","normalMap","roughnessMap","metalnessMap","aoMap","bumpMap","alphaMap"];function Fu(i,t,e){let n=Math.min(e==="high"?16:e==="mid"?8:2,t.capabilities.getMaxAnisotropy());n>1&&i.traverse(s=>{if(s.material)for(let r of[].concat(s.material))for(let o of ev){let a=r[o];a&&a.isTexture&&!a.isRenderTargetTexture&&a.anisotropy<n&&(a.anisotropy=n,a.needsUpdate=!0)}})}function Ou(i){i.traverse(t=>{if(t.material)for(let e of[].concat(t.material))(e.isMeshStandardMaterial||e.isMeshBasicMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial)&&(e.dithering=!0)})}var nv=8e3;function Bu(){return new Ve({side:Le,depthWrite:!1,fog:!1,uniforms:{zen:{value:new Pt},hor:{value:new Pt},sunDir:{value:new A},sunCol:{value:new Pt},skyGain:{value:1}},vertexShader:"varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",fragmentShader:`uniform vec3 zen, hor, sunCol; uniform vec3 sunDir; uniform float skyGain; varying vec3 vP;
      void main(){ float h = clamp(vP.y, -.2, 1.); float k = pow(clamp(h, 0., 1.), .55);
        vec3 c = mix(hor, zen, k);
        float s = max(dot(normalize(vP), normalize(sunDir)), 0.);
        c += sunCol * (pow(s, 380.) * 2.2 + pow(s, 12.) * .22 + pow(s, 3.) * .06 * (1. - k));
        c = mix(c, hor * .92, smoothstep(0., -.2, vP.y));
        gl_FragColor = vec4(c * skyGain + (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - .5) / 255., 1.);
      }`})}function zu(i){return new j(new Be(nv,32,16),i)}function ku(i,t,e){let n=i.uniforms;n.zen.value.set(t.zen),n.hor.value.set(t.hor),n.sunDir.value.copy(e),n.sunCol.value.set(t.sun)}function Vu({renderer:i,scene:t,skyMaterial:e,quality:n}){let s=new is(i),r=new Jn,o=new j(new Be(100,32,16),e);r.add(o);let a=new j(new In(90,32),new le({color:5595212}));a.rotation.x=-Math.PI/2,a.position.y=-8,r.add(a);let l=new Fs(n==="high"?256:128,{type:Ln,generateMipmaps:!1}),c=new Ns(.1,200,l),h=n==="high"?.025:.04,u=null,f=-1;function d(_){let m=e.uniforms.skyGain.value;e.uniforms.skyGain.value=1,c.update(i,r),u=s.fromCubemap(l.texture,u),t.environment=u.texture,f=_,e.uniforms.skyGain.value=m}function g(_){Math.abs(_-f)>h&&d(_)}return{capture:d,refreshIfNeeded:g}}var Mo=[{t:0,sunEl:15,sunAz:110,sun:16769216,sunI:3.6,sky:13622502,gnd:5792846,hemiI:.92,zen:8368344,hor:15199985,fog:14674156,exp:1.04},{t:.45,sunEl:52,sunAz:175,sun:16774632,sunI:3.9,sky:14082794,gnd:6187602,hemiI:.98,zen:6135510,hor:14279913,fog:14279913,exp:1},{t:.75,sunEl:26,sunAz:238,sun:16769724,sunI:3.7,sky:14409954,gnd:6055248,hemiI:.9,zen:7184334,hor:15131610,fog:14869212,exp:1},{t:1,sunEl:7,sunAz:262,sun:16755036,sunI:3.7,sky:15780258,gnd:5919300,hemiI:.72,zen:7045291,hor:15974283,fog:15385500,exp:1.08}],iv=["sun","sky","gnd","zen","hor","fog"],sv=new Pt,rv=new Pt;function Gu(i){let t=0;for(;t<Mo.length-2&&i>Mo[t+1].t;)t++;let e=Mo[t],n=Mo[t+1],s=cn(qt((i-e.t)/(n.t-e.t),0,1)),r=a=>sv.set(e[a]).lerp(rv.set(n[a]),s).getHex(),o={};for(let a of Object.keys(e))o[a]=typeof e[a]=="number"&&!iv.includes(a)?qe(e[a],n[a],s):r(a);return o}var ov=.6,av=1.9,lv=1200,cv=6;function Hu(i){let t=i.map(([o,a])=>new A(o,ov,a));t.push(t[0].clone());let e=new io(new fi(t,!0),lv,av,cv,!0),n=new le({color:15282981,transparent:!0,opacity:0,depthWrite:!1,fog:!1}),s=new j(e,n);s.renderOrder=5;let r=e.index.count;return{mesh:s,update(o){let a=qt((o-.336)/.05,0,1),l=1-qt((o-.386)/.018,0,1);n.opacity=Math.min(1,a*4)*l*.95,s.visible=n.opacity>.01,e.setDrawRange(0,Math.floor(r*cn(a)/3)*3)}}}function Wu(i){let{rng:t,root:e,updaters:n,density:s}=i,r=new Kt;r.name="clouds",e.add(r);let o=Math.round(22*Math.max(.5,s));for(let a=0;a<o;a++){let l=new zs({map:$h(a+3),transparent:!0,depthWrite:!1,fog:!1,opacity:.85}),c=new Jr(l),h=t()*Math.PI*2,u=900+t()*1300;c.position.set(Math.cos(h)*u,220+t()*260,Math.sin(h)*u);let f=380+t()*420;c.scale.set(f,f*.42,1),c.userData.v=.6+t()*1.2,r.add(c)}n.push((a,l)=>{for(let c of r.children)c.position.x+=c.userData.v*l*2.2,c.position.x>2400&&(c.position.x=-2400)})}var Qs={straightZ:206,straightX0:420,straightX1:-534,trackHalf:7,pitWallZ:198,pitLaneZ:191.5,garageFrontZ:185.5,garageDepth:17,boxW:6.7,boxes:30,pitX0:-150.5,get pitX1(){return this.pitX0+this.boxes*this.boxW},towerX:64,gantryX:-96,grandstandZ:224,grandstandX0:-190,grandstandX1:110,paddock:{x0:-170,x1:120,z0:96,z1:166}};function Xu(){let i={asphalt:Xh(),grass:Yh(),gravel:qh(),kerb:Zh(),barrier:Jh(),blob:_o(),ao:Kh(),shutter:Qh()};return i.grass.repeat.set(1,1),i}var Hl={transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1};function Yu(i){let t={ground:new ft({map:i.grass,roughness:1,color:16777215,vertexColors:!0}),asphalt:new ft({map:i.asphalt,roughness:.8,metalness:0,color:10133156}),pitAsphalt:new ft({map:i.asphalt,roughness:.86,color:12567496}),rubber:new le({color:723981,opacity:.16,...Hl}),ao:new le({map:i.ao,...Hl}),contact:new le({map:ds(128,128,{hx:.34,hy:.34,rr:.2,fade:.15,alpha:.6}),...Hl}),line:new ft({color:15921644,roughness:.7}),kerb:new ft({map:i.kerb,roughness:.6}),runoff:new ft({color:4165490,roughness:.85}),gravel:new ft({map:i.gravel,roughness:1,color:15919832}),barrier:new ft({map:i.barrier,roughness:.8}),concrete:new ft({color:14276560,roughness:.92}),concreteDark:new ft({color:10988978,roughness:.9}),white:new ft({color:15131870,roughness:.8}),steel:new ft({color:10200234,roughness:.45,metalness:.6}),steelDark:new ft({color:6120555,roughness:.5,metalness:.55}),glass:new ft({color:6256260,roughness:.12,metalness:.9,envMapIntensity:1.2}),shutter:new ft({map:i.shutter,color:16777215,roughness:.5,metalness:.3}),seat:new ft({color:5144467,roughness:.7}),roofW:new ft({color:15855593,roughness:.6,side:ge}),red:new ft({color:15282981,roughness:.55}),trunk:new ft({color:7034695,roughness:1}),pine:new ft({color:16777215,roughness:1}),oak:new ft({color:16777215,roughness:1}),shrub:new ft({color:16777215,roughness:1}),hill:new ft({color:7043676,roughness:1,flatShading:!1}),interior:new ft({color:14276561,roughness:.8}),floor:new ft({color:9343640,roughness:.55,metalness:.1}),blob:new le({map:i.blob,transparent:!0,depthWrite:!1})};return t.asphalt.map.repeat.set(1,1),t}function qu(i){let t=jh();return t.repeat.set(i,1),new ft({map:t,roughness:.18,metalness:.55,envMapIntensity:1.1})}function hv(i){return i==="high"?1:i==="mid"?.6:.35}function Zu(i,t){let e=hv(t),n=new Kt;n.name="world";let s=i.map(([f,d])=>new et(f,d)),r=gn(42),o=[],a=Xu(),l=Yu(a);function c(f,d,g,_,m,p=1,y=.06,v=n){let x=Math.hypot(g-f,_-d),L=new ie(x,m);L.rotateX(-Math.PI/2);let E=new j(L,l.ao),C=Math.atan2(_-d,g-f),R=-Math.sin(C)*p,b=Math.cos(C)*p;return E.position.set((f+g)/2+R*m/2,y,(d+_)/2+b*m/2),E.rotation.y=-C+(p>0?0:Math.PI),E.renderOrder=1,v.add(E),E}function h(f,d,g,_,m=0,p=n){let y=new j(new ie(g,_),l.contact);return y.rotation.x=-Math.PI/2,y.rotation.z=m,y.position.set(f,.055,d),y.renderOrder=1,p.add(y),y}function u(f,d,g,_,m,p,y,v=n,x=!0){let L=new j(new pe(f,d,g),_);return L.position.set(m,p+d/2,y),L.castShadow=x,L.receiveShadow=!0,v.add(L),L}return{quality:t,density:e,root:n,track:s,rng:r,updaters:o,textures:a,materials:l,layout:Qs,glazingMaterial:qu,addAoStrip:c,addContactShadow:h,addBox:u}}var uv=6,dv=2.4,fv=1.5;function js(i,t,e,n,s,r){let{materials:o,updaters:a}=i,l=new j(new te(.05,.06,uv,6),o.steel);l.position.set(t,e+3,n),r.add(l);let c=new ie(dv,fv,16,6);c.translate(1.2,0,0);let h=new ft({color:s,side:ge,roughness:.8});h.onBeforeCompile=f=>{f.uniforms.uTime={value:0},h.userData.sh=f,f.vertexShader=`uniform float uTime;
`+f.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        float k = position.x / 2.4;
        transformed.z += sin(position.x * 2.1 - uTime * 4.2 + ${(t*.1).toFixed(2)}) * .22 * k;
        transformed.y += sin(position.x * 1.3 - uTime * 3.1) * .06 * k;`)};let u=new j(c,h);u.position.set(t,e+5.1,n),u.castShadow=!0,r.add(u),a.push(f=>{h.userData.sh&&(h.userData.sh.uniforms.uTime.value=f)})}var pv=18,Ju=-.08;function $u(i){let{root:t,materials:e,addBox:n}=i,s=i.layout,r=new Kt;r.name="grandstand",t.add(r);let o=s.grandstandX1-s.grandstandX0,a=(s.grandstandX0+s.grandstandX1)/2,l=s.grandstandZ;for(let h=0;h<pv;h++)n(o,.45,.9,e.concreteDark,a,1.2+h*.55,l+h*.85,r,h%3===0),n(o-2,.32,.35,e.seat,a,1.65+h*.55,l+h*.85-.1,r,!1);n(o,1.2,16,e.concreteDark,a,0,l+7.5,r),n(o,11,1,e.white,a,0,l+16,r);let c=new j(new pe(o+4,.45,22),e.roofW);c.position.set(a,16.5,l+7.5),c.rotation.x=Ju,c.castShadow=!0,c.receiveShadow=!0,r.add(c);for(let h=s.grandstandX0;h<=s.grandstandX1+.1;h+=20){n(.5,16.5,.5,e.steel,h,0,l+16.2,r);let u=new j(new pe(.35,1.4,21),e.steel);u.position.set(h,17.3,l+7.5),u.rotation.x=Ju,u.castShadow=!0,r.add(u)}}function Ku(i){let{root:t,materials:e,addBox:n}=i,s=i.layout,r=s.straightX0-s.straightX1,o=(s.straightX0+s.straightX1)/2;n(r,1.15,.6,e.concrete,o,0,s.straightZ+10.5);let a=new Ke(new te(.07,.07,4.2,6),e.steelDark,Math.ceil(r/6)),l=new Xt,c=0;for(let u=s.straightX1;u<s.straightX0;u+=6)l.makeTranslation(u,1.15+2.1,s.straightZ+10.6),a.setMatrixAt(c++,l);a.count=c,a.castShadow=!0,t.add(a);let h=new j(new ie(r,3.6),new ft({color:9213082,transparent:!0,opacity:.18,side:ge,depthWrite:!1}));h.position.set(o,3.1,s.straightZ+10.6),t.add(h)}function Qu(i){let{root:t,materials:e,addBox:n}=i,s=i.layout,r=new Kt;r.name="gantry",t.add(r);let o=s.gantryX,a=s.pitWallZ-.5,l=s.straightZ+11;for(let c of[a,l])n(.6,9,.6,e.steel,o,0,c,r);n(.5,.5,l-a+1,e.steel,o,8.2,(a+l)/2,r),n(.5,.5,l-a+1,e.steel,o,9.2,(a+l)/2,r);for(let c=a;c<l;c+=1.2){let h=new j(new pe(.12,1.3,.12),e.steel);h.position.set(o,8.7,c),h.rotation.x=.7,r.add(h)}for(let c=0;c<4;c++)n(.3,.9,1.6,new ft({color:1842721,roughness:.4}),o-.2,7.2,s.straightZ-3+c*2,r);n(.8,.01,14,e.line,o,.04,s.straightZ,t,!1);for(let c=0;c<10;c++){let h=o+12+c*8,u=s.straightZ+(c%2?3.2:-3.2);n(.18,.01,2.6,e.line,h,.04,u,t,!1),n(2.2,.01,.18,e.line,h+1.1,.04,u+1.3,t,!1),n(2.2,.01,.18,e.line,h+1.1,.04,u-1.3,t,!1)}}var ju=new Xt,td=new Ye,ed=new Oe,mv=new A,gv=new A,_v=new Pt;function ze(i,t,e,n,s=!0){let r=new Ke(t,e,n.length);return n.forEach((o,a)=>{ed.set(o.rx||0,o.ry||0,o.rz||0),td.setFromEuler(ed),ju.compose(gv.set(o.x,o.y||0,o.z),td,mv.set(o.sx||1,o.sy||1,o.sz||1)),r.setMatrixAt(a,ju),o.c!=null&&r.setColorAt(a,_v.set(o.c))}),r.castShadow=s,r.receiveShadow=!0,i.root.add(r),r}function xv(i){let{root:t,materials:e}=i,n=i.layout,s=n.paddock,r=new ie(s.x1-s.x0,s.z1-s.z0);r.rotateX(-Math.PI/2);let o=r.attributes.uv;for(let h=0;h<o.count;h++)o.setXY(h,o.getX(h)*(s.x1-s.x0)/12,o.getY(h)*(s.z1-s.z0)/12);let a=new j(r,e.pitAsphalt);a.position.set((s.x0+s.x1)/2,.02,(s.z0+s.z1)/2),a.receiveShadow=!0,t.add(a);for(let[h,u,f,d]of[[80,160,22,28],[84,180,18,16],[10,167.5,220,3.5]]){let g=new j(new ie(f,d),e.pitAsphalt);g.rotation.x=-Math.PI/2,g.position.set(h,.022,u),g.receiveShadow=!0,t.add(g)}let l=new j(new ie(9,90),e.pitAsphalt);l.rotation.x=-Math.PI/2,l.position.set(-60,.021,70),l.receiveShadow=!0,t.add(l);let c=n.garageFrontZ-n.garageDepth;i.addAoStrip(n.pitX0,c,n.pitX1,c,2.6,-1,.05)}function vv(){return{unitBox:new pe(1,1,1),paint:new ft({color:16777215,roughness:.42,metalness:.25}),darkGlass:new ft({color:1910316,roughness:.08,metalness:.85}),rubber:new ft({color:1579291,roughness:.92})}}var yv=151,nd=[2830133,16118766,10200234,1842721,15131612,3817544,16118766,6648666];function Mv(i,t){let{materials:e}=i,n=yv,s=[],r=[],o=[],a=[],l=[],c=[],h=[],u=[],f=0;for(let d=-156;d<=66;d+=24,f++){let g=nd[f%nd.length];s.push({x:d,y:.95+1.95,z:n,sx:15.5,sy:3.9,sz:2.55,c:g}),f%3===1&&u.push({x:d,y:1.55,z:n-1.285,sx:15.3,sy:.18,sz:.02,c:15282981}),r.push({x:d+9.35,y:.9+1.45,z:n,sx:2.6,sy:2.9,sz:2.5,c:f%2?16118766:10200234}),o.push({x:d+10.67,y:3,z:n,sx:.05,sy:.95,sz:2.2});for(let _ of[-6.1,-4.8,-3.5,7.7,9.9])a.push({x:d+_,y:.5,z:n,rx:Math.PI/2,sy:2.6});l.push({x:d-.5,y:3.7,z:n-1.28-2.35,sx:13.6,sy:.1,sz:4.7,rx:-.05});for(let _ of[-6.6,0,6.6])c.push({x:d-.5+_,y:1.8,z:n-1.28-4.55,sy:3.6});h.push({x:d+1.5,y:.05,z:n,rx:-Math.PI/2,sx:20,sy:4.4}),h.push({x:d-.5,y:.052,z:n-3.6,rx:-Math.PI/2,sx:14,sy:5.2})}ze(i,t.unitBox,t.paint,s),ze(i,t.unitBox,t.paint,r),ze(i,t.unitBox,t.darkGlass,o,!1),u.length&&ze(i,t.unitBox,new ft({color:16777215,roughness:.5}),u,!1),ze(i,new te(.5,.5,1,16),t.rubber,a),ze(i,t.unitBox,e.roofW,l),ze(i,new te(.05,.05,1,6),e.steel,c),ze(i,new ie(1,1),e.contact,h,!1).renderOrder=1}function Sv(i,t){let{materials:e}=i,n=[],s=[],r=[],o=[];for(let a=0;a<6;a++){let l=-28+a*16.5,c=100.5;n.push({x:l,y:1.6,z:c,sx:14.6,sy:3.2,sz:5}),r.push({x:l,y:3.3,z:c+.35,sx:15.4,sy:.18,sz:6.2}),n.push({x:l-2.2,y:4.85,z:c-.6,sx:8.6,sy:2.9,sz:3.6}),r.push({x:l-2.2,y:6.4,z:c-.45,sx:9.6,sy:.16,sz:4.4}),s.push({x:l,y:1.75,z:c+2.53,sx:12.8,sy:1.9,sz:.04}),s.push({x:l-2.2,y:4.9,z:c+1.23,sx:8,sy:2.1,sz:.04}),o.push({x:l,y:.05,z:c+2.6,rx:-Math.PI/2,sx:16,sy:4})}ze(i,t.unitBox,e.white,n),ze(i,t.unitBox,e.white,r),ze(i,t.unitBox,i.glazingMaterial(1.5),s,!1),ze(i,new ie(1,1),e.contact,o,!1).renderOrder=1}function bv(i){let{root:t,materials:e,addBox:n}=i;for(let[s,r]of[[-140,116],[-100,116],[72,117]]){let o=new j(new eo(13,3.2,4,1,!0),e.roofW);o.rotation.y=Math.PI/4,o.position.set(s,5.6,r),o.castShadow=!0,t.add(o);for(let[a,l]of[[-1,-1],[1,-1],[-1,1],[1,1]])n(.25,4.2,.25,e.steel,s+a*8.5,0,r+l*8.5,t)}}function wv(i,t){let e=[],n=[];for(let s=0;s<18;s++){let r=-158+s*13.1+s%3*1.7,o=145.4-s%2*.8,a=2+s%3;for(let l=0;l<a;l++)e.push({x:r,y:.16+l*.31,z:o,sx:.66,sy:.3,sz:.66});n.push({x:r+2.4,y:.45,z:o+.3,sx:1.2,sy:.9,sz:.8,c:s%2?1842721:10200234})}ze(i,new te(.5,.5,1,18),t.rubber,e),ze(i,t.unitBox,t.paint,n)}function Tv(i,t){let e=[];for(let n=0;n<7;n++)e.push({x:-7.4,y:.03,z:126.1-n*3.2,sx:5.8,sy:.012,sz:.12});e.push({x:-10.3,y:.03,z:126.1-3*3.2,sx:.12,sy:.012,sz:6*3.2+.12}),ze(i,t.unitBox,i.materials.line,e,!1)}function Ev(i){let{root:t,materials:e,addBox:n}=i,s=i.layout.paddock;for(let r=0;r<4;r++)n(.4,22,.4,e.steel,s.x0+10+r*90,0,s.z0-5,t),n(3,.6,1.2,e.steelDark,s.x0+10+r*90,22,s.z0-5,t)}function id(i){xv(i);let t=vv();Mv(i,t),Sv(i,t),bv(i),wv(i,t),Tv(i,t),Ev(i)}var rd=13;function od(i){let{root:t,materials:e,addBox:n}=i,s=i.layout,r=new Pn,o=s.garageFrontZ,a=s.pitWallZ;r.moveTo(s.pitX0-140,-a),r.lineTo(s.pitX1+150,-a),r.lineTo(s.pitX1+150,-o),r.lineTo(s.pitX0-140,-o),r.closePath();let l=new qs(r);l.rotateX(-Math.PI/2);let c=new j(l,e.pitAsphalt);c.position.y=.025,c.receiveShadow=!0,t.add(c);let h=l.attributes.uv,u=l.attributes.position;for(let d=0;d<u.count;d++)h.setXY(d,u.getX(d)/12,u.getZ(d)/12);let f=(s.pitX0+s.pitX1)/2;n(s.pitX1-s.pitX0+260,.012,.25,e.line,f,.03,s.garageFrontZ+6,t,!1),n(s.pitX1-s.pitX0+300,1.1,.7,e.concrete,f,0,s.pitWallZ+.35),n(s.pitX1-s.pitX0+300,.08,.9,e.steel,f,1.1,s.pitWallZ+.35);for(let[d,g]of[[s.pitX1+150,s.pitX1+260],[s.pitX0-140,s.pitX0-250]]){let _=new Pn;_.moveTo(d,-(s.garageFrontZ+.5)),_.lineTo(d,-s.pitWallZ),_.lineTo(g,-(s.straightZ-6.8)),_.lineTo(g,-(s.straightZ-6.8-6)),_.closePath();let m=new qs(_);m.rotateX(-Math.PI/2);let p=new j(m,e.pitAsphalt);p.position.y=.028,p.receiveShadow=!0,t.add(p)}}function Av(i){let t=i.layout;i.addAoStrip(t.pitX0-150,t.pitWallZ,t.pitX1+150,t.pitWallZ,1.4,-1,.05),i.addAoStrip(t.pitX0-150,t.pitWallZ+.7,t.pitX1+150,t.pitWallZ+.7,1.2,1,.06)}function Cv(i,t){let{materials:e,addBox:n,addAoStrip:s}=i,r=i.layout,o=r.boxes*r.boxW,a=(r.pitX0+r.pitX1)/2,l=r.garageFrontZ,c=l-r.garageDepth,h=l-r.garageDepth/2;n(o,4.6,.4,e.white,a,0,c+.2,t),n(o+.6,.5,r.garageDepth+2.2,e.white,a,4.6,h+.9,t);let u=i.glazingMaterial(o/8);n(o,3.4,r.garageDepth-2,u,a,5.1,h-.4,t);for(let d=0;d<=r.boxes;d++)n(d%2?.16:.32,3.4,d%2?.45:.7,e.white,r.pitX0+d*r.boxW,5.1,l-1.2,t);n(o,.05,.14,new le({color:16773590}),a,4.56,l+1.4,t,!1),s(r.pitX0,l,r.pitX1,l,3.2,1,.05,t),Av(i),n(o+.6,.55,r.garageDepth+1.6,e.white,a,8.5,h+.4,t);let f=new ft({color:12570840,transparent:!0,opacity:.35,roughness:.1});n(o,1,.06,f,a,9.05,l+.1,t,!1),n(o,.07,.12,e.steel,a,10.05,l+.1,t);for(let d=0;d<r.boxes;d++){let g=r.pitX0+d*r.boxW,_=g+r.boxW/2;if(n(.35,4.6,r.garageDepth,e.white,g,0,h,t),n(r.boxW-.35,.7,.3,e.white,_,3.9,l-.15,t),d===rd)continue;let m=d%7===3?1.2:d%5===1?2.2:0;n(r.boxW-.4,3.9-m,.12,e.shutter,_,m,l-.3,t),m>0&&n(r.boxW-.4,m,.1,e.interior,_,0,l-6,t,!1)}n(.35,4.6,r.garageDepth,e.white,r.pitX1,0,h,t)}var sd=()=>new ft({color:1776670,roughness:.95});function Rv(i,t){let{materials:e,addBox:n,addAoStrip:s}=i,r=i.layout,o=r.garageFrontZ,a=o-r.garageDepth,l=r.pitX0+rd*r.boxW+r.boxW/2;n(r.boxW-.4,.02,r.garageDepth-.4,e.floor,l,.02,o-r.garageDepth/2,t,!1),n(r.boxW-.4,3.9,.1,e.interior,l,0,a+.45,t,!1);for(let h of[-1,1]){n(1.6,1,.6,e.red,l+h*2.2,0,a+1.3,t);for(let u=0;u<4;u++){let f=new j(new te(.33,.33,.3,20),sd());f.position.set(l-h*2.3,.15+u*.31,a+3.2),f.castShadow=!0,t.add(f)}}let c=new lo(16767400,60,16,1.6);c.position.set(l,3.6,o-6),t.add(c),n(r.boxW-1.2,.06,.5,new le({color:16774108}),l,4.2,o-5,t,!1),n(r.boxW-1.2,.06,.5,new le({color:16774108}),l,4.2,o-11,t,!1),n(3.2,1.4,.06,e.steelDark,l,1.5,a+.52,t,!1);for(let h=0;h<2;h++){let u=new j(new te(.34,.34,.32,22),sd());u.rotation.z=Math.PI/2,u.position.set(l+1.6+h*.36,.36,o-4.2),u.castShadow=!0,t.add(u)}n(1.1,.08,.7,e.steel,l+1.78,.1,o-4.2,t,!1),s(l-r.boxW/2+.2,a+.5,l+r.boxW/2-.2,a+.5,2.4,1,.045,t),s(l-r.boxW/2+.2,a+.5,l-r.boxW/2+.2,o,1.4,-1,.045,t),s(l+r.boxW/2-.2,a+.5,l+r.boxW/2-.2,o,1.4,1,.045,t),i.root.userData.openBox={x:l,z:o}}function Iv(i,t){let{materials:e,addBox:n,addAoStrip:s}=i,r=i.layout,o=r.towerX,a=r.garageFrontZ-7;n(18,16,15,e.white,o,0,a,t),n(18.6,4.2,15.6,i.glazingMaterial(2.4),o,16,a,t),n(19.4,.6,16.4,e.white,o,20.2,a,t),n(20.4,.25,17.4,e.white,o,15.75,a,t);for(let l=0;l<3;l++)n(18.2,1.3,.1,i.glazingMaterial(2.2),o,3.4+l*4.2,a+7.55,t,!1);s(o-9,a+7.5,o+9,a+7.5,2.4,1,.05,t),s(o+9,a-7.5,o+9,a+7.5,2.4,-1,.05,t),i.root.userData.tower=new A(o,18,a)}function Pv(i,t){let e=i.layout;for(let n=0;n<6;n++)js(i,e.pitX0+18+n*34,9,e.garageFrontZ+.2,n%2?16118766:15282981,t)}function ad(i){let t=new Kt;t.name="pits",i.root.add(t),Cv(i,t),Rv(i,t),Iv(i,t),Pv(i,t)}var Lv=4200,Dv=3e3,Uv=120,Nv=90;function cd(i){let t=new ie(Lv,Dv,Uv,Nv);t.rotateX(-Math.PI/2);let e=t.attributes.position,n=t.attributes.uv;for(let h=0;h<e.count;h++){let u=e.getX(h),f=e.getZ(h),d=Math.hypot(u/1.15,f*1.25),g=qt((d-720)/900,0,1);e.setY(h,g*g*(40+hn(u/420,f/420,4)*90)-.05),n.setXY(h,u/9,f/9)}t.computeVertexNormals();let s=[],r=new Pt(8161886),o=new Pt(10986611),a=new Pt(5662282),l=new Pt;for(let h=0;h<e.count;h++){let u=e.getX(h),f=e.getZ(h),d=hn(u/260,f/260,4),g=hn(u/70+9,f/70,3);l.copy(r).lerp(o,qt(d*1.4+.25,0,1)*.75).lerp(a,qt(-g*1.6,0,1)*.6),s.push(l.r,l.g,l.b)}t.setAttribute("color",new Ot(s,3));let c=new j(t,i.materials.ground);c.receiveShadow=!0,c.name="ground",i.root.add(c)}var ld=-2.35,Fv=.22;function hd(i){let t=new Kt;for(let e=0;e<3;e++){let n=2300+e*350,s=new te(n,n,1,220,1,!0),r=s.attributes.position;for(let a=0;a<r.count;a++){let l=r.getX(a),c=r.getZ(a);if(r.getY(a)>0){let h=Math.atan2(c,l),u=70+hn(h*3+e*7,e,4)*150+Math.max(0,hn(h*9,3+e,2))*90,f=Math.abs(Math.atan2(Math.sin(h-ld),Math.cos(h-ld)));u+=Math.max(0,1-f/Fv)*(e===1?260:150),r.setY(a,u)}else r.setY(a,-20)}s.computeVertexNormals();let o=new ft({color:[6254423,8227708,10464688][e],roughness:1,side:ge,fog:!0});t.add(new j(s,o))}i.root.add(t)}function Ov(i){let t=i.length,e=new Float32Array(t);for(let n=0;n<t;n++){let s=i[(n-3+t)%t],r=i[n],o=i[(n+3)%t],a=Math.atan2(r.y-s.y,r.x-s.x),l=Math.atan2(o.y-r.y,o.x-r.x);e[n]=Math.atan2(Math.sin(l-a),Math.cos(l-a))}return e}function Bv(i){let t=i.length,e=new Float32Array(t);for(let n=0;n<t;n++){let s=0;for(let r=-8;r<=8;r++)s=Math.max(s,Math.abs(i[(n+r+t)%t]));e[n]=qt((s-.025)/.05,0,1)}return e}function zv(i){let t=i.length,e=[],n=-1;for(let s=0;s<=t;s++){let r=s<t&&i[s]>.5;r&&n<0&&(n=s),!r&&n>=0&&(s-n>4&&e.push([n,s]),n=-1)}return e}function kv(i){let t=e=>{let n=i[e];return Math.abs(n.y-Qs.straightZ)<1.5&&n.x<470&&n.x>-540};return e=>t(e)?7:6.5}var tr=60;function Vv(i){let t=new Map;for(let e=0;e<i.length;e++){let n=Math.floor(i[e].x/tr)+","+Math.floor(i[e].y/tr);t.has(n)||t.set(n,[]),t.get(n).push(i[e])}return(e,n)=>{let s=Math.floor(e/tr),r=Math.floor(n/tr),o=1e12;for(let a=-1;a<=1;a++)for(let l=-1;l<=1;l++){let c=t.get(s+a+","+(r+l));if(c)for(let h of c){let u=(h.x-e)**2+(h.y-n)**2;u<o&&(o=u)}}return o===1e12?tr*1.5:Math.sqrt(o)}}function Gv(i,t){let e=Qs;return i>e.paddock.x0-30&&i<e.paddock.x1+30&&t>e.paddock.z0-20&&t<e.straightZ+60||i>e.grandstandX0-40&&i<e.grandstandX1+40&&t>e.straightZ&&t<e.grandstandZ+40}function ud(i){let t=Ov(i),e=Bv(t);return{count:i.length,turn:t,cornerness:e,corners:zv(e),halfWidth:kv(i),distanceToTrack:Vv(i),isKeepClearZone:Gv}}var dd=(i,t)=>(i%t+t)%t;function fd(i,t,e,n){let s=i.length,r=0;for(let o=t;o<=e;o++){let a=dd(o,s),l=i[a],c=i[(a+1)%s],h=i[(a-1+s)%s],u=c.x-h.x,f=c.y-h.y,d=Math.hypot(u,f)||1;if(u/=d,f/=d,o>t){let g=i[dd(o-1,s)];r+=Math.hypot(l.x-g.x,l.y-g.y)}n(a,l,-f,u,r)}}function pd(i){let t=[];for(let e=0;e<i;e++){let n=e*2;t.push(n,n+2,n+1,n+1,n+2,n+3)}return t}function md(i,t,e){let n=new fe;return n.setAttribute("position",new Ot(i,3)),n.setAttribute("uv",new Ot(t,2)),n.setIndex(e),n.computeVertexNormals(),n}function bi(i,t,e,{closed:n=!0,y:s=0,vScale:r=1,uvAcross:o=[0,1],heightA:a=0,heightB:l=0,segRange:c=null}={}){let h=i.length,u=[],f=[],d=c?c[0]:0,g=c?c[1]:n?h:h-1;return fd(i,d,g,(_,m,p,y,v)=>{let x=typeof t=="function"?t(_):t,L=typeof e=="function"?e(_):e;u.push(m.x+p*x,s+a,m.y+y*x,m.x+p*L,s+l,m.y+y*L),f.push(o[0],v*r,o[1],v*r)}),md(u,f,pd(g-d))}function gd(i,t,[e,n],s,r){let o=[],a=[];return fd(i,e,n,(l,c,h,u,f)=>{let d=t(l);o.push(c.x+h*d,0,c.y+u*d,c.x+h*d,s,c.y+u*d),a.push(f*r,0,f*r,1)}),md(o,a,pd(n-e))}function Hv(i,t){let{halfWidth:e}=t,n=bi(i.track,r=>e(r),r=>-e(r),{y:.03,vScale:1/12,uvAcross:[0,14/12]}),s=new j(n,i.materials.asphalt);s.receiveShadow=!0,s.name="track",i.root.add(s)}function Wv(){let i=document.createElement("canvas");i.width=64,i.height=4;let t=i.getContext("2d"),e=t.createLinearGradient(0,0,64,0);return e.addColorStop(0,"rgba(0,0,0,0)"),e.addColorStop(.35,"rgba(0,0,0,1)"),e.addColorStop(.65,"rgba(0,0,0,1)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,64,4),new $n(i)}function Xv(i,t){let{materials:e}=i;e.rubber.map=Wv(),e.rubber.opacity=.2;let n=o=>qt(t.turn[o]*12,-2.2,2.2),s=bi(i.track,o=>2.6+n(o),o=>-3.4+n(o),{y:.034}),r=new j(s,e.rubber);r.renderOrder=1,i.root.add(r)}function Yv(i,t){let{halfWidth:e}=t;for(let n of[1,-1]){let s=bi(i.track,o=>n*(e(o)-.15),o=>n*(e(o)-.45),{y:.045}),r=new j(s,i.materials.line);r.receiveShadow=!0,i.root.add(r)}}function qv(i,t){let{track:e,materials:n,root:s}=i,{halfWidth:r,turn:o,cornerness:a,corners:l,count:c}=t;for(let[h,u]of l){for(let v of[1,-1]){let x=bi(e,C=>v*r(C),C=>v*(r(C)+1.6),{closed:!1,segRange:[h,u],y:.07,vScale:.16666666666666666,heightA:0,heightB:-.03}),L=new j(x,n.kerb);L.receiveShadow=!0,s.add(L);let E=bi(e,C=>v*(r(C)+1.6),C=>v*(r(C)+5.5),{closed:!1,segRange:[h,u],y:.04});s.add(new j(E,n.runoff))}let f=Math.floor((h+u)/2),d=-(Math.sign(o[f])||1),g=[Math.max(0,h-6),Math.min(c-1,u+10)],_=bi(e,v=>d*(r(v)+5.5),v=>d*(r(v)+5.5+24*qt(a[v],.3,1)),{closed:!1,segRange:g,y:.035,vScale:1/10}),m=new j(_,n.gravel);m.receiveShadow=!0,s.add(m);let p=gd(e,v=>d*(r(v)+31.4),g,.95,1/7),y=new j(p,n.barrier);y.castShadow=!0,y.receiveShadow=!0,s.add(y)}}function _d(i,t){Hv(i,t),Xv(i,t),Yv(i,t),qv(i,t)}function vd(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new fe,c=0;for(let h=0;h<i.length;++h){let u=i[h],f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(e){let h=0,u=[];for(let f=0;f<i.length;++f){let d=i[f].index;for(let g=0;g<d.count;++g)u.push(d.getX(g)+h);h+=i[f].attributes.position.count}l.setIndex(u)}for(let h in r){let u=xd(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){let d=[];for(let _=0;_<o[h].length;++_)d.push(o[h][_][f]);let g=xd(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function xd(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){let h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new Ae(o,e,n),l=0;for(let c=0;c<i.length;++c){let h=i[c];if(h.isInterleavedBufferAttribute){let u=l/e;for(let f=0,d=h.count;f<d;f++)for(let g=0;g<e;g++){let _=h.getComponent(f,g);a.setComponent(f+u,g,_)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}function yd(i,t){return vd(i.map(([e,n,s,r,o=1])=>{let a=t();return a.scale(r,r*o,r),a.translate(e,n,s),a}))}function Zv(){return yd([[0,0,0,1,.42],[.62,-.06,.18,.62,.42],[-.58,-.04,-.22,.66,.42],[.08,.04,-.62,.58,.42],[-.2,.03,.6,.6,.42]],()=>new Be(1,10,7))}function Jv(){return yd([[0,0,0,1],[.55,-.15,.25,.7],[-.5,-.1,-.3,.72],[.1,.38,-.1,.6]],()=>new Ys(1,1))}function Md(i,t){let{rng:e,materials:n,density:s,root:r}=i,{distanceToTrack:o,isKeepClearZone:a}=t,l=Math.round(2600*s),c=Math.round(2200*s),h=Math.round(1800*s),u=Zv(),f=Jv(),d=new Ke(u,n.pine,l),g=new Ke(new te(.16,.3,1,6),n.trunk,l),_=new Ke(f,n.oak,c),m=new Ke(new Ys(1,1),n.shrub,h),p=new Xt,y=new Ye,v=new A,x=new A,L=new Oe,E=new Pt,C=(b,M,P)=>{for(let B=0;B<60;B++){let F=e()*Math.PI*2,O=Math.sqrt(e())*M,Y=Math.cos(F)*O*1.3,k=Math.sin(F)*O*.9,nt=o(Y,k);if(!(nt<b||a(Y,k))&&!(hn(Y/160,k/160,3)*.9+.2<P*e()))return[Y,k,nt]}return null},R=0;for(let b=0;b<l;b++){let M=C(38,1350,.9);if(!M)continue;let[P,B]=M,F=9+e()*8,O=4+e()*3.5;L.set((e()-.5)*.12,e()*6,(e()-.5)*.12),y.setFromEuler(L),p.compose(x.set(P,F*.5,B),y,v.set(1,F,1)),g.setMatrixAt(R,p),p.compose(x.set(P,F,B),y,v.set(O,O*.9,O)),d.setMatrixAt(R,p),d.setColorAt(R,E.setHSL(.25+e()*.04,.22+e()*.1,.24+e()*.08)),R++}d.count=g.count=R,R=0;for(let b=0;b<c;b++){let M=C(34,1400,.7);if(!M)continue;let[P,B]=M,F=3+e()*3.4;p.compose(x.set(P,F*.8,B),y.identity(),v.set(F,F*.85,F)),_.setMatrixAt(R,p),_.setColorAt(R,E.setHSL(.2+e()*.07,.2+e()*.12,.3+e()*.1)),R++}_.count=R,R=0;for(let b=0;b<h;b++){let M=C(20,1200,.4);if(!M)continue;let[P,B]=M,F=.8+e()*1.6;p.compose(x.set(P,F*.35,B),y.identity(),v.set(F*1.4,F*.7,F*1.2)),m.setMatrixAt(R,p),m.setColorAt(R,E.setHSL(.17+e()*.07,.16+e()*.12,.4+e()*.1)),R++}m.count=R;for(let b of[d,g,_,m])b.castShadow=i.quality!=="low",b.receiveShadow=!0,r.add(b)}function Sd(i,t){let{rng:e,track:n,root:s,updaters:r}=i,o=i.layout,{distanceToTrack:a,isKeepClearZone:l,count:c}=t,h=new ft({map:tu(),alphaTest:.45,side:ge,roughness:1,color:14870728});h.onBeforeCompile=y=>{y.uniforms.uTime={value:0},h.userData.sh=y,y.vertexShader=`uniform float uTime;
`+y.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        float sway = sin(uTime * 1.7 + instanceMatrix[3].x * .37 + instanceMatrix[3].z * .23) * .12 * uv.y;
        transformed.x += sway; transformed.z += sway * .6;`)};let u=new ie(1,.62);u.translate(0,.31,0);let f=Math.round(3e3*i.density),d=new Ke(u,h,f),g=new Xt,_=new Ye,m=new Oe,p=0;for(let y=0;y<f*3&&p<f;y++){let v=e(),x,L;if(v<.5)x=qe(-560,460,e()),L=o.straightZ+12+e()*14;else{let C=Math.floor(e()*160),R=n[C],b=n[(C+1)%c],M=-(b.y-R.y),P=b.x-R.x,B=Math.hypot(M,P)||1,F=(e()>.5?1:-1)*(12+e()*22);x=R.x+M/B*F,L=R.y+P/B*F}if(l(x,L)&&L<o.straightZ+11||a(x,L)<9.5)continue;m.set(0,e()*Math.PI,0),_.setFromEuler(m);let E=.55+e()*.6;g.compose(new A(x,0,L),_,new A(E,E,E)),d.setMatrixAt(p++,g)}d.count=p,s.add(d),r.push(y=>{h.userData.sh&&(h.userData.sh.uniforms.uTime.value=y)})}function bd(i,{quality:t="high"}={}){let e=Zu(i,t),n=e.layout,s=ud(e.track);cd(e),hd(e),_d(e,s),od(e),ad(e),Ku(e),$u(e),Qu(e),id(e),Md(e,s),Sd(e,s),js(e,n.grandstandX0+8,17,n.grandstandZ+16,15282981,e.root),js(e,n.grandstandX1-8,17,n.grandstandZ+16,16118766,e.root),Wu(e);let{updaters:r}=e;return{root:e.root,materials:e.materials,layout:n,track:e.track,update(o,a){for(let l of r)l(o,a)}}}var $v=[.26,.37,.47,.7,.95];async function MS({canvas:i,trackUrl:t,carUrl:e,carMetaUrl:n,quality:s="high",onProgress:r=()=>{}}){let o=Uu(i,s),a=Du(s),l=new Jn;l.fog=new qr(14279913,140,3300);let c=new Pe(36,1,.3,9e3),h=Bu();l.add(zu(h));let{hemi:u,sun:f}=yu(l,o,s),d=Vu({renderer:o,scene:l,skyMaterial:h,quality:s}),g=Cu(s),[_,m]=await Promise.all([fetch(t).then(J=>J.json()),fetch(n).then(J=>J.json())]);r(.15);let p=_.pts,y=bd(p,{quality:s,renderer:o});l.add(y.root),r(.35);let v=await eu(e,m,{quality:s,onProgress:J=>J.total&&r(.35+.55*J.loaded/J.total)});l.add(v.root),Au(v.root),r(.92);let x=Hu(p);l.add(x.mesh);let L=y.root.userData.openBox,E=mu();l.add(...E.members),gu(l);let C=_u(l),R=Vh(p),b=au(R),M=iu(R,p),P=ru(su(M)),B=lu(v,b,M.arrival),F=kh(c,Fh,B.frame),O=Lu(),Y=performance.now(),k=0,nt=!1,H=!0,at=0,pt=0,yt=0,Dt=Nu(i,o,c,a);function Jt(J){at=requestAnimationFrame(Jt);let ut=Math.min(.05,(J-Y)/1e3);if(Y=J,k+=ut,!H)return;Dt.update(),O.advance(ut);let tt=O.value,wt=O.introEase,Ut=P(tt);O.intro<1&&(Ut=ou(Ut,O.intro,M)),B.update(Ut,ut,k),xu(E,tt,k,b,M.pitBox,L),vu(C,tt,k);let Lt=Mu(tt),Yt=Gu(Lt),$=Su(Yt);bu(Yt,{sun:f,hemi:u}),ku(h,Yt,$),wu(Yt,{scene:l,renderer:o}),d.refreshIfNeeded(Lt),F.update({progress:tt,introEase:wt,clock:k,debugCam:X.debugCam,width:Dt.width,height:Dt.height,framingX:pt,framingY:yt}),Tu(f,$,F.position,F.target,B.frame.p),x.update(tt),y.update(k,ut),Iu(o,l,c,g,Ru(g,tt))}d.capture(0),Fu(l,o,s),Ou(l),r(1);let X={renderer:o,scene:l,camera:c,car:v,world:y,STAGES:Pu,setProgress(J){O.target=qt(J,0,1)},get progress(){return O.value},skipIntro(){O.finishIntro()},jump(J){O.target=O.value=qt(J,0,1),O.velocity=0,B.lastDistance=P(O.value),O.finishIntro()},async warmup(){let J=[];l.traverse(tt=>{tt.visible||(J.push(tt),tt.visible=!0)});try{o.compileAsync&&o.extensions.has("KHR_parallel_shader_compile")?await o.compileAsync(l,c):o.compile(l,c)}catch{}for(let tt of J)tt.visible=!1;let ut=[O.value,B.lastDistance,B.wheelDistance,O.intro,O.introDone];for(let tt of $v)X.renderAt(tt),await new Promise(wt=>requestAnimationFrame(wt));[O.value,B.lastDistance,B.wheelDistance,O.intro,O.introDone]=ut,O.target=O.value,O.velocity=0,B.speed=B.prevSpeed=0,O.snap=!1},setFraming(J=0,ut=0){pt=J,yt=ut},start(){nt||(nt=!0,O.snap=!1,Y=performance.now(),at=requestAnimationFrame(Jt))},stop(){nt=!1,cancelAnimationFrame(at)},setVisible(J){H=J},renderAt(J,{intro:ut=1,speed:tt=null,dt:wt=0}={}){O.target=O.value=J,O.velocity=0,O.intro=ut,O.introDone=ut>=1,O.snap=!0,wt||(B.lastDistance=P(J)),tt!=null&&(B.speed=tt),Y=performance.now()-wt*1e3,Jt(performance.now()),cancelAnimationFrame(at)},debugCam:null,setResScale(J){Dt.resScale=qt(J,.2,1)},get resScale(){return Dt.resScale},get basePixelRatio(){return Math.min(window.devicePixelRatio||1,a)}};return X}export{MS as createJourney};
