<template>
  <div
    v-if="!message.navigation"
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
      '--userColor': `var(--${ message.author })`,
    }"
      @mouseover="hovered=true"
      @mouseleave="hovered=false"
  >
    <vue-markdown 
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
    <span 
      class="time"
    > 
      {{ fromNow(message.time) }} 
    </span>
    <span 
      v-if="isMe"
      class="delete"
      @click.stop="$emit('deleteMessage', message)"
    >
      delete
    </span>
  </div>
</template>

<script>
import moment from 'moment'

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
  display: flex;
  align-items: center;
  cursor: text;
  filter: var(--blur);
  transition: filter 0.2 ease;
  z-index: 1;
  color: var(--userColor);
}
.messageContainer *::selection {
  background: var(--userColor);
  color: white;
}
.messageContainer .message {
  box-sizing: border-box;
  border: 1px solid;
  border-color: transparent;
  padding: 0px 5px;
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
.messageContainer .delete,
.messageContainer .time {
  margin: 0px 5px;
  opacity: 0;
  width: 0;
  font-size: 80%;
  color: rgb(161, 161, 161);
  transition: opacity 0.2s ease;
  white-space: nowrap;
  /* pointer-events: none; */
}
.messageContainer .delete {
  text-decoration: underline;
  cursor: pointer;
}

.messageContainer .message.censored {
  color: lightgray;
  font-style: italic;
}

.messageContainer.hover {
  filter: blur(0px);
  transition: filter 0.2 ease;
}
.messageContainer.announcement .message {
  border: 1px dashed;
}
.messageContainer.hover .delete,
.messageContainer.hover .time {
  opacity: 1;
  width: auto;
}

</style>