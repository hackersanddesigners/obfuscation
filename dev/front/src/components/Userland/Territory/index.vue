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
    }"
  >
  
    <!-- <div class="background">
      <vue-markdown>
        {{ territory.name || territory.body }}
      </vue-markdown>
    </div> -->

    <svg 
      v-if="scale <= 7"
      class="shape" 
      :viewBox="viewBox"
      preserveAspectRatio="none"
    ><path :fill="territory.color" :d="d"/>
    </svg>

    <Reception
      v-if="slug === 'reception' && $lifecycle >= 0"
      :class="slug"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <Readme
      v-if="slug === 'readme' && $lifecycle >= 1"
      :class="slug"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <Exhibition
      v-else-if="slug === 'exhibition' && $lifecycle >= 2"
      :class="slug"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <Timetable
      v-else-if="slug === 'schedule' && $lifecycle >= 1"
      :class="slug"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <Contributors
      v-else-if="slug === 'contributors' && $lifecycle >= 1"
      :class="slug"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <StudyRoom
      v-else-if="slug === 'study-room' && $lifecycle >= 1"
      :class="slug"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <Library
      v-else-if="slug === 'library' && $lifecycle >= 1"
      :class="slug"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <Glossary
      v-else-if="slug === 'glossary' && $lifecycle >= 1"
      :class="slug"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <Hangout
      v-else-if="slug === 'hangout' && $lifecycle >= 1"
      :class="slug"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
    />

    <Livestream
      v-else-if="slug === 'livestream'"
      :class="slug"
      :content="content"
      @moreInfo="$emit('moreInfo', $event)"
      @goTo="$emit('goTo', $event)"
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
import Readme from './Readme'
import Exhibition from './Exhibition'
import Timetable from './Timetable'
import Contributors from './Contributors'
import StudyRoom from './StudyRoom'
import Library from './Library'
import Glossary from './Glossary'
import Hangout from './Hangout'
import Livestream from './Livestream'

export default {
  name: 'Territory',
  components: {
    Reception,
    Readme,
    Exhibition,
    Timetable,
    Contributors,
    StudyRoom,
    Library,
    Glossary,
    Hangout,
    Livestream,
  },
  props: [
    'territory',
  ],
  data() {
    return {
      d: null,
      viewBox: null,
    }
  },
  computed: { 
    scale() { return this.$store.state.scale },
    // lifecycle() { return this.$store.state.lifecycle },
    slug() { return this.territory.slug },
    content() { return this.territory.content },
  },
  created() {
    this.$http
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
  /* z-index: 5; */
}

.territory svg.shape {
  box-sizing: border-box;
  position: absolute;
  top: -15%; left: -15%;
  height: 130%; width: 130%;
  z-index: 0;
  pointer-events: none;
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
  /* filter: blur(10px); */
  opacity: 0.5;
}
.territory .background div {
  /* max-width: 80%; */
}

.mobile .territory::before {
  
  mask-image: var(--mobileImage);
  -webkit-mask-image: var(--mobileImage);

}
</style>