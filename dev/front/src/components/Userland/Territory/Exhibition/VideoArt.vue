<template>
  <div :class="['videoArt', artwork.Category ]">
    <video 
      :class="{ fullscreen: controls }"
      ref="player"
      loop
      crossorigin="anonymous"
      :controls="controls"
      @mouseover.stop
      @mouseleave.stop
      @click="play"
    >
      <source :src="videoUrl" type="video/mp4">
      <track 
        :src="trackUrl" 
        srclang="en" 
        label="English" 
        kind="subtitles" 
        default 
      >
    </video>
    <div class="controls">
      <h3
        class="play"
        @click.stop="play"
      >
        {{ playing ? 'pause' : 'play' }}
      </h3>
      <h3 class="timeLeft">
        {{ timeLeft }}
      </h3>
      <h3
        class="fullscreen"
        @click.stop="enterFullscreen"
      >
        ⤢
      </h3>
    </div>


  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'VideoArt',
  props: [
    'artwork'
  ],
  data() {
    return {
      trackSrc: null,
      playing: false,
      fullscreen: false,
      controls: false,
      timeLeft: 0,
    }
  },
  computed: {
    videoUrl() { return this.$apiURL + this.artwork.File.url },
    trackUrl() { 
      return ( 
        this.artwork.Track ? 
        this.$apiURL + this.artwork.Track.url : null
      )
    },
    
  },
  created() {
    // if (this.artwork.Track) {
    //   this.$http
    //     .get(this.trackUrl)
    //     .then(response => {
    //       const blob = new Blob([response.data], { type: 'text/vtt' })
    //       this.trackSrc = URL.createObjectURL(blob)
    //     })
    //     .catch(error => console.log(error))
    // }
  },
  mounted() {

    const player = this.$refs.player

    player.addEventListener('loadedmetadata',() => {
      this.timeLeft = moment(player.duration * 1000).format('mm:ss')
    })

    player.addEventListener('timeupdate',() => {
      this.timeLeft = moment((player.duration - player.currentTime) * 1000).format('mm:ss')
    })

    const prefixes = ["", "webkit", "moz", "ms"]
    prefixes.forEach((prefix) => { 
      player.addEventListener(prefix+"fullscreenchange", () => {
        if( window.innerHeight !== screen.height) {
         this.fullscreen = false 
         this.controls = false
        }
      })
    })

  },
  methods: {
    play(e) {
      if (!this.playing) {
        this.$refs.player.play()
        this.playing = true
      } else {
        this.$refs.player.pause()
        this.playing = false
      }
      if (e) e.preventDefault()
    },
    enterFullscreen() {
      if (this.$refs.player.requestFullScreen) {
        this.$refs.player.requestFullScreen()
      } else if (this.$refs.player.mozRequestFullScreen) {
        this.$refs.player.mozRequestFullScreen()
      } else if (this.$refs.player.webkitRequestFullScreen) {
        this.$refs.player.webkitRequestFullScreen()
      }
      this.fullscreen = true
      setTimeout(() => {
        this.controls = true
      }, 300)
    }

  }

}
</script>

<style scoped>
.videoArt {
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

/* .videoArt video {
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  border-radius: inherit;
  object-fit: cover;
  overflow: hidden;
} */

.videoArt video {
  border-radius: inherit;
  box-sizing: border-box;
  position: relative;
  object-fit: cover;
  width: 100%;
  min-width: calc(10 * var(--one));
  min-height: calc(10 * var(--one));
  max-width: calc(40 * var(--one));
  max-height: calc(40 * var(--one));
}

.videoArt.SessionVideo video {
  min-width: calc(20 * var(--one));
  min-height: calc(20 * var(--one));
  max-width: calc(40 * var(--one));
  max-height: calc(40 * var(--one));
}
.videoArt.Other video {
  min-width: calc(20 * var(--one));
  min-height: calc(20 * var(--one));
  max-width: calc(30 * var(--one));
  max-height: calc(30 * var(--one));
}
.videoArt.Poster video {
  min-width: calc(10 * var(--one));
  min-height: calc(10 * var(--one));
  max-width: calc(15 * var(--one));
  max-height: calc(15 * var(--one));
}



.videoArt video.fullscreen {
  object-fit: contain;
  border-radius: unset;
}

.videoArt video::cue {
  margin-bottom: 1vh !important;
}

.videoArt .controls {
  box-sizing: border-box;
  position: absolute;
  bottom: calc(-2.5 * var(--one));
  width: 110%;
  padding: 0 calc(1 * var(--one));
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}
.videoArt .controls h3 { 
  flex-basis: 15%;
  cursor: pointer;
  /* text-align: center; */
}
.videoArt .controls h3.play {
  text-align: left;
}
.videoArt .controls h3.timeLeft {
  font-size: calc(1.5 * var(--one));
  padding-top: calc(0.4 * var(--one));
  text-align: center;
  cursor: unset;
}
.videoArt .controls h3.fullscreen {
  text-align: right;
}
.videoArt .controls .play:hover {
  text-decoration: underline;
}

</style>