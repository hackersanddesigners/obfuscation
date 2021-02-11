<template>
  <div 
    id="minimap"
    :class="{ hovered: hovered || dragging }"
    :style="{
      height: `${ height }px`,
      width: `${ width }px`
    }"

    @mouseover="hovered=true"
    @mouseout="hovered=false"

    @mousedown="mouseDown($event)"
    @mousemove="mouseMove($event)"
    @mouseup="mouseUp($event)"
  >

    <Cursorr
      v-for="user in users"
      :key="user.uid"
      :user="user"
    />

    <Message
      v-for="message in messages"
      :key="message.uid"
      :message="message"
      :hovered="hovered"
      :dragging="dragging"
    />

    <Territory
      v-for="territory in territories"
      :key='territory.slug'
      :territory="territory"
    />

    <Window
      id="viewport"
      :width="width / scale"
      :height="height / scale"
      :left="left / scale"
      :top="top / scale"
    />

    <div class="zoom">

      <div class="in" 
        @mousedown.stop="$store.commit('zoomIn')"
        @mouseup.stop
      >+</div>

      <div class="out" 
        @mousedown.stop="$store.commit('zoomOut')"
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
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

import Cursorr from './Cursorr'
import Message from './Message'
import Territory from './Territory'
import Window from './Window'

export default {


  name: 'Map',

  components: {
    Cursorr,
    Message,
    Territory,
    Window,
  },

  props: [ 
    'dragging',
    'miniDragging'
  ], 

  data() {
    return {
      hovered: false
    }
  },

  computed: {
    ...mapState({

      territories: state => state.territories,

      left: state => state.windowPos.x / 5,
      top: state => state.windowPos.y / 5,
      width: state => state.windowSize.w / 5,
      height: state => state.windowSize.h / 5,
      scale: state => state.scale,
      zoomIndex: state => state.scale * 5
    
    }),
    ...mapGetters({

      users: 'notDeletedUsers',
      messages: 'notDeletedMessages',

    })
  },

  methods: {
    
    mouseDown(e) {
      this.sendDesiredPosition(e)
      this.$emit('startedDrag')
    },

    mouseMove(e) {
      if (this.miniDragging) {
       this.sendDesiredPosition(e)
      }
    },

    mouseUp(e) {
      this.$emit('stoppedDrag')
      this.sendDesiredPosition(e)
    },
    
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
  margin-top: 1vh;
  margin-left: 1vh;
  position: relative;
  box-sizing: border-box;
  background: white;
  border: 1px solid grey;
  cursor: pointer;
  overflow: hidden;
}
#minimap .zoom {
  box-sizing: border-box;
  position: absolute;
  right: 0px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: stretch;
  width: 24px;
  font-size: 12pt;
  text-align: center;
  color: grey;
  background: white;
}
#minimap .zoom div {
  box-sizing: border-box;
  border-left: 1px solid grey;
  border-bottom: 1px solid grey;
}
</style>