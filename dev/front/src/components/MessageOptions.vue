<template>
  <div
    :class="[
      'messageContainer',
      { hover: hovered }
    ]"
    @mouseover="hovered = true"
    @mouseleave="hovered = false"
  >
    <span class="message"> {{ message.content }} </span>
    <span class="time"> {{ format(message.time) }} </span>
    <span 
      class="delete"
      >delete</span>
    <span class="goto"> {{ hovered ? '→' : ''  }}</span> 
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'MessageOptions',
  components: {
  },
  props: [ 
    'message',
  ], 
  data() {
    return {
      now: (new Date()).getTime(),
      hovered: false,
    }
  },
  mounted() {
  },
  methods: {
    format(time) {
      return moment(time).format('MMM Do @ HH:mm:ss ')
    },
  }
}
</script>

<style scoped>
.messageContainer {
  padding-left: 20px;
  display: flex;
  align-items: center;  

}
.messageContainer .message {
  flex: 0 0 40%;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 5px;
  /* white-space: nowrap; */
  cursor: pointer;
  overflow: hidden;
}
.messageContainer .message::selection {
  background: var(--userColor);
  color: white;
}
.messageContainer .time {
  flex: 0 0 29%;
  margin: 0px 5px;
  font-size: 7pt;
  color: lightgray;
  white-space: nowrap;
}
.messageContainer .delete {
  color:grey;
  font-family: sans-serif;
  font-size: 8.5pt;
  font-weight: normal;
  padding: 2px 10px;
  cursor: pointer;
}
.messageContainer .goto {
  margin-left: auto;
  margin-right: 0.5vw;
  width: 2vw;
  cursor: pointer;
}
.messageContainer .delete:hover {
  text-decoration: underline;
}
.messageContainer.hover {
  background: rgba(161, 161, 161, 0.116);
}
</style>