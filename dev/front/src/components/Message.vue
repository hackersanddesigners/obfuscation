<template>
  <div
    v-if="message.uid && !message.deleted"
    :class="[
      'messageContainer',
      message.uid,
      {
        hover: hovered
      } 
    ]"
    :style="{ 
      left: `${ toNearestX(message.x, 0.4) }%`,
      top: `${ toNearestX(message.y, 0.4) }%`,
      '--blur': `blur(${ (now - message.time) / 100000000 }px)`,
      '--userColor': message.color,
    }"
  >
    <vue-markdown class="message"> {{ message.content }} </vue-markdown>
    <span class="time"> {{ fromNow(message.time) }} </span>
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
    'hovered'
  ], 
  data() {
    return {
      now: (new Date()).getTime()
    }
  },
  mounted() {
  },
  methods: {
    fromNow(time) {
      return moment(time).fromNow()
    },
    toNearestX(num, X) {
      return Math.floor(100 * num / X) * X
    }
  }
}
</script>

<style>
.messageContainer {
  position: absolute;
  display: flex;
  align-items: baseline;
  cursor: text;
  filter: var(--blur);
  transition: filter 0.2 ease;
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
.messageContainer .message * {
  text-decoration: none;
  margin: 0px;
}
.messageContainer .message *::selection {
  background: var(--userColor);
  color: white;
}
.messageContainer .message iframe {
  width: 300px !important;
  height: 650px !important;
  border: none !important;
  border-radius: 15px;
}
.messageContainer .time {
  margin: 0px 5px;
  opacity: 0;
  width: 0;
  font-size: 7pt;
  color: rgb(161, 161, 161);
  transition: opacity 0.2s ease;
  white-space: nowrap;
  pointer-events: none;
}
.messageContainer .author {
  opacity: 0;
  /* transition: all 0.2s ease; */
}

.messageContainer.hover {
  filter: blur(0px);
  transition: filter 0.2 ease;
}
.messageContainer.hover .message {
  /* border-color: unset; */
  /* padding: 0px 10px; */
}
.messageContainer.hover .time {
  opacity: 1;
}
/* .messageContainer.hover .author {
  opacity: 1;
} */

</style>