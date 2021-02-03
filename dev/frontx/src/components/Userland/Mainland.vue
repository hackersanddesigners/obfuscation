<template>
  <div :style="userColors">
    <header :class="{ blur: !registered || editing }" >

      <Minimap 
        :dragging="dragging"
        :miniDragging="miniDragging"

        @miniDragging="miniDragging=true"
        @miniStopDragging="miniDragging=false"
        @newPosition="scrollTo($event, miniDragging ? 'auto' : 'smooth')"
        @zero="centerMe"
      />

      <Options
        :editing="editing"
        :name="me.name"
        :color="me.color"
        :usernames="userNames"

        @editMe="editing = true"
        @newColor="updateColor"
        @newMe="updateAppearance"
        @register="saveMe"
        @deleteMe="deleteMe"
        @deleteEverything="deleteEverything"
      />

      <Userslist
        @censorMessage="censorMessage($event)"
        @deleteMessage="deleteMessage($event)"
        @deleteUser="deleteUser($event)"
        @goTo="scrollTo(positionOf($event), 'smooth')"
      />
      
    </header>
    <div 
      id="userlandContainer" 
      ref="userlandContainer"
      :class="{ 
        blur: !registered || editing,
        dragging: dragging
      }"
      @scroll="setViewerPosition()"
    >
      <div 
        id="userland" 
        ref="userland"
        :style="{
          height: `${ 100 * scale }%`,
          width: `${ 100 * scale }%`,
          '--scale': scale
        }"
        @mousedown.stop="dragging=true"
        @mousemove="dragging ? drag($event) : null"
        @mouseup.stop="dragging=false"
      >

        <Grid />

        <!-- CURSORS AND MESSAGES -->

        <Cursorr
          v-for="user in notDeletedUsers"
          :key="user.uid"
          :ref="isMe(user) ? 'me' : 'Users'"

          :user="user"
          :isMe="isMe(user)"
          :hovered="hovered"
          :dragging="isMe(user) ? dragging : null"

          @mouseover.native="!isMe(user) ? hovered=true : null"
          @mouseleave.native="hovered=false"

          @newPosition="updatePosition"
        />

        <Message
          v-for="message in notDeletedMessages"
          ref="Messages"

          :key="message.uid"
          :message="message"
          :isMe="message.author === me.uid"

          @deleteMessage="deleteMessage($event)"
          @mouseover.native="hovered=true"
          @mouseleave.native="hovered=false"
        />

        <!-- ISLANDS -->

        <Territory
          v-for="island in islands"
          :key='island.name'
          :name="island.name"
          :borders="island.borders"
        />

        <!-- OVERLAYS -->


      </div>
    </div>
  </div>
</template>

<script>
import { uid } from 'uid'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

import Grid from './Grid'
import Minimap from './Mini/Map'
import Options from './Options'
import Userslist from './Users'
import Cursorr from './User/Cursorr'
import Message from './User/Message'
import Territory from './Territory'



let 
  userDBs = [], 
  largestUserDB = {},
  messagesDBs = [],
  largestMessageDB = {}



