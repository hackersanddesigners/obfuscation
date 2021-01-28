<template>
  <table
    id="grid"
    :class="{
      hidden: hidden
    }"
  >
  <tbody>
    <Row 
      v-for="index in scale * definition"
      :key="index"
      :x="scale * definition"
    />
  </tbody>
  </table>
</template>

<script>
import Row from './Row'
export default {
  name: 'Table',
  components: { Row },
  props: [ 
    'scale',
    'hidden'  
  ],
  data() {
    return {
      definition: 10
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