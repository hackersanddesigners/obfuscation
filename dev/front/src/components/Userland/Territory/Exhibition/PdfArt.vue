<template>
  <div :class="['pdfArt', artwork.Category ]">

    <embed
      ref="viewer"
      :class="{ fullscreen: fullscreen }"
      :src="pdfURL"
    />

    <canvas
      ref="canvas"
    />

    <a
      class="externalLink"
      target="_blank"
      :href="pdfURL"
    >
      <img
        :src="imgURL"
      />
    </a>

    <div v-if="!isMobile" class="controls">
      <a
        target="_blank"
        :href="pdfURL"
      >
        <h3 class="">↗</h3>
      </a>
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
      imgURL: null,
    }
  },
  computed: {
    pdfURL() { return this.$apiURL + this.artwork.File.url },
    isMobile() { return this.$store.state.isMobile }
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
            viewport = page.getViewport({ scale: 1 }),
            canvas = this.$refs.canvas,
            context = canvas.getContext('2d')

          canvas.height = viewport.height
          canvas.width = viewport.width

          page
            .render({ canvasContext: context, viewport: viewport })
            .then(() => {
              this.imgURL = canvas.toDataURL()
            })
        })
      })
    },

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
.pdfArt a.externalLink,
.pdfArt {
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

.pdfArt a.externalLink,
.pdfArt img {
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

.pdfArt.SessionVideo img {
  min-width: calc(20 * var(--one));
  min-height: calc(20 * var(--one));
  max-width: calc(40 * var(--one));
  max-height: calc(40 * var(--one));
}
.pdfArt.Other img {
  min-width: calc(20 * var(--one));
  min-height: calc(20 * var(--one));
  max-width: calc(30 * var(--one));
  max-height: calc(30 * var(--one));
}
.pdfArt.Poster a.externalLink,
.pdfArt.Poster img {
  min-width: calc(10 * var(--one));
  min-height: calc(10 * var(--one));
  max-width: calc(15 * var(--one));
  max-height: calc(15 * var(--one));
}

.pdfArt canvas,
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
.pdfArt .controls a {
  flex-basis: 15%;
  cursor: pointer;
  text-decoration: none;
  text-align: right;
}

</style>