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

          @newPosition="updatePosition"
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

    if (this.hasDB) {
      this.users = JSON.parse(localStorage.users)
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

    updateColor(newLook) {
      this.me.color = newLook.color
      this.announce('user')
      localStorage.me = JSON.stringify(this.me)
    },

    updatePosition(newPosition) {
      let x = (this.windowLeft + newPosition.x) / (this.windowWidth * this.scale)
      let y = (this.windowTop + newPosition.y) / (this.windowHeight * this.scale)
      this.$set(this.me, 'x', x)
      this.$set(this.me, 'y', y)
      this.announce('position')
    },

    updateTyping(text) {
      this.me.typing = text
      this.announce('typing')
    },

    constructMessage(text) {
      const time = ((new Date()).getTime())
      const message = {
        uid: this.me.uid + time,
        author: this.me.name,
        content: text,
        time: time,
        color: this.me.color,
        x: this.me.x,
        y: this.me.y,
      }
      return message
    },
    
    sendMessage(message) {
      if (message.content && message.content != ' ') {
        this.me.messages.push(message)
        localStorage.me = JSON.stringify(this.me)
        this.announce('message', message)
      }
    },

    findUser(name) {
      let usersArray = Object.values(this.users)
      let found = usersArray.find(u => u.name == name) 
      return this.users[found.uid] 
    },
 
    scrollTo(to, behavior) {
      this.$refs.userlandContainer.scroll({
        left: to.x,
        top: to.y,
        behavior: behavior || 'auto'
      })
    },

    getUserPosition(user) {
      user = this.toPixels(user)
      return {
        x: user.x - this.windowWidth / 2,
        y: user.y - this.windowHeight / 2
      }
    },

    toPixels(coords) {
      return {
        x: coords.x * this.scale * this.windowWidth,
        y: coords.y * this.scale * this.windowHeight 
      }
    },

    getUserNames() {
      let usersArray = Object.values(this.users)
      let usernames = usersArray.map(user => user.name);
      return usernames
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
      let msgs = this.me.messages
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