(function(e){function t(t){for(var o,i,a=t[0],c=t[1],u=t[2],d=0,f=[];d<a.length;d++)i=a[d],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&f.push(r[i][0]),r[i]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);l&&l(t);while(f.length)f.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],o=!0,a=1;a<n.length;a++){var c=n[a];0!==r[c]&&(o=!1)}o&&(s.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},r={app:0},s=[];function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var l=c;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},1966:function(e,t,n){"use strict";n("bf39")},"25a6":function(e,t,n){},"2efa":function(e,t,n){"use strict";n("c71e")},3632:function(e,t,n){"use strict";n("25a6")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Home",{class:{mobile:e.isMobile}})],1)},s=[],i=new o["a"]({data:{isMobile:!1}}),a=n("7707"),c=n.n(a),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{hidden:!e.loaded},attrs:{id:"home"}},[n("Userland")],1)},l=[],d=(n("ac1f"),n("1276"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"userland"}},[n("Grid",{attrs:{hidden:!e.grid}}),n("header",[e._m(0),n("div",{staticClass:"tools"},[n("span",[e._v(" options ")]),n("div",{staticClass:"grid"},[n("input",{attrs:{type:"checkbox",name:"grid",checked:""},domProps:{value:e.grid},on:{click:function(t){return e.toggleGrid(t)}}}),n("label",{attrs:{for:"grid"}},[e._v("grid")])]),n("div",{staticClass:"messages"},[n("input",{attrs:{type:"button",name:"messages",value:"clear messages"},on:{click:function(t){return e.clearMessages(t)}}})]),n("div",{staticClass:"storage"},[n("input",{attrs:{type:"button",name:"storage",value:"clear storage"},on:{click:function(t){return e.clearLocalStorage(t)}}})])])]),e.registered?e._e():n("Register",{attrs:{me:e.me},on:{registered:e.saveMe}}),e.me?n("User",{ref:"me",attrs:{uid:e.me.uid,name:e.me.name,color:e.me.color,isMe:!0,connected:e.me.connected,x:e.me.x,y:e.me.y,messages:e.me.messages}}):e._e(),e._l(e.users,(function(e){return n("User",{key:e.uid,ref:"Users",refInFor:!0,attrs:{uid:e.uid,name:e.name,color:e.color,connected:e.connected,x:e.x,y:e.y,typing:e.typing,messages:e.messages}})}))],2)}),f=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"lounge"},[n("span",[e._v(" cursor lounge ")])])}],m=(n("99af"),n("c975"),n("b0c0"),n("3835")),p=(n("96cf"),n("1da1")),h=n("8a77"),g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("table",{class:{hidden:e.hidden},attrs:{id:"grid"}},[n("tbody",e._l(e.y,(function(t){return n("Row",{key:t,attrs:{x:e.x}})})),1)])},v=[],y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("tr",e._l(e.x,(function(e){return n("Cell",{key:e})})),1)},b=[],M=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("td")},_=[],w={name:"Cell"},x=w,k=(n("fe21"),n("2877")),O=Object(k["a"])(x,M,_,!1,null,"7cdee33c",null),C=O.exports,S={name:"Row",components:{Cell:C},props:["x"]},$=S,j=Object(k["a"])($,y,b,!1,null,"b5b15c9a",null),P=j.exports,E={name:"Grid",components:{Row:P},props:["hidden"],data:function(){return{y:50,x:50}}},U=E,T=(n("656b"),Object(k["a"])(U,g,v,!1,null,"39042f4e",null)),R=T.exports,D=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.uid?n("div",{staticClass:"user",class:[e.uid,{me:e.isMe}],style:{"--userColor":e.connected?e.color:"lightgrey"}},[n("Cursorr",{ref:"Cursor",attrs:{uid:e.uid,name:e.name,color:e.color,isMe:e.isMe,x:e.x,y:e.y,typing:e.typing,hovered:e.hovered,connected:e.connected},nativeOn:{mouseover:function(t){!e.isMe&&(e.hovered=!0)},mouseleave:function(t){e.hovered=!1}}}),e._l(e.messages,(function(t){return n("Message",{key:t.uid,ref:"Messages",refInFor:!0,attrs:{uid:t.uid,author:t.author,content:t.content,time:t.time,color:t.color,x:t.x,y:t.y,hovered:e.hovered},nativeOn:{mouseover:function(t){e.hovered=!0},mouseleave:function(t){e.hovered=!1}}})}))],2):e._e()},N=[],J=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.uid?n("div",{staticClass:"cursorContainer",class:{uid:e.uid,typing:e.typing||e.hovered},style:{left:e.x-1+"%",top:e.y-.75+"%"}},[e.isMe?n("input",{ref:"input",staticClass:"input",attrs:{type:"text",placeholder:"type message & press enter",autofocus:""}}):n("span",{staticClass:"input"},[e._v(e._s(e.typing))]),n("div",{staticClass:"cursor"},[e.typing||e.hovered?n("span",{staticClass:"name"},[e._v(e._s(e.isMe?"me":e.connected?e.name:e.name+" (offline)"))]):n("span",{staticClass:"name"})])]):e._e()},F=[],B={name:"Cursorr",components:{},props:["uid","name","color","isMe","x","y","typing","hovered","connected"],data:function(){return{}},mounted:function(){},methods:{}},L=B,G=(n("3632"),Object(k["a"])(L,J,F,!1,null,"59ac6aee",null)),H=G.exports,I=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.uid?n("div",{staticClass:"messageContainer",class:[e.uid,{hover:e.hovered}],style:{left:e.x+"%",top:e.y+"%","--blur":"blur("+(e.now-e.time)/1e7+"px)"}},[n("vue-markdown",{staticClass:"message"},[e._v(" "+e._s(e.content)+" ")]),n("span",{staticClass:"time"},[e._v(" "+e._s(e.fromNow(e.time))+" ")])],1):e._e()},z=[],W=n("f817"),A={name:"Message",components:{},props:["uid","author","isMe","content","time","color","x","y","hovered"],data:function(){return{now:(new Date).getTime()}},mounted:function(){},methods:{fromNow:function(e){return Object(W["a"])(e).fromNow()}}},V=A,Y=(n("f87e"),Object(k["a"])(V,I,z,!1,null,null,null)),K=Y.exports,X={name:"User",components:{Cursorr:H,Message:K},props:["uid","name","color","isMe","connected","x","y","typing","messages"],data:function(){return{hovered:!1}},mounted:function(){},methods:{}},q=X,Q=(n("1966"),Object(k["a"])(q,D,N,!1,null,"b4019836",null)),Z=Q.exports,ee=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{},attrs:{id:"registerContainer"}},[n("div",{attrs:{id:"register"}},[n("h3",[e._v("Welcome.")]),n("p",[e._v("To join the conversation, please pick a display name and color. You can change these later.")]),n("div",{staticClass:"form"},[n("input",{ref:"name",attrs:{type:"text",placeholder:"pick a display name"}}),n("input",{ref:"color",attrs:{type:"text","data-jscolor":""}}),n("input",{ref:"submit",attrs:{type:"button",value:"save"},on:{click:function(t){return e.save()}}})]),n("p",[e._v("This site does not use cookies. The information you are entering is stored in your browser and sent to all the other users.")])])])},te=[],ne=n("881d"),oe=n.n(ne),re={name:"Register",props:["me"],data:function(){return{colorPickerOpts:{format:"rgba",previewPosition:"right",previewSize:30,borderRadius:0,padding:0,controlBorderColor:"rgba(255,255,255,0)",sliderSize:13,shadow:!1}}},mounted:function(){oe.a.presets.default=this.colorPickerOpts,this.$refs.color.value=this.me.color},methods:{save:function(){var e={name:this.$refs.name.value,color:this.$refs.color.value};this.$emit("registered",e)}}},se=re,ie=(n("2efa"),Object(k["a"])(se,ee,te,!1,null,"ae4c0346",null)),ae=ie.exports,ce={name:"Userland",components:{Grid:R,Register:ae,User:Z},data:function(){return{me:{uid:Object(h["a"])(),connected:!1,name:"newUser-"+Object(h["a"])(),color:this.randomColor(),x:0,y:0,typing:String,messages:[]},registered:this.checkForMe(),visited:this.checkIfVisited(),users:{},storedUsers:{},connectedUsers:{},grid:!0}},created:function(){this.registered?this.me=JSON.parse(localStorage.me):this.visited?(this.me.uid=localStorage.uid,this.me.color=localStorage.color):(localStorage.uid=this.me.uid,localStorage.color=this.me.color),this.track(this.me),this.checkForDB()&&(this.users=JSON.parse(localStorage.users))},mounted:function(){},sockets:{connect:function(){this.me.connected=!0,this.announceUser()},disconnect:function(){this.me.connected=!1},dbSync:function(e){console.log(e)},broadcast:function(e){var t=this;return Object(p["a"])(regeneratorRuntime.mark((function n(){var o,r,s,i,a,c,u;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e=JSON.parse(e),o=e.user,r=e.msg.type,s=e.msg.content,o.uid!==t.me.uid&&(t.$set(t.users,o.uid,o),i=t.users[o.uid],"user"==r?t.announceDB():"position"==r||"typing"==r||"message"==r||"disconnect"==r&&(i.connected=!1)),"db"==r){for(c in a=s,a)u=a[c],c!==t.me.uid&&t.$set(t.users,c,u);t.saveDB()}case 6:case"end":return n.stop()}}),n)})))()}},methods:{checkForMe:function(){if(localStorage.me)return!0;console.log("you've been here before.")},checkIfVisited:function(){if(localStorage.uid)return!0;console.log("you're new.")},checkForDB:function(){if(localStorage.users)return!0;console.log("you haven't made a userDb yet.")},saveMe:function(e){this.me.name=e.name,this.me.color=e.color,this.announceUser(),this.registered=!0,localStorage.me=JSON.stringify(this.me)},saveDB:function(){localStorage.users=JSON.stringify(this.users)},announceUser:function(){this.sendToPeers({type:"user",content:""})},announcePosition:function(){this.sendToPeers({type:"position",content:""})},announceTyping:function(e){this.sendToPeers({type:"typing",content:e})},announceMessage:function(e){this.sendToPeers({type:"message",content:e})},announceDB:function(){this.sendToPeers({type:"db",content:this.users})},sendToPeers:function(e){this.$socket.emit("pingServer",this.me,e)},constructMessage:function(e){var t=(new Date).getTime(),n={uid:this.me.uid+t,author:this.me.name,content:e,time:t,color:this.me.color,x:2*Math.floor(this.me.x/2),y:2*Math.floor(this.me.y/2)};return n},track:function(e){var t,n,o,r=this;e.uid==this.me.uid&&(document.addEventListener("mousemove",(function(e){t=100*e.clientX/window.innerWidth,n=100*e.clientY/window.innerHeight,r.$set(r.me,"x",t),r.$set(r.me,"y",n),r.announcePosition(r.me),e.preventDefault()})),document.addEventListener("keyup",(function(e){if(r.registered){var t=r.$refs.me.$refs.Cursor.$refs.input,n=e.which||e.keyCode,s=r.computeMessages(r.me.messages,o),i=Object(m["a"])(s,4),a=i[0],c=i[1],u=i[2],l=i[3];if(t!==document.activeElement){if(n>=48&&n<=90){var d=String.fromCharCode(n);t.value=d}t.focus()}var f=r.constructMessage(t.value);r.me.typing=f.content,r.announceTyping(f),27==n?(t.value="",t.blur()):38==n?o?u?(o=u,t.value=o.content,t.select()):(o=a,t.value=o.content):(o=c,t.value=o.content,t.select()):40==n?o&&l&&(o=l,t.value=o.content,t.select()):13!=n||e.shiftKey||f.content&&" "!=f.content&&(t.value=t.value-"\n",r.me.messages.push(f),r.me.typing="",localStorage.me=JSON.stringify(r.me),r.announceMessage(f),o=void 0,t.value="",t.placeholder=""),e.preventDefault()}})),document.addEventListener("click",(function(e){if(r.registered){console.log("send");var t=r.$refs.me.$refs.Cursor.$refs.input,n=r.constructMessage(t.value);n.content&&" "!=n.content&&(r.me.messages.push(n),localStorage.me=JSON.stringify(r.me),r.announceMessage(n),o=void 0,t.value="",t.placeholder=""),e.stopPropagation(),e.preventDefault()}})))},computeMessages:function(e,t){var n=e[0],o=e[e.length-1],r=e[e.indexOf(t)-1],s=e[e.indexOf(t)+1];return[n,o,r,s]},clearLocalStorage:function(e){console.log("clearing storage"),localStorage.clear(),window.location.reload(!0),e.stopPropagation()},clearMessages:function(e){this.me.messages=[],this.me.typing="",localStorage.me=JSON.stringify(this.me),e.stopPropagation()},toggleGrid:function(e){this.grid=!this.grid,e.stopPropagation()},randomColor:function(){var e=Math.floor(256*Math.random()),t=Math.floor(256*Math.random()),n=Math.floor(256*Math.random()),o=1,r="rgb(".concat(e,", ").concat(t,", ").concat(n,", ").concat(o,")");return r}}},ue=ce,le=(n("9fe0"),Object(k["a"])(ue,d,f,!1,null,null,null)),de=le.exports,fe={name:"Home",components:{Userland:de},data:function(){return{loaded:!1,status:"loading...",isMobile:!!i.$root.isMobile}},created:function(){var e=this;i.$root.isMobile&&(this.isMobile=!0),this.$http.get(this.$apiURL+"/sessions").then((function(t){e.sessions=t.data,e.loaded=!0,e.msg="ready."})).catch((function(t){console.log(t),e.msg="there is an error :( contact karl <bonjour@moubarak.eu>"}))},mounted:function(){var e=this;this.$router.afterEach((function(t){e.slug=t.path.split("/")[1],e.handleRouting(e.slug)}))},methods:{handleRouting:function(e){e&&console.log(e)}}},me=fe,pe=(n("cccb"),Object(k["a"])(me,u,l,!1,null,null,null)),he=pe.exports,ge={name:"App",components:{Home:he},data:function(){return{isMobile:Boolean}},created:function(){this.CheckForMobile(),window.addEventListener("resize",this.CheckForMobile),c.a.polyfill()},methods:{CheckForMobile:function(){window.innerWidth<=760?(i.$root.isMobile=!0,this.isMobile=!0):(i.$root.isMobile=!1,this.isMobile=!1)}}},ve=ge,ye=(n("034f"),Object(k["a"])(ve,r,s,!1,null,null,null)),be=ye.exports,Me=n("8c4f");o["a"].use(Me["a"]);var _e=[{path:"/",name:"Home",component:he}],we=new Me["a"]({mode:"history",routes:_e}),xe=we,ke=n("bc3a"),Oe=n.n(ke),Ce=n("5132"),Se=n.n(Ce),$e=n("8e27"),je=n.n($e),Pe=n("9ce6"),Ee=n.n(Pe),Ue=n("2699"),Te=n("a40a"),Re=n("dee2"),De=n("4e2b");n("6cc5");o["a"].component("l-map",Ue["a"]),o["a"].component("l-tile-layer",Te["a"]),o["a"].component("l-grid-layer",Re["a"]),o["a"].component("l-marker",De["a"]);var Ne=je()("https://io.karls.computer");o["a"].use(new Se.a({connection:Ne})),Ee.a.props.anchorAttributes.default=function(){return{target:"_blank",rel:"noopener noreferrer nofollow"}},o["a"].component("vue-markdown",Ee.a),o["a"].prototype.$http=Oe.a,o["a"].prototype.$apiURL="https://api.obfuscation.karls.computer",new o["a"]({router:xe,render:function(e){return e(be)}}).$mount("#app")},"5ced":function(e,t,n){},"5d27":function(e,t,n){},"656b":function(e,t,n){"use strict";n("dda1")},"7de5":function(e,t,n){},"85ec":function(e,t,n){},"9fe0":function(e,t,n){"use strict";n("7de5")},afbc:function(e,t,n){},bf39:function(e,t,n){},c71e:function(e,t,n){},cccb:function(e,t,n){"use strict";n("5ced")},dda1:function(e,t,n){},f87e:function(e,t,n){"use strict";n("afbc")},fe21:function(e,t,n){"use strict";n("5d27")}});
//# sourceMappingURL=app.d3c9945b.js.map