<template>
  <div
    :class="[
      'miniMessageContainer',
      { hover: hovered }
    ]"
    @mouseover="hovered = true"
    @mouseleave="hovered = false"
  >
    <span class="message"> {{ message.content }} </span>
    <span class="time"> {{ format(message.time) }} </span>
    <span 
      class="delete"
      @click.stop="deleteMessage(message)"
      >delete</span>
    <span 
      v-if="message.censored"
      class="delete"
      @click.stop="censorMessage(message)"
      >uncensor</span>
    <span 
      v-else
      class="delete"
      @click.stop="censorMessage(message)"
      >censor</span>
    <span class="goto"> {{ hovered ? '→' : ''  }}</span> 
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'

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
    ...mapActions([

      'deleteMessage',
      'censorMessage'
      
    ]),

    format(time) {
      return moment(time).format('MMM Do @ HH:mm:ss ')
    },
  }
}
</script>

<style scoped>
.miniMessageContainer {
  padding-left: 1vh;
  display: flex;
  align-items: center;  
}
.miniMessageContainer .message {
  flex: 0 0 40%;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 5px;
  cursor: pointer;
  overflow: hidden;
}
.miniMessageContainer .message::selection {
  background: var(--userColor);
  color: white;
}
.miniMessageContainer .time {
  flex: 0 0 20%;
  margin: 0px 5px;
  font-size: 7pt;
  color: lightgray;
  white-space: nowrap;
}
.miniMessageContainer .delete {
  color:grey;
  font-family: sans-serif;
  font-size: 8.5pt;
  font-weight: normal;
  padding: 2px 10px;
  cursor: pointer;
}
.miniMessageContainer .goto {
  margin-left: auto;
  margin-right: 5px;
  width: 1.5vh;
  cursor: pointer;
}
.miniMessageContainer .delete:hover {
  text-decoration: underline;
}
.miniMessageContainer.hover {
  background: rgba(161, 161, 161, 0.116);
}
</style>