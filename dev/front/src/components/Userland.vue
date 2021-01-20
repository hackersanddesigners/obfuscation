
<template>
  <div id="userland">
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
    <header>
      <div class="lounge">
        <span> cursor lounge </span>
      </div>
      <div class="tools">
        <span> options </span>
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
        <div class="messages">
          <input
            type="button"
            name="messages" 
            value="clear messages"
            @click="clearMessages($event)"
          />
        </div>
        <div class="storage">
          <input
            type="button"
            name="storage" 
            value="clear storage"
            @click="clearLocalStorage($event)"
          />
        </div>
      </div>
    </header>

    <Register
      v-if="!registered" 
      :me="me"
      @registered="saveMe"
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
    <!-- </l-map> -->
  </div>
</template>

<script>
import { uid } from 'uid'
// import L from 'leaflet'

import Grid from './Grid'
// import Tile from './Tile'
import User from './User'
import Register from './Register'

export default {
  name: 'Userland',
  components: {
    Grid,
    // Tile,
    Register,
    User,
  },
  data() {
    return {
      registered: this.checkForMe(),
      visited: this.checkIfVisited(),
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

    // this.checkForOthers()
    this.checkForMessages()
    // this.track(this.me)
  },
  mounted() {

    
  },
  sockets: {
    connect() { 
      this.me.connected = true 
      // if (this.me) {
        this.announceUser(this.me)
      // }
    },
    disconnect() { 
      this.me.connected = false 
    },
    async broadcast(data) {
      data = JSON.parse(data)
      const user = data.user
      const type = data.msg.type
      // const message = data.msg.contents

      if (user.uid !== this.me.uid) {
        // let existingUser = this.findUser(user)
        // let existingUser = this.users[user.uid]
        // if (!existingUser) {
          // existingUser = this.saveUser(user)
        this.$set(this.users, user.uid, user)
        let existingUser = this.users[user.uid]
          // await new Promise(r => setTimeout(r, 500))
        // }

        // const ExistingUser = this.$refs.Users.find(U => U.uid === existingUser.uid)

        if (type == 'user') {
        
        console.log(existingUser)
          // existingUser.name = user.name
          // existingUser.color = user.color
          // ExistingUser.messages = user.messages

        } else if (type == 'position') {
          this.track(user)

        } else if (type == 'typing') {
          // existingUser.typing = message.content
          // ExistingUser.typing = message.content

        } else if (type == 'message') {
          // user.messages.forEach(message => {
            // const exisitngMessage = this.findUserMessage(ExistingUser, message)
            // if (!exisitngMessage) {
              // console.log(existingUser.messages, message)
              // existingUser.messages.push(message)
              // ExistingUser.messages.push(message)
              // existingUser.typing = ''
              // ExistingUser.typing = ''
            // }
          // })
        } else if (type == 'disconnect') {
          existingUser.connected = false
        }
      }
    }
  },
  methods: {
    checkForMe() {
      if (localStorage.me) {
        return true
      }
    },
    checkIfVisited() {
      if (localStorage.uid) {
        return true
      }
    },
    checkForOthers() {
      if (localStorage.users) {
        this.users = JSON.parse(localStorage.users)
      } else {
        console.log('no one else is here')
      }
    },
    checkForMessages() {
      // if (localStorage.messages) {
      //   this.messages = JSON.parse(localStorage.messages)
      // } else {
      //   localStorage.messages = ''
      // }
    },
    findUser(user) {
      // const foundUser = this.users.find(u => u.uid === user.uid)
      const foundUser = this.users[user.uid]
      return foundUser
    },
    findUserMessage(user, message) {
      const foundMessage = user.messages.find(m => m.uid === message.uid)
      return foundMessage
    },
    saveMe(newMe) {
      this.me.name = newMe.name
      this.me.color = newMe.color
      localStorage.me = JSON.stringify(this.me)
      // localStorage.me = this.me
      this.announceUser(this.me)
      this.createStrapiUser(this.me)
      // setTimeout(() => {
        this.registered = true
      // }, 1500)
    },
    saveUser(user) {
      // this.users.push(user)
      // this.users[user.uid] = user
      this.$set(this.users, user.uid, user)
      // localStorage.me = JSON.stringify(this.me)
      user = this.findUser(user)
      return user
    },
    announceUser() {
      this.sendToPeers({
        type: 'user',
        contents: ''
      })
    },
    announcePosition() {
      this.sendToPeers({
        type: 'position',
        contents: ''
      })
    },
    announceMessage(message) {
      this.sendToPeers({
        type: 'message',
        contents: message
      })
    },
    announceTyping(string) {
      this.sendToPeers({
        type: 'typing',
        contents: string
      })
    },
    sendToPeers(msg) {
      this.$socket.emit('pingServer', this.me, msg)
    },
    computeMessages(messages, currentMessage) {
      const firstMessage = messages[0]
      const lastMessage = messages[messages.length-1]
      const previousMessage = messages[messages.indexOf(currentMessage)-1]
      const nextMessage = messages[messages.indexOf(currentMessage)+1]
      return [firstMessage, lastMessage, previousMessage, nextMessage]
    },
    constructMessage(text) {
      const time = ((new Date()).getTime())
      const message = {
        uid: this.me.uid + time,
        author: this.me.name,
        content: text,
        time: time,
        color: this.me.color,
        x: Math.floor(this.me.x / 2) * 2,
        y: Math.floor(this.me.y / 2) * 2,
      }
      return message
    },
    createStrapiUser(user) {
      console.log(user)
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
    track(user) {
      if (user.uid == this.me.uid) {
        let x, y
        document.addEventListener('mousemove', (e) => {
            x = 100 * e.clientX / window.innerWidth
            y = 100 * e.clientY / window.innerHeight
            this.$set(this.me, 'x', x)
            this.$set(this.me, 'y', y)
            // this.me.x = this.$refs.me.x = 100 * e.clientX / window.innerWidth
            // this.me.y = this.$refs.me.y = 100 * e.clientY / window.innerHeight
            // if((Math.floor(this.me.x)) % 3 === 0) {
              this.announcePosition(this.me) 
            // }
          e.preventDefault()
        })

        let currentMessage
        // const input = this.$refs.me.$refs.Cursor.$refs.input

        document.addEventListener('keyup', (e) => {
          if (this.registered) {

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
#userland {
  width: 100%;
  height: 100%;
  font-family: monospace;
  font-size: 9pt;
}
#usersLabel {
  font-weight: bold;
  margin: 0.5vh 0.5vw;
}
header {
  position: absolute;
  width: 100%;
}
header .lounge {
  height: 6vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 1px solid grey;
}
header .lounge span {
  box-sizing: border-box;
  margin-top: auto;
  /* padding: 0.25vh 0.5vw; */
  padding: 0vh 0.5vw;
  line-height: 1.9vh;
  width: 10%;
  border-top: 1px solid grey;
  border-right: 1px solid grey;
}
header .tools {
  display: flex;
  align-items: center;
  border-bottom: 1px solid grey;
}
header .tools span {
  box-sizing: border-box;
  padding: 0vh 0.5vw;
  line-height: 1.9vh;
  width: 10%;
  border-right: 1px solid grey;
}
header .tools div {
  margin: 0px 10px;
  display: flex;
  align-items: center;
}
</style>
