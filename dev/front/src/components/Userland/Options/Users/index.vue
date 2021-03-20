<template>
  <div
    id="userlist"
    :class="[
      'ui',
      { moderating: moderating }
    ]"
  >

    <div class="title"> 
      <span
        class="hideParticipants"
        @click="$emit('hide')"
      >
        participants
      </span>
      <div id="moderate">
        <span 
          class="moderateButton"
          @click="
            moderating ? moderating = false :
            moderator ? moderating = true :
            authenticating ? authenticating = false :
            authenticating = true
          "
        >
          <span v-if="moderating">—</span>
          <span v-else>M</span>
        </span>
        <input 
          v-if="authenticating"
          ref="password"
          type="password" 
          name="moderator"
          placeholder="password"
          @keyup.enter=authenticate()
          autofocus
        />
      </div>
    </div>

    <ul>
      <Label
        v-for="user in (moderating ? connectedUsersFirst : connectedUsers)"
        :key="user.uid"
        :user="user"
        :isMe="user.uid === me.uid"
        :moderating="moderating"
        :messages="messagesByUser(user)"
        @goTo="$emit('goTo', $event)"
        @click.native.stop="$emit('goTo', user)"
      />
    </ul>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Label from './Label'

export default {
  name: 'List',
  components: {
    Label
  },
  props: [ 
  ], 
  data() {
    return {
      moderator: false,
      authenticating: false,
      moderating: false,
    }
  },
  computed: {
    ...mapGetters([
      'me',
      'connectedUsers',
      'connectedUsersFirst',
      'notDeletedUsers',
      'notDeletedMessages',
      'messagesByUser',
    ])
  },
  mounted() {
  },

  sockets:  {
  },
  methods: {

    authenticate() {
      const password = this.$refs.password.value
      if (password === '0000') {
        this.moderator = true
        this.authenticating = false
        this.moderating = true
      }
    },
  }
}
</script>

<style scoped>

#userlist {
  margin-top: 1vh;
  padding: 0;
  max-height: 300px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
#userlist.moderating {
  /* max-width: unset; */
}

#userlist .title {
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
  border-bottom: var(--ui-border);
}
#userlist .title .hideParticipants {
  padding: 0.5vh 1vh;
  cursor: pointer;
}
#userlist .title #moderate {
  margin-left: auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-left:  var(--ui-border);
}
#userlist .title #moderate .moderateButton,
#userlist .title #moderate .moderateButton span {
  padding: 0.5vh;
}
#userlist .title #moderate input {
  width: 65px;
  border: none;
  outline: none;
  padding-bottom: 4px;
}

#userlist ul { 
  margin: 0;
  padding: 0;
  overflow: scroll;
}
</style>