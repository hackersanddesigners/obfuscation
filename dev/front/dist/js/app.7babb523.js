(function(e){function t(t){for(var o,i,a=t[0],c=t[1],u=t[2],d=0,f=[];d<a.length;d++)i=a[d],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&f.push(r[i][0]),r[i]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);l&&l(t);while(f.length)f.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],o=!0,a=1;a<n.length;a++){var c=n[a];0!==r[c]&&(o=!1)}o&&(s.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},r={app:0},s=[];function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var l=c;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"278a":function(e,t,n){},"2aef":function(e,t,n){"use strict";n("278a")},4406:function(e,t,n){"use strict";n("89e8")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Home",{class:{mobile:e.isMobile}})],1)},s=[],i=new o["a"]({data:{isMobile:!1}}),a=n("7707"),c=n.n(a),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{hidden:!e.loaded},attrs:{id:"home"}},[n("Userland")],1)},l=[],d=(n("ac1f"),n("1276"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"userland"}},[n("Grid",{attrs:{hidden:e.tableHidden}}),e.registered?e._e():n("Register",{attrs:{me:e.me},on:{registered:e.saveMe}}),e.me?n("User",{ref:"me",attrs:{uid:e.me.uid,name:e.me.name,color:e.me.color,isMe:!0}}):e._e(),e._l(e.users,(function(e){return n("User",{key:e.uid,ref:"Users",refInFor:!0,attrs:{uid:e.uid,name:e.name,color:e.color}})}))],2)}),f=[],m=(n("99af"),n("7db0"),n("4160"),n("b0c0"),n("d3b7"),n("159b"),n("96cf"),n("1da1")),h=n("8a77"),p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("table",{class:{hidden:e.hidden},attrs:{id:"grid"}},[n("tbody",e._l(e.y,(function(t){return n("Row",{key:t,attrs:{x:e.x}})})),1)])},g=[],v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("tr",e._l(e.x,(function(e){return n("Cell",{key:e})})),1)},b=[],y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("td")},M=[],_={name:"Cell"},x=_,w=(n("fe21"),n("2877")),k=Object(w["a"])(x,y,M,!1,null,"7cdee33c",null),O=k.exports,$={name:"Row",components:{Cell:O},props:["x"]},C=$,S=Object(w["a"])(C,v,b,!1,null,"b5b15c9a",null),j=S.exports,U={name:"Grid",components:{Row:j},props:["hidden"],data:function(){return{y:50,x:50}}},E=U,P=(n("656b"),Object(w["a"])(E,p,g,!1,null,"39042f4e",null)),R=P.exports,F=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.uid?n("div",{staticClass:"user",class:[e.uid,{me:e.isMe}],style:{color:e.color}},[n("p",{staticClass:"userLabel",on:{mouseover:function(t){!e.isMe&&(e.hovered=!0)},mouseleave:function(t){e.hovered=!1}}},[n("span",[e._v("("+e._s(e.x.toFixed(2))+", "+e._s(e.y.toFixed(2))+")")]),n("span",[e._v(" "+e._s(e.name)+" ")])]),n("Cursorr",{ref:"Cursor",attrs:{uid:e.uid,name:e.name,color:e.color,isMe:e.isMe,x:e.x,y:e.y,typing:e.typing,hovered:e.hovered},nativeOn:{mouseover:function(t){!e.isMe&&(e.hovered=!0)},mouseleave:function(t){e.hovered=!1}}}),e._l(e.messages,(function(t){return n("Message",{key:t.author+t.time+t.content,ref:"Messages",refInFor:!0,attrs:{uid:t.author,author:t.author,content:t.content,time:t.time,color:t.color,x:t.x,y:t.y,hovered:e.hovered},nativeOn:{mouseover:function(t){e.hovered=!0},mouseleave:function(t){e.hovered=!1}}})}))],2):e._e()},T=[],N=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.uid?n("div",{staticClass:"cursorContainer",class:{uid:e.uid,typing:e.typing||e.hovered},style:{left:e.x-1+"%",top:e.y-.75+"%"}},[e.isMe?n("input",{ref:"input",staticClass:"input",attrs:{type:"text",placeholder:"type message & press enter"}}):n("span",{staticClass:"input"},[e._v(e._s(e.typing))]),n("div",{staticClass:"cursor",style:{background:e.color}},[e.typing||e.hovered?n("span",{staticClass:"name"},[e._v(e._s(e.isMe?"me":e.name))]):n("span",{staticClass:"name"})])]):e._e()},J=[],H={name:"Cursorr",components:{},props:["uid","name","color","isMe","x","y","typing","hovered"],data:function(){return{}},mounted:function(){},methods:{}},L=H,D=(n("4406"),Object(w["a"])(L,N,J,!1,null,"850dc6e2",null)),I=D.exports,z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.uid?n("div",{staticClass:"messageContainer",class:[e.uid,{hover:e.hovered}],style:{left:e.x+"%",top:e.y+"%",color:e.color}},[n("vue-markdown",{staticClass:"message"},[e._v(" "+e._s(e.content)+" ")]),n("span",{staticClass:"time"},[e._v(" "+e._s(e.fromNow(e.time))+" ")])],1):e._e()},G=[],W=n("f817"),A={name:"Message",components:{},props:["uid","author","isMe","content","time","color","x","y","hovered"],data:function(){return{}},mounted:function(){},methods:{fromNow:function(e){return Object(W["a"])(e).fromNow()}}},B=A,V=(n("f87e"),Object(w["a"])(B,z,G,!1,null,null,null)),Y=V.exports,X={name:"User",components:{Cursorr:I,Message:Y},props:["uid","name","color","isMe"],data:function(){return{x:0,y:0,typing:"",messages:[],hovered:!1}},mounted:function(){},methods:{}},q=X,K=(n("d488"),Object(w["a"])(q,F,T,!1,null,"2d8e8cce",null)),Q=K.exports,Z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{},attrs:{id:"registerContainer"}},[n("div",{attrs:{id:"register"}},[n("h3",[e._v("Welcome.")]),n("p",[e._v("To join the conversation, please pick a display name and color. You can change these later.")]),n("div",{staticClass:"form"},[n("input",{ref:"name",attrs:{type:"text",placeholder:"pick a display name"}}),n("input",{ref:"color",attrs:{type:"text","data-jscolor":""}}),n("input",{ref:"submit",attrs:{type:"button",value:"save"},on:{click:function(t){return e.save()}}})]),n("p",[e._v("This site does not use cookies. The information you are entering is stored in your browser and sent to all the other users.")])])])},ee=[],te=n("881d"),ne=n.n(te),oe={name:"RegisterUser",props:["me"],data:function(){return{colorPickerOpts:{format:"rgba",previewPosition:"right",previewSize:30,borderRadius:0,padding:0,controlBorderColor:"rgba(255,255,255,0)",sliderSize:13,shadow:!1}}},mounted:function(){ne.a.presets.default=this.colorPickerOpts,this.$refs.color.value=this.me.color},methods:{save:function(){var e={name:this.$refs.name.value,color:this.$refs.color.value};this.$emit("registered",e)}}},re=oe,se=(n("2aef"),Object(w["a"])(re,Z,ee,!1,null,"196b7f35",null)),ie=se.exports,ae={name:"Userland",components:{Grid:R,Register:ie,User:Q},data:function(){return{registered:this.checkForMe(),visited:this.checkIfVisited(),me:{uid:Object(h["a"])(),connected:!1,name:"newUser-"+Object(h["a"])(),color:this.randomColor(),x:0,y:0,messages:[]},users:[],tableHidden:!1}},created:function(){localStorage.clear(),this.registered?this.me=JSON.parse(localStorage.me):this.visited?(this.me.uid=localStorage.uid,this.me.color=localStorage.color):(localStorage.uid=this.me.uid,localStorage.color=this.me.color),this.track(this.me),this.checkForMessages()},mounted:function(){},sockets:{connect:function(){this.me.connected=!0},disconnect:function(){this.me.connected=!1},broadcast:function(e){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function n(){var o,r,s,i,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e=JSON.parse(e),o=e.user,r=e.msg.type,s=e.msg.contents,o.uid===t.me.uid){n.next=13;break}if(i=t.findUser(o),i){n.next=10;break}return i=t.saveUser(o),n.next=10,new Promise((function(e){return setTimeout(e,500)}));case 10:a=t.$refs.Users.find((function(e){return e.uid===i.uid})),"user"==r&&(i.name=o.name,i.color=o.color,a.messages=o.messages),"position"==r?t.track(o):"typing"==r?(i.typing=s.content,a.typing=s.content):"message"==r&&o.messages.forEach((function(e){var n=t.findUserMessage(a,e);n||(i.messages.push(e),a.messages.push(e),i.typing="",a.typing="")}));case 13:case"end":return n.stop()}}),n)})))()}},methods:{checkForMe:function(){if(localStorage.me)return!0},checkIfVisited:function(){if(localStorage.uid)return!0},checkForOthers:function(){localStorage.users?this.users=JSON.parse(localStorage.users):console.log("no one else is here")},checkForMessages:function(){localStorage.messages?this.messages=JSON.parse(localStorage.messages):localStorage.messages=""},findUser:function(e){var t=this.users.find((function(t){return t.uid===e.uid}));return t},findUserMessage:function(e,t){var n=e.messages.find((function(e){return e.uid===t.uid}));return n},saveMe:function(e){this.me.name=e.name,this.me.color=e.color,localStorage.me=JSON.stringify(this.me),this.announceUser(this.me),this.registered=!0},saveUser:function(e){return this.users.push(e),e=this.findUser(e),e},announceUser:function(){this.sendMessage({type:"user",contents:""})},announcePosition:function(){this.sendMessage({type:"position",contents:""})},announceMessage:function(e){this.sendMessage({type:"message",contents:e})},announceTyping:function(e){this.sendMessage({type:"typing",contents:e})},sendMessage:function(e){this.$socket.emit("pingServer",this.me,e)},track:function(e){var t=this;if(e.uid==this.me.uid)document.addEventListener("mousemove",(function(e){t.me.x=t.$refs.me.x=100*e.clientX/window.innerWidth,t.me.y=t.$refs.me.y=100*e.clientY/window.innerHeight,t.announcePosition(t.me),e.preventDefault()})),document.addEventListener("keyup",(function(e){if(t.registered){var n=e.which||e.keyCode,o=t.$refs.me.$refs.Cursor.$refs.input;o.focus();var r={uid:t.me.uid+(new Date).getTime(),author:t.me.name,content:o.value,time:(new Date).getTime(),color:t.me.color,x:2*Math.floor(t.me.x/2),y:2*Math.floor(t.me.y/2)};t.announceTyping(r),13==n&&o.value&&" "!=o.value&&(o.value="",t.me.messages.push(r),t.$refs.me.messages.push(r),localStorage.me=JSON.stringify(t.me),t.announceMessage(r),o.placeholder=""),27==n&&(o.value="",o.blur()),e.preventDefault()}}));else{var n=this.$refs.Users.find((function(t){return t.uid==e.uid}));n.x=e.x,n.y=e.y}},randomColor:function(){var e=Math.floor(256*Math.random()),t=Math.floor(256*Math.random()),n=Math.floor(256*Math.random()),o=1,r="rgb(".concat(e,", ").concat(t,", ").concat(n,", ").concat(o,")");return r}}},ce=ae,ue=(n("9fe0"),Object(w["a"])(ce,d,f,!1,null,null,null)),le=ue.exports,de={name:"Home",components:{Userland:le},data:function(){return{loaded:!1,status:"loading...",isMobile:!!i.$root.isMobile}},created:function(){var e=this;i.$root.isMobile&&(this.isMobile=!0),this.$http.get(this.$apiURL+"/sessions").then((function(t){e.sessions=t.data,e.loaded=!0,e.msg="ready."})).catch((function(t){console.log(t),e.msg="there is an error :( contact karl <bonjour@moubarak.eu>"}))},mounted:function(){var e=this;this.$router.afterEach((function(t){e.slug=t.path.split("/")[1],e.handleRouting(e.slug)}))},methods:{handleRouting:function(e){e&&console.log(e)}}},fe=de,me=(n("cccb"),Object(w["a"])(fe,u,l,!1,null,null,null)),he=me.exports,pe={name:"App",components:{Home:he},data:function(){return{isMobile:Boolean}},created:function(){this.CheckForMobile(),window.addEventListener("resize",this.CheckForMobile),c.a.polyfill()},methods:{CheckForMobile:function(){window.innerWidth<=760?(i.$root.isMobile=!0,this.isMobile=!0):(i.$root.isMobile=!1,this.isMobile=!1)}}},ge=pe,ve=(n("034f"),Object(w["a"])(ge,r,s,!1,null,null,null)),be=ve.exports,ye=n("8c4f");o["a"].use(ye["a"]);var Me=[{path:"/",name:"Home",component:he}],_e=new ye["a"]({mode:"history",routes:Me}),xe=_e,we=n("bc3a"),ke=n.n(we),Oe=n("9ce6"),$e=n.n(Oe),Ce=n("5132"),Se=n.n(Ce),je=n("8e27"),Ue=n.n(je),Ee=Ue()("https://io.karls.computer");o["a"].use(new Se.a({connection:Ee})),$e.a.props.anchorAttributes.default=function(){return{target:"_blank",rel:"noopener noreferrer nofollow"}},o["a"].component("vue-markdown",$e.a),o["a"].prototype.$http=ke.a,o["a"].prototype.$apiURL="https://api.obfuscation.karls.computer",new o["a"]({router:xe,render:function(e){return e(be)}}).$mount("#app")},"5ced":function(e,t,n){},"5d27":function(e,t,n){},"656b":function(e,t,n){"use strict";n("dda1")},"7de5":function(e,t,n){},"85ec":function(e,t,n){},"89e8":function(e,t,n){},"9e69":function(e,t,n){},"9fe0":function(e,t,n){"use strict";n("7de5")},afbc:function(e,t,n){},cccb:function(e,t,n){"use strict";n("5ced")},d488:function(e,t,n){"use strict";n("9e69")},dda1:function(e,t,n){},f87e:function(e,t,n){"use strict";n("afbc")},fe21:function(e,t,n){"use strict";n("5d27")}});
//# sourceMappingURL=app.7babb523.js.map