<template>
  <video :class="{ fullscreen: controls }"
    muted
    crossorigin="anonymous"
    :controls="controls"
    autoplay
    tabindex="0"
  >
  </video>
</template>
<script>
import Hls from 'hls.js'
// import videoJS from 'video.js'

export default {
  name: 'Video',
  components: {
  },
  props: [
    'playbackId',
    'forcedPlaybackId',
    'desiresPosition',
    'muted',
    'playing',
    'fullscreen'
  ],
  data() {
    return {
      controls: false,
      retryInterval: null,
    }
  },
  computed: {
  },
  watch: {
    playbackId() {
      this.updateVideo()
      this.retryInterval = setInterval(() => {
        this.updateVideo()
      }, 20 * 1000) // 20 seconds
    },

    forcedPlaybackId() {
      clearInterval(this.retryInterval)
      this.updateVideo()
    },

    desiresPosition(newPosition) {
      if (this.active) {
        this.$el.currentTime = newPosition * this.$el.duration
      }    
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
    
    if (this.isMobile) {
      this.controls = true
    }

    if (this.playbackId)  {
      this.updateVideo()
      this.retryInterval = setInterval(() => {
        this.updateVideo()
      }, 20 * 1000) // 20 seconds
    }

    const prefixes = ["", "webkit", "moz", "ms"]
    prefixes.forEach((prefix) => { 
      this.$el.addEventListener(prefix+"fullscreenchange", () => {
        if( window.innerHeight !== screen.height) {
         this.$emit('unfullscreened') 
         if (!this.isMobile) {
          this.controls = false
         }
        }
      })
    })

    this.$el.addEventListener('timeupdate',() => {
      this.$emit('playing')
    })

    this.$el.addEventListener('loadedmetadata',() => {
      clearInterval(this.retryInterval)
      this.$emit('loadedmetadata')
    })

    this.$el.addEventListener('ended',() => {
      console.log('video ended')
      this.retryInterval = setInterval(() => {
        this.updateVideo()
      }, 20 * 1000) 
      this.$emit('ended')
    })

  },
  beforeDestroy() {
    clearInterval(this.retryInterval)
  },
  methods: {

    src(playbackId) { return this.forcedPlaybackId ? 
      `https://stream.mux.com/${playbackId}.m3u8` :
      `https://bbb.tbm.tudelft.nl/hls/${playbackId}.m3u8`
    },    


    updateVideo() {
      const 
        playbackId = this.playbackId,
        forcedPlaybackId = this.forcedPlaybackId,
        sourceUrl = this.src(forcedPlaybackId || playbackId),
        video = this.$el

      console.log("updating video src:", sourceUrl)

      // If HLS.js is supported on this platform

      if (Hls.isSupported()) {
        const hls = new Hls()
        hls.loadSource(sourceUrl)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play()
        })


      // If the player can support HLS natively

      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = sourceUrl
        video.addEventListener('loadedmetadata', () => {
          video.play()
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
}
video.fullscreen {
  object-fit: contain;
  height: unset;
}
@keyframes comein {
  0% { opacity: 0;}
  100% { opacity:1;}
}
.mobile video {
  object-fit:unset;
  height: unset;
}
</style>