export default {
  name: 'Mainland',

  components: {
    Grid,
    Minimap,
    Options,
    Userslist,
    Cursorr,
    Message,
    Territory,
  },

  props: {
    wantsToView: Object
  },

  data () {
    return {

      doNotSave: false,
      
      me: Object,

      editing: false,
      scrolling: false,
      dragging: false,
      miniDragging: false,
      hovered: false,

    }
  },

  computed: {
    ...mapState([

      'version',

      'registered',
      'visited',

      'users',
      'messages',
      'islands',

      'scale',
      'windowWidth',
      'windowHeight',
      'windowLeft',
      'windowTop',

    ]),
    ...mapGetters([

      'islandByName',
      'messagesByUser',
      'userByName',

      'userColors',
      'userNames',
      'connectedUsers',
      'notDeletedUsers',
      'notDeletedMessages',

      'centerOf',
      'positionOf',
      'pixelsFrom'

    ])
  },

  watch: {
    wantsToView(thing) {
      this.route(thing.type, thing.name)
    }
  },

  created() {

    // delete everything if local storage version is older than this version
    
    console.log(`Version: ${ localStorage.version }`)

    if (localStorage.version != this.version) {
      console.log('this version is outdated, clearing your storage.')

      localStorage.clear()
      localStorage.version = this.version
    }      

    // check if user is registered and get their datas 
    
    if (localStorage.me) {
      this.$store.commit('register')
      this.me = JSON.parse(localStorage.me)

      if (this.me.deleted) {
        this.$store.commit('block')
      }

    // if not registered, check if previously visited and get the
    // previously defined UID

    } else if (localStorage.uid) {
      this.$store.commit('visit')
      this.me.uid = localStorage.uid
      this.me.color = localStorage.color


    // if not visited, store the generated UID and color for 
    // later reference (e.i. when the user comes back to register) 

    } else {

      this.me = {
        uid: uid(),
        connected: false,
        name: 'newUser-' + uid(),
        color: this.randomColor(),
        x: 0,
        y: 0,
        typing: null,
      },

      localStorage.uid = this.me.uid
      localStorage.color = this.me.color
    }

    this.$store.commit('setUser', { ...this.me })
    this.$store.commit('setUID', this.me.uid)

    // check if user hsa a DB of users

    if (localStorage.users) {
      this.$store.commit('setUsers', JSON.parse(localStorage.users))
    }

    // check if user hsa a DB of messages

    if (localStorage.messages) {
      this.$store.commit('setMessages', JSON.parse(localStorage.messages))
    }

  },
  mounted() {
    if (!this.me.deleted) {

      // UI set-up
        
      window.addEventListener('resize', () => {
        this.$store.commit('resize')
      })

      this.setViewerPosition()

      // if there is a slug, navigate to it

      if (this.wantsToView) {
        this.route(this.wantsToView.type, this.wantsToView.name)

      // else, land in the center

      } else {
        setTimeout(() => {   
          this.scrollTo(this.pixelsFrom(this.islands[0].borders), 'smooth')
        }, 50)
      }

      // start tracking cursor

      this.track()

    }
  },
  sockets: {

    connect() { 
      if (!this.me.deleted) {
        this.me.connected = true   
        this.$store.commit('setUser', { ...this.me })
        this.$socket.emit('user', this.me)
      }
    },

    user(data) {
      const user = JSON.parse(data)
      if (user.uid !== this.me.uid) {
        // this.$set(this.users, user.uid, user)
        this.$store.commit('setUser', user)
      } else if (user.deleted === true) {
        this.me.deleted = true
        this.$store.commit('setUser', { ...this.me })
        localStorage.me = JSON.stringify(this.me)
        window.location.reload(true)
      }
      this.$socket.emit('users', this.users)
      this.$socket.emit('messages', this.messages)
    },

    users(data) {
      const receivedDB = JSON.parse(data)
      // const numberOfUsers = (this.getConnectedUsers()).length
      // if (userDBs.length < numberOfUsers) {
        // console.log(userDBs.length, numberOfUsers)
        userDBs.push(receivedDB)   
      // } else if (userDBs.length == numberOfUsers) {
        // console.log(userDBs.length, numberOfUsers)
        console.log(`Syncing ${userDBs.length} user DBs.`)
        this.userDBsync()
      // } else if (userDBs.length > numberOfUsers) {
        // console.log('too many dbs, you did something wrong')
      // }
    },

    message(data) {
      const message = JSON.parse(data)
      // this.$set(this.messages, message.uid, message)
      this.$store.commit('setMessage', message)
      this.$socket.emit('messages', this.messages)
      if (message.announcement && (message.author !== this.me.uid)) {
        this.scrollTo(this.positionOf(message), 'smooth')
      }
    },

    messages(data) {
      const receivedDB = JSON.parse(data)
      // const numberOfUsers = (this.getConnectedUsers()).length
      // if (messagesDBs.length < numberOfUsers) {
        messagesDBs.push(receivedDB)      
      // } else if (messagesDBs.length == numberOfUsers) {
        console.log(`Syncing ${messagesDBs.length} message DBs.`)
        this.messageDBsync()
      // } else if (messagesDBs.length > numberOfUsers) {
        // console.log('too many dbs, you did something wrong')
      // }
    },

    appearance(data) {
      const user = JSON.parse(data)
      if (user.uid !== this.me.uid) {
        this.$store.commit('setUser', user)
        localStorage.users = JSON.stringify(this.users)
      }
    },

    clearDBs() {
      // mark all users as deleted
      this.users = {}
      localStorage.users = JSON.stringify(this.users)
      // mark all messages as deleted
      this.messages = {}
      localStorage.messages = JSON.stringify(this.messages)

      window.location.reload(true)
    },

    disconnect() { 
      this.me.connected = false 
      this.$store.commit('setUser', { ...this.me })
      if (!this.doNotSave) {
        localStorage.me = JSON.stringify(this.me)
        for (let uid in this.users) {
          if (uid !== this.me.uid) {
            const user = { ...this.users[uid] }
            user.connected = false
            this.$store.commit('setUser', user)
          } 
        }
      }
      localStorage.users = JSON.stringify(this.users)
      localStorage.messages = JSON.stringify(this.messages)
    },


  },
  methods: {

    isMe(user) {
      return user.uid === this.me.uid
    },

    saveMe(newLook) {
      this.me.name = newLook.name
      this.me.color = newLook.color
      this.$socket.emit('user', this.me)      
      this.$store.commit('register')
      this.editing = false
      localStorage.me = JSON.stringify(this.me)
    },

    deleteMe() {
      this.deleteUser(this.me)
      this.doNotSave = true
      localStorage.removeItem('me')
      localStorage.removeItem('uid')
      localStorage.removeItem('color')
      window.location.reload(true)
    },

    deleteUser(user) {
      this.messagesByUser(user).forEach((m) =>  {
        this.deleteMessage(this.messages[m.uid])
      })
      this.$store.commit('deleteUser', user)
      this.$socket.emit('user', user)
    },

    deleteMessage(message) {
      this.$store.commit('deleteMessage', message)
      this.$socket.emit('message', message)
    },

    censorMessage(message) {
      this.$store.commit('censorMessage', message)
      this.$socket.emit('message', message)
    },

    deleteEverything() {
      this.$socket.emit('clearDBs')
    },

    updatePosition(newPosition) {
      let x = (this.windowLeft + newPosition.x) / (this.windowWidth * this.scale)
      let y = (this.windowTop + newPosition.y) / (this.windowHeight * this.scale)
      this.me.x = x
      this.me.y = y
      this.me.connected = true
      this.$store.commit('setUser', { ...this.me })
      this.$socket.emit('appearance', this.me)
    },

    updateTyping(text) {
      this.me.typing = text
      this.$store.commit('setUser', { ...this.me })
      this.$socket.emit('appearance', this.me)
    },

    updateColor(newLook) {
      this.me.color = newLook.color
      this.$store.commit('setUser', { ...this.me })
      this.$socket.emit('appearance', this.me)
    },

    updateAppearance(newLook) {
      this.me.name = newLook.name
      this.me.color = newLook.color
      this.$store.commit('setUser', { ...this.me })
      this.$socket.emit('appearance', this.me)
      this.editing = false
      localStorage.me = JSON.stringify(this.me)
    },

    sendMessage(message) {
      if (message.content && message.content != ' ') {
        this.$socket.emit('message', message)
      }
    },

    constructMessage(text) {
      const time = ((new Date()).getTime())
      const message = {
        uid: this.me.uid + time,
        author: this.me.uid,
        content: text,
        time: time,
        color: this.me.color,
        x: this.me.x,
        y: this.me.y,
        deleted: false,
        censored: false,
        announcement: false
      }
      return message
    },

    userDBsync() {

      // get the DB with the most users
      userDBs.sort((a, b) => Object.keys(b).length -  Object.keys(a).length)
      largestUserDB = userDBs[0]

      // iterate through each db to fully merge
      userDBs.forEach(DB => {

        // for every user in every DB
        for (let uid in DB) {

          // if user doesnt exist in your largest db, add them        
          if (!largestUserDB[uid]) {
            largestUserDB[uid] = DB[uid] 
          }

          // if user is marked as deleted, mark them as deleted
          if (DB[uid].deleted) {
            largestUserDB[uid].deleted = true
          }

          // if user has changed their name, inherit it
          if (!DB[uid].name.startsWith('newUser-')) {
            largestUserDB[uid].name = DB[uid].name
          }
        }
      })

      // point your own user DB to the newly merged largest DDB
      for (let uid in largestUserDB) {
        const user = largestUserDB[uid]
        if (uid !== this.me.uid) {
          // this.$set(this.users, uid, user)
          this.$store.commit('setUser', user)
        } 
      }
      localStorage.users = JSON.stringify(this.users)

      // complete sync by clearing carrier variables
      // userDBs = []
      // largestUserDB = {}
    },

    messageDBsync() {

      // get the DB with the most messagess
      messagesDBs.sort((a, b) => Object.keys(b).length -  Object.keys(a).length)
      largestMessageDB = messagesDBs[0]

      // iterate through each db to fully merge
      messagesDBs.forEach(DB => {

        // for every message in every DB
        for (let uid in DB) {

          // if message doesnt exist in largest db, add it        
          if (!largestMessageDB[uid]) {
            largestMessageDB[uid] = DB[uid]   
          }

          // if message is marked as deleted, mark it as deleted
          if (DB[uid].deleted) {
            largestMessageDB[uid].deleted = true
          }
          if (DB[uid].censored) {
            largestMessageDB[uid].censored = true
          }
        }
      })

      // point your own message DB to the newly merged largest DB
      for (let uid in largestMessageDB) {
        const message = largestMessageDB[uid]
        // this.$set(this.messages, uid, message)
        this.$store.commit('setMessage', message)
      }
      localStorage.messages = JSON.stringify(this.messages)

      // complete sync by clearing carrier variables
      // messagesDBs = []
      // largestMessageDB = {}
    },

    route(type, name) {
      let position
      if (type == 'user') {
        const user = this.userByName(name)
        if (user) {
          position = this.positionOf(user)
        } else {
          console.log('not found')
        }
      } else if (type == 'territory') {
        const territory =  this.islandByName(name)
        if (territory) {
          position = this.pixelsFrom(territory.borders)
        } else {
          console.log('not found')
        }
      }
      this.scrollTo(position, 'smooth')
    },

    drag(e) {
      this.scrollTo({
        x: this.windowLeft - e.movementX,
        y: this.windowTop - e.movementY
      })
    },

    centerMe() {
      this.$store.commit('zero')
      setTimeout(() => {
        this.scrollTo(this.positionOf({x: 0.5, y: 0.5}), 'smooth')
      }, 50)
    },

    scrollTo(to, behavior) {
      this.$refs.userlandContainer.scroll({
        left: to.x,
        top: to.y,
        behavior: behavior || 'auto'
      })
    },

    setViewerPosition() {
      this.$store.commit('viewerPosition', {
        x: this.$refs.userlandContainer.scrollLeft, 
        y: this.$refs.userlandContainer.scrollTop
      })
    },

    randomColor() {
      const 
        r = Math.floor(Math.random() * 256),
        g = Math.floor(Math.random() * 256),
        b = Math.floor(Math.random() * 256),
        a = 1,
        color = `rgb(${r}, ${g}, ${b}, ${a})`
      return color
    },

    track() {
      let 
        input = this.$refs.me[0].$refs.input, // :]
        current,
        navigation,
        announcement

      this.$refs.userlandContainer.addEventListener('keyup', (e) => {
        if (this.registered && !this.editing) {

          const key = e.which || e.keyCode

          if (input !== document.activeElement) {
            input.focus()
            if (key >= 48 && key <= 90) {
              const char = String.fromCharCode(key)
              input.value = char              
            }
          }

          if (input.value == "~") {
            navigation = true
          } else if (input.value == '!') {
            announcement = true
          }

          const msgs = this.messagesByUser(this.me)

          const 
            first = msgs[0],
            last = msgs[msgs.length-1],
            previous = msgs[msgs.indexOf(current) - 1],
            next = msgs[msgs.indexOf(current) + 1]

          if (key == 38) {
            if (!current) {
              current = last
            } else if (previous) {
              current = previous
            } else {
              current = first
            } 
            input.value = current.content
            input.select()

          } else if (key == 40) {
            if (current && next) {
              current = next
              input.value = current.content
              input.select()
            }

          } else if (key == 13) {

            const message = this.constructMessage(input.value)

            if (announcement) {
              message.announcement = true
              announcement = false

            } else if (navigation) {
              message.navigation = true
              this.$router.push(input.value)
              navigation = false
      
            }

            this.sendMessage(message)
            current = undefined

            input.value = ''
            input.placeholder = ''

          } else if (key == 27) {
            input.value = ''
            input.blur()
          }

          this.updateTyping(input.value)

          e.stopPropagation()
          e.preventDefault()
        }
      })

      this.$refs.userlandContainer.addEventListener('click', () => {
        if (this.registered && !this.editing && !this.dragging) {
          input.focus()

          const message = this.constructMessage(input.value)

          this.sendMessage(message)

          current = undefined
          input.value = ''
          input.placeholder = ''

        }
      })

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

header.blur h1,
header.blur #minimap,
header.blur #userlist,
#userlandContainer.blur {
  filter: blur(10px);
}

</style>