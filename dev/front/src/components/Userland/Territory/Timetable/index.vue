<template>
  <div>
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
  name: 'Territory',
  components: { Island },
  props: [ 'content' ],
  computed: {

    contentByDays() {

      // moment.tz.setDefault("America/New_York")
      // moment.tz.setDefault("Asia/Tokyo")
      // moment.tz.setDefault("Australia/Sydney")

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

      return contentByDays

    }

  },

  mounted() {

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
  flex-direction: column;
  justify-content: stretch;
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
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
}

</style>