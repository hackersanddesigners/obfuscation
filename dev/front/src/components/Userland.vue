<template>
  <div>
    <header>
      <!-- <div class="lounge">
        <span class="title"> cursor lounge </span>
      </div> -->
      <div class="tools">
        <span class="title"> options </span>
        <div class="grid">
          <input 
            type="checkbox" 
            name="grid" 
            :value="grid" 
            checked
            @click="toggleGrid($event)"
          />
          <label for="grid">grid</label>
        </div>
        <!-- <div class="messages">
          <input
            type="button"
            name="messages" 
            value="clear messages"
            @click="clearMessages($event)"
          />
        </div> -->
        <div class="storage">
          <input
            type="button"
            name="storage" 
            value="clear storage"
            @click="clearLocalStorage($event)"
          />
        </div>
      </div>
      <div id="userList">
        <span class="title"> options </span>
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
            @click.native="editing=true"
          />
          <UserLabel
            v-for="(user) in users"
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
    <div id="userlandContainer" ref="userlandContainer">
      <div id="userland" ref="userland">
        <!-- <l-map ref="myMap">  -->
          <!-- <l-tile-layer 
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          ></l-tile-layer> -->
          <!-- <l-grid-layer 
            :tile-component="tileComponent"
          ></l-grid-layer> -->
          <!-- <l-grid-layer> -->
            <!-- <Tile /> -->
          <!-- </l-grid-layer> -->
          <!-- <l-marker 
            :lat-lng="[47.413220, -1.219482]"
          ></l-marker> -->
        <Grid 
          :hidden="!grid"
        />
        <!-- <h1>obfuscated platframe</h1> -->
        <!-- <p id="usersLabel">users</p> -->

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
        <!-- </l-map> -->
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
import UserLabel from './UserLabel.vue'

// import L from 'leaflet'
// import Tile from './Tile'

