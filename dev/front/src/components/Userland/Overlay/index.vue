<template>
  <div 
    class="overlayContainer"
    :class="{
      peak: peak,
      hover: hover,
      visible: visible,
    }"

    @mouseover="!dragging && peak ? hover = true : null"
    @mouseout="!dragging && peak ? hover = false : null"
    @mouseup="!dragging && peak && hover ? visible = true : null"
  >
    <div 
      :class="[
        'overlay', content.slug
      ]"
    >
      <span 
        class="close"
        @click.stop="visible = hover = false"
      >✕</span>

      <div class="content">
        <Section
          v-for="section in content.Sections"
          :key="section.id"
          :section="section"
        />
        <div 
          v-if="register"
          id="aanmelderContainer"
        >
          <a href="https://www.aanmelder.nl/wo2021/subscribe">
            Register online for the event.
          </a>
          <div id="AanmelderRootDiv">
          </div>
        </div>
      </div>

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
    'dragging',
    'wantsToView'
  ],
  data() {
    return {
      content: {},
      type: null,
      register: false,

      peak: false,
      hover: false,
      visible: false
    }
  },
  computed: {
    location() { return this.$store.state.location },
    territoryBySlug() { return this.$store.getters.territoryBySlug },
  },
  watch: {
    location (newLocation, oldLocation) {
      if (newLocation.slug !== oldLocation.slug) {

        if (this.location.slug !== 'general') {
          this.content = { Sections: [] }
          this.content.Sections[0] = this.territoryBySlug(this.location.slug)
          this.peak = true
        } else {
          this.visible = this.hover = this.peak =  false
        
        }

      }
    },

    wantsToView(newSlug) {
      const query = newSlug.collection + '?slug=' + newSlug.page
      
      this.updateContent(query)
      this.visible = this.peak = true
    }

  },
  mounted() {
  },
  methods: {

    updateContent(query) {
      this.$http.get(`${ this.$apiURL }/${ query }`)

        .then((response) => { 
          this.content = 
            response.data[0] ||
            response.data
          // console.log(this.content)

          if (this.content.slug === 'register') {
            this.register = true
            let aanmelder = document.createElement('script')
            aanmelder.setAttribute('src', 
              'https://www.aanmelder.nl/115987/xsembed?auth=UB-PSIJLXsgRsW62W1FtPyhMMTE1OTg3TApWRU1CRURVUkxDSEVDSwpwMAp0cDEKLg..'
            )
            document.head.appendChild(aanmelder)
          
          } else {
            this.register = false
          }
        })

        .catch((error) => { 
          console.log(error)
        })
    },

  }
}
</script>

<style scoped>
.overlayContainer {
  cursor: auto;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: -43%;
  width: 40%;
  height: 100%;
  background: rgb(255,253,84);
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.534);
  /* box-shadow: inset 0 0 20px 0 rgba(0, 0, 0, 0.534); */
  overflow: hidden;
  z-index: 2;
  transition: all 0.4s ease;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.overlayContainer.peak {
  cursor: pointer;
  right: calc(20px - 40%);
  box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.534);
  /* box-shadow: inset 0 0 50px 0 rgba(0, 0, 0, 0.534); */
}
.overlayContainer.hover {
  cursor: pointer;
  right: calc(100px - 40%);
  box-shadow:  0 0 30px 0 rgba(0, 0, 0, 0.534);
  /* box-shadow: inset 0 0 30px 0 rgba(0, 0, 0, 0.534); */
}
.overlayContainer.visible {
  cursor: default;
  right: 0px;
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