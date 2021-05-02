<template>
  <div
    :id="message.uid"
    :class="[
      'liveMessageContainer',
      `message${message.uid}`,
      {
        hovered: hovered,
        censored: message.censored
      }
    ]"
    :style="{ '--userColor': `var(--${ message.authorUID })`}"
    @mouseover="hovered=true"
    @mouseleave="hovered=false"
  >

    <div class="message">
      <span
        class="author"
        @click.stop="$emit('goTo', message.authorUID)"
      >{{ message.author }}</span>
      <span>: </span>
      <vue-markdown inline class="content"
        :source="content"
      ></vue-markdown>
    </div>

    <div class="details">
      <span class="time">{{ time }}</span>
      <span v-if="isMe || moderator"> ● </span>
      <span
        v-if="isMe || moderator"
        class="delete"
        @click.stop="deleteMessage(message)"
      >delete</span>
      <span v-if="moderator"> ● </span>
      <span
        v-if="moderator"
        class="delete"
        @click.stop="censorMessage(message)"
      >{{ message.censored ? 'uncensor' : 'censor' }}</span>
    </div>

  </div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Message',
  props: [ 'message'],
  data() {
    return {
      time: null,
      hovered: false,
    }
  },
  computed: {
    ...mapGetters('users', [
      'me',
    ]),
    moderator() { return this.me.moderator },
    isMe() { return this.message.authorUID === this.me.uid },
    content() { return this.message.censored ?
      'This message has been censored by a moderator.' : this.message.content
    }
  },
  created() {
    this.time = this.getTime()
    setInterval(() => {
      this.time = this.getTime()
    }, 60000)
  },
  methods: {
    ...mapActions('messages', [
      'deleteMessage',
      'censorMessage'
    ]),
    getTime() {
     return moment(this.message.time).fromNow()
    }

  }
}
</script>

<style>
.liveMessageContainer {
  position: relative;
  font-family: jet;
  font-size: calc(1 * var(--one));
  color: black;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.liveMessageContainer *::selection {
  color: white;
  background: var(--userColor);
}


.liveMessageContainer .message {
  box-sizing: border-box;
  border-color: transparent;
  line-height: calc(1.5 * var(--one));
}
.liveMessageContainer .message .author {
  text-decoration: underline;
  cursor: pointer;
}

.liveMessageContainer .message .content {
  display: inline;
}
.liveMessageContainer .message .content a {
  text-decoration: underline;
  color: inherit;
}

.liveMessageContainer .details {
  font-size: calc(0.8 * var(--one));
  color: black;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.liveMessageContainer .details .delete {
  text-decoration: underline;
  cursor: pointer;
}
.liveMessageContainer.hovered .details {
  opacity: 1;
}


.liveMessageContainer.censored .message .content {
  opacity: 0.5;
  font-style: italic;
}

</style>