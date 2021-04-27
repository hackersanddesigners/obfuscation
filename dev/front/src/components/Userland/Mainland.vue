<template>
  <main 
    :style="[
      userColors,
      scale > 7 ? regionColors : '',
      { '--scale': scale }
    ]"
    :class="{ 
      blur: notfound || !registered || editing || notifications.length > 0,
      touring: touring,
      obfuscated: $store.state.desiresTexture,
      tourIsAtOverlay: tourIsAtOverlay,
      tourIsAtLocation: tourIsAtLocation,
      tourIsAtIsland: tourIsAtIsland,
      tourIsAtAddressBar: tourIsAtAddressBar,
      tourIsAtBBB: tourIsAtBBB,
    }"
  >

    <transition name="fade">
      <Notfound v-if="notfound" />
    </transition>

    <transition name="fade">
      <Editor
        v-if="!registered || editing" 
        :touring="touring"
        @stopEdit="editing = false"
      />
    </transition>

    <transition name="fade">
      <div 
        v-if="notifications.length > 0"
        id="notificationContainer"
      >
        <Notification
          v-for="notification in notifications"
          :key="notification.uid"
          :notification="notification"
          @dismiss="notifications.splice(notifications.indexOf(notification), 1)"
          @goTo="handleNotificationClick($event)"
        />
      </div>
    </transition>

    <div 
      id="userlandContainer" 
      ref="userlandContainer"
      tabindex="-1"
      :class="[
        'LIFECYCLE' + lifecycle,
        { dragging: dragging },
      ]"
      @click="handleClick($event)"
    >
      
      <div 
        v-if="true"
        id="userland" 
        ref="userland"
        tabindex="-1"
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
          :isCompatible="isCompatible"
          :isMe="message.authorUID === me.uid"
          @goTo="goTo(users[$event])"
        />
        
      </div>

       <div id="location">
        <div 
          class="ui tag"
          @click="handleIslandClick('/' + location.slug)"
          tabindex="0"
        > 
          #{{ location.slug }} 
        </div>
      </div>

    </div>

    <nav :class="{ hidden: !desiresNav }">

      <NavHandle
        :desiresNav="desiresNav"
        @showNav="showNav"
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
        :touring="touring"
        @startedDrag="miniDragging = true"
        @stoppedDrag="miniDragging = false"
        @newPosition="handleMini($event)"
      />

      <Options
        v-if="!isMobile"
        ref="options"
        @startEdit="editing = true"
        @goTo="goTo($event)"
        @moreInfo="handleIslandClick($event)"
      />

      <div
        v-else
        class="ui compatibility"
      >
        <p>
          To join the discussion, please open this website on a larger screen.
        </p>
      </div>

      <div
        v-if="!isMobile && !isCompatible"
        class="ui compatibility"
      >
        <p>
          This platform works best on Chrome or Firefox.
        </p>
      </div>


    </nav>

    <Ticker
     :marquee="isMobile"
    />

    <Overlay
      id="overlay"
      :dragging="dragging"
      :content="moreInformation"
      :desiresOverlay="desiresOverlay"
      :isGeneral="location.slug === 'general'"
      :touring="touring"
      @showOverlay="showOverlay"
      @hideOverlay="handleOverlayClose"
      @startTour="startTour"
    />
    
    <Tour
      v-if="touring"
      :editing="editing"
      @end="touring = false"
      @goTo="handleIslandClick($event)"
      @hideOverlay="desiresOverlay = false"
      @hideNav="desiresNav = false"
      @showNav="showNav"
      @focusOverlay="tourIsAtOverlay = true"
      @unfocusOverlay="tourIsAtOverlay = false"
      @focusLocation="tourIsAtLocation = true"
      @unfocusLocation="tourIsAtLocation = false"
      @focusIsland="tourIsAtIsland = true"
      @unfocusIsland="tourIsAtIsland = false"
      @focusAddressBar="tourIsAtAddressBar = true"
      @unfocusAddressBar="tourIsAtAddressBar = false"
      @focusBBB="tourIsAtBBB = true"
      @unfocusBBB="tourIsAtBBB = false"
    />

    <div v-if="touring" id="addressBar"></div>

  </main>
</template>




<script>
import { mapState, mapGetters } from 'vuex'

