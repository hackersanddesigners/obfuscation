<template>
  <div 
    :class="[
      'overlayContainer',
      { visible: desiresOverlay },
      { hidden: isGeneral }
    ]"
  >

    <div id="infoTitle">
      <span 
        :class="[
          'ui', 'infoToggle', 'hide',
          { hidden: !desiresOverlay }
        ]"
        @click.stop="$emit('hideOverlay')"
      > hide &gt; </span>
      <span 
        :class="[
          'ui', 'infoToggle', 'show',
          { hidden: desiresOverlay }
        ]"
        @click.stop="!dragging ? $emit('showOverlay') : null"
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
          v-if="isRegister"
          id="aanmelderContainer"
        >
          <a 
            id="backupLink"
            href="https://www.aanmelder.nl/wo2021/subscribe"
          >
            Register online for the event.
          </a>
          <div id="AanmelderRootDiv"></div>
        </div>
        
      </div>

    </div>
  </div>
</template>

<script>
import smoothHeight from 'vue-smooth-height'
import Section from './Section'

export default {

  name: 'Overlay',

  components: { Section },

  props: [
    'dragging',
    'content',
    'isGeneral',
    'desiresOverlay'
  ],

  mixins:[ smoothHeight ],

  data() {
    return {
      isRegister: false,
    }
  },

  computed: {
  },

  watch: {
    content() {
      this.handleAanmelder()
    }
  },

  mounted() {

    this.$smoothElement({
      el: this.$refs.overlay,
      hideOverflow: true,
      transition: 'height 0.2s ease'
    })

    this.handleAanmelder()
  },

  methods: {

    handleAanmelder() {
      if (this.content.slug === 'register') {
        this.isRegister = true
        let aanmelder = document.createElement('script')
        aanmelder.setAttribute('src', 
          'https://www.aanmelder.nl/115987/xsembed?auth=UB-PSIJLXsgRsW62W1FtPyhMMTE1OTg3TApWRU1CRURVUkxDSEVDSwpwMAp0cDEKLg..'
        )
        document.head.appendChild(aanmelder)
      } else {
        this.isRegister = false
      }
    },

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
  opacity: 1;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  /* background: blue; */
}
.overlayContainer.visible {
  cursor: default;
  right: 0;
}
.overlayContainer.hidden {
  right: -100vw;
  opacity: 0;
}

#infoTitle {
  box-sizing: border-box;
  position: relative;
  margin: 1vh;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
  /* background: red; */
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
#backupLink {
  margin: 2vh;
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