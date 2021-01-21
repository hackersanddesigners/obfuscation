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
  name: 'Viewport',
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
    // setInterval(() => {
    //   console.log(this.messages)
    // }, 1000)
  },
  methods: {
  }
}
</script>
<style scoped>
#viewport {
  box-sizing: border-box;
  position: absolute;
  border: 1px solid grey;
  cursor: move;
}
#viewport:hover {
  border-color: red;
}
</style>