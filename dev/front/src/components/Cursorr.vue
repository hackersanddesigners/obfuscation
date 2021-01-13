<template>
  <div
    v-if="uid"
    class="cursorContainer"
    :class="{
      uid: uid,
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
      placeholder="send message"
    />
    <span v-else class="input">{{ typing }}</span>
    <div class="cursor"
      :style="{
        background: color,
      }"
    ></div>
    <!-- <span class="name"> {{ name }} </span> -->
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
    'typing'
  ], 
  data() {
    return {
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
  cursor: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  /* pointer-events: none; */
}
.cursorContainer .cursor {
  width: 15px;
  height: 15px;
  border-radius: 15px;
}
.cursorContainer .input {
  height: 15px;
  width: 100px;
  padding: 0px;
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  margin-left: 7.5px;
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