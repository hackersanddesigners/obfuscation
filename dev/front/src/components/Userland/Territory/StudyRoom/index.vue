<template>
  <div class="studyRoom">
    <div id="timeZone">
      <h3>Sessions are displayed in {{ timeZone }} time.</h3>
      <h3
        v-if="!isInDefaultTimeZone"
        class="toggle"
        @click.stop="toggleTimezone"
      > {{ 
            desiresOwnTimezone ?
            `View sessions in ${ defaultTimeZone } time.` :
            `View sessions in ${ ownTimeZone } time.`
        }}
      </h3>
    </div>
    <div 
      v-for="day in sessionsByDay"
      :key="getDay(day.date)"
      class="day"
    >
      <div 
        class="islandContainer"
        v-for="session in day.sessions"
        :key="session.slug"
        :id="session.slug + 'Island'"
      >
        <div class="date">
          {{ cuteDate(day.date) }}
        </div>
        <div class="time">
          <span class="start">{{ start(session) }}</span>
          <span class="end"> {{ end(session) }}</span>
        </div>
        <Island
          :session="session"
          @click.native="$emit('moreInfo', `/study-room/${session.slug}`)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import Island from './Island'

export default {
  name: 'StudyRoom',
  components: { Island },
  props: [ 'content' ],
  data() {
    return {
      defaultTimeZone: 'Etc/UTC',
      // defaultTimeZone: "Europe/Amsterdam",
      // defaultTimeZone: "Australia/Sydney",
      // defaultTimeZone: "Pacific/Funafuti",
      ownTimeZone: moment.tz.guess(),
      desiresOwnTimezone: true,
      sessionsByDay: {},
    }
  },
  computed: {
    timeZone() { return this.desiresOwnTimezone ? this.ownTimeZone : this.defaultTimeZone },
    isInDefaultTimeZone() { return this.ownTimeZone === this.defaultTimeZone },
  },
  created() {
    moment.tz.setDefault(this.ownTimeZone)
    this.orderContentByDays()
  },
  methods: {
    orderContentByDays() {
      const 
        sessionsByDay = {},
        sessionsArray = Object.values(this.content).sort((a, b) => new Date(a.Start) - new Date(b.Start)),
        dates = sessionsArray.map(session => this.getDay(session['Start'])),
        uniqueDates = Array.from(new Set(dates))

      uniqueDates.forEach(day => {
        const 
          sessionsInDay = sessionsArray.filter(s => this.sessionInDay(s, day)),
          dayObject = {
            date: sessionsInDay[0].Start,
            sessions: sessionsInDay
          }
          sessionsByDay[day] = dayObject
      })

      this.$set(this, 'sessionsByDay', sessionsByDay)
    },

    toggleTimezone() {
      this.desiresOwnTimezone = !this.desiresOwnTimezone
      moment.tz.setDefault(this.timeZone)
      this.orderContentByDays()
    },

    sessionInDay(session, day) {
      return this.getDay(session.Start) === day
    },

    sizeByDuration(session) {
      const 
        UnixStart = this.getUnixTime(session.Start),
        UnixEnd = this.getUnixTime(session.End),
        duration = UnixEnd - UnixStart,
        factor = this.isBreak(session) ? 8 : duration / 450000,
        size = `calc(${ factor } * var(--one))`
        // size = `${ factor }%`
      return size
    },

    start(session) { 
      return this.getHumanTime(session.Start) 
    },
    end(session) { 
      return this.getHumanTime(session.End) 
    },

    isBreak(session) {
      // return this.session.Title.toLowerCase().includes('break')
      return !session.Description || session.Description.length === 0
    },

    getHumanTime(date) { 
      return moment(date).format('HH:mm')
    },

     getUnixTime(date) { 
      return moment(date).format('x')
    },

    getDay(date) { 
      return moment(date).format('D')
    },

    cuteDate(date) {
      return moment(date).format('dddd, MMMM Do')
    }

  }

}
</script>

<style scoped>
.studyRoom {
  box-sizing: border-box;
  padding: 
    calc(5 * var(--one))
    calc(0 * var(--one))
    calc(0 * var(--one))
    calc(20 * var(--one))
  ;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#timeZone {
  margin-left: calc(2 * var(--one));
}
#timeZone h3 {
  font-size: calc(1.4 * var(--one));
  margin: 0;
}
#timeZone h3.toggle {
  text-decoration: underline;
  cursor: pointer;
}
.studyRoom .day  {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: center;
  z-index: 1;
}

.studyRoom .day .date {
  text-align: center;
  margin: 
    calc(3 * var(--one))
    calc(2 * var(--one))
    calc(3 * var(--one))
    calc(2 * var(--one))
  ;
  font-size: calc(2.8 * var(--one));
}
.studyRoom .day .date em {
  margin-top: 0;
  font-size: calc(2 * var(--one));
}

.studyRoom .day .islandContainer {
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: flex-start;
  width: 100%;
}
.studyRoom .day .islandContainer .time  {
  position: absolute;
  left: calc(-7 * var(--one));
  top: calc(7 * var(--one));
  height: 100%;
  display: flex;
  font-size: calc(1.8 * var(--one));
  font-family: sans-serif;
  pointer-events: none;

}
.studyRoom .day .islandContainer .time .end {
  position: absolute;
  bottom: calc(6 * var(--one));
}
.studyRoom .day .islandContainer:last-of-type .time .end {
  /* display: block; */
}


.LIFECYCLE0 #timeZone,
.LIFECYCLE0 .date,
.LIFECYCLE0 .time {
  visibility: hidden;
}

/* .LIFECYCLE1 #timeZone,
.LIFECYCLE1 .date,
.LIFECYCLE1 .time {
  visibility: hidden;
} */

</style>