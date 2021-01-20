
<template>
  <div>Coords: {{coords.x}}, {{coords.y}}, {{coords.z}}</div>
</template>

<script>
export default {
  name: 'Tile',
  props: {
    coords: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>
div {
  border: 1px solid black;
}
</style>