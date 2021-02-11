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
  
    <div class="background">
      <vue-markdown>
        {{ territory.body || territory.name }}
      </vue-markdown>
    </div>

    <Island
      v-if="content"
      :name="territory.name"
      :slug="territory.slug"
      :content="content"
      @more="$router.push(`#${territory.slug}`); more=true"
    />

    <Overlay
      :class="{ hidden: !more }"
      :sections="content"
      @less="more=false"
    />

  </div>
</template>

<script>
import Island from './Island'
import Overlay from './Overlay'

export default {
  name: 'Territory',
  components: {
    Island,
    Overlay,
  },
  props: [
    'territory',
  ],
  data() {
    return {
      content: [],
      more: false
    }
  },
  computed: {
  },

  created() {
    if (this.slug === 'reception') {
      this.$http.get(`${ this.$apiURL }/about`)
        .then((response) => { 
          this.content = response.data.Sections
        })
        .catch((error) => { 
          console.log(error)
        })
    }

  },
  methods: {
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
  /* width: 100vw;
  height: 100vh; */
  display: flex;
  justify-content: center;
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
  opacity: 0.7;
}
.territory .background div {
  max-width: 80%;
}
</style>