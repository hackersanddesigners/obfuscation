<template>
  <div
    :class="[
      'island',
    ]"
  >
    <div class="time">
      <span class="start">{{ HumanStart }}</span>
      <span class="bar"> | </span>
      <span class="end"> {{ HumanEnd }}</span>
    </div>
    <div class="info">
      <div class="header">
        <h1 class="title" :class="{ zxx: $store.state.desiresTexture }">
          {{ session.Title }}
        </h1>
      </div>
    </div>

    <BBB-link
      v-if="soon && !ended && room.url"
      :room="room"
      @mousedown.native.stop
      @mouseup.native.stop
      @click.native.stop
    />

  </div>
</template>

<script>
import BBBLink from '../BBBLink'
import moment from 'moment-timezone'

export default {
  name: 'Island',
  components: { BBBLink },
  props: [ 'session', 'timeZone' ],
  watch: {
    timeZone() {
      this.HumanStart = this.getHumanTime(this.session.Start)
      this.HumanEnd = this.getHumanTime(this.session.End)
    }
  },
  data() {
    return {
      HumanStart: this.getHumanTime(this.session.Start),
      HumanEnd: this.getHumanTime(this.session.End),
      now: (new Date).getTime(),
      fifteen: 15 * 60000,
      soonInterval: null,
      room: {
        name: 'BBB room',
        url: this.session.bbbURL ? this.session.bbbURL : ''
      },
    }
  },
  computed: {
    soon() { return this.getUnixTime(this.session.Start) < (this.now + this.fifteen) },
    ended() { return this.getUnixTime(this.session.End) < this.now },
  },
  created() {
    this.soonInterval = setInterval(() => {
      this.now = (new Date).getTime()
    }, 60000)
  },
  beforeDestroy() {
    clearInterval(this.soonInterval)
  },
  methods: {
    getHumanTime: date => moment(date).format('HH:mm'),
    getUnixTime:  date => moment(date).format('x'),
  }

}
</script>

<style scoped>
.island {
  height: 100%;
  width: 100%;
  /* max-width: 90%; */
  max-width: 100%;
  display: flex;
  /* align-items: center; */
  transition: border-radius 0.2s ease;
}

.island:hover {
  border-radius: calc(12 * var(--one));
  border-top-left-radius: calc(2 * var(--one));
}
.island .time  {
  position: absolute;
  left: calc(-6 * var(--one));
  /* top: calc(0.5 * var(--one)); */
  top: calc(0 * var(--one));
  height: 100%;
  display: flex;
  font-size: calc(1.8 * var(--one));
  font-family: sans-serif;
  pointer-events: none;

}
.island .time .bar {
  position: absolute;
  top: calc(4 * var(--one));
  left: calc(2 * var(--one));
  display: none;
}
.island .time .end {
  position: absolute;
  bottom: calc(1 * var(--one));
  display: none;
}

.staggered .island .time  {
  width: 100%;
  left: calc(2 * var(--one));
  top: calc(-2 * var(--one));
}
.staggered .island .time .end {
  right: calc(5 * var(--one));
  top: calc(0 * var(--one));
  display: block;
}

.island .info {
  flex: 1 0 50%;
  box-sizing: border-box;
  padding:
    calc(2 * var(--one))
    calc(4 * var(--one))
    calc(4 * var(--one))
    calc(2 * var(--one))
  ;
  border-radius: inherit;
  overflow: hidden;
  /* text-align: center; */
  text-align: left;
}


</style>