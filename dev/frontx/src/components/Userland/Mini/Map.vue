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
      @mousedown="sendDesiredPosition($event); $emit('miniDragging')"
      @mousemove="miniDragging ? sendDesiredPosition($event) : null"
      @mouseup="$emit('miniStopDragging'); sendDesiredPosition($event)"
    >
    <Cursorr
      v-for="user in users"
      :key="user.uid"
      :user="user"
      :scale="scale"
    />
    <Message
      v-for="message in messages"
      :key="message.uid"
      :message="message"
      :hovered="hovered"
      :dragging="dragging"
    />
    <Territory
      v-for="island in islands"
      :key='island.name'
      :name="island.name"
      :borders="island.borders"
    />
    <Window
      id="viewport"
      ref="viewport"

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

import Cursorr from '../User/Cursorr'
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

      islands: state => state.islands,

      left: state => state.windowLeft / 5,
      top: state => state.windowTop / 5,
      width: state => state.windowWidth / 5,
      height: state => state.windowHeight / 5,
      scale: state => state.scale,
      zoomIndex: state => state.scale * 5
    
    }),
    ...mapGetters({

      users: 'notDeletedUsers',
      messages: 'notDeletedMessages',

    })
  },
  watch: {
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
  margin-top: 2vh;
  margin-left: 2vh;
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
  flex-direction: column;
  align-items: stretch;
  width: 24px;
  font-size: 16pt;
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