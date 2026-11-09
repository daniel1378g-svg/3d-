var Yc="170";var Xd=0,Fl=1,Yd=2;var Jh=1,qc=2,In=3,Qn=0,Fe=1,me=2,$n=0,Ji=1,Ol=2,Bl=3,zl=4,qd=5,fi=100,Zd=101,$d=102,Jd=103,Kd=104,Qd=200,jd=201,tp=202,ep=203,ba=204,wa=205,np=206,ip=207,sp=208,rp=209,op=210,ap=211,cp=212,lp=213,hp=214,Aa=0,Ea=1,Ta=2,ts=3,Ra=4,Ca=5,Ia=6,Pa=7,Kh=0,up=1,fp=2,Jn=0,dp=1,pp=2,mp=3,gp=4,_p=5,Zc=6,xp=7;var Qh=300,es=301,ns=302,La=303,Da=304,vo=306,Nn=1e3,Ln=1001,Ua=1002,Je=1003,yp=1004;var mr=1005;var _n=1006,Go=1007;var pi=1008;var Fn=1009,jh=1010,tu=1011,zs=1012,$c=1013,mi=1014,xn=1015,Bn=1016,Jc=1017,Kc=1018,is=1020,eu=35902,nu=1021,iu=1022,fn=1023,su=1024,ru=1025,Ki=1026,ss=1027,Qc=1028,jc=1029,ou=1030,tl=1031;var el=1033,Wr=33776,Xr=33777,Yr=33778,qr=33779,Na=35840,Fa=35841,Oa=35842,Ba=35843,za=36196,ka=37492,Va=37496,Ha=37808,Ga=37809,Wa=37810,Xa=37811,Ya=37812,qa=37813,Za=37814,$a=37815,Ja=37816,Ka=37817,Qa=37818,ja=37819,tc=37820,ec=37821,Zr=36492,nc=36494,ic=36495,au=36283,sc=36284,rc=36285,oc=36286;var $r=2300,ac=2301,Wo=2302,kl=2400,Vl=2401,Hl=2402;var vp=3200,Mp=3201;var cu=0,Sp=1,qn="",Se="srgb",ps="srgb-linear",Mo="linear",ae="srgb";var Ci=7680;var Gl=519,bp=512,wp=513,Ap=514,lu=515,Ep=516,Tp=517,Rp=518,Cp=519,cc=35044;var Wl="300 es",Dn=2e3,Jr=2001,jn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},De=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Xl=1234567,Us=Math.PI/180,ks=180/Math.PI;function yn(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(De[i&255]+De[i>>8&255]+De[i>>16&255]+De[i>>24&255]+"-"+De[t&255]+De[t>>8&255]+"-"+De[t>>16&15|64]+De[t>>24&255]+"-"+De[e&63|128]+De[e>>8&255]+"-"+De[e>>16&255]+De[e>>24&255]+De[n&255]+De[n>>8&255]+De[n>>16&255]+De[n>>24&255]).toLowerCase()}function Ae(i,t,e){return Math.max(t,Math.min(e,i))}function nl(i,t){return(i%t+t)%t}function Ip(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Pp(i,t,e){return i!==t?(e-i)/(t-i):0}function Ns(i,t,e){return(1-e)*i+e*t}function Lp(i,t,e,n){return Ns(i,t,1-Math.exp(-e*n))}function Dp(i,t=1){return t-Math.abs(nl(i,t*2)-t)}function Up(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Np(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Fp(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Op(i,t){return i+Math.random()*(t-i)}function Bp(i){return i*(.5-Math.random())}function zp(i){i!==void 0&&(Xl=i);let t=Xl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function kp(i){return i*Us}function Vp(i){return i*ks}function Hp(i){return(i&i-1)===0&&i!==0}function Gp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Wp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Xp(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),m=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*m,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*m,a*l);break;case"ZYZ":i.set(c*m,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function un(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function re(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var il={DEG2RAD:Us,RAD2DEG:ks,generateUUID:yn,clamp:Ae,euclideanModulo:nl,mapLinear:Ip,inverseLerp:Pp,lerp:Ns,damp:Lp,pingpong:Dp,smoothstep:Up,smootherstep:Np,randInt:Fp,randFloat:Op,randFloatSpread:Bp,seededRandom:zp,degToRad:kp,radToDeg:Vp,isPowerOfTwo:Hp,ceilPowerOfTwo:Gp,floorPowerOfTwo:Wp,setQuaternionFromProperEuler:Xp,normalize:re,denormalize:un},j=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ae(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},qt=class i{constructor(t,e,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],_=s[0],g=s[3],p=s[6],x=s[1],y=s[4],v=s[7],T=s[2],w=s[5],R=s[8];return r[0]=o*_+a*x+c*T,r[3]=o*g+a*y+c*w,r[6]=o*p+a*v+c*R,r[1]=l*_+h*x+u*T,r[4]=l*g+h*y+u*w,r[7]=l*p+h*v+u*R,r[2]=d*_+f*x+m*T,r[5]=d*g+f*y+m*w,r[8]=d*p+f*v+m*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,m=e*u+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return t[0]=u*_,t[1]=(s*l-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=d*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=f*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Xo.makeScale(t,e)),this}rotate(t){return this.premultiply(Xo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Xo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Xo=new qt;function hu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Vs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Yp(){let i=Vs("canvas");return i.style.display="block",i}var Yl={};function Ls(i){i in Yl||(Yl[i]=!0,console.warn(i))}function qp(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Zp(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function $p(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var Kt={enabled:!0,workingColorSpace:ps,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ae&&(i.r=Un(i.r),i.g=Un(i.g),i.b=Un(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ae&&(i.r=Qi(i.r),i.g=Qi(i.g),i.b=Qi(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===qn?Mo:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Un(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Qi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ql=[.64,.33,.3,.6,.15,.06],Zl=[.2126,.7152,.0722],$l=[.3127,.329],Jl=new qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Kl=new qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Kt.define({[ps]:{primaries:ql,whitePoint:$l,transfer:Mo,toXYZ:Jl,fromXYZ:Kl,luminanceCoefficients:Zl,workingColorSpaceConfig:{unpackColorSpace:Se},outputColorSpaceConfig:{drawingBufferColorSpace:Se}},[Se]:{primaries:ql,whitePoint:$l,transfer:ae,toXYZ:Jl,fromXYZ:Kl,luminanceCoefficients:Zl,outputColorSpaceConfig:{drawingBufferColorSpace:Se}}});var Ii,lc=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ii===void 0&&(Ii=Vs("canvas")),Ii.width=t.width,Ii.height=t.height;let n=Ii.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ii}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Vs("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Un(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Un(e[n]/255)*255):e[n]=Un(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Jp=0,Kr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jp++}),this.uuid=yn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Yo(s[o].image)):r.push(Yo(s[o]))}else r=Yo(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Yo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?lc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Kp=0,ke=class i extends jn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Ln,s=Ln,r=_n,o=pi,a=fn,c=Fn,l=i.DEFAULT_ANISOTROPY,h=qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kp++}),this.uuid=yn(),this.name="",this.source=new Kr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new j(0,0),this.repeat=new j(1,1),this.center=new j(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Qh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Nn:t.x=t.x-Math.floor(t.x);break;case Ln:t.x=t.x<0?0:1;break;case Ua:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Nn:t.y=t.y-Math.floor(t.y);break;case Ln:t.y=t.y<0?0:1;break;case Ua:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};ke.DEFAULT_IMAGE=null;ke.DEFAULT_MAPPING=Qh;ke.DEFAULT_ANISOTROPY=1;var ie=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],m=c[9],_=c[2],g=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let y=(l+1)/2,v=(f+1)/2,T=(p+1)/2,w=(h+d)/4,R=(u+_)/4,E=(m+g)/4;return y>v&&y>T?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=w/n,r=R/n):v>T?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=w/s,r=E/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=R/r,s=E/r),this.set(n,s,r,e),this}let x=Math.sqrt((g-m)*(g-m)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(g-m)/x,this.y=(u-_)/x,this.z=(d-h)/x,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},hc=class extends jn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ie(0,0,t,e),this.scissorTest=!1,this.viewport=new ie(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_n,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new ke(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Kr(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},en=class extends hc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Qr=class extends ke{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Je,this.minFilter=Je,this.wrapR=Ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var uc=class extends ke{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Je,this.minFilter=Je,this.wrapR=Ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ie=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],d=r[o+0],f=r[o+1],m=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=m,t[e+3]=_;return}if(u!==_||c!==d||l!==f||h!==m){let g=1-a,p=c*d+l*f+h*m+u*_,x=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){let T=Math.sqrt(y),w=Math.atan2(T,p*x);g=Math.sin(g*w)/T,a=Math.sin(a*w)/T}let v=a*x;if(c=c*g+d*v,l=l*g+f*v,h=h*g+m*v,u=u*g+_*v,g===1-a){let T=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=T,l*=T,h*=T,u*=T}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+h*u+c*f-l*d,t[e+1]=c*m+h*d+l*u-a*f,t[e+2]=l*m+h*f+a*d-c*u,t[e+3]=h*m-a*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),f=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"YZX":this._x=d*h*u+l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u-d*f*m;break;case"XZY":this._x=d*h*u-l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ae(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ql.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ql.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return qo.copy(this).projectOnVector(t),this.sub(qo)}reflect(t){return this.sub(qo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ae(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},qo=new P,Ql=new Ie,Ke=class{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(cn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(cn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=cn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,cn):cn.fromBufferAttribute(r,o),cn.applyMatrix4(t.matrixWorld),this.expandByPoint(cn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),gr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),gr.copy(n.boundingBox)),gr.applyMatrix4(t.matrixWorld),this.union(gr)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,cn),cn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ss),_r.subVectors(this.max,Ss),Pi.subVectors(t.a,Ss),Li.subVectors(t.b,Ss),Di.subVectors(t.c,Ss),Vn.subVectors(Li,Pi),Hn.subVectors(Di,Li),ri.subVectors(Pi,Di);let e=[0,-Vn.z,Vn.y,0,-Hn.z,Hn.y,0,-ri.z,ri.y,Vn.z,0,-Vn.x,Hn.z,0,-Hn.x,ri.z,0,-ri.x,-Vn.y,Vn.x,0,-Hn.y,Hn.x,0,-ri.y,ri.x,0];return!Zo(e,Pi,Li,Di,_r)||(e=[1,0,0,0,1,0,0,0,1],!Zo(e,Pi,Li,Di,_r))?!1:(xr.crossVectors(Vn,Hn),e=[xr.x,xr.y,xr.z],Zo(e,Pi,Li,Di,_r))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,cn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(cn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(An[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),An[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),An[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),An[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),An[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),An[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),An[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),An[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(An),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},An=[new P,new P,new P,new P,new P,new P,new P,new P],cn=new P,gr=new Ke,Pi=new P,Li=new P,Di=new P,Vn=new P,Hn=new P,ri=new P,Ss=new P,_r=new P,xr=new P,oi=new P;function Zo(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){oi.fromArray(i,r);let a=s.x*Math.abs(oi.x)+s.y*Math.abs(oi.y)+s.z*Math.abs(oi.z),c=t.dot(oi),l=e.dot(oi),h=n.dot(oi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Qp=new Ke,bs=new P,$o=new P,gi=class{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Qp.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;bs.subVectors(t,this.center);let e=bs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(bs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):($o.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(bs.copy(t.center).add($o)),this.expandByPoint(bs.copy(t.center).sub($o))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},En=new P,Jo=new P,yr=new P,Gn=new P,Ko=new P,vr=new P,Qo=new P,jr=class{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,En)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=En.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(En.copy(this.origin).addScaledVector(this.direction,e),En.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Jo.copy(t).add(e).multiplyScalar(.5),yr.copy(e).sub(t).normalize(),Gn.copy(this.origin).sub(Jo);let r=t.distanceTo(e)*.5,o=-this.direction.dot(yr),a=Gn.dot(this.direction),c=-Gn.dot(yr),l=Gn.lengthSq(),h=Math.abs(1-o*o),u,d,f,m;if(h>0)if(u=o*c-a,d=o*a-c,m=r*h,u>=0)if(d>=-m)if(d<=m){let _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-m?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=m?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Jo).addScaledVector(yr,d),f}intersectSphere(t,e){En.subVectors(t.center,this.origin);let n=En.dot(this.direction),s=En.dot(En)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,En)!==null}intersectTriangle(t,e,n,s,r){Ko.subVectors(e,t),vr.subVectors(n,t),Qo.crossVectors(Ko,vr);let o=this.direction.dot(Qo),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Gn.subVectors(this.origin,t);let c=a*this.direction.dot(vr.crossVectors(Gn,vr));if(c<0)return null;let l=a*this.direction.dot(Ko.cross(Gn));if(l<0||c+l>o)return null;let h=-a*Gn.dot(Qo);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Vt=class i{constructor(t,e,n,s,r,o,a,c,l,h,u,d,f,m,_,g){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,d,f,m,_,g)}set(t,e,n,s,r,o,a,c,l,h,u,d,f,m,_,g){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Ui.setFromMatrixColumn(t,0).length(),r=1/Ui.setFromMatrixColumn(t,1).length(),o=1/Ui.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=o*h,f=o*u,m=a*h,_=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+m*l,e[5]=d-_*l,e[9]=-a*c,e[2]=_-d*l,e[6]=m+f*l,e[10]=o*c}else if(t.order==="YXZ"){let d=c*h,f=c*u,m=l*h,_=l*u;e[0]=d+_*a,e[4]=m*a-f,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-m,e[6]=_+d*a,e[10]=o*c}else if(t.order==="ZXY"){let d=c*h,f=c*u,m=l*h,_=l*u;e[0]=d-_*a,e[4]=-o*u,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*h,e[9]=_-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let d=o*h,f=o*u,m=a*h,_=a*u;e[0]=c*h,e[4]=m*l-f,e[8]=d*l+_,e[1]=c*u,e[5]=_*l+d,e[9]=f*l-m,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let d=o*c,f=o*l,m=a*c,_=a*l;e[0]=c*h,e[4]=_-d*u,e[8]=m*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*u+m,e[10]=d-_*u}else if(t.order==="XZY"){let d=o*c,f=o*l,m=a*c,_=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+_,e[5]=o*h,e[9]=f*u-m,e[2]=m*u-f,e[6]=a*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(jp,t,tm)}lookAt(t,e,n){let s=this.elements;return Ze.subVectors(t,e),Ze.lengthSq()===0&&(Ze.z=1),Ze.normalize(),Wn.crossVectors(n,Ze),Wn.lengthSq()===0&&(Math.abs(n.z)===1?Ze.x+=1e-4:Ze.z+=1e-4,Ze.normalize(),Wn.crossVectors(n,Ze)),Wn.normalize(),Mr.crossVectors(Ze,Wn),s[0]=Wn.x,s[4]=Mr.x,s[8]=Ze.x,s[1]=Wn.y,s[5]=Mr.y,s[9]=Ze.y,s[2]=Wn.z,s[6]=Mr.z,s[10]=Ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],_=n[6],g=n[10],p=n[14],x=n[3],y=n[7],v=n[11],T=n[15],w=s[0],R=s[4],E=s[8],S=s[12],M=s[1],C=s[5],U=s[9],D=s[13],N=s[2],W=s[6],B=s[10],K=s[14],F=s[3],st=s[7],ht=s[11],Y=s[15];return r[0]=o*w+a*M+c*N+l*F,r[4]=o*R+a*C+c*W+l*st,r[8]=o*E+a*U+c*B+l*ht,r[12]=o*S+a*D+c*K+l*Y,r[1]=h*w+u*M+d*N+f*F,r[5]=h*R+u*C+d*W+f*st,r[9]=h*E+u*U+d*B+f*ht,r[13]=h*S+u*D+d*K+f*Y,r[2]=m*w+_*M+g*N+p*F,r[6]=m*R+_*C+g*W+p*st,r[10]=m*E+_*U+g*B+p*ht,r[14]=m*S+_*D+g*K+p*Y,r[3]=x*w+y*M+v*N+T*F,r[7]=x*R+y*C+v*W+T*st,r[11]=x*E+y*U+v*B+T*ht,r[15]=x*S+y*D+v*K+T*Y,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],m=t[3],_=t[7],g=t[11],p=t[15];return m*(+r*c*u-s*l*u-r*a*d+n*l*d+s*a*f-n*c*f)+_*(+e*c*f-e*l*d+r*o*d-s*o*f+s*l*h-r*c*h)+g*(+e*l*u-e*a*f-r*o*u+n*o*f+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*d+s*o*u-n*o*d+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],_=t[13],g=t[14],p=t[15],x=u*g*l-_*d*l+_*c*f-a*g*f-u*c*p+a*d*p,y=m*d*l-h*g*l-m*c*f+o*g*f+h*c*p-o*d*p,v=h*_*l-m*u*l+m*a*f-o*_*f-h*a*p+o*u*p,T=m*u*c-h*_*c-m*a*d+o*_*d+h*a*g-o*u*g,w=e*x+n*y+s*v+r*T;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/w;return t[0]=x*R,t[1]=(_*d*r-u*g*r-_*s*f+n*g*f+u*s*p-n*d*p)*R,t[2]=(a*g*r-_*c*r+_*s*l-n*g*l-a*s*p+n*c*p)*R,t[3]=(u*c*r-a*d*r-u*s*l+n*d*l+a*s*f-n*c*f)*R,t[4]=y*R,t[5]=(h*g*r-m*d*r+m*s*f-e*g*f-h*s*p+e*d*p)*R,t[6]=(m*c*r-o*g*r-m*s*l+e*g*l+o*s*p-e*c*p)*R,t[7]=(o*d*r-h*c*r+h*s*l-e*d*l-o*s*f+e*c*f)*R,t[8]=v*R,t[9]=(m*u*r-h*_*r-m*n*f+e*_*f+h*n*p-e*u*p)*R,t[10]=(o*_*r-m*a*r+m*n*l-e*_*l-o*n*p+e*a*p)*R,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*f-e*a*f)*R,t[12]=T*R,t[13]=(h*_*s-m*u*s+m*n*d-e*_*d-h*n*g+e*u*g)*R,t[14]=(m*a*s-o*_*s-m*n*c+e*_*c+o*n*g-e*a*g)*R,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*d+e*a*d)*R,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,m=r*u,_=o*h,g=o*u,p=a*u,x=c*l,y=c*h,v=c*u,T=n.x,w=n.y,R=n.z;return s[0]=(1-(_+p))*T,s[1]=(f+v)*T,s[2]=(m-y)*T,s[3]=0,s[4]=(f-v)*w,s[5]=(1-(d+p))*w,s[6]=(g+x)*w,s[7]=0,s[8]=(m+y)*R,s[9]=(g-x)*R,s[10]=(1-(d+_))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Ui.set(s[0],s[1],s[2]).length(),o=Ui.set(s[4],s[5],s[6]).length(),a=Ui.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ln.copy(this);let l=1/r,h=1/o,u=1/a;return ln.elements[0]*=l,ln.elements[1]*=l,ln.elements[2]*=l,ln.elements[4]*=h,ln.elements[5]*=h,ln.elements[6]*=h,ln.elements[8]*=u,ln.elements[9]*=u,ln.elements[10]*=u,e.setFromRotationMatrix(ln),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Dn){let c=this.elements,l=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s),f,m;if(a===Dn)f=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===Jr)f=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Dn){let c=this.elements,l=1/(e-t),h=1/(n-s),u=1/(o-r),d=(e+t)*l,f=(n+s)*h,m,_;if(a===Dn)m=(o+r)*u,_=-2*u;else if(a===Jr)m=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Ui=new P,ln=new Vt,jp=new P(0,0,0),tm=new P(1,1,1),Wn=new P,Mr=new P,Ze=new P,jl=new Vt,th=new Ie,Ve=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Ae(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ae(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ae(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ae(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ae(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ae(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return jl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(jl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return th.setFromEuler(this),this.setFromQuaternion(th,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ve.DEFAULT_ORDER="XYZ";var Hs=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},em=0,eh=new P,Ni=new Ie,Tn=new Vt,Sr=new P,ws=new P,nm=new P,im=new Ie,nh=new P(1,0,0),ih=new P(0,1,0),sh=new P(0,0,1),rh={type:"added"},sm={type:"removed"},Fi={type:"childadded",child:null},jo={type:"childremoved",child:null},Oe=class i extends jn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:em++}),this.uuid=yn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new P,e=new Ve,n=new Ie,s=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Vt},normalMatrix:{value:new qt}}),this.matrix=new Vt,this.matrixWorld=new Vt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Hs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ni.setFromAxisAngle(t,e),this.quaternion.multiply(Ni),this}rotateOnWorldAxis(t,e){return Ni.setFromAxisAngle(t,e),this.quaternion.premultiply(Ni),this}rotateX(t){return this.rotateOnAxis(nh,t)}rotateY(t){return this.rotateOnAxis(ih,t)}rotateZ(t){return this.rotateOnAxis(sh,t)}translateOnAxis(t,e){return eh.copy(t).applyQuaternion(this.quaternion),this.position.add(eh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(nh,t)}translateY(t){return this.translateOnAxis(ih,t)}translateZ(t){return this.translateOnAxis(sh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Tn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Sr.copy(t):Sr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ws.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Tn.lookAt(ws,Sr,this.up):Tn.lookAt(Sr,ws,this.up),this.quaternion.setFromRotationMatrix(Tn),s&&(Tn.extractRotation(s.matrixWorld),Ni.setFromRotationMatrix(Tn),this.quaternion.premultiply(Ni.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(rh),Fi.child=t,this.dispatchEvent(Fi),Fi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(sm),jo.child=t,this.dispatchEvent(jo),jo.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Tn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Tn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Tn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(rh),Fi.child=t,this.dispatchEvent(Fi),Fi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ws,t,nm),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ws,im,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Oe.DEFAULT_UP=new P(0,1,0);Oe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Oe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var hn=new P,Rn=new P,ta=new P,Cn=new P,Oi=new P,Bi=new P,oh=new P,ea=new P,na=new P,ia=new P,sa=new ie,ra=new ie,oa=new ie,Zn=class i{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),hn.subVectors(t,e),s.cross(hn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){hn.subVectors(s,e),Rn.subVectors(n,e),ta.subVectors(t,e);let o=hn.dot(hn),a=hn.dot(Rn),c=hn.dot(ta),l=Rn.dot(Rn),h=Rn.dot(ta),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(l*c-a*h)*d,m=(o*h-a*c)*d;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Cn)===null?!1:Cn.x>=0&&Cn.y>=0&&Cn.x+Cn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Cn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Cn.x),c.addScaledVector(o,Cn.y),c.addScaledVector(a,Cn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return sa.setScalar(0),ra.setScalar(0),oa.setScalar(0),sa.fromBufferAttribute(t,e),ra.fromBufferAttribute(t,n),oa.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(sa,r.x),o.addScaledVector(ra,r.y),o.addScaledVector(oa,r.z),o}static isFrontFacing(t,e,n,s){return hn.subVectors(n,e),Rn.subVectors(t,e),hn.cross(Rn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return hn.subVectors(this.c,this.b),Rn.subVectors(this.a,this.b),hn.cross(Rn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;Oi.subVectors(s,n),Bi.subVectors(r,n),ea.subVectors(t,n);let c=Oi.dot(ea),l=Bi.dot(ea);if(c<=0&&l<=0)return e.copy(n);na.subVectors(t,s);let h=Oi.dot(na),u=Bi.dot(na);if(h>=0&&u<=h)return e.copy(s);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Oi,o);ia.subVectors(t,r);let f=Oi.dot(ia),m=Bi.dot(ia);if(m>=0&&f<=m)return e.copy(r);let _=f*l-c*m;if(_<=0&&l>=0&&m<=0)return a=l/(l-m),e.copy(n).addScaledVector(Bi,a);let g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return oh.subVectors(r,s),a=(u-h)/(u-h+(f-m)),e.copy(s).addScaledVector(oh,a);let p=1/(g+_+d);return o=_*p,a=d*p,e.copy(n).addScaledVector(Oi,o).addScaledVector(Bi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},uu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xn={h:0,s:0,l:0},br={h:0,s:0,l:0};function aa(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Nt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Se){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Kt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Kt.workingColorSpace){if(t=nl(t,1),e=Ae(e,0,1),n=Ae(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=aa(o,r,t+1/3),this.g=aa(o,r,t),this.b=aa(o,r,t-1/3)}return Kt.toWorkingColorSpace(this,s),this}setStyle(t,e=Se){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Se){let n=uu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Un(t.r),this.g=Un(t.g),this.b=Un(t.b),this}copyLinearToSRGB(t){return this.r=Qi(t.r),this.g=Qi(t.g),this.b=Qi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Se){return Kt.fromWorkingColorSpace(Ue.copy(this),t),Math.round(Ae(Ue.r*255,0,255))*65536+Math.round(Ae(Ue.g*255,0,255))*256+Math.round(Ae(Ue.b*255,0,255))}getHexString(t=Se){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.fromWorkingColorSpace(Ue.copy(this),e);let n=Ue.r,s=Ue.g,r=Ue.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Kt.workingColorSpace){return Kt.fromWorkingColorSpace(Ue.copy(this),e),t.r=Ue.r,t.g=Ue.g,t.b=Ue.b,t}getStyle(t=Se){Kt.fromWorkingColorSpace(Ue.copy(this),t);let e=Ue.r,n=Ue.g,s=Ue.b;return t!==Se?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Xn),this.setHSL(Xn.h+t,Xn.s+e,Xn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Xn),t.getHSL(br);let n=Ns(Xn.h,br.h,e),s=Ns(Xn.s,br.s,e),r=Ns(Xn.l,br.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ue=new Nt;Nt.NAMES=uu;var rm=0,ti=class extends jn{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:rm++}),this.uuid=yn(),this.name="",this.blending=Ji,this.side=Qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ba,this.blendDst=wa,this.blendEquation=fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Nt(0,0,0),this.blendAlpha=0,this.depthFunc=ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ci,this.stencilZFail=Ci,this.stencilZPass=Ci,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ji&&(n.blending=this.blending),this.side!==Qn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ba&&(n.blendSrc=this.blendSrc),this.blendDst!==wa&&(n.blendDst=this.blendDst),this.blendEquation!==fi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ts&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Gl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ci&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ci&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ci&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},de=class extends ti{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ve,this.combine=Kh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Me=new P,wr=new j,Ee=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=cc,this.updateRanges=[],this.gpuType=xn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)wr.fromBufferAttribute(this,e),wr.applyMatrix3(t),this.setXY(e,wr.x,wr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=un(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=un(e,this.array)),e}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=un(e,this.array)),e}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=un(e,this.array)),e}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=un(e,this.array)),e}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array),r=re(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==cc&&(t.usage=this.usage),t}};var to=class extends Ee{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var eo=class extends Ee{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Bt=class extends Ee{constructor(t,e,n){super(new Float32Array(t),e,n)}},om=0,tn=new Vt,ca=new Oe,zi=new P,$e=new Ke,As=new Ke,Ce=new P,ce=class i extends jn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:om++}),this.uuid=yn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(hu(t)?eo:to)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return tn.makeRotationFromQuaternion(t),this.applyMatrix4(tn),this}rotateX(t){return tn.makeRotationX(t),this.applyMatrix4(tn),this}rotateY(t){return tn.makeRotationY(t),this.applyMatrix4(tn),this}rotateZ(t){return tn.makeRotationZ(t),this.applyMatrix4(tn),this}translate(t,e,n){return tn.makeTranslation(t,e,n),this.applyMatrix4(tn),this}scale(t,e,n){return tn.makeScale(t,e,n),this.applyMatrix4(tn),this}lookAt(t){return ca.lookAt(t),ca.updateMatrix(),this.applyMatrix4(ca.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zi).negate(),this.translate(zi.x,zi.y,zi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Bt(n,3))}else{for(let n=0,s=e.count;n<s;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ke);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];$e.setFromBufferAttribute(r),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,$e.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,$e.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint($e.min),this.boundingBox.expandByPoint($e.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){let n=this.boundingSphere.center;if($e.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];As.setFromBufferAttribute(a),this.morphTargetsRelative?(Ce.addVectors($e.min,As.min),$e.expandByPoint(Ce),Ce.addVectors($e.max,As.max),$e.expandByPoint(Ce)):($e.expandByPoint(As.min),$e.expandByPoint(As.max))}$e.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ce.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ce));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ce.fromBufferAttribute(a,l),c&&(zi.fromBufferAttribute(t,l),Ce.add(zi)),s=Math.max(s,n.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ee(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let E=0;E<n.count;E++)a[E]=new P,c[E]=new P;let l=new P,h=new P,u=new P,d=new j,f=new j,m=new j,_=new P,g=new P;function p(E,S,M){l.fromBufferAttribute(n,E),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,M),d.fromBufferAttribute(r,E),f.fromBufferAttribute(r,S),m.fromBufferAttribute(r,M),h.sub(l),u.sub(l),f.sub(d),m.sub(d);let C=1/(f.x*m.y-m.x*f.y);isFinite(C)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(C),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(C),a[E].add(_),a[S].add(_),a[M].add(_),c[E].add(g),c[S].add(g),c[M].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let E=0,S=x.length;E<S;++E){let M=x[E],C=M.start,U=M.count;for(let D=C,N=C+U;D<N;D+=3)p(t.getX(D+0),t.getX(D+1),t.getX(D+2))}let y=new P,v=new P,T=new P,w=new P;function R(E){T.fromBufferAttribute(s,E),w.copy(T);let S=a[E];y.copy(S),y.sub(T.multiplyScalar(T.dot(S))).normalize(),v.crossVectors(w,S);let C=v.dot(c[E])<0?-1:1;o.setXYZW(E,y.x,y.y,y.z,C)}for(let E=0,S=x.length;E<S;++E){let M=x[E],C=M.start,U=M.count;for(let D=C,N=C+U;D<N;D+=3)R(t.getX(D+0)),R(t.getX(D+1)),R(t.getX(D+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ee(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new P,r=new P,o=new P,a=new P,c=new P,l=new P,h=new P,u=new P;if(t)for(let d=0,f=t.count;d<f;d+=3){let m=t.getX(d+0),_=t.getX(d+1),g=t.getX(d+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,g),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),f=0,m=0;for(let _=0,g=c.length;_<g;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let p=0;p<h;p++)d[m++]=l[f++]}return new Ee(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},ah=new Vt,ai=new jr,Ar=new gi,ch=new P,Er=new P,Tr=new P,Rr=new P,la=new P,Cr=new P,lh=new P,Ir=new P,ct=class extends Oe{constructor(t=new ce,e=new de){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Cr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(la.fromBufferAttribute(u,t),o?Cr.addScaledVector(la,h):Cr.addScaledVector(la.sub(e),h))}e.add(Cr)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ar.copy(n.boundingSphere),Ar.applyMatrix4(r),ai.copy(t.ray).recast(t.near),!(Ar.containsPoint(ai.origin)===!1&&(ai.intersectSphere(Ar,ch)===null||ai.origin.distanceToSquared(ch)>(t.far-t.near)**2))&&(ah.copy(r).invert(),ai.copy(t.ray).applyMatrix4(ah),!(n.boundingBox!==null&&ai.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ai)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){let g=d[m],p=o[g.materialIndex],x=Math.max(g.start,f.start),y=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let v=x,T=y;v<T;v+=3){let w=a.getX(v),R=a.getX(v+1),E=a.getX(v+2);s=Pr(this,p,t,n,l,h,u,w,R,E),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){let x=a.getX(g),y=a.getX(g+1),v=a.getX(g+2);s=Pr(this,o,t,n,l,h,u,x,y,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){let g=d[m],p=o[g.materialIndex],x=Math.max(g.start,f.start),y=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let v=x,T=y;v<T;v+=3){let w=v,R=v+1,E=v+2;s=Pr(this,p,t,n,l,h,u,w,R,E),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){let x=g,y=g+1,v=g+2;s=Pr(this,o,t,n,l,h,u,x,y,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function am(i,t,e,n,s,r,o,a){let c;if(t.side===Fe?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Qn,a),c===null)return null;Ir.copy(a),Ir.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Ir);return l<e.near||l>e.far?null:{distance:l,point:Ir.clone(),object:i}}function Pr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Er),i.getVertexPosition(c,Tr),i.getVertexPosition(l,Rr);let h=am(i,t,e,n,Er,Tr,Rr,lh);if(h){let u=new P;Zn.getBarycoord(lh,Er,Tr,Rr,u),s&&(h.uv=Zn.getInterpolatedAttribute(s,a,c,l,u,new j)),r&&(h.uv1=Zn.getInterpolatedAttribute(r,a,c,l,u,new j)),o&&(h.normal=Zn.getInterpolatedAttribute(o,a,c,l,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new P,materialIndex:0};Zn.getNormal(Er,Tr,Rr,d.normal),h.face=d,h.barycoord=u}return h}var _e=class i extends ce{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,f=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Bt(l,3)),this.setAttribute("normal",new Bt(h,3)),this.setAttribute("uv",new Bt(u,2));function m(_,g,p,x,y,v,T,w,R,E,S){let M=v/R,C=T/E,U=v/2,D=T/2,N=w/2,W=R+1,B=E+1,K=0,F=0,st=new P;for(let ht=0;ht<B;ht++){let Y=ht*C-D;for(let Q=0;Q<W;Q++){let mt=Q*M-U;st[_]=mt*x,st[g]=Y*y,st[p]=N,l.push(st.x,st.y,st.z),st[_]=0,st[g]=0,st[p]=w>0?1:-1,h.push(st.x,st.y,st.z),u.push(Q/R),u.push(1-ht/E),K+=1}}for(let ht=0;ht<E;ht++)for(let Y=0;Y<R;Y++){let Q=d+Y+W*ht,mt=d+Y+W*(ht+1),X=d+(Y+1)+W*(ht+1),et=d+(Y+1)+W*ht;c.push(Q,mt,et),c.push(mt,X,et),F+=6}a.addGroup(f,F,S),f+=F,d+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function rs(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function ze(i){let t={};for(let e=0;e<i.length;e++){let n=rs(i[e]);for(let s in n)t[s]=n[s]}return t}function cm(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function fu(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}var lm={clone:rs,merge:ze},hm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,um=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Xe=class extends ti{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hm,this.fragmentShader=um,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=rs(t.uniforms),this.uniformsGroups=cm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},no=class extends Oe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Vt,this.projectionMatrix=new Vt,this.projectionMatrixInverse=new Vt,this.coordinateSystem=Dn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Yn=new P,hh=new j,uh=new j,Ne=class extends no{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ks*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Us*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ks*2*Math.atan(Math.tan(Us*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Yn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z),Yn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z)}getViewSize(t,e){return this.getViewBounds(t,hh,uh),e.subVectors(uh,hh)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Us*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},ki=-90,Vi=1,Gs=class extends Oe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ne(ki,Vi,t,e);s.layers=this.layers,this.add(s);let r=new Ne(ki,Vi,t,e);r.layers=this.layers,this.add(r);let o=new Ne(ki,Vi,t,e);o.layers=this.layers,this.add(o);let a=new Ne(ki,Vi,t,e);a.layers=this.layers,this.add(a);let c=new Ne(ki,Vi,t,e);c.layers=this.layers,this.add(c);let l=new Ne(ki,Vi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===Dn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Jr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},io=class extends ke{constructor(t,e,n,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:es,super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Ws=class extends en{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new io(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:_n}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new _e(5,5,5),r=new Xe({name:"CubemapFromEquirect",uniforms:rs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Fe,blending:$n});r.uniforms.tEquirect.value=e;let o=new ct(s,r),a=e.minFilter;return e.minFilter===pi&&(e.minFilter=_n),new Gs(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},ha=new P,fm=new P,dm=new qt,Pn=class{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=ha.subVectors(n,e).cross(fm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(ha),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||dm.getNormalMatrix(t),s=this.coplanarPoint(ha).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},ci=new gi,Lr=new P,Xs=class{constructor(t=new Pn,e=new Pn,n=new Pn,s=new Pn,r=new Pn,o=new Pn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Dn){let n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],d=s[7],f=s[8],m=s[9],_=s[10],g=s[11],p=s[12],x=s[13],y=s[14],v=s[15];if(n[0].setComponents(c-r,d-l,g-f,v-p).normalize(),n[1].setComponents(c+r,d+l,g+f,v+p).normalize(),n[2].setComponents(c+o,d+h,g+m,v+x).normalize(),n[3].setComponents(c-o,d-h,g-m,v-x).normalize(),n[4].setComponents(c-a,d-u,g-_,v-y).normalize(),e===Dn)n[5].setComponents(c+a,d+u,g+_,v+y).normalize();else if(e===Jr)n[5].setComponents(a,u,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ci.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ci.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ci)}intersectsSprite(t){return ci.center.set(0,0,0),ci.radius=.7071067811865476,ci.applyMatrix4(t.matrixWorld),this.intersectsSphere(ci)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Lr.x=s.normal.x>0?t.max.x:t.min.x,Lr.y=s.normal.y>0?t.max.y:t.min.y,Lr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Lr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function du(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function pm(i){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){let m=u[d],_=u[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){let _=u[f];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var oe=class i extends ce{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,d=e/c,f=[],m=[],_=[],g=[];for(let p=0;p<h;p++){let x=p*d-o;for(let y=0;y<l;y++){let v=y*u-r;m.push(v,-x,0),_.push(0,0,1),g.push(y/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let x=0;x<a;x++){let y=x+l*p,v=x+l*(p+1),T=x+1+l*(p+1),w=x+1+l*p;f.push(y,v,w),f.push(v,T,w)}this.setIndex(f),this.setAttribute("position",new Bt(m,3)),this.setAttribute("normal",new Bt(_,3)),this.setAttribute("uv",new Bt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},mm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gm=`#ifdef USE_ALPHAHASH
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
#endif`,_m=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ym=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mm=`#ifdef USE_AOMAP
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
#endif`,Sm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bm=`#ifdef USE_BATCHING
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
#endif`,wm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Am=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Em=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Tm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Rm=`#ifdef USE_IRIDESCENCE
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
#endif`,Cm=`#ifdef USE_BUMPMAP
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
#endif`,Im=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Pm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Lm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Dm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Um=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Nm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Fm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Om=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Bm=`#define PI 3.141592653589793
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
} // validated`,zm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,km=`vec3 transformedNormal = objectNormal;
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
#endif`,Vm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ym=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,qm=`#ifdef USE_ENVMAP
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
#endif`,Zm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,$m=`#ifdef USE_ENVMAP
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
#endif`,Jm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Km=`#ifdef USE_ENVMAP
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
#endif`,Qm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,jm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,t0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,e0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,n0=`#ifdef USE_GRADIENTMAP
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
}`,i0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,s0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,r0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,o0=`uniform bool receiveShadow;
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
#endif`,a0=`#ifdef USE_ENVMAP
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
#endif`,c0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,l0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,h0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,u0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,f0=`PhysicalMaterial material;
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
#endif`,d0=`struct PhysicalMaterial {
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
}`,p0=`
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
#endif`,m0=`#if defined( RE_IndirectDiffuse )
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
#endif`,g0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,x0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,y0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,v0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,M0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,S0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,b0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,w0=`#if defined( USE_POINTS_UV )
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
#endif`,A0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,E0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,T0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,R0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,C0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,I0=`#ifdef USE_MORPHTARGETS
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
#endif`,P0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,L0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,D0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,U0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,N0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,F0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,O0=`#ifdef USE_NORMALMAP
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
#endif`,B0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,z0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,k0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,V0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,H0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,G0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,W0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,X0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Y0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,q0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Z0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,J0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,K0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Q0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,j0=`float getShadowMask() {
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
}`,tg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,eg=`#ifdef USE_SKINNING
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
#endif`,ng=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ig=`#ifdef USE_SKINNING
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
#endif`,sg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,rg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,og=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ag=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,cg=`#ifdef USE_TRANSMISSION
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
#endif`,lg=`#ifdef USE_TRANSMISSION
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
#endif`,hg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ug=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,pg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mg=`uniform sampler2D t2D;
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
}`,gg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_g=`#ifdef ENVMAP_TYPE_CUBE
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
}`,xg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vg=`#include <common>
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
}`,Mg=`#if DEPTH_PACKING == 3200
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
}`,Sg=`#define DISTANCE
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
}`,bg=`#define DISTANCE
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
}`,wg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ag=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Eg=`uniform float scale;
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
}`,Tg=`uniform vec3 diffuse;
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
}`,Rg=`#include <common>
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
}`,Cg=`uniform vec3 diffuse;
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
}`,Ig=`#define LAMBERT
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
}`,Pg=`#define LAMBERT
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
}`,Lg=`#define MATCAP
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
}`,Dg=`#define MATCAP
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
}`,Ug=`#define NORMAL
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
}`,Ng=`#define NORMAL
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
}`,Fg=`#define PHONG
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
}`,Og=`#define PHONG
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
}`,Bg=`#define STANDARD
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
}`,zg=`#define STANDARD
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
}`,kg=`#define TOON
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
}`,Vg=`#define TOON
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
}`,Hg=`uniform float size;
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
}`,Gg=`uniform vec3 diffuse;
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
}`,Wg=`#include <common>
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
}`,Xg=`uniform vec3 color;
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
}`,Yg=`uniform float rotation;
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
}`,qg=`uniform vec3 diffuse;
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
}`,Wt={alphahash_fragment:mm,alphahash_pars_fragment:gm,alphamap_fragment:_m,alphamap_pars_fragment:xm,alphatest_fragment:ym,alphatest_pars_fragment:vm,aomap_fragment:Mm,aomap_pars_fragment:Sm,batching_pars_vertex:bm,batching_vertex:wm,begin_vertex:Am,beginnormal_vertex:Em,bsdfs:Tm,iridescence_fragment:Rm,bumpmap_pars_fragment:Cm,clipping_planes_fragment:Im,clipping_planes_pars_fragment:Pm,clipping_planes_pars_vertex:Lm,clipping_planes_vertex:Dm,color_fragment:Um,color_pars_fragment:Nm,color_pars_vertex:Fm,color_vertex:Om,common:Bm,cube_uv_reflection_fragment:zm,defaultnormal_vertex:km,displacementmap_pars_vertex:Vm,displacementmap_vertex:Hm,emissivemap_fragment:Gm,emissivemap_pars_fragment:Wm,colorspace_fragment:Xm,colorspace_pars_fragment:Ym,envmap_fragment:qm,envmap_common_pars_fragment:Zm,envmap_pars_fragment:$m,envmap_pars_vertex:Jm,envmap_physical_pars_fragment:a0,envmap_vertex:Km,fog_vertex:Qm,fog_pars_vertex:jm,fog_fragment:t0,fog_pars_fragment:e0,gradientmap_pars_fragment:n0,lightmap_pars_fragment:i0,lights_lambert_fragment:s0,lights_lambert_pars_fragment:r0,lights_pars_begin:o0,lights_toon_fragment:c0,lights_toon_pars_fragment:l0,lights_phong_fragment:h0,lights_phong_pars_fragment:u0,lights_physical_fragment:f0,lights_physical_pars_fragment:d0,lights_fragment_begin:p0,lights_fragment_maps:m0,lights_fragment_end:g0,logdepthbuf_fragment:_0,logdepthbuf_pars_fragment:x0,logdepthbuf_pars_vertex:y0,logdepthbuf_vertex:v0,map_fragment:M0,map_pars_fragment:S0,map_particle_fragment:b0,map_particle_pars_fragment:w0,metalnessmap_fragment:A0,metalnessmap_pars_fragment:E0,morphinstance_vertex:T0,morphcolor_vertex:R0,morphnormal_vertex:C0,morphtarget_pars_vertex:I0,morphtarget_vertex:P0,normal_fragment_begin:L0,normal_fragment_maps:D0,normal_pars_fragment:U0,normal_pars_vertex:N0,normal_vertex:F0,normalmap_pars_fragment:O0,clearcoat_normal_fragment_begin:B0,clearcoat_normal_fragment_maps:z0,clearcoat_pars_fragment:k0,iridescence_pars_fragment:V0,opaque_fragment:H0,packing:G0,premultiplied_alpha_fragment:W0,project_vertex:X0,dithering_fragment:Y0,dithering_pars_fragment:q0,roughnessmap_fragment:Z0,roughnessmap_pars_fragment:$0,shadowmap_pars_fragment:J0,shadowmap_pars_vertex:K0,shadowmap_vertex:Q0,shadowmask_pars_fragment:j0,skinbase_vertex:tg,skinning_pars_vertex:eg,skinning_vertex:ng,skinnormal_vertex:ig,specularmap_fragment:sg,specularmap_pars_fragment:rg,tonemapping_fragment:og,tonemapping_pars_fragment:ag,transmission_fragment:cg,transmission_pars_fragment:lg,uv_pars_fragment:hg,uv_pars_vertex:ug,uv_vertex:fg,worldpos_vertex:dg,background_vert:pg,background_frag:mg,backgroundCube_vert:gg,backgroundCube_frag:_g,cube_vert:xg,cube_frag:yg,depth_vert:vg,depth_frag:Mg,distanceRGBA_vert:Sg,distanceRGBA_frag:bg,equirect_vert:wg,equirect_frag:Ag,linedashed_vert:Eg,linedashed_frag:Tg,meshbasic_vert:Rg,meshbasic_frag:Cg,meshlambert_vert:Ig,meshlambert_frag:Pg,meshmatcap_vert:Lg,meshmatcap_frag:Dg,meshnormal_vert:Ug,meshnormal_frag:Ng,meshphong_vert:Fg,meshphong_frag:Og,meshphysical_vert:Bg,meshphysical_frag:zg,meshtoon_vert:kg,meshtoon_frag:Vg,points_vert:Hg,points_frag:Gg,shadow_vert:Wg,shadow_frag:Xg,sprite_vert:Yg,sprite_frag:qg},gt={common:{diffuse:{value:new Nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},envMapRotation:{value:new qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new j(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new Nt(16777215)},opacity:{value:1},center:{value:new j(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},gn={basic:{uniforms:ze([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:ze([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new Nt(0)}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:ze([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new Nt(0)},specular:{value:new Nt(1118481)},shininess:{value:30}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:ze([gt.common,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.roughnessmap,gt.metalnessmap,gt.fog,gt.lights,{emissive:{value:new Nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:ze([gt.common,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.gradientmap,gt.fog,gt.lights,{emissive:{value:new Nt(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:ze([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:ze([gt.points,gt.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:ze([gt.common,gt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:ze([gt.common,gt.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:ze([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:ze([gt.sprite,gt.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qt}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distanceRGBA:{uniforms:ze([gt.common,gt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distanceRGBA_vert,fragmentShader:Wt.distanceRGBA_frag},shadow:{uniforms:ze([gt.lights,gt.fog,{color:{value:new Nt(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};gn.physical={uniforms:ze([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new j(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new Nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new j},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new Nt(0)},specularColor:{value:new Nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new j},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};var Dr={r:0,b:0,g:0},li=new Ve,Zg=new Vt;function $g(i,t,e,n,s,r,o){let a=new Nt(0),c=r===!0?0:1,l,h,u=null,d=0,f=null;function m(x){let y=x.isScene===!0?x.background:null;return y&&y.isTexture&&(y=(x.backgroundBlurriness>0?e:t).get(y)),y}function _(x){let y=!1,v=m(x);v===null?p(a,c):v&&v.isColor&&(p(v,1),y=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(x,y){let v=m(y);v&&(v.isCubeTexture||v.mapping===vo)?(h===void 0&&(h=new ct(new _e(1,1,1),new Xe({name:"BackgroundCubeMaterial",uniforms:rs(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:Fe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),li.copy(y.backgroundRotation),li.x*=-1,li.y*=-1,li.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(li.y*=-1,li.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Zg.makeRotationFromEuler(li)),h.material.toneMapped=Kt.getTransfer(v.colorSpace)!==ae,(u!==v||d!==v.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,f=i.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new ct(new oe(2,2),new Xe({name:"BackgroundMaterial",uniforms:rs(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:Qn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=Kt.getTransfer(v.colorSpace)!==ae,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=v,d=v.version,f=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function p(x,y){x.getRGB(Dr,fu(i)),n.buffers.color.setClear(Dr.r,Dr.g,Dr.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(x,y=1){a.set(x),c=y,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,p(a,c)},render:_,addToRenderList:g}}function Jg(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(M,C,U,D,N){let W=!1,B=u(D,U,C);r!==B&&(r=B,l(r.object)),W=f(M,D,U,N),W&&m(M,D,U,N),N!==null&&t.update(N,i.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,v(M,C,U,D),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,C,U){let D=U.wireframe===!0,N=n[M.id];N===void 0&&(N={},n[M.id]=N);let W=N[C.id];W===void 0&&(W={},N[C.id]=W);let B=W[D];return B===void 0&&(B=d(c()),W[D]=B),B}function d(M){let C=[],U=[],D=[];for(let N=0;N<e;N++)C[N]=0,U[N]=0,D[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:U,attributeDivisors:D,object:M,attributes:{},index:null}}function f(M,C,U,D){let N=r.attributes,W=C.attributes,B=0,K=U.getAttributes();for(let F in K)if(K[F].location>=0){let ht=N[F],Y=W[F];if(Y===void 0&&(F==="instanceMatrix"&&M.instanceMatrix&&(Y=M.instanceMatrix),F==="instanceColor"&&M.instanceColor&&(Y=M.instanceColor)),ht===void 0||ht.attribute!==Y||Y&&ht.data!==Y.data)return!0;B++}return r.attributesNum!==B||r.index!==D}function m(M,C,U,D){let N={},W=C.attributes,B=0,K=U.getAttributes();for(let F in K)if(K[F].location>=0){let ht=W[F];ht===void 0&&(F==="instanceMatrix"&&M.instanceMatrix&&(ht=M.instanceMatrix),F==="instanceColor"&&M.instanceColor&&(ht=M.instanceColor));let Y={};Y.attribute=ht,ht&&ht.data&&(Y.data=ht.data),N[F]=Y,B++}r.attributes=N,r.attributesNum=B,r.index=D}function _(){let M=r.newAttributes;for(let C=0,U=M.length;C<U;C++)M[C]=0}function g(M){p(M,0)}function p(M,C){let U=r.newAttributes,D=r.enabledAttributes,N=r.attributeDivisors;U[M]=1,D[M]===0&&(i.enableVertexAttribArray(M),D[M]=1),N[M]!==C&&(i.vertexAttribDivisor(M,C),N[M]=C)}function x(){let M=r.newAttributes,C=r.enabledAttributes;for(let U=0,D=C.length;U<D;U++)C[U]!==M[U]&&(i.disableVertexAttribArray(U),C[U]=0)}function y(M,C,U,D,N,W,B){B===!0?i.vertexAttribIPointer(M,C,U,N,W):i.vertexAttribPointer(M,C,U,D,N,W)}function v(M,C,U,D){_();let N=D.attributes,W=U.getAttributes(),B=C.defaultAttributeValues;for(let K in W){let F=W[K];if(F.location>=0){let st=N[K];if(st===void 0&&(K==="instanceMatrix"&&M.instanceMatrix&&(st=M.instanceMatrix),K==="instanceColor"&&M.instanceColor&&(st=M.instanceColor)),st!==void 0){let ht=st.normalized,Y=st.itemSize,Q=t.get(st);if(Q===void 0)continue;let mt=Q.buffer,X=Q.type,et=Q.bytesPerElement,dt=X===i.INT||X===i.UNSIGNED_INT||st.gpuType===$c;if(st.isInterleavedBufferAttribute){let ot=st.data,pt=ot.stride,at=st.offset;if(ot.isInstancedInterleavedBuffer){for(let yt=0;yt<F.locationSize;yt++)p(F.location+yt,ot.meshPerAttribute);M.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let yt=0;yt<F.locationSize;yt++)g(F.location+yt);i.bindBuffer(i.ARRAY_BUFFER,mt);for(let yt=0;yt<F.locationSize;yt++)y(F.location+yt,Y/F.locationSize,X,ht,pt*et,(at+Y/F.locationSize*yt)*et,dt)}else{if(st.isInstancedBufferAttribute){for(let ot=0;ot<F.locationSize;ot++)p(F.location+ot,st.meshPerAttribute);M.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let ot=0;ot<F.locationSize;ot++)g(F.location+ot);i.bindBuffer(i.ARRAY_BUFFER,mt);for(let ot=0;ot<F.locationSize;ot++)y(F.location+ot,Y/F.locationSize,X,ht,Y*et,Y/F.locationSize*ot*et,dt)}}else if(B!==void 0){let ht=B[K];if(ht!==void 0)switch(ht.length){case 2:i.vertexAttrib2fv(F.location,ht);break;case 3:i.vertexAttrib3fv(F.location,ht);break;case 4:i.vertexAttrib4fv(F.location,ht);break;default:i.vertexAttrib1fv(F.location,ht)}}}}x()}function T(){E();for(let M in n){let C=n[M];for(let U in C){let D=C[U];for(let N in D)h(D[N].object),delete D[N];delete C[U]}delete n[M]}}function w(M){if(n[M.id]===void 0)return;let C=n[M.id];for(let U in C){let D=C[U];for(let N in D)h(D[N].object),delete D[N];delete C[U]}delete n[M.id]}function R(M){for(let C in n){let U=n[C];if(U[M.id]===void 0)continue;let D=U[M.id];for(let N in D)h(D[N].object),delete D[N];delete U[M.id]}}function E(){S(),o=!0,r!==s&&(r=s,l(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:E,resetDefaultState:S,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:g,disableUnusedAttributes:x}}function Kg(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];e.update(f,n,1)}function c(l,h,u,d){if(u===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<l.length;m++)o(l[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let m=0;for(let _=0;_<u;_++)m+=h[_]*d[_];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Qg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==fn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let E=R===Bn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Fn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==xn&&!E)}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=m>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:v,vertexTextures:T,maxSamples:w}}function jg(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Pn,a=new qt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){let m=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!g)r?h(null):l();else{let x=r?0:n,y=x*4,v=p.clippingState||null;c.value=v,v=h(m,d,y,f);for(let T=0;T!==y;++T)v[T]=e[T];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,m){let _=u!==null?u.length:0,g=null;if(_!==0){if(g=c.value,m!==!0||g===null){let p=f+_*4,x=d.matrixWorldInverse;a.getNormalMatrix(x),(g===null||g.length<p)&&(g=new Float32Array(p));for(let y=0,v=f;y!==_;++y,v+=4)o.copy(u[y]).applyMatrix4(x,a),o.normal.toArray(g,v),g[v+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function t_(i){let t=new WeakMap;function e(o,a){return a===La?o.mapping=es:a===Da&&(o.mapping=ns),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===La||a===Da)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Ws(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var os=class extends no{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Zi=4,fh=[.125,.215,.35,.446,.526,.582],di=20,ua=new os,dh=new Nt,fa=null,da=0,pa=0,ma=!1,ui=(1+Math.sqrt(5))/2,Hi=1/ui,ph=[new P(-ui,Hi,0),new P(ui,Hi,0),new P(-Hi,0,ui),new P(Hi,0,ui),new P(0,ui,-Hi),new P(0,ui,Hi),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],as=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){fa=this._renderer.getRenderTarget(),da=this._renderer.getActiveCubeFace(),pa=this._renderer.getActiveMipmapLevel(),ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_h(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(fa,da,pa),this._renderer.xr.enabled=ma,t.scissorTest=!1,Ur(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===es||t.mapping===ns?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),fa=this._renderer.getRenderTarget(),da=this._renderer.getActiveCubeFace(),pa=this._renderer.getActiveMipmapLevel(),ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:_n,minFilter:_n,generateMipmaps:!1,type:Bn,format:fn,colorSpace:ps,depthBuffer:!1},s=mh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=mh(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=e_(r)),this._blurMaterial=n_(r,t,e)}return s}_compileMaterial(t){let e=new ct(this._lodPlanes[0],t);this._renderer.compile(e,ua)}_sceneToCubeUV(t,e,n,s){let a=new Ne(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(dh),h.toneMapping=Jn,h.autoClear=!1;let f=new de({name:"PMREM.Background",side:Fe,depthWrite:!1,depthTest:!1}),m=new ct(new _e,f),_=!1,g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,_=!0):(f.color.copy(dh),_=!0);for(let p=0;p<6;p++){let x=p%3;x===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):x===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let y=this._cubeSize;Ur(s,x*y,p>2?y:0,y,y),h.setRenderTarget(s),_&&h.render(m,a),h.render(t,a)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=g}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===es||t.mapping===ns;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=_h()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gh());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new ct(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;Ur(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,ua)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=ph[(s-r-1)%ph.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new ct(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*di-1),_=r/m,g=isFinite(r)?1+Math.floor(h*_):di;g>di&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${di}`);let p=[],x=0;for(let R=0;R<di;++R){let E=R/_,S=Math.exp(-E*E/2);p.push(S),R===0?x+=S:R<g&&(x+=2*S)}for(let R=0;R<p.length;R++)p[R]=p[R]/x;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:y}=this;d.dTheta.value=m,d.mipInt.value=y-n;let v=this._sizeLods[s],T=3*v*(s>y-Zi?s-y+Zi:0),w=4*(this._cubeSize-v);Ur(e,T,w,3*v,2*v),c.setRenderTarget(e),c.render(u,ua)}};function e_(i){let t=[],e=[],n=[],s=i,r=i-Zi+1+fh.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-Zi?c=fh[o-i+Zi-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,_=3,g=2,p=1,x=new Float32Array(_*m*f),y=new Float32Array(g*m*f),v=new Float32Array(p*m*f);for(let w=0;w<f;w++){let R=w%3*2/3-1,E=w>2?0:-1,S=[R,E,0,R+2/3,E,0,R+2/3,E+1,0,R,E,0,R+2/3,E+1,0,R,E+1,0];x.set(S,_*m*w),y.set(d,g*m*w);let M=[w,w,w,w,w,w];v.set(M,p*m*w)}let T=new ce;T.setAttribute("position",new Ee(x,_)),T.setAttribute("uv",new Ee(y,g)),T.setAttribute("faceIndex",new Ee(v,p)),t.push(T),s>Zi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function mh(i,t,e){let n=new en(i,t,e);return n.texture.mapping=vo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ur(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function n_(i,t,e){let n=new Float32Array(di),s=new P(0,1,0);return new Xe({name:"SphericalGaussianBlur",defines:{n:di,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:sl(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function gh(){return new Xe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sl(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function _h(){return new Xe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function sl(){return`

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
	`}function i_(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===La||c===Da,h=c===es||c===ns;if(l||h){let u=t.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new as(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return l&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new as(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function s_(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Ls("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function r_(i,t,e,n){let s={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let m in d.attributes)t.remove(d.attributes[m]);for(let m in d.morphAttributes){let _=d.morphAttributes[m];for(let g=0,p=_.length;g<p;g++)t.remove(_[g])}d.removeEventListener("dispose",o),delete s[d.id];let f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function c(u){let d=u.attributes;for(let m in d)t.update(d[m],i.ARRAY_BUFFER);let f=u.morphAttributes;for(let m in f){let _=f[m];for(let g=0,p=_.length;g<p;g++)t.update(_[g],i.ARRAY_BUFFER)}}function l(u){let d=[],f=u.index,m=u.attributes.position,_=0;if(f!==null){let x=f.array;_=f.version;for(let y=0,v=x.length;y<v;y+=3){let T=x[y+0],w=x[y+1],R=x[y+2];d.push(T,w,w,R,R,T)}}else if(m!==void 0){let x=m.array;_=m.version;for(let y=0,v=x.length/3-1;y<v;y+=3){let T=y+0,w=y+1,R=y+2;d.push(T,w,w,R,R,T)}}else return;let g=new(hu(d)?eo:to)(d,1);g.version=_;let p=r.get(u);p&&t.remove(p),r.set(u,g)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function o_(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function l(d,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,d*o,m),e.update(f,n,m))}function h(d,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];e.update(g,n,1)}function u(d,f,m,_){if(m===0)return;let g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)l(d[p]/o,f[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,m);let p=0;for(let x=0;x<m;x++)p+=f[x]*_[x];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function a_(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function c_(i,t,e){let n=new WeakMap,s=new ie;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let S=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],x=a.morphAttributes.color||[],y=0;f===!0&&(y=1),m===!0&&(y=2),_===!0&&(y=3);let v=a.attributes.position.count*y,T=1;v>t.maxTextureSize&&(T=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let w=new Float32Array(v*T*4*u),R=new Qr(w,v,T,u);R.type=xn,R.needsUpdate=!0;let E=y*4;for(let M=0;M<u;M++){let C=g[M],U=p[M],D=x[M],N=v*T*4*M;for(let W=0;W<C.count;W++){let B=W*E;f===!0&&(s.fromBufferAttribute(C,W),w[N+B+0]=s.x,w[N+B+1]=s.y,w[N+B+2]=s.z,w[N+B+3]=0),m===!0&&(s.fromBufferAttribute(U,W),w[N+B+4]=s.x,w[N+B+5]=s.y,w[N+B+6]=s.z,w[N+B+7]=0),_===!0&&(s.fromBufferAttribute(D,W),w[N+B+8]=s.x,w[N+B+9]=s.y,w[N+B+10]=s.z,w[N+B+11]=D.itemSize===4?s.w:1)}}d={count:u,texture:R,size:new j(v,T)},n.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];let m=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function l_(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var cs=class extends ke{constructor(t,e,n,s,r,o,a,c,l,h=Ki){if(h!==Ki&&h!==ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ki&&(n=mi),n===void 0&&h===ss&&(n=is),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Je,this.minFilter=c!==void 0?c:Je,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},pu=new ke,xh=new cs(1,1),mu=new Qr,gu=new uc,_u=new io,yh=[],vh=[],Mh=new Float32Array(16),Sh=new Float32Array(9),bh=new Float32Array(4);function ms(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=yh[s];if(r===void 0&&(r=new Float32Array(s),yh[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Te(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Re(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function So(i,t){let e=vh[t];e===void 0&&(e=new Int32Array(t),vh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function h_(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function u_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2fv(this.addr,t),Re(e,t)}}function f_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Te(e,t))return;i.uniform3fv(this.addr,t),Re(e,t)}}function d_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4fv(this.addr,t),Re(e,t)}}function p_(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(Te(e,n))return;bh.set(n),i.uniformMatrix2fv(this.addr,!1,bh),Re(e,n)}}function m_(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(Te(e,n))return;Sh.set(n),i.uniformMatrix3fv(this.addr,!1,Sh),Re(e,n)}}function g_(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(Te(e,n))return;Mh.set(n),i.uniformMatrix4fv(this.addr,!1,Mh),Re(e,n)}}function __(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function x_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2iv(this.addr,t),Re(e,t)}}function y_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;i.uniform3iv(this.addr,t),Re(e,t)}}function v_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4iv(this.addr,t),Re(e,t)}}function M_(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function S_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2uiv(this.addr,t),Re(e,t)}}function b_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;i.uniform3uiv(this.addr,t),Re(e,t)}}function w_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4uiv(this.addr,t),Re(e,t)}}function A_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(xh.compareFunction=lu,r=xh):r=pu,e.setTexture2D(t||r,s)}function E_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||gu,s)}function T_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||_u,s)}function R_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||mu,s)}function C_(i){switch(i){case 5126:return h_;case 35664:return u_;case 35665:return f_;case 35666:return d_;case 35674:return p_;case 35675:return m_;case 35676:return g_;case 5124:case 35670:return __;case 35667:case 35671:return x_;case 35668:case 35672:return y_;case 35669:case 35673:return v_;case 5125:return M_;case 36294:return S_;case 36295:return b_;case 36296:return w_;case 35678:case 36198:case 36298:case 36306:case 35682:return A_;case 35679:case 36299:case 36307:return E_;case 35680:case 36300:case 36308:case 36293:return T_;case 36289:case 36303:case 36311:case 36292:return R_}}function I_(i,t){i.uniform1fv(this.addr,t)}function P_(i,t){let e=ms(t,this.size,2);i.uniform2fv(this.addr,e)}function L_(i,t){let e=ms(t,this.size,3);i.uniform3fv(this.addr,e)}function D_(i,t){let e=ms(t,this.size,4);i.uniform4fv(this.addr,e)}function U_(i,t){let e=ms(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function N_(i,t){let e=ms(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function F_(i,t){let e=ms(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function O_(i,t){i.uniform1iv(this.addr,t)}function B_(i,t){i.uniform2iv(this.addr,t)}function z_(i,t){i.uniform3iv(this.addr,t)}function k_(i,t){i.uniform4iv(this.addr,t)}function V_(i,t){i.uniform1uiv(this.addr,t)}function H_(i,t){i.uniform2uiv(this.addr,t)}function G_(i,t){i.uniform3uiv(this.addr,t)}function W_(i,t){i.uniform4uiv(this.addr,t)}function X_(i,t,e){let n=this.cache,s=t.length,r=So(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||pu,r[o])}function Y_(i,t,e){let n=this.cache,s=t.length,r=So(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||gu,r[o])}function q_(i,t,e){let n=this.cache,s=t.length,r=So(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||_u,r[o])}function Z_(i,t,e){let n=this.cache,s=t.length,r=So(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||mu,r[o])}function $_(i){switch(i){case 5126:return I_;case 35664:return P_;case 35665:return L_;case 35666:return D_;case 35674:return U_;case 35675:return N_;case 35676:return F_;case 5124:case 35670:return O_;case 35667:case 35671:return B_;case 35668:case 35672:return z_;case 35669:case 35673:return k_;case 5125:return V_;case 36294:return H_;case 36295:return G_;case 36296:return W_;case 35678:case 36198:case 36298:case 36306:case 35682:return X_;case 35679:case 36299:case 36307:return Y_;case 35680:case 36300:case 36308:case 36293:return q_;case 36289:case 36303:case 36311:case 36292:return Z_}}var fc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=C_(e.type)}},dc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=$_(e.type)}},pc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},ga=/(\w+)(\])?(\[|\.)?/g;function wh(i,t){i.seq.push(t),i.map[t.id]=t}function J_(i,t,e){let n=i.name,s=n.length;for(ga.lastIndex=0;;){let r=ga.exec(n),o=ga.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){wh(e,l===void 0?new fc(a,i,t):new dc(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new pc(a),wh(e,u)),e=u}}}var ji=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);J_(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function Ah(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var K_=37297,Q_=0;function j_(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Eh=new qt;function tx(i){Kt._getMatrix(Eh,Kt.workingColorSpace,i);let t=`mat3( ${Eh.elements.map(e=>e.toFixed(4))} )`;switch(Kt.getTransfer(i)){case Mo:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Th(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+j_(i.getShaderSource(t),o)}else return s}function ex(i,t){let e=tx(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function nx(i,t){let e;switch(t){case dp:e="Linear";break;case pp:e="Reinhard";break;case mp:e="Cineon";break;case gp:e="ACESFilmic";break;case Zc:e="AgX";break;case xp:e="Neutral";break;case _p:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Nr=new P;function ix(){Kt.getLuminanceCoefficients(Nr);let i=Nr.x.toFixed(4),t=Nr.y.toFixed(4),e=Nr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function sx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ds).join(`
`)}function rx(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function ox(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ds(i){return i!==""}function Rh(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ch(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var ax=/^[ \t]*#include +<([\w\d./]+)>/gm;function mc(i){return i.replace(ax,lx)}var cx=new Map;function lx(i,t){let e=Wt[t];if(e===void 0){let n=cx.get(t);if(n!==void 0)e=Wt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return mc(e)}var hx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ih(i){return i.replace(hx,ux)}function ux(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ph(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function fx(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Jh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===qc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===In&&(t="SHADOWMAP_TYPE_VSM"),t}function dx(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case es:case ns:t="ENVMAP_TYPE_CUBE";break;case vo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function px(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ns:t="ENVMAP_MODE_REFRACTION";break}return t}function mx(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Kh:t="ENVMAP_BLENDING_MULTIPLY";break;case up:t="ENVMAP_BLENDING_MIX";break;case fp:t="ENVMAP_BLENDING_ADD";break}return t}function gx(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function _x(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=fx(e),l=dx(e),h=px(e),u=mx(e),d=gx(e),f=sx(e),m=rx(r),_=s.createProgram(),g,p,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ds).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ds).join(`
`),p.length>0&&(p+=`
`)):(g=[Ph(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ds).join(`
`),p=[Ph(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Jn?"#define TONE_MAPPING":"",e.toneMapping!==Jn?Wt.tonemapping_pars_fragment:"",e.toneMapping!==Jn?nx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,ex("linearToOutputTexel",e.outputColorSpace),ix(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ds).join(`
`)),o=mc(o),o=Rh(o,e),o=Ch(o,e),a=mc(a),a=Rh(a,e),a=Ch(a,e),o=Ih(o),a=Ih(a),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Wl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Wl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let y=x+g+o,v=x+p+a,T=Ah(s,s.VERTEX_SHADER,y),w=Ah(s,s.FRAGMENT_SHADER,v);s.attachShader(_,T),s.attachShader(_,w),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(C){if(i.debug.checkShaderErrors){let U=s.getProgramInfoLog(_).trim(),D=s.getShaderInfoLog(T).trim(),N=s.getShaderInfoLog(w).trim(),W=!0,B=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,T,w);else{let K=Th(s,T,"vertex"),F=Th(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+U+`
`+K+`
`+F)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(D===""||N==="")&&(B=!1);B&&(C.diagnostics={runnable:W,programLog:U,vertexShader:{log:D,prefix:g},fragmentShader:{log:N,prefix:p}})}s.deleteShader(T),s.deleteShader(w),E=new ji(s,_),S=ox(s,_)}let E;this.getUniforms=function(){return E===void 0&&R(this),E};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(_,K_)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Q_++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=w,this}var xx=0,gc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new _c(t),e.set(t,n)),n}},_c=class{constructor(t){this.id=xx++,this.code=t,this.usedTimes=0}};function yx(i,t,e,n,s,r,o){let a=new Hs,c=new gc,l=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures,f=s.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return l.add(S),S===0?"uv":`uv${S}`}function g(S,M,C,U,D){let N=U.fog,W=D.geometry,B=S.isMeshStandardMaterial?U.environment:null,K=(S.isMeshStandardMaterial?e:t).get(S.envMap||B),F=K&&K.mapping===vo?K.image.height:null,st=m[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let ht=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Y=ht!==void 0?ht.length:0,Q=0;W.morphAttributes.position!==void 0&&(Q=1),W.morphAttributes.normal!==void 0&&(Q=2),W.morphAttributes.color!==void 0&&(Q=3);let mt,X,et,dt;if(st){let se=gn[st];mt=se.vertexShader,X=se.fragmentShader}else mt=S.vertexShader,X=S.fragmentShader,c.update(S),et=c.getVertexShaderID(S),dt=c.getFragmentShaderID(S);let ot=i.getRenderTarget(),pt=i.state.buffers.depth.getReversed(),at=D.isInstancedMesh===!0,yt=D.isBatchedMesh===!0,It=!!S.map,Z=!!S.matcap,rt=!!K,L=!!S.aoMap,St=!!S.lightMap,it=!!S.bumpMap,At=!!S.normalMap,ut=!!S.displacementMap,Ot=!!S.emissiveMap,vt=!!S.metalnessMap,I=!!S.roughnessMap,b=S.anisotropy>0,V=S.clearcoat>0,$=S.dispersion>0,nt=S.iridescence>0,J=S.sheen>0,Pt=S.transmission>0,xt=b&&!!S.anisotropyMap,Tt=V&&!!S.clearcoatMap,$t=V&&!!S.clearcoatNormalMap,lt=V&&!!S.clearcoatRoughnessMap,Rt=nt&&!!S.iridescenceMap,kt=nt&&!!S.iridescenceThicknessMap,Ht=J&&!!S.sheenColorMap,Ct=J&&!!S.sheenRoughnessMap,Jt=!!S.specularMap,Zt=!!S.specularColorMap,le=!!S.specularIntensityMap,O=Pt&&!!S.transmissionMap,Mt=Pt&&!!S.thicknessMap,q=!!S.gradientMap,tt=!!S.alphaMap,Et=S.alphaTest>0,bt=!!S.alphaHash,Xt=!!S.extensions,ye=Jn;S.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(ye=i.toneMapping);let Le={shaderID:st,shaderType:S.type,shaderName:S.name,vertexShader:mt,fragmentShader:X,defines:S.defines,customVertexShaderID:et,customFragmentShaderID:dt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:yt,batchingColor:yt&&D._colorsTexture!==null,instancing:at,instancingColor:at&&D.instanceColor!==null,instancingMorph:at&&D.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ot===null?i.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:ps,alphaToCoverage:!!S.alphaToCoverage,map:It,matcap:Z,envMap:rt,envMapMode:rt&&K.mapping,envMapCubeUVHeight:F,aoMap:L,lightMap:St,bumpMap:it,normalMap:At,displacementMap:d&&ut,emissiveMap:Ot,normalMapObjectSpace:At&&S.normalMapType===Sp,normalMapTangentSpace:At&&S.normalMapType===cu,metalnessMap:vt,roughnessMap:I,anisotropy:b,anisotropyMap:xt,clearcoat:V,clearcoatMap:Tt,clearcoatNormalMap:$t,clearcoatRoughnessMap:lt,dispersion:$,iridescence:nt,iridescenceMap:Rt,iridescenceThicknessMap:kt,sheen:J,sheenColorMap:Ht,sheenRoughnessMap:Ct,specularMap:Jt,specularColorMap:Zt,specularIntensityMap:le,transmission:Pt,transmissionMap:O,thicknessMap:Mt,gradientMap:q,opaque:S.transparent===!1&&S.blending===Ji&&S.alphaToCoverage===!1,alphaMap:tt,alphaTest:Et,alphaHash:bt,combine:S.combine,mapUv:It&&_(S.map.channel),aoMapUv:L&&_(S.aoMap.channel),lightMapUv:St&&_(S.lightMap.channel),bumpMapUv:it&&_(S.bumpMap.channel),normalMapUv:At&&_(S.normalMap.channel),displacementMapUv:ut&&_(S.displacementMap.channel),emissiveMapUv:Ot&&_(S.emissiveMap.channel),metalnessMapUv:vt&&_(S.metalnessMap.channel),roughnessMapUv:I&&_(S.roughnessMap.channel),anisotropyMapUv:xt&&_(S.anisotropyMap.channel),clearcoatMapUv:Tt&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:$t&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:lt&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Rt&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:kt&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ht&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&_(S.sheenRoughnessMap.channel),specularMapUv:Jt&&_(S.specularMap.channel),specularColorMapUv:Zt&&_(S.specularColorMap.channel),specularIntensityMapUv:le&&_(S.specularIntensityMap.channel),transmissionMapUv:O&&_(S.transmissionMap.channel),thicknessMapUv:Mt&&_(S.thicknessMap.channel),alphaMapUv:tt&&_(S.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(At||b),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!W.attributes.uv&&(It||tt),fog:!!N,useFog:S.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:pt,skinning:D.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:Y,morphTextureStride:Q,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:ye,decodeVideoTexture:It&&S.map.isVideoTexture===!0&&Kt.getTransfer(S.map.colorSpace)===ae,decodeVideoTextureEmissive:Ot&&S.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(S.emissiveMap.colorSpace)===ae,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===me,flipSided:S.side===Fe,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Xt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Xt&&S.extensions.multiDraw===!0||yt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Le.vertexUv1s=l.has(1),Le.vertexUv2s=l.has(2),Le.vertexUv3s=l.has(3),l.clear(),Le}function p(S){let M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(let C in S.defines)M.push(C),M.push(S.defines[C]);return S.isRawShaderMaterial===!1&&(x(M,S),y(M,S),M.push(i.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function x(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function y(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),S.push(a.mask)}function v(S){let M=m[S.type],C;if(M){let U=gn[M];C=lm.clone(U.uniforms)}else C=S.uniforms;return C}function T(S,M){let C;for(let U=0,D=h.length;U<D;U++){let N=h[U];if(N.cacheKey===M){C=N,++C.usedTimes;break}}return C===void 0&&(C=new _x(i,M,S,r),h.push(C)),C}function w(S){if(--S.usedTimes===0){let M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function R(S){c.remove(S)}function E(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:T,releaseProgram:w,releaseShaderCache:R,programs:h,dispose:E}}function vx(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Mx(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Lh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Dh(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,m,_,g){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:_,group:g},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=_,p.group=g),t++,p}function a(u,d,f,m,_,g){let p=o(u,d,f,m,_,g);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(u,d,f,m,_,g){let p=o(u,d,f,m,_,g);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,d){e.length>1&&e.sort(u||Mx),n.length>1&&n.sort(d||Lh),s.length>1&&s.sort(d||Lh)}function h(){for(let u=t,d=i.length;u<d;u++){let f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Sx(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Dh,i.set(n,[o])):s>=r.length?(o=new Dh,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function bx(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Nt};break;case"SpotLight":e={position:new P,direction:new P,color:new Nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Nt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Nt,groundColor:new Nt};break;case"RectAreaLight":e={color:new Nt,position:new P,halfWidth:new P,halfHeight:new P};break}return i[t.id]=e,e}}}function wx(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new j};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new j};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new j,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Ax=0;function Ex(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Tx(i){let t=new bx,e=wx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new P);let s=new P,r=new Vt,o=new Vt;function a(l){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,m=0,_=0,g=0,p=0,x=0,y=0,v=0,T=0,w=0,R=0;l.sort(Ex);for(let S=0,M=l.length;S<M;S++){let C=l[S],U=C.color,D=C.intensity,N=C.distance,W=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=U.r*D,u+=U.g*D,d+=U.b*D;else if(C.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(C.sh.coefficients[B],D);R++}else if(C.isDirectionalLight){let B=t.get(C);if(B.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let K=C.shadow,F=e.get(C);F.shadowIntensity=K.intensity,F.shadowBias=K.bias,F.shadowNormalBias=K.normalBias,F.shadowRadius=K.radius,F.shadowMapSize=K.mapSize,n.directionalShadow[f]=F,n.directionalShadowMap[f]=W,n.directionalShadowMatrix[f]=C.shadow.matrix,x++}n.directional[f]=B,f++}else if(C.isSpotLight){let B=t.get(C);B.position.setFromMatrixPosition(C.matrixWorld),B.color.copy(U).multiplyScalar(D),B.distance=N,B.coneCos=Math.cos(C.angle),B.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),B.decay=C.decay,n.spot[_]=B;let K=C.shadow;if(C.map&&(n.spotLightMap[T]=C.map,T++,K.updateMatrices(C),C.castShadow&&w++),n.spotLightMatrix[_]=K.matrix,C.castShadow){let F=e.get(C);F.shadowIntensity=K.intensity,F.shadowBias=K.bias,F.shadowNormalBias=K.normalBias,F.shadowRadius=K.radius,F.shadowMapSize=K.mapSize,n.spotShadow[_]=F,n.spotShadowMap[_]=W,v++}_++}else if(C.isRectAreaLight){let B=t.get(C);B.color.copy(U).multiplyScalar(D),B.halfWidth.set(C.width*.5,0,0),B.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=B,g++}else if(C.isPointLight){let B=t.get(C);if(B.color.copy(C.color).multiplyScalar(C.intensity),B.distance=C.distance,B.decay=C.decay,C.castShadow){let K=C.shadow,F=e.get(C);F.shadowIntensity=K.intensity,F.shadowBias=K.bias,F.shadowNormalBias=K.normalBias,F.shadowRadius=K.radius,F.shadowMapSize=K.mapSize,F.shadowCameraNear=K.camera.near,F.shadowCameraFar=K.camera.far,n.pointShadow[m]=F,n.pointShadowMap[m]=W,n.pointShadowMatrix[m]=C.shadow.matrix,y++}n.point[m]=B,m++}else if(C.isHemisphereLight){let B=t.get(C);B.skyColor.copy(C.color).multiplyScalar(D),B.groundColor.copy(C.groundColor).multiplyScalar(D),n.hemi[p]=B,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=gt.LTC_FLOAT_1,n.rectAreaLTC2=gt.LTC_FLOAT_2):(n.rectAreaLTC1=gt.LTC_HALF_1,n.rectAreaLTC2=gt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let E=n.hash;(E.directionalLength!==f||E.pointLength!==m||E.spotLength!==_||E.rectAreaLength!==g||E.hemiLength!==p||E.numDirectionalShadows!==x||E.numPointShadows!==y||E.numSpotShadows!==v||E.numSpotMaps!==T||E.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=v+T-w,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=R,E.directionalLength=f,E.pointLength=m,E.spotLength=_,E.rectAreaLength=g,E.hemiLength=p,E.numDirectionalShadows=x,E.numPointShadows=y,E.numSpotShadows=v,E.numSpotMaps=T,E.numLightProbes=R,n.version=Ax++)}function c(l,h){let u=0,d=0,f=0,m=0,_=0,g=h.matrixWorldInverse;for(let p=0,x=l.length;p<x;p++){let y=l[p];if(y.isDirectionalLight){let v=n.directional[u];v.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),u++}else if(y.isSpotLight){let v=n.spot[f];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),f++}else if(y.isRectAreaLight){let v=n.rectArea[m];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(g),o.identity(),r.copy(y.matrixWorld),r.premultiply(g),o.extractRotation(r),v.halfWidth.set(y.width*.5,0,0),v.halfHeight.set(0,y.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),m++}else if(y.isPointLight){let v=n.point[d];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(g),d++}else if(y.isHemisphereLight){let v=n.hemi[_];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(g),_++}}}return{setup:a,setupView:c,state:n}}function Uh(i){let t=new Tx(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Rx(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Uh(i),t.set(s,[a])):r>=o.length?(a=new Uh(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var xc=class extends ti{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=vp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},yc=class extends ti{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Cx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ix=`uniform sampler2D shadow_pass;
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
}`;function Px(i,t,e){let n=new Xs,s=new j,r=new j,o=new ie,a=new xc({depthPacking:Mp}),c=new yc,l={},h=e.maxTextureSize,u={[Qn]:Fe,[Fe]:Qn,[me]:me},d=new Xe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new j},radius:{value:4}},vertexShader:Cx,fragmentShader:Ix}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let m=new ce;m.setAttribute("position",new Ee(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new ct(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jh;let p=this.type;this.render=function(w,R,E){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;let S=i.getRenderTarget(),M=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),U=i.state;U.setBlending($n),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let D=p!==In&&this.type===In,N=p===In&&this.type!==In;for(let W=0,B=w.length;W<B;W++){let K=w[W],F=K.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;s.copy(F.mapSize);let st=F.getFrameExtents();if(s.multiply(st),r.copy(F.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/st.x),s.x=r.x*st.x,F.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/st.y),s.y=r.y*st.y,F.mapSize.y=r.y)),F.map===null||D===!0||N===!0){let Y=this.type!==In?{minFilter:Je,magFilter:Je}:{};F.map!==null&&F.map.dispose(),F.map=new en(s.x,s.y,Y),F.map.texture.name=K.name+".shadowMap",F.camera.updateProjectionMatrix()}i.setRenderTarget(F.map),i.clear();let ht=F.getViewportCount();for(let Y=0;Y<ht;Y++){let Q=F.getViewport(Y);o.set(r.x*Q.x,r.y*Q.y,r.x*Q.z,r.y*Q.w),U.viewport(o),F.updateMatrices(K,Y),n=F.getFrustum(),v(R,E,F.camera,K,this.type)}F.isPointLightShadow!==!0&&this.type===In&&x(F,E),F.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(S,M,C)};function x(w,R){let E=t.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new en(s.x,s.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(R,null,E,d,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(R,null,E,f,_,null)}function y(w,R,E,S){let M=null,C=E.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)M=C;else if(M=E.isPointLight===!0?c:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){let U=M.uuid,D=R.uuid,N=l[U];N===void 0&&(N={},l[U]=N);let W=N[D];W===void 0&&(W=M.clone(),N[D]=W,R.addEventListener("dispose",T)),M=W}if(M.visible=R.visible,M.wireframe=R.wireframe,S===In?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:u[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,E.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let U=i.properties.get(M);U.light=E}return M}function v(w,R,E,S,M){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&M===In)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,w.matrixWorld);let D=t.update(w),N=w.material;if(Array.isArray(N)){let W=D.groups;for(let B=0,K=W.length;B<K;B++){let F=W[B],st=N[F.materialIndex];if(st&&st.visible){let ht=y(w,st,S,M);w.onBeforeShadow(i,w,R,E,D,ht,F),i.renderBufferDirect(E,null,D,ht,w,F),w.onAfterShadow(i,w,R,E,D,ht,F)}}}else if(N.visible){let W=y(w,N,S,M);w.onBeforeShadow(i,w,R,E,D,W,null),i.renderBufferDirect(E,null,D,W,w,null),w.onAfterShadow(i,w,R,E,D,W,null)}}let U=w.children;for(let D=0,N=U.length;D<N;D++)v(U[D],R,E,S,M)}function T(w){w.target.removeEventListener("dispose",T);for(let E in l){let S=l[E],M=w.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}var Lx={[Aa]:Ea,[Ta]:Ia,[Ra]:Pa,[ts]:Ca,[Ea]:Aa,[Ia]:Ta,[Pa]:Ra,[Ca]:ts};function Dx(i,t){function e(){let O=!1,Mt=new ie,q=null,tt=new ie(0,0,0,0);return{setMask:function(Et){q!==Et&&!O&&(i.colorMask(Et,Et,Et,Et),q=Et)},setLocked:function(Et){O=Et},setClear:function(Et,bt,Xt,ye,Le){Le===!0&&(Et*=ye,bt*=ye,Xt*=ye),Mt.set(Et,bt,Xt,ye),tt.equals(Mt)===!1&&(i.clearColor(Et,bt,Xt,ye),tt.copy(Mt))},reset:function(){O=!1,q=null,tt.set(-1,0,0,0)}}}function n(){let O=!1,Mt=!1,q=null,tt=null,Et=null;return{setReversed:function(bt){if(Mt!==bt){let Xt=t.get("EXT_clip_control");Mt?Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.ZERO_TO_ONE_EXT):Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.NEGATIVE_ONE_TO_ONE_EXT);let ye=Et;Et=null,this.setClear(ye)}Mt=bt},getReversed:function(){return Mt},setTest:function(bt){bt?ot(i.DEPTH_TEST):pt(i.DEPTH_TEST)},setMask:function(bt){q!==bt&&!O&&(i.depthMask(bt),q=bt)},setFunc:function(bt){if(Mt&&(bt=Lx[bt]),tt!==bt){switch(bt){case Aa:i.depthFunc(i.NEVER);break;case Ea:i.depthFunc(i.ALWAYS);break;case Ta:i.depthFunc(i.LESS);break;case ts:i.depthFunc(i.LEQUAL);break;case Ra:i.depthFunc(i.EQUAL);break;case Ca:i.depthFunc(i.GEQUAL);break;case Ia:i.depthFunc(i.GREATER);break;case Pa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}tt=bt}},setLocked:function(bt){O=bt},setClear:function(bt){Et!==bt&&(Mt&&(bt=1-bt),i.clearDepth(bt),Et=bt)},reset:function(){O=!1,q=null,tt=null,Et=null,Mt=!1}}}function s(){let O=!1,Mt=null,q=null,tt=null,Et=null,bt=null,Xt=null,ye=null,Le=null;return{setTest:function(se){O||(se?ot(i.STENCIL_TEST):pt(i.STENCIL_TEST))},setMask:function(se){Mt!==se&&!O&&(i.stencilMask(se),Mt=se)},setFunc:function(se,on,bn){(q!==se||tt!==on||Et!==bn)&&(i.stencilFunc(se,on,bn),q=se,tt=on,Et=bn)},setOp:function(se,on,bn){(bt!==se||Xt!==on||ye!==bn)&&(i.stencilOp(se,on,bn),bt=se,Xt=on,ye=bn)},setLocked:function(se){O=se},setClear:function(se){Le!==se&&(i.clearStencil(se),Le=se)},reset:function(){O=!1,Mt=null,q=null,tt=null,Et=null,bt=null,Xt=null,ye=null,Le=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},u={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,x=null,y=null,v=null,T=null,w=null,R=new Nt(0,0,0),E=0,S=!1,M=null,C=null,U=null,D=null,N=null,W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),B=!1,K=0,F=i.getParameter(i.VERSION);F.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(F)[1]),B=K>=1):F.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),B=K>=2);let st=null,ht={},Y=i.getParameter(i.SCISSOR_BOX),Q=i.getParameter(i.VIEWPORT),mt=new ie().fromArray(Y),X=new ie().fromArray(Q);function et(O,Mt,q,tt){let Et=new Uint8Array(4),bt=i.createTexture();i.bindTexture(O,bt),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Xt=0;Xt<q;Xt++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(Mt,0,i.RGBA,1,1,tt,0,i.RGBA,i.UNSIGNED_BYTE,Et):i.texImage2D(Mt+Xt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Et);return bt}let dt={};dt[i.TEXTURE_2D]=et(i.TEXTURE_2D,i.TEXTURE_2D,1),dt[i.TEXTURE_CUBE_MAP]=et(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),dt[i.TEXTURE_2D_ARRAY]=et(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),dt[i.TEXTURE_3D]=et(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ot(i.DEPTH_TEST),o.setFunc(ts),it(!1),At(Fl),ot(i.CULL_FACE),L($n);function ot(O){h[O]!==!0&&(i.enable(O),h[O]=!0)}function pt(O){h[O]!==!1&&(i.disable(O),h[O]=!1)}function at(O,Mt){return u[O]!==Mt?(i.bindFramebuffer(O,Mt),u[O]=Mt,O===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=Mt),O===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=Mt),!0):!1}function yt(O,Mt){let q=f,tt=!1;if(O){q=d.get(Mt),q===void 0&&(q=[],d.set(Mt,q));let Et=O.textures;if(q.length!==Et.length||q[0]!==i.COLOR_ATTACHMENT0){for(let bt=0,Xt=Et.length;bt<Xt;bt++)q[bt]=i.COLOR_ATTACHMENT0+bt;q.length=Et.length,tt=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,tt=!0);tt&&i.drawBuffers(q)}function It(O){return m!==O?(i.useProgram(O),m=O,!0):!1}let Z={[fi]:i.FUNC_ADD,[Zd]:i.FUNC_SUBTRACT,[$d]:i.FUNC_REVERSE_SUBTRACT};Z[Jd]=i.MIN,Z[Kd]=i.MAX;let rt={[Qd]:i.ZERO,[jd]:i.ONE,[tp]:i.SRC_COLOR,[ba]:i.SRC_ALPHA,[op]:i.SRC_ALPHA_SATURATE,[sp]:i.DST_COLOR,[np]:i.DST_ALPHA,[ep]:i.ONE_MINUS_SRC_COLOR,[wa]:i.ONE_MINUS_SRC_ALPHA,[rp]:i.ONE_MINUS_DST_COLOR,[ip]:i.ONE_MINUS_DST_ALPHA,[ap]:i.CONSTANT_COLOR,[cp]:i.ONE_MINUS_CONSTANT_COLOR,[lp]:i.CONSTANT_ALPHA,[hp]:i.ONE_MINUS_CONSTANT_ALPHA};function L(O,Mt,q,tt,Et,bt,Xt,ye,Le,se){if(O===$n){_===!0&&(pt(i.BLEND),_=!1);return}if(_===!1&&(ot(i.BLEND),_=!0),O!==qd){if(O!==g||se!==S){if((p!==fi||v!==fi)&&(i.blendEquation(i.FUNC_ADD),p=fi,v=fi),se)switch(O){case Ji:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ol:i.blendFunc(i.ONE,i.ONE);break;case Bl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Ji:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ol:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Bl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}x=null,y=null,T=null,w=null,R.set(0,0,0),E=0,g=O,S=se}return}Et=Et||Mt,bt=bt||q,Xt=Xt||tt,(Mt!==p||Et!==v)&&(i.blendEquationSeparate(Z[Mt],Z[Et]),p=Mt,v=Et),(q!==x||tt!==y||bt!==T||Xt!==w)&&(i.blendFuncSeparate(rt[q],rt[tt],rt[bt],rt[Xt]),x=q,y=tt,T=bt,w=Xt),(ye.equals(R)===!1||Le!==E)&&(i.blendColor(ye.r,ye.g,ye.b,Le),R.copy(ye),E=Le),g=O,S=!1}function St(O,Mt){O.side===me?pt(i.CULL_FACE):ot(i.CULL_FACE);let q=O.side===Fe;Mt&&(q=!q),it(q),O.blending===Ji&&O.transparent===!1?L($n):L(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);let tt=O.stencilWrite;a.setTest(tt),tt&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Ot(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ot(i.SAMPLE_ALPHA_TO_COVERAGE):pt(i.SAMPLE_ALPHA_TO_COVERAGE)}function it(O){M!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),M=O)}function At(O){O!==Xd?(ot(i.CULL_FACE),O!==C&&(O===Fl?i.cullFace(i.BACK):O===Yd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):pt(i.CULL_FACE),C=O}function ut(O){O!==U&&(B&&i.lineWidth(O),U=O)}function Ot(O,Mt,q){O?(ot(i.POLYGON_OFFSET_FILL),(D!==Mt||N!==q)&&(i.polygonOffset(Mt,q),D=Mt,N=q)):pt(i.POLYGON_OFFSET_FILL)}function vt(O){O?ot(i.SCISSOR_TEST):pt(i.SCISSOR_TEST)}function I(O){O===void 0&&(O=i.TEXTURE0+W-1),st!==O&&(i.activeTexture(O),st=O)}function b(O,Mt,q){q===void 0&&(st===null?q=i.TEXTURE0+W-1:q=st);let tt=ht[q];tt===void 0&&(tt={type:void 0,texture:void 0},ht[q]=tt),(tt.type!==O||tt.texture!==Mt)&&(st!==q&&(i.activeTexture(q),st=q),i.bindTexture(O,Mt||dt[O]),tt.type=O,tt.texture=Mt)}function V(){let O=ht[st];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function $(){try{i.compressedTexImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function nt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function J(){try{i.texSubImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Pt(){try{i.texSubImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function xt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Tt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function $t(){try{i.texStorage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function lt(){try{i.texStorage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Rt(){try{i.texImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function kt(){try{i.texImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ht(O){mt.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),mt.copy(O))}function Ct(O){X.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),X.copy(O))}function Jt(O,Mt){let q=l.get(Mt);q===void 0&&(q=new WeakMap,l.set(Mt,q));let tt=q.get(O);tt===void 0&&(tt=i.getUniformBlockIndex(Mt,O.name),q.set(O,tt))}function Zt(O,Mt){let tt=l.get(Mt).get(O);c.get(Mt)!==tt&&(i.uniformBlockBinding(Mt,tt,O.__bindingPointIndex),c.set(Mt,tt))}function le(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},st=null,ht={},u={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,x=null,y=null,v=null,T=null,w=null,R=new Nt(0,0,0),E=0,S=!1,M=null,C=null,U=null,D=null,N=null,mt.set(0,0,i.canvas.width,i.canvas.height),X.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ot,disable:pt,bindFramebuffer:at,drawBuffers:yt,useProgram:It,setBlending:L,setMaterial:St,setFlipSided:it,setCullFace:At,setLineWidth:ut,setPolygonOffset:Ot,setScissorTest:vt,activeTexture:I,bindTexture:b,unbindTexture:V,compressedTexImage2D:$,compressedTexImage3D:nt,texImage2D:Rt,texImage3D:kt,updateUBOMapping:Jt,uniformBlockBinding:Zt,texStorage2D:$t,texStorage3D:lt,texSubImage2D:J,texSubImage3D:Pt,compressedTexSubImage2D:xt,compressedTexSubImage3D:Tt,scissor:Ht,viewport:Ct,reset:le}}function Nh(i,t,e,n){let s=Ux(n);switch(e){case nu:return i*t;case su:return i*t;case ru:return i*t*2;case Qc:return i*t/s.components*s.byteLength;case jc:return i*t/s.components*s.byteLength;case ou:return i*t*2/s.components*s.byteLength;case tl:return i*t*2/s.components*s.byteLength;case iu:return i*t*3/s.components*s.byteLength;case fn:return i*t*4/s.components*s.byteLength;case el:return i*t*4/s.components*s.byteLength;case Wr:case Xr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Yr:case qr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Fa:case Ba:return Math.max(i,16)*Math.max(t,8)/4;case Na:case Oa:return Math.max(i,8)*Math.max(t,8)/2;case za:case ka:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Va:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ha:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ga:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Wa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Xa:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ya:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case qa:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Za:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case $a:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ja:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ka:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Qa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ja:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case tc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ec:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Zr:case nc:case ic:return Math.ceil(i/4)*Math.ceil(t/4)*16;case au:case sc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case rc:case oc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Ux(i){switch(i){case Fn:case jh:return{byteLength:1,components:1};case zs:case tu:case Bn:return{byteLength:2,components:1};case Jc:case Kc:return{byteLength:2,components:4};case mi:case $c:case xn:return{byteLength:4,components:1};case eu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Nx(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new j,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(I,b){return f?new OffscreenCanvas(I,b):Vs("canvas")}function _(I,b,V){let $=1,nt=vt(I);if((nt.width>V||nt.height>V)&&($=V/Math.max(nt.width,nt.height)),$<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let J=Math.floor($*nt.width),Pt=Math.floor($*nt.height);u===void 0&&(u=m(J,Pt));let xt=b?m(J,Pt):u;return xt.width=J,xt.height=Pt,xt.getContext("2d").drawImage(I,0,0,J,Pt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+nt.width+"x"+nt.height+") to ("+J+"x"+Pt+")."),xt}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+nt.width+"x"+nt.height+")."),I;return I}function g(I){return I.generateMipmaps}function p(I){i.generateMipmap(I)}function x(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(I,b,V,$,nt=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let J=b;if(b===i.RED&&(V===i.FLOAT&&(J=i.R32F),V===i.HALF_FLOAT&&(J=i.R16F),V===i.UNSIGNED_BYTE&&(J=i.R8)),b===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(J=i.R8UI),V===i.UNSIGNED_SHORT&&(J=i.R16UI),V===i.UNSIGNED_INT&&(J=i.R32UI),V===i.BYTE&&(J=i.R8I),V===i.SHORT&&(J=i.R16I),V===i.INT&&(J=i.R32I)),b===i.RG&&(V===i.FLOAT&&(J=i.RG32F),V===i.HALF_FLOAT&&(J=i.RG16F),V===i.UNSIGNED_BYTE&&(J=i.RG8)),b===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(J=i.RG8UI),V===i.UNSIGNED_SHORT&&(J=i.RG16UI),V===i.UNSIGNED_INT&&(J=i.RG32UI),V===i.BYTE&&(J=i.RG8I),V===i.SHORT&&(J=i.RG16I),V===i.INT&&(J=i.RG32I)),b===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(J=i.RGB8UI),V===i.UNSIGNED_SHORT&&(J=i.RGB16UI),V===i.UNSIGNED_INT&&(J=i.RGB32UI),V===i.BYTE&&(J=i.RGB8I),V===i.SHORT&&(J=i.RGB16I),V===i.INT&&(J=i.RGB32I)),b===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),V===i.UNSIGNED_INT&&(J=i.RGBA32UI),V===i.BYTE&&(J=i.RGBA8I),V===i.SHORT&&(J=i.RGBA16I),V===i.INT&&(J=i.RGBA32I)),b===i.RGB&&V===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),b===i.RGBA){let Pt=nt?Mo:Kt.getTransfer($);V===i.FLOAT&&(J=i.RGBA32F),V===i.HALF_FLOAT&&(J=i.RGBA16F),V===i.UNSIGNED_BYTE&&(J=Pt===ae?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function v(I,b){let V;return I?b===null||b===mi||b===is?V=i.DEPTH24_STENCIL8:b===xn?V=i.DEPTH32F_STENCIL8:b===zs&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===mi||b===is?V=i.DEPTH_COMPONENT24:b===xn?V=i.DEPTH_COMPONENT32F:b===zs&&(V=i.DEPTH_COMPONENT16),V}function T(I,b){return g(I)===!0||I.isFramebufferTexture&&I.minFilter!==Je&&I.minFilter!==_n?Math.log2(Math.max(b.width,b.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?b.mipmaps.length:1}function w(I){let b=I.target;b.removeEventListener("dispose",w),E(b),b.isVideoTexture&&h.delete(b)}function R(I){let b=I.target;b.removeEventListener("dispose",R),M(b)}function E(I){let b=n.get(I);if(b.__webglInit===void 0)return;let V=I.source,$=d.get(V);if($){let nt=$[b.__cacheKey];nt.usedTimes--,nt.usedTimes===0&&S(I),Object.keys($).length===0&&d.delete(V)}n.remove(I)}function S(I){let b=n.get(I);i.deleteTexture(b.__webglTexture);let V=I.source,$=d.get(V);delete $[b.__cacheKey],o.memory.textures--}function M(I){let b=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(b.__webglFramebuffer[$]))for(let nt=0;nt<b.__webglFramebuffer[$].length;nt++)i.deleteFramebuffer(b.__webglFramebuffer[$][nt]);else i.deleteFramebuffer(b.__webglFramebuffer[$]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[$])}else{if(Array.isArray(b.__webglFramebuffer))for(let $=0;$<b.__webglFramebuffer.length;$++)i.deleteFramebuffer(b.__webglFramebuffer[$]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let $=0;$<b.__webglColorRenderbuffer.length;$++)b.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[$]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let V=I.textures;for(let $=0,nt=V.length;$<nt;$++){let J=n.get(V[$]);J.__webglTexture&&(i.deleteTexture(J.__webglTexture),o.memory.textures--),n.remove(V[$])}n.remove(I)}let C=0;function U(){C=0}function D(){let I=C;return I>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),C+=1,I}function N(I){let b=[];return b.push(I.wrapS),b.push(I.wrapT),b.push(I.wrapR||0),b.push(I.magFilter),b.push(I.minFilter),b.push(I.anisotropy),b.push(I.internalFormat),b.push(I.format),b.push(I.type),b.push(I.generateMipmaps),b.push(I.premultiplyAlpha),b.push(I.flipY),b.push(I.unpackAlignment),b.push(I.colorSpace),b.join()}function W(I,b){let V=n.get(I);if(I.isVideoTexture&&ut(I),I.isRenderTargetTexture===!1&&I.version>0&&V.__version!==I.version){let $=I.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(V,I,b);return}}e.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+b)}function B(I,b){let V=n.get(I);if(I.version>0&&V.__version!==I.version){X(V,I,b);return}e.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+b)}function K(I,b){let V=n.get(I);if(I.version>0&&V.__version!==I.version){X(V,I,b);return}e.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+b)}function F(I,b){let V=n.get(I);if(I.version>0&&V.__version!==I.version){et(V,I,b);return}e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+b)}let st={[Nn]:i.REPEAT,[Ln]:i.CLAMP_TO_EDGE,[Ua]:i.MIRRORED_REPEAT},ht={[Je]:i.NEAREST,[yp]:i.NEAREST_MIPMAP_NEAREST,[mr]:i.NEAREST_MIPMAP_LINEAR,[_n]:i.LINEAR,[Go]:i.LINEAR_MIPMAP_NEAREST,[pi]:i.LINEAR_MIPMAP_LINEAR},Y={[bp]:i.NEVER,[Cp]:i.ALWAYS,[wp]:i.LESS,[lu]:i.LEQUAL,[Ap]:i.EQUAL,[Rp]:i.GEQUAL,[Ep]:i.GREATER,[Tp]:i.NOTEQUAL};function Q(I,b){if(b.type===xn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===_n||b.magFilter===Go||b.magFilter===mr||b.magFilter===pi||b.minFilter===_n||b.minFilter===Go||b.minFilter===mr||b.minFilter===pi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,st[b.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,st[b.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,st[b.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,ht[b.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,ht[b.minFilter]),b.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,Y[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Je||b.minFilter!==mr&&b.minFilter!==pi||b.type===xn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let V=t.get("EXT_texture_filter_anisotropic");i.texParameterf(I,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function mt(I,b){let V=!1;I.__webglInit===void 0&&(I.__webglInit=!0,b.addEventListener("dispose",w));let $=b.source,nt=d.get($);nt===void 0&&(nt={},d.set($,nt));let J=N(b);if(J!==I.__cacheKey){nt[J]===void 0&&(nt[J]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),nt[J].usedTimes++;let Pt=nt[I.__cacheKey];Pt!==void 0&&(nt[I.__cacheKey].usedTimes--,Pt.usedTimes===0&&S(b)),I.__cacheKey=J,I.__webglTexture=nt[J].texture}return V}function X(I,b,V){let $=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&($=i.TEXTURE_3D);let nt=mt(I,b),J=b.source;e.bindTexture($,I.__webglTexture,i.TEXTURE0+V);let Pt=n.get(J);if(J.version!==Pt.__version||nt===!0){e.activeTexture(i.TEXTURE0+V);let xt=Kt.getPrimaries(Kt.workingColorSpace),Tt=b.colorSpace===qn?null:Kt.getPrimaries(b.colorSpace),$t=b.colorSpace===qn||xt===Tt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$t);let lt=_(b.image,!1,s.maxTextureSize);lt=Ot(b,lt);let Rt=r.convert(b.format,b.colorSpace),kt=r.convert(b.type),Ht=y(b.internalFormat,Rt,kt,b.colorSpace,b.isVideoTexture);Q($,b);let Ct,Jt=b.mipmaps,Zt=b.isVideoTexture!==!0,le=Pt.__version===void 0||nt===!0,O=J.dataReady,Mt=T(b,lt);if(b.isDepthTexture)Ht=v(b.format===ss,b.type),le&&(Zt?e.texStorage2D(i.TEXTURE_2D,1,Ht,lt.width,lt.height):e.texImage2D(i.TEXTURE_2D,0,Ht,lt.width,lt.height,0,Rt,kt,null));else if(b.isDataTexture)if(Jt.length>0){Zt&&le&&e.texStorage2D(i.TEXTURE_2D,Mt,Ht,Jt[0].width,Jt[0].height);for(let q=0,tt=Jt.length;q<tt;q++)Ct=Jt[q],Zt?O&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,Ct.width,Ct.height,Rt,kt,Ct.data):e.texImage2D(i.TEXTURE_2D,q,Ht,Ct.width,Ct.height,0,Rt,kt,Ct.data);b.generateMipmaps=!1}else Zt?(le&&e.texStorage2D(i.TEXTURE_2D,Mt,Ht,lt.width,lt.height),O&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,lt.width,lt.height,Rt,kt,lt.data)):e.texImage2D(i.TEXTURE_2D,0,Ht,lt.width,lt.height,0,Rt,kt,lt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Zt&&le&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,Ht,Jt[0].width,Jt[0].height,lt.depth);for(let q=0,tt=Jt.length;q<tt;q++)if(Ct=Jt[q],b.format!==fn)if(Rt!==null)if(Zt){if(O)if(b.layerUpdates.size>0){let Et=Nh(Ct.width,Ct.height,b.format,b.type);for(let bt of b.layerUpdates){let Xt=Ct.data.subarray(bt*Et/Ct.data.BYTES_PER_ELEMENT,(bt+1)*Et/Ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,bt,Ct.width,Ct.height,1,Rt,Xt)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,Ct.width,Ct.height,lt.depth,Rt,Ct.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,Ht,Ct.width,Ct.height,lt.depth,0,Ct.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Zt?O&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,Ct.width,Ct.height,lt.depth,Rt,kt,Ct.data):e.texImage3D(i.TEXTURE_2D_ARRAY,q,Ht,Ct.width,Ct.height,lt.depth,0,Rt,kt,Ct.data)}else{Zt&&le&&e.texStorage2D(i.TEXTURE_2D,Mt,Ht,Jt[0].width,Jt[0].height);for(let q=0,tt=Jt.length;q<tt;q++)Ct=Jt[q],b.format!==fn?Rt!==null?Zt?O&&e.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,Ct.width,Ct.height,Rt,Ct.data):e.compressedTexImage2D(i.TEXTURE_2D,q,Ht,Ct.width,Ct.height,0,Ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Zt?O&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,Ct.width,Ct.height,Rt,kt,Ct.data):e.texImage2D(i.TEXTURE_2D,q,Ht,Ct.width,Ct.height,0,Rt,kt,Ct.data)}else if(b.isDataArrayTexture)if(Zt){if(le&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,Ht,lt.width,lt.height,lt.depth),O)if(b.layerUpdates.size>0){let q=Nh(lt.width,lt.height,b.format,b.type);for(let tt of b.layerUpdates){let Et=lt.data.subarray(tt*q/lt.data.BYTES_PER_ELEMENT,(tt+1)*q/lt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,tt,lt.width,lt.height,1,Rt,kt,Et)}b.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,lt.width,lt.height,lt.depth,Rt,kt,lt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ht,lt.width,lt.height,lt.depth,0,Rt,kt,lt.data);else if(b.isData3DTexture)Zt?(le&&e.texStorage3D(i.TEXTURE_3D,Mt,Ht,lt.width,lt.height,lt.depth),O&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,lt.width,lt.height,lt.depth,Rt,kt,lt.data)):e.texImage3D(i.TEXTURE_3D,0,Ht,lt.width,lt.height,lt.depth,0,Rt,kt,lt.data);else if(b.isFramebufferTexture){if(le)if(Zt)e.texStorage2D(i.TEXTURE_2D,Mt,Ht,lt.width,lt.height);else{let q=lt.width,tt=lt.height;for(let Et=0;Et<Mt;Et++)e.texImage2D(i.TEXTURE_2D,Et,Ht,q,tt,0,Rt,kt,null),q>>=1,tt>>=1}}else if(Jt.length>0){if(Zt&&le){let q=vt(Jt[0]);e.texStorage2D(i.TEXTURE_2D,Mt,Ht,q.width,q.height)}for(let q=0,tt=Jt.length;q<tt;q++)Ct=Jt[q],Zt?O&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,Rt,kt,Ct):e.texImage2D(i.TEXTURE_2D,q,Ht,Rt,kt,Ct);b.generateMipmaps=!1}else if(Zt){if(le){let q=vt(lt);e.texStorage2D(i.TEXTURE_2D,Mt,Ht,q.width,q.height)}O&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Rt,kt,lt)}else e.texImage2D(i.TEXTURE_2D,0,Ht,Rt,kt,lt);g(b)&&p($),Pt.__version=J.version,b.onUpdate&&b.onUpdate(b)}I.__version=b.version}function et(I,b,V){if(b.image.length!==6)return;let $=mt(I,b),nt=b.source;e.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+V);let J=n.get(nt);if(nt.version!==J.__version||$===!0){e.activeTexture(i.TEXTURE0+V);let Pt=Kt.getPrimaries(Kt.workingColorSpace),xt=b.colorSpace===qn?null:Kt.getPrimaries(b.colorSpace),Tt=b.colorSpace===qn||Pt===xt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);let $t=b.isCompressedTexture||b.image[0].isCompressedTexture,lt=b.image[0]&&b.image[0].isDataTexture,Rt=[];for(let tt=0;tt<6;tt++)!$t&&!lt?Rt[tt]=_(b.image[tt],!0,s.maxCubemapSize):Rt[tt]=lt?b.image[tt].image:b.image[tt],Rt[tt]=Ot(b,Rt[tt]);let kt=Rt[0],Ht=r.convert(b.format,b.colorSpace),Ct=r.convert(b.type),Jt=y(b.internalFormat,Ht,Ct,b.colorSpace),Zt=b.isVideoTexture!==!0,le=J.__version===void 0||$===!0,O=nt.dataReady,Mt=T(b,kt);Q(i.TEXTURE_CUBE_MAP,b);let q;if($t){Zt&&le&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,Jt,kt.width,kt.height);for(let tt=0;tt<6;tt++){q=Rt[tt].mipmaps;for(let Et=0;Et<q.length;Et++){let bt=q[Et];b.format!==fn?Ht!==null?Zt?O&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Et,0,0,bt.width,bt.height,Ht,bt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Et,Jt,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Zt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Et,0,0,bt.width,bt.height,Ht,Ct,bt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Et,Jt,bt.width,bt.height,0,Ht,Ct,bt.data)}}}else{if(q=b.mipmaps,Zt&&le){q.length>0&&Mt++;let tt=vt(Rt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,Jt,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(lt){Zt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Rt[tt].width,Rt[tt].height,Ht,Ct,Rt[tt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Jt,Rt[tt].width,Rt[tt].height,0,Ht,Ct,Rt[tt].data);for(let Et=0;Et<q.length;Et++){let Xt=q[Et].image[tt].image;Zt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Et+1,0,0,Xt.width,Xt.height,Ht,Ct,Xt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Et+1,Jt,Xt.width,Xt.height,0,Ht,Ct,Xt.data)}}else{Zt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Ht,Ct,Rt[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Jt,Ht,Ct,Rt[tt]);for(let Et=0;Et<q.length;Et++){let bt=q[Et];Zt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Et+1,0,0,Ht,Ct,bt.image[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Et+1,Jt,Ht,Ct,bt.image[tt])}}}g(b)&&p(i.TEXTURE_CUBE_MAP),J.__version=nt.version,b.onUpdate&&b.onUpdate(b)}I.__version=b.version}function dt(I,b,V,$,nt,J){let Pt=r.convert(V.format,V.colorSpace),xt=r.convert(V.type),Tt=y(V.internalFormat,Pt,xt,V.colorSpace),$t=n.get(b),lt=n.get(V);if(lt.__renderTarget=b,!$t.__hasExternalTextures){let Rt=Math.max(1,b.width>>J),kt=Math.max(1,b.height>>J);nt===i.TEXTURE_3D||nt===i.TEXTURE_2D_ARRAY?e.texImage3D(nt,J,Tt,Rt,kt,b.depth,0,Pt,xt,null):e.texImage2D(nt,J,Tt,Rt,kt,0,Pt,xt,null)}e.bindFramebuffer(i.FRAMEBUFFER,I),At(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,nt,lt.__webglTexture,0,it(b)):(nt===i.TEXTURE_2D||nt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&nt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,nt,lt.__webglTexture,J),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ot(I,b,V){if(i.bindRenderbuffer(i.RENDERBUFFER,I),b.depthBuffer){let $=b.depthTexture,nt=$&&$.isDepthTexture?$.type:null,J=v(b.stencilBuffer,nt),Pt=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xt=it(b);At(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xt,J,b.width,b.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,xt,J,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,J,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Pt,i.RENDERBUFFER,I)}else{let $=b.textures;for(let nt=0;nt<$.length;nt++){let J=$[nt],Pt=r.convert(J.format,J.colorSpace),xt=r.convert(J.type),Tt=y(J.internalFormat,Pt,xt,J.colorSpace),$t=it(b);V&&At(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,$t,Tt,b.width,b.height):At(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,$t,Tt,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,Tt,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function pt(I,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,I),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let $=n.get(b.depthTexture);$.__renderTarget=b,(!$.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),W(b.depthTexture,0);let nt=$.__webglTexture,J=it(b);if(b.depthTexture.format===Ki)At(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,nt,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,nt,0);else if(b.depthTexture.format===ss)At(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,nt,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,nt,0);else throw new Error("Unknown depthTexture format")}function at(I){let b=n.get(I),V=I.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==I.depthTexture){let $=I.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),$){let nt=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,$.removeEventListener("dispose",nt)};$.addEventListener("dispose",nt),b.__depthDisposeCallback=nt}b.__boundDepthTexture=$}if(I.depthTexture&&!b.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");pt(b.__webglFramebuffer,I)}else if(V){b.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[$]),b.__webglDepthbuffer[$]===void 0)b.__webglDepthbuffer[$]=i.createRenderbuffer(),ot(b.__webglDepthbuffer[$],I,!1);else{let nt=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=b.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,nt,i.RENDERBUFFER,J)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),ot(b.__webglDepthbuffer,I,!1);else{let $=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,nt=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,nt),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,nt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function yt(I,b,V){let $=n.get(I);b!==void 0&&dt($.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&at(I)}function It(I){let b=I.texture,V=n.get(I),$=n.get(b);I.addEventListener("dispose",R);let nt=I.textures,J=I.isWebGLCubeRenderTarget===!0,Pt=nt.length>1;if(Pt||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=b.version,o.memory.textures++),J){V.__webglFramebuffer=[];for(let xt=0;xt<6;xt++)if(b.mipmaps&&b.mipmaps.length>0){V.__webglFramebuffer[xt]=[];for(let Tt=0;Tt<b.mipmaps.length;Tt++)V.__webglFramebuffer[xt][Tt]=i.createFramebuffer()}else V.__webglFramebuffer[xt]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){V.__webglFramebuffer=[];for(let xt=0;xt<b.mipmaps.length;xt++)V.__webglFramebuffer[xt]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(Pt)for(let xt=0,Tt=nt.length;xt<Tt;xt++){let $t=n.get(nt[xt]);$t.__webglTexture===void 0&&($t.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&At(I)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let xt=0;xt<nt.length;xt++){let Tt=nt[xt];V.__webglColorRenderbuffer[xt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[xt]);let $t=r.convert(Tt.format,Tt.colorSpace),lt=r.convert(Tt.type),Rt=y(Tt.internalFormat,$t,lt,Tt.colorSpace,I.isXRRenderTarget===!0),kt=it(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,kt,Rt,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,V.__webglColorRenderbuffer[xt])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),ot(V.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(J){e.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Q(i.TEXTURE_CUBE_MAP,b);for(let xt=0;xt<6;xt++)if(b.mipmaps&&b.mipmaps.length>0)for(let Tt=0;Tt<b.mipmaps.length;Tt++)dt(V.__webglFramebuffer[xt][Tt],I,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Tt);else dt(V.__webglFramebuffer[xt],I,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0);g(b)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Pt){for(let xt=0,Tt=nt.length;xt<Tt;xt++){let $t=nt[xt],lt=n.get($t);e.bindTexture(i.TEXTURE_2D,lt.__webglTexture),Q(i.TEXTURE_2D,$t),dt(V.__webglFramebuffer,I,$t,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,0),g($t)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let xt=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(xt=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(xt,$.__webglTexture),Q(xt,b),b.mipmaps&&b.mipmaps.length>0)for(let Tt=0;Tt<b.mipmaps.length;Tt++)dt(V.__webglFramebuffer[Tt],I,b,i.COLOR_ATTACHMENT0,xt,Tt);else dt(V.__webglFramebuffer,I,b,i.COLOR_ATTACHMENT0,xt,0);g(b)&&p(xt),e.unbindTexture()}I.depthBuffer&&at(I)}function Z(I){let b=I.textures;for(let V=0,$=b.length;V<$;V++){let nt=b[V];if(g(nt)){let J=x(I),Pt=n.get(nt).__webglTexture;e.bindTexture(J,Pt),p(J),e.unbindTexture()}}}let rt=[],L=[];function St(I){if(I.samples>0){if(At(I)===!1){let b=I.textures,V=I.width,$=I.height,nt=i.COLOR_BUFFER_BIT,J=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Pt=n.get(I),xt=b.length>1;if(xt)for(let Tt=0;Tt<b.length;Tt++)e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pt.__webglFramebuffer);for(let Tt=0;Tt<b.length;Tt++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(nt|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(nt|=i.STENCIL_BUFFER_BIT)),xt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Pt.__webglColorRenderbuffer[Tt]);let $t=n.get(b[Tt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,$t,0)}i.blitFramebuffer(0,0,V,$,0,0,V,$,nt,i.NEAREST),c===!0&&(rt.length=0,L.length=0,rt.push(i.COLOR_ATTACHMENT0+Tt),I.depthBuffer&&I.resolveDepthBuffer===!1&&(rt.push(J),L.push(J),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,L)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,rt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),xt)for(let Tt=0;Tt<b.length;Tt++){e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.RENDERBUFFER,Pt.__webglColorRenderbuffer[Tt]);let $t=n.get(b[Tt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.TEXTURE_2D,$t,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&c){let b=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function it(I){return Math.min(s.maxSamples,I.samples)}function At(I){let b=n.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function ut(I){let b=o.render.frame;h.get(I)!==b&&(h.set(I,b),I.update())}function Ot(I,b){let V=I.colorSpace,$=I.format,nt=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||V!==ps&&V!==qn&&(Kt.getTransfer(V)===ae?($!==fn||nt!==Fn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),b}function vt(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=D,this.resetTextureUnits=U,this.setTexture2D=W,this.setTexture2DArray=B,this.setTexture3D=K,this.setTextureCube=F,this.rebindTextures=yt,this.setupRenderTarget=It,this.updateRenderTargetMipmap=Z,this.updateMultisampleRenderTarget=St,this.setupDepthRenderbuffer=at,this.setupFrameBufferTexture=dt,this.useMultisampledRTT=At}function Fx(i,t){function e(n,s=qn){let r,o=Kt.getTransfer(s);if(n===Fn)return i.UNSIGNED_BYTE;if(n===Jc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Kc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===eu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===jh)return i.BYTE;if(n===tu)return i.SHORT;if(n===zs)return i.UNSIGNED_SHORT;if(n===$c)return i.INT;if(n===mi)return i.UNSIGNED_INT;if(n===xn)return i.FLOAT;if(n===Bn)return i.HALF_FLOAT;if(n===nu)return i.ALPHA;if(n===iu)return i.RGB;if(n===fn)return i.RGBA;if(n===su)return i.LUMINANCE;if(n===ru)return i.LUMINANCE_ALPHA;if(n===Ki)return i.DEPTH_COMPONENT;if(n===ss)return i.DEPTH_STENCIL;if(n===Qc)return i.RED;if(n===jc)return i.RED_INTEGER;if(n===ou)return i.RG;if(n===tl)return i.RG_INTEGER;if(n===el)return i.RGBA_INTEGER;if(n===Wr||n===Xr||n===Yr||n===qr)if(o===ae)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Wr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Wr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Xr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Yr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===qr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Na||n===Fa||n===Oa||n===Ba)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Na)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Fa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Oa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ba)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===za||n===ka||n===Va)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===za||n===ka)return o===ae?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Va)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ha||n===Ga||n===Wa||n===Xa||n===Ya||n===qa||n===Za||n===$a||n===Ja||n===Ka||n===Qa||n===ja||n===tc||n===ec)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ha)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ga)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Wa)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Xa)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ya)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===qa)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Za)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===$a)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ja)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ka)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Qa)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ja)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===tc)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ec)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Zr||n===nc||n===ic)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Zr)return o===ae?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===nc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ic)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===au||n===sc||n===rc||n===oc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Zr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===sc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===rc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===oc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===is?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var vc=class extends Ne{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Qt=class extends Oe{constructor(){super(),this.isGroup=!0,this.type="Group"}},Ox={type:"move"},Fs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let _ of t.hand.values()){let g=e.getJointPose(_,n),p=this._getHandJoint(l,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;l.inputState.pinching&&d>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ox)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Qt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Bx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,zx=`
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

}`,Mc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new ke,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Xe({vertexShader:Bx,fragmentShader:zx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ct(new oe(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Sc=class extends jn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,m=null,_=new Mc,g=e.getContextAttributes(),p=null,x=null,y=[],v=[],T=new j,w=null,R=new Ne;R.viewport=new ie;let E=new Ne;E.viewport=new ie;let S=[R,E],M=new vc,C=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let et=y[X];return et===void 0&&(et=new Fs,y[X]=et),et.getTargetRaySpace()},this.getControllerGrip=function(X){let et=y[X];return et===void 0&&(et=new Fs,y[X]=et),et.getGripSpace()},this.getHand=function(X){let et=y[X];return et===void 0&&(et=new Fs,y[X]=et),et.getHandSpace()};function D(X){let et=v.indexOf(X.inputSource);if(et===-1)return;let dt=y[et];dt!==void 0&&(dt.update(X.inputSource,X.frame,l||o),dt.dispatchEvent({type:X.type,data:X.inputSource}))}function N(){s.removeEventListener("select",D),s.removeEventListener("selectstart",D),s.removeEventListener("selectend",D),s.removeEventListener("squeeze",D),s.removeEventListener("squeezestart",D),s.removeEventListener("squeezeend",D),s.removeEventListener("end",N),s.removeEventListener("inputsourceschange",W);for(let X=0;X<y.length;X++){let et=v[X];et!==null&&(v[X]=null,y[X].disconnect(et))}C=null,U=null,_.reset(),t.setRenderTarget(p),f=null,d=null,u=null,s=null,x=null,mt.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",D),s.addEventListener("selectstart",D),s.addEventListener("selectend",D),s.addEventListener("squeeze",D),s.addEventListener("squeezestart",D),s.addEventListener("squeezeend",D),s.addEventListener("end",N),s.addEventListener("inputsourceschange",W),g.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(T),s.renderState.layers===void 0){let et={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,et),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new en(f.framebufferWidth,f.framebufferHeight,{format:fn,type:Fn,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let et=null,dt=null,ot=null;g.depth&&(ot=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=g.stencil?ss:Ki,dt=g.stencil?is:mi);let pt={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(pt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),x=new en(d.textureWidth,d.textureHeight,{format:fn,type:Fn,depthTexture:new cs(d.textureWidth,d.textureHeight,dt,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),mt.setContext(s),mt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function W(X){for(let et=0;et<X.removed.length;et++){let dt=X.removed[et],ot=v.indexOf(dt);ot>=0&&(v[ot]=null,y[ot].disconnect(dt))}for(let et=0;et<X.added.length;et++){let dt=X.added[et],ot=v.indexOf(dt);if(ot===-1){for(let at=0;at<y.length;at++)if(at>=v.length){v.push(dt),ot=at;break}else if(v[at]===null){v[at]=dt,ot=at;break}if(ot===-1)break}let pt=y[ot];pt&&pt.connect(dt)}}let B=new P,K=new P;function F(X,et,dt){B.setFromMatrixPosition(et.matrixWorld),K.setFromMatrixPosition(dt.matrixWorld);let ot=B.distanceTo(K),pt=et.projectionMatrix.elements,at=dt.projectionMatrix.elements,yt=pt[14]/(pt[10]-1),It=pt[14]/(pt[10]+1),Z=(pt[9]+1)/pt[5],rt=(pt[9]-1)/pt[5],L=(pt[8]-1)/pt[0],St=(at[8]+1)/at[0],it=yt*L,At=yt*St,ut=ot/(-L+St),Ot=ut*-L;if(et.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Ot),X.translateZ(ut),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),pt[10]===-1)X.projectionMatrix.copy(et.projectionMatrix),X.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{let vt=yt+ut,I=It+ut,b=it-Ot,V=At+(ot-Ot),$=Z*It/I*vt,nt=rt*It/I*vt;X.projectionMatrix.makePerspective(b,V,$,nt,vt,I),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function st(X,et){et===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(et.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let et=X.near,dt=X.far;_.texture!==null&&(_.depthNear>0&&(et=_.depthNear),_.depthFar>0&&(dt=_.depthFar)),M.near=E.near=R.near=et,M.far=E.far=R.far=dt,(C!==M.near||U!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),C=M.near,U=M.far),R.layers.mask=X.layers.mask|2,E.layers.mask=X.layers.mask|4,M.layers.mask=R.layers.mask|E.layers.mask;let ot=X.parent,pt=M.cameras;st(M,ot);for(let at=0;at<pt.length;at++)st(pt[at],ot);pt.length===2?F(M,R,E):M.projectionMatrix.copy(R.projectionMatrix),ht(X,M,ot)};function ht(X,et,dt){dt===null?X.matrix.copy(et.matrixWorld):(X.matrix.copy(dt.matrixWorld),X.matrix.invert(),X.matrix.multiply(et.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(et.projectionMatrix),X.projectionMatrixInverse.copy(et.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=ks*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(X){c=X,d!==null&&(d.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let Y=null;function Q(X,et){if(h=et.getViewerPose(l||o),m=et,h!==null){let dt=h.views;f!==null&&(t.setRenderTargetFramebuffer(x,f.framebuffer),t.setRenderTarget(x));let ot=!1;dt.length!==M.cameras.length&&(M.cameras.length=0,ot=!0);for(let at=0;at<dt.length;at++){let yt=dt[at],It=null;if(f!==null)It=f.getViewport(yt);else{let rt=u.getViewSubImage(d,yt);It=rt.viewport,at===0&&(t.setRenderTargetTextures(x,rt.colorTexture,d.ignoreDepthValues?void 0:rt.depthStencilTexture),t.setRenderTarget(x))}let Z=S[at];Z===void 0&&(Z=new Ne,Z.layers.enable(at),Z.viewport=new ie,S[at]=Z),Z.matrix.fromArray(yt.transform.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.projectionMatrix.fromArray(yt.projectionMatrix),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert(),Z.viewport.set(It.x,It.y,It.width,It.height),at===0&&(M.matrix.copy(Z.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ot===!0&&M.cameras.push(Z)}let pt=s.enabledFeatures;if(pt&&pt.includes("depth-sensing")){let at=u.getDepthInformation(dt[0]);at&&at.isValid&&at.texture&&_.init(t,at,s.renderState)}}for(let dt=0;dt<y.length;dt++){let ot=v[dt],pt=y[dt];ot!==null&&pt!==void 0&&pt.update(ot,et,l||o)}Y&&Y(X,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),m=null}let mt=new du;mt.setAnimationLoop(Q),this.setAnimationLoop=function(X){Y=X},this.dispose=function(){}}},hi=new Ve,kx=new Vt;function Vx(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,fu(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,x,y,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,v)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,x,y):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Fe&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Fe&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let x=t.get(p),y=x.envMap,v=x.envMapRotation;y&&(g.envMap.value=y,hi.copy(v),hi.x*=-1,hi.y*=-1,hi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(hi.y*=-1,hi.z*=-1),g.envMapRotation.value.setFromMatrix4(kx.makeRotationFromEuler(hi)),g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,x,y){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*x,g.scale.value=y*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,x){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Fe&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){let x=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Hx(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,y){let v=y.program;n.uniformBlockBinding(x,v)}function l(x,y){let v=s[x.id];v===void 0&&(m(x),v=h(x),s[x.id]=v,x.addEventListener("dispose",g));let T=y.program;n.updateUBOMapping(x,T);let w=t.render.frame;r[x.id]!==w&&(d(x),r[x.id]=w)}function h(x){let y=u();x.__bindingPointIndex=y;let v=i.createBuffer(),T=x.__size,w=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,T,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,v),v}function u(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){let y=s[x.id],v=x.uniforms,T=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let w=0,R=v.length;w<R;w++){let E=Array.isArray(v[w])?v[w]:[v[w]];for(let S=0,M=E.length;S<M;S++){let C=E[S];if(f(C,w,S,T)===!0){let U=C.__offset,D=Array.isArray(C.value)?C.value:[C.value],N=0;for(let W=0;W<D.length;W++){let B=D[W],K=_(B);typeof B=="number"||typeof B=="boolean"?(C.__data[0]=B,i.bufferSubData(i.UNIFORM_BUFFER,U+N,C.__data)):B.isMatrix3?(C.__data[0]=B.elements[0],C.__data[1]=B.elements[1],C.__data[2]=B.elements[2],C.__data[3]=0,C.__data[4]=B.elements[3],C.__data[5]=B.elements[4],C.__data[6]=B.elements[5],C.__data[7]=0,C.__data[8]=B.elements[6],C.__data[9]=B.elements[7],C.__data[10]=B.elements[8],C.__data[11]=0):(B.toArray(C.__data,N),N+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(x,y,v,T){let w=x.value,R=y+"_"+v;if(T[R]===void 0)return typeof w=="number"||typeof w=="boolean"?T[R]=w:T[R]=w.clone(),!0;{let E=T[R];if(typeof w=="number"||typeof w=="boolean"){if(E!==w)return T[R]=w,!0}else if(E.equals(w)===!1)return E.copy(w),!0}return!1}function m(x){let y=x.uniforms,v=0,T=16;for(let R=0,E=y.length;R<E;R++){let S=Array.isArray(y[R])?y[R]:[y[R]];for(let M=0,C=S.length;M<C;M++){let U=S[M],D=Array.isArray(U.value)?U.value:[U.value];for(let N=0,W=D.length;N<W;N++){let B=D[N],K=_(B),F=v%T,st=F%K.boundary,ht=F+st;v+=st,ht!==0&&T-ht<K.storage&&(v+=T-ht),U.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=v,v+=K.storage}}}let w=v%T;return w>0&&(v+=T-w),x.__size=v,x.__cache={},this}function _(x){let y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),y}function g(x){let y=x.target;y.removeEventListener("dispose",g);let v=o.indexOf(y.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(let x in s)i.deleteBuffer(s[x]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}var so=class{constructor(t={}){let{canvas:e=Yp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let m=new Uint32Array(4),_=new Int32Array(4),g=null,p=null,x=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Se,this.toneMapping=Jn,this.toneMappingExposure=1;let v=this,T=!1,w=0,R=0,E=null,S=-1,M=null,C=new ie,U=new ie,D=null,N=new Nt(0),W=0,B=e.width,K=e.height,F=1,st=null,ht=null,Y=new ie(0,0,B,K),Q=new ie(0,0,B,K),mt=!1,X=new Xs,et=!1,dt=!1,ot=new Vt,pt=new Vt,at=new P,yt=new ie,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Z=!1;function rt(){return E===null?F:1}let L=n;function St(A,z){return e.getContext(A,z)}try{let A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Yc}`),e.addEventListener("webglcontextlost",tt,!1),e.addEventListener("webglcontextrestored",Et,!1),e.addEventListener("webglcontextcreationerror",bt,!1),L===null){let z="webgl2";if(L=St(z,A),L===null)throw St(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let it,At,ut,Ot,vt,I,b,V,$,nt,J,Pt,xt,Tt,$t,lt,Rt,kt,Ht,Ct,Jt,Zt,le,O;function Mt(){it=new s_(L),it.init(),Zt=new Fx(L,it),At=new Qg(L,it,t,Zt),ut=new Dx(L,it),At.reverseDepthBuffer&&d&&ut.buffers.depth.setReversed(!0),Ot=new a_(L),vt=new vx,I=new Nx(L,it,ut,vt,At,Zt,Ot),b=new t_(v),V=new i_(v),$=new pm(L),le=new Jg(L,$),nt=new r_(L,$,Ot,le),J=new l_(L,nt,$,Ot),Ht=new c_(L,At,I),lt=new jg(vt),Pt=new yx(v,b,V,it,At,le,lt),xt=new Vx(v,vt),Tt=new Sx,$t=new Rx(it),kt=new $g(v,b,V,ut,J,f,c),Rt=new Px(v,J,At),O=new Hx(L,Ot,At,ut),Ct=new Kg(L,it,Ot),Jt=new o_(L,it,Ot),Ot.programs=Pt.programs,v.capabilities=At,v.extensions=it,v.properties=vt,v.renderLists=Tt,v.shadowMap=Rt,v.state=ut,v.info=Ot}Mt();let q=new Sc(v,L);this.xr=q,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let A=it.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=it.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return F},this.setPixelRatio=function(A){A!==void 0&&(F=A,this.setSize(B,K,!1))},this.getSize=function(A){return A.set(B,K)},this.setSize=function(A,z,H=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=A,K=z,e.width=Math.floor(A*F),e.height=Math.floor(z*F),H===!0&&(e.style.width=A+"px",e.style.height=z+"px"),this.setViewport(0,0,A,z)},this.getDrawingBufferSize=function(A){return A.set(B*F,K*F).floor()},this.setDrawingBufferSize=function(A,z,H){B=A,K=z,F=H,e.width=Math.floor(A*H),e.height=Math.floor(z*H),this.setViewport(0,0,A,z)},this.getCurrentViewport=function(A){return A.copy(C)},this.getViewport=function(A){return A.copy(Y)},this.setViewport=function(A,z,H,G){A.isVector4?Y.set(A.x,A.y,A.z,A.w):Y.set(A,z,H,G),ut.viewport(C.copy(Y).multiplyScalar(F).round())},this.getScissor=function(A){return A.copy(Q)},this.setScissor=function(A,z,H,G){A.isVector4?Q.set(A.x,A.y,A.z,A.w):Q.set(A,z,H,G),ut.scissor(U.copy(Q).multiplyScalar(F).round())},this.getScissorTest=function(){return mt},this.setScissorTest=function(A){ut.setScissorTest(mt=A)},this.setOpaqueSort=function(A){st=A},this.setTransparentSort=function(A){ht=A},this.getClearColor=function(A){return A.copy(kt.getClearColor())},this.setClearColor=function(){kt.setClearColor.apply(kt,arguments)},this.getClearAlpha=function(){return kt.getClearAlpha()},this.setClearAlpha=function(){kt.setClearAlpha.apply(kt,arguments)},this.clear=function(A=!0,z=!0,H=!0){let G=0;if(A){let k=!1;if(E!==null){let ft=E.texture.format;k=ft===el||ft===tl||ft===jc}if(k){let ft=E.texture.type,wt=ft===Fn||ft===mi||ft===zs||ft===is||ft===Jc||ft===Kc,Lt=kt.getClearColor(),Dt=kt.getClearAlpha(),Gt=Lt.r,Yt=Lt.g,Ut=Lt.b;wt?(m[0]=Gt,m[1]=Yt,m[2]=Ut,m[3]=Dt,L.clearBufferuiv(L.COLOR,0,m)):(_[0]=Gt,_[1]=Yt,_[2]=Ut,_[3]=Dt,L.clearBufferiv(L.COLOR,0,_))}else G|=L.COLOR_BUFFER_BIT}z&&(G|=L.DEPTH_BUFFER_BIT),H&&(G|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",tt,!1),e.removeEventListener("webglcontextrestored",Et,!1),e.removeEventListener("webglcontextcreationerror",bt,!1),Tt.dispose(),$t.dispose(),vt.dispose(),b.dispose(),V.dispose(),J.dispose(),le.dispose(),O.dispose(),Pt.dispose(),q.dispose(),q.removeEventListener("sessionstart",Rl),q.removeEventListener("sessionend",Cl),si.stop()};function tt(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Et(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let A=Ot.autoReset,z=Rt.enabled,H=Rt.autoUpdate,G=Rt.needsUpdate,k=Rt.type;Mt(),Ot.autoReset=A,Rt.enabled=z,Rt.autoUpdate=H,Rt.needsUpdate=G,Rt.type=k}function bt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Xt(A){let z=A.target;z.removeEventListener("dispose",Xt),ye(z)}function ye(A){Le(A),vt.remove(A)}function Le(A){let z=vt.get(A).programs;z!==void 0&&(z.forEach(function(H){Pt.releaseProgram(H)}),A.isShaderMaterial&&Pt.releaseShaderCache(A))}this.renderBufferDirect=function(A,z,H,G,k,ft){z===null&&(z=It);let wt=k.isMesh&&k.matrixWorld.determinant()<0,Lt=Hd(A,z,H,G,k);ut.setMaterial(G,wt);let Dt=H.index,Gt=1;if(G.wireframe===!0){if(Dt=nt.getWireframeAttribute(H),Dt===void 0)return;Gt=2}let Yt=H.drawRange,Ut=H.attributes.position,jt=Yt.start*Gt,he=(Yt.start+Yt.count)*Gt;ft!==null&&(jt=Math.max(jt,ft.start*Gt),he=Math.min(he,(ft.start+ft.count)*Gt)),Dt!==null?(jt=Math.max(jt,0),he=Math.min(he,Dt.count)):Ut!=null&&(jt=Math.max(jt,0),he=Math.min(he,Ut.count));let ue=he-jt;if(ue<0||ue===1/0)return;le.setup(k,G,Lt,H,Dt);let We,ee=Ct;if(Dt!==null&&(We=$.get(Dt),ee=Jt,ee.setIndex(We)),k.isMesh)G.wireframe===!0?(ut.setLineWidth(G.wireframeLinewidth*rt()),ee.setMode(L.LINES)):ee.setMode(L.TRIANGLES);else if(k.isLine){let Ft=G.linewidth;Ft===void 0&&(Ft=1),ut.setLineWidth(Ft*rt()),k.isLineSegments?ee.setMode(L.LINES):k.isLineLoop?ee.setMode(L.LINE_LOOP):ee.setMode(L.LINE_STRIP)}else k.isPoints?ee.setMode(L.POINTS):k.isSprite&&ee.setMode(L.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)ee.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(it.get("WEBGL_multi_draw"))ee.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Ft=k._multiDrawStarts,wn=k._multiDrawCounts,ne=k._multiDrawCount,an=Dt?$.get(Dt).bytesPerElement:1,Ri=vt.get(G).currentProgram.getUniforms();for(let qe=0;qe<ne;qe++)Ri.setValue(L,"_gl_DrawID",qe),ee.render(Ft[qe]/an,wn[qe])}else if(k.isInstancedMesh)ee.renderInstances(jt,ue,k.count);else if(H.isInstancedBufferGeometry){let Ft=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,wn=Math.min(H.instanceCount,Ft);ee.renderInstances(jt,ue,wn)}else ee.render(jt,ue)};function se(A,z,H){A.transparent===!0&&A.side===me&&A.forceSinglePass===!1?(A.side=Fe,A.needsUpdate=!0,pr(A,z,H),A.side=Qn,A.needsUpdate=!0,pr(A,z,H),A.side=me):pr(A,z,H)}this.compile=function(A,z,H=null){H===null&&(H=A),p=$t.get(H),p.init(z),y.push(p),H.traverseVisible(function(k){k.isLight&&k.layers.test(z.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),A!==H&&A.traverseVisible(function(k){k.isLight&&k.layers.test(z.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();let G=new Set;return A.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let ft=k.material;if(ft)if(Array.isArray(ft))for(let wt=0;wt<ft.length;wt++){let Lt=ft[wt];se(Lt,H,k),G.add(Lt)}else se(ft,H,k),G.add(ft)}),y.pop(),p=null,G},this.compileAsync=function(A,z,H=null){let G=this.compile(A,z,H);return new Promise(k=>{function ft(){if(G.forEach(function(wt){vt.get(wt).currentProgram.isReady()&&G.delete(wt)}),G.size===0){k(A);return}setTimeout(ft,10)}it.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let on=null;function bn(A){on&&on(A)}function Rl(){si.stop()}function Cl(){si.start()}let si=new du;si.setAnimationLoop(bn),typeof self<"u"&&si.setContext(self),this.setAnimationLoop=function(A){on=A,q.setAnimationLoop(A),A===null?si.stop():si.start()},q.addEventListener("sessionstart",Rl),q.addEventListener("sessionend",Cl),this.render=function(A,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(z),z=q.getCamera()),A.isScene===!0&&A.onBeforeRender(v,A,z,E),p=$t.get(A,y.length),p.init(z),y.push(p),pt.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),X.setFromProjectionMatrix(pt),dt=this.localClippingEnabled,et=lt.init(this.clippingPlanes,dt),g=Tt.get(A,x.length),g.init(),x.push(g),q.enabled===!0&&q.isPresenting===!0){let ft=v.xr.getDepthSensingMesh();ft!==null&&Ho(ft,z,-1/0,v.sortObjects)}Ho(A,z,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(st,ht),Z=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,Z&&kt.addToRenderList(g,A),this.info.render.frame++,et===!0&&lt.beginShadows();let H=p.state.shadowsArray;Rt.render(H,A,z),et===!0&&lt.endShadows(),this.info.autoReset===!0&&this.info.reset();let G=g.opaque,k=g.transmissive;if(p.setupLights(),z.isArrayCamera){let ft=z.cameras;if(k.length>0)for(let wt=0,Lt=ft.length;wt<Lt;wt++){let Dt=ft[wt];Pl(G,k,A,Dt)}Z&&kt.render(A);for(let wt=0,Lt=ft.length;wt<Lt;wt++){let Dt=ft[wt];Il(g,A,Dt,Dt.viewport)}}else k.length>0&&Pl(G,k,A,z),Z&&kt.render(A),Il(g,A,z);E!==null&&(I.updateMultisampleRenderTarget(E),I.updateRenderTargetMipmap(E)),A.isScene===!0&&A.onAfterRender(v,A,z),le.resetDefaultState(),S=-1,M=null,y.pop(),y.length>0?(p=y[y.length-1],et===!0&&lt.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?g=x[x.length-1]:g=null};function Ho(A,z,H,G){if(A.visible===!1)return;if(A.layers.test(z.layers)){if(A.isGroup)H=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(z);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||X.intersectsSprite(A)){G&&yt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(pt);let wt=J.update(A),Lt=A.material;Lt.visible&&g.push(A,wt,Lt,H,yt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||X.intersectsObject(A))){let wt=J.update(A),Lt=A.material;if(G&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),yt.copy(A.boundingSphere.center)):(wt.boundingSphere===null&&wt.computeBoundingSphere(),yt.copy(wt.boundingSphere.center)),yt.applyMatrix4(A.matrixWorld).applyMatrix4(pt)),Array.isArray(Lt)){let Dt=wt.groups;for(let Gt=0,Yt=Dt.length;Gt<Yt;Gt++){let Ut=Dt[Gt],jt=Lt[Ut.materialIndex];jt&&jt.visible&&g.push(A,wt,jt,H,yt.z,Ut)}}else Lt.visible&&g.push(A,wt,Lt,H,yt.z,null)}}let ft=A.children;for(let wt=0,Lt=ft.length;wt<Lt;wt++)Ho(ft[wt],z,H,G)}function Il(A,z,H,G){let k=A.opaque,ft=A.transmissive,wt=A.transparent;p.setupLightsView(H),et===!0&&lt.setGlobalState(v.clippingPlanes,H),G&&ut.viewport(C.copy(G)),k.length>0&&dr(k,z,H),ft.length>0&&dr(ft,z,H),wt.length>0&&dr(wt,z,H),ut.buffers.depth.setTest(!0),ut.buffers.depth.setMask(!0),ut.buffers.color.setMask(!0),ut.setPolygonOffset(!1)}function Pl(A,z,H,G){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new en(1,1,{generateMipmaps:!0,type:it.has("EXT_color_buffer_half_float")||it.has("EXT_color_buffer_float")?Bn:Fn,minFilter:pi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace}));let ft=p.state.transmissionRenderTarget[G.id],wt=G.viewport||C;ft.setSize(wt.z,wt.w);let Lt=v.getRenderTarget();v.setRenderTarget(ft),v.getClearColor(N),W=v.getClearAlpha(),W<1&&v.setClearColor(16777215,.5),v.clear(),Z&&kt.render(H);let Dt=v.toneMapping;v.toneMapping=Jn;let Gt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),et===!0&&lt.setGlobalState(v.clippingPlanes,G),dr(A,H,G),I.updateMultisampleRenderTarget(ft),I.updateRenderTargetMipmap(ft),it.has("WEBGL_multisampled_render_to_texture")===!1){let Yt=!1;for(let Ut=0,jt=z.length;Ut<jt;Ut++){let he=z[Ut],ue=he.object,We=he.geometry,ee=he.material,Ft=he.group;if(ee.side===me&&ue.layers.test(G.layers)){let wn=ee.side;ee.side=Fe,ee.needsUpdate=!0,Ll(ue,H,G,We,ee,Ft),ee.side=wn,ee.needsUpdate=!0,Yt=!0}}Yt===!0&&(I.updateMultisampleRenderTarget(ft),I.updateRenderTargetMipmap(ft))}v.setRenderTarget(Lt),v.setClearColor(N,W),Gt!==void 0&&(G.viewport=Gt),v.toneMapping=Dt}function dr(A,z,H){let G=z.isScene===!0?z.overrideMaterial:null;for(let k=0,ft=A.length;k<ft;k++){let wt=A[k],Lt=wt.object,Dt=wt.geometry,Gt=G===null?wt.material:G,Yt=wt.group;Lt.layers.test(H.layers)&&Ll(Lt,z,H,Dt,Gt,Yt)}}function Ll(A,z,H,G,k,ft){A.onBeforeRender(v,z,H,G,k,ft),A.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),k.onBeforeRender(v,z,H,G,A,ft),k.transparent===!0&&k.side===me&&k.forceSinglePass===!1?(k.side=Fe,k.needsUpdate=!0,v.renderBufferDirect(H,z,G,k,A,ft),k.side=Qn,k.needsUpdate=!0,v.renderBufferDirect(H,z,G,k,A,ft),k.side=me):v.renderBufferDirect(H,z,G,k,A,ft),A.onAfterRender(v,z,H,G,k,ft)}function pr(A,z,H){z.isScene!==!0&&(z=It);let G=vt.get(A),k=p.state.lights,ft=p.state.shadowsArray,wt=k.state.version,Lt=Pt.getParameters(A,k.state,ft,z,H),Dt=Pt.getProgramCacheKey(Lt),Gt=G.programs;G.environment=A.isMeshStandardMaterial?z.environment:null,G.fog=z.fog,G.envMap=(A.isMeshStandardMaterial?V:b).get(A.envMap||G.environment),G.envMapRotation=G.environment!==null&&A.envMap===null?z.environmentRotation:A.envMapRotation,Gt===void 0&&(A.addEventListener("dispose",Xt),Gt=new Map,G.programs=Gt);let Yt=Gt.get(Dt);if(Yt!==void 0){if(G.currentProgram===Yt&&G.lightsStateVersion===wt)return Ul(A,Lt),Yt}else Lt.uniforms=Pt.getUniforms(A),A.onBeforeCompile(Lt,v),Yt=Pt.acquireProgram(Lt,Dt),Gt.set(Dt,Yt),G.uniforms=Lt.uniforms;let Ut=G.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ut.clippingPlanes=lt.uniform),Ul(A,Lt),G.needsLights=Wd(A),G.lightsStateVersion=wt,G.needsLights&&(Ut.ambientLightColor.value=k.state.ambient,Ut.lightProbe.value=k.state.probe,Ut.directionalLights.value=k.state.directional,Ut.directionalLightShadows.value=k.state.directionalShadow,Ut.spotLights.value=k.state.spot,Ut.spotLightShadows.value=k.state.spotShadow,Ut.rectAreaLights.value=k.state.rectArea,Ut.ltc_1.value=k.state.rectAreaLTC1,Ut.ltc_2.value=k.state.rectAreaLTC2,Ut.pointLights.value=k.state.point,Ut.pointLightShadows.value=k.state.pointShadow,Ut.hemisphereLights.value=k.state.hemi,Ut.directionalShadowMap.value=k.state.directionalShadowMap,Ut.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Ut.spotShadowMap.value=k.state.spotShadowMap,Ut.spotLightMatrix.value=k.state.spotLightMatrix,Ut.spotLightMap.value=k.state.spotLightMap,Ut.pointShadowMap.value=k.state.pointShadowMap,Ut.pointShadowMatrix.value=k.state.pointShadowMatrix),G.currentProgram=Yt,G.uniformsList=null,Yt}function Dl(A){if(A.uniformsList===null){let z=A.currentProgram.getUniforms();A.uniformsList=ji.seqWithValue(z.seq,A.uniforms)}return A.uniformsList}function Ul(A,z){let H=vt.get(A);H.outputColorSpace=z.outputColorSpace,H.batching=z.batching,H.batchingColor=z.batchingColor,H.instancing=z.instancing,H.instancingColor=z.instancingColor,H.instancingMorph=z.instancingMorph,H.skinning=z.skinning,H.morphTargets=z.morphTargets,H.morphNormals=z.morphNormals,H.morphColors=z.morphColors,H.morphTargetsCount=z.morphTargetsCount,H.numClippingPlanes=z.numClippingPlanes,H.numIntersection=z.numClipIntersection,H.vertexAlphas=z.vertexAlphas,H.vertexTangents=z.vertexTangents,H.toneMapping=z.toneMapping}function Hd(A,z,H,G,k){z.isScene!==!0&&(z=It),I.resetTextureUnits();let ft=z.fog,wt=G.isMeshStandardMaterial?z.environment:null,Lt=E===null?v.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:ps,Dt=(G.isMeshStandardMaterial?V:b).get(G.envMap||wt),Gt=G.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Yt=!!H.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ut=!!H.morphAttributes.position,jt=!!H.morphAttributes.normal,he=!!H.morphAttributes.color,ue=Jn;G.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(ue=v.toneMapping);let We=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ee=We!==void 0?We.length:0,Ft=vt.get(G),wn=p.state.lights;if(et===!0&&(dt===!0||A!==M)){let je=A===M&&G.id===S;lt.setState(G,A,je)}let ne=!1;G.version===Ft.__version?(Ft.needsLights&&Ft.lightsStateVersion!==wn.state.version||Ft.outputColorSpace!==Lt||k.isBatchedMesh&&Ft.batching===!1||!k.isBatchedMesh&&Ft.batching===!0||k.isBatchedMesh&&Ft.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Ft.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Ft.instancing===!1||!k.isInstancedMesh&&Ft.instancing===!0||k.isSkinnedMesh&&Ft.skinning===!1||!k.isSkinnedMesh&&Ft.skinning===!0||k.isInstancedMesh&&Ft.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Ft.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Ft.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Ft.instancingMorph===!1&&k.morphTexture!==null||Ft.envMap!==Dt||G.fog===!0&&Ft.fog!==ft||Ft.numClippingPlanes!==void 0&&(Ft.numClippingPlanes!==lt.numPlanes||Ft.numIntersection!==lt.numIntersection)||Ft.vertexAlphas!==Gt||Ft.vertexTangents!==Yt||Ft.morphTargets!==Ut||Ft.morphNormals!==jt||Ft.morphColors!==he||Ft.toneMapping!==ue||Ft.morphTargetsCount!==ee)&&(ne=!0):(ne=!0,Ft.__version=G.version);let an=Ft.currentProgram;ne===!0&&(an=pr(G,z,k));let Ri=!1,qe=!1,vs=!1,fe=an.getUniforms(),mn=Ft.uniforms;if(ut.useProgram(an.program)&&(Ri=!0,qe=!0,vs=!0),G.id!==S&&(S=G.id,qe=!0),Ri||M!==A){ut.buffers.depth.getReversed()?(ot.copy(A.projectionMatrix),Zp(ot),$p(ot),fe.setValue(L,"projectionMatrix",ot)):fe.setValue(L,"projectionMatrix",A.projectionMatrix),fe.setValue(L,"viewMatrix",A.matrixWorldInverse);let zn=fe.map.cameraPosition;zn!==void 0&&zn.setValue(L,at.setFromMatrixPosition(A.matrixWorld)),At.logarithmicDepthBuffer&&fe.setValue(L,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&fe.setValue(L,"isOrthographic",A.isOrthographicCamera===!0),M!==A&&(M=A,qe=!0,vs=!0)}if(k.isSkinnedMesh){fe.setOptional(L,k,"bindMatrix"),fe.setOptional(L,k,"bindMatrixInverse");let je=k.skeleton;je&&(je.boneTexture===null&&je.computeBoneTexture(),fe.setValue(L,"boneTexture",je.boneTexture,I))}k.isBatchedMesh&&(fe.setOptional(L,k,"batchingTexture"),fe.setValue(L,"batchingTexture",k._matricesTexture,I),fe.setOptional(L,k,"batchingIdTexture"),fe.setValue(L,"batchingIdTexture",k._indirectTexture,I),fe.setOptional(L,k,"batchingColorTexture"),k._colorsTexture!==null&&fe.setValue(L,"batchingColorTexture",k._colorsTexture,I));let Ms=H.morphAttributes;if((Ms.position!==void 0||Ms.normal!==void 0||Ms.color!==void 0)&&Ht.update(k,H,an),(qe||Ft.receiveShadow!==k.receiveShadow)&&(Ft.receiveShadow=k.receiveShadow,fe.setValue(L,"receiveShadow",k.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(mn.envMap.value=Dt,mn.flipEnvMap.value=Dt.isCubeTexture&&Dt.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&z.environment!==null&&(mn.envMapIntensity.value=z.environmentIntensity),qe&&(fe.setValue(L,"toneMappingExposure",v.toneMappingExposure),Ft.needsLights&&Gd(mn,vs),ft&&G.fog===!0&&xt.refreshFogUniforms(mn,ft),xt.refreshMaterialUniforms(mn,G,F,K,p.state.transmissionRenderTarget[A.id]),ji.upload(L,Dl(Ft),mn,I)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(ji.upload(L,Dl(Ft),mn,I),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&fe.setValue(L,"center",k.center),fe.setValue(L,"modelViewMatrix",k.modelViewMatrix),fe.setValue(L,"normalMatrix",k.normalMatrix),fe.setValue(L,"modelMatrix",k.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){let je=G.uniformsGroups;for(let zn=0,kn=je.length;zn<kn;zn++){let Nl=je[zn];O.update(Nl,an),O.bind(Nl,an)}}return an}function Gd(A,z){A.ambientLightColor.needsUpdate=z,A.lightProbe.needsUpdate=z,A.directionalLights.needsUpdate=z,A.directionalLightShadows.needsUpdate=z,A.pointLights.needsUpdate=z,A.pointLightShadows.needsUpdate=z,A.spotLights.needsUpdate=z,A.spotLightShadows.needsUpdate=z,A.rectAreaLights.needsUpdate=z,A.hemisphereLights.needsUpdate=z}function Wd(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(A,z,H){vt.get(A.texture).__webglTexture=z,vt.get(A.depthTexture).__webglTexture=H;let G=vt.get(A);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=H===void 0,G.__autoAllocateDepthBuffer||it.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,z){let H=vt.get(A);H.__webglFramebuffer=z,H.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(A,z=0,H=0){E=A,w=z,R=H;let G=!0,k=null,ft=!1,wt=!1;if(A){let Dt=vt.get(A);if(Dt.__useDefaultFramebuffer!==void 0)ut.bindFramebuffer(L.FRAMEBUFFER,null),G=!1;else if(Dt.__webglFramebuffer===void 0)I.setupRenderTarget(A);else if(Dt.__hasExternalTextures)I.rebindTextures(A,vt.get(A.texture).__webglTexture,vt.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let Ut=A.depthTexture;if(Dt.__boundDepthTexture!==Ut){if(Ut!==null&&vt.has(Ut)&&(A.width!==Ut.image.width||A.height!==Ut.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(A)}}let Gt=A.texture;(Gt.isData3DTexture||Gt.isDataArrayTexture||Gt.isCompressedArrayTexture)&&(wt=!0);let Yt=vt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Yt[z])?k=Yt[z][H]:k=Yt[z],ft=!0):A.samples>0&&I.useMultisampledRTT(A)===!1?k=vt.get(A).__webglMultisampledFramebuffer:Array.isArray(Yt)?k=Yt[H]:k=Yt,C.copy(A.viewport),U.copy(A.scissor),D=A.scissorTest}else C.copy(Y).multiplyScalar(F).floor(),U.copy(Q).multiplyScalar(F).floor(),D=mt;if(ut.bindFramebuffer(L.FRAMEBUFFER,k)&&G&&ut.drawBuffers(A,k),ut.viewport(C),ut.scissor(U),ut.setScissorTest(D),ft){let Dt=vt.get(A.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+z,Dt.__webglTexture,H)}else if(wt){let Dt=vt.get(A.texture),Gt=z||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Dt.__webglTexture,H||0,Gt)}S=-1},this.readRenderTargetPixels=function(A,z,H,G,k,ft,wt){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=vt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&wt!==void 0&&(Lt=Lt[wt]),Lt){ut.bindFramebuffer(L.FRAMEBUFFER,Lt);try{let Dt=A.texture,Gt=Dt.format,Yt=Dt.type;if(!At.textureFormatReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!At.textureTypeReadable(Yt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=A.width-G&&H>=0&&H<=A.height-k&&L.readPixels(z,H,G,k,Zt.convert(Gt),Zt.convert(Yt),ft)}finally{let Dt=E!==null?vt.get(E).__webglFramebuffer:null;ut.bindFramebuffer(L.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(A,z,H,G,k,ft,wt){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Lt=vt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&wt!==void 0&&(Lt=Lt[wt]),Lt){let Dt=A.texture,Gt=Dt.format,Yt=Dt.type;if(!At.textureFormatReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!At.textureTypeReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(z>=0&&z<=A.width-G&&H>=0&&H<=A.height-k){ut.bindFramebuffer(L.FRAMEBUFFER,Lt);let Ut=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Ut),L.bufferData(L.PIXEL_PACK_BUFFER,ft.byteLength,L.STREAM_READ),L.readPixels(z,H,G,k,Zt.convert(Gt),Zt.convert(Yt),0);let jt=E!==null?vt.get(E).__webglFramebuffer:null;ut.bindFramebuffer(L.FRAMEBUFFER,jt);let he=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await qp(L,he,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Ut),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ft),L.deleteBuffer(Ut),L.deleteSync(he),ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,z=null,H=0){A.isTexture!==!0&&(Ls("WebGLRenderer: copyFramebufferToTexture function signature has changed."),z=arguments[0]||null,A=arguments[1]);let G=Math.pow(2,-H),k=Math.floor(A.image.width*G),ft=Math.floor(A.image.height*G),wt=z!==null?z.x:0,Lt=z!==null?z.y:0;I.setTexture2D(A,0),L.copyTexSubImage2D(L.TEXTURE_2D,H,0,0,wt,Lt,k,ft),ut.unbindTexture()},this.copyTextureToTexture=function(A,z,H=null,G=null,k=0){A.isTexture!==!0&&(Ls("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,A=arguments[1],z=arguments[2],k=arguments[3]||0,H=null);let ft,wt,Lt,Dt,Gt,Yt,Ut,jt,he,ue=A.isCompressedTexture?A.mipmaps[k]:A.image;H!==null?(ft=H.max.x-H.min.x,wt=H.max.y-H.min.y,Lt=H.isBox3?H.max.z-H.min.z:1,Dt=H.min.x,Gt=H.min.y,Yt=H.isBox3?H.min.z:0):(ft=ue.width,wt=ue.height,Lt=ue.depth||1,Dt=0,Gt=0,Yt=0),G!==null?(Ut=G.x,jt=G.y,he=G.z):(Ut=0,jt=0,he=0);let We=Zt.convert(z.format),ee=Zt.convert(z.type),Ft;z.isData3DTexture?(I.setTexture3D(z,0),Ft=L.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(I.setTexture2DArray(z,0),Ft=L.TEXTURE_2D_ARRAY):(I.setTexture2D(z,0),Ft=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,z.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,z.unpackAlignment);let wn=L.getParameter(L.UNPACK_ROW_LENGTH),ne=L.getParameter(L.UNPACK_IMAGE_HEIGHT),an=L.getParameter(L.UNPACK_SKIP_PIXELS),Ri=L.getParameter(L.UNPACK_SKIP_ROWS),qe=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,ue.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ue.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Dt),L.pixelStorei(L.UNPACK_SKIP_ROWS,Gt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Yt);let vs=A.isDataArrayTexture||A.isData3DTexture,fe=z.isDataArrayTexture||z.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){let mn=vt.get(A),Ms=vt.get(z),je=vt.get(mn.__renderTarget),zn=vt.get(Ms.__renderTarget);ut.bindFramebuffer(L.READ_FRAMEBUFFER,je.__webglFramebuffer),ut.bindFramebuffer(L.DRAW_FRAMEBUFFER,zn.__webglFramebuffer);for(let kn=0;kn<Lt;kn++)vs&&L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,vt.get(A).__webglTexture,k,Yt+kn),A.isDepthTexture?(fe&&L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,vt.get(z).__webglTexture,k,he+kn),L.blitFramebuffer(Dt,Gt,ft,wt,Ut,jt,ft,wt,L.DEPTH_BUFFER_BIT,L.NEAREST)):fe?L.copyTexSubImage3D(Ft,k,Ut,jt,he+kn,Dt,Gt,ft,wt):L.copyTexSubImage2D(Ft,k,Ut,jt,he+kn,Dt,Gt,ft,wt);ut.bindFramebuffer(L.READ_FRAMEBUFFER,null),ut.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else fe?A.isDataTexture||A.isData3DTexture?L.texSubImage3D(Ft,k,Ut,jt,he,ft,wt,Lt,We,ee,ue.data):z.isCompressedArrayTexture?L.compressedTexSubImage3D(Ft,k,Ut,jt,he,ft,wt,Lt,We,ue.data):L.texSubImage3D(Ft,k,Ut,jt,he,ft,wt,Lt,We,ee,ue):A.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,k,Ut,jt,ft,wt,We,ee,ue.data):A.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,k,Ut,jt,ue.width,ue.height,We,ue.data):L.texSubImage2D(L.TEXTURE_2D,k,Ut,jt,ft,wt,We,ee,ue);L.pixelStorei(L.UNPACK_ROW_LENGTH,wn),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ne),L.pixelStorei(L.UNPACK_SKIP_PIXELS,an),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ri),L.pixelStorei(L.UNPACK_SKIP_IMAGES,qe),k===0&&z.generateMipmaps&&L.generateMipmap(Ft),ut.unbindTexture()},this.copyTextureToTexture3D=function(A,z,H=null,G=null,k=0){return A.isTexture!==!0&&(Ls("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,G=arguments[1]||null,A=arguments[2],z=arguments[3],k=arguments[4]||0),Ls('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,z,H,G,k)},this.initRenderTarget=function(A){vt.get(A).__webglFramebuffer===void 0&&I.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?I.setTextureCube(A,0):A.isData3DTexture?I.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?I.setTexture2DArray(A,0):I.setTexture2D(A,0),ut.unbindTexture()},this.resetState=function(){w=0,R=0,E=null,ut.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=Kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Kt._getUnpackColorSpace()}};var ro=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Nt(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},ei=class extends Oe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ve,this.environmentIntensity=1,this.environmentRotation=new Ve,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},oo=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=cc,this.updateRanges=[],this.version=0,this.uuid=yn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=yn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=yn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Be=new P,Ys=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix4(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyNormalMatrix(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.transformDirection(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=un(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=un(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=un(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=un(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=un(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array),r=re(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ee(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},qs=class extends ti{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Nt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Gi,Es=new P,Wi=new P,Xi=new P,Yi=new j,Ts=new j,xu=new Vt,Fr=new P,Rs=new P,Or=new P,Fh=new j,_a=new j,Oh=new j,ao=class extends Oe{constructor(t=new qs){if(super(),this.isSprite=!0,this.type="Sprite",Gi===void 0){Gi=new ce;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new oo(e,5);Gi.setIndex([0,1,2,0,2,3]),Gi.setAttribute("position",new Ys(n,3,0,!1)),Gi.setAttribute("uv",new Ys(n,2,3,!1))}this.geometry=Gi,this.material=t,this.center=new j(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Wi.setFromMatrixScale(this.matrixWorld),xu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Xi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Wi.multiplyScalar(-Xi.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;Br(Fr.set(-.5,-.5,0),Xi,o,Wi,s,r),Br(Rs.set(.5,-.5,0),Xi,o,Wi,s,r),Br(Or.set(.5,.5,0),Xi,o,Wi,s,r),Fh.set(0,0),_a.set(1,0),Oh.set(1,1);let a=t.ray.intersectTriangle(Fr,Rs,Or,!1,Es);if(a===null&&(Br(Rs.set(-.5,.5,0),Xi,o,Wi,s,r),_a.set(0,1),a=t.ray.intersectTriangle(Fr,Or,Rs,!1,Es),a===null))return;let c=t.ray.origin.distanceTo(Es);c<t.near||c>t.far||e.push({distance:c,point:Es.clone(),uv:Zn.getInterpolation(Es,Fr,Rs,Or,Fh,_a,Oh,new j),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Br(i,t,e,n,s,r){Yi.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Ts.x=r*Yi.x-s*Yi.y,Ts.y=s*Yi.x+r*Yi.y):Ts.copy(Yi),i.copy(t),i.x+=Ts.x,i.y+=Ts.y,i.applyMatrix4(xu)}var bc=class extends ke{constructor(t=null,e=1,n=1,s,r,o,a,c,l=Je,h=Je,u,d){super(null,o,a,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Zs=class extends Ee{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},qi=new Vt,Bh=new Vt,zr=[],zh=new Ke,Gx=new Vt,Cs=new ct,Is=new gi,Ye=class extends ct{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Zs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Gx)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ke),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,qi),zh.copy(t.boundingBox).applyMatrix4(qi),this.boundingBox.union(zh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new gi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,qi),Is.copy(t.boundingSphere).applyMatrix4(qi),this.boundingSphere.union(Is)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Cs.geometry=this.geometry,Cs.material=this.material,Cs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Is.copy(this.boundingSphere),Is.applyMatrix4(n),t.ray.intersectsSphere(Is)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,qi),Bh.multiplyMatrices(n,qi),Cs.matrixWorld=Bh,Cs.raycast(t,zr);for(let o=0,a=zr.length;o<a;o++){let c=zr[o];c.instanceId=r,c.object=this,e.push(c)}zr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Zs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new bc(new Float32Array(s*this.count),s,this.count,Qc,xn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var ni=class extends ke{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},nn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new j:new P);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new P,s=[],r=[],o=[],a=new P,c=new Vt;for(let f=0;f<=t;f++){let m=f/t;s[f]=this.getTangentAt(m,new P)}r[0]=new P,o[0]=new P;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(Ae(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Ae(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},$s=class extends nn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new j){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},wc=class extends $s{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function rl(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var kr=new P,xa=new rl,ya=new rl,va=new rl,Js=class extends nn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new P){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(kr.subVectors(s[0],s[1]).add(s[0]),l=kr);let u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(kr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=kr),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),xa.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,m,_,g),ya.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,m,_,g),va.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,m,_,g)}else this.curveType==="catmullrom"&&(xa.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),ya.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),va.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(xa.calc(c),ya.calc(c),va.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new P().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function kh(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function Wx(i,t){let e=1-i;return e*e*t}function Xx(i,t){return 2*(1-i)*i*t}function Yx(i,t){return i*i*t}function Os(i,t,e,n){return Wx(i,t)+Xx(i,e)+Yx(i,n)}function qx(i,t){let e=1-i;return e*e*e*t}function Zx(i,t){let e=1-i;return 3*e*e*i*t}function $x(i,t){return 3*(1-i)*i*i*t}function Jx(i,t){return i*i*i*t}function Bs(i,t,e,n,s){return qx(i,t)+Zx(i,e)+$x(i,n)+Jx(i,s)}var co=class extends nn{constructor(t=new j,e=new j,n=new j,s=new j){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new j){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Bs(t,s.x,r.x,o.x,a.x),Bs(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ac=class extends nn{constructor(t=new P,e=new P,n=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new P){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Bs(t,s.x,r.x,o.x,a.x),Bs(t,s.y,r.y,o.y,a.y),Bs(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},lo=class extends nn{constructor(t=new j,e=new j){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new j){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new j){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ec=class extends nn{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ho=class extends nn{constructor(t=new j,e=new j,n=new j){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new j){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Os(t,s.x,r.x,o.x),Os(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Tc=class extends nn{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Os(t,s.x,r.x,o.x),Os(t,s.y,r.y,o.y),Os(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ls=class extends nn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new j){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(kh(a,c.x,l.x,h.x,u.x),kh(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new j().fromArray(s))}return this}},Rc=Object.freeze({__proto__:null,ArcCurve:wc,CatmullRomCurve3:Js,CubicBezierCurve:co,CubicBezierCurve3:Ac,EllipseCurve:$s,LineCurve:lo,LineCurve3:Ec,QuadraticBezierCurve:ho,QuadraticBezierCurve3:Tc,SplineCurve:ls}),Cc=class extends nn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Rc[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Rc[s.type]().fromJSON(s))}return this}},_i=class extends Cc{constructor(t){super(),this.type="Path",this.currentPoint=new j,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new lo(this.currentPoint.clone(),new j(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new ho(this.currentPoint.clone(),new j(t,e),new j(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new co(this.currentPoint.clone(),new j(t,e),new j(n,s),new j(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new ls(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){let l=new $s(t,e,n,s,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},hs=class i extends ce{constructor(t=[new j(0,-.5),new j(.5,0),new j(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Ae(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],h=1/e,u=new P,d=new j,f=new P,m=new P,_=new P,g=0,p=0;for(let x=0;x<=t.length-1;x++)switch(x){case 0:g=t[x+1].x-t[x].x,p=t[x+1].y-t[x].y,f.x=p*1,f.y=-g,f.z=p*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:g=t[x+1].x-t[x].x,p=t[x+1].y-t[x].y,f.x=p*1,f.y=-g,f.z=p*0,m.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(m)}for(let x=0;x<=e;x++){let y=n+x*h*s,v=Math.sin(y),T=Math.cos(y);for(let w=0;w<=t.length-1;w++){u.x=t[w].x*v,u.y=t[w].y,u.z=t[w].x*T,o.push(u.x,u.y,u.z),d.x=x/e,d.y=w/(t.length-1),a.push(d.x,d.y);let R=c[3*w+0]*v,E=c[3*w+1],S=c[3*w+0]*T;l.push(R,E,S)}}for(let x=0;x<e;x++)for(let y=0;y<t.length-1;y++){let v=y+x*t.length,T=v,w=v+t.length,R=v+t.length+1,E=v+1;r.push(T,w,E),r.push(R,E,w)}this.setIndex(r),this.setAttribute("position",new Bt(o,3)),this.setAttribute("uv",new Bt(a,2)),this.setAttribute("normal",new Bt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}},xi=class i extends hs{constructor(t=1,e=1,n=4,s=8){let r=new _i;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new i(t.radius,t.length,t.capSegments,t.radialSegments)}},On=class i extends ce{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],c=[],l=new P,h=new j;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){let f=n+u/e*s;l.x=t*Math.cos(f),l.y=t*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Bt(o,3)),this.setAttribute("normal",new Bt(a,3)),this.setAttribute("uv",new Bt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},te=class i extends ce{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],f=[],m=0,_=[],g=n/2,p=0;x(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Bt(u,3)),this.setAttribute("normal",new Bt(d,3)),this.setAttribute("uv",new Bt(f,2));function x(){let v=new P,T=new P,w=0,R=(e-t)/n;for(let E=0;E<=r;E++){let S=[],M=E/r,C=M*(e-t)+t;for(let U=0;U<=s;U++){let D=U/s,N=D*c+a,W=Math.sin(N),B=Math.cos(N);T.x=C*W,T.y=-M*n+g,T.z=C*B,u.push(T.x,T.y,T.z),v.set(W,R,B).normalize(),d.push(v.x,v.y,v.z),f.push(D,1-M),S.push(m++)}_.push(S)}for(let E=0;E<s;E++)for(let S=0;S<r;S++){let M=_[S][E],C=_[S+1][E],U=_[S+1][E+1],D=_[S][E+1];(t>0||S!==0)&&(h.push(M,C,D),w+=3),(e>0||S!==r-1)&&(h.push(C,U,D),w+=3)}l.addGroup(p,w,0),p+=w}function y(v){let T=m,w=new j,R=new P,E=0,S=v===!0?t:e,M=v===!0?1:-1;for(let U=1;U<=s;U++)u.push(0,g*M,0),d.push(0,M,0),f.push(.5,.5),m++;let C=m;for(let U=0;U<=s;U++){let N=U/s*c+a,W=Math.cos(N),B=Math.sin(N);R.x=S*B,R.y=g*M,R.z=S*W,u.push(R.x,R.y,R.z),d.push(0,M,0),w.x=W*.5+.5,w.y=B*.5*M+.5,f.push(w.x,w.y),m++}for(let U=0;U<s;U++){let D=T+U,N=C+U;v===!0?h.push(N,N+1,D):h.push(N+1,N,D),E+=3}l.addGroup(p,E,v===!0?1:2),p+=E}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},uo=class i extends te{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ic=class i extends ce{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new Bt(r,3)),this.setAttribute("normal",new Bt(r.slice(),3)),this.setAttribute("uv",new Bt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(x){let y=new P,v=new P,T=new P;for(let w=0;w<e.length;w+=3)f(e[w+0],y),f(e[w+1],v),f(e[w+2],T),c(y,v,T,x)}function c(x,y,v,T){let w=T+1,R=[];for(let E=0;E<=w;E++){R[E]=[];let S=x.clone().lerp(v,E/w),M=y.clone().lerp(v,E/w),C=w-E;for(let U=0;U<=C;U++)U===0&&E===w?R[E][U]=S:R[E][U]=S.clone().lerp(M,U/C)}for(let E=0;E<w;E++)for(let S=0;S<2*(w-E)-1;S++){let M=Math.floor(S/2);S%2===0?(d(R[E][M+1]),d(R[E+1][M]),d(R[E][M])):(d(R[E][M+1]),d(R[E+1][M+1]),d(R[E+1][M]))}}function l(x){let y=new P;for(let v=0;v<r.length;v+=3)y.x=r[v+0],y.y=r[v+1],y.z=r[v+2],y.normalize().multiplyScalar(x),r[v+0]=y.x,r[v+1]=y.y,r[v+2]=y.z}function h(){let x=new P;for(let y=0;y<r.length;y+=3){x.x=r[y+0],x.y=r[y+1],x.z=r[y+2];let v=g(x)/2/Math.PI+.5,T=p(x)/Math.PI+.5;o.push(v,1-T)}m(),u()}function u(){for(let x=0;x<o.length;x+=6){let y=o[x+0],v=o[x+2],T=o[x+4],w=Math.max(y,v,T),R=Math.min(y,v,T);w>.9&&R<.1&&(y<.2&&(o[x+0]+=1),v<.2&&(o[x+2]+=1),T<.2&&(o[x+4]+=1))}}function d(x){r.push(x.x,x.y,x.z)}function f(x,y){let v=x*3;y.x=t[v+0],y.y=t[v+1],y.z=t[v+2]}function m(){let x=new P,y=new P,v=new P,T=new P,w=new j,R=new j,E=new j;for(let S=0,M=0;S<r.length;S+=9,M+=6){x.set(r[S+0],r[S+1],r[S+2]),y.set(r[S+3],r[S+4],r[S+5]),v.set(r[S+6],r[S+7],r[S+8]),w.set(o[M+0],o[M+1]),R.set(o[M+2],o[M+3]),E.set(o[M+4],o[M+5]),T.copy(x).add(y).add(v).divideScalar(3);let C=g(T);_(w,M+0,x,C),_(R,M+2,y,C),_(E,M+4,v,C)}}function _(x,y,v,T){T<0&&x.x===1&&(o[y]=x.x-1),v.x===0&&v.z===0&&(o[y]=T/2/Math.PI+.5)}function g(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.details)}};var vn=class extends _i{constructor(t){super(t),this.uuid=yn(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new _i().fromJSON(s))}return this}},Kx={triangulate:function(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=yu(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,d,f;if(n&&(r=ny(i,t,r,e)),i.length>80*e){a=l=i[0],c=h=i[1];for(let m=e;m<s;m+=e)u=i[m],d=i[m+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return Ks(r,o,e,a,c,f,0),o}};function yu(i,t,e,n,s){let r,o;if(s===dy(i,t,e,n)>0)for(r=t;r<e;r+=n)o=Vh(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=Vh(r,i[r],i[r+1],o);return o&&bo(o,o.next)&&(js(o),o=o.next),o}function yi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(bo(e,e.next)||ge(e.prev,e,e.next)===0)){if(js(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ks(i,t,e,n,s,r,o){if(!i)return;!o&&r&&ay(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?jx(i,n,s,r):Qx(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),js(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=ty(yi(i),t,e),Ks(i,t,e,n,s,r,2)):o===2&&ey(i,t,e,n,s,r):Ks(yi(i),t,e,n,s,r,1);break}}}function Qx(i){let t=i.prev,e=i,n=i.next;if(ge(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,d=s>r?s>o?s:o:r>o?r:o,f=a>c?a>l?a:l:c>l?c:l,m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&$i(s,a,r,c,o,l,m.x,m.y)&&ge(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function jx(i,t,e,n){let s=i.prev,r=i,o=i.next;if(ge(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,d=o.y,f=a<c?a<l?a:l:c<l?c:l,m=h<u?h<d?h:d:u<d?u:d,_=a>c?a>l?a:l:c>l?c:l,g=h>u?h>d?h:d:u>d?u:d,p=Pc(f,m,t,e,n),x=Pc(_,g,t,e,n),y=i.prevZ,v=i.nextZ;for(;y&&y.z>=p&&v&&v.z<=x;){if(y.x>=f&&y.x<=_&&y.y>=m&&y.y<=g&&y!==s&&y!==o&&$i(a,h,c,u,l,d,y.x,y.y)&&ge(y.prev,y,y.next)>=0||(y=y.prevZ,v.x>=f&&v.x<=_&&v.y>=m&&v.y<=g&&v!==s&&v!==o&&$i(a,h,c,u,l,d,v.x,v.y)&&ge(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;y&&y.z>=p;){if(y.x>=f&&y.x<=_&&y.y>=m&&y.y<=g&&y!==s&&y!==o&&$i(a,h,c,u,l,d,y.x,y.y)&&ge(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;v&&v.z<=x;){if(v.x>=f&&v.x<=_&&v.y>=m&&v.y<=g&&v!==s&&v!==o&&$i(a,h,c,u,l,d,v.x,v.y)&&ge(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function ty(i,t,e){let n=i;do{let s=n.prev,r=n.next.next;!bo(s,r)&&vu(s,n,n.next,r)&&Qs(s,r)&&Qs(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),js(n),js(n.next),n=i=r),n=n.next}while(n!==i);return yi(n)}function ey(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&hy(o,a)){let c=Mu(o,a);o=yi(o,o.next),c=yi(c,c.next),Ks(o,t,e,n,s,r,0),Ks(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function ny(i,t,e,n){let s=[],r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=yu(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(ly(l));for(s.sort(iy),r=0;r<s.length;r++)e=sy(s[r],e);return e}function iy(i,t){return i.x-t.x}function sy(i,t){let e=ry(i,t);if(!e)return t;let n=Mu(e,i);return yi(n,n.next),yi(e,e.next)}function ry(i,t){let e=t,n=-1/0,s,r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){let d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;let a=s,c=s.x,l=s.y,h=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&$i(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),Qs(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&oy(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function oy(i,t){return ge(i.prev,i,t.prev)<0&&ge(t.next,i,i.next)<0}function ay(i,t,e,n){let s=i;do s.z===0&&(s.z=Pc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,cy(s)}function cy(i){let t,e,n,s,r,o,a,c,l=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(o>1);return i}function Pc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function ly(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function $i(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function hy(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!uy(i,t)&&(Qs(i,t)&&Qs(t,i)&&fy(i,t)&&(ge(i.prev,i,t.prev)||ge(i,t.prev,t))||bo(i,t)&&ge(i.prev,i,i.next)>0&&ge(t.prev,t,t.next)>0)}function ge(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function bo(i,t){return i.x===t.x&&i.y===t.y}function vu(i,t,e,n){let s=Hr(ge(i,t,e)),r=Hr(ge(i,t,n)),o=Hr(ge(e,n,i)),a=Hr(ge(e,n,t));return!!(s!==r&&o!==a||s===0&&Vr(i,e,t)||r===0&&Vr(i,n,t)||o===0&&Vr(e,i,n)||a===0&&Vr(e,t,n))}function Vr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Hr(i){return i>0?1:i<0?-1:0}function uy(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&vu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Qs(i,t){return ge(i.prev,i,i.next)<0?ge(i,t,i.next)>=0&&ge(i,i.prev,t)>=0:ge(i,t,i.prev)<0||ge(i,i.next,t)<0}function fy(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Mu(i,t){let e=new Lc(i.i,i.x,i.y),n=new Lc(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Vh(i,t,e,n){let s=new Lc(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function js(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Lc(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function dy(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Kn=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Hh(t),Gh(n,t);let o=t.length;e.forEach(Hh);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Gh(n,e[c]);let a=Kx.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function Hh(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Gh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var tr=class i extends ce{constructor(t=new vn([new j(.5,.5),new j(-.5,.5),new j(-.5,-.5),new j(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){let l=t[a];o(l)}this.setAttribute("position",new Bt(s,3)),this.setAttribute("uv",new Bt(r,2)),this.computeVertexNormals();function o(a){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,x=e.UVGenerator!==void 0?e.UVGenerator:py,y,v=!1,T,w,R,E;p&&(y=p.getSpacedPoints(h),v=!0,d=!1,T=p.computeFrenetFrames(h,!1),w=new P,R=new P,E=new P),d||(g=0,f=0,m=0,_=0);let S=a.extractPoints(l),M=S.shape,C=S.holes;if(!Kn.isClockWise(M)){M=M.reverse();for(let Z=0,rt=C.length;Z<rt;Z++){let L=C[Z];Kn.isClockWise(L)&&(C[Z]=L.reverse())}}let D=Kn.triangulateShape(M,C),N=M;for(let Z=0,rt=C.length;Z<rt;Z++){let L=C[Z];M=M.concat(L)}function W(Z,rt,L){return rt||console.error("THREE.ExtrudeGeometry: vec does not exist"),Z.clone().addScaledVector(rt,L)}let B=M.length,K=D.length;function F(Z,rt,L){let St,it,At,ut=Z.x-rt.x,Ot=Z.y-rt.y,vt=L.x-Z.x,I=L.y-Z.y,b=ut*ut+Ot*Ot,V=ut*I-Ot*vt;if(Math.abs(V)>Number.EPSILON){let $=Math.sqrt(b),nt=Math.sqrt(vt*vt+I*I),J=rt.x-Ot/$,Pt=rt.y+ut/$,xt=L.x-I/nt,Tt=L.y+vt/nt,$t=((xt-J)*I-(Tt-Pt)*vt)/(ut*I-Ot*vt);St=J+ut*$t-Z.x,it=Pt+Ot*$t-Z.y;let lt=St*St+it*it;if(lt<=2)return new j(St,it);At=Math.sqrt(lt/2)}else{let $=!1;ut>Number.EPSILON?vt>Number.EPSILON&&($=!0):ut<-Number.EPSILON?vt<-Number.EPSILON&&($=!0):Math.sign(Ot)===Math.sign(I)&&($=!0),$?(St=-Ot,it=ut,At=Math.sqrt(b)):(St=ut,it=Ot,At=Math.sqrt(b/2))}return new j(St/At,it/At)}let st=[];for(let Z=0,rt=N.length,L=rt-1,St=Z+1;Z<rt;Z++,L++,St++)L===rt&&(L=0),St===rt&&(St=0),st[Z]=F(N[Z],N[L],N[St]);let ht=[],Y,Q=st.concat();for(let Z=0,rt=C.length;Z<rt;Z++){let L=C[Z];Y=[];for(let St=0,it=L.length,At=it-1,ut=St+1;St<it;St++,At++,ut++)At===it&&(At=0),ut===it&&(ut=0),Y[St]=F(L[St],L[At],L[ut]);ht.push(Y),Q=Q.concat(Y)}for(let Z=0;Z<g;Z++){let rt=Z/g,L=f*Math.cos(rt*Math.PI/2),St=m*Math.sin(rt*Math.PI/2)+_;for(let it=0,At=N.length;it<At;it++){let ut=W(N[it],st[it],St);ot(ut.x,ut.y,-L)}for(let it=0,At=C.length;it<At;it++){let ut=C[it];Y=ht[it];for(let Ot=0,vt=ut.length;Ot<vt;Ot++){let I=W(ut[Ot],Y[Ot],St);ot(I.x,I.y,-L)}}}let mt=m+_;for(let Z=0;Z<B;Z++){let rt=d?W(M[Z],Q[Z],mt):M[Z];v?(R.copy(T.normals[0]).multiplyScalar(rt.x),w.copy(T.binormals[0]).multiplyScalar(rt.y),E.copy(y[0]).add(R).add(w),ot(E.x,E.y,E.z)):ot(rt.x,rt.y,0)}for(let Z=1;Z<=h;Z++)for(let rt=0;rt<B;rt++){let L=d?W(M[rt],Q[rt],mt):M[rt];v?(R.copy(T.normals[Z]).multiplyScalar(L.x),w.copy(T.binormals[Z]).multiplyScalar(L.y),E.copy(y[Z]).add(R).add(w),ot(E.x,E.y,E.z)):ot(L.x,L.y,u/h*Z)}for(let Z=g-1;Z>=0;Z--){let rt=Z/g,L=f*Math.cos(rt*Math.PI/2),St=m*Math.sin(rt*Math.PI/2)+_;for(let it=0,At=N.length;it<At;it++){let ut=W(N[it],st[it],St);ot(ut.x,ut.y,u+L)}for(let it=0,At=C.length;it<At;it++){let ut=C[it];Y=ht[it];for(let Ot=0,vt=ut.length;Ot<vt;Ot++){let I=W(ut[Ot],Y[Ot],St);v?ot(I.x,I.y+y[h-1].y,y[h-1].x+L):ot(I.x,I.y,u+L)}}}X(),et();function X(){let Z=s.length/3;if(d){let rt=0,L=B*rt;for(let St=0;St<K;St++){let it=D[St];pt(it[2]+L,it[1]+L,it[0]+L)}rt=h+g*2,L=B*rt;for(let St=0;St<K;St++){let it=D[St];pt(it[0]+L,it[1]+L,it[2]+L)}}else{for(let rt=0;rt<K;rt++){let L=D[rt];pt(L[2],L[1],L[0])}for(let rt=0;rt<K;rt++){let L=D[rt];pt(L[0]+B*h,L[1]+B*h,L[2]+B*h)}}n.addGroup(Z,s.length/3-Z,0)}function et(){let Z=s.length/3,rt=0;dt(N,rt),rt+=N.length;for(let L=0,St=C.length;L<St;L++){let it=C[L];dt(it,rt),rt+=it.length}n.addGroup(Z,s.length/3-Z,1)}function dt(Z,rt){let L=Z.length;for(;--L>=0;){let St=L,it=L-1;it<0&&(it=Z.length-1);for(let At=0,ut=h+g*2;At<ut;At++){let Ot=B*At,vt=B*(At+1),I=rt+St+Ot,b=rt+it+Ot,V=rt+it+vt,$=rt+St+vt;at(I,b,V,$)}}}function ot(Z,rt,L){c.push(Z),c.push(rt),c.push(L)}function pt(Z,rt,L){yt(Z),yt(rt),yt(L);let St=s.length/3,it=x.generateTopUV(n,s,St-3,St-2,St-1);It(it[0]),It(it[1]),It(it[2])}function at(Z,rt,L,St){yt(Z),yt(rt),yt(St),yt(rt),yt(L),yt(St);let it=s.length/3,At=x.generateSideWallUV(n,s,it-6,it-3,it-2,it-1);It(At[0]),It(At[1]),It(At[3]),It(At[1]),It(At[2]),It(At[3])}function yt(Z){s.push(c[Z*3+0]),s.push(c[Z*3+1]),s.push(c[Z*3+2])}function It(Z){r.push(Z.x),r.push(Z.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return my(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Rc[s.type]().fromJSON(s)),new i(n,t.options)}},py={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new j(r,o),new j(a,c),new j(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[s*3],f=t[s*3+1],m=t[s*3+2],_=t[r*3],g=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new j(o,1-c),new j(l,1-u),new j(d,1-m),new j(_,1-p)]:[new j(a,1-c),new j(h,1-u),new j(f,1-m),new j(g,1-p)]}};function my(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var er=class i extends Ic{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var nr=class i extends ce{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],l=[],h=[],u=t,d=(e-t)/s,f=new P,m=new j;for(let _=0;_<=s;_++){for(let g=0;g<=n;g++){let p=r+g/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,h.push(m.x,m.y)}u+=d}for(let _=0;_<s;_++){let g=_*(n+1);for(let p=0;p<n;p++){let x=p+g,y=x,v=x+n+1,T=x+n+2,w=x+1;a.push(y,v,w),a.push(v,T,w)}}this.setIndex(a),this.setAttribute("position",new Bt(c,3)),this.setAttribute("normal",new Bt(l,3)),this.setAttribute("uv",new Bt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},ir=class i extends ce{constructor(t=new vn([new j(0,.5),new j(-.5,-.5),new j(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],o=[],a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new Bt(s,3)),this.setAttribute("normal",new Bt(r,3)),this.setAttribute("uv",new Bt(o,2));function l(h){let u=s.length/3,d=h.extractPoints(e),f=d.shape,m=d.holes;Kn.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){let x=m[g];Kn.isClockWise(x)===!0&&(m[g]=x.reverse())}let _=Kn.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){let x=m[g];f=f.concat(x)}for(let g=0,p=f.length;g<p;g++){let x=f[g];s.push(x.x,x.y,0),r.push(0,0,1),o.push(x.x,x.y)}for(let g=0,p=_.length;g<p;g++){let x=_[g],y=x[0]+u,v=x[1]+u,T=x[2]+u;n.push(y,v,T),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return gy(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let o=e[t.shapes[s]];n.push(o)}return new i(n,t.curveSegments)}};function gy(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}var He=class i extends ce{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new P,d=new P,f=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){let x=[],y=p/n,v=0;p===0&&o===0?v=.5/e:p===n&&c===Math.PI&&(v=-.5/e);for(let T=0;T<=e;T++){let w=T/e;u.x=-t*Math.cos(s+w*r)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(s+w*r)*Math.sin(o+y*a),m.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),g.push(w+v,1-y),x.push(l++)}h.push(x)}for(let p=0;p<n;p++)for(let x=0;x<e;x++){let y=h[p][x+1],v=h[p][x],T=h[p+1][x],w=h[p+1][x+1];(p!==0||o>0)&&f.push(y,v,w),(p!==n-1||c<Math.PI)&&f.push(v,T,w)}this.setIndex(f),this.setAttribute("position",new Bt(m,3)),this.setAttribute("normal",new Bt(_,3)),this.setAttribute("uv",new Bt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var us=class i extends ce{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],l=[],h=new P,u=new P,d=new P;for(let f=0;f<=n;f++)for(let m=0;m<=s;m++){let _=m/s*r,g=f/n*Math.PI*2;u.x=(t+e*Math.cos(g))*Math.cos(_),u.y=(t+e*Math.cos(g))*Math.sin(_),u.z=e*Math.sin(g),a.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(m/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=s;m++){let _=(s+1)*f+m-1,g=(s+1)*(f-1)+m-1,p=(s+1)*(f-1)+m,x=(s+1)*f+m;o.push(_,g,x),o.push(g,p,x)}this.setIndex(o),this.setAttribute("position",new Bt(a,3)),this.setAttribute("normal",new Bt(c,3)),this.setAttribute("uv",new Bt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var _t=class extends ti{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=cu,this.normalScale=new j(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ve,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},fs=class extends _t{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new j(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ae(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Nt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Nt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Nt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};function Gr(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function _y(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var ds=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Dc=class extends ds{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:kl,endingEnd:kl}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Vl:r=t,a=2*e-n;break;case Hl:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Vl:o=t,c=2*n-e;break;case Hl:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-e)/(s-e),_=m*m,g=_*m,p=-d*g+2*d*_-d*m,x=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*m+1,y=(-1-f)*g+(1.5+f)*_+.5*m,v=f*g-f*_;for(let T=0;T!==a;++T)r[T]=p*o[h+T]+x*o[l+T]+y*o[c+T]+v*o[u+T];return r}},Uc=class extends ds{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(s-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}},Nc=class extends ds{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},dn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Gr(e,this.TimeBufferType),this.values=Gr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Gr(t.times,Array),values:Gr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Nc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Uc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Dc(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case $r:e=this.InterpolantFactoryMethodDiscrete;break;case ac:e=this.InterpolantFactoryMethodLinear;break;case Wo:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return $r;case this.InterpolantFactoryMethodLinear:return ac;case this.InterpolantFactoryMethodSmooth:return Wo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&_y(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Wo,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let u=a*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){let _=e[u+m];if(_!==e[d+m]||_!==e[f+m]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};dn.prototype.TimeBufferType=Float32Array;dn.prototype.ValueBufferType=Float32Array;dn.prototype.DefaultInterpolation=ac;var vi=class extends dn{constructor(t,e,n){super(t,e,n)}};vi.prototype.ValueTypeName="bool";vi.prototype.ValueBufferType=Array;vi.prototype.DefaultInterpolation=$r;vi.prototype.InterpolantFactoryMethodLinear=void 0;vi.prototype.InterpolantFactoryMethodSmooth=void 0;var Fc=class extends dn{};Fc.prototype.ValueTypeName="color";var Oc=class extends dn{};Oc.prototype.ValueTypeName="number";var Bc=class extends ds{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)Ie.slerpFlat(r,0,o,l-a,o,l,c);return r}},fo=class extends dn{InterpolantFactoryMethodLinear(t){return new Bc(this.times,this.values,this.getValueSize(),t)}};fo.prototype.ValueTypeName="quaternion";fo.prototype.InterpolantFactoryMethodSmooth=void 0;var Mi=class extends dn{constructor(t,e,n){super(t,e,n)}};Mi.prototype.ValueTypeName="string";Mi.prototype.ValueBufferType=Array;Mi.prototype.DefaultInterpolation=$r;Mi.prototype.InterpolantFactoryMethodLinear=void 0;Mi.prototype.InterpolantFactoryMethodSmooth=void 0;var zc=class extends dn{};zc.prototype.ValueTypeName="vector";var Wh={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},kc=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],m=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null}}},xy=new kc,sr=class{constructor(t){this.manager=t!==void 0?t:xy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};sr.DEFAULT_MATERIAL_NAME="__DEFAULT";var Vc=class extends sr{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=Wh.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;let a=Vs("img");function c(){h(),Wh.add(t,this),e&&e(this),r.manager.itemEnd(t)}function l(u){h(),s&&s(u),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}};var po=class extends sr{constructor(t){super(t)}load(t,e,n,s){let r=new ke,o=new Vc(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},rr=class extends Oe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Nt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},mo=class extends rr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Oe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Nt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Ma=new Vt,Xh=new P,Yh=new P,go=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new j(512,512),this.map=null,this.mapPass=null,this.matrix=new Vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xs,this._frameExtents=new j(1,1),this._viewportCount=1,this._viewports=[new ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Xh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Xh),Yh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Yh),e.updateMatrixWorld(),Ma.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ma),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ma)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var qh=new Vt,Ps=new P,Sa=new P,Hc=class extends go{constructor(){super(new Ne(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new j(4,2),this._viewportCount=6,this._viewports=[new ie(2,1,1,1),new ie(0,1,1,1),new ie(3,1,1,1),new ie(1,1,1,1),new ie(3,0,1,1),new ie(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Ps.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ps),Sa.copy(n.position),Sa.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Sa),n.updateMatrixWorld(),s.makeTranslation(-Ps.x,-Ps.y,-Ps.z),qh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(qh)}},_o=class extends rr{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Hc}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Gc=class extends go{constructor(){super(new os(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},xo=class extends rr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Oe.DEFAULT_UP),this.updateMatrix(),this.target=new Oe,this.shadow=new Gc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var ol="\\[\\]\\.:\\/",yy=new RegExp("["+ol+"]","g"),al="[^"+ol+"]",vy="[^"+ol.replace("\\.","")+"]",My=/((?:WC+[\/:])*)/.source.replace("WC",al),Sy=/(WCOD+)?/.source.replace("WCOD",vy),by=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",al),wy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",al),Ay=new RegExp("^"+My+Sy+by+wy+"$"),Ey=["material","materials","bones","map"],Wc=class{constructor(t,e,n){let s=n||pe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},pe=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(yy,"")}static parseTrackName(t){let e=Ay.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Ey.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};pe.Composite=Wc;pe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};pe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};pe.prototype.GetterByBindingType=[pe.prototype._getValue_direct,pe.prototype._getValue_array,pe.prototype._getValue_arrayElement,pe.prototype._getValue_toArray];pe.prototype.SetterByBindingTypeAndVersioning=[[pe.prototype._setValue_direct,pe.prototype._setValue_direct_setNeedsUpdate,pe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_array,pe.prototype._setValue_array_setNeedsUpdate,pe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_arrayElement,pe.prototype._setValue_arrayElement_setNeedsUpdate,pe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_fromArray,pe.prototype._setValue_fromArray_setNeedsUpdate,pe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var iS=new Float32Array(1);var Zh=new Vt,yo=class{constructor(t,e,n=0,s=1/0){this.ray=new jr(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Hs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Zh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Zh),this}intersectObject(t,e=!0,n=[]){return Xc(t,this,n,e),n.sort($h),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Xc(t[s],this,n,e);return n.sort($h),n}};function $h(i,t){return i.distance-t.distance}function Xc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Xc(r[o],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Yc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Yc);var be=(i,t,e)=>({rel:[i,t,e]}),ve=(i,t,e)=>({abs:[i,t,e]}),Su=[{u:0,pos:ve(321.2,.7,211.4),tgt:ve(330,.95,205.7),fov:34},{u:.085,pos:ve(320.2,.74,211.6),tgt:ve(326.2,.92,205.8),fov:34},{u:.115,pos:be(-1.5,1.25,-5.5),tgt:be(.5,.85,0),fov:38},{u:.15,pos:be(-9,2.4,-7),tgt:be(3,.8,0),fov:38},{u:.18,pos:be(-5.5,1.8,-7.2),tgt:be(1,.9,0),fov:39},{u:.2,pos:ve(-65.3,1.5,197.5),tgt:ve(-58.3,1,187),fov:40},{u:.315,pos:ve(-64.6,1.55,197.3),tgt:ve(-58.4,1,187.1),fov:40},{u:.345,pos:ve(-120,60,330),tgt:ve(-140,0,120),fov:44},{u:.375,pos:ve(40,620,560),tgt:ve(-10,0,40),fov:46},{u:.4,pos:ve(-380,220,420),tgt:ve(-520,0,120),fov:42},{u:.425,pos:be(4,1.6,-11),tgt:be(.3,.7,0),fov:38},{u:.56,pos:be(1,1.7,-11.5),tgt:be(.6,.7,0),fov:38},{u:.59,pos:be(-12,3.2,-4),tgt:be(6,1,0),fov:40},{u:.635,pos:be(-11,3,4),tgt:be(5,1,0),fov:40},{u:.665,pos:ve(-2.6,1.3,133.4),tgt:ve(-7.8,.75,124.3),fov:36},{u:.79,pos:ve(-1.6,1.32,133),tgt:ve(-6.6,.75,124.3),fov:36},{u:.815,pos:be(-8,2,5),tgt:be(3,.9,0),fov:38},{u:.84,pos:be(-4,2.2,7),tgt:be(2,.9,0),fov:40},{u:.865,pos:be(6.5,1.25,4.5),tgt:be(0,.8,0),fov:37},{u:.885,pos:ve(10.6,1.12,188.4),tgt:ve(18,.8,192.4),fov:36},{u:1,pos:ve(9.2,1.1,188.9),tgt:ve(15.6,.8,192.4),fov:35}],bu=[346,.5,214.4],wu=30;var Qe=(i,t,e)=>i+(t-i)*e,zt=(i,t,e)=>Math.min(e,Math.max(t,i)),Pe=i=>i*i*(3-2*i),Au=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2;function gs(i){let t=i.map(r=>r[0]),e=i.map(r=>r[1]),n=i.length,s=e.map((r,o)=>o===0?(e[1]-e[0])/(t[1]-t[0]):o===n-1?(e[n-1]-e[n-2])/(t[n-1]-t[n-2]):(e[o+1]-e[o-1])/(t[o+1]-t[o-1]));return r=>{if(r<=t[0])return e[0];if(r>=t[n-1])return e[n-1];let o=0;for(;r>t[o+1];)o++;let a=t[o+1]-t[o],c=(r-t[o])/a,l=c*c,h=l*c;return(2*h-3*l+1)*e[o]+(h-2*l+c)*a*s[o]+(-2*h+3*l)*e[o+1]+(h-l)*a*s[o+1]}}function or(i,t,e){let n=i.length;if(e<=0)return(t[1]-t[0])/(i[1]-i[0]);if(e>=n-1)return(t[n-1]-t[n-2])/(i[n-1]-i[n-2]);let s=(t[e]-t[e-1])/(i[e]-i[e-1]),r=(t[e+1]-t[e])/(i[e+1]-i[e]);if(s*r<=0)return 0;let o=i[e]-i[e-1],a=i[e+1]-i[e],c=2*a+o,l=a+2*o;return(c+l)/(c/s+l/r)}function wo(i,t,e,n,s,r,o){let a=t-i,c=(o-i)/a,l=c*c,h=l*c;return(2*h-3*l+1)*e+(h-2*l+c)*a*s+(3*l-2*h)*n+(h-l)*a*r}var Ty=1.6,Ry=2.2;function Cy(i,t){let e=Math.max(1,Math.sqrt(Ty/t));return e>1?2*Math.atan(Math.tan(i*Math.PI/360)*Math.min(Ry,e))*180/Math.PI:i}function Eu(i,t,e){let n=t.map(u=>u.u),s=[[],[],[],[],[],[],[]],r=new P,o=new P,a=new P;function c(u,d){let f=u[d];if(f.abs)return r.set(...f.abs).clone();let[m,_,g]=f.rel;return e.p.clone().addScaledVector(e.f,m).addScaledVector(e.r,g).setY(_+e.p.y)}function l(u,d,f){let m=zt(u,0,1),_=0;for(;_<t.length-2&&m>n[_+1];)_++;for(let p=Math.max(0,_-1);p<=Math.min(t.length-1,_+2);p++){let x=c(t[p],"pos"),y=c(t[p],"tgt");s[0][p]=x.x,s[1][p]=x.y,s[2][p]=x.z,s[3][p]=y.x,s[4][p]=y.y,s[5][p]=y.z,s[6][p]=t[p].fov}let g=p=>wo(n[_],n[_+1],s[p][_],s[p][_+1],or(n,s[p],_),or(n,s[p],_+1),m);return d.set(g(0),g(1),g(2)),f.set(g(3),g(4),g(5)),g(6)}function h({progress:u,introEase:d,clock:f,debugCam:m,width:_,height:g,framingX:p,framingY:x}){let y=new P,v=new P,T=l(u,y,v);if(m&&(y.set(...m.pos),v.set(...m.tgt),T=m.fov||T),d<1){let R=new P(...bu);y.lerpVectors(R,y,d),T=Qe(wu,T,d)}let w=Math.sin(f*.23)*.12;y.y+=w*.3,o.copy(y),a.copy(v),T=Cy(T,i.aspect),i.position.copy(o),i.lookAt(a),i.fov=T,p||x?i.setViewOffset(_,g,-p*_,x*g,_,g):i.clearViewOffset(),i.updateProjectionMatrix()}return{position:o,target:a,evaluateShots:l,update:h}}var Iy=.5,Py=.05,Ly=400,sn=20,_s=3200,Tu=3*sn,Dy=.25,Uy=.3,Ny=.1,Fy=.25,Oy=1.35,By=.02,xe=Math.ceil(2*_s/sn),Ao=0,cl=1,Ru=2,Cu=3,Mn=i=>Math.min(xe-1,Math.max(0,Math.floor((i+_s)/sn)));function zy(i){let t=i.attributes.normal;if(i.type!=="BoxGeometry"||!t)return!1;for(let e=0;e<t.count;e++){let n=Math.abs(t.getX(e)),s=Math.abs(t.getY(e)),r=Math.abs(t.getZ(e));if(n+s+r>Math.max(n,s,r)+1e-6)return!1}return!0}function Pu(i){let t=i.geometry,e=t.attributes.position,n=i.matrixWorld.elements,s=new Float64Array(e.count*3),r=!e.isInterleavedBufferAttribute&&!e.normalized,o=e.array,a=e.itemSize;for(let h=0,u=0;h<e.count;h++,u+=3){let d=r?o[h*a]:e.getX(h),f=r?o[h*a+1]:e.getY(h),m=r?o[h*a+2]:e.getZ(h);s[u]=n[0]*d+n[4]*f+n[8]*m+n[12],s[u+1]=n[1]*d+n[5]*f+n[9]*m+n[13],s[u+2]=n[2]*d+n[6]*f+n[10]*m+n[14]}let c=t.index?t.index.array:null,l=c?t.index.count:e.count;return[s,c,l-l%3]}function ky(i,t){let[e,n,s]=Pu(i),r=new Map,o=t.length;for(let a=0;a<s;a+=3){let c=1/0,l=1/0,h=1/0,u=-1/0,d=-1/0,f=-1/0;for(let m=0;m<3;m++){let _=3*(n?n[a+m]:a+m),g=e[_],p=e[_+1],x=e[_+2];c=Math.min(c,g),u=Math.max(u,g),l=Math.min(l,p),d=Math.max(d,p),h=Math.min(h,x),f=Math.max(f,x)}for(let m=Mn(h);m<=Mn(f);m++)for(let _=Mn(c);_<=Mn(u);_++){let g=_*sn-_s,p=m*sn-_s,x=m*xe+_,y=r.get(x);y===void 0&&(y=t.length,r.set(x,y),t.push(1/0,1/0,1/0,-1/0,-1/0,-1/0)),t[y]=Math.min(t[y],_>0?Math.max(c,g):c),t[y+1]=Math.min(t[y+1],l),t[y+2]=Math.min(t[y+2],m>0?Math.max(h,p):h),t[y+3]=Math.max(t[y+3],_<xe-1?Math.min(u,g+sn):u),t[y+4]=Math.max(t[y+4],d),t[y+5]=Math.max(t[y+5],m<xe-1?Math.min(f,p+sn):f)}}return(t.length-o)/6}function Iu(i){let t=i.elements;return Math.abs(t[1])+Math.abs(t[2])+Math.abs(t[4])+Math.abs(t[6])+Math.abs(t[8])+Math.abs(t[9])<1e-9}function Vy(i,t,e,n,s,r,o,a,c,l,h,u){let d=o-n,f=a-s,m=c-r,_=l-n,g=h-s,p=u-r,x=i-n,y=t-s,v=e-r,T=d*x+f*y+m*v,w=_*x+g*y+p*v,R,E,S;if(T<=0&&w<=0)R=n,E=s,S=r;else{let M=i-o,C=t-a,U=e-c,D=d*M+f*C+m*U,N=_*M+g*C+p*U,W=i-l,B=t-h,K=e-u,F=d*W+f*B+m*K,st=_*W+g*B+p*K,ht=D*st-F*N,Y=F*w-T*st,Q=T*N-D*w;if(D>=0&&N<=D)R=o,E=a,S=c;else if(st>=0&&F<=st)R=l,E=h,S=u;else if(Q<=0&&T>=0&&D<=0){let mt=T/(T-D);R=n+mt*d,E=s+mt*f,S=r+mt*m}else if(Y<=0&&w>=0&&st<=0){let mt=w/(w-st);R=n+mt*_,E=s+mt*g,S=r+mt*p}else if(ht<=0&&N-D>=0&&F-st>=0){let mt=(N-D)/(N-D+(F-st));R=o+mt*(l-o),E=a+mt*(h-a),S=c+mt*(u-c)}else{let mt=1/(ht+Y+Q),X=Y*mt,et=Q*mt;R=n+d*X+_*et,E=s+f*X+g*et,S=r+m*X+p*et}}return Math.hypot(i-R,t-E,e-S)}function Lu(i){let t=new Float32Array(xe*xe).fill(-1/0),e=new Int32Array(xe*xe+1),n=new Int32Array(0),s=new Uint8Array(0),r=new Int32Array(0),o=new Float32Array(0),a=[],c=[],l=new P,h=8e3,u=new P,d=new P,f=new P;function m(x,{sky:y,movers:v=[]}){x.updateMatrixWorld(!0),y.geometry.boundingSphere||y.geometry.computeBoundingSphere(),h=y.geometry.boundingSphere.radius,y.getWorldPosition(l);let T=new Ke,w=new P,R=new P;for(let Y of v){T.setFromObject(Y,!0),Y.getWorldPosition(R);let Q=0;for(let mt=0;mt<8;mt++)w.set(mt&1?T.max.x:T.min.x,mt&2?T.max.y:T.min.y,mt&4?T.max.z:T.min.z),Q=Math.max(Q,w.distanceTo(R));a.push({object:Y,radius:Q*(1+Ny)+Fy})}let E=[],S=[],M=0,C=0,U=new Set([y,...v]),D=Y=>{if(!U.has(Y)){if(Y.isSprite)c.push(Y);else if(Y.isMesh){let Q=Y.geometry;if(Q.boundingBox||Q.computeBoundingBox(),T.copy(Q.boundingBox).applyMatrix4(Y.matrixWorld),Y.isInstancedMesh)E.push(Y,Cu),M+=Y.count,C+=6*Y.count;else if(T.max.x-T.min.x<=Tu&&T.max.z-T.min.z<=Tu)E.push(Y,Ao),M++,C+=6;else if(T.max.y-T.min.y<=Dy){let mt=ky(Y,S);M+=mt,C+=6*mt}else{let mt=Math.floor((Q.index?Q.index.count:Q.attributes.position.count)/3);E.push(Y,cl),M+=mt,C+=9*mt}}for(let Q of Y.children)D(Q)}};D(x),s=new Uint8Array(M),r=new Int32Array(M),o=new Float32Array(C);let N=new Float32Array(M*5),W=0,B=0,K=(Y,Q,mt,X,et,dt,ot,pt)=>{s[W]=ot,r[W]=B,o[B++]=Y-pt,o[B++]=Q-pt,o[B++]=mt-pt,o[B++]=X+pt,o[B++]=et+pt,o[B++]=dt+pt;let at=W*5;N[at]=Y-pt,N[at+1]=mt-pt,N[at+2]=X+pt,N[at+3]=dt+pt,N[at+4]=et+pt,W++},F=(Y,Q,mt)=>{let X=(Y.min.x+Y.max.x)/2,et=(Y.min.y+Y.max.y)/2,dt=(Y.min.z+Y.max.z)/2,ot=(Y.max.x-Y.min.x)/2,pt=(Y.max.y-Y.min.y)/2,at=(Y.max.z-Y.min.z)/2,yt=Q[0]*X+Q[4]*et+Q[8]*dt+Q[12],It=Q[1]*X+Q[5]*et+Q[9]*dt+Q[13],Z=Q[2]*X+Q[6]*et+Q[10]*dt+Q[14],rt=Math.abs(Q[0])*ot+Math.abs(Q[4])*pt+Math.abs(Q[8])*at,L=Math.abs(Q[1])*ot+Math.abs(Q[5])*pt+Math.abs(Q[9])*at,St=Math.abs(Q[2])*ot+Math.abs(Q[6])*pt+Math.abs(Q[10])*at;K(yt-rt,It-L,Z-St,yt+rt,It+L,Z+St,mt?Ru:Ao,mt?0:Uy)};for(let Y=0;Y<S.length;Y+=6)K(S[Y],S[Y+1],S[Y+2],S[Y+3],S[Y+4],S[Y+5],Ao,0);let st=new Vt;for(let Y=0;Y<E.length;Y+=2){let Q=E[Y],mt=E[Y+1],X=Q.geometry,et=zy(X);if(mt===Ao)F(X.boundingBox,Q.matrixWorld.elements,et&&Iu(Q.matrixWorld));else if(mt===Cu)for(let dt=0;dt<Q.count;dt++)Q.getMatrixAt(dt,st),st.premultiply(Q.matrixWorld),F(X.boundingBox,st.elements,et&&Iu(st));else{let[dt,ot,pt]=Pu(Q);for(let at=0;at<pt;at+=3){s[W]=cl,r[W]=B;let yt=1/0,It=1/0,Z=-1/0,rt=-1/0,L=-1/0;for(let it=0;it<3;it++){let At=3*(ot?ot[at+it]:at+it),ut=dt[At],Ot=dt[At+1],vt=dt[At+2];o[B++]=ut,o[B++]=Ot,o[B++]=vt,ut<yt&&(yt=ut),ut>Z&&(Z=ut),Ot>rt&&(rt=Ot),vt<It&&(It=vt),vt>L&&(L=vt)}let St=W*5;N[St]=yt,N[St+1]=It,N[St+2]=Z,N[St+3]=L,N[St+4]=rt,W++}}}let ht=new Int32Array(xe*xe);for(let Y=0;Y<2;Y++){if(Y===1){e=new Int32Array(xe*xe+1);for(let Q=0;Q<xe*xe;Q++)e[Q+1]=e[Q]+ht[Q];n=new Int32Array(e[xe*xe]),ht.set(e.subarray(0,xe*xe))}for(let Q=0;Q<M;Q++){let mt=Q*5,X=Mn(N[mt]),et=Mn(N[mt+1]),dt=Mn(N[mt+2]),ot=Mn(N[mt+3]);for(let pt=et;pt<=ot;pt++)for(let at=X;at<=dt;at++){let yt=pt*xe+at;Y===0?(ht[yt]++,N[mt+4]>t[yt]&&(t[yt]=N[mt+4])):n[ht[yt]++]=Q}}}}function _(x,y,v,T,w){for(let R=e[x];R<e[x+1];R++){let E=n[R],S=r[E],M=o,C;if(s[E]!==cl){let U=Math.max(M[S]-y,0,y-M[S+3]),D=Math.max(M[S+1]-v,0,v-M[S+4]),N=Math.max(M[S+2]-T,0,T-M[S+5]);C=Math.sqrt(U*U+D*D+N*N),C===0&&s[E]===Ru&&(C=Math.min(y-M[S],M[S+3]-y,v-M[S+1],M[S+4]-v,T-M[S+2],M[S+5]-T))}else C=Vy(y,v,T,M[S],M[S+1],M[S+2],M[S+3],M[S+4],M[S+5],M[S+6],M[S+7],M[S+8]);C<w&&(w=C)}return w}function g(x,y,v){let T=1/0,w=Mn(x),R=Mn(v);for(let E=0;E<xe&&!((E-1)*sn>=T);E++)for(let S=R-E;S<=R+E;S++){if(S<0||S>=xe)continue;let C=S===R-E||S===R+E||E===0?1:2*E;for(let U=w-E;U<=w+E;U+=C){if(U<0||U>=xe)continue;let D=S*xe+U;if(e[D]===e[D+1])continue;let N=U*sn-_s,W=S*sn-_s,B=Math.max(N-x,0,x-N-sn),K=Math.max(W-v,0,v-W-sn),F=Math.max(0,y-t[D]);Math.sqrt(B*B+F*F+K*K)<T&&(T=_(D,x,y,v,T))}}return T}let p={build:m,clearance:0,update(x,y){let v=g(x.x,x.y,x.z);for(let S=0;S<a.length;S++){let{object:M,radius:C}=a[S];M.visible&&(v=Math.min(v,Math.max(0,x.distanceTo(M.position)-C)))}u.subVectors(y,x).normalize(),d.set(-u.z,0,u.x).normalize(),f.crossVectors(d,u);let T=Math.tan(i.fov*Math.PI/360)*Oy,w=T*i.aspect;for(let S=0;S<c.length;S++){let M=c[S];if(!M.visible)continue;let C=M.matrixWorld.elements,U=C[12]-x.x,D=C[13]-x.y,N=C[14]-x.z,W=U*u.x+D*u.y+N*u.z;if(!(W>0)||W>=v)continue;let B=.5*Math.hypot(Math.hypot(C[0],C[1],C[2]),Math.hypot(C[4],C[5],C[6])),K=Math.abs(U*d.x+N*d.z)-B,F=Math.abs(U*f.x+D*f.y+N*f.z)-B;K<W*w&&F<W*T&&(v=W)}p.clearance=v;let R=Math.min(Ly,Math.max(Py,Iy*v)),E=x.distanceTo(l)+h*(1+By);(R!==i.near||E!==i.far)&&(i.near=R,i.far=E,i.updateProjectionMatrix())}};return p}var Hy=[[560,206],[470,206],[400,206],[330,206],[290,205],[250,201],[215,196.5],[170,194.4],[80,194.2],[10,194.2],[-28,193.2],[-48,190.4],[-60,189.2],[-74,189.4],[-98,191.6],[-140,194.2],[-220,194.4],[-292,194.6],[-340,197.4],[-392,201.2],[-440,204.6],[-490,205.8]],Gy=3,Wy=286,Xy=3,Yy=[[-64,61],[-61,78],[-56,96],[-44,112],[-26,121],[-8,124.5],[14,126],[48,132],[76,146],[86,166],[84,182],[74,189.8],[56,192.4],[34,192.6],[18,192.6],[4,192.6]];function Du(i){let t=[],e=(r,o)=>t.push(new P(r,0,o));for(let[r,o]of Hy)e(r,o);let n=i.length;for(let r=Gy;r<=Wy;r+=Xy){let o=i[r%n];e(o[0],o[1])}for(let[r,o]of Yy)e(r,o);let s=new Js(t,!1,"centripetal",.5);return s.arcLengthDivisions=16e3,s}function ii(i,t,e){let n=i.getLength(),s=0,r=1e9,o=new P;for(let a=0;a<=4e3;a++){i.getPointAt(a/4e3,o);let c=(o.x-t)**2+(o.z-e)**2;c<r&&(r=c,s=a/4e3)}return s*n}function xs(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new ce,l=0;for(let h=0;h<i.length;++h){let u=i[h],d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(e){let h=0,u=[];for(let d=0;d<i.length;++d){let f=i[d].index;for(let m=0;m<f.count;++m)u.push(f.getX(m)+h);h+=i[d].attributes.position.count}c.setIndex(u)}for(let h in r){let u=Uu(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let _=0;_<o[h].length;++_)f.push(o[h][_][d]);let m=Uu(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(m)}}return c}function Uu(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){let h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new Ee(o,e,n),c=0;for(let l=0;l<i.length;++l){let h=i[l];if(h.isInterleavedBufferAttribute){let u=c/e;for(let d=0,f=h.count;d<f;d++)for(let m=0;m<e;m++){let _=h.getComponent(d,m);a.setComponent(d+u,m,_)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}var qy={float32:Float32Array,uint16:Uint16Array,int16:Int16Array,int8:Int8Array};function Nu(i,t,e){let n=qy[t.type];if(!n)throw new Error("ce-mesh/2: unsupported type "+t.type);return new n(i,t.offset,e)}function Zy(i){let t=atob(i.trim()),e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e.buffer}async function Fu(i,t){let e=i.slice(0,i.lastIndexOf("/")+1),n=await(await fetch(i)).json();if(n.format!=="ce-mesh/2")throw new Error(`${i}: expected ce-mesh/2, got ${n.format}`);let s=await fetch(e+n.buffer),r=n.bufferEncoding==="base64"?Zy(await s.text()):await s.arrayBuffer();t&&t({loaded:1,total:2});let o=new ce,a=n.vertexCount;for(let[m,_]of Object.entries(n.attributes)){let g=Nu(r,_,a*_.size);o.setAttribute(m,new Ee(g,_.size,!!_.normalized))}o.setIndex(new Ee(Nu(r,n.index,n.indexCount),1)),n.groups.forEach((m,_)=>o.addGroup(m.start,m.count,_)),o.computeBoundingSphere();let c=new po,l=async(m,_)=>{let g=await c.loadAsync(e+m);return g.flipY=!1,g.wrapS=g.wrapT=Nn,_&&(g.colorSpace=Se),g},h={...n.textures};n.footprint&&(h.footprint=n.footprint.map);let u=Object.keys(h),d=await Promise.all(u.map(m=>l(h[m],m==="map"))),f=Object.fromEntries(u.map((m,_)=>[m,d[_]]));return f.footprint&&(f.footprint.flipY=!0,f.footprint.wrapS=f.footprint.wrapT=Ln),t&&t({loaded:2,total:2}),{geometry:o,groups:n.groups,textures:f,desc:n}}var Ou=.6,$y=.3,Jy=.45,Ky=1,zu=Wt.lights_physical_fragment.replace("texture2D( clearcoatMap, vClearcoatMapUv ).x","texture2D( clearcoatMap, vClearcoatMapUv ).z");if(zu===Wt.lights_physical_fragment)throw new Error("hero car: three.js clearcoat chunk changed; update body-materials.js");function Bu(i,t){return i.normalMap=t.normalMap,i.normalScale.set(Ou,-Ou),i}var Qy={body(i,t){let e={name:"car-body",map:i.map,roughnessMap:i.ormMap,roughness:1,metalness:0};if(t==="low")return Bu(new _t(e),i);let n=new fs({...e,clearcoat:1,clearcoatMap:i.ormMap,clearcoatRoughness:$y,clearcoatRoughnessMap:i.ormMap});return n.onBeforeCompile=s=>{s.fragmentShader=s.fragmentShader.replace("#include <lights_physical_fragment>",zu)},n.customProgramCacheKey=()=>"car-body-clearcoat-b",Bu(n,i)},lights(i){return new _t({name:"car-lights",map:i.map,roughness:.18,metalness:0,emissive:new Nt(16777215),emissiveMap:i.map,emissiveIntensity:Jy})}};function ku(i,t,e){return i.map(n=>{let s=Qy[n.name];if(!s)throw new Error("hero car: no material for body group "+n.name);let r=s(t,e);return r.aoMap=t.ormMap,r.aoMapIntensity=Ky,r})}var jy=15282981,hl="#5b6067",tv="#3a3c40",ev="#b0362c",ul=.41,nv=.69,Vu=.75;function To(i,t,e,{data:n=!1,clamp:s=!1}={}){let r=document.createElement("canvas");r.width=i,r.height=t,e(r.getContext("2d"),i,t);let o=new ni(r);return n||(o.colorSpace=Se),s||(o.wrapS=Nn),o}function Eo(i){let t=i>>>0;return()=>(t=t*1664525+1013904223>>>0)/4294967296}function iv(i){let{beadIn:n,sideIn:s,treadIn:r,treadOut:o,sideOut:a,beadOut:c}=i,l=f=>(1-f)*128,h=(f,m,_,g,p,x)=>{let y=w=>l(m+(_-m)*w);if(f.fillStyle=x(1),f.fillRect(0,Math.min(y(.06),y(.16)),1024,Math.abs(y(.16)-y(.06))),f.fillRect(0,Math.min(y(.3),y(.33)),1024,Math.max(1,Math.abs(y(.33)-y(.3)))),f.fillRect(0,Math.min(y(.85),y(.88)),1024,Math.max(1,Math.abs(y(.88)-y(.85)))),!g)return;let v=Math.min(y(.42),y(.72)),T=Math.abs(y(.72)-y(.42));for(let w of[.06,.56]){let R=w*1024,E=(w+.3)*1024;for(;R<E;){let S=6+p()*14;p()>.18&&f.fillRect(R,v+T*.1,S,T*(.6+p()*.3)),R+=S+3+(p()>.8?12:0)}}},u=To(1024,128,f=>{f.fillStyle="#000",f.fillRect(0,0,1024,128);let m=Eo(7),_=()=>"#fff";h(f,n,s,!1,m,_),h(f,c,a,!0,m,_)},{data:!0});return{color:To(1024,128,f=>{f.fillStyle="#1c1c1e",f.fillRect(0,0,1024,128);let m=Eo(11);for(let p=0;p<160;p++){let x=r+(o-r)*m();f.fillStyle=`rgba(70,68,66,${.05+m()*.08})`,f.fillRect(m()*1024,l(x),40+m()*200,1)}let _=Eo(7),g=p=>()=>`rgba(128,128,130,${p})`;h(f,n,s,!1,_,g(.12)),h(f,c,a,!0,_,g(.16))}),height:u}}function sv(i){return To(512,512,(t,e)=>{let n=e/2;t.fillStyle="#b4b4b2",t.fillRect(0,0,e,e);let s=Eo(3);for(let a=0;a<40;a++)t.strokeStyle=`rgba(${s()>.5?"255,255,255":"60,60,60"},${.05+s()*.1})`,t.lineWidth=1,t.beginPath(),t.arc(n,n,n*(i+(1-i)*s()),0,Math.PI*2),t.stroke();t.strokeStyle="rgba(28,28,28,0.9)",t.lineWidth=4;let r=n*(i+.12),o=n*.95;for(let a=0;a<36;a++){let c=a/36*Math.PI*2;t.beginPath();for(let l=0;l<=8;l++){let h=l/8,u=r+(o-r)*h,d=c+h*.35;l?t.lineTo(n+u*Math.cos(d),n+u*Math.sin(d)):t.moveTo(n+u*Math.cos(d),n+u*Math.sin(d))}t.stroke()}},{clamp:!0})}function rv(i){return To(256,256,(t,e)=>{let n=e/2,s=(c,l,h)=>{t.fillStyle=h,t.beginPath(),t.arc(n,n,l*n,0,Math.PI*2),t.arc(n,n,c*n,0,Math.PI*2,!0),t.fill()};s(.86,1,hl),s(.4,.86,tv),s(0,.4,hl),s(.97,1,"#2a2c30");let[r,o,a]=i;t.fillStyle=ev,t.beginPath(),t.arc(n,n,o*n,-a/2,a/2),t.arc(n,n,r*n,a/2,-a/2,!0),t.fill(),t.fillStyle="#9a9fa6",t.beginPath(),t.arc(n,n,.18*n,0,Math.PI*2),t.fill()},{clamp:!0})}function ov(i,t,e){let n=t/2,s=[[e+.01,-n+.018],[e+.026,-n-.004],[i-.09,-n-.012],[i-.035,-n-.006],[i-.008,-n+.02],[i,-n+.055],[i+.002,0],[i,n-.055],[i-.008,n-.02],[i-.035,n+.006],[i-.09,n+.012],[e+.026,n+.004],[e+.01,n-.018]],r=new ls(s.map(([c,l])=>new j(c,l))).getPoints(40),o=c=>c/(s.length-1),a=new hs(r,56);return a.rotateX(Math.PI/2),{geometry:a,profileV:{beadIn:o(0),sideIn:o(3),treadIn:o(5),treadOut:o(7),sideOut:o(9),beadOut:o(12)}}}function av(i,t=10){let e=new vn;e.absarc(0,0,i,0,Math.PI*2,!1);let n=i*.86,s=i*.32,r=Math.PI*2/t;for(let a=0;a<t;a++){let c=a*r+r*.17,l=(a+1)*r-r*.17,h=new _i;h.moveTo(Math.cos(c)*s*1.25,Math.sin(c)*s*1.25),h.absarc(0,0,n,c+.04,l-.04,!1),h.lineTo(Math.cos(l)*s*1.25,Math.sin(l)*s*1.25),h.closePath(),e.holes.push(h)}let o=new tr(e,{depth:.035,bevelEnabled:!0,bevelThickness:.008,bevelSize:.006,bevelSegments:1,curveSegments:20});return o.translate(0,0,-.035),o}function cv(i,t){let e=-t*.45,n=t/2-.03,s=[new j(i*.97,e),new j(i*.99,e+.01),new j(i*.99,n-.02),new j(i*1.03,n-.006),new j(i*1.035,n),new j(i*1,n+.004)],r=new hs(s,56);return r.rotateX(Math.PI/2),r}function lv(i,t,e){let n=e/2,s=new nr(i,t,64).translate(0,0,n),r=new nr(i,t,64).rotateY(Math.PI).translate(0,0,-n),o=new te(t,t,e,64,1,!0).rotateX(Math.PI/2),a=xs([s,r,o]);return s.dispose(),r.dispose(),o.dispose(),a}function hv(i,t,e,n){let s=new vn;s.absarc(0,0,t,-e/2,e/2,!1),s.absarc(0,0,i,e/2,-e/2,!0),s.closePath();let r=new tr(s,{depth:n,bevelEnabled:!0,bevelThickness:.008,bevelSize:.008,bevelSegments:2,curveSegments:16});return r.translate(0,0,-n/2),r}function uv(i,t){return{rubber:new _t({name:"tyre",color:16777215,map:i.color,bumpMap:i.height,bumpScale:2.5,roughness:.9,metalness:0}),rim:new _t({name:"rim",color:hl,roughness:.36,metalness:1}),barrel:new _t({name:"rim-barrel",color:4079942,roughness:.38,metalness:1,side:me}),nut:new _t({name:"wheel-nut",color:12896718,roughness:.22,metalness:1}),disc:new _t({name:"brake-disc",color:9146002,map:sv(.45/.82),roughness:.42,metalness:1}),bell:new _t({name:"disc-bell",color:2960945,roughness:.5,metalness:.6}),caliper:new _t({name:"caliper",color:jy,roughness:.35,metalness:0}),dark:new de({name:"wheel-backing",color:328966}),well:new _t({name:"wheel-well",color:855310,roughness:.95,metalness:0,side:me}),blur:new _t({name:"wheel-blur",map:rv(t),transparent:!0,opacity:0,roughness:.35,metalness:.75,depthWrite:!1})}}function fv(i,t,e){return(e?1:-1)*(i/t)}var dv=["FL","FR","RL","RR"],Hu=.55;function pv(i,t,e=0){return dv.map(n=>{let s=n[0]==="F",r=n[1]==="L",o=s!==r;return{key:n,front:s,left:r,r:i[n].r,centre:new P(i[n].x,i[n].r+e,(r?-1:1)*t),scale:i[n].r/ul,caliperTurn:new Vt().makeRotationZ(o?Hu:Math.PI-Hu)}})}var Gu=new Ie,Wu=new Ie,mv=new Ie().setFromAxisAngle(new P(0,1,0),Math.PI),ar=new Ie,ll=new P,gv=new P(0,1,0),_v=new P(0,0,1);function xv(i,t,e,n,s){Gu.setFromAxisAngle(gv,i.front?e:0),ar.copy(Gu),i.left&&ar.multiply(mv),ll.setScalar(i.scale),s.compose(i.centre,ar,ll),Wu.setFromAxisAngle(_v,fv(t,i.r,i.left)),ar.multiply(Wu),n.compose(i.centre,ar,ll)}function Xu({layout:i,width:t,centreZ:e,centreY:n=0}){let s=ul*nv,r=t/2,o=s*.985,a=r-.13,c=s*.82,l=c-.06,h=c+.022,{geometry:u,profileV:d}=ov(ul,t,s),f=uv(iv(d),[l/o,h/o,Vu]),m=av(o).translate(0,0,r-.045),_=cv(s,t),g=new te(.05,.058,.06,6).rotateX(Math.PI/2).translate(0,0,r-.02),p=lv(s*.45,c,.032).translate(0,0,a),x=new te(s*.45,s*.45,.05,32,1,!1).rotateX(Math.PI/2).translate(0,0,a+.04),y=new On(s*.99,40).translate(0,0,r-.2),v=hv(l,h,Vu,.068).translate(0,0,a-.006),T=new On(o,48).translate(0,0,r-.028),w=new Qt;w.name="wheels";let R=(B,K,F,{rolling:st=!0,castShadow:ht=!1,receiveShadow:Y=!1}={})=>{let Q=new Ye(K,F,4);return Q.name="wheel-"+B,Q.castShadow=ht,Q.receiveShadow=Y,Q.userData.rolling=st,w.add(Q),Q},E=[R("tyre",u,f.rubber,{castShadow:!0,receiveShadow:!0}),R("rim",m,f.rim,{castShadow:!0,receiveShadow:!0}),R("barrel",_,f.barrel),R("nut",g,f.nut),R("disc",p,f.disc),R("bell",x,f.bell),R("backing",y,f.dark)],S=R("caliper",v,f.caliper,{rolling:!1}),M=R("blur",T,f.blur,{rolling:!1});M.renderOrder=3;let C=pv(i,e,n),U=Object.fromEntries(C.map(B=>[B.key,B.r])),D=new Vt,N=new Vt;function W(B,K){for(let F=0;F<4;F++){xv(C[F],B,K,N,D);for(let st of E)st.setMatrixAt(F,N);D.multiply(C[F].caliperTurn),S.setMatrixAt(F,D),M.setMatrixAt(F,D)}for(let F of w.children)F.instanceMatrix.needsUpdate=!0}W(0,0);for(let B of w.children)B.computeBoundingSphere();return{group:w,materials:f,radius:U,wheels:C,update:W}}var yv=.34,vv=.86,dl=.03,pl=.012,qu=.006,Mv=.9,Yu=4,Sv=14,fl=.49,bv=.95;async function wv(i,t,e){let{geometry:n,groups:s,textures:r,desc:o}=await Fu(i,e),a=new ct(n,ku(s,r,t));a.name=o.name,o.positionTransform&&(a.position.fromArray(o.positionTransform.offset),a.scale.setScalar(o.positionTransform.scale)),a.castShadow=a.receiveShadow=!0;let c=new Qt;return c.add(a),c.userData.footprint=r.footprint,c.userData.footprintSize=o.footprint.size,c.userData.lowPoints=o.lowPoints||null,c}function Av(i,t){let e=[];for(let s of["FL","FR","RL","RR"]){let{x:r,y:o,r:a}=i[s],c=s[1]==="R"?1:-1,l=bv-fl;e.push(new te(a*1.07,a*1.07,l,40,1,!0,Math.PI*.42,Math.PI*1.16).rotateX(Math.PI/2).translate(r,o,c*(fl+l/2)));let h=new On(a*1.07,40,-Math.PI*.08,Math.PI*1.16);e.push(h.translate(r,o,c*fl))}let n=new ct(xs(e),t);n.name="wheel-wells";for(let s of e)s.dispose();return n}function Ev(i,[t,e]){let n=new de({name:"car-ground-occlusion",color:0,alphaMap:i,transparent:!0,opacity:Mv,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4}),s=new ct(new oe(t,e).rotateX(-Math.PI/2),n);return s.name="ground-occlusion",s.position.y=dl+qu,s.renderOrder=1,s.userData.noMask=!0,s}function Tv(i){if(!i)return null;let t=new Float64Array(i.length*3);return i.forEach(([e,n,s],r)=>t.set([e,n-pl,s],r*3)),t}async function Zu(i,t,{onProgress:e,quality:n="high"}={}){let s=t.body?i.slice(0,i.lastIndexOf("/")+1)+t.body:i,r=await wv(s,n,e),o=new Qt;o.name="hero-car";let a=new Qt;a.position.y=dl-pl,o.add(a),a.add(r);let c=Xu({layout:t,width:yv,centreZ:vv}),l=c.materials;c.group.position.y=a.position.y,o.add(c.group),a.add(Av(t,l.well));let h=Ev(r.userData.footprint,r.userData.footprintSize);return o.add(h),{root:o,chassis:a,body:r,wheels:c,lowPoints:Tv(r.userData.lowPoints),contacts:c.wheels.map(u=>[u.centre.x,u.centre.z]),pose({dist:u=0,steer:d=0,pitch:f=0,roll:m=0,heave:_=0,speed:g=0,road:p=dl}={}){l.blur.opacity=Math.min(1,Math.max(0,(g-Yu)/(Sv-Yu))),l.blur.visible=l.blur.opacity>.01,c.update(u,d);let x=p-pl;c.group.position.y=x,a.rotation.set(m,0,f),a.position.y=x+_,h.position.y=p+qu}}}var ml=.6,$u=1.2,Rv=.3;function Ju(i,t,e,n){i.updateMatrixWorld(!0);let s=[],r=p=>!p.transparent&&p.depthWrite;i.traverse(p=>{if(!p.isMesh||p.isInstancedMesh||!(Array.isArray(p.material)?p.material.every(r):r(p.material)))return;let x=new Ke().setFromObject(p);x.max.y-x.min.y<Rv&&x.min.y<ml&&x.max.y>ml-$u&&s.push({node:p,box:x})}),s.sort((p,x)=>x.box.max.y-p.box.max.y);let o=Float64Array.from(new Set(e)).sort(),a=new Float64Array(o.length),c=new yo;c.far=$u;let l=new P(0,-1,0),h=new P,u=new P,d=[],f=new Float64Array(n.length);function m(){let p=-1/0;for(let{node:x,box:y}of s){if(y.max.y<p)break;h.x<y.min.x||h.x>y.max.x||h.z<y.min.z||h.z>y.max.z||(d.length=0,c.intersectObject(x,!1,d),d.length&&(p=Math.max(p,d[0].point.y)))}return Number.isFinite(p)?p:NaN}for(let p=0;p<o.length;p++){let{p:x,t:y}=t.sample(o[p]);u.set(-y.z,0,y.x).normalize(),n.forEach(([w,R],E)=>{h.set(x.x,0,x.z).addScaledVector(y,w).addScaledVector(u,R),h.y=ml,c.set(h,l),f[E]=m()});let v=Array.from(f).filter(Number.isFinite).sort((w,R)=>w-R),T=v.length>>1;a[p]=v.length?v.length%2?v[T]:(v[T-1]+v[T])/2:NaN}let _=a.findIndex(Number.isFinite);for(let p=0;p<a.length;p++)Number.isFinite(a[p])||(a[p]=_<0?0:a[p?p-1:_]);function g(p){let x=o.length;if(p<=o[0])return a[0];if(p>=o[x-1])return a[x-1];let y=0,v=x-1;for(;v-y>1;){let w=y+v>>1;o[w]<=p?y=w:v=w}let T=(p-o[y])/(o[v]-o[y]);return a[y]+(a[v]-a[y])*T}return{heightAt:g,samples:o,heights:a}}var Cv=new P(0,1,0),Iv=120,cr=2.5,Ro=.05,Pv=2.563,Lo=.5,Lv=1.2,Dv=.25,Uv=6,Ku=85,Qu=40,ju=12,tf=15,Nv=.0012,Fv=.0019,Co=.016,Io=.028,Ov=4e-4,Bv=.0015,zv=7.3,ef=.006,nf=.003,kv=.02,Vv=.001,Hv=9,Gv=7,Wv=6,Xv=12,Yv=.001;function rf(i,t){return{intro:0,arrival:ii(i,330,206),pitBox:ii(i,-60,189.2),pitExit:ii(i,-392,201.2),lapStart:ii(i,t[6][0],t[6][1]),lapEnd:ii(i,t[96][0],t[96][1]),paddock:ii(i,-8,124.5),goldenHour:ii(i,18,192.6)}}function gl(i){return[[0,i.arrival],[.085,i.arrival+4],[.2,i.pitBox],[.315,i.pitBox+.3],[.34,i.pitBox+40],[.425,i.lapStart],[.56,i.lapEnd],[.665,i.paddock],[.79,i.paddock+1.5],[.885,i.goldenHour],[1,i.goldenHour+3]]}function of(i){let t=i.map(s=>s[0]),e=i.map(s=>s[1]),n=i.map((s,r)=>or(t,e,r));return s=>{let r=zt(s,0,1),o=0;for(;o<i.length-2&&r>t[o+1];)o++;return wo(t[o],t[o+1],e[o],e[o+1],n[o],n[o+1],r)}}function af(i,t,e){return Qe(e.arrival-Iv,i,1-Math.pow(1-zt(t,0,1),3))}function cf(i){let t=i.getLength(),e={p:new P,t:new P},n=new P,s=new P,r=new P,o=(h,u)=>i.getPointAt(zt(h/t,0,1),u);function a(h,u){let d=zt(h,Ro,t-Ro);return o(d-Ro,n),o(d+Ro,u),u.sub(n).normalize()}function c(h){return o(h,e.p),a(h,e.t),e}function l(h){let u=zt(h,cr,t-cr);o(u-cr,n),o(u,s),o(u+cr,r);let d=Math.atan2(s.z-n.z,s.x-n.x),f=Math.atan2(r.z-s.z,r.x-s.x);return Math.atan2(Math.sin(f-d),Math.cos(f-d))/cr}return{length:t,sample:c,curvatureAt:l}}var qv=(i,t,e,n)=>i+(t-i)*(1-Math.exp(-n*e));function Po(i,t,e,n){let s=i.x-t,r=i.v+e*s,o=Math.exp(-e*n);return i.x=t+(s+r*n)*o,i.v=(i.v-e*r*n)*o,i.x}function sf(i,t,e){let n=e<0?-1:1,s=Lv+Dv*Math.abs(e);return zt(-Math.atan(Pv*i.curvatureAt(t+n*s)),-Lo,Lo)}function Zv(i,t,e,n){if(!i)return 1;let s=1;for(let r=0;r<i.length;r+=3){let o=-(i[r]*t-i[r+2]*e+n);if(o<=0)continue;let a=i[r+1]-kv-Vv;s=Math.min(s,a>0?a/o:0)}return s}function lf(i,t,e,{roadHeight:n=null}={}){let s=e,r=!0,o=0,a=0,c=!1,l={x:0,v:0},h={x:0,v:0},u={x:0,v:0},d={x:0,v:0},f=i.lowPoints||null,m={dist:0,steer:0,pitch:0,roll:0,heave:0,speed:0,road:void 0},_={p:new P,f:new P,r:new P};function g(x){c||(o=0),a=o,l.x=sf(t,x,0),l.v=h.x=h.v=u.x=u.v=d.x=d.v=0}let p={get lastDistance(){return s},set lastDistance(x){s=x,r=!0},wheelDistance:e,get speed(){return o},set speed(x){o=x,c=!0},get prevSpeed(){return a},set prevSpeed(x){a=x},accel:0,lateral:0,get steer(){return m.steer},get pitch(){return m.pitch},get roll(){return m.roll},get heave(){return m.heave},frame:_,update(x,y){let v=x-s;if(s=x,r||!(y>Yv))r=!1,g(x),p.accel=p.lateral=0;else{let R=zt(v/y,-Ku,Ku);a=o,o=zt(qv(o,R,Uv,y),o-Qu*y,o+Qu*y),p.accel=zt((o-a)/y,-ju,ju),p.lateral=zt(o*o*t.curvatureAt(x),-tf,tf),Po(l,sf(t,x,o),Hv,y),Po(u,zt(-Fv*p.lateral,-Io,Io),Wv,y),Po(h,zt(Nv*p.accel,-Co,Co),Gv,y);let E=Math.abs(p.accel)+Math.abs(p.lateral),S=Bv*Math.sin(x/zv*Math.PI*2)*Math.min(1,Math.abs(o)/20);Po(d,zt(S-Ov*E,-ef,nf),Xv,y),l.x=zt(l.x,-Lo,Lo),u.x=zt(u.x,-Io,Io),h.x=zt(h.x,-Co,Co),d.x=zt(d.x,-ef,nf)}c=!1,p.wheelDistance=x;let T=t.sample(x);_.p.copy(T.p),_.f.copy(T.t).setY(0).normalize(),_.r.crossVectors(_.f,Cv).normalize(),i.root.position.copy(T.p),i.root.rotation.y=Math.atan2(-T.t.z,T.t.x);let w=Zv(f,h.x,u.x,d.x);m.dist=x,m.steer=l.x,m.pitch=h.x*w,m.roll=u.x*w,m.heave=d.x*w,m.speed=Math.abs(o),n&&(m.road=n(x)),i.pose(m)}};return p}function Sn(i=1){let t=i>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}var Si=new Uint8Array(512);{let i=Sn(7),t=[...Array(256).keys()];for(let e=255;e>0;e--){let n=Math.floor(i()*(e+1));[t[e],t[n]]=[t[n],t[e]]}for(let e=0;e<512;e++)Si[e]=t[e&255]}var hf=i=>i*i*i*(i*(i*6-15)+10),Do=(i,t,e)=>(i&1?-t:t)+(i&2?-e:e);function $v(i,t){let e=Math.floor(i)&255,n=Math.floor(t)&255;i-=Math.floor(i),t-=Math.floor(t);let s=hf(i),r=hf(t),o=Si[e]+n,a=Si[e+1]+n,c=(l,h,u)=>l+(h-l)*u;return c(c(Do(Si[o],i,t),Do(Si[a],i-1,t),s),c(Do(Si[o+1],i,t-1),Do(Si[a+1],i-1,t-1),s),r)}function pn(i,t,e=4){let n=.5,s=1,r=0;for(let o=0;o<e;o++)r+=n*$v(i*s,t*s),n*=.5,s*=2.03;return r}function rn(i,t,e,{repeat:n=!0,srgb:s=!0,aniso:r=8}={}){let o=document.createElement("canvas");o.width=i,o.height=t;let a=o.getContext("2d");e(a,i,t);let c=new ni(o);return n&&(c.wrapS=c.wrapT=Nn),s&&(c.colorSpace=Se),c.anisotropy=r,c}function uf(){return rn(512,512,(i,t,e)=>{i.fillStyle="#55585e",i.fillRect(0,0,t,e);let n=i.getImageData(0,0,t,e),s=n.data,r=Sn(3);for(let o=0;o<s.length;o+=4){let a=o/4%t,c=Math.floor(o/4/t),l=pn(a/60,c/60,3)*14+(r()-.5)*30;s[o]+=l,s[o+1]+=l,s[o+2]+=l+1}i.putImageData(n,0,0)})}function ff(){return rn(512,512,(i,t,e)=>{let n=i.createImageData(t,e),s=n.data,r=Sn(11);for(let o=0;o<e;o++)for(let a=0;a<t;a++){let c=(o*t+a)*4,l=pn(a/90,o/90,4),h=(r()-.5)*14;s[c]=196+l*40+h,s[c+1]=210+l*40+h,s[c+2]=186+l*30+h*.6,s[c+3]=255}i.putImageData(n,0,0)})}function df(){return rn(256,256,(i,t,e)=>{i.fillStyle="#d6c6a2",i.fillRect(0,0,t,e);let n=Sn(5);for(let s=0;s<2600;s++){let r=n()*2.4+.6,o=160+n()*80;i.fillStyle=`rgb(${o},${o*.93},${o*.8})`,i.beginPath(),i.arc(n()*t,n()*e,r,0,Math.PI*2),i.fill()}})}function pf(){return rn(128,512,(i,t,e)=>{for(let n=0;n<4;n++)i.fillStyle=n%2?"#f2f2ee":"#2a63c9",i.fillRect(0,n*e/4,t,e/4);i.fillStyle="rgba(0,0,0,.08)",i.fillRect(0,0,12,e)})}function mf(){return rn(512,128,(i,t,e)=>{for(let n=0;n<8;n++)i.fillStyle=n%2?"#f3efe8":"#e8742a",i.fillRect(n*t/8,0,t/8,e);i.fillStyle="rgba(0,0,0,.18)",i.fillRect(0,e-16,t,16)})}function gf(i=1){return rn(256,128,(t,e,n)=>{let s=Sn(i);for(let r=0;r<26;r++){let o=e*(.18+s()*.64),a=n*(.45+(s()-.5)*.35),c=18+s()*34,l=t.createRadialGradient(o,a,0,o,a,c);l.addColorStop(0,"rgba(255,255,255,.55)"),l.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=l,t.beginPath(),t.arc(o,a,c,0,Math.PI*2),t.fill()}},{repeat:!1})}function _f(){return rn(128,128,(i,t,e)=>{let n=i.createRadialGradient(t/2,e/2,4,t/2,e/2,t/2);n.addColorStop(0,"rgba(0,0,0,.55)"),n.addColorStop(.6,"rgba(0,0,0,.22)"),n.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=n,i.fillRect(0,0,t,e)},{repeat:!1,srgb:!1})}function Uo(i=256,t=128,{hx:e=.36,hy:n=.27,rr:s=.12,fade:r=.13,core:o=.45,alpha:a=.8}={}){return rn(i,t,c=>{let l=c.createImageData(i,t),h=l.data;for(let u=0;u<t;u++)for(let d=0;d<i;d++){let f=Math.abs(d/(i-1)-.5),m=Math.abs(u/(t-1)-.5),_=f-(e-s),g=m-(n-s),p=Math.hypot(Math.max(_,0),Math.max(g,0))+Math.min(Math.max(_,g),0)-s,x=Math.min(1,Math.max(0,1-(p+r*.3)/r));x=x*x*(3-2*x);let y=1-o*Math.min(1,Math.hypot(f/(e+r),m/(n+r))),v=(u*i+d)*4;h[v]=h[v+1]=h[v+2]=0,h[v+3]=Math.round(255*a*x*y)}c.putImageData(l,0,0)},{repeat:!1,srgb:!1})}function xf(){return rn(4,128,(i,t,e)=>{let n=i.createLinearGradient(0,0,0,e);n.addColorStop(0,"rgba(0,0,0,.5)"),n.addColorStop(.35,"rgba(0,0,0,.2)"),n.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=n,i.fillRect(0,0,t,e)},{repeat:!1,srgb:!1,aniso:1})}function yf(){return rn(64,256,(i,t,e)=>{i.fillStyle="#cfd3d6",i.fillRect(0,0,t,e);for(let n=0;n<e;n+=8){let s=i.createLinearGradient(0,n,0,n+8);s.addColorStop(0,"rgba(255,255,255,.55)"),s.addColorStop(.45,"rgba(255,255,255,0)"),s.addColorStop(.8,"rgba(0,0,0,.10)"),s.addColorStop(1,"rgba(0,0,0,.28)"),i.fillStyle=s,i.fillRect(0,n,t,8)}})}function vf(){return rn(256,128,(i,t,e)=>{let n=i.createLinearGradient(0,0,0,e);n.addColorStop(0,"#9fb3bf"),n.addColorStop(.55,"#6e8592"),n.addColorStop(1,"#4b5d68"),i.fillStyle=n,i.fillRect(0,0,t,e),i.fillStyle="rgba(245,243,238,.85)";for(let s=0;s<t;s+=32)i.fillRect(s,0,3,e);i.fillRect(0,e*.62,t,2),i.fillStyle="rgba(255,255,255,.08)";for(let s=0;s<t;s+=32)i.beginPath(),i.moveTo(s+6,e),i.lineTo(s+18,0),i.lineTo(s+26,0),i.lineTo(s+14,e),i.fill()})}function Mf(){return rn(128,128,(i,t,e)=>{let n=Sn(21);for(let s=0;s<70;s++){let r=t*(.1+n()*.8),o=e*(.35+n()*.6),a=(n()-.5)*26,c=70+n()*60;i.strokeStyle=`rgba(${c*.8},${c},${c*.55},1)`,i.lineWidth=1.4+n()*1.6,i.beginPath(),i.moveTo(r,e),i.quadraticCurveTo(r+a*.3,e-o*.6,r+a,e-o),i.stroke()}},{repeat:!1})}var Sf=null,_l=()=>Sf||(Sf=new de({map:Uo(256,128,{alpha:.75}),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})),wf=(i,t,e)=>{let n=new ct(new xi(i,t,6,12),e);return n.castShadow=!0,n},Jv=16118766,Kv=1842721,Qv=15282981;function bf(i,t){let e=new ct(new He(.15,20,16),new _t({color:Jv,roughness:.25,metalness:.1}));e.castShadow=!0,i.add(e);let n=new ct(new He(t,20,10,-.9,1.8,1.25,.5),new _t({color:Kv,roughness:.1,metalness:.6}));i.add(n);let s=new ct(new us(.12,.012,6,24,Math.PI),new _t({color:Qv,roughness:.5}));s.rotation.y=Math.PI/2,s.position.y=.03,i.add(s)}function jv(i,t,e){let n=new ct(new He(.12,18,14),t);n.castShadow=!0,i.add(n);let s=new ct(new He(.125,18,8,0,Math.PI*2,0,1.3),e);s.position.y=.02,i.add(s);let r=new ct(new te(.08,.08,.015,16,1,!1,-1.2,2.4),e);r.position.set(.08,.02,0),i.add(r)}function No(i,t,e){let n=new Qt,s=wf(i,t,e);return s.position.y=-t/2-i,n.add(s),n}function bi({suit:i=15282981,trim:t=1842721,skin:e=13081468,helmet:n=!1,pose:s="stand"}={}){let r=new Qt,o=new _t({color:i,roughness:.7}),a=new _t({color:t,roughness:.8}),c=new _t({color:e,roughness:.8}),l=new Qt;r.add(l);let h=wf(.17,.42,o);h.position.y=.32,l.add(h);let u=new ct(new te(.175,.175,.07,16),a);u.position.y=.06,l.add(u);let d=new Qt;d.position.y=.78,l.add(d),n?bf(d,.151):jv(d,c,a);let f=No(.055,.5,o),m=No(.055,.5,o);f.position.set(0,.58,.22),m.position.set(0,.58,-.22),l.add(f,m);for(let x of[f,m]){let y=new ct(new He(.05,10,8),c);y.position.y=-.68,x.add(y)}let _=No(.075,.7,o),g=No(.075,.7,o);_.position.set(0,0,.1),g.position.set(0,0,-.1),l.add(_,g);for(let x of[_,g]){let y=new ct(new _e(.24,.08,.1),a);y.position.set(.05,-.9,0),x.add(y)}if(l.position.y=.97,s==="kneel")l.position.y=.55,l.rotation.z=-.25,_.rotation.z=1.45,g.rotation.z=.2,g.position.x=-.05,f.rotation.z=1.1,m.rotation.z=.9,m.rotation.x=.2;else if(s==="helmet")f.rotation.z=2.3,m.rotation.z=2.3,f.rotation.x=-.35,m.rotation.x=.35;else if(s==="carryHelmet"){m.rotation.z=.55,m.rotation.x=.12,f.rotation.x=-.08;let x=new Qt;bf(x,.152),x.position.set(.1,-.78,0),x.rotation.z=-.5,m.add(x)}else f.rotation.x=-.1,m.rotation.x=.1;let p=new ct(new oe(1.1,1.1),_l());return p.rotation.x=-Math.PI/2,p.position.y=.055,p.renderOrder=1,r.add(p),r.userData={hip:l,armL:f,armR:m,head:d},r}function xl(i,t,e,n=56,s=36){let r=[],o=[];for(let c=0;c<=n;c++){let l=i+(t-i)*c/n,h=e(l),u=(h.top+h.bottom)/2,d=Math.max(.001,(h.top-h.bottom)/2);for(let f=0;f<=s;f++){let m=-Math.PI/2+Math.PI*2*f/s,_=Math.cos(m),g=Math.sin(m),p=g>=0,x=p?u+d*Math.pow(Math.abs(g),2/h.upperExponent):u-d*Math.pow(Math.abs(g),2/h.lowerExponent),y=h.halfWidth*Math.sign(_)*Math.pow(Math.abs(_),2/(p?h.upperExponent:h.lowerExponent))*(p?1-(h.tumblehome||0)*g*g:1);r.push(l,x,y)}}for(let c=0;c<n;c++)for(let l=0;l<s;l++){let h=c*(s+1)+l,u=h+s+1;o.push(h,u,h+1,h+1,u,u+1)}let a=new ce;return a.setAttribute("position",new Bt(r,3)),a.setIndex(o),a.computeVertexNormals(),a}var Ef={classic:{length:4.25,wheelbase:2.4,wheelRadius:.31,trackWidth:1.34,tyreWidth:.19,chrome:!0,top:[[-2.13,.56],[-2.05,.7],[-1.7,.8],[-1,.84],[-.3,.86],[.2,.84],[.9,.8],[1.6,.74],[2,.63],[2.13,.5]],sill:[[-2.13,.44],[-2,.3],[-1.6,.22],[1.6,.22],[2,.3],[2.13,.42]],halfWidth:[[-2.13,.5],[-2,.74],[-1.6,.81],[-1.2,.83],[0,.79],[1.2,.83],[1.7,.8],[2.05,.66],[2.13,.44]],upperExponent:2.4,lowerExponent:5,tumblehome:.1,cabin:{x0:-1.05,x1:.6,roof:[[-1.05,.84],[-.62,1.1],[-.15,1.19],[.2,1.17],[.6,.86]],belt:.8,halfWidth:[[-1.05,.6],[-.3,.67],[.3,.67],[.6,.62]]}},gt:{length:4.6,wheelbase:2.7,wheelRadius:.34,trackWidth:1.62,tyreWidth:.3,rearWing:[-2.02,1.3,1.8],top:[[-2.3,.78],[-2.1,.88],[-1.5,.93],[-.8,.9],[0,.86],[.8,.8],[1.5,.7],[2,.57],[2.3,.38]],sill:[[-2.3,.5],[-2.15,.3],[-1.8,.13],[1.8,.13],[2.2,.15],[2.3,.2]],halfWidth:[[-2.3,.8],[-2,.97],[-1.35,1],[-.5,.9],[.5,.88],[1.35,.99],[2,.93],[2.3,.7]],upperExponent:3,lowerExponent:6,tumblehome:.16,cabin:{x0:-1.25,x1:.78,roof:[[-1.25,.9],[-.7,1.19],[-.1,1.24],[.28,1.2],[.78,.84]],belt:.84,halfWidth:[[-1.25,.6],[-.4,.68],[.3,.66],[.78,.58]]}},proto:{length:4.75,wheelbase:2.9,wheelRadius:.35,trackWidth:1.64,tyreWidth:.32,rearWing:[-2.2,1.02,1.9],sharkFin:!0,top:[[-2.37,.8],[-2.2,.92],[-1.7,.95],[-1.2,.9],[-.6,.82],[0,.74],[.8,.7],[1.6,.64],[2.1,.5],[2.37,.3]],sill:[[-2.37,.5],[-2.2,.25],[-1.8,.1],[1.9,.1],[2.37,.15]],halfWidth:[[-2.37,.9],[-2.1,1],[-1.45,1],[-.8,.9],[0,.93],[.8,.93],[1.45,1],[2.1,.95],[2.37,.74]],upperExponent:3.2,lowerExponent:6,tumblehome:.2,cabin:{x0:-1.05,x1:.8,roof:[[-1.05,.8],[-.5,1.08],[0,1.13],[.4,1.07],[.8,.72]],belt:.74,halfWidth:[[-1.05,.38],[-.3,.5],[.3,.5],[.8,.36]]}}},Af={},wi=(i,t)=>Af[i]||(Af[i]=t());function tM(i){let t=wi("glass",()=>new _t({color:2766400,roughness:.05,metalness:.85,envMapIntensity:1.6})),e=wi("dark",()=>new _t({color:789775,roughness:.8,side:me})),n=wi("carbon",()=>new _t({color:1711135,roughness:.45,metalness:.4})),s=wi("chrome",()=>new _t({color:14804456,roughness:.14,metalness:1})),r=wi("lamp",()=>new _t({color:16184038,roughness:.15,metalness:.2,emissive:6972501,emissiveIntensity:.3})),o=wi("tyre",()=>new _t({color:1513498,roughness:.92})),a=i?s:wi("rim",()=>new _t({color:2764081,roughness:.32,metalness:.85}));return{glass:t,dark:e,carbon:n,chrome:s,lamp:r,tyre:o,rim:a}}function eM(i,t){let e=Ef[i],n=new Qt,s=new fs({color:t,roughness:.32,metalness:e.chrome?.2:.35,clearcoat:.8,clearcoatRoughness:.14}),r=tM(e.chrome),o=[e.wheelbase/2,-e.wheelbase/2],a=e.wheelRadius+.07,c=gs(e.top),l=gs(e.sill),h=gs(e.halfWidth),u=M=>{let C=-1;for(let U of o){let D=Math.abs(M-U);D<a&&(C=Math.max(C,e.wheelRadius+Math.sqrt(a*a-D*D)*.97))}return C},d=xl(e.top[0][0],e.top[e.top.length-1][0],M=>({top:c(M),bottom:Math.min(c(M)-.08,Math.max(l(M),u(M))),halfWidth:h(M),upperExponent:e.upperExponent,lowerExponent:e.lowerExponent,tumblehome:e.tumblehome}),90,40),f=new ct(d,s);f.castShadow=!0,f.receiveShadow=!0,n.add(f);let m=e.cabin,_=gs(m.roof),g=gs(m.halfWidth),p=xl(m.x0,m.x1,M=>({top:_(M),bottom:m.belt-.03,halfWidth:g(M),upperExponent:2.3,lowerExponent:8,tumblehome:.1}),40,32),x=new ct(p,r.glass);x.castShadow=!0,n.add(x);let y=m.x0+(m.x1-m.x0)*.17,v=m.x0+(m.x1-m.x0)*.76,T=xl(y,v,M=>{let C=Math.min(1,Math.min(M-y,v-M)/.12);return{top:_(M)+.012,bottom:_(M)-.03-.05*C,halfWidth:g(M)*(.84+.14*C),upperExponent:2.6,lowerExponent:3,tumblehome:.1}},24,24),w=new ct(T,s);w.castShadow=!0,n.add(w),nM(n,e,r,o,a);let R=e.top[e.top.length-1][0],E=e.top[0][0];e.chrome?iM(n,r,R,E):sM(n,e,s,r,R,c);let S=new ct(new oe(e.length*1.2,(e.trackWidth+.7)*1.25),_l());return S.rotation.x=-Math.PI/2,S.position.y=.055,S.renderOrder=1,n.add(S),n}function nM(i,t,e,n,s){for(let r of n){let o=new ct(new te(s*.98,s*.98,t.trackWidth+t.tyreWidth-.05,24,1,!0,Math.PI*.5,Math.PI),e.dark);o.rotation.x=Math.PI/2,o.position.set(r,t.wheelRadius,0),i.add(o);for(let a of[-1,1]){let c=new Qt;c.position.set(r,t.wheelRadius,a*t.trackWidth/2),i.add(c);let l=new ct(new te(t.wheelRadius,t.wheelRadius,t.tyreWidth,28),e.tyre);l.rotation.x=Math.PI/2,l.castShadow=!0,c.add(l);let h=new ct(new te(t.wheelRadius*.68,t.wheelRadius*.68,t.tyreWidth+.012,24),e.rim);h.rotation.x=Math.PI/2,c.add(h);let u=new ct(new te(t.wheelRadius*.22,t.wheelRadius*.26,t.tyreWidth+.03,16),t.chrome?e.dark:e.chrome);u.rotation.x=Math.PI/2,c.add(u)}}}function iM(i,t,e,n){for(let[r,o,a]of[[e-.02,.4,1.36],[n+.02,.44,1.3]]){let c=new ct(new xi(.045,a,4,10),t.chrome);c.rotation.x=Math.PI/2,c.position.set(r,o,0),c.castShadow=!0,i.add(c)}for(let r of[-1,1]){let o=new ct(new He(.085,18,12,0,Math.PI),t.lamp);o.rotation.y=Math.PI/2,o.position.set(e-.14,.6,r*.52),i.add(o);let a=new ct(new us(.088,.012,6,22),t.chrome);a.rotation.y=Math.PI/2,a.position.set(e-.13,.6,r*.52),i.add(a)}let s=new ct(new xi(.07,.36,4,10),t.dark);s.rotation.x=Math.PI/2,s.position.set(e-.03,.5,0),i.add(s)}function sM(i,t,e,n,s,r){let o=new ct(new _e(.5,.025,1.9),n.carbon);o.position.set(s-.22,.1,0),i.add(o);for(let u of[-1,1]){let d=new ct(new _e(.18,.035,.36),n.lamp);d.position.set(s-.32,r(s-.32)-.04,u*.62),d.rotation.z=-.35,i.add(d)}let[a,c,l]=t.rearWing,h=new ct(new _e(.36,.03,l),n.carbon);h.position.set(a,c,0),h.rotation.z=.08,h.castShadow=!0,i.add(h);for(let u of[-1,1]){let d=new ct(new _e(.44,.22,.015),n.carbon);d.position.set(a,c-.05,u*l/2),i.add(d);let f=new ct(new _e(.05,c-r(a)+.05,.02),n.carbon);f.position.set(a+.06,(c+r(a))/2,u*.38),i.add(f)}if(t.sharkFin){let u=new ct(new _e(1.1,.26,.018),e);u.position.set(-1.55,r(-1.55)+.11,0),i.add(u)}}function Tf(i="gt",t=16118766){return eM(Ef[i]?i:"gt",t)}var rM=new P(0,1,0),oM=[["classic",11740702,-7.3,121.3,.02],["classic",3038539,-7.5,118.1,-.03],["classic",15788760,-7.2,114.9,.01],["gt",1842721,-7.4,111.7,-.02],["classic",9414584,-7.3,108.5,.03],["proto",15282981,-41,141.5,.02],["gt",10200234,-58,141,0],["proto",2833493,-64,120,Math.PI],["classic",9071422,-74,126,1.5],["gt",16118766,26,108,Math.PI-.05]];function Rf(){let i=bi({suit:2830390,trim:15282981,pose:"kneel"}),t=bi({suit:16118766,trim:15282981,skin:12159595,pose:"carryHelmet"}),e=bi({suit:2830390,trim:10200234,pose:"stand"});return{kneeling:i,helmetCarrier:t,engineer:e,members:[i,t,e]}}function Cf(i){for(let[t,e,n,s,r]of oM){let o=Tf(t,e);o.position.set(n,0,s),o.rotation.y=r,i.add(o)}}function If(i){let t=[[bi({suit:3817544,trim:16118766,skin:13738883}),-3.7,119.9,Math.PI+.25],[bi({suit:15131612,trim:6648666,skin:10251086}),-3.3,118.8,Math.PI-.5],[bi({suit:6648666,trim:1842721,skin:13081468}),-11.8,113.6,.3]];for(let[e,n,s,r]of t)e.position.set(n,0,s),e.rotation.y=r,i.add(e);return t}function Pf(i,t,e,n,s,r){let{kneeling:o,helmetCarrier:a,engineer:c}=i,l=1-Pe(zt(Math.abs(t-.26)/.1-.6,0,1));for(let _ of i.members)_.visible=l>.01;if(!(l>.01))return;let h=n.sample(s),u=h.p.clone(),d=h.t,f=new P(d.x,0,d.z).normalize(),m=new P().crossVectors(f,rM);o.position.copy(u).addScaledVector(f,1.3).addScaledVector(m,-1.55),o.rotation.y=Math.atan2(-m.z,m.x),o.userData.armR.rotation.z=.9+Math.sin(e*2.4)*.12,a.position.copy(u).addScaledVector(f,-3.6).addScaledVector(m,1.6),a.rotation.y=Math.atan2(- -m.z,-m.x)+.4,a.userData.head.rotation.y=Math.sin(e*.7)*.15,c.position.set(r.x+1.85,0,r.z-7),c.rotation.y=Math.atan2(-(u.z-c.position.z),u.x-c.position.x)}function Lf(i,t,e){let n=t>.6&&t<.87;for(let[s]of i)s.visible=n;n&&(i[0][0].userData.head.rotation.y=Math.sin(e*.5)*.2)}var aM=new P(0,1,0),Fo=70,cM=400,lM=40;function Df(i,t,e){let n=new mo(14279913,6187602,1);i.add(n);let s=new xo(16777215,3);return s.castShadow=t.shadowMap.enabled,s.shadow.mapSize.setScalar(e==="high"&&t.capabilities.maxTextureSize>=8192?4096:2048),Object.assign(s.shadow.camera,{left:-Fo,right:Fo,top:Fo,bottom:-Fo,near:10,far:900}),s.shadow.bias=-4e-5,s.shadow.normalBias=.04,s.shadow.radius=4,i.add(s,s.target),{hemi:n,sun:s}}function Uf(i){return i<.2?Qe(0,.12,i/.2):i<.56?Qe(.12,.45,(i-.2)/.36):i<.8?Qe(.45,.78,(i-.56)/.24):Qe(.78,1,Pe(zt((i-.8)/.085,0,1)))}var hM=new P,uM=new P;function Nf(i,t=hM){let e=il.degToRad(i.sunEl),n=il.degToRad(i.sunAz);return t.set(Math.sin(n)*Math.cos(e),Math.sin(e),-Math.cos(n)*Math.cos(e)).normalize()}function Ff(i,{sun:t,hemi:e}){t.color.set(i.sun),t.intensity=i.sunI,e.color.set(i.sky),e.groundColor.set(i.gnd),e.intensity=i.hemiI}function Of(i,{scene:t,renderer:e}){t.fog.color.set(i.fog),e.toneMappingExposure=i.exp}var Ai=new P,yl=new P;function fM(i,t,e){let n=(e.shadow.camera.right-e.shadow.camera.left)/e.shadow.mapSize.x;Ai.crossVectors(aM,t),Ai.lengthSq()<1e-8&&Ai.set(1,0,0),Ai.normalize(),yl.crossVectors(t,Ai).normalize();let s=Math.round(i.dot(Ai)/n)*n,r=Math.round(i.dot(yl)/n)*n,o=i.dot(t);return i.set(0,0,0).addScaledVector(Ai,s).addScaledVector(yl,r).addScaledVector(t,o)}function Bf(i,t,e,n,s){let r=uM.copy(e.y>lM?s:n);fM(r,t,i),i.position.copy(r).addScaledVector(t,cM),i.target.position.copy(r)}var zf=1;function kf(i){i.traverse(t=>{t.isMesh&&!t.userData.noMask&&t.layers.enable(zf)})}function Vf(i){if(i!=="high")return null;try{let t=new en(4,4,{type:Bn,samples:4});t.depthTexture=new cs(4,4);let e=new en(4,4),n=new Xe({depthTest:!1,depthWrite:!1,uniforms:{tColor:{value:t.texture},tDepth:{value:t.depthTexture},tMask:{value:e.texture},uInvVP:{value:new Vt},uPrevVP:{value:new Vt},uAmt:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }",fragmentShader:`uniform sampler2D tColor, tDepth, tMask; uniform mat4 uInvVP, uPrevVP; uniform float uAmt; varying vec2 vUv;
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
          }`}),s=new ct(new oe(2,2),n);s.frustumCulled=!1;let r=new ei;return r.add(s),{rt:t,maskRT:e,mat:n,pScene:r,pCam:new os(-1,1,1,-1,0,1),maskMat:new de({color:16777215,fog:!1}),vp:new Vt,prev:new Vt,size:new j,ok:!0}}catch{return null}}function Hf(i,t){return i?Pe(zt((t-.39)/.035,0,1))*(1-Pe(zt((t-.565)/.035,0,1))):0}function Gf(i,t,e,n,s){if(e.updateMatrixWorld(),n&&n.vp.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),s>.002&&n&&n.ok)try{i.getDrawingBufferSize(n.size);let r=n.size.x,o=n.size.y;(n.rt.width!==r||n.rt.height!==o)&&(n.rt.setSize(r,o),n.maskRT.setSize(r,o)),i.setRenderTarget(n.rt),i.render(t,e);let a=i.shadowMap.autoUpdate;i.shadowMap.autoUpdate=!1;let c=t.overrideMaterial,l=t.background;t.overrideMaterial=n.maskMat,e.layers.set(zf),i.setRenderTarget(n.maskRT),i.setClearColor(0,1),i.clear(),i.render(t,e),e.layers.set(0),t.overrideMaterial=c,t.background=l,i.shadowMap.autoUpdate=a,n.mat.uniforms.uInvVP.value.copy(n.vp).invert(),n.mat.uniforms.uPrevVP.value.copy(n.prev),n.mat.uniforms.uAmt.value=s*.35,i.setRenderTarget(null),i.render(n.pScene,n.pCam)}catch{n.ok=!1,i.setRenderTarget(null),i.render(t,e)}else i.render(t,e);n&&n.prev.copy(n.vp)}var Wf=[0,.2,.425,.665,.885],dM=.26,pM=2.6,mM=.01;function gM(i,t,e,n){let s=2/dM,r=s*n,o=1/(1+r+.48*r*r+.235*r*r*r),a=t-e,c=(i.velocity+s*a)*n;i.velocity=(i.velocity-s*c)*o;let l=e+(a+c)*o;return e-t>0==l>e&&(l=e,i.velocity=0),l}function Xf(){let i={target:0,value:0,velocity:0,intro:0,introDone:!1,snap:!1,advance(t){i.introDone||(i.intro+=t/pM,(i.intro>=1||i.target>mM)&&i.finishIntro()),i.value=gM(i,i.value,i.target,t),i.snap&&(i.value=i.target,i.velocity=0)},finishIntro(){i.intro=1,i.introDone=!0},get introEase(){return Au(zt(i.intro,0,1))}};return i}function Yf(i){return i==="high"?2:i==="mid"?1.75:1}function qf(i,t){let e=new so({canvas:i,antialias:t!=="low",powerPreference:"high-performance",alpha:!1});return e.setPixelRatio(1),e.toneMapping=Zc,e.outputColorSpace=Se,e.shadowMap.enabled=t!=="low",e.shadowMap.type=qc,e}function Zf(i,t,e,n){let s=0,r=0,o=0,a=0,c=0,l=0,h=1,u=typeof ResizeObserver=="function"?new ResizeObserver(f=>{for(let m of f){s=m.contentRect.width,r=m.contentRect.height;let _=m.devicePixelContentBoxSize&&m.devicePixelContentBoxSize[0];o=_?_.inlineSize:0,a=_?_.blockSize:0}}):null;if(u)try{u.observe(i,{box:"device-pixel-content-box"})}catch{u.observe(i)}function d(){if(!u||!s){let p=i.getBoundingClientRect();s=p.width,r=p.height}let f=window.devicePixelRatio||1,m=Math.min(f,n)*h,_,g;o&&m>=f-.001&&Math.abs(o-s*f)<=2&&Math.abs(a-r*f)<=2?(_=o,g=a):(_=Math.max(1,Math.round(s*m)),g=Math.max(1,Math.round(r*m))),(_!==c||g!==l)&&(c=_,l=g,t.setSize(c,l,!1),e.aspect=c/l,e.updateProjectionMatrix())}return{update:d,get width(){return c},get height(){return l},get resScale(){return h},set resScale(f){h=f}}}var _M=["map","normalMap","roughnessMap","metalnessMap","aoMap","bumpMap","alphaMap"];function $f(i,t,e){let n=Math.min(e==="high"?16:e==="mid"?8:2,t.capabilities.getMaxAnisotropy());n>1&&i.traverse(s=>{if(s.material)for(let r of[].concat(s.material))for(let o of _M){let a=r[o];a&&a.isTexture&&!a.isRenderTargetTexture&&a.anisotropy<n&&(a.anisotropy=n,a.needsUpdate=!0)}})}function Jf(i){i.traverse(t=>{if(t.material)for(let e of[].concat(t.material))(e.isMeshStandardMaterial||e.isMeshBasicMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial)&&(e.dithering=!0)})}var xM=8e3;function Kf(){return new Xe({side:Fe,depthWrite:!1,fog:!1,uniforms:{zen:{value:new Nt},hor:{value:new Nt},sunDir:{value:new P},sunCol:{value:new Nt},skyGain:{value:1}},vertexShader:"varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",fragmentShader:`uniform vec3 zen, hor, sunCol; uniform vec3 sunDir; uniform float skyGain; varying vec3 vP;
      void main(){ float h = clamp(vP.y, -.2, 1.); float k = pow(clamp(h, 0., 1.), .55);
        vec3 c = mix(hor, zen, k);
        float s = max(dot(normalize(vP), normalize(sunDir)), 0.);
        c += sunCol * (pow(s, 380.) * 2.2 + pow(s, 12.) * .22 + pow(s, 3.) * .06 * (1. - k));
        c = mix(c, hor * .92, smoothstep(0., -.2, vP.y));
        gl_FragColor = vec4(c * skyGain + (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - .5) / 255., 1.);
      }`})}function Qf(i){return new ct(new He(xM,32,16),i)}function jf(i,t,e){let n=i.uniforms;n.zen.value.set(t.zen),n.hor.value.set(t.hor),n.sunDir.value.copy(e),n.sunCol.value.set(t.sun)}function td({renderer:i,scene:t,skyMaterial:e,quality:n}){let s=new as(i),r=new ei,o=new ct(new He(100,32,16),e);r.add(o);let a=new ct(new On(90,32),new de({color:5595212}));a.rotation.x=-Math.PI/2,a.position.y=-8,r.add(a);let c=new Ws(n==="high"?256:128,{type:Bn,generateMipmaps:!1}),l=new Gs(.1,200,c),h=n==="high"?.025:.04,u=null,d=-1;function f(_){let g=e.uniforms.skyGain.value;e.uniforms.skyGain.value=1,l.update(i,r),u=s.fromCubemap(c.texture,u),t.environment=u.texture,d=_,e.uniforms.skyGain.value=g}function m(_){Math.abs(_-d)>h&&f(_)}return{capture:f,refreshIfNeeded:m}}var Oo=[{t:0,sunEl:15,sunAz:110,sun:16769216,sunI:3.6,sky:13622502,gnd:5792846,hemiI:.92,zen:8368344,hor:15199985,fog:14674156,exp:1.04},{t:.45,sunEl:52,sunAz:175,sun:16774632,sunI:3.9,sky:14082794,gnd:6187602,hemiI:.98,zen:6135510,hor:14279913,fog:14279913,exp:1},{t:.75,sunEl:26,sunAz:238,sun:16769724,sunI:3.7,sky:14409954,gnd:6055248,hemiI:.9,zen:7184334,hor:15131610,fog:14869212,exp:1},{t:1,sunEl:7,sunAz:262,sun:16755036,sunI:3.7,sky:15780258,gnd:5919300,hemiI:.72,zen:7045291,hor:15974283,fog:15385500,exp:1.08}],yM=["sun","sky","gnd","zen","hor","fog"],vM=new Nt,MM=new Nt;function ed(i){let t=0;for(;t<Oo.length-2&&i>Oo[t+1].t;)t++;let e=Oo[t],n=Oo[t+1],s=Pe(zt((i-e.t)/(n.t-e.t),0,1)),r=a=>vM.set(e[a]).lerp(MM.set(n[a]),s).getHex(),o={};for(let a of Object.keys(e))o[a]=typeof e[a]=="number"&&!yM.includes(a)?Qe(e[a],n[a],s):r(a);return o}var we={ground:-.05,gravel:.01,runoff:.016,pitMouth:.02,pitLane:.025,asphalt:.03,kerbInner:.03,kerbOuter:.045,rubber:.036,lines:.042,paint:.048,highlight:.06};var SM=15282981,bM=1,Ml=4.5,wM=.006,AM=3,EM=1.5,sd=30,TM=50,vl=.334,RM=.388,CM=.008,nd=.39,IM=.408,PM=.9,id=.15,LM=`attribute float aSide;
attribute float aArc;
attribute vec2 aAcross;
uniform float uWidth;
uniform float uMaxWidth;
uniform float uMinPixels;
uniform vec2 uViewport;
varying float vArc;
varying float vSidePixels;
varying float vHalfPixels;
`,DM=`#include <begin_vertex>
{
  vec3 across = vec3(aAcross.x, 0.0, aAcross.y);
  vec3 along = vec3(aAcross.y, 0.0, -aAcross.x);
  vec4 world = modelMatrix * vec4(position - across * aSide * 0.5 * uWidth, 1.0);
  mat4 viewProjection = projectionMatrix * viewMatrix;
  vec4 c0 = viewProjection * world;
  vec4 cAlong = viewProjection * (world + vec4(along, 0.0));
  vec4 cAcross = viewProjection * (world + vec4(across, 0.0));
  float halfWidth = 0.5 * uWidth;
  float halfPixels = 1e4; // no screen measure (at or behind the eye): a hard edge
  if (c0.w > 1.0 && cAlong.w > 0.5 && cAcross.w > 0.5) {
    vec2 s0 = c0.xy / c0.w;
    vec2 t = (cAlong.xy / cAlong.w - s0) * 0.5 * uViewport;
    vec2 l = (cAcross.xy / cAcross.w - s0) * 0.5 * uViewport;
    float pixelsPerMetre = max(abs(t.x * l.y - t.y * l.x) / max(length(t), 1e-4), 1e-4);
    float core = clamp(uMinPixels / pixelsPerMetre, uWidth, uMaxWidth);
    halfWidth = min(0.5 * core + 1.0 / pixelsPerMetre, 0.5 * uMaxWidth + 1.0);
    halfPixels = halfWidth * pixelsPerMetre;
  }
  transformed += across * aSide * (halfWidth - 0.5 * uWidth);
  vArc = aArc;
  vSidePixels = aSide * halfPixels;
  vHalfPixels = halfPixels;
}`,UM=`uniform float uHead;
uniform float uFeather;
varying float vArc;
varying float vSidePixels;
varying float vHalfPixels;
`,NM=`#include <color_fragment>
diffuseColor.a *= 1.0 - smoothstep(uHead - uFeather, uHead, vArc);
diffuseColor.a *= clamp(vHalfPixels - abs(vSidePixels), 0.0, 1.0);`;function FM(i){let{line:t}=i,e=t.count,n=new Float32Array((e+1)*6),s=new Float32Array((e+1)*4),r=new Float32Array((e+1)*2),o=new Float32Array((e+1)*2),a=new Float32Array((e+1)*6);for(let h=0;h<=e;h++){let u=h%e;for(let[d,f]of[[0,1],[1,-1]]){let m=2*h+d;n.set([t.x[u]+t.nx[u]*f*Ml*.5,we.highlight,t.z[u]+t.nz[u]*f*Ml*.5],m*3),s.set([t.nx[u],t.nz[u]],m*2),r[m]=f,o[m]=h*t.spacing/t.length,a[m*3+1]=1}}let c=[];for(let h=0;h<e;h++)c.push(2*h,2*h+2,2*h+1,2*h+1,2*h+2,2*h+3);let l=new ce;return l.setAttribute("position",new Bt(n,3)),l.setAttribute("normal",new Bt(a,3)),l.setAttribute("aAcross",new Bt(s,2)),l.setAttribute("aSide",new Bt(r,1)),l.setAttribute("aArc",new Bt(o,1)),l.setIndex(c),l.computeBoundingSphere(),l.boundingSphere.radius+=sd,l}function rd(i){let t={uHead:{value:0},uFeather:{value:TM/i.line.length},uWidth:{value:Ml},uMaxWidth:{value:sd},uMinPixels:{value:3},uViewport:{value:new j(1,1)}},e=new de({color:SM,transparent:!0,opacity:0,depthWrite:!1,fog:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4});e.onBeforeCompile=c=>{Object.assign(c.uniforms,t),c.vertexShader=LM+c.vertexShader.replace("#include <begin_vertex>",DM),c.fragmentShader=UM+c.fragmentShader.replace("#include <color_fragment>",NM)};let n=new ct(FM(i),e);n.name="track-highlight",n.renderOrder=2;let s=new ie,r=1;n.onBeforeRender=c=>{c.getCurrentViewport(s),t.uViewport.value.set(s.z,s.w),t.uMinPixels.value=Math.max(wM*Math.min(s.z,s.w),AM*r,EM)};let o=0,a=0;return{mesh:n,update(c,l,h=!1,u=1){r=u;let d=Pe(zt((c-vl)/(RM-vl),0,1));if(h||!(l>0))o=a=d;else{let _=o,g=PM*l;o=d>o?Math.min(d,o+g):Math.max(d,o-g);let p=(o-_)/l,x=Math.exp(-l/id);a=o-p*id*(1-x)+(a-_)*x}let f=zt((c-vl)/CM,0,1),m=1-Pe(zt((c-nd)/(IM-nd),0,1));e.opacity=f*m*bM*Math.min(1,a*40),n.visible=e.opacity>.01,t.uHead.value=a*(1+t.uFeather.value)}}}function od(i){let{rng:t,root:e,updaters:n,density:s}=i,r=new Qt;r.name="clouds",e.add(r);let o=Math.round(22*Math.max(.5,s));for(let a=0;a<o;a++){let c=new qs({map:gf(a+3),transparent:!0,depthWrite:!1,fog:!1,opacity:.85}),l=new ao(c),h=t()*Math.PI*2,u=900+t()*1300;l.position.set(Math.cos(h)*u,220+t()*260,Math.sin(h)*u);let d=380+t()*420;l.scale.set(d,d*.42,1),l.userData.v=.6+t()*1.2,r.add(l)}n.push((a,c)=>{for(let l of r.children)l.position.x+=l.userData.v*c*2.2,l.position.x>2400&&(l.position.x=-2400)})}var lr={straightZ:206,straightX0:420,straightX1:-534,trackHalf:7,pitWallZ:198,pitLaneZ:191.5,garageFrontZ:185.5,garageDepth:17,boxW:6.7,boxes:30,pitX0:-150.5,get pitX1(){return this.pitX0+this.boxes*this.boxW},towerX:64,gantryX:-96,grandstandZ:224,grandstandX0:-190,grandstandX1:110,paddock:{x0:-170,x1:120,z0:96,z1:166}};function ad(){let i={asphalt:uf(),grass:ff(),gravel:df(),kerb:pf(),barrier:mf(),blob:_f(),ao:xf(),shutter:yf()};return i.grass.repeat.set(1,1),i}var Sl={transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1};function cd(i){let t={ground:new _t({map:i.grass,roughness:1,color:16777215,vertexColors:!0}),asphalt:new _t({map:i.asphalt,roughness:.8,metalness:0,color:10133156}),pitAsphalt:new _t({map:i.asphalt,roughness:.86,color:12567496}),rubber:new de({color:723981,opacity:.16,...Sl}),ao:new de({map:i.ao,...Sl}),contact:new de({map:Uo(128,128,{hx:.34,hy:.34,rr:.2,fade:.15,alpha:.6}),...Sl}),line:new _t({color:15921644,roughness:.7}),kerb:new _t({map:i.kerb,roughness:.6}),runoff:new _t({color:4165490,roughness:.85}),gravel:new _t({map:i.gravel,roughness:1,color:15919832}),barrier:new _t({map:i.barrier,roughness:.8}),concrete:new _t({color:14276560,roughness:.92}),concreteDark:new _t({color:10988978,roughness:.9}),white:new _t({color:15131870,roughness:.8}),steel:new _t({color:10200234,roughness:.45,metalness:.6}),steelDark:new _t({color:6120555,roughness:.5,metalness:.55}),glass:new _t({color:6256260,roughness:.12,metalness:.9,envMapIntensity:1.2}),shutter:new _t({map:i.shutter,color:16777215,roughness:.5,metalness:.3}),seat:new _t({color:5144467,roughness:.7}),roofW:new _t({color:15855593,roughness:.6,side:me}),red:new _t({color:15282981,roughness:.55}),trunk:new _t({color:7034695,roughness:1}),pine:new _t({color:16777215,roughness:1}),oak:new _t({color:16777215,roughness:1}),shrub:new _t({color:16777215,roughness:1}),hill:new _t({color:7043676,roughness:1,flatShading:!1}),interior:new _t({color:14276561,roughness:.8}),floor:new _t({color:9343640,roughness:.55,metalness:.1}),blob:new de({map:i.blob,transparent:!0,depthWrite:!1})};return t.asphalt.map.repeat.set(1,1),t}function ld(i){let t=vf();return t.repeat.set(i,1),new _t({map:t,roughness:.18,metalness:.55,envMapIntensity:1.1})}function OM(i){return i==="high"?1:i==="mid"?.6:.35}function hd(i,t){let e=OM(t),n=new Qt;n.name="world";let s=i.map(([d,f])=>new j(d,f)),r=Sn(42),o=[],a=ad(),c=cd(a);function l(d,f,m,_,g,p=1,x=.06,y=n){let v=Math.hypot(m-d,_-f),T=new oe(v,g);T.rotateX(-Math.PI/2);let w=new ct(T,c.ao),R=Math.atan2(_-f,m-d),E=-Math.sin(R)*p,S=Math.cos(R)*p;return w.position.set((d+m)/2+E*g/2,x,(f+_)/2+S*g/2),w.rotation.y=-R+(p>0?0:Math.PI),w.renderOrder=1,y.add(w),w}function h(d,f,m,_,g=0,p=n){let x=new ct(new oe(m,_),c.contact);return x.rotation.x=-Math.PI/2,x.rotation.z=g,x.position.set(d,.055,f),x.renderOrder=1,p.add(x),x}function u(d,f,m,_,g,p,x,y=n,v=!0){let T=new ct(new _e(d,f,m),_);return T.position.set(g,p+f/2,x),T.castShadow=v,T.receiveShadow=!0,y.add(T),T}return{quality:t,density:e,root:n,track:s,rng:r,updaters:o,textures:a,materials:c,layout:lr,glazingMaterial:ld,addAoStrip:l,addContactShadow:h,addBox:u}}var BM=6,zM=2.4,kM=1.5;function hr(i,t,e,n,s,r){let{materials:o,updaters:a}=i,c=new ct(new te(.05,.06,BM,6),o.steel);c.position.set(t,e+3,n),r.add(c);let l=new oe(zM,kM,16,6);l.translate(1.2,0,0);let h=new _t({color:s,side:me,roughness:.8});h.onBeforeCompile=d=>{d.uniforms.uTime={value:0},h.userData.sh=d,d.vertexShader=`uniform float uTime;
`+d.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        float k = position.x / 2.4;
        transformed.z += sin(position.x * 2.1 - uTime * 4.2 + ${(t*.1).toFixed(2)}) * .22 * k;
        transformed.y += sin(position.x * 1.3 - uTime * 3.1) * .06 * k;`)};let u=new ct(l,h);u.position.set(t,e+5.1,n),u.castShadow=!0,r.add(u),a.push(d=>{h.userData.sh&&(h.userData.sh.uniforms.uTime.value=d)})}var VM=18,ud=-.08;function fd(i){let{root:t,materials:e,addBox:n}=i,s=i.layout,r=new Qt;r.name="grandstand",t.add(r);let o=s.grandstandX1-s.grandstandX0,a=(s.grandstandX0+s.grandstandX1)/2,c=s.grandstandZ;for(let h=0;h<VM;h++)n(o,.45,.9,e.concreteDark,a,1.2+h*.55,c+h*.85,r,h%3===0),n(o-2,.32,.35,e.seat,a,1.65+h*.55,c+h*.85-.1,r,!1);n(o,1.2,16,e.concreteDark,a,0,c+7.5,r),n(o,11,1,e.white,a,0,c+16,r);let l=new ct(new _e(o+4,.45,22),e.roofW);l.position.set(a,16.5,c+7.5),l.rotation.x=ud,l.castShadow=!0,l.receiveShadow=!0,r.add(l);for(let h=s.grandstandX0;h<=s.grandstandX1+.1;h+=20){n(.5,16.5,.5,e.steel,h,0,c+16.2,r);let u=new ct(new _e(.35,1.4,21),e.steel);u.position.set(h,17.3,c+7.5),u.rotation.x=ud,u.castShadow=!0,r.add(u)}}function dd(i){let{root:t,materials:e,addBox:n}=i,s=i.layout,r=s.straightX0-s.straightX1,o=(s.straightX0+s.straightX1)/2;n(r,1.15,.6,e.concrete,o,0,s.straightZ+10.5);let a=new Ye(new te(.07,.07,4.2,6),e.steelDark,Math.ceil(r/6)),c=new Vt,l=0;for(let u=s.straightX1;u<s.straightX0;u+=6)c.makeTranslation(u,1.15+2.1,s.straightZ+10.6),a.setMatrixAt(l++,c);a.count=l,a.castShadow=!0,t.add(a);let h=new ct(new oe(r,3.6),new _t({color:9213082,transparent:!0,opacity:.18,side:me,depthWrite:!1}));h.position.set(o,3.1,s.straightZ+10.6),t.add(h)}function pd(i){let{root:t,materials:e,addBox:n}=i,s=i.layout,r=new Qt;r.name="gantry",t.add(r);let o=s.gantryX,a=s.pitWallZ-.5,c=s.straightZ+11;for(let d of[a,c])n(.6,9,.6,e.steel,o,0,d,r);n(.5,.5,c-a+1,e.steel,o,8.2,(a+c)/2,r),n(.5,.5,c-a+1,e.steel,o,9.2,(a+c)/2,r);for(let d=a;d<c;d+=1.2){let f=new ct(new _e(.12,1.3,.12),e.steel);f.position.set(o,8.7,d),f.rotation.x=.7,r.add(f)}for(let d=0;d<4;d++)n(.3,.9,1.6,new _t({color:1842721,roughness:.4}),o-.2,7.2,s.straightZ-3+d*2,r);let l=we.asphalt+.001,h=we.paint-l,u=we.lines-l;n(.8,h,14,e.line,o,l,s.straightZ,t,!1);for(let d=0;d<10;d++){let f=o+12+d*8,m=s.straightZ+(d%2?3.2:-3.2);n(.18,h,2.6,e.line,f,l,m,t,!1),n(2.2,u,.18,e.line,f+1.1,l,m+1.3,t,!1),n(2.2,u,.18,e.line,f+1.1,l,m-1.3,t,!1)}}var md=new Vt,gd=new Ie,_d=new Ve,HM=new P,GM=new P,WM=new Nt;function Ge(i,t,e,n,s=!0){let r=new Ye(t,e,n.length);return n.forEach((o,a)=>{_d.set(o.rx||0,o.ry||0,o.rz||0),gd.setFromEuler(_d),md.compose(GM.set(o.x,o.y||0,o.z),gd,HM.set(o.sx||1,o.sy||1,o.sz||1)),r.setMatrixAt(a,md),o.c!=null&&r.setColorAt(a,WM.set(o.c))}),r.castShadow=s,r.receiveShadow=!0,i.root.add(r),r}function XM(i){let{root:t,materials:e}=i,n=i.layout,s=n.paddock,r=new oe(s.x1-s.x0,s.z1-s.z0);r.rotateX(-Math.PI/2);let o=r.attributes.uv;for(let h=0;h<o.count;h++)o.setXY(h,o.getX(h)*(s.x1-s.x0)/12,o.getY(h)*(s.z1-s.z0)/12);let a=new ct(r,e.pitAsphalt);a.position.set((s.x0+s.x1)/2,.02,(s.z0+s.z1)/2),a.receiveShadow=!0,t.add(a);for(let[h,u,d,f]of[[80,160,22,28],[84,180,18,16],[10,167.5,220,3.5]]){let m=new ct(new oe(d,f),e.pitAsphalt);m.rotation.x=-Math.PI/2,m.position.set(h,.022,u),m.receiveShadow=!0,t.add(m)}let c=new ct(new oe(9,90),e.pitAsphalt);c.rotation.x=-Math.PI/2,c.position.set(-60,.021,70),c.receiveShadow=!0,t.add(c);let l=n.garageFrontZ-n.garageDepth;i.addAoStrip(n.pitX0,l,n.pitX1,l,2.6,-1,.05)}function YM(){return{unitBox:new _e(1,1,1),paint:new _t({color:16777215,roughness:.42,metalness:.25}),darkGlass:new _t({color:1910316,roughness:.08,metalness:.85}),rubber:new _t({color:1579291,roughness:.92})}}var qM=151,xd=[2830133,16118766,10200234,1842721,15131612,3817544,16118766,6648666];function ZM(i,t){let{materials:e}=i,n=qM,s=[],r=[],o=[],a=[],c=[],l=[],h=[],u=[],d=0;for(let f=-156;f<=66;f+=24,d++){let m=xd[d%xd.length];s.push({x:f,y:.95+1.95,z:n,sx:15.5,sy:3.9,sz:2.55,c:m}),d%3===1&&u.push({x:f,y:1.55,z:n-1.285,sx:15.3,sy:.18,sz:.02,c:15282981}),r.push({x:f+9.35,y:.9+1.45,z:n,sx:2.6,sy:2.9,sz:2.5,c:d%2?16118766:10200234}),o.push({x:f+10.67,y:3,z:n,sx:.05,sy:.95,sz:2.2});for(let _ of[-6.1,-4.8,-3.5,7.7,9.9])a.push({x:f+_,y:.5,z:n,rx:Math.PI/2,sy:2.6});c.push({x:f-.5,y:3.7,z:n-1.28-2.35,sx:13.6,sy:.1,sz:4.7,rx:-.05});for(let _ of[-6.6,0,6.6])l.push({x:f-.5+_,y:1.8,z:n-1.28-4.55,sy:3.6});h.push({x:f+1.5,y:.05,z:n,rx:-Math.PI/2,sx:20,sy:4.4}),h.push({x:f-.5,y:.052,z:n-3.6,rx:-Math.PI/2,sx:14,sy:5.2})}Ge(i,t.unitBox,t.paint,s),Ge(i,t.unitBox,t.paint,r),Ge(i,t.unitBox,t.darkGlass,o,!1),u.length&&Ge(i,t.unitBox,new _t({color:16777215,roughness:.5}),u,!1),Ge(i,new te(.5,.5,1,16),t.rubber,a),Ge(i,t.unitBox,e.roofW,c),Ge(i,new te(.05,.05,1,6),e.steel,l),Ge(i,new oe(1,1),e.contact,h,!1).renderOrder=1}function $M(i,t){let{materials:e}=i,n=[],s=[],r=[],o=[];for(let a=0;a<6;a++){let c=-28+a*16.5,l=100.5;n.push({x:c,y:1.6,z:l,sx:14.6,sy:3.2,sz:5}),r.push({x:c,y:3.3,z:l+.35,sx:15.4,sy:.18,sz:6.2}),n.push({x:c-2.2,y:4.85,z:l-.6,sx:8.6,sy:2.9,sz:3.6}),r.push({x:c-2.2,y:6.4,z:l-.45,sx:9.6,sy:.16,sz:4.4}),s.push({x:c,y:1.75,z:l+2.53,sx:12.8,sy:1.9,sz:.04}),s.push({x:c-2.2,y:4.9,z:l+1.23,sx:8,sy:2.1,sz:.04}),o.push({x:c,y:.05,z:l+2.6,rx:-Math.PI/2,sx:16,sy:4})}Ge(i,t.unitBox,e.white,n),Ge(i,t.unitBox,e.white,r),Ge(i,t.unitBox,i.glazingMaterial(1.5),s,!1),Ge(i,new oe(1,1),e.contact,o,!1).renderOrder=1}function JM(i){let{root:t,materials:e,addBox:n}=i;for(let[s,r]of[[-140,116],[-100,116],[72,117]]){let o=new ct(new uo(13,3.2,4,1,!0),e.roofW);o.rotation.y=Math.PI/4,o.position.set(s,5.6,r),o.castShadow=!0,t.add(o);for(let[a,c]of[[-1,-1],[1,-1],[-1,1],[1,1]])n(.25,4.2,.25,e.steel,s+a*8.5,0,r+c*8.5,t)}}function KM(i,t){let e=[],n=[];for(let s=0;s<18;s++){let r=-158+s*13.1+s%3*1.7,o=145.4-s%2*.8,a=2+s%3;for(let c=0;c<a;c++)e.push({x:r,y:.16+c*.31,z:o,sx:.66,sy:.3,sz:.66});n.push({x:r+2.4,y:.45,z:o+.3,sx:1.2,sy:.9,sz:.8,c:s%2?1842721:10200234})}Ge(i,new te(.5,.5,1,18),t.rubber,e),Ge(i,t.unitBox,t.paint,n)}function QM(i,t){let e=[];for(let n=0;n<7;n++)e.push({x:-7.4,y:.03,z:126.1-n*3.2,sx:5.8,sy:.012,sz:.12});e.push({x:-10.3,y:.03,z:126.1-3*3.2,sx:.12,sy:.012,sz:6*3.2+.12}),Ge(i,t.unitBox,i.materials.line,e,!1)}function jM(i){let{root:t,materials:e,addBox:n}=i,s=i.layout.paddock;for(let r=0;r<4;r++)n(.4,22,.4,e.steel,s.x0+10+r*90,0,s.z0-5,t),n(3,.6,1.2,e.steelDark,s.x0+10+r*90,22,s.z0-5,t)}function yd(i){XM(i);let t=YM();ZM(i,t),$M(i,t),JM(i),KM(i,t),QM(i,t),jM(i)}var Md=13;function Sd(i){let{root:t,materials:e,addBox:n}=i,s=i.layout,r=new vn,o=s.garageFrontZ,a=s.pitWallZ;r.moveTo(s.pitX0-140,-a),r.lineTo(s.pitX1+150,-a),r.lineTo(s.pitX1+150,-o),r.lineTo(s.pitX0-140,-o),r.closePath();let c=new ir(r);c.rotateX(-Math.PI/2);let l=new ct(c,e.pitAsphalt);l.position.y=.025,l.receiveShadow=!0,t.add(l);let h=c.attributes.uv,u=c.attributes.position;for(let _=0;_<u.count;_++)h.setXY(_,u.getX(_)/12,u.getZ(_)/12);let d=(s.pitX0+s.pitX1)/2,f=we.pitLane+.001,m=we.lines-f;n(s.pitX1-s.pitX0+260,m,.25,e.line,d,f,s.garageFrontZ+6,t,!1),n(s.pitX1-s.pitX0+300,1.1,.7,e.concrete,d,0,s.pitWallZ+.35),n(s.pitX1-s.pitX0+300,.08,.9,e.steel,d,1.1,s.pitWallZ+.35);for(let[_,g]of[[s.pitX1+150,s.pitX1+260],[s.pitX0-140,s.pitX0-250]]){let p=new vn;p.moveTo(_,-(s.garageFrontZ+.5)),p.lineTo(_,-s.pitWallZ),p.lineTo(g,-(s.straightZ-6.8)),p.lineTo(g,-(s.straightZ-6.8-6)),p.closePath();let x=new ir(p);x.rotateX(-Math.PI/2);let y=new ct(x,e.pitAsphalt);y.position.y=we.pitMouth,y.receiveShadow=!0,t.add(y)}}function t1(i){let t=i.layout;i.addAoStrip(t.pitX0-150,t.pitWallZ,t.pitX1+150,t.pitWallZ,1.4,-1,.05),i.addAoStrip(t.pitX0-150,t.pitWallZ+.7,t.pitX1+150,t.pitWallZ+.7,1.2,1,.06)}function e1(i,t){let{materials:e,addBox:n,addAoStrip:s}=i,r=i.layout,o=r.boxes*r.boxW,a=(r.pitX0+r.pitX1)/2,c=r.garageFrontZ,l=c-r.garageDepth,h=c-r.garageDepth/2;n(o,4.6,.4,e.white,a,0,l+.2,t),n(o+.6,.5,r.garageDepth+2.2,e.white,a,4.6,h+.9,t);let u=i.glazingMaterial(o/8);n(o,3.4,r.garageDepth-2,u,a,5.1,h-.4,t);for(let f=0;f<=r.boxes;f++)n(f%2?.16:.32,3.4,f%2?.45:.7,e.white,r.pitX0+f*r.boxW,5.1,c-1.2,t);n(o,.05,.14,new de({color:16773590}),a,4.56,c+1.4,t,!1),s(r.pitX0,c,r.pitX1,c,3.2,1,.05,t),t1(i),n(o+.6,.55,r.garageDepth+1.6,e.white,a,8.5,h+.4,t);let d=new _t({color:12570840,transparent:!0,opacity:.35,roughness:.1});n(o,1,.06,d,a,9.05,c+.1,t,!1),n(o,.07,.12,e.steel,a,10.05,c+.1,t);for(let f=0;f<r.boxes;f++){let m=r.pitX0+f*r.boxW,_=m+r.boxW/2;if(n(.35,4.6,r.garageDepth,e.white,m,0,h,t),n(r.boxW-.35,.7,.3,e.white,_,3.9,c-.15,t),f===Md)continue;let g=f%7===3?1.2:f%5===1?2.2:0;n(r.boxW-.4,3.9-g,.12,e.shutter,_,g,c-.3,t),g>0&&n(r.boxW-.4,g,.1,e.interior,_,0,c-6,t,!1)}n(.35,4.6,r.garageDepth,e.white,r.pitX1,0,h,t)}var vd=()=>new _t({color:1776670,roughness:.95});function n1(i,t){let{materials:e,addBox:n,addAoStrip:s}=i,r=i.layout,o=r.garageFrontZ,a=o-r.garageDepth,c=r.pitX0+Md*r.boxW+r.boxW/2;n(r.boxW-.4,.02,r.garageDepth-.4,e.floor,c,.02,o-r.garageDepth/2,t,!1),n(r.boxW-.4,3.9,.1,e.interior,c,0,a+.45,t,!1);for(let h of[-1,1]){n(1.6,1,.6,e.red,c+h*2.2,0,a+1.3,t);for(let u=0;u<4;u++){let d=new ct(new te(.33,.33,.3,20),vd());d.position.set(c-h*2.3,.15+u*.31,a+3.2),d.castShadow=!0,t.add(d)}}let l=new _o(16767400,60,16,1.6);l.position.set(c,3.6,o-6),t.add(l),n(r.boxW-1.2,.06,.5,new de({color:16774108}),c,4.2,o-5,t,!1),n(r.boxW-1.2,.06,.5,new de({color:16774108}),c,4.2,o-11,t,!1),n(3.2,1.4,.06,e.steelDark,c,1.5,a+.52,t,!1);for(let h=0;h<2;h++){let u=new ct(new te(.34,.34,.32,22),vd());u.rotation.z=Math.PI/2,u.position.set(c+1.6+h*.36,.36,o-4.2),u.castShadow=!0,t.add(u)}n(1.1,.08,.7,e.steel,c+1.78,.1,o-4.2,t,!1),s(c-r.boxW/2+.2,a+.5,c+r.boxW/2-.2,a+.5,2.4,1,.045,t),s(c-r.boxW/2+.2,a+.5,c-r.boxW/2+.2,o,1.4,-1,.045,t),s(c+r.boxW/2-.2,a+.5,c+r.boxW/2-.2,o,1.4,1,.045,t),i.root.userData.openBox={x:c,z:o}}function i1(i,t){let{materials:e,addBox:n,addAoStrip:s}=i,r=i.layout,o=r.towerX,a=r.garageFrontZ-7;n(18,16,15,e.white,o,0,a,t),n(18.6,4.2,15.6,i.glazingMaterial(2.4),o,16,a,t),n(19.4,.6,16.4,e.white,o,20.2,a,t),n(20.4,.25,17.4,e.white,o,15.75,a,t);for(let c=0;c<3;c++)n(18.2,1.3,.1,i.glazingMaterial(2.2),o,3.4+c*4.2,a+7.55,t,!1);s(o-9,a+7.5,o+9,a+7.5,2.4,1,.05,t),s(o+9,a-7.5,o+9,a+7.5,2.4,-1,.05,t),i.root.userData.tower=new P(o,18,a)}function s1(i,t){let e=i.layout;for(let n=0;n<6;n++)hr(i,e.pitX0+18+n*34,9,e.garageFrontZ+.2,n%2?16118766:15282981,t)}function bd(i){let t=new Qt;t.name="pits",i.root.add(t),e1(i,t),n1(i,t),i1(i,t),s1(i,t)}var r1=4200,o1=3e3,a1=120,c1=90;function Ad(i){let t=new oe(r1,o1,a1,c1);t.rotateX(-Math.PI/2);let e=t.attributes.position,n=t.attributes.uv;for(let h=0;h<e.count;h++){let u=e.getX(h),d=e.getZ(h),f=Math.hypot(u/1.15,d*1.25),m=zt((f-720)/900,0,1);e.setY(h,m*m*(40+pn(u/420,d/420,4)*90)-.05),n.setXY(h,u/9,d/9)}t.computeVertexNormals();let s=[],r=new Nt(8161886),o=new Nt(10986611),a=new Nt(5662282),c=new Nt;for(let h=0;h<e.count;h++){let u=e.getX(h),d=e.getZ(h),f=pn(u/260,d/260,4),m=pn(u/70+9,d/70,3);c.copy(r).lerp(o,zt(f*1.4+.25,0,1)*.75).lerp(a,zt(-m*1.6,0,1)*.6),s.push(c.r,c.g,c.b)}t.setAttribute("color",new Bt(s,3));let l=new ct(t,i.materials.ground);l.receiveShadow=!0,l.name="ground",i.root.add(l)}var wd=-2.35,l1=.22;function Ed(i){let t=new Qt;for(let e=0;e<3;e++){let n=2300+e*350,s=new te(n,n,1,220,1,!0),r=s.attributes.position;for(let a=0;a<r.count;a++){let c=r.getX(a),l=r.getZ(a);if(r.getY(a)>0){let h=Math.atan2(l,c),u=70+pn(h*3+e*7,e,4)*150+Math.max(0,pn(h*9,3+e,2))*90,d=Math.abs(Math.atan2(Math.sin(h-wd),Math.cos(h-wd)));u+=Math.max(0,1-d/l1)*(e===1?260:150),r.setY(a,u)}else r.setY(a,-20)}s.computeVertexNormals();let o=new _t({color:[6254423,8227708,10464688][e],roughness:1,side:me,fog:!0});t.add(new ct(s,o))}i.root.add(t)}var h1=1,Rd=.5,u1=15,f1=.8,d1=.5,p1=7,Td=6.5,m1=40,g1=12.5,_1=33.5,x1=17,y1=25,v1=.02,M1=25,S1=42,b1=35,wl=i=>Math.atan2(Math.sin(i),Math.cos(i));function w1(i,t,e){let n=i.length,s=new Float64Array(n*e),r=new Float64Array(n*e),o=(a,c)=>Math.max(1e-6,Math.sqrt(Math.hypot(i[c]-i[a],t[c]-t[a])));for(let a=0;a<n;a++){let c=(a-1+n)%n,l=(a+1)%n,h=(a+2)%n,u=o(c,a),d=u+o(a,l),f=d+o(l,h);for(let m=0;m<e;m++){let _=u+(d-u)*m/e,g=(p,x,y,v)=>((v-_)*p+(_-y)*x)/(v-y);for(let[p,x]of[[i,s],[t,r]]){let y=g(p[c],p[a],0,u),v=g(p[a],p[l],u,d),T=g(p[l],p[h],d,f),w=g(y,v,0,d),R=g(v,T,u,f);x[a*e+m]=g(w,R,u,d)}}}return{x:s,z:r}}function bl(i,t,e){let n=i.length,s=new Float64Array(n+1);for(let l=0;l<n;l++)s[l+1]=s[l]+Math.hypot(i[(l+1)%n]-i[l],t[(l+1)%n]-t[l]);let r=s[n],o=Math.round(r/e),a=new Float64Array(o),c=new Float64Array(o);for(let l=0,h=0;l<o;l++){let u=l*r/o;for(;s[h+1]<u;)h++;let d=(u-s[h])/(s[h+1]-s[h]||1);a[l]=i[h]+(i[(h+1)%n]-i[h])*d,c[l]=t[h]+(t[(h+1)%n]-t[h])*d}return{x:a,z:c,spacing:r/o,length:r}}function A1(i,t){let{x:e,z:n}=i;for(let s=0;s<10;s++){let r=e.length,o=i.spacing,a=new Float64Array(r);for(let x=0;x<r;x++)a[x]=Math.atan2(n[(x+1)%r]-n[x],e[(x+1)%r]-e[x]);let c=new Float64Array(r);for(let x=0;x<r;x++)c[x]=wl(a[x]-a[(x-1+r)%r]);let l=o/t,h=0;for(let x=0;x<r;x++)h=Math.max(h,Math.abs(c[x]));if(h<=l*1.001)break;let u=l*.98,d=Float64Array.from(c);for(let x=0;x<r;x++){if(Math.abs(d[x])<=u)continue;let y=Math.sign(d[x]),v=Math.abs(d[x])-u;d[x]=y*u;for(let T=1;v>1e-12&&T<r/2;T++)for(let w of[(x+T)%r,(x-T+r)%r]){let R=u-y*d[w];if(R<=0)continue;let E=Math.min(R,v/2+1e-15,v);d[w]+=y*E,v-=E}}let f=Math.round(60/o),m=0;for(;m<r&&Math.abs(d[m]-c[m])>1e-12;)m++;let _=[];for(let x=m;x<m+r;x++){if(Math.abs(d[x%r]-c[x%r])<=1e-12)continue;let y=_[_.length-1];y&&x-f<=y[1]+f?y[1]=x+f:_.push([x-f,x+f])}let g=Float64Array.from(e),p=Float64Array.from(n);for(let[x,y]of _){let v=D=>(D%r+r)%r,T=a[v(x-1)],w=e[v(x)],R=n[v(x)],E=y-x,S=new Float64Array(E+1),M=new Float64Array(E+1);for(let D=0;D<=E;D++)S[D]=w,M[D]=R,T+=d[v(x+D)],w+=Math.cos(T)*o,R+=Math.sin(T)*o;let C=e[v(y)]-S[E],U=n[v(y)]-M[E];for(let D=0;D<=E;D++){let N=Pe(D/E);g[v(x+D)]=S[D]+C*N,p[v(x+D)]=M[D]+U*N}}i=bl(g,p,Rd),e=i.x,n=i.z}return i}function E1(i){let t=Float64Array.from(i,p=>p.x),e=Float64Array.from(i,p=>p.y),n=w1(t,e,32),s=bl(n.x,n.z,Rd),r=A1(s,u1),{x:o,z:a,spacing:c,length:l}=bl(r.x,r.z,h1),h=o.length,u=new Float64Array(h),d=new Float64Array(h),f=new Float64Array(h),m=new Float64Array(h),_=new Float64Array(h),g=new Float64Array(h);for(let p=0;p<h;p++){let x=(p+1)%h,y=(p-1+h)%h,v=o[x]-o[y],T=a[x]-a[y],w=Math.hypot(v,T)||1;u[p]=v/w,d[p]=T/w,f[p]=-d[p],m[p]=u[p],_[p]=p*c;let R=Math.atan2(a[p]-a[y],o[p]-o[y]),E=Math.atan2(a[x]-a[p],o[x]-o[p]);g[p]=wl(E-R)/c}return{x:o,z:a,tx:u,tz:d,nx:f,nz:m,s:_,curvature:g,count:h,spacing:c,length:l}}function T1(i){let{count:t,curvature:e,spacing:n}=i,s={};for(let r of[1,-1]){let o=new Float64Array(t);for(let c=0;c<t;c++){let l=Math.max(r*e[c],r*e[(c+1)%t],r*e[(c-1+t)%t]);o[c]=l>0?f1/l:1/0}let a=d1*n;for(let c=0;c<2;c++){for(let l=1;l<=t;l++)o[l%t]=Math.min(o[l%t],o[(l-1)%t]+a);for(let l=t-1;l>=-1;l--)o[(l+t)%t]=Math.min(o[(l+t)%t],o[(l+1)%t]+a)}s[r]=o}return s}function R1(i){let{count:t,x:e,z:n,spacing:s}=i,r=Math.round(g1/s),o=new Float64Array(t);for(let a=0;a<t;a++){let c=(a-r+t)%t,l=(a+r)%t,h=Math.atan2(n[a]-n[c],e[a]-e[c]),u=Math.atan2(n[l]-n[a],e[l]-e[a]);o[a]=wl(u-h)}return o}function C1(i,t){let e=i.length,n=Math.round(_1/t),s=new Float64Array(e);for(let r=0;r<e;r++){let o=0;for(let a=-n;a<=n;a++)o=Math.max(o,Math.abs(i[(r+a+e)%e]));s[r]=zt((o-.025)/.05,0,1)}return s}function I1(i,t,e){let n=i.length,s=c=>i[(c%n+n)%n]>.5,r=0;for(;r<n&&s(r);)r++;let o=[];for(let c=r;c<r+n;c++){if(!s(c))continue;let l=c;for(;l+1<r+n&&s(l+1);)l++;(l-c+1)*e>x1&&o.push({first:c,last:l,subCorners:[]}),c=l}let a=Math.round(y1/e);for(let c of o){let l=[];for(let f=c.first;f<=c.last;f++)l.push(Math.abs(t[f%n])>v1?Math.sign(t[f%n]):0);for(let f=0;f<2;f++)for(let m=0;m<l.length;m++){let _=f?l.length-1-m:m,g=f?_+1:_-1;!l[_]&&g>=0&&g<l.length&&l[g]&&(l[_]=l[g])}for(let f=0;f<l.length;f++)l[f]||(l[f]=1);let h=[];for(let f=0;f<l.length;f++)h.length&&h[h.length-1].direction===l[f]?h[h.length-1].length++:h.push({direction:l[f],length:1});let u=!0;for(;u&&h.length>1;){u=!1;let f=-1;for(let _=0;_<h.length;_++)h[_].length<a&&(f<0||h[_].length<h[f].length)&&(f=_);if(f<0)break;let m=f===0?1:f===h.length-1||h[f-1].length>=h[f+1].length?f-1:f+1;h[m].length+=h[f].length,h.splice(f,1);for(let _=h.length-1;_>0;_--)h[_].direction===h[_-1].direction&&(h[_-1].length+=h[_].length,h.splice(_,1));u=!0}let d=c.first;for(let f of h)c.subCorners.push({first:d,last:d+f.length-1,direction:f.direction}),d+=f.length}return o}function P1(i,t,e){let n=Math.round(M1/e),s=Math.round(S1/e),r=Math.round(b1/e),o={1:new Uint8Array(t),[-1]:new Uint8Array(t)};for(let l of i)for(let h of l.subCorners)for(let u=h.first;u<=h.last;u++)o[h.direction][u%t]=1;let a={1:new Uint8Array(t),[-1]:new Uint8Array(t)};for(let l of i)l.subCorners.forEach((h,u)=>{let d=-h.direction,f=h.first-(u===0?n:0),m=h.last+(u===l.subCorners.length-1?s:0);for(let _=h.first;_<=h.last;_++)a[d][_%t]=1;for(let _=h.first-1;_>=f&&!o[d][(_%t+t)%t];_--)a[d][(_%t+t)%t]=1;for(let _=h.last+1;_<=m&&!o[d][_%t];_++)a[d][_%t]=1});for(let l of[1,-1]){let h=a[l],u=0;for(;u<t&&!h[u];)u++;if(u!==t)for(let d=u;d<u+t;d++){if(h[d%t])continue;let f=d;for(;f+1<u+t&&!h[(f+1)%t];)f++;let m=f-d+1<=r;for(let _=d;m&&_<=f;_++)o[l][_%t]&&(m=!1);if(m)for(let _=d;_<=f;_++)h[_%t]=1;d=f}}let c=[];for(let l of[1,-1]){let h=a[l],u=0;for(;u<t&&h[u];)u++;if(u===t){c.push({side:l,first:0,last:t});continue}for(let d=u;d<u+t;d++){if(!h[d%t])continue;let f=d;for(;f+1<u+t&&h[(f+1)%t];)f++;c.push({side:l,first:d,last:f}),d=f}}return c}function L1(i){let{count:t,x:e,z:n,spacing:s}=i,r=new Float64Array(t);for(let c=0;c<t;c++)r[c]=Math.abs(n[c]-lr.straightZ)<1.5&&e[c]<470&&e[c]>-540?1:0;let o=Math.round(m1/s/2),a=new Float64Array(t);for(let c=0;c<t;c++){let l=0;for(let h=-o;h<=o;h++)l+=r[(c+h+t)%t];a[c]=Td+(p1-Td)*Pe(l/(2*o+1))}return a}function D1(i){let t=E1(i),e=T1(t),n=R1(t),s=C1(n,t.spacing),r=I1(s,n,t.spacing);return{line:t,count:t.count,halfWidth:L1(t),turn:n,cornerness:s,corners:r,gravel:P1(r,t.count,t.spacing),edge(o,a){let c=e[a>0?1:-1][o];return a>c?c:a<-c?-c:a}}}var ur=60;function U1(i){let t=new Map;for(let e=0;e<i.length;e++){let n=Math.floor(i[e].x/ur)+","+Math.floor(i[e].y/ur);t.has(n)||t.set(n,[]),t.get(n).push(i[e])}return(e,n)=>{let s=Math.floor(e/ur),r=Math.floor(n/ur),o=1e12;for(let a=-1;a<=1;a++)for(let c=-1;c<=1;c++){let l=t.get(s+a+","+(r+c));if(l)for(let h of l){let u=(h.x-e)**2+(h.y-n)**2;u<o&&(o=u)}}return o===1e12?ur*1.5:Math.sqrt(o)}}function N1(i,t){let e=lr;return i>e.paddock.x0-30&&i<e.paddock.x1+30&&t>e.paddock.z0-20&&t<e.straightZ+60||i>e.grandstandX0-40&&i<e.grandstandX1+40&&t>e.straightZ&&t<e.grandstandZ+40}function Cd(i){return{model:D1(i),count:i.length,distanceToTrack:U1(i),isKeepClearZone:N1}}var F1=.01,Bo=.3,Ei=(i,t)=>(i%t+t)%t,fr=(i,t,e)=>typeof i=="function"?i(t,e):i;function zo(i,t,e,n){let{line:s}=i,r=n-e+1,o=new Float64Array(r*2),a=new Float64Array(r),c=0;for(let l=0;l<r;l++){let h=Ei(e+l,s.count),u=i.edge(h,fr(t,h,e+l));a[l]=u;let d=s.x[h]+s.nx[h]*u,f=s.z[h]+s.nz[h]*u;l>0&&(d-o[2*l-2])*s.tx[h]+(f-o[2*l-1])*s.tz[h]<F1&&(d=o[2*l-2],f=o[2*l-1],c++),o[2*l]=d,o[2*l+1]=f}return{points:o,offsets:a,held:c}}function Id(i,t,e){let n=(r,o,a,c,l,h)=>(c-o)*(l-r)-(a-r)*(h-o),s=0;for(let r=0;r+1<i.length/2;r++){let[o,a,c,l]=[i[2*r],i[2*r+1],i[2*r+2],i[2*r+3]],[h,u,d,f]=[t[2*r],t[2*r+1],t[2*r+2],t[2*r+3]],m=n(o,a,c,l,h,u),_=n(h,u,c,l,d,f);(m*e<-1e-9||_*e<-1e-9)&&(i[2*r+2]=o,i[2*r+3]=a,t[2*r+2]=h,t[2*r+3]=u,s++)}return s}function Al(i,t,e=0,n=[]){for(let s=0;s<i;s++){let r=e+s*2;t?n.push(r,r+2,r+1,r+1,r+2,r+3):n.push(r,r+1,r+2,r+1,r+3,r+2)}return n}function Pd(i,t,e,n,s,r){let o=new ce;return o.setAttribute("position",new Bt(i,3)),o.setAttribute("normal",new Bt(t,3)),o.setAttribute("uv",new Bt(e,2)),o.setIndex(n),o.userData.range=s,o.userData.repairs=r,o}var O1=(i,t)=>t||[0,i.line.count];function Ti(i,t,e,{range:n=null,y:s=0,vScale:r=1,uvAcross:o=[0,1],heightA:a=0,heightB:c=0,skirtB:l=null}={}){let{line:h}=i,[u,d]=O1(i,n),f=Ei(u,h.count),m=fr(t,f,u)>fr(e,f,u),_=zo(i,t,u,d),g=zo(i,e,u,d),p=Id(_.points,g.points,m?1:-1),x=[],y=[],v=[];for(let w=0;w<=d-u;w++){let R=Ei(u+w,h.count),E=_.offsets[w],S=g.offsets[w];x.push(_.points[2*w],s+a,_.points[2*w+1],g.points[2*w],s+c,g.points[2*w+1]);let M=(c-a)/(Math.abs(S-E)||1),C=S>E?1:-1,U=Math.hypot(M,1),D=-M*C*h.nx[R]/U,N=-M*C*h.nz[R]/U;y.push(D,1/U,N,D,1/U,N);let W=w*h.spacing*r;v.push(o[0],W,o[1],W)}let T=Al(d-u,m);if(l!==null){let w=x.length/3,R=g.offsets[0]>_.offsets[0]?1:-1;for(let E=0;E<=d-u;E++){let S=Ei(u+E,h.count),M=g.points[2*E],C=g.points[2*E+1];x.push(M,s+c,C,M,l,C);let U=R*h.nx[S],D=R*h.nz[S];y.push(U,0,D,U,0,D);let N=E*h.spacing*r;v.push(o[1],N,o[1],N)}Al(d-u,R<0,w,T)}return Pd(x,y,v,T,[u,d],{held:_.held+g.held,collapsed:p})}function Ld(i,t,[e,n],s,r){let{line:o}=i,a=Math.sign(fr(t,Ei(e,o.count),e))||1,c=zo(i,t,e,n),l=zo(i,(g,p)=>fr(t,g,p)+a*Bo,e,n),h=Id(c.points,l.points,-a),u=[],d=[],f=[],m=[],_=[[c,c,0,s,0,1,-1],[l,l,s,0,1,0,1],[c,l,s,s,.96,1,0]];for(let[g,p,x,y,v,T,w]of _){let R=u.length/3;for(let E=0;E<=n-e;E++){let S=Ei(e+E,o.count);u.push(g.points[2*E],x,g.points[2*E+1],p.points[2*E],y,p.points[2*E+1]);let M=w*a*o.nx[S],C=w*a*o.nz[S],U=w?0:1;d.push(M,U,C,M,U,C);let D=E*o.spacing*r;f.push(D,v,D,T)}Al(n-e,a<0,R,m)}for(let[g,p]of[[0,-1],[n-e,1]]){let x=Ei(e+g,o.count),y=u.length/3,[v,T,w,R]=[c.points[2*g],c.points[2*g+1],l.points[2*g],l.points[2*g+1]];u.push(v,0,T,v,s,T,w,s,R,w,0,R);let E=p*o.tx[x],S=p*o.tz[x];d.push(E,0,S,E,0,S,E,0,S,E,0,S);let M=Bo*r;f.push(0,0,0,1,M,1,M,0),a*p>0?m.push(y,y+1,y+2,y,y+2,y+3):m.push(y,y+2,y+1,y,y+3,y+2)}return Pd(u,d,f,m,[e,n],{held:c.held+l.held,collapsed:h})}function El(i,t,e,n,s,r){let o=s-e,a=r-n,c=o*o+a*a,l=c>0?Math.max(0,Math.min(1,((i-e)*o+(t-n)*a)/c)):0;return Math.hypot(i-e-l*o,t-n-l*a)}function B1(i,t,e,n,s,r,o,a){let c=(s-e)*(a-n)-(o-e)*(r-n);if(Math.abs(c)>1e-12){let l=Math.sign(c),h=((s-e)*(t-n)-(i-e)*(r-n))*l,u=((o-s)*(t-r)-(i-s)*(a-r))*l,d=((e-o)*(t-a)-(i-o)*(n-a))*l;if(h>=0&&u>=0&&d>=0)return 0}return Math.min(El(i,t,e,n,s,r),El(i,t,s,r,o,a),El(i,t,o,a,e,n))}function ko(){let i=new Map,t=[],e=[],n=(r,o)=>(r+32768)*65536+(o+32768);function s(r,o,a,c,l,h){let u=t.length;t.push(r),e.push(...o);for(let d=Math.floor(a/8);d<=Math.floor(l/8);d++)for(let f=Math.floor(c/8);f<=Math.floor(h/8);f++){let m=n(d,f),_=i.get(m);_||i.set(m,_=[]),_.push(u)}}return{get size(){return t.length},addTriangle(r,o,a,c,l,h){s(0,[r,o,a,c,l,h],Math.min(r,a,l),Math.min(o,c,h),Math.max(r,a,l),Math.max(o,c,h))},addSegment(r,o,a,c){this.addTriangle(r,o,a,c,a,c)},addDisc(r,o,a){s(1,[r,o,a,0,0,0],r-a,o-a,r+a,o+a)},distance(r,o,a){let c=1/0,l=new Set;for(let h=Math.floor((r-a)/8);h<=Math.floor((r+a)/8);h++)for(let u=Math.floor((o-a)/8);u<=Math.floor((o+a)/8);u++){let d=i.get(n(h,u));if(d)for(let f of d){if(l.has(f))continue;l.add(f);let m=f*6,_=t[f]===1?Math.hypot(r-e[m],o-e[m+1])-e[m+2]:B1(r,o,e[m],e[m+1],e[m+2],e[m+3],e[m+4],e[m+5]);_<c&&(c=_)}}return c}}}var Dd=1.6,ys=5.5,z1=24,Fd=31.4,k1=.95,Ud=ys+3,Vo=1.5,V1=15,H1=25,G1=20,W1=4,X1=3;function Y1(i,t){let e=o=>t.halfWidth[o],{length:n}=t.line,s=Ti(t,e,o=>-e(o),{y:we.asphalt,vScale:Math.round(n/12)/n,uvAcross:[0,14/12]}),r=new ct(s,i.materials.asphalt);r.receiveShadow=!0,r.name="track",i.root.add(r)}function q1(){let i=document.createElement("canvas");i.width=64,i.height=4;let t=i.getContext("2d"),e=t.createLinearGradient(0,0,64,0);return e.addColorStop(0,"rgba(0,0,0,0)"),e.addColorStop(.35,"rgba(0,0,0,1)"),e.addColorStop(.65,"rgba(0,0,0,1)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,64,4),new ni(i)}function Z1(i,t){let{materials:e}=i;e.rubber.map=q1(),e.rubber.opacity=.2;let n=o=>zt(t.turn[o]*12,-2.2,2.2),s=Ti(t,o=>2.6+n(o),o=>-3.4+n(o),{y:we.rubber}),r=new ct(s,e.rubber);r.renderOrder=1,i.root.add(r)}function $1(i,t){Object.assign(i.materials.line,{polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2});for(let e of[1,-1]){let n=Ti(t,r=>e*(t.halfWidth[r]-.15),r=>e*(t.halfWidth[r]-.45),{y:we.lines}),s=new ct(n,i.materials.line);s.receiveShadow=!0,i.root.add(s)}}function J1(i,t){let{materials:e,root:n}=i,{halfWidth:s}=t;for(let o of t.corners){let a=[o.first,o.last];for(let c of[1,-1]){let l=Ti(t,d=>c*s[d],d=>c*(s[d]+Dd),{range:a,y:we.kerbInner,vScale:.16666666666666666,heightB:we.kerbOuter-we.kerbInner,skirtB:we.runoff}),h=new ct(l,e.kerb);h.receiveShadow=!0,n.add(h);let u=Ti(t,d=>c*(s[d]+Dd),d=>c*(s[d]+ys),{range:a,y:we.runoff});n.add(new ct(u,e.runoff))}}let r=ko();for(let{side:o,first:a,last:c,width:l}of K1(t)){let h=Ti(t,d=>o*(s[d]+ys),(d,f)=>o*(s[d]+ys+l[f-a]),{range:[a,c],y:we.gravel,vScale:.1});Q1(r,h);let u=new ct(h,e.gravel);u.receiveShadow=!0,n.add(u)}for(let{side:o,first:a,last:c}of j1(t,r)){let l=Ld(t,u=>o*(s[u]+Fd),[a,c],k1,.14285714285714285),h=new ct(l,e.barrier);h.castShadow=!0,h.receiveShadow=!0,n.add(h)}}function Nd(i,t){let e=i.length,n=new Float64Array(e),s=0;for(let r=-t;r<=t;r++)s+=i[(r+e)%e];for(let r=0;r<e;r++)n[r]=s/(2*t+1),s+=i[(r+t+1)%e]-i[(r-t+e)%e];return n}function K1(i){let{line:t,halfWidth:e}=i,n=t.count,s=Math.round(H1/2/t.spacing),r=Float64Array.from(i.cornerness,c=>zt(c,.3,1)),o=Nd(Nd(r,s),s),a=[];for(let{side:c,first:l,last:h}of i.gravel){let u=h-l+1,d=Math.min(G1,.3*(u-1)*t.spacing),f=new Float64Array(u),m=new Uint8Array(u);for(let x=0;x<u;x++){let y=(l+x)%n,v=z1*o[y],T=Math.min(W1,v),w=Math.min(x,u-1-x)*t.spacing,R=T+(v-T)*Pe(zt(w/d,0,1)),E=Math.abs(i.edge(y,c*(e[y]+ys))),S=Math.abs(i.edge(y,c*(e[y]+ys+R)))-E;f[x]=Math.min(R,S),m[x]=f[x]>=X1?1:0}let _=Tl(m,2);if(!_.length)continue;let[g,p]=_.reduce((x,y)=>y[1]-y[0]>x[1]-x[0]?y:x);a.push({side:c,first:l+g,last:l+p,width:f.subarray(g,p+1)})}return a}function Q1(i,t){let e=t.attributes.position,n=t.index;for(let s=0;s<n.count;s+=3){let[r,o,a]=[n.getX(s),n.getX(s+1),n.getX(s+2)];i.addTriangle(e.getX(r),e.getZ(r),e.getX(o),e.getZ(o),e.getX(a),e.getZ(a))}}function Tl(i,t){let e=[];for(let n=0;n<i.length;n++){if(!i[n])continue;let s=n;for(;s+1<i.length&&i[s+1];)s++;s-n+1>=t&&e.push([n,s]),n=s}return e}function j1(i,t){let{line:e,halfWidth:n}=i,s=e.count,r=Math.ceil(V1/e.spacing)+1,o=ko();for(let u=0;u<s;u++)o.addDisc(e.x[u],e.z[u],n[u]);let a=(u,d)=>{let f=u*(n[d]+Fd),m=f+u*Bo;return[f,m].map(_=>[e.x[d]+e.nx[d]*_,e.z[d]+e.nz[d]*_,_])},c=[];for(let{side:u,first:d,last:f}of i.gravel){let m=new Uint8Array(f-d+1);for(let _=0;_<m.length;_++){let g=(d+_)%s;m[_]=a(u,g).every(([p,x,y])=>i.edge(g,y)===y&&o.distance(p,x,Ud)>=Ud&&t.distance(p,x,Vo)>=Vo)?1:0}for(let[_,g]of Tl(m,r))c.push({side:u,first:d+_,last:d+g})}c.sort((u,d)=>d.last-d.first-(u.last-u.first)||u.first-d.first);let l=ko(),h=[];for(let{side:u,first:d,last:f}of c){let m=new Uint8Array(f-d+1);for(let v=0;v<m.length;v++)m[v]=a(u,(d+v)%s).every(([T,w])=>l.distance(T,w,Vo)>=Vo)?1:0;let _=Tl(m,r);if(!_.length)continue;let[g,p]=_.reduce((v,T)=>T[1]-T[0]>v[1]-v[0]?T:v),x={side:u,first:d+g,last:d+p};h.push(x);let y=null;for(let v=x.first;v<=x.last;v++){let T=a(u,v%s);if(y)for(let w=0;w<2;w++)l.addSegment(y[w][0],y[w][1],T[w][0],T[w][1]);(v===x.first||v===x.last)&&l.addSegment(T[0][0],T[0][1],T[1][0],T[1][1]),y=T}}return h.sort((u,d)=>d.side-u.side||u.first-d.first)}function Od(i,t){let{model:e}=t;i.root.userData.trackModel=e,Y1(i,e),Z1(i,e),$1(i,e),J1(i,e)}function Bd(i,t){return xs(i.map(([e,n,s,r,o=1])=>{let a=t();return a.scale(r,r*o,r),a.translate(e,n,s),a}))}function tS(){return Bd([[0,0,0,1,.42],[.62,-.06,.18,.62,.42],[-.58,-.04,-.22,.66,.42],[.08,.04,-.62,.58,.42],[-.2,.03,.6,.6,.42]],()=>new He(1,10,7))}function eS(){return Bd([[0,0,0,1],[.55,-.15,.25,.7],[-.5,-.1,-.3,.72],[.1,.38,-.1,.6]],()=>new er(1,1))}function zd(i,t){let{rng:e,materials:n,density:s,root:r}=i,{distanceToTrack:o,isKeepClearZone:a}=t,c=Math.round(2600*s),l=Math.round(2200*s),h=Math.round(1800*s),u=tS(),d=eS(),f=new Ye(u,n.pine,c),m=new Ye(new te(.16,.3,1,6),n.trunk,c),_=new Ye(d,n.oak,l),g=new Ye(new er(1,1),n.shrub,h),p=new Vt,x=new Ie,y=new P,v=new P,T=new Ve,w=new Nt,R=(S,M,C)=>{for(let U=0;U<60;U++){let D=e()*Math.PI*2,N=Math.sqrt(e())*M,W=Math.cos(D)*N*1.3,B=Math.sin(D)*N*.9,K=o(W,B);if(!(K<S||a(W,B))&&!(pn(W/160,B/160,3)*.9+.2<C*e()))return[W,B,K]}return null},E=0;for(let S=0;S<c;S++){let M=R(38,1350,.9);if(!M)continue;let[C,U]=M,D=9+e()*8,N=4+e()*3.5;T.set((e()-.5)*.12,e()*6,(e()-.5)*.12),x.setFromEuler(T),p.compose(v.set(C,D*.5,U),x,y.set(1,D,1)),m.setMatrixAt(E,p),p.compose(v.set(C,D,U),x,y.set(N,N*.9,N)),f.setMatrixAt(E,p),f.setColorAt(E,w.setHSL(.25+e()*.04,.22+e()*.1,.24+e()*.08)),E++}f.count=m.count=E,E=0;for(let S=0;S<l;S++){let M=R(34,1400,.7);if(!M)continue;let[C,U]=M,D=3+e()*3.4;p.compose(v.set(C,D*.8,U),x.identity(),y.set(D,D*.85,D)),_.setMatrixAt(E,p),_.setColorAt(E,w.setHSL(.2+e()*.07,.2+e()*.12,.3+e()*.1)),E++}_.count=E,E=0;for(let S=0;S<h;S++){let M=R(20,1200,.4);if(!M)continue;let[C,U]=M,D=.8+e()*1.6;p.compose(v.set(C,D*.35,U),x.identity(),y.set(D*1.4,D*.7,D*1.2)),g.setMatrixAt(E,p),g.setColorAt(E,w.setHSL(.17+e()*.07,.16+e()*.12,.4+e()*.1)),E++}g.count=E;for(let S of[f,m,_,g])S.castShadow=i.quality!=="low",S.receiveShadow=!0,r.add(S)}function kd(i,t){let{rng:e,track:n,root:s,updaters:r}=i,o=i.layout,{distanceToTrack:a,isKeepClearZone:c,count:l}=t,h=new _t({map:Mf(),alphaTest:.45,side:me,roughness:1,color:14870728});h.onBeforeCompile=x=>{x.uniforms.uTime={value:0},h.userData.sh=x,x.vertexShader=`uniform float uTime;
`+x.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        float sway = sin(uTime * 1.7 + instanceMatrix[3].x * .37 + instanceMatrix[3].z * .23) * .12 * uv.y;
        transformed.x += sway; transformed.z += sway * .6;`)};let u=new oe(1,.62);u.translate(0,.31,0);let d=Math.round(3e3*i.density),f=new Ye(u,h,d),m=new Vt,_=new Ie,g=new Ve,p=0;for(let x=0;x<d*3&&p<d;x++){let y=e(),v,T;if(y<.5)v=Qe(-560,460,e()),T=o.straightZ+12+e()*14;else{let R=Math.floor(e()*160),E=n[R],S=n[(R+1)%l],M=-(S.y-E.y),C=S.x-E.x,U=Math.hypot(M,C)||1,D=(e()>.5?1:-1)*(12+e()*22);v=E.x+M/U*D,T=E.y+C/U*D}if(c(v,T)&&T<o.straightZ+11||a(v,T)<9.5)continue;g.set(0,e()*Math.PI,0),_.setFromEuler(g);let w=.55+e()*.6;m.compose(new P(v,0,T),_,new P(w,w,w)),f.setMatrixAt(p++,m)}f.count=p,s.add(f),r.push(x=>{h.userData.sh&&(h.userData.sh.uniforms.uTime.value=x)})}function Vd(i,{quality:t="high"}={}){let e=hd(i,t),n=e.layout,s=Cd(e.track);Ad(e),Ed(e),Od(e,s),Sd(e),bd(e),dd(e),fd(e),pd(e),yd(e),zd(e,s),kd(e,s),hr(e,n.grandstandX0+8,17,n.grandstandZ+16,15282981,e.root),hr(e,n.grandstandX1-8,17,n.grandstandZ+16,16118766,e.root),od(e);let{updaters:r}=e;return{root:e.root,materials:e.materials,layout:n,track:e.track,update(o,a){for(let c of r)c(o,a)}}}var nS=[.26,.37,.47,.7,.95];async function qw({canvas:i,trackUrl:t,carUrl:e,carMetaUrl:n,quality:s="high",onProgress:r=()=>{}}){let o=qf(i,s),a=Yf(s),c=new ei;c.fog=new ro(14279913,140,3300);let l=new Ne(36,1,.3,9e3),h=Lu(l),u=Kf(),d=Qf(u);c.add(d);let{hemi:f,sun:m}=Df(c,o,s),_=td({renderer:o,scene:c,skyMaterial:u,quality:s}),g=Vf(s),[p,x]=await Promise.all([fetch(t).then(at=>at.json()),fetch(n).then(at=>at.json())]);r(.15);let y=p.pts,v=Vd(y,{quality:s,renderer:o});c.add(v.root),r(.35);let T=await Zu(e,x,{quality:s,onProgress:at=>at.total&&r(.35+.55*at.loaded/at.total)});c.add(T.root),kf(T.root),r(.92);let w=rd(v.root.userData.trackModel);c.add(w.mesh);let R=v.root.userData.openBox,E=Rf();c.add(...E.members),Cf(c);let S=If(c);h.build(c,{sky:d,movers:[T.root,...E.members,...S.map(([at])=>at)]});let M=Du(y),C=cf(M),U=rf(M,y),D=of(gl(U)),N=gl(U).map(at=>at[1]),W=Ju(v.root,C,N,T.contacts),B=lf(T,C,U.arrival,{roadHeight:W.heightAt}),K=Eu(l,Su,B.frame),F=Xf(),st=performance.now(),ht=0,Y=!1,Q=!0,mt=0,X=0,et=0,dt=Zf(i,o,l,a);function ot(at){mt=requestAnimationFrame(ot);let yt=Math.min(.05,(at-st)/1e3);if(st=at,ht+=yt,!Q)return;dt.update(),F.advance(yt);let It=F.value,Z=F.introEase,rt=D(It);F.intro<1&&(rt=af(rt,F.intro,U)),B.update(rt,yt,ht),Pf(E,It,ht,C,U.pitBox,R),Lf(S,It,ht);let L=Uf(It),St=ed(L),it=Nf(St);Ff(St,{sun:m,hemi:f}),jf(u,St,it),Of(St,{scene:c,renderer:o}),_.refreshIfNeeded(L),K.update({progress:It,introEase:Z,clock:ht,debugCam:pt.debugCam,width:dt.width,height:dt.height,framingX:X,framingY:et}),h.update(K.position,K.target),Bf(m,it,K.position,K.target,B.frame.p),w.update(It,yt,F.snap,pt.basePixelRatio*dt.resScale),v.update(ht,yt),Gf(o,c,l,g,Hf(g,It))}_.capture(0),$f(c,o,s),Jf(c),r(1);let pt={renderer:o,scene:c,camera:l,car:T,world:v,STAGES:Wf,setProgress(at){F.target=zt(at,0,1)},get progress(){return F.value},skipIntro(){F.finishIntro()},jump(at){F.target=F.value=zt(at,0,1),F.velocity=0,B.lastDistance=D(F.value),F.finishIntro()},async warmup(){let at=[];c.traverse(It=>{It.visible||(at.push(It),It.visible=!0)});try{o.compileAsync&&o.extensions.has("KHR_parallel_shader_compile")?await o.compileAsync(c,l):o.compile(c,l)}catch{}for(let It of at)It.visible=!1;let yt=[F.value,B.lastDistance,B.wheelDistance,F.intro,F.introDone];for(let It of nS)pt.renderAt(It),await new Promise(Z=>requestAnimationFrame(Z));[F.value,B.lastDistance,B.wheelDistance,F.intro,F.introDone]=yt,F.target=F.value,F.velocity=0,B.speed=B.prevSpeed=0,F.snap=!1},setFraming(at=0,yt=0){X=at,et=yt},start(){Y||(Y=!0,F.snap=!1,st=performance.now(),mt=requestAnimationFrame(ot))},stop(){Y=!1,cancelAnimationFrame(mt)},setVisible(at){Q=at},renderAt(at,{intro:yt=1,speed:It=null,dt:Z=0}={}){F.target=F.value=at,F.velocity=0,F.intro=yt,F.introDone=yt>=1,F.snap=!0,Z||(B.lastDistance=D(at)),It!=null&&(B.speed=It),st=performance.now()-Z*1e3,ot(performance.now()),cancelAnimationFrame(mt)},debugCam:null,setResScale(at){dt.resScale=zt(at,.2,1)},get resScale(){return dt.resScale},get basePixelRatio(){return Math.min(window.devicePixelRatio||1,a)}};return pt}export{qw as createJourney};
