(function(e){function t(t){for(var s,i,a=t[0],c=t[1],u=t[2],d=0,m=[];d<a.length;d++)i=a[d],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&m.push(o[i][0]),o[i]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(e[s]=c[s]);l&&l(t);while(m.length)m.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],s=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(s=!1)}s&&(r.splice(t--,1),e=i(i.s=n[0]))}return e}var s={},o={app:0},r=[];function i(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=s,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var l=c;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"0859":function(e,t,n){"use strict";n("3cee")},"0ccf":function(e,t,n){"use strict";n("c4ca")},"101a":function(e,t,n){},"14fc":function(e,t,n){"use strict";n("a6a7")},1812:function(e,t,n){"use strict";n("101a")},"1e36":function(e,t,n){"use strict";n("31f3")},"31ad":function(e,t,n){},"31f3":function(e,t,n){},"32a0":function(e,t,n){"use strict";n("5d18")},3392:function(e,t,n){},"39cd":function(e,t,n){},"3c06":function(e,t,n){"use strict";n("90f0")},"3cd2":function(e,t,n){"use strict";n("9a7c")},"3cee":function(e,t,n){},"46c6":function(e,t,n){"use strict";n("e28d")},4967:function(e,t,n){},"4a60":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var s=n("2b0e"),o=n("bc3a"),r=n.n(o),i=n("9ce6"),a=n.n(i),c=n("f87c"),u=n("8e27"),l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Home",{attrs:{slug:e.slug}})],1)},d=[],m=(n("ac1f"),n("5319"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"home"}},[e.blocked?n("Nomansland"):n("Mainland",{attrs:{wantsToView:e.wantsToView}})],1)}),f=[],g=(n("fb6a"),n("2ca0"),n("2f62")),h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{blur:!e.registered||e.editing},style:e.userColors},[!e.registered||e.editing?n("Editor",{on:{stopEdit:function(t){e.editing=!1}}}):e._e(),n("header",[n("Minimap",{attrs:{dragging:e.dragging,miniDragging:e.miniDragging},on:{startedDrag:function(t){e.miniDragging=!0},stoppedDrag:function(t){e.miniDragging=!1},newPosition:function(t){return e.handleMini(t)},zero:e.centerMe}}),n("Options",{on:{startEdit:function(t){e.editing=!0}}}),n("Userslist",{on:{goTo:function(t){return e.goTo(t)}}})],1),n("div",{ref:"userlandContainer",class:{dragging:e.dragging},attrs:{id:"userlandContainer"},on:{scroll:function(t){return e.setViewerPosition()},keyup:function(t){return e.handleInput(t)},click:function(t){return e.handleClick(t)}}},[n("div",{ref:"userland",style:{height:100*e.scale+"%",width:100*e.scale+"%","--scale":e.scale},attrs:{id:"userland"},on:{mousedown:function(t){t.stopPropagation(),e.dragging=!0},mousemove:function(t){e.dragging&&e.drag(t)},mouseup:function(t){t.stopPropagation(),e.dragging=!1,e.dragRelease()}}},[n("Grid"),e._l(e.notDeletedUsers,(function(t){return n("Cursorr",{key:t.uid,ref:e.isMe(t)?"me":"Users",refInFor:!0,attrs:{user:t,dragging:e.isMe(t)?e.dragging:null}})})),e._l(e.notDeletedMessages,(function(t){return n("Message",{key:t.uid,attrs:{message:t,isMe:t.authorUID===e.me.uid},on:{goTo:function(t){e.goTo(e.userByName(t))}}})})),e._l(e.territories,(function(e){return n("Territory",{key:e.name,attrs:{name:e.name,borders:e.borders}})}))],2)])],1)},p=[],v=(n("99af"),n("b0c0"),n("5530")),b=n("8a77"),y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("table",{class:{hidden:!e.$store.state.grid},attrs:{id:"grid"}},[n("tbody",e._l(e.scale*e.definition,(function(t){return n("Row",{key:t,attrs:{x:e.scale*e.definition}})})),1)])},w=[],_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("tr",e._l(e.x,(function(e){return n("Cell",{key:e})})),1)},O=[],C=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("td")},$=[],x={name:"Cell"},k=x,M=(n("7138"),n("2877")),j=Object(M["a"])(k,C,$,!1,null,"825c3c98",null),S=j.exports,P={name:"Row",components:{Cell:S},props:["x"]},T=P,U=Object(M["a"])(T,_,O,!1,null,"4ed0d323",null),D=U.exports,N={name:"Table",components:{Row:D},data:function(){return{scale:10,definition:10}}},E=N,z=(n("e587"),Object(M["a"])(E,y,w,!1,null,"064a8918",null)),B=z.exports,I=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"registerContainer"}},[n("div",{attrs:{id:"register"}},[e.registered?e._e():n("div",{staticClass:"introText"},[n("h3",[e._v("Welcome.")]),n("p",[e._v("To join the conversation, please pick a display name and color. You can change these later.")])]),n("div",{staticClass:"form"},[n("input",{ref:"name",attrs:{type:"text",placeholder:"pick a display name"}}),e.invalid||e.tooshort||e.inuse?n("p",{staticClass:"error"},[e._v(" "+e._s(e.invalid?"Your display name cannot contain any spaces or special characters.":e.tooshort?"Your display name must contain at least 3 characters.":e.inuse?"This name has already been taken by someone else.":null)+" ")]):e._e(),n("input",{ref:"color",attrs:{type:"text","data-jscolor":""},on:{input:e.updateColor}}),n("input",{ref:"submit",attrs:{type:"button",value:"save"},on:{click:function(t){return t.stopPropagation(),e.save()}}})]),e.registered?e._e():n("div",{staticClass:"introText"},[n("p",[e._v("This site does not use cookies. The information you are entering is stored in your browser and sent to all the other users.")])])])])},L=[],X=(n("c975"),n("4d63"),n("25f0"),n("881d")),J=n.n(X),A={name:"Editor",data:function(){return{invalid:!1,tooshort:!1,inuse:!1,colorPickerOpts:{format:"rgba",previewPosition:"right",previewSize:30,borderRadius:0,padding:0,controlBorderColor:"rgba(255,255,255,0)",sliderSize:13,shadow:!1}}},computed:Object(v["a"])(Object(v["a"])({},Object(g["e"])(["registered"])),Object(g["c"])(["me","userNames"])),mounted:function(){var e=this;J.a.presets.default=this.colorPickerOpts,this.$refs.color.value=this.me.color,J.a.init(),this.registered&&(this.$refs.name.value=this.me.name,this.$refs.name.select()),this.$nextTick((function(){e.registered&&new J.a(e.$refs.color)}))},methods:{save:function(){var e=this.$refs.name.value,t=this.$refs.color.value;this.validateChars(e)?this.validateLength(e)?this.existingUser(e)?this.inuse=!0:this.register(e,t):this.tooshort=!0:this.invalid=!0},cancel:function(){this.$emit("stopEdit")},register:function(e,t){this.$store.dispatch("updateSelf",{name:e,color:t}),this.$emit("stopEdit")},updateColor:function(){this.$store.dispatch("updateSelfAppearance",{color:this.$refs.color.value})},validateChars:function(e){return/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(e)},validateLength:function(e){return e.length>2},existingUser:function(e){return this.userNames.indexOf(e)>-1&&e!==this.me.name},toSlug:function(e){e=e.replace(/^\s+|\s+$/g,""),e=e.toLowerCase();for(var t="àáäâèéëêìíïîòóöôùúüûñç·/_,:;",n="aaaaeeeeiiiioooouuuunc------",s=0,o=t.length;s<o;s++)e=e.replace(new RegExp(t.charAt(s),"g"),n.charAt(s));return e=e.replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-"),e}}},V=A,R=(n("46c6"),Object(M["a"])(V,I,L,!1,null,"19ab4d74",null)),H=R.exports,F=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{hovered:e.hovered||e.dragging},style:{height:e.height+"px",width:e.width+"px"},attrs:{id:"minimap"},on:{mouseover:function(t){e.hovered=!0},mouseout:function(t){e.hovered=!1},mousedown:function(t){return e.mouseDown(t)},mousemove:function(t){return e.mouseMove(t)},mouseup:function(t){return e.mouseUp(t)}}},[e._l(e.users,(function(e){return n("Cursorr",{key:e.uid,attrs:{user:e}})})),e._l(e.messages,(function(t){return n("Message",{key:t.uid,attrs:{message:t,hovered:e.hovered,dragging:e.dragging}})})),e._l(e.territories,(function(e){return n("Territory",{key:e.name,attrs:{name:e.name,borders:e.borders}})})),n("Window",{attrs:{id:"viewport",width:e.width/e.scale,height:e.height/e.scale,left:e.left/e.scale,top:e.top/e.scale}}),n("div",{staticClass:"zoom"},[n("div",{staticClass:"in",on:{mousedown:function(t){return t.stopPropagation(),e.$store.commit("zoomIn")},mouseup:function(e){e.stopPropagation()}}},[e._v("+")]),n("div",{staticClass:"out",on:{mousedown:function(t){return t.stopPropagation(),e.$store.commit("zoomOut")},mouseup:function(e){e.stopPropagation()}}},[e._v("-")]),n("div",{staticClass:"zero",on:{mousedown:function(t){return t.stopPropagation(),e.$emit("zero")},mouseup:function(e){e.stopPropagation()}}},[e._v("○")])])],2)},Y=[],W=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"cursor",style:{left:100*e.user.x-.1+"%",top:100*e.user.y-.2+"%","--scale":3,"--userColor":"var(--"+e.user.uid+")"}})},G=[],Z={name:"Cursorr",props:["user"]},q=Z,K=(n("73ff"),Object(M["a"])(q,W,G,!1,null,"4072ab17",null)),Q=K.exports,ee=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:["minimessage",{clear:e.hovered||e.dragging}],style:{left:e.toNearestX(e.message.x,.4)+"%",top:e.toNearestX(e.message.y,.4)+"%",width:e.message.content.length/2+"px","--userColor":"var(--"+e.message.authorUID+")"}})},te=[],ne={name:"Message",props:["message","hovered","dragging"],methods:{toNearestX:function(e,t){return Math.floor(100*e/t)*t}}},se=ne,oe=(n("0ccf"),Object(M["a"])(se,ee,te,!1,null,null,null)),re=oe.exports,ie=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"miniterritory",style:{left:e.toNearestX(e.borders.x,.4)+"%",top:e.toNearestX(e.borders.y,.4)+"%",width:"20%",height:"20%"},attrs:{id:"mini-"+e.name}},[n("div",{staticClass:"box"})])},ae=[],ce={name:"Territory",props:["name","borders"],methods:{toNearestX:function(e,t){return Math.floor(100*e/t)*t}}},ue=ce,le=(n("3cd2"),Object(M["a"])(ue,ie,ae,!1,null,null,null)),de=le.exports,me=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{style:{width:e.width+"px",height:e.height+"px",left:e.left+"px",top:e.top+"px"}})},fe=[],ge={name:"Window",props:["width","height","left","top"]},he=ge,pe=(n("14fc"),Object(M["a"])(he,me,fe,!1,null,"66383846",null)),ve=pe.exports,be={name:"Map",components:{Cursorr:Q,Message:re,Territory:de,Window:ve},props:["dragging","miniDragging"],data:function(){return{hovered:!1}},computed:Object(v["a"])(Object(v["a"])({},Object(g["e"])({territories:function(e){return e.territories},left:function(e){return e.windowPos.x/5},top:function(e){return e.windowPos.y/5},width:function(e){return e.windowSize.w/5},height:function(e){return e.windowSize.h/5},scale:function(e){return e.scale},zoomIndex:function(e){return 5*e.scale}})),Object(g["c"])({users:"notDeletedUsers",messages:"notDeletedMessages"})),methods:{mouseDown:function(e){this.sendDesiredPosition(e),this.$emit("startedDrag")},mouseMove:function(e){this.miniDragging&&this.sendDesiredPosition(e)},mouseUp:function(e){this.$emit("stoppedDrag"),this.sendDesiredPosition(e)},sendDesiredPosition:function(e){var t=e.pageX-this.$el.offsetLeft,n=this.width/(2*this.scale),s=(t-n)*this.zoomIndex,o=e.pageY-this.$el.offsetTop,r=this.height/(2*this.scale),i=(o-r)*this.zoomIndex;this.$emit("newPosition",{x:s,y:i})}}},ye=be,we=(n("baa9"),Object(M["a"])(ye,F,Y,!1,null,"0fd4dadf",null)),_e=we.exports,Oe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"options"}},[n("span",{staticClass:"title"},[e._v(" options ")]),n("div",{staticClass:"grid"},[n("input",{attrs:{type:"button",value:e.grid?"hide grid":"show grid"},on:{click:function(t){return t.stopPropagation(),e.toggleGrid(t)}}})]),n("div",{staticClass:"edituser"},[n("input",{attrs:{type:"button",value:"edit appearance"},on:{click:function(t){return t.stopPropagation(),e.$emit("startEdit")}}})]),n("div",{staticClass:"storage"},[n("input",{attrs:{type:"button",value:"delete me"},on:{click:function(t){return t.stopPropagation(),e.deleteSelf(t)}}})]),n("div",{staticClass:"db"},[n("input",{attrs:{type:"button",value:"delete everything"},on:{click:function(t){return t.stopPropagation(),e.$socket.client.emit("clearDBs")}}})])])},Ce=[],$e={name:"Options",computed:Object(v["a"])({},Object(g["e"])(["grid"])),methods:Object(v["a"])(Object(v["a"])({},Object(g["d"])(["toggleGrid"])),Object(g["b"])(["deleteSelf"]))},xe=$e,ke=(n("3c06"),Object(M["a"])(xe,Oe,Ce,!1,null,"0ac6b586",null)),Me=ke.exports,je=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{moderating:e.moderating},attrs:{id:"userlistContainer"}},[n("div",{attrs:{id:"userlist"}},[n("span",{staticClass:"title"},[n("span",[e._v("participants")]),n("div",{attrs:{id:"moderate"}},[n("span",{staticClass:"moderateButton",on:{click:function(t){e.moderating?e.moderating=!1:e.moderator?e.moderating=!0:e.authenticating?e.authenticating=!1:e.authenticating=!0}}},[e.moderating?n("span",[e._v("—")]):n("span",[e._v("M")])]),e.authenticating?n("input",{ref:"password",attrs:{type:"password",name:"moderator",placeholder:"moderator password",autofocus:""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.authenticate()}}}):e._e()])]),n("ul",e._l(e.connectedUsersFirst,(function(t){return n("Label",{key:t.uid,attrs:{user:t,isMe:t.uid===e.me.uid,moderating:e.moderating,messages:e.messagesByUser(t)},on:{goTo:function(t){return e.$emit("goTo",t)}},nativeOn:{click:function(n){return n.stopPropagation(),e.$emit("goTo",t)}}})})),1)])])},Se=[],Pe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",{class:["userLabel",e.user.uid],style:{"--userColor":"var(--"+e.user.uid+")"},on:{mouseover:function(t){t.stopPropagation(),e.hovered=!0},mouseleave:function(t){t.stopPropagation(),e.hovered=!1}}},[n("span",{staticClass:"bullet"},[e._v(" ● ")]),n("span",{staticClass:"name"},[e._v(" "+e._s(e.isMe?"me":e.user.name)+" ")]),e.moderating?n("div",{staticClass:"moderatorOptions"},[n("span",{staticClass:"messages",on:{click:function(t){t.stopPropagation(),e.messagesVisible=!e.messagesVisible}}},[e._v("messages")]),n("span",{staticClass:"delete",on:{click:function(t){return t.stopPropagation(),e.$store.dispatch("deleteUser",e.user)}}},[e._v("delete")])]):e._e(),n("span",{staticClass:"goto"},[e._v(" "+e._s(e.hovered?"→":""))]),e.moderating&&e.messagesVisible?n("div",{staticClass:"messageListContiner"},[e.messages.length>0?n("ul",{staticClass:"messageList"},e._l(e.messages,(function(t){return n("MessageOptions",{key:t.uid,attrs:{message:t},nativeOn:{click:function(n){return n.stopPropagation(),e.$emit("goTo",t)}}})})),1):n("p",[e._v("This user has no messaages.")])]):e._e()])},Te=[],Ue=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:["miniMessageContainer",{hover:e.hovered}],on:{mouseover:function(t){e.hovered=!0},mouseleave:function(t){e.hovered=!1}}},[n("span",{staticClass:"message"},[e._v(" "+e._s(e.message.content)+" ")]),n("span",{staticClass:"time"},[e._v(" "+e._s(e.format(e.message.time))+" ")]),n("span",{staticClass:"delete",on:{click:function(t){return t.stopPropagation(),e.deleteMessage(e.message)}}},[e._v("delete")]),e.message.censored?n("span",{staticClass:"delete",on:{click:function(t){return t.stopPropagation(),e.censorMessage(e.message)}}},[e._v("uncensor")]):n("span",{staticClass:"delete",on:{click:function(t){return t.stopPropagation(),e.censorMessage(e.message)}}},[e._v("censor")]),n("span",{staticClass:"goto"},[e._v(" "+e._s(e.hovered?"→":""))])])},De=[],Ne=n("f817"),Ee={name:"MessageOptions",components:{},props:["message"],data:function(){return{now:(new Date).getTime(),hovered:!1}},mounted:function(){},methods:Object(v["a"])(Object(v["a"])({},Object(g["b"])(["deleteMessage","censorMessage"])),{},{format:function(e){return Object(Ne["a"])(e).format("MMM Do @ HH:mm:ss ")}})},ze=Ee,Be=(n("dcd8"),Object(M["a"])(ze,Ue,De,!1,null,"1c25b57c",null)),Ie=Be.exports,Le={name:"Label",components:{MessageOptions:Ie},props:["isMe","user","messages","moderating"],data:function(){return{hovered:!1,messagesVisible:!1}},mounted:function(){},methods:{}},Xe=Le,Je=(n("9356"),Object(M["a"])(Xe,Pe,Te,!1,null,"0cb83185",null)),Ae=Je.exports,Ve={name:"List",components:{Label:Ae},props:[],data:function(){return{moderator:!1,authenticating:!1,moderating:!1}},computed:Object(v["a"])({},Object(g["c"])({me:"me",users:"notDeletedUsers",messages:"notDeletedMessages",messagesByUser:"messagesByUser",connectedUsersFirst:"connectedUsersFirst"})),mounted:function(){},sockets:{},methods:{authenticate:function(){var e=this.$refs.password.value;"0000"===e&&(this.moderator=!0,this.authenticating=!1,this.moderating=!0)}}},Re=Ve,He=(n("bfb7"),Object(M["a"])(Re,je,Se,!1,null,"236d6910",null)),Fe=He.exports,Ye=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:["cursorContainer",{hovered:e.user.typing||e.hovered,dragging:e.dragging}],style:{left:100*e.user.x-.1+"%",top:100*e.user.y-.2+"%","--scale":15,"--userColor":"var(--"+e.user.uid+")"},on:{mouseover:function(t){e.hovered=!0},mouseout:function(t){e.hovered=!1}}},[e.isMe(e.user)?n("input",{ref:"input",staticClass:"input",attrs:{type:"text",placeholder:"type message & press enter",autofocus:""}}):n("span",{staticClass:"input"},[e._v(" "+e._s(e.user.typing)+" ")]),n("div",{staticClass:"cursor"},[e.user.typing||e.hovered?n("span",{staticClass:"name"},[e._v(" "+e._s(e.isMe(e.user)?"me":e.user.connected?e.user.name:e.user.name+" (offline)")+" ")]):e._e()])])},We=[],Ge={name:"Cursorr",props:{user:Object,dragging:Boolean},data:function(){return{hovered:!1,current:String,navigation:!1,announcement:!1}},computed:Object(v["a"])(Object(v["a"])({},Object(g["e"])(["scale","windowSize","windowPos"])),Object(g["c"])(["me","isMe","messagesByUser"])),mounted:function(){this.isMe&&this.trackCursor()},methods:{updateTyping:function(e){this.$store.dispatch("updateSelfAppearance",{typing:e})},sendMessage:function(){var e=this.$refs.input,t=this.constructMessage(e.value);e.focus(),this.announcement?(t.announcement=!0,this.announcement=!1):this.navigation&&(t.navigation=!0,this.$router.push(e.value),this.navigation=!1),t.content&&" "!=t.content&&this.$socket.client.emit("message",t),this.current=null,e.value="",e.placeholder=""},constructMessage:function(e){var t=(new Date).getTime(),n={uid:this.me.uid+t,author:this.me.name,authorUID:this.me.uid,content:e,time:t,color:this.me.color,x:this.me.x,y:this.me.y,deleted:!1,censored:!1,announcement:!1};return n},trackCursor:function(){var e=this;document.addEventListener("mousemove",(function(t){e.$store.dispatch("updateSelfAppearance",{x:(e.windowPos.x+t.clientX)/(e.windowSize.w*e.scale),y:(e.windowPos.y+t.clientY)/(e.windowSize.h*e.scale),connected:!0}),t.preventDefault()}))},trackInput:function(e){var t=this.$refs.input,n=e.which||e.keyCode;if(t!==document.activeElement&&(t.focus(),n>=48&&n<=90)){var s=String.fromCharCode(n);t.value=s}"~"==t.value?this.navigation=!0:"!"==t.value&&(this.announcement=!0);var o=this.messagesByUser(this.me),r=o[0],i=o[o.length-1],a=o[o.indexOf(this.current)-1],c=o[o.indexOf(this.current)+1];38==n?(this.current?this.current=a||r:this.current=i,t.value=this.current.content,t.select()):40==n?(this.current&&c&&(this.current=c),t.value=this.current.content,t.select()):13==n?this.sendMessage():27==n&&(t.value="",t.blur()),this.updateTyping(t.value)}}},Ze=Ge,qe=(n("0859"),Object(M["a"])(Ze,Ye,We,!1,null,"422b3fcd",null)),Ke=qe.exports,Qe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return!e.message.navigation&&e.message.uid?n("div",{class:["messageContainer",{hover:e.hovered,announcement:e.message.announcement}],style:{left:e.toNearestX(e.message.x,.4)+"%",top:e.toNearestX(e.message.y,.4)+"%","--blur":"blur("+(e.now-e.message.time)/1e8+"px)","--userColor":"var(--"+e.message.authorUID+")"},attrs:{id:e.message.uid},on:{mouseover:function(t){e.hovered=!0},mouseleave:function(t){e.hovered=!1}}},[e.message.censored?n("div",{staticClass:"message censored"},[e._v(" This message has been censored by a moderator. ")]):n("vue-markdown",{staticClass:"message"},[e._v(" "+e._s(e.message.content)+" ")]),n("div",{staticClass:"details"},[n("span",[e._v(" — ")]),n("span",{staticClass:"author",on:{click:function(t){return t.stopPropagation(),e.$emit("goTo",e.message.author)}}},[e._v(e._s(e.message.author))]),n("span",{staticClass:"time"},[e._v(", "+e._s(e.fromNow(e.message.time)))]),e.isMe?n("span",[e._v(" ● ")]):e._e(),e.isMe?n("span",{staticClass:"delete",on:{click:function(t){return t.stopPropagation(),e.deleteMessage(e.message)}}},[e._v("delete")]):e._e()])],1):e._e()},et=[],tt={name:"Message",components:{},props:["isMe","message"],data:function(){return{now:(new Date).getTime(),hovered:!1}},mounted:function(){},methods:Object(v["a"])(Object(v["a"])({},Object(g["b"])(["deleteMessage"])),{},{fromNow:function(e){return Object(Ne["a"])(e).fromNow()},toNearestX:function(e,t){return Math.floor(100*e/t)*t}})},nt=tt,st=(n("fd40"),Object(M["a"])(nt,Qe,et,!1,null,null,null)),ot=st.exports,rt=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"territory",style:{left:e.toNearestX(e.borders.x,.4)+"%",top:e.toNearestX(e.borders.y,.4)+"%",width:"20%",height:"20%"},attrs:{id:e.name}},[n("Island",{attrs:{name:e.name,content:e.content},on:{more:function(t){e.$router.push("#"+e.name),e.more=!0}}}),n("Overlay",{class:{hidden:!e.more},attrs:{content:e.content},on:{less:function(t){e.more=!1}}})],1)},it=[],at=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"island",style:{width:"20%",height:"40%"}},[n("div",{staticClass:"header"},[n("h1",{staticClass:"title",on:{click:function(t){return e.$router.push("#"+e.name)}}},[e._v(" "+e._s(e.content.Title)+" ")]),n("h1",{staticClass:"more",on:{click:function(t){return t.stopPropagation(),e.$emit("more")}}},[e._v("+")])]),n("div",{staticClass:"body"},[n("vue-markdown",{attrs:{source:e.content.Body}})],1)])},ct=[],ut={name:"Island",components:{},props:["name","content"],data:function(){return{}},computed:{},created:function(){},methods:{}},lt=ut,dt=(n("ff49"),Object(M["a"])(lt,at,ct,!1,null,"2319eefc",null)),mt=dt.exports,ft=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"overlayContainer",on:{scroll:function(e){e.stopPropagation()},mousedown:function(e){e.stopPropagation()},mouseup:function(e){e.stopPropagation()}}},[n("div",{staticClass:"overlay"},[n("span",{staticClass:"close",on:{click:function(t){return t.stopPropagation(),e.$emit("less")}}},[e._v("✕")]),e._l(e.sections,(function(e){return n("Section",{key:e.id,attrs:{section:e}})}))],2)])},gt=[],ht=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",[n("div",{staticClass:"header"},[n("h3",{staticClass:"subtitle"},[e._v(" "+e._s(e.section.Subtitle)+" ")]),n("h1",{staticClass:"title"},[e._v(" "+e._s(e.section.Title)+" ")])]),n("div",{staticClass:"body"},[n("vue-markdown",{attrs:{source:e.section.Body}})],1)])},pt=[],vt={name:"Section",props:["section"],data:function(){return{}},created:function(){}},bt=vt,yt=(n("c91c"),Object(M["a"])(bt,ht,pt,!1,null,"8202132c",null)),wt=yt.exports,_t={name:"Overlay",components:{Section:wt},props:["content"],data:function(){return{sections:[]}},created:function(){var e=this;this.content.sections||this.$http.get("".concat(this.$apiURL,"/about")).then((function(t){e.sections=t.data.Sections})).catch((function(e){console.log(e)}))}},Ot=_t,Ct=(n("e224"),Object(M["a"])(Ot,ft,gt,!1,null,"4bdf4cac",null)),$t=Ct.exports,xt={name:"Territory",components:{Island:mt,Overlay:$t},props:["name","borders"],data:function(){return{content:{},more:!1}},computed:{},created:function(){var e=this;this.$http.get("".concat(this.$apiURL,"/").concat(this.name)).then((function(t){e.content=t.data})).catch((function(e){console.log(e)}))},methods:{toNearestX:function(e,t){return Math.floor(100*e/t)*t}}},kt=xt,Mt=(n("8ad3"),Object(M["a"])(kt,rt,it,!1,null,"da1abb56",null)),jt=Mt.exports,St={name:"Mainland",components:{Grid:B,Minimap:_e,Options:Me,Userslist:Fe,Cursorr:Ke,Message:ot,Territory:jt,Editor:H},props:{wantsToView:Object},data:function(){return{editing:!1,scrolling:!1,dragging:!1,miniDragging:!1,movement:{}}},computed:Object(v["a"])(Object(v["a"])({},Object(g["e"])(["registered","visited","blocked","users","messages","territories","scale","windowPos"])),Object(g["c"])(["me","isMe","territoryByName","userByName","userColors","notDeletedUsers","notDeletedMessages","positionOf","pixelsFrom"])),watch:{wantsToView:function(e){this.route(e)}},created:function(){var e,t,n;localStorage.me?(this.$store.commit("register"),e=JSON.parse(localStorage.me),e.deleted&&this.$store.commit("block")):localStorage.uid?(this.$store.commit("visit"),e={uid:localStorage.uid,color:localStorage.color}):(e={uid:Object(b["a"])(),connected:!1,name:"newUser-"+Object(b["a"])(),color:this.randomColor(),x:0,y:0,typing:null},localStorage.uid=e.uid,localStorage.color=e.color),this.$store.commit("setUID",e.uid),this.$store.commit("setUser",e),localStorage.users&&(t=JSON.parse(localStorage.users),this.$store.commit("setUsers",t)),localStorage.messages&&(n=JSON.parse(localStorage.messages),this.$store.commit("setMessages",n))},mounted:function(){var e=this;this.blocked||(this.wantsToView?this.route(this.wantsToView):setTimeout((function(){e.scrollTo(e.pixelsFrom(e.territories[0].borders),"smooth")}),50))},sockets:{message:function(e){var t=JSON.parse(e);t.announcement&&this.scrollTo(this.positionOf(t),"smooth")}},methods:{route:function(e){var t,n=e.type,s=e.name;if("user"==n){var o=this.userByName(s);o?t=this.positionOf(o):console.log("not found")}else if("territory"==n){var r=this.territoryByName(s);r?t=this.pixelsFrom(r.borders):console.log("not found")}this.scrollTo(t,"smooth")},handleInput:function(e){this.editing||this.$refs.me[0].trackInput(e)},handleClick:function(){this.editing||this.dragging||this.$refs.me[0].sendMessage()},handleMini:function(e){this.scrollTo(e,this.miniDragging?"auto":"smooth")},centerMe:function(){var e=this;this.$store.commit("zero"),setTimeout((function(){e.goTo({x:.5,y:.5})}),50)},goTo:function(e){this.scrollTo(this.positionOf(e),"smooth")},drag:function(e){var t={x:this.windowPos.x-e.movementX,y:this.windowPos.y-e.movementY};this.scrollTo(t),this.movement={x:t.x,y:t.y,extraX:10*e.movementX,extraY:10*e.movementY}},dragRelease:function(){Math.abs(this.movement.extraX)>0&&(this.scrollTo({x:this.movement.x-this.movement.extraX,y:this.movement.y-this.movement.extraY},"smooth"),this.movement.extraX-=.1,this.movement.extraY-=.1)},scrollTo:function(e,t){this.$refs.userlandContainer.scroll({left:e.x,top:e.y,behavior:t||"auto"})},setViewerPosition:function(){this.$store.commit("viewerPosition",{x:this.$refs.userlandContainer.scrollLeft,y:this.$refs.userlandContainer.scrollTop})},randomColor:function(){var e=Math.floor(256*Math.random()),t=Math.floor(256*Math.random()),n=Math.floor(256*Math.random()),s=1;return"rgb(".concat(e,", ").concat(t,", ").concat(n,", ").concat(s,")")}}},Pt=St,Tt=(n("1812"),Object(M["a"])(Pt,h,p,!1,null,null,null)),Ut=Tt.exports,Dt=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},Nt=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"blocked"}},[n("div",{staticClass:"message"},[n("p",[e._v("You have been removed.")]),n("p",[e._v("Please reflect on your behaviour.")])])])}],Et={name:"Nomansland",components:{},props:[],data:function(){return{}},created:function(){},mounted:function(){var e=this.$el,t=window.innerHeight/14,n=window.innerWidth/10,s=this.tableCreate(t,n);e.appendChild(s)},methods:{tableCreate:function(e,t){for(var n=this,s=document.createElement("table"),o=0;o<e;o++)for(var r=s.insertRow(),i=function(e){var t=r.insertCell();t.innerHTML=" ",t.addEventListener("mouseover",(function(){n.repeatXI((function(){t.innerHTML=n.generate_random_string()}),100,10),setTimeout((function(){t.innerHTML=" "}),1050),setTimeout((function(){t.innerHTML=" "}),3e3)}))},a=0;a<t;a++)i(a);return s},generate_random_string:function(){var e=39,t=47,n=Math.floor(Math.random()*(t-e)+e),s=String.fromCharCode(n);return s},repeatXI:function(e,t,n){var s,o;return o=function(){e(),--n||clearInterval(s)},t=t<=0?1e3:t,n=parseInt(n,10)||0,s=setInterval(o,t),!0}}},zt=Et,Bt=(n("32a0"),Object(M["a"])(zt,Dt,Nt,!1,null,"55f17412",null)),It=Bt.exports,Lt={name:"Home",components:{Mainland:Ut,Nomansland:It},props:{slug:String},data:function(){return{wantsToView:null}},computed:Object(g["e"])(["version","blocked"]),created:function(){console.log("Version: ".concat(localStorage.version)),localStorage.version!=this.version&&(console.log("this version is outdated, clearing your storage."),localStorage.clear(),localStorage.version=this.version),this.slug&&this.handleRouting(this.slug)},mounted:function(){var e=this;this.$router.afterEach((function(t){var n=t.fullPath.replace(e.$publicPath,"");e.handleRouting(n)}))},methods:{handleRouting:function(e){var t,n;e.startsWith("~")?t="user":e.startsWith("#")?t="territory":console.log("not found"),n=e.slice(1),n?console.log(n):console.log("no username provided"),this.wantsToView={type:t,name:n}}}},Xt=Lt,Jt=(n("1e36"),Object(M["a"])(Xt,m,f,!1,null,"48b34c04",null)),At=Jt.exports,Vt={name:"App",components:{Home:At},data:function(){return{slug:window.location.pathname.replace(this.$publicPath,"")}},created:function(){var e=this;window.addEventListener("resize",(function(){e.$store.commit("resize",{w:window.innerWidth,h:window.innerHeight})}))},methods:{}},Rt=Vt,Ht=(n("034f"),Object(M["a"])(Rt,l,d,!1,null,null,null)),Ft=Ht.exports,Yt=n("8c4f");s["a"].use(Yt["a"]);var Wt=[{path:"/",name:"Home",component:At}],Gt=new Yt["a"]({mode:"history",routes:Wt}),Zt=Gt,qt=(n("4de4"),n("7db0"),n("4160"),n("d81d"),n("b64b"),n("07ac"),n("2ef0")),Kt=n.n(qt);s["a"].use(g["a"]);var Qt=[],en={},tn=[],nn={},sn=new g["a"].Store({strict:!1,state:{version:6,save:!0,uid:null,registered:!1,visited:!1,blocked:!1,users:{},messages:{},territories:[{name:"center",borders:{x:.4,y:.4}}],scale:5,grid:!0,windowSize:{w:window.innerWidth,h:window.innerHeight},windowPos:{x:null,y:null}},mutations:{doNotSave:function(e){return e.save=!1},setUID:function(e,t){return e.uid=t},register:function(e){return e.registered=!0},visit:function(e){return e.visited=!0},block:function(e){return e.blocked=!0},setUsers:function(e,t){return e.users=t},setUser:function(e,t){s["a"].set(e.users,t.uid,t)},setMessages:function(e,t){return e.messages=t},setMessage:function(e,t){s["a"].set(e.messages,t.uid,t)},zero:function(e){return e.scale=5},zoomIn:function(e){return e.scale+=.25},zoomOut:function(e){return e.scale>1?e.scale-=.25:null},toggleGrid:function(e){return e.grid=!e.grid},resize:function(e,t){return e.windowSize=t},viewerPosition:function(e,t){return e.windowPos=t}},actions:{socket_connect:function(e){var t=e.state,n=e.commit;t.users[t.uid].deleted||(n("setUser",t.users[t.uid]),this._vm.$socket.client.emit("user",t.users[t.uid]))},socket_user:function(e,t){var n=e.state,s=e.commit,o=e.dispatch,r=JSON.parse(t);r.uid!==n.uid?s("setUser",r):!0===r.deleted&&(o("deleteUser",r),localStorage.me=JSON.stringify(n.users[n.uid]),window.location.reload(!0)),this._vm.$socket.client.emit("users",n.users),this._vm.$socket.client.emit("messages",n.messages)},socket_users:function(e,t){var n=e.dispatch,s=JSON.parse(t);Qt.push(s),console.log("Syncing ".concat(Qt.length," user DBs.")),n("userDBsync")},socket_message:function(e,t){var n=e.state,s=e.commit,o=JSON.parse(t);s("setMessage",o),this._vm.$socket.client.emit("messages",n.messages)},socket_messages:function(e,t){var n=e.dispatch,s=JSON.parse(t);tn.push(s),console.log("Syncing ".concat(tn.length," message DBs.")),n("messageDBsync")},socket_appearance:function(e,t){var n=e.state,s=e.commit,o=JSON.parse(t);o.uid!==n.uid&&(s("setUser",o),localStorage.users=JSON.stringify(n.users))},socket_disconnect:function(e){var t=e.state,n=e.commit;if(t.save)for(var s in localStorage.me=JSON.stringify(t.users[t.uid]),t.users){var o=Object(v["a"])({},t.users[s]);o.connected=!1,n("setUser",o)}localStorage.users=JSON.stringify(t.users),localStorage.messages=JSON.stringify(t.messages)},socket_clearDBs:function(e){var t=e.commit;t("setUsers",{}),t("setMessages",{}),localStorage.clear(),window.location.reload(!0)},updateSelf:function(e,t){var n=e.state,s=e.commit,o=n.users[n.uid],r=Object(v["a"])(Object(v["a"])({},o),t);s("setUser",r),s("register"),this._vm.$socket.client.emit("user",r),localStorage.me=JSON.stringify(r)},updateSelfAppearance:function(e,t){var n=e.state,s=e.commit,o=n.users[n.uid],r=Object(v["a"])(Object(v["a"])({},o),t);s("setUser",r),this._vm.$socket.client.emit("appearance",r)},deleteUser:function(e,t){var n=e.state,s=e.commit,o=e.dispatch,r=Object(v["a"])({},n.users[t.uid]);for(var i in r.deleted=!0,s("setUser",r),this._vm.$socket.client.emit("user",r),n.messages){var a=n.messages[i];a.authorUID==t.uid&&o("deleteMessage",a)}},deleteSelf:function(e){var t=e.state,n=e.commit,s=e.dispatch;n("doNotSave"),s("deleteUser",t.users[t.uid]),localStorage.clear(),window.location.reload(!0)},deleteMessage:function(e,t){var n=e.state,s=e.commit,o=Object(v["a"])({},n.messages[t.uid]);o.deleted=!0,s("setMessage",o),this._vm.$socket.client.emit("message",o)},censorMessage:function(e,t){var n=e.state,s=e.commit,o=Object(v["a"])({},n.messages[t.uid]);o.censored=!n.messages[t.uid].censored,s("setMessage",o),this._vm.$socket.client.emit("message",o)},userDBsync:function(e){var t=e.state,n=e.commit;for(var s in Qt.sort((function(e,t){return Object.keys(t).length-Object.keys(e).length})),en=Kt.a.cloneDeep(Qt[0]),Qt.forEach((function(e){for(var t in e)en[t]||(en[t]=e[t]),e[t].deleted&&(en[t].deleted=!0),e[t].name.startsWith("newUser-")||(en[t].name=e[t].name)})),en){var o=en[s];s!==t.uid&&n("setUser",o)}localStorage.users=JSON.stringify(t.users)},messageDBsync:function(e){var t=e.state,n=e.commit;for(var s in tn.sort((function(e,t){return Object.keys(t).length-Object.keys(e).length})),nn=Kt.a.cloneDeep(tn[0]),tn.forEach((function(e){for(var t in e)nn[t]||(nn[t]=e[t]),e[t].deleted&&(nn[t].deleted=!0),e[t].censored&&(nn[t].censored=!0)})),nn){var o=nn[s];n("setMessage",o)}localStorage.messages=JSON.stringify(t.messages)}},getters:{me:function(e){return e.users[e.uid]},isMe:function(e){return function(t){return t.uid===e.uid}},userByName:function(e,t){return function(n){var s=t.usersArray.find((function(e){return e.name==n}));if(s)return e.users[s.uid]}},territoryByName:function(e){return function(t){return e.territories.find((function(e){return e.name==t}))}},messagesByUser:function(e){return function(t){var n=[];for(var s in e.messages){var o=e.messages[s];o.authorUID!=t.uid||o.deleted||n.push(o)}return n}},userColors:function(e){var t={};for(var n in e.users){var s=e.users[n];t["--".concat(n)]=s.connected?s.color:"lightgrey"}return t},userNames:function(e,t){return t.notDeletedUsers.map((function(e){return e.name}))},connectedUsers:function(e,t){return t.notDeletedUsers.filter((function(e){return!0===e.connected}))},connectedUsersFirst:function(e,t){return t.notDeletedUsers.sort((function(e,t){return e.connected===t.connected?0:e.connected?-1:1}))},notDeletedUsers:function(e,t){return t.usersArray.filter((function(e){return!0!==e.deleted}))},notDeletedMessages:function(e,t){return t.messagesArray.filter((function(e){return!0!==e.deleted&&e.uid}))},usersArray:function(e){return Object.values(e.users)},messagesArray:function(e){return Object.values(e.messages)},centerOf:function(e,t){return function(e){return e=t.pixelsFrom(e),{x:e.x-e.w/2,y:e.y-e.h/2,w:e.w||0,h:e.h||0}}},positionOf:function(e,t){return function(n){return n=t.pixelsFrom(n),{x:n.x-e.windowSize.w/2,y:n.y-e.windowSize.h/2}}},pixelsFrom:function(e){return function(t){return{x:t.x*e.scale*e.windowSize.w,y:t.y*e.scale*e.windowSize.h,w:t.w||0,h:t.h||0}}}}}),on=sn;s["a"].config.productionTip=!1,s["a"].prototype.$http=r.a,s["a"].prototype.$apiURL="https://api.obfuscation.karls.computer",s["a"].prototype.$publicPath="/",a.a.props.anchorAttributes.default=function(){return{target:"_blank",rel:"noopener noreferrer nofollow"}},s["a"].component("vue-markdown",a.a);var rn=Object(u["io"])("https://io.karls.computer");s["a"].use(c["a"],rn,{store:on}),new s["a"]({router:Zt,store:on,render:function(e){return e(Ft)}}).$mount("#app")},"5d18":function(e,t,n){},6066:function(e,t,n){},7138:function(e,t,n){"use strict";n("31ad")},"73ff":function(e,t,n){"use strict";n("39cd")},"85ec":function(e,t,n){},"8ad3":function(e,t,n){"use strict";n("3392")},"8f24":function(e,t,n){},"90f0":function(e,t,n){},9356:function(e,t,n){"use strict";n("ab78")},"9a7c":function(e,t,n){},"9e6c":function(e,t,n){},"9f5d":function(e,t,n){},a18c:function(e,t,n){},a6a7:function(e,t,n){},ab78:function(e,t,n){},baa9:function(e,t,n){"use strict";n("8f24")},bfb7:function(e,t,n){"use strict";n("6066")},c4ca:function(e,t,n){},c91c:function(e,t,n){"use strict";n("a18c")},dcd8:function(e,t,n){"use strict";n("9e6c")},dda3:function(e,t,n){},e224:function(e,t,n){"use strict";n("9f5d")},e28d:function(e,t,n){},e587:function(e,t,n){"use strict";n("4967")},fd40:function(e,t,n){"use strict";n("dda3")},ff49:function(e,t,n){"use strict";n("4a60")}});
//# sourceMappingURL=app.9d6e1d65.js.map