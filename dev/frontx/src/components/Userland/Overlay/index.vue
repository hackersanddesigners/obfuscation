<template>
  <div 
    class="overlayContainer"
    :class="{
      hidden: hidden,
      peak: peak
    }"

    @mouseover.stop="hidden ? peak = true: null"
    @mouseout.stop="hidden ? peak = false: null"
    @mouseup.stop="hidden = peak = false"
  >
    <div class="overlay">
    <span 
      v-if="!hidden"
      class="close"
      @click.stop="hidden=true"
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
    'territory'
  ],
  data() {
    return {
      sections: null,
      hidden: true,
      peak: false,
    }
  },
  computed: {
    location () {
      return this.$store.state.location
    }
  },
  watch: {
    location (newLocation, oldLocation) {
      if (newLocation.slug !== oldLocation.slug) {
        this.updateContent()
      }
    }
  },
  mounted() {
  },
  methods: {
    updateContent() {
      if (this.territory && this.territory.slug === 'reception') {
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
}
</script>

<style scoped>
.overlayContainer {
  cursor: auto;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0px;
  width: 40%;
  height: 100%;
  background: rgb(255,253,84);
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.534);
  overflow: hidden;
  z-index: 2;
  transition: all 0.4s ease;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.overlayContainer.hidden {
  cursor: pointer;
  right: calc(20px - 40%);
  box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.534);
}
.overlayContainer.peak {
  cursor: pointer;
  right: calc(100px - 40%);
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.534);
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