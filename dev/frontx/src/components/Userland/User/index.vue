<template>
  <div
    :class="[
      'user',
      user.uid,
    ]"
    :style="{ 
    }"
  >
    <Cursorr
      ref="Cursor"

      :user="user"
      :isMe="isMe"
      :hovered="hovered"
      :dragging="dragging"

      @mouseover.native="!isMe ? hovered=true : null"
      @mouseleave.native="hovered=false"

      @newPosition="$emit('newPosition', $event)"
    />
    <Message
      v-for="message in messages"
      ref="Messages"

      :key="message.uid"
      :message="message"
      :isMe="isMe"

      @deleteMessage="$emit('deleteMessage', $event)"
      @mouseover.native="hovered=true"
      @mouseleave.native="hovered=false"
    />
  </div>
</template>

<script>
import Cursorr from './Cursorr'
import Message from './Message'

      // '--userColor': user.connected ? user.color : 'lightgrey',
      // '--userColor': user.connected ? `var(--${user.uid})` : 'lightgrey',
      // '--userColor': `var(--${ user.uid })`,

export default {
  name: 'User',
  components: {
    Cursorr,
    Message
  },
  props: [ 
    'user',
    'messages',
    'isMe',
    'dragging',
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
<style>
.user {
  color: var(--userColor);
  /* position: absolute; */
}
.user.disconnected {
  /* filter: grayscale(1) brightness(3); */
}
.user *::selection {
  background: var(--userColor);
  color: white;
}
</style>