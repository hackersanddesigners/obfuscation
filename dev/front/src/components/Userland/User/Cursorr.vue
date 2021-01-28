<template>
  <div
    v-if="user.uid"
    :class="[
      'cursorContainer',
      {
        uid: user.uid,
        hovered: !scale && (user.typing || hovered),
        dragging: dragging
      }
    ]"
    :style="{ 
      left: ( 100 * user.x -  0.2 * 1 ) + '%',
      top: ( 100 * user.y -  0.2 * 0.75 ) + '%',
      '--scale': scale ? 5 : 15,
      '--userColor': user.connected ? user.color : 'lightgrey',
    }"
  >
    <input 
      v-if="!scale && isMe" 
      ref="input"
      class="input"
      type="text" 
      placeholder="type message & press enter"
      autofocus
    />
    <span 
      v-else-if="!scale"
      class="input"
    >
      {{ user.typing }}
    </span>
    <div class="cursor">
      <span 
        v-if="!scale && (user.typing || hovered)" 
        class="name"
      >
        {{ 
          isMe ? "me" : 
          user.connected ? user.name : 
          user.name + ' (offline)' 
        }}
      </span>
      <span v-else-if="!scale" class="name"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cursorr',
  components: {
  },
  props: [ 
    'user',
    'isMe',
    'scale',
    'hovered',
    'dragging'
  ], 
  data() {
    return {
    }
  },
  mounted() {
    if (this.isMe && !this.scale) {
      this.trackCursor()
    }
  },
  methods: {
    trackCursor() {
      document.addEventListener('mousemove', (e) => {

        this.$emit('newPosition', { 
          x: e.clientX,
          y: e.clientY
        })
        e.preventDefault()

      })
    }  
  }
}
</script>
<style scoped>
.cursorContainer {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  /* cursor: none; */
  /* transition: all 0.2s ease; */
  color: var(--userColor);
}
.cursorContainer * {
  /* cursor: none !important; */
}
.me .cursorContainer {
  pointer-events: none;
  cursor: none;
}
.cursorContainer .cursor {
  /* width: calc(1.5vh / var(--scale));
  max-width: calc(1.5vh / var(--scale));
  height: calc(1.5vh / var(--scale)); */
  width: calc(0.1vh * var(--scale));
  max-width: calc(0.1vh * var(--scale));
  height: calc(0.1vh * var(--scale));
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--userColor);
  box-shadow: var(--userColor) 0px 0px 30px;
  transition: all 0.2s ease;
  /* opacity: 0; */
}
.me .cursorContainer .cursor {
  cursor: none;
  /* pointer-events: none; */

}
.cursorContainer .cursor .name {
  color: white;
  white-space: nowrap;
  /* margin-bottom: -1px; */
}
.cursorContainer .input {
  width: auto;
  height: 15px;
  padding: 0px;
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  margin-left: 10px;
  margin-bottom: 3px;
  /* pointer-events: auto; */
  cursor: none;
  /* pointer-events: none; */
  /* background: rgba(255, 0, 0, 0.377); */
}

.cursorContainer.hovered .cursor {
  width: auto;
  max-width: 450px;
  padding: 0px 7.5px;
}

.cursorContainer input::selection,
.cursorContainer .input::selection {
  background: var(--userColor);
  color: white;
}
.cursorContainer input,
.cursorContainer input:hover,
.cursorContainer input:active {
  overflow: hidden;
  line-height: 1.6;
  resize: none;
  /* width: 400px; */
  border: none;
  outline: none;
  background: transparent;
  cursor: none;
}

.cursorContainer.dragging .cursor,
.cursorContainer.dragging input,
.cursorContainer.dragging input:hover,
.cursorContainer.dragging input:active {
  width: 0vw;
  max-width: 0vw;
  height: 0vh;
  cursor: grabbing;
}

</style>