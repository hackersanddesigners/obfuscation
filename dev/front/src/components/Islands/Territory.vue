<template>
  <div 
    class="territory"
    :id="name"
    :style="{
      left: `${ toNearestX(borders.x, 0.4) }%`,
      top: `${ toNearestX(borders.y, 0.4) }%`,
    }"
  >
    <Island
      :content="content"
    />

    <Overlay
      :content="content"
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
    'name',
    'borders',
  ],
  data() {
    return {
      content: {},
    }
  },
  computed: {
  },

  created() {
    this.$http.get(`${ this.$apiURL }/${ this.name }`)
      .then((response) => { 
        this.content = response.data
      })
      .catch((error) => { 
        console.log(error)
      })
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
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  cursor: none;
  /* z-index: 1; */
}
</style>