<template>
  <video :class="{ fullscreen: controls }"
    muted
    crossorigin="anonymous"
    :controls="controls"
    autoplay
    tabindex="0"
  ></video>
</template>
<script>
import Hls from 'hls.js'

export default {

  name: 'Video',

  props: [
    'playbackId',
    'forcedPlaybackId',
    'playing',
    'muted',
    'fullscreen'
  ],

  data() {
    return {
      controls: false,
      retryInterval: null,
      attempts: 0,
      maxAttempts: 30,
    }
  },

  computed: {
    isMobile() { return this.$store.state.isMobile }
  },

  watch: {
    playbackId() {
      this.updateVideo()
      this.resetRetryInterval()
    },

    forcedPlaybackId() {
      clearInterval(this.retryInterval)
      this.attempts = 0
      this.updateVideo()
    },

    playing(newState) {
      if (newState) {
        this.$el.play()
      } else {
        this.$el.pause()
      }
    },

    muted(newState) {
      if (newState) {
        this.$el.muted = true
      } else {
        this.$el.muted = false
      }
    },

    fullscreen(newState) {
      if (newState) {
        if (this.$el.requestFullScreen) {
          this.$el.requestFullScreen()
        } else if (this.$el.mozRequestFullScreen) {
          this.$el.mozRequestFullScreen()
        } else if (this.$el.webkitRequestFullScreen) {
          this.$el.webkitRequestFullScreen()
        }
        setTimeout(() => {
          this.controls = true
        }, 300)
      }
    }

  },
  mounted() {

    if (this.playbackId)  {
      this.updateVideo()
      this.resetRetryInterval()
    }

    if (this.isMobile) {
      this.controls = true
    }

    this.$el.addEventListener('loadedmetadata', () => {
      clearInterval(this.retryInterval)
      this.attempts = 0
      this.$emit('loadedmetadata')
    })
    this.$el.addEventListener('playing', () => {
      this.$emit('playing')
    })
    this.$el.addEventListener('pause', () => {
      this.$emit('pausing')
    })

    const prefixes = ["", "webkit", "moz", "ms"]
    prefixes.forEach(prefix => {
      this.$el.addEventListener(prefix+"fullscreenchange", () => {
        if( window.innerHeight !== screen.height) {
         this.$emit('unfullscreened')
         if (!this.isMobile) {
          this.controls = false
         }
        }
      })
    })

  },

  beforeDestroy() {
    clearInterval(this.retryInterval)
    this.attempts = 0
  },

  methods: {

    resetRetryInterval() {
      this.retryInterval = setInterval(() => {
        if (this.attempts < this.maxAttempts) {
          this.updateVideo()
          this.attempts++
        }
      }, 20 * 1000)
    },

    src(playbackId) {
      return (
        this.forcedPlaybackId ?
          `https://stream.mux.com/${playbackId}.m3u8` :
          `https://bbb.tbm.tudelft.nl/hls/${playbackId}.m3u8`
      )
    },

    updateVideo() {
      const
        playbackId       = this.playbackId,
        forcedPlaybackId = this.forcedPlaybackId,
        sourceUrl        = this.src(forcedPlaybackId || playbackId)

      console.log("* SOURCE:", sourceUrl)

      // If HLS.js is supported on this platform

      if (Hls.isSupported()) {
        const hls = new Hls()
        hls.loadSource(sourceUrl)
        hls.attachMedia(this.$el)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          this.$emit('playing')
        })

      // If the player can support HLS natively

      } else if (this.$el.canPlayType('application/vnd.apple.mpegurl')) {
        this.$el.src = sourceUrl
        this.$el.addEventListener('loadedmetadata', () => {
          this.$emit('playing')
        })
      }


    }
  }
}
</script>

<style>
video {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  animation: comein 1s ease-in;
  border-radius: inherit;
}
video.fullscreen {
  object-fit: contain;
  height: unset;
  cursor: default;
}
@keyframes comein {
  0% { opacity: 0;}
  100% { opacity:1;}
}
.mobile video {
  object-fit: cover;
  height: 100%;
  border-radius: inherit;
}
</style>
