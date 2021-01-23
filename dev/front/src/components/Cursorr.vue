<template>
  <div
    v-if="user.uid"
    :class="[
      'cursorContainer',
      {
        uid: user.uid,
        typing: user.typing || hovered
      }
    ]"
    :style="{ 
      left: ( user.x -  0.2 * 1 ) + '%',
      top: ( user.y -  0.2 * 0.75 ) + '%'
    }"
  >
    <input 
      v-if="isMe" 
      ref="input"
      class="input"
      type="text" 
      placeholder="type message & press enter"
      autofocus
    />
    <span 
      v-else 
      class="input"
    >
      {{ user.typing }}
    </span>
    <div class="cursor">
      <span 
        v-if="( user.typing || hovered )" 
        class="name"
      >
        {{ 
          isMe ? "me" : 
          user.connected ? user.name : 
          user.name + ' (offline)' 
        }}
      </span>
      <span v-else class="name"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cursorr',
  components: {
  },
  props: [ 
    'isMe',
    'user',
    'hovered',
  ], 
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
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
}
.cursorContainer * {
  /* cursor: none !important; */
}
.me .cursorContainer {
  /* pointer-events: none; */
  /* pointer-events: none; */
  cursor: none;
}
.cursorContainer .cursor {
  width: 2vh;
  max-width: 2vh;
  height: 2vh;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--userColor);
  box-shadow: var(--userColor) 0px 0px 20px;
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
.cursorContainer.typing  .cursor {
  width: auto;
  max-width: 450px;
  padding: 0px 10px;
}
.cursorContainer .input {
  min-width: 220px;
  width: auto;
  height: 15px;
  padding: 0px;
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  margin-left: 10px;
  margin-bottom: 3px;
  cursor: none;
  /* pointer-events: none; */
  /* background: rgba(255, 0, 0, 0.377); */
}
.cursorContainer input::selection,
.cursorContainer .input::selection {
  background: var(--userColor);
  color: white;
}
.cursorContainer textarea,
.cursorContainer textarea:hover,
.cursorContainer textarea:active,
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

</style>