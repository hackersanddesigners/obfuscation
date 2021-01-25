<template>
  <div
    v-if="message.uid && !message.deleted"
    :class="[
      'minimessage',
    ]"
    :style="{ 
      left: `${ toNearestX(message.x, 0.4) }%`,
      top: `${ toNearestX(message.y, 0.4) }%`,
      background: message.color,
      '--blur': `blur(${ (now - message.time) / 100000000 }px)`,
    }"
  >
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'MiniMessage',
  components: {
  },
  props: [ 
    'message',
  ], 
  data() {
    return {
      now: (new Date()).getTime()
    }
  },
  mounted() {
  },
  methods: {
    fromNow(time) {
      return moment(time).fromNow()
    },
    toNearestX(num, X) {
      return Math.floor(100 * num / X) * X
    }
  }
}
</script>

<style>
.minimessage {
  position: absolute;
  height: 1px;
  width: 5px;
  filter: var(--blur);
  transition: filter 0.2 ease;
}
</style>