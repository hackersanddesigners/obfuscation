<template>
  <div 
    :class="[
      'island',
      { break: isBreak }
    ]"
    :style="{
      width: `${ getWidth() }%`,
    }"
  >
    
    <div class="time">
      <span class="start">{{ start }}</span>
      <span class="end"> {{ end }}</span>
    </div>

    <div class="info">
    
      <div class="header">
        <h1
          class="title"
        > 
          {{ session.Title }} 
        </h1>
      </div>

      <h3 
        class="body"
        v-if="hosts.length > 0"
      >

        <span class="hosts">
          <span> with </span>
          <span
            class="host"
            v-for="host in hosts"
            :key="host.Name"
          >
            <span class="name">{{ host.Name }}</span>
            <span>, </span>
          </span>
        </span>

        <span class="modertors">
          <span
            class="moderator"
            v-for="moderator in moderators"
            :key="moderator.Name"
          >
            <span v-if="isLast(moderator, moderators)">and </span>
            <span class="name">{{ moderator.Name }}</span>
            <span> (moderator)</span>
            <span v-if="!isLast(moderator, moderators)">, </span>
            <span v-else>. </span>
          </span>
        </span>

      </h3>

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
import moment from 'moment'
import BBBLink from './BBBLink'

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
    time() { return `${ this.start } — ${ this.end }` },
    soon() { return this.getUnixTime(this.session.Start) - new Date() < 90000 },
    hosts() { return this.session.hosts },
    moderators() { return this.session.moderators },
    isBreak() {
      // return this.session.Title.toLowerCase().includes('break')
      return !this.session.Description || this.session.Description.length === 0
    }
  },
  created() {
  },
  methods: {

    getWidth() {
      const 
        UnixStart = this.getUnixTime(this.session.Start),
        UnixEnd = this.getUnixTime(this.session.End),
        duration = UnixEnd - UnixStart,
        width = this.isBreak ? 5 : duration / 400000
      return width
    },

    getHumanTime(date) { 
      return moment(date).format('HH:mm')
    },

    getUnixTime(date) { 
      return moment(date).format('x')
    },

    isLast(person, people) {
      return people.indexOf(person) === people.length - 1
    }
  }

}
</script>

<style scoped>
.island {
  min-width: calc(20 * var(--one));
  height: calc(20 * var(--one));
  /* max-width: 25%; */
  margin: 1.25vh 1.25vw;
  margin: 
    calc(1.25 * var(--one))
    calc(1.25 * var(--one))
  ;
  margin-top: calc(8 * var(--one));
  display: flex;
}

.island:hover {
  border-radius: calc(12 * var(--one));
  border-top-left-radius: calc(2 * var(--one));
}

.island .info {
  flex: 1 0 50%;
  box-sizing: border-box;
  padding: calc(3 * var(--one));
  border-radius: inherit;
  overflow: hidden;
}

.island .time  {
  position: absolute;
  top: calc(-5 * var(--one));
  left: calc(-4 * var(--one));
  width: 100%;
  display: flex;
  font-size: calc(5pt * var(--scale));
  font-family: sans-serif;
  pointer-events: none;

}
.island .time .end {
  position: absolute;
  right: calc(-10 * var(--one));
  display: none;
}
.island:last-of-type .time .end {
  display: block;
}
.island .body {
  margin-top: unset;
  max-width: calc(35 * var(--one));
}
.island .body .host .name,
.island .body .moderator .name {
  text-decoration: underline;
}
.island.break {
}
.island.break .info {
  position: absolute;
  padding: 
    calc(3 * var(--one))
    calc(5 * var(--one))
    calc(3 * var(--one))
    calc(3 * var(--one))
  ;
}
.island.break .body .BBB-container .BBB {
  margin-bottom: calc(1 * var(--one));
}
</style>