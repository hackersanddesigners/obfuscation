<template>
  <div
    :class="[
      'mini-territory',
      { 
        hovered: hovered ,
        circle: isCircle
      }  
    ]"
    :id=" 'mini-' + territory.slug"
    :style="{ 
      left: `${ toNearestX(territory.borders.x, 0.4) }%`,
      top: `${ toNearestX(territory.borders.y, 0.4) }%`,
      width: `${ toNearestX(territory.borders.w, 0.4) }%`,
      height: `${ toNearestX(territory.borders.h, 0.4) }%`,
      '--ground': territory.color,
      '--image': shape,
    }"
  >
    <div class="box">
      <div class="background">
        <vue-markdown>
          {{ territory.name }}
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
  computed: {

    shape() { return `url("${this.$apiURL}${this.territory.shape.url}#svgView(preserveAspectRatio(none))")` },

    isCircle() {
      return (
        this.territory.slug === 'reception' ||
        this.territory.slug === 'toolbar' ||
        this.territory.slug === 'hangout'
      )
    },

  },

  mounted() {
  },

  methods: {

    toNearestX(num, X) {
      return Math.floor(100 * num / X) * X
    },

  }
}
</script>

<style>
.mini-territory {
  box-sizing: border-box;
  position: absolute;
  display: flex;
  padding: 5px;
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
  overflow: visible;
}

.mini-territory::before {
  box-sizing: border-box;
  position: absolute;
  content: '';
  top: -20%; left: -20%;
  height: 140%;
  width: 140%;
  z-index: 0;
  pointer-events: none;
  mask-image: var(--image);
  -webkit-mask-image: var(--image);
  mask-size: 100% 100%;
  mask-position: center center;
  background-color: var(--ground);
  overflow: visible;
}

.mini-territory .background div {
  max-width: 100%;
}
.mini-territory.hovered .background {
  filter: blur(0px);
  opacity: 0.8;
}
.mini-territory .box {
  height: 100%;
  width: 100%;
  /* border: 1px solid grey; */
  /* border-radius: 5px; */
  /* border: 1px solid grey; */
  /* border-radius: 100%; */
}
.mini-territory.circle .box {
  /* border-radius: 100%; */
}
</style>