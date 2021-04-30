<template>
  <div
    :id="message.uid"
    :class="[
      'messageContainer', 
      `message${message.uid}`,
      {
        hover: hovered,
        announcement: message.announcement
      } 
    ]"
    :style="{ 
      left: `${ toNearestX(message.x, 0.2) }%`,
      top: `${ toNearestX(message.y, 0.2) }%`,
      '--blur': blur,
      '--userColor': `var(--${ message.authorUID })`,
    }"
      @mouseover="hovered=true"
      @mouseleave="hovered=false"
  >

    <vue-markdown 
      v-if="!message.censored" 
      class="message"
      :source="message.content"
    ></vue-markdown>

    <div 
      v-else
      class="message censored"
    > 
      This message has been censored by a moderator.
    </div>

    <div class="details">
      <span> — </span>
      <span 
        class="author"
        @click.stop="$emit('goTo', message.authorUID)"
        >{{ message.author }}</span>
      <span 
        class="time"
        >, {{ fromNow(message.time) }}</span>
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
import { mapActions } from 'vuex'

export default {
  name: 'Message',
  components: {
  },
  props: [ 
    'isMe',
    'message',
    'isCompatible'
  ], 
  data() {
    return {
      hovered: false,
      now: (new Date()).getTime(),
    }
  },
  computed: {
    moderator() { return this.$store.getters.me.moderator }, 
    blur() {
      if (this.isCompatible) {
        const
          now = this.now,
          lifetime = this.$store.state.users[this.message.authorUID].messageLifetime,
          timeSent = this.message.time,
          timeElapsed = now - timeSent,
          blurString = `blur(${ 5 * timeElapsed / lifetime }px)` 
        return blurString
      } else {
        return null
      }
    }
  },
  created() {
    setInterval(() => {
      this.now = (new Date()).getTime()
    }, 60000)
  },
  methods: {
    ...mapActions([
      'deleteMessage',
      'censorMessage'
    ]),
    fromNow(time) {
      return moment(time).fromNow()
    },
    toNearestX(num, X) {
      return Math.floor(100 * (num) / X) * X
    }
  }
}
</script>

<style>
.messageContainer {
  position: absolute;
  z-index: 1;
  cursor: text;
  font-family: jet;
  font-size: calc(1 * var(--one));
  color: var(--userColor);
  filter: var(--blur);
  /* -webkit-filter: blur(0px); */
  transition: filter 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.messageContainer *::selection {
  color: white;
  background: var(--userColor);
}


.messageContainer .message {
  position: relative;
  max-width: calc(30 * var(--one));
  box-sizing: border-box;
  border: 1px solid;
  border-color: transparent;
  line-height: calc(1.5 * var(--one));
  transition: all 0.2s ease;
  /* filter: 
    drop-shadow(0 0 
    calc(0.15 * var(--one))
    rgba(0, 0, 0, 0.37)); */
}
.messageContainer .message p,
.messageContainer .message * {
  text-decoration: none;
  margin: 0;
}
.messageContainer .message a {
  text-decoration: underline;
  color: inherit;
}



.messageContainer .details {
  margin-top: calc(-0.15 * var(--one));
  font-size: calc(0.8 * var(--one));
  color: black;
  transition: opacity 0.2s ease;
  opacity: 0;
}
.messageContainer .details .delete,
.messageContainer .details .author,
.messageContainer .details .time {
  white-space: nowrap;
}
.messageContainer .details .author,
.messageContainer .details .delete {
  text-decoration: underline;
  cursor: pointer;
}


.messageContainer.hover {
  filter: blur(0px);
  -webkit-filter: blur(0px);
}
.messageContainer.hover .details {
  opacity: 1;
  height: auto;
}
.messageContainer .message.censored {
  opacity: 0.5;
  font-style: italic;
}
.messageContainer.announcement .message {
  border: 1.5px dashed;
  border-radius: calc(5 * var(--one));
  padding: 0 calc(0.5 * var(--one));
  margin-bottom: calc(0.5 * var(--one));;
}

</style>