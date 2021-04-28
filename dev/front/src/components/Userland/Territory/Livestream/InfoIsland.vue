<template>
  <div 
    :class="[
      'island',
    ]"
  >
    <div v-if="session" class="date">
      <span class="day"> {{ day }} </span>
    </div>
    <div v-if="session" class="time">
      <span class="start">{{ HumanStart }} </span>
      <span class="bar"> — </span>
      <span class="end"> {{ HumanEnd }}</span>
    </div>
    <div v-if="session" class="info">
      <div class="header">
        <h1 class="title" :class="{ zxx: $store.state.desiresTexture }"> 
          {{ session.Title }} 
        </h1>
      </div>
      <div class="status">
        Status: {{ status }}
      </div>
    </div>

  </div>
</template>

<script>
import moment from 'moment-timezone'

export default {
  name: 'InfoIsland',
  props: [ 'session', 'status' ],
  data() {
    return {
    }
  },
  computed: {
    day() { return this.session ? moment(this.session.Start).format('dddd, MMMM Do') : null },
    HumanStart() { return this.session ? this.getHumanTime(this.session.Start) : null },
    HumanEnd() { return this.session ? this.getHumanTime(this.session.End) : null }
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
  min-height: 20%;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  padding: calc(2 * var(--one));
}

.island .date {
  font-size: calc(1.2 * var(--one));
}

.island .time  {
  display: flex;
  font-size: calc(1.8 * var(--one));
  margin-bottom: calc(1 * var(--one));
  font-family: sans-serif;
}
.time .bar {
  margin: 0 calc(1 * var(--one));
}
.island .info {
  flex: 1 0 50%;
  box-sizing: border-box;
  padding: 
    calc(0 * var(--one))
    calc(4 * var(--one))
    calc(4 * var(--one))
    calc(0 * var(--one))
  ;
  overflow: hidden;
}

.island .info h1 {
  font-size: calc(2.2 * var(--one));
}

.island .info .status {
  font-size: calc(1.2 * var(--one));
  margin-top: calc(1 * var(--one));
}

</style>