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
      :isMe=isMe
      :x="x"
      :y="y"
      :typing="typing"
      :hovered="cursorHovered"
      @mouseover.native="cursorHovered=true"
      @mouseleave.native="cursorHovered=false"
    />
  </div>
</template>

<script>
import Cursorr from './Cursorr'

export default {
  name: 'User',
  components: {
    Cursorr
  },
  props: [ 
    'uid',
    'name',
    'color',
    'isMe'
  ], 
  data() {
    return {
      x: null,
      y: null,
      typing: '',
      cursorHovered: false,
    }
  },
  mounted() {
    // setInterval(() => {
    //   console.log(this.typing)
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