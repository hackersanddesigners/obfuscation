<template>
  <main 
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
      v-if="socketsReady && (!registered || editing)" 
      @stopEdit="editing = false"
    />

    <header
      v-if="socketsReady"
    >

      <div id="navTitle">
        <span 
          :class="[
            'navToggle',
            'hide',
            { hidden: !nav }
          ]"
          @click.stop="nav = false"
        > &lt;  </span>

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
           nav &gt; 
           <!-- ⓘ -->
        </span>
      </div>

      <Minilist 
        v-if="desiresList"
        @goTo="scrollTo(centerOf($event),'smooth')"
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
        <span> /{{location.slug}} </span>
      </div>

      <div 
        v-if="true"
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

        <Territory
          v-for="territory in territories"
          :key='territory.slug'
          :territory='territory'
          @moreInfo="route($event)"
        />

        <Cursorr
          v-for="user in notBlockedUsers"
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
        
      </div>
    </div>

    <Ticker
      content="May 4 & 7, 2021, Register Now. || May 4 & 7, 2021, Register Now. || May 4 & 7, 2021, Register Now. || May 4 & 7, 2021, Register Now. || May 4 & 7, 2021, Register Now. || May 4 & 7, 2021, Register Now. || "
    />

    <Overlay
      id="overlay"
      :dragging="dragging"
      :wantsToView="moreInformation"
    />

  </main>
</template>

<script>

import { uid } from 'uid'
import { mapState, mapGetters } from 'vuex'

import Grid from './Grid'
import Editor from './Options/Editor'
import Minimap from './Nav/Mini/Map'
import Options from './Options'
import Cursorr from './User/Cursorr'
import Message from './User/Message'
import Territory from './Territory'
import Minilist from './Nav/List/'
import Ticker from './Ticker/'
import Overlay from './Overlay/'


