<template>
  <div class="island" >

    <div class="body">
      <Video />
    </div>

  </div>
</template>

<script>
import Video from './Video'

export default {
  name: 'Island',
  components: { Video },
}
</script>

<style scoped>
.island {
  box-sizing: border-box;
  position: relative;
  height: 80%; width: 80%;
  margin: calc(1 * var(--one));
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}
.island:hover {
  background-color: initial;
}
.island .body {
  height: 100%;
  width: 100%;
}
</style>