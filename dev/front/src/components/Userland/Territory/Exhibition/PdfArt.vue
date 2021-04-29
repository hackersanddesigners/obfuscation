<template>
  <div class="pdfArt">

    <embed
      ref="viewer"
      :class="{ fullscreen: fullscreen }"
      :src="pdfURL"
    />
    
    <canvas 
      ref="canvas" 
      @click.stop="enterFullscreen"
    />
    
    <div class="controls">
      <h3
        class="fullscreen"
        @click.stop="enterFullscreen"
      >⤢</h3>
    </div>


  </div>
</template>

<script>
import pdfjs from 'pdfjs-dist/build/pdf'
pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.entry'

export default {
  name: 'PdfArt',
  props: ['artwork'],
  data() {
    return {
      fullscreen: false,
    }
  },
  computed: {
    pdfURL() { return this.$apiURL + this.artwork.File.url },

    
  },
  created() {
    


  },
  mounted() {

    this.renderThumbnail()

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
    renderThumbnail() {
      pdfjs.getDocument(this.pdfURL).then(pdf => {
        pdf.getPage(1).then(page => {
          const 
            viewport = page.getViewport({ scale: 0.5 }),
            canvas = this.$refs.canvas,
            context = canvas.getContext('2d')

          canvas.height = viewport.height
          canvas.width = viewport.width

          page.render({ canvasContext: context, viewport: viewport })

        })
      })
    },

    enterFullscreen() {
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
</script>

<style scoped>
.pdfArt {
  box-sizing: border-box;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: inherit;
  overflow: visible;
}

.pdfArt canvas {
  border-radius: inherit;
  box-sizing: border-box;
  position: relative;
  max-width: 100%;
  max-height: 100%;
}

.pdfArt embed {
  height: 0;
  width: 0;
  visibility: none;
  cursor: default;
}
.pdfArt embed.fullscreen {
  height: 100vh;
  width: 100vw;
  visibility:visible;

}
.pdfArt .controls {
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
.pdfArt .controls h3 { 
  flex-basis: 15%;
  cursor: pointer;
}
.pdfArt .controls h3.fullscreen {
  text-align: right;
}

</style>