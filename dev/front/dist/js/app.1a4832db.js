(function(e){function t(t){for(var s,r,a=t[0],c=t[1],u=t[2],d=0,h=[];d<a.length;d++)r=a[d],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&h.push(i[r][0]),i[r]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(e[s]=c[s]);l&&l(t);while(h.length)h.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],s=!0,a=1;a<n.length;a++){var c=n[a];0!==i[c]&&(s=!1)}s&&(o.splice(t--,1),e=r(r.s=n[0]))}return e}var s={},i={app:0},o=[];function r(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=s,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(n,s,function(t){return e[t]}.bind(null,s));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var l=c;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"0460":function(e,t,n){"use strict";n("c918")},"0ccf":function(e,t,n){"use strict";n("c4ca")},"101a":function(e,t,n){},"12f1":function(e,t,n){},"17ba":function(e,t,n){"use strict";n("f7dd")},1812:function(e,t,n){"use strict";n("101a")},2350:function(e,t,n){"use strict";n("f2bb")},"293d":function(e,t,n){},"2d9b":function(e,t,n){},"31ad":function(e,t,n){},"32a0":function(e,t,n){"use strict";n("5d18")},3407:function(e,t,n){},3617:function(e,t,n){"use strict";n("6f43")},"3cd2":function(e,t,n){"use strict";n("9a7c")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var s=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Home",{class:{mobile:e.isMobile},attrs:{slug:e.slug}})],1)},o=[],r=(n("ac1f"),n("5319"),new s["a"]({data:{isMobile:!1,scale:5}})),a=n("7707"),c=n.n(a),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{hidden:!e.loaded},attrs:{id:"home"}},[e.blocked?n("Nomansland"):n("Mainland",{attrs:{wantsToView:e.wantsToView},on:{blocked:function(t){e.blocked=!0}}})],1)},l=[],d=(n("fb6a"),n("2ca0"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("header",{class:{blur:!e.registered||e.editing}},[n("Minimap",{attrs:{windowWidth:e.windowWidth,windowHeight:e.windowHeight,windowLeft:e.windowLeft,windowTop:e.windowTop,scale:e.scale,dragging:e.dragging,miniDragging:e.miniDragging,users:e.getNotDeletedUsers(),messages:e.getNotDeletedMessages(),islands:e.islands},on:{miniDragging:function(t){e.miniDragging=!0},miniStopDragging:function(t){e.miniDragging=!1},newPosition:function(t){return e.scrollTo(t,e.miniDragging?"auto":"smooth")},zoomin:e.zoomIn,zoomout:e.zoomOut,zero:e.centerMe}}),n("Options",{attrs:{registered:e.registered,editing:e.editing,name:e.me.name,color:e.me.color,usernames:e.getUserNames(),grid:e.grid},on:{grid:function(t){e.grid=!e.grid},editMe:function(t){e.editing=!0},newColor:e.updateColor,newMe:e.updateAppearance,register:e.saveMe,deleteMe:function(t){return e.deleteMe()},deleteEverything:function(t){return e.deleteEverything()}}}),n("Userslist",{attrs:{me:e.me,users:e.getNotDeletedUsers(),messages:e.messages,moderator:e.moderator},on:{deleteMessage:function(t){return e.deleteMessage(t)},deleteUser:function(t){return e.deleteUser(t)},goTo:function(t){e.scrollTo(e.getPosition(t),"smooth")}}})],1),n("div",{ref:"userlandContainer",class:{blur:!e.registered||e.editing,dragging:e.dragging},attrs:{id:"userlandContainer"},on:{scroll:function(t){return e.getViewerPosition()}}},[n("div",{ref:"userland",style:{height:100*e.scale+"%",width:100*e.scale+"%","--scale":e.scale},attrs:{id:"userland"},on:{mousedown:function(t){t.stopPropagation(),e.dragging=!0},mousemove:function(t){e.dragging&&e.drag(t)},mouseup:function(t){t.stopPropagation(),e.dragging=!1}}},[n("Grid",{attrs:{scale:10,hidden:!e.grid}}),e._l(e.getNotDeletedUsers(),(function(t){return n("User",{key:t.uid,ref:t.uid===e.me.uid?"me":"Users",refInFor:!0,attrs:{user:t,isMe:t.uid===e.me.uid,messages:e.getUserMessages(t)},on:{deleteMessage:function(t){return e.deleteMessage(t)},newPosition:e.updatePosition}})})),e._l(e.islands,(function(e){return n("Territory",{key:e.name,attrs:{name:e.name,borders:e.borders}})}))],2)])])}),h=[],m=(n("99af"),n("4de4"),n("7db0"),n("4160"),n("c975"),n("d81d"),n("b0c0"),n("b64b"),n("07ac"),n("159b"),n("8a77")),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("table",{class:{hidden:e.hidden},attrs:{id:"grid"}},[n("tbody",e._l(e.scale*e.definition,(function(t){return n("Row",{key:t,attrs:{x:e.scale*e.definition}})})),1)])},g=[],p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("tr",e._l(e.x,(function(e){return n("Cell",{key:e})})),1)},v=[],w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("td")},b=[],y={name:"Cell"},_=y,$=(n("7138"),n("2877")),M=Object($["a"])(_,w,b,!1,null,"825c3c98",null),C=M.exports,O={name:"Row",components:{Cell:C},props:["x"]},x=O,k=Object($["a"])(x,p,v,!1,null,"4ed0d323",null),S=k.exports,T={name:"Table",components:{Row:S},props:["scale","hidden"],data:function(){return{definition:10}}},P=T,N=(n("be7c"),Object($["a"])(P,f,g,!1,null,"17ae1790",null)),j=N.exports,E=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{hovered:e.hovered||e.dragging},style:{height:e.height+"px",width:e.width+"px"},attrs:{id:"minimap"},on:{mouseover:function(t){e.hovered=!0},mouseout:function(t){e.hovered=!1},mousedown:function(t){e.sendDesiredPosition(t),e.$emit("miniDragging")},mousemove:function(t){e.miniDragging&&e.sendDesiredPosition(t)},mouseup:function(t){e.$emit("miniStopDragging"),e.sendDesiredPosition(t)}}},[e._l(e.users,(function(t){return n("Cursorr",{key:t.uid,attrs:{user:t,scale:e.scale}})})),e._l(e.messages,(function(t){return n("Message",{key:t.uid,attrs:{message:t,hovered:e.hovered,dragging:e.dragging}})})),e._l(e.islands,(function(e){return n("Territory",{key:e.name,attrs:{name:e.name,borders:e.borders}})})),n("Window",{ref:"viewport",attrs:{id:"viewport",width:e.windowWidth/e.zoomIndex,height:e.windowHeight/e.zoomIndex,left:e.windowLeft/e.zoomIndex,top:e.windowTop/e.zoomIndex}}),n("div",{staticClass:"zoom"},[n("div",{staticClass:"in",on:{mousedown:function(t){return t.stopPropagation(),e.$emit("zoomin")},mouseup:function(e){e.stopPropagation()}}},[e._v("+")]),n("div",{staticClass:"out",on:{mousedown:function(t){return t.stopPropagation(),e.$emit("zoomout")},mouseup:function(e){e.stopPropagation()}}},[e._v("-")]),n("div",{staticClass:"zero",on:{mousedown:function(t){return t.stopPropagation(),e.$emit("zero")},mouseup:function(e){e.stopPropagation()}}},[e._v("○")])])],2)},U=[],D=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.user.deleted?e._e():n("div",{class:["cursorContainer",{uid:e.user.uid,hovered:!e.scale&&(e.user.typing||e.hovered),dragging:e.dragging}],style:{left:100*e.user.x-.1+"%",top:100*e.user.y-.2+"%","--scale":e.scale?3:15,"--userColor":e.user.connected?e.user.color:"lightgrey"}},[!e.scale&&e.isMe?n("input",{ref:"input",staticClass:"input",attrs:{type:"text",placeholder:"type message & press enter",autofocus:""}}):e.scale?e._e():n("span",{staticClass:"input"},[e._v(" "+e._s(e.user.typing)+" ")]),n("div",{staticClass:"cursor"},[e.scale||!e.user.typing&&!e.hovered?e.scale?e._e():n("span",{staticClass:"name"}):n("span",{staticClass:"name"},[e._v(" "+e._s(e.isMe?"me":e.user.connected?e.user.name:e.user.name+" (offline)")+" ")])])])},L=[],z={name:"Cursorr",components:{},props:["user","isMe","scale","hovered","dragging"],data:function(){return{}},mounted:function(){this.isMe&&!this.scale&&this.trackCursor()},methods:{trackCursor:function(){var e=this;document.addEventListener("mousemove",(function(t){e.$emit("newPosition",{x:t.clientX,y:t.clientY}),t.preventDefault()}))}}},J=z,H=(n("d219"),Object($["a"])(J,D,L,!1,null,"779daef6",null)),W=H.exports,I=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.message.uid&&!e.message.deleted?n("div",{class:["minimessage",{clear:e.hovered||e.dragging}],style:{left:e.toNearestX(e.message.x,.4)+"%",top:e.toNearestX(e.message.y,.4)+"%",width:e.message.content.length/2+"px",background:e.message.color,"--blur":"blur("+(e.now-e.message.time)/1e8+"px)"}}):e._e()},V=[],X=n("f817"),R={name:"Message",components:{},props:["message","hovered","dragging"],data:function(){return{now:(new Date).getTime()}},mounted:function(){},methods:{fromNow:function(e){return Object(X["a"])(e).fromNow()},toNearestX:function(e,t){return Math.floor(100*e/t)*t}}},B=R,A=(n("0ccf"),Object($["a"])(B,I,V,!1,null,null,null)),F=A.exports,Y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"miniterritory",style:{left:e.toNearestX(e.borders.x,.4)+"%",top:e.toNearestX(e.borders.y,.4)+"%",width:"20%",height:"20%"},attrs:{id:"mini-"+e.name}},[n("div",{staticClass:"box"})])},G=[],Z={name:"Territory",components:{},props:["name","borders"],data:function(){return{}},mounted:function(){},methods:{toNearestX:function(e,t){return Math.floor(100*e/t)*t}}},q=Z,K=(n("3cd2"),Object($["a"])(q,Y,G,!1,null,null,null)),Q=K.exports,ee=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{style:{width:e.width+e.unit,height:e.height+e.unit,left:e.left+e.unit,top:e.top+e.unit}})},te=[],ne={name:"Window",components:{},props:["width","height","left","top"],data:function(){return{unit:"px"}},mounted:function(){},methods:{}},se=ne,ie=(n("fb59"),Object($["a"])(se,ee,te,!1,null,"6916f9b4",null)),oe=ie.exports,re={name:"Map",components:{Cursorr:W,Message:F,Territory:Q,Window:oe},props:["windowWidth","windowHeight","windowLeft","windowTop","scale","users","islands","messages","dragging","miniDragging"],data:function(){return{width:this.windowWidth/5,height:this.windowHeight/5,zoomIndex:5*this.scale,mini:!0,hovered:!1}},watch:{windowWidth:function(){this.width=this.windowWidth/5},windowHeight:function(){this.height=this.windowHeight/5},scale:function(){this.zoomIndex=5*this.scale}},mounted:function(){},methods:{sendDesiredPosition:function(e){var t=e.pageX-this.$el.offsetLeft,n=this.width/(2*this.scale),s=(t-n)*this.zoomIndex,i=e.pageY-this.$el.offsetTop,o=this.height/(2*this.scale),r=(i-o)*this.zoomIndex;this.$emit("newPosition",{x:s,y:r})}}},ae=re,ce=(n("ec3b"),Object($["a"])(ae,E,U,!1,null,"393ca1b4",null)),ue=ce.exports,le=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"options"}},[!e.registered||e.editing?n("Register",{attrs:{registered:e.registered,name:e.name,color:e.color,usernames:e.usernames},on:{newMe:function(t){return e.$emit("newMe",t)},newColor:function(t){return e.$emit("newColor",t)},register:function(t){return e.$emit("register",t)}}}):e._e(),n("span",{staticClass:"title"},[e._v(" options ")]),n("div",{staticClass:"grid"},[n("input",{attrs:{type:"button",name:"grid",value:e.grid?"hide grid":"show grid"},on:{click:function(t){return t.stopPropagation(),e.$emit("grid")}}})]),n("div",{staticClass:"edituser"},[n("input",{attrs:{type:"button",name:"edituser",value:"edit appearance"},on:{click:function(t){return t.stopPropagation(),e.$emit("editMe")}}})]),n("div",{staticClass:"storage"},[n("input",{attrs:{type:"button",name:"storage",value:"delete me"},on:{click:function(t){return t.stopPropagation(),e.$emit("deleteMe")}}})]),n("div",{staticClass:"db"},[n("input",{attrs:{type:"button",name:"db",value:"delete everything"},on:{click:function(t){return t.stopPropagation(),e.$emit("deleteEverything")}}})])],1)},de=[],he=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{},attrs:{id:"registerContainer"}},[n("div",{attrs:{id:"register"}},[e.registered?e._e():n("div",{staticClass:"introText"},[n("h3",[e._v("Welcome.")]),n("p",[e._v("To join the conversation, please pick a display name and color. You can change these later.")])]),n("div",{staticClass:"form"},[n("input",{ref:"name",attrs:{type:"text",placeholder:"pick a display name"}}),e.invalid?n("p",{staticClass:"error"},[e._v("Your display name cannot contain any spaces or special characters. ")]):e.tooshort?n("p",{staticClass:"error"},[e._v("Your display name must contain at least 3 characters. ")]):e.inuse?n("p",{staticClass:"error"},[e._v("This name has already been taken by someone else. ")]):e._e(),n("input",{ref:"color",attrs:{type:"text","data-jscolor":""},on:{input:e.updateColor}}),n("input",{ref:"submit",attrs:{type:"button",value:"save"},on:{click:function(t){return t.stopPropagation(),e.save()}}})]),e.registered?e._e():n("div",{staticClass:"introText"},[n("p",[e._v("This site does not use cookies. The information you are entering is stored in your browser and sent to all the other users.")])])])])},me=[],fe=(n("4d63"),n("25f0"),n("881d")),ge=n.n(fe),pe={name:"Register",props:["name","color","registered","usernames"],data:function(){return{colorPickerOpts:{format:"rgba",previewPosition:"right",previewSize:30,borderRadius:0,padding:0,controlBorderColor:"rgba(255,255,255,0)",sliderSize:13,shadow:!1},invalid:!1,tooshort:!1,inuse:!1}},mounted:function(){var e=this;ge.a.presets.default=this.colorPickerOpts,this.$refs.color.value=this.color,ge.a.init(),this.registered&&(this.$refs.name.value=this.name,this.$refs.name.select()),this.$nextTick((function(){e.registered&&new ge.a(e.$refs.color)}))},methods:{save:function(){var e=this.$refs.name.value,t=this.$refs.color.value;this.validateChars(e)?this.validateLength(e)?this.existingUser(e)?this.inuse=!0:this.registered?this.updateAppearance(e,t):this.register(e,t):this.tooshort=!0:this.invalid=!0},cancel:function(){this.$emit("newMe",{name:this.name,color:this.color})},updateAppearance:function(e,t){this.$emit("newMe",{name:e,color:t})},updateColor:function(){this.$emit("newColor",{color:this.$refs.color.value})},register:function(e,t){this.$emit("register",{name:e,color:t})},validateChars:function(e){return/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(e)},validateLength:function(e){return e.length>1},existingUser:function(e){return this.usernames.indexOf(e)>-1&&e!==this.name},toSlug:function(e){e=e.replace(/^\s+|\s+$/g,""),e=e.toLowerCase();for(var t="àáäâèéëêìíïîòóöôùúüûñç·/_,:;",n="aaaaeeeeiiiioooouuuunc------",s=0,i=t.length;s<i;s++)e=e.replace(new RegExp(t.charAt(s),"g"),n.charAt(s));return e=e.replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-"),e}}},ve=pe,we=(n("e749"),Object($["a"])(ve,he,me,!1,null,"2749fc1e",null)),be=we.exports,ye={name:"Options",components:{Register:be},props:["registered","editing","name","color","grid","usernames"],data:function(){return{}},mounted:function(){},methods:{}},_e=ye,$e=(n("0460"),Object($["a"])(_e,le,de,!1,null,"5b9c8685",null)),Me=$e.exports,Ce=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{moderating:e.moderating},attrs:{id:"userlistContainer"}},[n("div",{attrs:{id:"userlist"}},[n("span",{staticClass:"title"},[n("span",[e._v("participants")]),n("div",{attrs:{id:"moderate"}},[n("span",{staticClass:"moderateButton",on:{click:function(t){e.moderating?e.moderating=!1:e.moderator?e.moderating=!0:e.authenticating?e.authenticating=!1:e.authenticating=!0}}},[e.moderating?n("span",[e._v("—")]):n("span",[e._v("M")])]),e.authenticating?n("input",{ref:"password",attrs:{type:"password",name:"moderator",placeholder:"moderator password",autofocus:""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.authenticate()}}}):e._e()])]),n("ul",e._l(e.connectedUsersFirst(),(function(t){return n("Label",{key:t.uid,attrs:{user:t,isMe:t.uid===e.me.uid,moderating:e.moderating,messages:e.getUserMessages(t)},on:{deleteMessage:function(t){return e.$emit("deleteMessage",t)},deleteUser:function(t){return e.$emit("deleteUser",t)},goTo:function(t){return e.$emit("goTo",t)}},nativeOn:{click:function(n){return n.stopPropagation(),e.$emit("goTo",t)}}})})),1)])])},Oe=[],xe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.user.deleted?e._e():n("li",{class:["userLabel",e.user.uid,{me:e.isMe}],style:{"--userColor":e.user.connected?e.user.color:"lightgrey"},on:{mouseover:function(t){t.stopPropagation(),e.hovered=!0},mouseleave:function(t){t.stopPropagation(),e.hovered=!1}}},[n("span",{staticClass:"bullet"},[e._v(" ● ")]),n("span",{staticClass:"name"},[e._v(" "+e._s(e.isMe?"me":e.user.name)+" ")]),e.moderating?n("div",{staticClass:"moderatorOptions"},[n("span",{staticClass:"messages",on:{click:function(t){t.stopPropagation(),e.messagesVisible=!e.messagesVisible}}},[e._v("messages")]),n("span",{staticClass:"delete",on:{click:function(t){return t.stopPropagation(),e.$emit("deleteUser",e.user)}}},[e._v("delete")])]):e._e(),n("span",{staticClass:"goto"},[e._v(" "+e._s(e.hovered?"→":""))]),e.moderating&&e.messagesVisible?n("div",{staticClass:"messageListContiner"},[e.messages.length>0?n("ul",{staticClass:"messageList"},e._l(e.messages,(function(t){return n("MessageOptions",{key:t.uid,attrs:{message:t},on:{deleteMessage:function(n){return e.$emit("deleteMessage",t)}},nativeOn:{click:function(n){return n.stopPropagation(),e.$emit("goTo",t)}}})})),1):n("p",[e._v("This user has no messaages.")])]):e._e()])},ke=[],Se=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:["miniMessageContainer",{hover:e.hovered}],on:{mouseover:function(t){e.hovered=!0},mouseleave:function(t){e.hovered=!1}}},[n("span",{staticClass:"message"},[e._v(" "+e._s(e.message.content)+" ")]),n("span",{staticClass:"time"},[e._v(" "+e._s(e.format(e.message.time))+" ")]),n("span",{staticClass:"delete",on:{click:function(t){return t.stopPropagation(),e.$emit("deleteMessage",e.message)}}},[e._v("delete")]),n("span",{staticClass:"goto"},[e._v(" "+e._s(e.hovered?"→":""))])])},Te=[],Pe={name:"MessageOptions",components:{},props:["message"],data:function(){return{now:(new Date).getTime(),hovered:!1}},mounted:function(){},methods:{format:function(e){return Object(X["a"])(e).format("MMM Do @ HH:mm:ss ")}}},Ne=Pe,je=(n("17ba"),Object($["a"])(Ne,Se,Te,!1,null,"34f8247e",null)),Ee=je.exports,Ue={name:"Label",components:{MessageOptions:Ee},props:["isMe","user","messages","moderating"],data:function(){return{hovered:!1,messagesVisible:!1}},mounted:function(){},methods:{}},De=Ue,Le=(n("ef7e"),Object($["a"])(De,xe,ke,!1,null,"4314ff6b",null)),ze=Le.exports,Je={name:"List",components:{Label:ze},props:["me","users","messages"],data:function(){return{moderator:!1,authenticating:!1,moderating:!1}},mounted:function(){},methods:{authenticate:function(){var e=this.$refs.password.value;"0000"===e&&(this.moderator=!0,this.authenticating=!1,this.moderating=!0)},getUserMessages:function(e){var t=[];for(var n in this.messages){var s=this.messages[n];s.author!=e.uid||s.deleted||t.push(s)}return t.reverse()},connectedUsersFirst:function(){var e=Object.values(this.users);e.sort((function(e,t){return e.connected===t.connected?0:e.connected?-1:1}));for(var t={},n=0;n<e.length;n++){var s=e[n];t[s.uid]=s}return t}}},He=Je,We=(n("bb26"),Object($["a"])(He,Ce,Oe,!1,null,"2a0038cd",null)),Ie=We.exports,Ve=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.user.deleted?e._e():n("div",{class:["user",e.user.uid,{me:e.isMe,disconnected:!e.user.connected}],style:{"--userColor":e.user.connected?e.user.color:"lightgrey"}},[n("Cursorr",{ref:"Cursor",attrs:{user:e.user,isMe:e.isMe,hovered:e.hovered,dragging:e.dragging},on:{newPosition:function(t){return e.$emit("newPosition",t)}},nativeOn:{mouseover:function(t){!e.isMe&&(e.hovered=!0)},mouseleave:function(t){e.hovered=!1}}}),e._l(e.messages,(function(t){return n("Message",{key:t.uid,ref:"Messages",refInFor:!0,attrs:{message:t,isMe:e.isMe},on:{deleteMessage:function(t){return e.$emit("deleteMessage",t)}},nativeOn:{mouseover:function(t){e.hovered=!0},mouseleave:function(t){e.hovered=!1}}})}))],2)},Xe=[],Re=function(){var e=this,t=e.$createElement,n=e._self._c||t;return!e.message.uid||e.message.deleted||e.message.navigation?e._e():n("div",{class:["messageContainer",{hover:e.hovered,announcement:e.message.announcement}],style:{left:e.toNearestX(e.message.x,.4)+"%",top:e.toNearestX(e.message.y,.4)+"%","--blur":"blur("+(e.now-e.message.time)/1e8+"px)"},attrs:{id:e.message.uid},on:{mouseover:function(t){e.hovered=!0},mouseleave:function(t){e.hovered=!1}}},[n("vue-markdown",{staticClass:"message"},[e._v(" "+e._s(e.message.content)+" ")]),n("span",{staticClass:"time"},[e._v(" "+e._s(e.fromNow(e.message.time))+" ")]),e.isMe?n("span",{staticClass:"delete",on:{click:function(t){return t.stopPropagation(),e.$emit("deleteMessage",e.message)}}},[e._v("delete")]):e._e()],1)},Be=[],Ae={name:"Message",components:{},props:["isMe","message"],data:function(){return{now:(new Date).getTime(),hovered:!1}},mounted:function(){},methods:{fromNow:function(e){return Object(X["a"])(e).fromNow()},toNearestX:function(e,t){return Math.floor(100*e/t)*t}}},Fe=Ae,Ye=(n("fd40"),Object($["a"])(Fe,Re,Be,!1,null,null,null)),Ge=Ye.exports,Ze={name:"User",components:{Cursorr:W,Message:Ge},props:["user","messages","isMe","dragging"],data:function(){return{hovered:!1}},mounted:function(){},methods:{}},qe=Ze,Ke=(n("f5c3"),Object($["a"])(qe,Ve,Xe,!1,null,null,null)),Qe=Ke.exports,et=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"territory",style:{left:e.toNearestX(e.borders.x,.4)+"%",top:e.toNearestX(e.borders.y,.4)+"%",width:"20%",height:"20%"},attrs:{id:e.name}},[n("Island",{attrs:{name:e.name,content:e.content},on:{more:function(t){e.$router.push("#"+e.name),e.more=!0}}}),n("Overlay",{class:{hidden:!e.more},attrs:{content:e.content},on:{less:function(t){e.more=!1}}})],1)},tt=[],nt=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"island",style:{width:"20%",height:"40%"}},[n("div",{staticClass:"header"},[n("h1",{staticClass:"title",on:{click:function(t){return e.$router.push("#"+e.name)}}},[e._v(" "+e._s(e.content.Title)+" ")]),n("h1",{staticClass:"more",on:{click:function(t){return t.stopPropagation(),e.$emit("more")}}},[e._v("+")])]),n("div",{staticClass:"body"},[n("vue-markdown",{attrs:{source:e.content.Body}})],1)])},st=[],it={name:"Island",components:{},props:["name","content"],data:function(){return{}},computed:{},created:function(){},methods:{}},ot=it,rt=(n("2350"),Object($["a"])(ot,nt,st,!1,null,"210263b4",null)),at=rt.exports,ct=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"overlayContainer",on:{scroll:function(e){e.stopPropagation()},mousedown:function(e){e.stopPropagation()},mouseup:function(e){e.stopPropagation()}}},[n("div",{staticClass:"overlay"},[n("span",{staticClass:"close",on:{click:function(t){return t.stopPropagation(),e.$emit("less")}}},[e._v("✕")]),e._l(e.sections,(function(e){return n("Section",{key:e.id,attrs:{section:e}})}))],2)])},ut=[],lt=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",[n("div",{staticClass:"header"},[n("h3",{staticClass:"subtitle"},[e._v(" "+e._s(e.section.Subtitle)+" ")]),n("h1",{staticClass:"title"},[e._v(" "+e._s(e.section.Title)+" ")])]),n("div",{staticClass:"body"},[n("vue-markdown",{attrs:{source:e.section.Body}})],1)])},dt=[],ht={name:"Section",props:["section"],data:function(){return{}},created:function(){}},mt=ht,ft=(n("3617"),Object($["a"])(mt,lt,dt,!1,null,"4524ede4",null)),gt=ft.exports,pt={name:"Overlay",components:{Section:gt},props:["content"],data:function(){return{sections:[]}},created:function(){var e=this;this.content.sections||this.$http.get("".concat(this.$apiURL,"/about")).then((function(t){e.sections=t.data.Sections})).catch((function(e){console.log(e)}))}},vt=pt,wt=(n("e098"),Object($["a"])(vt,ct,ut,!1,null,"0cb0d518",null)),bt=wt.exports,yt={name:"Territory",components:{Island:at,Overlay:bt},props:["name","borders"],data:function(){return{content:{},more:!1}},computed:{},created:function(){var e=this;this.$http.get("".concat(this.$apiURL,"/").concat(this.name)).then((function(t){e.content=t.data})).catch((function(e){console.log(e)}))},methods:{toNearestX:function(e,t){return Math.floor(100*e/t)*t}}},_t=yt,$t=(n("978f"),Object($["a"])(_t,et,tt,!1,null,"2df71e09",null)),Mt=$t.exports,Ct=[],Ot={},xt=[],kt={},St={name:"Mainland",components:{Grid:j,Minimap:ue,Options:Me,Userslist:Ie,User:Qe,Territory:Mt},props:["wantsToView"],data:function(){return{version:5,doNotSave:!1,registered:!1,visited:!1,me:{uid:Object(m["a"])(),connected:!1,name:"newUser-"+Object(m["a"])(),color:this.randomColor(),x:0,y:0,typing:null},users:{},messages:{},islands:[{name:"center",borders:{x:.4,y:.4}}],moderator:!0,editing:!1,scrolling:!1,dragging:!1,miniDragging:!1,windowWidth:window.innerWidth,windowHeight:window.innerHeight,windowLeft:null,windowTop:null,scale:r.scale,grid:!0}},computed:{},watch:{wantsToView:function(e){this.route(e.type,e.name)}},created:function(){console.log("Version: ".concat(localStorage.version)),localStorage.version!=this.version&&(console.log("this version is outdated, clearing your storage."),localStorage.clear(),localStorage.version=this.version),localStorage.me?(this.registered=!0,this.me=JSON.parse(localStorage.me),this.me.deleted&&this.$emit("blocked")):localStorage.uid?(this.visited=!0,this.me.uid=localStorage.uid,this.me.color=localStorage.color):(localStorage.uid=this.me.uid,localStorage.color=this.me.color),localStorage.users&&(this.users=JSON.parse(localStorage.users)),this.users[this.me.uid]=this.me,localStorage.messages&&(this.messages=JSON.parse(localStorage.messages))},mounted:function(){var e=this;this.me.deleted||(window.addEventListener("resize",(function(){e.getWindowSize()})),this.getViewerPosition(),this.wantsToView?this.route(this.wantsToView.type,this.wantsToView.name):setTimeout((function(){e.scrollTo(e.toPixels(e.islands[0].borders),"smooth")}),50),this.track())},sockets:{connect:function(){this.me.deleted||(this.me.connected=!0,this.$socket.emit("user",this.me))},user:function(e){var t=JSON.parse(e);t.uid!==this.me.uid?this.$set(this.users,t.uid,t):!0===t.deleted&&(this.me.deleted=!0,localStorage.me=JSON.stringify(this.me),window.location.reload(!0)),this.$socket.emit("users",this.users),this.$socket.emit("messages",this.messages)},users:function(e){var t=JSON.parse(e);Ct.push(t),console.log("Syncing ".concat(Ct.length," user DBs.")),this.userDBsync()},message:function(e){var t=JSON.parse(e);this.$set(this.messages,t.uid,t),this.$socket.emit("messages",this.messages),t.announcement&&t.author!==this.me.uid&&this.scrollTo(this.getPosition(t),"smooth")},messages:function(e){var t=JSON.parse(e);xt.push(t),console.log("Syncing ".concat(xt.length," message DBs.")),this.messageDBsync()},position:function(e){var t=JSON.parse(e);t.uid!==this.me.uid&&(this.$set(this.users,t.uid,t),localStorage.users=JSON.stringify(this.users))},appearance:function(e){var t=JSON.parse(e);t.uid!==this.me.uid&&(this.$set(this.users,t.uid,t),localStorage.users=JSON.stringify(this.users))},typing:function(e){var t=JSON.parse(e);t.uid!==this.me.uid&&(this.$set(this.users,t.uid,t),localStorage.users=JSON.stringify(this.users))},userDisconnect:function(e){var t=JSON.parse(e);t.uid!==this.me.uid&&(this.$set(this.users,t.uid,t),localStorage.users=JSON.stringify(this.users))},clearDBs:function(){this.users={},localStorage.users=JSON.stringify(this.users),this.messages={},localStorage.messages=JSON.stringify(this.messages),window.location.reload(!0)},disconnect:function(){if(this.me.connected=!1,!this.doNotSave)for(var e in localStorage.me=JSON.stringify(this.me),this.users)if(e!==this.me.uid){var t=this.users[e];t.connected=!1,this.$set(this.users,e,t)}localStorage.users=JSON.stringify(this.users),localStorage.messages=JSON.stringify(this.messages)}},methods:{saveMe:function(e){this.me.name=e.name,this.me.color=e.color,this.$socket.emit("user",this.me),this.registered=!0,this.editing=!1,localStorage.me=JSON.stringify(this.me)},deleteMe:function(){this.deleteUser(this.me),this.doNotSave=!0,localStorage.removeItem("me"),localStorage.removeItem("uid"),localStorage.removeItem("color"),window.location.reload(!0)},deleteUser:function(e){var t=this;e.deleted=!0,this.getUserMessages(e).forEach((function(e){t.messages[e.uid].deleted=!0})),this.$socket.emit("user",e)},deleteMessage:function(e){this.messages[e.uid].deleted=!0},deleteEverything:function(){this.$socket.emit("clearDBs")},updatePosition:function(e){var t=(this.windowLeft+e.x)/(this.windowWidth*this.scale),n=(this.windowTop+e.y)/(this.windowHeight*this.scale);this.me.x=t,this.me.y=n,this.me.connected=!0,this.$socket.emit("position",this.me)},updateTyping:function(e){this.me.typing=e,this.$socket.emit("typing",this.me)},updateColor:function(e){this.me.color=e.color,this.$socket.emit("appearance",this.me),localStorage.me=JSON.stringify(this.me)},updateAppearance:function(e){this.me.name=e.name,this.me.color=e.color,this.$socket.emit("appearance",this.me),this.editing=!1,localStorage.me=JSON.stringify(this.me)},sendMessage:function(e){e.content&&" "!=e.content&&this.$socket.emit("message",e)},constructMessage:function(e){var t=(new Date).getTime(),n={uid:this.me.uid+t,author:this.me.uid,content:e,time:t,color:this.me.color,x:this.me.x,y:this.me.y,deleted:!1,announcement:!1};return n},getConnectedUsers:function(){var e=Object.values(this.users),t=e.filter((function(e){return!0!==e.deleted})),n=t.filter((function(e){return!0===e.connected}));return n},getNotDeletedUsers:function(){var e=Object.values(this.users),t=e.filter((function(e){return!0!==e.deleted}));return t},getNotDeletedMessages:function(){var e=Object.values(this.messages),t=e.filter((function(e){return!0!==e.deleted}));return t},userDBsync:function(){for(var e in Ct.sort((function(e,t){return Object.keys(t).length-Object.keys(e).length})),Ot=Ct[0],Ct.forEach((function(e){for(var t in e)Ot[t]||(Ot[t]=e[t]),e[t].deleted&&(Ot[t].deleted=!0),e[t].name.startsWith("newUser-")||(Ot[t].name=e[t].name)})),Ot){var t=Ot[e];e!==this.me.uid&&this.$set(this.users,e,t)}localStorage.users=JSON.stringify(this.users)},messageDBsync:function(){for(var e in xt.sort((function(e,t){return Object.keys(t).length-Object.keys(e).length})),kt=xt[0],xt.forEach((function(e){for(var t in e)kt[t]||(kt[t]=e[t]),e[t].deleted&&(kt[t].deleted=!0)})),kt){var t=kt[e];this.$set(this.messages,e,t)}localStorage.messages=JSON.stringify(this.messages)},route:function(e,t){var n;if("user"==e){var s=this.findUser(t);s?n=this.getPosition(s):console.log("not found")}else if("territory"==e){var i=this.findTerritory(t);i?n=this.toPixels(i.borders):console.log("not found")}this.scrollTo(n,"smooth")},findTerritory:function(e){return this.islands.find((function(t){return t.name==e}))},findUser:function(e){var t=Object.values(this.users),n=t.find((function(t){return t.name==e}));if(n)return this.users[n.uid]},getUserNames:function(){var e=Object.values(this.users),t=e.filter((function(e){return!0!==e.deleted})),n=t.map((function(e){return e.name}));return n},getUserMessages:function(e){var t=[];for(var n in this.messages){var s=this.messages[n];s.author!=e.uid||s.deleted||t.push(s)}return t},zoomIn:function(){this.scale+=.25;var e={x:(this.scale*this.windowWidth-this.windowLeft)/2,y:(this.scale*this.windowHeight-this.windowTop)/2};this.scrollTo(e)},zoomOut:function(){if(this.scale>1){this.scale-=.25;var e={x:(this.scale*this.windowWidth-this.windowLeft)/2,y:(this.scale*this.windowHeight-this.windowTop)/2};this.scrollTo(e)}},drag:function(e){this.scrollTo({x:this.windowLeft-e.movementX,y:this.windowTop-e.movementY})},centerMe:function(){var e=this;this.scale=5,setTimeout((function(){e.scrollTo(e.getPosition({x:.5,y:.5}),"smooth")}),50)},scrollTo:function(e,t){this.$refs.userlandContainer.scroll({left:e.x,top:e.y,behavior:t||"auto"})},getPosition:function(e){return e=this.toPixels(e),{x:e.x-this.windowWidth/2,y:e.y-this.windowHeight/2}},getCenter:function(e){return e=this.toPixels(e),console.log(e),{x:e.x-e.w/2,y:e.y-e.h/2,w:e.w?e.w:0,h:e.h?e.h:0}},toPixels:function(e){return{x:e.x*this.scale*this.windowWidth,y:e.y*this.scale*this.windowHeight,w:e.w?e.w:0,h:e.h?e.h:0}},randomColor:function(){var e=Math.floor(256*Math.random()),t=Math.floor(256*Math.random()),n=Math.floor(256*Math.random()),s=1,i="rgb(".concat(e,", ").concat(t,", ").concat(n,", ").concat(s,")");return i},getViewerPosition:function(){this.windowLeft=this.$refs.userlandContainer.scrollLeft,this.windowTop=this.$refs.userlandContainer.scrollTop},getWindowSize:function(){this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight},track:function(){var e,t,n,s=this,i=this.$refs.me[0].$refs.Cursor.$refs.input;this.$refs.userlandContainer.addEventListener("keyup",(function(o){if(s.registered&&!s.editing){var r=o.which||o.keyCode;if(i!==document.activeElement&&(i.focus(),r>=48&&r<=90)){var a=String.fromCharCode(r);i.value=a}"~"==i.value?t=!0:"!"==i.value&&(n=!0);var c=s.getUserMessages(s.me),u=c[0],l=c[c.length-1],d=c[c.indexOf(e)-1],h=c[c.indexOf(e)+1];if(38==r)e=e?d||u:l,i.value=e.content,i.select();else if(40==r)e&&h&&(e=h,i.value=e.content,i.select());else if(13==r){var m=s.constructMessage(i.value);n?(m.announcement=!0,n=!1):t&&(m.navigation=!0,s.$router.push(i.value),t=!1),s.sendMessage(m),e=void 0,i.value="",i.placeholder=""}else 27==r&&(i.value="",i.blur());s.updateTyping(i.value)}})),this.$refs.userlandContainer.addEventListener("click",(function(){if(s.registered&&!s.editing){i.focus();var t=s.constructMessage(i.value);s.sendMessage(t),e=void 0,i.value="",i.placeholder=""}}))}}},Tt=St,Pt=(n("1812"),Object($["a"])(Tt,d,h,!1,null,null,null)),Nt=Pt.exports,jt=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},Et=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"blocked"}},[n("div",{staticClass:"message"},[n("p",[e._v("You have been removed.")]),n("p",[e._v("Please reflect on your behaviour.")])])])}],Ut={name:"Nomansland",components:{},props:[],data:function(){return{}},created:function(){},mounted:function(){var e=this.$el,t=window.innerHeight/14,n=window.innerWidth/10,s=this.tableCreate(t,n);e.appendChild(s)},methods:{tableCreate:function(e,t){for(var n=this,s=document.createElement("table"),i=0;i<e;i++)for(var o=s.insertRow(),r=function(e){var t=o.insertCell();t.innerHTML=" ",t.addEventListener("mouseover",(function(){n.repeatXI((function(){t.innerHTML=n.generate_random_string()}),100,10),setTimeout((function(){t.innerHTML=" "}),1050),setTimeout((function(){t.innerHTML=" "}),3e3)}))},a=0;a<t;a++)r(a);return s},generate_random_string:function(){var e=39,t=47,n=Math.floor(Math.random()*(t-e)+e),s=String.fromCharCode(n);return s},repeatXI:function(e,t,n){var s,i;return i=function(){e(),--n||clearInterval(s)},t=t<=0?1e3:t,n=parseInt(n,10)||0,s=setInterval(i,t),!0}}},Dt=Ut,Lt=(n("32a0"),Object($["a"])(Dt,jt,Et,!1,null,"55f17412",null)),zt=Lt.exports,Jt={name:"Home",components:{Mainland:Nt,Nomansland:zt},props:["slug"],data:function(){return{loaded:!1,status:"loading...",isMobile:!!r.$root.isMobile,wantsToView:null,blocked:!1}},created:function(){var e=this;this.$http.get(this.$apiURL+"/hosts").then((function(t){e.hosts=t.data,e.loaded=!0,e.msg="ready."})).catch((function(t){console.log(t),e.msg="there is an error :( contact karl <bonjour@moubarak.eu>"})),this.slug&&this.handleRouting(this.slug)},mounted:function(){var e=this;this.$router.afterEach((function(t){var n=t.fullPath.replace(e.$publicPath,"");e.handleRouting(n)}))},methods:{handleRouting:function(e){var t,n;e.startsWith("~")?t="user":e.startsWith("#")?t="territory":console.log("not found"),n=e.slice(1),n?console.log(n):console.log("no username provided"),this.wantsToView={type:t,name:n}}}},Ht=Jt,Wt=(n("cccb"),Object($["a"])(Ht,u,l,!1,null,null,null)),It=Wt.exports,Vt={name:"App",components:{Home:It},data:function(){return{isMobile:Boolean,slug:window.location.pathname.replace(this.$publicPath,"")}},created:function(){this.CheckForMobile(),window.addEventListener("resize",this.CheckForMobile),c.a.polyfill()},methods:{CheckForMobile:function(){window.innerWidth<=760?(r.$root.isMobile=!0,this.isMobile=!0):(r.$root.isMobile=!1,this.isMobile=!1)}}},Xt=Vt,Rt=(n("034f"),Object($["a"])(Xt,i,o,!1,null,null,null)),Bt=Rt.exports,At=n("8c4f");s["a"].use(At["a"]);var Ft=[{path:"/",name:"Home",component:It}],Yt=new At["a"]({mode:"history",routes:Ft}),Gt=Yt,Zt=n("bc3a"),qt=n.n(Zt),Kt=n("5132"),Qt=n.n(Kt),en=n("8e27"),tn=n.n(en),nn=n("9ce6"),sn=n.n(nn),on=n("0576"),rn=n.n(on);s["a"].prototype.$http=qt.a,s["a"].prototype.$apiURL="https://api.obfuscation.karls.computer",s["a"].prototype.$publicPath="/",s["a"].config.productionTip=!1,sn.a.props.anchorAttributes.default=function(){return{target:"_blank",rel:"noopener noreferrer nofollow"}},s["a"].component("vue-markdown",sn.a),s["a"].use(rn.a);var an=tn()("https://io.karls.computer");s["a"].use(new Qt.a({connection:an})),new s["a"]({router:Gt,render:function(e){return e(Bt)}}).$mount("#app")},"5ced":function(e,t,n){},"5d18":function(e,t,n){},"6f43":function(e,t,n){},7138:function(e,t,n){"use strict";n("31ad")},7483:function(e,t,n){},"85ec":function(e,t,n){},"978f":function(e,t,n){"use strict";n("e911")},"9a7c":function(e,t,n){},"9c60":function(e,t,n){},"9cfc":function(e,t,n){},bb26:function(e,t,n){"use strict";n("12f1")},bd08:function(e,t,n){},be7c:function(e,t,n){"use strict";n("9c60")},c4ca:function(e,t,n){},c918:function(e,t,n){},cccb:function(e,t,n){"use strict";n("5ced")},d219:function(e,t,n){"use strict";n("9cfc")},dda3:function(e,t,n){},e098:function(e,t,n){"use strict";n("293d")},e627:function(e,t,n){},e749:function(e,t,n){"use strict";n("7483")},e911:function(e,t,n){},ec3b:function(e,t,n){"use strict";n("bd08")},ef7e:function(e,t,n){"use strict";n("3407")},f2bb:function(e,t,n){},f5c3:function(e,t,n){"use strict";n("e627")},f7dd:function(e,t,n){},fb59:function(e,t,n){"use strict";n("2d9b")},fd40:function(e,t,n){"use strict";n("dda3")}});
//# sourceMappingURL=app.1a4832db.js.map