<template>
  <div>
    <div id="timeZone">
      <h3>Sessions are displayed in {{ notEtc(timeZone) }} time.</h3>
      <h3
        v-if="!isInDefaultTimeZone"
        class="toggle"
        @click.stop="toggleTimezone"
      > {{ 
            desiresOwnTimezone ?
            `View sessions in ${ notEtc(defaultTimeZone) } time.` :
            `View sessions in ${ notEtc(ownTimeZone) } time.`
        }}
      </h3>
    </div>
    <div 
      class="parentDay"
      v-for="(parentDay, name) in parentDays"
      :key="name"
    >
      <div 
        v-for="day in parentDay"
        :key="getDay(day.date)"
        class="day"
      >
        <div class="date">
          {{ cuteDate(day.date) }}
          <br><em>{{ 
            name === 'firstDay' ? 'Vernissage' : 'Workshop' 
          }}</em> 
        </div>
        <div class="sessionsContainer">
          <div 
            v-for="session in day.sessions"
            :key="session.slug"
            :class="['islandContainer', { 
              buffer: session.buffer,
              break: isBreak(session),
              island: !session.Start
            }]"
            :style="{ height: sizeByDuration(session) }"
          >
            <Island
              v-if="session.Start"
              :id="session.slug + 'Island'"
              :timeZone="timeZone"
              :session="session"
              @click.native="$emit('moreInfo', `/schedule/${session.slug}`)"
            />
            <div v-else class="staggered">
              <div class="time">
                <span class="start">{{ getHumanTime(session[0].Start) }}</span>
                <span class="bar"> | </span>
                <span class="end"> {{ getHumanTime(session[session.length-1].End) }}</span>
              </div>
              <Island
                class="buffer"
                v-for="stagSession in session"
                :key="stagSession.slug"
                :id="stagSession.slug + 'Island'"
                :timeZone="timeZone"
                :session="stagSession"
                @click.native="$emit('moreInfo', `/schedule/${stagSession.slug}`)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import Island from './Island'

