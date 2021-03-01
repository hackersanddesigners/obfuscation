<template>
  <div 
    class="island"
    :style="{
      width: `${ getWidth() }%`,
      height: `${100 / 4 }vh`,
    }"
  >
    
    <div class="time">
      <span class="start">{{ start }}</span>
      <span class="end"> {{ end }}</span>
    </div>
    
    <div class="header">
      <h1
        class="title"
        @mousedown.stop="$router.push(`/sessions/${ session.slug }`)"
      > 
        {{ session.Title }} 
      </h1>
    </div>

    <div 
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

    </div>

  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Island',
  components: {
  },
  props: [
    'session'
  ],
  data() {
    return {
    }
  },
  computed: {
    start() { return this.getHumanTime(this.session.Start) },
    end() { return this.getHumanTime(this.session.End) },
    time() { return `${ this.start } — ${ this.end }` },
    hosts() { return this.session.hosts },
    moderators() { return this.session.moderators }
  },
  created() {
  },
  methods: {

    getWidth() {
      const 
        UnixStart = this.getUnixTime(this.session.Start),
        UnixEnd = this.getUnixTime(this.session.End),
        duration = UnixEnd - UnixStart,
        width = duration / 200000
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
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  min-width: 10%;
  margin: 1.25vh 1.25vw;
  padding: 2vh;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: var(--white-glass);
  background-image: var(--island-back);
  box-shadow: var(--island-shadow);
  border-top-left-radius: var(--island-curve);
  border-bottom-right-radius: var(--island-curve);
  border-top-right-radius: var(--small-island-curve);
  border-bottom-left-radius: var(--small-island-curve);
  /* border-radius: var(--small-island-curve); */
  transition: border-radius 0.2s ease;
}
.island:hover {
  border-top-left-radius: 0px;
}
.island::before {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  content: '';
  background: var(--island-back);
  border-top-left-radius: inherit;
  border-bottom-right-radius: inherit;
  border-top-right-radius:inherit;
  border-bottom-left-radius: inherit;
  overflow: hidden;
}

.island .time  {
  position: absolute;
  top: -6vh;
  left: -4vh;
  width: 100%;
  display: flex;
  /* justify-content: space-between; */
  font-size: calc(5pt * var(--scale));
  font-family: sans-serif;
}
.island .time .end {
  position: absolute;
  right: -10vh;
  display: none;
}
.island:last-of-type .time .end {
  display: block;
}

.island .header {
  /* flex: 1; */
  margin: auto;
  max-width: 30vw;
  /* margin-bottom: unset; */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(3pt * var(--scale));
}
.island .header h1 { 
  font-size: calc(5pt * var(--scale));
  font-family: 'zxx-noise';
  font-weight: normal;
  margin-top: 0px;
  text-align: center;
  cursor: pointer;
}
.island .header .title:hover {
  text-decoration: underline;
}
.island .body {
  margin: auto;
  margin-top: unset;
  max-width: 30vw;
  text-align: center;
  font-family: sans-serif;
  line-height: 1.2;
  font-size: calc(3pt * var(--scale));
}
.island .body .host .name,
.island .body .moderator .name {
  text-decoration: underline;
  cursor: pointer;
}
</style>