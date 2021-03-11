<template>
  <div
    :style="{
      width: width + 'px',
      height: height + 'px',
      left: left + 'px',
      top: top + 'px',
    }"
  >
  </div>
</template>

<script>
export default {
  name: 'Window',
  props: [ 
    'width',
    'height',
    'left',
    'top'
  ], 
}
</script>

<style scoped>
div {
  box-sizing: border-box;
  position: absolute;
  border: 1px solid;
  cursor: move;
  z-index: 9;
}
div:hover {
  border-color: rgb(187, 187, 7);
}
</style>