export default {
  name: 'Userland',
  components: {
    Grid,
    // Tile,
    Register,
    EditUser,
    User,
    UserLabel,
  },
  data() {
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
      registered: this.checkForMe(),
      visited: this.checkIfVisited(),
      editing: false,
      scrolling: false,
      users: {},
      storedUsers: {},
      connectedUsers: {},
      grid: true,
      // tileComponent: {
      //   name: 'tile-component',
      //   props: {
      //     coords: {
      //       type: Object,
      //       required: true
      //     }
      //   },
      //   template: '<div>Coords: {{coords.x}}, {{coords.y}}, {{coords.z}}</div>'
      // },
    }
  },
  created() {
    // localStorage.clear()
    // if (!this.me.messages) {
    //   localStorage.clear()
    //   window.location.reload(true)
    // }
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

    this.track(this.me)

    if (this.checkForDB()) {
      this.users = JSON.parse(localStorage.users)
    }
    // this.track(this.me)
  },
  mounted() {
    smoothscroll.polyfill()

    const userlandContainer = this.$refs.userlandContainer

    userlandContainer.addEventListener('scroll', (e) => {
      this.scrolling = true
      // console.log(0.01 * this.me.x * userlandContainer.offsetWidth)
      // let x = 0.2 * 100 * (userlandContainer.scrollLeft + e.clientX * userlandContainer.scrollLeft) / userlandContainer.offsetWidth
      // let y = 0.2 * 100 * (userlandContainer.scrollTop + e.clientX * userlandContainer.scrollLeft) /userlandContainer.offsetHeight
      // let x = 0.2 * 100 * (userlandContainer.scrollLeft + 0.01 * this.me.x * userlandContainer.offsetWidth) / userlandContainer.offsetWidth
      // let y = 0.2 * 100 * (userlandContainer.scrollTop + 0.01 * this.me.y * userlandContainer.offsetHeight) / userlandContainer.offsetHeight
      // this.$set(this.me, 'x', x)
      // this.$set(this.me, 'y', y)
      // // if((Math.floor(this.me.x)) % 3 === 0) {
      // this.announcePosition(this.me) 
      e.preventDefault()
      this.scrolling = false
    })

    const center = { 
      x: (this.$refs.userland.offsetWidth - window.innerWidth) / 2,
      y: (this.$refs.userland.offsetHeight - window.innerHeight) / 2
    }

    userlandContainer.scroll({
      left: center.x,
      top: center.y,
      behavior: 'smooth'
    })
  },
  sockets: {
    connect() { 
      this.me.connected = true 
      this.announceUser()
    },
    disconnect() { 
      this.me.connected = false 
      // if (this.checkForDB) {
        // this.saveDB()
      // }
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
          this.announceDB()

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
        // console.log(db)
        for (let key in db) {
          const user = db[key]
          if (key !== this.me.uid) {
            this.$set(this.users, key, user)
          } 
        }
        this.saveDB()
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
    checkForDB() {
      if (localStorage.users) {
        return true
      } else {
        console.log("you haven't made a userDb yet.")
      }
    },
    saveMe(newLook) {
      this.me.name = newLook.name
      this.me.color = newLook.color
      this.announceUser()
      this.registered = true
      this.editing = false
      localStorage.me = JSON.stringify(this.me)
    },
    saveDB() {
      localStorage.users = JSON.stringify(this.users)
    },
    announceUser() {
      this.sendToPeers({
        type: 'user',
        content: ''
      })
    },
    announcePosition() {
      this.sendToPeers({
        type: 'position',
        content: ''
      })
    },
    announceTyping(string) {
      this.sendToPeers({
        type: 'typing',
        content: string
      })
    },
    announceMessage(message) {
      this.sendToPeers({
        type: 'message',
        content: message
      })
    },
    announceDB() {
      // const DB = this.users
      // DB[this.me.uid] = this.me
      this.sendToPeers({
        type: 'db',
        content: this.users
      })
    },
    sendToPeers(msg) {
      this.$socket.emit('pingServer', this.me, msg)
    },
    scrollToUser(user, e) {

      const center = { 
        x: this.$refs.userland.offsetWidth * 0.01 * user.x - window.innerWidth / 2,
        y: this.$refs.userland.offsetHeight* 0.01 * user.y - window.innerHeight / 2
      }

      this.$refs.userlandContainer.scroll({
        left: center.x,
        top: center.y,
        behavior: 'smooth'
      })

      e.stopPropagation()
    },
    // checkForOthers() {
    //   if (localStorage.users) {
    //     this.users = JSON.parse(localStorage.users)
    //   } else {
    //     console.log("you haven't saved a userDb yet.")
    //   }
    // },
    // findUser(user) {
    //   // const foundUser = this.users.find(u => u.uid === user.uid)
    //   const foundUser = this.users[user.uid]
    //   return foundUser
    // },
    // findUserMessage(user, message) {
    //   const foundMessage = user.messages.find(m => m.uid === message.uid)
    //   return foundMessage
    // },
    // saveUser(user) {
    //   // this.users.push(user)
    //   // this.users[user.uid] = user
    //   this.$set(this.users, user.uid, user)
    //   // localStorage.me = JSON.stringify(this.me)
    //   user = this.findUser(user)
    //   return user
    // },
        // createStrapiUser(user) {
      // console.log(user)
      // const data = {
      //   info: this.$refs.note.value
      // }
      // const formData = new FormData()
      // formData.append('data', JSON.stringify(data))
      // formData.append('files.message', this.voiceMessage.data, this.voiceMessage.name)

      // this.$http
      //   .post(`${this.$apiURL}/voice-messages`, formData)
      //   .then(res => { 
      //     console.log(res) 
      //     this.voiceMessage = null
      //     this.sent = true
      //     setTimeout(() => { this.sent = false }, 2000)
      //   })
      //   .catch(err => { console.log(err) })
    // },
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
    track(user) {
      if (user.uid == this.me.uid) {
        let x, y
        document.addEventListener('mousemove', (e) => {
          // if(!this.scrolling) {
            const userlandContainer = this.$refs.userlandContainer
            // const userlandContainer = this.$refs.userlandContainer
            // x = 100 * e.clientX / window.innerWidth
            // y = 100 * e.clientY / window.innerHeight
            x = 0.2 * 100 * (userlandContainer.scrollLeft + e.clientX) / userlandContainer.offsetWidth
            y = 0.2 * 100 * (userlandContainer.scrollTop + e.clientY) /userlandContainer.offsetHeight
            this.$set(this.me, 'x', x)
            this.$set(this.me, 'y', y)
            // if((Math.floor(this.me.x)) % 3 === 0) {
            this.announcePosition(this.me) 
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
            this.announceTyping(message)

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
                this.announceMessage(message)
                currentMessage = undefined
                input.value = ''
                input.placeholder = ''
                // input.style.height = '15px'
              }
            }

            e.preventDefault()
          }
        })

        document.addEventListener('click', (e) => {
          if (this.registered) {
            console.log('send')

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

      } else {
        // const User = this.$refs.Users.find(u => u.uid == user.uid)
        // User.x = user.x
        // User.y = user.y
      }
    },
    computeMessages(messages, currentMessage) {
      const firstMessage = messages[0]
      const lastMessage = messages[messages.length-1]
      const previousMessage = messages[messages.indexOf(currentMessage)-1]
      const nextMessage = messages[messages.indexOf(currentMessage)+1]
      return [firstMessage, lastMessage, previousMessage, nextMessage]
    },
    clearLocalStorage(e) {
      console.log('clearing storage')
      localStorage.clear()
      window.location.reload(true)
      e.stopPropagation()
    },
    clearMessages(e) {
      this.me.messages = []
      this.me.typing = ''
      localStorage.me = JSON.stringify(this.me)
      e.stopPropagation()
    },
    toggleGrid(e) {
      this.grid =! this.grid
      e.stopPropagation()
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
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 1;
}
header .lounge {
  width: 100%;
  height: 6vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 1px solid grey;
  background: white;
}
header .lounge .title {
  box-sizing: border-box;
  /* margin-top: auto; */
  /* padding: 0.25vh 0.5vw; */
  padding: 0vh 0.5vw;
  line-height: 1.9vh;
  width: 10%;
  border-bottom: 1px solid grey;
  border-right: 1px solid grey;
}
header .tools {
  width: 10%;
  height: 6vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 1px solid grey;
  border-right: 1px solid grey;
  background: white;
  line-height: 1.9vh;

}
header .tools .title {
  box-sizing: border-box;
  padding: 0vh 0.5vw;
  line-height: 1.9vh;
  width: 100%;
  border-bottom: 1px solid grey;
}
header .tools div {
  margin: 0.1vh 0.5vw;
  display: flex;
  align-items: center;
}
header #userList {
  display: flex;
  flex-direction: column;
  width: 10%;
  background: white;
  border-bottom: 1px solid grey;
  border-right: 1px solid grey;
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
  box-sizing: border-box;
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: scroll;
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
