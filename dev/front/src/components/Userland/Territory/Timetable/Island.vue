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
  max-width: 90%;
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
  text-align: center;

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

.LIFECYCLE0 .island {
  pointer-events: none;
}
.LIFECYCLE0 .island h1 {
  visibility: hidden;
}

/* .LIFECYCLE1 .island {
  pointer-events: none;
}
.LIFECYCLE1 .island h1 {
  visibility: hidden;
} */

</style>