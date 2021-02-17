<template>
  <div 
    class="territory"
    :id="slug"
    :style="{
      left: `${ toNearestX(territory.borders.x, 0.4) }%`,
      top: `${ toNearestX(territory.borders.y, 0.4) }%`,
      width: `${100 / 5}%`,
      height: `${100 / 5}%`,
    }"
  >
  
    <div class="background">
      <vue-markdown>
        {{ territory.name || territory.body }}
      </vue-markdown>
    </div>

    <Reception
      v-if="content && slug === 'reception'"
      :content="content"
    />

    <Timetable
      v-else-if="content && slug === 'timetable'"
      :content="content"
    />

    <Hangout
      v-else-if="content && slug === 'hangout'"
      :content="content"
    />

    <Island
      v-else-if="content"
      :name="territory.name"
      :slug="territory.slug"
      :content="content"
    />

  </div>
</template>

<script>

import Island from './Island'
import Reception from './Reception'
import Timetable from './Timetable'
import Hangout from './Hangout'

export default {
  name: 'Territory',
  components: {
    Island,
    Reception,
    Timetable,
    Hangout
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
    slug() { return this.territory.slug }
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
  methods: {

    getContent(query) {
      this.$http.get(`${ this.$apiURL }/${ query }`)

        .then((response) => { 
          this.content = response.data 
        })

        .catch((error) => { 
          console.log(error)
        })
    },

    toNearestX(num, X) {
      return Math.floor(100 * (num) / X) * X
    },

  }

}
</script>

<style scoped>
.territory {
  box-sizing: border-box;
  position: absolute;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  /* pointer-events: none; */
  cursor: inherit;
  /* z-index: 1; */

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