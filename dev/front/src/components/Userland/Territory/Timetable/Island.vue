<template>
  <div 
    :class="[
      'island',
    ]"
  >
    <div class="time">
      <span class="start">{{ start }}</span>
      <span class="bar"> | </span>
      <span class="end"> {{ end }}</span>
    </div>
    <div class="info">
      <div class="header">
        <h1 class="title" > 
          {{ session.Title }} 
        </h1>
      </div>
    </div>

    <BBB-link
      v-if="soon"
      :BBBLink="session.bbbURL"
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
  props: [ 'session' ],
  data() {
    return {
    }
  },
  computed: {
    start() { return this.getHumanTime(this.session.Start) },
    end() { return this.getHumanTime(this.session.End) },
    soon() { return false },  
  },
  created() {
  },
  methods: {
    getHumanTime: date => moment(date).format('HH:mm'),
  }

}
</script>

<style scoped>
.island {
  height: 100%;
  /* width: 100%; */
  /* max-width: 90%; */
  max-width: 100%;
  display: flex;
  /* align-items: center; */
  border-radius: 
    calc(3 * var(--one))
    calc(7 * var(--one))
    calc(3 * var(--one))
    calc(7 * var(--one))
  ;
}

.island:hover {
  border-radius: calc(12 * var(--one));
  border-top-left-radius: calc(2 * var(--one));
}
.island .time  {
  position: absolute;
  left: calc(-6 * var(--one));
  top: calc(0.5 * var(--one));
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

/* 
.LIFECYCLE0 .island {
  pointer-events: none;
}
.LIFECYCLE0 .island h1 {
  visibility: hidden;
} */

/* .LIFECYCLE1 .island {
  pointer-events: none;
}
.LIFECYCLE1 .island h1 {
  visibility: hidden;
} */

</style>