(function(e){function t(t){for(var o,i,a=t[0],c=t[1],u=t[2],d=0,f=[];d<a.length;d++)i=a[d],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&f.push(s[i][0]),s[i]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);l&&l(t);while(f.length)f.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,a=1;a<n.length;a++){var c=n[a];0!==s[c]&&(o=!1)}o&&(r.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},s={app:0},r=[];function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var l=c;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"0af5":function(e,t,n){"use strict";n("573b")},"1a95":function(e,t,n){"use strict";n("571d")},"4b64":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Home",{class:{mobile:e.isMobile}})],1)},r=[],i=new o["a"]({data:{isMobile:!1}}),a=n("7707"),c=n.n(a),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{hidden:!e.loaded},attrs:{id:"home"}},[n("h1",[e._v("obfuscated platframe")]),n("Userland")],1)},l=[],d=(n("ac1f"),n("1276"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"userland"}},[n("h3",[e._v("Users")]),e.me?e._e():n("Register",{on:{registered:e.saveMe}}),e.me?n("User",{ref:"me",attrs:{uid:e.me.uid,name:e.me.name,color:e.me.color,isMe:!0}}):e._e(),e._l(e.users,(function(e){return n("User",{key:e.uid,ref:"Users",refInFor:!0,attrs:{uid:e.uid,name:e.name,color:e.color}})})),e._l(e.messages,(function(e){return n("Message",{key:e.author+e.content,ref:"Messages",refInFor:!0,attrs:{uid:e.author+e.content,author:e.author,content:e.content,color:e.color,x:e.x,y:e.y}})}))],2)}),f=[],p=(n("7db0"),n("b0c0"),n("d3b7"),n("96cf"),n("1da1")),h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.uid?n("div",{staticClass:"user",class:{uid:e.uid,me:e.isMe},style:{color:e.color}},[n("span",[e._v(" "+e._s(e.name)+" ")]),n("span",[e._v("("+e._s((100*e.x).toFixed(2))+" , "+e._s((100*e.y).toFixed(2))+")")]),n("Cursorr",{ref:"Cursor",attrs:{uid:e.uid,name:e.name,color:e.color,isMe:e.isMe,x:e.x,y:e.y,typing:e.typing,hovered:e.cursorHovered},nativeOn:{mouseover:function(t){e.cursorHovered=!0},mouseleave:function(t){e.cursorHovered=!1}}})],1):e._e()},m=[],v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.uid?n("div",{staticClass:"cursorContainer",class:{uid:e.uid,hover:e.hovered,typing:e.typing},style:{left:100*e.x-1+"%",top:100*e.y-2+"%"}},[e.isMe?n("input",{ref:"input",staticClass:"input",attrs:{type:"text",placeholder:"type message & press enter"}}):e.hovered?n("span",{staticClass:"input"},[e._v(e._s(e.name))]):n("span",{staticClass:"input"},[e._v(e._s(e.typing))]),n("div",{staticClass:"cursor",style:{background:e.color}},[e.typing?n("span",{staticClass:"name"},[e._v(e._s(e.name))]):n("span",{staticClass:"name"})])]):e._e()},g=[],b={name:"Cursorr",components:{},props:["uid","name","color","isMe","x","y","typing","hovered"],data:function(){return{}},mounted:function(){},methods:{}},y=b,M=(n("0af5"),n("2877")),_=Object(M["a"])(y,v,g,!1,null,"f7db3b60",null),k=_.exports,x={name:"User",components:{Cursorr:k},props:["uid","name","color","isMe"],data:function(){return{x:null,y:null,typing:"",cursorHovered:!1}},mounted:function(){},methods:{}},w=x,O=(n("b785"),Object(M["a"])(w,h,m,!1,null,"c2978c5c",null)),C=O.exports,$=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{},attrs:{id:"registerContainer"}},[n("div",{attrs:{id:"register"}},[n("h3",[e._v("Welcome.")]),n("p",[e._v("To join the conversation, please pick a display name and color. You can change these later.")]),n("div",{staticClass:"form"},[n("input",{ref:"name",attrs:{type:"text",placeholder:"pick a display name"}}),n("input",{ref:"color",attrs:{type:"text","data-jscolor":""}}),n("input",{ref:"submit",attrs:{type:"button",value:"save"},on:{click:function(t){return e.save()}}})]),n("p",[e._v("This site does not use cookies. The information you are entering is stored in your browser and sent to all the other users.")])])])},S=[],U=(n("99af"),n("881d")),j=n.n(U),F=n("8a77"),P={name:"RegisterUser",data:function(){return{me:null,colorPickerOpts:{format:"rgba",previewPosition:"right",previewSize:30,borderRadius:0,padding:0,controlBorderColor:"rgba(255,255,255,0)",sliderSize:13,shadow:!1}}},mounted:function(){j.a.presets.default=this.colorPickerOpts,this.$refs.color.value=this.randomColor()},methods:{randomColor:function(){var e=Math.floor(256*Math.random()),t=Math.floor(256*Math.random()),n=Math.floor(256*Math.random()),o=1,s="rgb(".concat(e,", ").concat(t,", ").concat(n,", ").concat(o,")");return s},save:function(){var e={uid:Object(F["a"])(),name:this.$refs.name.value,color:this.$refs.color.value};this.me=e,this.$emit("registered",e),localStorage.me=JSON.stringify(e)}}},E=P,R=(n("c3fd"),Object(M["a"])(E,$,S,!1,null,"7035b702",null)),H=R.exports,T=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.uid?n("p",{staticClass:"messageContainer",class:{uid:e.uid},style:{left:100*e.x-1+"%",top:100*e.y-1+"%",color:e.color}},[n("span",{staticClass:"author"},[e._v(e._s(e.author))]),e._v(": "),n("span",{staticClass:"message"},[e._v(e._s(e.content))])]):e._e()},J=[],L={name:"Message",components:{},props:["uid","author","isMe","content","color","x","y"],data:function(){return{}},mounted:function(){},methods:{}},N=L,z=(n("1a95"),Object(M["a"])(N,T,J,!1,null,"6bbbee99",null)),W=z.exports,A={name:"Userland",components:{Register:H,User:C,Message:W},data:function(){return{me:null,users:[],messages:[]}},created:function(){},mounted:function(){console.log(localStorage),this.checkForMe(),this.checkForOthers(),this.checkForMessages()},sockets:{connect:function(){this.isConnected=!0,this.me&&this.announceUser(this.me)},disconnect:function(){this.isConnected=!1},broadcast:function(e){var t=this;return Object(p["a"])(regeneratorRuntime.mark((function n(){var o,s,r,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e=JSON.parse(e),o=e.user,s=e.msg.type,r=e.msg.contents,o.uid===t.me.uid){n.next=13;break}if(t.findUser(o)){n.next=9;break}return t.saveUser(o),n.next=9,new Promise((function(e){return setTimeout(e,500)}));case 9:i=t.$refs.Users.find((function(e){return e.uid===o.uid})),"position"==s&&t.track(o),"typing"==s&&(i.typing=r.content),"message"==s&&(i.typing="",t.messages.push(r));case 13:case"end":return n.stop()}}),n)})))()}},methods:{checkForMe:function(){localStorage.me&&(this.me=JSON.parse(localStorage.me),this.track(this.me))},checkForOthers:function(){localStorage.users?this.users=JSON.parse(localStorage.users):console.log("no one else is here")},checkForMessages:function(){localStorage.messages?this.messages=JSON.parse(localStorage.messages):localStorage.messages=""},findUser:function(e){var t=this.users.find((function(t){return t.uid===e.uid}));return t},saveMe:function(e){this.me=e,this.announceUser(e),this.track(this.me)},saveUser:function(e){this.users.push(e),console.log(e)},announceUser:function(){this.sendMessage({type:"newUser",contents:""})},announcePosition:function(){this.sendMessage({type:"position",contents:""})},announceMessage:function(e){this.sendMessage({type:"message",contents:e})},announceTyping:function(e){this.sendMessage({type:"typing",contents:e})},sendMessage:function(e){this.$socket.emit("pingServer",this.me,e)},track:function(e){var t=this;if(e.uid==this.me.uid)document.addEventListener("mousemove",(function(e){t.me.x=t.$refs.me.x=e.clientX/window.innerWidth,t.me.y=t.$refs.me.y=e.clientY/window.innerHeight,t.announcePosition(t.me),e.preventDefault()})),document.addEventListener("keyup",(function(e){var n=e.which||e.keyCode,o=t.$refs.me.$refs.Cursor.$refs.input;if(o.focus(),o.value){var s={uid:t.me.uid,author:t.me.name,content:o.value,color:t.me.color,x:t.me.x+.005,y:t.me.y-.02};t.announceTyping(s),13==n&&(o.value="",t.messages.push(s),t.announceMessage(s),o.placeholder=""),27==n&&(o.value="",o.blur())}e.preventDefault()}));else{var n=this.$refs.Users.find((function(t){return t.uid==e.uid}));n.x=e.x,n.y=e.y}}}},B=A,D=(n("9fe0"),Object(M["a"])(B,d,f,!1,null,null,null)),I=D.exports,Y={name:"Home",components:{Userland:I},data:function(){return{loaded:!1,status:"loading...",isMobile:!!i.$root.isMobile}},created:function(){var e=this;i.$root.isMobile&&(this.isMobile=!0),this.$http.get(this.$apiURL+"/sessions").then((function(t){e.sessions=t.data,e.loaded=!0,e.msg="ready."})).catch((function(t){console.log(t),e.msg="there is an error :( contact karl <bonjour@moubarak.eu>"}))},mounted:function(){var e=this;this.$router.afterEach((function(t){e.slug=t.path.split("/")[1],e.handleRouting(e.slug)}))},methods:{handleRouting:function(e){e&&console.log(e)}}},X=Y,q=(n("cccb"),Object(M["a"])(X,u,l,!1,null,null,null)),G=q.exports,K={name:"App",components:{Home:G},data:function(){return{isMobile:Boolean}},created:function(){this.CheckForMobile(),window.addEventListener("resize",this.CheckForMobile),c.a.polyfill()},methods:{CheckForMobile:function(){window.innerWidth<=760?(i.$root.isMobile=!0,this.isMobile=!0):(i.$root.isMobile=!1,this.isMobile=!1)}}},Q=K,V=(n("034f"),Object(M["a"])(Q,s,r,!1,null,null,null)),Z=V.exports,ee=n("8c4f");o["a"].use(ee["a"]);var te=[{path:"/",name:"Home",component:G}],ne=new ee["a"]({mode:"history",routes:te}),oe=ne,se=n("bc3a"),re=n.n(se),ie=n("9ce6"),ae=n.n(ie),ce=n("5132"),ue=n.n(ce),le=n("8e27"),de=n.n(le),fe=de()("https://io.karls.computer");o["a"].use(new ue.a({connection:fe})),ae.a.props.anchorAttributes.default=function(){return{target:"_blank",rel:"noopener noreferrer nofollow"}},o["a"].component("vue-markdown",ae.a),o["a"].prototype.$http=re.a,o["a"].prototype.$apiURL="https://api.obfuscation.karls.computer",new o["a"]({router:oe,render:function(e){return e(Z)}}).$mount("#app")},"571d":function(e,t,n){},"573b":function(e,t,n){},"5ced":function(e,t,n){},"7de5":function(e,t,n){},"85ec":function(e,t,n){},"929f":function(e,t,n){},"9fe0":function(e,t,n){"use strict";n("7de5")},b785:function(e,t,n){"use strict";n("4b64")},c3fd:function(e,t,n){"use strict";n("929f")},cccb:function(e,t,n){"use strict";n("5ced")}});
//# sourceMappingURL=app.5aac7607.js.map