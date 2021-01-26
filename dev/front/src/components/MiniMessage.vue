<template>
  <div
    v-if="message.uid && !message.deleted"
    :class="[
      'minimessage',
      { blur: hovered }
    ]"
    :style="{ 
      left: `${ toNearestX(message.x, 0.4) }%`,
      top: `${ toNearestX(message.y, 0.4) }%`,
      width: `${ message.content.length / 2 }px`,
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
    'hovered'
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
  filter: blur(3px);
  /* filter: var(--blur); */
  transition: filter 0.2s ease;
}

.minimessage.blur {
  transition: filter 0.2s ease;
  filter: blur(0px);
}
</style>