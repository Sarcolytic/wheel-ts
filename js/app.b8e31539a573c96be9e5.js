!function(t){function e(e){for(var s,o,h=e[0],a=e[1],c=e[2],d=0,p=[];d<h.length;d++)o=h[d],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&p.push(n[o][0]),n[o]=0;for(s in a)Object.prototype.hasOwnProperty.call(a,s)&&(t[s]=a[s]);for(l&&l(e);p.length;)p.shift()();return r.push.apply(r,c||[]),i()}function i(){for(var t,e=0;e<r.length;e++){for(var i=r[e],s=!0,h=1;h<i.length;h++){var a=i[h];0!==n[a]&&(s=!1)}s&&(r.splice(e--,1),t=o(o.s=i[0]))}return t}var s={},n={0:0},r=[];function o(e){if(s[e])return s[e].exports;var i=s[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=s,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(i,s,function(e){return t[e]}.bind(null,s));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var h=window.webpackJsonp=window.webpackJsonp||[],a=h.push.bind(h);h.push=e,h=h.slice();for(var c=0;c<h.length;c++)e(h[c]);var l=a;r.push([12,1]),i()}({12:function(t,e,i){t.exports=i(21)},21:function(t,e,i){"use strict";i.r(e);var s=i(0);var n,r=new class{load(){const t="texture",e=new s.Loader;return e.add(t,"img/texture.json",void 0,()=>{this._textures=Object.assign({},e.resources[t].textures)}),new Promise(t=>{e.load(t)})}texture(t){return this._textures[t]}sprite(t){return new s.Sprite(this.texture(t))}};function o(t,e){return t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t+1))+t}!function(t){t[t.IDLE=0]="IDLE",t[t.ACCELERATION=1]="ACCELERATION",t[t.ROTATION=2]="ROTATION",t[t.DECELERATION=3]="DECELERATION"}(n||(n={}));class h extends s.Container{constructor(){super(),this.speed=h.INITIAL_SPEED,this.time=0,this.circle=r.sprite("circle"),this.circle.anchor.set(.5),this.addChild(this.circle);const t=r.sprite("pointer");t.anchor.set(.5),t.y=-this.circle.height/2,this.addChild(t),s.Ticker.shared.add(this.rotate,this)}start(t){this.stopSector=t,this.isAcceleration=!0,this.startedSpeed=this.speed,this.acceleration=this.calcAcceleration(this.startedSpeed),this.time=0,this.changeState(n.ACCELERATION)}stop(){this.isDeceleration=!0,this.startedSpeed=this.speed,this.acceleration=this.calcDeceleration(this.startedSpeed),this.time=0,window.clearTimeout(this.inactiveTimer),this.changeState(n.DECELERATION)}rotate(){this.isAcceleration?this.accelerate():this.isDeceleration&&this.decelerate(),this.circle.rotation+=this.speed*s.Ticker.shared.elapsedMS}getNewSpeed(){return this.time+=s.Ticker.shared.elapsedMS,this.startedSpeed+this.acceleration*this.time}calcAcceleration(t){return(h.MAX_SPEED-t)/h.ACCELERATION_TIME}accelerate(){this.speed=this.speed=this.getNewSpeed(),this.speed>=h.MAX_SPEED&&(this.speed=h.MAX_SPEED,this.isAcceleration=!1,this.startInactiveTimer(),this.changeState(n.ROTATION))}decelerate(){this.speed=this.getNewSpeed(),this.speed<0&&(this.speed=0,this.isDeceleration=!1,this.changeState(n.IDLE))}calcDeceleration(t){return-(t**2)/(2*this.getDistance())}getEndingAngle(){const t=2*Math.PI/h.TOTAL_WHEEL_SECTORS;return 2*Math.PI-t*this.stopSector+.017453292519943295*o(10,20)}getDistance(){return 4*Math.PI-this.getCurrentAngle()+this.getEndingAngle()}getCurrentAngle(){return this.circle.rotation%(2*Math.PI)}startInactiveTimer(){this.inactiveTimer=window.setTimeout(()=>{this.stop()},1e4)}changeState(t){this.emit(h.EVENT_STATE_CHANGE,t)}}h.EVENT_STATE_CHANGE="onStateChange",h.INITIAL_SPEED=2*Math.PI/5e3,h.MAX_SPEED=2*Math.PI/1e3,h.ACCELERATION_TIME=2e3,h.TOTAL_WHEEL_SECTORS=12;class a extends s.Container{constructor(t,e){super(),this.sprite=t,this.sprite.anchor.set(.5),this.sprite.position.set(t.width/2,t.height/2),this.addChild(this.sprite),this.spriteDisable=e,this.spriteDisable.anchor.set(.5),this.spriteDisable.position.set(e.width/2,e.height/2),this.addChild(this.spriteDisable),this.setEnabled(!0),this.on("pointerdown",this.onPointerDown,this),this.on("pointerup",this.onPointerUp,this),this.on("pointerupoutside",this.onPointerUp,this),this.on("pointertap",this.onPointerTap,this),this.hitArea=new s.Rectangle(0,0,t.width,t.height)}setEnabled(t){this.interactive=t,this.sprite.visible=t,this.spriteDisable.visible=!t}onPointerDown(){this.sprite.scale.set(.9)}onPointerUp(){this.sprite.scale.set(1)}onPointerTap(){this.onPointerUp(),this.emit(a.EVENT_CLICK)}}a.EVENT_CLICK="onClick";var c=i(11),l=i.n(c);class d extends s.Container{constructor(){super();const t=new s.TextStyle({fill:"#ffffff",fontSize:36,fontStyle:"italic",strokeThickness:4}),e=new s.Text("Sector",t);e.anchor.set(.5,0),e.roundPixels=!0,e.position.set(81,0),this.addChild(e),this.input=new l.a({input:{fontSize:"30px",padding:"12px",width:"138px",color:"#3399ff",textAlign:"center",fontWeight:"bold"},box:{default:{fill:15264243,stroke:{color:0,width:1}},focused:{fill:14803950,stroke:{color:0,width:1}},disabled:{fill:14408667}}}),this.input.restrict=/^([1-9]|1[0-2]|)$/,this.input.position.set(0,50),this.addChild(this.input)}getValue(){return parseInt(this.input.text)}setEnabled(t){this.input.disabled=!t}}class p extends s.Container{constructor(){super(),this.wheel=new h,this.wheel.position.set(400),this.wheel.on(h.EVENT_STATE_CHANGE,this.onWheelChangeState,this),this.addChild(this.wheel);const t=new s.Container;t.position.set(800,250),this.addChild(t),this.sectorSelector=new d,t.addChild(this.sectorSelector),this.startButton=new a(r.sprite("btn_start"),r.sprite("btn_start_disable")),this.startButton.y=this.sectorSelector.height+20,this.startButton.on(a.EVENT_CLICK,this.onStartButtonClicked,this),t.addChild(this.startButton),this.stopButton=new a(r.sprite("btn_stop"),r.sprite("btn_stop_disable")),this.stopButton.y=this.startButton.y+this.startButton.height+10,this.stopButton.on(a.EVENT_CLICK,this.onStopButtonClicked,this),this.stopButton.setEnabled(!1),t.addChild(this.stopButton)}onWheelChangeState(t){switch(t){case n.IDLE:this.startButton.setEnabled(!0),this.sectorSelector.setEnabled(!0);break;case n.ACCELERATION:this.startButton.setEnabled(!1),this.sectorSelector.setEnabled(!1);break;case n.ROTATION:this.stopButton.setEnabled(!0);break;case n.DECELERATION:this.stopButton.setEnabled(!1)}}onStartButtonClicked(){let t=this.sectorSelector.getValue();isNaN(t)&&(t=o(1,12)),this.wheel.start(t)}onStopButtonClicked(){this.wheel.stop()}}class u{constructor(){this.app=new s.Application({width:1024,height:768,backgroundColor:13421772,view:document.getElementById("game")}),this.app.view.addEventListener("contextmenu",t=>t.preventDefault()),this.startLoading()}async startLoading(){await r.load(),this.onLoaded()}onLoaded(){this.app.stage.addChild(new p)}}window.onload=()=>{new u}}});