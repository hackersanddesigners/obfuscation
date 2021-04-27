<template>
  <div
    :class="[
      'cursorContainer',
      {
        hovered: user.typing || hovered,
        dragging: dragging,
        me: isMe(user)
      }
    ]"

    :style="{ 
      left: ( 100 * user.x -  0.1) + '%',
      top: ( 100 * user.y - 0.15) + '%',
      '--scale': 15,
      '--userColor': `var(--${ user.uid })`,
    }"

    @mouseover.stop="hovered=true"
    @mouseout.stop="hovered=false"
  >
    <input 
      v-if="isMe(user)" 
      ref="input"
      tabindex="-1"
      class="input"
      type="text" 
      placeholder="type message & press enter"
      autofocus
    />

    <span 
      v-else
      class="input"
    >
      {{ user.typing }}
    </span>

    <div class="cursor">
      <span 
        class="name"
        @mouseover.stop="hovered=true"
        @mouseout.stop="hovered=false"
      >
        {{ 
          isMe(user) ? "me" : 
          user.connected === true ? user.name : 
          user.name + ' (offline)' 
        }}
      </span>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
// import _ from 'lodash'


export default {

  name: 'Cursorr',

  props: {
    user: Object,
    dragging: Boolean,
  }, 

  data() {
    return {
      hovered: false,
      current: String,
      navigation: false,
      announcement: false,
      mention: false,
      pos: null,
      locationTimer: 0,
      disconnectTimeoutID: null,
      badWords: [
        '<img',
        '<video',
        '<audio'
      ]
    }
  },

  computed: {
    ...mapState([

      'isMobile',
      'scale',
      'windowSize',
      'windowPos'
    
    ]),
    ...mapGetters([

      'me',
      'isMe',
      'networkConservationMode',
      'messagesByUser',
      'territoryByBorders',

    ])
  },

  mounted() {

    if (this.isMe && !this.isMobile) {
      document.addEventListener('mousemove', this.trackCursor)
      // document.addEventListener('mousemove', this.throttled)
      this.resetDisconnectTimer()
    }


  },
  
  methods: {


    // construct, sanitize and send the message through
    // the $socket.
  
    sendMessage() {
      const 
        input = this.$refs.input,
        message = this.constructMessage(input.value),
        msgs = this.messagesByUser(this.me)

      input.focus()


      // configure message type:

      if (this.navigation) {
        this.$router.push(input.value)
      }

      if (this.announcement) {
        message.content = message.content.replace('!!!', '')
      }

      if (this.mention) {
        let mentions = message.content.match(/@[a-zA-Z0-9_-]*/g)
        for (let m = 0; m < mentions.length; m++) {
          mentions[m] = mentions[m].replace('@', '')
          if (mentions[m] == "") {
            mentions.splice(m, 1)
          }
        }
        message.mentions = mentions
      }


      // sanitize and send through $socket:

      if (
        message.content && 
        message.content != ' ' &&
        !this.badWords.some(v => message.content.includes(v))
      ) {
        if ((msgs && msgs.length == 0) || (this.me.name.includes(this.me.uid))) {
          this.$store.commit('deregister')
        } else {
          this.$socket.client.emit('message', message)
          if (this.networkConservationMode) {
            this.$socket.client.emit('position', this.pos)
          }
        }
      }
        

        // clear variables for next event.

        this.announcement = false
        this.navigation = false
        this.mention = false
        this.stream = false
        this.current = null
        input.value = ''
        input.placeholder = ''
      
    },


    // construct message from self and input.

    constructMessage(text) {
      const 
        time = ((new Date()).getTime()),
        message = {
          uid: this.me.uid + time,
          author: this.me.name,
          authorUID: this.me.uid,
          content: text,
          time: time,
          color: this.me.color,
          x: this.me.x,
          y: this.me.y,
          deleted: false,
          censored: false,
          announcement: this.announcement,
          navigation: this.navigation,
          stream: this.stream,
          location: this.$store.state.location.slug,
        }
        return message
    },

    resetDisconnectTimer() {
      clearTimeout(this.disconnectTimeoutID)
      this.disconnectTimeoutID = setTimeout(() => { 
        this.disconnect()
      }, 60000) 
    },

    disconnect() {
      this.$store.dispatch('updatePosition', {
        x: this.me.x,
        y: this.me.y,
        connected: false,
      })
      this.$store.dispatch('updateTyping', {
        typing: null
      })
    },


    // send cursor position live through $store.

    trackCursor(e) {
      this.resetDisconnectTimer()

      if(!this.dragging) {
        const pos = {
          uid: this.me.uid,
          x: (this.windowPos.x + e.clientX) / (this.windowSize.w * this.scale),
          y: (this.windowPos.y + e.clientY) / (this.windowSize.h * this.scale),
          connected: true,
        }
        this.$store.dispatch('updatePosition', pos)
        this.pos = pos
        e.preventDefault()
      }
        
    },

    emitPos() {
      console.log('emit')
      this.$socket.client.emit('position', this.pos)
    },

    // handle user input, triggered from parent.

    trackInput(key) {
      let input = this.$refs.input

      // starting a messge with '~' will navigate 
      // to a user instead of sending the message.

      if (input.value == "~") {
        this.navigation = true


      // starting a message with ! will force all
      // users to navigate to it.

      } else if (input.value.startsWith('!!!')) {
        this.announcement = true


      } else if (input.value.includes('@')) {
        this.mention = true

      // set the stream playbackID for everyone

      } else if (input.value.includes('/stream')) {
        this.stream = true
      }


      // get user's message history and produces
      // a terminal-like 'command history'.

      const
        msgs = this.messagesByUser(this.me),

        first = msgs[0],
        last = msgs[msgs.length-1],
        previous = msgs[msgs.indexOf(this.current) - 1],
        next = msgs[msgs.indexOf(this.current) + 1]


      // UP and DOWN keys are used to scroll up 
      // and down the user's message history.

      if (key == 38) {

        if (!this.current) {
          this.current = last
        } else if (previous) {
          this.current = previous
        } else {
          this.current = first
        } 

        input.value = this.current.content
        input.select()

      } else if (key == 40) {

        if (this.current && next) {
          this.current = next
        }
        input.value = this.current.content
        input.select()


      // ENTER KEY: construct message and handle
      // the "send" action.

      } else if (key == 13) {
        this.sendMessage()


      //  ESAAPE KEY: clear and exit input.

      } else if (key == 27) {
        input.value = ''
        input.blur()
      }


      // announce every key press to your peers.

      this.$store.dispatch('updateTyping', {
        // typing: input.value
        uid: this.me.uid,
        typing: key == 27 || input.value == '' ? '' : "typing..."
      })

    }, 
  }
}
</script>

