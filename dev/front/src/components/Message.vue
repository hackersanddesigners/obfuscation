<template>
  <p
    v-if="uid"
    class="messageContainer"
    :class="{
      uid: uid,
      hover: hovered
    }"
    :style="{ 
      left: (100*x) + '%',
      top: (100*y) + '%',
      color: color,
    }"
  >
    <span class="message"> {{ content }} </span>
    <!-- <span class="author"> {{ author }} </span> -->
  </p>
</template>

<script>
export default {
  name: 'Message',
  components: {
  },
  props: [ 
    'uid',
    'author',
    'isMe',
    'content',
    'color',
    'x',
    'y',
    'hovered'
  ], 
  data() {
    return {
      // hovered: Boolean
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style scoped>
.messageContainer {
  position: absolute;
  /* padding: 0px 10px; */
  display: flex;
  flex-direction: column;
  /* pointer-events: none; */
}
.messageContainer .message {
  text-decoration: none;
}
.messageContainer .author {
  opacity: 0;
  /* transition: all 0.2s ease; */
}

.messageContainer.hover .message {
  text-decoration: underline;
}
.messageContainer.hover .author {
  opacity: 1;
}

</style>