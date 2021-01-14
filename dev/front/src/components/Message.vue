<template>
  <div
    v-if="uid"
    class="messageContainer"
    :class="{
      uid: uid,
      hover: hovered
    }"
    :style="{ 
      left: (100*x) + '%',
      top: (100*y + 1.3) + '%',
      color: color,
    }"
  >
    <vue-markdown 
      class="message"
      :source="content"
    > 
    <!-- {{ content }}  -->
    </vue-markdown>
    <!-- <span class="message"> {{ content }} </span> -->
    <!-- <span class="author"> {{ author }} </span> -->
  </div>
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
<style>
.messageContainer {
  position: absolute;
  display: flex;
  flex-direction: column;
  
  /* pointer-events: none; */
}
.messageContainer .message {
  border: 1px solid;
  border-color: transparent;
  padding: 1px 5px;
  border-radius: 15px;
  transition: all 0.2s ease;
}
.messageContainer .message * {
  text-decoration: none;
  margin: 0px;
}
.messageContainer .message iframe {
  width: 300px !important;
  height: 650px !important;
  border: none !important;
  border-radius: 15px;
}
/* .messageContainer .message blockquote, */
/* .messageContainer .message blockquote p, */

.messageContainer .author {
  opacity: 0;
  /* transition: all 0.2s ease; */
}

.messageContainer.hover .message {
  border-color: unset;
  padding: 1px 10px;
}
.messageContainer.hover .author {
  opacity: 1;
}

</style>