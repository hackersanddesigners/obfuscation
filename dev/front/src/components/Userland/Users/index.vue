<template>
  <div 
    id="userlistContainer"
    :class="{ moderating: moderating }"
  >
    <div id="userlist">
      <span class="title"> 
        <span>participants</span>
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
            placeholder="moderator password"
            @keyup.enter=authenticate()
            autofocus
          />
        </div>
      </span>
      <ul>
        <Label
          v-for="user in connectedUsersFirst()"
          :key="user.uid"
          :user="user"
          :isMe="user.uid === me.uid"
          :moderating="moderating"
          :messages="getUserMessages(user)"

          @censorMessage="$emit('censorMessage', $event)"
          @deleteMessage="$emit('deleteMessage', $event)"
          @deleteUser="$emit('deleteUser', $event)"
          @goTo="$emit('goTo', $event)"
          @click.native.stop="$emit('goTo', user)"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import Label from './Label'

export default {
  name: 'List',
  components: {
    Label
  },
  props: [ 
    'me',
    'users',
    'messages'
  ], 
  data() {
    return {
      moderator: false,
      authenticating: false,
      moderating: false,
    }
  },
  mounted() {
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

    getUserMessages(user) {
      let userMessages = []
      for(let uid in this.messages) {
        const message = this.messages[uid]
        if (message.author == user.uid && !message.deleted) {
          userMessages.push(message)
        }
      }
      return userMessages.reverse()
    },

    connectedUsersFirst() {
      const userArray = Object.values(this.users)
      userArray.sort((a, b) => {
        return a.connected === b.connected ? 0 : a.connected ? -1 : 1
      })
      let obj = {}
      for (let u = 0 ; u < userArray.length; u++) {
        const user = userArray[u]
        obj[user.uid] = user
      }
      return obj
    },
  }
}
</script>
<style scoped>
#userlistContainer.moderating {
  /* position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center; */
}
/* #userlistContainer.moderating #userlist { */

/* } */
#userlist {
  box-sizing: border-box;
  margin-top: 2vh;
  margin-left: 2vh;
  min-width: 14vw;
  max-height: 300px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid grey;
}
#userlist .title {
  position: sticky;
  background: white;
  top: 0;
  overflow: hidden;
  box-sizing: border-box;
  padding-left: 0.5vw;
  line-height: 1.9vh;
  width: 100%;
  display: flex;
  border-bottom: 1px solid grey;
}


#moderate {
  margin-left: auto;
  flex-shrink: 0;
  cursor: pointer;
}
#moderate .moderateButton {
  padding: 0vh 0.5vw;
  padding-left: 0.5vw;
  margin-left: 1vw;
  border-left: 1px solid grey;
}
#moderate input {
  border: none;
  outline: none;
  padding: 2px;
  border-radius: 10px;
  margin-top: 0px;
}
#userlist ul { 
  margin: 0;
  padding: 0;
}
</style>