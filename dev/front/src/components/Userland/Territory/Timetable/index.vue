<template>
  <div>
    <div 
      v-for="day in contentByDays"
      :key="day.date"
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
import moment from 'moment'
import Island from './Island'

export default {
  name: 'Territory',
  components: { Island },
  props: [ 'content' ],
  computed: {

    contentByDays() {

      let 
        date1,
        sessions1,
        date2,
        sessions2

      const sessionsArray = Object.values(this.content)

      if (sessionsArray[0]) {
        date1 = sessionsArray[0].Start
        sessions1 = sessionsArray.filter(s => this.sessionInDay(s, date1))
        date2 = sessionsArray[sessionsArray.length-1].Start
        sessions2 = sessionsArray.filter(s => this.sessionInDay(s, date2))
      }

      return {
        1: { 
          date: date1,
          sessions: sessions1,
        },
        2: {
          date: date2,
          sessions: sessions2
        }
      }

    }

  },

  mounted() {
    // let d = new Date()
    // let m = moment(d)
    // let t = m.tz("Asia/Taipei").format()
    // let userTZ = moment.tz.guess()
    // let firstEvent = moment(this.content[0].Start).format()
    // console.log(firstEvent)

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
      return this.getDay(session.Start) === this.getDay(day) 
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