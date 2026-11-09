var wh="170";var dg=0,Ou=1,pg=2;var Kf=1,Ah=2,hi=3,Fi=0,hn=1,Pe=2,Di=0,Xs=1,Bu=2,zu=3,ku=4,mg=5,es=100,gg=101,xg=102,yg=103,_g=104,vg=200,Mg=201,Sg=202,bg=203,nl=204,il=205,wg=206,Ag=207,Eg=208,Tg=209,Rg=210,Cg=211,Ig=212,Pg=213,Lg=214,sl=0,rl=1,ol=2,$s=3,al=4,cl=5,ll=6,hl=7,jf=0,Dg=1,Ng=2,Ni=0,Ug=1,Fg=2,Og=3,Bg=4,zg=5,Eh=6,kg=7;var Qf=300,Js=301,Ks=302,ul=303,fl=304,Ca=306,sn=1e3,fi=1001,dl=1002,En=1003,Vg=1004;var Ao=1005;var rn=1006,vc=1007;var Vn=1008;var gi=1009,td=1010,ed=1011,zr=1012,Th=1013,is=1014,Jn=1015,fs=1016,Rh=1017,Ch=1018,js=1020,nd=35902,id=1021,sd=1022,Ke=1023,rd=1024,od=1025,Ys=1026,Qs=1027,yi=1028,Ih=1029,ad=1030,Ph=1031;var Lh=1033,ta=33776,ea=33777,na=33778,ia=33779,pl=35840,ml=35841,gl=35842,xl=35843,yl=36196,_l=37492,vl=37496,Ml=37808,Sl=37809,bl=37810,wl=37811,Al=37812,El=37813,Tl=37814,Rl=37815,Cl=37816,Il=37817,Pl=37818,Ll=37819,Dl=37820,Nl=37821,sa=36492,Ul=36494,Fl=36495,cd=36283,Ol=36284,Bl=36285,zl=36286;var ra=2300,kl=2301,Mc=2302,Vu=2400,Hu=2401,Gu=2402;var Hg=3200,so=3201;var ld=0,Gg=1,Pi="",Ie="srgb",Hi="srgb-linear",Ia="linear",we="srgb";var ws=7680;var Wu=519,Wg=512,Xg=513,Yg=514,hd=515,qg=516,Zg=517,$g=518,Jg=519,Vl=35044;var Xu="300 es",di=2e3,oa=2001,Oi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Sc=Math.PI/180,Hl=180/Math.PI;function pi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(an[i&255]+an[i>>8&255]+an[i>>16&255]+an[i>>24&255]+"-"+an[t&255]+an[t>>8&255]+"-"+an[t>>16&15|64]+an[t>>24&255]+"-"+an[e&63|128]+an[e>>8&255]+"-"+an[e>>16&255]+an[e>>24&255]+an[n&255]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]).toLowerCase()}function nn(i,t,e){return Math.max(t,Math.min(e,i))}function Kg(i,t){return(i%t+t)%t}function bc(i,t,e){return(1-e)*i+e*t}function $n(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ae(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var ft=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(nn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},re=class i{constructor(t,e,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],m=n[8],x=s[0],g=s[3],p=s[6],y=s[1],_=s[4],v=s[7],A=s[2],S=s[5],w=s[8];return r[0]=o*x+a*y+c*A,r[3]=o*g+a*_+c*S,r[6]=o*p+a*v+c*w,r[1]=l*x+h*y+u*A,r[4]=l*g+h*_+u*S,r[7]=l*p+h*v+u*w,r[2]=f*x+d*y+m*A,r[5]=f*g+d*_+m*S,r[8]=f*p+d*v+m*w,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,m=e*u+n*f+s*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/m;return t[0]=u*x,t[1]=(s*l-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=f*x,t[4]=(h*e-s*c)*x,t[5]=(s*r-a*e)*x,t[6]=d*x,t[7]=(n*c-l*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(wc.makeScale(t,e)),this}rotate(t){return this.premultiply(wc.makeRotation(-t)),this}translate(t,e){return this.premultiply(wc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},wc=new re;function ud(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function kr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function jg(){let i=kr("canvas");return i.style.display="block",i}var Yu={};function Nr(i){i in Yu||(Yu[i]=!0,console.warn(i))}function Qg(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function tx(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function ex(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var ge={enabled:!0,workingColorSpace:Hi,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===we&&(i.r=mi(i.r),i.g=mi(i.g),i.b=mi(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===we&&(i.r=qs(i.r),i.g=qs(i.g),i.b=qs(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Pi?Ia:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function mi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function qs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var qu=[.64,.33,.3,.6,.15,.06],Zu=[.2126,.7152,.0722],$u=[.3127,.329],Ju=new re().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ku=new re().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ge.define({[Hi]:{primaries:qu,whitePoint:$u,transfer:Ia,toXYZ:Ju,fromXYZ:Ku,luminanceCoefficients:Zu,workingColorSpaceConfig:{unpackColorSpace:Ie},outputColorSpaceConfig:{drawingBufferColorSpace:Ie}},[Ie]:{primaries:qu,whitePoint:$u,transfer:we,toXYZ:Ju,fromXYZ:Ku,luminanceCoefficients:Zu,outputColorSpaceConfig:{drawingBufferColorSpace:Ie}}});var As,Gl=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{As===void 0&&(As=kr("canvas")),As.width=t.width,As.height=t.height;let n=As.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=As}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=kr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=mi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(mi(e[n]/255)*255):e[n]=mi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},nx=0,aa=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:nx++}),this.uuid=pi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ac(s[o].image)):r.push(Ac(s[o]))}else r=Ac(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Ac(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Gl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var ix=0,gn=class i extends Oi{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=fi,s=fi,r=rn,o=Vn,a=Ke,c=gi,l=i.DEFAULT_ANISOTROPY,h=Pi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ix++}),this.uuid=pi(),this.name="",this.source=new aa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ft(0,0),this.repeat=new ft(1,1),this.center=new ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new re,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Qf)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case sn:t.x=t.x-Math.floor(t.x);break;case fi:t.x=t.x<0?0:1;break;case dl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case sn:t.y=t.y-Math.floor(t.y);break;case fi:t.y=t.y<0?0:1;break;case dl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};gn.DEFAULT_IMAGE=null;gn.DEFAULT_MAPPING=Qf;gn.DEFAULT_ANISOTROPY=1;var de=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],m=c[9],x=c[2],g=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(m+g)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let _=(l+1)/2,v=(d+1)/2,A=(p+1)/2,S=(h+f)/4,w=(u+x)/4,E=(m+g)/4;return _>v&&_>A?_<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(_),s=S/n,r=w/n):v>A?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=S/s,r=E/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=w/r,s=E/r),this.set(n,s,r,e),this}let y=Math.sqrt((g-m)*(g-m)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(u-x)/y,this.z=(f-h)/y,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Wl=class extends Oi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new de(0,0,t,e),this.scissorTest=!1,this.viewport=new de(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:rn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new gn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new aa(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Pn=class extends Wl{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},ca=class extends gn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=En,this.minFilter=En,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Xl=class extends gn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=En,this.minFilter=En,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Oe=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],d=r[o+1],m=r[o+2],x=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=m,t[e+3]=x;return}if(u!==x||c!==f||l!==d||h!==m){let g=1-a,p=c*f+l*d+h*m+u*x,y=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){let A=Math.sqrt(_),S=Math.atan2(A,p*y);g=Math.sin(g*S)/A,a=Math.sin(a*S)/A}let v=a*y;if(c=c*g+f*v,l=l*g+d*v,h=h*g+m*v,u=u*g+x*v,g===1-a){let A=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=A,l*=A,h*=A,u*=A}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],m=r[o+3];return t[e]=a*m+h*u+c*d-l*f,t[e+1]=c*m+h*f+l*u-a*d,t[e+2]=l*m+h*d+a*f-c*u,t[e+3]=h*m-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),d=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u-f*d*m;break;case"YXZ":this._x=f*h*u+l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u+f*d*m;break;case"ZXY":this._x=f*h*u-l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u-f*d*m;break;case"ZYX":this._x=f*h*u-l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u+f*d*m;break;case"YZX":this._x=f*h*u+l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u-f*d*m;break;case"XZY":this._x=f*h*u-l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u+f*d*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>u){let d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){let d=2*Math.sqrt(1+a-n-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(nn(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},D=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ju.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ju.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ec.copy(this).projectOnVector(t),this.sub(Ec)}reflect(t){return this.sub(Ec.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(nn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ec=new D,ju=new Oe,xn=class{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Bn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Bn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Bn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Bn):Bn.fromBufferAttribute(r,o),Bn.applyMatrix4(t.matrixWorld),this.expandByPoint(Bn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Eo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Eo.copy(n.boundingBox)),Eo.applyMatrix4(t.matrixWorld),this.union(Eo)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Bn),Bn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(wr),To.subVectors(this.max,wr),Es.subVectors(t.a,wr),Ts.subVectors(t.b,wr),Rs.subVectors(t.c,wr),Ai.subVectors(Ts,Es),Ei.subVectors(Rs,Ts),Zi.subVectors(Es,Rs);let e=[0,-Ai.z,Ai.y,0,-Ei.z,Ei.y,0,-Zi.z,Zi.y,Ai.z,0,-Ai.x,Ei.z,0,-Ei.x,Zi.z,0,-Zi.x,-Ai.y,Ai.x,0,-Ei.y,Ei.x,0,-Zi.y,Zi.x,0];return!Tc(e,Es,Ts,Rs,To)||(e=[1,0,0,0,1,0,0,0,1],!Tc(e,Es,Ts,Rs,To))?!1:(Ro.crossVectors(Ai,Ei),e=[Ro.x,Ro.y,Ro.z],Tc(e,Es,Ts,Rs,To))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Bn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Bn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ri),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},ri=[new D,new D,new D,new D,new D,new D,new D,new D],Bn=new D,Eo=new xn,Es=new D,Ts=new D,Rs=new D,Ai=new D,Ei=new D,Zi=new D,wr=new D,To=new D,Ro=new D,$i=new D;function Tc(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){$i.fromArray(i,r);let a=s.x*Math.abs($i.x)+s.y*Math.abs($i.y)+s.z*Math.abs($i.z),c=t.dot($i),l=e.dot($i),h=n.dot($i);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var sx=new xn,Ar=new D,Rc=new D,ss=class{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):sx.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ar.subVectors(t,this.center);let e=Ar.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ar,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Rc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ar.copy(t.center).add(Rc)),this.expandByPoint(Ar.copy(t.center).sub(Rc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},oi=new D,Cc=new D,Co=new D,Ti=new D,Ic=new D,Io=new D,Pc=new D,la=class{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,oi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=oi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(oi.copy(this.origin).addScaledVector(this.direction,e),oi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Cc.copy(t).add(e).multiplyScalar(.5),Co.copy(e).sub(t).normalize(),Ti.copy(this.origin).sub(Cc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Co),a=Ti.dot(this.direction),c=-Ti.dot(Co),l=Ti.lengthSq(),h=Math.abs(1-o*o),u,f,d,m;if(h>0)if(u=o*c-a,f=o*a-c,m=r*h,u>=0)if(f>=-m)if(f<=m){let x=1/h;u*=x,f*=x,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-m?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=m?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Cc).addScaledVector(Co,f),d}intersectSphere(t,e){oi.subVectors(t.center,this.origin);let n=oi.dot(this.direction),s=oi.dot(oi)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,oi)!==null}intersectTriangle(t,e,n,s,r){Ic.subVectors(e,t),Io.subVectors(n,t),Pc.crossVectors(Ic,Io);let o=this.direction.dot(Pc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ti.subVectors(this.origin,t);let c=a*this.direction.dot(Io.crossVectors(Ti,Io));if(c<0)return null;let l=a*this.direction.dot(Ic.cross(Ti));if(l<0||c+l>o)return null;let h=-a*Ti.dot(Pc);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Gt=class i{constructor(t,e,n,s,r,o,a,c,l,h,u,f,d,m,x,g){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,f,d,m,x,g)}set(t,e,n,s,r,o,a,c,l,h,u,f,d,m,x,g){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Cs.setFromMatrixColumn(t,0).length(),r=1/Cs.setFromMatrixColumn(t,1).length(),o=1/Cs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=o*h,d=o*u,m=a*h,x=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+m*l,e[5]=f-x*l,e[9]=-a*c,e[2]=x-f*l,e[6]=m+d*l,e[10]=o*c}else if(t.order==="YXZ"){let f=c*h,d=c*u,m=l*h,x=l*u;e[0]=f+x*a,e[4]=m*a-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-m,e[6]=x+f*a,e[10]=o*c}else if(t.order==="ZXY"){let f=c*h,d=c*u,m=l*h,x=l*u;e[0]=f-x*a,e[4]=-o*u,e[8]=m+d*a,e[1]=d+m*a,e[5]=o*h,e[9]=x-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let f=o*h,d=o*u,m=a*h,x=a*u;e[0]=c*h,e[4]=m*l-d,e[8]=f*l+x,e[1]=c*u,e[5]=x*l+f,e[9]=d*l-m,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let f=o*c,d=o*l,m=a*c,x=a*l;e[0]=c*h,e[4]=x-f*u,e[8]=m*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+m,e[10]=f-x*u}else if(t.order==="XZY"){let f=o*c,d=o*l,m=a*c,x=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+x,e[5]=o*h,e[9]=d*u-m,e[2]=m*u-d,e[6]=a*h,e[10]=x*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(rx,t,ox)}lookAt(t,e,n){let s=this.elements;return wn.subVectors(t,e),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),Ri.crossVectors(n,wn),Ri.lengthSq()===0&&(Math.abs(n.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),Ri.crossVectors(n,wn)),Ri.normalize(),Po.crossVectors(wn,Ri),s[0]=Ri.x,s[4]=Po.x,s[8]=wn.x,s[1]=Ri.y,s[5]=Po.y,s[9]=wn.y,s[2]=Ri.z,s[6]=Po.z,s[10]=wn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],m=n[2],x=n[6],g=n[10],p=n[14],y=n[3],_=n[7],v=n[11],A=n[15],S=s[0],w=s[4],E=s[8],b=s[12],M=s[1],R=s[5],N=s[9],L=s[13],C=s[2],B=s[6],U=s[10],z=s[14],F=s[3],J=s[7],$=s[11],ct=s[15];return r[0]=o*S+a*M+c*C+l*F,r[4]=o*w+a*R+c*B+l*J,r[8]=o*E+a*N+c*U+l*$,r[12]=o*b+a*L+c*z+l*ct,r[1]=h*S+u*M+f*C+d*F,r[5]=h*w+u*R+f*B+d*J,r[9]=h*E+u*N+f*U+d*$,r[13]=h*b+u*L+f*z+d*ct,r[2]=m*S+x*M+g*C+p*F,r[6]=m*w+x*R+g*B+p*J,r[10]=m*E+x*N+g*U+p*$,r[14]=m*b+x*L+g*z+p*ct,r[3]=y*S+_*M+v*C+A*F,r[7]=y*w+_*R+v*B+A*J,r[11]=y*E+_*N+v*U+A*$,r[15]=y*b+_*L+v*z+A*ct,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],m=t[3],x=t[7],g=t[11],p=t[15];return m*(+r*c*u-s*l*u-r*a*f+n*l*f+s*a*d-n*c*d)+x*(+e*c*d-e*l*f+r*o*f-s*o*d+s*l*h-r*c*h)+g*(+e*l*u-e*a*d-r*o*u+n*o*d+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*f+s*o*u-n*o*f+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],m=t[12],x=t[13],g=t[14],p=t[15],y=u*g*l-x*f*l+x*c*d-a*g*d-u*c*p+a*f*p,_=m*f*l-h*g*l-m*c*d+o*g*d+h*c*p-o*f*p,v=h*x*l-m*u*l+m*a*d-o*x*d-h*a*p+o*u*p,A=m*u*c-h*x*c-m*a*f+o*x*f+h*a*g-o*u*g,S=e*y+n*_+s*v+r*A;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let w=1/S;return t[0]=y*w,t[1]=(x*f*r-u*g*r-x*s*d+n*g*d+u*s*p-n*f*p)*w,t[2]=(a*g*r-x*c*r+x*s*l-n*g*l-a*s*p+n*c*p)*w,t[3]=(u*c*r-a*f*r-u*s*l+n*f*l+a*s*d-n*c*d)*w,t[4]=_*w,t[5]=(h*g*r-m*f*r+m*s*d-e*g*d-h*s*p+e*f*p)*w,t[6]=(m*c*r-o*g*r-m*s*l+e*g*l+o*s*p-e*c*p)*w,t[7]=(o*f*r-h*c*r+h*s*l-e*f*l-o*s*d+e*c*d)*w,t[8]=v*w,t[9]=(m*u*r-h*x*r-m*n*d+e*x*d+h*n*p-e*u*p)*w,t[10]=(o*x*r-m*a*r+m*n*l-e*x*l-o*n*p+e*a*p)*w,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*d-e*a*d)*w,t[12]=A*w,t[13]=(h*x*s-m*u*s+m*n*f-e*x*f-h*n*g+e*u*g)*w,t[14]=(m*a*s-o*x*s-m*n*c+e*x*c+o*n*g-e*a*g)*w,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*f+e*a*f)*w,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,m=r*u,x=o*h,g=o*u,p=a*u,y=c*l,_=c*h,v=c*u,A=n.x,S=n.y,w=n.z;return s[0]=(1-(x+p))*A,s[1]=(d+v)*A,s[2]=(m-_)*A,s[3]=0,s[4]=(d-v)*S,s[5]=(1-(f+p))*S,s[6]=(g+y)*S,s[7]=0,s[8]=(m+_)*w,s[9]=(g-y)*w,s[10]=(1-(f+x))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Cs.set(s[0],s[1],s[2]).length(),o=Cs.set(s[4],s[5],s[6]).length(),a=Cs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],zn.copy(this);let l=1/r,h=1/o,u=1/a;return zn.elements[0]*=l,zn.elements[1]*=l,zn.elements[2]*=l,zn.elements[4]*=h,zn.elements[5]*=h,zn.elements[6]*=h,zn.elements[8]*=u,zn.elements[9]*=u,zn.elements[10]*=u,e.setFromRotationMatrix(zn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=di){let c=this.elements,l=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s),d,m;if(a===di)d=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===oa)d=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=di){let c=this.elements,l=1/(e-t),h=1/(n-s),u=1/(o-r),f=(e+t)*l,d=(n+s)*h,m,x;if(a===di)m=(o+r)*u,x=-2*u;else if(a===oa)m=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=x,c[14]=-m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Cs=new D,zn=new Gt,rx=new D(0,0,0),ox=new D(1,1,1),Ri=new D,Po=new D,wn=new D,Qu=new Gt,tf=new Oe,vn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(nn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-nn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(nn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-nn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(nn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-nn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Qu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Qu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return tf.setFromEuler(this),this.setFromQuaternion(tf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};vn.DEFAULT_ORDER="XYZ";var Vr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},ax=0,ef=new D,Is=new Oe,ai=new Gt,Lo=new D,Er=new D,cx=new D,lx=new Oe,nf=new D(1,0,0),sf=new D(0,1,0),rf=new D(0,0,1),of={type:"added"},hx={type:"removed"},Ps={type:"childadded",child:null},Lc={type:"childremoved",child:null},Ze=class i extends Oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ax++}),this.uuid=pi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new D,e=new vn,n=new Oe,s=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Gt},normalMatrix:{value:new re}}),this.matrix=new Gt,this.matrixWorld=new Gt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Is.setFromAxisAngle(t,e),this.quaternion.multiply(Is),this}rotateOnWorldAxis(t,e){return Is.setFromAxisAngle(t,e),this.quaternion.premultiply(Is),this}rotateX(t){return this.rotateOnAxis(nf,t)}rotateY(t){return this.rotateOnAxis(sf,t)}rotateZ(t){return this.rotateOnAxis(rf,t)}translateOnAxis(t,e){return ef.copy(t).applyQuaternion(this.quaternion),this.position.add(ef.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(nf,t)}translateY(t){return this.translateOnAxis(sf,t)}translateZ(t){return this.translateOnAxis(rf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ai.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Lo.copy(t):Lo.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Er.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ai.lookAt(Er,Lo,this.up):ai.lookAt(Lo,Er,this.up),this.quaternion.setFromRotationMatrix(ai),s&&(ai.extractRotation(s.matrixWorld),Is.setFromRotationMatrix(ai),this.quaternion.premultiply(Is.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(of),Ps.child=t,this.dispatchEvent(Ps),Ps.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(hx),Lc.child=t,this.dispatchEvent(Lc),Lc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ai.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ai.multiply(t.parent.matrixWorld)),t.applyMatrix4(ai),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(of),Ps.child=t,this.dispatchEvent(Ps),Ps.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Er,t,cx),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Er,lx,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Ze.DEFAULT_UP=new D(0,1,0);Ze.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ze.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var kn=new D,ci=new D,Dc=new D,li=new D,Ls=new D,Ds=new D,af=new D,Nc=new D,Uc=new D,Fc=new D,Oc=new de,Bc=new de,zc=new de,Li=class i{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),kn.subVectors(t,e),s.cross(kn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){kn.subVectors(s,e),ci.subVectors(n,e),Dc.subVectors(t,e);let o=kn.dot(kn),a=kn.dot(ci),c=kn.dot(Dc),l=ci.dot(ci),h=ci.dot(Dc),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(l*c-a*h)*f,m=(o*h-a*c)*f;return r.set(1-d-m,m,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,li)===null?!1:li.x>=0&&li.y>=0&&li.x+li.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,li)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,li.x),c.addScaledVector(o,li.y),c.addScaledVector(a,li.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return Oc.setScalar(0),Bc.setScalar(0),zc.setScalar(0),Oc.fromBufferAttribute(t,e),Bc.fromBufferAttribute(t,n),zc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Oc,r.x),o.addScaledVector(Bc,r.y),o.addScaledVector(zc,r.z),o}static isFrontFacing(t,e,n,s){return kn.subVectors(n,e),ci.subVectors(t,e),kn.cross(ci).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return kn.subVectors(this.c,this.b),ci.subVectors(this.a,this.b),kn.cross(ci).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;Ls.subVectors(s,n),Ds.subVectors(r,n),Nc.subVectors(t,n);let c=Ls.dot(Nc),l=Ds.dot(Nc);if(c<=0&&l<=0)return e.copy(n);Uc.subVectors(t,s);let h=Ls.dot(Uc),u=Ds.dot(Uc);if(h>=0&&u<=h)return e.copy(s);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Ls,o);Fc.subVectors(t,r);let d=Ls.dot(Fc),m=Ds.dot(Fc);if(m>=0&&d<=m)return e.copy(r);let x=d*l-c*m;if(x<=0&&l>=0&&m<=0)return a=l/(l-m),e.copy(n).addScaledVector(Ds,a);let g=h*m-d*u;if(g<=0&&u-h>=0&&d-m>=0)return af.subVectors(r,s),a=(u-h)/(u-h+(d-m)),e.copy(s).addScaledVector(af,a);let p=1/(g+x+f);return o=x*p,a=f*p,e.copy(n).addScaledVector(Ls,o).addScaledVector(Ds,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},fd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ci={h:0,s:0,l:0},Do={h:0,s:0,l:0};function kc(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Ot=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ie){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ge.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ge.workingColorSpace){return this.r=t,this.g=e,this.b=n,ge.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ge.workingColorSpace){if(t=Kg(t,1),e=nn(e,0,1),n=nn(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=kc(o,r,t+1/3),this.g=kc(o,r,t),this.b=kc(o,r,t-1/3)}return ge.toWorkingColorSpace(this,s),this}setStyle(t,e=Ie){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ie){let n=fd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=mi(t.r),this.g=mi(t.g),this.b=mi(t.b),this}copyLinearToSRGB(t){return this.r=qs(t.r),this.g=qs(t.g),this.b=qs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ie){return ge.fromWorkingColorSpace(cn.copy(this),t),Math.round(nn(cn.r*255,0,255))*65536+Math.round(nn(cn.g*255,0,255))*256+Math.round(nn(cn.b*255,0,255))}getHexString(t=Ie){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ge.workingColorSpace){ge.fromWorkingColorSpace(cn.copy(this),e);let n=cn.r,s=cn.g,r=cn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ge.workingColorSpace){return ge.fromWorkingColorSpace(cn.copy(this),e),t.r=cn.r,t.g=cn.g,t.b=cn.b,t}getStyle(t=Ie){ge.fromWorkingColorSpace(cn.copy(this),t);let e=cn.r,n=cn.g,s=cn.b;return t!==Ie?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Ci),this.setHSL(Ci.h+t,Ci.s+e,Ci.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ci),t.getHSL(Do);let n=bc(Ci.h,Do.h,e),s=bc(Ci.s,Do.s,e),r=bc(Ci.l,Do.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},cn=new Ot;Ot.NAMES=fd;var ux=0,Bi=class extends Oi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ux++}),this.uuid=pi(),this.name="",this.blending=Xs,this.side=Fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=nl,this.blendDst=il,this.blendEquation=es,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ot(0,0,0),this.blendAlpha=0,this.depthFunc=$s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ws,this.stencilZFail=ws,this.stencilZPass=ws,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Xs&&(n.blending=this.blending),this.side!==Fi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==nl&&(n.blendSrc=this.blendSrc),this.blendDst!==il&&(n.blendDst=this.blendDst),this.blendEquation!==es&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==$s&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Wu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ws&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ws&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ws&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Be=class extends Bi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=jf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var qe=new D,No=new ft,Ne=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Vl,this.updateRanges=[],this.gpuType=Jn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)No.fromBufferAttribute(this,e),No.applyMatrix3(t),this.setXY(e,No.x,No.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.applyMatrix3(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.applyMatrix4(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.applyNormalMatrix(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.transformDirection(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=$n(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ae(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=$n(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=$n(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=$n(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=$n(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),s=Ae(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),s=Ae(s,this.array),r=Ae(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Vl&&(t.usage=this.usage),t}};var ha=class extends Ne{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var ua=class extends Ne{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var zt=class extends Ne{constructor(t,e,n){super(new Float32Array(t),e,n)}},fx=0,In=new Gt,Vc=new Ze,Ns=new D,An=new xn,Tr=new xn,en=new D,fe=class i extends Oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:fx++}),this.uuid=pi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ud(t)?ua:ha)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new re().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return In.makeRotationFromQuaternion(t),this.applyMatrix4(In),this}rotateX(t){return In.makeRotationX(t),this.applyMatrix4(In),this}rotateY(t){return In.makeRotationY(t),this.applyMatrix4(In),this}rotateZ(t){return In.makeRotationZ(t),this.applyMatrix4(In),this}translate(t,e,n){return In.makeTranslation(t,e,n),this.applyMatrix4(In),this}scale(t,e,n){return In.makeScale(t,e,n),this.applyMatrix4(In),this}lookAt(t){return Vc.lookAt(t),Vc.updateMatrix(),this.applyMatrix4(Vc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ns).negate(),this.translate(Ns.x,Ns.y,Ns.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new zt(n,3))}else{for(let n=0,s=e.count;n<s;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];An.setFromBufferAttribute(r),this.morphTargetsRelative?(en.addVectors(this.boundingBox.min,An.min),this.boundingBox.expandByPoint(en),en.addVectors(this.boundingBox.max,An.max),this.boundingBox.expandByPoint(en)):(this.boundingBox.expandByPoint(An.min),this.boundingBox.expandByPoint(An.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ss);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){let n=this.boundingSphere.center;if(An.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Tr.setFromBufferAttribute(a),this.morphTargetsRelative?(en.addVectors(An.min,Tr.min),An.expandByPoint(en),en.addVectors(An.max,Tr.max),An.expandByPoint(en)):(An.expandByPoint(Tr.min),An.expandByPoint(Tr.max))}An.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)en.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(en));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)en.fromBufferAttribute(a,l),c&&(Ns.fromBufferAttribute(t,l),en.add(Ns)),s=Math.max(s,n.distanceToSquared(en))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ne(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let E=0;E<n.count;E++)a[E]=new D,c[E]=new D;let l=new D,h=new D,u=new D,f=new ft,d=new ft,m=new ft,x=new D,g=new D;function p(E,b,M){l.fromBufferAttribute(n,E),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,M),f.fromBufferAttribute(r,E),d.fromBufferAttribute(r,b),m.fromBufferAttribute(r,M),h.sub(l),u.sub(l),d.sub(f),m.sub(f);let R=1/(d.x*m.y-m.x*d.y);isFinite(R)&&(x.copy(h).multiplyScalar(m.y).addScaledVector(u,-d.y).multiplyScalar(R),g.copy(u).multiplyScalar(d.x).addScaledVector(h,-m.x).multiplyScalar(R),a[E].add(x),a[b].add(x),a[M].add(x),c[E].add(g),c[b].add(g),c[M].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let E=0,b=y.length;E<b;++E){let M=y[E],R=M.start,N=M.count;for(let L=R,C=R+N;L<C;L+=3)p(t.getX(L+0),t.getX(L+1),t.getX(L+2))}let _=new D,v=new D,A=new D,S=new D;function w(E){A.fromBufferAttribute(s,E),S.copy(A);let b=a[E];_.copy(b),_.sub(A.multiplyScalar(A.dot(b))).normalize(),v.crossVectors(S,b);let R=v.dot(c[E])<0?-1:1;o.setXYZW(E,_.x,_.y,_.z,R)}for(let E=0,b=y.length;E<b;++E){let M=y[E],R=M.start,N=M.count;for(let L=R,C=R+N;L<C;L+=3)w(t.getX(L+0)),w(t.getX(L+1)),w(t.getX(L+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ne(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new D,r=new D,o=new D,a=new D,c=new D,l=new D,h=new D,u=new D;if(t)for(let f=0,d=t.count;f<d;f+=3){let m=t.getX(f+0),x=t.getX(f+1),g=t.getX(f+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,g),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)en.fromBufferAttribute(t,e),en.normalize(),t.setXYZ(e,en.x,en.y,en.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h),d=0,m=0;for(let x=0,g=c.length;x<g;x++){a.isInterleavedBufferAttribute?d=c[x]*a.data.stride+a.offset:d=c[x]*h;for(let p=0;p<h;p++)f[m++]=l[d++]}return new Ne(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let f=l[h],d=t(f,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},cf=new Gt,Ji=new la,Uo=new ss,lf=new D,Fo=new D,Oo=new D,Bo=new D,Hc=new D,zo=new D,hf=new D,ko=new D,bt=class extends Ze{constructor(t=new fe,e=new Be){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){zo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(Hc.fromBufferAttribute(u,t),o?zo.addScaledVector(Hc,h):zo.addScaledVector(Hc.sub(e),h))}e.add(zo)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Uo.copy(n.boundingSphere),Uo.applyMatrix4(r),Ji.copy(t.ray).recast(t.near),!(Uo.containsPoint(Ji.origin)===!1&&(Ji.intersectSphere(Uo,lf)===null||Ji.origin.distanceToSquared(lf)>(t.far-t.near)**2))&&(cf.copy(r).invert(),Ji.copy(t.ray).applyMatrix4(cf),!(n.boundingBox!==null&&Ji.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ji)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,x=f.length;m<x;m++){let g=f[m],p=o[g.materialIndex],y=Math.max(g.start,d.start),_=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let v=y,A=_;v<A;v+=3){let S=a.getX(v),w=a.getX(v+1),E=a.getX(v+2);s=Vo(this,p,t,n,l,h,u,S,w,E),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let g=m,p=x;g<p;g+=3){let y=a.getX(g),_=a.getX(g+1),v=a.getX(g+2);s=Vo(this,o,t,n,l,h,u,y,_,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,x=f.length;m<x;m++){let g=f[m],p=o[g.materialIndex],y=Math.max(g.start,d.start),_=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let v=y,A=_;v<A;v+=3){let S=v,w=v+1,E=v+2;s=Vo(this,p,t,n,l,h,u,S,w,E),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,d.start),x=Math.min(c.count,d.start+d.count);for(let g=m,p=x;g<p;g+=3){let y=g,_=g+1,v=g+2;s=Vo(this,o,t,n,l,h,u,y,_,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function dx(i,t,e,n,s,r,o,a){let c;if(t.side===hn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Fi,a),c===null)return null;ko.copy(a),ko.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(ko);return l<e.near||l>e.far?null:{distance:l,point:ko.clone(),object:i}}function Vo(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Fo),i.getVertexPosition(c,Oo),i.getVertexPosition(l,Bo);let h=dx(i,t,e,n,Fo,Oo,Bo,hf);if(h){let u=new D;Li.getBarycoord(hf,Fo,Oo,Bo,u),s&&(h.uv=Li.getInterpolatedAttribute(s,a,c,l,u,new ft)),r&&(h.uv1=Li.getInterpolatedAttribute(r,a,c,l,u,new ft)),o&&(h.normal=Li.getInterpolatedAttribute(o,a,c,l,u,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new D,materialIndex:0};Li.getNormal(Fo,Oo,Bo,f.normal),h.face=f,h.barycoord=u}return h}var We=class i extends fe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],f=0,d=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new zt(l,3)),this.setAttribute("normal",new zt(h,3)),this.setAttribute("uv",new zt(u,2));function m(x,g,p,y,_,v,A,S,w,E,b){let M=v/w,R=A/E,N=v/2,L=A/2,C=S/2,B=w+1,U=E+1,z=0,F=0,J=new D;for(let $=0;$<U;$++){let ct=$*R-L;for(let ht=0;ht<B;ht++){let Mt=ht*M-N;J[x]=Mt*y,J[g]=ct*_,J[p]=C,l.push(J.x,J.y,J.z),J[x]=0,J[g]=0,J[p]=S>0?1:-1,h.push(J.x,J.y,J.z),u.push(ht/w),u.push(1-$/E),z+=1}}for(let $=0;$<E;$++)for(let ct=0;ct<w;ct++){let ht=f+ct+B*$,Mt=f+ct+B*($+1),j=f+(ct+1)+B*($+1),Y=f+(ct+1)+B*$;c.push(ht,Mt,Y),c.push(Mt,j,Y),F+=6}a.addGroup(d,F,b),d+=F,f+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function tr(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function mn(i){let t={};for(let e=0;e<i.length;e++){let n=tr(i[e]);for(let s in n)t[s]=n[s]}return t}function px(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function dd(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ge.workingColorSpace}var mx={clone:tr,merge:mn},gx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Mn=class extends Bi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gx,this.fragmentShader=xx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=tr(t.uniforms),this.uniformsGroups=px(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},fa=class extends Ze{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Gt,this.projectionMatrix=new Gt,this.projectionMatrixInverse=new Gt,this.coordinateSystem=di}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ii=new D,uf=new ft,ff=new ft,ln=class extends fa{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Hl*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Sc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Hl*2*Math.atan(Math.tan(Sc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ii.x,Ii.y).multiplyScalar(-t/Ii.z),Ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ii.x,Ii.y).multiplyScalar(-t/Ii.z)}getViewSize(t,e){return this.getViewBounds(t,uf,ff),e.subVectors(ff,uf)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Sc*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Us=-90,Fs=1,Hr=class extends Ze{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new ln(Us,Fs,t,e);s.layers=this.layers,this.add(s);let r=new ln(Us,Fs,t,e);r.layers=this.layers,this.add(r);let o=new ln(Us,Fs,t,e);o.layers=this.layers,this.add(o);let a=new ln(Us,Fs,t,e);a.layers=this.layers,this.add(a);let c=new ln(Us,Fs,t,e);c.layers=this.layers,this.add(c);let l=new ln(Us,Fs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===di)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===oa)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},da=class extends gn{constructor(t,e,n,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Js,super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Gr=class extends Pn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new da(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:rn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new We(5,5,5),r=new Mn({name:"CubemapFromEquirect",uniforms:tr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:hn,blending:Di});r.uniforms.tEquirect.value=e;let o=new bt(s,r),a=e.minFilter;return e.minFilter===Vn&&(e.minFilter=rn),new Hr(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Gc=new D,yx=new D,_x=new re,ui=class{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Gc.subVectors(n,e).cross(yx.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Gc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||_x.getNormalMatrix(t),s=this.coplanarPoint(Gc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ki=new ss,Ho=new D,Wr=class{constructor(t=new ui,e=new ui,n=new ui,s=new ui,r=new ui,o=new ui){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=di){let n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],f=s[7],d=s[8],m=s[9],x=s[10],g=s[11],p=s[12],y=s[13],_=s[14],v=s[15];if(n[0].setComponents(c-r,f-l,g-d,v-p).normalize(),n[1].setComponents(c+r,f+l,g+d,v+p).normalize(),n[2].setComponents(c+o,f+h,g+m,v+y).normalize(),n[3].setComponents(c-o,f-h,g-m,v-y).normalize(),n[4].setComponents(c-a,f-u,g-x,v-_).normalize(),e===di)n[5].setComponents(c+a,f+u,g+x,v+_).normalize();else if(e===oa)n[5].setComponents(a,u,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ki.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ki.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ki)}intersectsSprite(t){return Ki.center.set(0,0,0),Ki.radius=.7071067811865476,Ki.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ki)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Ho.x=s.normal.x>0?t.max.x:t.min.x,Ho.y=s.normal.y>0?t.max.y:t.min.y,Ho.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ho)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function pd(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function vx(i){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,m)=>d.start-m.start);let f=0;for(let d=1;d<u.length;d++){let m=u[f],x=u[d];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++f,u[f]=x)}u.length=f+1;for(let d=0,m=u.length;d<m;d++){let x=u[d];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var ve=class i extends fe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,d=[],m=[],x=[],g=[];for(let p=0;p<h;p++){let y=p*f-o;for(let _=0;_<l;_++){let v=_*u-r;m.push(v,-y,0),x.push(0,0,1),g.push(_/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<a;y++){let _=y+l*p,v=y+l*(p+1),A=y+1+l*(p+1),S=y+1+l*p;d.push(_,v,S),d.push(v,A,S)}this.setIndex(d),this.setAttribute("position",new zt(m,3)),this.setAttribute("normal",new zt(x,3)),this.setAttribute("uv",new zt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},Mx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sx=`#ifdef USE_ALPHAHASH
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
#endif`,bx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,wx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ax=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ex=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Tx=`#ifdef USE_AOMAP
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
#endif`,Rx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cx=`#ifdef USE_BATCHING
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
#endif`,Ix=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Px=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Lx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Dx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Nx=`#ifdef USE_IRIDESCENCE
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
#endif`,Ux=`#ifdef USE_BUMPMAP
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
#endif`,Fx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ox=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,kx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Vx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Hx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Gx=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Wx=`#define PI 3.141592653589793
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
} // validated`,Xx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Yx=`vec3 transformedNormal = objectNormal;
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
#endif`,qx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Zx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$x=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Jx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Kx="gl_FragColor = linearToOutputTexel( gl_FragColor );",jx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qx=`#ifdef USE_ENVMAP
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
#endif`,ty=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ey=`#ifdef USE_ENVMAP
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
#endif`,ny=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,iy=`#ifdef USE_ENVMAP
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
#endif`,sy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ry=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,oy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ay=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cy=`#ifdef USE_GRADIENTMAP
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
}`,ly=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,uy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,fy=`uniform bool receiveShadow;
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
#endif`,dy=`#ifdef USE_ENVMAP
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
#endif`,py=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,my=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yy=`PhysicalMaterial material;
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
#endif`,_y=`struct PhysicalMaterial {
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
}`,vy=`
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
#endif`,My=`#if defined( RE_IndirectDiffuse )
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
#endif`,Sy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,by=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wy=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ay=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ey=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ty=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ry=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Iy=`#if defined( USE_POINTS_UV )
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
#endif`,Py=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ly=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Dy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ny=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Uy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fy=`#ifdef USE_MORPHTARGETS
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
#endif`,Oy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,By=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,zy=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ky=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gy=`#ifdef USE_NORMALMAP
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
#endif`,Wy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Yy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$y=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Jy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ky=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,jy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,t_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,e_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,n_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,i_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,s_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,r_=`float getShadowMask() {
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
}`,o_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,a_=`#ifdef USE_SKINNING
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
#endif`,c_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,l_=`#ifdef USE_SKINNING
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
#endif`,h_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,u_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,f_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,d_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,p_=`#ifdef USE_TRANSMISSION
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
#endif`,m_=`#ifdef USE_TRANSMISSION
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
#endif`,g_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,x_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,y_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,__=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,v_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,M_=`uniform sampler2D t2D;
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
}`,S_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,b_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,w_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,A_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,E_=`#include <common>
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
}`,T_=`#if DEPTH_PACKING == 3200
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
}`,R_=`#define DISTANCE
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
}`,C_=`#define DISTANCE
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
}`,I_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,P_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L_=`uniform float scale;
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
}`,D_=`uniform vec3 diffuse;
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
}`,N_=`#include <common>
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
}`,U_=`uniform vec3 diffuse;
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
}`,F_=`#define LAMBERT
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
}`,O_=`#define LAMBERT
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
}`,B_=`#define MATCAP
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
}`,z_=`#define MATCAP
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
}`,k_=`#define NORMAL
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
}`,V_=`#define NORMAL
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
}`,H_=`#define PHONG
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
}`,G_=`#define PHONG
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
}`,W_=`#define STANDARD
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
}`,X_=`#define STANDARD
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
}`,Y_=`#define TOON
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
}`,q_=`#define TOON
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
}`,Z_=`uniform float size;
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
}`,$_=`uniform vec3 diffuse;
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
}`,J_=`#include <common>
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
}`,K_=`uniform vec3 color;
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
}`,j_=`uniform float rotation;
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
}`,Q_=`uniform vec3 diffuse;
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
}`,se={alphahash_fragment:Mx,alphahash_pars_fragment:Sx,alphamap_fragment:bx,alphamap_pars_fragment:wx,alphatest_fragment:Ax,alphatest_pars_fragment:Ex,aomap_fragment:Tx,aomap_pars_fragment:Rx,batching_pars_vertex:Cx,batching_vertex:Ix,begin_vertex:Px,beginnormal_vertex:Lx,bsdfs:Dx,iridescence_fragment:Nx,bumpmap_pars_fragment:Ux,clipping_planes_fragment:Fx,clipping_planes_pars_fragment:Ox,clipping_planes_pars_vertex:Bx,clipping_planes_vertex:zx,color_fragment:kx,color_pars_fragment:Vx,color_pars_vertex:Hx,color_vertex:Gx,common:Wx,cube_uv_reflection_fragment:Xx,defaultnormal_vertex:Yx,displacementmap_pars_vertex:qx,displacementmap_vertex:Zx,emissivemap_fragment:$x,emissivemap_pars_fragment:Jx,colorspace_fragment:Kx,colorspace_pars_fragment:jx,envmap_fragment:Qx,envmap_common_pars_fragment:ty,envmap_pars_fragment:ey,envmap_pars_vertex:ny,envmap_physical_pars_fragment:dy,envmap_vertex:iy,fog_vertex:sy,fog_pars_vertex:ry,fog_fragment:oy,fog_pars_fragment:ay,gradientmap_pars_fragment:cy,lightmap_pars_fragment:ly,lights_lambert_fragment:hy,lights_lambert_pars_fragment:uy,lights_pars_begin:fy,lights_toon_fragment:py,lights_toon_pars_fragment:my,lights_phong_fragment:gy,lights_phong_pars_fragment:xy,lights_physical_fragment:yy,lights_physical_pars_fragment:_y,lights_fragment_begin:vy,lights_fragment_maps:My,lights_fragment_end:Sy,logdepthbuf_fragment:by,logdepthbuf_pars_fragment:wy,logdepthbuf_pars_vertex:Ay,logdepthbuf_vertex:Ey,map_fragment:Ty,map_pars_fragment:Ry,map_particle_fragment:Cy,map_particle_pars_fragment:Iy,metalnessmap_fragment:Py,metalnessmap_pars_fragment:Ly,morphinstance_vertex:Dy,morphcolor_vertex:Ny,morphnormal_vertex:Uy,morphtarget_pars_vertex:Fy,morphtarget_vertex:Oy,normal_fragment_begin:By,normal_fragment_maps:zy,normal_pars_fragment:ky,normal_pars_vertex:Vy,normal_vertex:Hy,normalmap_pars_fragment:Gy,clearcoat_normal_fragment_begin:Wy,clearcoat_normal_fragment_maps:Xy,clearcoat_pars_fragment:Yy,iridescence_pars_fragment:qy,opaque_fragment:Zy,packing:$y,premultiplied_alpha_fragment:Jy,project_vertex:Ky,dithering_fragment:jy,dithering_pars_fragment:Qy,roughnessmap_fragment:t_,roughnessmap_pars_fragment:e_,shadowmap_pars_fragment:n_,shadowmap_pars_vertex:i_,shadowmap_vertex:s_,shadowmask_pars_fragment:r_,skinbase_vertex:o_,skinning_pars_vertex:a_,skinning_vertex:c_,skinnormal_vertex:l_,specularmap_fragment:h_,specularmap_pars_fragment:u_,tonemapping_fragment:f_,tonemapping_pars_fragment:d_,transmission_fragment:p_,transmission_pars_fragment:m_,uv_pars_fragment:g_,uv_pars_vertex:x_,uv_vertex:y_,worldpos_vertex:__,background_vert:v_,background_frag:M_,backgroundCube_vert:S_,backgroundCube_frag:b_,cube_vert:w_,cube_frag:A_,depth_vert:E_,depth_frag:T_,distanceRGBA_vert:R_,distanceRGBA_frag:C_,equirect_vert:I_,equirect_frag:P_,linedashed_vert:L_,linedashed_frag:D_,meshbasic_vert:N_,meshbasic_frag:U_,meshlambert_vert:F_,meshlambert_frag:O_,meshmatcap_vert:B_,meshmatcap_frag:z_,meshnormal_vert:k_,meshnormal_frag:V_,meshphong_vert:H_,meshphong_frag:G_,meshphysical_vert:W_,meshphysical_frag:X_,meshtoon_vert:Y_,meshtoon_frag:q_,points_vert:Z_,points_frag:$_,shadow_vert:J_,shadow_frag:K_,sprite_vert:j_,sprite_frag:Q_},Pt={common:{diffuse:{value:new Ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new re}},envmap:{envMap:{value:null},envMapRotation:{value:new re},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new re}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new re}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new re},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new re},normalScale:{value:new ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new re},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new re}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new re}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new re}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0},uvTransform:{value:new re}},sprite:{diffuse:{value:new Ot(16777215)},opacity:{value:1},center:{value:new ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}}},Zn={basic:{uniforms:mn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.fog]),vertexShader:se.meshbasic_vert,fragmentShader:se.meshbasic_frag},lambert:{uniforms:mn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new Ot(0)}}]),vertexShader:se.meshlambert_vert,fragmentShader:se.meshlambert_frag},phong:{uniforms:mn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new Ot(0)},specular:{value:new Ot(1118481)},shininess:{value:30}}]),vertexShader:se.meshphong_vert,fragmentShader:se.meshphong_frag},standard:{uniforms:mn([Pt.common,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.roughnessmap,Pt.metalnessmap,Pt.fog,Pt.lights,{emissive:{value:new Ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag},toon:{uniforms:mn([Pt.common,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.gradientmap,Pt.fog,Pt.lights,{emissive:{value:new Ot(0)}}]),vertexShader:se.meshtoon_vert,fragmentShader:se.meshtoon_frag},matcap:{uniforms:mn([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,{matcap:{value:null}}]),vertexShader:se.meshmatcap_vert,fragmentShader:se.meshmatcap_frag},points:{uniforms:mn([Pt.points,Pt.fog]),vertexShader:se.points_vert,fragmentShader:se.points_frag},dashed:{uniforms:mn([Pt.common,Pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:se.linedashed_vert,fragmentShader:se.linedashed_frag},depth:{uniforms:mn([Pt.common,Pt.displacementmap]),vertexShader:se.depth_vert,fragmentShader:se.depth_frag},normal:{uniforms:mn([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,{opacity:{value:1}}]),vertexShader:se.meshnormal_vert,fragmentShader:se.meshnormal_frag},sprite:{uniforms:mn([Pt.sprite,Pt.fog]),vertexShader:se.sprite_vert,fragmentShader:se.sprite_frag},background:{uniforms:{uvTransform:{value:new re},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:se.background_vert,fragmentShader:se.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new re}},vertexShader:se.backgroundCube_vert,fragmentShader:se.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:se.cube_vert,fragmentShader:se.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:se.equirect_vert,fragmentShader:se.equirect_frag},distanceRGBA:{uniforms:mn([Pt.common,Pt.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:se.distanceRGBA_vert,fragmentShader:se.distanceRGBA_frag},shadow:{uniforms:mn([Pt.lights,Pt.fog,{color:{value:new Ot(0)},opacity:{value:1}}]),vertexShader:se.shadow_vert,fragmentShader:se.shadow_frag}};Zn.physical={uniforms:mn([Zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new re},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new re},clearcoatNormalScale:{value:new ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new re},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new re},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new re},sheen:{value:0},sheenColor:{value:new Ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new re},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new re},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new re},transmissionSamplerSize:{value:new ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new re},attenuationDistance:{value:0},attenuationColor:{value:new Ot(0)},specularColor:{value:new Ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new re},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new re},anisotropyVector:{value:new ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new re}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag};var Go={r:0,b:0,g:0},ji=new vn,tv=new Gt;function ev(i,t,e,n,s,r,o){let a=new Ot(0),c=r===!0?0:1,l,h,u=null,f=0,d=null;function m(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?e:t).get(_)),_}function x(y){let _=!1,v=m(y);v===null?p(a,c):v&&v.isColor&&(p(v,1),_=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(y,_){let v=m(_);v&&(v.isCubeTexture||v.mapping===Ca)?(h===void 0&&(h=new bt(new We(1,1,1),new Mn({name:"BackgroundCubeMaterial",uniforms:tr(Zn.backgroundCube.uniforms),vertexShader:Zn.backgroundCube.vertexShader,fragmentShader:Zn.backgroundCube.fragmentShader,side:hn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,S,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ji.copy(_.backgroundRotation),ji.x*=-1,ji.y*=-1,ji.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ji.y*=-1,ji.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(tv.makeRotationFromEuler(ji)),h.material.toneMapped=ge.getTransfer(v.colorSpace)!==we,(u!==v||f!==v.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=v,f=v.version,d=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new bt(new ve(2,2),new Mn({name:"BackgroundMaterial",uniforms:tr(Zn.background.uniforms),vertexShader:Zn.background.vertexShader,fragmentShader:Zn.background.fragmentShader,side:Fi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=ge.getTransfer(v.colorSpace)!==we,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=v,f=v.version,d=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,_){y.getRGB(Go,dd(i)),n.buffers.color.setClear(Go.r,Go.g,Go.b,_,o)}return{getClearColor:function(){return a},setClearColor:function(y,_=1){a.set(y),c=_,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(a,c)},render:x,addToRenderList:g}}function nv(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(M,R,N,L,C){let B=!1,U=u(L,N,R);r!==U&&(r=U,l(r.object)),B=d(M,L,N,C),B&&m(M,L,N,C),C!==null&&t.update(C,i.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,v(M,R,N,L),C!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(C).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,R,N){let L=N.wireframe===!0,C=n[M.id];C===void 0&&(C={},n[M.id]=C);let B=C[R.id];B===void 0&&(B={},C[R.id]=B);let U=B[L];return U===void 0&&(U=f(c()),B[L]=U),U}function f(M){let R=[],N=[],L=[];for(let C=0;C<e;C++)R[C]=0,N[C]=0,L[C]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:N,attributeDivisors:L,object:M,attributes:{},index:null}}function d(M,R,N,L){let C=r.attributes,B=R.attributes,U=0,z=N.getAttributes();for(let F in z)if(z[F].location>=0){let $=C[F],ct=B[F];if(ct===void 0&&(F==="instanceMatrix"&&M.instanceMatrix&&(ct=M.instanceMatrix),F==="instanceColor"&&M.instanceColor&&(ct=M.instanceColor)),$===void 0||$.attribute!==ct||ct&&$.data!==ct.data)return!0;U++}return r.attributesNum!==U||r.index!==L}function m(M,R,N,L){let C={},B=R.attributes,U=0,z=N.getAttributes();for(let F in z)if(z[F].location>=0){let $=B[F];$===void 0&&(F==="instanceMatrix"&&M.instanceMatrix&&($=M.instanceMatrix),F==="instanceColor"&&M.instanceColor&&($=M.instanceColor));let ct={};ct.attribute=$,$&&$.data&&(ct.data=$.data),C[F]=ct,U++}r.attributes=C,r.attributesNum=U,r.index=L}function x(){let M=r.newAttributes;for(let R=0,N=M.length;R<N;R++)M[R]=0}function g(M){p(M,0)}function p(M,R){let N=r.newAttributes,L=r.enabledAttributes,C=r.attributeDivisors;N[M]=1,L[M]===0&&(i.enableVertexAttribArray(M),L[M]=1),C[M]!==R&&(i.vertexAttribDivisor(M,R),C[M]=R)}function y(){let M=r.newAttributes,R=r.enabledAttributes;for(let N=0,L=R.length;N<L;N++)R[N]!==M[N]&&(i.disableVertexAttribArray(N),R[N]=0)}function _(M,R,N,L,C,B,U){U===!0?i.vertexAttribIPointer(M,R,N,C,B):i.vertexAttribPointer(M,R,N,L,C,B)}function v(M,R,N,L){x();let C=L.attributes,B=N.getAttributes(),U=R.defaultAttributeValues;for(let z in B){let F=B[z];if(F.location>=0){let J=C[z];if(J===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(J=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(J=M.instanceColor)),J!==void 0){let $=J.normalized,ct=J.itemSize,ht=t.get(J);if(ht===void 0)continue;let Mt=ht.buffer,j=ht.type,Y=ht.bytesPerElement,Z=j===i.INT||j===i.UNSIGNED_INT||J.gpuType===Th;if(J.isInterleavedBufferAttribute){let et=J.data,mt=et.stride,Rt=J.offset;if(et.isInstancedInterleavedBuffer){for(let Ut=0;Ut<F.locationSize;Ut++)p(F.location+Ut,et.meshPerAttribute);M.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let Ut=0;Ut<F.locationSize;Ut++)g(F.location+Ut);i.bindBuffer(i.ARRAY_BUFFER,Mt);for(let Ut=0;Ut<F.locationSize;Ut++)_(F.location+Ut,ct/F.locationSize,j,$,mt*Y,(Rt+ct/F.locationSize*Ut)*Y,Z)}else{if(J.isInstancedBufferAttribute){for(let et=0;et<F.locationSize;et++)p(F.location+et,J.meshPerAttribute);M.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let et=0;et<F.locationSize;et++)g(F.location+et);i.bindBuffer(i.ARRAY_BUFFER,Mt);for(let et=0;et<F.locationSize;et++)_(F.location+et,ct/F.locationSize,j,$,ct*Y,ct/F.locationSize*et*Y,Z)}}else if(U!==void 0){let $=U[z];if($!==void 0)switch($.length){case 2:i.vertexAttrib2fv(F.location,$);break;case 3:i.vertexAttrib3fv(F.location,$);break;case 4:i.vertexAttrib4fv(F.location,$);break;default:i.vertexAttrib1fv(F.location,$)}}}}y()}function A(){E();for(let M in n){let R=n[M];for(let N in R){let L=R[N];for(let C in L)h(L[C].object),delete L[C];delete R[N]}delete n[M]}}function S(M){if(n[M.id]===void 0)return;let R=n[M.id];for(let N in R){let L=R[N];for(let C in L)h(L[C].object),delete L[C];delete R[N]}delete n[M.id]}function w(M){for(let R in n){let N=n[R];if(N[M.id]===void 0)continue;let L=N[M.id];for(let C in L)h(L[C].object),delete L[C];delete N[M.id]}}function E(){b(),o=!0,r!==s&&(r=s,l(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:E,resetDefaultState:b,dispose:A,releaseStatesOfGeometry:S,releaseStatesOfProgram:w,initAttributes:x,enableAttribute:g,disableUnusedAttributes:y}}function iv(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let m=0;m<u;m++)d+=h[m];e.update(d,n,1)}function c(l,h,u,f){if(u===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<l.length;m++)o(l[m],h[m],f[m]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let m=0;for(let x=0;x<u;x++)m+=h[x]*f[x];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function sv(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let w=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==Ke&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){let E=w===fs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==gi&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Jn&&!E)}function c(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),_=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=m>0,S=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:y,maxVaryings:_,maxFragmentUniforms:v,vertexTextures:A,maxSamples:S}}function rv(i){let t=this,e=null,n=0,s=!1,r=!1,o=new ui,a=new re,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){let m=u.clippingPlanes,x=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!g)r?h(null):l();else{let y=r?0:n,_=y*4,v=p.clippingState||null;c.value=v,v=h(m,f,_,d);for(let A=0;A!==_;++A)v[A]=e[A];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,m){let x=u!==null?u.length:0,g=null;if(x!==0){if(g=c.value,m!==!0||g===null){let p=d+x*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let _=0,v=d;_!==x;++_,v+=4)o.copy(u[_]).applyMatrix4(y,a),o.normal.toArray(g,v),g[v+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,g}}function ov(i){let t=new WeakMap;function e(o,a){return a===ul?o.mapping=Js:a===fl&&(o.mapping=Ks),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===ul||a===fl)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Gr(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var er=class extends fa{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Gs=4,df=[.125,.215,.35,.446,.526,.582],ns=20,Wc=new er,pf=new Ot,Xc=null,Yc=0,qc=0,Zc=!1,ts=(1+Math.sqrt(5))/2,Os=1/ts,mf=[new D(-ts,Os,0),new D(ts,Os,0),new D(-Os,0,ts),new D(Os,0,ts),new D(0,ts,-Os),new D(0,ts,Os),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],nr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Xc=this._renderer.getRenderTarget(),Yc=this._renderer.getActiveCubeFace(),qc=this._renderer.getActiveMipmapLevel(),Zc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Xc,Yc,qc),this._renderer.xr.enabled=Zc,t.scissorTest=!1,Wo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Js||t.mapping===Ks?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Xc=this._renderer.getRenderTarget(),Yc=this._renderer.getActiveCubeFace(),qc=this._renderer.getActiveMipmapLevel(),Zc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:rn,minFilter:rn,generateMipmaps:!1,type:fs,format:Ke,colorSpace:Hi,depthBuffer:!1},s=gf(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gf(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=av(r)),this._blurMaterial=cv(r,t,e)}return s}_compileMaterial(t){let e=new bt(this._lodPlanes[0],t);this._renderer.compile(e,Wc)}_sceneToCubeUV(t,e,n,s){let a=new ln(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(pf),h.toneMapping=Ni,h.autoClear=!1;let d=new Be({name:"PMREM.Background",side:hn,depthWrite:!1,depthTest:!1}),m=new bt(new We,d),x=!1,g=t.background;g?g.isColor&&(d.color.copy(g),t.background=null,x=!0):(d.color.copy(pf),x=!0);for(let p=0;p<6;p++){let y=p%3;y===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):y===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let _=this._cubeSize;Wo(s,y*_,p>2?_:0,_,_),h.setRenderTarget(s),x&&h.render(m,a),h.render(t,a)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=g}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Js||t.mapping===Ks;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=yf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xf());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new bt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;Wo(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Wc)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=mf[(s-r-1)%mf.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new bt(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*ns-1),x=r/m,g=isFinite(r)?1+Math.floor(h*x):ns;g>ns&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ns}`);let p=[],y=0;for(let w=0;w<ns;++w){let E=w/x,b=Math.exp(-E*E/2);p.push(b),w===0?y+=b:w<g&&(y+=2*b)}for(let w=0;w<p.length;w++)p[w]=p[w]/y;f.envMap.value=t.texture,f.samples.value=g,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:_}=this;f.dTheta.value=m,f.mipInt.value=_-n;let v=this._sizeLods[s],A=3*v*(s>_-Gs?s-_+Gs:0),S=4*(this._cubeSize-v);Wo(e,A,S,3*v,2*v),c.setRenderTarget(e),c.render(u,Wc)}};function av(i){let t=[],e=[],n=[],s=i,r=i-Gs+1+df.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-Gs?c=df[o-i+Gs-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,m=6,x=3,g=2,p=1,y=new Float32Array(x*m*d),_=new Float32Array(g*m*d),v=new Float32Array(p*m*d);for(let S=0;S<d;S++){let w=S%3*2/3-1,E=S>2?0:-1,b=[w,E,0,w+2/3,E,0,w+2/3,E+1,0,w,E,0,w+2/3,E+1,0,w,E+1,0];y.set(b,x*m*S),_.set(f,g*m*S);let M=[S,S,S,S,S,S];v.set(M,p*m*S)}let A=new fe;A.setAttribute("position",new Ne(y,x)),A.setAttribute("uv",new Ne(_,g)),A.setAttribute("faceIndex",new Ne(v,p)),t.push(A),s>Gs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function gf(i,t,e){let n=new Pn(i,t,e);return n.texture.mapping=Ca,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Wo(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function cv(i,t,e){let n=new Float32Array(ns),s=new D(0,1,0);return new Mn({name:"SphericalGaussianBlur",defines:{n:ns,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Dh(),fragmentShader:`

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
		`,blending:Di,depthTest:!1,depthWrite:!1})}function xf(){return new Mn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Dh(),fragmentShader:`

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
		`,blending:Di,depthTest:!1,depthWrite:!1})}function yf(){return new Mn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Dh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Di,depthTest:!1,depthWrite:!1})}function Dh(){return`

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
	`}function lv(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===ul||c===fl,h=c===Js||c===Ks;if(l||h){let u=t.get(a),f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new nr(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let d=a.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new nr(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function hv(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Nr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function uv(i,t,e,n){let s={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let m in f.attributes)t.remove(f.attributes[m]);for(let m in f.morphAttributes){let x=f.morphAttributes[m];for(let g=0,p=x.length;g<p;g++)t.remove(x[g])}f.removeEventListener("dispose",o),delete s[f.id];let d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){let f=u.attributes;for(let m in f)t.update(f[m],i.ARRAY_BUFFER);let d=u.morphAttributes;for(let m in d){let x=d[m];for(let g=0,p=x.length;g<p;g++)t.update(x[g],i.ARRAY_BUFFER)}}function l(u){let f=[],d=u.index,m=u.attributes.position,x=0;if(d!==null){let y=d.array;x=d.version;for(let _=0,v=y.length;_<v;_+=3){let A=y[_+0],S=y[_+1],w=y[_+2];f.push(A,S,S,w,w,A)}}else if(m!==void 0){let y=m.array;x=m.version;for(let _=0,v=y.length/3-1;_<v;_+=3){let A=_+0,S=_+1,w=_+2;f.push(A,S,S,w,w,A)}}else return;let g=new(ud(f)?ua:ha)(f,1);g.version=x;let p=r.get(u);p&&t.remove(p),r.set(u,g)}function h(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function fv(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*o),e.update(d,n,1)}function l(f,d,m){m!==0&&(i.drawElementsInstanced(n,d,r,f*o,m),e.update(d,n,m))}function h(f,d,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,m);let g=0;for(let p=0;p<m;p++)g+=d[p];e.update(g,n,1)}function u(f,d,m,x){if(m===0)return;let g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],x[p]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,x,0,m);let p=0;for(let y=0;y<m;y++)p+=d[y]*x[y];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function dv(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function pv(i,t,e){let n=new WeakMap,s=new de;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(a);if(f===void 0||f.count!==u){let b=function(){w.dispose(),n.delete(a),a.removeEventListener("dispose",b)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],y=a.morphAttributes.color||[],_=0;d===!0&&(_=1),m===!0&&(_=2),x===!0&&(_=3);let v=a.attributes.position.count*_,A=1;v>t.maxTextureSize&&(A=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let S=new Float32Array(v*A*4*u),w=new ca(S,v,A,u);w.type=Jn,w.needsUpdate=!0;let E=_*4;for(let M=0;M<u;M++){let R=g[M],N=p[M],L=y[M],C=v*A*4*M;for(let B=0;B<R.count;B++){let U=B*E;d===!0&&(s.fromBufferAttribute(R,B),S[C+U+0]=s.x,S[C+U+1]=s.y,S[C+U+2]=s.z,S[C+U+3]=0),m===!0&&(s.fromBufferAttribute(N,B),S[C+U+4]=s.x,S[C+U+5]=s.y,S[C+U+6]=s.z,S[C+U+7]=0),x===!0&&(s.fromBufferAttribute(L,B),S[C+U+8]=s.x,S[C+U+9]=s.y,S[C+U+10]=s.z,S[C+U+11]=L.itemSize===4?s.w:1)}}f={count:u,texture:w,size:new ft(v,A)},n.set(a,f),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let x=0;x<l.length;x++)d+=l[x];let m=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function mv(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var ir=class extends gn{constructor(t,e,n,s,r,o,a,c,l,h=Ys){if(h!==Ys&&h!==Qs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ys&&(n=is),n===void 0&&h===Qs&&(n=js),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:En,this.minFilter=c!==void 0?c:En,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},md=new gn,_f=new ir(1,1),gd=new ca,xd=new Xl,yd=new da,vf=[],Mf=[],Sf=new Float32Array(16),bf=new Float32Array(9),wf=new Float32Array(4);function ar(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=vf[s];if(r===void 0&&(r=new Float32Array(s),vf[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function je(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Qe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Pa(i,t){let e=Mf[t];e===void 0&&(e=new Int32Array(t),Mf[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function gv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function xv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(je(e,t))return;i.uniform2fv(this.addr,t),Qe(e,t)}}function yv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(je(e,t))return;i.uniform3fv(this.addr,t),Qe(e,t)}}function _v(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(je(e,t))return;i.uniform4fv(this.addr,t),Qe(e,t)}}function vv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(je(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Qe(e,t)}else{if(je(e,n))return;wf.set(n),i.uniformMatrix2fv(this.addr,!1,wf),Qe(e,n)}}function Mv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(je(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Qe(e,t)}else{if(je(e,n))return;bf.set(n),i.uniformMatrix3fv(this.addr,!1,bf),Qe(e,n)}}function Sv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(je(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Qe(e,t)}else{if(je(e,n))return;Sf.set(n),i.uniformMatrix4fv(this.addr,!1,Sf),Qe(e,n)}}function bv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function wv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(je(e,t))return;i.uniform2iv(this.addr,t),Qe(e,t)}}function Av(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(je(e,t))return;i.uniform3iv(this.addr,t),Qe(e,t)}}function Ev(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(je(e,t))return;i.uniform4iv(this.addr,t),Qe(e,t)}}function Tv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Rv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(je(e,t))return;i.uniform2uiv(this.addr,t),Qe(e,t)}}function Cv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(je(e,t))return;i.uniform3uiv(this.addr,t),Qe(e,t)}}function Iv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(je(e,t))return;i.uniform4uiv(this.addr,t),Qe(e,t)}}function Pv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(_f.compareFunction=hd,r=_f):r=md,e.setTexture2D(t||r,s)}function Lv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||xd,s)}function Dv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||yd,s)}function Nv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||gd,s)}function Uv(i){switch(i){case 5126:return gv;case 35664:return xv;case 35665:return yv;case 35666:return _v;case 35674:return vv;case 35675:return Mv;case 35676:return Sv;case 5124:case 35670:return bv;case 35667:case 35671:return wv;case 35668:case 35672:return Av;case 35669:case 35673:return Ev;case 5125:return Tv;case 36294:return Rv;case 36295:return Cv;case 36296:return Iv;case 35678:case 36198:case 36298:case 36306:case 35682:return Pv;case 35679:case 36299:case 36307:return Lv;case 35680:case 36300:case 36308:case 36293:return Dv;case 36289:case 36303:case 36311:case 36292:return Nv}}function Fv(i,t){i.uniform1fv(this.addr,t)}function Ov(i,t){let e=ar(t,this.size,2);i.uniform2fv(this.addr,e)}function Bv(i,t){let e=ar(t,this.size,3);i.uniform3fv(this.addr,e)}function zv(i,t){let e=ar(t,this.size,4);i.uniform4fv(this.addr,e)}function kv(i,t){let e=ar(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Vv(i,t){let e=ar(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Hv(i,t){let e=ar(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Gv(i,t){i.uniform1iv(this.addr,t)}function Wv(i,t){i.uniform2iv(this.addr,t)}function Xv(i,t){i.uniform3iv(this.addr,t)}function Yv(i,t){i.uniform4iv(this.addr,t)}function qv(i,t){i.uniform1uiv(this.addr,t)}function Zv(i,t){i.uniform2uiv(this.addr,t)}function $v(i,t){i.uniform3uiv(this.addr,t)}function Jv(i,t){i.uniform4uiv(this.addr,t)}function Kv(i,t,e){let n=this.cache,s=t.length,r=Pa(e,s);je(n,r)||(i.uniform1iv(this.addr,r),Qe(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||md,r[o])}function jv(i,t,e){let n=this.cache,s=t.length,r=Pa(e,s);je(n,r)||(i.uniform1iv(this.addr,r),Qe(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||xd,r[o])}function Qv(i,t,e){let n=this.cache,s=t.length,r=Pa(e,s);je(n,r)||(i.uniform1iv(this.addr,r),Qe(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||yd,r[o])}function t1(i,t,e){let n=this.cache,s=t.length,r=Pa(e,s);je(n,r)||(i.uniform1iv(this.addr,r),Qe(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||gd,r[o])}function e1(i){switch(i){case 5126:return Fv;case 35664:return Ov;case 35665:return Bv;case 35666:return zv;case 35674:return kv;case 35675:return Vv;case 35676:return Hv;case 5124:case 35670:return Gv;case 35667:case 35671:return Wv;case 35668:case 35672:return Xv;case 35669:case 35673:return Yv;case 5125:return qv;case 36294:return Zv;case 36295:return $v;case 36296:return Jv;case 35678:case 36198:case 36298:case 36306:case 35682:return Kv;case 35679:case 36299:case 36307:return jv;case 35680:case 36300:case 36308:case 36293:return Qv;case 36289:case 36303:case 36311:case 36292:return t1}}var Yl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Uv(e.type)}},ql=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=e1(e.type)}},Zl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},$c=/(\w+)(\])?(\[|\.)?/g;function Af(i,t){i.seq.push(t),i.map[t.id]=t}function n1(i,t,e){let n=i.name,s=n.length;for($c.lastIndex=0;;){let r=$c.exec(n),o=$c.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Af(e,l===void 0?new Yl(a,i,t):new ql(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Zl(a),Af(e,u)),e=u}}}var Zs=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);n1(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function Ef(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var i1=37297,s1=0;function r1(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Tf=new re;function o1(i){ge._getMatrix(Tf,ge.workingColorSpace,i);let t=`mat3( ${Tf.elements.map(e=>e.toFixed(4))} )`;switch(ge.getTransfer(i)){case Ia:return[t,"LinearTransferOETF"];case we:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Rf(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+r1(i.getShaderSource(t),o)}else return s}function a1(i,t){let e=o1(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function c1(i,t){let e;switch(t){case Ug:e="Linear";break;case Fg:e="Reinhard";break;case Og:e="Cineon";break;case Bg:e="ACESFilmic";break;case Eh:e="AgX";break;case kg:e="Neutral";break;case zg:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Xo=new D;function l1(){ge.getLuminanceCoefficients(Xo);let i=Xo.x.toFixed(4),t=Xo.y.toFixed(4),e=Xo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function h1(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ur).join(`
`)}function u1(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function f1(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ur(i){return i!==""}function Cf(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function If(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var d1=/^[ \t]*#include +<([\w\d./]+)>/gm;function $l(i){return i.replace(d1,m1)}var p1=new Map;function m1(i,t){let e=se[t];if(e===void 0){let n=p1.get(t);if(n!==void 0)e=se[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return $l(e)}var g1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Pf(i){return i.replace(g1,x1)}function x1(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Lf(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function y1(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Kf?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ah?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===hi&&(t="SHADOWMAP_TYPE_VSM"),t}function _1(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Js:case Ks:t="ENVMAP_TYPE_CUBE";break;case Ca:t="ENVMAP_TYPE_CUBE_UV";break}return t}function v1(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ks:t="ENVMAP_MODE_REFRACTION";break}return t}function M1(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case jf:t="ENVMAP_BLENDING_MULTIPLY";break;case Dg:t="ENVMAP_BLENDING_MIX";break;case Ng:t="ENVMAP_BLENDING_ADD";break}return t}function S1(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function b1(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=y1(e),l=_1(e),h=v1(e),u=M1(e),f=S1(e),d=h1(e),m=u1(r),x=s.createProgram(),g,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ur).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ur).join(`
`),p.length>0&&(p+=`
`)):(g=[Lf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ur).join(`
`),p=[Lf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ni?"#define TONE_MAPPING":"",e.toneMapping!==Ni?se.tonemapping_pars_fragment:"",e.toneMapping!==Ni?c1("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",se.colorspace_pars_fragment,a1("linearToOutputTexel",e.outputColorSpace),l1(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ur).join(`
`)),o=$l(o),o=Cf(o,e),o=If(o,e),a=$l(a),a=Cf(a,e),a=If(a,e),o=Pf(o),a=Pf(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Xu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Xu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let _=y+g+o,v=y+p+a,A=Ef(s,s.VERTEX_SHADER,_),S=Ef(s,s.FRAGMENT_SHADER,v);s.attachShader(x,A),s.attachShader(x,S),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function w(R){if(i.debug.checkShaderErrors){let N=s.getProgramInfoLog(x).trim(),L=s.getShaderInfoLog(A).trim(),C=s.getShaderInfoLog(S).trim(),B=!0,U=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(B=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,A,S);else{let z=Rf(s,A,"vertex"),F=Rf(s,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+N+`
`+z+`
`+F)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(L===""||C==="")&&(U=!1);U&&(R.diagnostics={runnable:B,programLog:N,vertexShader:{log:L,prefix:g},fragmentShader:{log:C,prefix:p}})}s.deleteShader(A),s.deleteShader(S),E=new Zs(s,x),b=f1(s,x)}let E;this.getUniforms=function(){return E===void 0&&w(this),E};let b;this.getAttributes=function(){return b===void 0&&w(this),b};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(x,i1)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=s1++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=S,this}var w1=0,Jl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Kl(t),e.set(t,n)),n}},Kl=class{constructor(t){this.id=w1++,this.code=t,this.usedTimes=0}};function A1(i,t,e,n,s,r,o){let a=new Vr,c=new Jl,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures,d=s.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return l.add(b),b===0?"uv":`uv${b}`}function g(b,M,R,N,L){let C=N.fog,B=L.geometry,U=b.isMeshStandardMaterial?N.environment:null,z=(b.isMeshStandardMaterial?e:t).get(b.envMap||U),F=z&&z.mapping===Ca?z.image.height:null,J=m[b.type];b.precision!==null&&(d=s.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));let $=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ct=$!==void 0?$.length:0,ht=0;B.morphAttributes.position!==void 0&&(ht=1),B.morphAttributes.normal!==void 0&&(ht=2),B.morphAttributes.color!==void 0&&(ht=3);let Mt,j,Y,Z;if(J){let Ft=Zn[J];Mt=Ft.vertexShader,j=Ft.fragmentShader}else Mt=b.vertexShader,j=b.fragmentShader,c.update(b),Y=c.getVertexShaderID(b),Z=c.getFragmentShaderID(b);let et=i.getRenderTarget(),mt=i.state.buffers.depth.getReversed(),Rt=L.isInstancedMesh===!0,Ut=L.isBatchedMesh===!0,Xt=!!b.map,it=!!b.matcap,lt=!!z,O=!!b.aoMap,Ct=!!b.lightMap,dt=!!b.bumpMap,St=!!b.normalMap,rt=!!b.displacementMap,xt=!!b.emissiveMap,ut=!!b.metalnessMap,I=!!b.roughnessMap,T=b.anisotropy>0,W=b.clearcoat>0,nt=b.dispersion>0,ot=b.iridescence>0,at=b.sheen>0,Bt=b.transmission>0,At=T&&!!b.anisotropyMap,Lt=W&&!!b.clearcoatMap,ne=W&&!!b.clearcoatNormalMap,gt=W&&!!b.clearcoatRoughnessMap,wt=ot&&!!b.iridescenceMap,kt=ot&&!!b.iridescenceThicknessMap,Yt=at&&!!b.sheenColorMap,It=at&&!!b.sheenRoughnessMap,Wt=!!b.specularMap,Kt=!!b.specularColorMap,Qt=!!b.specularIntensityMap,X=Bt&&!!b.transmissionMap,H=Bt&&!!b.thicknessMap,k=!!b.gradientMap,V=!!b.alphaMap,Q=b.alphaTest>0,st=!!b.alphaHash,pt=!!b.extensions,Et=Ni;b.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(Et=i.toneMapping);let Vt={shaderID:J,shaderType:b.type,shaderName:b.name,vertexShader:Mt,fragmentShader:j,defines:b.defines,customVertexShaderID:Y,customFragmentShaderID:Z,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:Ut,batchingColor:Ut&&L._colorsTexture!==null,instancing:Rt,instancingColor:Rt&&L.instanceColor!==null,instancingMorph:Rt&&L.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:et===null?i.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:Hi,alphaToCoverage:!!b.alphaToCoverage,map:Xt,matcap:it,envMap:lt,envMapMode:lt&&z.mapping,envMapCubeUVHeight:F,aoMap:O,lightMap:Ct,bumpMap:dt,normalMap:St,displacementMap:f&&rt,emissiveMap:xt,normalMapObjectSpace:St&&b.normalMapType===Gg,normalMapTangentSpace:St&&b.normalMapType===ld,metalnessMap:ut,roughnessMap:I,anisotropy:T,anisotropyMap:At,clearcoat:W,clearcoatMap:Lt,clearcoatNormalMap:ne,clearcoatRoughnessMap:gt,dispersion:nt,iridescence:ot,iridescenceMap:wt,iridescenceThicknessMap:kt,sheen:at,sheenColorMap:Yt,sheenRoughnessMap:It,specularMap:Wt,specularColorMap:Kt,specularIntensityMap:Qt,transmission:Bt,transmissionMap:X,thicknessMap:H,gradientMap:k,opaque:b.transparent===!1&&b.blending===Xs&&b.alphaToCoverage===!1,alphaMap:V,alphaTest:Q,alphaHash:st,combine:b.combine,mapUv:Xt&&x(b.map.channel),aoMapUv:O&&x(b.aoMap.channel),lightMapUv:Ct&&x(b.lightMap.channel),bumpMapUv:dt&&x(b.bumpMap.channel),normalMapUv:St&&x(b.normalMap.channel),displacementMapUv:rt&&x(b.displacementMap.channel),emissiveMapUv:xt&&x(b.emissiveMap.channel),metalnessMapUv:ut&&x(b.metalnessMap.channel),roughnessMapUv:I&&x(b.roughnessMap.channel),anisotropyMapUv:At&&x(b.anisotropyMap.channel),clearcoatMapUv:Lt&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:ne&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:gt&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:wt&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:kt&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:Yt&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:It&&x(b.sheenRoughnessMap.channel),specularMapUv:Wt&&x(b.specularMap.channel),specularColorMapUv:Kt&&x(b.specularColorMap.channel),specularIntensityMapUv:Qt&&x(b.specularIntensityMap.channel),transmissionMapUv:X&&x(b.transmissionMap.channel),thicknessMapUv:H&&x(b.thicknessMap.channel),alphaMapUv:V&&x(b.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(St||T),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!B.attributes.uv&&(Xt||V),fog:!!C,useFog:b.fog===!0,fogExp2:!!C&&C.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:mt,skinning:L.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:ct,morphTextureStride:ht,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:Et,decodeVideoTexture:Xt&&b.map.isVideoTexture===!0&&ge.getTransfer(b.map.colorSpace)===we,decodeVideoTextureEmissive:xt&&b.emissiveMap.isVideoTexture===!0&&ge.getTransfer(b.emissiveMap.colorSpace)===we,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Pe,flipSided:b.side===hn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:pt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(pt&&b.extensions.multiDraw===!0||Ut)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Vt.vertexUv1s=l.has(1),Vt.vertexUv2s=l.has(2),Vt.vertexUv3s=l.has(3),l.clear(),Vt}function p(b){let M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(let R in b.defines)M.push(R),M.push(b.defines[R]);return b.isRawShaderMaterial===!1&&(y(M,b),_(M,b),M.push(i.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function y(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function _(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function v(b){let M=m[b.type],R;if(M){let N=Zn[M];R=mx.clone(N.uniforms)}else R=b.uniforms;return R}function A(b,M){let R;for(let N=0,L=h.length;N<L;N++){let C=h[N];if(C.cacheKey===M){R=C,++R.usedTimes;break}}return R===void 0&&(R=new b1(i,M,b,r),h.push(R)),R}function S(b){if(--b.usedTimes===0){let M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function w(b){c.remove(b)}function E(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:A,releaseProgram:S,releaseShaderCache:w,programs:h,dispose:E}}function E1(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function T1(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Df(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Nf(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,f,d,m,x,g){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:m,renderOrder:u.renderOrder,z:x,group:g},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=x,p.group=g),t++,p}function a(u,f,d,m,x,g){let p=o(u,f,d,m,x,g);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function c(u,f,d,m,x,g){let p=o(u,f,d,m,x,g);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,f){e.length>1&&e.sort(u||T1),n.length>1&&n.sort(f||Df),s.length>1&&s.sort(f||Df)}function h(){for(let u=t,f=i.length;u<f;u++){let d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function R1(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Nf,i.set(n,[o])):s>=r.length?(o=new Nf,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function C1(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Ot};break;case"SpotLight":e={position:new D,direction:new D,color:new Ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Ot,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Ot,groundColor:new Ot};break;case"RectAreaLight":e={color:new Ot,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function I1(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var P1=0;function L1(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function D1(i){let t=new C1,e=I1(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);let s=new D,r=new Gt,o=new Gt;function a(l){let h=0,u=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let d=0,m=0,x=0,g=0,p=0,y=0,_=0,v=0,A=0,S=0,w=0;l.sort(L1);for(let b=0,M=l.length;b<M;b++){let R=l[b],N=R.color,L=R.intensity,C=R.distance,B=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=N.r*L,u+=N.g*L,f+=N.b*L;else if(R.isLightProbe){for(let U=0;U<9;U++)n.probe[U].addScaledVector(R.sh.coefficients[U],L);w++}else if(R.isDirectionalLight){let U=t.get(R);if(U.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let z=R.shadow,F=e.get(R);F.shadowIntensity=z.intensity,F.shadowBias=z.bias,F.shadowNormalBias=z.normalBias,F.shadowRadius=z.radius,F.shadowMapSize=z.mapSize,n.directionalShadow[d]=F,n.directionalShadowMap[d]=B,n.directionalShadowMatrix[d]=R.shadow.matrix,y++}n.directional[d]=U,d++}else if(R.isSpotLight){let U=t.get(R);U.position.setFromMatrixPosition(R.matrixWorld),U.color.copy(N).multiplyScalar(L),U.distance=C,U.coneCos=Math.cos(R.angle),U.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),U.decay=R.decay,n.spot[x]=U;let z=R.shadow;if(R.map&&(n.spotLightMap[A]=R.map,A++,z.updateMatrices(R),R.castShadow&&S++),n.spotLightMatrix[x]=z.matrix,R.castShadow){let F=e.get(R);F.shadowIntensity=z.intensity,F.shadowBias=z.bias,F.shadowNormalBias=z.normalBias,F.shadowRadius=z.radius,F.shadowMapSize=z.mapSize,n.spotShadow[x]=F,n.spotShadowMap[x]=B,v++}x++}else if(R.isRectAreaLight){let U=t.get(R);U.color.copy(N).multiplyScalar(L),U.halfWidth.set(R.width*.5,0,0),U.halfHeight.set(0,R.height*.5,0),n.rectArea[g]=U,g++}else if(R.isPointLight){let U=t.get(R);if(U.color.copy(R.color).multiplyScalar(R.intensity),U.distance=R.distance,U.decay=R.decay,R.castShadow){let z=R.shadow,F=e.get(R);F.shadowIntensity=z.intensity,F.shadowBias=z.bias,F.shadowNormalBias=z.normalBias,F.shadowRadius=z.radius,F.shadowMapSize=z.mapSize,F.shadowCameraNear=z.camera.near,F.shadowCameraFar=z.camera.far,n.pointShadow[m]=F,n.pointShadowMap[m]=B,n.pointShadowMatrix[m]=R.shadow.matrix,_++}n.point[m]=U,m++}else if(R.isHemisphereLight){let U=t.get(R);U.skyColor.copy(R.color).multiplyScalar(L),U.groundColor.copy(R.groundColor).multiplyScalar(L),n.hemi[p]=U,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Pt.LTC_FLOAT_1,n.rectAreaLTC2=Pt.LTC_FLOAT_2):(n.rectAreaLTC1=Pt.LTC_HALF_1,n.rectAreaLTC2=Pt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let E=n.hash;(E.directionalLength!==d||E.pointLength!==m||E.spotLength!==x||E.rectAreaLength!==g||E.hemiLength!==p||E.numDirectionalShadows!==y||E.numPointShadows!==_||E.numSpotShadows!==v||E.numSpotMaps!==A||E.numLightProbes!==w)&&(n.directional.length=d,n.spot.length=x,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=v+A-S,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=w,E.directionalLength=d,E.pointLength=m,E.spotLength=x,E.rectAreaLength=g,E.hemiLength=p,E.numDirectionalShadows=y,E.numPointShadows=_,E.numSpotShadows=v,E.numSpotMaps=A,E.numLightProbes=w,n.version=P1++)}function c(l,h){let u=0,f=0,d=0,m=0,x=0,g=h.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){let _=l[p];if(_.isDirectionalLight){let v=n.directional[u];v.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),u++}else if(_.isSpotLight){let v=n.spot[d];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),d++}else if(_.isRectAreaLight){let v=n.rectArea[m];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(g),o.identity(),r.copy(_.matrixWorld),r.premultiply(g),o.extractRotation(r),v.halfWidth.set(_.width*.5,0,0),v.halfHeight.set(0,_.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),m++}else if(_.isPointLight){let v=n.point[f];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(g),f++}else if(_.isHemisphereLight){let v=n.hemi[x];v.direction.setFromMatrixPosition(_.matrixWorld),v.direction.transformDirection(g),x++}}}return{setup:a,setupView:c,state:n}}function Uf(i){let t=new D1(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function N1(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Uf(i),t.set(s,[a])):r>=o.length?(a=new Uf(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var rs=class extends Bi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Hg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},jl=class extends Bi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},U1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,F1=`uniform sampler2D shadow_pass;
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
}`;function O1(i,t,e){let n=new Wr,s=new ft,r=new ft,o=new de,a=new rs({depthPacking:so}),c=new jl,l={},h=e.maxTextureSize,u={[Fi]:hn,[hn]:Fi,[Pe]:Pe},f=new Mn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ft},radius:{value:4}},vertexShader:U1,fragmentShader:F1}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let m=new fe;m.setAttribute("position",new Ne(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new bt(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Kf;let p=this.type;this.render=function(S,w,E){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;let b=i.getRenderTarget(),M=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),N=i.state;N.setBlending(Di),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let L=p!==hi&&this.type===hi,C=p===hi&&this.type!==hi;for(let B=0,U=S.length;B<U;B++){let z=S[B],F=z.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",z,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;s.copy(F.mapSize);let J=F.getFrameExtents();if(s.multiply(J),r.copy(F.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/J.x),s.x=r.x*J.x,F.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/J.y),s.y=r.y*J.y,F.mapSize.y=r.y)),F.map===null||L===!0||C===!0){let ct=this.type!==hi?{minFilter:En,magFilter:En}:{};F.map!==null&&F.map.dispose(),F.map=new Pn(s.x,s.y,ct),F.map.texture.name=z.name+".shadowMap",F.camera.updateProjectionMatrix()}i.setRenderTarget(F.map),i.clear();let $=F.getViewportCount();for(let ct=0;ct<$;ct++){let ht=F.getViewport(ct);o.set(r.x*ht.x,r.y*ht.y,r.x*ht.z,r.y*ht.w),N.viewport(o),F.updateMatrices(z,ct),n=F.getFrustum(),v(w,E,F.camera,z,this.type)}F.isPointLightShadow!==!0&&this.type===hi&&y(F,E),F.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(b,M,R)};function y(S,w){let E=t.update(x);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Pn(s.x,s.y)),f.uniforms.shadow_pass.value=S.map.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(w,null,E,f,x,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(w,null,E,d,x,null)}function _(S,w,E,b){let M=null,R=E.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(R!==void 0)M=R;else if(M=E.isPointLight===!0?c:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){let N=M.uuid,L=w.uuid,C=l[N];C===void 0&&(C={},l[N]=C);let B=C[L];B===void 0&&(B=M.clone(),C[L]=B,w.addEventListener("dispose",A)),M=B}if(M.visible=w.visible,M.wireframe=w.wireframe,b===hi?M.side=w.shadowSide!==null?w.shadowSide:w.side:M.side=w.shadowSide!==null?w.shadowSide:u[w.side],M.alphaMap=w.alphaMap,M.alphaTest=w.alphaTest,M.map=w.map,M.clipShadows=w.clipShadows,M.clippingPlanes=w.clippingPlanes,M.clipIntersection=w.clipIntersection,M.displacementMap=w.displacementMap,M.displacementScale=w.displacementScale,M.displacementBias=w.displacementBias,M.wireframeLinewidth=w.wireframeLinewidth,M.linewidth=w.linewidth,E.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let N=i.properties.get(M);N.light=E}return M}function v(S,w,E,b,M){if(S.visible===!1)return;if(S.layers.test(w.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&M===hi)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,S.matrixWorld);let L=t.update(S),C=S.material;if(Array.isArray(C)){let B=L.groups;for(let U=0,z=B.length;U<z;U++){let F=B[U],J=C[F.materialIndex];if(J&&J.visible){let $=_(S,J,b,M);S.onBeforeShadow(i,S,w,E,L,$,F),i.renderBufferDirect(E,null,L,$,S,F),S.onAfterShadow(i,S,w,E,L,$,F)}}}else if(C.visible){let B=_(S,C,b,M);S.onBeforeShadow(i,S,w,E,L,B,null),i.renderBufferDirect(E,null,L,B,S,null),S.onAfterShadow(i,S,w,E,L,B,null)}}let N=S.children;for(let L=0,C=N.length;L<C;L++)v(N[L],w,E,b,M)}function A(S){S.target.removeEventListener("dispose",A);for(let E in l){let b=l[E],M=S.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}var B1={[sl]:rl,[ol]:ll,[al]:hl,[$s]:cl,[rl]:sl,[ll]:ol,[hl]:al,[cl]:$s};function z1(i,t){function e(){let X=!1,H=new de,k=null,V=new de(0,0,0,0);return{setMask:function(Q){k!==Q&&!X&&(i.colorMask(Q,Q,Q,Q),k=Q)},setLocked:function(Q){X=Q},setClear:function(Q,st,pt,Et,Vt){Vt===!0&&(Q*=Et,st*=Et,pt*=Et),H.set(Q,st,pt,Et),V.equals(H)===!1&&(i.clearColor(Q,st,pt,Et),V.copy(H))},reset:function(){X=!1,k=null,V.set(-1,0,0,0)}}}function n(){let X=!1,H=!1,k=null,V=null,Q=null;return{setReversed:function(st){if(H!==st){let pt=t.get("EXT_clip_control");H?pt.clipControlEXT(pt.LOWER_LEFT_EXT,pt.ZERO_TO_ONE_EXT):pt.clipControlEXT(pt.LOWER_LEFT_EXT,pt.NEGATIVE_ONE_TO_ONE_EXT);let Et=Q;Q=null,this.setClear(Et)}H=st},getReversed:function(){return H},setTest:function(st){st?et(i.DEPTH_TEST):mt(i.DEPTH_TEST)},setMask:function(st){k!==st&&!X&&(i.depthMask(st),k=st)},setFunc:function(st){if(H&&(st=B1[st]),V!==st){switch(st){case sl:i.depthFunc(i.NEVER);break;case rl:i.depthFunc(i.ALWAYS);break;case ol:i.depthFunc(i.LESS);break;case $s:i.depthFunc(i.LEQUAL);break;case al:i.depthFunc(i.EQUAL);break;case cl:i.depthFunc(i.GEQUAL);break;case ll:i.depthFunc(i.GREATER);break;case hl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}V=st}},setLocked:function(st){X=st},setClear:function(st){Q!==st&&(H&&(st=1-st),i.clearDepth(st),Q=st)},reset:function(){X=!1,k=null,V=null,Q=null,H=!1}}}function s(){let X=!1,H=null,k=null,V=null,Q=null,st=null,pt=null,Et=null,Vt=null;return{setTest:function(Ft){X||(Ft?et(i.STENCIL_TEST):mt(i.STENCIL_TEST))},setMask:function(Ft){H!==Ft&&!X&&(i.stencilMask(Ft),H=Ft)},setFunc:function(Ft,Ht,Tt){(k!==Ft||V!==Ht||Q!==Tt)&&(i.stencilFunc(Ft,Ht,Tt),k=Ft,V=Ht,Q=Tt)},setOp:function(Ft,Ht,Tt){(st!==Ft||pt!==Ht||Et!==Tt)&&(i.stencilOp(Ft,Ht,Tt),st=Ft,pt=Ht,Et=Tt)},setLocked:function(Ft){X=Ft},setClear:function(Ft){Vt!==Ft&&(i.clearStencil(Ft),Vt=Ft)},reset:function(){X=!1,H=null,k=null,V=null,Q=null,st=null,pt=null,Et=null,Vt=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},u={},f=new WeakMap,d=[],m=null,x=!1,g=null,p=null,y=null,_=null,v=null,A=null,S=null,w=new Ot(0,0,0),E=0,b=!1,M=null,R=null,N=null,L=null,C=null,B=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),U=!1,z=0,F=i.getParameter(i.VERSION);F.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(F)[1]),U=z>=1):F.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),U=z>=2);let J=null,$={},ct=i.getParameter(i.SCISSOR_BOX),ht=i.getParameter(i.VIEWPORT),Mt=new de().fromArray(ct),j=new de().fromArray(ht);function Y(X,H,k,V){let Q=new Uint8Array(4),st=i.createTexture();i.bindTexture(X,st),i.texParameteri(X,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(X,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let pt=0;pt<k;pt++)X===i.TEXTURE_3D||X===i.TEXTURE_2D_ARRAY?i.texImage3D(H,0,i.RGBA,1,1,V,0,i.RGBA,i.UNSIGNED_BYTE,Q):i.texImage2D(H+pt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Q);return st}let Z={};Z[i.TEXTURE_2D]=Y(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=Y(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[i.TEXTURE_2D_ARRAY]=Y(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=Y(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),et(i.DEPTH_TEST),o.setFunc($s),dt(!1),St(Ou),et(i.CULL_FACE),O(Di);function et(X){h[X]!==!0&&(i.enable(X),h[X]=!0)}function mt(X){h[X]!==!1&&(i.disable(X),h[X]=!1)}function Rt(X,H){return u[X]!==H?(i.bindFramebuffer(X,H),u[X]=H,X===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=H),X===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=H),!0):!1}function Ut(X,H){let k=d,V=!1;if(X){k=f.get(H),k===void 0&&(k=[],f.set(H,k));let Q=X.textures;if(k.length!==Q.length||k[0]!==i.COLOR_ATTACHMENT0){for(let st=0,pt=Q.length;st<pt;st++)k[st]=i.COLOR_ATTACHMENT0+st;k.length=Q.length,V=!0}}else k[0]!==i.BACK&&(k[0]=i.BACK,V=!0);V&&i.drawBuffers(k)}function Xt(X){return m!==X?(i.useProgram(X),m=X,!0):!1}let it={[es]:i.FUNC_ADD,[gg]:i.FUNC_SUBTRACT,[xg]:i.FUNC_REVERSE_SUBTRACT};it[yg]=i.MIN,it[_g]=i.MAX;let lt={[vg]:i.ZERO,[Mg]:i.ONE,[Sg]:i.SRC_COLOR,[nl]:i.SRC_ALPHA,[Rg]:i.SRC_ALPHA_SATURATE,[Eg]:i.DST_COLOR,[wg]:i.DST_ALPHA,[bg]:i.ONE_MINUS_SRC_COLOR,[il]:i.ONE_MINUS_SRC_ALPHA,[Tg]:i.ONE_MINUS_DST_COLOR,[Ag]:i.ONE_MINUS_DST_ALPHA,[Cg]:i.CONSTANT_COLOR,[Ig]:i.ONE_MINUS_CONSTANT_COLOR,[Pg]:i.CONSTANT_ALPHA,[Lg]:i.ONE_MINUS_CONSTANT_ALPHA};function O(X,H,k,V,Q,st,pt,Et,Vt,Ft){if(X===Di){x===!0&&(mt(i.BLEND),x=!1);return}if(x===!1&&(et(i.BLEND),x=!0),X!==mg){if(X!==g||Ft!==b){if((p!==es||v!==es)&&(i.blendEquation(i.FUNC_ADD),p=es,v=es),Ft)switch(X){case Xs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bu:i.blendFunc(i.ONE,i.ONE);break;case zu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ku:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}else switch(X){case Xs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bu:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case zu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ku:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}y=null,_=null,A=null,S=null,w.set(0,0,0),E=0,g=X,b=Ft}return}Q=Q||H,st=st||k,pt=pt||V,(H!==p||Q!==v)&&(i.blendEquationSeparate(it[H],it[Q]),p=H,v=Q),(k!==y||V!==_||st!==A||pt!==S)&&(i.blendFuncSeparate(lt[k],lt[V],lt[st],lt[pt]),y=k,_=V,A=st,S=pt),(Et.equals(w)===!1||Vt!==E)&&(i.blendColor(Et.r,Et.g,Et.b,Vt),w.copy(Et),E=Vt),g=X,b=!1}function Ct(X,H){X.side===Pe?mt(i.CULL_FACE):et(i.CULL_FACE);let k=X.side===hn;H&&(k=!k),dt(k),X.blending===Xs&&X.transparent===!1?O(Di):O(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),o.setFunc(X.depthFunc),o.setTest(X.depthTest),o.setMask(X.depthWrite),r.setMask(X.colorWrite);let V=X.stencilWrite;a.setTest(V),V&&(a.setMask(X.stencilWriteMask),a.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),a.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),xt(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?et(i.SAMPLE_ALPHA_TO_COVERAGE):mt(i.SAMPLE_ALPHA_TO_COVERAGE)}function dt(X){M!==X&&(X?i.frontFace(i.CW):i.frontFace(i.CCW),M=X)}function St(X){X!==dg?(et(i.CULL_FACE),X!==R&&(X===Ou?i.cullFace(i.BACK):X===pg?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):mt(i.CULL_FACE),R=X}function rt(X){X!==N&&(U&&i.lineWidth(X),N=X)}function xt(X,H,k){X?(et(i.POLYGON_OFFSET_FILL),(L!==H||C!==k)&&(i.polygonOffset(H,k),L=H,C=k)):mt(i.POLYGON_OFFSET_FILL)}function ut(X){X?et(i.SCISSOR_TEST):mt(i.SCISSOR_TEST)}function I(X){X===void 0&&(X=i.TEXTURE0+B-1),J!==X&&(i.activeTexture(X),J=X)}function T(X,H,k){k===void 0&&(J===null?k=i.TEXTURE0+B-1:k=J);let V=$[k];V===void 0&&(V={type:void 0,texture:void 0},$[k]=V),(V.type!==X||V.texture!==H)&&(J!==k&&(i.activeTexture(k),J=k),i.bindTexture(X,H||Z[X]),V.type=X,V.texture=H)}function W(){let X=$[J];X!==void 0&&X.type!==void 0&&(i.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function nt(){try{i.compressedTexImage2D.apply(i,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function ot(){try{i.compressedTexImage3D.apply(i,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function at(){try{i.texSubImage2D.apply(i,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Bt(){try{i.texSubImage3D.apply(i,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function At(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Lt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function ne(){try{i.texStorage2D.apply(i,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function gt(){try{i.texStorage3D.apply(i,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function wt(){try{i.texImage2D.apply(i,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function kt(){try{i.texImage3D.apply(i,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Yt(X){Mt.equals(X)===!1&&(i.scissor(X.x,X.y,X.z,X.w),Mt.copy(X))}function It(X){j.equals(X)===!1&&(i.viewport(X.x,X.y,X.z,X.w),j.copy(X))}function Wt(X,H){let k=l.get(H);k===void 0&&(k=new WeakMap,l.set(H,k));let V=k.get(X);V===void 0&&(V=i.getUniformBlockIndex(H,X.name),k.set(X,V))}function Kt(X,H){let V=l.get(H).get(X);c.get(H)!==V&&(i.uniformBlockBinding(H,V,X.__bindingPointIndex),c.set(H,V))}function Qt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},J=null,$={},u={},f=new WeakMap,d=[],m=null,x=!1,g=null,p=null,y=null,_=null,v=null,A=null,S=null,w=new Ot(0,0,0),E=0,b=!1,M=null,R=null,N=null,L=null,C=null,Mt.set(0,0,i.canvas.width,i.canvas.height),j.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:et,disable:mt,bindFramebuffer:Rt,drawBuffers:Ut,useProgram:Xt,setBlending:O,setMaterial:Ct,setFlipSided:dt,setCullFace:St,setLineWidth:rt,setPolygonOffset:xt,setScissorTest:ut,activeTexture:I,bindTexture:T,unbindTexture:W,compressedTexImage2D:nt,compressedTexImage3D:ot,texImage2D:wt,texImage3D:kt,updateUBOMapping:Wt,uniformBlockBinding:Kt,texStorage2D:ne,texStorage3D:gt,texSubImage2D:at,texSubImage3D:Bt,compressedTexSubImage2D:At,compressedTexSubImage3D:Lt,scissor:Yt,viewport:It,reset:Qt}}function Ff(i,t,e,n){let s=k1(n);switch(e){case id:return i*t;case rd:return i*t;case od:return i*t*2;case yi:return i*t/s.components*s.byteLength;case Ih:return i*t/s.components*s.byteLength;case ad:return i*t*2/s.components*s.byteLength;case Ph:return i*t*2/s.components*s.byteLength;case sd:return i*t*3/s.components*s.byteLength;case Ke:return i*t*4/s.components*s.byteLength;case Lh:return i*t*4/s.components*s.byteLength;case ta:case ea:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case na:case ia:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ml:case xl:return Math.max(i,16)*Math.max(t,8)/4;case pl:case gl:return Math.max(i,8)*Math.max(t,8)/2;case yl:case _l:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case vl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ml:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Sl:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case bl:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case wl:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Al:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case El:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Tl:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Rl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Cl:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Il:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Pl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ll:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Dl:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Nl:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case sa:case Ul:case Fl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case cd:case Ol:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Bl:case zl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function k1(i){switch(i){case gi:case td:return{byteLength:1,components:1};case zr:case ed:case fs:return{byteLength:2,components:1};case Rh:case Ch:return{byteLength:2,components:4};case is:case Th:case Jn:return{byteLength:4,components:1};case nd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function V1(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ft,h=new WeakMap,u,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(I,T){return d?new OffscreenCanvas(I,T):kr("canvas")}function x(I,T,W){let nt=1,ot=ut(I);if((ot.width>W||ot.height>W)&&(nt=W/Math.max(ot.width,ot.height)),nt<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let at=Math.floor(nt*ot.width),Bt=Math.floor(nt*ot.height);u===void 0&&(u=m(at,Bt));let At=T?m(at,Bt):u;return At.width=at,At.height=Bt,At.getContext("2d").drawImage(I,0,0,at,Bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ot.width+"x"+ot.height+") to ("+at+"x"+Bt+")."),At}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ot.width+"x"+ot.height+")."),I;return I}function g(I){return I.generateMipmaps}function p(I){i.generateMipmap(I)}function y(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(I,T,W,nt,ot=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let at=T;if(T===i.RED&&(W===i.FLOAT&&(at=i.R32F),W===i.HALF_FLOAT&&(at=i.R16F),W===i.UNSIGNED_BYTE&&(at=i.R8)),T===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&(at=i.R8UI),W===i.UNSIGNED_SHORT&&(at=i.R16UI),W===i.UNSIGNED_INT&&(at=i.R32UI),W===i.BYTE&&(at=i.R8I),W===i.SHORT&&(at=i.R16I),W===i.INT&&(at=i.R32I)),T===i.RG&&(W===i.FLOAT&&(at=i.RG32F),W===i.HALF_FLOAT&&(at=i.RG16F),W===i.UNSIGNED_BYTE&&(at=i.RG8)),T===i.RG_INTEGER&&(W===i.UNSIGNED_BYTE&&(at=i.RG8UI),W===i.UNSIGNED_SHORT&&(at=i.RG16UI),W===i.UNSIGNED_INT&&(at=i.RG32UI),W===i.BYTE&&(at=i.RG8I),W===i.SHORT&&(at=i.RG16I),W===i.INT&&(at=i.RG32I)),T===i.RGB_INTEGER&&(W===i.UNSIGNED_BYTE&&(at=i.RGB8UI),W===i.UNSIGNED_SHORT&&(at=i.RGB16UI),W===i.UNSIGNED_INT&&(at=i.RGB32UI),W===i.BYTE&&(at=i.RGB8I),W===i.SHORT&&(at=i.RGB16I),W===i.INT&&(at=i.RGB32I)),T===i.RGBA_INTEGER&&(W===i.UNSIGNED_BYTE&&(at=i.RGBA8UI),W===i.UNSIGNED_SHORT&&(at=i.RGBA16UI),W===i.UNSIGNED_INT&&(at=i.RGBA32UI),W===i.BYTE&&(at=i.RGBA8I),W===i.SHORT&&(at=i.RGBA16I),W===i.INT&&(at=i.RGBA32I)),T===i.RGB&&W===i.UNSIGNED_INT_5_9_9_9_REV&&(at=i.RGB9_E5),T===i.RGBA){let Bt=ot?Ia:ge.getTransfer(nt);W===i.FLOAT&&(at=i.RGBA32F),W===i.HALF_FLOAT&&(at=i.RGBA16F),W===i.UNSIGNED_BYTE&&(at=Bt===we?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT_4_4_4_4&&(at=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&(at=i.RGB5_A1)}return(at===i.R16F||at===i.R32F||at===i.RG16F||at===i.RG32F||at===i.RGBA16F||at===i.RGBA32F)&&t.get("EXT_color_buffer_float"),at}function v(I,T){let W;return I?T===null||T===is||T===js?W=i.DEPTH24_STENCIL8:T===Jn?W=i.DEPTH32F_STENCIL8:T===zr&&(W=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===is||T===js?W=i.DEPTH_COMPONENT24:T===Jn?W=i.DEPTH_COMPONENT32F:T===zr&&(W=i.DEPTH_COMPONENT16),W}function A(I,T){return g(I)===!0||I.isFramebufferTexture&&I.minFilter!==En&&I.minFilter!==rn?Math.log2(Math.max(T.width,T.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?T.mipmaps.length:1}function S(I){let T=I.target;T.removeEventListener("dispose",S),E(T),T.isVideoTexture&&h.delete(T)}function w(I){let T=I.target;T.removeEventListener("dispose",w),M(T)}function E(I){let T=n.get(I);if(T.__webglInit===void 0)return;let W=I.source,nt=f.get(W);if(nt){let ot=nt[T.__cacheKey];ot.usedTimes--,ot.usedTimes===0&&b(I),Object.keys(nt).length===0&&f.delete(W)}n.remove(I)}function b(I){let T=n.get(I);i.deleteTexture(T.__webglTexture);let W=I.source,nt=f.get(W);delete nt[T.__cacheKey],o.memory.textures--}function M(I){let T=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let nt=0;nt<6;nt++){if(Array.isArray(T.__webglFramebuffer[nt]))for(let ot=0;ot<T.__webglFramebuffer[nt].length;ot++)i.deleteFramebuffer(T.__webglFramebuffer[nt][ot]);else i.deleteFramebuffer(T.__webglFramebuffer[nt]);T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer[nt])}else{if(Array.isArray(T.__webglFramebuffer))for(let nt=0;nt<T.__webglFramebuffer.length;nt++)i.deleteFramebuffer(T.__webglFramebuffer[nt]);else i.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&i.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let nt=0;nt<T.__webglColorRenderbuffer.length;nt++)T.__webglColorRenderbuffer[nt]&&i.deleteRenderbuffer(T.__webglColorRenderbuffer[nt]);T.__webglDepthRenderbuffer&&i.deleteRenderbuffer(T.__webglDepthRenderbuffer)}let W=I.textures;for(let nt=0,ot=W.length;nt<ot;nt++){let at=n.get(W[nt]);at.__webglTexture&&(i.deleteTexture(at.__webglTexture),o.memory.textures--),n.remove(W[nt])}n.remove(I)}let R=0;function N(){R=0}function L(){let I=R;return I>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),R+=1,I}function C(I){let T=[];return T.push(I.wrapS),T.push(I.wrapT),T.push(I.wrapR||0),T.push(I.magFilter),T.push(I.minFilter),T.push(I.anisotropy),T.push(I.internalFormat),T.push(I.format),T.push(I.type),T.push(I.generateMipmaps),T.push(I.premultiplyAlpha),T.push(I.flipY),T.push(I.unpackAlignment),T.push(I.colorSpace),T.join()}function B(I,T){let W=n.get(I);if(I.isVideoTexture&&rt(I),I.isRenderTargetTexture===!1&&I.version>0&&W.__version!==I.version){let nt=I.image;if(nt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(nt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(W,I,T);return}}e.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+T)}function U(I,T){let W=n.get(I);if(I.version>0&&W.__version!==I.version){j(W,I,T);return}e.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+T)}function z(I,T){let W=n.get(I);if(I.version>0&&W.__version!==I.version){j(W,I,T);return}e.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+T)}function F(I,T){let W=n.get(I);if(I.version>0&&W.__version!==I.version){Y(W,I,T);return}e.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+T)}let J={[sn]:i.REPEAT,[fi]:i.CLAMP_TO_EDGE,[dl]:i.MIRRORED_REPEAT},$={[En]:i.NEAREST,[Vg]:i.NEAREST_MIPMAP_NEAREST,[Ao]:i.NEAREST_MIPMAP_LINEAR,[rn]:i.LINEAR,[vc]:i.LINEAR_MIPMAP_NEAREST,[Vn]:i.LINEAR_MIPMAP_LINEAR},ct={[Wg]:i.NEVER,[Jg]:i.ALWAYS,[Xg]:i.LESS,[hd]:i.LEQUAL,[Yg]:i.EQUAL,[$g]:i.GEQUAL,[qg]:i.GREATER,[Zg]:i.NOTEQUAL};function ht(I,T){if(T.type===Jn&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===rn||T.magFilter===vc||T.magFilter===Ao||T.magFilter===Vn||T.minFilter===rn||T.minFilter===vc||T.minFilter===Ao||T.minFilter===Vn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,J[T.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,J[T.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,J[T.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,$[T.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,$[T.minFilter]),T.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,ct[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===En||T.minFilter!==Ao&&T.minFilter!==Vn||T.type===Jn&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){let W=t.get("EXT_texture_filter_anisotropic");i.texParameterf(I,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,s.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function Mt(I,T){let W=!1;I.__webglInit===void 0&&(I.__webglInit=!0,T.addEventListener("dispose",S));let nt=T.source,ot=f.get(nt);ot===void 0&&(ot={},f.set(nt,ot));let at=C(T);if(at!==I.__cacheKey){ot[at]===void 0&&(ot[at]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,W=!0),ot[at].usedTimes++;let Bt=ot[I.__cacheKey];Bt!==void 0&&(ot[I.__cacheKey].usedTimes--,Bt.usedTimes===0&&b(T)),I.__cacheKey=at,I.__webglTexture=ot[at].texture}return W}function j(I,T,W){let nt=i.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(nt=i.TEXTURE_2D_ARRAY),T.isData3DTexture&&(nt=i.TEXTURE_3D);let ot=Mt(I,T),at=T.source;e.bindTexture(nt,I.__webglTexture,i.TEXTURE0+W);let Bt=n.get(at);if(at.version!==Bt.__version||ot===!0){e.activeTexture(i.TEXTURE0+W);let At=ge.getPrimaries(ge.workingColorSpace),Lt=T.colorSpace===Pi?null:ge.getPrimaries(T.colorSpace),ne=T.colorSpace===Pi||At===Lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);let gt=x(T.image,!1,s.maxTextureSize);gt=xt(T,gt);let wt=r.convert(T.format,T.colorSpace),kt=r.convert(T.type),Yt=_(T.internalFormat,wt,kt,T.colorSpace,T.isVideoTexture);ht(nt,T);let It,Wt=T.mipmaps,Kt=T.isVideoTexture!==!0,Qt=Bt.__version===void 0||ot===!0,X=at.dataReady,H=A(T,gt);if(T.isDepthTexture)Yt=v(T.format===Qs,T.type),Qt&&(Kt?e.texStorage2D(i.TEXTURE_2D,1,Yt,gt.width,gt.height):e.texImage2D(i.TEXTURE_2D,0,Yt,gt.width,gt.height,0,wt,kt,null));else if(T.isDataTexture)if(Wt.length>0){Kt&&Qt&&e.texStorage2D(i.TEXTURE_2D,H,Yt,Wt[0].width,Wt[0].height);for(let k=0,V=Wt.length;k<V;k++)It=Wt[k],Kt?X&&e.texSubImage2D(i.TEXTURE_2D,k,0,0,It.width,It.height,wt,kt,It.data):e.texImage2D(i.TEXTURE_2D,k,Yt,It.width,It.height,0,wt,kt,It.data);T.generateMipmaps=!1}else Kt?(Qt&&e.texStorage2D(i.TEXTURE_2D,H,Yt,gt.width,gt.height),X&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,gt.width,gt.height,wt,kt,gt.data)):e.texImage2D(i.TEXTURE_2D,0,Yt,gt.width,gt.height,0,wt,kt,gt.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Kt&&Qt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,H,Yt,Wt[0].width,Wt[0].height,gt.depth);for(let k=0,V=Wt.length;k<V;k++)if(It=Wt[k],T.format!==Ke)if(wt!==null)if(Kt){if(X)if(T.layerUpdates.size>0){let Q=Ff(It.width,It.height,T.format,T.type);for(let st of T.layerUpdates){let pt=It.data.subarray(st*Q/It.data.BYTES_PER_ELEMENT,(st+1)*Q/It.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,k,0,0,st,It.width,It.height,1,wt,pt)}T.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,k,0,0,0,It.width,It.height,gt.depth,wt,It.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,k,Yt,It.width,It.height,gt.depth,0,It.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Kt?X&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,k,0,0,0,It.width,It.height,gt.depth,wt,kt,It.data):e.texImage3D(i.TEXTURE_2D_ARRAY,k,Yt,It.width,It.height,gt.depth,0,wt,kt,It.data)}else{Kt&&Qt&&e.texStorage2D(i.TEXTURE_2D,H,Yt,Wt[0].width,Wt[0].height);for(let k=0,V=Wt.length;k<V;k++)It=Wt[k],T.format!==Ke?wt!==null?Kt?X&&e.compressedTexSubImage2D(i.TEXTURE_2D,k,0,0,It.width,It.height,wt,It.data):e.compressedTexImage2D(i.TEXTURE_2D,k,Yt,It.width,It.height,0,It.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Kt?X&&e.texSubImage2D(i.TEXTURE_2D,k,0,0,It.width,It.height,wt,kt,It.data):e.texImage2D(i.TEXTURE_2D,k,Yt,It.width,It.height,0,wt,kt,It.data)}else if(T.isDataArrayTexture)if(Kt){if(Qt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,H,Yt,gt.width,gt.height,gt.depth),X)if(T.layerUpdates.size>0){let k=Ff(gt.width,gt.height,T.format,T.type);for(let V of T.layerUpdates){let Q=gt.data.subarray(V*k/gt.data.BYTES_PER_ELEMENT,(V+1)*k/gt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,V,gt.width,gt.height,1,wt,kt,Q)}T.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,gt.width,gt.height,gt.depth,wt,kt,gt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Yt,gt.width,gt.height,gt.depth,0,wt,kt,gt.data);else if(T.isData3DTexture)Kt?(Qt&&e.texStorage3D(i.TEXTURE_3D,H,Yt,gt.width,gt.height,gt.depth),X&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,gt.width,gt.height,gt.depth,wt,kt,gt.data)):e.texImage3D(i.TEXTURE_3D,0,Yt,gt.width,gt.height,gt.depth,0,wt,kt,gt.data);else if(T.isFramebufferTexture){if(Qt)if(Kt)e.texStorage2D(i.TEXTURE_2D,H,Yt,gt.width,gt.height);else{let k=gt.width,V=gt.height;for(let Q=0;Q<H;Q++)e.texImage2D(i.TEXTURE_2D,Q,Yt,k,V,0,wt,kt,null),k>>=1,V>>=1}}else if(Wt.length>0){if(Kt&&Qt){let k=ut(Wt[0]);e.texStorage2D(i.TEXTURE_2D,H,Yt,k.width,k.height)}for(let k=0,V=Wt.length;k<V;k++)It=Wt[k],Kt?X&&e.texSubImage2D(i.TEXTURE_2D,k,0,0,wt,kt,It):e.texImage2D(i.TEXTURE_2D,k,Yt,wt,kt,It);T.generateMipmaps=!1}else if(Kt){if(Qt){let k=ut(gt);e.texStorage2D(i.TEXTURE_2D,H,Yt,k.width,k.height)}X&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,wt,kt,gt)}else e.texImage2D(i.TEXTURE_2D,0,Yt,wt,kt,gt);g(T)&&p(nt),Bt.__version=at.version,T.onUpdate&&T.onUpdate(T)}I.__version=T.version}function Y(I,T,W){if(T.image.length!==6)return;let nt=Mt(I,T),ot=T.source;e.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+W);let at=n.get(ot);if(ot.version!==at.__version||nt===!0){e.activeTexture(i.TEXTURE0+W);let Bt=ge.getPrimaries(ge.workingColorSpace),At=T.colorSpace===Pi?null:ge.getPrimaries(T.colorSpace),Lt=T.colorSpace===Pi||Bt===At?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Lt);let ne=T.isCompressedTexture||T.image[0].isCompressedTexture,gt=T.image[0]&&T.image[0].isDataTexture,wt=[];for(let V=0;V<6;V++)!ne&&!gt?wt[V]=x(T.image[V],!0,s.maxCubemapSize):wt[V]=gt?T.image[V].image:T.image[V],wt[V]=xt(T,wt[V]);let kt=wt[0],Yt=r.convert(T.format,T.colorSpace),It=r.convert(T.type),Wt=_(T.internalFormat,Yt,It,T.colorSpace),Kt=T.isVideoTexture!==!0,Qt=at.__version===void 0||nt===!0,X=ot.dataReady,H=A(T,kt);ht(i.TEXTURE_CUBE_MAP,T);let k;if(ne){Kt&&Qt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,H,Wt,kt.width,kt.height);for(let V=0;V<6;V++){k=wt[V].mipmaps;for(let Q=0;Q<k.length;Q++){let st=k[Q];T.format!==Ke?Yt!==null?Kt?X&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,Q,0,0,st.width,st.height,Yt,st.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,Q,Wt,st.width,st.height,0,st.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Kt?X&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,Q,0,0,st.width,st.height,Yt,It,st.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,Q,Wt,st.width,st.height,0,Yt,It,st.data)}}}else{if(k=T.mipmaps,Kt&&Qt){k.length>0&&H++;let V=ut(wt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,H,Wt,V.width,V.height)}for(let V=0;V<6;V++)if(gt){Kt?X&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,0,0,0,wt[V].width,wt[V].height,Yt,It,wt[V].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,0,Wt,wt[V].width,wt[V].height,0,Yt,It,wt[V].data);for(let Q=0;Q<k.length;Q++){let pt=k[Q].image[V].image;Kt?X&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,Q+1,0,0,pt.width,pt.height,Yt,It,pt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,Q+1,Wt,pt.width,pt.height,0,Yt,It,pt.data)}}else{Kt?X&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,0,0,0,Yt,It,wt[V]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,0,Wt,Yt,It,wt[V]);for(let Q=0;Q<k.length;Q++){let st=k[Q];Kt?X&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,Q+1,0,0,Yt,It,st.image[V]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,Q+1,Wt,Yt,It,st.image[V])}}}g(T)&&p(i.TEXTURE_CUBE_MAP),at.__version=ot.version,T.onUpdate&&T.onUpdate(T)}I.__version=T.version}function Z(I,T,W,nt,ot,at){let Bt=r.convert(W.format,W.colorSpace),At=r.convert(W.type),Lt=_(W.internalFormat,Bt,At,W.colorSpace),ne=n.get(T),gt=n.get(W);if(gt.__renderTarget=T,!ne.__hasExternalTextures){let wt=Math.max(1,T.width>>at),kt=Math.max(1,T.height>>at);ot===i.TEXTURE_3D||ot===i.TEXTURE_2D_ARRAY?e.texImage3D(ot,at,Lt,wt,kt,T.depth,0,Bt,At,null):e.texImage2D(ot,at,Lt,wt,kt,0,Bt,At,null)}e.bindFramebuffer(i.FRAMEBUFFER,I),St(T)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,ot,gt.__webglTexture,0,dt(T)):(ot===i.TEXTURE_2D||ot>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ot<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,nt,ot,gt.__webglTexture,at),e.bindFramebuffer(i.FRAMEBUFFER,null)}function et(I,T,W){if(i.bindRenderbuffer(i.RENDERBUFFER,I),T.depthBuffer){let nt=T.depthTexture,ot=nt&&nt.isDepthTexture?nt.type:null,at=v(T.stencilBuffer,ot),Bt=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,At=dt(T);St(T)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,At,at,T.width,T.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,At,at,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,at,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Bt,i.RENDERBUFFER,I)}else{let nt=T.textures;for(let ot=0;ot<nt.length;ot++){let at=nt[ot],Bt=r.convert(at.format,at.colorSpace),At=r.convert(at.type),Lt=_(at.internalFormat,Bt,At,at.colorSpace),ne=dt(T);W&&St(T)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ne,Lt,T.width,T.height):St(T)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ne,Lt,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,Lt,T.width,T.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function mt(I,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,I),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let nt=n.get(T.depthTexture);nt.__renderTarget=T,(!nt.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),B(T.depthTexture,0);let ot=nt.__webglTexture,at=dt(T);if(T.depthTexture.format===Ys)St(T)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ot,0,at):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ot,0);else if(T.depthTexture.format===Qs)St(T)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ot,0,at):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ot,0);else throw new Error("Unknown depthTexture format")}function Rt(I){let T=n.get(I),W=I.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==I.depthTexture){let nt=I.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),nt){let ot=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,nt.removeEventListener("dispose",ot)};nt.addEventListener("dispose",ot),T.__depthDisposeCallback=ot}T.__boundDepthTexture=nt}if(I.depthTexture&&!T.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");mt(T.__webglFramebuffer,I)}else if(W){T.__webglDepthbuffer=[];for(let nt=0;nt<6;nt++)if(e.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer[nt]),T.__webglDepthbuffer[nt]===void 0)T.__webglDepthbuffer[nt]=i.createRenderbuffer(),et(T.__webglDepthbuffer[nt],I,!1);else{let ot=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=T.__webglDepthbuffer[nt];i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,ot,i.RENDERBUFFER,at)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=i.createRenderbuffer(),et(T.__webglDepthbuffer,I,!1);else{let nt=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=T.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,nt,i.RENDERBUFFER,ot)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ut(I,T,W){let nt=n.get(I);T!==void 0&&Z(nt.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&Rt(I)}function Xt(I){let T=I.texture,W=n.get(I),nt=n.get(T);I.addEventListener("dispose",w);let ot=I.textures,at=I.isWebGLCubeRenderTarget===!0,Bt=ot.length>1;if(Bt||(nt.__webglTexture===void 0&&(nt.__webglTexture=i.createTexture()),nt.__version=T.version,o.memory.textures++),at){W.__webglFramebuffer=[];for(let At=0;At<6;At++)if(T.mipmaps&&T.mipmaps.length>0){W.__webglFramebuffer[At]=[];for(let Lt=0;Lt<T.mipmaps.length;Lt++)W.__webglFramebuffer[At][Lt]=i.createFramebuffer()}else W.__webglFramebuffer[At]=i.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){W.__webglFramebuffer=[];for(let At=0;At<T.mipmaps.length;At++)W.__webglFramebuffer[At]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(Bt)for(let At=0,Lt=ot.length;At<Lt;At++){let ne=n.get(ot[At]);ne.__webglTexture===void 0&&(ne.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&St(I)===!1){W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let At=0;At<ot.length;At++){let Lt=ot[At];W.__webglColorRenderbuffer[At]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[At]);let ne=r.convert(Lt.format,Lt.colorSpace),gt=r.convert(Lt.type),wt=_(Lt.internalFormat,ne,gt,Lt.colorSpace,I.isXRRenderTarget===!0),kt=dt(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,kt,wt,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,W.__webglColorRenderbuffer[At])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),et(W.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(at){e.bindTexture(i.TEXTURE_CUBE_MAP,nt.__webglTexture),ht(i.TEXTURE_CUBE_MAP,T);for(let At=0;At<6;At++)if(T.mipmaps&&T.mipmaps.length>0)for(let Lt=0;Lt<T.mipmaps.length;Lt++)Z(W.__webglFramebuffer[At][Lt],I,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+At,Lt);else Z(W.__webglFramebuffer[At],I,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+At,0);g(T)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Bt){for(let At=0,Lt=ot.length;At<Lt;At++){let ne=ot[At],gt=n.get(ne);e.bindTexture(i.TEXTURE_2D,gt.__webglTexture),ht(i.TEXTURE_2D,ne),Z(W.__webglFramebuffer,I,ne,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,0),g(ne)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let At=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(At=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(At,nt.__webglTexture),ht(At,T),T.mipmaps&&T.mipmaps.length>0)for(let Lt=0;Lt<T.mipmaps.length;Lt++)Z(W.__webglFramebuffer[Lt],I,T,i.COLOR_ATTACHMENT0,At,Lt);else Z(W.__webglFramebuffer,I,T,i.COLOR_ATTACHMENT0,At,0);g(T)&&p(At),e.unbindTexture()}I.depthBuffer&&Rt(I)}function it(I){let T=I.textures;for(let W=0,nt=T.length;W<nt;W++){let ot=T[W];if(g(ot)){let at=y(I),Bt=n.get(ot).__webglTexture;e.bindTexture(at,Bt),p(at),e.unbindTexture()}}}let lt=[],O=[];function Ct(I){if(I.samples>0){if(St(I)===!1){let T=I.textures,W=I.width,nt=I.height,ot=i.COLOR_BUFFER_BIT,at=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Bt=n.get(I),At=T.length>1;if(At)for(let Lt=0;Lt<T.length;Lt++)e.bindFramebuffer(i.FRAMEBUFFER,Bt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Lt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Bt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Lt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Bt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Bt.__webglFramebuffer);for(let Lt=0;Lt<T.length;Lt++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ot|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ot|=i.STENCIL_BUFFER_BIT)),At){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Bt.__webglColorRenderbuffer[Lt]);let ne=n.get(T[Lt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ne,0)}i.blitFramebuffer(0,0,W,nt,0,0,W,nt,ot,i.NEAREST),c===!0&&(lt.length=0,O.length=0,lt.push(i.COLOR_ATTACHMENT0+Lt),I.depthBuffer&&I.resolveDepthBuffer===!1&&(lt.push(at),O.push(at),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,O)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,lt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),At)for(let Lt=0;Lt<T.length;Lt++){e.bindFramebuffer(i.FRAMEBUFFER,Bt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Lt,i.RENDERBUFFER,Bt.__webglColorRenderbuffer[Lt]);let ne=n.get(T[Lt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Bt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Lt,i.TEXTURE_2D,ne,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Bt.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&c){let T=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[T])}}}function dt(I){return Math.min(s.maxSamples,I.samples)}function St(I){let T=n.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function rt(I){let T=o.render.frame;h.get(I)!==T&&(h.set(I,T),I.update())}function xt(I,T){let W=I.colorSpace,nt=I.format,ot=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||W!==Hi&&W!==Pi&&(ge.getTransfer(W)===we?(nt!==Ke||ot!==gi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),T}function ut(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=L,this.resetTextureUnits=N,this.setTexture2D=B,this.setTexture2DArray=U,this.setTexture3D=z,this.setTextureCube=F,this.rebindTextures=Ut,this.setupRenderTarget=Xt,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=Ct,this.setupDepthRenderbuffer=Rt,this.setupFrameBufferTexture=Z,this.useMultisampledRTT=St}function H1(i,t){function e(n,s=Pi){let r,o=ge.getTransfer(s);if(n===gi)return i.UNSIGNED_BYTE;if(n===Rh)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ch)return i.UNSIGNED_SHORT_5_5_5_1;if(n===nd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===td)return i.BYTE;if(n===ed)return i.SHORT;if(n===zr)return i.UNSIGNED_SHORT;if(n===Th)return i.INT;if(n===is)return i.UNSIGNED_INT;if(n===Jn)return i.FLOAT;if(n===fs)return i.HALF_FLOAT;if(n===id)return i.ALPHA;if(n===sd)return i.RGB;if(n===Ke)return i.RGBA;if(n===rd)return i.LUMINANCE;if(n===od)return i.LUMINANCE_ALPHA;if(n===Ys)return i.DEPTH_COMPONENT;if(n===Qs)return i.DEPTH_STENCIL;if(n===yi)return i.RED;if(n===Ih)return i.RED_INTEGER;if(n===ad)return i.RG;if(n===Ph)return i.RG_INTEGER;if(n===Lh)return i.RGBA_INTEGER;if(n===ta||n===ea||n===na||n===ia)if(o===we)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ta)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===na)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ta)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ea)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===na)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ia)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===pl||n===ml||n===gl||n===xl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===pl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ml)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===gl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===xl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===yl||n===_l||n===vl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===yl||n===_l)return o===we?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===vl)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ml||n===Sl||n===bl||n===wl||n===Al||n===El||n===Tl||n===Rl||n===Cl||n===Il||n===Pl||n===Ll||n===Dl||n===Nl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ml)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Sl)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===bl)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wl)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Al)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===El)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Tl)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Rl)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Cl)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Il)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Pl)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ll)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Dl)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Nl)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===sa||n===Ul||n===Fl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===sa)return o===we?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ul)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Fl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===cd||n===Ol||n===Bl||n===zl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===sa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ol)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Bl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===zl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===js?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Ql=class extends ln{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},_e=class extends Ze{constructor(){super(),this.isGroup=!0,this.type="Group"}},G1={type:"move"},Fr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _e,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _e,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _e,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let x of t.hand.values()){let g=e.getJointPose(x,n),p=this._getHandJoint(l,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,m=.005;l.inputState.pinching&&f>d+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(G1)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new _e;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},W1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,X1=`
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

}`,th=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new gn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Mn({vertexShader:W1,fragmentShader:X1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new bt(new ve(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},eh=class extends Oi{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,m=null,x=new th,g=e.getContextAttributes(),p=null,y=null,_=[],v=[],A=new ft,S=null,w=new ln;w.viewport=new de;let E=new ln;E.viewport=new de;let b=[w,E],M=new Ql,R=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let Y=_[j];return Y===void 0&&(Y=new Fr,_[j]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(j){let Y=_[j];return Y===void 0&&(Y=new Fr,_[j]=Y),Y.getGripSpace()},this.getHand=function(j){let Y=_[j];return Y===void 0&&(Y=new Fr,_[j]=Y),Y.getHandSpace()};function L(j){let Y=v.indexOf(j.inputSource);if(Y===-1)return;let Z=_[Y];Z!==void 0&&(Z.update(j.inputSource,j.frame,l||o),Z.dispatchEvent({type:j.type,data:j.inputSource}))}function C(){s.removeEventListener("select",L),s.removeEventListener("selectstart",L),s.removeEventListener("selectend",L),s.removeEventListener("squeeze",L),s.removeEventListener("squeezestart",L),s.removeEventListener("squeezeend",L),s.removeEventListener("end",C),s.removeEventListener("inputsourceschange",B);for(let j=0;j<_.length;j++){let Y=v[j];Y!==null&&(v[j]=null,_[j].disconnect(Y))}R=null,N=null,x.reset(),t.setRenderTarget(p),d=null,f=null,u=null,s=null,y=null,Mt.stop(),n.isPresenting=!1,t.setPixelRatio(S),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",L),s.addEventListener("selectstart",L),s.addEventListener("selectend",L),s.addEventListener("squeeze",L),s.addEventListener("squeezestart",L),s.addEventListener("squeezeend",L),s.addEventListener("end",C),s.addEventListener("inputsourceschange",B),g.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(A),s.renderState.layers===void 0){let Y={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,Y),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new Pn(d.framebufferWidth,d.framebufferHeight,{format:Ke,type:gi,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let Y=null,Z=null,et=null;g.depth&&(et=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Y=g.stencil?Qs:Ys,Z=g.stencil?js:is);let mt={colorFormat:e.RGBA8,depthFormat:et,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(mt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),y=new Pn(f.textureWidth,f.textureHeight,{format:Ke,type:gi,depthTexture:new ir(f.textureWidth,f.textureHeight,Z,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Mt.setContext(s),Mt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function B(j){for(let Y=0;Y<j.removed.length;Y++){let Z=j.removed[Y],et=v.indexOf(Z);et>=0&&(v[et]=null,_[et].disconnect(Z))}for(let Y=0;Y<j.added.length;Y++){let Z=j.added[Y],et=v.indexOf(Z);if(et===-1){for(let Rt=0;Rt<_.length;Rt++)if(Rt>=v.length){v.push(Z),et=Rt;break}else if(v[Rt]===null){v[Rt]=Z,et=Rt;break}if(et===-1)break}let mt=_[et];mt&&mt.connect(Z)}}let U=new D,z=new D;function F(j,Y,Z){U.setFromMatrixPosition(Y.matrixWorld),z.setFromMatrixPosition(Z.matrixWorld);let et=U.distanceTo(z),mt=Y.projectionMatrix.elements,Rt=Z.projectionMatrix.elements,Ut=mt[14]/(mt[10]-1),Xt=mt[14]/(mt[10]+1),it=(mt[9]+1)/mt[5],lt=(mt[9]-1)/mt[5],O=(mt[8]-1)/mt[0],Ct=(Rt[8]+1)/Rt[0],dt=Ut*O,St=Ut*Ct,rt=et/(-O+Ct),xt=rt*-O;if(Y.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(xt),j.translateZ(rt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),mt[10]===-1)j.projectionMatrix.copy(Y.projectionMatrix),j.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{let ut=Ut+rt,I=Xt+rt,T=dt-xt,W=St+(et-xt),nt=it*Xt/I*ut,ot=lt*Xt/I*ut;j.projectionMatrix.makePerspective(T,W,nt,ot,ut,I),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function J(j,Y){Y===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(Y.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let Y=j.near,Z=j.far;x.texture!==null&&(x.depthNear>0&&(Y=x.depthNear),x.depthFar>0&&(Z=x.depthFar)),M.near=E.near=w.near=Y,M.far=E.far=w.far=Z,(R!==M.near||N!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),R=M.near,N=M.far),w.layers.mask=j.layers.mask|2,E.layers.mask=j.layers.mask|4,M.layers.mask=w.layers.mask|E.layers.mask;let et=j.parent,mt=M.cameras;J(M,et);for(let Rt=0;Rt<mt.length;Rt++)J(mt[Rt],et);mt.length===2?F(M,w,E):M.projectionMatrix.copy(w.projectionMatrix),$(j,M,et)};function $(j,Y,Z){Z===null?j.matrix.copy(Y.matrixWorld):(j.matrix.copy(Z.matrixWorld),j.matrix.invert(),j.matrix.multiply(Y.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(Y.projectionMatrix),j.projectionMatrixInverse.copy(Y.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Hl*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(j){c=j,f!==null&&(f.fixedFoveation=j),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=j)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(M)};let ct=null;function ht(j,Y){if(h=Y.getViewerPose(l||o),m=Y,h!==null){let Z=h.views;d!==null&&(t.setRenderTargetFramebuffer(y,d.framebuffer),t.setRenderTarget(y));let et=!1;Z.length!==M.cameras.length&&(M.cameras.length=0,et=!0);for(let Rt=0;Rt<Z.length;Rt++){let Ut=Z[Rt],Xt=null;if(d!==null)Xt=d.getViewport(Ut);else{let lt=u.getViewSubImage(f,Ut);Xt=lt.viewport,Rt===0&&(t.setRenderTargetTextures(y,lt.colorTexture,f.ignoreDepthValues?void 0:lt.depthStencilTexture),t.setRenderTarget(y))}let it=b[Rt];it===void 0&&(it=new ln,it.layers.enable(Rt),it.viewport=new de,b[Rt]=it),it.matrix.fromArray(Ut.transform.matrix),it.matrix.decompose(it.position,it.quaternion,it.scale),it.projectionMatrix.fromArray(Ut.projectionMatrix),it.projectionMatrixInverse.copy(it.projectionMatrix).invert(),it.viewport.set(Xt.x,Xt.y,Xt.width,Xt.height),Rt===0&&(M.matrix.copy(it.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),et===!0&&M.cameras.push(it)}let mt=s.enabledFeatures;if(mt&&mt.includes("depth-sensing")){let Rt=u.getDepthInformation(Z[0]);Rt&&Rt.isValid&&Rt.texture&&x.init(t,Rt,s.renderState)}}for(let Z=0;Z<_.length;Z++){let et=v[Z],mt=_[Z];et!==null&&mt!==void 0&&mt.update(et,Y,l||o)}ct&&ct(j,Y),Y.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Y}),m=null}let Mt=new pd;Mt.setAnimationLoop(ht),this.setAnimationLoop=function(j){ct=j},this.dispose=function(){}}},Qi=new vn,Y1=new Gt;function q1(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,dd(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,y,_,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),f(g,p),p.isMeshPhysicalMaterial&&d(g,p,v)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),x(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,y,_):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===hn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===hn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let y=t.get(p),_=y.envMap,v=y.envMapRotation;_&&(g.envMap.value=_,Qi.copy(v),Qi.x*=-1,Qi.y*=-1,Qi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Qi.y*=-1,Qi.z*=-1),g.envMapRotation.value.setFromMatrix4(Y1.makeRotationFromEuler(Qi)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,y,_){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=_*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===hn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){let y=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Z1(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,_){let v=_.program;n.uniformBlockBinding(y,v)}function l(y,_){let v=s[y.id];v===void 0&&(m(y),v=h(y),s[y.id]=v,y.addEventListener("dispose",g));let A=_.program;n.updateUBOMapping(y,A);let S=t.render.frame;r[y.id]!==S&&(f(y),r[y.id]=S)}function h(y){let _=u();y.__bindingPointIndex=_;let v=i.createBuffer(),A=y.__size,S=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,A,S),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,v),v}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){let _=s[y.id],v=y.uniforms,A=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let S=0,w=v.length;S<w;S++){let E=Array.isArray(v[S])?v[S]:[v[S]];for(let b=0,M=E.length;b<M;b++){let R=E[b];if(d(R,S,b,A)===!0){let N=R.__offset,L=Array.isArray(R.value)?R.value:[R.value],C=0;for(let B=0;B<L.length;B++){let U=L[B],z=x(U);typeof U=="number"||typeof U=="boolean"?(R.__data[0]=U,i.bufferSubData(i.UNIFORM_BUFFER,N+C,R.__data)):U.isMatrix3?(R.__data[0]=U.elements[0],R.__data[1]=U.elements[1],R.__data[2]=U.elements[2],R.__data[3]=0,R.__data[4]=U.elements[3],R.__data[5]=U.elements[4],R.__data[6]=U.elements[5],R.__data[7]=0,R.__data[8]=U.elements[6],R.__data[9]=U.elements[7],R.__data[10]=U.elements[8],R.__data[11]=0):(U.toArray(R.__data,C),C+=z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,N,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(y,_,v,A){let S=y.value,w=_+"_"+v;if(A[w]===void 0)return typeof S=="number"||typeof S=="boolean"?A[w]=S:A[w]=S.clone(),!0;{let E=A[w];if(typeof S=="number"||typeof S=="boolean"){if(E!==S)return A[w]=S,!0}else if(E.equals(S)===!1)return E.copy(S),!0}return!1}function m(y){let _=y.uniforms,v=0,A=16;for(let w=0,E=_.length;w<E;w++){let b=Array.isArray(_[w])?_[w]:[_[w]];for(let M=0,R=b.length;M<R;M++){let N=b[M],L=Array.isArray(N.value)?N.value:[N.value];for(let C=0,B=L.length;C<B;C++){let U=L[C],z=x(U),F=v%A,J=F%z.boundary,$=F+J;v+=J,$!==0&&A-$<z.storage&&(v+=A-$),N.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=v,v+=z.storage}}}let S=v%A;return S>0&&(v+=A-S),y.__size=v,y.__cache={},this}function x(y){let _={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(_.boundary=4,_.storage=4):y.isVector2?(_.boundary=8,_.storage=8):y.isVector3||y.isColor?(_.boundary=16,_.storage=12):y.isVector4?(_.boundary=16,_.storage=16):y.isMatrix3?(_.boundary=48,_.storage=48):y.isMatrix4?(_.boundary=64,_.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),_}function g(y){let _=y.target;_.removeEventListener("dispose",g);let v=o.indexOf(_.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function p(){for(let y in s)i.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}var pa=class{constructor(t={}){let{canvas:e=jg(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;let m=new Uint32Array(4),x=new Int32Array(4),g=null,p=null,y=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ie,this.toneMapping=Ni,this.toneMappingExposure=1;let v=this,A=!1,S=0,w=0,E=null,b=-1,M=null,R=new de,N=new de,L=null,C=new Ot(0),B=0,U=e.width,z=e.height,F=1,J=null,$=null,ct=new de(0,0,U,z),ht=new de(0,0,U,z),Mt=!1,j=new Wr,Y=!1,Z=!1,et=new Gt,mt=new Gt,Rt=new D,Ut=new de,Xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},it=!1;function lt(){return E===null?F:1}let O=n;function Ct(P,q){return e.getContext(P,q)}try{let P={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${wh}`),e.addEventListener("webglcontextlost",V,!1),e.addEventListener("webglcontextrestored",Q,!1),e.addEventListener("webglcontextcreationerror",st,!1),O===null){let q="webgl2";if(O=Ct(q,P),O===null)throw Ct(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let dt,St,rt,xt,ut,I,T,W,nt,ot,at,Bt,At,Lt,ne,gt,wt,kt,Yt,It,Wt,Kt,Qt,X;function H(){dt=new hv(O),dt.init(),Kt=new H1(O,dt),St=new sv(O,dt,t,Kt),rt=new z1(O,dt),St.reverseDepthBuffer&&f&&rt.buffers.depth.setReversed(!0),xt=new dv(O),ut=new E1,I=new V1(O,dt,rt,ut,St,Kt,xt),T=new ov(v),W=new lv(v),nt=new vx(O),Qt=new nv(O,nt),ot=new uv(O,nt,xt,Qt),at=new mv(O,ot,nt,xt),Yt=new pv(O,St,I),gt=new rv(ut),Bt=new A1(v,T,W,dt,St,Qt,gt),At=new q1(v,ut),Lt=new R1,ne=new N1(dt),kt=new ev(v,T,W,rt,at,d,c),wt=new O1(v,at,St),X=new Z1(O,xt,St,rt),It=new iv(O,dt,xt),Wt=new fv(O,dt,xt),xt.programs=Bt.programs,v.capabilities=St,v.extensions=dt,v.properties=ut,v.renderLists=Lt,v.shadowMap=wt,v.state=rt,v.info=xt}H();let k=new eh(v,O);this.xr=k,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let P=dt.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){let P=dt.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return F},this.setPixelRatio=function(P){P!==void 0&&(F=P,this.setSize(U,z,!1))},this.getSize=function(P){return P.set(U,z)},this.setSize=function(P,q,K=!0){if(k.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=P,z=q,e.width=Math.floor(P*F),e.height=Math.floor(q*F),K===!0&&(e.style.width=P+"px",e.style.height=q+"px"),this.setViewport(0,0,P,q)},this.getDrawingBufferSize=function(P){return P.set(U*F,z*F).floor()},this.setDrawingBufferSize=function(P,q,K){U=P,z=q,F=K,e.width=Math.floor(P*K),e.height=Math.floor(q*K),this.setViewport(0,0,P,q)},this.getCurrentViewport=function(P){return P.copy(R)},this.getViewport=function(P){return P.copy(ct)},this.setViewport=function(P,q,K,tt){P.isVector4?ct.set(P.x,P.y,P.z,P.w):ct.set(P,q,K,tt),rt.viewport(R.copy(ct).multiplyScalar(F).round())},this.getScissor=function(P){return P.copy(ht)},this.setScissor=function(P,q,K,tt){P.isVector4?ht.set(P.x,P.y,P.z,P.w):ht.set(P,q,K,tt),rt.scissor(N.copy(ht).multiplyScalar(F).round())},this.getScissorTest=function(){return Mt},this.setScissorTest=function(P){rt.setScissorTest(Mt=P)},this.setOpaqueSort=function(P){J=P},this.setTransparentSort=function(P){$=P},this.getClearColor=function(P){return P.copy(kt.getClearColor())},this.setClearColor=function(){kt.setClearColor.apply(kt,arguments)},this.getClearAlpha=function(){return kt.getClearAlpha()},this.setClearAlpha=function(){kt.setClearAlpha.apply(kt,arguments)},this.clear=function(P=!0,q=!0,K=!0){let tt=0;if(P){let G=!1;if(E!==null){let vt=E.texture.format;G=vt===Lh||vt===Ph||vt===Ih}if(G){let vt=E.texture.type,Dt=vt===gi||vt===is||vt===zr||vt===js||vt===Rh||vt===Ch,qt=kt.getClearColor(),Zt=kt.getClearAlpha(),ie=qt.r,ce=qt.g,$t=qt.b;Dt?(m[0]=ie,m[1]=ce,m[2]=$t,m[3]=Zt,O.clearBufferuiv(O.COLOR,0,m)):(x[0]=ie,x[1]=ce,x[2]=$t,x[3]=Zt,O.clearBufferiv(O.COLOR,0,x))}else tt|=O.COLOR_BUFFER_BIT}q&&(tt|=O.DEPTH_BUFFER_BIT),K&&(tt|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(tt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",V,!1),e.removeEventListener("webglcontextrestored",Q,!1),e.removeEventListener("webglcontextcreationerror",st,!1),Lt.dispose(),ne.dispose(),ut.dispose(),T.dispose(),W.dispose(),at.dispose(),Qt.dispose(),X.dispose(),Bt.dispose(),k.dispose(),k.removeEventListener("sessionstart",ae),k.removeEventListener("sessionend",_t),jt.stop()};function V(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function Q(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;let P=xt.autoReset,q=wt.enabled,K=wt.autoUpdate,tt=wt.needsUpdate,G=wt.type;H(),xt.autoReset=P,wt.enabled=q,wt.autoUpdate=K,wt.needsUpdate=tt,wt.type=G}function st(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function pt(P){let q=P.target;q.removeEventListener("dispose",pt),Et(q)}function Et(P){Vt(P),ut.remove(P)}function Vt(P){let q=ut.get(P).programs;q!==void 0&&(q.forEach(function(K){Bt.releaseProgram(K)}),P.isShaderMaterial&&Bt.releaseShaderCache(P))}this.renderBufferDirect=function(P,q,K,tt,G,vt){q===null&&(q=Xt);let Dt=G.isMesh&&G.matrixWorld.determinant()<0,qt=Re(P,q,K,tt,G);rt.setMaterial(tt,Dt);let Zt=K.index,ie=1;if(tt.wireframe===!0){if(Zt=ot.getWireframeAttribute(K),Zt===void 0)return;ie=2}let ce=K.drawRange,$t=K.attributes.position,xe=ce.start*ie,Ce=(ce.start+ce.count)*ie;vt!==null&&(xe=Math.max(xe,vt.start*ie),Ce=Math.min(Ce,(vt.start+vt.count)*ie)),Zt!==null?(xe=Math.max(xe,0),Ce=Math.min(Ce,Zt.count)):$t!=null&&(xe=Math.max(xe,0),Ce=Math.min(Ce,$t.count));let Le=Ce-xe;if(Le<0||Le===1/0)return;Qt.setup(G,tt,qt,K,Zt);let _n,Me=It;if(Zt!==null&&(_n=nt.get(Zt),Me=Wt,Me.setIndex(_n)),G.isMesh)tt.wireframe===!0?(rt.setLineWidth(tt.wireframeLinewidth*lt()),Me.setMode(O.LINES)):Me.setMode(O.TRIANGLES);else if(G.isLine){let Jt=tt.linewidth;Jt===void 0&&(Jt=1),rt.setLineWidth(Jt*lt()),G.isLineSegments?Me.setMode(O.LINES):G.isLineLoop?Me.setMode(O.LINE_LOOP):Me.setMode(O.LINE_STRIP)}else G.isPoints?Me.setMode(O.POINTS):G.isSprite&&Me.setMode(O.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)Me.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(dt.get("WEBGL_multi_draw"))Me.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let Jt=G._multiDrawStarts,si=G._multiDrawCounts,Se=G._multiDrawCount,On=Zt?nt.get(Zt).bytesPerElement:1,bs=ut.get(tt).currentProgram.getUniforms();for(let bn=0;bn<Se;bn++)bs.setValue(O,"_gl_DrawID",bn),Me.render(Jt[bn]/On,si[bn])}else if(G.isInstancedMesh)Me.renderInstances(xe,Le,G.count);else if(K.isInstancedBufferGeometry){let Jt=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,si=Math.min(K.instanceCount,Jt);Me.renderInstances(xe,Le,si)}else Me.render(xe,Le)};function Ft(P,q,K){P.transparent===!0&&P.side===Pe&&P.forceSinglePass===!1?(P.side=hn,P.needsUpdate=!0,me(P,q,K),P.side=Fi,P.needsUpdate=!0,me(P,q,K),P.side=Pe):me(P,q,K)}this.compile=function(P,q,K=null){K===null&&(K=P),p=ne.get(K),p.init(q),_.push(p),K.traverseVisible(function(G){G.isLight&&G.layers.test(q.layers)&&(p.pushLight(G),G.castShadow&&p.pushShadow(G))}),P!==K&&P.traverseVisible(function(G){G.isLight&&G.layers.test(q.layers)&&(p.pushLight(G),G.castShadow&&p.pushShadow(G))}),p.setupLights();let tt=new Set;return P.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let vt=G.material;if(vt)if(Array.isArray(vt))for(let Dt=0;Dt<vt.length;Dt++){let qt=vt[Dt];Ft(qt,K,G),tt.add(qt)}else Ft(vt,K,G),tt.add(vt)}),_.pop(),p=null,tt},this.compileAsync=function(P,q,K=null){let tt=this.compile(P,q,K);return new Promise(G=>{function vt(){if(tt.forEach(function(Dt){ut.get(Dt).currentProgram.isReady()&&tt.delete(Dt)}),tt.size===0){G(P);return}setTimeout(vt,10)}dt.get("KHR_parallel_shader_compile")!==null?vt():setTimeout(vt,10)})};let Ht=null;function Tt(P){Ht&&Ht(P)}function ae(){jt.stop()}function _t(){jt.start()}let jt=new pd;jt.setAnimationLoop(Tt),typeof self<"u"&&jt.setContext(self),this.setAnimationLoop=function(P){Ht=P,k.setAnimationLoop(P),P===null?jt.stop():jt.start()},k.addEventListener("sessionstart",ae),k.addEventListener("sessionend",_t),this.render=function(P,q){if(q!==void 0&&q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),k.enabled===!0&&k.isPresenting===!0&&(k.cameraAutoUpdate===!0&&k.updateCamera(q),q=k.getCamera()),P.isScene===!0&&P.onBeforeRender(v,P,q,E),p=ne.get(P,_.length),p.init(q),_.push(p),mt.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),j.setFromProjectionMatrix(mt),Z=this.localClippingEnabled,Y=gt.init(this.clippingPlanes,Z),g=Lt.get(P,y.length),g.init(),y.push(g),k.enabled===!0&&k.isPresenting===!0){let vt=v.xr.getDepthSensingMesh();vt!==null&&te(vt,q,-1/0,v.sortObjects)}te(P,q,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(J,$),it=k.enabled===!1||k.isPresenting===!1||k.hasDepthSensing()===!1,it&&kt.addToRenderList(g,P),this.info.render.frame++,Y===!0&&gt.beginShadows();let K=p.state.shadowsArray;wt.render(K,P,q),Y===!0&&gt.endShadows(),this.info.autoReset===!0&&this.info.reset();let tt=g.opaque,G=g.transmissive;if(p.setupLights(),q.isArrayCamera){let vt=q.cameras;if(G.length>0)for(let Dt=0,qt=vt.length;Dt<qt;Dt++){let Zt=vt[Dt];ke(tt,G,P,Zt)}it&&kt.render(P);for(let Dt=0,qt=vt.length;Dt<qt;Dt++){let Zt=vt[Dt];pe(g,P,Zt,Zt.viewport)}}else G.length>0&&ke(tt,G,P,q),it&&kt.render(P),pe(g,P,q);E!==null&&(I.updateMultisampleRenderTarget(E),I.updateRenderTargetMipmap(E)),P.isScene===!0&&P.onAfterRender(v,P,q),Qt.resetDefaultState(),b=-1,M=null,_.pop(),_.length>0?(p=_[_.length-1],Y===!0&&gt.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function te(P,q,K,tt){if(P.visible===!1)return;if(P.layers.test(q.layers)){if(P.isGroup)K=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(q);else if(P.isLight)p.pushLight(P),P.castShadow&&p.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||j.intersectsSprite(P)){tt&&Ut.setFromMatrixPosition(P.matrixWorld).applyMatrix4(mt);let Dt=at.update(P),qt=P.material;qt.visible&&g.push(P,Dt,qt,K,Ut.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||j.intersectsObject(P))){let Dt=at.update(P),qt=P.material;if(tt&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),Ut.copy(P.boundingSphere.center)):(Dt.boundingSphere===null&&Dt.computeBoundingSphere(),Ut.copy(Dt.boundingSphere.center)),Ut.applyMatrix4(P.matrixWorld).applyMatrix4(mt)),Array.isArray(qt)){let Zt=Dt.groups;for(let ie=0,ce=Zt.length;ie<ce;ie++){let $t=Zt[ie],xe=qt[$t.materialIndex];xe&&xe.visible&&g.push(P,Dt,xe,K,Ut.z,$t)}}else qt.visible&&g.push(P,Dt,qt,K,Ut.z,null)}}let vt=P.children;for(let Dt=0,qt=vt.length;Dt<qt;Dt++)te(vt[Dt],q,K,tt)}function pe(P,q,K,tt){let G=P.opaque,vt=P.transmissive,Dt=P.transparent;p.setupLightsView(K),Y===!0&&gt.setGlobalState(v.clippingPlanes,K),tt&&rt.viewport(R.copy(tt)),G.length>0&&le(G,q,K),vt.length>0&&le(vt,q,K),Dt.length>0&&le(Dt,q,K),rt.buffers.depth.setTest(!0),rt.buffers.depth.setMask(!0),rt.buffers.color.setMask(!0),rt.setPolygonOffset(!1)}function ke(P,q,K,tt){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[tt.id]===void 0&&(p.state.transmissionRenderTarget[tt.id]=new Pn(1,1,{generateMipmaps:!0,type:dt.has("EXT_color_buffer_half_float")||dt.has("EXT_color_buffer_float")?fs:gi,minFilter:Vn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ge.workingColorSpace}));let vt=p.state.transmissionRenderTarget[tt.id],Dt=tt.viewport||R;vt.setSize(Dt.z,Dt.w);let qt=v.getRenderTarget();v.setRenderTarget(vt),v.getClearColor(C),B=v.getClearAlpha(),B<1&&v.setClearColor(16777215,.5),v.clear(),it&&kt.render(K);let Zt=v.toneMapping;v.toneMapping=Ni;let ie=tt.viewport;if(tt.viewport!==void 0&&(tt.viewport=void 0),p.setupLightsView(tt),Y===!0&&gt.setGlobalState(v.clippingPlanes,tt),le(P,K,tt),I.updateMultisampleRenderTarget(vt),I.updateRenderTargetMipmap(vt),dt.has("WEBGL_multisampled_render_to_texture")===!1){let ce=!1;for(let $t=0,xe=q.length;$t<xe;$t++){let Ce=q[$t],Le=Ce.object,_n=Ce.geometry,Me=Ce.material,Jt=Ce.group;if(Me.side===Pe&&Le.layers.test(tt.layers)){let si=Me.side;Me.side=hn,Me.needsUpdate=!0,ue(Le,K,tt,_n,Me,Jt),Me.side=si,Me.needsUpdate=!0,ce=!0}}ce===!0&&(I.updateMultisampleRenderTarget(vt),I.updateRenderTargetMipmap(vt))}v.setRenderTarget(qt),v.setClearColor(C,B),ie!==void 0&&(tt.viewport=ie),v.toneMapping=Zt}function le(P,q,K){let tt=q.isScene===!0?q.overrideMaterial:null;for(let G=0,vt=P.length;G<vt;G++){let Dt=P[G],qt=Dt.object,Zt=Dt.geometry,ie=tt===null?Dt.material:tt,ce=Dt.group;qt.layers.test(K.layers)&&ue(qt,q,K,Zt,ie,ce)}}function ue(P,q,K,tt,G,vt){P.onBeforeRender(v,q,K,tt,G,vt),P.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),G.onBeforeRender(v,q,K,tt,P,vt),G.transparent===!0&&G.side===Pe&&G.forceSinglePass===!1?(G.side=hn,G.needsUpdate=!0,v.renderBufferDirect(K,q,tt,G,P,vt),G.side=Fi,G.needsUpdate=!0,v.renderBufferDirect(K,q,tt,G,P,vt),G.side=Pe):v.renderBufferDirect(K,q,tt,G,P,vt),P.onAfterRender(v,q,K,tt,G,vt)}function me(P,q,K){q.isScene!==!0&&(q=Xt);let tt=ut.get(P),G=p.state.lights,vt=p.state.shadowsArray,Dt=G.state.version,qt=Bt.getParameters(P,G.state,vt,q,K),Zt=Bt.getProgramCacheKey(qt),ie=tt.programs;tt.environment=P.isMeshStandardMaterial?q.environment:null,tt.fog=q.fog,tt.envMap=(P.isMeshStandardMaterial?W:T).get(P.envMap||tt.environment),tt.envMapRotation=tt.environment!==null&&P.envMap===null?q.environmentRotation:P.envMapRotation,ie===void 0&&(P.addEventListener("dispose",pt),ie=new Map,tt.programs=ie);let ce=ie.get(Zt);if(ce!==void 0){if(tt.currentProgram===ce&&tt.lightsStateVersion===Dt)return Je(P,qt),ce}else qt.uniforms=Bt.getUniforms(P),P.onBeforeCompile(qt,v),ce=Bt.acquireProgram(qt,Zt),ie.set(Zt,ce),tt.uniforms=qt.uniforms;let $t=tt.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&($t.clippingPlanes=gt.uniform),Je(P,qt),tt.needsLights=tn(P),tt.lightsStateVersion=Dt,tt.needsLights&&($t.ambientLightColor.value=G.state.ambient,$t.lightProbe.value=G.state.probe,$t.directionalLights.value=G.state.directional,$t.directionalLightShadows.value=G.state.directionalShadow,$t.spotLights.value=G.state.spot,$t.spotLightShadows.value=G.state.spotShadow,$t.rectAreaLights.value=G.state.rectArea,$t.ltc_1.value=G.state.rectAreaLTC1,$t.ltc_2.value=G.state.rectAreaLTC2,$t.pointLights.value=G.state.point,$t.pointLightShadows.value=G.state.pointShadow,$t.hemisphereLights.value=G.state.hemi,$t.directionalShadowMap.value=G.state.directionalShadowMap,$t.directionalShadowMatrix.value=G.state.directionalShadowMatrix,$t.spotShadowMap.value=G.state.spotShadowMap,$t.spotLightMatrix.value=G.state.spotLightMatrix,$t.spotLightMap.value=G.state.spotLightMap,$t.pointShadowMap.value=G.state.pointShadowMap,$t.pointShadowMatrix.value=G.state.pointShadowMatrix),tt.currentProgram=ce,tt.uniformsList=null,ce}function he(P){if(P.uniformsList===null){let q=P.currentProgram.getUniforms();P.uniformsList=Zs.seqWithValue(q.seq,P.uniforms)}return P.uniformsList}function Je(P,q){let K=ut.get(P);K.outputColorSpace=q.outputColorSpace,K.batching=q.batching,K.batchingColor=q.batchingColor,K.instancing=q.instancing,K.instancingColor=q.instancingColor,K.instancingMorph=q.instancingMorph,K.skinning=q.skinning,K.morphTargets=q.morphTargets,K.morphNormals=q.morphNormals,K.morphColors=q.morphColors,K.morphTargetsCount=q.morphTargetsCount,K.numClippingPlanes=q.numClippingPlanes,K.numIntersection=q.numClipIntersection,K.vertexAlphas=q.vertexAlphas,K.vertexTangents=q.vertexTangents,K.toneMapping=q.toneMapping}function Re(P,q,K,tt,G){q.isScene!==!0&&(q=Xt),I.resetTextureUnits();let vt=q.fog,Dt=tt.isMeshStandardMaterial?q.environment:null,qt=E===null?v.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Hi,Zt=(tt.isMeshStandardMaterial?W:T).get(tt.envMap||Dt),ie=tt.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,ce=!!K.attributes.tangent&&(!!tt.normalMap||tt.anisotropy>0),$t=!!K.morphAttributes.position,xe=!!K.morphAttributes.normal,Ce=!!K.morphAttributes.color,Le=Ni;tt.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(Le=v.toneMapping);let _n=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Me=_n!==void 0?_n.length:0,Jt=ut.get(tt),si=p.state.lights;if(Y===!0&&(Z===!0||P!==M)){let Cn=P===M&&tt.id===b;gt.setState(tt,P,Cn)}let Se=!1;tt.version===Jt.__version?(Jt.needsLights&&Jt.lightsStateVersion!==si.state.version||Jt.outputColorSpace!==qt||G.isBatchedMesh&&Jt.batching===!1||!G.isBatchedMesh&&Jt.batching===!0||G.isBatchedMesh&&Jt.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Jt.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Jt.instancing===!1||!G.isInstancedMesh&&Jt.instancing===!0||G.isSkinnedMesh&&Jt.skinning===!1||!G.isSkinnedMesh&&Jt.skinning===!0||G.isInstancedMesh&&Jt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Jt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Jt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Jt.instancingMorph===!1&&G.morphTexture!==null||Jt.envMap!==Zt||tt.fog===!0&&Jt.fog!==vt||Jt.numClippingPlanes!==void 0&&(Jt.numClippingPlanes!==gt.numPlanes||Jt.numIntersection!==gt.numIntersection)||Jt.vertexAlphas!==ie||Jt.vertexTangents!==ce||Jt.morphTargets!==$t||Jt.morphNormals!==xe||Jt.morphColors!==Ce||Jt.toneMapping!==Le||Jt.morphTargetsCount!==Me)&&(Se=!0):(Se=!0,Jt.__version=tt.version);let On=Jt.currentProgram;Se===!0&&(On=me(tt,q,G));let bs=!1,bn=!1,Sr=!1,De=On.getUniforms(),qn=Jt.uniforms;if(rt.useProgram(On.program)&&(bs=!0,bn=!0,Sr=!0),tt.id!==b&&(b=tt.id,bn=!0),bs||M!==P){rt.buffers.depth.getReversed()?(et.copy(P.projectionMatrix),tx(et),ex(et),De.setValue(O,"projectionMatrix",et)):De.setValue(O,"projectionMatrix",P.projectionMatrix),De.setValue(O,"viewMatrix",P.matrixWorldInverse);let bi=De.map.cameraPosition;bi!==void 0&&bi.setValue(O,Rt.setFromMatrixPosition(P.matrixWorld)),St.logarithmicDepthBuffer&&De.setValue(O,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(tt.isMeshPhongMaterial||tt.isMeshToonMaterial||tt.isMeshLambertMaterial||tt.isMeshBasicMaterial||tt.isMeshStandardMaterial||tt.isShaderMaterial)&&De.setValue(O,"isOrthographic",P.isOrthographicCamera===!0),M!==P&&(M=P,bn=!0,Sr=!0)}if(G.isSkinnedMesh){De.setOptional(O,G,"bindMatrix"),De.setOptional(O,G,"bindMatrixInverse");let Cn=G.skeleton;Cn&&(Cn.boneTexture===null&&Cn.computeBoneTexture(),De.setValue(O,"boneTexture",Cn.boneTexture,I))}G.isBatchedMesh&&(De.setOptional(O,G,"batchingTexture"),De.setValue(O,"batchingTexture",G._matricesTexture,I),De.setOptional(O,G,"batchingIdTexture"),De.setValue(O,"batchingIdTexture",G._indirectTexture,I),De.setOptional(O,G,"batchingColorTexture"),G._colorsTexture!==null&&De.setValue(O,"batchingColorTexture",G._colorsTexture,I));let br=K.morphAttributes;if((br.position!==void 0||br.normal!==void 0||br.color!==void 0)&&Yt.update(G,K,On),(bn||Jt.receiveShadow!==G.receiveShadow)&&(Jt.receiveShadow=G.receiveShadow,De.setValue(O,"receiveShadow",G.receiveShadow)),tt.isMeshGouraudMaterial&&tt.envMap!==null&&(qn.envMap.value=Zt,qn.flipEnvMap.value=Zt.isCubeTexture&&Zt.isRenderTargetTexture===!1?-1:1),tt.isMeshStandardMaterial&&tt.envMap===null&&q.environment!==null&&(qn.envMapIntensity.value=q.environmentIntensity),bn&&(De.setValue(O,"toneMappingExposure",v.toneMappingExposure),Jt.needsLights&&Rn(qn,Sr),vt&&tt.fog===!0&&At.refreshFogUniforms(qn,vt),At.refreshMaterialUniforms(qn,tt,F,z,p.state.transmissionRenderTarget[P.id]),Zs.upload(O,he(Jt),qn,I)),tt.isShaderMaterial&&tt.uniformsNeedUpdate===!0&&(Zs.upload(O,he(Jt),qn,I),tt.uniformsNeedUpdate=!1),tt.isSpriteMaterial&&De.setValue(O,"center",G.center),De.setValue(O,"modelViewMatrix",G.modelViewMatrix),De.setValue(O,"normalMatrix",G.normalMatrix),De.setValue(O,"modelMatrix",G.matrixWorld),tt.isShaderMaterial||tt.isRawShaderMaterial){let Cn=tt.uniformsGroups;for(let bi=0,wi=Cn.length;bi<wi;bi++){let Fu=Cn[bi];X.update(Fu,On),X.bind(Fu,On)}}return On}function Rn(P,q){P.ambientLightColor.needsUpdate=q,P.lightProbe.needsUpdate=q,P.directionalLights.needsUpdate=q,P.directionalLightShadows.needsUpdate=q,P.pointLights.needsUpdate=q,P.pointLightShadows.needsUpdate=q,P.spotLights.needsUpdate=q,P.spotLightShadows.needsUpdate=q,P.rectAreaLights.needsUpdate=q,P.hemisphereLights.needsUpdate=q}function tn(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(P,q,K){ut.get(P.texture).__webglTexture=q,ut.get(P.depthTexture).__webglTexture=K;let tt=ut.get(P);tt.__hasExternalTextures=!0,tt.__autoAllocateDepthBuffer=K===void 0,tt.__autoAllocateDepthBuffer||dt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),tt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(P,q){let K=ut.get(P);K.__webglFramebuffer=q,K.__useDefaultFramebuffer=q===void 0},this.setRenderTarget=function(P,q=0,K=0){E=P,S=q,w=K;let tt=!0,G=null,vt=!1,Dt=!1;if(P){let Zt=ut.get(P);if(Zt.__useDefaultFramebuffer!==void 0)rt.bindFramebuffer(O.FRAMEBUFFER,null),tt=!1;else if(Zt.__webglFramebuffer===void 0)I.setupRenderTarget(P);else if(Zt.__hasExternalTextures)I.rebindTextures(P,ut.get(P.texture).__webglTexture,ut.get(P.depthTexture).__webglTexture);else if(P.depthBuffer){let $t=P.depthTexture;if(Zt.__boundDepthTexture!==$t){if($t!==null&&ut.has($t)&&(P.width!==$t.image.width||P.height!==$t.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(P)}}let ie=P.texture;(ie.isData3DTexture||ie.isDataArrayTexture||ie.isCompressedArrayTexture)&&(Dt=!0);let ce=ut.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(ce[q])?G=ce[q][K]:G=ce[q],vt=!0):P.samples>0&&I.useMultisampledRTT(P)===!1?G=ut.get(P).__webglMultisampledFramebuffer:Array.isArray(ce)?G=ce[K]:G=ce,R.copy(P.viewport),N.copy(P.scissor),L=P.scissorTest}else R.copy(ct).multiplyScalar(F).floor(),N.copy(ht).multiplyScalar(F).floor(),L=Mt;if(rt.bindFramebuffer(O.FRAMEBUFFER,G)&&tt&&rt.drawBuffers(P,G),rt.viewport(R),rt.scissor(N),rt.setScissorTest(L),vt){let Zt=ut.get(P.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+q,Zt.__webglTexture,K)}else if(Dt){let Zt=ut.get(P.texture),ie=q||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Zt.__webglTexture,K||0,ie)}b=-1},this.readRenderTargetPixels=function(P,q,K,tt,G,vt,Dt){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let qt=ut.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Dt!==void 0&&(qt=qt[Dt]),qt){rt.bindFramebuffer(O.FRAMEBUFFER,qt);try{let Zt=P.texture,ie=Zt.format,ce=Zt.type;if(!St.textureFormatReadable(ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!St.textureTypeReadable(ce)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=P.width-tt&&K>=0&&K<=P.height-G&&O.readPixels(q,K,tt,G,Kt.convert(ie),Kt.convert(ce),vt)}finally{let Zt=E!==null?ut.get(E).__webglFramebuffer:null;rt.bindFramebuffer(O.FRAMEBUFFER,Zt)}}},this.readRenderTargetPixelsAsync=async function(P,q,K,tt,G,vt,Dt){if(!(P&&P.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let qt=ut.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Dt!==void 0&&(qt=qt[Dt]),qt){let Zt=P.texture,ie=Zt.format,ce=Zt.type;if(!St.textureFormatReadable(ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!St.textureTypeReadable(ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(q>=0&&q<=P.width-tt&&K>=0&&K<=P.height-G){rt.bindFramebuffer(O.FRAMEBUFFER,qt);let $t=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,$t),O.bufferData(O.PIXEL_PACK_BUFFER,vt.byteLength,O.STREAM_READ),O.readPixels(q,K,tt,G,Kt.convert(ie),Kt.convert(ce),0);let xe=E!==null?ut.get(E).__webglFramebuffer:null;rt.bindFramebuffer(O.FRAMEBUFFER,xe);let Ce=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Qg(O,Ce,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,$t),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,vt),O.deleteBuffer($t),O.deleteSync(Ce),vt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(P,q=null,K=0){P.isTexture!==!0&&(Nr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),q=arguments[0]||null,P=arguments[1]);let tt=Math.pow(2,-K),G=Math.floor(P.image.width*tt),vt=Math.floor(P.image.height*tt),Dt=q!==null?q.x:0,qt=q!==null?q.y:0;I.setTexture2D(P,0),O.copyTexSubImage2D(O.TEXTURE_2D,K,0,0,Dt,qt,G,vt),rt.unbindTexture()},this.copyTextureToTexture=function(P,q,K=null,tt=null,G=0){P.isTexture!==!0&&(Nr("WebGLRenderer: copyTextureToTexture function signature has changed."),tt=arguments[0]||null,P=arguments[1],q=arguments[2],G=arguments[3]||0,K=null);let vt,Dt,qt,Zt,ie,ce,$t,xe,Ce,Le=P.isCompressedTexture?P.mipmaps[G]:P.image;K!==null?(vt=K.max.x-K.min.x,Dt=K.max.y-K.min.y,qt=K.isBox3?K.max.z-K.min.z:1,Zt=K.min.x,ie=K.min.y,ce=K.isBox3?K.min.z:0):(vt=Le.width,Dt=Le.height,qt=Le.depth||1,Zt=0,ie=0,ce=0),tt!==null?($t=tt.x,xe=tt.y,Ce=tt.z):($t=0,xe=0,Ce=0);let _n=Kt.convert(q.format),Me=Kt.convert(q.type),Jt;q.isData3DTexture?(I.setTexture3D(q,0),Jt=O.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(I.setTexture2DArray(q,0),Jt=O.TEXTURE_2D_ARRAY):(I.setTexture2D(q,0),Jt=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,q.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,q.unpackAlignment);let si=O.getParameter(O.UNPACK_ROW_LENGTH),Se=O.getParameter(O.UNPACK_IMAGE_HEIGHT),On=O.getParameter(O.UNPACK_SKIP_PIXELS),bs=O.getParameter(O.UNPACK_SKIP_ROWS),bn=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,Le.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Le.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Zt),O.pixelStorei(O.UNPACK_SKIP_ROWS,ie),O.pixelStorei(O.UNPACK_SKIP_IMAGES,ce);let Sr=P.isDataArrayTexture||P.isData3DTexture,De=q.isDataArrayTexture||q.isData3DTexture;if(P.isRenderTargetTexture||P.isDepthTexture){let qn=ut.get(P),br=ut.get(q),Cn=ut.get(qn.__renderTarget),bi=ut.get(br.__renderTarget);rt.bindFramebuffer(O.READ_FRAMEBUFFER,Cn.__webglFramebuffer),rt.bindFramebuffer(O.DRAW_FRAMEBUFFER,bi.__webglFramebuffer);for(let wi=0;wi<qt;wi++)Sr&&O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,ut.get(P).__webglTexture,G,ce+wi),P.isDepthTexture?(De&&O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,ut.get(q).__webglTexture,G,Ce+wi),O.blitFramebuffer(Zt,ie,vt,Dt,$t,xe,vt,Dt,O.DEPTH_BUFFER_BIT,O.NEAREST)):De?O.copyTexSubImage3D(Jt,G,$t,xe,Ce+wi,Zt,ie,vt,Dt):O.copyTexSubImage2D(Jt,G,$t,xe,Ce+wi,Zt,ie,vt,Dt);rt.bindFramebuffer(O.READ_FRAMEBUFFER,null),rt.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else De?P.isDataTexture||P.isData3DTexture?O.texSubImage3D(Jt,G,$t,xe,Ce,vt,Dt,qt,_n,Me,Le.data):q.isCompressedArrayTexture?O.compressedTexSubImage3D(Jt,G,$t,xe,Ce,vt,Dt,qt,_n,Le.data):O.texSubImage3D(Jt,G,$t,xe,Ce,vt,Dt,qt,_n,Me,Le):P.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,G,$t,xe,vt,Dt,_n,Me,Le.data):P.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,G,$t,xe,Le.width,Le.height,_n,Le.data):O.texSubImage2D(O.TEXTURE_2D,G,$t,xe,vt,Dt,_n,Me,Le);O.pixelStorei(O.UNPACK_ROW_LENGTH,si),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Se),O.pixelStorei(O.UNPACK_SKIP_PIXELS,On),O.pixelStorei(O.UNPACK_SKIP_ROWS,bs),O.pixelStorei(O.UNPACK_SKIP_IMAGES,bn),G===0&&q.generateMipmaps&&O.generateMipmap(Jt),rt.unbindTexture()},this.copyTextureToTexture3D=function(P,q,K=null,tt=null,G=0){return P.isTexture!==!0&&(Nr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),K=arguments[0]||null,tt=arguments[1]||null,P=arguments[2],q=arguments[3],G=arguments[4]||0),Nr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(P,q,K,tt,G)},this.initRenderTarget=function(P){ut.get(P).__webglFramebuffer===void 0&&I.setupRenderTarget(P)},this.initTexture=function(P){P.isCubeTexture?I.setTextureCube(P,0):P.isData3DTexture?I.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?I.setTexture2DArray(P,0):I.setTexture2D(P,0),rt.unbindTexture()},this.resetState=function(){S=0,w=0,E=null,rt.reset(),Qt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=ge._getDrawingBufferColorSpace(t),e.unpackColorSpace=ge._getUnpackColorSpace()}};var ma=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ot(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},zi=class extends Ze{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vn,this.environmentIntensity=1,this.environmentRotation=new vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},ga=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Vl,this.updateRanges=[],this.version=0,this.uuid=pi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=pi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=pi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},pn=new D,Xr=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)pn.fromBufferAttribute(this,e),pn.applyMatrix4(t),this.setXYZ(e,pn.x,pn.y,pn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)pn.fromBufferAttribute(this,e),pn.applyNormalMatrix(t),this.setXYZ(e,pn.x,pn.y,pn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)pn.fromBufferAttribute(this,e),pn.transformDirection(t),this.setXYZ(e,pn.x,pn.y,pn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=$n(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ae(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=Ae(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=$n(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=$n(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=$n(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=$n(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),s=Ae(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),s=Ae(s,this.array),r=Ae(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ne(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Yr=class extends Bi{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Ot(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Bs,Rr=new D,zs=new D,ks=new D,Vs=new ft,Cr=new ft,_d=new Gt,Yo=new D,Ir=new D,qo=new D,Of=new ft,Jc=new ft,Bf=new ft,xa=class extends Ze{constructor(t=new Yr){if(super(),this.isSprite=!0,this.type="Sprite",Bs===void 0){Bs=new fe;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ga(e,5);Bs.setIndex([0,1,2,0,2,3]),Bs.setAttribute("position",new Xr(n,3,0,!1)),Bs.setAttribute("uv",new Xr(n,2,3,!1))}this.geometry=Bs,this.material=t,this.center=new ft(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),zs.setFromMatrixScale(this.matrixWorld),_d.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ks.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&zs.multiplyScalar(-ks.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;Zo(Yo.set(-.5,-.5,0),ks,o,zs,s,r),Zo(Ir.set(.5,-.5,0),ks,o,zs,s,r),Zo(qo.set(.5,.5,0),ks,o,zs,s,r),Of.set(0,0),Jc.set(1,0),Bf.set(1,1);let a=t.ray.intersectTriangle(Yo,Ir,qo,!1,Rr);if(a===null&&(Zo(Ir.set(-.5,.5,0),ks,o,zs,s,r),Jc.set(0,1),a=t.ray.intersectTriangle(Yo,qo,Ir,!1,Rr),a===null))return;let c=t.ray.origin.distanceTo(Rr);c<t.near||c>t.far||e.push({distance:c,point:Rr.clone(),uv:Li.getInterpolation(Rr,Yo,Ir,qo,Of,Jc,Bf,new ft),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Zo(i,t,e,n,s,r){Vs.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Cr.x=r*Vs.x-s*Vs.y,Cr.y=s*Vs.x+r*Vs.y):Cr.copy(Vs),i.copy(t),i.x+=Cr.x,i.y+=Cr.y,i.applyMatrix4(_d)}var Sn=class extends gn{constructor(t=null,e=1,n=1,s,r,o,a,c,l=En,h=En,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ki=class extends Ne{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Hs=new Gt,zf=new Gt,$o=[],kf=new xn,$1=new Gt,Pr=new bt,Lr=new ss,$e=class extends bt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ki(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,$1)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new xn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Hs),kf.copy(t.boundingBox).applyMatrix4(Hs),this.boundingBox.union(kf)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ss),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Hs),Lr.copy(t.boundingSphere).applyMatrix4(Hs),this.boundingSphere.union(Lr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Pr.geometry=this.geometry,Pr.material=this.material,Pr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Lr.copy(this.boundingSphere),Lr.applyMatrix4(n),t.ray.intersectsSphere(Lr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Hs),zf.multiplyMatrices(n,Hs),Pr.matrixWorld=zf,Pr.raycast(t,$o);for(let o=0,a=$o.length;o<a;o++){let c=$o[o];c.instanceId=r,c.object=this,e.push(c)}$o.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ki(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Sn(new Float32Array(s*this.count),s,this.count,yi,Jn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Ln=class extends gn{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Dn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],f=n[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new ft:new D);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new D,s=[],r=[],o=[],a=new D,c=new Gt;for(let d=0;d<=t;d++){let m=d/t;s[d]=this.getTangentAt(m,new D)}r[0]=new D,o[0]=new D;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(nn(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,m))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(nn(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let m=1;m<=t;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],d*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},qr=class extends Dn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ft){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},nh=class extends qr{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Nh(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let f=(o-r)/l-(a-r)/(l+h)+(a-o)/h,d=(a-o)/h-(c-o)/(h+u)+(c-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var Jo=new D,Kc=new Nh,jc=new Nh,Qc=new Nh,Zr=class extends Dn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new D){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Jo.subVectors(s[0],s[1]).add(s[0]),l=Jo);let u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Jo.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Jo),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,m=Math.pow(l.distanceToSquared(u),d),x=Math.pow(u.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(h),d);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),Kc.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,m,x,g),jc.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,m,x,g),Qc.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,m,x,g)}else this.curveType==="catmullrom"&&(Kc.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),jc.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),Qc.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(Kc.calc(c),jc.calc(c),Qc.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new D().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Vf(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function J1(i,t){let e=1-i;return e*e*t}function K1(i,t){return 2*(1-i)*i*t}function j1(i,t){return i*i*t}function Or(i,t,e,n){return J1(i,t)+K1(i,e)+j1(i,n)}function Q1(i,t){let e=1-i;return e*e*e*t}function tM(i,t){let e=1-i;return 3*e*e*i*t}function eM(i,t){return 3*(1-i)*i*i*t}function nM(i,t){return i*i*i*t}function Br(i,t,e,n,s){return Q1(i,t)+tM(i,e)+eM(i,n)+nM(i,s)}var ya=class extends Dn{constructor(t=new ft,e=new ft,n=new ft,s=new ft){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ft){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Br(t,s.x,r.x,o.x,a.x),Br(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ih=class extends Dn{constructor(t=new D,e=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new D){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Br(t,s.x,r.x,o.x,a.x),Br(t,s.y,r.y,o.y,a.y),Br(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},_a=class extends Dn{constructor(t=new ft,e=new ft){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ft){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ft){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},sh=class extends Dn{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},va=class extends Dn{constructor(t=new ft,e=new ft,n=new ft){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ft){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Or(t,s.x,r.x,o.x),Or(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},rh=class extends Dn{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Or(t,s.x,r.x,o.x),Or(t,s.y,r.y,o.y),Or(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},sr=class extends Dn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ft){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Vf(a,c.x,l.x,h.x,u.x),Vf(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new ft().fromArray(s))}return this}},oh=Object.freeze({__proto__:null,ArcCurve:nh,CatmullRomCurve3:Zr,CubicBezierCurve:ya,CubicBezierCurve3:ih,EllipseCurve:qr,LineCurve:_a,LineCurve3:sh,QuadraticBezierCurve:va,QuadraticBezierCurve3:rh,SplineCurve:sr}),ah=class extends Dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new oh[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new oh[s.type]().fromJSON(s))}return this}},os=class extends ah{constructor(t){super(),this.type="Path",this.currentPoint=new ft,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new _a(this.currentPoint.clone(),new ft(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new va(this.currentPoint.clone(),new ft(t,e),new ft(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new ya(this.currentPoint.clone(),new ft(t,e),new ft(n,s),new ft(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new sr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){let l=new qr(t,e,n,s,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Vi=class i extends fe{constructor(t=[new ft(0,-.5),new ft(.5,0),new ft(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=nn(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],h=1/e,u=new D,f=new ft,d=new D,m=new D,x=new D,g=0,p=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:g=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,d.x=p*1,d.y=-g,d.z=p*0,x.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(x.x,x.y,x.z);break;default:g=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,d.x=p*1,d.y=-g,d.z=p*0,m.copy(d),d.x+=x.x,d.y+=x.y,d.z+=x.z,d.normalize(),c.push(d.x,d.y,d.z),x.copy(m)}for(let y=0;y<=e;y++){let _=n+y*h*s,v=Math.sin(_),A=Math.cos(_);for(let S=0;S<=t.length-1;S++){u.x=t[S].x*v,u.y=t[S].y,u.z=t[S].x*A,o.push(u.x,u.y,u.z),f.x=y/e,f.y=S/(t.length-1),a.push(f.x,f.y);let w=c[3*S+0]*v,E=c[3*S+1],b=c[3*S+0]*A;l.push(w,E,b)}}for(let y=0;y<e;y++)for(let _=0;_<t.length-1;_++){let v=_+y*t.length,A=v,S=v+t.length,w=v+t.length+1,E=v+1;r.push(A,S,E),r.push(w,E,S)}this.setIndex(r),this.setAttribute("position",new zt(o,3)),this.setAttribute("uv",new zt(a,2)),this.setAttribute("normal",new zt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}},as=class i extends Vi{constructor(t=1,e=1,n=4,s=8){let r=new os;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new i(t.radius,t.length,t.capSegments,t.radialSegments)}},xi=class i extends fe{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],c=[],l=new D,h=new ft;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){let d=n+u/e*s;l.x=t*Math.cos(d),l.y=t*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new zt(o,3)),this.setAttribute("normal",new zt(a,3)),this.setAttribute("uv",new zt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},oe=class i extends fe{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],d=[],m=0,x=[],g=n/2,p=0;y(),o===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new zt(u,3)),this.setAttribute("normal",new zt(f,3)),this.setAttribute("uv",new zt(d,2));function y(){let v=new D,A=new D,S=0,w=(e-t)/n;for(let E=0;E<=r;E++){let b=[],M=E/r,R=M*(e-t)+t;for(let N=0;N<=s;N++){let L=N/s,C=L*c+a,B=Math.sin(C),U=Math.cos(C);A.x=R*B,A.y=-M*n+g,A.z=R*U,u.push(A.x,A.y,A.z),v.set(B,w,U).normalize(),f.push(v.x,v.y,v.z),d.push(L,1-M),b.push(m++)}x.push(b)}for(let E=0;E<s;E++)for(let b=0;b<r;b++){let M=x[b][E],R=x[b+1][E],N=x[b+1][E+1],L=x[b][E+1];(t>0||b!==0)&&(h.push(M,R,L),S+=3),(e>0||b!==r-1)&&(h.push(R,N,L),S+=3)}l.addGroup(p,S,0),p+=S}function _(v){let A=m,S=new ft,w=new D,E=0,b=v===!0?t:e,M=v===!0?1:-1;for(let N=1;N<=s;N++)u.push(0,g*M,0),f.push(0,M,0),d.push(.5,.5),m++;let R=m;for(let N=0;N<=s;N++){let C=N/s*c+a,B=Math.cos(C),U=Math.sin(C);w.x=b*U,w.y=g*M,w.z=b*B,u.push(w.x,w.y,w.z),f.push(0,M,0),S.x=B*.5+.5,S.y=U*.5*M+.5,d.push(S.x,S.y),m++}for(let N=0;N<s;N++){let L=A+N,C=R+N;v===!0?h.push(C,C+1,L):h.push(C+1,C,L),E+=3}l.addGroup(p,E,v===!0?1:2),p+=E}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},$r=class i extends oe{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ch=class i extends fe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new zt(r,3)),this.setAttribute("normal",new zt(r.slice(),3)),this.setAttribute("uv",new zt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(y){let _=new D,v=new D,A=new D;for(let S=0;S<e.length;S+=3)d(e[S+0],_),d(e[S+1],v),d(e[S+2],A),c(_,v,A,y)}function c(y,_,v,A){let S=A+1,w=[];for(let E=0;E<=S;E++){w[E]=[];let b=y.clone().lerp(v,E/S),M=_.clone().lerp(v,E/S),R=S-E;for(let N=0;N<=R;N++)N===0&&E===S?w[E][N]=b:w[E][N]=b.clone().lerp(M,N/R)}for(let E=0;E<S;E++)for(let b=0;b<2*(S-E)-1;b++){let M=Math.floor(b/2);b%2===0?(f(w[E][M+1]),f(w[E+1][M]),f(w[E][M])):(f(w[E][M+1]),f(w[E+1][M+1]),f(w[E+1][M]))}}function l(y){let _=new D;for(let v=0;v<r.length;v+=3)_.x=r[v+0],_.y=r[v+1],_.z=r[v+2],_.normalize().multiplyScalar(y),r[v+0]=_.x,r[v+1]=_.y,r[v+2]=_.z}function h(){let y=new D;for(let _=0;_<r.length;_+=3){y.x=r[_+0],y.y=r[_+1],y.z=r[_+2];let v=g(y)/2/Math.PI+.5,A=p(y)/Math.PI+.5;o.push(v,1-A)}m(),u()}function u(){for(let y=0;y<o.length;y+=6){let _=o[y+0],v=o[y+2],A=o[y+4],S=Math.max(_,v,A),w=Math.min(_,v,A);S>.9&&w<.1&&(_<.2&&(o[y+0]+=1),v<.2&&(o[y+2]+=1),A<.2&&(o[y+4]+=1))}}function f(y){r.push(y.x,y.y,y.z)}function d(y,_){let v=y*3;_.x=t[v+0],_.y=t[v+1],_.z=t[v+2]}function m(){let y=new D,_=new D,v=new D,A=new D,S=new ft,w=new ft,E=new ft;for(let b=0,M=0;b<r.length;b+=9,M+=6){y.set(r[b+0],r[b+1],r[b+2]),_.set(r[b+3],r[b+4],r[b+5]),v.set(r[b+6],r[b+7],r[b+8]),S.set(o[M+0],o[M+1]),w.set(o[M+2],o[M+3]),E.set(o[M+4],o[M+5]),A.copy(y).add(_).add(v).divideScalar(3);let R=g(A);x(S,M+0,y,R),x(w,M+2,_,R),x(E,M+4,v,R)}}function x(y,_,v,A){A<0&&y.x===1&&(o[_]=y.x-1),v.x===0&&v.z===0&&(o[_]=A/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.details)}};var Kn=class extends os{constructor(t){super(t),this.uuid=pi(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new os().fromJSON(s))}return this}},iM={triangulate:function(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=vd(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,f,d;if(n&&(r=cM(i,t,r,e)),i.length>80*e){a=l=i[0],c=h=i[1];for(let m=e;m<s;m+=e)u=i[m],f=i[m+1],u<a&&(a=u),f<c&&(c=f),u>l&&(l=u),f>h&&(h=f);d=Math.max(l-a,h-c),d=d!==0?32767/d:0}return Jr(r,o,e,a,c,d,0),o}};function vd(i,t,e,n,s){let r,o;if(s===_M(i,t,e,n)>0)for(r=t;r<e;r+=n)o=Hf(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=Hf(r,i[r],i[r+1],o);return o&&La(o,o.next)&&(jr(o),o=o.next),o}function cs(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(La(e,e.next)||Ve(e.prev,e,e.next)===0)){if(jr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Jr(i,t,e,n,s,r,o){if(!i)return;!o&&r&&dM(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?rM(i,n,s,r):sM(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),jr(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=oM(cs(i),t,e),Jr(i,t,e,n,s,r,2)):o===2&&aM(i,t,e,n,s,r):Jr(cs(i),t,e,n,s,r,1);break}}}function sM(i){let t=i.prev,e=i,n=i.next;if(Ve(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,f=s>r?s>o?s:o:r>o?r:o,d=a>c?a>l?a:l:c>l?c:l,m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=f&&m.y>=u&&m.y<=d&&Ws(s,a,r,c,o,l,m.x,m.y)&&Ve(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function rM(i,t,e,n){let s=i.prev,r=i,o=i.next;if(Ve(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,f=o.y,d=a<c?a<l?a:l:c<l?c:l,m=h<u?h<f?h:f:u<f?u:f,x=a>c?a>l?a:l:c>l?c:l,g=h>u?h>f?h:f:u>f?u:f,p=lh(d,m,t,e,n),y=lh(x,g,t,e,n),_=i.prevZ,v=i.nextZ;for(;_&&_.z>=p&&v&&v.z<=y;){if(_.x>=d&&_.x<=x&&_.y>=m&&_.y<=g&&_!==s&&_!==o&&Ws(a,h,c,u,l,f,_.x,_.y)&&Ve(_.prev,_,_.next)>=0||(_=_.prevZ,v.x>=d&&v.x<=x&&v.y>=m&&v.y<=g&&v!==s&&v!==o&&Ws(a,h,c,u,l,f,v.x,v.y)&&Ve(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;_&&_.z>=p;){if(_.x>=d&&_.x<=x&&_.y>=m&&_.y<=g&&_!==s&&_!==o&&Ws(a,h,c,u,l,f,_.x,_.y)&&Ve(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;v&&v.z<=y;){if(v.x>=d&&v.x<=x&&v.y>=m&&v.y<=g&&v!==s&&v!==o&&Ws(a,h,c,u,l,f,v.x,v.y)&&Ve(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function oM(i,t,e){let n=i;do{let s=n.prev,r=n.next.next;!La(s,r)&&Md(s,n,n.next,r)&&Kr(s,r)&&Kr(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),jr(n),jr(n.next),n=i=r),n=n.next}while(n!==i);return cs(n)}function aM(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&gM(o,a)){let c=Sd(o,a);o=cs(o,o.next),c=cs(c,c.next),Jr(o,t,e,n,s,r,0),Jr(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function cM(i,t,e,n){let s=[],r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=vd(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(mM(l));for(s.sort(lM),r=0;r<s.length;r++)e=hM(s[r],e);return e}function lM(i,t){return i.x-t.x}function hM(i,t){let e=uM(i,t);if(!e)return t;let n=Sd(e,i);return cs(n,n.next),cs(e,e.next)}function uM(i,t){let e=t,n=-1/0,s,r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){let f=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>n&&(n=f,s=e.x<e.next.x?e:e.next,f===r))return s}e=e.next}while(e!==t);if(!s)return null;let a=s,c=s.x,l=s.y,h=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&Ws(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),Kr(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&fM(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function fM(i,t){return Ve(i.prev,i,t.prev)<0&&Ve(t.next,i,i.next)<0}function dM(i,t,e,n){let s=i;do s.z===0&&(s.z=lh(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,pM(s)}function pM(i){let t,e,n,s,r,o,a,c,l=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(o>1);return i}function lh(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function mM(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Ws(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function gM(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!xM(i,t)&&(Kr(i,t)&&Kr(t,i)&&yM(i,t)&&(Ve(i.prev,i,t.prev)||Ve(i,t.prev,t))||La(i,t)&&Ve(i.prev,i,i.next)>0&&Ve(t.prev,t,t.next)>0)}function Ve(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function La(i,t){return i.x===t.x&&i.y===t.y}function Md(i,t,e,n){let s=jo(Ve(i,t,e)),r=jo(Ve(i,t,n)),o=jo(Ve(e,n,i)),a=jo(Ve(e,n,t));return!!(s!==r&&o!==a||s===0&&Ko(i,e,t)||r===0&&Ko(i,n,t)||o===0&&Ko(e,i,n)||a===0&&Ko(e,t,n))}function Ko(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function jo(i){return i>0?1:i<0?-1:0}function xM(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Md(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Kr(i,t){return Ve(i.prev,i,i.next)<0?Ve(i,t,i.next)>=0&&Ve(i,i.prev,t)>=0:Ve(i,t,i.prev)<0||Ve(i,i.next,t)<0}function yM(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Sd(i,t){let e=new hh(i.i,i.x,i.y),n=new hh(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Hf(i,t,e,n){let s=new hh(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function jr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function hh(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function _M(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Ui=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Gf(t),Wf(n,t);let o=t.length;e.forEach(Gf);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Wf(n,e[c]);let a=iM.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function Gf(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Wf(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var Qr=class i extends fe{constructor(t=new Kn([new ft(.5,.5),new ft(-.5,.5),new ft(-.5,-.5),new ft(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){let l=t[a];o(l)}this.setAttribute("position",new zt(s,3)),this.setAttribute("uv",new zt(r,2)),this.computeVertexNormals();function o(a){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:d-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,y=e.UVGenerator!==void 0?e.UVGenerator:vM,_,v=!1,A,S,w,E;p&&(_=p.getSpacedPoints(h),v=!0,f=!1,A=p.computeFrenetFrames(h,!1),S=new D,w=new D,E=new D),f||(g=0,d=0,m=0,x=0);let b=a.extractPoints(l),M=b.shape,R=b.holes;if(!Ui.isClockWise(M)){M=M.reverse();for(let it=0,lt=R.length;it<lt;it++){let O=R[it];Ui.isClockWise(O)&&(R[it]=O.reverse())}}let L=Ui.triangulateShape(M,R),C=M;for(let it=0,lt=R.length;it<lt;it++){let O=R[it];M=M.concat(O)}function B(it,lt,O){return lt||console.error("THREE.ExtrudeGeometry: vec does not exist"),it.clone().addScaledVector(lt,O)}let U=M.length,z=L.length;function F(it,lt,O){let Ct,dt,St,rt=it.x-lt.x,xt=it.y-lt.y,ut=O.x-it.x,I=O.y-it.y,T=rt*rt+xt*xt,W=rt*I-xt*ut;if(Math.abs(W)>Number.EPSILON){let nt=Math.sqrt(T),ot=Math.sqrt(ut*ut+I*I),at=lt.x-xt/nt,Bt=lt.y+rt/nt,At=O.x-I/ot,Lt=O.y+ut/ot,ne=((At-at)*I-(Lt-Bt)*ut)/(rt*I-xt*ut);Ct=at+rt*ne-it.x,dt=Bt+xt*ne-it.y;let gt=Ct*Ct+dt*dt;if(gt<=2)return new ft(Ct,dt);St=Math.sqrt(gt/2)}else{let nt=!1;rt>Number.EPSILON?ut>Number.EPSILON&&(nt=!0):rt<-Number.EPSILON?ut<-Number.EPSILON&&(nt=!0):Math.sign(xt)===Math.sign(I)&&(nt=!0),nt?(Ct=-xt,dt=rt,St=Math.sqrt(T)):(Ct=rt,dt=xt,St=Math.sqrt(T/2))}return new ft(Ct/St,dt/St)}let J=[];for(let it=0,lt=C.length,O=lt-1,Ct=it+1;it<lt;it++,O++,Ct++)O===lt&&(O=0),Ct===lt&&(Ct=0),J[it]=F(C[it],C[O],C[Ct]);let $=[],ct,ht=J.concat();for(let it=0,lt=R.length;it<lt;it++){let O=R[it];ct=[];for(let Ct=0,dt=O.length,St=dt-1,rt=Ct+1;Ct<dt;Ct++,St++,rt++)St===dt&&(St=0),rt===dt&&(rt=0),ct[Ct]=F(O[Ct],O[St],O[rt]);$.push(ct),ht=ht.concat(ct)}for(let it=0;it<g;it++){let lt=it/g,O=d*Math.cos(lt*Math.PI/2),Ct=m*Math.sin(lt*Math.PI/2)+x;for(let dt=0,St=C.length;dt<St;dt++){let rt=B(C[dt],J[dt],Ct);et(rt.x,rt.y,-O)}for(let dt=0,St=R.length;dt<St;dt++){let rt=R[dt];ct=$[dt];for(let xt=0,ut=rt.length;xt<ut;xt++){let I=B(rt[xt],ct[xt],Ct);et(I.x,I.y,-O)}}}let Mt=m+x;for(let it=0;it<U;it++){let lt=f?B(M[it],ht[it],Mt):M[it];v?(w.copy(A.normals[0]).multiplyScalar(lt.x),S.copy(A.binormals[0]).multiplyScalar(lt.y),E.copy(_[0]).add(w).add(S),et(E.x,E.y,E.z)):et(lt.x,lt.y,0)}for(let it=1;it<=h;it++)for(let lt=0;lt<U;lt++){let O=f?B(M[lt],ht[lt],Mt):M[lt];v?(w.copy(A.normals[it]).multiplyScalar(O.x),S.copy(A.binormals[it]).multiplyScalar(O.y),E.copy(_[it]).add(w).add(S),et(E.x,E.y,E.z)):et(O.x,O.y,u/h*it)}for(let it=g-1;it>=0;it--){let lt=it/g,O=d*Math.cos(lt*Math.PI/2),Ct=m*Math.sin(lt*Math.PI/2)+x;for(let dt=0,St=C.length;dt<St;dt++){let rt=B(C[dt],J[dt],Ct);et(rt.x,rt.y,u+O)}for(let dt=0,St=R.length;dt<St;dt++){let rt=R[dt];ct=$[dt];for(let xt=0,ut=rt.length;xt<ut;xt++){let I=B(rt[xt],ct[xt],Ct);v?et(I.x,I.y+_[h-1].y,_[h-1].x+O):et(I.x,I.y,u+O)}}}j(),Y();function j(){let it=s.length/3;if(f){let lt=0,O=U*lt;for(let Ct=0;Ct<z;Ct++){let dt=L[Ct];mt(dt[2]+O,dt[1]+O,dt[0]+O)}lt=h+g*2,O=U*lt;for(let Ct=0;Ct<z;Ct++){let dt=L[Ct];mt(dt[0]+O,dt[1]+O,dt[2]+O)}}else{for(let lt=0;lt<z;lt++){let O=L[lt];mt(O[2],O[1],O[0])}for(let lt=0;lt<z;lt++){let O=L[lt];mt(O[0]+U*h,O[1]+U*h,O[2]+U*h)}}n.addGroup(it,s.length/3-it,0)}function Y(){let it=s.length/3,lt=0;Z(C,lt),lt+=C.length;for(let O=0,Ct=R.length;O<Ct;O++){let dt=R[O];Z(dt,lt),lt+=dt.length}n.addGroup(it,s.length/3-it,1)}function Z(it,lt){let O=it.length;for(;--O>=0;){let Ct=O,dt=O-1;dt<0&&(dt=it.length-1);for(let St=0,rt=h+g*2;St<rt;St++){let xt=U*St,ut=U*(St+1),I=lt+Ct+xt,T=lt+dt+xt,W=lt+dt+ut,nt=lt+Ct+ut;Rt(I,T,W,nt)}}}function et(it,lt,O){c.push(it),c.push(lt),c.push(O)}function mt(it,lt,O){Ut(it),Ut(lt),Ut(O);let Ct=s.length/3,dt=y.generateTopUV(n,s,Ct-3,Ct-2,Ct-1);Xt(dt[0]),Xt(dt[1]),Xt(dt[2])}function Rt(it,lt,O,Ct){Ut(it),Ut(lt),Ut(Ct),Ut(lt),Ut(O),Ut(Ct);let dt=s.length/3,St=y.generateSideWallUV(n,s,dt-6,dt-3,dt-2,dt-1);Xt(St[0]),Xt(St[1]),Xt(St[3]),Xt(St[1]),Xt(St[2]),Xt(St[3])}function Ut(it){s.push(c[it*3+0]),s.push(c[it*3+1]),s.push(c[it*3+2])}function Xt(it){r.push(it.x),r.push(it.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return MM(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new oh[s.type]().fromJSON(s)),new i(n,t.options)}},vM={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new ft(r,o),new ft(a,c),new ft(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[s*3],d=t[s*3+1],m=t[s*3+2],x=t[r*3],g=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new ft(o,1-c),new ft(l,1-u),new ft(f,1-m),new ft(x,1-p)]:[new ft(a,1-c),new ft(h,1-u),new ft(d,1-m),new ft(g,1-p)]}};function MM(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Ma=class i extends ch{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var to=class i extends fe{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],l=[],h=[],u=t,f=(e-t)/s,d=new D,m=new ft;for(let x=0;x<=s;x++){for(let g=0;g<=n;g++){let p=r+g/n*o;d.x=u*Math.cos(p),d.y=u*Math.sin(p),c.push(d.x,d.y,d.z),l.push(0,0,1),m.x=(d.x/e+1)/2,m.y=(d.y/e+1)/2,h.push(m.x,m.y)}u+=f}for(let x=0;x<s;x++){let g=x*(n+1);for(let p=0;p<n;p++){let y=p+g,_=y,v=y+n+1,A=y+n+2,S=y+1;a.push(_,v,S),a.push(v,A,S)}}this.setIndex(a),this.setAttribute("position",new zt(c,3)),this.setAttribute("normal",new zt(l,3)),this.setAttribute("uv",new zt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},eo=class i extends fe{constructor(t=new Kn([new ft(0,.5),new ft(-.5,-.5),new ft(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],o=[],a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new zt(s,3)),this.setAttribute("normal",new zt(r,3)),this.setAttribute("uv",new zt(o,2));function l(h){let u=s.length/3,f=h.extractPoints(e),d=f.shape,m=f.holes;Ui.isClockWise(d)===!1&&(d=d.reverse());for(let g=0,p=m.length;g<p;g++){let y=m[g];Ui.isClockWise(y)===!0&&(m[g]=y.reverse())}let x=Ui.triangulateShape(d,m);for(let g=0,p=m.length;g<p;g++){let y=m[g];d=d.concat(y)}for(let g=0,p=d.length;g<p;g++){let y=d[g];s.push(y.x,y.y,0),r.push(0,0,1),o.push(y.x,y.y)}for(let g=0,p=x.length;g<p;g++){let y=x[g],_=y[0]+u,v=y[1]+u,A=y[2]+u;n.push(_,v,A),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return SM(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let o=e[t.shapes[s]];n.push(o)}return new i(n,t.curveSegments)}};function SM(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}var jn=class i extends fe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new D,f=new D,d=[],m=[],x=[],g=[];for(let p=0;p<=n;p++){let y=[],_=p/n,v=0;p===0&&o===0?v=.5/e:p===n&&c===Math.PI&&(v=-.5/e);for(let A=0;A<=e;A++){let S=A/e;u.x=-t*Math.cos(s+S*r)*Math.sin(o+_*a),u.y=t*Math.cos(o+_*a),u.z=t*Math.sin(s+S*r)*Math.sin(o+_*a),m.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),g.push(S+v,1-_),y.push(l++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){let _=h[p][y+1],v=h[p][y],A=h[p+1][y],S=h[p+1][y+1];(p!==0||o>0)&&d.push(_,v,S),(p!==n-1||c<Math.PI)&&d.push(v,A,S)}this.setIndex(d),this.setAttribute("position",new zt(m,3)),this.setAttribute("normal",new zt(x,3)),this.setAttribute("uv",new zt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var ls=class i extends fe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],l=[],h=new D,u=new D,f=new D;for(let d=0;d<=n;d++)for(let m=0;m<=s;m++){let x=m/s*r,g=d/n*Math.PI*2;u.x=(t+e*Math.cos(g))*Math.cos(x),u.y=(t+e*Math.cos(g))*Math.sin(x),u.z=e*Math.sin(g),a.push(u.x,u.y,u.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(m/s),l.push(d/n)}for(let d=1;d<=n;d++)for(let m=1;m<=s;m++){let x=(s+1)*d+m-1,g=(s+1)*(d-1)+m-1,p=(s+1)*(d-1)+m,y=(s+1)*d+m;o.push(x,g,y),o.push(g,p,y)}this.setIndex(o),this.setAttribute("position",new zt(a,3)),this.setAttribute("normal",new zt(c,3)),this.setAttribute("uv",new zt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var yt=class extends Bi{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ot(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ld,this.normalScale=new ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},rr=class extends yt{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ft(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return nn(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ot(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ot(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ot(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};function Qo(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function bM(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var or=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},uh=class extends or{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Vu,endingEnd:Vu}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Hu:r=t,a=2*e-n;break;case Gu:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Hu:o=t,c=2*n-e;break;case Gu:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,m=(n-e)/(s-e),x=m*m,g=x*m,p=-f*g+2*f*x-f*m,y=(1+f)*g+(-1.5-2*f)*x+(-.5+f)*m+1,_=(-1-d)*g+(1.5+d)*x+.5*m,v=d*g-d*x;for(let A=0;A!==a;++A)r[A]=p*o[h+A]+y*o[l+A]+_*o[c+A]+v*o[u+A];return r}},fh=class extends or{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(s-e),u=1-h;for(let f=0;f!==a;++f)r[f]=o[l+f]*u+o[c+f]*h;return r}},dh=class extends or{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Hn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Qo(e,this.TimeBufferType),this.values=Qo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Qo(t.times,Array),values:Qo(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new dh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new fh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new uh(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ra:e=this.InterpolantFactoryMethodDiscrete;break;case kl:e=this.InterpolantFactoryMethodLinear;break;case Mc:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ra;case this.InterpolantFactoryMethodLinear:return kl;case this.InterpolantFactoryMethodSmooth:return Mc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&bM(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Mc,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let u=a*n,f=u-n,d=u+n;for(let m=0;m!==n;++m){let x=e[u+m];if(x!==e[f+m]||x!==e[d+m]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let u=a*n,f=o*n;for(let d=0;d!==n;++d)e[f+d]=e[u+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Hn.prototype.TimeBufferType=Float32Array;Hn.prototype.ValueBufferType=Float32Array;Hn.prototype.DefaultInterpolation=kl;var hs=class extends Hn{constructor(t,e,n){super(t,e,n)}};hs.prototype.ValueTypeName="bool";hs.prototype.ValueBufferType=Array;hs.prototype.DefaultInterpolation=ra;hs.prototype.InterpolantFactoryMethodLinear=void 0;hs.prototype.InterpolantFactoryMethodSmooth=void 0;var ph=class extends Hn{};ph.prototype.ValueTypeName="color";var mh=class extends Hn{};mh.prototype.ValueTypeName="number";var gh=class extends or{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)Oe.slerpFlat(r,0,o,l-a,o,l,c);return r}},Sa=class extends Hn{InterpolantFactoryMethodLinear(t){return new gh(this.times,this.values,this.getValueSize(),t)}};Sa.prototype.ValueTypeName="quaternion";Sa.prototype.InterpolantFactoryMethodSmooth=void 0;var us=class extends Hn{constructor(t,e,n){super(t,e,n)}};us.prototype.ValueTypeName="string";us.prototype.ValueBufferType=Array;us.prototype.DefaultInterpolation=ra;us.prototype.InterpolantFactoryMethodLinear=void 0;us.prototype.InterpolantFactoryMethodSmooth=void 0;var xh=class extends Hn{};xh.prototype.ValueTypeName="vector";var Xf={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},yh=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let d=l[u],m=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return m}return null}}},wM=new yh,no=class{constructor(t){this.manager=t!==void 0?t:wM,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};no.DEFAULT_MATERIAL_NAME="__DEFAULT";var _h=class extends no{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=Xf.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;let a=kr("img");function c(){h(),Xf.add(t,this),e&&e(this),r.manager.itemEnd(t)}function l(u){h(),s&&s(u),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}};var ba=class extends no{constructor(t){super(t)}load(t,e,n,s){let r=new gn,o=new _h(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},io=class extends Ze{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ot(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},wa=class extends io{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ot(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},tl=new Gt,Yf=new D,qf=new D,Aa=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ft(512,512),this.map=null,this.mapPass=null,this.matrix=new Gt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Wr,this._frameExtents=new ft(1,1),this._viewportCount=1,this._viewports=[new de(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Yf.setFromMatrixPosition(t.matrixWorld),e.position.copy(Yf),qf.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(qf),e.updateMatrixWorld(),tl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(tl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(tl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Zf=new Gt,Dr=new D,el=new D,vh=class extends Aa{constructor(){super(new ln(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ft(4,2),this._viewportCount=6,this._viewports=[new de(2,1,1,1),new de(0,1,1,1),new de(3,1,1,1),new de(1,1,1,1),new de(3,0,1,1),new de(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Dr.setFromMatrixPosition(t.matrixWorld),n.position.copy(Dr),el.copy(n.position),el.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(el),n.updateMatrixWorld(),s.makeTranslation(-Dr.x,-Dr.y,-Dr.z),Zf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zf)}},Ea=class extends io{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new vh}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Mh=class extends Aa{constructor(){super(new er(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ta=class extends io{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.target=new Ze,this.shadow=new Mh}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var Uh="\\[\\]\\.:\\/",AM=new RegExp("["+Uh+"]","g"),Fh="[^"+Uh+"]",EM="[^"+Uh.replace("\\.","")+"]",TM=/((?:WC+[\/:])*)/.source.replace("WC",Fh),RM=/(WCOD+)?/.source.replace("WCOD",EM),CM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Fh),IM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Fh),PM=new RegExp("^"+TM+RM+CM+IM+"$"),LM=["material","materials","bones","map"],Sh=class{constructor(t,e,n){let s=n||Fe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Fe=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(AM,"")}static parseTrackName(t){let e=PM.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);LM.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Fe.Composite=Sh;Fe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Fe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Fe.prototype.GetterByBindingType=[Fe.prototype._getValue_direct,Fe.prototype._getValue_array,Fe.prototype._getValue_arrayElement,Fe.prototype._getValue_toArray];Fe.prototype.SetterByBindingTypeAndVersioning=[[Fe.prototype._setValue_direct,Fe.prototype._setValue_direct_setNeedsUpdate,Fe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Fe.prototype._setValue_array,Fe.prototype._setValue_array_setNeedsUpdate,Fe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Fe.prototype._setValue_arrayElement,Fe.prototype._setValue_arrayElement_setNeedsUpdate,Fe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Fe.prototype._setValue_fromArray,Fe.prototype._setValue_fromArray_setNeedsUpdate,Fe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var CE=new Float32Array(1);var $f=new Gt,Ra=class{constructor(t,e,n=0,s=1/0){this.ray=new la(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Vr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return $f.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4($f),this}intersectObject(t,e=!0,n=[]){return bh(t,this,n,e),n.sort(Jf),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)bh(t[s],this,n,e);return n.sort(Jf),n}};function Jf(i,t){return i.distance-t.distance}function bh(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)bh(r[o],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wh);var Ee=(i,t,e)=>({rel:[i,t,e]}),un=(i,t,e)=>({abs:[i,t,e]}),Da={fit:"circuit"},bd=[{u:0,pos:un(341.5,.75,212.3),tgt:Ee(.2,.9,.2),fov:34},{u:.085,pos:un(339.5,.78,211.2),tgt:Ee(.4,.88,.1),fov:34},{u:.115,pos:Ee(-9,1.6,-4.5),tgt:Ee(.5,.85,0),fov:38},{u:.15,pos:Ee(-9,2.4,-7),tgt:Ee(1.5,.8,0),fov:38},{u:.18,pos:Ee(-3,3.8,-15.5),tgt:Ee(1,.9,0),fov:39},{u:.2,pos:un(-65.3,1.5,196.6),tgt:un(-58.3,1,187),fov:40},{u:.315,pos:un(-64.6,1.55,197.3),tgt:un(-58.4,1,187.1),fov:40},{u:.332,pos:un(-66,13,203),tgt:Ee(.5,.6,0),fov:42},{u:.346,pos:un(-96,72,262),tgt:un(-110,0,130),fov:44,aerial:!0},{u:.368,pos:Da,tgt:Da,scale:1.05,fov:50,aerial:!0},{u:.39,pos:Da,tgt:Da,scale:1,fov:50,aerial:!0},{u:.407,pos:un(-455,120,345),tgt:Ee(40,0,0),fov:42,aerial:!0},{u:.425,pos:Ee(5.3,2.2,-14.85),tgt:Ee(.3,.7,0),fov:38},{u:.56,pos:Ee(1.2,2.3,-16.7),tgt:Ee(.6,.7,0),fov:38},{u:.59,pos:Ee(-12,3.2,-4),tgt:Ee(2,.9,0),fov:40},{u:.635,pos:Ee(-11,3,6),tgt:Ee(2,.9,0),fov:40},{u:.652,pos:Ee(-8.5,2.4,15.75),tgt:Ee(2,.9,0),fov:38},{u:.665,pos:un(-16,1.35,134.5),tgt:Ee(.2,.75,0),fov:36},{u:.79,pos:un(-15.2,1.37,134.2),tgt:Ee(.2,.75,0),fov:36},{u:.815,pos:Ee(-9,2.2,4),tgt:Ee(1.5,.85,0),fov:38},{u:.84,pos:Ee(-6.4,2.3,-9.8),tgt:Ee(2,.9,0),fov:40},{u:.865,pos:Ee(9.75,1.7,-4.2),tgt:Ee(0,.8,0),fov:37},{u:.885,pos:un(10.6,.75,188.4),tgt:un(18,.95,192.4),fov:36},{u:1,pos:un(9.2,.72,188.9),tgt:un(15.6,.95,192.4),fov:35}],wd=[346,.5,214.4],Oh=30,Bh=[[0,.085],[.2,.315],[.425,.56],[.665,.79],[.885,1]],zh=.03;var Gn=(i,t,e)=>i+(t-i)*e,Nt=(i,t,e)=>Math.min(e,Math.max(t,i)),Xe=i=>i*i*(3-2*i),Ad=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2;function Gi(i){let t=i.map(r=>r[0]),e=i.map(r=>r[1]),n=i.length,s=e.map((r,o)=>Wn(t,e,o));return r=>{if(r<=t[0])return e[0];if(r>=t[n-1])return e[n-1];let o=0;for(;r>t[o+1];)o++;return cr(t[o],t[o+1],e[o],e[o+1],s[o],s[o+1],r)}}function Wn(i,t,e){let n=i.length;if(e<=0)return(t[1]-t[0])/(i[1]-i[0]);if(e>=n-1)return(t[n-1]-t[n-2])/(i[n-1]-i[n-2]);let s=(t[e]-t[e-1])/(i[e]-i[e-1]),r=(t[e+1]-t[e])/(i[e+1]-i[e]);if(s*r<=0)return 0;let o=i[e]-i[e-1],a=i[e+1]-i[e],c=2*a+o,l=a+2*o;return(c+l)/(c/s+l/r)}function cr(i,t,e,n,s,r,o){let a=t-i,c=(o-i)/a,l=c*c,h=l*c;return(2*h-3*l+1)*e+(h-2*l+c)*a*s+(3*l-2*h)*n+(h-l)*a*r}var fn=Math.PI/180,lr=new D(0,1,0),Na=.88,DM=.96,Ed=1.6,NM=60,Td=6,UM=4,Qn=80,FM=4,OM=2,Rd=.04,BM=1e-4,zM=1.04,kM=.75,Cd=3,VM=3,Id=6,Pd=.1,Ld=.8,HM=17,GM=1,Dd=3,WM=[0,8,-8,16,-16,24,-24,32,-32,40,-40],XM=Math.tan(40*Math.PI/180),Te=1001,Nd=6,Vd=4,hr=Float64Array.from({length:Te},(i,t)=>t/(Te-1)),ro=Math.ceil(3*Vd),kh=Float64Array.from({length:ro+1},(i,t)=>Math.exp(-.5*(t/Vd)**2)),Ud=10,YM=52,Fd=[-90,0],qM=5,Ua=14,Od=.94,Fa=[.04,.06,.96,.94];function Vh(i,t){let e=Math.tan(i*fn/2),n=Math.tan(NM*fn/2),s=e*Ed/Math.min(Ed,t);return Math.max(e,s/Math.pow(1+Math.pow(s/n,4),.25))}function Oa(i,t,e){let n=0;for(let s=0;s<t.length;s++){let r=t[s][0],o=t[s][1],a=1;i<r?a=1-(r-i)/e:i>o&&s<t.length-1&&(a=1-(i-o)/e),a>n&&(n=a)}return Xe(Nt(4*n,0,1))}function Bd(i,t){return i[0]===t[0]&&i[1]===t[1]&&i[2]===t[2]&&i[3]===t[3]}function zd(i,t,e){return t-i>=2*e?(i+t)/2:Math.min(Math.max(0,t-e),i+e)}function ZM(i){let t=i.length,e=new Float64Array(t*4);for(let n=0;n<t;n++){let[s,r]=i[(n-1+t)%t],[o,a]=i[(n+1)%t],c=Math.hypot(o-s,a-r)||1,l=-(a-r)/c,h=(o-s)/c,[u,f]=i[n];e[4*n]=u+l*Ua,e[4*n+1]=f+h*Ua,e[4*n+2]=u-l*Ua,e[4*n+3]=f-h*Ua}return e}var $M=[[0,0,0],[0,0,1],[1,0,0],[1,0,1],[0,1,0],[0,1,1],[1,.45,.04],[1,.45,.96],[.6,.93,.18],[.6,.93,.82]];function JM(i){let[t,e]=i;return $M.flatMap(([n,s,r])=>[t[0]+n*(e[0]-t[0]),t[1]+s*(e[1]-t[1]),t[2]+r*(e[2]-t[2])])}function KM(i,t,e,n){let s=Math.tan(n*fn/2),r=s*t,o=(e[2]-e[0])*Od,a=(e[3]-e[1])*Od,c=0,l=0,h=i.length/2;for(let d=0;d<h;d++)c+=i[2*d],l+=i[2*d+1];c/=h,l/=h;let u=YM*fn,f=null;for(let d=Fd[0];d<=Fd[1];d+=qM){let m=d*fn,x=-Math.sin(m)*Math.cos(u),g=-Math.sin(u),p=-Math.cos(m)*Math.cos(u),y=-p/Math.hypot(x,p),_=x/Math.hypot(x,p),v=-(_*g),A=_*x-y*p,S=y*g,w=(B,U)=>{let z=-1/0,F=1/0,J=-1/0,$=1/0;for(let ct=0;ct<h;ct++){let ht=i[2*ct]-c,Mt=i[2*ct+1]-l,j=ht*x+Mt*p+B;if(j<=1)return!1;let Y=ht*y+Mt*_,Z=ht*v+Mt*S,et=o*r*j,mt=a*s*j;z=Math.max(z,Y-et),F=Math.min(F,Y+et),J=Math.max(J,Z-mt),$=Math.min($,Z+mt)}return z>F||J>$?!1:(U&&(U.a=(z+F)/2,U.b=(J+$)/2),!0)},E=10,b=2e4;if(!w(b))continue;for(let B=0;B<48;B++){let U=(E+b)/2;w(U)?b=U:E=U}if(f&&b>=f.distance)continue;let M={a:0,b:0};w(b,M);let R=c+M.a*y+M.b*v-b*x,N=M.b*A-b*g,L=l+M.a*_+M.b*S-b*p,C=-N/g;f={distance:b,heading:d,pos:[R,N,L],tgt:[R+C*x,0,L+C*p]}}return f}function Hh(i){let t={p:new D,f:new D(1,0,0),r:new D(0,0,1)},e=new D;return t.update=n=>(e.copy(i.sample(n-Ud).p),t.f.copy(i.sample(n+Ud).p).sub(e).setY(0).normalize(),t.p.copy(i.sample(n).p),t.r.set(-t.f.z,0,t.f.x),t),t}function kd(i,t){let e=i.length,n=[new Float64Array(e),new Float64Array(e),new Float64Array(e)],s=[new Float64Array(e),new Float64Array(e),new Float64Array(e)],r=Float64Array.from(t,c=>c?1:0),o={world:n.map(()=>new Float64Array(e)),car:s.map(()=>new Float64Array(e))},a=Float64Array.from(r,(c,l)=>Wn(i,r,l));return{world:n,car:s,weight:r,weightSlopes:a,slopes:o,build(c,l){for(let h=0;h<3;h++){for(let u=0;u<e;u++)n[h][u]=c[u][h],s[h][u]=l[u][h];for(let u=0;u<e;u++)o.world[h][u]=Wn(i,n[h],u),o.car[h][u]=Wn(i,s[h],u)}}}}function Hd(i,t,e,{circuit:n=null,carBox:s=null,frameAt:r=null,clearanceAt:o=null}={}){let a=t.length,c=t.map(H=>H.u),l=n?ZM(n):null,h={pos:kd(c,t.map(H=>!!H.pos.rel)),tgt:kd(c,t.map(H=>!!H.tgt.rel))},u={values:new Float64Array(a),slopes:new Float64Array(a)},f=t.map(H=>H.aerial?0:1),d={values:f,slopes:f.map((H,k)=>Wn(c,f,k))},m=new D,x=new D,g=new D(...wd),p=new D,y=new D,_=new D,v=new D,A=s?JM(s):null,S=new Float64Array(A?2*A.length/3:0),w=[0,0,0,0],E=null,b=Math.tan(Oh*fn/2),M={aspect:NaN,panel:[NaN,NaN,NaN,NaN],open:[NaN,NaN,NaN,NaN],windows:null,fade:NaN},R=new Float64Array(a).fill(1),N=t.map(()=>({wanted:1,angle:0,fov:0,eye:null,look:null})),L=()=>({values:new Float64Array(Te),slopes:new Float64Array(Te),raw:new Float64Array(Te),spread:new Float64Array(Te)}),C={aim:L(),widen:L(),back:L()},B=[C.aim,C.widen,C.back],U={keyTan:0,subject:0,fade:0,aim:0,widen:0,back:0},z=Float64Array.from(hr,H=>Nt(Wt(d.values,d.slopes,It(H),H),0,1)),F={x0:0,y0:0,x1:0,y1:0,distance:0},J=[0,0,0,0],$=new D,ct=new Float64Array(Te),ht=new Float64Array(Te),Mt={floor:new Float64Array(Te),clearTo:new Float64Array(Te),blockedFrom:new Float64Array(Te)},j=new Float64Array(Te),Y=new D,Z=new D,et=new D,mt=new D,Rt=new D,Ut=new D,Xt=()=>({p:new D,f:new D,r:new D}),it=Xt(),lt=Array.from({length:HM},Xt),O=(H,k)=>(k.p.copy(H.p),k.f.copy(H.f),k.r.copy(H.r),k),Ct=r?new Float64Array(9*Te):null,dt=!1,St=Xt();function rt(H){if(!Ct)return e;if(!dt){for(let k=0;k<Te;k++){let V=r(hr[k]);V.p.toArray(Ct,9*k),V.f.toArray(Ct,9*k+3),V.r.toArray(Ct,9*k+6)}dt=!0}return St.p.fromArray(Ct,9*H),St.f.fromArray(Ct,9*H+3),St.r.fromArray(Ct,9*H+6),St}function xt(H,k,V,Q,st,pt){p.subVectors(V,k).normalize(),y.crossVectors(p,lr).normalize(),_.crossVectors(y,p);let Et=0;for(let Ht=0;Ht<A.length;Ht+=3){v.copy(H.p).addScaledVector(H.f,A[Ht]).addScaledVector(lr,A[Ht+1]).addScaledVector(H.r,A[Ht+2]).sub(k);let Tt=v.dot(p);if(Tt<.2)return 0;S[Et++]=Math.abs(v.dot(y))/(Tt*Q*st*Na),S[Et++]=Math.abs(v.dot(_))/(Tt*pt*Na)}let Vt=0;for(let Ht=0;Ht<Et;Ht++)Vt=Math.max(Vt,S[Ht]);let Ft=0;for(let Ht=0;Ht<Et;Ht++)Ft+=Math.exp(Qn*(S[Ht]/Vt-1));return Vt*(1+Math.log(Ft)/Qn)}function ut(H,k,V){p.subVectors(V,k);let Q=p.length();p.divideScalar(Q),y.crossVectors(p,lr).normalize(),_.crossVectors(y,p),F.x0=F.y0=1/0,F.x1=F.y1=-1/0,F.distance=Q;for(let st=0;st<A.length;st+=3){v.copy(H.p).addScaledVector(H.f,A[st]).addScaledVector(lr,A[st+1]).addScaledVector(H.r,A[st+2]).sub(k);let pt=v.dot(p);if(pt<.2)return!1;let Et=v.dot(y)/pt,Vt=v.dot(_)/pt;F.x0=Math.min(F.x0,Et),F.x1=Math.max(F.x1,Et),F.y0=Math.min(F.y0,Vt),F.y1=Math.max(F.y1,Vt)}return!0}function I(H,k,V,Q,st){p.subVectors(V,k);let pt=p.length();p.divideScalar(pt),y.crossVectors(p,lr).normalize(),_.crossVectors(y,p);let Et=0,Vt=-1/0,Ft=1/0,Ht=-1/0,Tt=1/0;for(let le=0;le<A.length;le+=3){v.copy(H.p).addScaledVector(H.f,A[le]).addScaledVector(lr,A[le+1]).addScaledVector(H.r,A[le+2]).sub(k);let ue=v.dot(p);if(ue<.2)return!1;let me=v.dot(y)/(ue*Q),he=v.dot(_)/(ue*st);S[Et++]=me,S[Et++]=he,Vt=Math.max(Vt,me),Ft=Math.min(Ft,me),Ht=Math.max(Ht,he),Tt=Math.min(Tt,he)}let ae=0,_t=0,jt=0,te=0;for(let le=0;le<Et;le+=2)ae+=Math.exp(Qn*(S[le]-Vt)),_t+=Math.exp(Qn*(Ft-S[le])),jt+=Math.exp(Qn*(S[le+1]-Ht)),te+=Math.exp(Qn*(Tt-S[le+1]));F.x1=Vt+Math.log(ae)/Qn,F.x0=Ft-Math.log(_t)/Qn,F.y1=Ht+Math.log(jt)/Qn,F.y0=Tt-Math.log(te)/Qn,F.distance=pt;let pe=(F.x0+F.x1)/2*Q*pt,ke=(F.y0+F.y1)/2*st*pt;return $.copy(y).multiplyScalar(pe).addScaledVector(_,ke),!0}function T(H,k,V){if(!ut(H,k,V))return;let Q=F.distance;V.addScaledVector(y,(F.x0+F.x1)/2*Q).addScaledVector(_,(F.y0+F.y1)/2*Q)}function W(H,k,V,Q){if(H.abs)return H.abs.slice();if(H.rel){let[Et,Vt,Ft]=H.rel;return[Q.p.x+Q.f.x*Et+Q.r.x*Ft,Q.p.y+Vt,Q.p.z+Q.f.z*Et+Q.r.z*Ft]}let st=E.tgt;if(V==="tgt")return st.slice();let pt=t[k].scale||1;return E.pos.map((Et,Vt)=>st[Vt]+(Et-st[Vt])*pt)}function nt(H,k){let V=H[0]-k.p.x,Q=H[2]-k.p.z;return[V*k.f.x+Q*k.f.z,H[1]-k.p.y,V*k.r.x+Q*k.r.z]}function ot(H,k,V,Q,st,pt,Et,Vt,Ft){let Ht=pt[2]-pt[0],Tt=pt[3]-pt[1],ae=ue=>{let me=o(ue,V);if(!Vt)return me;let he=ue.x-H.p.x,Je=ue.z-H.p.z,Re=he*H.f.x+Je*H.f.z,Rn=he*H.r.x+Je*H.r.z,tn=ue.y-H.p.y,P=V.x-H.p.x,q=V.z-H.p.z,K=P*H.f.x+q*H.f.z,tt=P*H.r.x+q*H.r.z;for(let G of Vt)Z.set(G.p.x+G.f.x*Re+G.r.x*Rn,G.p.y+tn,G.p.z+G.f.z*Re+G.r.z*Rn),et.set(G.p.x+G.f.x*K+G.r.x*tt,G.p.y+V.y-H.p.y,G.p.z+G.f.z*K+G.r.z*tt),me=Math.min(me,o(Z,et)-GM);return me},_t=k.x-V.x,jt=k.z-V.z,te=Math.hypot(_t,jt),pe=ue=>k.y+(ue-1)*te*Rd,ke=o?Math.min(Ld,ae(k)):0,le=null;for(let ue of o?WM:[0]){let me=Math.cos(ue*fn),he=Math.sin(ue*fn),Je=(_t*me-jt*he)/te,Re=(_t*he+jt*me)/te,Rn=K=>{Y.set(V.x+Je*te*K,pe(K),V.z+Re*te*K);let tt=xt(H,Y,V,st,Ht,Tt);return tt>0&&tt<=Q},tn=1;if(Y.set(V.x+Je*te,pe(1),V.z+Re*te),xt(H,Y,V,st,Ht,Tt)>Q){let K=1;if(tn=Et,Rn(Et))for(;tn-K>BM*K;){let tt=(K+tn)/2;Rn(tt)?tn=tt:K=tt}}let P=1;if(o){if(Y.set(V.x+Je*te,k.y,V.z+Re*te),ue!==0&&ae(Y)<ke)continue;for(;P<tn;){Y.set(V.x+Je*te*P,pe(P),V.z+Re*te*P);let K=ae(Y)-ke;if(K<0){P=Math.max(1,P-Pd/te);break}P=Math.min(tn,P+Math.max(Pd,K)/te)}}else P=tn;let q=tn/P;if((!le||q<le.shortfall-1e-6)&&(le={angle:ue,scale:P,wanted:tn,shortfall:q,ux:Je,uz:Re}),q<=1+1e-6)break}return Ft.set(V.x+le.ux*te*le.scale,pe(le.scale),V.z+le.uz*te*le.scale),ot.angle=le.angle,ot.wanted=le.wanted,le.scale}function at(H,k,V,Q,st){if(H===M.aspect&&Q===M.windows&&st===M.fade&&Bd(k,M.panel)&&Bd(V,M.open))return;M.aspect=H,M.windows=Q,M.fade=st;for(let _t=0;_t<4;_t++)M.panel[_t]=k[_t],M.open[_t]=V[_t];b=Vh(Oh,H);let pt=t.find(_t=>_t.pos.fit),Et=pt?2*Math.atan(Vh(pt.fov,H))/fn:40;E=l?KM(l,H,V,Et):null,E||(E={pos:[0,700,600],tgt:[0,0,0],heading:0});let Vt={pos:[],tgt:[]},Ft={pos:[],tgt:[]},Ht=new D,Tt=new D,ae=[0,0,0,0];for(let _t=0;_t<a;_t++){let jt=O(r?r(c[_t]):e,it),te=W(t[_t].pos,_t,"pos",jt),pe=W(t[_t].tgt,_t,"tgt",jt),ke=Vh(t[_t].fov,H);if(R[_t]=1,N[_t].wanted=1,N[_t].angle=0,A&&!t[_t].aerial){let le=Oa(c[_t],Q,st);for(let Re=0;Re<4;Re++)ae[Re]=Gn(V[Re],k[Re],le);Ht.fromArray(te),Tt.fromArray(pe);let ue=!!t[_t].pos.rel,me=null;if(ue&&r&&o){let Re=_t>0?(c[_t-1]+c[_t])/2:c[_t],Rn=_t<a-1?(c[_t]+c[_t+1])/2:c[_t];me=lt.map((tn,P)=>O(r(Re+(Rn-Re)*P/(lt.length-1)),tn))}let he=ue?OM:FM;for(let Re=0;Re<Dd;Re++)Ht.fromArray(te),R[_t]=ot(jt,Ht,Tt,ke,H,ae,he,me,Ht),Re<Dd-1&&T(jt,Ht,Tt);N[_t].wanted=ot.wanted,N[_t].angle=ot.angle,te[0]=Ht.x,te[1]=Ht.y,te[2]=Ht.z,pe[0]=Tt.x,pe[1]=Tt.y,pe[2]=Tt.z;let Je=xt(jt,Ht,Tt,H,ae[2]-ae[0],ae[3]-ae[1]);ke=Math.min(XM,Math.max(ke,Je))}u.values[_t]=ke,N[_t].fov=2*Math.atan(ke)/fn,N[_t].eye=te,N[_t].look=pe,Vt.pos.push(te),Vt.tgt.push(pe),Ft.pos.push(nt(te,jt)),Ft.tgt.push(nt(pe,jt))}for(let _t=0;_t<a;_t++)u.slopes[_t]=Wn(c,u.values,_t);h.pos.build(Vt.pos,Ft.pos),h.tgt.build(Vt.tgt,Ft.tgt),Bt(H,k,V,Q,st)}function Bt(H,k,V,Q,st){for(let ae of B)ae.values.fill(0),ae.slopes.fill(0),ae.raw.fill(0);if(Mt.floor.fill(NaN),Mt.clearTo.fill(0),Mt.blockedFrom.fill(1/0),!A)return;let pt=Td*fn/2,Et=(Td+UM)*fn/2,Vt=C.aim.raw,Ft=C.widen.raw,Ht=C.widen.values,Tt=C.back.raw;for(let ae=0;ae<Cd+VM;ae++){let _t=ae>=Cd;for(let jt=0;jt<Te;jt++){let te=hr[jt],pe=rt(jt),ke=Lt(te,pe,mt,Rt);if(U.subject<1)continue;let le=Oa(te,Q,st);for(let G=0;G<4;G++)J[G]=Gn(V[G],k[G],le);let ue=J[2]-J[0],me=J[3]-J[1],he=U.keyTan,Je=Math.atan(he);if(_t){let G=Math.atan(xt(pe,mt,Rt,H,ue,me))-Je,vt=Math.atan(Math.tan(Je+G)*(Na/DM))-Je,Dt=Math.max(Math.min(G,pt),vt)-Ht[jt];Dt>0&&(Ft[jt]=Math.min(Et,Ft[jt]+Dt));continue}if(!I(pe,mt,Rt,ue*H*he,me*he))continue;let Re=Na*ke/he,Rn=(F.x0+F.x1)/2,tn=(F.y0+F.y1)/2,P=Nt(Math.max(Math.abs(Rn)>1e-9?zd(F.x0,F.x1,Re)/Rn:0,Math.abs(tn)>1e-9?zd(F.y0,F.y1,Re)/tn:0),0,1);Vt[jt]=Math.max(Vt[jt],U.aim+P*(1-U.aim)),Rt.addScaledVector($,P);let q=xt(pe,mt,Rt,H,ue,me);if(!(q>ke))continue;let K=Math.min(pt,Math.atan(q)-Je);Ft[jt]=Math.max(Ft[jt],K);let tt=q/Math.tan(Je+K);if(tt>1){let G=Math.min(kM,(1+U.back)*tt*zM-1);Tt[jt]=Math.max(Tt[jt],G)}}wt(C.widen),!_t&&(wt(C.aim),wt(C.back),o&&gt(C.back))}}function At(H,k,V,Q){let st=Nt(H,0,1),pt=It(st);return Kt(h.pos,pt,st,V,k),Kt(h.tgt,pt,st,Q,k),U.keyTan=Wt(u.values,u.slopes,pt,st),U.subject=Nt(Wt(d.values,d.slopes,pt,st),0,1),U.keyTan}function Lt(H,k,V,Q){let st=At(H,k,V,Q);U.back=U.aim=U.widen=0;let pt=A?U.subject:0;if(U.fade=pt,pt<=0)return st;let Et=Nt(H,0,1),Vt=pt*Yt(C.back,Et);Vt>0&&ne(V,Q,Vt),U.back=Vt;let Ft=pt*Yt(C.aim,Et);if(Ft>0){let Tt=Oa(Et,M.windows,M.fade),{open:ae,panel:_t}=M,jt=Gn(ae[2],_t[2],Tt)-Gn(ae[0],_t[0],Tt),te=Gn(ae[3],_t[3],Tt)-Gn(ae[1],_t[1],Tt);I(k,V,Q,jt*M.aspect*st,te*st)&&(Q.addScaledVector($,Ft),U.aim=Ft)}let Ht=pt*Yt(C.widen,Et);return U.widen=Ht,Ht>0?Math.tan(Math.atan(st)+Ht):st}function ne(H,k,V){let Q=Math.hypot(H.x-k.x,H.z-k.z);return H.x=k.x+(H.x-k.x)*(1+V),H.z=k.z+(H.z-k.z)*(1+V),H.y+=V*Q*Rd,H}function gt(H){let{values:k,slopes:V,spread:Q}=H,st=ht,{floor:pt,clearTo:Et,blockedFrom:Vt}=Mt,Ft=!1;for(let Tt=0;Tt<Te;Tt++){st[Tt]=1/0;let ae=z[Tt],_t=k[Tt]*ae;if(!(_t>1e-4)||_t<=Et[Tt])continue;let jt=hr[Tt];At(jt,rt(Tt),mt,Rt),Number.isNaN(pt[Tt])&&(pt[Tt]=Math.min(Ld,o(mt,Rt)));let te=pe=>o(ne(Ut.copy(mt),Rt,pe),Rt)>=pt[Tt];if(_t<Vt[Tt]){if(te(_t)){Et[Tt]=_t;continue}Vt[Tt]=_t}for(;Vt[Tt]-Et[Tt]>_t/256;){let pe=(Et[Tt]+Vt[Tt])/2;te(pe)?Et[Tt]=pe:Vt[Tt]=pe}st[Tt]=Math.min(_t,Et[Tt])/ae,Ft=!0}if(!Ft)return;let Ht=ct;Ht.fill(1/0);for(let Tt=0;Tt<=Id;Tt++){let ae=!1;for(let _t=0;_t<Te;_t++){if(st[_t]===1/0)continue;let jt=Math.max(0,_t-ro),te=Math.min(Te-1,_t+ro),pe=0,ke=0,le=0;for(let me=jt;me<=te;me++){let he=kh[Math.abs(me-_t)];pe+=he*Math.min(Q[me],Ht[me]),ke+=he,le+=he*he}let ue=pe/ke;if(ue>st[_t]+1e-9)if(ae=!0,Tt<Id){let me=(ue-st[_t])*ke/le;for(let he=jt;he<=te;he++)Ht[he]=Math.max(0,Math.min(Q[he],Ht[he])-me*kh[Math.abs(he-_t)])}else{let me=st[_t]/ue;for(let he=jt;he<=te;he++)Ht[he]=Math.min(Q[he],Ht[he])*me}}if(!ae)break}for(let Tt=0;Tt<Te;Tt++)k[Tt]=Math.min(Q[Tt],Ht[Tt]);kt(k);for(let Tt=0;Tt<Te;Tt++)V[Tt]=Wn(hr,k,Tt)}function wt(H){let{values:k,slopes:V,raw:Q,spread:st}=H;for(let pt=0;pt<Te;pt++){let Et=0,Vt=Math.min(Te-1,pt+Nd);for(let Ft=Math.max(0,pt-Nd);Ft<=Vt;Ft++)Et=Math.max(Et,Q[Ft]);st[pt]=Et}k.set(st),kt(k);for(let pt=0;pt<Te;pt++)V[pt]=Wn(hr,k,pt)}function kt(H){j.set(H);for(let k=0;k<Te;k++){let V=0,Q=0,st=Math.min(Te-1,k+ro);for(let pt=Math.max(0,k-ro);pt<=st;pt++){let Et=kh[Math.abs(pt-k)];V+=j[pt]*Et,Q+=Et}H[k]=V/Q}}function Yt(H,k){let V=Nt(k,0,1),Q=Math.min(Te-2,Math.floor(V*(Te-1))),st=1/(Te-1),{values:pt,slopes:Et}=H;return cr(Q*st,(Q+1)*st,pt[Q],pt[Q+1],Et[Q],Et[Q+1],V)}function It(H){let k=Nt(H,0,1),V=0;for(;V<a-2&&k>c[V+1];)V++;return V}function Wt(H,k,V,Q){return cr(c[V],c[V+1],H[V],H[V+1],k[V],k[V+1],Q)}function Kt(H,k,V,Q,st){let pt=Wt(H.world[0],H.slopes.world[0],k,V),Et=Wt(H.world[1],H.slopes.world[1],k,V),Vt=Wt(H.world[2],H.slopes.world[2],k,V),Ft=Nt(Wt(H.weight,H.weightSlopes,k,V),0,1);if(Ft===0)return Q.set(pt,Et,Vt);let Ht=Wt(H.car[0],H.slopes.car[0],k,V),Tt=Wt(H.car[1],H.slopes.car[1],k,V),ae=Wt(H.car[2],H.slopes.car[2],k,V),_t=st.p.x+st.f.x*Ht+st.r.x*ae,jt=st.p.y+Tt,te=st.p.z+st.f.z*Ht+st.r.z*ae;return Q.set(pt+(_t-pt)*Ft,Et+(jt-Et)*Ft,Vt+(te-Vt)*Ft)}function Qt(H,k,V){E||at(i.aspect,Fa,Fa,Bh,zh);let Q=Nt(H,0,1),st=It(Q);return Kt(h.pos,st,Q,k,e),Kt(h.tgt,st,Q,V,e),Qt.car=Nt(Wt(d.values,d.slopes,st,Q),0,1),2*Math.atan(Wt(u.values,u.slopes,st,Q))/fn}Qt.car=1;function X({progress:H,introEase:k,clock:V,debugCam:Q,width:st,height:pt,framing:Et}){let Vt=i.aspect,Ft=Et&&Et.panel||Fa,Ht=Et&&Et.open||Fa,Tt=Et&&Et.windows||Bh,ae=Et&&Et.fade||zh;at(Vt,Ft,Ht,Tt,ae);let _t=Lt(H,e,m,x);Qt.car=U.subject;let jt=Oa(H,Tt,ae);k<1&&(m.lerpVectors(g,m,k),_t=Gn(b,_t,k)),Q&&(m.fromArray(Q.pos),x.fromArray(Q.tgt),_t=Math.tan((Q.fov||40)*fn/2),jt=0),m.y+=Math.sin(V*.23)*.036;for(let ue=0;ue<4;ue++)w[ue]=Gn(Ht[ue],Ft[ue],jt);let te=(w[0]+w[2])/2,pe=(w[1]+w[3])/2;i.position.copy(m),i.lookAt(x),i.fov=2*Math.atan(_t)/fn;let ke=te-.5,le=pe-.5;Math.abs(ke)>1e-6||Math.abs(le)>1e-6?i.setViewOffset(st,pt,-ke*st,-le*pt,st,pt):i.clearViewOffset(),i.updateProjectionMatrix()}return{position:m,target:x,evaluateShots:Qt,update:X,get overhead(){return E},dollies:R,keyInfo:N,fitAt(H){let k=Nt(H,0,1),V=Nt(Wt(d.values,d.slopes,It(k),k),0,1);return{fade:V,aim:V*Yt(C.aim,k),widen:2*V*Yt(C.widen,k)/fn,back:V*Yt(C.back,k)}}}}var jM=.5,QM=.05,tS=400,Nn=20,ur=3200,oo=3*Nn,eS=.25,nS=.3,iS=.1,sS=.25,rS=1.35,oS=.02,He=Math.ceil(2*ur/Nn),Ba=0,Gh=1,Gd=2,Wd=3,ti=i=>Math.min(He-1,Math.max(0,Math.floor((i+ur)/Nn)));function Wh(i){let t=i.attributes.normal;if(i.type!=="BoxGeometry"||!t)return!1;for(let e=0;e<t.count;e++){let n=Math.abs(t.getX(e)),s=Math.abs(t.getY(e)),r=Math.abs(t.getZ(e));if(n+s+r>Math.max(n,s,r)+1e-6)return!1}return!0}function Yd(i){let t=i.geometry,e=t.attributes.position,n=i.matrixWorld.elements,s=new Float64Array(e.count*3),r=!e.isInterleavedBufferAttribute&&!e.normalized,o=e.array,a=e.itemSize;for(let h=0,u=0;h<e.count;h++,u+=3){let f=r?o[h*a]:e.getX(h),d=r?o[h*a+1]:e.getY(h),m=r?o[h*a+2]:e.getZ(h);s[u]=n[0]*f+n[4]*d+n[8]*m+n[12],s[u+1]=n[1]*f+n[5]*d+n[9]*m+n[13],s[u+2]=n[2]*f+n[6]*d+n[10]*m+n[14]}let c=t.index?t.index.array:null,l=c?t.index.count:e.count;return[s,c,l-l%3]}function aS(i,t){let e=i.matrixWorld.clone();for(let n of t.chain)e.multiply(n);return{geometry:{boundingBox:t.box},matrixWorld:e,axisBox:t.axisBox,triangles(){let n=i.geometry,s=t.vertexStart,r=n.attributes.position.array,o=new Ne(r.subarray(3*s,3*(s+t.vertexCount)),3),a=null;if(n.index){let c=new Uint32Array(t.indexCount),l=n.index.array;for(let h=0;h<t.indexCount;h++)c[h]=l[t.indexStart+h]-s;a=new Ne(c,1)}return{geometry:{attributes:{position:o},index:a},matrixWorld:i.matrixWorld}}}}function cS(i,t){let[e,n,s]=Yd(i),r=new Map,o=t.length;for(let a=0;a<s;a+=3){let c=1/0,l=1/0,h=1/0,u=-1/0,f=-1/0,d=-1/0;for(let m=0;m<3;m++){let x=3*(n?n[a+m]:a+m),g=e[x],p=e[x+1],y=e[x+2];c=Math.min(c,g),u=Math.max(u,g),l=Math.min(l,p),f=Math.max(f,p),h=Math.min(h,y),d=Math.max(d,y)}for(let m=ti(h);m<=ti(d);m++)for(let x=ti(c);x<=ti(u);x++){let g=x*Nn-ur,p=m*Nn-ur,y=m*He+x,_=r.get(y);_===void 0&&(_=t.length,r.set(y,_),t.push(1/0,1/0,1/0,-1/0,-1/0,-1/0)),t[_]=Math.min(t[_],x>0?Math.max(c,g):c),t[_+1]=Math.min(t[_+1],l),t[_+2]=Math.min(t[_+2],m>0?Math.max(h,p):h),t[_+3]=Math.max(t[_+3],x<He-1?Math.min(u,g+Nn):u),t[_+4]=Math.max(t[_+4],f),t[_+5]=Math.max(t[_+5],m<He-1?Math.min(d,p+Nn):d)}}return(t.length-o)/6}function Xd(i){let t=i.elements;return Math.abs(t[1])+Math.abs(t[2])+Math.abs(t[4])+Math.abs(t[6])+Math.abs(t[8])+Math.abs(t[9])<1e-9}function lS(i,t,e){let n=Math.abs(i),s=Math.abs(t),r=Math.abs(e),o=0;if(n>o&&(o=n),s>o&&(o=s),r>o&&(o=r),o===1/0)return 1/0;if(n!==n||s!==s||r!==r)return NaN;if(o===0)return 0;let a=0,c=0,l=n/o,h=l*l-c,u=a+h;return c=u-a-h,a=u,l=s/o,h=l*l-c,u=a+h,c=u-a-h,a=u,l=r/o,h=l*l-c,u=a+h,Math.sqrt(u)*o}function hS(i,t,e,n){let s=t[0],r=t[1],o=t[2],a=e[n],c=e[n+1],l=e[n+2],h=e[n+3],u=e[n+4],f=e[n+5],d=e[n+6],m=e[n+7],x=e[n+8],g=h-a,p=u-c,y=f-l,_=d-a,v=m-c,A=x-l,S=s-a,w=r-c,E=o-l,b=g*S+p*w+y*E,M=_*S+v*w+A*E,R,N,L;if(b<=0&&M<=0)R=a,N=c,L=l;else{let C=s-h,B=r-u,U=o-f,z=g*C+p*B+y*U,F=_*C+v*B+A*U,J=s-d,$=r-m,ct=o-x,ht=g*J+p*$+y*ct,Mt=_*J+v*$+A*ct,j=z*Mt-ht*F,Y=ht*M-b*Mt,Z=b*F-z*M;if(z>=0&&F<=z)R=h,N=u,L=f;else if(Mt>=0&&ht<=Mt)R=d,N=m,L=x;else if(Z<=0&&b>=0&&z<=0){let et=b/(b-z);R=a+et*g,N=c+et*p,L=l+et*y}else if(Y<=0&&M>=0&&Mt<=0){let et=M/(M-Mt);R=a+et*_,N=c+et*v,L=l+et*A}else if(j<=0&&F-z>=0&&ht-Mt>=0){let et=(F-z)/(F-z+(ht-Mt));R=h+et*(d-h),N=u+et*(m-u),L=f+et*(x-f)}else{let et=1/(j+Y+Z),mt=Y*et,Rt=Z*et;R=a+g*mt+_*Rt,N=c+p*mt+v*Rt,L=l+y*mt+A*Rt}}i[0]=lS(s-R,r-N,o-L)}function qd(i){let t=new Float32Array(He*He).fill(-1/0),e=new Int32Array(He*He+1),n=new Int32Array(0),s=new Uint8Array(0),r=new Int32Array(0),o=new Float32Array(0),a=[],c=[],l=new D,h=new Float64Array(3),u=new Float64Array(1),f=new Float64Array(1),d=8e3,m=new D,x=new D,g=new D;function p(A,{sky:S,movers:w=[]}){A.updateMatrixWorld(!0),S.geometry.boundingSphere||S.geometry.computeBoundingSphere(),d=S.geometry.boundingSphere.radius,S.getWorldPosition(l);let E=new xn,b=new D,M=new D;for(let Y of w){E.setFromObject(Y,!0),Y.getWorldPosition(M);let Z=0;for(let et=0;et<8;et++)b.set(et&1?E.max.x:E.min.x,et&2?E.max.y:E.min.y,et&4?E.max.z:E.min.z),Z=Math.max(Z,b.distanceTo(M));a.push({object:Y,radius:Z*(1+iS)+sS})}let R=[],N=[],L=0,C=0,B=new Set([S,...w]),U=Y=>{let Z=Y.geometry;if(Z.boundingBox||Z.computeBoundingBox(),E.copy(Z.boundingBox).applyMatrix4(Y.matrixWorld),Y.isInstancedMesh)R.push(Y,Wd),L+=Y.count,C+=6*Y.count;else if(E.max.x-E.min.x<=oo&&E.max.z-E.min.z<=oo)R.push(Y,Ba),L++,C+=6;else{let et=Y.triangles?Y.triangles():Y;if(E.max.y-E.min.y<=eS){let mt=cS(et,N);L+=mt,C+=6*mt}else{let mt=Math.floor((et.geometry.index?et.geometry.index.count:et.geometry.attributes.position.count)/3);R.push(et,Gh),L+=mt,C+=9*mt}}},z=Y=>{if(!B.has(Y)){if(Y.isSprite)c.push(Y);else if(Y.isMesh){let Z=Y.userData.indexParts;if(Z)for(let et of Z)U(aS(Y,et));else U(Y)}for(let Z of Y.children)z(Z)}};z(A),s=new Uint8Array(L),r=new Int32Array(L),o=new Float32Array(C);let F=new Float32Array(L*5),J=0,$=0,ct=(Y,Z,et,mt,Rt,Ut,Xt,it)=>{s[J]=Xt,r[J]=$,o[$++]=Y-it,o[$++]=Z-it,o[$++]=et-it,o[$++]=mt+it,o[$++]=Rt+it,o[$++]=Ut+it;let lt=J*5;F[lt]=Y-it,F[lt+1]=et-it,F[lt+2]=mt+it,F[lt+3]=Ut+it,F[lt+4]=Rt+it,J++},ht=(Y,Z,et)=>{let mt=(Y.min.x+Y.max.x)/2,Rt=(Y.min.y+Y.max.y)/2,Ut=(Y.min.z+Y.max.z)/2,Xt=(Y.max.x-Y.min.x)/2,it=(Y.max.y-Y.min.y)/2,lt=(Y.max.z-Y.min.z)/2,O=Z[0]*mt+Z[4]*Rt+Z[8]*Ut+Z[12],Ct=Z[1]*mt+Z[5]*Rt+Z[9]*Ut+Z[13],dt=Z[2]*mt+Z[6]*Rt+Z[10]*Ut+Z[14],St=Math.abs(Z[0])*Xt+Math.abs(Z[4])*it+Math.abs(Z[8])*lt,rt=Math.abs(Z[1])*Xt+Math.abs(Z[5])*it+Math.abs(Z[9])*lt,xt=Math.abs(Z[2])*Xt+Math.abs(Z[6])*it+Math.abs(Z[10])*lt;ct(O-St,Ct-rt,dt-xt,O+St,Ct+rt,dt+xt,et?Gd:Ba,et?0:nS)};for(let Y=0;Y<N.length;Y+=6)ct(N[Y],N[Y+1],N[Y+2],N[Y+3],N[Y+4],N[Y+5],Ba,0);let Mt=new Gt;for(let Y=0;Y<R.length;Y+=2){let Z=R[Y],et=R[Y+1],mt=Z.geometry,Rt=Z.axisBox??Wh(mt);if(et===Ba)ht(mt.boundingBox,Z.matrixWorld.elements,Rt&&Xd(Z.matrixWorld));else if(et===Wd)for(let Ut=0;Ut<Z.count;Ut++)Z.getMatrixAt(Ut,Mt),Mt.premultiply(Z.matrixWorld),ht(mt.boundingBox,Mt.elements,Rt&&Xd(Mt));else{let[Ut,Xt,it]=Yd(Z);for(let lt=0;lt<it;lt+=3){s[J]=Gh,r[J]=$;let O=1/0,Ct=1/0,dt=-1/0,St=-1/0,rt=-1/0;for(let ut=0;ut<3;ut++){let I=3*(Xt?Xt[lt+ut]:lt+ut),T=Ut[I],W=Ut[I+1],nt=Ut[I+2];o[$++]=T,o[$++]=W,o[$++]=nt,T<O&&(O=T),T>dt&&(dt=T),W>St&&(St=W),nt<Ct&&(Ct=nt),nt>rt&&(rt=nt)}let xt=J*5;F[xt]=O,F[xt+1]=Ct,F[xt+2]=dt,F[xt+3]=rt,F[xt+4]=St,J++}}}let j=new Int32Array(He*He);for(let Y=0;Y<2;Y++){if(Y===1){e=new Int32Array(He*He+1);for(let Z=0;Z<He*He;Z++)e[Z+1]=e[Z]+j[Z];n=new Int32Array(e[He*He]),j.set(e.subarray(0,He*He))}for(let Z=0;Z<L;Z++){let et=Z*5,mt=ti(F[et]),Rt=ti(F[et+1]),Ut=ti(F[et+2]),Xt=ti(F[et+3]);for(let it=Rt;it<=Xt;it++)for(let lt=mt;lt<=Ut;lt++){let O=it*He+lt;Y===0?(j[O]++,F[et+4]>t[O]&&(t[O]=F[et+4])):n[j[O]++]=Z}}}}function y(A){let S=h[0],w=h[1],E=h[2],b=u[0];for(let M=e[A];M<e[A+1];M++){let R=n[M],N=r[R],L=o,C;if(s[R]!==Gh){let B=Math.max(L[N]-S,0,S-L[N+3]),U=Math.max(L[N+1]-w,0,w-L[N+4]),z=Math.max(L[N+2]-E,0,E-L[N+5]);C=Math.sqrt(B*B+U*U+z*z),C===0&&s[R]===Gd&&(C=Math.min(S-L[N],L[N+3]-S,w-L[N+1],L[N+4]-w,E-L[N+2],L[N+5]-E))}else hS(f,h,L,N),C=f[0];C<b&&(b=C)}u[0]=b}function _(A,S,w){h[0]=A,h[1]=S,h[2]=w,u[0]=1/0;let E=ti(A),b=ti(w);for(let M=0;M<He&&!((M-1)*Nn>=u[0]);M++)for(let R=b-M;R<=b+M;R++){if(R<0||R>=He)continue;let L=R===b-M||R===b+M||M===0?1:2*M;for(let C=E-M;C<=E+M;C+=L){if(C<0||C>=He)continue;let B=R*He+C;if(e[B]===e[B+1])continue;let U=C*Nn-ur,z=R*Nn-ur,F=Math.max(U-A,0,A-U-Nn),J=Math.max(z-w,0,w-z-Nn),$=Math.max(0,S-t[B]);Math.sqrt(F*F+$*$+J*J)<u[0]&&y(B)}}return u[0]}let v={build:p,clearance:0,update(A,S){let w=_(A.x,A.y,A.z);for(let N=0;N<a.length;N++){let{object:L,radius:C}=a[N];L.visible&&(w=Math.min(w,Math.max(0,A.distanceTo(L.position)-C)))}m.subVectors(S,A).normalize(),x.set(-m.z,0,m.x).normalize(),g.crossVectors(x,m);let E=Math.tan(i.fov*Math.PI/360)*rS,b=E*i.aspect;for(let N=0;N<c.length;N++){let L=c[N];if(!L.visible)continue;let C=L.matrixWorld.elements,B=C[12]-A.x,U=C[13]-A.y,z=C[14]-A.z,F=B*m.x+U*m.y+z*m.z;if(!(F>0)||F>=w)continue;let J=.5*Math.hypot(Math.hypot(C[0],C[1],C[2]),Math.hypot(C[4],C[5],C[6])),$=Math.abs(B*x.x+z*x.z)-J,ct=Math.abs(B*g.x+U*g.y+z*g.z)-J;$<F*b&&ct<F*E&&(w=F)}v.clearance=w;let M=Math.min(tS,Math.max(QM,jM*w)),R=A.distanceTo(l)+d*(1+oS);(M!==i.near||R!==i.far)&&(i.near=M,i.far=R,i.updateProjectionMatrix())}};return v}var uS=[[560,206],[470,206],[400,206],[330,206],[290,205],[250,201],[215,196.5],[170,194.4],[80,194.2],[10,194.2],[-28,193.2],[-48,190.4],[-60,189.2],[-74,189.4],[-98,191.6],[-140,194.2],[-220,194.4],[-292,194.6],[-340,197.4],[-392,201.2],[-440,204.6],[-490,205.8]],fS=3,dS=286,pS=3,mS=[[-64,61],[-61,78],[-56,96],[-44,112],[-26,121],[-8,124.5],[14,126],[48,132],[76,146],[86,166],[84,182],[74,189.8],[56,192.4],[34,192.6],[18,192.6],[4,192.6]];function Zd(i){let t=[],e=(r,o)=>t.push(new D(r,0,o));for(let[r,o]of uS)e(r,o);let n=i.length;for(let r=fS;r<=dS;r+=pS){let o=i[r%n];e(o[0],o[1])}for(let[r,o]of mS)e(r,o);let s=new Zr(t,!1,"centripetal",.5);return s.arcLengthDivisions=16e3,s}function Wi(i,t,e){let n=i.getLength(),s=0,r=1e9,o=new D;for(let a=0;a<=4e3;a++){i.getPointAt(a/4e3,o);let c=(o.x-t)**2+(o.z-e)**2;c<r&&(r=c,s=a/4e3)}return s*n}function dn(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new fe,l=0;for(let h=0;h<i.length;++h){let u=i[h],f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,h),l+=d}}if(e){let h=0,u=[];for(let f=0;f<i.length;++f){let d=i[f].index;for(let m=0;m<d.count;++m)u.push(d.getX(m)+h);h+=i[f].attributes.position.count}c.setIndex(u)}for(let h in r){let u=$d(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){let d=[];for(let x=0;x<o[h].length;++x)d.push(o[h][x][f]);let m=$d(d);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(m)}}return c}function $d(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){let h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new Ne(o,e,n),c=0;for(let l=0;l<i.length;++l){let h=i[l];if(h.isInterleavedBufferAttribute){let u=c/e;for(let f=0,d=h.count;f<d;f++)for(let m=0;m<e;m++){let x=h.getComponent(f,m);a.setComponent(f+u,m,x)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}function Jd(i,t=1e-4){t=Math.max(t,Number.EPSILON);let e={},n=i.getIndex(),s=i.getAttribute("position"),r=n?n.count:s.count,o=0,a=Object.keys(i.attributes),c={},l={},h=[],u=["getX","getY","getZ","getW"],f=["setX","setY","setZ","setW"];for(let y=0,_=a.length;y<_;y++){let v=a[y],A=i.attributes[v];c[v]=new A.constructor(new A.array.constructor(A.count*A.itemSize),A.itemSize,A.normalized);let S=i.morphAttributes[v];S&&(l[v]||(l[v]=[]),S.forEach((w,E)=>{let b=new w.array.constructor(w.count*w.itemSize);l[v][E]=new w.constructor(b,w.itemSize,w.normalized)}))}let d=t*.5,m=Math.log10(1/t),x=Math.pow(10,m),g=d*x;for(let y=0;y<r;y++){let _=n?n.getX(y):y,v="";for(let A=0,S=a.length;A<S;A++){let w=a[A],E=i.getAttribute(w),b=E.itemSize;for(let M=0;M<b;M++)v+=`${~~(E[u[M]](_)*x+g)},`}if(v in e)h.push(e[v]);else{for(let A=0,S=a.length;A<S;A++){let w=a[A],E=i.getAttribute(w),b=i.morphAttributes[w],M=E.itemSize,R=c[w],N=l[w];for(let L=0;L<M;L++){let C=u[L],B=f[L];if(R[B](o,E[C](_)),b)for(let U=0,z=b.length;U<z;U++)N[U][B](o,b[U][C](_))}}e[v]=o,h.push(o),o++}}let p=i.clone();for(let y in i.attributes){let _=c[y];if(p.setAttribute(y,new _.constructor(_.array.slice(0,o*_.itemSize),_.itemSize,_.normalized)),y in l)for(let v=0;v<l[y].length;v++){let A=l[y][v];p.morphAttributes[y][v]=new A.constructor(A.array.slice(0,o*A.itemSize),A.itemSize,A.normalized)}}return p.setIndex(h),p}var gS={float32:Float32Array,uint16:Uint16Array,int16:Int16Array,int8:Int8Array};function Kd(i,t,e){let n=gS[t.type];if(!n)throw new Error("ce-mesh/2: unsupported type "+t.type);return new n(i,t.offset,e)}function xS(i){let t=atob(i.trim()),e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e.buffer}async function jd(i,t){let e=i.slice(0,i.lastIndexOf("/")+1),n=await(await fetch(i)).json();if(n.format!=="ce-mesh/2")throw new Error(`${i}: expected ce-mesh/2, got ${n.format}`);let s=await fetch(e+n.buffer),r=n.bufferEncoding==="base64"?xS(await s.text()):await s.arrayBuffer();t&&t({loaded:1,total:2});let o=new fe,a=n.vertexCount;for(let[m,x]of Object.entries(n.attributes)){let g=Kd(r,x,a*x.size);o.setAttribute(m,new Ne(g,x.size,!!x.normalized))}o.setIndex(new Ne(Kd(r,n.index,n.indexCount),1)),n.groups.forEach((m,x)=>o.addGroup(m.start,m.count,x)),o.computeBoundingSphere();let c=new ba,l=async(m,x)=>{let g=await c.loadAsync(e+m);return g.flipY=!1,g.wrapS=g.wrapT=sn,x&&(g.colorSpace=Ie),g},h={...n.textures};n.footprint&&(h.footprint=n.footprint.map);let u=Object.keys(h),f=await Promise.all(u.map(m=>l(h[m],m==="map"))),d=Object.fromEntries(u.map((m,x)=>[m,f[x]]));return d.footprint&&(d.footprint.flipY=!0,d.footprint.wrapS=d.footprint.wrapT=fi),t&&t({loaded:2,total:2}),{geometry:o,groups:n.groups,textures:d,desc:n}}var Qd=.6,yS=.3,_S=.45,vS=1,ep=se.lights_physical_fragment.replace("texture2D( clearcoatMap, vClearcoatMapUv ).x","texture2D( clearcoatMap, vClearcoatMapUv ).z");if(ep===se.lights_physical_fragment)throw new Error("hero car: three.js clearcoat chunk changed; update body-materials.js");function tp(i,t){return i.normalMap=t.normalMap,i.normalScale.set(Qd,-Qd),i}var MS={body(i,t){let e={name:"car-body",map:i.map,roughnessMap:i.ormMap,roughness:1,metalness:0};if(t==="low")return tp(new yt(e),i);let n=new rr({...e,clearcoat:1,clearcoatMap:i.ormMap,clearcoatRoughness:yS,clearcoatRoughnessMap:i.ormMap});return n.onBeforeCompile=s=>{s.fragmentShader=s.fragmentShader.replace("#include <lights_physical_fragment>",ep)},n.customProgramCacheKey=()=>"car-body-clearcoat-b",tp(n,i)},lights(i){return new yt({name:"car-lights",map:i.map,roughness:.18,metalness:0,emissive:new Ot(16777215),emissiveMap:i.map,emissiveIntensity:_S})}};function np(i,t,e){return i.map(n=>{let s=MS[n.name];if(!s)throw new Error("hero car: no material for body group "+n.name);let r=s(t,e);return r.aoMap=t.ormMap,r.aoMapIntensity=vS,r})}var SS=15282981,Yh="#5b6067",bS="#3a3c40",wS="#b0362c",qh=.41,AS=.69,ip=.75;function ka(i,t,e,{data:n=!1,clamp:s=!1}={}){let r=document.createElement("canvas");r.width=i,r.height=t,e(r.getContext("2d"),i,t);let o=new Ln(r);return n||(o.colorSpace=Ie),s||(o.wrapS=sn),o}function za(i){let t=i>>>0;return()=>(t=t*1664525+1013904223>>>0)/4294967296}function ES(i){let{beadIn:n,sideIn:s,treadIn:r,treadOut:o,sideOut:a,beadOut:c}=i,l=d=>(1-d)*128,h=(d,m,x,g,p,y)=>{let _=S=>l(m+(x-m)*S);if(d.fillStyle=y(1),d.fillRect(0,Math.min(_(.06),_(.16)),1024,Math.abs(_(.16)-_(.06))),d.fillRect(0,Math.min(_(.3),_(.33)),1024,Math.max(1,Math.abs(_(.33)-_(.3)))),d.fillRect(0,Math.min(_(.85),_(.88)),1024,Math.max(1,Math.abs(_(.88)-_(.85)))),!g)return;let v=Math.min(_(.42),_(.72)),A=Math.abs(_(.72)-_(.42));for(let S of[.06,.56]){let w=S*1024,E=(S+.3)*1024;for(;w<E;){let b=6+p()*14;p()>.18&&d.fillRect(w,v+A*.1,b,A*(.6+p()*.3)),w+=b+3+(p()>.8?12:0)}}},u=ka(1024,128,d=>{d.fillStyle="#000",d.fillRect(0,0,1024,128);let m=za(7),x=()=>"#fff";h(d,n,s,!1,m,x),h(d,c,a,!0,m,x)},{data:!0});return{color:ka(1024,128,d=>{d.fillStyle="#1c1c1e",d.fillRect(0,0,1024,128);let m=za(11);for(let p=0;p<160;p++){let y=r+(o-r)*m();d.fillStyle=`rgba(70,68,66,${.05+m()*.08})`,d.fillRect(m()*1024,l(y),40+m()*200,1)}let x=za(7),g=p=>()=>`rgba(128,128,130,${p})`;h(d,n,s,!1,x,g(.12)),h(d,c,a,!0,x,g(.16))}),height:u}}function TS(i){return ka(512,512,(t,e)=>{let n=e/2;t.fillStyle="#b4b4b2",t.fillRect(0,0,e,e);let s=za(3);for(let a=0;a<40;a++)t.strokeStyle=`rgba(${s()>.5?"255,255,255":"60,60,60"},${.05+s()*.1})`,t.lineWidth=1,t.beginPath(),t.arc(n,n,n*(i+(1-i)*s()),0,Math.PI*2),t.stroke();t.strokeStyle="rgba(28,28,28,0.9)",t.lineWidth=4;let r=n*(i+.12),o=n*.95;for(let a=0;a<36;a++){let c=a/36*Math.PI*2;t.beginPath();for(let l=0;l<=8;l++){let h=l/8,u=r+(o-r)*h,f=c+h*.35;l?t.lineTo(n+u*Math.cos(f),n+u*Math.sin(f)):t.moveTo(n+u*Math.cos(f),n+u*Math.sin(f))}t.stroke()}},{clamp:!0})}function RS(i){return ka(256,256,(t,e)=>{let n=e/2,s=(c,l,h)=>{t.fillStyle=h,t.beginPath(),t.arc(n,n,l*n,0,Math.PI*2),t.arc(n,n,c*n,0,Math.PI*2,!0),t.fill()};s(.86,1,Yh),s(.4,.86,bS),s(0,.4,Yh),s(.97,1,"#2a2c30");let[r,o,a]=i;t.fillStyle=wS,t.beginPath(),t.arc(n,n,o*n,-a/2,a/2),t.arc(n,n,r*n,a/2,-a/2,!0),t.fill(),t.fillStyle="#9a9fa6",t.beginPath(),t.arc(n,n,.18*n,0,Math.PI*2),t.fill()},{clamp:!0})}function CS(i,t,e){let n=t/2,s=[[e+.01,-n+.018],[e+.026,-n-.004],[i-.09,-n-.012],[i-.035,-n-.006],[i-.008,-n+.02],[i,-n+.055],[i+.002,0],[i,n-.055],[i-.008,n-.02],[i-.035,n+.006],[i-.09,n+.012],[e+.026,n+.004],[e+.01,n-.018]],r=new sr(s.map(([c,l])=>new ft(c,l))).getPoints(40),o=c=>c/(s.length-1),a=new Vi(r,56);return a.rotateX(Math.PI/2),{geometry:a,profileV:{beadIn:o(0),sideIn:o(3),treadIn:o(5),treadOut:o(7),sideOut:o(9),beadOut:o(12)}}}function IS(i,t=10){let e=new Kn;e.absarc(0,0,i,0,Math.PI*2,!1);let n=i*.86,s=i*.32,r=Math.PI*2/t;for(let a=0;a<t;a++){let c=a*r+r*.17,l=(a+1)*r-r*.17,h=new os;h.moveTo(Math.cos(c)*s*1.25,Math.sin(c)*s*1.25),h.absarc(0,0,n,c+.04,l-.04,!1),h.lineTo(Math.cos(l)*s*1.25,Math.sin(l)*s*1.25),h.closePath(),e.holes.push(h)}let o=new Qr(e,{depth:.035,bevelEnabled:!0,bevelThickness:.008,bevelSize:.006,bevelSegments:1,curveSegments:20});return o.translate(0,0,-.035),o}function PS(i,t){let e=-t*.45,n=t/2-.03,s=[new ft(i*.97,e),new ft(i*.99,e+.01),new ft(i*.99,n-.02),new ft(i*1.03,n-.006),new ft(i*1.035,n),new ft(i*1,n+.004)],r=new Vi(s,56);return r.rotateX(Math.PI/2),r}function LS(i,t,e){let n=e/2,s=new to(i,t,64).translate(0,0,n),r=new to(i,t,64).rotateY(Math.PI).translate(0,0,-n),o=new oe(t,t,e,64,1,!0).rotateX(Math.PI/2),a=dn([s,r,o]);return s.dispose(),r.dispose(),o.dispose(),a}function DS(i,t,e,n){let s=new Kn;s.absarc(0,0,t,-e/2,e/2,!1),s.absarc(0,0,i,e/2,-e/2,!0),s.closePath();let r=new Qr(s,{depth:n,bevelEnabled:!0,bevelThickness:.008,bevelSize:.008,bevelSegments:2,curveSegments:16});return r.translate(0,0,-n/2),r}function NS(i,t){return{rubber:new yt({name:"tyre",color:16777215,map:i.color,bumpMap:i.height,bumpScale:2.5,roughness:.9,metalness:0}),rim:new yt({name:"rim",color:Yh,roughness:.36,metalness:1}),barrel:new yt({name:"rim-barrel",color:4079942,roughness:.38,metalness:1,side:Pe}),nut:new yt({name:"wheel-nut",color:12896718,roughness:.22,metalness:1}),disc:new yt({name:"brake-disc",color:9146002,map:TS(.45/.82),roughness:.42,metalness:1}),bell:new yt({name:"disc-bell",color:2960945,roughness:.5,metalness:.6}),caliper:new yt({name:"caliper",color:SS,roughness:.35,metalness:0}),dark:new Be({name:"wheel-backing",color:328966}),well:new yt({name:"wheel-well",color:855310,roughness:.95,metalness:0,side:Pe}),blur:new yt({name:"wheel-blur",map:RS(t),transparent:!0,opacity:0,roughness:.35,metalness:.75,depthWrite:!1})}}function US(i,t,e){return(e?1:-1)*(i/t)}var FS=["FL","FR","RL","RR"],sp=.55;function OS(i,t,e=0){return FS.map(n=>{let s=n[0]==="F",r=n[1]==="L",o=s!==r;return{key:n,front:s,left:r,r:i[n].r,centre:new D(i[n].x,i[n].r+e,(r?-1:1)*t),scale:i[n].r/qh,caliperTurn:new Gt().makeRotationZ(o?sp:Math.PI-sp)}})}var rp=new Oe,op=new Oe,BS=new Oe().setFromAxisAngle(new D(0,1,0),Math.PI),ao=new Oe,Xh=new D,zS=new D(0,1,0),kS=new D(0,0,1);function VS(i,t,e,n,s){rp.setFromAxisAngle(zS,i.front?e:0),ao.copy(rp),i.left&&ao.multiply(BS),Xh.setScalar(i.scale),s.compose(i.centre,ao,Xh),op.setFromAxisAngle(kS,US(t,i.r,i.left)),ao.multiply(op),n.compose(i.centre,ao,Xh)}function ap({layout:i,width:t,centreZ:e,centreY:n=0}){let s=qh*AS,r=t/2,o=s*.985,a=r-.13,c=s*.82,l=c-.06,h=c+.022,{geometry:u,profileV:f}=CS(qh,t,s),d=NS(ES(f),[l/o,h/o,ip]),m=IS(o).translate(0,0,r-.045),x=PS(s,t),g=new oe(.05,.058,.06,6).rotateX(Math.PI/2).translate(0,0,r-.02),p=LS(s*.45,c,.032).translate(0,0,a),y=new oe(s*.45,s*.45,.05,32,1,!1).rotateX(Math.PI/2).translate(0,0,a+.04),_=new xi(s*.99,40).translate(0,0,r-.2),v=DS(l,h,ip,.068).translate(0,0,a-.006),A=new xi(o,48).translate(0,0,r-.028),S=new _e;S.name="wheels";let w=(U,z,F,{rolling:J=!0,castShadow:$=!1,receiveShadow:ct=!1}={})=>{let ht=new $e(z,F,4);return ht.name="wheel-"+U,ht.castShadow=$,ht.receiveShadow=ct,ht.userData.rolling=J,S.add(ht),ht},E=[w("tyre",u,d.rubber,{castShadow:!0,receiveShadow:!0}),w("rim",m,d.rim,{castShadow:!0,receiveShadow:!0}),w("barrel",x,d.barrel),w("nut",g,d.nut),w("disc",p,d.disc),w("bell",y,d.bell),w("backing",_,d.dark)],b=w("caliper",v,d.caliper,{rolling:!1}),M=w("blur",A,d.blur,{rolling:!1});M.renderOrder=3;let R=OS(i,e,n),N=Object.fromEntries(R.map(U=>[U.key,U.r])),L=new Gt,C=new Gt;function B(U,z){for(let F=0;F<4;F++){VS(R[F],U,z,C,L);for(let J of E)J.setMatrixAt(F,C);L.multiply(R[F].caliperTurn),b.setMatrixAt(F,L),M.setMatrixAt(F,L)}for(let F of S.children)F.instanceMatrix.needsUpdate=!0}B(0,0);for(let U of S.children)U.computeBoundingSphere();return{group:S,materials:d,radius:N,wheels:R,update:B}}var HS=.34,GS=.86,$h=.03,Jh=.012,lp=.006,WS=.9,cp=4,XS=14,Zh=.49,YS=.95;async function qS(i,t,e){let{geometry:n,groups:s,textures:r,desc:o}=await jd(i,e),a=new bt(n,np(s,r,t));a.name=o.name,o.positionTransform&&(a.position.fromArray(o.positionTransform.offset),a.scale.setScalar(o.positionTransform.scale)),a.castShadow=a.receiveShadow=!0;let c=new _e;return c.add(a),c.userData.footprint=r.footprint,c.userData.footprintSize=o.footprint.size,c.userData.lowPoints=o.lowPoints||null,c}function ZS(i,t){let e=[];for(let s of["FL","FR","RL","RR"]){let{x:r,y:o,r:a}=i[s],c=s[1]==="R"?1:-1,l=YS-Zh;e.push(new oe(a*1.07,a*1.07,l,40,1,!0,Math.PI*.42,Math.PI*1.16).rotateX(Math.PI/2).translate(r,o,c*(Zh+l/2)));let h=new xi(a*1.07,40,-Math.PI*.08,Math.PI*1.16);e.push(h.translate(r,o,c*Zh))}let n=new bt(dn(e),t);n.name="wheel-wells";for(let s of e)s.dispose();return n}function $S(i,[t,e]){let n=new Be({name:"car-ground-occlusion",color:0,alphaMap:i,transparent:!0,opacity:WS,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4}),s=new bt(new ve(t,e).rotateX(-Math.PI/2),n);return s.name="ground-occlusion",s.position.y=$h+lp,s.renderOrder=1,s.userData.noMask=!0,s}function JS(i){if(!i)return null;let t=new Float64Array(i.length*3);return i.forEach(([e,n,s],r)=>t.set([e,n-Jh,s],r*3)),t}async function hp(i,t,{onProgress:e,quality:n="high"}={}){let s=t.body?i.slice(0,i.lastIndexOf("/")+1)+t.body:i,r=await qS(s,n,e),o=new _e;o.name="hero-car";let a=new _e;a.position.y=$h-Jh,o.add(a),a.add(r);let c=ap({layout:t,width:HS,centreZ:GS}),l=c.materials;c.group.position.y=a.position.y,o.add(c.group),a.add(ZS(t,l.well));let h=$S(r.userData.footprint,r.userData.footprintSize);return o.add(h),{root:o,chassis:a,body:r,wheels:c,lowPoints:JS(r.userData.lowPoints),contacts:c.wheels.map(u=>[u.centre.x,u.centre.z]),pose({dist:u=0,steer:f=0,pitch:d=0,roll:m=0,heave:x=0,speed:g=0,road:p=$h}={}){l.blur.opacity=Math.min(1,Math.max(0,(g-cp)/(XS-cp))),l.blur.visible=l.blur.opacity>.01,c.update(u,f);let y=p-Jh;c.group.position.y=y,a.rotation.set(m,0,d),a.position.y=y+x,h.position.y=p+lp}}}var Kh=.6,up=1.2,KS=.3;function fp(i,t,e,n){i.updateMatrixWorld(!0);let s=[],r=p=>!p.transparent&&p.depthWrite;i.traverse(p=>{if(!p.isMesh||p.isInstancedMesh||!(Array.isArray(p.material)?p.material.every(r):r(p.material)))return;let y=new xn().setFromObject(p);y.max.y-y.min.y<KS&&y.min.y<Kh&&y.max.y>Kh-up&&s.push({node:p,box:y})}),s.sort((p,y)=>y.box.max.y-p.box.max.y);let o=Float64Array.from(new Set(e)).sort(),a=new Float64Array(o.length),c=new Ra;c.far=up;let l=new D(0,-1,0),h=new D,u=new D,f=[],d=new Float64Array(n.length);function m(){let p=-1/0;for(let{node:y,box:_}of s){if(_.max.y<p)break;h.x<_.min.x||h.x>_.max.x||h.z<_.min.z||h.z>_.max.z||(f.length=0,c.intersectObject(y,!1,f),f.length&&(p=Math.max(p,f[0].point.y)))}return Number.isFinite(p)?p:NaN}for(let p=0;p<o.length;p++){let{p:y,t:_}=t.sample(o[p]);u.set(-_.z,0,_.x).normalize(),n.forEach(([S,w],E)=>{h.set(y.x,0,y.z).addScaledVector(_,S).addScaledVector(u,w),h.y=Kh,c.set(h,l),d[E]=m()});let v=Array.from(d).filter(Number.isFinite).sort((S,w)=>S-w),A=v.length>>1;a[p]=v.length?v.length%2?v[A]:(v[A-1]+v[A])/2:NaN}let x=a.findIndex(Number.isFinite);for(let p=0;p<a.length;p++)Number.isFinite(a[p])||(a[p]=x<0?0:a[p?p-1:x]);function g(p){let y=o.length;if(p<=o[0])return a[0];if(p>=o[y-1])return a[y-1];let _=0,v=y-1;for(;v-_>1;){let S=_+v>>1;o[S]<=p?_=S:v=S}let A=(p-o[_])/(o[v]-o[_]);return a[_]+(a[v]-a[_])*A}return{heightAt:g,samples:o,heights:a}}var jS=new D(0,1,0),QS=120,co=2.5,Va=.05,tb=2.563,Xa=.5,eb=1.2,nb=.25,ib=6,dp=85,pp=40,mp=12,gp=15,sb=.0012,rb=.0019,Ha=.016,Ga=.028,ob=4e-4,ab=.0015,cb=7.3,xp=.006,yp=.003,lb=.02,hb=.001,ub=9,fb=7,db=6,pb=12,mb=.001;function vp(i,t){return{intro:0,arrival:Wi(i,330,206),pitBox:Wi(i,-60,189.2),pitExit:Wi(i,-392,201.2),lapStart:Wi(i,t[6][0],t[6][1]),lapEnd:Wi(i,t[96][0],t[96][1]),paddock:Wi(i,-8,124.5),goldenHour:Wi(i,18,192.6)}}function jh(i){return[[0,i.arrival],[.085,i.arrival+4],[.2,i.pitBox],[.315,i.pitBox+.3],[.34,i.pitBox+40],[.425,i.lapStart],[.56,i.lapEnd],[.665,i.paddock],[.79,i.paddock+1.5],[.885,i.goldenHour],[1,i.goldenHour+3]]}function Mp(i){let t=i.map(s=>s[0]),e=i.map(s=>s[1]),n=i.map((s,r)=>Wn(t,e,r));return s=>{let r=Nt(s,0,1),o=0;for(;o<i.length-2&&r>t[o+1];)o++;return cr(t[o],t[o+1],e[o],e[o+1],n[o],n[o+1],r)}}function Sp(i,t,e){return Gn(e.arrival-QS,i,1-Math.pow(1-Nt(t,0,1),3))}function bp(i){let t=i.getLength(),e={p:new D,t:new D},n=new D,s=new D,r=new D,o=(h,u)=>i.getPointAt(Nt(h/t,0,1),u);function a(h,u){let f=Nt(h,Va,t-Va);return o(f-Va,n),o(f+Va,u),u.sub(n).normalize()}function c(h){return o(h,e.p),a(h,e.t),e}function l(h){let u=Nt(h,co,t-co);o(u-co,n),o(u,s),o(u+co,r);let f=Math.atan2(s.z-n.z,s.x-n.x),d=Math.atan2(r.z-s.z,r.x-s.x);return Math.atan2(Math.sin(d-f),Math.cos(d-f))/co}return{length:t,sample:c,curvatureAt:l}}var gb=(i,t,e,n)=>i+(t-i)*(1-Math.exp(-n*e));function Wa(i,t,e,n){let s=i.x-t,r=i.v+e*s,o=Math.exp(-e*n);return i.x=t+(s+r*n)*o,i.v=(i.v-e*r*n)*o,i.x}function _p(i,t,e){let n=e<0?-1:1,s=eb+nb*Math.abs(e);return Nt(-Math.atan(tb*i.curvatureAt(t+n*s)),-Xa,Xa)}function xb(i,t,e,n){if(!i)return 1;let s=1;for(let r=0;r<i.length;r+=3){let o=-(i[r]*t-i[r+2]*e+n);if(o<=0)continue;let a=i[r+1]-lb-hb;s=Math.min(s,a>0?a/o:0)}return s}function wp(i,t,e,{roadHeight:n=null}={}){let s=e,r=!0,o=0,a=0,c=!1,l={x:0,v:0},h={x:0,v:0},u={x:0,v:0},f={x:0,v:0},d=i.lowPoints||null,m={dist:0,steer:0,pitch:0,roll:0,heave:0,speed:0,road:void 0},x={p:new D,f:new D,r:new D};function g(y){c||(o=0),a=o,l.x=_p(t,y,0),l.v=h.x=h.v=u.x=u.v=f.x=f.v=0}let p={get lastDistance(){return s},set lastDistance(y){s=y,r=!0},wheelDistance:e,get speed(){return o},set speed(y){o=y,c=!0},get prevSpeed(){return a},set prevSpeed(y){a=y},accel:0,lateral:0,get steer(){return m.steer},get pitch(){return m.pitch},get roll(){return m.roll},get heave(){return m.heave},frame:x,update(y,_){let v=y-s;if(s=y,r||!(_>mb))r=!1,g(y),p.accel=p.lateral=0;else{let w=Nt(v/_,-dp,dp);a=o,o=Nt(gb(o,w,ib,_),o-pp*_,o+pp*_),p.accel=Nt((o-a)/_,-mp,mp),p.lateral=Nt(o*o*t.curvatureAt(y),-gp,gp),Wa(l,_p(t,y,o),ub,_),Wa(u,Nt(-rb*p.lateral,-Ga,Ga),db,_),Wa(h,Nt(sb*p.accel,-Ha,Ha),fb,_);let E=Math.abs(p.accel)+Math.abs(p.lateral),b=ab*Math.sin(y/cb*Math.PI*2)*Math.min(1,Math.abs(o)/20);Wa(f,Nt(b-ob*E,-xp,yp),pb,_),l.x=Nt(l.x,-Xa,Xa),u.x=Nt(u.x,-Ga,Ga),h.x=Nt(h.x,-Ha,Ha),f.x=Nt(f.x,-xp,yp)}c=!1,p.wheelDistance=y;let A=t.sample(y);x.p.copy(A.p),x.f.copy(A.t).setY(0).normalize(),x.r.crossVectors(x.f,jS).normalize(),i.root.position.copy(A.p),i.root.rotation.y=Math.atan2(-A.t.z,A.t.x);let S=xb(d,h.x,u.x,f.x);m.dist=y,m.steer=l.x,m.pitch=h.x*S,m.roll=u.x*S,m.heave=f.x*S,m.speed=Math.abs(o),n&&(m.road=n(y)),i.pose(m)}};return p}function Ue(i=1){let t=i>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}var ye=256,_i=null,Un=null,Ep=i=>i*i*i*(i*(i*6-15)+10);function yb(i,t){let e=new Float64Array(t*t*2);for(let n=0;n<t*t;n++){let s=i()*Math.PI*2;e[2*n]=Math.cos(s),e[2*n+1]=Math.sin(s)}return e}function Ap(i,t,e){let n=new Float64Array(ye*ye),s=new Int32Array(ye),r=new Float64Array(ye),o=new Float64Array(ye),a=.5;for(let c=0;c<e;c++){let l=t<<c,h=l-1,u=yb(i,l),f=l/ye;for(let d=0;d<ye;d++){let m=d*f;s[d]=Math.floor(m),r[d]=m-s[d],o[d]=Ep(r[d])}for(let d=0;d<ye;d++)_b(n,d,f,h,l,u,s,r,o,a);a*=.5}return n}function _b(i,t,e,n,s,r,o,a,c,l){let h=t*e,u=Math.floor(h),f=h-u,d=Ep(f),m=(u&n)*s,x=(u+1&n)*s,g=t*ye;for(let p=0;p<ye;p++){let y=o[p],_=a[p],v=2*(m+(y&n)),A=2*(m+(y+1&n)),S=2*(x+(y&n)),w=2*(x+(y+1&n)),E=r[v]*_+r[v+1]*f,b=r[A]*(_-1)+r[A+1]*f,M=r[S]*_+r[S+1]*(f-1),R=r[w]*(_-1)+r[w+1]*(f-1),N=E+(b-E)*c[p],L=M+(R-M)*c[p];i[g+p]+=l*(N+(L-N)*d)}}function vb(i,t){let e=new Float64Array(t*t*2);for(let r=0;r<t*t;r++)e[2*r]=i(),e[2*r+1]=i();let n=new Float64Array(ye*ye),s=t/ye;for(let r=0;r<ye;r++)for(let o=0;o<ye;o++){let a=(o+.5)*s,c=(r+.5)*s,l=Math.floor(a),h=Math.floor(c),u=9;for(let f=-1;f<=1;f++)for(let d=-1;d<=1;d++){let m=l+d,x=h+f,g=(m%t+t)%t+(x%t+t)%t*t,p=m+e[2*g]-a,y=x+e[2*g+1]-c,_=p*p+y*y;_<u&&(u=_)}n[r*ye+o]=Math.max(0,1-Math.sqrt(u))}return n}function Tp(){if(_i)return _i;let i=Ue(1931),t=Ap(i,4,5),e=Ap(i,16,3),n=vb(i,8);_i=new Uint8Array(ye*ye*4);let s=r=>Math.max(0,Math.min(255,Math.round(r*255)));for(let r=0;r<ye*ye;r++)_i[4*r]=s(.5+t[r]*.72),_i[4*r+1]=s(.5+e[r]*.72),_i[4*r+2]=s(n[r]),_i[4*r+3]=s(i());return _i}function Rp(){return Un||(Un=new Sn(Tp(),ye,ye,Ke),Un.wrapS=Un.wrapT=sn,Un.magFilter=rn,Un.minFilter=Vn,Un.generateMipmaps=!0,Un.anisotropy=4,Un.name="env-noise",Un.needsUpdate=!0,Un)}function on(i,t,e){let n=_i||Tp(),s=t*ye-.5,r=e*ye-.5,o=Math.floor(s),a=Math.floor(r),c=s-o,l=r-a,h=o&ye-1,u=a&ye-1,f=h+1&ye-1,d=u+1&ye-1,m=n[4*(u*ye+h)+i],x=n[4*(u*ye+f)+i],g=n[4*(d*ye+h)+i],p=n[4*(d*ye+f)+i],y=m+(x-m)*c,_=g+(p-g)*c;return(y+(_-y)*l)/255}function ei(i,t,e,{repeat:n=!0,srgb:s=!0,aniso:r=8}={}){let o=document.createElement("canvas");o.width=i,o.height=t;let a=o.getContext("2d");e(a,i,t);let c=new Ln(o);return n&&(c.wrapS=c.wrapT=sn),s&&(c.colorSpace=Ie),c.anisotropy=r,c}function Cp(){return ei(64,512,(i,t,e)=>{let n=e/6;for(let s=0;s<6;s++){i.fillStyle=s%2?"#eceef0":"#2f86d0",i.fillRect(0,s*n,t,n);let r=i.createLinearGradient(0,s*n,0,(s+1)*n);r.addColorStop(0,"rgba(60,52,40,.10)"),r.addColorStop(.2,"rgba(60,52,40,0)"),r.addColorStop(.8,"rgba(60,52,40,0)"),r.addColorStop(1,"rgba(60,52,40,.12)"),i.fillStyle=r,i.fillRect(0,s*n,t,n),i.fillStyle="rgba(20,22,26,.35)",i.fillRect(0,s*n,t,2)}i.fillStyle="rgba(0,0,0,.10)";for(let s of[.34,.67])i.fillRect(Math.round(s*t),0,2,e);i.fillStyle="rgba(0,0,0,.08)",i.fillRect(0,0,4,e)})}function Ip(){return ei(512,128,(i,t,e)=>{i.fillStyle="#2a2a2a",i.fillRect(0,0,t,e),i.fillStyle="#1b1b1c";for(let r=0;r<t;r+=16)i.beginPath(),i.arc(r+8,e-6,7,0,Math.PI*2),i.arc(r+8,5,6,0,Math.PI*2),i.fill();i.fillStyle="rgba(90,85,75,.55)",i.fillRect(0,0,t,3);let n=t/4;for(let r=0;r<4;r++){i.fillStyle=r%2?"#e9ecee":"#e5772e",i.fillRect(r*n+1,10,n-2,e-24),i.fillStyle="rgba(0,0,0,.13)",i.fillRect(r*n+1,30,n-2,5),i.fillRect(r*n+1,76,n-2,5),i.fillStyle="rgba(40,40,40,.55)";for(let o=0;o<4;o++)for(let a of[32,78])i.fillRect(r*n+10+o*(n/4),a,3,2)}let s=i.createLinearGradient(0,e,0,e-46);s.addColorStop(0,"rgba(98,84,62,.55)"),s.addColorStop(1,"rgba(98,84,62,0)"),i.fillStyle=s,i.fillRect(0,e-46,t,46)})}function Pp(i=1){return ei(256,128,(t,e,n)=>{let s=Ue(i);for(let r=0;r<26;r++){let o=e*(.18+s()*.64),a=n*(.45+(s()-.5)*.35),c=18+s()*34,l=t.createRadialGradient(o,a,0,o,a,c);l.addColorStop(0,"rgba(255,255,255,.55)"),l.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=l,t.beginPath(),t.arc(o,a,c,0,Math.PI*2),t.fill()}},{repeat:!1})}function Lp(){return ei(128,128,(i,t,e)=>{let n=i.createRadialGradient(t/2,e/2,4,t/2,e/2,t/2);n.addColorStop(0,"rgba(0,0,0,.55)"),n.addColorStop(.6,"rgba(0,0,0,.22)"),n.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=n,i.fillRect(0,0,t,e)},{repeat:!1,srgb:!1})}function Ya(i=256,t=128,{hx:e=.36,hy:n=.27,rr:s=.12,fade:r=.13,core:o=.45,alpha:a=.8}={}){return ei(i,t,c=>{let l=c.createImageData(i,t),h=l.data;for(let u=0;u<t;u++)for(let f=0;f<i;f++){let d=Math.abs(f/(i-1)-.5),m=Math.abs(u/(t-1)-.5),x=d-(e-s),g=m-(n-s),p=Math.hypot(Math.max(x,0),Math.max(g,0))+Math.min(Math.max(x,g),0)-s,y=Math.min(1,Math.max(0,1-(p+r*.3)/r));y=y*y*(3-2*y);let _=1-o*Math.min(1,Math.hypot(d/(e+r),m/(n+r))),v=(u*i+f)*4;h[v]=h[v+1]=h[v+2]=0,h[v+3]=Math.round(255*a*y*_)}c.putImageData(l,0,0)},{repeat:!1,srgb:!1})}function Dp(){return ei(4,128,(i,t,e)=>{let n=i.createLinearGradient(0,0,0,e);n.addColorStop(0,"rgba(0,0,0,.5)"),n.addColorStop(.35,"rgba(0,0,0,.2)"),n.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=n,i.fillRect(0,0,t,e)},{repeat:!1,srgb:!1,aniso:1})}function Np(){return ei(64,256,(i,t,e)=>{i.fillStyle="#2f86c0",i.fillRect(0,0,t,e);for(let s=0;s<e;s+=8){let r=i.createLinearGradient(0,s,0,s+8);r.addColorStop(0,"rgba(255,255,255,.22)"),r.addColorStop(.45,"rgba(255,255,255,0)"),r.addColorStop(.8,"rgba(0,0,0,.08)"),r.addColorStop(1,"rgba(0,0,0,.25)"),i.fillStyle=r,i.fillRect(0,s,t,8)}let n=Math.round(e*.4)-6;i.fillStyle="#1d2a33";for(let s=3;s<t-6;s+=10)i.fillRect(s,n,7,10);i.fillStyle="rgba(255,255,255,.18)";for(let s=3;s<t-6;s+=10)i.fillRect(s,n,7,2);i.fillStyle="#5c6670",i.fillRect(0,e-6,t,6)})}function Up(){return ei(256,128,(i,t,e)=>{let n=i.createLinearGradient(0,0,0,e);n.addColorStop(0,"#9fb3bf"),n.addColorStop(.55,"#6e8592"),n.addColorStop(1,"#4b5d68"),i.fillStyle=n,i.fillRect(0,0,t,e),i.fillStyle="rgba(245,243,238,.85)";for(let s=0;s<t;s+=32)i.fillRect(s,0,3,e);i.fillRect(0,e*.62,t,2),i.fillStyle="rgba(255,255,255,.08)";for(let s=0;s<t;s+=32)i.beginPath(),i.moveTo(s+6,e),i.lineTo(s+18,0),i.lineTo(s+26,0),i.lineTo(s+14,e),i.fill()})}function Fp(){return ei(128,128,(i,t,e)=>{let n=Ue(21);for(let s=0;s<110;s++){let r=t*(.08+n()*.84),o=e*(.3+n()*.68),a=(n()-.5)*34,c=.7+n()*.5,l=i.createLinearGradient(0,e,0,e-o);l.addColorStop(0,`rgba(${46*c},${60*c},${28*c},1)`),l.addColorStop(1,`rgba(${150*c},${158*c},${96*c},1)`),i.strokeStyle=l,i.lineWidth=1.2+n()*1.4,i.beginPath(),i.moveTo(r,e),i.quadraticCurveTo(r+a*.3,e-o*.6,r+a,e-o),i.stroke()}},{repeat:!1})}function Op(){return ei(32,32,(i,t,e)=>{i.strokeStyle="rgba(205,210,212,1)",i.lineWidth=2,i.beginPath();for(let n of[-t,0,t])i.moveTo(n,0),i.lineTo(n+t,e),i.moveTo(n+t,0),i.lineTo(n,e);i.stroke()})}function Bp(i=8,t=512){let e=t,n=e/512,s=n*n,r=Ue(97),o=new Float32Array(e*e),a=new Float32Array(e*e),c=new Float32Array(e*e).fill(.3),l=new Float32Array(e*e),h=S=>S&e-1,u=new Float32Array(e),f=S=>{let w=new Float32Array(S);for(let E=0;E<e;E++){let b=E*e;for(let M=0;M<e;M++)u[M]=w[b+h(M-1)]+w[b+M]+w[b+h(M+1)];w.set(u,b)}for(let E=0;E<e;E++){for(let b=0;b<e;b++)u[b]=w[h(b-1)*e+E]+w[b*e+E]+w[h(b+1)*e+E];for(let b=0;b<e;b++)w[b*e+E]=u[b]/9}return w},d=new Int32Array(1024),m=new Float32Array(1024),x=(S,w,E,b=1,M=0)=>{let R=Math.ceil(E*Math.max(1,b))+1,N=Math.cos(M),L=Math.sin(M),C=S%1,B=w%1,U=Math.floor(S),z=Math.floor(w),F=1/(E*E),J=0;for(let $=-R;$<=R;$++)for(let ct=-R;ct<=R;ct++){let ht=ct+.5-C,Mt=$+.5-B,j=(ht*N+Mt*L)/b,Y=-ht*L+Mt*N,Z=(j*j+Y*Y)*F;Z<1&&J<d.length&&(d[J]=h(z+$)*e+h(U+ct),m[J++]=Z)}return J};for(let S=0;S<e*e;S++)o[S]=.5+(r()-.5)*.55;let g=f(o);for(let S=0;S<e*e;S++)o[S]=.47+(g[S]-.5)*1.3+(r()-.5)*.08;for(let S=0;S<2600*s;S++){let w=(.9+r()*1.4)*n,E=.2+r()*.25,b=x(r()*e,r()*e,w);for(let M=0;M<b;M++)o[d[M]]+=E*(1-m[M]*m[M])}for(let S=0;S<1500*s;S++){let w=(.6+r()*1)*n,E=x(r()*e,r()*e,w);for(let b=0;b<E;b++)o[d[b]]-=.28*(1-m[b])}for(let S=0;S<e*e;S++)a[S]=.5+(r()-.5)*.3;for(let S=0;S<4200*s;S++){let w=(3+r()*7)*n,E=r()*Math.PI*2,b=.22+r()*.65,M=r()*e,R=r()*e;for(let N=0;N<w;N++){let L=h(Math.floor(R))*e+h(Math.floor(M));a[L]=a[L]*.3+b*.7,M+=Math.cos(E),R+=Math.sin(E)}}let p=f(a);for(let S=0;S<e;S++)for(let w=0;w<e;w++){let E=S*e+w,b=on(0,w/e,S/e);a[E]=.5+(a[E]*.6+p[E]*.4-.5)*1.1+(b-.5)*.22}for(let S=0;S<3400*s;S++){let w=(1.8+r()*r()*4.2)*n,E=r()<.12?.32+r()*.2:.55+r()*.45,b=.75+r()*.5,M=r()*Math.PI,R=x(r()*e,r()*e,w,b,M);for(let N=0;N<R;N++){let L=Math.sqrt(1-m[N]);c[d[N]]=E*(.82+.18*L),l[d[N]]=L}}let y=new Uint8Array(e*e*4),_=S=>Math.max(0,Math.min(255,Math.round(S*255))),v=[0,0,0,0];for(let S=0;S<e*e;S++){y[4*S]=_(o[S]),y[4*S+1]=_(a[S]),y[4*S+2]=_(c[S]),y[4*S+3]=_(l[S]);for(let w=0;w<4;w++)v[w]+=y[4*S+w]}let A=new Sn(y,e,e,Ke);return A.wrapS=A.wrapT=sn,A.minFilter=Vn,A.generateMipmaps=!0,A.anisotropy=i,A.name="env-surface-detail",A.userData.mean=v.map(S=>S/(e*e*255)),A.needsUpdate=!0,A}var zp=null,eu=()=>zp||(zp=new Be({map:Ya(256,128,{alpha:.75}),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})),Mb="fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))))";function kp(i,t,e){return i.onBeforeCompile=n=>{n.uniforms.envFade=t,n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
uniform float envFade;`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
if (${Mb} >= envFade) discard;`)},i.customProgramCacheKey=()=>e,i}function qa(){let i={value:1},t=kp(new yt({vertexColors:!0,roughness:.78}),i,"people-body"),e=kp(new rs({depthPacking:so}),i,"people-depth"),n=new Be({map:eu().map,transparent:!0,depthWrite:!1,opacity:1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});return{body:t,depth:e,contact:n,fade:i,setFade(s){i.value=s,n.opacity=s}}}var Vp={crew:{top:1909031,accent:15282981,legs:5264732,shoes:1316120,hat:1909031},engineer:{top:15526628,accent:15282981,legs:3027512,shoes:1316120,hat:1909031},marshal:{top:15231519,accent:13159632,legs:15231519,shoes:2763306,hat:15231519}},Sb=Math.PI/2;function bb(){let i=new Map,t=new Ot;return{add(e,n,s,r){i.has(e)||i.set(e,[]),i.get(e).push({geometry:n,node:s,colour:r})},bake(e,n,s){e.updateMatrixWorld(!0);let r=new Gt;for(let[o,a]of i){r.copy(o.matrixWorld).invert();let c=a.map(({geometry:u,node:f,colour:d})=>{let m=u.clone();m.deleteAttribute("uv"),m.applyMatrix4(new Gt().multiplyMatrices(r,f.matrixWorld)),t.set(d);let x=new Float32Array(m.attributes.position.count*3);for(let g=0;g<x.length;g+=3)x[g]=t.r,x[g+1]=t.g,x[g+2]=t.b;return m.setAttribute("color",new zt(x,3)),m}),l=dn(c),h=new bt(l,n);h.castShadow=!0,h.receiveShadow=!0,h.customDepthMaterial=s,o.add(h)}}}}var lo=new jn(1,14,10),tu=new jn(1,10,7),dr=new We(1,1,1),vi=new oe(1,1,1,12),Qh=new Map,fr=(i,t)=>{let e=i.toFixed(3)+"/"+t.toFixed(3);return Qh.has(e)||Qh.set(e,new as(i,t,4,10)),Qh.get(e)};function ee(i,t=0,e=0,n=0,s=0,r=0,o=0,a=1,c=1,l=1){let h=new Ze;return h.position.set(t,e,n),h.rotation.set(s,r,o),h.scale.set(a,c,l),i.add(h),h}var Hp={stand:{hipY:.95,lean:.02,armL:[.08,.1,.18],armR:[-.05,.1,.12],legL:[.04,.02],legR:[-.06,.04]},idle:{hipY:.95,lean:.03,armL:[.25,.12,.6],armR:[-.1,.08,.1],legL:[.1,.05],legR:[-.05,.02]},armsCrossed:{hipY:.95,lean:-.02,armL:[.35,.05,1.9],armR:[.4,.05,1.85],legL:[.06,.02],legR:[-.04,.02]},kneel:{hipY:.55,lean:.45,armL:[1.15,0,.5],armR:[1.05,.05,.6],legL:[1.5,1.55],legR:[-.2,1.9],prop:"gun"},jack:{hipY:.93,lean:.55,armL:[1,.05,.25],armR:[1,.05,.25],reach:{L:[.55,.9,-.17],R:[.55,.9,.17]},legL:[.35,.45],legR:[-.1,.3],prop:"jack"},board:{hipY:.95,lean:0,armL:[.1,.1,.2],armR:[1.9,.1,.3],legL:[.08,.03],legR:[-.06,.03],prop:"board"},tablet:{hipY:.95,lean:.06,armL:[.3,.05,1.45],armR:[.3,.05,1.45],legL:[.05,.02],legR:[-.05,.02],prop:"tablet"},tyre:{hipY:.95,lean:-.05,armL:[.55,.05,.9],armR:[.55,.05,.9],reach:{L:[.36,1.135,-.315],R:[.36,1.135,.315]},legL:[.12,.05],legR:[-.12,.05],prop:"tyre"},carryHelmet:{hipY:.95,lean:.02,armL:[.05,.1,.15],armR:[.25,.12,.35],legL:[.06,.02],legR:[-.06,.02],prop:"helmet"},helmet:{hipY:.95,lean:0,armL:[2.3,.35,1.2],armR:[2.3,.35,1.2],legL:[.04,.02],legR:[-.04,.02]},point:{hipY:.95,lean:.04,armL:[.05,.1,.2],armR:[1.35,.15,.1],legL:[.12,.05],legR:[-.08,.03]}};function gr({kit:i="crew",skin:t=13081468,head:e="hair",helmet:n=!1,hair:s=2826521,pose:r="stand",moving:o=[],materials:a=qa()}={}){n&&(e="helmet");let c=typeof i=="string"?Vp[i]||Vp.crew:i,l=Hp[r]||Hp.stand,h=new _e,u=bb(),f=ee(h,0,l.hipY,0),d=ee(f,0,0,0,0,0,-l.lean),m=ee(d,0,.32,0),x=new _e;x.position.set(0,.76,0),d.add(x);let g=M=>{let R=new _e;return R.position.set(0,.56,M*.2),d.add(R),R},p=g(-1),y=g(1);u.add(h,fr(.16,.34),ee(m,0,0,0,0,0,0,.82,1,1.12),c.top),u.add(h,vi,ee(f,0,.04,0,0,0,0,.15,.12,.19),c.legs),u.add(h,fr(.035,.36),ee(m,0,.21,0,Sb,0,0,1,1,1),c.accent),u.add(h,vi,ee(d,.01,.66,0,0,0,0,.05,.08,.05),t);for(let[M,[R,N]]of[[-1,l.legL],[1,l.legR]]){let L=ee(f,0,0,M*.1,0,0,R);u.add(h,fr(.075,.3),ee(L,0,-.225,0),c.legs);let C=ee(L,0,-.45,0,0,0,-N);u.add(h,fr(.06,.34),ee(C,0,-.23,0),c.legs);let B=ee(C,0,-.46,0,0,0,N-R);u.add(h,dr,ee(B,.06,-.01,0,0,0,0,.26,.08,.1),c.shoes)}let _={},v=h;l.reach&&h.updateMatrixWorld(!0);for(let[M,R,N,L,C]of[[-1,p,l.armL,"armL","L"],[1,y,l.armR,"armR","R"]]){let B=o.includes(L)?R:h,[U,z,F]=l.reach?Cb(M,R.worldToLocal(new D(...l.reach[C]))):N,J=ee(R,0,0,0,-M*z,0,U);u.add(B,fr(.052,.22),ee(J,0,-.15,0),c.top);let $=ee(J,0,-pr,0,0,0,F);u.add(B,fr(.045,.2),ee($,0,-.14,0),t);let ct=ee($,0,-ds,0);u.add(B,tu,ee(ct,0,0,0,0,0,0,.05,.06,.04),t),_[C]=ct,M===1&&(v=B)}let A=Nb(u,v,l.prop,_,h),S=o.includes("head")?x:h;u.add(S,lo,ee(x,0,0,0,0,0,0,.105,.12,.1),t);let w=null,E=null;if(e==="helmet")u.add(S,lo,ee(x,-.01,.01,0,0,0,0,.15,.15,.145),16118766),w=ee(x,.105,0,0,0,0,0,.06,.05,.1),u.add(S,tu,w,1842721),u.add(S,wb,ee(x,-.01,.03,0,0,Math.PI/2,0,1,1,1),15282981);else if(u.add(S,lo,ee(x,-.012,.03,0,0,0,0,.11,.105,.105),s),(e==="cap"||e==="headset")&&(u.add(S,lo,ee(x,-.01,.045,0,0,0,0,.115,.08,.112),c.hat),E=ee(x,.06,.05,0,0,0,-.12,.1,.012,.09),u.add(S,Eb,E,c.hat)),e==="headset"){u.add(S,Ab,ee(x,0,.02,0,0,Math.PI/2,0,1,1,1),1052948);for(let M of[-1,1])u.add(S,vi,ee(x,0,-.01,M*.11,Math.PI/2,0,0,.045,.03,.045),1052948)}u.bake(h,a.body,a.depth);let b=new bt(Tb,a.contact);return b.position.set(r==="kneel"?-.1:0,Rb,0),b.renderOrder=1,h.add(b),h.userData={hip:d,head:x,armL:p,armR:y,visor:w,brim:E,hands:_,props:A,materials:a},h}var wb=new ls(.135,.012,5,18,Math.PI),Ab=new ls(.115,.008,4,16,Math.PI),Eb=new oe(1,1,1,12,1,!1,0,Math.PI),Tb=new ve(1.1,1.1).rotateX(-Math.PI/2),Rb=.008,pr=.3,ds=.29;function Cb(i,t){let e=Math.hypot(t.y,t.z),n=Math.atan2(-t.z,-t.y),s=Math.min(pr+ds-1e-4,Math.hypot(t.x,e)),r=(s*s-pr*pr-ds*ds)/(2*pr*ds),o=Math.acos(Math.max(-1,Math.min(1,r))),a=Math.atan2(-e,t.x),c=Math.atan2(-(pr+ds*Math.cos(o)),ds*Math.sin(o));return[a-c,-n/i,o]}var Ib={x0:1.03,x1:1.51,top:.13,width:.3,socket:[1.08,.14,0],bar:[.55,.9,0]},mr={centre:[.36,.95,0],radius:.33,rim:.215,width:.3},Pb=(()=>{let{radius:i,rim:t,width:e}=mr,n=e/2,s=[[t,-n+.02],[t+.035,-n],[i-.025,-n],[i-.004,-n+.03],[i,0],[i-.004,n-.03],[i-.025,n],[t+.035,n],[t,n-.02]].map(([r,o])=>new ft(r,o));return new Vi(s,18).rotateZ(-Math.PI/2)})(),Lb=new oe(mr.rim+.005,mr.rim+.005,.22,18).rotateZ(-Math.PI/2),Db=new oe(.07,.07,.24,10).rotateZ(-Math.PI/2);function Gp(i,t,e,n,s,r,o){let a=new D(...n),c=new D(...s).sub(a),l=c.length(),h=ee(e,a.x+c.x/2,a.y+c.y/2,a.z+c.z/2,0,0,0,r,l,r);h.quaternion.setFromUnitVectors(new D(0,1,0),c.normalize()),i.add(t,vi,h,o)}function Nb(i,t,e,n,s){if(!e)return[];if(e==="gun"){let c=ee(n.R,0,-.12,0);return i.add(t,dr,ee(c,0,0,0,0,0,0,.11,.26,.11),2829875),i.add(t,vi,ee(c,0,-.17,0,0,0,0,.04,.09,.04),10133670),i.add(t,dr,ee(c,.07,.06,0,0,0,0,.05,.1,.05),15282981),[]}s.updateMatrixWorld(!0);let r=n.L.getWorldPosition(new D),o=n.R.getWorldPosition(new D),a=ee(s,o.x,o.y,o.z);if(e==="board")i.add(t,vi,ee(a,0,.3,0,0,0,0,.015,.7,.015),10133670),i.add(t,vi,ee(a,.01,.75,0,0,0,Math.PI/2,.24,.02,.24),15282981),i.add(t,vi,ee(a,.022,.75,0,0,0,Math.PI/2,.16,.02,.16),16118766);else if(e==="tablet")i.add(t,dr,ee(a,.02,.05,-.2,0,0,.9,.012,.26,.19),1382170);else if(e==="helmet")i.add(t,lo,ee(a,.02,-.12,.05,0,0,0,.15,.15,.145),16118766),i.add(t,tu,ee(a,.12,-.13,.05,0,0,0,.06,.05,.1),1842721);else if(e==="tyre"){let[c,l,h]=mr.centre;i.add(t,Pb,ee(s,c,l,h),1579291),i.add(t,Lb,ee(s,c,l,h),9278105),i.add(t,Db,ee(s,c,l,h),2829875);let u=f=>{let d=Math.hypot(f.y-l,f.z-h);return[f.toArray(),[c,l+(f.y-l)*mr.radius/d,h+(f.z-h)*mr.radius/d]]};return[{name:"tyre/handL",points:u(r),gap:.07},{name:"tyre/handR",points:u(o),gap:.07}]}else if(e==="jack"){let{x0:c,x1:l,top:h,width:u,socket:f,bar:d}=Ib,m=15282981,x=10133670;i.add(s,dr,ee(s,(c+l)/2,h-.035,0,0,0,0,l-c,.07,u),m),i.add(s,dr,ee(s,l-.06,h+.005,0,0,0,0,.1,.02,u*.7),2829875);for(let p of[c+.05,l-.05])for(let y of[-1,1])i.add(s,vi,ee(s,p,.03,y*(u/2-.03),Math.PI/2,0,0,.03,.03,.03),1382170);Gp(i,s,s,f,d,.02,x),Gp(i,s,s,[d[0],d[1],-.24],[d[0],d[1],.24],.018,x);let g=p=>[p.toArray(),[d[0],d[1],Math.max(-.24,Math.min(.24,p.z))]];return[{name:"jack/handL",points:g(r),gap:.05},{name:"jack/handR",points:g(o),gap:.05},{name:"jack/socket",points:[f,[f[0],h,f[2]]],gap:.05}]}return[]}var Ub=new Gt().elements,Fb=i=>i.elements.every((t,e)=>t===Ub[e]);function Ob(i){return Object.keys(i.attributes).sort().map(t=>{let e=i.attributes[t];return`${t}:${e.itemSize}:${e.normalized}:${e.array.constructor.name}`}).join(",")}function Bb(i){let t=i.geometry,e=i.material;return i.isInstancedMesh||i.isSkinnedMesh||i.isBatchedMesh?"kind":Array.isArray(e)||e.transparent?"material":i.name||i.userData.noMerge||i.children.length||!i.visible?"flagged":i.onBeforeRender!==Ze.prototype.onBeforeRender?"hook":Object.keys(t.morphAttributes).length||t.drawRange.start!==0||t.drawRange.count!==1/0||t.attributes.tangent||t.attributes.position.isInterleavedBufferAttribute?"geometry":""}function zb(i){return[i.material.id,i.castShadow,i.receiveShadow,i.renderOrder,i.layers.mask,i.frustumCulled,i.customDepthMaterial?i.customDepthMaterial.id:"",i.customDistanceMaterial?i.customDistanceMaterial.id:"",i.geometry.index?"indexed":"plain",Ob(i.geometry)].join("|")}function Za(i,{skip:t=null}={}){i.updateMatrixWorld(!0);let e=new Map,n=(o,a)=>{for(let c of o.children){if(c===t)continue;let l=[...a,c.matrix];if(c.isMesh&&!Bb(c)){let h=new Gt;for(let x of l)h.multiply(x);let u=c.geometry;u.boundingBox||u.computeBoundingBox();let f=u.boundingBox.clone().applyMatrix4(c.matrixWorld),d=f.max.x-f.min.x>oo||f.max.z-f.min.z>oo,m=Fb(h);if(h.determinant()>0&&(m||!d)){let x=zb(c);e.has(x)||e.set(x,[]),e.get(x).push({node:c,chain:l,relative:h,identity:m})}}n(c,l)}};n(i,[]);let s=0,r=0;for(let o of e.values()){if(o.length<2)continue;let a=o[0].node,c=o.map(({node:f,relative:d,identity:m})=>m?f.geometry:f.geometry.clone().applyMatrix4(d)),l=kb(c),h=new bt(l,a.material);h.castShadow=a.castShadow,h.receiveShadow=a.receiveShadow,h.renderOrder=a.renderOrder,h.layers.mask=a.layers.mask,h.frustumCulled=a.frustumCulled,h.customDepthMaterial=a.customDepthMaterial,h.customDistanceMaterial=a.customDistanceMaterial;let u=l.userData.ranges;h.userData.indexParts=o.map(({node:f,chain:d},m)=>({box:f.geometry.boundingBox.clone(),chain:d.map(x=>x.clone()),axisBox:Wh(f.geometry),...u[m]})),delete l.userData.ranges;for(let{node:f}of o){let d=f.parent;for(f.removeFromParent();d!==i&&!d.children.length&&!d.name&&!d.isMesh;){let m=d.parent;d.removeFromParent(),d=m}}c.forEach((f,d)=>f!==o[d].node.geometry&&f.dispose()),i.add(h),h.updateMatrixWorld(!0),s++,r+=o.length}return{merged:s,parts:r}}function kb(i){let t=new fe,e=i.reduce((r,o)=>r+o.attributes.position.count,0);for(let r of Object.keys(i[0].attributes)){let o=i[0].attributes[r],a=new o.array.constructor(e*o.itemSize),c=0;for(let l of i){let h=l.attributes[r];a.set(h.array.subarray(0,h.count*h.itemSize),c),c+=h.count*h.itemSize}t.setAttribute(r,new Ne(a,o.itemSize,o.normalized))}let n=[],s=0;if(i[0].index){let r=i.reduce((c,l)=>c+l.index.count,0),o=e>65535?new Uint32Array(r):new Uint16Array(r),a=0;for(let c of i){let l=c.index.array;for(let h=0;h<c.index.count;h++)o[a+h]=l[h]+s;n.push({vertexStart:s,vertexCount:c.attributes.position.count,indexStart:a,indexCount:c.index.count}),a+=c.index.count,s+=c.attributes.position.count}t.setIndex(new Ne(o,1))}else for(let r of i){let o=r.attributes.position.count;n.push({vertexStart:s,vertexCount:o,indexStart:s,indexCount:o}),s+=o}return t.userData.ranges=n,t}function Wp(i){i.updateMatrixWorld(!0),i.traverse(t=>t.matrixAutoUpdate=!1),i.matrixWorldAutoUpdate=!1}function nu(i,t,e,n=56,s=36){let r=[],o=[];for(let c=0;c<=n;c++){let l=i+(t-i)*c/n,h=e(l),u=(h.top+h.bottom)/2,f=Math.max(.001,(h.top-h.bottom)/2);for(let d=0;d<=s;d++){let m=-Math.PI/2+Math.PI*2*d/s,x=Math.cos(m),g=Math.sin(m),p=g>=0,y=p?u+f*Math.pow(Math.abs(g),2/h.upperExponent):u-f*Math.pow(Math.abs(g),2/h.lowerExponent),_=h.halfWidth*Math.sign(x)*Math.pow(Math.abs(x),2/(p?h.upperExponent:h.lowerExponent))*(p?1-(h.tumblehome||0)*g*g:1);r.push(l,y,_)}}for(let c=0;c<n;c++)for(let l=0;l<s;l++){let h=c*(s+1)+l,u=h+s+1;o.push(h,u,h+1,h+1,u,u+1)}let a=new fe;return a.setAttribute("position",new zt(r,3)),a.setIndex(o),a.computeVertexNormals(),a}var Yp={classic:{length:4.25,wheelbase:2.4,wheelRadius:.31,trackWidth:1.34,tyreWidth:.19,chrome:!0,top:[[-2.13,.56],[-2.05,.7],[-1.7,.8],[-1,.84],[-.3,.86],[.2,.84],[.9,.8],[1.6,.74],[2,.63],[2.13,.5]],sill:[[-2.13,.44],[-2,.3],[-1.6,.22],[1.6,.22],[2,.3],[2.13,.42]],halfWidth:[[-2.13,.5],[-2,.74],[-1.6,.81],[-1.2,.83],[0,.79],[1.2,.83],[1.7,.8],[2.05,.66],[2.13,.44]],upperExponent:2.4,lowerExponent:5,tumblehome:.1,cabin:{x0:-1.05,x1:.6,roof:[[-1.05,.84],[-.62,1.1],[-.15,1.19],[.2,1.17],[.6,.86]],belt:.8,halfWidth:[[-1.05,.6],[-.3,.67],[.3,.67],[.6,.62]]}},gt:{length:4.6,wheelbase:2.7,wheelRadius:.34,trackWidth:1.62,tyreWidth:.3,rearWing:[-2.02,1.3,1.8],top:[[-2.3,.78],[-2.1,.88],[-1.5,.93],[-.8,.9],[0,.86],[.8,.8],[1.5,.7],[2,.57],[2.3,.38]],sill:[[-2.3,.5],[-2.15,.3],[-1.8,.13],[1.8,.13],[2.2,.15],[2.3,.2]],halfWidth:[[-2.3,.8],[-2,.97],[-1.35,1],[-.5,.9],[.5,.88],[1.35,.99],[2,.93],[2.3,.7]],upperExponent:3,lowerExponent:6,tumblehome:.16,cabin:{x0:-1.25,x1:.78,roof:[[-1.25,.9],[-.7,1.19],[-.1,1.24],[.28,1.2],[.78,.84]],belt:.84,halfWidth:[[-1.25,.6],[-.4,.68],[.3,.66],[.78,.58]]}},proto:{length:4.75,wheelbase:2.9,wheelRadius:.35,trackWidth:1.64,tyreWidth:.32,rearWing:[-2.2,1.02,1.9],sharkFin:!0,top:[[-2.37,.8],[-2.2,.92],[-1.7,.95],[-1.2,.9],[-.6,.82],[0,.74],[.8,.7],[1.6,.64],[2.1,.5],[2.37,.3]],sill:[[-2.37,.5],[-2.2,.25],[-1.8,.1],[1.9,.1],[2.37,.15]],halfWidth:[[-2.37,.9],[-2.1,1],[-1.45,1],[-.8,.9],[0,.93],[.8,.93],[1.45,1],[2.1,.95],[2.37,.74]],upperExponent:3.2,lowerExponent:6,tumblehome:.2,cabin:{x0:-1.05,x1:.8,roof:[[-1.05,.8],[-.5,1.08],[0,1.13],[.4,1.07],[.8,.72]],belt:.74,halfWidth:[[-1.05,.38],[-.3,.5],[.3,.5],[.8,.36]]}}},Xp={},ps=(i,t)=>Xp[i]||(Xp[i]=t());function Vb(i){let t=ps("glass",()=>new yt({color:2766400,roughness:.05,metalness:.85,envMapIntensity:1.6})),e=ps("dark",()=>new yt({color:789775,roughness:.8,side:Pe})),n=ps("carbon",()=>new yt({color:1711135,roughness:.45,metalness:.4})),s=ps("chrome",()=>new yt({color:14804456,roughness:.14,metalness:1})),r=ps("lamp",()=>new yt({color:16184038,roughness:.15,metalness:.2,emissive:6972501,emissiveIntensity:.3})),o=ps("tyre",()=>new yt({color:1513498,roughness:.92})),a=i?s:ps("rim",()=>new yt({color:2764081,roughness:.32,metalness:.85}));return{glass:t,dark:e,carbon:n,chrome:s,lamp:r,tyre:o,rim:a}}function Hb(i,t){let e=Yp[i],n=new _e,s=new rr({color:t,roughness:.32,metalness:e.chrome?.2:.35,clearcoat:.8,clearcoatRoughness:.14}),r=Vb(e.chrome),o=[e.wheelbase/2,-e.wheelbase/2],a=e.wheelRadius+.07,c=Gi(e.top),l=Gi(e.sill),h=Gi(e.halfWidth),u=M=>{let R=-1;for(let N of o){let L=Math.abs(M-N);L<a&&(R=Math.max(R,e.wheelRadius+Math.sqrt(a*a-L*L)*.97))}return R},f=nu(e.top[0][0],e.top[e.top.length-1][0],M=>({top:c(M),bottom:Math.min(c(M)-.08,Math.max(l(M),u(M))),halfWidth:h(M),upperExponent:e.upperExponent,lowerExponent:e.lowerExponent,tumblehome:e.tumblehome}),90,40),d=new bt(f,s);d.castShadow=!0,d.receiveShadow=!0,n.add(d);let m=e.cabin,x=Gi(m.roof),g=Gi(m.halfWidth),p=nu(m.x0,m.x1,M=>({top:x(M),bottom:m.belt-.03,halfWidth:g(M),upperExponent:2.3,lowerExponent:8,tumblehome:.1}),40,32),y=new bt(p,r.glass);y.castShadow=!0,n.add(y);let _=m.x0+(m.x1-m.x0)*.17,v=m.x0+(m.x1-m.x0)*.76,A=nu(_,v,M=>{let R=Math.min(1,Math.min(M-_,v-M)/.12);return{top:x(M)+.012,bottom:x(M)-.03-.05*R,halfWidth:g(M)*(.84+.14*R),upperExponent:2.6,lowerExponent:3,tumblehome:.1}},24,24),S=new bt(A,s);S.castShadow=!0,n.add(S),Gb(n,e,r,o,a);let w=e.top[e.top.length-1][0],E=e.top[0][0];e.chrome?Wb(n,r,w,E):Xb(n,e,s,r,w,c),Za(n);let b=new bt(new ve(e.length*1.2,(e.trackWidth+.7)*1.25),eu());return b.rotation.x=-Math.PI/2,b.position.y=.055,b.renderOrder=1,n.add(b),n}function Gb(i,t,e,n,s){for(let r of n){let o=new bt(new oe(s*.98,s*.98,t.trackWidth+t.tyreWidth-.05,24,1,!0,Math.PI*.5,Math.PI),e.dark);o.rotation.x=Math.PI/2,o.position.set(r,t.wheelRadius,0),i.add(o);for(let a of[-1,1]){let c=new _e;c.position.set(r,t.wheelRadius,a*t.trackWidth/2),i.add(c);let l=new bt(new oe(t.wheelRadius,t.wheelRadius,t.tyreWidth,28),e.tyre);l.rotation.x=Math.PI/2,l.castShadow=!0,c.add(l);let h=new bt(new oe(t.wheelRadius*.68,t.wheelRadius*.68,t.tyreWidth+.012,24),e.rim);h.rotation.x=Math.PI/2,c.add(h);let u=new bt(new oe(t.wheelRadius*.22,t.wheelRadius*.26,t.tyreWidth+.03,16),t.chrome?e.chrome:e.dark);u.rotation.x=Math.PI/2,c.add(u)}}}function Wb(i,t,e,n){for(let[r,o,a]of[[e-.02,.4,1.36],[n+.02,.44,1.3]]){let c=new bt(new as(.045,a,4,10),t.chrome);c.rotation.x=Math.PI/2,c.position.set(r,o,0),c.castShadow=!0,i.add(c)}for(let r of[-1,1]){let o=new bt(new jn(.085,18,12,0,Math.PI),t.lamp);o.rotation.y=Math.PI/2,o.position.set(e-.14,.6,r*.52),i.add(o);let a=new bt(new ls(.088,.012,6,22),t.chrome);a.rotation.y=Math.PI/2,a.position.set(e-.13,.6,r*.52),i.add(a)}let s=new bt(new as(.07,.36,4,10),t.dark);s.rotation.x=Math.PI/2,s.position.set(e-.03,.5,0),i.add(s)}function Xb(i,t,e,n,s,r){let o=new bt(new We(.5,.025,1.9),n.carbon);o.position.set(s-.22,.1,0),i.add(o);for(let u of[-1,1]){let f=new bt(new We(.18,.035,.36),n.lamp);f.position.set(s-.32,r(s-.32)-.04,u*.62),f.rotation.z=-.35,i.add(f)}let[a,c,l]=t.rearWing,h=new bt(new We(.36,.03,l),n.carbon);h.position.set(a,c,0),h.rotation.z=.08,h.castShadow=!0,i.add(h);for(let u of[-1,1]){let f=new bt(new We(.44,.22,.015),n.carbon);f.position.set(a,c-.05,u*l/2),i.add(f);let d=new bt(new We(.05,c-r(a)+.05,.02),n.carbon);d.position.set(a+.06,(c+r(a))/2,u*.38),i.add(d)}if(t.sharkFin){let u=new bt(new We(1.1,.26,.018),e);u.position.set(-1.55,r(-1.55)+.11,0),i.add(u)}}function qp(i="gt",t=16118766){return Hb(Yp[i]?i:"gt",t)}var be={ground:-.05,gravel:.01,runoff:.016,pitMouth:.02,pitLane:.025,asphalt:.03,kerbInner:.03,kerbOuter:.045,rubber:.036,lines:.042,paint:.048,highlight:.06,paddock:.02,paddockLines:.025};var Yb=new D(0,1,0),qb=[["classic",11740702,-7.3,121.3,.02],["classic",3038539,-7.5,118.1,-.03],["classic",15788760,-7.2,114.9,.01],["gt",1842721,-7.4,111.7,-.02],["classic",9414584,-7.3,108.5,.03],["proto",15282981,-41,141.5,.02],["gt",10200234,-58,141,0],["proto",2833493,-64,120,Math.PI],["classic",9071422,-74,126,1.5],["gt",16118766,26,108,Math.PI-.05]],Zp=[["gunnerFront",{pose:"kneel",head:"cap",moving:["armR"],skin:13081468},{f:1.35,r:-1.5,face:"right"}],["gunnerRear",{pose:"kneel",head:"hair",moving:["armR"],skin:9263934},{f:-1.3,r:-1.5,face:"right"}],["jack",{pose:"jack",head:"cap",skin:13805962},{f:3.95,r:0,face:"car"}],["board",{pose:"board",head:"headset",moving:["head"],skin:11896166},{f:3.4,r:1.3,face:"car",yaw:.3}],["tyre",{pose:"tyre",head:"cap",skin:14727318},{f:-2.9,r:-2.5,face:"car",yaw:-.4}],["helmet",{pose:"carryHelmet",head:"hair",moving:["head"],skin:12159596,hair:7031342},{f:-3.6,r:1.6,face:"left",yaw:.4}],["engineer",{kit:"engineer",pose:"tablet",head:"headset",moving:["head"],skin:13213568},{garage:[1.9,-1.4],face:"car"}],["mechanic",{pose:"armsCrossed",head:"cap",skin:11040346},{garage:[-1.6,-6.5],face:"car",yaw:.25}]];function $p(){let i=qa(),t={};return{members:Zp.map(([n,s])=>t[n]=gr({...s,materials:i})),byName:t,materials:i,placed:!1}}function Jp(i){for(let[t,e,n,s,r]of qb){let o=qp(t,e);o.position.set(n,be.paddock,s),o.rotation.y=r,i.add(o),Wp(o)}}function Kp(i){let t=qa(),e=(s,r,o=2829099)=>({top:s,accent:s,legs:r,shoes:o,hat:2831424}),n=[[gr({kit:e(3821419,3424335),skin:13738883,moving:["head"],materials:t}),-3.7,119.9,Math.PI+.25],[gr({kit:e(15131094,11773322,7035464),skin:10251086,pose:"point",head:"cap",materials:t}),-3.3,118.8,Math.PI-.5],[gr({kit:e(7036234,2829099),skin:13081468,pose:"armsCrossed",materials:t}),-11.8,113.6,.3],[gr({kit:"marshal",skin:12159596,pose:"idle",head:"cap",moving:["head"],materials:t}),-18.5,130.2,-.6]];for(let[s,r,o,a]of n)s.position.set(r,be.paddock,o),s.rotation.y=a,s.userData.group=t,i.add(s);return n}var iu=new D,su=new D,ru=new D,$a=new D,Zb=(i,t)=>Math.atan2(-t,i);function $b(i,t,e,n){let s=t.sample(e);iu.copy(s.p),su.set(s.t.x,0,s.t.z).normalize(),ru.crossVectors(su,Yb),Zp.forEach(([r,,o])=>{let a=i.byName[r];o.garage?a.position.set(n.x+o.garage[0],n.floorY??0,n.z+o.garage[1]):a.position.copy(iu).addScaledVector(su,o.f).addScaledVector(ru,o.r).setY(be.pitLane),o.face==="car"?$a.subVectors(iu,a.position).setY(0):$a.copy(ru).multiplyScalar(o.face==="left"?-1:1),a.rotation.y=Zb($a.x,$a.z)+(o.yaw||0),a.userData.baseYaw=a.rotation.y}),i.placed=!0}function jp(i,t,e,n,s,r){let o=1-Xe(Nt(Math.abs(t-.26)/.1-.6,0,1)),a=o>.002;for(let d=0;d<i.members.length;d++)i.members[d].visible=a;if(i.materials.setFade(o),!a)return;i.placed||$b(i,n,s,r);let{gunnerFront:c,gunnerRear:l,helmet:h,engineer:u,board:f}=i.byName;c.userData.armR.rotation.z=Math.sin(e*2.4)*.08,l.userData.armR.rotation.z=Math.sin(e*2.1+1.3)*.07,h.userData.head.rotation.y=Math.sin(e*.7)*.25,u.userData.head.rotation.y=-.15+Math.sin(e*.45)*.2,f.userData.head.rotation.y=Math.sin(e*.9+.5)*.12}function Qp(i,t,e){let n=Xe(Nt((t-.6)/.04,0,1))*(1-Xe(Nt((t-.84)/.03,0,1))),s=n>.002;for(let r=0;r<i.length;r++)i[r][0].visible=s;i.length&&(i[0][0].userData.group.setFade(n),s&&(i[0][0].userData.head.rotation.y=Math.sin(e*.5)*.2,i[3][0].userData.head.rotation.y=Math.sin(e*.3)*.5))}var tm=new D(0,1,0),ou=140,au=3300,Jb=900,Xi=70,Kb=1100,nm=.0356,im=.04,jb=60,Qb=2.5,tw=1600,ew=160,nw=40,em=16;function iw(i,t){return t==="high"&&i.capabilities.maxTextureSize>=8192?4096:2048}var sw=3.84,rw=.9,ow=.8,aw=1.1,cw=.6,lw=.75;function sm(i){return i.sunI*Math.max(.03,i.sunDir.y)+aw*i.env+cw*i.hemiI}function hw(i){return i.exp*rw*Math.pow(sw/sm(i),ow)}function rm(i,t,e){let n=new wa(16777215,4210752,.5);i.add(n);let s=new Ta(16777215,3);return s.castShadow=t.shadowMap.enabled,s.shadow.mapSize.setScalar(iw(t,e)),Object.assign(s.shadow.camera,{left:-Xi,right:Xi,top:Xi,bottom:-Xi,near:1,far:400}),s.shadow.camera.updateProjectionMatrix(),s.shadow.bias=-nm/399,s.shadow.normalBias=im,i.add(s,s.target),{hemi:n,sun:s}}function om(i,{sun:t,hemi:e,scene:n,renderer:s}){t.color.copy(i.sun),t.intensity=i.sunI,e.intensity=1,e.color.copy(i.sky).multiplyScalar(i.hemiI),e.groundColor.copy(i.gnd).multiplyScalar(lw*sm(i)),n.fog.color.copy(i.fog).convertSRGBToLinear(),n.environmentIntensity=i.env,s.toneMappingExposure=hw(i)}function am(i,t){let e=Math.max(0,t)/Jb,n=e>1e-4?e/-Math.expm1(-e):1+e/2;i.near=ou*n,i.far=au*n}function cm(i){let t=i.shadow.camera,e=i.shadow.mapSize.x,n=new D,s=new D,r=new D,o=new D,a=[[-1,-1],[1,-1],[-1,1],[1,1]],c={halfExtent:Xi,update:p},l,h,u,f,d,m;function x(y,_,v){let A=y*n.x+_*n.y+v*n.z,S=y*s.x+_*s.y+v*s.z,w=y*g.x+_*g.y+v*g.z;A<l&&(l=A),A>h&&(h=A),S<u&&(u=S),S>f&&(f=S),w<d&&(d=w),w>m&&(m=w)}let g=tm;function p(y,_,v){g=y,n.crossVectors(tm,y),n.lengthSq()<1e-8&&n.set(1,0,0),n.normalize(),s.crossVectors(y,n).normalize(),l=u=d=1/0,h=f=m=-1/0;let A=_.position,S=Math.max(0,A.y),w=Math.min(tw,jb+Qb*S);x(A.x,0,A.z),x(v.x,Math.min(v.y,0),v.z);let E=_.projectionMatrix.elements,b=_.matrixWorld.elements;for(let ct=0;ct<4;ct++){let ht=(a[ct][0]+E[8])/E[0],Mt=(a[ct][1]+E[9])/E[5];r.set(b[0]*ht+b[4]*Mt-b[8],b[1]*ht+b[5]*Mt-b[9],b[2]*ht+b[6]*Mt-b[10]);let j=Math.hypot(r.x,r.z)||1e-6,Y=w/j;r.y<0&&(Y=Math.min(Y,S/-r.y)),x(A.x+r.x*Y,Math.max(0,A.y+r.y*Y),A.z+r.z*Y)}let M=.5*Math.max(h-l,f-u)*1.04,R=Math.ceil(Math.log2(Math.max(1,M/Xi))*em),N=Math.min(Kb,Xi*Math.pow(2,R/em)),L=2*N/e,C=Math.round((l+h)/2/L)*L,B=Math.round((u+f)/2/L)*L,U=(d+m)/2;o.set(0,0,0).addScaledVector(n,C).addScaledVector(s,B).addScaledVector(y,U);let z=(m-d)/2,F=z+ew;i.position.copy(o).addScaledVector(y,F),i.target.position.copy(o);let J=F+z+nw;(N!==t.right||J!==t.far)&&(t.left=t.bottom=-N,t.right=t.top=N,t.near=1,t.far=J,t.updateProjectionMatrix());let $=N/Xi;i.shadow.bias=-(nm*$)/(J-1),i.shadow.normalBias=im*$,c.halfExtent=N}return c}var uu=1,uw=.35,fw=.008,dw=.06,pw=10,cu=[.43,.45],lu=[.6,.635],hu=[6,14],mw=.002;function lm(i){i.traverse(t=>{t.isMesh&&!t.userData.noMask&&t.layers.enable(uu)})}function hm(i){i.traverse(t=>{t.isLight&&t.layers.enable(uu)})}function um(i){if(i!=="high")return null;try{let t=new Pn(4,4,{samples:4,colorSpace:Ie,internalFormat:"RGBA8"});t.isXRRenderTarget=!0,t.depthTexture=new ir(4,4);let e=new Pn(4,4,{depthBuffer:!1,format:yi}),n=new Mn({depthTest:!1,depthWrite:!1,toneMapped:!1,defines:{TAPS:pw},uniforms:{tColor:{value:t.texture},tDepth:{value:t.depthTexture},tMask:{value:e.texture},uInvVP:{value:new Gt},uPrevVP:{value:new Gt},uAmt:{value:0},uMaxLen:{value:fw},uAspect:{value:1},uNearFar:{value:new ft(.3,9e3)},uDepthTolerance:{value:dw}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }",fragmentShader:`uniform sampler2D tColor, tDepth, tMask; uniform mat4 uInvVP, uPrevVP;
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
          }`}),s=new bt(new ve(2,2),n);s.frustumCulled=!1;let r=new zi;return r.add(s),{rt:t,maskRT:e,mat:n,pScene:r,pCam:new er(-1,1,1,-1,0,1),maskMat:new Be({color:16777215,fog:!1}),vp:new Gt,prev:new Gt,hasPrev:!1,size:new ft,clearColor:new Ot,ok:!0}}catch{return null}}function ms(i){i&&(i.hasPrev=!1)}function fm(i,t,e){if(!i)return 0;let n=Xe(Nt((t-cu[0])/(cu[1]-cu[0]),0,1))*(1-Xe(Nt((t-lu[0])/(lu[1]-lu[0]),0,1))),s=1-Xe(Nt((e-hu[0])/(hu[1]-hu[0]),0,1));return n*s}function dm(i,t,e,n,s){if(e.updateMatrixWorld(),n&&(n.vp.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.hasPrev||n.prev.copy(n.vp)),s>mw&&n&&n.ok)try{i.getDrawingBufferSize(n.size);let r=n.size.x,o=n.size.y;(n.rt.width!==r||n.rt.height!==o)&&(n.rt.setSize(r,o),n.maskRT.setSize(r,o)),i.setRenderTarget(n.rt),i.render(t,e);let a=i.shadowMap.autoUpdate;i.shadowMap.autoUpdate=!1;let c=t.overrideMaterial,l=i.getClearAlpha();i.getClearColor(n.clearColor),t.overrideMaterial=n.maskMat,e.layers.set(uu),i.setRenderTarget(n.maskRT),i.setClearColor(0,1),i.clear(),i.render(t,e),e.layers.set(0),t.overrideMaterial=c,i.setClearColor(n.clearColor,l),i.shadowMap.autoUpdate=a;let h=n.mat.uniforms;h.uInvVP.value.copy(n.vp).invert(),h.uPrevVP.value.copy(n.prev),h.uAmt.value=s*uw,h.uAspect.value=r/o,h.uNearFar.value.set(e.near,e.far),i.setRenderTarget(null),i.render(n.pScene,n.pCam)}catch{n.ok=!1,i.setRenderTarget(null),i.render(t,e)}else i.render(t,e);n&&(n.prev.copy(n.vp),n.hasPrev=!0)}function gw(i){let t=i.geometry,e=t.attributes.color;return[i.isInstancedMesh?"instanced":"single",i.isInstancedMesh&&i.instanceColor?"instance-colour":"",e&&e.itemSize===4?"vertex-alpha":"",t.attributes.tangent?"tangents":"",t.morphAttributes.position||t.morphAttributes.normal?"morph":"",i.isSkinnedMesh?"skinned":""].join("|")}function xw(i){let t=i.userData;i.userData={};let e=i.clone();return i.userData=e.userData=t,Object.prototype.hasOwnProperty.call(i,"onBeforeCompile")&&(e.onBeforeCompile=i.onBeforeCompile),Object.prototype.hasOwnProperty.call(i,"customProgramCacheKey")&&(e.customProgramCacheKey=i.customProgramCacheKey),e.drawOrderId=i.drawOrderId??i.id,e}function yw(i){return i.alphaTest>0&&(i.map||i.alphaMap)||i.displacementMap&&i.displacementScale!==0||i.clipShadows&&i.clippingPlanes&&i.clippingPlanes.length>0}function pm(i){let t=new Map,e=[];i.traverse(r=>{if(!r.isMesh||Array.isArray(r.material))return;let o=gw(r),a=t.get(r.material);a||t.set(r.material,a=new Map),a.has(o)||a.set(o,[]),a.get(o).push(r),r.isInstancedMesh&&r.castShadow&&!r.customDepthMaterial&&e.push(r)});let n=0;for(let[r,o]of t){if(o.size<2)continue;let a=[...o.values()].sort((c,l)=>l.length-c.length);for(let c of a.slice(1)){let l=xw(r);n++;for(let h of c)h.material=l}}let s=new Map;for(let r of e){if(yw(r.material))continue;let o=r.instanceColor?"colour":"plain";s.has(o)||s.set(o,new rs({depthPacking:so})),r.customDepthMaterial=s.get(o)}return{copies:n,depthMaterials:s.size}}function mm(i,t){if(i.groupOrder!==t.groupOrder)return i.groupOrder<t.groupOrder?-1:1;if(i.renderOrder!==t.renderOrder)return i.renderOrder<t.renderOrder?-1:1;let e=i.material.drawOrderId??i.material.id,n=t.material.drawOrderId??t.material.id;return e!==n?e<n?-1:1:i.z!==t.z?i.z<t.z?-1:1:i.id-t.id}var gm=[0,.2,.425,.665,.885],_w=.26,vw=2.6,Mw=.01,Sw=2.5;function bw(i,t,e,n){let s=2/_w,r=s*n,o=1/(1+r+.48*r*r+.235*r*r*r),a=t-e,c=(i.velocity+s*a)*n;i.velocity=(i.velocity-s*c)*o;let l=e+(a+c)*o;return e-t>0==l>e&&(l=e,i.velocity=0),l}function xm(){let i={target:0,value:0,velocity:0,intro:0,introDone:!1,advance(t,e=!1){if(!i.introDone){let n=i.target>Mw?Sw:1;i.intro+=t*n/vw,i.intro>=1&&i.finishIntro()}i.value=bw(i,i.value,i.target,t),e&&(i.value=i.target,i.velocity=0)},finishIntro(){i.intro=1,i.introDone=!0},get introEase(){return Ad(Nt(i.intro,0,1))}};return i}function ym(i){return i==="high"?2:i==="mid"?1.75:1}function _m(i,t){let e=new pa({canvas:i,antialias:t!=="low",powerPreference:"high-performance",alpha:!1});return e.setPixelRatio(1),e.toneMapping=Eh,e.outputColorSpace=Ie,e.shadowMap.enabled=t!=="low",e.shadowMap.type=Ah,e}function vm(i,t,e,n){let s=0,r=0,o=0,a=0,c=0,l=0,h=1,u=typeof ResizeObserver=="function"?new ResizeObserver(d=>{for(let m of d){s=m.contentRect.width,r=m.contentRect.height;let x=m.devicePixelContentBoxSize&&m.devicePixelContentBoxSize[0];o=x?x.inlineSize:0,a=x?x.blockSize:0}}):null;if(u)try{u.observe(i,{box:"device-pixel-content-box"})}catch{u.observe(i)}function f(){if(!u||!s){let p=i.getBoundingClientRect();s=p.width,r=p.height}let d=window.devicePixelRatio||1,m=Math.min(d,n)*h,x,g;return o&&m>=d-.001&&Math.abs(o-s*d)<=2&&Math.abs(a-r*d)<=2?(x=o,g=a):(x=Math.max(1,Math.round(s*m)),g=Math.max(1,Math.round(r*m))),x===c&&g===l?!1:(c=x,l=g,t.setSize(c,l,!1),e.aspect=c/l,e.updateProjectionMatrix(),!0)}return{update:f,get width(){return c},get height(){return l},get resScale(){return h},set resScale(d){h=d}}}var ww=["map","normalMap","roughnessMap","metalnessMap","aoMap","bumpMap","alphaMap"];function Mm(i,t,e){let n=Math.min(e==="high"?16:e==="mid"?8:2,t.capabilities.getMaxAnisotropy());n>1&&i.traverse(s=>{if(s.material)for(let r of[].concat(s.material))for(let o of ww){let a=r[o];a&&a.isTexture&&!a.isRenderTargetTexture&&a.anisotropy<n&&(a.anisotropy=n,a.needsUpdate=!0)}})}function Sm(i){i.traverse(t=>{if(t.material)for(let e of[].concat(t.material))(e.isMeshStandardMaterial||e.isMeshBasicMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial)&&(e.dithering=!0)})}var Tm=38.75,Rm=18.8,Aw=.911,Ew=-.417,Tw=.416,Rw=.909,Cw=[[0,6.75],[.085,6.9],[.2,7.4],[.315,7.8],[.425,9.6],[.56,10.4],[.665,14.6],[.79,15.4],[.885,18.25],[1,18.62]],Iw=Gi(Cw);function Ja(i){return Iw(Nt(i,0,1))}var Mi=Math.PI/180,bm=Math.sin(Tm*Mi),wm=Math.cos(Tm*Mi),Am=Math.sin(Rm*Mi),Pw=Math.cos(Rm*Mi);function Lw(i,t){let e=(i-12)*15*Mi,n=bm*Am+wm*Pw*Math.cos(e),s=Math.asin(Nt(n,-1,1)),r=Nt((Am-n*bm)/(Math.cos(s)*wm),-1,1),o=Math.acos(r)/Mi;return t.sunEl=s/Mi,t.sunAz=e>0?360-o:o,t}function Dw(i,t,e){let n=i*Mi,s=t*Mi,r=Math.cos(n),o=Math.cos(s)*r,a=Math.sin(s)*r;return e.set(o*Aw+a*Tw,Math.sin(n),o*Ew+a*Rw).normalize()}var ho=[{hour:6.75,sun:16773340,sunI:3.3,sky:12178414,gnd:6122060,hemiI:.4,zen:5343957,hor:9751025,env:.6,exp:1.35,lift:.06},{hour:8,sun:16774632,sunI:3.5,sky:12375534,gnd:6253390,hemiI:.4,zen:5080787,hor:10341873,env:.6,exp:1.12,lift:.06},{hour:10.5,sun:16775922,sunI:3.7,sky:12769518,gnd:6384720,hemiI:.4,zen:4883152,hor:11129584,env:.6,exp:1,lift:.05},{hour:15,sun:16774114,sunI:3.6,sky:12900072,gnd:6318671,hemiI:.4,zen:5277133,hor:11325418,env:.6,exp:1,lift:.07},{hour:17.6,sun:16765594,sunI:3.4,sky:13815238,gnd:6184777,hemiI:.4,zen:6391234,hor:14665634,env:.6,exp:1.1,lift:.18},{hour:18.62,sun:16754260,sunI:3.2,sky:15123360,gnd:6050884,hemiI:.4,zen:7245760,hor:15906162,env:.6,exp:1.25,lift:.3}],fu=["sun","sky","gnd","zen","hor"],Cm=["sunI","hemiI","env","exp","lift"],Nw=new Set(["zen","hor"]),Em=ho.map(i=>{let t={};for(let e of fu)t[e]=Nw.has(e)?new Ot().setHex(i[e],Hi):new Ot().setHex(i[e]);return t});function Ka(){let i={hour:0,sunEl:0,sunAz:0,sunDir:new D,fog:new Ot};for(let t of fu)i[t]=new Ot;for(let t of Cm)i[t]=0;return i}function ja(i,t){t.hour=i,Lw(i,t),Dw(t.sunEl,t.sunAz,t.sunDir);let e=0;for(;e<ho.length-2&&i>ho[e+1].hour;)e++;let n=ho[e],s=ho[e+1],r=Xe(Nt((i-n.hour)/(s.hour-n.hour),0,1));for(let o of Cm)t[o]=n[o]+(s[o]-n[o])*r;for(let o of fu)t[o].copy(Em[e][o]).lerp(Em[e+1][o],r);return t.fog.copy(t.hor),t}var Uw=8e3,Im=.2,Fw=.75;function du(){return new Mn({side:hn,depthWrite:!1,fog:!1,uniforms:{zen:{value:new Ot},hor:{value:new Ot},sunDir:{value:new D(0,1,0)},sunCol:{value:new Ot},lift:{value:0},dither:{value:1}},vertexShader:"varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",fragmentShader:`uniform vec3 zen, hor, sunCol; uniform vec3 sunDir; uniform float lift, dither; varying vec3 vP;
      void main(){ vec3 p = normalize(vP); float h = clamp(p.y, -.2, 1.); float k = pow(clamp(h, 0., 1.), .55);
        vec3 c = mix(hor, zen, k);
        c += lift * 4. * k * (1. - k) * (vec3(1.) - c);
        float s = max(dot(p, sunDir), 0.);
        c += sunCol * (pow(s, 380.) * 2.2 + pow(s, 12.) * .16 + pow(s, 3.) * .05 * (1. - k));
        c = mix(c, hor * .92, smoothstep(0., -.2, p.y));
        gl_FragColor = vec4(c + dither * (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - .5) / 255., 1.);
      }`})}function Pm(i){return new bt(new jn(Uw,32,16),i)}function Lm(i,t){let e=i.uniforms;e.zen.value.copy(t.zen),e.hor.value.copy(t.hor),e.sunDir.value.copy(t.sunDir),e.sunCol.value.copy(t.sun).convertLinearToSRGB(),e.lift.value=t.lift}function Dm({renderer:i,scene:t,quality:e}){let n=new nr(i),s=new zi,r=du();r.uniforms.dither.value=0,s.add(new bt(new jn(100,32,16),r));let o=new Be({color:5595212}),a=new bt(new xi(90,32),o);a.rotation.x=-Math.PI/2,a.position.y=-8,s.add(a);let c=new Gr(e==="high"?256:128,{type:fs,generateMipmaps:!1}),l=new Hr(.1,200,c),h=Ka(),u=null,f=NaN;function d(x){ja(x,h);let g=r.uniforms;g.zen.value.copy(h.zen).convertSRGBToLinear(),g.hor.value.copy(h.hor).convertSRGBToLinear(),g.sunDir.value.copy(h.sunDir),g.sunCol.value.copy(h.sun),g.lift.value=h.lift;let p=(h.sunI*Math.max(0,h.sunDir.y)+h.hemiI)/Math.PI;o.color.copy(h.gnd).multiplyScalar(Fw*p),l.update(i,s),u=n.fromCubemap(c.texture,u),t.environment=u.texture}function m(x){let g=Math.round(x/Im);return g===f?!1:(f=g,d(g*Im),!0)}return{update:m,get step(){return f}}}var Ow=15282981,Bw=1,mu=4.5,zw=.006,kw=3,Vw=1.5,Fm=30,Hw=50,pu=.334,Gw=.388,Ww=.008,Nm=.39,Xw=.408,Yw=.9,Um=.15,qw=`attribute float aSide;
attribute float aArc;
attribute vec2 aAcross;
uniform float uWidth;
uniform float uMaxWidth;
uniform float uMinPixels;
uniform vec2 uViewport;
varying float vArc;
varying float vSidePixels;
varying float vHalfPixels;
`,Zw=`#include <begin_vertex>
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
}`,$w=`uniform float uHead;
uniform float uFeather;
varying float vArc;
varying float vSidePixels;
varying float vHalfPixels;
`,Jw=`#include <color_fragment>
diffuseColor.a *= 1.0 - smoothstep(uHead - uFeather, uHead, vArc);
diffuseColor.a *= clamp(vHalfPixels - abs(vSidePixels), 0.0, 1.0);`;function Kw(i){let{line:t}=i,e=t.count,n=new Float32Array((e+1)*6),s=new Float32Array((e+1)*4),r=new Float32Array((e+1)*2),o=new Float32Array((e+1)*2),a=new Float32Array((e+1)*6);for(let h=0;h<=e;h++){let u=h%e;for(let[f,d]of[[0,1],[1,-1]]){let m=2*h+f;n.set([t.x[u]+t.nx[u]*d*mu*.5,be.highlight,t.z[u]+t.nz[u]*d*mu*.5],m*3),s.set([t.nx[u],t.nz[u]],m*2),r[m]=d,o[m]=h*t.spacing/t.length,a[m*3+1]=1}}let c=[];for(let h=0;h<e;h++)c.push(2*h,2*h+2,2*h+1,2*h+1,2*h+2,2*h+3);let l=new fe;return l.setAttribute("position",new zt(n,3)),l.setAttribute("normal",new zt(a,3)),l.setAttribute("aAcross",new zt(s,2)),l.setAttribute("aSide",new zt(r,1)),l.setAttribute("aArc",new zt(o,1)),l.setIndex(c),l.computeBoundingSphere(),l.boundingSphere.radius+=Fm,l}function Om(i){let t={uHead:{value:0},uFeather:{value:Hw/i.line.length},uWidth:{value:mu},uMaxWidth:{value:Fm},uMinPixels:{value:3},uViewport:{value:new ft(1,1)}},e=new Be({color:Ow,transparent:!0,opacity:0,depthWrite:!1,fog:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4});e.onBeforeCompile=c=>{Object.assign(c.uniforms,t),c.vertexShader=qw+c.vertexShader.replace("#include <begin_vertex>",Zw),c.fragmentShader=$w+c.fragmentShader.replace("#include <color_fragment>",Jw)};let n=new bt(Kw(i),e);n.name="track-highlight",n.renderOrder=2;let s=new de,r=1;n.onBeforeRender=c=>{c.getCurrentViewport(s),t.uViewport.value.set(s.z,s.w),t.uMinPixels.value=Math.max(zw*Math.min(s.z,s.w),kw*r,Vw)};let o=0,a=0;return{mesh:n,update(c,l,h=!1,u=1){r=u;let f=Xe(Nt((c-pu)/(Gw-pu),0,1));if(h||!(l>0))o=a=f;else{let x=o,g=Yw*l;o=f>o?Math.min(f,o+g):Math.max(f,o-g);let p=(o-x)/l,y=Math.exp(-l/Um);a=o-p*Um*(1-y)+(a-x)*y}let d=Nt((c-pu)/Ww,0,1),m=1-Xe(Nt((c-Nm)/(Xw-Nm),0,1));e.opacity=d*m*Bw*Math.min(1,a*40),n.visible=e.opacity>.01,t.uHead.value=a*(1+t.uFeather.value)}}}var uo=[.42,.7],jw=1.9;function Fn(i,t=1){let e=new Ot(i);return`vec3(${(e.r*t).toFixed(4)}, ${(e.g*t).toFixed(4)}, ${(e.b*t).toFixed(4)})`}var Qw=`
varying vec3 vEnvPos;
varying vec2 vEnvUv;
`,t2=`
{
  vec4 envWorld = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    envWorld = instanceMatrix * envWorld;
  #endif
  vEnvPos = (modelMatrix * envWorld).xyz;
  vEnvUv = uv;
}
`,e2=`
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
`,xr=null;function n2(i){return xr||(xr={envNoise:{value:Rp()},envDetail:{value:null},envDetailMean:{value:new de}}),xr.envDetail.value!==i&&(xr.envDetail.value=i,xr.envDetailMean.value.fromArray(i.userData.mean||[.5,.5,.5,.5])),xr}function Xn(i,t,e,{uniforms:n={},fragmentHead:s="",fragment:r={},vertex:o={}}){let a={...n2(e),...n};return i.userData.uniforms=a,i.onBeforeCompile=c=>{Object.assign(c.uniforms,a);let l=c.vertexShader.replace("#include <common>",`#include <common>
`+Qw+(o.head||"")).replace("#include <project_vertex>",`#include <project_vertex>
`+t2);for(let[u,f]of Object.entries(o))u!=="head"&&(l=l.replace(`#include <${u}>`,f));let h=c.fragmentShader.replace("#include <common>",`#include <common>
`+e2+s);for(let[u,f]of Object.entries(r))h=h.replace(`#include <${u}>`,f);c.vertexShader=l,c.fragmentShader=h},i.customProgramCacheKey=()=>"env-"+t,i.needsUpdate=!0,i}var zm="(1.0 - smoothstep(6.0, 40.0, length(vViewPosition)))";function i2(i,t){i.map=null,i.color.set(16777215);let e=new Sn(new Uint8Array(4),1,1,Ke);return e.needsUpdate=!0,Xn(i,"grass",t,{uniforms:{envCanopy:{value:e},envCanopyBounds:{value:new de(0,0,1,1)}},fragmentHead:`uniform sampler2D envCanopy;
uniform vec4 envCanopyBounds;
`,fragment:{map_fragment:`
      {
        vec2 p = vEnvPos.xz;
        float broad = texture(envNoise, p / 1730.0 + vec2(0.31, 0.77)).r;
        float mid = texture(envNoise, p / 523.0).r;
        float small = texture(envNoise, p / 151.0 + 0.5).g;
        float clump = texture(envNoise, p / 230.0 + 0.6).g;
        float dry = smoothstep(${uo[0]}, ${uo[1]}, broad * 0.45 + mid * 0.35 + small * 0.2);
        vec3 col = mix(${Fn(6254900)}, ${Fn(10259294)}, dry);
        col = mix(col, ${Fn(5070382)}, smoothstep(0.55, 0.8, clump) * (1.0 - dry) * 0.7);
        col = mix(col, ${Fn(12101752)}, smoothstep(0.62, 0.9, small) * dry * 0.55);
        float soil = smoothstep(0.72, 0.85, texture(envNoise, p / 410.0 + 0.2).g) * smoothstep(0.45, 0.75, dry);
        col = mix(col, ${Fn(11771004)}, soil * 0.65);
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
        diffuseColor.rgb *= col * ${jw.toFixed(2)} * (1.0 + 0.8 * (blades - envDetailMean.g)) * max(0.6, 1.0 + 0.08 * tussock)
          * (0.82 + 0.36 * tufts) * (1.0 - 0.55 * canopy);
      }`}})}function Bm(i,t,{trackFrame:e,lapLength:n=1}){return i.map=null,Xn(i,e?"asphalt-track":"asphalt-pit",t,{uniforms:e?{envLapLength:{value:n},envAlongScale:{value:12}}:{},fragmentHead:e?`uniform float envLapLength; uniform float envAlongScale;
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
      normal = envBump(-vViewPosition, normal, envAsphaltH, 0.004 * ${zm});`}})}function s2(i,t,e,n){return Xn(i,"rubber",t,{uniforms:{envLap:{value:e},envLapLength:{value:n}},fragmentHead:`uniform sampler2D envLap; uniform float envLapLength;
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
      }`}})}function r2(i,t){return Xn(i,"lines",t,{fragment:{map_fragment:`
      {
        vec2 p = vEnvPos.xz;
        float wear = texture(envNoise, p / 9.7).g * 0.55 + texture(envNoise, p / 2.3).g * 0.3
          + texture(envNoise, p / 0.71).a * 0.15;
        float worn = smoothstep(0.5, 0.82, wear);
        diffuseColor.rgb = mix(diffuseColor.rgb, ${Fn(7039850)}, worn * 0.7);
      }`}})}function o2(i,t){return Xn(i,"kerb",t,{fragment:{map_fragment:`
      {
        vec4 block = texture2D(map, vMapUv);
        vec2 p = vEnvPos.xz;
        float across = vMapUv.x;
        float along = vMapUv.y * 6.0;
        float fade = texture(envNoise, p / 23.0).r * 0.65 + texture(envNoise, p / 4.1).g * 0.35;
        float blue = clamp((block.b - block.r) * 1.6, 0.0, 1.0);
        vec3 faded = mix(block.rgb * 0.93, ${Fn(7782892)}, blue);
        vec3 col = mix(block.rgb, faded, 0.7 * smoothstep(0.5, 0.85, fade));
        float marks = smoothstep(0.6, 0.85, texture(envNoise, vec2(across * 1.7, along / 19.0)).g)
          * (1.0 - smoothstep(0.15, 0.6, across));
        col *= 1.0 - 0.4 * marks;
        col = mix(col, ${Fn(10326654)}, smoothstep(0.8, 1.0, across) * 0.45);
        diffuseColor.rgb *= col;
      }`}})}var a2=3.9;function c2(i,t){i.color.set(5224866);let e=new Sn(new Uint8Array(4),1,1,Ke);return e.needsUpdate=!0,Xn(i,"runoff",t,{uniforms:{envGravelMask:{value:e},envGravelBounds:{value:new de(0,0,1,1)}},fragmentHead:`uniform sampler2D envGravelMask;
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
        float fromEdge = (1.0 - vEnvUv.x) * ${a2.toFixed(1)};
        float reach = 0.25 + 0.85 * texture(envNoise, p / 9.0 + 0.4).g;
        float density = trap * (1.0 - smoothstep(0.0, reach, fromEdge));
        vec4 g = envNoTile(envDetail, p / 1.45, 0.07);
        // a pebble shows where its dome is higher than the density leaves (big ones first)
        float w = fwidth(g.a) + 0.05;
        float spill = smoothstep(1.0 - density - w, 1.0 - density + w, g.a) * step(0.001, density);
        vec3 pebble = ${Fn(11903624)} * (1.0 + 0.88 * (g.b - envDetailMean.b));
        diffuseColor.rgb = mix(diffuseColor.rgb * col, pebble, spill);
      }`}})}var l2=[512,288],h2=[-800,-450,800,450];function km(i,t){let[e,n]=l2,[s,r,o,a]=h2,c=e/(o-s),l=n/(a-r),h=new Uint8Array(e*n);t.updateMatrixWorld(!0);let u=new Float64Array(6);t.traverse(g=>{if(!g.isMesh||g.material!==i.gravel)return;let p=g.geometry.attributes.position,y=p.array,_=p.isInterleavedBufferAttribute?p.data.stride:3,v=p.isInterleavedBufferAttribute?p.offset:0,A=g.geometry.index?g.geometry.index.array:null,S=A?A.length:p.count,w=g.matrixWorld.elements;for(let E=0;E+2<S;E+=3){for(let C=0;C<3;C++){let B=(A?A[E+C]:E+C)*_+v,U=y[B],z=y[B+1],F=y[B+2];u[2*C]=(w[0]*U+w[4]*z+w[8]*F+w[12]-s)*c,u[2*C+1]=(w[2]*U+w[6]*z+w[10]*F+w[14]-r)*l}let b=Math.max(0,Math.floor(Math.min(u[0],u[2],u[4]))),M=Math.min(e-1,Math.floor(Math.max(u[0],u[2],u[4]))),R=Math.max(0,Math.floor(Math.min(u[1],u[3],u[5]))),N=Math.min(n-1,Math.floor(Math.max(u[1],u[3],u[5]))),L=(u[2]-u[0])*(u[5]-u[1])-(u[4]-u[0])*(u[3]-u[1]);if(L){for(let C=R;C<=N;C++)for(let B=b;B<=M;B++){let U=B+.5,z=C+.5,F=((u[2]-u[0])*(z-u[1])-(U-u[0])*(u[3]-u[1]))*L,J=((u[4]-u[2])*(z-u[3])-(U-u[2])*(u[5]-u[3]))*L,$=((u[0]-u[4])*(z-u[5])-(U-u[4])*(u[1]-u[5]))*L;F>=0&&J>=0&&$>=0&&(h[C*e+B]=255)}for(let C=0;C<3;C++){let B=Math.floor(u[2*C]),U=Math.floor(u[2*C+1]);B>=0&&U>=0&&B<e&&U<n&&(h[U*e+B]=255)}}}});let f=new Uint16Array(e*n);for(let g=0;g<n;g++)for(let p=0;p<e;p++){let y=g*e+p;f[y]=h[y]+(p>0?h[y-1]:0)+(p<e-1?h[y+1]:0)}let d=new Uint8Array(e*n);for(let g=0;g<n;g++)for(let p=0;p<e;p++){let y=g*e+p,_=f[y]+(g>0?f[y-e]:0)+(g<n-1?f[y+e]:0);d[y]=Math.round(_/9)}let m=new Sn(d,e,n,yi);m.magFilter=m.minFilter=rn,m.generateMipmaps=!1,m.unpackAlignment=1,m.name="env-gravel-mask",m.needsUpdate=!0;let x=i.runoff.userData.uniforms;return x.envGravelMask.value=m,x.envGravelBounds.value.set(s,r,o,a),m}function u2(i,t){return i.map=null,i.color.set(16777215),Xn(i,"gravel",t,{fragmentHead:`float envPebbleH;
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
        vec3 col = ${Fn(11903624)} * (1.0 + 0.88 * (pebbles - envDetailMean.b)) * (0.72 + 0.56 * cluster) * (0.9 + 0.2 * broad)
          * max(0.6, 1.0 + 0.11 * ripples) * (1.0 - 0.75 * (dimples - 0.19)); // dimples average about 0.19
        col = mix(col, ${Fn(9732204)}, smoothstep(0.55, 0.85, clumps) * 0.55);
        // raked furrows across the trap (about 0.6 m apart), wavering
        float rake = 0.5 + 0.5 * sin(vEnvUv.x * 95.0 + texture(envNoise, p / 11.0).g * 6.0);
        col *= 0.9 + 0.16 * rake;
        col = mix(col, ${Fn(9074272)}, (1.0 - smoothstep(0.0, 0.12, vEnvUv.x)) * 0.5 * texture(envNoise, p / 7.0).g);
        diffuseColor.rgb *= col;
      }`,normal_fragment_maps:`
      normal = envBump(-vViewPosition, normal, envPebbleH, 0.02 * ${zm});`}})}var Qa=2048;function Vm(){let i=new Sn(new Uint8Array(Qa*4),Qa,1,Ke);return i.wrapS=sn,i.magFilter=i.minFilter=rn,i.generateMipmaps=!1,i.name="env-lap",i.needsUpdate=!0,i}function f2(i,t){let{line:e,corners:n}=t,s=e.count,r=new Float64Array(s),o=new Float64Array(s);for(let c of n)for(let l of c.subCorners||[c]){let h=0;for(let f=l.first;f<=l.last;f++)h+=Math.abs(e.curvature[f%s])*e.spacing;let u=Math.min(1,h/1.2);for(let f=-110;f<=15;f++){let d=((l.first+Math.round(f/e.spacing))%s+s)%s,m=f<-15?(f+110)/95:1-(f+15)/30;r[d]=Math.max(r[d],u*m*m)}for(let f=0;f<=40;f++){let d=(l.last+Math.round(f/e.spacing))%s;o[d]=Math.max(o[d],u*(1-f/40))}}let a=i.image.data;for(let c=0;c<Qa;c++){let l=Math.min(s-1,Math.floor((c+.5)/Qa*s));a[4*c]=Math.round(255*r[l]),a[4*c+1]=Math.round(255*o[l]),a[4*c+3]=255}i.needsUpdate=!0}function Hm(i,t,e){i2(i.ground,t),Bm(i.asphalt,t,{trackFrame:!0,lapLength:4176.6}),Bm(i.pitAsphalt,t,{trackFrame:!1}),s2(i.rubber,t,e,4176.6),r2(i.line,t),o2(i.kerb,t),c2(i.runoff,t),u2(i.gravel,t)}function Gm(i,t,e){let n=e.line.length;i.asphalt.userData.uniforms.envLapLength.value=n,i.asphalt.userData.uniforms.envAlongScale.value=n/Math.round(n/12),i.rubber.userData.uniforms.envLapLength.value=n,f2(t,e)}var Ge=2,fo=120,ni=8,Wm=60,d2=1.0824,yr=Ge/2,Xm=Ge*Math.SQRT1_2;function p2(i,t,e,n){let s=i.attributes.position,r=i.index,o=r?r.count:s.count,a=o-o%3,c=r?r.array:null,l=s.isInterleavedBufferAttribute||s.itemSize!==3?null:s.array;for(let h=0;h<a;h++){let u=c?c[h]:h,f=l?l[3*u]:s.getX(u),d=l?l[3*u+1]:s.getY(u),m=l?l[3*u+2]:s.getZ(u);e[n++]=t[0]*f+t[4]*d+t[8]*m+t[12],e[n++]=t[2]*f+t[6]*d+t[10]*m+t[14]}return n}function Ym(i,t,e){let{min:n,max:s}=i;return t[e++]=n.x,t[e++]=n.z,t[e++]=s.x,t[e++]=n.z,t[e++]=s.x,t[e++]=s.z,t[e++]=n.x,t[e++]=n.z,t[e++]=s.x,t[e++]=s.z,t[e++]=n.x,t[e++]=s.z,e}function m2(i,t,e){let[n,s,r,o]=e;for(let a=0;a<t;a+=2){let c=i[a],l=i[a+1];c<n&&(n=c),c>r&&(r=c),l<s&&(s=l),l>o&&(o=l)}e[0]=n,e[1]=s,e[2]=r,e[3]=o}function gu(i,t,e,n,s,r){let o=s-e,a=r-n,c=o*o+a*a,l=c>0?Math.max(0,Math.min(1,((i-e)*o+(t-n)*a)/c)):0,h=i-e-l*o,u=t-n-l*a;return Math.sqrt(h*h+u*u)}function g2(i,t,e,n,s,r,o,a){let c=(s-e)*(a-n)-(o-e)*(r-n);if(Math.abs(c)>1e-9){let l=c>0?1:-1,h=((s-e)*(t-n)-(i-e)*(r-n))*l,u=((o-s)*(t-r)-(i-s)*(a-r))*l,f=((e-o)*(t-a)-(i-o)*(n-a))*l;if(h>=0&&u>=0&&f>=0)return 0}return Math.min(gu(i,t,e,n,s,r),gu(i,t,s,r,o,a),gu(i,t,o,a,e,n))}function x2(i,t,e,n,s,r){for(let o=0;o<i.length;o+=6){let a=Math.max(0,Math.floor((Math.min(i[o+1],i[o+3],i[o+5])-yr-n)/Ge)),c=Math.min(r-1,Math.floor((Math.max(i[o+1],i[o+3],i[o+5])+yr-n)/Ge));for(let l=a;l<=c;l++){let h=n+(l+.5)*Ge,u=h-yr,f=h+yr,d=1/0,m=-1/0;for(let p=0;p<3;p++){let y=i[o+2*p],_=i[o+2*p+1],v=i[o+(2*p+2)%6],A=i[o+(2*p+3)%6];if(_>=u&&_<=f&&(y<d&&(d=y),y>m&&(m=y)),(_-u)*(A-u)<0){let S=y+(u-_)/(A-_)*(v-y);S<d&&(d=S),S>m&&(m=S)}if((_-f)*(A-f)<0){let S=y+(f-_)/(A-_)*(v-y);S<d&&(d=S),S>m&&(m=S)}}if(d>m)continue;let x=Math.max(0,Math.ceil((d-yr-e)/Ge-.5)),g=Math.min(s-1,Math.floor((m+yr-e)/Ge-.5));t.fill(1,l*s+x,l*s+g+1)}}}function y2(i,t,e){let n=new Float32Array(t*e);for(let r=0;r<n.length;r++)n[r]=i[r]?0:1/0;let s=Math.SQRT2;for(let r=0;r<e;r++)for(let o=0;o<t;o++){let a=r*t+o,c=n[a];o>0&&(c=Math.min(c,n[a-1]+1)),r>0&&(c=Math.min(c,n[a-t]+1),o>0&&(c=Math.min(c,n[a-t-1]+s)),o<t-1&&(c=Math.min(c,n[a-t+1]+s))),n[a]=c}for(let r=e-1;r>=0;r--)for(let o=t-1;o>=0;o--){let a=r*t+o,c=n[a];o<t-1&&(c=Math.min(c,n[a+1]+1)),r<e-1&&(c=Math.min(c,n[a+t]+1),o<t-1&&(c=Math.min(c,n[a+t+1]+s)),o>0&&(c=Math.min(c,n[a+t-1]+s))),n[a]=c}return n}function xu(i,t,e,n,s){let r=i.length/6,o=Math.ceil((n-t)/ni),a=Math.ceil((s-e)/ni),c=new Int32Array(r*4);for(let m=0,x=0;m<r;m++,x+=6)c[4*m]=Math.max(0,Math.floor((Math.min(i[x],i[x+2],i[x+4])-t)/ni)),c[4*m+1]=Math.min(o-1,Math.floor((Math.max(i[x],i[x+2],i[x+4])-t)/ni)),c[4*m+2]=Math.max(0,Math.floor((Math.min(i[x+1],i[x+3],i[x+5])-e)/ni)),c[4*m+3]=Math.min(a-1,Math.floor((Math.max(i[x+1],i[x+3],i[x+5])-e)/ni));let l=new Int32Array(o*a+1);for(let m=0;m<r;m++)for(let x=c[4*m+2];x<=c[4*m+3];x++)for(let g=c[4*m];g<=c[4*m+1];g++)l[x*o+g+1]++;for(let m=0;m<o*a;m++)l[m+1]+=l[m];let h=new Int32Array(l[o*a]),u=l.slice(0,o*a);for(let m=0;m<r;m++)for(let x=c[4*m+2];x<=c[4*m+3];x++)for(let g=c[4*m];g<=c[4*m+1];g++)h[u[x*o+g]++]=m;let f=new Uint32Array(r),d=0;return(m,x,g)=>{d++;let p=1/0,y=Math.max(0,Math.floor((m-g-t)/ni)),_=Math.min(o-1,Math.floor((m+g-t)/ni)),v=Math.max(0,Math.floor((x-g-e)/ni)),A=Math.min(a-1,Math.floor((x+g-e)/ni));for(let S=v;S<=A;S++)for(let w=y;w<=_;w++){let E=S*o+w;for(let b=l[E];b<l[E+1];b++){let M=h[b];if(f[M]===d)continue;f[M]=d;let R=6*M,N=g2(m,x,i[R],i[R+1],i[R+2],i[R+3],i[R+4],i[R+5]);N<p&&(p=N)}}return p}}function qm(i,{trackMaterial:t,skip:e=new Set,loop:n=null}){i.updateMatrixWorld(!0);let s=new xn,r=new Gt,o=C=>C.transparent&&!C.depthWrite||C.userData.envSkipOccupancy,a={track:[],solid:[]},c={track:0,solid:0},l=C=>{if(!e.has(C)){if(C.isMesh&&![].concat(C.material).every(o)){let B=[].concat(C.material).includes(t)?"track":"solid",U=C.geometry;U.boundingBox||U.computeBoundingBox();let z=!1;C.isInstancedMesh||(s.copy(U.boundingBox).applyMatrix4(C.matrixWorld),z=s.max.x-s.min.x>Wm||s.max.z-s.min.z>Wm);let F=U.index?U.index.count:U.attributes.position.count;a[B].push({node:C,large:z}),c[B]+=C.isInstancedMesh?12*C.count:z?2*(F-F%3):12}for(let B of C.children)l(B)}};l(i);let h={},u=[1/0,1/0,-1/0,-1/0];for(let C of["track","solid"]){let B=new Float64Array(c[C]),U=0;for(let{node:z,large:F}of a[C]){let J=z.geometry;if(z.isInstancedMesh)for(let $=0;$<z.count;$++)z.getMatrixAt($,r),r.premultiply(z.matrixWorld),U=Ym(s.copy(J.boundingBox).applyMatrix4(r),B,U);else F?U=p2(J,z.matrixWorld.elements,B,U):U=Ym(s.copy(J.boundingBox).applyMatrix4(z.matrixWorld),B,U)}h[C]=B,m2(B,U,u)}let[f,d,m,x]=u,g=Math.floor((f-fo)/Ge)*Ge,p=Math.floor((d-fo)/Ge)*Ge,y=Math.ceil((m+fo-g)/Ge),_=Math.ceil((x+fo-p)/Ge),v=g+y*Ge,A=p+_*Ge,S={},w={},E={};for(let C of["track","solid"]){let B=h[C];E[C]=B.length/6;let U=new Uint8Array(y*_);x2(B,U,g,p,y,_),S[C]=y2(U,y,_),w[C]=xu(B,g,p,v,A)}let b=new Uint8Array(y*_);if(n){let C=$=>($-p)/Ge-.5,B=new Int32Array(_+1),U=$=>{let ct=n.z[$],ht=n.z[($+1)%n.count];return[Math.max(0,Math.ceil(C(Math.min(ct,ht)))),Math.min(_-1,Math.floor(C(Math.max(ct,ht))))]};for(let $=0;$<n.count;$++){let[ct,ht]=U($);for(let Mt=ct;Mt<=ht;Mt++)B[Mt+1]++}for(let $=0;$<_;$++)B[$+1]+=B[$];let z=new Int32Array(B[_]),F=B.slice(0,_);for(let $=0;$<n.count;$++){let[ct,ht]=U($);for(let Mt=ct;Mt<=ht;Mt++)z[F[Mt]++]=$}let J=new Float64Array(64);for(let $=0;$<_;$++){let ct=p+($+.5)*Ge,ht=0;for(let j=B[$];j<B[$+1]&&ht<J.length;j++){let Y=z[j],Z=(Y+1)%n.count,et=n.z[Y],mt=n.z[Z];et>ct!=mt>ct&&(J[ht++]=n.x[Y]+(ct-et)/(mt-et)*(n.x[Z]-n.x[Y]))}let Mt=J.subarray(0,ht).sort();for(let j=0;j+1<ht;j+=2){let Y=Math.max(0,Math.ceil((Mt[j]-g)/Ge-.5)),Z=Math.min(y-1,Math.floor((Mt[j+1]-g)/Ge-.5));Z>=Y&&b.fill(1,$*y+Y,$*y+Z+1)}}}let M=(C,B)=>{let U=Math.floor((C-g)/Ge),z=Math.floor((B-p)/Ge);return U<0||z<0||U>=y||z>=_?-1:z*y+U},R=(C,B,U)=>{let z=M(B,U);return z<0?fo:Math.max(0,S[C][z]*Ge/d2-2*Xm)},N=(C,B,U)=>{let z=M(B,U);return z<0?1/0:S[C][z]*Ge+2*Xm},L=(C,B,U,z)=>!(z>0)||R(C,B,U)>=z?!0:N(C,B,U)<z?!1:w[C](B,U,z)>=z;return{bounds:{x0:g,z0:p,x1:v,z1:A},counts:E,trackDistance:(C,B)=>R("track",C,B),solidDistance:(C,B)=>R("solid",C,B),exact:(C,B,U,z)=>w[C](B,U,z),clear:(C,B,U,z)=>L("track",C,B,U)&&L("solid",C,B,z),infield:(C,B)=>{let U=M(C,B);return U>=0&&b[U]===1}}}var Zm=9,_2=9,v2=40,yu=2.5,tc=1.2,$m=5.5,_u=31.4,M2=22,S2=16,b2=6,vu=1.4,w2=.45,Jm=[[.45,.76],[.79,1.1]];function A2(){let i=document.createElement("canvas");i.width=4,i.height=64;let t=i.getContext("2d"),e=[[0,"#6f746f"],[.12,"#c9ccc2"],[.32,"#a6a99e"],[.5,"#5b605c"],[.68,"#a6a99e"],[.88,"#c9ccc2"],[1,"#6f746f"]],n=t.createLinearGradient(0,0,0,64);for(let[r,o]of e)n.addColorStop(r,o);t.fillStyle=n,t.fillRect(0,0,4,64);let s=new Ln(i);return s.wrapS=sn,s.colorSpace=Ie,s}function E2(i){let t=i.length,e=0;for(;e<t&&i[e];)e++;if(e===t)return[[0,t-1]];let n=[];for(let s=e;s<e+t;s++){if(!i[s%t])continue;let r=s;for(;r+1<e+t&&i[(r+1)%t];)r++;n.push([s,r]),s=r}return n}function Km(i,t){i.updateMatrixWorld(!0);let e=[],n=0;if(i.traverse(m=>{if(!m.isMesh||m.material!==t)return;let{index:x,attributes:g}=m.geometry,p=x?x.count:g.position.count;e.push(m),n+=p-p%3}),!n)return{distance:()=>1/0};let s=new Float64Array(2*n),r=new Uint8Array(n/3),o=0;for(let m of e){let x=m.geometry.attributes.position,g=m.geometry.index?m.geometry.index.array:null,p=g?g.length:x.count,y=m.matrixWorld.elements,_=o,v=0;for(let A=0;A<p-p%3;A++){let S=g?g[A]:A,w=x.getX(S),E=x.getY(S),b=x.getZ(S);if(s[o++]=y[0]*w+y[4]*E+y[8]*b+y[12],s[o++]=y[2]*w+y[6]*E+y[10]*b+y[14],A%3===2){let M=o-6,R=(s[M+2]-s[M])*(s[M+5]-s[M+1])-(s[M+4]-s[M])*(s[M+3]-s[M+1]);Math.abs(R)>1e-6&&(r[M/6]=1,v++)}}if(!v)for(let A=_;A<o;A+=6)r[A/6]=1}let a=0;for(let m=0;m<r.length;m++)a+=r[m];let c=new Float64Array(6*a),l=1/0,h=1/0,u=-1/0,f=-1/0;for(let m=0,x=0;m<r.length;m++)if(r[m])for(let g=0;g<6;g+=2){let p=c[x++]=s[6*m+g],y=c[x++]=s[6*m+g+1];p<l&&(l=p),p>u&&(u=p),y<h&&(h=y),y>f&&(f=y)}return{distance:xu(c,l-50,h-50,u+50,f+50),triangles:a,of:r.length}}function T2(i,t){let e=i.length,n=2*t+1,s=e+2*t,r=new Float64Array(s),o=new Float64Array(s),a=l=>i[((l-t)%e+e)%e];for(let l=0;l<s;l++)r[l]=l%n?Math.max(r[l-1],a(l)):a(l);for(let l=s-1;l>=0;l--)o[l]=l%n===n-1||l===s-1?a(l):Math.max(o[l+1],a(l));let c=new Float64Array(e);for(let l=0;l<e;l++)c[l]=Math.max(o[l],r[l+2*t]);return c}function R2(i,t){let e=i.length,n=new Float64Array(e),s=0;for(let r=-t;r<=t;r++)s+=i[(r+e)%e];for(let r=0;r<e;r++)n[r]=s/(2*t+1),s+=i[(r+t+1)%e]-i[(r-t+e)%e];return n}function C2(i,t,e,n){let{line:s,halfWidth:r}=i,o=s.count,a=Math.round(M2/s.spacing),c=Math.round(S2/s.spacing),l=25,h=1/0,u=1/0,f=-1/0,d=-1/0;for(let w=0;w<o;w++)h=Math.min(h,s.x[w]),u=Math.min(u,s.z[w]),f=Math.max(f,s.x[w]),d=Math.max(d,s.z[w]);let m=Math.floor((f-h)/l)+1,x=Math.floor((d-u)/l)+1,g=w=>Math.floor((s.z[w]-u)/l)*m+Math.floor((s.x[w]-h)/l),p=new Int32Array(m*x+1);for(let w=0;w<o;w++)p[g(w)+1]++;for(let w=0;w<m*x;w++)p[w+1]+=p[w];let y=new Int32Array(o),_=p.slice(0,m*x);for(let w=0;w<o;w++)y[_[g(w)]++]=w;let v=(w,E,b)=>{let M=Math.floor((w-h)/l),R=Math.floor((E-u)/l);for(let N=Math.max(0,R-1);N<=Math.min(x-1,R+1);N++)for(let L=Math.max(0,M-1);L<=Math.min(m-1,M+1);L++)for(let C=p[N*m+L];C<p[N*m+L+1];C++){let B=y[C];if(Math.min(Math.abs(B-b),o-Math.abs(B-b))<60)continue;let z=s.x[B]-w,F=s.z[B]-E,J=_2+r[B];if(z*z+F*F<J*J)return!1}return!0},A=(w,E)=>[s.x[w]+s.nx[w]*E,s.z[w]+s.nz[w]*E],S=[];for(let w of[1,-1]){let E=new Float64Array(o).fill(Zm),b=new Uint8Array(o),M=new Uint8Array(o);for(let{side:C,first:B,last:U}of i.gravel)if(C===w)for(let z=B;z<=U;z++)M[z%o]=1;let R=(C,B)=>{let[U,z]=A(C,w*(r[C]+B));return e.distance(U,z,.05)<=0};for(let C=0;C<o;C++){if(!M[C])continue;let[B,U]=A(C,w*(r[C]+_u));if(n.distance(B,U,2)<.6){b[C]=1,E[C]=_u;continue}if(!R(C,$m+.4))continue;let z=$m+.4,F=_u;for(let J=0;J<7;J++){let $=(z+F)/2;R(C,$)?z=$:F=$}E[C]=Math.max(Zm,F+yu)}let N=R2(T2(E,a),c),L=new Uint8Array(o);for(let C=0;C<o;C++){if(b[C])continue;let B=w*(r[C]+N[C]),[U,z]=A(C,B),F=z>150&&z<260&&U>-600&&U<480;L[C]=!F&&!t(U,z)&&i.edge(C,B)===B&&v(U,z,C)&&e.distance(U,z,yu+1)>=yu-.3&&n.distance(U,z,tc+1)>=tc?1:0}for(let[C,B]of E2(L)){if((B-C+1)*s.spacing<v2)continue;let U=J=>{for(let ht=1;ht<=3;ht++)if(b[(J+ht)%o]||b[(J-ht+o)%o])return!0;let[$,ct]=A(J,w*(r[J]+N[J]));return n.distance($,ct,tc+vu+3)<tc+vu+3},z=B-C+1,F=new Float64Array(z);for(let J=0;J<z;J++)F[J]=N[(C+J)%o];S.push({side:w,first:C,last:B,offset:F,wallAtStart:U(C),wallAtEnd:U(B%o)})}}return S}function jm(i,t){let{model:e,isKeepClearZone:n}=t,{line:s,halfWidth:r}=e,o=s.count,a=C2(e,n,Km(i.root,i.materials.gravel),Km(i.root,i.materials.barrier)),c=[],l=[],h=[],u=[],f=[],d=Math.round(b2/s.spacing);for(let{side:_,first:v,last:A,offset:S,wallAtStart:w,wallAtEnd:E}of a){let b=A-v+1,M=new Float64Array(b),R=new Float64Array(b),N=new Float64Array(b).fill(1);for(let L=0;L<b;L++){let C=(v+L)%o,B=r[C]+S[L],U=w?1/0:L,z=E?1/0:b-1-L,F=1-Math.min(U,z)/d;F>0&&(B+=vu*F*F,N[L]=1-(1-w2)*F*F),M[L]=s.x[C]+s.nx[C]*_*B,R[L]=s.z[C]+s.nz[C]*_*B}for(let[L,C]of Jm){let B=c.length/3,U=0;for(let z=0;z<b;z++){let F=Math.max(0,z-1),J=Math.min(b-1,z+1),$=M[J]-M[F],ct=R[J]-R[F],ht=Math.hypot($,ct)||1,Mt=_*ct/ht,j=-_*$/ht;z>0&&(U+=Math.hypot(M[z]-M[z-1],R[z]-R[z-1])),c.push(M[z],L*N[z],R[z],M[z],C*N[z],R[z]),l.push(Mt,0,j,Mt,0,j),h.push(U,0,U,1),L===Jm[0][0]&&z%2===0&&f.push([M[z]-Mt*.12,R[z]-j*.12,N[z]])}for(let z=0;z<b-1;z++){let F=B+2*z;u.push(F,F+2,F+1,F+1,F+2,F+3)}}}if(!a.length)return a;let m=new fe;m.setAttribute("position",new zt(c,3)),m.setAttribute("normal",new zt(l,3)),m.setAttribute("uv",new zt(h,2)),m.setIndex(u);let x=new yt({map:A2(),color:14211792,roughness:.5,metalness:.45,side:Pe}),g=new bt(m,x);g.name="armco",g.castShadow=!0,g.receiveShadow=!0,i.root.add(g);let p=new $e(new oe(.06,.06,1,6),i.materials.steelDark,f.length);p.name="armco-posts";let y=new Gt;return f.forEach(([_,v,A],S)=>p.setMatrixAt(S,y.makeScale(1,1.15*A,1).setPosition(_,.55*A,v))),p.castShadow=!0,p.receiveShadow=!0,i.root.add(p),a}function Qm(i){let t=[];if(i.root.traverse(s=>{if(!s.isMesh||s.material!==i.materials.barrier)return;let r=s.geometry.attributes.position,o=s.geometry.attributes.normal,a=r.getX(0),c=r.getZ(0),l=r.getX(2),h=r.getZ(2),u=Math.hypot(l-a,h-c)||1,f=(l-a)/u,d=(h-c)/u,m=o.getX(0),x=o.getZ(0);for(let g=0;g<3;g++)t.push([a+f*(.4+g*.72)+m*.45,c+d*(.4+g*.72)+x*.45])}),!t.length)return;let e=new $e(new oe(.33,.33,.24,14),new yt({color:424827,roughness:.8}),t.length*5),n=new Gt;t.forEach(([s,r],o)=>{for(let a=0;a<5;a++)e.setMatrixAt(o*5+a,n.makeTranslation(s,.12+a*.245,r))}),e.castShadow=!0,e.receiveShadow=!0,e.name="tyre-stacks",i.root.add(e)}function t0(i){let{rng:t,root:e,updaters:n,density:s}=i,r=new _e;r.name="clouds",e.add(r);let o=Math.round(22*Math.max(.5,s));for(let a=0;a<o;a++){let c=new Yr({map:Pp(a+3),transparent:!0,depthWrite:!1,fog:!1,opacity:.85}),l=new xa(c),h=t()*Math.PI*2,u=900+t()*1300;l.position.set(Math.cos(h)*u,220+t()*260,Math.sin(h)*u);let f=380+t()*420;l.scale.set(f,f*.42,1),l.userData.v=.6+t()*1.2,r.add(l)}n.push((a,c)=>{for(let l of r.children)l.position.x+=l.userData.v*c*2.2,l.position.x>2400&&(l.position.x=-2400)})}var po={straightZ:206,straightX0:420,straightX1:-534,trackHalf:7,pitWallZ:198,pitLaneZ:191.5,garageFrontZ:185.5,garageDepth:17,boxW:6.7,boxes:30,pitX0:-150.5,get pitX1(){return this.pitX0+this.boxes*this.boxW},towerX:64,gantryX:-96,grandstandZ:224,grandstandX0:-190,grandstandX1:110,paddock:{x0:-170,x1:120,z0:96,z1:166}};var I2={high:8,mid:4,low:2},P2={high:512,mid:512,low:256};function e0(i="high"){return{detail:Bp(I2[i]||4,P2[i]||512),lap:Vm(),kerb:Cp(),barrier:Ip(),blob:Lp(),ao:Dp(),shutter:Np()}}var Mu={transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1};function n0(i){let t={ground:new yt({roughness:1,color:16777215,vertexColors:!0}),asphalt:new yt({roughness:.82,metalness:0,color:5131596}),pitAsphalt:new yt({roughness:.86,color:5723991}),rubber:new Be({color:723981,opacity:.16,...Mu}),ao:new Be({map:i.ao,...Mu}),contact:new Be({map:Ya(128,128,{hx:.34,hy:.34,rr:.2,fade:.15,alpha:.6}),...Mu}),line:new yt({color:15921644,roughness:.7}),kerb:new yt({map:i.kerb,roughness:.6}),runoff:new yt({color:5224866,roughness:.8}),gravel:new yt({roughness:1,color:16777215}),barrier:new yt({map:i.barrier,roughness:.85}),concrete:new yt({color:14276560,roughness:.92}),concreteDark:new yt({color:10988978,roughness:.9}),white:new yt({color:15131870,roughness:.8}),steel:new yt({color:10200234,roughness:.45,metalness:.6}),steelDark:new yt({color:6120555,roughness:.5,metalness:.55}),glass:new yt({color:6256260,roughness:.12,metalness:.9,envMapIntensity:1.2}),shutter:new yt({map:i.shutter,color:16777215,roughness:.5,metalness:.3}),seat:new yt({color:5144467,roughness:.7}),roofW:new yt({color:15855593,roughness:.6,side:Pe}),red:new yt({color:15282981,roughness:.55}),trunk:new yt({color:7034695,roughness:1}),pine:new yt({color:16777215,roughness:1}),oak:new yt({color:16777215,roughness:1}),shrub:new yt({color:16777215,roughness:1}),hill:new yt({color:7043676,roughness:1,flatShading:!1}),interior:new yt({color:14276561,roughness:.8}),floor:new yt({color:9343640,roughness:.55,metalness:.1}),blob:new Be({map:i.blob,transparent:!0,depthWrite:!1}),toolChest:new yt({color:1316120,roughness:.45,metalness:.3})};return Hm(t,i.detail,i.lap),t}function i0(i){let t=Up();return t.repeat.set(i,1),new yt({map:t,roughness:.18,metalness:.55,envMapIntensity:1.1})}function L2(i){return i==="high"?1:i==="mid"?.6:.35}function s0(i,t){let e=L2(t),n=new _e;n.name="world";let s=i.map(([f,d])=>new ft(f,d)),r=Ue(42),o=[],a=e0(t),c=n0(a);function l(f,d,m,x,g,p=1,y=.06,_=n){let v=Math.hypot(m-f,x-d),A=new ve(v,g);A.rotateX(-Math.PI/2);let S=new bt(A,c.ao),w=Math.atan2(x-d,m-f),E=-Math.sin(w)*p,b=Math.cos(w)*p;return S.position.set((f+m)/2+E*g/2,y,(d+x)/2+b*g/2),S.rotation.y=-w+(p>0?0:Math.PI),S.renderOrder=1,_.add(S),S}function h(f,d,m,x,g=0,p=n){let y=new bt(new ve(m,x),c.contact);return y.rotation.x=-Math.PI/2,y.rotation.z=g,y.position.set(f,.055,d),y.renderOrder=1,p.add(y),y}function u(f,d,m,x,g,p,y,_=n,v=!0){let A=new bt(new We(f,d,m),x);return A.position.set(g,p+d/2,y),A.castShadow=v,A.receiveShadow=!0,_.add(A),A}return{quality:t,density:e,root:n,track:s,rng:r,updaters:o,textures:a,materials:c,layout:po,glazingMaterial:i0,addAoStrip:l,addContactShadow:h,addBox:u}}var D2=6,N2=2.4,U2=1.5;function mo(i,t,e,n,s,r){let{materials:o,updaters:a}=i,c=new bt(new oe(.05,.06,D2,6),o.steel);c.position.set(t,e+3,n),r.add(c);let l=new ve(N2,U2,16,6);l.translate(1.2,0,0);let h=new yt({color:s,side:Pe,roughness:.8});h.onBeforeCompile=f=>{f.uniforms.uTime={value:0},h.userData.sh=f,f.vertexShader=`uniform float uTime;
`+f.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        float k = position.x / 2.4;
        transformed.z += sin(position.x * 2.1 - uTime * 4.2 + ${(t*.1).toFixed(2)}) * .22 * k;
        transformed.y += sin(position.x * 1.3 - uTime * 3.1) * .06 * k;`)};let u=new bt(l,h);u.position.set(t,e+5.1,n),u.castShadow=!0,r.add(u),a.push(f=>{h.userData.sh&&(h.userData.sh.uniforms.uTime.value=f)})}var r0=new We(1,1,1),o0=new Gt,a0=new re,Su=new Oe,F2=new D,O2=new D,Yi=new D,B2=new D(0,1,0);function gs(){let i=new Map,t=0;return{get count(){return t},add(e,n,s,r,o,a,c,{castShadow:l=!0,yaw:h=0,pitch:u=0}={}){i.has(r)||i.set(r,{cast:[],still:[]}),Su.setFromAxisAngle(B2,h),u&&Su.multiply(new Oe().setFromAxisAngle(new D(1,0,0),u)),o0.compose(O2.set(o,a+n/2,c),Su,F2.set(e,n,s)),i.get(r)[l?"cast":"still"].push(o0.clone()),t++},build(e,n="batch"){let s=[],r=r0.attributes,o=r0.index.array;for(let[a,c]of i)for(let[l,h]of Object.entries(c)){if(!h.length)continue;let u=r.position.count,f=new Float32Array(h.length*u*3),d=new Float32Array(h.length*u*3),m=new Float32Array(h.length*u*2),x=new Uint32Array(h.length*o.length);h.forEach((y,_)=>{a0.getNormalMatrix(y);for(let v=0;v<u;v++)Yi.fromBufferAttribute(r.position,v).applyMatrix4(y),f.set([Yi.x,Yi.y,Yi.z],(_*u+v)*3),Yi.fromBufferAttribute(r.normal,v).applyMatrix3(a0).normalize(),d.set([Yi.x,Yi.y,Yi.z],(_*u+v)*3),m[(_*u+v)*2]=r.uv.getX(v),m[(_*u+v)*2+1]=r.uv.getY(v);for(let v=0;v<o.length;v++)x[_*o.length+v]=o[v]+_*u});let g=new fe;g.setAttribute("position",new zt(f,3)),g.setAttribute("normal",new zt(d,3)),g.setAttribute("uv",new zt(m,2)),g.setIndex([...x]);let p=new bt(g,a);p.name=n,p.castShadow=l==="cast",p.receiveShadow=!0,e.add(p),s.push(p)}return s}}}var z2=18,c0=-.08,bu=20,ec=1.3,l0=8,k2=.5;function V2(){let i=document.createElement("canvas");i.width=256,i.height=64;let t=i.getContext("2d"),e=Ue(301);t.fillStyle="#20262c",t.fillRect(0,0,256,64);for(let s=0;s<l0;s++){let r=e()<.22;t.fillStyle=r?"#5583a1":"#1a66aa",t.fillRect(s*32+3,4,26,56),t.fillStyle="rgba(255,255,255,.18)",t.fillRect(s*32+3,4,26,5),t.fillStyle="rgba(0,0,0,.22)",t.fillRect(s*32+3,40,26,4)}let n=new Ln(i);return n.wrapS=n.wrapT=sn,n.colorSpace=Ie,n.anisotropy=8,n}function h0(i){let{root:t,materials:e}=i,n=i.layout,s=new _e;s.name="grandstand",t.add(s);let r=n.grandstandX1-n.grandstandX0,o=(n.grandstandX0+n.grandstandX1)/2,a=n.grandstandZ,c=gs(),l=[];for(let x=n.grandstandX0+bu;x<n.grandstandX1-1;x+=bu)l.push(x);let h=[n.grandstandX0+1,...l,n.grandstandX1-1],u=bu-ec,f=new yt({map:V2(),roughness:.62});f.map.repeat.set(u/(l0*k2),1);let d=new yt({color:14210508,roughness:.85});for(let x=0;x<z2;x++){let g=1.2+x*.55,p=a+x*.85;c.add(r,.45,.9,e.concreteDark,o,g,p,{castShadow:x%3===0});for(let y=0;y+1<h.length;y++){let _=h[y]+(y>0?ec/2:0),v=h[y+1]-(y+2<h.length?ec/2:0),A=Math.min(u,v-_);c.add(A,.34,.38,f,(_+v)/2,g+.45,p-.1,{castShadow:!1})}for(let y of l)c.add(ec-.1,.03,.08,d,y,g+.45,p-.41,{castShadow:!1})}c.add(r,1.2,16,e.concreteDark,o,0,a+7.5),c.add(r,11,1,e.white,o,0,a+16);for(let x of[n.grandstandX0-.3,n.grandstandX1+.3])for(let g=0;g<6;g++)c.add(.4,2.4+g*1.65,2.6,e.white,x,0,a+1.3+g*2.55);c.add(r,.06,.06,e.steel,o,2.25,a-.42,{castShadow:!1});for(let x=n.grandstandX0+1;x<=n.grandstandX1-1;x+=2.5)c.add(.05,1,.05,e.steel,x,1.25,a-.42,{castShadow:!1});for(let x=n.grandstandX0;x<=n.grandstandX1+.1;x+=20)c.add(.5,16.5,.5,e.steel,x,0,a+16.2),c.add(.35,1.4,21,e.steel,x,16.6,a+7.5,{pitch:c0});c.build(s,"grandstand");let m=new bt(new We(r+4,.2,22),e.roofW);m.position.set(o,16.5,a+7.5),m.rotation.x=c0,m.castShadow=!0,m.receiveShadow=!0,s.add(m),H2(s,m,r+4,22)}function H2(i,t,e,n){let s=[],a=Math.floor(n/2.75);for(let x=0;x<=a;x++){let g=-n/2+.6+x*((n-1.2)/a);if(s.push([[-e/2,-.2,g],[e/2,-.2,g],.06]),x<a){let p=g+(n-1.2)/a/2;s.push([[-e/2,-1.1,p],[e/2,-1.1,p],.06])}}for(let x=-e/2+1;x<=e/2-1;x+=5){s.push([[x,-.2,-n/2+.6],[x,-.2,n/2-.6],.05]);for(let g=0;g<a;g++){let p=-n/2+.6+g*((n-1.2)/a),y=p+(n-1.2)/a,_=(p+y)/2;s.push([[x,-.2,p],[x+2.5,-1.1,_],.04]),s.push([[x,-.2,y],[x+2.5,-1.1,_],.04])}}let c=new $e(new oe(1,1,1,6,1,!0),t.material,s.length),l=new Gt,h=new D,u=new D,f=new D,d=new Oe,m=new D(0,1,0);s.forEach(([x,g,p],y)=>{h.fromArray(x),u.fromArray(g),f.subVectors(u,h);let _=f.length();d.setFromUnitVectors(m,f.normalize()),l.compose(h.add(u).multiplyScalar(.5),d,new D(p,_,p)),c.setMatrixAt(y,l)}),c.castShadow=!0,c.receiveShadow=!0,c.name="space-frame",t.add(c)}var u0=3,ii=3.4,go=1,nc=.6;function f0(i){let{root:t,materials:e,addBox:n}=i,s=i.layout,r=s.straightX0-s.straightX1,o=(s.straightX0+s.straightX1)/2,a=1.15,c=s.straightZ+10.6;n(r,a,.6,e.concrete,o,0,s.straightZ+10.5);let l=Math.floor(r/u0)+1,h=new $e(new oe(.05,.05,1,6),e.steelDark,l*2),u=new Gt,f=new Oe().setFromAxisAngle(new D(1,0,0),-nc),d=-Math.sin(nc)*go,m=Math.cos(nc)*go;for(let A=0;A<l;A++){let S=s.straightX1+A*u0;u.makeScale(1,ii,1).setPosition(S,a+ii/2,c),h.setMatrixAt(2*A,u),u.compose(new D(S,a+ii+m/2,c+d/2),f,new D(1,go,1)),h.setMatrixAt(2*A+1,u)}h.castShadow=!0,h.receiveShadow=!0,t.add(h);let x=Op();x.repeat.set(r/.12,ii/.12);let g=new yt({map:x,color:12896716,transparent:!0,depthWrite:!1,side:Pe,forceSinglePass:!0,roughness:.6,metalness:.3}),p=new bt(new ve(r,ii),g);p.position.set(o,a+ii/2,c),t.add(p);let y=x.clone();y.repeat.set(r/.12,go/.12);let _=new bt(new ve(r,go),g.clone());_.material.map=y,_.position.set(o,a+ii+m/2,c+d/2),_.rotation.x=-nc,t.add(_);let v=gs();for(let[A,S]of[[a+ii-.03,c],[a+ii/2,c],[a+ii+m-.03,c+d]])v.add(r,.05,.05,e.steelDark,o,A,S,{castShadow:!1});v.build(t,"fence-rails")}function d0(i){let{root:t,materials:e,addBox:n}=i,s=i.layout,r=new _e;r.name="gantry",t.add(r);let o=s.gantryX,a=s.pitWallZ-.5,c=s.straightZ+11,l=c-a+1,h=(a+c)/2,u=new yt({color:5067879,roughness:.55,metalness:.5}),f=gs();for(let p of[a,c])f.add(.6,9,.6,u,o,0,p);for(let p of[-.55,.55])f.add(.3,.3,l,u,o+p,8.2,h);f.add(.3,.3,l,u,o,9.3,h);for(let p=a;p<c;p+=1.2)for(let y of[-1,1])f.add(.1,1.45,.1,u,o+y*.28,8.15,p+.3,{pitch:.55*y}),f.add(1.1,.08,.08,u,o,8.3,p,{castShadow:!1});let d=new yt({color:1842721,roughness:.4});for(let p=0;p<4;p++)f.add(.3,.9,1.6,d,o-.2,7.2,s.straightZ-3+p*2);f.build(r,"gantry");let m=be.asphalt+.001,x=be.paint-m,g=be.lines-m;n(.8,x,14,e.line,o,m,s.straightZ,t,!1);for(let p=0;p<10;p++){let y=o+12+p*8,_=s.straightZ+(p%2?3.2:-3.2);n(.18,x,2.6,e.line,y,m,_,t,!1),n(2.2,g,.18,e.line,y+1.1,m,_+1.3,t,!1),n(2.2,g,.18,e.line,y+1.1,m,_-1.3,t,!1)}}var p0=new Gt,m0=new Oe,g0=new vn,G2=new D,W2=new D,X2=new Ot;function ze(i,t,e,n,s=!0){let r=new $e(t,e,n.length);return n.forEach((o,a)=>{g0.set(o.rx||0,o.ry||0,o.rz||0),m0.setFromEuler(g0),p0.compose(W2.set(o.x,o.y||0,o.z),m0,G2.set(o.sx||1,o.sy||1,o.sz||1)),r.setMatrixAt(a,p0),o.c!=null&&r.setColorAt(a,X2.set(o.c))}),r.castShadow=s,r.receiveShadow=!0,i.root.add(r),r}function Y2(i){let{root:t,materials:e}=i,n=i.layout,s=n.paddock,r=new ve(s.x1-s.x0,s.z1-s.z0);r.rotateX(-Math.PI/2);let o=r.attributes.uv;for(let l=0;l<o.count;l++)o.setXY(l,o.getX(l)*(s.x1-s.x0)/12,o.getY(l)*(s.z1-s.z0)/12);let a=new bt(r,e.pitAsphalt);a.position.set((s.x0+s.x1)/2,be.paddock,(s.z0+s.z1)/2),a.receiveShadow=!0,t.add(a);for(let[l,h,u,f]of q2){let d=new bt(new ve(h-l,f-u),e.pitAsphalt);d.rotation.x=-Math.PI/2,d.position.set((l+h)/2,be.paddock,(u+f)/2),d.receiveShadow=!0,t.add(d)}let c=n.garageFrontZ-n.garageDepth;i.addAoStrip(n.pitX0,c,n.pitX1,c,2.6,-1,.05)}var q2=[[-100,120,166,169.25],[69,91,169.25,174],[75,93,174,185.5],[-64.5,-55.5,25,96]];function Z2(){return{unitBox:new We(1,1,1),paint:new yt({color:16777215,roughness:.42,metalness:.25}),darkGlass:new yt({color:1910316,roughness:.08,metalness:.85}),rubber:new yt({color:1579291,roughness:.92})}}var y0=151,x0=[2830133,16118766,10200234,1842721,15131612,3817544,16118766,6648666];function $2(i,t){let{materials:e}=i,n=y0,s=[],r=[],o=[],a=[],c=[],l=[],h=[],u=[],f=0,d=[],m=[],x=[];for(let g=-156;g<=66;g+=24,f++){let p=x0[f%x0.length];s.push({x:g,y:.95+1.95,z:n,sx:15.5,sy:3.9,sz:2.55,c:p}),f%3===1&&u.push({x:g,y:1.55,z:n-1.285,sx:15.3,sy:.18,sz:.02,c:15282981});for(let y of[-1,1])u.push({x:g,y:3.6,z:n+y*1.285,sx:15.3,sy:.32,sz:.02,c:f%2?1909031:15282981});m.push({x:g,y:4.87,z:n,sx:15.6,sy:.06,sz:2.62});for(let y of[-1,1])d.push({x:g+1.6,y:.62,z:n+y*1.2,sx:8.6,sy:.55,sz:.06});d.push({x:g-7.76,y:2.9,z:n,sx:.04,sy:3.7,sz:.04}),r.push({x:g+9.35,y:.9+1.45,z:n,sx:2.6,sy:2.9,sz:2.5,c:f%2?16118766:10200234}),r.push({x:g+9.1,y:4.18,z:n,sx:2.2,sy:.75,sz:2.4,rz:.28,c:f%2?16118766:10200234}),d.push({x:g+10.68,y:1.05,z:n,sx:.12,sy:.35,sz:2.5}),d.push({x:g+10.67,y:1.75,z:n,sx:.05,sy:.7,sz:1.5}),o.push({x:g+10.67,y:3,z:n,sx:.05,sy:.95,sz:2.2});for(let y of[-1,1])o.push({x:g+9.6,y:3.05,z:n+y*1.255,sx:1.3,sy:.75,sz:.02});for(let y of[-6.1,-4.8,-3.5,7.7,9.9])a.push({x:g+y,y:.5,z:n,rx:Math.PI/2,sy:2.6}),x.push({x:g+y,y:.5,z:n,rx:Math.PI/2,sx:.32,sy:2.62,sz:.32});c.push({x:g-.5,y:3.7,z:n-1.28-2.35,sx:13.6,sy:.1,sz:4.7,rx:-.05});for(let y of[-6.6,0,6.6])l.push({x:g-.5+y,y:1.8,z:n-1.28-4.55,sy:3.6});h.push({x:g+1.5,y:.05,z:n,rx:-Math.PI/2,sx:20,sy:4.4}),h.push({x:g-.5,y:.052,z:n-3.6,rx:-Math.PI/2,sx:14,sy:5.2})}ze(i,t.unitBox,t.paint,s),ze(i,t.unitBox,t.paint,r),ze(i,t.unitBox,t.darkGlass,o,!1),ze(i,t.unitBox,new yt({color:16777215,roughness:.5}),u,!1),ze(i,t.unitBox,t.rubber,d,!1),ze(i,t.unitBox,e.steel,m,!1),ze(i,new oe(.5,.5,1,16),t.rubber,a),ze(i,new oe(1,1,1,10),e.steel,x,!1),ze(i,t.unitBox,e.roofW,c),ze(i,new oe(.05,.05,1,6),e.steel,l),ze(i,new ve(1,1),e.contact,h,!1).renderOrder=1}function J2(i,t){let{materials:e}=i,n=y0,s=[],r=[],o=[],a=[],c=[],l=[],h=0;for(let u=-156;u<=66;u+=24,h++){for(let f of[-4.5,-3.2])o.push({x:u+f,y:.5,z:n-2.2,sx:1.1,sy:1,sz:.6}),a.push({x:u+f,y:.82,z:n-2.505,sx:1.12,sy:.07,sz:.02});if(c.push({x:u+2,y:.74,z:n-3.2,sx:1.8,sy:.04,sz:.75}),l.push({x:u-3.85,y:.054,z:n-2.2,rx:-Math.PI/2,sx:3.4,sy:1.6}),h%2===0){let f=u+5.5,d=n-9.5;s.push({x:f,y:2.75,z:d,ry:Math.PI/4,sx:2.12,sy:.7,sz:2.12});for(let[m,x]of[[-1,-1],[1,-1],[-1,1],[1,1]])r.push({x:f+m*1.45,y:1.2,z:d+x*1.45,sy:2.4});l.push({x:f,y:.054,z:d,rx:-Math.PI/2,sx:3.6,sy:3.6})}}ze(i,new $r(1,1,4,1,!0),e.roofW,s),ze(i,new oe(.03,.03,1,5),e.steel,r,!1),ze(i,t.unitBox,i.materials.toolChest,o),ze(i,t.unitBox,e.red,a,!1),ze(i,t.unitBox,e.white,c),ze(i,new ve(1,1),e.contact,l,!1).renderOrder=1}function K2(i,t){let{materials:e}=i,n=[],s=[],r=[],o=[];for(let a=0;a<6;a++){let c=-28+a*16.5,l=100.5;n.push({x:c,y:1.6,z:l,sx:14.6,sy:3.2,sz:5}),r.push({x:c,y:3.3,z:l+.35,sx:15.4,sy:.18,sz:6.2}),n.push({x:c-2.2,y:4.85,z:l-.6,sx:8.6,sy:2.9,sz:3.6}),r.push({x:c-2.2,y:6.4,z:l-.45,sx:9.6,sy:.16,sz:4.4}),s.push({x:c,y:1.75,z:l+2.53,sx:12.8,sy:1.9,sz:.04}),s.push({x:c-2.2,y:4.9,z:l+1.23,sx:8,sy:2.1,sz:.04}),o.push({x:c,y:.05,z:l+2.6,rx:-Math.PI/2,sx:16,sy:4})}ze(i,t.unitBox,e.white,n),ze(i,t.unitBox,e.white,r),ze(i,t.unitBox,i.glazingMaterial(1.5),s,!1),ze(i,new ve(1,1),e.contact,o,!1).renderOrder=1}function j2(i){let{root:t,materials:e,addBox:n}=i;for(let[s,r]of[[-140,116],[-100,116],[72,117]]){let o=new bt(new $r(13,3.2,4,1,!0),e.roofW);o.rotation.y=Math.PI/4,o.position.set(s,5.6,r),o.castShadow=!0,t.add(o);for(let[a,c]of[[-1,-1],[1,-1],[-1,1],[1,1]])n(.25,4.2,.25,e.steel,s+a*8.5,0,r+c*8.5,t)}}function Q2(i,t){let e=[],n=[];for(let s=0;s<18;s++){let r=-158+s*13.1+s%3*1.7,o=145.4-s%2*.8,a=2+s%3;for(let c=0;c<a;c++)e.push({x:r,y:.16+c*.31,z:o,sx:.66,sy:.3,sz:.66});n.push({x:r+2.4,y:.45,z:o+.3,sx:1.2,sy:.9,sz:.8,c:s%2?1842721:10200234})}ze(i,new oe(.5,.5,1,18),t.rubber,e),ze(i,t.unitBox,t.paint,n)}function tA(i){let t=[];for(let r=0;r<7;r++)t.push({x:-7.4,y:be.paddockLines,z:126.1-r*3.2,sx:5.8,sz:.12});t.push({x:-10.3,y:be.paddockLines,z:126.1-3*3.2,sx:.12,sz:6*3.2+.12});let e=new yt({color:15263974,roughness:.6,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2}),n=new ve(1,1).rotateX(-Math.PI/2),s=ze(i,n,e,t,!1);s.name="paddock-bay-lines",s.renderOrder=0}function eA(i){let{root:t,materials:e,addBox:n}=i,s=i.layout.paddock;for(let r=0;r<4;r++)n(.4,22,.4,e.steel,s.x0+10+r*90,0,s.z0-5,t),n(3,.6,1.2,e.steelDark,s.x0+10+r*90,22,s.z0-5,t)}function _0(i){Y2(i);let t=Z2();$2(i,t),K2(i,t),j2(i),Q2(i,t),J2(i,t),tA(i),eA(i)}var wu=13,v0=.04,ic=4,sc=.6;function A0(i){let{root:t,materials:e,addBox:n}=i,s=i.layout,r=new Kn,o=s.garageFrontZ,a=s.pitWallZ;r.moveTo(s.pitX0-140,-a),r.lineTo(s.pitX1+150,-a),r.lineTo(s.pitX1+150,-o),r.lineTo(s.pitX0-140,-o),r.closePath();let c=new eo(r);c.rotateX(-Math.PI/2);let l=new bt(c,e.pitAsphalt);l.position.y=.025,l.receiveShadow=!0,t.add(l);let h=c.attributes.uv,u=c.attributes.position;for(let x=0;x<u.count;x++)h.setXY(x,u.getX(x)/12,u.getZ(x)/12);let f=(s.pitX0+s.pitX1)/2,d=be.pitLane+.001,m=be.lines-d;n(s.pitX1-s.pitX0+260,m,.25,e.line,f,d,s.garageFrontZ+6,t,!1),n(s.pitX1-s.pitX0+300,1.1,.7,nA(),f,0,s.pitWallZ+.35),n(s.pitX1-s.pitX0+300,.08,.9,iA(),f,1.1,s.pitWallZ+.35);for(let[x,g]of[[s.pitX1+150,s.pitX1+260],[s.pitX0-140,s.pitX0-250]]){let p=new Kn;p.moveTo(x,-(s.garageFrontZ+.5)),p.lineTo(x,-s.pitWallZ),p.lineTo(g,-(s.straightZ-6.8)),p.lineTo(g,-(s.straightZ-6.8-6)),p.closePath();let y=new eo(p);y.rotateX(-Math.PI/2);let _=new bt(y,e.pitAsphalt);_.position.y=be.pitMouth,_.receiveShadow=!0,t.add(_)}}var M0=null,S0=null,nA=()=>M0||(M0=new yt({color:9078916,roughness:.92})),iA=()=>S0||(S0=new yt({color:9278102,roughness:.7,metalness:.2}));function sA(i){let t=i.layout;i.addAoStrip(t.pitX0-150,t.pitWallZ,t.pitX1+150,t.pitWallZ,1.4,-1,.05),i.addAoStrip(t.pitX0-150,t.pitWallZ+.7,t.pitX1+150,t.pitWallZ+.7,1.2,1,.06)}function rA(i,t,e){let{materials:n,addAoStrip:s}=i,r=i.layout,o=(p,y,_,v,A,S,w,E)=>e.add(p,y,_,v,A,S,w,E),a=r.boxes*r.boxW,c=(r.pitX0+r.pitX1)/2,l=r.garageFrontZ,h=l-r.garageDepth,u=l-r.garageDepth/2,f=new yt({color:8817043,roughness:.75});o(a,4.6,.4,n.white,c,0,h+.2),o(a+.6,.5,r.garageDepth+2.2,n.white,c,4.6,u+.9);let d=i.glazingMaterial(a/8);d.color.set(12046544),o(a,3.4,r.garageDepth-2,d,c,5.1,u-.4);for(let p=0;p<=r.boxes;p++)o(p%2?.16:.32,3.4,p%2?.45:.7,n.white,r.pitX0+p*r.boxW,5.1,l-1.2);let m=new yt({color:15986404,emissive:16769712,emissiveIntensity:.35,roughness:.6});o(a,.04,.5,m,c,4.56,l+1.2,{castShadow:!1}),o(a+.6,.5,.08,f,c,4.6,l+2.04,{castShadow:!1}),o(a+.6,.55,r.garageDepth+1.6,n.white,c,8.5,u+.4);let x=new yt({color:12570840,transparent:!0,opacity:.35,roughness:.1});o(a,1,.06,x,c,9.05,l+.1,{castShadow:!1}),o(a,.07,.12,n.steel,c,10.05,l+.1);for(let p=r.pitX0;p<=r.pitX1+.01;p+=r.boxW/2)o(.06,1,.06,n.steel,p,9.05,l+.17,{castShadow:!1});let g=11.6;for(let p=r.pitX0+.5;p<=r.pitX1;p+=2*r.boxW)for(let y of[l-1.2,l-9.2])o(.16,g-9.05,.16,n.steelDark,p,9.05,y);for(let p of[l-1.2,l-9.2])o(a,.35,.25,n.steelDark,c,g,p);for(let p=r.pitX0+.5;p<=r.pitX1;p+=r.boxW)o(.12,.22,8.4,n.steelDark,p,g+.35,l-5.2,{castShadow:!1});o(a+1,.12,9.6,n.roofW,c,g+.57,l-5.2);for(let p=0;p<r.boxes;p++){let y=r.pitX0+p*r.boxW,_=y+r.boxW/2;o(.35,4.6,r.garageDepth,n.white,y,0,u),o(sc,4.6,.45,n.white,y,0,l+.05),o(sc+.04,.35,.49,f,y,0,l+.05,{castShadow:!1});let v=r.boxW-sc;o(v,4.6-ic,.3,f,_,ic,l-.1);for(let S of[-1,1])o(.14,ic,.32,f,_+S*(v/2-.07),0,l-.12,{castShadow:!1});if(p===wu)continue;let A=p%7===3?1.2:p%5===1?2.2:0;o(v-.28,ic-A,.12,n.shutter,_,A,l-.35),A>0&&o(v-.28,A,.1,n.interior,_,0,l-6,{castShadow:!1})}o(.35,4.6,r.garageDepth,n.white,r.pitX1,0,u),o(sc,4.6,.45,n.white,r.pitX1,0,l+.05),s(r.pitX0,l+.28,r.pitX1,l+.28,3.2,1,.05,t),sA(i)}var b0=null,w0=()=>b0||(b0=new yt({color:1776670,roughness:.95}));function oA(i,t,e){let{materials:n,addBox:s,addAoStrip:r}=i,o=i.layout,a=o.garageFrontZ,c=a-o.garageDepth,l=o.pitX0+wu*o.boxW+o.boxW/2;s(o.boxW-.4,v0-.02,o.garageDepth-.4,n.floor,l,.02,a-o.garageDepth/2,t,!1),s(o.boxW-.4,3.9,.1,n.interior,l,0,c+.45,t,!1);let h=new yt({color:1777446,roughness:.6});e.add(o.boxW-.9,2.4,.04,h,l,1,c+.52,{castShadow:!1}),e.add(o.boxW-.9,.18,.05,n.red,l,1.55,c+.53,{castShadow:!1});let u=n.toolChest;for(let m of[-1,1]){e.add(.7,1.05,1.6,u,l+m*2.55,0,c+3.2),e.add(.72,.06,1.62,n.red,l+m*2.55,.85,c+3.2,{castShadow:!1});for(let x=0;x<4;x++){let g=new bt(new oe(.33,.33,.3,20),w0());g.position.set(l-m*2.3,.15+x*.31,c+5.6+(m>0?0:1.2)),g.castShadow=!0,t.add(g)}}e.add(1.6,1,.6,n.red,l+1.6,0,c+1.3),e.add(.9,.55,.6,n.red,l-1.2,0,a-7.5);let f=new Ea(16767400,60,16,1.6);f.position.set(l,3.6,a-6),t.add(f);let d=new Be({color:16774108});s(o.boxW-1.2,.06,.5,d,l,4.2,a-5,t,!1),s(o.boxW-1.2,.06,.5,d,l,4.2,a-11,t,!1),s(2.4,1,.06,n.steelDark,l,2.4,c+.56,t,!1);for(let m=0;m<2;m++){let x=new bt(new oe(.34,.34,.32,22),w0());x.rotation.z=Math.PI/2,x.position.set(l+1.6+m*.36,.36,a-4.2),x.castShadow=!0,t.add(x)}s(1.1,.08,.7,n.steel,l+1.78,.1,a-4.2,t,!1),r(l-o.boxW/2+.2,c+.5,l+o.boxW/2-.2,c+.5,2.4,1,.045,t),r(l-o.boxW/2+.2,c+.5,l-o.boxW/2+.2,a,1.4,-1,.045,t),r(l+o.boxW/2-.2,c+.5,l+o.boxW/2-.2,a,1.4,1,.045,t),i.root.userData.openBox={x:l,z:a,floorY:v0}}function aA(i,t,e){let{materials:n,addBox:s,addAoStrip:r}=i,o=i.layout,a=o.towerX,c=o.garageFrontZ-7;s(18,16,15,n.white,a,0,c,t);let l=i.glazingMaterial(2.4);l.color.set(10470596),s(18.6,4.2,15.6,l,a,16,c,t),s(19.4,.6,16.4,n.white,a,20.2,c,t),s(20.4,.25,17.4,n.white,a,15.75,c,t);let h=new yt({color:5395290,roughness:.55,metalness:.15}),u=i.glazingMaterial(2.2);u.color.set(11128012);for(let f=0;f<3;f++){let d=3.4+f*4.2;e.add(13,1.6,.1,u,a+2.4,d,c+7.55,{castShadow:!1});for(let m of[-1,1])e.add(.1,1.6,11.5,u,a+m*9.05,d,c,{castShadow:!1});e.add(18.5,.35,15.5,n.white,a,d+2.25,c,{castShadow:!1})}e.add(4.2,15.75,.1,h,a-6.6,0,c+7.55),e.add(4.2,4.6,3.2,h,a-6.4,20.8,c+3.5),e.add(6,2.2,5,n.concreteDark,a+3,20.8,c-2);for(let[f,d,m]of[[-4,-5,9],[5.5,-5.5,6.5]])e.add(.12,m,.12,n.steel,a+f,20.8,c+d);e.add(1.6,.08,.08,n.steel,a-4,28.2,c-5,{castShadow:!1});for(let f=0;f<3;f++)e.add(.08,7,.08,n.steel,a+6+f*1.5,20.8,c+6.5);r(a-9,c+7.5,a+9,c+7.5,2.4,1,.05,t),r(a+9,c-7.5,a+9,c+7.5,2.4,-1,.05,t),i.root.userData.tower=new D(a,18,c)}function cA(i,t){let e=i.layout,n=e.garageFrontZ,s=[],r=[];for(let l=0;l<e.boxes;l++){if(l===wu)continue;let h=e.pitX0+l*e.boxW+e.boxW-.95;s.push([h,.42,n+.75,.13,.62,.13]),r.push([h,.12,n+.75,.5,.06,.34])}let o=[];for(let l of[e.pitX0-30,e.pitX1+30])for(let h=0;h<6;h++)o.push([l+(l<0?-h:h)*6,.25,n+6.4,.18,.5,.18]);let a=new Gt,c=(l,h,u)=>{let f=new $e(l,h,u.length);u.forEach(([d,m,x,g,p,y],_)=>f.setMatrixAt(_,a.makeScale(g,p,y).setPosition(d,m,x))),f.castShadow=!0,f.receiveShadow=!0,t.add(f)};c(new oe(1,1,1,10),i.materials.red,s),c(new oe(1,1,1,8),new yt({color:1579291,roughness:.6}),r),c(new oe(.15,1,1,10),new yt({color:15231519,roughness:.6}),o)}function lA(i,t){let e=i.layout;for(let n=0;n<6;n++)mo(i,e.pitX0+18+n*34,9,e.garageFrontZ+.2,n%2?16118766:15282981,t)}function E0(i){let t=new _e;t.name="pits",i.root.add(t);let e=gs();rA(i,t,e),oA(i,t,e),aA(i,t,e),e.build(t,"pit-building"),cA(i,t),lA(i,t)}var xs=new Uint8Array(512);{let i=Ue(7),t=[...Array(256).keys()];for(let e=255;e>0;e--){let n=Math.floor(i()*(e+1));[t[e],t[n]]=[t[n],t[e]]}for(let e=0;e<512;e++)xs[e]=t[e&255]}var T0=i=>i*i*i*(i*(i*6-15)+10),rc=(i,t,e)=>(i&1?-t:t)+(i&2?-e:e);function hA(i,t){let e=Math.floor(i)&255,n=Math.floor(t)&255;i-=Math.floor(i),t-=Math.floor(t);let s=T0(i),r=T0(t),o=xs[e]+n,a=xs[e+1]+n,c=(l,h,u)=>l+(h-l)*u;return c(c(rc(xs[o],i,t),rc(xs[a],i-1,t),s),c(rc(xs[o+1],i,t-1),rc(xs[a+1],i-1,t-1),s),r)}function xo(i,t,e=4){let n=.5,s=1,r=0;for(let o=0;o<e;o++)r+=n*hA(i*s,t*s),n*=.5,s*=2.03;return r}var lc=4200,hc=3e3,ys=120,yo=90,uA=-.05,C0=(i,t)=>Math.hypot(i/1.15,t*1.25);function fA(i,t){let e=Nt((C0(i,t)-720)/900,0,1);return e*e*(40+xo(i/420,t/420,4)*90)+uA}var ac=lc/ys,cc=hc/yo,oc=null;function I0(){if(!oc){oc=new Float64Array((ys+1)*(yo+1));for(let i=0;i<=yo;i++)for(let t=0;t<=ys;t++)oc[i*(ys+1)+t]=fA(-lc/2+t*ac,-hc/2+i*cc)}return oc}function P0(i,t){let e=I0(),n=Nt((i+lc/2)/ac,0,ys-1e-9),s=Nt((t+hc/2)/cc,0,yo-1e-9),r=Math.floor(n),o=Math.floor(s),a=n-r,c=s-o,l=ys+1,h=e[o*l+r],u=e[(o+1)*l+r],f=e[o*l+r+1];if(a+c<=1)return[h+(f-h)*a+(u-h)*c,(f-h)/ac,(u-h)/cc];let d=e[(o+1)*l+r+1];return[d+(u-d)*(1-a)+(f-d)*(1-c),(d-u)/ac,(d-f)/cc]}var _o=(i,t)=>P0(i,t)[0];function L0(i,t){let[,e,n]=P0(i,t);return Math.hypot(e,n)}function D0(i){let t=new ve(lc,hc,ys,yo);t.rotateX(-Math.PI/2);let e=t.attributes.position,n=I0();for(let c=0;c<e.count;c++)e.setY(c,n[c]);t.computeVertexNormals();let s=[],r=new Ot(9409656),o=new Ot;for(let c=0;c<e.count;c++){let l=e.getX(c),h=e.getZ(c),u=1+xo(l/260,h/260,3)*.14,f=Nt((C0(l,h)-720)/500,0,1);o.setRGB(u,u,u).lerp(r,f),s.push(o.r,o.g,o.b)}t.setAttribute("color",new zt(s,3));let a=new bt(t,i.materials.ground);a.receiveShadow=!0,a.name="ground",i.root.add(a)}var R0=-2.35,dA=.22;function N0(i){let t=new _e;t.name="hills";for(let e=0;e<3;e++){let n=2300+e*350,s=new oe(n,n,1,220,1,!0),r=s.attributes.position;for(let a=0;a<r.count;a++){let c=r.getX(a),l=r.getZ(a);if(r.getY(a)>0){let h=Math.atan2(l,c),u=70+xo(h*3+e*7,e,4)*150+Math.max(0,xo(h*9,3+e,2))*90,f=Math.abs(Math.atan2(Math.sin(h-R0),Math.cos(h-R0)));u+=Math.max(0,1-f/dA)*(e===1?260:150),r.setY(a,u)}else r.setY(a,-20)}s.computeVertexNormals();let o=new yt({color:[6254423,8227708,10464688][e],roughness:1,side:Pe,fog:!0});t.add(new bt(s,o))}i.root.add(t)}var pA=1,F0=.5,mA=15,gA=.8,xA=.5,yA=7,U0=6.5,_A=40,vA=12.5,MA=33.5,SA=17,bA=25,wA=.02,AA=25,EA=42,TA=35,Eu=i=>Math.atan2(Math.sin(i),Math.cos(i));function RA(i,t,e){let n=i.length,s=new Float64Array(n*e),r=new Float64Array(n*e),o=(a,c)=>Math.max(1e-6,Math.sqrt(Math.hypot(i[c]-i[a],t[c]-t[a])));for(let a=0;a<n;a++){let c=(a-1+n)%n,l=(a+1)%n,h=(a+2)%n,u=o(c,a),f=u+o(a,l),d=f+o(l,h);for(let m=0;m<e;m++){let x=u+(f-u)*m/e,g=(p,y,_,v)=>((v-x)*p+(x-_)*y)/(v-_);for(let[p,y]of[[i,s],[t,r]]){let _=g(p[c],p[a],0,u),v=g(p[a],p[l],u,f),A=g(p[l],p[h],f,d),S=g(_,v,0,f),w=g(v,A,u,d);y[a*e+m]=g(S,w,u,f)}}}return{x:s,z:r}}function Au(i,t,e){let n=i.length,s=new Float64Array(n+1);for(let l=0;l<n;l++)s[l+1]=s[l]+Math.hypot(i[(l+1)%n]-i[l],t[(l+1)%n]-t[l]);let r=s[n],o=Math.round(r/e),a=new Float64Array(o),c=new Float64Array(o);for(let l=0,h=0;l<o;l++){let u=l*r/o;for(;s[h+1]<u;)h++;let f=(u-s[h])/(s[h+1]-s[h]||1);a[l]=i[h]+(i[(h+1)%n]-i[h])*f,c[l]=t[h]+(t[(h+1)%n]-t[h])*f}return{x:a,z:c,spacing:r/o,length:r}}function CA(i,t){let{x:e,z:n}=i;for(let s=0;s<10;s++){let r=e.length,o=i.spacing,a=new Float64Array(r);for(let y=0;y<r;y++)a[y]=Math.atan2(n[(y+1)%r]-n[y],e[(y+1)%r]-e[y]);let c=new Float64Array(r);for(let y=0;y<r;y++)c[y]=Eu(a[y]-a[(y-1+r)%r]);let l=o/t,h=0;for(let y=0;y<r;y++)h=Math.max(h,Math.abs(c[y]));if(h<=l*1.001)break;let u=l*.98,f=Float64Array.from(c);for(let y=0;y<r;y++){if(Math.abs(f[y])<=u)continue;let _=Math.sign(f[y]),v=Math.abs(f[y])-u;f[y]=_*u;for(let A=1;v>1e-12&&A<r/2;A++)for(let S of[(y+A)%r,(y-A+r)%r]){let w=u-_*f[S];if(w<=0)continue;let E=Math.min(w,v/2+1e-15,v);f[S]+=_*E,v-=E}}let d=Math.round(60/o),m=0;for(;m<r&&Math.abs(f[m]-c[m])>1e-12;)m++;let x=[];for(let y=m;y<m+r;y++){if(Math.abs(f[y%r]-c[y%r])<=1e-12)continue;let _=x[x.length-1];_&&y-d<=_[1]+d?_[1]=y+d:x.push([y-d,y+d])}let g=Float64Array.from(e),p=Float64Array.from(n);for(let[y,_]of x){let v=L=>(L%r+r)%r,A=a[v(y-1)],S=e[v(y)],w=n[v(y)],E=_-y,b=new Float64Array(E+1),M=new Float64Array(E+1);for(let L=0;L<=E;L++)b[L]=S,M[L]=w,A+=f[v(y+L)],S+=Math.cos(A)*o,w+=Math.sin(A)*o;let R=e[v(_)]-b[E],N=n[v(_)]-M[E];for(let L=0;L<=E;L++){let C=Xe(L/E);g[v(y+L)]=b[L]+R*C,p[v(y+L)]=M[L]+N*C}}i=Au(g,p,F0),e=i.x,n=i.z}return i}function IA(i){let t=Float64Array.from(i,p=>p.x),e=Float64Array.from(i,p=>p.y),n=RA(t,e,32),s=Au(n.x,n.z,F0),r=CA(s,mA),{x:o,z:a,spacing:c,length:l}=Au(r.x,r.z,pA),h=o.length,u=new Float64Array(h),f=new Float64Array(h),d=new Float64Array(h),m=new Float64Array(h),x=new Float64Array(h),g=new Float64Array(h);for(let p=0;p<h;p++){let y=(p+1)%h,_=(p-1+h)%h,v=o[y]-o[_],A=a[y]-a[_],S=Math.hypot(v,A)||1;u[p]=v/S,f[p]=A/S,d[p]=-f[p],m[p]=u[p],x[p]=p*c;let w=Math.atan2(a[p]-a[_],o[p]-o[_]),E=Math.atan2(a[y]-a[p],o[y]-o[p]);g[p]=Eu(E-w)/c}return{x:o,z:a,tx:u,tz:f,nx:d,nz:m,s:x,curvature:g,count:h,spacing:c,length:l}}function PA(i){let{count:t,curvature:e,spacing:n}=i,s={};for(let r of[1,-1]){let o=new Float64Array(t);for(let c=0;c<t;c++){let l=Math.max(r*e[c],r*e[(c+1)%t],r*e[(c-1+t)%t]);o[c]=l>0?gA/l:1/0}let a=xA*n;for(let c=0;c<2;c++){for(let l=1;l<=t;l++)o[l%t]=Math.min(o[l%t],o[(l-1)%t]+a);for(let l=t-1;l>=-1;l--)o[(l+t)%t]=Math.min(o[(l+t)%t],o[(l+1)%t]+a)}s[r]=o}return s}function LA(i){let{count:t,x:e,z:n,spacing:s}=i,r=Math.round(vA/s),o=new Float64Array(t);for(let a=0;a<t;a++){let c=(a-r+t)%t,l=(a+r)%t,h=Math.atan2(n[a]-n[c],e[a]-e[c]),u=Math.atan2(n[l]-n[a],e[l]-e[a]);o[a]=Eu(u-h)}return o}function DA(i,t){let e=i.length,n=Math.round(MA/t),s=new Float64Array(e);for(let r=0;r<e;r++){let o=0;for(let a=-n;a<=n;a++)o=Math.max(o,Math.abs(i[(r+a+e)%e]));s[r]=Nt((o-.025)/.05,0,1)}return s}function NA(i,t,e){let n=i.length,s=c=>i[(c%n+n)%n]>.5,r=0;for(;r<n&&s(r);)r++;let o=[];for(let c=r;c<r+n;c++){if(!s(c))continue;let l=c;for(;l+1<r+n&&s(l+1);)l++;(l-c+1)*e>SA&&o.push({first:c,last:l,subCorners:[]}),c=l}let a=Math.round(bA/e);for(let c of o){let l=[];for(let d=c.first;d<=c.last;d++)l.push(Math.abs(t[d%n])>wA?Math.sign(t[d%n]):0);for(let d=0;d<2;d++)for(let m=0;m<l.length;m++){let x=d?l.length-1-m:m,g=d?x+1:x-1;!l[x]&&g>=0&&g<l.length&&l[g]&&(l[x]=l[g])}for(let d=0;d<l.length;d++)l[d]||(l[d]=1);let h=[];for(let d=0;d<l.length;d++)h.length&&h[h.length-1].direction===l[d]?h[h.length-1].length++:h.push({direction:l[d],length:1});let u=!0;for(;u&&h.length>1;){u=!1;let d=-1;for(let x=0;x<h.length;x++)h[x].length<a&&(d<0||h[x].length<h[d].length)&&(d=x);if(d<0)break;let m=d===0?1:d===h.length-1||h[d-1].length>=h[d+1].length?d-1:d+1;h[m].length+=h[d].length,h.splice(d,1);for(let x=h.length-1;x>0;x--)h[x].direction===h[x-1].direction&&(h[x-1].length+=h[x].length,h.splice(x,1));u=!0}let f=c.first;for(let d of h)c.subCorners.push({first:f,last:f+d.length-1,direction:d.direction}),f+=d.length}return o}function UA(i,t,e){let n=Math.round(AA/e),s=Math.round(EA/e),r=Math.round(TA/e),o={1:new Uint8Array(t),[-1]:new Uint8Array(t)};for(let l of i)for(let h of l.subCorners)for(let u=h.first;u<=h.last;u++)o[h.direction][u%t]=1;let a={1:new Uint8Array(t),[-1]:new Uint8Array(t)};for(let l of i)l.subCorners.forEach((h,u)=>{let f=-h.direction,d=h.first-(u===0?n:0),m=h.last+(u===l.subCorners.length-1?s:0);for(let x=h.first;x<=h.last;x++)a[f][x%t]=1;for(let x=h.first-1;x>=d&&!o[f][(x%t+t)%t];x--)a[f][(x%t+t)%t]=1;for(let x=h.last+1;x<=m&&!o[f][x%t];x++)a[f][x%t]=1});for(let l of[1,-1]){let h=a[l],u=0;for(;u<t&&!h[u];)u++;if(u!==t)for(let f=u;f<u+t;f++){if(h[f%t])continue;let d=f;for(;d+1<u+t&&!h[(d+1)%t];)d++;let m=d-f+1<=r;for(let x=f;m&&x<=d;x++)o[l][x%t]&&(m=!1);if(m)for(let x=f;x<=d;x++)h[x%t]=1;f=d}}let c=[];for(let l of[1,-1]){let h=a[l],u=0;for(;u<t&&h[u];)u++;if(u===t){c.push({side:l,first:0,last:t});continue}for(let f=u;f<u+t;f++){if(!h[f%t])continue;let d=f;for(;d+1<u+t&&h[(d+1)%t];)d++;c.push({side:l,first:f,last:d}),f=d}}return c}function FA(i){let{count:t,x:e,z:n,spacing:s}=i,r=new Float64Array(t);for(let c=0;c<t;c++)r[c]=Math.abs(n[c]-po.straightZ)<1.5&&e[c]<470&&e[c]>-540?1:0;let o=Math.round(_A/s/2),a=new Float64Array(t);for(let c=0;c<t;c++){let l=0;for(let h=-o;h<=o;h++)l+=r[(c+h+t)%t];a[c]=U0+(yA-U0)*Xe(l/(2*o+1))}return a}function OA(i){let t=IA(i),e=PA(t),n=LA(t),s=DA(n,t.spacing),r=NA(s,n,t.spacing);return{line:t,count:t.count,halfWidth:FA(t),turn:n,cornerness:s,corners:r,gravel:UA(r,t.count,t.spacing),edge(o,a){let c=e[a>0?1:-1][o];return a>c?c:a<-c?-c:a}}}var vo=60;function BA(i){let t=new Map;for(let e=0;e<i.length;e++){let n=Math.floor(i[e].x/vo)+","+Math.floor(i[e].y/vo);t.has(n)||t.set(n,[]),t.get(n).push(i[e])}return(e,n)=>{let s=Math.floor(e/vo),r=Math.floor(n/vo),o=1e12;for(let a=-1;a<=1;a++)for(let c=-1;c<=1;c++){let l=t.get(s+a+","+(r+c));if(l)for(let h of l){let u=(h.x-e)**2+(h.y-n)**2;u<o&&(o=u)}}return o===1e12?vo*1.5:Math.sqrt(o)}}function zA(i,t){let e=po;return i>e.paddock.x0-30&&i<e.paddock.x1+30&&t>e.paddock.z0-20&&t<e.straightZ+60||i>e.grandstandX0-40&&i<e.grandstandX1+40&&t>e.straightZ&&t<e.grandstandZ+40}function O0(i){return{model:OA(i),count:i.length,distanceToTrack:BA(i),isKeepClearZone:zA}}var kA=.01,uc=.3,_s=(i,t)=>(i%t+t)%t,Mo=(i,t,e)=>typeof i=="function"?i(t,e):i;function fc(i,t,e,n){let{line:s}=i,r=n-e+1,o=new Float64Array(r*2),a=new Float64Array(r),c=0;for(let l=0;l<r;l++){let h=_s(e+l,s.count),u=i.edge(h,Mo(t,h,e+l));a[l]=u;let f=s.x[h]+s.nx[h]*u,d=s.z[h]+s.nz[h]*u;l>0&&(f-o[2*l-2])*s.tx[h]+(d-o[2*l-1])*s.tz[h]<kA&&(f=o[2*l-2],d=o[2*l-1],c++),o[2*l]=f,o[2*l+1]=d}return{points:o,offsets:a,held:c}}function B0(i,t,e){let n=(r,o,a,c,l,h)=>(c-o)*(l-r)-(a-r)*(h-o),s=0;for(let r=0;r+1<i.length/2;r++){let[o,a,c,l]=[i[2*r],i[2*r+1],i[2*r+2],i[2*r+3]],[h,u,f,d]=[t[2*r],t[2*r+1],t[2*r+2],t[2*r+3]],m=n(o,a,c,l,h,u),x=n(h,u,c,l,f,d);(m*e<-1e-9||x*e<-1e-9)&&(i[2*r+2]=o,i[2*r+3]=a,t[2*r+2]=h,t[2*r+3]=u,s++)}return s}function Tu(i,t,e=0,n=[]){for(let s=0;s<i;s++){let r=e+s*2;t?n.push(r,r+2,r+1,r+1,r+2,r+3):n.push(r,r+1,r+2,r+1,r+3,r+2)}return n}function z0(i,t,e,n,s,r){let o=new fe;return o.setAttribute("position",new zt(i,3)),o.setAttribute("normal",new zt(t,3)),o.setAttribute("uv",new zt(e,2)),o.setIndex(n),o.userData.range=s,o.userData.repairs=r,o}var VA=(i,t)=>t||[0,i.line.count];function vs(i,t,e,{range:n=null,y:s=0,vScale:r=1,uvAcross:o=[0,1],heightA:a=0,heightB:c=0,skirtB:l=null}={}){let{line:h}=i,[u,f]=VA(i,n),d=_s(u,h.count),m=Mo(t,d,u)>Mo(e,d,u),x=fc(i,t,u,f),g=fc(i,e,u,f),p=B0(x.points,g.points,m?1:-1),y=[],_=[],v=[];for(let S=0;S<=f-u;S++){let w=_s(u+S,h.count),E=x.offsets[S],b=g.offsets[S];y.push(x.points[2*S],s+a,x.points[2*S+1],g.points[2*S],s+c,g.points[2*S+1]);let M=(c-a)/(Math.abs(b-E)||1),R=b>E?1:-1,N=Math.hypot(M,1),L=-M*R*h.nx[w]/N,C=-M*R*h.nz[w]/N;_.push(L,1/N,C,L,1/N,C);let B=S*h.spacing*r;v.push(o[0],B,o[1],B)}let A=Tu(f-u,m);if(l!==null){let S=y.length/3,w=g.offsets[0]>x.offsets[0]?1:-1;for(let E=0;E<=f-u;E++){let b=_s(u+E,h.count),M=g.points[2*E],R=g.points[2*E+1];y.push(M,s+c,R,M,l,R);let N=w*h.nx[b],L=w*h.nz[b];_.push(N,0,L,N,0,L);let C=E*h.spacing*r;v.push(o[1],C,o[1],C)}Tu(f-u,w<0,S,A)}return z0(y,_,v,A,[u,f],{held:x.held+g.held,collapsed:p})}function k0(i,t,[e,n],s,r){let{line:o}=i,a=Math.sign(Mo(t,_s(e,o.count),e))||1,c=fc(i,t,e,n),l=fc(i,(g,p)=>Mo(t,g,p)+a*uc,e,n),h=B0(c.points,l.points,-a),u=[],f=[],d=[],m=[],x=[[c,c,0,s,0,1,-1],[l,l,s,0,1,0,1],[c,l,s,s,.96,1,0]];for(let[g,p,y,_,v,A,S]of x){let w=u.length/3;for(let E=0;E<=n-e;E++){let b=_s(e+E,o.count);u.push(g.points[2*E],y,g.points[2*E+1],p.points[2*E],_,p.points[2*E+1]);let M=S*a*o.nx[b],R=S*a*o.nz[b],N=S?0:1;f.push(M,N,R,M,N,R);let L=E*o.spacing*r;d.push(L,v,L,A)}Tu(n-e,a<0,w,m)}for(let[g,p]of[[0,-1],[n-e,1]]){let y=_s(e+g,o.count),_=u.length/3,[v,A,S,w]=[c.points[2*g],c.points[2*g+1],l.points[2*g],l.points[2*g+1]];u.push(v,0,A,v,s,A,S,s,w,S,0,w);let E=p*o.tx[y],b=p*o.tz[y];f.push(E,0,b,E,0,b,E,0,b,E,0,b);let M=uc*r;d.push(0,0,0,1,M,1,M,0),a*p>0?m.push(_,_+1,_+2,_,_+2,_+3):m.push(_,_+2,_+1,_,_+3,_+2)}return z0(u,f,d,m,[e,n],{held:c.held+l.held,collapsed:h})}function Ru(i,t,e,n,s,r){let o=s-e,a=r-n,c=o*o+a*a,l=c>0?Math.max(0,Math.min(1,((i-e)*o+(t-n)*a)/c)):0;return Math.hypot(i-e-l*o,t-n-l*a)}function HA(i,t,e,n,s,r,o,a){let c=(s-e)*(a-n)-(o-e)*(r-n);if(Math.abs(c)>1e-12){let l=Math.sign(c),h=((s-e)*(t-n)-(i-e)*(r-n))*l,u=((o-s)*(t-r)-(i-s)*(a-r))*l,f=((e-o)*(t-a)-(i-o)*(n-a))*l;if(h>=0&&u>=0&&f>=0)return 0}return Math.min(Ru(i,t,e,n,s,r),Ru(i,t,s,r,o,a),Ru(i,t,o,a,e,n))}function dc(){let i=new Map,t=[],e=[],n=(r,o)=>(r+32768)*65536+(o+32768);function s(r,o,a,c,l,h){let u=t.length;t.push(r),e.push(...o);for(let f=Math.floor(a/8);f<=Math.floor(l/8);f++)for(let d=Math.floor(c/8);d<=Math.floor(h/8);d++){let m=n(f,d),x=i.get(m);x||i.set(m,x=[]),x.push(u)}}return{get size(){return t.length},addTriangle(r,o,a,c,l,h){s(0,[r,o,a,c,l,h],Math.min(r,a,l),Math.min(o,c,h),Math.max(r,a,l),Math.max(o,c,h))},addSegment(r,o,a,c){this.addTriangle(r,o,a,c,a,c)},addDisc(r,o,a){s(1,[r,o,a,0,0,0],r-a,o-a,r+a,o+a)},distance(r,o,a){let c=1/0,l=new Set;for(let h=Math.floor((r-a)/8);h<=Math.floor((r+a)/8);h++)for(let u=Math.floor((o-a)/8);u<=Math.floor((o+a)/8);u++){let f=i.get(n(h,u));if(f)for(let d of f){if(l.has(d))continue;l.add(d);let m=d*6,x=t[d]===1?Math.hypot(r-e[m],o-e[m+1])-e[m+2]:HA(r,o,e[m],e[m+1],e[m+2],e[m+3],e[m+4],e[m+5]);x<c&&(c=x)}}return c}}}var V0=1.6,_r=5.5,GA=24,W0=31.4,WA=.95,H0=_r+3,pc=1.5,XA=15,YA=25,qA=20,ZA=4,$A=3;function JA(i,t){let e=o=>t.halfWidth[o],{length:n}=t.line,s=vs(t,e,o=>-e(o),{y:be.asphalt,vScale:Math.round(n/12)/n,uvAcross:[0,14/12]}),r=new bt(s,i.materials.asphalt);r.receiveShadow=!0,r.name="track",i.root.add(r)}function KA(){let i=document.createElement("canvas");i.width=64,i.height=4;let t=i.getContext("2d"),e=t.createLinearGradient(0,0,64,0);return e.addColorStop(0,"rgba(0,0,0,0)"),e.addColorStop(.35,"rgba(0,0,0,1)"),e.addColorStop(.65,"rgba(0,0,0,1)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,64,4),new Ln(i)}function jA(i,t){let{materials:e}=i;e.rubber.map=KA(),e.rubber.opacity=.2;let n=o=>Nt(t.turn[o]*12,-2.2,2.2),s=vs(t,o=>2.6+n(o),o=>-3.4+n(o),{y:be.rubber}),r=new bt(s,e.rubber);r.renderOrder=1,i.root.add(r)}function QA(i,t){Object.assign(i.materials.line,{polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2});for(let e of[1,-1]){let n=vs(t,r=>e*(t.halfWidth[r]-.15),r=>e*(t.halfWidth[r]-.45),{y:be.lines}),s=new bt(n,i.materials.line);s.receiveShadow=!0,i.root.add(s)}}function tE(i,t){let{materials:e,root:n}=i,{halfWidth:s}=t;for(let o of t.corners){let a=[o.first,o.last];for(let c of[1,-1]){let l=vs(t,f=>c*s[f],f=>c*(s[f]+V0),{range:a,y:be.kerbInner,vScale:.16666666666666666,heightB:be.kerbOuter-be.kerbInner,skirtB:be.runoff}),h=new bt(l,e.kerb);h.receiveShadow=!0,n.add(h);let u=vs(t,f=>c*(s[f]+V0),f=>c*(s[f]+_r),{range:a,y:be.runoff});n.add(new bt(u,e.runoff))}}let r=dc();for(let{side:o,first:a,last:c,width:l}of eE(t)){let h=vs(t,f=>o*(s[f]+_r),(f,d)=>o*(s[f]+_r+l[d-a]),{range:[a,c],y:be.gravel,vScale:.1});nE(r,h);let u=new bt(h,e.gravel);u.receiveShadow=!0,n.add(u)}for(let{side:o,first:a,last:c}of iE(t,r)){let l=k0(t,u=>o*(s[u]+W0),[a,c],WA,.14285714285714285),h=new bt(l,e.barrier);h.castShadow=!0,h.receiveShadow=!0,n.add(h)}}function G0(i,t){let e=i.length,n=new Float64Array(e),s=0;for(let r=-t;r<=t;r++)s+=i[(r+e)%e];for(let r=0;r<e;r++)n[r]=s/(2*t+1),s+=i[(r+t+1)%e]-i[(r-t+e)%e];return n}function eE(i){let{line:t,halfWidth:e}=i,n=t.count,s=Math.round(YA/2/t.spacing),r=Float64Array.from(i.cornerness,c=>Nt(c,.3,1)),o=G0(G0(r,s),s),a=[];for(let{side:c,first:l,last:h}of i.gravel){let u=h-l+1,f=Math.min(qA,.3*(u-1)*t.spacing),d=new Float64Array(u),m=new Uint8Array(u);for(let y=0;y<u;y++){let _=(l+y)%n,v=GA*o[_],A=Math.min(ZA,v),S=Math.min(y,u-1-y)*t.spacing,w=A+(v-A)*Xe(Nt(S/f,0,1)),E=Math.abs(i.edge(_,c*(e[_]+_r))),b=Math.abs(i.edge(_,c*(e[_]+_r+w)))-E;d[y]=Math.min(w,b),m[y]=d[y]>=$A?1:0}let x=Cu(m,2);if(!x.length)continue;let[g,p]=x.reduce((y,_)=>_[1]-_[0]>y[1]-y[0]?_:y);a.push({side:c,first:l+g,last:l+p,width:d.subarray(g,p+1)})}return a}function nE(i,t){let e=t.attributes.position,n=t.index;for(let s=0;s<n.count;s+=3){let[r,o,a]=[n.getX(s),n.getX(s+1),n.getX(s+2)];i.addTriangle(e.getX(r),e.getZ(r),e.getX(o),e.getZ(o),e.getX(a),e.getZ(a))}}function Cu(i,t){let e=[];for(let n=0;n<i.length;n++){if(!i[n])continue;let s=n;for(;s+1<i.length&&i[s+1];)s++;s-n+1>=t&&e.push([n,s]),n=s}return e}function iE(i,t){let{line:e,halfWidth:n}=i,s=e.count,r=Math.ceil(XA/e.spacing)+1,o=dc();for(let u=0;u<s;u++)o.addDisc(e.x[u],e.z[u],n[u]);let a=(u,f)=>{let d=u*(n[f]+W0),m=d+u*uc;return[d,m].map(x=>[e.x[f]+e.nx[f]*x,e.z[f]+e.nz[f]*x,x])},c=[];for(let{side:u,first:f,last:d}of i.gravel){let m=new Uint8Array(d-f+1);for(let x=0;x<m.length;x++){let g=(f+x)%s;m[x]=a(u,g).every(([p,y,_])=>i.edge(g,_)===_&&o.distance(p,y,H0)>=H0&&t.distance(p,y,pc)>=pc)?1:0}for(let[x,g]of Cu(m,r))c.push({side:u,first:f+x,last:f+g})}c.sort((u,f)=>f.last-f.first-(u.last-u.first)||u.first-f.first);let l=dc(),h=[];for(let{side:u,first:f,last:d}of c){let m=new Uint8Array(d-f+1);for(let v=0;v<m.length;v++)m[v]=a(u,(f+v)%s).every(([A,S])=>l.distance(A,S,pc)>=pc)?1:0;let x=Cu(m,r);if(!x.length)continue;let[g,p]=x.reduce((v,A)=>A[1]-A[0]>v[1]-v[0]?A:v),y={side:u,first:f+g,last:f+p};h.push(y);let _=null;for(let v=y.first;v<=y.last;v++){let A=a(u,v%s);if(_)for(let S=0;S<2;S++)l.addSegment(_[S][0],_[S][1],A[S][0],A[S][1]);(v===y.first||v===y.last)&&l.addSegment(A[0][0],A[0][1],A[1][0],A[1][1]),_=A}}return h.sort((u,f)=>f.side-u.side||u.first-f.first)}function X0(i,t){let{model:e}=t;i.root.userData.trackModel=e,JA(i,e),jA(i,e),QA(i,e),tE(i,e)}var Y0=new Ot(1,1,1),Iu=6,Si=64,sE=.45,q0=.15,Z0=30;function J0(i){let t=e=>{let n=new yt({vertexColors:!0,roughness:.92,metalness:0});return Xn(n,"vegetation-"+e,i,{vertex:{head:`attribute float aLeaf;
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
        }`}})};return{near:t("near"),far:t("far")}}var $0=(i,t,e)=>{let n=Math.max(0,Math.min(1,(e-i)/(t-i)));return n*n*(3-2*n)};function K0(i,t,e,{name:n,fadeStart:s,fadeEnd:r,castShadow:o}){let{count:a,matrices:c,colors:l,x:h,y:u,z:f}=e,d=Math.max(1,a),m=new $e(i.far,t.far,d);m.name=n+"-far",m.count=a,m.instanceMatrix.array.set(c),m.instanceMatrix.needsUpdate=!0,m.setColorAt(0,Y0),m.instanceColor.array.set(l),m.instanceColor.needsUpdate=!0,m.castShadow=!1,m.receiveShadow=!0,m.computeBoundingSphere();let x=new ki(new Float32Array(d).fill(1),1);i.far.setAttribute("aLodFade",x);let g=1/0,p=1/0,y=-1/0,_=-1/0;for(let I=0;I<a;I++)g=Math.min(g,h[I]),y=Math.max(y,h[I]),p=Math.min(p,f[I]),_=Math.max(_,f[I]);a||(g=p=y=_=0);let v=Math.max(1,Math.ceil((y-g)/Si)+1),A=Math.max(1,Math.ceil((_-p)/Si)+1),S=new Int32Array(v*A+1),w=new Int32Array(a),E=I=>Math.floor((f[I]-p)/Si)*v+Math.floor((h[I]-g)/Si);for(let I=0;I<a;I++)S[E(I)+1]++;for(let I=0;I<v*A;I++)S[I+1]+=S[I];let b=S.slice(0,v*A);for(let I=0;I<a;I++)w[b[E(I)]++]=I;let M=r+2*Iu,R=Math.ceil(2*M/Si)+1,N=1;for(let I=0;I<A;I++)for(let T=0;T<v;T++){let W=0;for(let nt=I;nt<Math.min(A,I+R);nt++)for(let ot=T;ot<Math.min(v,T+R);ot++){let at=nt*v+ot;W+=S[at+1]-S[at]}N=Math.max(N,W)}let L=new ki(new Float32Array(N),1);i.near.setAttribute("aLodFade",L);let C=new $e(i.near,t.near,N);C.name=n+"-near",C.count=0,C.setColorAt(0,Y0),C.castShadow=o,C.receiveShadow=!0;let B=C.instanceMatrix.array,U=C.instanceColor.array,z=L.array,F=x.array,J=new Map([C.instanceMatrix,C.instanceColor,L].map(I=>[I,{start:0,count:0}])),$=(I,T)=>{let W=J.get(I);W.count=T,I.updateRanges.includes(W)||I.updateRanges.push(W),I.needsUpdate=!0},ct=new Float32Array(a).fill(1),ht=new Uint8Array(a).fill(1),Mt=new Int32Array(N),j=new Int32Array(N),Y=0,Z=new Uint8Array(a),et=r-s,mt=s+et*(.5+q0),Rt=s+et*(.5-q0),Ut=s+et*.5,Xt=Math.min(r-1,Math.max(mt+.5,r-6)),it=Math.max(s-6+1,Math.min(Rt-.5,s)),lt=1/0,O=1/0,Ct=1/0,dt=1/0,St=1/0,rt=1/0;function xt(I,T,W){lt=I,O=T,Ct=W;let nt=j;j=Mt,Mt=nt,Y=C.count;let ot=0,at=M*M,Bt=Math.max(0,Math.floor((I-M-g)/Si)),At=Math.min(v-1,Math.floor((I+M-g)/Si)),Lt=Math.max(0,Math.floor((W-M-p)/Si)),ne=Math.min(A-1,Math.floor((W+M-p)/Si));for(let wt=0;wt<Y;wt++)Z[j[wt]]=0;for(let wt=Lt;wt<=ne&&ot<N;wt++)for(let kt=Bt;kt<=At&&ot<N;kt++){let Yt=wt*v+kt;for(let It=S[Yt];It<S[Yt+1]&&ot<N;It++){let Wt=w[It],Kt=h[Wt]-I,Qt=u[Wt]-T,X=f[Wt]-W;if(!(Kt*Kt+Qt*Qt+X*X>at)){for(let H=0;H<16;H++)B[ot*16+H]=c[Wt*16+H];U[ot*3]=l[Wt*3],U[ot*3+1]=l[Wt*3+1],U[ot*3+2]=l[Wt*3+2],Mt[ot]=Wt,Z[Wt]=1,ot++}}}let gt=!1;for(let wt=0;wt<Y;wt++){let kt=j[wt];Z[kt]||ct[kt]===1||(ct[kt]=F[kt]=1,ht[kt]=1,gt=!0)}gt&&(x.needsUpdate=!0),C.count=ot,$(C.instanceMatrix,ot*16),$(C.instanceColor,ot*3),C.computeBoundingSphere()}function ut(I,T,W,nt=0,ot=!1){let at=I-dt,Bt=T-St,At=W-rt,Lt=ot||!(at*at+Bt*Bt+At*At<Z0*Z0);dt=I,St=T,rt=W;let ne=I-lt,gt=T-O,wt=W-Ct;ne*ne+gt*gt+wt*wt>=Iu*Iu&&xt(I,T,W);let kt=nt>0?nt/sE:0,Yt=!1,It=!1,Wt=C.count;for(let Kt=0;Kt<Wt;Kt++){let Qt=Mt[Kt],X=h[Qt]-I,H=u[Qt]-T,k=f[Qt]-W,V=Math.sqrt(X*X+H*H+k*k),Q;Lt?(ht[Qt]=V<Ut?0:1,Q=ht[Qt]):(V>mt?ht[Qt]=1:V<Rt&&(ht[Qt]=0),Q=ct[Qt],Q=ht[Qt]?Math.min(1,Q+kt):Math.max(0,Q-kt),Q=Math.min(Math.max(Q,$0(Xt,r,V)),$0(s-6,it,V))),(Q!==ct[Qt]||z[Kt]!==Q)&&(ct[Qt]=Q,z[Kt]=Q,Yt=!0),F[Qt]!==Q&&(F[Qt]=Q,It=!0)}Yt&&$(L,Wt),It&&(x.needsUpdate=!0)}return{far:m,near:C,update:ut,level:ct,get nearCount(){return C.count}}}var Yn=new D,mc=new Ot,So=null,Pu={};function rE(i){if(!Pu[i]){let t=new Ma(1,i);t.deleteAttribute("uv"),t.deleteAttribute("normal"),Pu[i]=Jd(t)}return Pu[i]}function Q0(i,t,e,n,s){let r=new fe;return r.setAttribute("position",new zt(i,3)),r.setAttribute("normal",new zt(t,3)),r.setAttribute("color",new zt(e,3)),r.setAttribute("aLeaf",new zt(n,1)),r.setIndex(s),r}function Ye(i,{centre:t,radii:e,detail:n,jitter:s=.18,colour:r,crown:o,crownScale:a,crownSize:c,aoBottom:l=.45}){So?.clumps.push({centre:t,radii:e,jitter:s});let h=rE(n),u=h.attributes.position,f=[],d=[],m=[],x=[],g=.9+i()*.2;for(let p=0;p<u.count;p++){let y=u.getX(p),_=u.getY(p),v=u.getZ(p),A=1+(i()-.5)*2*s,S=t[0]+y*e[0]*A,w=t[1]+_*e[1]*A,E=t[2]+v*e[2]*A;f.push(S,w,E),Yn.set((S-o[0])/a[0],(w-o[1])/a[1],(E-o[2])/a[2]),Yn.normalize();let b=[y/e[0],_/e[1],v/e[2]],M=Math.hypot(b[0],b[1],b[2])||1,R=.65;Yn.set(Yn.x*R+b[0]/M*(1-R),Yn.y*R+b[1]/M*(1-R),Yn.z*R+b[2]/M*(1-R)),Yn.normalize(),d.push(Yn.x,Yn.y,Yn.z);let N=Math.max(0,Math.min(1,(o[1]-w)/c[1]+.35)),L=1-Math.min(1,Math.hypot((S-o[0])/c[0],(E-o[2])/c[2])),C=(1-l*N)*(1-.3*L)*g;mc.set(r),m.push(mc.r*C,mc.g*C,mc.b*C),x.push(1)}return Q0(f,d,m,x,Array.from(h.index.array))}function Tn(i,t,e,n,s=null,r=null){So?.tubes.push({points:i,radii:t});let o=[],a=[],c=[],l=[],h=[],u=new Ot(n),f=s!=null?new Ot(s):u,d=[];for(let m=0;m<=e;m++)d.push(s!=null&&r&&r()<.4?1:0);for(let m=0;m<i.length;m++){let[x,g,p]=i[m],y=i[Math.min(i.length-1,m+1)],_=i[Math.max(0,m-1)],v=Yn.set(y[0]-_[0],y[1]-_[1],y[2]-_[2]).normalize(),A=Math.abs(v.y)<.99?new D(0,1,0).cross(v).normalize():new D(1,0,0),S=new D().crossVectors(v,A).normalize(),w=.75+.25*Math.min(1,g/3);for(let E=0;E<=e;E++){let b=E/e*Math.PI*2,M=A.x*Math.cos(b)+S.x*Math.sin(b),R=A.y*Math.cos(b)+S.y*Math.sin(b),N=A.z*Math.cos(b)+S.z*Math.sin(b);o.push(x+M*t[m],g+R*t[m],p+N*t[m]),a.push(M,R,N);let L=d[E]?f:u;c.push(L.r*w,L.g*w,L.b*w),l.push(0)}}for(let m=0;m<i.length-1;m++)for(let x=0;x<e;x++){let g=m*(e+1)+x,p=g+e+1;h.push(g,p,g+1,g+1,p,p+1)}return Q0(o,a,c,l,h)}var qi=(i,t)=>({crown:i,crownScale:t,crownSize:t});function bo(i,t,{centre:e,ring:n,y:s,radius:r,flatten:o,colour:a,detail:c,crown:l,phase:h=0,ySpread:u=0}){let f=[];for(let d=0;d<t;d++){let m=h+d/t*Math.PI*2+(i()-.5)*.5,x=n*(.85+i()*.3),g=r*(.85+i()*.3);f.push(Ye(i,{centre:[e[0]+Math.cos(m)*x,s+(i()-.5)*2*u,e[2]+Math.sin(m)*x],radii:[g,g*o,g],detail:c,colour:a,...l}))}return f}function oE(i){let t=Ue(11),e=i>0,n=11.4,s=qi([.6,n,.2],[6.2,1.7,6.2]),r=4016676,o=[];if(e){o.push(Tn([[0,0,0],[.15,3,.05],[.35,6,.1],[.5,8.6,.15]],[.34,.27,.23,.2],7,7031349));for(let[a,c]of[[-2.6,1.4],[2.9,-.4],[.6,-2.8]])o.push(Tn([[.5,8.4,.15],[.5+a*.5,9.6,.15+c*.5],[.5+a,n-.6,.15+c]],[.17,.12,.08],5,7031349));o.push(Ye(t,{centre:[.6,n+.3,.2],radii:[3.2,1.25,3.2],detail:1,colour:r,...s})),o.push(...bo(t,8,{centre:[.6,0,.2],ring:3.9,y:n,radius:2.4,flatten:.52,colour:r,detail:1,crown:s,ySpread:.35})),o.push(...bo(t,4,{centre:[.6,0,.2],ring:1.8,y:n+.9,radius:2.1,flatten:.5,colour:4543274,detail:1,crown:s,phase:.4}))}else o.push(Tn([[0,0,0],[.5,10.2,.15]],[.3,.2],3,7031349)),o.push(Ye(t,{centre:[.6,n+.35,.2],radii:[3.6,1.4,3.6],detail:0,jitter:.1,colour:3819041,...s})),o.push(...bo(t,5,{centre:[.6,0,.2],ring:3.6,y:n,radius:2.7,flatten:.5,colour:3621663,detail:0,crown:s,ySpread:.25}));return dn(o)}function aE(i){let t=Ue(23),e=i>0,n=qi([0,15.5,0],[3.4,3.6,3.4]),s=[];if(e){s.push(Tn([[0,0,0],[.3,5,.1],[.1,10,.3],[.4,17,.2]],[.32,.26,.2,.1],6,6177843));for(let r=0;r<7;r++){let o=12+r*1.05+(t()-.5)*.6,a=r*2.4+t(),c=(1-(o-12)/9)*2.2+.6,l=[Math.cos(a)*c*.8,o,Math.sin(a)*c*.8];s.push(Tn([[.2,o-.7,.25],l],[.09,.05],4,6177843)),s.push(Ye(t,{centre:l,radii:[1.9+t()*.6,1,1.9+t()*.6],detail:1,colour:3029538,...n}))}s.push(Ye(t,{centre:[.4,18.4,.2],radii:[1.4,1.1,1.4],detail:1,colour:3424298,...n}))}else{s.push(Tn([[0,0,0],[.4,14,.2]],[.28,.14],3,6177843));for(let[r,o,a,c]of[[.9,13.4,.5,2.6],[-.8,15.6,-.4,2.3],[.4,17.8,.2,1.7]])s.push(Ye(t,{centre:[r,o,a],radii:[c,c*.55,c],detail:0,jitter:.15,colour:2832160,...n}))}return dn(s)}function cE(i){let t=Ue(37),e=i>0,n=qi([0,20,0],[4,6.5,4]),s=[[0,0,0],[-.2,6,.1],[.1,13,-.1],[.3,20,.2],[.2,25.5,.1]],r=l=>{for(let h=1;h<s.length;h++)if(l<=s[h][1]){let[u,f,d]=s[h-1],[m,x,g]=s[h],p=(l-f)/(x-f);return[u+(m-u)*p,l,d+(g-d)*p]}return s[s.length-1]},o=[];for(let l=0;l<9;l++){let h=12+l*1.35+(t()-.5)*.5,u=l*2.4+(t()-.5)*.6,f=(3.4-l*.2)*(.85+t()*.3),d=f*(.75+t()*.35),m=r(h),x=[m[0]+Math.cos(u)*f*.5,h+d*.42,m[2]+Math.sin(u)*f*.5],g=[m[0]+Math.cos(u)*f,h+d,m[2]+Math.sin(u)*f];o.push({start:m,mid:x,end:g,size:1.25+t()*.35,side:.85+t()*.25})}let a=[],c=5201480;if(e){a.push(Tn(s,[.42,.34,.27,.18,.08],7,13222835,8019525,t));for(let{start:l,mid:h,end:u,size:f,side:d}of o)a.push(Tn([l,h,u],[.13,.09,.05],4,12433062)),a.push(Ye(t,{centre:u,radii:[f,f*.85,f],detail:1,jitter:.22,colour:c,...n})),a.push(Ye(t,{centre:[h[0],h[1]+.2,h[2]],radii:[d,d*.8,d],detail:1,jitter:.22,colour:5662030,...n}));a.push(Ye(t,{centre:[.2,25.2,.1],radii:[1.2,1.4,1.2],detail:1,jitter:.2,colour:c,...n}))}else{a.push(Tn([s[0],s[3]],[.38,.16],3,13222835));for(let{end:l,size:h}of o){let u=h*1.12;a.push(Ye(t,{centre:l,radii:[u,u*.85,u],detail:0,jitter:.15,colour:4674623,...n}))}a.push(Ye(t,{centre:[.2,25.2,.1],radii:[1.3,1.5,1.3],detail:0,jitter:.12,colour:4674623,...n}))}return dn(a)}function lE(i){let t=Ue(41),e=i>0,n=qi([0,5.4,0],[4.1,3,4.1]),s=[];if(e)s.push(Tn([[0,0,0],[.2,1.6,.1],[.1,3.4,-.1],[0,4.6,0]],[.36,.3,.22,.15],6,5917244)),s.push(Ye(t,{centre:[0,5.6,0],radii:[2.8,2.3,2.8],detail:1,colour:2831136,...n})),s.push(...bo(t,6,{centre:[0,0,0],ring:2.5,y:5,radius:2,flatten:.85,colour:3094564,detail:1,crown:n,ySpread:.7})),s.push(Ye(t,{centre:[.4,7.2,-.3],radii:[1.8,1.4,1.8],detail:1,colour:3423783,...n}));else{s.push(Tn([[0,0,0],[.1,3.4,-.1]],[.32,.2],3,5917244));for(let[r,o,a,c]of[[0,5.9,0,2.9],[1.9,5,.9,2.2],[-1.7,5.1,-1.1,2.2]])s.push(Ye(t,{centre:[r,o,a],radii:[c,c*.8,c],detail:0,jitter:.12,colour:2765343,...n}))}return dn(s)}function hE(i){let t=Ue(53),e=i>0,n=qi([0,6.5,0],[1.4,6,1.4]),s=[];if(e){s.push(Tn([[0,0,0],[0,1.4,0]],[.2,.18],5,5127216));for(let r=0;r<6;r++){let o=2+r*1.75,a=1.35*(1-r/7.5);s.push(Ye(t,{centre:[(t()-.5)*.2,o,(t()-.5)*.2],radii:[a,1.25,a],detail:1,jitter:.2,colour:2503202,...n}))}}else s.push(Ye(t,{centre:[0,4.6,0],radii:[1.3,3.6,1.3],detail:0,jitter:.08,colour:2305568,...n})),s.push(Ye(t,{centre:[0,9.2,0],radii:[.9,2.6,.9],detail:0,jitter:.08,colour:2437153,...n}));return dn(s)}function uE(i){let t=Ue(67),e=i>0,n=qi([0,.45,0],[1.2,.6,1.2]),s=[];return e?(s.push(Ye(t,{centre:[0,.42,0],radii:[.85,.55,.85],detail:1,jitter:.28,colour:5394975,aoBottom:.6,...n})),s.push(...bo(t,6,{centre:[0,0,0],ring:.8,y:.32,radius:.5,flatten:.85,colour:5921322,detail:0,crown:n,ySpread:.12}))):s.push(Ye(t,{centre:[0,.4,0],radii:[1.25,.62,1.25],detail:0,jitter:.1,colour:5066015,aoBottom:.6,...n})),dn(s)}function fE(i){let t=Ue(79),e=i>0,n=qi([0,.9,0],[.9,1,.9]),s=[];s.push(Ye(t,{centre:[0,.8,0],radii:[.85,.95,.85],detail:i,jitter:.25,colour:7040565,aoBottom:.5,...n}));let r=e?7:3;for(let o=0;o<r;o++){let a=o/r*Math.PI*2+t(),c=.25+t()*.35,l=[Math.cos(a)*c,2.6+t()*.6,Math.sin(a)*c];e&&s.push(Tn([[0,1.2,0],l],[.02,.015],3,10853492)),s.push(Ye(t,{centre:l,radii:[.12,.42,.12],detail:0,jitter:.1,colour:15261643,aoBottom:.1,...qi(l,[.3,.5,.3])}))}return dn(s)}var j0={stonePine:oE,maritimePine:aE,eucalyptus:cE,holmOak:lE,cypress:hE,scrub:uE,pampas:fE};function tg(i){So={clumps:[],tubes:[]};let t=j0[i](1),e=So;So=null;let n=j0[i](0);t.computeBoundingBox(),n.computeBoundingBox(),n.boundingBox.union(t.boundingBox),t.computeBoundingSphere(),n.computeBoundingSphere();let s=n.boundingBox,r=Math.max(-s.min.x,s.max.x,-s.min.z,s.max.z);return{near:t,far:n,radius:r,height:s.max.y,parts:e}}var Mr={trees:5200,scrub:4200,pampas:60,tufts:9e3},eg={high:[105,140],mid:[80,105],low:[48,62]},ng={high:[42,66],mid:[32,50],low:[20,30]},Ss={tree:25,scrub:8,tuft:1.2},gc={tree:1.5,scrub:.6,tuft:.4},vr=[{name:"stonePine",share:.33,scale:[.8,1.25],lean:.08},{name:"eucalyptus",share:.24,scale:[.75,1.2],lean:.03},{name:"holmOak",share:.25,scale:[.75,1.3],lean:.03},{name:"maritimePine",share:.15,scale:[.8,1.2],lean:.05},{name:"cypress",share:.03,scale:[.85,1.2],lean:.01}],ig={high:464728694,mid:2786073173,low:799962821},Lu=1520,yn=(i,t,e)=>Xe(Nt((e-i)/(t-i),0,1)),wo=(i,t)=>Math.hypot(i/1.15,t*1.25),Nu=(i,t)=>yn(uo[0],uo[1],on(0,i/1730+.31,t/1730+.77)*.45+on(0,i/523,t/523)*.35+on(1,i/151+.5,t/151+.5)*.2),Du=L0,Ms=2048;function cg(i,t){let e=1/0,n=-1/0;for(let a=0;a<t;a++)e=Math.min(e,i[a]),n=Math.max(n,i[a]);let s=new Float64Array(Ms),r=new Float64Array(Ms),o=n>e?Ms/(n-e):0;for(let a=0;a<t;a++){let c=Math.min(Ms-1,Math.floor((i[a]-e)*o));s[c]++,r[c]+=i[a]}for(let a=0;a<Ms;a++)s[a]&&(r[a]/=s[a]);return{counts:s,means:r}}function dE(i,t,e,n){let{counts:s,means:r}=cg(i,t),o=0,a=1e6;for(let l=0;l<40;l++){let h=(o+a)/2,u=0;for(let f=0;f<Ms;f++)u+=s[f]*Math.min(1,r[f]*h);u>e?a=h:o=h}let c=[];for(let l=0;l<t;l++)n()<Math.min(1,i[l]*o)&&c.push(l);return c}function pE(i,t,e,n,s){let{counts:r,means:o}=cg(i,e),a=-1,c=2;for(let f=0;f<24;f++){let d=(a+c)/2,m=0;for(let x=0;x<Ms;x++)m+=r[x]*yn(d-.03,d+.03,o[x]);m>n*.88?a=d:c=d}let l=0;for(let f=0;f<e;f++)l+=t[f]*(1-yn(c-.03,c+.03,i[f]));let h=l>0?Math.min(1,n*.12/l):0,u=[];for(let f=0;f<e;f++){let d=yn(c-.03,c+.03,i[f]);s()<d+(1-d)*t[f]*h&&u.push(f)}return u}function xc(i){return{count:0,matrices:new Float32Array(i*16),colors:new Float32Array(i*3),x:new Float32Array(i),y:new Float32Array(i),z:new Float32Array(i),scale:new Float32Array(i)}}var sg=new Gt,rg=new Oe,og=new vn,mE=new D,gE=new D;function yc(i,t,e,n,{yaw:s,leanX:r,leanZ:o,sx:a,sy:c,sz:l,r:h,g:u,b:f,scale:d}){let m=i.count++;og.set(r,s,o,"YXZ"),rg.setFromEuler(og),sg.compose(gE.set(t,e,n),rg,mE.set(a,c,l)),sg.toArray(i.matrices,m*16),i.colors[m*3]=h,i.colors[m*3+1]=u,i.colors[m*3+2]=f,i.x[m]=t,i.y[m]=e,i.z[m]=n,i.scale[m]=d}function _c(i){let t=i.count;return{count:t,matrices:i.matrices.slice(0,t*16),colors:i.colors.slice(0,t*3),x:i.x.slice(0,t),y:i.y.slice(0,t),z:i.z.slice(0,t),scale:i.scale.slice(0,t)}}function xE(i,t){let e=0;for(let s of i)e+=s;let n=t*e;for(let s=0;s<i.length;s++)if(n-=i[s],n<=0)return s;return i.length-1}function yE(i,t,e,n){let s=Ue(4201),r=8/Math.sqrt(Math.max(.35,Math.min(1,n/Mr.trees))),o=(Math.floor(3700/r)+1)*(Math.floor(2600/r)+1),a=new Float32Array(o),c=new Float32Array(o),l=new Float32Array(o),h=new Uint8Array(o),u=0;for(let A=0,S=-1300;S<=1300;S+=r,A++)for(let w=0,E=-1850;E<=1850;E+=r,w++){let b=wo(E,S);if(b>800&&(w+A)%2||b>Lu+10)continue;let M=E+(s()-.5)*r*.75,R=S+(s()-.5)*r*.75,N=wo(M,R);if(N>Lu||i.infield(M,R))continue;let L=i.trackDistance(M,R);if(L<Ss.tree-3||t.isKeepClearZone(M,R))continue;let C=on(0,M/1400+.13,R/1400+.71)*.55+on(1,M/600,R/600)*.25+on(2,M/260,R/260)*.2,B=Ss.tree+12*on(1,M/340+.2,R/340+.6),U=B+15+25*on(2,M/520+.7,R/520+.1),z=yn(.3,.42,on(0,M/210+.5,R/210+.9));C+=.32*z*yn(B,B+4,L)*(1-yn(U-4,U+4,L)),N>700&&(C+=.6*Math.min(.3,Du(M,R))),C-=.2*yn(950,Lu,N),a[u]=M,c[u]=R,l[u]=C,h[u]=N<800?1:0,u++}let f=pE(l,h,u,n*1.06,s),d=vr.length,m=new Float32Array(f.length*d),x=new Float64Array(d),g=new Float32Array(d);for(let A=0;A<f.length;A++){let S=a[f[A]],w=c[f[A]],E=i.trackDistance(S,w),b=yn(.5,.7,on(1,S/2200+.4,w/2200+.1)),M=wo(S,w)>700?Math.min(.3,Du(S,w)):0,R=1-yn(40,70,E);g[0]=1+.6*R,g[1]=.25+3*b,g[2]=1+.8*R,g[3]=1+6*M,g[4]=i.solidDistance(S,w)<45&&E>40?4:.5;let N=0;for(let L=0;L<d;L++)N+=g[L];for(let L=0;L<d;L++)m[A*d+L]=g[L]/N,x[L]+=g[L]/N}let p=vr.map(({share:A},S)=>x[S]>0?A*f.length/x[S]:0),y=Int32Array.from(f.keys());for(let A=y.length-1;A>0;A--){let S=Math.floor(s()*(A+1));[y[A],y[S]]=[y[S],y[A]]}let _=vr.map(()=>xc(f.length)),v=0;for(let A=0;A<y.length&&!(v>=n);A++){let S=y[A],w=a[f[S]],E=c[f[S]];for(let j=0;j<d;j++)g[j]=m[S*d+j]*p[j];let b=xE(g,s()),M=vr[b],R=e[M.name],N=M.scale[0]+s()*(M.scale[1]-M.scale[0]),L=N*(.9+s()*.2),C=N*(.9+s()*.2),B=N*(.88+s()*.24),U=R.radius*Math.max(L,C),z=s()*Math.PI*2,F=(s()-.5)*2*M.lean,J=(s()-.5)*2*M.lean,$=.86+s()*.26;if(!i.clear(w,E,Math.max(Ss.tree,U*.6),U+gc.tree))continue;let ct=wo(w,E)>700?Math.min(.3,Du(w,E)):0,ht=Nu(w,E),Mt=_o(w,E)-.12-.5*ct;v++,yc(_[b],w,Mt,E,{yaw:z,leanX:F,leanZ:J,sx:L,sy:B,sz:C,r:$*(1+.1*ht),g:$*(1+.02*ht),b:$*(1-.12*ht),scale:N})}return Object.fromEntries(vr.map((A,S)=>[A.name,_c(_[S])]))}function _E(i,t,e,n,s){let r=Ue(4307),o=4.5/Math.sqrt(Math.max(.35,Math.min(1,n/Mr.scrub))),{x0:a,z0:c,x1:l,z1:h}=i.bounds,u=(Math.floor((l-a)/o)+2)*(Math.floor((h-c)/o)+2),f=new Float32Array(u),d=new Float32Array(u),m=new Float32Array(u),x=0,g=[];for(let _=c;_<=h;_+=o)for(let v=a;v<=l;v+=o){let A=v+(r()-.5)*o*.8,S=_+(r()-.5)*o*.8,w=i.trackDistance(A,S);if(w<Ss.scrub-3||wo(A,S)>1100)continue;let E=yn(.5,.85,on(2,A/160,S/160)),b=yn(.4,.62,on(0,A/1400+.13,S/1400+.71)),M;if(i.infield(A,S))M=.45*E*yn(14,24,w);else{let N=yn(12,22,w)*(1-yn(45,80,w));M=Math.max(N*(.35+.65*E),.3*E*(.4+.6*b))}t.isKeepClearZone(A,S)&&(M*=.15),M>.001&&(f[x]=A,d[x]=S,m[x++]=M);let R=i.solidDistance(A,S);R>2&&R<9&&w>30&&on(1,A/300,S/300)>.6&&g.push([A,S])}let p=xc(n*2);for(let _ of dE(m,x,n*1.05,r)){if(p.count>=n)break;let v=f[_],A=d[_],S=.5+r()*r()*.9,w=S*(.8+r()*.5),E=S*(.8+r()*.5),b=S*(.7+r()*.6),M=r()*Math.PI*2,R=.85+r()*.3,N=Nu(v,A),L=e.scrub.radius*Math.max(w,E);i.clear(v,A,Ss.scrub,L+gc.scrub)&&yc(p,v,_o(v,A)-.08,A,{yaw:M,leanX:0,leanZ:0,sx:w,sy:b,sz:E,r:R*(1+.12*N),g:R,b:R*(1-.1*N),scale:S})}let y=xc(s);for(let _=0;_<g.length&&y.count<s;_++){let v=_+Math.floor(r()*(g.length-_));[g[_],g[v]]=[g[v],g[_]];let[A,S]=g[_],w=.85+r()*.35,E=r()*Math.PI*2;i.clear(A,S,Ss.scrub,e.pampas.radius*w+gc.scrub)&&yc(y,A,_o(A,S)-.05,S,{yaw:E,leanX:0,leanZ:0,sx:w,sy:w,sz:w,r:1,g:1,b:1,scale:w})}return{scrub:_c(p),pampas:_c(y)}}function vE(i,t,e){let n=Ue(4409),s=xc(e),{line:r,halfWidth:o}=t,a=(l,h)=>{if(s.count>=e||on(2,l/35,h/35)<.42+n()*.2)return;let f=.6+n()*.65,d=n()*Math.PI;if(!i.clear(l,h,Ss.tuft,.5*f+gc.tuft))return;let m=Nu(l,h),x=(.72+n()*.3)*1.1;yc(s,l,_o(l,h),h,{yaw:d,leanX:0,leanZ:0,sx:f,sy:f*(.8+n()*.4),sz:f,r:x*(.7+.55*m),g:x*(.95+.05*m),b:x*(.5+.12*m),scale:f})},c=Math.round(e*.75);for(let l=0;l<c*4&&s.count<c;l++){let h=Math.floor(n()*r.count),f=(n()<.5?-1:1)*(o[h]+2+Math.pow(n(),1.7)*46);a(r.x[h]+r.nx[h]*f,r.z[h]+r.nz[h]*f)}for(let l=0;l<e*6&&s.count<e;l++)a(-620+n()*1100,60+n()*230);return _c(s)}function ME(i,t,e){let n=[];for(let l=0;l<3;l++){let h=new ve(1,.62);h.translate(0,.31,0),h.rotateY(l*Math.PI/3),n.push(h)}let s=dn(n),r=s.attributes.normal;for(let l=0;l<r.count;l++)r.setXYZ(l,0,1,0);let o=new yt({map:Fp(),alphaTest:.5,alphaToCoverage:i.quality!=="low",side:Pe,roughness:1}),a={value:0};Xn(o,"tufts",i.textures.detail,{uniforms:{envTime:a,envTuftFade:{value:new ft(e[0],e[1])}},vertex:{head:`uniform float envTime;
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
      vec3 nonPerturbedNormal = normal;`}});let c=new $e(s,o,Math.max(1,t.count));return c.name="grass-tufts",c.count=t.count,c.instanceMatrix.array.set(t.matrices),c.setColorAt(0,new Ot(1,1,1)),c.instanceColor.array.set(t.colors),c.receiveShadow=!0,c.castShadow=!1,c.computeBoundingSphere(),i.root.add(c),{mesh:c,time:a}}var ag={high:[1024,720],mid:[768,540],low:[512,360]},lg=[-1850,-1300,1850,1300];function SE(i,t){let[e,n]=ag[t]||ag.mid,[s,r,o,a]=lg,c=e/(o-s),l=n/(a-r),h=new Float32Array(e*n);for(let{data:d,radius:m,strength:x}of i)for(let g=0;g<d.count;g++){let p=m*d.scale[g]*1.15,y=(d.x[g]-s)*c,_=(d.z[g]-r)*l,v=Math.max(1.5,p*c),A=Math.max(1.5,p*l),S=x*Math.min(1,p*c/v)*Math.min(1,p*l/A)||0;for(let w=Math.floor(_-A);w<=Math.ceil(_+A);w++)for(let E=Math.floor(y-v);E<=Math.ceil(y+v);E++){if(E<0||w<0||E>=e||w>=n)continue;let b=((E+.5-y)/v)**2+((w+.5-_)/A)**2;b<1&&(h[w*e+E]+=S*(1-b)*(1-b))}}let u=new Uint8Array(e*n);for(let d=0;d<e*n;d++)u[d]=Math.round(255*Math.min(1,h[d]));let f=new Sn(u,e,n,yi);return f.magFilter=f.minFilter=rn,f.generateMipmaps=!1,f.unpackAlignment=1,f.name="env-canopy",f.needsUpdate=!0,f}function hg(i,t){let{materials:e,quality:n,density:s}=i,r=i.root.userData.trackModel,o={},a=performance.now(),c=E=>{let b=performance.now();o[E]=Math.round(b-a),a=b};e.line.userData.envSkipOccupancy=!0;let l=new Set(i.root.children.filter(E=>E.name==="ground"||E.name==="hills"||E.name==="clouds")),h=qm(i.root,{trackMaterial:e.asphalt,skip:l,loop:r.line});c("occupancy");let u={};for(let E of[...vr.map(b=>b.name),"scrub","pampas"])u[E]=tg(E);c("models");let f=yE(h,t,u,Math.round(Mr.trees*s));c("trees");let{scrub:d,pampas:m}=_E(h,t,u,Math.round(Mr.scrub*s),Math.round(Mr.pampas*s));c("scrub");let x=vE(h,r,Math.round(Mr.tufts*s));c("tufts");let[g,p]=eg[n]||eg.mid,y=J0(i.textures.detail),_=n!=="low",v=[];for(let[E,b]of[...Object.entries(f),["scrub",d],["pampas",m]]){if(!b.count)continue;let M=K0(u[E],y,b,{name:E,fadeStart:g,fadeEnd:p,castShadow:_&&E!=="scrub"&&E!=="pampas"});i.root.add(M.far,M.near),v.push({name:E,lod:M,data:b,radius:u[E].radius})}let A=ME(i,x,ng[n]||ng.mid),S=SE([...Object.entries(f).map(([E,b])=>({data:b,radius:u[E].radius,strength:.42})),{data:d,radius:u.scrub.radius,strength:.3}],n),w=e.ground.userData.uniforms;return w.envCanopy.value=S,w.envCanopyBounds.value.set(...lg),c("meshes"),i.updaters.push((E,b,M,R)=>{if(A.time.value=E,!M)return;let N=M.position;for(let L=0;L<v.length;L++)v[L].lod.update(N.x,N.y,N.z,b,R)}),i.rng=Ue(ig[n]??ig.high),{species:v,tufts:{mesh:A.mesh,data:x},occupancy:h,models:u,timings:o}}function bE(i,t){i.updateMatrixWorld(!0);for(let e of i.children)e!==t&&(e.traverse(n=>n.matrixAutoUpdate=!1),e.matrixWorldAutoUpdate=!1)}function ug(i,{quality:t="high"}={}){let e=s0(i,t),n=e.layout,s=O0(e.track);Gm(e.materials,e.textures.lap,s.model),D0(e),N0(e),X0(e,s),km(e.materials,e.root),A0(e),E0(e),f0(e),h0(e),d0(e),_0(e),jm(e,s),Qm(e);let r=hg(e,s);mo(e,n.grandstandX0+8,17,n.grandstandZ+16,15282981,e.root),mo(e,n.grandstandX1-8,17,n.grandstandZ+16,16118766,e.root),t0(e);let o=e.root.getObjectByName("clouds");Za(e.root,{skip:o}),bE(e.root,o);let{updaters:a}=e;return{root:e.root,materials:e.materials,layout:n,track:e.track,vegetation:r,update(c,l,h,u=!1){for(let f=0;f<a.length;f++)a[f](c,l,h,u)}}}var wE=.02,fg=.05,AE=.01,EE=0,TE=[.26,.37,.47,.7,.95],Uu=i=>performance.mark&&performance.mark(i);function RE(i,t,e,n){let s=t.map(r=>r.visible);for(let r of t)r.visible=!1;return i.update(e,n),t.forEach((r,o)=>r.visible=s[o]),i.clearance}async function d3({canvas:i,trackUrl:t,carUrl:e,carMetaUrl:n,quality:s="high",onProgress:r=()=>{}}){let o=_m(i,s),a=ym(s),c=new zi;c.fog=new ma(14279913,ou,au);let l=new ln(36,1,.3,9e3),h=qd(l),u=du(),f=Pm(u);c.add(f);let{hemi:d,sun:m}=rm(c,o,s),x=cm(m),g=Ka(),p=Dm({renderer:o,scene:c,quality:s}),y=um(s),[_,v]=await Promise.all([fetch(t).then(rt=>rt.json()),fetch(n).then(rt=>rt.json())]);r(.15),Uu("ce:data");let A=_.pts,S=ug(A,{quality:s,renderer:o});c.add(S.root);let w=S.root.getObjectByName("clouds")?.children??[],E=Float64Array.from(w,rt=>rt.position.x),b=new Float64Array(w.length);r(.35),Uu("ce:world");let M=await hp(e,v,{quality:s,onProgress:rt=>rt.total&&r(.35+.55*rt.loaded/rt.total)});c.add(M.root),lm(M.root),r(.92),Uu("ce:car");let R=Om(S.root.userData.trackModel);c.add(R.mesh);let N=S.root.userData.openBox,L=$p();c.add(...L.members),Jp(c);let C=Kp(c),B=[M.root,...L.members,...C.map(([rt])=>rt)];h.build(c,{sky:f,movers:B}),pm(c),o.setOpaqueSort(mm),hm(c);let U=Zd(A),z=bp(U),F=vp(U,A),J=Mp(jh(F)),$=jh(F).map(rt=>rt[1]),ct=fp(S.root,z,$,M.contacts),ht=wp(M,z,F.arrival,{roadHeight:ct.heightAt}),Mt=Hh(z),j=Hh(z),Y=Hd(l,bd,Mt,{circuit:A,carBox:v.bounds,frameAt:rt=>j.update(J(rt)),clearanceAt:(rt,xt)=>RE(h,B,rt,xt)}),Z=xm(),et=0,mt=0,Rt=!1,Ut=!0,Xt=0,it={progress:0,introEase:1,clock:0,debugCam:null,width:1,height:1,framing:{panel:null,open:null,windows:null,fade:0}},lt=vm(i,o,l,a);function O(rt,xt){mt+=rt,lt.update()&&ms(y),Z.advance(rt,xt);let ut=Z.value,I=Z.introEase,T=J(ut);Z.intro<1&&(T=Sp(T,Z.intro,F)),ht.update(T,rt,mt),Mt.update(T),jp(L,ut,mt,z,F.pitBox,N),Qp(C,ut,mt);let W=Ja(ut);ja(W,g),om(g,{sun:m,hemi:d,scene:c,renderer:o}),Lm(u,g),p.update(W),it.progress=ut,it.introEase=I,it.clock=mt,it.debugCam=St.debugCam,it.width=lt.width,it.height=lt.height,Y.update(it),h.update(Y.position,Y.target),am(c.fog,Y.position.y),l.updateMatrixWorld(),x.update(g.sunDir,l,Y.target),R.update(ut,rt,xt,St.basePixelRatio*lt.resScale),S.update(mt,rt,l,xt);let nt=fm(y,ut,Y.position.y-Mt.p.y);dm(o,c,l,y,nt)}function Ct(rt){if(Xt=0,!Rt)return;Xt=requestAnimationFrame(Ct);let xt=Math.min(fg,Math.max(0,(rt-et)/1e3));et=rt,Ut?O(xt,!1):mt+=xt}function dt(){return{progress:Z.value,target:Z.target,velocity:Z.velocity,intro:Z.intro,introDone:Z.introDone,clock:mt,carDistance:ht.lastDistance,wheelDistance:ht.wheelDistance,speed:ht.speed,prevSpeed:ht.prevSpeed,drift:w.reduce((rt,xt)=>rt+xt.position.x,0)}}p.update(Ja(0)),Mm(c,o,s),Sm(c),r(1);let St={renderer:o,scene:c,camera:l,car:M,world:S,STAGES:gm,setProgress(rt){Z.target=Nt(rt,0,1)},get progress(){return Z.value},skipIntro(){Z.finishIntro()},jump(rt){Z.target=Z.value=Nt(rt,0,1),Z.velocity=0,ht.lastDistance=J(Z.value),Z.value>AE&&Z.finishIntro(),ms(y)},async warmup(){let rt=[];c.traverse(ut=>{ut.visible||(rt.push(ut),ut.visible=!0)});try{o.compileAsync&&o.extensions.has("KHR_parallel_shader_compile")?await o.compileAsync(c,l):o.compile(c,l)}catch{}for(let ut of rt)ut.visible=!1;let xt=dt();for(let ut=0;ut<w.length;ut++)b[ut]=w[ut].position.x;for(let ut of TE)St.renderAt(ut),await new Promise(I=>requestAnimationFrame(I));Z.value=xt.progress,Z.target=xt.target,Z.velocity=xt.velocity,Z.intro=xt.intro,Z.introDone=xt.introDone,mt=xt.clock,ht.lastDistance=xt.carDistance,ht.wheelDistance=xt.wheelDistance,ht.speed=xt.speed,ht.prevSpeed=xt.prevSpeed;for(let ut=0;ut<w.length;ut++)w[ut].position.x=b[ut];p.update(Ja(Z.value)),R.update(Z.value,0,!0,St.basePixelRatio*lt.resScale),ms(y)},setFraming(rt=0,xt=0,ut=null){let I=it.framing;if(ut){I.panel=ut.panel,I.open=ut.open||ut.panel,ut.windows&&(I.windows=ut.windows),ut.fade&&(I.fade=ut.fade);return}let T=.5+Nt(rt,-.4,.4),W=.5-Nt(xt,-.4,.4),nt=Math.min(T,1-T)-.02,ot=Math.min(W,1-W)-.02;I.panel=[T-nt,W-ot,T+nt,W+ot],I.open=null},start(){Rt||(Rt=!0,ms(y),et=performance.now(),Xt||(Xt=requestAnimationFrame(Ct)))},stop(){Rt=!1,Xt&&cancelAnimationFrame(Xt),Xt=0},setVisible(rt){rt&&!Ut&&ms(y),Ut=rt},renderAt(rt,{intro:xt=1,speed:ut=null,dt:I=0}={}){let T=Nt(Number(rt)||0,0,1),W=Nt(Number(I)||0,0,fg);if((!W||Math.abs(T-Z.value)>wE)&&ms(y),Z.target=Z.value=T,Z.velocity=0,Z.intro=Nt(xt,0,1),Z.introDone=Z.intro>=1,!W){ht.lastDistance=J(T),mt=EE;for(let nt=0;nt<w.length;nt++)w[nt].position.x=E[nt]}ut!=null&&(ht.speed=ut),O(W,!0)},debugState(){return{...dt(),envStep:p.step,blurHistory:y?y.hasPrev:null,highlight:[R.mesh.visible,R.mesh.material.opacity],running:Rt,pendingFrame:Xt!==0,framing:{panel:it.framing.panel,open:it.framing.open}}},debugCam:null,setResScale(rt){lt.resScale=Nt(rt,.2,1)},get resScale(){return lt.resScale},get basePixelRatio(){return Math.min(window.devicePixelRatio||1,a)}};return St}export{d3 as createJourney};
