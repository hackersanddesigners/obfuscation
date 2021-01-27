<template>
  <div 
    class="island"
    :style="{
      left: `${ x }%`,
      top: `${ y }%`,
      width:`${ w }%`,
      height: `${ h }%`,
    }"
  >

    <div class="title">
      <h1> {{ content.Title }} </h1>
    </div>
    <div class="body">
      <vue-markdown
        :source="content.Body"
      />
    </div>

    <Overlay
    />

  </div>
</template>

<script>
import Overlay from './Overlay'

export default {
  name: 'Landing',
  components: {
    Overlay
  },
  props: [
    'x',
    'y',
    'w',
    'h'
  ],
  data() {
    return {
      content: {},
    }
  },
  created() {
    this.$http.get(this.$apiURL + '/landing-area')
      .then((response) => { 
        this.content = response.data
        console.log(this.content)
      })
      .catch((error) => { 
        console.log(error)
      })
  }

}
</script>

<style scoped>
.island {
  position: absolute;
}
</style>