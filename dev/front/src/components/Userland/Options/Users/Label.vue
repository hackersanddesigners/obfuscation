<template>
  <li
    class="userLabel"
    :style="{ '--userColor': `var(--${ user.uid })` }"
    @mouseover.stop="hovered=true"
    @mouseleave.stop="hovered=false"
  >

    <!-- <span class="bullet"> ● </span> -->
    <!-- <span class="bullet"></span> -->

    <span class="name">
      {{ isMe ? "me" : user.name }} 
    </span>

    <div
      v-if="moderating"
      class="moderatorOptions"
    >
      <span 
        class="ui button messages"
        @click.stop="messagesVisible = !messagesVisible"
        >messages</span>

      <span 
        class="ui button block"
        @click.stop="$store.dispatch('blockUser', user)"
        >block</span>

      <span 
        class="ui button delete"
        @click.stop="$store.dispatch('deleteUser', user)"
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
  name: 'Label',
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
  padding: 0;
  margin: 0.5vh;
  display: flex;
  align-items: center;
  color: var(--userColor);
}

li span {
  margin-right: 0.5vh;
}
li .bullet {
  height: 1vh; width: 1vh;
  background: var(--userColor);
  padding: 1px;
  border-radius: 3px 5px 3px 5px;
}
li .name {
  width: 100%;
  max-width: 200px;
  cursor: pointer;
  /* cursor: ne-resize; */
}
li .goto {
  margin-left: auto;
  width: 1.5vh;
  cursor: pointer;
}

li .moderatorOptions {
  display: flex;
}
li .moderatorOptions .button {
  padding: 0.2vh 0.5vh;
  font-size: 8.5pt;
  color:grey;
  border: 0.5px solid grey;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: none;
}

.moderating li {
  width: 450px;
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
</style>