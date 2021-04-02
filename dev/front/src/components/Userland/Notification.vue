<template>
  <div id="notificationContainer">
    <div 
      id="notification" 
      class="ui"
      :style="{ '--userColor': color }"
    >
      <p class="time"> {{ time }} </p>
      <p class="author"> 
        <span class="name"> {{ notification.author }} </span>
        <span> says: </span>
      </p>
      <vue-markdown class="body"> 
        {{ notification.content }} 
      </vue-markdown>
    </div>
    <div id="notiButtons">
      <input 
        class="ui button"
        type="button" 
        value="dismiss"
        @click.stop="$emit('dismiss')" 
      >
      <input 
        class="ui button"
        type="button" 
        value="view"
        @click.stop="$emit('goTo', notification)" 
      >
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {

  name: 'Notification',
  props: [
    'notification'
  ],
  data() {
    return {
    }
  },

  computed: {
    time() { return moment(this.notification.time).format('dddd, MMMM Do [at] HH:mm') },
    color() { return this.$store.state.users[this.notification.authorUID].color }
  },

  mounted() {
  },
  methods: {


  }
}
</script>
<style scoped>

#notificationContainer {
  position: absolute;
  top: 0; left: 0;
  height: 100%; width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
#notification {
  padding: 1vh;
  max-width: 450px;
}
#notification p {
  margin: 0;
}
.time {
  font-size: 50%;
}
.author {

}
.name {
  color: var(--userColor);
}
.body {
  margin: 1vh;
}

#notiButtons {
  margin-top: 1vh;
}

.button {
  cursor: pointer;
  margin-right: 1vh;
}
.button:last-of-type {
  margin-right: 0;
}

</style>