export default {


  name: 'Mainland',

  components: {
    Editor,
    Minimap,
    Minilist,
    Options,
    Grid,
    Cursorr,
    Message,
    Territory,
    Ticker,
    Overlay,
  },

  props: {
    wantsToView: String
  },

  data () {
    return { 
      
      socketsReady: false,

      moreInformation: null,

      nav: true,
      desiresList: true,   
      showParticipants: false,  

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
      'windowSize',

    ]),
    ...mapGetters([

      'me',
      'isMe',

      'territoryByBorders',
      'userByName',

      'userColors',
      'notBlockedUsers',
      'notDeletedMessages',

      'positionOf',
      'positionOfIsland',
      'centerOf',
      'pixelsFrom',

    ]),
  },

  watch: {
    wantsToView(slug) {
      this.route(slug)
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


    // get user db from server.

    this.$http
      .get('https://obfuscation.karls.computer/users',)
      .then((response) => { 


        users = response.data
        this.$store.commit('setUsers', users)


        // check if user is registered and get their datas.

        if (localStorage.uid && users[localStorage.uid]) {
          console.log("You've visited.")
          this.$store.commit('visit')

          self = users[localStorage.uid]


          // if they changed their user name they registered

          if (!users[self.uid].name.includes(self.uid)) {
            console.log("You're a local.")
            this.$store.commit('register')
          }


          // if the user is marked as blocked, they have 
          // been blocked. The component is unmounted here.

          if (self.blocked) {
            console.log("You're not welcome here.")
            this.$store.commit('block')
          }


        // if not visited, store the generated UID and 
        // color for later reference (i.e. when the user 
        // comes back to register).

        } else {
          console.log('youre new')
          const id = uid()
          self = {
            uid: id,
            connected: false,
            name: 'newUser-' + id,
            color: this.randomColor(),
            x: 0,
            y: 0,
            typing: null,
            blocked: false,
          },
          localStorage.uid = self.uid
          localStorage.color = self.color
        }

        
        // update the app store with the UID and user.

        this.$store.commit('setUID', self.uid)
        this.$store.commit('setUser', self)


        // announce existence to server and peers.

        this.$socket.client.emit('user', self)
        this.socketsReady = true


      })
      .catch((error) => { 
        console.log(error)
      })


    // get message db from server.

    this.$http
      .get('https://obfuscation.karls.computer/messages',)
      .then((response) => { 
        messages = response.data
        this.$store.commit('setMessages', messages)
      })
      .catch((error) => { 
        console.log(error)
      })



  },
  mounted() {

    setTimeout(() => {   


      // if there is a slug, navigate to it.

      if (this.wantsToView) {
        this.route(this.wantsToView, 'smooth', true)


      // else, land in the center.

      } else {
        this.$router.push(`reception`)
      }
  
    }, 50)

  },
  sockets: {


    // navigate to a recieved message if it's 
    // an announcement.

    message(message) {

      if (message.announcement) {
        this.scrollTo(
          this.positionOf(message), 
        'smooth')

      } else if (message.stream) {
        this.$store.commit('setStream', 
          message.content.replace('/stream ', ''))
      }
    },

  },

  beforeDestroy() {

    if (this.registered && this.me) {
      this.$store.dispatch('disconnect')
    }

  },

  methods: {


    // custom router.

    route(slug, behavior, pause) {
      slug = slug.slice(1)

      let
        type =
          slug.startsWith('~') ? 
          'user' : 
          'territory',
        name = 
          type === 'user' ?
          slug.split('/')[0] : 
          slug.split('/')[0],
        page = 
          type === 'territory' ? 
          slug.split('/')[1] : 
          null,
        position

      console.log(name, page)

      if (type === 'user') {
        const user = this.userByName(name)
        if (user) {
            position = this.positionOf(user)
        } else {
          console.log('user not found')
        }

      } else if (type === 'territory') {
        const territory = this.territories[name]
        if (territory) {
          if (page) {
            // check if paage exists

            //   if (page.includes('?')) {
            //     page = page.replace(/\?.*$/g,"")
            //     console.log('newpage:', page)
            //   }

            position = this.positionOfIsland(page)

          } else {
            position = this.centerOf(territory.borders)

          }
        } else {
          console.log('territory not found')
        }
      }

      setTimeout(() => {
        this.scrollTo(
          position, behavior || 'smooth'
        )
      }, pause || 0)

      if (page) {
        setTimeout(() => {
          this.moreInformation = { 
            name: name,
            page: page
          }
        }, pause ? 1000 : 0)
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
        this.centerOf(zone), 
      'smooth')
    },


    // drag the userland div to scroll it.

    drag(e) {
      if (this.dragging) {
        const position = {
          x: this.windowPos.x - e.movementX,
          y: this.windowPos.y - e.movementY
        }
        // console.log(e.clientX, this.windowSize.w)
        // if (
        //   e.clientX < this.windowSize.w &&
        //   e.clientY < this.windowSize.h
        // ) {
        this.scrollTo(position)
        // }


        // store the position for 'intertial throwing'.

        // this.movement = {
        //   x: position.x,
        //   y: position.y,
        //   extraX: 10 * e.movementX,
        //   extraY: 10 * e.movementY,
        // }
      }
    },


    // 'intertial throwing' function.
 
    dragRelease() {
      this.dragging = false
      // if (Math.abs(this.movement.extraX) > 0) {
      //   this.scrollTo({
      //     x: this.movement.x - this.movement.extraX,
      //     y: this.movement.y - this.movement.extraY
      //   }, 'smooth')
      //   this.movement.extraX -= 0.1
      //   this.movement.extraY -= 0.1
      // }
    },


    // core of app navigation is this following:

    scrollTo(to, behavior) {
      if (this.dragging) {
        // requestAnimationFrame(() => {
          this.$refs.userlandContainer.scroll({
            left: to.x,
            top: to.y,
            behavior: behavior || 'auto'
          })
        // })
      } else {
        requestAnimationFrame(() => {
          this.$refs.userlandContainer.scroll({
            left: to.x,
            top: to.y,
            behavior: behavior || 'auto'
          })
        })
      }

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

main {
  overflow: hidden;
}

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
  color: var(--ui-back);
  background: var(--ui-front);
  font-family: 'jet';
  border-radius: var(--ui-border-radius);
  box-shadow: var(--ui-box-shadow);
}


header {
  position: absolute;
  left: 0;
  /* width:x 0; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2;
  /* transition: filter 0.3s ease; */
  transition: all 0.2s ease;
}

header > div {
  color: var(--ui-front);
  background: var(--ui-back);
  border: var(--ui-border);
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
  background: var(--ui-back);
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
  /* cursor: grabbing; */
  user-select: none;
}
.exhibition header,
.exhibition #userlandContainer {
  /* mix-blend-mode: exclusion; */
  /* filter: invert(100%); */
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
  /* background-color: rgb(241, 241, 241); */
    /* color: var(--ui-front); */
  background: var(--ui-back);
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
  opacity: 0.3;
}

.blur header,
.blur #location,
.blur #overlay,
.blur #userlandContainer {
  filter: blur(10px);
  opacity: 0.5;
}

</style>