export default {
  name: 'Timetable',
  components: { Island },
  props: [ 'content' ],
  data() {
    return {
      // defaultTimeZone: "Australia/Adelaide",
      defaultTimeZone: "Etc/UTC",
      ownTimeZone: moment.tz.guess(),
      desiresOwnTimezone: true,
      sessionsArray: [],
      parentDays: {},
      getNextEventInterval: null,
      firstLoad: true,
    }
  },
  computed: {
    timeZone() { return this.desiresOwnTimezone ? this.ownTimeZone : this.defaultTimeZone },
    isInDefaultTimeZone() { return this.ownTimeZone === this.defaultTimeZone },
    isMobile() { return this.$store.state.isMobile },
    currentLiveSession() { return this.$store.state.currentLiveSession }
  },
  created() {
    moment.tz.setDefault(this.ownTimeZone)
    this.orderContentByDays()
    this.getNextEvent()
    this.getNextEventInterval = setInterval(() => {
      this.getNextEvent()
    }, 60000) // every minute
  },
  beforeDestroy() {
    clearInterval(this.getNextEventInterval)
  },
  methods: {
    orderContentByDays() {
      const 
        parentDays    = { 'firstDay': {}, 'secondDay': {}, },
        sessionsArray = Object.values(this.content).sort((a, b) => new Date(a.Start) - new Date(b.Start)),
        dates         = sessionsArray.map(session => this.getDay(session['Start'])),
        uniqueDates   = Array.from(new Set(dates)),
        fifteen       = 15 * 60000

      uniqueDates.forEach(day => {
        let sessionsInDay = sessionsArray.filter(s => this.sessionInDay(s, day))

        for (let s = 0; s < sessionsInDay.length; s++) {
          let 
            previous = sessionsInDay[s-1],
            current  = sessionsInDay[s],
            next     = sessionsInDay[s+1]
  
          if (current && previous && next &&
            ((this.getUnixTime(current.Start) - this.getUnixTime(previous.Start)) <= fifteen)) {
              sessionsInDay[s-1].buffer = true
              sessionsInDay[s].buffer = true
          }
        }

        let staggeredArr = sessionsInDay.filter(s => s.buffer)

        if (staggeredArr.length > 0) {
          let 
            staggered = {},
            workingStartTime = this.getUnixTime(staggeredArr[0].Start)

          for (let s = 0; s < staggeredArr.length;) {
            if(!staggered[workingStartTime]) {
              staggered[workingStartTime] = []
            } 
            const currentStartTime = this.getUnixTime(staggeredArr[s].Start)
            if ((currentStartTime - workingStartTime) <= (4 * fifteen)) {
              staggered[workingStartTime].push(staggeredArr[s])
              s++
            } else {
              workingStartTime = currentStartTime
            }
          }

          for (let startTime in staggered) {
            const 
              firstSessionToGo         = sessionsInDay.find(s => this.getUnixTime(s.Start) === startTime),
              indexOfFirstSessionToGo  = sessionsInDay.indexOf(firstSessionToGo),
              substituteSessions       = staggered[startTime],
              numberOfSessionsToSplice = Object.values(substituteSessions).length

            sessionsInDay[indexOfFirstSessionToGo] = substituteSessions
            sessionsInDay.splice(indexOfFirstSessionToGo + 1, numberOfSessionsToSplice - 1)
          }

        }

        const
          dayObject = {
            date: sessionsInDay[0].Start,
            sessions: sessionsInDay
          },
          parentDay = 
            this.$env === 'production' ?
              day == 3 || day == 4 || day == 5 ? 'firstDay' :
              day == 6 || day == 7 || day == 8 ? 'secondDay' : null
            :
              day == 28 || day == 29 || day == 30 ? 'firstDay' :
              day == 1 || day == 2 || day == 3 ? 'secondDay' : null
            
          parentDays[parentDay][day] = dayObject
      })
      this.$set(this, 'sessionsArray', sessionsArray)
      this.$set(this, 'parentDays', parentDays)
    },

    getNextEvent() {
      const
        // buffer         = 3 * 86400000, // 1 days
        // buffer         = 4 * 86400000 + +1 * 60 * 60000, // 1 days
        // buffer         =  26 * 60 * 60000,
        // buffer         = 5 * 86400000, 
        buffer         = 0, 
        now            = (new Date).getTime() + buffer,
        // fifteen        = 15 * 60000, // 15 minutes
        sortedSessions = this.sessionsArray.sort((a,b) => (this.getUnixTime(b.Start) < this.getUnixTime(a.Start))),
        liveSessions   = sortedSessions.filter(s => s.livestream),
        pastSessions   = liveSessions.filter(s => (this.getUnixTime(s.Start) < now)).reverse(),
        futureSessions = liveSessions.filter(s => (this.getUnixTime(s.Start) > now)),
        currentSession = pastSessions.find(s => (this.getUnixTime(s.End) > now)),
        // nextSession    = futureSessions.find(s => (this.getUnixTime(s.Start) > now - fifteen))
        nextSession    = futureSessions[0]

      console.log('current time:', moment(now).format('dddd, MMMM Do HH:mm'))
      console.log('current session:', currentSession ? currentSession.Title : '')
      console.log('next session:', nextSession ? nextSession.Title : '')

      if (currentSession) {
        if (currentSession !== this.currentLiveSession) {
          console.log('updating store with current session')
          this.$store.commit('setCurrentLiveSession', currentSession)
        }

      } else if (nextSession) {
        if (nextSession !== this.currentLiveSession) {
          console.log('current session is undefined, updating store with next session')
          this.$store.commit('setCurrentLiveSession', nextSession)
        }
      
      } else {
        console.log('no more live events')
        this.$store.commit('setCurrentLiveSession', null)
      }

    },

    toggleTimezone() {
      this.desiresOwnTimezone = !this.desiresOwnTimezone
      moment.tz.setDefault(this.timeZone)
      this.orderContentByDays()

      clearInterval(this.getNextEventInterval)
      this.getNextEvent()
      this.getNextEventInterval = setInterval(() => {
        this.getNextEvent()
      }, 60000) // every minute
    },

    sizeByDuration(session) {
      const 
        length       = session.length,
        start        = length ? session[0].Start : session.Start,
        end          = length ? 2 * session[length-1].End : session.End,
        UnixStart    = this.getUnixTime(start),
        UnixEnd      = this.getUnixTime(end),
        duration     = UnixEnd - UnixStart,
        factor       = duration / 250000,
        mobileFactor = this.isMobile ? 0.6 : 1,
        size         = `calc(${ factor * mobileFactor } * var(--one))`
      return size
    },

    sessionInDay(session, day) { return this.getDay(session.Start) === day },

    isBreak:      session => session.Title === 'Break',
    getHumanTime: date => moment(date).format('HH:mm'),
    getUnixTime:  date => moment(date).format('x'),
    getDay:       date => moment(date).format('D'),
    cuteDate:     date => moment(date).format('dddd, MMMM Do'),
    notEtc:       string => string === 'Etc/UTC' ? 'UTC' : string,
  }

}
</script>

