<template>
  <div 
    class="territory"
    :id="slug"
    :style="{
      left: `${ territory.borders.x * 100 }%`,
      top: `${ territory.borders.y * 100 }%`,
      width: `${ territory.borders.w * 100 }%`,
      height: `${ territory.borders.h * 100 }%`,
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
      v-if="slug === 'reception'"
      :class="slug"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <Exhibition
      v-else-if="slug === 'exhibition'"
      :class="slug"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <Timetable
      v-else-if="slug === 'timetable'"
      :class="slug"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <Glossary
      v-else-if="slug === 'glossary'"
      :class="slug"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <Library
      v-else-if="slug === 'library'"
      :class="slug"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <Hangout
      v-else-if="slug === 'hangout'"
      :class="slug"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <Livestream
      v-else-if="slug === 'livestream'"
      :class="slug"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <div 
      class="placeholder"
      :class="slug"
      v-else-if="content"
    >
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
  },
  props: [
    'territory',
  ],
  data() {
    return {
    }
  },
  computed: {
    slug() { return this.territory.slug },
    content() { return this.territory.content },
    shape() { return `url("${this.$apiURL}${this.territory.shape.url}#svgView(preserveAspectRatio(none))")` }
  },
  created() {
  },
  mounted() {
  },
  methods: {

  }

}
</script>

<style scoped>
.territory {
  box-sizing: border-box;
  position: absolute;
  display: flex;
  cursor: inherit;
}
.territory::before {
  box-sizing: border-box;
  position: absolute;
  content: '';
  /* top: 0%; left: 0%;
  height: 100%; width: 100%; */
  top: -5%; left: -5%;
  height: 110%; width: 110%;
  /* top: -15%; left: -15%;
  height: 130%; width: 130%; */
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