<template>
  <div
    :class="[
      'mini-territory',
      { hovered: hovered }  
    ]"
    :id=" 'mini-' + territory.slug"
    :style="{ 
      left: `${ toNearestX(territory.borders.x, 0.4) }%`,
      top: `${ toNearestX(territory.borders.y, 0.4) }%`,
      width: `${ 20 }%`,
      height: `${ 20 }%`,
    }"
  >
    <div class="box">
      <div class="background">
        <vue-markdown>
          {{ territory.body || territory.name }}
        </vue-markdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Territory',
  props: [ 
    'territory',
    'hovered'
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
}
.mini-territory .background {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'zxx-noise';
  font-size: calc(0.7pt * var(--scale));
  line-height: calc(0.7pt * var(--scale));
  filter: blur(1px);
  opacity: 0.5;
  transition: all 0.1s ease;
}
.mini-territory .background div {
  max-width: 80%;
}
.mini-territory.hovered .background {
  filter: blur(0px);
  opacity: 0.8;
}
.mini-territory .box {
  margin: auto;
  height: 80%;
  width: 80%;
  border: 1px solid grey;
  border-radius: 5px;
  /* border: 1px solid grey; */
  /* border-radius: 100%; */
}
</style>