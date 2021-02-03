<template>
  <div
    :style="{
      width: width + unit,
      height: height + unit,
      left: left + unit,
      top: top + unit,
    }"
  >
  </div>
</template>

<script>
export default {
  name: 'Window',
  components: {
  },
  props: [ 
    'width',
    'height',
    'left',
    'top'
  ], 
  data() {
    return {
      unit: 'px'
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped>
#viewport {
  box-sizing: border-box;
  position: absolute;
  border: 1px dashed grey;
  cursor: move;
  /* box-shadow: 0 0 0px 500px rgba(0, 0, 0, 0.02); */
  /* transition: box-shadow 0.1s ease; */
}
 #viewport:hover {
  /* box-shadow:none; */
  border-color: red;
}
</style>