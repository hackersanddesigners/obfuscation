<template>
  <div class="timetable">
    <div 
      v-for="day in contentByDays"
      :key="day.date"
      class="day"
    >
      <h1>{{ cuteDate(day.date) }}</h1>
      <div class="sessionsContainer">
        <Island
          v-for="session in day.sessions"
          :key="session.slug"
          :session="session"
          @mouseup.native="$router.push(`/sessions/${ session.slug }`)"
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
  components: {
    Island
  },
  props: [
    'content',
  ],
  data() {
    return {
    }
  },
  computed: {

    contentByDays() {

      let 
        date1,
        sessions1,
        date2,
        sessions2

      if (this.content[0]) {
        date1 = this.content[0].Start
        sessions1 = this.content.filter(s => this.sessionInDay(s, date1))
        date2 = this.content[this.content.length-1].Start
        sessions2 = this.content.filter(s => this.sessionInDay(s, date2))
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
  margin-left: 20vw;
  margin-top: 20vh;
  /* padding: 0vh 5vw; */
  /* width: 100%;  */
  /* height: 100%; */
  max-width: 300vw;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  /* align-items: stretch; */
  /* flex-wrap: wrap; */
}

.timetable .day  {
  /* flex: 1 0; */
  /* height: 50%; */
  margin-bottom: 10vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.timetable .day h1 {
  /* float: 0 0 auto; */
  margin: 2.5vh 2.5vw;
  margin: 2.5vh 1vw;
  margin: 0vh 1vw;
  font-size: calc(8pt * var(--scale));
  font-family: sans-serif;
  font-weight: lighter;
  /* width: 100%; */
}

.timetable .day .sessionsContainer {
  /* margin-top: 5vh; */
  margin-left: 5vw;
  /* float: 1 0 100%; */
  width: 100%;
  height: 100%;
  display: flex;
  /* justify-content: stretch; */
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
}

</style>