import NavHandle from './Nav/Handle'
import Notfound from './Notfound'
import Editor from './Options/Editor'
import Notification from './Notification'
import Minimap from './Nav/Mini/Map'
import Options from './Options'
import Cursorr from './User/Cursorr'
import Message from './User/Message'
import Territory from './Territory'
import Minilist from './Nav/List/'
import Ticker from './Ticker/'
import Overlay from './Overlay/'
import Tour from './Tour'

export default {


  name: 'Mainland',

  components: {
    NavHandle,
    Notfound,
    Editor,
    Notification,
    Minimap,
    Minilist,
    Options,
    Cursorr,
    Message,
    Territory,
    Ticker,
    Overlay,
    Tour,
  },

  props: {
    wantsToView: String,
  },

  data () {
    return { 
      
      notfound: false,
      moreInformation: {},
      secondPath: false,

      desiresNav: true,
      desiresList: true, 
      desiresOverlay: false, 

      editing: false,
      scrolling: false,
      firstScroll: true,
      dragging: false,
      miniDragging: false,
      notifications: [],

      lastScrollX: 0,
      lastScrollY: 0,

      isCompatible: true,

      touring: false,
      tourIsAtOverlay: false,
      tourIsAtLocation: false,
      tourIsAtIsland: false,
      tourIsAtAddressBar: false,
      tourIsAtBBB: false,

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

      'highCPUNotifiction',

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
      'networkConservationMode',

      'territoryByBorders',
      'territoryBySlug',
      'userByName',

      'regionColors',
      'userColors',
      'connectedUsers',
      'notDeletedUsers',
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
          if (!this.firstScroll) {
            this.$router.push('/' + this.location.slug)
          }
        }
      }
    },

    scale(newScale, oldScale) {  
      if (newScale && oldScale) {
        this.recenter(newScale, oldScale) 
      }
    },

    networkConservationMode(newState, oldState) {
      if (newState > oldState) {
        console.log('network conservation mode enabled')
        this.notifications.push(this.highCPUNotifiction)
      } else {
        console.log('network conservation mode disabled')
        this.notifications.forEach(n => {
          if (n.author == 'Server') {
            this.notifications.splice(this.notifications.indexOf(n), 1)
          }
        })
      }
    }

  },

  created() {   

    if (this.isMobile) {
      this.$store.commit('setScale', 8)
      this.$store.commit('setWidthFactor', 3.4)
    }

    this.checkCompatibility()

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
    setTimeout(() => {
      this.firstScroll = false
    }, 1500)

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

    document.addEventListener('keyup', (e) => {
      this.handleInput(e)
    })

    window.addEventListener('resize', () => {
      this.$store.commit('resize', {
        w: window.innerWidth,
        h: window.innerHeight,
      })
    })

    window.onbeforeunload = () => {
      if (this.me) {
        this.$store.dispatch('disconnect')
        if (this.isMobile || this.me.name.includes(this.me.uid)) {
          this.$store.dispatch('deleteUser', this.me)
        }
      }
    }

  },

  sockets: {


    // navigate to a recieved message if it's 
    // an announcement.

    message(message) {
      if (!message.deleted) {
        this.handleLinks(`.message${message.uid} a`)

        if (message.announcement) {
          this.notifications.push(message)

        } else if (message.mentions) {
          if (message.mentions.find(m => m === this.me.name)) {
            this.notifications.push(message)
          }


        } else if (message.stream) {
          console.log(message.content)
          this.$store.commit('setStream', 
            message.content.replace('/stream ', ''))
        }
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
          this.notfound = true
        } else {
          position = this.positionOf(user)
        }


      // routing to territoriees

      } else {
        const territory = this.territories[name]
        if (!territory) {
          if (name !== 'general') {
            console.log('territory not found')
            this.notfound = true
          }
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
            // console.log("going to page", page)
            this.secondPath = true
            position = this.positionOfIsland(page)

            if (position) {
              content = 
                page === 'upload' || page === 'submit' ? { 
                  slug: page, 
                  collection: name
                } : this.territories[name].content[page]

              setTimeout(() => {
                this.secondPath = false
              }, 1000)

            } else {
              this.notfound = true

            }

          }

        }

      }      
      
      // scroll action

      if (!this.notfound) {
        if (force || this.location.slug !== name || page) {
          setTimeout(() => {
            this.scrollTo(position, behavior || 'smooth')
          }, pause || 0)
        }

        
        // setting overlay content

        if (this.location.slug !== name) {
          this.desiresOverlay = false      
        }
        pause = this.isMobile ? 0 : 150

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
            if (page || this.location.slug !== name || force) {
              setTimeout(() => {
                this.desiresOverlay = true        
              }, pause + 150)
            }
          }
        }
        setTimeout(() => {
          this.moreInformation = content
        }, pause)

      } else {
        if (this.firstScroll) {
          setTimeout(() => {
            const position = this.centerOf(this.territories['reception'].borders)
            this.scrollTo(position, 'smooth')
            this.notfound = false
          }, 1000)  
        } else {
          setTimeout(() => {
            this.$router.go(-1)
            this.notfound = false
          }, 1000)
        }

      }

    },

    handleOverlayClose() {
      let pause = 10
      if (this.$router.history.current.path.split('/')[2]) {
        this.$router.push('/' + this.location.slug)
      }
      setTimeout(() => {
        this.desiresOverlay = false
      }, pause)
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
        const key = e.which || e.keyCode
        if (!document.activeElement.classList.contains('input')) {
          if (key == 9) {
            // console.log(document.activeElement)
          } else if (key == 13) {
            document.activeElement.click()
          }
        } else {
          this.$refs.me[0].trackInput(key)
        }
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


    // notifications

    handleNotificationClick(notification) {
      this.notifications = []
      this.scrollTo(
        this.positionOf(notification), 
      'smooth')
    },


    // tour


    startTour() {
      console.log('tour started')
      this.desiresList = true
      this.$refs.options.showParticipants = false
      this.desiresOverlay = false
      this.touring = true
    },


    // go to zone (user, message, or territory).

    goTo(zone, behavior) {
      this.scrollTo(
        this.centerOf(zone), 
      behavior || 'smooth')
    },


    // for scaling

    recenter(newScale, oldScale) {
      const 
        ratio = newScale / oldScale,
        diff = (oldScale - newScale) / (oldScale + newScale),
        center = {
          x: this.$refs.userlandContainer.scrollLeft * ratio - this.windowSize.w * diff,
          y: this.$refs.userlandContainer.scrollTop * ratio - this.windowSize.h * diff,
      }
      this.scrollTo(center, 'auto')
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
      this.dragging = false
    },



    // core of app navigation is this following:

    scrollTo(to, behavior) {
      if (this.dragging) {
        this.$refs.userlandContainer.scroll({
          left: to.x,
          top: to.y,
          behavior: behavior || 'auto'
        })
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
        viewerPos = {
          x: this.$refs.userlandContainer.scrollLeft,
          y: this.$refs.userlandContainer.scrollTop,
        },
        deltaScrollX = viewerPos.x - this.lastScrollX,
        deltaScrollY = viewerPos.y - this.lastScrollY,
        currPos = {
          x: this.me.x * this.windowSize.w * this.scale,
          y: this.me.y * this.windowSize.h * this.scale
        },  
        mePos = {
          x: (currPos.x + deltaScrollX) / (this.windowSize.w * this.scale),
          y:(currPos.y + deltaScrollY) / (this.windowSize.h * this.scale),
          connected: true,
        },
        territory = this.territoryByBorders(viewerPos)
    


      this.$store.commit('viewerPosition', viewerPos)

      if (this.location.slug !== territory.slug) {
        this.$store.commit('setLocation', territory)
      }  

      if (!this.firstScroll) {
    
        if (!this.dragging) {
          this.$store.dispatch('updatePosition', mePos)
        }

        this.lastScrollX = viewerPos.x
        this.lastScrollY = viewerPos.y

      }
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
    },

    showNav() {
      if (this.isMobile) {
        this.desiresOverlay = false
      }
      if (this.touring) {
        this.desiresList = true
        this.$refs.options.showParticipants = false
      }
      this.desiresNav = true
    },

    showOverlay() {
      if (this.isMobile) {
        this.desiresNav = false
      }
      this.desiresOverlay = true
    },

    checkCompatibility() {
      let 
        ua = navigator.userAgent,
        chrome = ua.indexOf("Chrome") > -1,
        firefox = ua.indexOf("Firefox") > -1,
        safari = ua.indexOf("Safari") < -1
      
      if (chrome && safari) {
        safari = false
      }

      this.isCompatible = chrome || firefox
    },

  },
  
  
}
</script>

