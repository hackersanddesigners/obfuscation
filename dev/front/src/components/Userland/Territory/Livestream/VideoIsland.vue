<template>
  <div :class="['island', { playing: playing }]" >

    <div class="body">
      <Video
        :playbackId="playbackId"
        :forcedPlaybackId="forcedPlaybackId"
        :playing="playing"
        :muted="muted"
        :fullscreen="fullscreen"
        @playing="playing = true"
        @pausing="playing = false"
        @unfullscreened="fullscreen = false"
        @loadedmetadata="loadedmetadata = true; $emit('loadedmetadata')"
      />
    </div>
    <div  v-if="loadedmetadata" class="controls">
      <div class="buttonContainer">
        <input
          type="button"
          name="play"
          :value="playing ? 'pause' : 'play'"
          @click="playing=!playing"
        />
      </div>
      <div class="buttonContainer">
        <input
          type="button"
          name="muted"
          :value="muted ? 'unmute' : 'mute'"
          @click="muted=!muted"
        />
      </div>
      <div class="buttonContainer">
        <input
          type="button"
          name="fullscreen"
          value="⤢"
          @click="fullscreen=true"
        />
      </div>
    </div>

  </div>
</template>

<script>
import Video from './Video'

export default {
  name: 'VideoIsland',
  components: { Video },
  props: [
    'playbackId',
  ],
  data() {
    return {
      forcedPlaybackId: null,
      playing: false,
      muted: true,
      fullscreen: false,
      loadedmetadata: false,
    }
  },
  watch: {
    playbackId(newPlaybackId, oldPlaybackId) {
      if (newPlaybackId !== oldPlaybackId) {
        this.forcedPlaybackId = null
      }
    },
  },
  sockets: {
    message(m) {
      if (
        m.uid &&
        !m.deleted &&
        !m.navigation &&
        m.stream
      ) {
        this.forcedPlaybackId = m.content.replace('/stream ', '')
        console.log('* STREAM: Got a forced playback id: ', this.forcedPlaybackId)
      }
    }
  },
}
</script>

<style scoped>
.island {
  /* flex-basis: 70%; */
  flex-grow: 1;
  box-sizing: border-box;
  position: relative;
  height: 90%;
  width: 80%;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}
/* .island:hover, */
.island.playing:hover,
.island.playing::before {
  background: none;
}
.island .body {
  height: 100%;
  width: 100%;
  border-radius: inherit;
}
.island .controls {
  z-index: 1;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  padding-right: calc(1 * var(--one));
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.island .controls .buttonContainer {
  position: relative;
  box-sizing: border-box;
  min-width: calc(4 * var(--one));
  background-color: rgb(200, 130, 125);
  box-shadow: var(--island-shadow);
  margin: calc(1 * var(--one));
  margin-right: 0;
  border-radius: var(--small-island-curve);
}
.island .controls .buttonContainer input {
  position: relative;
  cursor: pointer;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: calc(1.8 * var(--one));
  line-height: 1.2;
  font-family: 'auth';
  border-radius: inherit;
  padding: calc(1 * var(--one));

}
.island .controls .buttonContainer::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  border-radius: inherit;
  overflow: hidden;
  opacity: 0.5;
  background: var(--island-back);
}

.mobile .island .controls {
  display: none;
}

</style>
