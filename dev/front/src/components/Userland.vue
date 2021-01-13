
<template>
  <div id="userland">
    <h3>Users</h3>
    <Register
      v-if="!me" 
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
    <Message
      v-for="message in messages"
      ref="Messages"
      :key="message.author + message.content"
      :uid="message.author + message.content"
      :author="message.author"
      :content="message.content"
      :color="message.color"
      :x="message.x"
      :y="message.y"
    />
  </div>
</template>

<script>
import User from '../components/User'
import Register from '../components/Register'
import Message from './Message.vue'

export default {
  name: 'Userland',
  components: {
    // Me,
    Register,
    User,
    Message
  },
  data() {
    return {
      me: null,
      users: [],
      messages: []
    }
  },
  created() {
  },
  mounted() {
    // localStorage.clear()
    console.log(localStorage)
    this.checkForMe()
    this.checkForOthers()
    this.checkForMessages()
  },
  sockets: {
    connect() { 
      this.isConnected = true 
      if (this.me) {
        this.announceUser(this.me)
      }
    },
    disconnect() { this.isConnected = false },
    async broadcast(data) {
      data = JSON.parse(data)
      const user = data.user
      const type = data.msg.type
      const message = data.msg.contents
      if (user.uid !== this.me.uid) {
        if (!this.findUser(user)) {
          this.saveUser(user)
          await new Promise(r => setTimeout(r, 500))
        }
        // if (data.msg.type == 'newUser') {
        //   this.saveUser(user)
        const User = this.$refs.Users.find(U => U.uid === user.uid)
        if (type == 'position') {
          this.track(user)
        }
        if (type == 'typing') {
          User.typing = message.content
          // console.log(User.typing)
        }
        if (type == 'message') {
          User.typing = ''
          this.messages.push(message)
          // localStorage.messages.push(message)
        }
      }
    }
  },
  methods: {
    checkForMe() {
      if (localStorage.me) {
        this.me = JSON.parse(localStorage.me)
        this.track(this.me)
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
      const found = this.users.find(u => u.uid === user.uid)
      return found
    },
    saveMe(me) {
      this.me = me
      this.announceUser(me)
      this.track(this.me)
    },
    saveUser(user) {
      this.users.push(user)
      console.log(user)
    },
    announceUser() {
      this.sendMessage({
        type: 'newUser',
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
            this.me.x = this.$refs.me.x = e.clientX / window.innerWidth
            this.me.y = this.$refs.me.y = e.clientY / window.innerHeight
            this.announcePosition(this.me) 
          // }
          e.preventDefault()
        })
        document.addEventListener('keyup', (e) => {
          const key = e.which || e.keyCode
          const input = this.$refs.me.$refs.Cursor.$refs.input
          input.focus()
          if (input.value) {
            let message = {
              uid: this.me.uid,
              author: this.me.name,
              content: input.value,
              color: this.me.color,
              x: this.me.x + 0.01,
              y: this.me.y - 0.02
            }
            this.announceTyping(message)
            if (key == 13) {
              input.value = ''
              this.messages.push(message)
              this.announceMessage(message)
              input.placeholder = ''
              // localStorage.messages.push(message)
            }
          }
          // this.$refs.me.typing = true
          e.preventDefault()
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
  }
}
</script>

<style>
#userland {
  width: 100%;
  height: 100%;
}
</style>
