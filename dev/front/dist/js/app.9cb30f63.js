(function(e){function t(t){for(var n,r,a=t[0],c=t[1],u=t[2],d=0,h=[];d<a.length;d++)r=a[d],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&h.push(i[r][0]),i[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);l&&l(t);while(h.length)h.shift()();return o.push.apply(o,u||[]),s()}function s(){for(var e,t=0;t<o.length;t++){for(var s=o[t],n=!0,a=1;a<s.length;a++){var c=s[a];0!==i[c]&&(n=!1)}n&&(o.splice(t--,1),e=r(r.s=s[0]))}return e}var n={},i={app:0},o=[];function r(t){if(n[t])return n[t].exports;var s=n[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=e,r.c=n,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(s,n,function(t){return e[t]}.bind(null,n));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var l=c;o.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("56d7")},"0229":function(e,t,s){"use strict";s("47be")},"034f":function(e,t,s){"use strict";s("85ec")},"07bb":function(e,t,s){"use strict";s("ffd72")},"0ccf":function(e,t,s){"use strict";s("c4ca")},"101a":function(e,t,s){},"157c":function(e,t,s){},1812:function(e,t,s){"use strict";s("101a")},"1a06":function(e,t,s){"use strict";s("dfe9")},"1e51":function(e,t,s){},2104:function(e,t,s){},3617:function(e,t,s){"use strict";s("6f43")},3886:function(e,t,s){},"3cd2":function(e,t,s){"use strict";s("9a7c")},"47be":function(e,t,s){},"4b45":function(e,t,s){"use strict";s("62d5")},"56d7":function(e,t,s){"use strict";s.r(t);s("e260"),s("e6cf"),s("cca6"),s("a79d");var n,i,o=s("2b0e"),r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("Home",{class:{mobile:e.isMobile},attrs:{slug:e.slug}})],1)},a=[],c=(s("ac1f"),s("5319"),new o["a"]({data:{isMobile:!1,scale:5}})),u=s("7707"),l=s.n(u),d=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{class:{hidden:!e.loaded},attrs:{id:"home"}},[s("Mainland",{attrs:{wantsToView:e.wantsToView}})],1)},h=[],m=(s("fb6a"),s("2ca0"),function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("header",{class:{blur:!e.registered||e.editing}},[s("h1",[e._v("obfuscation")]),s("Minimap",{attrs:{windowWidth:e.windowWidth,windowHeight:e.windowHeight,windowLeft:e.windowLeft,windowTop:e.windowTop,scale:e.scale,dragging:e.dragging,me:e.me,users:e.users,messages:e.messages,islands:e.islands},on:{childDragging:function(t){e.dragging=!0},childStopDragging:function(t){e.dragging=!1},newPosition:function(t){return e.scrollTo(t,e.dragging?"auto":"smooth")},zoomin:e.zoomIn,zoomout:e.zoomOut,zero:e.centerMe}}),s("Options",{attrs:{registered:e.registered,editing:e.editing,name:e.me.name,color:e.me.color,usernames:e.getUserNames(),grid:e.grid},on:{grid:function(t){e.grid=!e.grid},editMe:function(t){e.editing=!0},newColor:e.updateColor,newMe:e.updateAppearance,register:e.saveMe,deleteMe:function(t){return e.deleteMe()},deleteEverything:function(t){return e.deleteEverything()}}}),s("Userslist",{attrs:{me:e.me,users:e.users,messages:e.messages,moderator:e.moderator},on:{goTo:function(t){e.scrollTo(e.getPosition(t),"smooth")}}})],1),s("div",{ref:"userlandContainer",class:{blur:!e.registered||e.editing},attrs:{id:"userlandContainer"},on:{scroll:function(t){return e.getViewerPosition()}}},[s("div",{ref:"userland",style:{height:100*e.scale+"%",width:100*e.scale+"%","--scale":e.scale},attrs:{id:"userland"},on:{mousedown:function(t){e.dragging=!0},mousemove:function(t){e.dragging&&e.drag(t)},mouseup:function(t){e.dragging=!1}}},[s("Grid",{attrs:{scale:10,hidden:!e.grid}}),e._l(e.islands,(function(e){return s("Territory",{key:e.name,attrs:{name:e.name,borders:e.borders}})})),s("User",{key:e.me.uid,ref:"me",attrs:{user:e.me,isMe:!0,dragging:e.dragging,messages:e.getUserMessages(e.me)},on:{newPosition:e.updatePosition}}),e._l(e.users,(function(t){return s("User",{key:t.uid,ref:"Users",refInFor:!0,attrs:{user:t,messages:e.getUserMessages(t)}})}))],2)])])}),f=[],g=(s("99af"),s("7db0"),s("4160"),s("c975"),s("d81d"),s("b0c0"),s("b64b"),s("07ac"),s("159b"),s("8a77")),p=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("table",{class:{hidden:e.hidden},attrs:{id:"grid"}},[s("tbody",e._l(e.scale*e.definition,(function(t){return s("Row",{key:t,attrs:{x:e.scale*e.definition}})})),1)])},v=[],w=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("tr",e._l(e.x,(function(e){return s("Cell",{key:e})})),1)},b=[],y=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("td")},_=[],$={name:"Cell"},C=$,M=(s("696f"),s("2877")),O=Object(M["a"])(C,y,_,!1,null,"0acf40ac",null),x=O.exports,k={name:"Row",components:{Cell:x},props:["x"]},S=k,T=Object(M["a"])(S,w,b,!1,null,"4ed0d323",null),P=T.exports,N={name:"Table",components:{Row:P},props:["scale","hidden"],data:function(){return{definition:10}}},j=N,E=(s("07bb"),Object(M["a"])(j,p,v,!1,null,"8db7080e",null)),L=E.exports,U=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{class:{hovered:e.hovered||e.dragging},style:{height:e.height+"px",width:e.width+"px"},attrs:{id:"minimap"},on:{mouseover:function(t){e.hovered=!0},mouseout:function(t){e.hovered=!1},mousedown:function(t){e.sendDesiredPosition(t),e.$emit("childDragging")},mousemove:function(t){e.dragging&&e.sendDesiredPosition(t)},mouseup:function(t){e.$emit("childStopDragging"),e.sendDesiredPosition(t)}}},[s("Cursorr",{attrs:{user:e.me,scale:e.scale}}),e._l(e.users,(function(t){return s("Cursorr",{key:t.uid,attrs:{user:t,scale:e.scale}})})),e._l(e.messages,(function(t){return s("Message",{key:t.uid,attrs:{message:t,hovered:e.hovered,dragging:e.dragging}})})),e._l(e.islands,(function(e){return s("Territory",{key:e.name,attrs:{name:e.name,borders:e.borders}})})),s("Window",{ref:"viewport",attrs:{id:"viewport",width:e.windowWidth/e.zoomIndex,height:e.windowHeight/e.zoomIndex,left:e.windowLeft/e.zoomIndex,top:e.windowTop/e.zoomIndex}}),s("div",{staticClass:"zoom"},[s("div",{staticClass:"in",on:{mousedown:function(t){return t.stopPropagation(),e.$emit("zoomin")},mouseup:function(e){e.stopPropagation()}}},[e._v("+")]),s("div",{staticClass:"out",on:{mousedown:function(t){return t.stopPropagation(),e.$emit("zoomout")},mouseup:function(e){e.stopPropagation()}}},[e._v("-")]),s("div",{staticClass:"zero",on:{mousedown:function(t){return t.stopPropagation(),e.$emit("zero")},mouseup:function(e){e.stopPropagation()}}},[e._v("○")])])],2)},z=[],J=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.user.uid?s("div",{class:["cursorContainer",{uid:e.user.uid,hovered:!e.scale&&(e.user.typing||e.hovered),dragging:e.dragging}],style:{left:100*e.user.x-.2+"%",top:100*e.user.y-.2*.75+"%","--scale":e.scale?5:15,"--userColor":e.user.connected?e.user.color:"lightgrey"}},[!e.scale&&e.isMe?s("input",{ref:"input",staticClass:"input",attrs:{type:"text",placeholder:"type message & press enter",autofocus:""}}):e.scale?e._e():s("span",{staticClass:"input"},[e._v(" "+e._s(e.user.typing)+" ")]),s("div",{staticClass:"cursor"},[e.scale||!e.user.typing&&!e.hovered?e.scale?e._e():s("span",{staticClass:"name"}):s("span",{staticClass:"name"},[e._v(" "+e._s(e.isMe?"me":e.user.connected?e.user.name:e.user.name+" (offline)")+" ")])])]):e._e()},W=[],H={name:"Cursorr",components:{},props:["user","isMe","scale","hovered","dragging"],data:function(){return{}},mounted:function(){this.isMe&&!this.scale&&this.trackCursor()},methods:{trackCursor:function(){var e=this;document.addEventListener("mousemove",(function(t){e.$emit("newPosition",{x:t.clientX,y:t.clientY}),t.preventDefault()}))}}},D=H,V=(s("1a06"),Object(M["a"])(D,J,W,!1,null,"30cf877a",null)),I=V.exports,R=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.message.uid&&!e.message.deleted?s("div",{class:["minimessage",{clear:e.hovered||e.dragging}],style:{left:e.toNearestX(e.message.x,.4)+"%",top:e.toNearestX(e.message.y,.4)+"%",width:e.message.content.length/2+"px",background:e.message.color,"--blur":"blur("+(e.now-e.message.time)/1e8+"px)"}}):e._e()},X=[],A=s("f817"),B={name:"Message",components:{},props:["message","hovered","dragging"],data:function(){return{now:(new Date).getTime()}},mounted:function(){},methods:{fromNow:function(e){return Object(A["a"])(e).fromNow()},toNearestX:function(e,t){return Math.floor(100*e/t)*t}}},F=B,Y=(s("0ccf"),Object(M["a"])(F,R,X,!1,null,null,null)),G=Y.exports,Z=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"miniterritory",style:{left:e.toNearestX(e.borders.x,.4)+"%",top:e.toNearestX(e.borders.y,.4)+"%",width:"20%",height:"20%"},attrs:{id:"mini-"+e.name}},[s("div",{staticClass:"box"})])},q=[],K={name:"Territory",components:{},props:["name","borders"],data:function(){return{}},mounted:function(){},methods:{toNearestX:function(e,t){return Math.floor(100*e/t)*t}}},Q=K,ee=(s("3cd2"),Object(M["a"])(Q,Z,q,!1,null,null,null)),te=ee.exports,se=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{style:{width:e.width+e.unit,height:e.height+e.unit,left:e.left+e.unit,top:e.top+e.unit}})},ne=[],ie={name:"Window",components:{},props:["width","height","left","top"],data:function(){return{unit:"px"}},mounted:function(){},methods:{}},oe=ie,re=(s("c3b6"),Object(M["a"])(oe,se,ne,!1,null,"3546a563",null)),ae=re.exports,ce={name:"Map",components:{Cursorr:I,Message:G,Territory:te,Window:ae},props:["windowWidth","windowHeight","windowLeft","windowTop","scale","me","users","islands","messages","dragging"],data:function(){return{width:this.windowWidth/5,height:this.windowHeight/5,zoomIndex:5*this.scale,mini:!0,hovered:!1}},watch:{windowWidth:function(){this.width=this.windowWidth/5},windowHeight:function(){this.height=this.windowHeight/5},scale:function(){this.zoomIndex=5*this.scale}},mounted:function(){},methods:{sendDesiredPosition:function(e){var t=e.pageX-this.$el.offsetLeft,s=this.width/(2*this.scale),n=(t-s)*this.zoomIndex,i=e.pageY-this.$el.offsetTop,o=this.height/(2*this.scale),r=(i-o)*this.zoomIndex;this.$emit("newPosition",{x:n,y:r})}}},ue=ce,le=(s("da82"),Object(M["a"])(ue,U,z,!1,null,"fc0f762a",null)),de=le.exports,he=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"options"}},[!e.registered||e.editing?s("Register",{attrs:{registered:e.registered,name:e.name,color:e.color,usernames:e.usernames},on:{newMe:function(t){return e.$emit("newMe",t)},newColor:function(t){return e.$emit("newColor",t)},register:function(t){return e.$emit("register",t)}}}):e._e(),s("span",{staticClass:"title"},[e._v(" options ")]),s("div",{staticClass:"grid"},[s("input",{attrs:{type:"button",name:"grid",value:e.grid?"hide grid":"show grid"},on:{click:function(t){return t.stopPropagation(),e.$emit("grid")}}})]),s("div",{staticClass:"edituser"},[s("input",{attrs:{type:"button",name:"edituser",value:"edit appearance"},on:{click:function(t){return t.stopPropagation(),e.$emit("editMe")}}})]),s("div",{staticClass:"storage"},[s("input",{attrs:{type:"button",name:"storage",value:"delete me"},on:{click:function(t){return t.stopPropagation(),e.$emit("deleteMe")}}})]),s("div",{staticClass:"db"},[s("input",{attrs:{type:"button",name:"db",value:"delete everything"},on:{click:function(t){return t.stopPropagation(),e.$emit("deleteEverything")}}})])],1)},me=[],fe=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{class:{},attrs:{id:"registerContainer"}},[s("div",{attrs:{id:"register"}},[e.registered?e._e():s("div",{staticClass:"introText"},[s("h3",[e._v("Welcome.")]),s("p",[e._v("To join the conversation, please pick a display name and color. You can change these later.")])]),s("div",{staticClass:"form"},[s("input",{ref:"name",attrs:{type:"text",placeholder:"pick a display name"}}),e.invalid?s("p",{staticClass:"error"},[e._v("Your display name cannot contain any spaces or special characters. ")]):e.tooshort?s("p",{staticClass:"error"},[e._v("Your display name must contain at least 3 characters. ")]):e.inuse?s("p",{staticClass:"error"},[e._v("This name has already been taken by someone else. ")]):e._e(),s("input",{ref:"color",attrs:{type:"text","data-jscolor":""},on:{input:e.updateColor}}),s("input",{ref:"submit",attrs:{type:"button",value:"save"},on:{click:function(t){return t.stopPropagation(),e.save()}}})]),e.registered?e._e():s("div",{staticClass:"introText"},[s("p",[e._v("This site does not use cookies. The information you are entering is stored in your browser and sent to all the other users.")])])])])},ge=[],pe=(s("4d63"),s("25f0"),s("881d")),ve=s.n(pe),we={name:"Register",props:["name","color","registered","usernames"],data:function(){return{colorPickerOpts:{format:"rgba",previewPosition:"right",previewSize:30,borderRadius:0,padding:0,controlBorderColor:"rgba(255,255,255,0)",sliderSize:13,shadow:!1},invalid:!1,tooshort:!1,inuse:!1}},mounted:function(){var e=this;ve.a.presets.default=this.colorPickerOpts,this.$refs.color.value=this.color,ve.a.init(),this.$refs.name.value=this.name,this.$refs.name.select(),this.$nextTick((function(){e.registered&&new ve.a(e.$refs.color)}))},methods:{save:function(){var e=this.$refs.name.value,t=this.$refs.color.value;this.validateChars(e)?this.validateLength(e)?this.existingUser(e)?this.registered?this.updateAppearance(e,t):this.register(e,t):this.inuse=!0:this.tooshort=!0:this.invalid=!0},cancel:function(){this.$emit("newMe",{name:this.name,color:this.color})},updateAppearance:function(e,t){this.$emit("newMe",{name:e,color:t})},updateColor:function(){this.$emit("newColor",{color:this.$refs.color.value})},register:function(e,t){this.$emit("register",{name:e,color:t})},validateChars:function(e){return/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(e)},validateLength:function(e){return e.length>1},existingUser:function(e){return this.usernames.indexOf(e)},toSlug:function(e){e=e.replace(/^\s+|\s+$/g,""),e=e.toLowerCase();for(var t="àáäâèéëêìíïîòóöôùúüûñç·/_,:;",s="aaaaeeeeiiiioooouuuunc------",n=0,i=t.length;n<i;n++)e=e.replace(new RegExp(t.charAt(n),"g"),s.charAt(n));return e=e.replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-"),e}}},be=we,ye=(s("e69a"),Object(M["a"])(be,fe,ge,!1,null,"08c3bcbe",null)),_e=ye.exports,$e={name:"Options",components:{Register:_e},props:["registered","editing","name","color","grid","usernames"],data:function(){return{}},mounted:function(){},methods:{}},Ce=$e,Me=(s("4b45"),Object(M["a"])(Ce,he,me,!1,null,"1ee79314",null)),Oe=Me.exports,xe=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{class:{moderating:e.moderating},attrs:{id:"userlistContainer"}},[s("div",{attrs:{id:"userlist"}},[s("span",{staticClass:"title"},[s("span",[e._v("participants")]),s("div",{attrs:{id:"moderate"}},[s("span",{staticClass:"moderateButton",on:{click:function(t){e.moderating?e.moderating=!1:e.moderator?e.moderating=!0:e.authenticating?e.authenticating=!1:e.authenticating=!0}}},[e.moderating?s("span",[e._v("—")]):s("span",[e._v("M")])]),e.authenticating?s("input",{ref:"password",attrs:{type:"password",name:"moderator",placeholder:"moderator password",autofocus:""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.authenticate()}}}):e._e()])]),s("ul",[s("Label",{attrs:{isMe:!0,user:e.me,messages:e.getUserMessages(e.me),moderating:e.moderating},on:{goTo:function(t){return e.$emit("goTo",t)}},nativeOn:{click:function(t){return t.stopPropagation(),e.$emit("goTo",e.me)}}}),e._l(e.connectedUsersFirst(),(function(t){return s("Label",{key:t.uid,attrs:{user:t,moderating:e.moderating,messages:e.getUserMessages(t)},on:{goTo:function(t){return e.$emit("goTo",t)}},nativeOn:{click:function(s){return s.stopPropagation(),e.$emit("goTo",t)}}})}))],2)])])},ke=[],Se=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("li",{class:["userLabel",e.user.uid,{me:e.isMe}],style:{"--userColor":e.user.connected?e.user.color:"lightgrey"},on:{mouseover:function(t){t.stopPropagation(),e.hovered=!0},mouseleave:function(t){t.stopPropagation(),e.hovered=!1}}},[s("span",{staticClass:"bullet"},[e._v(" ● ")]),s("span",{staticClass:"name"},[e._v(" "+e._s(e.isMe?"me":e.user.name)+" ")]),e.moderating?s("div",{staticClass:"moderatorOptions"},[s("span",{staticClass:"messages",on:{click:function(t){t.stopPropagation(),e.messagesVisible=!e.messagesVisible}}},[e._v("messages")]),s("span",{staticClass:"block"},[e._v("block")]),s("span",{staticClass:"delete"},[e._v("delete")])]):e._e(),s("span",{staticClass:"goto"},[e._v(" "+e._s(e.hovered?"→":""))]),e.moderating&&e.messagesVisible?s("div",{staticClass:"messageListContiner"},[e.messages.length>0?s("ul",{staticClass:"messageList"},e._l(e.messages,(function(t){return s("MessageOptions",{key:t.uid,attrs:{message:t},nativeOn:{click:function(s){return s.stopPropagation(),e.$emit("goTo",t)}}})})),1):s("p",[e._v("This user has no messaages.")])]):e._e()])},Te=[],Pe=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{class:["miniMessageContainer",{hover:e.hovered}],on:{mouseover:function(t){e.hovered=!0},mouseleave:function(t){e.hovered=!1}}},[s("span",{staticClass:"message"},[e._v(" "+e._s(e.message.content)+" ")]),s("span",{staticClass:"time"},[e._v(" "+e._s(e.format(e.message.time))+" ")]),s("span",{staticClass:"delete"},[e._v("delete")]),s("span",{staticClass:"goto"},[e._v(" "+e._s(e.hovered?"→":""))])])},Ne=[],je={name:"MessageOptions",components:{},props:["message"],data:function(){return{now:(new Date).getTime(),hovered:!1}},mounted:function(){},methods:{format:function(e){return Object(A["a"])(e).format("MMM Do @ HH:mm:ss ")}}},Ee=je,Le=(s("bc17"),Object(M["a"])(Ee,Pe,Ne,!1,null,"af3a435a",null)),Ue=Le.exports,ze={name:"Label",components:{MessageOptions:Ue},props:["isMe","user","messages","moderating"],data:function(){return{hovered:!1,messagesVisible:!1}},mounted:function(){},methods:{}},Je=ze,We=(s("9766"),Object(M["a"])(Je,Se,Te,!1,null,"65b58356",null)),He=We.exports,De={name:"List",components:{Label:He},props:["me","users","messages"],data:function(){return{moderator:!1,authenticating:!1,moderating:!1}},mounted:function(){},methods:{authenticate:function(){var e=this.$refs.password.value;"0000"===e&&(this.moderator=!0,this.authenticating=!1,this.moderating=!0)},getUserMessages:function(e){var t=[];for(var s in this.messages){var n=this.messages[s];n.author==e.uid&&t.push(n)}return t.reverse()},connectedUsersFirst:function(){var e=Object.values(this.users);e.sort((function(e,t){return e.connected===t.connected?0:e.connected?-1:1}));for(var t={},s=0;s<e.length;s++){var n=e[s];t[n.uid]=n}return t}}},Ve=De,Ie=(s("ebbd"),Object(M["a"])(Ve,xe,ke,!1,null,"08ed5500",null)),Re=Ie.exports,Xe=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.user.deleted?e._e():s("div",{class:["user",e.user.uid,{me:e.isMe,disconnected:!e.user.connected}],style:{"--userColor":e.user.connected?e.user.color:"lightgrey"}},[s("Cursorr",{ref:"Cursor",attrs:{user:e.user,isMe:e.isMe,hovered:e.hovered,dragging:e.dragging},on:{newPosition:function(t){return e.$emit("newPosition",t)}},nativeOn:{mouseover:function(t){!e.isMe&&(e.hovered=!0)},mouseleave:function(t){e.hovered=!1}}}),e._l(e.messages,(function(t){return s("Message",{key:t.uid,ref:"Messages",refInFor:!0,attrs:{message:t,isMe:e.isMe},nativeOn:{mouseover:function(t){e.hovered=!0},mouseleave:function(t){e.hovered=!1}}})}))],2)},Ae=[],Be=function(){var e=this,t=e.$createElement,s=e._self._c||t;return!e.message.uid||e.message.deleted||e.message.navigation?e._e():s("div",{class:["messageContainer",{hover:e.hovered,announcement:e.message.announcement}],style:{left:e.toNearestX(e.message.x,.4)+"%",top:e.toNearestX(e.message.y,.4)+"%","--blur":"blur("+(e.now-e.message.time)/1e8+"px)"},attrs:{id:e.message.uid},on:{mouseover:function(t){e.hovered=!0},mouseleave:function(t){e.hovered=!1}}},[s("vue-markdown",{staticClass:"message"},[e._v(" "+e._s(e.message.content)+" ")]),s("span",{staticClass:"time"},[e._v(" "+e._s(e.fromNow(e.message.time))+" ")])],1)},Fe=[],Ye={name:"Message",components:{},props:["isMe","message"],data:function(){return{now:(new Date).getTime(),hovered:!1}},mounted:function(){},methods:{fromNow:function(e){return Object(A["a"])(e).fromNow()},toNearestX:function(e,t){return Math.floor(100*e/t)*t}}},Ge=Ye,Ze=(s("fd40"),Object(M["a"])(Ge,Be,Fe,!1,null,null,null)),qe=Ze.exports,Ke={name:"User",components:{Cursorr:I,Message:qe},props:["user","messages","isMe","dragging"],data:function(){return{hovered:!1}},mounted:function(){},methods:{}},Qe=Ke,et=(s("f5c3"),Object(M["a"])(Qe,Xe,Ae,!1,null,null,null)),tt=et.exports,st=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"territory",style:{left:e.toNearestX(e.borders.x,.4)+"%",top:e.toNearestX(e.borders.y,.4)+"%",width:"20%",height:"20%"},attrs:{id:e.name}},[s("Island",{attrs:{name:e.name,content:e.content},on:{more:function(t){e.more=!0}}}),s("Overlay",{class:{hidden:!e.more},attrs:{content:e.content},on:{less:function(t){e.more=!1}}})],1)},nt=[],it=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"island",style:{width:"40%",height:"40%"}},[s("div",{staticClass:"header"},[s("h1",{staticClass:"title",on:{click:function(t){return e.$router.push("#"+e.name)}}},[e._v(" "+e._s(e.content.Title)+" ")]),s("h1",{staticClass:"more",on:{click:function(t){return t.stopPropagation(),e.$emit("more")}}},[e._v("+")])]),s("div",{staticClass:"body"},[s("vue-markdown",{attrs:{source:e.content.Body}})],1)])},ot=[],rt={name:"Island",components:{},props:["name","content"],data:function(){return{}},computed:{},created:function(){},methods:{}},at=rt,ct=(s("ff5f"),Object(M["a"])(at,it,ot,!1,null,"3fe4aaee",null)),ut=ct.exports,lt=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"overlayContainer",on:{scroll:function(e){e.stopPropagation()},mousedown:function(e){e.stopPropagation()},mouseup:function(e){e.stopPropagation()}}},[s("div",{staticClass:"overlay"},[s("span",{staticClass:"close",on:{click:function(t){return t.stopPropagation(),e.$emit("less")}}},[e._v("✕")]),e._l(e.sections,(function(e){return s("Section",{key:e.id,attrs:{section:e}})}))],2)])},dt=[],ht=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",[s("div",{staticClass:"header"},[s("h3",{staticClass:"subtitle"},[e._v(" "+e._s(e.section.Subtitle)+" ")]),s("h1",{staticClass:"title"},[e._v(" "+e._s(e.section.Title)+" ")])]),s("div",{staticClass:"body"},[s("vue-markdown",{attrs:{source:e.section.Body}})],1)])},mt=[],ft={name:"Section",props:["section"],data:function(){return{}},created:function(){}},gt=ft,pt=(s("3617"),Object(M["a"])(gt,ht,mt,!1,null,"4524ede4",null)),vt=pt.exports,wt={name:"Overlay",components:{Section:vt},props:["content"],data:function(){return{sections:[]}},created:function(){var e=this;this.content.sections||this.$http.get("".concat(this.$apiURL,"/about")).then((function(t){e.sections=t.data.Sections})).catch((function(e){console.log(e)}))}},bt=wt,yt=(s("0229"),Object(M["a"])(bt,lt,dt,!1,null,"6ed6f68b",null)),_t=yt.exports,$t={name:"Territory",components:{Island:ut,Overlay:_t},props:["name","borders"],data:function(){return{content:{},more:!1}},computed:{},created:function(){var e=this;this.$http.get("".concat(this.$apiURL,"/").concat(this.name)).then((function(t){e.content=t.data})).catch((function(e){console.log(e)}))},methods:{toNearestX:function(e,t){return Math.floor(100*e/t)*t}}},Ct=$t,Mt=(s("bb66"),Object(M["a"])(Ct,st,nt,!1,null,"90a3e5a8",null)),Ot=Mt.exports,xt=[],kt=[],St={name:"Userland",components:{Grid:L,Minimap:de,Options:Oe,Userslist:Re,User:tt,Territory:Ot},props:["wantsToView"],data:function(){return{version:3,doNotSave:!1,me:{uid:Object(g["a"])(),connected:!1,name:"newUser-"+Object(g["a"])(),color:this.randomColor(),x:0,y:0,typing:null},users:{},messages:{},islands:[{name:"landing-area",borders:{x:.4,y:.4}}],registered:localStorage.me,visited:localStorage.uid,hasUsers:localStorage.users,hasMessages:localStorage.messages,moderator:!0,editing:!1,scrolling:!1,dragging:!1,windowWidth:window.innerWidth,windowHeight:window.innerHeight,windowLeft:null,windowTop:null,scale:c.scale,grid:!0}},computed:{},watch:{wantsToView:function(e){this.route(e.type,e.name)}},created:function(){console.log("version:",localStorage.version),localStorage.version!=this.version&&(console.log("this version is outdated, clearing your storage."),localStorage.clear(),localStorage.version=this.version),this.registered?this.me=JSON.parse(localStorage.me):this.visited?(this.me.uid=localStorage.uid,this.me.color=localStorage.color):(localStorage.uid=this.me.uid,localStorage.color=this.me.color),this.hasUsers&&(this.users=JSON.parse(localStorage.users)),this.hasMessages&&(this.messages=JSON.parse(localStorage.messages))},mounted:function(){var e=this;this.track(),window.addEventListener("resize",(function(){e.getWindowSize()})),this.getViewerPosition(),this.wantsToView?this.route(this.wantsToView.type,this.wantsToView.name):setTimeout((function(){e.scrollTo(e.toPixels(e.islands[0].borders),"smooth")}),50)},sockets:{connect:function(){this.me.connected=!0,this.$socket.emit("user",this.me)},user:function(e){var t=JSON.parse(e);t.uid!==this.me.uid&&(this.$set(this.users,t.uid,t),this.$socket.emit("users",this.users),this.$socket.emit("messages",this.messages))},users:function(e){var t=this,s=JSON.parse(e);for(var i in xt.push(s),xt.sort((function(e,t){return Object.keys(t).length-Object.keys(e).length})),n=xt[0],xt.forEach((function(e){for(var s in e)n[s]||(s!==t.me.uid?n[s]=e[s]:console.log("false alarm, its you."),e[s].deleted&&(n[s].deleted=!0))})),n){var o=n[i];i!==this.me.uid&&this.$set(this.users,i,o)}localStorage.users=JSON.stringify(this.users)},message:function(e){var t=JSON.parse(e);this.$set(this.messages,t.uid,t),this.$socket.emit("messages",this.messages),t.announcement&&t.author!==this.me.uid&&this.scrollTo(this.getPosition(t),"smooth")},messages:function(e){var t=JSON.parse(e);for(var s in kt.push(t),kt.sort((function(e,t){return Object.keys(t).length-Object.keys(e).length})),i=kt[0],kt.forEach((function(e){for(var t in e)i[t]||(i[t]=e[t])})),i){var n=i[s];this.$set(this.messages,s,n)}localStorage.messages=JSON.stringify(this.messages)},position:function(e){var t=JSON.parse(e);t.uid!==this.me.uid&&(this.$set(this.users,t.uid,t),localStorage.users=JSON.stringify(this.users))},appearance:function(e){var t=JSON.parse(e);t.uid!==this.me.uid&&(this.$set(this.users,t.uid,t),localStorage.users=JSON.stringify(this.users))},typing:function(e){var t=JSON.parse(e);t.uid!==this.me.uid&&(this.$set(this.users,t.uid,t),localStorage.users=JSON.stringify(this.users))},userDisconnect:function(e){var t=JSON.parse(e);t.uid!==this.me.uid&&(this.$set(this.users,t.uid,t),localStorage.users=JSON.stringify(this.users))},clearDBs:function(){this.users={},localStorage.users=JSON.stringify(this.users),this.messages={},localStorage.messages=JSON.stringify(this.messages),window.location.reload(!0)},disconnect:function(){this.me.connected=!1,this.doNotSave||(localStorage.me=JSON.stringify(this.me),localStorage.users=JSON.stringify(this.users),localStorage.messages=JSON.stringify(this.messages))}},methods:{saveMe:function(e){this.me.name=e.name,this.me.color=e.color,this.$socket.emit("user",this.me),this.registered=!0,this.editing=!1,localStorage.me=JSON.stringify(this.me)},deleteMe:function(){this.me.deleted=!0,this.getUserMessages(this.me).forEach((function(e){return e.deleted=!0})),this.$socket.emit("user",this.me),this.$socket.emit("message",{}),this.doNotSave=!0,localStorage.clear(),window.location.reload(!0)},deleteEverything:function(){this.$socket.emit("clearDBs")},updatePosition:function(e){var t=(this.windowLeft+e.x)/(this.windowWidth*this.scale),s=(this.windowTop+e.y)/(this.windowHeight*this.scale);this.me.x=t,this.me.y=s,this.me.connected=!0,this.$socket.emit("position",this.me)},updateTyping:function(e){this.me.typing=e,this.$socket.emit("typing",this.me)},updateColor:function(e){this.me.color=e.color,this.$socket.emit("appearance",this.me),localStorage.me=JSON.stringify(this.me)},updateAppearance:function(e){this.me.name=e.name,this.me.color=e.color,this.$socket.emit("appearance",this.me),this.editing=!1,localStorage.me=JSON.stringify(this.me)},sendMessage:function(e){e.content&&" "!=e.content&&this.$socket.emit("message",e)},constructMessage:function(e){var t=(new Date).getTime(),s={uid:this.me.uid+t,author:this.me.uid,content:e,time:t,color:this.me.color,x:this.me.x,y:this.me.y,deleted:!1,announcement:!1};return s},route:function(e,t){var s;if("user"==e){var n=this.findUser(t);n?s=this.getPosition(n):console.log("not found")}else if("territory"==e){var i=this.findTerritory(t);i?s=this.toPixels(i.borders):console.log("not found")}this.scrollTo(s,"smooth")},findTerritory:function(e){return this.islands.find((function(t){return t.name==e}))},findUser:function(e){var t=Object.values(this.users),s=t.find((function(t){return t.name==e}));if(s)return this.users[s.uid]},getUserNames:function(){var e=Object.values(this.users),t=e.map((function(e){return e.name}));return t},getUserMessages:function(e){var t=[];for(var s in this.messages){var n=this.messages[s];n.author==e.uid&&t.push(n)}return t},zoomIn:function(){this.scale+=.25;var e={x:(this.scale*this.windowWidth-this.windowLeft)/2,y:(this.scale*this.windowHeight-this.windowTop)/2};this.scrollTo(e)},zoomOut:function(){if(this.scale>1){this.scale-=.25;var e={x:(this.scale*this.windowWidth-this.windowLeft)/2,y:(this.scale*this.windowHeight-this.windowTop)/2};this.scrollTo(e)}},drag:function(e){this.scrollTo({x:this.windowLeft-e.movementX,y:this.windowTop-e.movementY})},centerMe:function(){var e=this;this.scale=5,setTimeout((function(){e.scrollTo(e.getPosition({x:.5,y:.5}),"smooth")}),50)},scrollTo:function(e,t){this.$refs.userlandContainer.scroll({left:e.x,top:e.y,behavior:t||"auto"})},getPosition:function(e){return e=this.toPixels(e),{x:e.x-this.windowWidth/2,y:e.y-this.windowHeight/2}},getCenter:function(e){return e=this.toPixels(e),console.log(e),{x:e.x-e.w/2,y:e.y-e.h/2,w:e.w?e.w:0,h:e.h?e.h:0}},toPixels:function(e){return{x:e.x*this.scale*this.windowWidth,y:e.y*this.scale*this.windowHeight,w:e.w?e.w:0,h:e.h?e.h:0}},randomColor:function(){var e=Math.floor(256*Math.random()),t=Math.floor(256*Math.random()),s=Math.floor(256*Math.random()),n=1,i="rgb(".concat(e,", ").concat(t,", ").concat(s,", ").concat(n,")");return i},getViewerPosition:function(){this.windowLeft=this.$refs.userlandContainer.scrollLeft,this.windowTop=this.$refs.userlandContainer.scrollTop},getWindowSize:function(){this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight},track:function(){var e,t,s,n=this,i=this.$refs.me.$refs.Cursor.$refs.input;this.$refs.userlandContainer.addEventListener("keyup",(function(o){if(n.registered&&!n.editing){var r=o.which||o.keyCode;if(i!==document.activeElement&&(i.focus(),r>=48&&r<=90)){var a=String.fromCharCode(r);i.value=a}"~"==i.value?t=!0:"!"==i.value&&(s=!0);var c=n.getUserMessages(n.me),u=c[0],l=c[c.length-1],d=c[c.indexOf(e)-1],h=c[c.indexOf(e)+1];if(38==r)e=e?d||u:l,i.value=e.content,i.select();else if(40==r)e&&h&&(e=h,i.value=e.content,i.select());else if(13==r){var m=n.constructMessage(i.value);s?(m.announcement=!0,s=!1):t&&(m.navigation=!0,n.$router.push(i.value),t=!1),n.sendMessage(m),e=void 0,i.value="",i.placeholder=""}else 27==r&&(i.value="",i.blur());n.updateTyping(i.value)}})),this.$refs.userlandContainer.addEventListener("click",(function(){if(n.registered&&!n.editing){i.focus();var t=n.constructMessage(i.value);n.sendMessage(t),e=void 0,i.value="",i.placeholder=""}}))}}},Tt=St,Pt=(s("1812"),Object(M["a"])(Tt,m,f,!1,null,null,null)),Nt=Pt.exports,jt={name:"Home",components:{Mainland:Nt},props:["slug"],data:function(){return{loaded:!1,status:"loading...",isMobile:!!c.$root.isMobile,wantsToView:null}},created:function(){var e=this;this.$http.get(this.$apiURL+"/hosts").then((function(t){e.hosts=t.data,e.loaded=!0,e.msg="ready."})).catch((function(t){console.log(t),e.msg="there is an error :( contact karl <bonjour@moubarak.eu>"})),this.slug&&this.handleRouting(this.slug)},mounted:function(){var e=this;this.$router.afterEach((function(t){var s=t.fullPath.replace(e.$publicPath,"");e.handleRouting(s)}))},methods:{handleRouting:function(e){var t,s;e.startsWith("~")?t="user":e.startsWith("#")?t="territory":console.log("not found"),s=e.slice(1),s?console.log(s):console.log("no username provided"),this.wantsToView={type:t,name:s}}}},Et=jt,Lt=(s("cccb"),Object(M["a"])(Et,d,h,!1,null,null,null)),Ut=Lt.exports,zt={name:"App",components:{Home:Ut},data:function(){return{isMobile:Boolean,slug:window.location.pathname.replace(this.$publicPath,"")}},created:function(){this.CheckForMobile(),window.addEventListener("resize",this.CheckForMobile),l.a.polyfill()},methods:{CheckForMobile:function(){window.innerWidth<=760?(c.$root.isMobile=!0,this.isMobile=!0):(c.$root.isMobile=!1,this.isMobile=!1)}}},Jt=zt,Wt=(s("034f"),Object(M["a"])(Jt,r,a,!1,null,null,null)),Ht=Wt.exports,Dt=s("8c4f");o["a"].use(Dt["a"]);var Vt=[{path:"/",name:"Home",component:Ut}],It=new Dt["a"]({mode:"history",routes:Vt}),Rt=It,Xt=s("bc3a"),At=s.n(Xt),Bt=s("5132"),Ft=s.n(Bt),Yt=s("8e27"),Gt=s.n(Yt),Zt=s("9ce6"),qt=s.n(Zt),Kt=s("0576"),Qt=s.n(Kt);o["a"].prototype.$http=At.a,o["a"].prototype.$apiURL="https://api.obfuscation.karls.computer",o["a"].prototype.$publicPath="/",o["a"].config.productionTip=!1,qt.a.props.anchorAttributes.default=function(){return{target:"_blank",rel:"noopener noreferrer nofollow"}},o["a"].component("vue-markdown",qt.a),o["a"].use(Qt.a);var es=Gt()("https://io.karls.computer");o["a"].use(new Ft.a({connection:es})),new o["a"]({router:Rt,render:function(e){return e(Ht)}}).$mount("#app")},"5c54":function(e,t,s){},"5ced":function(e,t,s){},"62d5":function(e,t,s){},"696f":function(e,t,s){"use strict";s("5c54")},"6f43":function(e,t,s){},"85ec":function(e,t,s){},"8a73":function(e,t,s){},9766:function(e,t,s){"use strict";s("2104")},"9a7c":function(e,t,s){},a653:function(e,t,s){},bb66:function(e,t,s){"use strict";s("f1ee")},bc17:function(e,t,s){"use strict";s("a653")},c3b6:function(e,t,s){"use strict";s("3886")},c4ca:function(e,t,s){},cbe1:function(e,t,s){},cccb:function(e,t,s){"use strict";s("5ced")},da82:function(e,t,s){"use strict";s("157c")},dda3:function(e,t,s){},dfe9:function(e,t,s){},e627:function(e,t,s){},e69a:function(e,t,s){"use strict";s("cbe1")},ebbd:function(e,t,s){"use strict";s("8a73")},f1ee:function(e,t,s){},f5c3:function(e,t,s){"use strict";s("e627")},fd40:function(e,t,s){"use strict";s("dda3")},ff5f:function(e,t,s){"use strict";s("1e51")},ffd72:function(e,t,s){}});
//# sourceMappingURL=app.9cb30f63.js.map