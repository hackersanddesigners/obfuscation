<template>
  <div
    :class="[
      'cursorContainer', {
      hovered: user.typing || hovered,
      dragging: dragging,
      me: isMe(user),
      moderator: user.moderator == true,
    }]"
    :style="{
      left: ( 100 * user.x -  0.1) + '%',
      top: ( 100 * user.y - 0.15) + '%',
      '--scale': 15,
      '--userColor': `var(--${ user.uid })`,
    }"
    @mouseover.stop="hovered=true"
    @mouseout.stop="hovered=false"
  >
    <!-- <input
      v-if="isMe(user)"
      ref="input"
      tabindex="-1"
      class="input"
      type="text"
      placeholder="type message & press enter"
      autofocus
    /> -->

    <textarea
      v-if="isMe(user)"
      ref="input"
      tabindex="-1"
      class="input"
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

export default {

  name: 'Cursorr',

  props: {
    user: Object,
    dragging: Boolean,
  },

  data() {
    return {
      hovered: false,
      current: '',
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
    ...mapState('territories', [
      'location'
    ]),
    ...mapGetters('territories', [
      'territoryByBorders',
    ]),
    ...mapGetters('users', [
      'me',
      'isMe',
      'networkConservationMode',
    ]),
    ...mapGetters('messages', [
      'messagesByUser',
    ]),
  },

  mounted() {

    if (this.isMe && !this.isMobile) {
      document.addEventListener('mousemove', this.trackCursor)
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

      if (!message.content.includes('@')) {
        this.mention = false
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
        if ((msgs && msgs.length == 0) && (this.me.name.includes(this.me.uid))) {
          this.$store.commit('users/deregister')
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
          content: text.trim(),
          time: time,
          color: this.me.color,
          x: this.me.x,
          y: this.me.y,
          deleted: false,
          censored: false,
          announcement: this.announcement,
          navigation: this.navigation,
          stream: this.stream,
          location: this.location.slug,
        }
        return message
    },

    resetDisconnectTimer() {
      clearTimeout(this.disconnectTimeoutID)
      this.disconnectTimeoutID = setTimeout(() => {
        this.disconnect()
      }, 5 * 60000)
    },

    disconnect() {
      this.$store.dispatch('users/updatePosition', {
        x: this.me.x,
        y: this.me.y,
        connected: false,
      })
      this.$store.dispatch('users/updateTyping', {
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
        this.$store.dispatch('users/updatePosition', pos)
        this.pos = pos
        e.preventDefault()
      }

    },

    // handle user input, triggered from parent.

    trackInput(key, e) {
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

        if (msgs && msgs.length > 0) {
          if (e) e.preventDefault()
          if (!this.current) {
            this.current = last
          } else if (previous) {
            this.current = previous
          } else {
            this.current = first
          }
          input.value = this.current.content
          input.select()
        }

      } else if (key == 40) {
        if (msgs && msgs.length > 0) {
          if (e) e.preventDefault()
          if (this.current && next) {
            this.current = next
          }
          input.value = this.current.content
          input.select()
        }


      // ENTER KEY: construct message and handle
      // the "send" action.

      } else if (key == 13) {
        if (e) e.preventDefault()
        this.sendMessage()


      //  ESAAPE KEY: clear and exit input.

      } else if (key == 27) {
        input.value = ''
        input.blur()
      }


      // announce every key press to your peers.

      this.$store.dispatch('users/updateTyping', {
        uid: this.me.uid,
        typing: key == 27 || input.value == '' ? '' : "typing..."
      })

      this.adjustHeight()

    },

    adjustHeight() {
      let
        minHeight = 10,
        el = this.$refs.input,
        outerHeight = parseInt(window.getComputedStyle(el).height, 10),
        diff = outerHeight - el.clientHeight + 5

      el.style.height = 0 + 'px'
      el.style.height = Math.max(minHeight, el.scrollHeight + diff) + 'px'
    }


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
  position: relative;
  min-width: calc(0.07vh * var(--scale));
  max-width: calc(0.07vh * var(--scale));
  height: calc(0.1vh * var(--scale));
  padding: 1px 5px 3px 5px;
  border-radius: 6px 10px 6px 10px;
  background: var(--userColor);
  box-shadow: var(--userColor) 5px 5px 20px;
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
  /* transition: all 0.2s ease; */
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

.cursorContainer textarea,
.cursorContainer textarea:hover,
.cursorContainer textarea:active {
  min-width: 300px;
  height: 20px;
  overflow: hidden;
  line-height: 1.6;
  resize: none;
  border: none;
  outline: none;
  box-sizing: border-box;
  position: relative;
  background: transparent;
  cursor: none;
  transition: all 0s ease;
  flex-shrink: 1;
}

.cursorContainer.hovered .cursor {
  width: auto;
  max-width: 300px;
  transition: all 0.2s ease;
}
.cursorContainer.moderator.hovered .cursor:before {
  width: 110%;
  left: -5%;
}

.cursorContainer.hovered .cursor .name {
  max-width: 450px;
  opacity: 1;
  transition: all 0.2s ease;
}
.cursorContainer.hovered .input,
.cursorContainer.hovered input,
.cursorContainer.hovered input:hover,
.cursorContainer.hovered input:active,
.cursorContainer.hovered textarea,
.cursorContainer.hovered textarea:hover,
.cursorContainer.hovered textarea:active {
  width: 300px;
  max-width: 300px;
}

.cursorContainer.dragging .cursor {
  height: 10px; width: 10px;
  padding: 1px 0px;
  border-radius: 12px;
  box-shadow: none;
}

.cursorContainer.moderator .cursor {
  overflow: visible;
}
.cursorContainer.moderator .cursor:before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  height: 130%; width: 130%;
  top: -15%; left: -15%;
  border-radius: inherit;
  border: 3px dashed var(--userColor);
  transition: all 0.2s ease;
}

</style>