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

    <div id="infoTitle">
      <span 
        :class="[
          'infoToggle',
          'hide',
          { hidden: !visible }
        ]"
        @click.stop="visible = hover = false"
      > hide &gt; </span>
      <span 
        :class="[
          'infoToggle',
          'show',
          { hidden: visible }
        ]"
        @click.stop="!dragging && peak ? visible = true : null"
      > 
        <!-- &gt; -->
          &lt; info
          <!-- ⓘ -->
      </span>
    </div>

    <div 
      :class="[
        'overlay', content.slug
      ]"
    >
      <!-- <span 
        class="close"
        @click.stop="visible = hover = false"
      >✕</span> -->

      
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
      moment: moment,

      content: {},
      type: null,
      register: false,
      info: true,
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
          this.content = this.territoryBySlug(this.location.slug)
          // console.log(this.content)
          this.peak = true
        } else {
          this.visible = this.hover = this.peak =  false
        
        }

      }
    },

    wantsToView(newSlug) {
      const query = newSlug.collection + '?slug=' + newSlug.page
      
      this.updateContent(query)
      // this.visible = this.peak = true
    }

  },
  mounted() {
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
          this.visible = this.peak = true
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
  /* top: 1vh; */
  right: -600px;
  min-width: 500px;
  width: 40%;
  max-width: 600px;
  min-height: 500px;
  height: 90%;
  max-height: 90%;
  overflow: hidden;
  z-index: 2;
  transition: all 0.2s ease;

  display: flex;
  flex-direction: column;
}
.overlayContainer.peak {
  cursor: pointer;
  right: calc(20px - 600px);
  right: calc(0px - 600px);
  /* box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.534); */
  /* box-shadow: inset 0 0 50px 0 rgba(0, 0, 0, 0.534); */
  /* box-shadow: var(--ui-box-shadow); */
}
.overlayContainer.hover {
  cursor: pointer;
  right: calc(100px - 600px);
  right: calc(0px - 600px);
  /* box-shadow:  0 0 30px 0 rgba(0, 0, 0, 0.534); */
  /* box-shadow: inset 0 0 30px 0 rgba(0, 0, 0, 0.534); */
  /* box-shadow: var(--ui-box-shadow); */
}
.overlayContainer.visible {
  cursor: default;
  right: 0;
  /* box-shadow: var(--ui-box-shadow); */
}


#infoTitle {
  box-sizing: border-box;
  position: relative;
  margin: 1vh;
  font-size: 10pt;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
}

#infoTitle span {
  cursor: pointer;
  text-decoration: none;
  padding: 0.5vh;
}

#infoTitle .infoToggle {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0vh 0.5vh;
  background: white;
  border: 1px solid grey;
  border-radius: var(--ui-border-radius);
  box-shadow: var(--ui-box-shadow);
  z-index: 1;
}

#infoTitle .infoToggle {
  padding: 0.5vh 1vh;
  transition: all 0.2s ease;
}
.infoToggle.hide {
  /* z-index: 1; */
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
  /* height: 100%; */
  /* width: 100%; */
  background: var(--ui-back);
  box-shadow: var(--ui-box-shadow);
  border-radius: var(--ui-border-radius);
  border: var(--ui-border);
  box-shadow: var(--ui-box-shadow);
  overflow: scroll;
}
.overlayContainer .close {
  position: sticky;
  left: 3%;
  top: 2%;
  cursor: pointer;
  font-size: calc(3.5pt * var(--scale));
  opacity: 0;
  transition: all 0.2s ease;
}
.overlayContainer.visible .close {
  opacity: 1;
}
.overlay .header {
  margin: 7%;
}
.overlay .header h3 { 
  font-size: 15pt;
  font-weight: normal;
}
.overlay .header h1 { 
  font-size: 25pt;
  font-family: 'zxx-noise';
}

#AanmelderCSS {

}
</style>