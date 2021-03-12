<template>
  <div>
    <div id="timeZone">
      <h3>Sessions are displayed in timezone: {{ timeZone }}.</h3>
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
      v-for="day in contentByDays"
      :key="getDay(day.date)"
      class="day"
    >
      <div class="date">{{ cuteDate(day.date) }}</div>
      <div class="sessionsContainer">
        <Island
          v-for="session in day.sessions"
          :key="session.slug"
          :id="session.slug + 'Island'"
          :session="session"
          @mouseup.native="handleIslandClick(session)"
        />
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
      // defaultTimeZone: "Europe/Amsterdam",
      defaultTimeZone: "Australia/Sydney",
      ownTimeZone: moment.tz.guess(),
      desiresOwnTimezone: false,
      contentByDays: {}
    }
  },
  computed: {
    timeZone() { return this.desiresOwnTimezone ? this.ownTimeZone : this.defaultTimeZone },
    isInDefaultTimeZone() { return this.ownTimeZone === this.defaultTimeZone },
  },
  created() {
    moment.tz.setDefault(this.defaultTimeZone)
    this.orderContentByDays()
  },
  methods: {

    handleIslandClick(section) {
      const current = this.$router.history.current.path
      const next = `/timetable/${section.slug}`
      
      if (current === next) {
        this.$emit('moreInfo', next)
      } else {
        this.$router.push(`${next}`)
      }
    },

    orderContentByDays() {
      const 
        contentByDays = {},
        sessionsArray = Object.values(this.content),
        dates = sessionsArray.map(session => this.getDay(session['Start'])),
        uniqueDates = Array.from(new Set(dates))

      uniqueDates.forEach(day => {
        const sessionsInDay = sessionsArray.filter(s => this.sessionInDay(s, day))
        contentByDays[day] = {
          date: sessionsInDay[0].Start,
          sessions: sessionsInDay
        }
      })
      this.$set(this, 'contentByDays', contentByDays)
    },

    toggleTimezone() {
      this.desiresOwnTimezone = !this.desiresOwnTimezone
      moment.tz.setDefault(this.timeZone)
      this.orderContentByDays()
    },

    sessionInDay(session, day) {
      return this.getDay(session.Start) === day
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
.timetable {
  box-sizing: border-box;
  margin-left: calc(25 * var(--one));
  margin-top: calc(20 * var(--one));
  max-width: 100%;
  display: flex;
  /* flex-direction: column; */
  justify-content: stretch;
}

#timeZone {
  position: absolute;
  top: calc(10 * var(--one));
}
#timeZone h3 {
  margin: 0;
}
#timeZone h3.toggle {
  text-decoration: underline;
  cursor: pointer;
}

.timetable .day  {
  margin-bottom: calc(10 * var(--one));
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1;
}

.timetable .day .date {
  margin: 0 calc(1.5 * var(--one));
  font-size: calc(8pt * var(--scale));
  font-family: sans-serif;
  font-weight: lighter;
}

.timetable .day .sessionsContainer {
  margin-left: calc(4 * var(--one));
  /* width: 100%; */
  height: 100%;
  display: flex;
  /* flex-direction: column; */
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
}

</style>