<template>
  <div id="minimap">
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
import Viewport from './Viewport.vue'

export default {
  name: 'Minimap',
  components: {
    Viewport,
  },
  props: [ 
    'windowWidth',
    'windowHeight',
    'windowLeft',
    'windowTop',
    'zoomIndex'
  ], 
  data() {
    return {
      unit: 'px'
    }
  },
  mounted() {
    // setInterval(() => {
      // console.log(this.windowLeft)
    // },300)
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
#viewport {
  box-sizing: border-box;
  position: absolute;
  border: 1px solid grey;
  cursor: move;
}
#viewport:hover {
  border-color: red;
}
</style>