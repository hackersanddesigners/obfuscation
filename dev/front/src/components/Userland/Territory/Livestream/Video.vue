<template>
  <video 
    muted
    :controls="controls"
    autoplay
  >
  </video>
</template>
<script>
import Hls from 'hls.js'

export default {
  name: 'Video',
  components: {
  },
  props: [
    // 'playbackId',
    // 'stream',

    'desiresPosition',
    'muted',
    'playing',
    'fullscreen'
  ],
  data() {
    return {
      controls: false,
    }
  },
  computed: {
    playbackId() { return this.$store.state.stream.playbackId }
  },
  watch: {
    playbackId(newState) {
      console.log(newState)
      if (newState) {
        this.updateVideo()
      } else {
        this.$el.src = null
      }
    },

    // stream(newState) {
    //   // if (oldState !== newState && newState.playbackId) {
    //   if (newState.status === 'active') {
    //     this.updateVideo()
    //   } else {
    //     this.$el.src = null
    //   }
    // },

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
      const elapsedTime = this.$el.currentTime / this.$el.duration
      this.$emit('elapsed', elapsedTime)
    })

  },
  methods: {

    src: playbackId => `https://bbb.tbm.tudelft.nl/hls/${playbackId}.m3u8`,
    // poster: playbackId => `https://image.mux.com/${playbackId}/thumbnail.jpg?time=15`,


    updateVideo() {
      console.log('updating video')

      const playbackId = this.playbackId
      const sourceUrl = this.src(playbackId)
      const video = this.$el

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
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  /* background: whites; */
  animation: comein 2s ease-in;
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
