<template>
  <div id="userlist">
    <span class="title"> participants </span>
    <ul>
      <Userlabel
        :user="me"
        :isMe="true"

        @click.native.stop="$emit('goTo', me)"
      />
      <Userlabel
        v-for="user in connectedUsersFirst()"
        :key="user.uid"
        :user="user"

        @click.native.stop="$emit('goTo', user)"
      />
    </ul>
  </div>
</template>

<script>
import Userlabel from './Userlabel'

export default {
  name: 'Userlist',
  components: {
    Userlabel
  },
  props: [ 
    'me',
    'users'
  ], 
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
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
#userlist {
  box-sizing: border-box;
  margin-top: 2vh;
  margin-left: 2vh;
  width: 14vw;
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid grey;
}
#userlist .title {
  box-sizing: border-box;
  padding: 0vh 0.5vw;
  line-height: 1.9vh;
  width: 100%;
  border-bottom: 1px solid grey;
}
#userlist ul { 
  margin: 0;
  padding: 0;
}
</style>