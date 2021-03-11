<template>
  <main 
    :style="[
      userColors,
      { '--scale': scale }
    ]"
    :class="{ blur: !registered || editing }"
  >

    <Editor
      v-if="!registered || editing" 
      @stopEdit="editing = false"
    />

    <nav :class="{ hidden: !desiresNav }">

      <NavHandle
        :desiresNav="desiresNav"
        @showNav="desiresNav = true"
        @hideNav="desiresNav = false"
        :desiresList="desiresList"
        @showList="desiresList = true"
        @showMap="desiresList = false"
        :isMobile="isMobile"
      />

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
        v-if="!isMobile"
        @startEdit="editing = true"
        @goTo="goTo($event)"
      />

      <div
        v-else
        id="joinChat"
        class="ui"
      >
        <p>
          To join the discussion, please open this website on a larger screen.
        </p>
      </div>

    </nav>

    <div 
      id="userlandContainer" 
      ref="userlandContainer"
      :class="[
        { dragging: dragging },
      ]"
      @scroll.stop="setViewerPosition($event)"
      @keyup="handleInput($event)"
      @click="handleClick($event)"
    >
      
      <div id="location">
        <div
          @click="route(location.slug)"
        > 
          {{ location.slug }} 
        </div>
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
     :phrase="tickerPhrase"
     :marquee="isMobile"
    />

    <Overlay
      id="overlay"
      :dragging="dragging"
      :wantsToView="moreInformation"
    />

  </main>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

import NavHandle from './Nav/Handle'
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
    NavHandle,
    Editor,
    Minimap,
    Minilist,
    Options,
    Cursorr,
    Message,
    Territory,
    Ticker,
    Overlay,
  },

  props: {
    wantsToView: String,
    tickerPhrase: String,
  },

  data () {
    return { 
      
      socketsReady: false,

      moreInformation: null,

      desiresNav: true,
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
      'isMobile',
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

    location(newLoc, oldLoc) {
      if (newLoc.slug !== oldLoc.slug) {
        // console.log(this.location)
      }
    },

    me(newMe, oldMe) {
      if (oldMe && newMe.uid !== oldMe.uid) {
        console.log('you: ', newMe.uid)
      }
    }

  },

  created() {   

  },

  mounted() {


    // if there is a slug, navigate to it.

    if (this.wantsToView && this.wantsToView !== '/') {
      this.route(this.wantsToView, 'smooth')
    } else {
      this.$router.push('reception')
    }


  },

  beforeDestroy() {

    if (this.registered && this.me) {
      this.$store.dispatch('disconnect')
    }

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

  methods: {


    // custom router.

    route(slug, behavior, pause) {

      slug = 
        slug.startsWith('/') ?
        slug.slice(1) :
        slug

      let
        name = slug.split('/')[0],
        page = slug.split('/')[1],
        position

      console.log(name, page)
      

      // routing to users
      
      if (slug.startsWith('~') ) {
        const user = this.userByName(name)
        if (user) {
          position = this.positionOf(user)
        } else {
          console.log('user not found')
        }


      // routing to territoriees

      } else {
        const territory = this.territories[name]
        if (territory) {
          position = this.centerOf(territory.borders)
        } else {
          console.log('territory not found')
        }
      }


      // first scroll action

      if (this.location.slug !== name) {
        setTimeout(() => {
          this.scrollTo(position, behavior || 'smooth')
        }, pause || 0)
      } else {
        pause = 10
      }


      // routing to pages

      if (page) {

        // check if paage exists

        const islandPos = this.positionOfIsland(page)
        if (islandPos) {
        

        // second scroll action

          setTimeout(() => {
            this.scrollTo(islandPos, behavior || 'smooth')
            this.moreInformation = { 
              name: name,
              page: page
            }
          }, pause || 300 || 0)

        }

      }

      if (this.isMobile) {
        this.desiresNav = false
      }


    },


    // tells the cursor component to handle input.

    handleInput(e) {
      if (!this.editing && !this.isMobile) {
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
        this.miniDragging ? 'auto' : 'smooth'
      )
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
        if (
          (e.clientX > 0 && e.clientX < this.windowSize.w) ||
          (e.clientY > 0 && e.clientY < this.windowSize.h)
        ) {
        this.scrollTo(position)
        } else {
          console.log('release')
          this.dragRelease()        
        }


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

  },
  
  
}
</script>

<style>

main {
  height: 100%; width: 100%;
  overflow: hidden;
}

main nav {
  position: absolute;
  box-sizing: border-box;
  top: 0; left: 0;
  height: 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2;
  transition: all 0.2s ease;
}

main nav.hidden {
  left: -50vw;
}



#location {
  box-sizing: border-box;
  position: sticky;
  top: 0; left: 0;
  height: 0; width: 100%;
  overflow: visible;
  z-index: 2;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

#location div {
  box-sizing: border-box;
  margin: 1vh;
  padding: 0.5vh;
  padding: 0.5vh 0.75vh 0.6vh 0.75vh;
  font-family: 'jet';
  color: var(--ui-back);
  background: var(--ui-front);
  border-radius: var(--ui-border-radius);
  box-shadow: var(--ui-box-shadow);
}



#userlandContainer {  
  position: absolute;
  height: 100%; width: 100%;
  overflow: scroll;
  transition: filter 0.3s ease;
  cursor: none;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
#userlandContainer::-webkit-scrollbar {
  display: none;
}
#userland {
  position: absolute;
  top: 0px; left: 0px;
  color: var(--ui-front);
  background: var(--ui-back);
  overflow: hidden;
}
#userland::before {
  content: '';
  position: absolute;
  top: 0px; left: 0px;
  width: 100%; height: 100%;
  background: 
    url("../../assets/textures/1.png") repeat 1000px
  , url("../../assets/textures/2.png") repeat 2000px
  ;
  overflow: hidden;
  opacity: 0.3;
}


main.blur nav,
main.blur #location,
main.blur #overlay,
main.blur #tickerContainer,
main.blur #userlandContainer {
  filter: blur(10px);
  opacity: 0.5;
}

#userlandContainer.dragging {
  user-select: none;
}





.mobile #location div {
  padding: 0.65vh 0.75vh 0.8vh 0.75vh;
}

.mobile nav {
  width: 100%;
  align-items: stretch;
  padding-right: 1vh;
}

.mobile nav.hidden {
  left: -100vw;
}

.mobile #joinChat {
  margin: 1vh 0 0 1vh;
  padding: 1vh;
}
.mobile #joinChat p {
  margin: 0;
}

.mobile #userlandContainer {  
  cursor: default;
}
</style>