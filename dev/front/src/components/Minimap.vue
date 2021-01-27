<template>
  <div 
    id="minimap"
    :class="{
      hovered: hovered || dragging
    }"
    :style="{
      height: `${ height }px`,
      width: `${ width }px`
    }"
      @mousedown="sendDesiredPosition($event); $emit('childDragging')"
      @mousemove="dragging ? sendDesiredPosition($event) : null"
      @mouseup="$emit('childStopDragging'); sendDesiredPosition($event)"
    >
    <Cursorr
      :user="me"
      :scale="scale"
    />
    <Cursorr
      v-for="user in users"
      :key="user.uid"
      :user="user"
      :scale="scale"
    />
    <MiniMessage
      v-for="message in messages"
      :key="message.uid"
      :message="message"
      :hovered="hovered"
      :dragging="dragging"
    />
    <Viewport
      id="viewport"
      ref="viewport"

      :width="windowWidth / zoomIndex"
      :height="windowHeight / zoomIndex"
      :left="windowLeft / zoomIndex"
      :top="windowTop / zoomIndex"

    />
  </div>
</template>

<script>
import Cursorr from './Cursorr.vue'
import MiniMessage from './MiniMessage.vue'
import Viewport from './Viewport.vue'

export default {
  name: 'Minimap',
  components: {
    Viewport,
    Cursorr,
    MiniMessage,
  },
  props: [ 
    'windowWidth',
    'windowHeight',
    'windowLeft',
    'windowTop',
    'scale',
    'me',
    'users',
    'messages',
    'dragging'
  ], 
  data() {
    return {
      width: this.windowWidth / 5,
      height: this.windowHeight / 5,
      zoomIndex: 5 * this.scale,
      mini: true,
      hovered: false
    }
  },
  watch: {
    windowWidth() {
      this.width = this.windowWidth / 5
    },
    windowHeight() {
      this.height = this.windowHeight / 5
    }
  },
  mounted() {
  },  
  methods: {
    sendDesiredPosition(e) {
      const 
        clickX = e.pageX - this.$el.offsetLeft,
        centerX =  this.width / (2 * this.scale),
        x = (clickX - centerX) * this.zoomIndex,
        
        clickY = e.pageY - this.$el.offsetTop,
        centerY = this.height / (2 * this.scale),
        y = (clickY - centerY) * this.zoomIndex

      this.$emit('newPosition', {x,y})
      e.stopPropagation()
    },
  }
}
</script>

<style scoped>
#minimap {
  margin-left: 2vh;
  position: relative;
  box-sizing: border-box;
  background: white;
  border: 1px solid grey;
  cursor: pointer;
}
</style>