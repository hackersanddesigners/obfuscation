<template>
  <main 
    :style="[
      userColors,
      regionColors,
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
        @goTo="route($event, false, false, true)"
      />

      <Minimap 
        v-else
        :dragging="dragging"
        :miniDragging="miniDragging"
        @startedDrag="miniDragging = true"
        @stoppedDrag="miniDragging = false"
        @newPosition="handleMini($event)"
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
        'LIFECYCLE' + lifecycle,
        { dragging: dragging },
      ]"
      @keyup="handleInput($event)"
      @click="handleClick($event)"
    >
      
      <div id="location">
        <div 
          class="ui"
          @click="handleIslandClick('/' + location.slug)"
        > 
          #{{ location.slug }} 
        </div>
      </div>

      <div 
        v-if="true"
        id="userland" 
        ref="userland"
        :class="location.slug"
        :style="{
          height: `${ 100 * scale }%`,
          width: `${ 100 * scale * widthFactor }%`,
        }"
        @mousedown.stop="dragging = true"
        @mousemove="drag($event)"
        @mouseup.stop="release"
      >

        <Territory
          v-for="territory in territories"
          :key='territory.slug'
          :territory='territory'
          @moreInfo="handleIslandClick($event)"
        />

        <Cursorr
          v-for="user in connectedUsers"
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
     :marquee="isMobile"
    />

    <Overlay
      id="overlay"
      :dragging="dragging"
      :content="moreInformation"
      :desiresOverlay="desiresOverlay"
      :isGeneral="location.slug === 'general'"
      @showOverlay="desiresOverlay = true"
      @hideOverlay="handleOverlayClose"
    />

  </main>
</template>




