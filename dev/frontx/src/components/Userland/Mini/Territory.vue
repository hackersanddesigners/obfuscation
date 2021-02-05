<template>
  <div
    class="miniterritory"
    :id=" 'mini-' + name"
    :style="{ 
      left: `${ toNearestX(borders.x, 0.4) }%`,
      top: `${ toNearestX(borders.y, 0.4) }%`,
      width: `${ 20 }%`,
      height: `${ 20 }%`,
    }"
  >
    <div class="box"></div>
  </div>
</template>

<script>
export default {
  name: 'Territory',
  props: [ 
    'name',
    'borders'
  ], 
  methods: {
    toNearestX(num, X) {
      return Math.floor(100 * num / X) * X
    }
  }
}
</script>

<style>
.miniterritory {
  position: absolute;
  display: flex;
}
.miniterritory .box {
  margin: auto;
  height: 40%;
  width: 40%;
  border: 1px solid grey;
  /* border-radius: 100%; */
}
</style>