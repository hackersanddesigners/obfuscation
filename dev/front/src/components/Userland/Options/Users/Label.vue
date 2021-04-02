<template>
  <li
    class="userLabel"
    :style="{ '--userColor': `var(--${ user.uid })` }"
    @mouseover.stop="hovered=true"
    @mouseleave.stop="hovered=false"
  >

    <!-- <span class="bullet"> ● </span> -->
    <!-- <span class="bullet"></span> -->

    <span 
      :class="[
        'name',
         { moderator: user.moderator }
      ]"
      
    >
      {{ isMe ? user.name + " (you)" : user.name }} 
    </span>

    <span v-if="moderating" class="goto"> {{ hovered ? '→' : ' '  }}</span> 

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

    <span v-if="!moderating" class="goto"> {{ hovered ? '→' : ' '  }}</span> 

    <div v-if="moderating && messagesVisible" class="messageListContiner">

      <ul v-if="messages.length > 0" class="messageList">
        <MessageOptions
          v-for="message in messages"
          :key="message.uid"
          :message="message"
          @click.native.stop="$emit('goTo', message)"
        />
      </ul>
      <p v-else class="empty">This user has no messaages.</p>
      
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
  box-sizing: border-box;
  padding: 0;
  margin: 0.5vh 0vh;
  display: flex;
  align-items: center;
  color: var(--userColor);
  cursor: pointer;
}

li span {
  padding-right: 0.5vh;
}
li .bullet {
  height: 1vh; width: 1vh;
  background: var(--userColor);
  padding: 1px;
  border-radius: 3px 5px 3px 5px;
}
li .name {
  padding: 0 0.5vh;
  margin: 0 0.5vh;
  /* max-width: 200px; */
  cursor: pointer;
  word-break: keep-all;
  /* white-space: pre; */
  /* cursor: ne-resize; */
}

li .name.moderator {
  border: 2px dashed;
  border-radius: var(--ui-border-radius);
}

li .goto {
  margin-left: auto;
  margin-right: 0.5vh;
  min-width: 2.5vh;
  cursor: pointer;
}

li .moderatorOptions {
  box-sizing: border-box;
  display: flex;
  padding-right: 0.5vh;
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
  width: 500px;
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
  padding:0px 0px;
}
.moderating li .empty {
  margin: 10px 0 0 5px;
  font-size: 10pt;
}

.moderating li .goto {
  /* display: none; */
}
</style>