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
      left: (x) + '%',
      top: (y) + '%',
      color: color,
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
      // hovered: Boolean
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
  /* flex-direction: column; */
  align-items: flex-start;
  /* pointer-events: none; */
  cursor: text;
}
.messageContainer .message {
  border: 1px solid;
  border-color: transparent;
  padding: 1px 5px;
  border-radius: 12px;
  transition: all 0.2s ease;
}
.messageContainer .time {
  margin: 4px 5px;
  opacity: 0;
  width: 0;
  font-size: 8pt;
  color: grey;
  transition: opacity 0.2s ease;
  white-space: nowrap;
  pointer-events: none;
}
.messageContainer .message * {
  text-decoration: none;
  margin: 0px;
}
.messageContainer .message iframe {
  width: 300px !important;
  height: 650px !important;
  border: none !important;
  border-radius: 15px;
}
.messageContainer .author {
  opacity: 0;
  /* transition: all 0.2s ease; */
}

.messageContainer.hover .message {
  border-color: unset;
  padding: 1px 10px;
}
.messageContainer.hover .time {
  opacity: 1;
}
/* .messageContainer.hover .author {
  opacity: 1;
} */

</style>