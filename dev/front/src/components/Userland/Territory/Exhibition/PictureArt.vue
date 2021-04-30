<template>
  <div :class="['pictureArt', artwork.Category ]">

    <embed
      ref="viewer"
      :class="{ fullscreen: fullscreen }"
      :src="imgURL"
    />

    <img 
      :src="imgURL" 
      @click.stop="enterFullscreen"
    /> 
    
    <div v-if="!isMobile" class="controls">
      <h3
        class="fullscreen"
        @click.stop="enterFullscreen"
      >⤢</h3>
    </div>


  </div>
</template>

<script>

export default {
  name: 'PictureArt',
  props: ['artwork'],
  data() {
    return {
      fullscreen: false,
    }
  },
  computed: {
    imgURL() { return this.$apiURL + this.artwork.File.url },
    isMobile() { return this.$store.state.isMobile }
  },
  mounted() {

    const prefixes = ["", "webkit", "moz", "ms"]
    prefixes.forEach((prefix) => { 
      this.$refs.viewer.addEventListener(prefix+"fullscreenchange", () => {
        if( window.innerHeight !== screen.height) {
         this.fullscreen = false 
        }
      })
    })

    
  },
  methods: {

    enterFullscreen() {
      if (!this.isMobile) {
        if (this.$refs.viewer.requestFullScreen) {
          this.$refs.viewer.requestFullScreen()
        } else if (this.$refs.viewer.mozRequestFullScreen) {
          this.$refs.viewer.mozRequestFullScreen()
        } else if (this.$refs.viewer.webkitRequestFullScreen) {
          this.$refs.viewer.webkitRequestFullScreen()
        }
        setTimeout(() => {
          this.fullscreen = true
        }, 300)
      }
    }
    

  }

}
</script>

<style scoped>
.pictureArt {
  box-sizing: border-box;
  position: relative;
  max-height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: inherit;
}


.pictureArt img {
  border-radius: inherit;
  box-sizing: border-box;
  position: relative;
  object-fit: cover;
  width: 100%;  
  cursor: pointer;
  min-width: calc(10 * var(--one));
  min-height: calc(10 * var(--one));
  max-width: calc(40 * var(--one));
  max-height: calc(40 * var(--one));
}

.pictureArt.SessionVideo img {
  min-width: calc(20 * var(--one));
  min-height: calc(20 * var(--one));
  max-width: calc(40 * var(--one));
  max-height: calc(40 * var(--one));
}
.pictureArt.Other img {
  min-width: calc(20 * var(--one));
  min-height: calc(20 * var(--one));
  max-width: calc(30 * var(--one));
  max-height: calc(30 * var(--one));
}
.pictureArt.Poster img {
  min-width: calc(10 * var(--one));
  min-height: calc(10 * var(--one));
  max-width: calc(15 * var(--one));
  max-height: calc(15 * var(--one));
}

.pictureArt embed {
  height: 0;
  width: 0;
  visibility: none;
  cursor: default;
}
.pictureArt embed.fullscreen {
  height: 100vh;
  width: 100vw;
  visibility:visible;

}
.pictureArt .controls {
  box-sizing: border-box;
  position: absolute;
  bottom: calc(-2.5 * var(--one));
  width: 110%;
  padding: 0 calc(1 * var(--one));
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 1;
}
.pictureArt .controls h3 { 
  flex-basis: 15%;
  cursor: pointer;
}
.pictureArt .controls h3.fullscreen {
  text-align: right;
}

</style>