<template>
  <p
    v-if="uid"
    class="messageContainer"
    :class="{
      uid: uid,
    }"
    :style="{ 
      left: (100*x - 1) + '%',
      top: (100*y - 1) + '%',
      color: color,
    }"
  >
    <span class="author">{{ author }}</span>: 
    <span class="message">{{ content }}</span>
    <!-- <span class="name"> {{ name }} </span> -->
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
  ], 
  data() {
    return {
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
  cursor: none;
  padding: 0px 10px;
  /* pointer-events: none; */
}
.messageContainer .message {
}

</style>