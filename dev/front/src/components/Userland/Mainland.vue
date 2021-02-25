<template>
  <div 
    :style="[
      userColors,
      { '--scale': scale }
    ]"
    :class="[
      { blur: !registered || editing },
      { navHidden: !nav },
      location.slug
    ]"
  >

    <Editor
      v-if="!registered || editing" 
      @stopEdit="editing = false"
    />

    <header
      v-if="ready"
    >

      <div id="navTitle">
        <span 
          :class="[
            'navToggle',
            'hide',
            { hidden: !nav }
          ]"
          @click.stop="nav = false"
        > &lt; </span>

        <div class="navType">
          <span 
            :class="[
              'map',
              { selected: !desiresList }
            ]"
            @click.stop="desiresList = false"
          > map </span>
          <span 
            :class="[
              'list',
              { selected: desiresList }
            ]"
            @click.stop="desiresList = true"
          > list </span>
        </div>
        <span 
          :class="[
            'navToggle',
            'show',
            { hidden: nav }
          ]"
          @click.stop="nav = true"
        > 
          <!-- &gt; -->
           &gt; nav
           <!-- ⓘ -->
        </span>
      </div>

      <Minilist 
        v-if="desiresList"
        @goTo="scrollTo(pixelsFrom($event),'smooth')"
      />

      <Minimap 
        v-else
        :dragging="dragging"
        :miniDragging="miniDragging"
        @startedDrag="miniDragging = true"
        @stoppedDrag="miniDragging = false"
        @newPosition="handleMini($event)"
        @zero="centerMe"
      />

      <Options
        @startEdit="editing = true"
      />

      <Userslist
        @goTo="goTo($event)"
      />

    </header>

    <div 
      id="userlandContainer" 
      ref="userlandContainer"
      :class="[
        { dragging: dragging },
      ]"

      @scroll.stop="setViewerPosition()"
      @keyup="handleInput($event)"
      @click="handleClick($event)"
    >
      
      <div id="location">
        <span> #{{location.slug}} </span>
      </div>

      <div 
        v-if="ready"
        id="userland" 
        ref="userland"
        :style="{
          height: `${ 100 * scale }%`,
          width: `${ 100 * scale }%`,
        }"
        @mousedown.stop="dragging = true"
        @mousemove="drag($event)"
        @mouseup.stop="dragRelease()"
      >

        <Grid />

        <Cursorr
          v-for="user in notDeletedUsers"
          :key="user.uid"
          :ref="isMe(user) ? 'me' : 'Users'"
          :user="user"
          :dragging="isMe(user) ? dragging : null"
        />
        
        <Message
          v-for="message in notDeletedMessages"
          :key="message.uid"
          :message="message"
          :isMe="message.authorUID === me.uid"
          @goTo="goTo(userByName($event))"
        />

        <Territory
          v-for="territory in territories"
          :key='territory.slug'
          :territory='territory'
        />
        
      </div>
    </div>

    <Overlay
      id="overlay"
      :wantsToView="moreInformation"
    />

  </div>
</template>

<script>

import { uid } from 'uid'
import { mapState, mapGetters } from 'vuex'

import Grid from './Grid'
import Editor from './Options/Editor'
import Minimap from './Nav/Mini/Map'
import Options from './Options'
import Userslist from './Users'
import Cursorr from './User/Cursorr'
import Message from './User/Message'
import Territory from './Territory'
import Minilist from './Nav/List/'
import Overlay from './Overlay/'


