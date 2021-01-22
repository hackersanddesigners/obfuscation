(function(e){function t(t){for(var o,s,a=t[0],c=t[1],u=t[2],d=0,f=[];d<a.length;d++)s=a[d],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&f.push(r[s][0]),r[s]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);l&&l(t);while(f.length)f.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,a=1;a<n.length;a++){var c=n[a];0!==r[c]&&(o=!1)}o&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var o={},r={app:0},i=[];function s(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=o,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)s.d(n,o,function(t){return e[t]}.bind(null,o));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var l=c;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"011f":function(e,t,n){"use strict";n("9406")},"034f":function(e,t,n){"use strict";n("85ec")},"054a":function(e,t,n){},"065e":function(e,t,n){},"16e7":function(e,t,n){},"34b7":function(e,t,n){"use strict";n("8450")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Home",{class:{mobile:e.isMobile}})],1)},i=[],s=new o["a"]({data:{isMobile:!1}}),a=n("7707"),c=n.n(a),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{hidden:!e.loaded},attrs:{id:"home"}},[n("Userland")],1)},l=[],d=(n("ac1f"),n("1276"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.registered?e._e():n("Register",{attrs:{me:e.me},on:{registered:e.saveMe}}),e.editing?n("EditUser",{attrs:{me:e.me},on:{editeduser:e.saveMe}}):e._e(),n("header",{class:{blur:!e.registered||e.editing}},[n("h1",[e._v("platframe")]),n("Minimap",{attrs:{windowWidth:e.windowWidth,windowHeight:e.windowHeight,windowLeft:e.windowLeft,windowTop:e.windowTop,zoomIndex:e.zoomIndex},on:{newPosition:function(t){return e.scrollTo(t)}}}),n("div",{attrs:{id:"tools"}},[n("span",{staticClass:"title"},[e._v(" options ")]),n("div",{staticClass:"grid"},[n("input",{attrs:{type:"button",name:"grid",value:e.grid?"hide grid":"show grid"},on:{click:function(t){return e.toggleGrid(t)}}})]),n("div",{staticClass:"edituser"},[n("input",{attrs:{type:"button",name:"edituser",value:"edit appearance"},on:{click:function(t){e.editing=!0}}})]),n("div",{staticClass:"storage"},[n("input",{attrs:{type:"button",name:"storage",value:"delete me"},on:{click:function(t){return e.clearLocalStorage(t)}}})]),n("div",{staticClass:"db"},[n("input",{attrs:{type:"button",name:"db",value:"delete everything"},on:{click:function(t){return e.clearDB(t)}}})])]),n("div",{attrs:{id:"userList"}},[n("span",{staticClass:"title"},[e._v(" participants ")]),n("ul",[n("UserLabel",{key:e.me.uid,attrs:{uid:e.me.uid,name:e.me.name,color:e.me.color,connected:e.me.connected,x:e.me.x,y:e.me.y,isMe:!0,typing:e.me.typing},nativeOn:{click:function(t){return e.scrollToUser(e.me,t)}}}),e._l(e.connectedUsersFirst(),(function(t){return n("UserLabel",{key:t.uid,attrs:{uid:t.uid,name:t.name,color:t.color,connected:t.connected,x:t.x,y:t.y,typing:t.typing},nativeOn:{click:function(n){return e.scrollToUser(t,n)}}})}))],2)])],1),n("div",{ref:"userlandContainer",class:{blur:!e.registered||e.editing},attrs:{id:"userlandContainer"}},[n("div",{ref:"userland",attrs:{id:"userland"}},[n("Grid",{attrs:{hidden:!e.grid}}),e.me?n("User",{ref:"me",attrs:{uid:e.me.uid,name:e.me.name,color:e.me.color,isMe:!0,connected:e.me.connected,x:e.me.x,y:e.me.y,messages:e.me.messages}}):e._e(),e._l(e.users,(function(e){return n("User",{key:e.uid,ref:"Users",refInFor:!0,attrs:{uid:e.uid,name:e.name,color:e.color,connected:e.connected,x:e.x,y:e.y,typing:e.typing,messages:e.messages}})}))],2)])],1)}),f=[],m=(n("99af"),n("c975"),n("b0c0"),n("07ac"),n("3835")),p=(n("96cf"),n("1da1")),h=n("8a77"),g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("table",{class:{hidden:e.hidden},attrs:{id:"grid"}},[n("tbody",e._l(e.y,(function(t){return n("Row",{key:t,attrs:{x:e.x}})})),1)])},v=[],w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("tr",e._l(e.x,(function(e){return n("Cell",{key:e})})),1)},y=[],b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("td")},x=[],_={name:"Cell"},M=_,O=(n("fe21"),n("2877")),$=Object(O["a"])(M,b,x,!1,null,"7cdee33c",null),k=$.exports,C={name:"Row",components:{Cell:k},props:["x"]},S=C,j=Object(O["a"])(S,w,y,!1,null,"b5b15c9a",null),L=j.exports,T={name:"Grid",components:{Row:L},props:["hidden"],data:function(){return{y:250,x:250}}},E=T,U=(n("bb23"),Object(O["a"])(E,g,v,!1,null,"8b616374",null)),P=U.exports,N=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:["user",e.uid,{me:e.isMe,disconnected:!e.connected}],style:{"--userColor":e.connected?e.color:"lightgrey"}},[n("Cursorr",{ref:"Cursor",attrs:{uid:e.uid,name:e.name,color:e.color,isMe:e.isMe,x:e.x,y:e.y,typing:e.typing,hovered:e.hovered,connected:e.connected},nativeOn:{mouseover:function(t){!e.isMe&&(e.hovered=!0)},mouseleave:function(t){e.hovered=!1}}}),e._l(e.messages,(function(t){return n("Message",{key:t.uid,ref:"Messages",refInFor:!0,attrs:{uid:t.uid,author:t.author,content:t.content,time:t.time,color:t.color,x:t.x,y:t.y,hovered:e.hovered,deleted:t.deleted},nativeOn:{mouseover:function(t){e.hovered=!0},mouseleave:function(t){e.hovered=!1}}})}))],2)},H=[],z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.uid?n("div",{staticClass:"cursorContainer",class:{uid:e.uid,typing:e.typing||e.hovered},style:{left:e.x-.2+"%",top:e.y-.2*.75+"%"}},[e.isMe?n("input",{ref:"input",staticClass:"input",attrs:{type:"text",placeholder:"type message & press enter",autofocus:""}}):n("span",{staticClass:"input"},[e._v(e._s(e.typing))]),n("div",{staticClass:"cursor"},[e.typing||e.hovered?n("span",{staticClass:"name"},[e._v(e._s(e.isMe?"me":e.connected?e.name:e.name+" (offline)"))]):n("span",{staticClass:"name"})])]):e._e()},W=[],I={name:"Cursorr",components:{},props:["uid","name","color","isMe","x","y","typing","hovered","connected"],data:function(){return{}},mounted:function(){},methods:{}},R=I,D=(n("011f"),Object(O["a"])(R,z,W,!1,null,"42d85f1a",null)),J=D.exports,F=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.uid&&!e.deleted?n("div",{staticClass:"messageContainer",class:[e.uid,{hover:e.hovered}],style:{left:e.x+"%",top:e.y+"%","--blur":"blur("+(e.now-e.time)/1e8+"px)"}},[n("vue-markdown",{staticClass:"message"},[e._v(" "+e._s(e.content)+" ")]),n("span",{staticClass:"time"},[e._v(" "+e._s(e.fromNow(e.time))+" ")])],1):e._e()},B=[],V=n("f817"),G={name:"Message",components:{},props:["uid","author","isMe","content","time","color","x","y","hovered","deleted"],data:function(){return{now:(new Date).getTime()}},mounted:function(){},methods:{fromNow:function(e){return Object(V["a"])(e).fromNow()}}},Y=G,A=(n("f87e"),Object(O["a"])(Y,F,B,!1,null,null,null)),X=A.exports,K={name:"User",components:{Cursorr:J,Message:X},props:["uid","name","color","isMe","connected","x","y","typing","messages"],data:function(){return{hovered:!1}},mounted:function(){},methods:{}},q=K,Q=(n("34b7"),Object(O["a"])(q,N,H,!1,null,"429325eb",null)),Z=Q.exports,ee=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{},attrs:{id:"registerContainer"}},[n("div",{attrs:{id:"register"}},[n("h3",[e._v("Welcome.")]),n("p",[e._v("To join the conversation, please pick a display name and color. You can change these later.")]),n("div",{staticClass:"form"},[n("input",{ref:"name",attrs:{type:"text",placeholder:"pick a display name"}}),n("input",{ref:"color",attrs:{type:"text","data-jscolor":""}}),n("input",{ref:"submit",attrs:{type:"button",value:"save"},on:{click:function(t){return e.save()}}})]),n("p",[e._v("This site does not use cookies. The information you are entering is stored in your browser and sent to all the other users.")])])])},te=[],ne=n("881d"),oe=n.n(ne),re={name:"Register",props:["me"],data:function(){return{colorPickerOpts:{format:"rgba",previewPosition:"right",previewSize:30,borderRadius:0,padding:0,controlBorderColor:"rgba(255,255,255,0)",sliderSize:13,shadow:!1}}},mounted:function(){oe.a.presets.default=this.colorPickerOpts,this.$refs.color.value=this.me.color},methods:{save:function(){var e={name:this.$refs.name.value,color:this.$refs.color.value};this.$emit("registered",e)}}},ie=re,se=(n("816c"),Object(O["a"])(ie,ee,te,!1,null,"3117eae4",null)),ae=se.exports,ce=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{},attrs:{id:"registerContainer"}},[n("div",{attrs:{id:"register"}},[n("div",{staticClass:"form"},[n("input",{ref:"name",attrs:{type:"text",placeholder:"pick a display name"}}),n("input",{ref:"color",attrs:{type:"text","data-jscolor":""}}),n("input",{ref:"submit",attrs:{type:"button",value:"save"},on:{click:function(t){return e.save()}}})])])])},ue=[],le={name:"EditUser",props:["me"],data:function(){return{colorPickerOpts:{format:"rgba",previewPosition:"right",previewSize:30,borderRadius:0,padding:0,controlBorderColor:"rgba(255,255,255,0)",sliderSize:13,shadow:!1}}},mounted:function(){oe.a.presets.default=this.colorPickerOpts,this.$refs.name.value=this.me.name,this.$refs.color.value=this.me.color},methods:{save:function(){var e={name:this.$refs.name.value,color:this.$refs.color.value};this.$emit("editeduser",e)}}},de=le,fe=(n("e5d2"),Object(O["a"])(de,ce,ue,!1,null,"2fc13e45",null)),me=fe.exports,pe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",{class:["userLabel",e.uid,{me:e.isMe}],style:{"--userColor":e.connected?e.color:"lightgrey"},on:{mouseover:function(t){e.hovered=!0},mouseleave:function(t){e.hovered=!1}}},[n("span",[e._v(" ● ")]),n("span",[e._v(" "+e._s(e.isMe?"me":e.name)+" ")]),n("span",[e._v(" "+e._s(e.hovered?"→":""))])])},he=[],ge={name:"UserLabel",components:{},props:["uid","name","color","isMe","connected","x","y","typing"],data:function(){return{hovered:!1}},mounted:function(){},methods:{}},ve=ge,we=(n("6f4f"),Object(O["a"])(ve,pe,he,!1,null,"63078d9e",null)),ye=we.exports,be=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"minimap"}},[n("Viewport",{directives:[{name:"dragged",rawName:"v-dragged",value:e.dragViewport,expression:"dragViewport"}],ref:"viewport",attrs:{id:"viewport",width:e.windowWidth/e.zoomIndex,height:e.windowHeight/e.zoomIndex,left:e.windowLeft/e.zoomIndex,top:e.windowTop/e.zoomIndex}})],1)},xe=[],_e=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{style:{width:e.width+e.unit,height:e.height+e.unit,left:e.left+e.unit,top:e.top+e.unit}})},Me=[],Oe={name:"Viewport",components:{},props:["width","height","left","top"],data:function(){return{unit:"px"}},mounted:function(){},methods:{}},$e=Oe,ke=(n("5fb0"),Object(O["a"])($e,_e,Me,!1,null,"0ef0d9c2",null)),Ce=ke.exports,Se={name:"Minimap",components:{Viewport:Ce},props:["windowWidth","windowHeight","windowLeft","windowTop","zoomIndex"],data:function(){return{unit:"px"}},mounted:function(){},methods:{dragViewport:function(e){var t=e.deltaX,n=e.deltaY,o=e.first,r=e.last;if(o)this.dragging=!0;else if(r)this.dragging=!1;else{var i={x:this.windowLeft+t*this.zoomIndex,y:this.windowTop+n*this.zoomIndex};this.$emit("newPosition",i)}}}},je=Se,Le=(n("b5ae"),Object(O["a"])(je,be,xe,!1,null,"692b1e86",null)),Te=Le.exports,Ee={name:"Userland",components:{Grid:P,Minimap:Te,Register:ae,EditUser:me,User:Z,UserLabel:ye},data:function(){return{me:{uid:Object(h["a"])(),connected:!1,name:"newUser-"+Object(h["a"])(),color:this.randomColor(),x:0,y:0,typing:String,messages:[]},users:{},editing:!1,scrolling:!1,dragging:!1,registered:this.checkForMe(),visited:this.checkIfVisited(),grid:!1,zoomIndex:25,windowWidth:window.innerWidth,windowHeight:window.innerHeight,windowLeft:null,windowTop:null,doNotSave:!1}},created:function(){this.registered?this.me=JSON.parse(localStorage.me):this.visited?(this.me.uid=localStorage.uid,this.me.color=localStorage.color):(localStorage.uid=this.me.uid,localStorage.color=this.me.color),this.track(),this.checkForDB()&&(this.users=JSON.parse(localStorage.users))},mounted:function(){var e=this;c.a.polyfill(),window.addEventListener("resize",(function(){e.windowWidth=window.innerWidth,e.windowHeight=window.innerHeight}));var t=this.$refs.userlandContainer;this.windowLeft=t.scrollLeft,this.windowTop=t.scrollTop,t.addEventListener("scroll",(function(){e.windowLeft=t.scrollLeft,e.windowTop=t.scrollTop}));var n={x:(this.$refs.userland.offsetWidth-window.innerWidth)/2,y:(this.$refs.userland.offsetHeight-window.innerHeight)/2};this.scrollTo(n,"smooth")},sockets:{connect:function(){this.me.connected=!0,this.announce("user")},disconnect:function(){this.me.connected=!1,this.doNotSave||(localStorage.me=JSON.stringify(this.me))},dbSync:function(e){console.log(e)},broadcast:function(e){var t=this;return Object(p["a"])(regeneratorRuntime.mark((function n(){var o,r,i,s,a,c,u,l;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e=JSON.parse(e),o=e.user,r=e.msg.type,i=e.msg.content,o.uid!==t.me.uid&&(t.$set(t.users,o.uid,o),s=t.users[o.uid],"user"==r?t.announce("db",t.users):"position"==r||"typing"==r||"message"==r||"disconnect"==r&&(s.connected=!1)),"db"==r){for(c in a=i,console.log("got DB from swarm: ",a),a)u=a[c],c!==t.me.uid&&t.$set(t.users,c,u);t.saveDB()}"clear-db"==r&&(l=i,console.log(l),t.users=l,localStorage.users=JSON.stringify(t.users),t.me.messages=[],localStorage.me=JSON.stringify(t.me),window.location.reload(!0));case 7:case"end":return n.stop()}}),n)})))()}},methods:{checkForMe:function(){if(localStorage.me)return!0;console.log("you've been here before.")},checkIfVisited:function(){if(localStorage.uid)return!0;console.log("you're new.")},saveMe:function(e){this.me.name=e.name,this.me.color=e.color,this.announce("user"),this.registered=!0,this.editing=!1,localStorage.me=JSON.stringify(this.me)},checkForDB:function(){if(localStorage.users)return!0;console.log("you haven't made a userDb yet.")},saveDB:function(){localStorage.users=JSON.stringify(this.users)},announce:function(e,t){this.$socket.emit("pingServer",this.me,{type:e,content:t})},scrollToUser:function(e,t){var n={x:.01*this.$refs.userland.offsetWidth*e.x-window.innerWidth/2,y:.01*this.$refs.userland.offsetHeight*e.y-window.innerHeight/2};this.scrollTo(n,"smooth"),t.stopPropagation()},constructMessage:function(e){var t=(new Date).getTime(),n={uid:this.me.uid+t,author:this.me.name,content:e,time:t,color:this.me.color,x:.4*Math.floor(this.me.x/.4),y:.4*Math.floor(this.me.y/.4)};return n},track:function(){var e,t,n,o=this;document.addEventListener("mousemove",(function(n){var r=o.$refs.userlandContainer;e=20*(r.scrollLeft+n.clientX)/r.offsetWidth,t=20*(r.scrollTop+n.clientY)/r.offsetHeight,o.$set(o.me,"x",e),o.$set(o.me,"y",t),o.announce("position"),n.preventDefault()})),document.addEventListener("keyup",(function(e){if(o.registered&&!o.editing){var t=o.$refs.me.$refs.Cursor.$refs.input,r=e.which||e.keyCode,i=o.computeMessages(o.me.messages,n),s=Object(m["a"])(i,4),a=s[0],c=s[1],u=s[2],l=s[3];if(t!==document.activeElement){if(r>=48&&r<=90){var d=String.fromCharCode(r);t.value=d}t.focus()}var f=o.constructMessage(t.value);o.me.typing=f.content,o.announce("typing"),27==r?(t.value="",t.blur()):38==r?n?u?(n=u,t.value=n.content,t.select()):(n=a,t.value=n.content):(n=c,t.value=n.content,t.select()):40==r?n&&l&&(n=l,t.value=n.content,t.select()):13!=r||e.shiftKey||f.content&&" "!=f.content&&(t.value=t.value-"\n",o.me.messages.push(f),o.me.typing="",localStorage.me=JSON.stringify(o.me),o.announce("message",f),n=void 0,t.value="",t.placeholder=""),e.stopPropagation(),e.preventDefault()}})),document.addEventListener("click",(function(e){if(o.registered){console.log("click");var t=o.$refs.me.$refs.Cursor.$refs.input,r=o.constructMessage(t.value);r.content&&" "!=r.content&&(o.me.messages.push(r),localStorage.me=JSON.stringify(o.me),o.announceMessage(r),n=void 0,t.value="",t.placeholder=""),e.stopPropagation(),e.preventDefault()}}))},computeMessages:function(e,t){var n=e[0],o=e[e.length-1],r=e[e.indexOf(t)-1],i=e[e.indexOf(t)+1];return[n,o,r,i]},clearLocalStorage:function(e){this.doNotSave=!0,localStorage.clear(),window.location.reload(!0),e.stopPropagation()},clearMessages:function(e){for(var t=0;t<this.me.messages.length;t++){var n=this.me.messages[t];n.deleted=!0}this.me.typing="",localStorage.me=JSON.stringify(this.me),e.stopPropagation()},toggleGrid:function(e){this.grid=!this.grid,e.stopPropagation()},clearDB:function(e){this.users={},this.announce("clear-db",this.users),e.stopPropagation()},connectedUsersFirst:function(){var e=Object.values(this.users);e.sort((function(e,t){return e.connected===t.connected?0:e.connected?-1:1}));for(var t={},n=0;n<e.length;n++){var o=e[n];t[o.uid]=o}return t},scrollTo:function(e,t){this.$refs.userlandContainer.scroll({left:e.x,top:e.y,behavior:t||"auto"})},randomColor:function(){var e=Math.floor(256*Math.random()),t=Math.floor(256*Math.random()),n=Math.floor(256*Math.random()),o=1,r="rgb(".concat(e,", ").concat(t,", ").concat(n,", ").concat(o,")");return r}}},Ue=Ee,Pe=(n("9fe0"),Object(O["a"])(Ue,d,f,!1,null,null,null)),Ne=Pe.exports,He={name:"Home",components:{Userland:Ne},data:function(){return{loaded:!1,status:"loading...",isMobile:!!s.$root.isMobile}},created:function(){var e=this;s.$root.isMobile&&(this.isMobile=!0),this.$http.get(this.$apiURL+"/sessions").then((function(t){e.sessions=t.data,e.loaded=!0,e.msg="ready."})).catch((function(t){console.log(t),e.msg="there is an error :( contact karl <bonjour@moubarak.eu>"}))},mounted:function(){var e=this;this.$router.afterEach((function(t){e.slug=t.path.split("/")[1],e.handleRouting(e.slug)}))},methods:{handleRouting:function(e){e&&console.log(e)}}},ze=He,We=(n("cccb"),Object(O["a"])(ze,u,l,!1,null,null,null)),Ie=We.exports,Re={name:"App",components:{Home:Ie},data:function(){return{isMobile:Boolean}},created:function(){this.CheckForMobile(),window.addEventListener("resize",this.CheckForMobile),c.a.polyfill()},methods:{CheckForMobile:function(){window.innerWidth<=760?(s.$root.isMobile=!0,this.isMobile=!0):(s.$root.isMobile=!1,this.isMobile=!1)}}},De=Re,Je=(n("034f"),Object(O["a"])(De,r,i,!1,null,null,null)),Fe=Je.exports,Be=n("8c4f");o["a"].use(Be["a"]);var Ve=[{path:"/",name:"Home",component:Ie}],Ge=new Be["a"]({mode:"history",routes:Ve}),Ye=Ge,Ae=n("bc3a"),Xe=n.n(Ae),Ke=n("0576"),qe=n.n(Ke),Qe=n("5132"),Ze=n.n(Qe),et=n("8e27"),tt=n.n(et),nt=n("9ce6"),ot=n.n(nt),rt=n("2699"),it=n("a40a"),st=n("dee2"),at=n("4e2b");n("6cc5");o["a"].component("l-map",rt["a"]),o["a"].component("l-tile-layer",it["a"]),o["a"].component("l-grid-layer",st["a"]),o["a"].component("l-marker",at["a"]);var ct=tt()("https://io.karls.computer");o["a"].use(qe.a),o["a"].use(new Ze.a({connection:ct})),ot.a.props.anchorAttributes.default=function(){return{target:"_blank",rel:"noopener noreferrer nofollow"}},o["a"].component("vue-markdown",ot.a),o["a"].prototype.$http=Xe.a,o["a"].prototype.$apiURL="https://api.obfuscation.karls.computer",o["a"].config.productionTip=!1,new o["a"]({router:Ye,render:function(e){return e(Fe)}}).$mount("#app")},"5ced":function(e,t,n){},"5d27":function(e,t,n){},"5fb0":function(e,t,n){"use strict";n("b912")},"6f4f":function(e,t,n){"use strict";n("7efd")},"7aa6":function(e,t,n){},"7de5":function(e,t,n){},"7efd":function(e,t,n){},"816c":function(e,t,n){"use strict";n("16e7")},8450:function(e,t,n){},"85ec":function(e,t,n){},9406:function(e,t,n){},"9fe0":function(e,t,n){"use strict";n("7de5")},afbc:function(e,t,n){},b5ae:function(e,t,n){"use strict";n("7aa6")},b912:function(e,t,n){},bb23:function(e,t,n){"use strict";n("065e")},cccb:function(e,t,n){"use strict";n("5ced")},e5d2:function(e,t,n){"use strict";n("054a")},f87e:function(e,t,n){"use strict";n("afbc")},fe21:function(e,t,n){"use strict";n("5d27")}});
//# sourceMappingURL=app.ea53c6b1.js.map