<style scoped>
.schedule {
  padding-top: calc(10 * var(--one));
  padding-left: calc(25 * var(--one));
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
}
.mobile .schedule {
  /* padding-top: calc(5 * var(--one));
  padding-left: calc(10 * var(--one)); */
}
#timeZone {
  position: absolute;
  top: calc(6 * var(--one));
  left: calc(35 * var(--one));
}
#timeZone h3 {
  font-size: calc(1.4 * var(--one));
  margin: 0;
}
#timeZone h3.toggle {
  text-decoration: underline;
  cursor: pointer;
}

.schedule .parentDay  {
  max-width: calc(55 * var(--one));
  display: flex;
  flex-direction: column;
}
.schedule .parentDay:last-of-type  {
  margin-left: calc(4 * var(--one));
}
.schedule .day  {
  display: flex;
  flex-direction: column;
  z-index: 1;
}

.schedule .day .date {
  text-align: center;
  margin: 
    calc(3 * var(--one))
    calc(2 * var(--one))
    calc(3 * var(--one))
    calc(2 * var(--one))
  ;

  font-size: calc(2.8 * var(--one));
}
.schedule .day .date em {
  margin-top: 0;
  font-size: calc(2 * var(--one));
}

.schedule .day .sessionsContainer {
  margin: 0 calc(4 * var(--one));
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: flex-start;
}

.schedule .day .sessionsContainer .islandContainer {
  box-sizing: border-box;
  position: relative;
  min-height: calc(8 * var(--one));
  /* margin: calc(1 * var(--one)); */
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.schedule .day .sessionsContainer .islandContainer.island {
  min-width: calc(75 * var(--one));
  align-self: flex-start;

}
.schedule .day .sessionsContainer .islandContainer .staggered { 
  position: relative;
  padding-right: calc(3 * var(--one));
  padding-bottom: calc(3 * var(--one));
  box-sizing: border-box;
  flex-shrink: 1;
  display: flex;
  min-width: calc(75 * var(--one));
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
  flex-wrap: wrap;
}
.schedule .day .sessionsContainer .islandContainer .staggered .island {
  flex-basis: 45%;
  flex-shrink: 0;
  flex-grow: 0;
  margin-top: calc(4.5 * var(--one));
  margin-left: calc(2.9 * var(--one));
}


.schedule .time  {
  position: absolute;
  left: calc(-6 * var(--one));
  top: calc(0.5 * var(--one));
  height: 100%;
  display: flex;
  font-size: calc(1.8 * var(--one));
  font-family: sans-serif;
  pointer-events: none;

}
.schedule .time .bar {
  position: absolute;
  top: calc(4 * var(--one));
  left: calc(2 * var(--one));
  display: none;
}
.schedule .time .end {
  position: absolute;
  bottom: calc(1 * var(--one));
}

.break {
  min-height: calc(6 * var(--one));
}

.staggered .buffer,
.staggered .buffer + .buffer,
.staggered .buffer + .buffer + .buffer,
.staggered .buffer + .buffer + .buffer + .buffer {
  margin-right: unset;
}
.buffer {
  --buffer: -15;
  margin-right: calc(1 * var(--buffer) * var(--one));
}
.buffer + .buffer {
  margin-right: calc(2 * var(--buffer) * var(--one));
}
.buffer + .buffer + .buffer {
  margin-right: calc(3 * var(--buffer) * var(--one));
}
.buffer + .buffer + .buffer + .buffer {
  margin-right: calc(4 * var(--buffer) * var(--one));
}
.buffer + .buffer + .buffer + .buffer + .buffer {
  margin-right: calc(5 * var(--buffer) * var(--one));
}

</style>