<script>
import { mapState, mapGetters } from 'vuex'
          // @click="route(location.slug, false, false, true)"

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
  },

  data () {
    return { 
      
      moreInformation: {},
      secondPath: false,

      desiresNav: true,
      desiresList: true, 
      desiresOverlay: true, 

      editing: false,
      scrolling: false,
      dragging: false,
      miniDragging: false,

      lastScrollX: 0,
      lastScrollY: 0,

    }
  },

  computed: {
    ...mapState([

      'lifecycle',      

      'registered',
      'visited',
      'blocked',

      'users',
      'messages',

      'territories',
      'location',
      'general',

      'isMobile',
      'scale',
      'widthFactor',
      'windowPos',
      'windowSize',

    ]),
    ...mapGetters([

      'me',
      'isMe',

      'territoryByBorders',
      'territoryBySlug',
      'userByName',

      'regionColors',
      'userColors',
      'connectedUsers',
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

    location(newLocation, oldLocation) {
      if (newLocation.slug !== oldLocation.slug) {
        if (!this.secondPath) {
          this.$router.push('/' + this.location.slug)
        }
      }
    },

    scale() {
      // this.route('/~' + this.me.name, 'auto')    
      this.goTo(this.me, 'auto')    
    },

    // users() {
      // if(this.users['519a87e43c9']) {
        // console.log('change')
      // }
    // },

    me(newMe, oldMe) {
      if (oldMe && newMe.uid !== oldMe.uid) {
        console.log('you: ', newMe.uid)
      }
    }

  },

  created() {   

    if (this.isMobile) {
      this.$store.commit('setScale', 6)
      this.$store.commit('setWidthFactor', 3.5)
    }

  },

  mounted() {


    // if there is a slug, navigate to it.

    if ( this.wantsToView && 
         this.wantsToView !== '/' &&
         this.wantsToView !== '/general') {
      this.route(this.wantsToView, 'smooth')
    } else {
      this.$router.push('reception')
    }

    this.handleLinks('.message a')
    

    this.$el.addEventListener("wheel", (e) => {
      if (e.ctrlKey) {
        e.preventDefault()
        e.stopPropagation()
      }
    })

    this.$refs.userlandContainer.addEventListener('scroll', (e) => {
      this.setViewerPosition(e)
    })


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

      this.handleLinks(`.message${message.uid} a`)

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

    route(slug, behavior, pause, force) {

      slug = 
        slug.startsWith('/') ?
        slug.slice(1) :
        slug

      let
        name = slug.split('/')[0],
        page = slug.split('/')[1],
        position,
        content

      console.log(name, page)
      

      // routing to users
      
      if (slug.startsWith('~') ) {
        const user = this.userByName(name.replace('~',''))
        if (!user) {
          console.log('user not found')
        } else {
          position = this.positionOf(user)
        }


      // routing to territoriees

      } else {
        const territory = this.territories[name]
        if (!territory) {
          console.log('territory not found')
        } else {
          position = this.centerOf({
            x: territory.borders.x * this.widthFactor,
            y: territory.borders.y,
            w: territory.borders.w * this.widthFactor,
            h: territory.borders.h,
          })
          // position = this.centerOf(territory.borders)
          content = territory

      
          // routing to pages

          if (page) {
            this.secondPath = true
            position = this.positionOfIsland(page)
            content = this.territories[name].content[page]

            setTimeout(() => {
              this.secondPath = false
            }, 1000)

          }

        }

      }        
      
      // scroll action

      if (force || this.location.slug !== name || page) {
        setTimeout(() => {
          this.scrollTo(position, behavior || 'smooth')
        }, pause || 0)
      }

      
      // setting overlay content

      this.moreInformation = content

      if (this.isMobile) {
        this.desiresNav = false
        if (page) {
          this.desiresOverlay = true
        } else {
          this.desiresOverlay = false
        }

      } else {
        if (name === 'general') {
          this.desiresOverlay = false
        } else {
          this.desiresOverlay = true        
        }
      }


    },

    handleOverlayClose() {
      if (this.$router.history.current.path.split('/')[2]) {
        this.$router.push('/' + this.location.slug)
      }
      setTimeout(() => {
        this.desiresOverlay = false
      }, 10)
    },


    handleIslandClick(next) {
      if (!this.dragging) {
        const current = this.$router.history.current.path
        if (current === next) {
          this.route(next, false, false, true)
        } else {
          this.$router.push(`${next}`)
        }
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
      if (!this.editing && !this.isMobile) {
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


    // go to zone (user, message, or territory).

    goTo(zone, behavior) {
      this.scrollTo(
        this.centerOf(zone), 
      behavior || 'smooth')
    },


    // drag the userland div to scroll it.

    drag(e) {
      if (this.dragging) {
        const position = {
          x: this.windowPos.x - e.movementX,
          y: this.windowPos.y - e.movementY
        }
        if (e.clientX <= 10 || 
            e.clientX >= this.windowSize.w - 20 ||
            e.clientY <= 10 || 
            e.clientY >= this.windowSize.h - 20) {
          this.dragging = false  
        } else {
          this.scrollTo(position)
        }
      }
    },

    release() {
      // setTimeout(() => {
        this.dragging = false
      // }, 0)
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

      const 
        deltaScrollX = pos.x - this.lastScrollX,
        deltaScrollY = pos.y - this.lastScrollY,
        currPos = {
          x: this.me.x * this.windowSize.w * this.scale,
          y: this.me.y * this.windowSize.h * this.scale
        },
        mePos = {
          x: (currPos.x + deltaScrollX) / (this.windowSize.w * this.scale),
          y:(currPos.y + deltaScrollY) / (this.windowSize.h * this.scale)
        }
      
      
      this.$store.dispatch('updatePosition', mePos)

      this.lastScrollX = pos.x
      this.lastScrollY = pos.y

    },

    handleLinks(selector) {
      setTimeout(() => {
        Array
        .from(document.querySelectorAll(selector))
        .forEach(a => {
          const href = a.attributes.href.value 
          if (href && href.startsWith('/')) {
            a.addEventListener('click', (e) => {
              this.$router.push(href)
              e.preventDefault()
            })
          }
        })
      }, 1000)
    }

  },
  
  
}
</script>

<style>

main {
  height: 100%; width: 100%;
  overflow: hidden;

  --one: calc(1.2px * var(--scale));
  --island-back-color: rgba(0, 0, 0, 0.055);
  --island-back-darker: rgba(0, 0, 0, 0.13);
  --island-back:
    url("../../assets/textures/1.png") repeat calc(20px * var(--scale))
  , url("../../assets/textures/2.png") repeat calc(20px * var(--scale))
  ;
  --island-curve: calc(10 * var(--one));
  --small-island-curve: calc(5 * var(--one));
  --island-shadow: 
      inset 0 0 
      calc(1 * var(--one))
      calc(0.5 * var(--one))
    rgba(0, 0, 0, 0.267);

}

main nav {
  position: absolute;
  box-sizing: border-box;
  top: 0; left: 0;
  height: 0;
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
  margin: 1vh;
  font-size: var(--ui-font-size);
  color: var(--ui-back);
  background: var(--ui-front);
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
  top: 0; left: 0;
  color: var(--ui-front);
  background: var(--ui-back);
  overflow: hidden;
  transition: background-color 0.2s ease;
}
#userland::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: 
    url("../../assets/textures/1.png") repeat calc(200px * var(--scale))
  , url("../../assets/textures/2.png") repeat calc(400px * var(--scale))
  ;
  overflow: hidden;
  opacity: 0.3;
}


.island {
  position: relative;
  box-sizing: border-box;
  background-color: var(--island-back-color);
  box-shadow: var(--island-shadow);
  border-radius: 
    var(--small-island-curve)
    var(--island-curve)
    var(--small-island-curve)
    var(--island-curve)
  ;
  transition: all 0.2s ease;
}
.island::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: var(--island-back);
  border-radius: inherit;
  overflow: hidden;
  opacity: 0.5;
}
.island:hover {
  background-color: var(--island-back-darker);
}
.island h1 { 
  margin: 0;
  font-size: calc(2.5 * var(--one));
  line-height: 1.1;
}
.island h3 {
  margin: 0;
  font-size: calc(1.8 * var(--one));
  line-height: 1.2;
}


#userland.reception {
  background-color: var(--reception);
}
#userland.readme {
  background-color: var(--readme);
}
#userland.hangout {
  background-color: var(--hangout);
}
#userland.exhibition {
  background-color: var(--exhibition);
}
#userland.livestream {
  background-color: var(--livestream);
}
#userland.timetable {
  background-color: var(--timetable);
}
#userland.contributors {
  background-color: var(--contributors);
}
#userland.library {
  background-color: var(--library);
}
#userland.study-room {
  background-color: var(--study-room);
}
#userland.glossary {
  background-color: var(--glossary);
}




main nav,
main #location,
main #overlay,
main #tickerContainer,
main #userlandContainer {
  filter: blur(0px);
  -webkit-filter: blur(0px);
  opacity: 1;
}

main.blur nav,
main.blur #location,
main.blur #overlay,
main.blur #tickerContainer,
main.blur #userlandContainer {
  filter: blur(10px);
  -webkit-filter: blur(10px);
  opacity: 0.5;
}

#userlandContainer.dragging {
  user-select: none;
}





.mobile #location div {
  /* padding: 0.65vh 0.75vh 0.8vh 0.75vh; */
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