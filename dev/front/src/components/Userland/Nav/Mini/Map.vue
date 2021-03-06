<template>
  <div 
    id="minimap"
    :class="[
      'ui',
      { hovered: (!touring && hovered) || dragging }
    ]"
    :style="{
      minHeight: `${ height }px`,
      width: `${ width }px`
    }"
    @mouseover="hovered=true"
    @mouseout="hovered=false"
    @mousedown="mouseDown($event)"
    @mousemove="mouseMove($event)"
    @mouseup="mouseUp($event)"
  >

    <div class="terrContainer">
      <Territory
        v-for="territory in territories"
        :key='territory.slug'
        :hovered="hovered"
        :territory="territory"
      />
    </div>

    <div class="messageContainer">
      <Message
        v-for="message in messages"
        :key="message.uid"
        :message="message"
      />
    </div>

    <div class="cursorContainer">
      <Cursorr
        v-for="user in users"
        :key="user.uid"
        :user="user"
      />
    </div>

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
        @mousedown.stop="$store.commit('setScale', 10)"
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
    'miniDragging',
    'touring'
  ], 

  data() {
    return {
      hovered: false
    }
  },

  computed: {
    ...mapState({
      territories: state => state.territories.territories,
      left:        state => state.windowPos.x / 5,
      top:         state => state.windowPos.y / 5,
      width:       state => state.windowSize.w / 5,
      height:      state => state.windowSize.h / 5,
      scale:       state => state.scale,
      zoomIndex:   state => state.scale * 5
    }),
    ...mapGetters({
      users: 'users/notDeletedUsers',
      messages: 'messages/notDeletedMessages',
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

      this.$emit('newPosition', { x, y })
    },

  }


}
</script>

<style scoped>

#minimap {
  margin-top: 1vh;
  margin-left: 1vh;
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  /* z-index: 1; */
}

#minimap .messageContainer {
  width: 100%; height: 100%;
  cursor: inherit;
  filter: blur(1px);
  -webkit-filter: blur(1px);
  opacity: 0.9;
  transition: all 0.2s ease;
  z-index: 1;
}
:not(.touring) #minimap.hovered .messageContainer {
  filter: blur(0px);
  opacity: 1;
  transition: all 0.2s ease;
}

#minimap .zoom {
  z-index: 10;
  box-sizing: border-box;
  position: absolute;
  right: 0px;
  width: 24px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: stretch;
  font-size: 12pt;
  text-align: center;
  color: grey;
  color: var(--ui-front);
  background: var(--ui-back);
}
#minimap .zoom div {
  box-sizing: border-box;
  border-left: var(--ui-border);
  border-bottom: var(--ui-border);
}
</style>