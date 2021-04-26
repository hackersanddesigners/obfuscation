<template>
  <!-- <div id="notificationContainer"> -->
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
      <div id="notiButtons">
        <input 
          class="ui button"
          type="button" 
          value="dismiss"
          @click.stop="$emit('dismiss')" 
        >
        <input 
          v-if="notification.authorUID"
          class="ui button"
          type="button" 
          value="view"
          @click.stop="$emit('goTo', notification)" 
        >
      </div>
    </div>
  <!-- </div> -->
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
    color() { return this.notification.authorUID ? 
      this.$store.state.users[this.notification.authorUID].color : 'black' 
    }
  },

  mounted() {
  },
  methods: {


  }
}
</script>
<style scoped>

/* #notificationContainer {
  position: absolute;
  top: 0; left: 0;
  height: 100%; width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
} */
#notification {
  margin-bottom: 1vh;
  padding: 1vh;
  width: 450px;
}
#notification:last-of-type {
  margin-bottom: 0;
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
  width: 100%;
  margin-top: 1vh;
  display: flex;
  justify-content: flex-end;
}

.button {
  cursor: pointer;
  margin-right: 1vh;
  box-shadow: unset;
}
.button:last-of-type {
  margin-right: 0;
}

</style>