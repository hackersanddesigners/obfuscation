<template>
  <div>
    <Register
      v-if="!registered" 
      :me="me"
      @registered="saveMe"
    />
    <EditUser
      v-if="editing" 
      :me="me"
      @editeduser="saveMe"
    />
    <header :class="{ blur: !registered || editing }" >
      <h1>platframe</h1>
      <Minimap 
        :windowWidth="windowWidth"
        :windowHeight="windowHeight"
        :windowLeft="windowLeft"
        :windowTop="windowTop"
        :zoomIndex="zoomIndex"

        @newPosition="scrollTo($event)"
      />
      <div id="tools">
        <span class="title"> options </span>
        <div class="grid">
          <input 
            type="button" 
            name="grid" 
            :value="grid ? 'hide grid' : 'show grid'" 
            @click="toggleGrid($event)"
          />
        </div>
        <!-- <div class="messages">
          <input
            type="button"
            name="messages" 
            value="clear messages"
            @click="clearMessages($event)"
          />
        </div> -->
        <div class="edituser">
          <input
            type="button"
            name="edituser" 
            value="edit appearance"
            @click="editing=true"
          />
        </div>
        <div class="storage">
          <input
            type="button"
            name="storage" 
            value="delete me"
            @click="clearLocalStorage($event)"
          />
        </div>
        <div class="db">
          <input
            type="button"
            name="db" 
            value="delete everything"
            @click="clearDB($event)"
          />
        </div>
      </div>
      <div id="userList">
        <span class="title"> participants </span>
        <ul>
          <UserLabel
            :key="me.uid"
            :uid="me.uid" 
            :name="me.name" 
            :color="me.color"
            :connected="me.connected"
            :x="me.x"
            :y="me.y"
            :isMe="true"
            :typing="me.typing"
            @click.native="scrollToUser(me, $event)"
          />
          <UserLabel
            v-for="(user) in connectedUsersFirst()"
            :key="user.uid"
            :uid="user.uid" 
            :name="user.name" 
            :color="user.color"
            :connected="user.connected"
            :x="user.x"
            :y="user.y"
            :typing="user.typing"
            @click.native="scrollToUser(user, $event)"
          />
        </ul>
      </div>
    </header>
    <div 
      id="userlandContainer" 
      ref="userlandContainer"
      :class="{ blur: !registered || editing }"
    >
      <div id="userland" ref="userland">
        <Grid 
          :hidden="!grid"
        />
        <User
          v-if="me"
          ref="me"
          :uid="me.uid" 
          :name="me.name" 
          :color="me.color" 
          :isMe=true
          :connected="me.connected"
          :x="me.x"
          :y="me.y"
          :messages="me.messages"
        />
        <User 
          v-for="(user) in users"
          ref="Users"
          :key="user.uid"
          :uid="user.uid" 
          :name="user.name" 
          :color="user.color"
          :connected="user.connected"
          :x="user.x"
          :y="user.y"
          :typing="user.typing"
          :messages="user.messages"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { uid } from 'uid'
import smoothscroll from 'smoothscroll-polyfill'

import Grid from './Grid'
import User from './User'
import Register from './Register'
import EditUser from './EditUser'
import UserLabel from './UserLabel'
import Minimap from './Minimap'

