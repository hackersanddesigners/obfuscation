<template>
  <div
    :class="[
      'minimessage',
      { clear: hovered || dragging }
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
  filter: blur(3px);
  opacity: 0.9;
  /* filter: var(--blur); */
  transition: all 0.2s ease;
  background: var(--userColor);
}

.minimessage.clear {
  transition: all 0.2s ease;
  opacity: 1;
  filter: blur(0px);
}
</style>