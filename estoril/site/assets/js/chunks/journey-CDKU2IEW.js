var oh="170";var tg=0,Tu=1,eg=2;var Vf=1,ah=2,Zn=3,vi=0,$e=1,_e=2,xi=0,Is=1,Ru=2,Cu=3,Iu=4,ng=5,ki=100,ig=101,sg=102,rg=103,og=104,ag=200,cg=201,lg=202,hg=203,Bc=204,zc=205,ug=206,fg=207,dg=208,pg=209,mg=210,gg=211,xg=212,_g=213,yg=214,kc=0,Vc=1,Hc=2,Ns=3,Gc=4,Wc=5,Xc=6,Yc=7,Hf=0,vg=1,Mg=2,_i=0,Sg=1,bg=2,wg=3,Ag=4,Eg=5,ch=6,Tg=7;var Gf=300,Us=301,Fs=302,qc=303,Zc=304,fa=306,He=1e3,Jn=1001,$c=1002,fn=1003,Rg=1004;var ao=1005;var We=1006,nc=1007;var En=1008;var ti=1009,Wf=1010,Xf=1011,Sr=1012,lh=1013,Hi=1014,Nn=1015,ni=1016,hh=1017,uh=1018,Os=1020,Yf=35902,qf=1021,Zf=1022,Fe=1023,$f=1024,Jf=1025,Ps=1026,Bs=1027,Ji=1028,fh=1029,Kf=1030,dh=1031;var ph=1033,Oo=33776,Bo=33777,zo=33778,ko=33779,Jc=35840,Kc=35841,jc=35842,Qc=35843,tl=36196,el=37492,nl=37496,il=37808,sl=37809,rl=37810,ol=37811,al=37812,cl=37813,ll=37814,hl=37815,ul=37816,fl=37817,dl=37818,pl=37819,ml=37820,gl=37821,Vo=36492,xl=36494,_l=36495,jf=36283,yl=36284,vl=36285,Ml=36286;var Ho=2300,Sl=2301,ic=2302,Pu=2400,Lu=2401,Du=2402;var Cg=3200,mh=3201;var Qf=0,Ig=1,mi="",xe="srgb",Ei="srgb-linear",da="linear",de="srgb";var ls=7680;var Nu=519,Pg=512,Lg=513,Dg=514,td=515,Ng=516,Ug=517,Fg=518,Og=519,bl=35044;var Uu="300 es",Kn=2e3,Go=2001,Mi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Ye=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var sc=Math.PI/180,wl=180/Math.PI;function jn(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ye[i&255]+Ye[i>>8&255]+Ye[i>>16&255]+Ye[i>>24&255]+"-"+Ye[t&255]+Ye[t>>8&255]+"-"+Ye[t>>16&15|64]+Ye[t>>24&255]+"-"+Ye[e&63|128]+Ye[e>>8&255]+"-"+Ye[e>>16&255]+Ye[e>>24&255]+Ye[n&255]+Ye[n>>8&255]+Ye[n>>16&255]+Ye[n>>24&255]).toLowerCase()}function Ve(i,t,e){return Math.max(t,Math.min(e,i))}function Bg(i,t){return(i%t+t)%t}function rc(i,t,e){return(1-e)*i+e*t}function Dn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function pe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var ft=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ve(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Kt=class i{constructor(t,e,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],m=n[8],x=s[0],g=s[3],p=s[6],_=s[1],y=s[4],v=s[7],A=s[2],b=s[5],w=s[8];return r[0]=o*x+a*_+c*A,r[3]=o*g+a*y+c*b,r[6]=o*p+a*v+c*w,r[1]=l*x+h*_+u*A,r[4]=l*g+h*y+u*b,r[7]=l*p+h*v+u*w,r[2]=f*x+d*_+m*A,r[5]=f*g+d*y+m*b,r[8]=f*p+d*v+m*w,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,m=e*u+n*f+s*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/m;return t[0]=u*x,t[1]=(s*l-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=f*x,t[4]=(h*e-s*c)*x,t[5]=(s*r-a*e)*x,t[6]=d*x,t[7]=(n*c-l*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(oc.makeScale(t,e)),this}rotate(t){return this.premultiply(oc.makeRotation(-t)),this}translate(t,e){return this.premultiply(oc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},oc=new Kt;function ed(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function br(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function zg(){let i=br("canvas");return i.style.display="block",i}var Fu={};function xr(i){i in Fu||(Fu[i]=!0,console.warn(i))}function kg(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Vg(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Hg(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var ie={enabled:!0,workingColorSpace:Ei,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===de&&(i.r=Qn(i.r),i.g=Qn(i.g),i.b=Qn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===de&&(i.r=Ls(i.r),i.g=Ls(i.g),i.b=Ls(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===mi?da:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Qn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ls(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ou=[.64,.33,.3,.6,.15,.06],Bu=[.2126,.7152,.0722],zu=[.3127,.329],ku=new Kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vu=new Kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ie.define({[Ei]:{primaries:Ou,whitePoint:zu,transfer:da,toXYZ:ku,fromXYZ:Vu,luminanceCoefficients:Bu,workingColorSpaceConfig:{unpackColorSpace:xe},outputColorSpaceConfig:{drawingBufferColorSpace:xe}},[xe]:{primaries:Ou,whitePoint:zu,transfer:de,toXYZ:ku,fromXYZ:Vu,luminanceCoefficients:Bu,outputColorSpaceConfig:{drawingBufferColorSpace:xe}}});var hs,Al=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{hs===void 0&&(hs=br("canvas")),hs.width=t.width,hs.height=t.height;let n=hs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=hs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=br("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Qn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Qn(e[n]/255)*255):e[n]=Qn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Gg=0,Wo=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gg++}),this.uuid=jn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ac(s[o].image)):r.push(ac(s[o]))}else r=ac(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function ac(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Al.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Wg=0,tn=class i extends Mi{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Jn,s=Jn,r=We,o=En,a=Fe,c=ti,l=i.DEFAULT_ANISOTROPY,h=mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wg++}),this.uuid=jn(),this.name="",this.source=new Wo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ft(0,0),this.repeat=new ft(1,1),this.center=new ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Gf)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case He:t.x=t.x-Math.floor(t.x);break;case Jn:t.x=t.x<0?0:1;break;case $c:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case He:t.y=t.y-Math.floor(t.y);break;case Jn:t.y=t.y<0?0:1;break;case $c:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=Gf;tn.DEFAULT_ANISOTROPY=1;var ee=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],m=c[9],x=c[2],g=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(m+g)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let y=(l+1)/2,v=(d+1)/2,A=(p+1)/2,b=(h+f)/4,w=(u+x)/4,T=(m+g)/4;return y>v&&y>A?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=b/n,r=w/n):v>A?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=b/s,r=T/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=w/r,s=T/r),this.set(n,s,r,e),this}let _=Math.sqrt((g-m)*(g-m)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(_)<.001&&(_=1),this.x=(g-m)/_,this.y=(u-x)/_,this.z=(f-h)/_,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},El=class extends Mi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ee(0,0,t,e),this.scissorTest=!1,this.viewport=new ee(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:We,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new tn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Wo(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},gn=class extends El{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Xo=class extends tn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=fn,this.minFilter=fn,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Tl=class extends tn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=fn,this.minFilter=fn,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var we=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],d=r[o+1],m=r[o+2],x=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=m,t[e+3]=x;return}if(u!==x||c!==f||l!==d||h!==m){let g=1-a,p=c*f+l*d+h*m+u*x,_=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){let A=Math.sqrt(y),b=Math.atan2(A,p*_);g=Math.sin(g*b)/A,a=Math.sin(a*b)/A}let v=a*_;if(c=c*g+f*v,l=l*g+d*v,h=h*g+m*v,u=u*g+x*v,g===1-a){let A=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=A,l*=A,h*=A,u*=A}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],m=r[o+3];return t[e]=a*m+h*u+c*d-l*f,t[e+1]=c*m+h*f+l*u-a*d,t[e+2]=l*m+h*d+a*f-c*u,t[e+3]=h*m-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),d=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u-f*d*m;break;case"YXZ":this._x=f*h*u+l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u+f*d*m;break;case"ZXY":this._x=f*h*u-l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u-f*d*m;break;case"ZYX":this._x=f*h*u-l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u+f*d*m;break;case"YZX":this._x=f*h*u+l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u-f*d*m;break;case"XZY":this._x=f*h*u-l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u+f*d*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>u){let d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){let d=2*Math.sqrt(1+a-n-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ve(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Hu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Hu.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return cc.copy(this).projectOnVector(t),this.sub(cc)}reflect(t){return this.sub(cc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ve(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},cc=new L,Hu=new we,en=class{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(bn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(bn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=bn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,bn):bn.fromBufferAttribute(r,o),bn.applyMatrix4(t.matrixWorld),this.expandByPoint(bn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),co.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),co.copy(n.boundingBox)),co.applyMatrix4(t.matrixWorld),this.union(co)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,bn),bn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ar),lo.subVectors(this.max,ar),us.subVectors(t.a,ar),fs.subVectors(t.b,ar),ds.subVectors(t.c,ar),li.subVectors(fs,us),hi.subVectors(ds,fs),Di.subVectors(us,ds);let e=[0,-li.z,li.y,0,-hi.z,hi.y,0,-Di.z,Di.y,li.z,0,-li.x,hi.z,0,-hi.x,Di.z,0,-Di.x,-li.y,li.x,0,-hi.y,hi.x,0,-Di.y,Di.x,0];return!lc(e,us,fs,ds,lo)||(e=[1,0,0,0,1,0,0,0,1],!lc(e,us,fs,ds,lo))?!1:(ho.crossVectors(li,hi),e=[ho.x,ho.y,ho.z],lc(e,us,fs,ds,lo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,bn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(bn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Gn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Gn=[new L,new L,new L,new L,new L,new L,new L,new L],bn=new L,co=new en,us=new L,fs=new L,ds=new L,li=new L,hi=new L,Di=new L,ar=new L,lo=new L,ho=new L,Ni=new L;function lc(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ni.fromArray(i,r);let a=s.x*Math.abs(Ni.x)+s.y*Math.abs(Ni.y)+s.z*Math.abs(Ni.z),c=t.dot(Ni),l=e.dot(Ni),h=n.dot(Ni);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Xg=new en,cr=new L,hc=new L,Gi=class{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Xg.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;cr.subVectors(t,this.center);let e=cr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(cr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(hc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(cr.copy(t.center).add(hc)),this.expandByPoint(cr.copy(t.center).sub(hc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Wn=new L,uc=new L,uo=new L,ui=new L,fc=new L,fo=new L,dc=new L,Yo=class{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Wn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Wn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Wn.copy(this.origin).addScaledVector(this.direction,e),Wn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){uc.copy(t).add(e).multiplyScalar(.5),uo.copy(e).sub(t).normalize(),ui.copy(this.origin).sub(uc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(uo),a=ui.dot(this.direction),c=-ui.dot(uo),l=ui.lengthSq(),h=Math.abs(1-o*o),u,f,d,m;if(h>0)if(u=o*c-a,f=o*a-c,m=r*h,u>=0)if(f>=-m)if(f<=m){let x=1/h;u*=x,f*=x,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-m?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=m?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(uc).addScaledVector(uo,f),d}intersectSphere(t,e){Wn.subVectors(t.center,this.origin);let n=Wn.dot(this.direction),s=Wn.dot(Wn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Wn)!==null}intersectTriangle(t,e,n,s,r){fc.subVectors(e,t),fo.subVectors(n,t),dc.crossVectors(fc,fo);let o=this.direction.dot(dc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ui.subVectors(this.origin,t);let c=a*this.direction.dot(fo.crossVectors(ui,fo));if(c<0)return null;let l=a*this.direction.dot(fc.cross(ui));if(l<0||c+l>o)return null;let h=-a*ui.dot(dc);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Vt=class i{constructor(t,e,n,s,r,o,a,c,l,h,u,f,d,m,x,g){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,f,d,m,x,g)}set(t,e,n,s,r,o,a,c,l,h,u,f,d,m,x,g){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/ps.setFromMatrixColumn(t,0).length(),r=1/ps.setFromMatrixColumn(t,1).length(),o=1/ps.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=o*h,d=o*u,m=a*h,x=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+m*l,e[5]=f-x*l,e[9]=-a*c,e[2]=x-f*l,e[6]=m+d*l,e[10]=o*c}else if(t.order==="YXZ"){let f=c*h,d=c*u,m=l*h,x=l*u;e[0]=f+x*a,e[4]=m*a-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-m,e[6]=x+f*a,e[10]=o*c}else if(t.order==="ZXY"){let f=c*h,d=c*u,m=l*h,x=l*u;e[0]=f-x*a,e[4]=-o*u,e[8]=m+d*a,e[1]=d+m*a,e[5]=o*h,e[9]=x-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let f=o*h,d=o*u,m=a*h,x=a*u;e[0]=c*h,e[4]=m*l-d,e[8]=f*l+x,e[1]=c*u,e[5]=x*l+f,e[9]=d*l-m,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let f=o*c,d=o*l,m=a*c,x=a*l;e[0]=c*h,e[4]=x-f*u,e[8]=m*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+m,e[10]=f-x*u}else if(t.order==="XZY"){let f=o*c,d=o*l,m=a*c,x=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+x,e[5]=o*h,e[9]=d*u-m,e[2]=m*u-d,e[6]=a*h,e[10]=x*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Yg,t,qg)}lookAt(t,e,n){let s=this.elements;return hn.subVectors(t,e),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),fi.crossVectors(n,hn),fi.lengthSq()===0&&(Math.abs(n.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),fi.crossVectors(n,hn)),fi.normalize(),po.crossVectors(hn,fi),s[0]=fi.x,s[4]=po.x,s[8]=hn.x,s[1]=fi.y,s[5]=po.y,s[9]=hn.y,s[2]=fi.z,s[6]=po.z,s[10]=hn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],m=n[2],x=n[6],g=n[10],p=n[14],_=n[3],y=n[7],v=n[11],A=n[15],b=s[0],w=s[4],T=s[8],S=s[12],M=s[1],C=s[5],N=s[9],D=s[13],I=s[2],B=s[6],U=s[10],z=s[14],k=s[3],J=s[7],j=s[11],$=s[15];return r[0]=o*b+a*M+c*I+l*k,r[4]=o*w+a*C+c*B+l*J,r[8]=o*T+a*N+c*U+l*j,r[12]=o*S+a*D+c*z+l*$,r[1]=h*b+u*M+f*I+d*k,r[5]=h*w+u*C+f*B+d*J,r[9]=h*T+u*N+f*U+d*j,r[13]=h*S+u*D+f*z+d*$,r[2]=m*b+x*M+g*I+p*k,r[6]=m*w+x*C+g*B+p*J,r[10]=m*T+x*N+g*U+p*j,r[14]=m*S+x*D+g*z+p*$,r[3]=_*b+y*M+v*I+A*k,r[7]=_*w+y*C+v*B+A*J,r[11]=_*T+y*N+v*U+A*j,r[15]=_*S+y*D+v*z+A*$,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],m=t[3],x=t[7],g=t[11],p=t[15];return m*(+r*c*u-s*l*u-r*a*f+n*l*f+s*a*d-n*c*d)+x*(+e*c*d-e*l*f+r*o*f-s*o*d+s*l*h-r*c*h)+g*(+e*l*u-e*a*d-r*o*u+n*o*d+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*f+s*o*u-n*o*f+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],m=t[12],x=t[13],g=t[14],p=t[15],_=u*g*l-x*f*l+x*c*d-a*g*d-u*c*p+a*f*p,y=m*f*l-h*g*l-m*c*d+o*g*d+h*c*p-o*f*p,v=h*x*l-m*u*l+m*a*d-o*x*d-h*a*p+o*u*p,A=m*u*c-h*x*c-m*a*f+o*x*f+h*a*g-o*u*g,b=e*_+n*y+s*v+r*A;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let w=1/b;return t[0]=_*w,t[1]=(x*f*r-u*g*r-x*s*d+n*g*d+u*s*p-n*f*p)*w,t[2]=(a*g*r-x*c*r+x*s*l-n*g*l-a*s*p+n*c*p)*w,t[3]=(u*c*r-a*f*r-u*s*l+n*f*l+a*s*d-n*c*d)*w,t[4]=y*w,t[5]=(h*g*r-m*f*r+m*s*d-e*g*d-h*s*p+e*f*p)*w,t[6]=(m*c*r-o*g*r-m*s*l+e*g*l+o*s*p-e*c*p)*w,t[7]=(o*f*r-h*c*r+h*s*l-e*f*l-o*s*d+e*c*d)*w,t[8]=v*w,t[9]=(m*u*r-h*x*r-m*n*d+e*x*d+h*n*p-e*u*p)*w,t[10]=(o*x*r-m*a*r+m*n*l-e*x*l-o*n*p+e*a*p)*w,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*d-e*a*d)*w,t[12]=A*w,t[13]=(h*x*s-m*u*s+m*n*f-e*x*f-h*n*g+e*u*g)*w,t[14]=(m*a*s-o*x*s-m*n*c+e*x*c+o*n*g-e*a*g)*w,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*f+e*a*f)*w,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,m=r*u,x=o*h,g=o*u,p=a*u,_=c*l,y=c*h,v=c*u,A=n.x,b=n.y,w=n.z;return s[0]=(1-(x+p))*A,s[1]=(d+v)*A,s[2]=(m-y)*A,s[3]=0,s[4]=(d-v)*b,s[5]=(1-(f+p))*b,s[6]=(g+_)*b,s[7]=0,s[8]=(m+y)*w,s[9]=(g-_)*w,s[10]=(1-(f+x))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=ps.set(s[0],s[1],s[2]).length(),o=ps.set(s[4],s[5],s[6]).length(),a=ps.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],wn.copy(this);let l=1/r,h=1/o,u=1/a;return wn.elements[0]*=l,wn.elements[1]*=l,wn.elements[2]*=l,wn.elements[4]*=h,wn.elements[5]*=h,wn.elements[6]*=h,wn.elements[8]*=u,wn.elements[9]*=u,wn.elements[10]*=u,e.setFromRotationMatrix(wn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Kn){let c=this.elements,l=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s),d,m;if(a===Kn)d=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===Go)d=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Kn){let c=this.elements,l=1/(e-t),h=1/(n-s),u=1/(o-r),f=(e+t)*l,d=(n+s)*h,m,x;if(a===Kn)m=(o+r)*u,x=-2*u;else if(a===Go)m=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=x,c[14]=-m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},ps=new L,wn=new Vt,Yg=new L(0,0,0),qg=new L(1,1,1),fi=new L,po=new L,hn=new L,Gu=new Vt,Wu=new we,on=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ve(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ve(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ve(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ve(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Gu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Gu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Wu.setFromEuler(this),this.setFromQuaternion(Wu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};on.DEFAULT_ORDER="XYZ";var wr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Zg=0,Xu=new L,ms=new we,Xn=new Vt,mo=new L,lr=new L,$g=new L,Jg=new we,Yu=new L(1,0,0),qu=new L(0,1,0),Zu=new L(0,0,1),$u={type:"added"},Kg={type:"removed"},gs={type:"childadded",child:null},pc={type:"childremoved",child:null},Ge=class i extends Mi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zg++}),this.uuid=jn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new L,e=new on,n=new we,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Vt},normalMatrix:{value:new Kt}}),this.matrix=new Vt,this.matrixWorld=new Vt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new wr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ms.setFromAxisAngle(t,e),this.quaternion.multiply(ms),this}rotateOnWorldAxis(t,e){return ms.setFromAxisAngle(t,e),this.quaternion.premultiply(ms),this}rotateX(t){return this.rotateOnAxis(Yu,t)}rotateY(t){return this.rotateOnAxis(qu,t)}rotateZ(t){return this.rotateOnAxis(Zu,t)}translateOnAxis(t,e){return Xu.copy(t).applyQuaternion(this.quaternion),this.position.add(Xu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Yu,t)}translateY(t){return this.translateOnAxis(qu,t)}translateZ(t){return this.translateOnAxis(Zu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Xn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?mo.copy(t):mo.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),lr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xn.lookAt(lr,mo,this.up):Xn.lookAt(mo,lr,this.up),this.quaternion.setFromRotationMatrix(Xn),s&&(Xn.extractRotation(s.matrixWorld),ms.setFromRotationMatrix(Xn),this.quaternion.premultiply(ms.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent($u),gs.child=t,this.dispatchEvent(gs),gs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Kg),pc.child=t,this.dispatchEvent(pc),pc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Xn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Xn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Xn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent($u),gs.child=t,this.dispatchEvent(gs),gs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lr,t,$g),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lr,Jg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Ge.DEFAULT_UP=new L(0,1,0);Ge.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var An=new L,Yn=new L,mc=new L,qn=new L,xs=new L,_s=new L,Ju=new L,gc=new L,xc=new L,_c=new L,yc=new ee,vc=new ee,Mc=new ee,gi=class i{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),An.subVectors(t,e),s.cross(An);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){An.subVectors(s,e),Yn.subVectors(n,e),mc.subVectors(t,e);let o=An.dot(An),a=An.dot(Yn),c=An.dot(mc),l=Yn.dot(Yn),h=Yn.dot(mc),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(l*c-a*h)*f,m=(o*h-a*c)*f;return r.set(1-d-m,m,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,qn)===null?!1:qn.x>=0&&qn.y>=0&&qn.x+qn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,qn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,qn.x),c.addScaledVector(o,qn.y),c.addScaledVector(a,qn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return yc.setScalar(0),vc.setScalar(0),Mc.setScalar(0),yc.fromBufferAttribute(t,e),vc.fromBufferAttribute(t,n),Mc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(yc,r.x),o.addScaledVector(vc,r.y),o.addScaledVector(Mc,r.z),o}static isFrontFacing(t,e,n,s){return An.subVectors(n,e),Yn.subVectors(t,e),An.cross(Yn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return An.subVectors(this.c,this.b),Yn.subVectors(this.a,this.b),An.cross(Yn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;xs.subVectors(s,n),_s.subVectors(r,n),gc.subVectors(t,n);let c=xs.dot(gc),l=_s.dot(gc);if(c<=0&&l<=0)return e.copy(n);xc.subVectors(t,s);let h=xs.dot(xc),u=_s.dot(xc);if(h>=0&&u<=h)return e.copy(s);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(xs,o);_c.subVectors(t,r);let d=xs.dot(_c),m=_s.dot(_c);if(m>=0&&d<=m)return e.copy(r);let x=d*l-c*m;if(x<=0&&l>=0&&m<=0)return a=l/(l-m),e.copy(n).addScaledVector(_s,a);let g=h*m-d*u;if(g<=0&&u-h>=0&&d-m>=0)return Ju.subVectors(r,s),a=(u-h)/(u-h+(d-m)),e.copy(s).addScaledVector(Ju,a);let p=1/(g+x+f);return o=x*p,a=f*p,e.copy(n).addScaledVector(xs,o).addScaledVector(_s,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},nd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},di={h:0,s:0,l:0},go={h:0,s:0,l:0};function Sc(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Ot=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=xe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ie.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ie.workingColorSpace){return this.r=t,this.g=e,this.b=n,ie.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ie.workingColorSpace){if(t=Bg(t,1),e=Ve(e,0,1),n=Ve(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Sc(o,r,t+1/3),this.g=Sc(o,r,t),this.b=Sc(o,r,t-1/3)}return ie.toWorkingColorSpace(this,s),this}setStyle(t,e=xe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=xe){let n=nd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Qn(t.r),this.g=Qn(t.g),this.b=Qn(t.b),this}copyLinearToSRGB(t){return this.r=Ls(t.r),this.g=Ls(t.g),this.b=Ls(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=xe){return ie.fromWorkingColorSpace(qe.copy(this),t),Math.round(Ve(qe.r*255,0,255))*65536+Math.round(Ve(qe.g*255,0,255))*256+Math.round(Ve(qe.b*255,0,255))}getHexString(t=xe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ie.workingColorSpace){ie.fromWorkingColorSpace(qe.copy(this),e);let n=qe.r,s=qe.g,r=qe.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ie.workingColorSpace){return ie.fromWorkingColorSpace(qe.copy(this),e),t.r=qe.r,t.g=qe.g,t.b=qe.b,t}getStyle(t=xe){ie.fromWorkingColorSpace(qe.copy(this),t);let e=qe.r,n=qe.g,s=qe.b;return t!==xe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(di),this.setHSL(di.h+t,di.s+e,di.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(di),t.getHSL(go);let n=rc(di.h,go.h,e),s=rc(di.s,go.s,e),r=rc(di.l,go.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},qe=new Ot;Ot.NAMES=nd;var jg=0,Si=class extends Mi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:jg++}),this.uuid=jn(),this.name="",this.blending=Is,this.side=vi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Bc,this.blendDst=zc,this.blendEquation=ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ot(0,0,0),this.blendAlpha=0,this.depthFunc=Ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ls,this.stencilZFail=ls,this.stencilZPass=ls,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Is&&(n.blending=this.blending),this.side!==vi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Bc&&(n.blendSrc=this.blendSrc),this.blendDst!==zc&&(n.blendDst=this.blendDst),this.blendEquation!==ki&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ns&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Nu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ls&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ls&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ls&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Ae=class extends Si{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=Hf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ne=new L,xo=new ft,Oe=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=bl,this.updateRanges=[],this.gpuType=Nn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)xo.fromBufferAttribute(this,e),xo.applyMatrix3(t),this.setXY(e,xo.x,xo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix3(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix4(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyNormalMatrix(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.transformDirection(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Dn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=pe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Dn(e,this.array)),e}setX(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Dn(e,this.array)),e}setY(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Dn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Dn(e,this.array)),e}setW(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array),s=pe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array),s=pe(s,this.array),r=pe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==bl&&(t.usage=this.usage),t}};var qo=class extends Oe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Zo=class extends Oe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var kt=class extends Oe{constructor(t,e,n){super(new Float32Array(t),e,n)}},Qg=0,mn=new Vt,bc=new Ge,ys=new L,un=new en,hr=new en,ke=new L,se=class i extends Mi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Qg++}),this.uuid=jn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ed(t)?Zo:qo)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Kt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return mn.makeRotationFromQuaternion(t),this.applyMatrix4(mn),this}rotateX(t){return mn.makeRotationX(t),this.applyMatrix4(mn),this}rotateY(t){return mn.makeRotationY(t),this.applyMatrix4(mn),this}rotateZ(t){return mn.makeRotationZ(t),this.applyMatrix4(mn),this}translate(t,e,n){return mn.makeTranslation(t,e,n),this.applyMatrix4(mn),this}scale(t,e,n){return mn.makeScale(t,e,n),this.applyMatrix4(mn),this}lookAt(t){return bc.lookAt(t),bc.updateMatrix(),this.applyMatrix4(bc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ys).negate(),this.translate(ys.x,ys.y,ys.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new kt(n,3))}else{for(let n=0,s=e.count;n<s;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new en);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];un.setFromBufferAttribute(r),this.morphTargetsRelative?(ke.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(ke),ke.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(ke)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){let n=this.boundingSphere.center;if(un.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];hr.setFromBufferAttribute(a),this.morphTargetsRelative?(ke.addVectors(un.min,hr.min),un.expandByPoint(ke),ke.addVectors(un.max,hr.max),un.expandByPoint(ke)):(un.expandByPoint(hr.min),un.expandByPoint(hr.max))}un.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)ke.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(ke));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)ke.fromBufferAttribute(a,l),c&&(ys.fromBufferAttribute(t,l),ke.add(ys)),s=Math.max(s,n.distanceToSquared(ke))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Oe(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let T=0;T<n.count;T++)a[T]=new L,c[T]=new L;let l=new L,h=new L,u=new L,f=new ft,d=new ft,m=new ft,x=new L,g=new L;function p(T,S,M){l.fromBufferAttribute(n,T),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,M),f.fromBufferAttribute(r,T),d.fromBufferAttribute(r,S),m.fromBufferAttribute(r,M),h.sub(l),u.sub(l),d.sub(f),m.sub(f);let C=1/(d.x*m.y-m.x*d.y);isFinite(C)&&(x.copy(h).multiplyScalar(m.y).addScaledVector(u,-d.y).multiplyScalar(C),g.copy(u).multiplyScalar(d.x).addScaledVector(h,-m.x).multiplyScalar(C),a[T].add(x),a[S].add(x),a[M].add(x),c[T].add(g),c[S].add(g),c[M].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let T=0,S=_.length;T<S;++T){let M=_[T],C=M.start,N=M.count;for(let D=C,I=C+N;D<I;D+=3)p(t.getX(D+0),t.getX(D+1),t.getX(D+2))}let y=new L,v=new L,A=new L,b=new L;function w(T){A.fromBufferAttribute(s,T),b.copy(A);let S=a[T];y.copy(S),y.sub(A.multiplyScalar(A.dot(S))).normalize(),v.crossVectors(b,S);let C=v.dot(c[T])<0?-1:1;o.setXYZW(T,y.x,y.y,y.z,C)}for(let T=0,S=_.length;T<S;++T){let M=_[T],C=M.start,N=M.count;for(let D=C,I=C+N;D<I;D+=3)w(t.getX(D+0)),w(t.getX(D+1)),w(t.getX(D+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Oe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new L,r=new L,o=new L,a=new L,c=new L,l=new L,h=new L,u=new L;if(t)for(let f=0,d=t.count;f<d;f+=3){let m=t.getX(f+0),x=t.getX(f+1),g=t.getX(f+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,g),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ke.fromBufferAttribute(t,e),ke.normalize(),t.setXYZ(e,ke.x,ke.y,ke.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h),d=0,m=0;for(let x=0,g=c.length;x<g;x++){a.isInterleavedBufferAttribute?d=c[x]*a.data.stride+a.offset:d=c[x]*h;for(let p=0;p<h;p++)f[m++]=l[d++]}return new Oe(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let f=l[h],d=t(f,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ku=new Vt,Ui=new Yo,_o=new Gi,ju=new L,yo=new L,vo=new L,Mo=new L,wc=new L,So=new L,Qu=new L,bo=new L,Et=class extends Ge{constructor(t=new se,e=new Ae){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){So.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(wc.fromBufferAttribute(u,t),o?So.addScaledVector(wc,h):So.addScaledVector(wc.sub(e),h))}e.add(So)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),_o.copy(n.boundingSphere),_o.applyMatrix4(r),Ui.copy(t.ray).recast(t.near),!(_o.containsPoint(Ui.origin)===!1&&(Ui.intersectSphere(_o,ju)===null||Ui.origin.distanceToSquared(ju)>(t.far-t.near)**2))&&(Ku.copy(r).invert(),Ui.copy(t.ray).applyMatrix4(Ku),!(n.boundingBox!==null&&Ui.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ui)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,x=f.length;m<x;m++){let g=f[m],p=o[g.materialIndex],_=Math.max(g.start,d.start),y=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let v=_,A=y;v<A;v+=3){let b=a.getX(v),w=a.getX(v+1),T=a.getX(v+2);s=wo(this,p,t,n,l,h,u,b,w,T),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let g=m,p=x;g<p;g+=3){let _=a.getX(g),y=a.getX(g+1),v=a.getX(g+2);s=wo(this,o,t,n,l,h,u,_,y,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,x=f.length;m<x;m++){let g=f[m],p=o[g.materialIndex],_=Math.max(g.start,d.start),y=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let v=_,A=y;v<A;v+=3){let b=v,w=v+1,T=v+2;s=wo(this,p,t,n,l,h,u,b,w,T),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,d.start),x=Math.min(c.count,d.start+d.count);for(let g=m,p=x;g<p;g+=3){let _=g,y=g+1,v=g+2;s=wo(this,o,t,n,l,h,u,_,y,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function tx(i,t,e,n,s,r,o,a){let c;if(t.side===$e?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===vi,a),c===null)return null;bo.copy(a),bo.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(bo);return l<e.near||l>e.far?null:{distance:l,point:bo.clone(),object:i}}function wo(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,yo),i.getVertexPosition(c,vo),i.getVertexPosition(l,Mo);let h=tx(i,t,e,n,yo,vo,Mo,Qu);if(h){let u=new L;gi.getBarycoord(Qu,yo,vo,Mo,u),s&&(h.uv=gi.getInterpolatedAttribute(s,a,c,l,u,new ft)),r&&(h.uv1=gi.getInterpolatedAttribute(r,a,c,l,u,new ft)),o&&(h.normal=gi.getInterpolatedAttribute(o,a,c,l,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new L,materialIndex:0};gi.getNormal(yo,vo,Mo,f.normal),h.face=f,h.barycoord=u}return h}var Ie=class i extends se{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],f=0,d=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new kt(l,3)),this.setAttribute("normal",new kt(h,3)),this.setAttribute("uv",new kt(u,2));function m(x,g,p,_,y,v,A,b,w,T,S){let M=v/w,C=A/T,N=v/2,D=A/2,I=b/2,B=w+1,U=T+1,z=0,k=0,J=new L;for(let j=0;j<U;j++){let $=j*C-D;for(let Z=0;Z<B;Z++){let ut=Z*M-N;J[x]=ut*_,J[g]=$*y,J[p]=I,l.push(J.x,J.y,J.z),J[x]=0,J[g]=0,J[p]=b>0?1:-1,h.push(J.x,J.y,J.z),u.push(Z/w),u.push(1-j/T),z+=1}}for(let j=0;j<T;j++)for(let $=0;$<w;$++){let Z=f+$+B*j,ut=f+$+B*(j+1),q=f+($+1)+B*(j+1),it=f+($+1)+B*j;c.push(Z,ut,it),c.push(ut,q,it),k+=6}a.addGroup(d,k,S),d+=k,f+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function zs(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Qe(i){let t={};for(let e=0;e<i.length;e++){let n=zs(i[e]);for(let s in n)t[s]=n[s]}return t}function ex(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function id(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ie.workingColorSpace}var nx={clone:zs,merge:Qe},ix=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,an=class extends Si{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ix,this.fragmentShader=sx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=zs(t.uniforms),this.uniformsGroups=ex(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},$o=class extends Ge{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Vt,this.projectionMatrix=new Vt,this.projectionMatrixInverse=new Vt,this.coordinateSystem=Kn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},pi=new L,tf=new ft,ef=new ft,Ze=class extends $o{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=wl*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(sc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return wl*2*Math.atan(Math.tan(sc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(pi.x,pi.y).multiplyScalar(-t/pi.z),pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(pi.x,pi.y).multiplyScalar(-t/pi.z)}getViewSize(t,e){return this.getViewBounds(t,tf,ef),e.subVectors(ef,tf)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(sc*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},vs=-90,Ms=1,Ar=class extends Ge{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ze(vs,Ms,t,e);s.layers=this.layers,this.add(s);let r=new Ze(vs,Ms,t,e);r.layers=this.layers,this.add(r);let o=new Ze(vs,Ms,t,e);o.layers=this.layers,this.add(o);let a=new Ze(vs,Ms,t,e);a.layers=this.layers,this.add(a);let c=new Ze(vs,Ms,t,e);c.layers=this.layers,this.add(c);let l=new Ze(vs,Ms,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===Kn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Go)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Jo=class extends tn{constructor(t,e,n,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Us,super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Er=class extends gn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Jo(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:We}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ie(5,5,5),r=new an({name:"CubemapFromEquirect",uniforms:zs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$e,blending:xi});r.uniforms.tEquirect.value=e;let o=new Et(s,r),a=e.minFilter;return e.minFilter===En&&(e.minFilter=We),new Ar(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Ac=new L,rx=new L,ox=new Kt,$n=class{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Ac.subVectors(n,e).cross(rx.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Ac),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||ox.getNormalMatrix(t),s=this.coplanarPoint(Ac).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Fi=new Gi,Ao=new L,Tr=class{constructor(t=new $n,e=new $n,n=new $n,s=new $n,r=new $n,o=new $n){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Kn){let n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],f=s[7],d=s[8],m=s[9],x=s[10],g=s[11],p=s[12],_=s[13],y=s[14],v=s[15];if(n[0].setComponents(c-r,f-l,g-d,v-p).normalize(),n[1].setComponents(c+r,f+l,g+d,v+p).normalize(),n[2].setComponents(c+o,f+h,g+m,v+_).normalize(),n[3].setComponents(c-o,f-h,g-m,v-_).normalize(),n[4].setComponents(c-a,f-u,g-x,v-y).normalize(),e===Kn)n[5].setComponents(c+a,f+u,g+x,v+y).normalize();else if(e===Go)n[5].setComponents(a,u,x,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Fi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Fi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Fi)}intersectsSprite(t){return Fi.center.set(0,0,0),Fi.radius=.7071067811865476,Fi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Fi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Ao.x=s.normal.x>0?t.max.x:t.min.x,Ao.y=s.normal.y>0?t.max.y:t.min.y,Ao.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ao)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function sd(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function ax(i){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,m)=>d.start-m.start);let f=0;for(let d=1;d<u.length;d++){let m=u[f],x=u[d];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++f,u[f]=x)}u.length=f+1;for(let d=0,m=u.length;d<m;d++){let x=u[d];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var ce=class i extends se{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,d=[],m=[],x=[],g=[];for(let p=0;p<h;p++){let _=p*f-o;for(let y=0;y<l;y++){let v=y*u-r;m.push(v,-_,0),x.push(0,0,1),g.push(y/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let _=0;_<a;_++){let y=_+l*p,v=_+l*(p+1),A=_+1+l*(p+1),b=_+1+l*p;d.push(y,v,b),d.push(v,A,b)}this.setIndex(d),this.setAttribute("position",new kt(m,3)),this.setAttribute("normal",new kt(x,3)),this.setAttribute("uv",new kt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},cx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lx=`#ifdef USE_ALPHAHASH
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
#endif`,hx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ux=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,dx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,px=`#ifdef USE_AOMAP
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
#endif`,mx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gx=`#ifdef USE_BATCHING
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
#endif`,xx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,_x=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Mx=`#ifdef USE_IRIDESCENCE
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
#endif`,Sx=`#ifdef USE_BUMPMAP
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
#endif`,bx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,wx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ax=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ex=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Tx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Rx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Cx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ix=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Px=`#define PI 3.141592653589793
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
} // validated`,Lx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Dx=`vec3 transformedNormal = objectNormal;
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
#endif`,Nx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ux=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Fx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ox=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Bx="gl_FragColor = linearToOutputTexel( gl_FragColor );",zx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,kx=`#ifdef USE_ENVMAP
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
#endif`,Vx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Hx=`#ifdef USE_ENVMAP
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
#endif`,Gx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Wx=`#ifdef USE_ENVMAP
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
#endif`,Xx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Yx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Zx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,$x=`#ifdef USE_GRADIENTMAP
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
}`,Jx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Kx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,jx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qx=`uniform bool receiveShadow;
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
#endif`,t_=`#ifdef USE_ENVMAP
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
#endif`,e_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,n_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,i_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,s_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,r_=`PhysicalMaterial material;
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
#endif`,o_=`struct PhysicalMaterial {
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
}`,a_=`
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
#endif`,c_=`#if defined( RE_IndirectDiffuse )
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
#endif`,l_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,h_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,u_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,f_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,d_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,p_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,m_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,g_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,x_=`#if defined( USE_POINTS_UV )
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
#endif`,__=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,y_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,v_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,M_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,S_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,b_=`#ifdef USE_MORPHTARGETS
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
#endif`,w_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,A_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,E_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,T_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,R_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,C_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,I_=`#ifdef USE_NORMALMAP
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
#endif`,P_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,L_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,D_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,N_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,U_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,F_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,O_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,B_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,z_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,k_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,V_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,H_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,G_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,W_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,X_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Y_=`float getShadowMask() {
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
}`,q_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Z_=`#ifdef USE_SKINNING
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
#endif`,$_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,J_=`#ifdef USE_SKINNING
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
#endif`,K_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,j_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Q_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ty=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ey=`#ifdef USE_TRANSMISSION
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
#endif`,ny=`#ifdef USE_TRANSMISSION
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
#endif`,iy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ry=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,oy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,ay=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cy=`uniform sampler2D t2D;
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
}`,ly=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hy=`#ifdef ENVMAP_TYPE_CUBE
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
}`,uy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dy=`#include <common>
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
}`,py=`#if DEPTH_PACKING == 3200
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
}`,my=`#define DISTANCE
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
}`,gy=`#define DISTANCE
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
}`,xy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_y=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yy=`uniform float scale;
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
}`,vy=`uniform vec3 diffuse;
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
}`,My=`#include <common>
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
}`,Sy=`uniform vec3 diffuse;
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
}`,by=`#define LAMBERT
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
}`,wy=`#define LAMBERT
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
}`,Ay=`#define MATCAP
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
}`,Ey=`#define MATCAP
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
}`,Ty=`#define NORMAL
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
}`,Ry=`#define NORMAL
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
}`,Cy=`#define PHONG
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
}`,Iy=`#define PHONG
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
}`,Py=`#define STANDARD
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
}`,Ly=`#define STANDARD
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
}`,Dy=`#define TOON
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
}`,Ny=`#define TOON
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
}`,Uy=`uniform float size;
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
}`,Fy=`uniform vec3 diffuse;
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
}`,Oy=`#include <common>
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
}`,By=`uniform vec3 color;
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
}`,zy=`uniform float rotation;
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
}`,ky=`uniform vec3 diffuse;
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
}`,Jt={alphahash_fragment:cx,alphahash_pars_fragment:lx,alphamap_fragment:hx,alphamap_pars_fragment:ux,alphatest_fragment:fx,alphatest_pars_fragment:dx,aomap_fragment:px,aomap_pars_fragment:mx,batching_pars_vertex:gx,batching_vertex:xx,begin_vertex:_x,beginnormal_vertex:yx,bsdfs:vx,iridescence_fragment:Mx,bumpmap_pars_fragment:Sx,clipping_planes_fragment:bx,clipping_planes_pars_fragment:wx,clipping_planes_pars_vertex:Ax,clipping_planes_vertex:Ex,color_fragment:Tx,color_pars_fragment:Rx,color_pars_vertex:Cx,color_vertex:Ix,common:Px,cube_uv_reflection_fragment:Lx,defaultnormal_vertex:Dx,displacementmap_pars_vertex:Nx,displacementmap_vertex:Ux,emissivemap_fragment:Fx,emissivemap_pars_fragment:Ox,colorspace_fragment:Bx,colorspace_pars_fragment:zx,envmap_fragment:kx,envmap_common_pars_fragment:Vx,envmap_pars_fragment:Hx,envmap_pars_vertex:Gx,envmap_physical_pars_fragment:t_,envmap_vertex:Wx,fog_vertex:Xx,fog_pars_vertex:Yx,fog_fragment:qx,fog_pars_fragment:Zx,gradientmap_pars_fragment:$x,lightmap_pars_fragment:Jx,lights_lambert_fragment:Kx,lights_lambert_pars_fragment:jx,lights_pars_begin:Qx,lights_toon_fragment:e_,lights_toon_pars_fragment:n_,lights_phong_fragment:i_,lights_phong_pars_fragment:s_,lights_physical_fragment:r_,lights_physical_pars_fragment:o_,lights_fragment_begin:a_,lights_fragment_maps:c_,lights_fragment_end:l_,logdepthbuf_fragment:h_,logdepthbuf_pars_fragment:u_,logdepthbuf_pars_vertex:f_,logdepthbuf_vertex:d_,map_fragment:p_,map_pars_fragment:m_,map_particle_fragment:g_,map_particle_pars_fragment:x_,metalnessmap_fragment:__,metalnessmap_pars_fragment:y_,morphinstance_vertex:v_,morphcolor_vertex:M_,morphnormal_vertex:S_,morphtarget_pars_vertex:b_,morphtarget_vertex:w_,normal_fragment_begin:A_,normal_fragment_maps:E_,normal_pars_fragment:T_,normal_pars_vertex:R_,normal_vertex:C_,normalmap_pars_fragment:I_,clearcoat_normal_fragment_begin:P_,clearcoat_normal_fragment_maps:L_,clearcoat_pars_fragment:D_,iridescence_pars_fragment:N_,opaque_fragment:U_,packing:F_,premultiplied_alpha_fragment:O_,project_vertex:B_,dithering_fragment:z_,dithering_pars_fragment:k_,roughnessmap_fragment:V_,roughnessmap_pars_fragment:H_,shadowmap_pars_fragment:G_,shadowmap_pars_vertex:W_,shadowmap_vertex:X_,shadowmask_pars_fragment:Y_,skinbase_vertex:q_,skinning_pars_vertex:Z_,skinning_vertex:$_,skinnormal_vertex:J_,specularmap_fragment:K_,specularmap_pars_fragment:j_,tonemapping_fragment:Q_,tonemapping_pars_fragment:ty,transmission_fragment:ey,transmission_pars_fragment:ny,uv_pars_fragment:iy,uv_pars_vertex:sy,uv_vertex:ry,worldpos_vertex:oy,background_vert:ay,background_frag:cy,backgroundCube_vert:ly,backgroundCube_frag:hy,cube_vert:uy,cube_frag:fy,depth_vert:dy,depth_frag:py,distanceRGBA_vert:my,distanceRGBA_frag:gy,equirect_vert:xy,equirect_frag:_y,linedashed_vert:yy,linedashed_frag:vy,meshbasic_vert:My,meshbasic_frag:Sy,meshlambert_vert:by,meshlambert_frag:wy,meshmatcap_vert:Ay,meshmatcap_frag:Ey,meshnormal_vert:Ty,meshnormal_frag:Ry,meshphong_vert:Cy,meshphong_frag:Iy,meshphysical_vert:Py,meshphysical_frag:Ly,meshtoon_vert:Dy,meshtoon_frag:Ny,points_vert:Uy,points_frag:Fy,shadow_vert:Oy,shadow_frag:By,sprite_vert:zy,sprite_frag:ky},Dt={common:{diffuse:{value:new Ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new Ot(16777215)},opacity:{value:1},center:{value:new ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},Ln={basic:{uniforms:Qe([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:Qe([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,Dt.lights,{emissive:{value:new Ot(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:Qe([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,Dt.lights,{emissive:{value:new Ot(0)},specular:{value:new Ot(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:Qe([Dt.common,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.roughnessmap,Dt.metalnessmap,Dt.fog,Dt.lights,{emissive:{value:new Ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:Qe([Dt.common,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.gradientmap,Dt.fog,Dt.lights,{emissive:{value:new Ot(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:Qe([Dt.common,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:Qe([Dt.points,Dt.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:Qe([Dt.common,Dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:Qe([Dt.common,Dt.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:Qe([Dt.common,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:Qe([Dt.sprite,Dt.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:Qe([Dt.common,Dt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:Qe([Dt.lights,Dt.fog,{color:{value:new Ot(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};Ln.physical={uniforms:Qe([Ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new Ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new Ot(0)},specularColor:{value:new Ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};var Eo={r:0,b:0,g:0},Oi=new on,Vy=new Vt;function Hy(i,t,e,n,s,r,o){let a=new Ot(0),c=r===!0?0:1,l,h,u=null,f=0,d=null;function m(_){let y=_.isScene===!0?_.background:null;return y&&y.isTexture&&(y=(_.backgroundBlurriness>0?e:t).get(y)),y}function x(_){let y=!1,v=m(_);v===null?p(a,c):v&&v.isColor&&(p(v,1),y=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(_,y){let v=m(y);v&&(v.isCubeTexture||v.mapping===fa)?(h===void 0&&(h=new Et(new Ie(1,1,1),new an({name:"BackgroundCubeMaterial",uniforms:zs(Ln.backgroundCube.uniforms),vertexShader:Ln.backgroundCube.vertexShader,fragmentShader:Ln.backgroundCube.fragmentShader,side:$e,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,b,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Oi.copy(y.backgroundRotation),Oi.x*=-1,Oi.y*=-1,Oi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Oi.y*=-1,Oi.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Vy.makeRotationFromEuler(Oi)),h.material.toneMapped=ie.getTransfer(v.colorSpace)!==de,(u!==v||f!==v.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=v,f=v.version,d=i.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Et(new ce(2,2),new an({name:"BackgroundMaterial",uniforms:zs(Ln.background.uniforms),vertexShader:Ln.background.vertexShader,fragmentShader:Ln.background.fragmentShader,side:vi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=ie.getTransfer(v.colorSpace)!==de,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=v,f=v.version,d=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function p(_,y){_.getRGB(Eo,id(i)),n.buffers.color.setClear(Eo.r,Eo.g,Eo.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(_,y=1){a.set(_),c=y,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(_){c=_,p(a,c)},render:x,addToRenderList:g}}function Gy(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(M,C,N,D,I){let B=!1,U=u(D,N,C);r!==U&&(r=U,l(r.object)),B=d(M,D,N,I),B&&m(M,D,N,I),I!==null&&t.update(I,i.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,v(M,C,N,D),I!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(I).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,C,N){let D=N.wireframe===!0,I=n[M.id];I===void 0&&(I={},n[M.id]=I);let B=I[C.id];B===void 0&&(B={},I[C.id]=B);let U=B[D];return U===void 0&&(U=f(c()),B[D]=U),U}function f(M){let C=[],N=[],D=[];for(let I=0;I<e;I++)C[I]=0,N[I]=0,D[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:N,attributeDivisors:D,object:M,attributes:{},index:null}}function d(M,C,N,D){let I=r.attributes,B=C.attributes,U=0,z=N.getAttributes();for(let k in z)if(z[k].location>=0){let j=I[k],$=B[k];if($===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&($=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&($=M.instanceColor)),j===void 0||j.attribute!==$||$&&j.data!==$.data)return!0;U++}return r.attributesNum!==U||r.index!==D}function m(M,C,N,D){let I={},B=C.attributes,U=0,z=N.getAttributes();for(let k in z)if(z[k].location>=0){let j=B[k];j===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(j=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(j=M.instanceColor));let $={};$.attribute=j,j&&j.data&&($.data=j.data),I[k]=$,U++}r.attributes=I,r.attributesNum=U,r.index=D}function x(){let M=r.newAttributes;for(let C=0,N=M.length;C<N;C++)M[C]=0}function g(M){p(M,0)}function p(M,C){let N=r.newAttributes,D=r.enabledAttributes,I=r.attributeDivisors;N[M]=1,D[M]===0&&(i.enableVertexAttribArray(M),D[M]=1),I[M]!==C&&(i.vertexAttribDivisor(M,C),I[M]=C)}function _(){let M=r.newAttributes,C=r.enabledAttributes;for(let N=0,D=C.length;N<D;N++)C[N]!==M[N]&&(i.disableVertexAttribArray(N),C[N]=0)}function y(M,C,N,D,I,B,U){U===!0?i.vertexAttribIPointer(M,C,N,I,B):i.vertexAttribPointer(M,C,N,D,I,B)}function v(M,C,N,D){x();let I=D.attributes,B=N.getAttributes(),U=C.defaultAttributeValues;for(let z in B){let k=B[z];if(k.location>=0){let J=I[z];if(J===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(J=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(J=M.instanceColor)),J!==void 0){let j=J.normalized,$=J.itemSize,Z=t.get(J);if(Z===void 0)continue;let ut=Z.buffer,q=Z.type,it=Z.bytesPerElement,st=q===i.INT||q===i.UNSIGNED_INT||J.gpuType===lh;if(J.isInterleavedBufferAttribute){let dt=J.data,yt=dt.stride,Lt=J.offset;if(dt.isInstancedInterleavedBuffer){for(let zt=0;zt<k.locationSize;zt++)p(k.location+zt,dt.meshPerAttribute);M.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let zt=0;zt<k.locationSize;zt++)g(k.location+zt);i.bindBuffer(i.ARRAY_BUFFER,ut);for(let zt=0;zt<k.locationSize;zt++)y(k.location+zt,$/k.locationSize,q,j,yt*it,(Lt+$/k.locationSize*zt)*it,st)}else{if(J.isInstancedBufferAttribute){for(let dt=0;dt<k.locationSize;dt++)p(k.location+dt,J.meshPerAttribute);M.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let dt=0;dt<k.locationSize;dt++)g(k.location+dt);i.bindBuffer(i.ARRAY_BUFFER,ut);for(let dt=0;dt<k.locationSize;dt++)y(k.location+dt,$/k.locationSize,q,j,$*it,$/k.locationSize*dt*it,st)}}else if(U!==void 0){let j=U[z];if(j!==void 0)switch(j.length){case 2:i.vertexAttrib2fv(k.location,j);break;case 3:i.vertexAttrib3fv(k.location,j);break;case 4:i.vertexAttrib4fv(k.location,j);break;default:i.vertexAttrib1fv(k.location,j)}}}}_()}function A(){T();for(let M in n){let C=n[M];for(let N in C){let D=C[N];for(let I in D)h(D[I].object),delete D[I];delete C[N]}delete n[M]}}function b(M){if(n[M.id]===void 0)return;let C=n[M.id];for(let N in C){let D=C[N];for(let I in D)h(D[I].object),delete D[I];delete C[N]}delete n[M.id]}function w(M){for(let C in n){let N=n[C];if(N[M.id]===void 0)continue;let D=N[M.id];for(let I in D)h(D[I].object),delete D[I];delete N[M.id]}}function T(){S(),o=!0,r!==s&&(r=s,l(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:T,resetDefaultState:S,dispose:A,releaseStatesOfGeometry:b,releaseStatesOfProgram:w,initAttributes:x,enableAttribute:g,disableUnusedAttributes:_}}function Wy(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let m=0;m<u;m++)d+=h[m];e.update(d,n,1)}function c(l,h,u,f){if(u===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<l.length;m++)o(l[m],h[m],f[m]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let m=0;for(let x=0;x<u;x++)m+=h[x]*f[x];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Xy(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let w=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==Fe&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){let T=w===ni&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==ti&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Nn&&!T)}function c(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=m>0,b=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:_,maxVaryings:y,maxFragmentUniforms:v,vertexTextures:A,maxSamples:b}}function Yy(i){let t=this,e=null,n=0,s=!1,r=!1,o=new $n,a=new Kt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){let m=u.clippingPlanes,x=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!g)r?h(null):l();else{let _=r?0:n,y=_*4,v=p.clippingState||null;c.value=v,v=h(m,f,y,d);for(let A=0;A!==y;++A)v[A]=e[A];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,m){let x=u!==null?u.length:0,g=null;if(x!==0){if(g=c.value,m!==!0||g===null){let p=d+x*4,_=f.matrixWorldInverse;a.getNormalMatrix(_),(g===null||g.length<p)&&(g=new Float32Array(p));for(let y=0,v=d;y!==x;++y,v+=4)o.copy(u[y]).applyMatrix4(_,a),o.normal.toArray(g,v),g[v+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,g}}function qy(i){let t=new WeakMap;function e(o,a){return a===qc?o.mapping=Us:a===Zc&&(o.mapping=Fs),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===qc||a===Zc)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Er(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var ks=class extends $o{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Rs=4,nf=[.125,.215,.35,.446,.526,.582],Vi=20,Ec=new ks,sf=new Ot,Tc=null,Rc=0,Cc=0,Ic=!1,zi=(1+Math.sqrt(5))/2,Ss=1/zi,rf=[new L(-zi,Ss,0),new L(zi,Ss,0),new L(-Ss,0,zi),new L(Ss,0,zi),new L(0,zi,-Ss),new L(0,zi,Ss),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],Vs=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Tc=this._renderer.getRenderTarget(),Rc=this._renderer.getActiveCubeFace(),Cc=this._renderer.getActiveMipmapLevel(),Ic=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=cf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=af(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Tc,Rc,Cc),this._renderer.xr.enabled=Ic,t.scissorTest=!1,To(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Us||t.mapping===Fs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Tc=this._renderer.getRenderTarget(),Rc=this._renderer.getActiveCubeFace(),Cc=this._renderer.getActiveMipmapLevel(),Ic=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:We,minFilter:We,generateMipmaps:!1,type:ni,format:Fe,colorSpace:Ei,depthBuffer:!1},s=of(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=of(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Zy(r)),this._blurMaterial=$y(r,t,e)}return s}_compileMaterial(t){let e=new Et(this._lodPlanes[0],t);this._renderer.compile(e,Ec)}_sceneToCubeUV(t,e,n,s){let a=new Ze(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(sf),h.toneMapping=_i,h.autoClear=!1;let d=new Ae({name:"PMREM.Background",side:$e,depthWrite:!1,depthTest:!1}),m=new Et(new Ie,d),x=!1,g=t.background;g?g.isColor&&(d.color.copy(g),t.background=null,x=!0):(d.color.copy(sf),x=!0);for(let p=0;p<6;p++){let _=p%3;_===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):_===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let y=this._cubeSize;To(s,_*y,p>2?y:0,y,y),h.setRenderTarget(s),x&&h.render(m,a),h.render(t,a)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=g}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Us||t.mapping===Fs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=cf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=af());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Et(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;To(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Ec)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=rf[(s-r-1)%rf.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Et(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Vi-1),x=r/m,g=isFinite(r)?1+Math.floor(h*x):Vi;g>Vi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Vi}`);let p=[],_=0;for(let w=0;w<Vi;++w){let T=w/x,S=Math.exp(-T*T/2);p.push(S),w===0?_+=S:w<g&&(_+=2*S)}for(let w=0;w<p.length;w++)p[w]=p[w]/_;f.envMap.value=t.texture,f.samples.value=g,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:y}=this;f.dTheta.value=m,f.mipInt.value=y-n;let v=this._sizeLods[s],A=3*v*(s>y-Rs?s-y+Rs:0),b=4*(this._cubeSize-v);To(e,A,b,3*v,2*v),c.setRenderTarget(e),c.render(u,Ec)}};function Zy(i){let t=[],e=[],n=[],s=i,r=i-Rs+1+nf.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-Rs?c=nf[o-i+Rs-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,m=6,x=3,g=2,p=1,_=new Float32Array(x*m*d),y=new Float32Array(g*m*d),v=new Float32Array(p*m*d);for(let b=0;b<d;b++){let w=b%3*2/3-1,T=b>2?0:-1,S=[w,T,0,w+2/3,T,0,w+2/3,T+1,0,w,T,0,w+2/3,T+1,0,w,T+1,0];_.set(S,x*m*b),y.set(f,g*m*b);let M=[b,b,b,b,b,b];v.set(M,p*m*b)}let A=new se;A.setAttribute("position",new Oe(_,x)),A.setAttribute("uv",new Oe(y,g)),A.setAttribute("faceIndex",new Oe(v,p)),t.push(A),s>Rs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function of(i,t,e){let n=new gn(i,t,e);return n.texture.mapping=fa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function To(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function $y(i,t,e){let n=new Float32Array(Vi),s=new L(0,1,0);return new an({name:"SphericalGaussianBlur",defines:{n:Vi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:gh(),fragmentShader:`

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
		`,blending:xi,depthTest:!1,depthWrite:!1})}function af(){return new an({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:gh(),fragmentShader:`

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
		`,blending:xi,depthTest:!1,depthWrite:!1})}function cf(){return new an({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:gh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:xi,depthTest:!1,depthWrite:!1})}function gh(){return`

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
	`}function Jy(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===qc||c===Zc,h=c===Us||c===Fs;if(l||h){let u=t.get(a),f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Vs(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let d=a.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Vs(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Ky(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&xr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function jy(i,t,e,n){let s={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let m in f.attributes)t.remove(f.attributes[m]);for(let m in f.morphAttributes){let x=f.morphAttributes[m];for(let g=0,p=x.length;g<p;g++)t.remove(x[g])}f.removeEventListener("dispose",o),delete s[f.id];let d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){let f=u.attributes;for(let m in f)t.update(f[m],i.ARRAY_BUFFER);let d=u.morphAttributes;for(let m in d){let x=d[m];for(let g=0,p=x.length;g<p;g++)t.update(x[g],i.ARRAY_BUFFER)}}function l(u){let f=[],d=u.index,m=u.attributes.position,x=0;if(d!==null){let _=d.array;x=d.version;for(let y=0,v=_.length;y<v;y+=3){let A=_[y+0],b=_[y+1],w=_[y+2];f.push(A,b,b,w,w,A)}}else if(m!==void 0){let _=m.array;x=m.version;for(let y=0,v=_.length/3-1;y<v;y+=3){let A=y+0,b=y+1,w=y+2;f.push(A,b,b,w,w,A)}}else return;let g=new(ed(f)?Zo:qo)(f,1);g.version=x;let p=r.get(u);p&&t.remove(p),r.set(u,g)}function h(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Qy(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*o),e.update(d,n,1)}function l(f,d,m){m!==0&&(i.drawElementsInstanced(n,d,r,f*o,m),e.update(d,n,m))}function h(f,d,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,m);let g=0;for(let p=0;p<m;p++)g+=d[p];e.update(g,n,1)}function u(f,d,m,x){if(m===0)return;let g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],x[p]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,x,0,m);let p=0;for(let _=0;_<m;_++)p+=d[_]*x[_];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function tv(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function ev(i,t,e){let n=new WeakMap,s=new ee;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(a);if(f===void 0||f.count!==u){let S=function(){w.dispose(),n.delete(a),a.removeEventListener("dispose",S)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],_=a.morphAttributes.color||[],y=0;d===!0&&(y=1),m===!0&&(y=2),x===!0&&(y=3);let v=a.attributes.position.count*y,A=1;v>t.maxTextureSize&&(A=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let b=new Float32Array(v*A*4*u),w=new Xo(b,v,A,u);w.type=Nn,w.needsUpdate=!0;let T=y*4;for(let M=0;M<u;M++){let C=g[M],N=p[M],D=_[M],I=v*A*4*M;for(let B=0;B<C.count;B++){let U=B*T;d===!0&&(s.fromBufferAttribute(C,B),b[I+U+0]=s.x,b[I+U+1]=s.y,b[I+U+2]=s.z,b[I+U+3]=0),m===!0&&(s.fromBufferAttribute(N,B),b[I+U+4]=s.x,b[I+U+5]=s.y,b[I+U+6]=s.z,b[I+U+7]=0),x===!0&&(s.fromBufferAttribute(D,B),b[I+U+8]=s.x,b[I+U+9]=s.y,b[I+U+10]=s.z,b[I+U+11]=D.itemSize===4?s.w:1)}}f={count:u,texture:w,size:new ft(v,A)},n.set(a,f),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let x=0;x<l.length;x++)d+=l[x];let m=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function nv(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var Hs=class extends tn{constructor(t,e,n,s,r,o,a,c,l,h=Ps){if(h!==Ps&&h!==Bs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ps&&(n=Hi),n===void 0&&h===Bs&&(n=Os),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:fn,this.minFilter=c!==void 0?c:fn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},rd=new tn,lf=new Hs(1,1),od=new Xo,ad=new Tl,cd=new Jo,hf=[],uf=[],ff=new Float32Array(16),df=new Float32Array(9),pf=new Float32Array(4);function Ys(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=hf[s];if(r===void 0&&(r=new Float32Array(s),hf[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Be(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ze(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function pa(i,t){let e=uf[t];e===void 0&&(e=new Int32Array(t),uf[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function iv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function sv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;i.uniform2fv(this.addr,t),ze(e,t)}}function rv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Be(e,t))return;i.uniform3fv(this.addr,t),ze(e,t)}}function ov(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;i.uniform4fv(this.addr,t),ze(e,t)}}function av(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,n))return;pf.set(n),i.uniformMatrix2fv(this.addr,!1,pf),ze(e,n)}}function cv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,n))return;df.set(n),i.uniformMatrix3fv(this.addr,!1,df),ze(e,n)}}function lv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,n))return;ff.set(n),i.uniformMatrix4fv(this.addr,!1,ff),ze(e,n)}}function hv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function uv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;i.uniform2iv(this.addr,t),ze(e,t)}}function fv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;i.uniform3iv(this.addr,t),ze(e,t)}}function dv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;i.uniform4iv(this.addr,t),ze(e,t)}}function pv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function mv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;i.uniform2uiv(this.addr,t),ze(e,t)}}function gv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;i.uniform3uiv(this.addr,t),ze(e,t)}}function xv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;i.uniform4uiv(this.addr,t),ze(e,t)}}function _v(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(lf.compareFunction=td,r=lf):r=rd,e.setTexture2D(t||r,s)}function yv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||ad,s)}function vv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||cd,s)}function Mv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||od,s)}function Sv(i){switch(i){case 5126:return iv;case 35664:return sv;case 35665:return rv;case 35666:return ov;case 35674:return av;case 35675:return cv;case 35676:return lv;case 5124:case 35670:return hv;case 35667:case 35671:return uv;case 35668:case 35672:return fv;case 35669:case 35673:return dv;case 5125:return pv;case 36294:return mv;case 36295:return gv;case 36296:return xv;case 35678:case 36198:case 36298:case 36306:case 35682:return _v;case 35679:case 36299:case 36307:return yv;case 35680:case 36300:case 36308:case 36293:return vv;case 36289:case 36303:case 36311:case 36292:return Mv}}function bv(i,t){i.uniform1fv(this.addr,t)}function wv(i,t){let e=Ys(t,this.size,2);i.uniform2fv(this.addr,e)}function Av(i,t){let e=Ys(t,this.size,3);i.uniform3fv(this.addr,e)}function Ev(i,t){let e=Ys(t,this.size,4);i.uniform4fv(this.addr,e)}function Tv(i,t){let e=Ys(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Rv(i,t){let e=Ys(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Cv(i,t){let e=Ys(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Iv(i,t){i.uniform1iv(this.addr,t)}function Pv(i,t){i.uniform2iv(this.addr,t)}function Lv(i,t){i.uniform3iv(this.addr,t)}function Dv(i,t){i.uniform4iv(this.addr,t)}function Nv(i,t){i.uniform1uiv(this.addr,t)}function Uv(i,t){i.uniform2uiv(this.addr,t)}function Fv(i,t){i.uniform3uiv(this.addr,t)}function Ov(i,t){i.uniform4uiv(this.addr,t)}function Bv(i,t,e){let n=this.cache,s=t.length,r=pa(e,s);Be(n,r)||(i.uniform1iv(this.addr,r),ze(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||rd,r[o])}function zv(i,t,e){let n=this.cache,s=t.length,r=pa(e,s);Be(n,r)||(i.uniform1iv(this.addr,r),ze(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||ad,r[o])}function kv(i,t,e){let n=this.cache,s=t.length,r=pa(e,s);Be(n,r)||(i.uniform1iv(this.addr,r),ze(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||cd,r[o])}function Vv(i,t,e){let n=this.cache,s=t.length,r=pa(e,s);Be(n,r)||(i.uniform1iv(this.addr,r),ze(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||od,r[o])}function Hv(i){switch(i){case 5126:return bv;case 35664:return wv;case 35665:return Av;case 35666:return Ev;case 35674:return Tv;case 35675:return Rv;case 35676:return Cv;case 5124:case 35670:return Iv;case 35667:case 35671:return Pv;case 35668:case 35672:return Lv;case 35669:case 35673:return Dv;case 5125:return Nv;case 36294:return Uv;case 36295:return Fv;case 36296:return Ov;case 35678:case 36198:case 36298:case 36306:case 35682:return Bv;case 35679:case 36299:case 36307:return zv;case 35680:case 36300:case 36308:case 36293:return kv;case 36289:case 36303:case 36311:case 36292:return Vv}}var Rl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Sv(e.type)}},Cl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Hv(e.type)}},Il=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Pc=/(\w+)(\])?(\[|\.)?/g;function mf(i,t){i.seq.push(t),i.map[t.id]=t}function Gv(i,t,e){let n=i.name,s=n.length;for(Pc.lastIndex=0;;){let r=Pc.exec(n),o=Pc.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){mf(e,l===void 0?new Rl(a,i,t):new Cl(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Il(a),mf(e,u)),e=u}}}var Ds=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Gv(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function gf(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Wv=37297,Xv=0;function Yv(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var xf=new Kt;function qv(i){ie._getMatrix(xf,ie.workingColorSpace,i);let t=`mat3( ${xf.elements.map(e=>e.toFixed(4))} )`;switch(ie.getTransfer(i)){case da:return[t,"LinearTransferOETF"];case de:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function _f(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Yv(i.getShaderSource(t),o)}else return s}function Zv(i,t){let e=qv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function $v(i,t){let e;switch(t){case Sg:e="Linear";break;case bg:e="Reinhard";break;case wg:e="Cineon";break;case Ag:e="ACESFilmic";break;case ch:e="AgX";break;case Tg:e="Neutral";break;case Eg:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ro=new L;function Jv(){ie.getLuminanceCoefficients(Ro);let i=Ro.x.toFixed(4),t=Ro.y.toFixed(4),e=Ro.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Kv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_r).join(`
`)}function jv(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Qv(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function _r(i){return i!==""}function yf(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function vf(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var t1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Pl(i){return i.replace(t1,n1)}var e1=new Map;function n1(i,t){let e=Jt[t];if(e===void 0){let n=e1.get(t);if(n!==void 0)e=Jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Pl(e)}var i1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Mf(i){return i.replace(i1,s1)}function s1(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Sf(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function r1(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Vf?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===ah?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Zn&&(t="SHADOWMAP_TYPE_VSM"),t}function o1(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Us:case Fs:t="ENVMAP_TYPE_CUBE";break;case fa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function a1(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Fs:t="ENVMAP_MODE_REFRACTION";break}return t}function c1(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Hf:t="ENVMAP_BLENDING_MULTIPLY";break;case vg:t="ENVMAP_BLENDING_MIX";break;case Mg:t="ENVMAP_BLENDING_ADD";break}return t}function l1(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function h1(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=r1(e),l=o1(e),h=a1(e),u=c1(e),f=l1(e),d=Kv(e),m=jv(r),x=s.createProgram(),g,p,_=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(_r).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(_r).join(`
`),p.length>0&&(p+=`
`)):(g=[Sf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_r).join(`
`),p=[Sf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==_i?"#define TONE_MAPPING":"",e.toneMapping!==_i?Jt.tonemapping_pars_fragment:"",e.toneMapping!==_i?$v("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,Zv("linearToOutputTexel",e.outputColorSpace),Jv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(_r).join(`
`)),o=Pl(o),o=yf(o,e),o=vf(o,e),a=Pl(a),a=yf(a,e),a=vf(a,e),o=Mf(o),a=Mf(a),e.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Uu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Uu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let y=_+g+o,v=_+p+a,A=gf(s,s.VERTEX_SHADER,y),b=gf(s,s.FRAGMENT_SHADER,v);s.attachShader(x,A),s.attachShader(x,b),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function w(C){if(i.debug.checkShaderErrors){let N=s.getProgramInfoLog(x).trim(),D=s.getShaderInfoLog(A).trim(),I=s.getShaderInfoLog(b).trim(),B=!0,U=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(B=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,A,b);else{let z=_f(s,A,"vertex"),k=_f(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+N+`
`+z+`
`+k)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(D===""||I==="")&&(U=!1);U&&(C.diagnostics={runnable:B,programLog:N,vertexShader:{log:D,prefix:g},fragmentShader:{log:I,prefix:p}})}s.deleteShader(A),s.deleteShader(b),T=new Ds(s,x),S=Qv(s,x)}let T;this.getUniforms=function(){return T===void 0&&w(this),T};let S;this.getAttributes=function(){return S===void 0&&w(this),S};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(x,Wv)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Xv++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=b,this}var u1=0,Ll=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Dl(t),e.set(t,n)),n}},Dl=class{constructor(t){this.id=u1++,this.code=t,this.usedTimes=0}};function f1(i,t,e,n,s,r,o){let a=new wr,c=new Ll,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures,d=s.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(S){return l.add(S),S===0?"uv":`uv${S}`}function g(S,M,C,N,D){let I=N.fog,B=D.geometry,U=S.isMeshStandardMaterial?N.environment:null,z=(S.isMeshStandardMaterial?e:t).get(S.envMap||U),k=z&&z.mapping===fa?z.image.height:null,J=m[S.type];S.precision!==null&&(d=s.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));let j=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,$=j!==void 0?j.length:0,Z=0;B.morphAttributes.position!==void 0&&(Z=1),B.morphAttributes.normal!==void 0&&(Z=2),B.morphAttributes.color!==void 0&&(Z=3);let ut,q,it,st;if(J){let te=Ln[J];ut=te.vertexShader,q=te.fragmentShader}else ut=S.vertexShader,q=S.fragmentShader,c.update(S),it=c.getVertexShaderID(S),st=c.getFragmentShaderID(S);let dt=i.getRenderTarget(),yt=i.state.buffers.depth.getReversed(),Lt=D.isInstancedMesh===!0,zt=D.isBatchedMesh===!0,Yt=!!S.map,at=!!S.matcap,pt=!!z,F=!!S.aoMap,It=!!S.lightMap,ht=!!S.bumpMap,wt=!!S.normalMap,nt=!!S.displacementMap,Tt=!!S.emissiveMap,H=!!S.metalnessMap,R=!!S.roughnessMap,E=S.anisotropy>0,O=S.clearcoat>0,G=S.dispersion>0,K=S.iridescence>0,Y=S.sheen>0,Mt=S.transmission>0,gt=E&&!!S.anisotropyMap,ct=O&&!!S.clearcoatMap,Pt=O&&!!S.clearcoatNormalMap,ot=O&&!!S.clearcoatRoughnessMap,mt=K&&!!S.iridescenceMap,Ct=K&&!!S.iridescenceThicknessMap,rt=Y&&!!S.sheenColorMap,vt=Y&&!!S.sheenRoughnessMap,Ft=!!S.specularMap,Rt=!!S.specularColorMap,Nt=!!S.specularIntensityMap,V=Mt&&!!S.transmissionMap,St=Mt&&!!S.thicknessMap,tt=!!S.gradientMap,lt=!!S.alphaMap,xt=S.alphaTest>0,_t=!!S.alphaHash,qt=!!S.extensions,ne=_i;S.toneMapped&&(dt===null||dt.isXRRenderTarget===!0)&&(ne=i.toneMapping);let Se={shaderID:J,shaderType:S.type,shaderName:S.name,vertexShader:ut,fragmentShader:q,defines:S.defines,customVertexShaderID:it,customFragmentShaderID:st,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:zt,batchingColor:zt&&D._colorsTexture!==null,instancing:Lt,instancingColor:Lt&&D.instanceColor!==null,instancingMorph:Lt&&D.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:dt===null?i.outputColorSpace:dt.isXRRenderTarget===!0?dt.texture.colorSpace:Ei,alphaToCoverage:!!S.alphaToCoverage,map:Yt,matcap:at,envMap:pt,envMapMode:pt&&z.mapping,envMapCubeUVHeight:k,aoMap:F,lightMap:It,bumpMap:ht,normalMap:wt,displacementMap:f&&nt,emissiveMap:Tt,normalMapObjectSpace:wt&&S.normalMapType===Ig,normalMapTangentSpace:wt&&S.normalMapType===Qf,metalnessMap:H,roughnessMap:R,anisotropy:E,anisotropyMap:gt,clearcoat:O,clearcoatMap:ct,clearcoatNormalMap:Pt,clearcoatRoughnessMap:ot,dispersion:G,iridescence:K,iridescenceMap:mt,iridescenceThicknessMap:Ct,sheen:Y,sheenColorMap:rt,sheenRoughnessMap:vt,specularMap:Ft,specularColorMap:Rt,specularIntensityMap:Nt,transmission:Mt,transmissionMap:V,thicknessMap:St,gradientMap:tt,opaque:S.transparent===!1&&S.blending===Is&&S.alphaToCoverage===!1,alphaMap:lt,alphaTest:xt,alphaHash:_t,combine:S.combine,mapUv:Yt&&x(S.map.channel),aoMapUv:F&&x(S.aoMap.channel),lightMapUv:It&&x(S.lightMap.channel),bumpMapUv:ht&&x(S.bumpMap.channel),normalMapUv:wt&&x(S.normalMap.channel),displacementMapUv:nt&&x(S.displacementMap.channel),emissiveMapUv:Tt&&x(S.emissiveMap.channel),metalnessMapUv:H&&x(S.metalnessMap.channel),roughnessMapUv:R&&x(S.roughnessMap.channel),anisotropyMapUv:gt&&x(S.anisotropyMap.channel),clearcoatMapUv:ct&&x(S.clearcoatMap.channel),clearcoatNormalMapUv:Pt&&x(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ot&&x(S.clearcoatRoughnessMap.channel),iridescenceMapUv:mt&&x(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ct&&x(S.iridescenceThicknessMap.channel),sheenColorMapUv:rt&&x(S.sheenColorMap.channel),sheenRoughnessMapUv:vt&&x(S.sheenRoughnessMap.channel),specularMapUv:Ft&&x(S.specularMap.channel),specularColorMapUv:Rt&&x(S.specularColorMap.channel),specularIntensityMapUv:Nt&&x(S.specularIntensityMap.channel),transmissionMapUv:V&&x(S.transmissionMap.channel),thicknessMapUv:St&&x(S.thicknessMap.channel),alphaMapUv:lt&&x(S.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(wt||E),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!B.attributes.uv&&(Yt||lt),fog:!!I,useFog:S.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:yt,skinning:D.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:$,morphTextureStride:Z,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:ne,decodeVideoTexture:Yt&&S.map.isVideoTexture===!0&&ie.getTransfer(S.map.colorSpace)===de,decodeVideoTextureEmissive:Tt&&S.emissiveMap.isVideoTexture===!0&&ie.getTransfer(S.emissiveMap.colorSpace)===de,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===_e,flipSided:S.side===$e,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:qt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(qt&&S.extensions.multiDraw===!0||zt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Se.vertexUv1s=l.has(1),Se.vertexUv2s=l.has(2),Se.vertexUv3s=l.has(3),l.clear(),Se}function p(S){let M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(let C in S.defines)M.push(C),M.push(S.defines[C]);return S.isRawShaderMaterial===!1&&(_(M,S),y(M,S),M.push(i.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function _(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function y(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),S.push(a.mask)}function v(S){let M=m[S.type],C;if(M){let N=Ln[M];C=nx.clone(N.uniforms)}else C=S.uniforms;return C}function A(S,M){let C;for(let N=0,D=h.length;N<D;N++){let I=h[N];if(I.cacheKey===M){C=I,++C.usedTimes;break}}return C===void 0&&(C=new h1(i,M,S,r),h.push(C)),C}function b(S){if(--S.usedTimes===0){let M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function w(S){c.remove(S)}function T(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:A,releaseProgram:b,releaseShaderCache:w,programs:h,dispose:T}}function d1(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function p1(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function bf(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function wf(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,f,d,m,x,g){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:m,renderOrder:u.renderOrder,z:x,group:g},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=x,p.group=g),t++,p}function a(u,f,d,m,x,g){let p=o(u,f,d,m,x,g);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function c(u,f,d,m,x,g){let p=o(u,f,d,m,x,g);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,f){e.length>1&&e.sort(u||p1),n.length>1&&n.sort(f||bf),s.length>1&&s.sort(f||bf)}function h(){for(let u=t,f=i.length;u<f;u++){let d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function m1(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new wf,i.set(n,[o])):s>=r.length?(o=new wf,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function g1(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Ot};break;case"SpotLight":e={position:new L,direction:new L,color:new Ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Ot,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Ot,groundColor:new Ot};break;case"RectAreaLight":e={color:new Ot,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function x1(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var _1=0;function y1(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function v1(i){let t=new g1,e=x1(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);let s=new L,r=new Vt,o=new Vt;function a(l){let h=0,u=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let d=0,m=0,x=0,g=0,p=0,_=0,y=0,v=0,A=0,b=0,w=0;l.sort(y1);for(let S=0,M=l.length;S<M;S++){let C=l[S],N=C.color,D=C.intensity,I=C.distance,B=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=N.r*D,u+=N.g*D,f+=N.b*D;else if(C.isLightProbe){for(let U=0;U<9;U++)n.probe[U].addScaledVector(C.sh.coefficients[U],D);w++}else if(C.isDirectionalLight){let U=t.get(C);if(U.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let z=C.shadow,k=e.get(C);k.shadowIntensity=z.intensity,k.shadowBias=z.bias,k.shadowNormalBias=z.normalBias,k.shadowRadius=z.radius,k.shadowMapSize=z.mapSize,n.directionalShadow[d]=k,n.directionalShadowMap[d]=B,n.directionalShadowMatrix[d]=C.shadow.matrix,_++}n.directional[d]=U,d++}else if(C.isSpotLight){let U=t.get(C);U.position.setFromMatrixPosition(C.matrixWorld),U.color.copy(N).multiplyScalar(D),U.distance=I,U.coneCos=Math.cos(C.angle),U.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),U.decay=C.decay,n.spot[x]=U;let z=C.shadow;if(C.map&&(n.spotLightMap[A]=C.map,A++,z.updateMatrices(C),C.castShadow&&b++),n.spotLightMatrix[x]=z.matrix,C.castShadow){let k=e.get(C);k.shadowIntensity=z.intensity,k.shadowBias=z.bias,k.shadowNormalBias=z.normalBias,k.shadowRadius=z.radius,k.shadowMapSize=z.mapSize,n.spotShadow[x]=k,n.spotShadowMap[x]=B,v++}x++}else if(C.isRectAreaLight){let U=t.get(C);U.color.copy(N).multiplyScalar(D),U.halfWidth.set(C.width*.5,0,0),U.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=U,g++}else if(C.isPointLight){let U=t.get(C);if(U.color.copy(C.color).multiplyScalar(C.intensity),U.distance=C.distance,U.decay=C.decay,C.castShadow){let z=C.shadow,k=e.get(C);k.shadowIntensity=z.intensity,k.shadowBias=z.bias,k.shadowNormalBias=z.normalBias,k.shadowRadius=z.radius,k.shadowMapSize=z.mapSize,k.shadowCameraNear=z.camera.near,k.shadowCameraFar=z.camera.far,n.pointShadow[m]=k,n.pointShadowMap[m]=B,n.pointShadowMatrix[m]=C.shadow.matrix,y++}n.point[m]=U,m++}else if(C.isHemisphereLight){let U=t.get(C);U.skyColor.copy(C.color).multiplyScalar(D),U.groundColor.copy(C.groundColor).multiplyScalar(D),n.hemi[p]=U,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Dt.LTC_FLOAT_1,n.rectAreaLTC2=Dt.LTC_FLOAT_2):(n.rectAreaLTC1=Dt.LTC_HALF_1,n.rectAreaLTC2=Dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let T=n.hash;(T.directionalLength!==d||T.pointLength!==m||T.spotLength!==x||T.rectAreaLength!==g||T.hemiLength!==p||T.numDirectionalShadows!==_||T.numPointShadows!==y||T.numSpotShadows!==v||T.numSpotMaps!==A||T.numLightProbes!==w)&&(n.directional.length=d,n.spot.length=x,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=v+A-b,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=w,T.directionalLength=d,T.pointLength=m,T.spotLength=x,T.rectAreaLength=g,T.hemiLength=p,T.numDirectionalShadows=_,T.numPointShadows=y,T.numSpotShadows=v,T.numSpotMaps=A,T.numLightProbes=w,n.version=_1++)}function c(l,h){let u=0,f=0,d=0,m=0,x=0,g=h.matrixWorldInverse;for(let p=0,_=l.length;p<_;p++){let y=l[p];if(y.isDirectionalLight){let v=n.directional[u];v.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),u++}else if(y.isSpotLight){let v=n.spot[d];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),d++}else if(y.isRectAreaLight){let v=n.rectArea[m];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(g),o.identity(),r.copy(y.matrixWorld),r.premultiply(g),o.extractRotation(r),v.halfWidth.set(y.width*.5,0,0),v.halfHeight.set(0,y.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),m++}else if(y.isPointLight){let v=n.point[f];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(g),f++}else if(y.isHemisphereLight){let v=n.hemi[x];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(g),x++}}}return{setup:a,setupView:c,state:n}}function Af(i){let t=new v1(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function M1(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Af(i),t.set(s,[a])):r>=o.length?(a=new Af(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Rr=class extends Si{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Cg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Nl=class extends Si{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},S1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,b1=`uniform sampler2D shadow_pass;
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
}`;function w1(i,t,e){let n=new Tr,s=new ft,r=new ft,o=new ee,a=new Rr({depthPacking:mh}),c=new Nl,l={},h=e.maxTextureSize,u={[vi]:$e,[$e]:vi,[_e]:_e},f=new an({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ft},radius:{value:4}},vertexShader:S1,fragmentShader:b1}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let m=new se;m.setAttribute("position",new Oe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Et(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vf;let p=this.type;this.render=function(b,w,T){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;let S=i.getRenderTarget(),M=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),N=i.state;N.setBlending(xi),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let D=p!==Zn&&this.type===Zn,I=p===Zn&&this.type!==Zn;for(let B=0,U=b.length;B<U;B++){let z=b[B],k=z.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",z,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);let J=k.getFrameExtents();if(s.multiply(J),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/J.x),s.x=r.x*J.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/J.y),s.y=r.y*J.y,k.mapSize.y=r.y)),k.map===null||D===!0||I===!0){let $=this.type!==Zn?{minFilter:fn,magFilter:fn}:{};k.map!==null&&k.map.dispose(),k.map=new gn(s.x,s.y,$),k.map.texture.name=z.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();let j=k.getViewportCount();for(let $=0;$<j;$++){let Z=k.getViewport($);o.set(r.x*Z.x,r.y*Z.y,r.x*Z.z,r.y*Z.w),N.viewport(o),k.updateMatrices(z,$),n=k.getFrustum(),v(w,T,k.camera,z,this.type)}k.isPointLightShadow!==!0&&this.type===Zn&&_(k,T),k.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(S,M,C)};function _(b,w){let T=t.update(x);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new gn(s.x,s.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(w,null,T,f,x,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(w,null,T,d,x,null)}function y(b,w,T,S){let M=null,C=T.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(C!==void 0)M=C;else if(M=T.isPointLight===!0?c:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){let N=M.uuid,D=w.uuid,I=l[N];I===void 0&&(I={},l[N]=I);let B=I[D];B===void 0&&(B=M.clone(),I[D]=B,w.addEventListener("dispose",A)),M=B}if(M.visible=w.visible,M.wireframe=w.wireframe,S===Zn?M.side=w.shadowSide!==null?w.shadowSide:w.side:M.side=w.shadowSide!==null?w.shadowSide:u[w.side],M.alphaMap=w.alphaMap,M.alphaTest=w.alphaTest,M.map=w.map,M.clipShadows=w.clipShadows,M.clippingPlanes=w.clippingPlanes,M.clipIntersection=w.clipIntersection,M.displacementMap=w.displacementMap,M.displacementScale=w.displacementScale,M.displacementBias=w.displacementBias,M.wireframeLinewidth=w.wireframeLinewidth,M.linewidth=w.linewidth,T.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let N=i.properties.get(M);N.light=T}return M}function v(b,w,T,S,M){if(b.visible===!1)return;if(b.layers.test(w.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&M===Zn)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,b.matrixWorld);let D=t.update(b),I=b.material;if(Array.isArray(I)){let B=D.groups;for(let U=0,z=B.length;U<z;U++){let k=B[U],J=I[k.materialIndex];if(J&&J.visible){let j=y(b,J,S,M);b.onBeforeShadow(i,b,w,T,D,j,k),i.renderBufferDirect(T,null,D,j,b,k),b.onAfterShadow(i,b,w,T,D,j,k)}}}else if(I.visible){let B=y(b,I,S,M);b.onBeforeShadow(i,b,w,T,D,B,null),i.renderBufferDirect(T,null,D,B,b,null),b.onAfterShadow(i,b,w,T,D,B,null)}}let N=b.children;for(let D=0,I=N.length;D<I;D++)v(N[D],w,T,S,M)}function A(b){b.target.removeEventListener("dispose",A);for(let T in l){let S=l[T],M=b.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}var A1={[kc]:Vc,[Hc]:Xc,[Gc]:Yc,[Ns]:Wc,[Vc]:kc,[Xc]:Hc,[Yc]:Gc,[Wc]:Ns};function E1(i,t){function e(){let V=!1,St=new ee,tt=null,lt=new ee(0,0,0,0);return{setMask:function(xt){tt!==xt&&!V&&(i.colorMask(xt,xt,xt,xt),tt=xt)},setLocked:function(xt){V=xt},setClear:function(xt,_t,qt,ne,Se){Se===!0&&(xt*=ne,_t*=ne,qt*=ne),St.set(xt,_t,qt,ne),lt.equals(St)===!1&&(i.clearColor(xt,_t,qt,ne),lt.copy(St))},reset:function(){V=!1,tt=null,lt.set(-1,0,0,0)}}}function n(){let V=!1,St=!1,tt=null,lt=null,xt=null;return{setReversed:function(_t){if(St!==_t){let qt=t.get("EXT_clip_control");St?qt.clipControlEXT(qt.LOWER_LEFT_EXT,qt.ZERO_TO_ONE_EXT):qt.clipControlEXT(qt.LOWER_LEFT_EXT,qt.NEGATIVE_ONE_TO_ONE_EXT);let ne=xt;xt=null,this.setClear(ne)}St=_t},getReversed:function(){return St},setTest:function(_t){_t?dt(i.DEPTH_TEST):yt(i.DEPTH_TEST)},setMask:function(_t){tt!==_t&&!V&&(i.depthMask(_t),tt=_t)},setFunc:function(_t){if(St&&(_t=A1[_t]),lt!==_t){switch(_t){case kc:i.depthFunc(i.NEVER);break;case Vc:i.depthFunc(i.ALWAYS);break;case Hc:i.depthFunc(i.LESS);break;case Ns:i.depthFunc(i.LEQUAL);break;case Gc:i.depthFunc(i.EQUAL);break;case Wc:i.depthFunc(i.GEQUAL);break;case Xc:i.depthFunc(i.GREATER);break;case Yc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}lt=_t}},setLocked:function(_t){V=_t},setClear:function(_t){xt!==_t&&(St&&(_t=1-_t),i.clearDepth(_t),xt=_t)},reset:function(){V=!1,tt=null,lt=null,xt=null,St=!1}}}function s(){let V=!1,St=null,tt=null,lt=null,xt=null,_t=null,qt=null,ne=null,Se=null;return{setTest:function(te){V||(te?dt(i.STENCIL_TEST):yt(i.STENCIL_TEST))},setMask:function(te){St!==te&&!V&&(i.stencilMask(te),St=te)},setFunc:function(te,fe,Vn){(tt!==te||lt!==fe||xt!==Vn)&&(i.stencilFunc(te,fe,Vn),tt=te,lt=fe,xt=Vn)},setOp:function(te,fe,Vn){(_t!==te||qt!==fe||ne!==Vn)&&(i.stencilOp(te,fe,Vn),_t=te,qt=fe,ne=Vn)},setLocked:function(te){V=te},setClear:function(te){Se!==te&&(i.clearStencil(te),Se=te)},reset:function(){V=!1,St=null,tt=null,lt=null,xt=null,_t=null,qt=null,ne=null,Se=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},u={},f=new WeakMap,d=[],m=null,x=!1,g=null,p=null,_=null,y=null,v=null,A=null,b=null,w=new Ot(0,0,0),T=0,S=!1,M=null,C=null,N=null,D=null,I=null,B=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),U=!1,z=0,k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(k)[1]),U=z>=1):k.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),U=z>=2);let J=null,j={},$=i.getParameter(i.SCISSOR_BOX),Z=i.getParameter(i.VIEWPORT),ut=new ee().fromArray($),q=new ee().fromArray(Z);function it(V,St,tt,lt){let xt=new Uint8Array(4),_t=i.createTexture();i.bindTexture(V,_t),i.texParameteri(V,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(V,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let qt=0;qt<tt;qt++)V===i.TEXTURE_3D||V===i.TEXTURE_2D_ARRAY?i.texImage3D(St,0,i.RGBA,1,1,lt,0,i.RGBA,i.UNSIGNED_BYTE,xt):i.texImage2D(St+qt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xt);return _t}let st={};st[i.TEXTURE_2D]=it(i.TEXTURE_2D,i.TEXTURE_2D,1),st[i.TEXTURE_CUBE_MAP]=it(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),st[i.TEXTURE_2D_ARRAY]=it(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),st[i.TEXTURE_3D]=it(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),dt(i.DEPTH_TEST),o.setFunc(Ns),ht(!1),wt(Tu),dt(i.CULL_FACE),F(xi);function dt(V){h[V]!==!0&&(i.enable(V),h[V]=!0)}function yt(V){h[V]!==!1&&(i.disable(V),h[V]=!1)}function Lt(V,St){return u[V]!==St?(i.bindFramebuffer(V,St),u[V]=St,V===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=St),V===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=St),!0):!1}function zt(V,St){let tt=d,lt=!1;if(V){tt=f.get(St),tt===void 0&&(tt=[],f.set(St,tt));let xt=V.textures;if(tt.length!==xt.length||tt[0]!==i.COLOR_ATTACHMENT0){for(let _t=0,qt=xt.length;_t<qt;_t++)tt[_t]=i.COLOR_ATTACHMENT0+_t;tt.length=xt.length,lt=!0}}else tt[0]!==i.BACK&&(tt[0]=i.BACK,lt=!0);lt&&i.drawBuffers(tt)}function Yt(V){return m!==V?(i.useProgram(V),m=V,!0):!1}let at={[ki]:i.FUNC_ADD,[ig]:i.FUNC_SUBTRACT,[sg]:i.FUNC_REVERSE_SUBTRACT};at[rg]=i.MIN,at[og]=i.MAX;let pt={[ag]:i.ZERO,[cg]:i.ONE,[lg]:i.SRC_COLOR,[Bc]:i.SRC_ALPHA,[mg]:i.SRC_ALPHA_SATURATE,[dg]:i.DST_COLOR,[ug]:i.DST_ALPHA,[hg]:i.ONE_MINUS_SRC_COLOR,[zc]:i.ONE_MINUS_SRC_ALPHA,[pg]:i.ONE_MINUS_DST_COLOR,[fg]:i.ONE_MINUS_DST_ALPHA,[gg]:i.CONSTANT_COLOR,[xg]:i.ONE_MINUS_CONSTANT_COLOR,[_g]:i.CONSTANT_ALPHA,[yg]:i.ONE_MINUS_CONSTANT_ALPHA};function F(V,St,tt,lt,xt,_t,qt,ne,Se,te){if(V===xi){x===!0&&(yt(i.BLEND),x=!1);return}if(x===!1&&(dt(i.BLEND),x=!0),V!==ng){if(V!==g||te!==S){if((p!==ki||v!==ki)&&(i.blendEquation(i.FUNC_ADD),p=ki,v=ki),te)switch(V){case Is:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ru:i.blendFunc(i.ONE,i.ONE);break;case Cu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Iu:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case Is:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ru:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Cu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Iu:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}_=null,y=null,A=null,b=null,w.set(0,0,0),T=0,g=V,S=te}return}xt=xt||St,_t=_t||tt,qt=qt||lt,(St!==p||xt!==v)&&(i.blendEquationSeparate(at[St],at[xt]),p=St,v=xt),(tt!==_||lt!==y||_t!==A||qt!==b)&&(i.blendFuncSeparate(pt[tt],pt[lt],pt[_t],pt[qt]),_=tt,y=lt,A=_t,b=qt),(ne.equals(w)===!1||Se!==T)&&(i.blendColor(ne.r,ne.g,ne.b,Se),w.copy(ne),T=Se),g=V,S=!1}function It(V,St){V.side===_e?yt(i.CULL_FACE):dt(i.CULL_FACE);let tt=V.side===$e;St&&(tt=!tt),ht(tt),V.blending===Is&&V.transparent===!1?F(xi):F(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),o.setFunc(V.depthFunc),o.setTest(V.depthTest),o.setMask(V.depthWrite),r.setMask(V.colorWrite);let lt=V.stencilWrite;a.setTest(lt),lt&&(a.setMask(V.stencilWriteMask),a.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),a.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Tt(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?dt(i.SAMPLE_ALPHA_TO_COVERAGE):yt(i.SAMPLE_ALPHA_TO_COVERAGE)}function ht(V){M!==V&&(V?i.frontFace(i.CW):i.frontFace(i.CCW),M=V)}function wt(V){V!==tg?(dt(i.CULL_FACE),V!==C&&(V===Tu?i.cullFace(i.BACK):V===eg?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):yt(i.CULL_FACE),C=V}function nt(V){V!==N&&(U&&i.lineWidth(V),N=V)}function Tt(V,St,tt){V?(dt(i.POLYGON_OFFSET_FILL),(D!==St||I!==tt)&&(i.polygonOffset(St,tt),D=St,I=tt)):yt(i.POLYGON_OFFSET_FILL)}function H(V){V?dt(i.SCISSOR_TEST):yt(i.SCISSOR_TEST)}function R(V){V===void 0&&(V=i.TEXTURE0+B-1),J!==V&&(i.activeTexture(V),J=V)}function E(V,St,tt){tt===void 0&&(J===null?tt=i.TEXTURE0+B-1:tt=J);let lt=j[tt];lt===void 0&&(lt={type:void 0,texture:void 0},j[tt]=lt),(lt.type!==V||lt.texture!==St)&&(J!==tt&&(i.activeTexture(tt),J=tt),i.bindTexture(V,St||st[V]),lt.type=V,lt.texture=St)}function O(){let V=j[J];V!==void 0&&V.type!==void 0&&(i.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function G(){try{i.compressedTexImage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function K(){try{i.compressedTexImage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Y(){try{i.texSubImage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Mt(){try{i.texSubImage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function gt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ct(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Pt(){try{i.texStorage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ot(){try{i.texStorage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function mt(){try{i.texImage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ct(){try{i.texImage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function rt(V){ut.equals(V)===!1&&(i.scissor(V.x,V.y,V.z,V.w),ut.copy(V))}function vt(V){q.equals(V)===!1&&(i.viewport(V.x,V.y,V.z,V.w),q.copy(V))}function Ft(V,St){let tt=l.get(St);tt===void 0&&(tt=new WeakMap,l.set(St,tt));let lt=tt.get(V);lt===void 0&&(lt=i.getUniformBlockIndex(St,V.name),tt.set(V,lt))}function Rt(V,St){let lt=l.get(St).get(V);c.get(St)!==lt&&(i.uniformBlockBinding(St,lt,V.__bindingPointIndex),c.set(St,lt))}function Nt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},J=null,j={},u={},f=new WeakMap,d=[],m=null,x=!1,g=null,p=null,_=null,y=null,v=null,A=null,b=null,w=new Ot(0,0,0),T=0,S=!1,M=null,C=null,N=null,D=null,I=null,ut.set(0,0,i.canvas.width,i.canvas.height),q.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:dt,disable:yt,bindFramebuffer:Lt,drawBuffers:zt,useProgram:Yt,setBlending:F,setMaterial:It,setFlipSided:ht,setCullFace:wt,setLineWidth:nt,setPolygonOffset:Tt,setScissorTest:H,activeTexture:R,bindTexture:E,unbindTexture:O,compressedTexImage2D:G,compressedTexImage3D:K,texImage2D:mt,texImage3D:Ct,updateUBOMapping:Ft,uniformBlockBinding:Rt,texStorage2D:Pt,texStorage3D:ot,texSubImage2D:Y,texSubImage3D:Mt,compressedTexSubImage2D:gt,compressedTexSubImage3D:ct,scissor:rt,viewport:vt,reset:Nt}}function Ef(i,t,e,n){let s=T1(n);switch(e){case qf:return i*t;case $f:return i*t;case Jf:return i*t*2;case Ji:return i*t/s.components*s.byteLength;case fh:return i*t/s.components*s.byteLength;case Kf:return i*t*2/s.components*s.byteLength;case dh:return i*t*2/s.components*s.byteLength;case Zf:return i*t*3/s.components*s.byteLength;case Fe:return i*t*4/s.components*s.byteLength;case ph:return i*t*4/s.components*s.byteLength;case Oo:case Bo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case zo:case ko:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Kc:case Qc:return Math.max(i,16)*Math.max(t,8)/4;case Jc:case jc:return Math.max(i,8)*Math.max(t,8)/2;case tl:case el:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case nl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case il:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case sl:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case rl:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ol:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case al:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case cl:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ll:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case hl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ul:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case fl:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case dl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case pl:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ml:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case gl:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Vo:case xl:case _l:return Math.ceil(i/4)*Math.ceil(t/4)*16;case jf:case yl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case vl:case Ml:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function T1(i){switch(i){case ti:case Wf:return{byteLength:1,components:1};case Sr:case Xf:case ni:return{byteLength:2,components:1};case hh:case uh:return{byteLength:2,components:4};case Hi:case lh:case Nn:return{byteLength:4,components:1};case Yf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function R1(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ft,h=new WeakMap,u,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(R,E){return d?new OffscreenCanvas(R,E):br("canvas")}function x(R,E,O){let G=1,K=H(R);if((K.width>O||K.height>O)&&(G=O/Math.max(K.width,K.height)),G<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let Y=Math.floor(G*K.width),Mt=Math.floor(G*K.height);u===void 0&&(u=m(Y,Mt));let gt=E?m(Y,Mt):u;return gt.width=Y,gt.height=Mt,gt.getContext("2d").drawImage(R,0,0,Y,Mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+Y+"x"+Mt+")."),gt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),R;return R}function g(R){return R.generateMipmaps}function p(R){i.generateMipmap(R)}function _(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(R,E,O,G,K=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let Y=E;if(E===i.RED&&(O===i.FLOAT&&(Y=i.R32F),O===i.HALF_FLOAT&&(Y=i.R16F),O===i.UNSIGNED_BYTE&&(Y=i.R8)),E===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.R8UI),O===i.UNSIGNED_SHORT&&(Y=i.R16UI),O===i.UNSIGNED_INT&&(Y=i.R32UI),O===i.BYTE&&(Y=i.R8I),O===i.SHORT&&(Y=i.R16I),O===i.INT&&(Y=i.R32I)),E===i.RG&&(O===i.FLOAT&&(Y=i.RG32F),O===i.HALF_FLOAT&&(Y=i.RG16F),O===i.UNSIGNED_BYTE&&(Y=i.RG8)),E===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.RG8UI),O===i.UNSIGNED_SHORT&&(Y=i.RG16UI),O===i.UNSIGNED_INT&&(Y=i.RG32UI),O===i.BYTE&&(Y=i.RG8I),O===i.SHORT&&(Y=i.RG16I),O===i.INT&&(Y=i.RG32I)),E===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),O===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),O===i.UNSIGNED_INT&&(Y=i.RGB32UI),O===i.BYTE&&(Y=i.RGB8I),O===i.SHORT&&(Y=i.RGB16I),O===i.INT&&(Y=i.RGB32I)),E===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),O===i.UNSIGNED_INT&&(Y=i.RGBA32UI),O===i.BYTE&&(Y=i.RGBA8I),O===i.SHORT&&(Y=i.RGBA16I),O===i.INT&&(Y=i.RGBA32I)),E===i.RGB&&O===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),E===i.RGBA){let Mt=K?da:ie.getTransfer(G);O===i.FLOAT&&(Y=i.RGBA32F),O===i.HALF_FLOAT&&(Y=i.RGBA16F),O===i.UNSIGNED_BYTE&&(Y=Mt===de?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function v(R,E){let O;return R?E===null||E===Hi||E===Os?O=i.DEPTH24_STENCIL8:E===Nn?O=i.DEPTH32F_STENCIL8:E===Sr&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Hi||E===Os?O=i.DEPTH_COMPONENT24:E===Nn?O=i.DEPTH_COMPONENT32F:E===Sr&&(O=i.DEPTH_COMPONENT16),O}function A(R,E){return g(R)===!0||R.isFramebufferTexture&&R.minFilter!==fn&&R.minFilter!==We?Math.log2(Math.max(E.width,E.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?E.mipmaps.length:1}function b(R){let E=R.target;E.removeEventListener("dispose",b),T(E),E.isVideoTexture&&h.delete(E)}function w(R){let E=R.target;E.removeEventListener("dispose",w),M(E)}function T(R){let E=n.get(R);if(E.__webglInit===void 0)return;let O=R.source,G=f.get(O);if(G){let K=G[E.__cacheKey];K.usedTimes--,K.usedTimes===0&&S(R),Object.keys(G).length===0&&f.delete(O)}n.remove(R)}function S(R){let E=n.get(R);i.deleteTexture(E.__webglTexture);let O=R.source,G=f.get(O);delete G[E.__cacheKey],o.memory.textures--}function M(R){let E=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(E.__webglFramebuffer[G]))for(let K=0;K<E.__webglFramebuffer[G].length;K++)i.deleteFramebuffer(E.__webglFramebuffer[G][K]);else i.deleteFramebuffer(E.__webglFramebuffer[G]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[G])}else{if(Array.isArray(E.__webglFramebuffer))for(let G=0;G<E.__webglFramebuffer.length;G++)i.deleteFramebuffer(E.__webglFramebuffer[G]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let G=0;G<E.__webglColorRenderbuffer.length;G++)E.__webglColorRenderbuffer[G]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[G]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let O=R.textures;for(let G=0,K=O.length;G<K;G++){let Y=n.get(O[G]);Y.__webglTexture&&(i.deleteTexture(Y.__webglTexture),o.memory.textures--),n.remove(O[G])}n.remove(R)}let C=0;function N(){C=0}function D(){let R=C;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),C+=1,R}function I(R){let E=[];return E.push(R.wrapS),E.push(R.wrapT),E.push(R.wrapR||0),E.push(R.magFilter),E.push(R.minFilter),E.push(R.anisotropy),E.push(R.internalFormat),E.push(R.format),E.push(R.type),E.push(R.generateMipmaps),E.push(R.premultiplyAlpha),E.push(R.flipY),E.push(R.unpackAlignment),E.push(R.colorSpace),E.join()}function B(R,E){let O=n.get(R);if(R.isVideoTexture&&nt(R),R.isRenderTargetTexture===!1&&R.version>0&&O.__version!==R.version){let G=R.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(O,R,E);return}}e.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+E)}function U(R,E){let O=n.get(R);if(R.version>0&&O.__version!==R.version){q(O,R,E);return}e.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+E)}function z(R,E){let O=n.get(R);if(R.version>0&&O.__version!==R.version){q(O,R,E);return}e.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+E)}function k(R,E){let O=n.get(R);if(R.version>0&&O.__version!==R.version){it(O,R,E);return}e.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+E)}let J={[He]:i.REPEAT,[Jn]:i.CLAMP_TO_EDGE,[$c]:i.MIRRORED_REPEAT},j={[fn]:i.NEAREST,[Rg]:i.NEAREST_MIPMAP_NEAREST,[ao]:i.NEAREST_MIPMAP_LINEAR,[We]:i.LINEAR,[nc]:i.LINEAR_MIPMAP_NEAREST,[En]:i.LINEAR_MIPMAP_LINEAR},$={[Pg]:i.NEVER,[Og]:i.ALWAYS,[Lg]:i.LESS,[td]:i.LEQUAL,[Dg]:i.EQUAL,[Fg]:i.GEQUAL,[Ng]:i.GREATER,[Ug]:i.NOTEQUAL};function Z(R,E){if(E.type===Nn&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===We||E.magFilter===nc||E.magFilter===ao||E.magFilter===En||E.minFilter===We||E.minFilter===nc||E.minFilter===ao||E.minFilter===En)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,J[E.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,J[E.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,J[E.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,j[E.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,j[E.minFilter]),E.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,$[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===fn||E.minFilter!==ao&&E.minFilter!==En||E.type===Nn&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let O=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function ut(R,E){let O=!1;R.__webglInit===void 0&&(R.__webglInit=!0,E.addEventListener("dispose",b));let G=E.source,K=f.get(G);K===void 0&&(K={},f.set(G,K));let Y=I(E);if(Y!==R.__cacheKey){K[Y]===void 0&&(K[Y]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,O=!0),K[Y].usedTimes++;let Mt=K[R.__cacheKey];Mt!==void 0&&(K[R.__cacheKey].usedTimes--,Mt.usedTimes===0&&S(E)),R.__cacheKey=Y,R.__webglTexture=K[Y].texture}return O}function q(R,E,O){let G=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(G=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(G=i.TEXTURE_3D);let K=ut(R,E),Y=E.source;e.bindTexture(G,R.__webglTexture,i.TEXTURE0+O);let Mt=n.get(Y);if(Y.version!==Mt.__version||K===!0){e.activeTexture(i.TEXTURE0+O);let gt=ie.getPrimaries(ie.workingColorSpace),ct=E.colorSpace===mi?null:ie.getPrimaries(E.colorSpace),Pt=E.colorSpace===mi||gt===ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);let ot=x(E.image,!1,s.maxTextureSize);ot=Tt(E,ot);let mt=r.convert(E.format,E.colorSpace),Ct=r.convert(E.type),rt=y(E.internalFormat,mt,Ct,E.colorSpace,E.isVideoTexture);Z(G,E);let vt,Ft=E.mipmaps,Rt=E.isVideoTexture!==!0,Nt=Mt.__version===void 0||K===!0,V=Y.dataReady,St=A(E,ot);if(E.isDepthTexture)rt=v(E.format===Bs,E.type),Nt&&(Rt?e.texStorage2D(i.TEXTURE_2D,1,rt,ot.width,ot.height):e.texImage2D(i.TEXTURE_2D,0,rt,ot.width,ot.height,0,mt,Ct,null));else if(E.isDataTexture)if(Ft.length>0){Rt&&Nt&&e.texStorage2D(i.TEXTURE_2D,St,rt,Ft[0].width,Ft[0].height);for(let tt=0,lt=Ft.length;tt<lt;tt++)vt=Ft[tt],Rt?V&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,vt.width,vt.height,mt,Ct,vt.data):e.texImage2D(i.TEXTURE_2D,tt,rt,vt.width,vt.height,0,mt,Ct,vt.data);E.generateMipmaps=!1}else Rt?(Nt&&e.texStorage2D(i.TEXTURE_2D,St,rt,ot.width,ot.height),V&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ot.width,ot.height,mt,Ct,ot.data)):e.texImage2D(i.TEXTURE_2D,0,rt,ot.width,ot.height,0,mt,Ct,ot.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Rt&&Nt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,rt,Ft[0].width,Ft[0].height,ot.depth);for(let tt=0,lt=Ft.length;tt<lt;tt++)if(vt=Ft[tt],E.format!==Fe)if(mt!==null)if(Rt){if(V)if(E.layerUpdates.size>0){let xt=Ef(vt.width,vt.height,E.format,E.type);for(let _t of E.layerUpdates){let qt=vt.data.subarray(_t*xt/vt.data.BYTES_PER_ELEMENT,(_t+1)*xt/vt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,_t,vt.width,vt.height,1,mt,qt)}E.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,vt.width,vt.height,ot.depth,mt,vt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,tt,rt,vt.width,vt.height,ot.depth,0,vt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Rt?V&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,vt.width,vt.height,ot.depth,mt,Ct,vt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,tt,rt,vt.width,vt.height,ot.depth,0,mt,Ct,vt.data)}else{Rt&&Nt&&e.texStorage2D(i.TEXTURE_2D,St,rt,Ft[0].width,Ft[0].height);for(let tt=0,lt=Ft.length;tt<lt;tt++)vt=Ft[tt],E.format!==Fe?mt!==null?Rt?V&&e.compressedTexSubImage2D(i.TEXTURE_2D,tt,0,0,vt.width,vt.height,mt,vt.data):e.compressedTexImage2D(i.TEXTURE_2D,tt,rt,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Rt?V&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,vt.width,vt.height,mt,Ct,vt.data):e.texImage2D(i.TEXTURE_2D,tt,rt,vt.width,vt.height,0,mt,Ct,vt.data)}else if(E.isDataArrayTexture)if(Rt){if(Nt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,rt,ot.width,ot.height,ot.depth),V)if(E.layerUpdates.size>0){let tt=Ef(ot.width,ot.height,E.format,E.type);for(let lt of E.layerUpdates){let xt=ot.data.subarray(lt*tt/ot.data.BYTES_PER_ELEMENT,(lt+1)*tt/ot.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,lt,ot.width,ot.height,1,mt,Ct,xt)}E.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,mt,Ct,ot.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,rt,ot.width,ot.height,ot.depth,0,mt,Ct,ot.data);else if(E.isData3DTexture)Rt?(Nt&&e.texStorage3D(i.TEXTURE_3D,St,rt,ot.width,ot.height,ot.depth),V&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,mt,Ct,ot.data)):e.texImage3D(i.TEXTURE_3D,0,rt,ot.width,ot.height,ot.depth,0,mt,Ct,ot.data);else if(E.isFramebufferTexture){if(Nt)if(Rt)e.texStorage2D(i.TEXTURE_2D,St,rt,ot.width,ot.height);else{let tt=ot.width,lt=ot.height;for(let xt=0;xt<St;xt++)e.texImage2D(i.TEXTURE_2D,xt,rt,tt,lt,0,mt,Ct,null),tt>>=1,lt>>=1}}else if(Ft.length>0){if(Rt&&Nt){let tt=H(Ft[0]);e.texStorage2D(i.TEXTURE_2D,St,rt,tt.width,tt.height)}for(let tt=0,lt=Ft.length;tt<lt;tt++)vt=Ft[tt],Rt?V&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,mt,Ct,vt):e.texImage2D(i.TEXTURE_2D,tt,rt,mt,Ct,vt);E.generateMipmaps=!1}else if(Rt){if(Nt){let tt=H(ot);e.texStorage2D(i.TEXTURE_2D,St,rt,tt.width,tt.height)}V&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,mt,Ct,ot)}else e.texImage2D(i.TEXTURE_2D,0,rt,mt,Ct,ot);g(E)&&p(G),Mt.__version=Y.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function it(R,E,O){if(E.image.length!==6)return;let G=ut(R,E),K=E.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+O);let Y=n.get(K);if(K.version!==Y.__version||G===!0){e.activeTexture(i.TEXTURE0+O);let Mt=ie.getPrimaries(ie.workingColorSpace),gt=E.colorSpace===mi?null:ie.getPrimaries(E.colorSpace),ct=E.colorSpace===mi||Mt===gt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ct);let Pt=E.isCompressedTexture||E.image[0].isCompressedTexture,ot=E.image[0]&&E.image[0].isDataTexture,mt=[];for(let lt=0;lt<6;lt++)!Pt&&!ot?mt[lt]=x(E.image[lt],!0,s.maxCubemapSize):mt[lt]=ot?E.image[lt].image:E.image[lt],mt[lt]=Tt(E,mt[lt]);let Ct=mt[0],rt=r.convert(E.format,E.colorSpace),vt=r.convert(E.type),Ft=y(E.internalFormat,rt,vt,E.colorSpace),Rt=E.isVideoTexture!==!0,Nt=Y.__version===void 0||G===!0,V=K.dataReady,St=A(E,Ct);Z(i.TEXTURE_CUBE_MAP,E);let tt;if(Pt){Rt&&Nt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,St,Ft,Ct.width,Ct.height);for(let lt=0;lt<6;lt++){tt=mt[lt].mipmaps;for(let xt=0;xt<tt.length;xt++){let _t=tt[xt];E.format!==Fe?rt!==null?Rt?V&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,xt,0,0,_t.width,_t.height,rt,_t.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,xt,Ft,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Rt?V&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,xt,0,0,_t.width,_t.height,rt,vt,_t.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,xt,Ft,_t.width,_t.height,0,rt,vt,_t.data)}}}else{if(tt=E.mipmaps,Rt&&Nt){tt.length>0&&St++;let lt=H(mt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,St,Ft,lt.width,lt.height)}for(let lt=0;lt<6;lt++)if(ot){Rt?V&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,mt[lt].width,mt[lt].height,rt,vt,mt[lt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,Ft,mt[lt].width,mt[lt].height,0,rt,vt,mt[lt].data);for(let xt=0;xt<tt.length;xt++){let qt=tt[xt].image[lt].image;Rt?V&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,xt+1,0,0,qt.width,qt.height,rt,vt,qt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,xt+1,Ft,qt.width,qt.height,0,rt,vt,qt.data)}}else{Rt?V&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,rt,vt,mt[lt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,Ft,rt,vt,mt[lt]);for(let xt=0;xt<tt.length;xt++){let _t=tt[xt];Rt?V&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,xt+1,0,0,rt,vt,_t.image[lt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,xt+1,Ft,rt,vt,_t.image[lt])}}}g(E)&&p(i.TEXTURE_CUBE_MAP),Y.__version=K.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function st(R,E,O,G,K,Y){let Mt=r.convert(O.format,O.colorSpace),gt=r.convert(O.type),ct=y(O.internalFormat,Mt,gt,O.colorSpace),Pt=n.get(E),ot=n.get(O);if(ot.__renderTarget=E,!Pt.__hasExternalTextures){let mt=Math.max(1,E.width>>Y),Ct=Math.max(1,E.height>>Y);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,Y,ct,mt,Ct,E.depth,0,Mt,gt,null):e.texImage2D(K,Y,ct,mt,Ct,0,Mt,gt,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),wt(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,G,K,ot.__webglTexture,0,ht(E)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,G,K,ot.__webglTexture,Y),e.bindFramebuffer(i.FRAMEBUFFER,null)}function dt(R,E,O){if(i.bindRenderbuffer(i.RENDERBUFFER,R),E.depthBuffer){let G=E.depthTexture,K=G&&G.isDepthTexture?G.type:null,Y=v(E.stencilBuffer,K),Mt=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,gt=ht(E);wt(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,gt,Y,E.width,E.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,gt,Y,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,Y,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Mt,i.RENDERBUFFER,R)}else{let G=E.textures;for(let K=0;K<G.length;K++){let Y=G[K],Mt=r.convert(Y.format,Y.colorSpace),gt=r.convert(Y.type),ct=y(Y.internalFormat,Mt,gt,Y.colorSpace),Pt=ht(E);O&&wt(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Pt,ct,E.width,E.height):wt(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Pt,ct,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,ct,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function yt(R,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let G=n.get(E.depthTexture);G.__renderTarget=E,(!G.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),B(E.depthTexture,0);let K=G.__webglTexture,Y=ht(E);if(E.depthTexture.format===Ps)wt(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(E.depthTexture.format===Bs)wt(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Lt(R){let E=n.get(R),O=R.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==R.depthTexture){let G=R.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),G){let K=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,G.removeEventListener("dispose",K)};G.addEventListener("dispose",K),E.__depthDisposeCallback=K}E.__boundDepthTexture=G}if(R.depthTexture&&!E.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");yt(E.__webglFramebuffer,R)}else if(O){E.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(e.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[G]),E.__webglDepthbuffer[G]===void 0)E.__webglDepthbuffer[G]=i.createRenderbuffer(),dt(E.__webglDepthbuffer[G],R,!1);else{let K=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=E.__webglDepthbuffer[G];i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,Y)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),dt(E.__webglDepthbuffer,R,!1);else{let G=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,G,i.RENDERBUFFER,K)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function zt(R,E,O){let G=n.get(R);E!==void 0&&st(G.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Lt(R)}function Yt(R){let E=R.texture,O=n.get(R),G=n.get(E);R.addEventListener("dispose",w);let K=R.textures,Y=R.isWebGLCubeRenderTarget===!0,Mt=K.length>1;if(Mt||(G.__webglTexture===void 0&&(G.__webglTexture=i.createTexture()),G.__version=E.version,o.memory.textures++),Y){O.__webglFramebuffer=[];for(let gt=0;gt<6;gt++)if(E.mipmaps&&E.mipmaps.length>0){O.__webglFramebuffer[gt]=[];for(let ct=0;ct<E.mipmaps.length;ct++)O.__webglFramebuffer[gt][ct]=i.createFramebuffer()}else O.__webglFramebuffer[gt]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){O.__webglFramebuffer=[];for(let gt=0;gt<E.mipmaps.length;gt++)O.__webglFramebuffer[gt]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(Mt)for(let gt=0,ct=K.length;gt<ct;gt++){let Pt=n.get(K[gt]);Pt.__webglTexture===void 0&&(Pt.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&wt(R)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let gt=0;gt<K.length;gt++){let ct=K[gt];O.__webglColorRenderbuffer[gt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[gt]);let Pt=r.convert(ct.format,ct.colorSpace),ot=r.convert(ct.type),mt=y(ct.internalFormat,Pt,ot,ct.colorSpace,R.isXRRenderTarget===!0),Ct=ht(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ct,mt,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,O.__webglColorRenderbuffer[gt])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),dt(O.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Y){e.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture),Z(i.TEXTURE_CUBE_MAP,E);for(let gt=0;gt<6;gt++)if(E.mipmaps&&E.mipmaps.length>0)for(let ct=0;ct<E.mipmaps.length;ct++)st(O.__webglFramebuffer[gt][ct],R,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,ct);else st(O.__webglFramebuffer[gt],R,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0);g(E)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Mt){for(let gt=0,ct=K.length;gt<ct;gt++){let Pt=K[gt],ot=n.get(Pt);e.bindTexture(i.TEXTURE_2D,ot.__webglTexture),Z(i.TEXTURE_2D,Pt),st(O.__webglFramebuffer,R,Pt,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,0),g(Pt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let gt=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(gt=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(gt,G.__webglTexture),Z(gt,E),E.mipmaps&&E.mipmaps.length>0)for(let ct=0;ct<E.mipmaps.length;ct++)st(O.__webglFramebuffer[ct],R,E,i.COLOR_ATTACHMENT0,gt,ct);else st(O.__webglFramebuffer,R,E,i.COLOR_ATTACHMENT0,gt,0);g(E)&&p(gt),e.unbindTexture()}R.depthBuffer&&Lt(R)}function at(R){let E=R.textures;for(let O=0,G=E.length;O<G;O++){let K=E[O];if(g(K)){let Y=_(R),Mt=n.get(K).__webglTexture;e.bindTexture(Y,Mt),p(Y),e.unbindTexture()}}}let pt=[],F=[];function It(R){if(R.samples>0){if(wt(R)===!1){let E=R.textures,O=R.width,G=R.height,K=i.COLOR_BUFFER_BIT,Y=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Mt=n.get(R),gt=E.length>1;if(gt)for(let ct=0;ct<E.length;ct++)e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let ct=0;ct<E.length;ct++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),gt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Mt.__webglColorRenderbuffer[ct]);let Pt=n.get(E[ct]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Pt,0)}i.blitFramebuffer(0,0,O,G,0,0,O,G,K,i.NEAREST),c===!0&&(pt.length=0,F.length=0,pt.push(i.COLOR_ATTACHMENT0+ct),R.depthBuffer&&R.resolveDepthBuffer===!1&&(pt.push(Y),F.push(Y),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,F)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,pt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),gt)for(let ct=0;ct<E.length;ct++){e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,Mt.__webglColorRenderbuffer[ct]);let Pt=n.get(E[ct]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.TEXTURE_2D,Pt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){let E=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function ht(R){return Math.min(s.maxSamples,R.samples)}function wt(R){let E=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function nt(R){let E=o.render.frame;h.get(R)!==E&&(h.set(R,E),R.update())}function Tt(R,E){let O=R.colorSpace,G=R.format,K=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||O!==Ei&&O!==mi&&(ie.getTransfer(O)===de?(G!==Fe||K!==ti)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),E}function H(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=D,this.resetTextureUnits=N,this.setTexture2D=B,this.setTexture2DArray=U,this.setTexture3D=z,this.setTextureCube=k,this.rebindTextures=zt,this.setupRenderTarget=Yt,this.updateRenderTargetMipmap=at,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=Lt,this.setupFrameBufferTexture=st,this.useMultisampledRTT=wt}function C1(i,t){function e(n,s=mi){let r,o=ie.getTransfer(s);if(n===ti)return i.UNSIGNED_BYTE;if(n===hh)return i.UNSIGNED_SHORT_4_4_4_4;if(n===uh)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Yf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Wf)return i.BYTE;if(n===Xf)return i.SHORT;if(n===Sr)return i.UNSIGNED_SHORT;if(n===lh)return i.INT;if(n===Hi)return i.UNSIGNED_INT;if(n===Nn)return i.FLOAT;if(n===ni)return i.HALF_FLOAT;if(n===qf)return i.ALPHA;if(n===Zf)return i.RGB;if(n===Fe)return i.RGBA;if(n===$f)return i.LUMINANCE;if(n===Jf)return i.LUMINANCE_ALPHA;if(n===Ps)return i.DEPTH_COMPONENT;if(n===Bs)return i.DEPTH_STENCIL;if(n===Ji)return i.RED;if(n===fh)return i.RED_INTEGER;if(n===Kf)return i.RG;if(n===dh)return i.RG_INTEGER;if(n===ph)return i.RGBA_INTEGER;if(n===Oo||n===Bo||n===zo||n===ko)if(o===de)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Oo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Bo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===zo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ko)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Oo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Bo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===zo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ko)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Jc||n===Kc||n===jc||n===Qc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Jc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Kc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===jc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Qc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===tl||n===el||n===nl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===tl||n===el)return o===de?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===nl)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===il||n===sl||n===rl||n===ol||n===al||n===cl||n===ll||n===hl||n===ul||n===fl||n===dl||n===pl||n===ml||n===gl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===il)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===sl)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===rl)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ol)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===al)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===cl)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ll)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===hl)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ul)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===fl)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===dl)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===pl)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ml)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===gl)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Vo||n===xl||n===_l)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Vo)return o===de?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===xl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===_l)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===jf||n===yl||n===vl||n===Ml)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Vo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===yl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===vl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ml)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Os?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Ul=class extends Ze{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},ae=class extends Ge{constructor(){super(),this.isGroup=!0,this.type="Group"}},I1={type:"move"},yr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ae,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ae,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ae,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let x of t.hand.values()){let g=e.getJointPose(x,n),p=this._getHandJoint(l,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,m=.005;l.inputState.pinching&&f>d+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(I1)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new ae;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},P1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,L1=`
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

}`,Fl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new tn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new an({vertexShader:P1,fragmentShader:L1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Et(new ce(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ol=class extends Mi{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,m=null,x=new Fl,g=e.getContextAttributes(),p=null,_=null,y=[],v=[],A=new ft,b=null,w=new Ze;w.viewport=new ee;let T=new Ze;T.viewport=new ee;let S=[w,T],M=new Ul,C=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let it=y[q];return it===void 0&&(it=new yr,y[q]=it),it.getTargetRaySpace()},this.getControllerGrip=function(q){let it=y[q];return it===void 0&&(it=new yr,y[q]=it),it.getGripSpace()},this.getHand=function(q){let it=y[q];return it===void 0&&(it=new yr,y[q]=it),it.getHandSpace()};function D(q){let it=v.indexOf(q.inputSource);if(it===-1)return;let st=y[it];st!==void 0&&(st.update(q.inputSource,q.frame,l||o),st.dispatchEvent({type:q.type,data:q.inputSource}))}function I(){s.removeEventListener("select",D),s.removeEventListener("selectstart",D),s.removeEventListener("selectend",D),s.removeEventListener("squeeze",D),s.removeEventListener("squeezestart",D),s.removeEventListener("squeezeend",D),s.removeEventListener("end",I),s.removeEventListener("inputsourceschange",B);for(let q=0;q<y.length;q++){let it=v[q];it!==null&&(v[q]=null,y[q].disconnect(it))}C=null,N=null,x.reset(),t.setRenderTarget(p),d=null,f=null,u=null,s=null,_=null,ut.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",D),s.addEventListener("selectstart",D),s.addEventListener("selectend",D),s.addEventListener("squeeze",D),s.addEventListener("squeezestart",D),s.addEventListener("squeezeend",D),s.addEventListener("end",I),s.addEventListener("inputsourceschange",B),g.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(A),s.renderState.layers===void 0){let it={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,it),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new gn(d.framebufferWidth,d.framebufferHeight,{format:Fe,type:ti,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let it=null,st=null,dt=null;g.depth&&(dt=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=g.stencil?Bs:Ps,st=g.stencil?Os:Hi);let yt={colorFormat:e.RGBA8,depthFormat:dt,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(yt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),_=new gn(f.textureWidth,f.textureHeight,{format:Fe,type:ti,depthTexture:new Hs(f.textureWidth,f.textureHeight,st,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),ut.setContext(s),ut.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function B(q){for(let it=0;it<q.removed.length;it++){let st=q.removed[it],dt=v.indexOf(st);dt>=0&&(v[dt]=null,y[dt].disconnect(st))}for(let it=0;it<q.added.length;it++){let st=q.added[it],dt=v.indexOf(st);if(dt===-1){for(let Lt=0;Lt<y.length;Lt++)if(Lt>=v.length){v.push(st),dt=Lt;break}else if(v[Lt]===null){v[Lt]=st,dt=Lt;break}if(dt===-1)break}let yt=y[dt];yt&&yt.connect(st)}}let U=new L,z=new L;function k(q,it,st){U.setFromMatrixPosition(it.matrixWorld),z.setFromMatrixPosition(st.matrixWorld);let dt=U.distanceTo(z),yt=it.projectionMatrix.elements,Lt=st.projectionMatrix.elements,zt=yt[14]/(yt[10]-1),Yt=yt[14]/(yt[10]+1),at=(yt[9]+1)/yt[5],pt=(yt[9]-1)/yt[5],F=(yt[8]-1)/yt[0],It=(Lt[8]+1)/Lt[0],ht=zt*F,wt=zt*It,nt=dt/(-F+It),Tt=nt*-F;if(it.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Tt),q.translateZ(nt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),yt[10]===-1)q.projectionMatrix.copy(it.projectionMatrix),q.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{let H=zt+nt,R=Yt+nt,E=ht-Tt,O=wt+(dt-Tt),G=at*Yt/R*H,K=pt*Yt/R*H;q.projectionMatrix.makePerspective(E,O,G,K,H,R),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function J(q,it){it===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(it.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let it=q.near,st=q.far;x.texture!==null&&(x.depthNear>0&&(it=x.depthNear),x.depthFar>0&&(st=x.depthFar)),M.near=T.near=w.near=it,M.far=T.far=w.far=st,(C!==M.near||N!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),C=M.near,N=M.far),w.layers.mask=q.layers.mask|2,T.layers.mask=q.layers.mask|4,M.layers.mask=w.layers.mask|T.layers.mask;let dt=q.parent,yt=M.cameras;J(M,dt);for(let Lt=0;Lt<yt.length;Lt++)J(yt[Lt],dt);yt.length===2?k(M,w,T):M.projectionMatrix.copy(w.projectionMatrix),j(q,M,dt)};function j(q,it,st){st===null?q.matrix.copy(it.matrixWorld):(q.matrix.copy(st.matrixWorld),q.matrix.invert(),q.matrix.multiply(it.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(it.projectionMatrix),q.projectionMatrixInverse.copy(it.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=wl*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(q){c=q,f!==null&&(f.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(M)};let $=null;function Z(q,it){if(h=it.getViewerPose(l||o),m=it,h!==null){let st=h.views;d!==null&&(t.setRenderTargetFramebuffer(_,d.framebuffer),t.setRenderTarget(_));let dt=!1;st.length!==M.cameras.length&&(M.cameras.length=0,dt=!0);for(let Lt=0;Lt<st.length;Lt++){let zt=st[Lt],Yt=null;if(d!==null)Yt=d.getViewport(zt);else{let pt=u.getViewSubImage(f,zt);Yt=pt.viewport,Lt===0&&(t.setRenderTargetTextures(_,pt.colorTexture,f.ignoreDepthValues?void 0:pt.depthStencilTexture),t.setRenderTarget(_))}let at=S[Lt];at===void 0&&(at=new Ze,at.layers.enable(Lt),at.viewport=new ee,S[Lt]=at),at.matrix.fromArray(zt.transform.matrix),at.matrix.decompose(at.position,at.quaternion,at.scale),at.projectionMatrix.fromArray(zt.projectionMatrix),at.projectionMatrixInverse.copy(at.projectionMatrix).invert(),at.viewport.set(Yt.x,Yt.y,Yt.width,Yt.height),Lt===0&&(M.matrix.copy(at.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),dt===!0&&M.cameras.push(at)}let yt=s.enabledFeatures;if(yt&&yt.includes("depth-sensing")){let Lt=u.getDepthInformation(st[0]);Lt&&Lt.isValid&&Lt.texture&&x.init(t,Lt,s.renderState)}}for(let st=0;st<y.length;st++){let dt=v[st],yt=y[st];dt!==null&&yt!==void 0&&yt.update(dt,it,l||o)}$&&$(q,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),m=null}let ut=new sd;ut.setAnimationLoop(Z),this.setAnimationLoop=function(q){$=q},this.dispose=function(){}}},Bi=new on,D1=new Vt;function N1(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,id(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,_,y,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),f(g,p),p.isMeshPhysicalMaterial&&d(g,p,v)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),x(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,_,y):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===$e&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===$e&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let _=t.get(p),y=_.envMap,v=_.envMapRotation;y&&(g.envMap.value=y,Bi.copy(v),Bi.x*=-1,Bi.y*=-1,Bi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Bi.y*=-1,Bi.z*=-1),g.envMapRotation.value.setFromMatrix4(D1.makeRotationFromEuler(Bi)),g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,_,y){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*_,g.scale.value=y*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,_){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===$e&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){let _=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function U1(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,y){let v=y.program;n.uniformBlockBinding(_,v)}function l(_,y){let v=s[_.id];v===void 0&&(m(_),v=h(_),s[_.id]=v,_.addEventListener("dispose",g));let A=y.program;n.updateUBOMapping(_,A);let b=t.render.frame;r[_.id]!==b&&(f(_),r[_.id]=b)}function h(_){let y=u();_.__bindingPointIndex=y;let v=i.createBuffer(),A=_.__size,b=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,A,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,v),v}function u(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){let y=s[_.id],v=_.uniforms,A=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let b=0,w=v.length;b<w;b++){let T=Array.isArray(v[b])?v[b]:[v[b]];for(let S=0,M=T.length;S<M;S++){let C=T[S];if(d(C,b,S,A)===!0){let N=C.__offset,D=Array.isArray(C.value)?C.value:[C.value],I=0;for(let B=0;B<D.length;B++){let U=D[B],z=x(U);typeof U=="number"||typeof U=="boolean"?(C.__data[0]=U,i.bufferSubData(i.UNIFORM_BUFFER,N+I,C.__data)):U.isMatrix3?(C.__data[0]=U.elements[0],C.__data[1]=U.elements[1],C.__data[2]=U.elements[2],C.__data[3]=0,C.__data[4]=U.elements[3],C.__data[5]=U.elements[4],C.__data[6]=U.elements[5],C.__data[7]=0,C.__data[8]=U.elements[6],C.__data[9]=U.elements[7],C.__data[10]=U.elements[8],C.__data[11]=0):(U.toArray(C.__data,I),I+=z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,N,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(_,y,v,A){let b=_.value,w=y+"_"+v;if(A[w]===void 0)return typeof b=="number"||typeof b=="boolean"?A[w]=b:A[w]=b.clone(),!0;{let T=A[w];if(typeof b=="number"||typeof b=="boolean"){if(T!==b)return A[w]=b,!0}else if(T.equals(b)===!1)return T.copy(b),!0}return!1}function m(_){let y=_.uniforms,v=0,A=16;for(let w=0,T=y.length;w<T;w++){let S=Array.isArray(y[w])?y[w]:[y[w]];for(let M=0,C=S.length;M<C;M++){let N=S[M],D=Array.isArray(N.value)?N.value:[N.value];for(let I=0,B=D.length;I<B;I++){let U=D[I],z=x(U),k=v%A,J=k%z.boundary,j=k+J;v+=J,j!==0&&A-j<z.storage&&(v+=A-j),N.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=v,v+=z.storage}}}let b=v%A;return b>0&&(v+=A-b),_.__size=v,_.__cache={},this}function x(_){let y={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(y.boundary=4,y.storage=4):_.isVector2?(y.boundary=8,y.storage=8):_.isVector3||_.isColor?(y.boundary=16,y.storage=12):_.isVector4?(y.boundary=16,y.storage=16):_.isMatrix3?(y.boundary=48,y.storage=48):_.isMatrix4?(y.boundary=64,y.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),y}function g(_){let y=_.target;y.removeEventListener("dispose",g);let v=o.indexOf(y.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(let _ in s)i.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}var Ko=class{constructor(t={}){let{canvas:e=zg(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;let m=new Uint32Array(4),x=new Int32Array(4),g=null,p=null,_=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=xe,this.toneMapping=_i,this.toneMappingExposure=1;let v=this,A=!1,b=0,w=0,T=null,S=-1,M=null,C=new ee,N=new ee,D=null,I=new Ot(0),B=0,U=e.width,z=e.height,k=1,J=null,j=null,$=new ee(0,0,U,z),Z=new ee(0,0,U,z),ut=!1,q=new Tr,it=!1,st=!1,dt=new Vt,yt=new Vt,Lt=new L,zt=new ee,Yt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},at=!1;function pt(){return T===null?k:1}let F=n;function It(P,W){return e.getContext(P,W)}try{let P={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${oh}`),e.addEventListener("webglcontextlost",lt,!1),e.addEventListener("webglcontextrestored",xt,!1),e.addEventListener("webglcontextcreationerror",_t,!1),F===null){let W="webgl2";if(F=It(W,P),F===null)throw It(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let ht,wt,nt,Tt,H,R,E,O,G,K,Y,Mt,gt,ct,Pt,ot,mt,Ct,rt,vt,Ft,Rt,Nt,V;function St(){ht=new Ky(F),ht.init(),Rt=new C1(F,ht),wt=new Xy(F,ht,t,Rt),nt=new E1(F,ht),wt.reverseDepthBuffer&&f&&nt.buffers.depth.setReversed(!0),Tt=new tv(F),H=new d1,R=new R1(F,ht,nt,H,wt,Rt,Tt),E=new qy(v),O=new Jy(v),G=new ax(F),Nt=new Gy(F,G),K=new jy(F,G,Tt,Nt),Y=new nv(F,K,G,Tt),rt=new ev(F,wt,R),ot=new Yy(H),Mt=new f1(v,E,O,ht,wt,Nt,ot),gt=new N1(v,H),ct=new m1,Pt=new M1(ht),Ct=new Hy(v,E,O,nt,Y,d,c),mt=new w1(v,Y,wt),V=new U1(F,Tt,wt,nt),vt=new Wy(F,ht,Tt),Ft=new Qy(F,ht,Tt),Tt.programs=Mt.programs,v.capabilities=wt,v.extensions=ht,v.properties=H,v.renderLists=ct,v.shadowMap=mt,v.state=nt,v.info=Tt}St();let tt=new Ol(v,F);this.xr=tt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let P=ht.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){let P=ht.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(P){P!==void 0&&(k=P,this.setSize(U,z,!1))},this.getSize=function(P){return P.set(U,z)},this.setSize=function(P,W,Q=!0){if(tt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=P,z=W,e.width=Math.floor(P*k),e.height=Math.floor(W*k),Q===!0&&(e.style.width=P+"px",e.style.height=W+"px"),this.setViewport(0,0,P,W)},this.getDrawingBufferSize=function(P){return P.set(U*k,z*k).floor()},this.setDrawingBufferSize=function(P,W,Q){U=P,z=W,k=Q,e.width=Math.floor(P*Q),e.height=Math.floor(W*Q),this.setViewport(0,0,P,W)},this.getCurrentViewport=function(P){return P.copy(C)},this.getViewport=function(P){return P.copy($)},this.setViewport=function(P,W,Q,et){P.isVector4?$.set(P.x,P.y,P.z,P.w):$.set(P,W,Q,et),nt.viewport(C.copy($).multiplyScalar(k).round())},this.getScissor=function(P){return P.copy(Z)},this.setScissor=function(P,W,Q,et){P.isVector4?Z.set(P.x,P.y,P.z,P.w):Z.set(P,W,Q,et),nt.scissor(N.copy(Z).multiplyScalar(k).round())},this.getScissorTest=function(){return ut},this.setScissorTest=function(P){nt.setScissorTest(ut=P)},this.setOpaqueSort=function(P){J=P},this.setTransparentSort=function(P){j=P},this.getClearColor=function(P){return P.copy(Ct.getClearColor())},this.setClearColor=function(){Ct.setClearColor.apply(Ct,arguments)},this.getClearAlpha=function(){return Ct.getClearAlpha()},this.setClearAlpha=function(){Ct.setClearAlpha.apply(Ct,arguments)},this.clear=function(P=!0,W=!0,Q=!0){let et=0;if(P){let X=!1;if(T!==null){let At=T.texture.format;X=At===ph||At===dh||At===fh}if(X){let At=T.texture.type,Ut=At===ti||At===Hi||At===Sr||At===Os||At===hh||At===uh,Ht=Ct.getClearColor(),Gt=Ct.getClearAlpha(),$t=Ht.r,Qt=Ht.g,Wt=Ht.b;Ut?(m[0]=$t,m[1]=Qt,m[2]=Wt,m[3]=Gt,F.clearBufferuiv(F.COLOR,0,m)):(x[0]=$t,x[1]=Qt,x[2]=Wt,x[3]=Gt,F.clearBufferiv(F.COLOR,0,x))}else et|=F.COLOR_BUFFER_BIT}W&&(et|=F.DEPTH_BUFFER_BIT),Q&&(et|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(et)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",lt,!1),e.removeEventListener("webglcontextrestored",xt,!1),e.removeEventListener("webglcontextcreationerror",_t,!1),ct.dispose(),Pt.dispose(),H.dispose(),E.dispose(),O.dispose(),Y.dispose(),Nt.dispose(),V.dispose(),Mt.dispose(),tt.dispose(),tt.removeEventListener("sessionstart",yu),tt.removeEventListener("sessionend",vu),Li.stop()};function lt(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function xt(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;let P=Tt.autoReset,W=mt.enabled,Q=mt.autoUpdate,et=mt.needsUpdate,X=mt.type;St(),Tt.autoReset=P,mt.enabled=W,mt.autoUpdate=Q,mt.needsUpdate=et,mt.type=X}function _t(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function qt(P){let W=P.target;W.removeEventListener("dispose",qt),ne(W)}function ne(P){Se(P),H.remove(P)}function Se(P){let W=H.get(P).programs;W!==void 0&&(W.forEach(function(Q){Mt.releaseProgram(Q)}),P.isShaderMaterial&&Mt.releaseShaderCache(P))}this.renderBufferDirect=function(P,W,Q,et,X,At){W===null&&(W=Yt);let Ut=X.isMesh&&X.matrixWorld.determinant()<0,Ht=K0(P,W,Q,et,X);nt.setMaterial(et,Ut);let Gt=Q.index,$t=1;if(et.wireframe===!0){if(Gt=K.getWireframeAttribute(Q),Gt===void 0)return;$t=2}let Qt=Q.drawRange,Wt=Q.attributes.position,re=Qt.start*$t,ge=(Qt.start+Qt.count)*$t;At!==null&&(re=Math.max(re,At.start*$t),ge=Math.min(ge,(At.start+At.count)*$t)),Gt!==null?(re=Math.max(re,0),ge=Math.min(ge,Gt.count)):Wt!=null&&(re=Math.max(re,0),ge=Math.min(ge,Wt.count));let ye=ge-re;if(ye<0||ye===1/0)return;Nt.setup(X,et,Ht,Q,Gt);let rn,le=vt;if(Gt!==null&&(rn=G.get(Gt),le=Ft,le.setIndex(rn)),X.isMesh)et.wireframe===!0?(nt.setLineWidth(et.wireframeLinewidth*pt()),le.setMode(F.LINES)):le.setMode(F.TRIANGLES);else if(X.isLine){let Xt=et.linewidth;Xt===void 0&&(Xt=1),nt.setLineWidth(Xt*pt()),X.isLineSegments?le.setMode(F.LINES):X.isLineLoop?le.setMode(F.LINE_LOOP):le.setMode(F.LINE_STRIP)}else X.isPoints?le.setMode(F.POINTS):X.isSprite&&le.setMode(F.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)le.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(ht.get("WEBGL_multi_draw"))le.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{let Xt=X._multiDrawStarts,Hn=X._multiDrawCounts,he=X._multiDrawCount,Sn=Gt?G.get(Gt).bytesPerElement:1,cs=H.get(et).currentProgram.getUniforms();for(let ln=0;ln<he;ln++)cs.setValue(F,"_gl_DrawID",ln),le.render(Xt[ln]/Sn,Hn[ln])}else if(X.isInstancedMesh)le.renderInstances(re,ye,X.count);else if(Q.isInstancedBufferGeometry){let Xt=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,Hn=Math.min(Q.instanceCount,Xt);le.renderInstances(re,ye,Hn)}else le.render(re,ye)};function te(P,W,Q){P.transparent===!0&&P.side===_e&&P.forceSinglePass===!1?(P.side=$e,P.needsUpdate=!0,oo(P,W,Q),P.side=vi,P.needsUpdate=!0,oo(P,W,Q),P.side=_e):oo(P,W,Q)}this.compile=function(P,W,Q=null){Q===null&&(Q=P),p=Pt.get(Q),p.init(W),y.push(p),Q.traverseVisible(function(X){X.isLight&&X.layers.test(W.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),P!==Q&&P.traverseVisible(function(X){X.isLight&&X.layers.test(W.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),p.setupLights();let et=new Set;return P.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;let At=X.material;if(At)if(Array.isArray(At))for(let Ut=0;Ut<At.length;Ut++){let Ht=At[Ut];te(Ht,Q,X),et.add(Ht)}else te(At,Q,X),et.add(At)}),y.pop(),p=null,et},this.compileAsync=function(P,W,Q=null){let et=this.compile(P,W,Q);return new Promise(X=>{function At(){if(et.forEach(function(Ut){H.get(Ut).currentProgram.isReady()&&et.delete(Ut)}),et.size===0){X(P);return}setTimeout(At,10)}ht.get("KHR_parallel_shader_compile")!==null?At():setTimeout(At,10)})};let fe=null;function Vn(P){fe&&fe(P)}function yu(){Li.stop()}function vu(){Li.start()}let Li=new sd;Li.setAnimationLoop(Vn),typeof self<"u"&&Li.setContext(self),this.setAnimationLoop=function(P){fe=P,tt.setAnimationLoop(P),P===null?Li.stop():Li.start()},tt.addEventListener("sessionstart",yu),tt.addEventListener("sessionend",vu),this.render=function(P,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),tt.enabled===!0&&tt.isPresenting===!0&&(tt.cameraAutoUpdate===!0&&tt.updateCamera(W),W=tt.getCamera()),P.isScene===!0&&P.onBeforeRender(v,P,W,T),p=Pt.get(P,y.length),p.init(W),y.push(p),yt.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),q.setFromProjectionMatrix(yt),st=this.localClippingEnabled,it=ot.init(this.clippingPlanes,st),g=ct.get(P,_.length),g.init(),_.push(g),tt.enabled===!0&&tt.isPresenting===!0){let At=v.xr.getDepthSensingMesh();At!==null&&ec(At,W,-1/0,v.sortObjects)}ec(P,W,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(J,j),at=tt.enabled===!1||tt.isPresenting===!1||tt.hasDepthSensing()===!1,at&&Ct.addToRenderList(g,P),this.info.render.frame++,it===!0&&ot.beginShadows();let Q=p.state.shadowsArray;mt.render(Q,P,W),it===!0&&ot.endShadows(),this.info.autoReset===!0&&this.info.reset();let et=g.opaque,X=g.transmissive;if(p.setupLights(),W.isArrayCamera){let At=W.cameras;if(X.length>0)for(let Ut=0,Ht=At.length;Ut<Ht;Ut++){let Gt=At[Ut];Su(et,X,P,Gt)}at&&Ct.render(P);for(let Ut=0,Ht=At.length;Ut<Ht;Ut++){let Gt=At[Ut];Mu(g,P,Gt,Gt.viewport)}}else X.length>0&&Su(et,X,P,W),at&&Ct.render(P),Mu(g,P,W);T!==null&&(R.updateMultisampleRenderTarget(T),R.updateRenderTargetMipmap(T)),P.isScene===!0&&P.onAfterRender(v,P,W),Nt.resetDefaultState(),S=-1,M=null,y.pop(),y.length>0?(p=y[y.length-1],it===!0&&ot.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,_.pop(),_.length>0?g=_[_.length-1]:g=null};function ec(P,W,Q,et){if(P.visible===!1)return;if(P.layers.test(W.layers)){if(P.isGroup)Q=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(W);else if(P.isLight)p.pushLight(P),P.castShadow&&p.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||q.intersectsSprite(P)){et&&zt.setFromMatrixPosition(P.matrixWorld).applyMatrix4(yt);let Ut=Y.update(P),Ht=P.material;Ht.visible&&g.push(P,Ut,Ht,Q,zt.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||q.intersectsObject(P))){let Ut=Y.update(P),Ht=P.material;if(et&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),zt.copy(P.boundingSphere.center)):(Ut.boundingSphere===null&&Ut.computeBoundingSphere(),zt.copy(Ut.boundingSphere.center)),zt.applyMatrix4(P.matrixWorld).applyMatrix4(yt)),Array.isArray(Ht)){let Gt=Ut.groups;for(let $t=0,Qt=Gt.length;$t<Qt;$t++){let Wt=Gt[$t],re=Ht[Wt.materialIndex];re&&re.visible&&g.push(P,Ut,re,Q,zt.z,Wt)}}else Ht.visible&&g.push(P,Ut,Ht,Q,zt.z,null)}}let At=P.children;for(let Ut=0,Ht=At.length;Ut<Ht;Ut++)ec(At[Ut],W,Q,et)}function Mu(P,W,Q,et){let X=P.opaque,At=P.transmissive,Ut=P.transparent;p.setupLightsView(Q),it===!0&&ot.setGlobalState(v.clippingPlanes,Q),et&&nt.viewport(C.copy(et)),X.length>0&&ro(X,W,Q),At.length>0&&ro(At,W,Q),Ut.length>0&&ro(Ut,W,Q),nt.buffers.depth.setTest(!0),nt.buffers.depth.setMask(!0),nt.buffers.color.setMask(!0),nt.setPolygonOffset(!1)}function Su(P,W,Q,et){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[et.id]===void 0&&(p.state.transmissionRenderTarget[et.id]=new gn(1,1,{generateMipmaps:!0,type:ht.has("EXT_color_buffer_half_float")||ht.has("EXT_color_buffer_float")?ni:ti,minFilter:En,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ie.workingColorSpace}));let At=p.state.transmissionRenderTarget[et.id],Ut=et.viewport||C;At.setSize(Ut.z,Ut.w);let Ht=v.getRenderTarget();v.setRenderTarget(At),v.getClearColor(I),B=v.getClearAlpha(),B<1&&v.setClearColor(16777215,.5),v.clear(),at&&Ct.render(Q);let Gt=v.toneMapping;v.toneMapping=_i;let $t=et.viewport;if(et.viewport!==void 0&&(et.viewport=void 0),p.setupLightsView(et),it===!0&&ot.setGlobalState(v.clippingPlanes,et),ro(P,Q,et),R.updateMultisampleRenderTarget(At),R.updateRenderTargetMipmap(At),ht.has("WEBGL_multisampled_render_to_texture")===!1){let Qt=!1;for(let Wt=0,re=W.length;Wt<re;Wt++){let ge=W[Wt],ye=ge.object,rn=ge.geometry,le=ge.material,Xt=ge.group;if(le.side===_e&&ye.layers.test(et.layers)){let Hn=le.side;le.side=$e,le.needsUpdate=!0,bu(ye,Q,et,rn,le,Xt),le.side=Hn,le.needsUpdate=!0,Qt=!0}}Qt===!0&&(R.updateMultisampleRenderTarget(At),R.updateRenderTargetMipmap(At))}v.setRenderTarget(Ht),v.setClearColor(I,B),$t!==void 0&&(et.viewport=$t),v.toneMapping=Gt}function ro(P,W,Q){let et=W.isScene===!0?W.overrideMaterial:null;for(let X=0,At=P.length;X<At;X++){let Ut=P[X],Ht=Ut.object,Gt=Ut.geometry,$t=et===null?Ut.material:et,Qt=Ut.group;Ht.layers.test(Q.layers)&&bu(Ht,W,Q,Gt,$t,Qt)}}function bu(P,W,Q,et,X,At){P.onBeforeRender(v,W,Q,et,X,At),P.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),X.onBeforeRender(v,W,Q,et,P,At),X.transparent===!0&&X.side===_e&&X.forceSinglePass===!1?(X.side=$e,X.needsUpdate=!0,v.renderBufferDirect(Q,W,et,X,P,At),X.side=vi,X.needsUpdate=!0,v.renderBufferDirect(Q,W,et,X,P,At),X.side=_e):v.renderBufferDirect(Q,W,et,X,P,At),P.onAfterRender(v,W,Q,et,X,At)}function oo(P,W,Q){W.isScene!==!0&&(W=Yt);let et=H.get(P),X=p.state.lights,At=p.state.shadowsArray,Ut=X.state.version,Ht=Mt.getParameters(P,X.state,At,W,Q),Gt=Mt.getProgramCacheKey(Ht),$t=et.programs;et.environment=P.isMeshStandardMaterial?W.environment:null,et.fog=W.fog,et.envMap=(P.isMeshStandardMaterial?O:E).get(P.envMap||et.environment),et.envMapRotation=et.environment!==null&&P.envMap===null?W.environmentRotation:P.envMapRotation,$t===void 0&&(P.addEventListener("dispose",qt),$t=new Map,et.programs=$t);let Qt=$t.get(Gt);if(Qt!==void 0){if(et.currentProgram===Qt&&et.lightsStateVersion===Ut)return Au(P,Ht),Qt}else Ht.uniforms=Mt.getUniforms(P),P.onBeforeCompile(Ht,v),Qt=Mt.acquireProgram(Ht,Gt),$t.set(Gt,Qt),et.uniforms=Ht.uniforms;let Wt=et.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(Wt.clippingPlanes=ot.uniform),Au(P,Ht),et.needsLights=Q0(P),et.lightsStateVersion=Ut,et.needsLights&&(Wt.ambientLightColor.value=X.state.ambient,Wt.lightProbe.value=X.state.probe,Wt.directionalLights.value=X.state.directional,Wt.directionalLightShadows.value=X.state.directionalShadow,Wt.spotLights.value=X.state.spot,Wt.spotLightShadows.value=X.state.spotShadow,Wt.rectAreaLights.value=X.state.rectArea,Wt.ltc_1.value=X.state.rectAreaLTC1,Wt.ltc_2.value=X.state.rectAreaLTC2,Wt.pointLights.value=X.state.point,Wt.pointLightShadows.value=X.state.pointShadow,Wt.hemisphereLights.value=X.state.hemi,Wt.directionalShadowMap.value=X.state.directionalShadowMap,Wt.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Wt.spotShadowMap.value=X.state.spotShadowMap,Wt.spotLightMatrix.value=X.state.spotLightMatrix,Wt.spotLightMap.value=X.state.spotLightMap,Wt.pointShadowMap.value=X.state.pointShadowMap,Wt.pointShadowMatrix.value=X.state.pointShadowMatrix),et.currentProgram=Qt,et.uniformsList=null,Qt}function wu(P){if(P.uniformsList===null){let W=P.currentProgram.getUniforms();P.uniformsList=Ds.seqWithValue(W.seq,P.uniforms)}return P.uniformsList}function Au(P,W){let Q=H.get(P);Q.outputColorSpace=W.outputColorSpace,Q.batching=W.batching,Q.batchingColor=W.batchingColor,Q.instancing=W.instancing,Q.instancingColor=W.instancingColor,Q.instancingMorph=W.instancingMorph,Q.skinning=W.skinning,Q.morphTargets=W.morphTargets,Q.morphNormals=W.morphNormals,Q.morphColors=W.morphColors,Q.morphTargetsCount=W.morphTargetsCount,Q.numClippingPlanes=W.numClippingPlanes,Q.numIntersection=W.numClipIntersection,Q.vertexAlphas=W.vertexAlphas,Q.vertexTangents=W.vertexTangents,Q.toneMapping=W.toneMapping}function K0(P,W,Q,et,X){W.isScene!==!0&&(W=Yt),R.resetTextureUnits();let At=W.fog,Ut=et.isMeshStandardMaterial?W.environment:null,Ht=T===null?v.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Ei,Gt=(et.isMeshStandardMaterial?O:E).get(et.envMap||Ut),$t=et.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,Qt=!!Q.attributes.tangent&&(!!et.normalMap||et.anisotropy>0),Wt=!!Q.morphAttributes.position,re=!!Q.morphAttributes.normal,ge=!!Q.morphAttributes.color,ye=_i;et.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(ye=v.toneMapping);let rn=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,le=rn!==void 0?rn.length:0,Xt=H.get(et),Hn=p.state.lights;if(it===!0&&(st===!0||P!==M)){let pn=P===M&&et.id===S;ot.setState(et,P,pn)}let he=!1;et.version===Xt.__version?(Xt.needsLights&&Xt.lightsStateVersion!==Hn.state.version||Xt.outputColorSpace!==Ht||X.isBatchedMesh&&Xt.batching===!1||!X.isBatchedMesh&&Xt.batching===!0||X.isBatchedMesh&&Xt.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&Xt.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&Xt.instancing===!1||!X.isInstancedMesh&&Xt.instancing===!0||X.isSkinnedMesh&&Xt.skinning===!1||!X.isSkinnedMesh&&Xt.skinning===!0||X.isInstancedMesh&&Xt.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Xt.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Xt.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Xt.instancingMorph===!1&&X.morphTexture!==null||Xt.envMap!==Gt||et.fog===!0&&Xt.fog!==At||Xt.numClippingPlanes!==void 0&&(Xt.numClippingPlanes!==ot.numPlanes||Xt.numIntersection!==ot.numIntersection)||Xt.vertexAlphas!==$t||Xt.vertexTangents!==Qt||Xt.morphTargets!==Wt||Xt.morphNormals!==re||Xt.morphColors!==ge||Xt.toneMapping!==ye||Xt.morphTargetsCount!==le)&&(he=!0):(he=!0,Xt.__version=et.version);let Sn=Xt.currentProgram;he===!0&&(Sn=oo(et,W,X));let cs=!1,ln=!1,rr=!1,ve=Sn.getUniforms(),Pn=Xt.uniforms;if(nt.useProgram(Sn.program)&&(cs=!0,ln=!0,rr=!0),et.id!==S&&(S=et.id,ln=!0),cs||M!==P){nt.buffers.depth.getReversed()?(dt.copy(P.projectionMatrix),Vg(dt),Hg(dt),ve.setValue(F,"projectionMatrix",dt)):ve.setValue(F,"projectionMatrix",P.projectionMatrix),ve.setValue(F,"viewMatrix",P.matrixWorldInverse);let ai=ve.map.cameraPosition;ai!==void 0&&ai.setValue(F,Lt.setFromMatrixPosition(P.matrixWorld)),wt.logarithmicDepthBuffer&&ve.setValue(F,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(et.isMeshPhongMaterial||et.isMeshToonMaterial||et.isMeshLambertMaterial||et.isMeshBasicMaterial||et.isMeshStandardMaterial||et.isShaderMaterial)&&ve.setValue(F,"isOrthographic",P.isOrthographicCamera===!0),M!==P&&(M=P,ln=!0,rr=!0)}if(X.isSkinnedMesh){ve.setOptional(F,X,"bindMatrix"),ve.setOptional(F,X,"bindMatrixInverse");let pn=X.skeleton;pn&&(pn.boneTexture===null&&pn.computeBoneTexture(),ve.setValue(F,"boneTexture",pn.boneTexture,R))}X.isBatchedMesh&&(ve.setOptional(F,X,"batchingTexture"),ve.setValue(F,"batchingTexture",X._matricesTexture,R),ve.setOptional(F,X,"batchingIdTexture"),ve.setValue(F,"batchingIdTexture",X._indirectTexture,R),ve.setOptional(F,X,"batchingColorTexture"),X._colorsTexture!==null&&ve.setValue(F,"batchingColorTexture",X._colorsTexture,R));let or=Q.morphAttributes;if((or.position!==void 0||or.normal!==void 0||or.color!==void 0)&&rt.update(X,Q,Sn),(ln||Xt.receiveShadow!==X.receiveShadow)&&(Xt.receiveShadow=X.receiveShadow,ve.setValue(F,"receiveShadow",X.receiveShadow)),et.isMeshGouraudMaterial&&et.envMap!==null&&(Pn.envMap.value=Gt,Pn.flipEnvMap.value=Gt.isCubeTexture&&Gt.isRenderTargetTexture===!1?-1:1),et.isMeshStandardMaterial&&et.envMap===null&&W.environment!==null&&(Pn.envMapIntensity.value=W.environmentIntensity),ln&&(ve.setValue(F,"toneMappingExposure",v.toneMappingExposure),Xt.needsLights&&j0(Pn,rr),At&&et.fog===!0&&gt.refreshFogUniforms(Pn,At),gt.refreshMaterialUniforms(Pn,et,k,z,p.state.transmissionRenderTarget[P.id]),Ds.upload(F,wu(Xt),Pn,R)),et.isShaderMaterial&&et.uniformsNeedUpdate===!0&&(Ds.upload(F,wu(Xt),Pn,R),et.uniformsNeedUpdate=!1),et.isSpriteMaterial&&ve.setValue(F,"center",X.center),ve.setValue(F,"modelViewMatrix",X.modelViewMatrix),ve.setValue(F,"normalMatrix",X.normalMatrix),ve.setValue(F,"modelMatrix",X.matrixWorld),et.isShaderMaterial||et.isRawShaderMaterial){let pn=et.uniformsGroups;for(let ai=0,ci=pn.length;ai<ci;ai++){let Eu=pn[ai];V.update(Eu,Sn),V.bind(Eu,Sn)}}return Sn}function j0(P,W){P.ambientLightColor.needsUpdate=W,P.lightProbe.needsUpdate=W,P.directionalLights.needsUpdate=W,P.directionalLightShadows.needsUpdate=W,P.pointLights.needsUpdate=W,P.pointLightShadows.needsUpdate=W,P.spotLights.needsUpdate=W,P.spotLightShadows.needsUpdate=W,P.rectAreaLights.needsUpdate=W,P.hemisphereLights.needsUpdate=W}function Q0(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(P,W,Q){H.get(P.texture).__webglTexture=W,H.get(P.depthTexture).__webglTexture=Q;let et=H.get(P);et.__hasExternalTextures=!0,et.__autoAllocateDepthBuffer=Q===void 0,et.__autoAllocateDepthBuffer||ht.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),et.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(P,W){let Q=H.get(P);Q.__webglFramebuffer=W,Q.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(P,W=0,Q=0){T=P,b=W,w=Q;let et=!0,X=null,At=!1,Ut=!1;if(P){let Gt=H.get(P);if(Gt.__useDefaultFramebuffer!==void 0)nt.bindFramebuffer(F.FRAMEBUFFER,null),et=!1;else if(Gt.__webglFramebuffer===void 0)R.setupRenderTarget(P);else if(Gt.__hasExternalTextures)R.rebindTextures(P,H.get(P.texture).__webglTexture,H.get(P.depthTexture).__webglTexture);else if(P.depthBuffer){let Wt=P.depthTexture;if(Gt.__boundDepthTexture!==Wt){if(Wt!==null&&H.has(Wt)&&(P.width!==Wt.image.width||P.height!==Wt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(P)}}let $t=P.texture;($t.isData3DTexture||$t.isDataArrayTexture||$t.isCompressedArrayTexture)&&(Ut=!0);let Qt=H.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(Qt[W])?X=Qt[W][Q]:X=Qt[W],At=!0):P.samples>0&&R.useMultisampledRTT(P)===!1?X=H.get(P).__webglMultisampledFramebuffer:Array.isArray(Qt)?X=Qt[Q]:X=Qt,C.copy(P.viewport),N.copy(P.scissor),D=P.scissorTest}else C.copy($).multiplyScalar(k).floor(),N.copy(Z).multiplyScalar(k).floor(),D=ut;if(nt.bindFramebuffer(F.FRAMEBUFFER,X)&&et&&nt.drawBuffers(P,X),nt.viewport(C),nt.scissor(N),nt.setScissorTest(D),At){let Gt=H.get(P.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+W,Gt.__webglTexture,Q)}else if(Ut){let Gt=H.get(P.texture),$t=W||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Gt.__webglTexture,Q||0,$t)}S=-1},this.readRenderTargetPixels=function(P,W,Q,et,X,At,Ut){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ht=H.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Ut!==void 0&&(Ht=Ht[Ut]),Ht){nt.bindFramebuffer(F.FRAMEBUFFER,Ht);try{let Gt=P.texture,$t=Gt.format,Qt=Gt.type;if(!wt.textureFormatReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!wt.textureTypeReadable(Qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=P.width-et&&Q>=0&&Q<=P.height-X&&F.readPixels(W,Q,et,X,Rt.convert($t),Rt.convert(Qt),At)}finally{let Gt=T!==null?H.get(T).__webglFramebuffer:null;nt.bindFramebuffer(F.FRAMEBUFFER,Gt)}}},this.readRenderTargetPixelsAsync=async function(P,W,Q,et,X,At,Ut){if(!(P&&P.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ht=H.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Ut!==void 0&&(Ht=Ht[Ut]),Ht){let Gt=P.texture,$t=Gt.format,Qt=Gt.type;if(!wt.textureFormatReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!wt.textureTypeReadable(Qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(W>=0&&W<=P.width-et&&Q>=0&&Q<=P.height-X){nt.bindFramebuffer(F.FRAMEBUFFER,Ht);let Wt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Wt),F.bufferData(F.PIXEL_PACK_BUFFER,At.byteLength,F.STREAM_READ),F.readPixels(W,Q,et,X,Rt.convert($t),Rt.convert(Qt),0);let re=T!==null?H.get(T).__webglFramebuffer:null;nt.bindFramebuffer(F.FRAMEBUFFER,re);let ge=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await kg(F,ge,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Wt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,At),F.deleteBuffer(Wt),F.deleteSync(ge),At}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(P,W=null,Q=0){P.isTexture!==!0&&(xr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),W=arguments[0]||null,P=arguments[1]);let et=Math.pow(2,-Q),X=Math.floor(P.image.width*et),At=Math.floor(P.image.height*et),Ut=W!==null?W.x:0,Ht=W!==null?W.y:0;R.setTexture2D(P,0),F.copyTexSubImage2D(F.TEXTURE_2D,Q,0,0,Ut,Ht,X,At),nt.unbindTexture()},this.copyTextureToTexture=function(P,W,Q=null,et=null,X=0){P.isTexture!==!0&&(xr("WebGLRenderer: copyTextureToTexture function signature has changed."),et=arguments[0]||null,P=arguments[1],W=arguments[2],X=arguments[3]||0,Q=null);let At,Ut,Ht,Gt,$t,Qt,Wt,re,ge,ye=P.isCompressedTexture?P.mipmaps[X]:P.image;Q!==null?(At=Q.max.x-Q.min.x,Ut=Q.max.y-Q.min.y,Ht=Q.isBox3?Q.max.z-Q.min.z:1,Gt=Q.min.x,$t=Q.min.y,Qt=Q.isBox3?Q.min.z:0):(At=ye.width,Ut=ye.height,Ht=ye.depth||1,Gt=0,$t=0,Qt=0),et!==null?(Wt=et.x,re=et.y,ge=et.z):(Wt=0,re=0,ge=0);let rn=Rt.convert(W.format),le=Rt.convert(W.type),Xt;W.isData3DTexture?(R.setTexture3D(W,0),Xt=F.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(R.setTexture2DArray(W,0),Xt=F.TEXTURE_2D_ARRAY):(R.setTexture2D(W,0),Xt=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,W.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,W.unpackAlignment);let Hn=F.getParameter(F.UNPACK_ROW_LENGTH),he=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Sn=F.getParameter(F.UNPACK_SKIP_PIXELS),cs=F.getParameter(F.UNPACK_SKIP_ROWS),ln=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,ye.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ye.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Gt),F.pixelStorei(F.UNPACK_SKIP_ROWS,$t),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Qt);let rr=P.isDataArrayTexture||P.isData3DTexture,ve=W.isDataArrayTexture||W.isData3DTexture;if(P.isRenderTargetTexture||P.isDepthTexture){let Pn=H.get(P),or=H.get(W),pn=H.get(Pn.__renderTarget),ai=H.get(or.__renderTarget);nt.bindFramebuffer(F.READ_FRAMEBUFFER,pn.__webglFramebuffer),nt.bindFramebuffer(F.DRAW_FRAMEBUFFER,ai.__webglFramebuffer);for(let ci=0;ci<Ht;ci++)rr&&F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,H.get(P).__webglTexture,X,Qt+ci),P.isDepthTexture?(ve&&F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,H.get(W).__webglTexture,X,ge+ci),F.blitFramebuffer(Gt,$t,At,Ut,Wt,re,At,Ut,F.DEPTH_BUFFER_BIT,F.NEAREST)):ve?F.copyTexSubImage3D(Xt,X,Wt,re,ge+ci,Gt,$t,At,Ut):F.copyTexSubImage2D(Xt,X,Wt,re,ge+ci,Gt,$t,At,Ut);nt.bindFramebuffer(F.READ_FRAMEBUFFER,null),nt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else ve?P.isDataTexture||P.isData3DTexture?F.texSubImage3D(Xt,X,Wt,re,ge,At,Ut,Ht,rn,le,ye.data):W.isCompressedArrayTexture?F.compressedTexSubImage3D(Xt,X,Wt,re,ge,At,Ut,Ht,rn,ye.data):F.texSubImage3D(Xt,X,Wt,re,ge,At,Ut,Ht,rn,le,ye):P.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,X,Wt,re,At,Ut,rn,le,ye.data):P.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,X,Wt,re,ye.width,ye.height,rn,ye.data):F.texSubImage2D(F.TEXTURE_2D,X,Wt,re,At,Ut,rn,le,ye);F.pixelStorei(F.UNPACK_ROW_LENGTH,Hn),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,he),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Sn),F.pixelStorei(F.UNPACK_SKIP_ROWS,cs),F.pixelStorei(F.UNPACK_SKIP_IMAGES,ln),X===0&&W.generateMipmaps&&F.generateMipmap(Xt),nt.unbindTexture()},this.copyTextureToTexture3D=function(P,W,Q=null,et=null,X=0){return P.isTexture!==!0&&(xr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Q=arguments[0]||null,et=arguments[1]||null,P=arguments[2],W=arguments[3],X=arguments[4]||0),xr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(P,W,Q,et,X)},this.initRenderTarget=function(P){H.get(P).__webglFramebuffer===void 0&&R.setupRenderTarget(P)},this.initTexture=function(P){P.isCubeTexture?R.setTextureCube(P,0):P.isData3DTexture?R.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?R.setTexture2DArray(P,0):R.setTexture2D(P,0),nt.unbindTexture()},this.resetState=function(){b=0,w=0,T=null,nt.reset(),Nt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=ie._getDrawingBufferColorSpace(t),e.unpackColorSpace=ie._getUnpackColorSpace()}};var jo=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ot(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},bi=class extends Ge{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new on,this.environmentIntensity=1,this.environmentRotation=new on,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},Qo=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=bl,this.updateRanges=[],this.version=0,this.uuid=jn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=jn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=jn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},je=new L,Cr=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyMatrix4(t),this.setXYZ(e,je.x,je.y,je.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyNormalMatrix(t),this.setXYZ(e,je.x,je.y,je.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.transformDirection(t),this.setXYZ(e,je.x,je.y,je.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Dn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=pe(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Dn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Dn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Dn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Dn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array),s=pe(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array),s=pe(s,this.array),r=pe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Oe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Ir=class extends Si{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Ot(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},bs,ur=new L,ws=new L,As=new L,Es=new ft,fr=new ft,ld=new Vt,Co=new L,dr=new L,Io=new L,Tf=new ft,Lc=new ft,Rf=new ft,ta=class extends Ge{constructor(t=new Ir){if(super(),this.isSprite=!0,this.type="Sprite",bs===void 0){bs=new se;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Qo(e,5);bs.setIndex([0,1,2,0,2,3]),bs.setAttribute("position",new Cr(n,3,0,!1)),bs.setAttribute("uv",new Cr(n,2,3,!1))}this.geometry=bs,this.material=t,this.center=new ft(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ws.setFromMatrixScale(this.matrixWorld),ld.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),As.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ws.multiplyScalar(-As.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;Po(Co.set(-.5,-.5,0),As,o,ws,s,r),Po(dr.set(.5,-.5,0),As,o,ws,s,r),Po(Io.set(.5,.5,0),As,o,ws,s,r),Tf.set(0,0),Lc.set(1,0),Rf.set(1,1);let a=t.ray.intersectTriangle(Co,dr,Io,!1,ur);if(a===null&&(Po(dr.set(-.5,.5,0),As,o,ws,s,r),Lc.set(0,1),a=t.ray.intersectTriangle(Co,Io,dr,!1,ur),a===null))return;let c=t.ray.origin.distanceTo(ur);c<t.near||c>t.far||e.push({distance:c,point:ur.clone(),uv:gi.getInterpolation(ur,Co,dr,Io,Tf,Lc,Rf,new ft),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Po(i,t,e,n,s,r){Es.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(fr.x=r*Es.x-s*Es.y,fr.y=s*Es.x+r*Es.y):fr.copy(Es),i.copy(t),i.x+=fr.x,i.y+=fr.y,i.applyMatrix4(ld)}var cn=class extends tn{constructor(t=null,e=1,n=1,s,r,o,a,c,l=fn,h=fn,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var wi=class extends Oe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Ts=new Vt,Cf=new Vt,Lo=[],If=new en,F1=new Vt,pr=new Et,mr=new Gi,Ue=class extends Et{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new wi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,F1)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new en),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ts),If.copy(t.boundingBox).applyMatrix4(Ts),this.boundingBox.union(If)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Gi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ts),mr.copy(t.boundingSphere).applyMatrix4(Ts),this.boundingSphere.union(mr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(pr.geometry=this.geometry,pr.material=this.material,pr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),mr.copy(this.boundingSphere),mr.applyMatrix4(n),t.ray.intersectsSphere(mr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ts),Cf.multiplyMatrices(n,Ts),pr.matrixWorld=Cf,pr.raycast(t,Lo);for(let o=0,a=Lo.length;o<a;o++){let c=Lo[o];c.instanceId=r,c.object=this,e.push(c)}Lo.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new wi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new cn(new Float32Array(s*this.count),s,this.count,Ji,Nn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var xn=class extends tn{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},_n=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],f=n[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new ft:new L);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new L,s=[],r=[],o=[],a=new L,c=new Vt;for(let d=0;d<=t;d++){let m=d/t;s[d]=this.getTangentAt(m,new L)}r[0]=new L,o[0]=new L;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(Ve(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,m))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Ve(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let m=1;m<=t;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],d*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Pr=class extends _n{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ft){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Bl=class extends Pr{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function xh(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let f=(o-r)/l-(a-r)/(l+h)+(a-o)/h,d=(a-o)/h-(c-o)/(h+u)+(c-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var Do=new L,Dc=new xh,Nc=new xh,Uc=new xh,Lr=class extends _n{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Do.subVectors(s[0],s[1]).add(s[0]),l=Do);let u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Do.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Do),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,m=Math.pow(l.distanceToSquared(u),d),x=Math.pow(u.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(h),d);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),Dc.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,m,x,g),Nc.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,m,x,g),Uc.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,m,x,g)}else this.curveType==="catmullrom"&&(Dc.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),Nc.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),Uc.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(Dc.calc(c),Nc.calc(c),Uc.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Pf(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function O1(i,t){let e=1-i;return e*e*t}function B1(i,t){return 2*(1-i)*i*t}function z1(i,t){return i*i*t}function vr(i,t,e,n){return O1(i,t)+B1(i,e)+z1(i,n)}function k1(i,t){let e=1-i;return e*e*e*t}function V1(i,t){let e=1-i;return 3*e*e*i*t}function H1(i,t){return 3*(1-i)*i*i*t}function G1(i,t){return i*i*i*t}function Mr(i,t,e,n,s){return k1(i,t)+V1(i,e)+H1(i,n)+G1(i,s)}var ea=class extends _n{constructor(t=new ft,e=new ft,n=new ft,s=new ft){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ft){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Mr(t,s.x,r.x,o.x,a.x),Mr(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},zl=class extends _n{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Mr(t,s.x,r.x,o.x,a.x),Mr(t,s.y,r.y,o.y,a.y),Mr(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},na=class extends _n{constructor(t=new ft,e=new ft){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ft){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ft){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},kl=class extends _n{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ia=class extends _n{constructor(t=new ft,e=new ft,n=new ft){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ft){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(vr(t,s.x,r.x,o.x),vr(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Vl=class extends _n{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(vr(t,s.x,r.x,o.x),vr(t,s.y,r.y,o.y),vr(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Gs=class extends _n{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ft){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Pf(a,c.x,l.x,h.x,u.x),Pf(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new ft().fromArray(s))}return this}},Hl=Object.freeze({__proto__:null,ArcCurve:Bl,CatmullRomCurve3:Lr,CubicBezierCurve:ea,CubicBezierCurve3:zl,EllipseCurve:Pr,LineCurve:na,LineCurve3:kl,QuadraticBezierCurve:ia,QuadraticBezierCurve3:Vl,SplineCurve:Gs}),Gl=class extends _n{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Hl[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Hl[s.type]().fromJSON(s))}return this}},Wi=class extends Gl{constructor(t){super(),this.type="Path",this.currentPoint=new ft,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new na(this.currentPoint.clone(),new ft(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new ia(this.currentPoint.clone(),new ft(t,e),new ft(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new ea(this.currentPoint.clone(),new ft(t,e),new ft(n,s),new ft(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Gs(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){let l=new Pr(t,e,n,s,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Ai=class i extends se{constructor(t=[new ft(0,-.5),new ft(.5,0),new ft(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Ve(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],h=1/e,u=new L,f=new ft,d=new L,m=new L,x=new L,g=0,p=0;for(let _=0;_<=t.length-1;_++)switch(_){case 0:g=t[_+1].x-t[_].x,p=t[_+1].y-t[_].y,d.x=p*1,d.y=-g,d.z=p*0,x.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(x.x,x.y,x.z);break;default:g=t[_+1].x-t[_].x,p=t[_+1].y-t[_].y,d.x=p*1,d.y=-g,d.z=p*0,m.copy(d),d.x+=x.x,d.y+=x.y,d.z+=x.z,d.normalize(),c.push(d.x,d.y,d.z),x.copy(m)}for(let _=0;_<=e;_++){let y=n+_*h*s,v=Math.sin(y),A=Math.cos(y);for(let b=0;b<=t.length-1;b++){u.x=t[b].x*v,u.y=t[b].y,u.z=t[b].x*A,o.push(u.x,u.y,u.z),f.x=_/e,f.y=b/(t.length-1),a.push(f.x,f.y);let w=c[3*b+0]*v,T=c[3*b+1],S=c[3*b+0]*A;l.push(w,T,S)}}for(let _=0;_<e;_++)for(let y=0;y<t.length-1;y++){let v=y+_*t.length,A=v,b=v+t.length,w=v+t.length+1,T=v+1;r.push(A,b,T),r.push(w,T,b)}this.setIndex(r),this.setAttribute("position",new kt(o,3)),this.setAttribute("uv",new kt(a,2)),this.setAttribute("normal",new kt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}},Xi=class i extends Ai{constructor(t=1,e=1,n=4,s=8){let r=new Wi;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new i(t.radius,t.length,t.capSegments,t.radialSegments)}},ei=class i extends se{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],c=[],l=new L,h=new ft;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){let d=n+u/e*s;l.x=t*Math.cos(d),l.y=t*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new kt(o,3)),this.setAttribute("normal",new kt(a,3)),this.setAttribute("uv",new kt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},jt=class i extends se{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],d=[],m=0,x=[],g=n/2,p=0;_(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new kt(u,3)),this.setAttribute("normal",new kt(f,3)),this.setAttribute("uv",new kt(d,2));function _(){let v=new L,A=new L,b=0,w=(e-t)/n;for(let T=0;T<=r;T++){let S=[],M=T/r,C=M*(e-t)+t;for(let N=0;N<=s;N++){let D=N/s,I=D*c+a,B=Math.sin(I),U=Math.cos(I);A.x=C*B,A.y=-M*n+g,A.z=C*U,u.push(A.x,A.y,A.z),v.set(B,w,U).normalize(),f.push(v.x,v.y,v.z),d.push(D,1-M),S.push(m++)}x.push(S)}for(let T=0;T<s;T++)for(let S=0;S<r;S++){let M=x[S][T],C=x[S+1][T],N=x[S+1][T+1],D=x[S][T+1];(t>0||S!==0)&&(h.push(M,C,D),b+=3),(e>0||S!==r-1)&&(h.push(C,N,D),b+=3)}l.addGroup(p,b,0),p+=b}function y(v){let A=m,b=new ft,w=new L,T=0,S=v===!0?t:e,M=v===!0?1:-1;for(let N=1;N<=s;N++)u.push(0,g*M,0),f.push(0,M,0),d.push(.5,.5),m++;let C=m;for(let N=0;N<=s;N++){let I=N/s*c+a,B=Math.cos(I),U=Math.sin(I);w.x=S*U,w.y=g*M,w.z=S*B,u.push(w.x,w.y,w.z),f.push(0,M,0),b.x=B*.5+.5,b.y=U*.5*M+.5,d.push(b.x,b.y),m++}for(let N=0;N<s;N++){let D=A+N,I=C+N;v===!0?h.push(I,I+1,D):h.push(I+1,I,D),T+=3}l.addGroup(p,T,v===!0?1:2),p+=T}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Dr=class i extends jt{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Wl=class i extends se{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new kt(r,3)),this.setAttribute("normal",new kt(r.slice(),3)),this.setAttribute("uv",new kt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(_){let y=new L,v=new L,A=new L;for(let b=0;b<e.length;b+=3)d(e[b+0],y),d(e[b+1],v),d(e[b+2],A),c(y,v,A,_)}function c(_,y,v,A){let b=A+1,w=[];for(let T=0;T<=b;T++){w[T]=[];let S=_.clone().lerp(v,T/b),M=y.clone().lerp(v,T/b),C=b-T;for(let N=0;N<=C;N++)N===0&&T===b?w[T][N]=S:w[T][N]=S.clone().lerp(M,N/C)}for(let T=0;T<b;T++)for(let S=0;S<2*(b-T)-1;S++){let M=Math.floor(S/2);S%2===0?(f(w[T][M+1]),f(w[T+1][M]),f(w[T][M])):(f(w[T][M+1]),f(w[T+1][M+1]),f(w[T+1][M]))}}function l(_){let y=new L;for(let v=0;v<r.length;v+=3)y.x=r[v+0],y.y=r[v+1],y.z=r[v+2],y.normalize().multiplyScalar(_),r[v+0]=y.x,r[v+1]=y.y,r[v+2]=y.z}function h(){let _=new L;for(let y=0;y<r.length;y+=3){_.x=r[y+0],_.y=r[y+1],_.z=r[y+2];let v=g(_)/2/Math.PI+.5,A=p(_)/Math.PI+.5;o.push(v,1-A)}m(),u()}function u(){for(let _=0;_<o.length;_+=6){let y=o[_+0],v=o[_+2],A=o[_+4],b=Math.max(y,v,A),w=Math.min(y,v,A);b>.9&&w<.1&&(y<.2&&(o[_+0]+=1),v<.2&&(o[_+2]+=1),A<.2&&(o[_+4]+=1))}}function f(_){r.push(_.x,_.y,_.z)}function d(_,y){let v=_*3;y.x=t[v+0],y.y=t[v+1],y.z=t[v+2]}function m(){let _=new L,y=new L,v=new L,A=new L,b=new ft,w=new ft,T=new ft;for(let S=0,M=0;S<r.length;S+=9,M+=6){_.set(r[S+0],r[S+1],r[S+2]),y.set(r[S+3],r[S+4],r[S+5]),v.set(r[S+6],r[S+7],r[S+8]),b.set(o[M+0],o[M+1]),w.set(o[M+2],o[M+3]),T.set(o[M+4],o[M+5]),A.copy(_).add(y).add(v).divideScalar(3);let C=g(A);x(b,M+0,_,C),x(w,M+2,y,C),x(T,M+4,v,C)}}function x(_,y,v,A){A<0&&_.x===1&&(o[y]=_.x-1),v.x===0&&v.z===0&&(o[y]=A/2/Math.PI+.5)}function g(_){return Math.atan2(_.z,-_.x)}function p(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.details)}};var Un=class extends Wi{constructor(t){super(t),this.uuid=jn(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new Wi().fromJSON(s))}return this}},W1={triangulate:function(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=hd(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,f,d;if(n&&(r=$1(i,t,r,e)),i.length>80*e){a=l=i[0],c=h=i[1];for(let m=e;m<s;m+=e)u=i[m],f=i[m+1],u<a&&(a=u),f<c&&(c=f),u>l&&(l=u),f>h&&(h=f);d=Math.max(l-a,h-c),d=d!==0?32767/d:0}return Nr(r,o,e,a,c,d,0),o}};function hd(i,t,e,n,s){let r,o;if(s===oM(i,t,e,n)>0)for(r=t;r<e;r+=n)o=Lf(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=Lf(r,i[r],i[r+1],o);return o&&ma(o,o.next)&&(Fr(o),o=o.next),o}function Yi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(ma(e,e.next)||Te(e.prev,e,e.next)===0)){if(Fr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Nr(i,t,e,n,s,r,o){if(!i)return;!o&&r&&tM(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?Y1(i,n,s,r):X1(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),Fr(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=q1(Yi(i),t,e),Nr(i,t,e,n,s,r,2)):o===2&&Z1(i,t,e,n,s,r):Nr(Yi(i),t,e,n,s,r,1);break}}}function X1(i){let t=i.prev,e=i,n=i.next;if(Te(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,f=s>r?s>o?s:o:r>o?r:o,d=a>c?a>l?a:l:c>l?c:l,m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=f&&m.y>=u&&m.y<=d&&Cs(s,a,r,c,o,l,m.x,m.y)&&Te(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Y1(i,t,e,n){let s=i.prev,r=i,o=i.next;if(Te(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,f=o.y,d=a<c?a<l?a:l:c<l?c:l,m=h<u?h<f?h:f:u<f?u:f,x=a>c?a>l?a:l:c>l?c:l,g=h>u?h>f?h:f:u>f?u:f,p=Xl(d,m,t,e,n),_=Xl(x,g,t,e,n),y=i.prevZ,v=i.nextZ;for(;y&&y.z>=p&&v&&v.z<=_;){if(y.x>=d&&y.x<=x&&y.y>=m&&y.y<=g&&y!==s&&y!==o&&Cs(a,h,c,u,l,f,y.x,y.y)&&Te(y.prev,y,y.next)>=0||(y=y.prevZ,v.x>=d&&v.x<=x&&v.y>=m&&v.y<=g&&v!==s&&v!==o&&Cs(a,h,c,u,l,f,v.x,v.y)&&Te(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;y&&y.z>=p;){if(y.x>=d&&y.x<=x&&y.y>=m&&y.y<=g&&y!==s&&y!==o&&Cs(a,h,c,u,l,f,y.x,y.y)&&Te(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;v&&v.z<=_;){if(v.x>=d&&v.x<=x&&v.y>=m&&v.y<=g&&v!==s&&v!==o&&Cs(a,h,c,u,l,f,v.x,v.y)&&Te(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function q1(i,t,e){let n=i;do{let s=n.prev,r=n.next.next;!ma(s,r)&&ud(s,n,n.next,r)&&Ur(s,r)&&Ur(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Fr(n),Fr(n.next),n=i=r),n=n.next}while(n!==i);return Yi(n)}function Z1(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&iM(o,a)){let c=fd(o,a);o=Yi(o,o.next),c=Yi(c,c.next),Nr(o,t,e,n,s,r,0),Nr(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function $1(i,t,e,n){let s=[],r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=hd(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(nM(l));for(s.sort(J1),r=0;r<s.length;r++)e=K1(s[r],e);return e}function J1(i,t){return i.x-t.x}function K1(i,t){let e=j1(i,t);if(!e)return t;let n=fd(e,i);return Yi(n,n.next),Yi(e,e.next)}function j1(i,t){let e=t,n=-1/0,s,r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){let f=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>n&&(n=f,s=e.x<e.next.x?e:e.next,f===r))return s}e=e.next}while(e!==t);if(!s)return null;let a=s,c=s.x,l=s.y,h=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&Cs(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),Ur(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&Q1(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function Q1(i,t){return Te(i.prev,i,t.prev)<0&&Te(t.next,i,i.next)<0}function tM(i,t,e,n){let s=i;do s.z===0&&(s.z=Xl(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,eM(s)}function eM(i){let t,e,n,s,r,o,a,c,l=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(o>1);return i}function Xl(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function nM(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Cs(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function iM(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!sM(i,t)&&(Ur(i,t)&&Ur(t,i)&&rM(i,t)&&(Te(i.prev,i,t.prev)||Te(i,t.prev,t))||ma(i,t)&&Te(i.prev,i,i.next)>0&&Te(t.prev,t,t.next)>0)}function Te(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function ma(i,t){return i.x===t.x&&i.y===t.y}function ud(i,t,e,n){let s=Uo(Te(i,t,e)),r=Uo(Te(i,t,n)),o=Uo(Te(e,n,i)),a=Uo(Te(e,n,t));return!!(s!==r&&o!==a||s===0&&No(i,e,t)||r===0&&No(i,n,t)||o===0&&No(e,i,n)||a===0&&No(e,t,n))}function No(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Uo(i){return i>0?1:i<0?-1:0}function sM(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&ud(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Ur(i,t){return Te(i.prev,i,i.next)<0?Te(i,t,i.next)>=0&&Te(i,i.prev,t)>=0:Te(i,t,i.prev)<0||Te(i,i.next,t)<0}function rM(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function fd(i,t){let e=new Yl(i.i,i.x,i.y),n=new Yl(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Lf(i,t,e,n){let s=new Yl(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Fr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Yl(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function oM(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var yi=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Df(t),Nf(n,t);let o=t.length;e.forEach(Df);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Nf(n,e[c]);let a=W1.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function Df(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Nf(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var Or=class i extends se{constructor(t=new Un([new ft(.5,.5),new ft(-.5,.5),new ft(-.5,-.5),new ft(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){let l=t[a];o(l)}this.setAttribute("position",new kt(s,3)),this.setAttribute("uv",new kt(r,2)),this.computeVertexNormals();function o(a){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:d-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,_=e.UVGenerator!==void 0?e.UVGenerator:aM,y,v=!1,A,b,w,T;p&&(y=p.getSpacedPoints(h),v=!0,f=!1,A=p.computeFrenetFrames(h,!1),b=new L,w=new L,T=new L),f||(g=0,d=0,m=0,x=0);let S=a.extractPoints(l),M=S.shape,C=S.holes;if(!yi.isClockWise(M)){M=M.reverse();for(let at=0,pt=C.length;at<pt;at++){let F=C[at];yi.isClockWise(F)&&(C[at]=F.reverse())}}let D=yi.triangulateShape(M,C),I=M;for(let at=0,pt=C.length;at<pt;at++){let F=C[at];M=M.concat(F)}function B(at,pt,F){return pt||console.error("THREE.ExtrudeGeometry: vec does not exist"),at.clone().addScaledVector(pt,F)}let U=M.length,z=D.length;function k(at,pt,F){let It,ht,wt,nt=at.x-pt.x,Tt=at.y-pt.y,H=F.x-at.x,R=F.y-at.y,E=nt*nt+Tt*Tt,O=nt*R-Tt*H;if(Math.abs(O)>Number.EPSILON){let G=Math.sqrt(E),K=Math.sqrt(H*H+R*R),Y=pt.x-Tt/G,Mt=pt.y+nt/G,gt=F.x-R/K,ct=F.y+H/K,Pt=((gt-Y)*R-(ct-Mt)*H)/(nt*R-Tt*H);It=Y+nt*Pt-at.x,ht=Mt+Tt*Pt-at.y;let ot=It*It+ht*ht;if(ot<=2)return new ft(It,ht);wt=Math.sqrt(ot/2)}else{let G=!1;nt>Number.EPSILON?H>Number.EPSILON&&(G=!0):nt<-Number.EPSILON?H<-Number.EPSILON&&(G=!0):Math.sign(Tt)===Math.sign(R)&&(G=!0),G?(It=-Tt,ht=nt,wt=Math.sqrt(E)):(It=nt,ht=Tt,wt=Math.sqrt(E/2))}return new ft(It/wt,ht/wt)}let J=[];for(let at=0,pt=I.length,F=pt-1,It=at+1;at<pt;at++,F++,It++)F===pt&&(F=0),It===pt&&(It=0),J[at]=k(I[at],I[F],I[It]);let j=[],$,Z=J.concat();for(let at=0,pt=C.length;at<pt;at++){let F=C[at];$=[];for(let It=0,ht=F.length,wt=ht-1,nt=It+1;It<ht;It++,wt++,nt++)wt===ht&&(wt=0),nt===ht&&(nt=0),$[It]=k(F[It],F[wt],F[nt]);j.push($),Z=Z.concat($)}for(let at=0;at<g;at++){let pt=at/g,F=d*Math.cos(pt*Math.PI/2),It=m*Math.sin(pt*Math.PI/2)+x;for(let ht=0,wt=I.length;ht<wt;ht++){let nt=B(I[ht],J[ht],It);dt(nt.x,nt.y,-F)}for(let ht=0,wt=C.length;ht<wt;ht++){let nt=C[ht];$=j[ht];for(let Tt=0,H=nt.length;Tt<H;Tt++){let R=B(nt[Tt],$[Tt],It);dt(R.x,R.y,-F)}}}let ut=m+x;for(let at=0;at<U;at++){let pt=f?B(M[at],Z[at],ut):M[at];v?(w.copy(A.normals[0]).multiplyScalar(pt.x),b.copy(A.binormals[0]).multiplyScalar(pt.y),T.copy(y[0]).add(w).add(b),dt(T.x,T.y,T.z)):dt(pt.x,pt.y,0)}for(let at=1;at<=h;at++)for(let pt=0;pt<U;pt++){let F=f?B(M[pt],Z[pt],ut):M[pt];v?(w.copy(A.normals[at]).multiplyScalar(F.x),b.copy(A.binormals[at]).multiplyScalar(F.y),T.copy(y[at]).add(w).add(b),dt(T.x,T.y,T.z)):dt(F.x,F.y,u/h*at)}for(let at=g-1;at>=0;at--){let pt=at/g,F=d*Math.cos(pt*Math.PI/2),It=m*Math.sin(pt*Math.PI/2)+x;for(let ht=0,wt=I.length;ht<wt;ht++){let nt=B(I[ht],J[ht],It);dt(nt.x,nt.y,u+F)}for(let ht=0,wt=C.length;ht<wt;ht++){let nt=C[ht];$=j[ht];for(let Tt=0,H=nt.length;Tt<H;Tt++){let R=B(nt[Tt],$[Tt],It);v?dt(R.x,R.y+y[h-1].y,y[h-1].x+F):dt(R.x,R.y,u+F)}}}q(),it();function q(){let at=s.length/3;if(f){let pt=0,F=U*pt;for(let It=0;It<z;It++){let ht=D[It];yt(ht[2]+F,ht[1]+F,ht[0]+F)}pt=h+g*2,F=U*pt;for(let It=0;It<z;It++){let ht=D[It];yt(ht[0]+F,ht[1]+F,ht[2]+F)}}else{for(let pt=0;pt<z;pt++){let F=D[pt];yt(F[2],F[1],F[0])}for(let pt=0;pt<z;pt++){let F=D[pt];yt(F[0]+U*h,F[1]+U*h,F[2]+U*h)}}n.addGroup(at,s.length/3-at,0)}function it(){let at=s.length/3,pt=0;st(I,pt),pt+=I.length;for(let F=0,It=C.length;F<It;F++){let ht=C[F];st(ht,pt),pt+=ht.length}n.addGroup(at,s.length/3-at,1)}function st(at,pt){let F=at.length;for(;--F>=0;){let It=F,ht=F-1;ht<0&&(ht=at.length-1);for(let wt=0,nt=h+g*2;wt<nt;wt++){let Tt=U*wt,H=U*(wt+1),R=pt+It+Tt,E=pt+ht+Tt,O=pt+ht+H,G=pt+It+H;Lt(R,E,O,G)}}}function dt(at,pt,F){c.push(at),c.push(pt),c.push(F)}function yt(at,pt,F){zt(at),zt(pt),zt(F);let It=s.length/3,ht=_.generateTopUV(n,s,It-3,It-2,It-1);Yt(ht[0]),Yt(ht[1]),Yt(ht[2])}function Lt(at,pt,F,It){zt(at),zt(pt),zt(It),zt(pt),zt(F),zt(It);let ht=s.length/3,wt=_.generateSideWallUV(n,s,ht-6,ht-3,ht-2,ht-1);Yt(wt[0]),Yt(wt[1]),Yt(wt[3]),Yt(wt[1]),Yt(wt[2]),Yt(wt[3])}function zt(at){s.push(c[at*3+0]),s.push(c[at*3+1]),s.push(c[at*3+2])}function Yt(at){r.push(at.x),r.push(at.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return cM(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Hl[s.type]().fromJSON(s)),new i(n,t.options)}},aM={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new ft(r,o),new ft(a,c),new ft(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[s*3],d=t[s*3+1],m=t[s*3+2],x=t[r*3],g=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new ft(o,1-c),new ft(l,1-u),new ft(f,1-m),new ft(x,1-p)]:[new ft(a,1-c),new ft(h,1-u),new ft(d,1-m),new ft(g,1-p)]}};function cM(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var sa=class i extends Wl{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var Br=class i extends se{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],l=[],h=[],u=t,f=(e-t)/s,d=new L,m=new ft;for(let x=0;x<=s;x++){for(let g=0;g<=n;g++){let p=r+g/n*o;d.x=u*Math.cos(p),d.y=u*Math.sin(p),c.push(d.x,d.y,d.z),l.push(0,0,1),m.x=(d.x/e+1)/2,m.y=(d.y/e+1)/2,h.push(m.x,m.y)}u+=f}for(let x=0;x<s;x++){let g=x*(n+1);for(let p=0;p<n;p++){let _=p+g,y=_,v=_+n+1,A=_+n+2,b=_+1;a.push(y,v,b),a.push(v,A,b)}}this.setIndex(a),this.setAttribute("position",new kt(c,3)),this.setAttribute("normal",new kt(l,3)),this.setAttribute("uv",new kt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},zr=class i extends se{constructor(t=new Un([new ft(0,.5),new ft(-.5,-.5),new ft(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],o=[],a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new kt(s,3)),this.setAttribute("normal",new kt(r,3)),this.setAttribute("uv",new kt(o,2));function l(h){let u=s.length/3,f=h.extractPoints(e),d=f.shape,m=f.holes;yi.isClockWise(d)===!1&&(d=d.reverse());for(let g=0,p=m.length;g<p;g++){let _=m[g];yi.isClockWise(_)===!0&&(m[g]=_.reverse())}let x=yi.triangulateShape(d,m);for(let g=0,p=m.length;g<p;g++){let _=m[g];d=d.concat(_)}for(let g=0,p=d.length;g<p;g++){let _=d[g];s.push(_.x,_.y,0),r.push(0,0,1),o.push(_.x,_.y)}for(let g=0,p=x.length;g<p;g++){let _=x[g],y=_[0]+u,v=_[1]+u,A=_[2]+u;n.push(y,v,A),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return lM(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let o=e[t.shapes[s]];n.push(o)}return new i(n,t.curveSegments)}};function lM(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}var Fn=class i extends se{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new L,f=new L,d=[],m=[],x=[],g=[];for(let p=0;p<=n;p++){let _=[],y=p/n,v=0;p===0&&o===0?v=.5/e:p===n&&c===Math.PI&&(v=-.5/e);for(let A=0;A<=e;A++){let b=A/e;u.x=-t*Math.cos(s+b*r)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(s+b*r)*Math.sin(o+y*a),m.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),g.push(b+v,1-y),_.push(l++)}h.push(_)}for(let p=0;p<n;p++)for(let _=0;_<e;_++){let y=h[p][_+1],v=h[p][_],A=h[p+1][_],b=h[p+1][_+1];(p!==0||o>0)&&d.push(y,v,b),(p!==n-1||c<Math.PI)&&d.push(v,A,b)}this.setIndex(d),this.setAttribute("position",new kt(m,3)),this.setAttribute("normal",new kt(x,3)),this.setAttribute("uv",new kt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var qi=class i extends se{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],l=[],h=new L,u=new L,f=new L;for(let d=0;d<=n;d++)for(let m=0;m<=s;m++){let x=m/s*r,g=d/n*Math.PI*2;u.x=(t+e*Math.cos(g))*Math.cos(x),u.y=(t+e*Math.cos(g))*Math.sin(x),u.z=e*Math.sin(g),a.push(u.x,u.y,u.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(m/s),l.push(d/n)}for(let d=1;d<=n;d++)for(let m=1;m<=s;m++){let x=(s+1)*d+m-1,g=(s+1)*(d-1)+m-1,p=(s+1)*(d-1)+m,_=(s+1)*d+m;o.push(x,g,_),o.push(g,p,_)}this.setIndex(o),this.setAttribute("position",new kt(a,3)),this.setAttribute("normal",new kt(c,3)),this.setAttribute("uv",new kt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var bt=class extends Si{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ot(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qf,this.normalScale=new ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Ws=class extends bt{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ft(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ve(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ot(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ot(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ot(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};function Fo(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function hM(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Xs=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},ql=class extends Xs{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Pu,endingEnd:Pu}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Lu:r=t,a=2*e-n;break;case Du:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Lu:o=t,c=2*n-e;break;case Du:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,m=(n-e)/(s-e),x=m*m,g=x*m,p=-f*g+2*f*x-f*m,_=(1+f)*g+(-1.5-2*f)*x+(-.5+f)*m+1,y=(-1-d)*g+(1.5+d)*x+.5*m,v=d*g-d*x;for(let A=0;A!==a;++A)r[A]=p*o[h+A]+_*o[l+A]+y*o[c+A]+v*o[u+A];return r}},Zl=class extends Xs{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(s-e),u=1-h;for(let f=0;f!==a;++f)r[f]=o[l+f]*u+o[c+f]*h;return r}},$l=class extends Xs{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Tn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Fo(e,this.TimeBufferType),this.values=Fo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Fo(t.times,Array),values:Fo(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new $l(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Zl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new ql(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Ho:e=this.InterpolantFactoryMethodDiscrete;break;case Sl:e=this.InterpolantFactoryMethodLinear;break;case ic:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ho;case this.InterpolantFactoryMethodLinear:return Sl;case this.InterpolantFactoryMethodSmooth:return ic}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&hM(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ic,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let u=a*n,f=u-n,d=u+n;for(let m=0;m!==n;++m){let x=e[u+m];if(x!==e[f+m]||x!==e[d+m]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let u=a*n,f=o*n;for(let d=0;d!==n;++d)e[f+d]=e[u+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Tn.prototype.TimeBufferType=Float32Array;Tn.prototype.ValueBufferType=Float32Array;Tn.prototype.DefaultInterpolation=Sl;var Zi=class extends Tn{constructor(t,e,n){super(t,e,n)}};Zi.prototype.ValueTypeName="bool";Zi.prototype.ValueBufferType=Array;Zi.prototype.DefaultInterpolation=Ho;Zi.prototype.InterpolantFactoryMethodLinear=void 0;Zi.prototype.InterpolantFactoryMethodSmooth=void 0;var Jl=class extends Tn{};Jl.prototype.ValueTypeName="color";var Kl=class extends Tn{};Kl.prototype.ValueTypeName="number";var jl=class extends Xs{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)we.slerpFlat(r,0,o,l-a,o,l,c);return r}},ra=class extends Tn{InterpolantFactoryMethodLinear(t){return new jl(this.times,this.values,this.getValueSize(),t)}};ra.prototype.ValueTypeName="quaternion";ra.prototype.InterpolantFactoryMethodSmooth=void 0;var $i=class extends Tn{constructor(t,e,n){super(t,e,n)}};$i.prototype.ValueTypeName="string";$i.prototype.ValueBufferType=Array;$i.prototype.DefaultInterpolation=Ho;$i.prototype.InterpolantFactoryMethodLinear=void 0;$i.prototype.InterpolantFactoryMethodSmooth=void 0;var Ql=class extends Tn{};Ql.prototype.ValueTypeName="vector";var Uf={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},th=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let d=l[u],m=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return m}return null}}},uM=new th,kr=class{constructor(t){this.manager=t!==void 0?t:uM,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};kr.DEFAULT_MATERIAL_NAME="__DEFAULT";var eh=class extends kr{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=Uf.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;let a=br("img");function c(){h(),Uf.add(t,this),e&&e(this),r.manager.itemEnd(t)}function l(u){h(),s&&s(u),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}};var oa=class extends kr{constructor(t){super(t)}load(t,e,n,s){let r=new tn,o=new eh(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},Vr=class extends Ge{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ot(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},aa=class extends Vr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ge.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ot(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Fc=new Vt,Ff=new L,Of=new L,ca=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ft(512,512),this.map=null,this.mapPass=null,this.matrix=new Vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Tr,this._frameExtents=new ft(1,1),this._viewportCount=1,this._viewports=[new ee(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Ff.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ff),Of.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Of),e.updateMatrixWorld(),Fc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Fc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Bf=new Vt,gr=new L,Oc=new L,nh=class extends ca{constructor(){super(new Ze(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ft(4,2),this._viewportCount=6,this._viewports=[new ee(2,1,1,1),new ee(0,1,1,1),new ee(3,1,1,1),new ee(1,1,1,1),new ee(3,0,1,1),new ee(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),gr.setFromMatrixPosition(t.matrixWorld),n.position.copy(gr),Oc.copy(n.position),Oc.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Oc),n.updateMatrixWorld(),s.makeTranslation(-gr.x,-gr.y,-gr.z),Bf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bf)}},la=class extends Vr{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new nh}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},ih=class extends ca{constructor(){super(new ks(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ha=class extends Vr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ge.DEFAULT_UP),this.updateMatrix(),this.target=new Ge,this.shadow=new ih}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var _h="\\[\\]\\.:\\/",fM=new RegExp("["+_h+"]","g"),yh="[^"+_h+"]",dM="[^"+_h.replace("\\.","")+"]",pM=/((?:WC+[\/:])*)/.source.replace("WC",yh),mM=/(WCOD+)?/.source.replace("WCOD",dM),gM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",yh),xM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",yh),_M=new RegExp("^"+pM+mM+gM+xM+"$"),yM=["material","materials","bones","map"],sh=class{constructor(t,e,n){let s=n||be.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},be=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(fM,"")}static parseTrackName(t){let e=_M.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);yM.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};be.Composite=sh;be.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};be.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};be.prototype.GetterByBindingType=[be.prototype._getValue_direct,be.prototype._getValue_array,be.prototype._getValue_arrayElement,be.prototype._getValue_toArray];be.prototype.SetterByBindingTypeAndVersioning=[[be.prototype._setValue_direct,be.prototype._setValue_direct_setNeedsUpdate,be.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[be.prototype._setValue_array,be.prototype._setValue_array_setNeedsUpdate,be.prototype._setValue_array_setMatrixWorldNeedsUpdate],[be.prototype._setValue_arrayElement,be.prototype._setValue_arrayElement_setNeedsUpdate,be.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[be.prototype._setValue_fromArray,be.prototype._setValue_fromArray_setNeedsUpdate,be.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var eE=new Float32Array(1);var zf=new Vt,ua=class{constructor(t,e,n=0,s=1/0){this.ray=new Yo(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new wr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return zf.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(zf),this}intersectObject(t,e=!0,n=[]){return rh(t,this,n,e),n.sort(kf),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)rh(t[s],this,n,e);return n.sort(kf),n}};function kf(i,t){return i.distance-t.distance}function rh(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)rh(r[o],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:oh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=oh);var me=(i,t,e)=>({rel:[i,t,e]}),Je=(i,t,e)=>({abs:[i,t,e]}),ga={fit:"circuit"},dd=[{u:0,pos:Je(341.5,.75,212.3),tgt:me(.2,.9,.2),fov:34},{u:.085,pos:Je(339.5,.78,211.2),tgt:me(.4,.88,.1),fov:34},{u:.115,pos:me(-9,1.6,-4.5),tgt:me(.5,.85,0),fov:38},{u:.15,pos:me(-9,2.4,-7),tgt:me(1.5,.8,0),fov:38},{u:.18,pos:me(-3,3.8,-15.5),tgt:me(1,.9,0),fov:39},{u:.2,pos:Je(-65.3,1.5,197.5),tgt:Je(-58.3,1,187),fov:40},{u:.315,pos:Je(-64.6,1.55,197.3),tgt:Je(-58.4,1,187.1),fov:40},{u:.332,pos:Je(-66,13,203),tgt:me(.5,.6,0),fov:42},{u:.346,pos:Je(-96,72,262),tgt:Je(-110,0,130),fov:44,aerial:!0},{u:.368,pos:ga,tgt:ga,scale:1.05,fov:50,aerial:!0},{u:.39,pos:ga,tgt:ga,scale:1,fov:50,aerial:!0},{u:.407,pos:Je(-455,120,345),tgt:me(40,0,0),fov:42,aerial:!0},{u:.425,pos:me(5.3,1.7,-14.85),tgt:me(.3,.7,0),fov:38},{u:.56,pos:me(1.2,1.8,-16.7),tgt:me(.6,.7,0),fov:38},{u:.59,pos:me(-12,3.2,-4),tgt:me(2,.9,0),fov:40},{u:.635,pos:me(-11,3,6),tgt:me(2,.9,0),fov:40},{u:.652,pos:me(-8.5,2.4,15.75),tgt:me(2,.9,0),fov:38},{u:.665,pos:Je(-16,1.35,134.5),tgt:me(.2,.75,0),fov:36},{u:.79,pos:Je(-15.2,1.37,134.2),tgt:me(.2,.75,0),fov:36},{u:.815,pos:me(-9,2.2,4),tgt:me(1.5,.85,0),fov:38},{u:.84,pos:me(-6.4,2.3,-9.8),tgt:me(2,.9,0),fov:40},{u:.865,pos:me(9.75,1.7,-4.2),tgt:me(0,.8,0),fov:37},{u:.885,pos:Je(10.6,.75,188.4),tgt:Je(18,.95,192.4),fov:36},{u:1,pos:Je(9.2,.72,188.9),tgt:Je(15.6,.95,192.4),fov:35}],pd=[346,.5,214.4],vh=30,Mh=[[0,.085],[.2,.315],[.425,.56],[.665,.79],[.885,1]],Sh=.03;var Ki=(i,t,e)=>i+(t-i)*e,Bt=(i,t,e)=>Math.min(e,Math.max(t,i)),Pe=i=>i*i*(3-2*i),md=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2;function Ti(i){let t=i.map(r=>r[0]),e=i.map(r=>r[1]),n=i.length,s=e.map((r,o)=>Rn(t,e,o));return r=>{if(r<=t[0])return e[0];if(r>=t[n-1])return e[n-1];let o=0;for(;r>t[o+1];)o++;return qs(t[o],t[o+1],e[o],e[o+1],s[o],s[o+1],r)}}function Rn(i,t,e){let n=i.length;if(e<=0)return(t[1]-t[0])/(i[1]-i[0]);if(e>=n-1)return(t[n-1]-t[n-2])/(i[n-1]-i[n-2]);let s=(t[e]-t[e-1])/(i[e]-i[e-1]),r=(t[e+1]-t[e])/(i[e+1]-i[e]);if(s*r<=0)return 0;let o=i[e]-i[e-1],a=i[e+1]-i[e],c=2*a+o,l=a+2*o;return(c+l)/(c/s+l/r)}function qs(i,t,e,n,s,r,o){let a=t-i,c=(o-i)/a,l=c*c,h=l*c;return(2*h-3*l+1)*e+(h-2*l+c)*a*s+(3*l-2*h)*n+(h-l)*a*r}var nn=Math.PI/180,xa=new L(0,1,0),gd=.88,xd=1.6,vM=60,MM=6,_d=80,SM=4,bM=2,bh=.04,wM=1.04,yd=.75,vd=.1,Md=.8,AM=17,EM=1,Sd=3,TM=[0,8,-8,16,-16,24,-24,32,-32,40,-40],RM=Math.tan(40*Math.PI/180),Le=1001,wh=6,Ah=4,bd=Float64Array.from({length:Le},(i,t)=>t/(Le-1)),wd=10,CM=52,Ad=[-90,0],IM=5,_a=14,Ed=.94,ya=[.04,.06,.96,.94];function Eh(i,t){let e=Math.tan(i*nn/2),n=Math.tan(vM*nn/2),s=e*xd/Math.min(xd,t);return Math.max(e,s/Math.pow(1+Math.pow(s/n,4),.25))}function Th(i,t,e){let n=0;for(let s=0;s<t.length;s++){let r=t[s][0],o=t[s][1],a=1;i<r?a=1-(r-i)/e:i>o&&s<t.length-1&&(a=1-(i-o)/e),a>n&&(n=a)}return Pe(Bt(4*n,0,1))}function PM(i){let t=i.length,e=new Float64Array(t*4);for(let n=0;n<t;n++){let[s,r]=i[(n-1+t)%t],[o,a]=i[(n+1)%t],c=Math.hypot(o-s,a-r)||1,l=-(a-r)/c,h=(o-s)/c,[u,f]=i[n];e[4*n]=u+l*_a,e[4*n+1]=f+h*_a,e[4*n+2]=u-l*_a,e[4*n+3]=f-h*_a}return e}var LM=[[0,0,0],[0,0,1],[1,0,0],[1,0,1],[0,1,0],[0,1,1],[1,.45,.04],[1,.45,.96],[.6,.93,.18],[.6,.93,.82]];function DM(i){let[t,e]=i;return LM.flatMap(([n,s,r])=>[t[0]+n*(e[0]-t[0]),t[1]+s*(e[1]-t[1]),t[2]+r*(e[2]-t[2])])}function NM(i,t,e,n){let s=Math.tan(n*nn/2),r=s*t,o=(e[2]-e[0])*Ed,a=(e[3]-e[1])*Ed,c=0,l=0,h=i.length/2;for(let d=0;d<h;d++)c+=i[2*d],l+=i[2*d+1];c/=h,l/=h;let u=CM*nn,f=null;for(let d=Ad[0];d<=Ad[1];d+=IM){let m=d*nn,x=-Math.sin(m)*Math.cos(u),g=-Math.sin(u),p=-Math.cos(m)*Math.cos(u),_=-p/Math.hypot(x,p),y=x/Math.hypot(x,p),v=-(y*g),A=y*x-_*p,b=_*g,w=(B,U)=>{let z=-1/0,k=1/0,J=-1/0,j=1/0;for(let $=0;$<h;$++){let Z=i[2*$]-c,ut=i[2*$+1]-l,q=Z*x+ut*p+B;if(q<=1)return!1;let it=Z*_+ut*y,st=Z*v+ut*b,dt=o*r*q,yt=a*s*q;z=Math.max(z,it-dt),k=Math.min(k,it+dt),J=Math.max(J,st-yt),j=Math.min(j,st+yt)}return z>k||J>j?!1:(U&&(U.a=(z+k)/2,U.b=(J+j)/2),!0)},T=10,S=2e4;if(!w(S))continue;for(let B=0;B<48;B++){let U=(T+S)/2;w(U)?S=U:T=U}if(f&&S>=f.distance)continue;let M={a:0,b:0};w(S,M);let C=c+M.a*_+M.b*v-S*x,N=M.b*A-S*g,D=l+M.a*y+M.b*b-S*p,I=-N/g;f={distance:S,heading:d,pos:[C,N,D],tgt:[C+I*x,0,D+I*p]}}return f}function Rh(i){let t={p:new L,f:new L(1,0,0),r:new L(0,0,1)},e=new L;return t.update=n=>(e.copy(i.sample(n-wd).p),t.f.copy(i.sample(n+wd).p).sub(e).setY(0).normalize(),t.p.copy(i.sample(n).p),t.r.set(-t.f.z,0,t.f.x),t),t}function Td(i,t){let e=i.length,n=[new Float64Array(e),new Float64Array(e),new Float64Array(e)],s=[new Float64Array(e),new Float64Array(e),new Float64Array(e)],r=Float64Array.from(t,c=>c?1:0),o={world:n.map(()=>new Float64Array(e)),car:s.map(()=>new Float64Array(e))},a=Float64Array.from(r,(c,l)=>Rn(i,r,l));return{world:n,car:s,weight:r,weightSlopes:a,slopes:o,build(c,l){for(let h=0;h<3;h++){for(let u=0;u<e;u++)n[h][u]=c[u][h],s[h][u]=l[u][h];for(let u=0;u<e;u++)o.world[h][u]=Rn(i,n[h],u),o.car[h][u]=Rn(i,s[h],u)}}}}function Rd(i,t,e,{circuit:n=null,carBox:s=null,frameAt:r=null,clearanceAt:o=null}={}){let a=t.length,c=t.map(H=>H.u),l=n?PM(n):null,h={pos:Td(c,t.map(H=>!!H.pos.rel)),tgt:Td(c,t.map(H=>!!H.tgt.rel))},u={values:new Float64Array(a),slopes:new Float64Array(a)},f=t.map(H=>H.aerial?0:1),d={values:f,slopes:f.map((H,R)=>Rn(c,f,R))},m=new L,x=new L,g=new L(...pd),p=new L,_=new L,y=new L,v=new L,A=s?DM(s):null,b=new Float64Array(A?2*A.length/3:0),w=[0,0,0,0],T=null,S=Math.tan(vh*nn/2),M={aspect:NaN,panel:[NaN,NaN,NaN,NaN],open:[NaN,NaN,NaN,NaN],windows:null,fade:NaN},C=new Float64Array(a).fill(1),N=t.map(()=>({wanted:1,angle:0,fov:0,eye:null,look:null})),D=()=>({values:new Float64Array(Le),slopes:new Float64Array(Le)}),I={widen:D(),back:D()},B=new Float64Array(Le),U=new Float64Array(Le),z=new L,k=new L,J=new L,j=()=>({p:new L,f:new L,r:new L}),$=j(),Z=Array.from({length:AM},j),ut=(H,R)=>(R.p.copy(H.p),R.f.copy(H.f),R.r.copy(H.r),R);function q(H,R,E,O,G,K){p.subVectors(E,R).normalize(),_.crossVectors(p,xa).normalize(),y.crossVectors(_,p);let Y=0;for(let ct=0;ct<A.length;ct+=3){v.copy(H.p).addScaledVector(H.f,A[ct]).addScaledVector(xa,A[ct+1]).addScaledVector(H.r,A[ct+2]).sub(R);let Pt=v.dot(p);if(Pt<.2)return 0;b[Y++]=Math.abs(v.dot(_))/(Pt*O*G*gd),b[Y++]=Math.abs(v.dot(y))/(Pt*K*gd)}let Mt=0;for(let ct=0;ct<Y;ct++)Mt=Math.max(Mt,b[ct]);let gt=0;for(let ct=0;ct<Y;ct++)gt+=Math.exp(_d*(b[ct]/Mt-1));return Mt*(1+Math.log(gt)/_d)}function it(H,R,E){p.subVectors(E,R);let O=p.length();p.divideScalar(O),_.crossVectors(p,xa).normalize(),y.crossVectors(_,p);let G=1/0,K=-1/0,Y=1/0,Mt=-1/0;for(let Pt=0;Pt<A.length;Pt+=3){v.copy(H.p).addScaledVector(H.f,A[Pt]).addScaledVector(xa,A[Pt+1]).addScaledVector(H.r,A[Pt+2]).sub(R);let ot=v.dot(p);if(ot<.2)return;let mt=v.dot(_)/ot,Ct=v.dot(y)/ot;G=Math.min(G,mt),K=Math.max(K,mt),Y=Math.min(Y,Ct),Mt=Math.max(Mt,Ct)}let gt=(G+K)/2,ct=(Y+Mt)/2;E.addScaledVector(_,gt*O).addScaledVector(y,ct*O)}function st(H,R,E,O){if(H.abs)return H.abs.slice();if(H.rel){let[Y,Mt,gt]=H.rel;return[O.p.x+O.f.x*Y+O.r.x*gt,O.p.y+Mt,O.p.z+O.f.z*Y+O.r.z*gt]}let G=T.tgt;if(E==="tgt")return G.slice();let K=t[R].scale||1;return T.pos.map((Y,Mt)=>G[Mt]+(Y-G[Mt])*K)}function dt(H,R){let E=H[0]-R.p.x,O=H[2]-R.p.z;return[E*R.f.x+O*R.f.z,H[1]-R.p.y,E*R.r.x+O*R.r.z]}function yt(H,R,E,O,G,K,Y,Mt,gt){let ct=K[2]-K[0],Pt=K[3]-K[1],ot=Nt=>{let V=o(Nt,E);if(!Mt)return V;let St=Nt.x-H.p.x,tt=Nt.z-H.p.z,lt=St*H.f.x+tt*H.f.z,xt=St*H.r.x+tt*H.r.z,_t=Nt.y-H.p.y,qt=E.x-H.p.x,ne=E.z-H.p.z,Se=qt*H.f.x+ne*H.f.z,te=qt*H.r.x+ne*H.r.z;for(let fe of Mt)k.set(fe.p.x+fe.f.x*lt+fe.r.x*xt,fe.p.y+_t,fe.p.z+fe.f.z*lt+fe.r.z*xt),J.set(fe.p.x+fe.f.x*Se+fe.r.x*te,fe.p.y+E.y-H.p.y,fe.p.z+fe.f.z*Se+fe.r.z*te),V=Math.min(V,o(k,J)-EM);return V},mt=R.x-E.x,Ct=R.z-E.z,rt=Math.hypot(mt,Ct),vt=Nt=>R.y+(Nt-1)*rt*bh,Ft=o?Math.min(Md,ot(R)):0,Rt=null;for(let Nt of o?TM:[0]){let V=Math.cos(Nt*nn),St=Math.sin(Nt*nn),tt=(mt*V-Ct*St)/rt,lt=(mt*St+Ct*V)/rt,xt=1;for(let ne=0;ne<12;ne++){z.set(E.x+tt*rt*xt,vt(xt),E.z+lt*rt*xt);let Se=q(H,z,E,G,ct,Pt);if(!(Se>0))break;let te=Bt(xt*(Se/O),1,Y),fe=Math.abs(te-xt)<1e-4*xt;if(xt=te,fe)break}let _t=1;if(o){if(z.set(E.x+tt*rt,R.y,E.z+lt*rt),Nt!==0&&ot(z)<Ft)continue;for(;_t<xt;){z.set(E.x+tt*rt*_t,vt(_t),E.z+lt*rt*_t);let ne=ot(z)-Ft;if(ne<0){_t=Math.max(1,_t-vd/rt);break}_t=Math.min(xt,_t+Math.max(vd,ne)/rt)}}else _t=xt;let qt=xt/_t;if((!Rt||qt<Rt.shortfall-1e-6)&&(Rt={angle:Nt,scale:_t,wanted:xt,shortfall:qt,ux:tt,uz:lt}),qt<=1+1e-6)break}return gt.set(E.x+Rt.ux*rt*Rt.scale,vt(Rt.scale),E.z+Rt.uz*rt*Rt.scale),yt.angle=Rt.angle,yt.wanted=Rt.wanted,Rt.scale}function Lt(H,R,E,O,G){if(H===M.aspect&&O===M.windows&&G===M.fade&&R.every((rt,vt)=>rt===M.panel[vt])&&E.every((rt,vt)=>rt===M.open[vt]))return;M.aspect=H,M.windows=O,M.fade=G;for(let rt=0;rt<4;rt++)M.panel[rt]=R[rt],M.open[rt]=E[rt];S=Eh(vh,H);let K=t.find(rt=>rt.pos.fit),Y=K?2*Math.atan(Eh(K.fov,H))/nn:40;T=l?NM(l,H,E,Y):null,T||(T={pos:[0,700,600],tgt:[0,0,0],heading:0});let Mt={pos:[],tgt:[]},gt={pos:[],tgt:[]},ct=new L,Pt=new L,ot=[0,0,0,0];for(let rt=0;rt<a;rt++){let vt=ut(r?r(c[rt]):e,$),Ft=st(t[rt].pos,rt,"pos",vt),Rt=st(t[rt].tgt,rt,"tgt",vt),Nt=Eh(t[rt].fov,H);if(C[rt]=1,N[rt].wanted=1,N[rt].angle=0,A&&!t[rt].aerial){let V=Th(c[rt],O,G);for(let _t=0;_t<4;_t++)ot[_t]=Ki(E[_t],R[_t],V);ct.fromArray(Ft),Pt.fromArray(Rt);let St=!!t[rt].pos.rel,tt=null;if(St&&r&&o){let _t=rt>0?(c[rt-1]+c[rt])/2:c[rt],qt=rt<a-1?(c[rt]+c[rt+1])/2:c[rt];tt=Z.map((ne,Se)=>ut(r(_t+(qt-_t)*Se/(Z.length-1)),ne))}let lt=St?bM:SM;for(let _t=0;_t<Sd;_t++)ct.fromArray(Ft),C[rt]=yt(vt,ct,Pt,Nt,H,ot,lt,tt,ct),_t<Sd-1&&it(vt,ct,Pt);N[rt].wanted=yt.wanted,N[rt].angle=yt.angle,Ft[0]=ct.x,Ft[1]=ct.y,Ft[2]=ct.z,Rt[0]=Pt.x,Rt[1]=Pt.y,Rt[2]=Pt.z;let xt=q(vt,ct,Pt,H,ot[2]-ot[0],ot[3]-ot[1]);Nt=Math.min(RM,Math.max(Nt,xt))}u.values[rt]=Nt,N[rt].fov=2*Math.atan(Nt)/nn,N[rt].eye=Ft,N[rt].look=Rt,Mt.pos.push(Ft),Mt.tgt.push(Rt),gt.pos.push(dt(Ft,vt)),gt.tgt.push(dt(Rt,vt))}for(let rt=0;rt<a;rt++)u.slopes[rt]=Rn(c,u.values,rt);h.pos.build(Mt.pos,gt.pos),h.tgt.build(Mt.tgt,gt.tgt);let mt=I.widen.values,Ct=I.back.values;for(let rt=0;rt<Le;rt++){let vt=rt/(Le-1);if(mt[rt]=Ct[rt]=0,!A)continue;let Ft=It(vt),Rt=Bt(ht(d.values,d.slopes,Ft,vt),0,1);if(Rt<=0)continue;let Nt=r?r(vt):e;wt(h.pos,Ft,vt,ct,Nt),wt(h.tgt,Ft,vt,Pt,Nt);let V=ht(u.values,u.slopes,Ft,vt),St=Th(vt,O,G);for(let _t=0;_t<4;_t++)ot[_t]=Ki(E[_t],R[_t],St);let lt=q(Nt,ct,Pt,H,ot[2]-ot[0],ot[3]-ot[1])/V,xt=Math.min(Math.max(0,lt-1),F(V)/V-1);mt[rt]=Rt*xt,Ct[rt]=Rt*Math.max(0,wM*lt/(1+xt)-1)}Yt(I.widen),Yt(I.back),o&&zt(I.back,O,G)}function zt(H,R,E){let{values:O,slopes:G}=H,K=B,Y=z,Mt=!1;for(let ct=0;ct<Le;ct++){K[ct]=1/0;let Pt=O[ct];if(!(Pt>1e-4))continue;let ot=ct/(Le-1),mt=It(ot),Ct=r?r(ot):e;wt(h.pos,mt,ot,Y,Ct),wt(h.tgt,mt,ot,J,Ct);let rt=Math.hypot(Y.x-J.x,Y.z-J.z),vt=Math.min(Md,o(Y,J)),Ft=V=>k.set(J.x+(Y.x-J.x)*(1+V),Y.y+V*rt*bh,J.z+(Y.z-J.z)*(1+V));if(o(Ft(Pt),J)>=vt)continue;let Rt=0,Nt=Pt;for(let V=0;V<8;V++){let St=(Rt+Nt)/2;o(Ft(St),J)>=vt?Rt=St:Nt=St}K[ct]=Rt,Mt=!0}if(!Mt)return;let gt=wh+Math.ceil(3*Ah);for(let ct=0;ct<Le;ct++){let Pt=1/0,ot=Math.min(Le-1,ct+gt);for(let mt=Math.max(0,ct-gt);mt<=ot;mt++)Pt=Math.min(Pt,K[mt]);G[ct]=Math.min(O[ct],Pt)}O.set(G),at(O);for(let ct=0;ct<Le;ct++)G[ct]=Rn(bd,O,ct)}function Yt(H){let{values:R,slopes:E}=H;for(let O=0;O<Le;O++){let G=0,K=Math.min(Le-1,O+wh);for(let Y=Math.max(0,O-wh);Y<=K;Y++)G=Math.max(G,R[Y]);B[O]=G}R.set(B),at(R);for(let O=0;O<Le;O++)E[O]=Rn(bd,R,O)}function at(H){let R=Math.ceil(3*Ah);U.set(H);for(let E=0;E<Le;E++){let O=0,G=0,K=Math.min(Le-1,E+R);for(let Y=Math.max(0,E-R);Y<=K;Y++){let Mt=Math.exp(-.5*((Y-E)/Ah)**2);O+=U[Y]*Mt,G+=Mt}H[E]=O/G}}function pt(H,R){let E=Bt(R,0,1),O=Math.min(Le-2,Math.floor(E*(Le-1))),G=1/(Le-1),{values:K,slopes:Y}=H;return qs(O*G,(O+1)*G,K[O],K[O+1],Y[O],Y[O+1],E)}function F(H){return Math.tan(Math.atan(H)+MM*nn/2)}function It(H){let R=Bt(H,0,1),E=0;for(;E<a-2&&R>c[E+1];)E++;return E}function ht(H,R,E,O){return qs(c[E],c[E+1],H[E],H[E+1],R[E],R[E+1],O)}function wt(H,R,E,O,G){let K=ht(H.world[0],H.slopes.world[0],R,E),Y=ht(H.world[1],H.slopes.world[1],R,E),Mt=ht(H.world[2],H.slopes.world[2],R,E),gt=Bt(ht(H.weight,H.weightSlopes,R,E),0,1);if(gt===0)return O.set(K,Y,Mt);let ct=ht(H.car[0],H.slopes.car[0],R,E),Pt=ht(H.car[1],H.slopes.car[1],R,E),ot=ht(H.car[2],H.slopes.car[2],R,E),mt=G.p.x+G.f.x*ct+G.r.x*ot,Ct=G.p.y+Pt,rt=G.p.z+G.f.z*ct+G.r.z*ot;return O.set(K+(mt-K)*gt,Y+(Ct-Y)*gt,Mt+(rt-Mt)*gt)}function nt(H,R,E){T||Lt(i.aspect,ya,ya,Mh,Sh);let O=Bt(H,0,1),G=It(O);return wt(h.pos,G,O,R,e),wt(h.tgt,G,O,E,e),nt.car=Bt(ht(d.values,d.slopes,G,O),0,1),2*Math.atan(ht(u.values,u.slopes,G,O))/nn}nt.car=1;function Tt({progress:H,introEase:R,clock:E,debugCam:O,width:G,height:K,framing:Y}){let Mt=i.aspect,gt=Y&&Y.panel||ya,ct=Y&&Y.open||ya,Pt=Y&&Y.windows||Mh,ot=Y&&Y.fade||Sh;Lt(Mt,gt,ct,Pt,ot);let mt=Math.tan(nt(H,m,x)*nn/2),Ct=Th(H,Pt,ot),rt=A?yd*-Math.expm1(-pt(I.back,H)/yd):0;if(rt>0){let V=Math.hypot(m.x-x.x,m.z-x.z);m.x=x.x+(m.x-x.x)*(1+rt),m.z=x.z+(m.z-x.z)*(1+rt),m.y+=rt*V*bh}if(A){let V=F(mt)-mt;mt+=V*-Math.expm1(-(pt(I.widen,H)*mt)/V)}R<1&&(m.lerpVectors(g,m,R),mt=Ki(S,mt,R)),O&&(m.fromArray(O.pos),x.fromArray(O.tgt),mt=Math.tan((O.fov||40)*nn/2),Ct=0),m.y+=Math.sin(E*.23)*.036;for(let V=0;V<4;V++)w[V]=Ki(ct[V],gt[V],Ct);let vt=(w[0]+w[2])/2,Ft=(w[1]+w[3])/2;i.position.copy(m),i.lookAt(x),i.fov=2*Math.atan(mt)/nn;let Rt=vt-.5,Nt=Ft-.5;Math.abs(Rt)>1e-6||Math.abs(Nt)>1e-6?i.setViewOffset(G,K,-Rt*G,-Nt*K,G,K):i.clearViewOffset(),i.updateProjectionMatrix()}return{position:m,target:x,evaluateShots:nt,update:Tt,get overhead(){return T},dollies:C,keyInfo:N,fitAt:H=>({widen:pt(I.widen,H),back:pt(I.back,H)})}}var UM=.5,FM=.05,OM=400,yn=20,Zs=3200,Cd=3*yn,BM=.25,zM=.3,kM=.1,VM=.25,HM=1.35,GM=.02,Re=Math.ceil(2*Zs/yn),va=0,Ch=1,Id=2,Pd=3,On=i=>Math.min(Re-1,Math.max(0,Math.floor((i+Zs)/yn)));function WM(i){let t=i.attributes.normal;if(i.type!=="BoxGeometry"||!t)return!1;for(let e=0;e<t.count;e++){let n=Math.abs(t.getX(e)),s=Math.abs(t.getY(e)),r=Math.abs(t.getZ(e));if(n+s+r>Math.max(n,s,r)+1e-6)return!1}return!0}function Dd(i){let t=i.geometry,e=t.attributes.position,n=i.matrixWorld.elements,s=new Float64Array(e.count*3),r=!e.isInterleavedBufferAttribute&&!e.normalized,o=e.array,a=e.itemSize;for(let h=0,u=0;h<e.count;h++,u+=3){let f=r?o[h*a]:e.getX(h),d=r?o[h*a+1]:e.getY(h),m=r?o[h*a+2]:e.getZ(h);s[u]=n[0]*f+n[4]*d+n[8]*m+n[12],s[u+1]=n[1]*f+n[5]*d+n[9]*m+n[13],s[u+2]=n[2]*f+n[6]*d+n[10]*m+n[14]}let c=t.index?t.index.array:null,l=c?t.index.count:e.count;return[s,c,l-l%3]}function XM(i,t){let[e,n,s]=Dd(i),r=new Map,o=t.length;for(let a=0;a<s;a+=3){let c=1/0,l=1/0,h=1/0,u=-1/0,f=-1/0,d=-1/0;for(let m=0;m<3;m++){let x=3*(n?n[a+m]:a+m),g=e[x],p=e[x+1],_=e[x+2];c=Math.min(c,g),u=Math.max(u,g),l=Math.min(l,p),f=Math.max(f,p),h=Math.min(h,_),d=Math.max(d,_)}for(let m=On(h);m<=On(d);m++)for(let x=On(c);x<=On(u);x++){let g=x*yn-Zs,p=m*yn-Zs,_=m*Re+x,y=r.get(_);y===void 0&&(y=t.length,r.set(_,y),t.push(1/0,1/0,1/0,-1/0,-1/0,-1/0)),t[y]=Math.min(t[y],x>0?Math.max(c,g):c),t[y+1]=Math.min(t[y+1],l),t[y+2]=Math.min(t[y+2],m>0?Math.max(h,p):h),t[y+3]=Math.max(t[y+3],x<Re-1?Math.min(u,g+yn):u),t[y+4]=Math.max(t[y+4],f),t[y+5]=Math.max(t[y+5],m<Re-1?Math.min(d,p+yn):d)}}return(t.length-o)/6}function Ld(i){let t=i.elements;return Math.abs(t[1])+Math.abs(t[2])+Math.abs(t[4])+Math.abs(t[6])+Math.abs(t[8])+Math.abs(t[9])<1e-9}function YM(i,t,e,n,s,r,o,a,c,l,h,u){let f=o-n,d=a-s,m=c-r,x=l-n,g=h-s,p=u-r,_=i-n,y=t-s,v=e-r,A=f*_+d*y+m*v,b=x*_+g*y+p*v,w,T,S;if(A<=0&&b<=0)w=n,T=s,S=r;else{let M=i-o,C=t-a,N=e-c,D=f*M+d*C+m*N,I=x*M+g*C+p*N,B=i-l,U=t-h,z=e-u,k=f*B+d*U+m*z,J=x*B+g*U+p*z,j=D*J-k*I,$=k*b-A*J,Z=A*I-D*b;if(D>=0&&I<=D)w=o,T=a,S=c;else if(J>=0&&k<=J)w=l,T=h,S=u;else if(Z<=0&&A>=0&&D<=0){let ut=A/(A-D);w=n+ut*f,T=s+ut*d,S=r+ut*m}else if($<=0&&b>=0&&J<=0){let ut=b/(b-J);w=n+ut*x,T=s+ut*g,S=r+ut*p}else if(j<=0&&I-D>=0&&k-J>=0){let ut=(I-D)/(I-D+(k-J));w=o+ut*(l-o),T=a+ut*(h-a),S=c+ut*(u-c)}else{let ut=1/(j+$+Z),q=$*ut,it=Z*ut;w=n+f*q+x*it,T=s+d*q+g*it,S=r+m*q+p*it}}return Math.hypot(i-w,t-T,e-S)}function Nd(i){let t=new Float32Array(Re*Re).fill(-1/0),e=new Int32Array(Re*Re+1),n=new Int32Array(0),s=new Uint8Array(0),r=new Int32Array(0),o=new Float32Array(0),a=[],c=[],l=new L,h=8e3,u=new L,f=new L,d=new L;function m(_,{sky:y,movers:v=[]}){_.updateMatrixWorld(!0),y.geometry.boundingSphere||y.geometry.computeBoundingSphere(),h=y.geometry.boundingSphere.radius,y.getWorldPosition(l);let A=new en,b=new L,w=new L;for(let $ of v){A.setFromObject($,!0),$.getWorldPosition(w);let Z=0;for(let ut=0;ut<8;ut++)b.set(ut&1?A.max.x:A.min.x,ut&2?A.max.y:A.min.y,ut&4?A.max.z:A.min.z),Z=Math.max(Z,b.distanceTo(w));a.push({object:$,radius:Z*(1+kM)+VM})}let T=[],S=[],M=0,C=0,N=new Set([y,...v]),D=$=>{if(!N.has($)){if($.isSprite)c.push($);else if($.isMesh){let Z=$.geometry;if(Z.boundingBox||Z.computeBoundingBox(),A.copy(Z.boundingBox).applyMatrix4($.matrixWorld),$.isInstancedMesh)T.push($,Pd),M+=$.count,C+=6*$.count;else if(A.max.x-A.min.x<=Cd&&A.max.z-A.min.z<=Cd)T.push($,va),M++,C+=6;else if(A.max.y-A.min.y<=BM){let ut=XM($,S);M+=ut,C+=6*ut}else{let ut=Math.floor((Z.index?Z.index.count:Z.attributes.position.count)/3);T.push($,Ch),M+=ut,C+=9*ut}}for(let Z of $.children)D(Z)}};D(_),s=new Uint8Array(M),r=new Int32Array(M),o=new Float32Array(C);let I=new Float32Array(M*5),B=0,U=0,z=($,Z,ut,q,it,st,dt,yt)=>{s[B]=dt,r[B]=U,o[U++]=$-yt,o[U++]=Z-yt,o[U++]=ut-yt,o[U++]=q+yt,o[U++]=it+yt,o[U++]=st+yt;let Lt=B*5;I[Lt]=$-yt,I[Lt+1]=ut-yt,I[Lt+2]=q+yt,I[Lt+3]=st+yt,I[Lt+4]=it+yt,B++},k=($,Z,ut)=>{let q=($.min.x+$.max.x)/2,it=($.min.y+$.max.y)/2,st=($.min.z+$.max.z)/2,dt=($.max.x-$.min.x)/2,yt=($.max.y-$.min.y)/2,Lt=($.max.z-$.min.z)/2,zt=Z[0]*q+Z[4]*it+Z[8]*st+Z[12],Yt=Z[1]*q+Z[5]*it+Z[9]*st+Z[13],at=Z[2]*q+Z[6]*it+Z[10]*st+Z[14],pt=Math.abs(Z[0])*dt+Math.abs(Z[4])*yt+Math.abs(Z[8])*Lt,F=Math.abs(Z[1])*dt+Math.abs(Z[5])*yt+Math.abs(Z[9])*Lt,It=Math.abs(Z[2])*dt+Math.abs(Z[6])*yt+Math.abs(Z[10])*Lt;z(zt-pt,Yt-F,at-It,zt+pt,Yt+F,at+It,ut?Id:va,ut?0:zM)};for(let $=0;$<S.length;$+=6)z(S[$],S[$+1],S[$+2],S[$+3],S[$+4],S[$+5],va,0);let J=new Vt;for(let $=0;$<T.length;$+=2){let Z=T[$],ut=T[$+1],q=Z.geometry,it=WM(q);if(ut===va)k(q.boundingBox,Z.matrixWorld.elements,it&&Ld(Z.matrixWorld));else if(ut===Pd)for(let st=0;st<Z.count;st++)Z.getMatrixAt(st,J),J.premultiply(Z.matrixWorld),k(q.boundingBox,J.elements,it&&Ld(J));else{let[st,dt,yt]=Dd(Z);for(let Lt=0;Lt<yt;Lt+=3){s[B]=Ch,r[B]=U;let zt=1/0,Yt=1/0,at=-1/0,pt=-1/0,F=-1/0;for(let ht=0;ht<3;ht++){let wt=3*(dt?dt[Lt+ht]:Lt+ht),nt=st[wt],Tt=st[wt+1],H=st[wt+2];o[U++]=nt,o[U++]=Tt,o[U++]=H,nt<zt&&(zt=nt),nt>at&&(at=nt),Tt>pt&&(pt=Tt),H<Yt&&(Yt=H),H>F&&(F=H)}let It=B*5;I[It]=zt,I[It+1]=Yt,I[It+2]=at,I[It+3]=F,I[It+4]=pt,B++}}}let j=new Int32Array(Re*Re);for(let $=0;$<2;$++){if($===1){e=new Int32Array(Re*Re+1);for(let Z=0;Z<Re*Re;Z++)e[Z+1]=e[Z]+j[Z];n=new Int32Array(e[Re*Re]),j.set(e.subarray(0,Re*Re))}for(let Z=0;Z<M;Z++){let ut=Z*5,q=On(I[ut]),it=On(I[ut+1]),st=On(I[ut+2]),dt=On(I[ut+3]);for(let yt=it;yt<=dt;yt++)for(let Lt=q;Lt<=st;Lt++){let zt=yt*Re+Lt;$===0?(j[zt]++,I[ut+4]>t[zt]&&(t[zt]=I[ut+4])):n[j[zt]++]=Z}}}}function x(_,y,v,A,b){for(let w=e[_];w<e[_+1];w++){let T=n[w],S=r[T],M=o,C;if(s[T]!==Ch){let N=Math.max(M[S]-y,0,y-M[S+3]),D=Math.max(M[S+1]-v,0,v-M[S+4]),I=Math.max(M[S+2]-A,0,A-M[S+5]);C=Math.sqrt(N*N+D*D+I*I),C===0&&s[T]===Id&&(C=Math.min(y-M[S],M[S+3]-y,v-M[S+1],M[S+4]-v,A-M[S+2],M[S+5]-A))}else C=YM(y,v,A,M[S],M[S+1],M[S+2],M[S+3],M[S+4],M[S+5],M[S+6],M[S+7],M[S+8]);C<b&&(b=C)}return b}function g(_,y,v){let A=1/0,b=On(_),w=On(v);for(let T=0;T<Re&&!((T-1)*yn>=A);T++)for(let S=w-T;S<=w+T;S++){if(S<0||S>=Re)continue;let C=S===w-T||S===w+T||T===0?1:2*T;for(let N=b-T;N<=b+T;N+=C){if(N<0||N>=Re)continue;let D=S*Re+N;if(e[D]===e[D+1])continue;let I=N*yn-Zs,B=S*yn-Zs,U=Math.max(I-_,0,_-I-yn),z=Math.max(B-v,0,v-B-yn),k=Math.max(0,y-t[D]);Math.sqrt(U*U+k*k+z*z)<A&&(A=x(D,_,y,v,A))}}return A}let p={build:m,clearance:0,update(_,y){let v=g(_.x,_.y,_.z);for(let S=0;S<a.length;S++){let{object:M,radius:C}=a[S];M.visible&&(v=Math.min(v,Math.max(0,_.distanceTo(M.position)-C)))}u.subVectors(y,_).normalize(),f.set(-u.z,0,u.x).normalize(),d.crossVectors(f,u);let A=Math.tan(i.fov*Math.PI/360)*HM,b=A*i.aspect;for(let S=0;S<c.length;S++){let M=c[S];if(!M.visible)continue;let C=M.matrixWorld.elements,N=C[12]-_.x,D=C[13]-_.y,I=C[14]-_.z,B=N*u.x+D*u.y+I*u.z;if(!(B>0)||B>=v)continue;let U=.5*Math.hypot(Math.hypot(C[0],C[1],C[2]),Math.hypot(C[4],C[5],C[6])),z=Math.abs(N*f.x+I*f.z)-U,k=Math.abs(N*d.x+D*d.y+I*d.z)-U;z<B*b&&k<B*A&&(v=B)}p.clearance=v;let w=Math.min(OM,Math.max(FM,UM*v)),T=_.distanceTo(l)+h*(1+GM);(w!==i.near||T!==i.far)&&(i.near=w,i.far=T,i.updateProjectionMatrix())}};return p}var qM=[[560,206],[470,206],[400,206],[330,206],[290,205],[250,201],[215,196.5],[170,194.4],[80,194.2],[10,194.2],[-28,193.2],[-48,190.4],[-60,189.2],[-74,189.4],[-98,191.6],[-140,194.2],[-220,194.4],[-292,194.6],[-340,197.4],[-392,201.2],[-440,204.6],[-490,205.8]],ZM=3,$M=286,JM=3,KM=[[-64,61],[-61,78],[-56,96],[-44,112],[-26,121],[-8,124.5],[14,126],[48,132],[76,146],[86,166],[84,182],[74,189.8],[56,192.4],[34,192.6],[18,192.6],[4,192.6]];function Ud(i){let t=[],e=(r,o)=>t.push(new L(r,0,o));for(let[r,o]of qM)e(r,o);let n=i.length;for(let r=ZM;r<=$M;r+=JM){let o=i[r%n];e(o[0],o[1])}for(let[r,o]of KM)e(r,o);let s=new Lr(t,!1,"centripetal",.5);return s.arcLengthDivisions=16e3,s}function Ri(i,t,e){let n=i.getLength(),s=0,r=1e9,o=new L;for(let a=0;a<=4e3;a++){i.getPointAt(a/4e3,o);let c=(o.x-t)**2+(o.z-e)**2;c<r&&(r=c,s=a/4e3)}return s*n}function Ke(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new se,l=0;for(let h=0;h<i.length;++h){let u=i[h],f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,h),l+=d}}if(e){let h=0,u=[];for(let f=0;f<i.length;++f){let d=i[f].index;for(let m=0;m<d.count;++m)u.push(d.getX(m)+h);h+=i[f].attributes.position.count}c.setIndex(u)}for(let h in r){let u=Fd(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){let d=[];for(let x=0;x<o[h].length;++x)d.push(o[h][x][f]);let m=Fd(d);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(m)}}return c}function Fd(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){let h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new Oe(o,e,n),c=0;for(let l=0;l<i.length;++l){let h=i[l];if(h.isInterleavedBufferAttribute){let u=c/e;for(let f=0,d=h.count;f<d;f++)for(let m=0;m<e;m++){let x=h.getComponent(f,m);a.setComponent(f+u,m,x)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}function Od(i,t=1e-4){t=Math.max(t,Number.EPSILON);let e={},n=i.getIndex(),s=i.getAttribute("position"),r=n?n.count:s.count,o=0,a=Object.keys(i.attributes),c={},l={},h=[],u=["getX","getY","getZ","getW"],f=["setX","setY","setZ","setW"];for(let _=0,y=a.length;_<y;_++){let v=a[_],A=i.attributes[v];c[v]=new A.constructor(new A.array.constructor(A.count*A.itemSize),A.itemSize,A.normalized);let b=i.morphAttributes[v];b&&(l[v]||(l[v]=[]),b.forEach((w,T)=>{let S=new w.array.constructor(w.count*w.itemSize);l[v][T]=new w.constructor(S,w.itemSize,w.normalized)}))}let d=t*.5,m=Math.log10(1/t),x=Math.pow(10,m),g=d*x;for(let _=0;_<r;_++){let y=n?n.getX(_):_,v="";for(let A=0,b=a.length;A<b;A++){let w=a[A],T=i.getAttribute(w),S=T.itemSize;for(let M=0;M<S;M++)v+=`${~~(T[u[M]](y)*x+g)},`}if(v in e)h.push(e[v]);else{for(let A=0,b=a.length;A<b;A++){let w=a[A],T=i.getAttribute(w),S=i.morphAttributes[w],M=T.itemSize,C=c[w],N=l[w];for(let D=0;D<M;D++){let I=u[D],B=f[D];if(C[B](o,T[I](y)),S)for(let U=0,z=S.length;U<z;U++)N[U][B](o,S[U][I](y))}}e[v]=o,h.push(o),o++}}let p=i.clone();for(let _ in i.attributes){let y=c[_];if(p.setAttribute(_,new y.constructor(y.array.slice(0,o*y.itemSize),y.itemSize,y.normalized)),_ in l)for(let v=0;v<l[_].length;v++){let A=l[_][v];p.morphAttributes[_][v]=new A.constructor(A.array.slice(0,o*A.itemSize),A.itemSize,A.normalized)}}return p.setIndex(h),p}var jM={float32:Float32Array,uint16:Uint16Array,int16:Int16Array,int8:Int8Array};function Bd(i,t,e){let n=jM[t.type];if(!n)throw new Error("ce-mesh/2: unsupported type "+t.type);return new n(i,t.offset,e)}function QM(i){let t=atob(i.trim()),e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e.buffer}async function zd(i,t){let e=i.slice(0,i.lastIndexOf("/")+1),n=await(await fetch(i)).json();if(n.format!=="ce-mesh/2")throw new Error(`${i}: expected ce-mesh/2, got ${n.format}`);let s=await fetch(e+n.buffer),r=n.bufferEncoding==="base64"?QM(await s.text()):await s.arrayBuffer();t&&t({loaded:1,total:2});let o=new se,a=n.vertexCount;for(let[m,x]of Object.entries(n.attributes)){let g=Bd(r,x,a*x.size);o.setAttribute(m,new Oe(g,x.size,!!x.normalized))}o.setIndex(new Oe(Bd(r,n.index,n.indexCount),1)),n.groups.forEach((m,x)=>o.addGroup(m.start,m.count,x)),o.computeBoundingSphere();let c=new oa,l=async(m,x)=>{let g=await c.loadAsync(e+m);return g.flipY=!1,g.wrapS=g.wrapT=He,x&&(g.colorSpace=xe),g},h={...n.textures};n.footprint&&(h.footprint=n.footprint.map);let u=Object.keys(h),f=await Promise.all(u.map(m=>l(h[m],m==="map"))),d=Object.fromEntries(u.map((m,x)=>[m,f[x]]));return d.footprint&&(d.footprint.flipY=!0,d.footprint.wrapS=d.footprint.wrapT=Jn),t&&t({loaded:2,total:2}),{geometry:o,groups:n.groups,textures:d,desc:n}}var kd=.6,tS=.3,eS=.45,nS=1,Hd=Jt.lights_physical_fragment.replace("texture2D( clearcoatMap, vClearcoatMapUv ).x","texture2D( clearcoatMap, vClearcoatMapUv ).z");if(Hd===Jt.lights_physical_fragment)throw new Error("hero car: three.js clearcoat chunk changed; update body-materials.js");function Vd(i,t){return i.normalMap=t.normalMap,i.normalScale.set(kd,-kd),i}var iS={body(i,t){let e={name:"car-body",map:i.map,roughnessMap:i.ormMap,roughness:1,metalness:0};if(t==="low")return Vd(new bt(e),i);let n=new Ws({...e,clearcoat:1,clearcoatMap:i.ormMap,clearcoatRoughness:tS,clearcoatRoughnessMap:i.ormMap});return n.onBeforeCompile=s=>{s.fragmentShader=s.fragmentShader.replace("#include <lights_physical_fragment>",Hd)},n.customProgramCacheKey=()=>"car-body-clearcoat-b",Vd(n,i)},lights(i){return new bt({name:"car-lights",map:i.map,roughness:.18,metalness:0,emissive:new Ot(16777215),emissiveMap:i.map,emissiveIntensity:eS})}};function Gd(i,t,e){return i.map(n=>{let s=iS[n.name];if(!s)throw new Error("hero car: no material for body group "+n.name);let r=s(t,e);return r.aoMap=t.ormMap,r.aoMapIntensity=nS,r})}var sS=15282981,Ph="#5b6067",rS="#3a3c40",oS="#b0362c",Lh=.41,aS=.69,Wd=.75;function Sa(i,t,e,{data:n=!1,clamp:s=!1}={}){let r=document.createElement("canvas");r.width=i,r.height=t,e(r.getContext("2d"),i,t);let o=new xn(r);return n||(o.colorSpace=xe),s||(o.wrapS=He),o}function Ma(i){let t=i>>>0;return()=>(t=t*1664525+1013904223>>>0)/4294967296}function cS(i){let{beadIn:n,sideIn:s,treadIn:r,treadOut:o,sideOut:a,beadOut:c}=i,l=d=>(1-d)*128,h=(d,m,x,g,p,_)=>{let y=b=>l(m+(x-m)*b);if(d.fillStyle=_(1),d.fillRect(0,Math.min(y(.06),y(.16)),1024,Math.abs(y(.16)-y(.06))),d.fillRect(0,Math.min(y(.3),y(.33)),1024,Math.max(1,Math.abs(y(.33)-y(.3)))),d.fillRect(0,Math.min(y(.85),y(.88)),1024,Math.max(1,Math.abs(y(.88)-y(.85)))),!g)return;let v=Math.min(y(.42),y(.72)),A=Math.abs(y(.72)-y(.42));for(let b of[.06,.56]){let w=b*1024,T=(b+.3)*1024;for(;w<T;){let S=6+p()*14;p()>.18&&d.fillRect(w,v+A*.1,S,A*(.6+p()*.3)),w+=S+3+(p()>.8?12:0)}}},u=Sa(1024,128,d=>{d.fillStyle="#000",d.fillRect(0,0,1024,128);let m=Ma(7),x=()=>"#fff";h(d,n,s,!1,m,x),h(d,c,a,!0,m,x)},{data:!0});return{color:Sa(1024,128,d=>{d.fillStyle="#1c1c1e",d.fillRect(0,0,1024,128);let m=Ma(11);for(let p=0;p<160;p++){let _=r+(o-r)*m();d.fillStyle=`rgba(70,68,66,${.05+m()*.08})`,d.fillRect(m()*1024,l(_),40+m()*200,1)}let x=Ma(7),g=p=>()=>`rgba(128,128,130,${p})`;h(d,n,s,!1,x,g(.12)),h(d,c,a,!0,x,g(.16))}),height:u}}function lS(i){return Sa(512,512,(t,e)=>{let n=e/2;t.fillStyle="#b4b4b2",t.fillRect(0,0,e,e);let s=Ma(3);for(let a=0;a<40;a++)t.strokeStyle=`rgba(${s()>.5?"255,255,255":"60,60,60"},${.05+s()*.1})`,t.lineWidth=1,t.beginPath(),t.arc(n,n,n*(i+(1-i)*s()),0,Math.PI*2),t.stroke();t.strokeStyle="rgba(28,28,28,0.9)",t.lineWidth=4;let r=n*(i+.12),o=n*.95;for(let a=0;a<36;a++){let c=a/36*Math.PI*2;t.beginPath();for(let l=0;l<=8;l++){let h=l/8,u=r+(o-r)*h,f=c+h*.35;l?t.lineTo(n+u*Math.cos(f),n+u*Math.sin(f)):t.moveTo(n+u*Math.cos(f),n+u*Math.sin(f))}t.stroke()}},{clamp:!0})}function hS(i){return Sa(256,256,(t,e)=>{let n=e/2,s=(c,l,h)=>{t.fillStyle=h,t.beginPath(),t.arc(n,n,l*n,0,Math.PI*2),t.arc(n,n,c*n,0,Math.PI*2,!0),t.fill()};s(.86,1,Ph),s(.4,.86,rS),s(0,.4,Ph),s(.97,1,"#2a2c30");let[r,o,a]=i;t.fillStyle=oS,t.beginPath(),t.arc(n,n,o*n,-a/2,a/2),t.arc(n,n,r*n,a/2,-a/2,!0),t.fill(),t.fillStyle="#9a9fa6",t.beginPath(),t.arc(n,n,.18*n,0,Math.PI*2),t.fill()},{clamp:!0})}function uS(i,t,e){let n=t/2,s=[[e+.01,-n+.018],[e+.026,-n-.004],[i-.09,-n-.012],[i-.035,-n-.006],[i-.008,-n+.02],[i,-n+.055],[i+.002,0],[i,n-.055],[i-.008,n-.02],[i-.035,n+.006],[i-.09,n+.012],[e+.026,n+.004],[e+.01,n-.018]],r=new Gs(s.map(([c,l])=>new ft(c,l))).getPoints(40),o=c=>c/(s.length-1),a=new Ai(r,56);return a.rotateX(Math.PI/2),{geometry:a,profileV:{beadIn:o(0),sideIn:o(3),treadIn:o(5),treadOut:o(7),sideOut:o(9),beadOut:o(12)}}}function fS(i,t=10){let e=new Un;e.absarc(0,0,i,0,Math.PI*2,!1);let n=i*.86,s=i*.32,r=Math.PI*2/t;for(let a=0;a<t;a++){let c=a*r+r*.17,l=(a+1)*r-r*.17,h=new Wi;h.moveTo(Math.cos(c)*s*1.25,Math.sin(c)*s*1.25),h.absarc(0,0,n,c+.04,l-.04,!1),h.lineTo(Math.cos(l)*s*1.25,Math.sin(l)*s*1.25),h.closePath(),e.holes.push(h)}let o=new Or(e,{depth:.035,bevelEnabled:!0,bevelThickness:.008,bevelSize:.006,bevelSegments:1,curveSegments:20});return o.translate(0,0,-.035),o}function dS(i,t){let e=-t*.45,n=t/2-.03,s=[new ft(i*.97,e),new ft(i*.99,e+.01),new ft(i*.99,n-.02),new ft(i*1.03,n-.006),new ft(i*1.035,n),new ft(i*1,n+.004)],r=new Ai(s,56);return r.rotateX(Math.PI/2),r}function pS(i,t,e){let n=e/2,s=new Br(i,t,64).translate(0,0,n),r=new Br(i,t,64).rotateY(Math.PI).translate(0,0,-n),o=new jt(t,t,e,64,1,!0).rotateX(Math.PI/2),a=Ke([s,r,o]);return s.dispose(),r.dispose(),o.dispose(),a}function mS(i,t,e,n){let s=new Un;s.absarc(0,0,t,-e/2,e/2,!1),s.absarc(0,0,i,e/2,-e/2,!0),s.closePath();let r=new Or(s,{depth:n,bevelEnabled:!0,bevelThickness:.008,bevelSize:.008,bevelSegments:2,curveSegments:16});return r.translate(0,0,-n/2),r}function gS(i,t){return{rubber:new bt({name:"tyre",color:16777215,map:i.color,bumpMap:i.height,bumpScale:2.5,roughness:.9,metalness:0}),rim:new bt({name:"rim",color:Ph,roughness:.36,metalness:1}),barrel:new bt({name:"rim-barrel",color:4079942,roughness:.38,metalness:1,side:_e}),nut:new bt({name:"wheel-nut",color:12896718,roughness:.22,metalness:1}),disc:new bt({name:"brake-disc",color:9146002,map:lS(.45/.82),roughness:.42,metalness:1}),bell:new bt({name:"disc-bell",color:2960945,roughness:.5,metalness:.6}),caliper:new bt({name:"caliper",color:sS,roughness:.35,metalness:0}),dark:new Ae({name:"wheel-backing",color:328966}),well:new bt({name:"wheel-well",color:855310,roughness:.95,metalness:0,side:_e}),blur:new bt({name:"wheel-blur",map:hS(t),transparent:!0,opacity:0,roughness:.35,metalness:.75,depthWrite:!1})}}function xS(i,t,e){return(e?1:-1)*(i/t)}var _S=["FL","FR","RL","RR"],Xd=.55;function yS(i,t,e=0){return _S.map(n=>{let s=n[0]==="F",r=n[1]==="L",o=s!==r;return{key:n,front:s,left:r,r:i[n].r,centre:new L(i[n].x,i[n].r+e,(r?-1:1)*t),scale:i[n].r/Lh,caliperTurn:new Vt().makeRotationZ(o?Xd:Math.PI-Xd)}})}var Yd=new we,qd=new we,vS=new we().setFromAxisAngle(new L(0,1,0),Math.PI),Hr=new we,Ih=new L,MS=new L(0,1,0),SS=new L(0,0,1);function bS(i,t,e,n,s){Yd.setFromAxisAngle(MS,i.front?e:0),Hr.copy(Yd),i.left&&Hr.multiply(vS),Ih.setScalar(i.scale),s.compose(i.centre,Hr,Ih),qd.setFromAxisAngle(SS,xS(t,i.r,i.left)),Hr.multiply(qd),n.compose(i.centre,Hr,Ih)}function Zd({layout:i,width:t,centreZ:e,centreY:n=0}){let s=Lh*aS,r=t/2,o=s*.985,a=r-.13,c=s*.82,l=c-.06,h=c+.022,{geometry:u,profileV:f}=uS(Lh,t,s),d=gS(cS(f),[l/o,h/o,Wd]),m=fS(o).translate(0,0,r-.045),x=dS(s,t),g=new jt(.05,.058,.06,6).rotateX(Math.PI/2).translate(0,0,r-.02),p=pS(s*.45,c,.032).translate(0,0,a),_=new jt(s*.45,s*.45,.05,32,1,!1).rotateX(Math.PI/2).translate(0,0,a+.04),y=new ei(s*.99,40).translate(0,0,r-.2),v=mS(l,h,Wd,.068).translate(0,0,a-.006),A=new ei(o,48).translate(0,0,r-.028),b=new ae;b.name="wheels";let w=(U,z,k,{rolling:J=!0,castShadow:j=!1,receiveShadow:$=!1}={})=>{let Z=new Ue(z,k,4);return Z.name="wheel-"+U,Z.castShadow=j,Z.receiveShadow=$,Z.userData.rolling=J,b.add(Z),Z},T=[w("tyre",u,d.rubber,{castShadow:!0,receiveShadow:!0}),w("rim",m,d.rim,{castShadow:!0,receiveShadow:!0}),w("barrel",x,d.barrel),w("nut",g,d.nut),w("disc",p,d.disc),w("bell",_,d.bell),w("backing",y,d.dark)],S=w("caliper",v,d.caliper,{rolling:!1}),M=w("blur",A,d.blur,{rolling:!1});M.renderOrder=3;let C=yS(i,e,n),N=Object.fromEntries(C.map(U=>[U.key,U.r])),D=new Vt,I=new Vt;function B(U,z){for(let k=0;k<4;k++){bS(C[k],U,z,I,D);for(let J of T)J.setMatrixAt(k,I);D.multiply(C[k].caliperTurn),S.setMatrixAt(k,D),M.setMatrixAt(k,D)}for(let k of b.children)k.instanceMatrix.needsUpdate=!0}B(0,0);for(let U of b.children)U.computeBoundingSphere();return{group:b,materials:d,radius:N,wheels:C,update:B}}var wS=.34,AS=.86,Nh=.03,Uh=.012,Jd=.006,ES=.9,$d=4,TS=14,Dh=.49,RS=.95;async function CS(i,t,e){let{geometry:n,groups:s,textures:r,desc:o}=await zd(i,e),a=new Et(n,Gd(s,r,t));a.name=o.name,o.positionTransform&&(a.position.fromArray(o.positionTransform.offset),a.scale.setScalar(o.positionTransform.scale)),a.castShadow=a.receiveShadow=!0;let c=new ae;return c.add(a),c.userData.footprint=r.footprint,c.userData.footprintSize=o.footprint.size,c.userData.lowPoints=o.lowPoints||null,c}function IS(i,t){let e=[];for(let s of["FL","FR","RL","RR"]){let{x:r,y:o,r:a}=i[s],c=s[1]==="R"?1:-1,l=RS-Dh;e.push(new jt(a*1.07,a*1.07,l,40,1,!0,Math.PI*.42,Math.PI*1.16).rotateX(Math.PI/2).translate(r,o,c*(Dh+l/2)));let h=new ei(a*1.07,40,-Math.PI*.08,Math.PI*1.16);e.push(h.translate(r,o,c*Dh))}let n=new Et(Ke(e),t);n.name="wheel-wells";for(let s of e)s.dispose();return n}function PS(i,[t,e]){let n=new Ae({name:"car-ground-occlusion",color:0,alphaMap:i,transparent:!0,opacity:ES,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4}),s=new Et(new ce(t,e).rotateX(-Math.PI/2),n);return s.name="ground-occlusion",s.position.y=Nh+Jd,s.renderOrder=1,s.userData.noMask=!0,s}function LS(i){if(!i)return null;let t=new Float64Array(i.length*3);return i.forEach(([e,n,s],r)=>t.set([e,n-Uh,s],r*3)),t}async function Kd(i,t,{onProgress:e,quality:n="high"}={}){let s=t.body?i.slice(0,i.lastIndexOf("/")+1)+t.body:i,r=await CS(s,n,e),o=new ae;o.name="hero-car";let a=new ae;a.position.y=Nh-Uh,o.add(a),a.add(r);let c=Zd({layout:t,width:wS,centreZ:AS}),l=c.materials;c.group.position.y=a.position.y,o.add(c.group),a.add(IS(t,l.well));let h=PS(r.userData.footprint,r.userData.footprintSize);return o.add(h),{root:o,chassis:a,body:r,wheels:c,lowPoints:LS(r.userData.lowPoints),contacts:c.wheels.map(u=>[u.centre.x,u.centre.z]),pose({dist:u=0,steer:f=0,pitch:d=0,roll:m=0,heave:x=0,speed:g=0,road:p=Nh}={}){l.blur.opacity=Math.min(1,Math.max(0,(g-$d)/(TS-$d))),l.blur.visible=l.blur.opacity>.01,c.update(u,f);let _=p-Uh;c.group.position.y=_,a.rotation.set(m,0,d),a.position.y=_+x,h.position.y=p+Jd}}}var Fh=.6,jd=1.2,DS=.3;function Qd(i,t,e,n){i.updateMatrixWorld(!0);let s=[],r=p=>!p.transparent&&p.depthWrite;i.traverse(p=>{if(!p.isMesh||p.isInstancedMesh||!(Array.isArray(p.material)?p.material.every(r):r(p.material)))return;let _=new en().setFromObject(p);_.max.y-_.min.y<DS&&_.min.y<Fh&&_.max.y>Fh-jd&&s.push({node:p,box:_})}),s.sort((p,_)=>_.box.max.y-p.box.max.y);let o=Float64Array.from(new Set(e)).sort(),a=new Float64Array(o.length),c=new ua;c.far=jd;let l=new L(0,-1,0),h=new L,u=new L,f=[],d=new Float64Array(n.length);function m(){let p=-1/0;for(let{node:_,box:y}of s){if(y.max.y<p)break;h.x<y.min.x||h.x>y.max.x||h.z<y.min.z||h.z>y.max.z||(f.length=0,c.intersectObject(_,!1,f),f.length&&(p=Math.max(p,f[0].point.y)))}return Number.isFinite(p)?p:NaN}for(let p=0;p<o.length;p++){let{p:_,t:y}=t.sample(o[p]);u.set(-y.z,0,y.x).normalize(),n.forEach(([b,w],T)=>{h.set(_.x,0,_.z).addScaledVector(y,b).addScaledVector(u,w),h.y=Fh,c.set(h,l),d[T]=m()});let v=Array.from(d).filter(Number.isFinite).sort((b,w)=>b-w),A=v.length>>1;a[p]=v.length?v.length%2?v[A]:(v[A-1]+v[A])/2:NaN}let x=a.findIndex(Number.isFinite);for(let p=0;p<a.length;p++)Number.isFinite(a[p])||(a[p]=x<0?0:a[p?p-1:x]);function g(p){let _=o.length;if(p<=o[0])return a[0];if(p>=o[_-1])return a[_-1];let y=0,v=_-1;for(;v-y>1;){let b=y+v>>1;o[b]<=p?y=b:v=b}let A=(p-o[y])/(o[v]-o[y]);return a[y]+(a[v]-a[y])*A}return{heightAt:g,samples:o,heights:a}}var NS=new L(0,1,0),US=120,Gr=2.5,ba=.05,FS=2.563,Ta=.5,OS=1.2,BS=.25,zS=6,tp=85,ep=40,np=12,ip=15,kS=.0012,VS=.0019,wa=.016,Aa=.028,HS=4e-4,GS=.0015,WS=7.3,sp=.006,rp=.003,XS=.02,YS=.001,qS=9,ZS=7,$S=6,JS=12,KS=.001;function ap(i,t){return{intro:0,arrival:Ri(i,330,206),pitBox:Ri(i,-60,189.2),pitExit:Ri(i,-392,201.2),lapStart:Ri(i,t[6][0],t[6][1]),lapEnd:Ri(i,t[96][0],t[96][1]),paddock:Ri(i,-8,124.5),goldenHour:Ri(i,18,192.6)}}function Oh(i){return[[0,i.arrival],[.085,i.arrival+4],[.2,i.pitBox],[.315,i.pitBox+.3],[.34,i.pitBox+40],[.425,i.lapStart],[.56,i.lapEnd],[.665,i.paddock],[.79,i.paddock+1.5],[.885,i.goldenHour],[1,i.goldenHour+3]]}function cp(i){let t=i.map(s=>s[0]),e=i.map(s=>s[1]),n=i.map((s,r)=>Rn(t,e,r));return s=>{let r=Bt(s,0,1),o=0;for(;o<i.length-2&&r>t[o+1];)o++;return qs(t[o],t[o+1],e[o],e[o+1],n[o],n[o+1],r)}}function lp(i,t,e){return Ki(e.arrival-US,i,1-Math.pow(1-Bt(t,0,1),3))}function hp(i){let t=i.getLength(),e={p:new L,t:new L},n=new L,s=new L,r=new L,o=(h,u)=>i.getPointAt(Bt(h/t,0,1),u);function a(h,u){let f=Bt(h,ba,t-ba);return o(f-ba,n),o(f+ba,u),u.sub(n).normalize()}function c(h){return o(h,e.p),a(h,e.t),e}function l(h){let u=Bt(h,Gr,t-Gr);o(u-Gr,n),o(u,s),o(u+Gr,r);let f=Math.atan2(s.z-n.z,s.x-n.x),d=Math.atan2(r.z-s.z,r.x-s.x);return Math.atan2(Math.sin(d-f),Math.cos(d-f))/Gr}return{length:t,sample:c,curvatureAt:l}}var jS=(i,t,e,n)=>i+(t-i)*(1-Math.exp(-n*e));function Ea(i,t,e,n){let s=i.x-t,r=i.v+e*s,o=Math.exp(-e*n);return i.x=t+(s+r*n)*o,i.v=(i.v-e*r*n)*o,i.x}function op(i,t,e){let n=e<0?-1:1,s=OS+BS*Math.abs(e);return Bt(-Math.atan(FS*i.curvatureAt(t+n*s)),-Ta,Ta)}function QS(i,t,e,n){if(!i)return 1;let s=1;for(let r=0;r<i.length;r+=3){let o=-(i[r]*t-i[r+2]*e+n);if(o<=0)continue;let a=i[r+1]-XS-YS;s=Math.min(s,a>0?a/o:0)}return s}function up(i,t,e,{roadHeight:n=null}={}){let s=e,r=!0,o=0,a=0,c=!1,l={x:0,v:0},h={x:0,v:0},u={x:0,v:0},f={x:0,v:0},d=i.lowPoints||null,m={dist:0,steer:0,pitch:0,roll:0,heave:0,speed:0,road:void 0},x={p:new L,f:new L,r:new L};function g(_){c||(o=0),a=o,l.x=op(t,_,0),l.v=h.x=h.v=u.x=u.v=f.x=f.v=0}let p={get lastDistance(){return s},set lastDistance(_){s=_,r=!0},wheelDistance:e,get speed(){return o},set speed(_){o=_,c=!0},get prevSpeed(){return a},set prevSpeed(_){a=_},accel:0,lateral:0,get steer(){return m.steer},get pitch(){return m.pitch},get roll(){return m.roll},get heave(){return m.heave},frame:x,update(_,y){let v=_-s;if(s=_,r||!(y>KS))r=!1,g(_),p.accel=p.lateral=0;else{let w=Bt(v/y,-tp,tp);a=o,o=Bt(jS(o,w,zS,y),o-ep*y,o+ep*y),p.accel=Bt((o-a)/y,-np,np),p.lateral=Bt(o*o*t.curvatureAt(_),-ip,ip),Ea(l,op(t,_,o),qS,y),Ea(u,Bt(-VS*p.lateral,-Aa,Aa),$S,y),Ea(h,Bt(kS*p.accel,-wa,wa),ZS,y);let T=Math.abs(p.accel)+Math.abs(p.lateral),S=GS*Math.sin(_/WS*Math.PI*2)*Math.min(1,Math.abs(o)/20);Ea(f,Bt(S-HS*T,-sp,rp),JS,y),l.x=Bt(l.x,-Ta,Ta),u.x=Bt(u.x,-Aa,Aa),h.x=Bt(h.x,-wa,wa),f.x=Bt(f.x,-sp,rp)}c=!1,p.wheelDistance=_;let A=t.sample(_);x.p.copy(A.p),x.f.copy(A.t).setY(0).normalize(),x.r.crossVectors(x.f,NS).normalize(),i.root.position.copy(A.p),i.root.rotation.y=Math.atan2(-A.t.z,A.t.x);let b=QS(d,h.x,u.x,f.x);m.dist=_,m.steer=l.x,m.pitch=h.x*b,m.roll=u.x*b,m.heave=f.x*b,m.speed=Math.abs(o),n&&(m.road=n(_)),i.pose(m)}};return p}function Me(i=1){let t=i>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}var oe=256,ii=null,vn=null,dp=i=>i*i*i*(i*(i*6-15)+10);function tb(i,t){let e=new Float64Array(t*t*2);for(let n=0;n<t*t;n++){let s=i()*Math.PI*2;e[2*n]=Math.cos(s),e[2*n+1]=Math.sin(s)}return e}function fp(i,t,e){let n=new Float64Array(oe*oe),s=new Int32Array(oe),r=new Float64Array(oe),o=new Float64Array(oe),a=.5;for(let c=0;c<e;c++){let l=t<<c,h=l-1,u=tb(i,l),f=l/oe;for(let d=0;d<oe;d++){let m=d*f;s[d]=Math.floor(m),r[d]=m-s[d],o[d]=dp(r[d])}for(let d=0;d<oe;d++)eb(n,d,f,h,l,u,s,r,o,a);a*=.5}return n}function eb(i,t,e,n,s,r,o,a,c,l){let h=t*e,u=Math.floor(h),f=h-u,d=dp(f),m=(u&n)*s,x=(u+1&n)*s,g=t*oe;for(let p=0;p<oe;p++){let _=o[p],y=a[p],v=2*(m+(_&n)),A=2*(m+(_+1&n)),b=2*(x+(_&n)),w=2*(x+(_+1&n)),T=r[v]*y+r[v+1]*f,S=r[A]*(y-1)+r[A+1]*f,M=r[b]*y+r[b+1]*(f-1),C=r[w]*(y-1)+r[w+1]*(f-1),N=T+(S-T)*c[p],D=M+(C-M)*c[p];i[g+p]+=l*(N+(D-N)*d)}}function nb(i,t){let e=new Float64Array(t*t*2);for(let r=0;r<t*t;r++)e[2*r]=i(),e[2*r+1]=i();let n=new Float64Array(oe*oe),s=t/oe;for(let r=0;r<oe;r++)for(let o=0;o<oe;o++){let a=(o+.5)*s,c=(r+.5)*s,l=Math.floor(a),h=Math.floor(c),u=9;for(let f=-1;f<=1;f++)for(let d=-1;d<=1;d++){let m=l+d,x=h+f,g=(m%t+t)%t+(x%t+t)%t*t,p=m+e[2*g]-a,_=x+e[2*g+1]-c,y=p*p+_*_;y<u&&(u=y)}n[r*oe+o]=Math.max(0,1-Math.sqrt(u))}return n}function pp(){if(ii)return ii;let i=Me(1931),t=fp(i,4,5),e=fp(i,16,3),n=nb(i,8);ii=new Uint8Array(oe*oe*4);let s=r=>Math.max(0,Math.min(255,Math.round(r*255)));for(let r=0;r<oe*oe;r++)ii[4*r]=s(.5+t[r]*.72),ii[4*r+1]=s(.5+e[r]*.72),ii[4*r+2]=s(n[r]),ii[4*r+3]=s(i());return ii}function mp(){return vn||(vn=new cn(pp(),oe,oe,Fe),vn.wrapS=vn.wrapT=He,vn.magFilter=We,vn.minFilter=En,vn.generateMipmaps=!0,vn.anisotropy=4,vn.name="env-noise",vn.needsUpdate=!0,vn)}function Xe(i,t,e){let n=ii||pp(),s=t*oe-.5,r=e*oe-.5,o=Math.floor(s),a=Math.floor(r),c=s-o,l=r-a,h=o&oe-1,u=a&oe-1,f=h+1&oe-1,d=u+1&oe-1,m=n[4*(u*oe+h)+i],x=n[4*(u*oe+f)+i],g=n[4*(d*oe+h)+i],p=n[4*(d*oe+f)+i],_=m+(x-m)*c,y=g+(p-g)*c;return(_+(y-_)*l)/255}function Bn(i,t,e,{repeat:n=!0,srgb:s=!0,aniso:r=8}={}){let o=document.createElement("canvas");o.width=i,o.height=t;let a=o.getContext("2d");e(a,i,t);let c=new xn(o);return n&&(c.wrapS=c.wrapT=He),s&&(c.colorSpace=xe),c.anisotropy=r,c}function gp(){return Bn(64,512,(i,t,e)=>{let n=e/6;for(let s=0;s<6;s++){i.fillStyle=s%2?"#eceef0":"#2f86d0",i.fillRect(0,s*n,t,n);let r=i.createLinearGradient(0,s*n,0,(s+1)*n);r.addColorStop(0,"rgba(60,52,40,.10)"),r.addColorStop(.2,"rgba(60,52,40,0)"),r.addColorStop(.8,"rgba(60,52,40,0)"),r.addColorStop(1,"rgba(60,52,40,.12)"),i.fillStyle=r,i.fillRect(0,s*n,t,n),i.fillStyle="rgba(20,22,26,.35)",i.fillRect(0,s*n,t,2)}i.fillStyle="rgba(0,0,0,.10)";for(let s of[.34,.67])i.fillRect(Math.round(s*t),0,2,e);i.fillStyle="rgba(0,0,0,.08)",i.fillRect(0,0,4,e)})}function xp(){return Bn(512,128,(i,t,e)=>{i.fillStyle="#2a2a2a",i.fillRect(0,0,t,e),i.fillStyle="#1b1b1c";for(let r=0;r<t;r+=16)i.beginPath(),i.arc(r+8,e-6,7,0,Math.PI*2),i.arc(r+8,5,6,0,Math.PI*2),i.fill();i.fillStyle="rgba(90,85,75,.55)",i.fillRect(0,0,t,3);let n=t/4;for(let r=0;r<4;r++){i.fillStyle=r%2?"#e9ecee":"#e5772e",i.fillRect(r*n+1,10,n-2,e-24),i.fillStyle="rgba(0,0,0,.13)",i.fillRect(r*n+1,30,n-2,5),i.fillRect(r*n+1,76,n-2,5),i.fillStyle="rgba(40,40,40,.55)";for(let o=0;o<4;o++)for(let a of[32,78])i.fillRect(r*n+10+o*(n/4),a,3,2)}let s=i.createLinearGradient(0,e,0,e-46);s.addColorStop(0,"rgba(98,84,62,.55)"),s.addColorStop(1,"rgba(98,84,62,0)"),i.fillStyle=s,i.fillRect(0,e-46,t,46)})}function _p(i=1){return Bn(256,128,(t,e,n)=>{let s=Me(i);for(let r=0;r<26;r++){let o=e*(.18+s()*.64),a=n*(.45+(s()-.5)*.35),c=18+s()*34,l=t.createRadialGradient(o,a,0,o,a,c);l.addColorStop(0,"rgba(255,255,255,.55)"),l.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=l,t.beginPath(),t.arc(o,a,c,0,Math.PI*2),t.fill()}},{repeat:!1})}function yp(){return Bn(128,128,(i,t,e)=>{let n=i.createRadialGradient(t/2,e/2,4,t/2,e/2,t/2);n.addColorStop(0,"rgba(0,0,0,.55)"),n.addColorStop(.6,"rgba(0,0,0,.22)"),n.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=n,i.fillRect(0,0,t,e)},{repeat:!1,srgb:!1})}function Ra(i=256,t=128,{hx:e=.36,hy:n=.27,rr:s=.12,fade:r=.13,core:o=.45,alpha:a=.8}={}){return Bn(i,t,c=>{let l=c.createImageData(i,t),h=l.data;for(let u=0;u<t;u++)for(let f=0;f<i;f++){let d=Math.abs(f/(i-1)-.5),m=Math.abs(u/(t-1)-.5),x=d-(e-s),g=m-(n-s),p=Math.hypot(Math.max(x,0),Math.max(g,0))+Math.min(Math.max(x,g),0)-s,_=Math.min(1,Math.max(0,1-(p+r*.3)/r));_=_*_*(3-2*_);let y=1-o*Math.min(1,Math.hypot(d/(e+r),m/(n+r))),v=(u*i+f)*4;h[v]=h[v+1]=h[v+2]=0,h[v+3]=Math.round(255*a*_*y)}c.putImageData(l,0,0)},{repeat:!1,srgb:!1})}function vp(){return Bn(4,128,(i,t,e)=>{let n=i.createLinearGradient(0,0,0,e);n.addColorStop(0,"rgba(0,0,0,.5)"),n.addColorStop(.35,"rgba(0,0,0,.2)"),n.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=n,i.fillRect(0,0,t,e)},{repeat:!1,srgb:!1,aniso:1})}function Mp(){return Bn(64,256,(i,t,e)=>{i.fillStyle="#2f86c0",i.fillRect(0,0,t,e);for(let s=0;s<e;s+=8){let r=i.createLinearGradient(0,s,0,s+8);r.addColorStop(0,"rgba(255,255,255,.22)"),r.addColorStop(.45,"rgba(255,255,255,0)"),r.addColorStop(.8,"rgba(0,0,0,.08)"),r.addColorStop(1,"rgba(0,0,0,.25)"),i.fillStyle=r,i.fillRect(0,s,t,8)}let n=Math.round(e*.4)-6;i.fillStyle="#1d2a33";for(let s=3;s<t-6;s+=10)i.fillRect(s,n,7,10);i.fillStyle="rgba(255,255,255,.18)";for(let s=3;s<t-6;s+=10)i.fillRect(s,n,7,2);i.fillStyle="#5c6670",i.fillRect(0,e-6,t,6)})}function Sp(){return Bn(256,128,(i,t,e)=>{let n=i.createLinearGradient(0,0,0,e);n.addColorStop(0,"#9fb3bf"),n.addColorStop(.55,"#6e8592"),n.addColorStop(1,"#4b5d68"),i.fillStyle=n,i.fillRect(0,0,t,e),i.fillStyle="rgba(245,243,238,.85)";for(let s=0;s<t;s+=32)i.fillRect(s,0,3,e);i.fillRect(0,e*.62,t,2),i.fillStyle="rgba(255,255,255,.08)";for(let s=0;s<t;s+=32)i.beginPath(),i.moveTo(s+6,e),i.lineTo(s+18,0),i.lineTo(s+26,0),i.lineTo(s+14,e),i.fill()})}function bp(){return Bn(128,128,(i,t,e)=>{let n=Me(21);for(let s=0;s<110;s++){let r=t*(.08+n()*.84),o=e*(.3+n()*.68),a=(n()-.5)*34,c=.7+n()*.5,l=i.createLinearGradient(0,e,0,e-o);l.addColorStop(0,`rgba(${46*c},${60*c},${28*c},1)`),l.addColorStop(1,`rgba(${150*c},${158*c},${96*c},1)`),i.strokeStyle=l,i.lineWidth=1.2+n()*1.4,i.beginPath(),i.moveTo(r,e),i.quadraticCurveTo(r+a*.3,e-o*.6,r+a,e-o),i.stroke()}},{repeat:!1})}function wp(){return Bn(32,32,(i,t,e)=>{i.strokeStyle="rgba(205,210,212,1)",i.lineWidth=2,i.beginPath();for(let n of[-t,0,t])i.moveTo(n,0),i.lineTo(n+t,e),i.moveTo(n+t,0),i.lineTo(n,e);i.stroke()})}function Ap(i=8,t=512){let e=t,n=e/512,s=n*n,r=Me(97),o=new Float32Array(e*e),a=new Float32Array(e*e),c=new Float32Array(e*e).fill(.3),l=new Float32Array(e*e),h=b=>b&e-1,u=new Float32Array(e),f=b=>{let w=new Float32Array(b);for(let T=0;T<e;T++){let S=T*e;for(let M=0;M<e;M++)u[M]=w[S+h(M-1)]+w[S+M]+w[S+h(M+1)];w.set(u,S)}for(let T=0;T<e;T++){for(let S=0;S<e;S++)u[S]=w[h(S-1)*e+T]+w[S*e+T]+w[h(S+1)*e+T];for(let S=0;S<e;S++)w[S*e+T]=u[S]/9}return w},d=new Int32Array(1024),m=new Float32Array(1024),x=(b,w,T,S=1,M=0)=>{let C=Math.ceil(T*Math.max(1,S))+1,N=Math.cos(M),D=Math.sin(M),I=b%1,B=w%1,U=Math.floor(b),z=Math.floor(w),k=1/(T*T),J=0;for(let j=-C;j<=C;j++)for(let $=-C;$<=C;$++){let Z=$+.5-I,ut=j+.5-B,q=(Z*N+ut*D)/S,it=-Z*D+ut*N,st=(q*q+it*it)*k;st<1&&J<d.length&&(d[J]=h(z+j)*e+h(U+$),m[J++]=st)}return J};for(let b=0;b<e*e;b++)o[b]=.5+(r()-.5)*.55;let g=f(o);for(let b=0;b<e*e;b++)o[b]=.47+(g[b]-.5)*1.3+(r()-.5)*.08;for(let b=0;b<2600*s;b++){let w=(.9+r()*1.4)*n,T=.2+r()*.25,S=x(r()*e,r()*e,w);for(let M=0;M<S;M++)o[d[M]]+=T*(1-m[M]*m[M])}for(let b=0;b<1500*s;b++){let w=(.6+r()*1)*n,T=x(r()*e,r()*e,w);for(let S=0;S<T;S++)o[d[S]]-=.28*(1-m[S])}for(let b=0;b<e*e;b++)a[b]=.5+(r()-.5)*.3;for(let b=0;b<4200*s;b++){let w=(3+r()*7)*n,T=r()*Math.PI*2,S=.22+r()*.65,M=r()*e,C=r()*e;for(let N=0;N<w;N++){let D=h(Math.floor(C))*e+h(Math.floor(M));a[D]=a[D]*.3+S*.7,M+=Math.cos(T),C+=Math.sin(T)}}let p=f(a);for(let b=0;b<e;b++)for(let w=0;w<e;w++){let T=b*e+w,S=Xe(0,w/e,b/e);a[T]=.5+(a[T]*.6+p[T]*.4-.5)*1.1+(S-.5)*.22}for(let b=0;b<3400*s;b++){let w=(1.8+r()*r()*4.2)*n,T=r()<.12?.32+r()*.2:.55+r()*.45,S=.75+r()*.5,M=r()*Math.PI,C=x(r()*e,r()*e,w,S,M);for(let N=0;N<C;N++){let D=Math.sqrt(1-m[N]);c[d[N]]=T*(.82+.18*D),l[d[N]]=D}}let _=new Uint8Array(e*e*4),y=b=>Math.max(0,Math.min(255,Math.round(b*255))),v=[0,0,0,0];for(let b=0;b<e*e;b++){_[4*b]=y(o[b]),_[4*b+1]=y(a[b]),_[4*b+2]=y(c[b]),_[4*b+3]=y(l[b]);for(let w=0;w<4;w++)v[w]+=_[4*b+w]}let A=new cn(_,e,e,Fe);return A.wrapS=A.wrapT=He,A.minFilter=En,A.generateMipmaps=!0,A.anisotropy=i,A.name="env-surface-detail",A.userData.mean=v.map(b=>b/(e*e*255)),A.needsUpdate=!0,A}var Ep=null,kh=()=>Ep||(Ep=new Ae({map:Ra(256,128,{alpha:.75}),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})),ib="fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))))";function Tp(i,t,e){return i.onBeforeCompile=n=>{n.uniforms.envFade=t,n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
uniform float envFade;`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
if (${ib} >= envFade) discard;`)},i.customProgramCacheKey=()=>e,i}function Ca(){let i={value:1},t=Tp(new bt({vertexColors:!0,roughness:.78}),i,"people-body"),e=Tp(new Rr({depthPacking:mh}),i,"people-depth"),n=new Ae({map:kh().map,transparent:!0,depthWrite:!1,opacity:1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});return{body:t,depth:e,contact:n,fade:i,setFade(s){i.value=s,n.opacity=s}}}var Rp={crew:{top:1909031,accent:15282981,legs:5264732,shoes:1316120,hat:1909031},engineer:{top:15526628,accent:15282981,legs:3027512,shoes:1316120,hat:1909031},marshal:{top:15231519,accent:13159632,legs:15231519,shoes:2763306,hat:15231519}},sb=Math.PI/2;function rb(){let i=new Map,t=new Ot;return{add(e,n,s,r){i.has(e)||i.set(e,[]),i.get(e).push({geometry:n,node:s,colour:r})},bake(e,n,s){e.updateMatrixWorld(!0);let r=new Vt;for(let[o,a]of i){r.copy(o.matrixWorld).invert();let c=a.map(({geometry:u,node:f,colour:d})=>{let m=u.clone();m.deleteAttribute("uv"),m.applyMatrix4(new Vt().multiplyMatrices(r,f.matrixWorld)),t.set(d);let x=new Float32Array(m.attributes.position.count*3);for(let g=0;g<x.length;g+=3)x[g]=t.r,x[g+1]=t.g,x[g+2]=t.b;return m.setAttribute("color",new kt(x,3)),m}),l=Ke(c),h=new Et(l,n);h.castShadow=!0,h.receiveShadow=!0,h.customDepthMaterial=s,o.add(h)}}}}var Wr=new Fn(1,14,10),zh=new Fn(1,10,7),Js=new Ie(1,1,1),si=new jt(1,1,1,12),Bh=new Map,$s=(i,t)=>{let e=i.toFixed(3)+"/"+t.toFixed(3);return Bh.has(e)||Bh.set(e,new Xi(i,t,4,10)),Bh.get(e)};function Zt(i,t=0,e=0,n=0,s=0,r=0,o=0,a=1,c=1,l=1){let h=new Ge;return h.position.set(t,e,n),h.rotation.set(s,r,o),h.scale.set(a,c,l),i.add(h),h}var Cp={stand:{hipY:.95,lean:.02,armL:[.08,.1,.18],armR:[-.05,.1,.12],legL:[.04,.02],legR:[-.06,.04]},idle:{hipY:.95,lean:.03,armL:[.25,.12,.6],armR:[-.1,.08,.1],legL:[.1,.05],legR:[-.05,.02]},armsCrossed:{hipY:.95,lean:-.02,armL:[.35,.05,1.9],armR:[.4,.05,1.85],legL:[.06,.02],legR:[-.04,.02]},kneel:{hipY:.55,lean:.45,armL:[1.15,0,.5],armR:[1.05,.05,.6],legL:[1.5,1.55],legR:[-.2,1.9],prop:"gun"},jack:{hipY:.93,lean:.55,armL:[1,.05,.25],armR:[1,.05,.25],reach:{L:[.55,.9,-.17],R:[.55,.9,.17]},legL:[.35,.45],legR:[-.1,.3],prop:"jack"},board:{hipY:.95,lean:0,armL:[.1,.1,.2],armR:[1.9,.1,.3],legL:[.08,.03],legR:[-.06,.03],prop:"board"},tablet:{hipY:.95,lean:.06,armL:[.3,.05,1.45],armR:[.3,.05,1.45],legL:[.05,.02],legR:[-.05,.02],prop:"tablet"},tyre:{hipY:.95,lean:-.05,armL:[.55,.05,.9],armR:[.55,.05,.9],reach:{L:[.36,1.135,-.315],R:[.36,1.135,.315]},legL:[.12,.05],legR:[-.12,.05],prop:"tyre"},carryHelmet:{hipY:.95,lean:.02,armL:[.05,.1,.15],armR:[.25,.12,.35],legL:[.06,.02],legR:[-.06,.02],prop:"helmet"},helmet:{hipY:.95,lean:0,armL:[2.3,.35,1.2],armR:[2.3,.35,1.2],legL:[.04,.02],legR:[-.04,.02]},point:{hipY:.95,lean:.04,armL:[.05,.1,.2],armR:[1.35,.15,.1],legL:[.12,.05],legR:[-.08,.03]}};function Qs({kit:i="crew",skin:t=13081468,head:e="hair",helmet:n=!1,hair:s=2826521,pose:r="stand",moving:o=[],materials:a=Ca()}={}){n&&(e="helmet");let c=typeof i=="string"?Rp[i]||Rp.crew:i,l=Cp[r]||Cp.stand,h=new ae,u=rb(),f=Zt(h,0,l.hipY,0),d=Zt(f,0,0,0,0,0,-l.lean),m=Zt(d,0,.32,0),x=new ae;x.position.set(0,.76,0),d.add(x);let g=S=>{let M=new ae;return M.position.set(0,.56,S*.2),d.add(M),M},p=g(-1),_=g(1);u.add(h,$s(.16,.34),Zt(m,0,0,0,0,0,0,.82,1,1.12),c.top),u.add(h,si,Zt(f,0,.04,0,0,0,0,.15,.12,.19),c.legs),u.add(h,$s(.035,.36),Zt(m,0,.21,0,sb,0,0,1,1,1),c.accent),u.add(h,si,Zt(d,.01,.66,0,0,0,0,.05,.08,.05),t);for(let[S,[M,C]]of[[-1,l.legL],[1,l.legR]]){let N=Zt(f,0,0,S*.1,0,0,M);u.add(h,$s(.075,.3),Zt(N,0,-.225,0),c.legs);let D=Zt(N,0,-.45,0,0,0,-C);u.add(h,$s(.06,.34),Zt(D,0,-.23,0),c.legs);let I=Zt(D,0,-.46,0,0,0,C-M);u.add(h,Js,Zt(I,.06,-.01,0,0,0,0,.26,.08,.1),c.shoes)}let y={},v=h;l.reach&&h.updateMatrixWorld(!0);for(let[S,M,C,N,D]of[[-1,p,l.armL,"armL","L"],[1,_,l.armR,"armR","R"]]){let I=o.includes(N)?M:h,[B,U,z]=l.reach?ub(S,M.worldToLocal(new L(...l.reach[D]))):C,k=Zt(M,0,0,0,-S*U,0,B);u.add(I,$s(.052,.22),Zt(k,0,-.15,0),c.top);let J=Zt(k,0,-Ks,0,0,0,z);u.add(I,$s(.045,.2),Zt(J,0,-.14,0),t);let j=Zt(J,0,-ji,0);u.add(I,zh,Zt(j,0,0,0,0,0,0,.05,.06,.04),t),y[D]=j,S===1&&(v=I)}let A=gb(u,v,l.prop,y,h);u.add(x,Wr,Zt(x,0,0,0,0,0,0,.105,.12,.1),t);let b=null,w=null;if(e==="helmet")u.add(x,Wr,Zt(x,-.01,.01,0,0,0,0,.15,.15,.145),16118766),b=Zt(x,.105,0,0,0,0,0,.06,.05,.1),u.add(x,zh,b,1842721),u.add(x,ob,Zt(x,-.01,.03,0,0,Math.PI/2,0,1,1,1),15282981);else if(u.add(x,Wr,Zt(x,-.012,.03,0,0,0,0,.11,.105,.105),s),(e==="cap"||e==="headset")&&(u.add(x,Wr,Zt(x,-.01,.045,0,0,0,0,.115,.08,.112),c.hat),w=Zt(x,.06,.05,0,0,0,-.12,.1,.012,.09),u.add(x,cb,w,c.hat)),e==="headset"){u.add(x,ab,Zt(x,0,.02,0,0,Math.PI/2,0,1,1,1),1052948);for(let S of[-1,1])u.add(x,si,Zt(x,0,-.01,S*.11,Math.PI/2,0,0,.045,.03,.045),1052948)}u.bake(h,a.body,a.depth);let T=new Et(lb,a.contact);return T.position.set(r==="kneel"?-.1:0,hb,0),T.renderOrder=1,h.add(T),h.userData={hip:d,head:x,armL:p,armR:_,visor:b,brim:w,hands:y,props:A,materials:a},h}var ob=new qi(.135,.012,5,18,Math.PI),ab=new qi(.115,.008,4,16,Math.PI),cb=new jt(1,1,1,12,1,!1,0,Math.PI),lb=new ce(1.1,1.1).rotateX(-Math.PI/2),hb=.008,Ks=.3,ji=.29;function ub(i,t){let e=Math.hypot(t.y,t.z),n=Math.atan2(-t.z,-t.y),s=Math.min(Ks+ji-1e-4,Math.hypot(t.x,e)),r=(s*s-Ks*Ks-ji*ji)/(2*Ks*ji),o=Math.acos(Math.max(-1,Math.min(1,r))),a=Math.atan2(-e,t.x),c=Math.atan2(-(Ks+ji*Math.cos(o)),ji*Math.sin(o));return[a-c,-n/i,o]}var fb={x0:1.03,x1:1.51,top:.13,width:.3,socket:[1.08,.14,0],bar:[.55,.9,0]},js={centre:[.36,.95,0],radius:.33,rim:.215,width:.3},db=(()=>{let{radius:i,rim:t,width:e}=js,n=e/2,s=[[t,-n+.02],[t+.035,-n],[i-.025,-n],[i-.004,-n+.03],[i,0],[i-.004,n-.03],[i-.025,n],[t+.035,n],[t,n-.02]].map(([r,o])=>new ft(r,o));return new Ai(s,18).rotateZ(-Math.PI/2)})(),pb=new jt(js.rim+.005,js.rim+.005,.22,18).rotateZ(-Math.PI/2),mb=new jt(.07,.07,.24,10).rotateZ(-Math.PI/2);function Ip(i,t,e,n,s,r,o){let a=new L(...n),c=new L(...s).sub(a),l=c.length(),h=Zt(e,a.x+c.x/2,a.y+c.y/2,a.z+c.z/2,0,0,0,r,l,r);h.quaternion.setFromUnitVectors(new L(0,1,0),c.normalize()),i.add(t,si,h,o)}function gb(i,t,e,n,s){if(!e)return[];if(e==="gun"){let c=Zt(n.R,0,-.12,0);return i.add(t,Js,Zt(c,0,0,0,0,0,0,.11,.26,.11),2829875),i.add(t,si,Zt(c,0,-.17,0,0,0,0,.04,.09,.04),10133670),i.add(t,Js,Zt(c,.07,.06,0,0,0,0,.05,.1,.05),15282981),[]}s.updateMatrixWorld(!0);let r=n.L.getWorldPosition(new L),o=n.R.getWorldPosition(new L),a=Zt(s,o.x,o.y,o.z);if(e==="board")i.add(t,si,Zt(a,0,.3,0,0,0,0,.015,.7,.015),10133670),i.add(t,si,Zt(a,.01,.75,0,0,0,Math.PI/2,.24,.02,.24),15282981),i.add(t,si,Zt(a,.022,.75,0,0,0,Math.PI/2,.16,.02,.16),16118766);else if(e==="tablet")i.add(t,Js,Zt(a,.02,.05,-.2,0,0,.9,.012,.26,.19),1382170);else if(e==="helmet")i.add(t,Wr,Zt(a,.02,-.12,.05,0,0,0,.15,.15,.145),16118766),i.add(t,zh,Zt(a,.12,-.13,.05,0,0,0,.06,.05,.1),1842721);else if(e==="tyre"){let[c,l,h]=js.centre;i.add(t,db,Zt(s,c,l,h),1579291),i.add(t,pb,Zt(s,c,l,h),9278105),i.add(t,mb,Zt(s,c,l,h),2829875);let u=f=>{let d=Math.hypot(f.y-l,f.z-h);return[f.toArray(),[c,l+(f.y-l)*js.radius/d,h+(f.z-h)*js.radius/d]]};return[{name:"tyre/handL",points:u(r),gap:.07},{name:"tyre/handR",points:u(o),gap:.07}]}else if(e==="jack"){let{x0:c,x1:l,top:h,width:u,socket:f,bar:d}=fb,m=15282981,x=10133670;i.add(s,Js,Zt(s,(c+l)/2,h-.035,0,0,0,0,l-c,.07,u),m),i.add(s,Js,Zt(s,l-.06,h+.005,0,0,0,0,.1,.02,u*.7),2829875);for(let p of[c+.05,l-.05])for(let _ of[-1,1])i.add(s,si,Zt(s,p,.03,_*(u/2-.03),Math.PI/2,0,0,.03,.03,.03),1382170);Ip(i,s,s,f,d,.02,x),Ip(i,s,s,[d[0],d[1],-.24],[d[0],d[1],.24],.018,x);let g=p=>[p.toArray(),[d[0],d[1],Math.max(-.24,Math.min(.24,p.z))]];return[{name:"jack/handL",points:g(r),gap:.05},{name:"jack/handR",points:g(o),gap:.05},{name:"jack/socket",points:[f,[f[0],h,f[2]]],gap:.05}]}return[]}function Vh(i,t,e,n=56,s=36){let r=[],o=[];for(let c=0;c<=n;c++){let l=i+(t-i)*c/n,h=e(l),u=(h.top+h.bottom)/2,f=Math.max(.001,(h.top-h.bottom)/2);for(let d=0;d<=s;d++){let m=-Math.PI/2+Math.PI*2*d/s,x=Math.cos(m),g=Math.sin(m),p=g>=0,_=p?u+f*Math.pow(Math.abs(g),2/h.upperExponent):u-f*Math.pow(Math.abs(g),2/h.lowerExponent),y=h.halfWidth*Math.sign(x)*Math.pow(Math.abs(x),2/(p?h.upperExponent:h.lowerExponent))*(p?1-(h.tumblehome||0)*g*g:1);r.push(l,_,y)}}for(let c=0;c<n;c++)for(let l=0;l<s;l++){let h=c*(s+1)+l,u=h+s+1;o.push(h,u,h+1,h+1,u,u+1)}let a=new se;return a.setAttribute("position",new kt(r,3)),a.setIndex(o),a.computeVertexNormals(),a}var Lp={classic:{length:4.25,wheelbase:2.4,wheelRadius:.31,trackWidth:1.34,tyreWidth:.19,chrome:!0,top:[[-2.13,.56],[-2.05,.7],[-1.7,.8],[-1,.84],[-.3,.86],[.2,.84],[.9,.8],[1.6,.74],[2,.63],[2.13,.5]],sill:[[-2.13,.44],[-2,.3],[-1.6,.22],[1.6,.22],[2,.3],[2.13,.42]],halfWidth:[[-2.13,.5],[-2,.74],[-1.6,.81],[-1.2,.83],[0,.79],[1.2,.83],[1.7,.8],[2.05,.66],[2.13,.44]],upperExponent:2.4,lowerExponent:5,tumblehome:.1,cabin:{x0:-1.05,x1:.6,roof:[[-1.05,.84],[-.62,1.1],[-.15,1.19],[.2,1.17],[.6,.86]],belt:.8,halfWidth:[[-1.05,.6],[-.3,.67],[.3,.67],[.6,.62]]}},gt:{length:4.6,wheelbase:2.7,wheelRadius:.34,trackWidth:1.62,tyreWidth:.3,rearWing:[-2.02,1.3,1.8],top:[[-2.3,.78],[-2.1,.88],[-1.5,.93],[-.8,.9],[0,.86],[.8,.8],[1.5,.7],[2,.57],[2.3,.38]],sill:[[-2.3,.5],[-2.15,.3],[-1.8,.13],[1.8,.13],[2.2,.15],[2.3,.2]],halfWidth:[[-2.3,.8],[-2,.97],[-1.35,1],[-.5,.9],[.5,.88],[1.35,.99],[2,.93],[2.3,.7]],upperExponent:3,lowerExponent:6,tumblehome:.16,cabin:{x0:-1.25,x1:.78,roof:[[-1.25,.9],[-.7,1.19],[-.1,1.24],[.28,1.2],[.78,.84]],belt:.84,halfWidth:[[-1.25,.6],[-.4,.68],[.3,.66],[.78,.58]]}},proto:{length:4.75,wheelbase:2.9,wheelRadius:.35,trackWidth:1.64,tyreWidth:.32,rearWing:[-2.2,1.02,1.9],sharkFin:!0,top:[[-2.37,.8],[-2.2,.92],[-1.7,.95],[-1.2,.9],[-.6,.82],[0,.74],[.8,.7],[1.6,.64],[2.1,.5],[2.37,.3]],sill:[[-2.37,.5],[-2.2,.25],[-1.8,.1],[1.9,.1],[2.37,.15]],halfWidth:[[-2.37,.9],[-2.1,1],[-1.45,1],[-.8,.9],[0,.93],[.8,.93],[1.45,1],[2.1,.95],[2.37,.74]],upperExponent:3.2,lowerExponent:6,tumblehome:.2,cabin:{x0:-1.05,x1:.8,roof:[[-1.05,.8],[-.5,1.08],[0,1.13],[.4,1.07],[.8,.72]],belt:.74,halfWidth:[[-1.05,.38],[-.3,.5],[.3,.5],[.8,.36]]}}},Pp={},Qi=(i,t)=>Pp[i]||(Pp[i]=t());function xb(i){let t=Qi("glass",()=>new bt({color:2766400,roughness:.05,metalness:.85,envMapIntensity:1.6})),e=Qi("dark",()=>new bt({color:789775,roughness:.8,side:_e})),n=Qi("carbon",()=>new bt({color:1711135,roughness:.45,metalness:.4})),s=Qi("chrome",()=>new bt({color:14804456,roughness:.14,metalness:1})),r=Qi("lamp",()=>new bt({color:16184038,roughness:.15,metalness:.2,emissive:6972501,emissiveIntensity:.3})),o=Qi("tyre",()=>new bt({color:1513498,roughness:.92})),a=i?s:Qi("rim",()=>new bt({color:2764081,roughness:.32,metalness:.85}));return{glass:t,dark:e,carbon:n,chrome:s,lamp:r,tyre:o,rim:a}}function _b(i,t){let e=Lp[i],n=new ae,s=new Ws({color:t,roughness:.32,metalness:e.chrome?.2:.35,clearcoat:.8,clearcoatRoughness:.14}),r=xb(e.chrome),o=[e.wheelbase/2,-e.wheelbase/2],a=e.wheelRadius+.07,c=Ti(e.top),l=Ti(e.sill),h=Ti(e.halfWidth),u=M=>{let C=-1;for(let N of o){let D=Math.abs(M-N);D<a&&(C=Math.max(C,e.wheelRadius+Math.sqrt(a*a-D*D)*.97))}return C},f=Vh(e.top[0][0],e.top[e.top.length-1][0],M=>({top:c(M),bottom:Math.min(c(M)-.08,Math.max(l(M),u(M))),halfWidth:h(M),upperExponent:e.upperExponent,lowerExponent:e.lowerExponent,tumblehome:e.tumblehome}),90,40),d=new Et(f,s);d.castShadow=!0,d.receiveShadow=!0,n.add(d);let m=e.cabin,x=Ti(m.roof),g=Ti(m.halfWidth),p=Vh(m.x0,m.x1,M=>({top:x(M),bottom:m.belt-.03,halfWidth:g(M),upperExponent:2.3,lowerExponent:8,tumblehome:.1}),40,32),_=new Et(p,r.glass);_.castShadow=!0,n.add(_);let y=m.x0+(m.x1-m.x0)*.17,v=m.x0+(m.x1-m.x0)*.76,A=Vh(y,v,M=>{let C=Math.min(1,Math.min(M-y,v-M)/.12);return{top:x(M)+.012,bottom:x(M)-.03-.05*C,halfWidth:g(M)*(.84+.14*C),upperExponent:2.6,lowerExponent:3,tumblehome:.1}},24,24),b=new Et(A,s);b.castShadow=!0,n.add(b),yb(n,e,r,o,a);let w=e.top[e.top.length-1][0],T=e.top[0][0];e.chrome?vb(n,r,w,T):Mb(n,e,s,r,w,c);let S=new Et(new ce(e.length*1.2,(e.trackWidth+.7)*1.25),kh());return S.rotation.x=-Math.PI/2,S.position.y=.055,S.renderOrder=1,n.add(S),n}function yb(i,t,e,n,s){for(let r of n){let o=new Et(new jt(s*.98,s*.98,t.trackWidth+t.tyreWidth-.05,24,1,!0,Math.PI*.5,Math.PI),e.dark);o.rotation.x=Math.PI/2,o.position.set(r,t.wheelRadius,0),i.add(o);for(let a of[-1,1]){let c=new ae;c.position.set(r,t.wheelRadius,a*t.trackWidth/2),i.add(c);let l=new Et(new jt(t.wheelRadius,t.wheelRadius,t.tyreWidth,28),e.tyre);l.rotation.x=Math.PI/2,l.castShadow=!0,c.add(l);let h=new Et(new jt(t.wheelRadius*.68,t.wheelRadius*.68,t.tyreWidth+.012,24),e.rim);h.rotation.x=Math.PI/2,c.add(h);let u=new Et(new jt(t.wheelRadius*.22,t.wheelRadius*.26,t.tyreWidth+.03,16),t.chrome?e.chrome:e.dark);u.rotation.x=Math.PI/2,c.add(u)}}}function vb(i,t,e,n){for(let[r,o,a]of[[e-.02,.4,1.36],[n+.02,.44,1.3]]){let c=new Et(new Xi(.045,a,4,10),t.chrome);c.rotation.x=Math.PI/2,c.position.set(r,o,0),c.castShadow=!0,i.add(c)}for(let r of[-1,1]){let o=new Et(new Fn(.085,18,12,0,Math.PI),t.lamp);o.rotation.y=Math.PI/2,o.position.set(e-.14,.6,r*.52),i.add(o);let a=new Et(new qi(.088,.012,6,22),t.chrome);a.rotation.y=Math.PI/2,a.position.set(e-.13,.6,r*.52),i.add(a)}let s=new Et(new Xi(.07,.36,4,10),t.dark);s.rotation.x=Math.PI/2,s.position.set(e-.03,.5,0),i.add(s)}function Mb(i,t,e,n,s,r){let o=new Et(new Ie(.5,.025,1.9),n.carbon);o.position.set(s-.22,.1,0),i.add(o);for(let u of[-1,1]){let f=new Et(new Ie(.18,.035,.36),n.lamp);f.position.set(s-.32,r(s-.32)-.04,u*.62),f.rotation.z=-.35,i.add(f)}let[a,c,l]=t.rearWing,h=new Et(new Ie(.36,.03,l),n.carbon);h.position.set(a,c,0),h.rotation.z=.08,h.castShadow=!0,i.add(h);for(let u of[-1,1]){let f=new Et(new Ie(.44,.22,.015),n.carbon);f.position.set(a,c-.05,u*l/2),i.add(f);let d=new Et(new Ie(.05,c-r(a)+.05,.02),n.carbon);d.position.set(a+.06,(c+r(a))/2,u*.38),i.add(d)}if(t.sharkFin){let u=new Et(new Ie(1.1,.26,.018),e);u.position.set(-1.55,r(-1.55)+.11,0),i.add(u)}}function Dp(i="gt",t=16118766){return _b(Lp[i]?i:"gt",t)}var ue={ground:-.05,gravel:.01,runoff:.016,pitMouth:.02,pitLane:.025,asphalt:.03,kerbInner:.03,kerbOuter:.045,rubber:.036,lines:.042,paint:.048,highlight:.06,paddock:.02,paddockLines:.025};var Sb=new L(0,1,0),bb=[["classic",11740702,-7.3,121.3,.02],["classic",3038539,-7.5,118.1,-.03],["classic",15788760,-7.2,114.9,.01],["gt",1842721,-7.4,111.7,-.02],["classic",9414584,-7.3,108.5,.03],["proto",15282981,-41,141.5,.02],["gt",10200234,-58,141,0],["proto",2833493,-64,120,Math.PI],["classic",9071422,-74,126,1.5],["gt",16118766,26,108,Math.PI-.05]],Np=[["gunnerFront",{pose:"kneel",head:"cap",moving:["armR"],skin:13081468},{f:1.35,r:-1.5,face:"right"}],["gunnerRear",{pose:"kneel",head:"hair",moving:["armR"],skin:9263934},{f:-1.3,r:-1.5,face:"right"}],["jack",{pose:"jack",head:"cap",skin:13805962},{f:3.95,r:0,face:"car"}],["board",{pose:"board",head:"headset",skin:11896166},{f:3.4,r:1.3,face:"car",yaw:.3}],["tyre",{pose:"tyre",head:"cap",skin:14727318},{f:-2.9,r:-2.5,face:"car",yaw:-.4}],["helmet",{pose:"carryHelmet",head:"hair",skin:12159596,hair:7031342},{f:-3.6,r:1.6,face:"left",yaw:.4}],["engineer",{kit:"engineer",pose:"tablet",head:"headset",skin:13213568},{garage:[1.9,-1.4],face:"car"}],["mechanic",{pose:"armsCrossed",head:"cap",skin:11040346},{garage:[-1.6,-6.5],face:"car",yaw:.25}]];function Up(){let i=Ca(),t={};return{members:Np.map(([n,s])=>t[n]=Qs({...s,materials:i})),byName:t,materials:i,placed:!1}}function Fp(i){for(let[t,e,n,s,r]of bb){let o=Dp(t,e);o.position.set(n,ue.paddock,s),o.rotation.y=r,i.add(o)}}function Op(i){let t=Ca(),e=(s,r,o=2829099)=>({top:s,accent:s,legs:r,shoes:o,hat:2831424}),n=[[Qs({kit:e(3821419,3424335),skin:13738883,materials:t}),-3.7,119.9,Math.PI+.25],[Qs({kit:e(15131094,11773322,7035464),skin:10251086,pose:"point",head:"cap",materials:t}),-3.3,118.8,Math.PI-.5],[Qs({kit:e(7036234,2829099),skin:13081468,pose:"armsCrossed",materials:t}),-11.8,113.6,.3],[Qs({kit:"marshal",skin:12159596,pose:"idle",head:"cap",materials:t}),-18.5,130.2,-.6]];for(let[s,r,o,a]of n)s.position.set(r,ue.paddock,o),s.rotation.y=a,s.userData.group=t,i.add(s);return n}var Hh=new L,Gh=new L,Wh=new L,Ia=new L,wb=(i,t)=>Math.atan2(-t,i);function Ab(i,t,e,n){let s=t.sample(e);Hh.copy(s.p),Gh.set(s.t.x,0,s.t.z).normalize(),Wh.crossVectors(Gh,Sb),Np.forEach(([r,,o])=>{let a=i.byName[r];o.garage?a.position.set(n.x+o.garage[0],n.floorY??0,n.z+o.garage[1]):a.position.copy(Hh).addScaledVector(Gh,o.f).addScaledVector(Wh,o.r).setY(ue.pitLane),o.face==="car"?Ia.subVectors(Hh,a.position).setY(0):Ia.copy(Wh).multiplyScalar(o.face==="left"?-1:1),a.rotation.y=wb(Ia.x,Ia.z)+(o.yaw||0),a.userData.baseYaw=a.rotation.y}),i.placed=!0}function Bp(i,t,e,n,s,r){let o=1-Pe(Bt(Math.abs(t-.26)/.1-.6,0,1)),a=o>.002;for(let d=0;d<i.members.length;d++)i.members[d].visible=a;if(i.materials.setFade(o),!a)return;i.placed||Ab(i,n,s,r);let{gunnerFront:c,gunnerRear:l,helmet:h,engineer:u,board:f}=i.byName;c.userData.armR.rotation.z=Math.sin(e*2.4)*.08,l.userData.armR.rotation.z=Math.sin(e*2.1+1.3)*.07,h.userData.head.rotation.y=Math.sin(e*.7)*.25,u.userData.head.rotation.y=-.15+Math.sin(e*.45)*.2,f.userData.head.rotation.y=Math.sin(e*.9+.5)*.12}function zp(i,t,e){let n=Pe(Bt((t-.6)/.04,0,1))*(1-Pe(Bt((t-.84)/.03,0,1))),s=n>.002;for(let r=0;r<i.length;r++)i[r][0].visible=s;i.length&&(i[0][0].userData.group.setFade(n),s&&(i[0][0].userData.head.rotation.y=Math.sin(e*.5)*.2,i[3][0].userData.head.rotation.y=Math.sin(e*.3)*.5))}var kp=new L(0,1,0),Xh=140,Yh=3300,Eb=900,Ci=70,Tb=1100,Hp=.0356,Gp=.04,Rb=60,Cb=2.5,Ib=1600,Pb=160,Lb=40,Vp=16;function Db(i,t){return t==="high"&&i.capabilities.maxTextureSize>=8192?4096:2048}var Nb=3.84,Ub=.9,Fb=.8,Ob=1.1,Bb=.6,zb=.75;function Wp(i){return i.sunI*Math.max(.03,i.sunDir.y)+Ob*i.env+Bb*i.hemiI}function kb(i){return i.exp*Ub*Math.pow(Nb/Wp(i),Fb)}function Xp(i,t,e){let n=new aa(16777215,4210752,.5);i.add(n);let s=new ha(16777215,3);return s.castShadow=t.shadowMap.enabled,s.shadow.mapSize.setScalar(Db(t,e)),Object.assign(s.shadow.camera,{left:-Ci,right:Ci,top:Ci,bottom:-Ci,near:1,far:400}),s.shadow.camera.updateProjectionMatrix(),s.shadow.bias=-Hp/399,s.shadow.normalBias=Gp,i.add(s,s.target),{hemi:n,sun:s}}function Yp(i,{sun:t,hemi:e,scene:n,renderer:s}){t.color.copy(i.sun),t.intensity=i.sunI,e.intensity=1,e.color.copy(i.sky).multiplyScalar(i.hemiI),e.groundColor.copy(i.gnd).multiplyScalar(zb*Wp(i)),n.fog.color.copy(i.fog).convertSRGBToLinear(),n.environmentIntensity=i.env,s.toneMappingExposure=kb(i)}function qp(i,t){let e=Math.max(0,t)/Eb,n=e>1e-4?e/-Math.expm1(-e):1+e/2;i.near=Xh*n,i.far=Yh*n}function Zp(i){let t=i.shadow.camera,e=i.shadow.mapSize.x,n=new L,s=new L,r=new L,o=new L,a=[[-1,-1],[1,-1],[-1,1],[1,1]],c={halfExtent:Ci,update:p},l,h,u,f,d,m;function x(_,y,v){let A=_*n.x+y*n.y+v*n.z,b=_*s.x+y*s.y+v*s.z,w=_*g.x+y*g.y+v*g.z;A<l&&(l=A),A>h&&(h=A),b<u&&(u=b),b>f&&(f=b),w<d&&(d=w),w>m&&(m=w)}let g=kp;function p(_,y,v){g=_,n.crossVectors(kp,_),n.lengthSq()<1e-8&&n.set(1,0,0),n.normalize(),s.crossVectors(_,n).normalize(),l=u=d=1/0,h=f=m=-1/0;let A=y.position,b=Math.max(0,A.y),w=Math.min(Ib,Rb+Cb*b);x(A.x,0,A.z),x(v.x,Math.min(v.y,0),v.z);let T=y.projectionMatrix.elements,S=y.matrixWorld.elements;for(let $=0;$<4;$++){let Z=(a[$][0]+T[8])/T[0],ut=(a[$][1]+T[9])/T[5];r.set(S[0]*Z+S[4]*ut-S[8],S[1]*Z+S[5]*ut-S[9],S[2]*Z+S[6]*ut-S[10]);let q=Math.hypot(r.x,r.z)||1e-6,it=w/q;r.y<0&&(it=Math.min(it,b/-r.y)),x(A.x+r.x*it,Math.max(0,A.y+r.y*it),A.z+r.z*it)}let M=.5*Math.max(h-l,f-u)*1.04,C=Math.ceil(Math.log2(Math.max(1,M/Ci))*Vp),N=Math.min(Tb,Ci*Math.pow(2,C/Vp)),D=2*N/e,I=Math.round((l+h)/2/D)*D,B=Math.round((u+f)/2/D)*D,U=(d+m)/2;o.set(0,0,0).addScaledVector(n,I).addScaledVector(s,B).addScaledVector(_,U);let z=(m-d)/2,k=z+Pb;i.position.copy(o).addScaledVector(_,k),i.target.position.copy(o);let J=k+z+Lb;(N!==t.right||J!==t.far)&&(t.left=t.bottom=-N,t.right=t.top=N,t.near=1,t.far=J,t.updateProjectionMatrix());let j=N/Ci;i.shadow.bias=-(Hp*j)/(J-1),i.shadow.normalBias=Gp*j,c.halfExtent=N}return c}var $p=1,Vb=.35,Hb=.008,Gb=.06,Wb=10,qh=[.43,.45],Zh=[.6,.635],$h=[6,14],Xb=.002;function Jp(i){i.traverse(t=>{t.isMesh&&!t.userData.noMask&&t.layers.enable($p)})}function Kp(i){if(i!=="high")return null;try{let t=new gn(4,4,{type:ni,samples:4,colorSpace:xe});t.isXRRenderTarget=!0,t.depthTexture=new Hs(4,4);let e=new gn(4,4),n=new an({depthTest:!1,depthWrite:!1,toneMapped:!1,defines:{TAPS:Wb},uniforms:{tColor:{value:t.texture},tDepth:{value:t.depthTexture},tMask:{value:e.texture},uInvVP:{value:new Vt},uPrevVP:{value:new Vt},uAmt:{value:0},uMaxLen:{value:Hb},uAspect:{value:1},uNearFar:{value:new ft(.3,9e3)},uDepthTolerance:{value:Gb}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }",fragmentShader:`uniform sampler2D tColor, tDepth, tMask; uniform mat4 uInvVP, uPrevVP;
          uniform float uAmt, uMaxLen, uAspect, uDepthTolerance; uniform vec2 uNearFar; varying vec2 vUv;
          // view distance of a depth-buffer value (perspective projection)
          float viewDepth(float d) {
            float n = uNearFar.x, f = uNearFar.y;
            return (n * f) / (f - d * (f - n));
          }
          void main() {
            float d = texture2D(tDepth, vUv).x;
            vec3 base = texture2D(tColor, vUv).rgb;
            float mask = texture2D(tMask, vUv).r;
            vec4 wp = uInvVP * vec4(vUv * 2. - 1., d * 2. - 1., 1.); wp /= wp.w;
            vec4 pp = uPrevVP * wp; vec2 prevUv = pp.xy / pp.w * .5 + .5;
            vec2 vel = (vUv - prevUv) * uAmt * (1. - mask);
            // cap the length, measured in image widths
            vec2 inWidths = vec2(vel.x, vel.y / uAspect);
            float len = length(inWidths);
            if (len > uMaxLen) vel *= uMaxLen / len;
            vec3 acc = base; float wsum = 1.;
            if (len > 1e-5 && d < .99999) {
              float z = viewDepth(d);
              float jitter = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(.06711056, .00583715))));
              for (int i = 0; i < TAPS; i++) {
                vec2 uv = vUv + vel * ((float(i) + jitter) / float(TAPS) - .5);
                float tapDepth = texture2D(tDepth, uv).x;
                float dz = abs(viewDepth(tapDepth) - z) / z;
                float w = (1. - texture2D(tMask, uv).r) * mix(1., .1, smoothstep(uDepthTolerance * .5, uDepthTolerance, dz));
                acc += texture2D(tColor, uv).rgb * w; wsum += w;
              }
            }
            // the frame is already dithered; averaging smooths that out, so blurred pixels get it back
            float noise = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - .5;
            gl_FragColor = vec4(acc / wsum + noise * clamp(len * 400., 0., 1.) / 255., 1.);
          }`}),s=new Et(new ce(2,2),n);s.frustumCulled=!1;let r=new bi;return r.add(s),{rt:t,maskRT:e,mat:n,pScene:r,pCam:new ks(-1,1,1,-1,0,1),maskMat:new Ae({color:16777215,fog:!1}),vp:new Vt,prev:new Vt,hasPrev:!1,size:new ft,clearColor:new Ot,ok:!0}}catch{return null}}function ts(i){i&&(i.hasPrev=!1)}function jp(i,t,e){if(!i)return 0;let n=Pe(Bt((t-qh[0])/(qh[1]-qh[0]),0,1))*(1-Pe(Bt((t-Zh[0])/(Zh[1]-Zh[0]),0,1))),s=1-Pe(Bt((e-$h[0])/($h[1]-$h[0]),0,1));return n*s}function Qp(i,t,e,n,s){if(e.updateMatrixWorld(),n&&(n.vp.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.hasPrev||n.prev.copy(n.vp)),s>Xb&&n&&n.ok)try{i.getDrawingBufferSize(n.size);let r=n.size.x,o=n.size.y;(n.rt.width!==r||n.rt.height!==o)&&(n.rt.setSize(r,o),n.maskRT.setSize(r,o)),i.setRenderTarget(n.rt),i.render(t,e);let a=i.shadowMap.autoUpdate;i.shadowMap.autoUpdate=!1;let c=t.overrideMaterial,l=i.getClearAlpha();i.getClearColor(n.clearColor),t.overrideMaterial=n.maskMat,e.layers.set($p),i.setRenderTarget(n.maskRT),i.setClearColor(0,1),i.clear(),i.render(t,e),e.layers.set(0),t.overrideMaterial=c,i.setClearColor(n.clearColor,l),i.shadowMap.autoUpdate=a;let h=n.mat.uniforms;h.uInvVP.value.copy(n.vp).invert(),h.uPrevVP.value.copy(n.prev),h.uAmt.value=s*Vb,h.uAspect.value=r/o,h.uNearFar.value.set(e.near,e.far),i.setRenderTarget(null),i.render(n.pScene,n.pCam)}catch{n.ok=!1,i.setRenderTarget(null),i.render(t,e)}else i.render(t,e);n&&(n.prev.copy(n.vp),n.hasPrev=!0)}var tm=[0,.2,.425,.665,.885],Yb=.26,qb=2.6,Zb=.01,$b=2.5;function Jb(i,t,e,n){let s=2/Yb,r=s*n,o=1/(1+r+.48*r*r+.235*r*r*r),a=t-e,c=(i.velocity+s*a)*n;i.velocity=(i.velocity-s*c)*o;let l=e+(a+c)*o;return e-t>0==l>e&&(l=e,i.velocity=0),l}function em(){let i={target:0,value:0,velocity:0,intro:0,introDone:!1,advance(t,e=!1){if(!i.introDone){let n=i.target>Zb?$b:1;i.intro+=t*n/qb,i.intro>=1&&i.finishIntro()}i.value=Jb(i,i.value,i.target,t),e&&(i.value=i.target,i.velocity=0)},finishIntro(){i.intro=1,i.introDone=!0},get introEase(){return md(Bt(i.intro,0,1))}};return i}function nm(i){return i==="high"?2:i==="mid"?1.75:1}function im(i,t){let e=new Ko({canvas:i,antialias:t!=="low",powerPreference:"high-performance",alpha:!1});return e.setPixelRatio(1),e.toneMapping=ch,e.outputColorSpace=xe,e.shadowMap.enabled=t!=="low",e.shadowMap.type=ah,e}function sm(i,t,e,n){let s=0,r=0,o=0,a=0,c=0,l=0,h=1,u=typeof ResizeObserver=="function"?new ResizeObserver(d=>{for(let m of d){s=m.contentRect.width,r=m.contentRect.height;let x=m.devicePixelContentBoxSize&&m.devicePixelContentBoxSize[0];o=x?x.inlineSize:0,a=x?x.blockSize:0}}):null;if(u)try{u.observe(i,{box:"device-pixel-content-box"})}catch{u.observe(i)}function f(){if(!u||!s){let p=i.getBoundingClientRect();s=p.width,r=p.height}let d=window.devicePixelRatio||1,m=Math.min(d,n)*h,x,g;return o&&m>=d-.001&&Math.abs(o-s*d)<=2&&Math.abs(a-r*d)<=2?(x=o,g=a):(x=Math.max(1,Math.round(s*m)),g=Math.max(1,Math.round(r*m))),x===c&&g===l?!1:(c=x,l=g,t.setSize(c,l,!1),e.aspect=c/l,e.updateProjectionMatrix(),!0)}return{update:f,get width(){return c},get height(){return l},get resScale(){return h},set resScale(d){h=d}}}var Kb=["map","normalMap","roughnessMap","metalnessMap","aoMap","bumpMap","alphaMap"];function rm(i,t,e){let n=Math.min(e==="high"?16:e==="mid"?8:2,t.capabilities.getMaxAnisotropy());n>1&&i.traverse(s=>{if(s.material)for(let r of[].concat(s.material))for(let o of Kb){let a=r[o];a&&a.isTexture&&!a.isRenderTargetTexture&&a.anisotropy<n&&(a.anisotropy=n,a.needsUpdate=!0)}})}function om(i){i.traverse(t=>{if(t.material)for(let e of[].concat(t.material))(e.isMeshStandardMaterial||e.isMeshBasicMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial)&&(e.dithering=!0)})}var um=38.75,fm=18.8,jb=.911,Qb=-.417,tw=.416,ew=.909,nw=[[0,6.75],[.085,6.9],[.2,7.4],[.315,7.8],[.425,9.6],[.56,10.4],[.665,14.6],[.79,15.4],[.885,18.25],[1,18.62]],iw=Ti(nw);function Pa(i){return iw(Bt(i,0,1))}var ri=Math.PI/180,am=Math.sin(um*ri),cm=Math.cos(um*ri),lm=Math.sin(fm*ri),sw=Math.cos(fm*ri);function rw(i,t){let e=(i-12)*15*ri,n=am*lm+cm*sw*Math.cos(e),s=Math.asin(Bt(n,-1,1)),r=Bt((lm-n*am)/(Math.cos(s)*cm),-1,1),o=Math.acos(r)/ri;return t.sunEl=s/ri,t.sunAz=e>0?360-o:o,t}function ow(i,t,e){let n=i*ri,s=t*ri,r=Math.cos(n),o=Math.cos(s)*r,a=Math.sin(s)*r;return e.set(o*jb+a*tw,Math.sin(n),o*Qb+a*ew).normalize()}var Xr=[{hour:6.75,sun:16773340,sunI:3.3,sky:12178414,gnd:6122060,hemiI:.4,zen:5343957,hor:9751025,env:.6,exp:1.35,lift:.06},{hour:8,sun:16774632,sunI:3.5,sky:12375534,gnd:6253390,hemiI:.4,zen:5080787,hor:10341873,env:.6,exp:1.12,lift:.06},{hour:10.5,sun:16775922,sunI:3.7,sky:12769518,gnd:6384720,hemiI:.4,zen:4883152,hor:11129584,env:.6,exp:1,lift:.05},{hour:15,sun:16774114,sunI:3.6,sky:12900072,gnd:6318671,hemiI:.4,zen:5277133,hor:11325418,env:.6,exp:1,lift:.07},{hour:17.6,sun:16765594,sunI:3.4,sky:13815238,gnd:6184777,hemiI:.4,zen:6391234,hor:14665634,env:.6,exp:1.1,lift:.18},{hour:18.62,sun:16754260,sunI:3.2,sky:15123360,gnd:6050884,hemiI:.4,zen:7245760,hor:15906162,env:.6,exp:1.25,lift:.3}],Jh=["sun","sky","gnd","zen","hor"],dm=["sunI","hemiI","env","exp","lift"],aw=new Set(["zen","hor"]),hm=Xr.map(i=>{let t={};for(let e of Jh)t[e]=aw.has(e)?new Ot().setHex(i[e],Ei):new Ot().setHex(i[e]);return t});function La(){let i={hour:0,sunEl:0,sunAz:0,sunDir:new L,fog:new Ot};for(let t of Jh)i[t]=new Ot;for(let t of dm)i[t]=0;return i}function Da(i,t){t.hour=i,rw(i,t),ow(t.sunEl,t.sunAz,t.sunDir);let e=0;for(;e<Xr.length-2&&i>Xr[e+1].hour;)e++;let n=Xr[e],s=Xr[e+1],r=Pe(Bt((i-n.hour)/(s.hour-n.hour),0,1));for(let o of dm)t[o]=n[o]+(s[o]-n[o])*r;for(let o of Jh)t[o].copy(hm[e][o]).lerp(hm[e+1][o],r);return t.fog.copy(t.hor),t}var cw=8e3,pm=.2,lw=.75;function Kh(){return new an({side:$e,depthWrite:!1,fog:!1,uniforms:{zen:{value:new Ot},hor:{value:new Ot},sunDir:{value:new L(0,1,0)},sunCol:{value:new Ot},lift:{value:0},dither:{value:1}},vertexShader:"varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",fragmentShader:`uniform vec3 zen, hor, sunCol; uniform vec3 sunDir; uniform float lift, dither; varying vec3 vP;
      void main(){ vec3 p = normalize(vP); float h = clamp(p.y, -.2, 1.); float k = pow(clamp(h, 0., 1.), .55);
        vec3 c = mix(hor, zen, k);
        c += lift * 4. * k * (1. - k) * (vec3(1.) - c);
        float s = max(dot(p, sunDir), 0.);
        c += sunCol * (pow(s, 380.) * 2.2 + pow(s, 12.) * .16 + pow(s, 3.) * .05 * (1. - k));
        c = mix(c, hor * .92, smoothstep(0., -.2, p.y));
        gl_FragColor = vec4(c + dither * (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - .5) / 255., 1.);
      }`})}function mm(i){return new Et(new Fn(cw,32,16),i)}function gm(i,t){let e=i.uniforms;e.zen.value.copy(t.zen),e.hor.value.copy(t.hor),e.sunDir.value.copy(t.sunDir),e.sunCol.value.copy(t.sun).convertLinearToSRGB(),e.lift.value=t.lift}function xm({renderer:i,scene:t,quality:e}){let n=new Vs(i),s=new bi,r=Kh();r.uniforms.dither.value=0,s.add(new Et(new Fn(100,32,16),r));let o=new Ae({color:5595212}),a=new Et(new ei(90,32),o);a.rotation.x=-Math.PI/2,a.position.y=-8,s.add(a);let c=new Er(e==="high"?256:128,{type:ni,generateMipmaps:!1}),l=new Ar(.1,200,c),h=La(),u=null,f=NaN;function d(x){Da(x,h);let g=r.uniforms;g.zen.value.copy(h.zen).convertSRGBToLinear(),g.hor.value.copy(h.hor).convertSRGBToLinear(),g.sunDir.value.copy(h.sunDir),g.sunCol.value.copy(h.sun),g.lift.value=h.lift;let p=(h.sunI*Math.max(0,h.sunDir.y)+h.hemiI)/Math.PI;o.color.copy(h.gnd).multiplyScalar(lw*p),l.update(i,s),u=n.fromCubemap(c.texture,u),t.environment=u.texture}function m(x){let g=Math.round(x/pm);return g===f?!1:(f=g,d(g*pm),!0)}return{update:m,get step(){return f}}}var hw=15282981,uw=1,Qh=4.5,fw=.006,dw=3,pw=1.5,vm=30,mw=50,jh=.334,gw=.388,xw=.008,_m=.39,_w=.408,yw=.9,ym=.15,vw=`attribute float aSide;
attribute float aArc;
attribute vec2 aAcross;
uniform float uWidth;
uniform float uMaxWidth;
uniform float uMinPixels;
uniform vec2 uViewport;
varying float vArc;
varying float vSidePixels;
varying float vHalfPixels;
`,Mw=`#include <begin_vertex>
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
}`,Sw=`uniform float uHead;
uniform float uFeather;
varying float vArc;
varying float vSidePixels;
varying float vHalfPixels;
`,bw=`#include <color_fragment>
diffuseColor.a *= 1.0 - smoothstep(uHead - uFeather, uHead, vArc);
diffuseColor.a *= clamp(vHalfPixels - abs(vSidePixels), 0.0, 1.0);`;function ww(i){let{line:t}=i,e=t.count,n=new Float32Array((e+1)*6),s=new Float32Array((e+1)*4),r=new Float32Array((e+1)*2),o=new Float32Array((e+1)*2),a=new Float32Array((e+1)*6);for(let h=0;h<=e;h++){let u=h%e;for(let[f,d]of[[0,1],[1,-1]]){let m=2*h+f;n.set([t.x[u]+t.nx[u]*d*Qh*.5,ue.highlight,t.z[u]+t.nz[u]*d*Qh*.5],m*3),s.set([t.nx[u],t.nz[u]],m*2),r[m]=d,o[m]=h*t.spacing/t.length,a[m*3+1]=1}}let c=[];for(let h=0;h<e;h++)c.push(2*h,2*h+2,2*h+1,2*h+1,2*h+2,2*h+3);let l=new se;return l.setAttribute("position",new kt(n,3)),l.setAttribute("normal",new kt(a,3)),l.setAttribute("aAcross",new kt(s,2)),l.setAttribute("aSide",new kt(r,1)),l.setAttribute("aArc",new kt(o,1)),l.setIndex(c),l.computeBoundingSphere(),l.boundingSphere.radius+=vm,l}function Mm(i){let t={uHead:{value:0},uFeather:{value:mw/i.line.length},uWidth:{value:Qh},uMaxWidth:{value:vm},uMinPixels:{value:3},uViewport:{value:new ft(1,1)}},e=new Ae({color:hw,transparent:!0,opacity:0,depthWrite:!1,fog:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4});e.onBeforeCompile=c=>{Object.assign(c.uniforms,t),c.vertexShader=vw+c.vertexShader.replace("#include <begin_vertex>",Mw),c.fragmentShader=Sw+c.fragmentShader.replace("#include <color_fragment>",bw)};let n=new Et(ww(i),e);n.name="track-highlight",n.renderOrder=2;let s=new ee,r=1;n.onBeforeRender=c=>{c.getCurrentViewport(s),t.uViewport.value.set(s.z,s.w),t.uMinPixels.value=Math.max(fw*Math.min(s.z,s.w),dw*r,pw)};let o=0,a=0;return{mesh:n,update(c,l,h=!1,u=1){r=u;let f=Pe(Bt((c-jh)/(gw-jh),0,1));if(h||!(l>0))o=a=f;else{let x=o,g=yw*l;o=f>o?Math.min(f,o+g):Math.max(f,o-g);let p=(o-x)/l,_=Math.exp(-l/ym);a=o-p*ym*(1-_)+(a-x)*_}let d=Bt((c-jh)/xw,0,1),m=1-Pe(Bt((c-_m)/(_w-_m),0,1));e.opacity=d*m*uw*Math.min(1,a*40),n.visible=e.opacity>.01,t.uHead.value=a*(1+t.uFeather.value)}}}var Yr=[.42,.7],Aw=1.9;function Mn(i,t=1){let e=new Ot(i);return`vec3(${(e.r*t).toFixed(4)}, ${(e.g*t).toFixed(4)}, ${(e.b*t).toFixed(4)})`}var Ew=`
varying vec3 vEnvPos;
varying vec2 vEnvUv;
`,Tw=`
{
  vec4 envWorld = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    envWorld = instanceMatrix * envWorld;
  #endif
  vEnvPos = (modelMatrix * envWorld).xyz;
  vEnvUv = uv;
}
`,Rw=`
uniform sampler2D envNoise;
uniform sampler2D envDetail;
uniform vec4 envDetailMean;
varying vec3 vEnvPos;
varying vec2 vEnvUv;
float envHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
/* tiling texture without visible repetition: two offset lookups chosen and blended by a slow noise */
vec4 envNoTile(sampler2D tex, vec2 uv, float variation) {
  float k = texture(envNoise, uv * variation).r;
  vec2 dx = dFdx(uv);
  vec2 dy = dFdy(uv);
  float l = k * 8.0;
  float f = fract(l);
  float ia = floor(l);
  vec2 offa = sin(vec2(3.0, 7.0) * ia);
  vec2 offb = sin(vec2(3.0, 7.0) * (ia + 1.0));
  vec4 ca = textureGrad(tex, uv + offa, dx, dy);
  vec4 cb = textureGrad(tex, uv + offb, dx, dy);
  float w = smoothstep(0.2, 0.8, f - 0.1 * dot(ca - cb, vec4(1.0)));
  // a blend of two independent samples deviates less from the image's mean than either, by
  // sqrt((1 - w)^2 + w^2) (0.71 at w = 0.5): scale the deviation back
  return envDetailMean + (mix(ca, cb, w) - envDetailMean) * inversesqrt((1.0 - w) * (1.0 - w) + w * w);
}
/* the noise image's fbm channels (r, g: mean 0.5, deviation 0.09) as zero-mean, unit deviation */
float envUnit(float v) { return (v - 0.5) * 11.0; }
/* blend of two independent detail values (channel mean m) that keeps their contrast (envNoTile) */
float envMix(float a, float b, float w, float m) {
  return m + (mix(a, b, w) - m) * inversesqrt((1.0 - w) * (1.0 - w) + w * w);
}
/* derivative bump mapping (Mikkelsen 2010): perturbs the view-space normal by height h */
vec3 envBump(vec3 surfPos, vec3 surfNorm, float h, float strength) {
  vec3 dpx = dFdx(surfPos);
  vec3 dpy = dFdy(surfPos);
  vec3 r1 = cross(dpy, surfNorm);
  vec3 r2 = cross(surfNorm, dpx);
  float det = dot(dpx, r1);
  vec3 grad = sign(det) * (dFdx(h) * r1 + dFdy(h) * r2);
  return normalize(abs(det) * surfNorm - strength * grad);
}
`,tr=null;function Cw(i){return tr||(tr={envNoise:{value:mp()},envDetail:{value:null},envDetailMean:{value:new ee}}),tr.envDetail.value!==i&&(tr.envDetail.value=i,tr.envDetailMean.value.fromArray(i.userData.mean||[.5,.5,.5,.5])),tr}function Cn(i,t,e,{uniforms:n={},fragmentHead:s="",fragment:r={},vertex:o={}}){let a={...Cw(e),...n};return i.userData.uniforms=a,i.onBeforeCompile=c=>{Object.assign(c.uniforms,a);let l=c.vertexShader.replace("#include <common>",`#include <common>
`+Ew+(o.head||"")).replace("#include <project_vertex>",`#include <project_vertex>
`+Tw);for(let[u,f]of Object.entries(o))u!=="head"&&(l=l.replace(`#include <${u}>`,f));let h=c.fragmentShader.replace("#include <common>",`#include <common>
`+Rw+s);for(let[u,f]of Object.entries(r))h=h.replace(`#include <${u}>`,f);c.vertexShader=l,c.fragmentShader=h},i.customProgramCacheKey=()=>"env-"+t,i.needsUpdate=!0,i}var bm="(1.0 - smoothstep(6.0, 40.0, length(vViewPosition)))";function Iw(i,t){i.map=null,i.color.set(16777215);let e=new cn(new Uint8Array(4),1,1,Fe);return e.needsUpdate=!0,Cn(i,"grass",t,{uniforms:{envCanopy:{value:e},envCanopyBounds:{value:new ee(0,0,1,1)}},fragmentHead:`uniform sampler2D envCanopy;
uniform vec4 envCanopyBounds;
`,fragment:{map_fragment:`
      {
        vec2 p = vEnvPos.xz;
        float broad = texture(envNoise, p / 1730.0 + vec2(0.31, 0.77)).r;
        float mid = texture(envNoise, p / 523.0).r;
        float small = texture(envNoise, p / 151.0 + 0.5).g;
        float clump = texture(envNoise, p / 230.0 + 0.6).g;
        float dry = smoothstep(${Yr[0]}, ${Yr[1]}, broad * 0.45 + mid * 0.35 + small * 0.2);
        vec3 col = mix(${Mn(6254900)}, ${Mn(10259294)}, dry);
        col = mix(col, ${Mn(5070382)}, smoothstep(0.55, 0.8, clump) * (1.0 - dry) * 0.7);
        col = mix(col, ${Mn(12101752)}, smoothstep(0.62, 0.9, small) * dry * 0.55);
        float soil = smoothstep(0.72, 0.85, texture(envNoise, p / 410.0 + 0.2).g) * smoothstep(0.45, 0.75, dry);
        col = mix(col, ${Mn(11771004)}, soil * 0.65);
        // blades at three scales (5 mm, 18 mm and 5 cm per texel): the coarsest keeps a grain a
        // pixel or two wide in the middle distance, where the finer ones have averaged out
        float d1 = envNoTile(envDetail, p / 2.7, 0.05).g;
        float d2 = envNoTile(envDetail, p / 9.1 + 0.37, 0.02).g;
        float d3 = envNoTile(envDetail, p / 26.0 + 0.61, 0.008).g;
        float blades = envMix(envMix(d1, d2, 0.4, envDetailMean.g), d3, 0.35, envDetailMean.g);
        // tufts and bare gaps at 0.15-0.4 m (cellular clumps), then mottling at 1-5 m: tussocks and
        // thin patches, visible where the blade detail has blurred out
        float tufts = texture(envNoise, p / 3.1 + 0.2).b * 0.6 + texture(envNoise, p / 1.3 + 0.7).b * 0.4;
        float tussock = envUnit(texture(envNoise, p / 14.0).g) * 0.8 + envUnit(texture(envNoise, p / 43.0 + 0.3).r) * 0.6;
        float canopy = texture(envCanopy, (p - envCanopyBounds.xy) / (envCanopyBounds.zw - envCanopyBounds.xy)).r;
        diffuseColor.rgb *= col * ${Aw.toFixed(2)} * (1.0 + 0.8 * (blades - envDetailMean.g)) * max(0.6, 1.0 + 0.08 * tussock)
          * (0.82 + 0.36 * tufts) * (1.0 - 0.55 * canopy);
      }`}})}function Sm(i,t,{trackFrame:e,lapLength:n=1}){return i.map=null,Cn(i,e?"asphalt-track":"asphalt-pit",t,{uniforms:e?{envLapLength:{value:n},envAlongScale:{value:12}}:{},fragmentHead:e?`uniform float envLapLength; uniform float envAlongScale;
float envAsphaltH;
`:`float envAsphaltH;
`,fragment:{map_fragment:`
      {
        vec2 p = vEnvPos.xz;
        // aggregate at three scales (4.5 mm, 15 mm and 4.5 cm per texel), see the grass
        float a1 = envNoTile(envDetail, p / 2.3, 0.03).r;
        float a2 = envNoTile(envDetail, p / 7.9 + 0.5, 0.011).r;
        float a3 = envNoTile(envDetail, p / 23.0 + 0.27, 0.004).r;
        envAsphaltH = a1;
        float aggregate = envMix(envMix(a1, a2, 0.4, envDetailMean.r), a3, 0.45, envDetailMean.r);
        // stone clusters (0.2 m cells) and patching tone (1-2 m), kept where the aggregate blurs out
        float cluster = texture(envNoise, p / 1.7 + 0.3).b * 0.5 + texture(envNoise, p / 1.9).g * 0.5;
        // worn and patched tone at 0.5-3 m: fbm blotches
        float worn = envUnit(texture(envNoise, p / 11.0 + 0.6).r) * 0.8 + envUnit(texture(envNoise, p / 4.3 + 0.2).g) * 0.6;
        float macro = texture(envNoise, p / 97.0).r * 0.6 + texture(envNoise, p / 331.0 + 0.3).r * 0.4;
        vec3 col = vec3((0.84 + 0.32 * macro) * (1.0 + 1.25 * (aggregate - envDetailMean.r)) * (0.88 + 0.24 * cluster)
          * max(0.7, 1.0 + 0.06 * worn));
        ${e?`
        float across = vEnvUv.x * 12.0;
        float along = vEnvUv.y * envAlongScale;
        float edge = min(across, 14.0 - across);
        col *= mix(1.12, 1.0, smoothstep(0.3, 2.2, edge));
        float cell = floor(along / 31.0);
        float h = envHash(vec2(cell, 7.0));
        if (h > 0.76) {
          float h2 = envHash(vec2(cell, 11.0));
          float h3 = envHash(vec2(cell, 13.0));
          float h4 = envHash(vec2(cell, 17.0));
          float s0 = cell * 31.0 + 2.0 + h2 * 12.0;
          float s1 = s0 + 4.0 + h3 * 12.0;
          float c0 = 0.6 + h4 * 7.5;
          float c1 = min(13.6, c0 + 2.0 + h2 * 4.5);
          if (s0 > 40.0 && s1 < envLapLength - 40.0) {
            float w = fwidth(along) + fwidth(across) + 0.03;
            float inside = smoothstep(-w, w, along - s0) * smoothstep(-w, w, s1 - along)
              * smoothstep(-w, w, across - c0) * smoothstep(-w, w, c1 - across);
            col *= mix(1.0, h > 0.88 ? 0.8 : 1.13, inside);
          }
        }`:`
        float oil = smoothstep(0.7, 0.85, texture(envNoise, p / 97.0 + 0.4).g) * smoothstep(0.55, 0.75, texture(envNoise, p / 9.0).g);
        col *= 1.0 - 0.32 * oil * texture(envNoise, p / 3.1).g;
        float lane = smoothstep(189.0, 191.0, p.y) * (1.0 - smoothstep(195.5, 197.0, p.y));
        float streak = smoothstep(0.55, 0.8, texture(envNoise, vec2(p.x / 41.0, p.y / 0.9)).g);
        col *= 1.0 - 0.22 * lane * streak;`}
        diffuseColor.rgb *= col;
      }`,roughnessmap_fragment:`
      float roughnessFactor = roughness * (0.92 + 0.16 * envAsphaltH);`,normal_fragment_maps:`
      normal = envBump(-vViewPosition, normal, envAsphaltH, 0.004 * ${bm});`}})}function Pw(i,t,e,n){return Cn(i,"rubber",t,{uniforms:{envLap:{value:e},envLapLength:{value:n}},fragmentHead:`uniform sampler2D envLap; uniform float envLapLength;
`,fragment:{map_fragment:`
      {
        float profile = texture2D(map, vMapUv).a;
        float across = vMapUv.x;
        float along = vMapUv.y;
        vec4 lap = texture2D(envLap, vec2(along / envLapLength, 0.5));
        float tracks = smoothstep(0.1, 0.0, abs(abs(across - 0.5) - 0.15) - 0.04);
        float streak = texture2D(envNoise, vec2(across * 2.3, along / 37.0)).g;
        float amount = profile * (0.45 + 0.55 * streak) * (0.65 + 1.5 * lap.r + 0.7 * lap.g);
        amount += tracks * profile * (0.25 + 0.9 * lap.r);
        diffuseColor.a *= clamp(amount, 0.0, 2.6);
      }`}})}function Lw(i,t){return Cn(i,"lines",t,{fragment:{map_fragment:`
      {
        vec2 p = vEnvPos.xz;
        float wear = texture(envNoise, p / 9.7).g * 0.55 + texture(envNoise, p / 2.3).g * 0.3
          + texture(envNoise, p / 0.71).a * 0.15;
        float worn = smoothstep(0.5, 0.82, wear);
        diffuseColor.rgb = mix(diffuseColor.rgb, ${Mn(7039850)}, worn * 0.7);
      }`}})}function Dw(i,t){return Cn(i,"kerb",t,{fragment:{map_fragment:`
      {
        vec4 block = texture2D(map, vMapUv);
        vec2 p = vEnvPos.xz;
        float across = vMapUv.x;
        float along = vMapUv.y * 6.0;
        float fade = texture(envNoise, p / 23.0).r * 0.65 + texture(envNoise, p / 4.1).g * 0.35;
        float blue = clamp((block.b - block.r) * 1.6, 0.0, 1.0);
        vec3 faded = mix(block.rgb * 0.93, ${Mn(7782892)}, blue);
        vec3 col = mix(block.rgb, faded, 0.7 * smoothstep(0.5, 0.85, fade));
        float marks = smoothstep(0.6, 0.85, texture(envNoise, vec2(across * 1.7, along / 19.0)).g)
          * (1.0 - smoothstep(0.15, 0.6, across));
        col *= 1.0 - 0.4 * marks;
        col = mix(col, ${Mn(10326654)}, smoothstep(0.8, 1.0, across) * 0.45);
        diffuseColor.rgb *= col;
      }`}})}var Nw=3.9;function Uw(i,t){i.color.set(5224866);let e=new cn(new Uint8Array(4),1,1,Fe);return e.needsUpdate=!0,Cn(i,"runoff",t,{uniforms:{envGravelMask:{value:e},envGravelBounds:{value:new ee(0,0,1,1)}},fragmentHead:`uniform sampler2D envGravelMask;
uniform vec4 envGravelBounds;
`,fragment:{map_fragment:`
      {
        vec2 p = vEnvPos.xz;
        float dirt = texture(envNoise, p / 13.0).g;
        float marks = smoothstep(0.58, 0.82, texture(envNoise, vec2(vEnvUv.x * 1.3, vEnvUv.y / 9.0)).g);
        vec3 col = vec3(0.86 + 0.24 * dirt);
        col = mix(col, vec3(0.42), marks * 0.4);
        // spilled gravel: only beside a trap, within a wandering strip at the outer edge
        float trap = smoothstep(0.03, 0.2, texture(envGravelMask, (p - envGravelBounds.xy) / (envGravelBounds.zw - envGravelBounds.xy)).r);
        float fromEdge = (1.0 - vEnvUv.x) * ${Nw.toFixed(1)};
        float reach = 0.25 + 0.85 * texture(envNoise, p / 9.0 + 0.4).g;
        float density = trap * (1.0 - smoothstep(0.0, reach, fromEdge));
        vec4 g = envNoTile(envDetail, p / 1.45, 0.07);
        // a pebble shows where its dome is higher than the density leaves (big ones first)
        float w = fwidth(g.a) + 0.05;
        float spill = smoothstep(1.0 - density - w, 1.0 - density + w, g.a) * step(0.001, density);
        vec3 pebble = ${Mn(11903624)} * (1.0 + 0.88 * (g.b - envDetailMean.b));
        diffuseColor.rgb = mix(diffuseColor.rgb * col, pebble, spill);
      }`}})}var Fw=[512,288],Ow=[-800,-450,800,450];function wm(i,t){let[e,n]=Fw,[s,r,o,a]=Ow,c=e/(o-s),l=n/(a-r),h=new Uint8Array(e*n);t.updateMatrixWorld(!0);let u=new Float64Array(6);t.traverse(g=>{if(!g.isMesh||g.material!==i.gravel)return;let p=g.geometry.attributes.position,_=p.array,y=p.isInterleavedBufferAttribute?p.data.stride:3,v=p.isInterleavedBufferAttribute?p.offset:0,A=g.geometry.index?g.geometry.index.array:null,b=A?A.length:p.count,w=g.matrixWorld.elements;for(let T=0;T+2<b;T+=3){for(let I=0;I<3;I++){let B=(A?A[T+I]:T+I)*y+v,U=_[B],z=_[B+1],k=_[B+2];u[2*I]=(w[0]*U+w[4]*z+w[8]*k+w[12]-s)*c,u[2*I+1]=(w[2]*U+w[6]*z+w[10]*k+w[14]-r)*l}let S=Math.max(0,Math.floor(Math.min(u[0],u[2],u[4]))),M=Math.min(e-1,Math.floor(Math.max(u[0],u[2],u[4]))),C=Math.max(0,Math.floor(Math.min(u[1],u[3],u[5]))),N=Math.min(n-1,Math.floor(Math.max(u[1],u[3],u[5]))),D=(u[2]-u[0])*(u[5]-u[1])-(u[4]-u[0])*(u[3]-u[1]);if(D){for(let I=C;I<=N;I++)for(let B=S;B<=M;B++){let U=B+.5,z=I+.5,k=((u[2]-u[0])*(z-u[1])-(U-u[0])*(u[3]-u[1]))*D,J=((u[4]-u[2])*(z-u[3])-(U-u[2])*(u[5]-u[3]))*D,j=((u[0]-u[4])*(z-u[5])-(U-u[4])*(u[1]-u[5]))*D;k>=0&&J>=0&&j>=0&&(h[I*e+B]=255)}for(let I=0;I<3;I++){let B=Math.floor(u[2*I]),U=Math.floor(u[2*I+1]);B>=0&&U>=0&&B<e&&U<n&&(h[U*e+B]=255)}}}});let f=new Uint16Array(e*n);for(let g=0;g<n;g++)for(let p=0;p<e;p++){let _=g*e+p;f[_]=h[_]+(p>0?h[_-1]:0)+(p<e-1?h[_+1]:0)}let d=new Uint8Array(e*n);for(let g=0;g<n;g++)for(let p=0;p<e;p++){let _=g*e+p,y=f[_]+(g>0?f[_-e]:0)+(g<n-1?f[_+e]:0);d[_]=Math.round(y/9)}let m=new cn(d,e,n,Ji);m.magFilter=m.minFilter=We,m.generateMipmaps=!1,m.unpackAlignment=1,m.name="env-gravel-mask",m.needsUpdate=!0;let x=i.runoff.userData.uniforms;return x.envGravelMask.value=m,x.envGravelBounds.value.set(s,r,o,a),m}function Bw(i,t){return i.map=null,i.color.set(16777215),Cn(i,"gravel",t,{fragmentHead:`float envPebbleH;
`,fragment:{map_fragment:`
      {
        vec2 p = vEnvPos.xz;
        // pebbles at three scales (2.8 mm, 8.4 mm and 2.3 cm per texel), see the grass
        vec4 g1 = envNoTile(envDetail, p / 1.45, 0.07);
        vec4 g2 = envNoTile(envDetail, p / 4.3 + 0.21, 0.03);
        float g3 = envNoTile(envDetail, p / 12.0 + 0.43, 0.01).b;
        envPebbleH = g1.a;
        float pebbles = envMix(envMix(g1.b, g2.b, 0.35, envDetailMean.b), g3, 0.3, envDetailMean.b);
        // pebble clusters and hollows: rounded dimples 0.15-1.4 m across (cellular, darker at their
        // centres: kicked-up hollows that show the darker gravel under the sun-bleached top layer),
        // sandy ripples and scuffed patches at 0.5-2 m (fbm), darker raked-up clumps at 13-90 m. The
        // dimples carry the grain from a few metres away, where the pebbles are below a pixel.
        float cluster = texture(envNoise, p / 1.2 + 0.4).b * 0.5 + texture(envNoise, p / 3.7).b * 0.5;
        float dimples = smoothstep(0.55, 0.95, texture(envNoise, p / 2.3 + 0.15).b) * 0.45
          + smoothstep(0.6, 0.95, texture(envNoise, p / 5.6 + 0.55).b) * 0.35
          + smoothstep(0.62, 0.95, texture(envNoise, p / 11.0 + 0.71).b) * 0.2;
        float ripples = envUnit(texture(envNoise, p / 7.0 + 0.3).r) * 0.8 + envUnit(texture(envNoise, p / 5.0 + 0.8).g) * 0.6;
        float clumps = texture(envNoise, p / 90.0 + 0.2).g * 0.6 + texture(envNoise, p / 13.0).g * 0.4;
        float broad = texture(envNoise, p / 71.0).r;
        vec3 col = ${Mn(11903624)} * (1.0 + 0.88 * (pebbles - envDetailMean.b)) * (0.72 + 0.56 * cluster) * (0.9 + 0.2 * broad)
          * max(0.6, 1.0 + 0.11 * ripples) * (1.0 - 0.75 * (dimples - 0.19)); // dimples average about 0.19
        col = mix(col, ${Mn(9732204)}, smoothstep(0.55, 0.85, clumps) * 0.55);
        // raked furrows across the trap (about 0.6 m apart), wavering
        float rake = 0.5 + 0.5 * sin(vEnvUv.x * 95.0 + texture(envNoise, p / 11.0).g * 6.0);
        col *= 0.9 + 0.16 * rake;
        col = mix(col, ${Mn(9074272)}, (1.0 - smoothstep(0.0, 0.12, vEnvUv.x)) * 0.5 * texture(envNoise, p / 7.0).g);
        diffuseColor.rgb *= col;
      }`,normal_fragment_maps:`
      normal = envBump(-vViewPosition, normal, envPebbleH, 0.02 * ${bm});`}})}var Na=2048;function Am(){let i=new cn(new Uint8Array(Na*4),Na,1,Fe);return i.wrapS=He,i.magFilter=i.minFilter=We,i.generateMipmaps=!1,i.name="env-lap",i.needsUpdate=!0,i}function zw(i,t){let{line:e,corners:n}=t,s=e.count,r=new Float64Array(s),o=new Float64Array(s);for(let c of n)for(let l of c.subCorners||[c]){let h=0;for(let f=l.first;f<=l.last;f++)h+=Math.abs(e.curvature[f%s])*e.spacing;let u=Math.min(1,h/1.2);for(let f=-110;f<=15;f++){let d=((l.first+Math.round(f/e.spacing))%s+s)%s,m=f<-15?(f+110)/95:1-(f+15)/30;r[d]=Math.max(r[d],u*m*m)}for(let f=0;f<=40;f++){let d=(l.last+Math.round(f/e.spacing))%s;o[d]=Math.max(o[d],u*(1-f/40))}}let a=i.image.data;for(let c=0;c<Na;c++){let l=Math.min(s-1,Math.floor((c+.5)/Na*s));a[4*c]=Math.round(255*r[l]),a[4*c+1]=Math.round(255*o[l]),a[4*c+3]=255}i.needsUpdate=!0}function Em(i,t,e){Iw(i.ground,t),Sm(i.asphalt,t,{trackFrame:!0,lapLength:4176.6}),Sm(i.pitAsphalt,t,{trackFrame:!1}),Pw(i.rubber,t,e,4176.6),Lw(i.line,t),Dw(i.kerb,t),Uw(i.runoff,t),Bw(i.gravel,t)}function Tm(i,t,e){let n=e.line.length;i.asphalt.userData.uniforms.envLapLength.value=n,i.asphalt.userData.uniforms.envAlongScale.value=n/Math.round(n/12),i.rubber.userData.uniforms.envLapLength.value=n,zw(t,e)}var Ce=2,qr=120,zn=8,Rm=60,kw=1.0824,er=Ce/2,Cm=Ce*Math.SQRT1_2;function Vw(i,t,e,n){let s=i.attributes.position,r=i.index,o=r?r.count:s.count,a=o-o%3,c=r?r.array:null,l=s.isInterleavedBufferAttribute||s.itemSize!==3?null:s.array;for(let h=0;h<a;h++){let u=c?c[h]:h,f=l?l[3*u]:s.getX(u),d=l?l[3*u+1]:s.getY(u),m=l?l[3*u+2]:s.getZ(u);e[n++]=t[0]*f+t[4]*d+t[8]*m+t[12],e[n++]=t[2]*f+t[6]*d+t[10]*m+t[14]}return n}function Im(i,t,e){let{min:n,max:s}=i;return t[e++]=n.x,t[e++]=n.z,t[e++]=s.x,t[e++]=n.z,t[e++]=s.x,t[e++]=s.z,t[e++]=n.x,t[e++]=n.z,t[e++]=s.x,t[e++]=s.z,t[e++]=n.x,t[e++]=s.z,e}function Hw(i,t,e){let[n,s,r,o]=e;for(let a=0;a<t;a+=2){let c=i[a],l=i[a+1];c<n&&(n=c),c>r&&(r=c),l<s&&(s=l),l>o&&(o=l)}e[0]=n,e[1]=s,e[2]=r,e[3]=o}function tu(i,t,e,n,s,r){let o=s-e,a=r-n,c=o*o+a*a,l=c>0?Math.max(0,Math.min(1,((i-e)*o+(t-n)*a)/c)):0,h=i-e-l*o,u=t-n-l*a;return Math.sqrt(h*h+u*u)}function Gw(i,t,e,n,s,r,o,a){let c=(s-e)*(a-n)-(o-e)*(r-n);if(Math.abs(c)>1e-9){let l=c>0?1:-1,h=((s-e)*(t-n)-(i-e)*(r-n))*l,u=((o-s)*(t-r)-(i-s)*(a-r))*l,f=((e-o)*(t-a)-(i-o)*(n-a))*l;if(h>=0&&u>=0&&f>=0)return 0}return Math.min(tu(i,t,e,n,s,r),tu(i,t,s,r,o,a),tu(i,t,o,a,e,n))}function Ww(i,t,e,n,s,r){for(let o=0;o<i.length;o+=6){let a=Math.max(0,Math.floor((Math.min(i[o+1],i[o+3],i[o+5])-er-n)/Ce)),c=Math.min(r-1,Math.floor((Math.max(i[o+1],i[o+3],i[o+5])+er-n)/Ce));for(let l=a;l<=c;l++){let h=n+(l+.5)*Ce,u=h-er,f=h+er,d=1/0,m=-1/0;for(let p=0;p<3;p++){let _=i[o+2*p],y=i[o+2*p+1],v=i[o+(2*p+2)%6],A=i[o+(2*p+3)%6];if(y>=u&&y<=f&&(_<d&&(d=_),_>m&&(m=_)),(y-u)*(A-u)<0){let b=_+(u-y)/(A-y)*(v-_);b<d&&(d=b),b>m&&(m=b)}if((y-f)*(A-f)<0){let b=_+(f-y)/(A-y)*(v-_);b<d&&(d=b),b>m&&(m=b)}}if(d>m)continue;let x=Math.max(0,Math.ceil((d-er-e)/Ce-.5)),g=Math.min(s-1,Math.floor((m+er-e)/Ce-.5));t.fill(1,l*s+x,l*s+g+1)}}}function Xw(i,t,e){let n=new Float32Array(t*e);for(let r=0;r<n.length;r++)n[r]=i[r]?0:1/0;let s=Math.SQRT2;for(let r=0;r<e;r++)for(let o=0;o<t;o++){let a=r*t+o,c=n[a];o>0&&(c=Math.min(c,n[a-1]+1)),r>0&&(c=Math.min(c,n[a-t]+1),o>0&&(c=Math.min(c,n[a-t-1]+s)),o<t-1&&(c=Math.min(c,n[a-t+1]+s))),n[a]=c}for(let r=e-1;r>=0;r--)for(let o=t-1;o>=0;o--){let a=r*t+o,c=n[a];o<t-1&&(c=Math.min(c,n[a+1]+1)),r<e-1&&(c=Math.min(c,n[a+t]+1),o<t-1&&(c=Math.min(c,n[a+t+1]+s)),o>0&&(c=Math.min(c,n[a+t-1]+s))),n[a]=c}return n}function eu(i,t,e,n,s){let r=i.length/6,o=Math.ceil((n-t)/zn),a=Math.ceil((s-e)/zn),c=new Int32Array(r*4);for(let m=0,x=0;m<r;m++,x+=6)c[4*m]=Math.max(0,Math.floor((Math.min(i[x],i[x+2],i[x+4])-t)/zn)),c[4*m+1]=Math.min(o-1,Math.floor((Math.max(i[x],i[x+2],i[x+4])-t)/zn)),c[4*m+2]=Math.max(0,Math.floor((Math.min(i[x+1],i[x+3],i[x+5])-e)/zn)),c[4*m+3]=Math.min(a-1,Math.floor((Math.max(i[x+1],i[x+3],i[x+5])-e)/zn));let l=new Int32Array(o*a+1);for(let m=0;m<r;m++)for(let x=c[4*m+2];x<=c[4*m+3];x++)for(let g=c[4*m];g<=c[4*m+1];g++)l[x*o+g+1]++;for(let m=0;m<o*a;m++)l[m+1]+=l[m];let h=new Int32Array(l[o*a]),u=l.slice(0,o*a);for(let m=0;m<r;m++)for(let x=c[4*m+2];x<=c[4*m+3];x++)for(let g=c[4*m];g<=c[4*m+1];g++)h[u[x*o+g]++]=m;let f=new Uint32Array(r),d=0;return(m,x,g)=>{d++;let p=1/0,_=Math.max(0,Math.floor((m-g-t)/zn)),y=Math.min(o-1,Math.floor((m+g-t)/zn)),v=Math.max(0,Math.floor((x-g-e)/zn)),A=Math.min(a-1,Math.floor((x+g-e)/zn));for(let b=v;b<=A;b++)for(let w=_;w<=y;w++){let T=b*o+w;for(let S=l[T];S<l[T+1];S++){let M=h[S];if(f[M]===d)continue;f[M]=d;let C=6*M,N=Gw(m,x,i[C],i[C+1],i[C+2],i[C+3],i[C+4],i[C+5]);N<p&&(p=N)}}return p}}function Pm(i,{trackMaterial:t,skip:e=new Set,loop:n=null}){i.updateMatrixWorld(!0);let s=new en,r=new Vt,o=I=>I.transparent&&!I.depthWrite||I.userData.envSkipOccupancy,a={track:[],solid:[]},c={track:0,solid:0},l=I=>{if(!e.has(I)){if(I.isMesh&&![].concat(I.material).every(o)){let B=[].concat(I.material).includes(t)?"track":"solid",U=I.geometry;U.boundingBox||U.computeBoundingBox();let z=!1;I.isInstancedMesh||(s.copy(U.boundingBox).applyMatrix4(I.matrixWorld),z=s.max.x-s.min.x>Rm||s.max.z-s.min.z>Rm);let k=U.index?U.index.count:U.attributes.position.count;a[B].push({node:I,large:z}),c[B]+=I.isInstancedMesh?12*I.count:z?2*(k-k%3):12}for(let B of I.children)l(B)}};l(i);let h={},u=[1/0,1/0,-1/0,-1/0];for(let I of["track","solid"]){let B=new Float64Array(c[I]),U=0;for(let{node:z,large:k}of a[I]){let J=z.geometry;if(z.isInstancedMesh)for(let j=0;j<z.count;j++)z.getMatrixAt(j,r),r.premultiply(z.matrixWorld),U=Im(s.copy(J.boundingBox).applyMatrix4(r),B,U);else k?U=Vw(J,z.matrixWorld.elements,B,U):U=Im(s.copy(J.boundingBox).applyMatrix4(z.matrixWorld),B,U)}h[I]=B,Hw(B,U,u)}let[f,d,m,x]=u,g=Math.floor((f-qr)/Ce)*Ce,p=Math.floor((d-qr)/Ce)*Ce,_=Math.ceil((m+qr-g)/Ce),y=Math.ceil((x+qr-p)/Ce),v=g+_*Ce,A=p+y*Ce,b={},w={},T={};for(let I of["track","solid"]){let B=h[I];T[I]=B.length/6;let U=new Uint8Array(_*y);Ww(B,U,g,p,_,y),b[I]=Xw(U,_,y),w[I]=eu(B,g,p,v,A)}let S=new Uint8Array(_*y);if(n){let I=j=>(j-p)/Ce-.5,B=new Int32Array(y+1),U=j=>{let $=n.z[j],Z=n.z[(j+1)%n.count];return[Math.max(0,Math.ceil(I(Math.min($,Z)))),Math.min(y-1,Math.floor(I(Math.max($,Z))))]};for(let j=0;j<n.count;j++){let[$,Z]=U(j);for(let ut=$;ut<=Z;ut++)B[ut+1]++}for(let j=0;j<y;j++)B[j+1]+=B[j];let z=new Int32Array(B[y]),k=B.slice(0,y);for(let j=0;j<n.count;j++){let[$,Z]=U(j);for(let ut=$;ut<=Z;ut++)z[k[ut]++]=j}let J=new Float64Array(64);for(let j=0;j<y;j++){let $=p+(j+.5)*Ce,Z=0;for(let q=B[j];q<B[j+1]&&Z<J.length;q++){let it=z[q],st=(it+1)%n.count,dt=n.z[it],yt=n.z[st];dt>$!=yt>$&&(J[Z++]=n.x[it]+($-dt)/(yt-dt)*(n.x[st]-n.x[it]))}let ut=J.subarray(0,Z).sort();for(let q=0;q+1<Z;q+=2){let it=Math.max(0,Math.ceil((ut[q]-g)/Ce-.5)),st=Math.min(_-1,Math.floor((ut[q+1]-g)/Ce-.5));st>=it&&S.fill(1,j*_+it,j*_+st+1)}}}let M=(I,B)=>{let U=Math.floor((I-g)/Ce),z=Math.floor((B-p)/Ce);return U<0||z<0||U>=_||z>=y?-1:z*_+U},C=(I,B,U)=>{let z=M(B,U);return z<0?qr:Math.max(0,b[I][z]*Ce/kw-2*Cm)},N=(I,B,U)=>{let z=M(B,U);return z<0?1/0:b[I][z]*Ce+2*Cm},D=(I,B,U,z)=>!(z>0)||C(I,B,U)>=z?!0:N(I,B,U)<z?!1:w[I](B,U,z)>=z;return{bounds:{x0:g,z0:p,x1:v,z1:A},counts:T,trackDistance:(I,B)=>C("track",I,B),solidDistance:(I,B)=>C("solid",I,B),exact:(I,B,U,z)=>w[I](B,U,z),clear:(I,B,U,z)=>D("track",I,B,U)&&D("solid",I,B,z),infield:(I,B)=>{let U=M(I,B);return U>=0&&S[U]===1}}}var Lm=9,Yw=9,qw=40,nu=2.5,Ua=1.2,Dm=5.5,iu=31.4,Zw=22,$w=16,Jw=6,su=1.4,Kw=.45,Nm=[[.45,.76],[.79,1.1]];function jw(){let i=document.createElement("canvas");i.width=4,i.height=64;let t=i.getContext("2d"),e=[[0,"#6f746f"],[.12,"#c9ccc2"],[.32,"#a6a99e"],[.5,"#5b605c"],[.68,"#a6a99e"],[.88,"#c9ccc2"],[1,"#6f746f"]],n=t.createLinearGradient(0,0,0,64);for(let[r,o]of e)n.addColorStop(r,o);t.fillStyle=n,t.fillRect(0,0,4,64);let s=new xn(i);return s.wrapS=He,s.colorSpace=xe,s}function Qw(i){let t=i.length,e=0;for(;e<t&&i[e];)e++;if(e===t)return[[0,t-1]];let n=[];for(let s=e;s<e+t;s++){if(!i[s%t])continue;let r=s;for(;r+1<e+t&&i[(r+1)%t];)r++;n.push([s,r]),s=r}return n}function Um(i,t){i.updateMatrixWorld(!0);let e=[],n=0;if(i.traverse(m=>{if(!m.isMesh||m.material!==t)return;let{index:x,attributes:g}=m.geometry,p=x?x.count:g.position.count;e.push(m),n+=p-p%3}),!n)return{distance:()=>1/0};let s=new Float64Array(2*n),r=new Uint8Array(n/3),o=0;for(let m of e){let x=m.geometry.attributes.position,g=m.geometry.index?m.geometry.index.array:null,p=g?g.length:x.count,_=m.matrixWorld.elements,y=o,v=0;for(let A=0;A<p-p%3;A++){let b=g?g[A]:A,w=x.getX(b),T=x.getY(b),S=x.getZ(b);if(s[o++]=_[0]*w+_[4]*T+_[8]*S+_[12],s[o++]=_[2]*w+_[6]*T+_[10]*S+_[14],A%3===2){let M=o-6,C=(s[M+2]-s[M])*(s[M+5]-s[M+1])-(s[M+4]-s[M])*(s[M+3]-s[M+1]);Math.abs(C)>1e-6&&(r[M/6]=1,v++)}}if(!v)for(let A=y;A<o;A+=6)r[A/6]=1}let a=0;for(let m=0;m<r.length;m++)a+=r[m];let c=new Float64Array(6*a),l=1/0,h=1/0,u=-1/0,f=-1/0;for(let m=0,x=0;m<r.length;m++)if(r[m])for(let g=0;g<6;g+=2){let p=c[x++]=s[6*m+g],_=c[x++]=s[6*m+g+1];p<l&&(l=p),p>u&&(u=p),_<h&&(h=_),_>f&&(f=_)}return{distance:eu(c,l-50,h-50,u+50,f+50),triangles:a,of:r.length}}function t2(i,t){let e=i.length,n=2*t+1,s=e+2*t,r=new Float64Array(s),o=new Float64Array(s),a=l=>i[((l-t)%e+e)%e];for(let l=0;l<s;l++)r[l]=l%n?Math.max(r[l-1],a(l)):a(l);for(let l=s-1;l>=0;l--)o[l]=l%n===n-1||l===s-1?a(l):Math.max(o[l+1],a(l));let c=new Float64Array(e);for(let l=0;l<e;l++)c[l]=Math.max(o[l],r[l+2*t]);return c}function e2(i,t){let e=i.length,n=new Float64Array(e),s=0;for(let r=-t;r<=t;r++)s+=i[(r+e)%e];for(let r=0;r<e;r++)n[r]=s/(2*t+1),s+=i[(r+t+1)%e]-i[(r-t+e)%e];return n}function n2(i,t,e,n){let{line:s,halfWidth:r}=i,o=s.count,a=Math.round(Zw/s.spacing),c=Math.round($w/s.spacing),l=25,h=1/0,u=1/0,f=-1/0,d=-1/0;for(let w=0;w<o;w++)h=Math.min(h,s.x[w]),u=Math.min(u,s.z[w]),f=Math.max(f,s.x[w]),d=Math.max(d,s.z[w]);let m=Math.floor((f-h)/l)+1,x=Math.floor((d-u)/l)+1,g=w=>Math.floor((s.z[w]-u)/l)*m+Math.floor((s.x[w]-h)/l),p=new Int32Array(m*x+1);for(let w=0;w<o;w++)p[g(w)+1]++;for(let w=0;w<m*x;w++)p[w+1]+=p[w];let _=new Int32Array(o),y=p.slice(0,m*x);for(let w=0;w<o;w++)_[y[g(w)]++]=w;let v=(w,T,S)=>{let M=Math.floor((w-h)/l),C=Math.floor((T-u)/l);for(let N=Math.max(0,C-1);N<=Math.min(x-1,C+1);N++)for(let D=Math.max(0,M-1);D<=Math.min(m-1,M+1);D++)for(let I=p[N*m+D];I<p[N*m+D+1];I++){let B=_[I];if(Math.min(Math.abs(B-S),o-Math.abs(B-S))<60)continue;let z=s.x[B]-w,k=s.z[B]-T,J=Yw+r[B];if(z*z+k*k<J*J)return!1}return!0},A=(w,T)=>[s.x[w]+s.nx[w]*T,s.z[w]+s.nz[w]*T],b=[];for(let w of[1,-1]){let T=new Float64Array(o).fill(Lm),S=new Uint8Array(o),M=new Uint8Array(o);for(let{side:I,first:B,last:U}of i.gravel)if(I===w)for(let z=B;z<=U;z++)M[z%o]=1;let C=(I,B)=>{let[U,z]=A(I,w*(r[I]+B));return e.distance(U,z,.05)<=0};for(let I=0;I<o;I++){if(!M[I])continue;let[B,U]=A(I,w*(r[I]+iu));if(n.distance(B,U,2)<.6){S[I]=1,T[I]=iu;continue}if(!C(I,Dm+.4))continue;let z=Dm+.4,k=iu;for(let J=0;J<7;J++){let j=(z+k)/2;C(I,j)?z=j:k=j}T[I]=Math.max(Lm,k+nu)}let N=e2(t2(T,a),c),D=new Uint8Array(o);for(let I=0;I<o;I++){if(S[I])continue;let B=w*(r[I]+N[I]),[U,z]=A(I,B),k=z>150&&z<260&&U>-600&&U<480;D[I]=!k&&!t(U,z)&&i.edge(I,B)===B&&v(U,z,I)&&e.distance(U,z,nu+1)>=nu-.3&&n.distance(U,z,Ua+1)>=Ua?1:0}for(let[I,B]of Qw(D)){if((B-I+1)*s.spacing<qw)continue;let U=J=>{for(let Z=1;Z<=3;Z++)if(S[(J+Z)%o]||S[(J-Z+o)%o])return!0;let[j,$]=A(J,w*(r[J]+N[J]));return n.distance(j,$,Ua+su+3)<Ua+su+3},z=B-I+1,k=new Float64Array(z);for(let J=0;J<z;J++)k[J]=N[(I+J)%o];b.push({side:w,first:I,last:B,offset:k,wallAtStart:U(I),wallAtEnd:U(B%o)})}}return b}function Fm(i,t){let{model:e,isKeepClearZone:n}=t,{line:s,halfWidth:r}=e,o=s.count,a=n2(e,n,Um(i.root,i.materials.gravel),Um(i.root,i.materials.barrier)),c=[],l=[],h=[],u=[],f=[],d=Math.round(Jw/s.spacing);for(let{side:y,first:v,last:A,offset:b,wallAtStart:w,wallAtEnd:T}of a){let S=A-v+1,M=new Float64Array(S),C=new Float64Array(S),N=new Float64Array(S).fill(1);for(let D=0;D<S;D++){let I=(v+D)%o,B=r[I]+b[D],U=w?1/0:D,z=T?1/0:S-1-D,k=1-Math.min(U,z)/d;k>0&&(B+=su*k*k,N[D]=1-(1-Kw)*k*k),M[D]=s.x[I]+s.nx[I]*y*B,C[D]=s.z[I]+s.nz[I]*y*B}for(let[D,I]of Nm){let B=c.length/3,U=0;for(let z=0;z<S;z++){let k=Math.max(0,z-1),J=Math.min(S-1,z+1),j=M[J]-M[k],$=C[J]-C[k],Z=Math.hypot(j,$)||1,ut=y*$/Z,q=-y*j/Z;z>0&&(U+=Math.hypot(M[z]-M[z-1],C[z]-C[z-1])),c.push(M[z],D*N[z],C[z],M[z],I*N[z],C[z]),l.push(ut,0,q,ut,0,q),h.push(U,0,U,1),D===Nm[0][0]&&z%2===0&&f.push([M[z]-ut*.12,C[z]-q*.12,N[z]])}for(let z=0;z<S-1;z++){let k=B+2*z;u.push(k,k+2,k+1,k+1,k+2,k+3)}}}if(!a.length)return a;let m=new se;m.setAttribute("position",new kt(c,3)),m.setAttribute("normal",new kt(l,3)),m.setAttribute("uv",new kt(h,2)),m.setIndex(u);let x=new bt({map:jw(),color:14211792,roughness:.5,metalness:.45,side:_e}),g=new Et(m,x);g.name="armco",g.castShadow=!0,g.receiveShadow=!0,i.root.add(g);let p=new Ue(new jt(.06,.06,1,6),i.materials.steelDark,f.length);p.name="armco-posts";let _=new Vt;return f.forEach(([y,v,A],b)=>p.setMatrixAt(b,_.makeScale(1,1.15*A,1).setPosition(y,.55*A,v))),p.castShadow=!0,p.receiveShadow=!0,i.root.add(p),a}function Om(i){let t=[];if(i.root.traverse(s=>{if(!s.isMesh||s.material!==i.materials.barrier)return;let r=s.geometry.attributes.position,o=s.geometry.attributes.normal,a=r.getX(0),c=r.getZ(0),l=r.getX(2),h=r.getZ(2),u=Math.hypot(l-a,h-c)||1,f=(l-a)/u,d=(h-c)/u,m=o.getX(0),x=o.getZ(0);for(let g=0;g<3;g++)t.push([a+f*(.4+g*.72)+m*.45,c+d*(.4+g*.72)+x*.45])}),!t.length)return;let e=new Ue(new jt(.33,.33,.24,14),new bt({color:424827,roughness:.8}),t.length*5),n=new Vt;t.forEach(([s,r],o)=>{for(let a=0;a<5;a++)e.setMatrixAt(o*5+a,n.makeTranslation(s,.12+a*.245,r))}),e.castShadow=!0,e.receiveShadow=!0,e.name="tyre-stacks",i.root.add(e)}function Bm(i){let{rng:t,root:e,updaters:n,density:s}=i,r=new ae;r.name="clouds",e.add(r);let o=Math.round(22*Math.max(.5,s));for(let a=0;a<o;a++){let c=new Ir({map:_p(a+3),transparent:!0,depthWrite:!1,fog:!1,opacity:.85}),l=new ta(c),h=t()*Math.PI*2,u=900+t()*1300;l.position.set(Math.cos(h)*u,220+t()*260,Math.sin(h)*u);let f=380+t()*420;l.scale.set(f,f*.42,1),l.userData.v=.6+t()*1.2,r.add(l)}n.push((a,c)=>{for(let l of r.children)l.position.x+=l.userData.v*c*2.2,l.position.x>2400&&(l.position.x=-2400)})}var Zr={straightZ:206,straightX0:420,straightX1:-534,trackHalf:7,pitWallZ:198,pitLaneZ:191.5,garageFrontZ:185.5,garageDepth:17,boxW:6.7,boxes:30,pitX0:-150.5,get pitX1(){return this.pitX0+this.boxes*this.boxW},towerX:64,gantryX:-96,grandstandZ:224,grandstandX0:-190,grandstandX1:110,paddock:{x0:-170,x1:120,z0:96,z1:166}};var i2={high:8,mid:4,low:2},s2={high:512,mid:512,low:256};function zm(i="high"){return{detail:Ap(i2[i]||4,s2[i]||512),lap:Am(),kerb:gp(),barrier:xp(),blob:yp(),ao:vp(),shutter:Mp()}}var ru={transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1};function km(i){let t={ground:new bt({roughness:1,color:16777215,vertexColors:!0}),asphalt:new bt({roughness:.82,metalness:0,color:5131596}),pitAsphalt:new bt({roughness:.86,color:5723991}),rubber:new Ae({color:723981,opacity:.16,...ru}),ao:new Ae({map:i.ao,...ru}),contact:new Ae({map:Ra(128,128,{hx:.34,hy:.34,rr:.2,fade:.15,alpha:.6}),...ru}),line:new bt({color:15921644,roughness:.7}),kerb:new bt({map:i.kerb,roughness:.6}),runoff:new bt({color:5224866,roughness:.8}),gravel:new bt({roughness:1,color:16777215}),barrier:new bt({map:i.barrier,roughness:.85}),concrete:new bt({color:14276560,roughness:.92}),concreteDark:new bt({color:10988978,roughness:.9}),white:new bt({color:15131870,roughness:.8}),steel:new bt({color:10200234,roughness:.45,metalness:.6}),steelDark:new bt({color:6120555,roughness:.5,metalness:.55}),glass:new bt({color:6256260,roughness:.12,metalness:.9,envMapIntensity:1.2}),shutter:new bt({map:i.shutter,color:16777215,roughness:.5,metalness:.3}),seat:new bt({color:5144467,roughness:.7}),roofW:new bt({color:15855593,roughness:.6,side:_e}),red:new bt({color:15282981,roughness:.55}),trunk:new bt({color:7034695,roughness:1}),pine:new bt({color:16777215,roughness:1}),oak:new bt({color:16777215,roughness:1}),shrub:new bt({color:16777215,roughness:1}),hill:new bt({color:7043676,roughness:1,flatShading:!1}),interior:new bt({color:14276561,roughness:.8}),floor:new bt({color:9343640,roughness:.55,metalness:.1}),blob:new Ae({map:i.blob,transparent:!0,depthWrite:!1}),toolChest:new bt({color:1316120,roughness:.45,metalness:.3})};return Em(t,i.detail,i.lap),t}function Vm(i){let t=Sp();return t.repeat.set(i,1),new bt({map:t,roughness:.18,metalness:.55,envMapIntensity:1.1})}function r2(i){return i==="high"?1:i==="mid"?.6:.35}function Hm(i,t){let e=r2(t),n=new ae;n.name="world";let s=i.map(([f,d])=>new ft(f,d)),r=Me(42),o=[],a=zm(t),c=km(a);function l(f,d,m,x,g,p=1,_=.06,y=n){let v=Math.hypot(m-f,x-d),A=new ce(v,g);A.rotateX(-Math.PI/2);let b=new Et(A,c.ao),w=Math.atan2(x-d,m-f),T=-Math.sin(w)*p,S=Math.cos(w)*p;return b.position.set((f+m)/2+T*g/2,_,(d+x)/2+S*g/2),b.rotation.y=-w+(p>0?0:Math.PI),b.renderOrder=1,y.add(b),b}function h(f,d,m,x,g=0,p=n){let _=new Et(new ce(m,x),c.contact);return _.rotation.x=-Math.PI/2,_.rotation.z=g,_.position.set(f,.055,d),_.renderOrder=1,p.add(_),_}function u(f,d,m,x,g,p,_,y=n,v=!0){let A=new Et(new Ie(f,d,m),x);return A.position.set(g,p+d/2,_),A.castShadow=v,A.receiveShadow=!0,y.add(A),A}return{quality:t,density:e,root:n,track:s,rng:r,updaters:o,textures:a,materials:c,layout:Zr,glazingMaterial:Vm,addAoStrip:l,addContactShadow:h,addBox:u}}var o2=6,a2=2.4,c2=1.5;function $r(i,t,e,n,s,r){let{materials:o,updaters:a}=i,c=new Et(new jt(.05,.06,o2,6),o.steel);c.position.set(t,e+3,n),r.add(c);let l=new ce(a2,c2,16,6);l.translate(1.2,0,0);let h=new bt({color:s,side:_e,roughness:.8});h.onBeforeCompile=f=>{f.uniforms.uTime={value:0},h.userData.sh=f,f.vertexShader=`uniform float uTime;
`+f.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        float k = position.x / 2.4;
        transformed.z += sin(position.x * 2.1 - uTime * 4.2 + ${(t*.1).toFixed(2)}) * .22 * k;
        transformed.y += sin(position.x * 1.3 - uTime * 3.1) * .06 * k;`)};let u=new Et(l,h);u.position.set(t,e+5.1,n),u.castShadow=!0,r.add(u),a.push(f=>{h.userData.sh&&(h.userData.sh.uniforms.uTime.value=f)})}var Gm=new Ie(1,1,1),Wm=new Vt,Xm=new Kt,ou=new we,l2=new L,h2=new L,Ii=new L,u2=new L(0,1,0);function es(){let i=new Map,t=0;return{get count(){return t},add(e,n,s,r,o,a,c,{castShadow:l=!0,yaw:h=0,pitch:u=0}={}){i.has(r)||i.set(r,{cast:[],still:[]}),ou.setFromAxisAngle(u2,h),u&&ou.multiply(new we().setFromAxisAngle(new L(1,0,0),u)),Wm.compose(h2.set(o,a+n/2,c),ou,l2.set(e,n,s)),i.get(r)[l?"cast":"still"].push(Wm.clone()),t++},build(e,n="batch"){let s=[],r=Gm.attributes,o=Gm.index.array;for(let[a,c]of i)for(let[l,h]of Object.entries(c)){if(!h.length)continue;let u=r.position.count,f=new Float32Array(h.length*u*3),d=new Float32Array(h.length*u*3),m=new Float32Array(h.length*u*2),x=new Uint32Array(h.length*o.length);h.forEach((_,y)=>{Xm.getNormalMatrix(_);for(let v=0;v<u;v++)Ii.fromBufferAttribute(r.position,v).applyMatrix4(_),f.set([Ii.x,Ii.y,Ii.z],(y*u+v)*3),Ii.fromBufferAttribute(r.normal,v).applyMatrix3(Xm).normalize(),d.set([Ii.x,Ii.y,Ii.z],(y*u+v)*3),m[(y*u+v)*2]=r.uv.getX(v),m[(y*u+v)*2+1]=r.uv.getY(v);for(let v=0;v<o.length;v++)x[y*o.length+v]=o[v]+y*u});let g=new se;g.setAttribute("position",new kt(f,3)),g.setAttribute("normal",new kt(d,3)),g.setAttribute("uv",new kt(m,2)),g.setIndex([...x]);let p=new Et(g,a);p.name=n,p.castShadow=l==="cast",p.receiveShadow=!0,e.add(p),s.push(p)}return s}}}var f2=18,Ym=-.08,au=20,Fa=1.3,qm=8,d2=.5;function p2(){let i=document.createElement("canvas");i.width=256,i.height=64;let t=i.getContext("2d"),e=Me(301);t.fillStyle="#20262c",t.fillRect(0,0,256,64);for(let s=0;s<qm;s++){let r=e()<.22;t.fillStyle=r?"#5583a1":"#1a66aa",t.fillRect(s*32+3,4,26,56),t.fillStyle="rgba(255,255,255,.18)",t.fillRect(s*32+3,4,26,5),t.fillStyle="rgba(0,0,0,.22)",t.fillRect(s*32+3,40,26,4)}let n=new xn(i);return n.wrapS=n.wrapT=He,n.colorSpace=xe,n.anisotropy=8,n}function Zm(i){let{root:t,materials:e}=i,n=i.layout,s=new ae;s.name="grandstand",t.add(s);let r=n.grandstandX1-n.grandstandX0,o=(n.grandstandX0+n.grandstandX1)/2,a=n.grandstandZ,c=es(),l=[];for(let x=n.grandstandX0+au;x<n.grandstandX1-1;x+=au)l.push(x);let h=[n.grandstandX0+1,...l,n.grandstandX1-1],u=au-Fa,f=new bt({map:p2(),roughness:.62});f.map.repeat.set(u/(qm*d2),1);let d=new bt({color:14210508,roughness:.85});for(let x=0;x<f2;x++){let g=1.2+x*.55,p=a+x*.85;c.add(r,.45,.9,e.concreteDark,o,g,p,{castShadow:x%3===0});for(let _=0;_+1<h.length;_++){let y=h[_]+(_>0?Fa/2:0),v=h[_+1]-(_+2<h.length?Fa/2:0),A=Math.min(u,v-y);c.add(A,.34,.38,f,(y+v)/2,g+.45,p-.1,{castShadow:!1})}for(let _ of l)c.add(Fa-.1,.03,.08,d,_,g+.45,p-.41,{castShadow:!1})}c.add(r,1.2,16,e.concreteDark,o,0,a+7.5),c.add(r,11,1,e.white,o,0,a+16);for(let x of[n.grandstandX0-.3,n.grandstandX1+.3])for(let g=0;g<6;g++)c.add(.4,2.4+g*1.65,2.6,e.white,x,0,a+1.3+g*2.55);c.add(r,.06,.06,e.steel,o,2.25,a-.42,{castShadow:!1});for(let x=n.grandstandX0+1;x<=n.grandstandX1-1;x+=2.5)c.add(.05,1,.05,e.steel,x,1.25,a-.42,{castShadow:!1});for(let x=n.grandstandX0;x<=n.grandstandX1+.1;x+=20)c.add(.5,16.5,.5,e.steel,x,0,a+16.2),c.add(.35,1.4,21,e.steel,x,16.6,a+7.5,{pitch:Ym});c.build(s,"grandstand");let m=new Et(new Ie(r+4,.2,22),e.roofW);m.position.set(o,16.5,a+7.5),m.rotation.x=Ym,m.castShadow=!0,m.receiveShadow=!0,s.add(m),m2(s,m,r+4,22)}function m2(i,t,e,n){let s=[],a=Math.floor(n/2.75);for(let x=0;x<=a;x++){let g=-n/2+.6+x*((n-1.2)/a);if(s.push([[-e/2,-.2,g],[e/2,-.2,g],.06]),x<a){let p=g+(n-1.2)/a/2;s.push([[-e/2,-1.1,p],[e/2,-1.1,p],.06])}}for(let x=-e/2+1;x<=e/2-1;x+=5){s.push([[x,-.2,-n/2+.6],[x,-.2,n/2-.6],.05]);for(let g=0;g<a;g++){let p=-n/2+.6+g*((n-1.2)/a),_=p+(n-1.2)/a,y=(p+_)/2;s.push([[x,-.2,p],[x+2.5,-1.1,y],.04]),s.push([[x,-.2,_],[x+2.5,-1.1,y],.04])}}let c=new Ue(new jt(1,1,1,6,1,!0),t.material,s.length),l=new Vt,h=new L,u=new L,f=new L,d=new we,m=new L(0,1,0);s.forEach(([x,g,p],_)=>{h.fromArray(x),u.fromArray(g),f.subVectors(u,h);let y=f.length();d.setFromUnitVectors(m,f.normalize()),l.compose(h.add(u).multiplyScalar(.5),d,new L(p,y,p)),c.setMatrixAt(_,l)}),c.castShadow=!0,c.receiveShadow=!0,c.name="space-frame",t.add(c)}var $m=3,kn=3.4,Jr=1,Oa=.6;function Jm(i){let{root:t,materials:e,addBox:n}=i,s=i.layout,r=s.straightX0-s.straightX1,o=(s.straightX0+s.straightX1)/2,a=1.15,c=s.straightZ+10.6;n(r,a,.6,e.concrete,o,0,s.straightZ+10.5);let l=Math.floor(r/$m)+1,h=new Ue(new jt(.05,.05,1,6),e.steelDark,l*2),u=new Vt,f=new we().setFromAxisAngle(new L(1,0,0),-Oa),d=-Math.sin(Oa)*Jr,m=Math.cos(Oa)*Jr;for(let A=0;A<l;A++){let b=s.straightX1+A*$m;u.makeScale(1,kn,1).setPosition(b,a+kn/2,c),h.setMatrixAt(2*A,u),u.compose(new L(b,a+kn+m/2,c+d/2),f,new L(1,Jr,1)),h.setMatrixAt(2*A+1,u)}h.castShadow=!0,h.receiveShadow=!0,t.add(h);let x=wp();x.repeat.set(r/.12,kn/.12);let g=new bt({map:x,color:12896716,transparent:!0,depthWrite:!1,side:_e,roughness:.6,metalness:.3}),p=new Et(new ce(r,kn),g);p.position.set(o,a+kn/2,c),t.add(p);let _=x.clone();_.repeat.set(r/.12,Jr/.12);let y=new Et(new ce(r,Jr),g.clone());y.material.map=_,y.position.set(o,a+kn+m/2,c+d/2),y.rotation.x=-Oa,t.add(y);let v=es();for(let[A,b]of[[a+kn-.03,c],[a+kn/2,c],[a+kn+m-.03,c+d]])v.add(r,.05,.05,e.steelDark,o,A,b,{castShadow:!1});v.build(t,"fence-rails")}function Km(i){let{root:t,materials:e,addBox:n}=i,s=i.layout,r=new ae;r.name="gantry",t.add(r);let o=s.gantryX,a=s.pitWallZ-.5,c=s.straightZ+11,l=c-a+1,h=(a+c)/2,u=new bt({color:5067879,roughness:.55,metalness:.5}),f=es();for(let p of[a,c])f.add(.6,9,.6,u,o,0,p);for(let p of[-.55,.55])f.add(.3,.3,l,u,o+p,8.2,h);f.add(.3,.3,l,u,o,9.3,h);for(let p=a;p<c;p+=1.2)for(let _ of[-1,1])f.add(.1,1.45,.1,u,o+_*.28,8.15,p+.3,{pitch:.55*_}),f.add(1.1,.08,.08,u,o,8.3,p,{castShadow:!1});let d=new bt({color:1842721,roughness:.4});for(let p=0;p<4;p++)f.add(.3,.9,1.6,d,o-.2,7.2,s.straightZ-3+p*2);f.build(r,"gantry");let m=ue.asphalt+.001,x=ue.paint-m,g=ue.lines-m;n(.8,x,14,e.line,o,m,s.straightZ,t,!1);for(let p=0;p<10;p++){let _=o+12+p*8,y=s.straightZ+(p%2?3.2:-3.2);n(.18,x,2.6,e.line,_,m,y,t,!1),n(2.2,g,.18,e.line,_+1.1,m,y+1.3,t,!1),n(2.2,g,.18,e.line,_+1.1,m,y-1.3,t,!1)}}var jm=new Vt,Qm=new we,t0=new on,g2=new L,x2=new L,_2=new Ot;function Ee(i,t,e,n,s=!0){let r=new Ue(t,e,n.length);return n.forEach((o,a)=>{t0.set(o.rx||0,o.ry||0,o.rz||0),Qm.setFromEuler(t0),jm.compose(x2.set(o.x,o.y||0,o.z),Qm,g2.set(o.sx||1,o.sy||1,o.sz||1)),r.setMatrixAt(a,jm),o.c!=null&&r.setColorAt(a,_2.set(o.c))}),r.castShadow=s,r.receiveShadow=!0,i.root.add(r),r}function y2(i){let{root:t,materials:e}=i,n=i.layout,s=n.paddock,r=new ce(s.x1-s.x0,s.z1-s.z0);r.rotateX(-Math.PI/2);let o=r.attributes.uv;for(let l=0;l<o.count;l++)o.setXY(l,o.getX(l)*(s.x1-s.x0)/12,o.getY(l)*(s.z1-s.z0)/12);let a=new Et(r,e.pitAsphalt);a.position.set((s.x0+s.x1)/2,ue.paddock,(s.z0+s.z1)/2),a.receiveShadow=!0,t.add(a);for(let[l,h,u,f]of v2){let d=new Et(new ce(h-l,f-u),e.pitAsphalt);d.rotation.x=-Math.PI/2,d.position.set((l+h)/2,ue.paddock,(u+f)/2),d.receiveShadow=!0,t.add(d)}let c=n.garageFrontZ-n.garageDepth;i.addAoStrip(n.pitX0,c,n.pitX1,c,2.6,-1,.05)}var v2=[[-100,120,166,169.25],[69,91,169.25,174],[75,93,174,185.5],[-64.5,-55.5,25,96]];function M2(){return{unitBox:new Ie(1,1,1),paint:new bt({color:16777215,roughness:.42,metalness:.25}),darkGlass:new bt({color:1910316,roughness:.08,metalness:.85}),rubber:new bt({color:1579291,roughness:.92})}}var n0=151,e0=[2830133,16118766,10200234,1842721,15131612,3817544,16118766,6648666];function S2(i,t){let{materials:e}=i,n=n0,s=[],r=[],o=[],a=[],c=[],l=[],h=[],u=[],f=0,d=[],m=[],x=[];for(let g=-156;g<=66;g+=24,f++){let p=e0[f%e0.length];s.push({x:g,y:.95+1.95,z:n,sx:15.5,sy:3.9,sz:2.55,c:p}),f%3===1&&u.push({x:g,y:1.55,z:n-1.285,sx:15.3,sy:.18,sz:.02,c:15282981});for(let _ of[-1,1])u.push({x:g,y:3.6,z:n+_*1.285,sx:15.3,sy:.32,sz:.02,c:f%2?1909031:15282981});m.push({x:g,y:4.87,z:n,sx:15.6,sy:.06,sz:2.62});for(let _ of[-1,1])d.push({x:g+1.6,y:.62,z:n+_*1.2,sx:8.6,sy:.55,sz:.06});d.push({x:g-7.76,y:2.9,z:n,sx:.04,sy:3.7,sz:.04}),r.push({x:g+9.35,y:.9+1.45,z:n,sx:2.6,sy:2.9,sz:2.5,c:f%2?16118766:10200234}),r.push({x:g+9.1,y:4.18,z:n,sx:2.2,sy:.75,sz:2.4,rz:.28,c:f%2?16118766:10200234}),d.push({x:g+10.68,y:1.05,z:n,sx:.12,sy:.35,sz:2.5}),d.push({x:g+10.67,y:1.75,z:n,sx:.05,sy:.7,sz:1.5}),o.push({x:g+10.67,y:3,z:n,sx:.05,sy:.95,sz:2.2});for(let _ of[-1,1])o.push({x:g+9.6,y:3.05,z:n+_*1.255,sx:1.3,sy:.75,sz:.02});for(let _ of[-6.1,-4.8,-3.5,7.7,9.9])a.push({x:g+_,y:.5,z:n,rx:Math.PI/2,sy:2.6}),x.push({x:g+_,y:.5,z:n,rx:Math.PI/2,sx:.32,sy:2.62,sz:.32});c.push({x:g-.5,y:3.7,z:n-1.28-2.35,sx:13.6,sy:.1,sz:4.7,rx:-.05});for(let _ of[-6.6,0,6.6])l.push({x:g-.5+_,y:1.8,z:n-1.28-4.55,sy:3.6});h.push({x:g+1.5,y:.05,z:n,rx:-Math.PI/2,sx:20,sy:4.4}),h.push({x:g-.5,y:.052,z:n-3.6,rx:-Math.PI/2,sx:14,sy:5.2})}Ee(i,t.unitBox,t.paint,s),Ee(i,t.unitBox,t.paint,r),Ee(i,t.unitBox,t.darkGlass,o,!1),Ee(i,t.unitBox,new bt({color:16777215,roughness:.5}),u,!1),Ee(i,t.unitBox,t.rubber,d,!1),Ee(i,t.unitBox,e.steel,m,!1),Ee(i,new jt(.5,.5,1,16),t.rubber,a),Ee(i,new jt(1,1,1,10),e.steel,x,!1),Ee(i,t.unitBox,e.roofW,c),Ee(i,new jt(.05,.05,1,6),e.steel,l),Ee(i,new ce(1,1),e.contact,h,!1).renderOrder=1}function b2(i,t){let{materials:e}=i,n=n0,s=[],r=[],o=[],a=[],c=[],l=[],h=0;for(let u=-156;u<=66;u+=24,h++){for(let f of[-4.5,-3.2])o.push({x:u+f,y:.5,z:n-2.2,sx:1.1,sy:1,sz:.6}),a.push({x:u+f,y:.82,z:n-2.505,sx:1.12,sy:.07,sz:.02});if(c.push({x:u+2,y:.74,z:n-3.2,sx:1.8,sy:.04,sz:.75}),l.push({x:u-3.85,y:.054,z:n-2.2,rx:-Math.PI/2,sx:3.4,sy:1.6}),h%2===0){let f=u+5.5,d=n-9.5;s.push({x:f,y:2.75,z:d,ry:Math.PI/4,sx:2.12,sy:.7,sz:2.12});for(let[m,x]of[[-1,-1],[1,-1],[-1,1],[1,1]])r.push({x:f+m*1.45,y:1.2,z:d+x*1.45,sy:2.4});l.push({x:f,y:.054,z:d,rx:-Math.PI/2,sx:3.6,sy:3.6})}}Ee(i,new Dr(1,1,4,1,!0),e.roofW,s),Ee(i,new jt(.03,.03,1,5),e.steel,r,!1),Ee(i,t.unitBox,i.materials.toolChest,o),Ee(i,t.unitBox,e.red,a,!1),Ee(i,t.unitBox,e.white,c),Ee(i,new ce(1,1),e.contact,l,!1).renderOrder=1}function w2(i,t){let{materials:e}=i,n=[],s=[],r=[],o=[];for(let a=0;a<6;a++){let c=-28+a*16.5,l=100.5;n.push({x:c,y:1.6,z:l,sx:14.6,sy:3.2,sz:5}),r.push({x:c,y:3.3,z:l+.35,sx:15.4,sy:.18,sz:6.2}),n.push({x:c-2.2,y:4.85,z:l-.6,sx:8.6,sy:2.9,sz:3.6}),r.push({x:c-2.2,y:6.4,z:l-.45,sx:9.6,sy:.16,sz:4.4}),s.push({x:c,y:1.75,z:l+2.53,sx:12.8,sy:1.9,sz:.04}),s.push({x:c-2.2,y:4.9,z:l+1.23,sx:8,sy:2.1,sz:.04}),o.push({x:c,y:.05,z:l+2.6,rx:-Math.PI/2,sx:16,sy:4})}Ee(i,t.unitBox,e.white,n),Ee(i,t.unitBox,e.white,r),Ee(i,t.unitBox,i.glazingMaterial(1.5),s,!1),Ee(i,new ce(1,1),e.contact,o,!1).renderOrder=1}function A2(i){let{root:t,materials:e,addBox:n}=i;for(let[s,r]of[[-140,116],[-100,116],[72,117]]){let o=new Et(new Dr(13,3.2,4,1,!0),e.roofW);o.rotation.y=Math.PI/4,o.position.set(s,5.6,r),o.castShadow=!0,t.add(o);for(let[a,c]of[[-1,-1],[1,-1],[-1,1],[1,1]])n(.25,4.2,.25,e.steel,s+a*8.5,0,r+c*8.5,t)}}function E2(i,t){let e=[],n=[];for(let s=0;s<18;s++){let r=-158+s*13.1+s%3*1.7,o=145.4-s%2*.8,a=2+s%3;for(let c=0;c<a;c++)e.push({x:r,y:.16+c*.31,z:o,sx:.66,sy:.3,sz:.66});n.push({x:r+2.4,y:.45,z:o+.3,sx:1.2,sy:.9,sz:.8,c:s%2?1842721:10200234})}Ee(i,new jt(.5,.5,1,18),t.rubber,e),Ee(i,t.unitBox,t.paint,n)}function T2(i){let t=[];for(let r=0;r<7;r++)t.push({x:-7.4,y:ue.paddockLines,z:126.1-r*3.2,sx:5.8,sz:.12});t.push({x:-10.3,y:ue.paddockLines,z:126.1-3*3.2,sx:.12,sz:6*3.2+.12});let e=new bt({color:15263974,roughness:.6,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2}),n=new ce(1,1).rotateX(-Math.PI/2),s=Ee(i,n,e,t,!1);s.name="paddock-bay-lines",s.renderOrder=0}function R2(i){let{root:t,materials:e,addBox:n}=i,s=i.layout.paddock;for(let r=0;r<4;r++)n(.4,22,.4,e.steel,s.x0+10+r*90,0,s.z0-5,t),n(3,.6,1.2,e.steelDark,s.x0+10+r*90,22,s.z0-5,t)}function i0(i){y2(i);let t=M2();S2(i,t),w2(i,t),A2(i),E2(i,t),b2(i,t),T2(i),R2(i)}var cu=13,s0=.04,Ba=4,za=.6;function l0(i){let{root:t,materials:e,addBox:n}=i,s=i.layout,r=new Un,o=s.garageFrontZ,a=s.pitWallZ;r.moveTo(s.pitX0-140,-a),r.lineTo(s.pitX1+150,-a),r.lineTo(s.pitX1+150,-o),r.lineTo(s.pitX0-140,-o),r.closePath();let c=new zr(r);c.rotateX(-Math.PI/2);let l=new Et(c,e.pitAsphalt);l.position.y=.025,l.receiveShadow=!0,t.add(l);let h=c.attributes.uv,u=c.attributes.position;for(let x=0;x<u.count;x++)h.setXY(x,u.getX(x)/12,u.getZ(x)/12);let f=(s.pitX0+s.pitX1)/2,d=ue.pitLane+.001,m=ue.lines-d;n(s.pitX1-s.pitX0+260,m,.25,e.line,f,d,s.garageFrontZ+6,t,!1),n(s.pitX1-s.pitX0+300,1.1,.7,C2(),f,0,s.pitWallZ+.35),n(s.pitX1-s.pitX0+300,.08,.9,I2(),f,1.1,s.pitWallZ+.35);for(let[x,g]of[[s.pitX1+150,s.pitX1+260],[s.pitX0-140,s.pitX0-250]]){let p=new Un;p.moveTo(x,-(s.garageFrontZ+.5)),p.lineTo(x,-s.pitWallZ),p.lineTo(g,-(s.straightZ-6.8)),p.lineTo(g,-(s.straightZ-6.8-6)),p.closePath();let _=new zr(p);_.rotateX(-Math.PI/2);let y=new Et(_,e.pitAsphalt);y.position.y=ue.pitMouth,y.receiveShadow=!0,t.add(y)}}var r0=null,o0=null,C2=()=>r0||(r0=new bt({color:9078916,roughness:.92})),I2=()=>o0||(o0=new bt({color:9278102,roughness:.7,metalness:.2}));function P2(i){let t=i.layout;i.addAoStrip(t.pitX0-150,t.pitWallZ,t.pitX1+150,t.pitWallZ,1.4,-1,.05),i.addAoStrip(t.pitX0-150,t.pitWallZ+.7,t.pitX1+150,t.pitWallZ+.7,1.2,1,.06)}function L2(i,t,e){let{materials:n,addAoStrip:s}=i,r=i.layout,o=(p,_,y,v,A,b,w,T)=>e.add(p,_,y,v,A,b,w,T),a=r.boxes*r.boxW,c=(r.pitX0+r.pitX1)/2,l=r.garageFrontZ,h=l-r.garageDepth,u=l-r.garageDepth/2,f=new bt({color:8817043,roughness:.75});o(a,4.6,.4,n.white,c,0,h+.2),o(a+.6,.5,r.garageDepth+2.2,n.white,c,4.6,u+.9);let d=i.glazingMaterial(a/8);d.color.set(12046544),o(a,3.4,r.garageDepth-2,d,c,5.1,u-.4);for(let p=0;p<=r.boxes;p++)o(p%2?.16:.32,3.4,p%2?.45:.7,n.white,r.pitX0+p*r.boxW,5.1,l-1.2);let m=new bt({color:15986404,emissive:16769712,emissiveIntensity:.35,roughness:.6});o(a,.04,.5,m,c,4.56,l+1.2,{castShadow:!1}),o(a+.6,.5,.08,f,c,4.6,l+2.04,{castShadow:!1}),o(a+.6,.55,r.garageDepth+1.6,n.white,c,8.5,u+.4);let x=new bt({color:12570840,transparent:!0,opacity:.35,roughness:.1});o(a,1,.06,x,c,9.05,l+.1,{castShadow:!1}),o(a,.07,.12,n.steel,c,10.05,l+.1);for(let p=r.pitX0;p<=r.pitX1+.01;p+=r.boxW/2)o(.06,1,.06,n.steel,p,9.05,l+.17,{castShadow:!1});let g=11.6;for(let p=r.pitX0+.5;p<=r.pitX1;p+=2*r.boxW)for(let _ of[l-1.2,l-9.2])o(.16,g-9.05,.16,n.steelDark,p,9.05,_);for(let p of[l-1.2,l-9.2])o(a,.35,.25,n.steelDark,c,g,p);for(let p=r.pitX0+.5;p<=r.pitX1;p+=r.boxW)o(.12,.22,8.4,n.steelDark,p,g+.35,l-5.2,{castShadow:!1});o(a+1,.12,9.6,n.roofW,c,g+.57,l-5.2);for(let p=0;p<r.boxes;p++){let _=r.pitX0+p*r.boxW,y=_+r.boxW/2;o(.35,4.6,r.garageDepth,n.white,_,0,u),o(za,4.6,.45,n.white,_,0,l+.05),o(za+.04,.35,.49,f,_,0,l+.05,{castShadow:!1});let v=r.boxW-za;o(v,4.6-Ba,.3,f,y,Ba,l-.1);for(let b of[-1,1])o(.14,Ba,.32,f,y+b*(v/2-.07),0,l-.12,{castShadow:!1});if(p===cu)continue;let A=p%7===3?1.2:p%5===1?2.2:0;o(v-.28,Ba-A,.12,n.shutter,y,A,l-.35),A>0&&o(v-.28,A,.1,n.interior,y,0,l-6,{castShadow:!1})}o(.35,4.6,r.garageDepth,n.white,r.pitX1,0,u),o(za,4.6,.45,n.white,r.pitX1,0,l+.05),s(r.pitX0,l+.28,r.pitX1,l+.28,3.2,1,.05,t),P2(i)}var a0=null,c0=()=>a0||(a0=new bt({color:1776670,roughness:.95}));function D2(i,t,e){let{materials:n,addBox:s,addAoStrip:r}=i,o=i.layout,a=o.garageFrontZ,c=a-o.garageDepth,l=o.pitX0+cu*o.boxW+o.boxW/2;s(o.boxW-.4,s0-.02,o.garageDepth-.4,n.floor,l,.02,a-o.garageDepth/2,t,!1),s(o.boxW-.4,3.9,.1,n.interior,l,0,c+.45,t,!1);let h=new bt({color:1777446,roughness:.6});e.add(o.boxW-.9,2.4,.04,h,l,1,c+.52,{castShadow:!1}),e.add(o.boxW-.9,.18,.05,n.red,l,1.55,c+.53,{castShadow:!1});let u=n.toolChest;for(let m of[-1,1]){e.add(.7,1.05,1.6,u,l+m*2.55,0,c+3.2),e.add(.72,.06,1.62,n.red,l+m*2.55,.85,c+3.2,{castShadow:!1});for(let x=0;x<4;x++){let g=new Et(new jt(.33,.33,.3,20),c0());g.position.set(l-m*2.3,.15+x*.31,c+5.6+(m>0?0:1.2)),g.castShadow=!0,t.add(g)}}e.add(1.6,1,.6,n.red,l+1.6,0,c+1.3),e.add(.9,.55,.6,n.red,l-1.2,0,a-7.5);let f=new la(16767400,60,16,1.6);f.position.set(l,3.6,a-6),t.add(f);let d=new Ae({color:16774108});s(o.boxW-1.2,.06,.5,d,l,4.2,a-5,t,!1),s(o.boxW-1.2,.06,.5,d,l,4.2,a-11,t,!1),s(2.4,1,.06,n.steelDark,l,2.4,c+.56,t,!1);for(let m=0;m<2;m++){let x=new Et(new jt(.34,.34,.32,22),c0());x.rotation.z=Math.PI/2,x.position.set(l+1.6+m*.36,.36,a-4.2),x.castShadow=!0,t.add(x)}s(1.1,.08,.7,n.steel,l+1.78,.1,a-4.2,t,!1),r(l-o.boxW/2+.2,c+.5,l+o.boxW/2-.2,c+.5,2.4,1,.045,t),r(l-o.boxW/2+.2,c+.5,l-o.boxW/2+.2,a,1.4,-1,.045,t),r(l+o.boxW/2-.2,c+.5,l+o.boxW/2-.2,a,1.4,1,.045,t),i.root.userData.openBox={x:l,z:a,floorY:s0}}function N2(i,t,e){let{materials:n,addBox:s,addAoStrip:r}=i,o=i.layout,a=o.towerX,c=o.garageFrontZ-7;s(18,16,15,n.white,a,0,c,t);let l=i.glazingMaterial(2.4);l.color.set(10470596),s(18.6,4.2,15.6,l,a,16,c,t),s(19.4,.6,16.4,n.white,a,20.2,c,t),s(20.4,.25,17.4,n.white,a,15.75,c,t);let h=new bt({color:5395290,roughness:.55,metalness:.15}),u=i.glazingMaterial(2.2);u.color.set(11128012);for(let f=0;f<3;f++){let d=3.4+f*4.2;e.add(13,1.6,.1,u,a+2.4,d,c+7.55,{castShadow:!1});for(let m of[-1,1])e.add(.1,1.6,11.5,u,a+m*9.05,d,c,{castShadow:!1});e.add(18.5,.35,15.5,n.white,a,d+2.25,c,{castShadow:!1})}e.add(4.2,15.75,.1,h,a-6.6,0,c+7.55),e.add(4.2,4.6,3.2,h,a-6.4,20.8,c+3.5),e.add(6,2.2,5,n.concreteDark,a+3,20.8,c-2);for(let[f,d,m]of[[-4,-5,9],[5.5,-5.5,6.5]])e.add(.12,m,.12,n.steel,a+f,20.8,c+d);e.add(1.6,.08,.08,n.steel,a-4,28.2,c-5,{castShadow:!1});for(let f=0;f<3;f++)e.add(.08,7,.08,n.steel,a+6+f*1.5,20.8,c+6.5);r(a-9,c+7.5,a+9,c+7.5,2.4,1,.05,t),r(a+9,c-7.5,a+9,c+7.5,2.4,-1,.05,t),i.root.userData.tower=new L(a,18,c)}function U2(i,t){let e=i.layout,n=e.garageFrontZ,s=[],r=[];for(let l=0;l<e.boxes;l++){if(l===cu)continue;let h=e.pitX0+l*e.boxW+e.boxW-.95;s.push([h,.42,n+.75,.13,.62,.13]),r.push([h,.12,n+.75,.5,.06,.34])}let o=[];for(let l of[e.pitX0-30,e.pitX1+30])for(let h=0;h<6;h++)o.push([l+(l<0?-h:h)*6,.25,n+6.4,.18,.5,.18]);let a=new Vt,c=(l,h,u)=>{let f=new Ue(l,h,u.length);u.forEach(([d,m,x,g,p,_],y)=>f.setMatrixAt(y,a.makeScale(g,p,_).setPosition(d,m,x))),f.castShadow=!0,f.receiveShadow=!0,t.add(f)};c(new jt(1,1,1,10),i.materials.red,s),c(new jt(1,1,1,8),new bt({color:1579291,roughness:.6}),r),c(new jt(.15,1,1,10),new bt({color:15231519,roughness:.6}),o)}function F2(i,t){let e=i.layout;for(let n=0;n<6;n++)$r(i,e.pitX0+18+n*34,9,e.garageFrontZ+.2,n%2?16118766:15282981,t)}function h0(i){let t=new ae;t.name="pits",i.root.add(t);let e=es();L2(i,t,e),D2(i,t,e),N2(i,t,e),e.build(t,"pit-building"),U2(i,t),F2(i,t)}var ns=new Uint8Array(512);{let i=Me(7),t=[...Array(256).keys()];for(let e=255;e>0;e--){let n=Math.floor(i()*(e+1));[t[e],t[n]]=[t[n],t[e]]}for(let e=0;e<512;e++)ns[e]=t[e&255]}var u0=i=>i*i*i*(i*(i*6-15)+10),ka=(i,t,e)=>(i&1?-t:t)+(i&2?-e:e);function O2(i,t){let e=Math.floor(i)&255,n=Math.floor(t)&255;i-=Math.floor(i),t-=Math.floor(t);let s=u0(i),r=u0(t),o=ns[e]+n,a=ns[e+1]+n,c=(l,h,u)=>l+(h-l)*u;return c(c(ka(ns[o],i,t),ka(ns[a],i-1,t),s),c(ka(ns[o+1],i,t-1),ka(ns[a+1],i-1,t-1),s),r)}function Kr(i,t,e=4){let n=.5,s=1,r=0;for(let o=0;o<e;o++)r+=n*O2(i*s,t*s),n*=.5,s*=2.03;return r}var Wa=4200,Xa=3e3,is=120,jr=90,B2=-.05,d0=(i,t)=>Math.hypot(i/1.15,t*1.25);function z2(i,t){let e=Bt((d0(i,t)-720)/900,0,1);return e*e*(40+Kr(i/420,t/420,4)*90)+B2}var Ha=Wa/is,Ga=Xa/jr,Va=null;function p0(){if(!Va){Va=new Float64Array((is+1)*(jr+1));for(let i=0;i<=jr;i++)for(let t=0;t<=is;t++)Va[i*(is+1)+t]=z2(-Wa/2+t*Ha,-Xa/2+i*Ga)}return Va}function m0(i,t){let e=p0(),n=Bt((i+Wa/2)/Ha,0,is-1e-9),s=Bt((t+Xa/2)/Ga,0,jr-1e-9),r=Math.floor(n),o=Math.floor(s),a=n-r,c=s-o,l=is+1,h=e[o*l+r],u=e[(o+1)*l+r],f=e[o*l+r+1];if(a+c<=1)return[h+(f-h)*a+(u-h)*c,(f-h)/Ha,(u-h)/Ga];let d=e[(o+1)*l+r+1];return[d+(u-d)*(1-a)+(f-d)*(1-c),(d-u)/Ha,(d-f)/Ga]}var Qr=(i,t)=>m0(i,t)[0];function g0(i,t){let[,e,n]=m0(i,t);return Math.hypot(e,n)}function x0(i){let t=new ce(Wa,Xa,is,jr);t.rotateX(-Math.PI/2);let e=t.attributes.position,n=p0();for(let c=0;c<e.count;c++)e.setY(c,n[c]);t.computeVertexNormals();let s=[],r=new Ot(9409656),o=new Ot;for(let c=0;c<e.count;c++){let l=e.getX(c),h=e.getZ(c),u=1+Kr(l/260,h/260,3)*.14,f=Bt((d0(l,h)-720)/500,0,1);o.setRGB(u,u,u).lerp(r,f),s.push(o.r,o.g,o.b)}t.setAttribute("color",new kt(s,3));let a=new Et(t,i.materials.ground);a.receiveShadow=!0,a.name="ground",i.root.add(a)}var f0=-2.35,k2=.22;function _0(i){let t=new ae;t.name="hills";for(let e=0;e<3;e++){let n=2300+e*350,s=new jt(n,n,1,220,1,!0),r=s.attributes.position;for(let a=0;a<r.count;a++){let c=r.getX(a),l=r.getZ(a);if(r.getY(a)>0){let h=Math.atan2(l,c),u=70+Kr(h*3+e*7,e,4)*150+Math.max(0,Kr(h*9,3+e,2))*90,f=Math.abs(Math.atan2(Math.sin(h-f0),Math.cos(h-f0)));u+=Math.max(0,1-f/k2)*(e===1?260:150),r.setY(a,u)}else r.setY(a,-20)}s.computeVertexNormals();let o=new bt({color:[6254423,8227708,10464688][e],roughness:1,side:_e,fog:!0});t.add(new Et(s,o))}i.root.add(t)}var V2=1,v0=.5,H2=15,G2=.8,W2=.5,X2=7,y0=6.5,Y2=40,q2=12.5,Z2=33.5,$2=17,J2=25,K2=.02,j2=25,Q2=42,tA=35,hu=i=>Math.atan2(Math.sin(i),Math.cos(i));function eA(i,t,e){let n=i.length,s=new Float64Array(n*e),r=new Float64Array(n*e),o=(a,c)=>Math.max(1e-6,Math.sqrt(Math.hypot(i[c]-i[a],t[c]-t[a])));for(let a=0;a<n;a++){let c=(a-1+n)%n,l=(a+1)%n,h=(a+2)%n,u=o(c,a),f=u+o(a,l),d=f+o(l,h);for(let m=0;m<e;m++){let x=u+(f-u)*m/e,g=(p,_,y,v)=>((v-x)*p+(x-y)*_)/(v-y);for(let[p,_]of[[i,s],[t,r]]){let y=g(p[c],p[a],0,u),v=g(p[a],p[l],u,f),A=g(p[l],p[h],f,d),b=g(y,v,0,f),w=g(v,A,u,d);_[a*e+m]=g(b,w,u,f)}}}return{x:s,z:r}}function lu(i,t,e){let n=i.length,s=new Float64Array(n+1);for(let l=0;l<n;l++)s[l+1]=s[l]+Math.hypot(i[(l+1)%n]-i[l],t[(l+1)%n]-t[l]);let r=s[n],o=Math.round(r/e),a=new Float64Array(o),c=new Float64Array(o);for(let l=0,h=0;l<o;l++){let u=l*r/o;for(;s[h+1]<u;)h++;let f=(u-s[h])/(s[h+1]-s[h]||1);a[l]=i[h]+(i[(h+1)%n]-i[h])*f,c[l]=t[h]+(t[(h+1)%n]-t[h])*f}return{x:a,z:c,spacing:r/o,length:r}}function nA(i,t){let{x:e,z:n}=i;for(let s=0;s<10;s++){let r=e.length,o=i.spacing,a=new Float64Array(r);for(let _=0;_<r;_++)a[_]=Math.atan2(n[(_+1)%r]-n[_],e[(_+1)%r]-e[_]);let c=new Float64Array(r);for(let _=0;_<r;_++)c[_]=hu(a[_]-a[(_-1+r)%r]);let l=o/t,h=0;for(let _=0;_<r;_++)h=Math.max(h,Math.abs(c[_]));if(h<=l*1.001)break;let u=l*.98,f=Float64Array.from(c);for(let _=0;_<r;_++){if(Math.abs(f[_])<=u)continue;let y=Math.sign(f[_]),v=Math.abs(f[_])-u;f[_]=y*u;for(let A=1;v>1e-12&&A<r/2;A++)for(let b of[(_+A)%r,(_-A+r)%r]){let w=u-y*f[b];if(w<=0)continue;let T=Math.min(w,v/2+1e-15,v);f[b]+=y*T,v-=T}}let d=Math.round(60/o),m=0;for(;m<r&&Math.abs(f[m]-c[m])>1e-12;)m++;let x=[];for(let _=m;_<m+r;_++){if(Math.abs(f[_%r]-c[_%r])<=1e-12)continue;let y=x[x.length-1];y&&_-d<=y[1]+d?y[1]=_+d:x.push([_-d,_+d])}let g=Float64Array.from(e),p=Float64Array.from(n);for(let[_,y]of x){let v=D=>(D%r+r)%r,A=a[v(_-1)],b=e[v(_)],w=n[v(_)],T=y-_,S=new Float64Array(T+1),M=new Float64Array(T+1);for(let D=0;D<=T;D++)S[D]=b,M[D]=w,A+=f[v(_+D)],b+=Math.cos(A)*o,w+=Math.sin(A)*o;let C=e[v(y)]-S[T],N=n[v(y)]-M[T];for(let D=0;D<=T;D++){let I=Pe(D/T);g[v(_+D)]=S[D]+C*I,p[v(_+D)]=M[D]+N*I}}i=lu(g,p,v0),e=i.x,n=i.z}return i}function iA(i){let t=Float64Array.from(i,p=>p.x),e=Float64Array.from(i,p=>p.y),n=eA(t,e,32),s=lu(n.x,n.z,v0),r=nA(s,H2),{x:o,z:a,spacing:c,length:l}=lu(r.x,r.z,V2),h=o.length,u=new Float64Array(h),f=new Float64Array(h),d=new Float64Array(h),m=new Float64Array(h),x=new Float64Array(h),g=new Float64Array(h);for(let p=0;p<h;p++){let _=(p+1)%h,y=(p-1+h)%h,v=o[_]-o[y],A=a[_]-a[y],b=Math.hypot(v,A)||1;u[p]=v/b,f[p]=A/b,d[p]=-f[p],m[p]=u[p],x[p]=p*c;let w=Math.atan2(a[p]-a[y],o[p]-o[y]),T=Math.atan2(a[_]-a[p],o[_]-o[p]);g[p]=hu(T-w)/c}return{x:o,z:a,tx:u,tz:f,nx:d,nz:m,s:x,curvature:g,count:h,spacing:c,length:l}}function sA(i){let{count:t,curvature:e,spacing:n}=i,s={};for(let r of[1,-1]){let o=new Float64Array(t);for(let c=0;c<t;c++){let l=Math.max(r*e[c],r*e[(c+1)%t],r*e[(c-1+t)%t]);o[c]=l>0?G2/l:1/0}let a=W2*n;for(let c=0;c<2;c++){for(let l=1;l<=t;l++)o[l%t]=Math.min(o[l%t],o[(l-1)%t]+a);for(let l=t-1;l>=-1;l--)o[(l+t)%t]=Math.min(o[(l+t)%t],o[(l+1)%t]+a)}s[r]=o}return s}function rA(i){let{count:t,x:e,z:n,spacing:s}=i,r=Math.round(q2/s),o=new Float64Array(t);for(let a=0;a<t;a++){let c=(a-r+t)%t,l=(a+r)%t,h=Math.atan2(n[a]-n[c],e[a]-e[c]),u=Math.atan2(n[l]-n[a],e[l]-e[a]);o[a]=hu(u-h)}return o}function oA(i,t){let e=i.length,n=Math.round(Z2/t),s=new Float64Array(e);for(let r=0;r<e;r++){let o=0;for(let a=-n;a<=n;a++)o=Math.max(o,Math.abs(i[(r+a+e)%e]));s[r]=Bt((o-.025)/.05,0,1)}return s}function aA(i,t,e){let n=i.length,s=c=>i[(c%n+n)%n]>.5,r=0;for(;r<n&&s(r);)r++;let o=[];for(let c=r;c<r+n;c++){if(!s(c))continue;let l=c;for(;l+1<r+n&&s(l+1);)l++;(l-c+1)*e>$2&&o.push({first:c,last:l,subCorners:[]}),c=l}let a=Math.round(J2/e);for(let c of o){let l=[];for(let d=c.first;d<=c.last;d++)l.push(Math.abs(t[d%n])>K2?Math.sign(t[d%n]):0);for(let d=0;d<2;d++)for(let m=0;m<l.length;m++){let x=d?l.length-1-m:m,g=d?x+1:x-1;!l[x]&&g>=0&&g<l.length&&l[g]&&(l[x]=l[g])}for(let d=0;d<l.length;d++)l[d]||(l[d]=1);let h=[];for(let d=0;d<l.length;d++)h.length&&h[h.length-1].direction===l[d]?h[h.length-1].length++:h.push({direction:l[d],length:1});let u=!0;for(;u&&h.length>1;){u=!1;let d=-1;for(let x=0;x<h.length;x++)h[x].length<a&&(d<0||h[x].length<h[d].length)&&(d=x);if(d<0)break;let m=d===0?1:d===h.length-1||h[d-1].length>=h[d+1].length?d-1:d+1;h[m].length+=h[d].length,h.splice(d,1);for(let x=h.length-1;x>0;x--)h[x].direction===h[x-1].direction&&(h[x-1].length+=h[x].length,h.splice(x,1));u=!0}let f=c.first;for(let d of h)c.subCorners.push({first:f,last:f+d.length-1,direction:d.direction}),f+=d.length}return o}function cA(i,t,e){let n=Math.round(j2/e),s=Math.round(Q2/e),r=Math.round(tA/e),o={1:new Uint8Array(t),[-1]:new Uint8Array(t)};for(let l of i)for(let h of l.subCorners)for(let u=h.first;u<=h.last;u++)o[h.direction][u%t]=1;let a={1:new Uint8Array(t),[-1]:new Uint8Array(t)};for(let l of i)l.subCorners.forEach((h,u)=>{let f=-h.direction,d=h.first-(u===0?n:0),m=h.last+(u===l.subCorners.length-1?s:0);for(let x=h.first;x<=h.last;x++)a[f][x%t]=1;for(let x=h.first-1;x>=d&&!o[f][(x%t+t)%t];x--)a[f][(x%t+t)%t]=1;for(let x=h.last+1;x<=m&&!o[f][x%t];x++)a[f][x%t]=1});for(let l of[1,-1]){let h=a[l],u=0;for(;u<t&&!h[u];)u++;if(u!==t)for(let f=u;f<u+t;f++){if(h[f%t])continue;let d=f;for(;d+1<u+t&&!h[(d+1)%t];)d++;let m=d-f+1<=r;for(let x=f;m&&x<=d;x++)o[l][x%t]&&(m=!1);if(m)for(let x=f;x<=d;x++)h[x%t]=1;f=d}}let c=[];for(let l of[1,-1]){let h=a[l],u=0;for(;u<t&&h[u];)u++;if(u===t){c.push({side:l,first:0,last:t});continue}for(let f=u;f<u+t;f++){if(!h[f%t])continue;let d=f;for(;d+1<u+t&&h[(d+1)%t];)d++;c.push({side:l,first:f,last:d}),f=d}}return c}function lA(i){let{count:t,x:e,z:n,spacing:s}=i,r=new Float64Array(t);for(let c=0;c<t;c++)r[c]=Math.abs(n[c]-Zr.straightZ)<1.5&&e[c]<470&&e[c]>-540?1:0;let o=Math.round(Y2/s/2),a=new Float64Array(t);for(let c=0;c<t;c++){let l=0;for(let h=-o;h<=o;h++)l+=r[(c+h+t)%t];a[c]=y0+(X2-y0)*Pe(l/(2*o+1))}return a}function hA(i){let t=iA(i),e=sA(t),n=rA(t),s=oA(n,t.spacing),r=aA(s,n,t.spacing);return{line:t,count:t.count,halfWidth:lA(t),turn:n,cornerness:s,corners:r,gravel:cA(r,t.count,t.spacing),edge(o,a){let c=e[a>0?1:-1][o];return a>c?c:a<-c?-c:a}}}var to=60;function uA(i){let t=new Map;for(let e=0;e<i.length;e++){let n=Math.floor(i[e].x/to)+","+Math.floor(i[e].y/to);t.has(n)||t.set(n,[]),t.get(n).push(i[e])}return(e,n)=>{let s=Math.floor(e/to),r=Math.floor(n/to),o=1e12;for(let a=-1;a<=1;a++)for(let c=-1;c<=1;c++){let l=t.get(s+a+","+(r+c));if(l)for(let h of l){let u=(h.x-e)**2+(h.y-n)**2;u<o&&(o=u)}}return o===1e12?to*1.5:Math.sqrt(o)}}function fA(i,t){let e=Zr;return i>e.paddock.x0-30&&i<e.paddock.x1+30&&t>e.paddock.z0-20&&t<e.straightZ+60||i>e.grandstandX0-40&&i<e.grandstandX1+40&&t>e.straightZ&&t<e.grandstandZ+40}function M0(i){return{model:hA(i),count:i.length,distanceToTrack:uA(i),isKeepClearZone:fA}}var dA=.01,Ya=.3,ss=(i,t)=>(i%t+t)%t,eo=(i,t,e)=>typeof i=="function"?i(t,e):i;function qa(i,t,e,n){let{line:s}=i,r=n-e+1,o=new Float64Array(r*2),a=new Float64Array(r),c=0;for(let l=0;l<r;l++){let h=ss(e+l,s.count),u=i.edge(h,eo(t,h,e+l));a[l]=u;let f=s.x[h]+s.nx[h]*u,d=s.z[h]+s.nz[h]*u;l>0&&(f-o[2*l-2])*s.tx[h]+(d-o[2*l-1])*s.tz[h]<dA&&(f=o[2*l-2],d=o[2*l-1],c++),o[2*l]=f,o[2*l+1]=d}return{points:o,offsets:a,held:c}}function S0(i,t,e){let n=(r,o,a,c,l,h)=>(c-o)*(l-r)-(a-r)*(h-o),s=0;for(let r=0;r+1<i.length/2;r++){let[o,a,c,l]=[i[2*r],i[2*r+1],i[2*r+2],i[2*r+3]],[h,u,f,d]=[t[2*r],t[2*r+1],t[2*r+2],t[2*r+3]],m=n(o,a,c,l,h,u),x=n(h,u,c,l,f,d);(m*e<-1e-9||x*e<-1e-9)&&(i[2*r+2]=o,i[2*r+3]=a,t[2*r+2]=h,t[2*r+3]=u,s++)}return s}function uu(i,t,e=0,n=[]){for(let s=0;s<i;s++){let r=e+s*2;t?n.push(r,r+2,r+1,r+1,r+2,r+3):n.push(r,r+1,r+2,r+1,r+3,r+2)}return n}function b0(i,t,e,n,s,r){let o=new se;return o.setAttribute("position",new kt(i,3)),o.setAttribute("normal",new kt(t,3)),o.setAttribute("uv",new kt(e,2)),o.setIndex(n),o.userData.range=s,o.userData.repairs=r,o}var pA=(i,t)=>t||[0,i.line.count];function rs(i,t,e,{range:n=null,y:s=0,vScale:r=1,uvAcross:o=[0,1],heightA:a=0,heightB:c=0,skirtB:l=null}={}){let{line:h}=i,[u,f]=pA(i,n),d=ss(u,h.count),m=eo(t,d,u)>eo(e,d,u),x=qa(i,t,u,f),g=qa(i,e,u,f),p=S0(x.points,g.points,m?1:-1),_=[],y=[],v=[];for(let b=0;b<=f-u;b++){let w=ss(u+b,h.count),T=x.offsets[b],S=g.offsets[b];_.push(x.points[2*b],s+a,x.points[2*b+1],g.points[2*b],s+c,g.points[2*b+1]);let M=(c-a)/(Math.abs(S-T)||1),C=S>T?1:-1,N=Math.hypot(M,1),D=-M*C*h.nx[w]/N,I=-M*C*h.nz[w]/N;y.push(D,1/N,I,D,1/N,I);let B=b*h.spacing*r;v.push(o[0],B,o[1],B)}let A=uu(f-u,m);if(l!==null){let b=_.length/3,w=g.offsets[0]>x.offsets[0]?1:-1;for(let T=0;T<=f-u;T++){let S=ss(u+T,h.count),M=g.points[2*T],C=g.points[2*T+1];_.push(M,s+c,C,M,l,C);let N=w*h.nx[S],D=w*h.nz[S];y.push(N,0,D,N,0,D);let I=T*h.spacing*r;v.push(o[1],I,o[1],I)}uu(f-u,w<0,b,A)}return b0(_,y,v,A,[u,f],{held:x.held+g.held,collapsed:p})}function w0(i,t,[e,n],s,r){let{line:o}=i,a=Math.sign(eo(t,ss(e,o.count),e))||1,c=qa(i,t,e,n),l=qa(i,(g,p)=>eo(t,g,p)+a*Ya,e,n),h=S0(c.points,l.points,-a),u=[],f=[],d=[],m=[],x=[[c,c,0,s,0,1,-1],[l,l,s,0,1,0,1],[c,l,s,s,.96,1,0]];for(let[g,p,_,y,v,A,b]of x){let w=u.length/3;for(let T=0;T<=n-e;T++){let S=ss(e+T,o.count);u.push(g.points[2*T],_,g.points[2*T+1],p.points[2*T],y,p.points[2*T+1]);let M=b*a*o.nx[S],C=b*a*o.nz[S],N=b?0:1;f.push(M,N,C,M,N,C);let D=T*o.spacing*r;d.push(D,v,D,A)}uu(n-e,a<0,w,m)}for(let[g,p]of[[0,-1],[n-e,1]]){let _=ss(e+g,o.count),y=u.length/3,[v,A,b,w]=[c.points[2*g],c.points[2*g+1],l.points[2*g],l.points[2*g+1]];u.push(v,0,A,v,s,A,b,s,w,b,0,w);let T=p*o.tx[_],S=p*o.tz[_];f.push(T,0,S,T,0,S,T,0,S,T,0,S);let M=Ya*r;d.push(0,0,0,1,M,1,M,0),a*p>0?m.push(y,y+1,y+2,y,y+2,y+3):m.push(y,y+2,y+1,y,y+3,y+2)}return b0(u,f,d,m,[e,n],{held:c.held+l.held,collapsed:h})}function fu(i,t,e,n,s,r){let o=s-e,a=r-n,c=o*o+a*a,l=c>0?Math.max(0,Math.min(1,((i-e)*o+(t-n)*a)/c)):0;return Math.hypot(i-e-l*o,t-n-l*a)}function mA(i,t,e,n,s,r,o,a){let c=(s-e)*(a-n)-(o-e)*(r-n);if(Math.abs(c)>1e-12){let l=Math.sign(c),h=((s-e)*(t-n)-(i-e)*(r-n))*l,u=((o-s)*(t-r)-(i-s)*(a-r))*l,f=((e-o)*(t-a)-(i-o)*(n-a))*l;if(h>=0&&u>=0&&f>=0)return 0}return Math.min(fu(i,t,e,n,s,r),fu(i,t,s,r,o,a),fu(i,t,o,a,e,n))}function Za(){let i=new Map,t=[],e=[],n=(r,o)=>(r+32768)*65536+(o+32768);function s(r,o,a,c,l,h){let u=t.length;t.push(r),e.push(...o);for(let f=Math.floor(a/8);f<=Math.floor(l/8);f++)for(let d=Math.floor(c/8);d<=Math.floor(h/8);d++){let m=n(f,d),x=i.get(m);x||i.set(m,x=[]),x.push(u)}}return{get size(){return t.length},addTriangle(r,o,a,c,l,h){s(0,[r,o,a,c,l,h],Math.min(r,a,l),Math.min(o,c,h),Math.max(r,a,l),Math.max(o,c,h))},addSegment(r,o,a,c){this.addTriangle(r,o,a,c,a,c)},addDisc(r,o,a){s(1,[r,o,a,0,0,0],r-a,o-a,r+a,o+a)},distance(r,o,a){let c=1/0,l=new Set;for(let h=Math.floor((r-a)/8);h<=Math.floor((r+a)/8);h++)for(let u=Math.floor((o-a)/8);u<=Math.floor((o+a)/8);u++){let f=i.get(n(h,u));if(f)for(let d of f){if(l.has(d))continue;l.add(d);let m=d*6,x=t[d]===1?Math.hypot(r-e[m],o-e[m+1])-e[m+2]:mA(r,o,e[m],e[m+1],e[m+2],e[m+3],e[m+4],e[m+5]);x<c&&(c=x)}}return c}}}var A0=1.6,nr=5.5,gA=24,R0=31.4,xA=.95,E0=nr+3,$a=1.5,_A=15,yA=25,vA=20,MA=4,SA=3;function bA(i,t){let e=o=>t.halfWidth[o],{length:n}=t.line,s=rs(t,e,o=>-e(o),{y:ue.asphalt,vScale:Math.round(n/12)/n,uvAcross:[0,14/12]}),r=new Et(s,i.materials.asphalt);r.receiveShadow=!0,r.name="track",i.root.add(r)}function wA(){let i=document.createElement("canvas");i.width=64,i.height=4;let t=i.getContext("2d"),e=t.createLinearGradient(0,0,64,0);return e.addColorStop(0,"rgba(0,0,0,0)"),e.addColorStop(.35,"rgba(0,0,0,1)"),e.addColorStop(.65,"rgba(0,0,0,1)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,64,4),new xn(i)}function AA(i,t){let{materials:e}=i;e.rubber.map=wA(),e.rubber.opacity=.2;let n=o=>Bt(t.turn[o]*12,-2.2,2.2),s=rs(t,o=>2.6+n(o),o=>-3.4+n(o),{y:ue.rubber}),r=new Et(s,e.rubber);r.renderOrder=1,i.root.add(r)}function EA(i,t){Object.assign(i.materials.line,{polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2});for(let e of[1,-1]){let n=rs(t,r=>e*(t.halfWidth[r]-.15),r=>e*(t.halfWidth[r]-.45),{y:ue.lines}),s=new Et(n,i.materials.line);s.receiveShadow=!0,i.root.add(s)}}function TA(i,t){let{materials:e,root:n}=i,{halfWidth:s}=t;for(let o of t.corners){let a=[o.first,o.last];for(let c of[1,-1]){let l=rs(t,f=>c*s[f],f=>c*(s[f]+A0),{range:a,y:ue.kerbInner,vScale:.16666666666666666,heightB:ue.kerbOuter-ue.kerbInner,skirtB:ue.runoff}),h=new Et(l,e.kerb);h.receiveShadow=!0,n.add(h);let u=rs(t,f=>c*(s[f]+A0),f=>c*(s[f]+nr),{range:a,y:ue.runoff});n.add(new Et(u,e.runoff))}}let r=Za();for(let{side:o,first:a,last:c,width:l}of RA(t)){let h=rs(t,f=>o*(s[f]+nr),(f,d)=>o*(s[f]+nr+l[d-a]),{range:[a,c],y:ue.gravel,vScale:.1});CA(r,h);let u=new Et(h,e.gravel);u.receiveShadow=!0,n.add(u)}for(let{side:o,first:a,last:c}of IA(t,r)){let l=w0(t,u=>o*(s[u]+R0),[a,c],xA,.14285714285714285),h=new Et(l,e.barrier);h.castShadow=!0,h.receiveShadow=!0,n.add(h)}}function T0(i,t){let e=i.length,n=new Float64Array(e),s=0;for(let r=-t;r<=t;r++)s+=i[(r+e)%e];for(let r=0;r<e;r++)n[r]=s/(2*t+1),s+=i[(r+t+1)%e]-i[(r-t+e)%e];return n}function RA(i){let{line:t,halfWidth:e}=i,n=t.count,s=Math.round(yA/2/t.spacing),r=Float64Array.from(i.cornerness,c=>Bt(c,.3,1)),o=T0(T0(r,s),s),a=[];for(let{side:c,first:l,last:h}of i.gravel){let u=h-l+1,f=Math.min(vA,.3*(u-1)*t.spacing),d=new Float64Array(u),m=new Uint8Array(u);for(let _=0;_<u;_++){let y=(l+_)%n,v=gA*o[y],A=Math.min(MA,v),b=Math.min(_,u-1-_)*t.spacing,w=A+(v-A)*Pe(Bt(b/f,0,1)),T=Math.abs(i.edge(y,c*(e[y]+nr))),S=Math.abs(i.edge(y,c*(e[y]+nr+w)))-T;d[_]=Math.min(w,S),m[_]=d[_]>=SA?1:0}let x=du(m,2);if(!x.length)continue;let[g,p]=x.reduce((_,y)=>y[1]-y[0]>_[1]-_[0]?y:_);a.push({side:c,first:l+g,last:l+p,width:d.subarray(g,p+1)})}return a}function CA(i,t){let e=t.attributes.position,n=t.index;for(let s=0;s<n.count;s+=3){let[r,o,a]=[n.getX(s),n.getX(s+1),n.getX(s+2)];i.addTriangle(e.getX(r),e.getZ(r),e.getX(o),e.getZ(o),e.getX(a),e.getZ(a))}}function du(i,t){let e=[];for(let n=0;n<i.length;n++){if(!i[n])continue;let s=n;for(;s+1<i.length&&i[s+1];)s++;s-n+1>=t&&e.push([n,s]),n=s}return e}function IA(i,t){let{line:e,halfWidth:n}=i,s=e.count,r=Math.ceil(_A/e.spacing)+1,o=Za();for(let u=0;u<s;u++)o.addDisc(e.x[u],e.z[u],n[u]);let a=(u,f)=>{let d=u*(n[f]+R0),m=d+u*Ya;return[d,m].map(x=>[e.x[f]+e.nx[f]*x,e.z[f]+e.nz[f]*x,x])},c=[];for(let{side:u,first:f,last:d}of i.gravel){let m=new Uint8Array(d-f+1);for(let x=0;x<m.length;x++){let g=(f+x)%s;m[x]=a(u,g).every(([p,_,y])=>i.edge(g,y)===y&&o.distance(p,_,E0)>=E0&&t.distance(p,_,$a)>=$a)?1:0}for(let[x,g]of du(m,r))c.push({side:u,first:f+x,last:f+g})}c.sort((u,f)=>f.last-f.first-(u.last-u.first)||u.first-f.first);let l=Za(),h=[];for(let{side:u,first:f,last:d}of c){let m=new Uint8Array(d-f+1);for(let v=0;v<m.length;v++)m[v]=a(u,(f+v)%s).every(([A,b])=>l.distance(A,b,$a)>=$a)?1:0;let x=du(m,r);if(!x.length)continue;let[g,p]=x.reduce((v,A)=>A[1]-A[0]>v[1]-v[0]?A:v),_={side:u,first:f+g,last:f+p};h.push(_);let y=null;for(let v=_.first;v<=_.last;v++){let A=a(u,v%s);if(y)for(let b=0;b<2;b++)l.addSegment(y[b][0],y[b][1],A[b][0],A[b][1]);(v===_.first||v===_.last)&&l.addSegment(A[0][0],A[0][1],A[1][0],A[1][1]),y=A}}return h.sort((u,f)=>f.side-u.side||u.first-f.first)}function C0(i,t){let{model:e}=t;i.root.userData.trackModel=e,bA(i,e),AA(i,e),EA(i,e),TA(i,e)}var I0=new Ot(1,1,1),pu=6,oi=64,PA=.45,P0=.15,L0=30;function N0(i){let t=e=>{let n=new bt({vertexColors:!0,roughness:.92,metalness:0});return Cn(n,"vegetation-"+e,i,{vertex:{head:`attribute float aLeaf;
attribute float aLodFade;
varying float vEnvLeaf;
varying float vEnvFade;
`,fog_vertex:`
        #include <fog_vertex>
        vEnvFade = aLodFade;
        vEnvLeaf = aLeaf;`},fragmentHead:`varying float vEnvLeaf;
varying float vEnvFade;
`,fragment:{clipping_planes_fragment:`
        #include <clipping_planes_fragment>
        {
          float n = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
          if (${e==="near"?"n < vEnvFade":"n >= vEnvFade"}) discard;
        }`,map_fragment:`
        {
          vec3 p = vEnvPos;
          if (vEnvLeaf > 0.5) {
            float a = texture(envNoise, vec2(p.x + p.y * 0.6, p.z - p.y * 0.6) / 2.4).r;
            float b = texture(envNoise, vec2(p.x - p.y * 0.4, p.z + p.y * 0.5) / 9.0).g;
            float c = texture(envNoise, vec2(p.x + p.y * 0.3, p.z + p.y * 0.7) / 5.3).g;
            diffuseColor.rgb *= (0.72 + 0.56 * a) * (0.88 + 0.24 * b) * (0.8 + 0.35 * c);
          } else {
            diffuseColor.rgb *= 0.86 + 0.28 * texture(envNoise, vec2((p.x + p.z) / 0.7, p.y / 6.0)).g;
          }
        }`}})};return{near:t("near"),far:t("far")}}var D0=(i,t,e)=>{let n=Math.max(0,Math.min(1,(e-i)/(t-i)));return n*n*(3-2*n)};function U0(i,t,e,{name:n,fadeStart:s,fadeEnd:r,castShadow:o}){let{count:a,matrices:c,colors:l,x:h,y:u,z:f}=e,d=Math.max(1,a),m=new Ue(i.far,t.far,d);m.name=n+"-far",m.count=a,m.instanceMatrix.array.set(c),m.instanceMatrix.needsUpdate=!0,m.setColorAt(0,I0),m.instanceColor.array.set(l),m.instanceColor.needsUpdate=!0,m.castShadow=!1,m.receiveShadow=!0,m.computeBoundingSphere();let x=new wi(new Float32Array(d).fill(1),1);i.far.setAttribute("aLodFade",x);let g=1/0,p=1/0,_=-1/0,y=-1/0;for(let R=0;R<a;R++)g=Math.min(g,h[R]),_=Math.max(_,h[R]),p=Math.min(p,f[R]),y=Math.max(y,f[R]);a||(g=p=_=y=0);let v=Math.max(1,Math.ceil((_-g)/oi)+1),A=Math.max(1,Math.ceil((y-p)/oi)+1),b=new Int32Array(v*A+1),w=new Int32Array(a),T=R=>Math.floor((f[R]-p)/oi)*v+Math.floor((h[R]-g)/oi);for(let R=0;R<a;R++)b[T(R)+1]++;for(let R=0;R<v*A;R++)b[R+1]+=b[R];let S=b.slice(0,v*A);for(let R=0;R<a;R++)w[S[T(R)]++]=R;let M=r+2*pu,C=Math.ceil(2*M/oi)+1,N=1;for(let R=0;R<A;R++)for(let E=0;E<v;E++){let O=0;for(let G=R;G<Math.min(A,R+C);G++)for(let K=E;K<Math.min(v,E+C);K++){let Y=G*v+K;O+=b[Y+1]-b[Y]}N=Math.max(N,O)}let D=new wi(new Float32Array(N),1);i.near.setAttribute("aLodFade",D);let I=new Ue(i.near,t.near,N);I.name=n+"-near",I.count=0,I.setColorAt(0,I0),I.castShadow=o,I.receiveShadow=!0;let B=I.instanceMatrix.array,U=I.instanceColor.array,z=D.array,k=x.array,J=new Map([I.instanceMatrix,I.instanceColor,D].map(R=>[R,{start:0,count:0}])),j=(R,E)=>{let O=J.get(R);O.count=E,R.updateRanges.includes(O)||R.updateRanges.push(O),R.needsUpdate=!0},$=new Float32Array(a).fill(1),Z=new Uint8Array(a).fill(1),ut=new Int32Array(N),q=new Int32Array(N),it=0,st=new Uint8Array(a),dt=r-s,yt=s+dt*(.5+P0),Lt=s+dt*(.5-P0),zt=s+dt*.5,Yt=Math.min(r-1,Math.max(yt+.5,r-6)),at=Math.max(s-6+1,Math.min(Lt-.5,s)),pt=1/0,F=1/0,It=1/0,ht=1/0,wt=1/0,nt=1/0;function Tt(R,E,O){pt=R,F=E,It=O;let G=q;q=ut,ut=G,it=I.count;let K=0,Y=M*M,Mt=Math.max(0,Math.floor((R-M-g)/oi)),gt=Math.min(v-1,Math.floor((R+M-g)/oi)),ct=Math.max(0,Math.floor((O-M-p)/oi)),Pt=Math.min(A-1,Math.floor((O+M-p)/oi));for(let mt=0;mt<it;mt++)st[q[mt]]=0;for(let mt=ct;mt<=Pt&&K<N;mt++)for(let Ct=Mt;Ct<=gt&&K<N;Ct++){let rt=mt*v+Ct;for(let vt=b[rt];vt<b[rt+1]&&K<N;vt++){let Ft=w[vt],Rt=h[Ft]-R,Nt=u[Ft]-E,V=f[Ft]-O;if(!(Rt*Rt+Nt*Nt+V*V>Y)){for(let St=0;St<16;St++)B[K*16+St]=c[Ft*16+St];U[K*3]=l[Ft*3],U[K*3+1]=l[Ft*3+1],U[K*3+2]=l[Ft*3+2],ut[K]=Ft,st[Ft]=1,K++}}}let ot=!1;for(let mt=0;mt<it;mt++){let Ct=q[mt];st[Ct]||$[Ct]===1||($[Ct]=k[Ct]=1,Z[Ct]=1,ot=!0)}ot&&(x.needsUpdate=!0),I.count=K,j(I.instanceMatrix,K*16),j(I.instanceColor,K*3),I.computeBoundingSphere()}function H(R,E,O,G=0,K=!1){let Y=R-ht,Mt=E-wt,gt=O-nt,ct=K||!(Y*Y+Mt*Mt+gt*gt<L0*L0);ht=R,wt=E,nt=O;let Pt=R-pt,ot=E-F,mt=O-It;Pt*Pt+ot*ot+mt*mt>=pu*pu&&Tt(R,E,O);let Ct=G>0?G/PA:0,rt=!1,vt=!1,Ft=I.count;for(let Rt=0;Rt<Ft;Rt++){let Nt=ut[Rt],V=h[Nt]-R,St=u[Nt]-E,tt=f[Nt]-O,lt=Math.sqrt(V*V+St*St+tt*tt),xt;ct?(Z[Nt]=lt<zt?0:1,xt=Z[Nt]):(lt>yt?Z[Nt]=1:lt<Lt&&(Z[Nt]=0),xt=$[Nt],xt=Z[Nt]?Math.min(1,xt+Ct):Math.max(0,xt-Ct),xt=Math.min(Math.max(xt,D0(Yt,r,lt)),D0(s-6,at,lt))),(xt!==$[Nt]||z[Rt]!==xt)&&($[Nt]=xt,z[Rt]=xt,rt=!0),k[Nt]!==xt&&(k[Nt]=xt,vt=!0)}rt&&j(D,Ft),vt&&(x.needsUpdate=!0)}return{far:m,near:I,update:H,level:$,get nearCount(){return I.count}}}var In=new L,Ja=new Ot,no=null,mu={};function LA(i){if(!mu[i]){let t=new sa(1,i);t.deleteAttribute("uv"),t.deleteAttribute("normal"),mu[i]=Od(t)}return mu[i]}function O0(i,t,e,n,s){let r=new se;return r.setAttribute("position",new kt(i,3)),r.setAttribute("normal",new kt(t,3)),r.setAttribute("color",new kt(e,3)),r.setAttribute("aLeaf",new kt(n,1)),r.setIndex(s),r}function De(i,{centre:t,radii:e,detail:n,jitter:s=.18,colour:r,crown:o,crownScale:a,crownSize:c,aoBottom:l=.45}){no?.clumps.push({centre:t,radii:e,jitter:s});let h=LA(n),u=h.attributes.position,f=[],d=[],m=[],x=[],g=.9+i()*.2;for(let p=0;p<u.count;p++){let _=u.getX(p),y=u.getY(p),v=u.getZ(p),A=1+(i()-.5)*2*s,b=t[0]+_*e[0]*A,w=t[1]+y*e[1]*A,T=t[2]+v*e[2]*A;f.push(b,w,T),In.set((b-o[0])/a[0],(w-o[1])/a[1],(T-o[2])/a[2]),In.normalize();let S=[_/e[0],y/e[1],v/e[2]],M=Math.hypot(S[0],S[1],S[2])||1,C=.65;In.set(In.x*C+S[0]/M*(1-C),In.y*C+S[1]/M*(1-C),In.z*C+S[2]/M*(1-C)),In.normalize(),d.push(In.x,In.y,In.z);let N=Math.max(0,Math.min(1,(o[1]-w)/c[1]+.35)),D=1-Math.min(1,Math.hypot((b-o[0])/c[0],(T-o[2])/c[2])),I=(1-l*N)*(1-.3*D)*g;Ja.set(r),m.push(Ja.r*I,Ja.g*I,Ja.b*I),x.push(1)}return O0(f,d,m,x,Array.from(h.index.array))}function dn(i,t,e,n,s=null,r=null){no?.tubes.push({points:i,radii:t});let o=[],a=[],c=[],l=[],h=[],u=new Ot(n),f=s!=null?new Ot(s):u,d=[];for(let m=0;m<=e;m++)d.push(s!=null&&r&&r()<.4?1:0);for(let m=0;m<i.length;m++){let[x,g,p]=i[m],_=i[Math.min(i.length-1,m+1)],y=i[Math.max(0,m-1)],v=In.set(_[0]-y[0],_[1]-y[1],_[2]-y[2]).normalize(),A=Math.abs(v.y)<.99?new L(0,1,0).cross(v).normalize():new L(1,0,0),b=new L().crossVectors(v,A).normalize(),w=.75+.25*Math.min(1,g/3);for(let T=0;T<=e;T++){let S=T/e*Math.PI*2,M=A.x*Math.cos(S)+b.x*Math.sin(S),C=A.y*Math.cos(S)+b.y*Math.sin(S),N=A.z*Math.cos(S)+b.z*Math.sin(S);o.push(x+M*t[m],g+C*t[m],p+N*t[m]),a.push(M,C,N);let D=d[T]?f:u;c.push(D.r*w,D.g*w,D.b*w),l.push(0)}}for(let m=0;m<i.length-1;m++)for(let x=0;x<e;x++){let g=m*(e+1)+x,p=g+e+1;h.push(g,p,g+1,g+1,p,p+1)}return O0(o,a,c,l,h)}var Pi=(i,t)=>({crown:i,crownScale:t,crownSize:t});function io(i,t,{centre:e,ring:n,y:s,radius:r,flatten:o,colour:a,detail:c,crown:l,phase:h=0,ySpread:u=0}){let f=[];for(let d=0;d<t;d++){let m=h+d/t*Math.PI*2+(i()-.5)*.5,x=n*(.85+i()*.3),g=r*(.85+i()*.3);f.push(De(i,{centre:[e[0]+Math.cos(m)*x,s+(i()-.5)*2*u,e[2]+Math.sin(m)*x],radii:[g,g*o,g],detail:c,colour:a,...l}))}return f}function DA(i){let t=Me(11),e=i>0,n=11.4,s=Pi([.6,n,.2],[6.2,1.7,6.2]),r=4016676,o=[];if(e){o.push(dn([[0,0,0],[.15,3,.05],[.35,6,.1],[.5,8.6,.15]],[.34,.27,.23,.2],7,7031349));for(let[a,c]of[[-2.6,1.4],[2.9,-.4],[.6,-2.8]])o.push(dn([[.5,8.4,.15],[.5+a*.5,9.6,.15+c*.5],[.5+a,n-.6,.15+c]],[.17,.12,.08],5,7031349));o.push(De(t,{centre:[.6,n+.3,.2],radii:[3.2,1.25,3.2],detail:1,colour:r,...s})),o.push(...io(t,8,{centre:[.6,0,.2],ring:3.9,y:n,radius:2.4,flatten:.52,colour:r,detail:1,crown:s,ySpread:.35})),o.push(...io(t,4,{centre:[.6,0,.2],ring:1.8,y:n+.9,radius:2.1,flatten:.5,colour:4543274,detail:1,crown:s,phase:.4}))}else o.push(dn([[0,0,0],[.5,10.2,.15]],[.3,.2],3,7031349)),o.push(De(t,{centre:[.6,n+.35,.2],radii:[3.6,1.4,3.6],detail:0,jitter:.1,colour:3819041,...s})),o.push(...io(t,5,{centre:[.6,0,.2],ring:3.6,y:n,radius:2.7,flatten:.5,colour:3621663,detail:0,crown:s,ySpread:.25}));return Ke(o)}function NA(i){let t=Me(23),e=i>0,n=Pi([0,15.5,0],[3.4,3.6,3.4]),s=[];if(e){s.push(dn([[0,0,0],[.3,5,.1],[.1,10,.3],[.4,17,.2]],[.32,.26,.2,.1],6,6177843));for(let r=0;r<7;r++){let o=12+r*1.05+(t()-.5)*.6,a=r*2.4+t(),c=(1-(o-12)/9)*2.2+.6,l=[Math.cos(a)*c*.8,o,Math.sin(a)*c*.8];s.push(dn([[.2,o-.7,.25],l],[.09,.05],4,6177843)),s.push(De(t,{centre:l,radii:[1.9+t()*.6,1,1.9+t()*.6],detail:1,colour:3029538,...n}))}s.push(De(t,{centre:[.4,18.4,.2],radii:[1.4,1.1,1.4],detail:1,colour:3424298,...n}))}else{s.push(dn([[0,0,0],[.4,14,.2]],[.28,.14],3,6177843));for(let[r,o,a,c]of[[.9,13.4,.5,2.6],[-.8,15.6,-.4,2.3],[.4,17.8,.2,1.7]])s.push(De(t,{centre:[r,o,a],radii:[c,c*.55,c],detail:0,jitter:.15,colour:2832160,...n}))}return Ke(s)}function UA(i){let t=Me(37),e=i>0,n=Pi([0,20,0],[4,6.5,4]),s=[[0,0,0],[-.2,6,.1],[.1,13,-.1],[.3,20,.2],[.2,25.5,.1]],r=l=>{for(let h=1;h<s.length;h++)if(l<=s[h][1]){let[u,f,d]=s[h-1],[m,x,g]=s[h],p=(l-f)/(x-f);return[u+(m-u)*p,l,d+(g-d)*p]}return s[s.length-1]},o=[];for(let l=0;l<9;l++){let h=12+l*1.35+(t()-.5)*.5,u=l*2.4+(t()-.5)*.6,f=(3.4-l*.2)*(.85+t()*.3),d=f*(.75+t()*.35),m=r(h),x=[m[0]+Math.cos(u)*f*.5,h+d*.42,m[2]+Math.sin(u)*f*.5],g=[m[0]+Math.cos(u)*f,h+d,m[2]+Math.sin(u)*f];o.push({start:m,mid:x,end:g,size:1.25+t()*.35,side:.85+t()*.25})}let a=[],c=5201480;if(e){a.push(dn(s,[.42,.34,.27,.18,.08],7,13222835,8019525,t));for(let{start:l,mid:h,end:u,size:f,side:d}of o)a.push(dn([l,h,u],[.13,.09,.05],4,12433062)),a.push(De(t,{centre:u,radii:[f,f*.85,f],detail:1,jitter:.22,colour:c,...n})),a.push(De(t,{centre:[h[0],h[1]+.2,h[2]],radii:[d,d*.8,d],detail:1,jitter:.22,colour:5662030,...n}));a.push(De(t,{centre:[.2,25.2,.1],radii:[1.2,1.4,1.2],detail:1,jitter:.2,colour:c,...n}))}else{a.push(dn([s[0],s[3]],[.38,.16],3,13222835));for(let{end:l,size:h}of o){let u=h*1.12;a.push(De(t,{centre:l,radii:[u,u*.85,u],detail:0,jitter:.15,colour:4674623,...n}))}a.push(De(t,{centre:[.2,25.2,.1],radii:[1.3,1.5,1.3],detail:0,jitter:.12,colour:4674623,...n}))}return Ke(a)}function FA(i){let t=Me(41),e=i>0,n=Pi([0,5.4,0],[4.1,3,4.1]),s=[];if(e)s.push(dn([[0,0,0],[.2,1.6,.1],[.1,3.4,-.1],[0,4.6,0]],[.36,.3,.22,.15],6,5917244)),s.push(De(t,{centre:[0,5.6,0],radii:[2.8,2.3,2.8],detail:1,colour:2831136,...n})),s.push(...io(t,6,{centre:[0,0,0],ring:2.5,y:5,radius:2,flatten:.85,colour:3094564,detail:1,crown:n,ySpread:.7})),s.push(De(t,{centre:[.4,7.2,-.3],radii:[1.8,1.4,1.8],detail:1,colour:3423783,...n}));else{s.push(dn([[0,0,0],[.1,3.4,-.1]],[.32,.2],3,5917244));for(let[r,o,a,c]of[[0,5.9,0,2.9],[1.9,5,.9,2.2],[-1.7,5.1,-1.1,2.2]])s.push(De(t,{centre:[r,o,a],radii:[c,c*.8,c],detail:0,jitter:.12,colour:2765343,...n}))}return Ke(s)}function OA(i){let t=Me(53),e=i>0,n=Pi([0,6.5,0],[1.4,6,1.4]),s=[];if(e){s.push(dn([[0,0,0],[0,1.4,0]],[.2,.18],5,5127216));for(let r=0;r<6;r++){let o=2+r*1.75,a=1.35*(1-r/7.5);s.push(De(t,{centre:[(t()-.5)*.2,o,(t()-.5)*.2],radii:[a,1.25,a],detail:1,jitter:.2,colour:2503202,...n}))}}else s.push(De(t,{centre:[0,4.6,0],radii:[1.3,3.6,1.3],detail:0,jitter:.08,colour:2305568,...n})),s.push(De(t,{centre:[0,9.2,0],radii:[.9,2.6,.9],detail:0,jitter:.08,colour:2437153,...n}));return Ke(s)}function BA(i){let t=Me(67),e=i>0,n=Pi([0,.45,0],[1.2,.6,1.2]),s=[];return e?(s.push(De(t,{centre:[0,.42,0],radii:[.85,.55,.85],detail:1,jitter:.28,colour:5394975,aoBottom:.6,...n})),s.push(...io(t,6,{centre:[0,0,0],ring:.8,y:.32,radius:.5,flatten:.85,colour:5921322,detail:0,crown:n,ySpread:.12}))):s.push(De(t,{centre:[0,.4,0],radii:[1.25,.62,1.25],detail:0,jitter:.1,colour:5066015,aoBottom:.6,...n})),Ke(s)}function zA(i){let t=Me(79),e=i>0,n=Pi([0,.9,0],[.9,1,.9]),s=[];s.push(De(t,{centre:[0,.8,0],radii:[.85,.95,.85],detail:i,jitter:.25,colour:7040565,aoBottom:.5,...n}));let r=e?7:3;for(let o=0;o<r;o++){let a=o/r*Math.PI*2+t(),c=.25+t()*.35,l=[Math.cos(a)*c,2.6+t()*.6,Math.sin(a)*c];e&&s.push(dn([[0,1.2,0],l],[.02,.015],3,10853492)),s.push(De(t,{centre:l,radii:[.12,.42,.12],detail:0,jitter:.1,colour:15261643,aoBottom:.1,...Pi(l,[.3,.5,.3])}))}return Ke(s)}var F0={stonePine:DA,maritimePine:NA,eucalyptus:UA,holmOak:FA,cypress:OA,scrub:BA,pampas:zA};function B0(i){no={clumps:[],tubes:[]};let t=F0[i](1),e=no;no=null;let n=F0[i](0);t.computeBoundingBox(),n.computeBoundingBox(),n.boundingBox.union(t.boundingBox),t.computeBoundingSphere(),n.computeBoundingSphere();let s=n.boundingBox,r=Math.max(-s.min.x,s.max.x,-s.min.z,s.max.z);return{near:t,far:n,radius:r,height:s.max.y,parts:e}}var sr={trees:5200,scrub:4200,pampas:60,tufts:9e3},z0={high:[105,140],mid:[80,105],low:[48,62]},k0={high:[42,66],mid:[32,50],low:[20,30]},as={tree:25,scrub:8,tuft:1.2},Ka={tree:1.5,scrub:.6,tuft:.4},ir=[{name:"stonePine",share:.33,scale:[.8,1.25],lean:.08},{name:"eucalyptus",share:.24,scale:[.75,1.2],lean:.03},{name:"holmOak",share:.25,scale:[.75,1.3],lean:.03},{name:"maritimePine",share:.15,scale:[.8,1.2],lean:.05},{name:"cypress",share:.03,scale:[.85,1.2],lean:.01}],V0={high:464728694,mid:2786073173,low:799962821},gu=1520,sn=(i,t,e)=>Pe(Bt((e-i)/(t-i),0,1)),so=(i,t)=>Math.hypot(i/1.15,t*1.25),_u=(i,t)=>sn(Yr[0],Yr[1],Xe(0,i/1730+.31,t/1730+.77)*.45+Xe(0,i/523,t/523)*.35+Xe(1,i/151+.5,t/151+.5)*.2),xu=g0,os=2048;function Y0(i,t){let e=1/0,n=-1/0;for(let a=0;a<t;a++)e=Math.min(e,i[a]),n=Math.max(n,i[a]);let s=new Float64Array(os),r=new Float64Array(os),o=n>e?os/(n-e):0;for(let a=0;a<t;a++){let c=Math.min(os-1,Math.floor((i[a]-e)*o));s[c]++,r[c]+=i[a]}for(let a=0;a<os;a++)s[a]&&(r[a]/=s[a]);return{counts:s,means:r}}function kA(i,t,e,n){let{counts:s,means:r}=Y0(i,t),o=0,a=1e6;for(let l=0;l<40;l++){let h=(o+a)/2,u=0;for(let f=0;f<os;f++)u+=s[f]*Math.min(1,r[f]*h);u>e?a=h:o=h}let c=[];for(let l=0;l<t;l++)n()<Math.min(1,i[l]*o)&&c.push(l);return c}function VA(i,t,e,n,s){let{counts:r,means:o}=Y0(i,e),a=-1,c=2;for(let f=0;f<24;f++){let d=(a+c)/2,m=0;for(let x=0;x<os;x++)m+=r[x]*sn(d-.03,d+.03,o[x]);m>n*.88?a=d:c=d}let l=0;for(let f=0;f<e;f++)l+=t[f]*(1-sn(c-.03,c+.03,i[f]));let h=l>0?Math.min(1,n*.12/l):0,u=[];for(let f=0;f<e;f++){let d=sn(c-.03,c+.03,i[f]);s()<d+(1-d)*t[f]*h&&u.push(f)}return u}function ja(i){return{count:0,matrices:new Float32Array(i*16),colors:new Float32Array(i*3),x:new Float32Array(i),y:new Float32Array(i),z:new Float32Array(i),scale:new Float32Array(i)}}var H0=new Vt,G0=new we,W0=new on,HA=new L,GA=new L;function Qa(i,t,e,n,{yaw:s,leanX:r,leanZ:o,sx:a,sy:c,sz:l,r:h,g:u,b:f,scale:d}){let m=i.count++;W0.set(r,s,o,"YXZ"),G0.setFromEuler(W0),H0.compose(GA.set(t,e,n),G0,HA.set(a,c,l)),H0.toArray(i.matrices,m*16),i.colors[m*3]=h,i.colors[m*3+1]=u,i.colors[m*3+2]=f,i.x[m]=t,i.y[m]=e,i.z[m]=n,i.scale[m]=d}function tc(i){let t=i.count;return{count:t,matrices:i.matrices.slice(0,t*16),colors:i.colors.slice(0,t*3),x:i.x.slice(0,t),y:i.y.slice(0,t),z:i.z.slice(0,t),scale:i.scale.slice(0,t)}}function WA(i,t){let e=0;for(let s of i)e+=s;let n=t*e;for(let s=0;s<i.length;s++)if(n-=i[s],n<=0)return s;return i.length-1}function XA(i,t,e,n){let s=Me(4201),r=8/Math.sqrt(Math.max(.35,Math.min(1,n/sr.trees))),o=(Math.floor(3700/r)+1)*(Math.floor(2600/r)+1),a=new Float32Array(o),c=new Float32Array(o),l=new Float32Array(o),h=new Uint8Array(o),u=0;for(let A=0,b=-1300;b<=1300;b+=r,A++)for(let w=0,T=-1850;T<=1850;T+=r,w++){let S=so(T,b);if(S>800&&(w+A)%2||S>gu+10)continue;let M=T+(s()-.5)*r*.75,C=b+(s()-.5)*r*.75,N=so(M,C);if(N>gu||i.infield(M,C))continue;let D=i.trackDistance(M,C);if(D<as.tree-3||t.isKeepClearZone(M,C))continue;let I=Xe(0,M/1400+.13,C/1400+.71)*.55+Xe(1,M/600,C/600)*.25+Xe(2,M/260,C/260)*.2,B=as.tree+12*Xe(1,M/340+.2,C/340+.6),U=B+15+25*Xe(2,M/520+.7,C/520+.1),z=sn(.3,.42,Xe(0,M/210+.5,C/210+.9));I+=.32*z*sn(B,B+4,D)*(1-sn(U-4,U+4,D)),N>700&&(I+=.6*Math.min(.3,xu(M,C))),I-=.2*sn(950,gu,N),a[u]=M,c[u]=C,l[u]=I,h[u]=N<800?1:0,u++}let f=VA(l,h,u,n*1.06,s),d=ir.length,m=new Float32Array(f.length*d),x=new Float64Array(d),g=new Float32Array(d);for(let A=0;A<f.length;A++){let b=a[f[A]],w=c[f[A]],T=i.trackDistance(b,w),S=sn(.5,.7,Xe(1,b/2200+.4,w/2200+.1)),M=so(b,w)>700?Math.min(.3,xu(b,w)):0,C=1-sn(40,70,T);g[0]=1+.6*C,g[1]=.25+3*S,g[2]=1+.8*C,g[3]=1+6*M,g[4]=i.solidDistance(b,w)<45&&T>40?4:.5;let N=0;for(let D=0;D<d;D++)N+=g[D];for(let D=0;D<d;D++)m[A*d+D]=g[D]/N,x[D]+=g[D]/N}let p=ir.map(({share:A},b)=>x[b]>0?A*f.length/x[b]:0),_=Int32Array.from(f.keys());for(let A=_.length-1;A>0;A--){let b=Math.floor(s()*(A+1));[_[A],_[b]]=[_[b],_[A]]}let y=ir.map(()=>ja(f.length)),v=0;for(let A=0;A<_.length&&!(v>=n);A++){let b=_[A],w=a[f[b]],T=c[f[b]];for(let q=0;q<d;q++)g[q]=m[b*d+q]*p[q];let S=WA(g,s()),M=ir[S],C=e[M.name],N=M.scale[0]+s()*(M.scale[1]-M.scale[0]),D=N*(.9+s()*.2),I=N*(.9+s()*.2),B=N*(.88+s()*.24),U=C.radius*Math.max(D,I),z=s()*Math.PI*2,k=(s()-.5)*2*M.lean,J=(s()-.5)*2*M.lean,j=.86+s()*.26;if(!i.clear(w,T,Math.max(as.tree,U*.6),U+Ka.tree))continue;let $=so(w,T)>700?Math.min(.3,xu(w,T)):0,Z=_u(w,T),ut=Qr(w,T)-.12-.5*$;v++,Qa(y[S],w,ut,T,{yaw:z,leanX:k,leanZ:J,sx:D,sy:B,sz:I,r:j*(1+.1*Z),g:j*(1+.02*Z),b:j*(1-.12*Z),scale:N})}return Object.fromEntries(ir.map((A,b)=>[A.name,tc(y[b])]))}function YA(i,t,e,n,s){let r=Me(4307),o=4.5/Math.sqrt(Math.max(.35,Math.min(1,n/sr.scrub))),{x0:a,z0:c,x1:l,z1:h}=i.bounds,u=(Math.floor((l-a)/o)+2)*(Math.floor((h-c)/o)+2),f=new Float32Array(u),d=new Float32Array(u),m=new Float32Array(u),x=0,g=[];for(let y=c;y<=h;y+=o)for(let v=a;v<=l;v+=o){let A=v+(r()-.5)*o*.8,b=y+(r()-.5)*o*.8,w=i.trackDistance(A,b);if(w<as.scrub-3||so(A,b)>1100)continue;let T=sn(.5,.85,Xe(2,A/160,b/160)),S=sn(.4,.62,Xe(0,A/1400+.13,b/1400+.71)),M;if(i.infield(A,b))M=.45*T*sn(14,24,w);else{let N=sn(12,22,w)*(1-sn(45,80,w));M=Math.max(N*(.35+.65*T),.3*T*(.4+.6*S))}t.isKeepClearZone(A,b)&&(M*=.15),M>.001&&(f[x]=A,d[x]=b,m[x++]=M);let C=i.solidDistance(A,b);C>2&&C<9&&w>30&&Xe(1,A/300,b/300)>.6&&g.push([A,b])}let p=ja(n*2);for(let y of kA(m,x,n*1.05,r)){if(p.count>=n)break;let v=f[y],A=d[y],b=.5+r()*r()*.9,w=b*(.8+r()*.5),T=b*(.8+r()*.5),S=b*(.7+r()*.6),M=r()*Math.PI*2,C=.85+r()*.3,N=_u(v,A),D=e.scrub.radius*Math.max(w,T);i.clear(v,A,as.scrub,D+Ka.scrub)&&Qa(p,v,Qr(v,A)-.08,A,{yaw:M,leanX:0,leanZ:0,sx:w,sy:S,sz:T,r:C*(1+.12*N),g:C,b:C*(1-.1*N),scale:b})}let _=ja(s);for(let y=0;y<g.length&&_.count<s;y++){let v=y+Math.floor(r()*(g.length-y));[g[y],g[v]]=[g[v],g[y]];let[A,b]=g[y],w=.85+r()*.35,T=r()*Math.PI*2;i.clear(A,b,as.scrub,e.pampas.radius*w+Ka.scrub)&&Qa(_,A,Qr(A,b)-.05,b,{yaw:T,leanX:0,leanZ:0,sx:w,sy:w,sz:w,r:1,g:1,b:1,scale:w})}return{scrub:tc(p),pampas:tc(_)}}function qA(i,t,e){let n=Me(4409),s=ja(e),{line:r,halfWidth:o}=t,a=(l,h)=>{if(s.count>=e||Xe(2,l/35,h/35)<.42+n()*.2)return;let f=.6+n()*.65,d=n()*Math.PI;if(!i.clear(l,h,as.tuft,.5*f+Ka.tuft))return;let m=_u(l,h),x=(.72+n()*.3)*1.1;Qa(s,l,Qr(l,h),h,{yaw:d,leanX:0,leanZ:0,sx:f,sy:f*(.8+n()*.4),sz:f,r:x*(.7+.55*m),g:x*(.95+.05*m),b:x*(.5+.12*m),scale:f})},c=Math.round(e*.75);for(let l=0;l<c*4&&s.count<c;l++){let h=Math.floor(n()*r.count),f=(n()<.5?-1:1)*(o[h]+2+Math.pow(n(),1.7)*46);a(r.x[h]+r.nx[h]*f,r.z[h]+r.nz[h]*f)}for(let l=0;l<e*6&&s.count<e;l++)a(-620+n()*1100,60+n()*230);return tc(s)}function ZA(i,t,e){let n=[];for(let l=0;l<3;l++){let h=new ce(1,.62);h.translate(0,.31,0),h.rotateY(l*Math.PI/3),n.push(h)}let s=Ke(n),r=s.attributes.normal;for(let l=0;l<r.count;l++)r.setXYZ(l,0,1,0);let o=new bt({map:bp(),alphaTest:.5,alphaToCoverage:i.quality!=="low",side:_e,roughness:1}),a={value:0};Cn(o,"tufts",i.textures.detail,{uniforms:{envTime:a,envTuftFade:{value:new ft(e[0],e[1])}},vertex:{head:`uniform float envTime;
uniform vec2 envTuftFade;
`,begin_vertex:`
      #include <begin_vertex>
      {
        vec3 origin = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
        float keep = 1.0 - smoothstep(envTuftFade.x, envTuftFade.y, distance(origin, cameraPosition));
        float sway = sin(envTime * 1.7 + origin.x * 0.37 + origin.z * 0.23) * 0.12 * uv.y * keep;
        transformed.y *= keep;
        transformed.xz *= keep > 0.001 ? mix(0.35, 1.0, keep) : 0.0;
        transformed.x += sway;
        transformed.z += sway * 0.6;
      }`},fragment:{normal_fragment_begin:`
      float faceDirection = 1.0;
      vec3 normal = normalize(vNormal);
      vec3 nonPerturbedNormal = normal;`}});let c=new Ue(s,o,Math.max(1,t.count));return c.name="grass-tufts",c.count=t.count,c.instanceMatrix.array.set(t.matrices),c.setColorAt(0,new Ot(1,1,1)),c.instanceColor.array.set(t.colors),c.receiveShadow=!0,c.castShadow=!1,c.computeBoundingSphere(),i.root.add(c),{mesh:c,time:a}}var X0={high:[1024,720],mid:[768,540],low:[512,360]},q0=[-1850,-1300,1850,1300];function $A(i,t){let[e,n]=X0[t]||X0.mid,[s,r,o,a]=q0,c=e/(o-s),l=n/(a-r),h=new Float32Array(e*n);for(let{data:d,radius:m,strength:x}of i)for(let g=0;g<d.count;g++){let p=m*d.scale[g]*1.15,_=(d.x[g]-s)*c,y=(d.z[g]-r)*l,v=Math.max(1.5,p*c),A=Math.max(1.5,p*l),b=x*Math.min(1,p*c/v)*Math.min(1,p*l/A)||0;for(let w=Math.floor(y-A);w<=Math.ceil(y+A);w++)for(let T=Math.floor(_-v);T<=Math.ceil(_+v);T++){if(T<0||w<0||T>=e||w>=n)continue;let S=((T+.5-_)/v)**2+((w+.5-y)/A)**2;S<1&&(h[w*e+T]+=b*(1-S)*(1-S))}}let u=new Uint8Array(e*n);for(let d=0;d<e*n;d++)u[d]=Math.round(255*Math.min(1,h[d]));let f=new cn(u,e,n,Ji);return f.magFilter=f.minFilter=We,f.generateMipmaps=!1,f.unpackAlignment=1,f.name="env-canopy",f.needsUpdate=!0,f}function Z0(i,t){let{materials:e,quality:n,density:s}=i,r=i.root.userData.trackModel,o={},a=performance.now(),c=T=>{let S=performance.now();o[T]=Math.round(S-a),a=S};e.line.userData.envSkipOccupancy=!0;let l=new Set(i.root.children.filter(T=>T.name==="ground"||T.name==="hills"||T.name==="clouds")),h=Pm(i.root,{trackMaterial:e.asphalt,skip:l,loop:r.line});c("occupancy");let u={};for(let T of[...ir.map(S=>S.name),"scrub","pampas"])u[T]=B0(T);c("models");let f=XA(h,t,u,Math.round(sr.trees*s));c("trees");let{scrub:d,pampas:m}=YA(h,t,u,Math.round(sr.scrub*s),Math.round(sr.pampas*s));c("scrub");let x=qA(h,r,Math.round(sr.tufts*s));c("tufts");let[g,p]=z0[n]||z0.mid,_=N0(i.textures.detail),y=n!=="low",v=[];for(let[T,S]of[...Object.entries(f),["scrub",d],["pampas",m]]){if(!S.count)continue;let M=U0(u[T],_,S,{name:T,fadeStart:g,fadeEnd:p,castShadow:y&&T!=="scrub"&&T!=="pampas"});i.root.add(M.far,M.near),v.push({name:T,lod:M,data:S,radius:u[T].radius})}let A=ZA(i,x,k0[n]||k0.mid),b=$A([...Object.entries(f).map(([T,S])=>({data:S,radius:u[T].radius,strength:.42})),{data:d,radius:u.scrub.radius,strength:.3}],n),w=e.ground.userData.uniforms;return w.envCanopy.value=b,w.envCanopyBounds.value.set(...q0),c("meshes"),i.updaters.push((T,S,M,C)=>{if(A.time.value=T,!M)return;let N=M.position;for(let D=0;D<v.length;D++)v[D].lod.update(N.x,N.y,N.z,S,C)}),i.rng=Me(V0[n]??V0.high),{species:v,tufts:{mesh:A.mesh,data:x},occupancy:h,models:u,timings:o}}function $0(i,{quality:t="high"}={}){let e=Hm(i,t),n=e.layout,s=M0(e.track);Tm(e.materials,e.textures.lap,s.model),x0(e),_0(e),C0(e,s),wm(e.materials,e.root),l0(e),h0(e),Jm(e),Zm(e),Km(e),i0(e),Fm(e,s),Om(e);let r=Z0(e,s);$r(e,n.grandstandX0+8,17,n.grandstandZ+16,15282981,e.root),$r(e,n.grandstandX1-8,17,n.grandstandZ+16,16118766,e.root),Bm(e);let{updaters:o}=e;return{root:e.root,materials:e.materials,layout:n,track:e.track,vegetation:r,update(a,c,l,h=!1){for(let u=0;u<o.length;u++)o[u](a,c,l,h)}}}var JA=.02,J0=.05,KA=.01,jA=0,QA=[.26,.37,.47,.7,.95];function tE(i,t,e,n){let s=t.map(r=>r.visible);for(let r of t)r.visible=!1;return i.update(e,n),t.forEach((r,o)=>r.visible=s[o]),i.clearance}async function IC({canvas:i,trackUrl:t,carUrl:e,carMetaUrl:n,quality:s="high",onProgress:r=()=>{}}){let o=im(i,s),a=nm(s),c=new bi;c.fog=new jo(14279913,Xh,Yh);let l=new Ze(36,1,.3,9e3),h=Nd(l),u=Kh(),f=mm(u);c.add(f);let{hemi:d,sun:m}=Xp(c,o,s),x=Zp(m),g=La(),p=xm({renderer:o,scene:c,quality:s}),_=Kp(s),[y,v]=await Promise.all([fetch(t).then(nt=>nt.json()),fetch(n).then(nt=>nt.json())]);r(.15);let A=y.pts,b=$0(A,{quality:s,renderer:o});c.add(b.root);let w=b.root.getObjectByName("clouds")?.children??[],T=Float64Array.from(w,nt=>nt.position.x),S=new Float64Array(w.length);r(.35);let M=await Kd(e,v,{quality:s,onProgress:nt=>nt.total&&r(.35+.55*nt.loaded/nt.total)});c.add(M.root),Jp(M.root),r(.92);let C=Mm(b.root.userData.trackModel);c.add(C.mesh);let N=b.root.userData.openBox,D=Up();c.add(...D.members),Fp(c);let I=Op(c),B=[M.root,...D.members,...I.map(([nt])=>nt)];h.build(c,{sky:f,movers:B});let U=Ud(A),z=hp(U),k=ap(U,A),J=cp(Oh(k)),j=Oh(k).map(nt=>nt[1]),$=Qd(b.root,z,j,M.contacts),Z=up(M,z,k.arrival,{roadHeight:$.heightAt}),ut=Rh(z),q=Rh(z),it=Rd(l,dd,ut,{circuit:A,carBox:v.bounds,frameAt:nt=>q.update(J(nt)),clearanceAt:(nt,Tt)=>tE(h,B,nt,Tt)}),st=em(),dt=0,yt=0,Lt=!1,zt=!0,Yt=0,at={progress:0,introEase:1,clock:0,debugCam:null,width:1,height:1,framing:{panel:null,open:null,windows:null,fade:0}},pt=sm(i,o,l,a);function F(nt,Tt){yt+=nt,pt.update()&&ts(_),st.advance(nt,Tt);let H=st.value,R=st.introEase,E=J(H);st.intro<1&&(E=lp(E,st.intro,k)),Z.update(E,nt,yt),ut.update(E),Bp(D,H,yt,z,k.pitBox,N),zp(I,H,yt);let O=Pa(H);Da(O,g),Yp(g,{sun:m,hemi:d,scene:c,renderer:o}),gm(u,g),p.update(O),at.progress=H,at.introEase=R,at.clock=yt,at.debugCam=wt.debugCam,at.width=pt.width,at.height=pt.height,it.update(at),h.update(it.position,it.target),qp(c.fog,it.position.y),l.updateMatrixWorld(),x.update(g.sunDir,l,it.target),C.update(H,nt,Tt,wt.basePixelRatio*pt.resScale),b.update(yt,nt,l,Tt);let G=jp(_,H,it.position.y-ut.p.y);Qp(o,c,l,_,G)}function It(nt){if(Yt=0,!Lt)return;Yt=requestAnimationFrame(It);let Tt=Math.min(J0,Math.max(0,(nt-dt)/1e3));dt=nt,zt?F(Tt,!1):yt+=Tt}function ht(){return{progress:st.value,target:st.target,velocity:st.velocity,intro:st.intro,introDone:st.introDone,clock:yt,carDistance:Z.lastDistance,wheelDistance:Z.wheelDistance,speed:Z.speed,prevSpeed:Z.prevSpeed,drift:w.reduce((nt,Tt)=>nt+Tt.position.x,0)}}p.update(Pa(0)),rm(c,o,s),om(c),r(1);let wt={renderer:o,scene:c,camera:l,car:M,world:b,STAGES:tm,setProgress(nt){st.target=Bt(nt,0,1)},get progress(){return st.value},skipIntro(){st.finishIntro()},jump(nt){st.target=st.value=Bt(nt,0,1),st.velocity=0,Z.lastDistance=J(st.value),st.value>KA&&st.finishIntro(),ts(_)},async warmup(){let nt=[];c.traverse(H=>{H.visible||(nt.push(H),H.visible=!0)});try{o.compileAsync&&o.extensions.has("KHR_parallel_shader_compile")?await o.compileAsync(c,l):o.compile(c,l)}catch{}for(let H of nt)H.visible=!1;let Tt=ht();for(let H=0;H<w.length;H++)S[H]=w[H].position.x;for(let H of QA)wt.renderAt(H),await new Promise(R=>requestAnimationFrame(R));st.value=Tt.progress,st.target=Tt.target,st.velocity=Tt.velocity,st.intro=Tt.intro,st.introDone=Tt.introDone,yt=Tt.clock,Z.lastDistance=Tt.carDistance,Z.wheelDistance=Tt.wheelDistance,Z.speed=Tt.speed,Z.prevSpeed=Tt.prevSpeed;for(let H=0;H<w.length;H++)w[H].position.x=S[H];p.update(Pa(st.value)),C.update(st.value,0,!0,wt.basePixelRatio*pt.resScale),ts(_)},setFraming(nt=0,Tt=0,H=null){let R=at.framing;if(H){R.panel=H.panel,R.open=H.open||H.panel,H.windows&&(R.windows=H.windows),H.fade&&(R.fade=H.fade);return}let E=.5+Bt(nt,-.4,.4),O=.5-Bt(Tt,-.4,.4),G=Math.min(E,1-E)-.02,K=Math.min(O,1-O)-.02;R.panel=[E-G,O-K,E+G,O+K],R.open=null},start(){Lt||(Lt=!0,ts(_),dt=performance.now(),Yt||(Yt=requestAnimationFrame(It)))},stop(){Lt=!1,Yt&&cancelAnimationFrame(Yt),Yt=0},setVisible(nt){nt&&!zt&&ts(_),zt=nt},renderAt(nt,{intro:Tt=1,speed:H=null,dt:R=0}={}){let E=Bt(Number(nt)||0,0,1),O=Bt(Number(R)||0,0,J0);if((!O||Math.abs(E-st.value)>JA)&&ts(_),st.target=st.value=E,st.velocity=0,st.intro=Bt(Tt,0,1),st.introDone=st.intro>=1,!O){Z.lastDistance=J(E),yt=jA;for(let G=0;G<w.length;G++)w[G].position.x=T[G]}H!=null&&(Z.speed=H),F(O,!0)},debugState(){return{...ht(),envStep:p.step,blurHistory:_?_.hasPrev:null,highlight:[C.mesh.visible,C.mesh.material.opacity],running:Lt,pendingFrame:Yt!==0,framing:{panel:at.framing.panel,open:at.framing.open}}},debugCam:null,setResScale(nt){pt.resScale=Bt(nt,.2,1)},get resScale(){return pt.resScale},get basePixelRatio(){return Math.min(window.devicePixelRatio||1,a)}};return wt}export{IC as createJourney};