export default {


  name: 'Mainland',

  components: {
    Editor,
    Minimap,
    Minilist,
    Options,
    Userslist,
    Grid,
    Cursorr,
    Message,
    Territory,
    Overlay,
  },

  props: {
    wantsToView: Object
  },

  data () {
    return { 
      
      ready: true,

      moreInformation: null,

      nav: true,
      desiresList: true,     

      editing: false,
      scrolling: false,
      dragging: false,
      miniDragging: false,

      movement: {},

    }
  },

  computed: {
    ...mapState([

      'registered',
      'visited',
      'blocked',

      'users',
      'messages',
      'territories',

      'location',
      'scale',
      'windowPos',

    ]),
    ...mapGetters([

      'me',
      'isMe',

      'territoryByBorders',
      'userByName',

      'userColors',
      'notDeletedUsers',
      'notDeletedMessages',

      'positionOf',
      'pixelsFrom'

    ]),
  },

  watch: {
    wantsToView(zone) {
      this.route(zone)
    },

    me(newMe, oldMe) {
      if (oldMe && newMe.uid !== oldMe.uid) {
        console.log('you: ', newMe.uid)
      }
    }
  },

  created() {   

    let 
      self,
      users,
      messages


    // check if user hsa a DB of users.

    this.$http
      // .get('http://localhost:3090/users',)
      .get('https://obfuscation.karls.computer/users',)
      .then((response) => { 
        users = response.data
        console.log('users: ', users)
        this.$store.commit('setUsers', users)
      })
      .catch((error) => { 
        console.log(error)
      })


    // check if user hsa a DB of messages.

    this.$http
      // .get('http://localhost:3090/messages',)
      .get('https://obfuscation.karls.computer/messages',)
      .then((response) => { 
        messages = response.data
        console.log('messages: ', messages)
        this.$store.commit('setMessages', messages)
      })
      .catch((error) => { 
        console.log(error)
      })



    // check if user is registered and get their datas.
    
    if (localStorage.me && localStorage.me !== "undefined") {
      console.log('youre a local')
      self = JSON.parse(localStorage.me)
      this.$store.commit('register')


      // if the user is marked as deleted, they have 
      // been blocked. The component is unmounted here.

      if (self.deleted) {
        this.$store.commit('block')
      }


    // if not registered, check if previously visited
    // and get the previously defined UID and color.

    } else if (localStorage.uid) {
      console.log('youve visited')
      self = {
        uid: localStorage.uid,
        color: localStorage.color
      }
      this.$store.commit('visit')


    // if not visited, store the generated UID and 
    // color for later reference (i.e. when the user 
    // comes back to register).

    } else {
      console.log('youre new')
      self = {
        uid: uid(),
        connected: false,
        name: 'newUser-' + uid(),
        color: this.randomColor(),
        x: 0,
        y: 0,
        typing: null,
      },
      localStorage.uid = self.uid
      localStorage.color = self.color
    }


    // update the app store with the UID and user.

    this.$store.commit('setUID', self.uid)
    this.$store.commit('setUser', self)

    this.$socket.client.emit('user', self)


  },
  mounted() {

    setTimeout(() => {   


      // if there is a slug, navigate to it.

      if (this.wantsToView) {
        this.route(this.wantsToView)


      // else, land in the center.

      } else {
        this.$router.push(`#reception`)
      }
  
    }, 50)

  },
  sockets: {


    // navigate to a recieved message if it's 
    // an announcement.

    message(message) {
      // const message = message
      if (message.announcement) {
        this.scrollTo(
          this.positionOf(message), 
        'smooth')
      }
    },

  },

  methods: {


    // custom router.

    route(slug) {
      let 
        type = slug.type,
        name = slug.name,
        position


      // if the slug is preceeded with ~ or #, it
      // maps to a position on the map.

      if (type) {


      // user slugs are preceded with "~".

        if (type == 'user') {
          const user = this.userByName(name)
          if (user) {
            position = this.positionOf(user)
          } else {
            console.log('not found')
          }

        
        // territory slugs are preceded with "#".
        
        } else if (type == 'territory') {
          const territory = this.territories[name]
          if (territory) {
            position = this.pixelsFrom(territory.borders)
          } else {
            console.log('not found')
          }
        }


        // slugs map to locations on mainland.

        this.scrollTo(position, 'smooth')


        // otherwise it is a "page", so it maps to
        // second level information.

      } else {
      
        const 
          collection = name.split('/')[0],
          page = name.split('/')[1],
          territoryName = 
            collection === 'statics' ? 'reception' :
            collection === 'sessions' ? 'timetable' :
            collection === 'videos' ? 'exhibition' :
            collection === 'glossaries' ? 'glossary' :
            null,
          territory = this.territories[territoryName]
      
        position = this.pixelsFrom(territory.borders)

        if (this.location.slug !== territory.slug) {
          this.scrollTo(position, 'smooth')
        }

        this.moreInformation = { 
          collection: collection,
          page: page
        }

      }

    },


    // tells the cursor component to handle input.

    handleInput(e) {
      if (!this.editing) {
        this.$refs.me[0].trackInput(e)
      }
    },


    // tells the cursor component to handle click.

    handleClick() {
      if (!this.editing && !this.dragging) {
        this.$refs.me[0].sendMessage()
      }
    },


    // scroll to mini position.

    handleMini(position) {
      this.scrollTo(
        position, 
        this.miniDragging ? 'auto' : 'smooth')
    },


    // zoom to default scale and scroll to center.

    centerMe() {
      this.$store.commit('zero')
      setTimeout(() => {
        this.goTo({
          x: 0.5,
          y: 0.5
        })
      }, 50)
    },


    // go to zone (user, message, or territory).

    goTo(zone) {
      this.scrollTo(
        this.positionOf(zone), 
      'smooth')
    },


    // drag the userland div to scroll it.

    drag(e) {
      if (this.dragging) {
        const position = {
          x: this.windowPos.x - e.movementX,
          y: this.windowPos.y - e.movementY
        }
        this.scrollTo(position)


        // store the position for 'intertial throwing'.

        this.movement = {
          x: position.x,
          y: position.y,
          extraX: 10 * e.movementX,
          extraY: 10 * e.movementY,
        }
      }
    },


    // 'intertial throwing' function.
 
    dragRelease() {
      this.dragging = false
      if (Math.abs(this.movement.extraX) > 0) {
        this.scrollTo({
          x: this.movement.x - this.movement.extraX,
          y: this.movement.y - this.movement.extraY
        }, 'smooth')
        this.movement.extraX -= 0.1
        this.movement.extraY -= 0.1
      }
    },


    // core of app navigation is this following:

    scrollTo(to, behavior) {
      this.$refs.userlandContainer.scroll({
        left: to.x,
        top: to.y,
        behavior: behavior || 'auto'
      })
    },


    // the 'viewerPosition' is the distance of the
    // top-left corner of the window from the top-
    // left corner of the (larger) userland div. 

    setViewerPosition() {
      const
        pos = {
          x: this.$refs.userlandContainer.scrollLeft,
          y: this.$refs.userlandContainer.scrollTop,
        },
        territory = this.territoryByBorders(pos)

      this.$store.commit('viewerPosition', pos)
      this.$store.commit('setLocation', territory)
    },


    // generate a random color.

    randomColor() {
      const 
        r = Math.floor(Math.random() * 256),
        g = Math.floor(Math.random() * 256),
        b = Math.floor(Math.random() * 256),
        a = 1
      return `rgb(${r}, ${g}, ${b}, ${a})`
    },

  },
  
  
}
</script>

