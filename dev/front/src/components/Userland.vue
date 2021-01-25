<template>
  <div>
    <header :class="{ blur: !registered || editing }" >
      <h1>platframe</h1>
      <Minimap 
        :windowWidth="windowWidth"
        :windowHeight="windowHeight"
        :windowLeft="windowLeft"
        :windowTop="windowTop"
        :scale="scale"

        :me="me"
        :users="users"

        @newPosition="scrollTo($event)"
      />
      <Options
        :registered="registered"
        :editing="editing"
        :name="me.name"
        :color="me.color"
        :grid="grid"
        :usernames="getUserNames()"

        @grid="grid = !grid"
        @editMe="editing = true"
        @newColor="updateColor"
        @newMe="updateAppearance"
        @register="saveMe"
        @deleteMe="deleteMe()"
        @deleteEverything="deleteEverything()"
      />
      <Userlist
        :me="me"
        :users="users"

        @goTo="scrollTo(getUserPosition($event), 'smooth')"
      />
    </header>
    <div 
      id="userlandContainer" 
      ref="userlandContainer"
      :class="{ blur: !registered || editing }"
    >
      <div 
        id="userland" 
        ref="userland"
        :style="{
          height: `${ 100 * scale }%`,
          width: `${ 100 * scale }%`
        }"
      >
        <Grid 
          :scale="scale"
          :hidden="!grid"
        />
        <User 
          ref="me"
          :key="me.uid"
          :user="me"
          :isMe="true"
          :messages="getUserMessages(me)"

          @newPosition="updatePosition"
        />
        <User
          v-for="user in users"
          ref="Users"
          :key="user.uid"
          :user="user"
          :messages="getUserMessages(user)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { uid } from 'uid'
import smoothscroll from 'smoothscroll-polyfill'

import Grid from './Grid'
import Minimap from './Minimap'
import Options from './Options'
import Userlist from './Userlist'
import User from './User'


let 
  userDBs = [], 
  largestUserDB,
  messagesDBs = [],
  largestMessageDB

