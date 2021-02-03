<template>
  <div :style="getUserColors()">
    <header :class="{ blur: !registered || editing }" >

      <Minimap 
        :dragging="dragging"
        :miniDragging="miniDragging"

        :users="getNotDeletedUsers()"
        :messages="getNotDeletedMessages()"
        :islands="islands"

        @miniDragging="miniDragging=true"
        @miniStopDragging="miniDragging=false"
        @newPosition="scrollTo($event, miniDragging ? 'auto' : 'smooth')"
        @zero="centerMe"
      />

      <Options
        :editing="editing"
        :name="me.name"
        :color="me.color"
        :usernames="getUserNames()"

        @editMe="editing = true"
        @newColor="updateColor"
        @newMe="updateAppearance"
        @register="saveMe"
        @deleteMe="deleteMe()"
        @deleteEverything="deleteEverything()"
      />

      <Userslist
        :me="me"
        :users="getNotDeletedUsers()"
        :messages="messages"

        @censorMessage="censorMessage($event)"
        @deleteMessage="deleteMessage($event)"
        @deleteUser="deleteUser($event)"
        @goTo="scrollTo(getPosition($event), 'smooth')"
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

        <User
          v-for="user in getNotDeletedUsers()"
          :ref="user.uid === me.uid ? 'me' : 'Users'"
          :key="user.uid"
          :user="user"
          :isMe="user.uid === me.uid"
          :messages="getUserMessages(user)"
          @deleteMessage="deleteMessage($event)"
          @newPosition="updatePosition"
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

import Grid from './Grid'
import Minimap from './Mini/Map'
import Options from './Options'
import Userslist from './Users'
import User from './User'

import Territory from './Territory'


let 
  userDBs = [], 
  largestUserDB = {},
  messagesDBs = [],
  largestMessageDB = {}
  
      // const center = {
      //   x: (this.scale * this.windowWidth - this.windowLeft) / 2,
      //   y: (this.scale * this.windowHeight - this.windowTop) / 2
      // }


