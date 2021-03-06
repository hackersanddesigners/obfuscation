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
        :sessionOngoing="currentLiveSession"
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
import { mapGetters, mapState } from 'vuex'

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
      now: null,
    }
  },

  computed: {

    ...mapState('territories', [
      'currentLiveSession'
    ]),
    ...mapGetters('territories', [
      'liveSessions'
    ]),
    pastSessions() {
      return ( this
        .liveSessions
        .filter(s => (
          this.getTime(s.Start) < this.now
        ))
        .reverse()
      )
    },
    futureSessions() {
      return ( this
        .liveSessions
        .filter(s => (
          this.getTime(s.Start) > this.now
        ))
      )
    },
    currentSession() {
      return ( this
        .pastSessions
        .find(s => (
          this.getTime(s.End) > this.now
        ))
      )
    },
    nextSession() {
      return ( this
        .futureSessions
        .find(s => (
          this.getTime(s.Start) < this.now + 2 * 60000 // 2 minutes
        ))
      )
    },
    laterSession() {
      return ( this
        .futureSessions[0]
      )
    },
    previousSession() {
      return ( this
        .liveSessions[this
          .liveSessions
          .indexOf(this
            .futureSessions[0]
          )-1
        ]
      )
    },

    soon() {
      return (
        this.getTime(this.currentLiveSession.Start) < this.now
      )
    },

    playbackId() {
      return (
        (
          this.currentLiveSession &&
          this.currentLiveSession.bbbURL &&
          this.soon
        ) ? ( this
          .currentLiveSession
          .bbbURL
          .replace(
            'https://bbb.tbm.tudelft.nl/b/', ''
          )
        ) : ''
      )
    },

  },

  created() {

    this.now = (new Date).getTime()

    setInterval(() => {
      this.now = (new Date).getTime()
    }, 60000)

  },

  watch: {

    now() {
      this.getNextEvent()
    },

  },

  methods: {

    getNextEvent() {

      const
        currentSession  = this.currentSession,
        nextSession     = this.nextSession,
        laterSession    = this.laterSession,
        previousSession = this.previousSession

      let
        sessionToCommit,
        reason

      if (currentSession) {
        sessionToCommit = currentSession
        reason          = 'Using current session.'

      } else if (nextSession) {
        sessionToCommit = nextSession
        reason          = 'Current session is undefined, using next session.'

      } else if (
        previousSession &&
        laterSession &&
        this.isDelay(previousSession, laterSession)
      ) {
        sessionToCommit = previousSession
        reason          = 'Previous session could be running late, keeping it.'

      } else if (laterSession) {
        sessionToCommit = laterSession
        reason          = 'Nothing happening soon, using later session'

      } else {
        sessionToCommit = null
        reason          = 'No more live events.'
      }

      if (sessionToCommit === this.currentLiveSession) {
        reason          = 'Nothing has changed, retrying in a minute.'

      } else {
        this.$store.commit('territories/setCurrentLiveSession', sessionToCommit)

        console.log('*****************************************************')
        console.log('* Current time     :', moment(this.now).format('dddd, MMMM Do HH:mm'))
        console.log('* Current session  :', currentSession  ? currentSession.Title  : '')
        console.log('* Next session     :', nextSession     ? nextSession.Title     : '')
        console.log('* Previous session :', previousSession ? previousSession.Title : '')
        console.log('* Later session    :', laterSession    ? laterSession.Title    : '')
        console.log('*****************************************************')
      }

      console.log('* STREAM:', reason)

    },

    isDelay(previousSession, laterSession) {
      const
        fifteen =  15 * 60000, // 15 minutes
        startOfLater = this.getTime(laterSession.Start),
        endOfPrev = this.getTime(previousSession.End)
      return ( (startOfLater - endOfPrev) < (3 * fifteen) )
    },

    getTime: date => moment(date).format('x'),

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
  display: flex;
  justify-content: center;
  align-items: stretch;
}
.livestream .sidebar {
  min-width: calc(27 * var(--one));
  max-width: calc(27 * var(--one));
  position: relative;
  box-sizing: border-box;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
</style>