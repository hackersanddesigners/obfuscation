<template>
  <div>
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
      v-for="day in contentByDays"
      :key="getDay(day.date)"
      class="day"
    >
      <div class="date">{{ cuteDate(day.date) }}</div>
      <div class="sessionsContainer">
        <div 
          class="islandContainer"
          v-for="session in day.sessions"
          :key="session.slug"
          :id="session.slug + 'Island'"
          :style="{
            height: sizeByDuration(session),
          }"
        >
          <div class="time">
            <span class="start">{{ start(session) }}</span>
            <span class="end"> {{ end(session) }}</span>
          </div>
          <Island
            :session="session"
            @mouseup.native="handleIslandClick(session)"
          />
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
      return this.getHumanTime(session.Ens) 
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
.timetable {
  box-sizing: border-box;
  padding: 
    calc(5 * var(--one))
    /* calc(10 * var(--one)) */
  ;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  /* justify-content: stretch; */
  /* justify-content: center; */
  align-items: center;
  align-content: center;
  /* align-content: flex-start; */
}

#timeZone {
  position: absolute;
  top: calc(0 * var(--one));
  left: calc(50 * var(--one));
}
#timeZone h3 {
  font-size: calc(3pt * var(--scale));
  margin: 0;
}
#timeZone h3.toggle {
  text-decoration: underline;
  cursor: pointer;
}

.timetable .day  {
  /* max-width: 30%; */
  /* max-width: calc(60 * var(--one)); */
  max-width: 40%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  z-index: 1;
}

.timetable .day .date {
  align-self: flex-start;
  margin: 
    calc(5 * var(--one))
    calc(10 * var(--one))
  ;
  font-size: calc(8pt * var(--scale));
  font-family: sans-serif;
  font-weight: lighter;
}

.timetable .day .sessionsContainer {
  margin-left: calc(4 * var(--one));
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: flex-start;
  flex-wrap: wrap;
}
.timetable .day .sessionsContainer .islandContainer {
  box-sizing: border-box;
  position: relative;
  margin: calc(1 * var(--one));
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.timetable .day .sessionsContainer .islandContainer .time  {
  position: absolute;
  left: calc(-3 * var(--one));
  top: calc(-2 * var(--one));
  height: 100%;
  display: flex;
  font-size: calc(4pt * var(--scale));
  font-family: sans-serif;
  pointer-events: none;

}
.timetable .day .sessionsContainer .islandContainer .time .end {
  position: absolute;
  bottom: calc(-3 * var(--one));
  display: none;
}
.timetable .day .sessionsContainer .islandContainer:last-of-type .time .end {
  /* display: block; */
}

</style>