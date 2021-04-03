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
              break: isBreak(session)
            }]"
            :style="{ height: sizeByDuration(session) }"
          >
            <div class="time">
              <span class="start">{{ start(session) }}</span>
              <span class="bar"> | </span>
              <span class="end"> {{ end(session) }}</span>
            </div>
            <Island
              :id="session.slug + 'Island'"
              :session="session"
              @click.native="$emit('moreInfo', `/timetable/${session.slug}`)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import Island from './Island'

  // marginRight: session.buffer ? `calc(${session.buffer * -12} * var(--one))` : null
  // marginRight: session.buffer ? `calc(${session.buffer * -12} * var(--one))` : null

export default {
  name: 'Timetable',
  components: { Island },
  props: [ 'content' ],
  data() {
    return {
      // defaultTimeZone: "Europe/Amsterdam",
      // defaultTimeZone: "Australia/Sydney",
      // defaultTimeZone: "Pacific/Funafuti",
      // defaultTimeZone: "Australia/Adelaide",
      defaultTimeZone: 'Etc/UTC',
      ownTimeZone: moment.tz.guess(),
      desiresOwnTimezone: true,
      parentDays: {}
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
        parentDays = { 'firstDay': {}, 'secondDay': {}, },
        sessionsArray = Object.values(this.content).sort((a, b) => new Date(a.Start) - new Date(b.Start)),
        dates = sessionsArray.map(session => this.getDay(session['Start'])),
        uniqueDates = Array.from(new Set(dates))

      uniqueDates.forEach(day => {
        let 
          sessionsInDay = sessionsArray.filter(s => this.sessionInDay(s, day))
        for (let s = 0; s < sessionsInDay.length; s++) {
          const fifteen = 15 * 60000
          let 
            previous = sessionsInDay[s-1],
            current = sessionsInDay[s],
            next = sessionsInDay[s+1]
          if (current && previous && next &&
             ((this.getUnixTime(current.Start) - this.getUnixTime(previous.Start)) <= fifteen)) {
              sessionsInDay[s-1].buffer = true
              sessionsInDay[s].buffer = true
            }
        }

        const
          dayObject = {
            date: sessionsInDay[0].Start,
            sessions: sessionsInDay
          },
          parentDay = 
            day == 3 || day == 4 || day == 5 ? 'firstDay' :
            day == 6 || day == 7 || day == 8 ? 'secondDay' : 
            null
          
          parentDays[parentDay][day] = dayObject
      })

      this.$set(this, 'parentDays', parentDays)
    },

    sessionInDay(session, day) {
      return this.getDay(session.Start) === day
    },

    toggleTimezone() {
      this.desiresOwnTimezone = !this.desiresOwnTimezone
      moment.tz.setDefault(this.timeZone)
      this.orderContentByDays()
    },

    sizeByDuration(session) {
      const 
        UnixStart = this.getUnixTime(session.Start),
        UnixEnd = this.getUnixTime(session.End),
        duration = UnixEnd - UnixStart,
        // factor = this.isBreak(session) ? 8 : duration / 200000,
        factor = duration / 250000,
        size = `calc(${ factor } * var(--one))`
      return size
    },

    start(session) { return this.getHumanTime(session.Start) },
    end(session) { return this.getHumanTime(session.End) },

    // isBreak: session => !session.Description || session.Description.length === 0,
    isBreak: session => session.Title === 'Break',
    getHumanTime: date => moment(date).format('HH:mm'),
    getUnixTime: date => moment(date).format('x'),
    getDay: date => moment(date).format('D'),
    cuteDate: date => moment(date).format('dddd, MMMM Do'),
  }

}
</script>

<style scoped>
.timetable {
  box-sizing: border-box;
  /* padding:  */
    /* calc(5 * var(--one)) */
    /* calc(10 * var(--one)) */
  /* ; */
  padding-top: calc(10 * var(--one));
  width: 100%;
  height: 100%;
  display: flex;
  /* flex-direction: column; */
  /* flex-wrap: wrap; */
  /* justify-content: stretch; */
  justify-content: center;
  /* align-items: center; */
  /* align-content: dcenter; */
  /* align-content: flex-start; */
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

.timetable .parentDay  {
  width: 40%;
  max-width: calc(55 * var(--one));
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.timetable .parentDay:last-of-type  {
  margin-left: calc(4 * var(--one));
}
.timetable .day  {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: center;
  z-index: 1;
}

.timetable .day .date {
  text-align: center;
  margin: 
    calc(3 * var(--one))
    calc(2 * var(--one))
    calc(3 * var(--one))
    calc(2 * var(--one))
  ;
  font-size: calc(2.8 * var(--one));
}
.timetable .day .date em {
  margin-top: 0;
  font-size: calc(2 * var(--one));
}

.timetable .day .sessionsContainer {
  /* position: relative; */
  margin: 0 calc(4 * var(--one));
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: flex-start;
}
.timetable .day .sessionsContainer .islandContainer {
  box-sizing: border-box;
  position: relative;
  /* margin: calc(1 * var(--one)); */
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.timetable .day .sessionsContainer .islandContainer .time  {
  position: absolute;
  left: calc(-6 * var(--one));
  top: calc(0.5 * var(--one));
  height: 100%;
  display: flex;
  font-size: calc(1.8 * var(--one));
  font-family: sans-serif;
  pointer-events: none;

}
.timetable .day .sessionsContainer .islandContainer .time .bar {
  position: absolute;
  top: calc(4 * var(--one));
  left: calc(2 * var(--one));
  display: none;
}
.timetable .day .sessionsContainer .islandContainer .time .end {
  position: absolute;
  bottom: calc(1 * var(--one));
  /* display: none; */
}
.timetable .day .sessionsContainer .islandContainer:last-of-type .time .end {
  /* display: block; */
}

.break {
  min-height: calc(6 * var(--one));
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


/* .LIFECYCLE0 #timeZone,
.LIFECYCLE0 .date,
.LIFECYCLE0 .time {
  visibility: hidden;
} */

/* .LIFECYCLE1 #timeZone,
.LIFECYCLE1 .date,
.LIFECYCLE1 .time {
  visibility: hidden;
} */

</style>