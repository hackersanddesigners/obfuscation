<template>
  <div
    :id="message.uid"
    :class="[
      'messageContainer',
      {
        hover: hovered,
        announcement: message.announcement
      } 
    ]"
    :style="{ 
      left: `${ toNearestX(message.x, 0.4) }%`,
      top: `${ toNearestX(message.y, 0.4) }%`,
      '--blur': `blur(${ (now - message.time) / 100000000 }px)`,
      '--userColor': `var(--${ message.authorUID })`,
    }"
      @mouseover="hovered=true"
      @mouseleave="hovered=false"
  >

    <vue-markdown 
      :inline="true"
      v-if="!message.censored" 
      class="message"
    > 
      {{ message.content }} 
    </vue-markdown>

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
        @click.stop="$emit('goTo', message.author)"
        >{{ message.author }}</span>

      <span 
        class="time"
        >, {{ fromNow(message.time) }}</span>
      <span v-if="isMe"> ● </span>
      <span 
        v-if="isMe"
        class="delete"
        @click.stop="deleteMessage(message)"
      >delete</span>
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
  ], 
  data() {
    return {
      now: (new Date()).getTime(),
      hovered: false
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions([
      'deleteMessage'
    ]),
    fromNow(time) {
      return moment(time).fromNow()
    },
    toNearestX(num, X) {
      // return Math.floor(100 * (num) / X) * X
      // console.log((100*num).toFixed(2))
      // return Math.floor(100*num)
      // return (100*num).toFixed(2)
      return Math.floor(100 * (num) / X) * X
    }
  }
}
</script>

<style>
.messageContainer {
  position: absolute;
  /* display: flex; */
  /* align-items: center; */
  cursor: text;
  filter: var(--blur);
  transition: filter 0.2s ease;
  font-family: jet;
  font-size: calc(1.7pt * var(--scale));
  z-index: 1;
  color: var(--userColor);
  padding: 0px 5px;
}
.messageContainer *::selection {
  background: var(--userColor);
  color: white;
}
.messageContainer .message {
  box-sizing: border-box;
  border: 1px solid;
  border-color: transparent;
  border-radius: 12px;
  transition: all 0.2s ease;
  /* line-height: 1.65; */
  line-height: 1.9vh;
}
.messageContainer .message p,
.messageContainer .message * {
  text-decoration: none;
  margin: 0px;
}
.messageContainer .message a {
  text-decoration: underline;
  color: inherit;
}
.messageContainer .message iframe {
  width: 300px !important;
  height: 650px !important;
  border: none !important;
  border-radius: 15px;
}

.messageContainer .details {
  margin-top: -4px;
  font-size: 80%;
  color: black;
  transition: opacity 0.2s ease;
  opacity: 0;
  height: 0;
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

.messageContainer .message.censored {
  color: black;
  font-style: italic;
}

.messageContainer.hover {
  filter: blur(0px);
  /* transition: filter 0.2s ease; */
}
.messageContainer.announcement .message {
  border: 1px dashed;
}
.messageContainer.hover .details {
  opacity: 1;
  height: auto;
}

</style>