export default {
  name: 'Userland',
  components: {
    Grid,
    Minimap,
    Options,
    Userlist,
    User
  },
  props: [
    'wantsToView'
  ],
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

      registered: localStorage.me,
      visited: localStorage.uid,
      hasUsers: localStorage.users,
      hasMessages: localStorage.messages,

      doNotSave: false,

      editing: false,
      scrolling: false,
      dragging: false,

      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      windowLeft: null,
      windowTop: null,
      scale: 5,
      grid: false,
    }
  },
  created() {

    // check if user is registered and get their datas value
    
    if (this.registered) {
      this.me = JSON.parse(localStorage.me)

    // if not registered, check if previously visited and get the
    // previously defined UID

    } else if (this.visited) {
      this.me.uid = localStorage.uid
      this.me.color = localStorage.color

    // if not visited, store the generated UID and color for 
    // later reference (e.i. when the user comes back to register) 

    } else {
      localStorage.uid = this.me.uid
      localStorage.color = this.me.color
    }

    // check if user hsa a DB of users

    if (this.hasUsers) {
      this.users = JSON.parse(localStorage.users)
    }

    // check if user hsa a DB of messages

    if (this.hasMessages) {
      this.messages = JSON.parse(localStorage.messages)
    }

  },
  mounted() {

    // start tracking cursor

    this.track()

    smoothscroll.polyfill()

    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
    })

    const userlandContainer = this.$refs.userlandContainer
      
    this.windowLeft = userlandContainer.scrollLeft
    this.windowTop = userlandContainer.scrollTop

    userlandContainer.addEventListener('scroll', () => {
      this.windowLeft = userlandContainer.scrollLeft
      this.windowTop = userlandContainer.scrollTop
    })


    let firstPosition

    if (this.wantsToView) {
      const type = this.wantsToView.type
      const name = this.wantsToView.name
      if (type == 'user') {
        const user = this.findUser(name)
        firstPosition = this.getUserPosition(user)

      } else if (type == 'page') {
        console.log('page')
      }

    } else {
      const center = { 
        x: (this.$refs.userland.offsetWidth - window.innerWidth) / 2,
        y: (this.$refs.userland.offsetHeight - window.innerHeight) / 2
      }
      firstPosition = center
    }

    this.scrollTo(firstPosition, 'smooth')

  },
  sockets: {

    connect() { 
      this.me.connected = true 
      this.$socket.emit('user', this.me)
    },

    disconnect() { 
      this.me.connected = false 
      if (!this.doNotSave) {
        localStorage.me = JSON.stringify(this.me)
        localStorage.users = JSON.stringify(this.users)
        localStorage.messages = JSON.stringify(this.messages)
      }
    },

    user(data) {
      const user = JSON.parse(data)
      if (user.uid !== this.me.uid) {
        this.$set(this.users, user.uid, user)
        this.$socket.emit('users', this.users)
      }
    },

    users(data) {
      const receivedDB = JSON.parse(data)
      userDBs.push(receivedDB)
      userDBs.sort((a, b) => Object.keys(b).length -  Object.keys(a).length)
      largestUserDB = userDBs[0]
      userDBs.forEach(DB => {
        for (let uid in DB) {
          if (!largestUserDB[uid]) {
            if (uid !== this.me.uid) {
              largestUserDB[uid] = DB[uid]            
            } else {
              console.log('false alarm, its you.')
            }
          }
        }
      })
      for (let uid in largestUserDB) {
        const user = largestUserDB[uid]
        if (uid !== this.me.uid) {
          this.$set(this.users, uid, user)
        } 
      }
      localStorage.users = JSON.stringify(this.users)
    },

    message(data) {
      const message = JSON.parse(data)
      this.$set(this.messages, message.uid, message)
      this.$socket.emit('messages', this.messages)
    },

    messages(data) {
      const receivedDB = JSON.parse(data)
      messagesDBs.push(receivedDB)
      messagesDBs.sort((a, b) => Object.keys(b).length -  Object.keys(a).length)
      largestMessageDB = messagesDBs[0]
      messagesDBs.forEach(DB => {
        for (let uid in DB) {
          if (!largestMessageDB[uid]) {
            largestMessageDB[uid] = DB[uid]   
          }
        }
      })
      for (let uid in largestMessageDB) {
        const message = largestMessageDB[uid]
        this.$set(this.messages, uid, message)
      }
      localStorage.messages = JSON.stringify(this.messages)
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
      this.users = {}
      localStorage.users = JSON.stringify(this.users)
      this.messages = {}
      localStorage.messages = JSON.stringify(this.messages)

      window.location.reload(true)
    },

  },
  methods: {

    saveMe(newLook) {
      this.me.name = newLook.name
      this.me.color = newLook.color
      this.$socket.emit('user', this.me)
      this.registered = true
      this.editing = false
      localStorage.me = JSON.stringify(this.me)
    },

    deleteMe() {
      this.me.deleted = true
      this.getUserMessages(this.me).forEach(m => m.deleted = true)
      this.$socket.emit('user', this.me)
      this.$socket.emit('message', {})
      this.doNotSave = true
      localStorage.clear()
      window.location.reload(true)
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

    updateTyping(text) {
      this.me.typing = text
      this.$socket.emit('typing', this.me)
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
        x: this.me.x,
        y: this.me.y,
      }
      return message
    },

    findUser(name) {
      let usersArray = Object.values(this.users)
      let found = usersArray.find(u => u.name == name) 
      return this.users[found.uid] 
    },

    getUserPosition(user) {
      user = this.toPixels(user)
      return {
        x: user.x - this.windowWidth / 2,
        y: user.y - this.windowHeight / 2
      }
    },

    getUserNames() {
      let usersArray = Object.values(this.users)
      let usernames = usersArray.map(user => user.name);
      return usernames
    },

    getUserMessages(user) {
      let userMessages = []
      for(let uid in this.messages) {
        const message = this.messages[uid]
        if (message.author == user.uid) {
          userMessages.push(message)
        }
      }
      return userMessages
    },

    toPixels(coords) {
      return {
        x: coords.x * this.scale * this.windowWidth,
        y: coords.y * this.scale * this.windowHeight 
      }
    },

    scrollTo(to, behavior) {
      this.$refs.userlandContainer.scroll({
        left: to.x,
        top: to.y,
        behavior: behavior || 'auto'
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
      let input = this.$refs.me.$refs.Cursor.$refs.input // :]
      let current
      let navigation

      document.addEventListener('keyup', (e) => {
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

            if (navigation) {
              const name = input.value.slice(1)
              const user = this.findUser(name)
              this.scrollTo(this.getUserPosition(user), 'smooth')
              navigation = false
            
            } else {
              const message = this.constructMessage(input.value)
              this.sendMessage(message)
              current = undefined
            }

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

      document.addEventListener('click', () => {
        if (this.registered && !this.editing) {

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
  z-index: 1;
  transition: filter 0.3s ease;

}
header h1 {
  margin-left: 2vh;
}
#userlandContainer {
  cursor: none;
  box-sizing: border-box;
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
#userland {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  font-family: monospace;
  font-size: 9pt;
  background: rgba(0, 0, 0, 0.05);
}
header.blur h1,
header.blur #minimap,
/* header.blur #options .title,
header.blur #options div, */
header.blur #userlist,
#userlandContainer.blur {
  filter: blur(10px);
}

</style>