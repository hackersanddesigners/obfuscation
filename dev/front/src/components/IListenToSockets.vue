<template>
  <div>
    <p v-if="isConnected">You're connected to the swarm, waiting for bot.</p>
    <p v-if="socketMessage">
        {{ socketMessage.user }}: {{ socketMessage.msg }} 
    </p>
    <p>
        <input ref="message" type="text" placeholder="message">
        <button @click="sendMessage()">send</button>
    </p>
    <iframe v-if="padURL" :src="padURL" id="pad"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isConnected: false,
      socketMessage: null,
      padURL: ''
    }
  },
  mounted() {
    this.$socket.name = 'usr'
  },
  sockets: {
    connect() {
      this.isConnected = true;
    },
    disconnect() {
      this.isConnected = false;
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    },
    broadcast(data) {
      this.socketMessage = JSON.parse(data)
      if (this.socketMessage.msg.data.includes('http')) {
        this.padURL = this.socketMessage.msg
      }
    }
  },
  methods: {
    sendMessage() {
      const message = this.$refs.message.value
      this.$socket.emit('pingServer', this.$socket.id, message)
      this.$refs.message.input = ''
    }
  }
}
</script>
<style scoped>
#pad {
    height: 700px;
    width: 350px;
    border: 0.5px solid black;
}
</style>