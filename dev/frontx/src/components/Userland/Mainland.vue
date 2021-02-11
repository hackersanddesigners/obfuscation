<template>
  <div 
    :style="userColors"
    :class="{ 
      blur: !registered || editing 
    }"
  >

    <Editor
      v-if="!registered || editing" 
      @stopEdit="editing = false"
    />

    <header>

      <div id="navTitle">
        <span 
          :class="{ selected: !desiresList }"
          @click.stop="desiresList = false"
        > map </span>
        <span 
          :class="{ selected: desiresList }"
          @click.stop="desiresList = true"
        > list </span>
      </div>

      <Minilist 
        v-if="desiresList"
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
      :class="{ dragging: dragging }"

      @scroll="setViewerPosition()"
      @keyup="handleInput($event)"
      @click="handleClick($event)"
    >

      <div 
        id="userland" 
        ref="userland"
        :style="{
          height: `${ 100 * scale }%`,
          width: `${ 100 * scale }%`,
          '--scale': scale
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
          :key='territory.id'
          :name="territory.name"
          :id="territory.id"
          :borders="territory.borders"
        />
        
      </div>
    </div>
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
  },

  props: {
    wantsToView: Object
  },

  data () {
    return { 
    
      desiresList: false,     

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

      'scale',
      'windowPos',

    ]),
    ...mapGetters([

      'me',
      'isMe',

      'territoryByName',
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
    }
  },

  created() {   

    let 
      self,
      users,
      messages


    // check if user is registered and get their datas.
    
    if (localStorage.me) {
      this.$store.commit('register')
      self = JSON.parse(localStorage.me)


      // if the user is marked as deleted, they have 
      // been blocked. The component is unmounted here.

      if (self.deleted) {
        this.$store.commit('block')
      }


    // if not registered, check if previously visited
    // and get the previously defined UID and color.

    } else if (localStorage.uid) {
      this.$store.commit('visit')
      self = {
        uid: localStorage.uid,
        color: localStorage.color
      }


    // if not visited, store the generated UID and 
    // color for later reference (i.e. when the user 
    // comes back to register).

    } else {
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


    // check if user hsa a DB of users.

    if (localStorage.users) {
      users = JSON.parse(localStorage.users)
      this.$store.commit('setUsers', users)
    }


    // check if user hsa a DB of messages.

    if (localStorage.messages) {
      messages = JSON.parse(localStorage.messages)
      this.$store.commit('setMessages', messages)
    }

  },
  mounted() {


    // if there is a slug, navigate to it.

    if (this.wantsToView) {
      this.route(this.wantsToView)


    // else, land in the center.

    } else {
      setTimeout(() => {   
        this.scrollTo(
          this.pixelsFrom(
            this.territories[0].borders
          ), 
        'smooth')
      }, 50)
    }
  

  },
  sockets: {


    // navigate to a recieved message if it's 
    // an announcement.

    message(data) {
      const message = JSON.parse(data)
      if (message.announcement) {
        this.scrollTo(
          this.positionOf(message), 
        'smooth')
      }
    },

  },

  methods: {


    // custom router.

    route(zone) {
      let 
        type = zone.type,
        name = zone.name,
        position


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
        const territory = this.territoryByName(name)
        if (territory) {
          position = this.pixelsFrom(territory.borders)
        } else {
          console.log('not found')
        }
      }


      // slugs map to locations on mainland.

      this.scrollTo(position, 'smooth')
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
      this.$store.commit('viewerPosition', {
        x: this.$refs.userlandContainer.scrollLeft, 
        y: this.$refs.userlandContainer.scrollTop
      })
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

header {
  position: absolute;
  width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2;
  transition: filter 0.3s ease;
}

#navTitle {
  box-sizing: border-box;
  position: relative;
  margin-top: 2vh;
  margin-left: 2vh;
  font-size: 14pt;
  display: flex;
  background: white;
}
#navTitle span {
  margin-right: 5px;
  cursor: pointer;
  text-decoration: none;
}
#navTitle span.selected {
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
#userland {
  position: absolute;
  top: 0px;
  left: 0px;
  font-family: jet;
  font-size: calc(1.7pt * var(--scale));
}

.blur header,
.blur #userlandContainer {
  filter: blur(10px);
}

</style>