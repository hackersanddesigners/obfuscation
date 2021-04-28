<template>
  <div>
    <VideoIsland 
      :playbackId="playbackId"
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

export default {
  name: 'Livestream',
  components: { 
    VideoIsland, 
    InfoIsland,
    Chat 
  },
  data() { 
    return {
      status: 'idle'
    }
  },
  computed: {
    currentLiveSession() { return this.$store.state.currentLiveSession },
    playbackId() { return (
      (this.currentLiveSession && this.currentLiveSession.bbbURL) ?
      this.currentLiveSession.bbbURL.replace('https://bbb.tbm.tudelft.nl/b/', '') : ''
    )},
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
      console.log('received update')
      if (newSession !== oldSession) {
        console.log('got new session:', newSession)
      }
    }
  },
  created() {
  }

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