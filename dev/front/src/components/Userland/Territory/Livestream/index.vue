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
      forcedPlaybackId: null,
      now: (new Date).getTime(),
      fifteen: 15 * 60000,
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
          this.getTime(s.Start) < this.now + this.fifteen
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
      const
        now     = this.now,
        session = this.currentLiveSession
      return (this.getTime(session.Start) < (now))
    },

    playbackId() {  return (
      this.currentLiveSession && this.currentLiveSession.bbbURL && this.soon ?
      this.currentLiveSession.bbbURL.replace('https://bbb.tbm.tudelft.nl/b/', '') : ''
      )
    },

  },

  watch: {

    now() {
      this.getNextEvent()
    },

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

    this.getNextEvent()

    setInterval(() => {
      this.now = (new Date).getTime()
      // this.getNextEvent()
    }, 60000)

  },

  methods: {

    getNextEvent() {

      const
        buffer         = 0,
        fifteen         = 15 * 60000, // 15 minutes
        now             = this.now + buffer,
        currentSession  = this.currentSession,
        nextSession     = this.nextSession,
        laterSession    = this.laterSession,
        previousSession = this.previousSession

      console.log('*****************************************************')
      console.log('* current time     :', moment(now).format('dddd, MMMM Do HH:mm'))
      console.log('* current session  :', currentSession ? currentSession.Title : '')
      console.log('* next session     :', nextSession ? nextSession.Title : '')
      console.log('* previous session :', previousSession ? previousSession.Title : '')
      console.log('* later session    :', laterSession ? laterSession.Title : '')
      console.log('*****************************************************')

      let
        sessionToCommit,
        reason

      if (currentSession) {
        sessionToCommit = currentSession
        reason = 'Using current session.'

      } else if (nextSession) {
        sessionToCommit = nextSession
        reason = 'Current session is undefined, using next session.'

      } else if (
        previousSession && laterSession &&
        ((this.getTime(laterSession.Start) - this.getTime(previousSession.End)) < 3 * fifteen)
      ) {
        sessionToCommit = previousSession
        reason = 'Previous session could be running late, keeping it.'

      } else {
        sessionToCommit = null
        reason = 'No more live events.'
      }

      if (currentSession === this.currentLiveSession) {
        console.log('* STREAM: Not making unnecessary commits.')
      } else {
        this.$store.commit('territories/setCurrentLiveSession', sessionToCommit)
        console.log('* STREAM:', reason)
      }
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
  margin-left: calc(1 * var(--one));
  max-height: 90%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
</style>