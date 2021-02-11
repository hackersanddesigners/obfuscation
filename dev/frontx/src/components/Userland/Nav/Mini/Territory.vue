<template>
  <div
    class="mini-territory"
    :id=" 'mini-' + territory.slug"
    :style="{ 
      left: `${ toNearestX(territory.borders.x, 0.4) }%`,
      top: `${ toNearestX(territory.borders.y, 0.4) }%`,
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
    'territory'
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
  box-sizing: border-box;
  position: absolute;
  display: flex;
  border: 1px solid grey;
}
.mini-territory .box {
  margin: auto;
  height: 40%;
  width: 40%;
  /* border: 1px solid grey; */
  /* border-radius: 100%; */
}
</style>