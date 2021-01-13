
<template>
  <div id="userland">
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
// import Me from '../components/Me'
import User from '../components/User'
import Register from '../components/Register'

export default {
  name: 'Userland',
  components: {
    // Me,
    User,
    Register
  },
  data() {
    return {
      me: null,
      users: [],
    }
  },
  created() {
  },
  mounted() {
    // localStorage.clear()
    console.log(localStorage)
    this.checkForMe()
    this.checkForOthers()
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
      const user = data.msg.contents
      if (user.uid !== this.me.uid) {
        if (!this.findUser(user)) {
          this.saveUser(user)
          await new Promise(r => setTimeout(r, 500))
        }
        // if (data.msg.type == 'newUser') {
        //   this.saveUser(user)
        if (data.msg.type == 'position') {
          this.track(user)
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
    announceUser(user) {
      this.sendMessage({
        type: 'newUser',
        contents: user
      })
    },
    announcePosition(user) {
      this.sendMessage({
        type: 'position',
        contents: user
      })
    },
    sendMessage(msg) {
      this.$socket.emit('pingServer', this.$socket.id, msg)
    },
    track(user) {
      if (user.uid == this.me.uid) {
        this.$el.addEventListener('mousemove', (e) => {
          this.me.x = this.$refs.me.x = e.clientX / window.innerWidth
          this.me.y = this.$refs.me.y = e.clientY / window.innerHeight
          this.announcePosition(this.me) 
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
  }
}
</script>

<style>
#userland {
  width: 100%;
  height: 100%;
}
</style>
