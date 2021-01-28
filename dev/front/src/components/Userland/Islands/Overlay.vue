<template>
  <div 
    class="overlayContainer"
    @scroll.stop
    @mousedown.stop
    @mouseup.stop
  >
    <div class="overlay">
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
.overlayContainer {
  cursor: auto;
  box-sizing: border-box;
  position: absolute;
  top: 5%;
  right: 5%;
  width: 40%;
  height: 90%;
  /* top: 0%;
  right: 0%;
  width: 50%;
  height: 100%; */
  background: rgb(255,253,84);
  /* box-shadow: inset 0px 0px calc(15px * var(--scale)) 0px rgba(0, 0, 0, 0.432); */
  box-shadow: inset 0px 0px calc(5px * var(--scale)) 0px rgba(0, 0, 0, 0.432);
  overflow: hidden;
  /* z-index: 1; */
  transition: all 0.4s ease;
  /* border-radius: calc(10px * var(--scale)); */
}
.overlayContainer.hidden {
  top: 50%;
  /* right: 50%; */
  height: 0%;
  /* max-height: 0%; */
  /* width: 0%; */
  /* max-width: 0%; */
}
.overlay {
  height: 100%;
  width: 100%;
  overflow: scroll;
}
.overlay .close {
  position: sticky;
  left: 3%;
  top: 2%;
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