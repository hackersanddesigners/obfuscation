<template>
  <div 
    class="territory"
    :id="slug"
    :style="{
      left: `${ toNearestX(territory.borders.x, 0.4) }%`,
      top: `${ toNearestX(territory.borders.y, 0.4) }%`,
      '--ground': territory.color,
      '--image': shape,

    }"
  >
  
    <!-- <div class="background">
      <vue-markdown>
        {{ territory.name || territory.body }}
      </vue-markdown>
    </div> -->

    <Reception
      v-if="content && slug === 'reception'"
      ref="firstChild"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <Exhibition
      v-else-if="content && slug === 'exhibition'"
      ref="firstChild"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <Timetable
      v-else-if="content && slug === 'timetable'"
      ref="firstChild"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <Glossary
      v-else-if="content && slug === 'glossary'"
      ref="firstChild"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <Library
      v-else-if="content && slug === 'library'"
      ref="firstChild"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <Hangout
      v-else-if="content && slug === 'hangout'"
      ref="firstChild"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <Livestream
      v-else-if="content && slug === 'livestream'"
      ref="firstChild"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <div 
      class="placeholder"
      v-else-if="content"
      ref="firstChild"
    >
      <Island
        :name="territory.name"
        :slug="territory.slug"
        :content="content"
      />
    </div>

  </div>
</template>

<script>
import Reception from './Reception'
import Exhibition from './Exhibition'
import Timetable from './Timetable'
import Glossary from './Glossary'
import Library from './Library'
import Hangout from './Hangout'
import Livestream from './Livestream'
import Island from './Island'

      // width: `${100 / 5}%`,
      // height: `${100 / 5}%`,

      // minWidth: `${15}%`,
      // minHeight: `${15}%`,

export default {
  name: 'Territory',
  components: {
    Reception,
    Exhibition,
    Timetable,
    Glossary,
    Library,
    Hangout,
    Livestream,
    Island,
  },
  props: [
    'territory',
  ],
  data() {
    return {
      // content: [],
    }
  },
  computed: {
    slug() { return this.territory.slug },
    content() { return this.territory.content },
    scale() { return this.$store.state.scale },
    windowWidth() { return this.$store.state.windowSize.w },
    windowHeight() { return this.$store.state.windowSize.h },
    shape() { return `url("${this.$apiURL}${this.territory.shape.url}#svgView(preserveAspectRatio(none))")` }
    // shape() { return `url()` }
  },

  created() {


  },
  mounted() {

    const size = this.getTerritorySize()
    this.$store.commit('setTerritorySize', {
      slug: this.territory.slug,
      size: size
    })
  
  },
  methods: {

    toNearestX(num, X) {
      return Math.floor(100 * (num) / X) * X
    },

    getTerritorySize() {
      const 
        territoryEl = this.$el,
        realWidth = territoryEl.scrollWidth,
        realHeight = territoryEl.scrollHeight,
        width = realWidth / (this.scale * this.windowWidth),
        height = realHeight / (this.scale * this.windowHeight)

      return { 
        w: width,
        h: height
      }
      
    }



  }

}
</script>

<style scoped>
.territory {
  box-sizing: border-box;
  position: absolute;
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  /* align-items: center; */
  /* pointer-events: none; */
  cursor: inherit;
  min-width: 10%;
  min-height: 10%;
  /* z-index: 1; */


  /* background: var(--image);
  background-size:cover; */
  /* clip-path: var(--image); */
  /* shape-outside: var(--image); */
  /* background-color: var(--ground); */
  /* mask-image: var(--image); */
  /* filter:drop-shadow(0px 0px 30px var(--ground)); */
}
#reception {
  z-index: 1;
}

.territory::before {
  box-sizing: border-box;
  position: absolute;
  content: '';
  top: -15%; left: -15%;
  height: 130%; width: 130%;
  z-index: 0;
  pointer-events: none;
  background: var(--island-back) ;
  background-position: center center;
  mask-image: var(--image);
  -webkit-mask-image: var(--image);
  mask-size: 100% 100%;
  mask-position: center center;
  overflow: visible;
  background-color: var(--ground);
  /* transform: scale(1.3); */
  /* filter:drop-shadow(0px 0px 20px var(--ground)); */
}

.territory .placeholder {
  min-width: 70vw;
  min-height: 60vh;
  display: flex;

}

.territory .background {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'zxx-noise';
  font-size: calc(25pt * var(--scale));
  line-height: calc(21pt * var(--scale));
  filter: blur(10px);
  opacity: 0.5;
}
.territory .background div {
  /* max-width: 80%; */
}
</style>