<style>

main {
  position: relative;
  height: 100%; width: 100%;
  overflow: hidden;

  --one: calc(1.2px * var(--scale));
  --island-back-color: rgba(0, 0, 0, 0.055);
  --island-back-darker: rgba(0, 0, 0, 0.13);
  --island-back:
    url("../../assets/textures/1.png") repeat calc(20px * var(--scale))
  , url("../../assets/textures/2.png") repeat calc(20px * var(--scale))
  ;
  --island-curve: calc(7 * var(--one));
  --small-island-curve: calc(3 * var(--one));
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
  z-index: 1;
  transition: all 0.2s ease;
}

main nav .compatibility {
  max-width: 220px;
  margin: 1vh 0 0 1vh;
  font-size: 12pt;
  padding: 1vh;
}
main nav .compatibility p {
  margin: 0;
}

main nav.hidden {
  left: -100vw;
  /* z-index: 5; */
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
#location div:focus {
  box-shadow: 0 0 10px 0 var(--back);
  outline: 2px solid blue;
  /* background: green; */
}



#userlandContainer {  
  position: absolute;
  height: 100%; width: 100%;
  overflow: scroll;
  transition: filter 0.3s ease;
  cursor: none;
  z-index: 0;
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
  transition: 
    background-color 0.2s ease,
    /* height 0.2s ease,
    width 0.2s ease, */
  ;
}
#userland::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  overflow: hidden;
  opacity: 0.3;
}


