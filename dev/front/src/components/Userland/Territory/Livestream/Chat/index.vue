<template>
  <div id="chatContainer" class="island">

    <div id="chat" ref="chat"> 
      <Message
        v-for="message in messages"
        :key="message.time"
        :message="message"
        @goTo="$emit('goTo', $event)"
      />
    </div>

    <div id="chatInput">
      <!-- <span>Messages sent during livestreamed sessions are grouped here.</span> -->
    </div>

  </div>
</template>

<script>
import Message from './Message'

export default {

	name: 'Chat',
  components: { Message },
  props: [ 'messages' ],
  data() {
    return {
    }
  },
  computed: {
    
  },
  created() {
  },
  mounted() {
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
  margin-top: calc(1 * var(--one));
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