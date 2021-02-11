<template>
  <div
    class="mini-territory"
    :id=" 'mini-' + id"
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
    'id',
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
.mini-territory {
  position: absolute;
  display: flex;
}
.mini-territory .box {
  margin: auto;
  height: 40%;
  width: 40%;
  border: 1px solid grey;
  /* border-radius: 100%; */
}
</style>