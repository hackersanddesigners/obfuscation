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
import { mapState } from 'vuex'
import Mainland from '../components/Userland/Mainland'
import Nomansland from '../components/Userland/Nomansland'
import api from '../api'
import { uid } from 'uid'

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
  
    contentLoaded() {
      return (
        this.tickerLoaded &&
        this.territoriesLoaded && 
        this.messagesLoaded &&
        this.usersLoaded &&
        this.selfEvaluated
      ) 
    },

    ...mapState([

      'lifecycle',
      'version',
      'blocked',
      'isMobile'

    ])
  },

  created() {


    console.log(`ENVIRONMENT: ${ this.$env }`)
    console.log(`SOCKETS: ${ this.$publicPath }`)
    console.log(`VERSION: ${ localStorage.version }`)
    console.log(`LIFECYCLE: ${ this.lifecycle }`)

    // delete everything if local storage version is older than this
    // version. This is to prevent older users' data strutures from
    // conflicting with the most recent structure.

    if (localStorage.version != this.version) {
      console.log('this version is outdated, clearing your storage.')

      localStorage.clear()
      localStorage.version = this.version
    }  



    let 
      regions,
      messages,
      users,
      self


    // get ticker from CMS

    api
      .getTicker()
      .then((response) => {
        this.$store.commit('setTicker', response)
        this.tickerLoaded = true
      })
      .catch((error) => {
        console.log(error)
        this.loadingMessage = this.serverError
      })


    // get regions from CMS

    this.loadingMessage = 'Getting regions...'

    api
      .getRegions()
      .then((response) => {
        regions = response
        this.$store.commit('setTerritories', regions)
        this.territoriesLoaded = true
        this.loadingMessage = 'Getting users...'
      })
      .catch((error) => { 
        console.log(error)
        this.loadingMessage = this.serverError
      })


    // get message db from server.

    api 
      .getMessages()
      .then((response) => { 
        messages = response
        this.$store.commit('setMessages', messages)
        this.messagesLoaded = true
        // this.loadingMessage = 'Building terrain...'
      })
      .catch((error) => { 
        console.log(error)
        this.loadingMessage = this.serverError
      })


    // get user db from server.

    api 
      .getUsers()
      .then((response) => { 
        users = response
        this.$store.commit('setUsers', users)
        this.usersLoaded = true

        // check if user is registered and get their datas.

        if (localStorage.uid && users[localStorage.uid]) {
          console.log("You've visited.")
          this.$store.commit('visit')

          self = users[localStorage.uid]


          // if they changed their user name they registered

          if (!users[self.uid].name.includes(self.uid)) {
            console.log("You're a local.")
            this.$store.commit('register')
          }


          // if the user is marked as blocked, they have 
          // been blocked. The component is unmounted here.

          if (self.blocked) {
            console.log("You're not welcome here.")
            this.$store.commit('block')
          }


        // if not visited, store the generated UID and 
        // color for later reference (i.e. when the user 
        // comes back to register).

        } else {
          console.log('youre new')
          const id = uid()
          self = {
            uid: id,
            name: 'newUser-' + id,
            connected: true,
            color: this.randomColor(),
            x: 0,
            y: 0,
            typing: null,
            moderator: false,
            deleted: false,
            blocked: false,
          },
          localStorage.uid = self.uid
          localStorage.color = self.color

        }

        if (this.isMobile) {
          self.isMobile = true
          this.$store.commit('visit')
        }

        this.$store.commit('register')
        
        // update the app store with the UID and user.

        this.$store.commit('setUID', self.uid)
        this.$store.commit('setUser', self)


        // announce existence to server and peers.

        
        this.$socket.client.emit('user', self)
        this.selfEvaluated = true
        // this.loadingMessage = 'Ready.'

      })
      .catch((error) => { 
        console.log(error)
        this.loadingMessage = this.serverError
      })


    // handle routing.

    if (this.slug) {
      this.wantsToView = this.slug
    }

  },

  mounted() {

    this.$router.afterEach((to) => {
      this.wantsToView = to.fullPath
    })

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
