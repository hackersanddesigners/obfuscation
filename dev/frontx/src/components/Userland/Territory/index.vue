<template>
  <div 
    class="territory"
    :id="territory.slug"
    :style="{
      left: `${ toNearestX(territory.borders.x, 0.4) }%`,
      top: `${ toNearestX(territory.borders.y, 0.4) }%`,
      width: `${100 / 5}%`,
      height: `${100 / 5}%`,
    }"
  >
  
    <div 
      class="background"
    >
      <vue-markdown>
        {{ territory.name || territory.body }}
      </vue-markdown>
    </div>

    <Timetable
      v-if="content && type === 'sessions'"
      :content="content"
    />

    <Reception
      v-else-if="content && type === 'statics'"
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

export default {
  name: 'Territory',
  components: {
    Island,
    Reception,
    Timetable
  },
  props: [
    'territory',
  ],
  data() {
    return {
      content: [],
      type: null,
    }
  },
  computed: {
  },

  created() {

    let 
      query,
      isCollection

    switch(this.territory.slug) {

      case 'reception':
        query = 'statics'
        isCollection = true
        break

      case 'timetable':
        query = 'sessions'
        isCollection = true
        break

      case 'exhibition':
        query = 'videos'
        isCollection = true
        break

      default: 
        query = null
        isCollection = false
    
    }

    if (query) {
      this.getContent(query, isCollection)    
      this.type = query
    }



  },
  methods: {

    getContent(query, isCollection) {
      this.$http.get(`${ this.$apiURL }/${ query }`)

        .then((response) => { 
          this.content = 
            isCollection ? 
            response.data : 
            response.data.Sections
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
  font-size: calc(18pt * var(--scale));
  line-height: calc(18pt * var(--scale));
  filter: blur(10px);
  opacity: 0.5;
}
.territory .background div {
  max-width: 80%;
}
</style>