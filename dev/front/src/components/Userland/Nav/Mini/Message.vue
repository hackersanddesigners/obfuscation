<template>
  <div
    :class="[
      'minimessage',
    ]"
    :style="{ 
      left: `${ toNearestX(message.x, 0.4) }%`,
      top: `${ toNearestX(message.y, 0.4) }%`,
      width: `${ message.content.length / 2 }px`,
      '--userColor': `var(--${ message.authorUID })`,
    }"
  >
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: [ 
    'message',
    'hovered',
    'dragging'
  ], 
  methods: {
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
  background: var(--userColor);
}
</style>