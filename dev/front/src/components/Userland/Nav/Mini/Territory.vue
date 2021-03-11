<template>
  <div
    :id=" 'mini-' + territory.slug"
    :class="[
      'mini-territory',
      { hovered: hovered }  
    ]"
    :style="{ 
      left: `${ territory.borders.x * 100 }%`,
      top: `${ territory.borders.y * 100 }%`,
      width: `${ territory.borders.w * 100 }%`,
      height: `${ territory.borders.h * 100 }%`,
      '--ground': territory.color,
      '--image': shape,
    }"
  >

    <div class="background">
      <vue-markdown>
        {{ territory.name }}
      </vue-markdown>
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
  z-index: 0;
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
  opacity: 0.5;
  transition: all 0.1s ease;
  overflow: visible;
}

.mini-territory::before {
  box-sizing: border-box;
  position: absolute;
  content: '';
  top: -5%; left: -5%;
  height: 110%; width: 110%;
  top: 0%; left: 0%;
  height: 100%; width: 100%;
  z-index: 0;
  pointer-events: none;
  background-color: var(--ground);
  mask-image: var(--image);
  mask-size: 100% 100%;
  mask-position: center center;
  -webkit-mask-image: var(--image);
  -webkit-mask-size: 100% 100%;
  -webkit-mask-position: center center;
  mix-blend-mode: multiply;
  overflow: visible;
}

.mini-territory .background div {
  max-width: 100%;
}
.mini-territory.hovered .background {
  filter: blur(0px);
  opacity: 0.8;
}
</style>