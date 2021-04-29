<template>
  <div>
    <VideoIsland 
      :playbackId="playbackId"
      :forcedPlaybackId="forcedPlaybackId"
      @loadedmetadata="status = 'active'"
    />
    <div class="sidebar">
      <InfoIsland
        :session="currentLiveSession"
        :status="status"
        @click.native="$emit('moreInfo', `/schedule/${currentLiveSession.slug}`)"
      />
      <Chat 
        :messages="chatByTime"
        @goTo="$emit('goTo', $event)"
      />
    </div>
  </div>
</template>

<script>
import VideoIsland from './VideoIsland'
import InfoIsland from './InfoIsland'
import Chat from './Chat'

import moment from 'moment-timezone'

export default {
  name: 'Livestream',
  components: { 
    VideoIsland, 
    InfoIsland,
    Chat 
  },
  data() { 
    return {
      status: 'idle',
      forcedPlaybackId: null,
      now: (new Date).getTime()
    }
  },
  computed: {
    currentLiveSession() { return this.$store.state.currentLiveSession },

    soon() { 
      const 
        five = 5 * 60000, // 5 minutes
        // now     = this.now  + 1 * 86400000,
        now     = this.now,
        session = this.currentLiveSession

      return (this.getUnixTime(session.Start) < (now + five))
    },

    playbackId() {  return (
      this.currentLiveSession && this.currentLiveSession.bbbURL && this.soon ?
      this.currentLiveSession.bbbURL.replace('https://bbb.tbm.tudelft.nl/b/', '') : ''
      )
    },

    chatByTime() { return this.currentLiveSession ? 
      this.$store.getters.messagesArray
      .filter(m => (
          this.$store.state.users[m.authorUID] &&
          m.uid && 
          !m.deleted && 
          !m.navigation &&
          !m.stream &&
          m.location === 'livestream'
      ))
      .sort((a, b) => a.time - b.time) : []
    },

  },

  watch: {

    currentLiveSession(newSession, oldSession) {
      if (newSession !== oldSession) {
        this.forcedPlaybackId = null
      }
    },

  },

  sockets: {
    message(message) {
      if (message.stream) {
        this.forcedPlaybackId = message.content.replace('/stream ', '')
        console.log('got a forced playback id: ', this.forcedPlaybackId)
      }
    }
  },

  created() {
    setInterval(() => {
      this.now = (new Date).getTime()
    }, 60000)
  },

  methods: {
    getUnixTime: date => moment(date).format('x'),
  },

}
</script>

<style scoped>
.livestream {
  box-sizing: border-box;
  margin-top: calc(5 * var(--one));
  padding: calc(1 * var(--one));
  height: 100%;
  width: 100%;
  max-height: 100vh;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: stretch;
}
.livestream .sidebar {
  min-width: calc(25 * var(--one));
  max-width: calc(30 * var(--one));
  position: relative;
  box-sizing: border-box;
  margin-left: calc(1 * var(--one));
  max-height: 90%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
</style>