export default {
  name: 'Mainland',
  components: {
    Grid,
    Minimap,
    Options,
    Userslist,
    User,
    Territory,
  },
  props: {
    wantsToView: String
  },
  data () {
    return {
      me: {
        uid: uid(),
        connected: false,
        name: 'newUser-' + uid(),
        color: this.randomColor(),
        x: 0,
        y: 0,
        typing: null,
      },
      users: {},
      messages: {},

      islands: [
        { 
          name: 'center',
          borders: {
            x: 0.4,
            y: 0.4,
          },
        },
      ],

      editing: false,
      scrolling: false,
      dragging: false,
      miniDragging: false,
    }
  },

  computed: mapState([
    'version',
    'doNotSave',

    'registered',
    'visited',

    'scale',
    'windowWidth',
    'windowHeight',
    'windowLeft',
    'windowTop',
  ]),

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
      localStorage.uid = this.me.uid
      localStorage.color = this.me.color
    }

    // check if user hsa a DB of users

    if (localStorage.users) {
      this.users = JSON.parse(localStorage.users)
    }
    this.users[this.me.uid] = this.me

    // check if user hsa a DB of messages

    if (localStorage.messages) {
      this.messages = JSON.parse(localStorage.messages)
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
        this.scrollTo(this.toPixels(this.islands[0].borders), 'smooth')
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
        this.$socket.emit('user', this.me)
      }
    },

    user(data) {
      const user = JSON.parse(data)
      if (user.uid !== this.me.uid) {
        this.$set(this.users, user.uid, user)
      } else if (user.deleted === true) {
        this.me.deleted = true
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
      this.$set(this.messages, message.uid, message)
      this.$socket.emit('messages', this.messages)
      if (message.announcement && (message.author !== this.me.uid)) {
        this.scrollTo(this.getPosition(message), 'smooth')
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

    position(data) {
      const user = JSON.parse(data)
      if (user.uid !== this.me.uid) {
        this.$set(this.users, user.uid, user)
        localStorage.users = JSON.stringify(this.users)
      }
    },

    appearance(data) {
      const user = JSON.parse(data)
      if (user.uid !== this.me.uid) {
        this.$set(this.users, user.uid, user)
        localStorage.users = JSON.stringify(this.users)
      }
    },

    typing(data) {
      const user = JSON.parse(data)
      if (user.uid !== this.me.uid) {
        this.$set(this.users, user.uid, user)
        localStorage.users = JSON.stringify(this.users)
      }
    },

    userDisconnect(data) {
      const user = JSON.parse(data)
      if (user.uid !== this.me.uid) {
        this.$set(this.users, user.uid, user)
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
      if (!this.doNotSave) {
        localStorage.me = JSON.stringify(this.me)
        for (let uid in this.users) {
          if (uid !== this.me.uid) {
            const user = this.users[uid]
            user.connected = false
            this.$set(this.users, uid, user)
          } 
        }
      }
      localStorage.users = JSON.stringify(this.users)
      localStorage.messages = JSON.stringify(this.messages)
    },


  },
  methods: {

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
      user.deleted = true
      this.getUserMessages(user).forEach((m) =>  {
        this.messages[m.uid].deleted = true
      })
      this.$socket.emit('user', user)
    },

    deleteMessage(message) {
      this.messages[message.uid].deleted = true
      this.$socket.emit('message', message)
    },

    censorMessage(message) {
      this.messages[message.uid].censored = !this.messages[message.uid].censored
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
      this.$socket.emit('position', this.me)
    },

    updateTyping(text) {
      this.me.typing = text
      this.$socket.emit('typing', this.me)
    },

    updateColor(newLook) {
      this.me.color = newLook.color
      this.$socket.emit('appearance', this.me)
      localStorage.me = JSON.stringify(this.me)
    },

    updateAppearance(newLook) {
      this.me.name = newLook.name
      this.me.color = newLook.color
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
          this.$set(this.users, uid, user)
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
        this.$set(this.messages, uid, message)
      }
      localStorage.messages = JSON.stringify(this.messages)

      // complete sync by clearing carrier variables
      // messagesDBs = []
      // largestMessageDB = {}
    },

    route(type, name) {
      let position
      if (type == 'user') {
        const user = this.findUser(name)
        if (user) {
          position = this.getPosition(user)
        } else {
          console.log('not found')
        }
      } else if (type == 'territory') {
        const territory =  this.findTerritory(name)
        if (territory) {
          position = this.toPixels(territory.borders)
        } else {
          console.log('not found')
        }
      }
      this.scrollTo(position, 'smooth')
    },

    findTerritory(name) {
      return this.islands.find(u => u.name == name) 
    },

    findUser(name) {
      let usersArray = Object.values(this.users)
      let found = usersArray.find(u => u.name == name) 
      if (found) {
        return this.users[found.uid] 
      }
    },

    getUserColors() {
      let usercolors = {}
      for (let uid in this.users) {
        const user = this.users[uid]
        usercolors[`--${uid}`] = user.connected ? user.color : 'lightgrey'
      }
      return usercolors
    },

    getConnectedUsers() {
      const notdeleted = this.getNotDeletedUsers()
      const connected = notdeleted.filter(u => u.connected === true)
      return connected    
    },

    getUserNames() {
      const notdeleted = this.getNotDeletedUsers()
      const usernames = notdeleted.map(user => user.name)
      return usernames
    },

    getNotDeletedUsers() {
      const userArray = Object.values(this.users)
      const notdeleted = userArray.filter(u => u.deleted !== true)
      return notdeleted
    },

    getNotDeletedMessages() {
      const messagesArray = Object.values(this.messages)
      const notdeleted = messagesArray.filter(m => m.deleted !== true)
      return notdeleted
    },

    getUserMessages(user) {
      let userMessages = []
      for(let uid in this.messages) {
        const message = this.messages[uid]
        if (message.author == user.uid && !message.deleted) {
          userMessages.push(message)
        }
      }
      return userMessages
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
        this.scrollTo(this.getPosition({x: 0.5, y: 0.5}), 'smooth')
      }, 50)
    },

    scrollTo(to, behavior) {
      this.$refs.userlandContainer.scroll({
        left: to.x,
        top: to.y,
        behavior: behavior || 'auto'
      })
    },

    getPosition(obj) {
      obj = this.toPixels(obj)
      return {
        x: obj.x - this.windowWidth / 2,
        y: obj.y - this.windowHeight / 2
      }
    },

    getCenter(obj) {
      obj = this.toPixels(obj)
      console.log(obj)
      return {
        x: obj.x - obj.w / 2,
        y: obj.y - obj.h / 2,
        w: obj.w ? obj.w : 0,
        h: obj.h ? obj.h : 0,
      }
    },

    toPixels(coords) {
      return {
        x: coords.x * this.scale * this.windowWidth,
        y: coords.y * this.scale * this.windowHeight,
        w: coords.w ? coords.w : 0,
        h: coords.h ? coords.h : 0,
      }
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

    setViewerPosition() {
      this.$store.commit('viewerPosition', {
        x: this.$refs.userlandContainer.scrollLeft, 
        y: this.$refs.userlandContainer.scrollTop
      })
    },

    track() {
      let 
        input = this.$refs.me[0].$refs.Cursor.$refs.input, // :]
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

          const msgs = this.getUserMessages(this.me)

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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 0;
  z-index: 2;
  transition: filter 0.3s ease;
}
header h1 {
  font-family: 'zxx-noise';
  font-size: 30px;
  opacity: 0.4;
  margin-left: 2vh;
}
#userlandContainer {  
  cursor: none;
  box-sizing: border-box;
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
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
  /* cursor: none; */
  box-sizing: border-box;
  position: absolute;
  margin: auto;
  /* position: relative; */
  top: 0px;
  left: 0px;
  overflow: hidden;
  font-family: jet;
  /* font-size: 9pt; */
  background: white;
  transform-origin: center;
  font-size: calc(1.8pt * var(--scale));
  /* font-family: 'zxx-noise'; */
  /* font-family: 'zxx-false'; */
  /* font-family: 'terminal';
  font-size: 10pt; */
  /* background: rgba(0, 0, 0, 0.05); */
}

/* header.blur, */
header.blur h1,
header.blur #minimap,
/* header.blur #options .title, */
/* header.blur #options div, */
header.blur #userlist,
#userlandContainer.blur {
  filter: blur(10px);
}



</style>