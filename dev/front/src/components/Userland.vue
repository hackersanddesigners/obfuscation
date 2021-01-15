
<template>
  <div id="userland">
    <Grid 
      :hidden="tableHidden"
    />
    <!-- <h1>obfuscated platframe</h1> -->
    <!-- <header>
      <div class="tools">
        <input 
          type="checkbox" 
          name="grid" 
          value='true' 
          @click="tableHidden!=tableHidden"
        />
        <label for="grid">grid</label>
      </div>
    </header> -->
    <!-- <p id="usersLabel">users</p> -->
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
    />
    <User 
      v-for="user in users"
      ref="Users"
      :key="user.uid"
      :uid="user.uid" 
      :name="user.name" 
      :color="user.color"
    />
  </div>
</template>

<script>
import { uid } from 'uid'

import Grid from './Grid'
import User from './User'
import Register from './Register'

export default {
  name: 'Userland',
  components: {
    Grid,
    Register,
    User,
  },
  data() {
    return {
      registered: this.checkForMe(),
      visited: this.checkIfVisited(),
      // me: null,
      me: {
        uid: uid(),
        connected: false,
        name: 'newUser-' + uid(),
        color: this.randomColor(),
        x: 0,
        y: 0,
        messages: [],
      },
      users: [],
      tableHidden: false,
    }
  },
  created() {
    localStorage.clear()

    // if (!this.me.messages) {
    //   localStorage.clear()
    //   window.location.reload(true)
    // }
    // console.log(localStorage)

    // check if user is registered and get their datas value
    
    if (this.registered) {
      this.me = JSON.parse(localStorage.me)
      // this.$refs.me.messages = this.me.messages
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
      //   this.announceUser(this.me)
      // }
    },
    disconnect() { 
      this.me.connected = false 
    },
    async broadcast(data) {
      data = JSON.parse(data)
      const user = data.user
      const type = data.msg.type
      const message = data.msg.contents
      if (user.uid !== this.me.uid) {
        let existingUser = this.findUser(user)
        if (!existingUser) {
          existingUser = this.saveUser(user)
          await new Promise(r => setTimeout(r, 500))
        }
        const ExistingUser = this.$refs.Users.find(U => U.uid === existingUser.uid)
        if (type == 'user') {
          existingUser.name = user.name
          existingUser.color = user.color
          ExistingUser.messages = user.messages
        }
        if (type == 'position') {
          this.track(user)
        } else if (type == 'typing') {
          existingUser.typing = message.content
          ExistingUser.typing = message.content
        } else if (type == 'message') {
          user.messages.forEach(message => {
            const exisitngMessage = this.findUserMessage(ExistingUser, message)
            if (!exisitngMessage) {
              // console.log(existingUser.messages, message)
              existingUser.messages.push(message)
              ExistingUser.messages.push(message)
              existingUser.typing = ''
              ExistingUser.typing = ''
            }
          })
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
      if (localStorage.messages) {
        this.messages = JSON.parse(localStorage.messages)
      } else {
        localStorage.messages = ''
      }
    },
    findUser(user) {
      const foundUser = this.users.find(u => u.uid === user.uid)
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
      this.announceUser(this.me)
      this.registered = true
    },
    saveUser(user) {
      this.users.push(user)
      user = this.findUser(user)
      return user
    },
    announceUser() {
      this.sendMessage({
        type: 'user',
        contents: ''
      })
    },
    announcePosition() {
      this.sendMessage({
        type: 'position',
        contents: ''
      })
    },
    announceMessage(message) {
      this.sendMessage({
        type: 'message',
        contents: message
      })
    },
    announceTyping(message) {
      this.sendMessage({
        type: 'typing',
        contents: message
      })
    },
    sendMessage(msg) {
      this.$socket.emit('pingServer', this.me, msg)
    },
    track(user) {
      if (user.uid == this.me.uid) {
        document.addEventListener('mousemove', (e) => {
          // if (!this.$refs.me.typing) {
            this.me.x = this.$refs.me.x = 100 * e.clientX / window.innerWidth
            this.me.y = this.$refs.me.y = 100 * e.clientY / window.innerHeight
            this.announcePosition(this.me) 
          // }
          e.preventDefault()
        })
        document.addEventListener('keyup', (e) => {
          if (this.registered) {
            const key = e.which || e.keyCode
            const input = this.$refs.me.$refs.Cursor.$refs.input
            // if (!user.messages) {
            //   user.messages = []
            // }
            input.focus()
            // if (input.value && input.value != ' ') {
              let message = {
                uid: this.me.uid + ((new Date()).getTime()),
                author: this.me.name,
                content: input.value,
                time: ((new Date()).getTime()),
                color: this.me.color,
                // x: this.me.x,
                // y: this.me.y,
                x: Math.floor(this.me.x / 2) * 2,
                y: Math.floor(this.me.y / 2) * 2,
              }
              this.announceTyping(message)
              if (key == 13) {
                if (input.value && input.value != ' ') {
                  input.value = ''
                  this.me.messages.push(message)
                  this.$refs.me.messages.push(message)
                  localStorage.me = JSON.stringify(this.me)
                  this.announceMessage(message)
                  input.placeholder = ''
                }
              }
              if (key == 27) {
                input.value = ''
                input.blur()
              }
            // }
            // this.$refs.me.typing = true
            e.preventDefault()
          }
        })
      } else {
          // console.log('this.$refs =>', this.$refs)
          // console.log('this.$refs.me =>', this.$refs.me)
          // console.log('this.$refs.Users =>', this.$refs.Users)
          const User = this.$refs.Users.find(u => u.uid == user.uid)
          User.x = user.x
          User.y = user.y
      }
    },
    // type(user) {
    //   if (user.uid == this.me.uid) {
    //     this.$el.addEventListener('click', (e) => {
    //       if (!this.$refs.me.typing) {
    //         this.me.x = this.$refs.me.x = e.clientX / window.innerWidth
    //         this.me.y = this.$refs.me.y = e.clientY / window.innerHeight
    //         this.announcePosition(this.me) 
    //       }
    //       e.preventDefault()
    //     })
    //   } else {
    //       const User = this.$refs.Users.find(u => u.uid == user.uid)
    //       User.x = user.x
    //       User.y = user.y
    //   }
    // },
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
}
#usersLabel {
  font-weight: bold;
  margin: 0.5vh 0.5vw;
}
</style>