<style scoped>

.cursorContainer {
  position: absolute;
  font-family: jet;
  color: var(--userColor);
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
}
.cursorContainer.me {
  pointer-events: none;
}
.cursorContainer.me * {
  pointer-events: none;
}



.cursorContainer .cursor {
  min-width: calc(0.07vh * var(--scale));
  max-width: calc(0.07vh * var(--scale));
  height: calc(0.1vh * var(--scale));
  background: var(--userColor);
  box-shadow: var(--userColor) 5px 5px 20px;
  padding: 1px 5px 3px 5px;
  border-radius: 6px 10px 6px 10px;
  transition: all 0.2s ease;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.cursorContainer .cursor .name {
  color: white;
  white-space: nowrap;
  max-width: 0px;
  opacity: 0;
  overflow: hidden;
  transition: all 0.2s ease;
}
.cursorContainer .input {
  width: auto;
  padding: 0px;
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  margin-left: 5px;
  margin-bottom: 3px;
  pointer-events: none;
  transition: all 0.2s ease;
}
.cursorContainer input::selection,
.cursorContainer .input::selection {
  background: var(--userColor);
  color: white;
}
.cursorContainer input,
.cursorContainer input:hover,
.cursorContainer input:active {
  overflow: hidden;
  line-height: 1.6;
  resize: none;
  border: none;
  outline: none;
  background: transparent;
  cursor: none;
}

.cursorContainer.hovered .cursor {
  width: auto;
  max-width: 450px;
  transition: all 0.2s ease;
}
.cursorContainer.hovered .cursor .name {
  max-width: 450px;
  opacity: 1;
  transition: all 0.2s ease;
}
.cursorContainer.hovered .input, 
.cursorContainer.hovered input,
.cursorContainer.hovered input:hover,
.cursorContainer.hovered input:active {
  width: 700px;
  max-width: 700px;
}

.cursorContainer.dragging .cursor {
  height: 10px; width: 10px;
  padding: 1px 0px;
  border-radius: 12px;
  box-shadow: none;
}

</style>