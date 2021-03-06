<template>
  <div
    :class="[
      'overlayContainer',
      { visible: desiresOverlay },
      { hidden: isGeneral },
    ]"
  >

    <div id="infoTitle">
      <span
        :class="[
          'ui', 'infoToggle', 'hide',
          { hidden: !desiresOverlay }
        ]"
        @click="$emit('hideOverlay')"
        :tabindex="desiresOverlay ? 0 : -1"
      > hide &gt; </span>
      <span
        :class="[
          'ui', 'infoToggle', 'show',
          { hidden: desiresOverlay }
        ]"
        @click="!dragging ? $emit('showOverlay') : null"
        :tabindex="desiresOverlay ? -1 : 0"
      >
        &lt; info
      </span>
    </div>

    <div
      v-if="content"
      :class="[
        'ui', 'overlay', content.slug
      ]"
      ref="overlay"
      tabindex="-1"
    >

      <article
        v-if="!content.Sections"
        class="content"
      >

        <Upload
          v-if="isUpload"
          ref="upload"
          :sending="sending"
          :sent="sent"
          :collection="content.collection"
          @sending="sending = !sending"
          @sent="sent = !sent, sending = false"
        />

        <Section
          v-else
          :section="content"
        />

      </article>

      <article
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
        ><a id="backupLink"
            href="https://www.aanmelder.nl/wo2021/subscribe"
          >Register online for the event.</a>
          <div id="AanmelderRootDiv"></div>
        </div>

      </article>

    </div>

    <div
      v-if="content && isUpload"
      class="submitContainer"
    >
      <input
        v-if="!sending"
        ref="submit"
        class="ui submit"
        type="button"
        :collection="content.type"
        :value="sent ? 'submit another' : 'submit'"
        @click.stop="$refs.upload.submit"
      >
    </div>

    <div
      v-if="content && content.slug === 'tour' && !isMobile && !touring"
      class="submitContainer"
    >
      <input
        ref="startTour"
        class="ui submit"
        type="button"
        value="Start Guided Tour"
        @click.stop="$emit('startTour')"
      >
    </div>
  </div>
</template>

<script>
import smoothHeight from 'vue-smooth-height'
import Section from './Section'
import Upload from './Upload'


export default {

  name: 'Overlay',

  components: {
    Section,
    Upload
  },

  props: [
    'dragging',
    'content',
    'isGeneral',
    'desiresOverlay',
    'touring'
  ],

  mixins:[ smoothHeight ],

  data() {
    return {
      isRegister: false,

      sending: false,
      sent: false,
    }
  },

  computed: {
    isMobile() { return this.$store.state.isMobile },
    isUpload() { return this.content.slug === 'upload' || this.content.slug === 'submit' }
  },

  watch: {
    content() {
      this.scrollTop()
      this.handleAanmelder()
    }
  },

  mounted() {

    this.$smoothElement({
      el: this.$el,
      hideOverflow: true,
      transition: 'all 0.2s ease'
    })

    this.scrollTop()
    this.handleAanmelder()
  },

  methods: {

    scrollTop() {
      if (this.$refs.overlay && this.$refs.overlay.scrollTop !== 0) {
        setTimeout(() => {
          this.$refs.overlay.scroll({
            top: 0,
            behavior: 'smooth'
          })
        }, 200)
      }
    },

    handleAanmelder() {
      if (this.content && this.content.slug === 'register') {
        this.isRegister = true
        let aanmelder = document.createElement('script')
        aanmelder.setAttribute('src', this.$aanURL)
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
  transition: all 0.2s ease;
}
.overlayContainer.hidden {
  right: -100vw;
  opacity: 0;
  transition: all 0.2s ease;
}

span:focus {
  box-shadow: 0 0 10px 0 var(--back);
  outline: 2px solid blue;
  /* background: green; */
}

#infoTitle {
  flex-shrink: 0;
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
#infoTitle .infoToggle.hide {
  padding: 0.5vh 1vh;
}
.infoToggle.hidden {
  opacity: 0;
  transition: all 0.2s ease;
}

.overlay {
  box-sizing: border-box;
  margin: 0vh 1vh 1vh 1vh;
  padding: 0;
  overflow: scroll;
}

.overlay section:first-of-type h1 {
  margin-top: 0 !important;

}
.submitContainer {
  display: flex;
  justify-content: flex-end;
  margin-right: 1vh;
}
.submit {
  cursor: pointer;
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
  max-height: calc(100% - 25px);
  /* max-height: 800px; */
  /* z-index: 2; */
}

.mobile .overlayContainer.visible {
  cursor: default;
  right: 0;
}

.mobile #infoTitle .infoToggle.show {
  /* position: fixed;
  right: 0; */
}
.mobile #infoTitle .infoToggle.hide {
}

@media screen and (max-height: 730px) {
  .overlayContainer {
    /* max-height: 90vh; */
    max-height: calc(100% - 25px);
  }
  .mobile .overlayContainer {

  }
}

</style>