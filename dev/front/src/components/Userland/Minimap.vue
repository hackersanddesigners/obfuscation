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
      @mouseover="hovered=true"
      @mouseout="hovered=false"
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
    <MiniTerritory
      v-for="island in islands"
      :key='island.name'
      :name="island.name"
      :borders="island.borders"
    />
    <Viewport
      id="viewport"
      ref="viewport"

      :width="windowWidth / zoomIndex"
      :height="windowHeight / zoomIndex"
      :left="windowLeft / zoomIndex"
      :top="windowTop / zoomIndex"
    />
    <div class="zoom">
      <div class="in" 
        @mousedown.stop="$emit('zoomin')"
        @mouseup.stop
      >+</div>
      <div class="out" 
        @mousedown.stop="$emit('zoomout')"
        @mouseup.stop
      >-</div>
      <div class="zero" 
        @mousedown.stop="$emit('zero')"
        @mouseup.stop
      >○</div>
    </div>
  </div>
</template>

<script>
import Cursorr from './Cursorr.vue'
import MiniMessage from './MiniMessage.vue'
import MiniTerritory from './MiniTerritory.vue'
import Viewport from './Viewport.vue'

export default {
  name: 'Minimap',
  components: {
    Viewport,
    Cursorr,
    MiniMessage,
    MiniTerritory,
  },
  props: [ 
    'windowWidth',
    'windowHeight',
    'windowLeft',
    'windowTop',
    'scale',
    'me',
    'users',
    'islands',
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
    },
    scale() {
      this.zoomIndex = 5 * this.scale
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
#minimap .zoom {
  box-sizing: border-box;
  position: absolute;
  right: 0px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 24px;
  font-size: 16pt;
  text-align: center;
  color: grey;
}
#minimap .zoom div {
  box-sizing: border-box;
  border-left: 1px solid grey;
  border-bottom: 1px solid grey;
}
</style>