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
    }"
  >
    <svg 
      class="shape" 
      :viewBox="viewBox"
      preserveAspectRatio="none"
    >       
     <path :fill="territory.color" :d="d"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Territory',
  props: [ 
    'territory',
    'hovered'
  ], 
  data() {
    return {
      d: null,
      viewBox: null
    }
  },
  created() {
    this
    .$http
    .get(`${this.$apiURL}${this.territory.shape.url}`)
    .then((res) => {
      this.d = res.data
        .match(/ d="([\s\S]*?)"/g)[0]
        .replace(' d="', '')
        .replace('"', '')
      this.viewBox = res.data
        .match(/ viewBox="([\s\S]*?)"/g)[0]
        .replace(' viewBox="', '')
        .replace('"', '')
    })
  },
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
  font-size: 5px;
  line-height: 5px;
  opacity: 0.5;
  transition: all 0.1s ease;
  overflow: visible;
}
.mini-territory svg.shape {
  box-sizing: border-box;
  position: absolute;
  top: -5%; left: -5%;
  height: 110%; width: 110%;
  z-index: 0;
  pointer-events: none;
  mix-blend-mode: multiply;
  overflow: visible;
}
.mini-territory .background div {
  max-width: 100%;
}
.mini-territory.hovered .background {
  opacity: 0.8;
}
</style>