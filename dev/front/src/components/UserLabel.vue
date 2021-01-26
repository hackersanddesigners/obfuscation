<template>
  <li
    :class="[
      'userLabel',
      user.uid,
      { 
        me: isMe 
      }
    ]"
    :style="{ 
      '--userColor': user.connected ? user.color : 'lightgrey' 
    }"

    @mouseover.stop="hovered=true"
    @mouseleave.stop="hovered=false"
  >

    <span class="bullet"> ● </span>
    <span class="name">
      {{ isMe ? "me" : user.name }} 
    </span>
    <div
      v-if="moderating"
      class="moderatorOptions"
    >
      <span 
        class="messages"
        @click.stop="messagesVisible = !messagesVisible"
        >messages</span>
      <span 
        class="block"
        >block</span>
      <span 
        class="delete"
        >delete</span>
    </div>
    <span class="goto"> {{ hovered ? '→' : ''  }}</span> 
    <div v-if="moderating && messagesVisible" class="messageListContiner">
      <ul v-if="messages.length > 0" class="messageList">
        <MessageOptions
          v-for="message in messages"
          :key="message.uid"
          :message="message"
          @click.native.stop="$emit('goTo', message)"
        />
      </ul>
      <p v-else>This user has no messaages.</p>
    </div>
  </li>
</template>

<script>
import MessageOptions from './MessageOptions'

export default {
  name: 'UserLabel',
  components: {
    MessageOptions
  },
  props: [ 
    'isMe',
    'user',
    'messages',
    'moderating'
  ], 
  data() {
    return {
      hovered: false,
      messagesVisible: false,
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style scoped>
li {
  list-style: none;
  padding: 0;
  margin: 0.5vh 0.5vw;
  font-weight: bold;
  display: flex;
  align-items: center;
  color: var(--userColor);
  cursor: pointer;
}

.moderating li {
  width: 400px;
  flex-wrap: wrap;
  cursor: auto;
}
.moderating li .messageListContiner {
  width: 100%;
}
.moderating li .messageList {
  border-top: 0.5px solid lightgrey;
  border-bottom: 0.5px solid lightgrey;
  margin-top: 5px;
  width: 100%;
  padding:5px 0px;
}

li span {
  margin-right: 0.5vw;
}
li .name {
  width: 100%;
  max-width: 200px;
}
li .moderatorOptions {
  display: flex;
  width: 100px;
  justify-content: space-around;
}
li .moderatorOptions span {
  background: rgb(245, 245, 245);
  color:grey;
  font-family: sans-serif;
  font-size: 8.5pt;
  font-weight: normal;
  border: 0.5px solid lightgray;
  padding: 2px 10px;
  border-radius: 10px;
  cursor: pointer;
}
li .goto {
  margin-left: auto;
  width: 2vw;
  cursor: pointer;
}
</style>