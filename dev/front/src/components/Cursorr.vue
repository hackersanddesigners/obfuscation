<template>
  <div
    v-if="uid"
    class="cursorContainer"
    :class="{
      uid: uid,
      typing: typing || hovered
    }"
    :style="{ 
      left: (x - 1) + '%',
      top: (y - 0.75) + '%'
    }"
  >
    <input 
      v-if="isMe" 
      ref="input"
      class="input"
      type="textarea" 
      placeholder="type message & press enter"
    />
    <!-- <span v-else-if="hovered" class="input">{{ name }}</span> -->
    <span v-else class="input">{{ typing }}</span>
    <div class="cursor"
      :style="{
        background: color,
      }"
    >
      <!-- <span v-if="!isMe && (typing || hovered)" class="name">{{ name }}</span> -->
      <span v-if="(typing || hovered)" class="name">{{ isMe ? "me" : name }}</span>
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
  cursor: none;
  /* transition: all 0.2s ease; */
}
.cursorContainer * {
  cursor: none !important;
}
.me .cursorContainer {
  z-index: 0;
  /* pointer-events: none; */
  cursor: none;
}
.cursorContainer .cursor {
  width: 20px;
  max-width: 20px;
  height: 20px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
  /* opacity: 0; */
}
.me .cursorContainer .cursor {
  cursor: none;
  /* pointer-events: none; */

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
  width: auto;
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
  width: 400px;
  border: none;
  outline: none;
  background: transparent;
}

</style>