.island {
  position: relative;
  box-sizing: border-box;
  background-color: var(--island-back-color);
  box-shadow: var(--island-shadow);
  border-radius: var(--small-island-curve);
  transition: all 0.2s ease;
}
.island::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
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


#notificationContainer {
  position: absolute;
  box-sizing: border-box;
  top: 0; left: 0;
  height: 100%; width: 100%;
  display: flex;
  overflow: scroll;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background-color: var(--half-white);
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
#userland.schedule {
  background-color: var(--schedule);
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



main.obfuscated #userland::before {
  background: 
    url("../../assets/textures/1.png") repeat calc(200px * var(--scale))
  , url("../../assets/textures/2.png") repeat calc(400px * var(--scale))
  ;
}
main.obfuscated .island {
  border-radius: 
    var(--small-island-curve)
    var(--island-curve)
    var(--small-island-curve)
    var(--island-curve)
  ;
}
main.obfuscated .island::before {
  background: var(--island-back);
}

main.blur nav,
main.blur #location,
main.blur #overlay,
main.blur #tickerContainer,
main.blur #userlandContainer {
  filter: blur(10px);
  -webkit-filter: blur(10px);
  /* opacity: 0.5; */
}

main.touring #location,
main.touring .overlayContainer,
main.touring #tickerContainer {
  z-index: 0;
  overflow: visible;
}
main.touring.tourIsAtOverlay .overlayContainer {
  z-index: 4;
}
main.touring.tourIsAtLocation #location {
  z-index: 2;
}
main.touring.tourIsAtLocation #userlandContainer {
  z-index: unset;
}

main.touring.tourIsAtIsland nav {
  z-index: 0;
}
main.touring.tourIsAtIsland #userlandContainer {
  z-index: unset;
}

main.touring.tourIsAtBBB nav,
main.touring.tourIsAtBBB .overlayContainer {
  z-index: 0;
}
main.touring.tourIsAtBBB #userlandContainer {
  z-index: unset;
}

#addressBar {
  position: absolute;
  top: 0; left: 30%;
}



#userlandContainer.dragging {
  user-select: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}



.mobile #location div {
  /* padding: 0.65vh 0.75vh 0.8vh 0.75vh; */
}

.mobile nav {
  width: 100%;
  align-items: stretch;
  padding-right: 1vh;
}

.mobile nav .compatibility {
  max-width: 70vw;
}
.mobile nav.hidden {
  left: -100vw;
  z-index: 3;
}
.mobile nav {
}

.mobile #userlandContainer {  
  cursor: default;
}
</style>