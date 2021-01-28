<template>
  <div 
    class="overlay"
    @scroll.stop
    @mousedown.stop
    @mouseup.stop
  >
    <span 
      class="close"
      @click.stop="$emit('less')"
    >✕</span>
    <Section
      v-for="section in sections"
      :key="section.id"
      :section="section"
    />
  </div>
</template>

<script>
import Section from './Section'

export default {
  name: 'Overlay',
  components: {
    Section
  },
  props: [
    'content'
  ],
  data() {
    return {
      sections: []
    }
  },
  created() {
    if (!this.content.sections) {
      this.$http.get(`${ this.$apiURL }/about`)
        .then((response) => { 
          this.sections = response.data.Sections
        })
        .catch((error) => { 
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.overlay {
  cursor: auto;
  box-sizing: border-box;
  position: absolute;
  top: 5%;
  right: 5%;
  width: 45%;
  height: 90%;
  background: rgb(255,253,84);
  box-shadow: 0px 0px calc(10px * var(--scale)) rgba(0, 0, 0, 0.596);
  overflow: scroll;
  z-index: 1;
}
.overlay .close {
  position: sticky;
  left: 2%;
  top: 1%;
  cursor: pointer;
  font-size: calc(3.5pt * var(--scale));
}
.overlay .header {
  font-size: calc(5pt * var(--scale));
}
.overlay .header h1 { 
  font-size: inherit;
  /* margin-top: 0px; */
}
.overlay .body {
  font-size: calc(2.5pt * var(--scale));
}
</style>