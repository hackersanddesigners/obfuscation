(function(e){function t(t){for(var n,r,a=t[0],u=t[1],c=t[2],d=0,h=[];d<a.length;d++)r=a[d],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&h.push(i[r][0]),i[r]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);l&&l(t);while(h.length)h.shift()();return o.push.apply(o,c||[]),s()}function s(){for(var e,t=0;t<o.length;t++){for(var s=o[t],n=!0,a=1;a<s.length;a++){var u=s[a];0!==i[u]&&(n=!1)}n&&(o.splice(t--,1),e=r(r.s=s[0]))}return e}var n={},i={app:0},o=[];function r(t){if(n[t])return n[t].exports;var s=n[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=e,r.c=n,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(s,n,function(t){return e[t]}.bind(null,n));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],u=a.push.bind(a);a.push=t,a=a.slice();for(var c=0;c<a.length;c++)t(a[c]);var l=u;o.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("56d7")},"009b":function(e,t,s){},"034f":function(e,t,s){"use strict";s("85ec")},"0cdc":function(e,t,s){},1188:function(e,t,s){},2106:function(e,t,s){},"2b34":function(e,t,s){"use strict";s("1188")},3607:function(e,t,s){"use strict";s("009b")},"46fe":function(e,t,s){},"4b97":function(e,t,s){},"56d7":function(e,t,s){"use strict";s.r(t);s("e260"),s("e6cf"),s("cca6"),s("a79d");var n,i,o=s("2b0e"),r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("Home",{class:{mobile:e.isMobile},attrs:{slug:e.slug}})],1)},a=[],u=(s("ac1f"),s("5319"),new o["a"]({data:{isMobile:!1}})),c=s("7707"),l=s.n(c),d=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{class:{hidden:!e.loaded},attrs:{id:"home"}},[s("Userland",{attrs:{wantsToView:e.wantsToView}})],1)},h=[],m=(s("fb6a"),s("2ca0"),function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("header",{class:{blur:!e.registered||e.editing}},[s("h1",[e._v("platframe")]),s("Minimap",{attrs:{windowWidth:e.windowWidth,windowHeight:e.windowHeight,windowLeft:e.windowLeft,windowTop:e.windowTop,scale:e.scale,me:e.me,users:e.users,messages:e.messages},on:{newPosition:function(t){return e.scrollTo(t,"smooth")},newDragPosition:function(t){return e.scrollTo(t)}}}),s("Options",{attrs:{registered:e.registered,editing:e.editing,name:e.me.name,color:e.me.color,grid:e.grid,usernames:e.getUserNames()},on:{grid:function(t){e.grid=!e.grid},editMe:function(t){e.editing=!0},newColor:e.updateColor,newMe:e.updateAppearance,register:e.saveMe,deleteMe:function(t){return e.deleteMe()},deleteEverything:function(t){return e.deleteEverything()}}}),s("Userlist",{attrs:{me:e.me,users:e.users,messages:e.messages,moderator:e.moderator},on:{goTo:function(t){e.scrollTo(e.getPosition(t),"smooth")}}})],1),s("div",{ref:"userlandContainer",class:{blur:!e.registered||e.editing},attrs:{id:"userlandContainer"},on:{scroll:function(t){return e.updateViewerPosition()}}},[s("div",{ref:"userland",style:{height:100*e.scale+"%",width:100*e.scale+"%"},attrs:{id:"userland"},on:{mousedown:function(t){e.dragging=!0},mousemove:function(t){e.dragging&&e.drag(t)},mouseup:function(t){e.dragging=!1}}},[s("Grid",{attrs:{scale:e.scale,hidden:!e.grid}}),s("User",{key:e.me.uid,ref:"me",attrs:{user:e.me,isMe:!0,dragging:e.dragging,messages:e.getUserMessages(e.me)},on:{newPosition:e.updatePosition}}),e._l(e.users,(function(t){return s("User",{key:t.uid,ref:"Users",refInFor:!0,attrs:{user:t,messages:e.getUserMessages(t)}})}))],2)])])}),g=[],f=(s("99af"),s("7db0"),s("4160"),s("c975"),s("d81d"),s("b0c0"),s("b64b"),s("07ac"),s("159b"),s("8a77")),p=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("table",{class:{hidden:e.hidden},attrs:{id:"grid"}},[s("tbody",e._l(e.scale*e.definition,(function(t){return s("Row",{key:t,attrs:{x:e.scale*e.definition}})})),1)])},v=[],w=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("tr",e._l(e.x,(function(e){return s("Cell",{key:e})})),1)},b=[],y=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("td")},_=[],M={name:"Cell"},$=M,C=(s("fe21"),s("2877")),O=Object(C["a"])($,y,_,!1,null,"7cdee33c",null),x=O.exports,k={name:"Row",components:{Cell:x},props:["x"]},S=k,T=Object(C["a"])(S,w,b,!1,null,"b5b15c9a",null),P=T.exports,N={name:"Grid",components:{Row:P},props:["scale","hidden"],data:function(){return{definition:10}}},j=N,U=(s("bc72"),Object(C["a"])(j,p,v,!1,null,"4ab5e2fb",null)),E=U.exports,J=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{style:{height:e.height+"vh",width:e.width+"vw"},attrs:{id:"minimap"},on:{mouseover:function(t){t.stopPropagation(),e.hovered=!0},mouseleave:function(t){t.stopPropagation(),e.hovered=!1},mousedown:function(t){return e.sendDesiredPosition(t)}}},[s("Cursorr",{attrs:{user:e.me,scale:e.scale}}),e._l(e.users,(function(t){return s("Cursorr",{key:t.uid,attrs:{user:t,scale:e.scale}})})),e._l(e.messages,(function(t){return s("MiniMessage",{key:t.uid,attrs:{message:t,hovered:e.hovered}})})),s("Viewport",{directives:[{name:"dragged",rawName:"v-dragged",value:e.dragViewport,expression:"dragViewport"}],ref:"viewport",attrs:{id:"viewport",width:e.windowWidth/e.zoomIndex,height:e.windowHeight/e.zoomIndex,left:e.windowLeft/e.zoomIndex,top:e.windowTop/e.zoomIndex}})],2)},L=[],H=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.user.uid?s("div",{class:["cursorContainer",{uid:e.user.uid,hovered:!e.scale&&(e.user.typing||e.hovered),dragging:e.dragging}],style:{left:100*e.user.x-.2+"%",top:100*e.user.y-.2*.75+"%","--scale":e.scale?e.scale:1,"--userColor":e.user.connected?e.user.color:"lightgrey"}},[!e.scale&&e.isMe?s("input",{ref:"input",staticClass:"input",attrs:{type:"text",placeholder:"type message & press enter",autofocus:""}}):e.scale?e._e():s("span",{staticClass:"input"},[e._v(" "+e._s(e.user.typing)+" ")]),s("div",{staticClass:"cursor"},[e.scale||!e.user.typing&&!e.hovered?e.scale?e._e():s("span",{staticClass:"name"}):s("span",{staticClass:"name"},[e._v(" "+e._s(e.isMe?"me":e.user.connected?e.user.name:e.user.name+" (offline)")+" ")])])]):e._e()},V=[],z={name:"Cursorr",components:{},props:["user","isMe","scale","hovered","dragging"],data:function(){return{}},mounted:function(){this.isMe&&!this.scale&&this.trackCursor()},methods:{trackCursor:function(){var e=this;document.addEventListener("mousemove",(function(t){e.$emit("newPosition",{x:t.clientX,y:t.clientY}),t.preventDefault()}))}}},W=z,D=(s("63e2"),Object(C["a"])(W,H,V,!1,null,"6e8ad219",null)),I=D.exports,R=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.message.uid&&!e.message.deleted?s("div",{class:["minimessage",{blur:e.hovered}],style:{left:e.toNearestX(e.message.x,.4)+"%",top:e.toNearestX(e.message.y,.4)+"%",width:e.message.content.length/2+"px",background:e.message.color,"--blur":"blur("+(e.now-e.message.time)/1e8+"px)"}}):e._e()},X=[],A=s("f817"),Y={name:"MiniMessage",components:{},props:["message","hovered"],data:function(){return{now:(new Date).getTime()}},mounted:function(){},methods:{fromNow:function(e){return Object(A["a"])(e).fromNow()},toNearestX:function(e,t){return Math.floor(100*e/t)*t}}},F=Y,B=(s("d5c0"),Object(C["a"])(F,R,X,!1,null,null,null)),G=B.exports,Z=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{style:{width:e.width+e.unit,height:e.height+e.unit,left:e.left+e.unit,top:e.top+e.unit}})},q=[],K={name:"Viewport",components:{},props:["width","height","left","top"],data:function(){return{unit:"px"}},mounted:function(){},methods:{}},Q=K,ee=(s("5b46"),Object(C["a"])(Q,Z,q,!1,null,"91f886ee",null)),te=ee.exports,se={name:"Minimap",components:{Viewport:te,Cursorr:I,MiniMessage:G},props:["windowWidth","windowHeight","windowLeft","windowTop","scale","me","users","messages"],data:function(){return{height:20,width:20,zoomIndex:5*this.scale,mini:!0,hovered:!1}},mounted:function(){},methods:{sendDesiredPosition:function(e){var t={x:(e.layerX-this.windowWidth/(2*this.zoomIndex))*this.zoomIndex,y:(e.layerY-this.windowHeight/(2*this.zoomIndex))*this.zoomIndex};this.$emit("newPosition",t)},dragViewport:function(e){var t=e.deltaX,s=e.deltaY,n=e.first,i=e.last;if(n)this.dragging=!0;else if(i)this.dragging=!1;else{var o={x:this.windowLeft+t*this.zoomIndex,y:this.windowTop+s*this.zoomIndex};this.$emit("newDragPosition",o)}}}},ne=se,ie=(s("67d4"),Object(C["a"])(ne,J,L,!1,null,"0a424b85",null)),oe=ie.exports,re=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"options"}},[!e.registered||e.editing?s("Register",{attrs:{registered:e.registered,name:e.name,color:e.color,usernames:e.usernames},on:{newMe:function(t){return e.$emit("newMe",t)},newColor:function(t){return e.$emit("newColor",t)},register:function(t){return e.$emit("register",t)}}}):e._e(),s("span",{staticClass:"title"},[e._v(" options ")]),s("div",{staticClass:"grid"},[s("input",{attrs:{type:"button",name:"grid",value:e.grid?"hide grid":"show grid"},on:{click:function(t){return t.stopPropagation(),e.$emit("grid")}}})]),s("div",{staticClass:"edituser"},[s("input",{attrs:{type:"button",name:"edituser",value:"edit appearance"},on:{click:function(t){return t.stopPropagation(),e.$emit("editMe")}}})]),s("div",{staticClass:"storage"},[s("input",{attrs:{type:"button",name:"storage",value:"delete me"},on:{click:function(t){return t.stopPropagation(),e.$emit("deleteMe")}}})]),s("div",{staticClass:"db"},[s("input",{attrs:{type:"button",name:"db",value:"delete everything"},on:{click:function(t){return t.stopPropagation(),e.$emit("deleteEverything")}}})])],1)},ae=[],ue=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{class:{},attrs:{id:"registerContainer"}},[s("div",{attrs:{id:"register"}},[e.registered?e._e():s("div",{staticClass:"introText"},[s("h3",[e._v("Welcome.")]),s("p",[e._v("To join the conversation, please pick a display name and color. You can change these later.")])]),s("div",{staticClass:"form"},[s("input",{ref:"name",attrs:{type:"text",placeholder:"pick a display name"}}),e.invalid?s("p",{staticClass:"error"},[e._v("Your display name cannot contain any spaces or special characters. ")]):e.tooshort?s("p",{staticClass:"error"},[e._v("Your display name must contain at least 3 characters. ")]):e.inuse?s("p",{staticClass:"error"},[e._v("This name has already been taken by someone else. ")]):e._e(),s("input",{ref:"color",attrs:{type:"text","data-jscolor":""},on:{input:e.updateColor}}),s("input",{ref:"submit",attrs:{type:"button",value:"save"},on:{click:function(t){return t.stopPropagation(),e.save()}}})]),e.registered?e._e():s("div",{staticClass:"introText"},[s("p",[e._v("This site does not use cookies. The information you are entering is stored in your browser and sent to all the other users.")])])])])},ce=[],le=(s("4d63"),s("25f0"),s("881d")),de=s.n(le),he={name:"Register",props:["name","color","registered","usernames"],data:function(){return{colorPickerOpts:{format:"rgba",previewPosition:"right",previewSize:30,borderRadius:0,padding:0,controlBorderColor:"rgba(255,255,255,0)",sliderSize:13,shadow:!1},invalid:!1,tooshort:!1,inuse:!1}},mounted:function(){var e=this;de.a.presets.default=this.colorPickerOpts,this.$refs.color.value=this.color,de.a.init(),this.$refs.name.value=this.name,this.$refs.name.select(),this.$nextTick((function(){e.registered&&new de.a(e.$refs.color)}))},methods:{save:function(){var e=this.$refs.name.value,t=this.$refs.color.value;this.validateChars(e)?this.validateLength(e)?this.existingUser(e)?this.registered?this.updateAppearance(e,t):this.register(e,t):this.inuse=!0:this.tooshort=!0:this.invalid=!0},cancel:function(){this.$emit("newMe",{name:this.name,color:this.color})},updateAppearance:function(e,t){this.$emit("newMe",{name:e,color:t})},updateColor:function(){this.$emit("newColor",{color:this.$refs.color.value})},register:function(e,t){this.$emit("register",{name:e,color:t})},validateChars:function(e){return/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(e)},validateLength:function(e){return e.length>1},existingUser:function(e){return this.usernames.indexOf(e)},toSlug:function(e){e=e.replace(/^\s+|\s+$/g,""),e=e.toLowerCase();for(var t="àáäâèéëêìíïîòóöôùúüûñç·/_,:;",s="aaaaeeeeiiiioooouuuunc------",n=0,i=t.length;n<i;n++)e=e.replace(new RegExp(t.charAt(n),"g"),s.charAt(n));return e=e.replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-"),e}}},me=he,ge=(s("c1f5"),Object(C["a"])(me,ue,ce,!1,null,"7c99526a",null)),fe=ge.exports,pe={name:"Options",components:{Register:fe},props:["registered","editing","name","color","grid","usernames"],data:function(){return{}},mounted:function(){},methods:{}},ve=pe,we=(s("656b"),Object(C["a"])(ve,re,ae,!1,null,"f718352a",null)),be=we.exports,ye=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{class:{moderating:e.moderating},attrs:{id:"userlistContainer"}},[s("div",{attrs:{id:"userlist"}},[s("span",{staticClass:"title"},[s("span",[e._v("participants")]),s("div",{attrs:{id:"moderate"}},[s("span",{staticClass:"moderateButton",on:{click:function(t){e.moderating?e.moderating=!1:e.moderator?e.moderating=!0:e.authenticating?e.authenticating=!1:e.authenticating=!0}}},[e.moderating?s("span",[e._v("—")]):s("span",[e._v("M")])]),e.authenticating?s("input",{ref:"password",attrs:{type:"password",name:"moderator",placeholder:"moderator password",autofocus:""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.authenticate()}}}):e._e()])]),s("ul",[s("Userlabel",{attrs:{isMe:!0,user:e.me,messages:e.getUserMessages(e.me),moderating:e.moderating},on:{goTo:function(t){return e.$emit("goTo",t)}},nativeOn:{click:function(t){return t.stopPropagation(),e.$emit("goTo",e.me)}}}),e._l(e.connectedUsersFirst(),(function(t){return s("Userlabel",{key:t.uid,attrs:{user:t,moderating:e.moderating,messages:e.getUserMessages(t)},on:{goTo:function(t){return e.$emit("goTo",t)}},nativeOn:{click:function(s){return s.stopPropagation(),e.$emit("goTo",t)}}})}))],2)])])},_e=[],Me=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("li",{class:["userLabel",e.user.uid,{me:e.isMe}],style:{"--userColor":e.user.connected?e.user.color:"lightgrey"},on:{mouseover:function(t){t.stopPropagation(),e.hovered=!0},mouseleave:function(t){t.stopPropagation(),e.hovered=!1}}},[s("span",{staticClass:"bullet"},[e._v(" ● ")]),s("span",{staticClass:"name"},[e._v(" "+e._s(e.isMe?"me":e.user.name)+" ")]),e.moderating?s("div",{staticClass:"moderatorOptions"},[s("span",{staticClass:"messages",on:{click:function(t){t.stopPropagation(),e.messagesVisible=!e.messagesVisible}}},[e._v("messages")]),s("span",{staticClass:"block"},[e._v("block")]),s("span",{staticClass:"delete"},[e._v("delete")])]):e._e(),s("span",{staticClass:"goto"},[e._v(" "+e._s(e.hovered?"→":""))]),e.moderating&&e.messagesVisible?s("div",{staticClass:"messageListContiner"},[e.messages.length>0?s("ul",{staticClass:"messageList"},e._l(e.messages,(function(t){return s("MessageOptions",{key:t.uid,attrs:{message:t},nativeOn:{click:function(s){return s.stopPropagation(),e.$emit("goTo",t)}}})})),1):s("p",[e._v("This user has no messaages.")])]):e._e()])},$e=[],Ce=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{class:["miniMessageContainer",{hover:e.hovered}],on:{mouseover:function(t){e.hovered=!0},mouseleave:function(t){e.hovered=!1}}},[s("span",{staticClass:"message"},[e._v(" "+e._s(e.message.content)+" ")]),s("span",{staticClass:"time"},[e._v(" "+e._s(e.format(e.message.time))+" ")]),s("span",{staticClass:"delete"},[e._v("delete")]),s("span",{staticClass:"goto"},[e._v(" "+e._s(e.hovered?"→":""))])])},Oe=[],xe={name:"MessageOptions",components:{},props:["message"],data:function(){return{now:(new Date).getTime(),hovered:!1}},mounted:function(){},methods:{format:function(e){return Object(A["a"])(e).format("MMM Do @ HH:mm:ss ")}}},ke=xe,Se=(s("2b34"),Object(C["a"])(ke,Ce,Oe,!1,null,"33e74123",null)),Te=Se.exports,Pe={name:"UserLabel",components:{MessageOptions:Te},props:["isMe","user","messages","moderating"],data:function(){return{hovered:!1,messagesVisible:!1}},mounted:function(){},methods:{}},Ne=Pe,je=(s("57d0"),Object(C["a"])(Ne,Me,$e,!1,null,"50d9a31b",null)),Ue=je.exports,Ee={name:"Userlist",components:{Userlabel:Ue},props:["me","users","messages"],data:function(){return{moderator:!1,authenticating:!1,moderating:!1}},mounted:function(){},methods:{authenticate:function(){var e=this.$refs.password.value;"0000"===e&&(this.moderator=!0,this.authenticating=!1,this.moderating=!0)},getUserMessages:function(e){var t=[];for(var s in this.messages){var n=this.messages[s];n.author==e.uid&&t.push(n)}return t.reverse()},connectedUsersFirst:function(){var e=Object.values(this.users);e.sort((function(e,t){return e.connected===t.connected?0:e.connected?-1:1}));for(var t={},s=0;s<e.length;s++){var n=e[s];t[n.uid]=n}return t}}},Je=Ee,Le=(s("932f"),Object(C["a"])(Je,ye,_e,!1,null,"15e9cbb6",null)),He=Le.exports,Ve=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{class:["user",e.user.uid,{me:e.isMe,disconnected:!e.user.connected}],style:{"--userColor":e.user.connected?e.user.color:"lightgrey"}},[s("Cursorr",{ref:"Cursor",attrs:{user:e.user,isMe:e.isMe,hovered:e.hovered,dragging:e.dragging},on:{newPosition:function(t){return e.$emit("newPosition",t)}},nativeOn:{mouseover:function(t){!e.isMe&&(e.hovered=!0)},mouseleave:function(t){e.hovered=!1}}}),e._l(e.messages,(function(t){return s("Message",{key:t.uid,ref:"Messages",refInFor:!0,attrs:{message:t,isMe:e.isMe},nativeOn:{mouseover:function(t){e.hovered=!0},mouseleave:function(t){e.hovered=!1}}})}))],2)},ze=[],We=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.message.uid&&!e.message.deleted?s("div",{class:["messageContainer",{hover:e.hovered,announcement:e.message.announcement}],style:{left:e.toNearestX(e.message.x,.4)+"%",top:e.toNearestX(e.message.y,.4)+"%","--blur":"blur("+(e.now-e.message.time)/1e8+"px)"},attrs:{id:e.message.uid},on:{mouseover:function(t){e.hovered=!0},mouseleave:function(t){e.hovered=!1}}},[s("vue-markdown",{staticClass:"message"},[e._v(" "+e._s(e.message.content)+" ")]),s("span",{staticClass:"time"},[e._v(" "+e._s(e.fromNow(e.message.time))+" ")])],1):e._e()},De=[],Ie={name:"Message",components:{},props:["isMe","message"],data:function(){return{now:(new Date).getTime(),hovered:!1}},mounted:function(){},methods:{fromNow:function(e){return Object(A["a"])(e).fromNow()},toNearestX:function(e,t){return Math.floor(100*e/t)*t}}},Re=Ie,Xe=(s("f87e"),Object(C["a"])(Re,We,De,!1,null,null,null)),Ae=Xe.exports,Ye={name:"User",components:{Cursorr:I,Message:Ae},props:["user","messages","isMe","dragging"],data:function(){return{hovered:!1}},mounted:function(){},methods:{}},Fe=Ye,Be=(s("3607"),Object(C["a"])(Fe,Ve,ze,!1,null,null,null)),Ge=Be.exports,Ze=[],qe=[],Ke={name:"Userland",components:{Grid:E,Minimap:oe,Options:be,Userlist:He,User:Ge},props:["wantsToView"],data:function(){return{me:{uid:Object(f["a"])(),connected:!1,name:"newUser-"+Object(f["a"])(),color:this.randomColor(),x:0,y:0,typing:null},users:{},messages:{},registered:localStorage.me,visited:localStorage.uid,hasUsers:localStorage.users,hasMessages:localStorage.messages,moderator:!0,doNotSave:!1,editing:!1,scrolling:!1,dragging:!1,windowWidth:window.innerWidth,windowHeight:window.innerHeight,windowLeft:null,windowTop:null,scale:5,grid:!0}},created:function(){this.registered?this.me=JSON.parse(localStorage.me):this.visited?(this.me.uid=localStorage.uid,this.me.color=localStorage.color):(localStorage.uid=this.me.uid,localStorage.color=this.me.color),this.hasUsers&&(this.users=JSON.parse(localStorage.users)),this.hasMessages&&(this.messages=JSON.parse(localStorage.messages))},mounted:function(){var e=this;this.track();var t=this.$refs.userlandContainer;this.windowLeft=t.scrollLeft,this.windowTop=t.scrollTop,window.addEventListener("resize",(function(){e.windowWidth=window.innerWidth,e.windowHeight=window.innerHeight}));var s,n={x:(this.scale*this.windowWidth-this.windowWidth)/2,y:(this.scale*this.windowHeight-this.windowHeight)/2};if(this.wantsToView){var i=this.wantsToView.type,o=this.wantsToView.name;if("user"==i){var r=this.findUser(o);s=r?this.getUserPosition(r):n}else"page"==i&&console.log("page")}else s=n;this.scrollTo(s,"smooth")},sockets:{connect:function(){this.me.connected=!0,this.$socket.emit("user",this.me)},user:function(e){var t=JSON.parse(e);t.uid!==this.me.uid&&(this.$set(this.users,t.uid,t),this.$socket.emit("users",this.users),this.$socket.emit("messages",this.messages))},users:function(e){var t=this,s=JSON.parse(e);for(var i in Ze.push(s),Ze.sort((function(e,t){return Object.keys(t).length-Object.keys(e).length})),n=Ze[0],Ze.forEach((function(e){for(var s in e)n[s]||(s!==t.me.uid?n[s]=e[s]:console.log("false alarm, its you."))})),n){var o=n[i];i!==this.me.uid&&this.$set(this.users,i,o)}localStorage.users=JSON.stringify(this.users)},message:function(e){var t=JSON.parse(e);this.$set(this.messages,t.uid,t),this.$socket.emit("messages",this.messages),t.announcement&&t.author!==this.me.uid&&this.scrollTo(this.getPosition(t),"smooth")},messages:function(e){var t=JSON.parse(e);for(var s in qe.push(t),qe.sort((function(e,t){return Object.keys(t).length-Object.keys(e).length})),i=qe[0],qe.forEach((function(e){for(var t in e)i[t]||(i[t]=e[t])})),i){var n=i[s];this.$set(this.messages,s,n)}localStorage.messages=JSON.stringify(this.messages)},position:function(e){var t=JSON.parse(e);t.uid!==this.me.uid&&(this.$set(this.users,t.uid,t),localStorage.users=JSON.stringify(this.users))},appearance:function(e){var t=JSON.parse(e);t.uid!==this.me.uid&&(this.$set(this.users,t.uid,t),localStorage.users=JSON.stringify(this.users))},typing:function(e){var t=JSON.parse(e);t.uid!==this.me.uid&&(this.$set(this.users,t.uid,t),localStorage.users=JSON.stringify(this.users))},userDisconnect:function(e){var t=JSON.parse(e);t.uid!==this.me.uid&&(this.$set(this.users,t.uid,t),localStorage.users=JSON.stringify(this.users))},clearDBs:function(){this.users={},localStorage.users=JSON.stringify(this.users),this.messages={},localStorage.messages=JSON.stringify(this.messages),window.location.reload(!0)},disconnect:function(){this.me.connected=!1,this.doNotSave||(localStorage.me=JSON.stringify(this.me),localStorage.users=JSON.stringify(this.users),localStorage.messages=JSON.stringify(this.messages))}},methods:{saveMe:function(e){this.me.name=e.name,this.me.color=e.color,this.$socket.emit("user",this.me),this.registered=!0,this.editing=!1,localStorage.me=JSON.stringify(this.me)},deleteMe:function(){this.me.deleted=!0,this.getUserMessages(this.me).forEach((function(e){return e.deleted=!0})),this.$socket.emit("user",this.me),this.$socket.emit("message",{}),this.doNotSave=!0,localStorage.clear(),window.location.reload(!0)},deleteEverything:function(){this.$socket.emit("clearDBs")},updatePosition:function(e){var t=(this.windowLeft+e.x)/(this.windowWidth*this.scale),s=(this.windowTop+e.y)/(this.windowHeight*this.scale);this.me.x=t,this.me.y=s,this.me.connected=!0,this.$socket.emit("position",this.me)},updateColor:function(e){this.me.color=e.color,this.$socket.emit("appearance",this.me),localStorage.me=JSON.stringify(this.me)},updateAppearance:function(e){this.me.name=e.name,this.me.color=e.color,this.$socket.emit("appearance",this.me),this.editing=!1,localStorage.me=JSON.stringify(this.me)},updateTyping:function(e){this.me.typing=e,this.$socket.emit("typing",this.me)},sendMessage:function(e){e.content&&" "!=e.content&&this.$socket.emit("message",e)},constructMessage:function(e){var t=(new Date).getTime(),s={uid:this.me.uid+t,author:this.me.uid,content:e,time:t,color:this.me.color,x:this.me.x,y:this.me.y,deleted:!1,announcement:!1};return s},findUser:function(e){var t=Object.values(this.users),s=t.find((function(t){return t.name==e}));if(s)return this.users[s.uid]},getPosition:function(e){return e=this.toPixels(e),{x:e.x-this.windowWidth/2,y:e.y-this.windowHeight/2}},getUserNames:function(){var e=Object.values(this.users),t=e.map((function(e){return e.name}));return t},getUserMessages:function(e){var t=[];for(var s in this.messages){var n=this.messages[s];n.author==e.uid&&t.push(n)}return t},miniClick:function(e){console.log(e),this.scrollTo({x:e.clientX,y:e.clientY},"smooth")},updateViewerPosition:function(){this.windowLeft=this.$refs.userlandContainer.scrollLeft,this.windowTop=this.$refs.userlandContainer.scrollTop},toPixels:function(e){return{x:e.x*this.scale*this.windowWidth,y:e.y*this.scale*this.windowHeight}},scrollTo:function(e,t){this.$refs.userlandContainer.scroll({left:e.x,top:e.y,behavior:t||"auto"})},drag:function(e){this.scrollTo({x:this.windowLeft-e.movementX,y:this.windowTop-e.movementY})},randomColor:function(){var e=Math.floor(256*Math.random()),t=Math.floor(256*Math.random()),s=Math.floor(256*Math.random()),n=1,i="rgb(".concat(e,", ").concat(t,", ").concat(s,", ").concat(n,")");return i},track:function(){var e,t,s,n=this,i=this.$refs.me.$refs.Cursor.$refs.input;this.$refs.userlandContainer.addEventListener("keyup",(function(o){if(n.registered&&!n.editing){var r=o.which||o.keyCode;if(i!==document.activeElement&&(i.focus(),r>=48&&r<=90)){var a=String.fromCharCode(r);i.value=a}"~"==i.value?t=!0:"!"==i.value&&(s=!0);var u=n.getUserMessages(n.me),c=u[0],l=u[u.length-1],d=u[u.indexOf(e)-1],h=u[u.indexOf(e)+1];if(38==r)e=e?d||c:l,i.value=e.content,i.select();else if(40==r)e&&h&&(e=h,i.value=e.content,i.select());else if(13==r){if(t){var m=i.value.slice(1);n.$router.push("~".concat(m)),t=!1}else{var g=n.constructMessage(i.value);s&&(g.announcement=!0,s=!1),n.sendMessage(g),e=void 0}i.value="",i.placeholder=""}else 27==r&&(i.value="",i.blur());n.updateTyping(i.value)}})),this.$refs.userlandContainer.addEventListener("click",(function(){if(n.registered&&!n.editing){var t=n.constructMessage(i.value);n.sendMessage(t),e=void 0,i.value="",i.placeholder=""}}))}}},Qe=Ke,et=(s("9fe0"),Object(C["a"])(Qe,m,g,!1,null,null,null)),tt=et.exports,st={name:"Home",components:{Userland:tt},props:["slug"],data:function(){return{loaded:!1,status:"loading...",isMobile:!!u.$root.isMobile,wantsToView:null}},created:function(){var e=this;u.$root.isMobile&&(this.isMobile=!0),l.a.polyfill(),this.$http.get(this.$apiURL+"/hosts").then((function(t){e.hosts=t.data,e.loaded=!0,e.msg="ready."})).catch((function(t){console.log(t),e.msg="there is an error :( contact karl <bonjour@moubarak.eu>"})),this.slug&&this.handleRouting(this.slug)},mounted:function(){var e=this;this.$router.afterEach((function(t){var s=t.path.replace(e.$publicPath,"");e.handleRouting(s)}))},methods:{handleRouting:function(e){var t,s;e.startsWith("~")?(t="user",s=e.slice(1),s?console.log(s):console.log("no username provided")):console.log("not a user"),this.wantsToView={type:t,name:s}}}},nt=st,it=(s("cccb"),Object(C["a"])(nt,d,h,!1,null,null,null)),ot=it.exports,rt={name:"App",components:{Home:ot},data:function(){return{isMobile:Boolean,slug:window.location.pathname.replace(this.$publicPath,"")}},created:function(){this.CheckForMobile(),window.addEventListener("resize",this.CheckForMobile),l.a.polyfill()},methods:{CheckForMobile:function(){window.innerWidth<=760?(u.$root.isMobile=!0,this.isMobile=!0):(u.$root.isMobile=!1,this.isMobile=!1)}}},at=rt,ut=(s("034f"),Object(C["a"])(at,r,a,!1,null,null,null)),ct=ut.exports,lt=s("8c4f");o["a"].use(lt["a"]);var dt=[{path:"/",name:"Home",component:ot}],ht=new lt["a"]({mode:"history",routes:dt}),mt=ht,gt=s("bc3a"),ft=s.n(gt),pt=s("5132"),vt=s.n(pt),wt=s("8e27"),bt=s.n(wt),yt=s("9ce6"),_t=s.n(yt),Mt=s("0576"),$t=s.n(Mt);o["a"].prototype.$http=ft.a,o["a"].prototype.$apiURL="https://api.obfuscation.karls.computer",o["a"].prototype.$publicPath="/",o["a"].config.productionTip=!1,_t.a.props.anchorAttributes.default=function(){return{target:"_blank",rel:"noopener noreferrer nofollow"}},o["a"].component("vue-markdown",_t.a),o["a"].use($t.a);var Ct=bt()("https://io.karls.computer");o["a"].use(new vt.a({connection:Ct})),new o["a"]({router:mt,render:function(e){return e(ct)}}).$mount("#app")},"57d0":function(e,t,s){"use strict";s("2106")},"5b46":function(e,t,s){"use strict";s("b16f")},"5ced":function(e,t,s){},"5d27":function(e,t,s){},"5d4f":function(e,t,s){},"63e2":function(e,t,s){"use strict";s("ddec")},"656b":function(e,t,s){"use strict";s("46fe")},"67d4":function(e,t,s){"use strict";s("0cdc")},"6a23":function(e,t,s){},"7de5":function(e,t,s){},"85ec":function(e,t,s){},"932f":function(e,t,s){"use strict";s("4b97")},"9fe0":function(e,t,s){"use strict";s("7de5")},a8e5:function(e,t,s){},afbc:function(e,t,s){},b16f:function(e,t,s){},bc72:function(e,t,s){"use strict";s("a8e5")},c1f5:function(e,t,s){"use strict";s("6a23")},cccb:function(e,t,s){"use strict";s("5ced")},d5c0:function(e,t,s){"use strict";s("5d4f")},ddec:function(e,t,s){},f87e:function(e,t,s){"use strict";s("afbc")},fe21:function(e,t,s){"use strict";s("5d27")}});
//# sourceMappingURL=app.4e41d570.js.map