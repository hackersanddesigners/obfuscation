<template>
  <div
    :style="{ 
      left: ( 100 * user.x -  0.1) + '%',
      top: ( 100 * user.y -  0.2) + '%',
      '--userColor': `var(--${ user.uid })`,
    }"
  >
  </div>
</template>

<script>
export default {
  name: 'Cursorr',
  props: [ 'user' ], 
}
</script>
<style scoped>
div {
  position: absolute;
  width: calc(0.15 * var(--one));
  max-width: calc(0.15 * var(--one));
  height: calc(0.15 * var(--one));
  background: var(--userColor);
}
</style>