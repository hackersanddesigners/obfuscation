<template>
  <div
    :class="[
      'user',
      user.uid,
      {
        me: isMe,
        disconnected: !user.connected
      }
    ]"
    :style="{ 
      '--userColor': user.connected ? user.color : 'lightgrey',
    }"
  >
    <Cursorr
      ref="Cursor"

      :user="user"
      :isMe="isMe"
      :hovered="hovered"

      @mouseover.native="!isMe ? hovered=true : null"
      @mouseleave.native="hovered=false"

      @newPosition="$emit('newPosition', $event)"
    />
    <Message
      v-for="message in user.messages"
      ref="Messages"

      :key="message.uid"
      :message="message"
      :isMe="isMe"
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
    'user',
    'isMe'
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
  /* filter: grayscale(1) brightness(3); */
}
</style>