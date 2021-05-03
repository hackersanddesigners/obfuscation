<template>
  <div id="chatContainer" class="island">

    <div id="chat" ref="chat">
      <Message
        v-for="message in chatByTime"
        :key="message.time"
        :message="message"
        @goTo="$emit('goTo', $event)"
      />
    </div>

    <!-- <div id="chatInput">
      <span>Messages sent during livestreamed sessions are grouped here.</span>
    </div> -->

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Message from './Message'

export default {

	name: 'Chat',
  components: { Message },
  props: [ 'sessionOngoing' ],
  computed: {
    ...mapGetters('messages', [
      'messagesArray'
    ]),
    chatByTime() { return this.sessionOngoing ?
      this.messagesArray
      .filter(m => (
          m.uid &&
          !m.deleted &&
          !m.navigation &&
          !m.stream &&
          m.location === 'livestream'
      ))
      .sort((a, b) => a.time - b.time) : []
    },

  },
  mounted() {
    setTimeout(() => {
      this.scrollToBottom(true)
    }, 1000)
  },
  sockets: {
    message(m) {
      if (
        !m.deleted &&
        !m.navigation &&
        !m.stream &&
        !m.censored
      ) {
        this.scrollToBottom(true)
      }
    },
  },
  methods: {
    scrollToBottom(first) {
      setTimeout(() => {
        this.$refs.chat.scroll({
          top: this.$refs.chat.scrollHeight,
          behavior: 'smooth'
        })
      }, first ? 100 : 0)
    }
  }

}

</script>

<style scoped>

#chatContainer {
  box-sizing: border-box;
  flex-grow: 1;
  height: 70%;
  /* margin-top: calc(1 * var(--one)); */
}

#chat {
  box-sizing: border-box;
  height: 100%;
  overflow: scroll;
  padding: calc(2 * var(--one));
  border-radius: inherit;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

#chat::-webkit-scrollbar {
  display: none;
}

#chatInput {
  position: sticky;
  bottom: 0;
}

</style>