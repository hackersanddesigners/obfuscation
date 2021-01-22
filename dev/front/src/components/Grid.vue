<template>
  <table
    id="grid"
    :class="{
      hidden: hidden
    }"
  >
  <tbody>
    <Row 
      v-for="index in y"
      :key="index"
      :x="x"
    />
  </tbody>
  </table>
</template>

<script>
import Row from './Row'
export default {
  name: 'Grid',
  components: { Row },
  props: [ 'hidden' ],
  data() {
    return {
      y: 250,
      x: 250,
      // y: 50,
      // x: 50,
    }
  },
}
</script>

<style scoped>
table {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  opacity: 0.075;
  transition: opacity 0.2s ease;
  pointer-events: none;
}
table.hidden {
  opacity: 0;
  transition: opacity 0.2s ease;
}
</style>