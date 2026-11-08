var wc="170";var $h=0,Vc=1,Kh=2;var th=1,Tc=2,An=3,Jn=0,Oe=1,Ee=2,qn=0,ts=1,Gc=2,Wc=3,Xc=4,Qh=5,di=100,jh=101,tu=102,eu=103,nu=104,iu=200,su=201,ru=202,ou=203,sa=204,ra=205,au=206,cu=207,lu=208,hu=209,uu=210,du=211,fu=212,pu=213,mu=214,oa=0,aa=1,ca=2,ss=3,la=4,ha=5,ua=6,da=7,eh=0,gu=1,xu=2,Yn=0,_u=1,vu=2,yu=3,Mu=4,Su=5,Ac=6,Eu=7;var nh=300,rs=301,os=302,fa=303,pa=304,go=306,gi=1e3,pi=1001,ma=1002,$e=1003,bu=1004;var cr=1005;var xn=1006,bo=1007;var mi=1008;var Pn=1009,ih=1010,sh=1011,Hs=1012,Rc=1013,xi=1014,_n=1015,ti=1016,Cc=1017,Ic=1018,as=1020,rh=35902,oh=1021,ah=1022,un=1023,ch=1024,lh=1025,es=1026,cs=1027,Pc=1028,Lc=1029,hh=1030,Dc=1031;var Uc=1033,Or=33776,Br=33777,zr=33778,Hr=33779,ga=35840,xa=35841,_a=35842,va=35843,ya=36196,Ma=37492,Sa=37496,Ea=37808,ba=37809,wa=37810,Ta=37811,Aa=37812,Ra=37813,Ca=37814,Ia=37815,Pa=37816,La=37817,Da=37818,Ua=37819,Na=37820,Fa=37821,kr=36492,Oa=36494,Ba=36495,uh=36283,za=36284,Ha=36285,ka=36286;var Vr=2300,Va=2301,wo=2302,qc=2400,Yc=2401,Zc=2402;var wu=3200,Tu=3201;var dh=0,Au=1,Wn="",we="srgb",ys="srgb-linear",xo="linear",le="srgb";var Di=7680;var Jc=519,Ru=512,Cu=513,Iu=514,fh=515,Pu=516,Lu=517,Du=518,Uu=519,Ga=35044;var $c="300 es",Cn=2e3,Gr=2001,$n=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Ue=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Kc=1234567,Ns=Math.PI/180,ks=180/Math.PI;function vn(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ue[i&255]+Ue[i>>8&255]+Ue[i>>16&255]+Ue[i>>24&255]+"-"+Ue[t&255]+Ue[t>>8&255]+"-"+Ue[t>>16&15|64]+Ue[t>>24&255]+"-"+Ue[e&63|128]+Ue[e>>8&255]+"-"+Ue[e>>16&255]+Ue[e>>24&255]+Ue[n&255]+Ue[n>>8&255]+Ue[n>>16&255]+Ue[n>>24&255]).toLowerCase()}function Te(i,t,e){return Math.max(t,Math.min(e,i))}function Nc(i,t){return(i%t+t)%t}function Nu(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Fu(i,t,e){return i!==t?(e-i)/(t-i):0}function Fs(i,t,e){return(1-e)*i+e*t}function Ou(i,t,e,n){return Fs(i,t,1-Math.exp(-e*n))}function Bu(i,t=1){return t-Math.abs(Nc(i,t*2)-t)}function zu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Hu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function ku(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Vu(i,t){return i+Math.random()*(t-i)}function Gu(i){return i*(.5-Math.random())}function Wu(i){i!==void 0&&(Kc=i);let t=Kc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Xu(i){return i*Ns}function qu(i){return i*ks}function Yu(i){return(i&i-1)===0&&i!==0}function Zu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ju(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function $u(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),f=r((t-n)/2),d=o((t-n)/2),u=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*f,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*f,a*l);break;case"ZXZ":i.set(c*f,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*u,a*l);break;case"YXY":i.set(c*u,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*u,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function hn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function oe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var sr={DEG2RAD:Ns,RAD2DEG:ks,generateUUID:vn,clamp:Te,euclideanModulo:Nc,mapLinear:Nu,inverseLerp:Fu,lerp:Fs,damp:Ou,pingpong:Bu,smoothstep:zu,smootherstep:Hu,randInt:ku,randFloat:Vu,randFloatSpread:Gu,seededRandom:Wu,degToRad:Xu,radToDeg:qu,isPowerOfTwo:Yu,ceilPowerOfTwo:Zu,floorPowerOfTwo:Ju,setQuaternionFromProperEuler:$u,normalize:oe,denormalize:hn},dt=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Zt=class i{constructor(t,e,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],f=n[7],d=n[2],u=n[5],g=n[8],_=s[0],m=s[3],p=s[6],w=s[1],v=s[4],x=s[7],S=s[2],T=s[5],C=s[8];return r[0]=o*_+a*w+c*S,r[3]=o*m+a*v+c*T,r[6]=o*p+a*x+c*C,r[1]=l*_+h*w+f*S,r[4]=l*m+h*v+f*T,r[7]=l*p+h*x+f*C,r[2]=d*_+u*w+g*S,r[5]=d*m+u*v+g*T,r[8]=d*p+u*x+g*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],f=h*o-a*l,d=a*c-h*r,u=l*r-o*c,g=e*f+n*d+s*u;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=f*_,t[1]=(s*l-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=d*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=u*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(To.makeScale(t,e)),this}rotate(t){return this.premultiply(To.makeRotation(-t)),this}translate(t,e){return this.premultiply(To.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},To=new Zt;function ph(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Vs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ku(){let i=Vs("canvas");return i.style.display="block",i}var Qc={};function Ds(i){i in Qc||(Qc[i]=!0,console.warn(i))}function Qu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function ju(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function td(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var ie={enabled:!0,workingColorSpace:ys,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===le&&(i.r=In(i.r),i.g=In(i.g),i.b=In(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===le&&(i.r=ns(i.r),i.g=ns(i.g),i.b=ns(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Wn?xo:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function In(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ns(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var jc=[.64,.33,.3,.6,.15,.06],tl=[.2126,.7152,.0722],el=[.3127,.329],nl=new Zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),il=new Zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ie.define({[ys]:{primaries:jc,whitePoint:el,transfer:xo,toXYZ:nl,fromXYZ:il,luminanceCoefficients:tl,workingColorSpaceConfig:{unpackColorSpace:we},outputColorSpaceConfig:{drawingBufferColorSpace:we}},[we]:{primaries:jc,whitePoint:el,transfer:le,toXYZ:nl,fromXYZ:il,luminanceCoefficients:tl,outputColorSpaceConfig:{drawingBufferColorSpace:we}}});var Ui,Wa=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ui===void 0&&(Ui=Vs("canvas")),Ui.width=t.width,Ui.height=t.height;let n=Ui.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ui}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Vs("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=In(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(In(e[n]/255)*255):e[n]=In(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},ed=0,Wr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ed++}),this.uuid=vn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ao(s[o].image)):r.push(Ao(s[o]))}else r=Ao(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Ao(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Wa.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var nd=0,Xe=class i extends $n{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=pi,s=pi,r=xn,o=mi,a=un,c=Pn,l=i.DEFAULT_ANISOTROPY,h=Wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:nd++}),this.uuid=vn(),this.name="",this.source=new Wr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new dt(0,0),this.repeat=new dt(1,1),this.center=new dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==nh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case gi:t.x=t.x-Math.floor(t.x);break;case pi:t.x=t.x<0?0:1;break;case ma:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case gi:t.y=t.y-Math.floor(t.y);break;case pi:t.y=t.y<0?0:1;break;case ma:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Xe.DEFAULT_IMAGE=null;Xe.DEFAULT_MAPPING=nh;Xe.DEFAULT_ANISOTROPY=1;var he=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],f=c[8],d=c[1],u=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+u+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(l+1)/2,x=(u+1)/2,S=(p+1)/2,T=(h+d)/4,C=(f+_)/4,U=(g+m)/4;return v>x&&v>S?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=T/n,r=C/n):x>S?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=T/s,r=U/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=C/r,s=U/r),this.set(n,s,r,e),this}let w=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(d-h)*(d-h));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(f-_)/w,this.z=(d-h)/w,this.w=Math.acos((l+u+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Xa=class extends $n{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new he(0,0,t,e),this.scissorTest=!1,this.viewport=new he(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new Xe(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Wr(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},en=class extends Xa{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Xr=class extends Xe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var qa=class extends Xe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var nn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],f=n[s+3],d=r[o+0],u=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=f;return}if(a===1){t[e+0]=d,t[e+1]=u,t[e+2]=g,t[e+3]=_;return}if(f!==_||c!==d||l!==u||h!==g){let m=1-a,p=c*d+l*u+h*g+f*_,w=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){let S=Math.sqrt(v),T=Math.atan2(S,p*w);m=Math.sin(m*T)/S,a=Math.sin(a*T)/S}let x=a*w;if(c=c*m+d*x,l=l*m+u*x,h=h*m+g*x,f=f*m+_*x,m===1-a){let S=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=S,l*=S,h*=S,f*=S}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],f=r[o],d=r[o+1],u=r[o+2],g=r[o+3];return t[e]=a*g+h*f+c*u-l*d,t[e+1]=c*g+h*d+l*f-a*u,t[e+2]=l*g+h*u+a*d-c*f,t[e+3]=h*g-a*f-c*d-l*u,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),f=a(r/2),d=c(n/2),u=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*f+l*u*g,this._y=l*u*f-d*h*g,this._z=l*h*g+d*u*f,this._w=l*h*f-d*u*g;break;case"YXZ":this._x=d*h*f+l*u*g,this._y=l*u*f-d*h*g,this._z=l*h*g-d*u*f,this._w=l*h*f+d*u*g;break;case"ZXY":this._x=d*h*f-l*u*g,this._y=l*u*f+d*h*g,this._z=l*h*g+d*u*f,this._w=l*h*f-d*u*g;break;case"ZYX":this._x=d*h*f-l*u*g,this._y=l*u*f+d*h*g,this._z=l*h*g-d*u*f,this._w=l*h*f+d*u*g;break;case"YZX":this._x=d*h*f+l*u*g,this._y=l*u*f+d*h*g,this._z=l*h*g-d*u*f,this._w=l*h*f-d*u*g;break;case"XZY":this._x=d*h*f-l*u*g,this._y=l*u*f-d*h*g,this._z=l*h*g+d*u*f,this._w=l*h*f+d*u*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],f=e[10],d=n+a+f;if(d>0){let u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(h-c)*u,this._y=(r-l)*u,this._z=(o-s)*u}else if(n>a&&n>f){let u=2*Math.sqrt(1+n-a-f);this._w=(h-c)/u,this._x=.25*u,this._y=(s+o)/u,this._z=(r+l)/u}else if(a>f){let u=2*Math.sqrt(1+a-n-f);this._w=(r-l)/u,this._x=(s+o)/u,this._y=.25*u,this._z=(c+h)/u}else{let u=2*Math.sqrt(1+f-n-a);this._w=(o-s)/u,this._x=(r+l)/u,this._y=(c+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Te(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let u=1-e;return this._w=u*o+e*this._w,this._x=u*n+e*this._x,this._y=u*s+e*this._y,this._z=u*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),f=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*f+this._w*d,this._x=n*f+this._x*d,this._y=s*f+this._y*d,this._z=r*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(sl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(sl.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),f=2*(r*n-o*e);return this.x=e+c*l+o*f-a*h,this.y=n+c*h+a*l-r*f,this.z=s+c*f+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ro.copy(this).projectOnVector(t),this.sub(Ro)}reflect(t){return this.sub(Ro.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ro=new L,sl=new nn,Ln=class{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(an.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(an.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=an.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,an):an.fromBufferAttribute(r,o),an.applyMatrix4(t.matrixWorld),this.expandByPoint(an);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),lr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),lr.copy(n.boundingBox)),lr.applyMatrix4(t.matrixWorld),this.union(lr)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,an),an.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Es),hr.subVectors(this.max,Es),Ni.subVectors(t.a,Es),Fi.subVectors(t.b,Es),Oi.subVectors(t.c,Es),Bn.subVectors(Fi,Ni),zn.subVectors(Oi,Fi),ri.subVectors(Ni,Oi);let e=[0,-Bn.z,Bn.y,0,-zn.z,zn.y,0,-ri.z,ri.y,Bn.z,0,-Bn.x,zn.z,0,-zn.x,ri.z,0,-ri.x,-Bn.y,Bn.x,0,-zn.y,zn.x,0,-ri.y,ri.x,0];return!Co(e,Ni,Fi,Oi,hr)||(e=[1,0,0,0,1,0,0,0,1],!Co(e,Ni,Fi,Oi,hr))?!1:(ur.crossVectors(Bn,zn),e=[ur.x,ur.y,ur.z],Co(e,Ni,Fi,Oi,hr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,an).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(an).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Sn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Sn=[new L,new L,new L,new L,new L,new L,new L,new L],an=new L,lr=new Ln,Ni=new L,Fi=new L,Oi=new L,Bn=new L,zn=new L,ri=new L,Es=new L,hr=new L,ur=new L,oi=new L;function Co(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){oi.fromArray(i,r);let a=s.x*Math.abs(oi.x)+s.y*Math.abs(oi.y)+s.z*Math.abs(oi.z),c=t.dot(oi),l=e.dot(oi),h=n.dot(oi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var id=new Ln,bs=new L,Io=new L,_i=class{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):id.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;bs.subVectors(t,this.center);let e=bs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(bs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Io.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(bs.copy(t.center).add(Io)),this.expandByPoint(bs.copy(t.center).sub(Io))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},En=new L,Po=new L,dr=new L,Hn=new L,Lo=new L,fr=new L,Do=new L,Ya=class{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,En)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=En.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(En.copy(this.origin).addScaledVector(this.direction,e),En.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Po.copy(t).add(e).multiplyScalar(.5),dr.copy(e).sub(t).normalize(),Hn.copy(this.origin).sub(Po);let r=t.distanceTo(e)*.5,o=-this.direction.dot(dr),a=Hn.dot(this.direction),c=-Hn.dot(dr),l=Hn.lengthSq(),h=Math.abs(1-o*o),f,d,u,g;if(h>0)if(f=o*c-a,d=o*a-c,g=r*h,f>=0)if(d>=-g)if(d<=g){let _=1/h;f*=_,d*=_,u=f*(f+o*d+2*a)+d*(o*f+d+2*c)+l}else d=r,f=Math.max(0,-(o*d+a)),u=-f*f+d*(d+2*c)+l;else d=-r,f=Math.max(0,-(o*d+a)),u=-f*f+d*(d+2*c)+l;else d<=-g?(f=Math.max(0,-(-o*r+a)),d=f>0?-r:Math.min(Math.max(-r,-c),r),u=-f*f+d*(d+2*c)+l):d<=g?(f=0,d=Math.min(Math.max(-r,-c),r),u=d*(d+2*c)+l):(f=Math.max(0,-(o*r+a)),d=f>0?r:Math.min(Math.max(-r,-c),r),u=-f*f+d*(d+2*c)+l);else d=o>0?-r:r,f=Math.max(0,-(o*d+a)),u=-f*f+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Po).addScaledVector(dr,d),u}intersectSphere(t,e){En.subVectors(t.center,this.origin);let n=En.dot(this.direction),s=En.dot(En)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-d.z)*f,c=(t.max.z-d.z)*f):(a=(t.max.z-d.z)*f,c=(t.min.z-d.z)*f),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,En)!==null}intersectTriangle(t,e,n,s,r){Lo.subVectors(e,t),fr.subVectors(n,t),Do.crossVectors(Lo,fr);let o=this.direction.dot(Do),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Hn.subVectors(this.origin,t);let c=a*this.direction.dot(fr.crossVectors(Hn,fr));if(c<0)return null;let l=a*this.direction.dot(Lo.cross(Hn));if(l<0||c+l>o)return null;let h=-a*Hn.dot(Do);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Qt=class i{constructor(t,e,n,s,r,o,a,c,l,h,f,d,u,g,_,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,f,d,u,g,_,m)}set(t,e,n,s,r,o,a,c,l,h,f,d,u,g,_,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=f,p[14]=d,p[3]=u,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Bi.setFromMatrixColumn(t,0).length(),r=1/Bi.setFromMatrixColumn(t,1).length(),o=1/Bi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let d=o*h,u=o*f,g=a*h,_=a*f;e[0]=c*h,e[4]=-c*f,e[8]=l,e[1]=u+g*l,e[5]=d-_*l,e[9]=-a*c,e[2]=_-d*l,e[6]=g+u*l,e[10]=o*c}else if(t.order==="YXZ"){let d=c*h,u=c*f,g=l*h,_=l*f;e[0]=d+_*a,e[4]=g*a-u,e[8]=o*l,e[1]=o*f,e[5]=o*h,e[9]=-a,e[2]=u*a-g,e[6]=_+d*a,e[10]=o*c}else if(t.order==="ZXY"){let d=c*h,u=c*f,g=l*h,_=l*f;e[0]=d-_*a,e[4]=-o*f,e[8]=g+u*a,e[1]=u+g*a,e[5]=o*h,e[9]=_-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let d=o*h,u=o*f,g=a*h,_=a*f;e[0]=c*h,e[4]=g*l-u,e[8]=d*l+_,e[1]=c*f,e[5]=_*l+d,e[9]=u*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let d=o*c,u=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=_-d*f,e[8]=g*f+u,e[1]=f,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=u*f+g,e[10]=d-_*f}else if(t.order==="XZY"){let d=o*c,u=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=-f,e[8]=l*h,e[1]=d*f+_,e[5]=o*h,e[9]=u*f-g,e[2]=g*f-u,e[6]=a*h,e[10]=_*f+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(sd,t,rd)}lookAt(t,e,n){let s=this.elements;return Ze.subVectors(t,e),Ze.lengthSq()===0&&(Ze.z=1),Ze.normalize(),kn.crossVectors(n,Ze),kn.lengthSq()===0&&(Math.abs(n.z)===1?Ze.x+=1e-4:Ze.z+=1e-4,Ze.normalize(),kn.crossVectors(n,Ze)),kn.normalize(),pr.crossVectors(Ze,kn),s[0]=kn.x,s[4]=pr.x,s[8]=Ze.x,s[1]=kn.y,s[5]=pr.y,s[9]=Ze.y,s[2]=kn.z,s[6]=pr.z,s[10]=Ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],f=n[5],d=n[9],u=n[13],g=n[2],_=n[6],m=n[10],p=n[14],w=n[3],v=n[7],x=n[11],S=n[15],T=s[0],C=s[4],U=s[8],b=s[12],M=s[1],N=s[5],Z=s[9],G=s[13],J=s[2],I=s[6],R=s[10],F=s[14],D=s[3],k=s[7],Y=s[11],q=s[15];return r[0]=o*T+a*M+c*J+l*D,r[4]=o*C+a*N+c*I+l*k,r[8]=o*U+a*Z+c*R+l*Y,r[12]=o*b+a*G+c*F+l*q,r[1]=h*T+f*M+d*J+u*D,r[5]=h*C+f*N+d*I+u*k,r[9]=h*U+f*Z+d*R+u*Y,r[13]=h*b+f*G+d*F+u*q,r[2]=g*T+_*M+m*J+p*D,r[6]=g*C+_*N+m*I+p*k,r[10]=g*U+_*Z+m*R+p*Y,r[14]=g*b+_*G+m*F+p*q,r[3]=w*T+v*M+x*J+S*D,r[7]=w*C+v*N+x*I+S*k,r[11]=w*U+v*Z+x*R+S*Y,r[15]=w*b+v*G+x*F+S*q,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],f=t[6],d=t[10],u=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*c*f-s*l*f-r*a*d+n*l*d+s*a*u-n*c*u)+_*(+e*c*u-e*l*d+r*o*d-s*o*u+s*l*h-r*c*h)+m*(+e*l*f-e*a*u-r*o*f+n*o*u+r*a*h-n*l*h)+p*(-s*a*h-e*c*f+e*a*d+s*o*f-n*o*d+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],f=t[9],d=t[10],u=t[11],g=t[12],_=t[13],m=t[14],p=t[15],w=f*m*l-_*d*l+_*c*u-a*m*u-f*c*p+a*d*p,v=g*d*l-h*m*l-g*c*u+o*m*u+h*c*p-o*d*p,x=h*_*l-g*f*l+g*a*u-o*_*u-h*a*p+o*f*p,S=g*f*c-h*_*c-g*a*d+o*_*d+h*a*m-o*f*m,T=e*w+n*v+s*x+r*S;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/T;return t[0]=w*C,t[1]=(_*d*r-f*m*r-_*s*u+n*m*u+f*s*p-n*d*p)*C,t[2]=(a*m*r-_*c*r+_*s*l-n*m*l-a*s*p+n*c*p)*C,t[3]=(f*c*r-a*d*r-f*s*l+n*d*l+a*s*u-n*c*u)*C,t[4]=v*C,t[5]=(h*m*r-g*d*r+g*s*u-e*m*u-h*s*p+e*d*p)*C,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*C,t[7]=(o*d*r-h*c*r+h*s*l-e*d*l-o*s*u+e*c*u)*C,t[8]=x*C,t[9]=(g*f*r-h*_*r-g*n*u+e*_*u+h*n*p-e*f*p)*C,t[10]=(o*_*r-g*a*r+g*n*l-e*_*l-o*n*p+e*a*p)*C,t[11]=(h*a*r-o*f*r-h*n*l+e*f*l+o*n*u-e*a*u)*C,t[12]=S*C,t[13]=(h*_*s-g*f*s+g*n*d-e*_*d-h*n*m+e*f*m)*C,t[14]=(g*a*s-o*_*s-g*n*c+e*_*c+o*n*m-e*a*m)*C,t[15]=(o*f*s-h*a*s+h*n*c-e*f*c-o*n*d+e*a*d)*C,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,f=a+a,d=r*l,u=r*h,g=r*f,_=o*h,m=o*f,p=a*f,w=c*l,v=c*h,x=c*f,S=n.x,T=n.y,C=n.z;return s[0]=(1-(_+p))*S,s[1]=(u+x)*S,s[2]=(g-v)*S,s[3]=0,s[4]=(u-x)*T,s[5]=(1-(d+p))*T,s[6]=(m+w)*T,s[7]=0,s[8]=(g+v)*C,s[9]=(m-w)*C,s[10]=(1-(d+_))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Bi.set(s[0],s[1],s[2]).length(),o=Bi.set(s[4],s[5],s[6]).length(),a=Bi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],cn.copy(this);let l=1/r,h=1/o,f=1/a;return cn.elements[0]*=l,cn.elements[1]*=l,cn.elements[2]*=l,cn.elements[4]*=h,cn.elements[5]*=h,cn.elements[6]*=h,cn.elements[8]*=f,cn.elements[9]*=f,cn.elements[10]*=f,e.setFromRotationMatrix(cn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Cn){let c=this.elements,l=2*r/(e-t),h=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s),u,g;if(a===Cn)u=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Gr)u=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=u,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Cn){let c=this.elements,l=1/(e-t),h=1/(n-s),f=1/(o-r),d=(e+t)*l,u=(n+s)*h,g,_;if(a===Cn)g=(o+r)*f,_=-2*f;else if(a===Gr)g=r*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-u,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Bi=new L,cn=new Qt,sd=new L(0,0,0),rd=new L(1,1,1),kn=new L,pr=new L,Ze=new L,rl=new Qt,ol=new nn,Ye=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],f=s[2],d=s[6],u=s[10];switch(e){case"XYZ":this._y=Math.asin(Te(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Te(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,u),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Te(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,u),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Te(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Te(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,u));break;case"XZY":this._z=Math.asin(-Te(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,u),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return rl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(rl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ol.setFromEuler(this),this.setFromQuaternion(ol,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ye.DEFAULT_ORDER="XYZ";var qr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},od=0,al=new L,zi=new nn,bn=new Qt,mr=new L,ws=new L,ad=new L,cd=new nn,cl=new L(1,0,0),ll=new L(0,1,0),hl=new L(0,0,1),ul={type:"added"},ld={type:"removed"},Hi={type:"childadded",child:null},Uo={type:"childremoved",child:null},Be=class i extends $n{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:od++}),this.uuid=vn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new L,e=new Ye,n=new nn,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Qt},normalMatrix:{value:new Zt}}),this.matrix=new Qt,this.matrixWorld=new Qt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new qr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return zi.setFromAxisAngle(t,e),this.quaternion.multiply(zi),this}rotateOnWorldAxis(t,e){return zi.setFromAxisAngle(t,e),this.quaternion.premultiply(zi),this}rotateX(t){return this.rotateOnAxis(cl,t)}rotateY(t){return this.rotateOnAxis(ll,t)}rotateZ(t){return this.rotateOnAxis(hl,t)}translateOnAxis(t,e){return al.copy(t).applyQuaternion(this.quaternion),this.position.add(al.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(cl,t)}translateY(t){return this.translateOnAxis(ll,t)}translateZ(t){return this.translateOnAxis(hl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(bn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?mr.copy(t):mr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ws.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bn.lookAt(ws,mr,this.up):bn.lookAt(mr,ws,this.up),this.quaternion.setFromRotationMatrix(bn),s&&(bn.extractRotation(s.matrixWorld),zi.setFromRotationMatrix(bn),this.quaternion.premultiply(zi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ul),Hi.child=t,this.dispatchEvent(Hi),Hi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ld),Uo.child=t,this.dispatchEvent(Uo),Uo.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),bn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),bn.multiply(t.parent.matrixWorld)),t.applyMatrix4(bn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ul),Hi.child=t,this.dispatchEvent(Hi),Hi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ws,t,ad),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ws,cd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),f=o(t.shapes),d=o(t.skeletons),u=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),u.length>0&&(n.animations=u),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Be.DEFAULT_UP=new L(0,1,0);Be.DEFAULT_MATRIX_AUTO_UPDATE=!0;Be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ln=new L,wn=new L,No=new L,Tn=new L,ki=new L,Vi=new L,dl=new L,Fo=new L,Oo=new L,Bo=new L,zo=new he,Ho=new he,ko=new he,Xn=class i{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),ln.subVectors(t,e),s.cross(ln);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){ln.subVectors(s,e),wn.subVectors(n,e),No.subVectors(t,e);let o=ln.dot(ln),a=ln.dot(wn),c=ln.dot(No),l=wn.dot(wn),h=wn.dot(No),f=o*l-a*a;if(f===0)return r.set(0,0,0),null;let d=1/f,u=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-u-g,g,u)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Tn)===null?!1:Tn.x>=0&&Tn.y>=0&&Tn.x+Tn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Tn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Tn.x),c.addScaledVector(o,Tn.y),c.addScaledVector(a,Tn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return zo.setScalar(0),Ho.setScalar(0),ko.setScalar(0),zo.fromBufferAttribute(t,e),Ho.fromBufferAttribute(t,n),ko.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(zo,r.x),o.addScaledVector(Ho,r.y),o.addScaledVector(ko,r.z),o}static isFrontFacing(t,e,n,s){return ln.subVectors(n,e),wn.subVectors(t,e),ln.cross(wn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ln.subVectors(this.c,this.b),wn.subVectors(this.a,this.b),ln.cross(wn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;ki.subVectors(s,n),Vi.subVectors(r,n),Fo.subVectors(t,n);let c=ki.dot(Fo),l=Vi.dot(Fo);if(c<=0&&l<=0)return e.copy(n);Oo.subVectors(t,s);let h=ki.dot(Oo),f=Vi.dot(Oo);if(h>=0&&f<=h)return e.copy(s);let d=c*f-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(ki,o);Bo.subVectors(t,r);let u=ki.dot(Bo),g=Vi.dot(Bo);if(g>=0&&u<=g)return e.copy(r);let _=u*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(Vi,a);let m=h*g-u*f;if(m<=0&&f-h>=0&&u-g>=0)return dl.subVectors(r,s),a=(f-h)/(f-h+(u-g)),e.copy(s).addScaledVector(dl,a);let p=1/(m+_+d);return o=_*p,a=d*p,e.copy(n).addScaledVector(ki,o).addScaledVector(Vi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},mh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vn={h:0,s:0,l:0},gr={h:0,s:0,l:0};function Vo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var kt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=we){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ie.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ie.workingColorSpace){return this.r=t,this.g=e,this.b=n,ie.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ie.workingColorSpace){if(t=Nc(t,1),e=Te(e,0,1),n=Te(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Vo(o,r,t+1/3),this.g=Vo(o,r,t),this.b=Vo(o,r,t-1/3)}return ie.toWorkingColorSpace(this,s),this}setStyle(t,e=we){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=we){let n=mh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=In(t.r),this.g=In(t.g),this.b=In(t.b),this}copyLinearToSRGB(t){return this.r=ns(t.r),this.g=ns(t.g),this.b=ns(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=we){return ie.fromWorkingColorSpace(Ne.copy(this),t),Math.round(Te(Ne.r*255,0,255))*65536+Math.round(Te(Ne.g*255,0,255))*256+Math.round(Te(Ne.b*255,0,255))}getHexString(t=we){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ie.workingColorSpace){ie.fromWorkingColorSpace(Ne.copy(this),e);let n=Ne.r,s=Ne.g,r=Ne.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let f=o-a;switch(l=h<=.5?f/(o+a):f/(2-o-a),o){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ie.workingColorSpace){return ie.fromWorkingColorSpace(Ne.copy(this),e),t.r=Ne.r,t.g=Ne.g,t.b=Ne.b,t}getStyle(t=we){ie.fromWorkingColorSpace(Ne.copy(this),t);let e=Ne.r,n=Ne.g,s=Ne.b;return t!==we?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Vn),this.setHSL(Vn.h+t,Vn.s+e,Vn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Vn),t.getHSL(gr);let n=Fs(Vn.h,gr.h,e),s=Fs(Vn.s,gr.s,e),r=Fs(Vn.l,gr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ne=new kt;kt.NAMES=mh;var hd=0,Kn=class extends $n{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hd++}),this.uuid=vn(),this.name="",this.blending=ts,this.side=Jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=sa,this.blendDst=ra,this.blendEquation=di,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new kt(0,0,0),this.blendAlpha=0,this.depthFunc=ss,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Di,this.stencilZFail=Di,this.stencilZPass=Di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ts&&(n.blending=this.blending),this.side!==Jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==sa&&(n.blendSrc=this.blendSrc),this.blendDst!==ra&&(n.blendDst=this.blendDst),this.blendEquation!==di&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ss&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Jc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Di&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Di&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Di&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},ve=class extends Kn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ye,this.combine=eh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Se=new L,xr=new dt,Pe=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ga,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)xr.fromBufferAttribute(this,e),xr.applyMatrix3(t),this.setXY(e,xr.x,xr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix3(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix4(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyNormalMatrix(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.transformDirection(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=hn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=oe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=hn(e,this.array)),e}setX(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=hn(e,this.array)),e}setY(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=hn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=hn(e,this.array)),e}setW(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array),s=oe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array),s=oe(s,this.array),r=oe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ga&&(t.usage=this.usage),t}};var Yr=class extends Pe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Zr=class extends Pe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Gt=class extends Pe{constructor(t,e,n){super(new Float32Array(t),e,n)}},ud=0,tn=new Qt,Go=new Be,Gi=new L,Je=new Ln,Ts=new Ln,Ie=new L,fe=class i extends $n{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ud++}),this.uuid=vn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ph(t)?Zr:Yr)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return tn.makeRotationFromQuaternion(t),this.applyMatrix4(tn),this}rotateX(t){return tn.makeRotationX(t),this.applyMatrix4(tn),this}rotateY(t){return tn.makeRotationY(t),this.applyMatrix4(tn),this}rotateZ(t){return tn.makeRotationZ(t),this.applyMatrix4(tn),this}translate(t,e,n){return tn.makeTranslation(t,e,n),this.applyMatrix4(tn),this}scale(t,e,n){return tn.makeScale(t,e,n),this.applyMatrix4(tn),this}lookAt(t){return Go.lookAt(t),Go.updateMatrix(),this.applyMatrix4(Go.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gi).negate(),this.translate(Gi.x,Gi.y,Gi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Gt(n,3))}else{for(let n=0,s=e.count;n<s;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ln);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Je.setFromBufferAttribute(r),this.morphTargetsRelative?(Ie.addVectors(this.boundingBox.min,Je.min),this.boundingBox.expandByPoint(Ie),Ie.addVectors(this.boundingBox.max,Je.max),this.boundingBox.expandByPoint(Ie)):(this.boundingBox.expandByPoint(Je.min),this.boundingBox.expandByPoint(Je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _i);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){let n=this.boundingSphere.center;if(Je.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Ts.setFromBufferAttribute(a),this.morphTargetsRelative?(Ie.addVectors(Je.min,Ts.min),Je.expandByPoint(Ie),Ie.addVectors(Je.max,Ts.max),Je.expandByPoint(Ie)):(Je.expandByPoint(Ts.min),Je.expandByPoint(Ts.max))}Je.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ie.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ie));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ie.fromBufferAttribute(a,l),c&&(Gi.fromBufferAttribute(t,l),Ie.add(Gi)),s=Math.max(s,n.distanceToSquared(Ie))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pe(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let U=0;U<n.count;U++)a[U]=new L,c[U]=new L;let l=new L,h=new L,f=new L,d=new dt,u=new dt,g=new dt,_=new L,m=new L;function p(U,b,M){l.fromBufferAttribute(n,U),h.fromBufferAttribute(n,b),f.fromBufferAttribute(n,M),d.fromBufferAttribute(r,U),u.fromBufferAttribute(r,b),g.fromBufferAttribute(r,M),h.sub(l),f.sub(l),u.sub(d),g.sub(d);let N=1/(u.x*g.y-g.x*u.y);isFinite(N)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(f,-u.y).multiplyScalar(N),m.copy(f).multiplyScalar(u.x).addScaledVector(h,-g.x).multiplyScalar(N),a[U].add(_),a[b].add(_),a[M].add(_),c[U].add(m),c[b].add(m),c[M].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let U=0,b=w.length;U<b;++U){let M=w[U],N=M.start,Z=M.count;for(let G=N,J=N+Z;G<J;G+=3)p(t.getX(G+0),t.getX(G+1),t.getX(G+2))}let v=new L,x=new L,S=new L,T=new L;function C(U){S.fromBufferAttribute(s,U),T.copy(S);let b=a[U];v.copy(b),v.sub(S.multiplyScalar(S.dot(b))).normalize(),x.crossVectors(T,b);let N=x.dot(c[U])<0?-1:1;o.setXYZW(U,v.x,v.y,v.z,N)}for(let U=0,b=w.length;U<b;++U){let M=w[U],N=M.start,Z=M.count;for(let G=N,J=N+Z;G<J;G+=3)C(t.getX(G+0)),C(t.getX(G+1)),C(t.getX(G+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Pe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,u=n.count;d<u;d++)n.setXYZ(d,0,0,0);let s=new L,r=new L,o=new L,a=new L,c=new L,l=new L,h=new L,f=new L;if(t)for(let d=0,u=t.count;d<u;d+=3){let g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,u=e.count;d<u;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ie.fromBufferAttribute(t,e),Ie.normalize(),t.setXYZ(e,Ie.x,Ie.y,Ie.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,f=a.normalized,d=new l.constructor(c.length*h),u=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?u=c[_]*a.data.stride+a.offset:u=c[_]*h;for(let p=0;p<h;p++)d[g++]=l[u++]}return new Pe(d,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,f=l.length;h<f;h++){let d=l[h],u=t(d,n);c.push(u)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let f=0,d=l.length;f<d;f++){let u=l[f];h.push(u.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],f=r[l];for(let d=0,u=f.length;d<u;d++)h.push(f[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},fl=new Qt,ai=new Ya,_r=new _i,pl=new L,vr=new L,yr=new L,Mr=new L,Wo=new L,Sr=new L,ml=new L,Er=new L,mt=class extends Be{constructor(t=new fe,e=new ve){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Sr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],f=r[c];h!==0&&(Wo.fromBufferAttribute(f,t),o?Sr.addScaledVector(Wo,h):Sr.addScaledVector(Wo.sub(e),h))}e.add(Sr)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),_r.copy(n.boundingSphere),_r.applyMatrix4(r),ai.copy(t.ray).recast(t.near),!(_r.containsPoint(ai.origin)===!1&&(ai.intersectSphere(_r,pl)===null||ai.origin.distanceToSquared(pl)>(t.far-t.near)**2))&&(fl.copy(r).invert(),ai.copy(t.ray).applyMatrix4(fl),!(n.boundingBox!==null&&ai.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ai)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,d=r.groups,u=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){let m=d[g],p=o[m.materialIndex],w=Math.max(m.start,u.start),v=Math.min(a.count,Math.min(m.start+m.count,u.start+u.count));for(let x=w,S=v;x<S;x+=3){let T=a.getX(x),C=a.getX(x+1),U=a.getX(x+2);s=br(this,p,t,n,l,h,f,T,C,U),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,u.start),_=Math.min(a.count,u.start+u.count);for(let m=g,p=_;m<p;m+=3){let w=a.getX(m),v=a.getX(m+1),x=a.getX(m+2);s=br(this,o,t,n,l,h,f,w,v,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){let m=d[g],p=o[m.materialIndex],w=Math.max(m.start,u.start),v=Math.min(c.count,Math.min(m.start+m.count,u.start+u.count));for(let x=w,S=v;x<S;x+=3){let T=x,C=x+1,U=x+2;s=br(this,p,t,n,l,h,f,T,C,U),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,u.start),_=Math.min(c.count,u.start+u.count);for(let m=g,p=_;m<p;m+=3){let w=m,v=m+1,x=m+2;s=br(this,o,t,n,l,h,f,w,v,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function dd(i,t,e,n,s,r,o,a){let c;if(t.side===Oe?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Jn,a),c===null)return null;Er.copy(a),Er.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Er);return l<e.near||l>e.far?null:{distance:l,point:Er.clone(),object:i}}function br(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,vr),i.getVertexPosition(c,yr),i.getVertexPosition(l,Mr);let h=dd(i,t,e,n,vr,yr,Mr,ml);if(h){let f=new L;Xn.getBarycoord(ml,vr,yr,Mr,f),s&&(h.uv=Xn.getInterpolatedAttribute(s,a,c,l,f,new dt)),r&&(h.uv1=Xn.getInterpolatedAttribute(r,a,c,l,f,new dt)),o&&(h.normal=Xn.getInterpolatedAttribute(o,a,c,l,f,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new L,materialIndex:0};Xn.getNormal(vr,yr,Mr,d.normal),h.face=d,h.barycoord=f}return h}var ye=class i extends fe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],f=[],d=0,u=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Gt(l,3)),this.setAttribute("normal",new Gt(h,3)),this.setAttribute("uv",new Gt(f,2));function g(_,m,p,w,v,x,S,T,C,U,b){let M=x/C,N=S/U,Z=x/2,G=S/2,J=T/2,I=C+1,R=U+1,F=0,D=0,k=new L;for(let Y=0;Y<R;Y++){let q=Y*N-G;for(let rt=0;rt<I;rt++){let ft=rt*M-Z;k[_]=ft*w,k[m]=q*v,k[p]=J,l.push(k.x,k.y,k.z),k[_]=0,k[m]=0,k[p]=T>0?1:-1,h.push(k.x,k.y,k.z),f.push(rt/C),f.push(1-Y/U),F+=1}}for(let Y=0;Y<U;Y++)for(let q=0;q<C;q++){let rt=d+q+I*Y,ft=d+q+I*(Y+1),z=d+(q+1)+I*(Y+1),$=d+(q+1)+I*Y;c.push(rt,ft,$),c.push(ft,z,$),D+=6}a.addGroup(u,D,b),u+=D,d+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function ls(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function We(i){let t={};for(let e=0;e<i.length;e++){let n=ls(i[e]);for(let s in n)t[s]=n[s]}return t}function fd(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function gh(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ie.workingColorSpace}var pd={clone:ls,merge:We},md=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ke=class extends Kn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=md,this.fragmentShader=gd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ls(t.uniforms),this.uniformsGroups=fd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Jr=class extends Be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qt,this.projectionMatrix=new Qt,this.projectionMatrixInverse=new Qt,this.coordinateSystem=Cn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Gn=new L,gl=new dt,xl=new dt,Fe=class extends Jr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ks*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Ns*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ks*2*Math.atan(Math.tan(Ns*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Gn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Gn.x,Gn.y).multiplyScalar(-t/Gn.z),Gn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Gn.x,Gn.y).multiplyScalar(-t/Gn.z)}getViewSize(t,e){return this.getViewBounds(t,gl,xl),e.subVectors(xl,gl)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ns*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Wi=-90,Xi=1,Gs=class extends Be{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Fe(Wi,Xi,t,e);s.layers=this.layers,this.add(s);let r=new Fe(Wi,Xi,t,e);r.layers=this.layers,this.add(r);let o=new Fe(Wi,Xi,t,e);o.layers=this.layers,this.add(o);let a=new Fe(Wi,Xi,t,e);a.layers=this.layers,this.add(a);let c=new Fe(Wi,Xi,t,e);c.layers=this.layers,this.add(c);let l=new Fe(Wi,Xi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===Cn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Gr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,f=t.getRenderTarget(),d=t.getActiveCubeFace(),u=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(f,d,u),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},$r=class extends Xe{constructor(t,e,n,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:rs,super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Ws=class extends en{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new $r(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:xn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ye(5,5,5),r=new Ke({name:"CubemapFromEquirect",uniforms:ls(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Oe,blending:qn});r.uniforms.tEquirect.value=e;let o=new mt(s,r),a=e.minFilter;return e.minFilter===mi&&(e.minFilter=xn),new Gs(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Xo=new L,xd=new L,_d=new Zt,Rn=class{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Xo.subVectors(n,e).cross(xd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Xo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||_d.getNormalMatrix(t),s=this.coplanarPoint(Xo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},ci=new _i,wr=new L,Xs=class{constructor(t=new Rn,e=new Rn,n=new Rn,s=new Rn,r=new Rn,o=new Rn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Cn){let n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],f=s[6],d=s[7],u=s[8],g=s[9],_=s[10],m=s[11],p=s[12],w=s[13],v=s[14],x=s[15];if(n[0].setComponents(c-r,d-l,m-u,x-p).normalize(),n[1].setComponents(c+r,d+l,m+u,x+p).normalize(),n[2].setComponents(c+o,d+h,m+g,x+w).normalize(),n[3].setComponents(c-o,d-h,m-g,x-w).normalize(),n[4].setComponents(c-a,d-f,m-_,x-v).normalize(),e===Cn)n[5].setComponents(c+a,d+f,m+_,x+v).normalize();else if(e===Gr)n[5].setComponents(a,f,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ci.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ci.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ci)}intersectsSprite(t){return ci.center.set(0,0,0),ci.radius=.7071067811865476,ci.applyMatrix4(t.matrixWorld),this.intersectsSphere(ci)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(wr.x=s.normal.x>0?t.max.x:t.min.x,wr.y=s.normal.y>0?t.max.y:t.min.y,wr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(wr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function xh(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function vd(i){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,f=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let u;if(l instanceof Float32Array)u=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?u=i.HALF_FLOAT:u=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)u=i.SHORT;else if(l instanceof Uint32Array)u=i.UNSIGNED_INT;else if(l instanceof Int32Array)u=i.INT;else if(l instanceof Int8Array)u=i.BYTE;else if(l instanceof Uint8Array)u=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)u=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:u,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,c,l){let h=c.array,f=c.updateRanges;if(i.bindBuffer(l,a),f.length===0)i.bufferSubData(l,0,h);else{f.sort((u,g)=>u.start-g.start);let d=0;for(let u=1;u<f.length;u++){let g=f[d],_=f[u];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,f[d]=_)}f.length=d+1;for(let u=0,g=f.length;u<g;u++){let _=f[u];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var xe=class i extends fe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,f=t/a,d=e/c,u=[],g=[],_=[],m=[];for(let p=0;p<h;p++){let w=p*d-o;for(let v=0;v<l;v++){let x=v*f-r;g.push(x,-w,0),_.push(0,0,1),m.push(v/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let w=0;w<a;w++){let v=w+l*p,x=w+l*(p+1),S=w+1+l*(p+1),T=w+1+l*p;u.push(v,x,T),u.push(x,S,T)}this.setIndex(u),this.setAttribute("position",new Gt(g,3)),this.setAttribute("normal",new Gt(_,3)),this.setAttribute("uv",new Gt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},yd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Md=`#ifdef USE_ALPHAHASH
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
#endif`,Sd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ed=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Td=`#ifdef USE_AOMAP
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
#endif`,Ad=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Rd=`#ifdef USE_BATCHING
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
#endif`,Cd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Id=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Pd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ld=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Dd=`#ifdef USE_IRIDESCENCE
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
#endif`,Ud=`#ifdef USE_BUMPMAP
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
#endif`,Nd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Fd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Od=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Bd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Hd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,kd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Vd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Gd=`#define PI 3.141592653589793
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
} // validated`,Wd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Xd=`vec3 transformedNormal = objectNormal;
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
#endif`,qd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Jd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$d="gl_FragColor = linearToOutputTexel( gl_FragColor );",Kd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qd=`#ifdef USE_ENVMAP
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
#endif`,jd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,tf=`#ifdef USE_ENVMAP
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
#endif`,ef=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nf=`#ifdef USE_ENVMAP
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
#endif`,sf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,of=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,af=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cf=`#ifdef USE_GRADIENTMAP
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
}`,lf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,uf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,df=`uniform bool receiveShadow;
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
#endif`,ff=`#ifdef USE_ENVMAP
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
#endif`,pf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_f=`PhysicalMaterial material;
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
#endif`,vf=`struct PhysicalMaterial {
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
}`,yf=`
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
#endif`,Mf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Sf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ef=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,bf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Af=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,If=`#if defined( USE_POINTS_UV )
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
#endif`,Pf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Df=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Uf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Nf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ff=`#ifdef USE_MORPHTARGETS
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
#endif`,Of=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,zf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Hf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gf=`#ifdef USE_NORMALMAP
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
#endif`,Wf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,$f=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Kf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ep=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,np=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ip=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,rp=`float getShadowMask() {
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
}`,op=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ap=`#ifdef USE_SKINNING
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
#endif`,cp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,lp=`#ifdef USE_SKINNING
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
#endif`,hp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,up=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,pp=`#ifdef USE_TRANSMISSION
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
#endif`,mp=`#ifdef USE_TRANSMISSION
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
#endif`,gp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_p=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,yp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Mp=`uniform sampler2D t2D;
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
}`,Sp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ep=`#ifdef ENVMAP_TYPE_CUBE
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
}`,bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tp=`#include <common>
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
}`,Ap=`#if DEPTH_PACKING == 3200
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
}`,Rp=`#define DISTANCE
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
}`,Cp=`#define DISTANCE
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
}`,Ip=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Pp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lp=`uniform float scale;
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
}`,Dp=`uniform vec3 diffuse;
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
}`,Up=`#include <common>
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
}`,Np=`uniform vec3 diffuse;
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
}`,Fp=`#define LAMBERT
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
}`,Op=`#define LAMBERT
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
}`,Bp=`#define MATCAP
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
}`,zp=`#define MATCAP
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
}`,Hp=`#define NORMAL
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
}`,kp=`#define NORMAL
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
}`,Vp=`#define PHONG
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
}`,Gp=`#define PHONG
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
}`,Wp=`#define STANDARD
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
}`,Xp=`#define STANDARD
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
}`,qp=`#define TOON
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
}`,Yp=`#define TOON
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
}`,Zp=`uniform float size;
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
}`,Jp=`uniform vec3 diffuse;
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
}`,$p=`#include <common>
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
}`,Kp=`uniform vec3 color;
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
}`,Qp=`uniform float rotation;
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
}`,jp=`uniform vec3 diffuse;
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
}`,Jt={alphahash_fragment:yd,alphahash_pars_fragment:Md,alphamap_fragment:Sd,alphamap_pars_fragment:Ed,alphatest_fragment:bd,alphatest_pars_fragment:wd,aomap_fragment:Td,aomap_pars_fragment:Ad,batching_pars_vertex:Rd,batching_vertex:Cd,begin_vertex:Id,beginnormal_vertex:Pd,bsdfs:Ld,iridescence_fragment:Dd,bumpmap_pars_fragment:Ud,clipping_planes_fragment:Nd,clipping_planes_pars_fragment:Fd,clipping_planes_pars_vertex:Od,clipping_planes_vertex:Bd,color_fragment:zd,color_pars_fragment:Hd,color_pars_vertex:kd,color_vertex:Vd,common:Gd,cube_uv_reflection_fragment:Wd,defaultnormal_vertex:Xd,displacementmap_pars_vertex:qd,displacementmap_vertex:Yd,emissivemap_fragment:Zd,emissivemap_pars_fragment:Jd,colorspace_fragment:$d,colorspace_pars_fragment:Kd,envmap_fragment:Qd,envmap_common_pars_fragment:jd,envmap_pars_fragment:tf,envmap_pars_vertex:ef,envmap_physical_pars_fragment:ff,envmap_vertex:nf,fog_vertex:sf,fog_pars_vertex:rf,fog_fragment:of,fog_pars_fragment:af,gradientmap_pars_fragment:cf,lightmap_pars_fragment:lf,lights_lambert_fragment:hf,lights_lambert_pars_fragment:uf,lights_pars_begin:df,lights_toon_fragment:pf,lights_toon_pars_fragment:mf,lights_phong_fragment:gf,lights_phong_pars_fragment:xf,lights_physical_fragment:_f,lights_physical_pars_fragment:vf,lights_fragment_begin:yf,lights_fragment_maps:Mf,lights_fragment_end:Sf,logdepthbuf_fragment:Ef,logdepthbuf_pars_fragment:bf,logdepthbuf_pars_vertex:wf,logdepthbuf_vertex:Tf,map_fragment:Af,map_pars_fragment:Rf,map_particle_fragment:Cf,map_particle_pars_fragment:If,metalnessmap_fragment:Pf,metalnessmap_pars_fragment:Lf,morphinstance_vertex:Df,morphcolor_vertex:Uf,morphnormal_vertex:Nf,morphtarget_pars_vertex:Ff,morphtarget_vertex:Of,normal_fragment_begin:Bf,normal_fragment_maps:zf,normal_pars_fragment:Hf,normal_pars_vertex:kf,normal_vertex:Vf,normalmap_pars_fragment:Gf,clearcoat_normal_fragment_begin:Wf,clearcoat_normal_fragment_maps:Xf,clearcoat_pars_fragment:qf,iridescence_pars_fragment:Yf,opaque_fragment:Zf,packing:Jf,premultiplied_alpha_fragment:$f,project_vertex:Kf,dithering_fragment:Qf,dithering_pars_fragment:jf,roughnessmap_fragment:tp,roughnessmap_pars_fragment:ep,shadowmap_pars_fragment:np,shadowmap_pars_vertex:ip,shadowmap_vertex:sp,shadowmask_pars_fragment:rp,skinbase_vertex:op,skinning_pars_vertex:ap,skinning_vertex:cp,skinnormal_vertex:lp,specularmap_fragment:hp,specularmap_pars_fragment:up,tonemapping_fragment:dp,tonemapping_pars_fragment:fp,transmission_fragment:pp,transmission_pars_fragment:mp,uv_pars_fragment:gp,uv_pars_vertex:xp,uv_vertex:_p,worldpos_vertex:vp,background_vert:yp,background_frag:Mp,backgroundCube_vert:Sp,backgroundCube_frag:Ep,cube_vert:bp,cube_frag:wp,depth_vert:Tp,depth_frag:Ap,distanceRGBA_vert:Rp,distanceRGBA_frag:Cp,equirect_vert:Ip,equirect_frag:Pp,linedashed_vert:Lp,linedashed_frag:Dp,meshbasic_vert:Up,meshbasic_frag:Np,meshlambert_vert:Fp,meshlambert_frag:Op,meshmatcap_vert:Bp,meshmatcap_frag:zp,meshnormal_vert:Hp,meshnormal_frag:kp,meshphong_vert:Vp,meshphong_frag:Gp,meshphysical_vert:Wp,meshphysical_frag:Xp,meshtoon_vert:qp,meshtoon_frag:Yp,points_vert:Zp,points_frag:Jp,shadow_vert:$p,shadow_frag:Kp,sprite_vert:Qp,sprite_frag:jp},Tt={common:{diffuse:{value:new kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},envMapRotation:{value:new Zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new kt(16777215)},opacity:{value:1},center:{value:new dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},gn={basic:{uniforms:We([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:We([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new kt(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:We([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new kt(0)},specular:{value:new kt(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:We([Tt.common,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.roughnessmap,Tt.metalnessmap,Tt.fog,Tt.lights,{emissive:{value:new kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:We([Tt.common,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.gradientmap,Tt.fog,Tt.lights,{emissive:{value:new kt(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:We([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:We([Tt.points,Tt.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:We([Tt.common,Tt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:We([Tt.common,Tt.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:We([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:We([Tt.sprite,Tt.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Zt}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:We([Tt.common,Tt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:We([Tt.lights,Tt.fog,{color:{value:new kt(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};gn.physical={uniforms:We([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new kt(0)},specularColor:{value:new kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};var Tr={r:0,b:0,g:0},li=new Ye,tm=new Qt;function em(i,t,e,n,s,r,o){let a=new kt(0),c=r===!0?0:1,l,h,f=null,d=0,u=null;function g(w){let v=w.isScene===!0?w.background:null;return v&&v.isTexture&&(v=(w.backgroundBlurriness>0?e:t).get(v)),v}function _(w){let v=!1,x=g(w);x===null?p(a,c):x&&x.isColor&&(p(x,1),v=!0);let S=i.xr.getEnvironmentBlendMode();S==="additive"?n.buffers.color.setClear(0,0,0,1,o):S==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(w,v){let x=g(v);x&&(x.isCubeTexture||x.mapping===go)?(h===void 0&&(h=new mt(new ye(1,1,1),new Ke({name:"BackgroundCubeMaterial",uniforms:ls(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:Oe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(S,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),li.copy(v.backgroundRotation),li.x*=-1,li.y*=-1,li.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(li.y*=-1,li.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(tm.makeRotationFromEuler(li)),h.material.toneMapped=ie.getTransfer(x.colorSpace)!==le,(f!==x||d!==x.version||u!==i.toneMapping)&&(h.material.needsUpdate=!0,f=x,d=x.version,u=i.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new mt(new xe(2,2),new Ke({name:"BackgroundMaterial",uniforms:ls(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=ie.getTransfer(x.colorSpace)!==le,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(f!==x||d!==x.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,f=x,d=x.version,u=i.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function p(w,v){w.getRGB(Tr,gh(i)),n.buffers.color.setClear(Tr.r,Tr.g,Tr.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(w,v=1){a.set(w),c=v,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(w){c=w,p(a,c)},render:_,addToRenderList:m}}function nm(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(M,N,Z,G,J){let I=!1,R=f(G,Z,N);r!==R&&(r=R,l(r.object)),I=u(M,G,Z,J),I&&g(M,G,Z,J),J!==null&&t.update(J,i.ELEMENT_ARRAY_BUFFER),(I||o)&&(o=!1,x(M,N,Z,G),J!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(J).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function f(M,N,Z){let G=Z.wireframe===!0,J=n[M.id];J===void 0&&(J={},n[M.id]=J);let I=J[N.id];I===void 0&&(I={},J[N.id]=I);let R=I[G];return R===void 0&&(R=d(c()),I[G]=R),R}function d(M){let N=[],Z=[],G=[];for(let J=0;J<e;J++)N[J]=0,Z[J]=0,G[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:Z,attributeDivisors:G,object:M,attributes:{},index:null}}function u(M,N,Z,G){let J=r.attributes,I=N.attributes,R=0,F=Z.getAttributes();for(let D in F)if(F[D].location>=0){let Y=J[D],q=I[D];if(q===void 0&&(D==="instanceMatrix"&&M.instanceMatrix&&(q=M.instanceMatrix),D==="instanceColor"&&M.instanceColor&&(q=M.instanceColor)),Y===void 0||Y.attribute!==q||q&&Y.data!==q.data)return!0;R++}return r.attributesNum!==R||r.index!==G}function g(M,N,Z,G){let J={},I=N.attributes,R=0,F=Z.getAttributes();for(let D in F)if(F[D].location>=0){let Y=I[D];Y===void 0&&(D==="instanceMatrix"&&M.instanceMatrix&&(Y=M.instanceMatrix),D==="instanceColor"&&M.instanceColor&&(Y=M.instanceColor));let q={};q.attribute=Y,Y&&Y.data&&(q.data=Y.data),J[D]=q,R++}r.attributes=J,r.attributesNum=R,r.index=G}function _(){let M=r.newAttributes;for(let N=0,Z=M.length;N<Z;N++)M[N]=0}function m(M){p(M,0)}function p(M,N){let Z=r.newAttributes,G=r.enabledAttributes,J=r.attributeDivisors;Z[M]=1,G[M]===0&&(i.enableVertexAttribArray(M),G[M]=1),J[M]!==N&&(i.vertexAttribDivisor(M,N),J[M]=N)}function w(){let M=r.newAttributes,N=r.enabledAttributes;for(let Z=0,G=N.length;Z<G;Z++)N[Z]!==M[Z]&&(i.disableVertexAttribArray(Z),N[Z]=0)}function v(M,N,Z,G,J,I,R){R===!0?i.vertexAttribIPointer(M,N,Z,J,I):i.vertexAttribPointer(M,N,Z,G,J,I)}function x(M,N,Z,G){_();let J=G.attributes,I=Z.getAttributes(),R=N.defaultAttributeValues;for(let F in I){let D=I[F];if(D.location>=0){let k=J[F];if(k===void 0&&(F==="instanceMatrix"&&M.instanceMatrix&&(k=M.instanceMatrix),F==="instanceColor"&&M.instanceColor&&(k=M.instanceColor)),k!==void 0){let Y=k.normalized,q=k.itemSize,rt=t.get(k);if(rt===void 0)continue;let ft=rt.buffer,z=rt.type,$=rt.bytesPerElement,it=z===i.INT||z===i.UNSIGNED_INT||k.gpuType===Rc;if(k.isInterleavedBufferAttribute){let j=k.data,yt=j.stride,Ht=k.offset;if(j.isInstancedInterleavedBuffer){for(let Dt=0;Dt<D.locationSize;Dt++)p(D.location+Dt,j.meshPerAttribute);M.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let Dt=0;Dt<D.locationSize;Dt++)m(D.location+Dt);i.bindBuffer(i.ARRAY_BUFFER,ft);for(let Dt=0;Dt<D.locationSize;Dt++)v(D.location+Dt,q/D.locationSize,z,Y,yt*$,(Ht+q/D.locationSize*Dt)*$,it)}else{if(k.isInstancedBufferAttribute){for(let j=0;j<D.locationSize;j++)p(D.location+j,k.meshPerAttribute);M.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let j=0;j<D.locationSize;j++)m(D.location+j);i.bindBuffer(i.ARRAY_BUFFER,ft);for(let j=0;j<D.locationSize;j++)v(D.location+j,q/D.locationSize,z,Y,q*$,q/D.locationSize*j*$,it)}}else if(R!==void 0){let Y=R[F];if(Y!==void 0)switch(Y.length){case 2:i.vertexAttrib2fv(D.location,Y);break;case 3:i.vertexAttrib3fv(D.location,Y);break;case 4:i.vertexAttrib4fv(D.location,Y);break;default:i.vertexAttrib1fv(D.location,Y)}}}}w()}function S(){U();for(let M in n){let N=n[M];for(let Z in N){let G=N[Z];for(let J in G)h(G[J].object),delete G[J];delete N[Z]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;let N=n[M.id];for(let Z in N){let G=N[Z];for(let J in G)h(G[J].object),delete G[J];delete N[Z]}delete n[M.id]}function C(M){for(let N in n){let Z=n[N];if(Z[M.id]===void 0)continue;let G=Z[M.id];for(let J in G)h(G[J].object),delete G[J];delete Z[M.id]}}function U(){b(),o=!0,r!==s&&(r=s,l(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:U,resetDefaultState:b,dispose:S,releaseStatesOfGeometry:T,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:w}}function im(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,f){f!==0&&(i.drawArraysInstanced(n,l,h,f),e.update(h,n,f))}function a(l,h,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,f);let u=0;for(let g=0;g<f;g++)u+=h[g];e.update(u,n,1)}function c(l,h,f,d){if(f===0)return;let u=t.get("WEBGL_multi_draw");if(u===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{u.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,f);let g=0;for(let _=0;_<f;_++)g+=h[_]*d[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function sm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==un&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let U=C===ti&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Pn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==_n&&!U)}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let f=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reverseDepthBuffer:d,maxTextures:u,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:w,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:S,maxSamples:T}}function rm(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Rn,a=new Zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){let u=f.length!==0||d||n!==0||s;return s=d,n=f.length,u},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){e=h(f,d,0)},this.setState=function(f,d,u){let g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=i.get(f);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let w=r?0:n,v=w*4,x=p.clippingState||null;c.value=x,x=h(g,d,v,u);for(let S=0;S!==v;++S)x[S]=e[S];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,d,u,g){let _=f!==null?f.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let p=u+_*4,w=d.matrixWorldInverse;a.getNormalMatrix(w),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,x=u;v!==_;++v,x+=4)o.copy(f[v]).applyMatrix4(w,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function om(i){let t=new WeakMap;function e(o,a){return a===fa?o.mapping=rs:a===pa&&(o.mapping=os),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===fa||a===pa)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Ws(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var hs=class extends Jr{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Qi=4,_l=[.125,.215,.35,.446,.526,.582],fi=20,qo=new hs,vl=new kt,Yo=null,Zo=0,Jo=0,$o=!1,ui=(1+Math.sqrt(5))/2,qi=1/ui,yl=[new L(-ui,qi,0),new L(ui,qi,0),new L(-qi,0,ui),new L(qi,0,ui),new L(0,ui,-qi),new L(0,ui,qi),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],us=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Yo=this._renderer.getRenderTarget(),Zo=this._renderer.getActiveCubeFace(),Jo=this._renderer.getActiveMipmapLevel(),$o=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=El(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Yo,Zo,Jo),this._renderer.xr.enabled=$o,t.scissorTest=!1,Ar(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===rs||t.mapping===os?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Yo=this._renderer.getRenderTarget(),Zo=this._renderer.getActiveCubeFace(),Jo=this._renderer.getActiveMipmapLevel(),$o=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:xn,minFilter:xn,generateMipmaps:!1,type:ti,format:un,colorSpace:ys,depthBuffer:!1},s=Ml(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ml(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=am(r)),this._blurMaterial=cm(r,t,e)}return s}_compileMaterial(t){let e=new mt(this._lodPlanes[0],t);this._renderer.compile(e,qo)}_sceneToCubeUV(t,e,n,s){let a=new Fe(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(vl),h.toneMapping=Yn,h.autoClear=!1;let u=new ve({name:"PMREM.Background",side:Oe,depthWrite:!1,depthTest:!1}),g=new mt(new ye,u),_=!1,m=t.background;m?m.isColor&&(u.color.copy(m),t.background=null,_=!0):(u.color.copy(vl),_=!0);for(let p=0;p<6;p++){let w=p%3;w===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):w===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let v=this._cubeSize;Ar(s,w*v,p>2?v:0,v,v),h.setRenderTarget(s),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=f,t.background=m}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===rs||t.mapping===os;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=El()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sl());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new mt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;Ar(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,qo)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=yl[(s-r-1)%yl.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,f=new mt(this._lodPlanes[s],l),d=l.uniforms,u=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*u):2*Math.PI/(2*fi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):fi;m>fi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${fi}`);let p=[],w=0;for(let C=0;C<fi;++C){let U=C/_,b=Math.exp(-U*U/2);p.push(b),C===0?w+=b:C<m&&(w+=2*b)}for(let C=0;C<p.length;C++)p[C]=p[C]/w;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-n;let x=this._sizeLods[s],S=3*x*(s>v-Qi?s-v+Qi:0),T=4*(this._cubeSize-x);Ar(e,S,T,3*x,2*x),c.setRenderTarget(e),c.render(f,qo)}};function am(i){let t=[],e=[],n=[],s=i,r=i-Qi+1+_l.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-Qi?c=_l[o-i+Qi-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,f=1+l,d=[h,h,f,h,f,f,h,h,f,f,h,f],u=6,g=6,_=3,m=2,p=1,w=new Float32Array(_*g*u),v=new Float32Array(m*g*u),x=new Float32Array(p*g*u);for(let T=0;T<u;T++){let C=T%3*2/3-1,U=T>2?0:-1,b=[C,U,0,C+2/3,U,0,C+2/3,U+1,0,C,U,0,C+2/3,U+1,0,C,U+1,0];w.set(b,_*g*T),v.set(d,m*g*T);let M=[T,T,T,T,T,T];x.set(M,p*g*T)}let S=new fe;S.setAttribute("position",new Pe(w,_)),S.setAttribute("uv",new Pe(v,m)),S.setAttribute("faceIndex",new Pe(x,p)),t.push(S),s>Qi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ml(i,t,e){let n=new en(i,t,e);return n.texture.mapping=go,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ar(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function cm(i,t,e){let n=new Float32Array(fi),s=new L(0,1,0);return new Ke({name:"SphericalGaussianBlur",defines:{n:fi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Fc(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Sl(){return new Ke({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fc(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function El(){return new Ke({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Fc(){return`

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
	`}function lm(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===fa||c===pa,h=c===rs||c===os;if(l||h){let f=t.get(a),d=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new us(i)),f=l?e.fromEquirectangular(a,f):e.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{let u=a.image;return l&&u&&u.height>0||h&&u&&s(u)?(e===null&&(e=new us(i)),f=l?e.fromEquirectangular(a):e.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",r),f.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function hm(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Ds("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function um(i,t,e,n){let s={},r=new WeakMap;function o(f){let d=f.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);for(let g in d.morphAttributes){let _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}d.removeEventListener("dispose",o),delete s[d.id];let u=r.get(d);u&&(t.remove(u),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(f,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function c(f){let d=f.attributes;for(let g in d)t.update(d[g],i.ARRAY_BUFFER);let u=f.morphAttributes;for(let g in u){let _=u[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],i.ARRAY_BUFFER)}}function l(f){let d=[],u=f.index,g=f.attributes.position,_=0;if(u!==null){let w=u.array;_=u.version;for(let v=0,x=w.length;v<x;v+=3){let S=w[v+0],T=w[v+1],C=w[v+2];d.push(S,T,T,C,C,S)}}else if(g!==void 0){let w=g.array;_=g.version;for(let v=0,x=w.length/3-1;v<x;v+=3){let S=v+0,T=v+1,C=v+2;d.push(S,T,T,C,C,S)}}else return;let m=new(ph(d)?Zr:Yr)(d,1);m.version=_;let p=r.get(f);p&&t.remove(p),r.set(f,m)}function h(f){let d=r.get(f);if(d){let u=f.index;u!==null&&d.version<u.version&&l(f)}else l(f);return r.get(f)}return{get:a,update:c,getWireframeAttribute:h}}function dm(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,u){i.drawElements(n,u,r,d*o),e.update(u,n,1)}function l(d,u,g){g!==0&&(i.drawElementsInstanced(n,u,r,d*o,g),e.update(u,n,g))}function h(d,u,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=u[p];e.update(m,n,1)}function f(d,u,g,_){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/o,u[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,u,0,r,d,0,_,0,g);let p=0;for(let w=0;w<g;w++)p+=u[w]*_[w];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function fm(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function pm(i,t,e){let n=new WeakMap,s=new he;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==f){let b=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();let u=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],v=0;u===!0&&(v=1),g===!0&&(v=2),_===!0&&(v=3);let x=a.attributes.position.count*v,S=1;x>t.maxTextureSize&&(S=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);let T=new Float32Array(x*S*4*f),C=new Xr(T,x,S,f);C.type=_n,C.needsUpdate=!0;let U=v*4;for(let M=0;M<f;M++){let N=m[M],Z=p[M],G=w[M],J=x*S*4*M;for(let I=0;I<N.count;I++){let R=I*U;u===!0&&(s.fromBufferAttribute(N,I),T[J+R+0]=s.x,T[J+R+1]=s.y,T[J+R+2]=s.z,T[J+R+3]=0),g===!0&&(s.fromBufferAttribute(Z,I),T[J+R+4]=s.x,T[J+R+5]=s.y,T[J+R+6]=s.z,T[J+R+7]=0),_===!0&&(s.fromBufferAttribute(G,I),T[J+R+8]=s.x,T[J+R+9]=s.y,T[J+R+10]=s.z,T[J+R+11]=G.itemSize===4?s.w:1)}}d={count:f,texture:C,size:new dt(x,S)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let u=0;for(let _=0;_<l.length;_++)u+=l[_];let g=a.morphTargetsRelative?1:1-u;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function mm(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,f=t.get(c,h);if(s.get(f)!==l&&(t.update(f),s.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return f}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var ds=class extends Xe{constructor(t,e,n,s,r,o,a,c,l,h=es){if(h!==es&&h!==cs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===es&&(n=xi),n===void 0&&h===cs&&(n=as),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:$e,this.minFilter=c!==void 0?c:$e,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},_h=new Xe,bl=new ds(1,1),vh=new Xr,yh=new qa,Mh=new $r,wl=[],Tl=[],Al=new Float32Array(16),Rl=new Float32Array(9),Cl=new Float32Array(4);function Ms(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=wl[s];if(r===void 0&&(r=new Float32Array(s),wl[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ae(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Re(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function _o(i,t){let e=Tl[t];e===void 0&&(e=new Int32Array(t),Tl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function gm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function xm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2fv(this.addr,t),Re(e,t)}}function _m(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;i.uniform3fv(this.addr,t),Re(e,t)}}function vm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4fv(this.addr,t),Re(e,t)}}function ym(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;Cl.set(n),i.uniformMatrix2fv(this.addr,!1,Cl),Re(e,n)}}function Mm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;Rl.set(n),i.uniformMatrix3fv(this.addr,!1,Rl),Re(e,n)}}function Sm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;Al.set(n),i.uniformMatrix4fv(this.addr,!1,Al),Re(e,n)}}function Em(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function bm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2iv(this.addr,t),Re(e,t)}}function wm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3iv(this.addr,t),Re(e,t)}}function Tm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4iv(this.addr,t),Re(e,t)}}function Am(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Rm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2uiv(this.addr,t),Re(e,t)}}function Cm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3uiv(this.addr,t),Re(e,t)}}function Im(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4uiv(this.addr,t),Re(e,t)}}function Pm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(bl.compareFunction=fh,r=bl):r=_h,e.setTexture2D(t||r,s)}function Lm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||yh,s)}function Dm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Mh,s)}function Um(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||vh,s)}function Nm(i){switch(i){case 5126:return gm;case 35664:return xm;case 35665:return _m;case 35666:return vm;case 35674:return ym;case 35675:return Mm;case 35676:return Sm;case 5124:case 35670:return Em;case 35667:case 35671:return bm;case 35668:case 35672:return wm;case 35669:case 35673:return Tm;case 5125:return Am;case 36294:return Rm;case 36295:return Cm;case 36296:return Im;case 35678:case 36198:case 36298:case 36306:case 35682:return Pm;case 35679:case 36299:case 36307:return Lm;case 35680:case 36300:case 36308:case 36293:return Dm;case 36289:case 36303:case 36311:case 36292:return Um}}function Fm(i,t){i.uniform1fv(this.addr,t)}function Om(i,t){let e=Ms(t,this.size,2);i.uniform2fv(this.addr,e)}function Bm(i,t){let e=Ms(t,this.size,3);i.uniform3fv(this.addr,e)}function zm(i,t){let e=Ms(t,this.size,4);i.uniform4fv(this.addr,e)}function Hm(i,t){let e=Ms(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function km(i,t){let e=Ms(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Vm(i,t){let e=Ms(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Gm(i,t){i.uniform1iv(this.addr,t)}function Wm(i,t){i.uniform2iv(this.addr,t)}function Xm(i,t){i.uniform3iv(this.addr,t)}function qm(i,t){i.uniform4iv(this.addr,t)}function Ym(i,t){i.uniform1uiv(this.addr,t)}function Zm(i,t){i.uniform2uiv(this.addr,t)}function Jm(i,t){i.uniform3uiv(this.addr,t)}function $m(i,t){i.uniform4uiv(this.addr,t)}function Km(i,t,e){let n=this.cache,s=t.length,r=_o(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||_h,r[o])}function Qm(i,t,e){let n=this.cache,s=t.length,r=_o(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||yh,r[o])}function jm(i,t,e){let n=this.cache,s=t.length,r=_o(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Mh,r[o])}function tg(i,t,e){let n=this.cache,s=t.length,r=_o(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||vh,r[o])}function eg(i){switch(i){case 5126:return Fm;case 35664:return Om;case 35665:return Bm;case 35666:return zm;case 35674:return Hm;case 35675:return km;case 35676:return Vm;case 5124:case 35670:return Gm;case 35667:case 35671:return Wm;case 35668:case 35672:return Xm;case 35669:case 35673:return qm;case 5125:return Ym;case 36294:return Zm;case 36295:return Jm;case 36296:return $m;case 35678:case 36198:case 36298:case 36306:case 35682:return Km;case 35679:case 36299:case 36307:return Qm;case 35680:case 36300:case 36308:case 36293:return jm;case 36289:case 36303:case 36311:case 36292:return tg}}var Za=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Nm(e.type)}},Ja=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=eg(e.type)}},$a=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Ko=/(\w+)(\])?(\[|\.)?/g;function Il(i,t){i.seq.push(t),i.map[t.id]=t}function ng(i,t,e){let n=i.name,s=n.length;for(Ko.lastIndex=0;;){let r=Ko.exec(n),o=Ko.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Il(e,l===void 0?new Za(a,i,t):new Ja(a,i,t));break}else{let f=e.map[a];f===void 0&&(f=new $a(a),Il(e,f)),e=f}}}var is=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);ng(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function Pl(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var ig=37297,sg=0;function rg(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Ll=new Zt;function og(i){ie._getMatrix(Ll,ie.workingColorSpace,i);let t=`mat3( ${Ll.elements.map(e=>e.toFixed(4))} )`;switch(ie.getTransfer(i)){case xo:return[t,"LinearTransferOETF"];case le:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Dl(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+rg(i.getShaderSource(t),o)}else return s}function ag(i,t){let e=og(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function cg(i,t){let e;switch(t){case _u:e="Linear";break;case vu:e="Reinhard";break;case yu:e="Cineon";break;case Mu:e="ACESFilmic";break;case Ac:e="AgX";break;case Eu:e="Neutral";break;case Su:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Rr=new L;function lg(){ie.getLuminanceCoefficients(Rr);let i=Rr.x.toFixed(4),t=Rr.y.toFixed(4),e=Rr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function hg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Us).join(`
`)}function ug(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function dg(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Us(i){return i!==""}function Ul(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Nl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var fg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ka(i){return i.replace(fg,mg)}var pg=new Map;function mg(i,t){let e=Jt[t];if(e===void 0){let n=pg.get(t);if(n!==void 0)e=Jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ka(e)}var gg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fl(i){return i.replace(gg,xg)}function xg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ol(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function _g(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===th?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Tc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===An&&(t="SHADOWMAP_TYPE_VSM"),t}function vg(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case rs:case os:t="ENVMAP_TYPE_CUBE";break;case go:t="ENVMAP_TYPE_CUBE_UV";break}return t}function yg(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case os:t="ENVMAP_MODE_REFRACTION";break}return t}function Mg(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case eh:t="ENVMAP_BLENDING_MULTIPLY";break;case gu:t="ENVMAP_BLENDING_MIX";break;case xu:t="ENVMAP_BLENDING_ADD";break}return t}function Sg(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Eg(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=_g(e),l=vg(e),h=yg(e),f=Mg(e),d=Sg(e),u=hg(e),g=ug(r),_=s.createProgram(),m,p,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Us).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Us).join(`
`),p.length>0&&(p+=`
`)):(m=[Ol(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Us).join(`
`),p=[Ol(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Yn?"#define TONE_MAPPING":"",e.toneMapping!==Yn?Jt.tonemapping_pars_fragment:"",e.toneMapping!==Yn?cg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,ag("linearToOutputTexel",e.outputColorSpace),lg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Us).join(`
`)),o=Ka(o),o=Ul(o,e),o=Nl(o,e),a=Ka(a),a=Ul(a,e),a=Nl(a,e),o=Fl(o),a=Fl(a),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===$c?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===$c?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let v=w+m+o,x=w+p+a,S=Pl(s,s.VERTEX_SHADER,v),T=Pl(s,s.FRAGMENT_SHADER,x);s.attachShader(_,S),s.attachShader(_,T),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(N){if(i.debug.checkShaderErrors){let Z=s.getProgramInfoLog(_).trim(),G=s.getShaderInfoLog(S).trim(),J=s.getShaderInfoLog(T).trim(),I=!0,R=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(I=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,S,T);else{let F=Dl(s,S,"vertex"),D=Dl(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+Z+`
`+F+`
`+D)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(G===""||J==="")&&(R=!1);R&&(N.diagnostics={runnable:I,programLog:Z,vertexShader:{log:G,prefix:m},fragmentShader:{log:J,prefix:p}})}s.deleteShader(S),s.deleteShader(T),U=new is(s,_),b=dg(s,_)}let U;this.getUniforms=function(){return U===void 0&&C(this),U};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(_,ig)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=sg++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=S,this.fragmentShader=T,this}var bg=0,Qa=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new ja(t),e.set(t,n)),n}},ja=class{constructor(t){this.id=bg++,this.code=t,this.usedTimes=0}};function wg(i,t,e,n,s,r,o){let a=new qr,c=new Qa,l=new Set,h=[],f=s.logarithmicDepthBuffer,d=s.vertexTextures,u=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,M,N,Z,G){let J=Z.fog,I=G.geometry,R=b.isMeshStandardMaterial?Z.environment:null,F=(b.isMeshStandardMaterial?e:t).get(b.envMap||R),D=F&&F.mapping===go?F.image.height:null,k=g[b.type];b.precision!==null&&(u=s.getMaxPrecision(b.precision),u!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",u,"instead."));let Y=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,q=Y!==void 0?Y.length:0,rt=0;I.morphAttributes.position!==void 0&&(rt=1),I.morphAttributes.normal!==void 0&&(rt=2),I.morphAttributes.color!==void 0&&(rt=3);let ft,z,$,it;if(k){let ee=gn[k];ft=ee.vertexShader,z=ee.fragmentShader}else ft=b.vertexShader,z=b.fragmentShader,c.update(b),$=c.getVertexShaderID(b),it=c.getFragmentShaderID(b);let j=i.getRenderTarget(),yt=i.state.buffers.depth.getReversed(),Ht=G.isInstancedMesh===!0,Dt=G.isBatchedMesh===!0,Wt=!!b.map,tt=!!b.matcap,st=!!F,P=!!b.aoMap,wt=!!b.lightMap,at=!!b.bumpMap,gt=!!b.normalMap,lt=!!b.displacementMap,bt=!!b.emissiveMap,ht=!!b.metalnessMap,A=!!b.roughnessMap,E=b.anisotropy>0,X=b.clearcoat>0,K=b.dispersion>0,ct=b.iridescence>0,et=b.sheen>0,Lt=b.transmission>0,nt=E&&!!b.anisotropyMap,vt=X&&!!b.clearcoatMap,It=X&&!!b.clearcoatNormalMap,ut=X&&!!b.clearcoatRoughnessMap,_t=ct&&!!b.iridescenceMap,Et=ct&&!!b.iridescenceThicknessMap,Ot=et&&!!b.sheenColorMap,Ct=et&&!!b.sheenRoughnessMap,$t=!!b.specularMap,Vt=!!b.specularColorMap,se=!!b.specularIntensityMap,H=Lt&&!!b.transmissionMap,Mt=Lt&&!!b.thicknessMap,Q=!!b.gradientMap,ot=!!b.alphaMap,Rt=b.alphaTest>0,At=!!b.alphaHash,qt=!!b.extensions,ue=Yn;b.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(ue=i.toneMapping);let Me={shaderID:k,shaderType:b.type,shaderName:b.name,vertexShader:ft,fragmentShader:z,defines:b.defines,customVertexShaderID:$,customFragmentShaderID:it,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:u,batching:Dt,batchingColor:Dt&&G._colorsTexture!==null,instancing:Ht,instancingColor:Ht&&G.instanceColor!==null,instancingMorph:Ht&&G.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:j===null?i.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:ys,alphaToCoverage:!!b.alphaToCoverage,map:Wt,matcap:tt,envMap:st,envMapMode:st&&F.mapping,envMapCubeUVHeight:D,aoMap:P,lightMap:wt,bumpMap:at,normalMap:gt,displacementMap:d&&lt,emissiveMap:bt,normalMapObjectSpace:gt&&b.normalMapType===Au,normalMapTangentSpace:gt&&b.normalMapType===dh,metalnessMap:ht,roughnessMap:A,anisotropy:E,anisotropyMap:nt,clearcoat:X,clearcoatMap:vt,clearcoatNormalMap:It,clearcoatRoughnessMap:ut,dispersion:K,iridescence:ct,iridescenceMap:_t,iridescenceThicknessMap:Et,sheen:et,sheenColorMap:Ot,sheenRoughnessMap:Ct,specularMap:$t,specularColorMap:Vt,specularIntensityMap:se,transmission:Lt,transmissionMap:H,thicknessMap:Mt,gradientMap:Q,opaque:b.transparent===!1&&b.blending===ts&&b.alphaToCoverage===!1,alphaMap:ot,alphaTest:Rt,alphaHash:At,combine:b.combine,mapUv:Wt&&_(b.map.channel),aoMapUv:P&&_(b.aoMap.channel),lightMapUv:wt&&_(b.lightMap.channel),bumpMapUv:at&&_(b.bumpMap.channel),normalMapUv:gt&&_(b.normalMap.channel),displacementMapUv:lt&&_(b.displacementMap.channel),emissiveMapUv:bt&&_(b.emissiveMap.channel),metalnessMapUv:ht&&_(b.metalnessMap.channel),roughnessMapUv:A&&_(b.roughnessMap.channel),anisotropyMapUv:nt&&_(b.anisotropyMap.channel),clearcoatMapUv:vt&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:It&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ut&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Et&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ot&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&_(b.sheenRoughnessMap.channel),specularMapUv:$t&&_(b.specularMap.channel),specularColorMapUv:Vt&&_(b.specularColorMap.channel),specularIntensityMapUv:se&&_(b.specularIntensityMap.channel),transmissionMapUv:H&&_(b.transmissionMap.channel),thicknessMapUv:Mt&&_(b.thicknessMap.channel),alphaMapUv:ot&&_(b.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(gt||E),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!I.attributes.uv&&(Wt||ot),fog:!!J,useFog:b.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:yt,skinning:G.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:rt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:ue,decodeVideoTexture:Wt&&b.map.isVideoTexture===!0&&ie.getTransfer(b.map.colorSpace)===le,decodeVideoTextureEmissive:bt&&b.emissiveMap.isVideoTexture===!0&&ie.getTransfer(b.emissiveMap.colorSpace)===le,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ee,flipSided:b.side===Oe,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:qt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(qt&&b.extensions.multiDraw===!0||Dt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Me.vertexUv1s=l.has(1),Me.vertexUv2s=l.has(2),Me.vertexUv3s=l.has(3),l.clear(),Me}function p(b){let M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(let N in b.defines)M.push(N),M.push(b.defines[N]);return b.isRawShaderMaterial===!1&&(w(M,b),v(M,b),M.push(i.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function w(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function v(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function x(b){let M=g[b.type],N;if(M){let Z=gn[M];N=pd.clone(Z.uniforms)}else N=b.uniforms;return N}function S(b,M){let N;for(let Z=0,G=h.length;Z<G;Z++){let J=h[Z];if(J.cacheKey===M){N=J,++N.usedTimes;break}}return N===void 0&&(N=new Eg(i,M,b,r),h.push(N)),N}function T(b){if(--b.usedTimes===0){let M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function C(b){c.remove(b)}function U(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:S,releaseProgram:T,releaseShaderCache:C,programs:h,dispose:U}}function Tg(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Ag(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Bl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function zl(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(f,d,u,g,_,m){let p=i[t];return p===void 0?(p={id:f.id,object:f,geometry:d,material:u,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},i[t]=p):(p.id=f.id,p.object=f,p.geometry=d,p.material=u,p.groupOrder=g,p.renderOrder=f.renderOrder,p.z=_,p.group=m),t++,p}function a(f,d,u,g,_,m){let p=o(f,d,u,g,_,m);u.transmission>0?n.push(p):u.transparent===!0?s.push(p):e.push(p)}function c(f,d,u,g,_,m){let p=o(f,d,u,g,_,m);u.transmission>0?n.unshift(p):u.transparent===!0?s.unshift(p):e.unshift(p)}function l(f,d){e.length>1&&e.sort(f||Ag),n.length>1&&n.sort(d||Bl),s.length>1&&s.sort(d||Bl)}function h(){for(let f=t,d=i.length;f<d;f++){let u=i[f];if(u.id===null)break;u.id=null,u.object=null,u.geometry=null,u.material=null,u.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Rg(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new zl,i.set(n,[o])):s>=r.length?(o=new zl,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Cg(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new kt};break;case"SpotLight":e={position:new L,direction:new L,color:new kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new kt,groundColor:new kt};break;case"RectAreaLight":e={color:new kt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function Ig(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Pg=0;function Lg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Dg(i){let t=new Cg,e=Ig(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);let s=new L,r=new Qt,o=new Qt;function a(l){let h=0,f=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let u=0,g=0,_=0,m=0,p=0,w=0,v=0,x=0,S=0,T=0,C=0;l.sort(Lg);for(let b=0,M=l.length;b<M;b++){let N=l[b],Z=N.color,G=N.intensity,J=N.distance,I=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)h+=Z.r*G,f+=Z.g*G,d+=Z.b*G;else if(N.isLightProbe){for(let R=0;R<9;R++)n.probe[R].addScaledVector(N.sh.coefficients[R],G);C++}else if(N.isDirectionalLight){let R=t.get(N);if(R.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let F=N.shadow,D=e.get(N);D.shadowIntensity=F.intensity,D.shadowBias=F.bias,D.shadowNormalBias=F.normalBias,D.shadowRadius=F.radius,D.shadowMapSize=F.mapSize,n.directionalShadow[u]=D,n.directionalShadowMap[u]=I,n.directionalShadowMatrix[u]=N.shadow.matrix,w++}n.directional[u]=R,u++}else if(N.isSpotLight){let R=t.get(N);R.position.setFromMatrixPosition(N.matrixWorld),R.color.copy(Z).multiplyScalar(G),R.distance=J,R.coneCos=Math.cos(N.angle),R.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),R.decay=N.decay,n.spot[_]=R;let F=N.shadow;if(N.map&&(n.spotLightMap[S]=N.map,S++,F.updateMatrices(N),N.castShadow&&T++),n.spotLightMatrix[_]=F.matrix,N.castShadow){let D=e.get(N);D.shadowIntensity=F.intensity,D.shadowBias=F.bias,D.shadowNormalBias=F.normalBias,D.shadowRadius=F.radius,D.shadowMapSize=F.mapSize,n.spotShadow[_]=D,n.spotShadowMap[_]=I,x++}_++}else if(N.isRectAreaLight){let R=t.get(N);R.color.copy(Z).multiplyScalar(G),R.halfWidth.set(N.width*.5,0,0),R.halfHeight.set(0,N.height*.5,0),n.rectArea[m]=R,m++}else if(N.isPointLight){let R=t.get(N);if(R.color.copy(N.color).multiplyScalar(N.intensity),R.distance=N.distance,R.decay=N.decay,N.castShadow){let F=N.shadow,D=e.get(N);D.shadowIntensity=F.intensity,D.shadowBias=F.bias,D.shadowNormalBias=F.normalBias,D.shadowRadius=F.radius,D.shadowMapSize=F.mapSize,D.shadowCameraNear=F.camera.near,D.shadowCameraFar=F.camera.far,n.pointShadow[g]=D,n.pointShadowMap[g]=I,n.pointShadowMatrix[g]=N.shadow.matrix,v++}n.point[g]=R,g++}else if(N.isHemisphereLight){let R=t.get(N);R.skyColor.copy(N.color).multiplyScalar(G),R.groundColor.copy(N.groundColor).multiplyScalar(G),n.hemi[p]=R,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Tt.LTC_FLOAT_1,n.rectAreaLTC2=Tt.LTC_FLOAT_2):(n.rectAreaLTC1=Tt.LTC_HALF_1,n.rectAreaLTC2=Tt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=d;let U=n.hash;(U.directionalLength!==u||U.pointLength!==g||U.spotLength!==_||U.rectAreaLength!==m||U.hemiLength!==p||U.numDirectionalShadows!==w||U.numPointShadows!==v||U.numSpotShadows!==x||U.numSpotMaps!==S||U.numLightProbes!==C)&&(n.directional.length=u,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=x+S-T,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=C,U.directionalLength=u,U.pointLength=g,U.spotLength=_,U.rectAreaLength=m,U.hemiLength=p,U.numDirectionalShadows=w,U.numPointShadows=v,U.numSpotShadows=x,U.numSpotMaps=S,U.numLightProbes=C,n.version=Pg++)}function c(l,h){let f=0,d=0,u=0,g=0,_=0,m=h.matrixWorldInverse;for(let p=0,w=l.length;p<w;p++){let v=l[p];if(v.isDirectionalLight){let x=n.directional[f];x.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),f++}else if(v.isSpotLight){let x=n.spot[u];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(v.isRectAreaLight){let x=n.rectArea[g];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){let x=n.point[d];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),d++}else if(v.isHemisphereLight){let x=n.hemi[_];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function Hl(i){let t=new Dg(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Ug(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Hl(i),t.set(s,[a])):r>=o.length?(a=new Hl(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var tc=class extends Kn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=wu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},ec=class extends Kn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Ng=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Fg=`uniform sampler2D shadow_pass;
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
}`;function Og(i,t,e){let n=new Xs,s=new dt,r=new dt,o=new he,a=new tc({depthPacking:Tu}),c=new ec,l={},h=e.maxTextureSize,f={[Jn]:Oe,[Oe]:Jn,[Ee]:Ee},d=new Ke({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new dt},radius:{value:4}},vertexShader:Ng,fragmentShader:Fg}),u=d.clone();u.defines.HORIZONTAL_PASS=1;let g=new fe;g.setAttribute("position",new Pe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new mt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=th;let p=this.type;this.render=function(T,C,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;let b=i.getRenderTarget(),M=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),Z=i.state;Z.setBlending(qn),Z.buffers.color.setClear(1,1,1,1),Z.buffers.depth.setTest(!0),Z.setScissorTest(!1);let G=p!==An&&this.type===An,J=p===An&&this.type!==An;for(let I=0,R=T.length;I<R;I++){let F=T[I],D=F.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",F,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;s.copy(D.mapSize);let k=D.getFrameExtents();if(s.multiply(k),r.copy(D.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/k.x),s.x=r.x*k.x,D.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/k.y),s.y=r.y*k.y,D.mapSize.y=r.y)),D.map===null||G===!0||J===!0){let q=this.type!==An?{minFilter:$e,magFilter:$e}:{};D.map!==null&&D.map.dispose(),D.map=new en(s.x,s.y,q),D.map.texture.name=F.name+".shadowMap",D.camera.updateProjectionMatrix()}i.setRenderTarget(D.map),i.clear();let Y=D.getViewportCount();for(let q=0;q<Y;q++){let rt=D.getViewport(q);o.set(r.x*rt.x,r.y*rt.y,r.x*rt.z,r.y*rt.w),Z.viewport(o),D.updateMatrices(F,q),n=D.getFrustum(),x(C,U,D.camera,F,this.type)}D.isPointLightShadow!==!0&&this.type===An&&w(D,U),D.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,M,N)};function w(T,C){let U=t.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,u.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,u.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new en(s.x,s.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(C,null,U,d,_,null),u.uniforms.shadow_pass.value=T.mapPass.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(C,null,U,u,_,null)}function v(T,C,U,b){let M=null,N=U.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(N!==void 0)M=N;else if(M=U.isPointLight===!0?c:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){let Z=M.uuid,G=C.uuid,J=l[Z];J===void 0&&(J={},l[Z]=J);let I=J[G];I===void 0&&(I=M.clone(),J[G]=I,C.addEventListener("dispose",S)),M=I}if(M.visible=C.visible,M.wireframe=C.wireframe,b===An?M.side=C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:f[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,U.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let Z=i.properties.get(M);Z.light=U}return M}function x(T,C,U,b,M){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===An)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,T.matrixWorld);let G=t.update(T),J=T.material;if(Array.isArray(J)){let I=G.groups;for(let R=0,F=I.length;R<F;R++){let D=I[R],k=J[D.materialIndex];if(k&&k.visible){let Y=v(T,k,b,M);T.onBeforeShadow(i,T,C,U,G,Y,D),i.renderBufferDirect(U,null,G,Y,T,D),T.onAfterShadow(i,T,C,U,G,Y,D)}}}else if(J.visible){let I=v(T,J,b,M);T.onBeforeShadow(i,T,C,U,G,I,null),i.renderBufferDirect(U,null,G,I,T,null),T.onAfterShadow(i,T,C,U,G,I,null)}}let Z=T.children;for(let G=0,J=Z.length;G<J;G++)x(Z[G],C,U,b,M)}function S(T){T.target.removeEventListener("dispose",S);for(let U in l){let b=l[U],M=T.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}var Bg={[oa]:aa,[ca]:ua,[la]:da,[ss]:ha,[aa]:oa,[ua]:ca,[da]:la,[ha]:ss};function zg(i,t){function e(){let H=!1,Mt=new he,Q=null,ot=new he(0,0,0,0);return{setMask:function(Rt){Q!==Rt&&!H&&(i.colorMask(Rt,Rt,Rt,Rt),Q=Rt)},setLocked:function(Rt){H=Rt},setClear:function(Rt,At,qt,ue,Me){Me===!0&&(Rt*=ue,At*=ue,qt*=ue),Mt.set(Rt,At,qt,ue),ot.equals(Mt)===!1&&(i.clearColor(Rt,At,qt,ue),ot.copy(Mt))},reset:function(){H=!1,Q=null,ot.set(-1,0,0,0)}}}function n(){let H=!1,Mt=!1,Q=null,ot=null,Rt=null;return{setReversed:function(At){if(Mt!==At){let qt=t.get("EXT_clip_control");Mt?qt.clipControlEXT(qt.LOWER_LEFT_EXT,qt.ZERO_TO_ONE_EXT):qt.clipControlEXT(qt.LOWER_LEFT_EXT,qt.NEGATIVE_ONE_TO_ONE_EXT);let ue=Rt;Rt=null,this.setClear(ue)}Mt=At},getReversed:function(){return Mt},setTest:function(At){At?j(i.DEPTH_TEST):yt(i.DEPTH_TEST)},setMask:function(At){Q!==At&&!H&&(i.depthMask(At),Q=At)},setFunc:function(At){if(Mt&&(At=Bg[At]),ot!==At){switch(At){case oa:i.depthFunc(i.NEVER);break;case aa:i.depthFunc(i.ALWAYS);break;case ca:i.depthFunc(i.LESS);break;case ss:i.depthFunc(i.LEQUAL);break;case la:i.depthFunc(i.EQUAL);break;case ha:i.depthFunc(i.GEQUAL);break;case ua:i.depthFunc(i.GREATER);break;case da:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ot=At}},setLocked:function(At){H=At},setClear:function(At){Rt!==At&&(Mt&&(At=1-At),i.clearDepth(At),Rt=At)},reset:function(){H=!1,Q=null,ot=null,Rt=null,Mt=!1}}}function s(){let H=!1,Mt=null,Q=null,ot=null,Rt=null,At=null,qt=null,ue=null,Me=null;return{setTest:function(ee){H||(ee?j(i.STENCIL_TEST):yt(i.STENCIL_TEST))},setMask:function(ee){Mt!==ee&&!H&&(i.stencilMask(ee),Mt=ee)},setFunc:function(ee,He,Qe){(Q!==ee||ot!==He||Rt!==Qe)&&(i.stencilFunc(ee,He,Qe),Q=ee,ot=He,Rt=Qe)},setOp:function(ee,He,Qe){(At!==ee||qt!==He||ue!==Qe)&&(i.stencilOp(ee,He,Qe),At=ee,qt=He,ue=Qe)},setLocked:function(ee){H=ee},setClear:function(ee){Me!==ee&&(i.clearStencil(ee),Me=ee)},reset:function(){H=!1,Mt=null,Q=null,ot=null,Rt=null,At=null,qt=null,ue=null,Me=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},f={},d=new WeakMap,u=[],g=null,_=!1,m=null,p=null,w=null,v=null,x=null,S=null,T=null,C=new kt(0,0,0),U=0,b=!1,M=null,N=null,Z=null,G=null,J=null,I=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),R=!1,F=0,D=i.getParameter(i.VERSION);D.indexOf("WebGL")!==-1?(F=parseFloat(/^WebGL (\d)/.exec(D)[1]),R=F>=1):D.indexOf("OpenGL ES")!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(D)[1]),R=F>=2);let k=null,Y={},q=i.getParameter(i.SCISSOR_BOX),rt=i.getParameter(i.VIEWPORT),ft=new he().fromArray(q),z=new he().fromArray(rt);function $(H,Mt,Q,ot){let Rt=new Uint8Array(4),At=i.createTexture();i.bindTexture(H,At),i.texParameteri(H,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(H,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let qt=0;qt<Q;qt++)H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY?i.texImage3D(Mt,0,i.RGBA,1,1,ot,0,i.RGBA,i.UNSIGNED_BYTE,Rt):i.texImage2D(Mt+qt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Rt);return At}let it={};it[i.TEXTURE_2D]=$(i.TEXTURE_2D,i.TEXTURE_2D,1),it[i.TEXTURE_CUBE_MAP]=$(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),it[i.TEXTURE_2D_ARRAY]=$(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),it[i.TEXTURE_3D]=$(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),j(i.DEPTH_TEST),o.setFunc(ss),at(!1),gt(Vc),j(i.CULL_FACE),P(qn);function j(H){h[H]!==!0&&(i.enable(H),h[H]=!0)}function yt(H){h[H]!==!1&&(i.disable(H),h[H]=!1)}function Ht(H,Mt){return f[H]!==Mt?(i.bindFramebuffer(H,Mt),f[H]=Mt,H===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=Mt),H===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=Mt),!0):!1}function Dt(H,Mt){let Q=u,ot=!1;if(H){Q=d.get(Mt),Q===void 0&&(Q=[],d.set(Mt,Q));let Rt=H.textures;if(Q.length!==Rt.length||Q[0]!==i.COLOR_ATTACHMENT0){for(let At=0,qt=Rt.length;At<qt;At++)Q[At]=i.COLOR_ATTACHMENT0+At;Q.length=Rt.length,ot=!0}}else Q[0]!==i.BACK&&(Q[0]=i.BACK,ot=!0);ot&&i.drawBuffers(Q)}function Wt(H){return g!==H?(i.useProgram(H),g=H,!0):!1}let tt={[di]:i.FUNC_ADD,[jh]:i.FUNC_SUBTRACT,[tu]:i.FUNC_REVERSE_SUBTRACT};tt[eu]=i.MIN,tt[nu]=i.MAX;let st={[iu]:i.ZERO,[su]:i.ONE,[ru]:i.SRC_COLOR,[sa]:i.SRC_ALPHA,[uu]:i.SRC_ALPHA_SATURATE,[lu]:i.DST_COLOR,[au]:i.DST_ALPHA,[ou]:i.ONE_MINUS_SRC_COLOR,[ra]:i.ONE_MINUS_SRC_ALPHA,[hu]:i.ONE_MINUS_DST_COLOR,[cu]:i.ONE_MINUS_DST_ALPHA,[du]:i.CONSTANT_COLOR,[fu]:i.ONE_MINUS_CONSTANT_COLOR,[pu]:i.CONSTANT_ALPHA,[mu]:i.ONE_MINUS_CONSTANT_ALPHA};function P(H,Mt,Q,ot,Rt,At,qt,ue,Me,ee){if(H===qn){_===!0&&(yt(i.BLEND),_=!1);return}if(_===!1&&(j(i.BLEND),_=!0),H!==Qh){if(H!==m||ee!==b){if((p!==di||x!==di)&&(i.blendEquation(i.FUNC_ADD),p=di,x=di),ee)switch(H){case ts:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Gc:i.blendFunc(i.ONE,i.ONE);break;case Wc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case ts:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Gc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Wc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}w=null,v=null,S=null,T=null,C.set(0,0,0),U=0,m=H,b=ee}return}Rt=Rt||Mt,At=At||Q,qt=qt||ot,(Mt!==p||Rt!==x)&&(i.blendEquationSeparate(tt[Mt],tt[Rt]),p=Mt,x=Rt),(Q!==w||ot!==v||At!==S||qt!==T)&&(i.blendFuncSeparate(st[Q],st[ot],st[At],st[qt]),w=Q,v=ot,S=At,T=qt),(ue.equals(C)===!1||Me!==U)&&(i.blendColor(ue.r,ue.g,ue.b,Me),C.copy(ue),U=Me),m=H,b=!1}function wt(H,Mt){H.side===Ee?yt(i.CULL_FACE):j(i.CULL_FACE);let Q=H.side===Oe;Mt&&(Q=!Q),at(Q),H.blending===ts&&H.transparent===!1?P(qn):P(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),o.setFunc(H.depthFunc),o.setTest(H.depthTest),o.setMask(H.depthWrite),r.setMask(H.colorWrite);let ot=H.stencilWrite;a.setTest(ot),ot&&(a.setMask(H.stencilWriteMask),a.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),a.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),bt(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?j(i.SAMPLE_ALPHA_TO_COVERAGE):yt(i.SAMPLE_ALPHA_TO_COVERAGE)}function at(H){M!==H&&(H?i.frontFace(i.CW):i.frontFace(i.CCW),M=H)}function gt(H){H!==$h?(j(i.CULL_FACE),H!==N&&(H===Vc?i.cullFace(i.BACK):H===Kh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):yt(i.CULL_FACE),N=H}function lt(H){H!==Z&&(R&&i.lineWidth(H),Z=H)}function bt(H,Mt,Q){H?(j(i.POLYGON_OFFSET_FILL),(G!==Mt||J!==Q)&&(i.polygonOffset(Mt,Q),G=Mt,J=Q)):yt(i.POLYGON_OFFSET_FILL)}function ht(H){H?j(i.SCISSOR_TEST):yt(i.SCISSOR_TEST)}function A(H){H===void 0&&(H=i.TEXTURE0+I-1),k!==H&&(i.activeTexture(H),k=H)}function E(H,Mt,Q){Q===void 0&&(k===null?Q=i.TEXTURE0+I-1:Q=k);let ot=Y[Q];ot===void 0&&(ot={type:void 0,texture:void 0},Y[Q]=ot),(ot.type!==H||ot.texture!==Mt)&&(k!==Q&&(i.activeTexture(Q),k=Q),i.bindTexture(H,Mt||it[H]),ot.type=H,ot.texture=Mt)}function X(){let H=Y[k];H!==void 0&&H.type!==void 0&&(i.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function K(){try{i.compressedTexImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ct(){try{i.compressedTexImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function et(){try{i.texSubImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Lt(){try{i.texSubImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function nt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function vt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function It(){try{i.texStorage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ut(){try{i.texStorage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function _t(){try{i.texImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Et(){try{i.texImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ot(H){ft.equals(H)===!1&&(i.scissor(H.x,H.y,H.z,H.w),ft.copy(H))}function Ct(H){z.equals(H)===!1&&(i.viewport(H.x,H.y,H.z,H.w),z.copy(H))}function $t(H,Mt){let Q=l.get(Mt);Q===void 0&&(Q=new WeakMap,l.set(Mt,Q));let ot=Q.get(H);ot===void 0&&(ot=i.getUniformBlockIndex(Mt,H.name),Q.set(H,ot))}function Vt(H,Mt){let ot=l.get(Mt).get(H);c.get(Mt)!==ot&&(i.uniformBlockBinding(Mt,ot,H.__bindingPointIndex),c.set(Mt,ot))}function se(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},k=null,Y={},f={},d=new WeakMap,u=[],g=null,_=!1,m=null,p=null,w=null,v=null,x=null,S=null,T=null,C=new kt(0,0,0),U=0,b=!1,M=null,N=null,Z=null,G=null,J=null,ft.set(0,0,i.canvas.width,i.canvas.height),z.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:j,disable:yt,bindFramebuffer:Ht,drawBuffers:Dt,useProgram:Wt,setBlending:P,setMaterial:wt,setFlipSided:at,setCullFace:gt,setLineWidth:lt,setPolygonOffset:bt,setScissorTest:ht,activeTexture:A,bindTexture:E,unbindTexture:X,compressedTexImage2D:K,compressedTexImage3D:ct,texImage2D:_t,texImage3D:Et,updateUBOMapping:$t,uniformBlockBinding:Vt,texStorage2D:It,texStorage3D:ut,texSubImage2D:et,texSubImage3D:Lt,compressedTexSubImage2D:nt,compressedTexSubImage3D:vt,scissor:Ot,viewport:Ct,reset:se}}function kl(i,t,e,n){let s=Hg(n);switch(e){case oh:return i*t;case ch:return i*t;case lh:return i*t*2;case Pc:return i*t/s.components*s.byteLength;case Lc:return i*t/s.components*s.byteLength;case hh:return i*t*2/s.components*s.byteLength;case Dc:return i*t*2/s.components*s.byteLength;case ah:return i*t*3/s.components*s.byteLength;case un:return i*t*4/s.components*s.byteLength;case Uc:return i*t*4/s.components*s.byteLength;case Or:case Br:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case zr:case Hr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case xa:case va:return Math.max(i,16)*Math.max(t,8)/4;case ga:case _a:return Math.max(i,8)*Math.max(t,8)/2;case ya:case Ma:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Sa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ea:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ba:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case wa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ta:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Aa:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ra:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ca:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ia:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Pa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case La:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Da:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ua:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Na:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Fa:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case kr:case Oa:case Ba:return Math.ceil(i/4)*Math.ceil(t/4)*16;case uh:case za:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ha:case ka:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Hg(i){switch(i){case Pn:case ih:return{byteLength:1,components:1};case Hs:case sh:case ti:return{byteLength:2,components:1};case Cc:case Ic:return{byteLength:2,components:4};case xi:case Rc:case _n:return{byteLength:4,components:1};case rh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function kg(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new dt,h=new WeakMap,f,d=new WeakMap,u=!1;try{u=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,E){return u?new OffscreenCanvas(A,E):Vs("canvas")}function _(A,E,X){let K=1,ct=ht(A);if((ct.width>X||ct.height>X)&&(K=X/Math.max(ct.width,ct.height)),K<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let et=Math.floor(K*ct.width),Lt=Math.floor(K*ct.height);f===void 0&&(f=g(et,Lt));let nt=E?g(et,Lt):f;return nt.width=et,nt.height=Lt,nt.getContext("2d").drawImage(A,0,0,et,Lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ct.width+"x"+ct.height+") to ("+et+"x"+Lt+")."),nt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ct.width+"x"+ct.height+")."),A;return A}function m(A){return A.generateMipmaps}function p(A){i.generateMipmap(A)}function w(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(A,E,X,K,ct=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let et=E;if(E===i.RED&&(X===i.FLOAT&&(et=i.R32F),X===i.HALF_FLOAT&&(et=i.R16F),X===i.UNSIGNED_BYTE&&(et=i.R8)),E===i.RED_INTEGER&&(X===i.UNSIGNED_BYTE&&(et=i.R8UI),X===i.UNSIGNED_SHORT&&(et=i.R16UI),X===i.UNSIGNED_INT&&(et=i.R32UI),X===i.BYTE&&(et=i.R8I),X===i.SHORT&&(et=i.R16I),X===i.INT&&(et=i.R32I)),E===i.RG&&(X===i.FLOAT&&(et=i.RG32F),X===i.HALF_FLOAT&&(et=i.RG16F),X===i.UNSIGNED_BYTE&&(et=i.RG8)),E===i.RG_INTEGER&&(X===i.UNSIGNED_BYTE&&(et=i.RG8UI),X===i.UNSIGNED_SHORT&&(et=i.RG16UI),X===i.UNSIGNED_INT&&(et=i.RG32UI),X===i.BYTE&&(et=i.RG8I),X===i.SHORT&&(et=i.RG16I),X===i.INT&&(et=i.RG32I)),E===i.RGB_INTEGER&&(X===i.UNSIGNED_BYTE&&(et=i.RGB8UI),X===i.UNSIGNED_SHORT&&(et=i.RGB16UI),X===i.UNSIGNED_INT&&(et=i.RGB32UI),X===i.BYTE&&(et=i.RGB8I),X===i.SHORT&&(et=i.RGB16I),X===i.INT&&(et=i.RGB32I)),E===i.RGBA_INTEGER&&(X===i.UNSIGNED_BYTE&&(et=i.RGBA8UI),X===i.UNSIGNED_SHORT&&(et=i.RGBA16UI),X===i.UNSIGNED_INT&&(et=i.RGBA32UI),X===i.BYTE&&(et=i.RGBA8I),X===i.SHORT&&(et=i.RGBA16I),X===i.INT&&(et=i.RGBA32I)),E===i.RGB&&X===i.UNSIGNED_INT_5_9_9_9_REV&&(et=i.RGB9_E5),E===i.RGBA){let Lt=ct?xo:ie.getTransfer(K);X===i.FLOAT&&(et=i.RGBA32F),X===i.HALF_FLOAT&&(et=i.RGBA16F),X===i.UNSIGNED_BYTE&&(et=Lt===le?i.SRGB8_ALPHA8:i.RGBA8),X===i.UNSIGNED_SHORT_4_4_4_4&&(et=i.RGBA4),X===i.UNSIGNED_SHORT_5_5_5_1&&(et=i.RGB5_A1)}return(et===i.R16F||et===i.R32F||et===i.RG16F||et===i.RG32F||et===i.RGBA16F||et===i.RGBA32F)&&t.get("EXT_color_buffer_float"),et}function x(A,E){let X;return A?E===null||E===xi||E===as?X=i.DEPTH24_STENCIL8:E===_n?X=i.DEPTH32F_STENCIL8:E===Hs&&(X=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===xi||E===as?X=i.DEPTH_COMPONENT24:E===_n?X=i.DEPTH_COMPONENT32F:E===Hs&&(X=i.DEPTH_COMPONENT16),X}function S(A,E){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==$e&&A.minFilter!==xn?Math.log2(Math.max(E.width,E.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?E.mipmaps.length:1}function T(A){let E=A.target;E.removeEventListener("dispose",T),U(E),E.isVideoTexture&&h.delete(E)}function C(A){let E=A.target;E.removeEventListener("dispose",C),M(E)}function U(A){let E=n.get(A);if(E.__webglInit===void 0)return;let X=A.source,K=d.get(X);if(K){let ct=K[E.__cacheKey];ct.usedTimes--,ct.usedTimes===0&&b(A),Object.keys(K).length===0&&d.delete(X)}n.remove(A)}function b(A){let E=n.get(A);i.deleteTexture(E.__webglTexture);let X=A.source,K=d.get(X);delete K[E.__cacheKey],o.memory.textures--}function M(A){let E=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(E.__webglFramebuffer[K]))for(let ct=0;ct<E.__webglFramebuffer[K].length;ct++)i.deleteFramebuffer(E.__webglFramebuffer[K][ct]);else i.deleteFramebuffer(E.__webglFramebuffer[K]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[K])}else{if(Array.isArray(E.__webglFramebuffer))for(let K=0;K<E.__webglFramebuffer.length;K++)i.deleteFramebuffer(E.__webglFramebuffer[K]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let K=0;K<E.__webglColorRenderbuffer.length;K++)E.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[K]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let X=A.textures;for(let K=0,ct=X.length;K<ct;K++){let et=n.get(X[K]);et.__webglTexture&&(i.deleteTexture(et.__webglTexture),o.memory.textures--),n.remove(X[K])}n.remove(A)}let N=0;function Z(){N=0}function G(){let A=N;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),N+=1,A}function J(A){let E=[];return E.push(A.wrapS),E.push(A.wrapT),E.push(A.wrapR||0),E.push(A.magFilter),E.push(A.minFilter),E.push(A.anisotropy),E.push(A.internalFormat),E.push(A.format),E.push(A.type),E.push(A.generateMipmaps),E.push(A.premultiplyAlpha),E.push(A.flipY),E.push(A.unpackAlignment),E.push(A.colorSpace),E.join()}function I(A,E){let X=n.get(A);if(A.isVideoTexture&&lt(A),A.isRenderTargetTexture===!1&&A.version>0&&X.__version!==A.version){let K=A.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{z(X,A,E);return}}e.bindTexture(i.TEXTURE_2D,X.__webglTexture,i.TEXTURE0+E)}function R(A,E){let X=n.get(A);if(A.version>0&&X.__version!==A.version){z(X,A,E);return}e.bindTexture(i.TEXTURE_2D_ARRAY,X.__webglTexture,i.TEXTURE0+E)}function F(A,E){let X=n.get(A);if(A.version>0&&X.__version!==A.version){z(X,A,E);return}e.bindTexture(i.TEXTURE_3D,X.__webglTexture,i.TEXTURE0+E)}function D(A,E){let X=n.get(A);if(A.version>0&&X.__version!==A.version){$(X,A,E);return}e.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture,i.TEXTURE0+E)}let k={[gi]:i.REPEAT,[pi]:i.CLAMP_TO_EDGE,[ma]:i.MIRRORED_REPEAT},Y={[$e]:i.NEAREST,[bu]:i.NEAREST_MIPMAP_NEAREST,[cr]:i.NEAREST_MIPMAP_LINEAR,[xn]:i.LINEAR,[bo]:i.LINEAR_MIPMAP_NEAREST,[mi]:i.LINEAR_MIPMAP_LINEAR},q={[Ru]:i.NEVER,[Uu]:i.ALWAYS,[Cu]:i.LESS,[fh]:i.LEQUAL,[Iu]:i.EQUAL,[Du]:i.GEQUAL,[Pu]:i.GREATER,[Lu]:i.NOTEQUAL};function rt(A,E){if(E.type===_n&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===xn||E.magFilter===bo||E.magFilter===cr||E.magFilter===mi||E.minFilter===xn||E.minFilter===bo||E.minFilter===cr||E.minFilter===mi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,k[E.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,k[E.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,k[E.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,Y[E.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,Y[E.minFilter]),E.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,q[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===$e||E.minFilter!==cr&&E.minFilter!==mi||E.type===_n&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let X=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function ft(A,E){let X=!1;A.__webglInit===void 0&&(A.__webglInit=!0,E.addEventListener("dispose",T));let K=E.source,ct=d.get(K);ct===void 0&&(ct={},d.set(K,ct));let et=J(E);if(et!==A.__cacheKey){ct[et]===void 0&&(ct[et]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,X=!0),ct[et].usedTimes++;let Lt=ct[A.__cacheKey];Lt!==void 0&&(ct[A.__cacheKey].usedTimes--,Lt.usedTimes===0&&b(E)),A.__cacheKey=et,A.__webglTexture=ct[et].texture}return X}function z(A,E,X){let K=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(K=i.TEXTURE_3D);let ct=ft(A,E),et=E.source;e.bindTexture(K,A.__webglTexture,i.TEXTURE0+X);let Lt=n.get(et);if(et.version!==Lt.__version||ct===!0){e.activeTexture(i.TEXTURE0+X);let nt=ie.getPrimaries(ie.workingColorSpace),vt=E.colorSpace===Wn?null:ie.getPrimaries(E.colorSpace),It=E.colorSpace===Wn||nt===vt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,It);let ut=_(E.image,!1,s.maxTextureSize);ut=bt(E,ut);let _t=r.convert(E.format,E.colorSpace),Et=r.convert(E.type),Ot=v(E.internalFormat,_t,Et,E.colorSpace,E.isVideoTexture);rt(K,E);let Ct,$t=E.mipmaps,Vt=E.isVideoTexture!==!0,se=Lt.__version===void 0||ct===!0,H=et.dataReady,Mt=S(E,ut);if(E.isDepthTexture)Ot=x(E.format===cs,E.type),se&&(Vt?e.texStorage2D(i.TEXTURE_2D,1,Ot,ut.width,ut.height):e.texImage2D(i.TEXTURE_2D,0,Ot,ut.width,ut.height,0,_t,Et,null));else if(E.isDataTexture)if($t.length>0){Vt&&se&&e.texStorage2D(i.TEXTURE_2D,Mt,Ot,$t[0].width,$t[0].height);for(let Q=0,ot=$t.length;Q<ot;Q++)Ct=$t[Q],Vt?H&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,Ct.width,Ct.height,_t,Et,Ct.data):e.texImage2D(i.TEXTURE_2D,Q,Ot,Ct.width,Ct.height,0,_t,Et,Ct.data);E.generateMipmaps=!1}else Vt?(se&&e.texStorage2D(i.TEXTURE_2D,Mt,Ot,ut.width,ut.height),H&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut.width,ut.height,_t,Et,ut.data)):e.texImage2D(i.TEXTURE_2D,0,Ot,ut.width,ut.height,0,_t,Et,ut.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Vt&&se&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,Ot,$t[0].width,$t[0].height,ut.depth);for(let Q=0,ot=$t.length;Q<ot;Q++)if(Ct=$t[Q],E.format!==un)if(_t!==null)if(Vt){if(H)if(E.layerUpdates.size>0){let Rt=kl(Ct.width,Ct.height,E.format,E.type);for(let At of E.layerUpdates){let qt=Ct.data.subarray(At*Rt/Ct.data.BYTES_PER_ELEMENT,(At+1)*Rt/Ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,At,Ct.width,Ct.height,1,_t,qt)}E.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,Ct.width,Ct.height,ut.depth,_t,Ct.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Q,Ot,Ct.width,Ct.height,ut.depth,0,Ct.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?H&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,Ct.width,Ct.height,ut.depth,_t,Et,Ct.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Q,Ot,Ct.width,Ct.height,ut.depth,0,_t,Et,Ct.data)}else{Vt&&se&&e.texStorage2D(i.TEXTURE_2D,Mt,Ot,$t[0].width,$t[0].height);for(let Q=0,ot=$t.length;Q<ot;Q++)Ct=$t[Q],E.format!==un?_t!==null?Vt?H&&e.compressedTexSubImage2D(i.TEXTURE_2D,Q,0,0,Ct.width,Ct.height,_t,Ct.data):e.compressedTexImage2D(i.TEXTURE_2D,Q,Ot,Ct.width,Ct.height,0,Ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?H&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,Ct.width,Ct.height,_t,Et,Ct.data):e.texImage2D(i.TEXTURE_2D,Q,Ot,Ct.width,Ct.height,0,_t,Et,Ct.data)}else if(E.isDataArrayTexture)if(Vt){if(se&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,Ot,ut.width,ut.height,ut.depth),H)if(E.layerUpdates.size>0){let Q=kl(ut.width,ut.height,E.format,E.type);for(let ot of E.layerUpdates){let Rt=ut.data.subarray(ot*Q/ut.data.BYTES_PER_ELEMENT,(ot+1)*Q/ut.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ot,ut.width,ut.height,1,_t,Et,Rt)}E.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,_t,Et,ut.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ot,ut.width,ut.height,ut.depth,0,_t,Et,ut.data);else if(E.isData3DTexture)Vt?(se&&e.texStorage3D(i.TEXTURE_3D,Mt,Ot,ut.width,ut.height,ut.depth),H&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,_t,Et,ut.data)):e.texImage3D(i.TEXTURE_3D,0,Ot,ut.width,ut.height,ut.depth,0,_t,Et,ut.data);else if(E.isFramebufferTexture){if(se)if(Vt)e.texStorage2D(i.TEXTURE_2D,Mt,Ot,ut.width,ut.height);else{let Q=ut.width,ot=ut.height;for(let Rt=0;Rt<Mt;Rt++)e.texImage2D(i.TEXTURE_2D,Rt,Ot,Q,ot,0,_t,Et,null),Q>>=1,ot>>=1}}else if($t.length>0){if(Vt&&se){let Q=ht($t[0]);e.texStorage2D(i.TEXTURE_2D,Mt,Ot,Q.width,Q.height)}for(let Q=0,ot=$t.length;Q<ot;Q++)Ct=$t[Q],Vt?H&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,_t,Et,Ct):e.texImage2D(i.TEXTURE_2D,Q,Ot,_t,Et,Ct);E.generateMipmaps=!1}else if(Vt){if(se){let Q=ht(ut);e.texStorage2D(i.TEXTURE_2D,Mt,Ot,Q.width,Q.height)}H&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,_t,Et,ut)}else e.texImage2D(i.TEXTURE_2D,0,Ot,_t,Et,ut);m(E)&&p(K),Lt.__version=et.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function $(A,E,X){if(E.image.length!==6)return;let K=ft(A,E),ct=E.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+X);let et=n.get(ct);if(ct.version!==et.__version||K===!0){e.activeTexture(i.TEXTURE0+X);let Lt=ie.getPrimaries(ie.workingColorSpace),nt=E.colorSpace===Wn?null:ie.getPrimaries(E.colorSpace),vt=E.colorSpace===Wn||Lt===nt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);let It=E.isCompressedTexture||E.image[0].isCompressedTexture,ut=E.image[0]&&E.image[0].isDataTexture,_t=[];for(let ot=0;ot<6;ot++)!It&&!ut?_t[ot]=_(E.image[ot],!0,s.maxCubemapSize):_t[ot]=ut?E.image[ot].image:E.image[ot],_t[ot]=bt(E,_t[ot]);let Et=_t[0],Ot=r.convert(E.format,E.colorSpace),Ct=r.convert(E.type),$t=v(E.internalFormat,Ot,Ct,E.colorSpace),Vt=E.isVideoTexture!==!0,se=et.__version===void 0||K===!0,H=ct.dataReady,Mt=S(E,Et);rt(i.TEXTURE_CUBE_MAP,E);let Q;if(It){Vt&&se&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,$t,Et.width,Et.height);for(let ot=0;ot<6;ot++){Q=_t[ot].mipmaps;for(let Rt=0;Rt<Q.length;Rt++){let At=Q[Rt];E.format!==un?Ot!==null?Vt?H&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt,0,0,At.width,At.height,Ot,At.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt,$t,At.width,At.height,0,At.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?H&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt,0,0,At.width,At.height,Ot,Ct,At.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt,$t,At.width,At.height,0,Ot,Ct,At.data)}}}else{if(Q=E.mipmaps,Vt&&se){Q.length>0&&Mt++;let ot=ht(_t[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,$t,ot.width,ot.height)}for(let ot=0;ot<6;ot++)if(ut){Vt?H&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,_t[ot].width,_t[ot].height,Ot,Ct,_t[ot].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,$t,_t[ot].width,_t[ot].height,0,Ot,Ct,_t[ot].data);for(let Rt=0;Rt<Q.length;Rt++){let qt=Q[Rt].image[ot].image;Vt?H&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt+1,0,0,qt.width,qt.height,Ot,Ct,qt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt+1,$t,qt.width,qt.height,0,Ot,Ct,qt.data)}}else{Vt?H&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,Ot,Ct,_t[ot]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,$t,Ot,Ct,_t[ot]);for(let Rt=0;Rt<Q.length;Rt++){let At=Q[Rt];Vt?H&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt+1,0,0,Ot,Ct,At.image[ot]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt+1,$t,Ot,Ct,At.image[ot])}}}m(E)&&p(i.TEXTURE_CUBE_MAP),et.__version=ct.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function it(A,E,X,K,ct,et){let Lt=r.convert(X.format,X.colorSpace),nt=r.convert(X.type),vt=v(X.internalFormat,Lt,nt,X.colorSpace),It=n.get(E),ut=n.get(X);if(ut.__renderTarget=E,!It.__hasExternalTextures){let _t=Math.max(1,E.width>>et),Et=Math.max(1,E.height>>et);ct===i.TEXTURE_3D||ct===i.TEXTURE_2D_ARRAY?e.texImage3D(ct,et,vt,_t,Et,E.depth,0,Lt,nt,null):e.texImage2D(ct,et,vt,_t,Et,0,Lt,nt,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),gt(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,ct,ut.__webglTexture,0,at(E)):(ct===i.TEXTURE_2D||ct>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ct<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,ct,ut.__webglTexture,et),e.bindFramebuffer(i.FRAMEBUFFER,null)}function j(A,E,X){if(i.bindRenderbuffer(i.RENDERBUFFER,A),E.depthBuffer){let K=E.depthTexture,ct=K&&K.isDepthTexture?K.type:null,et=x(E.stencilBuffer,ct),Lt=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,nt=at(E);gt(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,nt,et,E.width,E.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,nt,et,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,et,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Lt,i.RENDERBUFFER,A)}else{let K=E.textures;for(let ct=0;ct<K.length;ct++){let et=K[ct],Lt=r.convert(et.format,et.colorSpace),nt=r.convert(et.type),vt=v(et.internalFormat,Lt,nt,et.colorSpace),It=at(E);X&&gt(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,It,vt,E.width,E.height):gt(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,It,vt,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,vt,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function yt(A,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let K=n.get(E.depthTexture);K.__renderTarget=E,(!K.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),I(E.depthTexture,0);let ct=K.__webglTexture,et=at(E);if(E.depthTexture.format===es)gt(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ct,0,et):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ct,0);else if(E.depthTexture.format===cs)gt(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ct,0,et):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ct,0);else throw new Error("Unknown depthTexture format")}function Ht(A){let E=n.get(A),X=A.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==A.depthTexture){let K=A.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),K){let ct=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,K.removeEventListener("dispose",ct)};K.addEventListener("dispose",ct),E.__depthDisposeCallback=ct}E.__boundDepthTexture=K}if(A.depthTexture&&!E.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");yt(E.__webglFramebuffer,A)}else if(X){E.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[K]),E.__webglDepthbuffer[K]===void 0)E.__webglDepthbuffer[K]=i.createRenderbuffer(),j(E.__webglDepthbuffer[K],A,!1);else{let ct=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,et=E.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,et),i.framebufferRenderbuffer(i.FRAMEBUFFER,ct,i.RENDERBUFFER,et)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),j(E.__webglDepthbuffer,A,!1);else{let K=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ct),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,ct)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Dt(A,E,X){let K=n.get(A);E!==void 0&&it(K.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),X!==void 0&&Ht(A)}function Wt(A){let E=A.texture,X=n.get(A),K=n.get(E);A.addEventListener("dispose",C);let ct=A.textures,et=A.isWebGLCubeRenderTarget===!0,Lt=ct.length>1;if(Lt||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=E.version,o.memory.textures++),et){X.__webglFramebuffer=[];for(let nt=0;nt<6;nt++)if(E.mipmaps&&E.mipmaps.length>0){X.__webglFramebuffer[nt]=[];for(let vt=0;vt<E.mipmaps.length;vt++)X.__webglFramebuffer[nt][vt]=i.createFramebuffer()}else X.__webglFramebuffer[nt]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){X.__webglFramebuffer=[];for(let nt=0;nt<E.mipmaps.length;nt++)X.__webglFramebuffer[nt]=i.createFramebuffer()}else X.__webglFramebuffer=i.createFramebuffer();if(Lt)for(let nt=0,vt=ct.length;nt<vt;nt++){let It=n.get(ct[nt]);It.__webglTexture===void 0&&(It.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&gt(A)===!1){X.__webglMultisampledFramebuffer=i.createFramebuffer(),X.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let nt=0;nt<ct.length;nt++){let vt=ct[nt];X.__webglColorRenderbuffer[nt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,X.__webglColorRenderbuffer[nt]);let It=r.convert(vt.format,vt.colorSpace),ut=r.convert(vt.type),_t=v(vt.internalFormat,It,ut,vt.colorSpace,A.isXRRenderTarget===!0),Et=at(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Et,_t,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+nt,i.RENDERBUFFER,X.__webglColorRenderbuffer[nt])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(X.__webglDepthRenderbuffer=i.createRenderbuffer(),j(X.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(et){e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),rt(i.TEXTURE_CUBE_MAP,E);for(let nt=0;nt<6;nt++)if(E.mipmaps&&E.mipmaps.length>0)for(let vt=0;vt<E.mipmaps.length;vt++)it(X.__webglFramebuffer[nt][vt],A,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,vt);else it(X.__webglFramebuffer[nt],A,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0);m(E)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Lt){for(let nt=0,vt=ct.length;nt<vt;nt++){let It=ct[nt],ut=n.get(It);e.bindTexture(i.TEXTURE_2D,ut.__webglTexture),rt(i.TEXTURE_2D,It),it(X.__webglFramebuffer,A,It,i.COLOR_ATTACHMENT0+nt,i.TEXTURE_2D,0),m(It)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let nt=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(nt=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(nt,K.__webglTexture),rt(nt,E),E.mipmaps&&E.mipmaps.length>0)for(let vt=0;vt<E.mipmaps.length;vt++)it(X.__webglFramebuffer[vt],A,E,i.COLOR_ATTACHMENT0,nt,vt);else it(X.__webglFramebuffer,A,E,i.COLOR_ATTACHMENT0,nt,0);m(E)&&p(nt),e.unbindTexture()}A.depthBuffer&&Ht(A)}function tt(A){let E=A.textures;for(let X=0,K=E.length;X<K;X++){let ct=E[X];if(m(ct)){let et=w(A),Lt=n.get(ct).__webglTexture;e.bindTexture(et,Lt),p(et),e.unbindTexture()}}}let st=[],P=[];function wt(A){if(A.samples>0){if(gt(A)===!1){let E=A.textures,X=A.width,K=A.height,ct=i.COLOR_BUFFER_BIT,et=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Lt=n.get(A),nt=E.length>1;if(nt)for(let vt=0;vt<E.length;vt++)e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let vt=0;vt<E.length;vt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(ct|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(ct|=i.STENCIL_BUFFER_BIT)),nt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Lt.__webglColorRenderbuffer[vt]);let It=n.get(E[vt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,It,0)}i.blitFramebuffer(0,0,X,K,0,0,X,K,ct,i.NEAREST),c===!0&&(st.length=0,P.length=0,st.push(i.COLOR_ATTACHMENT0+vt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(st.push(et),P.push(et),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,P)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,st))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),nt)for(let vt=0;vt<E.length;vt++){e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.RENDERBUFFER,Lt.__webglColorRenderbuffer[vt]);let It=n.get(E[vt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.TEXTURE_2D,It,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){let E=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function at(A){return Math.min(s.maxSamples,A.samples)}function gt(A){let E=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function lt(A){let E=o.render.frame;h.get(A)!==E&&(h.set(A,E),A.update())}function bt(A,E){let X=A.colorSpace,K=A.format,ct=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||X!==ys&&X!==Wn&&(ie.getTransfer(X)===le?(K!==un||ct!==Pn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),E}function ht(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=G,this.resetTextureUnits=Z,this.setTexture2D=I,this.setTexture2DArray=R,this.setTexture3D=F,this.setTextureCube=D,this.rebindTextures=Dt,this.setupRenderTarget=Wt,this.updateRenderTargetMipmap=tt,this.updateMultisampleRenderTarget=wt,this.setupDepthRenderbuffer=Ht,this.setupFrameBufferTexture=it,this.useMultisampledRTT=gt}function Vg(i,t){function e(n,s=Wn){let r,o=ie.getTransfer(s);if(n===Pn)return i.UNSIGNED_BYTE;if(n===Cc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ic)return i.UNSIGNED_SHORT_5_5_5_1;if(n===rh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ih)return i.BYTE;if(n===sh)return i.SHORT;if(n===Hs)return i.UNSIGNED_SHORT;if(n===Rc)return i.INT;if(n===xi)return i.UNSIGNED_INT;if(n===_n)return i.FLOAT;if(n===ti)return i.HALF_FLOAT;if(n===oh)return i.ALPHA;if(n===ah)return i.RGB;if(n===un)return i.RGBA;if(n===ch)return i.LUMINANCE;if(n===lh)return i.LUMINANCE_ALPHA;if(n===es)return i.DEPTH_COMPONENT;if(n===cs)return i.DEPTH_STENCIL;if(n===Pc)return i.RED;if(n===Lc)return i.RED_INTEGER;if(n===hh)return i.RG;if(n===Dc)return i.RG_INTEGER;if(n===Uc)return i.RGBA_INTEGER;if(n===Or||n===Br||n===zr||n===Hr)if(o===le)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Or)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Or)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Br)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===zr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Hr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ga||n===xa||n===_a||n===va)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ga)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===xa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===_a)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===va)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ya||n===Ma||n===Sa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ya||n===Ma)return o===le?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Sa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ea||n===ba||n===wa||n===Ta||n===Aa||n===Ra||n===Ca||n===Ia||n===Pa||n===La||n===Da||n===Ua||n===Na||n===Fa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ea)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ba)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ta)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Aa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ra)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ca)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ia)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Pa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===La)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Da)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ua)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Na)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Fa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===kr||n===Oa||n===Ba)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===kr)return o===le?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Oa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ba)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===uh||n===za||n===Ha||n===ka)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===kr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===za)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ha)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ka)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===as?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var nc=class extends Fe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},de=class extends Be{constructor(){super(),this.isGroup=!0,this.type="Group"}},Gg={type:"move"},Os=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new de,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new de,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new de,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=h.position.distanceTo(f.position),u=.02,g=.005;l.inputState.pinching&&d>u+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=u-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Gg)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new de;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Wg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Xg=`
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

}`,ic=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new Xe,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Ke({vertexShader:Wg,fragmentShader:Xg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new mt(new xe(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},sc=class extends $n{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,f=null,d=null,u=null,g=null,_=new ic,m=e.getContextAttributes(),p=null,w=null,v=[],x=[],S=new dt,T=null,C=new Fe;C.viewport=new he;let U=new Fe;U.viewport=new he;let b=[C,U],M=new nc,N=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let $=v[z];return $===void 0&&($=new Os,v[z]=$),$.getTargetRaySpace()},this.getControllerGrip=function(z){let $=v[z];return $===void 0&&($=new Os,v[z]=$),$.getGripSpace()},this.getHand=function(z){let $=v[z];return $===void 0&&($=new Os,v[z]=$),$.getHandSpace()};function G(z){let $=x.indexOf(z.inputSource);if($===-1)return;let it=v[$];it!==void 0&&(it.update(z.inputSource,z.frame,l||o),it.dispatchEvent({type:z.type,data:z.inputSource}))}function J(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",J),s.removeEventListener("inputsourceschange",I);for(let z=0;z<v.length;z++){let $=x[z];$!==null&&(x[z]=null,v[z].disconnect($))}N=null,Z=null,_.reset(),t.setRenderTarget(p),u=null,d=null,f=null,s=null,w=null,ft.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(S.width,S.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){r=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){a=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(z){l=z},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(z){if(s=z,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",J),s.addEventListener("inputsourceschange",I),m.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(S),s.renderState.layers===void 0){let $={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};u=new XRWebGLLayer(s,e,$),s.updateRenderState({baseLayer:u}),t.setPixelRatio(1),t.setSize(u.framebufferWidth,u.framebufferHeight,!1),w=new en(u.framebufferWidth,u.framebufferHeight,{format:un,type:Pn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let $=null,it=null,j=null;m.depth&&(j=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,$=m.stencil?cs:es,it=m.stencil?as:xi);let yt={colorFormat:e.RGBA8,depthFormat:j,scaleFactor:r};f=new XRWebGLBinding(s,e),d=f.createProjectionLayer(yt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),w=new en(d.textureWidth,d.textureHeight,{format:un,type:Pn,depthTexture:new ds(d.textureWidth,d.textureHeight,it,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),ft.setContext(s),ft.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function I(z){for(let $=0;$<z.removed.length;$++){let it=z.removed[$],j=x.indexOf(it);j>=0&&(x[j]=null,v[j].disconnect(it))}for(let $=0;$<z.added.length;$++){let it=z.added[$],j=x.indexOf(it);if(j===-1){for(let Ht=0;Ht<v.length;Ht++)if(Ht>=x.length){x.push(it),j=Ht;break}else if(x[Ht]===null){x[Ht]=it,j=Ht;break}if(j===-1)break}let yt=v[j];yt&&yt.connect(it)}}let R=new L,F=new L;function D(z,$,it){R.setFromMatrixPosition($.matrixWorld),F.setFromMatrixPosition(it.matrixWorld);let j=R.distanceTo(F),yt=$.projectionMatrix.elements,Ht=it.projectionMatrix.elements,Dt=yt[14]/(yt[10]-1),Wt=yt[14]/(yt[10]+1),tt=(yt[9]+1)/yt[5],st=(yt[9]-1)/yt[5],P=(yt[8]-1)/yt[0],wt=(Ht[8]+1)/Ht[0],at=Dt*P,gt=Dt*wt,lt=j/(-P+wt),bt=lt*-P;if($.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(bt),z.translateZ(lt),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert(),yt[10]===-1)z.projectionMatrix.copy($.projectionMatrix),z.projectionMatrixInverse.copy($.projectionMatrixInverse);else{let ht=Dt+lt,A=Wt+lt,E=at-bt,X=gt+(j-bt),K=tt*Wt/A*ht,ct=st*Wt/A*ht;z.projectionMatrix.makePerspective(E,X,K,ct,ht,A),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}}function k(z,$){$===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices($.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(s===null)return;let $=z.near,it=z.far;_.texture!==null&&(_.depthNear>0&&($=_.depthNear),_.depthFar>0&&(it=_.depthFar)),M.near=U.near=C.near=$,M.far=U.far=C.far=it,(N!==M.near||Z!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),N=M.near,Z=M.far),C.layers.mask=z.layers.mask|2,U.layers.mask=z.layers.mask|4,M.layers.mask=C.layers.mask|U.layers.mask;let j=z.parent,yt=M.cameras;k(M,j);for(let Ht=0;Ht<yt.length;Ht++)k(yt[Ht],j);yt.length===2?D(M,C,U):M.projectionMatrix.copy(C.projectionMatrix),Y(z,M,j)};function Y(z,$,it){it===null?z.matrix.copy($.matrixWorld):(z.matrix.copy(it.matrixWorld),z.matrix.invert(),z.matrix.multiply($.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy($.projectionMatrix),z.projectionMatrixInverse.copy($.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=ks*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&u===null))return c},this.setFoveation=function(z){c=z,d!==null&&(d.fixedFoveation=z),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=z)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let q=null;function rt(z,$){if(h=$.getViewerPose(l||o),g=$,h!==null){let it=h.views;u!==null&&(t.setRenderTargetFramebuffer(w,u.framebuffer),t.setRenderTarget(w));let j=!1;it.length!==M.cameras.length&&(M.cameras.length=0,j=!0);for(let Ht=0;Ht<it.length;Ht++){let Dt=it[Ht],Wt=null;if(u!==null)Wt=u.getViewport(Dt);else{let st=f.getViewSubImage(d,Dt);Wt=st.viewport,Ht===0&&(t.setRenderTargetTextures(w,st.colorTexture,d.ignoreDepthValues?void 0:st.depthStencilTexture),t.setRenderTarget(w))}let tt=b[Ht];tt===void 0&&(tt=new Fe,tt.layers.enable(Ht),tt.viewport=new he,b[Ht]=tt),tt.matrix.fromArray(Dt.transform.matrix),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.projectionMatrix.fromArray(Dt.projectionMatrix),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert(),tt.viewport.set(Wt.x,Wt.y,Wt.width,Wt.height),Ht===0&&(M.matrix.copy(tt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),j===!0&&M.cameras.push(tt)}let yt=s.enabledFeatures;if(yt&&yt.includes("depth-sensing")){let Ht=f.getDepthInformation(it[0]);Ht&&Ht.isValid&&Ht.texture&&_.init(t,Ht,s.renderState)}}for(let it=0;it<v.length;it++){let j=x[it],yt=v[it];j!==null&&yt!==void 0&&yt.update(j,$,l||o)}q&&q(z,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),g=null}let ft=new xh;ft.setAnimationLoop(rt),this.setAnimationLoop=function(z){q=z},this.dispose=function(){}}},hi=new Ye,qg=new Qt;function Yg(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,gh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,w,v,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),f(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&u(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,w,v):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Oe&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Oe&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let w=t.get(p),v=w.envMap,x=w.envMapRotation;v&&(m.envMap.value=v,hi.copy(x),hi.x*=-1,hi.y*=-1,hi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(hi.y*=-1,hi.z*=-1),m.envMapRotation.value.setFromMatrix4(qg.makeRotationFromEuler(hi)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,w,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*w,m.scale.value=v*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function u(m,p,w){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Oe&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let w=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Zg(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(w,v){let x=v.program;n.uniformBlockBinding(w,x)}function l(w,v){let x=s[w.id];x===void 0&&(g(w),x=h(w),s[w.id]=x,w.addEventListener("dispose",m));let S=v.program;n.updateUBOMapping(w,S);let T=t.render.frame;r[w.id]!==T&&(d(w),r[w.id]=T)}function h(w){let v=f();w.__bindingPointIndex=v;let x=i.createBuffer(),S=w.__size,T=w.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,S,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,x),x}function f(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(w){let v=s[w.id],x=w.uniforms,S=w.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let T=0,C=x.length;T<C;T++){let U=Array.isArray(x[T])?x[T]:[x[T]];for(let b=0,M=U.length;b<M;b++){let N=U[b];if(u(N,T,b,S)===!0){let Z=N.__offset,G=Array.isArray(N.value)?N.value:[N.value],J=0;for(let I=0;I<G.length;I++){let R=G[I],F=_(R);typeof R=="number"||typeof R=="boolean"?(N.__data[0]=R,i.bufferSubData(i.UNIFORM_BUFFER,Z+J,N.__data)):R.isMatrix3?(N.__data[0]=R.elements[0],N.__data[1]=R.elements[1],N.__data[2]=R.elements[2],N.__data[3]=0,N.__data[4]=R.elements[3],N.__data[5]=R.elements[4],N.__data[6]=R.elements[5],N.__data[7]=0,N.__data[8]=R.elements[6],N.__data[9]=R.elements[7],N.__data[10]=R.elements[8],N.__data[11]=0):(R.toArray(N.__data,J),J+=F.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,Z,N.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function u(w,v,x,S){let T=w.value,C=v+"_"+x;if(S[C]===void 0)return typeof T=="number"||typeof T=="boolean"?S[C]=T:S[C]=T.clone(),!0;{let U=S[C];if(typeof T=="number"||typeof T=="boolean"){if(U!==T)return S[C]=T,!0}else if(U.equals(T)===!1)return U.copy(T),!0}return!1}function g(w){let v=w.uniforms,x=0,S=16;for(let C=0,U=v.length;C<U;C++){let b=Array.isArray(v[C])?v[C]:[v[C]];for(let M=0,N=b.length;M<N;M++){let Z=b[M],G=Array.isArray(Z.value)?Z.value:[Z.value];for(let J=0,I=G.length;J<I;J++){let R=G[J],F=_(R),D=x%S,k=D%F.boundary,Y=D+k;x+=k,Y!==0&&S-Y<F.storage&&(x+=S-Y),Z.__data=new Float32Array(F.storage/Float32Array.BYTES_PER_ELEMENT),Z.__offset=x,x+=F.storage}}}let T=x%S;return T>0&&(x+=S-T),w.__size=x,w.__cache={},this}function _(w){let v={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(v.boundary=4,v.storage=4):w.isVector2?(v.boundary=8,v.storage=8):w.isVector3||w.isColor?(v.boundary=16,v.storage=12):w.isVector4?(v.boundary=16,v.storage=16):w.isMatrix3?(v.boundary=48,v.storage=48):w.isMatrix4?(v.boundary=64,v.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),v}function m(w){let v=w.target;v.removeEventListener("dispose",m);let x=o.indexOf(v.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function p(){for(let w in s)i.deleteBuffer(s[w]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}var Kr=class{constructor(t={}){let{canvas:e=Ku(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let u;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=n.getContextAttributes().alpha}else u=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,p=null,w=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=we,this.toneMapping=Yn,this.toneMappingExposure=1;let x=this,S=!1,T=0,C=0,U=null,b=-1,M=null,N=new he,Z=new he,G=null,J=new kt(0),I=0,R=e.width,F=e.height,D=1,k=null,Y=null,q=new he(0,0,R,F),rt=new he(0,0,R,F),ft=!1,z=new Xs,$=!1,it=!1,j=new Qt,yt=new Qt,Ht=new L,Dt=new he,Wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},tt=!1;function st(){return U===null?D:1}let P=n;function wt(y,O){return e.getContext(y,O)}try{let y={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${wc}`),e.addEventListener("webglcontextlost",ot,!1),e.addEventListener("webglcontextrestored",Rt,!1),e.addEventListener("webglcontextcreationerror",At,!1),P===null){let O="webgl2";if(P=wt(O,y),P===null)throw wt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let at,gt,lt,bt,ht,A,E,X,K,ct,et,Lt,nt,vt,It,ut,_t,Et,Ot,Ct,$t,Vt,se,H;function Mt(){at=new hm(P),at.init(),Vt=new Vg(P,at),gt=new sm(P,at,t,Vt),lt=new zg(P,at),gt.reverseDepthBuffer&&d&&lt.buffers.depth.setReversed(!0),bt=new fm(P),ht=new Tg,A=new kg(P,at,lt,ht,gt,Vt,bt),E=new om(x),X=new lm(x),K=new vd(P),se=new nm(P,K),ct=new um(P,K,bt,se),et=new mm(P,ct,K,bt),Ot=new pm(P,gt,A),ut=new rm(ht),Lt=new wg(x,E,X,at,gt,se,ut),nt=new Yg(x,ht),vt=new Rg,It=new Ug(at),Et=new em(x,E,X,lt,et,u,c),_t=new Og(x,et,gt),H=new Zg(P,bt,gt,lt),Ct=new im(P,at,bt),$t=new dm(P,at,bt),bt.programs=Lt.programs,x.capabilities=gt,x.extensions=at,x.properties=ht,x.renderLists=vt,x.shadowMap=_t,x.state=lt,x.info=bt}Mt();let Q=new sc(x,P);this.xr=Q,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let y=at.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){let y=at.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return D},this.setPixelRatio=function(y){y!==void 0&&(D=y,this.setSize(R,F,!1))},this.getSize=function(y){return y.set(R,F)},this.setSize=function(y,O,V=!0){if(Q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}R=y,F=O,e.width=Math.floor(y*D),e.height=Math.floor(O*D),V===!0&&(e.style.width=y+"px",e.style.height=O+"px"),this.setViewport(0,0,y,O)},this.getDrawingBufferSize=function(y){return y.set(R*D,F*D).floor()},this.setDrawingBufferSize=function(y,O,V){R=y,F=O,D=V,e.width=Math.floor(y*V),e.height=Math.floor(O*V),this.setViewport(0,0,y,O)},this.getCurrentViewport=function(y){return y.copy(N)},this.getViewport=function(y){return y.copy(q)},this.setViewport=function(y,O,V,W){y.isVector4?q.set(y.x,y.y,y.z,y.w):q.set(y,O,V,W),lt.viewport(N.copy(q).multiplyScalar(D).round())},this.getScissor=function(y){return y.copy(rt)},this.setScissor=function(y,O,V,W){y.isVector4?rt.set(y.x,y.y,y.z,y.w):rt.set(y,O,V,W),lt.scissor(Z.copy(rt).multiplyScalar(D).round())},this.getScissorTest=function(){return ft},this.setScissorTest=function(y){lt.setScissorTest(ft=y)},this.setOpaqueSort=function(y){k=y},this.setTransparentSort=function(y){Y=y},this.getClearColor=function(y){return y.copy(Et.getClearColor())},this.setClearColor=function(){Et.setClearColor.apply(Et,arguments)},this.getClearAlpha=function(){return Et.getClearAlpha()},this.setClearAlpha=function(){Et.setClearAlpha.apply(Et,arguments)},this.clear=function(y=!0,O=!0,V=!0){let W=0;if(y){let B=!1;if(U!==null){let pt=U.texture.format;B=pt===Uc||pt===Dc||pt===Lc}if(B){let pt=U.texture.type,St=pt===Pn||pt===xi||pt===Hs||pt===as||pt===Cc||pt===Ic,Bt=Et.getClearColor(),Nt=Et.getClearAlpha(),Xt=Bt.r,Yt=Bt.g,Ft=Bt.b;St?(g[0]=Xt,g[1]=Yt,g[2]=Ft,g[3]=Nt,P.clearBufferuiv(P.COLOR,0,g)):(_[0]=Xt,_[1]=Yt,_[2]=Ft,_[3]=Nt,P.clearBufferiv(P.COLOR,0,_))}else W|=P.COLOR_BUFFER_BIT}O&&(W|=P.DEPTH_BUFFER_BIT),V&&(W|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ot,!1),e.removeEventListener("webglcontextrestored",Rt,!1),e.removeEventListener("webglcontextcreationerror",At,!1),vt.dispose(),It.dispose(),ht.dispose(),E.dispose(),X.dispose(),et.dispose(),se.dispose(),H.dispose(),Lt.dispose(),Q.dispose(),Q.removeEventListener("sessionstart",ni),Q.removeEventListener("sessionend",fn),ke.stop()};function ot(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function Rt(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;let y=bt.autoReset,O=_t.enabled,V=_t.autoUpdate,W=_t.needsUpdate,B=_t.type;Mt(),bt.autoReset=y,_t.enabled=O,_t.autoUpdate=V,_t.needsUpdate=W,_t.type=B}function At(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function qt(y){let O=y.target;O.removeEventListener("dispose",qt),ue(O)}function ue(y){Me(y),ht.remove(y)}function Me(y){let O=ht.get(y).programs;O!==void 0&&(O.forEach(function(V){Lt.releaseProgram(V)}),y.isShaderMaterial&&Lt.releaseShaderCache(y))}this.renderBufferDirect=function(y,O,V,W,B,pt){O===null&&(O=Wt);let St=B.isMesh&&B.matrixWorld.determinant()<0,Bt=Nn(y,O,V,W,B);lt.setMaterial(W,St);let Nt=V.index,Xt=1;if(W.wireframe===!0){if(Nt=ct.getWireframeAttribute(V),Nt===void 0)return;Xt=2}let Yt=V.drawRange,Ft=V.attributes.position,jt=Yt.start*Xt,re=(Yt.start+Yt.count)*Xt;pt!==null&&(jt=Math.max(jt,pt.start*Xt),re=Math.min(re,(pt.start+pt.count)*Xt)),Nt!==null?(jt=Math.max(jt,0),re=Math.min(re,Nt.count)):Ft!=null&&(jt=Math.max(jt,0),re=Math.min(re,Ft.count));let Kt=re-jt;if(Kt<0||Kt===1/0)return;se.setup(B,W,Bt,V,Nt);let Ce,ne=Ct;if(Nt!==null&&(Ce=K.get(Nt),ne=$t,ne.setIndex(Ce)),B.isMesh)W.wireframe===!0?(lt.setLineWidth(W.wireframeLinewidth*st()),ne.setMode(P.LINES)):ne.setMode(P.TRIANGLES);else if(B.isLine){let zt=W.linewidth;zt===void 0&&(zt=1),lt.setLineWidth(zt*st()),B.isLineSegments?ne.setMode(P.LINES):B.isLineLoop?ne.setMode(P.LINE_LOOP):ne.setMode(P.LINE_STRIP)}else B.isPoints?ne.setMode(P.POINTS):B.isSprite&&ne.setMode(P.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)ne.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(at.get("WEBGL_multi_draw"))ne.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let zt=B._multiDrawStarts,Le=B._multiDrawCounts,te=B._multiDrawCount,be=Nt?K.get(Nt).bytesPerElement:1,Fn=ht.get(W).currentProgram.getUniforms();for(let De=0;De<te;De++)Fn.setValue(P,"_gl_DrawID",De),ne.render(zt[De]/be,Le[De])}else if(B.isInstancedMesh)ne.renderInstances(jt,Kt,B.count);else if(V.isInstancedBufferGeometry){let zt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Le=Math.min(V.instanceCount,zt);ne.renderInstances(jt,Kt,Le)}else ne.render(jt,Kt)};function ee(y,O,V){y.transparent===!0&&y.side===Ee&&y.forceSinglePass===!1?(y.side=Oe,y.needsUpdate=!0,Ii(y,O,V),y.side=Jn,y.needsUpdate=!0,Ii(y,O,V),y.side=Ee):Ii(y,O,V)}this.compile=function(y,O,V=null){V===null&&(V=y),p=It.get(V),p.init(O),v.push(p),V.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),y!==V&&y.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();let W=new Set;return y.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let pt=B.material;if(pt)if(Array.isArray(pt))for(let St=0;St<pt.length;St++){let Bt=pt[St];ee(Bt,V,B),W.add(Bt)}else ee(pt,V,B),W.add(pt)}),v.pop(),p=null,W},this.compileAsync=function(y,O,V=null){let W=this.compile(y,O,V);return new Promise(B=>{function pt(){if(W.forEach(function(St){ht.get(St).currentProgram.isReady()&&W.delete(St)}),W.size===0){B(y);return}setTimeout(pt,10)}at.get("KHR_parallel_shader_compile")!==null?pt():setTimeout(pt,10)})};let He=null;function Qe(y){He&&He(y)}function ni(){ke.stop()}function fn(){ke.start()}let ke=new xh;ke.setAnimationLoop(Qe),typeof self<"u"&&ke.setContext(self),this.setAnimationLoop=function(y){He=y,Q.setAnimationLoop(y),y===null?ke.stop():ke.start()},Q.addEventListener("sessionstart",ni),Q.addEventListener("sessionend",fn),this.render=function(y,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Q.enabled===!0&&Q.isPresenting===!0&&(Q.cameraAutoUpdate===!0&&Q.updateCamera(O),O=Q.getCamera()),y.isScene===!0&&y.onBeforeRender(x,y,O,U),p=It.get(y,v.length),p.init(O),v.push(p),yt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),z.setFromProjectionMatrix(yt),it=this.localClippingEnabled,$=ut.init(this.clippingPlanes,it),m=vt.get(y,w.length),m.init(),w.push(m),Q.enabled===!0&&Q.isPresenting===!0){let pt=x.xr.getDepthSensingMesh();pt!==null&&ii(pt,O,-1/0,x.sortObjects)}ii(y,O,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(k,Y),tt=Q.enabled===!1||Q.isPresenting===!1||Q.hasDepthSensing()===!1,tt&&Et.addToRenderList(m,y),this.info.render.frame++,$===!0&&ut.beginShadows();let V=p.state.shadowsArray;_t.render(V,y,O),$===!0&&ut.endShadows(),this.info.autoReset===!0&&this.info.reset();let W=m.opaque,B=m.transmissive;if(p.setupLights(),O.isArrayCamera){let pt=O.cameras;if(B.length>0)for(let St=0,Bt=pt.length;St<Bt;St++){let Nt=pt[St];ar(W,B,y,Nt)}tt&&Et.render(y);for(let St=0,Bt=pt.length;St<Bt;St++){let Nt=pt[St];Ci(m,y,Nt,Nt.viewport)}}else B.length>0&&ar(W,B,y,O),tt&&Et.render(y),Ci(m,y,O);U!==null&&(A.updateMultisampleRenderTarget(U),A.updateRenderTargetMipmap(U)),y.isScene===!0&&y.onAfterRender(x,y,O),se.resetDefaultState(),b=-1,M=null,v.pop(),v.length>0?(p=v[v.length-1],$===!0&&ut.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function ii(y,O,V,W){if(y.visible===!1)return;if(y.layers.test(O.layers)){if(y.isGroup)V=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(O);else if(y.isLight)p.pushLight(y),y.castShadow&&p.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||z.intersectsSprite(y)){W&&Dt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(yt);let St=et.update(y),Bt=y.material;Bt.visible&&m.push(y,St,Bt,V,Dt.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||z.intersectsObject(y))){let St=et.update(y),Bt=y.material;if(W&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Dt.copy(y.boundingSphere.center)):(St.boundingSphere===null&&St.computeBoundingSphere(),Dt.copy(St.boundingSphere.center)),Dt.applyMatrix4(y.matrixWorld).applyMatrix4(yt)),Array.isArray(Bt)){let Nt=St.groups;for(let Xt=0,Yt=Nt.length;Xt<Yt;Xt++){let Ft=Nt[Xt],jt=Bt[Ft.materialIndex];jt&&jt.visible&&m.push(y,St,jt,V,Dt.z,Ft)}}else Bt.visible&&m.push(y,St,Bt,V,Dt.z,null)}}let pt=y.children;for(let St=0,Bt=pt.length;St<Bt;St++)ii(pt[St],O,V,W)}function Ci(y,O,V,W){let B=y.opaque,pt=y.transmissive,St=y.transparent;p.setupLightsView(V),$===!0&&ut.setGlobalState(x.clippingPlanes,V),W&&lt.viewport(N.copy(W)),B.length>0&&pn(B,O,V),pt.length>0&&pn(pt,O,V),St.length>0&&pn(St,O,V),lt.buffers.depth.setTest(!0),lt.buffers.depth.setMask(!0),lt.buffers.color.setMask(!0),lt.setPolygonOffset(!1)}function ar(y,O,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new en(1,1,{generateMipmaps:!0,type:at.has("EXT_color_buffer_half_float")||at.has("EXT_color_buffer_float")?ti:Pn,minFilter:mi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ie.workingColorSpace}));let pt=p.state.transmissionRenderTarget[W.id],St=W.viewport||N;pt.setSize(St.z,St.w);let Bt=x.getRenderTarget();x.setRenderTarget(pt),x.getClearColor(J),I=x.getClearAlpha(),I<1&&x.setClearColor(16777215,.5),x.clear(),tt&&Et.render(V);let Nt=x.toneMapping;x.toneMapping=Yn;let Xt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),$===!0&&ut.setGlobalState(x.clippingPlanes,W),pn(y,V,W),A.updateMultisampleRenderTarget(pt),A.updateRenderTargetMipmap(pt),at.has("WEBGL_multisampled_render_to_texture")===!1){let Yt=!1;for(let Ft=0,jt=O.length;Ft<jt;Ft++){let re=O[Ft],Kt=re.object,Ce=re.geometry,ne=re.material,zt=re.group;if(ne.side===Ee&&Kt.layers.test(W.layers)){let Le=ne.side;ne.side=Oe,ne.needsUpdate=!0,si(Kt,V,W,Ce,ne,zt),ne.side=Le,ne.needsUpdate=!0,Yt=!0}}Yt===!0&&(A.updateMultisampleRenderTarget(pt),A.updateRenderTargetMipmap(pt))}x.setRenderTarget(Bt),x.setClearColor(J,I),Xt!==void 0&&(W.viewport=Xt),x.toneMapping=Nt}function pn(y,O,V){let W=O.isScene===!0?O.overrideMaterial:null;for(let B=0,pt=y.length;B<pt;B++){let St=y[B],Bt=St.object,Nt=St.geometry,Xt=W===null?St.material:W,Yt=St.group;Bt.layers.test(V.layers)&&si(Bt,O,V,Nt,Xt,Yt)}}function si(y,O,V,W,B,pt){y.onBeforeRender(x,O,V,W,B,pt),y.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),B.onBeforeRender(x,O,V,W,y,pt),B.transparent===!0&&B.side===Ee&&B.forceSinglePass===!1?(B.side=Oe,B.needsUpdate=!0,x.renderBufferDirect(V,O,W,B,y,pt),B.side=Jn,B.needsUpdate=!0,x.renderBufferDirect(V,O,W,B,y,pt),B.side=Ee):x.renderBufferDirect(V,O,W,B,y,pt),y.onAfterRender(x,O,V,W,B,pt)}function Ii(y,O,V){O.isScene!==!0&&(O=Wt);let W=ht.get(y),B=p.state.lights,pt=p.state.shadowsArray,St=B.state.version,Bt=Lt.getParameters(y,B.state,pt,O,V),Nt=Lt.getProgramCacheKey(Bt),Xt=W.programs;W.environment=y.isMeshStandardMaterial?O.environment:null,W.fog=O.fog,W.envMap=(y.isMeshStandardMaterial?X:E).get(y.envMap||W.environment),W.envMapRotation=W.environment!==null&&y.envMap===null?O.environmentRotation:y.envMapRotation,Xt===void 0&&(y.addEventListener("dispose",qt),Xt=new Map,W.programs=Xt);let Yt=Xt.get(Nt);if(Yt!==void 0){if(W.currentProgram===Yt&&W.lightsStateVersion===St)return Li(y,Bt),Yt}else Bt.uniforms=Lt.getUniforms(y),y.onBeforeCompile(Bt,x),Yt=Lt.acquireProgram(Bt,Nt),Xt.set(Nt,Yt),W.uniforms=Bt.uniforms;let Ft=W.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Ft.clippingPlanes=ut.uniform),Li(y,Bt),W.needsLights=Ut(y),W.lightsStateVersion=St,W.needsLights&&(Ft.ambientLightColor.value=B.state.ambient,Ft.lightProbe.value=B.state.probe,Ft.directionalLights.value=B.state.directional,Ft.directionalLightShadows.value=B.state.directionalShadow,Ft.spotLights.value=B.state.spot,Ft.spotLightShadows.value=B.state.spotShadow,Ft.rectAreaLights.value=B.state.rectArea,Ft.ltc_1.value=B.state.rectAreaLTC1,Ft.ltc_2.value=B.state.rectAreaLTC2,Ft.pointLights.value=B.state.point,Ft.pointLightShadows.value=B.state.pointShadow,Ft.hemisphereLights.value=B.state.hemi,Ft.directionalShadowMap.value=B.state.directionalShadowMap,Ft.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Ft.spotShadowMap.value=B.state.spotShadowMap,Ft.spotLightMatrix.value=B.state.spotLightMatrix,Ft.spotLightMap.value=B.state.spotLightMap,Ft.pointShadowMap.value=B.state.pointShadowMap,Ft.pointShadowMatrix.value=B.state.pointShadowMatrix),W.currentProgram=Yt,W.uniformsList=null,Yt}function Pi(y){if(y.uniformsList===null){let O=y.currentProgram.getUniforms();y.uniformsList=is.seqWithValue(O.seq,y.uniforms)}return y.uniformsList}function Li(y,O){let V=ht.get(y);V.outputColorSpace=O.outputColorSpace,V.batching=O.batching,V.batchingColor=O.batchingColor,V.instancing=O.instancing,V.instancingColor=O.instancingColor,V.instancingMorph=O.instancingMorph,V.skinning=O.skinning,V.morphTargets=O.morphTargets,V.morphNormals=O.morphNormals,V.morphColors=O.morphColors,V.morphTargetsCount=O.morphTargetsCount,V.numClippingPlanes=O.numClippingPlanes,V.numIntersection=O.numClipIntersection,V.vertexAlphas=O.vertexAlphas,V.vertexTangents=O.vertexTangents,V.toneMapping=O.toneMapping}function Nn(y,O,V,W,B){O.isScene!==!0&&(O=Wt),A.resetTextureUnits();let pt=O.fog,St=W.isMeshStandardMaterial?O.environment:null,Bt=U===null?x.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:ys,Nt=(W.isMeshStandardMaterial?X:E).get(W.envMap||St),Xt=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Yt=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ft=!!V.morphAttributes.position,jt=!!V.morphAttributes.normal,re=!!V.morphAttributes.color,Kt=Yn;W.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(Kt=x.toneMapping);let Ce=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ne=Ce!==void 0?Ce.length:0,zt=ht.get(W),Le=p.state.lights;if($===!0&&(it===!0||y!==M)){let ce=y===M&&W.id===b;ut.setState(W,y,ce)}let te=!1;W.version===zt.__version?(zt.needsLights&&zt.lightsStateVersion!==Le.state.version||zt.outputColorSpace!==Bt||B.isBatchedMesh&&zt.batching===!1||!B.isBatchedMesh&&zt.batching===!0||B.isBatchedMesh&&zt.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&zt.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&zt.instancing===!1||!B.isInstancedMesh&&zt.instancing===!0||B.isSkinnedMesh&&zt.skinning===!1||!B.isSkinnedMesh&&zt.skinning===!0||B.isInstancedMesh&&zt.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&zt.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&zt.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&zt.instancingMorph===!1&&B.morphTexture!==null||zt.envMap!==Nt||W.fog===!0&&zt.fog!==pt||zt.numClippingPlanes!==void 0&&(zt.numClippingPlanes!==ut.numPlanes||zt.numIntersection!==ut.numIntersection)||zt.vertexAlphas!==Xt||zt.vertexTangents!==Yt||zt.morphTargets!==Ft||zt.morphNormals!==jt||zt.morphColors!==re||zt.toneMapping!==Kt||zt.morphTargetsCount!==ne)&&(te=!0):(te=!0,zt.__version=W.version);let be=zt.currentProgram;te===!0&&(be=Ii(W,O,B));let Fn=!1,De=!1,mn=!1,ae=be.getUniforms(),je=zt.uniforms;if(lt.useProgram(be.program)&&(Fn=!0,De=!0,mn=!0),W.id!==b&&(b=W.id,De=!0),Fn||M!==y){lt.buffers.depth.getReversed()?(j.copy(y.projectionMatrix),ju(j),td(j),ae.setValue(P,"projectionMatrix",j)):ae.setValue(P,"projectionMatrix",y.projectionMatrix),ae.setValue(P,"viewMatrix",y.matrixWorldInverse);let Ve=ae.map.cameraPosition;Ve!==void 0&&Ve.setValue(P,Ht.setFromMatrixPosition(y.matrixWorld)),gt.logarithmicDepthBuffer&&ae.setValue(P,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ae.setValue(P,"isOrthographic",y.isOrthographicCamera===!0),M!==y&&(M=y,De=!0,mn=!0)}if(B.isSkinnedMesh){ae.setOptional(P,B,"bindMatrix"),ae.setOptional(P,B,"bindMatrixInverse");let ce=B.skeleton;ce&&(ce.boneTexture===null&&ce.computeBoneTexture(),ae.setValue(P,"boneTexture",ce.boneTexture,A))}B.isBatchedMesh&&(ae.setOptional(P,B,"batchingTexture"),ae.setValue(P,"batchingTexture",B._matricesTexture,A),ae.setOptional(P,B,"batchingIdTexture"),ae.setValue(P,"batchingIdTexture",B._indirectTexture,A),ae.setOptional(P,B,"batchingColorTexture"),B._colorsTexture!==null&&ae.setValue(P,"batchingColorTexture",B._colorsTexture,A));let On=V.morphAttributes;if((On.position!==void 0||On.normal!==void 0||On.color!==void 0)&&Ot.update(B,V,be),(De||zt.receiveShadow!==B.receiveShadow)&&(zt.receiveShadow=B.receiveShadow,ae.setValue(P,"receiveShadow",B.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(je.envMap.value=Nt,je.flipEnvMap.value=Nt.isCubeTexture&&Nt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&O.environment!==null&&(je.envMapIntensity.value=O.environmentIntensity),De&&(ae.setValue(P,"toneMappingExposure",x.toneMappingExposure),zt.needsLights&&xt(je,mn),pt&&W.fog===!0&&nt.refreshFogUniforms(je,pt),nt.refreshMaterialUniforms(je,W,D,F,p.state.transmissionRenderTarget[y.id]),is.upload(P,Pi(zt),je,A)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(is.upload(P,Pi(zt),je,A),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ae.setValue(P,"center",B.center),ae.setValue(P,"modelViewMatrix",B.modelViewMatrix),ae.setValue(P,"normalMatrix",B.normalMatrix),ae.setValue(P,"modelMatrix",B.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){let ce=W.uniformsGroups;for(let Ve=0,qe=ce.length;Ve<qe;Ve++){let on=ce[Ve];H.update(on,be),H.bind(on,be)}}return be}function xt(y,O){y.ambientLightColor.needsUpdate=O,y.lightProbe.needsUpdate=O,y.directionalLights.needsUpdate=O,y.directionalLightShadows.needsUpdate=O,y.pointLights.needsUpdate=O,y.pointLightShadows.needsUpdate=O,y.spotLights.needsUpdate=O,y.spotLightShadows.needsUpdate=O,y.rectAreaLights.needsUpdate=O,y.hemisphereLights.needsUpdate=O}function Ut(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(y,O,V){ht.get(y.texture).__webglTexture=O,ht.get(y.depthTexture).__webglTexture=V;let W=ht.get(y);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=V===void 0,W.__autoAllocateDepthBuffer||at.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,O){let V=ht.get(y);V.__webglFramebuffer=O,V.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(y,O=0,V=0){U=y,T=O,C=V;let W=!0,B=null,pt=!1,St=!1;if(y){let Nt=ht.get(y);if(Nt.__useDefaultFramebuffer!==void 0)lt.bindFramebuffer(P.FRAMEBUFFER,null),W=!1;else if(Nt.__webglFramebuffer===void 0)A.setupRenderTarget(y);else if(Nt.__hasExternalTextures)A.rebindTextures(y,ht.get(y.texture).__webglTexture,ht.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){let Ft=y.depthTexture;if(Nt.__boundDepthTexture!==Ft){if(Ft!==null&&ht.has(Ft)&&(y.width!==Ft.image.width||y.height!==Ft.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(y)}}let Xt=y.texture;(Xt.isData3DTexture||Xt.isDataArrayTexture||Xt.isCompressedArrayTexture)&&(St=!0);let Yt=ht.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Yt[O])?B=Yt[O][V]:B=Yt[O],pt=!0):y.samples>0&&A.useMultisampledRTT(y)===!1?B=ht.get(y).__webglMultisampledFramebuffer:Array.isArray(Yt)?B=Yt[V]:B=Yt,N.copy(y.viewport),Z.copy(y.scissor),G=y.scissorTest}else N.copy(q).multiplyScalar(D).floor(),Z.copy(rt).multiplyScalar(D).floor(),G=ft;if(lt.bindFramebuffer(P.FRAMEBUFFER,B)&&W&&lt.drawBuffers(y,B),lt.viewport(N),lt.scissor(Z),lt.setScissorTest(G),pt){let Nt=ht.get(y.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+O,Nt.__webglTexture,V)}else if(St){let Nt=ht.get(y.texture),Xt=O||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Nt.__webglTexture,V||0,Xt)}b=-1},this.readRenderTargetPixels=function(y,O,V,W,B,pt,St){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Bt=ht.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&St!==void 0&&(Bt=Bt[St]),Bt){lt.bindFramebuffer(P.FRAMEBUFFER,Bt);try{let Nt=y.texture,Xt=Nt.format,Yt=Nt.type;if(!gt.textureFormatReadable(Xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!gt.textureTypeReadable(Yt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=y.width-W&&V>=0&&V<=y.height-B&&P.readPixels(O,V,W,B,Vt.convert(Xt),Vt.convert(Yt),pt)}finally{let Nt=U!==null?ht.get(U).__webglFramebuffer:null;lt.bindFramebuffer(P.FRAMEBUFFER,Nt)}}},this.readRenderTargetPixelsAsync=async function(y,O,V,W,B,pt,St){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Bt=ht.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&St!==void 0&&(Bt=Bt[St]),Bt){let Nt=y.texture,Xt=Nt.format,Yt=Nt.type;if(!gt.textureFormatReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!gt.textureTypeReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=y.width-W&&V>=0&&V<=y.height-B){lt.bindFramebuffer(P.FRAMEBUFFER,Bt);let Ft=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Ft),P.bufferData(P.PIXEL_PACK_BUFFER,pt.byteLength,P.STREAM_READ),P.readPixels(O,V,W,B,Vt.convert(Xt),Vt.convert(Yt),0);let jt=U!==null?ht.get(U).__webglFramebuffer:null;lt.bindFramebuffer(P.FRAMEBUFFER,jt);let re=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Qu(P,re,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Ft),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,pt),P.deleteBuffer(Ft),P.deleteSync(re),pt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(y,O=null,V=0){y.isTexture!==!0&&(Ds("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,y=arguments[1]);let W=Math.pow(2,-V),B=Math.floor(y.image.width*W),pt=Math.floor(y.image.height*W),St=O!==null?O.x:0,Bt=O!==null?O.y:0;A.setTexture2D(y,0),P.copyTexSubImage2D(P.TEXTURE_2D,V,0,0,St,Bt,B,pt),lt.unbindTexture()},this.copyTextureToTexture=function(y,O,V=null,W=null,B=0){y.isTexture!==!0&&(Ds("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,y=arguments[1],O=arguments[2],B=arguments[3]||0,V=null);let pt,St,Bt,Nt,Xt,Yt,Ft,jt,re,Kt=y.isCompressedTexture?y.mipmaps[B]:y.image;V!==null?(pt=V.max.x-V.min.x,St=V.max.y-V.min.y,Bt=V.isBox3?V.max.z-V.min.z:1,Nt=V.min.x,Xt=V.min.y,Yt=V.isBox3?V.min.z:0):(pt=Kt.width,St=Kt.height,Bt=Kt.depth||1,Nt=0,Xt=0,Yt=0),W!==null?(Ft=W.x,jt=W.y,re=W.z):(Ft=0,jt=0,re=0);let Ce=Vt.convert(O.format),ne=Vt.convert(O.type),zt;O.isData3DTexture?(A.setTexture3D(O,0),zt=P.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(A.setTexture2DArray(O,0),zt=P.TEXTURE_2D_ARRAY):(A.setTexture2D(O,0),zt=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,O.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,O.unpackAlignment);let Le=P.getParameter(P.UNPACK_ROW_LENGTH),te=P.getParameter(P.UNPACK_IMAGE_HEIGHT),be=P.getParameter(P.UNPACK_SKIP_PIXELS),Fn=P.getParameter(P.UNPACK_SKIP_ROWS),De=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,Kt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Kt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Nt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Xt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Yt);let mn=y.isDataArrayTexture||y.isData3DTexture,ae=O.isDataArrayTexture||O.isData3DTexture;if(y.isRenderTargetTexture||y.isDepthTexture){let je=ht.get(y),On=ht.get(O),ce=ht.get(je.__renderTarget),Ve=ht.get(On.__renderTarget);lt.bindFramebuffer(P.READ_FRAMEBUFFER,ce.__webglFramebuffer),lt.bindFramebuffer(P.DRAW_FRAMEBUFFER,Ve.__webglFramebuffer);for(let qe=0;qe<Bt;qe++)mn&&P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,ht.get(y).__webglTexture,B,Yt+qe),y.isDepthTexture?(ae&&P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,ht.get(O).__webglTexture,B,re+qe),P.blitFramebuffer(Nt,Xt,pt,St,Ft,jt,pt,St,P.DEPTH_BUFFER_BIT,P.NEAREST)):ae?P.copyTexSubImage3D(zt,B,Ft,jt,re+qe,Nt,Xt,pt,St):P.copyTexSubImage2D(zt,B,Ft,jt,re+qe,Nt,Xt,pt,St);lt.bindFramebuffer(P.READ_FRAMEBUFFER,null),lt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else ae?y.isDataTexture||y.isData3DTexture?P.texSubImage3D(zt,B,Ft,jt,re,pt,St,Bt,Ce,ne,Kt.data):O.isCompressedArrayTexture?P.compressedTexSubImage3D(zt,B,Ft,jt,re,pt,St,Bt,Ce,Kt.data):P.texSubImage3D(zt,B,Ft,jt,re,pt,St,Bt,Ce,ne,Kt):y.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,B,Ft,jt,pt,St,Ce,ne,Kt.data):y.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,B,Ft,jt,Kt.width,Kt.height,Ce,Kt.data):P.texSubImage2D(P.TEXTURE_2D,B,Ft,jt,pt,St,Ce,ne,Kt);P.pixelStorei(P.UNPACK_ROW_LENGTH,Le),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,te),P.pixelStorei(P.UNPACK_SKIP_PIXELS,be),P.pixelStorei(P.UNPACK_SKIP_ROWS,Fn),P.pixelStorei(P.UNPACK_SKIP_IMAGES,De),B===0&&O.generateMipmaps&&P.generateMipmap(zt),lt.unbindTexture()},this.copyTextureToTexture3D=function(y,O,V=null,W=null,B=0){return y.isTexture!==!0&&(Ds("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,W=arguments[1]||null,y=arguments[2],O=arguments[3],B=arguments[4]||0),Ds('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(y,O,V,W,B)},this.initRenderTarget=function(y){ht.get(y).__webglFramebuffer===void 0&&A.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?A.setTextureCube(y,0):y.isData3DTexture?A.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?A.setTexture2DArray(y,0):A.setTexture2D(y,0),lt.unbindTexture()},this.resetState=function(){T=0,C=0,U=null,lt.reset(),se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=ie._getDrawingBufferColorSpace(t),e.unpackColorSpace=ie._getUnpackColorSpace()}};var Qr=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new kt(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},fs=class extends Be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ye,this.environmentIntensity=1,this.environmentRotation=new Ye,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},jr=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ga,this.updateRanges=[],this.version=0,this.uuid=vn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Ge=new L,qs=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ge.fromBufferAttribute(this,e),Ge.applyMatrix4(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ge.fromBufferAttribute(this,e),Ge.applyNormalMatrix(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ge.fromBufferAttribute(this,e),Ge.transformDirection(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=hn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=oe(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=hn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=hn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=hn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=hn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array),s=oe(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array),s=oe(s,this.array),r=oe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Pe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Ys=class extends Kn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new kt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Yi,As=new L,Zi=new L,Ji=new L,$i=new dt,Rs=new dt,Sh=new Qt,Cr=new L,Cs=new L,Ir=new L,Vl=new dt,Qo=new dt,Gl=new dt,to=class extends Be{constructor(t=new Ys){if(super(),this.isSprite=!0,this.type="Sprite",Yi===void 0){Yi=new fe;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new jr(e,5);Yi.setIndex([0,1,2,0,2,3]),Yi.setAttribute("position",new qs(n,3,0,!1)),Yi.setAttribute("uv",new qs(n,2,3,!1))}this.geometry=Yi,this.material=t,this.center=new dt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Zi.setFromMatrixScale(this.matrixWorld),Sh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ji.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Zi.multiplyScalar(-Ji.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;Pr(Cr.set(-.5,-.5,0),Ji,o,Zi,s,r),Pr(Cs.set(.5,-.5,0),Ji,o,Zi,s,r),Pr(Ir.set(.5,.5,0),Ji,o,Zi,s,r),Vl.set(0,0),Qo.set(1,0),Gl.set(1,1);let a=t.ray.intersectTriangle(Cr,Cs,Ir,!1,As);if(a===null&&(Pr(Cs.set(-.5,.5,0),Ji,o,Zi,s,r),Qo.set(0,1),a=t.ray.intersectTriangle(Cr,Ir,Cs,!1,As),a===null))return;let c=t.ray.origin.distanceTo(As);c<t.near||c>t.far||e.push({distance:c,point:As.clone(),uv:Xn.getInterpolation(As,Cr,Cs,Ir,Vl,Qo,Gl,new dt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Pr(i,t,e,n,s,r){$i.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Rs.x=r*$i.x-s*$i.y,Rs.y=s*$i.x+r*$i.y):Rs.copy($i),i.copy(t),i.x+=Rs.x,i.y+=Rs.y,i.applyMatrix4(Sh)}var rc=class extends Xe{constructor(t=null,e=1,n=1,s,r,o,a,c,l=$e,h=$e,f,d){super(null,o,a,c,l,h,s,r,f,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Zs=class extends Pe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Ki=new Qt,Wl=new Qt,Lr=[],Xl=new Ln,Jg=new Qt,Is=new mt,Ps=new _i,yn=class extends mt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Zs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Jg)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ln),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ki),Xl.copy(t.boundingBox).applyMatrix4(Ki),this.boundingBox.union(Xl)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new _i),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ki),Ps.copy(t.boundingSphere).applyMatrix4(Ki),this.boundingSphere.union(Ps)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Is.geometry=this.geometry,Is.material=this.material,Is.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ps.copy(this.boundingSphere),Ps.applyMatrix4(n),t.ray.intersectsSphere(Ps)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ki),Wl.multiplyMatrices(n,Ki),Is.matrixWorld=Wl,Is.raycast(t,Lr);for(let o=0,a=Lr.length;o<a;o++){let c=Lr[o];c.instanceId=r,c.object=this,e.push(c)}Lr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Zs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new rc(new Float32Array(s*this.count),s,this.count,Pc,_n));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Qn=class extends Xe{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},sn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],d=n[s+1]-h,u=(o-h)/d;return(s+u)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new dt:new L);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new L,s=[],r=[],o=[],a=new L,c=new Qt;for(let u=0;u<=t;u++){let g=u/t;s[u]=this.getTangentAt(g,new L)}r[0]=new L,o[0]=new L;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),f=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let u=1;u<=t;u++){if(r[u]=r[u-1].clone(),o[u]=o[u-1].clone(),a.crossVectors(s[u-1],s[u]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Te(s[u-1].dot(s[u]),-1,1));r[u].applyMatrix4(c.makeRotationAxis(a,g))}o[u].crossVectors(s[u],r[u])}if(e===!0){let u=Math.acos(Te(r[0].dot(r[t]),-1,1));u/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(u=-u);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],u*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Js=class extends sn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new dt){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=c-this.aX,u=l-this.aY;c=d*h-u*f+this.aX,l=d*f+u*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},oc=class extends Js{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Oc(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,f){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,u=(a-o)/h-(c-o)/(h+f)+(c-a)/f;d*=h,u*=h,s(o,a,d,u)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var Dr=new L,jo=new Oc,ta=new Oc,ea=new Oc,ps=class extends sn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Dr.subVectors(s[0],s[1]).add(s[0]),l=Dr);let f=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Dr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Dr),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(f),u),_=Math.pow(f.distanceToSquared(d),u),m=Math.pow(d.distanceToSquared(h),u);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),jo.initNonuniformCatmullRom(l.x,f.x,d.x,h.x,g,_,m),ta.initNonuniformCatmullRom(l.y,f.y,d.y,h.y,g,_,m),ea.initNonuniformCatmullRom(l.z,f.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(jo.initCatmullRom(l.x,f.x,d.x,h.x,this.tension),ta.initCatmullRom(l.y,f.y,d.y,h.y,this.tension),ea.initCatmullRom(l.z,f.z,d.z,h.z,this.tension));return n.set(jo.calc(c),ta.calc(c),ea.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function ql(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function $g(i,t){let e=1-i;return e*e*t}function Kg(i,t){return 2*(1-i)*i*t}function Qg(i,t){return i*i*t}function Bs(i,t,e,n){return $g(i,t)+Kg(i,e)+Qg(i,n)}function jg(i,t){let e=1-i;return e*e*e*t}function t0(i,t){let e=1-i;return 3*e*e*i*t}function e0(i,t){return 3*(1-i)*i*i*t}function n0(i,t){return i*i*i*t}function zs(i,t,e,n,s){return jg(i,t)+t0(i,e)+e0(i,n)+n0(i,s)}var eo=class extends sn{constructor(t=new dt,e=new dt,n=new dt,s=new dt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new dt){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(zs(t,s.x,r.x,o.x,a.x),zs(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ac=class extends sn{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(zs(t,s.x,r.x,o.x,a.x),zs(t,s.y,r.y,o.y,a.y),zs(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},no=class extends sn{constructor(t=new dt,e=new dt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new dt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new dt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},cc=class extends sn{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},io=class extends sn{constructor(t=new dt,e=new dt,n=new dt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new dt){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Bs(t,s.x,r.x,o.x),Bs(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},so=class extends sn{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Bs(t,s.x,r.x,o.x),Bs(t,s.y,r.y,o.y),Bs(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ms=class extends sn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new dt){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],f=s[o>s.length-3?s.length-1:o+2];return n.set(ql(a,c.x,l.x,h.x,f.x),ql(a,c.y,l.y,h.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new dt().fromArray(s))}return this}},ro=Object.freeze({__proto__:null,ArcCurve:oc,CatmullRomCurve3:ps,CubicBezierCurve:eo,CubicBezierCurve3:ac,EllipseCurve:Js,LineCurve:no,LineCurve3:cc,QuadraticBezierCurve:io,QuadraticBezierCurve3:so,SplineCurve:ms}),lc=class extends sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ro[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new ro[s.type]().fromJSON(s))}return this}},vi=class extends lc{constructor(t){super(),this.type="Path",this.currentPoint=new dt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new no(this.currentPoint.clone(),new dt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new io(this.currentPoint.clone(),new dt(t,e),new dt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new eo(this.currentPoint.clone(),new dt(t,e),new dt(n,s),new dt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new ms(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){let l=new Js(t,e,n,s,r,o,a,c);if(this.curves.length>0){let f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},$s=class i extends fe{constructor(t=[new dt(0,-.5),new dt(.5,0),new dt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Te(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],h=1/e,f=new L,d=new dt,u=new L,g=new L,_=new L,m=0,p=0;for(let w=0;w<=t.length-1;w++)switch(w){case 0:m=t[w+1].x-t[w].x,p=t[w+1].y-t[w].y,u.x=p*1,u.y=-m,u.z=p*0,_.copy(u),u.normalize(),c.push(u.x,u.y,u.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:m=t[w+1].x-t[w].x,p=t[w+1].y-t[w].y,u.x=p*1,u.y=-m,u.z=p*0,g.copy(u),u.x+=_.x,u.y+=_.y,u.z+=_.z,u.normalize(),c.push(u.x,u.y,u.z),_.copy(g)}for(let w=0;w<=e;w++){let v=n+w*h*s,x=Math.sin(v),S=Math.cos(v);for(let T=0;T<=t.length-1;T++){f.x=t[T].x*x,f.y=t[T].y,f.z=t[T].x*S,o.push(f.x,f.y,f.z),d.x=w/e,d.y=T/(t.length-1),a.push(d.x,d.y);let C=c[3*T+0]*x,U=c[3*T+1],b=c[3*T+0]*S;l.push(C,U,b)}}for(let w=0;w<e;w++)for(let v=0;v<t.length-1;v++){let x=v+w*t.length,S=x,T=x+t.length,C=x+t.length+1,U=x+1;r.push(S,T,U),r.push(C,U,T)}this.setIndex(r),this.setAttribute("position",new Gt(o,3)),this.setAttribute("uv",new Gt(a,2)),this.setAttribute("normal",new Gt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}},gs=class i extends $s{constructor(t=1,e=1,n=4,s=8){let r=new vi;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new i(t.radius,t.length,t.capSegments,t.radialSegments)}},jn=class i extends fe{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],c=[],l=new L,h=new dt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let f=0,d=3;f<=e;f++,d+=3){let u=n+f/e*s;l.x=t*Math.cos(u),l.y=t*Math.sin(u),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,c.push(h.x,h.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new Gt(o,3)),this.setAttribute("normal",new Gt(a,3)),this.setAttribute("uv",new Gt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},me=class i extends fe{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],f=[],d=[],u=[],g=0,_=[],m=n/2,p=0;w(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Gt(f,3)),this.setAttribute("normal",new Gt(d,3)),this.setAttribute("uv",new Gt(u,2));function w(){let x=new L,S=new L,T=0,C=(e-t)/n;for(let U=0;U<=r;U++){let b=[],M=U/r,N=M*(e-t)+t;for(let Z=0;Z<=s;Z++){let G=Z/s,J=G*c+a,I=Math.sin(J),R=Math.cos(J);S.x=N*I,S.y=-M*n+m,S.z=N*R,f.push(S.x,S.y,S.z),x.set(I,C,R).normalize(),d.push(x.x,x.y,x.z),u.push(G,1-M),b.push(g++)}_.push(b)}for(let U=0;U<s;U++)for(let b=0;b<r;b++){let M=_[b][U],N=_[b+1][U],Z=_[b+1][U+1],G=_[b][U+1];(t>0||b!==0)&&(h.push(M,N,G),T+=3),(e>0||b!==r-1)&&(h.push(N,Z,G),T+=3)}l.addGroup(p,T,0),p+=T}function v(x){let S=g,T=new dt,C=new L,U=0,b=x===!0?t:e,M=x===!0?1:-1;for(let Z=1;Z<=s;Z++)f.push(0,m*M,0),d.push(0,M,0),u.push(.5,.5),g++;let N=g;for(let Z=0;Z<=s;Z++){let J=Z/s*c+a,I=Math.cos(J),R=Math.sin(J);C.x=b*R,C.y=m*M,C.z=b*I,f.push(C.x,C.y,C.z),d.push(0,M,0),T.x=I*.5+.5,T.y=R*.5*M+.5,u.push(T.x,T.y),g++}for(let Z=0;Z<s;Z++){let G=S+Z,J=N+Z;x===!0?h.push(J,J+1,G):h.push(J+1,J,G),U+=3}l.addGroup(p,U,x===!0?1:2),p+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},oo=class i extends me{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},hc=class i extends fe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new Gt(r,3)),this.setAttribute("normal",new Gt(r.slice(),3)),this.setAttribute("uv",new Gt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(w){let v=new L,x=new L,S=new L;for(let T=0;T<e.length;T+=3)u(e[T+0],v),u(e[T+1],x),u(e[T+2],S),c(v,x,S,w)}function c(w,v,x,S){let T=S+1,C=[];for(let U=0;U<=T;U++){C[U]=[];let b=w.clone().lerp(x,U/T),M=v.clone().lerp(x,U/T),N=T-U;for(let Z=0;Z<=N;Z++)Z===0&&U===T?C[U][Z]=b:C[U][Z]=b.clone().lerp(M,Z/N)}for(let U=0;U<T;U++)for(let b=0;b<2*(T-U)-1;b++){let M=Math.floor(b/2);b%2===0?(d(C[U][M+1]),d(C[U+1][M]),d(C[U][M])):(d(C[U][M+1]),d(C[U+1][M+1]),d(C[U+1][M]))}}function l(w){let v=new L;for(let x=0;x<r.length;x+=3)v.x=r[x+0],v.y=r[x+1],v.z=r[x+2],v.normalize().multiplyScalar(w),r[x+0]=v.x,r[x+1]=v.y,r[x+2]=v.z}function h(){let w=new L;for(let v=0;v<r.length;v+=3){w.x=r[v+0],w.y=r[v+1],w.z=r[v+2];let x=m(w)/2/Math.PI+.5,S=p(w)/Math.PI+.5;o.push(x,1-S)}g(),f()}function f(){for(let w=0;w<o.length;w+=6){let v=o[w+0],x=o[w+2],S=o[w+4],T=Math.max(v,x,S),C=Math.min(v,x,S);T>.9&&C<.1&&(v<.2&&(o[w+0]+=1),x<.2&&(o[w+2]+=1),S<.2&&(o[w+4]+=1))}}function d(w){r.push(w.x,w.y,w.z)}function u(w,v){let x=w*3;v.x=t[x+0],v.y=t[x+1],v.z=t[x+2]}function g(){let w=new L,v=new L,x=new L,S=new L,T=new dt,C=new dt,U=new dt;for(let b=0,M=0;b<r.length;b+=9,M+=6){w.set(r[b+0],r[b+1],r[b+2]),v.set(r[b+3],r[b+4],r[b+5]),x.set(r[b+6],r[b+7],r[b+8]),T.set(o[M+0],o[M+1]),C.set(o[M+2],o[M+3]),U.set(o[M+4],o[M+5]),S.copy(w).add(v).add(x).divideScalar(3);let N=m(S);_(T,M+0,w,N),_(C,M+2,v,N),_(U,M+4,x,N)}}function _(w,v,x,S){S<0&&w.x===1&&(o[v]=w.x-1),x.x===0&&x.z===0&&(o[v]=S/2/Math.PI+.5)}function m(w){return Math.atan2(w.z,-w.x)}function p(w){return Math.atan2(-w.y,Math.sqrt(w.x*w.x+w.z*w.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.details)}};var Dn=class extends vi{constructor(t){super(t),this.uuid=vn(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new vi().fromJSON(s))}return this}},i0={triangulate:function(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=Eh(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,f,d,u;if(n&&(r=c0(i,t,r,e)),i.length>80*e){a=l=i[0],c=h=i[1];for(let g=e;g<s;g+=e)f=i[g],d=i[g+1],f<a&&(a=f),d<c&&(c=d),f>l&&(l=f),d>h&&(h=d);u=Math.max(l-a,h-c),u=u!==0?32767/u:0}return Ks(r,o,e,a,c,u,0),o}};function Eh(i,t,e,n,s){let r,o;if(s===v0(i,t,e,n)>0)for(r=t;r<e;r+=n)o=Yl(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=Yl(r,i[r],i[r+1],o);return o&&vo(o,o.next)&&(js(o),o=o.next),o}function yi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(vo(e,e.next)||_e(e.prev,e,e.next)===0)){if(js(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ks(i,t,e,n,s,r,o){if(!i)return;!o&&r&&f0(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?r0(i,n,s,r):s0(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),js(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=o0(yi(i),t,e),Ks(i,t,e,n,s,r,2)):o===2&&a0(i,t,e,n,s,r):Ks(yi(i),t,e,n,s,r,1);break}}}function s0(i){let t=i.prev,e=i,n=i.next;if(_e(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,f=a<c?a<l?a:l:c<l?c:l,d=s>r?s>o?s:o:r>o?r:o,u=a>c?a>l?a:l:c>l?c:l,g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=f&&g.y<=u&&ji(s,a,r,c,o,l,g.x,g.y)&&_e(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function r0(i,t,e,n){let s=i.prev,r=i,o=i.next;if(_e(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,f=r.y,d=o.y,u=a<c?a<l?a:l:c<l?c:l,g=h<f?h<d?h:d:f<d?f:d,_=a>c?a>l?a:l:c>l?c:l,m=h>f?h>d?h:d:f>d?f:d,p=uc(u,g,t,e,n),w=uc(_,m,t,e,n),v=i.prevZ,x=i.nextZ;for(;v&&v.z>=p&&x&&x.z<=w;){if(v.x>=u&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&ji(a,h,c,f,l,d,v.x,v.y)&&_e(v.prev,v,v.next)>=0||(v=v.prevZ,x.x>=u&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&ji(a,h,c,f,l,d,x.x,x.y)&&_e(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;v&&v.z>=p;){if(v.x>=u&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&ji(a,h,c,f,l,d,v.x,v.y)&&_e(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;x&&x.z<=w;){if(x.x>=u&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&ji(a,h,c,f,l,d,x.x,x.y)&&_e(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function o0(i,t,e){let n=i;do{let s=n.prev,r=n.next.next;!vo(s,r)&&bh(s,n,n.next,r)&&Qs(s,r)&&Qs(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),js(n),js(n.next),n=i=r),n=n.next}while(n!==i);return yi(n)}function a0(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&g0(o,a)){let c=wh(o,a);o=yi(o,o.next),c=yi(c,c.next),Ks(o,t,e,n,s,r,0),Ks(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function c0(i,t,e,n){let s=[],r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=Eh(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(m0(l));for(s.sort(l0),r=0;r<s.length;r++)e=h0(s[r],e);return e}function l0(i,t){return i.x-t.x}function h0(i,t){let e=u0(i,t);if(!e)return t;let n=wh(e,i);return yi(n,n.next),yi(e,e.next)}function u0(i,t){let e=t,n=-1/0,s,r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){let d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;let a=s,c=s.x,l=s.y,h=1/0,f;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&ji(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(f=Math.abs(o-e.y)/(r-e.x),Qs(e,i)&&(f<h||f===h&&(e.x>s.x||e.x===s.x&&d0(s,e)))&&(s=e,h=f)),e=e.next;while(e!==a);return s}function d0(i,t){return _e(i.prev,i,t.prev)<0&&_e(t.next,i,i.next)<0}function f0(i,t,e,n){let s=i;do s.z===0&&(s.z=uc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,p0(s)}function p0(i){let t,e,n,s,r,o,a,c,l=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(o>1);return i}function uc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function m0(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function ji(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function g0(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!x0(i,t)&&(Qs(i,t)&&Qs(t,i)&&_0(i,t)&&(_e(i.prev,i,t.prev)||_e(i,t.prev,t))||vo(i,t)&&_e(i.prev,i,i.next)>0&&_e(t.prev,t,t.next)>0)}function _e(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function vo(i,t){return i.x===t.x&&i.y===t.y}function bh(i,t,e,n){let s=Nr(_e(i,t,e)),r=Nr(_e(i,t,n)),o=Nr(_e(e,n,i)),a=Nr(_e(e,n,t));return!!(s!==r&&o!==a||s===0&&Ur(i,e,t)||r===0&&Ur(i,n,t)||o===0&&Ur(e,i,n)||a===0&&Ur(e,t,n))}function Ur(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Nr(i){return i>0?1:i<0?-1:0}function x0(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&bh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Qs(i,t){return _e(i.prev,i,i.next)<0?_e(i,t,i.next)>=0&&_e(i,i.prev,t)>=0:_e(i,t,i.prev)<0||_e(i,i.next,t)<0}function _0(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function wh(i,t){let e=new dc(i.i,i.x,i.y),n=new dc(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Yl(i,t,e,n){let s=new dc(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function js(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function dc(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function v0(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Zn=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Zl(t),Jl(n,t);let o=t.length;e.forEach(Zl);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Jl(n,e[c]);let a=i0.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function Zl(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Jl(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var ao=class i extends fe{constructor(t=new Dn([new dt(.5,.5),new dt(-.5,.5),new dt(-.5,-.5),new dt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){let l=t[a];o(l)}this.setAttribute("position",new Gt(s,3)),this.setAttribute("uv",new Gt(r,2)),this.computeVertexNormals();function o(a){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,u=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:u-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,w=e.UVGenerator!==void 0?e.UVGenerator:y0,v,x=!1,S,T,C,U;p&&(v=p.getSpacedPoints(h),x=!0,d=!1,S=p.computeFrenetFrames(h,!1),T=new L,C=new L,U=new L),d||(m=0,u=0,g=0,_=0);let b=a.extractPoints(l),M=b.shape,N=b.holes;if(!Zn.isClockWise(M)){M=M.reverse();for(let tt=0,st=N.length;tt<st;tt++){let P=N[tt];Zn.isClockWise(P)&&(N[tt]=P.reverse())}}let G=Zn.triangulateShape(M,N),J=M;for(let tt=0,st=N.length;tt<st;tt++){let P=N[tt];M=M.concat(P)}function I(tt,st,P){return st||console.error("THREE.ExtrudeGeometry: vec does not exist"),tt.clone().addScaledVector(st,P)}let R=M.length,F=G.length;function D(tt,st,P){let wt,at,gt,lt=tt.x-st.x,bt=tt.y-st.y,ht=P.x-tt.x,A=P.y-tt.y,E=lt*lt+bt*bt,X=lt*A-bt*ht;if(Math.abs(X)>Number.EPSILON){let K=Math.sqrt(E),ct=Math.sqrt(ht*ht+A*A),et=st.x-bt/K,Lt=st.y+lt/K,nt=P.x-A/ct,vt=P.y+ht/ct,It=((nt-et)*A-(vt-Lt)*ht)/(lt*A-bt*ht);wt=et+lt*It-tt.x,at=Lt+bt*It-tt.y;let ut=wt*wt+at*at;if(ut<=2)return new dt(wt,at);gt=Math.sqrt(ut/2)}else{let K=!1;lt>Number.EPSILON?ht>Number.EPSILON&&(K=!0):lt<-Number.EPSILON?ht<-Number.EPSILON&&(K=!0):Math.sign(bt)===Math.sign(A)&&(K=!0),K?(wt=-bt,at=lt,gt=Math.sqrt(E)):(wt=lt,at=bt,gt=Math.sqrt(E/2))}return new dt(wt/gt,at/gt)}let k=[];for(let tt=0,st=J.length,P=st-1,wt=tt+1;tt<st;tt++,P++,wt++)P===st&&(P=0),wt===st&&(wt=0),k[tt]=D(J[tt],J[P],J[wt]);let Y=[],q,rt=k.concat();for(let tt=0,st=N.length;tt<st;tt++){let P=N[tt];q=[];for(let wt=0,at=P.length,gt=at-1,lt=wt+1;wt<at;wt++,gt++,lt++)gt===at&&(gt=0),lt===at&&(lt=0),q[wt]=D(P[wt],P[gt],P[lt]);Y.push(q),rt=rt.concat(q)}for(let tt=0;tt<m;tt++){let st=tt/m,P=u*Math.cos(st*Math.PI/2),wt=g*Math.sin(st*Math.PI/2)+_;for(let at=0,gt=J.length;at<gt;at++){let lt=I(J[at],k[at],wt);j(lt.x,lt.y,-P)}for(let at=0,gt=N.length;at<gt;at++){let lt=N[at];q=Y[at];for(let bt=0,ht=lt.length;bt<ht;bt++){let A=I(lt[bt],q[bt],wt);j(A.x,A.y,-P)}}}let ft=g+_;for(let tt=0;tt<R;tt++){let st=d?I(M[tt],rt[tt],ft):M[tt];x?(C.copy(S.normals[0]).multiplyScalar(st.x),T.copy(S.binormals[0]).multiplyScalar(st.y),U.copy(v[0]).add(C).add(T),j(U.x,U.y,U.z)):j(st.x,st.y,0)}for(let tt=1;tt<=h;tt++)for(let st=0;st<R;st++){let P=d?I(M[st],rt[st],ft):M[st];x?(C.copy(S.normals[tt]).multiplyScalar(P.x),T.copy(S.binormals[tt]).multiplyScalar(P.y),U.copy(v[tt]).add(C).add(T),j(U.x,U.y,U.z)):j(P.x,P.y,f/h*tt)}for(let tt=m-1;tt>=0;tt--){let st=tt/m,P=u*Math.cos(st*Math.PI/2),wt=g*Math.sin(st*Math.PI/2)+_;for(let at=0,gt=J.length;at<gt;at++){let lt=I(J[at],k[at],wt);j(lt.x,lt.y,f+P)}for(let at=0,gt=N.length;at<gt;at++){let lt=N[at];q=Y[at];for(let bt=0,ht=lt.length;bt<ht;bt++){let A=I(lt[bt],q[bt],wt);x?j(A.x,A.y+v[h-1].y,v[h-1].x+P):j(A.x,A.y,f+P)}}}z(),$();function z(){let tt=s.length/3;if(d){let st=0,P=R*st;for(let wt=0;wt<F;wt++){let at=G[wt];yt(at[2]+P,at[1]+P,at[0]+P)}st=h+m*2,P=R*st;for(let wt=0;wt<F;wt++){let at=G[wt];yt(at[0]+P,at[1]+P,at[2]+P)}}else{for(let st=0;st<F;st++){let P=G[st];yt(P[2],P[1],P[0])}for(let st=0;st<F;st++){let P=G[st];yt(P[0]+R*h,P[1]+R*h,P[2]+R*h)}}n.addGroup(tt,s.length/3-tt,0)}function $(){let tt=s.length/3,st=0;it(J,st),st+=J.length;for(let P=0,wt=N.length;P<wt;P++){let at=N[P];it(at,st),st+=at.length}n.addGroup(tt,s.length/3-tt,1)}function it(tt,st){let P=tt.length;for(;--P>=0;){let wt=P,at=P-1;at<0&&(at=tt.length-1);for(let gt=0,lt=h+m*2;gt<lt;gt++){let bt=R*gt,ht=R*(gt+1),A=st+wt+bt,E=st+at+bt,X=st+at+ht,K=st+wt+ht;Ht(A,E,X,K)}}}function j(tt,st,P){c.push(tt),c.push(st),c.push(P)}function yt(tt,st,P){Dt(tt),Dt(st),Dt(P);let wt=s.length/3,at=w.generateTopUV(n,s,wt-3,wt-2,wt-1);Wt(at[0]),Wt(at[1]),Wt(at[2])}function Ht(tt,st,P,wt){Dt(tt),Dt(st),Dt(wt),Dt(st),Dt(P),Dt(wt);let at=s.length/3,gt=w.generateSideWallUV(n,s,at-6,at-3,at-2,at-1);Wt(gt[0]),Wt(gt[1]),Wt(gt[3]),Wt(gt[1]),Wt(gt[2]),Wt(gt[3])}function Dt(tt){s.push(c[tt*3+0]),s.push(c[tt*3+1]),s.push(c[tt*3+2])}function Wt(tt){r.push(tt.x),r.push(tt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return M0(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new ro[s.type]().fromJSON(s)),new i(n,t.options)}},y0={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new dt(r,o),new dt(a,c),new dt(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],f=t[n*3+2],d=t[s*3],u=t[s*3+1],g=t[s*3+2],_=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new dt(o,1-c),new dt(l,1-f),new dt(d,1-g),new dt(_,1-p)]:[new dt(a,1-c),new dt(h,1-f),new dt(u,1-g),new dt(m,1-p)]}};function M0(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var tr=class i extends hc{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var er=class i extends fe{constructor(t=new Dn([new dt(0,.5),new dt(-.5,-.5),new dt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],o=[],a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new Gt(s,3)),this.setAttribute("normal",new Gt(r,3)),this.setAttribute("uv",new Gt(o,2));function l(h){let f=s.length/3,d=h.extractPoints(e),u=d.shape,g=d.holes;Zn.isClockWise(u)===!1&&(u=u.reverse());for(let m=0,p=g.length;m<p;m++){let w=g[m];Zn.isClockWise(w)===!0&&(g[m]=w.reverse())}let _=Zn.triangulateShape(u,g);for(let m=0,p=g.length;m<p;m++){let w=g[m];u=u.concat(w)}for(let m=0,p=u.length;m<p;m++){let w=u[m];s.push(w.x,w.y,0),r.push(0,0,1),o.push(w.x,w.y)}for(let m=0,p=_.length;m<p;m++){let w=_[m],v=w[0]+f,x=w[1]+f,S=w[2]+f;n.push(v,x,S),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return S0(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let o=e[t.shapes[s]];n.push(o)}return new i(n,t.curveSegments)}};function S0(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}var ze=class i extends fe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],f=new L,d=new L,u=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){let w=[],v=p/n,x=0;p===0&&o===0?x=.5/e:p===n&&c===Math.PI&&(x=-.5/e);for(let S=0;S<=e;S++){let T=S/e;f.x=-t*Math.cos(s+T*r)*Math.sin(o+v*a),f.y=t*Math.cos(o+v*a),f.z=t*Math.sin(s+T*r)*Math.sin(o+v*a),g.push(f.x,f.y,f.z),d.copy(f).normalize(),_.push(d.x,d.y,d.z),m.push(T+x,1-v),w.push(l++)}h.push(w)}for(let p=0;p<n;p++)for(let w=0;w<e;w++){let v=h[p][w+1],x=h[p][w],S=h[p+1][w],T=h[p+1][w+1];(p!==0||o>0)&&u.push(v,x,T),(p!==n-1||c<Math.PI)&&u.push(x,S,T)}this.setIndex(u),this.setAttribute("position",new Gt(g,3)),this.setAttribute("normal",new Gt(_,3)),this.setAttribute("uv",new Gt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var xs=class i extends fe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],l=[],h=new L,f=new L,d=new L;for(let u=0;u<=n;u++)for(let g=0;g<=s;g++){let _=g/s*r,m=u/n*Math.PI*2;f.x=(t+e*Math.cos(m))*Math.cos(_),f.y=(t+e*Math.cos(m))*Math.sin(_),f.z=e*Math.sin(m),a.push(f.x,f.y,f.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),d.subVectors(f,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/s),l.push(u/n)}for(let u=1;u<=n;u++)for(let g=1;g<=s;g++){let _=(s+1)*u+g-1,m=(s+1)*(u-1)+g-1,p=(s+1)*(u-1)+g,w=(s+1)*u+g;o.push(_,m,w),o.push(m,p,w)}this.setIndex(o),this.setAttribute("position",new Gt(a,3)),this.setAttribute("normal",new Gt(c,3)),this.setAttribute("uv",new Gt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var co=class i extends fe{constructor(t=new so(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new L,c=new L,l=new dt,h=new L,f=[],d=[],u=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new Gt(f,3)),this.setAttribute("normal",new Gt(d,3)),this.setAttribute("uv",new Gt(u,2));function _(){for(let v=0;v<e;v++)m(v);m(r===!1?e:0),w(),p()}function m(v){h=t.getPointAt(v/e,h);let x=o.normals[v],S=o.binormals[v];for(let T=0;T<=s;T++){let C=T/s*Math.PI*2,U=Math.sin(C),b=-Math.cos(C);c.x=b*x.x+U*S.x,c.y=b*x.y+U*S.y,c.z=b*x.z+U*S.z,c.normalize(),d.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,f.push(a.x,a.y,a.z)}}function p(){for(let v=1;v<=e;v++)for(let x=1;x<=s;x++){let S=(s+1)*(v-1)+(x-1),T=(s+1)*v+(x-1),C=(s+1)*v+x,U=(s+1)*(v-1)+x;g.push(S,T,U),g.push(T,C,U)}}function w(){for(let v=0;v<=e;v++)for(let x=0;x<=s;x++)l.x=v/e,l.y=x/s,u.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new ro[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var Pt=class extends Kn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new kt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dh,this.normalScale=new dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ye,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},_s=class extends Pt{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new dt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Te(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new kt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new kt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new kt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};function Fr(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function E0(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var vs=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},fc=class extends vs{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:qc,endingEnd:qc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Yc:r=t,a=2*e-n;break;case Zc:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Yc:o=t,c=2*n-e;break;case Zc:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,f=this._offsetNext,d=this._weightPrev,u=this._weightNext,g=(n-e)/(s-e),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,w=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,v=(-1-u)*m+(1.5+u)*_+.5*g,x=u*m-u*_;for(let S=0;S!==a;++S)r[S]=p*o[h+S]+w*o[l+S]+v*o[c+S]+x*o[f+S];return r}},pc=class extends vs{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(s-e),f=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*f+o[c+d]*h;return r}},mc=class extends vs{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},dn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Fr(e,this.TimeBufferType),this.values=Fr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Fr(t.times,Array),values:Fr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new mc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new pc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new fc(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Vr:e=this.InterpolantFactoryMethodDiscrete;break;case Va:e=this.InterpolantFactoryMethodLinear;break;case wo:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Vr;case this.InterpolantFactoryMethodLinear:return Va;case this.InterpolantFactoryMethodSmooth:return wo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&E0(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===wo,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let f=a*n,d=f-n,u=f+n;for(let g=0;g!==n;++g){let _=e[f+g];if(_!==e[d+g]||_!==e[u+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let f=a*n,d=o*n;for(let u=0;u!==n;++u)e[d+u]=e[f+u]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};dn.prototype.TimeBufferType=Float32Array;dn.prototype.ValueBufferType=Float32Array;dn.prototype.DefaultInterpolation=Va;var Mi=class extends dn{constructor(t,e,n){super(t,e,n)}};Mi.prototype.ValueTypeName="bool";Mi.prototype.ValueBufferType=Array;Mi.prototype.DefaultInterpolation=Vr;Mi.prototype.InterpolantFactoryMethodLinear=void 0;Mi.prototype.InterpolantFactoryMethodSmooth=void 0;var gc=class extends dn{};gc.prototype.ValueTypeName="color";var xc=class extends dn{};xc.prototype.ValueTypeName="number";var _c=class extends vs{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)nn.slerpFlat(r,0,o,l-a,o,l,c);return r}},lo=class extends dn{InterpolantFactoryMethodLinear(t){return new _c(this.times,this.values,this.getValueSize(),t)}};lo.prototype.ValueTypeName="quaternion";lo.prototype.InterpolantFactoryMethodSmooth=void 0;var Si=class extends dn{constructor(t,e,n){super(t,e,n)}};Si.prototype.ValueTypeName="string";Si.prototype.ValueBufferType=Array;Si.prototype.DefaultInterpolation=Vr;Si.prototype.InterpolantFactoryMethodLinear=void 0;Si.prototype.InterpolantFactoryMethodSmooth=void 0;var vc=class extends dn{};vc.prototype.ValueTypeName="vector";var $l={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},yc=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,f){return l.push(h,f),this},this.removeHandler=function(h){let f=l.indexOf(h);return f!==-1&&l.splice(f,2),this},this.getHandler=function(h){for(let f=0,d=l.length;f<d;f+=2){let u=l[f],g=l[f+1];if(u.global&&(u.lastIndex=0),u.test(h))return g}return null}}},b0=new yc,nr=class{constructor(t){this.manager=t!==void 0?t:b0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};nr.DEFAULT_MATERIAL_NAME="__DEFAULT";var Mc=class extends nr{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=$l.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;let a=Vs("img");function c(){h(),$l.add(t,this),e&&e(this),r.manager.itemEnd(t)}function l(f){h(),s&&s(f),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}};var ho=class extends nr{constructor(t){super(t)}load(t,e,n,s){let r=new Xe,o=new Mc(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},ir=class extends Be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new kt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},uo=class extends ir{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Be.DEFAULT_UP),this.updateMatrix(),this.groundColor=new kt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},na=new Qt,Kl=new L,Ql=new L,fo=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new dt(512,512),this.map=null,this.mapPass=null,this.matrix=new Qt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xs,this._frameExtents=new dt(1,1),this._viewportCount=1,this._viewports=[new he(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Kl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Kl),Ql.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ql),e.updateMatrixWorld(),na.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(na),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(na)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var jl=new Qt,Ls=new L,ia=new L,Sc=class extends fo{constructor(){super(new Fe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new dt(4,2),this._viewportCount=6,this._viewports=[new he(2,1,1,1),new he(0,1,1,1),new he(3,1,1,1),new he(1,1,1,1),new he(3,0,1,1),new he(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Ls.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ls),ia.copy(n.position),ia.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(ia),n.updateMatrixWorld(),s.makeTranslation(-Ls.x,-Ls.y,-Ls.z),jl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jl)}},po=class extends ir{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Sc}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Ec=class extends fo{constructor(){super(new hs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},mo=class extends ir{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Be.DEFAULT_UP),this.updateMatrix(),this.target=new Be,this.shadow=new Ec}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var Bc="\\[\\]\\.:\\/",w0=new RegExp("["+Bc+"]","g"),zc="[^"+Bc+"]",T0="[^"+Bc.replace("\\.","")+"]",A0=/((?:WC+[\/:])*)/.source.replace("WC",zc),R0=/(WCOD+)?/.source.replace("WCOD",T0),C0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",zc),I0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",zc),P0=new RegExp("^"+A0+R0+C0+I0+"$"),L0=["material","materials","bones","map"],bc=class{constructor(t,e,n){let s=n||ge.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ge=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(w0,"")}static parseTrackName(t){let e=P0.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);L0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ge.Composite=bc;ge.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ge.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ge.prototype.GetterByBindingType=[ge.prototype._getValue_direct,ge.prototype._getValue_array,ge.prototype._getValue_arrayElement,ge.prototype._getValue_toArray];ge.prototype.SetterByBindingTypeAndVersioning=[[ge.prototype._setValue_direct,ge.prototype._setValue_direct_setNeedsUpdate,ge.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ge.prototype._setValue_array,ge.prototype._setValue_array_setNeedsUpdate,ge.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ge.prototype._setValue_arrayElement,ge.prototype._setValue_arrayElement_setNeedsUpdate,ge.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ge.prototype._setValue_fromArray,ge.prototype._setValue_fromArray_setNeedsUpdate,ge.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Z0=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wc);function Ah(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new fe,l=0;for(let h=0;h<i.length;++h){let f=i[h],d=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let u in f.attributes){if(!n.has(u))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+u+'" attribute exists among all geometries, or in none of them.'),null;r[u]===void 0&&(r[u]=[]),r[u].push(f.attributes[u]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let u in f.morphAttributes){if(!s.has(u))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[u]===void 0&&(o[u]=[]),o[u].push(f.morphAttributes[u])}if(t){let u;if(e)u=f.index.count;else if(f.attributes.position!==void 0)u=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,u,h),l+=u}}if(e){let h=0,f=[];for(let d=0;d<i.length;++d){let u=i[d].index;for(let g=0;g<u.count;++g)f.push(u.getX(g)+h);h+=i[d].attributes.position.count}c.setIndex(f)}for(let h in r){let f=Th(r[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,f)}for(let h in o){let f=o[h][0].length;if(f===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let d=0;d<f;++d){let u=[];for(let _=0;_<o[h].length;++_)u.push(o[h][_][d]);let g=Th(u);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function Th(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){let h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new Pe(o,e,n),c=0;for(let l=0;l<i.length;++l){let h=i[l];if(h.isInterleavedBufferAttribute){let f=c/e;for(let d=0,u=h.count;d<u;d++)for(let g=0;g<e;g++){let _=h.getComponent(d,g);a.setComponent(d+f,g,_)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}function ei(i=1){let t=i>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}var Ei=new Uint8Array(512);{let i=ei(7),t=[...Array(256).keys()];for(let e=255;e>0;e--){let n=Math.floor(i()*(e+1));[t[e],t[n]]=[t[n],t[e]]}for(let e=0;e<512;e++)Ei[e]=t[e&255]}var Rh=i=>i*i*i*(i*(i*6-15)+10),yo=(i,t,e)=>(i&1?-t:t)+(i&2?-e:e);function D0(i,t){let e=Math.floor(i)&255,n=Math.floor(t)&255;i-=Math.floor(i),t-=Math.floor(t);let s=Rh(i),r=Rh(t),o=Ei[e]+n,a=Ei[e+1]+n,c=(l,h,f)=>l+(h-l)*f;return c(c(yo(Ei[o],i,t),yo(Ei[a],i-1,t),s),c(yo(Ei[o+1],i,t-1),yo(Ei[a+1],i-1,t-1),s),r)}function Un(i,t,e=4){let n=.5,s=1,r=0;for(let o=0;o<e;o++)r+=n*D0(i*s,t*s),n*=.5,s*=2.03;return r}function rn(i,t,e,{repeat:n=!0,srgb:s=!0,aniso:r=8}={}){let o=document.createElement("canvas");o.width=i,o.height=t;let a=o.getContext("2d");e(a,i,t);let c=new Qn(o);return n&&(c.wrapS=c.wrapT=gi),s&&(c.colorSpace=we),c.anisotropy=r,c}function Ch(){return rn(512,512,(i,t,e)=>{i.fillStyle="#55585e",i.fillRect(0,0,t,e);let n=i.getImageData(0,0,t,e),s=n.data,r=ei(3);for(let o=0;o<s.length;o+=4){let a=o/4%t,c=Math.floor(o/4/t),l=Un(a/60,c/60,3)*14+(r()-.5)*30;s[o]+=l,s[o+1]+=l,s[o+2]+=l+1}i.putImageData(n,0,0)})}function Ih(){return rn(512,512,(i,t,e)=>{let n=i.createImageData(t,e),s=n.data,r=ei(11);for(let o=0;o<e;o++)for(let a=0;a<t;a++){let c=(o*t+a)*4,l=Un(a/90,o/90,4),h=(r()-.5)*14;s[c]=196+l*40+h,s[c+1]=210+l*40+h,s[c+2]=186+l*30+h*.6,s[c+3]=255}i.putImageData(n,0,0)})}function Ph(){return rn(256,256,(i,t,e)=>{i.fillStyle="#d6c6a2",i.fillRect(0,0,t,e);let n=ei(5);for(let s=0;s<2600;s++){let r=n()*2.4+.6,o=160+n()*80;i.fillStyle=`rgb(${o},${o*.93},${o*.8})`,i.beginPath(),i.arc(n()*t,n()*e,r,0,Math.PI*2),i.fill()}})}function Lh(){return rn(128,512,(i,t,e)=>{for(let n=0;n<4;n++)i.fillStyle=n%2?"#f2f2ee":"#2a63c9",i.fillRect(0,n*e/4,t,e/4);i.fillStyle="rgba(0,0,0,.08)",i.fillRect(0,0,12,e)})}function Dh(){return rn(512,128,(i,t,e)=>{for(let n=0;n<8;n++)i.fillStyle=n%2?"#f3efe8":"#e8742a",i.fillRect(n*t/8,0,t/8,e);i.fillStyle="rgba(0,0,0,.18)",i.fillRect(0,e-16,t,16)})}function Uh(i=1){return rn(256,128,(t,e,n)=>{let s=ei(i);for(let r=0;r<26;r++){let o=e*(.18+s()*.64),a=n*(.45+(s()-.5)*.35),c=18+s()*34,l=t.createRadialGradient(o,a,0,o,a,c);l.addColorStop(0,"rgba(255,255,255,.55)"),l.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=l,t.beginPath(),t.arc(o,a,c,0,Math.PI*2),t.fill()}},{repeat:!1})}function Mo(){return rn(128,128,(i,t,e)=>{let n=i.createRadialGradient(t/2,e/2,4,t/2,e/2,t/2);n.addColorStop(0,"rgba(0,0,0,.55)"),n.addColorStop(.6,"rgba(0,0,0,.22)"),n.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=n,i.fillRect(0,0,t,e)},{repeat:!1,srgb:!1})}function Ss(i=256,t=128,{hx:e=.36,hy:n=.27,rr:s=.12,fade:r=.13,core:o=.45,alpha:a=.8}={}){return rn(i,t,c=>{let l=c.createImageData(i,t),h=l.data;for(let f=0;f<t;f++)for(let d=0;d<i;d++){let u=Math.abs(d/(i-1)-.5),g=Math.abs(f/(t-1)-.5),_=u-(e-s),m=g-(n-s),p=Math.hypot(Math.max(_,0),Math.max(m,0))+Math.min(Math.max(_,m),0)-s,w=Math.min(1,Math.max(0,1-(p+r*.3)/r));w=w*w*(3-2*w);let v=1-o*Math.min(1,Math.hypot(u/(e+r),g/(n+r))),x=(f*i+d)*4;h[x]=h[x+1]=h[x+2]=0,h[x+3]=Math.round(255*a*w*v)}c.putImageData(l,0,0)},{repeat:!1,srgb:!1})}function Nh(){return rn(4,128,(i,t,e)=>{let n=i.createLinearGradient(0,0,0,e);n.addColorStop(0,"rgba(0,0,0,.5)"),n.addColorStop(.35,"rgba(0,0,0,.2)"),n.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=n,i.fillRect(0,0,t,e)},{repeat:!1,srgb:!1,aniso:1})}function Fh(){return rn(64,256,(i,t,e)=>{i.fillStyle="#cfd3d6",i.fillRect(0,0,t,e);for(let n=0;n<e;n+=8){let s=i.createLinearGradient(0,n,0,n+8);s.addColorStop(0,"rgba(255,255,255,.55)"),s.addColorStop(.45,"rgba(255,255,255,0)"),s.addColorStop(.8,"rgba(0,0,0,.10)"),s.addColorStop(1,"rgba(0,0,0,.28)"),i.fillStyle=s,i.fillRect(0,n,t,8)}})}function Oh(){return rn(256,128,(i,t,e)=>{let n=i.createLinearGradient(0,0,0,e);n.addColorStop(0,"#9fb3bf"),n.addColorStop(.55,"#6e8592"),n.addColorStop(1,"#4b5d68"),i.fillStyle=n,i.fillRect(0,0,t,e),i.fillStyle="rgba(245,243,238,.85)";for(let s=0;s<t;s+=32)i.fillRect(s,0,3,e);i.fillRect(0,e*.62,t,2),i.fillStyle="rgba(255,255,255,.08)";for(let s=0;s<t;s+=32)i.beginPath(),i.moveTo(s+6,e),i.lineTo(s+18,0),i.lineTo(s+26,0),i.lineTo(s+14,e),i.fill()})}function Bh(){return rn(128,128,(i,t,e)=>{let n=ei(21);for(let s=0;s<70;s++){let r=t*(.1+n()*.8),o=e*(.35+n()*.6),a=(n()-.5)*26,c=70+n()*60;i.strokeStyle=`rgba(${c*.8},${c},${c*.55},1)`,i.lineWidth=1.4+n()*1.6,i.beginPath(),i.moveTo(r,e),i.quadraticCurveTo(r+a*.3,e-o*.6,r+a,e-o),i.stroke()}},{repeat:!1})}function bi(i,t,e,{closed:n=!0,y:s=0,vScale:r=1,uvAcross:o=[0,1],heightA:a=0,heightB:c=0,segRange:l=null}={}){let h=i.length,f=[],d=[],u=[],g=l?l[0]:0,_=l?l[1]:n?h:h-1,m=0;for(let v=g;v<=_;v++){let x=(v%h+h)%h,S=i[x],T=i[(x+1)%h],C=i[(x-1+h)%h],U=T.x-C.x,b=T.y-C.y,M=Math.hypot(U,b)||1;U/=M,b/=M;let N=-b,Z=U,G=typeof t=="function"?t(x):t,J=typeof e=="function"?e(x):e;f.push(S.x+N*G,s+a,S.y+Z*G,S.x+N*J,s+c,S.y+Z*J),v>g&&(m+=Math.hypot(S.x-i[((v-1)%h+h)%h].x,S.y-i[((v-1)%h+h)%h].y)),d.push(o[0],m*r,o[1],m*r)}let p=_-g;for(let v=0;v<p;v++){let x=v*2;u.push(x,x+2,x+1,x+1,x+2,x+3)}let w=new fe;return w.setAttribute("position",new Gt(f,3)),w.setAttribute("uv",new Gt(d,2)),w.setIndex(u),w.computeVertexNormals(),w}var Mn=(i,t,e)=>i+(t-i)*e,pe=(i,t,e)=>Math.min(e,Math.max(t,i)),wi=i=>i*i*(3-2*i),zh=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2;var So={straightZ:206,straightX0:420,straightX1:-534,trackHalf:7,pitWallZ:198,pitLaneZ:191.5,garageFrontZ:185.5,garageDepth:17,boxW:6.7,boxes:30,pitX0:-150.5,get pitX1(){return this.pitX0+this.boxes*this.boxW},towerX:64,gantryX:-96,grandstandZ:224,grandstandX0:-190,grandstandX1:110,paddock:{x0:-170,x1:120,z0:96,z1:166}};function Hh(i,{quality:t="high",renderer:e}={}){let n=t==="high"?1:t==="mid"?.6:.35,s=new de;s.name="world";let r=i.map(([I,R])=>new dt(I,R)),o=ei(42),a=[],c={asphalt:Ch(),grass:Ih(),gravel:Ph(),kerb:Lh(),barrier:Dh(),blob:Mo(),ao:Nh(),shutter:Fh()};c.grass.repeat.set(1,1);let l={ground:new Pt({map:c.grass,roughness:1,color:16777215,vertexColors:!0}),asphalt:new Pt({map:c.asphalt,roughness:.8,metalness:0,color:10133156}),pitAsphalt:new Pt({map:c.asphalt,roughness:.86,color:12567496}),rubber:new ve({color:723981,transparent:!0,opacity:.16,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),ao:new ve({map:c.ao,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),contact:new ve({map:Ss(128,128,{hx:.34,hy:.34,rr:.2,fade:.15,alpha:.6}),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),line:new Pt({color:15921644,roughness:.7}),kerb:new Pt({map:c.kerb,roughness:.6}),runoff:new Pt({color:4165490,roughness:.85}),gravel:new Pt({map:c.gravel,roughness:1,color:15919832}),barrier:new Pt({map:c.barrier,roughness:.8}),concrete:new Pt({color:14276560,roughness:.92}),concreteDark:new Pt({color:10988978,roughness:.9}),white:new Pt({color:15131870,roughness:.8}),steel:new Pt({color:10200234,roughness:.45,metalness:.6}),steelDark:new Pt({color:6120555,roughness:.5,metalness:.55}),glass:new Pt({color:6256260,roughness:.12,metalness:.9,envMapIntensity:1.2}),shutter:new Pt({map:c.shutter,color:16777215,roughness:.5,metalness:.3}),seat:new Pt({color:5144467,roughness:.7}),roofW:new Pt({color:15855593,roughness:.6,side:Ee}),red:new Pt({color:15282981,roughness:.55}),trunk:new Pt({color:7034695,roughness:1}),pine:new Pt({color:16777215,roughness:1}),oak:new Pt({color:16777215,roughness:1}),shrub:new Pt({color:16777215,roughness:1}),hill:new Pt({color:7043676,roughness:1,flatShading:!1}),interior:new Pt({color:14276561,roughness:.8}),floor:new Pt({color:9343640,roughness:.55,metalness:.1}),blob:new ve({map:c.blob,transparent:!0,depthWrite:!1})};l.asphalt.map.repeat.set(1,1);let h=I=>{let R=Oh();return R.repeat.set(I,1),new Pt({map:R,roughness:.18,metalness:.55,envMapIntensity:1.1})},f=(I,R,F,D,k,Y=1,q=.06,rt=s)=>{let ft=Math.hypot(F-I,D-R),z=new xe(ft,k);z.rotateX(-Math.PI/2);let $=new mt(z,l.ao),it=Math.atan2(D-R,F-I),j=-Math.sin(it)*Y,yt=Math.cos(it)*Y;return $.position.set((I+F)/2+j*k/2,q,(R+D)/2+yt*k/2),$.rotation.y=-it+(Y>0?0:Math.PI),$.renderOrder=1,rt.add($),$},d=(I,R,F,D,k=0,Y=s)=>{let q=new mt(new xe(F,D),l.contact);return q.rotation.x=-Math.PI/2,q.rotation.z=k,q.position.set(I,.055,R),q.renderOrder=1,Y.add(q),q};{let I=new xe(4200,3e3,120,90);I.rotateX(-Math.PI/2);let R=I.attributes.position,F=I.attributes.uv;for(let z=0;z<R.count;z++){let $=R.getX(z),it=R.getZ(z),j=Math.hypot($/1.15,it*1.25),yt=pe((j-720)/900,0,1);R.setY(z,yt*yt*(40+Un($/420,it/420,4)*90)-.05),F.setXY(z,$/9,it/9)}I.computeVertexNormals();let D=[],k=new kt(8161886),Y=new kt(10986611),q=new kt(5662282),rt=new kt;for(let z=0;z<R.count;z++){let $=R.getX(z),it=R.getZ(z),j=Un($/260,it/260,4),yt=Un($/70+9,it/70,3);rt.copy(k).lerp(Y,pe(j*1.4+.25,0,1)*.75).lerp(q,pe(-yt*1.6,0,1)*.6),D.push(rt.r,rt.g,rt.b)}I.setAttribute("color",new Gt(D,3));let ft=new mt(I,l.ground);ft.receiveShadow=!0,ft.name="ground",s.add(ft)}{let I=new de;for(let R=0;R<3;R++){let F=new me(2300+R*350,2300+R*350,1,220,1,!0),D=F.attributes.position;for(let q=0;q<D.count;q++){let rt=D.getX(q),ft=D.getZ(q);if(D.getY(q)>0){let $=Math.atan2(ft,rt),it=70+Un($*3+R*7,R,4)*150+Math.max(0,Un($*9,3+R,2))*90,j=Math.abs(Math.atan2(Math.sin($- -2.35),Math.cos($- -2.35)));it+=Math.max(0,1-j/.22)*(R===1?260:150),D.setY(q,it)}else D.setY(q,-20)}F.computeVertexNormals();let k=new Pt({color:[6254423,8227708,10464688][R],roughness:1,side:Ee,fog:!0}),Y=new mt(F,k);I.add(Y)}s.add(I)}let u=r.length,g=new Float32Array(u);for(let I=0;I<u;I++){let R=r[(I-3+u)%u],F=r[I],D=r[(I+3)%u],k=Math.atan2(F.y-R.y,F.x-R.x),Y=Math.atan2(D.y-F.y,D.x-F.x);g[I]=Math.atan2(Math.sin(Y-k),Math.cos(Y-k))}let _=new Float32Array(u);for(let I=0;I<u;I++){let R=0;for(let F=-8;F<=8;F++)R=Math.max(R,Math.abs(g[(I+F+u)%u]));_[I]=pe((R-.025)/.05,0,1)}let m=I=>{let R=r[I];return Math.abs(R.y-So.straightZ)<1.5&&R.x<470&&R.x>-540},p=I=>m(I)?7:6.5,w=bi(r,I=>p(I),I=>-p(I),{y:.03,vScale:1/12,uvAcross:[0,14/12]}),v=new mt(w,l.asphalt);v.receiveShadow=!0,v.name="track",s.add(v);{let I=document.createElement("canvas");I.width=64,I.height=4;let R=I.getContext("2d"),F=R.createLinearGradient(0,0,64,0);F.addColorStop(0,"rgba(0,0,0,0)"),F.addColorStop(.35,"rgba(0,0,0,1)"),F.addColorStop(.65,"rgba(0,0,0,1)"),F.addColorStop(1,"rgba(0,0,0,0)"),R.fillStyle=F,R.fillRect(0,0,64,4),l.rubber.map=new Qn(I),l.rubber.opacity=.2;let D=q=>pe(g[q]*12,-2.2,2.2),k=bi(r,q=>2.6+D(q),q=>-3.4+D(q),{y:.034}),Y=new mt(k,l.rubber);Y.renderOrder=1,s.add(Y)}for(let I of[1,-1]){let R=bi(r,D=>I*(p(D)-.15),D=>I*(p(D)-.45),{y:.045}),F=new mt(R,l.line);F.receiveShadow=!0,s.add(F)}let x=[];{let I=-1;for(let R=0;R<=u;R++){let F=R<u&&_[R]>.5;F&&I<0&&(I=R),!F&&I>=0&&(R-I>4&&x.push([I,R]),I=-1)}}for(let[I,R]of x){for(let z of[1,-1]){let $=bi(r,yt=>z*p(yt),yt=>z*(p(yt)+1.6),{closed:!1,segRange:[I,R],y:.07,vScale:.16666666666666666,heightA:0,heightB:-.03}),it=new mt($,l.kerb);it.receiveShadow=!0,s.add(it);let j=bi(r,yt=>z*(p(yt)+1.6),yt=>z*(p(yt)+5.5),{closed:!1,segRange:[I,R],y:.04});s.add(new mt(j,l.runoff))}let F=Math.floor((I+R)/2),k=-(Math.sign(g[F])||1),Y=bi(r,z=>k*(p(z)+5.5),z=>k*(p(z)+5.5+24*pe(_[z],.3,1)),{closed:!1,segRange:[Math.max(0,I-6),Math.min(u-1,R+10)],y:.035,vScale:1/10}),q=new mt(Y,l.gravel);q.receiveShadow=!0,s.add(q);let rt=U0(r,z=>k*(p(z)+31.4),[Math.max(0,I-6),Math.min(u-1,R+10)],.95,1/7),ft=new mt(rt,l.barrier);ft.castShadow=!0,ft.receiveShadow=!0,s.add(ft)}let S=So,T=(I,R,F,D,k,Y,q,rt=s,ft=!0)=>{let z=new mt(new ye(I,R,F),D);return z.position.set(k,Y+R/2,q),z.castShadow=ft,z.receiveShadow=!0,rt.add(z),z};{let I=new Dn,R=S.garageFrontZ,F=S.pitWallZ;I.moveTo(S.pitX0-140,-F),I.lineTo(S.pitX1+150,-F),I.lineTo(S.pitX1+150,-R),I.lineTo(S.pitX0-140,-R),I.closePath();let D=new er(I);D.rotateX(-Math.PI/2);let k=new mt(D,l.pitAsphalt);k.position.y=.025,k.receiveShadow=!0,s.add(k);let Y=D.attributes.uv,q=D.attributes.position;for(let rt=0;rt<q.count;rt++)Y.setXY(rt,q.getX(rt)/12,q.getZ(rt)/12);T(S.pitX1-S.pitX0+260,.012,.25,l.line,(S.pitX0+S.pitX1)/2,.03,S.garageFrontZ+6,s,!1),T(S.pitX1-S.pitX0+300,1.1,.7,l.concrete,(S.pitX0+S.pitX1)/2,0,S.pitWallZ+.35),T(S.pitX1-S.pitX0+300,.08,.9,l.steel,(S.pitX0+S.pitX1)/2,1.1,S.pitWallZ+.35);for(let[rt,ft]of[[S.pitX1+150,S.pitX1+260],[S.pitX0-140,S.pitX0-250]]){let z=new Dn;z.moveTo(rt,-(S.garageFrontZ+.5)),z.lineTo(rt,-S.pitWallZ),z.lineTo(ft,-(S.straightZ-6.8)),z.lineTo(ft,-(S.straightZ-6.8-6)),z.closePath();let $=new er(z);$.rotateX(-Math.PI/2);let it=new mt($,l.pitAsphalt);it.position.y=.028,it.receiveShadow=!0,s.add(it)}}let C=new de;C.name="pits",s.add(C);let U=13;{let I=S.boxes*S.boxW,R=(S.pitX0+S.pitX1)/2,F=S.garageFrontZ,D=F-S.garageDepth;T(I,4.6,.4,l.white,R,0,D+.2,C),T(I+.6,.5,S.garageDepth+2.2,l.white,R,4.6,F-S.garageDepth/2+.9,C),T(I,3.4,S.garageDepth-2,h(I/8),R,5.1,F-S.garageDepth/2-.4,C);for(let ft=0;ft<=S.boxes;ft++)T(ft%2?.16:.32,3.4,ft%2?.45:.7,l.white,S.pitX0+ft*S.boxW,5.1,F-1.2,C);T(I,.05,.14,new ve({color:16773590}),R,4.56,F+1.4,C,!1),f(S.pitX0,F,S.pitX1,F,3.2,1,.05,C),f(S.pitX0-150,S.pitWallZ,S.pitX1+150,S.pitWallZ,1.4,-1,.05),f(S.pitX0-150,S.pitWallZ+.7,S.pitX1+150,S.pitWallZ+.7,1.2,1,.06),T(I+.6,.55,S.garageDepth+1.6,l.white,R,8.5,F-S.garageDepth/2+.4,C),T(I,1,.06,new Pt({color:12570840,transparent:!0,opacity:.35,roughness:.1}),R,9.05,F+.1,C,!1),T(I,.07,.12,l.steel,R,10.05,F+.1,C);for(let ft=0;ft<S.boxes;ft++){let z=S.pitX0+ft*S.boxW,$=z+S.boxW/2;if(T(.35,4.6,S.garageDepth,l.white,z,0,F-S.garageDepth/2,C),T(S.boxW-.35,.7,.3,l.white,$,3.9,F-.15,C),ft===U)continue;let it=ft%7===3?1.2:ft%5===1?2.2:0;T(S.boxW-.4,3.9-it,.12,l.shutter,$,it,F-.3,C),it>0&&T(S.boxW-.4,it,.1,l.interior,$,0,F-6,C,!1)}T(.35,4.6,S.garageDepth,l.white,S.pitX1,0,F-S.garageDepth/2,C);let k=S.pitX0+U*S.boxW+S.boxW/2;T(S.boxW-.4,.02,S.garageDepth-.4,l.floor,k,.02,F-S.garageDepth/2,C,!1),T(S.boxW-.4,3.9,.1,l.interior,k,0,D+.45,C,!1);for(let ft of[-1,1]){T(1.6,1,.6,l.red,k+ft*2.2,0,D+1.3,C);for(let z=0;z<4;z++){let $=new mt(new me(.33,.33,.3,20),new Pt({color:1776670,roughness:.95}));$.position.set(k-ft*2.3,.15+z*.31,D+3.2),$.castShadow=!0,C.add($)}}let Y=new po(16767400,60,16,1.6);Y.position.set(k,3.6,F-6),C.add(Y),T(S.boxW-1.2,.06,.5,new ve({color:16774108}),k,4.2,F-5,C,!1),T(S.boxW-1.2,.06,.5,new ve({color:16774108}),k,4.2,F-11,C,!1),T(3.2,1.4,.06,l.steelDark,k,1.5,D+.52,C,!1);for(let ft=0;ft<2;ft++){let z=new mt(new me(.34,.34,.32,22),new Pt({color:1776670,roughness:.95}));z.rotation.z=Math.PI/2,z.position.set(k+1.6+ft*.36,.36,F-4.2),z.castShadow=!0,C.add(z)}T(1.1,.08,.7,l.steel,k+1.78,.1,F-4.2,C,!1),f(k-S.boxW/2+.2,D+.5,k+S.boxW/2-.2,D+.5,2.4,1,.045,C),f(k-S.boxW/2+.2,D+.5,k-S.boxW/2+.2,F,1.4,-1,.045,C),f(k+S.boxW/2-.2,D+.5,k+S.boxW/2-.2,F,1.4,1,.045,C),s.userData.openBox={x:k,z:F};let q=S.towerX,rt=F-7;T(18,16,15,l.white,q,0,rt,C),T(18.6,4.2,15.6,h(2.4),q,16,rt,C),T(19.4,.6,16.4,l.white,q,20.2,rt,C),T(20.4,.25,17.4,l.white,q,15.75,rt,C);for(let ft=0;ft<3;ft++)T(18.2,1.3,.1,h(2.2),q,3.4+ft*4.2,rt+7.55,C,!1);f(q-9,rt+7.5,q+9,rt+7.5,2.4,1,.05,C),f(q+9,rt-7.5,q+9,rt+7.5,2.4,-1,.05,C),s.userData.tower=new L(q,18,rt);for(let ft=0;ft<6;ft++)G(S.pitX0+18+ft*34,9,F+.2,ft%2?16118766:15282981,C)}T(S.straightX0-S.straightX1,1.15,.6,l.concrete,(S.straightX0+S.straightX1)/2,0,S.straightZ+10.5);{let I=new yn(new me(.07,.07,4.2,6),l.steelDark,Math.ceil((S.straightX0-S.straightX1)/6)),R=new Qt,F=0;for(let k=S.straightX1;k<S.straightX0;k+=6)R.makeTranslation(k,1.15+2.1,S.straightZ+10.6),I.setMatrixAt(F++,R);I.count=F,I.castShadow=!0,s.add(I);let D=new mt(new xe(S.straightX0-S.straightX1,3.6),new Pt({color:9213082,transparent:!0,opacity:.18,side:Ee,depthWrite:!1}));D.position.set((S.straightX0+S.straightX1)/2,3.1,S.straightZ+10.6),s.add(D)}{let I=new de;I.name="grandstand",s.add(I);let R=S.grandstandX1-S.grandstandX0,F=(S.grandstandX0+S.grandstandX1)/2,D=S.grandstandZ;for(let Y=0;Y<18;Y++)T(R,.45,.9,l.concreteDark,F,1.2+Y*.55,D+Y*.85,I,Y%3===0),T(R-2,.32,.35,l.seat,F,1.65+Y*.55,D+Y*.85-.1,I,!1);T(R,1.2,16,l.concreteDark,F,0,D+7.5,I),T(R,11,1,l.white,F,0,D+16,I);let k=new mt(new ye(R+4,.45,22),l.roofW);k.position.set(F,16.5,D+7.5),k.rotation.x=-.08,k.castShadow=!0,k.receiveShadow=!0,I.add(k);for(let Y=S.grandstandX0;Y<=S.grandstandX1+.1;Y+=20){T(.5,16.5,.5,l.steel,Y,0,D+16.2,I);let q=new mt(new ye(.35,1.4,21),l.steel);q.position.set(Y,17.3,D+7.5),q.rotation.x=-.08,q.castShadow=!0,I.add(q)}}{let I=new de;I.name="gantry",s.add(I);let R=S.gantryX,F=S.pitWallZ-.5,D=S.straightZ+11;for(let k of[F,D])T(.6,9,.6,l.steel,R,0,k,I);T(.5,.5,D-F+1,l.steel,R,8.2,(F+D)/2,I),T(.5,.5,D-F+1,l.steel,R,9.2,(F+D)/2,I);for(let k=F;k<D;k+=1.2){let Y=new mt(new ye(.12,1.3,.12),l.steel);Y.position.set(R,8.7,k),Y.rotation.x=.7,I.add(Y)}for(let k=0;k<4;k++)T(.3,.9,1.6,new Pt({color:1842721,roughness:.4}),R-.2,7.2,S.straightZ-3+k*2,I);T(.8,.01,14,l.line,R,.04,S.straightZ,s,!1);for(let k=0;k<10;k++){let Y=R+12+k*8,q=S.straightZ+(k%2?3.2:-3.2);T(.18,.01,2.6,l.line,Y,.04,q,s,!1),T(2.2,.01,.18,l.line,Y+1.1,.04,q+1.3,s,!1),T(2.2,.01,.18,l.line,Y+1.1,.04,q-1.3,s,!1)}}{let I=S.paddock,R=new xe(I.x1-I.x0,I.z1-I.z0);R.rotateX(-Math.PI/2);let F=R.attributes.uv;for(let nt=0;nt<F.count;nt++)F.setXY(nt,F.getX(nt)*(I.x1-I.x0)/12,F.getY(nt)*(I.z1-I.z0)/12);let D=new mt(R,l.pitAsphalt);D.position.set((I.x0+I.x1)/2,.02,(I.z0+I.z1)/2),D.receiveShadow=!0,s.add(D);for(let[nt,vt,It,ut]of[[80,160,22,28],[84,180,18,16],[10,167.5,220,3.5]]){let _t=new mt(new xe(It,ut),l.pitAsphalt);_t.rotation.x=-Math.PI/2,_t.position.set(nt,.022,vt),_t.receiveShadow=!0,s.add(_t)}let k=new mt(new xe(9,90),l.pitAsphalt);k.rotation.x=-Math.PI/2,k.position.set(-60,.021,70),k.receiveShadow=!0,s.add(k),f(S.pitX0,S.garageFrontZ-S.garageDepth,S.pitX1,S.garageFrontZ-S.garageDepth,2.6,-1,.05);let Y=new Qt,q=new nn,rt=new Ye,ft=new L,z=new L,$=new kt,it=(nt,vt,It,ut=!0)=>{let _t=new yn(nt,vt,It.length);return It.forEach((Et,Ot)=>{rt.set(Et.rx||0,Et.ry||0,Et.rz||0),q.setFromEuler(rt),Y.compose(z.set(Et.x,Et.y||0,Et.z),q,ft.set(Et.sx||1,Et.sy||1,Et.sz||1)),_t.setMatrixAt(Ot,Y),Et.c!=null&&_t.setColorAt(Ot,$.set(Et.c))}),_t.castShadow=ut,_t.receiveShadow=!0,s.add(_t),_t},j=new ye(1,1,1),yt=new Pt({color:16777215,roughness:.42,metalness:.25}),Ht=new Pt({color:1910316,roughness:.08,metalness:.85}),Dt=new Pt({color:1579291,roughness:.92}),Wt=[],tt=[],st=[],P=[],wt=[],at=[],gt=[],lt=[],bt=[2830133,16118766,10200234,1842721,15131612,3817544,16118766,6648666],ht=0;for(let nt=-156;nt<=66;nt+=24,ht++){let It=bt[ht%bt.length];Wt.push({x:nt,y:.95+1.95,z:151,sx:15.5,sy:3.9,sz:2.55,c:It}),ht%3===1&&lt.push({x:nt,y:1.55,z:151-1.285,sx:15.3,sy:.18,sz:.02,c:15282981}),tt.push({x:nt+9.35,y:.9+1.45,z:151,sx:2.6,sy:2.9,sz:2.5,c:ht%2?16118766:10200234}),st.push({x:nt+10.67,y:3,z:151,sx:.05,sy:.95,sz:2.2});for(let ut of[-6.1,-4.8,-3.5,7.7,9.9])P.push({x:nt+ut,y:.5,z:151,rx:Math.PI/2,sy:2.6});wt.push({x:nt-.5,y:3.7,z:151-1.28-2.35,sx:13.6,sy:.1,sz:4.7,rx:-.05});for(let ut of[-6.6,0,6.6])at.push({x:nt-.5+ut,y:1.8,z:151-1.28-4.55,sy:3.6});gt.push({x:nt+1.5,y:.05,z:151,rx:-Math.PI/2,sx:20,sy:4.4}),gt.push({x:nt-.5,y:.052,z:151-3.6,rx:-Math.PI/2,sx:14,sy:5.2})}it(j,yt,Wt),it(j,yt,tt),it(j,Ht,st,!1),lt.length&&it(j,new Pt({color:16777215,roughness:.5}),lt,!1),it(new me(.5,.5,1,16),Dt,P),it(j,l.roofW,wt),it(new me(.05,.05,1,6),l.steel,at),it(new xe(1,1),l.contact,gt,!1).renderOrder=1;let A=[],E=[],X=[],K=[];for(let nt=0;nt<6;nt++){let vt=-28+nt*16.5,It=100.5;A.push({x:vt,y:1.6,z:It,sx:14.6,sy:3.2,sz:5}),X.push({x:vt,y:3.3,z:It+.35,sx:15.4,sy:.18,sz:6.2}),A.push({x:vt-2.2,y:4.85,z:It-.6,sx:8.6,sy:2.9,sz:3.6}),X.push({x:vt-2.2,y:6.4,z:It-.45,sx:9.6,sy:.16,sz:4.4}),E.push({x:vt,y:1.75,z:It+2.53,sx:12.8,sy:1.9,sz:.04}),E.push({x:vt-2.2,y:4.9,z:It+1.23,sx:8,sy:2.1,sz:.04}),K.push({x:vt,y:.05,z:It+2.6,rx:-Math.PI/2,sx:16,sy:4})}it(j,l.white,A),it(j,l.white,X),it(j,h(1.5),E,!1),it(new xe(1,1),l.contact,K,!1).renderOrder=1;for(let[nt,vt]of[[-140,116],[-100,116],[72,117]]){let It=new mt(new oo(13,3.2,4,1,!0),l.roofW);It.rotation.y=Math.PI/4,It.position.set(nt,5.6,vt),It.castShadow=!0,s.add(It);for(let[ut,_t]of[[-1,-1],[1,-1],[-1,1],[1,1]])T(.25,4.2,.25,l.steel,nt+ut*8.5,0,vt+_t*8.5,s)}let ct=[],et=[];for(let nt=0;nt<18;nt++){let vt=-158+nt*13.1+nt%3*1.7,It=145.4-nt%2*.8,ut=2+nt%3;for(let _t=0;_t<ut;_t++)ct.push({x:vt,y:.16+_t*.31,z:It,sx:.66,sy:.3,sz:.66});et.push({x:vt+2.4,y:.45,z:It+.3,sx:1.2,sy:.9,sz:.8,c:nt%2?1842721:10200234})}it(new me(.5,.5,1,18),Dt,ct),it(j,yt,et);let Lt=[];for(let nt=0;nt<7;nt++)Lt.push({x:-7.4,y:.03,z:126.1-nt*3.2,sx:5.8,sy:.012,sz:.12});Lt.push({x:-10.3,y:.03,z:126.1-3*3.2,sx:.12,sy:.012,sz:6*3.2+.12}),it(j,l.line,Lt,!1);for(let nt=0;nt<4;nt++)T(.4,22,.4,l.steel,I.x0+10+nt*90,0,I.z0-5,s),T(3,.6,1.2,l.steelDark,I.x0+10+nt*90,22,I.z0-5,s)}let b=60,M=new Map;for(let I=0;I<u;I++){let R=Math.floor(r[I].x/b)+","+Math.floor(r[I].y/b);M.has(R)||M.set(R,[]),M.get(R).push(r[I])}let N=(I,R)=>{let F=Math.floor(I/b),D=Math.floor(R/b),k=1e12;for(let Y=-1;Y<=1;Y++)for(let q=-1;q<=1;q++){let rt=M.get(F+Y+","+(D+q));if(rt)for(let ft of rt){let z=(ft.x-I)**2+(ft.y-R)**2;z<k&&(k=z)}}return k===1e12?b*1.5:Math.sqrt(k)},Z=(I,R)=>I>S.paddock.x0-30&&I<S.paddock.x1+30&&R>S.paddock.z0-20&&R<S.straightZ+60||I>S.grandstandX0-40&&I<S.grandstandX1+40&&R>S.straightZ&&R<S.grandstandZ+40;{let I=Math.round(2600*n),R=Math.round(2200*n),F=Math.round(1800*n),D=(st,P)=>Ah(st.map(([wt,at,gt,lt,bt=1])=>{let ht=P();return ht.scale(lt,lt*bt,lt),ht.translate(wt,at,gt),ht})),k=D([[0,0,0,1,.42],[.62,-.06,.18,.62,.42],[-.58,-.04,-.22,.66,.42],[.08,.04,-.62,.58,.42],[-.2,.03,.6,.6,.42]],()=>new ze(1,10,7)),Y=D([[0,0,0,1],[.55,-.15,.25,.7],[-.5,-.1,-.3,.72],[.1,.38,-.1,.6]],()=>new tr(1,1)),q=new yn(k,l.pine,I),rt=new yn(new me(.16,.3,1,6),l.trunk,I),ft=new yn(Y,l.oak,R),z=new yn(new tr(1,1),l.shrub,F),$=new Qt,it=new nn,j=new L,yt=new L,Ht=new Ye,Dt=new kt,Wt=(st,P,wt)=>{for(let at=0;at<60;at++){let gt=o()*Math.PI*2,lt=Math.sqrt(o())*P,bt=Math.cos(gt)*lt*1.3,ht=Math.sin(gt)*lt*.9,A=N(bt,ht);if(!(A<st||Z(bt,ht))&&!(Un(bt/160,ht/160,3)*.9+.2<wt*o()))return[bt,ht,A]}return null},tt=0;for(let st=0;st<I;st++){let P=Wt(38,1350,.9);if(!P)continue;let[wt,at]=P,gt=9+o()*8,lt=4+o()*3.5;Ht.set((o()-.5)*.12,o()*6,(o()-.5)*.12),it.setFromEuler(Ht),$.compose(yt.set(wt,gt*.5,at),it,j.set(1,gt,1)),rt.setMatrixAt(tt,$),$.compose(yt.set(wt,gt,at),it,j.set(lt,lt*.9,lt)),q.setMatrixAt(tt,$),q.setColorAt(tt,Dt.setHSL(.25+o()*.04,.22+o()*.1,.24+o()*.08)),tt++}q.count=rt.count=tt,tt=0;for(let st=0;st<R;st++){let P=Wt(34,1400,.7);if(!P)continue;let[wt,at]=P,gt=3+o()*3.4;$.compose(yt.set(wt,gt*.8,at),it.identity(),j.set(gt,gt*.85,gt)),ft.setMatrixAt(tt,$),ft.setColorAt(tt,Dt.setHSL(.2+o()*.07,.2+o()*.12,.3+o()*.1)),tt++}ft.count=tt,tt=0;for(let st=0;st<F;st++){let P=Wt(20,1200,.4);if(!P)continue;let[wt,at]=P,gt=.8+o()*1.6;$.compose(yt.set(wt,gt*.35,at),it.identity(),j.set(gt*1.4,gt*.7,gt*1.2)),z.setMatrixAt(tt,$),z.setColorAt(tt,Dt.setHSL(.17+o()*.07,.16+o()*.12,.4+o()*.1)),tt++}z.count=tt;for(let st of[q,rt,ft,z])st.castShadow=t!=="low",st.receiveShadow=!0,s.add(st)}{let I=Bh(),R=new Pt({map:I,alphaTest:.45,side:Ee,roughness:1,color:14870728});R.onBeforeCompile=z=>{z.uniforms.uTime={value:0},R.userData.sh=z,z.vertexShader=`uniform float uTime;
`+z.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        float sway = sin(uTime * 1.7 + instanceMatrix[3].x * .37 + instanceMatrix[3].z * .23) * .12 * uv.y;
        transformed.x += sway; transformed.z += sway * .6;`)};let F=new xe(1,.62);F.translate(0,.31,0);let D=Math.round(3e3*n),k=new yn(F,R,D),Y=new Qt,q=new nn,rt=new Ye,ft=0;for(let z=0;z<D*3&&ft<D;z++){let $=o(),it,j;if($<.5)it=Mn(-560,460,o()),j=S.straightZ+12+o()*14;else{let Ht=Math.floor(o()*160),Dt=r[Ht],Wt=r[(Ht+1)%u],tt=-(Wt.y-Dt.y),st=Wt.x-Dt.x,P=Math.hypot(tt,st)||1,wt=(o()>.5?1:-1)*(12+o()*22);it=Dt.x+tt/P*wt,j=Dt.y+st/P*wt}if(Z(it,j)&&j<S.straightZ+11||N(it,j)<9.5)continue;rt.set(0,o()*Math.PI,0),q.setFromEuler(rt);let yt=.55+o()*.6;Y.compose(new L(it,0,j),q,new L(yt,yt,yt)),k.setMatrixAt(ft++,Y)}k.count=ft,s.add(k),a.push(z=>{R.userData.sh&&(R.userData.sh.uniforms.uTime.value=z)})}function G(I,R,F,D,k){let Y=new mt(new me(.05,.06,6,6),l.steel);Y.position.set(I,R+3,F),k.add(Y);let q=new xe(2.4,1.5,16,6);q.translate(1.2,0,0);let rt=new Pt({color:D,side:Ee,roughness:.8});rt.onBeforeCompile=z=>{z.uniforms.uTime={value:0},rt.userData.sh=z,z.vertexShader=`uniform float uTime;
`+z.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        float k = position.x / 2.4;
        transformed.z += sin(position.x * 2.1 - uTime * 4.2 + ${(I*.1).toFixed(2)}) * .22 * k;
        transformed.y += sin(position.x * 1.3 - uTime * 3.1) * .06 * k;`)};let ft=new mt(q,rt);ft.position.set(I,R+5.1,F),ft.castShadow=!0,k.add(ft),a.push(z=>{rt.userData.sh&&(rt.userData.sh.uniforms.uTime.value=z)})}G(S.grandstandX0+8,17,S.grandstandZ+16,15282981,s),G(S.grandstandX1-8,17,S.grandstandZ+16,16118766,s);let J=new de;J.name="clouds",s.add(J);{let I=Math.round(22*Math.max(.5,n));for(let R=0;R<I;R++){let F=new Ys({map:Uh(R+3),transparent:!0,depthWrite:!1,fog:!1,opacity:.85}),D=new to(F),k=o()*Math.PI*2,Y=900+o()*1300;D.position.set(Math.cos(k)*Y,220+o()*260,Math.sin(k)*Y);let q=380+o()*420;D.scale.set(q,q*.42,1),D.userData.v=.6+o()*1.2,J.add(D)}a.push((R,F)=>{for(let D of J.children)D.position.x+=D.userData.v*F*2.2,D.position.x>2400&&(D.position.x=-2400)})}return{root:s,materials:l,layout:S,track:r,update(I,R){for(let F of a)F(I,R)}}}function U0(i,t,[e,n],s,r){let o=i.length,a=[],c=[],l=[],h=0;for(let d=e;d<=n;d++){let u=(d%o+o)%o,g=i[u],_=i[(u+1)%o],m=i[(u-1+o)%o],p=_.x-m.x,w=_.y-m.y,v=Math.hypot(p,w)||1;p/=v,w/=v;let x=-w,S=p,T=t(u);d>e&&(h+=Math.hypot(g.x-i[((d-1)%o+o)%o].x,g.y-i[((d-1)%o+o)%o].y)),a.push(g.x+x*T,0,g.y+S*T,g.x+x*T,s,g.y+S*T),c.push(h*r,0,h*r,1)}for(let d=0;d<n-e;d++){let u=d*2;l.push(u,u+2,u+1,u+1,u+2,u+3)}let f=new fe;return f.setAttribute("position",new Gt(a,3)),f.setAttribute("uv",new Gt(c,2)),f.setIndex(l),f.computeVertexNormals(),f}var kh=null,Wh=()=>kh||(kh=new ve({map:Ss(256,128,{alpha:.75}),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})),Vh=(i,t,e)=>{let n=new mt(new gs(i,t,6,12),e);return n.castShadow=!0,n};function Ai({suit:i=15282981,trim:t=1842721,skin:e=13081468,helmet:n=!1,pose:s="stand"}={}){let r=new de,o=new Pt({color:i,roughness:.7}),a=new Pt({color:t,roughness:.8}),c=new Pt({color:e,roughness:.8}),l=new de;r.add(l);let h=Vh(.17,.42,o);h.position.y=.32,l.add(h);let f=new mt(new me(.175,.175,.07,16),a);f.position.y=.06,l.add(f);let d=new de;if(d.position.y=.78,l.add(d),n){let v=new mt(new ze(.15,20,16),new Pt({color:16118766,roughness:.25,metalness:.1}));v.castShadow=!0,d.add(v);let x=new mt(new ze(.151,20,10,-.9,1.8,1.25,.5),new Pt({color:1842721,roughness:.1,metalness:.6}));d.add(x);let S=new mt(new xs(.12,.012,6,24,Math.PI),new Pt({color:15282981,roughness:.5}));S.rotation.y=Math.PI/2,S.position.y=.03,d.add(S)}else{let v=new mt(new ze(.12,18,14),c);v.castShadow=!0,d.add(v);let x=new mt(new ze(.125,18,8,0,Math.PI*2,0,1.3),a);x.position.y=.02,d.add(x);let S=new mt(new me(.08,.08,.015,16,1,!1,-1.2,2.4),a);S.position.set(.08,.02,0),d.add(S)}let u=(v,x,S)=>{let T=new de,C=Vh(v,x,S);return C.position.y=-x/2-v,T.add(C),T},g=u(.055,.5,o),_=u(.055,.5,o);g.position.set(0,.58,.22),_.position.set(0,.58,-.22),l.add(g,_);for(let v of[g,_]){let x=new mt(new ze(.05,10,8),c);x.position.y=-.68,v.add(x)}let m=u(.075,.7,o),p=u(.075,.7,o);m.position.set(0,0,.1),p.position.set(0,0,-.1),l.add(m,p);for(let v of[m,p]){let x=new mt(new ye(.24,.08,.1),a);x.position.set(.05,-.9,0),v.add(x)}if(l.position.y=.97,s==="kneel")l.position.y=.55,l.rotation.z=-.25,m.rotation.z=1.45,p.rotation.z=.2,p.position.x=-.05,g.rotation.z=1.1,_.rotation.z=.9,_.rotation.x=.2;else if(s==="helmet")g.rotation.z=2.3,_.rotation.z=2.3,g.rotation.x=-.35,_.rotation.x=.35;else if(s==="carryHelmet"){_.rotation.z=.55,_.rotation.x=.12,g.rotation.x=-.08;let v=new de,x=new mt(new ze(.15,20,16),new Pt({color:16118766,roughness:.25,metalness:.1}));x.castShadow=!0,v.add(x);let S=new mt(new ze(.152,20,10,-.9,1.8,1.25,.5),new Pt({color:1842721,roughness:.1,metalness:.6}));v.add(S);let T=new mt(new xs(.12,.012,6,24,Math.PI),new Pt({color:15282981,roughness:.5}));T.rotation.y=Math.PI/2,T.position.y=.03,v.add(T),v.position.set(.1,-.78,0),v.rotation.z=-.5,_.add(v)}else g.rotation.x=-.1,_.rotation.x=.1;let w=new mt(new xe(1.1,1.1),Wh());return w.rotation.x=-Math.PI/2,w.position.y=.055,w.renderOrder=1,r.add(w),r.userData={hip:l,armL:g,armR:_,head:d},r}function or(i){let t=i.map(r=>r[0]),e=i.map(r=>r[1]),n=i.length,s=e.map((r,o)=>o===0?(e[1]-e[0])/(t[1]-t[0]):o===n-1?(e[n-1]-e[n-2])/(t[n-1]-t[n-2]):(e[o+1]-e[o-1])/(t[o+1]-t[o-1]));return r=>{if(r<=t[0])return e[0];if(r>=t[n-1])return e[n-1];let o=0;for(;r>t[o+1];)o++;let a=t[o+1]-t[o],c=(r-t[o])/a,l=c*c,h=l*c;return(2*h-3*l+1)*e[o]+(h-2*l+c)*a*s[o]+(-2*h+3*l)*e[o+1]+(h-l)*a*s[o+1]}}function Hc(i,t,e,n=56,s=36){let r=[],o=[];for(let c=0;c<=n;c++){let l=i+(t-i)*c/n,h=e(l),f=(h.top+h.bot)/2,d=Math.max(.001,(h.top-h.bot)/2);for(let u=0;u<=s;u++){let g=-Math.PI/2+Math.PI*2*u/s,_=Math.cos(g),m=Math.sin(g),p=m>=0,w=p?f+d*Math.pow(Math.abs(m),2/h.nUp):f-d*Math.pow(Math.abs(m),2/h.nLo),v=h.hw*Math.sign(_)*Math.pow(Math.abs(_),2/(p?h.nUp:h.nLo))*(p?1-(h.tumble||0)*m*m:1);r.push(l,w,v)}}for(let c=0;c<n;c++)for(let l=0;l<s;l++){let h=c*(s+1)+l,f=h+s+1;o.push(h,f,h+1,h+1,f,f+1)}let a=new fe;return a.setAttribute("position",new Gt(r,3)),a.setIndex(o),a.computeVertexNormals(),a}var Xh={classic:{L:4.25,wb:2.4,R:.31,track:1.34,tyreW:.19,chrome:!0,top:[[-2.13,.56],[-2.05,.7],[-1.7,.8],[-1,.84],[-.3,.86],[.2,.84],[.9,.8],[1.6,.74],[2,.63],[2.13,.5]],sill:[[-2.13,.44],[-2,.3],[-1.6,.22],[1.6,.22],[2,.3],[2.13,.42]],hw:[[-2.13,.5],[-2,.74],[-1.6,.81],[-1.2,.83],[0,.79],[1.2,.83],[1.7,.8],[2.05,.66],[2.13,.44]],nUp:2.4,nLo:5,tumble:.1,cabin:{x0:-1.05,x1:.6,roof:[[-1.05,.84],[-.62,1.1],[-.15,1.19],[.2,1.17],[.6,.86]],belt:.8,hw:[[-1.05,.6],[-.3,.67],[.3,.67],[.6,.62]]}},gt:{L:4.6,wb:2.7,R:.34,track:1.62,tyreW:.3,wing:[-2.02,1.3,1.8],top:[[-2.3,.78],[-2.1,.88],[-1.5,.93],[-.8,.9],[0,.86],[.8,.8],[1.5,.7],[2,.57],[2.3,.38]],sill:[[-2.3,.5],[-2.15,.3],[-1.8,.13],[1.8,.13],[2.2,.15],[2.3,.2]],hw:[[-2.3,.8],[-2,.97],[-1.35,1],[-.5,.9],[.5,.88],[1.35,.99],[2,.93],[2.3,.7]],nUp:3,nLo:6,tumble:.16,cabin:{x0:-1.25,x1:.78,roof:[[-1.25,.9],[-.7,1.19],[-.1,1.24],[.28,1.2],[.78,.84]],belt:.84,hw:[[-1.25,.6],[-.4,.68],[.3,.66],[.78,.58]]}},proto:{L:4.75,wb:2.9,R:.35,track:1.64,tyreW:.32,wing:[-2.2,1.02,1.9],fin:!0,top:[[-2.37,.8],[-2.2,.92],[-1.7,.95],[-1.2,.9],[-.6,.82],[0,.74],[.8,.7],[1.6,.64],[2.1,.5],[2.37,.3]],sill:[[-2.37,.5],[-2.2,.25],[-1.8,.1],[1.9,.1],[2.37,.15]],hw:[[-2.37,.9],[-2.1,1],[-1.45,1],[-.8,.9],[0,.93],[.8,.93],[1.45,1],[2.1,.95],[2.37,.74]],nUp:3.2,nLo:6,tumble:.2,cabin:{x0:-1.05,x1:.8,roof:[[-1.05,.8],[-.5,1.08],[0,1.13],[.4,1.07],[.8,.72]],belt:.74,hw:[[-1.05,.38],[-.3,.5],[.3,.5],[.8,.36]]}}},Gh={},Ti=(i,t)=>Gh[i]||(Gh[i]=t());function N0(i,t){let e=Xh[i],n=new de,s=new _s({color:t,roughness:.32,metalness:e.chrome?.2:.35,clearcoat:.8,clearcoatRoughness:.14}),r=Ti("glass",()=>new Pt({color:2766400,roughness:.05,metalness:.85,envMapIntensity:1.6})),o=Ti("dark",()=>new Pt({color:789775,roughness:.8,side:Ee})),a=Ti("carbon",()=>new Pt({color:1711135,roughness:.45,metalness:.4})),c=Ti("chrome",()=>new Pt({color:14804456,roughness:.14,metalness:1})),l=Ti("lamp",()=>new Pt({color:16184038,roughness:.15,metalness:.2,emissive:6972501,emissiveIntensity:.3})),h=Ti("tyre",()=>new Pt({color:1513498,roughness:.92})),f=e.chrome?c:Ti("rim",()=>new Pt({color:2764081,roughness:.32,metalness:.85})),d=[e.wb/2,-e.wb/2],u=e.R+.07,g=or(e.top),_=or(e.sill),m=or(e.hw),p=R=>{let F=-1;for(let D of d){let k=Math.abs(R-D);k<u&&(F=Math.max(F,e.R+Math.sqrt(u*u-k*k)*.97))}return F},w=Hc(e.top[0][0],e.top[e.top.length-1][0],R=>({top:g(R),bot:Math.min(g(R)-.08,Math.max(_(R),p(R))),hw:m(R),nUp:e.nUp,nLo:e.nLo,tumble:e.tumble}),90,40),v=new mt(w,s);v.castShadow=!0,v.receiveShadow=!0,n.add(v);let x=e.cabin,S=or(x.roof),T=or(x.hw),C=Hc(x.x0,x.x1,R=>({top:S(R),bot:x.belt-.03,hw:T(R),nUp:2.3,nLo:8,tumble:.1}),40,32),U=new mt(C,r);U.castShadow=!0,n.add(U);let b=x.x0+(x.x1-x.x0)*.17,M=x.x0+(x.x1-x.x0)*.76,N=Hc(b,M,R=>{let F=Math.min(1,Math.min(R-b,M-R)/.12);return{top:S(R)+.012,bot:S(R)-.03-.05*F,hw:T(R)*(.84+.14*F),nUp:2.6,nLo:3,tumble:.1}},24,24),Z=new mt(N,s);Z.castShadow=!0,n.add(Z);for(let R of d){let F=new mt(new me(u*.98,u*.98,e.track+e.tyreW-.05,24,1,!0,Math.PI*.5,Math.PI),o);F.rotation.x=Math.PI/2,F.position.set(R,e.R,0),n.add(F);for(let D of[-1,1]){let k=new de;k.position.set(R,e.R,D*e.track/2),n.add(k);let Y=new mt(new me(e.R,e.R,e.tyreW,28),h);Y.rotation.x=Math.PI/2,Y.castShadow=!0,k.add(Y);let q=new mt(new me(e.R*.68,e.R*.68,e.tyreW+.012,24),f);q.rotation.x=Math.PI/2,k.add(q);let rt=new mt(new me(e.R*.22,e.R*.26,e.tyreW+.03,16),e.chrome?o:c);rt.rotation.x=Math.PI/2,k.add(rt)}}let G=e.top[e.top.length-1][0],J=e.top[0][0];if(e.chrome){for(let[F,D,k]of[[G-.02,.4,1.36],[J+.02,.44,1.3]]){let Y=new mt(new gs(.045,k,4,10),c);Y.rotation.x=Math.PI/2,Y.position.set(F,D,0),Y.castShadow=!0,n.add(Y)}for(let F of[-1,1]){let D=new mt(new ze(.085,18,12,0,Math.PI),l);D.rotation.y=Math.PI/2,D.position.set(G-.14,.6,F*.52),n.add(D);let k=new mt(new xs(.088,.012,6,22),c);k.rotation.y=Math.PI/2,k.position.set(G-.13,.6,F*.52),n.add(k)}let R=new mt(new gs(.07,.36,4,10),o);R.rotation.x=Math.PI/2,R.position.set(G-.03,.5,0),n.add(R)}else{let R=new mt(new ye(.5,.025,1.9),a);R.position.set(G-.22,.1,0),n.add(R);for(let q of[-1,1]){let rt=new mt(new ye(.18,.035,.36),l);rt.position.set(G-.32,g(G-.32)-.04,q*.62),rt.rotation.z=-.35,n.add(rt)}let[F,D,k]=e.wing,Y=new mt(new ye(.36,.03,k),a);Y.position.set(F,D,0),Y.rotation.z=.08,Y.castShadow=!0,n.add(Y);for(let q of[-1,1]){let rt=new mt(new ye(.44,.22,.015),a);rt.position.set(F,D-.05,q*k/2),n.add(rt);let ft=new mt(new ye(.05,D-g(F)+.05,.02),a);ft.position.set(F+.06,(D+g(F))/2,q*.38),n.add(ft)}if(e.fin){let q=new mt(new ye(1.1,.26,.018),s);q.position.set(-1.55,g(-1.55)+.11,0),n.add(q)}}let I=new mt(new xe(e.L*1.2,(e.track+.7)*1.25),Wh());return I.rotation.x=-Math.PI/2,I.position.y=.055,I.renderOrder=1,n.add(I),n}function qh(i="gt",t=16118766){return N0(Xh[i]?i:"gt",t)}var F0=15282981;function O0(i,t,e){let n=[],r=l=>l,o=[[e+.01,-t/2+.018],[e+.05,-t/2-.004],[i-.09,-t/2-.012],[i-.035,-t/2-.006],[i-.008,-t/2+.02],[i,-t/2+.055],[i+.002,0],[i,t/2-.055],[i-.008,t/2-.02],[i-.035,t/2+.006],[i-.09,t/2+.012],[e+.05,t/2+.004],[e+.01,t/2-.018]],a=new ms(o.map(([l,h])=>new dt(l,h)));for(let l of a.getPoints(60))n.push(new dt(l.x,l.y));let c=new $s(n,64);return c.rotateX(Math.PI/2),c}function B0(i,t=10){let e=new Dn;e.absarc(0,0,i,0,Math.PI*2,!1);let n=i*.86,s=i*.32,r=Math.PI*2/t;for(let a=0;a<t;a++){let c=a*r+r*.17,l=(a+1)*r-r*.17,h=new vi;h.moveTo(Math.cos(c)*s*1.25,Math.sin(c)*s*1.25),h.absarc(0,0,n,c+.04,l-.04,!1),h.lineTo(Math.cos(l)*s*1.25,Math.sin(l)*s*1.25),h.closePath(),e.holes.push(h)}let o=new ao(e,{depth:.035,bevelEnabled:!0,bevelThickness:.008,bevelSize:.006,bevelSegments:2,curveSegments:40});return o.translate(0,0,-.035),o}function z0({r:i=.41,w:t=.33,front:e=!1,side:n=1,mats:s}){let r=i*.69,o=new de,a=new de;o.add(a);let c=n,l=new mt(O0(i,t,r),s.rubber);l.castShadow=!0,a.add(l);let h=new mt(B0(r*.985),s.rim);h.castShadow=!0,h.position.z=c*(t/2-.045),c<0&&(h.rotation.y=Math.PI),a.add(h);let f=new mt(new me(r*.99,r*.99,t*.9,40,1,!0),s.barrel);f.rotation.x=Math.PI/2,a.add(f);let d=new mt(new me(.05,.058,.06,6),s.nut);d.rotation.x=Math.PI/2,d.position.z=c*(t/2-.02),a.add(d);let u=new mt(new me(r*.82,r*.82,.032,48),s.disc);u.rotation.x=Math.PI/2,u.position.z=c*(t/2-.13),a.add(u);let g=new mt(new jn(r*.985,48),s.blur);g.position.z=c*(t/2-.028),c<0&&(g.rotation.y=Math.PI),g.renderOrder=3,o.add(g);let _=new mt(new jn(r*.99,40),s.dark);_.position.z=c*(t/2-.2),c<0&&(_.rotation.y=Math.PI),a.add(_);let m=new mt(new ye(.2,.11,.07,2,2,2),s.caliper),p=e?.55:Math.PI-.55;return m.position.set(Math.cos(p)*r*.66,Math.sin(p)*r*.66,c*(t/2-.105)),m.rotation.z=p-Math.PI/2,o.add(m),{steer:o,spin:a,r:i,blur:g}}function H0(){let i=document.createElement("canvas");i.width=i.height=256;let t=i.getContext("2d"),e=128,n=t.createRadialGradient(e,e,0,e,e,e);n.addColorStop(0,"rgba(150,156,162,1)"),n.addColorStop(.18,"rgba(70,74,79,.95)"),n.addColorStop(.32,"rgba(48,51,55,.75)"),n.addColorStop(.7,"rgba(58,61,66,.62)"),n.addColorStop(.86,"rgba(92,96,101,.8)"),n.addColorStop(.95,"rgba(36,38,41,.95)"),n.addColorStop(1,"rgba(20,21,23,1)"),t.fillStyle=n,t.beginPath(),t.arc(e,e,e,0,Math.PI*2),t.fill();let s=new Qn(i);return s.colorSpace=we,s}function k0(){return{rubber:new Pt({color:1513498,roughness:.93,metalness:0}),rim:new Pt({color:2369066,roughness:.32,metalness:.85}),barrel:new Pt({color:1052947,roughness:.6,metalness:.5,side:Ee}),nut:new Pt({color:10200234,roughness:.3,metalness:1}),disc:new Pt({color:6053990,roughness:.45,metalness:.9}),caliper:new Pt({color:F0,roughness:.45,metalness:.15}),dark:new ve({color:328966}),well:new ve({color:394759,side:Ee}),blur:new Pt({map:H0(),transparent:!0,opacity:0,roughness:.35,metalness:.75,depthWrite:!1})}}async function V0(i,t){let e=i.slice(0,i.lastIndexOf("/")+1),n=await(await fetch(i)).json();t&&t({loaded:1,total:2});let s=new fe;s.setAttribute("position",new Gt(n.position,3)),s.setAttribute("uv",new Gt(n.uv,2)),s.setIndex(n.index);let r=new ho,o=async(g,_)=>{let m=await r.loadAsync(e+g);return m.flipY=!1,m.wrapS=m.wrapT=gi,_&&(m.colorSpace=we),m},a=n.material,[c,l,h]=await Promise.all([o(a.map,!0),o(a.normalMap),o(a.metalRoughMap)]);t&&t({loaded:2,total:2});let f=new Pt({map:c,normalMap:l,roughnessMap:h,metalnessMap:h,metalness:a.metalness,roughness:a.roughness,flatShading:!0});f.normalScale.set(1,-1);let d=new mt(s,f);d.name=n.name;let u=new de;return u.add(d),u}function G0(i,t){let e=i.index?i.toNonIndexed():i,n=e.attributes.position.array,s=n.length/9,r=Math.cos(t),o=new Float32Array(s*3),a=new Float32Array(s*3),c=new Array(s*3),l=new Map,h=d=>Math.round(n[d]*1e4)+","+Math.round(n[d+1]*1e4)+","+Math.round(n[d+2]*1e4);for(let d=0;d<s;d++){let u=d*9,g=n[u+3]-n[u],_=n[u+4]-n[u+1],m=n[u+5]-n[u+2],p=n[u+6]-n[u],w=n[u+7]-n[u+1],v=n[u+8]-n[u+2],x=_*v-m*w,S=m*p-g*v,T=g*w-_*p,C=Math.hypot(x,S,T)||1;o[d*3]=x,o[d*3+1]=S,o[d*3+2]=T,a[d*3]=x/C,a[d*3+1]=S/C,a[d*3+2]=T/C;for(let U=0;U<3;U++){let b=h(u+U*3);c[d*3+U]=b;let M=l.get(b);M||l.set(b,M=[]),M.push(d)}}let f=new Float32Array(n.length);for(let d=0;d<s;d++)for(let u=0;u<3;u++){let g=0,_=0,m=0;for(let v of l.get(c[d*3+u]))a[d*3]*a[v*3]+a[d*3+1]*a[v*3+1]+a[d*3+2]*a[v*3+2]>=r&&(g+=o[v*3],_+=o[v*3+1],m+=o[v*3+2]);let p=Math.hypot(g,_,m)||1,w=(d*3+u)*3;f[w]=g/p,f[w+1]=_/p,f[w+2]=m/p}return e.setAttribute("normal",new Pe(f,3)),e}async function Yh(i,t,{onProgress:e,quality:n="high"}={}){let s=/\.json$/.test(i)?await V0(i,e):null,r=new de;r.name="hero-car";let o=new de;r.add(o),s.traverse(u=>{if(u.isMesh){u.castShadow=!0,u.receiveShadow=!0;let g=u.material;u.geometry.attributes.normal||(u.geometry=G0(u.geometry,sr.degToRad(50)),g.flatShading=!1),n!=="low"&&!g.isMeshPhysicalMaterial&&(g=u.material=new _s({map:g.map,normalMap:g.normalMap,normalScale:g.normalScale.clone(),roughnessMap:g.roughnessMap,metalnessMap:g.metalnessMap,metalness:g.metalness,roughness:g.roughness,color:g.color,clearcoat:.32,clearcoatRoughness:.14})),g.envMapIntensity=1,g.normalScale&&g.normalScale.set(.6,g.normalScale.y<0?-.6:.6),g.needsUpdate=!0}}),o.add(s);let a=k0(),c={};for(let u of["FL","FR","RL","RR"]){let g=t[u],_=u[0]==="F",m=u[1]==="R"?1:-1,p=z0({r:g.r,w:.34,front:_,side:m,mats:a}),w=m*.86;p.steer.position.set(g.x,g.r,w),r.add(p.steer);let v=new mt(new me(g.r*1.07,g.r*1.07,.5,40,1,!0,Math.PI*.42,Math.PI*1.16),a.well);v.rotation.x=Math.PI/2,v.rotation.y=0,v.position.set(g.x,g.y,m*.78),o.add(v);let x=new mt(new jn(g.r*1.07,40,-Math.PI*.08,Math.PI*1.16),a.well);x.position.set(g.x,g.y,m*.53),o.add(x),c[u]=p}let l=new ve({map:Ss(256,128,{alpha:.8}),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),h=new mt(new xe(5.5,2.75),l);h.rotation.x=-Math.PI/2,h.position.set(0,.055,0),h.renderOrder=1,h.userData.noMask=!0,r.add(h);let f=new ve({map:Mo(),transparent:!0,depthWrite:!1,opacity:.9,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3});for(let u in c){let g=new mt(new xe(.95,.62),f);g.rotation.x=-Math.PI/2,g.position.set(c[u].steer.position.x,.06,c[u].steer.position.z),g.renderOrder=2,g.userData.noMask=!0,r.add(g)}return{root:r,chassis:o,body:s,wheels:c,pose({dist:u=0,steer:g=0,pitch:_=0,roll:m=0,heave:p=0,speed:w=0}={}){a.blur.opacity=Math.min(.94,Math.max(0,(w-5)/16)),a.blur.visible=a.blur.opacity>.01;for(let v in c){let x=c[v];x.spin.rotation.z=-u/x.r,v[0]==="F"&&(x.steer.rotation.y=g)}o.rotation.set(m,0,_),o.position.y=p}}}var Eo=[{t:0,sunEl:15,sunAz:110,sun:16769216,sunI:3.6,sky:13622502,gnd:5792846,hemiI:.92,zen:8368344,hor:15199985,fog:14674156,exp:1.04},{t:.45,sunEl:52,sunAz:175,sun:16774632,sunI:3.9,sky:14082794,gnd:6187602,hemiI:.98,zen:6135510,hor:14279913,fog:14279913,exp:1},{t:.75,sunEl:26,sunAz:238,sun:16769724,sunI:3.7,sky:14409954,gnd:6055248,hemiI:.9,zen:7184334,hor:15131610,fog:14869212,exp:1},{t:1,sunEl:7,sunAz:262,sun:16755036,sunI:3.7,sky:15780258,gnd:5919300,hemiI:.72,zen:7045291,hor:15974283,fog:15385500,exp:1.08}],W0=new kt,X0=new kt;function q0(i){let t=0;for(;t<Eo.length-2&&i>Eo[t+1].t;)t++;let e=Eo[t],n=Eo[t+1],s=wi(pe((i-e.t)/(n.t-e.t),0,1)),r=a=>W0.set(e[a]).lerp(X0.set(n[a]),s).getHex(),o={};for(let a of Object.keys(e))o[a]=typeof e[a]=="number"&&!["sun","sky","gnd","zen","hor","fog"].includes(a)?Mn(e[a],n[a],s):r(a);return o}function Y0(i){let t=So,e=[],n=(o,a)=>e.push(new L(o,0,a));n(560,206),n(470,206),n(400,206),n(330,206),n(290,205),n(250,201),n(215,196.5),n(170,194.4),n(80,194.2),n(10,194.2),n(-28,193.2),n(-48,190.4),n(-60,189.2),n(-74,189.4),n(-98,191.6),n(-140,194.2),n(-220,194.4),n(-292,194.6),n(-340,197.4),n(-392,201.2),n(-440,204.6),n(-490,205.8);let s=i.length;for(let o=3;o<=286;o+=3){let a=i[o%s];n(a[0],a[1])}n(-64,61),n(-61,78),n(-56,96),n(-44,112),n(-26,121),n(-8,124.5),n(14,126),n(48,132),n(76,146),n(86,166),n(84,182),n(74,189.8),n(56,192.4),n(34,192.6),n(18,192.6),n(4,192.6);let r=new ps(e,!1,"centripetal",.5);return r.arcLengthDivisions=16e3,r}function kc(i,t,e){let n=i.length;if(e<=0)return(t[1]-t[0])/(i[1]-i[0]);if(e>=n-1)return(t[n-1]-t[n-2])/(i[n-1]-i[n-2]);let s=(t[e]-t[e-1])/(i[e]-i[e-1]),r=(t[e+1]-t[e])/(i[e+1]-i[e]);if(s*r<=0)return 0;let o=i[e]-i[e-1],a=i[e+1]-i[e],c=2*a+o,l=a+2*o;return(c+l)/(c/s+l/r)}function Zh(i,t,e,n,s,r,o){let a=t-i,c=(o-i)/a,l=c*c,h=l*c;return(2*h-3*l+1)*e+(h-2*l+c)*a*s+(3*l-2*h)*n+(h-l)*a*r}function Ri(i,t,e){let s=i.getLength(),r=0,o=1e9,a=new L;for(let c=0;c<=4e3;c++){i.getPointAt(c/4e3,a);let l=(a.x-t)**2+(a.z-e)**2;l<o&&(o=l,r=c/4e3)}return r*s}async function fx({canvas:i,trackUrl:t,carUrl:e,carMetaUrl:n,quality:s="high",onProgress:r=()=>{}}){let o=new Kr({canvas:i,antialias:s!=="low",powerPreference:"high-performance",alpha:!1}),Rc=s==="high"?2:s==="mid"?1.75:1,Rk=1;o.setPixelRatio(1),o.toneMapping=Ac,o.outputColorSpace=we,o.shadowMap.enabled=s!=="low",o.shadowMap.type=Tc;let c=new fs;c.fog=new Qr(14279913,140,3300);let l=new Fe(36,1,.3,9e3),h=new Ke({side:Oe,depthWrite:!1,fog:!1,uniforms:{zen:{value:new kt},hor:{value:new kt},sunDir:{value:new L},sunCol:{value:new kt},skyGain:{value:1}},vertexShader:"varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",fragmentShader:`uniform vec3 zen, hor, sunCol; uniform vec3 sunDir; uniform float skyGain; varying vec3 vP;
      void main(){ float h = clamp(vP.y, -.2, 1.); float k = pow(clamp(h, 0., 1.), .55);
        vec3 c = mix(hor, zen, k);
        float s = max(dot(normalize(vP), normalize(sunDir)), 0.);
        c += sunCol * (pow(s, 380.) * 2.2 + pow(s, 12.) * .22 + pow(s, 3.) * .06 * (1. - k));
        c = mix(c, hor * .92, smoothstep(0., -.2, vP.y));
        gl_FragColor = vec4(c * skyGain + (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - .5) / 255., 1.);
      }`}),f=new mt(new ze(8e3,32,16),h);c.add(f);let d=new uo(14279913,6187602,1);c.add(d);let u=new mo(16777215,3);u.castShadow=o.shadowMap.enabled,u.shadow.mapSize.setScalar(s==="high"&&o.capabilities.maxTextureSize>=8192?4096:2048),Object.assign(u.shadow.camera,{left:-70,right:70,top:70,bottom:-70,near:10,far:900}),u.shadow.bias=-4e-4,u.shadow.normalBias=.04,u.shadow.radius=4,c.add(u,u.target);let g=new us(o),_=new fs,m=new mt(new ze(100,32,16),h);_.add(m);let p=new mt(new jn(90,32),new ve({color:5595212}));p.rotation.x=-Math.PI/2,p.position.y=-8,_.add(p);let w=new Ws(s==="high"?256:128,{type:ti,generateMipmaps:!1}),v=new Gs(.1,200,w),x=s==="high"?.025:.04,S=null,T=-1,C=xt=>{let Ut=h.uniforms.skyGain.value;h.uniforms.skyGain.value=1,v.update(o,_),S=g.fromCubemap(w.texture,S),c.environment=S.texture,T=xt,h.uniforms.skyGain.value=Ut},U=s==="high",b=null;if(U)try{let xt=new en(4,4,{type:ti,samples:4});xt.depthTexture=new ds(4,4);let Ut=new en(4,4),y=new Ke({depthTest:!1,depthWrite:!1,uniforms:{tColor:{value:xt.texture},tDepth:{value:xt.depthTexture},tMask:{value:Ut.texture},uInvVP:{value:new Qt},uPrevVP:{value:new Qt},uAmt:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }",fragmentShader:`uniform sampler2D tColor, tDepth, tMask; uniform mat4 uInvVP, uPrevVP; uniform float uAmt; varying vec2 vUv;
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
          }`}),O=new mt(new xe(2,2),y);O.frustumCulled=!1;let V=new fs;V.add(O),b={rt:xt,maskRT:Ut,mat:y,pScene:V,pCam:new hs(-1,1,1,-1,0,1),maskMat:new ve({color:16777215,fog:!1}),vp:new Qt,prev:new Qt,size:new dt,ok:!0}}catch{b=null}let[M,N]=await Promise.all([fetch(t).then(xt=>xt.json()),fetch(n).then(xt=>xt.json())]);r(.15);let Z=Hh(M.pts,{quality:s,renderer:o});c.add(Z.root),r(.35);let G=await Yh(e,N,{quality:s,onProgress:xt=>xt.total&&r(.35+.55*xt.loaded/xt.total)});c.add(G.root),G.root.traverse(xt=>{xt.isMesh&&!xt.userData.noMask&&xt.layers.enable(1)}),r(.92);let J=M.pts.map(([xt,Ut])=>new L(xt,.6,Ut));J.push(J[0].clone());let I=new co(new ps(J,!0),1200,1.9,6,!0),R=new ve({color:15282981,transparent:!0,opacity:0,depthWrite:!1,fog:!1}),F=new mt(I,R);F.renderOrder=5,c.add(F);let D=I.index.count,k=Z.root.userData.openBox,Y=Ai({suit:2830390,trim:15282981,pose:"kneel"}),q=Ai({suit:16118766,trim:15282981,skin:12159595,pose:"carryHelmet"}),rt=Ai({suit:2830390,trim:10200234,pose:"stand"});c.add(Y,q,rt);let ft=[["classic",11740702,-7.3,121.3,.02],["classic",3038539,-7.5,118.1,-.03],["classic",15788760,-7.2,114.9,.01],["gt",1842721,-7.4,111.7,-.02],["classic",9414584,-7.3,108.5,.03],["proto",15282981,-41,141.5,.02],["gt",10200234,-58,141,0],["proto",2833493,-64,120,Math.PI],["classic",9071422,-74,126,1.5],["gt",16118766,26,108,Math.PI-.05]];for(let[xt,Ut,y,O,V]of ft){let W=qh(xt,Ut);W.position.set(y,0,O),W.rotation.y=V,c.add(W)}let z=[[Ai({suit:3817544,trim:16118766,skin:13738883}),-3.7,119.9,Math.PI+.25],[Ai({suit:15131612,trim:6648666,skin:10251086}),-3.3,118.8,Math.PI-.5],[Ai({suit:6648666,trim:1842721,skin:13081468}),-11.8,113.6,.3]];for(let[xt,Ut,y,O]of z)xt.position.set(Ut,0,y),xt.rotation.y=O,c.add(xt);let $=Y0(M.pts),it=$.getLength(),j={intro:0,s1:Ri($,330,206),s2:Ri($,-60,189.2),pitOut:Ri($,-392,201.2),t1:Ri($,M.pts[6][0],M.pts[6][1]),t2:Ri($,M.pts[96][0],M.pts[96][1]),s4:Ri($,-8,124.5),s5:Ri($,18,192.6)},yt=[[0,j.s1],[.085,j.s1+4],[.2,j.s2],[.315,j.s2+.3],[.34,j.s2+40],[.425,j.t1],[.56,j.t2],[.665,j.s4],[.79,j.s4+1.5],[.885,j.s5],[1,j.s5+3]],Ht=[.425,.56],Dt=yt.map(xt=>xt[0]),Wt=yt.map(xt=>xt[1]),tt=yt.map((xt,Ut)=>kc(Dt,Wt,Ut)),st=xt=>{let Ut=pe(xt,0,1),y=0;for(;y<yt.length-2&&Ut>Dt[y+1];)y++;return Zh(Dt[y],Dt[y+1],Wt[y],Wt[y+1],tt[y],tt[y+1],Ut)},P=[0,.2,.425,.665,.885],wt=xt=>xt<.2?Mn(0,.12,xt/.2):xt<.56?Mn(.12,.45,(xt-.2)/.36):xt<.8?Mn(.45,.78,(xt-.56)/.24):Mn(.78,1,wi(pe((xt-.8)/.085,0,1))),at=new L,gt=new L(0,1,0),lt={p:new L,f:new L,r:new L},bt=(xt,Ut,y)=>({rel:[xt,Ut,y]}),ht=(xt,Ut,y)=>({abs:[xt,Ut,y]}),A=[{u:0,pos:ht(321.2,.7,211.4),tgt:ht(330,.95,205.7),fov:34},{u:.085,pos:ht(320.2,.74,211.6),tgt:ht(326.2,.92,205.8),fov:34},{u:.115,pos:bt(-1.5,1.25,-5.5),tgt:bt(.5,.85,0),fov:38},{u:.15,pos:bt(-9,2.4,-7),tgt:bt(3,.8,0),fov:38},{u:.18,pos:bt(-5.5,1.8,-7.2),tgt:bt(1,.9,0),fov:39},{u:.2,pos:ht(-65.3,1.5,197.5),tgt:ht(-58.3,1,187),fov:40},{u:.315,pos:ht(-64.6,1.55,197.3),tgt:ht(-58.4,1,187.1),fov:40},{u:.345,pos:ht(-120,60,330),tgt:ht(-140,0,120),fov:44},{u:.375,pos:ht(40,620,560),tgt:ht(-10,0,40),fov:46},{u:.4,pos:ht(-380,220,420),tgt:ht(-520,0,120),fov:42},{u:.425,pos:bt(4,1.6,-11),tgt:bt(.3,.7,0),fov:38},{u:.56,pos:bt(1,1.7,-11.5),tgt:bt(.6,.7,0),fov:38},{u:.59,pos:bt(-12,3.2,-4),tgt:bt(6,1,0),fov:40},{u:.635,pos:bt(-11,3,4),tgt:bt(5,1,0),fov:40},{u:.665,pos:ht(-2.6,1.3,133.4),tgt:ht(-7.8,.75,124.3),fov:36},{u:.79,pos:ht(-1.6,1.32,133),tgt:ht(-6.6,.75,124.3),fov:36},{u:.815,pos:bt(-8,2,5),tgt:bt(3,.9,0),fov:38},{u:.84,pos:bt(-4,2.2,7),tgt:bt(2,.9,0),fov:40},{u:.865,pos:bt(6.5,1.25,4.5),tgt:bt(0,.8,0),fov:37},{u:.885,pos:ht(10.6,1.12,188.4),tgt:ht(18,.8,192.4),fov:36},{u:1,pos:ht(9.2,1.1,188.9),tgt:ht(15.6,.8,192.4),fov:35}],E=(xt,Ut)=>{let y=xt[Ut];if(y.abs)return at.set(...y.abs).clone();let[O,V,W]=y.rel;return lt.p.clone().addScaledVector(lt.f,O).addScaledVector(lt.r,W).setY(V+lt.p.y)},X=A.map(xt=>xt.u),K=[[],[],[],[],[],[],[]];function ct(xt,Ut,y){let O=pe(xt,0,1),V=0;for(;V<A.length-2&&O>X[V+1];)V++;for(let B=Math.max(0,V-1);B<=Math.min(A.length-1,V+2);B++){let pt=E(A[B],"pos"),St=E(A[B],"tgt");K[0][B]=pt.x,K[1][B]=pt.y,K[2][B]=pt.z,K[3][B]=St.x,K[4][B]=St.y,K[5][B]=St.z,K[6][B]=A[B].fov}let W=B=>Zh(X[V],X[V+1],K[B][V],K[B][V+1],kc(X,K[B],V),kc(X,K[B],V+1),O);return Ut.set(W(0),W(1),W(2)),y.set(W(3),W(4),W(5)),W(6)}let et=new L,Lt=new L;function nt(xt,Ut){let y=(u.shadow.camera.right-u.shadow.camera.left)/u.shadow.mapSize.x;et.crossVectors(gt,Ut),et.lengthSq()<1e-8&&et.set(1,0,0),et.normalize(),Lt.crossVectors(Ut,et).normalize();let O=Math.round(xt.dot(et)/y)*y,V=Math.round(xt.dot(Lt)/y)*y,W=xt.dot(Ut);return xt.set(0,0,0).addScaledVector(et,O).addScaledVector(Lt,V).addScaledVector(Ut,W)}let vt=.26,It=0;function ut(xt,Ut,y){let O=2/vt,V=O*y,W=1/(1+V+.48*V*V+.235*V*V*V),B=xt-Ut,pt=(It+O*B)*y;It=(It-O*pt)*W;let St=Ut+(B+pt)*W;return Ut-xt>0==St>Ut&&(St=Ut,It=0),St}let _t=0,Et=0,Ot=0,Ct=!1,$t=performance.now(),Vt=0,se=!1,H=j.s1,Mt=0,Q=0,ot=0,Rt=0,At=0,qt=0,ue=0,Me=new L,ee=new L,He=!1,Qe=!0,ni=0,fn=0,ke=0,ii=0,Ci=0,Rw=0,Rh=0,Rdw=0,Rdh=0,Ro=typeof ResizeObserver=="function"?new ResizeObserver(xt=>{for(let Ut of xt){Rw=Ut.contentRect.width,Rh=Ut.contentRect.height;let y=Ut.devicePixelContentBoxSize&&Ut.devicePixelContentBoxSize[0];Rdw=y?y.inlineSize:0,Rdh=y?y.blockSize:0}}):null,Rob=(()=>{if(Ro)try{Ro.observe(i,{box:"device-pixel-content-box"})}catch{Ro.observe(i)}})(),ar=()=>{if(!Ro||!Rw){let xt=i.getBoundingClientRect();Rw=xt.width,Rh=xt.height}let xt=window.devicePixelRatio||1,Ut=Math.min(xt,Rc)*Rk,y,O;Rdw&&Ut>=xt-.001&&Math.abs(Rdw-Rw*xt)<=2&&Math.abs(Rdh-Rh*xt)<=2?(y=Rdw,O=Rdh):(y=Math.max(1,Math.round(Rw*Ut)),O=Math.max(1,Math.round(Rh*Ut)));(y!==fn||O!==ke)&&(fn=y,ke=O,o.setSize(fn,ke,!1),l.aspect=fn/ke,l.updateProjectionMatrix())},pn={p:new L,t:new L};function si(xt){let Ut=pe(xt/it,0,1);return $.getPointAt(Ut,pn.p),$.getTangentAt(Ut,pn.t),pn}function Ii(xt){let y=si(Math.max(0,xt-2.5)).t.clone(),O=si(Math.min(it,xt+2.5)).t.clone(),V=Math.atan2(y.z,y.x),W=Math.atan2(O.z,O.x);return Math.atan2(Math.sin(W-V),Math.cos(W-V))/(2*2.5)}function Pi(xt){ni=requestAnimationFrame(Pi);let Ut=Math.min(.05,(xt-$t)/1e3);if($t=xt,Vt+=Ut,!Qe)return;ar(),Ct||(Ot+=Ut/2.6,(Ot>=1||_t>.01)&&(Ot=1,Ct=!0)),Et=ut(Et,_t,Ut),se&&(Et=_t,It=0);let y=zh(pe(Ot,0,1)),O=st(Et);Ot<1&&(O=Mn(j.s1-120,O,1-Math.pow(1-pe(Ot,0,1),3)));let V=O-H;H=O,ue+=V;let W=V/Math.max(Ut,.001);Mt+=(W-Mt)*(1-Math.exp(-Ut*5));let B=(Mt-Q)/Math.max(Ut,.001);Q=Mt;let pt=si(O).p.clone(),St=pn.t.clone(),Bt=Math.atan2(-St.z,St.x),Nt=Ii(O),Xt=pe(Math.atan(2.56*Nt)*Math.sign(Mt||1)*1.6,-.5,.5);ot+=(Xt-ot)*(1-Math.exp(-Ut*8));let Yt=pe(Mt*Mt*Nt,-14,14);Rt+=(pe(-Yt*.0045,-.045,.045)-Rt)*(1-Math.exp(-Ut*6)),At+=(pe(-B*.0016,-.03,.03)-At)*(1-Math.exp(-Ut*5)),qt=Math.sin(Vt*13)*.0025*pe(Math.abs(Mt)/30,0,1)+Math.sin(Vt*2.1)*.0015,G.root.position.copy(pt),G.root.rotation.y=Bt,G.pose({dist:ue,steer:ot,roll:Rt,pitch:At,heave:qt,speed:Math.abs(Mt)}),lt.p.copy(pt),lt.f.copy(St).setY(0).normalize(),lt.r.crossVectors(lt.f,gt).normalize();let Ft=1-wi(pe(Math.abs(Et-.26)/.1-.6,0,1));for(let ce of[Y,q,rt])ce.visible=Ft>.01;if(Ft>.01){let ce=si(j.s2).p.clone(),Ve=pn.t,qe=new L(Ve.x,0,Ve.z).normalize(),on=new L().crossVectors(qe,gt);Y.position.copy(ce).addScaledVector(qe,1.3).addScaledVector(on,-1.55),Y.rotation.y=Math.atan2(-on.z,on.x),Y.userData.armR.rotation.z=.9+Math.sin(Vt*2.4)*.12,q.position.copy(ce).addScaledVector(qe,-3.6).addScaledVector(on,1.6),q.rotation.y=Math.atan2(- -on.z,-on.x)+.4,q.userData.head.rotation.y=Math.sin(Vt*.7)*.15,rt.position.set(k.x+1.85,0,k.z-7),rt.rotation.y=Math.atan2(-(ce.z-rt.position.z),ce.x-rt.position.x)}let jt=Et>.6&&Et<.87;for(let[ce]of z)ce.visible=jt;jt&&(z[0][0].userData.head.rotation.y=Math.sin(Vt*.5)*.2);let re=wt(Et),Kt=q0(re),Ce=sr.degToRad(Kt.sunEl),ne=sr.degToRad(Kt.sunAz),zt=new L(Math.sin(ne)*Math.cos(Ce),Math.sin(Ce),-Math.cos(ne)*Math.cos(Ce)).normalize();u.color.set(Kt.sun),u.intensity=Kt.sunI,d.color.set(Kt.sky),d.groundColor.set(Kt.gnd),d.intensity=Kt.hemiI,h.uniforms.zen.value.set(Kt.zen),h.uniforms.hor.value.set(Kt.hor),h.uniforms.sunDir.value.copy(zt),h.uniforms.sunCol.value.set(Kt.sun),c.fog.color.set(Kt.fog),o.toneMappingExposure=Kt.exp,Math.abs(re-T)>x&&C(re);let Le=new L,te=new L,be=ct(Et,Le,te);if(Nn.debugCam&&(Le.set(...Nn.debugCam.pos),te.set(...Nn.debugCam.tgt),be=Nn.debugCam.fov||be),y<1){let ce=new L(346,.5,214.4);Le.lerpVectors(ce,Le,y),be=Mn(30,be,y)}let Fn=Math.sin(Vt*.23)*.12;Le.y+=Fn*.3,Me.copy(Le),ee.copy(te);let De=Math.max(1,Math.sqrt(1.6/l.aspect));De>1&&(be=2*Math.atan(Math.tan(be*Math.PI/360)*Math.min(2.2,De))*180/Math.PI),l.position.copy(Me),l.lookAt(ee),l.fov=be,ii||Ci?l.setViewOffset(fn,ke,-ii*fn,Ci*ke,fn,ke):l.clearViewOffset(),l.updateProjectionMatrix();let mn=ee.clone();Me.y>40&&mn.copy(lt.p),nt(mn,zt),u.position.copy(mn).addScaledVector(zt,400),u.target.position.copy(mn);let ae=pe((Et-.336)/.05,0,1),je=1-pe((Et-.386)/.018,0,1);R.opacity=Math.min(1,ae*4)*je*.95,F.visible=R.opacity>.01,I.setDrawRange(0,Math.floor(D*wi(ae)/3)*3),Z.update(Vt,Ut);let On=b?wi(pe((Et-.39)/.035,0,1))*(1-wi(pe((Et-.565)/.035,0,1))):0;if(l.updateMatrixWorld(),b&&b.vp.multiplyMatrices(l.projectionMatrix,l.matrixWorldInverse),On>.002&&b&&b.ok)try{o.getDrawingBufferSize(b.size);let ce=b.size.x,Ve=b.size.y;(b.rt.width!==ce||b.rt.height!==Ve)&&(b.rt.setSize(ce,Ve),b.maskRT.setSize(ce,Ve)),o.setRenderTarget(b.rt),o.render(c,l);let qe=o.shadowMap.autoUpdate;o.shadowMap.autoUpdate=!1;let on=c.overrideMaterial,Jh=c.background;c.overrideMaterial=b.maskMat,l.layers.set(1),o.setRenderTarget(b.maskRT),o.setClearColor(0,1),o.clear(),o.render(c,l),l.layers.set(0),c.overrideMaterial=on,c.background=Jh,o.shadowMap.autoUpdate=qe,b.mat.uniforms.uInvVP.value.copy(b.vp).invert(),b.mat.uniforms.uPrevVP.value.copy(b.prev),b.mat.uniforms.uAmt.value=On*.35,o.setRenderTarget(null),o.render(b.pScene,b.pCam)}catch{b.ok=!1,o.setRenderTarget(null),o.render(c,l)}else o.render(c,l);b&&b.prev.copy(b.vp)}C(0);let Li=Math.min(s==="high"?16:s==="mid"?8:2,o.capabilities.getMaxAnisotropy());Li>1&&c.traverse(xt=>{if(xt.material)for(let Ut of[].concat(xt.material))for(let y of["map","normalMap","roughnessMap","metalnessMap","aoMap","bumpMap","alphaMap"]){let O=Ut[y];O&&O.isTexture&&!O.isRenderTargetTexture&&O.anisotropy<Li&&(O.anisotropy=Li,O.needsUpdate=!0)}}),c.traverse(xt=>{if(xt.material)for(let Ut of[].concat(xt.material))(Ut.isMeshStandardMaterial||Ut.isMeshBasicMaterial||Ut.isMeshLambertMaterial||Ut.isMeshPhongMaterial)&&(Ut.dithering=!0)}),r(1);let Nn={renderer:o,scene:c,camera:l,car:G,world:Z,STAGES:P,setProgress(xt){_t=pe(xt,0,1)},get progress(){return Et},skipIntro(){Ot=1,Ct=!0},jump(xt){_t=Et=pe(xt,0,1),It=0,H=st(Et),Ot=1,Ct=!0},async warmup(){let xt=[];c.traverse(y=>{y.visible||(xt.push(y),y.visible=!0)});try{o.compileAsync&&o.extensions.has("KHR_parallel_shader_compile")?await o.compileAsync(c,l):o.compile(c,l)}catch{}for(let y of xt)y.visible=!1;let Ut=[Et,H,ue,Ot,Ct];for(let y of[.26,.37,.47,.7,.95])Nn.renderAt(y),await new Promise(O=>requestAnimationFrame(O));[Et,H,ue,Ot,Ct]=Ut,_t=Et,It=0,Mt=Q=0,se=!1},setFraming(xt=0,Ut=0){ii=xt,Ci=Ut},start(){He||(He=!0,se=!1,$t=performance.now(),ni=requestAnimationFrame(Pi))},stop(){He=!1,cancelAnimationFrame(ni)},setVisible(xt){Qe=xt},renderAt(xt,{intro:Ut=1,speed:y=null,dt:O=0}={}){_t=Et=xt,It=0,Ot=Ut,Ct=Ut>=1,se=!0,O||(H=st(xt)),y!=null&&(Mt=y),$t=performance.now()-O*1e3,Pi(performance.now()),cancelAnimationFrame(ni)},debugCam:null,setResScale(xt){Rk=pe(xt,.2,1)},get resScale(){return Rk},get basePixelRatio(){return Math.min(window.devicePixelRatio||1,Rc)}};return Nn}export{fx as createJourney};
