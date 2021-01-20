<template>
  <div
    v-if="uid"
    class="messageContainer"
    :class="[
      uid,
      {
        hover: hovered
      } 
    ]"
    :style="{ 
      left: `${x}%`,
      top: `${y}%`,
      '--blur': `blur(${ (now - time) / 1000000 }px)`
    }"
  >
    <vue-markdown class="message"> {{ content }} </vue-markdown>
    <span class="time"> {{ fromNow(time) }} </span>
    <!-- <span class="message"> {{ content }} </span> -->
    <!-- <span class="author"> {{ author }} </span> -->
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Message',
  components: {
  },
  props: [ 
    'uid',
    'author',
    'isMe',
    'content',
    'time',
    'color',
    'x',
    'y',
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
  border-color: unset;
  padding: 0px 10px;
}
.messageContainer.hover .time {
  opacity: 1;
}
/* .messageContainer.hover .author {
  opacity: 1;
} */

</style>