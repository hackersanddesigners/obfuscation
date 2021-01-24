<template>
  <div 
    id="minimap"
    :style="{
      height: `${ height }vh`,
      width: `${ width }vw`
    }"
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
    <Viewport
      id="viewport"
      ref="viewport"

      :width="windowWidth / zoomIndex"
      :height="windowHeight / zoomIndex"
      :left="windowLeft / zoomIndex"
      :top="windowTop / zoomIndex"

      v-dragged="dragViewport"
    />
  </div>
</template>

<script>
import Cursorr from './Cursorr.vue'
import Viewport from './Viewport.vue'

export default {
  name: 'Minimap',
  components: {
    Viewport,
    Cursorr,
  },
  props: [ 
    'windowWidth',
    'windowHeight',
    'windowLeft',
    'windowTop',
    'scale',
    'me',
    'users'
  ], 
  data() {
    return {
      height: 20,
      width: 20,
      zoomIndex: 5 * this.scale,
      mini: true,
    }
  },
  mounted() {
  },  
  methods: {
    dragViewport({ deltaX, deltaY, first, last }) {
      if (first) {
        this.dragging = true
        return
      }
      if (last) {
        this.dragging = false
        return
      }
      const newPosition = {
        x: this.windowLeft + deltaX * this.zoomIndex,
        y: this.windowTop + deltaY * this.zoomIndex,
      }
      this.$emit('newPosition', newPosition)
    },
  }
}
</script>

<style scoped>
#minimap {
  margin-left: 2vh;
  /* height: 20vh;
  width: 20vw; */
  position: relative;
  box-sizing: border-box;
  background: white;
  border: 1px solid grey;
}
</style>