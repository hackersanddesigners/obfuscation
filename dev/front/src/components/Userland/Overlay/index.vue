<template>
  <div 
    :class="[
      'overlayContainer',
      { visible: visible },
    ]"
  >

    <div id="infoTitle">
      <span 
        :class="[
          'ui', 'infoToggle', 'hide',
          { hidden: !visible }
        ]"
        @click.stop="handleClose"
      > hide &gt; </span>
      <span 
        :class="[
          'ui', 'infoToggle', 'show',
          { hidden: visible }
        ]"
        @click.stop="!dragging ? visible = true : null"
      > 
        &lt; info
      </span>
    </div>

    <div 
      ref="overlay"
      :class="[
        'ui', 'overlay', content.slug
      ]"
    >

      <div 
        v-if="!content.Sections"
        class="content"
      >
        <Section
          :section="content"
        /> 
      </div>     

      <div
        v-else-if="content.Sections"
        class="content"
      >
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
          <div id="AanmelderRootDiv"></div>
        </div>
        
      </div>

    </div>
  </div>
</template>

<script>
import moment from 'moment'
import smoothHeight from 'vue-smooth-height'
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
  mixins:[ smoothHeight ],
  data() {
    return {
      moment: moment,

      content: {},
      type: null,
      register: false,
      info: true,
      visible: false
    }
  },
  computed: {
    location() { return this.$store.state.location },
    isMobile() { return this.$store.state.isMobile },
    territoryBySlug() { return this.$store.getters.territoryBySlug },
  },
  watch: {
    location (newLocation, oldLocation) {
      if (newLocation.slug !== oldLocation.slug) {

        if (this.location.slug !== 'general') {
          this.content = this.territoryBySlug(this.location.slug)
          if (!this.isMobile) {
            this.visible = true
          }
        } else {
          this.visible = false
        }

      }
    },

    wantsToView(newSlug) {
      const 
        terrName = newSlug.name,
        collection = 
          terrName === 'reception' ? 'statics' :
          terrName === 'timetable' ? 'sessions' :
          terrName === 'exhibition' ? 'videos' :
          terrName === 'glossary' ? 'glossaries' :
          null,
        query = collection + '?slug=' + newSlug.page
      
      this.updateContent(query)
      // this.visible = this.peak = true
    }

  },
  mounted() {
    this.$smoothElement({
      el: this.$refs.overlay,
      hideOverflow: true,
      transition: 'height 0.2s ease'
    })
  },
  methods: {

    updateContent(query) {
      this.$http.get(`${ this.$apiURL }/${ query }`)

        .then((response) => { 
          this.content = response.data[0] 
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
          this.visible = true
        })

        .catch((error) => { 
          console.log(error)
        })
    },

    handleClose() {
      if (this.$router.history.current.path.split('/')[2]) {
        this.$router.push('/' + this.location.slug)
      }
      this.visible = false
      setTimeout(() => {
        this.content = this.territoryBySlug(this.location.slug)
      }, 500)
    }
  }
}
</script>

<style scoped>

.overlayContainer {
  box-sizing: border-box;
  position: absolute;
  top: 0; right: -600px;
  width: 550px;
  max-height: 750px;
  overflow: hidden;
  z-index: 2;
  cursor: auto;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
}
.overlayContainer.visible {
  cursor: default;
  right: 0;
}

#infoTitle {
  box-sizing: border-box;
  position: relative;
  margin: 1vh;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
}
#infoTitle .infoToggle {
  display: flex;
  align-items: center;
  z-index: 1;
  cursor: pointer;
}
#infoTitle .infoToggle.show {
  position: fixed;
  padding: 0.5vh 1vh;
  right: 1vh;
  z-index: 0;
}
.infoToggle.hidden {
  opacity: 0;
}

.overlay {
  box-sizing: border-box;
  margin: 0vh 1vh 1vh 1vh;
  padding: 0;
  overflow: scroll;
}

#aanmelderContainer {
  border-top: 1px solid black;
}
#AanmelderCSS {
}

.mobile .overlayContainer {
  right: -100vw;
  min-width: 100vw;
  width: 100vw;
  max-width: 100vw;
  max-height: calc(100vh - 25px);
  /* max-height: 800px; */
}

.mobile .overlayContainer.visible {
  cursor: default;
  right: 0;
}

.mobile #infoTitle .infoToggle.show {
  /* position: fixed;
  right: 0; */
}

@media screen and (max-height: 730px) {
  .overlayContainer {
    max-height: 90vh;
  }
}

</style>