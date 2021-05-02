<template>
  <div id="home">

    <Nomansland
      v-if="blocked"
    />

    <Mainland
      v-else-if="contentLoaded"
      :wantsToView="wantsToView"
    />

    <div
      v-else
      id="loading"
    >
      <span class="message">
        {{ loadingMessage }}
      </span>
    </div>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { uid } from 'uid'
import api from '../api'

import Mainland from '../components/Userland/Mainland'
import Nomansland from '../components/Userland/Nomansland'

export default {

  name: 'Home',

  components: {
    Mainland,
    Nomansland
  },

  props: [
    'slug'
  ],

  data() {
    return {

      wantsToView: null,

      loadingMessage: 'Loading...',
      serverError: 'server error.',
      tickerLoaded: false,
      territoriesLoaded: false,
      messagesLoaded: false,
      usersLoaded: false,
      selfEvaluated: false,

    }
  },

  computed: {
    ...mapState({
      isMobile: state => state.isMobile,
      blocked:  state => state.users.blocked
    }),
    ...mapGetters('users', [
      'me'
    ]),
    contentLoaded() {
      return (
        this.tickerLoaded &&
        this.territoriesLoaded &&
        this.messagesLoaded &&
        this.usersLoaded &&
        this.selfEvaluated
      )
    },
  },

  created() {


    // initialize routing

    if (this.slug) {
      this.wantsToView = this.slug
    }
    this.$router.afterEach((to) => {
      this.wantsToView = to.fullPath
    })


    // get ticker from CMS

    api
    .territories
    .getTicker()
    .then(response => {
      this.$store.commit('territories/setTicker', response)
      this.tickerLoaded = true
      this.loadingMessage = 'Getting regions...'
    })
    .catch(error => {
      console.log(error)
      this.loadingMessage = this.serverError
    })


    // get regions from CMS

    api
    .territories
    .getAll()
    .then(response => {
      this.$store.commit('territories/setTerritories', response)
      this.territoriesLoaded = true
      this.loadingMessage = 'Getting users...'
    })
    .catch((error) => {
      console.log(error)
      this.loadingMessage = this.serverError
    })

    // get message db from server.

    api
    .chat
    .get('messages')
    .then(response => {
      this.$store.commit('messages/setMessages', response)
      this.messagesLoaded = true
    })
    .catch(error => {
      console.log(error)
      this.loadingMessage = this.serverError
    })

    // get user db from server.

    api
    .chat
    .get('users')
    .then(response => {
      users = response
      this.$store.commit('users/setUsers', users)
      this.usersLoaded = true

      let users, self, authMessage

      // check if user is registered and get their datas.

      if (localStorage.uid && users[localStorage.uid]) {
        this.$store.commit('users/visit')
        authMessage = "You've visited."
        self = users[localStorage.uid]


        // if they changed their user name they registered

        if (!users[self.uid].name.includes(self.uid)) {
          this.$store.commit('users/register')
          authMessage = "You're a local."
        }

        console.log('* AUTH:', authMessage)


        // if the user is marked as blocked, destroy
        // mainland component

        if (self.blocked) {
          console.log("You're not welcome here.")
          this.$store.commit('users/block')
        }


      // if not visited, generate a new user and store UID
      // and color for future reference

      } else {
        console.log("you're new")
        const id = uid()
        self = {
          uid: id,
          name: 'newUser-' + id,
          connected: true,
          color: this.randomColor(),
          x: 0,
          y: 0,
          typing: null,
          messageLifetime: 30 * 86400000, // 30 days
          moderator: false,
          deleted: false,
          blocked: false,
        },
        localStorage.uid = self.uid
        localStorage.color = self.color

      }


      // filter mobile users by default, they are deleted
      // on before unload.

      if (this.isMobile) {
        this.$store.commit('users/visit')
        self.isMobile = true
      }

      // register user anyway so pop-up is hidden.

      this.$store.commit('users/register')

      // update the app store with the UID and user.

      this.$store.commit('users/setUID', self.uid)
      this.$store.commit('users/setUser', self)

      // announce existence to server and peers.

      this.$socket.client.emit('user', self)

      // last condition to mount mainland is met:

      this.selfEvaluated = true

    })
    .catch(error => {
      console.log(error)
      this.loadingMessage = this.serverError
    })


    // before leaving, emit user disconnection
    // if not registered or mobile, delete

    window.onbeforeunload = () => {
      if (this.me && !this.me.deleted) {
        this.$store.dispatch('users/disconnect')
        if (this.isMobile || this.me.name.includes(this.me.uid)) {
          this.$store.dispatch('users/deleteUser', this.me)
        }
      }
    }


  },

  mounted() {

  },

  methods: {

   randomColor() {
      const
        r = Math.floor(Math.random() * 256),
        g = Math.floor(Math.random() * 256),
        b = Math.floor(Math.random() * 256),
        a = 1
      return `rgb(${r}, ${g}, ${b}, ${a})`
    },

  }
}
</script>

<style scoped>

#loading,
#home {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

#loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
#loading .message {
  font-family: 'jet';
}

</style>