<style>

#location {
  position: sticky;
  top: 0;
  left: 0;
  height: 0;
  overflow: visible;
  width: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

#location span {
  margin: 1vh;
  padding: 0.5vh;
  height: auto;
  border: none;
  color: white;
  background: black;
  font-family: 'jet';
  border-radius: var(--ui-border-radius);
  box-shadow: var(--ui-box-shadow);
}


header {
  position: absolute;
  left: 0;
  width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2;
  /* transition: filter 0.3s ease; */
  transition: all 0.2s ease;
}

header > div {
  background: white;
  border: 1px solid grey;
  border-radius: var(--ui-border-radius);
  box-shadow: var(--ui-box-shadow);
}

.navHidden header {
  left: -22vw;

}

#navTitle {
  box-sizing: border-box;
  position: relative;
  margin-top: 1vh;
  margin-left: 1vh;
  /* padding: 0vh 0.5vh; */
  font-size: 10pt;
  display: flex;
  align-items: stretch;
  background: none;
  border: none;
  box-shadow: none;
}

#navTitle .navToggle,
#navTitle .navType {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0vh 0.5vh;
  background: white;
  border: 1px solid grey;
  border-radius: var(--ui-border-radius);
  box-shadow: var(--ui-box-shadow);
  z-index: 1;
}
#navTitle .navToggle {
  margin-right: 1vh;
  padding: 0vh 1vh;
  transition: all 0.2s ease;
}
#navTitle .navToggle.hide {
  /* z-index: 1; */
}
#navTitle .navToggle.show {
  position: fixed;
  padding: 0.5vh 1vh;
  left: 1vh;
  z-index: 0;
}
#navTitle .navToggle.hidden {
  opacity: 0;
}

#navTitle span {
  cursor: pointer;
  text-decoration: none;
  padding: 0.5vh;
}
#navTitle .navType span.map {
  border-right: 1px solid grey;
}
#navTitle .navType span.selected {
  text-decoration: line-through;
}
#userlandContainer {  
  cursor: none;
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: scroll;
  transition: filter 0.3s ease;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
#userlandContainer::-webkit-scrollbar {
  display: none;
}
#userlandContainer.dragging {
  cursor: grabbing;
  user-select: none;
}
.exhibition header,
.exhibition #userlandContainer {
  /* mix-blend-mode: exclusion; */
  filter: invert(100%);
}
#userland {
  position: absolute;
  top: 0px;
  left: 0px;
  font-family: jet;
  font-size: calc(1.7pt * var(--scale));
  /* background:  */
    /* url("../../assets/textures/1.png") repeat 1000px */
  /* , url("../../assets/textures/2.png") repeat 2000px */
  /* , url("../../assets/textures/favicon.png") repeat scroll */
  /* ; */
  /* background-position: center center; */
  /* background-size: 400px; */
  background-color: rgb(241, 241, 241);
  overflow: hidden;
}
#userland::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: 
    url("../../assets/textures/1.png") repeat 1000px
  , url("../../assets/textures/2.png") repeat 2000px
  /* , url("../../assets/textures/favicon.png") repeat scroll */
  ;
  /* background-position: center center; */
  /* background-size: 400px; */
  overflow: hidden;
  opacity: 0.6;
}

.blur header,
.blur #location,
.blur #overlay,
.blur #userlandContainer {
  filter: blur(10px);
  opacity: 0.5;
}

</style>