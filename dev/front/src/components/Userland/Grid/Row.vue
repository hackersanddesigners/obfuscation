<template>
  <tr>
    <Cell 
      v-for="index in x"
      :key="index"
    />
  </tr>
</template>

<script>
import Cell from './Cell'
export default {
  name: 'Row',
  components: { Cell },
  props: [ 'x' ], 
}
</script>

<style scoped>
</style>