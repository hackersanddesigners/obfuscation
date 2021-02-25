<template>
  <div
    class="cursor"
    :style="{ 
      left: ( 100 * user.x -  0.1) + '%',
      top: ( 100 * user.y -  0.2) + '%',
      '--scale': 3,
      '--userColor': `var(--${ user.uid })`,
    }"
  >
  </div>
</template>

<script>
export default {
  name: 'Cursorr',
  props: [ 
    'user',
  ], 
}
</script>

<style scoped>
.cursor {
  position: absolute;
  width: calc(0.07vh * var(--scale));
  max-width: calc(0.07vh * var(--scale));
  height: calc(0.1vh * var(--scale));
  background: var(--userColor);
}
</style>