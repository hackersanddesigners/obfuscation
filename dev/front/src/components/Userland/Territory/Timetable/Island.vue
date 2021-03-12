<template>
  <div 
    :class="[
      'island',
      { break: isBreak }
    ]"
  >
    <div class="info">
    
      <div class="header">
        <h1
          class="title"
        > 
          {{ session.Title }} 
        </h1>
      </div>

      <!-- <h3 
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

      </h3> -->

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
    // soon() { return this.getUnixTime(this.session.Start) - new Date() < 90000 },
    soon() { return false },  
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
  }

}
</script>

<style scoped>
.island {
  height: 100%;
  max-width: 85%;
  display: flex;
  /* align-items: center; */
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

.island .body {
  margin-top: unset;
  /* max-width: calc(35 * var(--one)); */
}
.island .body .host .name,
.island .body .moderator .name {
  text-decoration: underline;
}
.island.break {
}
.island.break .info {
  /* position: absolute;
  padding: 
    calc(3 * var(--one))
    calc(5 * var(--one))
    calc(3 * var(--one))
    calc(3 * var(--one))
  ; */
}
.island.break .body .BBB-container .BBB {
  /* margin-bottom: calc(1 * var(--one)); */
}
</style>