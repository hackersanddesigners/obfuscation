<template>
  <div
    v-if="uid"
    class="cursorContainer"
    :class="{
      uid: uid,
      hover: hovered,
      typing: typing
    }"
    :style="{ 
      left: (100*x - 1) + '%',
      top: (100*y - 2) + '%'
    }"
  >
    <input 
      v-if="isMe" 
      ref="input"
      class="input"
      type="text" 
      placeholder="type message & press enter"
    />
    <span v-else-if="hovered" class="input">{{ name }}</span>
    <span v-else class="input">{{ typing }}</span>
    <div class="cursor"
      :style="{
        background: color,
      }"
    >
      <!-- {{ name }} -->
      <span v-if="typing" class="name">{{ name }}</span>
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
    'uid',
    'name',
    'color',
    'isMe',
    'x',
    'y',
    'typing',
    'hovered'
  ], 
  data() {
    return {
      // hovered: false,
    }
  },
  mounted() {
    //   setInterval(() => {
    //   console.log(this.typing)
    // }, 1000)
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
  /* pointer-events: none; */
  cursor: none;
}
.me .cursorContainer {
  z-index: 350;
  /* pointer-events: none; */
}
.cursorContainer .cursor {
  width: 20px;
  max-width: 20px;
  height: 20px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
}
.cursorContainer .cursor .name {
  color: white;
  /* margin-bottom: -1px; */
}
.cursorContainer.typing  .cursor {
  width: auto;
  max-width: 450px;
  padding: 0px 10px;
}
.cursorContainer .input {
  width: 450px;
  height: 15px;
  padding: 0px;
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  margin-left: 10px;
  margin-bottom: 3px;
  /* background: rgba(255, 0, 0, 0.377); */
}
.cursorContainer input,
.cursorContainer input:hover,
.cursorContainer input:active {
  border: none;
  outline: none;
  background: transparent;
}

</style>