export default {
  name: 'Userland',
  components: {
    Grid,
    Minimap,
    Register,
    EditUser,
    User,
    UserLabel,
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
        typing: String,
        messages: [],
      },

      users: {},

      editing: false,
      scrolling: false,
      dragging: false,
      registered: this.checkForMe(),
      visited: this.checkIfVisited(),

      grid: false,
      zoomIndex: 25,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      windowLeft: null,
      windowTop: null,

      doNotSave: false,
    }
  },
  created() {
    // localStorage.clear()
    // console.log(localStorage)

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

    // start tracking cursor

    this.track()

    if (this.checkForDB()) {
      this.users = JSON.parse(localStorage.users)
    }

  },
  mounted() {
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

    const center = { 
      x: (this.$refs.userland.offsetWidth - window.innerWidth) / 2,
      y: (this.$refs.userland.offsetHeight - window.innerHeight) / 2
    }
    this.scrollTo(center, 'smooth')
  },
  sockets: {
    connect() { 
      this.me.connected = true 
      this.announce('user')
      
    },
    disconnect() { 
      this.me.connected = false 
      if (!this.doNotSave) {
        localStorage.me = JSON.stringify(this.me)
      }
    },
    dbSync(data) {
      console.log(data)
    },
    async broadcast(data) {
      data = JSON.parse(data)
      const user = data.user
      const type = data.msg.type
      const content = data.msg.content

      if (user.uid !== this.me.uid) {
        this.$set(this.users, user.uid, user)
        let existingUser = this.users[user.uid]

        if (type == 'user') {
          this.announce('db', this.users)

        } else if (type == 'position') {
          // console.log(user)

        } else if (type == 'typing') {
          // console.log(user)

        } else if (type == 'message') {
          // console.log(user)

        } else if (type == 'disconnect') {
          existingUser.connected = false
        }
      }
      if (type == 'db') {
        const db = content
        console.log('got DB from swarm: ', db)
        for (let key in db) {
          const user = db[key]
          if (key !== this.me.uid) {
            this.$set(this.users, key, user)
          } 
        }
        this.saveDB()
      }
      if (type == 'clear-db') {
        const db = content
        console.log(db)
        this.users = db
        localStorage.users = JSON.stringify(this.users)
        this.me.messages = []
        localStorage.me = JSON.stringify(this.me)
        window.location.reload(true)
      }
    }
  },
  methods: {
    checkForMe() {
      if (localStorage.me) {
        return true
      } else {
        console.log("you've been here before.")
      }
    },
    checkIfVisited() {
      if (localStorage.uid) {
        return true
      } else {
        console.log("you're new.")
      }
    },
    saveMe(newLook) {
      this.me.name = newLook.name
      this.me.color = newLook.color
      this.announce('user')
      this.registered = true
      this.editing = false
      localStorage.me = JSON.stringify(this.me)
    },
    checkForDB() {
      if (localStorage.users) {
        return true
      } else {
        console.log("you haven't made a userDb yet.")
      }
    },
    saveDB() {
      localStorage.users = JSON.stringify(this.users)
    },
    announce(type, content) {
      this.$socket.emit('pingServer', this.me, {
        type: type,
        content: content
      })
    },
    scrollToUser(user, e) {
      const center = { 
        x: this.$refs.userland.offsetWidth * 0.01 * user.x - window.innerWidth / 2,
        y: this.$refs.userland.offsetHeight* 0.01 * user.y - window.innerHeight / 2
      }
      this.scrollTo(center, 'smooth')
      e.stopPropagation()
    },
    constructMessage(text) {
      const time = ((new Date()).getTime())
      const message = {
        uid: this.me.uid + time,
        author: this.me.name,
        content: text,
        time: time,
        color: this.me.color,
        // x: Math.floor(this.me.x / 2) * 2,
        // y: Math.floor(this.me.y / 2) * 2,
        x: Math.floor(this.me.x / 0.4) * 0.4,
        y: Math.floor(this.me.y / 0.4) * 0.4,
      }
      return message
    },
    track() {
      let x, y
      document.addEventListener('mousemove', (e) => {
        // if(!this.scrolling) {
          const userlandContainer = this.$refs.userlandContainer
          x = 0.2 * 100 * (userlandContainer.scrollLeft + e.clientX) / userlandContainer.offsetWidth
          y = 0.2 * 100 * (userlandContainer.scrollTop + e.clientY) /userlandContainer.offsetHeight
          this.$set(this.me, 'x', x)
          this.$set(this.me, 'y', y)
          // if((Math.floor(this.me.x)) % 3 === 0) {
          this.announce('position')
          // }
        // }
        e.preventDefault()
      })

      let currentMessage
      // const input = this.$refs.me.$refs.Cursor.$refs.input

      document.addEventListener('keyup', (e) => {
        if (this.registered && !this.editing) {

          const input = this.$refs.me.$refs.Cursor.$refs.input
          const key = e.which || e.keyCode
          const [ 
                  firstMessage, 
                  lastMessage, 
                  previousMessage, 
                  nextMessage
                ]
              = this.computeMessages(this.me.messages, currentMessage)

          if (input !== document.activeElement) {
            if (key >= 48 && key <= 90) {
              const char = String.fromCharCode(key)
              input.value = char              
            }
            input.focus()
          }

          const message = this.constructMessage(input.value)
          this.me.typing = message.content
          this.announce('typing')

          if (key == 27) {
            input.value = ''
            input.blur()

          } else if (key == 38) {
            if (!currentMessage) {
              currentMessage = lastMessage
              input.value = currentMessage.content
              input.select()
            } else if (previousMessage) {
              currentMessage = previousMessage
              input.value = currentMessage.content
              input.select()
            } else {
              currentMessage = firstMessage
              input.value = currentMessage.content
            }

          } else if (key == 40) {
            if (currentMessage && nextMessage) {
              currentMessage = nextMessage
              input.value = currentMessage.content
              input.select()
            }

          // } else if (key == 13 && e.shiftKey) {
          //   // input.style.height = input.scrollHeight + 15 + 'px'
          //   // input.value = input.value + '\n'
          //   input.value = input.value + '<br>'

          } else if (key == 13 && !e.shiftKey) {
            if (message.content && message.content != ' ') {
              input.value = input.value - '\n'
              this.me.messages.push(message)
              this.me.typing = ''
              // this.$refs.me.messages.push(message)
              localStorage.me = JSON.stringify(this.me)
              // this.announceMessage(message)
              this.announce('message', message)
              currentMessage = undefined
              input.value = ''
              input.placeholder = ''
              // input.style.height = '15px'
            }
          }
          e.stopPropagation()
          e.preventDefault()
        }
      })

      document.addEventListener('click', (e) => {
        if (this.registered) {
          console.log('click')

          const input = this.$refs.me.$refs.Cursor.$refs.input
          const message = this.constructMessage(input.value)

          if (message.content && message.content != ' ') {
            this.me.messages.push(message)
            // this.$refs.me.messages.push(message)
            localStorage.me = JSON.stringify(this.me)
            this.announceMessage(message)
            currentMessage = undefined
            input.value = ''
            input.placeholder = ''
          }
          e.stopPropagation()
          e.preventDefault()
        }
      })
    },
    computeMessages(messages, currentMessage) {
      const firstMessage = messages[0]
      const lastMessage = messages[messages.length-1]
      const previousMessage = messages[messages.indexOf(currentMessage)-1]
      const nextMessage = messages[messages.indexOf(currentMessage)+1]
      return [firstMessage, lastMessage, previousMessage, nextMessage]
    },
    clearLocalStorage(e) {
      this.doNotSave = true
      localStorage.clear()
      window.location.reload(true)
      e.stopPropagation()
    },
    clearMessages(e) {
      for (let m = 0; m < this.me.messages.length; m ++) {
        const message = this.me.messages[m]
        message.deleted = true
        // this.$set(message, key, user)
      }
      // for (let key in db) {
      //   const user = db[key]
      //   if (key !== this.me.uid) {
      //     this.$set(this.users, key, user)
      //   } 
      // }
      this.me.typing = ''
      localStorage.me = JSON.stringify(this.me)
      e.stopPropagation()
    },
    toggleGrid(e) {
      this.grid =! this.grid
      e.stopPropagation()
    },
    clearDB(e) {
      this.users = {}
      this.announce('clear-db', this.users)
      e.stopPropagation()
    },
    connectedUsersFirst() {
      const userArray = Object.values(this.users)
      userArray.sort((a, b) => {
        return a.connected === b.connected ? 0 : a.connected ? -1 : 1
      })
      let obj = {}
      for (let u = 0 ; u < userArray.length; u++) {
        const user = userArray[u]
        obj[user.uid] = user
      }
      return obj
    },
    scrollTo(to, behavior) {
      this.$refs.userlandContainer.scroll({
        left: to.x,
        top: to.y,
        behavior: behavior ? behavior : 'auto'
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
  },
  
}
</script>

<style>
header {
  position: absolute;
  /* width: 100%; */
  margin-left: 2vh;
  margin-top: 2vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 1;
  transition: filter 0.3s ease;

}
header #minimap {
  position: relative;
  box-sizing: border-box;
  height: 20vh;
  width: 20vw;
  background: white;
  border: 1px solid grey;
}
header #lounge {
  width: 100%;
  height: 6vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 1px solid grey;
  background: white;
}
header #lounge .title {
  box-sizing: border-box;
  /* margin-top: auto; */
  /* padding: 0.25vh 0.5vw; */
  padding: 0vh 0.5vw;
  line-height: 1.9vh;
  width: 10%;
  border-bottom: 1px solid grey;
  border-right: 1px solid grey;
}
header #tools {
  box-sizing: border-box;
  margin-top: 2vh;
  width: 10vw;
  height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid grey;
  background: white;
  line-height: 1.9vh;

}
header #tools .title {
  box-sizing: border-box;
  padding: 0vh 0.5vw;
  line-height: 1.9vh;
  width: 100%;
  border-bottom: 1px solid grey;
}
header #tools div {
  margin: 0.2vh 0.5vw;
  display: flex;
  align-items: center;
}
header #tools .db input {
  /* background: red; */
  color: red;
}
header #userList {
  box-sizing: border-box;
  margin-top: 2vh;
  width: 14vw;
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid grey;
}
header #userList .title {
box-sizing: border-box;
  padding: 0vh 0.5vw;
  line-height: 1.9vh;
  width: 100%;
  border-bottom: 1px solid grey;
}
header #userList ul { 
  margin: 0;
  padding: 0;
}
#userlandContainer {
  cursor: none;
  box-sizing: border-box;
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: scroll;
  transition: filter 0.3s ease;
}
#userland {
  /* box-sizing: border-box; */
  position: absolute;
  /* float: left; */
  /* padding: 500px 0px; */
  /* padding: 500px 0px; */
  top: 0;
  left: 0;
  /* top: -100%;
  left: -100%; */
  height: 500%;
  width: 500%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  transition: transform 0.5s ease;

  /* width: 100%;
  height: 100%; */
  font-family: monospace;
  font-size: 9pt;
}
</style>
