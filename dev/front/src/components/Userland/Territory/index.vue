<template>
  <div 
    class="territory"
    :id="slug"
    :style="{
      left: `${ toNearestX(territory.borders.x, 0.4) }%`,
      top: `${ toNearestX(territory.borders.y, 0.4) }%`,


    }"
  >
  
    <div class="background">
      <vue-markdown>
        {{ territory.name || territory.body }}
      </vue-markdown>
    </div>

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
    />

    <Timetable
      v-else-if="content && slug === 'timetable'"
      ref="firstChild"
      :content="content"
    />

    <Glossary
      v-else-if="content && slug === 'glossary'"
      ref="firstChild"
      :content="content"
    />

    <Library
      v-else-if="content && slug === 'library'"
      ref="firstChild"
      :content="content"
    />

    <Hangout
      v-else-if="content && slug === 'hangout'"
      ref="firstChild"
      :content="content"
    />

    <Livestream
      v-else-if="content && slug === 'livestream'"
      ref="firstChild"
      :content="content"
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
      content: [],
    }
  },
  computed: {
    slug() { return this.territory.slug },
    scale() { return this.$store.state.scale },
    windowWidth() { return this.$store.state.windowSize.w },
    windowHeight() { return this.$store.state.windowSize.h }
  },

  created() {

    let 
      slug = this.slug,
      query = 
        slug === 'reception' ? 'statics' :
        slug === 'exhibition' ? 'videos' :
        slug === 'timetable' ? 'sessions' :
        slug === 'glossary' ? 'glossaries' :
        slug === 'library' ? 'libraries' :
        null

    if (query) {
      this.getContent(query)    
    }

  },
  mounted() {

    setTimeout(() => {

      const size = this.getTerritorySize()
      this.$store.commit('setTerritorySize', {
        slug: this.territory.slug,
        size: size
      })

    }, 500)

  
  },
  methods: {

    getContent(query) {
      this.$http.get(`${ this.$apiURL }/${ query }`)

        .then((response) => { 
          this.content = response.data 
          // console.log(this.content)
        })

        .catch((error) => { 
          console.log(error)
        })
    },

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