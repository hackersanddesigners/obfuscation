<template>
  <div>
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
      <Options
        :registered="registered"
        :editing="editing"
        :name="me.name"
        :color="me.color"
        :grid="grid"

        @grid="grid = !grid"
        @editMe="editing = true"
        @updateColor="updateColor"
        @newMe="saveMe"
        @deleteMe="deleteMe()"
        @deleteEverything="announce('clear-db')"
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
      <div id="userland" ref="userland">
        <Grid 
          :hidden="!grid"
        />
        <User 
          ref="me"
          :key="me.uid"
          :user="me"
          :isMe="true"
        />
        <User 
          v-for="user in users"
          ref="Users"
          :key="user.uid"
          :user="user"
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
import Options from './Options.vue'
import Userlist from './Userlist.vue'
import User from './User'

export default {
  name: 'Userland',
  components: {
    Grid,
    Minimap,
    Options,
    Userlist,
    User,
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
        messages: [],
      },

      users: {},

      doNotSave: false,

      editing: false,
      scrolling: false,
      dragging: false,
      registered: localStorage.me,
      visited: localStorage.uid,
      hasDB: localStorage.users,

      grid: false,
      zoomIndex: 25,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      windowLeft: null,
      windowTop: null,
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

    if (this.hasDB) {
      this.users = JSON.parse(localStorage.users)
    }

    // start tracking cursor

    this.track()

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

    broadcast(data) {
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
        localStorage.users = JSON.stringify(this.users)

      }

      if (type == 'clear-db') {
        this.users = {}
        localStorage.users = JSON.stringify(this.users)

        this.me.messages = []
        localStorage.me = JSON.stringify(this.me)

        window.location.reload(true)
      }

    }

  },
  methods: {

    announce(type, content) {
      this.$socket.emit('pingServer', this.me, {
        type: type,
        content: content
      })
    },

    updateColor(newLook) {
      this.me.color = newLook.color
      this.announce('user')
      localStorage.me = JSON.stringify(this.me)
    },

    saveMe(newLook) {
      this.me.name = newLook.name
      this.me.color = newLook.color
      this.announce('user')
      this.registered = true
      this.editing = false
      localStorage.me = JSON.stringify(this.me)
    },

    deleteMe() {
      this.doNotSave = true
      localStorage.clear()
      window.location.reload(true)
    },

    constructMessage(text) {
      const time = ((new Date()).getTime())
      const message = {
        uid: this.me.uid + time,
        author: this.me.name,
        content: text,
        time: time,
        color: this.me.color,
        x: Math.floor(this.me.x / 0.4) * 0.4,
        y: Math.floor(this.me.y / 0.4) * 0.4,
      }
      return message
    },

    track() {
      let x, y

      document.addEventListener('mousemove', (e) => {
        const userlandContainer = this.$refs.userlandContainer

        x = 0.2 * 100 * (userlandContainer.scrollLeft + e.clientX) / userlandContainer.offsetWidth
        y = 0.2 * 100 * (userlandContainer.scrollTop + e.clientY) /userlandContainer.offsetHeight
        this.$set(this.me, 'x', x)
        this.$set(this.me, 'y', y)
        this.announce('position')
        e.preventDefault()
      })

      let msgs = this.me.messages
      let current
      // const input = this.$refs.me.$refs.Cursor.$refs.input

      document.addEventListener('keyup', (e) => {
        if (this.registered && !this.editing) {

          const input = this.$refs.me.$refs.Cursor.$refs.input
          const key = e.which || e.keyCode

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

          const 
            first = msgs[0],
            last = msgs[msgs.length-1],
            previous = msgs[msgs.indexOf(current) - 1],
            next = msgs[msgs.indexOf(current) + 1]

          if (key == 27) {
            input.value = ''
            input.blur()

          } else if (key == 38) {
            if (!current) {
              current = last
              input.value = current.content
              input.select()
            } else if (previous) {
              current = previous
              input.value = current.content
              input.select()
            } else {
              current = first
              input.value = current.content
            }

          } else if (key == 40) {
            if (current && next) {
              current = next
              input.value = current.content
              input.select()
            }

          } else if (key == 13) {
            if (message.content && message.content != ' ') {
              msgs.push(message)
              this.me.typing = ''
              localStorage.me = JSON.stringify(this.me)
              this.announce('message', message)
              current = undefined
              input.value = ''
              input.placeholder = ''
            }
          }

          e.stopPropagation()
          e.preventDefault()
        }
      })

      document.addEventListener('click', (e) => {
        if (this.registered && !this.editing) {
          console.log('click')

          const input = this.$refs.me.$refs.Cursor.$refs.input
          const message = this.constructMessage(input.value)

          if (message.content && message.content != ' ') {
            this.me.messages.push(message)
            localStorage.me = JSON.stringify(this.me)
            this.announce('message', message)
            current = undefined
            input.value = ''
            input.placeholder = ''
          }

          e.stopPropagation()
          e.preventDefault()
        }
      })
    },

    getUserPosition(user) {
      const coords = {
        x: this.$refs.userland.offsetWidth * 0.01 * user.x - window.innerWidth / 2,
        y: this.$refs.userland.offsetHeight * 0.01 * user.y - window.innerHeight / 2
      }
      return coords
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
  /* margin-top: 2vh; */
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
header #minimap {
  margin-left: 2vh;
  position: relative;
  box-sizing: border-box;
  height: 20vh;
  width: 20vw;
  background: white;
  border: 1px solid grey;
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
header.blur h1,
header.blur #minimap,
/* header.blur #options .title,
header.blur #options div, */
header.blur #userlist,
#userlandContainer.blur {
  filter: blur(10px);
}

</style>