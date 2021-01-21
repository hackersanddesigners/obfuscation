<template>
  <div
    :class="[
      'user',
      uid,
      {
        me: isMe,
        disconnected: !connected
      }
    ]"
    :style="{ 
      '--userColor': connected ? color : color,
    }"
  >
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
      :connected="connected"
      @mouseover.native="!isMe ? hovered=true : null"
      @mouseleave.native="hovered=false"
    />
    <Message
      v-for="message in messages"
      ref="Messages"
      :key="message.uid"
      :uid="message.uid"
      :author="message.author"
      :content="message.content"
      :time="message.time"
      :color="message.color"
      :x="message.x"
      :y="message.y"
      :hovered="hovered"
      :deleted="message.deleted"
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
    'connected',
    'x',
    'y',
    'typing',
    'messages'
  ], 
  data() {
    return {
      hovered: false
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style scoped>
.user {
  color: var(--userColor);
}
.user.disconnected {
  filter: grayscale(1) brightness(3);
}
</style>