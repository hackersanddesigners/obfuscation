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
#viewport {
  box-sizing: border-box;
  position: absolute;
  border: 1px dashed grey;
  cursor: move;
}
 #viewport:hover {
  border-color: red;
}
</style>