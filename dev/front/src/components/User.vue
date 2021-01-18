<template>
  <div
    v-if="uid"
    class="user"
    :class="[
      uid,
      {
        me: isMe
      }
    ]"
    :style="{ '--userColor': color }"
  >
    <!-- <p 
      class="userLabel"
      @mouseover="!isMe ? hovered=true : null"
      @mouseleave="hovered=false"
    >
      <span>({{ (x).toFixed(2) }}, {{ (y).toFixed(2) }})</span>
      <span> {{ name }} </span>
    </p> -->
    <Cursorr
      ref="Cursor"
      :uid="uid" 
      :name="name" 
      :color="color" 
      :isMe="isMe"
      :x="x"
      :y="y"
      :typing="typing"
      :hovered="hovered"
      @mouseover.native="!isMe ? hovered=true : null"
      @mouseleave.native="hovered=false"
    />
    <Message
      v-for="message in messages"
      ref="Messages"
      :key="message.author + message.time + message.content"
      :uid="message.author"
      :author="message.author"
      :content="message.content"
      :time="message.time"
      :color="message.color"
      :x="message.x"
      :y="message.y"
      :hovered="hovered"
      @mouseover.native="hovered=true"
      @mouseleave.native="hovered=false"
    />
  </div>
</template>

<script>
import Cursorr from './Cursorr'
import Message from './Message'

export default {
  name: 'User',
  components: {
    Cursorr,
    Message
  },
  props: [ 
    'uid',
    'name',
    'color',
    'isMe',
  ], 
  data() {
    return {
      x: 0,
      y: 0,
      typing: '',
      messages: [],
      // cursorHovered: false,
      // messageHovered: false,
      hovered: false
    }
  },
  mounted() {
    // setInterval(() => {
    //   console.log(this.messages)
    // }, 1000)
  },
  methods: {
  }
}
</script>
<style scoped>
div.user {
  /* display: inline; */
  color: var(--userColor);
}
.userLabel {
  margin: 0.5vh 0.5vw;
}
</style>