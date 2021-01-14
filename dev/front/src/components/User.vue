<template>
  <div
    v-if="uid"
    class="user"
    :class="{
      uid: uid,
      me: isMe
    }"
    :style="{ color: color }"
  >
    <span> {{ name }} </span>
    <span>({{ (100*x).toFixed(2) }} , {{ (100*y).toFixed(2) }})</span>
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
      :key="message.author + message.content"
      :uid="message.author + message.content"
      :author="message.author"
      :content="message.content"
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
      x: null,
      y: null,
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
}

</style>